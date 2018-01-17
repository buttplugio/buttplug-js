import { ButtplugLogger } from "../core/Logging";
export declare class LogPanel {
    static ShowLogPanel(logger: ButtplugLogger): void;
    private static _panel;
    private logTextArea;
    private panelLevelSelect;
    private consoleLevelSelect;
    constructor(logger: ButtplugLogger);
    private addLogMessage(msg);
}
