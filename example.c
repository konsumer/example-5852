#include "raylib.h"

// this will be called by host, when it's ready to draw a frame
void update() {
  BeginDrawing();
  ClearBackground(RAYWHITE);
  DrawText("Congrats! You created your first window!", 190, 200, 20, LIGHTGRAY);
  EndDrawing();
}

int main(void) {
    InitWindow(800, 450, "raylib [core] example - basic window");
    SetTargetFPS(60);

    // here we detect if it's wasm to decide if we should setup main-loop
    #ifndef __wasm__
    while (!WindowShouldClose()) {
      update();
    }
    CloseWindow();
    #endif

    return 0;
}