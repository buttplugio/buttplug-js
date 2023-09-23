/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

'use strict';

import { ButtplugLogger } from '../core/Logging';
import { EventEmitter } from 'eventemitter3';
import { ButtplugClientDevice } from './ButtplugClientDevice';
import { IButtplugClientConnector } from './IButtplugClientConnector';
import { ButtplugMessageSorter } from '../utils/ButtplugMessageSorter';

import * as Messages from '../core/Messages';
import {
  ButtplugDeviceError,
  ButtplugError,
  ButtplugInitError,
  ButtplugMessageError,
} from '../core/Exceptions';
import { ButtplugClientConnectorException } from './ButtplugClientConnectorException';
import { getMessageClassFromMessage } from '../core/MessageUtils';

export class ButtplugClient extends EventEmitter {
  protected _pingTimer: NodeJS.Timeout | null = null;
  protected _connector: IButtplugClientConnector | null = null;
  protected _devices: Map<number, ButtplugClientDevice> = new Map();
  protected _clientName: string;
  protected _logger = ButtplugLogger.Logger;
  protected _isScanning = false;
  private _sorter: ButtplugMessageSorter = new ButtplugMessageSorter(true);

  constructor(clientName = 'Generic Buttplug Client') {
    super();
    this._clientName = clientName;
    this._logger.Debug(`ButtplugClient: Client ${clientName} created.`);
  }

  public get connected(): boolean {
    return this._connector !== null && this._connector.Connected;
  }

  public get devices(): ButtplugClientDevice[] {
    // While this function doesn't actually send a message, if we don't have a
    // connector, we shouldn't have devices.
    this.checkConnector();
    const devices: ButtplugClientDevice[] = [];
    this._devices.forEach((d) => {
      devices.push(d);
    });
    return devices;
  }

  public get isScanning(): boolean {
    return this._isScanning;
  }

  public connect = async (connector: IButtplugClientConnector) => {
    this._logger.Info(
      `ButtplugClient: Connecting using ${connector.constructor.name}`
    );
    await connector.connect();
    this._connector = connector;
    this._connector.addListener('message', this.parseMessages);
    this._connector.addListener('disconnect', this.disconnectHandler);
    await this.initializeConnection();
  };

  public disconnect = async () => {
    this._logger.Debug('ButtplugClient: Disconnect called');
    this.checkConnector();
    await this.shutdownConnection();
    await this._connector!.disconnect();
  };

  public startScanning = async () => {
    this._logger.Debug('ButtplugClient: StartScanning called');
    this._isScanning = true;
    await this.sendMsgExpectOk(new Messages.StartScanning());
  };

  public stopScanning = async () => {
    this._logger.Debug('ButtplugClient: StopScanning called');
    this._isScanning = false;
    await this.sendMsgExpectOk(new Messages.StopScanning());
  };

  public stopAllDevices = async () => {
    this._logger.Debug('ButtplugClient: StopAllDevices');
    await this.sendMsgExpectOk(new Messages.StopAllDevices());
  };

  private async sendDeviceMessage(
    device: ButtplugClientDevice,
    deviceMsg: Messages.ButtplugDeviceMessage
  ): Promise<Messages.ButtplugMessage> {
    this.checkConnector();
    const dev = this._devices.get(device.index);
    if (dev === undefined) {
      throw ButtplugError.LogAndError(
        ButtplugDeviceError,
        this._logger,
        `Device ${device.index} not available.`
      );
    }
    deviceMsg.DeviceIndex = device.index;
    return await this.sendMessage(deviceMsg);
  }

  protected disconnectHandler = () => {
    this._logger.Info('ButtplugClient: Disconnect event receieved.');
    this.emit('disconnect');
  };

  protected parseMessages = (msgs: Messages.ButtplugMessage[]) => {
    const leftoverMsgs = this._sorter.ParseIncomingMessages(msgs);
    for (const x of leftoverMsgs) {
      switch (getMessageClassFromMessage(x)) {
        case Messages.DeviceAdded: {
          const addedMsg = x as Messages.DeviceAdded;
          const addedDevice = ButtplugClientDevice.fromMsg(
            addedMsg,
            this.sendDeviceMessageClosure
          );
          this._devices.set(addedMsg.DeviceIndex, addedDevice);
          this.emit('deviceadded', addedDevice);
          break;
        }
        case Messages.DeviceRemoved: {
          const removedMsg = x as Messages.DeviceRemoved;
          if (this._devices.has(removedMsg.DeviceIndex)) {
            const removedDevice = this._devices.get(removedMsg.DeviceIndex);
            removedDevice?.emitDisconnected();
            this._devices.delete(removedMsg.DeviceIndex);
            this.emit('deviceremoved', removedDevice);
          }
          break;
        }
        case Messages.ScanningFinished:
          this._isScanning = false;
          this.emit('scanningfinished', x);
          break;
      }
    }
  };

  protected initializeConnection = async (): Promise<boolean> => {
    this.checkConnector();
    const msg = await this.sendMessage(
      new Messages.RequestServerInfo(
        this._clientName,
        Messages.MESSAGE_SPEC_VERSION
      )
    );
    switch (getMessageClassFromMessage(msg)) {
      case Messages.ServerInfo: {
        const serverinfo = msg as Messages.ServerInfo;
        this._logger.Info(
          `ButtplugClient: Connected to Server ${serverinfo.ServerName}`
        );
        // TODO: maybe store server name, do something with message template version?
        const ping = serverinfo.MaxPingTime;
        if (serverinfo.MessageVersion < Messages.MESSAGE_SPEC_VERSION) {
          // Disconnect and throw an exception explaining the version mismatch problem.
          await this._connector!.disconnect();
          throw ButtplugError.LogAndError(
            ButtplugInitError,
            this._logger,
            `Server protocol version ${serverinfo.MessageVersion} is older than client protocol version ${Messages.MESSAGE_SPEC_VERSION}. Please update server.`
          );
        }
        if (ping > 0) {
          /*
          this._pingTimer = setInterval(async () => {
            // If we've disconnected, stop trying to ping the server.
            if (!this.Connected) {
              await this.ShutdownConnection();
              return;
            }
            await this.SendMessage(new Messages.Ping());
          } , Math.round(ping / 2));
          */
        }
        await this.requestDeviceList();
        return true;
      }
      case Messages.Error: {
        // Disconnect and throw an exception with the error message we got back.
        // This will usually only error out if we have a version mismatch that the
        // server has detected.
        await this._connector!.disconnect();
        const err = msg as Messages.Error;
        throw ButtplugError.LogAndError(
          ButtplugInitError,
          this._logger,
          `Cannot connect to server. ${err.ErrorMessage}`
        );
      }
    }
    return false;
  };

  protected requestDeviceList = async () => {
    this.checkConnector();
    this._logger.Debug('ButtplugClient: ReceiveDeviceList called');
    const deviceList = (await this.sendMessage(
      new Messages.RequestDeviceList()
    )) as Messages.DeviceList;
    deviceList.Devices.forEach((d) => {
      if (!this._devices.has(d.DeviceIndex)) {
        const device = ButtplugClientDevice.fromMsg(
          d,
          this.sendDeviceMessageClosure
        );
        this._logger.Debug(`ButtplugClient: Adding Device: ${device}`);
        this._devices.set(d.DeviceIndex, device);
        this.emit('deviceadded', device);
      } else {
        this._logger.Debug(`ButtplugClient: Device already added: ${d}`);
      }
    });
  };

  protected shutdownConnection = async () => {
    await this.stopAllDevices();
    if (this._pingTimer !== null) {
      clearInterval(this._pingTimer);
      this._pingTimer = null;
    }
  };

  protected async sendMessage(
    msg: Messages.ButtplugMessage
  ): Promise<Messages.ButtplugMessage> {
    this.checkConnector();
    const p = this._sorter.PrepareOutgoingMessage(msg);
    await this._connector!.send(msg);
    return await p;
  }

  protected checkConnector() {
    if (!this.connected) {
      throw new ButtplugClientConnectorException(
        'ButtplugClient not connected'
      );
    }
  }

  protected sendMsgExpectOk = async (
    msg: Messages.ButtplugMessage
  ): Promise<void> => {
    const response = await this.sendMessage(msg);
    switch (getMessageClassFromMessage(response)) {
      case Messages.Ok:
        return;
      case Messages.Error:
        throw ButtplugError.FromError(response as Messages.Error);
      default:
        throw ButtplugError.LogAndError(
          ButtplugMessageError,
          this._logger,
          `Message type ${getMessageClassFromMessage(response)!.constructor} not handled by SendMsgExpectOk`
        );
    }
  };

  protected sendDeviceMessageClosure = async (
    device: ButtplugClientDevice,
    msg: Messages.ButtplugDeviceMessage
  ): Promise<Messages.ButtplugMessage> => {
    return await this.sendDeviceMessage(device, msg);
  };
}
