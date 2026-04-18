// Buttplug TypeScript - Remote Connector Example
//
// This example demonstrates the explicit WebSocket connector setup.
// While you can create a connector inline, creating it explicitly
// gives you more control over the connection parameters.
//
// Prerequisites:
// 1. Install Intiface Central: https://intiface.com/central
// 2. Start the server in Intiface Central
// 3. Run: npx ts-node --esm remote-connector-example.ts

import {
  ButtplugClient,
  ButtplugNodeWebsocketClientConnector,
  ButtplugBrowserWebsocketClientConnector,
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
  // Method 1: Inline connector creation (most common)
  // This is the simplest approach for most applications.
  console.log('Method 1: Inline connector creation');
  console.log('  const connector = new ButtplugNodeWebsocketClientConnector(url);');
  console.log('  await client.connect(connector);');
  console.log('  (Simple and direct)\n');

  // Method 2: Explicit connector creation
  // Use this when you need to reuse the connector or
  // configure it before connecting.
  console.log('Method 2: Explicit connector creation');
  console.log('  const connector = new ButtplugNodeWebsocketClientConnector(url);');
  console.log('  // ... configure connector if needed ...');
  console.log('  await client.connect(connector);');
  console.log('  (More control over connector lifecycle)\n');

  // Note about environments:
  // - Node.js: Use ButtplugNodeWebsocketClientConnector (uses 'ws' package)
  // - Browser: Use ButtplugBrowserWebsocketClientConnector (uses native WebSocket)
  console.log('Environment-specific connectors:');
  console.log('  - Node.js: ButtplugNodeWebsocketClientConnector');
  console.log('  - Browser: ButtplugBrowserWebsocketClientConnector\n');

  // Let's actually connect using the explicit connector method
  const client = new ButtplugClient('Remote Connector Example');
  const connector = new ButtplugNodeWebsocketClientConnector(
    'ws://127.0.0.1:12345'
  );

  console.log('Connecting using explicit connector...');
  try {
    await client.connect(connector);
    console.log('Connected successfully!');
    console.log(`  Connected: ${client.connected}`);

    await waitForEnter('\nPress Enter to disconnect...');

    await client.disconnect();
    console.log('Disconnected.');
  } catch (e) {
    if (e instanceof Error) {
      console.log(`Connection failed: ${e.message}`);
    }
    console.log(
      '\nMake sure Intiface Central is running with the server started.'
    );
  }

  await waitForEnter('\nPress Enter to exit...');
}

main().catch(console.error);
