/// <reference types="node" />
import IDeviceSubtypeManager from "../IDeviceSubtypeManager";
import { EventEmitter } from "events";
export default class WebBluetoothDeviceManager extends EventEmitter implements IDeviceSubtypeManager {
    StartScanning(): boolean;
    StopScanning(): boolean;
    IsScanning(): boolean;
    private OpenDevice;
}
