FROM trzeci/emscripten:1.38.48-fastcomp

WORKDIR /root
RUN apt update && apt install bison flex vim file pkg-config libtool -y
ADD .bashrc /root/.bashrc
