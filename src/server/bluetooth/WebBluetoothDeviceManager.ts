import IDeviceSubtypeManager from "../IDeviceSubtypeManager";
import BluetoothDevices from "./BluetoothDevices";

export default class WebBluetoothDeviceManager implements IDeviceSubtypeManager {
  public StartScanning() {
    // Form scanning filters
    const info = BluetoothDevices.GetDeviceInfo();
    const filters = {
      filters: new Array<object>(),
      optionalServices: new Array<string>(),
    };
    for (const deviceInfo of info) {
      for (const deviceName of deviceInfo.Names) {
        filters.filters.push({name: deviceName});
      }
      filters.optionalServices = [...filters.optionalServices, ...deviceInfo.Services];
    }

    // typescript doesn't know about webbluetooth yet
    (navigator as any).bluetooth.requestDevice(filters);
    return true;
  }

  public StopScanning() {
    return false;
  }

  public IsScanning() {
    return false;
  }
}
