# User Journeys — SAR Workshop PoC

End-to-end flows for the two MVP public-service journeys in *SAR Workshop PoC*:

1. **Fertilizer subsidy (Yala)** — enrolment + seasonal claim
2. **Sole-proprietor business permit** — enrolment + registration

Both run on the same five open-source components and the same credential
lifecycle: **authenticate the person → check the authoritative record → issue a
portable credential → hold it → verify it on presentation.** Issuance is
consolidated on walt.id; Sunbird RC is the register of record only.

---

## The five MVP components (as deployed)

| Lifecycle step | Component | In this deployment |
|----------------|-----------|--------------------|
| **Authenticate** | **eSignet** | `:3005` (OIDC UI) → eSignet `:8088`. Authenticates a citizen by **National ID + PIN** against the register, via the Authenticator plugin (mock-identity forked to read Sunbird `V_Person`). The live population register is mocked, per the MVP. |
| **Check record** | **Sunbird RC** | Registry of record (`V_Person`), `:18091`. Read interactively, or in bulk through verifiably's **DB source** (Model A — see `model-a-sunbird-db-source/`). |
| **Issue** | **walt.id** (via **verifiably**) | OID4VCI **pre-authorized-code**, W3C VCDM / SD-JWT VC. verifiably orchestrates; walt.id signs. UI at `:8080`. |
| **Hold** | **Credo wallet** (cdpi-wallet) / **Inji Web** | Receives the OID4VCI offer and stores the credential. (Credo holder not yet wired; Inji Web wallet is available in-stack.) |
| **Verify** | **walt.id verifier** (via verifiably) | OID4VP presentation, or direct scan/upload/paste. Checks signature, expiry, status-list revocation. |

**Standing choices** (keep the five interoperable): one pinned OID4VCI/OID4VP
version + **HAIP** (SD-JWT VC, ES256); mocked identity source; **single issuer**
(walt.id) with Sunbird registry-only.

**What stays physical** (digitised only as a record + credential): the **land
inspection** that establishes cultivation rights, and the **Grama Niladhari
address verification**.

**Two ways to issue** — both go through the same walt.id issuer:
- **Interactive / single** — one citizen at a time, authenticated via eSignet
  (the journeys below are written this way).
- **Bulk / back-office** — a ministry officer issues to many eligible citizens at
  once by reading the register through verifiably's **DB source**
  (`SELECT … FROM vc_* views`). Same credential, same issuer; eligibility is the
  query's `WHERE` clause. Flagged inline as **⇒ Bulk** where it applies.

Sample test identity (seeded): National ID `80000006`, PIN `100005`
(`isCultivator = true`, `farmId = KE-FARM-0006`).

---

# Use case 1 — Fertilizer subsidy (Yala)

The subsidy targets paddy farmers each Yala season. In the MVP the entitlement is
delivered as an **e-voucher credential** (no cash/payment leg). Two flows: a
one-time **enrolment** that puts a farmer on the register and gives a
**CultivatorCredential**, and a per-season **claim** that checks eligibility and
issues the **FertilizerVoucher**.

## 1.1 Enrolment (first-time farmer or tenant)

**Who:** an agricultural extension officer + the farmer. **When:** once, on first
registration. **Physical step retained:** the land inspection.

```
Farmer ── physical land inspection ──► Officer
Officer ── record farmer + parcel ───► Sunbird RC (V_Person)
Officer ── issue via verifiably ─────► walt.id ──► offer URI
Farmer ── scan offer / eSignet login ► Wallet  ◄── CultivatorCredential
```

| # | Actor | Component | Action |
|---|-------|-----------|--------|
| 1 | Officer | — (physical) | Inspects the land; confirms cultivation rights. *Not digitised.* |
| 2 | Officer | **Sunbird RC** | Records the farmer + parcel on the register: a `Person` with `isCultivator=true`, `farmId`, `farmSizeHectares`, `primaryCrops`, `region`. This is the authoritative record. |
| 3 | Farmer | **eSignet** | (Optional, to bind issuance to the citizen) authenticates with National ID + PIN; eSignet reads the just-written `V_Person` record. |
| 4 | Officer | **verifiably → walt.id** | Issues a **`CultivatorCredential`** (`holder, nationalId, farmId, location, hectares, crops, registeredOn`) as an OID4VCI pre-auth offer. **⇒ Bulk:** at a registration drive, issue to every newly-enrolled cultivator at once via the **DB source** → `SELECT * FROM vc_fertilizer_cultivator`. |
| 5 | Farmer | **Wallet** (Credo/Inji) | Opens the offer URI (QR or link), accepts; the `CultivatorCredential` lands in the wallet. |

**Outcome:** the farmer holds a portable `CultivatorCredential` and is on the
register as a cultivator — the precondition for every seasonal claim.

## 1.2 Seasonal claim (already-enrolled farmer, once per Yala season)

**Who:** the enrolled farmer (self-service). **Precondition:** holds a valid
`CultivatorCredential` / is on the register as a cultivator.

```
Farmer ── eSignet login ───────────► authenticated
        ── present CultivatorCred ──► walt.id verifier (eligibility)
Office ── check register/eligibility► Sunbird RC
        ── issue entitlement ───────► walt.id ──► offer URI
Farmer ── accept ──────────────────► Wallet ◄── FertilizerVoucher (e-voucher)
```

| # | Actor | Component | Action |
|---|-------|-----------|--------|
| 1 | Farmer | **eSignet** | Authenticates with National ID + PIN. |
| 2 | Farmer | **Wallet → walt.id verifier** | Presents the `CultivatorCredential` (OID4VP), or the office re-checks the register — proving eligibility for this season. |
| 3 | Office | **Sunbird RC** | Confirms the farmer is an enrolled cultivator and has not already claimed this season (eligibility rule). |
| 4 | Office | **verifiably → walt.id** | Issues a **`FertilizerVoucher`** (`holder, nationalId, farmId, season="Yala 2026", crop, entitlementKg, voucherId, validUntil`) — the entitlement as an e-voucher credential. **⇒ Bulk:** at season open, issue vouchers to all eligible cultivators via the **DB source** → `SELECT * FROM vc_fertilizer_voucher` (entitlement derived from registered hectares). |
| 5 | Farmer | **Wallet** | Accepts the `FertilizerVoucher`. |
| 6 | Farmer | depot + **walt.id verifier** | At the agro-dealer/depot, presents the voucher; the depot verifies signature + validity + that it is unspent, and redeems it for fertilizer. |

**Outcome:** the farmer redeems a verifiable e-voucher for the season's fertilizer
— no cash transfer, reusing the same issuer and wallet.

---

# Use case 2 — Sole-proprietor business permit

Registers a sole proprietorship. No payments / G2P component — it runs entirely on
the five MVP components. Two flows: **enrolment** that gathers the prerequisite
credentials into the wallet, and **registration** that validates them and records
the business name. The Grama Niladhari address verification stays physical; only
the certificate becomes a credential.

## 2.1 Enrolment (assemble prerequisite credentials)

**Who:** the prospective proprietor. **Goal:** collect each supporting document as
a verifiable credential in the wallet. For a **regulated trade**, add a sector
approval.

```
Proprietor ── eSignet login ─────────► authenticated (National ID)
GN office ── physical address check ──► (physical) ──► Address Proof credential
Issuers ── issue each supporting doc ─► walt.id ──► offers
Proprietor ── accept each ───────────► Wallet ◄── [IdentityVC, AddressProofVC,
                                                   TaxVC, (SectorApprovalVC)]
```

| # | Actor | Component | Action |
|---|-------|-----------|--------|
| 1 | Proprietor | **eSignet** | Authenticates with National ID + PIN; establishes the verified identity the supporting credentials bind to. |
| 2 | GN officer | — (physical) | Verifies the residential/business address in person. *Not digitised.* |
| 3 | GN office | **verifiably → walt.id** | Issues the **Address Proof** as a credential (the GN certificate). |
| 4 | Other issuers | **verifiably → walt.id** | Issue the remaining prerequisites as credentials — identity attestation, tax/TIN, and **for a regulated trade a sector approval**. **⇒ Bulk:** any office issuing the same prerequisite to a known cohort uses the **DB source**. |
| 5 | Proprietor | **Wallet** | Accepts each offer; the wallet now holds the full set of prerequisite credentials. |

**Outcome:** the proprietor's wallet holds the assembled prerequisite credentials,
ready to present for registration.

## 2.2 Registration (validate + record + issue the permit)

**Who:** the proprietor + the business-registry officer.

```
Proprietor ── eSignet login ──────────► authenticated
           ── present prerequisites ──► walt.id verifier (OID4VP)
Registrar ── validate VCs ────────────► all signatures/expiry/status OK
Registrar ── record business name ────► Sunbird RC (Business register)
           ── issue permit ───────────► walt.id ──► offer URI
Proprietor ── accept ─────────────────► Wallet ◄── BusinessPermitCredential
```

| # | Actor | Component | Action |
|---|-------|-----------|--------|
| 1 | Proprietor | **eSignet** | Authenticates with National ID + PIN. |
| 2 | Proprietor | **Wallet → walt.id verifier** | Presents the assembled prerequisite credentials (identity, address proof, tax, + sector approval if regulated) in one OID4VP exchange. |
| 3 | Registrar | **walt.id verifier** | Validates every presented credential — signature, expiry, status-list (not revoked), and required claims. |
| 4 | Registrar | **Sunbird RC** | On success, records the **business name** + proprietor on the business register (authoritative record). |
| 5 | Registrar | **verifiably → walt.id** | Issues the **`BusinessPermitCredential`** (`holder, nationalId, businessName, businessType, address, permitId, issuedOn`) as an OID4VCI offer. **⇒ Bulk:** reissue/renew permits for a batch via the **DB source** → `SELECT * FROM vc_business_permit`. |
| 6 | Proprietor | **Wallet** | Accepts the `BusinessPermitCredential` — the portable proof of registration. |

**Outcome:** the business is on the register and the proprietor holds a verifiable
business permit, presentable to banks, suppliers, and authorities.

---

## Sample custom schemas (build these once in verifiably)

These are the credential schemas the journeys above issue. walt.id's stock
catalog has no "cultivator / voucher / permit" types, so each is a **custom
schema** — build it once in **Issuer → Schema → Build** (or seed
`config/custom-schemas.user.json`), then the bulk **Database** source / single
issuance can target it.

Conventions, grounded in the deployed builder:
- **Std (interop profile).** The doc's standing choice is **HAIP — SD-JWT VC with
  ES256**, i.e. `Std: "sd_jwt_vc"`. The box's proven walt.id path today is
  `Std: "w3c_vcdm_2"` (W3C VCDM 2.0, `jwt_vc_json`, via the adapter's borrow);
  swap to `sd_jwt_vc` for HAIP conformance once the catalog entry is in place.
- **Field names are case-sensitive and MUST equal the DB-source view columns**
  (`model-a-sunbird-db-source/sql/init-views.sql`) — `bulk.go` keys each row by
  column name, so a mismatch silently drops the field.
- **Datatypes** the builder offers: `string`, `number`, `integer`, `boolean`,
  `date` (= `string`+`format:date`), `uri`. *Caveat:* the DB bulk source coerces
  every value to a string, so numeric/date types are advisory there — use the
  manual or API/JSON source if you need strict typing in the VC.
- The **Source** column shows where each value comes from: a `V_Person` register
  column (so it flows through the bulk path), a presented credential, or a
  physical/derived step.

### 1.1 `CultivatorCredential` — Fertilizer subsidy · enrolment
Issuer attribution: *Department of Agrarian Development*. View: `vc_fertilizer_cultivator`.

| Field | Type | Req | Source |
|-------|------|-----|--------|
| `holder` | string | ✓ | `V_Person.fullName` |
| `nationalId` | string | ✓ | `V_Person.nationalId` |
| `farmId` | string | ✓ | `V_Person.farmId` |
| `location` | string |  | `V_Person.region` |
| `hectares` | number |  | `V_Person.farmSizeHectares` |
| `crops` | string |  | `V_Person.primaryCrops` |
| `registeredOn` | date | ✓ | enrolment date |

### 1.2 `FertilizerVoucher` — Fertilizer subsidy · seasonal claim
Issuer attribution: *Department of Agrarian Development*. View: `vc_fertilizer_voucher`.

| Field | Type | Req | Source |
|-------|------|-----|--------|
| `holder` | string | ✓ | `V_Person.fullName` |
| `nationalId` | string | ✓ | `V_Person.nationalId` |
| `farmId` | string | ✓ | `V_Person.farmId` |
| `season` | string | ✓ | `"Yala 2026"` |
| `crop` | string |  | `V_Person.primaryCrops` (first) |
| `entitlementKg` | integer | ✓ | derived (`hectares × 50`; real: allocation table) |
| `voucherId` | string | ✓ | derived (`YALA2026-<nationalId>`) |
| `validUntil` | date | ✓ | season end |

### 2.1 Prerequisite credentials — Business permit · enrolment
The enrolment flow assembles these into the wallet first; the registration flow
verifies them (OID4VP). Each is its own custom schema, issued by its authority.
These are *presented*, not read from `V_Person`, so they're single-issuance
(not bulk DB-source) credentials.

**`AddressProofCredential`** — issuer *Grama Niladhari* (the GN certificate; the
in-person address check stays physical):

| Field | Type | Req | Source |
|-------|------|-----|--------|
| `holder` | string | ✓ | applicant name |
| `nationalId` | string | ✓ | National ID |
| `address` | string | ✓ | verified address |
| `gnDivision` | string | ✓ | GN division |
| `verifiedOn` | date | ✓ | inspection date |

**`TaxRegistrationCredential`** — issuer *Inland Revenue Department*:

| Field | Type | Req | Source |
|-------|------|-----|--------|
| `holder` | string | ✓ | taxpayer name |
| `nationalId` | string | ✓ | National ID |
| `tin` | string | ✓ | tax identification number |
| `registeredOn` | date | ✓ | TIN issue date |

**`SectorApprovalCredential`** — issuer *sector regulator* (only for a **regulated
trade**, e.g. food, pharma, transport):

| Field | Type | Req | Source |
|-------|------|-----|--------|
| `holder` | string | ✓ | applicant name |
| `nationalId` | string | ✓ | National ID |
| `sector` | string | ✓ | regulated sector |
| `approvalRef` | string | ✓ | approval reference |
| `validUntil` | date | ✓ | approval expiry |

> Identity itself is **not** a custom schema here — it is asserted at runtime by
> **eSignet** (National ID + PIN) at the top of each flow, per the MVP's "mocked
> identity source" choice, so the credentials above bind to an already-verified
> citizen rather than re-attesting identity.

### 2.2 `BusinessPermitCredential` — Business permit · registration
Issuer attribution: *Divisional Secretariat (Business Registration)*. View: `vc_business_permit`.

| Field | Type | Req | Source |
|-------|------|-----|--------|
| `holder` | string | ✓ | `V_Person.fullName` (proprietor) |
| `nationalId` | string | ✓ | `V_Person.nationalId` |
| `businessName` | string | ✓ | business register |
| `businessType` | string | ✓ | `"Sole Proprietorship"` |
| `address` | string | ✓ | register / GN certificate |
| `permitId` | string | ✓ | derived (`BP-<nationalId>`) |
| `issuedOn` | date | ✓ | registration date |

### Persisted shape (one full example)
`Issuer → Schema → Build` writes entries like this to
`config/custom-schemas.user.json` (`ID` is auto-assigned `custom-<base36>`;
`Datatype:"string" + Format:"date"` is what the builder's **date** option emits):

```json
{
  "Name": "CultivatorCredential",
  "Std": "sd_jwt_vc",
  "Custom": true,
  "IssuerDisplayName": "Department of Agrarian Development",
  "AdditionalTypes": ["CultivatorCredential"],
  "FieldsSpec": [
    {"Name": "holder",       "Datatype": "string",  "Format": "",     "Required": true},
    {"Name": "nationalId",   "Datatype": "string",  "Format": "",     "Required": true},
    {"Name": "farmId",       "Datatype": "string",  "Format": "",     "Required": true},
    {"Name": "location",     "Datatype": "string",  "Format": "",     "Required": false},
    {"Name": "hectares",     "Datatype": "number",  "Format": "",     "Required": false},
    {"Name": "crops",        "Datatype": "string",  "Format": "",     "Required": false},
    {"Name": "registeredOn", "Datatype": "string",  "Format": "date", "Required": true}
  ]
}
```

---

## Where the DB-source bulk path fits

The journeys above are the **interactive, per-person** path (eSignet-authenticated,
one credential at a time). The **`model-a-sunbird-db-source/`** build is the
**back-office bulk** path for the issuance steps marked **⇒ Bulk**: an officer
reads the register through verifiably's Database source and issues to every
eligible citizen in one operation. Same register of record, same walt.id issuer,
same credential — eligibility is encoded as the view's `WHERE` clause
(`vc_fertilizer_cultivator`, `vc_fertilizer_voucher`, `vc_business_permit`).
Proven end-to-end: register row (read least-privilege) → walt.id offer URI.

## Maps to existing national systems

The MVP **fronts** systems Sri Lanka already operates (National ID, agrarian
register, GN address attestation, business registry) — it does not replace them.
eSignet wraps the existing identity backend; Sunbird RC mirrors the authoritative
records; walt.id adds the portable, verifiable credential layer on top.

> **Extension path (Section 2 of the doc, not in the MVP):** the fertilizer
> journey grows a payment leg (OpenG2P → Mifos Payment Hub EE → Mojaloop) to
> move from e-voucher to cash transfer; both journeys can add identity, credential
> lifecycle (revocation/renewal), offline presentation, consent, and verifier
> choice (CREDEBL) — each additive, attaching at seams the MVP already exposes.
