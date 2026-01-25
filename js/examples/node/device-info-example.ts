// Buttplug TypeScript - Device Info Example
//
// This example demonstrates how to introspect device features
// and capabilities in detail.
//
// Prerequisites:
// 1. Install Intiface Central: https://intiface.com/central
// 2. Start the server in Intiface Central
// 3. Run: npx ts-node --esm device-info-example.ts

import {
  ButtplugClient,
  ButtplugNodeWebsocketClientConnector,
  ButtplugClientDevice,
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

function printDeviceInfo(device: ButtplugClientDevice): void {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`Device: ${device.name}`);
  if (device.displayName) {
    console.log(`Display Name: ${device.displayName}`);
  }
  console.log(`Index: ${device.index}`);
  if (device.messageTimingGap !== undefined) {
    console.log(`Message Timing Gap: ${device.messageTimingGap}ms`);
  }
  console.log(`${'='.repeat(50)}`);

  // Collect output capabilities
  const outputTypes: string[] = [];
  if (device.hasOutput(OutputType.Vibrate)) outputTypes.push('Vibrate');
  if (device.hasOutput(OutputType.Rotate)) outputTypes.push('Rotate');
  if (device.hasOutput(OutputType.Oscillate)) outputTypes.push('Oscillate');
  if (device.hasOutput(OutputType.Position)) outputTypes.push('Position');
  if (device.hasOutput(OutputType.Constrict)) outputTypes.push('Constrict');
  if (device.hasOutput(OutputType.Inflate)) outputTypes.push('Inflate');
  if (device.hasOutput(OutputType.Temperature)) outputTypes.push('Temperature');
  if (device.hasOutput(OutputType.Led)) outputTypes.push('LED');

  if (outputTypes.length > 0) {
    console.log(`\nOutput Capabilities: ${outputTypes.join(', ')}`);
  }

  // Collect input capabilities
  const inputTypes: string[] = [];
  if (device.hasInput(InputType.Battery)) inputTypes.push('Battery');
  if (device.hasInput(InputType.RSSI)) inputTypes.push('RSSI');
  if (device.hasInput(InputType.Button)) inputTypes.push('Button');
  if (device.hasInput(InputType.Pressure)) inputTypes.push('Pressure');

  if (inputTypes.length > 0) {
    console.log(`Input Capabilities: ${inputTypes.join(', ')}`);
  }

  // Detailed feature breakdown
  console.log('\nDetailed Features:');
  for (const [index, feature] of device.features) {
    // Access the underlying feature definition
    const def = (feature as any)._feature;
    console.log(`\n  Feature ${index}: ${def.FeatureDescriptor}`);

    if (def.Output) {
      console.log('    Outputs:');
      for (const [type, config] of Object.entries(def.Output)) {
        const cfg = config as { Value: number[] };
        console.log(
          `      - ${type}: steps ${cfg.Value[0]}-${cfg.Value[1]}`
        );
      }
    }

    if (def.Input) {
      console.log('    Inputs:');
      for (const [type, config] of Object.entries(def.Input)) {
        const cfg = config as { Value: number[]; Command: string[] };
        console.log(
          `      - ${type}: commands [${cfg.Command.join(', ')}]`
        );
      }
    }
  }
}

async function main(): Promise<void> {
  const client = new ButtplugClient('Device Info Example');

  // Connect
  const connector = new ButtplugNodeWebsocketClientConnector(
    'ws://127.0.0.1:12345'
  );

  console.log('Connecting...');
  await client.connect(connector);
  console.log('Connected! Scanning for devices...');

  await client.startScanning();
  await waitForEnter('Turn on your devices, then press Enter...');
  await client.stopScanning();

  // Display info for all connected devices
  if (client.devices.size === 0) {
    console.log('No devices found.');
  } else {
    console.log(`\nFound ${client.devices.size} device(s):`);
    for (const [_, device] of client.devices) {
      printDeviceInfo(device);
    }
  }

  await waitForEnter('\nPress Enter to disconnect...');
  await client.disconnect();
  console.log('Disconnected.');
}

main().catch(console.error);
