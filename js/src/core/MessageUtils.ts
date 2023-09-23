/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

'use strict';
import { plainToInstance } from 'class-transformer';
import * as Messages from './Messages';

function getMessageClass(
  type: string
): (new (...args: unknown[]) => Messages.ButtplugMessage) | null {
  for (const value of Object.values(Messages)) {
    if (typeof value === 'function' && 'Name' in value && value.Name === type) {
      return value;
    }
  }
  return null;
}

export function getMessageClassFromMessage(
  msg: Messages.ButtplugMessage
): (new (...args: unknown[]) => Messages.ButtplugMessage) | null {
  // Making the bold assumption all message classes have the Name static. Should define a
  // requirement for this in the abstract class.
  return getMessageClass(Object.getPrototypeOf(msg).constructor.Name);
}

export function fromJSON(str): Messages.ButtplugMessage[] {
  const msgarray: object[] = JSON.parse(str);
  const msgs: Messages.ButtplugMessage[] = [];
  for (const x of Array.from(msgarray)) {
    const type = Object.getOwnPropertyNames(x)[0];
    const cls = getMessageClass(type);
    if (cls) {
      const msg = plainToInstance<Messages.ButtplugMessage, unknown>(
        cls,
        x[type]
      );
      msg.update();
      msgs.push(msg);
    }
  }
  return msgs;
}
