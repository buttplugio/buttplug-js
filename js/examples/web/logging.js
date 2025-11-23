// This example assumes Buttplug is brought in as a root namespace, via
// inclusion by a script tag, i.e.
//
// <script lang="javascript" 
//   src="https://cdn.jsdelivr.net/npm/buttplug@3.0.0/dist/web/buttplug.min.js">
// </script>
//
// If you're trying to load this, change the version to the latest available.

async function runEmbeddedConnectionExample () {
  // With the console logger active, the following code should cause log
  // messages to show up in the dev console.

  let connector = new Buttplug.ButtplugBrowserWebsocketClientConnector("ws://127.0.0.1:12345");
  let client = new Buttplug.ButtplugClient("Developer Guide Example");
  try {
    await client.connect(connector);
  }
  catch (ex)
  {
    console.log(ex);
  }

  // We're connected, yay!
  console.log("Connected!");

  // And now we disconnect as usual
  await client.disconnect();
};
