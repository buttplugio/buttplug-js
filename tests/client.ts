import { Device, ButtplugClient, FromJSON, ButtplugLogger,
         ButtplugLogLevel, ButtplugServer, ButtplugEmbeddedServerConnector } from "../src/index";
import { TestDeviceManager, CreateDevToolsClient } from "../src/devtools/index";
import * as Messages from "../src/core/Messages";

describe("Client Tests", async () => {
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

  beforeEach(() => {
    jest.setTimeout(1000);
    p = new Promise((resolve, reject) => { res = resolve; rej = reject; });
  });

  const SetupServer = async (): Promise<ButtplugClient> => {
    const bp = new ButtplugClient("Test Buttplug Client");
    await bp.ConnectLocal();
    return bp;
  };

  it("Should emit a log message on requestlog (testing basic event emitters)", async () => {
    const bp = await SetupServer();
    await bp.RequestLog("Error");
    process.nextTick(() => {
      bp.on("log", (x) => {
        expect(x).toEqual(new Messages.Log("Error", "Test"));
        // Turn logging events back off.
        ButtplugLogger.Logger.MaximumEventLogLevel = ButtplugLogLevel.Off;
        res();
      });
      ButtplugLogger.Logger.Error("Test");
    });
    return p;
  });

  it("Should emit a device on addition", async () => {
    const bp = await CreateDevToolsClient();
    const tdm = TestDeviceManager.Get();
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
    server.AddDeviceManager(TestDeviceManager.Get());
    TestDeviceManager.Get().ConnectLinearDevice();
    const localConnector = new ButtplugEmbeddedServerConnector();
    localConnector.Server = server;
    await client.Connect(localConnector);
    return p;
  });

  it("Should emit when device scanning is over", async () => {
    const bp = await CreateDevToolsClient();
    const tdm = TestDeviceManager.Get();
    bp.on("scanningfinished", (x) => {
      res();
    });
    await bp.StartScanning();
    return p;
  });

  it("Should allow correct device messages and reject unauthorized", async () => {
    let device;
    const bp = await CreateDevToolsClient();
    bp.on("deviceadded", async (x: Device) => {
      // The test server will always return the vibrator first if we use
      // StartScanning.
      if (x.Index !== 1) {
        return;
      }
      device = x;
      await bp.SendDeviceMessage(x, new Messages.SingleMotorVibrateCmd(1.0));
      expect(async () => await bp.SendDeviceMessage(x, new Messages.KiirooCmd("2"))).toThrow();
      res();
    });
    await bp.StartScanning();
    return p;
  });

  it("Should reject schema violating message", async () => {
    let device;
    const bp = await CreateDevToolsClient();
    bp.on("deviceadded", async (x) => {
      // The test server will always return the vibrator first if we use
      // StartScanning.
      if (x.Index !== 1) {
        return;
      }
      device = x;
      expect(async () => await bp.SendDeviceMessage(x, new Messages.SingleMotorVibrateCmd(50))).toThrow();
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
    bplocal.addListener("disconnect", () => { res(); });
    await bplocal.ConnectLocal();
    await expect(bplocal.StartScanning()).rejects.toThrow();
    bplocal.Disconnect();
  });
});
