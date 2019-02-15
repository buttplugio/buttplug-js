import { ButtplugClientDevice, ButtplugClient, FromJSON, ButtplugLogger, CheckMessage,
         ButtplugLogLevel, ButtplugServer, ButtplugEmbeddedServerConnector } from "../src/index";
import { TestDeviceManager, CreateDevToolsClient } from "../src/devtools/index";
import * as Messages from "../src/core/Messages";
import { BPTestClient, SetupTestSuite, SetupTestServer } from "./utils";
import { ButtplugMessageException, ButtplugDeviceException } from "../src/core/Exceptions";

SetupTestSuite();

describe("Client Tests", async () => {
  let p;
  let res;
  let rej;

  beforeEach(() => {
    p = new Promise((resolve, reject) => { res = resolve; rej = reject; });
  });

  async function SetupServer(): Promise<BPTestClient> {
    const bp = new BPTestClient("Test Buttplug Client");
    await bp.ConnectLocal();
    return bp;
  }

  it("Should return a test message.", async () => {
    const bp = await SetupServer();
    await expect(bp.SendMessage(new Messages.Test("Test")))
      .resolves
      .toEqual(new Messages.Test("Test"));
  });

  it("Should emit a log message on requestlog (testing basic event emitters)", async () => {
    const bp = await SetupServer();
    await bp.RequestLog("Error");
    let called = false;
    process.nextTick(() => {
      bp.on("log", async (x) => {
        // This will fire if we get another log message after turning things off.
        if (called) {
          rej();
        }
        called = true;
        expect(x).toEqual(new Messages.Log("Error", "Test"));
        // Turn logging events back off.
        await bp.RequestLog("Off");
        // Make sure we don't get called again.
        ButtplugLogger.Logger.Error("Test");
        bp.removeAllListeners();
        res();
      });
      // We shouldn't see this one.
      ButtplugLogger.Logger.Trace("Test");
      ButtplugLogger.Logger.Error("Test");
    });
    return p;
  });

  it("Should emit a device on addition", async () => {
    const connector = await SetupTestServer();
    const tdm = connector.TestDeviceManager;
    const server = connector.Server;
    const bp = connector.Client;
    bp.on("deviceadded", (x) => {
      tdm.VibrationDevice.Disconnect();
    });
    bp.on("deviceremoved", (x) => {
      res();
    });
    await bp.StartScanning();
    return p;
  });

  it("Should emit a device on connection when device already attached", async () => {
    const client = new ButtplugClient("Test Client");
    client.on("deviceadded", (x) => {
      res();
    });
    const server = new ButtplugServer("Test Server");
    const tdm = new TestDeviceManager();
    server.AddDeviceManager(tdm);
    tdm.ConnectLinearDevice();
    const localConnector = new ButtplugEmbeddedServerConnector();
    localConnector.Server = server;
    await client.Connect(localConnector);
    return p;
  });

  it("Should emit when device scanning is over", async () => {
    const bp = (await SetupTestServer()).Client;
    bp.on("scanningfinished", (x) => {
      bp.removeAllListeners("scanningfinished");
      res();
    });
    await bp.StartScanning();
    return p;
  });

  it("Should allow correct device messages and reject unauthorized", async () => {
    const bp = (await SetupTestServer()).Client;

    bp.on("scanningfinished", async () => {
      try {
        await bp.SendDeviceMessage(bp.Devices[0], new Messages.SingleMotorVibrateCmd(1.0));
      } catch (e) {
        rej();
      }

      await expect(bp.SendDeviceMessage(bp.Devices[0], new Messages.KiirooCmd(2)))
        .rejects
        .toBeInstanceOf(ButtplugDeviceException);
      res();
    });
    await bp.StartScanning();
    return p;
  });

  it("Should reject schema violating message", async () => {
    const bp: ButtplugClient = (await SetupTestServer()).Client;
    bp.on("scanningfinished", async (x) => {
      expect(bp.Devices.length).toBeGreaterThan(0);
      await expect(bp.SendDeviceMessage(bp.Devices[0], new Messages.SingleMotorVibrateCmd(50)))
        .rejects
        .toBeInstanceOf(ButtplugMessageException);
      res();
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

  it("Should shut down ping timer on disconnect", async () => {
    const bplocal = new BPTestClient("Test Client");
    bplocal.addListener("disconnect", () => {
      expect(bplocal.PingTimer).toEqual(null);
      res();
    });
    await bplocal.ConnectLocal();
    bplocal.Disconnect();
    return p;
  });

  it("Should get error on scanning when no device managers available.", async () => {
    const bplocal = new ButtplugClient("Test Client");
    await bplocal.ConnectLocal();
    await expect(bplocal.StartScanning()).rejects.toBeInstanceOf(ButtplugDeviceException);
  });
});
