// Buttplug Web - Async Patterns Example
//
// This example demonstrates async/await patterns and event handling
// in the Buttplug library. The library is fully async - all operations
// that might block (network, device communication) use async/await.
//
// Include Buttplug via CDN:
// <script src="https://cdn.jsdelivr.net/npm/buttplug@4.0.0/dist/web/buttplug.min.js"></script>

async function runAsyncExample() {
  console.log("Running async example");

  const client = new Buttplug.ButtplugClient("Async Example");

  // Events in buttplug-js use EventEmitter3.
  // You can use addListener or on to subscribe to events.

  // 'deviceadded' is fired when a new device connects
  client.addListener("deviceadded", async (device) => {
    // Note: Event handlers can be async!
    console.log(`[Event] Device added: ${device.name}`);

    // You can interact with the device in the event handler
    if (device.hasOutput(Buttplug.OutputType.Vibrate)) {
      console.log("  Sending welcome vibration...");
      await device.runOutput(Buttplug.DeviceOutput.Vibrate.percent(0.25));
      await new Promise(r => setTimeout(r, 200));
      await device.stop();
    }
  });

  // 'deviceremoved' is fired when a device disconnects
  client.addListener("deviceremoved", (device) => {
    console.log(`[Event] Device removed: ${device.name}`);
  });

  // 'scanningfinished' is fired when scanning completes
  // (some protocols scan continuously until stopped)
  client.addListener("scanningfinished", () => {
    console.log("[Event] Scanning finished");
  });

  // 'disconnect' is fired when the server connection drops
  client.addListener("disconnect", () => {
    console.log("[Event] Server disconnected!");
  });

  // 'inputreading' is fired when subscribed sensor data arrives
  client.addListener("inputreading", (reading) => {
    console.log(`[Event] Input reading: ${JSON.stringify(reading)}`);
  });

  // Connect asynchronously - this may take time due to network
  console.log("Connecting to server...");
  const connector = new Buttplug.ButtplugBrowserWebsocketClientConnector("ws://127.0.0.1:12345");
  await client.connect(connector);
  console.log("Connected!");

  // Scanning is also async - we start it and wait for events
  console.log("Starting scan. Turn on devices now...");
  console.log("(Events will be printed as devices connect)");
  await client.startScanning();

  // Demonstrate concurrent operations after 5 seconds
  setTimeout(async () => {
    console.log("\nDemonstrating concurrent device control...");

    // Convert devices Map to array
    const devices = Array.from(client.devices.values());

    if (devices.length > 0) {
      // Send commands to all devices concurrently
      const tasks = devices
        .filter((d) => d.hasOutput(Buttplug.OutputType.Vibrate))
        .map(async (device) => {
          console.log(`  Vibrating ${device.name}...`);
          await device.runOutput(Buttplug.DeviceOutput.Vibrate.percent(0.5));
          await new Promise(r => setTimeout(r, 500));
          await device.stop();
          console.log(`  ${device.name} stopped.`);
        });

      // Wait for all commands to complete
      await Promise.all(tasks);
      console.log("All devices stopped.");
    } else {
      console.log("No devices connected.");
    }
  }, 5000);
}
