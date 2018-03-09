import * as Messages from "./Messages";
import { Device } from "./Device";
export declare function CheckMessage(aMsgObj: Messages.ButtplugMessage): void;
export declare function FromJSON(str: any): Messages.ButtplugMessage[];
export declare function GetSchemaVersion(): number;
export declare function CreateSimpleVibrateCmd(device: Device, speed: number): Messages.VibrateCmd;
export declare function CreateSimpleLinearCmd(device: Device, position: number, duration: number): Messages.LinearCmd;
export declare function CreateSimpleRotateCmd(device: Device, speed: number, clockwise: boolean): Messages.RotateCmd;
