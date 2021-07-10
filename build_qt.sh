#!/bin/bash

set -eux 

cd qtbase
./configure -xplatform wasm-emscripten -prefix $PWD/qtbase -feature-thread -opensource -confirm-license
make
