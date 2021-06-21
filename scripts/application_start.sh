#!/bin/bash
set -e
# Stop all servers and start the server as a daemon TEST
echo "STARTING APP"
pm2 delete --silent frontend-app
pm2 start "ng serve --host 0.0.0.0 --port 4200" --name "frontend-app"