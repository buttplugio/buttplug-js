import { ButtplugClientDevice } from "./ButtplugClientDevice";
import { ButtplugMessageException } from "../core/Exceptions";
import * as Messages from "../core/Messages";

export function CreateSimpleVibrateCmd(device: ButtplugClientDevice, speed: number): Messages.VibrateCmd {
  if (device.AllowedMessages.indexOf("VibrateCmd") === -1) {
    throw new ButtplugMessageException("Device does not handle VibrateCmd!");
  }
  if (speed > 1.0 || speed < 0.0) {
    throw new ButtplugMessageException("Speed must be 0.0 <= x <= 1.0!");
  }
  const commands: Messages.SpeedSubcommand[] = [];
  for (let i = 0; i < device.MessageAttributes("VibrateCmd").FeatureCount; ++i) {
    commands.push(new Messages.SpeedSubcommand(i, speed));
  }
  return new Messages.VibrateCmd(commands, device.Index);
}

export function CreateSimpleLinearCmd(device: ButtplugClientDevice, position: number, duration: number): Messages.LinearCmd {
  if (device.AllowedMessages.indexOf("LinearCmd") === -1) {
    throw new ButtplugMessageException("Device does not handle LinearCmd!");
  }
  if (position > 1.0 || position < 0.0) {
    throw new ButtplugMessageException("Position must be 0.0 <= x <= 1.0!");
  }
  const commands: Messages.VectorSubcommand[] = [];
  for (let i = 0; i < device.MessageAttributes("LinearCmd").FeatureCount; ++i) {
    commands.push(new Messages.VectorSubcommand(i, position, duration));
  }
  return new Messages.LinearCmd(commands, device.Index);
}

export function CreateSimpleRotateCmd(device: ButtplugClientDevice, speed: number, clockwise: boolean): Messages.RotateCmd {
  if (device.AllowedMessages.indexOf("RotateCmd") === -1) {
    throw new ButtplugMessageException("Device does not handle RotateCmd!");
  }
  if (speed > 1.0 || speed < 0.0) {
    throw new ButtplugMessageException("Speed must be 0.0 <= x <= 1.0!");
  }
  const commands: Messages.RotateSubcommand[] = [];
  for (let i = 0; i < device.MessageAttributes("RotateCmd").FeatureCount; ++i) {
    commands.push(new Messages.RotateSubcommand(i, speed, clockwise));
  }
  return new Messages.RotateCmd(commands, device.Index);
}
