/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import { IBluetoothDeviceImpl } from "./IBluetoothDeviceImpl";
import { ButtplugBluetoothDevice } from "./ButtplugBluetoothDevice";

export class BluetoothDeviceInfo {
  constructor(private _names: string[],
              private _namePrefixes: string[],
              private _services: string[],
              private _characteristics: object,
              private _createFunc: (aDeviceImpl: IBluetoothDeviceImpl) => Promise<ButtplugBluetoothDevice>) {
  }

  public get Names() {
    return this._names;
  }

  public get NamePrefixes() {
    return this._namePrefixes;
  }

  public get Services() {
    return this._services;
  }

  public get Characteristics() {
    return this._characteristics;
  }

  public get Create() {
    return this._createFunc;
  }
}
