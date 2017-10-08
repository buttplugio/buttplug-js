import { ButtplugClient } from "../src/client/Client";
import { Device } from "../src/core/Device";
import * as Messages from "../src/core/Messages";

let devices: Device[] = [];
const client = new ButtplugClient("Example Typescript Client");
client.ConnectWebsocket("wss://localhost:12345/buttplug").then(
  function(result) {
    console.log(result); // "Stuff worked!"
    return client.StartScanning();
  },
  function(err) {
    console.log(err); // Error: "It broke"
  })
  .then(
    function() {
      return client.RequestDeviceList();
    },
    function(err) {
      console.log(err); // Error: "It broke"
    })
  .then(
    function() {
      devices = client.getDevices();
    },
    function(err) {
      console.log(err); // Error: "It broke"
    });

client.on("deviceadded", function() {
  devices = client.getDevices();
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let power = 0.5;
let i = 1;
async function toggle() {
  if (devices.length > 0) {
    client.SendDeviceMessage(devices[0], new Messages.SingleMotorVibrateCmd(power, devices[0].Index, i++));
    if ( power > 0 ) {
      power = 0;
    } else {
      power = 0.5;
    }
  }
  await sleep(2000);
  toggle();
}

toggle();
