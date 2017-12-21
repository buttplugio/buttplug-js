"use strict";
import {plainToClass} from "class-transformer";
import * as ajv from "ajv";
import { ButtplugMessage, Error as ErrorMessage, ErrorClass, Messages } from "./Messages";
const buttplugSchema = require("../../dependencies/buttplug-schema/schema/buttplug-schema.json");

const jsonValidator = ajv().compile(buttplugSchema);

export function CheckMessage(aMsgObj: ButtplugMessage) {
  if (jsonValidator([aMsgObj.toProtocolFormat()])) {
    return;
  }
  // Relay validator errors as an error message locally.
  const errorString = jsonValidator.errors!.map((error) => error.message).join("; ");
  throw new Error(errorString);
}

export function FromJSON(str): ButtplugMessage[] {
  const msgarray = JSON.parse(str);
  if (!jsonValidator(msgarray)) {
    // Relay validator errors as an error message locally.
    const errorString = jsonValidator.errors!.map((error) => error.message).join("; ");
    return [new ErrorMessage(errorString, ErrorClass.ERROR_MSG, 0)];
  }
  const msgs: ButtplugMessage[] = [];
  for (const x of Array.from(msgarray)) {
    // Can't get this to resolve nicely as a type, so just start from any and cast
    // after. Not sure how to resolve plainToClass to a type since this is
    // dynamic.
    const msg: any = plainToClass(Messages[Object.getOwnPropertyNames(x)[0]],
                                  x[Object.getOwnPropertyNames(x)[0]]);
    msgs.push(msg as ButtplugMessage);
  }
  return msgs;
}
