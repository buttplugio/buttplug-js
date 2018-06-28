import { SetupTestSuite } from "./utils";
import { CreateSimpleLinearCmd, CreateSimpleVibrateCmd, CreateSimpleRotateCmd,
         Device, VibrateCmd, RotateCmd, LinearCmd, VectorSubcommand,
         RotateSubcommand, SpeedSubcommand } from "../src/index";

SetupTestSuite();

describe("Message Utils Tests", () => {

  const testVibrateDevice = new Device(0, "Test Vibrate Device", {
    VibrateCmd: { FeatureCount: 2 },
  });
  const testRotateDevice = new Device(0, "Test Rotate Device", {
    RotateCmd: { FeatureCount: 1 },
  });
  const testLinearDevice = new Device(0, "Test Linear Device", {
    LinearCmd: { FeatureCount: 1 },
  });

  it("should create correct messages", () => {
    expect(CreateSimpleVibrateCmd(testVibrateDevice, 0.5))
      .toEqual(new VibrateCmd([new SpeedSubcommand(0, 0.5), new SpeedSubcommand(1, .5)], 0, 1));
    expect(CreateSimpleRotateCmd(testRotateDevice, 0.5, true))
      .toEqual(new RotateCmd([new RotateSubcommand(0, 0.5, true)], 0, 1));
    expect(CreateSimpleLinearCmd(testLinearDevice, 0.5, 0.5))
      .toEqual(new LinearCmd([new VectorSubcommand(0, 0.5, 0.5)], 0, 1));
  });

  it("should throw on wrong allowed messages", () => {
    expect(() => CreateSimpleVibrateCmd(testRotateDevice, 0.5)).toThrow();
    expect(() => CreateSimpleLinearCmd(testRotateDevice, 0.5, 0.5)).toThrow();
    expect(() => CreateSimpleRotateCmd(testVibrateDevice, 0.5, true)).toThrow();
  });

  it("should reject on out of bounds arguments", async () => {
    expect(() => CreateSimpleVibrateCmd(testVibrateDevice, 1.5)).toThrow();
    expect(() => CreateSimpleVibrateCmd(testVibrateDevice, -0.5)).toThrow();
    expect(() => CreateSimpleRotateCmd(testRotateDevice, 1.5, true)).toThrow();
    expect(() => CreateSimpleRotateCmd(testRotateDevice, -0.5, true)).toThrow();
    expect(() => CreateSimpleLinearCmd(testRotateDevice, 1.5, 1000)).toThrow();
    expect(() => CreateSimpleLinearCmd(testRotateDevice, -0.5, 1000)).toThrow();
  });
});
