// Buttplug Web - Ping Timeout Example
//
// This example demonstrates how to handle ping timeouts and
// connection keepalive in Buttplug. The server uses a ping system
// to detect dead connections.
//
// Include Buttplug via CDN:
// <script src="https://cdn.jsdelivr.net/npm/buttplug@4.0.0/dist/web/buttplug.min.js"></script>

async function runPingTimeoutExample() {
  console.log("Ping Timeout Example");
  console.log("====================\n");

  const client = new Buttplug.ButtplugClient("Ping Timeout Example");

  // The 'disconnect' event is fired when the connection drops,
  // including due to ping timeout.
  client.addListener("disconnect", () => {
    console.log("[Event] Connection lost!");
    console.log("This could be due to:");
    console.log("  - Server shutdown");
    console.log("  - Network failure");
    console.log("  - Ping timeout (client didn't respond in time)");
  });

  // Connect to server
  const connector = new Buttplug.ButtplugBrowserWebsocketClientConnector("ws://127.0.0.1:12345");

  try {
    console.log("Connecting...");
    await client.connect(connector);
    console.log("Connected!");

    // The ping system is handled automatically by the client.
    // If the server requires ping responses and the client fails
    // to respond in time, the connection will be terminated and
    // a ButtplugPingError will be thrown or the disconnect event fires.

    console.log("\nConnection is active. The client will automatically");
    console.log("handle ping/pong with the server.");

    console.log("\nTo test ping timeout:");
    console.log("1. Open browser dev tools Network tab");
    console.log("2. Enable 'Offline' mode or disconnect your network");
    console.log("3. Wait for the disconnect event to fire");

    // Keep connection open to demonstrate ping handling
    console.log("\nConnection will stay open. Check console for disconnect event.");

  } catch (e) {
    if (e instanceof Buttplug.ButtplugPingError) {
      console.log("Connection lost due to ping timeout:", e.message);
    } else if (e instanceof Buttplug.ButtplugClientConnectorException) {
      console.log("Could not connect to server:", e.message);
    } else {
      console.log("Error:", e);
    }
  }
}
