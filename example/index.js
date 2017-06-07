var Buttplug = require('../src/index');

window.client = new Buttplug.ButtplugClient();
window.devices = [];
window.client.Connect("ws://localhost:12345/buttplug").then(
    function (result) {
        console.log(result); // "Stuff worked!"
        return window.client.StartScanning();
      },
    function (err) {
        console.log(err); // Error: "It broke"
      }
  ).then(
    function () {
        return window.client.RequestDeviceList();
      }, 
	function (err) {
        console.log(err); // Error: "It broke"
      }
  ).then(
    function () {},
	function (err) {
        console.log(err); // Error: "It broke"
      }
  );

window.client.on("deviceadded", function (d) { window.devices.push(d); console.log(d); });

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var power = 0.5;
async function toggle() {
  if(devices.length > 0 ) {
    window.client.SendDeviceMessage(devices[0], new (devices[0].newMessage(0))(power, devices[0].Index, 0));
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
