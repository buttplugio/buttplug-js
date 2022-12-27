import { SetupTestSuite } from "./utils";
import {ButtplugClientDevice, VibrateCmd, RotateCmd, LinearCmd, VectorSubcommand,
        RotateSubcommand, SpeedSubcommand, FleshlightLaunchFW12Cmd, VorzeA10CycloneCmd,
  LovenseCmd, StopDeviceCmd, ButtplugDeviceMessage, ButtplugDeviceException, KiirooCmd } from "../src/index";

SetupTestSuite();

describe("Message Utils Tests", () => {

  let lastMsg: ButtplugDeviceMessage;
  const testDevice = new ButtplugClientDevice(0, "Test Device", {
    VibrateCmd: { FeatureCount: 2 },
    RotateCmd: { FeatureCount: 1 },
    LinearCmd: { FeatureCount: 1 },
    FleshlightLaunchFW12Cmd: {},
    LovenseCmd: {},
    VorzeA10CycloneCmd: {},
    KiirooCmd: {},
    StopDeviceCmd: {},
  }, async (aDevice, aMsg) => { lastMsg = aMsg; });

  const testVibrateDevice = new ButtplugClientDevice(0, "Test Vibrate Device", {
    VibrateCmd: { FeatureCount: 2 },
  }, async (aDevice, aMsg) => { lastMsg = aMsg; });
  const testRotateDevice = new ButtplugClientDevice(0, "Test Rotate Device", {
    RotateCmd: { FeatureCount: 1 },
  }, async (aDevice, aMsg) => { lastMsg = aMsg; });
  const testLinearDevice = new ButtplugClientDevice(0, "Test Linear Device", {
    LinearCmd: { FeatureCount: 1 },
  }, async (aDevice, aMsg) => { lastMsg = aMsg; });

  it("should create correct message using internal functions", async () => {
    await testDevice.SendVibrateCmd(0.5);
    expect(lastMsg).toEqual(new VibrateCmd([new SpeedSubcommand(0, 0.5),
                                            new SpeedSubcommand(1, 0.5)],
                                           0));

    await testDevice.SendVibrateCmd([0.5, 1.0]);
    expect(lastMsg).toEqual(new VibrateCmd([new SpeedSubcommand(0, 0.5),
                                            new SpeedSubcommand(1, 1.0)],
                                           0));

    await testDevice.SendRotateCmd(0.5, true);
    expect(lastMsg).toEqual(new RotateCmd([new RotateSubcommand(0, 0.5, true)],
                                          0));

    await testDevice.SendRotateCmd([[0.5, true]]);
    expect(lastMsg).toEqual(new RotateCmd([new RotateSubcommand(0, 0.5, true)],
                                          0));

    await testDevice.SendLinearCmd(0.5, 1.5);
    expect(lastMsg).toEqual(new LinearCmd([new VectorSubcommand(0, 0.5, 1.5)],
                                          0));

    await testDevice.SendLinearCmd([[0.5, 1.5]]);
    expect(lastMsg).toEqual(new LinearCmd([new VectorSubcommand(0, 0.5, 1.5)],
                                          0));

    await testDevice.SendFleshlightLaunchFW12Cmd(50, 50);
    expect(lastMsg).toEqual(new FleshlightLaunchFW12Cmd(50, 50, 0));

    await testDevice.SendLovenseCmd("Vibrate:10;");
    expect(lastMsg).toEqual(new LovenseCmd("Vibrate:10;", 0));

    await testDevice.SendVorzeA10CycloneCmd(50, true);
    expect(lastMsg).toEqual(new VorzeA10CycloneCmd(50, true, 0));

    await testDevice.SendKiirooCmd(3);
    expect(lastMsg).toEqual(new KiirooCmd(3, 0));

    await testDevice.SendStopDeviceCmd();
    expect(lastMsg).toEqual(new StopDeviceCmd(0));
  });

  it("should throw on wrong allowed messages", async () => {
    await expect(testRotateDevice.SendVibrateCmd(0.5)).rejects.toBeInstanceOf(ButtplugDeviceException);
    await expect(testVibrateDevice.SendRotateCmd(0.5, true)).rejects.toBeInstanceOf(ButtplugDeviceException);
    await expect(testVibrateDevice.SendLinearCmd(0.5, 1.0)).rejects.toBeInstanceOf(ButtplugDeviceException);
  });

  it("should reject on out of bounds arguments", async () => {
    await expect(testVibrateDevice.SendVibrateCmd([0.5, 0.5, 0.5])).rejects.toBeInstanceOf(ButtplugDeviceException);
  });
});
