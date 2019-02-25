import { ButtplugClient } from "../src/client/Client";
import { SetupTestSuite } from "./utils";
import { VibrateCmd, RotateCmd, SpeedSubcommand, LinearCmd, VectorSubcommand, FleshlightLaunchFW12Cmd,
         SingleMotorVibrateCmd, RotateSubcommand, VorzeA10CycloneCmd, ButtplugDeviceException,
         ButtplugDeviceProtocol, ButtplugDevice, Endpoints, StopDeviceCmd,
         IButtplugDeviceImpl } from "../src/index";
import { Lovense } from "../src/devices/protocols/Lovense";
import { WeVibe } from "../src/devices/protocols/WeVibe";
import { FleshlightLaunch } from "../src/devices/protocols/FleshlightLaunch";
import { VorzeA10Cyclone } from "../src/devices/protocols/VorzeA10Cyclone";
import { TestDeviceImpl } from "../src/test/TestDeviceImpl";

SetupTestSuite();

describe("Device protocol tests", () => {

  function SetupDevice<T extends ButtplugDeviceProtocol>(constructor: new (aDeviceImpl: IButtplugDeviceImpl) => T,
                                                         aDeviceName: string = "Test Device")
  : [TestDeviceImpl, ButtplugDevice] {
    const device = new TestDeviceImpl(aDeviceName);
    const protocol = new constructor(device);
    const bpDevice = new ButtplugDevice(protocol, device);
    return [device, bpDevice];
  }

  it("should convert lovense commands properly", async () => {
    const [deviceImpl, device] = SetupDevice(Lovense);
    deviceImpl.ScheduleUpdateOnNextTick(Endpoints.Rx, Buffer.from("W:01:000000000000"));
    await device.Initialize();
    expect(device.Name).toEqual("Lovense Domi v01");
    expect(deviceImpl.LastValueWritten).toEqual([Endpoints.Tx, Buffer.from("DeviceType;")]);
    await expect(device.ParseMessage(new VibrateCmd([new SpeedSubcommand(0, 1),
                                                     new SpeedSubcommand(1, 1)])))
      .rejects
      .toBeInstanceOf(ButtplugDeviceException);
    await device.ParseMessage(new VibrateCmd([new SpeedSubcommand(0, 1)]));
    expect(deviceImpl.LastValueWritten).toEqual([Endpoints.Tx, Buffer.from("Vibrate:20;")]);
    await device.ParseMessage(new SingleMotorVibrateCmd(.5));
    expect(deviceImpl.LastValueWritten).toEqual([Endpoints.Tx, Buffer.from("Vibrate:10;")]);
    await device.ParseMessage(new StopDeviceCmd());
    expect(deviceImpl.LastValueWritten).toEqual([Endpoints.Tx, Buffer.from("Vibrate:0;")]);
  });

  it("should convert lovense edge vibrate commands properly", async () => {
    const [deviceImpl, device] = SetupDevice(Lovense);
    deviceImpl.ScheduleUpdateOnNextTick(Endpoints.Rx, Buffer.from("P:01:000000000000"));
    await device.Initialize();
    expect(device.Name).toEqual("Lovense Edge v01");
    expect(deviceImpl.LastValueWritten).toEqual([Endpoints.Tx, Buffer.from("DeviceType;")]);
    await expect(device.ParseMessage(new VibrateCmd([new SpeedSubcommand(0, 1),
                                                     new SpeedSubcommand(1, 1),
                                                     new SpeedSubcommand(2, 1)])))
      .rejects
      .toBeInstanceOf(ButtplugDeviceException);
    await device.ParseMessage(new VibrateCmd([new SpeedSubcommand(0, 1), new SpeedSubcommand(1, .5)]));
    expect(deviceImpl.LastValueWritten).toEqual([Endpoints.Tx, Buffer.from("Vibrate1:20;")]);
    expect(deviceImpl.LastValueWritten).toEqual([Endpoints.Tx, Buffer.from("Vibrate2:10;")]);
    await device.ParseMessage(new SingleMotorVibrateCmd(.5));
    expect(deviceImpl.LastValueWritten).toEqual([Endpoints.Tx, Buffer.from("Vibrate1:10;")]);
    expect(deviceImpl.LastValueWritten).toEqual([Endpoints.Tx, Buffer.from("Vibrate2:10;")]);
    await device.ParseMessage(new StopDeviceCmd());
    expect(deviceImpl.LastValueWritten).toEqual([Endpoints.Tx, Buffer.from("Vibrate1:0;")]);
    expect(deviceImpl.LastValueWritten).toEqual([Endpoints.Tx, Buffer.from("Vibrate2:0;")]);
  });

  it("should convert lovense nora rotate commands properly", async () => {
    const [deviceImpl, device] = SetupDevice(Lovense);
    deviceImpl.ScheduleUpdateOnNextTick(Endpoints.Rx, Buffer.from("A:01:000000000000"));
    await device.Initialize();
    expect(device.Name).toEqual("Lovense Nora v01");
    expect(deviceImpl.LastValueWritten).toEqual([Endpoints.Tx, Buffer.from("DeviceType;")]);
    await expect(device.ParseMessage(new RotateCmd([new RotateSubcommand(0, 1, true),
                                                    new RotateSubcommand(1, 1, true)])))
      .rejects
      .toBeInstanceOf(ButtplugDeviceException);
    await device.ParseMessage(new RotateCmd([new RotateSubcommand(0, 1, false)]));
    expect(deviceImpl.LastValueWritten).toEqual([Endpoints.Tx, Buffer.from("Rotate:20;")]);
    await device.ParseMessage(new RotateCmd([new RotateSubcommand(0, 0.5, true)]));
    expect(deviceImpl.LastValueWritten).toEqual([Endpoints.Tx, Buffer.from("RotateChange;")]);
    expect(deviceImpl.LastValueWritten).toEqual([Endpoints.Tx, Buffer.from("Rotate:10;")]);
    await device.ParseMessage(new StopDeviceCmd());
    expect(deviceImpl.LastValueWritten).toEqual([Endpoints.Tx, Buffer.from("Vibrate:0;")]);
    expect(deviceImpl.LastValueWritten).toEqual([Endpoints.Tx, Buffer.from("Rotate:0;")]);
  });

  it("should convert wevibe commands properly", async () => {
    const [deviceImpl, device] = SetupDevice(WeVibe);
    await expect(device.ParseMessage(new VibrateCmd([new SpeedSubcommand(0, 1),
                                                     new SpeedSubcommand(1, 1)])))
      .rejects
      .toBeInstanceOf(ButtplugDeviceException);
    await device.ParseMessage(new VibrateCmd([new SpeedSubcommand(0, 1)]));
    expect(deviceImpl.LastValueWritten).toEqual([Endpoints.Tx,
                                                 Buffer.from([0x0f, 0x03, 0x00, 0xff, 0x00, 0x03, 0x00, 0x00])]);
    await device.ParseMessage(new SingleMotorVibrateCmd(.5));
    expect(deviceImpl.LastValueWritten).toEqual([Endpoints.Tx,
                                                 Buffer.from([0x0f, 0x03, 0x00, 0x88, 0x00, 0x03, 0x00, 0x00])]);
    await device.ParseMessage(new StopDeviceCmd());
    expect(deviceImpl.LastValueWritten).toEqual([Endpoints.Tx,
                                                 Buffer.from([0x0f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])]);
  });

  it("should convert fleshlight commands properly", async () => {
    const [deviceImpl, device] = SetupDevice(FleshlightLaunch);
    await expect(device.ParseMessage(new LinearCmd([new VectorSubcommand(0, 1, 1),
                                                    new VectorSubcommand(1, 1, 1)])))
      .rejects
      .toBeInstanceOf(ButtplugDeviceException);
    await device.ParseMessage(new FleshlightLaunchFW12Cmd(99, 99));
    expect(deviceImpl.LastValueWritten).toEqual([Endpoints.Tx, Buffer.from([99, 99])]);
    // We should expect to be at position 99 here, so calculate time and
    // movement from that accordingly.
    await device.ParseMessage(new LinearCmd([new VectorSubcommand(0, .5, 500)]));
    expect(deviceImpl.LastValueWritten).toEqual([Endpoints.Tx, Buffer.from([49, 19])]);
    await device.ParseMessage(new StopDeviceCmd());
    expect(deviceImpl.LastValueWritten).toEqual([Endpoints.Tx, Buffer.from([0, 0])]);
  });

  it("should convert vorze commands properly", async () => {
    const [deviceImpl, device] = SetupDevice(VorzeA10Cyclone, "CycSA");
    await expect(device.ParseMessage(new RotateCmd([new RotateSubcommand(0, 1, true),
                                                    new RotateSubcommand(1, 1, false)])))
      .rejects
      .toBeInstanceOf(ButtplugDeviceException);
    await device.ParseMessage(new RotateCmd([new RotateSubcommand(0, 1, true)]));
    expect(deviceImpl.LastValueWritten).toEqual([Endpoints.Tx, Buffer.from([0x01, 0x01, (100 | (0x80)) & 0xff])]);
    await device.ParseMessage(new VorzeA10CycloneCmd(50, false));
    expect(deviceImpl.LastValueWritten).toEqual([Endpoints.Tx, Buffer.from([0x01, 0x01, 50])]);
    await device.ParseMessage(new StopDeviceCmd());
    expect(deviceImpl.LastValueWritten).toEqual([Endpoints.Tx, Buffer.from([0x01, 0x01, 0])]);
  });
});
