#!/bin/bash
cd ~/wikonnect/

sudo chmod -R 777 frontend/node_modules
sudo chmod -R 777 server/node_modules
yarn  --frozen-lockfile --cwd docs
yarn  --frozen-lockfile --cwd swagger
yarn  --frozen-lockfile --cwd ./server
yarn  --frozen-lockfile --cwd ./server db:init
yarn  --frozen-lockfile --cwd ./frontend
yarn  --frozen-lockfile --cwd ./frontend build --prod