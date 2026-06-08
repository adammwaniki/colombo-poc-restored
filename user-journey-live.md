# SAR Workshop — Live User Journeys (operational runbook)

The actual, working end-to-end flows on the deployed stack (walt.id path via
verifiably). Every host is public HTTPS.

## Endpoints at a glance

| Host | What it is | Who uses it |
|---|---|---|
| **`vc.in-labs.cdpi.dev`** | **verifiably** — Issuer / Holder / Verifier, backed by walt.id | officer, citizen, relying party |
| `signup.in-labs.cdpi.dev` | self-registration (email-OTP) → creates a Sunbird `Person` | citizen |
| `sunbird-rc.in-labs.cdpi.dev/admin/` | registry admin portal — Person register + Sunbird-native issuance (PDF + QR) | officer |
| `inji-verify.in-labs.cdpi.dev` | Inji Verify — scan/upload a QR to verify | relying party |
| `esignet.in-labs.cdpi.dev` | eSignet OIDC — National ID + PIN (the login tile) | citizen |

Backend-only (you don't visit directly): `walt-issuer`, `walt-verifier`,
`keycloak`, `wso2` `.in-labs.cdpi.dev`.

**Sample identity:** National ID `80000006`, PIN `100005`.
**Browser tip:** one login at a time; use a fresh Incognito window per person
(stale half-finished logins cause "Auth state mismatch").

---

## The three reusable steps (every journey is built from these)

All three roles live at **`vc.in-labs.cdpi.dev`** and ask you to sign in — pick
the **eSignet** tile (National ID + PIN).

### ISSUE  (officer hands a credential to a citizen)
1. `vc.in-labs.cdpi.dev` → **Issuer** → sign in (eSignet).
2. Pick a DPG → **Walt Community Stack**.
3. Pick the **schema** (which one is named per journey below) → format `w3c_vcdm_2`.
4. Subject data source → **Enter manually** → fill the fields → **Issue credential**.
5. You get an **OID4VCI offer** (QR + same-device link). Hand it to the citizen.

### HOLD  (citizen receives it into their wallet)
1. `vc.in-labs.cdpi.dev` → **Holder** → sign in → Pick a wallet → **API-based** (inline).
2. **Paste the offer link / scan the offer QR** → the credential lands in the wallet.

### VERIFY  (a relying party checks it)
1. `vc.in-labs.cdpi.dev` → **Verifier** → **Request a presentation · OID4VP**.
2. Pick the **credential type** + tick the **fields** you need + leave the
   **policies** on (Signature, Expired, Not Before, Status) → **Generate**.
3. Open the `openid4vp://…` link in the citizen's **Holder** wallet (same device)
   → it presents the matching claims → the verifier shows **✓ Credential valid**.

> Same mechanics for all six credential types — only the schema name and fields change.

---

## Use case 1 — Fertilizer subsidy (Dept of Agrarian Development)

A paddy farmer enrols once, then claims a seasonal e-voucher.

### 1A · Enrolment → `CultivatorCredential`
*Physical, not digitised: the land inspection that confirms cultivation rights.*

| Step | Do | Where |
|---|---|---|
| 1 | Get the farmer on the register (or they self-register) | `signup.in-labs.cdpi.dev` **or** `sunbird-rc.in-labs.cdpi.dev/admin/` |
| 2 | **ISSUE** a `CultivatorCredential` — fields `holder, nationalId, farmId, location, hectares, crops, registeredOn` | `vc.in-labs.cdpi.dev` → Issuer |
| 3 | **HOLD** it in the farmer's wallet | `vc.in-labs.cdpi.dev` → Holder |

Outcome: the farmer holds a portable cultivator credential — the precondition for every claim.

### 1B · Seasonal claim → `FertilizerVoucher`
| Step | Do | Where |
|---|---|---|
| 1 | **VERIFY** the farmer's `CultivatorCredential` (proves eligibility) | `vc.in-labs.cdpi.dev` → Verifier |
| 2 | **ISSUE** a `FertilizerVoucher` — `holder, nationalId, farmId, season, crop, entitlementKg, voucherId, validUntil` | `vc.in-labs.cdpi.dev` → Issuer |
| 3 | **HOLD** it in the wallet | `vc.in-labs.cdpi.dev` → Holder |
| 4 | At the depot, **VERIFY** the voucher before redeeming fertilizer | `vc.in-labs.cdpi.dev` → Verifier |

Outcome: the farmer redeems a verifiable e-voucher for the season's fertilizer.

---

## Use case 2 — Sole-proprietor business permit (Divisional Secretariat)

Assemble the prerequisite credentials, then register the business and issue the permit.

### 2A · Enrolment → collect prerequisites
*Physical, not digitised: the Grama Niladhari in-person address check.*

| Step | Do (each is an ISSUE → HOLD) | Where |
|---|---|---|
| 1 | Get the proprietor on the register | `signup.in-labs.cdpi.dev` **or** `…/admin/` |
| 2 | **ISSUE + HOLD** `AddressProofCredential` (GN) — `holder, nationalId, address, gnDivision, verifiedOn` | `vc.in-labs.cdpi.dev` |
| 3 | **ISSUE + HOLD** `TaxRegistrationCredential` (IRD) — `holder, nationalId, tin, registeredOn` | `vc.in-labs.cdpi.dev` |
| 4 | *(regulated trade only)* **ISSUE + HOLD** `SectorApprovalCredential` — `holder, nationalId, sector, approvalRef, validUntil` | `vc.in-labs.cdpi.dev` |

### 2B · Registration → `BusinessPermitCredential`
| Step | Do | Where |
|---|---|---|
| 1 | **VERIFY** the prerequisites the proprietor presents (address + tax [+ sector]) | `vc.in-labs.cdpi.dev` → Verifier |
| 2 | **ISSUE** a `BusinessPermitCredential` — `holder, nationalId, businessName, businessType, address, permitId, issuedOn` | `vc.in-labs.cdpi.dev` → Issuer |
| 3 | **HOLD** it in the wallet | `vc.in-labs.cdpi.dev` → Holder |

Outcome: the business is registered and the proprietor holds a verifiable permit
to present to banks, suppliers, and authorities (**VERIFY** any time).

---

## Alternative path — registry-of-record + Inji Verify (Sunbird-native)

A second, self-contained track for the **address-proof / GN certificate** style
credentials, where the registry both issues and retains the record:

1. **Issue from the portal:** `sunbird-rc.in-labs.cdpi.dev/admin/` → find the
   citizen → **Credentials** → pick a type (GN certificate, cultivator,
   fertilizer voucher, business permit) → **download the PDF** (carries a
   PixelPass-encoded QR).
2. **Verify by scan:** `inji-verify.in-labs.cdpi.dev` → **Upload QR Code** →
   upload the PDF/QR → **"the given credential is valid!"**
3. **Verify by API (registry-as-record):** another agency trusts it without a
   presentation via the credential service's `/credentials/{id}/verify` and
   `/credentials/search` — the registry retained the record.

Use this path when you want the "scan a paper QR in a MOSIP verifier" or
"agency trusts the register by API" story; use the walt.id path above for the
wallet-centric OID4VCI/OID4VP story.
