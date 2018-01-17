"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logging_1 = require("../core/Logging");
var jsPanel = require("./jspanel.js");
require("jspanel4/dist/jspanel.css");
require("jspanel4/dist/fonts/jsglyph.eot");
var logPanelHTML = require("./LogPanel.html").toString();
require("./LogPanel.css");
var LogPanel = /** @class */ (function () {
    function LogPanel(logger) {
        var _this = this;
        this.logTextArea = document.getElementById("buttplugdevtoolslogtextarea");
        this.panelLevelSelect = document.getElementById("buttplugdevtoolsloglevelpanelselect");
        this.consoleLevelSelect = document.getElementById("buttplugdevtoolsloglevelconsoleselect");
        logger.addListener("log", function (msg) {
            _this.addLogMessage(msg);
        });
        this.panelLevelSelect.addEventListener("change", function () {
            logger.MaximumEventLogLevel = Logging_1.ButtplugLogLevel[_this.panelLevelSelect.value];
        });
        this.consoleLevelSelect.addEventListener("change", function () {
            logger.MaximumConsoleLogLevel = Logging_1.ButtplugLogLevel[_this.consoleLevelSelect.value];
        });
        logger.MaximumEventLogLevel = Logging_1.ButtplugLogLevel.Debug;
        logger.Debug("LogPanel: DevTools Log panel enabled.");
    }
    LogPanel.ShowLogPanel = function (logger) {
        jsPanel.jsPanel.create({
            theme: "primary",
            headerTitle: "Buttplug Log",
            position: "center-top 0 80",
            contentSize: "650 250",
            callback: function () {
                this.content.innerHTML = logPanelHTML;
                LogPanel._panel = new LogPanel(logger);
            },
        });
    };
    LogPanel.prototype.addLogMessage = function (msg) {
        this.logTextArea.value = this.logTextArea.value + "\n" + msg.FormattedMessage;
    };
    LogPanel._panel = null;
    return LogPanel;
}());
exports.LogPanel = LogPanel;
//# sourceMappingURL=LogPanel.js.map