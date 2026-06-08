#!/usr/bin/env python3
"""issue_one.py — prove the walt.id leg of Model A from a Sunbird-derived row.

Reads ONE credentialSubject (a JSON object) on stdin — the same shape a row from
the vc_* views produces — onboards a walt.id issuer key, and issues a single
OID4VCI pre-authorized credential. This mirrors exactly what verifiably's walt.id
adapter does per bulk row (onboard -> buildCredentialData -> /openid4vc/jwt/issue),
so a successful offer URI here proves the issuance half of the DB-source pipeline.

Usage (on the VPS, walt.id issuer on :7002):
  docker run --rm --network waltid_default --add-host host.docker.internal:host-gateway \
    -e PGPASSWORD=vc_reader postgres:14 \
    psql -h host.docker.internal -p 15432 -U vc_reader -d registry -tAc \
    "SELECT row_to_json(t) FROM (SELECT * FROM vc_fertilizer_cultivator LIMIT 1) t;" \
  | python3 issue_one.py --type CultivatorCredential
"""
import sys, json, argparse, urllib.request, urllib.error


def post(url, body, raw=False):
    data = json.dumps(body).encode()
    req = urllib.request.Request(url, data=data,
                                 headers={"Content-Type": "application/json"}, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            b = r.read().decode()
    except urllib.error.HTTPError as e:
        sys.exit(f"HTTP {e.code} from {url}: {e.read().decode()[:400]}")
    return b if raw else json.loads(b)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--issuer", default="http://localhost:7002",
                    help="walt.id issuer-api base URL")
    ap.add_argument("--config-id", default="EducationalID_jwt_vc_json",
                    help="stock walt.id jwt_vc_json config to borrow the signing envelope from")
    ap.add_argument("--type", default="CultivatorCredential",
                    help="credential type appended after VerifiableCredential")
    args = ap.parse_args()

    subject = json.load(sys.stdin)

    onb = post(f"{args.issuer}/onboard/issuer",
               {"key": {"backend": "jwk", "keyType": "secp256r1"}, "did": {"method": "jwk"}})

    ir = {
        "issuerKey": onb["issuerKey"],
        "credentialConfigurationId": args.config_id,
        "issuerDid": onb["issuerDid"],
        "authenticationMethod": "PRE_AUTHORIZED",
        "standardVersion": "DRAFT13",
        "credentialData": {
            "@context": ["https://www.w3.org/2018/credentials/v1",
                         "https://www.w3.org/ns/credentials/examples/v1"],
            "type": ["VerifiableCredential", args.type],
            "credentialSubject": subject,
        },
    }
    offer = post(f"{args.issuer}/openid4vc/jwt/issue", ir, raw=True).strip()
    print("ISSUER_DID: " + onb["issuerDid"])
    print("CRED_TYPE:  " + args.type)
    print("SUBJECT:    " + json.dumps(subject))
    print("OFFER_URI:  " + offer)


if __name__ == "__main__":
    main()
