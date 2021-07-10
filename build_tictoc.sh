#!/bin/bash
set -eux
cd omnetpp/samples/tictoc
rm -f out/emcc-debug/tictoc_dbg.*

SOURCE_MAP_BASE=http://localhost:8080/samples/tictoc/out/emcc-debug/
WASM_OPTS="-s \"BINARYEN_TRAP_MODE='clamp'\" -s WASM=1 --bind -O3 -g3 -gsource-map  --source-map-base ${SOURCE_MAP_BASE} -s USE_PTHREADS=1 -s PTHREAD_POOL_SIZE=4 -s TOTAL_MEMORY=1GB"
WASM_PRELOAD_FILES="--preload-file ."
WASM_DEBUG="--js-opts 0 -s FULL_ES2=1 -s USE_WEBGL2=1 -s EXTRA_EXPORTED_RUNTIME_METHODS=[\"UTF16ToString\",\"stringToUTF16\",\"ccall\",\"cwrap\"]"
WASM_RUNTIME="-s DISABLE_EXCEPTION_CATCHING=0 -s EXCEPTION_DEBUG=1 -s NO_EXIT_RUNTIME=0 -s ERROR_ON_UNDEFINED_SYMBOLS=1"

# CXX=/emsdk_portable/fastcomp/emscripten/em++
CXX=em++
OBJS="out/emcc-debug//txc1.o out/emcc-debug//txc10.o out/emcc-debug//txc11.o out/emcc-debug//txc12.o out/emcc-debug//txc13.o out/emcc-debug//txc14.o out/emcc-debug//txc15.o out/emcc-debug//txc16.o out/emcc-debug//txc17.o out/emcc-debug//txc18.o out/emcc-debug//txc2.o out/emcc-debug//txc3.o out/emcc-debug//txc4.o out/emcc-debug//txc5.o out/emcc-debug//txc6.o out/emcc-debug//txc7.o out/emcc-debug//txc8.o out/emcc-debug//txc9.o out/emcc-debug//tictoc13_m.o out/emcc-debug//tictoc14_m.o out/emcc-debug//tictoc15_m.o out/emcc-debug//tictoc16_m.o out/emcc-debug//tictoc17_m.o out/emcc-debug//tictoc18_m.o"
TARGET="out/emcc-debug//tictoc_dbg.html"
LDFLAGS="-L/root/omnetpp/lib -o ${TARGET} ${OBJS} -loppmain_dbg -loppcmdenv_dbg -Wl,--whole-archive -loppenvir_dbg -loppsim_dbg -lopplayout_dbg -loppcommon_dbg -loppnedxml_dbg -loppqtenv_dbg  -L/root/qtbase/qtbase/lib -L/root/qtbase/qtbase/plugins/platforms -L/root/qtbase/qtbase/plugins/imageformats/ -lqwasm -lqico -lqjpeg -lQt5Gui -lQt5Core -lQt5Widgets -lQt5PrintSupport -lQt5OpenGL -lQt5EventDispatcherSupport -lQt5FontDatabaseSupport -lqtfreetype -lqgif  -lqtpcre2 -lqtlibpng -lqtharfbuzz -Wl,--no-whole-archive  -lstdc++ "
${CXX} --bind -s WASM=1 -s FULL_ES2=1 -s USE_WEBGL2=1 -s NO_EXIT_RUNTIME=0 -s ERROR_ON_UNDEFINED_SYMBOLS=1 -s EXTRA_EXPORTED_RUNTIME_METHODS=["UTF16ToString","stringToUTF16","ccall","cwrap"] --bind -O3 -g3 -gsource-map  --source-map-base http://localhost:8080/samples/tictoc/out/emcc-debug/  -s USE_PTHREADS=1 -s PTHREAD_POOL_SIZE=4 -s TOTAL_MEMORY=1GB ${LDFLAGS} --preload-file . -s DISABLE_EXCEPTION_CATCHING=0 -s EXCEPTION_DEBUG=1 --post-js post.js
