FROM omnetpp/omnetpp:u18.04-5.6.2

# FROM trzeci/emscripten:1.38.48-fastcomp
#FROM trzeci/emscripten:sdk-tag-1.38.30-64bit
FROM emscripten/emsdk:2.0.25


WORKDIR /root
COPY --from=0 /root/omnetpp/bin/* /usr/local/bin/
COPY --from=0 /root/omnetpp/lib/* /usr/lib/
RUN apt update && apt install bison flex vim file pkg-config libtool -y
ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]