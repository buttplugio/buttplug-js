import { WebBluetoothMock, DeviceMock, CharacteristicMock, PrimaryServiceMock, GattMock } from "web-bluetooth-mock";
import { ButtplugLogger, ButtplugLogLevel } from "../src/core/Logging";
import { ButtplugClient } from "../src/client/Client";
import { BPTestClient, SetupTestSuite, WebBluetoothMockObject, MakeMockWebBluetoothDevice,
         SetupLovenseTestDevice } from "./utils";
import { VibrateCmd, SpeedSubcommand, ErrorClass } from "../src/index";
import { Lovense } from "../src/server/bluetooth/devices/Lovense";
import { ButtplugDeviceException } from "../src/core/Exceptions";

SetupTestSuite();

describe("WebBluetooth library tests", () => {
  let p;
  let res;
  let bp: ButtplugClient;
  let mockBT: WebBluetoothMockObject;
  let bluetooth: WebBluetoothMock;

  beforeEach(async () => {
    p = new Promise((resolve) => { res = resolve; });
    // We assume we're using a lovense device for all tests here so set it up.
    mockBT = MakeMockWebBluetoothDevice(Lovense.DeviceInfo);
    SetupLovenseTestDevice(mockBT);
    const g = global as any;
    g.navigator = g.navigator || {};
    bluetooth = new WebBluetoothMock([mockBT.device]);
    g.navigator.bluetooth = bluetooth;
    bp = new ButtplugClient("Bluetooth Test Client");
    await bp.ConnectLocal();
  });

  it("should find webbluetooth, add manager, discover device", async () => {
    jest.spyOn(bluetooth, "requestDevice");
    jest.spyOn(mockBT.gatt, "connect");
    await bp.StartScanning();
    expect(bluetooth.requestDevice).toHaveBeenCalled();
    expect(mockBT.gatt.connect).toHaveBeenCalled();
  });

  it("should emit device removed on disconnect", async () => {
    bp.on("deviceremoved", () => res());
    await bp.StartScanning();
    await bp.StopScanning();
    mockBT.device.dispatchEvent(new Event("gattserverdisconnected"));
    return p;
  });

  it("should write value to port on message", async () => {
    await bp.StartScanning();
    await bp.StopScanning();
    jest.spyOn(mockBT.txChar, "writeValue");
    await bp.SendDeviceMessage(bp.Devices[0], new VibrateCmd([new SpeedSubcommand(0, 1)]));
    expect(mockBT.txChar.writeValue).toBeCalledWith(Buffer.from("Vibrate:20;"));
  });

  it("should stop scanning on requestdevice being cancelled", async () => {
    bp.on("scanningfinished", () => res());
    bluetooth.requestDevice = () => {
      throw new ButtplugDeviceException("User cancelled");
    };
    await bp.StartScanning();
    return p;
  });

  it("should stop scanning on device not opening", async () => {
    bp.on("scanningfinished", () => res());
    mockBT.gatt.connect = () => {
      throw new Error("Injected connection error");
    };
    // Make sure we at least have the right error code. Id and message may vary.
    await expect(bp.StartScanning())
      .rejects
      .toEqual(new Error("Cannot open device LVS-test: Error: Injected connection error"));
    return p;
  });

  it("should subscribe on connect for lovense device, unsubscribe on disconnect", async () => {
    jest.spyOn(mockBT.rxChar, "startNotifications");
    jest.spyOn(mockBT.rxChar, "stopNotifications");
    await bp.StartScanning();
    await bp.StopScanning();
    expect(mockBT.rxChar.startNotifications).toBeCalled();
    await bp.Disconnect();
    expect(mockBT.rxChar.stopNotifications).toBeCalled();
  });
});
