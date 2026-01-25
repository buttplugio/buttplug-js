// Buttplug TypeScript - Async Patterns Example
//
// This example demonstrates async/await patterns and event handling
// in the Buttplug library. The library is fully async - all operations
// that might block (network, device communication) use async/await.
//
// Prerequisites:
// 1. Install Intiface Central: https://intiface.com/central
// 2. Start the server in Intiface Central
// 3. Run: npx ts-node --esm async-example.ts

import {
  ButtplugClient,
  ButtplugNodeWebsocketClientConnector,
  ButtplugClientDevice,
  DeviceOutput,
  OutputType,
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

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main(): Promise<void> {
  const client = new ButtplugClient('Async Example');

  // Events in buttplug-js use EventEmitter3.
  // You can use addListener or on to subscribe to events.

  // 'deviceadded' is fired when a new device connects
  client.addListener('deviceadded', async (device: ButtplugClientDevice) => {
    // Note: Event handlers can be async!
    console.log(`[Event] Device added: ${device.name}`);

    // You can interact with the device in the event handler
    if (device.hasOutput(OutputType.Vibrate)) {
      console.log('  Sending welcome vibration...');
      await device.runOutput(DeviceOutput.Vibrate.percent(0.25));
      await delay(200);
      await device.stop();
    }
  });

  // 'deviceremoved' is fired when a device disconnects
  client.addListener('deviceremoved', (device: ButtplugClientDevice) => {
    console.log(`[Event] Device removed: ${device.name}`);
  });

  // 'scanningfinished' is fired when scanning completes
  // (some protocols scan continuously until stopped)
  client.addListener('scanningfinished', () => {
    console.log('[Event] Scanning finished');
  });

  // 'disconnect' is fired when the server connection drops
  client.addListener('disconnect', () => {
    console.log('[Event] Server disconnected!');
  });

  // 'inputreading' is fired when subscribed sensor data arrives
  client.addListener('inputreading', (reading: unknown) => {
    console.log(`[Event] Input reading: ${JSON.stringify(reading)}`);
  });

  // Connect asynchronously - this may take time due to network
  console.log('Connecting to server...');
  const connector = new ButtplugNodeWebsocketClientConnector(
    'ws://127.0.0.1:12345'
  );
  await client.connect(connector);
  console.log('Connected!\n');

  // Scanning is also async - we start it and wait for events
  console.log('Starting scan. Turn on devices now...');
  console.log('(Events will be printed as devices connect)\n');
  await client.startScanning();

  // Wait for user input
  await waitForEnter('Press Enter to stop scanning...');
  await client.stopScanning();

  // Demonstrate concurrent operations
  console.log('\nDemonstrating concurrent device control...');
  const devices = Array.from(client.devices.values());

  if (devices.length > 0) {
    // Send commands to all devices concurrently
    const tasks = devices
      .filter((d) => d.hasOutput(OutputType.Vibrate))
      .map(async (device) => {
        console.log(`  Vibrating ${device.name}...`);
        await device.runOutput(DeviceOutput.Vibrate.percent(0.5));
        await delay(500);
        await device.stop();
        console.log(`  ${device.name} stopped.`);
      });

    // Wait for all commands to complete
    await Promise.all(tasks);
    console.log('All devices stopped.');
  } else {
    console.log('No devices connected.');
  }

  await waitForEnter('\nPress Enter to disconnect...');
  await client.disconnect();
  console.log('Disconnected.');
}

main().catch(console.error);
