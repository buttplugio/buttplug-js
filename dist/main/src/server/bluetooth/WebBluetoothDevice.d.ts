/// <reference types="node" />
/// <reference types="web-bluetooth" />
import { IBluetoothDeviceImpl } from "./IBluetoothDeviceImpl";
import { BluetoothDeviceInfo } from "./BluetoothDeviceInfo";
import { ButtplugBluetoothDevice } from "./ButtplugBluetoothDevice";
import { EventEmitter } from "events";
export declare class WebBluetoothDevice extends EventEmitter implements IBluetoothDeviceImpl {
    private _deviceInfo;
    private _device;
    static CreateDevice(aDeviceInfo: BluetoothDeviceInfo, aDevice: BluetoothDevice): Promise<ButtplugBluetoothDevice>;
    private _logger;
    private _server;
    private _service;
    private _characteristics;
    constructor(_deviceInfo: BluetoothDeviceInfo, _device: BluetoothDevice);
    readonly Name: string;
    readonly Id: string;
    Connect: () => Promise<void>;
    Disconnect: () => Promise<void>;
    OnDisconnect: () => void;
    WriteValue: (aCharacteristic: string, aValue: Uint8Array) => Promise<void>;
    ReadValue: (aCharacteristic: string) => Promise<BufferSource>;
}
