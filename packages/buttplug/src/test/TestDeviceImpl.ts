/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import { ButtplugDeviceImpl } from "../devices/ButtplugDeviceImpl";
import { ButtplugDeviceReadOptions } from "../devices/ButtplugDeviceReadOptions";
import { ButtplugDeviceWriteOptions } from "../devices/ButtplugDeviceWriteOptions";
import { Endpoints } from "../devices/Endpoints";

export class TestDeviceImpl extends ButtplugDeviceImpl {
  private _connected = true;
  private _lastValueWritten: [Endpoints, Buffer][] = [];
  private _valueToRead: Map<Endpoints, Buffer> = new Map<Endpoints, Buffer>();

  public constructor(aName: string) {
    super(aName, aName)
  }

  public get Connected(): boolean {
    return this._connected;
  }

  public get LastValueWritten(): [Endpoints, Buffer] | undefined {
    let value = this._lastValueWritten.shift();
    return value;
  }

  public SetValueToRead(aEndpoint: Endpoints, aData: Buffer): void {
    this._valueToRead.set(aEndpoint, aData);
  }

  public Disconnect(): void {
    this._connected = false;
    this.emit("deviceremoved", this);
  }

  public ReadValueInternal(aOptions: ButtplugDeviceReadOptions): Promise<Buffer> {
    if (!this._valueToRead.has(aOptions.Endpoint)) {
      return Promise.resolve(Buffer.from([]));
    }
    let value = this._valueToRead.get(aOptions.Endpoint)!;
    this._valueToRead.delete(aOptions.Endpoint);
    return Promise.resolve(value);
  }

  public WriteValueInternal(aData: Buffer, aOptions: ButtplugDeviceWriteOptions): Promise<void> {
    this._lastValueWritten.push([aOptions.Endpoint, aData]);
    return Promise.resolve();
  }

  public SubscribeToUpdatesInternal(aOptions: ButtplugDeviceReadOptions): Promise<void> {
    return Promise.resolve();
  }

  public ScheduleUpdateOnNextTick(aChr: Endpoints, aData: Buffer) {
    process.nextTick(() => this.emit("updateReceived", [aChr, aData]));
  }
}
