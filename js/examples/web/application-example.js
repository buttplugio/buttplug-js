// Buttplug Web - Complete Application Example
//
// This is a complete, working example that demonstrates the full workflow
// of a Buttplug application in a browser. If you're new to Buttplug, start here!
//
// Prerequisites:
// 1. Install Intiface Central: https://intiface.com/central
// 2. Start the server in Intiface Central (click "Start Server")
// 3. Include Buttplug via CDN in your HTML:
//    <script src="https://cdn.jsdelivr.net/npm/buttplug@4.0.0/dist/web/buttplug.min.js"></script>
// 4. Call runApplicationExample() from your page

async function runApplicationExample() {
  console.log("===========================================");
  console.log("  Buttplug Web Application Example");
  console.log("===========================================\n");

  // Step 1: Create a client
  // The client name identifies your application to the server.
  const client = new Buttplug.ButtplugClient("My Buttplug Application");

  // Step 2: Set up event handlers
  // Always do this BEFORE connecting to avoid missing events.
  client.addListener("deviceadded", (device) => {
    console.log(`[+] Device connected: ${device.name}`);
  });

  client.addListener("deviceremoved", (device) => {
    console.log(`[-] Device disconnected: ${device.name}`);
  });

  client.addListener("disconnect", () => {
    console.log("[!] Server connection lost!");
  });

  // Step 3: Connect to the server
  console.log("Connecting to Intiface Central...");
  try {
    const connector = new Buttplug.ButtplugBrowserWebsocketClientConnector(
      "ws://127.0.0.1:12345"
    );
    await client.connect(connector);
  } catch (e) {
    if (e instanceof Buttplug.ButtplugClientConnectorException) {
      alert(
        "Could not connect to Intiface Central!\n\n" +
        "Make sure Intiface Central is running and the server is started.\n" +
        "Default address: ws://127.0.0.1:12345"
      );
      console.log("ERROR: Could not connect to Intiface Central!");
      return;
    }
    throw e;
  }
  console.log("Connected!\n");

  // Step 4: Scan for devices
  console.log("Scanning for devices...");
  console.log("Turn on your Bluetooth/USB devices now.\n");
  await client.startScanning();

  // Wait for devices (using alert/confirm for browser interaction)
  alert("Scanning for devices...\n\nTurn on your devices, then click OK when ready.");
  await client.stopScanning();

  // Step 5: Check what devices we found
  const devices = Array.from(client.devices.values());
  if (devices.length === 0) {
    alert(
      "No devices found!\n\n" +
      "Make sure your device is:\n" +
      "- Turned on\n" +
      "- In pairing/discoverable mode\n" +
      "- Supported by Buttplug (check https://iostindex.com)"
    );
    console.log("No devices found.");
    await client.disconnect();
    return;
  }

  console.log(`\nFound ${devices.length} device(s):\n`);

  // Step 6: Display device capabilities
  for (const device of devices) {
    console.log(`  ${device.name}`);

    // Check output capabilities
    const outputs = [];
    if (device.hasOutput(Buttplug.OutputType.Vibrate)) outputs.push("Vibrate");
    if (device.hasOutput(Buttplug.OutputType.Rotate)) outputs.push("Rotate");
    if (device.hasOutput(Buttplug.OutputType.Oscillate)) outputs.push("Oscillate");
    if (device.hasOutput(Buttplug.OutputType.Position)) outputs.push("Position");
    if (device.hasOutput(Buttplug.OutputType.Constrict)) outputs.push("Constrict");

    if (outputs.length > 0) {
      console.log(`    Outputs: ${outputs.join(", ")}`);
    }

    // Check input capabilities
    const inputs = [];
    if (device.hasInput(Buttplug.InputType.Battery)) inputs.push("Battery");
    if (device.hasInput(Buttplug.InputType.RSSI)) inputs.push("RSSI");

    if (inputs.length > 0) {
      console.log(`    Inputs: ${inputs.join(", ")}`);
    }
  }

  // Step 7: Interactive device control
  console.log("\n=== Interactive Control ===");
  console.log("Use the prompts to control devices.");

  let running = true;
  while (running) {
    const input = prompt(
      "Commands:\n" +
      "  v <0-100>  - Vibrate all devices at percentage\n" +
      "  s          - Stop all devices\n" +
      "  b          - Read battery levels\n" +
      "  q          - Quit\n\n" +
      "Enter command:"
    );

    if (input === null) {
      // User clicked Cancel
      running = false;
      continue;
    }

    const cmd = input.trim().toLowerCase();

    if (!cmd) continue;

    try {
      if (cmd.startsWith("v ")) {
        // Vibrate command
        const percentStr = cmd.slice(2);
        const percent = parseInt(percentStr, 10);
        if (!isNaN(percent) && percent >= 0 && percent <= 100) {
          const intensity = percent / 100.0;
          for (const device of devices) {
            if (device.hasOutput(Buttplug.OutputType.Vibrate)) {
              await device.runOutput(Buttplug.DeviceOutput.Vibrate.percent(intensity));
              console.log(`  ${device.name}: vibrating at ${percent}%`);
            }
          }
        } else {
          alert("Usage: v <0-100>");
        }
      } else if (cmd === "s") {
        // Stop all devices
        await client.stopAllDevices();
        console.log("  All devices stopped.");
      } else if (cmd === "b") {
        // Read battery levels
        let batteryInfo = "Battery Levels:\n\n";
        for (const device of devices) {
          if (device.hasInput(Buttplug.InputType.Battery)) {
            try {
              const battery = await device.battery();
              const msg = `${device.name}: ${(battery * 100).toFixed(0)}%`;
              console.log(`  ${msg}`);
              batteryInfo += msg + "\n";
            } catch (e) {
              console.log(`  ${device.name}: could not read battery`);
              batteryInfo += `${device.name}: could not read battery\n`;
            }
          } else {
            console.log(`  ${device.name}: no battery sensor`);
            batteryInfo += `${device.name}: no battery sensor\n`;
          }
        }
        alert(batteryInfo);
      } else if (cmd === "q") {
        running = false;
      } else {
        alert("Unknown command. Use v, s, b, or q.");
      }
    } catch (e) {
      if (e instanceof Buttplug.ButtplugDeviceError) {
        console.log(`  Device error: ${e.message}`);
        alert(`Device error: ${e.message}`);
      } else if (e instanceof Buttplug.ButtplugError) {
        console.log(`  Error: ${e.message}`);
        alert(`Error: ${e.message}`);
      } else {
        throw e;
      }
    }
  }

  // Step 8: Clean up
  console.log("\nStopping devices and disconnecting...");
  await client.stopAllDevices();
  await client.disconnect();
  console.log("Goodbye!");
}
