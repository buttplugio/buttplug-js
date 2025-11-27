import { ButtplugClient, ButtplugNodeWebsocketClientConnector, OutputType } from '.';
import { DeviceOutput, DeviceOutputCommand } from './dist/main/src/client/ButtplugClientDeviceCommand';

async function run() {
  const client = new ButtplugClient('Test Client');
  await client.connect(new ButtplugNodeWebsocketClientConnector('ws://127.0.0.1:12345'));
  console.log(client.devices);
  console.log(client.devices.get(1)!.hasOutput(OutputType.Vibrate));
  console.log(await client.devices.get(1)!.runOutput(DeviceOutput.Vibrate.percent(0.5)));
  await new Promise((res, _) => setTimeout(() => res(true), 500));
  console.log("stopping");
  console.log(await client.devices.get(1)!.features.get(0)!.runOutput(DeviceOutput.Vibrate.percent(0)));
}

run();


//testInterfaces();