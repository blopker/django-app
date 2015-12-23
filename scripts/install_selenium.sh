#!/usr/bin/env bash
set -o pipefail
set -o errexit
set -o nounset

VERSION=2.48
MINOR=2

DL_PATH="tmp/selenium-server-standalone.jar"
URL="http://selenium-release.storage.googleapis.com/$VERSION/selenium-server-standalone-$VERSION.$MINOR.jar"

if [ ! -f "$DL_PATH" ]; then
    mkdir -p tmp
    echo "Downloading selenium"
    wget -O "$DL_PATH" "$URL"
else
    echo "Selenium already downloaded"
fi

echo "Done"
