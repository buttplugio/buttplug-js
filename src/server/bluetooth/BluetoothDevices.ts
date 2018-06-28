import { BluetoothDeviceInfo } from "./BluetoothDeviceInfo";
import { FleshlightLaunch } from "./devices/FleshlightLaunch";
import { Lovense } from "./devices/Lovense";
import { VorzeA10Cyclone } from "./devices/VorzeA10Cyclone";
import { WeVibe } from "./devices/WeVibe";
import { Maxpro } from "./devices/Maxpro";

export class BluetoothDevices {
  public static GetDeviceInfo(): BluetoothDeviceInfo[] {
    return [FleshlightLaunch.DeviceInfo,
            Lovense.DeviceInfo,
            Maxpro.DeviceInfo,
            VorzeA10Cyclone.DeviceInfo,
            WeVibe.DeviceInfo];
  }
}
