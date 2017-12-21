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
    this._logger.Debug("Starting Device Manager");
    // If we have a bluetooth object on navigator, load the device manager
    if (typeof(window) !== "undefined" &&
        typeof(window.navigator) !== "undefined" &&
        (navigator as any).bluetooth) {
      const manager = new WebBluetoothDeviceManager();
      manager.addListener("deviceadded", this.OnDeviceAdded);
      manager.addListener("deviceremoved", this.OnDeviceRemoved);
      this._subtypeManagers.push(manager);
    }
    // TODO: If we have no managers by this point, throw, because we'll never load a device
    for (const manager of this._subtypeManagers) {
      manager.addListener("scanningfinished", this.OnScanningFinished);
    }
  }

  public AddDeviceManager = (aManager: IDeviceSubtypeManager) => {
    this._subtypeManagers.push(aManager);
    aManager.addListener("deviceadded", this.OnDeviceAdded);
    aManager.addListener("deviceremoved", this.OnDeviceRemoved);
    aManager.addListener("scanningfinished", this.OnScanningFinished);
  }

  public SendMessage = async (aMessage: Messages.ButtplugMessage): Promise<Messages.ButtplugMessage> => {
    const id = aMessage.Id;
    switch (aMessage.Type) {
    case "StartScanning":
      for (const manager of this._subtypeManagers) {
        if (!manager.IsScanning()) {
          try {
            await manager.StartScanning();
          } catch (e) {
            return new Messages.Error((e as Error).message, Messages.ErrorClass.ERROR_DEVICE, id);
          }
        }
      }
      return new Messages.Ok(id);
    case "StopScanning":
      for (const manager of this._subtypeManagers) {
        if (manager.IsScanning()) {
          manager.StopScanning();
        }
      }
      return new Messages.Ok(id);
    case "StopAllDevices":
      this._devices.forEach((deviceObj, index) => {
        deviceObj.ParseMessage(new Messages.StopDeviceCmd());
      });
      return new Messages.Ok(id);
    case "RequestDeviceList":
      return new Messages.DeviceList([], id);
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
    if (device.GetAllowedMessageTypes().indexOf(aMessage.Type) < 0) {
      return this._logger.LogAndError(`Device ${device.Name} does not take message type ${aMessage.Type}`,
                                      Messages.ErrorClass.ERROR_DEVICE,
                                      id);
    }
    return await device.ParseMessage(deviceMsg);
  }

  private OnDeviceAdded = (device: IButtplugDevice) => {
    this._logger.Debug(`Device Added: ${device.Name}`);
    const deviceIndex = this._deviceCounter;
    this._deviceCounter += 1;
    this._devices.set(deviceIndex, device);
    device.addListener("deviceremoved", this.OnDeviceRemoved);
    ServerMessageHub.Instance.emitMessage(new Messages.DeviceAdded(deviceIndex,
                                                                   device.Name,
                                                                   device.GetMessageSpecifications()));
  }

  private OnDeviceRemoved = (device: IButtplugDevice) => {
    this._logger.Debug(`Device Removed: ${device.Name}`);
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
    this._devices.delete(deviceIndex);
    ServerMessageHub.Instance.emitMessage(new Messages.DeviceRemoved(deviceIndex));
  }

  private OnScanningFinished = () => {
    for (const manager of this._subtypeManagers) {
      if (manager.IsScanning()) {
        return;
      }
    }
    ServerMessageHub.Instance.emitMessage(new Messages.ScanningFinished());
  }
}
