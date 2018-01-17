import { ButtplugLogger } from "../core/Logging";
import { ButtplugClient } from "../client/Client";
import { ButtplugEmbeddedServerConnector } from "../client/ButtplugEmbeddedServerConnector";
import { ButtplugServer } from "../server/ButtplugServer";
import { TestDeviceManager } from "./TestDeviceManager";
import { TestDeviceManagerPanel } from "./TestDeviceManagerPanel";
import { LogPanel } from "./LogPanel";

class ButtplugDevToolsLogger extends ButtplugLogger {
  public static set Logger(logger: ButtplugLogger) {
    ButtplugLogger.sLogger = logger;
  }
}

export function CreateLoggerPanel(logger: ButtplugLogger) {
  LogPanel.ShowLogPanel(logger);
}

export function CreateDeviceManagerPanel() {
  TestDeviceManagerPanel.ShowTestDeviceManagerPanel();
}

export async function CreateDevToolsClient(logger: ButtplugLogger): Promise<ButtplugClient> {
  ButtplugDevToolsLogger.Logger = logger;
  const client = new ButtplugClient("Test Client");
  const server = new ButtplugServer("Test Server");
  server.AddDeviceManager(TestDeviceManager.Get());
  const localConnector = new ButtplugEmbeddedServerConnector();
  localConnector.Server = server;
  await client.Connect(localConnector);
  return Promise.resolve(client);
}
