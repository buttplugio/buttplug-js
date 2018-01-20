import { WebBluetoothMock, DeviceMock, CharacteristicMock, PrimaryServiceMock, GattMock } from "web-bluetooth-mock";
import { ButtplugLogger, ButtplugLogLevel } from "../src/core/Logging";
import { ButtplugClient } from "../src/client/Client";
import { BPTestClient, SetupTestSuite } from "./utils";
import { VibrateCmd, SpeedSubcommand } from "../src/index";

SetupTestSuite();

describe("WebBluetooth library tests", () => {
  let p;
  let res;
  let rej;
  let bp;
  let gatt: GattMock;
  let device: DeviceMock;
  let service: PrimaryServiceMock;
  let tx: CharacteristicMock;
  let rx: CharacteristicMock;
  let bluetooth: WebBluetoothMock;

  beforeEach(() => {
    p = new Promise((resolve, reject) => { res = resolve; rej = reject; });
    // Mock an actual buttplug (Lovense Hush)!
    device = new DeviceMock("LVS-Z36", ["5a300001-0024-4bd4-bbd5-a6920e4c5653"]);
    gatt = device.gatt;
    service = device.getServiceMock("5a300001-0024-4bd4-bbd5-a6920e4c5653");
    tx = service.getCharacteristicMock("5a300002-0024-4bd4-bbd5-a6920e4c5653");
    rx = service.getCharacteristicMock("5a300003-0024-4bd4-bbd5-a6920e4c5653");
    const g = global as any;
    g.navigator = g.navigator || {};
    bluetooth = new WebBluetoothMock([device]);
    g.navigator.bluetooth = bluetooth;
    bp = new ButtplugClient("Bluetooth Test Client");
    bp.ConnectLocal();
  });

  it("should find webbluetooth, add manager, discover device", async () => {
    jest.spyOn(bluetooth, "requestDevice");
    jest.spyOn(gatt, "connect");
    await bp.StartScanning();
    expect(bluetooth.requestDevice).toHaveBeenCalled();
    expect(gatt.connect).toHaveBeenCalled();
  });

  it("should emit device removed on disconnect", async () => {
    bp.on("deviceremoved", () => res());
    await bp.StartScanning();
    await bp.StopScanning();
    device.dispatchEvent(new Event("gattserverdisconnected"));
    return p;
  });

  it("should write value to port on message", async () => {
    await bp.StartScanning();
    await bp.StopScanning();
    jest.spyOn(tx, "writeValue");
    await bp.SendDeviceMessage(bp.Devices[0], new VibrateCmd([new SpeedSubcommand(0, 1)]));
    expect(tx.writeValue).toBeCalledWith(Buffer.from("Vibrate:20;"));
  });

  it("should stop scanning on requestdevice being cancelled", async () => {
    bp.on("scanningfinished", () => res());
    bluetooth.requestDevice = () => {
      throw new Error("User cancelled");
    };
    await bp.StartScanning();
    return p;
  });

});
