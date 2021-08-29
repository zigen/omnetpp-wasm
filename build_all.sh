#!/bin/bash
set -ex

if [ -f "/.dockerenv" ]; then
source ~/.bashrc
bash build_qt.sh
cd /root/omnetpp
cp configure.user.dist.wasm configure.user
export PATH=/root/omnetpp/bin:$PATH
export QT_SELECT=5
ls /root/qtbase/qtbase/bin
qmake -query
emconfigure ./configure
emmake make -j4 common layout eventlog scave nedxml sim envir utils qtenv
emmake make aloha canvas cqn dyna fifo hypercube histograms neddemo queueinglib queueinglibext routing tictoc
else
docker build -t quisp-on-wasm2 .
docker run --rm -it --workdir=/root/ -v `pwd`:/root/ quisp-on-wasm2 bash -c "cd /root/ && ./build_all.sh"
fi
