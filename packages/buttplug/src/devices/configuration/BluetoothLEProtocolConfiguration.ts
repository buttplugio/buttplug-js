/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import { Endpoints, GetEndpoint } from "../Endpoints";
import { ButtplugDeviceException } from "../../core/Exceptions";
import { IProtocolConfiguration } from "./IProtocolConfiguration";

export class BluetoothLEProtocolConfiguration implements IProtocolConfiguration {

  public get Names(): string[] {
    return this._names;
  }

  public get Services(): Map<string, Map<Endpoints, string>> {
    return this._services;
  }

  // TODO actually define a type for the incoming object
  public static ConstructFromObject(aObj: any): BluetoothLEProtocolConfiguration {
    if (Object.getOwnPropertyNames(aObj).indexOf("names") === -1) {
      throw new ButtplugDeviceException("Need a names property to load bluetooth device from.");
    }
    if (Object.getOwnPropertyNames(aObj).indexOf("services") === -1) {
      throw new ButtplugDeviceException("Need a services property to load bluetooth device from.");
    }
    const names = aObj.names;
    const services = new Map<string, Map<Endpoints, string>>();
    for (const service of Object.keys(aObj.services)) {
      const chrs = new Map<Endpoints, string>();
      if (Object.getOwnPropertyNames(aObj.services).indexOf(service) !== -1 &&
          aObj.services[service] !== null) {
        for (const chr of Object.keys(aObj.services[service])) {
          const ep = GetEndpoint(chr);
          if (ep == null) {
            throw new ButtplugDeviceException(`Device with names ${names} lists invalid endpoint ${chr}.`);
          }
          chrs.set(ep, aObj.services[service][chr]);
        }
      }
      services.set(service, chrs);
    }
    const conf = new BluetoothLEProtocolConfiguration(names, services);
    return conf;
  }
  private _names: string[] = [];
  private _services: Map<string, Map<Endpoints, string>> = new Map<string, Map<Endpoints, string>>();

  public constructor(aNames: string[], aServices?: Map<string, Map<Endpoints, string>>) {
    this._names = aNames;
    this._services = aServices || new Map<string, Map<Endpoints, string>>();
  }

  public Matches(aConfig: IProtocolConfiguration): boolean {
    if (!(aConfig instanceof BluetoothLEProtocolConfiguration)) {
      return false;
    }

    const bleConfig = aConfig as BluetoothLEProtocolConfiguration;
    if (bleConfig.Names.length !== 1) {
      throw new ButtplugDeviceException("Device checks should only happen against 1 name.");
    }
    for (const name of this.Names) {
      if (bleConfig.Names.indexOf(name) !== -1) {
        return true;
      }

      if (!name.endsWith("*")) {
        continue;
      }

      const searchName = name.substr(0, name.length - 1);
      if (bleConfig.Names.findIndex((x) => x.startsWith(searchName)) !== -1) {
        return true;
      }
    }

    // Match advertised services. Usually we won't get much from these, as a lot
    // of devices don't advertise services so we're reliant on device names.
    const ourUUIDs = Array.from(this._services.keys());
    for (const serviceUUID of bleConfig.Services.keys()) {
      if (ourUUIDs.indexOf(serviceUUID) !== 0) {
        // We have at least one matching service and one matching name, so
        // that's good enough.
        return true;
      }
    }

    return false;
  }

  public Merge(aConfig: IProtocolConfiguration): void {
    // TODO Fill in for user config.
  }
}
