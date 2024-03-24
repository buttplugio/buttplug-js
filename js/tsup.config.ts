import { defineConfig } from 'tsup';

export default defineConfig({
  name: 'buttplug-js',
  entry: ['src/index.ts'],
  target: ['es6'],
  format: ['cjs', 'esm'],
  outDir: 'dist/main',
  platform: 'node',
  clean: true,
  sourcemap: true,
  dts: true,
  minify: true,
});
