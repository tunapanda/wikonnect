#!/bin/bash
cd ~/wikonnect/
yarn  --frozen-lockfile --cwd ./server
yarn  --frozen-lockfile --cwd ./frontend
yarn  --frozen-lockfile --cwd docs
yarn  --frozen-lockfile --cwd swagger
yarn  --frozen-lockfile --cwd ./server db:init
yarn  --frozen-lockfile --cwd ./frontend build --prod
pm2 startOrReload ecosystem.config.js