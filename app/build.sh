#!/bin/bash
# Build sem Vite (registro npm indisponível): esbuild + React global. Gera dist/ pronto para hospedar.
set -e
cd "$(dirname "$0")"; G=$(npm root -g); rm -rf dist; mkdir -p dist
NODE_PATH=$G /opt/npm-tools/node_modules/esbuild/bin/esbuild src/main.jsx --bundle --minify --target=es2019 --jsx=automatic --loader:.js=jsx --external:/fonts/* --external:/assets/* --outfile=dist/bundle.js --define:process.env.NODE_ENV=\"production\" --log-level=warning
cp -r public/* dist/; cp index.html dist/index.html
