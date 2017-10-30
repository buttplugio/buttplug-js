import { BluetoothDeviceInfo } from "./BluetoothDeviceInfo";
import { FleshlightLaunch } from "./devices/FleshlightLaunch";
import { LovenseRev1, LovenseRev2, LovenseRev3, LovenseRev4 } from "./devices/Lovense";
import { VorzeA10Cyclone } from "./devices/VorzeA10Cyclone";
import { WeVibe } from "./devices/WeVibe";

export class BluetoothDevices {
  public static GetDeviceInfo(): BluetoothDeviceInfo[] {
    return [FleshlightLaunch.DeviceInfo,
            LovenseRev1.DeviceInfo,
            LovenseRev2.DeviceInfo,
            LovenseRev3.DeviceInfo,
            LovenseRev4.DeviceInfo,
            VorzeA10Cyclone.DeviceInfo,
            WeVibe.DeviceInfo];
  }
}
