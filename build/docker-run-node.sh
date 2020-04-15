#!/bin/bash
P="$(cd "$(dirname "$0")"/.. || exit; pwd)"
docker run -it --rm \
    -v "$P"/package.json:/app/package.json \
    -v "$P"/node_modules/:/app/node_modules/ \
    -v "$P"/build/:/app/build \
    -v "$P"/tsconfig.json:/app/tsconfig.json \
    -v "$P"/resources/:/app/resources \
    -v "$P"/public/:/app/public \
    -w=/app \
    node:lts-alpine "$@"
