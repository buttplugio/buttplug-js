/// <reference types="node" />
import { IDeviceSubtypeManager } from "../IDeviceSubtypeManager";
import { EventEmitter } from "events";
export declare class WebBluetoothDeviceManager extends EventEmitter implements IDeviceSubtypeManager {
    StartScanning(): Promise<void>;
    StopScanning(): void;
    readonly IsScanning: boolean;
    private OpenDevice;
}
