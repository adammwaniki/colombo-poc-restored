#!/usr/bin/env python3
"""registration_service_email.py — self-registration into the Sunbird Person
register with EMAIL-OTP (replaces the Twilio SMS path that was blocked).

Citizen enters email -> OTP is emailed (SMTP -> Mailpit catcher, viewable in its
web inbox, no external creds) -> citizen enters OTP + details -> a Person is
created in the Sunbird registry, immediately usable for eSignet login.

Env: SUNBIRD_URL (default http://localhost:18091), SMTP_HOST/SMTP_PORT
(default localhost:1025 = Mailpit), OTP_FROM (default no-reply@in-labs.cdpi.dev).
For a real relay (e.g. SendGrid): SMTP_HOST=smtp.sendgrid.net SMTP_PORT=587
SMTP_STARTTLS=1 SMTP_USER=apikey SMTP_PASS=<api-key>, and OTP_FROM must be a
VERIFIED sender (domain-authenticated or single-sender-verified) in the relay.
Serves on :8090.
"""
import http.server, json, urllib.request, urllib.error, secrets, time, os, smtplib
from email.message import EmailMessage

SUNBIRD = os.environ.get("SUNBIRD_URL", "http://localhost:18091")
SMTP_HOST = os.environ.get("SMTP_HOST", "localhost")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "1025"))
SMTP_USER = os.environ.get("SMTP_USER", "")
SMTP_PASS = os.environ.get("SMTP_PASS", "")
SMTP_STARTTLS = os.environ.get("SMTP_STARTTLS", "0").lower() in ("1", "true", "yes")
OTP_FROM = os.environ.get("OTP_FROM", "no-reply@in-labs.cdpi.dev")
OTPS = {}


def log(m):
    print(m, flush=True)


def send_email(to, otp):
    msg = EmailMessage()
    msg["Subject"] = "Your Colombo PoC registration code"
    msg["From"] = OTP_FROM
    msg["To"] = to
    msg.set_content(f"Your verification code is {otp}\n\nIt expires in 5 minutes.")
    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=20) as s:
        s.ehlo()
        if SMTP_STARTTLS:
            s.starttls()
            s.ehlo()
        if SMTP_USER:
            s.login(SMTP_USER, SMTP_PASS)
        s.send_message(msg)


def sunbird_post(path, body):
    req = urllib.request.Request(SUNBIRD + path, data=json.dumps(body).encode(),
                                 headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.status, r.read().decode()
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()
    except Exception as e:
        return -1, str(e)


FORM = r"""<!doctype html><html><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1">
<title>Self-Registration - Colombo PoC</title><style>
body{font-family:system-ui,sans-serif;max-width:520px;margin:2rem auto;padding:0 1rem;color:#222}
h1{font-size:1.4rem} label{display:block;margin:.7rem 0 .2rem;font-size:.85rem;color:#555}
input{width:100%;padding:.55rem;border:1px solid #ccc;border-radius:6px;box-sizing:border-box}
button{margin-top:1rem;padding:.6rem 1.2rem;border:0;border-radius:6px;background:#c0492b;color:#fff;font-size:1rem;cursor:pointer}
.hidden{display:none}.msg{margin-top:1rem;padding:.6rem;border-radius:6px}.ok{background:#e6f4ea}.err{background:#fce8e6}
small{color:#777}</style></head><body>
<h1>Self-Registration</h1><p><small>Register against the Sunbird register of record with an email code, then sign in via eSignet.</small></p>
<div id=s1><label>Email</label><input id=email type=email placeholder="you@example.lk">
<button onclick="sendOtp()">Email me a code</button></div>
<div id=s2 class=hidden><div class="msg ok">Code sent — check your inbox, then enter it with your details.</div>
<label>Code</label><input id=otp placeholder="6-digit code">
<label>National ID (8 digits)</label><input id=nationalId placeholder="80000099">
<label>Given name</label><input id=givenName><label>Family name</label><input id=familyName>
<label>Gender</label><input id=gender placeholder="Male/Female">
<label>Date of birth (YYYY/MM/DD)</label><input id=dateOfBirth placeholder="1990/01/01">
<label>District</label><input id=region placeholder="Colombo">
<label>Farm ID (optional, makes you a cultivator)</label><input id=farmId>
<label>Choose a PIN</label><input id=pin type=password placeholder="your PIN">
<button onclick="register()">Register</button></div>
<div id=out></div>
<script>
async function post(u,b){let r=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(b)});return r.json()}
async function sendOtp(){let e=email.value.trim();let r=await post("/send-otp",{email:e});if(r.ok){s1.classList.add("hidden");s2.classList.remove("hidden")}else out.innerHTML="<div class=\"msg err\">"+(r.error||"failed")+"</div>"}
async function register(){let b={email:email.value.trim(),otp:otp.value.trim(),nationalId:nationalId.value.trim(),givenName:givenName.value.trim(),familyName:familyName.value.trim(),gender:gender.value.trim(),dateOfBirth:dateOfBirth.value.trim(),region:region.value.trim(),farmId:farmId.value.trim(),pin:pin.value};let r=await post("/register",b);out.innerHTML=r.ok?("<div class=\"msg ok\">Registered! Sign in via eSignet with National ID <b>"+r.nationalId+"</b> and your PIN.</div>"):("<div class=\"msg err\">"+(r.error||"failed")+"</div>")}
</script></body></html>"""


class H(http.server.BaseHTTPRequestHandler):
    def _s(self, c, b, ct="application/json"):
        self.send_response(c); self.send_header("Content-Type", ct); self.end_headers()
        self.wfile.write(b.encode() if isinstance(b, str) else b)

    def do_GET(self):
        if self.path == "/" or self.path.startswith("/?"):
            self._s(200, FORM, "text/html")
        else:
            self._s(404, "{}")

    def do_POST(self):
        n = int(self.headers.get("Content-Length", 0))
        try:
            d = json.loads(self.rfile.read(n) or b"{}")
        except Exception:
            d = {}
        if self.path == "/send-otp":
            em = (d.get("email") or "").strip()
            if "@" not in em:
                self._s(200, json.dumps({"ok": False, "error": "valid email required"})); return
            otp = "%06d" % secrets.randbelow(1000000)
            OTPS[em] = (otp, time.time() + 300)
            log("OTP for %s = %s" % (em, otp))
            try:
                send_email(em, otp); self._s(200, json.dumps({"ok": True}))
            except Exception as e:
                log("email err: " + str(e)); self._s(200, json.dumps({"ok": False, "error": str(e)[:140]}))
        elif self.path == "/register":
            em = (d.get("email") or "").strip(); st = OTPS.get(em)
            if not st or st[0] != (d.get("otp") or "").strip() or time.time() > st[1]:
                self._s(200, json.dumps({"ok": False, "error": "invalid or expired code"})); return
            p = {"nationalId": (d.get("nationalId") or "").strip(), "pin": d.get("pin") or "", "password": d.get("pin") or "",
                 "fullName": ((d.get("givenName") or "") + " " + (d.get("familyName") or "")).strip(),
                 "givenName": d.get("givenName") or "", "familyName": d.get("familyName") or "", "email": em,
                 "gender": d.get("gender") or "", "dateOfBirth": d.get("dateOfBirth") or "",
                 "region": d.get("region") or "", "country": "Sri Lanka",
                 "isCultivator": bool(d.get("farmId")), "farmId": d.get("farmId") or "",
                 "primaryCrops": "Paddy" if d.get("farmId") else ""}
            s, b = sunbird_post("/api/v1/Person", p)
            log("register %s -> sunbird %s" % (p["nationalId"], s))
            if s in (200, 201):
                OTPS.pop(em, None); self._s(200, json.dumps({"ok": True, "nationalId": p["nationalId"]}))
            else:
                self._s(200, json.dumps({"ok": False, "error": "register failed (sunbird " + str(s) + ")"}))
        else:
            self._s(404, "{}")

    def log_message(self, *a):
        pass


log("registration service (email-OTP) on :8090")
http.server.ThreadingHTTPServer(("0.0.0.0", 8090), H).serve_forever()
