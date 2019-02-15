import { IBluetoothDeviceImpl, BluetoothDeviceInfo, ButtplugBluetoothDevice } from "buttplug";
import { EventEmitter } from "events";
import { StringDecoder } from "string_decoder";

let noble;
try {
  noble = require("noble-uwp");
} catch (e) {
  noble = require("noble");
}
import * as util from "util";

export class ButtplugNodeBluetoothLEDevice extends EventEmitter implements IBluetoothDeviceImpl {

  public static async CreateDevice(aDeviceInfo: BluetoothDeviceInfo,
                                   aDevice: any):
  Promise<ButtplugBluetoothDevice> {
    const deviceImpl = new ButtplugNodeBluetoothLEDevice(aDeviceInfo, aDevice);
    await deviceImpl.Connect();

    const device = await aDeviceInfo.Create(deviceImpl);
    // Use a fat arrow closure here, as we need to close over this definition of device.
    deviceImpl.addListener("deviceremoved", () => {
      device.OnDisconnect();
    });
    return device;
  }

  private _service: any;
  private _characteristics: Map<string, any> =
    new Map<string, any>();
  private _decoder = new StringDecoder("utf-8");
  private _notificationHandlers = new Map<string, (aNotification: boolean, aCharName: string) => void>();

  public constructor(private _deviceInfo: BluetoothDeviceInfo,
                     private _device: any) {
    super();
  }

  public get Name(): string {
    return this._device.advertisement.localName!;
  }

  public get Id(): string {
    return this._device.id;
  }

  public Connect = async (): Promise<void> => {
    const connectAsync = util.promisify(this._device.connect.bind(this._device));
    await connectAsync();
    const discoverServicesAsync = util.promisify(this._device.discoverServices.bind(this._device));
    // God damnit noble why can't you just take a normal formatted UUID like
    // everyone else.
    let nobleServices = this._deviceInfo.Services;
    nobleServices = nobleServices.map((x) => x.replace(/-/g, ""));

    // For now, we assume we're only using one service on each device. This will
    // most likely change in the future.
    this._service = (await discoverServicesAsync(nobleServices))[0];

    const discoverCharsAsync = util.promisify(this._service.discoverCharacteristics.bind(this._service));
    for (const name of Object.getOwnPropertyNames(this._deviceInfo.Characteristics)) {
      const nobleChr = this._deviceInfo.Characteristics[name].replace(/-/g, "");
      this._characteristics.set(name,
                                (await discoverCharsAsync([nobleChr]))[0]);
    }

    // If no characteristics are present in the DeviceInfo block, we assume that
    // we're connecting to a simple rx/tx service, and can query to figure out
    // characteristics. Assume that the characteristics have tx/rx references.
    if (this._characteristics.size === 0) {
      const characteristics = await discoverCharsAsync([]);
      for (const char of characteristics) {
        if (char.properties.indexOf("write") !== -1 ||
            char.properties.indexOf("writeWithoutResponse") !== -1 ||
            char.properties.indexOf("reliableWrite") !== -1) {
          this._characteristics.set("tx", char);
        } else if (char.properties.indexOf("read") !== -1 ||
                   char.properties.indexOf("broadcast") !== -1 ||
                   char.properties.indexOf("notify") !== -1 ||
                   char.properties.indexOf("indicate") !== -1) {
          this._characteristics.set("rx", char);
        }
      }
    }
  }

  public OnDisconnect = () => {
    this._device.disconnect();
    this.emit("deviceremoved");
  }

  public WriteValue = async (aCharacteristic: string, aValue: Uint8Array): Promise<void> => {
    if (!this._characteristics.has(aCharacteristic)) {
      return;
    }
    const chr = this._characteristics.get(aCharacteristic)!;
    const buffer = new Buffer( aValue );
    return await util.promisify(chr.write.bind(chr))(buffer, false);
  }

  public ReadValue = async (aCharacteristic: string): Promise<BufferSource> => {
    if (!this._characteristics.has(aCharacteristic)) {
      throw new Error("Tried to access wrong characteristic!");
    }
    const chr = this._characteristics.get(aCharacteristic)!;
    return await util.promisify(chr.read.bind(chr))();
  }

  public WriteString = async (aCharacteristic: string, aValue: string): Promise<void> => {
    return await this.WriteValue(aCharacteristic, Buffer.from(aValue));
  }

  public ReadString = async (aCharacteristic: string): Promise<string> => {
    const value = await this.ReadValue(aCharacteristic);
    return this._decoder.end(Buffer.from(value as ArrayBuffer));
  }

  public Subscribe = (aCharacteristic: string): Promise<void> => {
    if (!this._characteristics.has(aCharacteristic)) {
      throw new Error("Tried to access wrong characteristic!");
    }
    const chr = this._characteristics.get(aCharacteristic)!;
    this._notificationHandlers.set(aCharacteristic, (aIsNotification: boolean) => {
      this.CharacteristicValueChanged(aCharacteristic, aIsNotification);
    });
    chr.subscribe();
    chr.on("notify", this._notificationHandlers.get(aCharacteristic));
    return Promise.resolve();
  }

  public Disconnect = (): Promise<void> => {
    return Promise.resolve();
  }

  protected CharacteristicValueChanged = async (aCharName: string, aIsNotification: boolean) => {
    // The notification doesn't come with the value, so we have to manually read it out of rx.
    const buffer = await this.ReadValue(aCharName);
    this.emit("characteristicvaluechanged", aCharName, buffer);
  }
}
