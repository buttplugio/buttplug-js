/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import { ButtplugDevice } from "../ButtplugDevice";
import { IBluetoothDeviceImpl } from "./IBluetoothDeviceImpl";

export abstract class ButtplugBluetoothDevice extends ButtplugDevice {
  public constructor(aName: string, protected _deviceImpl: IBluetoothDeviceImpl) {
    super(aName, _deviceImpl.Id);
  }

  public Disconnect() {
    this._deviceImpl.Disconnect();
  }

  public OnDisconnect() {
    this.emit("deviceremoved", this);
  }
}
