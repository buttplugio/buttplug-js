// Buttplug Web - Error Handling Example
//
// This example demonstrates the different error types in Buttplug
// and how to handle them. This is a reference for error handling patterns.
//
// Include Buttplug via CDN:
// <script src="https://cdn.jsdelivr.net/npm/buttplug@4.0.0/dist/web/buttplug.min.js"></script>

// All Buttplug errors inherit from ButtplugError.
// Here's the hierarchy:
//
// ButtplugError (base class)
// +-- ButtplugClientConnectorException - Connection/transport issues
// +-- ButtplugInitError                - Client/server version mismatch
// +-- ButtplugDeviceError              - Device communication errors
// +-- ButtplugMessageError             - Invalid message format/content
// +-- ButtplugPingError                - Server ping timeout

function handleButtplugError(e) {
  if (e instanceof Buttplug.ButtplugClientConnectorException) {
    // The connector couldn't establish or maintain connection.
    // Causes: server not running, wrong address, network issues,
    // SSL/TLS problems, connection dropped.
    console.log(`[Connector Error] ${e.message}`);
    console.log("Check that the server is running and accessible.");
  } else if (e instanceof Buttplug.ButtplugInitError) {
    // Client and server couldn't agree on protocol version.
    // Usually means you need to upgrade client or server.
    console.log(`[Init/Handshake Error] ${e.message}`);
    console.log("Client and server versions may be incompatible.");
  } else if (e instanceof Buttplug.ButtplugDeviceError) {
    // Something went wrong communicating with a device.
    // Causes: device disconnected, invalid command for device,
    // device rejected command, hardware error.
    console.log(`[Device Error] ${e.message}`);
    console.log("The device may have disconnected or doesn't support this command.");
  } else if (e instanceof Buttplug.ButtplugMessageError) {
    // The message sent was invalid.
    // Causes: malformed message, missing required fields,
    // invalid parameter values.
    console.log(`[Message Error] ${e.message}`);
    console.log("This usually indicates a bug in the client library or application.");
  } else if (e instanceof Buttplug.ButtplugPingError) {
    // Server didn't receive ping in time, connection terminated.
    // The ping system ensures dead connections are detected.
    console.log(`[Ping Error] ${e.message}`);
    console.log("Connection was lost due to ping timeout.");
  } else if (e instanceof Buttplug.ButtplugError) {
    // Unknown or future error type
    console.log(`[Buttplug Error] ${e.message}`);
  } else if (e instanceof Error) {
    // Non-Buttplug error
    console.log(`[System Error] ${e.message}`);
  } else {
    console.log(`[Unknown Error] ${e}`);
  }
}

async function runErrorExample() {
  console.log("Error Handling Example");
  console.log("======================\n");

  // Example 1: Connection error (server not running on wrong port)
  console.log("1. Attempting to connect to non-existent server...");
  const client1 = new Buttplug.ButtplugClient("Error Example");
  try {
    const badConnector = new Buttplug.ButtplugBrowserWebsocketClientConnector("ws://127.0.0.1:99999");
    await client1.connect(badConnector);
  } catch (e) {
    handleButtplugError(e);
  }

  // Example 2: Demonstrating promise-based error handling
  console.log("\n2. Demonstrating promise-based error handling...");
  const client2 = new Buttplug.ButtplugClient("Promise Error Example");
  const badConnector2 = new Buttplug.ButtplugBrowserWebsocketClientConnector("ws://127.0.0.1:99998");

  // You can also catch errors using .catch() on promises
  await client2
    .connect(badConnector2)
    .then(() => {
      console.log("Connected (unexpected!)");
    })
    .catch((e) => {
      console.log("Caught error using .catch():");
      handleButtplugError(e);
    });

  // Example 3: Using try/catch with async/await
  console.log("\n3. Using try/catch with async/await...");
  const client3 = new Buttplug.ButtplugClient("Async Error Example");
  const invalidConnector = new Buttplug.ButtplugBrowserWebsocketClientConnector("ws://notadomain.local");

  try {
    await client3.connect(invalidConnector);
  } catch (e) {
    // Check for specific Buttplug error types
    console.log(`Error: ${e}`);
    if (e instanceof Buttplug.ButtplugError) {
      console.log("This is a Buttplug-specific error.");
      if (e instanceof Buttplug.ButtplugClientConnectorException) {
        console.log("Specifically, it's a connector error.");
      }
    } else {
      console.log("This is a non-Buttplug error (system/network level).");
    }
  }

  console.log("\nError handling example complete.");
}
