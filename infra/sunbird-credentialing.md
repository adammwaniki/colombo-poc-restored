# Sunbird-native credentialing chain

Brings up Sunbird RC's own signing stack so the registry can **issue** verifiable
credentials (e.g. a Grama Niladhari certificate) from its own issuer DID — a track
separate from walt.id. Once issued, the credential service **retains the record**,
so another agency can trust it by API query (`/verify`, `/search`) instead of a VC
presentation, while the VC also lives in the citizen's wallet.

## Services (Sunbird compose, project `sunbird-rc`)

| Service | Port | Role |
|---|---|---|
| `vault` | 8200 | key store (signing keys live here) |
| `identity` | 3332 | DID generation + `/utils/sign` /`/utils/verify` |
| `credential-schema` | 3333 | credential schemas (`/credential-schema`) |
| `credential` | 3000 | issue/verify/search (`/credentials/*`) |

They share `sunbird-rc-db-1` but on **dedicated DBs** (`identity`, `credential_schema`,
`credential`) — the override sets that to avoid Prisma P3005 vs the Java registry's
`registry` DB.

## Bring-up (from `/root/colombo-poc/sunbird-rc`)

```bash
# 1. Vault: init (1 key for the demo), unseal, enable the KV engine
docker exec -e VAULT_ADDR=http://127.0.0.1:8200 sunbird-rc-vault-1 \
  vault operator init -key-shares=1 -key-threshold=1 -format=json > vault-keys.json
KEY=$(python3 -c 'import json;print(json.load(open("vault-keys.json"))["unseal_keys_b64"][0])')
TOK=$(python3 -c 'import json;print(json.load(open("vault-keys.json"))["root_token"])')
docker exec -e VAULT_ADDR=http://127.0.0.1:8200 sunbird-rc-vault-1 vault operator unseal "$KEY"
docker exec -e VAULT_ADDR=http://127.0.0.1:8200 -e VAULT_TOKEN="$TOK" sunbird-rc-vault-1 \
  vault secrets enable -path=kv kv-v2

# 2. .env — the credentialing/vault vars the base compose references (none were set):
#    VAULT_ADDR=http://vault:8200  VAULT_BASE_URL=http://vault:8200/v1  VAULT_ROOT_PATH=kv
#    VAULT_TOKEN=$TOK  VAULT_TIMEOUT=15000  VAULT_PROXY=false
#    SIGNING_ALGORITHM=Ed25519Signature2020   ENABLE_AUTH=false  JWKS_URI=
#    WEB_DID_BASE_URL=https://sunbird-rc.in-labs.cdpi.dev/
#    IDENTITY_BASE_URL=http://identity:3332          # NO trailing slash
#    SCHEMA_BASE_URL=http://credential-schema:3333   # NO trailing slash
#    CREDENTIAL_SERVICE_BASE_URL=http://credential:3000
#    QR_TYPE=W3C-VC

# 3. dedicated DBs (db-init creates them on a fresh db; else create by hand)
for db in identity credential credential_schema; do
  docker exec sunbird-rc-db-1 psql -U postgres -tAc "SELECT 1 FROM pg_database WHERE datname='$db'" \
    | grep -q 1 || docker exec sunbird-rc-db-1 psql -U postgres -c "CREATE DATABASE $db"; done

# 4. bring up the chain (--no-deps avoids the vault health-gate flakiness;
#    env -u keeps verifiably's .env from leaking POSTGRES_/KEYCLOAK_ in)
env -u POSTGRES_PASSWORD -u KEYCLOAK_REALM docker compose up -d --no-deps identity
env -u POSTGRES_PASSWORD -u KEYCLOAK_REALM docker compose up -d --no-deps credential-schema credential
# verify: curl :3332/health :3333/health :3000/health  → all 200
```

## Gotchas (each cost a debugging round)

1. **Vault re-seals on every restart** (file backend) → the chain breaks until unsealed.
   See *Unseal* below. Changing any vault-related `.env` var makes compose recreate the
   vault container → it re-seals; unseal again afterwards.
2. **Trailing slash on `*_BASE_URL`** → services build `http://identity:3332//health`
   → **404** → unhealthy. Drop the trailing slash.
3. **`SIGNING_ALGORITHM=Ed25519`** → DID generate fails *"Signature suite not supported"*.
   Use the full suite name **`Ed25519Signature2020`**.
4. **Ajv 2019** (credential service validator) doesn't know **`draft-07`** → schema
   `$schema` must be `https://json-schema.org/draft/2019-09/schema`.
5. **JSON-LD safe mode** drops `credentialSubject` terms not in any `@context`
   → *"did not expand into an absolute IRI"*. Add `{"@vocab": "...#"}` to the credential
   `@context`.

## Issuance + verification (`scripts/sunbird_issue_gn.py`)

```
DID   = POST identity:3332/did/generate {content:[{method:"web", alsoKnownAs:[...]}]}
schema= POST credential-schema:3333/credential-schema { ...PUBLISHED... author=DID }
issue = POST credential:3000/credentials/issue { credential{...subject...}, credentialSchemaId, ... }
        -> signed VC (Ed25519Signature2020), credentialId "did:GramaNiladhari:..."
verify= GET  credential:3000/credentials/{id}/verify   -> {status:ISSUED, checks:[revoked/expired/proof OK]}
search= POST credential:3000/credentials/search {subject:{id}}   -> the citizen's certs, by subject
```

The last two are the **track-4 pattern**: an agency trusts the credential by API call,
no VC presentation needed; the signed VC still goes to the citizen's wallet.

## Portal issuance ("Issue GN certificate" button)

`scripts/gn_issuer_api.py` (container `gn-issuer-api`, on `sunbird-rc_default`,
published `:8091`) self-bootstraps a **persistent** GN issuer DID + schema
(`issuer-state/gn-issuer.json`) and exposes `POST /issuer/issue {nationalId}`,
`GET /issuer/list?nationalId=`. Caddy routes `sunbird-rc.in-labs.cdpi.dev/issuer/*`
to it — same-origin with `/admin` (the portal) and `/api/v1` (the registry). The
registry-admin portal's per-row **"GN cert"** button calls it; proven headless
(`e2e/portal-gncert.mjs`): GN cert → Issue → signed VC + verified ✓.

> **Gotcha:** the issuer-api must be a docker-**published** port, NOT `--network host`.
> `caddy-public` reaches it via `host.docker.internal:8091`, and a host-network
> process on the host's INPUT chain is blocked by **ufw** (default-deny). Published
> ports bypass ufw via the DOCKER chains (same reason the registry's `:18091` works).

## Unseal (after any reboot / vault restart)

```bash
cd /root/colombo-poc/sunbird-rc
KEY=$(python3 -c 'import json;print(json.load(open("vault-keys.json"))["unseal_keys_b64"][0])')
docker exec -e VAULT_ADDR=http://127.0.0.1:8200 sunbird-rc-vault-1 vault operator unseal "$KEY"
# identity/credential-schema/credential recover on their next request — no restart needed.
```

A **`vault-unsealer`** sidecar (see `scripts/vault_autounseal.sh`) keeps Vault unsealed
automatically across restarts/reboots, so this manual step isn't normally needed.
(`vault-keys.json` holds the unseal key + root token — sensitive; for production use
cloud-KMS auto-unseal instead of a stored key.)
