/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import { IDeviceSubtypeManager, ButtplugLogger, DeviceConfigurationManager, BluetoothLEProtocolConfiguration, ButtplugDevice } from "buttplug";
import { EventEmitter } from "events";
import * as noble from "noble-uwp";
import { ButtplugNodeBluetoothLEDevice } from "./ButtplugNodeBluetoothLEDevice";

export class ButtplugNodeBluetoothLEDeviceManager extends EventEmitter implements IDeviceSubtypeManager {

  private isScanning: boolean = false;
  private initializerPromise: Promise<void> | null;
  // Set to default logger to make sure we have something at startup.
  private logger: ButtplugLogger = ButtplugLogger.Logger;

  constructor() {
    super();
    noble.on("discover", (d: noble.Peripheral) => {
      this.OpenDevice(d);
    });
  }

  public async Initialize() {
    let res;
    let rej;
    this.initializerPromise = new Promise((resolve, reject) => {
      res = resolve;
      rej = reject;
    });
    noble.on("stateChange", function(state) {
      if (state === "poweredOn") {
        res();
        return;
      }
      rej();
    });
    // TODO Add timeout here in case we don't find or have a radio.
    await this.initializerPromise;
  }

  public async StartScanning() {
    noble.startScanning();
    this.isScanning = true;
  }

  public async StopScanning() {
    noble.stopScanning();
    this.isScanning = false;
  }

  public get IsScanning(): boolean {
    return this.isScanning;
  }

  public SetLogger(aLogger: ButtplugLogger) {
    this.logger = aLogger;
  }

  private OpenDevice = async (device: noble.Peripheral): Promise<void> => {
    if (device === undefined) {
      // TODO Throw here?
      return;
    }
    // If the device doesn't even have a name, chances are we aren't interested.
    if (device.advertisement.localName === undefined) {
      return;
    }
    const devConfig = new BluetoothLEProtocolConfiguration([device.advertisement.localName]);
    const foundConfig = DeviceConfigurationManager.Manager.Find(devConfig);
    if (foundConfig === undefined) {
      return;
    }
    const [config, protocolType] = foundConfig;
    const bpDevImpl = new ButtplugNodeBluetoothLEDevice(config as BluetoothLEProtocolConfiguration, device);
    await bpDevImpl.Connect();
    const bpProtocol = new protocolType(bpDevImpl);
    const bpDevice = new ButtplugDevice(bpProtocol, bpDevImpl);
    console.log("initializing");
    await bpDevice.Initialize();
    console.log("initialize");
    this.emit("deviceadded", bpDevice);
  }
}
