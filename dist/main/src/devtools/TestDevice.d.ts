import { ButtplugDevice } from "../server/ButtplugDevice";
export declare class TestDevice extends ButtplugDevice {
    private _connected;
    private _linearSpeed;
    private _linearPosition;
    private _vibrateSpeed;
    constructor(name: string, shouldVibrate?: boolean, shouldLinear?: boolean);
    Connected: boolean;
    Disconnect(): void;
    private HandleStopDeviceCmd;
    private HandleSingleMotorVibrateCmd;
    private HandleFleshlightLaunchFW12Cmd;
}
