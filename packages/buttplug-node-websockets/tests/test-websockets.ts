import { ButtplugNodeWebsocketServer, ButtplugNodeWebsocketClientConnector } from "../src/index";
import { ButtplugClient, ButtplugServer, Test } from "buttplug";
import { TestDeviceSubtypeManager } from "buttplug";
const selfsigned = require("selfsigned");
const tmp = require("tmp");
import * as fs from "fs";

describe("Buttplug Node Websocket tests", () => {

  let _insecureConnector: ButtplugNodeWebsocketClientConnector;
  let _secureConnector: ButtplugNodeWebsocketClientConnector;

  beforeEach(() => {
    _insecureConnector =
      new ButtplugNodeWebsocketClientConnector("ws://localhost:12345/buttplug", false);
    _secureConnector =
      new ButtplugNodeWebsocketClientConnector("wss://localhost:12345/buttplug", false);
  });

  afterEach(() => {
    _insecureConnector.Disconnect();
    _secureConnector.Disconnect();
  });

  it("should throw on erroneous connector states", async () => {
    expect(_insecureConnector.Send(new Test("This should throw", 1))).rejects.toThrow();
  });
  it("should connect insecurely to itself, scan, find test devices", async function() {
    const server = new ButtplugNodeWebsocketServer("Buttplug Test Websocket Server");
    const deviceManager = new TestDeviceSubtypeManager();
    server.AddDeviceManager(deviceManager);
    // Insecure hosting, on localhost:12345
    server.StartInsecureServer(12345, "localhost");

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
      bpc.Disconnect();
      await server.StopServer();
      res();
    });
    deviceManager.VibrationDevice.Disconnect();
    return p;
  });

  it("should disconnect cleanly from client side", async function() {
    const server = new ButtplugNodeWebsocketServer("Buttplug Test Websocket Server");
    // Insecure hosting, on localhost:12345
    server.StartInsecureServer(12345, "localhost");

    const bpc = new ButtplugClient("test");
    await bpc.Connect(_insecureConnector);
    expect(bpc.Connected).toBe(true);
    await bpc.Disconnect();
    expect(bpc.Connected).toBe(false);
    await server.StopServer();
  });

  it("should be able to start/stop multiple times", async () => {
    const server = new ButtplugNodeWebsocketServer("Buttplug Test Websocket Server");
    // Insecure hosting, on localhost:12345
    server.StartInsecureServer(12345, "localhost");

    let bpc = new ButtplugClient("test");
    await bpc.Connect(_insecureConnector);
    expect(bpc.Connected).toBe(true);
    await bpc.Disconnect();
    expect(bpc.Connected).toBe(false);
    await server.StopServer();

    // Insecure hosting, on localhost:12345
    server.StartInsecureServer(12345, "localhost");

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
    server.StartSecureServer(tmpcert.name, tmpprivate.name, 12345, "localhost");

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
