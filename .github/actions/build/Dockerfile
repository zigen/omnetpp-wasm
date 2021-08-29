FROM omnetpp/omnetpp:u18.04-5.6.2
RUN opp_msgc

# FROM trzeci/emscripten:1.38.48-fastcomp
#FROM trzeci/emscripten:sdk-tag-1.38.30-64bit
FROM emscripten/emsdk:2.0.25


WORKDIR /root
COPY --from=0 /root/omnetpp/bin/ /root/opp_bin
RUN apt update && apt install bison flex vim file pkg-config libtool -y
ADD .bashrc /root/.bashrc
ADD entrypoint.sh /entrypoint.sh
RUN /root/opp_bin/opp_msgc
ENTRYPOINT [ "/entrypoint.sh" ]