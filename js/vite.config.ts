import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'buttplug',
      // the proper extensions will be added
      fileName: (format): string => {
        if (format === 'umd') {
          return 'buttplug.js';
        } else if (format === 'iife') {
          return 'buttplug.global.js';
        }
        return 'buttplug.mjs';
      },
      formats: ['es', 'umd', 'iife'],
    },
    outDir: 'dist/web',
  },
  plugins: [
    dts({
      exclude: ['tests'],
    }),
  ],
});
