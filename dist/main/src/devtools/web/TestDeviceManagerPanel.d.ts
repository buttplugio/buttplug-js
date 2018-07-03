import { ButtplugServer } from "../../index";
import { TestDeviceManager } from "../TestDeviceManager";
export declare class TestDeviceManagerPanel {
    static ShowTestDeviceManagerPanel(buttplugServer: ButtplugServer): void;
    protected static _panel: TestDeviceManagerPanel;
    private vibratorTween;
    private launchTween;
    private _testManager;
    private fleshlightElement;
    private vibratorElement;
    private currentLaunchPosition;
    private lastPosition;
    private moveRadius;
    private currentVibratePosition;
    private elementObserver;
    private hasRAFBeenCalled;
    constructor(tdm: TestDeviceManager);
    private requestAnimate;
    private animate;
    private launchMove;
    private moveDuration;
    private calcDuration;
    private vibrateMove;
}
