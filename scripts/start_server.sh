#!/bin/bash

cd ~/wikonnect/server/
pm2 startOrReload ecosystem.config.js
