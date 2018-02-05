import { ButtplugClient, ButtplugEmbeddedServerConnector, ButtplugServer } from "../index";
import { TestDeviceManager } from "./TestDeviceManager";

export async function CreateDevToolsClient(): Promise<ButtplugClient> {
  const client = new ButtplugClient("Test Client");
  const server = new ButtplugServer("Test Server");
  server.ClearDeviceManagers();
  server.AddDeviceManager(TestDeviceManager.Get());
  const localConnector = new ButtplugEmbeddedServerConnector();
  localConnector.Server = server;
  await client.Connect(localConnector);
  return Promise.resolve(client);
}
