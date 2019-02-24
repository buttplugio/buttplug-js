import typescript from 'rollup-plugin-typescript2';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import nodeBuiltins from 'rollup-plugin-node-builtins';

// Generate our base config object out of a function return, so we don't have to
// worry about doing copies/clones.
function configGen() {
  return {
    input: 'src/index.ts',
    output: {
      file: 'dist/web/buttplug.js',
      format: 'iife',
      name: "Buttplug"
    },
    plugins: [
      nodeResolve({
        jsnext: true,
        main: true,
        extensions: [ '.ts', '.js', '.json' ],
        browser: true
      }),
      typescript({ tsconfigOverride: { compilerOptions: { module: "ES2015" } } }),
      json(),
      nodeBuiltins(),
      commonjs({
        // non-CommonJS modules will be ignored, but you can also
        // specifically include/exclude files
        include: ['../../node_modules/**', './node_modules/**'],  // Default: undefined
      })
    ]
  };
}

let config = configGen();

let configProduction = configGen();
configProduction.output.file = 'dist/web/buttplug.min.js';
configProduction.plugins.push(terser({
  sourcemap: true,
  mangle: {
    keep_classnames: true,
    keep_fnames: true
  },
  compress: {
    keep_fnames: true,
    keep_classnames: true,
  }
}));

module.exports = [config, configProduction];
