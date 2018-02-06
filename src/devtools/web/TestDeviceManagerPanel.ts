import { ButtplugServer, ButtplugLogger } from "../../index";
import { TestDeviceManager } from "../TestDeviceManager";
import * as TWEEN from "@tweenjs/tween.js";

const jsPanel = require("./jspanel.js");
require("jspanel4/dist/jspanel.css");
require("jspanel4/dist/fonts/jsglyph.eot");
const testPanelHTML = require("./TestDeviceManagerPanel.html").toString();
require("./TestDeviceManagerPanel.css");

export class TestDeviceManagerPanel {
  public static ShowTestDeviceManagerPanel(buttplugServer: ButtplugServer) {
    jsPanel.jsPanel.create({
      id: () => "buttplug-test-device-manager-panel",
      theme:       "primary",
      headerTitle: "Test Device Manager",
      position:    "center-top 0 80",
      contentSize: "400 250",
      callback() {
        this.content.innerHTML = testPanelHTML;
        TestDeviceManagerPanel._panel = new TestDeviceManagerPanel(buttplugServer);
      },
    });
  }

  protected static _panel: TestDeviceManagerPanel;
  private _testManager: TestDeviceManager | null = null;
  private fleshlightElement: HTMLElement;
  private vibratorElement: HTMLElement;
  private currentLaunchPosition: any = { x: 0, y: 0 };
  private lastPosition: number = 0;
  private moveRadius: number = 0;
  private currentVibratePosition: any = { x: 0, y: 0 };

  constructor(buttplugServer: ButtplugServer) {
    for (const mgr of buttplugServer.DeviceManagers) {
      if (mgr.constructor.name === "TestDeviceManager") {
        this._testManager = (mgr as TestDeviceManager);
      }
    }
    if (this._testManager === null) {
      ButtplugLogger.Logger.Error("TestDeviceManagerPanel: Cannot get test device manager from server.");
      throw new Error("Cannot get test device manager from server.");
    }
    document.getElementById("vibratedisconnect")!.addEventListener("click", () => {
      this._testManager!.VibrationDevice.Disconnect();
    });
    document.getElementById("lineardisconnect")!.addEventListener("click", () => {
      this._testManager!.LinearDevice.Disconnect();
    });
    this._testManager.VibrationDevice.addListener("vibrate", (speed) => {
      document.getElementById("vibrationspeed")!.innerHTML = speed;
      this.vibrateMove(speed);
    });
    this._testManager.LinearDevice.addListener("linear", (linearobj: any) => {
      document.getElementById("linearposition")!.innerHTML = linearobj.position;
      document.getElementById("linearspeed")!.innerHTML = linearobj.speed;
      this.launchMove(linearobj.position, linearobj.speed);
    });
    this.fleshlightElement = document.getElementById("fleshlight-image")!;
    this.vibratorElement = document.getElementById("vibrator-image")!;
  }

  private launchMove = (position, speed) => {
    const p = -((100 - position) * 0.22);
    const duration = this.moveDuration(position, speed);
    new TWEEN.Tween(this.currentLaunchPosition)
      .to({x: 0, y: p}, duration)
      .start();
    requestAnimationFrame(this.launchAnimate);
  }

  private launchAnimate = (timestamp: number) => {
    if (!TWEEN.update()) {
      return;
    }
    this.fleshlightElement.style.bottom = `${this.currentLaunchPosition.y}%`;
    requestAnimationFrame(this.launchAnimate);
  }

  // moveDuration returns the time in milliseconds it will take to move
  // to position at speed.
  //
  // position: position in percent (0-100).
  // speed:    speed in percent (20-100).
  private moveDuration = (position: number, speed: number) => {
    const distance = Math.abs(position - this.lastPosition);
    this.lastPosition = position;
    return this.calcDuration(distance, speed);
  }

  // _calcDuration returns duration of a move in milliseconds for a given
  // distance/speed.
  //
  // distance: amount to move percent (0-100).
  // speed: speed to move at in percent (20-100).
  private calcDuration = (distance: number, speed: number) => {
    return Math.pow(speed / 25000, -0.95) / (90 / distance);
  }

  private vibrateMove = (speed) => {
    this.moveRadius = speed;
    requestAnimationFrame(this.vibrateAnimate);
  }

  private vibrateAnimate = (timestamp: number) => {
    if (!TWEEN.update()) {
      if (this.moveRadius !== 0) {
        new TWEEN.Tween(this.currentVibratePosition)
          .to({x: Math.floor(Math.random() * this.moveRadius * 20),
               y: Math.floor(Math.random() * this.moveRadius * 20)}
              , 34)
          .start();
        requestAnimationFrame(this.vibrateAnimate);
      }
      return;
    }
    this.vibratorElement.style.top = `${this.currentVibratePosition.x}px`;
    this.vibratorElement.style.right = `${this.currentVibratePosition.y}px`;
    requestAnimationFrame(this.vibrateAnimate);
  }
}

// Some code in this file taken from https://github.com/funjack/launchcontrol
// MIT License:
/*
Lauchcontrol UI Fleshlight

https://github.com/funjack/launchcontrol

Copyright 2017 Funjack

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
this list of conditions and the following disclaimer in the documentation
and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors
may be used to endorse or promote products derived from this software without
specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
