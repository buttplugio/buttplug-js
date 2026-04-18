// Buttplug TypeScript - Complete Application Example
//
// This is a complete, working example that demonstrates the full workflow
// of a Buttplug application. If you're new to Buttplug, start here!
//
// Prerequisites:
// 1. Install Intiface Central: https://intiface.com/central
// 2. Start the server in Intiface Central (click "Start Server")
// 3. Run: npx ts-node --esm application-example.ts

import {
  ButtplugClient,
  ButtplugNodeWebsocketClientConnector,
  ButtplugClientDevice,
  ButtplugClientConnectorException,
  ButtplugDeviceError,
  ButtplugError,
  DeviceOutput,
  OutputType,
  InputType,
} from 'buttplug';
import * as readline from 'readline';

function createReadlineInterface(): readline.Interface {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

async function waitForEnter(prompt: string): Promise<void> {
  const rl = createReadlineInterface();
  return new Promise((resolve) => {
    rl.question(prompt, () => {
      rl.close();
      resolve();
    });
  });
}

async function prompt(question: string): Promise<string> {
  const rl = createReadlineInterface();
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function main(): Promise<void> {
  console.log('===========================================');
  console.log('  Buttplug TypeScript Application Example');
  console.log('===========================================\n');

  // Step 1: Create a client
  // The client name identifies your application to the server.
  const client = new ButtplugClient('My Buttplug Application');

  // Step 2: Set up event handlers
  // Always do this BEFORE connecting to avoid missing events.
  client.addListener('deviceadded', (device: ButtplugClientDevice) => {
    console.log(`[+] Device connected: ${device.name}`);
  });

  client.addListener('deviceremoved', (device: ButtplugClientDevice) => {
    console.log(`[-] Device disconnected: ${device.name}`);
  });

  client.addListener('disconnect', () => {
    console.log('[!] Server connection lost!');
  });

  // Step 3: Connect to the server
  console.log('Connecting to Intiface Central...');
  try {
    const connector = new ButtplugNodeWebsocketClientConnector(
      'ws://127.0.0.1:12345'
    );
    await client.connect(connector);
  } catch (e) {
    if (e instanceof ButtplugClientConnectorException) {
      console.log('ERROR: Could not connect to Intiface Central!');
      console.log(
        'Make sure Intiface Central is running and the server is started.'
      );
      console.log('Default address: ws://127.0.0.1:12345');
      return;
    }
    throw e;
  }
  console.log('Connected!\n');

  // Step 4: Scan for devices
  console.log('Scanning for devices...');
  console.log('Turn on your Bluetooth/USB devices now.\n');
  await client.startScanning();

  // Wait for devices
  await waitForEnter('Press Enter when your devices are connected...');
  await client.stopScanning();

  // Step 5: Check what devices we found
  const devices = Array.from(client.devices.values());
  if (devices.length === 0) {
    console.log('No devices found. Make sure your device is:');
    console.log('  - Turned on');
    console.log('  - In pairing/discoverable mode');
    console.log('  - Supported by Buttplug (check https://iostindex.com)');
    await client.disconnect();
    return;
  }

  console.log(`\nFound ${devices.length} device(s):\n`);

  // Step 6: Display device capabilities
  for (const device of devices) {
    console.log(`  ${device.name}`);

    // Check output capabilities (things we can make the device do)
    const outputs: string[] = [];
    if (device.hasOutput(OutputType.Vibrate)) outputs.push('Vibrate');
    if (device.hasOutput(OutputType.Rotate)) outputs.push('Rotate');
    if (device.hasOutput(OutputType.Oscillate)) outputs.push('Oscillate');
    if (device.hasOutput(OutputType.Position)) outputs.push('Position');
    if (device.hasOutput(OutputType.Constrict)) outputs.push('Constrict');

    if (outputs.length > 0) {
      console.log(`    Outputs: ${outputs.join(', ')}`);
    }

    // Check input capabilities (sensors we can read)
    const inputs: string[] = [];
    if (device.hasInput(InputType.Battery)) inputs.push('Battery');
    if (device.hasInput(InputType.RSSI)) inputs.push('RSSI');
    if (device.hasInput(InputType.Button)) inputs.push('Button');
    if (device.hasInput(InputType.Pressure)) inputs.push('Pressure');

    if (inputs.length > 0) {
      console.log(`    Inputs: ${inputs.join(', ')}`);
    }

    console.log();
  }

  // Step 7: Interactive device control
  console.log('=== Interactive Control ===');
  console.log('Commands:');
  console.log('  v <0-100>  - Vibrate all devices at percentage');
  console.log('  s          - Stop all devices');
  console.log('  b          - Read battery levels');
  console.log('  q          - Quit\n');

  let running = true;
  while (running) {
    const input = (await prompt('> ')).trim().toLowerCase();

    if (!input) continue;

    try {
      if (input.startsWith('v ')) {
        // Vibrate command
        const percentStr = input.slice(2);
        const percent = parseInt(percentStr, 10);
        if (!isNaN(percent) && percent >= 0 && percent <= 100) {
          const intensity = percent / 100.0;
          for (const device of devices) {
            if (device.hasOutput(OutputType.Vibrate)) {
              await device.runOutput(DeviceOutput.Vibrate.percent(intensity));
              console.log(`  ${device.name}: vibrating at ${percent}%`);
            }
          }
        } else {
          console.log('  Usage: v <0-100>');
        }
      } else if (input === 's') {
        // Stop all devices
        await client.stopAllDevices();
        console.log('  All devices stopped.');
      } else if (input === 'b') {
        // Read battery levels
        for (const device of devices) {
          if (device.hasInput(InputType.Battery)) {
            const battery = await device.battery();
            console.log(`  ${device.name}: ${(battery * 100).toFixed(0)}% battery`);
          } else {
            console.log(`  ${device.name}: no battery sensor`);
          }
        }
      } else if (input === 'q') {
        running = false;
      } else {
        console.log('  Unknown command. Use v, s, b, or q.');
      }
    } catch (e) {
      if (e instanceof ButtplugDeviceError) {
        console.log(`  Device error: ${e.message}`);
      } else if (e instanceof ButtplugError) {
        console.log(`  Error: ${e.message}`);
      } else {
        throw e;
      }
    }
  }

  // Step 8: Clean up
  console.log('\nStopping devices and disconnecting...');
  await client.stopAllDevices();
  await client.disconnect();
  console.log('Goodbye!');
}

main().catch(console.error);
