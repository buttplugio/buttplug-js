/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import { ButtplugLogger } from "../../../core/Logging";
import { IDeviceSubtypeManager } from "../../IDeviceSubtypeManager";
import { EventEmitter } from "events";
import { WebGamepadDevice } from "./WebGamepadDevice";
import { WebGamepadProtocol } from "../../../devices/protocols/WebGamepadProtocol";
import { ButtplugDevice } from "../../../devices/ButtplugDevice";


export class WebGamepadDeviceManager extends EventEmitter implements IDeviceSubtypeManager {
  private _logger: ButtplugLogger;
  private _connectedGamepads: Gamepad[] = [];

  constructor(aLogger: ButtplugLogger | undefined) {
    super();
    this.SetLogger(aLogger !== undefined ? aLogger : ButtplugLogger.Logger);
    window.addEventListener("gamepadconnected", (ev: GamepadEvent) => {
      console.log(`Gamepad connected`);
      console.log(ev.gamepad);
      this._connectedGamepads.push(ev.gamepad);
    });
    window.addEventListener("gamepaddisconnected", (ev: GamepadEvent) => {
      console.log(`Gamepad disconnected ${ev.gamepad}`);
      if (this._connectedGamepads.includes(ev.gamepad)) {
        this._connectedGamepads.splice(this._connectedGamepads.indexOf(ev.gamepad), 1);
      }
    });
  }

  public SetLogger(aLogger: ButtplugLogger) {
    this._logger = aLogger;
  }

  public async StartScanning() {
    for (const g of this._connectedGamepads) {
        // Remove the gamepad from the queue and add it to the emitted array.
        // Emit a new gamepad device.
        const webGamepadDevice = new WebGamepadDevice(g);
        const webGamepadProtocol = new WebGamepadProtocol(webGamepadDevice);
        const device = new ButtplugDevice(webGamepadProtocol, webGamepadDevice);
        this.emit("deviceadded", device);
    }
    // Clear the gamepad array so we don't double emit.
    this._connectedGamepads = [];
    this.emit("scanningfinished");
  }

  public StopScanning() {
    // noop. We only scan once then call it done.
  }

  public get IsScanning(): boolean {
    // noop.
    return false;
  }
}
