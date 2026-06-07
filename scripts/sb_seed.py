import json, urllib.request, urllib.error, time
BASE="http://localhost:18091"
def call(method,path,body=None,timeout=60):
    data=json.dumps(body).encode() if body is not None else None
    req=urllib.request.Request(BASE+path,data=data,headers={"Content-Type":"application/json"},method=method)
    try:
        with urllib.request.urlopen(req,timeout=timeout) as r: return r.status,r.read().decode()
    except urllib.error.HTTPError as e: return e.code,e.read().decode()
    except Exception as e: return -1,str(e)
S=lambda t:{"type":"string","title":t}
person={"$schema":"http://json-schema.org/draft-07/schema","type":"object",
 "properties":{"Person":{"$ref":"#/definitions/Person"}},"required":["Person"],"title":"Person",
 "definitions":{"Person":{"$id":"#/properties/Person","type":"object","title":"Person","required":["nationalId"],
   "properties":{"nationalId":S("National ID"),"pin":S("PIN"),"password":S("Password"),
     "fullName":S("Full Name"),"givenName":S("Given"),"middleName":S("Middle"),"familyName":S("Family"),
     "gender":S("Gender"),"dateOfBirth":S("DOB"),"email":S("Email"),"phone":S("Phone"),
     "streetAddress":S("Street"),"locality":S("Locality"),"region":S("Region"),"postalCode":S("Postal"),"country":S("Country"),
     "farmId":S("Farm ID"),"farmSizeHectares":{"type":"number","title":"Farm size"},
     "primaryCrops":S("Crops"),"isCultivator":{"type":"boolean","title":"Cultivator"}}}},
 "_osConfig":{"roles":[],"inviteRoles":["anonymous"],"ownershipAttributes":[]}}
s,b=call("POST","/api/v1/Schema",{"name":"Person","schema":json.dumps(person),"status":"PUBLISHED"})
print("schema create:",s,b[:160],flush=True)
print("polling until Person live...",flush=True)
for i in range(25):
    time.sleep(4)
    s,b=call("POST","/api/v1/Person/search",{"filters":{}},timeout=20)
    if s==200 and "not found" not in b.lower(): print("  live after",(i+1)*4,"s",flush=True); break
    print("  [%ds] s=%s %s"%((i+1)*4,s,b[:50]),flush=True)
first=["Kwame","Amina","Juma","Wanjiru","Otieno","Achieng","Kamau","Njeri","Mwangi","Fatuma","Baraka","Zawadi","Imani","Jabari","Niamh","Kofi","Adaeze","Chike","Eshe","Tabia"]
last=["Otieno","Kamau","Mwangi","Achieng","Wanjiru","Njoroge","Omondi","Kibet","Cheruiyot","Wekesa"]
regions=["Nairobi","Kisumu","Nakuru","Mombasa","Eldoret"]; crops=["Paddy","Maize","Beans","Tea","Coffee"]
def post_person(p):
    for _ in range(4):
        s,b=call("POST","/api/v1/Person",p,timeout=60)
        if s in (200,201): return s,b
        time.sleep(1.5)
    return s,b
creds=[]
for i in range(20):
    nid="80%06d"%(i+1); pin="%06d"%(100000+i); cult=(i%3!=0)
    fn=first[i%len(first)]; ln=last[i%len(last)]
    p={"nationalId":nid,"pin":pin,"password":pin,"fullName":fn+" "+ln,"givenName":fn,"familyName":ln,
       "gender":("Female" if i%2 else "Male"),"dateOfBirth":"19%02d/%02d/%02d"%(70+i%30,1+i%12,1+i%28),
       "email":(fn+"."+ln+"@example.com").lower(),"phone":"+25470%07d"%(1000000+i),
       "region":regions[i%len(regions)],"country":"Kenya","isCultivator":cult,
       "farmId":("KE-FARM-%04d"%(i+1) if cult else ""),"farmSizeHectares":(round(0.5+i*0.3,1) if cult else 0),
       "primaryCrops":(crops[i%len(crops)] if cult else "")}
    s,b=post_person(p); creds.append((nid,pin,fn+" "+ln,"cultivator" if cult else "citizen",s))
    print("  %s pin=%s %-16s %-10s -> %s"%(nid,pin,fn+" "+ln,"cultivator" if cult else "citizen",s),flush=True)
    time.sleep(0.4)
open("/root/colombo-poc/sunbird-seed-creds.txt","w").write("nationalId pin name type status\n"+"\n".join("%s %s %s %s %s"%c for c in creds))
print("SEED DONE: %d/%d created -> /root/colombo-poc/sunbird-seed-creds.txt"%(sum(1 for c in creds if c[4] in(200,201)),len(creds)),flush=True)
