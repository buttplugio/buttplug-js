import { ButtplugClient, ButtplugServer, ButtplugEmbeddedServerConnector } from "../src/index";
import { TestDeviceSubtypeManager } from "../src/test/TestDeviceSubtypeManager";
import * as Messages from "../src/core/Messages";
import { ButtplugClientConnectorException } from "client/ButtplugClientConnectorException";

export class BPTestClient extends ButtplugClient {
  constructor(ClientName: string) {
    super(ClientName);
  }
  public get PingTimer() {
    return this._pingTimer;
  }

  public async SendMessage(aMsg: Messages.ButtplugMessage): Promise<Messages.ButtplugMessage>  {
    return super.SendMessage(aMsg);
  }
}

export function SetupTestSuite() {
  // None of our tests should take very long.
  jest.setTimeout(1000);
  process.on("unhandledRejection", (reason, p) => {
    throw new Error(`Unhandled Promise rejection!\n---\n${reason.stack}\n---\n`);
  });
}

export async function SetupTestServer(): Promise<{Client: ButtplugClient,
                                                  Server: ButtplugServer,
                                                  TestDeviceManager: TestDeviceSubtypeManager,
                                                  Connector: ButtplugEmbeddedServerConnector}> {
  const client = new ButtplugClient("Test Client");
  const server = new ButtplugServer("Test Server");
  server.ClearDeviceManagers();
  const testdevicemanager = new TestDeviceSubtypeManager();
  server.AddDeviceManager(testdevicemanager);
  const localConnector = new ButtplugEmbeddedServerConnector();
  localConnector.Server = server;
  await client.Connect(localConnector);
  return Promise.resolve({Client: client,
                          Server: server,
                          TestDeviceManager: testdevicemanager,
                          Connector: localConnector});
}

