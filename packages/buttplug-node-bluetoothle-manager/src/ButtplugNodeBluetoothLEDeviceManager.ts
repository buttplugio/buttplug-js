/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */
import * as noble from "noble-mac";
import { IDeviceSubtypeManager, ButtplugLogger, DeviceConfigurationManager, BluetoothLEProtocolConfiguration, ButtplugDevice, ButtplugException, ButtplugDeviceException } from "buttplug";
import { EventEmitter } from "events";
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
    this.logger.Debug(`Found configuration for device ${device.advertisement.localName}`);
    const [config, protocolType] = foundConfig;
    const bpDevImpl = new ButtplugNodeBluetoothLEDevice(config as BluetoothLEProtocolConfiguration, device);
    this.logger.Debug(`Connecting to noble device ${device.advertisement.localName}`);
    try {
      await bpDevImpl.Connect();
    } catch (e) {
      let errStr: string;
      switch (e) {
        case ButtplugDeviceException: {
          errStr = e.errorMessage;
          break;
        }
        case Error: {
          errStr = e.message;
          break;
        }
        default: {
          errStr = e.toString();
          break;
        }
      }
      this.logger.Info(`Error while connecting to ${device.advertisement.localName}: ${errStr}`);
      // We can't rethrow here, as this method is only called from an event
      // handler, so just return;
      return;
    }
    const bpProtocol = new protocolType(bpDevImpl);
    const bpDevice = new ButtplugDevice(bpProtocol, bpDevImpl);
    this.logger.Debug(`Initializing noble device ${device.advertisement.localName}`);
    try {
      await bpDevice.Initialize();
    } catch (e) {
      let errStr: string;
      switch (e) {
        case ButtplugDeviceException: {
          errStr = e.errorMessage;
          break;
        }
        case Error: {
          errStr = e.message;
          break;
        }
        default: {
          errStr = e.toString();
          break;
        }
      }
      this.logger.Info(`Error while initializing ${device.advertisement.localName}: ${errStr}`);
      // We can't rethrow here, as this method is only called from an event
      // handler, so just return;
      return;
    }
    this.emit("deviceadded", bpDevice);
  }
}
