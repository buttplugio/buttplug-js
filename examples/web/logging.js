// Buttplug Web - Logging Example
//
// This example demonstrates basic connection with console logging.
//
// Include Buttplug via CDN:
// <script src="https://cdn.jsdelivr.net/npm/buttplug@4.0.0/dist/web/buttplug.min.js"></script>

async function runLoggingExample() {
  console.log("Logging Example - Connecting with verbose logging");

  const connector = new Buttplug.ButtplugBrowserWebsocketClientConnector("ws://127.0.0.1:12345");
  const client = new Buttplug.ButtplugClient("Logging Example");

  // Set up all event listeners to log activity
  client.addListener("deviceadded", (device) => {
    console.log(`[LOG] Device added: ${device.name}`);
  });

  client.addListener("deviceremoved", (device) => {
    console.log(`[LOG] Device removed: ${device.name}`);
  });

  client.addListener("scanningfinished", () => {
    console.log("[LOG] Scanning finished");
  });

  client.addListener("disconnect", () => {
    console.log("[LOG] Disconnected from server");
  });

  try {
    console.log("[LOG] Connecting...");
    await client.connect(connector);
    console.log("[LOG] Connected successfully!");

    // Disconnect after brief demo
    await client.disconnect();
    console.log("[LOG] Disconnected.");
  } catch (ex) {
    console.log("[LOG] Connection error:", ex);
  }
}
