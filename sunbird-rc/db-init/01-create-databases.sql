-- colombo-poc: dedicated DBs for the Node V2 services (avoids Prisma P3005
-- conflict with the Java registry's tables in the shared 'registry' DB).
CREATE DATABASE identity;
CREATE DATABASE credential_schema;
CREATE DATABASE credential;
