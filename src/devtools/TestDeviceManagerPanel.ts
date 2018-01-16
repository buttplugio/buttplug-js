import { TestDeviceManager } from "./TestDeviceManager";

const jsPanel = require("./jspanel.js");
require("jspanel4/dist/jspanel.css");
require("jspanel4/dist/fonts/jsglyph.eot");
const testPanelHTML = require("./TestDeviceManagerPanel.html").toString();
require("./TestDeviceManagerPanel.css");

export class TestDeviceManagerPanel {
  public static ShowTestDeviceManagerPanel() {
    jsPanel.jsPanel.create({
      theme:       "primary",
      headerTitle: "Test Device Manager",
      position:    "center-top 0 80",
      contentSize: "350 250",
      callback: function() {
        this.content.innerHTML = testPanelHTML;
        TestDeviceManagerPanel._panel = new TestDeviceManagerPanel();
      },
    });
  }

  protected static _panel: TestDeviceManagerPanel;
  private _testManager = TestDeviceManager.Get();

  constructor() {
    document.getElementById("vibratedisconnect")!.addEventListener("click", () => {
      this._testManager.VibrationDevice.Disconnect();
    });
    document.getElementById("lineardisconnect")!.addEventListener("click", () => {
      this._testManager.LinearDevice.Disconnect();
    });
    this._testManager.VibrationDevice.addListener("vibrate", (speed) => {
      document.getElementById("vibrationspeed")!.innerHTML = speed;
    });
    this._testManager.LinearDevice.addListener("linear", (linearobj: any) => {
      document.getElementById("linearposition")!.innerHTML = linearobj.position;
      document.getElementById("linearspeed")!.innerHTML = linearobj.speed;
    });
  }
}
