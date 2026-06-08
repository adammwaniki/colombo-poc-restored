# Model A — Sunbird register → walt.id issuance, via verifiably's DB source

This wires the **doc-faithful** bulk-issuance pipeline from *SAR Workshop PoC*:

> *"Sunbird RC is used only as a registry, with issuance consolidated on walt.id,
> so the deployment does not run two credential issuers with conflicting formats."*

It uses verifiably's existing **bulk "Database" source** — no new verifiably code.
You point the bulk form at Sunbird's register of record, it runs a `SELECT`, and
**walt.id mints one OID4VCI pre-authorized credential offer per citizen**. Sunbird
stays the register; walt.id stays the only issuer.

```
  Sunbird RC registry            verifiably (DB source)            walt.id issuer
  ┌────────────────┐   SELECT    ┌──────────────────────┐  per row ┌──────────────┐
  │  V_Person      │◄────────────│ bulk.go queryDBRows  │─────────►│ /openid4vc/  │
  │  (register of  │  as         │  rows→[]map[str]str  │  Issue   │  jwt/issue   │
  │   record)      │  vc_reader  │  →Adapter.IssueBulk  │  ToWallet│              │
  └───────┬────────┘             └──────────────────────┘          └──────┬───────┘
          │ vc_* VIEWS (column aliases = schema fields)                    │ offer URI
          │ least-privilege, read-only                                     ▼
          └──────────────────────────────────────────────► holder wallet (Credo / Inji)
                                                            claims the pre-auth offer
```

The "bulk" is **fan-out over rows** — each row is one normal `IssueToWallet`
call — not a batch crypto primitive. That is why no walt.id change is needed:
the issuer already does single-credential OID4VCI; we just feed it register rows.

---

## The three use-case credentials

The access layer ships three SQL **views** over the registry's `V_Person` table.
Each view's column names are the credential's `credentialSubject` field names
*verbatim* (case-sensitive) — `bulk.go` keys every row by column name, so the
view columns and the chosen schema's fields must line up exactly.

| View | SAR use-case flow | Credential | Fields (= columns) |
|------|-------------------|------------|--------------------|
| `vc_fertilizer_cultivator` | Fertilizer subsidy · **enrolment** | `CultivatorCredential` | `holder, nationalId, farmId, location, hectares, crops, registeredOn` |
| `vc_fertilizer_voucher`    | Fertilizer subsidy · **seasonal claim** | `FertilizerVoucher` | `holder, nationalId, farmId, season, crop, entitlementKg, voucherId, validUntil` |
| `vc_business_permit`       | Business permit · **registration** | `BusinessPermitCredential` | `holder, nationalId, businessName, businessType, address, permitId, issuedOn` |

**Eligibility is the `WHERE` clause.** The cultivator/voucher views only surface
people the land inspection put on the register as cultivators with an allocated
parcel (`isCultivator IS TRUE AND farmId IS NOT NULL`). A real deployment would
add allocation/eligibility joins here; the view is the single place to encode them.

> `farmId`, `season`, `entitlementKg`, `businessName`, `permitId` etc. are derived
> from `V_Person` for the demo (e.g. `entitlementKg = hectares × 50`). In
> production each view reads the authoritative columns the enrolment/registration
> flows actually write.

---

## Prerequisites

- Sunbird RC registry up with the `V_Person` register seeded (the workshop's
  22 synthetic citizens) — `sunbird-rc-db-1` postgres published on host `:15432`.
- verifiably-go up at `http://156.67.105.185:8080` with the **Walt Community
  Stack** issuer DPG, and the walt.id issuer-api on `:7002`.
- verifiably-go can reach the host gateway (it ships
  `--add-host host.docker.internal:host-gateway`) — this is how it reaches the
  published Sunbird DB port. Verified.

---

## Step 1 — install the access layer (once)

Creates the read-only `vc_reader` role + the three views. Idempotent, additive,
non-destructive (no registry table is touched; the registry keeps running):

```bash
docker exec -i sunbird-rc-db-1 psql -U postgres -d registry < sql/init-views.sql
```

Verify least-privilege — `vc_reader` reads the views but nothing else:

```bash
# reads the views  → row counts
PGPASSWORD=vc_reader psql -h <host> -p 15432 -U vc_reader -d registry \
  -c 'SELECT count(*) FROM vc_fertilizer_cultivator;'   # → 15
# denied on the base table and on keycloak
PGPASSWORD=vc_reader psql -h <host> -p 15432 -U vc_reader -d registry \
  -c 'SELECT * FROM "V_Person";'                        # → permission denied
```

## Step 2 — the connection string (DSN)

Pick the one matching where verifiably runs (it only ever sees the three views):

| verifiably location | DSN to paste |
|---------------------|--------------|
| **in docker on the Sunbird host** (the live workshop setup) | `postgres://vc_reader:vc_reader@host.docker.internal:15432/registry` |
| on bare metal (`go run ./cmd/server`) | `postgres://vc_reader:vc_reader@localhost:15432/registry` |
| different host | `postgres://vc_reader:vc_reader@<sunbird-host>:15432/registry` |

> Alternative (no host-gateway): `docker network connect sunbird-rc_default
> verifiably-go` once, then use `postgres://vc_reader:vc_reader@sunbird-rc-db-1:5432/registry`.

## Step 3a — issue through the verifiably UI

1. Open `http://156.67.105.185:8080` → **Issuer** → log in (`admin`/`admin`, keycloak).
2. **DPG** → pick **Walt Community Stack** → continue.
3. **Schema** → the bulk DB form only accepts rows whose keys match the selected
   schema's fields. Build the matching custom schema once via **Schema → Build**
   (Std `w3c_vcdm_2` / `jwt_vc_json`), with fields exactly as the table above —
   e.g. for enrolment: `holder, nationalId, farmId, location, hectares, crops,
   registeredOn`. Save it (writes the walt.id catalog entry), then pick it.
   *(Shortcut: shape a view to a stock schema's fields — e.g. `VerifiableId` —
   to skip schema-building, at the cost of the credential `type` being the stock
   name rather than `CultivatorCredential`.)*
4. **Mode** → **Bulk** + **Wallet** → continue.
5. **Database** chip → paste the **DSN** (Step 2) + the **query** for that schema
   (below) → **Submit**.
6. Result table: one row per citizen with recipient, ✓/✗ status, the **offer URI**,
   and per-row **Copy link** / **QR**, plus **Download CSV** (audit:
   `row, recipient, status, offer_uri, error`). Hand each offer URI to that
   citizen's wallet.

### Paste-ready queries (one per schema)

With the views installed, the query is trivial — the mapping already lives in the view:

```sql
-- Fertilizer subsidy · enrolment  → CultivatorCredential
SELECT * FROM vc_fertilizer_cultivator ORDER BY holder LIMIT 50;

-- Fertilizer subsidy · seasonal claim → FertilizerVoucher
SELECT * FROM vc_fertilizer_voucher ORDER BY holder LIMIT 50;

-- Business permit · registration → BusinessPermitCredential
SELECT * FROM vc_business_permit ORDER BY holder LIMIT 50;
```

`sql/queries.sql` also has the **inline** equivalents (the full aliased SELECT
against `V_Person`) for when you'd rather not install views.

## Step 3b — issue through the REST API

Same pipeline, headless. The bulk endpoints need an API key set in verifiably's
`.env` (`VERIFIABLY_API_KEYS=<name>:<key>`) — **not enabled on the live box**, so
turn it on first if you want this path.

```bash
# rows you'd POST come straight from a view:
psql "$DSN" -tAc \
  'SELECT json_agg(t) FROM (SELECT * FROM vc_fertilizer_cultivator LIMIT 50) t;'

curl -sX POST http://156.67.105.185:8080/api/v1/credentials/issue/bulk \
  -H "Authorization: Bearer $KEY" -H 'Content-Type: application/json' \
  -d '{"schema_id":"<CultivatorCredential schema id>","rows":[ <rows> ]}'
# → {accepted, rejected, rows:[{row, credential_id, offer_uri, pin, status}]}
# async + SSE progress: POST /api/v1/credentials/issue/bulk/async → 202 {job_id, events_url}
```

---

## Verify it works (proof)

`scripts/issue_one.py` reads one view row on stdin and runs the exact sequence
the walt.id adapter runs per bulk row (onboard issuer key → build VCDM
credentialData → `POST /openid4vc/jwt/issue`). A real offer URI back = the whole
Model-A path works from a least-privilege register read:

```bash
docker run --rm --network waltid_default --add-host host.docker.internal:host-gateway \
  -e PGPASSWORD=vc_reader postgres:14 \
  psql -h host.docker.internal -p 15432 -U vc_reader -d registry -tAc \
  "SELECT row_to_json(t) FROM (SELECT * FROM vc_fertilizer_cultivator LIMIT 1) t;" \
| python3 scripts/issue_one.py --type CultivatorCredential
```

Proven output (2026-06-08), all three credentials minting offers:

```
SUBJECT:    {"holder":"Achieng Njoroge","nationalId":"80000006","farmId":"KE-FARM-0006",
             "location":"Nairobi","hectares":"2","crops":"Paddy","registeredOn":"2026-05-01"}
OFFER_URI:  openid-credential-offer://?credential_offer_uri=https%3A%2F%2Fwalt-issuer...
```

---

## How it maps to verifiably internals

- **DB source** = `internal/handlers/bulk.go` → `BulkFromDB` → `queryDBRows`:
  opens a pgx connection, enforces **SELECT-only**, coerces every column to a
  string keyed by column name → `[]map[string]string`.
- Those rows → `Adapter.IssueBulk` → the **walt.id adapter** (`internal/adapters/
  waltid/issuer.go:763`) loops `IssueToWallet` per row → `/openid4vc/jwt/issue`,
  pre-auth → one offer URI per row.
- Which source chips show is gated by the DPG's `bulk_source` capabilities;
  the walt.id DPG declares none → falls back to **csv + api + db**, so the
  Database chip is available out of the box.

## Security notes

- `vc_reader` is a **least-privilege** login: PG14 views run with the owner's
  (postgres) rights, so `vc_reader` reads the three curated views **without** any
  grant on `V_Person`, keycloak, or credential tables. The DSN you paste into a
  web form cannot reach PII outside the curated projection. Verified: direct
  `SELECT` on `V_Person`/`client` → `permission denied`.
- Change the demo password before any non-throwaway use
  (`ALTER ROLE vc_reader PASSWORD '…'`).
- The bulk DB source trusts the operator's query (SELECT-only). Keep the DSN to
  the read-only role; never paste the `postgres` superuser DSN.

## Teardown

```bash
docker exec -i sunbird-rc-db-1 psql -U postgres -d registry < sql/drop.sql
```

## Files

```
model-a-sunbird-db-source/
├── README.md                 # this file
├── sql/
│   ├── init-views.sql        # vc_reader role + 3 views  (idempotent)
│   ├── drop.sql              # teardown
│   └── queries.sql           # paste-ready SELECTs (view-based + inline)
└── scripts/
    └── issue_one.py          # one-row proof of the walt.id leg
```
