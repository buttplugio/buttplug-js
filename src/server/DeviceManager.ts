import * as Messages from "../core/Messages";
import IButtplugDevice from "./IButtplugDevice";
import IDeviceSubtypeManager from "./IDeviceSubtypeManager";
import WebBluetoothDeviceManager from "./bluetooth/WebBluetoothDeviceManager";

export default class DeviceManager {
  private _subtypeManagers: IDeviceSubtypeManager[] = [];
  private _devices: IButtplugDevice[] = [];

  public constructor() {
    // If we have a bluetooth object on navigator, load the device manager
    if (navigator && (navigator as any).bluetooth) {
      this._subtypeManagers.push(new WebBluetoothDeviceManager());
    }
    // TODO: If we have no managers by this point, throw, because we'll never load a device
  }

  public SendMessage = async (aMessage: Messages.ButtplugMessage): Promise<Messages.ButtplugMessage> => {
    const id = aMessage.Id;
    switch (aMessage.constructor.name) {
    case "StartScanning":
      for (const manager of this._subtypeManagers) {
        if (!manager.IsScanning()) {
          manager.StartScanning();
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
      for (const device of this._devices) {
        device.ParseMessage(new Messages.StopDeviceCmd());
      }
      return new Messages.Ok(id);
    case "RequestDeviceList":
      return new Messages.DeviceList([], id);
    default:
      // TODO: Figure out how we're gonna deal with device messages here.
      break;
    }
    return new Messages.Error("Message Type " + aMessage.constructor.name + " unhandled by this server.");
  }
}
