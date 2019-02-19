/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import * as Messages from "../core/Messages";
import { EventEmitter } from "events";

export interface IButtplugDevice extends EventEmitter {
  readonly MessageSpecifications: object;
  readonly AllowedMessageTypes: Function[];
  readonly Name: string;
  readonly Id: string;
  readonly Connected: boolean;
  Initialize(): Promise<void>;
  ParseMessage(aMsg: Messages.ButtplugDeviceMessage): Promise<Messages.ButtplugMessage>;
  Disconnect(): void;
}
