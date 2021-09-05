#!/bin/bash
set -e

echo "::group::Building OMNeT Samples"
source ~/.bashrc
cd ~/omnetpp
TARGETS="aloha canvas cqn dyna fifo hypercube histograms neddemo routing tictoc"
emmake make $TARGETS
SAMPLE_OUT=~/public
for target in $TARGETS; do
	cd ~/omnetpp/samples/$target
	emmake make index.html
	mkdir -p $SAMPLE_OUT/$target
	cd out/emcc-release/
	cp *.js *.wasm *.data qtlogo.svg index.html $SAMPLE_OUT/$target/
done
echo "::endgroup::"
