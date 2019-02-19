/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import { EventEmitter } from "events";
import { ButtplugDeviceWriteOptions } from "./ButtplugDeviceWriteOptions";
import { ButtplugDeviceReadOptions } from "./ButtplugDeviceReadOptions";

export interface IButtplugDeviceImpl extends EventEmitter
{
  readonly Name: string;
  readonly Address: string;
  readonly Connected: boolean;
  Disconnect(): void;
  WriteValue(aValue: Buffer, aOptions?: ButtplugDeviceWriteOptions): Promise<void>;
  WriteValue(aValue: Buffer, aOptions?: ButtplugDeviceWriteOptions): Promise<void>;
  ReadValue(aOptions?: ButtplugDeviceReadOptions): Promise<Buffer>
  SubscribeToUpdates(aOptions?: ButtplugDeviceReadOptions): void;
}
