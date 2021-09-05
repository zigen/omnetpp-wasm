#!/bin/bash
set -e

echo "::group::Building OMNeT Samples"
WORKDIR=$PWD
source $WORKDIR/.bashrc
cd $WORKDIR/omnetpp
TARGETS="aloha canvas cqn dyna fifo hypercube histograms neddemo routing tictoc"
SAMPLE_OUT=$WORKDIR/public
for target in $TARGETS; do
	cd $WORKDIR/omnetpp/samples/$target
	opp_makemake
	emmake make index.html
	mkdir -p $SAMPLE_OUT/$target
	cd out/emcc-release/
	cp *.js *.wasm *.data qtlogo.svg index.html $SAMPLE_OUT/$target/
done
echo "::endgroup::"
