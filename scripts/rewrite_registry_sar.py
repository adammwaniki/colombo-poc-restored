#!/usr/bin/env python3
"""rewrite_registry_sar.py — re-skin the Sunbird Person register with South-Asia
names/locations for the Colombo SAR workshop (was Kenya/T&T).

Update-in-place via the registry PUT API (so Postgres AND Elasticsearch stay
consistent — a raw SQL UPDATE would leave the ES index, hence eSignet, stale).
Preserves nationalId, PIN, gender, DOB, isCultivator, farm size (so existing
eSignet logins like 80000006/100005 and the Model A views keep working);
rewrites name, district, country, phone, email, farmId, crop. Also removes the
two leftover 'Adam Ndegwa' (nationalId 33764103) duplicate test records.

Run on the VPS:  python3 rewrite_registry_sar.py
"""
import json, urllib.request, urllib.error, time

BASE = "http://localhost:18091"


def call(method, path, body=None, timeout=30):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(BASE + path, data=data,
                                 headers={"Content-Type": "application/json"}, method=method)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, r.read().decode()
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()
    except Exception as e:
        return -1, str(e)


# Gender-matched South Asian names — Sri Lanka–centric with the natural
# Sinhalese / Tamil / Muslim-Moor mix plus a few regional (Indian, Pakistani)
# family names, since the register is the Sri Lankan population register.
MALE = [("Nuwan", "Bandara"), ("Kasun", "Fernando"), ("Arjun", "Subramaniam"),
        ("Tharindu", "Silva"), ("Senthil", "Nadarajah"), ("Dinesh", "Jayawardene"),
        ("Mohamed", "Hassan"), ("Roshan", "Wickramasinghe"), ("Karthik", "Sivakumar"),
        ("Pradeep", "Gunawardena")]
FEMALE = [("Nimali", "Perera"), ("Priya", "Rajaratnam"), ("Fathima", "Marikar"),
          ("Sandya", "Dissanayake"), ("Kavitha", "Thavarajah"), ("Iresha", "Senanayake"),
          ("Anjali", "Sharma"), ("Dilani", "Ranasinghe"), ("Ayesha", "Khan"),
          ("Lakshmi", "Iyer")]
DISTRICTS = ["Colombo", "Gampaha", "Kandy", "Galle", "Jaffna", "Kurunegala",
             "Anuradhapura", "Batticaloa", "Matara", "Ratnapura", "Badulla",
             "Hambantota", "Polonnaruwa", "Trincomalee", "Ampara", "Puttalam",
             "Kegalle", "Nuwara Eliya", "Mannar", "Vavuniya"]
CROPS = ["Paddy", "Tea", "Rubber", "Coconut", "Vegetables"]


def main():
    s, b = call("POST", "/api/v1/Person/search", {"filters": {}}, timeout=20)
    rows = json.loads(b)
    rows = rows if isinstance(rows, list) else rows.get("data", [])
    osid_by_nid = {}
    for r in rows:
        osid_by_nid.setdefault(r.get("nationalId"), r.get("osid"))

    mi = fi = 0
    for i in range(20):
        nid = "80%06d" % (i + 1)
        pin = "%06d" % (100000 + i)
        cult = (i % 3 != 0)                       # preserve the original cultivator split
        if i % 2 == 0:
            fn, ln = MALE[mi]; mi += 1; gender = "Male"
        else:
            fn, ln = FEMALE[fi]; fi += 1; gender = "Female"
        rec = {
            "nationalId": nid, "pin": pin, "password": pin,
            "fullName": fn + " " + ln, "givenName": fn, "familyName": ln, "gender": gender,
            "dateOfBirth": "19%02d/%02d/%02d" % (70 + i % 30, 1 + i % 12, 1 + i % 28),
            "email": (fn + "." + ln + "@example.lk").lower(),
            "phone": "+9471%07d" % (1000000 + i),
            "region": DISTRICTS[i], "country": "Sri Lanka", "isCultivator": cult,
            "farmId": ("LK-FARM-%04d" % (i + 1) if cult else ""),
            "farmSizeHectares": (round(0.5 + i * 0.3, 1) if cult else 0),
            "primaryCrops": (CROPS[i % len(CROPS)] if cult else ""),
        }
        osid = osid_by_nid.get(nid)
        if not osid:
            print("  MISSING osid for", nid); continue
        s, b = call("PUT", "/api/v1/Person/" + osid, rec, timeout=30)
        ok = "OK" if s == 200 else ("ERR %s %s" % (s, b[:80]))
        print("  %s %-24s %-7s %-12s cult=%-5s -> %s" % (nid, fn + " " + ln, gender, DISTRICTS[i], cult, ok))
        time.sleep(0.4)

    # remove leftover 'Adam Ndegwa' duplicate test records (nationalId 33764103)
    for r in rows:
        if r.get("nationalId") == "33764103":
            s, b = call("DELETE", "/api/v1/Person/" + r.get("osid"))
            print("  DELETE junk 33764103 osid=%s -> %s" % (r.get("osid"), s))
            time.sleep(0.4)
    print("DONE")


if __name__ == "__main__":
    main()
