#! /bin/sh
set -eux
cd omnetpp
rm -f out/emcc-debug/src/qtenv/liboppqtenv*
rm -f lib/liboppqtenv*
cd src/qtenv
#emmake make MODE=debug -j8
emmake make MODE=release -j8
