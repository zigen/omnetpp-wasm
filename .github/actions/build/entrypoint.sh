#!/bin/bash
set -eux
ln -s /github/workspace/qtbase /root/qtbase
mkdir /github/workspace/omnetpp/bin
mv /usr/local/bin/opp_* /github/workspace/omnetpp/bin/
export HOME=/github/workspace/
export PATH=$PATH:$HOME/qtbase/qtbase/bin
bash build_all.sh
