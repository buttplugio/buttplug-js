/// <reference types="node" />
import * as Messages from "../core/Messages";
import { EventEmitter } from "events";
export default class DeviceManager extends EventEmitter {
    private _subtypeManagers;
    private _devices;
    private _deviceCounter;
    private _logger;
    constructor();
    SendMessage: (aMessage: Messages.ButtplugMessage) => Promise<Messages.ButtplugMessage>;
    private OnDeviceAdded;
    private OnDeviceRemoved;
    private OnScanningFinished;
}
