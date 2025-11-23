// This example assumes Buttplug is brought in as a root namespace, via
// inclusion by a script tag, i.e.
//
// <script lang="javascript" 
//   src="https://cdn.jsdelivr.net/npm/buttplug@3.0.0/dist/web/buttplug.min.js">
// </script>
//
// If you're trying to load this, change the version to the latest available.

 async function runErrorExample () {

  async function ThrowError() {
    // All async functions in Buttplug are written to return exceptions as a
    // promise rejection, meaning they work as both promise chains and
    // async/await.
    throw new ButtplugDeviceError("This is an exception", 0);
  }


  async function ButtplugErrors() {
    const invalid_options = new Buttplug.ButtplugBrowserWebsocketClientConnector("ws://notadomain.local");
    const client = new Buttplug.ButtplugClient("Error Example Client");
    //invalid_options.Address = "this is not a websocket address";

    // In javascript, there are 2 ways we can call functions and catch exceptions.
    // There's promise chain catching.
    client
      .connect(invalid_options)
      .then(() => {
        console.log("If you got here, shut down Intiface Central or whatever other server you're running :P");
      })
      .catch(e => {
        console.log("Using .catch()");
        console.log(e);
      });
    // There's also try/catch, which is handy for async.
    try {
      await client.connect(invalid_options);
    } catch (e) {
      // However, we don't have the type of the exception we get back, so it could
      // be a system exception or something else not buttplug related. If you're
      // interested in Buttplug related exceptions, it's best to check for them
      // here.
      console.log(`${e}`);
      if (e instanceof Buttplug.ButtplugError) {
        console.log("this is a buttplug error");
        // This will make sure we're doing something specific to Buttplug.
        if (e instanceof Buttplug.ButtplugClientConnectorError) {
          console.log("This is a connector error");
          // And possibly even more specific.
        }
      } else {
        console.log("Was another type of error");
      }
    }
    // However, as all async javascript functions also return promises, so we can
    // treat the call as a promise rejection.
    //ThrowError().catch((e) => console.log("Got an exception back from our promise!"));
  }

  ButtplugErrors();
}
