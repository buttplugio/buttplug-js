import { ButtplugNodeWebsocketServer, ButtplugNodeWebsocketClientConnector } from "../src/index";
import { ButtplugClient, ButtplugServer, Test } from "buttplug";
import { TestDeviceSubtypeManager } from "buttplug";
const selfsigned = require("selfsigned");
const tmp = require("tmp");
import * as fs from "fs";

describe("Buttplug Node Websocket tests", () => {

  let _insecureConnector: ButtplugNodeWebsocketClientConnector;
  let _secureConnector: ButtplugNodeWebsocketClientConnector;
  // Use a random port, otherwise things can get jammed up on CI for some reason.
  const _port = 1024 + getRandomInt(65535 - 1024);

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  beforeEach(() => {
    _insecureConnector =
      new ButtplugNodeWebsocketClientConnector(`ws://localhost:${_port}/buttplug`, false);
    _secureConnector =
      new ButtplugNodeWebsocketClientConnector(`wss://localhost:${_port}/buttplug`, false);
  });

  afterEach(async () => {
    await _insecureConnector.Disconnect();
    await _secureConnector.Disconnect();
  });

  it("should throw on erroneous connector states", async () => {
    await expect(_insecureConnector.Send(new Test("This should throw", 1))).rejects.toThrow();
  });
  it("should connect insecurely to itself, scan, find test devices", async function() {
    const server = new ButtplugNodeWebsocketServer("Buttplug Test Websocket Server");
    const deviceManager = new TestDeviceSubtypeManager();
    server.AddDeviceManager(deviceManager);
    // Insecure hosting, on localhost:_port
    server.StartInsecureServer(_port, "localhost");

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
      await server.StopServer();
      res();
    });
    deviceManager.VibrationDevice.Disconnect();
    return p;
  });

  it("should disconnect cleanly from client side", async function() {
    const server = new ButtplugNodeWebsocketServer("Buttplug Test Websocket Server");
    // Insecure hosting, on localhost:_port
    server.StartInsecureServer(_port, "localhost");

    const bpc = new ButtplugClient("test");
    await bpc.Connect(_insecureConnector);
    expect(bpc.Connected).toBe(true);
    await bpc.Disconnect();
    expect(bpc.Connected).toBe(false);
    await server.StopServer();
  });

  it("should be able to start/stop multiple times", async () => {
    const server = new ButtplugNodeWebsocketServer("Buttplug Test Websocket Server");
    // Insecure hosting, on localhost:_port
    server.StartInsecureServer(_port, "localhost");

    let bpc = new ButtplugClient("test");
    await bpc.Connect(_insecureConnector);
    expect(bpc.Connected).toBe(true);
    await bpc.Disconnect();
    expect(bpc.Connected).toBe(false);
    await server.StopServer();

    // Insecure hosting, on localhost:_port
    server.StartInsecureServer(_port, "localhost");

    bpc = new ButtplugClient("test");
    await bpc.Connect(_insecureConnector);
    expect(bpc.Connected).toBe(true);
    await bpc.Disconnect();
    expect(bpc.Connected).toBe(false);
    await server.StopServer();
  });

  // Test commented out because it will always cause jest to stall after completion.
  it("should connect securely", async () => {
    const attrs = [{ name: "commonName", value: "buttplugtest.com" }];
    const pems = selfsigned.generate(attrs, { days: 365 });
    const tmpcert = tmp.fileSync();
    const tmpprivate = tmp.fileSync();
    fs.writeFileSync(tmpcert.name, pems.cert);
    fs.writeFileSync(tmpprivate.name, pems.private);
    const server = new ButtplugNodeWebsocketServer("Buttplug Test Websocket Server");
    server.StartSecureServer(tmpcert.name, tmpprivate.name, _port, "localhost");

    const bpc = new ButtplugClient("test");
    await bpc.Connect(_secureConnector);
    expect(bpc.Connected).toBe(true);
    await bpc.Disconnect();
    expect(bpc.Connected).toBe(false);
    await server.StopServer();
    tmpcert.removeCallback();
    tmpprivate.removeCallback();
  });
});
