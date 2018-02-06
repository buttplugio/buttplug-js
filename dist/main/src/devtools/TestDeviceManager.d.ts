/// <reference types="node" />
import { EventEmitter } from "events";
import { IDeviceSubtypeManager } from "../index";
import { TestDevice } from "./TestDevice";
export declare class TestDeviceManager extends EventEmitter implements IDeviceSubtypeManager {
    private _isScanning;
    private _testVibrationDevice;
    private _testLinearDevice;
    constructor();
    ConnectVibrationDevice(): void;
    ConnectLinearDevice(): void;
    StartScanning(): void;
    readonly VibrationDevice: TestDevice;
    readonly LinearDevice: TestDevice;
    StopScanning(): void;
    readonly IsScanning: boolean;
}
