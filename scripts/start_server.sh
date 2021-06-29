#!/bin/bash
sudo ufw allow 22
cd ~/wikonnect/server/
pm2 startOrReload ecosystem.config.js
