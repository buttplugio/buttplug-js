// Buttplug TypeScript - Device Control Example
//
// This example demonstrates how to send commands to devices,
// query device capabilities, and use the command builder API.
//
// Prerequisites:
// 1. Install Intiface Central: https://intiface.com/central
// 2. Start the server in Intiface Central
// 3. Run: npx ts-node --esm device-control-example.ts

import {
  ButtplugClient,
  ButtplugNodeWebsocketClientConnector,
  ButtplugClientDevice,
  DeviceOutput,
  OutputType,
  InputType,
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
  const client = new ButtplugClient('Device Control Example');

  // Connect and scan for devices
  const connector = new ButtplugNodeWebsocketClientConnector(
    'ws://127.0.0.1:12345'
  );

  console.log('Connecting...');
  await client.connect(connector);
  console.log('Connected! Scanning for devices...');

  await client.startScanning();
  await waitForEnter('Turn on a device, then press Enter...');
  await client.stopScanning();

  // Check if we have any devices
  if (client.devices.size === 0) {
    console.log('No devices found. Exiting.');
    await client.disconnect();
    return;
  }

  // Get the first device
  const device: ButtplugClientDevice = client.devices.values().next().value!;
  console.log(`\nUsing device: ${device.name}`);

  // Show what output types this device supports
  console.log('\nSupported output types:');
  for (const [index, feature] of device.features) {
    const def = (feature as any)._feature;
    if (def.Output) {
      for (const outputType of Object.keys(def.Output)) {
        console.log(
          `  - ${outputType} (Feature ${index}: ${def.FeatureDescriptor})`
        );
      }
    }
  }

  // Check for vibration support and demonstrate commands
  if (device.hasOutput(OutputType.Vibrate)) {
    console.log('\nDevice supports vibration.');

    // Use the command builder API
    console.log('Vibrating at 50% using command builder...');
    await device.runOutput(DeviceOutput.Vibrate.percent(0.5));
    await delay(1000);

    console.log('Vibrating at 75%...');
    await device.runOutput(DeviceOutput.Vibrate.percent(0.75));
    await delay(1000);

    console.log('Vibrating at 25%...');
    await device.runOutput(DeviceOutput.Vibrate.percent(0.25));
    await delay(1000);

    // Stop the device
    console.log('Stopping device...');
    await device.stop();
  } else {
    console.log('\nDevice does not support vibration.');
  }

  // Demonstrate other output types if available
  if (device.hasOutput(OutputType.Rotate)) {
    console.log('\nDevice supports rotation. Rotating at 50%...');
    await device.runOutput(DeviceOutput.Rotate.percent(0.5));
    await delay(1000);
    await device.stop();
  }

  if (device.hasOutput(OutputType.Position)) {
    console.log('\nDevice supports position control. Moving to 100% over 500ms...');
    await device.runOutput(DeviceOutput.PositionWithDuration.percent(1.0, 500));
    await delay(1000);
    await device.runOutput(DeviceOutput.PositionWithDuration.percent(0.0, 500));
  }

  // Try reading battery level if supported
  if (device.hasInput(InputType.Battery)) {
    console.log('\nReading battery level...');
    const battery = await device.battery();
    console.log(`Battery: ${(battery * 100).toFixed(0)}%`);
  }

  await waitForEnter('\nPress Enter to disconnect...');

  // Disconnect - this automatically stops all devices
  await client.disconnect();
  console.log('Disconnected.');
}

main().catch(console.error);
