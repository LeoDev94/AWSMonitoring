#!/bin/bash
set -e
# Stop all servers and start the server as a daemon
echo "STARTING APP"
pm2 delete monitoring-app
pm2 start "ng serve --host 0.0.0.0 --port 4200" --name "monitoring-app"