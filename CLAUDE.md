# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repo contains the Buttplug JS client:

- **js/** - `buttplug` package: Pure TypeScript client implementation for connecting to Buttplug servers (Intiface Central, Intiface Engine, or the WASM server)

> **Note**: The `buttplug-wasm` package has moved to the [buttplug](https://github.com/buttplugio/buttplug) monorepo (`wasm/` directory, built from `crates/buttplug_wasm`). Do not add wasm-related code here.

## Build Commands

```bash
cd js
yarn install
yarn build          # Full build (clean, main, web)
yarn build:main     # TypeScript compilation only
yarn build:web      # Vite web bundle
yarn test           # Run Jest tests
yarn test tests/test-client.ts  # Single test file
```

## Architecture

### JS Client Structure (js/src/)

The client implements the Buttplug protocol v4 specification:

- **client/** - Core client classes
  - `ButtplugClient` - Main entry point. Extends EventEmitter, manages connection, device discovery, and message routing
  - `ButtplugClientDevice` - Device abstraction with features map. Created from `DeviceInfo` messages
  - `ButtplugClientDeviceFeature` - Individual device feature (vibrator, rotator, etc.) with input/output handling
  - `ButtplugClientDeviceCommand` - Fluent API for device commands: `DeviceOutput.Vibrate.percent(0.5)`
  - `IButtplugClientConnector` - Interface for transport implementations
  - `ButtplugBrowserWebsocketClientConnector` - Browser WebSocket transport
  - `ButtplugNodeWebsocketClientConnector` - Node.js WebSocket transport (uses `ws` package)

- **core/** - Protocol types and utilities
  - `Messages` - All Buttplug protocol message types as TypeScript interfaces
  - `Exceptions` - Custom error types (ButtplugDeviceError, ButtplugMessageError, etc.)
  - `Logging` - Logging infrastructure

- **utils/** - Shared utilities
  - `ButtplugMessageSorter` - Correlates request/response messages by ID
  - `ButtplugBrowserWebsocketConnector` - Base WebSocket implementation

### Message Flow

1. Client connects via connector (`IButtplugClientConnector`)
2. Handshake: `RequestServerInfo` → `ServerInfo`
3. Device discovery: `StartScanning` → `DeviceList` events → `ButtplugClientDevice` instances
4. Device control: Commands go through `ButtplugClientDeviceFeature.runOutput()` → `OutputCmd` messages
5. Message correlation handled by `ButtplugMessageSorter` (assigns IDs, resolves promises)

## Protocol Details

Protocol version 4 (see `MESSAGE_SPEC_VERSION_MAJOR/MINOR` in Messages.ts):
- Devices have indexed features with typed inputs (Battery, RSSI, Button, Pressure) and outputs (Vibrate, Rotate, Position, etc.)
- Output commands use `DeviceOutput` fluent builder: `DeviceOutput.Vibrate.percent(0.5)` or `.steps(10)`
- Position with duration: `DeviceOutput.PositionWithDuration.percent(0.8, 500)`

## Node vs Browser

- Browser: Use `ButtplugBrowserWebsocketClientConnector`
- Node: Use `ButtplugNodeWebsocketClientConnector` (imports `ws` package)
- For WASM/WebBluetooth use: install `buttplug-wasm` from the buttplug monorepo

## Output Formats

The JS build produces:
- `dist/main/` - CommonJS for Node
- `dist/web/buttplug.js` - UMD bundle (namespace: `buttplug`)
- `dist/web/buttplug.mjs` - ES Module
