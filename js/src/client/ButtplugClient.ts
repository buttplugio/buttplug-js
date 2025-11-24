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
  ButtplugError,
  ButtplugInitError,
  ButtplugMessageError,
} from '../core/Exceptions';
import { ButtplugClientConnectorException } from './ButtplugClientConnectorException';

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

  public get devices(): Map<number, ButtplugClientDevice> {
    // While this function doesn't actually send a message, if we don't have a
    // connector, we shouldn't have devices.
    this.checkConnector();
    return this._devices;
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
    await this.sendMsgExpectOk({ StartScanning: { Id: 1 } });
  };

  public stopScanning = async () => {
    this._logger.Debug('ButtplugClient: StopScanning called');
    this._isScanning = false;
    await this.sendMsgExpectOk({ StopScanning: { Id: 1 } });
  };

  public stopAllDevices = async () => {
    this._logger.Debug('ButtplugClient: StopAllDevices');
    await this.sendMsgExpectOk({ StopAllDevices: { Id: 1 } });
  };

  protected disconnectHandler = () => {
    this._logger.Info('ButtplugClient: Disconnect event receieved.');
    this.emit('disconnect');
  };

  protected parseMessages = (msgs: Messages.ButtplugMessage[]) => {
    const leftoverMsgs = this._sorter.ParseIncomingMessages(msgs);
    for (const x of leftoverMsgs) {
      if (x.DeviceList !== undefined) {
        this.parseDeviceList(x as Messages.DeviceList);
        break;
      } else if (x.ScanningFinished !== undefined) {
        this._isScanning = false;
        this.emit('scanningfinished', x);
      }
    }
  };

  protected initializeConnection = async (): Promise<boolean> => {
    this.checkConnector();
    const msg = await this.sendMessage(
      {
        RequestServerInfo: {
          ClientName: this._clientName,
          Id: 1,
          ProtocolVersionMajor: Messages.MESSAGE_SPEC_VERSION_MAJOR,
          ProtocolVersionMinor: Messages.MESSAGE_SPEC_VERSION_MINOR
        }
      }
    );
    if (msg.ServerInfo !== undefined) {
      const serverinfo = msg as Messages.ServerInfo;
      this._logger.Info(
        `ButtplugClient: Connected to Server ${serverinfo.ServerName}`
      );
      // TODO: maybe store server name, do something with message template version?
      const ping = serverinfo.MaxPingTime;
      // If the server version is lower than the client version, the server will disconnect here.
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
    } else if (msg.Error !== undefined) {
      // Disconnect and throw an exception with the error message we got back.
      // This will usually only error out if we have a version mismatch that the
      // server has detected.
      await this._connector!.disconnect();
      const err = msg.Error as Messages.Error;
      throw ButtplugError.LogAndError(
        ButtplugInitError,
        this._logger,
        `Cannot connect to server. ${err.ErrorMessage}`
      );
    }
    return false;
  }

  private parseDeviceList = (list: Messages.DeviceList) => {
    for (let [_, d] of Object.entries(list.Devices)) {
      if (!this._devices.has(d.DeviceIndex)) {
        const device = ButtplugClientDevice.fromMsg(
          d,
          this.sendMessageClosure
        );
        this._logger.Debug(`ButtplugClient: Adding Device: ${device}`);
        this._devices.set(d.DeviceIndex, device);
        this.emit('deviceadded', device);
      } else {
        this._logger.Debug(`ButtplugClient: Device already added: ${d}`);
      }
    }
    for (let [index, device] of this._devices.entries()) {
      if (!list.Devices.hasOwnProperty(index.toString())) {
        this._devices.delete(index);
        this.emit('deviceremoved', device);
      }
    }
  }

  protected requestDeviceList = async () => {
    this.checkConnector();
    this._logger.Debug('ButtplugClient: ReceiveDeviceList called');
    const response = (await this.sendMessage(
      {
        RequestDeviceList: { Id: 1 }
      }
    ));    
    this.parseDeviceList(response.DeviceList!);
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
    if (response.Ok !== undefined) {
      return;
    } else if (response.Error !== undefined) {
      throw ButtplugError.FromError(response as Messages.Error);
    } else {
      throw ButtplugError.LogAndError(
        ButtplugMessageError,
        this._logger,
        `Message ${response} not handled by SendMsgExpectOk`
      );
    }
  };

  protected sendMessageClosure = async (
    msg: Messages.ButtplugMessage
  ): Promise<Messages.ButtplugMessage> => {
    return await this.sendMessage(msg);
  };
}
