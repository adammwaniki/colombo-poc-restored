-- inji-verify-service uses DATABASE_SCHEMA=verify; its Flyway migrations expect
-- the schema to already exist. Postgres only runs this on first init (empty volume).
CREATE SCHEMA IF NOT EXISTS verify;
