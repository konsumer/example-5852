import { Glfw, GL } from '@easywasm/gl'
import WasiPreview1 from '@easywasm/wasi'

// Undefined WASM imports from ubsan instrumentation — make them no-ops
const ubsan = {
  __ubsan_handle_out_of_bounds: () => {},
  __ubsan_handle_pointer_overflow: () => {},
  __ubsan_handle_type_mismatch_v: () => {},
  __ubsan_handle_nonnull_arg: () => {},
  __ubsan_handle_add_overflow: () => {},
  __ubsan_handle_mul_overflow: () => {},
  __ubsan_handle_builtin_unreachable: () => {},
  __ubsan_handle_sub_overflow: () => {},
  __ubsan_handle_divrem_overflow: () => {},
  __ubsan_handle_load_invalid_value: () => {},
  __ubsan_handle_float_cast_overflow: () => {},
  __ubsan_handle_shift_out_of_bounds: () => {},
  __ubsan_handle_type_mismatch_v1: () => {},
  __ubsan_handle_negate_overflow: () => {}
}

async function loadWasm(url, canvas) {
  const glfw = new Glfw({ canvas })
  const glHost = new GL()
  const wasi_snapshot_preview1 = new WasiPreview1()

  const { instance } = await WebAssembly.instantiateStreaming(fetch(url), {
    env: { ...ubsan, ...glfw, ...glHost },
    wasi_snapshot_preview1
  })

  glfw.start(instance.exports)
  glHost.start(instance.exports)

  const preGL = canvas.getContext('webgl2') || canvas.getContext('webgl')
  glHost.setGL(preGL)

  wasi_snapshot_preview1.start(instance.exports)
  // glHost.setGL(glfw.getContextGL())

  function loop() {
    instance.exports.update()
    requestAnimationFrame(loop)
  }
  requestAnimationFrame(loop)
}

const canvas = document.getElementById('canvas')
await loadWasm('example.wasm', canvas)
