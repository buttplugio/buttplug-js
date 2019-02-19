/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import * as Messages from "../core/Messages";
import { EventEmitter } from "events";

export interface IButtplugDeviceProtocol extends EventEmitter
{
  readonly Name: string;
  readonly AllowedMessageTypes: Function[];
  readonly MessageSpecifications: object;
  ParseMessage(aMsg: Messages.ButtplugDeviceMessage): Promise<Messages.ButtplugMessage>;
  Initialize(): Promise<void>;
}
