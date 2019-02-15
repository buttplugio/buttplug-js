/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import { EventEmitter } from "events";

export interface IBluetoothDeviceImpl extends EventEmitter {
  Name: string;
  Id: string;
  WriteValue: (aCharacteristic: string, aValue: Uint8Array) => Promise<void>;
  WriteString: (aCharacteristic: string, aValue: string) => Promise<void>;
  ReadValue: (aCharacteristic: string) => Promise<BufferSource>;
  ReadString: (aCharacteristic: string) => Promise<string>;
  Subscribe: (aCharacteristic: string) => Promise<void>;
  Disconnect: () => Promise<void>;
}
