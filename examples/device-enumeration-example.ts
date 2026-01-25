// Buttplug TypeScript - Device Enumeration Example
//
// This example demonstrates how to scan for devices and handle
// device connection/disconnection events.
//
// Prerequisites:
// 1. Install Intiface Central: https://intiface.com/central
// 2. Start the server in Intiface Central
// 3. Run: npx ts-node --esm device-enumeration-example.ts

import {
  ButtplugClient,
  ButtplugNodeWebsocketClientConnector,
  ButtplugClientDevice,
} from 'buttplug';
import * as readline from 'readline';

async function waitForEnter(prompt: string): Promise<void> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(prompt, () => {
      rl.close();
      resolve();
    });
  });
}

async function main(): Promise<void> {
  const client = new ButtplugClient('Device Enumeration Example');

  // Set up event handlers BEFORE connecting.
  // This ensures we don't miss any events.

  client.addListener('deviceadded', (device: ButtplugClientDevice) => {
    console.log(`Device connected: ${device.name}`);
  });

  client.addListener('deviceremoved', (device: ButtplugClientDevice) => {
    console.log(`Device disconnected: ${device.name}`);
  });

  client.addListener('scanningfinished', () => {
    console.log('Scanning finished.');
  });

  // Connect to the server
  const connector = new ButtplugNodeWebsocketClientConnector(
    'ws://127.0.0.1:12345'
  );

  console.log('Connecting...');
  await client.connect(connector);
  console.log('Connected!');

  // Start scanning for devices.
  // Devices will be announced via the 'deviceadded' event.
  console.log('\nStarting device scan...');
  console.log('Turn on your devices now!');
  await client.startScanning();

  await waitForEnter('\nPress Enter to stop scanning...');

  // Stop scanning. Some protocols scan continuously until told to stop.
  await client.stopScanning();

  // The client maintains a map of all known devices.
  // This map persists even after scanning stops.
  console.log('\nCurrently connected devices:');
  if (client.devices.size === 0) {
    console.log('  (no devices connected)');
  } else {
    for (const [index, device] of client.devices) {
      console.log(`  - ${device.name} (Index: ${index})`);
    }
  }

  await waitForEnter('\nPress Enter to disconnect...');

  await client.disconnect();
  console.log('Disconnected.');
}

main().catch(console.error);
