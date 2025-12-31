import { ButtplugClient, ButtplugNodeWebsocketClientConnector, InputCommandType, InputType, OutputType } from '.';
import { DeviceOutput, DeviceOutputCommand } from './dist/main/src/client/ButtplugClientDeviceCommand';

async function run() {
  const client = new ButtplugClient('Test Client');
  await client.connect(new ButtplugNodeWebsocketClientConnector('ws://127.0.0.1:12345'));
  console.log(client.devices);
  //console.log(client.devices.get(0)!.hasOutput(OutputType.Vibrate));
  //console.log("Vibrating");
  try {
    //await client.devices.get(2)!.runOutput(DeviceOutput.Vibrate.percent(0.5));
    console.log(await client.devices.get(1)!.battery());
    await client.devices.get(1)!.features.get(0)!.runInput(InputType.Pressure, InputCommandType.Subscribe);
  } catch (e) {
    console.log(e);
  }
  await new Promise((res, _) => setTimeout(() => res(true), 3000));
  //await client.devices.get(1)!.features.get(0)!.runInput(InputType.Pressure, InputCommandType.Unsubscribe);
  //console.log("stopping");
  //console.log(await client.devices.get(1)!.features.get(0)!.runOutput(DeviceOutput.Vibrate.percent(0)));
}
run();
//testInterfaces();