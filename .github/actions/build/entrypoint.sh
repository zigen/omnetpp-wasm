#!/bin/bash
set -eux
echo "hello world"
echo $HOME
cp /github/workspace/.bashrc $HOME/
ln -s /github/workspace/omnetpp $HOME/omnetpp
ln -s /github/workspace/qtbase $HOME/qtbase
bash build_all.sh
