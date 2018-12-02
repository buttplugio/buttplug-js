import { SetupTestSuite } from "./utils";
import {ButtplugClientDevice, VibrateCmd, RotateCmd, LinearCmd, VectorSubcommand,
        RotateSubcommand, SpeedSubcommand, ButtplugDeviceMessage } from "../src/index";

SetupTestSuite();

describe("Message Utils Tests", () => {

  let lastMsg: ButtplugDeviceMessage;

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
    await testVibrateDevice.SendVibrateCmd(0.5);
    expect(lastMsg).toEqual(new VibrateCmd([new SpeedSubcommand(0, 0.5),
                                            new SpeedSubcommand(1, 0.5)],
                                           0, 1));

    await testVibrateDevice.SendVibrateCmd([0.5, 1.0]);
    expect(lastMsg).toEqual(new VibrateCmd([new SpeedSubcommand(0, 0.5),
                                            new SpeedSubcommand(1, 1.0)],
                                           0, 1));

    await testRotateDevice.SendRotateCmd(0.5, true);
    expect(lastMsg).toEqual(new RotateCmd([new RotateSubcommand(0, 0.5, true)],
                                          0, 1));

    await testRotateDevice.SendRotateCmd([[0.5, true]]);
    expect(lastMsg).toEqual(new RotateCmd([new RotateSubcommand(0, 0.5, true)],
                                          0, 1));

    await testLinearDevice.SendLinearCmd(0.5, 1.5);
    expect(lastMsg).toEqual(new LinearCmd([new VectorSubcommand(0, 0.5, 1.5)],
                                          0, 1));

    await testLinearDevice.SendLinearCmd([[0.5, 1.5]]);
    expect(lastMsg).toEqual(new LinearCmd([new VectorSubcommand(0, 0.5, 1.5)],
                                          0, 1));
  });

  /*
  it("should throw on wrong allowed messages", () => {
  });

  it("should reject on out of bounds arguments", async () => {
  });
  */
});
