#!/bin/bash
set -ex

if [ -f "/.dockerenv" ]; then
source ~/.bashrc
echo "::group::Building Qt"
bash build_qt.sh
echo "::endgroup::"
echo "::group::Building OMNeT"
cd ~/omnetpp
cp configure.user.dist.wasm configure.user
export PATH=$HOME/omnetpp/bin:$PATH
export QT_SELECT=5
emconfigure ./configure
emmake make -j4 common layout eventlog scave nedxml sim envir utils qtenv
echo "::endgroup::"
echo "::group::Building OMNeT Samples"
emmake make aloha canvas cqn dyna fifo hypercube histograms neddemo queueinglib queueinglibext routing tictoc
echo "::endgroup::"
else
docker build -t quisp-on-wasm2 .
docker run --rm -it --workdir=/root/ -v `pwd`:/root/ quisp-on-wasm2 bash -c "cd /root/ && ./build_all.sh"
fi
