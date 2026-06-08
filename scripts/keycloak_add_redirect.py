#!/usr/bin/env python3
"""keycloak_add_redirect.py — add the vc.in-labs.cdpi.dev callback to the
verifiably client in the vcplatform realm, so the keycloak login provider works
when verifiably is served at https://vc.in-labs.cdpi.dev.

Run on the VPS (verifiably keycloak admin on :8180, admin/admin).
"""
import json, urllib.request, urllib.error

KC = "http://localhost:8180"
REALM = "vcplatform"
CLIENT = "vcplatform"
NEW = ["https://vc.in-labs.cdpi.dev/auth/callback", "https://vc.in-labs.cdpi.dev/*"]


def call(method, path, body=None, token=None, form=False):
    headers = {}
    if form:
        data = urllib.parse.urlencode(body).encode()
        headers["Content-Type"] = "application/x-www-form-urlencoded"
    else:
        data = json.dumps(body).encode() if body is not None else None
        if data:
            headers["Content-Type"] = "application/json"
    if token:
        headers["Authorization"] = "Bearer " + token
    req = urllib.request.Request(KC + path, data=data, headers=headers, method=method)
    with urllib.request.urlopen(req, timeout=15) as r:
        b = r.read().decode()
        return json.loads(b) if b.strip() else {}


import urllib.parse
tok = call("POST", "/realms/master/protocol/openid-connect/token",
           {"grant_type": "password", "client_id": "admin-cli",
            "username": "admin", "password": "admin"}, form=True)["access_token"]
clients = call("GET", f"/admin/realms/{REALM}/clients?clientId={CLIENT}", token=tok)
if not clients:
    raise SystemExit(f"client {CLIENT} not found in realm {REALM}")
c = clients[0]
ru = set(c.get("redirectUris") or [])
before = len(ru)
ru.update(NEW)
c["redirectUris"] = sorted(ru)
call("PUT", f"/admin/realms/{REALM}/clients/{c['id']}", c, token=tok)
print(f"client {CLIENT}: redirectUris {before} -> {len(ru)}")
for u in sorted(ru):
    print("  ", u)
