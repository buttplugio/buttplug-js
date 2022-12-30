import { SetupTestSuite } from "./utils";
import {ButtplugClientDevice, RotateCmd, LinearCmd, VectorSubcommand,
        RotateSubcommand, StopDeviceCmd, ButtplugDeviceMessage, ButtplugDeviceError } from "../src/index";

SetupTestSuite();
/*
describe("Message Utils Tests", () => {

  let lastMsg: ButtplugDeviceMessage;
  const testDevice = new ButtplugClientDevice(0, "Test Device", {
    VibrateCmd: { FeatureCount: 2 },
    RotateCmd: { FeatureCount: 1 },
    LinearCmd: { FeatureCount: 1 },
    StopDeviceCmd: {},
  }, async (device, msg) => { lastMsg = msg; });

  const testVibrateDevice = new ButtplugClientDevice(0, "Test Vibrate Device", {
    VibrateCmd: { FeatureCount: 2 },
  }, async (device, msg) => { lastMsg = msg; });
  const testRotateDevice = new ButtplugClientDevice(0, "Test Rotate Device", {
    RotateCmd: { FeatureCount: 1 },
  }, async (device, msg) => { lastMsg = msg; });
  const testLinearDevice = new ButtplugClientDevice(0, "Test Linear Device", {
    LinearCmd: { FeatureCount: 1 },
  }, async (device, msg) => { lastMsg = msg; });

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

    await testDevice.SendStopDeviceCmd();
    expect(lastMsg).toEqual(new StopDeviceCmd(0));
  });

  it("should throw on wrong allowed messages", async () => {
    await expect(testRotateDevice.SendVibrateCmd(0.5)).rejects.toBeInstanceOf(ButtplugDeviceError);
    await expect(testVibrateDevice.SendRotateCmd(0.5, true)).rejects.toBeInstanceOf(ButtplugDeviceError);
    await expect(testVibrateDevice.SendLinearCmd(0.5, 1.0)).rejects.toBeInstanceOf(ButtplugDeviceError);
  });

  it("should reject on out of bounds arguments", async () => {
    await expect(testVibrateDevice.SendVibrateCmd([0.5, 0.5, 0.5])).rejects.toBeInstanceOf(ButtplugDeviceError);
  });
});
*/