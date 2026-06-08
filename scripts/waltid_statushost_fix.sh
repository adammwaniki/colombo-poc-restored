#!/usr/bin/env bash
# waltid_statushost_fix.sh — let walt.id services fetch the status-list URL
# baked into issued credentials.
#
# Issued credentials carry credentialStatus = https://vc.in-labs.cdpi.dev/
# status-list/bitstring/v1 (verifiably's PUBLIC host, so EXTERNAL verifiers can
# fetch it). But the in-cluster walt.id verifier-api / wallet-api can't hairpin
# to the box's own public IP (and the published-port path via the docker gateway
# is firewalled), so the fetch times out → StatusRetrievalError → the
# credential-status policy fails with the misleading "credential has been
# revoked".
#
# Fix: split-horizon — resolve vc.in-labs.cdpi.dev to the caddy-public CONTAINER
# (same waltid_default network, directly reachable), which terminates TLS for
# that host and proxies to verifiably-go.
#
# PERMANENT fix — ALREADY APPLIED (2026-06-09): caddy-public carries a docker
# network alias for the host, so every waltid_default container resolves
# vc.in-labs.cdpi.dev -> caddy-public via docker DNS (no /etc/hosts, no IP
# pinning, survives restarts). Applied live with
#   docker network disconnect waltid_default waltid-caddy-public-1
#   docker network connect --alias caddy-public --alias vc.in-labs.cdpi.dev waltid_default waltid-caddy-public-1
# and persisted in the stack compose (caddy-public.networks.default.aliases).
#
# This script is now only a FALLBACK: if caddy-public is ever recreated WITHOUT
# the compose alias and the DNS path breaks, run it to re-pin /etc/hosts.
# Idempotent.
set -euo pipefail
CADDY_IP=$(docker inspect waltid-caddy-public-1 \
  --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}')
[ -n "$CADDY_IP" ] || { echo "caddy-public IP not found"; exit 1; }
echo "caddy-public (waltid_default): $CADDY_IP"
for c in waltid-verifier-api-1 waltid-wallet-api-1; do
  docker exec "$c" sh -lc "
    grep -v 'vc.in-labs.cdpi.dev' /etc/hosts > /tmp/h 2>/dev/null || true
    printf '%s vc.in-labs.cdpi.dev\n' '$CADDY_IP' >> /tmp/h
    cat /tmp/h > /etc/hosts && rm -f /tmp/h
    echo \"$c -> \$(grep vc.in-labs /etc/hosts)\""
done
echo "done — re-verify; credential-status now resolves."
