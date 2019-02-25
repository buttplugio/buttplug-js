import { ButtplugEmbeddedClientConnector } from "../src/client/ButtplugEmbeddedClientConnector";
import { ButtplugServer } from "../src/server/ButtplugServer";
import * as Messages from "../src/core/Messages";
import { ButtplugClient } from "../src/index";
import { TestDeviceSubtypeManager } from "../src/test/TestDeviceSubtypeManager";
import { SetupTestSuite } from "./utils";
import { ButtplugDeviceException } from "../src/core/Exceptions";

SetupTestSuite();

class TestOldClient extends ButtplugClient {

  public constructor() {
    super("Test Old Client");
  }

  protected ParseMessagesInternal(aMsgs: Messages.ButtplugMessage[]) {
    this.emit("clientmessages", aMsgs);
    super.ParseMessagesInternal(aMsgs);
  }

  protected InitializeConnection = async (): Promise<boolean> => {
    const msg = await this.SendMessage(new Messages.RequestServerInfo(this._clientName, 0));
    switch (msg.getType()) {
      case Messages.ServerInfo: {
        // TODO: maybe store server name, do something with message template version?
        return true;
      }
      case Messages.Error: {
        await this._connector!.Disconnect();
      }
    }
    return false;
  }
}

describe("Server Tests", async () => {
  let bpServer: ButtplugServer;
  beforeEach(async () => {
    bpServer = new ButtplugServer("Test Server", 0);
    bpServer.AddDeviceManager(new TestDeviceSubtypeManager());
  });

  it("Should throw connection error if message sent without connecting", async () => {
    await expect(bpServer.SendMessage(new Messages.SingleMotorVibrateCmd(50, 0))).rejects.toBeInstanceOf(Error);
  });

  it("Should downgrade messages", async () => {
    const bpConnector = new ButtplugEmbeddedClientConnector();
    bpConnector.Server = bpServer;
    const oldClient = new TestOldClient();
    await oldClient.Connect(bpConnector);
    let res;
    let rej;
    const p = new Promise((resolve, reject) => { res = resolve; rej = reject; });
    await oldClient.StartScanning();
    // This listener needs to be added after calling StartScanning, as it'll
    // fire the device added event on the next tick after we finish out this
    // function.
    oldClient.addListener("clientmessages", (aMsgs) => {
      try {
        expect(aMsgs).toEqual([new Messages.DeviceAddedVersion0(0,
                                                                "Test Device - Test Vibration Device",
                                                                ["VibrateCmd",
                                                                 "SingleMotorVibrateCmd",
                                                                 "StopDeviceCmd"])]);
        res();
      } catch (e) {
        rej(e);
      }
    });
    return p;
  });

  it("Should clear all device managers when ClearDeviceManagers called", async () => {
    const bpConnector = new ButtplugEmbeddedClientConnector();
    bpConnector.Server = bpServer;
    bpServer.ClearDeviceManagers();
    const client = new ButtplugClient();
    await client.Connect(bpConnector);
    await expect(client.StartScanning()).rejects.toBeInstanceOf(ButtplugDeviceException);
  });
});
