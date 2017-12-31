import { expect } from "chai";
import "mocha";
import { Server } from "mock-socket";
import { ButtplugClient } from "../../src/client/Client";
import * as Messages from "../../src/core/Messages";
import { FromJSON } from "../../src/core/MessageUtils";

describe("Client Tests", async () => {
  let mockServer: Server;
  let bp: ButtplugClient;
  let p;
  let res;
  let rej;
  beforeEach(async () => {
    mockServer = new Server("ws://localhost:6868");
    p = new Promise((resolve, reject) => { res = resolve; rej = reject; });
    const serverInfo = (jsonmsg: string) => {
      const msg: Messages.ButtplugMessage = FromJSON(jsonmsg)[0] as Messages.ButtplugMessage;
      delaySend(new Messages.ServerInfo(0, 0, 0, 1, 0, "Test Server", msg.Id));
      mockServer.removeEventListener("message", serverInfo);
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
  it("Should emit a log message on requestlog (testing basic event emitters)", async () => {
    mockServer.on("message", (jsonmsg: string) => {
      const msg: Messages.ButtplugMessage = FromJSON(jsonmsg)[0] as Messages.ButtplugMessage;
      delaySend(new Messages.Ok(msg.Id));
      delaySend(new Messages.Log("Trace", "Test"));
    });

    const finishTestPromise = new Promise((resolve) => { res = resolve; });
    bp.on("log", (x) => {
      expect(x).to.deep.equal(new Messages.Log("Trace", "Test"));
      res();
    });
    await bp.RequestLog("Trace");
    return finishTestPromise;
  });

  it("Should emit a device on addition", async () => {
    mockServer.on("message", (jsonmsg: string) => {
      const msg: Messages.ButtplugMessage = FromJSON(jsonmsg)[0] as Messages.ButtplugMessage;
      expect(msg.constructor.name).to.equal("StartScanning");
      delaySend(new Messages.Ok(msg.Id));
      delaySend(new Messages.DeviceAdded(0,
                                         "Test Device",
                                         {SingleMotorVibrateCmd: {}}));
    });
    bp.on("deviceadded", (x) => {
      delaySend(new Messages.DeviceRemoved(0));
    });
    bp.on("deviceremoved", (x) => {
      res();
    });
    await bp.StartScanning();
    return p;
  });

  it("Should emit a device when device list request received with new devices", async () => {
    mockServer.on("message", (jsonmsg: string) => {
      const msg: Messages.ButtplugMessage = FromJSON(jsonmsg)[0] as Messages.ButtplugMessage;
      delaySend(
        new Messages.DeviceList([new Messages.DeviceInfoWithSpecifications(0,
                                                                           "Test Device",
                                                                           {SingleMotorVibrateCmd: {}})],
                                msg.Id));
    });
    bp.on("deviceadded", (x) => {
      res();
    });
    await bp.RequestDeviceList();
    return p;
  });

  it("Should emit when device scanning is over", async () => {
    mockServer.on("message", (jsonmsg: string) => {
      const msg: Messages.ButtplugMessage = FromJSON(jsonmsg)[0] as Messages.ButtplugMessage;
      delaySend(new Messages.Ok(msg.Id));
      delaySend(new Messages.ScanningFinished());
    });
    bp.on("scanningfinished", (x) => {
      res();
    });
    await bp.StartScanning();
    return p;
  });

  it("Should allow correct device messages and reject unauthorized", async () => {
    mockServer.on("message", (jsonmsg: string) => {
      const msg: Messages.ButtplugMessage = FromJSON(jsonmsg)[0] as Messages.ButtplugMessage;
      delaySend(new Messages.Ok(msg.Id));
      if (msg.getType() === "StartScanning") {
        delaySend(new Messages.DeviceAdded(0,
                                           "Test Device",
                                           {SingleMotorVibrateCmd: {}}));
      }
      if (msg instanceof Messages.ButtplugDeviceMessage) {
        expect(msg.DeviceIndex).to.equal(0);
      }
    });
    let device;
    bp.on("deviceadded", async (x) => {
      device = x;
      await bp.SendDeviceMessage(x, new Messages.SingleMotorVibrateCmd(1.0));
      try {
        await bp.SendDeviceMessage(x, new Messages.KiirooCmd("2"));
        throw Error("Should've thrown!");
      } catch (_) {
        res();
      }
    });
    await bp.StartScanning();
    return p;
  });
  it("Should reject schema violating message", async () => {
    mockServer.on("message", (jsonmsg: string) => {
      const msg: Messages.ButtplugMessage = FromJSON(jsonmsg)[0] as Messages.ButtplugMessage;
      delaySend(new Messages.Ok(msg.Id));
      if (msg.getType() === "StartScanning") {
        delaySend(new Messages.DeviceAdded(0,
                                           "Test Device",
                                           {SingleMotorVibrateCmd: {}}));
      }
      if (msg instanceof Messages.ButtplugDeviceMessage) {
        expect(msg.DeviceIndex).to.equal(0);
      }
    });
    let device;
    bp.on("deviceadded", async (x) => {
      device = x;
      try {
        await bp.SendDeviceMessage(x, new Messages.SingleMotorVibrateCmd(50));
        rej(new Error("Should've thrown!"));
      } catch (_) {
        res();
      }
    });
    await bp.StartScanning();
    return p;
  });
  it("Should receive disconnect event on disconnect", async () => {
    const bplocal = new ButtplugClient("Test Client");
    bplocal.addListener("disconnect", () => { res(); });
    await bplocal.ConnectLocal();
    bplocal.Disconnect();
    return p;
  });
  it("Should receive disconnect event on websocket disconnect", async () => {
    bp.addListener("disconnect", () => { res(); });
    mockServer.close();
    return p;
  });
});
