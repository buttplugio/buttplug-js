import BluetoothDeviceInfo from "./BluetoothDeviceInfo";
import FleshlightLaunch from "./devices/FleshlightLaunch";
import { LovenseRev1, LovenseRev2, LovenseRev3 } from "./devices/Lovense";
import WeVibe from "./devices/WeVibe";

export default class BluetoothDevices {
  public static GetDeviceInfo(): BluetoothDeviceInfo[] {
    return [FleshlightLaunch.DeviceInfo,
            LovenseRev1.DeviceInfo,
            LovenseRev2.DeviceInfo,
            LovenseRev3.DeviceInfo,
            WeVibe.DeviceInfo];
  }
}
