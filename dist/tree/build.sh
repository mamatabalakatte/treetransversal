#!/bin/bash

em++ cpp/tree.cpp cpp/bindings.cpp \
-o wasm/tree.js \
--bind \
-s MODULARIZE=1 \
-s EXPORT_ES6=1 \
-s ALLOW_MEMORY_GROWTH=1