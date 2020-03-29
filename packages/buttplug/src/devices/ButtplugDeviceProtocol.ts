/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import * as Messages from "../core/Messages";
import { IButtplugDeviceProtocol } from "./IButtplugDeviceProtocol";
import { EventEmitter } from "events";
import { ButtplugLogger } from "../core/Logging";
import { ButtplugMessageException } from "../core/Exceptions";
import { IButtplugDeviceImpl } from "./IButtplugDeviceImpl";

export abstract class ButtplugDeviceProtocol extends EventEmitter implements IButtplugDeviceProtocol {

  public get Name(): string {
    return this._name;
  }

  // tslint:disable-next-line:ban-types
  public get AllowedMessageTypes(): Function[] {
    return Array.from(this.MsgFuncs.keys());
  }

  public abstract readonly MessageSpecifications: object;
  // It would be really nice to store a map of types here, but the only way I
  // can figure out to do that is using the constructor for
  // ButtplugDeviceMessage classes, which always resolves to Function. This is
  // basically a useless type in Typescript, but it does the job for now. Just
  // means we have to turn off type complaining.
  //
  // tslint:disable-next-line:ban-types
  protected readonly MsgFuncs: Map<Function, (aMsg: Messages.ButtplugMessage) => Promise<Messages.ButtplugMessage>> =
    // tslint:disable-next-line:ban-types
    new Map<Function, (aMsg: Messages.ButtplugMessage) => Promise<Messages.ButtplugMessage>>();
  protected _name: string;
  protected _logger: ButtplugLogger = ButtplugLogger.Logger;
  protected _device: IButtplugDeviceImpl;

  protected constructor(aName: string, aDevice: IButtplugDeviceImpl) {
    super();
    this._name = aName;
    this._device = aDevice;
  }

  public async Initialize(): Promise<void> {
    return Promise.resolve();
  }

  public ParseMessage = async (aMsg: Messages.ButtplugMessage): Promise<Messages.ButtplugMessage> => {
    if (!this.MsgFuncs.has(aMsg.Type)) {
      throw new ButtplugMessageException(`${this._name} cannot handle message of type ${aMsg.Type.name}`, aMsg.Id);
    }
    // Non-null assurance in the middle of functions looks weird.
    return this.MsgFuncs.get(aMsg.Type)!(aMsg);
  }
}

export type ButtplugDeviceProtocolType = new (aImpl: IButtplugDeviceImpl) => IButtplugDeviceProtocol;
