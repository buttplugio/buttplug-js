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
        }
        return 'buttplug.mjs';
      },
    },
    outDir: 'dist/web',
  },
  plugins: [
    dts({
      exclude: ['tests'],
    }),
  ],
});
