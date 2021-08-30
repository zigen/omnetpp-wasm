#!/bin/bash
set -eux
echo "hello world"
echo $HOME
ln -s /github/workspace $HOME
ls -la $HOME
ln -s /github/workspace/qtbase /root/qtbase
export PATH=$PATH:$HOME/qtbase/qtbase/bin
bash build_all.sh
