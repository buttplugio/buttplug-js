import { ButtplugClient, ButtplugNodeWebsocketClientConnector } from '.';

const client = new ButtplugClient('Test Client');
client.connect(new ButtplugNodeWebsocketClientConnector('ws://127.0.0.1:12345'));

