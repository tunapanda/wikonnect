#!/bin/bash
sudo yarn --cwd ~/wikonnect/server postinstall
sudo yarn --cwd ~/wikonnect/server db:init

# TODO: Find a long term fix for this
# sleep 5
# rm -rf server/public/h5p/frontend
# mkdir server/public/h5p/frontend
# cp -r frontend/dist/h5p/ server/public/h5p/frontend
