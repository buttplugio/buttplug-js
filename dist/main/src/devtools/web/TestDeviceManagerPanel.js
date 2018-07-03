"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const TWEEN = require("@tweenjs/tween.js");
const jsPanel = require("jspanel4");
require("jspanel4/dist/jspanel.css");
const testPanelHTML = require("./TestDeviceManagerPanel.html").toString();
require("./TestDeviceManagerPanel.css");
class TestDeviceManagerPanel {
    constructor(tdm) {
        this.vibratorTween = null;
        this.launchTween = null;
        this.currentLaunchPosition = { x: 0, y: 0 };
        this.lastPosition = 0;
        this.moveRadius = 0;
        this.currentVibratePosition = { x: 0, y: 0 };
        this.elementObserver = null;
        this.hasRAFBeenCalled = false;
        this.requestAnimate = () => {
            if (this.hasRAFBeenCalled) {
                return;
            }
            this.hasRAFBeenCalled = true;
            requestAnimationFrame(this.animate);
        };
        this.animate = (currentTime) => {
            this.hasRAFBeenCalled = false;
            if (this.vibratorTween && !this.vibratorTween.update(currentTime)) {
                if (this.moveRadius !== 0) {
                    this.vibrateMove(this.moveRadius);
                }
                else {
                    this.vibratorTween = null;
                }
            }
            if (this.launchTween && !this.launchTween.update(currentTime)) {
                this.launchTween = null;
            }
            else {
                this.requestAnimate();
            }
            this.vibratorElement.style.top = `${this.currentVibratePosition.x}px`;
            this.vibratorElement.style.right = `${this.currentVibratePosition.y}px`;
            this.fleshlightElement.style.bottom = `${this.currentLaunchPosition.y}%`;
        };
        this.launchMove = (position, speed) => {
            const p = -((100 - position) * 0.22);
            const duration = this.moveDuration(position, speed);
            this.launchTween = new TWEEN.Tween(this.currentLaunchPosition)
                .to({ x: 0, y: p }, duration)
                .start();
            this.requestAnimate();
        };
        // moveDuration returns the time in milliseconds it will take to move
        // to position at speed.
        //
        // position: position in percent (0-100).
        // speed:    speed in percent (20-100).
        this.moveDuration = (position, speed) => {
            const distance = Math.abs(position - this.lastPosition);
            this.lastPosition = position;
            return this.calcDuration(distance, speed);
        };
        // _calcDuration returns duration of a move in milliseconds for a given
        // distance/speed.
        //
        // distance: amount to move percent (0-100).
        // speed: speed to move at in percent (20-100).
        this.calcDuration = (distance, speed) => {
            return Math.pow(speed / 25000, -0.95) / (90 / distance);
        };
        this.vibrateMove = (speed) => {
            this.moveRadius = speed;
            this.vibratorTween = new TWEEN.Tween(this.currentVibratePosition)
                .to({ x: Math.floor(Math.random() * this.moveRadius * 20),
                y: Math.floor(Math.random() * this.moveRadius * 20) }, 34)
                .start();
            this.requestAnimate();
        };
        this._testManager = tdm;
        document.getElementById("vibratedisconnect").addEventListener("click", () => {
            this._testManager.VibrationDevice.Disconnect();
        });
        document.getElementById("lineardisconnect").addEventListener("click", () => {
            this._testManager.LinearDevice.Disconnect();
        });
        const speedHandler = (speed) => {
            document.getElementById("vibrationspeed").innerHTML = (speed * 100).toFixed(1);
            this.vibrateMove(speed);
        };
        this._testManager.VibrationDevice.addListener("vibrate", speedHandler);
        const positionHandler = (linearobj) => {
            document.getElementById("linearposition").innerHTML = (linearobj.position);
            document.getElementById("linearspeed").innerHTML = (linearobj.speed);
            this.launchMove(linearobj.position, linearobj.speed);
        };
        this._testManager.LinearDevice.addListener("linear", positionHandler);
        this.fleshlightElement = document.getElementById("fleshlight-image");
        this.vibratorElement = document.getElementById("vibrator-image");
        // After the node has been created, attach a mutation observer to disconnect
        // events when the panel is closed, otherwise we'll get events going to
        // elements that no longer exist.
        process.nextTick(() => {
            const el = document.getElementById("buttplug-test-device-manager-panel");
            if (!el) {
                return;
            }
            const observer = new MutationObserver((mutations) => {
                if (!document.getElementById("buttplug-test-device-manager-panel")) {
                    this._testManager.VibrationDevice.removeListener("vibrate", speedHandler);
                    this._testManager.LinearDevice.removeListener("linear", positionHandler);
                    observer.disconnect();
                }
            });
            observer.observe(el.parentNode, { childList: true });
        });
    }
    static ShowTestDeviceManagerPanel(buttplugServer) {
        let tdm = null;
        for (const mgr of buttplugServer.DeviceManagers) {
            if (mgr.constructor.name === "TestDeviceManager") {
                tdm = mgr;
                break;
            }
        }
        if (tdm === null) {
            index_1.ButtplugLogger.Logger.Error("TestDeviceManagerPanel: Cannot get test device manager from server.");
            throw new Error("Cannot get test device manager from server.");
        }
        jsPanel.jsPanel.create({
            id: () => "buttplug-test-device-manager-panel",
            theme: "primary",
            headerTitle: "Test Device Manager",
            position: "center-top 0 80",
            contentSize: "400 250",
            callback() {
                this.content.innerHTML = testPanelHTML;
                TestDeviceManagerPanel._panel = new TestDeviceManagerPanel(tdm);
            },
        });
    }
}
exports.TestDeviceManagerPanel = TestDeviceManagerPanel;
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
//# sourceMappingURL=TestDeviceManagerPanel.js.map