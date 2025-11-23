// This example assumes Buttplug is brought in as a root namespace, via
// inclusion by a script tag, i.e.
//
// <script lang="javascript" 
//   src="https://cdn.jsdelivr.net/npm/buttplug@3.0.0/dist/web/buttplug.min.js">
// </script>
//
// If you're trying to load this, change the version to the latest available.

async function runDeviceEnumerationExample() {

  let client = new Buttplug.ButtplugClient("Device Enumeration Example");

  // Set up our DeviceAdded/DeviceRemoved event handlers before connecting. If
  // devices are already held to the server when we connect to it, we'll get
  // "deviceadded" events on successful connect.
  client.addListener("deviceadded", (device) => {
    console.log(`Device Connected: ${device.name}`);
    console.log("Client currently knows about these devices:");
    client.devices.forEach((device) => console.log(`- ${device.name}`));
  });
  client
    .addListener("deviceremoved", (device) => console.log(`Device Removed: ${device.name}`));

  // Usual embedded connector setup.
  const connector = new Buttplug.ButtplugBrowserWebsocketClientConnector("ws://localhost:12345");
  await client.connect(connector);
  
  // Now that everything is set up, we can scan.
  await client.startScanning();
};
