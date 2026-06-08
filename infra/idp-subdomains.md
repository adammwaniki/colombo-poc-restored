# Fixing the IdP login tiles to use public subdomains (Keycloak + WSO2)

The verifiably login tiles (`vc.in-labs.cdpi.dev`) for **Keycloak** and **WSO2**
were sending the browser to the raw box IP (`http://156.67.105.185:8180`,
`https://156.67.105.185:9443`) instead of `keycloak.in-labs.cdpi.dev` /
`wso2.in-labs.cdpi.dev`; WSO2 additionally failed `callback.not.match`.

## Root cause — legacy-mode deploy

The deploy is in **legacy mode**: `.env` has `VERIFIABLY_PUBLIC_HOST=156.67.105.185`
with `VERIFIABLY_HOSTS_PATTERN=` / `VERIFIABLY_PUBLIC_DOMAIN=` empty. Every IdP URL
was therefore built around the IP; the `*.in-labs.cdpi.dev` Caddy subdomains were
added on top afterward.

verifiably separates two URLs per OIDC provider (`internal/auth/oidc/oidc.go`):
- `issuerUrl` — internal docker-DNS, used server-side for discovery + token exchange.
- `publicIssuerUrl` — browser-facing authority; `AuthorizeURL()` swaps it into the
  discovered authorize endpoint before redirecting the browser.

Both `publicIssuerUrl`s pointed at the IP.

## Keycloak — one change

Edit `verifiably-go/config/auth-providers.system.docker.json`:
```
keycloak.publicIssuerUrl = https://keycloak.in-labs.cdpi.dev/realms/vcplatform
```
then `docker restart verifiably-go`. Keycloak itself needs nothing — it runs with
`KC_HOSTNAME_STRICT=false` + `KC_PROXY_HEADERS=xforwarded`, so when reached through
Caddy it honors `X-Forwarded-Host` and advertises the subdomain issuer.

## WSO2 — three changes (it does NOT honor X-Forwarded)

WSO2 emits URLs from its *configured* hostname, so the verifiably-side change alone
isn't enough.

1. **publicIssuerUrl** — same file:
   `wso2is.publicIssuerUrl = https://wso2.in-labs.cdpi.dev/oauth2/token`.

2. **OAuth SP callback** (`callback.not.match`) — the `verifiably_go_client` SP had
   only IP/localhost callbacks. Add the verifiably callback via DCR:
   ```bash
   docker exec waltid-wso2is-1 curl -sk -u admin:admin -H "Content-Type: application/json" \
     -X PUT https://localhost:9443/api/identity/oauth2/dcr/v1.1/register/verifiably_go_client \
     -d '{"client_name":"Verifiably Go","grant_types":["authorization_code","refresh_token"],
          "redirect_uris":["http://localhost:8080/auth/callback",
                           "http://156.67.105.185:8080/auth/callback",
                           "http://172.24.0.1:8080/auth/callback",
                           "https://vc.in-labs.cdpi.dev/auth/callback"]}'
   ```
   (WSO2 stores the array as a single `regexp=(...)`.)

3. **Hostname + proxyPort** — edit `deploy/compose/stack/wso2-deployment.toml`
   (mounted to WSO2's `deployment.toml`):
   ```toml
   hostname = "wso2.in-labs.cdpi.dev"
   [transport.https.properties]
   proxyPort = 443
   ```
   Without this WSO2 redirects its own login page to `156.67.105.185:9443`.

4. **Self-registration callback** (`/accountrecoveryendpoint/processregistration.do`
   → *"Configured callback URL format does not match"*) — a SEPARATE validator,
   gated by `[identity_mgt.user_self_registration] callback_url` (and the
   account-recovery one) — **two** `callback_url` regex lines in the same TOML.
   The self-reg callback chains through WSO2's OWN host, so whitelist BOTH
   verifiably and WSO2:
   ```
   callback_url = 'https?://(localhost|156\.67\.105\.185|vc\.in-labs\.cdpi\.dev|wso2\.in-labs\.cdpi\.dev)(:[0-9]+)?/.*'
   ```

After the WSO2 TOML edits, `docker restart waltid-wso2is-1` (~3–5 min to come up).
Verified headless: Keycloak tile → `keycloak.in-labs.cdpi.dev/.../auth`; WSO2 tile →
`wso2.in-labs.cdpi.dev/authenticationendpoint/login.do`; WSO2 Register →
`accountrecoveryendpoint/register.do` Sign-Up form (see `e2e-shots/wso2-*.png`).

## Durable fix

These are live edits; a `deploy.sh` re-run in legacy mode regenerates the IP-based
values. The permanent fix is to switch the deploy to **subdomain mode** — set
`VERIFIABLY_PUBLIC_DOMAIN` + `VERIFIABLY_HOSTS_PATTERN` and re-run — so
`gen-caddy.sh` / `gen-backends.sh` render the WSO2 hostname/proxyPort, both
callback regexes, and the auth-providers `publicIssuerUrl`s from config instead of
by hand.
