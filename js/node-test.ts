import { ButtplugClient, ButtplugNodeWebsocketClientConnector } from '.';

async function run() {
  console.log("running");
  const client = new ButtplugClient('Test Client');
  await client.connect(new ButtplugNodeWebsocketClientConnector('ws://127.0.0.1:12345'));
  console.log(client.devices);
  await client.devices[0].vibrate(10);
  let p = () => new Promise((r, _) => setTimeout(r, 1000));
  await p();
  await client.devices[0].vibrate(0);
  await p();
  await client.devices[0].features.get(0)!.vibrate(10);
  await p();
  await client.devices[0].features.get(0)!.vibrate(0);
}

run();