import { TestDeviceManagerPanel } from "./TestDeviceManagerPanel";
import { LogPanel } from "./LogPanel";
import { ButtplugServer } from "../../index";

export function CreateLoggerPanel() {
  LogPanel.ShowLogPanel();
}

export function CreateDeviceManagerPanel(buttplugServer: ButtplugServer) {
  TestDeviceManagerPanel.ShowTestDeviceManagerPanel(buttplugServer);
}

export function RemoveDeviceManagerPanel() {
  const el = document.getElementById("buttplug-test-device-manager-panel");
  if (!el || !el.parentNode) {
    return;
  }
  el.parentNode.removeChild(el);
}
