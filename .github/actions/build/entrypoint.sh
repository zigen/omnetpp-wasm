#!/bin/bash
set -eux
echo "hello world"
ln -s /github/workspace/qtbase /root/qtbase
export PATH=/github/workspace/
export PATH=$PATH:$HOME/qtbase/qtbase/bin
bash build_all.sh
