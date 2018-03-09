import { ButtplugDevice } from "../index";
export declare class TestDevice extends ButtplugDevice {
    private _connected;
    private _linearSpeed;
    private _linearPosition;
    private _vibrateSpeed;
    private _rotateSpeed;
    private _rotateClockwise;
    constructor(name: string, shouldVibrate?: boolean, shouldLinear?: boolean, shouldRotate?: boolean);
    Connected: boolean;
    readonly MessageSpecifications: object;
    Disconnect(): void;
    private HandleStopDeviceCmd;
    private HandleSingleMotorVibrateCmd;
    private HandleVibrateCmd;
    private HandleRotateCmd;
    private HandleFleshlightLaunchFW12Cmd;
    private HandleLinearCmd;
}
