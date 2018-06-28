/// <reference types="web-bluetooth" />
/// <reference types="node" />
import { IBluetoothDeviceImpl } from "./IBluetoothDeviceImpl";
import { BluetoothDeviceInfo } from "./BluetoothDeviceInfo";
import { ButtplugBluetoothDevice } from "./ButtplugBluetoothDevice";
import { EventEmitter } from "events";
export declare class WebBluetoothDevice extends EventEmitter implements IBluetoothDeviceImpl {
    private _deviceInfo;
    private _device;
    static CreateDevice(aDeviceInfo: BluetoothDeviceInfo, aDevice: BluetoothDevice): Promise<ButtplugBluetoothDevice>;
    private _notificationHandlers;
    private _logger;
    private _server;
    private _service;
    private _decoder;
    private _characteristics;
    constructor(_deviceInfo: BluetoothDeviceInfo, _device: BluetoothDevice);
    readonly Name: string;
    readonly Id: string;
    Connect: () => Promise<void>;
    Disconnect: () => Promise<void>;
    OnDisconnect: () => void;
    WriteString: (aCharacteristic: string, aValue: string) => Promise<void>;
    WriteValue: (aCharacteristic: string, aValue: Uint8Array) => Promise<void>;
    ReadString: (aCharacteristic: string) => Promise<string>;
    ReadValue: (aCharacteristic: string) => Promise<BufferSource>;
    Subscribe: (aCharacteristic: string) => Promise<void>;
    Unsubscribe: (aCharacteristic: string) => Promise<void>;
    protected CharacteristicValueChanged: (aEvent: Event, aCharacteristic: string) => void;
}
