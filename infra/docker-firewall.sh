#!/bin/bash
# Block external access to ALL Docker-published ports. Loopback/SSH-tunnel
# access and container egress (ESTABLISHED return) are unaffected.
EXT=$(ip route show default | awk '{print $5; exit}')
for ipt in iptables ip6tables; do
  "$ipt" -C DOCKER-USER -i "$EXT" -m conntrack --ctstate NEW,INVALID -j DROP 2>/dev/null \
    || "$ipt" -I DOCKER-USER -i "$EXT" -m conntrack --ctstate NEW,INVALID -j DROP
done
