import json, subprocess, urllib.request, urllib.error, datetime, base64, hashlib, os
WORK="/root/colombo-poc/esignet-verifiably-client"; os.makedirs(WORK, exist_ok=True)
KEY=WORK+"/verifiably.key"; PUB=WORK+"/verifiably.pub"
os.path.exists(KEY) or subprocess.run(["openssl","genrsa","-out",KEY,"2048"], check=True, capture_output=True)
subprocess.run(["openssl","rsa","-in",KEY,"-pubout","-out",PUB], check=True, capture_output=True)
mod=subprocess.check_output(["openssl","rsa","-in",KEY,"-noout","-modulus"]).decode().strip()
mod_hex=mod.split("=")[1]
def b64u(b): return base64.urlsafe_b64encode(b).rstrip(b"=").decode()
n=b64u(bytes.fromhex(mod_hex)); e=b64u((65537).to_bytes(3,"big"))
kid=hashlib.sha256((n+e).encode()).hexdigest()[:32]
jwk={"kty":"RSA","e":e,"use":"sig","kid":kid,"alg":"RS256","n":n}
ESIGNET="http://localhost:8088/v1/esignet"
REDIRECT="http://156.67.105.185:8080/auth/callback"
now=datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.")+f"{datetime.datetime.now(datetime.timezone.utc).microsecond//1000:03d}Z"
body={"requestTime":now,"request":{
  "clientId":"verifiably","clientName":"Verifiably","publicKey":jwk,"relyingPartyId":"verifiably",
  "userClaims":["name","email","phone_number","gender","birthdate","address","picture","individual_id"],
  "authContextRefs":["mosip:idp:acr:knowledge","mosip:idp:acr:static-code","mosip:idp:acr:password","mosip:idp:acr:generated-code"],
  "logoUri":"https://avatars.githubusercontent.com/u/0","redirectUris":[REDIRECT],
  "grantTypes":["authorization_code"],"clientAuthMethods":["private_key_jwt"]}}
# CSRF
import http.cookiejar
cj=http.cookiejar.CookieJar(); op=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
csrf=""
try:
    r=op.open(ESIGNET+"/csrf/token", timeout=10); csrf=json.loads(r.read()).get("token","")
except Exception as ex: print("csrf warn:",ex)
for c in cj:
    if c.name in ("XSRF-TOKEN",) and not csrf: csrf=c.value
hdr={"Content-Type":"application/json"}
if csrf: hdr["X-XSRF-TOKEN"]=csrf
req=urllib.request.Request(ESIGNET+"/client-mgmt/oidc-client", data=json.dumps(body).encode(), headers=hdr, method="POST")
try:
    r=op.open(req, timeout=15); print("REGISTER:", r.status, r.read().decode()[:200])
except urllib.error.HTTPError as ex: print("REGISTER ERR:", ex.code, ex.read().decode()[:300])
open(WORK+"/kid.txt","w").write(kid)
print("kid:", kid); print("private key:", KEY)
