# Colombo PoC — salvaged source

DPI reference-architecture PoC (Sri Lanka / Senegal "SAR Workshop") built on the MVP
5 components: **eSignet** (auth), **walt.id** issuer/verifier, **Credo** wallet,
**Sunbird RC** (registry of record). Flows: fertilizer-subsidy and sole-proprietor
business-permit, pinned to OID4VCI/OID4VP + HAIP (SD-JWT VC / ES256).

> **Why this repo exists:** the original VPS (`156.67.105.185`) was **compromised**
> (rooted host running an SSH worm; foreign immutable SSH key; OOM). These are the
> hand-written source artifacts salvaged off it **before the wipe** — reviewed
> line-by-line, confirmed untampered (all mtimes predate the intrusion), with **no
> secrets** (every `.env`/`.pem`/key is gitignored). The full deployment recipe,
> gotchas, and rebuild plan live in the Claude memory notes; this repo is the code.

## Layout

```
scripts/        one-shot Python helpers (stdlib only)
e2e/            puppeteer browser flows (run via ghcr.io/puppeteer/puppeteer)
sunbird-rc/     custom docker-compose override + db-init for Sunbird RC v2.0.1
verifiably-go/  the hand-edited source/template files in the centre-for-dpi/verifiably fork (drop-ins)
verifiably-clone-vps.patch  authoritative diff of ALL our changes vs upstream 6b820dd
infra/          deploy artifacts — Caddyfile, registries/ (agency registries), inji-verify/, waltid-schemas/
infra/REBUILD.md  ⭐ from-scratch rebuild runbook (current state — start here to redeploy)
user-journey.md operational runbook + per-use-case flows (step → DPG → host endpoint)
```

> **Rebuilding from a clean box?** Read **`infra/REBUILD.md`** — it pins the upstream
> verifiably commit (`6b820dd`), explains how to apply `verifiably-clone-vps.patch`, and
> walks the full bring-up (verifiably + eSignet + Sunbird + registries + signup + Inji
> Verify) with the secrets checklist. The `verifiably-go/` tree holds the source/template
> edits as readable drop-ins; `verifiably-clone-vps.patch` is the complete authoritative
> set (it also covers the compose/Caddyfile/catalog/config files too bulky to mirror as
> full files). Redacted env templates: `verifiably-go/.env.example`, `scripts/signup.env.example`.

## verifiably-go changes — `private_key_jwt` support

verifiably's OIDC client only did `client_secret`; **eSignet mandates
`private_key_jwt`**. These files add it (drop into the `verifiably/verifiably-go`
fork at the same relative paths):

| File | Change |
|---|---|
| `internal/auth/oidc/oidc.go` | `Config` gains `ClientAuthMethod`/`PrivateKeyPEM`/`KeyID`; `setClientAuth()` + `clientAssertion()` build an **RS256 client_assertion** (RFC 7523, stdlib `crypto/rsa`, `aud`=token endpoint) used in `Exchange`+`Refresh` |
| `internal/auth/providers.go` | `ProviderConfig` json fields `clientAuthMethod` / `privateKeyPem` / `keyId` |
| `internal/handlers/handlers.go` | `CustomProviderInput` + `/auth` form parse (`client_auth_method`, `private_key_pem`, `key_id`) at both build sites |
| `cmd/server/auth.go` | both `oidc.Config` factories thread the new fields |
| `templates/pages/auth.html` | `_oidc_provider_form` gains auth-method select + private-key textarea + kid input |
| `config/auth-providers.user.json.example` | **sanitized** template — copy to `auth-providers.user.json` (gitignored) and paste a freshly-generated eSignet client key |

`auth-providers.user.json` is a top-level JSON **array** of provider configs. Set
`VERIFIABLY_AUTH_ADMIN=rw` in `.env` so the `/auth` "+Add OIDC provider" form appears.

## scripts/

| Script | Role |
|---|---|
| `patch_pkjwt.py` | applies the verifiably-go `private_key_jwt` edits above |
| `patch_010.py` / `patch_getidentity.py` | patch the **0.10.x** MOSIP mock-identity `getIdentityV2(individualId)` to read the Sunbird `Person` register (`patch_010.py` is the final version) |
| `recreate_mockid.py` | rebuilds `injiweb-mock-identity` from `mock-identity-sunbird:v010`, preserving env/net/keystore (keep `-p 8083:8082`, add `SUNBIRD_REGISTRY_URL`) |
| `esignet_register_client.py` | generates the RSA keypair + registers the `verifiably` eSignet OIDC client (`private_key_jwt`, RS256) |
| `sb_schema_test.py` / `sb_person_setup.py` | create the Sunbird `Person` schema + seed records |
| `etl_citizens.py` | ETL citizens-db → Sunbird `Person` (gentle 0.4s + retries; c3p0 pool is small) |
| `etl_8digit.py` | re-key all Persons to 8-digit national IDs (eSignet UIN field caps at 12 chars) |
| `verify_esignet.py` | kyc-auth smoke test (valid→true, wrong pin→fail, unknown→invalid id) |
| `registration_service.py` | stdlib HTTP server on `:8090` — self-registration form → WhatsApp OTP (Twilio, reads `.twilio.env`) → `POST /api/v1/Person`. **Remove the `log("OTP for %s = %s")` line (≈L57) before real use** — it's a dev convenience for headless e2e |

## sunbird-rc/

Custom override for Sunbird-RC v2.0.1 full quickstart: published `ghcr.io:v2.0.1`
images, `postgres:14`, `cp-kafka`/`cp-zookeeper` pinned `7.5.0`, and dedicated DBs
(`identity`/`credential_schema`/`credential`) for the Node V2 services via
`db-init/01-create-databases.sql`. Requires `POSTGRES_PASSWORD=postgres`.

## infra/registries/ — federated agency registries

Per-agency **sources of truth**, each a standalone FastAPI service (its own SQLite
store, admin UI, and auto-generated OpenAPI). They model the SAR doc's "existing
national systems" as separate hosts and provide the **data-exchange-without-VCs**
path — a relying party confirms a fact by querying the owning registry's API
directly, an alternative to an OID4VP presentation:

| Host | Authority | Entity |
|---|---|---|
| `dad.registry.in-labs.cdpi.dev` | Dept of Agrarian Development | `cultivators` |
| `grama-niladhari.registry.in-labs.cdpi.dev` | e-Grama Niladhari | `attestations` |
| `business.registry.in-labs.cdpi.dev` | Divisional Secretariat | `businesses` |

Each serves a **record table + live search + add-record form at `/`** (like the
Sunbird admin), **Swagger at `/docs`** (+ `/redoc`), the API
(`GET /<entity>` with `?q=` search, `GET /<entity>/{key}`, `POST /<entity>`), and a
**VC-issuance export** `GET /<entity>/issuance` that reshapes rows to a credential's
schema field names so verifiably's bulk **API source** can fan out one credential
per row. One generic config-driven app (`registry_app.py`) + a per-agency
`<agency>.json`; built as `cdpi-registry:local`, brought up by `docker-compose.yml`
on the `waltid_default` network. DNS: wildcard `*.registry.in-labs.cdpi.dev`.

## e2e/

Puppeteer flows. Run with the puppeteer Docker image on the host network; navigate
the **public host** (`http://<HOST>:8080`), never `localhost`, or the session cookie
domain won't match the OIDC `redirect_uri` host → "Auth state mismatch". `flow4.mjs`
= full eSignet login; `flow5.mjs`/`reg-flow.mjs` = registration + login; lower numbers
are earlier probes kept for reference.

## Rebuild

Stand the stack back up on a **fresh, hardened** host — key-only SSH
(`PasswordAuthentication no`, `PermitRootLogin prohibit-password`), default-deny
firewall, internal services bound to `127.0.0.1` behind SSH tunnels (never published
on the public IP). **Generate all keys fresh** — do not reuse anything that touched
the old box.
