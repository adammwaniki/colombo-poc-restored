#!/bin/sh
# vault_autounseal.sh — keep Sunbird's Vault unsealed across restarts/reboots.
#
# Vault's file backend re-seals on every restart, which breaks the credentialing
# chain (identity/credential-schema/credential) until unsealed. Run this as a
# sidecar container on the sunbird-rc_default network with the unseal key in
# UNSEAL_KEY; it watches seal-status and unseals whenever Vault comes up sealed.
#
#   docker run -d --name vault-unsealer --restart unless-stopped \
#     --network sunbird-rc_default -e UNSEAL_KEY=<key> \
#     -v /root/colombo-poc/vault_autounseal.sh:/unseal.sh:ro \
#     --entrypoint sh curlimages/curl:latest /unseal.sh
#
# NOTE: the unseal key sits in this container's env — demo-grade. For production
# use Vault auto-unseal backed by a cloud KMS / transit engine instead.
: "${VAULT_URL:=http://vault:8200}"
: "${INTERVAL:=15}"
[ -n "$UNSEAL_KEY" ] || { echo "UNSEAL_KEY required"; exit 1; }
echo "vault-unsealer: watching $VAULT_URL every ${INTERVAL}s"
while true; do
  st=$(curl -s -m5 "$VAULT_URL/v1/sys/seal-status" 2>/dev/null)
  case "$st" in
    *'"sealed":true'*)
      echo "$(date -u +%H:%M:%S) Vault sealed -> unsealing"
      curl -s -m5 -X POST "$VAULT_URL/v1/sys/unseal" \
        -d "{\"key\":\"$UNSEAL_KEY\"}" >/dev/null 2>&1 ;;
  esac
  sleep "$INTERVAL"
done
