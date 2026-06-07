import json, subprocess, urllib.request, urllib.error
SB="http://localhost:18091"; MI="http://localhost:8083/v1/mock-identity-system"
def call(url, body):
    req=urllib.request.Request(url, data=json.dumps(body).encode(), headers={"Content-Type":"application/json"}, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=20) as r: return r.status, r.read().decode()
    except urllib.error.HTTPError as e: return e.code, e.read().decode()
    except Exception as e: return -1, str(e)
s,b=call(SB+"/api/v1/Person/search", {"filters":{}})
try: tot=json.loads(b).get("totalCount")
except Exception: tot="?:"+b[:80]
print("Sunbird Person totalCount:", tot)
cult=subprocess.check_output(["docker","exec","citizens-postgres","psql","-U","citizens","-d","citizens","-tAc","select national_id from citizens where farm_id is not null limit 1"]).decode().strip()
print("cultivator nid:", cult)
s,b=call(SB+"/api/v1/Person/search", {"filters":{"nationalId":{"eq":cult}}})
d=json.loads(b); rec=(d.get("data") or [{}])[0]
print("  cultivator in Sunbird: count=%s isCultivator=%s fullName=%s farmId=%s" % (d.get("totalCount"), rec.get("isCultivator"), rec.get("fullName"), rec.get("farmId")))
def kycauth(nid, pin):
    s,b=call(MI+"/v2/kyc-auth/test-rp/test-client", {"transactionId":"1234567890","individualId":nid,"pin":pin})
    try:
        d=json.loads(b); resp=d.get("response") or {}
        return "http=%s authStatus=%s errors=%s" % (s, resp.get("authStatus"), d.get("errors"))
    except Exception:
        return "http=%s raw=%s" % (s, b[:140])
print("VALID nid + correct PIN 111111 :", kycauth(cult,"111111"))
print("VALID nid + WRONG  PIN 999999  :", kycauth(cult,"999999"))
print("UNKNOWN nid + PIN 111111       :", kycauth("DOES-NOT-EXIST","111111"))
