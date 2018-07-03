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
function RemoveDeviceManagerPanel() {
    const el = document.getElementById("buttplug-test-device-manager-panel");
    if (!el || !el.parentNode) {
        return;
    }
    el.parentNode.removeChild(el);
}
exports.RemoveDeviceManagerPanel = RemoveDeviceManagerPanel;
//# sourceMappingURL=utils.web.js.map