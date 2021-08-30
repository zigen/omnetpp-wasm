#!/bin/bash
set -eux
echo "hello world"
ln -s /github/workspace/qtbase /root/qtbase
export HOME=/github/workspace/
export PATH=$PATH:$HOME/qtbase/qtbase/bin
bash build_all.sh
