"use strict";
import {plainToClass} from "class-transformer";
import * as ajv from "ajv";
import * as Messages from "./Messages";
import { Device } from "./Device";
const buttplugSchema = require("../../dependencies/buttplug-schema/schema/buttplug-schema.json");

// Since we're still using the draft 06 schema, we now have to specifically add
// it to ajv, which defaults to 7.
const validator = new ajv();
validator.addMetaSchema(require("ajv/lib/refs/json-schema-draft-06.json"));
const jsonValidator = validator.compile(buttplugSchema);

export function CheckMessage(aMsgObj: Messages.ButtplugMessage) {
  if (jsonValidator([aMsgObj.toProtocolFormat()])) {
    return;
  }
  // Relay validator errors as an error message locally.
  const errorString = jsonValidator.errors!.map((error) => error.message).join("; ");
  throw new Error(errorString);
}

export function FromJSON(str): Messages.ButtplugMessage[] {
  const msgarray = JSON.parse(str);
  if (!jsonValidator(msgarray)) {
    // Relay validator errors as an error message locally.
    const errorString = jsonValidator.errors!.map((error) => error.message).join("; ");
    return [new Messages.Error(errorString, Messages.ErrorClass.ERROR_MSG, 0)];
  }
  const msgs: Messages.ButtplugMessage[] = [];
  for (const x of Array.from(msgarray)) {
    // Can't get this to resolve nicely as a type, so just start from any and cast
    // after. Not sure how to resolve plainToClass to a type since this is
    // dynamic.
    const msg: any = plainToClass(Messages[Object.getOwnPropertyNames(x)[0]],
                                  x[Object.getOwnPropertyNames(x)[0]]);
    msgs.push(msg as Messages.ButtplugMessage);
  }
  return msgs;
}

export function GetSchemaVersion(): number {
  return parseInt(buttplugSchema.version, 10);
}

export function CreateSimpleVibrateCmd(device: Device, speed: number): Messages.VibrateCmd {
  if (device.AllowedMessages.indexOf("VibrateCmd") === -1) {
    throw new Error("Device does not handle VibrateCmd!");
  }
  if (speed > 1.0 || speed < 0.0) {
    throw new Error("Speed must be 0.0 <= x <= 1.0!");
  }
  const commands: Messages.SpeedSubcommand[] = [];
  for (let i = 0; i < device.MessageAttributes("VibrateCmd").FeatureCount; ++i) {
    commands.push(new Messages.SpeedSubcommand(i, speed));
  }
  return new Messages.VibrateCmd(commands, device.Index);
}

export function CreateSimpleLinearCmd(device: Device, position: number, duration: number): Messages.LinearCmd {
  if (device.AllowedMessages.indexOf("LinearCmd") === -1) {
    throw new Error("Device does not handle LinearCmd!");
  }
  if (position > 1.0 || position < 0.0) {
    throw new Error("Position must be 0.0 <= x <= 1.0!");
  }
  const commands: Messages.VectorSubcommand[] = [];
  for (let i = 0; i < device.MessageAttributes("LinearCmd").FeatureCount; ++i) {
    commands.push(new Messages.VectorSubcommand(i, position, duration));
  }
  return new Messages.LinearCmd(commands, device.Index);
}

export function CreateSimpleRotateCmd(device: Device, speed: number, clockwise: boolean): Messages.RotateCmd {
  if (device.AllowedMessages.indexOf("RotateCmd") === -1) {
    throw new Error("Device does not handle RotateCmd!");
  }
  if (speed > 1.0 || speed < 0.0) {
    throw new Error("Speed must be 0.0 <= x <= 1.0!");
  }
  const commands: Messages.RotateSubcommand[] = [];
  for (let i = 0; i < device.MessageAttributes("RotateCmd").FeatureCount; ++i) {
    commands.push(new Messages.RotateSubcommand(i, speed, clockwise));
  }
  return new Messages.RotateCmd(commands, device.Index);
}
