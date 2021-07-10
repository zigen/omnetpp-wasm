# FROM trzeci/emscripten:1.38.48-fastcomp
#FROM trzeci/emscripten:sdk-tag-1.38.30-64bit
FROM emscripten/emsdk:2.0.25


WORKDIR /root
RUN apt update && apt install bison flex vim file pkg-config libtool -y
ADD .bashrc /root/.bashrc
