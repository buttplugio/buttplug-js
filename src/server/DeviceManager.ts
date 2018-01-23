import * as Messages from "../core/Messages";
import { IButtplugDevice } from "./IButtplugDevice";
import { IDeviceSubtypeManager } from "./IDeviceSubtypeManager";
import { WebBluetoothDeviceManager } from "./bluetooth/WebBluetoothDeviceManager";
import { EventEmitter } from "events";
import { ServerMessageHub } from "./ServerMessageHub";
import { ButtplugLogger } from "../core/Logging";

export class DeviceManager extends EventEmitter {
  private _subtypeManagers: IDeviceSubtypeManager[] = [];
  private _devices: Map<number, IButtplugDevice> = new Map<number, IButtplugDevice>();
  private _deviceCounter: number = 1;
  private _logger = ButtplugLogger.Logger;

  constructor() {
    super();
    this._logger.Debug("DeviceManager: Starting Device Manager");
    // If we have a bluetooth object on navigator, load the device manager
    if (typeof(window) !== "undefined" &&
        typeof(window.navigator) !== "undefined" &&
        (navigator as any).bluetooth) {
      this.AddDeviceManager(new WebBluetoothDeviceManager());
    } else {
      this._logger.Info("DeviceManager: Not adding WebBluetooth Manager, no capabilities found.");
    }
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
    switch (aMessage.Type) {
    case "StartScanning":
      this._logger.Debug(`DeviceManager: Starting scan`);
      if (this._subtypeManagers.length === 0) {
        // If we have no managers by this point, return an error, because we'll
        // have nothing to scan with.
        return this._logger.LogAndError("No device managers available, cannot scan.",
                                        Messages.ErrorClass.ERROR_DEVICE,
                                        id);
      }
      for (const manager of this._subtypeManagers) {
        if (!manager.IsScanning) {
          try {
            await manager.StartScanning();
          } catch (e) {
            return this._logger.LogAndError((e as Error).message,
                                            Messages.ErrorClass.ERROR_DEVICE,
                                            id);
          }
        }
      }
      return new Messages.Ok(id);
    case "StopScanning":
      this._logger.Debug(`DeviceManager: Stopping scan`);
      for (const manager of this._subtypeManagers) {
        if (manager.IsScanning) {
          manager.StopScanning();
        }
      }
      return new Messages.Ok(id);
    case "StopAllDevices":
      this._logger.Debug(`DeviceManager: Stopping all devices`);
      this._devices.forEach((deviceObj, index) => {
        deviceObj.ParseMessage(new Messages.StopDeviceCmd());
      });
      return new Messages.Ok(id);
    case "RequestDeviceList":
      this._logger.Debug(`DeviceManager: Sending device list`);
      const devices: Messages.DeviceInfo[] = [];
      this._devices.forEach((v: IButtplugDevice, k: number) => {
        devices.push(new Messages.DeviceInfo(k, v.Name, v.AllowedMessageTypes));
      });
      return new Messages.DeviceList(devices, id);
    }
    const deviceMsg = (aMessage as Messages.ButtplugDeviceMessage);
    if (deviceMsg.DeviceIndex === undefined) {
      return this._logger.LogAndError(`Message Type ${aMessage.Type} unhandled by this server.`,
                                      Messages.ErrorClass.ERROR_MSG,
                                      id);
    }
    if (!this._devices.has(deviceMsg.DeviceIndex)) {
      return this._logger.LogAndError(`Device Index ${deviceMsg.DeviceIndex} does not exist`,
                                      Messages.ErrorClass.ERROR_DEVICE,
                                      id);
    }
    const device = this._devices.get(deviceMsg.DeviceIndex)!;
    if (device.AllowedMessageTypes.indexOf(aMessage.Type) < 0) {
      return this._logger.LogAndError(`Device ${device.Name} does not take message type ${aMessage.Type}`,
                                      Messages.ErrorClass.ERROR_DEVICE,
                                      id);
    }
    this._logger.Trace(`DeviceManager: Sending ${deviceMsg.Type} to ${device.Name} (${deviceMsg.Id})`);
    return await device.ParseMessage(deviceMsg);
  }

  private OnDeviceAdded = (device: IButtplugDevice) => {
    const deviceIndex = this._deviceCounter;
    this._deviceCounter += 1;
    this._devices.set(deviceIndex, device);
    this._logger.Info(`DeviceManager: Device Added: ${device.Name} (${deviceIndex})`);
    device.addListener("deviceremoved", this.OnDeviceRemoved);
    ServerMessageHub.Instance.emitMessage(new Messages.DeviceAdded(deviceIndex,
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
    ServerMessageHub.Instance.emitMessage(new Messages.DeviceRemoved(deviceIndex));
  }

  private OnScanningFinished = () => {
    this._logger.Debug(`DeviceManager: Scanning Finished.`);
    for (const manager of this._subtypeManagers) {
      if (manager.IsScanning) {
        return;
      }
    }
    ServerMessageHub.Instance.emitMessage(new Messages.ScanningFinished());
  }
}
