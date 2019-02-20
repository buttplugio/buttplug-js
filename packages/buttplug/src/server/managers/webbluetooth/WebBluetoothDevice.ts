/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import { ButtplugException, ButtplugDeviceException } from "../../../core/Exceptions";
import { ButtplugDeviceImpl } from "../../../devices/ButtplugDeviceImpl";
import { Endpoints } from "../../../devices/Endpoints";
import { BluetoothLEProtocolConfiguration } from "../../../devices/configuration/BluetoothLEProtocolConfiguration";
import { ButtplugDeviceWriteOptions } from "../../../devices/ButtplugDeviceWriteOptions";
import { ButtplugDeviceReadOptions } from "../../../devices/ButtplugDeviceReadOptions";

export class WebBluetoothDevice extends ButtplugDeviceImpl {

  private _notificationHandlers = new Map<Endpoints, (Event) => void>();
  private _server: BluetoothRemoteGATTServer;
  private _characteristics: Map<Endpoints, BluetoothRemoteGATTCharacteristic> =
    new Map<Endpoints, BluetoothRemoteGATTCharacteristic>();

  public constructor(private _deviceConfig: BluetoothLEProtocolConfiguration,
                     private _device: BluetoothDevice) {
    super(_device.name!, _device.id);
  }

  public Connect = async (): Promise<void> => {
    this._logger.Debug(`WebBluetoothDevice: ${this.constructor.name} connecting`);
    this._device.addEventListener("gattserverdisconnected", this.OnDisconnect);
    this._server = await this._device.gatt!.connect();

    // We passed along a list of services we expect to work with all hardware as
    // part of the connection filters, so only those services will be found when
    // running getPrimaryServices
    const services = await this._server.getPrimaryServices();
    if (services.length === 0) {
      throw ButtplugException.LogAndError(ButtplugDeviceException,
                                          this._logger,
                                          `Cannot find gatt service to connect to on device ${this._device.name}`);
    }

    for (let [configService, configChrs] of this._deviceConfig.Services) {
      let service = services.find((x) => x.uuid == configService)
      if (service === undefined) {
        continue;
      }
      // If no characteristics are present in the DeviceInfo block, we assume that
      // we're connecting to a simple rx/tx service, and can query to figure out
      // characteristics. Assume that the characteristics have tx/rx references.
      if (configChrs.size == 0) {
        const characteristics = await service.getCharacteristics();
        for (const char of characteristics) {
          if (char.properties.write ||
              char.properties.writeWithoutResponse ||
              char.properties.reliableWrite) {
            this.SetNewCharacteristic(Endpoints.Tx, char);
          } else if (char.properties.read ||
                     char.properties.broadcast ||
                     char.properties.notify ||
                     char.properties.indicate) {
            this.SetNewCharacteristic(Endpoints.Rx, char)
          }
        }
        continue;
      }

      for (let [chrEndpoint, chrUuid] of configChrs) {
        this.SetNewCharacteristic(chrEndpoint, await service.getCharacteristic(chrUuid));
      }
    }

    // If at this point we still don't have any characteristics, something is
    // wrong, error out.
    if (this._characteristics.size === 0) {
      throw new ButtplugDeviceException(`No usable characteristics found for ${this._device.name}`);
    }
  }

  public get Connected(): boolean {
    return this._server.connected;
  }

  private SetNewCharacteristic(aEndpoint: Endpoints, aChr: BluetoothRemoteGATTCharacteristic): void {
    if (this._characteristics.has(aEndpoint)) {
      throw new ButtplugDeviceException(`Endpoint ${aEndpoint} already defined on ${this._device.name}`);
    }
    this._characteristics.set(aEndpoint, aChr);
  }

  public Disconnect = async (): Promise<void> => {
    for (const chr of this._notificationHandlers.keys()) {
      this.Unsubscribe(new ButtplugDeviceReadOptions({ Endpoint: chr }));
    }
    this._server.disconnect();
  }

  public OnDisconnect = () => {
    this._logger.Debug(`WebBluetoothDevice: ${this.constructor.name} disconnecting`);
    this._device.removeEventListener("gattserverdisconnected", this.OnDisconnect);
    this.emit("deviceremoved");
  }

  public WriteValueInternal = async (aValue: Buffer, aOptions: ButtplugDeviceWriteOptions): Promise<void> => {
    if (!this._characteristics.has(aOptions.Endpoint)) {
      throw ButtplugException.LogAndError(ButtplugDeviceException,
                                          this._logger,
                                          `Characteristic ${aOptions.Endpoint} does not exist on device ${this._device.name}.`);
    }
    const chr = this._characteristics.get(aOptions.Endpoint)!;
    //this._logger.Trace(`WebBluetoothDevice: ${this.constructor.name} writing ${aValue} to ${chr.uuid}`);
    await chr.writeValue(aValue);
  }

  public ReadValueInternal = async (aOptions: ButtplugDeviceReadOptions): Promise<Buffer> => {
    if (!this._characteristics.has(aOptions.Endpoint)) {
      throw ButtplugException.LogAndError(ButtplugDeviceException,
                                          this._logger,
                                          `Characteristic ${aOptions.Endpoint} does not exist on device ${this._device.name}.`);
    }
    const chr = this._characteristics.get(aOptions.Endpoint)!;
    // this._logger.Trace(`WebBluetoothDevice: ${this.constructor.name} reading from ${chr.uuid}`);
    return Buffer.from((await chr.readValue()).buffer);
  }

  public SubscribeToUpdatesInternal = async (aOptions: ButtplugDeviceReadOptions): Promise<void> => {
    if (!this._characteristics.has(aOptions.Endpoint)) {
      throw ButtplugException.LogAndError(ButtplugDeviceException,
                                          this._logger,
                                          `Characteristic ${aOptions.Endpoint} does not exist on device ${this._device.name}.`);
    }
    if (this._notificationHandlers.has(aOptions.Endpoint)) {
      throw ButtplugException.LogAndError(ButtplugDeviceException,
                                          this._logger,
                                          "${this._device.name} already subscribed to updates on characteristic ${aOptions.Endpoint}");
    }
    const chr = this._characteristics.get(aOptions.Endpoint)!;
    this._logger.Trace(`WebBluetoothDevice: ${this.constructor.name} subscribing to updates from ${chr.uuid}`);
    await chr.startNotifications();
    this._notificationHandlers.set(aOptions.Endpoint, (event: Event) => {
      this.CharacteristicValueChanged(event, aOptions.Endpoint);
    });
    chr.addEventListener("characteristicvaluechanged", this._notificationHandlers.get(aOptions.Endpoint)!);
  }

  public Unsubscribe = async (aOptions: ButtplugDeviceReadOptions): Promise<void> => {
    if (!this._characteristics.has(aOptions.Endpoint)) {
      throw ButtplugException.LogAndError(ButtplugDeviceException,
                                          this._logger,
                                          `Characteristic ${aOptions.Endpoint} does not exist on device ${this._device.name}.`);
    }
    if (!this._notificationHandlers.has(aOptions.Endpoint)) {
      throw ButtplugException.LogAndError(ButtplugDeviceException,
                                          this._logger,
                                          "${this._device.name} not subscribed to updates on characteristic ${aOptions.Endpoint}");
    }
    const chr = this._characteristics.get(aOptions.Endpoint)!;
    this._logger.Trace(`WebBluetoothDevice: ${this.constructor.name} unsubscribing to updates from ${chr.uuid}`);
    chr.removeEventListener("characteristicvaluechanged", this._notificationHandlers.get(aOptions.Endpoint)!);
    this._notificationHandlers.delete(aOptions.Endpoint);
    await chr.stopNotifications();
  }

  protected CharacteristicValueChanged = (aEvent: Event, aCharacteristic: Endpoints) => {
    let view = (aEvent.target! as BluetoothRemoteGATTCharacteristic).value!
    let arrBuf = view.buffer;
    let buf = Buffer.from(arrBuf, view.byteOffset, view.byteLength);
    this.UpdateReceived(aCharacteristic, buf)
  }
}

