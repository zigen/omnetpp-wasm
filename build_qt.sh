#!/bin/bash

set -eux 

cd qtbase
./configure -xplatform wasm-emscripten -prefix $PWD/qtbase -opensource -confirm-license
make -j4
make install
