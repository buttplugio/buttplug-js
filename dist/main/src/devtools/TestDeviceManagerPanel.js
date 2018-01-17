"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TestDeviceManager_1 = require("./TestDeviceManager");
var TWEEN = require("@tweenjs/tween.js");
var jsPanel = require("./jspanel.js");
require("jspanel4/dist/jspanel.css");
require("jspanel4/dist/fonts/jsglyph.eot");
var testPanelHTML = require("./TestDeviceManagerPanel.html").toString();
require("./TestDeviceManagerPanel.css");
var TestDeviceManagerPanel = /** @class */ (function () {
    function TestDeviceManagerPanel() {
        var _this = this;
        this._testManager = TestDeviceManager_1.TestDeviceManager.Get();
        this.currentLaunchPosition = { x: 0, y: 0 };
        this.lastPosition = 0;
        this.moveRadius = 0;
        this.currentVibratePosition = { x: 0, y: 0 };
        this.launchMove = function (position, speed) {
            var p = -((100 - position) * 0.22);
            var duration = _this.moveDuration(position, speed);
            new TWEEN.Tween(_this.currentLaunchPosition)
                .to({ x: 0, y: p }, duration)
                .start();
            requestAnimationFrame(_this.launchAnimate);
        };
        this.launchAnimate = function (timestamp) {
            if (!TWEEN.update()) {
                return;
            }
            _this.fleshlightElement.style.bottom = _this.currentLaunchPosition.y + "%";
            requestAnimationFrame(_this.launchAnimate);
        };
        // moveDuration returns the time in milliseconds it will take to move
        // to position at speed.
        //
        // position: position in percent (0-100).
        // speed:    speed in percent (20-100).
        this.moveDuration = function (position, speed) {
            var distance = Math.abs(position - _this.lastPosition);
            _this.lastPosition = position;
            return _this.calcDuration(distance, speed);
        };
        // _calcDuration returns duration of a move in milliseconds for a given
        // distance/speed.
        //
        // distance: amount to move percent (0-100).
        // speed: speed to move at in percent (20-100).
        this.calcDuration = function (distance, speed) {
            return Math.pow(speed / 25000, -0.95) / (90 / distance);
        };
        this.vibrateMove = function (speed) {
            _this.moveRadius = speed;
            requestAnimationFrame(_this.vibrateAnimate);
        };
        this.vibrateAnimate = function (timestamp) {
            if (!TWEEN.update()) {
                if (_this.moveRadius !== 0) {
                    new TWEEN.Tween(_this.currentVibratePosition)
                        .to({ x: Math.floor(Math.random() * _this.moveRadius * 20),
                        y: Math.floor(Math.random() * _this.moveRadius * 20) }, 34)
                        .start();
                    requestAnimationFrame(_this.vibrateAnimate);
                }
                return;
            }
            _this.vibratorElement.style.top = _this.currentVibratePosition.x + "px";
            _this.vibratorElement.style.right = _this.currentVibratePosition.y + "px";
            requestAnimationFrame(_this.vibrateAnimate);
        };
        document.getElementById("vibratedisconnect").addEventListener("click", function () {
            _this._testManager.VibrationDevice.Disconnect();
        });
        document.getElementById("lineardisconnect").addEventListener("click", function () {
            _this._testManager.LinearDevice.Disconnect();
        });
        this._testManager.VibrationDevice.addListener("vibrate", function (speed) {
            document.getElementById("vibrationspeed").innerHTML = speed;
            _this.vibrateMove(speed);
        });
        this._testManager.LinearDevice.addListener("linear", function (linearobj) {
            document.getElementById("linearposition").innerHTML = linearobj.position;
            document.getElementById("linearspeed").innerHTML = linearobj.speed;
            _this.launchMove(linearobj.position, linearobj.speed);
        });
        this.fleshlightElement = document.getElementById("fleshlight-image");
        this.vibratorElement = document.getElementById("vibrator-image");
    }
    TestDeviceManagerPanel.ShowTestDeviceManagerPanel = function () {
        jsPanel.jsPanel.create({
            theme: "primary",
            headerTitle: "Test Device Manager",
            position: "center-top 0 80",
            contentSize: "400 250",
            callback: function () {
                this.content.innerHTML = testPanelHTML;
                TestDeviceManagerPanel._panel = new TestDeviceManagerPanel();
            },
        });
    };
    return TestDeviceManagerPanel;
}());
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