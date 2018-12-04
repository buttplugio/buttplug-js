import { ButtplugLogger } from "../../core/Logging";
import { ButtplugException, ButtplugDeviceException } from "../../core/Exceptions";
import { DeviceAdded } from "../../core/Messages";
import { IDeviceSubtypeManager } from "../IDeviceSubtypeManager";
import { BluetoothDevices } from "./BluetoothDevices";
import { BluetoothDeviceInfo } from "./BluetoothDeviceInfo";
import { EventEmitter } from "events";
import { WebBluetoothDevice } from "./WebBluetoothDevice";

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
    const info = BluetoothDevices.GetDeviceInfo();
    const filters = {
      filters: new Array<BluetoothRequestDeviceFilter>(),
      optionalServices: new Array<BluetoothServiceUUID>(),
    };
    for (const deviceInfo of info) {
      for (const deviceName of deviceInfo.Names) {
        filters.filters.push({name: deviceName});
      }
      for (const deviceNamePrefix of deviceInfo.NamePrefixes) {
        filters.filters.push({namePrefix: deviceNamePrefix});
      }
      filters.optionalServices = [...filters.optionalServices, ...deviceInfo.Services];
    }

    this._logger.Trace("Bluetooth filter set: " + filters);

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
    // Find the related info for the device
    const info = BluetoothDevices.GetDeviceInfo();
    let deviceInfo: BluetoothDeviceInfo | null = null;
    for (const di of info) {
      if (di.Names.indexOf(aDevice.name!) >= 0) {
        deviceInfo = di;
        break;
      }
      for (const namePrefix of di.NamePrefixes) {
        if (aDevice.name!.indexOf(namePrefix) !== -1) {
          deviceInfo = di;
          break;
        }
      }
    }
    if (deviceInfo === null) {
      // TODO Throw here?
      // We somehow got a device we don't know what to do with?
      return;
    }

    const device = await WebBluetoothDevice.CreateDevice(deviceInfo, aDevice);
    this.emit("deviceadded", device);
  }
}
