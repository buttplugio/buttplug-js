"use strict";
import {plainToClass} from "class-transformer";
import * as ajv from "ajv";
import * as Messages from "./Messages";
import { ButtplugMessageException } from "./Exceptions";
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
  throw new ButtplugMessageException(errorString);
}

export function FromJSON(str): Messages.ButtplugMessage[] {
  const msgarray = JSON.parse(str);
  if (!jsonValidator(msgarray)) {
    // Relay validator errors as an error message locally.
    const errorString = jsonValidator.errors!.map((error) => error.message).join("; ");
    throw new ButtplugMessageException(errorString);
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
