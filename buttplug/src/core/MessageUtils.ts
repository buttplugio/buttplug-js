/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

"use strict";
import {plainToClass} from "class-transformer";
import Ajv from "ajv";
import * as Messages from "./Messages";
import { ButtplugMessageException } from "./Exceptions";

export function FromJSON(str): Messages.ButtplugMessage[] {
  const msgarray: object[] = JSON.parse(str);
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
