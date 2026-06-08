#!/usr/bin/env python3
"""gn_issuer_api.py — backend behind the registry admin portal's "Issue GN
certificate" button. Self-bootstraps a PERSISTENT Grama Niladhari issuer DID +
GramaNiladhariCertificate schema (saved to /state/gn-issuer.json), then:

  POST /issuer/issue   {nationalId}  -> reads the Person from the registry,
                                        issues a signed VC via Sunbird's chain
  GET  /issuer/list?nationalId=...    -> that person's GN certs + verify status
  GET  /issuer/health

Runs on :8091 (host network: reaches registry 18091, identity 3332,
credential-schema 3333, credential 3000 on localhost).
"""
import http.server, json, urllib.request, urllib.error, os, datetime
from urllib.parse import urlparse, parse_qs

REGISTRY = os.environ.get("REGISTRY_URL", "http://localhost:18091")
IDENTITY = os.environ.get("IDENTITY_URL", "http://localhost:3332")
SCHEMA = os.environ.get("SCHEMA_URL", "http://localhost:3333")
CRED = os.environ.get("CRED_URL", "http://localhost:3000")
STATE = os.environ.get("STATE_FILE", "/state/gn-issuer.json")
VOCAB = "https://sunbird-rc.in-labs.cdpi.dev/vocab#"


def call(base, path, body=None, method="POST"):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(base + path, data=data,
                                 headers={"Content-Type": "application/json"}, method=method)
    try:
        with urllib.request.urlopen(req, timeout=40) as r:
            return r.status, json.loads(r.read() or b"{}")
    except urllib.error.HTTPError as e:
        try:
            return e.code, json.loads(e.read())
        except Exception:
            return e.code, {}
    except Exception as e:
        return -1, {"_err": str(e)}


def now():
    return datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def ensure_issuer():
    if os.path.exists(STATE):
        return json.load(open(STATE))
    _, did = call(IDENTITY, "/did/generate",
                  {"content": [{"alsoKnownAs": ["Grama Niladhari Office"], "services": [], "method": "web"}]})
    DID = (did[0] if isinstance(did, list) else did)["id"]
    sb = {"schema": {"type": "https://w3c-ccg.github.io/vc-json-schemas/", "version": "1.0.0",
                     "name": "GramaNiladhariCertificate", "author": DID, "authored": now(),
                     "schema": {"$id": "GramaNiladhariCertificate",
                                "$schema": "https://json-schema.org/draft/2019-09/schema",
                                "description": "Grama Niladhari residence/address certificate",
                                "type": "object",
                                "properties": {"holder": {"type": "string"}, "nationalId": {"type": "string"},
                                               "address": {"type": "string"}, "gnDivision": {"type": "string"},
                                               "verifiedOn": {"type": "string"}},
                                "required": ["holder", "nationalId", "address"], "additionalProperties": True}},
          "tags": ["GramaNiladhari"], "status": "PUBLISHED"}
    _, sch = call(SCHEMA, "/credential-schema", sb)
    cfg = {"did": DID, "schemaId": (sch.get("schema") or {}).get("id") or sch.get("id"), "schemaVersion": "1.0.0"}
    os.makedirs(os.path.dirname(STATE), exist_ok=True)
    json.dump(cfg, open(STATE, "w"))
    return cfg


CFG = ensure_issuer()
print("GN issuer ready:", CFG, flush=True)


def get_person(nid):
    _, r = call(REGISTRY, "/api/v1/Person/search", {"filters": {"nationalId": {"eq": nid}}})
    data = r if isinstance(r, list) else r.get("data", [])
    return data[0] if data else None


def issue(nid):
    p = get_person(nid)
    if not p:
        return {"ok": False, "error": "no such National ID in the register"}
    subj = {"id": "did:example:" + nid, "holder": p.get("fullName") or "", "nationalId": nid,
            "address": (p.get("region") or "") + ", " + (p.get("country") or "Sri Lanka"),
            "gnDivision": (p.get("region") or "") + " GN Division", "verifiedOn": now()[:10]}
    body = {"credential": {"@context": ["https://www.w3.org/2018/credentials/v1",
                                        "https://w3id.org/security/suites/ed25519-2020/v1", {"@vocab": VOCAB}],
                           "type": ["VerifiableCredential"], "issuer": CFG["did"], "issuanceDate": now(),
                           "expirationDate": "2027-12-31T00:00:00Z", "credentialSubject": subj},
            "credentialSchemaId": CFG["schemaId"], "credentialSchemaVersion": CFG["schemaVersion"],
            "tags": ["GramaNiladhari"], "method": "GramaNiladhari"}
    s, cred = call(CRED, "/credentials/issue", body)
    if s >= 300:
        return {"ok": False, "error": "issue failed (%s)" % s}
    return {"ok": True, "credentialId": cred["credential"]["id"], "holder": subj["holder"]}


def lst(nid):
    _, found = call(CRED, "/credentials/search", {"subject": {"id": "did:example:" + nid}})
    items = found if isinstance(found, list) else found.get("credentials", [])
    out = []
    for c in (items or []):
        cid = c.get("id") or (c.get("credential") or {}).get("id")
        if not cid:
            continue
        _, ver = call(CRED, "/credentials/" + cid + "/verify", method="GET")
        out.append({"credentialId": cid, "status": ver.get("status"), "checks": ver.get("checks")})
    return {"ok": True, "issuer": CFG["did"], "credentials": out}


class H(http.server.BaseHTTPRequestHandler):
    def _s(self, c, b):
        self.send_response(c)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(b).encode())

    def do_GET(self):
        if self.path.startswith("/issuer/list"):
            q = parse_qs(urlparse(self.path).query)
            self._s(200, lst((q.get("nationalId") or [""])[0].strip()))
        elif self.path == "/issuer/health":
            self._s(200, {"ok": True, "issuer": CFG["did"]})
        else:
            self._s(404, {})

    def do_POST(self):
        n = int(self.headers.get("Content-Length", 0))
        try:
            d = json.loads(self.rfile.read(n) or b"{}")
        except Exception:
            d = {}
        if self.path == "/issuer/issue":
            self._s(200, issue((d.get("nationalId") or "").strip()))
        else:
            self._s(404, {})

    def log_message(self, *a):
        pass


print("GN issuer-api on :8091", flush=True)
http.server.ThreadingHTTPServer(("0.0.0.0", 8091), H).serve_forever()
