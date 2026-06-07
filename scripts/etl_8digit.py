import json, subprocess, urllib.request, urllib.error, time, re
BASE="http://localhost:18091"
def post(path, body, tries=4):
    data=json.dumps(body).encode()
    for a in range(tries):
        req=urllib.request.Request(BASE+path, data=data, headers={"Content-Type":"application/json"}, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=30) as r: return r.status,""
        except urllib.error.HTTPError as e:
            m=e.read().decode()[:80]
            if "Duplicate" in m: return 409,m
            time.sleep(1+a)
        except Exception: time.sleep(1.5+a)
    return -1,"x"
sql="select row_to_json(t) from (select national_id, first_name, middle_name, last_name, gender, to_char(date_of_birth,'YYYY/MM/DD') as dob, email, phone, farm_id, farm_size_hectares, primary_crops from citizens) t"
rows=[json.loads(l) for l in subprocess.check_output(["docker","exec","citizens-postgres","psql","-U","citizens","-d","citizens","-tAc",sql]).decode().splitlines() if l.strip()]
print("citizens:",len(rows),flush=True)
ok=dup=fail=0
for i,c in enumerate(rows):
    nid=re.sub(r"\D","",c["national_id"] or "")   # 8-digit numeric portion (KE-PID-96977837 -> 96977837)
    if not nid: fail+=1; continue
    p={"nationalId":nid,"pin":"111111","password":"111111",
       "fullName":((c.get("first_name") or "")+" "+(c.get("last_name") or "")).strip(),
       "givenName":c.get("first_name") or "","middleName":c.get("middle_name") or "","familyName":c.get("last_name") or "",
       "gender":c.get("gender") or "","dateOfBirth":c.get("dob") or "","email":c.get("email") or "","phone":c.get("phone") or "",
       "farmId":c.get("farm_id") or "","primaryCrops":c.get("primary_crops") or "","isCultivator":bool(c.get("farm_id"))}
    if c.get("farm_size_hectares") is not None:
        try: p["farmSizeHectares"]=float(c["farm_size_hectares"])
        except: pass
    s,_=post("/api/v1/Person",p)
    if s in (200,201): ok+=1
    elif s==409: dup+=1
    else: fail+=1
    if (i+1)%25==0: print("  %d/%d ok=%d dup=%d fail=%d"%(i+1,len(rows),ok,dup,fail),flush=True)
    time.sleep(0.4)
print("DONE 8-digit re-key ok=%d dup=%d fail=%d"%(ok,dup,fail),flush=True)
