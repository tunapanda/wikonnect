#!/bin/bash
cd ~/wikonnect/
yarn  --frozen-lockfile --cwd ./server
yarn  --frozen-lockfile --cwd ./server db:init
yarn  --frozen-lockfile --cwd docs
yarn  --frozen-lockfile --cwd swagger
pm2 startOrReload ecosystem.config.js