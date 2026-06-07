#!/bin/bash
# Build mock-identity-sunbird:v010 (0.10.x mock-identity patched to read the
# Sunbird Person register) if absent. Idempotent: no-op when present.
set -e
docker image inspect mock-identity-sunbird:v010 >/dev/null 2>&1 && exit 0
echo "  building mock-identity-sunbird:v010 (Sunbird-backed mock-identity)..."
SRC=/root/colombo-poc/_esignet-src/mock-0.10.x
rm -rf "$SRC"; mkdir -p /root/colombo-poc/_esignet-src
git clone -q --depth 1 -b release-0.10.x https://github.com/mosip/esignet-mock-services.git "$SRC"
python3 /root/colombo-poc/scripts/patch_010.py
docker run --rm -v "$SRC":/build -w /build maven:3.9-eclipse-temurin-11 mvn -q -pl mock-identity-system -am package -DskipTests
cd "$SRC/mock-identity-system/target"
printf "FROM mosipid/mock-identity-system:0.10.1\nCOPY mock-identity-system-0.10.1.jar /home/mosip/mock-identity-system.jar\n" > Dockerfile.sunbird
docker build -q -f Dockerfile.sunbird -t mock-identity-sunbird:v010 .
echo "  built mock-identity-sunbird:v010"
