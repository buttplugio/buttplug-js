// Buttplug Web - Remote Websocket Connector Example
//
// This example demonstrates how to connect to a remote Buttplug server
// using the websocket connector. This is the standard way to connect
// from a browser to Intiface Central.
//
// Include Buttplug via CDN:
// <script src="https://cdn.jsdelivr.net/npm/buttplug@4.0.0/dist/web/buttplug.min.js"></script>

const runWebsocketConnectionExample = async () => {
  // This is the default insecure address for Intiface Central (https://intiface.com/central).
  // You can connect to it via most browsers.
  const address = "ws://localhost:12345";

  // Create the connector with the server address
  const connector = new Buttplug.ButtplugBrowserWebsocketClientConnector(address);
  const client = new Buttplug.ButtplugClient("Websocket Connection Example");

  // Set up disconnect handler before connecting
  client.addListener("disconnect", () => {
    console.log("Server connection lost!");
  });

  // Now we connect. If anything goes wrong here, we'll either throw:
  //
  // - A ButtplugClientConnectorException if there's a problem with
  //   the connector, like the network address being wrong, server not
  //   being up, etc.
  // - A ButtplugInitError if there is a client/server version mismatch.
  try {
    console.log(`Connecting to ${address}...`);
    await client.connect(connector);
  } catch (ex) {
    // If our connection failed, because the server wasn't turned on, SSL/TLS
    // wasn't turned off, etc, we'll just print and exit here.
    //
    // This could also mean our client is newer than our server, and we need to
    // upgrade the server we're connecting to.
    console.log("Connection failed:", ex);
    return;
  }

  // We're connected!
  console.log("Connected!");
  console.log("Connection will disconnect automatically in 3 seconds...");

  // Demonstrate we can use the connection
  await client.startScanning();
  console.log("Scanning for devices...");

  // Disconnect after a delay
  setTimeout(async () => {
    console.log("Stopping scan...");
    await client.stopScanning();

    // Show any devices that were found
    if (client.devices.size > 0) {
      console.log("Devices found:");
      for (const [index, device] of client.devices) {
        console.log(`  - ${device.name} (Index: ${index})`);
      }
    }

    console.log("Disconnecting...");
    await client.disconnect();
    console.log("Disconnected.");
  }, 3000);
};
