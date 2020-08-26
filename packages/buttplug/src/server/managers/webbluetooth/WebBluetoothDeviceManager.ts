/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import { ButtplugLogger } from "../../../core/Logging";
import { ButtplugException, ButtplugDeviceException } from "../../../core/Exceptions";
import { DeviceAdded } from "../../../core/Messages";
import { IDeviceSubtypeManager } from "../../IDeviceSubtypeManager";
import { EventEmitter } from "events";
import { DeviceConfigurationManager } from "../../../devices/configuration/DeviceConfigurationManager";
import { BluetoothLEProtocolConfiguration } from "../../../devices/configuration/BluetoothLEProtocolConfiguration";
import { WebBluetoothDevice } from "./WebBluetoothDevice";
import { ButtplugDevice } from "../../../devices/ButtplugDevice";

export class WebBluetoothDeviceManager extends EventEmitter implements IDeviceSubtypeManager {
  private _logger: ButtplugLogger;

  constructor(aLogger: ButtplugLogger | undefined) {
    super();
    this.SetLogger(aLogger !== undefined ? aLogger : ButtplugLogger.Logger);
  }

  public SetLogger(aLogger: ButtplugLogger) {
    this._logger = aLogger;
  }

  public async StartScanning() {
    // Form scanning filters
    // TODO Get bluetooth device info from device configuration manager here.

    // Check the user agent for android, so we can substitute in
    // acceptAllDevices until the Chrome namePrefix bug is fixed.
    var userAgent = navigator.userAgent.toLowerCase();
    var isAndroid = userAgent.indexOf("android") > -1;

    let filters: RequestDeviceOptions;
    // If we're on any platform other than android, use name filters
    if (!isAndroid) {
      filters = {
        filters: new Array<BluetoothRequestDeviceFilter>(),
        optionalServices: new Array<BluetoothServiceUUID>(),
      };
    } else {
      // Otherwise, just accept everything.
      filters = {
        acceptAllDevices: true,
        optionalServices: new Array<BluetoothServiceUUID>(),
      }
    }

    // If the DeviceConfigurationManager hasn't been built yet, we've got a
    // problem. So just expect we'll get one back.
    const confMgr = DeviceConfigurationManager.Manager;

    const bluetoothConfigs = confMgr.GetAllConfigsOfType(BluetoothLEProtocolConfiguration);

    for (const config of bluetoothConfigs) {
      if (!isAndroid) {
        for (const deviceName of config.Names) {
          try {
            // We have to cast filters to any here because the logic + split value type doesn't work well.
            if (deviceName.endsWith("*")) {
              (filters as any).filters.push({ namePrefix: deviceName.substr(0, deviceName.length - 1) });
            }
            (filters as any).filters.push({ name: deviceName });
          } catch (e) {
            console.log(e);
            console.log(config);
          }
        }
      }
      filters.optionalServices = [...filters.optionalServices!, ...config.Services.keys()];
    }

    this._logger.Trace("Bluetooth filter set: " + JSON.stringify(filters));

    // At some point, we should use navigator.bluetooth.getAvailability() to
    // check whether we have a radio to use. However, no browser currently
    // implements this. Instead, see if requestDevice throws;

    let device: BluetoothDevice;
    try {
      device = await (((navigator as any).bluetooth) as Bluetooth).requestDevice(filters);
    } catch (e) {
      this.emit("scanningfinished");
      // This is the only way we have to check whether the user cancelled out of
      // the dialog versus bluetooth radio not being available, as both errors
      // are thrown as DOMExcpetion. Kill me.
      if (e.message.indexOf("User cancelled") !== -1) {
        return;
      }
      throw ButtplugException.LogAndError(ButtplugDeviceException,
        this._logger,
        "Bluetooth scanning interrupted. " +
        "Either user cancelled out of dialog, " +
        "or bluetooth radio is not available. Exception: " + e);
    }
    try {
      await this.OpenDevice(device);
    } catch (e) {
      this.emit("scanningfinished");
      throw ButtplugException.LogAndError(ButtplugDeviceException,
        this._logger,
        `Cannot open device ${device.name}: ${e}`);
    }
    this.emit("scanningfinished");
  }

  public StopScanning() {
    // noop. We can only scan via the browser dialog, and we can't cancel that from outside.
  }

  public get IsScanning(): boolean {
    // noop.
    return false;
  }

  private OpenDevice = async (aDevice: BluetoothDevice): Promise<void> => {
    if (aDevice === undefined) {
      // TODO Throw here?
      return;
    }
    // TODO Use DeviceConfigurationManager to get a device factory here.
    const mgr = DeviceConfigurationManager.Manager;

    const searchConfig = new BluetoothLEProtocolConfiguration([aDevice.name!]);

    const matchSpec = mgr.Find(searchConfig);

    if (matchSpec === undefined) {
      // TODO For WebBluetooth, we should never get here and should probably throw.
      return;
    }

    const [matchConfig, matchProtocolType] = matchSpec!;

    const webBtDevice = new WebBluetoothDevice(matchConfig as BluetoothLEProtocolConfiguration, aDevice);
    await webBtDevice.Connect();

    const protocol = new matchProtocolType(webBtDevice);

    const device = new ButtplugDevice(protocol, webBtDevice);
    await device.Initialize();
    this.emit("deviceadded", device);
  }
}
