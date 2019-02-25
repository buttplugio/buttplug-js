/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import * as Messages from "../core/Messages";
import { EventEmitter } from "events";
import { IButtplugDevice } from "./IButtplugDevice";
import { IButtplugDeviceProtocol } from "./IButtplugDeviceProtocol";
import { IButtplugDeviceImpl } from "./IButtplugDeviceImpl";
import { Endpoints } from "./Endpoints";

export class ButtplugDevice extends EventEmitter implements IButtplugDevice {
  protected _protocol: IButtplugDeviceProtocol;
  protected _device: IButtplugDeviceImpl;

  public constructor(aProtocol: IButtplugDeviceProtocol, aDevice: IButtplugDeviceImpl) {
    super();
    this._protocol = aProtocol;
    this._device = aDevice;
    this._device.addListener("deviceremoved", () => {
      // TODO Do we really have to pass ourselves here?
      this.emit("deviceremoved", this);
    });
  }

  public get Connected(): boolean {
    return this._device.Connected;
  }

  public get MessageSpecifications(): object {
    return this._protocol.MessageSpecifications;
  }

  public Disconnect(): void {
    return this._device.Disconnect();
  }

  public async Initialize(): Promise<void> {
    return await this._protocol.Initialize();
  }

  public get Name() {
    return this._protocol.Name;
  }

  public get Id() {
    return this._device.Address;
  }

  // See ButtplugDeviceProtocol.MsgFuncs comment
  //
  // tslint:disable-next-line:ban-types
  public get AllowedMessageTypes(): Function[] {
    return this._protocol.AllowedMessageTypes;
  }

  public ParseMessage = async (aMsg: Messages.ButtplugDeviceMessage): Promise<Messages.ButtplugMessage> => {
    return await this._protocol.ParseMessage(aMsg);
  }
}
