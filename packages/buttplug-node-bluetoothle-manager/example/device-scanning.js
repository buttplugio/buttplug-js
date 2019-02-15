const Buttplug = require('buttplug');
// For other projects, this would be require('buttplug-node-bluetoothle-manager')
const ButtplugBLE = require('../dist/index.js');

let main = async () => {

  const connector = new Buttplug.ButtplugEmbeddedServerConnector();
  const client = new Buttplug.ButtplugClient("Device Scanning Example");
  await client.Connect(connector);

  const dm = new ButtplugBLE.ButtplugNodeBluetoothLEDeviceManager();
  console.log("Initializing Bluetooth adapter...");
  await dm.Initialize();
  connector.Server.AddDeviceManager(dm);

  console.log("Scanning for devices...");
  client.on("deviceadded", (device) => {
    console.log(device.Name);
  });

  await client.StartScanning();
};

main();
