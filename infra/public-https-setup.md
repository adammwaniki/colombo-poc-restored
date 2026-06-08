# Public HTTPS setup (Caddy) — `*.in-labs.cdpi.dev`

Terminates TLS for the workshop's public credential endpoints so external wallets
(on any network) can complete OID4VCI / OID4VP, and citizens can hit eSignet over
HTTPS. Runs on the VPS `156.67.105.185` (compose project `waltid`).

## Subdomains

DNS A records (operator-provided) → `156.67.105.185`:

| Subdomain | Backend (internal) | Purpose |
|---|---|---|
| `vc.in-labs.cdpi.dev`            | `verifiably-go:8080`     | verifiably operator app (canonical host) |
| `walt-issuer.in-labs.cdpi.dev`   | `issuer-api:7002`        | walt.id OID4VCI issuer (credential offers) |
| `walt-verifier.in-labs.cdpi.dev` | `verifier-api:7003`      | walt.id OID4VP verifier |
| `esignet.in-labs.cdpi.dev`       | `injiweb-oidc-ui:3000`   | eSignet OIDC (login UI + `/v1/esignet` API) |
| `keycloak.in-labs.cdpi.dev`      | `keycloak:8180`          | Keycloak (realm `vcplatform` — admin console + OIDC) |
| `wso2.in-labs.cdpi.dev`          | `wso2is:9443` (https)    | WSO2 IS (alternate IdP) |
| `sunbird-rc.in-labs.cdpi.dev`    | host-gateway `:18091`    | Sunbird RC registry API |

verifiably is **canonical at `https://vc.in-labs.cdpi.dev`** (its `VERIFIABLY_PUBLIC_URL`),
so OIDC redirects + session cookies are consistent there. It still also serves on
`http://156.67.105.185:8080`, but login from the IP now redirects to the `vc` host.
Keycloak needs no hostname change — `KC_HOSTNAME_STRICT=false` + `KC_PROXY_HEADERS=xforwarded`
make it resolve its issuer from the request host, so the admin console + OIDC work at the
subdomain while verifiably's internal `keycloak:8180` login is unaffected.

## Architecture

- **`caddy-public`** (compose service, `--profile subdomain`) owns host `:80` + `:443`,
  mounts `Caddyfile.public`, gets Let's Encrypt certs via HTTP-01. It sits on
  `waltid_default` (reaches walt.id/eSignet/WSO2 by container name) with
  `host.docker.internal` (reaches the separate Sunbird stack via its published port).
- The **main caddy** (`waltid-caddy-1`) is rebound to `127.0.0.1:8079` (`CADDY_HTTP_PORT`)
  so it no longer holds host `:80`.
- `Caddyfile.public` is scoped to **exactly these 7 subdomains** (see `Caddyfile.in-labs`
  in this dir) — not deploy.sh's full ~16-service generator — so Let's Encrypt doesn't
  fail / rate-limit on subdomains that have no DNS.

## baseUrl changes (so services advertise the public host)

A reverse proxy alone isn't enough — each issuer bakes its public URL into the
documents clients consume. Changed on the VPS:

| Service | File / env | Value |
|---|---|---|
| walt.id issuer   | `deploy/k8s/config/issuer/issuer-service.conf`     | `baseUrl = "https://walt-issuer.in-labs.cdpi.dev"` |
| walt.id verifier | `deploy/k8s/config/verifier/verifier-service.conf` | `baseUrl = "https://walt-verifier.in-labs.cdpi.dev"` |
| eSignet          | `.env` → `ESIGNET_BASE_URL` (→ `MOSIP_ESIGNET_DOMAIN_URL`) | `https://esignet.in-labs.cdpi.dev` |
| verifiably eSignet provider | `config/auth-providers.user.json` → `publicIssuerUrl` | `https://esignet.in-labs.cdpi.dev` |
| verifiably app   | `.env` → `VERIFIABLY_PUBLIC_URL`                    | `https://vc.in-labs.cdpi.dev` |
| eSignet client redirect | client-mgmt PUT — `scripts/esignet_update_redirect.py` | + `https://vc.in-labs.cdpi.dev/auth/callback` |
| Keycloak `vcplatform` client redirect | admin API — `scripts/keycloak_add_redirect.py` | + `https://vc.in-labs.cdpi.dev/auth/callback` |

(verifiably's eSignet `issuerUrl` stays internal — `http://injiweb-esignet:8088/v1/esignet/oidc` —
so verifiably-go reaches eSignet over docker DNS; `publicIssuerUrl` drives the browser
redirect + the `private_key_jwt` `aud`, which eSignet validates against its domain URL.
Moving `VERIFIABLY_PUBLIC_URL` to `vc` changes verifiably's OIDC `redirect_uri`, hence the
two client-redirect updates so the eSignet + Keycloak logins accept the `vc` callback.)

## Reproduce

```bash
cd /root/colombo-poc/verifiably/verifiably-go
CF="-f deploy/compose/stack/docker-compose.yml \
    -f config/docker-compose.injiweb-fix.rendered.yml \
    -f deploy/compose/credebl/docker-compose.yml \
    -f deploy/docker-compose.sunbird-mockid.yml"

# 1. env: free :80 on main caddy + eSignet public URL
printf '\nCADDY_HTTP_PORT=127.0.0.1:8079\nESIGNET_BASE_URL=https://esignet.in-labs.cdpi.dev\n' >> .env

# 2. drop this dir's Caddyfile.in-labs in as the public Caddyfile
cp <repo>/infra/Caddyfile.in-labs deploy/compose/stack/Caddyfile.public

# 3. rebind main caddy + bring up caddy-public
docker compose -p waltid --env-file .env $CF up -d caddy
docker compose -p waltid --env-file .env $CF --profile subdomain up -d caddy-public

# 4. walt.id baseUrls + restart
printf 'baseUrl = "https://walt-issuer.in-labs.cdpi.dev"\n'   > deploy/k8s/config/issuer/issuer-service.conf
printf 'baseUrl = "https://walt-verifier.in-labs.cdpi.dev"\n' > deploy/k8s/config/verifier/verifier-service.conf
docker restart waltid-issuer-api-1 waltid-verifier-api-1

# 5. eSignet domain + verifiably provider
docker compose -p waltid --env-file .env $CF up -d injiweb-esignet
sed -i 's#"publicIssuerUrl": "http://156.67.105.185:3005"#"publicIssuerUrl": "https://esignet.in-labs.cdpi.dev"#' config/auth-providers.user.json

# 6. make verifiably canonical at vc + add the vc callback to the OIDC clients
printf 'VERIFIABLY_PUBLIC_URL=https://vc.in-labs.cdpi.dev\n' >> .env
python3 <repo>/scripts/esignet_update_redirect.py   # adds https://vc.in-labs.cdpi.dev/auth/callback
python3 <repo>/scripts/keycloak_add_redirect.py     # same, on the vcplatform client
./deploy.sh run waltid                              # rebuilds + recreates verifiably-go with the new PUBLIC_URL
```

> `./deploy.sh run waltid` regenerates `backends.docker.json` (walt.id, internal URLs)
> and the *system* auth-providers, but the eSignet `publicIssuerUrl` override lives in
> `auth-providers.user.json` (user overrides system), so it survives. It does **not**
> touch the eSignet container or walt.id confs.

## Verify

```bash
curl -s https://walt-issuer.in-labs.cdpi.dev/draft13/.well-known/openid-credential-issuer | jq .credential_issuer
# → "https://walt-issuer.in-labs.cdpi.dev/draft13"
curl -s https://esignet.in-labs.cdpi.dev/v1/esignet/oidc/.well-known/openid-configuration | jq .issuer
# → "https://esignet.in-labs.cdpi.dev"
curl -s https://keycloak.in-labs.cdpi.dev/realms/vcplatform/.well-known/openid-configuration | jq .issuer
# → "https://keycloak.in-labs.cdpi.dev/realms/vcplatform"
curl -sI https://vc.in-labs.cdpi.dev/ | head -1     # → HTTP/2 200
```

Full login round-trip proven headless (puppeteer) — `vc` → eSignet tile →
`esignet.in-labs.cdpi.dev` login (`80000006`/`100005`) → callback → logged in at
`https://vc.in-labs.cdpi.dev/issuer/dpg`. See `e2e/flow-esignet-vc.mjs`.

## Caveats

- **`sunbird-rc` is exposed read/write** — the registry is anonymous-access, so the
  public subdomain is open read/write to the Person register. Put auth in front (or
  drop the site) for anything past the workshop.
- **WSO2 issuer** is TLS-proxied but its OIDC metadata still advertises its internal
  host (only walt.id + eSignet had their baseUrls moved to the subdomain; Keycloak
  resolves its issuer dynamically so it needed nothing).
- **Not wired through deploy.sh's `VERIFIABLY_HOSTS_PATTERN`** (full subdomain mode),
  to avoid a broad reconfig. So a future `deploy.sh up esignet` re-derives
  `ESIGNET_BASE_URL` from `url_for` and would revert eSignet to the IP; re-apply
  steps 4–6 (or adopt full subdomain mode) after any such run. `caddy-public`, the
  walt.id confs, the `.env` overrides, and the client-redirect updates survive a
  normal `up`/`run`.
- LE account email is set in `Caddyfile.in-labs` (change as needed).
