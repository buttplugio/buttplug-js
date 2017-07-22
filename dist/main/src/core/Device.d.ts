import * as Messages from "./Messages";
export declare class Device {
    private _index;
    private _name;
    private _allowedMessages;
    static fromMsg(aMsg: Messages.DeviceAdded | Messages.DeviceInfo): Device;
    constructor(_index: number, _name: string, _allowedMessages: string[]);
    readonly Name: string;
    readonly Index: number;
    readonly AllowedMessages: string[];
    newMessage(allowedMsg: number): Messages.ButtplugMessage;
}
