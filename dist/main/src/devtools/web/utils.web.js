"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TestDeviceManagerPanel_1 = require("./TestDeviceManagerPanel");
const LogPanel_1 = require("./LogPanel");
function CreateLoggerPanel() {
    LogPanel_1.LogPanel.ShowLogPanel();
}
exports.CreateLoggerPanel = CreateLoggerPanel;
function CreateDeviceManagerPanel(buttplugServer) {
    TestDeviceManagerPanel_1.TestDeviceManagerPanel.ShowTestDeviceManagerPanel(buttplugServer);
}
exports.CreateDeviceManagerPanel = CreateDeviceManagerPanel;
//# sourceMappingURL=utils.web.js.map