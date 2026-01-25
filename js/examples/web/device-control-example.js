// Buttplug Web - Device Control Example
//
// This example demonstrates how to send commands to devices,
// query device capabilities, and use the v4 command builder API.
//
// Include Buttplug via CDN:
// <script src="https://cdn.jsdelivr.net/npm/buttplug@4.0.0/dist/web/buttplug.min.js"></script>

async function runDeviceControlExample() {
  const connector = new Buttplug.ButtplugBrowserWebsocketClientConnector("ws://127.0.0.1:12345");
  const client = new Buttplug.ButtplugClient("Device Control Example");

  // Set up event handlers before connecting
  client.addListener("deviceadded", async (device) => {
    console.log(`Device connected: ${device.name}`);

    // Show currently connected devices (client.devices is a Map in v4)
    console.log("Currently connected devices:");
    for (const [index, dev] of client.devices) {
      console.log(`  - ${dev.name} (Index: ${index})`);
    }

    // Check if device supports vibration using v4 API
    if (!device.hasOutput(Buttplug.OutputType.Vibrate)) {
      console.log("Device does not support vibration, skipping control demo.");
      return;
    }

    console.log("Device supports vibration. Sending commands...");

    try {
      // Use the v4 command builder API
      console.log("Vibrating at 100%...");
      await device.runOutput(Buttplug.DeviceOutput.Vibrate.percent(1.0));

      await new Promise(r => setTimeout(r, 1000));

      console.log("Vibrating at 50%...");
      await device.runOutput(Buttplug.DeviceOutput.Vibrate.percent(0.5));

      await new Promise(r => setTimeout(r, 1000));

      console.log("Stopping device...");
      await device.stop();
    } catch (e) {
      console.log("Error sending command:", e);
      if (e instanceof Buttplug.ButtplugDeviceError) {
        console.log("This is a device error - device may have disconnected.");
      }
    }

    // Check for battery support using v4 API
    if (device.hasInput(Buttplug.InputType.Battery)) {
      try {
        const level = await device.battery();
        console.log(`${device.name} Battery Level: ${(level * 100).toFixed(0)}%`);
      } catch (e) {
        console.log("Could not read battery level:", e);
      }
    }

    // Demonstrate other output types if available
    if (device.hasOutput(Buttplug.OutputType.Rotate)) {
      console.log("Device supports rotation. Rotating at 50%...");
      await device.runOutput(Buttplug.DeviceOutput.Rotate.percent(0.5));
      await new Promise(r => setTimeout(r, 1000));
      await device.stop();
    }

    if (device.hasOutput(Buttplug.OutputType.Position)) {
      console.log("Device supports position control. Moving...");
      await device.runOutput(Buttplug.DeviceOutput.PositionWithDuration.percent(1.0, 500));
      await new Promise(r => setTimeout(r, 1000));
      await device.runOutput(Buttplug.DeviceOutput.PositionWithDuration.percent(0.0, 500));
    }
  });

  client.addListener("deviceremoved", (device) => {
    console.log(`Device disconnected: ${device.name}`);
  });

  console.log("Connecting...");
  await client.connect(connector);
  console.log("Connected! Scanning for devices...");

  await client.startScanning();
}
