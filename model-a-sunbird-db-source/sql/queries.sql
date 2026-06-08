-- ===========================================================================
-- Paste-ready SELECTs for verifiably's bulk "Database" source (Model A).
--
-- verifiably's bulk form accepts SELECT-only queries and keys each output row
-- by COLUMN NAME, so the column aliases here MUST equal the chosen schema's
-- credentialSubject field names verbatim (case-sensitive camelCase).
--
-- DSN (read-only role; see README Step 2):
--   postgres://vc_reader:vc_reader@host.docker.internal:15432/registry
--
-- Two flavours below:
--   • VIEW-BASED  — needs init-views.sql; query is a trivial SELECT * FROM view.
--   • INLINE      — no views; the full aliased SELECT against V_Person. Use the
--                   postgres DSN, or grant a read-only role SELECT on V_Person.
-- ===========================================================================


-- ###########################################################################
-- VIEW-BASED (recommended — run init-views.sql first)
-- ###########################################################################

-- Fertilizer subsidy · ENROLMENT  → CultivatorCredential
SELECT * FROM vc_fertilizer_cultivator ORDER BY holder LIMIT 50;

-- Fertilizer subsidy · SEASONAL CLAIM  → FertilizerVoucher
SELECT * FROM vc_fertilizer_voucher ORDER BY holder LIMIT 50;

-- Business permit · REGISTRATION  → BusinessPermitCredential
SELECT * FROM vc_business_permit ORDER BY holder LIMIT 50;


-- ###########################################################################
-- INLINE (no views; same output shape)
-- ###########################################################################

-- ---------------------------------------------------------------------------
-- CultivatorCredential  (fields: holder, nationalId, farmId, location,
--                                hectares, crops, registeredOn)
-- ---------------------------------------------------------------------------
SELECT
  "fullName"                             AS holder,
  "nationalId"                           AS "nationalId",
  "farmId"                               AS "farmId",
  COALESCE(region, '')                   AS location,
  COALESCE("farmSizeHectares"::text, '') AS hectares,
  COALESCE("primaryCrops", '')           AS crops,
  '2026-05-01'                           AS "registeredOn"
FROM "V_Person"
WHERE "isCultivator" IS TRUE AND "farmId" IS NOT NULL
ORDER BY "fullName"
LIMIT 50;

-- ---------------------------------------------------------------------------
-- FertilizerVoucher  (fields: holder, nationalId, farmId, season, crop,
--                             entitlementKg, voucherId, validUntil)
-- ---------------------------------------------------------------------------
SELECT
  "fullName"                                          AS holder,
  "nationalId"                                        AS "nationalId",
  "farmId"                                            AS "farmId",
  'Yala 2026'                                         AS season,
  COALESCE(NULLIF(split_part("primaryCrops", ',', 1), ''), 'Paddy') AS crop,
  (COALESCE("farmSizeHectares", 1) * 50)::text        AS "entitlementKg",
  'YALA2026-' || "nationalId"                         AS "voucherId",
  '2026-09-30'                                        AS "validUntil"
FROM "V_Person"
WHERE "isCultivator" IS TRUE AND "farmId" IS NOT NULL
ORDER BY "fullName"
LIMIT 50;

-- ---------------------------------------------------------------------------
-- BusinessPermitCredential  (fields: holder, nationalId, businessName,
--                            businessType, address, permitId, issuedOn)
-- ---------------------------------------------------------------------------
SELECT
  "fullName"                                          AS holder,
  "nationalId"                                        AS "nationalId",
  ("givenName" || ' ' || "familyName" || ' Trading')  AS "businessName",
  'Sole Proprietorship'                               AS "businessType",
  (COALESCE(region, '') || ', ' || COALESCE(country, '')) AS address,
  'BP-' || "nationalId"                               AS "permitId",
  '2026-06-08'                                        AS "issuedOn"
FROM "V_Person"
ORDER BY "fullName"
LIMIT 50;


-- ###########################################################################
-- Error-path checks (same behaviour as the testdata recipes)
-- ###########################################################################

-- Zero rows → verifiably shows "query returned 0 rows"
SELECT * FROM vc_fertilizer_cultivator WHERE "nationalId" = 'ZZZ';

-- Non-SELECT → blocked by bulk.go before postgres: "only SELECT queries allowed"
-- DELETE FROM "V_Person" WHERE 1=0;
