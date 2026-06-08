#!/usr/bin/env python3
"""clean_credentials.py — purge credentials that can't verify externally
(old non-resolvable `::` issuer DIDs, which make Inji's DID fetch return HTML →
"Unexpected token '<'"), and clear the credentials for specified national IDs.

Run on the VPS.
"""
import subprocess, json, urllib.request, urllib.error, sys

CLEAR_NIDS = set(sys.argv[1:]) or {"80000001", "80000002"}
DBC = ["docker", "exec", "sunbird-rc-db-1", "psql", "-U", "postgres", "-d", "credential", "-tAc"]


def dbq(sql):
    return subprocess.run(DBC + [sql], capture_output=True, text=True).stdout


def delete(cid):
    req = urllib.request.Request("http://localhost:3000/credentials/" + cid, method="DELETE")
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            return r.status
    except urllib.error.HTTPError as e:
        return e.code
    except Exception as e:
        return str(e)


rows = dbq('SELECT row_to_json(t) FROM (SELECT * FROM "VerifiableCredentials") t').strip().splitlines()
print("total credentials:", len([r for r in rows if r.strip()]))
to_del = []
for line in rows:
    if not line.strip():
        continue
    r = json.loads(line)
    vc = None
    for v in r.values():
        if isinstance(v, dict) and "issuer" in v and "proof" in v:
            vc = v; break
        if isinstance(v, str):
            try:
                o = json.loads(v)
                if isinstance(o, dict) and "issuer" in o and "proof" in o:
                    vc = o; break
            except Exception:
                pass
    if not vc:
        continue
    cid = vc.get("id")
    issuer = vc.get("issuer", "") or ""
    nid = (vc.get("credentialSubject") or {}).get("nationalId", "")
    if not cid:
        continue
    if "::" in issuer:
        to_del.append((cid, "broken-DID"))
    elif nid in CLEAR_NIDS:
        to_del.append((cid, "clear-" + nid))

print("to delete:", len(to_del), "(broken-DID + clear", sorted(CLEAR_NIDS), ")")
for cid, reason in to_del:
    print("  %-12s %s -> %s" % (reason, cid, delete(cid)))
print("done")
