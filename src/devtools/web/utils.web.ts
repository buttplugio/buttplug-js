import { TestDeviceManagerPanel } from "./TestDeviceManagerPanel";
import { LogPanel } from "./LogPanel";

export function CreateLoggerPanel() {
  LogPanel.ShowLogPanel();
}

export function CreateDeviceManagerPanel() {
  TestDeviceManagerPanel.ShowTestDeviceManagerPanel();
}
