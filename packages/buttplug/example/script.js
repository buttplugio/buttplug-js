/*
 * This is the function that is run whenever a user clicks a button
 * on the webpage.
 */
let clickHandler = async (connectAddress) => {
  /*
   * The ButtplugClient class is our main access to Buttplug Servers, both
   * local and remote. This class allows us to connect to servers, query devices
   * and send messages to them. It'll wrap a bunch of functionality you may have
   * seen in the message spec, including ping handling and message ID tracking.
   * Handy!
   */
  let client = new Buttplug.ButtplugClient("Tutorial Client");

  /*
   * Now we'll try to connect to a server. Based on the button pushed
   * by the user, we'll either try to connect to a remote websocket server,
   * or to a local in-browser server.
   */
  try {
    if (connectAddress !== undefined) {
      /*
       * Here's how we connect to a remote server. For sake of simplicity, I'm assuming we're running
       * a websocket server on the same machine as the web browser we're on. The Buttplug C# Websocket
       * Server defaults to port 12345, with an endpoint of "buttplug". Due to the fact we're normally
       * running Buttplug applications on https, this will require secure websockets (wss). Buttplug
       * websocket server implementations usually generate their own cert on install, meaning you may need
       * to accept a self-signed cert before this works.
       *
       * There's a tutorial about doing this on youtube at
       * https://www.youtube.com/watch?v=BaYY2m267eM
       */
      await client.ConnectWebsocket("wss://localhost:12345/buttplug");
    } else {
      /*
       * And here's how we connect to a local, in-browser server. Thanks to WebBluetooth (and soon,
       * the gamepad extensions API for supporting gamepad/VR controller rumble), we can run
       * a Buttplug server completely inside the web browser and still control sex toys. Connecting to
       * a local server will never fail, but is really only useful in browsers that support WebBluetooth.
       * Currently, that's only Chrome on macOS, Linux, Android, and ChromeOS.
       *
       * Also, remember that using WebBluetooth requires a secure context (https) unless you're
       * running on a whitelisted domain, which is usually just "localhost".
       */
      await client.ConnectLocal();
    }
  } catch (e) {
    // If something goes wrong, we're just logging to the console here. This is a tutorial on a development
    // website, so we figure the developer has already read the code and knows to look at the console.
    // At least, we hope.
    console.log(e);
    return;
  }
  // The client is connected. Time to set up our event handlers.

  /*
   * The 'deviceadded' event is emitted any time the client is made aware of a device it did not
   * know of before. This could mean a new connection, or it could mean that we are being made aware of
   * a device that was connected before the client has established contact with the server. Some servers
   * persist device connections for various reasons (mostly because Microsoft's BLE API is fucking broken,
   * though.)
   */
  client.addListener('deviceadded', async (device) => {
    /*
     * Here's where we'll make devices vibrate. We get a device object,
     * which consists of a device index, device name, and a list of messages the device can take.
     * (https://metafetish.github.io/buttplug-js/classes/device.html). If we see something added that
     * can vibrate, we'll send a message to start vibrating, then 3 seconds later, a message to stop.
     */

    // Let's at least show the user we know something is connected, by adding the device name
    // to a list on the page.
    let ul = document.getElementById("devices");
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(device.Name));

    // To check whether something can vibrate, we currently look for the SingleMotorVibrateCmd message
    // in the allowed messages list. This will change to VibrateCmd in the future.
    if (device.AllowedMessages.indexOf("SingleMotorVibrateCmd") >= 0) {
      // Ok, we have a device that vibrates. Let's make it vibrate. We'll put a button that, when clicked, sends
      // a vibrate message to the server. We'll use the client's SendDeviceMessage
      // function to do this, with the device object and a new message object. We'll await this, as the
      // server will let us know when the message has been successfully sent.
      let button = document.createElement("button");
      button.innerHTML = "Click to vibrate";
      button.addEventListener('click', async () => {
        await client.SendDeviceMessage(device, new Buttplug.SingleMotorVibrateCmd(0.5));

        // Now we set a timeout for 3 seconds in the future, to stop the device.
        setTimeout(async () => await client.SendDeviceMessage(device,
                                                              new Buttplug.SingleMotorVibrateCmd(0)), 3000);
      });
      li.appendChild(button);
    }

    ul.appendChild(li);

    // At this point, let's just say we're done. Ask the server to stop scanning if it is currently doing so.
    await client.StopScanning();
  });

  /*
   * Before we start scanning, we can ask the server to send us a list of devices that are already connected.
   * We use RequestDeviceList to do this. If we get back any devices we didn't know about yet, we'll get "deviceadded"
   * events.
   */
  await client.RequestDeviceList();
  /*
   * Now we've got a client up and running, we'll need to scan for devices. Calling StartScanning will
   * scan on all available busses. Some will scan until told to stop (bluetooth), others will scan once
   * and return (gamepads, usb, etc...). When a device is found, a "deviceadded" event is emitted.
   */
  await client.StartScanning();
};
