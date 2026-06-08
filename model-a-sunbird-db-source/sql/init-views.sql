-- ===========================================================================
-- Model A — Sunbird-as-source -> walt.id-as-issuer, via verifiably's DB source.
--
-- This is the doc-faithful pipeline from "SAR Workshop PoC": the National-ID-
-- backed register of record (Sunbird RC) is read, and issuance is consolidated
-- on walt.id. verifiably's bulk "Database" source runs ONE of the SELECTs below
-- (it only accepts SELECT) and hands each row to walt.id, which mints one
-- OID4VCI pre-authorized offer per citizen.
--
-- WHAT THIS SCRIPT DOES (idempotent, additive, non-destructive):
--   1. Creates a least-privilege, read-only login role `vc_reader`.
--   2. Creates three VIEWS over the registry's V_Person table, each shaped to a
--      use-case credential's credentialSubject fields. Column aliases are the
--      schema field names VERBATIM (case-sensitive camelCase) — bulk.go keys
--      each row by column name, so these must match the walt.id schema fields.
--   3. Grants `vc_reader` SELECT on the three views ONLY.
--
-- Postgres view semantics make this safe: on PG14 a view runs with its OWNER's
-- (postgres) rights against the underlying table, so `vc_reader` can read the
-- three views WITHOUT any grant on V_Person, keycloak, or credential tables.
-- The DSN you paste into verifiably therefore cannot touch anything but the
-- three curated views.
--
-- Run against the Sunbird registry DB:
--   docker exec -i sunbird-rc-db-1 psql -U postgres -d registry < init-views.sql
-- Tear down with drop.sql.
-- ===========================================================================

-- --- 1. read-only role ------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'vc_reader') THEN
    CREATE ROLE vc_reader LOGIN PASSWORD 'vc_reader';
  END IF;
END
$$;

GRANT CONNECT ON DATABASE registry TO vc_reader;
GRANT USAGE   ON SCHEMA   public   TO vc_reader;

-- --- 2a. Fertilizer subsidy — ENROLMENT (Cultivator credential) -------------
-- Eligibility = the WHERE clause: only people the inspection put on the
-- register as cultivators with an allocated farm parcel.
CREATE OR REPLACE VIEW vc_fertilizer_cultivator AS
SELECT
  "fullName"                                AS holder,
  "nationalId"                              AS "nationalId",
  "farmId"                                  AS "farmId",
  COALESCE(region, '')                      AS location,
  COALESCE("farmSizeHectares"::text, '')    AS hectares,
  COALESCE("primaryCrops", '')              AS crops,
  '2026-05-01'                              AS "registeredOn"  -- enrolment date (Yala window)
FROM "V_Person"
WHERE "isCultivator" IS TRUE
  AND "farmId" IS NOT NULL;

-- --- 2b. Fertilizer subsidy — SEASONAL CLAIM (e-voucher entitlement) --------
-- The entitlement is delivered as an e-voucher credential (no cash leg).
-- entitlementKg is derived from the registered farm size (50 kg/ha demo rule);
-- a real deployment would join an allocation table here.
CREATE OR REPLACE VIEW vc_fertilizer_voucher AS
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
WHERE "isCultivator" IS TRUE
  AND "farmId" IS NOT NULL;

-- --- 2c. Business permit — REGISTRATION (Business Permit credential) --------
-- V_Person carries no business columns, so the trade name / type / permit id
-- are synthesised deterministically for the demo. In production this view
-- would read the business register the registration flow writes to.
CREATE OR REPLACE VIEW vc_business_permit AS
SELECT
  "fullName"                                          AS holder,
  "nationalId"                                        AS "nationalId",
  ("givenName" || ' ' || "familyName" || ' Trading')  AS "businessName",
  'Sole Proprietorship'                               AS "businessType",
  (COALESCE(region, '') || ', ' || COALESCE(country, '')) AS address,
  'BP-' || "nationalId"                               AS "permitId",
  '2026-06-08'                                        AS "issuedOn"
FROM "V_Person";

-- --- 3. grant SELECT on the curated views only ------------------------------
GRANT SELECT ON
  vc_fertilizer_cultivator,
  vc_fertilizer_voucher,
  vc_business_permit
TO vc_reader;
