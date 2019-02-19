/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import { Endpoints, GetEndpoint } from "../Endpoints";
import { ButtplugDeviceException } from "../../core/Exceptions";

export class BluetoothLEProtocolConfiguration implements IProtocolConfiguration {
  private _names: string[] = [];
  private _services: Map<string, Map<Endpoints, string>> = new Map<string, Map<Endpoints, string>>();

  public constructor(aNames: string[], aServices?: Map<string, Map<Endpoints, string>>) {
    this._names = aNames;
    this._services = aServices || new Map<string, Map<Endpoints, string>>();
  }

  public get Names(): string[] {
    return this._names;
  }

  public get Services(): Map<string, Map<Endpoints, string>> {
    return this._services;
  }

  public static ConstructFromObject(aObj: object): BluetoothLEProtocolConfiguration {
    if (Object.getOwnPropertyNames(aObj).indexOf("names") === -1) {
      throw new ButtplugDeviceException("Need a names property to load bluetooth device from.");
    }
    if (Object.getOwnPropertyNames(aObj).indexOf("services") === -1) {
      throw new ButtplugDeviceException("Need a services property to load bluetooth device from.");
    }
    let names = aObj["names"];
    let services = new Map<string, Map<Endpoints, string>>();
    for (let service of Object.keys(aObj["services"])) {
      let chrs = new Map<Endpoints, string>();
      if (aObj[service] !== undefined) {
        for (let chr in Object.keys(aObj[service])) {
          let ep = GetEndpoint(chr);
          if (ep == null) {
            throw new ButtplugDeviceException(`Device lists invalid endpoint ${chr}.`);
          }
          chrs.set(ep, Endpoints[chr]);
        }
      }
      services.set(service, chrs);
    }
    let conf = new BluetoothLEProtocolConfiguration(names, services);
    return conf;
  }

  public Matches(aConfig: IProtocolConfiguration) : boolean {
    if (!(aConfig instanceof BluetoothLEProtocolConfiguration)) {
      return false;
    }

    let bleConfig = aConfig as BluetoothLEProtocolConfiguration;
    if (bleConfig.Names.length !== 1) {
      throw new ButtplugDeviceException("Device checks should only happen against 1 name.");
    }
    for (var name of this.Names) {
      if (bleConfig.Names.indexOf(name) !== -1) {
        return true;
      }

      if (!name.endsWith("*")) {
        continue;
      }

      var searchName = name.substr(0, name.length - 1);
      if (bleConfig.Names.findIndex((x) => x.startsWith(searchName)) !== -1) {
        return true;
      }
    }

    // Match advertised services. Usually we won't get much from these, as a lot
    // of devices don't advertise services so we're reliant on device names.
    let ourUUIDs = Array.from(this._services.keys());
    for (let serviceUUID of bleConfig.Services.keys()) {
      if (ourUUIDs.indexOf(serviceUUID) !== 0) {
        // We have at least one matching service and one matching name, so
        // that's good enough.
        return true;
      }
    }

    return false;
  }

  public Merge(aConfig: IProtocolConfiguration) : void {
  }
}
