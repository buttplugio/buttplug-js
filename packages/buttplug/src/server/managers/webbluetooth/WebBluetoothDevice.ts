/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import { ButtplugException, ButtplugDeviceException } from "../../../core/Exceptions";
import { ButtplugDeviceImpl } from "../../../devices/ButtplugDeviceImpl";
import { Endpoints, GetEndpoint } from "../../../devices/Endpoints";
import { BluetoothLEProtocolConfiguration } from "../../../devices/configuration/BluetoothLEProtocolConfiguration";
import { ButtplugDeviceWriteOptions } from "../../../devices/ButtplugDeviceWriteOptions";
import { ButtplugDeviceReadOptions } from "../../../devices/ButtplugDeviceReadOptions";

export class WebBluetoothDevice extends ButtplugDeviceImpl {

  public get Connected(): boolean {
    return this._server.connected;
  }

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

    for (const [configService, configChrs] of this._deviceConfig.Services) {
      // We passed along a list of services we expect to work with all hardware
      // as part of the connection filters, so these services will be found when
      // running getPrimaryService
      let service: BluetoothRemoteGATTService;
      try {
        service = await this._server.getPrimaryService(configService);
      } catch (e) {
        // We may run into services that aren't actually on the current device.
        // For instance, we have a long list of expected services for Lovense
        // devices. In this case, log and continue looking through the list.
        this._logger.Debug(`Cannot find gatt service ${configService} on device ${this._device.name}, continuing search.`);
        continue;
      }
      // If no characteristics are present in the DeviceInfo block, we assume that
      // we're connecting to a simple rx/tx service, and can query to figure out
      // characteristics. Assume that the characteristics have tx/rx references.
      //
      // Note: This will always fail for WebBLE/iOS WebBluetooth at the moment,
      // as the polyfill lacks any enumeration functionality. Only use this as a
      // last resort.
      if (configChrs.size === 0) {
        let characteristics: BluetoothRemoteGATTCharacteristic[] = [];
        try {
          characteristics = await service.getCharacteristics();
        } catch (e) {
          // If we have a device that requires characteristic searches, but
          // whatever polyfill we're using doesn't allow for it, just complain
          // and refuse to connect.
          throw ButtplugException.LogAndError(ButtplugDeviceException,
                                              this._logger,
                                              `getCharacteristics not implemented on this platform, cannot connect to ${this._device.name}`);

        }
        for (const char of characteristics) {
          if (char.properties.write ||
              char.properties.writeWithoutResponse ||
              char.properties.reliableWrite) {
            this.SetNewCharacteristic(Endpoints.Tx, char);
          } else if (char.properties.read ||
                     char.properties.broadcast ||
                     char.properties.notify ||
                     char.properties.indicate) {
            this.SetNewCharacteristic(Endpoints.Rx, char);
          }
        }
        continue;
      }

      for (const [chrEndpoint, chrUuid] of configChrs) {
        // Assume that our characteristic name is correct if we've gotten this
        // far. Hopefully not a wrong assumption at the moment, though it's
        // something we'll need to change once arbitrary string endpoints are
        // allowed.
        this.SetNewCharacteristic(GetEndpoint(chrEndpoint)!, await service.getCharacteristic(chrUuid));
      }
    }

    // If at this point we still don't have any characteristics, something is
    // wrong, error out.
    if (this._characteristics.size === 0) {
      throw new ButtplugDeviceException(`No usable characteristics found for ${this._device.name}`);
    }
  }

  public Disconnect = async (): Promise<void> => {
    for (const chr of this._notificationHandlers.keys()) {
      await this.Unsubscribe(new ButtplugDeviceReadOptions({ Endpoint: chr }));
    }
    this._server.disconnect();
  }

  public OnDisconnect = () => {
    this._logger.Debug(`WebBluetoothDevice: ${this.constructor.name} disconnecting`);
    this._device.removeEventListener("gattserverdisconnected", this.OnDisconnect);
    this.emit("deviceremoved");
  }

  public WriteValueInternal = async (aValue: Buffer, aOptions: ButtplugDeviceWriteOptions): Promise<void> => {
    this.CheckForCharacteristic(aOptions.Endpoint);
    const chr = this._characteristics.get(aOptions.Endpoint)!;
    // this._logger.Trace(`WebBluetoothDevice: ${this.constructor.name} writing ${aValue} to ${chr.uuid}`);
    return await chr.writeValue(aValue);
  }

  public ReadValueInternal = async (aOptions: ButtplugDeviceReadOptions): Promise<Buffer> => {
    this.CheckForCharacteristic(aOptions.Endpoint);
    const chr = this._characteristics.get(aOptions.Endpoint)!;
    // this._logger.Trace(`WebBluetoothDevice: ${this.constructor.name} reading from ${chr.uuid}`);
    return Buffer.from((await chr.readValue()).buffer);
  }

  public SubscribeToUpdatesInternal = async (aOptions: ButtplugDeviceReadOptions): Promise<void> => {
    this.CheckForCharacteristic(aOptions.Endpoint);
    if (this._notificationHandlers.has(aOptions.Endpoint)) {
      const err = `${this._device.name} already subscribed to updates on characteristic ${aOptions.Endpoint}`;
      throw ButtplugException.LogAndError(ButtplugDeviceException,
                                          this._logger,
                                          err);
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
    this.CheckForCharacteristic(aOptions.Endpoint);
    if (!this._notificationHandlers.has(aOptions.Endpoint)) {
      const err = `${this._device.name} not subscribed to updates on characteristic ${aOptions.Endpoint}`;
      throw ButtplugException.LogAndError(ButtplugDeviceException,
                                          this._logger,
                                          err);
    }
    const chr = this._characteristics.get(aOptions.Endpoint)!;
    this._logger.Trace(`WebBluetoothDevice: ${this.constructor.name} unsubscribing to updates from ${chr.uuid}`);
    chr.removeEventListener("characteristicvaluechanged", this._notificationHandlers.get(aOptions.Endpoint)!);
    this._notificationHandlers.delete(aOptions.Endpoint);
    await chr.stopNotifications();
  }

  protected CharacteristicValueChanged = (aEvent: Event, aCharacteristic: Endpoints) => {
    const view = (aEvent.target! as BluetoothRemoteGATTCharacteristic).value!;
    const arrBuf = view.buffer;
    const buf = Buffer.from(arrBuf, view.byteOffset, view.byteLength);
    this.UpdateReceived(aCharacteristic, buf);
  }

  protected CheckForCharacteristic(aEndpoint: Endpoints) {
    if (this._characteristics.has(aEndpoint)) {
      return;
    }
    const err = `Characteristic ${aEndpoint} does not exist on device ${this._device.name}.`;
    throw ButtplugException.LogAndError(ButtplugDeviceException,
                                        this._logger,
                                        err);
  }

  private SetNewCharacteristic(aEndpoint: Endpoints, aChr: BluetoothRemoteGATTCharacteristic): void {
    if (this._characteristics.has(aEndpoint)) {
      throw new ButtplugDeviceException(`Endpoint ${aEndpoint} already defined on ${this._device.name}`);
    }
    this._characteristics.set(aEndpoint, aChr);
  }
}
