// Buttplug TypeScript - Connection Example
//
// This example demonstrates how to connect to a Buttplug server
// (like Intiface Central) and handle connection errors.
//
// Prerequisites:
// 1. Install Intiface Central: https://intiface.com/central
// 2. Start the server in Intiface Central
// 3. Run: npx ts-node --esm connection-example.ts

import {
  ButtplugClient,
  ButtplugNodeWebsocketClientConnector,
  ButtplugClientConnectorException,
  ButtplugError,
  ButtplugInitError,
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
  // Create a client with your application's name.
  // This name will be shown in Intiface Central.
  const client = new ButtplugClient('Connection Example');

  try {
    // Create a connector to the server. Default port for Intiface Central is 12345.
    const connector = new ButtplugNodeWebsocketClientConnector(
      'ws://127.0.0.1:12345'
    );

    console.log('Connecting to Intiface Central...');
    await client.connect(connector);

    // We're connected!
    console.log('Connected! Check Intiface Central for the client name.');
    await waitForEnter('Press Enter to disconnect...');

    // Disconnect cleanly
    await client.disconnect();
    console.log('Disconnected.');
  } catch (e) {
    if (e instanceof ButtplugClientConnectorException) {
      // Connection failed - server not running, wrong address, network issues, etc.
      console.log(`Can't connect to server: ${e.message}`);
      console.log(
        'Make sure Intiface Central is running and the server is started.'
      );
    } else if (e instanceof ButtplugInitError) {
      // Client/server version mismatch - need to upgrade one or the other
      console.log(`Handshake failed: ${e.message}`);
      console.log('Client and server versions may be incompatible.');
    } else if (e instanceof ButtplugError) {
      // Other Buttplug-specific errors
      console.log(`Buttplug error: ${e.message}`);
    } else {
      throw e;
    }
  }

  await waitForEnter('Press Enter to exit...');
}

main().catch(console.error);
