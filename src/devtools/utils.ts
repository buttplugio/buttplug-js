import { ButtplugClient, ButtplugEmbeddedServerConnector, ButtplugServer } from "../index";
import { TestDeviceManager } from "./TestDeviceManager";
import { TestDeviceManagerPanel } from "./TestDeviceManagerPanel";
import { LogPanel } from "./LogPanel";

export function CreateLoggerPanel() {
  LogPanel.ShowLogPanel();
}

export function CreateDeviceManagerPanel() {
  TestDeviceManagerPanel.ShowTestDeviceManagerPanel();
}

export async function CreateDevToolsClient(): Promise<ButtplugClient> {
  const client = new ButtplugClient("Test Client");
  const server = new ButtplugServer("Test Server");
  server.AddDeviceManager(TestDeviceManager.Get());
  const localConnector = new ButtplugEmbeddedServerConnector();
  localConnector.Server = server;
  await client.Connect(localConnector);
  return Promise.resolve(client);
}
