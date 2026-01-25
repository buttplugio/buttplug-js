// Buttplug TypeScript - Error Handling Example
//
// This example demonstrates the different error types in Buttplug
// and how to handle them. This is a reference for error handling patterns.
//
// Prerequisites:
// 1. Install Intiface Central: https://intiface.com/central
// 2. Start the server in Intiface Central
// 3. Run: npx ts-node --esm errors-example.ts

import {
  ButtplugClient,
  ButtplugNodeWebsocketClientConnector,
  ButtplugClientConnectorException,
  ButtplugError,
  ButtplugDeviceError,
  ButtplugInitError,
  ButtplugMessageError,
  ButtplugPingError,
  DeviceOutput,
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

// All Buttplug errors inherit from ButtplugError.
// Here's the hierarchy:
//
// ButtplugError (base class)
// +-- ButtplugClientConnectorException - Connection/transport issues
// +-- ButtplugInitError                - Client/server version mismatch
// +-- ButtplugDeviceError              - Device communication errors
// +-- ButtplugMessageError             - Invalid message format/content
// +-- ButtplugPingError                - Server ping timeout

function handleButtplugError(e: unknown): void {
  if (e instanceof ButtplugClientConnectorException) {
    // The connector couldn't establish or maintain connection.
    // Causes: server not running, wrong address, network issues,
    // SSL/TLS problems, connection dropped.
    console.log(`[Connector Error] ${e.message}`);
    console.log('Check that the server is running and accessible.');
  } else if (e instanceof ButtplugInitError) {
    // Client and server couldn't agree on protocol version.
    // Usually means you need to upgrade client or server.
    console.log(`[Init/Handshake Error] ${e.message}`);
    console.log('Client and server versions may be incompatible.');
  } else if (e instanceof ButtplugDeviceError) {
    // Something went wrong communicating with a device.
    // Causes: device disconnected, invalid command for device,
    // device rejected command, hardware error.
    console.log(`[Device Error] ${e.message}`);
    console.log(
      "The device may have disconnected or doesn't support this command."
    );
  } else if (e instanceof ButtplugMessageError) {
    // The message sent was invalid.
    // Causes: malformed message, missing required fields,
    // invalid parameter values.
    console.log(`[Message Error] ${e.message}`);
    console.log(
      'This usually indicates a bug in the client library or application.'
    );
  } else if (e instanceof ButtplugPingError) {
    // Server didn't receive ping in time, connection terminated.
    // The ping system ensures dead connections are detected.
    console.log(`[Ping Error] ${e.message}`);
    console.log('Connection was lost due to ping timeout.');
  } else if (e instanceof ButtplugError) {
    // Unknown or future error type
    console.log(`[Buttplug Error] ${e.message}`);
  } else if (e instanceof Error) {
    // Non-Buttplug error
    console.log(`[System Error] ${e.message}`);
  } else {
    console.log(`[Unknown Error] ${e}`);
  }
}

async function main(): Promise<void> {
  console.log('Error Handling Example');
  console.log('======================\n');

  // Example 1: Connection error (server not running)
  console.log('1. Attempting to connect to non-existent server...');
  const client1 = new ButtplugClient('Error Example');
  try {
    const badConnector = new ButtplugNodeWebsocketClientConnector(
      'ws://127.0.0.1:99999'
    );
    await client1.connect(badConnector);
  } catch (e) {
    handleButtplugError(e);
  }

  // Example 2: Demonstrating promise-based error handling
  console.log('\n2. Demonstrating promise-based error handling...');
  const client2 = new ButtplugClient('Promise Error Example');
  const badConnector2 = new ButtplugNodeWebsocketClientConnector(
    'ws://127.0.0.1:99998'
  );

  // You can also catch errors using .catch() on promises
  await client2
    .connect(badConnector2)
    .then(() => {
      console.log('Connected (unexpected!)');
    })
    .catch((e) => {
      console.log('Caught error using .catch():');
      handleButtplugError(e);
    });

  // Example 3: Handling errors when sending commands after disconnect
  console.log('\n3. Demonstrating error after disconnect...');
  const client3 = new ButtplugClient('Disconnect Error Example');
  try {
    const connector = new ButtplugNodeWebsocketClientConnector(
      'ws://127.0.0.1:12345'
    );
    await client3.connect(connector);
    console.log('Connected successfully.');

    // Scan briefly to get a device
    await client3.startScanning();
    await delay(1000);
    await client3.stopScanning();

    if (client3.devices.size > 0) {
      const device = client3.devices.values().next().value!;
      console.log(`Found device: ${device.name}`);

      // Disconnect
      await client3.disconnect();
      console.log('Disconnected.');

      // Now try to send a command - this will throw
      console.log('Attempting to send command after disconnect...');
      await device.runOutput(DeviceOutput.Vibrate.percent(0.5));
    } else {
      console.log('No devices found to test with.');
      await client3.disconnect();
    }
  } catch (e) {
    handleButtplugError(e);
  }

  await waitForEnter('\nPress Enter to exit...');
}

main().catch(console.error);
