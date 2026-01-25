// Buttplug Web - Device Enumeration Example
//
// This example demonstrates how to scan for devices and handle
// device connection/disconnection events.
//
// Include Buttplug via CDN:
// <script src="https://cdn.jsdelivr.net/npm/buttplug@4.0.0/dist/web/buttplug.min.js"></script>

async function runDeviceEnumerationExample() {
  const client = new Buttplug.ButtplugClient("Device Enumeration Example");

  // Set up event handlers BEFORE connecting.
  // This ensures we don't miss any events, including devices
  // that are already connected to the server.

  client.addListener("deviceadded", (device) => {
    console.log(`Device connected: ${device.name}`);

    // The client maintains a Map of all known devices.
    // In v4, client.devices is a Map<number, ButtplugClientDevice>
    console.log("Currently connected devices:");
    for (const [index, dev] of client.devices) {
      console.log(`  - ${dev.name} (Index: ${index})`);
    }
  });

  client.addListener("deviceremoved", (device) => {
    console.log(`Device disconnected: ${device.name}`);
  });

  client.addListener("scanningfinished", () => {
    console.log("Scanning finished.");
  });

  // Connect to the server (requires Intiface Central running)
  const connector = new Buttplug.ButtplugBrowserWebsocketClientConnector("ws://localhost:12345");

  console.log("Connecting...");
  await client.connect(connector);
  console.log("Connected!");

  // Start scanning for devices.
  // Devices will be announced via the 'deviceadded' event.
  console.log("Starting device scan... Turn on your devices now!");
  await client.startScanning();

  // Note: In a real application, you would call client.stopScanning()
  // when you're done scanning, and client.disconnect() when finished.
}
