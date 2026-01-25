// Buttplug Web - Device Info Example
//
// This example demonstrates how to introspect device features
// and capabilities in detail using the v4 API.
//
// Include Buttplug via CDN:
// <script src="https://cdn.jsdelivr.net/npm/buttplug@4.0.0/dist/web/buttplug.min.js"></script>

function printDeviceInfo(device) {
  console.log("==================================================");
  console.log(`Device: ${device.name}`);
  if (device.displayName) {
    console.log(`Display Name: ${device.displayName}`);
  }
  console.log(`Index: ${device.index}`);
  if (device.messageTimingGap !== undefined) {
    console.log(`Message Timing Gap: ${device.messageTimingGap}ms`);
  }
  console.log("==================================================");

  // Collect output capabilities
  const outputTypes = [];
  if (device.hasOutput(Buttplug.OutputType.Vibrate)) outputTypes.push("Vibrate");
  if (device.hasOutput(Buttplug.OutputType.Rotate)) outputTypes.push("Rotate");
  if (device.hasOutput(Buttplug.OutputType.Oscillate)) outputTypes.push("Oscillate");
  if (device.hasOutput(Buttplug.OutputType.Position)) outputTypes.push("Position");
  if (device.hasOutput(Buttplug.OutputType.Constrict)) outputTypes.push("Constrict");
  if (device.hasOutput(Buttplug.OutputType.Inflate)) outputTypes.push("Inflate");
  if (device.hasOutput(Buttplug.OutputType.Temperature)) outputTypes.push("Temperature");
  if (device.hasOutput(Buttplug.OutputType.Led)) outputTypes.push("LED");

  if (outputTypes.length > 0) {
    console.log(`\nOutput Capabilities: ${outputTypes.join(", ")}`);
  }

  // Collect input capabilities
  const inputTypes = [];
  if (device.hasInput(Buttplug.InputType.Battery)) inputTypes.push("Battery");
  if (device.hasInput(Buttplug.InputType.RSSI)) inputTypes.push("RSSI");
  if (device.hasInput(Buttplug.InputType.Button)) inputTypes.push("Button");
  if (device.hasInput(Buttplug.InputType.Pressure)) inputTypes.push("Pressure");

  if (inputTypes.length > 0) {
    console.log(`Input Capabilities: ${inputTypes.join(", ")}`);
  }

  // Detailed feature breakdown
  console.log("\nDetailed Features:");
  for (const [index, feature] of device.features) {
    // Access the underlying feature definition
    const def = feature._feature;
    console.log(`\n  Feature ${index}: ${def.FeatureDescriptor}`);

    if (def.Output) {
      console.log("    Outputs:");
      for (const [type, config] of Object.entries(def.Output)) {
        console.log(`      - ${type}: steps ${config.Value[0]}-${config.Value[1]}`);
      }
    }

    if (def.Input) {
      console.log("    Inputs:");
      for (const [type, config] of Object.entries(def.Input)) {
        console.log(`      - ${type}: commands [${config.Command.join(", ")}]`);
      }
    }
  }
}

async function runDeviceInfoExample() {
  const client = new Buttplug.ButtplugClient("Device Info Example");

  // Connect to the server
  const connector = new Buttplug.ButtplugBrowserWebsocketClientConnector("ws://127.0.0.1:12345");

  console.log("Connecting...");
  await client.connect(connector);
  console.log("Connected! Scanning for devices...");
  console.log("Turn on your devices now. Info will be printed as they connect.\n");

  // Set up device event to print info when devices connect
  client.addListener("deviceadded", (device) => {
    printDeviceInfo(device);
  });

  await client.startScanning();

  // After a few seconds, also show summary of all connected devices
  setTimeout(() => {
    console.log("\n\n========== SUMMARY ==========");
    if (client.devices.size === 0) {
      console.log("No devices connected.");
    } else {
      console.log(`Found ${client.devices.size} device(s):`);
      for (const [index, device] of client.devices) {
        console.log(`  ${index}: ${device.name}`);
      }
    }
  }, 5000);
}
