#!/bin/bash
set -eux
echo "hello world"
echo $HOME
cp /github/workspace/.bashrc $HOME/
ln -s /github/workspace/omnetpp $HOME/omnetpp
ln -s /github/workspace/qtbase $HOME/qtbase
ln -s /github/workspace/qtbase /root/qtbase
export PATH=$PATH:$HOME/qtbase/qtbase/bin
bash build_all.sh
