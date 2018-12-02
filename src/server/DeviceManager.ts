import * as Messages from "../core/Messages";
import { IButtplugDevice } from "./IButtplugDevice";
import { IDeviceSubtypeManager } from "./IDeviceSubtypeManager";
import { WebBluetoothDeviceManager } from "./bluetooth/WebBluetoothDeviceManager";
import { EventEmitter } from "events";
import { ButtplugLogger } from "../core/Logging";
import { ButtplugException, ButtplugDeviceException, ButtplugMessageException } from "../core/Exceptions";

export class DeviceManager extends EventEmitter {
  private _subtypeManagers: IDeviceSubtypeManager[] = [];
  private _devices: Map<number, IButtplugDevice> = new Map<number, IButtplugDevice>();
  private _deviceCounter: number = 0;
  private _logger = ButtplugLogger.Logger;
  private _msgClosure: (ButtplugMessage) => void;

  constructor(aMsgClosure: (ButtplugMessage) => void) {
    super();
    this._logger.Debug("DeviceManager: Starting Device Manager");
    // If we have a bluetooth object on navigator, load the device manager
    if (typeof(window) !== "undefined" &&
        typeof(window.navigator) !== "undefined" &&
        (navigator as any).bluetooth) {
      this.AddDeviceManager(new WebBluetoothDeviceManager());
    } else {
      this._logger.Info("DeviceManager: Not adding WebBluetooth Manager, no WebBluetooth capabilities found.");
    }
    this._msgClosure = aMsgClosure;
  }

  public get DeviceManagers(): IDeviceSubtypeManager[] {
    return this._subtypeManagers;
  }

  public Shutdown = async () => {
    for (const d of this._devices.values()) {
      await d.Disconnect();
    }
  }

  public ClearDeviceManagers = () => {
    this._logger.Info("DeviceManager: Clearing device subtype managers");
    this._subtypeManagers = [];
  }

  public AddDeviceManager = (aManager: IDeviceSubtypeManager) => {
    this._logger.Info(`DeviceManager: Adding Device Manager ${aManager.constructor.name}`);
    this._subtypeManagers.push(aManager);
    aManager.addListener("deviceadded", this.OnDeviceAdded);
    aManager.addListener("deviceremoved", this.OnDeviceRemoved);
    aManager.addListener("scanningfinished", this.OnScanningFinished);
  }

  public SendMessage = async (aMessage: Messages.ButtplugMessage): Promise<Messages.ButtplugMessage> => {
    const id = aMessage.Id;
    // We need to switch on type here, since using constructor would cause
    // issues with how we do message versioning.
    switch (aMessage.Type) {
      case Messages.StartScanning:
        this._logger.Debug(`DeviceManager: Starting scan`);
        if (this._subtypeManagers.length === 0) {
          // If we have no managers by this point, return an error, because we'll
          // have nothing to scan with.
          throw ButtplugException.LogAndError(ButtplugDeviceException,
                                              this._logger,
                                              "No device managers available, cannot scan.",
                                              id);
        }
        for (const manager of this._subtypeManagers) {
          if (!manager.IsScanning) {
            try {
              await manager.StartScanning();
            } catch (e) {
              // Something is wrong. Stop all other managers and rethrow.
              // TODO Should this only fail on the bad manager, or all managers?
              for (const mgr of this._subtypeManagers) {
                if (mgr.IsScanning) {
                  mgr.StopScanning();
                }
              }
              throw e;
            }
          }
        }
        return new Messages.Ok(id);
      case Messages.StopScanning:
        this._logger.Debug(`DeviceManager: Stopping scan`);
        for (const manager of this._subtypeManagers) {
          if (manager.IsScanning) {
            manager.StopScanning();
          }
        }
        return new Messages.Ok(id);
      case Messages.StopAllDevices:
        this._logger.Debug(`DeviceManager: Stopping all devices`);
        this._devices.forEach((deviceObj, index) => {
          deviceObj.ParseMessage(new Messages.StopDeviceCmd());
        });
        return new Messages.Ok(id);
      case Messages.RequestDeviceList:
        this._logger.Debug(`DeviceManager: Sending device list`);
        const devices: Messages.DeviceInfoWithSpecifications[] = [];
        this._devices.forEach((v: IButtplugDevice, k: number) => {
          devices.push(new Messages.DeviceInfoWithSpecifications(k, v.Name, v.MessageSpecifications));
        });
        return new Messages.DeviceList(devices, id);
    }
    const deviceMsg = (aMessage as Messages.ButtplugDeviceMessage);
    if (deviceMsg.DeviceIndex === undefined) {
      throw ButtplugException.LogAndError(ButtplugMessageException,
                                          this._logger,
                                          `Message Type ${aMessage.Type} unhandled by this server.`,
                                          id);
    }
    if (!this._devices.has(deviceMsg.DeviceIndex)) {
      throw ButtplugException.LogAndError(ButtplugDeviceException,
                                          this._logger,
                                          `Device Index ${deviceMsg.DeviceIndex} does not exist`,
                                          id);
    }
    const device = this._devices.get(deviceMsg.DeviceIndex)!;
    if (device.AllowedMessageTypes.indexOf(aMessage.Type.name) < 0) {
      throw ButtplugException.LogAndError(ButtplugDeviceException,
                                          this._logger,
                                          `Device ${device.Name} does not take message type ${aMessage.Type}`,
                                          id);
    }
    this._logger.Trace(`DeviceManager: Sending ${deviceMsg.Type} to ${device.Name} (${deviceMsg.Id})`);
    return await device.ParseMessage(deviceMsg);
  }

  private OnDeviceAdded = (device: IButtplugDevice) => {
    for (const dev of this._devices.values()) {
      if (dev.Id === device.Id) {
        this._logger.Info(`DeviceManager: Device ${device.Name} (id: ${device.Id}) already added, ignoring.`);
        return;
      }
    }
    const deviceIndex = this._deviceCounter;
    this._deviceCounter += 1;
    this._devices.set(deviceIndex, device);
    this._logger.Info(`DeviceManager: Device Added: ${device.Name} (${deviceIndex})`);
    device.addListener("deviceremoved", this.OnDeviceRemoved);
    this._msgClosure(new Messages.DeviceAdded(deviceIndex,
                                              device.Name,
                                              device.MessageSpecifications));
  }

  private OnDeviceRemoved = (device: IButtplugDevice) => {
    let deviceIndex: number | null = null;
    for (const entry of Array.from(this._devices.entries())) {
      if (entry[1] === device) {
        deviceIndex = entry[0];
        break;
      }
    }
    if (deviceIndex === null) {
      return;
    }
    device.removeAllListeners("deviceremoved");
    this._devices.delete(deviceIndex);
    this._logger.Info(`DeviceManager: Device Removed: ${device.Name} (${deviceIndex})`);
    this._msgClosure(new Messages.DeviceRemoved(deviceIndex));
  }

  private OnScanningFinished = () => {
    this._logger.Debug(`DeviceManager: Scanning Finished.`);
    for (const manager of this._subtypeManagers) {
      if (manager.IsScanning) {
        return;
      }
    }
    this._msgClosure(new Messages.ScanningFinished());
  }
}
