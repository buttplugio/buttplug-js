// vite.config.js
import { resolve } from 'path';
import { fileURLToPath, URL } from "url";
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'buttplug-server-wasm',
      // the proper extensions will be added
      fileName: 'buttplug-server-wasm',
      formats: ['es'],
    },
    outDir: 'dist',
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [
    wasm(),
    topLevelAwait(),
    dts({
      exclude: ['tests'],
    }),
  ],
});
