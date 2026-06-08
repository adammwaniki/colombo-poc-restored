#!/usr/bin/env python3
"""sunbird_issue_gn.py — Sunbird-NATIVE issuance track (separate from walt.id).

Creates a Grama Niladhari issuer DID, a GramaNiladhariCertificate credential
schema, and issues a signed VC to a citizen — all from Sunbird's own
credentialing chain (identity 3332 / credential-schema 3333 / credential 3000).
The registry retains the credential as a record (track 4).

Run on the VPS.
"""
import json, urllib.request, urllib.error, datetime, sys

IDENTITY = "http://localhost:3332"
SCHEMA = "http://localhost:3333"
CRED = "http://localhost:3000"
SUBJECT = {"id": "did:example:80000099", "holder": "Sunil Rathnayake",
           "nationalId": "80000099", "address": "Kegalle, Sri Lanka",
           "gnDivision": "Kegalle GN 42", "verifiedOn": "2026-06-08"}


def call(base, path, body=None, method="POST"):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(base + path, data=data,
                                 headers={"Content-Type": "application/json"}, method=method)
    try:
        with urllib.request.urlopen(req, timeout=40) as r:
            return r.status, json.loads(r.read() or b"{}")
    except urllib.error.HTTPError as e:
        return e.code, {"_err": e.read().decode()[:400]}


now = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

# 1. issuer DID
s, did = call(IDENTITY, "/did/generate",
              {"content": [{"alsoKnownAs": ["Grama Niladhari Office"], "services": [], "method": "web"}]})
DID = (did[0] if isinstance(did, list) else did).get("id")
print("1. DID:", DID, "(status", s, ")")
if not DID:
    print(did); sys.exit(1)

# 2. schema (PUBLISHED)
schema_body = {"schema": {
    "type": "https://w3c-ccg.github.io/vc-json-schemas/", "version": "1.0.0",
    "name": "GramaNiladhariCertificate", "author": DID, "authored": now,
    "schema": {"$id": "GramaNiladhariCertificate",
               "$schema": "https://json-schema.org/draft/2019-09/schema",
               "description": "Grama Niladhari residence/address certificate",
               "type": "object",
               "properties": {"holder": {"type": "string"}, "nationalId": {"type": "string"},
                              "address": {"type": "string"}, "gnDivision": {"type": "string"},
                              "verifiedOn": {"type": "string"}},
               "required": ["holder", "nationalId", "address"], "additionalProperties": True}},
    "tags": ["GramaNiladhari"], "status": "PUBLISHED"}
s, sch = call(SCHEMA, "/credential-schema", schema_body)
print("2. schema status:", s, "| raw keys:", list(sch.keys()))
print("   ", json.dumps(sch)[:400])
SID = (sch.get("schema") or {}).get("id") or sch.get("id")
SVER = (sch.get("schema") or {}).get("version") or "1.0.0"
print("   schema id:", SID, "ver:", SVER)
if s >= 300 or not SID:
    sys.exit(1)

# 3. issue
cred_body = {"credential": {
    "@context": ["https://www.w3.org/2018/credentials/v1",
                 "https://w3id.org/security/suites/ed25519-2020/v1",
                 {"@vocab": "https://sunbird-rc.in-labs.cdpi.dev/vocab#"}],
    "type": ["VerifiableCredential"], "issuer": DID, "issuanceDate": now,
    "expirationDate": "2027-06-08T00:00:00Z", "credentialSubject": SUBJECT},
    "credentialSchemaId": SID, "credentialSchemaVersion": SVER,
    "tags": ["GramaNiladhari"], "method": "GramaNiladhari"}
s, cred = call(CRED, "/credentials/issue", cred_body)
print("3. issue status:", s)
if s >= 300:
    print("   ", cred); sys.exit(1)
CID = cred["credential"]["id"]
print("   VC issued -> credentialId:", CID)
print("   proof:", cred["credential"]["proof"]["type"], "by", cred["credential"]["proof"]["verificationMethod"])

# ---- Track 4: the Divisional Secretariat trusts by API query, not VC exchange ----
print("\n=== TRACK 4: registry-as-record + API/DB verification (no VC presentation) ===")
# (a) the credential service RETAINS the issued credential as a record
s, rec = call(CRED, "/credentials/" + CID, method="GET")
print("(a) GET /credentials/{id}  ->", s, "| issuer:", (rec.get("issuer") if isinstance(rec, dict) else None),
      "| subject:", (rec.get("credentialSubject", {}) or {}).get("nationalId"))
# (b) verify by API (signature + revocation) — what the Divisional Secretariat calls
s, ver = call(CRED, "/credentials/" + CID + "/verify", method="GET")
print("(b) GET /credentials/{id}/verify ->", s, "|", json.dumps(ver)[:200])
# (c) find the citizen's GN certificate by subject, without holding the credential id
s, found = call(CRED, "/credentials/search", {"subject": {"id": SUBJECT["id"]}})
items = found if isinstance(found, list) else found.get("credentials", found)
print("(c) POST /credentials/search {subject} ->", s, "| matches:",
      (len(items) if isinstance(items, list) else found))
