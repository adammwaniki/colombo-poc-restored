#!/usr/bin/env python3
"""waltid_catalog_sync.py — re-append verifiably custom schemas into walt.id's
issuer catalog (credential-issuer-metadata.conf) so their configurationIds become
real. Replicates verifiably's appendCredentialType() HOCON exactly. Idempotent
(skips configIDs already present). Writes BOTH the runtime conf and the baseline
seed so a re-seed from baseline keeps them. Run on the VPS; then restart issuer-api.
"""
import json, sys

BASE = "/root/colombo-poc/verifiably/verifiably-go"
SCHEMAS = BASE + "/config/custom-schemas.user.json"
CONFS = [
    BASE + "/deploy/k8s/config/issuer/credential-issuer-metadata.conf",
    BASE + "/deploy/k8s/config/issuer/credential-issuer-metadata.baseline.conf",
]
WIRE = {
    "": ["jwt_vc_json", "jwt_vc_json-ld", "ldp_vc"],
    "w3c_vcdm_2": ["jwt_vc_json", "jwt_vc_json-ld", "ldp_vc"],
    "w3c_vcdm_1": ["jwt_vc_json"],
    "jwt_vc": ["jwt_vc_json"],
    "sd_jwt_vc": ["vc+sd-jwt"],
    "sd_jwt_vc (IETF)": ["vc+sd-jwt"],
}


def esc(s):
    return s.replace("\\", "\\\\").replace('"', '\\"')


def block(config_id, type_name, wf, display, desc):
    ctx = ""
    if wf in ("jwt_vc_json-ld", "ldp_vc"):
        ctx = ('            "@context" = [\n'
               '                "https://www.w3.org/2018/credentials/v1",\n'
               '                "https://www.w3.org/ns/credentials/examples/v1"\n'
               '            ]\n')
    return ('    "%s" = {\n'
            '        format = "%s"\n'
            '        cryptographic_binding_methods_supported = ["did"]\n'
            '        credential_signing_alg_values_supported = ["EdDSA", "ES256"]\n'
            '        credential_definition = {\n'
            '%s'
            '            type = ["VerifiableCredential", "%s"]\n'
            '        }\n'
            '        display = [\n'
            '            {\n'
            '                name = "%s"\n'
            '                description = "%s"\n'
            '                locale = "en-US"\n'
            '                background_color = "#FFFFFF"\n'
            '                text_color = "#000000"\n'
            '            }\n'
            '        ]\n'
            '    }') % (config_id, wf, ctx, type_name, esc(display), esc(desc))


schemas = json.load(open(SCHEMAS))
blocks = {}
for s in schemas:
    name = s.get("Name")
    type_name = (s.get("AdditionalTypes") or [name])[0] or name
    std = s.get("Std", "")
    desc = s.get("Desc") or name
    for wf in WIRE.get(std, []):
        cid = type_name + "_" + wf
        blocks[cid] = block(cid, type_name, wf, name, desc)

print("custom configIDs to ensure (%d):" % len(blocks))
for cid in sorted(blocks):
    print("  " + cid)

for conf in CONFS:
    content = open(conf).read()
    add = [b for cid, b in blocks.items() if ('"' + cid + '"') not in content]
    if not add:
        print("%s: already complete" % conf)
        continue
    last = content.rfind("}")
    insert = "\n" + "\n\n".join(add) + "\n"
    open(conf, "w").write(content[:last] + insert + content[last:])
    print("%s: added %d blocks" % (conf, len(add)))
print("done — restart issuer-api to load")
