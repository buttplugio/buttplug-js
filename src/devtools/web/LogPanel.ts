import { ButtplugLogger, LogMessage, ButtplugLogLevel } from "../../index";
const jsPanel = require("jspanel4");
require("jspanel4/dist/jspanel.css");
const logPanelHTML = require("./LogPanel.html").toString();
require("./LogPanel.css");

export class LogPanel {

  public static ShowLogPanel() {
    jsPanel.jsPanel.create({
      id: () => "buttplug-logger-panel",
      theme:       "primary",
      headerTitle: "Buttplug Log",
      position:    "center-top 0 80",
      contentSize: "650 250",
      callback() {
        this.content.innerHTML = logPanelHTML;
        LogPanel._panel = new LogPanel();
      },
    });
  }

  private static _panel: LogPanel | null = null;
  private logTextArea: HTMLTextAreaElement;
  private panelLevelSelect: HTMLSelectElement;
  private consoleLevelSelect: HTMLSelectElement;

  constructor() {
    this.logTextArea = document.getElementById("buttplugdevtoolslogtextarea")! as HTMLTextAreaElement;
    this.panelLevelSelect = document.getElementById("buttplugdevtoolsloglevelpanelselect")! as HTMLSelectElement;
    this.consoleLevelSelect = document.getElementById("buttplugdevtoolsloglevelconsoleselect")! as HTMLSelectElement;
    const log = ButtplugLogger.Logger;
    log.addListener("log", (msg) => {
      this.addLogMessage(msg);
    });
    this.panelLevelSelect.addEventListener("change", () => {
      log.MaximumEventLogLevel = ButtplugLogLevel[this.panelLevelSelect.value];
    });
    this.consoleLevelSelect.addEventListener("change", () => {
      log.MaximumConsoleLogLevel = ButtplugLogLevel[this.consoleLevelSelect.value];
    });
    log.MaximumEventLogLevel = ButtplugLogLevel.Debug;
    log.Debug("LogPanel: DevTools Log panel enabled.");
  }

  private addLogMessage(msg: LogMessage) {
    this.logTextArea.value = this.logTextArea.value + "\n" + msg.FormattedMessage;
  }

}
