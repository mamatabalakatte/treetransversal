#!/usr/bin/env bash
set -e

# Build a deployable `dist/tree` folder containing the site root
ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
SRC="$ROOT_DIR/Tree-Traversal-Visualizer"
DST="$ROOT_DIR/dist/tree"

rm -rf "$DST"
mkdir -p "$DST"

# Copy files preserving structure
rsync -av --exclude='.git' "$SRC/" "$DST/"

echo "Built dist at: $DST"
