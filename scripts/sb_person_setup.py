import json, urllib.request, urllib.error, time
BASE="http://localhost:18091"
def call(method,path,body=None,timeout=90):
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

print("== create schema =="); print(*call("POST","/api/v1/Schema",{"name":"Person","schema":json.dumps(person),"status":"PUBLISHED"}))
print("== poll until Person live ==")
for i in range(15):
    time.sleep(4)
    s,b=call("POST","/api/v1/Person/search",{"filters":{}},timeout=20)
    if s==200 and "not found" not in b:
        print(f"  live after {(i+1)*4}s"); break
    print(f"  [{(i+1)*4}s] s={s} {b[:60]}")
print("== create entity =="); time.sleep(2)
print(*call("POST","/api/v1/Person",{"Person":{"nationalId":"TEST-NID-1","pin":"111111","password":"111111","fullName":"Test Person","gender":"Male","dateOfBirth":"1990/01/01","email":"t@example.com","phone":"+10000000000","farmId":"F-1","farmSizeHectares":2.5,"primaryCrops":"Paddy","isCultivator":True}}))
print("== search =="); time.sleep(2); s,b=call("POST","/api/v1/Person/search",{"filters":{"nationalId":{"eq":"TEST-NID-1"}}}); print(s); print(b[:1000])
