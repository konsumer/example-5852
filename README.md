This is a an example for [raylib#5852](https://github.com/raysan5/raylib/pull/5852).

When using `PLATFORM_WASIGL`, you have to restructure your wasm a bit, in order to seperate main-loop and setup.


```sh
git clone git@github.com:konsumer/raylib.git
cd raylib
zig build -Dplatform=wasigl -Dtarget=wasm32-wasi
cd ..

/opt/wasi-sdk/bin/clang -O3 -Wl,--initial-memory=4194304 -Wl,--allow-undefined -Wl,--export=update -Wl,--export=malloc -I raylib/src -L raylib/zig-out/lib -lraylib example.c -o docs/example.wasm
```