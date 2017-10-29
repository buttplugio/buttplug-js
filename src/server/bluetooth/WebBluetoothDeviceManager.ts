import { DeviceAdded } from "../../core/Messages";
import IDeviceSubtypeManager from "../IDeviceSubtypeManager";
import BluetoothDevices from "./BluetoothDevices";
import BluetoothDeviceInfo from "./BluetoothDeviceInfo";
import { EventEmitter } from "events";
import WebBluetoothDevice from "./WebBluetoothDevice";

export default class WebBluetoothDeviceManager extends EventEmitter implements IDeviceSubtypeManager {
  public StartScanning() {
    // Form scanning filters
    const info = BluetoothDevices.GetDeviceInfo();
    const filters = {
      filters: new Array<BluetoothRequestDeviceFilter>(),
      optionalServices: new Array<BluetoothServiceUUID>(),
    };
    for (const deviceInfo of info) {
      for (const deviceName of deviceInfo.Names) {
        filters.filters.push({name: deviceName});
      }
      filters.optionalServices = [...filters.optionalServices, ...deviceInfo.Services];
    }

    (((navigator as any).bluetooth) as Bluetooth).requestDevice(filters).then(async (device) => {
      await this.OpenDevice(device);
      this.emit("scanningfinished");
    }).catch(() => this.emit("scanningfinished"));
    return true;
  }

  public StopScanning(): boolean {
    // noop. We can only scan via the browser dialog, and we can't cancel that from outside.
    return true;
  }

  public IsScanning(): boolean {
    // noop.
    return false;
  }

  private OpenDevice = async (aDevice: BluetoothDevice): Promise<void> => {
    if (aDevice === undefined) {
      // TODO Throw here?
      return;
    }
    // Find the related info for the device
    const info = BluetoothDevices.GetDeviceInfo();
    let deviceInfo: BluetoothDeviceInfo | null = null;
    for (const di of info) {
      if (di.Names.indexOf(aDevice.name!) >= 0) {
        deviceInfo = di;
        break;
      }
    }
    if (deviceInfo === null) {
      // TODO Throw here?
      // We somehow got a device we don't know what to do with?
      return;
    }

    const device = await WebBluetoothDevice.CreateDevice(deviceInfo, aDevice);
    this.emit("deviceadded", device);
  }
}
