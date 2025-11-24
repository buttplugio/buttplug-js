import { testInterfaces, ButtplugClient, ButtplugNodeWebsocketClientConnector, ButtplugCmdValue } from '.';

async function run() {
  const client = new ButtplugClient('Test Client');
  await client.connect(new ButtplugNodeWebsocketClientConnector('ws://127.0.0.1:12345'));
  console.log(client.devices);
  console.log(client.devices.get(1)!.canVibrate());
  console.log(await client.devices.get(1)!.vibrate(ButtplugCmdValue.fromFloat(0.5)));
  await new Promise((res, _) => setTimeout(() => res(true), 500));
  console.log("stopping");
  console.log(await client.devices.get(1)!.features.get(0)!.vibrate(ButtplugCmdValue.fromFloat(0)));
}

run();


//testInterfaces();