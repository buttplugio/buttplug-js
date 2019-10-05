/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import { ButtplugDeviceException } from "../../core/Exceptions";
import { BluetoothLEProtocolConfiguration } from "./BluetoothLEProtocolConfiguration";
import { SerialProtocolConfiguration } from "./SerialProtocolConfiguration";
import { HIDProtocolConfiguration } from "./HIDProtocolConfiguration";
import { Lovense } from "../protocols/Lovense";
import { WeVibe } from "../protocols/WeVibe";
import { VorzeA10Cyclone } from "../protocols/VorzeA10Cyclone";
import { MagicMotion } from "../protocols/MagicMotion";
import { LiBo } from "../protocols/LiBo";
import { Youcups } from "../protocols/Youcups";
import { Maxpro } from "../protocols/Maxpro";
import { FleshlightLaunch } from "../protocols/FleshlightLaunch";
import { KiirooGen2Vibe } from "../protocols/KiirooGen2Vibe";
import { ButtplugDeviceProtocolType } from "../ButtplugDeviceProtocol";
import { IProtocolConfiguration } from "./IProtocolConfiguration";
import * as defaultDeviceConfig from "../../../dependencies/buttplug-device-config/buttplug-device-config.json";
import { Youou } from "../protocols/Youou";
import { KiirooGen21 } from "../protocols/KiirooGen21";
import { Motorbunny } from "../protocols/Motorbunny";

export class DeviceConfigurationManager {

  public static get Manager(): DeviceConfigurationManager {
    if (DeviceConfigurationManager._manager === null) {
      throw new ButtplugDeviceException("Device configuration manager not yet initialized!");
    }

    return DeviceConfigurationManager._manager!;
  }

  public static LoadFromInternalConfig(): void {
    DeviceConfigurationManager._manager = new DeviceConfigurationManager(defaultDeviceConfig);
  }

  public static LoadFromJsonExternalConfig(aExternalConfig: string): void {
    const config = JSON.parse(aExternalConfig);
    DeviceConfigurationManager._manager = new DeviceConfigurationManager(config);
  }

  public static async LoadFromWebConfig(aUrl: string = "https://buttplug-device-config.buttplug.io"): Promise<void> {
    const config = await fetch(aUrl);
    DeviceConfigurationManager.LoadFromJsonExternalConfig(await config.text());
  }

  private static _manager: DeviceConfigurationManager | null = null;
  private _configObject: any = {};
  private _configs: Map<string, IProtocolConfiguration> = new Map<string, IProtocolConfiguration>();
  private _protocols: Map<string, ButtplugDeviceProtocolType> = new Map<string, ButtplugDeviceProtocolType>();

  protected constructor(aConfigObject: object) {
    this._configObject = aConfigObject;
    this._protocols.set("lovense", Lovense);
    this._protocols.set("wevibe", WeVibe);
    this._protocols.set("vorze-sa", VorzeA10Cyclone);
    this._protocols.set("magic-motion", MagicMotion);
    this._protocols.set("maxpro", Maxpro);
    this._protocols.set("kiiroo-v2", FleshlightLaunch);
    this._protocols.set("kiiroo-v21", KiirooGen21);
    this._protocols.set("kiiroo-v2-vibrator", KiirooGen2Vibe);
    this._protocols.set("youou", Youou);
    this._protocols.set("youcups", Youcups);
    this._protocols.set("libo", LiBo);
    this._protocols.set("motorbunny", Motorbunny);
    // Parse our configuration object last, as we need to add device protocols
    // first.
    this.ParseConfig();
  }

  public LoadUserConfiguration(): void {
    // TODO Fill in user config
  }

  public GetAllConfigsOfType<T extends IProtocolConfiguration>(constructor: new (...args: any[]) => T): T[] {
    const configs: T[] = [];
    for (const [name, config] of this._configs.entries()) {
      if (config instanceof constructor) {
        configs.push(config);
      }
    }
    return configs;
  }

  public Find(aConfig: IProtocolConfiguration): [IProtocolConfiguration, ButtplugDeviceProtocolType] | undefined {
    for (const [name, config] of this._configs.entries()) {
      if (config.Matches(aConfig)) {
        return [config, this._protocols.get(name)!];
      }
    }
    return undefined;
  }

  protected ParseConfig(): void {
    this._configs = new Map<string, IProtocolConfiguration>();
    const protocols = this._configObject.protocols as object;
    for (const protocolName of Object.keys(protocols)) {
      // If we don't support the protocol, don't load it.
      if (!this._protocols.has(protocolName)) {
        // TODO We should log here.
        continue;
      }
      const protocol = protocols[protocolName];
      // Ok maybe XInput being null isn't such a good idea.
      if (protocol == null) {
        continue;
      }
      for (const bus of Object.keys(protocol)) {
        switch (bus) {
          case "btle":
            this._configs.set(protocolName, BluetoothLEProtocolConfiguration.ConstructFromObject(protocol[bus]));
            break;
          case "serial":
            this._configs.set(protocolName, new SerialProtocolConfiguration(protocol[bus]));
            break;
          case "hid":
            this._configs.set(protocolName, new HIDProtocolConfiguration(protocol[bus]));
            break;
        }
      }
    }
  }
}
