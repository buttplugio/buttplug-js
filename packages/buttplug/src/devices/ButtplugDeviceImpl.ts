/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import { ButtplugLogger } from "../core/Logging";
import { EventEmitter } from "events";
import { ButtplugDeviceWriteOptions } from "./ButtplugDeviceWriteOptions";
import { ButtplugDeviceReadOptions } from "./ButtplugDeviceReadOptions";
import { IButtplugDeviceImpl } from "./IButtplugDeviceImpl";
import { Endpoints } from "./Endpoints";

export abstract class ButtplugDeviceImpl extends EventEmitter implements IButtplugDeviceImpl
{
  protected _name: string;
  protected _address: string;
  protected _logger = ButtplugLogger.Logger;

  public get Name(): string {
    return this._name;
  }

  public get Address(): string {
    return this._address;
  }

  protected constructor(aName: string, aAddress: string)
  {
    super();
    this._name = aName;
    this._address = aAddress;
  }

  public abstract get Connected(): boolean;
  public abstract Disconnect(): void;

  public WriteValue(aValue: Buffer, aOptions?: ButtplugDeviceWriteOptions): Promise<void> {
    if (aOptions === undefined) {
      return this.WriteValueInternal(aValue, new ButtplugDeviceWriteOptions());
    }
    return this.WriteValueInternal(aValue, aOptions);
  }

  public ReadValue(aOptions?: ButtplugDeviceReadOptions): Promise<Buffer> {
    if (aOptions === undefined) {
      return this.ReadValueInternal(new ButtplugDeviceReadOptions());
    }
    return this.ReadValueInternal(aOptions);
  }

  public WriteString = async (aStr: string, aOptions?: ButtplugDeviceWriteOptions): Promise<void> => {
    return this.WriteValue(Buffer.from(aStr), aOptions)
  }

  public ReadString = async (aOptions?: ButtplugDeviceReadOptions): Promise<string> => {
    const buf = await this.ReadValue(aOptions);
    return buf.toString('utf-8');
  }

  public SubscribeToUpdates(aOptions?: ButtplugDeviceReadOptions): void {
    if (aOptions === undefined) {
      return this.SubscribeToUpdatesInternal(new ButtplugDeviceReadOptions());
    }
    return this.SubscribeToUpdatesInternal(aOptions);
  }

  public abstract WriteValueInternal(aValue: Buffer, aOptions: ButtplugDeviceWriteOptions): Promise<void>;
  public abstract ReadValueInternal(aOptions: ButtplugDeviceReadOptions): Promise<Buffer>;
  public abstract SubscribeToUpdatesInternal(aOptions: ButtplugDeviceReadOptions): void;

  protected UpdateReceived(aEndpoint: Endpoints, aData: Buffer) {
    this.emit("updateReceived", [aEndpoint, aData]);
  }
}
