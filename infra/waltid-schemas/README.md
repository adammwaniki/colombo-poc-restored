# walt.id custom schemas for the SAR use cases

`custom-schemas.user.json` — the 6 custom schemas (drop into
`verifiably-go/config/custom-schemas.user.json`, restart verifiably). Use case 1
(fertilizer subsidy): `CultivatorCredential`, `FertilizerVoucher`. Use case 2
(business permit): `AddressProofCredential`, `TaxRegistrationCredential`,
`SectorApprovalCredential`, `BusinessPermitCredential`. All `Std: w3c_vcdm_2`.

## Gotcha: a schema in the picker is NOT enough to issue

Building/seeding a schema populates verifiably's **picker**, but walt.id only
issues a credential whose **`configurationId` is advertised in its issuer
catalog** (`deploy/k8s/config/issuer/credential-issuer-metadata.conf`). For a
`w3c_vcdm_2` schema named `Foo`, that's three configs:
`Foo_jwt_vc_json`, `Foo_jwt_vc_json-ld`, `Foo_ldp_vc`.

`SaveCustomSchema` (the UI **Issuer → Schema → Build** / `POST /api/v1/schemas`)
appends those to the catalog and restarts **issuer-api**. Symptom when the catalog
is missing them:

```
POST .../openid4vc/jwt/issue: 400 "Invalid Credential Configuration Id"
[DIAG: walt.id rejected configurationId="Foo_jwt_vc_json". Advertised configIDs (323): ...]
```

**Why it can regress:** the runtime catalog is seeded from
`credential-issuer-metadata.baseline.conf` (see `gen-caddy.sh`). If the runtime
conf gets re-seeded from baseline (a deploy, or a manual reset), the custom
entries are wiped — even though the schemas are still in `custom-schemas.user.json`
and verifiably still *sends* the real configID. The catalog and the picker drift.

## Recovery: re-sync the catalog

`scripts/waltid_catalog_sync.py` (repo root `scripts/`) replicates verifiably's
`appendCredentialType()` HOCON exactly. It reads `custom-schemas.user.json` and
appends every missing configID to BOTH the runtime conf and the baseline (so a
future re-seed keeps them). Run on the VPS, then restart issuer-api:

```bash
python3 /root/colombo-poc/waltid_catalog_sync.py
docker restart waltid-issuer-api-1
# verify: the 18 configIDs appear in
#   docker exec waltid-issuer-api-1 wget -qO- http://localhost:7002/draft13/.well-known/openid-credential-issuer
```

Idempotent (skips configIDs already present). Writing them into the **baseline**
too is what makes the fix durable against re-seeds.
