-- Teardown for Model A's DB-source access layer (init-views.sql).
-- Run against the Sunbird registry DB:
--   docker exec -i sunbird-rc-db-1 psql -U postgres -d registry < drop.sql

DROP VIEW IF EXISTS vc_fertilizer_cultivator;
DROP VIEW IF EXISTS vc_fertilizer_voucher;
DROP VIEW IF EXISTS vc_business_permit;

-- Revoke before dropping the role (role can't be dropped while it owns grants).
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'vc_reader') THEN
    REVOKE ALL ON SCHEMA public      FROM vc_reader;
    REVOKE ALL ON DATABASE registry  FROM vc_reader;
    DROP ROLE vc_reader;
  END IF;
END
$$;
