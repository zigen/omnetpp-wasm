#!/bin/bash
set -ex

env
if [ ! -f "/.dockerenv" ] && [ $PWD != "/root" ] ; then
docker build -t  omnetpp-wasm .
docker run --rm -it --workdir=/root/ -v `pwd`:/root/ omnetpp-wasm bash -c "cd /root/ && ./build_all.sh"
exit $?
fi

source ~/.bashrc

if [ ! -d ~/qtbase/qtbase ]; then
	echo "::group::Building Qt"
	cd ~/qtbase
	./configure -xplatform wasm-emscripten -prefix $PWD/qtbase -opensource -no-compile-examples -confirm-license
	make -j4
	make install
	echo "::endgroup::"
fi

if [ ! -d ~/omnetpp/lib/liboppqtenv.a ]; then
	echo "::group::Building OMNeT"
	./apply_patches.sh
	cd ~/omnetpp
	# cp configure.user.dist.wasm configure.user
 	cp /usr/local/bin/opp_* /root/omnetpp/bin/
	ln -sf /usr/bin/python3 /usr/bin/python 
	source setenv
	# make clean -j4
	emconfigure ./configure
	emmake make -j4 common
	emmake make -j4 layout eventlog 
	emmake make -j4 scave nedxml sim envir utils 
	emmake make -j4 qtenv cmdenv
	echo "::endgroup::"
fi
