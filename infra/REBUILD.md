# Rebuild from scratch — Colombo SAR PoC

**Current as of 2026-06-12.** This is the authoritative runbook to rebuild the full
stack on a clean VPS after a total wipe (the "docker nuke": `docker system prune -af
--volumes` + remove the working tree). It supersedes the old 2026-06-07 notes (kept
as history at the bottom).

## What you need (the durable artifacts)

Everything needed to rebuild lives in **two places that survive the nuke** (both are
*off* the VPS):

1. **This repo** — `github.com/adammwaniki/colombo-poc-restored` (the salvage repo).
   Code, scripts, infra, docs, and `verifiably-clone-vps.patch`.
2. **The Claude memory notes** — `~/.claude/.../memory/` on your laptop: the "why"
   behind every fix, with exact commands. Start at `colombo-poc-vps-deployment.md`.

Plus **secrets you must restore or regenerate** (never in the repo — see the checklist
at the end) and **DNS** (the `*.in-labs.cdpi.dev` wildcard must point at the new box).

> The stack is a **fork of `centre-for-dpi/verifiably`** pinned at commit
> **`6b820dd38a306edb1fa1416f220412f5502f7317`**, plus our changes captured in
> `verifiably-clone-vps.patch`. The upstream brings walt.id (issuer/verifier/wallet),
> eSignet, Keycloak, WSO2, Inji Web/Certify and the Caddy proxies; our patch adds the
> private_key_jwt support, the federated-registry adapter wiring, the caddy-public
> hairpin aliases, the issued-credentials display/search fix, and the custom-schema
> catalog. Sunbird RC, the agency registries, Inji Verify and the signup service are
> separate and live in this repo.

---

## 0. Host prep + hardening

The original box was rooted via a root **password** login. Lock it down from first boot
(artifacts in this dir):

- **Key-only SSH:** `99-colombo-hardening.conf` → `/etc/ssh/sshd_config.d/`
  (`PasswordAuthentication no`, `PermitRootLogin prohibit-password`). Ubuntu cloud images
  ship `50-cloud-init.conf` with `PasswordAuthentication yes` that wins by sort order —
  overwrite it and set `ssh_pwauth: false` in `/etc/cloud/cloud.cfg.d/`.
- **ufw** default-deny incoming (only 22) · **fail2ban** sshd jail · 8 GB swap ·
  unattended-upgrades.
- **Docker bypasses ufw** (published ports punch straight through). Fix with the
  `DOCKER-USER` drop:
  ```
  cp docker-firewall.sh /usr/local/sbin/ && chmod +x /usr/local/sbin/docker-firewall.sh
  cp docker-firewall.service /etc/systemd/system/
  systemctl daemon-reload && systemctl enable --now docker-firewall.service
  ```
  This is the **subdomain/public-HTTPS** deployment: caddy-public terminates TLS on
  :80/:443 for every `*.in-labs.cdpi.dev` host and is the *only* thing the internet
  reaches; all backends are unpublished and reached container-to-container.

Install Docker + compose plugin, then proceed.

---

## 1. The verifiably stack (walt.id + eSignet + IdPs + Caddy)

```bash
cd /root/colombo-poc
git clone https://github.com/centre-for-dpi/verifiably.git verifiably
cd verifiably
git checkout 6b820dd38a306edb1fa1416f220412f5502f7317
git apply /path/to/colombo-poc-restored/verifiably-clone-vps.patch   # our changes
```

The patch touches 21 files (see its header). Highlights:
- `internal/auth/oidc/oidc.go` etc. — **private_key_jwt** for eSignet (RS256
  client_assertion; `aud` follows `publicIssuerUrl`).
- `deploy/compose/stack/docker-compose.yml` — **caddy-public network aliases**
  `vc` / `walt-issuer` / `walt-verifier`.`in-labs.cdpi.dev` so in-cluster clients
  (status-list checks, the holder wallet claiming offers) resolve the public hostnames
  to the proxy internally instead of hairpinning the host's blocked :443.
- `deploy/compose/stack/Caddyfile.public` — the per-subdomain TLS site blocks.
- `deploy/k8s/config/issuer/credential-issuer-metadata.baseline.conf` — the walt.id
  catalog **pre-seeded with the 6 custom schemas** (Cultivator/FertilizerVoucher/
  AddressProof/TaxRegistration/SectorApproval/BusinessPermit), so issuance works on
  first boot without re-running `scripts/waltid_catalog_sync.py`.
- `internal/handlers/issued.go` + `internal/issuance/log.go` +
  `templates/pages/issuer_credentials.html` — the **issued-credentials fix** (broadened
  HolderHint + fallback, persisted `subjectFields`, subject rendered on cards).

Then:
```bash
cp /path/to/colombo-poc-restored/verifiably-go/.env.example verifiably-go/.env
# fill in the REDACTED secrets (see checklist §7); set
#   VERIFIABLY_PUBLIC_DOMAIN=in-labs.cdpi.dev  VERIFIABLY_LE_EMAIL=you@…
#   VERIFIABLY_ROLES=issuer,holder,verifier,schemas
cd verifiably-go
./deploy.sh up waltid     # postgres, caddy(+public), issuer/verifier/wallet-api, keycloak, wso2, libretranslate
./deploy.sh up inji       # eSignet + Inji Web + mock-identity + Inji Certify
```
`deploy.sh` builds `verifiably-go:local` from the patched source (so the issued-creds
fix and pkjwt are compiled in) and runs the container via `scripts/start-container.sh`
— which **already adds `--group-add <docker_gid>`** so the in-container app can restart
issuer-api over `/var/run/docker.sock` when you build a schema. (Do **not** recreate
`verifiably-go` with a hand-written `docker run` that omits `--group-add` — that
reintroduces the "schema Save → docker.sock permission denied" bug.)

### Generated / gitignored configs — NOT in the patch

Four config files are **gitignored in the upstream clone** and **regenerated at deploy
time**, so they're not in `verifiably-clone-vps.patch`:

- `config/backends.docker.json` — the `VERIFIABLY_ADAPTER=registry` + `walt_community`
  wiring. Regenerated by `gen-backends.sh` / `start-container.sh` from the scenario; comes
  out correct on `deploy.sh up`.
- `config/auth-providers.system.docker.json` + `deploy/compose/stack/wso2-deployment.toml`
  — the Keycloak/WSO2/eSignet **IdP URLs**. In **subdomain mode** (`.env` has
  `VERIFIABLY_PUBLIC_DOMAIN=in-labs.cdpi.dev` and **no** `VERIFIABLY_PUBLIC_HOST=<IP>`)
  these should regenerate pointing at `keycloak.`/`wso2.in-labs.cdpi.dev`. **If the login
  tiles instead hit the raw box IP**, re-apply the fixes in the memory note
  **`colombo-poc-idp-subdomains.md`** (publicIssuerUrl + WSO2 `hostname`/`proxyPort=443`
  + SP-callback regex). eSignet is the primary tile; Keycloak/WSO2 are secondary.
- `config/auth-providers.user.json` — the **eSignet client key (secret)**; regenerated by
  `esignet_register_client.py` (§2), never committed.

> These four, plus the secrets in §7 and the memory notes, are the only things the repo
> can't carry verbatim. Everything else is in-tree or in the patch.

---

## 2. Sunbird RC (registry of record + credentialing chain)

```bash
cd /root/colombo-poc/sunbird-rc      # full Sunbird quickstart checkout
# drop in our override + db-init from the salvage repo:
cp <repo>/sunbird-rc/docker-compose.override.yml .
cp <repo>/sunbird-rc/db-init/01-create-databases.sql db-init/
# port remaps to dodge the verifiably stack: db 15432, keycloak 18080, nginx 11080,
# registry 18091. POSTGRES_PASSWORD=postgres. Vault auto-unseals (scripts/vault_autounseal.sh).
docker compose ... up -d
python3 <repo>/scripts/sb_seed.py     # synthetic 8-digit IDs 80000001–80000020 into Person
```
- Credentialing chain (vault + identity + credential-schema + credential) comes up with
  the quickstart; see `infra/sunbird-credentialing.md`. Vault keys regenerate fresh
  (the old `vault-keys.json` is **not** reused on a clean build).
- Admin portal: `sunbird-rc.in-labs.cdpi.dev/admin/` (Person register + native PDF+QR
  issuance from a record).

### mock-identity → Sunbird (so eSignet authenticates against the register)
```bash
python3 <repo>/scripts/patch_010.py            # patch getIdentityV2 to read Sunbird V_Person
# build mock-identity-sunbird:v010, then:
python3 <repo>/scripts/recreate_mockid_sunbird.py   # SUNBIRD_REGISTRY_URL, attach to both nets
```

### eSignet client (private_key_jwt)
```bash
python3 <repo>/scripts/esignet_register_client.py   # generates RSA keypair + registers the
                                                    # 'verifiably' OIDC client; writes the key
# paste the provider into verifiably-go/config/auth-providers.user.json
# (template: verifiably-go/config/auth-providers.user.json.example)
```
Demo login: National ID **80000006** / PIN **100005** (others: 80000002/100001 etc.).

---

## 3. Federated agency registries (`infra/registries/`)

Three standalone FastAPI sources-of-truth (DAD / Grama-Niladhari / Business), each its
own SQLite + OpenAPI. Seeds (DAD 60 / GN 60 / Business 52 rows) are **in the JSON
configs** and load on first boot.

```bash
cd <repo>/infra/registries
docker build -t cdpi-registry:local .
docker compose up -d        # dad-/gn-/business-registry on the external waltid_default net
```
Add the Caddy sites (already in the patched `Caddyfile.public`) and DNS
`*.registry.in-labs.cdpi.dev`. Bulk issuance reads `…/<entity>/issuance` (schema-shaped
export). To repopulate after a config change: `rm -f /data/registry.db` in the container
+ `docker restart` (re-seeds from the mounted JSON).

---

## 4. Self-registration signup service (Gmail SMTP)

```bash
cp <repo>/scripts/signup.env.example /root/colombo-poc/signup.env   # fill SMTP_PASS
chmod 600 /root/colombo-poc/signup.env
docker run -d --name colombo-signup --restart unless-stopped --network host \
  --env-file /root/colombo-poc/signup.env \
  -v /root/colombo-poc/registration_service_email.py:/app/svc.py \
  python:3.12-slim python /app/svc.py
ufw allow from 172.16.0.0/12 to any port 8090 proto tcp   # docker subnets → host-net bind
```
- Live script is `scripts/registration_service_email.py` (mounted as `/app/svc.py`).
- **Email = Gmail SMTP** (`smtp.gmail.com:587`, `SMTP_USER=<your gmail>`, `SMTP_PASS=`
  a **Gmail App Password** [2-Step Verification required], `OTP_FROM=<your gmail>`).
  Chosen over Resend because Resend needs a verified sending domain and we don't control
  `in-labs.cdpi.dev` DNS; Gmail delivers to any recipient (~500/day). **Uses `--env-file`
  on purpose** — editing `signup.env` then `docker restart` does nothing (env is baked
  at `docker run`); you must `docker rm -f && docker run` to pick up changes.

---

## 5. Inji Verify (`infra/inji-verify/`)

```bash
cd <repo>/infra/inji-verify
docker compose up -d        # mosipid inji-verify-service + ui + postgres
```
Our own instance (the bootcamp one 502s). `inji-verify.in-labs.cdpi.dev`. Verifies the
Sunbird-native PDF+QR (PixelPass) — the "registry-as-record / scan a paper QR" path.

---

## 6. DNS + external prerequisites (NOT in the repo)

- **Wildcard DNS:** `*.in-labs.cdpi.dev` **and** `*.registry.in-labs.cdpi.dev` → the new
  box IP. **We do not control this zone** — whoever owns `in-labs.cdpi.dev` must repoint
  it. (This is also why Resend domain-verification was impossible → Gmail SMTP.)
- **eSignet OIDC client** — self-registered by `esignet_register_client.py` (regenerate).
- **Google OAuth app** (`GOOGLE_OAUTH_CLIENT_ID/SECRET` in verifiably `.env`) — external
  Google Cloud console app for the wallet OIDC; re-provision or reuse.
- **Gmail App Password** — for the signup service; generate at myaccount.google.com/apppasswords.
- **Let's Encrypt** — caddy-public auto-issues once DNS + :80/:443 are reachable.

## 7. Secrets checklist (fill these — all `<REDACTED>` in the templates)

`verifiably-go/.env` (from `.env.example`):
`POSTGRES_PASSWORD`, `KEYCLOAK_ADMIN_PASSWORD`, `WALLET_SIGN_KEY`,
`WALLET_ENCRYPTION_KEY`, `WALLET_OIDC_CLIENT_SECRET`, `GOOGLE_OAUTH_CLIENT_SECRET`,
`VERIFIABLY_ADMIN_PASSWORD`, `VERIFIABLY_LE_EMAIL`, `VERIFIABLY_PUBLIC_DOMAIN`.

`signup.env` (from `scripts/signup.env.example`): `SMTP_PASS` (Gmail App Password).

`verifiably-go/config/auth-providers.user.json` — the eSignet client key (from
`esignet_register_client.py`). `sunbird-rc/.env` — `POSTGRES_PASSWORD=postgres`.

> Keys/DIDs (walt.id issuer key, Sunbird vault) **regenerate fresh** on a clean build —
> that's expected for a from-scratch rebuild; everything is re-issued against the new keys.

---

## 8. Verify it works

- eSignet login end-to-end: `e2e/flow-public.mjs` (or `flow4.mjs`) → `vc.in-labs.cdpi.dev`.
- Full user journeys + per-step screenshots: **`user-journey.md`** (the operational
  runbook — 12 public hosts in its "All endpoints" section).
- Smoke: issue a CultivatorCredential → card shows holder + subject + search works;
  holder wallet claims an offer (no ConnectTimeout); schema Save restarts issuer-api;
  signup emails a code to a non-owner address.

---

## History — 2026-06-07 (the original hardened rebuild)

The original VPS (`156.67.105.185`) was compromised (rooted host, SSH worm, foreign
immutable SSH key) and wiped. First clean bring-up was **loopback-bound** (services on
`127.0.0.1` behind SSH tunnels, `VERIFIABLY_PUBLIC_HOST=localhost`), proven with
`e2e/flow-localhost.mjs` (80000002 / PIN 100001). It later moved to the public-HTTPS
subdomain mode documented above. Port collisions to watch on a single host:
inji-verify-service **8082** ↔ Sunbird claim-ms 8082 (claim-ms stopped, registry-only).
