#!/bin/bash
set -ex

if [ -f "/.dockerenv" ]; then
source ~/.bashrc

if [ ! -d ~/qtbase/qtbase ]; then
	echo "::group::Building Qt"
	bash build_qt.sh
	echo "::endgroup::"
fi

if [ ! -d ~/omnetpp/lib ]; then
	echo "::group::Building OMNeT"
	cd ~/omnetpp
	cp configure.user.dist.wasm configure.user
	export PATH=$HOME/omnetpp/bin:$PATH
	export QT_SELECT=5
	emconfigure ./configure
	emmake make -j4 common layout eventlog scave nedxml sim envir utils qtenv
	echo "::endgroup::"
fi

echo "::group::Building OMNeT Samples"
cd ~/omnetpp
TARGETS="aloha canvas cqn dyna fifo hypercube histograms neddemo queueinglib queueinglibext routing tictoc"
emmake make $TARGETS
SAMPLE_OUT=~/sample_outputs
for target in $TARGETS; do
	cd ~/omnetpp/samples/$target
	emmake make index.html
	mkdir -p $SAMPLE_OUT/$target
	cd out/emcc-release/
	cp *.js *.wasm *.data qtlogo.svg index.html $SAMPLE_OUT/$target/
done
echo "::endgroup::"

else
docker build -t quisp-on-wasm2 .
docker run --rm -it --workdir=/root/ -v `pwd`:/root/ quisp-on-wasm2 bash -c "cd /root/ && ./build_all.sh"
fi
