#!/bin/bash
cd ~/wikonnect/
yarn  --frozen-lockfile --cwd ./server docs
yarn  --frozen-lockfile --cwd ./server swagger
pm2 startOrReload ecosystem.config.js