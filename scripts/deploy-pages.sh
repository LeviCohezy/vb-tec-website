#!/usr/bin/env bash
# Build the static export and publish out/ to the gh-pages branch.
set -euo pipefail
cd "$(dirname "$0")/.."

PAGES_BASE_PATH=/vb-tec-website npm run build
touch out/.nojekyll

rev=$(git rev-parse --short HEAD)
cd out
rm -rf .git
git init -q -b gh-pages
git add -A
git commit -q -m "Deploy ${rev}"
git push -q -f "$(git -C .. remote get-url origin)" gh-pages
rm -rf .git
echo "Published ${rev} to gh-pages"
