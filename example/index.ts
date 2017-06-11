import { ButtplugClient } from "../src/core/client";
import { Device } from "../src/core/device";
import * as Messages from "../src/core/messages";

let devices: Device[] = [];
let client = new ButtplugClient("Example Typescript Client");
client.Connect("ws://192.168.123.2:12345/buttplug").then(
    function (result) {
        console.log(result); // "Stuff worked!"
        return client.StartScanning();
      },
    function (err) {
        console.log(err); // Error: "It broke"
      }
  ).then(
    function () {
        return client.RequestDeviceList();
      }, 
	function (err) {
        console.log(err); // Error: "It broke"
      }
  ).then(
    function () {
        devices = client.getDevices();
    },
	function (err) {
        console.log(err); // Error: "It broke"
      }
  );

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var power = 0.5;
let i = 1;
async function toggle() {
  if(devices.length > 0 ) {
    client.SendDeviceMessage(devices[0], new Messages.SingleMotorVibrateCmd(power, devices[0].Index, i++));
	if( power > 0 ) {
	  power = 0;
	} else {
	  power = 0.5;
	}
  }
  await sleep(2000);
  toggle();
}

toggle();
