import typescript from 'rollup-plugin-typescript2';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import nodeBuiltins from 'rollup-plugin-node-builtins';
import autoExternal from 'rollup-plugin-auto-external';
import rollupHtml from 'rollup-plugin-html';
import nodeGlobals from 'rollup-plugin-node-globals';
import postCss from 'rollup-plugin-postcss';

// Generate our base config object out of a function return, so we don't have to
// worry about doing copies/clones.
function configGen() {
  return {
    input: 'src/index.ts',
    moduleContext: {
      [require.resolve('@tweenjs/tween.js')]: 'window'
    },
    output: {
      file: 'dist/web/buttplug.devtools.js',
      format: 'iife',
      name: "ButtplugDevTools",
      globals: { "buttplug": "Buttplug" }
    },
    plugins: [
      nodeResolve({
        jsnext: true,
        main: true,
        extensions: [ '.ts', '.js', '.json' ],
        browser: true
      }),
      postCss(),
      typescript({ tsconfigOverride: { compilerOptions: { module: "ES2015" } } }),
      json(),
      nodeBuiltins(),
      nodeGlobals(),
      commonjs({
        include: ['../../node_modules/**', './node_modules/**', "../buttplug/dist/main/src/**"],
        namedExports: {
          '../buttplug/dist/main/src/index.js': [ 'ButtplugLogger', 'ButtplugLogLevel', 'TestDeviceSubtypeManager' ],
          '../../node_modules/@tweenjs/tween.js/src/Tween.js': [ 'TWEEN', 'Tween' ]
        }
      }),
      autoExternal({
        dependencies: false,
        peerDependencies: true
      }),
      rollupHtml()
    ]
  };
}

let config = configGen();

let configProduction = configGen();
configProduction.output.file = 'dist/web/buttplug.devtools.min.js';
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
