import { ButtplugLogger } from "../../core/Logging";
import { ButtplugException, ButtplugDeviceException } from "../../core/Exceptions";
import { IBluetoothDeviceImpl } from "./IBluetoothDeviceImpl";
import { BluetoothDeviceInfo } from "./BluetoothDeviceInfo";
import { ButtplugBluetoothDevice } from "./ButtplugBluetoothDevice";
import { EventEmitter } from "events";
import { StringDecoder } from "string_decoder";

export class WebBluetoothDevice extends EventEmitter implements IBluetoothDeviceImpl {

  public static async CreateDevice(aDeviceInfo: BluetoothDeviceInfo,
                                   aDevice: BluetoothDevice):
  Promise<ButtplugBluetoothDevice> {
    const deviceImpl = new WebBluetoothDevice(aDeviceInfo, aDevice);
    await deviceImpl.Connect();
    const device = await aDeviceInfo.Create(deviceImpl);
    // Use a fat arrow closure here, as we need to close over this definition of device.
    deviceImpl.addListener("deviceremoved", () => {
      device.OnDisconnect();
    });
    ButtplugLogger.Logger.Debug(`WebBluetoothDevice: Creating ${device.constructor.name}`);
    return device;
  }

  private _notificationHandlers = new Map<string, (Event) => void>();
  private _logger = ButtplugLogger.Logger;
  private _server: BluetoothRemoteGATTServer;
  private _service: BluetoothRemoteGATTService;
  private _decoder = new StringDecoder("utf-8");
  private _characteristics: Map<string, BluetoothRemoteGATTCharacteristic> =
    new Map<string, BluetoothRemoteGATTCharacteristic>();

  public constructor(private _deviceInfo: BluetoothDeviceInfo,
                     private _device: BluetoothDevice) {
    super();
  }

  public get Name(): string {
    return this._device.name!;
  }

  public get Id(): string {
    return this._device.id;
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

    // For now, we assume we're only using one service on each device. This will
    // most likely change in the future.
    this._service = services[0];

    // If the device info contains characteristic address and identity
    // information, use that to try and establish characteristic objects.
    for (const name of Object.getOwnPropertyNames(this._deviceInfo.Characteristics)) {
      this._characteristics.set(name, await this._service.getCharacteristic(this._deviceInfo.Characteristics[name]));
    }

    // If no characteristics are present in the DeviceInfo block, we assume that
    // we're connecting to a simple rx/tx service, and can query to figure out
    // characteristics. Assume that the characteristics have tx/rx references.
    if (this._characteristics.size === 0) {
      const characteristics = await this._service.getCharacteristics();
      for (const char of characteristics) {
        if (char.properties.write ||
            char.properties.writeWithoutResponse ||
            char.properties.reliableWrite) {
          this._characteristics.set("tx", char);
        } else if (char.properties.read ||
                   char.properties.broadcast ||
                   char.properties.notify ||
                   char.properties.indicate) {
          this._characteristics.set("rx", char);
        }
      }
    }

    // If at this point we still don't have any characteristics, something is
    // wrong, error out.
}

  public Disconnect = async (): Promise<void> => {
    for (const chr of this._notificationHandlers.keys()) {
      this.Unsubscribe(chr);
    }
    this._server.disconnect();
  }

  public OnDisconnect = () => {
    this._logger.Debug(`WebBluetoothDevice: ${this.constructor.name} disconnecting`);
    this._device.removeEventListener("gattserverdisconnected", this.OnDisconnect);
    this.emit("deviceremoved");
  }

  public WriteString = async (aCharacteristic: string, aValue: string): Promise<void> => {
    return await this.WriteValue(aCharacteristic, Buffer.from(aValue));
  }

  public WriteValue = async (aCharacteristic: string, aValue: Uint8Array): Promise<void> => {
    if (!this._characteristics.has(aCharacteristic)) {
      throw ButtplugException.LogAndError(ButtplugDeviceException,
                                          this._logger,
                                          "Tried to access wrong characteristic!");
    }
    const chr = this._characteristics.get(aCharacteristic)!;
    this._logger.Trace(`WebBluetoothDevice: ${this.constructor.name} writing ${aValue} to ${chr.uuid}`);
    await chr.writeValue(aValue);
  }

  public ReadString = async (aCharacteristic: string): Promise<string> => {
    const value = await this.ReadValue(aCharacteristic);
    return this._decoder.end(Buffer.from(value as ArrayBuffer));
  }

  public ReadValue = async (aCharacteristic: string): Promise<BufferSource> => {
    if (!this._characteristics.has(aCharacteristic)) {
      throw ButtplugException.LogAndError(ButtplugDeviceException,
                                          this._logger,
                                          "Tried to access wrong characteristic!");
    }
    const chr = this._characteristics.get(aCharacteristic)!;
    this._logger.Trace(`WebBluetoothDevice: ${this.constructor.name} reading from ${chr.uuid}`);
    return await chr.readValue();
  }

  public Subscribe = async (aCharacteristic: string): Promise<void> => {
    if (!this._characteristics.has(aCharacteristic)) {
      throw ButtplugException.LogAndError(ButtplugDeviceException,
                                          this._logger,
                                          "Tried to access wrong characteristic!");
    }
    if (this._notificationHandlers.has(aCharacteristic)) {
      throw ButtplugException.LogAndError(ButtplugDeviceException,
                                          this._logger,
                                          "Already listening on this characteristic!");
    }
    const chr = this._characteristics.get(aCharacteristic)!;
    this._logger.Trace(`WebBluetoothDevice: ${this.constructor.name} subscribing to updates from ${chr.uuid}`);
    await chr.startNotifications();
    this._notificationHandlers.set(aCharacteristic, (event: Event) => {
      this.CharacteristicValueChanged(event, aCharacteristic);
    });
    chr.addEventListener("characteristicvaluechanged", this._notificationHandlers.get(aCharacteristic)!);
  }

  public Unsubscribe = async (aCharacteristic: string): Promise<void> => {
    if (!this._characteristics.has(aCharacteristic)) {
      throw ButtplugException.LogAndError(ButtplugDeviceException,
                                          this._logger,
                                          "Tried to access wrong characteristic!");
    }
    if (!this._notificationHandlers.has(aCharacteristic)) {
      throw ButtplugException.LogAndError(ButtplugDeviceException,
                                          this._logger,
                                          "Not listening on this characteristic!");
    }
    const chr = this._characteristics.get(aCharacteristic)!;
    this._logger.Trace(`WebBluetoothDevice: ${this.constructor.name} unsubscribing to updates from ${chr.uuid}`);
    chr.removeEventListener("characteristicvaluechanged", this._notificationHandlers.get(aCharacteristic)!);
    this._notificationHandlers.delete(aCharacteristic);
    await chr.stopNotifications();
  }

  protected CharacteristicValueChanged = (aEvent: Event, aCharacteristic: string) => {
    // For some reason this EventTarget doesn't have a value prop?
    const eventValue = (aEvent.target! as BluetoothRemoteGATTCharacteristic).value;
    this.emit("characteristicvaluechanged", aCharacteristic, Buffer.from(eventValue!.buffer));
  }
}
