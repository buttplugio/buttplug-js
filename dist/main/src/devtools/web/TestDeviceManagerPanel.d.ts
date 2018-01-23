export declare class TestDeviceManagerPanel {
    static ShowTestDeviceManagerPanel(): void;
    protected static _panel: TestDeviceManagerPanel;
    private _testManager;
    private fleshlightElement;
    private vibratorElement;
    private currentLaunchPosition;
    private lastPosition;
    private moveRadius;
    private currentVibratePosition;
    constructor();
    private launchMove;
    private launchAnimate;
    private moveDuration;
    private calcDuration;
    private vibrateMove;
    private vibrateAnimate;
}
