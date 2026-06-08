import json, urllib.request, urllib.error, datetime, http.cookiejar
ESIGNET="http://localhost:8088/v1/esignet"
REDIRECTS=["http://localhost:8080/auth/callback","http://156.67.105.185:8080/auth/callback","https://vc.in-labs.cdpi.dev/auth/callback"]
now=datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.")+"000Z"
body={"requestTime":now,"request":{"clientName":"Verifiably","logoUri":"https://avatars.githubusercontent.com/u/0",
  "redirectUris":REDIRECTS,
  "userClaims":["name","email","phone_number","gender","birthdate","address","picture","individual_id"],
  "authContextRefs":["mosip:idp:acr:knowledge","mosip:idp:acr:static-code","mosip:idp:acr:password","mosip:idp:acr:generated-code"],
  "status":"ACTIVE","grantTypes":["authorization_code"],"clientAuthMethods":["private_key_jwt"]}}
cj=http.cookiejar.CookieJar(); op=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
csrf=""
try: csrf=json.loads(op.open(ESIGNET+"/csrf/token",timeout=10).read()).get("token","")
except Exception as e: print("csrf warn",e)
for c in cj:
    if c.name=="XSRF-TOKEN" and not csrf: csrf=c.value
hdr={"Content-Type":"application/json"}
if csrf: hdr["X-XSRF-TOKEN"]=csrf
req=urllib.request.Request(ESIGNET+"/client-mgmt/oidc-client/verifiably",data=json.dumps(body).encode(),headers=hdr,method="PUT")
try: r=op.open(req,timeout=15); print("UPDATE:",r.status,r.read().decode()[:200])
except urllib.error.HTTPError as e: print("UPDATE ERR:",e.code,e.read().decode()[:300])
