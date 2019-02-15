import { Server } from "mock-socket";
import { ButtplugClient } from "../src/client/Client";
import * as Messages from "../src/core/Messages";
import { ButtplugLogLevel } from "../src/core/Logging";
import { FromJSON } from "../src/core/MessageUtils";
import { SetupTestSuite } from "./utils";
import { ButtplugMessageException } from "../src";

SetupTestSuite();

describe("Websocket Client Tests", async () => {
  let mockServer: Server;
  let bp: ButtplugClient;
  let p;
  let res;
  let rej;
  class BPTestClient extends ButtplugClient {
    constructor(ClientName: string) {
      super(ClientName);
    }
    public get PingTimer() {
      return this._pingTimer;
    }
  }
  beforeEach(async () => {
    mockServer = new Server("ws://localhost:6868");
    p = new Promise((resolve, reject) => { res = resolve; rej = reject; });
    const serverInfo = (jsonmsg: string) => {
      const msg: Messages.ButtplugMessage = FromJSON(jsonmsg)[0] as Messages.ButtplugMessage;
      if (msg.Type === Messages.RequestServerInfo) {
        delaySend(new Messages.ServerInfo(0, 0, 0, 1, 0, "Test Server", msg.Id));
      }
      if (msg.Type === Messages.RequestDeviceList) {
        delaySend(new Messages.DeviceList([], msg.Id));
        mockServer.removeEventListener("message", serverInfo);
      }
    };
    mockServer.on("message", serverInfo);
    bp = new ButtplugClient("Test Buttplug Client");
    await bp.ConnectWebsocket("ws://localhost:6868");
  });

  afterEach(function(done) {
    mockServer.stop(done);
  });

  function delaySend(aMsg: Messages.ButtplugMessage) {
    process.nextTick(() => mockServer.send("[" + aMsg.toJSON() + "]"));
  }

  it("Should deal with request/reply correctly", async () => {
    mockServer.on("message", (jsonmsg: string) => {
      const msg: Messages.ButtplugMessage = FromJSON(jsonmsg)[0] as Messages.ButtplugMessage;
      delaySend(new Messages.Ok(msg.Id));
    });
    await bp.StartScanning();
    await bp.StopScanning();
  });

  it("Should receive disconnect event on websocket disconnect", async () => {
    bp.addListener("disconnect", () => { res(); });
    mockServer.close();
    return p;
  });

  it("Should throw exception on return of error message", async () => {
    mockServer.on("message", (jsonmsg: string) => {
      const msg: Messages.ButtplugMessage = FromJSON(jsonmsg)[0] as Messages.ButtplugMessage;
      if (msg.Type === Messages.RequestLog) {
        delaySend(new Messages.Error("Error", Messages.ErrorClass.ERROR_MSG, msg.Id));
      }
    });
    await expect(bp.RequestLog("Debug")).rejects.toBeInstanceOf(ButtplugMessageException);
  });
});
