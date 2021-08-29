#!/bin/bash
set -eux
echo "hello world"
echo $HOME
cp /github/workspace/.bashrc $HOME/
bash build_all.sh
