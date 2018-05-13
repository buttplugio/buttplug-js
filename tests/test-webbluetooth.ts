import { WebBluetoothMock, DeviceMock, CharacteristicMock, PrimaryServiceMock, GattMock } from "web-bluetooth-mock";
import { ButtplugLogger, ButtplugLogLevel } from "../src/core/Logging";
import { ButtplugClient } from "../src/client/Client";
import { BPTestClient, SetupTestSuite, WebBluetoothMockObject, MakeMockWebBluetoothDevice } from "./utils";
import { VibrateCmd, SpeedSubcommand } from "../src/index";
import { Lovense } from "../src/server/bluetooth/devices/Lovense";

SetupTestSuite();

describe("WebBluetooth library tests", () => {
  let p;
  let res;
  let rej;
  let bp;
  let mockBT: WebBluetoothMockObject;
  let bluetooth: WebBluetoothMock;

  beforeEach(async () => {
    p = new Promise((resolve, reject) => { res = resolve; rej = reject; });
    // Mock an actual buttplug (Lovense Hush)!
    mockBT = MakeMockWebBluetoothDevice(Lovense.DeviceInfo);
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
      throw new Error("User cancelled");
    };
    await bp.StartScanning();
    return p;
  });

  it("should stop scanning on device not opening", async () => {
    bp.on("scanningfinished", () => res());
    mockBT.gatt.connect = () => {
      throw new Error("Connection error");
    };
    await expect(bp.StartScanning()).rejects.toThrow();
    return p;
  });

});
