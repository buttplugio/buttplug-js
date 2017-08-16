import BluetoothDeviceInfo from "./BluetoothDeviceInfo";
import FleshlightLaunch from "./devices/FleshlightLaunch";

export default class BluetoothDevices {
  public static GetDeviceInfo(): BluetoothDeviceInfo[] {
    return [FleshlightLaunch.DeviceInfo];
  }
}
