#!/usr/bin/env bash
set -e

# Usage: ./gh_pages_deploy.sh <github-repo-url>
# Requires: ghp-import (pip install ghp-import) or git installed.

REPO_URL="$1"
if [ -z "$REPO_URL" ]; then
  echo "Usage: $0 git@github.com:<user>/tree.git"
  exit 1
fi

./build_dist.sh

DIST_DIR="dist/tree"

if command -v ghp-import >/dev/null 2>&1; then
  ghp-import -n -p "$DIST_DIR"
  echo "Deployed using ghp-import to gh-pages branch of the current repo."
else
  echo "ghp-import not found. Creating a temporary branch and pushing..."
  git init "$DIST_DIR/tmp_repo"
  cd "$DIST_DIR"
  git init
  git remote add origin "$REPO_URL" || true
  git checkout -b gh-pages
  git add .
  git commit -m "Deploy dist"
  git push -f "$REPO_URL" gh-pages
  echo "Pushed dist to gh-pages branch on $REPO_URL"
fi
