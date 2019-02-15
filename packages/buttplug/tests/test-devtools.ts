import { SetupTestSuite, SetupTestServer } from "./utils";
import { TestDeviceManager, CreateDevToolsClient } from "../src/devtools/index";
import { SingleMotorVibrateCmd, FleshlightLaunchFW12Cmd, LinearCmd, VibrateCmd,
         SpeedSubcommand, VectorSubcommand, ButtplugServer, ButtplugEmbeddedServerConnector,
         ButtplugClient, ButtplugClientDevice } from "../src/index";

describe("devtools tests", () => {
  let p;
  let res;
  let rej;

  function resetTestPromise() {
    p = new Promise((resolve, reject) => { res = resolve; rej = reject; });
  }

  beforeEach(() => {
    resetTestPromise();
  });

  it("should translate test device calls correctly", async () => {
    const testserver = await SetupTestServer();
    const bp = testserver.Client;
    const tdm = testserver.TestDeviceManager;
    let deviceCount = 0;
    bp.on("deviceadded", (x) => {
      deviceCount += 1;
      if (deviceCount === 2) {
        res();
      }
    });
    await bp.StartScanning();
    await p;
    const vibrateDevice = tdm.VibrationDevice;
    const linearDevice = tdm.LinearDevice;
    resetTestPromise();

    vibrateDevice.on("vibrate", (speed) => {
      res(speed);
    });
    await bp.SendDeviceMessage(bp.Devices[0], new SingleMotorVibrateCmd(1));
    await expect(p).resolves.toBe(1);
    resetTestPromise();
    vibrateDevice.removeAllListeners();

    vibrateDevice.on("vibrate", (speed) => {
      res(speed);
    });
    await bp.SendDeviceMessage(bp.Devices[0], new VibrateCmd([new SpeedSubcommand(0, 0.5)]));
    await expect(p).resolves.toBe(0.5);
    resetTestPromise();
    vibrateDevice.removeAllListeners();

    vibrateDevice.on("vibrate", (speed) => {
      res(speed);
    });
    await bp.StopAllDevices();
    await expect(p).resolves.toBe(0);
    resetTestPromise();
    vibrateDevice.removeAllListeners();

    linearDevice.on("linear", (obj) => {
      res(obj);
    });
    await bp.SendDeviceMessage(bp.Devices[1], new FleshlightLaunchFW12Cmd(50, 50));
    await expect(p).resolves.toEqual({position: 50, speed: 50});
    resetTestPromise();
    linearDevice.removeAllListeners();

    linearDevice.on("linear", (obj) => {
      res(obj);
    });
    await bp.SendDeviceMessage(bp.Devices[1], new LinearCmd([new VectorSubcommand(0, .25, 300)]));
    await expect(p).resolves.toEqual({position: 27, speed: 16});
    resetTestPromise();
    linearDevice.removeAllListeners();

    linearDevice.on("linear", (obj) => {
      res(obj);
    });
    await bp.StopAllDevices();
    await expect(p).resolves.toEqual({position: 27, speed: 16});
  });

  it("should list allowed messages correctly when devices are added manually", async () => {
    const server = new ButtplugServer();
    const serverConnector = new ButtplugEmbeddedServerConnector();
    const testDeviceManager = new TestDeviceManager();
    server.AddDeviceManager(testDeviceManager);
    serverConnector.Server = server;

    testDeviceManager.ConnectVibrationDevice();

    const buttplug = new ButtplugClient("Test Name");
    buttplug.addListener("deviceadded", (d: ButtplugClientDevice) => {
      expect(d.AllowedMessages).toEqual(["VibrateCmd", "SingleMotorVibrateCmd", "StopDeviceCmd"]);
      res();
    });
    await buttplug.Connect(serverConnector);

    await p;
  });
});
