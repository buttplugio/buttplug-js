/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import { ButtplugException, ButtplugDeviceException } from "../../../core/Exceptions";
import { ButtplugDeviceImpl } from "../../../devices/ButtplugDeviceImpl";
import { Endpoints, GetEndpoint } from "../../../devices/Endpoints";
import { ButtplugDeviceWriteOptions } from "../../../devices/ButtplugDeviceWriteOptions";
import { ButtplugDeviceReadOptions } from "../../../devices/ButtplugDeviceReadOptions";

export class WebGamepadDevice extends ButtplugDeviceImpl {

  public get Connected(): boolean {
    return this._gamepad.connected;
  }

  private _gamepad: Gamepad;

  public constructor(private _device: Gamepad) {
    super(_device.id, _device.index.toString());
    this._gamepad = _device;
    window.addEventListener("gamepaddisconnected", (ev: GamepadEvent) => {
        if (ev.gamepad.index === this._gamepad.index) {
            this.OnDisconnect();
        }
    });
  }

  public Connect = async (): Promise<void> => {
      // Noop. We're connected when we're created.
      return Promise.resolve();
  }

  public Disconnect = async (): Promise<void> => {
      // Noop. We don't have to do anything here.
  }

  public OnDisconnect = () => {
    this._logger.Debug(`WebBluetoothDevice: ${this.constructor.name} disconnecting`);
    this.emit("deviceremoved");
  }

  public WriteValueInternal = async (aValue: Buffer, aOptions: ButtplugDeviceWriteOptions): Promise<void> => {
    // Somehow, typescript expects pulse, not effect. Surprising since Microsoft
    // went Chromium.
    //
    // For now, assume we'll only have a dual-rumble gamepad. Assume that we've
    // already packed 2 little-endian floats in the protocol. Silly to have to
    // serialize here, but it keeps the system consistency.
    const weakMag = aValue.readFloatLE(0);
    const strongMag = aValue.readFloatLE(4);
    (this._gamepad as any).vibrationActuator.playEffect("dual-rumble", { duration: 1000, startDelay: 0, weakMagnitude: weakMag, strongMagnitude: strongMag});
    return Promise.resolve();
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
