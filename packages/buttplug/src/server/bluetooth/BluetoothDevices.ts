/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

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
