import { ButtplugServer } from "../../index";
import { TestDeviceManager } from "../TestDeviceManager";
export declare class TestDeviceManagerPanel {
    static ShowTestDeviceManagerPanel(buttplugServer: ButtplugServer): void;
    protected static _panel: TestDeviceManagerPanel;
    private _testManager;
    private fleshlightElement;
    private vibratorElement;
    private currentLaunchPosition;
    private lastPosition;
    private moveRadius;
    private currentVibratePosition;
    constructor(tdm: TestDeviceManager);
    private launchMove;
    private launchAnimate;
    private moveDuration;
    private calcDuration;
    private vibrateMove;
    private vibrateAnimate;
}
