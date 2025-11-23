// This example assumes Buttplug is brought in as a root namespace, via
// inclusion by a script tag, i.e.
//
// <script lang="javascript" 
//   src="https://cdn.jsdelivr.net/npm/buttplug@3.0.0/dist/web/buttplug.min.js">
// </script>
//
// If you're trying to load this, change the version to the latest available.

async function runDeviceControlExample() {
  // Usual embedded connector setup.
  const connector = new Buttplug.ButtplugBrowserWebsocketClientConnector("ws://127.0.0.1:12345");
  const client = new Buttplug.ButtplugClient("Device Control Example");
  // Set up our DeviceAdded/DeviceRemoved event handlers before connecting. If
  // devices are already held to the server when we connect to it, we'll get
  // "deviceadded" events on successful connect.
  client.addListener("deviceadded", async (device) => {
    console.log(`Device Connected: ${device.name}`);
    console.log("Client currently knows about these devices:");
    client.devices.forEach((device) => console.log(`- ${device.name}`));

    // In Javascript, allowedMessages is a map, so we'll need to iterate its
    // properties.

    console.log("Sending commands");

    // If we aren't working with a toy that vibrates, just return at this point.
    if (device.vibrateAttributes.length == 0) {
      return;
    }

    // Now that we know the message types for our connected device, and that our
    // device handles vibration, we can send a message over!
    //
    // There's a couple of ways to send this message.

    // We can use the convenience functions on ButtplugClientDevice to
    // send the message. This version sets all of the motors on a
    // vibrating device to the same speed.
    try {
      await device.vibrate(1.0);
    } catch (e) {
      console.log(e);
      if (e instanceof Buttplug.ButtplugDeviceError) {
        console.log("got a device error!");
      }
    }
    await new Promise(r => setTimeout(r, 1000));
    await device.stop();

    const batteryAttrs = device.messageAttributes.SensorReadCmd?.filter(
      (x) => x.SensorType === Buttplug.SensorType.Battery
    );

    if (device.hasBattery) {
      console.log(`${device.name} Battery Level: ${await device.battery()}`);
    }

    // If we wanted to just set one motor on and the other off, we could
    // try this version that uses an array. It'll throw an exception if
    // the array isn't the same size as the number of motors available as
    // denoted by FeatureCount, though.
    //
    // You can get the vibrator count using the following code, though we
    // know it's 2 so we don't really have to use it.
    //
    // This vibrateType variable is just used to keep us under 80 
    // characters for the dev guide, so don't feel that you have to reassign 
    // types like this. I'm just trying to make it so you don't have to
    // horizontally scroll in the manual. :)

    /*
    var vibratorCount =
      device.AllowedMessages[vibrateType].FeatureCount;
    await testClientDevice.SendVibrateCmd(new [] { 1.0, 0.0 });
    */
  });
  client
    .addListener("deviceremoved", (device) => console.log(`Device Removed: ${device.name}`));
  
  await client.connect(connector);

  // Now that everything is set up, we can scan.
  await client.startScanning();
};
