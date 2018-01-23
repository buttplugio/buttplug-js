/// <reference types="node" />
import { EventEmitter } from "events";
import { IDeviceSubtypeManager } from "../index";
import { TestDevice } from "./TestDevice";
export declare class TestDeviceManager extends EventEmitter implements IDeviceSubtypeManager {
    static Get(): TestDeviceManager;
    private static _testManager;
    private _isScanning;
    private _testVibrationDevice;
    private _testLinearDevice;
    protected constructor();
    ConnectVibrationDevice(): void;
    ConnectLinearDevice(): void;
    StartScanning(): void;
    readonly VibrationDevice: TestDevice;
    readonly LinearDevice: TestDevice;
    StopScanning(): void;
    readonly IsScanning: boolean;
}
