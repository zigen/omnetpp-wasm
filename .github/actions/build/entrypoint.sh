#!/bin/bash
set -eux
echo "hello world"
echo $HOME
cp /github/workspace/.bashrc $HOME/
ln -s /github/workspace/omnetpp $HOME/omnetpp
bash build_all.sh
