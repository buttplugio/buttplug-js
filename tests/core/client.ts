import * as Messages from "../../src/core/messages";
import { ButtplugClient } from "../../src/core/client";
import { Server } from 'mock-socket';
import { expect } from "chai";
import 'mocha';

describe("Client Tests", async () => {
  let mockServer: Server;
  let bp: ButtplugClient;
  let p, res;
  beforeEach(function() {
    mockServer = new Server("ws://localhost:6868");
    bp = new ButtplugClient();
    bp.Connect("ws://localhost:6868");
    p = new Promise((resolve) => { res = resolve; });
  });
  afterEach(function(done) {
    mockServer.stop(done);
  });

  function delaySend(aMsg: Messages.ButtplugMessage) {
    setTimeout(() => {
      mockServer.send("[" + aMsg.toJSON() + "]");
    }, 0);
  }

  it("Should deal with request/reply correctly", async () => {
    mockServer.on('message', (jsonmsg: string) => {
      let msg: Messages.ButtplugMessage = Messages.FromJSON(jsonmsg)[0] as Messages.ButtplugMessage;
      delaySend(new Messages.Ok(msg.Id));
    });
    await bp.StartScanning();
    await bp.StopScanning();
  });
  it("Should emit a log message on requestlog (testing basic event emitters)", async () => {
    mockServer.on('message', (jsonmsg: string) => {
      let msg: Messages.ButtplugMessage = Messages.FromJSON(jsonmsg)[0] as Messages.ButtplugMessage;
      delaySend(new Messages.Ok(msg.Id));
      delaySend(new Messages.Log("Trace", "Test"));
    });

    let p = new Promise((resolve) => { res = resolve; });
    bp.on('log', (x) => {
      expect(x).to.deep.equal(new Messages.Log("Trace", "Test"));
      res();
    });
    await bp.RequestLog('Trace');
    return p;
  });

  it("Should emit a device on addition", async () => {
    mockServer.on('message', (jsonmsg: string) => {
      let msg: Messages.ButtplugMessage = Messages.FromJSON(jsonmsg)[0] as Messages.ButtplugMessage;
      delaySend(new Messages.Ok(msg.Id));
      delaySend(new Messages.DeviceAdded(0, "Test Device", ["SingleMotorVibrateCmd"]));
    });
    bp.on('deviceadded', (x) => {
      delaySend(new Messages.DeviceRemoved(0));
    });
    bp.on('deviceremoved', (x) => {
      res();
    })
    await bp.StartScanning();
    return p;
  });

  it("Should emit a device when device list request received with new devices", async () => {
    mockServer.on('message', (jsonmsg: string) => {
      let msg: Messages.ButtplugMessage = Messages.FromJSON(jsonmsg)[0] as Messages.ButtplugMessage;
      delaySend(new Messages.DeviceList([new Messages.DeviceInfo(0, "Test Device", ["SingleMotorVibrateCmd"])], msg.Id));
    });
    bp.on('deviceadded', (x) => {
      res();
    });
    await bp.RequestDeviceList();
    return p;
  });

  it("Should allow correct device messages and reject unauthorized", async () => {
    mockServer.on('message', (jsonmsg: string) => {
      let msg: Messages.ButtplugMessage = Messages.FromJSON(jsonmsg)[0] as Messages.ButtplugMessage;
      delaySend(new Messages.Ok(msg.Id));
      if (msg.getType() == 'StartScanning') {
        delaySend(new Messages.DeviceAdded(0, "Test Device", ["SingleMotorVibrateCmd"]));
      }
      if (msg instanceof Messages.ButtplugDeviceMessage)
      {
        expect(msg.DeviceIndex).to.equal(0);
      }
    });
    let device;
    bp.on('deviceadded', async (x) => {
      device = x;
      await bp.SendDeviceMessage(x, new Messages.SingleMotorVibrateCmd(1.0));
      try
      {
        await bp.SendDeviceMessage(x, new Messages.KiirooRawCmd(2));
        throw Error("Should've thrown!");
      }
      catch(_)
      {
        res();
      }
    });
    await bp.StartScanning();
    return p;
  });
});
