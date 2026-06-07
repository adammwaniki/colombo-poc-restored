import http.server, json, urllib.request, urllib.parse, urllib.error, secrets, time, base64
TW={}
for line in open("/root/colombo-poc/.twilio.env"):
    line=line.strip()
    if "=" in line and not line.startswith("#"): k,v=line.split("=",1); TW[k]=v
SUNBIRD="http://localhost:18091"; OTPS={}
def log(m): print(m, flush=True)
def send_whatsapp(phone, body):
    acc=TW["TWILIO_ACCOUNT_SID"]; auth=TW["TWILIO_API_KEY_SID"]+":"+TW["TWILIO_API_KEY_SECRET"]
    data=urllib.parse.urlencode({"To":"whatsapp:"+phone,"From":TW["WHATSAPP_FROM"],"Body":body}).encode()
    req=urllib.request.Request("https://api.twilio.com/2010-04-01/Accounts/"+acc+"/Messages.json", data=data)
    req.add_header("Authorization","Basic "+base64.b64encode(auth.encode()).decode())
    with urllib.request.urlopen(req, timeout=20) as r: return json.load(r)
def sunbird_post(path, body):
    req=urllib.request.Request(SUNBIRD+path, data=json.dumps(body).encode(), headers={"Content-Type":"application/json"})
    try:
        with urllib.request.urlopen(req, timeout=30) as r: return r.status, r.read().decode()
    except urllib.error.HTTPError as e: return e.code, e.read().decode()
    except Exception as e: return -1, str(e)
FORM=r"""<!doctype html><html><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1">
<title>Self-Registration - Colombo PoC</title><style>
body{font-family:system-ui,sans-serif;max-width:520px;margin:2rem auto;padding:0 1rem;color:#222}
h1{font-size:1.4rem} label{display:block;margin:.7rem 0 .2rem;font-size:.85rem;color:#555}
input{width:100%;padding:.55rem;border:1px solid #ccc;border-radius:6px;box-sizing:border-box}
button{margin-top:1rem;padding:.6rem 1.2rem;border:0;border-radius:6px;background:#c0492b;color:#fff;font-size:1rem;cursor:pointer}
.hidden{display:none}.msg{margin-top:1rem;padding:.6rem;border-radius:6px}.ok{background:#e6f4ea}.err{background:#fce8e6}
small{color:#777}</style></head><body>
<h1>Self-Registration</h1><p><small>Register against the Sunbird register of record, then sign in via eSignet.</small></p>
<div id=s1><label>Phone (WhatsApp, E.164 e.g. +254726531766)</label><input id=phone placeholder="+254726531766">
<button onclick="sendOtp()">Send WhatsApp OTP</button></div>
<div id=s2 class=hidden><div class="msg ok">OTP sent to your WhatsApp. Enter it below with your details.</div>
<label>OTP</label><input id=otp placeholder="6-digit code">
<label>National ID (8 digits)</label><input id=nationalId placeholder="12345678">
<label>Given name</label><input id=givenName><label>Family name</label><input id=familyName>
<label>Email</label><input id=email><label>Gender</label><input id=gender placeholder="Male/Female">
<label>Date of birth (YYYY/MM/DD)</label><input id=dateOfBirth placeholder="1990/01/01">
<label>Farm ID (optional, makes you a cultivator)</label><input id=farmId>
<label>Choose a PIN</label><input id=pin type=password placeholder="your PIN">
<button onclick="register()">Register</button></div>
<div id=out></div>
<script>
async function post(u,b){let r=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(b)});return r.json()}
async function sendOtp(){let p=phone.value.trim();let r=await post("/send-otp",{phone:p});if(r.ok){s1.classList.add("hidden");s2.classList.remove("hidden")}else out.innerHTML="<div class=\"msg err\">"+(r.error||"failed")+"</div>"}
async function register(){let b={phone:phone.value.trim(),otp:otp.value.trim(),nationalId:nationalId.value.trim(),givenName:givenName.value.trim(),familyName:familyName.value.trim(),email:email.value.trim(),gender:gender.value.trim(),dateOfBirth:dateOfBirth.value.trim(),farmId:farmId.value.trim(),pin:pin.value};let r=await post("/register",b);out.innerHTML=r.ok?("<div class=\"msg ok\">Registered! Sign in at the verifiably portal via eSignet with National ID <b>"+r.nationalId+"</b> and your PIN.</div>"):("<div class=\"msg err\">"+(r.error||"failed")+"</div>")}
</script></body></html>"""
class H(http.server.BaseHTTPRequestHandler):
    def _s(self,c,b,ct="application/json"): self.send_response(c);self.send_header("Content-Type",ct);self.end_headers();self.wfile.write(b.encode() if isinstance(b,str) else b)
    def do_GET(self):
        if self.path=="/" or self.path.startswith("/?"): self._s(200,FORM,"text/html")
        else: self._s(404,"{}")
    def do_POST(self):
        n=int(self.headers.get("Content-Length",0)); 
        try: d=json.loads(self.rfile.read(n) or b"{}")
        except: d={}
        if self.path=="/send-otp":
            ph=(d.get("phone") or "").strip(); otp="%06d"%secrets.randbelow(1000000); OTPS[ph]=(otp,time.time()+300)
            log("OTP for %s = %s"%(ph,otp))
            try: r=send_whatsapp(ph,"Colombo PoC eSignet - your verification code is "+otp); self._s(200,json.dumps({"ok":True,"status":r.get("status")}))
            except Exception as e: log("whatsapp err: "+str(e)); self._s(200,json.dumps({"ok":False,"error":str(e)[:120]}))
        elif self.path=="/register":
            ph=(d.get("phone") or "").strip(); st=OTPS.get(ph)
            if not st or st[0]!=(d.get("otp") or "").strip() or time.time()>st[1]: self._s(200,json.dumps({"ok":False,"error":"invalid or expired OTP"})); return
            p={"nationalId":(d.get("nationalId") or "").strip(),"pin":d.get("pin") or "","password":d.get("pin") or "",
               "fullName":((d.get("givenName") or "")+" "+(d.get("familyName") or "")).strip(),
               "givenName":d.get("givenName") or "","familyName":d.get("familyName") or "","phone":ph,
               "email":d.get("email") or "","gender":d.get("gender") or "","dateOfBirth":d.get("dateOfBirth") or "",
               "isCultivator":bool(d.get("farmId")),"farmId":d.get("farmId") or "","primaryCrops":"Paddy" if d.get("farmId") else ""}
            s,b=sunbird_post("/api/v1/Person",p); log("register %s -> sunbird %s"%(p["nationalId"],s))
            if s in (200,201): OTPS.pop(ph,None); self._s(200,json.dumps({"ok":True,"nationalId":p["nationalId"]}))
            else: self._s(200,json.dumps({"ok":False,"error":"register failed (sunbird "+str(s)+")"}))
        else: self._s(404,"{}")
    def log_message(self,*a): pass
log("registration service on :8090"); http.server.ThreadingHTTPServer(("0.0.0.0",8090),H).serve_forever()
