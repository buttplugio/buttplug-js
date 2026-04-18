# Buttplug JS

This repo contains:

- **buttplug-js**: A pure TypeScript/JavaScript implementation of a Buttplug Client. Use this to
  connect to Buttplug Servers like [Intiface Central](https://intiface.com/central) or the
  Buttplug WASM Server.

## Looking for buttplug-wasm?

The WASM package (`buttplug-wasm`) has moved to the [buttplug](https://github.com/buttplugio/buttplug)
monorepo. It lives in `wasm/` at the repo root and is built from `crates/buttplug_wasm`.

Install it as:

```
npm install buttplug-wasm
```

or build from source:

```bash
# Build the Rust WASM crate
wasm-pack build --target web crates/buttplug_wasm

# Build the TypeScript wrapper
cd wasm && npm install && npm run build:web
```
