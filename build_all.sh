#!/bin/bash
set -eux

if [ -f "/.dockerenv" ]; then
bash build_qt.sh
cd /root/omnetpp
source ./setenv
cp configure.user.dist.wasm configure.user
emconfigure ./configure
emmake make -j4 common layout eventlog scave nedxml sim envir utils qtenv
emmake make -j4 aloha canvas cqn dyna fifo hypercube histograms neddemo queueinglib queueinglibext routing tictoc
else
docker build -t quisp-on-wasm2 .
docker run --rm -it --workdir=/root/ -v `pwd`:/root/ quisp-on-wasm2 bash -c "cd /root/ && ./build_all.sh"
fi