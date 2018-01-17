import { ButtplugLogger, LogMessage, ButtplugLogLevel } from "../core/Logging";
const jsPanel = require("./jspanel.js");
require("jspanel4/dist/jspanel.css");
require("jspanel4/dist/fonts/jsglyph.eot");
const logPanelHTML = require("./LogPanel.html").toString();
require("./LogPanel.css");

export class LogPanel {

  public static ShowLogPanel(logger: ButtplugLogger) {
    jsPanel.jsPanel.create({
      theme:       "primary",
      headerTitle: "Buttplug Log",
      position:    "center-top 0 80",
      contentSize: "650 250",
      callback() {
        this.content.innerHTML = logPanelHTML;
        LogPanel._panel = new LogPanel(logger);
      },
    });
  }

  private static _panel: LogPanel | null = null;
  private logTextArea: HTMLTextAreaElement;
  private panelLevelSelect: HTMLSelectElement;
  private consoleLevelSelect: HTMLSelectElement;

  constructor(logger: ButtplugLogger) {
    this.logTextArea = document.getElementById("buttplugdevtoolslogtextarea")! as HTMLTextAreaElement;
    this.panelLevelSelect = document.getElementById("buttplugdevtoolsloglevelpanelselect")! as HTMLSelectElement;
    this.consoleLevelSelect = document.getElementById("buttplugdevtoolsloglevelconsoleselect")! as HTMLSelectElement;
    logger.addListener("log", (msg) => {
      this.addLogMessage(msg);
    });
    this.panelLevelSelect.addEventListener("change", () => {
      logger.MaximumEventLogLevel = ButtplugLogLevel[this.panelLevelSelect.value];
    });
    this.consoleLevelSelect.addEventListener("change", () => {
      logger.MaximumConsoleLogLevel = ButtplugLogLevel[this.consoleLevelSelect.value];
    });
    logger.MaximumEventLogLevel = ButtplugLogLevel.Debug;
    logger.Debug("LogPanel: DevTools Log panel enabled.");
  }

  private addLogMessage(msg: LogMessage) {
    this.logTextArea.value = this.logTextArea.value + "\n" + msg.FormattedMessage;
  }

}
