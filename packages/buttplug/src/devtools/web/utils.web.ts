/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

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
