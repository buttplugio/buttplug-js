import { Server, WebSocket, Client } from "mock-socket";
import { ButtplugClient } from "../src/client/Client";
import * as Messages from "../src/core/Messages";
import { ButtplugLogLevel } from "../src/core/Logging";
import { fromJSON } from "../src/core/MessageUtils";
import { SetupTestSuite } from "./utils";
import { ButtplugMessageError, ButtplugBrowserWebsocketClientConnector } from "../src";

SetupTestSuite();

describe("Websocket Client Tests", () => {
  let mockServer: Server;
  let socket: Client;
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
      const msg: Messages.ButtplugMessage = fromJSON(jsonmsg)[0] as Messages.ButtplugMessage;
      if (msg.Type === Messages.RequestServerInfo) {
        delaySend(new Messages.ServerInfo(3, 0, "Test Server", msg.Id));
      }
      if (msg.Type === Messages.RequestDeviceList) {
        delaySend(new Messages.DeviceList([], msg.Id));
        // (socket as any).removeListener("message", serverInfo);
      }
    };
    mockServer.on("connection", (connectedSocket: Client) => {
      socket = connectedSocket;
      // TODO Bug in typescript defs for mock-socket 8 means we can't use the
      // socket type as it was meant. See
      // https://github.com/thoov/mock-socket/issues/224
      (socket as any).on("message", (data: string) => serverInfo(data));
    });
    bp = new ButtplugClient("Test Buttplug Client");
    await bp.connect(new ButtplugBrowserWebsocketClientConnector("ws://localhost:6868"));
  });

  afterEach(function(done) {
    mockServer.stop(done);
  });

  function delaySend(msg: Messages.ButtplugMessage) {
    process.nextTick(() => socket.send("[" + msg.toJSON() + "]"));
  }

  it("Should deal with request/reply correctly", async () => {
    (socket as any).on("message", (jsonmsg: string) => {
      const msg: Messages.ButtplugMessage = fromJSON(jsonmsg)[0] as Messages.ButtplugMessage;
      delaySend(new Messages.Ok(msg.Id));
    });
    await bp.startScanning();
    await bp.stopScanning();
  });

  it("Should receive disconnect event on websocket disconnect", async () => {
    bp.addListener("disconnect", () => { res(); });
    mockServer.close();
    return p;
  });

  it("Should throw Error on return of error message", async () => {
    (socket as any).on("message", (jsonmsg: string) => {
      const msg: Messages.ButtplugMessage = fromJSON(jsonmsg)[0] as Messages.ButtplugMessage;
      if (msg.Type === Messages.StopAllDevices) {
        delaySend(new Messages.Error("Error", Messages.ErrorClass.ERROR_MSG, msg.Id));
      }
    });
    await expect(bp.stopAllDevices()).rejects.toBeInstanceOf(ButtplugMessageError);
  });

  it("Should throw Error on TCPCONNECTREFUSED", async () => {
    const connector = new ButtplugBrowserWebsocketClientConnector("ws://localhost:31000")
    try {
      await connector.connect();
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});
