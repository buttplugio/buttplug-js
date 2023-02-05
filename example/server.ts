import {
  ButtplugBrowserWebsocketClientConnector,
  ButtplugClient,
} from '../src/';
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 12346 });

wss.on('connection', async (ws) => {
  const connector = new ButtplugBrowserWebsocketClientConnector(ws as any);
  const client = new ButtplugClient('Test Client');
  client.addListener('deviceadded', (device) => console.log(`Device Added: ${device.name}`));
  await client.connect(connector);
  await client.startScanning();
});
