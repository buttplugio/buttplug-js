import { ButtplugLogger } from "../../core/Logging";
import { IBluetoothDeviceImpl } from "./IBluetoothDeviceImpl";
import { BluetoothDeviceInfo } from "./BluetoothDeviceInfo";
import { ButtplugBluetoothDevice } from "./ButtplugBluetoothDevice";
import { EventEmitter } from "events";

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

  private _logger = ButtplugLogger.Logger;
  private _server: BluetoothRemoteGATTServer;
  private _service: BluetoothRemoteGATTService;
  private _characteristics: Map<string, BluetoothRemoteGATTCharacteristic> =
    new Map<string, BluetoothRemoteGATTCharacteristic>();

  public constructor(private _deviceInfo: BluetoothDeviceInfo,
                     private _device: BluetoothDevice) {
    super();
  }

  public get Name(): string {
    return this._device.name!;
  }

  public Connect = async (): Promise<void> => {
    this._logger.Debug(`WebBluetoothDevice: ${this.constructor.name} connecting`);
    this._device.addEventListener("gattserverdisconnected", this.OnDisconnect);
    this._server = await this._device.gatt!.connect();
    this._service = await this._server.getPrimaryService(this._deviceInfo.Services[0]);
    for (const name of Object.getOwnPropertyNames(this._deviceInfo.Characteristics)) {
      this._characteristics.set(name, await this._service.getCharacteristic(this._deviceInfo.Characteristics[name]));
    }
  }

  public OnDisconnect = () => {
    this._logger.Debug(`WebBluetoothDevice: ${this.constructor.name} disconnecting`);
    this._device.removeEventListener("gattserverdisconnected", this.OnDisconnect);
    this.emit("deviceremoved");
  }

  public WriteValue = async (aCharacteristic: string, aValue: Uint8Array): Promise<void> => {
    if (!this._characteristics.has(aCharacteristic)) {
      return;
    }
    const chr = this._characteristics.get(aCharacteristic)!;
    this._logger.Trace(`WebBluetoothDevice: ${this.constructor.name} writing ${aValue} to ${chr.uuid}`);
    await chr.writeValue(aValue);
  }

  public ReadValue = async (aCharacteristic: string): Promise<BufferSource> => {
    if (!this._characteristics.has(aCharacteristic)) {
      throw new Error("Tried to access wrong characteristic!");
    }
    const chr = this._characteristics.get(aCharacteristic)!;
    this._logger.Trace(`WebBluetoothDevice: ${this.constructor.name} reading from ${chr.uuid}`);
    return await chr.readValue();
  }
}
