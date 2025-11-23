// This example assumes Buttplug is brought in as a root namespace, via
// inclusion by a script tag, i.e.
//
// <script lang="javascript" 
//   src="https://cdn.jsdelivr.net/npm/buttplug@3.0.0/dist/web/buttplug.min.js">
// </script>
//
// If you're trying to load this, change the version to the latest available.

const runWebsocketConnectionExample = async () => {
  // This is the default insecure address for Intiface Central (https://intiface.com/central). You
  // can connect to it via most browsers.
  let address = "ws://localhost:12345"

  // After you've created a connector, the connection looks the same no matter what, though the
  // errors thrown may be different.
  let connector = new Buttplug.ButtplugBrowserWebsocketClientConnector(address);

  let client = new Buttplug.ButtplugClient("Websocket Connection Example");

  // Now we connect. If anything goes wrong here, we'll either throw
  //
  // - A ButtplugClientConnectionException if there's a problem with
  //   the Connector, like the network address being wrong, server not
  //   being up, etc.
  // - A ButtplugHandshakeException if there is a client/server version
  //   mismatch.
  try {
    await client.connect(connector);
  }
  catch (ex)
  {
    // If our connection failed, because the server wasn't turned on, SSL/TLS
    // wasn't turned off, etc, we'll just print and exit here. This will most
    // likely be a wrapped exception.
    //
    // This could also mean our client is newer than our server, and we need to
    // upgrade the server we're connecting to.
    console.log(ex);
  }

  // We're connected, yay!
  console.log("Connected!");

  setTimeout(async () => {
    // And now we disconnect as usual
    console.log("Disconnecting");
    await client.disconnect();
  }, 3000);
  
};