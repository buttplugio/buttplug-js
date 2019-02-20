/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import * as noble from "noble-uwp";
import * as uuidParse from "uuid-parse";

import * as util from "util";
import { ButtplugDeviceImpl, BluetoothLEProtocolConfiguration, Endpoints, ButtplugDeviceWriteOptions, ButtplugDeviceReadOptions, ButtplugDeviceException } from "buttplug";

export class ButtplugNodeBluetoothLEDevice extends ButtplugDeviceImpl {

  private _characteristics: Map<Endpoints, noble.Characteristic> =
    new Map<Endpoints, noble.Characteristic>();
  private _notificationHandlers = new Map<Endpoints, (aNotification: boolean, aCharName: string) => void>();

  public constructor(private _deviceInfo: BluetoothLEProtocolConfiguration,
                     private _device: noble.Peripheral) {
    super(_device.advertisement.localName, _device.address);
  }

  public get Name(): string {
    return this._device.advertisement.localName!;
  }

  public get Id(): string {
    return this._device.id;
  }

  public get Connected(): boolean {
    // TODO How can we figure out connection status here?
    return true;
  }

  public Connect = async (): Promise<void> => {
    // Declare promisified versions of noble functions, just to keep things asyncy.
    const connectAsync: () => Promise<void> =
      util.promisify(this._device.connect.bind(this._device));
    const discoverServicesAsync: (x: string[]) => noble.Service[] =
      util.promisify(this._device.discoverServices.bind(this._device));

    await connectAsync();
    // God damnit noble why can't you just take a normal formatted UUID like
    // everyone else. Stripping all of the dashes out of our UUIDs because life
    // is horrible.
    let nobleServices = Array.from(this._deviceInfo.Services.keys()).map((x) => this.RegularToNobleUuid(x));

    // TODO Figure out service uuid shortening rules because one god damn line
    // later everything continues to be fucking horrible and this will miss
    // services starting with 0000 because it assumes 16-bit shortened form.
    let services = await discoverServicesAsync(nobleServices);

    for (const service of services) {
      const discoverCharsAsync: (x: string[]) => noble.Characteristic[] =
        util.promisify(service.discoverCharacteristics.bind(service));
      const serviceUuid = this.NobleToRegularUuid(service.uuid);
      const chrs = this._deviceInfo.Services.get(serviceUuid)!;

      if (chrs.size !== 0) {
        for (let [name, uuid] of chrs.entries()) {
          const nobleChr = this.RegularToNobleUuid(uuid);
          this._characteristics.set(name,
                                    (await discoverCharsAsync([nobleChr]))[0]);
        }
        continue;
      }
      // If no characteristics are present in the DeviceInfo block, we assume that
      // we're connecting to a simple rx/tx service, and can query to figure out
      // characteristics. Assume that the characteristics have tx/rx references.
      const characteristics = await discoverCharsAsync([]);
      for (const char of characteristics) {
        if (char.properties.indexOf("write") !== -1 ||
            char.properties.indexOf("writeWithoutResponse") !== -1 ||
            char.properties.indexOf("reliableWrite") !== -1) {
          this._characteristics.set(Endpoints.Tx, char);
        } else if (char.properties.indexOf("read") !== -1 ||
                   char.properties.indexOf("broadcast") !== -1 ||
                   char.properties.indexOf("notify") !== -1 ||
                   char.properties.indexOf("indicate") !== -1) {
          this._characteristics.set(Endpoints.Rx, char);
        }
      }
    }
  }

  private RegularToNobleUuid(aRegularUuid: string): string {
    return aRegularUuid.replace(/-/g, "");
  }

  private NobleToRegularUuid(aRegularUuid: string): string {
    // I can't believe I'm bringing in a whole UUID library for this but such is
    // life in node.
    return uuidParse.unparse(Buffer.from(aRegularUuid, 'hex'));
  }

  public OnDisconnect = () => {
    this._device.disconnect();
    this.emit("deviceremoved");
  }

  public WriteValueInternal = async (aValue: Buffer, aOptions: ButtplugDeviceWriteOptions): Promise<void> => {
    if (!this._characteristics.has(aOptions.Endpoint)) {
      return;
    }
    const chr = this._characteristics.get(aOptions.Endpoint)!;
    return await util.promisify(chr.write.bind(chr))(aValue, false);
  }

  public ReadValueInternal = async (aOptions: ButtplugDeviceReadOptions): Promise<Buffer> => {
    if (!this._characteristics.has(aOptions.Endpoint)) {
      throw new ButtplugDeviceException(`Device ${this._device.advertisement.localName} has not endpoint named ${aOptions.Endpoint}`);
    }
    const chr = this._characteristics.get(aOptions.Endpoint)!;
    return await util.promisify(chr.read.bind(chr))();
  }

  public SubscribeToUpdatesInternal = (aOptions: ButtplugDeviceReadOptions): Promise<void> => {
    if (!this._characteristics.has(aOptions.Endpoint)) {
      throw new ButtplugDeviceException(`Device ${this._device.advertisement.localName} has not endpoint named ${aOptions.Endpoint}`);
    }
    console.log("Subscribing!");
    const chr = this._characteristics.get(aOptions.Endpoint)!;
    this._notificationHandlers.set(aOptions.Endpoint, (aIsNotification: boolean) => {
      this.CharacteristicValueChanged(aOptions.Endpoint, aIsNotification);
    });
    chr.subscribe();
    chr.on("notify", this._notificationHandlers.get(aOptions.Endpoint)!);
    return Promise.resolve();
  }

  public Disconnect = (): Promise<void> => {
    return Promise.resolve();
  }

  protected CharacteristicValueChanged = async (aCharName: Endpoints, aIsNotification: boolean) => {
    // The notification doesn't come with the value, so we have to manually read it out of rx.
    const buffer = await this.ReadValue(new ButtplugDeviceReadOptions({ Endpoint: aCharName }));
    this.UpdateReceived(aCharName, buffer);
  }
}
