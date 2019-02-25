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

export abstract class ButtplugDeviceImpl extends EventEmitter implements IButtplugDeviceImpl {
  protected _name: string;
  protected _address: string;
  protected _logger = ButtplugLogger.Logger;

  public get Name(): string {
    return this._name;
  }

  public get Address(): string {
    return this._address;
  }

  protected constructor(aName: string, aAddress: string) {
    super();
    this._name = aName;
    this._address = aAddress;
  }

  public abstract async Connect(): Promise<void>;
  public abstract get Connected(): boolean;
  public abstract Disconnect(): void;

  public WriteValue = async (aValue: Buffer, aOptions?: ButtplugDeviceWriteOptions): Promise<void> => {
    return await this.WriteValueInternal(aValue, aOptions || new ButtplugDeviceWriteOptions());
  }

  public ReadValue = async (aOptions?: ButtplugDeviceReadOptions): Promise<Buffer> => {
    return await this.ReadValueInternal(aOptions || new ButtplugDeviceReadOptions());
  }

  public WriteString = async (aStr: string, aOptions?: ButtplugDeviceWriteOptions): Promise<void> => {
    return await this.WriteValue(Buffer.from(aStr), aOptions);
  }

  public ReadString = async (aOptions?: ButtplugDeviceReadOptions): Promise<string> => {
    const buf = await this.ReadValue(aOptions);
    return buf.toString("utf-8");
  }

  public SubscribeToUpdates = async (aOptions?: ButtplugDeviceReadOptions): Promise<void> => {
    return await this.SubscribeToUpdatesInternal(aOptions || new ButtplugDeviceReadOptions());
  }

  public abstract async WriteValueInternal(aValue: Buffer, aOptions: ButtplugDeviceWriteOptions): Promise<void>;
  public abstract async ReadValueInternal(aOptions: ButtplugDeviceReadOptions): Promise<Buffer>;
  public abstract async SubscribeToUpdatesInternal(aOptions: ButtplugDeviceReadOptions): Promise<void>;

  protected UpdateReceived(aEndpoint: Endpoints, aData: Buffer) {
    this.emit("updateReceived", [aEndpoint, aData]);
  }
}
