# Hardened rebuild (2026-06-07)

The original VPS (`156.67.105.185`) was **compromised** (rooted host running an SSH
worm; foreign immutable SSH key; exposed services with default creds). It was wiped
and rebuilt clean + hardened from first boot. This dir holds the host-level hardening
artifacts; the stack code lives in `../scripts`, `../e2e`, `../sunbird-rc`,
`../verifiably-go`.

## Host hardening
- **Key-only SSH** — `99-colombo-hardening.conf` → `/etc/ssh/sshd_config.d/`
  (`PasswordAuthentication no`, `PermitRootLogin prohibit-password`). The entry vector
  was a root **password** login, so password auth is killed entirely. Gotcha: Ubuntu
  cloud images ship `50-cloud-init.conf` with `PasswordAuthentication yes` that wins by
  sort order — overwrite it and set `ssh_pwauth:false` in `/etc/cloud/cloud.cfg.d/`.
- **ufw** default-deny incoming, only 22 open · **fail2ban** sshd jail · 8 GB swap ·
  unattended-upgrades.
- **Docker bypasses ufw** (published ports punch through the firewall — this re-exposed
  the stack to the internet even with ufw active, verified). Docker
  `daemon.json {"ip":"127.0.0.1"}` did NOT rebind compose ports. The fix that works:
  `docker-firewall.sh` inserts a `DOCKER-USER` drop for new external traffic, persisted
  by `docker-firewall.service` (After=docker). Install:
  ```
  cp docker-firewall.sh /usr/local/sbin/ && chmod +x /usr/local/sbin/docker-firewall.sh
  cp docker-firewall.service /etc/systemd/system/
  systemctl daemon-reload && systemctl enable --now docker-firewall.service
  ```
  Result: every container port is blocked from the internet; reach services via SSH
  tunnel (`ssh -L 8080:localhost:8080 -L 3005:localhost:3005 … colombo`).

## Stack bring-up (loopback-bound)
1. `verifiably/verifiably-go`: `.env` `VERIFIABLY_PUBLIC_HOST=localhost`,
   `VERIFIABLY_AUTH_ADMIN=rw`; `deploy.sh up waltid` then `up inji` (eSignet).
2. Sunbird: custom `sunbird-rc/docker-compose.override.yml` + `db-init`, host-port
   remaps (db 15432, keycloak 18080, nginx 11080, registry **18091**) to dodge the
   verifiably stack; `POSTGRES_PASSWORD=postgres`. Seed: `scripts/sb_seed.py` (synthetic
   8-digit IDs 80000001-80000020).
3. mock-identity → Sunbird: patch via `scripts/patch_010.py`, build
   `mock-identity-sunbird:v010`, recreate with `scripts/recreate_mockid_sunbird.py`
   (`SUNBIRD_REGISTRY_URL=http://sunbird-rc-registry-1:8081`, attached to both
   `waltid_default` + `sunbird-rc_default`).
4. verifiably-go private_key_jwt: `scripts/patch_pkjwt.py` + the **aud-decoupling** in
   `oidc.go setClientAuth` (aud follows `publicIssuerUrl`, POST follows `issuerUrl`).
5. eSignet client: `scripts/esignet_register_client.py` (redirect
   `http://localhost:8080/auth/callback`). Provider:
   `verifiably-go/config/auth-providers.user.json.example`.

Proven end-to-end: headless Chromium (`e2e/flow-localhost.mjs`) logs in `80000002` /
PIN `100001` via eSignet → `localhost:8080/issuer/dpg`.

## Port collisions to watch (Sunbird ↔ verifiably/inji, same host)
inji-verify-service **8082** ↔ Sunbird **claim-ms** 8082 — claim-ms stopped (not needed
for registry-only). Everything else remapped via the Sunbird override.
