import { ButtplugNodeWebsocketServer, ButtplugNodeWebsocketClientConnector } from "../src/index";
import { ButtplugClient, ButtplugServer, Test } from "buttplug";
import { TestDeviceSubtypeManager } from "buttplug";
const selfsigned = require("selfsigned");
const tmp = require("tmp");
import * as fs from "fs";

describe("Buttplug Node Websocket tests", () => {

  let _insecureConnector: ButtplugNodeWebsocketClientConnector;
  let _secureConnector: ButtplugNodeWebsocketClientConnector;
  let _server: ButtplugNodeWebsocketServer;
  // Use a random port, otherwise things can get jammed up on CI for some reason.
  const _port = 1024 + getRandomInt(65535 - 1024);

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  beforeEach(() => {
    _server = new ButtplugNodeWebsocketServer("Buttplug Test Websocket Server");
    _insecureConnector =
      new ButtplugNodeWebsocketClientConnector(`ws://127.0.0.1:${_port}/buttplug`, false);
    _secureConnector =
      new ButtplugNodeWebsocketClientConnector(`wss://127.0.0.1:${_port}/buttplug`, false);
  });

  afterEach(async () => {
    await _insecureConnector.Disconnect();
    await _secureConnector.Disconnect();
    if (_server !== null && _server.IsRunning) {
      await _server.StopServer();
    }
  });

  it("should throw on erroneous connector states", async () => {
    await expect(_insecureConnector.Send(new Test("This should throw", 1))).rejects.toThrow();
  });
  it("should connect insecurely to itself, scan, find test devices", async function() {
    const deviceManager = new TestDeviceSubtypeManager();
    _server.AddDeviceManager(deviceManager);
    // Insecure hosting, on 127.0.0.1:_port
    _server.StartInsecureServer(_port, "127.0.0.1");

    const bpc = new ButtplugClient("test");
    await bpc.Connect(_insecureConnector);
    let res;
    let rej;
    let p = new Promise((resolve, reject) => { res = resolve; rej = reject; });
    bpc.on("deviceadded", () => {
      res();
    });
    await bpc.StartScanning();
    await p;
    await bpc.StopScanning();
    p = new Promise((resolve, reject) => { res = resolve; rej = reject; });
    bpc.on("scanningfinished", () => {
      res();
    });
    await p;
    p = new Promise((resolve, reject) => { res = resolve; rej = reject; });
    bpc.on("deviceremoved", async () => {
      await bpc.Disconnect();
      res();
    });
    deviceManager.VibrationDevice.Disconnect();
    return p;
  });

  it("should disconnect cleanly from client side", async function() {
    // Insecure hosting, on 127.0.0.1:_port
    _server.StartInsecureServer(_port, "127.0.0.1");

    const bpc = new ButtplugClient("test");
    await bpc.Connect(_insecureConnector);
    expect(bpc.Connected).toBe(true);
    await bpc.Disconnect();
    expect(bpc.Connected).toBe(false);
  });

  it("should be able to start/stop multiple times", async () => {
    // Insecure hosting, on 127.0.0.1:_port
    _server.StartInsecureServer(_port, "127.0.0.1");

    let bpc = new ButtplugClient("test");
    await bpc.Connect(_insecureConnector);
    expect(bpc.Connected).toBe(true);
    await bpc.Disconnect();
    expect(bpc.Connected).toBe(false);
    await _server.StopServer();

    // Insecure hosting, on 127.0.0.1:_port
    _server.StartInsecureServer(_port, "127.0.0.1");

    bpc = new ButtplugClient("test");
    await bpc.Connect(_insecureConnector);
    expect(bpc.Connected).toBe(true);
    await bpc.Disconnect();
    expect(bpc.Connected).toBe(false);
  });

  // Test commented out because it will always cause jest to stall after completion.
  it("should connect securely", async () => {
    const attrs = [{ name: "commonName", value: "buttplugtest.com" }];
    const pems = selfsigned.generate(attrs, { days: 365, keySize: 2048 });
    const tmpcert = tmp.fileSync();
    const tmpprivate = tmp.fileSync();
    fs.writeFileSync(tmpcert.name, pems.cert);
    fs.writeFileSync(tmpprivate.name, pems.private);
    _server.StartSecureServer(tmpcert.name, tmpprivate.name, _port, "127.0.0.1");

    const bpc = new ButtplugClient("test");
    await bpc.Connect(_secureConnector);
    expect(bpc.Connected).toBe(true);
    await bpc.Disconnect();
    expect(bpc.Connected).toBe(false);
    tmpcert.removeCallback();
    tmpprivate.removeCallback();
  });
});
