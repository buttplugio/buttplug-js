/// <reference types="node" />
import { EventEmitter } from "events";
import { IDeviceSubtypeManager } from "../index";
import { TestDevice } from "./TestDevice";
export declare class TestDeviceManager extends EventEmitter implements IDeviceSubtypeManager {
    private _isScanning;
    private _testVibrationDevice;
    private _testLinearDevice;
    private _testRotationDevice;
    constructor();
    ConnectVibrationDevice(): void;
    ConnectLinearDevice(): void;
    ConnectRotationDevice(): void;
    StartScanning(): void;
    readonly VibrationDevice: TestDevice;
    readonly LinearDevice: TestDevice;
    readonly RotationDevice: TestDevice;
    StopScanning(): void;
    readonly IsScanning: boolean;
}
