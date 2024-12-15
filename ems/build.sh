#!/bin/bash
emcc main.cpp \
    -I /usr/local/include/opencv4  \
    -L ./opencv/build_wasm/lib \
    -l opencv_core \
    -s NO_DISABLE_EXCEPTION_CATCHING \
    -s EXPORTED_FUNCTIONS="['_malloc', '_free']"
cp a.out.wasm ../public
cp a.out.js ../public
