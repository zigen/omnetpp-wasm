FROM --platform=linux/amd64  ubuntu:20.04

ARG DEBIAN_FRONTEND=noninteractive
ARG VERSION=6.0
RUN apt update -y && apt install -y --no-install-recommends \
    qt5-default libqt5opengl5-dev libgtk-3-0 default-jre osgearth libpython3-dev python3-distutils \
    libeigen3-dev cmake g++ gdb gpg-agent software-properties-common wget \
    vim bison flex make lld-12 git clang-format-12 clang-tidy-12 lldb-12 && \
    wget https://bootstrap.pypa.io/get-pip.py --progress=dot:giga && \
    python3 ./get-pip.py && rm get-pip.py && \
    pip3 install numpy scipy pandas matplotlib posix_ipc && \
    ln -s /usr/bin/clang-format-12 /usr/bin/clang-format && \
    ln -s /usr/bin/clang-tidy-12 /usr/bin/clang-tidy && \
    ln -sf /usr/bin/clang-12 /usr/bin/clang && \
    ln -sf /usr/bin/clang++-12 /usr/bin/clang++ && \
    ln -sf /usr/bin/llvm-profdata-12 /usr/bin/llvm-profdata && \
    ln -sf /usr/bin/llvm-cov-12 /usr/bin/llvm-cov && \
    ln -sf /usr/bin/lld-12 /usr/bin/lld
WORKDIR /root
RUN wget https://github.com/omnetpp/omnetpp/releases/download/omnetpp-$VERSION/omnetpp-$VERSION-linux-x86_64.tgz \
    --referer=https://omnetpp.org/ -O omnetpp-src-linux.tgz --progress=dot:giga && \
    tar xf omnetpp-src-linux.tgz && rm omnetpp-src-linux.tgz
RUN mv omnetpp-$VERSION omnetpp
WORKDIR /root/omnetpp
ENV PATH /root/omnetpp/bin:$PATH
ENV QT_LOGGING_RULES=*.debug=false;qt.qpa.*=false
ENV OMNETPP_RELEASE=omnetpp-$VERSION
RUN bash -c "source setenv && ./configure WITH_OSG=no && \
    make -j $(nproc) MODE=debug base && \
    make -j $(nproc) MODE=release base && \
    rm -r doc out test samples config.log config.status"

FROM --platform=linux/amd64 emscripten/emsdk:2.0.25
ARG VERSION=6.0
ENV PATH /root/omnetpp/bin:$PATH
ENV QT_LOGGING_RULES=*.debug=false;qt.qpa.*=false
ENV OMNETPP_RELEASE=omnetpp-$VERSION
ENV QT_SELECT=5
WORKDIR /root
RUN apt update && apt install bison flex vim file pkg-config libtool -y && pip3 install toml
COPY --from=0 /root/omnetpp/bin/* /usr/local/bin/
COPY --from=0 /root/omnetpp/lib/* /usr/lib/
ADD .bashrc /root/.bashrc
