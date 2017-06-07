import * as Messages from './messages';
export declare class Device {
    private _index;
    private _name;
    private _allowedMessages;
    constructor(_index: number, _name: string, _allowedMessages: Array<string>);
    static fromMsg(aMsg: Messages.DeviceAdded | Messages.DeviceInfo): Device;
    readonly Name: string;
    readonly Index: number;
    readonly AllowedMessages: Array<string>;
    newMessage(allowedMsg: number): Messages.ButtplugMessage;
}
