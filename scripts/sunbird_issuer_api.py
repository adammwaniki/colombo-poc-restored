#!/usr/bin/env python3
"""sunbird_issuer_api.py — multi-credential issuer behind the registry admin
portal. NOT GN-only: the Person register is general, and Sunbird's chain issues
any credential type. Covers both SAR use cases, each with its OWN issuer DID +
schema (bootstrapped once, persisted to /state/issuers.json):

  gn-cert            Grama Niladhari Office          address proof (biz-permit prereq)
  cultivator         Dept of Agrarian Development    fertilizer enrolment
  fertilizer-voucher Dept of Agrarian Development     fertilizer seasonal claim (Yala)
  business-permit    Divisional Secretariat          sole-proprietor permit

  GET  /issuer/types                       -> available credential types
  POST /issuer/issue   {nationalId, type}  -> reads Person, issues a signed VC
  GET  /issuer/list?nationalId=            -> the person's creds (all types) + verify
  GET  /issuer/credential?id=              -> full signed VC (download)

Runs on :8091 (sunbird-rc_default; reaches registry:8081, identity:3332,
credential-schema:3333, credential:3000 by name).
"""
import http.server, json, urllib.request, urllib.error, os, datetime
from urllib.parse import urlparse, parse_qs

REGISTRY = os.environ.get("REGISTRY_URL", "http://registry:8081")
IDENTITY = os.environ.get("IDENTITY_URL", "http://identity:3332")
SCHEMA = os.environ.get("SCHEMA_URL", "http://credential-schema:3333")
CRED = os.environ.get("CRED_URL", "http://credential:3000")
STATE = os.environ.get("STATE_FILE", "/state/issuers.json")
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


def regcountry(p):
    return (p.get("region") or "") + ", " + (p.get("country") or "Sri Lanka")


# --- credential types: subject built from the Person record ---
def s_gn(p, nid, today):
    return {"holder": p.get("fullName") or "", "nationalId": nid, "address": regcountry(p),
            "gnDivision": (p.get("region") or "") + " GN Division", "verifiedOn": today}


def s_cultivator(p, nid, today):
    return {"holder": p.get("fullName") or "", "nationalId": nid, "farmId": p.get("farmId") or "",
            "location": p.get("region") or "", "hectares": str(p.get("farmSizeHectares") or ""),
            "crops": p.get("primaryCrops") or "", "registeredOn": today}


def s_voucher(p, nid, today):
    ha = p.get("farmSizeHectares") or 1
    return {"holder": p.get("fullName") or "", "nationalId": nid, "farmId": p.get("farmId") or "",
            "season": "Yala 2026", "crop": (p.get("primaryCrops") or "Paddy").split(",")[0],
            "entitlementKg": str(int(ha) * 50), "voucherId": "YALA2026-" + nid, "validUntil": "2026-09-30"}


def s_permit(p, nid, today):
    return {"holder": p.get("fullName") or "", "nationalId": nid,
            "businessName": (p.get("fullName") or "") + " Trading", "businessType": "Sole Proprietorship",
            "address": regcountry(p), "permitId": "BP-" + nid, "issuedOn": today}


TYPES = {
    "gn-cert": {"name": "GramaNiladhariCertificate", "method": "gncert", "issuer": "Grama Niladhari Office",
                "label": "Grama Niladhari certificate (address proof)", "cultivatorOnly": False,
                "props": ["holder", "nationalId", "address", "gnDivision", "verifiedOn"],
                "required": ["holder", "nationalId", "address"], "subj": s_gn},
    "cultivator": {"name": "CultivatorCredential", "method": "cultivator", "issuer": "Department of Agrarian Development",
                   "label": "Cultivator credential (fertilizer enrolment)", "cultivatorOnly": True,
                   "props": ["holder", "nationalId", "farmId", "location", "hectares", "crops", "registeredOn"],
                   "required": ["holder", "nationalId", "farmId"], "subj": s_cultivator},
    "fertilizer-voucher": {"name": "FertilizerVoucher", "method": "fertilizervoucher", "issuer": "Department of Agrarian Development",
                           "label": "Fertilizer subsidy voucher (Yala)", "cultivatorOnly": True,
                           "props": ["holder", "nationalId", "farmId", "season", "crop", "entitlementKg", "voucherId", "validUntil"],
                           "required": ["holder", "nationalId", "voucherId"], "subj": s_voucher},
    "business-permit": {"name": "BusinessPermitCredential", "method": "businesspermit", "issuer": "Divisional Secretariat",
                        "label": "Business permit", "cultivatorOnly": False,
                        "props": ["holder", "nationalId", "businessName", "businessType", "address", "permitId", "issuedOn"],
                        "required": ["holder", "nationalId", "businessName"], "subj": s_permit},
}

STORE = json.load(open(STATE)) if os.path.exists(STATE) else {}


def ensure(tk):
    if tk in STORE:
        return STORE[tk]
    t = TYPES[tk]
    _, did = call(IDENTITY, "/did/generate", {"content": [{"alsoKnownAs": [t["issuer"]], "services": [], "method": "web"}]})
    DID = (did[0] if isinstance(did, list) else did)["id"]
    props = {k: {"type": "string"} for k in t["props"]}
    sb = {"schema": {"type": "https://w3c-ccg.github.io/vc-json-schemas/", "version": "1.0.0", "name": t["name"],
                     "author": DID, "authored": now(),
                     "schema": {"$id": t["name"], "$schema": "https://json-schema.org/draft/2019-09/schema",
                                "description": t["label"], "type": "object", "properties": props,
                                "required": t["required"], "additionalProperties": True}},
          "tags": [tk], "status": "PUBLISHED"}
    _, sch = call(SCHEMA, "/credential-schema", sb)
    STORE[tk] = {"did": DID, "schemaId": (sch.get("schema") or {}).get("id") or sch.get("id")}
    os.makedirs(os.path.dirname(STATE), exist_ok=True)
    json.dump(STORE, open(STATE, "w"))
    return STORE[tk]


for k in TYPES:
    ensure(k)
print("issuers ready:", {k: STORE[k]["did"][:40] + "..." for k in STORE}, flush=True)


def get_person(nid):
    _, r = call(REGISTRY, "/api/v1/Person/search", {"filters": {"nationalId": {"eq": nid}}})
    data = r if isinstance(r, list) else r.get("data", [])
    return data[0] if data else None


def get_credential(cid):
    s, c = call(CRED, "/credentials/" + cid, method="GET")
    return c if s < 300 else None


def issue(nid, tk):
    if tk not in TYPES:
        return {"ok": False, "error": "unknown credential type"}
    t = TYPES[tk]
    p = get_person(nid)
    if not p:
        return {"ok": False, "error": "no such National ID in the register"}
    if t["cultivatorOnly"] and not p.get("isCultivator"):
        return {"ok": False, "error": "this credential is for registered cultivators only"}
    cfg = ensure(tk)
    subj = {"id": "urn:gov-lk:nid:" + nid}
    subj.update(t["subj"](p, nid, now()[:10]))
    body = {"credential": {"@context": ["https://www.w3.org/2018/credentials/v1",
                                        "https://w3id.org/security/suites/ed25519-2020/v1", {"@vocab": VOCAB}],
                           "type": ["VerifiableCredential", t["name"]], "issuer": cfg["did"], "issuanceDate": now(),
                           "expirationDate": "2027-12-31T00:00:00Z", "credentialSubject": subj},
            "credentialSchemaId": cfg["schemaId"], "credentialSchemaVersion": "1.0.0",
            "tags": [tk], "method": t["method"]}
    s, cred = call(CRED, "/credentials/issue", body)
    if s >= 300:
        return {"ok": False, "error": "issue failed (%s)" % s}
    return {"ok": True, "credentialId": cred["credential"]["id"], "type": tk, "typeLabel": t["label"]}


def type_of(vc):
    for tt in (vc.get("type") or []):
        for tk, t in TYPES.items():
            if t["name"] == tt:
                return tk, t["label"]
    return None, "Credential"


def lst(nid):
    _, found = call(CRED, "/credentials/search", {"subject": {"id": "urn:gov-lk:nid:" + nid}})
    items = found if isinstance(found, list) else found.get("credentials", [])
    out = []
    for c in (items or []):
        cid = c.get("id") or (c.get("credential") or {}).get("id")
        if not cid:
            continue
        full = get_credential(cid) or {}
        _, ver = call(CRED, "/credentials/" + cid + "/verify", method="GET")
        tk, label = type_of(full)
        out.append({"credentialId": cid, "type": tk, "typeLabel": label, "status": ver.get("status"),
                    "checks": ver.get("checks"), "subject": full.get("credentialSubject"),
                    "issuanceDate": full.get("issuanceDate"), "issuer": full.get("issuer")})
    return {"ok": True, "credentials": out}


def types_for():
    return {"ok": True, "types": [{"key": k, "label": TYPES[k]["label"], "issuer": TYPES[k]["issuer"],
                                   "cultivatorOnly": TYPES[k]["cultivatorOnly"]} for k in TYPES]}


class H(http.server.BaseHTTPRequestHandler):
    def _s(self, c, b):
        self.send_response(c)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(b).encode())

    def do_GET(self):
        u = urlparse(self.path); q = parse_qs(u.query)
        if u.path == "/issuer/types":
            self._s(200, types_for())
        elif u.path == "/issuer/list":
            self._s(200, lst((q.get("nationalId") or [""])[0].strip()))
        elif u.path == "/issuer/credential":
            full = get_credential((q.get("id") or [""])[0].strip())
            self._s(200 if full else 404, full or {})
        elif u.path == "/issuer/health":
            self._s(200, {"ok": True, "issuers": {k: STORE[k]["did"] for k in STORE}})
        else:
            self._s(404, {})

    def do_POST(self):
        n = int(self.headers.get("Content-Length", 0))
        try:
            d = json.loads(self.rfile.read(n) or b"{}")
        except Exception:
            d = {}
        if self.path == "/issuer/issue":
            self._s(200, issue((d.get("nationalId") or "").strip(), (d.get("type") or "gn-cert").strip()))
        else:
            self._s(404, {})

    def log_message(self, *a):
        pass


print("sunbird issuer-api on :8091", flush=True)
http.server.ThreadingHTTPServer(("0.0.0.0", 8091), H).serve_forever()
