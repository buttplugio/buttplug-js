import { TestDeviceManagerPanel } from "./TestDeviceManagerPanel";
import { LogPanel } from "./LogPanel";
import { ButtplugServer } from "../../index";

export function CreateLoggerPanel() {
  LogPanel.ShowLogPanel();
}

export function CreateDeviceManagerPanel(buttplugServer: ButtplugServer) {
  TestDeviceManagerPanel.ShowTestDeviceManagerPanel(buttplugServer);
}
