/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import { ButtplugLogger, LogMessage, ButtplugLogLevel } from "buttplug";
import * as jsPanel from "jspanel4";
import logPanelHTML from "./LogPanel.html";
import jspanelCSS from "jspanel4/dist/jspanel.css";
import logPanelCSS from "./LogPanel.css";

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
