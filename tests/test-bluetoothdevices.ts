import { WebBluetoothMock, DeviceMock, CharacteristicMock, PrimaryServiceMock, GattMock } from "web-bluetooth-mock";
import { ButtplugLogger, ButtplugLogLevel } from "../src/core/Logging";
import { ButtplugClient } from "../src/client/Client";
import { BPTestClient, SetupTestSuite, WebBluetoothMockObject, MakeMockWebBluetoothDevice,
         SetupLovenseTestDevice } from "./utils";
import { VibrateCmd, RotateCmd, SpeedSubcommand, LinearCmd, VectorSubcommand, FleshlightLaunchFW12Cmd,
         DeviceInfo, BluetoothDeviceInfo, SingleMotorVibrateCmd, RotateSubcommand,
         VorzeA10CycloneCmd, ErrorClass, ButtplugDeviceException } from "../src/index";
import { Lovense } from "../src/server/bluetooth/devices/Lovense";
import { WeVibe } from "../src/server/bluetooth/devices/WeVibe";
import { FleshlightLaunch } from "../src/server/bluetooth/devices/FleshlightLaunch";
import { VorzeA10Cyclone } from "../src/server/bluetooth/devices/VorzeA10Cyclone";

SetupTestSuite();

describe("Bluetooth device tests", () => {
  let p;
  let res;
  let rej;
  let bp: ButtplugClient;
  let mockBT: WebBluetoothMockObject;
  let bluetooth: WebBluetoothMock;

  beforeEach(() => {
    p = new Promise((resolve, reject) => { res = resolve; rej = reject; });
  });

  const SetupDevice = async (deviceInfo: BluetoothDeviceInfo) => {
    const g = global as any;
    mockBT = MakeMockWebBluetoothDevice(deviceInfo);
    g.navigator = g.navigator || {};
    bluetooth = new WebBluetoothMock([mockBT.device]);
    g.navigator.bluetooth = bluetooth;
    bp = new ButtplugClient("Bluetooth Test Client");
    await bp.ConnectLocal();
  };

  it("should convert lovense commands properly", async () => {
    await SetupDevice(Lovense.DeviceInfo);
    SetupLovenseTestDevice(mockBT);
    await bp.StartScanning();
    await bp.StopScanning();
    expect(bp.Devices[0].Name).toEqual("Lovense Domi v01");
    jest.spyOn(mockBT.txChar, "writeValue");
    await expect(bp.SendDeviceMessage(bp.Devices[0],
                                      new VibrateCmd([new SpeedSubcommand(0, 1),
                                                      new SpeedSubcommand(1, 1)])))
      .rejects
      .toBeInstanceOf(ButtplugDeviceException);
    await bp.SendDeviceMessage(bp.Devices[0], new VibrateCmd([new SpeedSubcommand(0, 1)]));
    expect(mockBT.txChar.writeValue).toBeCalledWith(Buffer.from("Vibrate:20;"));
    await bp.SendDeviceMessage(bp.Devices[0], new SingleMotorVibrateCmd(.5));
    expect(mockBT.txChar.writeValue).toBeCalledWith(Buffer.from("Vibrate:10;"));
    await bp.StopAllDevices();
    expect(mockBT.txChar.writeValue).toBeCalledWith(Buffer.from("Vibrate:0;"));
  });

  it("should convert lovense edge vibrate commands properly", async () => {
    await SetupDevice(Lovense.DeviceInfo);
    SetupLovenseTestDevice(mockBT, "P");
    await bp.StartScanning();
    await bp.StopScanning();
    expect(bp.Devices[0].Name).toEqual("Lovense Edge v01");
    jest.spyOn(mockBT.txChar, "writeValue");
    await expect(bp.SendDeviceMessage(bp.Devices[0],
                                      new VibrateCmd([new SpeedSubcommand(0, 1),
                                                      new SpeedSubcommand(1, 1),
                                                      new SpeedSubcommand(2, 1)])))
      .rejects
      .toBeInstanceOf(ButtplugDeviceException);
    await bp.SendDeviceMessage(bp.Devices[0], new VibrateCmd([new SpeedSubcommand(0, 1), new SpeedSubcommand(1, .5)]));
    expect(mockBT.txChar.writeValue).toBeCalledWith(Buffer.from("Vibrate1:20;"));
    expect(mockBT.txChar.writeValue).toBeCalledWith(Buffer.from("Vibrate2:10;"));
    await bp.SendDeviceMessage(bp.Devices[0], new SingleMotorVibrateCmd(.5));
    expect(mockBT.txChar.writeValue).toBeCalledWith(Buffer.from("Vibrate1:10;"));
    expect(mockBT.txChar.writeValue).toBeCalledWith(Buffer.from("Vibrate2:10;"));
    await bp.StopAllDevices();
    expect(mockBT.txChar.writeValue).toBeCalledWith(Buffer.from("Vibrate1:0;"));
    expect(mockBT.txChar.writeValue).toBeCalledWith(Buffer.from("Vibrate2:0;"));
  });

  it("should convert lovense nora rotate commands properly", async () => {
    await SetupDevice(Lovense.DeviceInfo);
    SetupLovenseTestDevice(mockBT, "A");
    await bp.StartScanning();
    await bp.StopScanning();
    expect(bp.Devices[0].Name).toEqual("Lovense Nora v01");
    jest.spyOn(mockBT.txChar, "writeValue");
    await expect(bp.SendDeviceMessage(bp.Devices[0],
                                      new RotateCmd([new RotateSubcommand(0, 1, true),
                                                     new RotateSubcommand(1, 1, true)])))
      .rejects
      .toBeInstanceOf(ButtplugDeviceException);
    await bp.SendDeviceMessage(bp.Devices[0], new RotateCmd([new RotateSubcommand(0, 1, false)]));
    expect(mockBT.txChar.writeValue).toBeCalledWith(Buffer.from("Rotate:20;"));
    await bp.SendDeviceMessage(bp.Devices[0], new RotateCmd([new RotateSubcommand(0, 0.5, true)]));
    expect(mockBT.txChar.writeValue).toBeCalledWith(Buffer.from("RotateChange;"));
    expect(mockBT.txChar.writeValue).toBeCalledWith(Buffer.from("Rotate:10;"));
    await bp.StopAllDevices();
    expect(mockBT.txChar.writeValue).toBeCalledWith(Buffer.from("Vibrate:0;"));
    expect(mockBT.txChar.writeValue).toBeCalledWith(Buffer.from("Rotate:0;"));
  });

  it("should convert wevibe commands properly", async () => {
    await SetupDevice(WeVibe.DeviceInfo);
    await bp.StartScanning();
    await bp.StopScanning();
    jest.spyOn(mockBT.txChar, "writeValue");
    await expect(bp.SendDeviceMessage(bp.Devices[0],
                                      new VibrateCmd([new SpeedSubcommand(0, 1),
                                                      new SpeedSubcommand(1, 1)])))
      .rejects
      .toBeInstanceOf(ButtplugDeviceException);
    await bp.SendDeviceMessage(bp.Devices[0], new VibrateCmd([new SpeedSubcommand(0, 1)]));
    expect(mockBT.txChar.writeValue).toBeCalledWith(new Uint8Array([0x0f, 0x03, 0x00, 0xff, 0x00, 0x03, 0x00, 0x00]));
    await bp.SendDeviceMessage(bp.Devices[0], new SingleMotorVibrateCmd(.5));
    expect(mockBT.txChar.writeValue).toBeCalledWith(new Uint8Array([0x0f, 0x03, 0x00, 0x77, 0x00, 0x03, 0x00, 0x00]));
    await bp.StopAllDevices();
    expect(mockBT.txChar.writeValue).toBeCalledWith(new Uint8Array([0x0f, 0x03, 0x00, 0x00, 0x00, 0x03, 0x00, 0x00]));
  });

  it("should convert fleshlight commands properly", async () => {
    await SetupDevice(FleshlightLaunch.DeviceInfo);
    await bp.StartScanning();
    await bp.StopScanning();
    jest.spyOn(mockBT.txChar, "writeValue");
    await expect(bp.SendDeviceMessage(bp.Devices[0],
                                      new LinearCmd([new VectorSubcommand(0, 1, 1),
                                                     new VectorSubcommand(1, 1, 1)])))
      .rejects
      .toBeInstanceOf(ButtplugDeviceException);
    await bp.SendDeviceMessage(bp.Devices[0], new FleshlightLaunchFW12Cmd(99, 99));
    expect(mockBT.txChar.writeValue).toBeCalledWith(new Uint8Array([99, 99]));
    // We should expect to be at position 99 here, so calculate time and
    // movement from that accordingly.
    await bp.SendDeviceMessage(bp.Devices[0], new LinearCmd([new VectorSubcommand(0, .5, 500)]));
    expect(mockBT.txChar.writeValue).toBeCalledWith(new Uint8Array([49, 19]));
    await bp.StopAllDevices();
    expect(mockBT.txChar.writeValue).toBeCalledWith(new Uint8Array([0, 0]));
  });

  it("should convert vorze commands properly", async () => {
    await SetupDevice(VorzeA10Cyclone.DeviceInfo);
    await bp.StartScanning();
    await bp.StopScanning();
    jest.spyOn(mockBT.txChar, "writeValue");
    await expect(bp.SendDeviceMessage(bp.Devices[0],
                                      new RotateCmd([new RotateSubcommand(0, 1, true),
                                                     new RotateSubcommand(1, 1, false)])))
      .rejects
      .toBeInstanceOf(ButtplugDeviceException);
    await bp.SendDeviceMessage(bp.Devices[0], new RotateCmd([new RotateSubcommand(0, 1, true)]));
    expect(mockBT.txChar.writeValue).toBeCalledWith(new Uint8Array([0x01, 0x01, (100 | (0x80)) & 0xff]));
    await bp.SendDeviceMessage(bp.Devices[0], new VorzeA10CycloneCmd(50, false));
    expect(mockBT.txChar.writeValue).toBeCalledWith(new Uint8Array([0x01, 0x01, 50]));
    await bp.StopAllDevices();
    expect(mockBT.txChar.writeValue).toBeCalledWith(new Uint8Array([0x01, 0x01, 0]));
  });
});
