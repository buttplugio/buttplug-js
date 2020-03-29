/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import { ButtplugDeviceImpl } from "../../../devices/ButtplugDeviceImpl";
import { ButtplugDeviceWriteOptions } from "../../../devices/ButtplugDeviceWriteOptions";
import { ButtplugDeviceReadOptions } from "../../../devices/ButtplugDeviceReadOptions";

export class ForwardedDevice extends ButtplugDeviceImpl {

  // This object should only exist when we're connected.
  public get Connected(): boolean {
    return true;
  }

  public constructor(name: string, address: string) {
    super(name, address);
  }

  public Connect = async (): Promise<void> => {
      // Noop. We're connected when we're created.
      return Promise.resolve();
  }

  public Disconnect = () => {
      // Noop. We don't have to do anything here. Just act like we're removed.
      this.OnDisconnect();
  }

  public OnDisconnect = () => {
    this._logger.Debug(`ForwardedDevice: ${this.constructor.name} disconnecting`);
    this.emit("deviceremoved");
  }

  public WriteValueInternal = async (aValue: Buffer, aOptions: ButtplugDeviceWriteOptions): Promise<void> => {
    // This should never be called.
    return Promise.reject("This should never be called");
  }

  public ReadValueInternal = async (aOptions: ButtplugDeviceReadOptions): Promise<Buffer> => {
    // This should never be called.
    return Promise.reject("This should never be called");
  }

  public SubscribeToUpdatesInternal = async (aOptions: ButtplugDeviceReadOptions): Promise<void> => {
    // This should never be called.
    return Promise.reject("This should never be called");
  }

  public Unsubscribe = async (aOptions: ButtplugDeviceReadOptions): Promise<void> => {
    // This should never be called.
    return Promise.reject("This should never be called");
  }
}
