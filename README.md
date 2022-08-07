# OMNeT++ on wasm

## prerequisotes
* docker

## getting started
```sh
$ ./build_all.sh
```

## build tictoc sample (on docker)
```sh
$ ./docker_run.sh
$ cd omnetpp/samples/tictoc
$ emmake make index.html
```

## browse wasm pages (on host machine)
```sh
$ cd omnetpp/samples/tictoc/out/emcc-release
$ python -m http.server
```

then go to `http://localhost:8000`

## export patch
```sh
$ cd omnetpp
# commit changes
$ git format-patch -o ../patches 71d8fab..HEAD     
```
