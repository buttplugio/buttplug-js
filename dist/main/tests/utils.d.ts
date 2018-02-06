/// <reference types="node" />
import { ButtplugClient } from "../src/index";
import { BluetoothDeviceInfo } from "../src/server/bluetooth/BluetoothDeviceInfo";
import * as Messages from "../src/core/Messages";
import { DeviceMock, CharacteristicMock, PrimaryServiceMock, GattMock } from "web-bluetooth-mock";
export declare class BPTestClient extends ButtplugClient {
    constructor(ClientName: string);
    readonly PingTimer: NodeJS.Timer | null;
    SendCheckedMessage(aMsg: Messages.ButtplugMessage): Promise<Messages.ButtplugMessage>;
    SendUncheckedMessage(aMsg: Messages.ButtplugMessage): Promise<Messages.ButtplugMessage>;
}
export declare function SetupTestSuite(): void;
export declare class WebBluetoothMockObject {
    device: DeviceMock;
    gatt: GattMock;
    service: PrimaryServiceMock;
    txChar: CharacteristicMock;
    constructor(device: DeviceMock, gatt: GattMock, service: PrimaryServiceMock, txChar: CharacteristicMock);
}
export declare function MakeMockWebBluetoothDevice(deviceInfo: BluetoothDeviceInfo): WebBluetoothMockObject;
export declare function SetupTestServer(): Promise<any>;
