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
import { ButtplugDevice } from "../../../devices/ButtplugDevice";
import { ButtplugDeviceMessage, DeviceRemoved, DeviceAdded, Ok, Error, ButtplugMessage } from "core/Messages";
import { ForwardedDevice } from "./ForwardedDevice";
import { ButtplugMessageSorter } from "utils/ButtplugMessageSorter";
import { getRandomInt } from "utils/Utils";
import { ForwardedDeviceProtocol } from "./ForwardedDeviceProtocol";

export interface ButtplugServerForwarderConnector extends EventEmitter {
    Listen(): Promise<void>;
    Disconnect(): Promise<void>;
    SendMessage(message: ButtplugDeviceMessage): Promise<void>;
}

export class ForwardedDeviceManager extends EventEmitter implements IDeviceSubtypeManager {
  private _logger: ButtplugLogger;
  private _connector: ButtplugServerForwarderConnector;
  private _devices: ForwardedDevice[];
  private _sorter: ButtplugMessageSorter = new ButtplugMessageSorter(false);

  constructor(aLogger: ButtplugLogger | undefined, connector: ButtplugServerForwarderConnector) {
    super();
    this.SetLogger(aLogger !== undefined ? aLogger : ButtplugLogger.Logger);
    this._connector = connector;
    this._connector.addListener("message", (msg) => { this.ParseConnectorMessage(msg); });
  }

  public SetLogger(aLogger: ButtplugLogger) {
    this._logger = aLogger;
  }

  public async StartScanning() {
    // noop.
    this.emit("scanningfinished");
  }

  public StopScanning() {
    // noop. We only scan once then call it done.
  }

  public get IsScanning(): boolean {
    // noop.
    return false;
  }

  private SendMessage = async (msg: ButtplugDeviceMessage): Promise<ButtplugMessage> => {
    const p = this._sorter.PrepareOutgoingMessage(msg);
    await this._connector.SendMessage(msg);
    return p;
  }

  // Doesn't need to be async, because we're just forming our device and
  // emitting right now.
  private ParseConnectorMessage = (msg: DeviceAdded | DeviceRemoved | Ok | Error) => {
    switch (msg.constructor) {
        case Ok:
        case Error:
          this._sorter.ParseIncomingMessages([msg]);
          break;
        case DeviceAdded: {
          const da = msg as DeviceAdded;

          // Make a device out of this message and emit it.
          const deviceImpl = new ForwardedDevice(da.DeviceName, getRandomInt(2 ^ 32).toString());
          const deviceProtocol = new ForwardedDeviceProtocol(deviceImpl, da.DeviceIndex, da.DeviceMessages, (aMsg: ButtplugDeviceMessage) => this.SendMessage(aMsg));
          const device = new ButtplugDevice(deviceProtocol, deviceImpl);
          this.emit("deviceadded", device);
        }
        case DeviceRemoved: {
          // Pull the device out of our map, emit removed.
        }
    }
  }
}
