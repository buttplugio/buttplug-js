import { DeviceAdded, IDeviceSubtypeManager, BluetoothDevices, BluetoothDeviceInfo, ButtplugLogger } from "buttplug";
import { EventEmitter } from "events";
let noble;
try {
  noble = require("noble-uwp");
} catch (e) {
  noble = require("noble");
}
import { ButtplugNodeBluetoothLEDevice } from "./ButtplugNodeBluetoothLEDevice";

export class ButtplugNodeBluetoothLEDeviceManager extends EventEmitter implements IDeviceSubtypeManager {

  private isScanning: boolean = false;
  private initializerPromise: Promise<void> | null;
  // Set to default logger to make sure we have something at startup.
  private logger: ButtplugLogger = ButtplugLogger.Logger;

  constructor() {
    super();
    noble.on("discover", (d: any) => {
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

  private OpenDevice = async (device: any): Promise<void> => {
    if (device === undefined) {
      // TODO Throw here?
      return;
    }
    // If the device doesn't even have a name, chances are we aren't interested.
    if (device.advertisement.localName === undefined) {
      return;
    }
    for (const deviceInfo of BluetoothDevices.GetDeviceInfo()) {
      if (deviceInfo.Names.indexOf(device.advertisement.localName) > -1) {
        const bpdevice = await ButtplugNodeBluetoothLEDevice.CreateDevice(deviceInfo, device);
        this.emit("deviceadded", bpdevice);
        return;
      }
      for (const namePrefix of deviceInfo.NamePrefixes) {
        if (device.advertisement.localName.indexOf(namePrefix) !== -1) {
          const bpdevice = await ButtplugNodeBluetoothLEDevice.CreateDevice(deviceInfo, device);
          this.emit("deviceadded", bpdevice);
          return;
        }
      }
    }

  }
}
