#!/usr/bin/env bash
#
# install-service.sh
#
# Installs a systemd unit that brings the docs-search Meilisearch stack up at boot
# and takes it down cleanly on shutdown.
#
# `restart: unless-stopped` in docker-compose.yaml already survives a reboot on its
# own, provided the docker daemon is enabled (systemctl enable --now docker). This
# unit is for when you want the stack to be an explicit, greppable service instead:
#
#   systemctl status docs-search      # is it up?
#   journalctl -u docs-search         # why did it not come up?
#   systemctl restart docs-search     # after editing docker-compose.yaml
#
# Unlike the ask stack's install-reboot-restart.sh, there is no post-boot restart
# timer here: that one works around Answer racing MySQL, and Meilisearch has no
# such dependency to lose a race against.
#
# Idempotent: safe to re-run. Run as root.
#
#   sudo ./install-service.sh
#
set -euo pipefail

SERVICE_NAME="docs-search"
COMPOSE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOCKER_BIN="$(command -v docker || echo /usr/bin/docker)"

if [[ $EUID -ne 0 ]]; then
  echo "This script must be run as root (try: sudo $0)" >&2
  exit 1
fi

if [[ ! -f "${COMPOSE_DIR}/docker-compose.yaml" ]]; then
  echo "No docker-compose.yaml next to this script (looked in ${COMPOSE_DIR})" >&2
  exit 1
fi

if [[ ! -f "${COMPOSE_DIR}/.env" ]]; then
  echo "WARNING: ${COMPOSE_DIR}/.env is missing." >&2
  echo "         MEILI_ENV=production refuses to start without MEILI_MASTER_KEY." >&2
  echo "         Copy .env.example to .env and set the key before starting." >&2
fi

echo "Writing /etc/systemd/system/${SERVICE_NAME}.service ..."
cat > "/etc/systemd/system/${SERVICE_NAME}.service" <<EOF
[Unit]
Description=Meilisearch instance backing docs.namasoft.com search
Requires=docker.service
After=docker.service network-online.target
Wants=network-online.target

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=${COMPOSE_DIR}
ExecStart=${DOCKER_BIN} compose up -d --remove-orphans
ExecStop=${DOCKER_BIN} compose down
ExecReload=${DOCKER_BIN} compose up -d --remove-orphans
# Pulling the image on a cold boot can outlast the default 90s.
TimeoutStartSec=300

[Install]
WantedBy=multi-user.target
EOF

echo "Reloading systemd and enabling the service ..."
systemctl daemon-reload
systemctl enable "${SERVICE_NAME}.service"

echo
echo "Installed. Compose directory: ${COMPOSE_DIR}"
echo "Start it now with:  systemctl start ${SERVICE_NAME}"
echo "Then verify with:   curl http://127.0.0.1:7701/health"
