import { Server } from "mock-socket";
import { IDeviceSubtypeManager } from "../src/server/IDeviceSubtypeManager";
import { ButtplugEmbeddedServerConnector } from "../src/client/ButtplugEmbeddedServerConnector";
import { ButtplugServer } from "../src/server/ButtplugServer";
import { IButtplugDevice } from "../src/server/IButtplugDevice";
import * as Messages from "../src/core/Messages";
import { FromJSON } from "../src/core/MessageUtils";
import { EventEmitter } from "events";
import { ButtplugClient } from "../src/index";
import { TestDeviceManager } from "../src/devtools";
import { SetupTestSuite } from "./utils";

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
    case "ServerInfo": {
      // TODO: maybe store server name, do something with message template version?
      return true;
    }
    case "Error": {
      this._connector!.Disconnect();
    }
    }
    return false;
  }
}

describe("Server Tests", async () => {
  let bpServer: ButtplugServer;
  beforeEach(async () => {
    bpServer = new ButtplugServer("Test Server", 0);
    bpServer.AddDeviceManager(TestDeviceManager.Get());
  });

  it("Should downgrade messages", async () => {
    const bpConnector = new ButtplugEmbeddedServerConnector();
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
        expect(aMsgs).toEqual([new Messages.DeviceAddedVersion0(1,
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

});
