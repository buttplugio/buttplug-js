(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["buttplug-devtools-commonjs"] = factory();
	else
		root["ButtplugDevTools"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/devtools/web/index.web.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../index":
/***/ (function(module, exports) {

module.exports = Buttplug;

/***/ }),

/***/ "./node_modules/@tweenjs/tween.js/src/Tween.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */


var _Group = function () {
	this._tweens = {};
	this._tweensAddedDuringUpdate = {};
};

_Group.prototype = {
	getAll: function () {

		return Object.keys(this._tweens).map(function (tweenId) {
			return this._tweens[tweenId];
		}.bind(this));

	},

	removeAll: function () {

		this._tweens = {};

	},

	add: function (tween) {

		this._tweens[tween.getId()] = tween;
		this._tweensAddedDuringUpdate[tween.getId()] = tween;

	},

	remove: function (tween) {

		delete this._tweens[tween.getId()];
		delete this._tweensAddedDuringUpdate[tween.getId()];

	},

	update: function (time, preserve) {

		var tweenIds = Object.keys(this._tweens);

		if (tweenIds.length === 0) {
			return false;
		}

		time = time !== undefined ? time : TWEEN.now();

		// Tweens are updated in "batches". If you add a new tween during an update, then the
		// new tween will be updated in the next batch.
		// If you remove a tween during an update, it may or may not be updated. However,
		// if the removed tween was added during the current batch, then it will not be updated.
		while (tweenIds.length > 0) {
			this._tweensAddedDuringUpdate = {};

			for (var i = 0; i < tweenIds.length; i++) {

				var tween = this._tweens[tweenIds[i]];

				if (tween && tween.update(time) === false) {
					tween._isPlaying = false;

					if (!preserve) {
						delete this._tweens[tweenIds[i]];
					}
				}
			}

			tweenIds = Object.keys(this._tweensAddedDuringUpdate);
		}

		return true;

	}
};

var TWEEN = new _Group();

TWEEN.Group = _Group;
TWEEN._nextId = 0;
TWEEN.nextId = function () {
	return TWEEN._nextId++;
};


// Include a performance.now polyfill.
// In node.js, use process.hrtime.
if (typeof (window) === 'undefined' && typeof (process) !== 'undefined') {
	TWEEN.now = function () {
		var time = process.hrtime();

		// Convert [seconds, nanoseconds] to milliseconds.
		return time[0] * 1000 + time[1] / 1000000;
	};
}
// In a browser, use window.performance.now if it is available.
else if (typeof (window) !== 'undefined' &&
         window.performance !== undefined &&
		 window.performance.now !== undefined) {
	// This must be bound, because directly assigning this function
	// leads to an invocation exception in Chrome.
	TWEEN.now = window.performance.now.bind(window.performance);
}
// Use Date.now if it is available.
else if (Date.now !== undefined) {
	TWEEN.now = Date.now;
}
// Otherwise, use 'new Date().getTime()'.
else {
	TWEEN.now = function () {
		return new Date().getTime();
	};
}


TWEEN.Tween = function (object, group) {
	this._object = object;
	this._valuesStart = {};
	this._valuesEnd = {};
	this._valuesStartRepeat = {};
	this._duration = 1000;
	this._repeat = 0;
	this._repeatDelayTime = undefined;
	this._yoyo = false;
	this._isPlaying = false;
	this._reversed = false;
	this._delayTime = 0;
	this._startTime = null;
	this._easingFunction = TWEEN.Easing.Linear.None;
	this._interpolationFunction = TWEEN.Interpolation.Linear;
	this._chainedTweens = [];
	this._onStartCallback = null;
	this._onStartCallbackFired = false;
	this._onUpdateCallback = null;
	this._onCompleteCallback = null;
	this._onStopCallback = null;
	this._group = group || TWEEN;
	this._id = TWEEN.nextId();

};

TWEEN.Tween.prototype = {
	getId: function getId() {
		return this._id;
	},

	isPlaying: function isPlaying() {
		return this._isPlaying;
	},

	to: function to(properties, duration) {

		this._valuesEnd = properties;

		if (duration !== undefined) {
			this._duration = duration;
		}

		return this;

	},

	start: function start(time) {

		this._group.add(this);

		this._isPlaying = true;

		this._onStartCallbackFired = false;

		this._startTime = time !== undefined ? typeof time === 'string' ? TWEEN.now() + parseFloat(time) : time : TWEEN.now();
		this._startTime += this._delayTime;

		for (var property in this._valuesEnd) {

			// Check if an Array was provided as property value
			if (this._valuesEnd[property] instanceof Array) {

				if (this._valuesEnd[property].length === 0) {
					continue;
				}

				// Create a local copy of the Array with the start value at the front
				this._valuesEnd[property] = [this._object[property]].concat(this._valuesEnd[property]);

			}

			// If `to()` specifies a property that doesn't exist in the source object,
			// we should not set that property in the object
			if (this._object[property] === undefined) {
				continue;
			}

			// Save the starting value.
			this._valuesStart[property] = this._object[property];

			if ((this._valuesStart[property] instanceof Array) === false) {
				this._valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
			}

			this._valuesStartRepeat[property] = this._valuesStart[property] || 0;

		}

		return this;

	},

	stop: function stop() {

		if (!this._isPlaying) {
			return this;
		}

		this._group.remove(this);
		this._isPlaying = false;

		if (this._onStopCallback !== null) {
			this._onStopCallback(this._object);
		}

		this.stopChainedTweens();
		return this;

	},

	end: function end() {

		this.update(this._startTime + this._duration);
		return this;

	},

	stopChainedTweens: function stopChainedTweens() {

		for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
			this._chainedTweens[i].stop();
		}

	},

	group: function group(group) {
		this._group = group;
		return this;
	},

	delay: function delay(amount) {

		this._delayTime = amount;
		return this;

	},

	repeat: function repeat(times) {

		this._repeat = times;
		return this;

	},

	repeatDelay: function repeatDelay(amount) {

		this._repeatDelayTime = amount;
		return this;

	},

	yoyo: function yoyo(yy) {

		this._yoyo = yy;
		return this;

	},

	easing: function easing(eas) {

		this._easingFunction = eas;
		return this;

	},

	interpolation: function interpolation(inter) {

		this._interpolationFunction = inter;
		return this;

	},

	chain: function chain() {

		this._chainedTweens = arguments;
		return this;

	},

	onStart: function onStart(callback) {

		this._onStartCallback = callback;
		return this;

	},

	onUpdate: function onUpdate(callback) {

		this._onUpdateCallback = callback;
		return this;

	},

	onComplete: function onComplete(callback) {

		this._onCompleteCallback = callback;
		return this;

	},

	onStop: function onStop(callback) {

		this._onStopCallback = callback;
		return this;

	},

	update: function update(time) {

		var property;
		var elapsed;
		var value;

		if (time < this._startTime) {
			return true;
		}

		if (this._onStartCallbackFired === false) {

			if (this._onStartCallback !== null) {
				this._onStartCallback(this._object);
			}

			this._onStartCallbackFired = true;
		}

		elapsed = (time - this._startTime) / this._duration;
		elapsed = (this._duration === 0 || elapsed > 1) ? 1 : elapsed;

		value = this._easingFunction(elapsed);

		for (property in this._valuesEnd) {

			// Don't update properties that do not exist in the source object
			if (this._valuesStart[property] === undefined) {
				continue;
			}

			var start = this._valuesStart[property] || 0;
			var end = this._valuesEnd[property];

			if (end instanceof Array) {

				this._object[property] = this._interpolationFunction(end, value);

			} else {

				// Parses relative end values with start as base (e.g.: +10, -3)
				if (typeof (end) === 'string') {

					if (end.charAt(0) === '+' || end.charAt(0) === '-') {
						end = start + parseFloat(end);
					} else {
						end = parseFloat(end);
					}
				}

				// Protect against non numeric properties.
				if (typeof (end) === 'number') {
					this._object[property] = start + (end - start) * value;
				}

			}

		}

		if (this._onUpdateCallback !== null) {
			this._onUpdateCallback(this._object);
		}

		if (elapsed === 1) {

			if (this._repeat > 0) {

				if (isFinite(this._repeat)) {
					this._repeat--;
				}

				// Reassign starting values, restart by making startTime = now
				for (property in this._valuesStartRepeat) {

					if (typeof (this._valuesEnd[property]) === 'string') {
						this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
					}

					if (this._yoyo) {
						var tmp = this._valuesStartRepeat[property];

						this._valuesStartRepeat[property] = this._valuesEnd[property];
						this._valuesEnd[property] = tmp;
					}

					this._valuesStart[property] = this._valuesStartRepeat[property];

				}

				if (this._yoyo) {
					this._reversed = !this._reversed;
				}

				if (this._repeatDelayTime !== undefined) {
					this._startTime = time + this._repeatDelayTime;
				} else {
					this._startTime = time + this._delayTime;
				}

				return true;

			} else {

				if (this._onCompleteCallback !== null) {

					this._onCompleteCallback(this._object);
				}

				for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
					// Make the chained tweens start exactly at the time they should,
					// even if the `update()` method was called way past the duration of the tween
					this._chainedTweens[i].start(this._startTime + this._duration);
				}

				return false;

			}

		}

		return true;

	}
};


TWEEN.Easing = {

	Linear: {

		None: function (k) {

			return k;

		}

	},

	Quadratic: {

		In: function (k) {

			return k * k;

		},

		Out: function (k) {

			return k * (2 - k);

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k;
			}

			return - 0.5 * (--k * (k - 2) - 1);

		}

	},

	Cubic: {

		In: function (k) {

			return k * k * k;

		},

		Out: function (k) {

			return --k * k * k + 1;

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k;
			}

			return 0.5 * ((k -= 2) * k * k + 2);

		}

	},

	Quartic: {

		In: function (k) {

			return k * k * k * k;

		},

		Out: function (k) {

			return 1 - (--k * k * k * k);

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k;
			}

			return - 0.5 * ((k -= 2) * k * k * k - 2);

		}

	},

	Quintic: {

		In: function (k) {

			return k * k * k * k * k;

		},

		Out: function (k) {

			return --k * k * k * k * k + 1;

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k * k;
			}

			return 0.5 * ((k -= 2) * k * k * k * k + 2);

		}

	},

	Sinusoidal: {

		In: function (k) {

			return 1 - Math.cos(k * Math.PI / 2);

		},

		Out: function (k) {

			return Math.sin(k * Math.PI / 2);

		},

		InOut: function (k) {

			return 0.5 * (1 - Math.cos(Math.PI * k));

		}

	},

	Exponential: {

		In: function (k) {

			return k === 0 ? 0 : Math.pow(1024, k - 1);

		},

		Out: function (k) {

			return k === 1 ? 1 : 1 - Math.pow(2, - 10 * k);

		},

		InOut: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			if ((k *= 2) < 1) {
				return 0.5 * Math.pow(1024, k - 1);
			}

			return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);

		}

	},

	Circular: {

		In: function (k) {

			return 1 - Math.sqrt(1 - k * k);

		},

		Out: function (k) {

			return Math.sqrt(1 - (--k * k));

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return - 0.5 * (Math.sqrt(1 - k * k) - 1);
			}

			return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);

		}

	},

	Elastic: {

		In: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);

		},

		Out: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;

		},

		InOut: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			k *= 2;

			if (k < 1) {
				return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
			}

			return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;

		}

	},

	Back: {

		In: function (k) {

			var s = 1.70158;

			return k * k * ((s + 1) * k - s);

		},

		Out: function (k) {

			var s = 1.70158;

			return --k * k * ((s + 1) * k + s) + 1;

		},

		InOut: function (k) {

			var s = 1.70158 * 1.525;

			if ((k *= 2) < 1) {
				return 0.5 * (k * k * ((s + 1) * k - s));
			}

			return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);

		}

	},

	Bounce: {

		In: function (k) {

			return 1 - TWEEN.Easing.Bounce.Out(1 - k);

		},

		Out: function (k) {

			if (k < (1 / 2.75)) {
				return 7.5625 * k * k;
			} else if (k < (2 / 2.75)) {
				return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
			} else if (k < (2.5 / 2.75)) {
				return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
			} else {
				return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
			}

		},

		InOut: function (k) {

			if (k < 0.5) {
				return TWEEN.Easing.Bounce.In(k * 2) * 0.5;
			}

			return TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;

		}

	}

};

TWEEN.Interpolation = {

	Linear: function (v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = TWEEN.Interpolation.Utils.Linear;

		if (k < 0) {
			return fn(v[0], v[1], f);
		}

		if (k > 1) {
			return fn(v[m], v[m - 1], m - f);
		}

		return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);

	},

	Bezier: function (v, k) {

		var b = 0;
		var n = v.length - 1;
		var pw = Math.pow;
		var bn = TWEEN.Interpolation.Utils.Bernstein;

		for (var i = 0; i <= n; i++) {
			b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
		}

		return b;

	},

	CatmullRom: function (v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = TWEEN.Interpolation.Utils.CatmullRom;

		if (v[0] === v[m]) {

			if (k < 0) {
				i = Math.floor(f = m * (1 + k));
			}

			return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);

		} else {

			if (k < 0) {
				return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
			}

			if (k > 1) {
				return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
			}

			return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);

		}

	},

	Utils: {

		Linear: function (p0, p1, t) {

			return (p1 - p0) * t + p0;

		},

		Bernstein: function (n, i) {

			var fc = TWEEN.Interpolation.Utils.Factorial;

			return fc(n) / fc(i) / fc(n - i);

		},

		Factorial: (function () {

			var a = [1];

			return function (n) {

				var s = 1;

				if (a[n]) {
					return a[n];
				}

				for (var i = n; i > 1; i--) {
					s *= i;
				}

				a[n] = s;
				return s;

			};

		})(),

		CatmullRom: function (p0, p1, p2, p3, t) {

			var v0 = (p2 - p0) * 0.5;
			var v1 = (p3 - p1) * 0.5;
			var t2 = t * t;
			var t3 = t * t2;

			return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (- 3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;

		}

	}

};

// UMD (Universal Module Definition)
(function (root) {

	if (true) {

		// AMD
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return TWEEN;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	} else {}

})(this);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/jspanel4/dist/jspanel.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* jspanel.sass: 2018-04-18 20:24 */\n/* http://stackoverflow.com/questions/30421570/sass-unicode-escape-is-not-preserved-in-css-file */\n.jsPanel {\n  border: 0;\n  box-sizing: border-box;\n  vertical-align: baseline;\n  font-family: \"Open Sans\",\"Helvetica Neue\",Helvetica,Arial,sans-serif;\n  font-weight: normal;\n  display: flex;\n  flex-direction: column;\n  opacity: 0;\n  overflow: visible;\n  position: absolute;\n  top: 0;\n  z-index: 100; }\n  .jsPanel .jsPanel-hdr {\n    border: 0;\n    box-sizing: border-box;\n    vertical-align: baseline;\n    font-family: \"Open Sans\",\"Helvetica Neue\",Helvetica,Arial,sans-serif;\n    font-weight: normal;\n    font-size: 1rem;\n    display: flex;\n    flex-direction: column;\n    flex-shrink: 0; }\n  .jsPanel .jsPanel-content {\n    border: 0;\n    box-sizing: border-box;\n    vertical-align: baseline;\n    font-family: \"Open Sans\",\"Helvetica Neue\",Helvetica,Arial,sans-serif;\n    font-weight: normal;\n    background: #ffffff;\n    color: #000000;\n    font-size: 1rem;\n    position: relative;\n    overflow-x: hidden;\n    overflow-y: auto; }\n    .jsPanel .jsPanel-content pre {\n      color: inherit; }\n  .jsPanel .jsPanel-ftr {\n    flex-direction: row;\n    justify-content: flex-end;\n    flex-wrap: nowrap;\n    align-items: center;\n    border-top: 1px solid #e0e0e0;\n    display: none;\n    box-sizing: border-box;\n    font-size: 1rem;\n    height: auto;\n    background: #f5f5f5;\n    font-weight: normal;\n    color: black;\n    overflow: hidden; }\n  .jsPanel .jsPanel-ftr.active {\n    display: flex; }\n    .jsPanel .jsPanel-ftr.active > * {\n      margin: 3px 8px; }\n  .jsPanel .jsPanel-ftr.panel-footer {\n    padding: 0; }\n\n.jsPanel-headerbar, .jsPanel-hdr-toolbar {\n  font-size: 1rem; }\n\n.jsPanel-headerbar {\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  align-items: center; }\n  .jsPanel-headerbar img {\n    vertical-align: middle;\n    max-height: 38px; }\n\n.jsPanel-titlebar {\n  display: flex;\n  align-items: center;\n  flex-grow: 1;\n  cursor: move;\n  height: 100%;\n  overflow: hidden; }\n  .jsPanel-titlebar .jsPanel-title {\n    color: #000000;\n    font-family: \"Open Sans\",\"Helvetica Neue\",Helvetica,Arial,sans-serif;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-size: 1rem;\n    font-variant: small-caps;\n    font-weight: normal;\n    margin: 0 5px 0 8px;\n    min-width: 0; }\n    .jsPanel-titlebar .jsPanel-title small {\n      font-size: 75%;\n      color: inherit; }\n\n.jsPanel-titlebar.jsPanel-rtl {\n  flex-direction: row-reverse; }\n\n.jsPanel-controlbar {\n  display: flex;\n  align-items: center;\n  touch-action: none; }\n  .jsPanel-controlbar div span:hover, .jsPanel-controlbar div svg:hover {\n    opacity: .6; }\n  .jsPanel-controlbar .jsPanel-btn {\n    cursor: pointer;\n    touch-action: none; }\n    .jsPanel-controlbar .jsPanel-btn span {\n      vertical-align: middle;\n      padding: 0 4px 0 2px; }\n    .jsPanel-controlbar .jsPanel-btn span.glyphicon {\n      padding: 0 2px; }\n    .jsPanel-controlbar .jsPanel-btn svg {\n      margin: 0 8px 0 3px; }\n    .jsPanel-controlbar .jsPanel-btn .jsPanel-icon {\n      padding-top: 9px;\n      margin: 0 4px 0 0; }\n  .jsPanel-controlbar .jsPanel-btn-normalize, .jsPanel-controlbar .jsPanel-btn-smallifyrev {\n    display: none; }\n\n.jsPanel-hdr-toolbar {\n  display: none;\n  width: auto;\n  height: auto;\n  font-size: 1rem; }\n\n.jsPanel-hdr-toolbar.active {\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  align-items: center; }\n  .jsPanel-hdr-toolbar.active > * {\n    margin: 3px 8px; }\n\n/* styles for panels using option.rtl */\n.jsPanel-headerbar.jsPanel-rtl, .jsPanel-controlbar.jsPanel-rtl, .jsPanel-hdr-toolbar.jsPanel-rtl {\n  flex-direction: row-reverse; }\n\n.jsPanel-hdr-toolbar.active.jsPanel-rtl {\n  padding: 7px 0 10px 0; }\n\n.jsPanel-ftr.jsPanel-rtl {\n  flex-direction: row; }\n\n/* container that takes the minified jsPanels */\n#jsPanel-replacement-container, .jsPanel-minimized-box, .jsPanel-minimized-container {\n  display: flex;\n  flex-flow: row wrap-reverse;\n  background: transparent none repeat scroll 0 0;\n  bottom: 0;\n  height: auto;\n  left: 0;\n  position: fixed;\n  width: auto;\n  z-index: 9998; }\n  #jsPanel-replacement-container .jsPanel-replacement, .jsPanel-minimized-box .jsPanel-replacement, .jsPanel-minimized-container .jsPanel-replacement {\n    display: flex;\n    align-items: center;\n    width: 200px;\n    height: 40px;\n    margin: 1px 1px 0 0;\n    z-index: 9999; }\n    #jsPanel-replacement-container .jsPanel-replacement .jsPanel-hdr, .jsPanel-minimized-box .jsPanel-replacement .jsPanel-hdr, .jsPanel-minimized-container .jsPanel-replacement .jsPanel-hdr {\n      flex-grow: 1;\n      min-width: 0;\n      padding: 0; }\n      #jsPanel-replacement-container .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo, .jsPanel-minimized-box .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo, .jsPanel-minimized-container .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo {\n        max-width: 50%;\n        overflow: hidden; }\n        #jsPanel-replacement-container .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo img, .jsPanel-minimized-box .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo img, .jsPanel-minimized-container .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo img {\n          max-width: 100px;\n          max-height: 38px; }\n    #jsPanel-replacement-container .jsPanel-replacement .jsPanel-titlebar, .jsPanel-minimized-box .jsPanel-replacement .jsPanel-titlebar, .jsPanel-minimized-container .jsPanel-replacement .jsPanel-titlebar {\n      cursor: default;\n      min-width: 0; }\n    #jsPanel-replacement-container .jsPanel-replacement .jsPanel-btn.jsPanel-btn-normalize, .jsPanel-minimized-box .jsPanel-replacement .jsPanel-btn.jsPanel-btn-normalize, .jsPanel-minimized-container .jsPanel-replacement .jsPanel-btn.jsPanel-btn-normalize {\n      display: block; }\n\n.jsPanel-minimized-box, .jsPanel-minimized-container {\n  position: absolute;\n  width: 100%;\n  overflow: hidden; }\n\n/* helper classes to make .jsPanel-content a flex box */\n.flexOne {\n  display: flex;\n  flex-flow: row wrap; }\n\n/* css for resizeit handles ------------------------- */\n.jsPanel-resizeit-handle {\n  display: block;\n  font-size: 0.1px;\n  position: absolute;\n  touch-action: none; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-n {\n  cursor: n-resize;\n  height: 12px;\n  left: 9px;\n  top: -5px;\n  width: calc(100% - 18px); }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-e {\n  cursor: e-resize;\n  height: calc(100% - 18px);\n  right: -9px;\n  top: 9px;\n  width: 12px; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-s {\n  bottom: -9px;\n  cursor: s-resize;\n  height: 12px;\n  left: 9px;\n  width: calc(100% - 18px); }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-w {\n  cursor: w-resize;\n  height: calc(100% - 18px);\n  left: -9px;\n  top: 9px;\n  width: 12px; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-ne {\n  cursor: ne-resize;\n  height: 18px;\n  right: -9px;\n  top: -9px;\n  width: 18px; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-se {\n  bottom: -9px;\n  cursor: se-resize;\n  height: 18px;\n  right: -9px;\n  width: 18px; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-sw {\n  bottom: -9px;\n  cursor: sw-resize;\n  height: 18px;\n  left: -9px;\n  width: 18px; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-nw {\n  cursor: nw-resize;\n  height: 18px;\n  left: -9px;\n  top: -9px;\n  width: 18px; }\n\n.jsPanel-drag-overlay {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0; }\n\n/* box-shadows --------------------------------------------------------------------- */\n.jsPanel-depth-1 {\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); }\n\n.jsPanel-depth-2 {\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23); }\n\n.jsPanel-depth-3 {\n  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22); }\n\n.jsPanel-depth-4 {\n  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22); }\n\n.jsPanel-depth-5 {\n  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.3), 0 20px 14px rgba(0, 0, 0, 0.22); }\n\n/* snap sensitive areas ------------------------------------------------------------------------------ */\n.jsPanel-snap-area {\n  position: fixed;\n  background: black;\n  opacity: .2;\n  border: 1px solid silver;\n  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.5), 0 10px 10px rgba(0, 0, 0, 0.5);\n  z-index: 9999; }\n\n.jsPanel-snap-area-lt, .jsPanel-snap-area-lc, .jsPanel-snap-area-lb {\n  left: 0; }\n\n.jsPanel-snap-area-ct, .jsPanel-snap-area-cb {\n  left: 37.5%; }\n\n.jsPanel-snap-area-rt, .jsPanel-snap-area-rc, .jsPanel-snap-area-rb {\n  right: 0; }\n\n.jsPanel-snap-area-lt, .jsPanel-snap-area-ct, .jsPanel-snap-area-rt {\n  top: 0; }\n\n.jsPanel-snap-area-lc, .jsPanel-snap-area-rc {\n  top: 37.5%; }\n\n.jsPanel-snap-area-lb, .jsPanel-snap-area-cb, .jsPanel-snap-area-rb {\n  bottom: 0; }\n\n.jsPanel-snap-area-ct, .jsPanel-snap-area-cb {\n  width: 25%; }\n\n.jsPanel-snap-area-lc, .jsPanel-snap-area-rc {\n  height: 25%; }\n\n.jsPanel-snap-area-lt {\n  border-bottom-right-radius: 100%; }\n\n.jsPanel-snap-area-rt {\n  border-bottom-left-radius: 100%; }\n\n.jsPanel-snap-area-rb {\n  border-top-left-radius: 100%; }\n\n.jsPanel-snap-area-lb {\n  border-top-right-radius: 100%; }\n\n/* tooltip and tooltip connectors */\n.jsPanel-connector-left-top, .jsPanel-connector-right-top, .jsPanel-connector-left-bottom, .jsPanel-connector-right-bottom {\n  width: 12px;\n  height: 12px;\n  position: absolute;\n  border-radius: 50%; }\n\n.jsPanel-connector-left, .jsPanel-connector-top, .jsPanel-connector-bottom, .jsPanel-connector-right {\n  width: 0;\n  height: 0;\n  position: absolute;\n  border: 12px solid transparent; }\n\n.jsPanel-connector-left-top {\n  left: calc(100% - 6px);\n  top: calc(100% - 6px); }\n\n.jsPanel-connector-right-top {\n  left: -6px;\n  top: calc(100% - 6px); }\n\n.jsPanel-connector-right-bottom {\n  left: -6px;\n  top: -6px; }\n\n.jsPanel-connector-left-bottom {\n  left: calc(100% - 6px);\n  top: -6px; }\n\n.jsPanel-connector-top {\n  left: calc(50% - 12px);\n  top: 100%; }\n\n.jsPanel-connector-right {\n  left: -24px;\n  top: calc(50% - 12px); }\n\n.jsPanel-connector-bottom {\n  left: calc(50% - 12px);\n  top: -24px; }\n\n.jsPanel-connector-left {\n  left: 100%;\n  top: calc(50% - 12px); }\n\n/* IE11 CSS styles go here */\n@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n  #jsPanel-replacement-container .jsPanel-replacement .jsPanel-titlebar {\n    max-width: 105px; } }\n\n/* XXXXXXXXXXXXXXXXXXXXXXX */\n/* bootstrap adjustments */\n.jsPanel.panel-default, .jsPanel.panel-primary, .jsPanel.panel-info, .jsPanel.panel-success, .jsPanel.panel-warning, .jsPanel.panel-danger, .jsPanel.card.card-inverse {\n  box-shadow: 0 0 6px rgba(0, 33, 50, 0.1), 0 7px 25px rgba(17, 38, 60, 0.4); }\n\n.jsPanel.panel {\n  margin: 0; }\n\n.jsPanel-hdr.panel-heading {\n  border-bottom: none;\n  padding: 0; }\n\n.jsPanel-title.panel-title .small, .jsPanel-title.panel-title small {\n  font-size: 75%; }\n\n/* bootstrap 4 adjustments */\n.jsPanel.card.card-inverse {\n  box-shadow: 0 0 6px rgba(0, 33, 50, 0.1), 0 7px 25px rgba(17, 38, 60, 0.4); }\n\n.card-default {\n  background: #f5f5f5; }\n\n.card-primary > .jsPanel-content.jsPanel-content-filled,\n.card-success > .jsPanel-content.jsPanel-content-filled,\n.card-info > .jsPanel-content.jsPanel-content-filled,\n.card-warning > .jsPanel-content.jsPanel-content-filled,\n.card-danger > .jsPanel-content.jsPanel-content-filled {\n  background: transparent;\n  color: #f5f5f5; }\n\n.card-default > .jsPanel-content.jsPanel-content-filled {\n  background: transparent;\n  color: #000000; }\n\n/* css3 animations */\n@keyframes jsPanelFadeIn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.jsPanelFadeIn {\n  opacity: 0;\n  animation: jsPanelFadeIn ease-in 1;\n  animation-fill-mode: forwards;\n  animation-duration: 600ms; }\n\n@keyframes jsPanelFadeOut {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0; } }\n\n.jsPanelFadeOut {\n  animation: jsPanelFadeOut ease-in 1;\n  animation-fill-mode: forwards;\n  animation-duration: 600ms; }\n\n@keyframes modalBackdropFadeIn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 0.65; } }\n\n.jsPanel-modal-backdrop {\n  animation: modalBackdropFadeIn ease-in 1;\n  animation-fill-mode: forwards;\n  animation-duration: 750ms;\n  background: black;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%; }\n\n@keyframes modalBackdropFadeOut {\n  from {\n    opacity: 0.65; }\n  to {\n    opacity: 0; } }\n\n.jsPanel-modal-backdrop-out {\n  animation: modalBackdropFadeOut ease-in 1;\n  animation-fill-mode: forwards;\n  animation-duration: 400ms; }\n\n.jsPanel-modal-backdrop-multi {\n  background: rgba(0, 0, 0, 0.15); }\n\n.jsPanel-content .jsPanel-iframe-overlay {\n  position: absolute;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background: transparent; }\n\n/* _themes_mdl.sass: 2017-07-12 19:16 */\n/* default ---------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-default {\n  background-color: #cfd8dc;\n  border-color: #cfd8dc; }\n\n.jsPanel-theme-default > .jsPanel-hdr * {\n  color: #000000; }\n\n.jsPanel-theme-default > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #90a4ae; }\n\n.jsPanel-theme-default > .jsPanel-content {\n  border-top: 1px solid #90a4ae; }\n\n.jsPanel-theme-default > .jsPanel-content.jsPanel-content-filled {\n  background-color: #cfd8dc;\n  border-top: 1px solid #90a4ae; }\n\n.jsPanel-theme-default > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #eceff1; }\n\n/* primary ---------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-primary {\n  background-color: #2196f3;\n  border-color: #2196f3; }\n\n.jsPanel-theme-primary > .jsPanel-hdr * {\n  color: #ffffff; }\n\n.jsPanel-theme-primary > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #42a5f5; }\n\n.jsPanel-theme-primary > .jsPanel-content {\n  border-top: 1px solid #42a5f5; }\n\n.jsPanel-theme-primary > .jsPanel-content.jsPanel-content-filled {\n  background-color: #2196f3;\n  border-top: 1px solid #42a5f5;\n  color: #ffffff; }\n\n.jsPanel-theme-primary > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #bbdefb;\n  color: #000000; }\n\n/* info ------------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-info {\n  background-color: #29b6f6;\n  border-color: #29b6f6; }\n\n.jsPanel-theme-info > .jsPanel-hdr * {\n  color: #ffffff; }\n\n.jsPanel-theme-info > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #4fc3f7; }\n\n.jsPanel-theme-info > .jsPanel-content {\n  border-top: 1px solid #4fc3f7; }\n\n.jsPanel-theme-info > .jsPanel-content.jsPanel-content-filled {\n  background-color: #29b6f6;\n  border-top: 1px solid #4fc3f7;\n  color: #ffffff; }\n\n.jsPanel-theme-info > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #e1f5fe;\n  color: #000000; }\n\n/* success ---------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-success {\n  background-color: #4caf50;\n  border-color: #4caf50; }\n\n.jsPanel-theme-success > .jsPanel-hdr * {\n  color: #ffffff; }\n\n.jsPanel-theme-success > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #81c784; }\n\n.jsPanel-theme-success > .jsPanel-content.jsPanel-content-filled {\n  background-color: #4caf50;\n  border-top: 1px solid #81c784;\n  color: #ffffff; }\n\n.jsPanel-theme-success > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #e8f5e9;\n  color: #000000; }\n\n/* warning ---------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-warning {\n  background-color: #ffc107;\n  border-color: #ffc107; }\n\n.jsPanel-theme-warning > .jsPanel-hdr * {\n  color: #000000; }\n\n.jsPanel-theme-warning > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #ffd54f; }\n\n.jsPanel-theme-warning > .jsPanel-content.jsPanel-content-filled {\n  background-color: #ffc107;\n  border-top: 1px solid #ffd54f;\n  color: #000000; }\n\n.jsPanel-theme-warning > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #fff3e0;\n  color: #000000; }\n\n/* danger ----------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-danger {\n  background-color: #ff3d00;\n  border-color: #ff3d00; }\n\n.jsPanel-theme-danger > .jsPanel-hdr * {\n  color: #ffffff; }\n\n.jsPanel-theme-danger > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #ff6e40; }\n\n.jsPanel-theme-danger > .jsPanel-content.jsPanel-content-filled {\n  background-color: #ff3d00;\n  border-top: 1px solid #ff6e40;\n  color: #ffffff; }\n\n.jsPanel-theme-danger > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #ff9e80;\n  color: #000000; }\n\n.jsPanel-content.jsPanel-content-noheader {\n  border: none !important; }\n\nbody {\n  -ms-overflow-style: scrollbar; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/devtools/web/LogPanel.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#buttplugdevtoolslogpanel {\n    display:flex;\n    flex-direction:column;\n    width:100%;\n    height:100%;\n    align-items:center;\n    color: #000;\n}\n\n#buttplugdevtoolslogpanel input,select,textarea {\n    color: #000;\n    background: #fff;\n}\n\n#buttplugdevtoolslogpanel #buttplugdevtoolslogtextarea {\n    font-size: 8pt;\n    width:100%;\n    flex:1 1;\n    padding:5px;\n    box-sizing:border-box;\n}\n#buttplugdevtoolslogpanel #buttplugdevtoolsloglevel {\n    width:98%;\n    flex:none;\n    padding:5px;\n    box-sizing:border-box;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/devtools/web/TestDeviceManagerPanel.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "main {\n    width:100%;\n    height: 100%;\n}\n\nsection {\n    display: none;\n    padding: 20px;\n    border-top: 1px solid #ddd;\n}\n\ninput {\n    display: none;\n}\n\nlabel {\n    display: inline-block;\n    margin: 0 0 -1px;\n    padding: 5px 10px;\n    font-weight: 600;\n    text-align: center;\n    color: #bbb;\n    border: 1px solid transparent;\n}\n\nlabel:before {\n    font-family: fontawesome;\n    font-weight: normal;\n    margin-right: 10px;\n}\n\nlabel:hover {\n    color: #888;\n    cursor: pointer;\n}\n\ninput:checked + label {\n    color: #555;\n    border: 1px solid #ddd;\n    border-top: 2px solid orange;\n    border-bottom: 1px solid #fff;\n}\n\n#tab1:checked ~ #content1,\n#tab2:checked ~ #content2,\n#tab3:checked ~ #content3,\n#tab4:checked ~ #content4 {\n    display: block;\n}\n\n#content1 {\n    height: 100%;\n}\n\n#content2 {\n    height: 100%;\n}\n\n#simulator {\n    display: flex;\n    width: 100%;\n    height: calc(100% - 60px);\n    flex-direction: row;\n}\n\n.fleshlight-sim {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n    height: 100%;\n    align-items: center;\n    justify-content: center;\n}\n\ndiv.c-fleshlight {\n    display: flex;\n    flex: 1;\n}\n\ndiv.c-fleshlight img {\n    height: 100%;\n    width: auto;\n\t  image-rendering: -moz-crisp-edges;\n\t  image-rendering: -o-crisp-edges;\n\t  image-rendering: -webkit-optimize-contrast;\n\t  image-rendering: pixelated;\n}\n\ndiv.c-fleshlight .o-fleshlight {\n    position: relative;\n    height: 77%;\n}\n\n.vibrator-simulator-component {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n    height: 100%;\n    align-items: center;\n    justify-content: center;\n}\n\ndiv.vibrator {\n    flex: 1 1;\n    align-items: center;\n}\n\ndiv.vibrator-simulator-component img {\n    height: calc(100% - 40px);\n    width: auto;\n    position: relative;\n    image-rendering: -moz-crisp-edges;\n\t  image-rendering: -o-crisp-edges;\n\t  image-rendering: -webkit-optimize-contrast;\n\t  image-rendering: pixelated;\n}\n\ndiv.vibrator-info {\n    flex: 0;\n}\n\n.simulator-divider {\n    border-left: 1px #000 dashed;\n    height: 100%;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/events/events.js":
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),

/***/ "./node_modules/jspanel4/dist/jspanel.css":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/jspanel4/dist/jspanel.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/jspanel4/es6module/jspanel.min.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsPanel", function() { return jsPanel; });
var _typeof2="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof="function"==typeof Symbol&&"symbol"===_typeof2(Symbol.iterator)?function(e){return"undefined"==typeof e?"undefined":_typeof2(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":"undefined"==typeof e?"undefined":_typeof2(e)};function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var jsPanel={version:"4.0.0-beta.5.1",date:"2018-04-19 23:21",ajaxAlwaysCallbacks:[],autopositionSpacing:4,closeOnEscape:function(){document.addEventListener("keydown",function(t){("Escape"===t.key||"Esc"===t.code||27===t.keyCode)&&jsPanel.getPanels(function(){return this.classList.contains("jsPanel")}).some(function(e){return!!e.options.closeOnEscape&&(e.close(),!0)})},!1)}(),defaults:{boxShadow:3,container:document.body,contentSize:{width:"400px",height:"200px"},dragit:{cursor:"move",handles:".jsPanel-headerlogo, .jsPanel-titlebar, .jsPanel-ftr",opacity:.8,disableOnMaximized:!0},header:!0,headerTitle:"jsPanel",headerControls:"all",iconfont:!1,maximizedMargin:0,minimizeTo:"default",paneltype:"standard",position:"center",resizeit:{handles:"n, e, s, w, ne, se, sw, nw",minWidth:40,minHeight:40},theme:"default"},defaultSnapConfig:{sensitivity:70,trigger:"panel"},error:function(){window.jsPanelError||(window.jsPanelError=function(e){this.name="jsPanelError",this.message=e||"",this.stack=new Error().stack},jsPanelError.prototype=Object.create(Error.prototype),jsPanelError.prototype.constructor=jsPanelError)}(),extensions:{},globalCallbacks:!1,icons:{close:"<svg class=\"jsPanel-icon\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"32\" viewBox=\"0 0 28 32\"><path fill=\"currentColor\" d=\"M17.75 16l9.85-9.85c0.5-0.5 0.5-1.3 0-1.75-0.5-0.5-1.3-0.5-1.75 0l-9.85 9.85-9.85-9.9c-0.5-0.5-1.3-0.5-1.75 0-0.5 0.5-0.5 1.3 0 1.75l9.85 9.9-9.9 9.85c-0.5 0.5-0.5 1.3 0 1.75 0.25 0.25 0.55 0.35 0.9 0.35s0.65-0.1 0.9-0.35l9.85-9.85 9.85 9.85c0.25 0.25 0.55 0.35 0.9 0.35s0.65-0.1 0.9-0.35c0.5-0.5 0.5-1.3 0-1.75l-9.9-9.85z\"></path></svg>",maximize:"<svg class=\"jsPanel-icon\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"32\" viewBox=\"0 0 28 32\"><path fill=\"currentColor\" d=\"M27.55 3.9h-22.6c-0.55 0-1 0.45-1 1v22.3c0 0.55 0.45 1 1 1h22.55c0.55 0 1-0.45 1-1v-22.3c0.050-0.55-0.4-1-0.95-1zM5.95 26.15v-18h20.55v18h-20.55z\"></path></svg>",normalize:"<svg class=\"jsPanel-icon\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"32\" viewBox=\"0 0 28 32\"><path fill=\"currentColor\" d=\"M27.9 3.75h-18.8c-0.4 0-0.75 0.35-0.75 0.75v4.3c0 0.1 0 0.2 0.050 0.3h-4.2c-0.55 0-1 0.45-1 1v17.4c0 0.55 0.45 1 1 1h17.65c0.55 0 1-0.45 1-1v-3.7c0.050 0 0.1 0.050 0.2 0.050h4.9c0.4 0 0.75-0.35 0.75-0.75v-18.6c-0.050-0.4-0.4-0.75-0.8-0.75zM5.2 26.5v-12.95c0.050 0 0.1 0 0.15 0h15.4c0.050 0 0.1 0 0.15 0v12.95h-15.7zM27.15 22.35h-4.15c-0.050 0-0.15 0-0.2 0.050v-12.3c0-0.55-0.45-1-1-1h-12c0.050-0.1 0.050-0.2 0.050-0.3v-3.55h17.3v17.1z\"></path></svg>",minimize:"<svg class=\"jsPanel-icon\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"32\" viewBox=\"0 0 28 32\"><path fill=\"currentColor\" d=\"M27.3 28.5h-22.6c-0.85 0-1.5-0.65-1.5-1.5s0.65-1.5 1.5-1.5h22.55c0.85 0 1.5 0.65 1.5 1.5s-0.65 1.5-1.45 1.5z\"></path></svg>",smallifyrev:"<svg class=\"jsPanel-icon\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"32\" viewBox=\"0 0 28 32\"><path fill=\"currentColor\" d=\"M15.95 23.2c0 0 0 0 0 0-0.35 0-0.65-0.15-0.9-0.35l-11.7-11.9c-0.5-0.5-0.5-1.3 0-1.75 0.5-0.5 1.3-0.5 1.75 0l10.85 10.95 10.9-10.8c0.5-0.5 1.3-0.5 1.75 0s0.5 1.3 0 1.75l-11.75 11.7c-0.25 0.25-0.55 0.4-0.9 0.4z\"></path></svg>",smallify:"<svg class=\"jsPanel-icon\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"32\" viewBox=\"0 0 28 32\"><path fill=\"currentColor\" d=\"M28.65 20.85l-11.8-11.65c-0.5-0.5-1.3-0.5-1.75 0l-11.75 11.85c-0.5 0.5-0.5 1.3 0 1.75 0.25 0.25 0.55 0.35 0.9 0.35 0.3 0 0.65-0.1 0.9-0.35l10.85-10.95 10.9 10.8c0.5 0.5 1.3 0.5 1.75 0 0.5-0.5 0.5-1.3 0-1.8z\"></path></svg>"},idCounter:0,isIE:function(){return navigator.appVersion.match(/Trident/)}(),mdbthemes:["secondary","elegant","stylish","unique","special"],pointerdown:"ontouchend"in window?["touchstart","mousedown"]:["mousedown"],pointermove:"ontouchend"in window?["touchmove","mousemove"]:["mousemove"],pointerup:"ontouchend"in window?["touchend","mouseup"]:["mouseup"],polyfills:function(){var e=String.prototype;(function(e){e.forEach(function(e){e.append=e.append||function(){var e=Array.prototype.slice.call(arguments),t=document.createDocumentFragment();e.forEach(function(e){var n=e instanceof Node;t.appendChild(n?e:document.createTextNode(e+""))}),this.appendChild(t)}})})([Element.prototype,Document.prototype,DocumentFragment.prototype]),window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(e){var t,n=(this.document||this.ownerDocument).querySelectorAll(e),a=this;do for(t=n.length;0<=--t&&n.item(t)!==a;);while(0>t&&(a=a.parentElement));return a}),window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=function(e,t){t=t||window;for(var n=0;n<this.length;n++)e.call(t,this[n],n,this)}),Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:function(e){if(e===void 0||null===e)throw new TypeError("Cannot convert first argument to object");for(var t,n=Object(e),a=1;a<arguments.length;a++)if(t=arguments[a],void 0!==t&&null!==t){t=Object(t);for(var o=Object.keys(Object(t)),i=0,l=o.length;i<l;i++){var s=o[i],r=Object.getOwnPropertyDescriptor(t,s);void 0!==r&&r.enumerable&&(n[s]=t[s])}}return n}}),function(){function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}return"function"!=typeof window.CustomEvent&&void(e.prototype=window.Event.prototype,window.CustomEvent=e)}(),e.endsWith||(e.endsWith=function(e,t){return t<this.length?t|=0:t=this.length,this.substr(t-e.length,e.length)===e}),e.startsWith||(e.startsWith=function(e,t){return this.substr(t||0,e.length)===e})}(),themes:["default","primary","info","success","warning","danger"],ziBase:100,ajax:function(obj,ajaxConfig){var objIsPanel;"object"===("undefined"==typeof obj?"undefined":_typeof(obj))&&obj.classList.contains("jsPanel")?objIsPanel=!0:(objIsPanel=!1,"string"==typeof obj&&(obj=document.querySelector(obj)));var conf=ajaxConfig,configDefaults={method:"GET",async:!0,user:"",pwd:"",done:function(){objIsPanel?obj.content.innerHTML=this.responseText:obj.innerHTML=this.responseText},autoresize:!0,autoreposition:!0},config=void 0;if("string"==typeof conf)config=Object.assign({},configDefaults,{url:encodeURI(conf),evalscripttags:!0});else if("object"===("undefined"==typeof conf?"undefined":_typeof(conf))&&conf.url)config=Object.assign({},configDefaults,conf),config.url=encodeURI(conf.url),!1===config.async&&(config.timeout=0,config.withCredentials&&(config.withCredentials=void 0),config.responseType&&(config.responseType=void 0));else return console.info("XMLHttpRequest seems to miss the request url!"),obj;var xhr=new XMLHttpRequest;return xhr.onreadystatechange=function(){if(4===xhr.readyState){if(200!==xhr.status)config.fail&&config.fail.call(xhr,obj);else if(config.done.call(xhr,obj),config.evalscripttags){var scripttags=xhr.responseText.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi);scripttags&&scripttags.forEach(function(tag){var js=tag.replace(/<script\b[^>]*>/i,"").replace(/<\/script>/i,"").trim();eval(js)})}if(config.always&&config.always.call(xhr,obj),objIsPanel){var oContentSize=obj.options.contentSize;if("string"==typeof oContentSize&&oContentSize.match(/auto/i)){var parts=oContentSize.split(" "),sizes=Object.assign({},{width:parts[0],height:parts[1]});config.autoresize&&obj.resize(sizes),!obj.classList.contains("jsPanel-contextmenu")&&config.autoreposition&&obj.reposition()}else if("object"===("undefined"==typeof oContentSize?"undefined":_typeof(oContentSize))&&("auto"===oContentSize.width||"auto"===oContentSize.height)){var _sizes=Object.assign({},oContentSize);config.autoresize&&obj.resize(_sizes),!obj.classList.contains("jsPanel-contextmenu")&&config.autoreposition&&obj.reposition()}}jsPanel.ajaxAlwaysCallbacks.length&&jsPanel.ajaxAlwaysCallbacks.forEach(function(e){e.call(obj,obj)})}},xhr.open(config.method,config.url,config.async,config.user,config.pwd),xhr.timeout=config.timeout||0,config.withCredentials&&(xhr.withCredentials=config.withCredentials),config.responseType&&(xhr.responseType=config.responseType),config.beforeSend&&config.beforeSend.call(xhr),config.data?xhr.send(config.data):xhr.send(null),obj},calcColors:function(e){var t=this.color(e),n=this.lighten(e,.81),a=this.darken(e,.5),o=.556>=this.perceivedBrightness(e)?"#ffffff":"#000000",i=.556>=this.perceivedBrightness(n)?"#ffffff":"#000000",l=.556>=this.perceivedBrightness(a)?"#000000":"#ffffff";return[t.hsl.css,n,a,o,i,l]},color:function e(t){var n,a,o,i,r,s,l,d,c,e=t.toLowerCase(),h={},p=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/gi,m=/^rgba?\(([0-9]{1,3}),([0-9]{1,3}),([0-9]{1,3}),?(0|1|0\.[0-9]{1,2}|\.[0-9]{1,2})?\)$/gi,f=/^hsla?\(([0-9]{1,3}),([0-9]{1,3}%),([0-9]{1,3}%),?(0|1|0\.[0-9]{1,2}|\.[0-9]{1,2})?\)$/gi,g={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgrey:"a9a9a9",darkgreen:"006400",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",grey:"808080",green:"008000",greenyellow:"adff2f",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgrey:"d3d3d3",lightgreen:"90ee90",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370d8",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"d87093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"639",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"};return g[e]&&(e=g[e]),null===e.match(p)?e.match(m)?(l=m.exec(e),h.rgb={css:e,r:l[1],g:l[2],b:l[3]},h.hex=this.rgbToHex(l[1],l[2],l[3]),c=this.rgbToHsl(l[1],l[2],l[3]),h.hsl=c):e.match(f)?(l=f.exec(e),i=l[1]/360,r=l[2].substr(0,l[2].length-1)/100,s=l[3].substr(0,l[3].length-1)/100,d=this.hslToRgb(i,r,s),h.rgb={css:"rgb("+d[0]+","+d[1]+","+d[2]+")",r:d[0],g:d[1],b:d[2]},h.hex=this.rgbToHex(h.rgb.r,h.rgb.g,h.rgb.b),h.hsl={css:"hsl("+l[1]+","+l[2]+","+l[3]+")",h:l[1],s:l[2],l:l[3]}):(h.hex="#f5f5f5",h.rgb={css:"rgb(245,245,245)",r:245,g:245,b:245},h.hsl={css:"hsl(0,0%,96.08%)",h:0,s:"0%",l:"96.08%"}):(e=e.replace("#",""),1==e.length%2?(n=e.substr(0,1)+""+e.substr(0,1),a=e.substr(1,1)+""+e.substr(1,1),o=e.substr(2,1)+""+e.substr(2,1),h.rgb={r:parseInt(n,16),g:parseInt(a,16),b:parseInt(o,16)},h.hex="#"+n+a+o):(h.rgb={r:parseInt(e.substr(0,2),16),g:parseInt(e.substr(2,2),16),b:parseInt(e.substr(4,2),16)},h.hex="#"+e),c=this.rgbToHsl(h.rgb.r,h.rgb.g,h.rgb.b),h.hsl=c,h.rgb.css="rgb("+h.rgb.r+","+h.rgb.g+","+h.rgb.b+")"),h},createPanelTemplate:function(){var e=!(0<arguments.length&&void 0!==arguments[0])||arguments[0],t=document.createElement("div");return t.className="jsPanel",e&&["close","maximize","normalize","minimize","smallify","smallifyrev"].forEach(function(e){t.setAttribute("data-btn"+e,"enabled")}),t.innerHTML="<div class=\"jsPanel-hdr\">\n                                <div class=\"jsPanel-headerbar\">\n                                    <div class=\"jsPanel-headerlogo\"></div>\n                                    <div class=\"jsPanel-titlebar\">\n                                        <span class=\"jsPanel-title\"></span>\n                                    </div>\n                                    <div class=\"jsPanel-controlbar\">\n                                        <div class=\"jsPanel-btn jsPanel-btn-smallify\">"+this.icons.smallify+"</div>\n                                        <div class=\"jsPanel-btn jsPanel-btn-smallifyrev\">"+this.icons.smallifyrev+"</div>\n                                        <div class=\"jsPanel-btn jsPanel-btn-minimize\">"+this.icons.minimize+"</div>\n                                        <div class=\"jsPanel-btn jsPanel-btn-normalize\">"+this.icons.normalize+"</div>\n                                        <div class=\"jsPanel-btn jsPanel-btn-maximize\">"+this.icons.maximize+"</div>\n                                        <div class=\"jsPanel-btn jsPanel-btn-close\">"+this.icons.close+"</div>\n                                    </div>\n                                </div>\n                                <div class=\"jsPanel-hdr-toolbar\"></div>\n                            </div>\n                            <div class=\"jsPanel-content jsPanel-content-nofooter\"></div>\n                            <div class=\"jsPanel-minimized-box\"></div>\n                            <div class=\"jsPanel-ftr\"></div>",t},createMinimizedTemplate:function(){var e=document.createElement("div");return e.className="jsPanel-replacement",e.innerHTML="<div class=\"jsPanel-hdr\">\n                                <div class=\"jsPanel-headerbar\">\n                                    <div class=\"jsPanel-headerlogo\"></div>\n                                    <div class=\"jsPanel-titlebar\">\n                                        <span class=\"jsPanel-title\"></span>\n                                    </div>\n                                    <div class=\"jsPanel-controlbar\">\n                                        <div class=\"jsPanel-btn jsPanel-btn-normalize\">"+this.icons.normalize+"</div>\n                                        <div class=\"jsPanel-btn jsPanel-btn-maximize\">"+this.icons.maximize+"</div>\n                                        <div class=\"jsPanel-btn jsPanel-btn-close\">"+this.icons.close+"</div>\n                                    </div>\n                                </div>\n                            </div>",e},createSnapArea:function(e,t,n){var a=document.createElement("div"),o=e.parentElement;a.className="jsPanel-snap-area jsPanel-snap-area-"+t,"lt"===t||"rt"===t||"rb"===t||"lb"===t?(a.style.width=n+"px",a.style.height=n+"px"):"ct"===t||"cb"===t?a.style.height=n+"px":("lc"===t||"rc"===t)&&(a.style.width=n+"px"),o!==document.body&&(a.style.position="absolute"),document.querySelector(".jsPanel-snap-area.jsPanel-snap-area-"+t)||e.parentElement.appendChild(a)},darken:function(e,t){var n=this.color(e).hsl,a=parseFloat(n.l);return"hsl("+n.h+","+n.s+","+(a-a*t+"%")+")"},dragit:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n=void 0,a=Object.assign({},this.defaults.dragit,e),o=void 0,i=void 0,l=[],s=new CustomEvent("jspaneldragstart",{detail:t.id}),r=new CustomEvent("jspaneldrag",{detail:t.id}),d=new CustomEvent("jspaneldragstop",{detail:t.id});return a.grid&&Array.isArray(a.grid)&&1===a.grid.length&&(a.grid[1]=a.grid[0]),i=this.pOcontainment(a.containment),t.querySelectorAll(a.handles).forEach(function(e){e.style.touchAction="none",e.style.cursor=a.cursor,jsPanel.pointerdown.forEach(function(d){e.addEventListener(d,function(d){if(d.preventDefault(),!d.target.closest(".jsPanel-ftr-btn")){t.controlbar.style.pointerEvents="none",l=document.querySelectorAll("iframe"),l.length&&l.forEach(function(e){e.style.pointerEvents="none"});var e=window.getComputedStyle(t),c=parseFloat(e.left),h=parseFloat(e.top),p=d.touches?d.touches[0].clientX:d.clientX,m=d.touches?d.touches[0].clientY:d.clientY,f=t.parentElement,g=f.getBoundingClientRect(),u=window.getComputedStyle(f),b=0;o=function(o){var e=Math.abs,l=Math.sqrt,d=Math.pow;if(o.preventDefault(),!n){if(document.dispatchEvent(s),t.style.opacity=a.opacity,t.snapped&&a.snap.resizeToPreSnap&&t.currentData.beforeSnap){t.resize(t.currentData.beforeSnap.width+" "+t.currentData.beforeSnap.height);var y=t.getBoundingClientRect(),v=p-(y.left+y.width),z=y.width/2;v>-z&&(b=v+z)}a.start&&jsPanel.processCallbacks(t,a.start,!1,{left:c,top:h}),jsPanel.front(t),t.snapped=!1}if(n=1,a.disableOnMaximized&&"maximized"===t.status)return!1;var w,x,C,E,j,P,S,T,L,k,q=o.touches?o.touches[0].clientX:o.clientX,A=o.touches?o.touches[0].clientY:o.clientY,W=window.getComputedStyle(t);if(f===document.body){var R=t.getBoundingClientRect();L=window.innerWidth-parseInt(u.borderLeftWidth,10)-parseInt(u.borderRightWidth,10)-(R.left+R.width),k=window.innerHeight-parseInt(u.borderTopWidth,10)-parseInt(u.borderBottomWidth,10)-(R.top+R.height)}else L=parseInt(u.width,10)-parseInt(u.borderLeftWidth,10)-parseInt(u.borderRightWidth,10)-(parseInt(W.left,10)+parseInt(W.width,10)),k=parseInt(u.height,10)-parseInt(u.borderTopWidth,10)-parseInt(u.borderBottomWidth,10)-(parseInt(W.top,10)+parseInt(W.height,10));w=parseFloat(W.left),C=parseFloat(W.top),j=L,S=k,a.snap&&("panel"===a.snap.trigger?x=d(w,2):"pointer"===a.snap.trigger&&(w=q,x=d(q,2),C=A,j=window.innerWidth-q,S=window.innerHeight-A),E=d(C,2),P=d(j,2),T=d(S,2));var B=l(x+E),H=l(x+T),M=l(P+E),O=l(P+T),D=e(w-j)/2,I=e(C-S)/2,N=l(x+d(I,2)),X=l(E+d(D,2)),Y=l(P+d(I,2)),F=l(T+d(D,2));if(window.getSelection().removeAllRanges(),document.dispatchEvent(r),a.axis&&"x"!==a.axis||(t.style.left=c+(q-p)+b+"px"),a.axis&&"y"!==a.axis||(t.style.top=h+(A-m)+"px"),a.grid){var _=parseFloat(W.left),V=parseFloat(W.top),Z=_%a.grid[0],K=V%a.grid[1];t.style.left=Z<a.grid[0]/2?_-Z+"px":_+(a.grid[0]-Z)+"px",t.style.top=K<a.grid[1]/2?V-K+"px":V+(a.grid[1]-K)+"px"}if(a.containment||0===a.containment){var U,G;if(t.options.container===document.body)U=window.innerWidth-parseFloat(W.width)-i[1],G=window.innerHeight-parseFloat(W.height)-i[2];else{var J=parseFloat(u.borderLeftWidth)+parseFloat(u.borderRightWidth),Q=parseFloat(u.borderTopWidth)+parseFloat(u.borderBottomWidth);U=g.width-parseFloat(W.width)-i[1]-J,G=g.height-parseFloat(W.height)-i[2]-Q}parseFloat(t.style.left)<=i[3]&&(t.style.left=i[3]+"px"),parseFloat(t.style.top)<=i[0]&&(t.style.top=i[0]+"px"),parseFloat(t.style.left)>=U&&(t.style.left=U+"px"),parseFloat(t.style.top)>=G&&(t.style.top=G+"px")}if(a.drag&&jsPanel.processCallbacks(t,a.drag,!1,{left:w,top:C,right:j,bottom:S}),a.snap){var ee=a.snap.sensitivity,te=f===document.body?window.innerWidth/8:g.width/8,ne=f===document.body?window.innerHeight/8:g.height/8;t.snappableTo=!1,jsPanel.removeSnapAreas(t),B<ee?(t.snappableTo="left-top",!1!==a.snap.snapLeftTop&&jsPanel.createSnapArea(t,"lt",ee)):H<ee?(t.snappableTo="left-bottom",!1!==a.snap.snapLeftBottom&&jsPanel.createSnapArea(t,"lb",ee)):M<ee?(t.snappableTo="right-top",!1!==a.snap.snapRightTop&&jsPanel.createSnapArea(t,"rt",ee)):O<ee?(t.snappableTo="right-bottom",!1!==a.snap.snapRightBottom&&jsPanel.createSnapArea(t,"rb",ee)):C<ee&&X<te?(t.snappableTo="center-top",!1!==a.snap.snapCenterTop&&jsPanel.createSnapArea(t,"ct",ee)):w<ee&&N<ne?(t.snappableTo="left-center",!1!==a.snap.snapLeftCenter&&jsPanel.createSnapArea(t,"lc",ee)):j<ee&&Y<ne?(t.snappableTo="right-center",!1!==a.snap.snapRightCenter&&jsPanel.createSnapArea(t,"rc",ee)):S<ee&&F<te&&(t.snappableTo="center-bottom",!1!==a.snap.snapCenterBottom&&jsPanel.createSnapArea(t,"cb",ee))}},jsPanel.pointermove.forEach(function(e){document.addEventListener(e,o)})}})}),jsPanel.pointerup.forEach(function(e){document.addEventListener(e,function(){jsPanel.pointermove.forEach(function(e){document.removeEventListener(e,o)}),document.body.style.overflow="inherit",jsPanel.removeSnapAreas(t),n&&(document.dispatchEvent(d),t.style.opacity=1,n=void 0,t.saveCurrentPosition(),a.snap&&("left-top"===t.snappableTo?jsPanel.snapPanel(t,a.snap.snapLeftTop):"center-top"===t.snappableTo?jsPanel.snapPanel(t,a.snap.snapCenterTop):"right-top"===t.snappableTo?jsPanel.snapPanel(t,a.snap.snapRightTop):"right-center"===t.snappableTo?jsPanel.snapPanel(t,a.snap.snapRightCenter):"right-bottom"===t.snappableTo?jsPanel.snapPanel(t,a.snap.snapRightBottom):"center-bottom"===t.snappableTo?jsPanel.snapPanel(t,a.snap.snapCenterBottom):"left-bottom"===t.snappableTo?jsPanel.snapPanel(t,a.snap.snapLeftBottom):"left-center"===t.snappableTo&&jsPanel.snapPanel(t,a.snap.snapLeftCenter),a.snap.callback&&t.snappableTo&&"function"==typeof a.snap.callback&&a.snap.callback.call(t,t),t.snappableTo&&a.snap.repositionOnSnap&&t.repositionOnSnap(t.snappableTo)),a.stop&&jsPanel.processCallbacks(t,a.stop,!1,{left:parseFloat(t.style.left),top:parseFloat(t.style.top)})),t.controlbar.style.pointerEvents="inherit",l.length&&l.forEach(function(e){e.style.pointerEvents="inherit"})})}),a.disable&&(e.style.pointerEvents="none")}),t},emptyNode:function(e){for(;e.firstChild;)e.removeChild(e.firstChild);return e},extend:function(e){if("[object Object]"===Object.prototype.toString.call(e))for(var t in e)e.hasOwnProperty(t)&&(this.extensions[t]=e[t])},fetch:function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(obj){var conf=obj.options.contentFetch,confDefaults={bodyMethod:"text",evalscripttags:!0,autoresize:!0,autoreposition:!0,done:function(e,t){e.content.innerHTML=t}};conf="string"==typeof conf?Object.assign({resource:obj.options.contentFetch},confDefaults):Object.assign(confDefaults,conf);var fetchInit=conf.fetchInit||{};conf.beforeSend&&conf.beforeSend.call(obj,obj),fetch(conf.resource,fetchInit).then(function(e){if(e.ok)return e[conf.bodyMethod]();throw new Error("Network response was not ok.")}).then(function(response){if(conf.done.call(obj,obj,response),conf.evalscripttags){var scripttags=response.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi);scripttags&&scripttags.forEach(function(tag){var js=tag.replace(/<script\b[^>]*>/i,"").replace(/<\/script>/i,"").trim();eval(js)})}var oContentSize=obj.options.contentSize;if(conf.autoresize||conf.autoreposition)if("string"==typeof oContentSize&&oContentSize.match(/auto/i)){var parts=oContentSize.split(" "),sizes=Object.assign({},{width:parts[0],height:parts[1]});conf.autoresize&&obj.resize(sizes),!obj.classList.contains("jsPanel-contextmenu")&&conf.autoreposition&&obj.reposition()}else if("object"===("undefined"==typeof oContentSize?"undefined":_typeof(oContentSize))&&("auto"===oContentSize.width||"auto"===oContentSize.height)){var _sizes2=Object.assign({},oContentSize);conf.autoresize&&obj.resize(_sizes2),!obj.classList.contains("jsPanel-contextmenu")&&conf.autoreposition&&obj.reposition()}}).catch(function(e){console.error("There has been a problem with your fetch operation: "+e.message)})}),front:function(e){if("minimized"===e.status)"maximized"===e.statusBefore?e.maximize():e.normalize();else{var t=Array.prototype.slice.call(document.querySelectorAll(".jsPanel-standard")).map(function(e){return e.style.zIndex});Math.max.apply(Math,_toConsumableArray(t))>e.style.zIndex&&(e.style.zIndex=jsPanel.zi.next()),this.resetZi()}this.getPanels().forEach(function(e,t){var n=e.content.querySelector(".jsPanel-iframe-overlay");if(!(0<t))n&&e.content.removeChild(n);else if(e.content.querySelector("iframe")&&!n){var a=document.createElement("div");a.className="jsPanel-iframe-overlay",e.content.appendChild(a)}})},getPanels:function(){var e=0<arguments.length&&arguments[0]!==void 0?arguments[0]:function(){return this.classList.contains("jsPanel-standard")};return Array.prototype.slice.call(document.querySelectorAll(".jsPanel")).filter(function(t){return e.call(t,t)}).sort(function(e,t){return t.style.zIndex-e.style.zIndex})},hslToRgb:function(e,t,n){var a=Math.round,o=void 0,i=void 0,l=void 0;if(0===t)o=i=l=n;else{var s=function(e,n,a){return 0>a&&(a+=1),1<a&&(a-=1),a<1/6?e+6*(n-e)*a:a<1/2?n:a<2/3?e+6*((n-e)*(2/3-a)):e},r=.5>n?n*(1+t):n+t-n*t,d=2*n-r;o=s(d,r,e+1/3),i=s(d,r,e),l=s(d,r,e-1/3)}return[a(255*o),a(255*i),a(255*l)]},lighten:function(e,t){var n=this.color(e).hsl,a=parseFloat(n.l);return"hsl("+n.h+","+n.s+","+(a+(100-a)*t+"%")+")"},perceivedBrightness:function(e){var t=this.color(e).rgb;return .2627*(t.r/255)+.678*(t.g/255)+.0593*(t.b/255)},pOcontainer:function(e,t){if(e){var n;if("string"==typeof e?n=document.querySelector(e):1===e.nodeType?n=e:e.length&&(n=e[0]),n&&1===n.nodeType)return n}var a=new jsPanelError("NO NEW PANEL CREATED!\nThe container to append the panel to does not exist or a container was not specified!");try{throw a}catch(n){t&&t.call(n,n)}return a},pOcontainment:function(e){if("number"==typeof e)return[e,e,e,e];if(Array.isArray(e)){if(1===e.length)return[e[0],e[0],e[0],e[0]];if(2===e.length)return e.concat(e);3===e.length&&(e[3]=e[1])}return e},pOsize:function(e,t){var n=t||this.defaults.contentSize,a=e.parentElement;if("string"==typeof n){var o=n.trim().split(" ");n={},n.width=o[0],n.height=2===o.length?o[1]:o[0]}else n.width&&!n.height?n.height=n.width:n.height&&!n.width&&(n.width=n.height);if((n.width+"").match(/^[0-9.]+$/gi))n.width+="px";else if(!("string"==typeof n.width&&n.width.endsWith("%")))"function"==typeof n.width&&(n.width=n.width.call(e,e),"number"==typeof n.width?n.width+="px":"string"==typeof n.width&&n.width.match(/^[0-9.]+$/gi)&&(n.width+="px"));else if(a===document.body)n.width=window.innerWidth*(parseFloat(n.width)/100)+"px";else{var i=window.getComputedStyle(a),l=parseFloat(i.borderLeftWidth)+parseFloat(i.borderRightWidth);n.width=(parseFloat(i.width)-l)*(parseFloat(n.width)/100)+"px"}if((n.height+"").match(/^[0-9.]+$/gi))n.height+="px";else if(!("string"==typeof n.height&&n.height.endsWith("%")))"function"==typeof n.height&&(n.height=n.height.call(e,e),"number"==typeof n.height?n.height+="px":"string"==typeof n.height&&n.height.match(/^[0-9.]+$/gi)&&(n.height+="px"));else if(a===document.body)n.height=window.innerHeight*(parseFloat(n.height)/100)+"px";else{var s=window.getComputedStyle(a),r=parseFloat(s.borderTopWidth)+parseFloat(s.borderBottomWidth);n.height=(parseFloat(s.height)-r)*(parseFloat(n.height)/100)+"px"}return n},pOposition:function(e){var t=e.match(/\b[a-z]{4,6}-{1}[a-z]{3,6}\b/i),n=e.match(/down|up|right([^-]|$)|left([^-]|$)/i),a=e.match(/[+-]?\d?\.?\d+([a-z%]{2,4}\b|%?)/gi),o=void 0;return o=t?{my:t[0].toLowerCase(),at:t[0].toLowerCase()}:{my:"center",at:"center"},n&&(o.autoposition=n[0].toLowerCase()),a&&(a.forEach(function(e,t){e.match(/^[+-]?[0-9]*$/)&&(a[t]+="px"),a[t]=a[t].toLowerCase()}),1===a.length?(o.offsetX=a[0],o.offsetY=a[0]):(o.offsetX=a[0],o.offsetY=a[1])),o},position:function(e,t){var n,a,o,i={left:0,top:0},l=0,s=0,r=0,d=0,c={my:"center",at:"center",of:"window",offsetX:"0px",offsetY:"0px"},h={width:document.documentElement.clientWidth,height:window.innerHeight},p=pageXOffset,m=pageYOffset;if(n="string"==typeof e?document.querySelector(e):e,!t)return n.style.opacity=1,n;var f=n.getBoundingClientRect();a="string"==typeof t?Object.assign({},c,jsPanel.pOposition(t)):Object.assign({},c,t);var g=n.parentElement,u=window.getComputedStyle(g),b=g.getBoundingClientRect(),y=g.tagName.toLowerCase();if(a.of&&"window"!==a.of&&("string"==typeof a.of?o=document.querySelector(a.of):o=a.of),a.my.match(/^center-top$|^center$|^center-bottom$/i)?l=f.width/2:a.my.match(/right/i)&&(l=f.width),a.my.match(/^left-center$|^center$|^right-center$/i)?s=f.height/2:a.my.match(/bottom/i)&&(s=f.height),"body"===y&&"window"===a.of)a.at.match(/^center-top$|^center$|^center-bottom$/i)?r=h.width/2:a.at.match(/right/i)&&(r=h.width),a.at.match(/^left-center$|^center$|^right-center$/i)?d=h.height/2:a.at.match(/bottom/i)&&(d=h.height),i.left=r-l-parseFloat(u.borderLeftWidth),i.top=d-s-parseFloat(u.borderTopWidth),n.style.position="fixed";else if("body"===y&&"window"!==a.of){var v=o.getBoundingClientRect();r=a.at.match(/^center-top$|^center$|^center-bottom$/i)?v.width/2+v.left+p:a.at.match(/right/i)?v.width+v.left+p:v.left+p,d=a.at.match(/^left-center$|^center$|^right-center$/i)?v.height/2+v.top+m:a.at.match(/bottom/i)?v.height+v.top+m:v.top+m,i.left=r-l-parseFloat(u.borderLeftWidth),i.top=d-s-parseFloat(u.borderTopWidth)}else if("body"!==y&&("window"===a.of||!a.of)){var z=parseFloat(u.borderLeftWidth)+parseFloat(u.borderRightWidth),w=parseFloat(u.borderTopWidth)+parseFloat(u.borderBottomWidth);a.at.match(/^center-top$|^center$|^center-bottom$/i)?r=b.width/2-z/2:a.at.match(/right/i)&&(r=b.width-z),a.at.match(/^left-center$|^center$|^right-center$/i)?d=b.height/2-w/2:a.at.match(/bottom/i)&&(d=b.height-w),i.left=r-l,i.top=d-s}else if("body"!==y&&g.contains(o)){var x=o.getBoundingClientRect();r=a.at.match(/^center-top$|^center$|^center-bottom$/i)?x.left-b.left+x.width/2:a.at.match(/right/i)?x.left-b.left+x.width:x.left-b.left,d=a.at.match(/^left-center$|^center$|^right-center$/i)?x.top-b.top+x.height/2:a.at.match(/bottom/i)?x.top-b.top+x.height:x.top-b.top,i.left=r-l-parseFloat(u.borderLeftWidth),i.top=d-s-parseFloat(u.borderTopWidth)}if(a.autoposition&&a.my===a.at&&0<=["left-top","center-top","right-top","left-bottom","center-bottom","right-bottom"].indexOf(a.my)){var C=a.my+"-"+a.autoposition.toLowerCase();n.classList.add(C);var E=Array.prototype.slice.call(document.querySelectorAll("."+C)),j=E.indexOf(n);1<E.length&&("down"===a.autoposition?E.forEach(function(e,t){0<t&&t<=j&&(i.top+=E[--t].getBoundingClientRect().height+jsPanel.autopositionSpacing)}):"up"===a.autoposition?E.forEach(function(e,t){0<t&&t<=j&&(i.top-=E[--t].getBoundingClientRect().height+jsPanel.autopositionSpacing)}):"right"===a.autoposition?E.forEach(function(e,t){0<t&&t<=j&&(i.left+=E[--t].getBoundingClientRect().width+jsPanel.autopositionSpacing)}):"left"===a.autoposition&&E.forEach(function(e,t){0<t&&t<=j&&(i.left-=E[--t].getBoundingClientRect().width+jsPanel.autopositionSpacing)}))}if(i.left+="px",i.top+="px",n.style.left=i.left,n.style.top=i.top,a.offsetX&&(n.style.left="number"==typeof a.offsetX?"calc("+i.left+" + "+a.offsetX+"px)":"calc("+i.left+" + "+a.offsetX+")",i.left=window.getComputedStyle(n).left),a.offsetY&&(n.style.top="number"==typeof a.offsetY?"calc("+i.top+" + "+a.offsetY+"px)":"calc("+i.top+" + "+a.offsetY+")",i.top=window.getComputedStyle(n).top),a.minLeft){var P=parseFloat(i.left);"number"==typeof a.minLeft&&(a.minLeft+="px"),n.style.left=a.minLeft;var S=parseFloat(window.getComputedStyle(n).left);P>S&&(n.style.left=P+"px"),i.left=window.getComputedStyle(n).left}if(a.maxLeft){var T=parseFloat(i.left);"number"==typeof a.maxLeft&&(a.maxLeft+="px"),n.style.left=a.maxLeft;var L=parseFloat(window.getComputedStyle(n).left);T<L&&(n.style.left=T+"px"),i.left=window.getComputedStyle(n).left}if(a.maxTop){var k=parseFloat(i.top);"number"==typeof a.maxTop&&(a.maxTop+="px"),n.style.top=a.maxTop;var q=parseFloat(window.getComputedStyle(n).top);k<q&&(n.style.top=k+"px"),i.top=window.getComputedStyle(n).top}if(a.minTop){var A=parseFloat(i.top);"number"==typeof a.minTop&&(a.minTop+="px"),n.style.top=a.minTop;var W=parseFloat(window.getComputedStyle(n).top);A>W&&(n.style.top=A+"px"),i.top=window.getComputedStyle(n).top}if("function"==typeof a.modify){var R=a.modify.call(i,i);n.style.left=R.left,n.style.top=R.top}return n.style.opacity=1,n.style.left=window.getComputedStyle(n).left,n.style.top=window.getComputedStyle(n).top,n},processCallbacks:function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"some",a=arguments[3];return"function"==typeof t&&(t=[t]),n?t[n](function(t){if("function"==typeof t)return t.call(e,e,a)}):void t.forEach(function(t){t.call(e,e,a)})},rgbToHsl:function(e,t,n){e/=255,t/=255,n/=255;var a,o,i=Math.max(e,t,n),s=Math.min(e,t,n),r=(i+s)/2;if(i===s)a=o=0;else{var l=i-s;o=.5<r?l/(2-i-s):l/(i+s),i===e?a=(t-n)/l+(t<n?6:0):i===t?a=(n-e)/l+2:i===n?a=(e-t)/l+4:void 0,a/=6}return a*=360,o=100*o+"%",r=100*r+"%",{css:"hsl("+a+","+o+","+r+")",h:a,s:o,l:r}},rgbToHex:function(e,t,n){var a=(+e).toString(16),o=(+t).toString(16),i=(+n).toString(16);return 1===a.length&&(a="0"+a),1===o.length&&(o="0"+o),1===i.length&&(i="0"+i),"#"+a+o+i},removeSnapAreas:function(e){document.querySelectorAll(".jsPanel-snap-area").forEach(function(t){e.parentElement&&e.parentElement.removeChild(t)})},resetZi:function(){this.zi=function(){var e=0<arguments.length&&arguments[0]!==void 0?arguments[0]:jsPanel.ziBase,t=e;return{next:function(){return t++}}}(),Array.prototype.slice.call(document.querySelectorAll(".jsPanel-standard")).sort(function(e,t){return e.style.zIndex-t.style.zIndex}).forEach(function(e){e.style.zIndex=jsPanel.zi.next()})},resizeit:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n=Object.assign({},this.defaults.resizeit,e),a=t.parentElement,o=a.tagName.toLowerCase(),i="function"==typeof n.maxWidth?n.maxWidth():n.maxWidth||1e4,l="function"==typeof n.maxHeight?n.maxHeight():n.maxHeight||1e4,s="function"==typeof n.minWidth?n.minWidth():n.minWidth,r="function"==typeof n.minHeight?n.minHeight():n.minHeight,d=new CustomEvent("jspanelresizestart",{detail:t.id}),c=new CustomEvent("jspanelresize",{detail:t.id}),p=new CustomEvent("jspanelresizestop",{detail:t.id}),m=void 0,f=void 0,g=void 0,u=void 0,b=void 0,h=[];return m=this.pOcontainment(n.containment),n.handles.split(",").forEach(function(e){var n=document.createElement("DIV");n.className="jsPanel-resizeit-handle jsPanel-resizeit-"+e.trim(),n.style.zIndex=90,t.append(n)}),t.querySelectorAll(".jsPanel-resizeit-handle").forEach(function(e){jsPanel.pointerdown.forEach(function(p){e.addEventListener(p,function(p){p.preventDefault(),h=document.querySelectorAll("iframe"),h.length&&h.forEach(function(e){e.style.pointerEvents="none"});var e=t.getBoundingClientRect(),y=a.getBoundingClientRect(),v=window.getComputedStyle(a,null),z=parseInt(v.borderLeftWidth,10),w=parseInt(v.borderTopWidth,10),x=v.getPropertyValue("position"),C=p.clientX||p.touches[0].clientX,E=p.clientY||p.touches[0].clientY,j=e.width,P=e.height,S=p.target.classList,T=e.left,L=e.top,k=1e4,q=1e4,A=1e4,W=1e4;t.content.style.pointerEvents="none","body"!==o&&(T=e.left-y.left+a.scrollLeft,L=e.top-y.top+a.scrollTop),"body"===o&&m?(k=document.documentElement.clientWidth-e.left,A=document.documentElement.clientHeight-e.top,q=e.width+e.left,W=e.height+e.top):m&&("static"===x?(k=y.width-e.left+z,A=y.height+y.top-e.top+w,q=e.width+(e.left-y.left)-z,W=e.height+(e.top-y.top)-w):(k=a.clientWidth-(e.left-y.left)+z,A=a.clientHeight-(e.top-y.top)+w,q=e.width+(e.left-y.left)-z,W=t.clientHeight+(e.top-y.top)-w)),m&&(q-=m[3],W-=m[0],k-=m[1],A-=m[2]);var R=window.getComputedStyle(t),B=parseFloat(R.width)-e.width,H=parseFloat(R.height)-e.height,M=parseFloat(R.left)-e.left,O=parseFloat(R.top)-e.top;a!==document.body&&(M+=y.left,O+=y.top),f=function(e){g||(document.dispatchEvent(d),n.start&&jsPanel.processCallbacks(t,n.start,!1,{width:j,height:P}),jsPanel.front(t)),g=1,document.dispatchEvent(c),(S.contains("jsPanel-resizeit-e")||S.contains("jsPanel-resizeit-se")||S.contains("jsPanel-resizeit-ne"))&&(u=j+(e.clientX||e.touches[0].clientX)-C+B,u>=k&&(u=k),u>=i?u=i:u<=s&&(u=s),t.style.width=u+"px"),(S.contains("jsPanel-resizeit-s")||S.contains("jsPanel-resizeit-se")||S.contains("jsPanel-resizeit-sw"))&&(b=P+(e.clientY||e.touches[0].clientY)-E+H,b>=A&&(b=A),b>=l?b=l:b<=r&&(b=r),t.style.height=b+"px"),(S.contains("jsPanel-resizeit-w")||S.contains("jsPanel-resizeit-nw")||S.contains("jsPanel-resizeit-sw"))&&(u=j+C-(e.clientX||e.touches[0].clientX)+B,u<=i&&u>=s&&u<=q&&(t.style.left=T+(e.clientX||e.touches[0].clientX)-C+M+"px"),u>=q&&(u=q),u>=i?u=i:u<=s&&(u=s),t.style.width=u+"px"),(S.contains("jsPanel-resizeit-n")||S.contains("jsPanel-resizeit-nw")||S.contains("jsPanel-resizeit-ne"))&&(b=P+E-(e.clientY||e.touches[0].clientY)+H,b<=l&&b>=r&&b<=W&&(t.style.top=L+(e.clientY||e.touches[0].clientY)-E+O+"px"),b>=W&&(b=W),b>=l?b=l:b<=r&&(b=r),t.style.height=b+"px"),t&&t.contentResize(),window.getSelection().removeAllRanges();var a=window.getComputedStyle(t),o={left:parseFloat(a.left),top:parseFloat(a.top),right:parseFloat(a.right),bottom:parseFloat(a.bottom),width:parseFloat(a.width),height:parseFloat(a.height)};n.resize&&jsPanel.processCallbacks(t,n.resize,!1,o)},jsPanel.pointermove.forEach(function(e){document.addEventListener(e,f,!1)}),window.addEventListener("mouseout",function(t){null===t.relatedTarget&&jsPanel.pointermove.forEach(function(e){document.removeEventListener(e,f,!1)})},!1)})})}),jsPanel.pointerup.forEach(function(e){document.addEventListener(e,function(a){if(jsPanel.pointermove.forEach(function(e){document.removeEventListener(e,f,!1)}),a.target.classList&&a.target.classList.contains("jsPanel-resizeit-handle")){var e,o,i=a.target.className;if(i.match(/jsPanel-resizeit-nw|jsPanel-resizeit-w|jsPanel-resizeit-sw/i)&&(e=!0),i.match(/jsPanel-resizeit-nw|jsPanel-resizeit-n|jsPanel-resizeit-ne/i)&&(o=!0),n.grid&&Array.isArray(n.grid)){1===n.grid.length&&(n.grid[1]=n.grid[0]);var l=parseFloat(t.style.width),s=parseFloat(t.style.height),r=l%n.grid[0],d=s%n.grid[1],c=parseFloat(t.style.left),m=parseFloat(t.style.top),u=c%n.grid[0],b=m%n.grid[1];t.style.width=r<n.grid[0]/2?l-r+"px":l+(n.grid[0]-r)+"px",t.style.height=d<n.grid[1]/2?s-d+"px":s+(n.grid[1]-d)+"px",e&&(u<n.grid[0]/2?t.style.left=c-u+"px":t.style.left=c+(n.grid[0]-u)+"px"),o&&(b<n.grid[1]/2?t.style.top=m-b+"px":t.style.top=m+(n.grid[1]-b)+"px")}t&&t.contentResize()}g&&(t.content.style.pointerEvents="inherit",document.dispatchEvent(p),g=void 0,t.saveCurrentDimensions(),t.saveCurrentPosition(),n.stop&&jsPanel.processCallbacks(t,n.stop,!1,{width:parseFloat(t.style.width),height:parseFloat(t.style.height)})),h.length&&h.forEach(function(e){e.style.pointerEvents="inherit"})},!1)}),n.disable&&t.querySelectorAll(".jsPanel-resizeit-handle").forEach(function(e){e.style.pointerEvents="none"}),t},setClass:function(e,t){return t.split(" ").forEach(function(t){return e.classList.add(t)}),e},remClass:function(e,t){return t.split(" ").forEach(function(t){return e.classList.remove(t)}),e},setStyle:function(e,t){for(var n in t)if(t.hasOwnProperty(n)){var a=(n+"").replace(/-\w/gi,function(e){return e.substr(-1).toUpperCase()});e.style[a]=t[n]}return e},snapPanel:function(e,t){if(e.currentData.beforeSnap={width:e.currentData.width,height:e.currentData.height},t&&"function"==typeof t)t.call(e,e,e.snappableTo);else if(!1!==t){var n=[0,0];if(e.options.dragit.snap.containment&&e.options.dragit.containment){var a=this.pOcontainment(e.options.dragit.containment),o=e.snappableTo;o.startsWith("left")?n[0]=a[3]:o.startsWith("right")&&(n[0]=-a[1]),o.endsWith("top")?n[1]=a[0]:o.endsWith("bottom")&&(n[1]=-a[2])}e.reposition(e.snappableTo+" "+n[0]+" "+n[1]),e.snapped=e.snappableTo}},create:function(){var e=this,n=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1];jsPanel.zi||(jsPanel.zi=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:jsPanel.ziBase,t=e;return{next:function(){return t++}}}());var a;n.config?(n=Object.assign({},this.defaults,n.config,n),delete n.config):n=Object.assign({},this.defaults,n),n.id?"function"==typeof n.id&&(n.id=n.id()):n.id="jsPanel-"+(jsPanel.idCounter+=1);var o=document.getElementById(n.id);if(null!==o){o.classList.contains("jsPanel")&&o.front();var i=new jsPanelError("NO NEW PANEL CREATED!\nAn element with the ID <"+n.id+"> already exists in the document.");try{throw i}catch(n){t&&t.call(n,n)}return console.error(i.name+":",i.message)}var l=this.pOcontainer(n.container,t);if(l&&l.message)return console.error(l.name+":",l.message);n.maximizedMargin=this.pOcontainment(n.maximizedMargin),n.dragit&&(["start","drag","stop"].forEach(function(e){n.dragit[e]?"function"==typeof n.dragit[e]&&(n.dragit[e]=[n.dragit[e]]):n.dragit[e]=[]}),n.dragit.snap&&("object"===_typeof(n.dragit.snap)?n.dragit.snap=Object.assign({},this.defaultSnapConfig,n.dragit.snap):n.dragit.snap=this.defaultSnapConfig)),n.resizeit&&["start","resize","stop"].forEach(function(e){n.resizeit[e]?"function"==typeof n.resizeit[e]&&(n.resizeit[e]=[n.resizeit[e]]):n.resizeit[e]=[]}),["onbeforeclose","onbeforemaximize","onbeforeminimize","onbeforenormalize","onbeforesmallify","onbeforeunsmallify","onclosed","onfronted","onmaximized","onminimized","onnormalized","onsmallified","onstatuschange","onunsmallified"].forEach(function(e){n[e]?"function"==typeof n[e]&&(n[e]=[n[e]]):n[e]=[]}),n.headerRemove&&(n.header=!1);var s=n.template?n.template:this.createPanelTemplate();s.options=n,s.status="initialized",s.currentData={},s.header=s.querySelector(".jsPanel-hdr"),s.headerbar=s.header.querySelector(".jsPanel-headerbar"),s.titlebar=s.header.querySelector(".jsPanel-titlebar"),s.headerlogo=s.headerbar.querySelector(".jsPanel-headerlogo"),s.headertitle=s.headerbar.querySelector(".jsPanel-title"),s.controlbar=s.headerbar.querySelector(".jsPanel-controlbar"),s.headertoolbar=s.header.querySelector(".jsPanel-hdr-toolbar"),s.content=s.querySelector(".jsPanel-content"),s.footer=s.querySelector(".jsPanel-ftr"),s.snappableTo=!1,s.snapped=!1;var r=new CustomEvent("jspanelloaded",{detail:n.id}),d=new CustomEvent("jspanelbeforeclose",{detail:n.id}),c=new CustomEvent("jspanelclosed",{detail:n.id}),h=new CustomEvent("jspanelstatuschange",{detail:n.id}),p=new CustomEvent("jspanelbeforenormalize",{detail:n.id}),m=new CustomEvent("jspanelnormalized",{detail:n.id}),f=new CustomEvent("jspanelbeforemaximize",{detail:n.id}),g=new CustomEvent("jspanelmaximized",{detail:n.id}),u=new CustomEvent("jspanelbeforeminimize",{detail:n.id}),b=new CustomEvent("jspanelminimized",{detail:n.id}),y=new CustomEvent("jspanelbeforesmallify",{detail:n.id}),v=new CustomEvent("jspanelsmallified",{detail:n.id}),z=new CustomEvent("jspanelsmallifiedmax",{detail:n.id}),w=new CustomEvent("jspanelbeforeunsmallify",{detail:n.id}),x=new CustomEvent("jspanelfronted",{detail:n.id}),C=s.querySelector(".jsPanel-btn-close"),E=s.querySelector(".jsPanel-btn-maximize"),j=s.querySelector(".jsPanel-btn-normalize"),P=s.querySelector(".jsPanel-btn-smallify"),S=s.querySelector(".jsPanel-btn-smallifyrev"),T=s.querySelector(".jsPanel-btn-minimize");C&&jsPanel.pointerup.forEach(function(e){C.addEventListener(e,function(t){t.preventDefault(),s.close()})}),E&&jsPanel.pointerup.forEach(function(e){E.addEventListener(e,function(t){t.preventDefault(),s.maximize()})}),j&&jsPanel.pointerup.forEach(function(e){j.addEventListener(e,function(t){t.preventDefault(),s.normalize()})}),P&&jsPanel.pointerup.forEach(function(e){P.addEventListener(e,function(t){t.preventDefault(),s.smallify()})}),S&&jsPanel.pointerup.forEach(function(e){S.addEventListener(e,function(t){t.preventDefault(),s.unsmallify()})}),T&&jsPanel.pointerup.forEach(function(e){T.addEventListener(e,function(t){t.preventDefault(),s.minimize()})});var L=jsPanel.extensions;for(var k in L)L.hasOwnProperty(k)&&(s[k]=L[k]);if(s.addToolbar=function(e,t,n){if("header"===e?e=s.headertoolbar:"footer"===e&&(e=s.footer),"string"==typeof t)e.innerHTML=t;else if(Array.isArray(t))t.forEach(function(t){"string"==typeof t?e.innerHTML+=t:e.append(t)});else if("function"==typeof t){var a=t.call(s,s);"string"==typeof a?e.innerHTML=a:e.append(a)}else e.append(t);return e.classList.add("active"),e===s.footer&&s.content.classList.remove("jsPanel-content-nofooter"),s.contentResize(),n&&n.call(s,s),s},s.applyBuiltInTheme=function(e){return s.classList.add("jsPanel-theme-"+e.color),s.header.classList.add("jsPanel-theme-"+e.color),e.filling&&(s.content.style.background="",s.content.classList.add("jsPanel-content-"+e.filling)),n.headerToolbar||(s.content.style.background="",s.content.style.borderTop="1px solid "+s.headertitle.style.color),s},s.applyArbitraryTheme=function(e){return s.header.style.backgroundColor=e.colors[0],[".jsPanel-headerlogo",".jsPanel-title",".jsPanel-hdr-toolbar"].forEach(function(t){s.querySelector(t).style.color=e.colors[3]},s),s.querySelectorAll(".jsPanel-controlbar .jsPanel-btn").forEach(function(t){t.style.color=e.colors[3]}),n.headerToolbar?jsPanel.setStyle(s.headertoolbar,{boxShadow:"0 0 1px "+e.colors[3]+" inset",width:"calc(100% + 4px)",marginLeft:"-1px"}):s.content.style.borderTop="1px solid "+e.colors[3],"filled"===e.filling?(s.content.style.backgroundColor=e.colors[0],s.content.style.color=e.colors[3]):"filledlight"===e.filling&&(s.content.style.backgroundColor=e.colors[1]),s},s.applyBootstrapTheme=function(e){var t=e.bstheme,n=$.fn.button.Constructor.VERSION[0];if("4"===n?s.classList.add("bg-"+t):(["panel","panel-"+t].forEach(function(e){s.classList.add(e)}),s.header.classList.add("panel-heading")),"mdb"===e.bs){var a=t+"-color";e.mdbStyle&&(a+="-dark"),s.classList.add(a)}var o="4"===n?window.getComputedStyle(s).backgroundColor.replace(/\s+/g,""):window.getComputedStyle(s.header).backgroundColor.replace(/\s+/g,"");var i=jsPanel.calcColors(o);return s.header.style.color=i[3],e.filling?s.setTheme(o+" "+e.filling):s.setTheme(o),s},s.applyThemeBorder=function(e){var t=n.border.split(" ");if(s.style.borderWidth=t[0],s.style.borderStyle=t[1],s.style.borderColor=t[2],!e.bs)-1===jsPanel.themes.indexOf(e.color)&&(t[2]?s.style.borderColor=t[2]:s.style.borderColor=e.colors[0]);else{var a;a="transparent"===window.getComputedStyle(s.header).backgroundColor?window.getComputedStyle(s).backgroundColor.replace(/\s+/g,""):window.getComputedStyle(s.header).backgroundColor.replace(/\s+/g,""),s.style.borderColor=t[2]?t[2]:a}return s},s.autopositionRemaining=function(){var e;["left-top-down","left-top-right","center-top-down","right-top-down","right-top-left","left-bottom-up","left-bottom-right","center-bottom-up","right-bottom-up","right-bottom-left"].forEach(function(t){s.classList.contains(t)&&(e=t)}),e&&n.container.querySelectorAll("."+e).forEach(function(e){e.reposition()})},s.calcSizeFactors=function(){var e=window.getComputedStyle(s);if(n.container===document.body)s.hf=parseFloat(s.style.left)/(document.body.clientWidth-parseFloat(s.style.width)),s.vf=parseFloat(s.style.top)/(window.innerHeight-parseFloat(e.height));else{var t=window.getComputedStyle(s.parentElement);s.hf=parseFloat(s.style.left)/(parseFloat(t.width)-parseFloat(s.style.width)),s.vf=parseFloat(s.style.top)/(parseFloat(t.height)-parseFloat(e.height))}},s.clearTheme=function(e){return jsPanel.themes.concat(jsPanel.mdbthemes).forEach(function(e){["panel","jsPanel-theme-"+e,"panel-"+e,e+"-color"].forEach(function(e){s.classList.remove(e)}),s.header.classList.remove("panel-heading","jsPanel-theme-"+e)},s),s.headertitle.classList.remove("panel-title"),s.content.classList.remove("panel-body","jsPanel-content-filled","jsPanel-content-filledlight"),s.footer.classList.remove("panel-footer"),jsPanel.setStyle(s,{backgroundColor:"",borderWidth:"",borderStyle:"",borderColor:""}),jsPanel.setStyle(s.content,{background:"",border:""}),jsPanel.setStyle(s.headertoolbar,{boxShadow:"",width:"",marginLeft:""}),s.header.style.background="",Array.prototype.slice.call(s.controlbar.querySelectorAll(".jsPanel-icon")).concat([s.headerlogo,s.headertitle,s.headertoolbar,s.content]).forEach(function(e){e.style.color=""}),e&&e.call(s,s),s},s.close=function(e){var t=function(){var t=n.id;return a&&window.clearTimeout(a),s.closeChildpanels(),s.parentElement&&s.parentElement.removeChild(s),!document.getElementById(t)&&void(s.removeMinimizedReplacement(),document.dispatchEvent(c),e&&e.call(t,t),n.onclosed&&jsPanel.processCallbacks(s,n.onclosed,"every"),s.autopositionRemaining())};return document.dispatchEvent(d),n.onbeforeclose&&0<n.onbeforeclose.length&&!jsPanel.processCallbacks(s,n.onbeforeclose)?s:void(n.animateOut?(n.animateIn&&jsPanel.remClass(s,n.animateIn),jsPanel.setClass(s,n.animateOut),s.addEventListener("animationend",function(){t()})):t())},s.closeChildpanels=function(e){return s.getChildpanels().forEach(function(e){return e.close()}),e&&e.call(s,s),s},s.contentRemove=function(e){return jsPanel.emptyNode(s.content),e&&e.call(s,s),s},s.contentResize=function(e){var t=window.getComputedStyle(s),a=window.getComputedStyle(s.header),o=window.getComputedStyle(s.footer),i=n.header?a.height:0,l="none"===o.display?0:o.height,r=parseFloat(t.height)-parseFloat(i)-parseFloat(l)-parseFloat(t.borderTopWidth)-parseFloat(t.borderBottomWidth);return s.content.style.height=r+"px",e&&e.call(s,s),s},s.createMinimizedReplacement=function(){var e=jsPanel.createMinimizedTemplate(),t=window.getComputedStyle(s.headertitle).color,a=n.iconfont,o=e.querySelector(".jsPanel-controlbar");return e.style.backgroundColor="transparent"===window.getComputedStyle(s.header).backgroundColor?window.getComputedStyle(s).backgroundColor:window.getComputedStyle(s.header).backgroundColor,e.id=s.id+"-min",e.querySelector(".jsPanel-headerbar").replaceChild(s.headerlogo.cloneNode(!0),e.querySelector(".jsPanel-headerlogo")),e.querySelector(".jsPanel-titlebar").replaceChild(s.headertitle.cloneNode(!0),e.querySelector(".jsPanel-title")),e.querySelector(".jsPanel-title").style.color=t,o.style.color=t,s.setIconfont(a,e),"enabled"===s.dataset.btnnormalize?jsPanel.pointerup.forEach(function(t){e.querySelector(".jsPanel-btn-normalize").addEventListener(t,function(){s.normalize().removeMinimizedReplacement()})}):o.querySelector(".jsPanel-btn-normalize").style.display="none","enabled"===s.dataset.btnmaximize?jsPanel.pointerup.forEach(function(t){e.querySelector(".jsPanel-btn-maximize").addEventListener(t,function(){s.maximize().removeMinimizedReplacement()})}):o.querySelector(".jsPanel-btn-maximize").style.display="none","enabled"===s.dataset.btnclose?jsPanel.pointerup.forEach(function(t){e.querySelector(".jsPanel-btn-close").addEventListener(t,function(){s.removeMinimizedReplacement().close()})}):o.querySelector(".jsPanel-btn-close").style.display="none",e},s.dragit=function(e){var t=Object.assign({},jsPanel.defaults.dragit,n.dragit),a=s.querySelectorAll(t.handles);return"disable"===e?a.forEach(function(e){e.style.pointerEvents="none"}):a.forEach(function(e){e.style.pointerEvents="auto"}),s},s.front=function(e){var t=!(1<arguments.length&&void 0!==arguments[1])||arguments[1];return jsPanel.front(s),document.dispatchEvent(x),e&&e.call(s,s),n.onfronted&&t&&jsPanel.processCallbacks(s,n.onfronted,"every"),s},s.getChildpanels=function(){return Array.prototype.slice.call(s.content.querySelectorAll(".jsPanel"))},s.getThemeDetails=function(e){var t=e.toLowerCase().replace(/ /g,""),n={color:!1,colors:!1,filling:!1,bs:!1,bstheme:!1};if("filled"===t.substr(-6,6)?(n.filling="filled",n.color=t.substr(0,t.length-6)):"filledlight"===t.substr(-11,11)?(n.filling="filledlight",n.color=t.substr(0,t.length-11)):(n.filling="",n.color=t),n.colors=jsPanel.calcColors(n.color),n.color.match("-")){var a=n.color.split("-");n.bs=a[0],n.bstheme=a[1],n.mdbStyle=a[2]||void 0}return n},s.isChildpanel=function(){var e=s.closest(".jsPanel-content");return!!e&&e.parentElement},s.maximize=function(e){if(n.onbeforemaximize&&0<n.onbeforemaximize.length&&!jsPanel.processCallbacks(s,n.onbeforemaximize))return s;document.dispatchEvent(f);var t=s.parentElement,a=n.maximizedMargin;return t===document.body?(s.style.width=document.documentElement.clientWidth-a[1]-a[3]+"px",s.style.height=document.documentElement.clientHeight-a[0]-a[2]+"px",s.style.left=a[3]+"px",s.style.top=a[0]+"px",!n.position.fixed&&(s.style.left=window.pageXOffset+a[3]+"px",s.style.top=window.pageYOffset+a[0]+"px")):(s.style.width=t.clientWidth-a[1]-a[3]+"px",s.style.height=t.clientHeight-a[0]-a[2]+"px",s.style.left=a[3]+"px",s.style.top=a[0]+"px"),s.contentResize(),s.removeMinimizedReplacement(),s.status="maximized",s.setControls([".jsPanel-btn-maximize",".jsPanel-btn-smallifyrev"]),jsPanel.front(s),document.dispatchEvent(g),document.dispatchEvent(h),n.onstatuschange&&jsPanel.processCallbacks(s,n.onstatuschange,"every"),e&&e.call(s,s),n.onmaximized&&jsPanel.processCallbacks(s,n.onmaximized,"every"),s},s.minimize=function(e){if("minimized"===s.status)return s;if(n.onbeforeminimize&&0<n.onbeforeminimize.length&&!jsPanel.processCallbacks(s,n.onbeforeminimize))return s;if(document.dispatchEvent(u),!document.getElementById("jsPanel-replacement-container")){var t=document.createElement("div");t.id="jsPanel-replacement-container",document.body.append(t)}if(s.style.left="-9999px",s.statusBefore=s.status,s.status="minimized",document.dispatchEvent(b),document.dispatchEvent(h),n.onstatuschange&&jsPanel.processCallbacks(s,n.onstatuschange,"every"),n.minimizeTo){var a=s.createMinimizedReplacement(),o=void 0,i=void 0,l=void 0;"default"===n.minimizeTo?document.getElementById("jsPanel-replacement-container").append(a):"parentpanel"===n.minimizeTo?(i=s.closest(".jsPanel-content").parentElement,l=i.querySelectorAll(".jsPanel-minimized-box"),o=l[l.length-1],o.append(a)):"parent"===n.minimizeTo?(i=s.parentElement,o=i.querySelector(".jsPanel-minimized-container"),!o&&(o=document.createElement("div"),o.className="jsPanel-minimized-container",i.append(o)),o.append(a)):document.querySelector(n.minimizeTo).append(a)}return e&&e.call(s,s),n.onminimized&&jsPanel.processCallbacks(s,n.onminimized,"every"),s},s.normalize=function(e){return"normalized"===s.status?s:n.onbeforenormalize&&0<n.onbeforenormalize.length&&!jsPanel.processCallbacks(s,n.onbeforenormalize)?s:(document.dispatchEvent(p),s.style.width=s.currentData.width,s.style.height=s.currentData.height,s.contentResize(),s.style.left=s.currentData.left,s.style.top=s.currentData.top,s.removeMinimizedReplacement(),s.status="normalized",s.setControls([".jsPanel-btn-normalize",".jsPanel-btn-smallifyrev"]),jsPanel.front(s),document.dispatchEvent(m),document.dispatchEvent(h),n.onstatuschange&&jsPanel.processCallbacks(s,n.onstatuschange,"every"),e&&e.call(s,s),n.onnormalized&&jsPanel.processCallbacks(s,n.onnormalized,"every"),s)},s.removeMinimizedReplacement=function(){var e=document.getElementById(s.id+"-min");return e&&e.parentElement.removeChild(e),s},s.reposition=function(){for(var e=arguments.length,t=Array(e),a=0;a<e;a++)t[a]=arguments[a];var o,i=n.position,l=!0;return t.forEach(function(e){"string"==typeof e||"object"===("undefined"==typeof e?"undefined":_typeof(e))?i=e:"boolean"==typeof e?l=e:"function"==typeof e&&(o=e)}),jsPanel.position(s,i),l&&s.saveCurrentPosition(),o&&o.call(s,s),s},s.repositionOnSnap=function(e){var t="0",a="0",o=jsPanel.pOcontainment(n.dragit.containment);n.dragit.snap.containment&&("left-top"===e?(t=o[3],a=o[0]):"right-top"===e?(t=-o[1],a=o[0]):"right-bottom"===e?(t=-o[1],a=-o[2]):"left-bottom"===e?(t=o[3],a=-o[2]):"center-top"===e?(t=o[3]/2-o[1]/2,a=o[0]):"center-bottom"===e?(t=o[3]/2-o[1]/2,a=-o[2]):"left-center"===e?(t=o[3],a=o[0]/2-o[2]/2):"right-center"==e&&(t=-o[1],a=o[0]/2-o[2]/2)),jsPanel.position(s,e),jsPanel.setStyle(s,{left:"calc("+s.style.left+" + "+t+"px)",top:"calc("+s.style.top+" + "+a+"px)"})},s.resize=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];var a=window.getComputedStyle(s),o={width:a.width,height:a.height},i=!0,l=void 0;t.forEach(function(e){"string"==typeof e?o=e:"object"===("undefined"==typeof e?"undefined":_typeof(e))?o=Object.assign(o,e):"boolean"==typeof e?i=e:"function"==typeof e&&(l=e)});var r=jsPanel.pOsize(s,o);return s.style.width=r.width,s.style.height=r.height,s.contentResize(),i&&s.saveCurrentDimensions(),l&&l.call(s,s),s},s.resizeit=function(e){var t=s.querySelectorAll(".jsPanel-resizeit-handle");return"disable"===e?t.forEach(function(e){e.style.pointerEvents="none"}):t.forEach(function(e){e.style.pointerEvents="auto"}),s},s.saveCurrentDimensions=function(){var e=window.getComputedStyle(s);s.currentData.width=e.width,"normalized"===s.status&&(s.currentData.height=e.height)},s.saveCurrentPosition=function(){var e=window.getComputedStyle(s);s.currentData.left=e.left,s.currentData.top=e.top},s.setControls=function(e,t){return s.header.querySelectorAll(".jsPanel-btn").forEach(function(e){e.style.display="block"}),e.forEach(function(e){var t=s.controlbar.querySelector(e);t&&(t.style.display="none")}),t&&t.call(s,s),s},s.setControlStatus=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"enable",n=arguments[2];if("disable"===t){if("removed"!==s.getAttribute("data-btn"+e)){s.setAttribute("data-btn"+e,"disabled");var a=s.controlbar.querySelector(".jsPanel-btn-"+e);a.style.pointerEvents="none",a.style.opacity=.4,a.style.cursor="default"}}else if("enable"===t){if("removed"!==s.getAttribute("data-btn"+e)){s.setAttribute("data-btn"+e,"enabled");var o=s.controlbar.querySelector(".jsPanel-btn-"+e);o.style.pointerEvents="auto",o.style.opacity=1,o.style.cursor="pointer"}}else if("remove"===t){var i=s.controlbar.querySelector(".jsPanel-btn-"+e);s.controlbar.removeChild(i),s.setAttribute("data-btn"+e,"removed")}return n&&n.call(s,s),s},s.setHeaderControls=function(e){var t=["close","maximize","normalize","minimize","smallify","smallifyrev"],a=n.headerControls;return"string"==typeof a?"none"===a?t.forEach(function(e){s.setControlStatus(e,"remove")}):"closeonly"===a&&t.forEach(function(e){"close"!==e&&s.setControlStatus(e,"remove")}):t.forEach(function(e){a[e]&&s.setControlStatus(e,a[e])}),e&&e.call(s,s),s},s.setHeaderLogo=function(e,t){if("string"!=typeof e)jsPanel.emptyNode(s.headerlogo),s.headerlogo.append(e);else if("<"!==e.substr(0,1)){var n=document.createElement("img");n.style.maxHeight=getComputedStyle(s.headerbar).height,n.src=e,jsPanel.emptyNode(s.headerlogo),s.headerlogo.append(n)}else s.headerlogo.innerHTML=e;return t&&t.call(s,s),s},s.setHeaderRemove=function(e){return s.removeChild(s.header),s.content.classList.add("jsPanel-content-noheader"),["close","maximize","normalize","minimize","smallify","smallifyrev"].forEach(function(e){s.setAttribute("data-btn"+e,"removed")}),e&&e.call(s,s),s},s.setHeaderTitle=function(e,t){return"string"==typeof e?s.headertitle.innerHTML=e:"function"==typeof e?(jsPanel.emptyNode(s.headertitle),s.headertitle.innerHTML=e()):(jsPanel.emptyNode(s.headertitle),s.headertitle.append(e)),t&&t.call(s,s),s},s.setIconfont=function(){var e=!!(0<arguments.length&&void 0!==arguments[0])&&arguments[0],t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:s,n=arguments[2];if(!1!==e){var a,o;if("bootstrap"===e||"glyphicon"===e)a=["glyphicon glyphicon-remove","glyphicon glyphicon-fullscreen","glyphicon glyphicon-resize-full","glyphicon glyphicon-minus","glyphicon glyphicon-chevron-down","glyphicon glyphicon-chevron-up"];else if("fa"===e||"far"===e||"fal"===e||"fas"===e)a=[e+" fa-window-close",e+" fa-window-maximize",e+" fa-window-restore",e+" fa-window-minimize",e+" fa-chevron-down",e+" fa-chevron-up"],s.controlbar.style.padding="6px 0 3px 0";else if("material-icons"===e)a=[e,e,e,e,e,e],o=["close","fullscreen","fullscreen_exit","call_received","expand_more","expand_less"],s.controlbar.style.padding="4px 0 5px 0";else if(Array.isArray(e))a=["custom-control-icon "+e[5],"custom-control-icon "+e[4],"custom-control-icon "+e[3],"custom-control-icon "+e[2],"custom-control-icon "+e[1],"custom-control-icon "+e[0]];else return t;t.querySelectorAll(".jsPanel-controlbar .jsPanel-btn").forEach(function(e){jsPanel.emptyNode(e).innerHTML="<span></span>"}),Array.prototype.slice.call(t.querySelectorAll(".jsPanel-controlbar .jsPanel-btn > span")).reverse().forEach(function(t,n){t.className=a[n],"material-icons"===e&&(t.textContent=o[n])})}return n&&n.call(t,t),t},s.setRtl=function(){[s.header,s.headerbar,s.titlebar,s.controlbar,s.headertoolbar,s.footer].forEach(function(e){e.classList.add("jsPanel-rtl")}),[s.headertitle,s.headertoolbar,s.content,s.footer].forEach(function(e){e.dir="rtl",n.rtl.lang&&(e.lang=n.rtl.lang)})},s.setSize=function(){if(n.panelSize){var e=jsPanel.pOsize(s,n.panelSize);s.style.width=e.width,s.style.height=e.height,s.contentResize()}else if(n.contentSize){var t=jsPanel.pOsize(s,n.contentSize);s.content.style.width=t.width,s.content.style.height=t.height,s.style.width=t.width,s.content.style.width="100%"}return s},s.setTheme=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:n.theme,t=arguments[1];if(s.clearTheme(),"none"===e)return s.style.backgroundColor="#fff",s;var a=s.getThemeDetails(e);return a.bs?s.applyBootstrapTheme(a):-1===jsPanel.themes.indexOf(a.color)?s.applyArbitraryTheme(a):s.applyBuiltInTheme(a),n.border?s.applyThemeBorder(a):(s.style.borderWidth="",s.style.borderStyle="",s.style.borderColor=""),t&&t.call(s,s),s},s.smallify=function(e){if("smallified"===s.status||"smallifiedmax"===s.status)return s;if(n.onbeforesmallify&&0<n.onbeforesmallify.length&&!jsPanel.processCallbacks(s,n.onbeforesmallify))return s;document.dispatchEvent(y),"normalized"===s.status&&s.saveCurrentDimensions(),s.style.overflow="hidden",s.style.height=window.getComputedStyle(s.headerbar).height,"normalized"===s.status?(s.setControls([".jsPanel-btn-normalize",".jsPanel-btn-smallify"]),s.status="smallified",document.dispatchEvent(v),document.dispatchEvent(h),n.onstatuschange&&jsPanel.processCallbacks(s,n.onstatuschange,"every")):"maximized"===s.status&&(s.setControls([".jsPanel-btn-maximize",".jsPanel-btn-smallify"]),s.status="smallifiedmax",document.dispatchEvent(z),document.dispatchEvent(h),n.onstatuschange&&jsPanel.processCallbacks(s,n.onstatuschange,"every"));var t=s.querySelectorAll(".jsPanel-minimized-box");return t[t.length-1].style.display="none",e&&e.call(s,s),n.onsmallified&&jsPanel.processCallbacks(s,n.onsmallified,"every"),s},s.unsmallify=function(e){if("smallified"===s.status||"smallifiedmax"===s.status){if(n.onbeforeunsmallify&&0<n.onbeforeunsmallify.length&&!jsPanel.processCallbacks(s,n.onbeforeunsmallify))return s;document.dispatchEvent(w),s.style.overflow="visible",jsPanel.front(s),"smallified"===s.status?(s.style.height=s.currentData.height,s.setControls([".jsPanel-btn-normalize",".jsPanel-btn-smallifyrev"]),s.contentResize(),s.status="normalized",document.dispatchEvent(m),document.dispatchEvent(h),n.onstatuschange&&jsPanel.processCallbacks(s,n.onstatuschange,"every")):"smallifiedmax"===s.status?s.maximize():"minimized"===s.status&&s.normalize();var t=s.querySelectorAll(".jsPanel-minimized-box");t[t.length-1].style.display="flex",e&&e.call(s,s),n.onunsmallified&&jsPanel.processCallbacks(s,n.onunsmallified,"every")}return s},s.id=n.id,s.classList.add("jsPanel-"+n.paneltype),"standard"===n.paneltype&&(s.style.zIndex=this.zi.next()),l.append(s),s.front(!1,!1),s.setTheme(n.theme),n.boxShadow&&s.classList.add("jsPanel-depth-"+n.boxShadow),!n.header)s.setHeaderRemove();else if(n.headerLogo&&s.setHeaderLogo(n.headerLogo),s.setIconfont(n.iconfont),s.setHeaderTitle(n.headerTitle),s.setHeaderControls(),"auto-show-hide"===n.header){var q,A=n.theme.split("-"),W="jsPanel-depth-"+n.boxShadow,R="bg-";A[1]&&(R+=A[1]),A[2]&&(q=A[1]+"-color-"+A[2]),s.header.style.opacity=0,("bootstrap"===A[0]||"mdb"===A[0])&&(this.remClass(s,R),"mdb"===A[0]&&this.remClass(s,q)),s.style.backgroundColor="transparent",this.remClass(s,W),this.setClass(s.content,W),s.header.addEventListener("mouseenter",function(){s.header.style.opacity=1,("bootstrap"===A[0]||"mdb"===A[0])&&(jsPanel.setClass(s,R),"mdb"===A[0]&&jsPanel.setClass(s,q)),jsPanel.setClass(s,W),jsPanel.remClass(s.content,W)}),s.header.addEventListener("mouseleave",function(){s.header.style.opacity=0,("bootstrap"===A[0]||"mdb"===A[0])&&(jsPanel.remClass(s,R),"mdb"===A[0]&&jsPanel.remClass(s,q)),jsPanel.remClass(s,W),jsPanel.setClass(s.content,W)})}if(n.headerToolbar&&s.addToolbar(s.headertoolbar,n.headerToolbar),n.footerToolbar&&s.addToolbar(s.footer,n.footerToolbar),n.content&&("function"==typeof n.content?n.content.call(s,s):"string"==typeof n.content?s.content.innerHTML=n.content:s.content.append(n.content)),n.contentAjax&&this.ajax(s,n.contentAjax),n.contentFetch&&this.fetch(s),n.contentOverflow){var B=n.contentOverflow.split(" ");1===B.length?s.content.style.overflow=B[0]:2===B.length&&(s.content.style.overflowX=B[0],s.content.style.overflowY=B[1])}if(n.rtl&&s.setRtl(),s.setSize(),s.status="normalized",n.position||"cursor"!==n.position?this.position(s,n.position):s.style.opacity=1,document.dispatchEvent(m),s.calcSizeFactors(),n.animateIn&&(s.addEventListener("animationend",function(){e.remClass(s,n.animateIn)}),this.setClass(s,n.animateIn)),n.syncMargins){var H=this.pOcontainment(n.maximizedMargin);n.dragit&&(n.dragit.containment=H,n.dragit.snap&&(n.dragit.snap.containment=!0)),n.resizeit&&(n.resizeit.containment=H)}if(n.dragit?(this.dragit(s,n.dragit),document.addEventListener("jspaneldragstop",function(t){t.detail===s.id&&s.calcSizeFactors()},!1)):s.titlebar.style.cursor="default",n.resizeit){this.resizeit(s,n.resizeit);var M;document.addEventListener("jspanelresizestart",function(t){t.detail===s.id&&(M=s.status)},!1),document.addEventListener("jspanelresizestop",function(t){t.detail===s.id&&("smallified"===M||"smallifiedmax"===M||"maximized"===M)&&parseFloat(s.style.height)>parseFloat(window.getComputedStyle(s.header).height)&&(s.setControls([".jsPanel-btn-normalize",".jsPanel-btn-smallifyrev"]),s.status="normalized",document.dispatchEvent(m),document.dispatchEvent(h),n.onstatuschange&&jsPanel.processCallbacks(s,n.onstatuschange,"every"),s.calcSizeFactors())},!1)}if(s.saveCurrentDimensions(),s.saveCurrentPosition(),n.setStatus){var O=n.setStatus;if("smallifiedmax"===O)s.maximize().smallify();else if("smallified"===O)s.smallify();else{var D=O.substr(0,O.length-1);s[D]()}}return n.autoclose&&(a=window.setTimeout(function(){s&&s.close()},n.autoclose)),this.pointerdown.forEach(function(e){s.addEventListener(e,function(t){t.target.closest(".jsPanel-btn-close")||t.target.closest(".jsPanel-btn-minimize")||"standard"!==n.paneltype||s.front()},!1)}),n.onwindowresize&&window.addEventListener("resize",function(t){if(t.target===window){var e=n.onwindowresize,a=s.status,o=window.getComputedStyle(s.parentElement);"maximized"===a&&!0===e?s.maximize():("normalized"===a||"smallified"===a||"maximized"===a)&&("function"==typeof e?e.call(s,t,s):(s.style.left=function(){var e;return e=n.container===document.body?(document.body.clientWidth-parseFloat(s.style.width))*s.hf:(parseFloat(o.width)-parseFloat(s.style.width))*s.hf,0>=e?0:e+"px"}(),s.style.top=function(){var e;return e=n.container===document.body?(window.innerHeight-parseFloat(s.currentData.height))*s.vf:(parseFloat(o.height)-parseFloat(s.currentData.height))*s.vf,0>=e?0:e+"px"}()))}},!1),this.pointerup.forEach(function(e){s.addEventListener(e,function(){s.content.style.pointerEvents="inherit"})}),this.globalCallbacks&&(Array.isArray(this.globalCallbacks)?this.globalCallbacks.forEach(function(e){e.call(s,s)}):this.globalCallbacks.call(s,s)),n.callback&&(Array.isArray(n.callback)?n.callback.forEach(function(e){e.call(s,s)}):n.callback.call(s,s)),t&&t.call(s,s),document.dispatchEvent(r),s}};

/***/ }),

/***/ "./node_modules/process/browser.js":
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__("./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/devtools/TestDevice.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __webpack_require__("../index");
const Messages = __webpack_require__("../index");
class TestDevice extends index_1.ButtplugDevice {
    constructor(name, shouldVibrate = false, shouldLinear = false, shouldRotate = false) {
        super(`Test Device - ${name}`, "TestDevice" + (shouldVibrate ? "Vibrate" : "") + (shouldLinear ? "Linear" : ""));
        this._connected = false;
        this._linearSpeed = 0;
        this._linearPosition = 0;
        this._vibrateSpeed = 0;
        this._rotateSpeed = 0;
        this._rotateClockwise = false;
        this.HandleStopDeviceCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            if (this.MsgFuncs.has(Messages.VibrateCmd.name)) {
                this.emit("vibrate", 0);
            }
            else if (this.MsgFuncs.has(Messages.LinearCmd.name)) {
                this.emit("linear", { position: this._linearPosition,
                    speed: this._linearSpeed });
            }
            return Promise.resolve(new Messages.Ok(aMsg.Id));
        });
        this.HandleSingleMotorVibrateCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            this._vibrateSpeed = aMsg.Speed;
            this.emit("vibrate", aMsg.Speed);
            return Promise.resolve(new Messages.Ok(aMsg.Id));
        });
        this.HandleVibrateCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            return this.HandleSingleMotorVibrateCmd(new index_1.SingleMotorVibrateCmd(aMsg.Speeds[0].Speed, aMsg.DeviceIndex, aMsg.Id));
        });
        this.HandleRotateCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            this._rotateSpeed = aMsg.Rotations[0].Speed;
            this._rotateClockwise = aMsg.Rotations[0].Clockwise;
            this.emit("vibrate", { speed: this._rotateSpeed,
                clockwise: this._rotateClockwise });
            return Promise.resolve(new Messages.Ok(aMsg.Id));
        });
        this.HandleFleshlightLaunchFW12Cmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            this._linearPosition = aMsg.Position;
            this._linearSpeed = aMsg.Speed;
            this.emit("linear", { position: this._linearPosition,
                speed: this._linearSpeed });
            return Promise.resolve(new Messages.Ok(aMsg.Id));
        });
        this.HandleLinearCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            if (aMsg.Vectors.length !== 1) {
                return new Messages.Error("LinearCmd requires 1 vector for this device.", Messages.ErrorClass.ERROR_DEVICE, aMsg.Id);
            }
            // Move between 5/95, otherwise we'll allow the device to smack into hard
            // stops because of braindead firmware.
            const range = 90;
            const vector = aMsg.Vectors[0];
            const currentPosition = vector.Position * 100;
            const positionDelta = Math.abs(currentPosition - this._linearPosition);
            let speed = Math.floor(25000 * Math.pow(((vector.Duration * 90) / positionDelta), -1.05));
            // Clamp speed on 0 <= x <= 95 so we don't break the launch.
            speed = Math.min(Math.max(speed, 0), 95);
            const positionGoal = Math.floor(((currentPosition / 99) * range) + ((99 - range) / 2));
            // We'll set this._lastPosition in FleshlightLaunchFW12Cmd, since
            // everything kinda funnels to that.
            return yield this.HandleFleshlightLaunchFW12Cmd(new Messages.FleshlightLaunchFW12Cmd(speed, positionGoal, aMsg.DeviceIndex, aMsg.Id));
        });
        this.MsgFuncs.set(Messages.StopDeviceCmd.name, this.HandleStopDeviceCmd);
        if (shouldVibrate) {
            this.MsgFuncs.set(Messages.SingleMotorVibrateCmd.name, this.HandleSingleMotorVibrateCmd);
            this.MsgFuncs.set(Messages.VibrateCmd.name, this.HandleVibrateCmd);
        }
        if (shouldLinear) {
            this.MsgFuncs.set(Messages.FleshlightLaunchFW12Cmd.name, this.HandleFleshlightLaunchFW12Cmd);
            this.MsgFuncs.set(Messages.LinearCmd.name, this.HandleLinearCmd);
        }
        if (shouldRotate) {
            this.MsgFuncs.set(Messages.RotateCmd.name, this.HandleRotateCmd);
        }
    }
    get Connected() {
        return this._connected;
    }
    set Connected(connected) {
        this._connected = connected;
    }
    get MessageSpecifications() {
        if (this.MsgFuncs.has(Messages.VibrateCmd.name)) {
            return {
                VibrateCmd: { FeatureCount: 2 },
                SingleMotorVibrateCmd: {},
                StopDeviceCmd: {},
            };
        }
        else if (this.MsgFuncs.has(Messages.LinearCmd.name)) {
            return {
                LinearCmd: { FeatureCount: 1 },
                FleshlightLaunchFW12Cmd: {},
                StopDeviceCmd: {},
            };
        }
        else if (this.MsgFuncs.has(Messages.RotateCmd.name)) {
            return {
                RotateCmd: { FeatureCount: 1 },
                StopDeviceCmd: {},
            };
        }
        return {};
    }
    Disconnect() {
        this._connected = false;
        this.emit("deviceremoved", this);
    }
}
exports.TestDevice = TestDevice;


/***/ }),

/***/ "./src/devtools/TestDeviceManager.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __webpack_require__("./node_modules/events/events.js");
const TestDevice_1 = __webpack_require__("./src/devtools/TestDevice.ts");
const index_1 = __webpack_require__("../index");
class TestDeviceManager extends events_1.EventEmitter {
    constructor() {
        super();
        this._isScanning = false;
        this._testVibrationDevice = new TestDevice_1.TestDevice("Test Vibration Device", true, false, false);
        this._testLinearDevice = new TestDevice_1.TestDevice("Test Linear Device", false, true, false);
        this._testRotationDevice = new TestDevice_1.TestDevice("Test Rotation Device", false, false, true);
    }
    ConnectVibrationDevice() {
        index_1.ButtplugLogger.Logger.Debug("TestDeviceManager: Connecting Vibration Device");
        this._testVibrationDevice.Connected = true;
        this.emit("deviceadded", this._testVibrationDevice);
    }
    ConnectLinearDevice() {
        index_1.ButtplugLogger.Logger.Debug("TestDeviceManager: Connecting Linear Device");
        this._testLinearDevice.Connected = true;
        this.emit("deviceadded", this._testLinearDevice);
    }
    ConnectRotationDevice() {
        index_1.ButtplugLogger.Logger.Debug("TestDeviceManager: Connecting Rotation Device");
        this._testRotationDevice.Connected = true;
        this.emit("deviceadded", this._testRotationDevice);
    }
    StartScanning() {
        index_1.ButtplugLogger.Logger.Debug("TestDeviceManager: Starting Scan");
        this._isScanning = true;
        // Always emit devices. If they're duplicates, the device manager will weed
        // them out.
        setTimeout(() => {
            this.ConnectVibrationDevice();
            this.ConnectLinearDevice();
            this.ConnectRotationDevice();
        }, 50);
        setTimeout(() => this.StopScanning(), 100);
    }
    get VibrationDevice() {
        return this._testVibrationDevice;
    }
    get LinearDevice() {
        return this._testLinearDevice;
    }
    get RotationDevice() {
        return this._testRotationDevice;
    }
    StopScanning() {
        index_1.ButtplugLogger.Logger.Debug("TestDeviceManager: Stopping Scan");
        this._isScanning = false;
        this.emit("scanningfinished");
    }
    get IsScanning() {
        return this._isScanning;
    }
}
exports.TestDeviceManager = TestDeviceManager;


/***/ }),

/***/ "./src/devtools/utils.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __webpack_require__("../index");
const TestDeviceManager_1 = __webpack_require__("./src/devtools/TestDeviceManager.ts");
function CreateDevToolsClient() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new index_1.ButtplugClient("Test Client");
        const server = new index_1.ButtplugServer("Test Server");
        server.ClearDeviceManagers();
        server.AddDeviceManager(new TestDeviceManager_1.TestDeviceManager());
        const localConnector = new index_1.ButtplugEmbeddedServerConnector();
        localConnector.Server = server;
        yield client.Connect(localConnector);
        return Promise.resolve(client);
    });
}
exports.CreateDevToolsClient = CreateDevToolsClient;


/***/ }),

/***/ "./src/devtools/web/LogPanel.css":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("./node_modules/css-loader/index.js!./src/devtools/web/LogPanel.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/devtools/web/LogPanel.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"buttplugdevtoolslogpanel\">\n  <textarea id=\"buttplugdevtoolslogtextarea\" readonly></textarea>\n  <div id=\"buttplugdevtoolsloglevel\">\n    <label>Panel Log Level:</label>\n    <select id=\"buttplugdevtoolsloglevelpanelselect\">\n      <option value=\"Off\">Off</option>\n      <option value=\"Fatal\">Fatal</option>\n      <option value=\"Error\">Error</option>\n      <option value=\"Warn\">Warn</option>\n      <option value=\"Info\">Info</option>\n      <option value=\"Debug\" selected>Debug</option>\n      <option value=\"Trace\">Trace</option>\n    </select>\n    <label>Console Log Level:</label>\n    <select id=\"buttplugdevtoolsloglevelconsoleselect\">\n      <option value=\"Off\" selected>Off</option>\n      <option value=\"Fatal\">Fatal</option>\n      <option value=\"Error\">Error</option>\n      <option value=\"Warn\">Warn</option>\n      <option value=\"Info\">Info</option>\n      <option value=\"Debug\">Debug</option>\n      <option value=\"Trace\">Trace</option>\n    </select>\n  </div>\n</div>\n";

/***/ }),

/***/ "./src/devtools/web/LogPanel.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __webpack_require__("../index");
const jsPanel = __webpack_require__("./node_modules/jspanel4/es6module/jspanel.min.js");
__webpack_require__("./node_modules/jspanel4/dist/jspanel.css");
const logPanelHTML = __webpack_require__("./src/devtools/web/LogPanel.html").toString();
__webpack_require__("./src/devtools/web/LogPanel.css");
class LogPanel {
    constructor() {
        this.logTextArea = document.getElementById("buttplugdevtoolslogtextarea");
        this.panelLevelSelect = document.getElementById("buttplugdevtoolsloglevelpanelselect");
        this.consoleLevelSelect = document.getElementById("buttplugdevtoolsloglevelconsoleselect");
        const log = index_1.ButtplugLogger.Logger;
        log.addListener("log", (msg) => {
            this.addLogMessage(msg);
        });
        this.panelLevelSelect.addEventListener("change", () => {
            log.MaximumEventLogLevel = index_1.ButtplugLogLevel[this.panelLevelSelect.value];
        });
        this.consoleLevelSelect.addEventListener("change", () => {
            log.MaximumConsoleLogLevel = index_1.ButtplugLogLevel[this.consoleLevelSelect.value];
        });
        log.MaximumEventLogLevel = index_1.ButtplugLogLevel.Debug;
        log.Debug("LogPanel: DevTools Log panel enabled.");
    }
    static ShowLogPanel() {
        jsPanel.jsPanel.create({
            id: () => "buttplug-logger-panel",
            theme: "primary",
            headerTitle: "Buttplug Log",
            position: "center-top 0 80",
            contentSize: "650 250",
            callback() {
                this.content.innerHTML = logPanelHTML;
                LogPanel._panel = new LogPanel();
            },
        });
    }
    addLogMessage(msg) {
        this.logTextArea.value = this.logTextArea.value + "\n" + msg.FormattedMessage;
    }
}
LogPanel._panel = null;
exports.LogPanel = LogPanel;


/***/ }),

/***/ "./src/devtools/web/TestDeviceManagerPanel.css":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("./node_modules/css-loader/index.js!./src/devtools/web/TestDeviceManagerPanel.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/devtools/web/TestDeviceManagerPanel.html":
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<main>\n  <input id=\"tab1\" type=\"radio\" name=\"tabs\" checked>\n  <label for=\"tab1\">Test Devices</label>\n  <section id=\"content1\">\n    <div id=\"simulator\">\n      <div class=\"vibrator-simulator-component\">\n        <div class=\"vibrator\">\n          <img src=\"" + __webpack_require__("./src/devtools/web/hush.png") + "\"\n               id=\"vibrator-image\">\n        </div>\n        <div id=\"vibrator-info\">\n          <b>Vibration Speed:</b> <span id=\"vibrationspeed\">0</span><br/>\n          <button id=\"vibratedisconnect\">Disconnect</button>\n        </div>\n      </div>\n      <div class=\"simulator-divider\"></div>\n      <div class=\"fleshlight-sim\">\n        <div class=\"c-fleshlight\">\n          <div>\n            <img src=\"" + __webpack_require__("./src/devtools/web/ruler.png") + "\">\n          </div>\n          <div>\n            <img src=\"" + __webpack_require__("./src/devtools/web/fleshlight.png") + "\"\n                 class=\"o-fleshlight\"\n                 id=\"fleshlight-image\">\n          </div>\n        </div>\n        <div>\n          <b>Speed:</b> <span id=\"linearspeed\">0</span><br/>\n          <b>Position:</b> <span id=\"linearposition\">0</span><br/>\n          <button id=\"lineardisconnect\">Disconnect</button>\n        </div>\n      </div>\n    </div>\n  </section>\n</main>\n";

/***/ }),

/***/ "./src/devtools/web/TestDeviceManagerPanel.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __webpack_require__("../index");
const TWEEN = __webpack_require__("./node_modules/@tweenjs/tween.js/src/Tween.js");
const jsPanel = __webpack_require__("./node_modules/jspanel4/es6module/jspanel.min.js");
__webpack_require__("./node_modules/jspanel4/dist/jspanel.css");
const testPanelHTML = __webpack_require__("./src/devtools/web/TestDeviceManagerPanel.html").toString();
__webpack_require__("./src/devtools/web/TestDeviceManagerPanel.css");
class TestDeviceManagerPanel {
    constructor(tdm) {
        this.currentLaunchPosition = { x: 0, y: 0 };
        this.lastPosition = 0;
        this.moveRadius = 0;
        this.currentVibratePosition = { x: 0, y: 0 };
        this.launchMove = (position, speed) => {
            const p = -((100 - position) * 0.22);
            const duration = this.moveDuration(position, speed);
            new TWEEN.Tween(this.currentLaunchPosition)
                .to({ x: 0, y: p }, duration)
                .start();
            requestAnimationFrame(this.launchAnimate);
        };
        this.launchAnimate = (timestamp) => {
            if (!TWEEN.update()) {
                return;
            }
            this.fleshlightElement.style.bottom = `${this.currentLaunchPosition.y}%`;
            requestAnimationFrame(this.launchAnimate);
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
            requestAnimationFrame(this.vibrateAnimate);
        };
        this.vibrateAnimate = (timestamp) => {
            if (!TWEEN.update()) {
                if (this.moveRadius !== 0) {
                    new TWEEN.Tween(this.currentVibratePosition)
                        .to({ x: Math.floor(Math.random() * this.moveRadius * 20),
                        y: Math.floor(Math.random() * this.moveRadius * 20) }, 34)
                        .start();
                    requestAnimationFrame(this.vibrateAnimate);
                }
                return;
            }
            this.vibratorElement.style.top = `${this.currentVibratePosition.x}px`;
            this.vibratorElement.style.right = `${this.currentVibratePosition.y}px`;
            requestAnimationFrame(this.vibrateAnimate);
        };
        this._testManager = tdm;
        document.getElementById("vibratedisconnect").addEventListener("click", () => {
            this._testManager.VibrationDevice.Disconnect();
        });
        document.getElementById("lineardisconnect").addEventListener("click", () => {
            this._testManager.LinearDevice.Disconnect();
        });
        this._testManager.VibrationDevice.addListener("vibrate", (speed) => {
            document.getElementById("vibrationspeed").innerHTML = speed;
            this.vibrateMove(speed);
        });
        this._testManager.LinearDevice.addListener("linear", (linearobj) => {
            document.getElementById("linearposition").innerHTML = linearobj.position;
            document.getElementById("linearspeed").innerHTML = linearobj.speed;
            this.launchMove(linearobj.position, linearobj.speed);
        });
        this.fleshlightElement = document.getElementById("fleshlight-image");
        this.vibratorElement = document.getElementById("vibrator-image");
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


/***/ }),

/***/ "./src/devtools/web/fleshlight.png":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAABnCAYAAABPYmGyAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QQeCycTBqT4sQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAANJSURBVHja7Zy/b5tAFMffIdShaTdLjp2tktm68A9075oBpkqZ+wf0b+gf0NlSJjx4zZ7Vw0lWNyN1S1xLWVDVJbJ5HexLAPPjOLgDu+87hRjfvQ/vF3eQMGgmBD1ixr8oYHzfBwCA1WqV+nCz/l365cvxKHU8mUwAACAIgka22aowAqRtiXGDIEAVKAvOTATUrILgeQGxnJRAxNMEQkQjHrKNeYfp945RIFnIrjoyGks7Ux7KNtayOwVEPPLGcHSZOnYcJ3WcuGOgPnSSudI6kGpI6B5bBQh93wff92tPXOQpy7JSMGJ8leKjtWw/rB9zf381GqeO4zjuR9lOVrpsleOcHxmeBHVdt7DKNVkTKedQ2XqoDEZ4iHMOu92u9tjGqxzn/Ojq58l1XVgul2DbNth2e5FvdQGThFosFrTAIyBqrC3DNGmsZxdyKvWSHfbMQMfeXMbz/WisbUBRlSMg6kPUh6gPUR+iPkRlm4CoD1Efoj5EfYiqHAEREDVWaqzUWKmxnnZjzT5fravtdtt4jMZFIU+u6wLnXHqgsid+VBQUkw49z0u9QJEXKsJLZY/1hUezchwn9R7dbDarZaelI3dkn4LryEdtb5JcjcbSb5J03Yekr6Sq4WEYvrxpr7MooOd55pL7kKeHOVFrDlV5p+rvHmTOUc2l/3b5YDTcshJhF/z89uGsPOR//P7LOJBM/qicSzlEQAREQN0DqVSttisdeYiACMgwUBiGrSd30XeL5iIPEdAJAWHXi7vsIq9qf6Fs1wfFrs1hsw+6AhPzC3se1o+F/5qAyQAJFe2zJSdTVZ2xD+fWBhIuljK2zCAZ1Zyj0G4pD4mBdO54yoBk7GF1c+jo6vUl5MpEIdf3kKvloa5DTsZDVTnEcDpHdnNdabTOkIuiCOI4BpzOgd1cM9XGur+TGA4A7+4BNk8gwITevb1ozUNRFBV+9ufH7f6H4UDc3cSqQK9fHA4Ap/PCE99//dII6MXoPO1Bjm1SALooGRhg8yRnkIqyc73qDQA8qwL9rT1pArKh4UV6buKhNq+sEUk9Lse7e4QeiH3+VGkvrVj7Luk3NLoOO5lwqwXUFZgsiDKQSai6MMpAusFUQFoBahusCYjQPxjiryCopLWbAAAAAElFTkSuQmCC"

/***/ }),

/***/ "./src/devtools/web/hush.png":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "./src/devtools/web/index.web.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./src/devtools/TestDevice.ts"));
__export(__webpack_require__("./src/devtools/TestDeviceManager.ts"));
__export(__webpack_require__("./src/devtools/utils.ts"));
__export(__webpack_require__("./src/devtools/web/LogPanel.ts"));
__export(__webpack_require__("./src/devtools/web/TestDeviceManagerPanel.ts"));
__export(__webpack_require__("./src/devtools/web/utils.web.ts"));


/***/ }),

/***/ "./src/devtools/web/ruler.png":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAACFCAYAAACT3zI9AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QQeCh4AjVxe4gAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVEjHY2RgYPjPgAVgCDJhU8WES/UI0M6IppJxNOjIDToybR8VHBUcMoKjaX5UcDTNj1aRo62LAWldAAC8EC2tAEBYXAAAAABJRU5ErkJggg=="

/***/ }),

/***/ "./src/devtools/web/utils.web.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TestDeviceManagerPanel_1 = __webpack_require__("./src/devtools/web/TestDeviceManagerPanel.ts");
const LogPanel_1 = __webpack_require__("./src/devtools/web/LogPanel.ts");
function CreateLoggerPanel() {
    LogPanel_1.LogPanel.ShowLogPanel();
}
exports.CreateLoggerPanel = CreateLoggerPanel;
function CreateDeviceManagerPanel(buttplugServer) {
    TestDeviceManagerPanel_1.TestDeviceManagerPanel.ShowTestDeviceManagerPanel(buttplugServer);
}
exports.CreateDeviceManagerPanel = CreateDeviceManagerPanel;


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvZXh0ZXJuYWwgXCJCdXR0cGx1Z1wiIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9ub2RlX21vZHVsZXMvQHR3ZWVuanMvdHdlZW4uanMvc3JjL1R3ZWVuLmpzIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9ub2RlX21vZHVsZXMvanNwYW5lbDQvZGlzdC9qc3BhbmVsLmNzcyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9Mb2dQYW5lbC5jc3MiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC5jc3MiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9kaXN0L2pzcGFuZWwuY3NzPzM2MWEiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9lczZtb2R1bGUvanNwYW5lbC5taW4uanMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qcyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL1Rlc3REZXZpY2UudHMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy9UZXN0RGV2aWNlTWFuYWdlci50cyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3V0aWxzLnRzIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9zcmMvZGV2dG9vbHMvd2ViL0xvZ1BhbmVsLmNzcz9hZmE2Iiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9zcmMvZGV2dG9vbHMvd2ViL0xvZ1BhbmVsLmh0bWwiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvTG9nUGFuZWwudHMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC5jc3M/ZDFmYyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmh0bWwiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC50cyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9mbGVzaGxpZ2h0LnBuZyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9odXNoLnBuZyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9pbmRleC53ZWIudHMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvcnVsZXIucG5nIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9zcmMvZGV2dG9vbHMvd2ViL3V0aWxzLndlYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7O0FDbkVBLDBCOzs7Ozs7OytDQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUgsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IscUJBQXFCOztBQUV2Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsdUNBQXVDO0FBQ3ZDOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUEsZ0VBQWdFLHNCQUFzQjtBQUN0RjtBQUNBOztBQUVBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLElBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUEsSUFBSTs7QUFFSjs7QUFFQTtBQUNBOztBQUVBLGtFQUFrRSxzQkFBc0I7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7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O0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNILG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7QUM1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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7QUN2THRDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQixtQkFBbUI7QUFDcEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLHNCQUFzQjtBQUN2Qzs7QUFFQTtBQUNBLG1CQUFtQiwyQkFBMkI7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsbUJBQW1CO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsMkJBQTJCO0FBQzVDO0FBQ0E7O0FBRUEsUUFBUSx1QkFBdUI7QUFDL0I7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSxpQkFBaUIsdUJBQXVCO0FBQ3hDO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYzs7QUFFZCxrREFBa0Qsc0JBQXNCO0FBQ3hFO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDMVhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxXQUFXLEVBQUU7QUFDckQsd0NBQXdDLFdBQVcsRUFBRTs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxzQ0FBc0M7QUFDdEMsR0FBRztBQUNIO0FBQ0EsOERBQThEO0FBQzlEOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FB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Qzs7Ozs7OztBQ0FqQyxpQ0FBaUMsNGhIOzs7Ozs7Ozs7Ozs7O0FDQWpDLDhEQUE4QjtBQUM5QixxRUFBcUM7QUFDckMseURBQXlCO0FBQ3pCLGdFQUEyQjtBQUMzQiw4RUFBeUM7QUFDekMsaUVBQTRCOzs7Ozs7OztBQ0w1QixpQ0FBaUMsd1M7Ozs7Ozs7Ozs7QUNBakMscUdBQWtFO0FBQ2xFLHlFQUFzQztBQUd0QztJQUNFLG1CQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7QUFDMUIsQ0FBQztBQUZELDhDQUVDO0FBRUQsa0NBQXlDLGNBQThCO0lBQ3JFLCtDQUFzQixDQUFDLDBCQUEwQixDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3BFLENBQUM7QUFGRCw0REFFQyIsImZpbGUiOiJidXR0cGx1Zy1kZXZ0b29scy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImJ1dHRwbHVnLWRldnRvb2xzLWNvbW1vbmpzXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkJ1dHRwbHVnRGV2VG9vbHNcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9kZXZ0b29scy93ZWIvaW5kZXgud2ViLnRzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBCdXR0cGx1ZzsiLCIvKipcbiAqIFR3ZWVuLmpzIC0gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vdHdlZW5qcy90d2Vlbi5qc1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICpcbiAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdHdlZW5qcy90d2Vlbi5qcy9ncmFwaHMvY29udHJpYnV0b3JzIGZvciB0aGUgZnVsbCBsaXN0IG9mIGNvbnRyaWJ1dG9ycy5cbiAqIFRoYW5rIHlvdSBhbGwsIHlvdSdyZSBhd2Vzb21lIVxuICovXG5cblxudmFyIF9Hcm91cCA9IGZ1bmN0aW9uICgpIHtcblx0dGhpcy5fdHdlZW5zID0ge307XG5cdHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlID0ge307XG59O1xuXG5fR3JvdXAucHJvdG90eXBlID0ge1xuXHRnZXRBbGw6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl90d2VlbnMpLm1hcChmdW5jdGlvbiAodHdlZW5JZCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX3R3ZWVuc1t0d2VlbklkXTtcblx0XHR9LmJpbmQodGhpcykpO1xuXG5cdH0sXG5cblx0cmVtb3ZlQWxsOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLl90d2VlbnMgPSB7fTtcblxuXHR9LFxuXG5cdGFkZDogZnVuY3Rpb24gKHR3ZWVuKSB7XG5cblx0XHR0aGlzLl90d2VlbnNbdHdlZW4uZ2V0SWQoKV0gPSB0d2Vlbjtcblx0XHR0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZVt0d2Vlbi5nZXRJZCgpXSA9IHR3ZWVuO1xuXG5cdH0sXG5cblx0cmVtb3ZlOiBmdW5jdGlvbiAodHdlZW4pIHtcblxuXHRcdGRlbGV0ZSB0aGlzLl90d2VlbnNbdHdlZW4uZ2V0SWQoKV07XG5cdFx0ZGVsZXRlIHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlW3R3ZWVuLmdldElkKCldO1xuXG5cdH0sXG5cblx0dXBkYXRlOiBmdW5jdGlvbiAodGltZSwgcHJlc2VydmUpIHtcblxuXHRcdHZhciB0d2VlbklkcyA9IE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVucyk7XG5cblx0XHRpZiAodHdlZW5JZHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0dGltZSA9IHRpbWUgIT09IHVuZGVmaW5lZCA/IHRpbWUgOiBUV0VFTi5ub3coKTtcblxuXHRcdC8vIFR3ZWVucyBhcmUgdXBkYXRlZCBpbiBcImJhdGNoZXNcIi4gSWYgeW91IGFkZCBhIG5ldyB0d2VlbiBkdXJpbmcgYW4gdXBkYXRlLCB0aGVuIHRoZVxuXHRcdC8vIG5ldyB0d2VlbiB3aWxsIGJlIHVwZGF0ZWQgaW4gdGhlIG5leHQgYmF0Y2guXG5cdFx0Ly8gSWYgeW91IHJlbW92ZSBhIHR3ZWVuIGR1cmluZyBhbiB1cGRhdGUsIGl0IG1heSBvciBtYXkgbm90IGJlIHVwZGF0ZWQuIEhvd2V2ZXIsXG5cdFx0Ly8gaWYgdGhlIHJlbW92ZWQgdHdlZW4gd2FzIGFkZGVkIGR1cmluZyB0aGUgY3VycmVudCBiYXRjaCwgdGhlbiBpdCB3aWxsIG5vdCBiZSB1cGRhdGVkLlxuXHRcdHdoaWxlICh0d2Vlbklkcy5sZW5ndGggPiAwKSB7XG5cdFx0XHR0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZSA9IHt9O1xuXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHR3ZWVuSWRzLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRcdFx0dmFyIHR3ZWVuID0gdGhpcy5fdHdlZW5zW3R3ZWVuSWRzW2ldXTtcblxuXHRcdFx0XHRpZiAodHdlZW4gJiYgdHdlZW4udXBkYXRlKHRpbWUpID09PSBmYWxzZSkge1xuXHRcdFx0XHRcdHR3ZWVuLl9pc1BsYXlpbmcgPSBmYWxzZTtcblxuXHRcdFx0XHRcdGlmICghcHJlc2VydmUpIHtcblx0XHRcdFx0XHRcdGRlbGV0ZSB0aGlzLl90d2VlbnNbdHdlZW5JZHNbaV1dO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR0d2VlbklkcyA9IE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblxuXHR9XG59O1xuXG52YXIgVFdFRU4gPSBuZXcgX0dyb3VwKCk7XG5cblRXRUVOLkdyb3VwID0gX0dyb3VwO1xuVFdFRU4uX25leHRJZCA9IDA7XG5UV0VFTi5uZXh0SWQgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiBUV0VFTi5fbmV4dElkKys7XG59O1xuXG5cbi8vIEluY2x1ZGUgYSBwZXJmb3JtYW5jZS5ub3cgcG9seWZpbGwuXG4vLyBJbiBub2RlLmpzLCB1c2UgcHJvY2Vzcy5ocnRpbWUuXG5pZiAodHlwZW9mICh3aW5kb3cpID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgKHByb2Nlc3MpICE9PSAndW5kZWZpbmVkJykge1xuXHRUV0VFTi5ub3cgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHRpbWUgPSBwcm9jZXNzLmhydGltZSgpO1xuXG5cdFx0Ly8gQ29udmVydCBbc2Vjb25kcywgbmFub3NlY29uZHNdIHRvIG1pbGxpc2Vjb25kcy5cblx0XHRyZXR1cm4gdGltZVswXSAqIDEwMDAgKyB0aW1lWzFdIC8gMTAwMDAwMDtcblx0fTtcbn1cbi8vIEluIGEgYnJvd3NlciwgdXNlIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cgaWYgaXQgaXMgYXZhaWxhYmxlLlxuZWxzZSBpZiAodHlwZW9mICh3aW5kb3cpICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgd2luZG93LnBlcmZvcm1hbmNlICE9PSB1bmRlZmluZWQgJiZcblx0XHQgd2luZG93LnBlcmZvcm1hbmNlLm5vdyAhPT0gdW5kZWZpbmVkKSB7XG5cdC8vIFRoaXMgbXVzdCBiZSBib3VuZCwgYmVjYXVzZSBkaXJlY3RseSBhc3NpZ25pbmcgdGhpcyBmdW5jdGlvblxuXHQvLyBsZWFkcyB0byBhbiBpbnZvY2F0aW9uIGV4Y2VwdGlvbiBpbiBDaHJvbWUuXG5cdFRXRUVOLm5vdyA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cuYmluZCh3aW5kb3cucGVyZm9ybWFuY2UpO1xufVxuLy8gVXNlIERhdGUubm93IGlmIGl0IGlzIGF2YWlsYWJsZS5cbmVsc2UgaWYgKERhdGUubm93ICE9PSB1bmRlZmluZWQpIHtcblx0VFdFRU4ubm93ID0gRGF0ZS5ub3c7XG59XG4vLyBPdGhlcndpc2UsIHVzZSAnbmV3IERhdGUoKS5nZXRUaW1lKCknLlxuZWxzZSB7XG5cdFRXRUVOLm5vdyA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cdH07XG59XG5cblxuVFdFRU4uVHdlZW4gPSBmdW5jdGlvbiAob2JqZWN0LCBncm91cCkge1xuXHR0aGlzLl9vYmplY3QgPSBvYmplY3Q7XG5cdHRoaXMuX3ZhbHVlc1N0YXJ0ID0ge307XG5cdHRoaXMuX3ZhbHVlc0VuZCA9IHt9O1xuXHR0aGlzLl92YWx1ZXNTdGFydFJlcGVhdCA9IHt9O1xuXHR0aGlzLl9kdXJhdGlvbiA9IDEwMDA7XG5cdHRoaXMuX3JlcGVhdCA9IDA7XG5cdHRoaXMuX3JlcGVhdERlbGF5VGltZSA9IHVuZGVmaW5lZDtcblx0dGhpcy5feW95byA9IGZhbHNlO1xuXHR0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcblx0dGhpcy5fcmV2ZXJzZWQgPSBmYWxzZTtcblx0dGhpcy5fZGVsYXlUaW1lID0gMDtcblx0dGhpcy5fc3RhcnRUaW1lID0gbnVsbDtcblx0dGhpcy5fZWFzaW5nRnVuY3Rpb24gPSBUV0VFTi5FYXNpbmcuTGluZWFyLk5vbmU7XG5cdHRoaXMuX2ludGVycG9sYXRpb25GdW5jdGlvbiA9IFRXRUVOLkludGVycG9sYXRpb24uTGluZWFyO1xuXHR0aGlzLl9jaGFpbmVkVHdlZW5zID0gW107XG5cdHRoaXMuX29uU3RhcnRDYWxsYmFjayA9IG51bGw7XG5cdHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gZmFsc2U7XG5cdHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sgPSBudWxsO1xuXHR0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgPSBudWxsO1xuXHR0aGlzLl9vblN0b3BDYWxsYmFjayA9IG51bGw7XG5cdHRoaXMuX2dyb3VwID0gZ3JvdXAgfHwgVFdFRU47XG5cdHRoaXMuX2lkID0gVFdFRU4ubmV4dElkKCk7XG5cbn07XG5cblRXRUVOLlR3ZWVuLnByb3RvdHlwZSA9IHtcblx0Z2V0SWQ6IGZ1bmN0aW9uIGdldElkKCkge1xuXHRcdHJldHVybiB0aGlzLl9pZDtcblx0fSxcblxuXHRpc1BsYXlpbmc6IGZ1bmN0aW9uIGlzUGxheWluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5faXNQbGF5aW5nO1xuXHR9LFxuXG5cdHRvOiBmdW5jdGlvbiB0byhwcm9wZXJ0aWVzLCBkdXJhdGlvbikge1xuXG5cdFx0dGhpcy5fdmFsdWVzRW5kID0gcHJvcGVydGllcztcblxuXHRcdGlmIChkdXJhdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLl9kdXJhdGlvbiA9IGR1cmF0aW9uO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c3RhcnQ6IGZ1bmN0aW9uIHN0YXJ0KHRpbWUpIHtcblxuXHRcdHRoaXMuX2dyb3VwLmFkZCh0aGlzKTtcblxuXHRcdHRoaXMuX2lzUGxheWluZyA9IHRydWU7XG5cblx0XHR0aGlzLl9vblN0YXJ0Q2FsbGJhY2tGaXJlZCA9IGZhbHNlO1xuXG5cdFx0dGhpcy5fc3RhcnRUaW1lID0gdGltZSAhPT0gdW5kZWZpbmVkID8gdHlwZW9mIHRpbWUgPT09ICdzdHJpbmcnID8gVFdFRU4ubm93KCkgKyBwYXJzZUZsb2F0KHRpbWUpIDogdGltZSA6IFRXRUVOLm5vdygpO1xuXHRcdHRoaXMuX3N0YXJ0VGltZSArPSB0aGlzLl9kZWxheVRpbWU7XG5cblx0XHRmb3IgKHZhciBwcm9wZXJ0eSBpbiB0aGlzLl92YWx1ZXNFbmQpIHtcblxuXHRcdFx0Ly8gQ2hlY2sgaWYgYW4gQXJyYXkgd2FzIHByb3ZpZGVkIGFzIHByb3BlcnR5IHZhbHVlXG5cdFx0XHRpZiAodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSBpbnN0YW5jZW9mIEFycmF5KSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0ubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBDcmVhdGUgYSBsb2NhbCBjb3B5IG9mIHRoZSBBcnJheSB3aXRoIHRoZSBzdGFydCB2YWx1ZSBhdCB0aGUgZnJvbnRcblx0XHRcdFx0dGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSA9IFt0aGlzLl9vYmplY3RbcHJvcGVydHldXS5jb25jYXQodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSk7XG5cblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgYHRvKClgIHNwZWNpZmllcyBhIHByb3BlcnR5IHRoYXQgZG9lc24ndCBleGlzdCBpbiB0aGUgc291cmNlIG9iamVjdCxcblx0XHRcdC8vIHdlIHNob3VsZCBub3Qgc2V0IHRoYXQgcHJvcGVydHkgaW4gdGhlIG9iamVjdFxuXHRcdFx0aWYgKHRoaXMuX29iamVjdFtwcm9wZXJ0eV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2F2ZSB0aGUgc3RhcnRpbmcgdmFsdWUuXG5cdFx0XHR0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gPSB0aGlzLl9vYmplY3RbcHJvcGVydHldO1xuXG5cdFx0XHRpZiAoKHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSBpbnN0YW5jZW9mIEFycmF5KSA9PT0gZmFsc2UpIHtcblx0XHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldICo9IDEuMDsgLy8gRW5zdXJlcyB3ZSdyZSB1c2luZyBudW1iZXJzLCBub3Qgc3RyaW5nc1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gPSB0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gfHwgMDtcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c3RvcDogZnVuY3Rpb24gc3RvcCgpIHtcblxuXHRcdGlmICghdGhpcy5faXNQbGF5aW5nKSB7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHR0aGlzLl9ncm91cC5yZW1vdmUodGhpcyk7XG5cdFx0dGhpcy5faXNQbGF5aW5nID0gZmFsc2U7XG5cblx0XHRpZiAodGhpcy5fb25TdG9wQ2FsbGJhY2sgIT09IG51bGwpIHtcblx0XHRcdHRoaXMuX29uU3RvcENhbGxiYWNrKHRoaXMuX29iamVjdCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5zdG9wQ2hhaW5lZFR3ZWVucygpO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZW5kOiBmdW5jdGlvbiBlbmQoKSB7XG5cblx0XHR0aGlzLnVwZGF0ZSh0aGlzLl9zdGFydFRpbWUgKyB0aGlzLl9kdXJhdGlvbik7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzdG9wQ2hhaW5lZFR3ZWVuczogZnVuY3Rpb24gc3RvcENoYWluZWRUd2VlbnMoKSB7XG5cblx0XHRmb3IgKHZhciBpID0gMCwgbnVtQ2hhaW5lZFR3ZWVucyA9IHRoaXMuX2NoYWluZWRUd2VlbnMubGVuZ3RoOyBpIDwgbnVtQ2hhaW5lZFR3ZWVuczsgaSsrKSB7XG5cdFx0XHR0aGlzLl9jaGFpbmVkVHdlZW5zW2ldLnN0b3AoKTtcblx0XHR9XG5cblx0fSxcblxuXHRncm91cDogZnVuY3Rpb24gZ3JvdXAoZ3JvdXApIHtcblx0XHR0aGlzLl9ncm91cCA9IGdyb3VwO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdGRlbGF5OiBmdW5jdGlvbiBkZWxheShhbW91bnQpIHtcblxuXHRcdHRoaXMuX2RlbGF5VGltZSA9IGFtb3VudDtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHJlcGVhdDogZnVuY3Rpb24gcmVwZWF0KHRpbWVzKSB7XG5cblx0XHR0aGlzLl9yZXBlYXQgPSB0aW1lcztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHJlcGVhdERlbGF5OiBmdW5jdGlvbiByZXBlYXREZWxheShhbW91bnQpIHtcblxuXHRcdHRoaXMuX3JlcGVhdERlbGF5VGltZSA9IGFtb3VudDtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHlveW86IGZ1bmN0aW9uIHlveW8oeXkpIHtcblxuXHRcdHRoaXMuX3lveW8gPSB5eTtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGVhc2luZzogZnVuY3Rpb24gZWFzaW5nKGVhcykge1xuXG5cdFx0dGhpcy5fZWFzaW5nRnVuY3Rpb24gPSBlYXM7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRpbnRlcnBvbGF0aW9uOiBmdW5jdGlvbiBpbnRlcnBvbGF0aW9uKGludGVyKSB7XG5cblx0XHR0aGlzLl9pbnRlcnBvbGF0aW9uRnVuY3Rpb24gPSBpbnRlcjtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNoYWluOiBmdW5jdGlvbiBjaGFpbigpIHtcblxuXHRcdHRoaXMuX2NoYWluZWRUd2VlbnMgPSBhcmd1bWVudHM7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRvblN0YXJ0OiBmdW5jdGlvbiBvblN0YXJ0KGNhbGxiYWNrKSB7XG5cblx0XHR0aGlzLl9vblN0YXJ0Q2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG9uVXBkYXRlOiBmdW5jdGlvbiBvblVwZGF0ZShjYWxsYmFjaykge1xuXG5cdFx0dGhpcy5fb25VcGRhdGVDYWxsYmFjayA9IGNhbGxiYWNrO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0b25Db21wbGV0ZTogZnVuY3Rpb24gb25Db21wbGV0ZShjYWxsYmFjaykge1xuXG5cdFx0dGhpcy5fb25Db21wbGV0ZUNhbGxiYWNrID0gY2FsbGJhY2s7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRvblN0b3A6IGZ1bmN0aW9uIG9uU3RvcChjYWxsYmFjaykge1xuXG5cdFx0dGhpcy5fb25TdG9wQ2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKHRpbWUpIHtcblxuXHRcdHZhciBwcm9wZXJ0eTtcblx0XHR2YXIgZWxhcHNlZDtcblx0XHR2YXIgdmFsdWU7XG5cblx0XHRpZiAodGltZSA8IHRoaXMuX3N0YXJ0VGltZSkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID09PSBmYWxzZSkge1xuXG5cdFx0XHRpZiAodGhpcy5fb25TdGFydENhbGxiYWNrICE9PSBudWxsKSB7XG5cdFx0XHRcdHRoaXMuX29uU3RhcnRDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9vblN0YXJ0Q2FsbGJhY2tGaXJlZCA9IHRydWU7XG5cdFx0fVxuXG5cdFx0ZWxhcHNlZCA9ICh0aW1lIC0gdGhpcy5fc3RhcnRUaW1lKSAvIHRoaXMuX2R1cmF0aW9uO1xuXHRcdGVsYXBzZWQgPSAodGhpcy5fZHVyYXRpb24gPT09IDAgfHwgZWxhcHNlZCA+IDEpID8gMSA6IGVsYXBzZWQ7XG5cblx0XHR2YWx1ZSA9IHRoaXMuX2Vhc2luZ0Z1bmN0aW9uKGVsYXBzZWQpO1xuXG5cdFx0Zm9yIChwcm9wZXJ0eSBpbiB0aGlzLl92YWx1ZXNFbmQpIHtcblxuXHRcdFx0Ly8gRG9uJ3QgdXBkYXRlIHByb3BlcnRpZXMgdGhhdCBkbyBub3QgZXhpc3QgaW4gdGhlIHNvdXJjZSBvYmplY3Rcblx0XHRcdGlmICh0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHN0YXJ0ID0gdGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldIHx8IDA7XG5cdFx0XHR2YXIgZW5kID0gdGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XTtcblxuXHRcdFx0aWYgKGVuZCBpbnN0YW5jZW9mIEFycmF5KSB7XG5cblx0XHRcdFx0dGhpcy5fb2JqZWN0W3Byb3BlcnR5XSA9IHRoaXMuX2ludGVycG9sYXRpb25GdW5jdGlvbihlbmQsIHZhbHVlKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHQvLyBQYXJzZXMgcmVsYXRpdmUgZW5kIHZhbHVlcyB3aXRoIHN0YXJ0IGFzIGJhc2UgKGUuZy46ICsxMCwgLTMpXG5cdFx0XHRcdGlmICh0eXBlb2YgKGVuZCkgPT09ICdzdHJpbmcnKSB7XG5cblx0XHRcdFx0XHRpZiAoZW5kLmNoYXJBdCgwKSA9PT0gJysnIHx8IGVuZC5jaGFyQXQoMCkgPT09ICctJykge1xuXHRcdFx0XHRcdFx0ZW5kID0gc3RhcnQgKyBwYXJzZUZsb2F0KGVuZCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGVuZCA9IHBhcnNlRmxvYXQoZW5kKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBQcm90ZWN0IGFnYWluc3Qgbm9uIG51bWVyaWMgcHJvcGVydGllcy5cblx0XHRcdFx0aWYgKHR5cGVvZiAoZW5kKSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0XHR0aGlzLl9vYmplY3RbcHJvcGVydHldID0gc3RhcnQgKyAoZW5kIC0gc3RhcnQpICogdmFsdWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sgIT09IG51bGwpIHtcblx0XHRcdHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sodGhpcy5fb2JqZWN0KTtcblx0XHR9XG5cblx0XHRpZiAoZWxhcHNlZCA9PT0gMSkge1xuXG5cdFx0XHRpZiAodGhpcy5fcmVwZWF0ID4gMCkge1xuXG5cdFx0XHRcdGlmIChpc0Zpbml0ZSh0aGlzLl9yZXBlYXQpKSB7XG5cdFx0XHRcdFx0dGhpcy5fcmVwZWF0LS07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBSZWFzc2lnbiBzdGFydGluZyB2YWx1ZXMsIHJlc3RhcnQgYnkgbWFraW5nIHN0YXJ0VGltZSA9IG5vd1xuXHRcdFx0XHRmb3IgKHByb3BlcnR5IGluIHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0KSB7XG5cblx0XHRcdFx0XHRpZiAodHlwZW9mICh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldKSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSArIHBhcnNlRmxvYXQodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHRoaXMuX3lveW8pIHtcblx0XHRcdFx0XHRcdHZhciB0bXAgPSB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV07XG5cblx0XHRcdFx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV07XG5cdFx0XHRcdFx0XHR0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldID0gdG1wO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuX3lveW8pIHtcblx0XHRcdFx0XHR0aGlzLl9yZXZlcnNlZCA9ICF0aGlzLl9yZXZlcnNlZDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLl9yZXBlYXREZWxheVRpbWUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdHRoaXMuX3N0YXJ0VGltZSA9IHRpbWUgKyB0aGlzLl9yZXBlYXREZWxheVRpbWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fc3RhcnRUaW1lID0gdGltZSArIHRoaXMuX2RlbGF5VGltZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgIT09IG51bGwpIHtcblxuXHRcdFx0XHRcdHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIG51bUNoYWluZWRUd2VlbnMgPSB0aGlzLl9jaGFpbmVkVHdlZW5zLmxlbmd0aDsgaSA8IG51bUNoYWluZWRUd2VlbnM7IGkrKykge1xuXHRcdFx0XHRcdC8vIE1ha2UgdGhlIGNoYWluZWQgdHdlZW5zIHN0YXJ0IGV4YWN0bHkgYXQgdGhlIHRpbWUgdGhleSBzaG91bGQsXG5cdFx0XHRcdFx0Ly8gZXZlbiBpZiB0aGUgYHVwZGF0ZSgpYCBtZXRob2Qgd2FzIGNhbGxlZCB3YXkgcGFzdCB0aGUgZHVyYXRpb24gb2YgdGhlIHR3ZWVuXG5cdFx0XHRcdFx0dGhpcy5fY2hhaW5lZFR3ZWVuc1tpXS5zdGFydCh0aGlzLl9zdGFydFRpbWUgKyB0aGlzLl9kdXJhdGlvbik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXG5cdH1cbn07XG5cblxuVFdFRU4uRWFzaW5nID0ge1xuXG5cdExpbmVhcjoge1xuXG5cdFx0Tm9uZTogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGs7XG5cblx0XHR9XG5cblx0fSxcblxuXHRRdWFkcmF0aWM6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqIGs7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqICgyIC0gayk7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIDAuNSAqIGsgKiBrO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gLSAwLjUgKiAoLS1rICogKGsgLSAyKSAtIDEpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Q3ViaWM6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqIGsgKiBrO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIC0tayAqIGsgKiBrICsgMTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGsgKiBrO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKChrIC09IDIpICogayAqIGsgKyAyKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdFF1YXJ0aWM6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqIGsgKiBrICogaztcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAxIC0gKC0tayAqIGsgKiBrICogayk7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIDAuNSAqIGsgKiBrICogayAqIGs7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAtIDAuNSAqICgoayAtPSAyKSAqIGsgKiBrICogayAtIDIpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0UXVpbnRpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogayAqIGsgKiBrICogaztcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAtLWsgKiBrICogayAqIGsgKiBrICsgMTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGsgKiBrICogayAqIGs7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwLjUgKiAoKGsgLT0gMikgKiBrICogayAqIGsgKiBrICsgMik7XG5cblx0XHR9XG5cblx0fSxcblxuXHRTaW51c29pZGFsOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDEgLSBNYXRoLmNvcyhrICogTWF0aC5QSSAvIDIpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIE1hdGguc2luKGsgKiBNYXRoLlBJIC8gMik7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAwLjUgKiAoMSAtIE1hdGguY29zKE1hdGguUEkgKiBrKSk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRFeHBvbmVudGlhbDoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrID09PSAwID8gMCA6IE1hdGgucG93KDEwMjQsIGsgLSAxKTtcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrID09PSAxID8gMSA6IDEgLSBNYXRoLnBvdygyLCAtIDEwICogayk7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrID09PSAwKSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoayA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogTWF0aC5wb3coMTAyNCwgayAtIDEpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKC0gTWF0aC5wb3coMiwgLSAxMCAqIChrIC0gMSkpICsgMik7XG5cblx0XHR9XG5cblx0fSxcblxuXHRDaXJjdWxhcjoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAxIC0gTWF0aC5zcXJ0KDEgLSBrICogayk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gTWF0aC5zcXJ0KDEgLSAoLS1rICogaykpO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAtIDAuNSAqIChNYXRoLnNxcnQoMSAtIGsgKiBrKSAtIDEpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKE1hdGguc3FydCgxIC0gKGsgLT0gMikgKiBrKSArIDEpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0RWxhc3RpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrID09PSAwKSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoayA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIC1NYXRoLnBvdygyLCAxMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKGsgPT09IDApIHtcblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gTWF0aC5wb3coMiwgLTEwICogaykgKiBNYXRoLnNpbigoayAtIDAuMSkgKiA1ICogTWF0aC5QSSkgKyAxO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA9PT0gMCkge1xuXHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGsgPT09IDEpIHtcblx0XHRcdFx0cmV0dXJuIDE7XG5cdFx0XHR9XG5cblx0XHRcdGsgKj0gMjtcblxuXHRcdFx0aWYgKGsgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAtMC41ICogTWF0aC5wb3coMiwgMTAgKiAoayAtIDEpKSAqIE1hdGguc2luKChrIC0gMS4xKSAqIDUgKiBNYXRoLlBJKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDAuNSAqIE1hdGgucG93KDIsIC0xMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpICsgMTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdEJhY2s6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHR2YXIgcyA9IDEuNzAxNTg7XG5cblx0XHRcdHJldHVybiBrICogayAqICgocyArIDEpICogayAtIHMpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0dmFyIHMgPSAxLjcwMTU4O1xuXG5cdFx0XHRyZXR1cm4gLS1rICogayAqICgocyArIDEpICogayArIHMpICsgMTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0dmFyIHMgPSAxLjcwMTU4ICogMS41MjU7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIDAuNSAqIChrICogayAqICgocyArIDEpICogayAtIHMpKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDAuNSAqICgoayAtPSAyKSAqIGsgKiAoKHMgKyAxKSAqIGsgKyBzKSArIDIpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Qm91bmNlOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDEgLSBUV0VFTi5FYXNpbmcuQm91bmNlLk91dCgxIC0gayk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA8ICgxIC8gMi43NSkpIHtcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIGsgKiBrO1xuXHRcdFx0fSBlbHNlIGlmIChrIDwgKDIgLyAyLjc1KSkge1xuXHRcdFx0XHRyZXR1cm4gNy41NjI1ICogKGsgLT0gKDEuNSAvIDIuNzUpKSAqIGsgKyAwLjc1O1xuXHRcdFx0fSBlbHNlIGlmIChrIDwgKDIuNSAvIDIuNzUpKSB7XG5cdFx0XHRcdHJldHVybiA3LjU2MjUgKiAoayAtPSAoMi4yNSAvIDIuNzUpKSAqIGsgKyAwLjkzNzU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gNy41NjI1ICogKGsgLT0gKDIuNjI1IC8gMi43NSkpICogayArIDAuOTg0Mzc1O1xuXHRcdFx0fVxuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA8IDAuNSkge1xuXHRcdFx0XHRyZXR1cm4gVFdFRU4uRWFzaW5nLkJvdW5jZS5JbihrICogMikgKiAwLjU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBUV0VFTi5FYXNpbmcuQm91bmNlLk91dChrICogMiAtIDEpICogMC41ICsgMC41O1xuXG5cdFx0fVxuXG5cdH1cblxufTtcblxuVFdFRU4uSW50ZXJwb2xhdGlvbiA9IHtcblxuXHRMaW5lYXI6IGZ1bmN0aW9uICh2LCBrKSB7XG5cblx0XHR2YXIgbSA9IHYubGVuZ3RoIC0gMTtcblx0XHR2YXIgZiA9IG0gKiBrO1xuXHRcdHZhciBpID0gTWF0aC5mbG9vcihmKTtcblx0XHR2YXIgZm4gPSBUV0VFTi5JbnRlcnBvbGF0aW9uLlV0aWxzLkxpbmVhcjtcblxuXHRcdGlmIChrIDwgMCkge1xuXHRcdFx0cmV0dXJuIGZuKHZbMF0sIHZbMV0sIGYpO1xuXHRcdH1cblxuXHRcdGlmIChrID4gMSkge1xuXHRcdFx0cmV0dXJuIGZuKHZbbV0sIHZbbSAtIDFdLCBtIC0gZik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZuKHZbaV0sIHZbaSArIDEgPiBtID8gbSA6IGkgKyAxXSwgZiAtIGkpO1xuXG5cdH0sXG5cblx0QmV6aWVyOiBmdW5jdGlvbiAodiwgaykge1xuXG5cdFx0dmFyIGIgPSAwO1xuXHRcdHZhciBuID0gdi5sZW5ndGggLSAxO1xuXHRcdHZhciBwdyA9IE1hdGgucG93O1xuXHRcdHZhciBibiA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuQmVybnN0ZWluO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPD0gbjsgaSsrKSB7XG5cdFx0XHRiICs9IHB3KDEgLSBrLCBuIC0gaSkgKiBwdyhrLCBpKSAqIHZbaV0gKiBibihuLCBpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYjtcblxuXHR9LFxuXG5cdENhdG11bGxSb206IGZ1bmN0aW9uICh2LCBrKSB7XG5cblx0XHR2YXIgbSA9IHYubGVuZ3RoIC0gMTtcblx0XHR2YXIgZiA9IG0gKiBrO1xuXHRcdHZhciBpID0gTWF0aC5mbG9vcihmKTtcblx0XHR2YXIgZm4gPSBUV0VFTi5JbnRlcnBvbGF0aW9uLlV0aWxzLkNhdG11bGxSb207XG5cblx0XHRpZiAodlswXSA9PT0gdlttXSkge1xuXG5cdFx0XHRpZiAoayA8IDApIHtcblx0XHRcdFx0aSA9IE1hdGguZmxvb3IoZiA9IG0gKiAoMSArIGspKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZuKHZbKGkgLSAxICsgbSkgJSBtXSwgdltpXSwgdlsoaSArIDEpICUgbV0sIHZbKGkgKyAyKSAlIG1dLCBmIC0gaSk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRpZiAoayA8IDApIHtcblx0XHRcdFx0cmV0dXJuIHZbMF0gLSAoZm4odlswXSwgdlswXSwgdlsxXSwgdlsxXSwgLWYpIC0gdlswXSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrID4gMSkge1xuXHRcdFx0XHRyZXR1cm4gdlttXSAtIChmbih2W21dLCB2W21dLCB2W20gLSAxXSwgdlttIC0gMV0sIGYgLSBtKSAtIHZbbV0pO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZm4odltpID8gaSAtIDEgOiAwXSwgdltpXSwgdlttIDwgaSArIDEgPyBtIDogaSArIDFdLCB2W20gPCBpICsgMiA/IG0gOiBpICsgMl0sIGYgLSBpKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdFV0aWxzOiB7XG5cblx0XHRMaW5lYXI6IGZ1bmN0aW9uIChwMCwgcDEsIHQpIHtcblxuXHRcdFx0cmV0dXJuIChwMSAtIHAwKSAqIHQgKyBwMDtcblxuXHRcdH0sXG5cblx0XHRCZXJuc3RlaW46IGZ1bmN0aW9uIChuLCBpKSB7XG5cblx0XHRcdHZhciBmYyA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuRmFjdG9yaWFsO1xuXG5cdFx0XHRyZXR1cm4gZmMobikgLyBmYyhpKSAvIGZjKG4gLSBpKTtcblxuXHRcdH0sXG5cblx0XHRGYWN0b3JpYWw6IChmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHZhciBhID0gWzFdO1xuXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKG4pIHtcblxuXHRcdFx0XHR2YXIgcyA9IDE7XG5cblx0XHRcdFx0aWYgKGFbbl0pIHtcblx0XHRcdFx0XHRyZXR1cm4gYVtuXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvciAodmFyIGkgPSBuOyBpID4gMTsgaS0tKSB7XG5cdFx0XHRcdFx0cyAqPSBpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YVtuXSA9IHM7XG5cdFx0XHRcdHJldHVybiBzO1xuXG5cdFx0XHR9O1xuXG5cdFx0fSkoKSxcblxuXHRcdENhdG11bGxSb206IGZ1bmN0aW9uIChwMCwgcDEsIHAyLCBwMywgdCkge1xuXG5cdFx0XHR2YXIgdjAgPSAocDIgLSBwMCkgKiAwLjU7XG5cdFx0XHR2YXIgdjEgPSAocDMgLSBwMSkgKiAwLjU7XG5cdFx0XHR2YXIgdDIgPSB0ICogdDtcblx0XHRcdHZhciB0MyA9IHQgKiB0MjtcblxuXHRcdFx0cmV0dXJuICgyICogcDEgLSAyICogcDIgKyB2MCArIHYxKSAqIHQzICsgKC0gMyAqIHAxICsgMyAqIHAyIC0gMiAqIHYwIC0gdjEpICogdDIgKyB2MCAqIHQgKyBwMTtcblxuXHRcdH1cblxuXHR9XG5cbn07XG5cbi8vIFVNRCAoVW5pdmVyc2FsIE1vZHVsZSBEZWZpbml0aW9uKVxuKGZ1bmN0aW9uIChyb290KSB7XG5cblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gVFdFRU47XG5cdFx0fSk7XG5cblx0fSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcblxuXHRcdC8vIE5vZGUuanNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IFRXRUVOO1xuXG5cdH0gZWxzZSBpZiAocm9vdCAhPT0gdW5kZWZpbmVkKSB7XG5cblx0XHQvLyBHbG9iYWwgdmFyaWFibGVcblx0XHRyb290LlRXRUVOID0gVFdFRU47XG5cblx0fVxuXG59KSh0aGlzKTtcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKiBqc3BhbmVsLnNhc3M6IDIwMTgtMDQtMTggMjA6MjQgKi9cXG4vKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMwNDIxNTcwL3Nhc3MtdW5pY29kZS1lc2NhcGUtaXMtbm90LXByZXNlcnZlZC1pbi1jc3MtZmlsZSAqL1xcbi5qc1BhbmVsIHtcXG4gIGJvcmRlcjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxuICBmb250LWZhbWlseTogXFxcIk9wZW4gU2Fuc1xcXCIsXFxcIkhlbHZldGljYSBOZXVlXFxcIixIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIG9wYWNpdHk6IDA7XFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIHotaW5kZXg6IDEwMDsgfVxcbiAgLmpzUGFuZWwgLmpzUGFuZWwtaGRyIHtcXG4gICAgYm9yZGVyOiAwO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiT3BlbiBTYW5zXFxcIixcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBmb250LXNpemU6IDFyZW07XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGZsZXgtc2hyaW5rOiAwOyB9XFxuICAuanNQYW5lbCAuanNQYW5lbC1jb250ZW50IHtcXG4gICAgYm9yZGVyOiAwO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiT3BlbiBTYW5zXFxcIixcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xcbiAgICBjb2xvcjogIzAwMDAwMDtcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcXG4gICAgb3ZlcmZsb3cteTogYXV0bzsgfVxcbiAgICAuanNQYW5lbCAuanNQYW5lbC1jb250ZW50IHByZSB7XFxuICAgICAgY29sb3I6IGluaGVyaXQ7IH1cXG4gIC5qc1BhbmVsIC5qc1BhbmVsLWZ0ciB7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxuICAgIGZsZXgtd3JhcDogbm93cmFwO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2UwZTBlMDtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICAgIGJhY2tncm91bmQ6ICNmNWY1ZjU7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIGNvbG9yOiBibGFjaztcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgLmpzUGFuZWwgLmpzUGFuZWwtZnRyLmFjdGl2ZSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7IH1cXG4gICAgLmpzUGFuZWwgLmpzUGFuZWwtZnRyLmFjdGl2ZSA+ICoge1xcbiAgICAgIG1hcmdpbjogM3B4IDhweDsgfVxcbiAgLmpzUGFuZWwgLmpzUGFuZWwtZnRyLnBhbmVsLWZvb3RlciB7XFxuICAgIHBhZGRpbmc6IDA7IH1cXG5cXG4uanNQYW5lbC1oZWFkZXJiYXIsIC5qc1BhbmVsLWhkci10b29sYmFyIHtcXG4gIGZvbnQtc2l6ZTogMXJlbTsgfVxcblxcbi5qc1BhbmVsLWhlYWRlcmJhciB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBmbGV4LXdyYXA6IG5vd3JhcDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cXG4gIC5qc1BhbmVsLWhlYWRlcmJhciBpbWcge1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgICBtYXgtaGVpZ2h0OiAzOHB4OyB9XFxuXFxuLmpzUGFuZWwtdGl0bGViYXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmbGV4LWdyb3c6IDE7XFxuICBjdXJzb3I6IG1vdmU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuICAuanNQYW5lbC10aXRsZWJhciAuanNQYW5lbC10aXRsZSB7XFxuICAgIGNvbG9yOiAjMDAwMDAwO1xcbiAgICBmb250LWZhbWlseTogXFxcIk9wZW4gU2Fuc1xcXCIsXFxcIkhlbHZldGljYSBOZXVlXFxcIixIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gICAgZm9udC12YXJpYW50OiBzbWFsbC1jYXBzO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBtYXJnaW46IDAgNXB4IDAgOHB4O1xcbiAgICBtaW4td2lkdGg6IDA7IH1cXG4gICAgLmpzUGFuZWwtdGl0bGViYXIgLmpzUGFuZWwtdGl0bGUgc21hbGwge1xcbiAgICAgIGZvbnQtc2l6ZTogNzUlO1xcbiAgICAgIGNvbG9yOiBpbmhlcml0OyB9XFxuXFxuLmpzUGFuZWwtdGl0bGViYXIuanNQYW5lbC1ydGwge1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlOyB9XFxuXFxuLmpzUGFuZWwtY29udHJvbGJhciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHRvdWNoLWFjdGlvbjogbm9uZTsgfVxcbiAgLmpzUGFuZWwtY29udHJvbGJhciBkaXYgc3Bhbjpob3ZlciwgLmpzUGFuZWwtY29udHJvbGJhciBkaXYgc3ZnOmhvdmVyIHtcXG4gICAgb3BhY2l0eTogLjY7IH1cXG4gIC5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB0b3VjaC1hY3Rpb246IG5vbmU7IH1cXG4gICAgLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4gc3BhbiB7XFxuICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgICBwYWRkaW5nOiAwIDRweCAwIDJweDsgfVxcbiAgICAuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0biBzcGFuLmdseXBoaWNvbiB7XFxuICAgICAgcGFkZGluZzogMCAycHg7IH1cXG4gICAgLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4gc3ZnIHtcXG4gICAgICBtYXJnaW46IDAgOHB4IDAgM3B4OyB9XFxuICAgIC5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuIC5qc1BhbmVsLWljb24ge1xcbiAgICAgIHBhZGRpbmctdG9wOiA5cHg7XFxuICAgICAgbWFyZ2luOiAwIDRweCAwIDA7IH1cXG4gIC5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZSwgLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4tc21hbGxpZnlyZXYge1xcbiAgICBkaXNwbGF5OiBub25lOyB9XFxuXFxuLmpzUGFuZWwtaGRyLXRvb2xiYXIge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHdpZHRoOiBhdXRvO1xcbiAgaGVpZ2h0OiBhdXRvO1xcbiAgZm9udC1zaXplOiAxcmVtOyB9XFxuXFxuLmpzUGFuZWwtaGRyLXRvb2xiYXIuYWN0aXZlIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGZsZXgtd3JhcDogbm93cmFwO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjsgfVxcbiAgLmpzUGFuZWwtaGRyLXRvb2xiYXIuYWN0aXZlID4gKiB7XFxuICAgIG1hcmdpbjogM3B4IDhweDsgfVxcblxcbi8qIHN0eWxlcyBmb3IgcGFuZWxzIHVzaW5nIG9wdGlvbi5ydGwgKi9cXG4uanNQYW5lbC1oZWFkZXJiYXIuanNQYW5lbC1ydGwsIC5qc1BhbmVsLWNvbnRyb2xiYXIuanNQYW5lbC1ydGwsIC5qc1BhbmVsLWhkci10b29sYmFyLmpzUGFuZWwtcnRsIHtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3ctcmV2ZXJzZTsgfVxcblxcbi5qc1BhbmVsLWhkci10b29sYmFyLmFjdGl2ZS5qc1BhbmVsLXJ0bCB7XFxuICBwYWRkaW5nOiA3cHggMCAxMHB4IDA7IH1cXG5cXG4uanNQYW5lbC1mdHIuanNQYW5lbC1ydGwge1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdzsgfVxcblxcbi8qIGNvbnRhaW5lciB0aGF0IHRha2VzIHRoZSBtaW5pZmllZCBqc1BhbmVscyAqL1xcbiNqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lciwgLmpzUGFuZWwtbWluaW1pemVkLWJveCwgLmpzUGFuZWwtbWluaW1pemVkLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1mbG93OiByb3cgd3JhcC1yZXZlcnNlO1xcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgbm9uZSByZXBlYXQgc2Nyb2xsIDAgMDtcXG4gIGJvdHRvbTogMDtcXG4gIGhlaWdodDogYXV0bztcXG4gIGxlZnQ6IDA7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB3aWR0aDogYXV0bztcXG4gIHotaW5kZXg6IDk5OTg7IH1cXG4gICNqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCwgLmpzUGFuZWwtbWluaW1pemVkLWJveCAuanNQYW5lbC1yZXBsYWNlbWVudCwgLmpzUGFuZWwtbWluaW1pemVkLWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHdpZHRoOiAyMDBweDtcXG4gICAgaGVpZ2h0OiA0MHB4O1xcbiAgICBtYXJnaW46IDFweCAxcHggMCAwO1xcbiAgICB6LWluZGV4OiA5OTk5OyB9XFxuICAgICNqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1oZHIsIC5qc1BhbmVsLW1pbmltaXplZC1ib3ggLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtaGRyLCAuanNQYW5lbC1taW5pbWl6ZWQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWhkciB7XFxuICAgICAgZmxleC1ncm93OiAxO1xcbiAgICAgIG1pbi13aWR0aDogMDtcXG4gICAgICBwYWRkaW5nOiAwOyB9XFxuICAgICAgI2pzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZWFkZXJsb2dvLCAuanNQYW5lbC1taW5pbWl6ZWQtYm94IC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZWFkZXJsb2dvLCAuanNQYW5lbC1taW5pbWl6ZWQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZWFkZXJsb2dvIHtcXG4gICAgICAgIG1heC13aWR0aDogNTAlO1xcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgICAgICAgI2pzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZWFkZXJsb2dvIGltZywgLmpzUGFuZWwtbWluaW1pemVkLWJveCAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGVhZGVybG9nbyBpbWcsIC5qc1BhbmVsLW1pbmltaXplZC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhlYWRlcmxvZ28gaW1nIHtcXG4gICAgICAgICAgbWF4LXdpZHRoOiAxMDBweDtcXG4gICAgICAgICAgbWF4LWhlaWdodDogMzhweDsgfVxcbiAgICAjanNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtdGl0bGViYXIsIC5qc1BhbmVsLW1pbmltaXplZC1ib3ggLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtdGl0bGViYXIsIC5qc1BhbmVsLW1pbmltaXplZC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtdGl0bGViYXIge1xcbiAgICAgIGN1cnNvcjogZGVmYXVsdDtcXG4gICAgICBtaW4td2lkdGg6IDA7IH1cXG4gICAgI2pzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWJ0bi5qc1BhbmVsLWJ0bi1ub3JtYWxpemUsIC5qc1BhbmVsLW1pbmltaXplZC1ib3ggLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtYnRuLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZSwgLmpzUGFuZWwtbWluaW1pemVkLWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1idG4uanNQYW5lbC1idG4tbm9ybWFsaXplIHtcXG4gICAgICBkaXNwbGF5OiBibG9jazsgfVxcblxcbi5qc1BhbmVsLW1pbmltaXplZC1ib3gsIC5qc1BhbmVsLW1pbmltaXplZC1jb250YWluZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuXFxuLyogaGVscGVyIGNsYXNzZXMgdG8gbWFrZSAuanNQYW5lbC1jb250ZW50IGEgZmxleCBib3ggKi9cXG4uZmxleE9uZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1mbG93OiByb3cgd3JhcDsgfVxcblxcbi8qIGNzcyBmb3IgcmVzaXplaXQgaGFuZGxlcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtcmVzaXplaXQtaGFuZGxlIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgZm9udC1zaXplOiAwLjFweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvdWNoLWFjdGlvbjogbm9uZTsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LW4ge1xcbiAgY3Vyc29yOiBuLXJlc2l6ZTtcXG4gIGhlaWdodDogMTJweDtcXG4gIGxlZnQ6IDlweDtcXG4gIHRvcDogLTVweDtcXG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAxOHB4KTsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LWUge1xcbiAgY3Vyc29yOiBlLXJlc2l6ZTtcXG4gIGhlaWdodDogY2FsYygxMDAlIC0gMThweCk7XFxuICByaWdodDogLTlweDtcXG4gIHRvcDogOXB4O1xcbiAgd2lkdGg6IDEycHg7IH1cXG5cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUuanNQYW5lbC1yZXNpemVpdC1zIHtcXG4gIGJvdHRvbTogLTlweDtcXG4gIGN1cnNvcjogcy1yZXNpemU7XFxuICBoZWlnaHQ6IDEycHg7XFxuICBsZWZ0OiA5cHg7XFxuICB3aWR0aDogY2FsYygxMDAlIC0gMThweCk7IH1cXG5cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUuanNQYW5lbC1yZXNpemVpdC13IHtcXG4gIGN1cnNvcjogdy1yZXNpemU7XFxuICBoZWlnaHQ6IGNhbGMoMTAwJSAtIDE4cHgpO1xcbiAgbGVmdDogLTlweDtcXG4gIHRvcDogOXB4O1xcbiAgd2lkdGg6IDEycHg7IH1cXG5cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUuanNQYW5lbC1yZXNpemVpdC1uZSB7XFxuICBjdXJzb3I6IG5lLXJlc2l6ZTtcXG4gIGhlaWdodDogMThweDtcXG4gIHJpZ2h0OiAtOXB4O1xcbiAgdG9wOiAtOXB4O1xcbiAgd2lkdGg6IDE4cHg7IH1cXG5cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUuanNQYW5lbC1yZXNpemVpdC1zZSB7XFxuICBib3R0b206IC05cHg7XFxuICBjdXJzb3I6IHNlLXJlc2l6ZTtcXG4gIGhlaWdodDogMThweDtcXG4gIHJpZ2h0OiAtOXB4O1xcbiAgd2lkdGg6IDE4cHg7IH1cXG5cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUuanNQYW5lbC1yZXNpemVpdC1zdyB7XFxuICBib3R0b206IC05cHg7XFxuICBjdXJzb3I6IHN3LXJlc2l6ZTtcXG4gIGhlaWdodDogMThweDtcXG4gIGxlZnQ6IC05cHg7XFxuICB3aWR0aDogMThweDsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LW53IHtcXG4gIGN1cnNvcjogbnctcmVzaXplO1xcbiAgaGVpZ2h0OiAxOHB4O1xcbiAgbGVmdDogLTlweDtcXG4gIHRvcDogLTlweDtcXG4gIHdpZHRoOiAxOHB4OyB9XFxuXFxuLmpzUGFuZWwtZHJhZy1vdmVybGF5IHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMDsgfVxcblxcbi8qIGJveC1zaGFkb3dzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcbi5qc1BhbmVsLWRlcHRoLTEge1xcbiAgYm94LXNoYWRvdzogMCAzcHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xNiksIDAgM3B4IDZweCByZ2JhKDAsIDAsIDAsIDAuMjMpOyB9XFxuXFxuLmpzUGFuZWwtZGVwdGgtMiB7XFxuICBib3gtc2hhZG93OiAwIDEwcHggMjBweCByZ2JhKDAsIDAsIDAsIDAuMTkpLCAwIDZweCA2cHggcmdiYSgwLCAwLCAwLCAwLjIzKTsgfVxcblxcbi5qc1BhbmVsLWRlcHRoLTMge1xcbiAgYm94LXNoYWRvdzogMCAxNHB4IDI4cHggcmdiYSgwLCAwLCAwLCAwLjI1KSwgMCAxMHB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjIyKTsgfVxcblxcbi5qc1BhbmVsLWRlcHRoLTQge1xcbiAgYm94LXNoYWRvdzogMCAxOXB4IDM4cHggcmdiYSgwLCAwLCAwLCAwLjMpLCAwIDE1cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMjIpOyB9XFxuXFxuLmpzUGFuZWwtZGVwdGgtNSB7XFxuICBib3gtc2hhZG93OiAwIDI0cHggNDhweCByZ2JhKDAsIDAsIDAsIDAuMyksIDAgMjBweCAxNHB4IHJnYmEoMCwgMCwgMCwgMC4yMik7IH1cXG5cXG4vKiBzbmFwIHNlbnNpdGl2ZSBhcmVhcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXG4uanNQYW5lbC1zbmFwLWFyZWEge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgYmFja2dyb3VuZDogYmxhY2s7XFxuICBvcGFjaXR5OiAuMjtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHNpbHZlcjtcXG4gIGJveC1zaGFkb3c6IDAgMTRweCAyOHB4IHJnYmEoMCwgMCwgMCwgMC41KSwgMCAxMHB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgei1pbmRleDogOTk5OTsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1sdCwgLmpzUGFuZWwtc25hcC1hcmVhLWxjLCAuanNQYW5lbC1zbmFwLWFyZWEtbGIge1xcbiAgbGVmdDogMDsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1jdCwgLmpzUGFuZWwtc25hcC1hcmVhLWNiIHtcXG4gIGxlZnQ6IDM3LjUlOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLXJ0LCAuanNQYW5lbC1zbmFwLWFyZWEtcmMsIC5qc1BhbmVsLXNuYXAtYXJlYS1yYiB7XFxuICByaWdodDogMDsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1sdCwgLmpzUGFuZWwtc25hcC1hcmVhLWN0LCAuanNQYW5lbC1zbmFwLWFyZWEtcnQge1xcbiAgdG9wOiAwOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWxjLCAuanNQYW5lbC1zbmFwLWFyZWEtcmMge1xcbiAgdG9wOiAzNy41JTsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1sYiwgLmpzUGFuZWwtc25hcC1hcmVhLWNiLCAuanNQYW5lbC1zbmFwLWFyZWEtcmIge1xcbiAgYm90dG9tOiAwOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWN0LCAuanNQYW5lbC1zbmFwLWFyZWEtY2Ige1xcbiAgd2lkdGg6IDI1JTsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1sYywgLmpzUGFuZWwtc25hcC1hcmVhLXJjIHtcXG4gIGhlaWdodDogMjUlOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWx0IHtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMDAlOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLXJ0IHtcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEwMCU7IH1cXG5cXG4uanNQYW5lbC1zbmFwLWFyZWEtcmIge1xcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTAwJTsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1sYiB7XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTAwJTsgfVxcblxcbi8qIHRvb2x0aXAgYW5kIHRvb2x0aXAgY29ubmVjdG9ycyAqL1xcbi5qc1BhbmVsLWNvbm5lY3Rvci1sZWZ0LXRvcCwgLmpzUGFuZWwtY29ubmVjdG9yLXJpZ2h0LXRvcCwgLmpzUGFuZWwtY29ubmVjdG9yLWxlZnQtYm90dG9tLCAuanNQYW5lbC1jb25uZWN0b3ItcmlnaHQtYm90dG9tIHtcXG4gIHdpZHRoOiAxMnB4O1xcbiAgaGVpZ2h0OiAxMnB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlOyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLWxlZnQsIC5qc1BhbmVsLWNvbm5lY3Rvci10b3AsIC5qc1BhbmVsLWNvbm5lY3Rvci1ib3R0b20sIC5qc1BhbmVsLWNvbm5lY3Rvci1yaWdodCB7XFxuICB3aWR0aDogMDtcXG4gIGhlaWdodDogMDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvcmRlcjogMTJweCBzb2xpZCB0cmFuc3BhcmVudDsgfVxcblxcbi5qc1BhbmVsLWNvbm5lY3Rvci1sZWZ0LXRvcCB7XFxuICBsZWZ0OiBjYWxjKDEwMCUgLSA2cHgpO1xcbiAgdG9wOiBjYWxjKDEwMCUgLSA2cHgpOyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLXJpZ2h0LXRvcCB7XFxuICBsZWZ0OiAtNnB4O1xcbiAgdG9wOiBjYWxjKDEwMCUgLSA2cHgpOyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLXJpZ2h0LWJvdHRvbSB7XFxuICBsZWZ0OiAtNnB4O1xcbiAgdG9wOiAtNnB4OyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLWxlZnQtYm90dG9tIHtcXG4gIGxlZnQ6IGNhbGMoMTAwJSAtIDZweCk7XFxuICB0b3A6IC02cHg7IH1cXG5cXG4uanNQYW5lbC1jb25uZWN0b3ItdG9wIHtcXG4gIGxlZnQ6IGNhbGMoNTAlIC0gMTJweCk7XFxuICB0b3A6IDEwMCU7IH1cXG5cXG4uanNQYW5lbC1jb25uZWN0b3ItcmlnaHQge1xcbiAgbGVmdDogLTI0cHg7XFxuICB0b3A6IGNhbGMoNTAlIC0gMTJweCk7IH1cXG5cXG4uanNQYW5lbC1jb25uZWN0b3ItYm90dG9tIHtcXG4gIGxlZnQ6IGNhbGMoNTAlIC0gMTJweCk7XFxuICB0b3A6IC0yNHB4OyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLWxlZnQge1xcbiAgbGVmdDogMTAwJTtcXG4gIHRvcDogY2FsYyg1MCUgLSAxMnB4KTsgfVxcblxcbi8qIElFMTEgQ1NTIHN0eWxlcyBnbyBoZXJlICovXFxuQG1lZGlhIGFsbCBhbmQgKC1tcy1oaWdoLWNvbnRyYXN0OiBub25lKSwgKC1tcy1oaWdoLWNvbnRyYXN0OiBhY3RpdmUpIHtcXG4gICNqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC10aXRsZWJhciB7XFxuICAgIG1heC13aWR0aDogMTA1cHg7IH0gfVxcblxcbi8qIFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYICovXFxuLyogYm9vdHN0cmFwIGFkanVzdG1lbnRzICovXFxuLmpzUGFuZWwucGFuZWwtZGVmYXVsdCwgLmpzUGFuZWwucGFuZWwtcHJpbWFyeSwgLmpzUGFuZWwucGFuZWwtaW5mbywgLmpzUGFuZWwucGFuZWwtc3VjY2VzcywgLmpzUGFuZWwucGFuZWwtd2FybmluZywgLmpzUGFuZWwucGFuZWwtZGFuZ2VyLCAuanNQYW5lbC5jYXJkLmNhcmQtaW52ZXJzZSB7XFxuICBib3gtc2hhZG93OiAwIDAgNnB4IHJnYmEoMCwgMzMsIDUwLCAwLjEpLCAwIDdweCAyNXB4IHJnYmEoMTcsIDM4LCA2MCwgMC40KTsgfVxcblxcbi5qc1BhbmVsLnBhbmVsIHtcXG4gIG1hcmdpbjogMDsgfVxcblxcbi5qc1BhbmVsLWhkci5wYW5lbC1oZWFkaW5nIHtcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7XFxuICBwYWRkaW5nOiAwOyB9XFxuXFxuLmpzUGFuZWwtdGl0bGUucGFuZWwtdGl0bGUgLnNtYWxsLCAuanNQYW5lbC10aXRsZS5wYW5lbC10aXRsZSBzbWFsbCB7XFxuICBmb250LXNpemU6IDc1JTsgfVxcblxcbi8qIGJvb3RzdHJhcCA0IGFkanVzdG1lbnRzICovXFxuLmpzUGFuZWwuY2FyZC5jYXJkLWludmVyc2Uge1xcbiAgYm94LXNoYWRvdzogMCAwIDZweCByZ2JhKDAsIDMzLCA1MCwgMC4xKSwgMCA3cHggMjVweCByZ2JhKDE3LCAzOCwgNjAsIDAuNCk7IH1cXG5cXG4uY2FyZC1kZWZhdWx0IHtcXG4gIGJhY2tncm91bmQ6ICNmNWY1ZjU7IH1cXG5cXG4uY2FyZC1wcmltYXJ5ID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkLFxcbi5jYXJkLXN1Y2Nlc3MgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQsXFxuLmNhcmQtaW5mbyA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCxcXG4uY2FyZC13YXJuaW5nID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkLFxcbi5jYXJkLWRhbmdlciA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCB7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yOiAjZjVmNWY1OyB9XFxuXFxuLmNhcmQtZGVmYXVsdCA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCB7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLyogY3NzMyBhbmltYXRpb25zICovXFxuQGtleWZyYW1lcyBqc1BhbmVsRmFkZUluIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbi5qc1BhbmVsRmFkZUluIHtcXG4gIG9wYWNpdHk6IDA7XFxuICBhbmltYXRpb246IGpzUGFuZWxGYWRlSW4gZWFzZS1pbiAxO1xcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDYwMG1zOyB9XFxuXFxuQGtleWZyYW1lcyBqc1BhbmVsRmFkZU91dCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwOyB9IH1cXG5cXG4uanNQYW5lbEZhZGVPdXQge1xcbiAgYW5pbWF0aW9uOiBqc1BhbmVsRmFkZU91dCBlYXNlLWluIDE7XFxuICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogNjAwbXM7IH1cXG5cXG5Aa2V5ZnJhbWVzIG1vZGFsQmFja2Ryb3BGYWRlSW4ge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMC42NTsgfSB9XFxuXFxuLmpzUGFuZWwtbW9kYWwtYmFja2Ryb3Age1xcbiAgYW5pbWF0aW9uOiBtb2RhbEJhY2tkcm9wRmFkZUluIGVhc2UtaW4gMTtcXG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiA3NTBtcztcXG4gIGJhY2tncm91bmQ6IGJsYWNrO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlOyB9XFxuXFxuQGtleWZyYW1lcyBtb2RhbEJhY2tkcm9wRmFkZU91dCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMC42NTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwOyB9IH1cXG5cXG4uanNQYW5lbC1tb2RhbC1iYWNrZHJvcC1vdXQge1xcbiAgYW5pbWF0aW9uOiBtb2RhbEJhY2tkcm9wRmFkZU91dCBlYXNlLWluIDE7XFxuICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogNDAwbXM7IH1cXG5cXG4uanNQYW5lbC1tb2RhbC1iYWNrZHJvcC1tdWx0aSB7XFxuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMTUpOyB9XFxuXFxuLmpzUGFuZWwtY29udGVudCAuanNQYW5lbC1pZnJhbWUtb3ZlcmxheSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50OyB9XFxuXFxuLyogX3RoZW1lc19tZGwuc2FzczogMjAxNy0wNy0xMiAxOToxNiAqL1xcbi8qIGRlZmF1bHQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcbi5qc1BhbmVsLXRoZW1lLWRlZmF1bHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NmZDhkYztcXG4gIGJvcmRlci1jb2xvcjogI2NmZDhkYzsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRlZmF1bHQgPiAuanNQYW5lbC1oZHIgKiB7XFxuICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRlZmF1bHQgPiAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGRyLXRvb2xiYXIge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM5MGE0YWU7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1kZWZhdWx0ID4gLmpzUGFuZWwtY29udGVudCB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzkwYTRhZTsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRlZmF1bHQgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NmZDhkYztcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjOTBhNGFlOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtZGVmYXVsdCA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZGxpZ2h0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlY2VmZjE7IH1cXG5cXG4vKiBwcmltYXJ5IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXG4uanNQYW5lbC10aGVtZS1wcmltYXJ5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMTk2ZjM7XFxuICBib3JkZXItY29sb3I6ICMyMTk2ZjM7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1wcmltYXJ5ID4gLmpzUGFuZWwtaGRyICoge1xcbiAgY29sb3I6ICNmZmZmZmY7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1wcmltYXJ5ID4gLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhkci10b29sYmFyIHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNDJhNWY1OyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtcHJpbWFyeSA+IC5qc1BhbmVsLWNvbnRlbnQge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM0MmE1ZjU7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1wcmltYXJ5ID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMTk2ZjM7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzQyYTVmNTtcXG4gIGNvbG9yOiAjZmZmZmZmOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtcHJpbWFyeSA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZGxpZ2h0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNiYmRlZmI7XFxuICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi8qIGluZm8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcbi5qc1BhbmVsLXRoZW1lLWluZm8ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI5YjZmNjtcXG4gIGJvcmRlci1jb2xvcjogIzI5YjZmNjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWluZm8gPiAuanNQYW5lbC1oZHIgKiB7XFxuICBjb2xvcjogI2ZmZmZmZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWluZm8gPiAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGRyLXRvb2xiYXIge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM0ZmMzZjc7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1pbmZvID4gLmpzUGFuZWwtY29udGVudCB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzRmYzNmNzsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWluZm8gPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI5YjZmNjtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNGZjM2Y3O1xcbiAgY29sb3I6ICNmZmZmZmY7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1pbmZvID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkbGlnaHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UxZjVmZTtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLyogc3VjY2VzcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtdGhlbWUtc3VjY2VzcyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGNhZjUwO1xcbiAgYm9yZGVyLWNvbG9yOiAjNGNhZjUwOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtc3VjY2VzcyA+IC5qc1BhbmVsLWhkciAqIHtcXG4gIGNvbG9yOiAjZmZmZmZmOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtc3VjY2VzcyA+IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZHItdG9vbGJhciB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzgxYzc4NDsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXN1Y2Nlc3MgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRjYWY1MDtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjODFjNzg0O1xcbiAgY29sb3I6ICNmZmZmZmY7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1zdWNjZXNzID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkbGlnaHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U4ZjVlOTtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLyogd2FybmluZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtdGhlbWUtd2FybmluZyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZjMTA3O1xcbiAgYm9yZGVyLWNvbG9yOiAjZmZjMTA3OyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtd2FybmluZyA+IC5qc1BhbmVsLWhkciAqIHtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtd2FybmluZyA+IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZHItdG9vbGJhciB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgI2ZmZDU0ZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXdhcm5pbmcgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYzEwNztcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZmZkNTRmO1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4uanNQYW5lbC10aGVtZS13YXJuaW5nID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkbGlnaHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjNlMDtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLyogZGFuZ2VyIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtdGhlbWUtZGFuZ2VyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjNkMDA7XFxuICBib3JkZXItY29sb3I6ICNmZjNkMDA7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1kYW5nZXIgPiAuanNQYW5lbC1oZHIgKiB7XFxuICBjb2xvcjogI2ZmZmZmZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRhbmdlciA+IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZHItdG9vbGJhciB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgI2ZmNmU0MDsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRhbmdlciA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYzZDAwO1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmZjZlNDA7XFxuICBjb2xvcjogI2ZmZmZmZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRhbmdlciA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZGxpZ2h0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjllODA7XFxuICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LW5vaGVhZGVyIHtcXG4gIGJvcmRlcjogbm9uZSAhaW1wb3J0YW50OyB9XFxuXFxuYm9keSB7XFxuICAtbXMtb3ZlcmZsb3ctc3R5bGU6IHNjcm9sbGJhcjsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI2J1dHRwbHVnZGV2dG9vbHNsb2dwYW5lbCB7XFxuICAgIGRpc3BsYXk6ZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246Y29sdW1uO1xcbiAgICB3aWR0aDoxMDAlO1xcbiAgICBoZWlnaHQ6MTAwJTtcXG4gICAgYWxpZ24taXRlbXM6Y2VudGVyO1xcbiAgICBjb2xvcjogIzAwMDtcXG59XFxuXFxuI2J1dHRwbHVnZGV2dG9vbHNsb2dwYW5lbCBpbnB1dCxzZWxlY3QsdGV4dGFyZWEge1xcbiAgICBjb2xvcjogIzAwMDtcXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcXG59XFxuXFxuI2J1dHRwbHVnZGV2dG9vbHNsb2dwYW5lbCAjYnV0dHBsdWdkZXZ0b29sc2xvZ3RleHRhcmVhIHtcXG4gICAgZm9udC1zaXplOiA4cHQ7XFxuICAgIHdpZHRoOjEwMCU7XFxuICAgIGZsZXg6MSAxO1xcbiAgICBwYWRkaW5nOjVweDtcXG4gICAgYm94LXNpemluZzpib3JkZXItYm94O1xcbn1cXG4jYnV0dHBsdWdkZXZ0b29sc2xvZ3BhbmVsICNidXR0cGx1Z2RldnRvb2xzbG9nbGV2ZWwge1xcbiAgICB3aWR0aDo5OCU7XFxuICAgIGZsZXg6bm9uZTtcXG4gICAgcGFkZGluZzo1cHg7XFxuICAgIGJveC1zaXppbmc6Ym9yZGVyLWJveDtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJtYWluIHtcXG4gICAgd2lkdGg6MTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG5zZWN0aW9uIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgcGFkZGluZzogMjBweDtcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkZGQ7XFxufVxcblxcbmlucHV0IHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxubGFiZWwge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIG1hcmdpbjogMCAwIC0xcHg7XFxuICAgIHBhZGRpbmc6IDVweCAxMHB4O1xcbiAgICBmb250LXdlaWdodDogNjAwO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGNvbG9yOiAjYmJiO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcXG59XFxuXFxubGFiZWw6YmVmb3JlIHtcXG4gICAgZm9udC1mYW1pbHk6IGZvbnRhd2Vzb21lO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxufVxcblxcbmxhYmVsOmhvdmVyIHtcXG4gICAgY29sb3I6ICM4ODg7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuaW5wdXQ6Y2hlY2tlZCArIGxhYmVsIHtcXG4gICAgY29sb3I6ICM1NTU7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XFxuICAgIGJvcmRlci10b3A6IDJweCBzb2xpZCBvcmFuZ2U7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZmZmO1xcbn1cXG5cXG4jdGFiMTpjaGVja2VkIH4gI2NvbnRlbnQxLFxcbiN0YWIyOmNoZWNrZWQgfiAjY29udGVudDIsXFxuI3RhYjM6Y2hlY2tlZCB+ICNjb250ZW50MyxcXG4jdGFiNDpjaGVja2VkIH4gI2NvbnRlbnQ0IHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbiNjb250ZW50MSB7XFxuICAgIGhlaWdodDogMTAwJTtcXG59XFxuXFxuI2NvbnRlbnQyIHtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4jc2ltdWxhdG9yIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogY2FsYygxMDAlIC0gNjBweCk7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxufVxcblxcbi5mbGVzaGxpZ2h0LXNpbSB7XFxuICAgIGZsZXg6IDE7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG5kaXYuYy1mbGVzaGxpZ2h0IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleDogMTtcXG59XFxuXFxuZGl2LmMtZmxlc2hsaWdodCBpbWcge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHdpZHRoOiBhdXRvO1xcblxcdCAgaW1hZ2UtcmVuZGVyaW5nOiAtbW96LWNyaXNwLWVkZ2VzO1xcblxcdCAgaW1hZ2UtcmVuZGVyaW5nOiAtby1jcmlzcC1lZGdlcztcXG5cXHQgIGltYWdlLXJlbmRlcmluZzogLXdlYmtpdC1vcHRpbWl6ZS1jb250cmFzdDtcXG5cXHQgIGltYWdlLXJlbmRlcmluZzogcGl4ZWxhdGVkO1xcbn1cXG5cXG5kaXYuYy1mbGVzaGxpZ2h0IC5vLWZsZXNobGlnaHQge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGhlaWdodDogNzclO1xcbn1cXG5cXG4udmlicmF0b3Itc2ltdWxhdG9yLWNvbXBvbmVudCB7XFxuICAgIGZsZXg6IDE7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG5kaXYudmlicmF0b3Ige1xcbiAgICBmbGV4OiAxIDE7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmRpdi52aWJyYXRvci1zaW11bGF0b3ItY29tcG9uZW50IGltZyB7XFxuICAgIGhlaWdodDogY2FsYygxMDAlIC0gNDBweCk7XFxuICAgIHdpZHRoOiBhdXRvO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGltYWdlLXJlbmRlcmluZzogLW1vei1jcmlzcC1lZGdlcztcXG5cXHQgIGltYWdlLXJlbmRlcmluZzogLW8tY3Jpc3AtZWRnZXM7XFxuXFx0ICBpbWFnZS1yZW5kZXJpbmc6IC13ZWJraXQtb3B0aW1pemUtY29udHJhc3Q7XFxuXFx0ICBpbWFnZS1yZW5kZXJpbmc6IHBpeGVsYXRlZDtcXG59XFxuXFxuZGl2LnZpYnJhdG9yLWluZm8ge1xcbiAgICBmbGV4OiAwO1xcbn1cXG5cXG4uc2ltdWxhdG9yLWRpdmlkZXIge1xcbiAgICBib3JkZXItbGVmdDogMXB4ICMwMDAgZGFzaGVkO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxufVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24obikge1xuICBpZiAoIWlzTnVtYmVyKG4pIHx8IG4gPCAwIHx8IGlzTmFOKG4pKVxuICAgIHRocm93IFR5cGVFcnJvcignbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cy5lcnJvciB8fFxuICAgICAgICAoaXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSAmJiAhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpIHtcbiAgICAgIGVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuICgnICsgZXIgKyAnKScpO1xuICAgICAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNVbmRlZmluZWQoaGFuZGxlcikpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgICBjYXNlIDE6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBzbG93ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc09iamVjdChoYW5kbGVyKSkge1xuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBtO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gIGlmICh0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgIGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpID9cbiAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gIGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZVxuICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcblxuICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSAmJiAhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xuICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSkge1xuICAgICAgbSA9IHRoaXMuX21heExpc3RlbmVycztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICAgIH1cblxuICAgIGlmIChtICYmIG0gPiAwICYmIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGggPiBtKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnRyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQgaW4gSUUgMTBcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICB2YXIgZmlyZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBnKCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG5cbiAgICBpZiAoIWZpcmVkKSB7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGcubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgdGhpcy5vbih0eXBlLCBnKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZmYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGxpc3QsIHBvc2l0aW9uLCBsZW5ndGgsIGk7XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgbGlzdCA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHBvc2l0aW9uID0gLTE7XG5cbiAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8XG4gICAgICAoaXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QobGlzdCkpIHtcbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgICAobGlzdFtpXS5saXN0ZW5lciAmJiBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBrZXksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICByZXR1cm4gdGhpcztcblxuICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gIGlmICghdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICBlbHNlIGlmICh0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgZm9yIChrZXkgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGxpc3RlbmVycykpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gIH0gZWxzZSBpZiAobGlzdGVuZXJzKSB7XG4gICAgLy8gTElGTyBvcmRlclxuICAgIHdoaWxlIChsaXN0ZW5lcnMubGVuZ3RoKVxuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gW107XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgZWxzZVxuICAgIHJldCA9IHRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO1xuICByZXR1cm4gcmV0O1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24odHlwZSkge1xuICBpZiAodGhpcy5fZXZlbnRzKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgICBpZiAoaXNGdW5jdGlvbihldmxpc3RlbmVyKSlcbiAgICAgIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKGV2bGlzdGVuZXIpXG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIDA7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbn07XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbiIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vanNwYW5lbC5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL2pzcGFuZWwuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL2pzcGFuZWwuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7dmFyIF90eXBlb2YyPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbihlKXtyZXR1cm4gdHlwZW9mIGV9OmZ1bmN0aW9uKGUpe3JldHVybiBlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJmUuY29uc3RydWN0b3I9PT1TeW1ib2wmJmUhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIGV9LF90eXBlb2Y9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT09X3R5cGVvZjIoU3ltYm9sLml0ZXJhdG9yKT9mdW5jdGlvbihlKXtyZXR1cm5cInVuZGVmaW5lZFwiPT10eXBlb2YgZT9cInVuZGVmaW5lZFwiOl90eXBlb2YyKGUpfTpmdW5jdGlvbihlKXtyZXR1cm4gZSYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZlLmNvbnN0cnVjdG9yPT09U3ltYm9sJiZlIT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOlwidW5kZWZpbmVkXCI9PXR5cGVvZiBlP1widW5kZWZpbmVkXCI6X3R5cGVvZjIoZSl9O2Z1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShlKXtpZihBcnJheS5pc0FycmF5KGUpKXtmb3IodmFyIHQ9MCxuPUFycmF5KGUubGVuZ3RoKTt0PGUubGVuZ3RoO3QrKyluW3RdPWVbdF07cmV0dXJuIG59cmV0dXJuIEFycmF5LmZyb20oZSl9ZXhwb3J0IHZhciBqc1BhbmVsPXt2ZXJzaW9uOlwiNC4wLjAtYmV0YS41LjFcIixkYXRlOlwiMjAxOC0wNC0xOSAyMzoyMVwiLGFqYXhBbHdheXNDYWxsYmFja3M6W10sYXV0b3Bvc2l0aW9uU3BhY2luZzo0LGNsb3NlT25Fc2NhcGU6ZnVuY3Rpb24oKXtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLGZ1bmN0aW9uKHQpeyhcIkVzY2FwZVwiPT09dC5rZXl8fFwiRXNjXCI9PT10LmNvZGV8fDI3PT09dC5rZXlDb2RlKSYmanNQYW5lbC5nZXRQYW5lbHMoZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoXCJqc1BhbmVsXCIpfSkuc29tZShmdW5jdGlvbihlKXtyZXR1cm4hIWUub3B0aW9ucy5jbG9zZU9uRXNjYXBlJiYoZS5jbG9zZSgpLCEwKX0pfSwhMSl9KCksZGVmYXVsdHM6e2JveFNoYWRvdzozLGNvbnRhaW5lcjpkb2N1bWVudC5ib2R5LGNvbnRlbnRTaXplOnt3aWR0aDpcIjQwMHB4XCIsaGVpZ2h0OlwiMjAwcHhcIn0sZHJhZ2l0OntjdXJzb3I6XCJtb3ZlXCIsaGFuZGxlczpcIi5qc1BhbmVsLWhlYWRlcmxvZ28sIC5qc1BhbmVsLXRpdGxlYmFyLCAuanNQYW5lbC1mdHJcIixvcGFjaXR5Oi44LGRpc2FibGVPbk1heGltaXplZDohMH0saGVhZGVyOiEwLGhlYWRlclRpdGxlOlwianNQYW5lbFwiLGhlYWRlckNvbnRyb2xzOlwiYWxsXCIsaWNvbmZvbnQ6ITEsbWF4aW1pemVkTWFyZ2luOjAsbWluaW1pemVUbzpcImRlZmF1bHRcIixwYW5lbHR5cGU6XCJzdGFuZGFyZFwiLHBvc2l0aW9uOlwiY2VudGVyXCIscmVzaXplaXQ6e2hhbmRsZXM6XCJuLCBlLCBzLCB3LCBuZSwgc2UsIHN3LCBud1wiLG1pbldpZHRoOjQwLG1pbkhlaWdodDo0MH0sdGhlbWU6XCJkZWZhdWx0XCJ9LGRlZmF1bHRTbmFwQ29uZmlnOntzZW5zaXRpdml0eTo3MCx0cmlnZ2VyOlwicGFuZWxcIn0sZXJyb3I6ZnVuY3Rpb24oKXt3aW5kb3cuanNQYW5lbEVycm9yfHwod2luZG93LmpzUGFuZWxFcnJvcj1mdW5jdGlvbihlKXt0aGlzLm5hbWU9XCJqc1BhbmVsRXJyb3JcIix0aGlzLm1lc3NhZ2U9ZXx8XCJcIix0aGlzLnN0YWNrPW5ldyBFcnJvcigpLnN0YWNrfSxqc1BhbmVsRXJyb3IucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoRXJyb3IucHJvdG90eXBlKSxqc1BhbmVsRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yPWpzUGFuZWxFcnJvcil9KCksZXh0ZW5zaW9uczp7fSxnbG9iYWxDYWxsYmFja3M6ITEsaWNvbnM6e2Nsb3NlOlwiPHN2ZyBjbGFzcz1cXFwianNQYW5lbC1pY29uXFxcIiB2ZXJzaW9uPVxcXCIxLjFcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgd2lkdGg9XFxcIjI4XFxcIiBoZWlnaHQ9XFxcIjMyXFxcIiB2aWV3Qm94PVxcXCIwIDAgMjggMzJcXFwiPjxwYXRoIGZpbGw9XFxcImN1cnJlbnRDb2xvclxcXCIgZD1cXFwiTTE3Ljc1IDE2bDkuODUtOS44NWMwLjUtMC41IDAuNS0xLjMgMC0xLjc1LTAuNS0wLjUtMS4zLTAuNS0xLjc1IDBsLTkuODUgOS44NS05Ljg1LTkuOWMtMC41LTAuNS0xLjMtMC41LTEuNzUgMC0wLjUgMC41LTAuNSAxLjMgMCAxLjc1bDkuODUgOS45LTkuOSA5Ljg1Yy0wLjUgMC41LTAuNSAxLjMgMCAxLjc1IDAuMjUgMC4yNSAwLjU1IDAuMzUgMC45IDAuMzVzMC42NS0wLjEgMC45LTAuMzVsOS44NS05Ljg1IDkuODUgOS44NWMwLjI1IDAuMjUgMC41NSAwLjM1IDAuOSAwLjM1czAuNjUtMC4xIDAuOS0wLjM1YzAuNS0wLjUgMC41LTEuMyAwLTEuNzVsLTkuOS05Ljg1elxcXCI+PC9wYXRoPjwvc3ZnPlwiLG1heGltaXplOlwiPHN2ZyBjbGFzcz1cXFwianNQYW5lbC1pY29uXFxcIiB2ZXJzaW9uPVxcXCIxLjFcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgd2lkdGg9XFxcIjI4XFxcIiBoZWlnaHQ9XFxcIjMyXFxcIiB2aWV3Qm94PVxcXCIwIDAgMjggMzJcXFwiPjxwYXRoIGZpbGw9XFxcImN1cnJlbnRDb2xvclxcXCIgZD1cXFwiTTI3LjU1IDMuOWgtMjIuNmMtMC41NSAwLTEgMC40NS0xIDF2MjIuM2MwIDAuNTUgMC40NSAxIDEgMWgyMi41NWMwLjU1IDAgMS0wLjQ1IDEtMXYtMjIuM2MwLjA1MC0wLjU1LTAuNC0xLTAuOTUtMXpNNS45NSAyNi4xNXYtMThoMjAuNTV2MThoLTIwLjU1elxcXCI+PC9wYXRoPjwvc3ZnPlwiLG5vcm1hbGl6ZTpcIjxzdmcgY2xhc3M9XFxcImpzUGFuZWwtaWNvblxcXCIgdmVyc2lvbj1cXFwiMS4xXFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiIHdpZHRoPVxcXCIyOFxcXCIgaGVpZ2h0PVxcXCIzMlxcXCIgdmlld0JveD1cXFwiMCAwIDI4IDMyXFxcIj48cGF0aCBmaWxsPVxcXCJjdXJyZW50Q29sb3JcXFwiIGQ9XFxcIk0yNy45IDMuNzVoLTE4LjhjLTAuNCAwLTAuNzUgMC4zNS0wLjc1IDAuNzV2NC4zYzAgMC4xIDAgMC4yIDAuMDUwIDAuM2gtNC4yYy0wLjU1IDAtMSAwLjQ1LTEgMXYxNy40YzAgMC41NSAwLjQ1IDEgMSAxaDE3LjY1YzAuNTUgMCAxLTAuNDUgMS0xdi0zLjdjMC4wNTAgMCAwLjEgMC4wNTAgMC4yIDAuMDUwaDQuOWMwLjQgMCAwLjc1LTAuMzUgMC43NS0wLjc1di0xOC42Yy0wLjA1MC0wLjQtMC40LTAuNzUtMC44LTAuNzV6TTUuMiAyNi41di0xMi45NWMwLjA1MCAwIDAuMSAwIDAuMTUgMGgxNS40YzAuMDUwIDAgMC4xIDAgMC4xNSAwdjEyLjk1aC0xNS43ek0yNy4xNSAyMi4zNWgtNC4xNWMtMC4wNTAgMC0wLjE1IDAtMC4yIDAuMDUwdi0xMi4zYzAtMC41NS0wLjQ1LTEtMS0xaC0xMmMwLjA1MC0wLjEgMC4wNTAtMC4yIDAuMDUwLTAuM3YtMy41NWgxNy4zdjE3LjF6XFxcIj48L3BhdGg+PC9zdmc+XCIsbWluaW1pemU6XCI8c3ZnIGNsYXNzPVxcXCJqc1BhbmVsLWljb25cXFwiIHZlcnNpb249XFxcIjEuMVxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiB3aWR0aD1cXFwiMjhcXFwiIGhlaWdodD1cXFwiMzJcXFwiIHZpZXdCb3g9XFxcIjAgMCAyOCAzMlxcXCI+PHBhdGggZmlsbD1cXFwiY3VycmVudENvbG9yXFxcIiBkPVxcXCJNMjcuMyAyOC41aC0yMi42Yy0wLjg1IDAtMS41LTAuNjUtMS41LTEuNXMwLjY1LTEuNSAxLjUtMS41aDIyLjU1YzAuODUgMCAxLjUgMC42NSAxLjUgMS41cy0wLjY1IDEuNS0xLjQ1IDEuNXpcXFwiPjwvcGF0aD48L3N2Zz5cIixzbWFsbGlmeXJldjpcIjxzdmcgY2xhc3M9XFxcImpzUGFuZWwtaWNvblxcXCIgdmVyc2lvbj1cXFwiMS4xXFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiIHdpZHRoPVxcXCIyOFxcXCIgaGVpZ2h0PVxcXCIzMlxcXCIgdmlld0JveD1cXFwiMCAwIDI4IDMyXFxcIj48cGF0aCBmaWxsPVxcXCJjdXJyZW50Q29sb3JcXFwiIGQ9XFxcIk0xNS45NSAyMy4yYzAgMCAwIDAgMCAwLTAuMzUgMC0wLjY1LTAuMTUtMC45LTAuMzVsLTExLjctMTEuOWMtMC41LTAuNS0wLjUtMS4zIDAtMS43NSAwLjUtMC41IDEuMy0wLjUgMS43NSAwbDEwLjg1IDEwLjk1IDEwLjktMTAuOGMwLjUtMC41IDEuMy0wLjUgMS43NSAwczAuNSAxLjMgMCAxLjc1bC0xMS43NSAxMS43Yy0wLjI1IDAuMjUtMC41NSAwLjQtMC45IDAuNHpcXFwiPjwvcGF0aD48L3N2Zz5cIixzbWFsbGlmeTpcIjxzdmcgY2xhc3M9XFxcImpzUGFuZWwtaWNvblxcXCIgdmVyc2lvbj1cXFwiMS4xXFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiIHdpZHRoPVxcXCIyOFxcXCIgaGVpZ2h0PVxcXCIzMlxcXCIgdmlld0JveD1cXFwiMCAwIDI4IDMyXFxcIj48cGF0aCBmaWxsPVxcXCJjdXJyZW50Q29sb3JcXFwiIGQ9XFxcIk0yOC42NSAyMC44NWwtMTEuOC0xMS42NWMtMC41LTAuNS0xLjMtMC41LTEuNzUgMGwtMTEuNzUgMTEuODVjLTAuNSAwLjUtMC41IDEuMyAwIDEuNzUgMC4yNSAwLjI1IDAuNTUgMC4zNSAwLjkgMC4zNSAwLjMgMCAwLjY1LTAuMSAwLjktMC4zNWwxMC44NS0xMC45NSAxMC45IDEwLjhjMC41IDAuNSAxLjMgMC41IDEuNzUgMCAwLjUtMC41IDAuNS0xLjMgMC0xLjh6XFxcIj48L3BhdGg+PC9zdmc+XCJ9LGlkQ291bnRlcjowLGlzSUU6ZnVuY3Rpb24oKXtyZXR1cm4gbmF2aWdhdG9yLmFwcFZlcnNpb24ubWF0Y2goL1RyaWRlbnQvKX0oKSxtZGJ0aGVtZXM6W1wic2Vjb25kYXJ5XCIsXCJlbGVnYW50XCIsXCJzdHlsaXNoXCIsXCJ1bmlxdWVcIixcInNwZWNpYWxcIl0scG9pbnRlcmRvd246XCJvbnRvdWNoZW5kXCJpbiB3aW5kb3c/W1widG91Y2hzdGFydFwiLFwibW91c2Vkb3duXCJdOltcIm1vdXNlZG93blwiXSxwb2ludGVybW92ZTpcIm9udG91Y2hlbmRcImluIHdpbmRvdz9bXCJ0b3VjaG1vdmVcIixcIm1vdXNlbW92ZVwiXTpbXCJtb3VzZW1vdmVcIl0scG9pbnRlcnVwOlwib250b3VjaGVuZFwiaW4gd2luZG93P1tcInRvdWNoZW5kXCIsXCJtb3VzZXVwXCJdOltcIm1vdXNldXBcIl0scG9seWZpbGxzOmZ1bmN0aW9uKCl7dmFyIGU9U3RyaW5nLnByb3RvdHlwZTsoZnVuY3Rpb24oZSl7ZS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UuYXBwZW5kPWUuYXBwZW5kfHxmdW5jdGlvbigpe3ZhciBlPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyksdD1kb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7ZS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3ZhciBuPWUgaW5zdGFuY2VvZiBOb2RlO3QuYXBwZW5kQ2hpbGQobj9lOmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGUrXCJcIikpfSksdGhpcy5hcHBlbmRDaGlsZCh0KX19KX0pKFtFbGVtZW50LnByb3RvdHlwZSxEb2N1bWVudC5wcm90b3R5cGUsRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGVdKSx3aW5kb3cuRWxlbWVudCYmIUVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QmJihFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0PWZ1bmN0aW9uKGUpe3ZhciB0LG49KHRoaXMuZG9jdW1lbnR8fHRoaXMub3duZXJEb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChlKSxhPXRoaXM7ZG8gZm9yKHQ9bi5sZW5ndGg7MDw9LS10JiZuLml0ZW0odCkhPT1hOyk7d2hpbGUoMD50JiYoYT1hLnBhcmVudEVsZW1lbnQpKTtyZXR1cm4gYX0pLHdpbmRvdy5Ob2RlTGlzdCYmIU5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoJiYoTm9kZUxpc3QucHJvdG90eXBlLmZvckVhY2g9ZnVuY3Rpb24oZSx0KXt0PXR8fHdpbmRvdztmb3IodmFyIG49MDtuPHRoaXMubGVuZ3RoO24rKyllLmNhbGwodCx0aGlzW25dLG4sdGhpcyl9KSxPYmplY3QuYXNzaWdufHxPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LFwiYXNzaWduXCIse2VudW1lcmFibGU6ITEsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOmZ1bmN0aW9uKGUpe2lmKGU9PT12b2lkIDB8fG51bGw9PT1lKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY29udmVydCBmaXJzdCBhcmd1bWVudCB0byBvYmplY3RcIik7Zm9yKHZhciB0LG49T2JqZWN0KGUpLGE9MTthPGFyZ3VtZW50cy5sZW5ndGg7YSsrKWlmKHQ9YXJndW1lbnRzW2FdLHZvaWQgMCE9PXQmJm51bGwhPT10KXt0PU9iamVjdCh0KTtmb3IodmFyIG89T2JqZWN0LmtleXMoT2JqZWN0KHQpKSxpPTAsbD1vLmxlbmd0aDtpPGw7aSsrKXt2YXIgcz1vW2ldLHI9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LHMpO3ZvaWQgMCE9PXImJnIuZW51bWVyYWJsZSYmKG5bc109dFtzXSl9fXJldHVybiBufX0pLGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZShlLHQpe3Q9dHx8e2J1YmJsZXM6ITEsY2FuY2VsYWJsZTohMSxkZXRhaWw6dm9pZCAwfTt2YXIgbj1kb2N1bWVudC5jcmVhdGVFdmVudChcIkN1c3RvbUV2ZW50XCIpO3JldHVybiBuLmluaXRDdXN0b21FdmVudChlLHQuYnViYmxlcyx0LmNhbmNlbGFibGUsdC5kZXRhaWwpLG59cmV0dXJuXCJmdW5jdGlvblwiIT10eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50JiZ2b2lkKGUucHJvdG90eXBlPXdpbmRvdy5FdmVudC5wcm90b3R5cGUsd2luZG93LkN1c3RvbUV2ZW50PWUpfSgpLGUuZW5kc1dpdGh8fChlLmVuZHNXaXRoPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHQ8dGhpcy5sZW5ndGg/dHw9MDp0PXRoaXMubGVuZ3RoLHRoaXMuc3Vic3RyKHQtZS5sZW5ndGgsZS5sZW5ndGgpPT09ZX0pLGUuc3RhcnRzV2l0aHx8KGUuc3RhcnRzV2l0aD1mdW5jdGlvbihlLHQpe3JldHVybiB0aGlzLnN1YnN0cih0fHwwLGUubGVuZ3RoKT09PWV9KX0oKSx0aGVtZXM6W1wiZGVmYXVsdFwiLFwicHJpbWFyeVwiLFwiaW5mb1wiLFwic3VjY2Vzc1wiLFwid2FybmluZ1wiLFwiZGFuZ2VyXCJdLHppQmFzZToxMDAsYWpheDpmdW5jdGlvbihvYmosYWpheENvbmZpZyl7dmFyIG9iaklzUGFuZWw7XCJvYmplY3RcIj09PShcInVuZGVmaW5lZFwiPT10eXBlb2Ygb2JqP1widW5kZWZpbmVkXCI6X3R5cGVvZihvYmopKSYmb2JqLmNsYXNzTGlzdC5jb250YWlucyhcImpzUGFuZWxcIik/b2JqSXNQYW5lbD0hMDoob2JqSXNQYW5lbD0hMSxcInN0cmluZ1wiPT10eXBlb2Ygb2JqJiYob2JqPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob2JqKSkpO3ZhciBjb25mPWFqYXhDb25maWcsY29uZmlnRGVmYXVsdHM9e21ldGhvZDpcIkdFVFwiLGFzeW5jOiEwLHVzZXI6XCJcIixwd2Q6XCJcIixkb25lOmZ1bmN0aW9uKCl7b2JqSXNQYW5lbD9vYmouY29udGVudC5pbm5lckhUTUw9dGhpcy5yZXNwb25zZVRleHQ6b2JqLmlubmVySFRNTD10aGlzLnJlc3BvbnNlVGV4dH0sYXV0b3Jlc2l6ZTohMCxhdXRvcmVwb3NpdGlvbjohMH0sY29uZmlnPXZvaWQgMDtpZihcInN0cmluZ1wiPT10eXBlb2YgY29uZiljb25maWc9T2JqZWN0LmFzc2lnbih7fSxjb25maWdEZWZhdWx0cyx7dXJsOmVuY29kZVVSSShjb25mKSxldmFsc2NyaXB0dGFnczohMH0pO2Vsc2UgaWYoXCJvYmplY3RcIj09PShcInVuZGVmaW5lZFwiPT10eXBlb2YgY29uZj9cInVuZGVmaW5lZFwiOl90eXBlb2YoY29uZikpJiZjb25mLnVybCljb25maWc9T2JqZWN0LmFzc2lnbih7fSxjb25maWdEZWZhdWx0cyxjb25mKSxjb25maWcudXJsPWVuY29kZVVSSShjb25mLnVybCksITE9PT1jb25maWcuYXN5bmMmJihjb25maWcudGltZW91dD0wLGNvbmZpZy53aXRoQ3JlZGVudGlhbHMmJihjb25maWcud2l0aENyZWRlbnRpYWxzPXZvaWQgMCksY29uZmlnLnJlc3BvbnNlVHlwZSYmKGNvbmZpZy5yZXNwb25zZVR5cGU9dm9pZCAwKSk7ZWxzZSByZXR1cm4gY29uc29sZS5pbmZvKFwiWE1MSHR0cFJlcXVlc3Qgc2VlbXMgdG8gbWlzcyB0aGUgcmVxdWVzdCB1cmwhXCIpLG9iajt2YXIgeGhyPW5ldyBYTUxIdHRwUmVxdWVzdDtyZXR1cm4geGhyLm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpe2lmKDQ9PT14aHIucmVhZHlTdGF0ZSl7aWYoMjAwIT09eGhyLnN0YXR1cyljb25maWcuZmFpbCYmY29uZmlnLmZhaWwuY2FsbCh4aHIsb2JqKTtlbHNlIGlmKGNvbmZpZy5kb25lLmNhbGwoeGhyLG9iaiksY29uZmlnLmV2YWxzY3JpcHR0YWdzKXt2YXIgc2NyaXB0dGFncz14aHIucmVzcG9uc2VUZXh0Lm1hdGNoKC88c2NyaXB0XFxiW14+XSo+KFtcXHNcXFNdKj8pPFxcL3NjcmlwdD4vZ2kpO3NjcmlwdHRhZ3MmJnNjcmlwdHRhZ3MuZm9yRWFjaChmdW5jdGlvbih0YWcpe3ZhciBqcz10YWcucmVwbGFjZSgvPHNjcmlwdFxcYltePl0qPi9pLFwiXCIpLnJlcGxhY2UoLzxcXC9zY3JpcHQ+L2ksXCJcIikudHJpbSgpO2V2YWwoanMpfSl9aWYoY29uZmlnLmFsd2F5cyYmY29uZmlnLmFsd2F5cy5jYWxsKHhocixvYmopLG9iaklzUGFuZWwpe3ZhciBvQ29udGVudFNpemU9b2JqLm9wdGlvbnMuY29udGVudFNpemU7aWYoXCJzdHJpbmdcIj09dHlwZW9mIG9Db250ZW50U2l6ZSYmb0NvbnRlbnRTaXplLm1hdGNoKC9hdXRvL2kpKXt2YXIgcGFydHM9b0NvbnRlbnRTaXplLnNwbGl0KFwiIFwiKSxzaXplcz1PYmplY3QuYXNzaWduKHt9LHt3aWR0aDpwYXJ0c1swXSxoZWlnaHQ6cGFydHNbMV19KTtjb25maWcuYXV0b3Jlc2l6ZSYmb2JqLnJlc2l6ZShzaXplcyksIW9iai5jbGFzc0xpc3QuY29udGFpbnMoXCJqc1BhbmVsLWNvbnRleHRtZW51XCIpJiZjb25maWcuYXV0b3JlcG9zaXRpb24mJm9iai5yZXBvc2l0aW9uKCl9ZWxzZSBpZihcIm9iamVjdFwiPT09KFwidW5kZWZpbmVkXCI9PXR5cGVvZiBvQ29udGVudFNpemU/XCJ1bmRlZmluZWRcIjpfdHlwZW9mKG9Db250ZW50U2l6ZSkpJiYoXCJhdXRvXCI9PT1vQ29udGVudFNpemUud2lkdGh8fFwiYXV0b1wiPT09b0NvbnRlbnRTaXplLmhlaWdodCkpe3ZhciBfc2l6ZXM9T2JqZWN0LmFzc2lnbih7fSxvQ29udGVudFNpemUpO2NvbmZpZy5hdXRvcmVzaXplJiZvYmoucmVzaXplKF9zaXplcyksIW9iai5jbGFzc0xpc3QuY29udGFpbnMoXCJqc1BhbmVsLWNvbnRleHRtZW51XCIpJiZjb25maWcuYXV0b3JlcG9zaXRpb24mJm9iai5yZXBvc2l0aW9uKCl9fWpzUGFuZWwuYWpheEFsd2F5c0NhbGxiYWNrcy5sZW5ndGgmJmpzUGFuZWwuYWpheEFsd2F5c0NhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UuY2FsbChvYmosb2JqKX0pfX0seGhyLm9wZW4oY29uZmlnLm1ldGhvZCxjb25maWcudXJsLGNvbmZpZy5hc3luYyxjb25maWcudXNlcixjb25maWcucHdkKSx4aHIudGltZW91dD1jb25maWcudGltZW91dHx8MCxjb25maWcud2l0aENyZWRlbnRpYWxzJiYoeGhyLndpdGhDcmVkZW50aWFscz1jb25maWcud2l0aENyZWRlbnRpYWxzKSxjb25maWcucmVzcG9uc2VUeXBlJiYoeGhyLnJlc3BvbnNlVHlwZT1jb25maWcucmVzcG9uc2VUeXBlKSxjb25maWcuYmVmb3JlU2VuZCYmY29uZmlnLmJlZm9yZVNlbmQuY2FsbCh4aHIpLGNvbmZpZy5kYXRhP3hoci5zZW5kKGNvbmZpZy5kYXRhKTp4aHIuc2VuZChudWxsKSxvYmp9LGNhbGNDb2xvcnM6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5jb2xvcihlKSxuPXRoaXMubGlnaHRlbihlLC44MSksYT10aGlzLmRhcmtlbihlLC41KSxvPS41NTY+PXRoaXMucGVyY2VpdmVkQnJpZ2h0bmVzcyhlKT9cIiNmZmZmZmZcIjpcIiMwMDAwMDBcIixpPS41NTY+PXRoaXMucGVyY2VpdmVkQnJpZ2h0bmVzcyhuKT9cIiNmZmZmZmZcIjpcIiMwMDAwMDBcIixsPS41NTY+PXRoaXMucGVyY2VpdmVkQnJpZ2h0bmVzcyhhKT9cIiMwMDAwMDBcIjpcIiNmZmZmZmZcIjtyZXR1cm5bdC5oc2wuY3NzLG4sYSxvLGksbF19LGNvbG9yOmZ1bmN0aW9uIGUodCl7dmFyIG4sYSxvLGkscixzLGwsZCxjLGU9dC50b0xvd2VyQ2FzZSgpLGg9e30scD0vXiM/KFswLTlhLWZdezN9fFswLTlhLWZdezZ9KSQvZ2ksbT0vXnJnYmE/XFwoKFswLTldezEsM30pLChbMC05XXsxLDN9KSwoWzAtOV17MSwzfSksPygwfDF8MFxcLlswLTldezEsMn18XFwuWzAtOV17MSwyfSk/XFwpJC9naSxmPS9eaHNsYT9cXCgoWzAtOV17MSwzfSksKFswLTldezEsM30lKSwoWzAtOV17MSwzfSUpLD8oMHwxfDBcXC5bMC05XXsxLDJ9fFxcLlswLTldezEsMn0pP1xcKSQvZ2ksZz17YWxpY2VibHVlOlwiZjBmOGZmXCIsYW50aXF1ZXdoaXRlOlwiZmFlYmQ3XCIsYXF1YTpcIjBmZlwiLGFxdWFtYXJpbmU6XCI3ZmZmZDRcIixhenVyZTpcImYwZmZmZlwiLGJlaWdlOlwiZjVmNWRjXCIsYmlzcXVlOlwiZmZlNGM0XCIsYmxhY2s6XCIwMDBcIixibGFuY2hlZGFsbW9uZDpcImZmZWJjZFwiLGJsdWU6XCIwMGZcIixibHVldmlvbGV0OlwiOGEyYmUyXCIsYnJvd246XCJhNTJhMmFcIixidXJseXdvb2Q6XCJkZWI4ODdcIixjYWRldGJsdWU6XCI1ZjllYTBcIixjaGFydHJldXNlOlwiN2ZmZjAwXCIsY2hvY29sYXRlOlwiZDI2OTFlXCIsY29yYWw6XCJmZjdmNTBcIixjb3JuZmxvd2VyYmx1ZTpcIjY0OTVlZFwiLGNvcm5zaWxrOlwiZmZmOGRjXCIsY3JpbXNvbjpcImRjMTQzY1wiLGN5YW46XCIwZmZcIixkYXJrYmx1ZTpcIjAwMDA4YlwiLGRhcmtjeWFuOlwiMDA4YjhiXCIsZGFya2dvbGRlbnJvZDpcImI4ODYwYlwiLGRhcmtncmF5OlwiYTlhOWE5XCIsZGFya2dyZXk6XCJhOWE5YTlcIixkYXJrZ3JlZW46XCIwMDY0MDBcIixkYXJra2hha2k6XCJiZGI3NmJcIixkYXJrbWFnZW50YTpcIjhiMDA4YlwiLGRhcmtvbGl2ZWdyZWVuOlwiNTU2YjJmXCIsZGFya29yYW5nZTpcImZmOGMwMFwiLGRhcmtvcmNoaWQ6XCI5OTMyY2NcIixkYXJrcmVkOlwiOGIwMDAwXCIsZGFya3NhbG1vbjpcImU5OTY3YVwiLGRhcmtzZWFncmVlbjpcIjhmYmM4ZlwiLGRhcmtzbGF0ZWJsdWU6XCI0ODNkOGJcIixkYXJrc2xhdGVncmF5OlwiMmY0ZjRmXCIsZGFya3NsYXRlZ3JleTpcIjJmNGY0ZlwiLGRhcmt0dXJxdW9pc2U6XCIwMGNlZDFcIixkYXJrdmlvbGV0OlwiOTQwMGQzXCIsZGVlcHBpbms6XCJmZjE0OTNcIixkZWVwc2t5Ymx1ZTpcIjAwYmZmZlwiLGRpbWdyYXk6XCI2OTY5NjlcIixkaW1ncmV5OlwiNjk2OTY5XCIsZG9kZ2VyYmx1ZTpcIjFlOTBmZlwiLGZpcmVicmljazpcImIyMjIyMlwiLGZsb3JhbHdoaXRlOlwiZmZmYWYwXCIsZm9yZXN0Z3JlZW46XCIyMjhiMjJcIixmdWNoc2lhOlwiZjBmXCIsZ2FpbnNib3JvOlwiZGNkY2RjXCIsZ2hvc3R3aGl0ZTpcImY4ZjhmZlwiLGdvbGQ6XCJmZmQ3MDBcIixnb2xkZW5yb2Q6XCJkYWE1MjBcIixncmF5OlwiODA4MDgwXCIsZ3JleTpcIjgwODA4MFwiLGdyZWVuOlwiMDA4MDAwXCIsZ3JlZW55ZWxsb3c6XCJhZGZmMmZcIixob25leWRldzpcImYwZmZmMFwiLGhvdHBpbms6XCJmZjY5YjRcIixpbmRpYW5yZWQ6XCJjZDVjNWNcIixpbmRpZ286XCI0YjAwODJcIixpdm9yeTpcImZmZmZmMFwiLGtoYWtpOlwiZjBlNjhjXCIsbGF2ZW5kZXI6XCJlNmU2ZmFcIixsYXZlbmRlcmJsdXNoOlwiZmZmMGY1XCIsbGF3bmdyZWVuOlwiN2NmYzAwXCIsbGVtb25jaGlmZm9uOlwiZmZmYWNkXCIsbGlnaHRibHVlOlwiYWRkOGU2XCIsbGlnaHRjb3JhbDpcImYwODA4MFwiLGxpZ2h0Y3lhbjpcImUwZmZmZlwiLGxpZ2h0Z29sZGVucm9keWVsbG93OlwiZmFmYWQyXCIsbGlnaHRncmF5OlwiZDNkM2QzXCIsbGlnaHRncmV5OlwiZDNkM2QzXCIsbGlnaHRncmVlbjpcIjkwZWU5MFwiLGxpZ2h0cGluazpcImZmYjZjMVwiLGxpZ2h0c2FsbW9uOlwiZmZhMDdhXCIsbGlnaHRzZWFncmVlbjpcIjIwYjJhYVwiLGxpZ2h0c2t5Ymx1ZTpcIjg3Y2VmYVwiLGxpZ2h0c2xhdGVncmF5OlwiNzg5XCIsbGlnaHRzbGF0ZWdyZXk6XCI3ODlcIixsaWdodHN0ZWVsYmx1ZTpcImIwYzRkZVwiLGxpZ2h0eWVsbG93OlwiZmZmZmUwXCIsbGltZTpcIjBmMFwiLGxpbWVncmVlbjpcIjMyY2QzMlwiLGxpbmVuOlwiZmFmMGU2XCIsbWFnZW50YTpcImYwZlwiLG1hcm9vbjpcIjgwMDAwMFwiLG1lZGl1bWFxdWFtYXJpbmU6XCI2NmNkYWFcIixtZWRpdW1ibHVlOlwiMDAwMGNkXCIsbWVkaXVtb3JjaGlkOlwiYmE1NWQzXCIsbWVkaXVtcHVycGxlOlwiOTM3MGQ4XCIsbWVkaXVtc2VhZ3JlZW46XCIzY2IzNzFcIixtZWRpdW1zbGF0ZWJsdWU6XCI3YjY4ZWVcIixtZWRpdW1zcHJpbmdncmVlbjpcIjAwZmE5YVwiLG1lZGl1bXR1cnF1b2lzZTpcIjQ4ZDFjY1wiLG1lZGl1bXZpb2xldHJlZDpcImM3MTU4NVwiLG1pZG5pZ2h0Ymx1ZTpcIjE5MTk3MFwiLG1pbnRjcmVhbTpcImY1ZmZmYVwiLG1pc3R5cm9zZTpcImZmZTRlMVwiLG1vY2Nhc2luOlwiZmZlNGI1XCIsbmF2YWpvd2hpdGU6XCJmZmRlYWRcIixuYXZ5OlwiMDAwMDgwXCIsb2xkbGFjZTpcImZkZjVlNlwiLG9saXZlOlwiODA4MDAwXCIsb2xpdmVkcmFiOlwiNmI4ZTIzXCIsb3JhbmdlOlwiZmZhNTAwXCIsb3JhbmdlcmVkOlwiZmY0NTAwXCIsb3JjaGlkOlwiZGE3MGQ2XCIscGFsZWdvbGRlbnJvZDpcImVlZThhYVwiLHBhbGVncmVlbjpcIjk4ZmI5OFwiLHBhbGV0dXJxdW9pc2U6XCJhZmVlZWVcIixwYWxldmlvbGV0cmVkOlwiZDg3MDkzXCIscGFwYXlhd2hpcDpcImZmZWZkNVwiLHBlYWNocHVmZjpcImZmZGFiOVwiLHBlcnU6XCJjZDg1M2ZcIixwaW5rOlwiZmZjMGNiXCIscGx1bTpcImRkYTBkZFwiLHBvd2RlcmJsdWU6XCJiMGUwZTZcIixwdXJwbGU6XCI4MDAwODBcIixyZWJlY2NhcHVycGxlOlwiNjM5XCIscmVkOlwiZjAwXCIscm9zeWJyb3duOlwiYmM4ZjhmXCIscm95YWxibHVlOlwiNDE2OWUxXCIsc2FkZGxlYnJvd246XCI4YjQ1MTNcIixzYWxtb246XCJmYTgwNzJcIixzYW5keWJyb3duOlwiZjRhNDYwXCIsc2VhZ3JlZW46XCIyZThiNTdcIixzZWFzaGVsbDpcImZmZjVlZVwiLHNpZW5uYTpcImEwNTIyZFwiLHNpbHZlcjpcImMwYzBjMFwiLHNreWJsdWU6XCI4N2NlZWJcIixzbGF0ZWJsdWU6XCI2YTVhY2RcIixzbGF0ZWdyYXk6XCI3MDgwOTBcIixzbGF0ZWdyZXk6XCI3MDgwOTBcIixzbm93OlwiZmZmYWZhXCIsc3ByaW5nZ3JlZW46XCIwMGZmN2ZcIixzdGVlbGJsdWU6XCI0NjgyYjRcIix0YW46XCJkMmI0OGNcIix0ZWFsOlwiMDA4MDgwXCIsdGhpc3RsZTpcImQ4YmZkOFwiLHRvbWF0bzpcImZmNjM0N1wiLHR1cnF1b2lzZTpcIjQwZTBkMFwiLHZpb2xldDpcImVlODJlZVwiLHdoZWF0OlwiZjVkZWIzXCIsd2hpdGU6XCJmZmZcIix3aGl0ZXNtb2tlOlwiZjVmNWY1XCIseWVsbG93OlwiZmYwXCIseWVsbG93Z3JlZW46XCI5YWNkMzJcIn07cmV0dXJuIGdbZV0mJihlPWdbZV0pLG51bGw9PT1lLm1hdGNoKHApP2UubWF0Y2gobSk/KGw9bS5leGVjKGUpLGgucmdiPXtjc3M6ZSxyOmxbMV0sZzpsWzJdLGI6bFszXX0saC5oZXg9dGhpcy5yZ2JUb0hleChsWzFdLGxbMl0sbFszXSksYz10aGlzLnJnYlRvSHNsKGxbMV0sbFsyXSxsWzNdKSxoLmhzbD1jKTplLm1hdGNoKGYpPyhsPWYuZXhlYyhlKSxpPWxbMV0vMzYwLHI9bFsyXS5zdWJzdHIoMCxsWzJdLmxlbmd0aC0xKS8xMDAscz1sWzNdLnN1YnN0cigwLGxbM10ubGVuZ3RoLTEpLzEwMCxkPXRoaXMuaHNsVG9SZ2IoaSxyLHMpLGgucmdiPXtjc3M6XCJyZ2IoXCIrZFswXStcIixcIitkWzFdK1wiLFwiK2RbMl0rXCIpXCIscjpkWzBdLGc6ZFsxXSxiOmRbMl19LGguaGV4PXRoaXMucmdiVG9IZXgoaC5yZ2IucixoLnJnYi5nLGgucmdiLmIpLGguaHNsPXtjc3M6XCJoc2woXCIrbFsxXStcIixcIitsWzJdK1wiLFwiK2xbM10rXCIpXCIsaDpsWzFdLHM6bFsyXSxsOmxbM119KTooaC5oZXg9XCIjZjVmNWY1XCIsaC5yZ2I9e2NzczpcInJnYigyNDUsMjQ1LDI0NSlcIixyOjI0NSxnOjI0NSxiOjI0NX0saC5oc2w9e2NzczpcImhzbCgwLDAlLDk2LjA4JSlcIixoOjAsczpcIjAlXCIsbDpcIjk2LjA4JVwifSk6KGU9ZS5yZXBsYWNlKFwiI1wiLFwiXCIpLDE9PWUubGVuZ3RoJTI/KG49ZS5zdWJzdHIoMCwxKStcIlwiK2Uuc3Vic3RyKDAsMSksYT1lLnN1YnN0cigxLDEpK1wiXCIrZS5zdWJzdHIoMSwxKSxvPWUuc3Vic3RyKDIsMSkrXCJcIitlLnN1YnN0cigyLDEpLGgucmdiPXtyOnBhcnNlSW50KG4sMTYpLGc6cGFyc2VJbnQoYSwxNiksYjpwYXJzZUludChvLDE2KX0saC5oZXg9XCIjXCIrbithK28pOihoLnJnYj17cjpwYXJzZUludChlLnN1YnN0cigwLDIpLDE2KSxnOnBhcnNlSW50KGUuc3Vic3RyKDIsMiksMTYpLGI6cGFyc2VJbnQoZS5zdWJzdHIoNCwyKSwxNil9LGguaGV4PVwiI1wiK2UpLGM9dGhpcy5yZ2JUb0hzbChoLnJnYi5yLGgucmdiLmcsaC5yZ2IuYiksaC5oc2w9YyxoLnJnYi5jc3M9XCJyZ2IoXCIraC5yZ2IucitcIixcIitoLnJnYi5nK1wiLFwiK2gucmdiLmIrXCIpXCIpLGh9LGNyZWF0ZVBhbmVsVGVtcGxhdGU6ZnVuY3Rpb24oKXt2YXIgZT0hKDA8YXJndW1lbnRzLmxlbmd0aCYmdm9pZCAwIT09YXJndW1lbnRzWzBdKXx8YXJndW1lbnRzWzBdLHQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtyZXR1cm4gdC5jbGFzc05hbWU9XCJqc1BhbmVsXCIsZSYmW1wiY2xvc2VcIixcIm1heGltaXplXCIsXCJub3JtYWxpemVcIixcIm1pbmltaXplXCIsXCJzbWFsbGlmeVwiLFwic21hbGxpZnlyZXZcIl0uZm9yRWFjaChmdW5jdGlvbihlKXt0LnNldEF0dHJpYnV0ZShcImRhdGEtYnRuXCIrZSxcImVuYWJsZWRcIil9KSx0LmlubmVySFRNTD1cIjxkaXYgY2xhc3M9XFxcImpzUGFuZWwtaGRyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImpzUGFuZWwtaGVhZGVyYmFyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJqc1BhbmVsLWhlYWRlcmxvZ29cXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImpzUGFuZWwtdGl0bGViYXJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwianNQYW5lbC10aXRsZVxcXCI+PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImpzUGFuZWwtY29udHJvbGJhclxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLXNtYWxsaWZ5XFxcIj5cIit0aGlzLmljb25zLnNtYWxsaWZ5K1wiPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLXNtYWxsaWZ5cmV2XFxcIj5cIit0aGlzLmljb25zLnNtYWxsaWZ5cmV2K1wiPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLW1pbmltaXplXFxcIj5cIit0aGlzLmljb25zLm1pbmltaXplK1wiPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLW5vcm1hbGl6ZVxcXCI+XCIrdGhpcy5pY29ucy5ub3JtYWxpemUrXCI8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwianNQYW5lbC1idG4ganNQYW5lbC1idG4tbWF4aW1pemVcXFwiPlwiK3RoaXMuaWNvbnMubWF4aW1pemUrXCI8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwianNQYW5lbC1idG4ganNQYW5lbC1idG4tY2xvc2VcXFwiPlwiK3RoaXMuaWNvbnMuY2xvc2UrXCI8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwianNQYW5lbC1oZHItdG9vbGJhclxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJqc1BhbmVsLWNvbnRlbnQganNQYW5lbC1jb250ZW50LW5vZm9vdGVyXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwianNQYW5lbC1taW5pbWl6ZWQtYm94XFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwianNQYW5lbC1mdHJcXFwiPjwvZGl2PlwiLHR9LGNyZWF0ZU1pbmltaXplZFRlbXBsYXRlOmZ1bmN0aW9uKCl7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtyZXR1cm4gZS5jbGFzc05hbWU9XCJqc1BhbmVsLXJlcGxhY2VtZW50XCIsZS5pbm5lckhUTUw9XCI8ZGl2IGNsYXNzPVxcXCJqc1BhbmVsLWhkclxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJqc1BhbmVsLWhlYWRlcmJhclxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwianNQYW5lbC1oZWFkZXJsb2dvXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJqc1BhbmVsLXRpdGxlYmFyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImpzUGFuZWwtdGl0bGVcXFwiPjwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJqc1BhbmVsLWNvbnRyb2xiYXJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJqc1BhbmVsLWJ0biBqc1BhbmVsLWJ0bi1ub3JtYWxpemVcXFwiPlwiK3RoaXMuaWNvbnMubm9ybWFsaXplK1wiPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLW1heGltaXplXFxcIj5cIit0aGlzLmljb25zLm1heGltaXplK1wiPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLWNsb3NlXFxcIj5cIit0aGlzLmljb25zLmNsb3NlK1wiPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XCIsZX0sY3JlYXRlU25hcEFyZWE6ZnVuY3Rpb24oZSx0LG4pe3ZhciBhPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksbz1lLnBhcmVudEVsZW1lbnQ7YS5jbGFzc05hbWU9XCJqc1BhbmVsLXNuYXAtYXJlYSBqc1BhbmVsLXNuYXAtYXJlYS1cIit0LFwibHRcIj09PXR8fFwicnRcIj09PXR8fFwicmJcIj09PXR8fFwibGJcIj09PXQ/KGEuc3R5bGUud2lkdGg9bitcInB4XCIsYS5zdHlsZS5oZWlnaHQ9bitcInB4XCIpOlwiY3RcIj09PXR8fFwiY2JcIj09PXQ/YS5zdHlsZS5oZWlnaHQ9bitcInB4XCI6KFwibGNcIj09PXR8fFwicmNcIj09PXQpJiYoYS5zdHlsZS53aWR0aD1uK1wicHhcIiksbyE9PWRvY3VtZW50LmJvZHkmJihhLnN0eWxlLnBvc2l0aW9uPVwiYWJzb2x1dGVcIiksZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLXNuYXAtYXJlYS5qc1BhbmVsLXNuYXAtYXJlYS1cIit0KXx8ZS5wYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKGEpfSxkYXJrZW46ZnVuY3Rpb24oZSx0KXt2YXIgbj10aGlzLmNvbG9yKGUpLmhzbCxhPXBhcnNlRmxvYXQobi5sKTtyZXR1cm5cImhzbChcIituLmgrXCIsXCIrbi5zK1wiLFwiKyhhLWEqdCtcIiVcIikrXCIpXCJ9LGRyYWdpdDpmdW5jdGlvbih0KXt2YXIgZT0xPGFyZ3VtZW50cy5sZW5ndGgmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06e30sbj12b2lkIDAsYT1PYmplY3QuYXNzaWduKHt9LHRoaXMuZGVmYXVsdHMuZHJhZ2l0LGUpLG89dm9pZCAwLGk9dm9pZCAwLGw9W10scz1uZXcgQ3VzdG9tRXZlbnQoXCJqc3BhbmVsZHJhZ3N0YXJ0XCIse2RldGFpbDp0LmlkfSkscj1uZXcgQ3VzdG9tRXZlbnQoXCJqc3BhbmVsZHJhZ1wiLHtkZXRhaWw6dC5pZH0pLGQ9bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbGRyYWdzdG9wXCIse2RldGFpbDp0LmlkfSk7cmV0dXJuIGEuZ3JpZCYmQXJyYXkuaXNBcnJheShhLmdyaWQpJiYxPT09YS5ncmlkLmxlbmd0aCYmKGEuZ3JpZFsxXT1hLmdyaWRbMF0pLGk9dGhpcy5wT2NvbnRhaW5tZW50KGEuY29udGFpbm1lbnQpLHQucXVlcnlTZWxlY3RvckFsbChhLmhhbmRsZXMpLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5zdHlsZS50b3VjaEFjdGlvbj1cIm5vbmVcIixlLnN0eWxlLmN1cnNvcj1hLmN1cnNvcixqc1BhbmVsLnBvaW50ZXJkb3duLmZvckVhY2goZnVuY3Rpb24oZCl7ZS5hZGRFdmVudExpc3RlbmVyKGQsZnVuY3Rpb24oZCl7aWYoZC5wcmV2ZW50RGVmYXVsdCgpLCFkLnRhcmdldC5jbG9zZXN0KFwiLmpzUGFuZWwtZnRyLWJ0blwiKSl7dC5jb250cm9sYmFyLnN0eWxlLnBvaW50ZXJFdmVudHM9XCJub25lXCIsbD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaWZyYW1lXCIpLGwubGVuZ3RoJiZsLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5zdHlsZS5wb2ludGVyRXZlbnRzPVwibm9uZVwifSk7dmFyIGU9d2luZG93LmdldENvbXB1dGVkU3R5bGUodCksYz1wYXJzZUZsb2F0KGUubGVmdCksaD1wYXJzZUZsb2F0KGUudG9wKSxwPWQudG91Y2hlcz9kLnRvdWNoZXNbMF0uY2xpZW50WDpkLmNsaWVudFgsbT1kLnRvdWNoZXM/ZC50b3VjaGVzWzBdLmNsaWVudFk6ZC5jbGllbnRZLGY9dC5wYXJlbnRFbGVtZW50LGc9Zi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSx1PXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGYpLGI9MDtvPWZ1bmN0aW9uKG8pe3ZhciBlPU1hdGguYWJzLGw9TWF0aC5zcXJ0LGQ9TWF0aC5wb3c7aWYoby5wcmV2ZW50RGVmYXVsdCgpLCFuKXtpZihkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHMpLHQuc3R5bGUub3BhY2l0eT1hLm9wYWNpdHksdC5zbmFwcGVkJiZhLnNuYXAucmVzaXplVG9QcmVTbmFwJiZ0LmN1cnJlbnREYXRhLmJlZm9yZVNuYXApe3QucmVzaXplKHQuY3VycmVudERhdGEuYmVmb3JlU25hcC53aWR0aCtcIiBcIit0LmN1cnJlbnREYXRhLmJlZm9yZVNuYXAuaGVpZ2h0KTt2YXIgeT10LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLHY9cC0oeS5sZWZ0K3kud2lkdGgpLHo9eS53aWR0aC8yO3Y+LXomJihiPXYreil9YS5zdGFydCYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHQsYS5zdGFydCwhMSx7bGVmdDpjLHRvcDpofSksanNQYW5lbC5mcm9udCh0KSx0LnNuYXBwZWQ9ITF9aWYobj0xLGEuZGlzYWJsZU9uTWF4aW1pemVkJiZcIm1heGltaXplZFwiPT09dC5zdGF0dXMpcmV0dXJuITE7dmFyIHcseCxDLEUsaixQLFMsVCxMLGsscT1vLnRvdWNoZXM/by50b3VjaGVzWzBdLmNsaWVudFg6by5jbGllbnRYLEE9by50b3VjaGVzP28udG91Y2hlc1swXS5jbGllbnRZOm8uY2xpZW50WSxXPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHQpO2lmKGY9PT1kb2N1bWVudC5ib2R5KXt2YXIgUj10LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO0w9d2luZG93LmlubmVyV2lkdGgtcGFyc2VJbnQodS5ib3JkZXJMZWZ0V2lkdGgsMTApLXBhcnNlSW50KHUuYm9yZGVyUmlnaHRXaWR0aCwxMCktKFIubGVmdCtSLndpZHRoKSxrPXdpbmRvdy5pbm5lckhlaWdodC1wYXJzZUludCh1LmJvcmRlclRvcFdpZHRoLDEwKS1wYXJzZUludCh1LmJvcmRlckJvdHRvbVdpZHRoLDEwKS0oUi50b3ArUi5oZWlnaHQpfWVsc2UgTD1wYXJzZUludCh1LndpZHRoLDEwKS1wYXJzZUludCh1LmJvcmRlckxlZnRXaWR0aCwxMCktcGFyc2VJbnQodS5ib3JkZXJSaWdodFdpZHRoLDEwKS0ocGFyc2VJbnQoVy5sZWZ0LDEwKStwYXJzZUludChXLndpZHRoLDEwKSksaz1wYXJzZUludCh1LmhlaWdodCwxMCktcGFyc2VJbnQodS5ib3JkZXJUb3BXaWR0aCwxMCktcGFyc2VJbnQodS5ib3JkZXJCb3R0b21XaWR0aCwxMCktKHBhcnNlSW50KFcudG9wLDEwKStwYXJzZUludChXLmhlaWdodCwxMCkpO3c9cGFyc2VGbG9hdChXLmxlZnQpLEM9cGFyc2VGbG9hdChXLnRvcCksaj1MLFM9ayxhLnNuYXAmJihcInBhbmVsXCI9PT1hLnNuYXAudHJpZ2dlcj94PWQodywyKTpcInBvaW50ZXJcIj09PWEuc25hcC50cmlnZ2VyJiYodz1xLHg9ZChxLDIpLEM9QSxqPXdpbmRvdy5pbm5lcldpZHRoLXEsUz13aW5kb3cuaW5uZXJIZWlnaHQtQSksRT1kKEMsMiksUD1kKGosMiksVD1kKFMsMikpO3ZhciBCPWwoeCtFKSxIPWwoeCtUKSxNPWwoUCtFKSxPPWwoUCtUKSxEPWUody1qKS8yLEk9ZShDLVMpLzIsTj1sKHgrZChJLDIpKSxYPWwoRStkKEQsMikpLFk9bChQK2QoSSwyKSksRj1sKFQrZChELDIpKTtpZih3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCksZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChyKSxhLmF4aXMmJlwieFwiIT09YS5heGlzfHwodC5zdHlsZS5sZWZ0PWMrKHEtcCkrYitcInB4XCIpLGEuYXhpcyYmXCJ5XCIhPT1hLmF4aXN8fCh0LnN0eWxlLnRvcD1oKyhBLW0pK1wicHhcIiksYS5ncmlkKXt2YXIgXz1wYXJzZUZsb2F0KFcubGVmdCksVj1wYXJzZUZsb2F0KFcudG9wKSxaPV8lYS5ncmlkWzBdLEs9ViVhLmdyaWRbMV07dC5zdHlsZS5sZWZ0PVo8YS5ncmlkWzBdLzI/Xy1aK1wicHhcIjpfKyhhLmdyaWRbMF0tWikrXCJweFwiLHQuc3R5bGUudG9wPUs8YS5ncmlkWzFdLzI/Vi1LK1wicHhcIjpWKyhhLmdyaWRbMV0tSykrXCJweFwifWlmKGEuY29udGFpbm1lbnR8fDA9PT1hLmNvbnRhaW5tZW50KXt2YXIgVSxHO2lmKHQub3B0aW9ucy5jb250YWluZXI9PT1kb2N1bWVudC5ib2R5KVU9d2luZG93LmlubmVyV2lkdGgtcGFyc2VGbG9hdChXLndpZHRoKS1pWzFdLEc9d2luZG93LmlubmVySGVpZ2h0LXBhcnNlRmxvYXQoVy5oZWlnaHQpLWlbMl07ZWxzZXt2YXIgSj1wYXJzZUZsb2F0KHUuYm9yZGVyTGVmdFdpZHRoKStwYXJzZUZsb2F0KHUuYm9yZGVyUmlnaHRXaWR0aCksUT1wYXJzZUZsb2F0KHUuYm9yZGVyVG9wV2lkdGgpK3BhcnNlRmxvYXQodS5ib3JkZXJCb3R0b21XaWR0aCk7VT1nLndpZHRoLXBhcnNlRmxvYXQoVy53aWR0aCktaVsxXS1KLEc9Zy5oZWlnaHQtcGFyc2VGbG9hdChXLmhlaWdodCktaVsyXS1RfXBhcnNlRmxvYXQodC5zdHlsZS5sZWZ0KTw9aVszXSYmKHQuc3R5bGUubGVmdD1pWzNdK1wicHhcIikscGFyc2VGbG9hdCh0LnN0eWxlLnRvcCk8PWlbMF0mJih0LnN0eWxlLnRvcD1pWzBdK1wicHhcIikscGFyc2VGbG9hdCh0LnN0eWxlLmxlZnQpPj1VJiYodC5zdHlsZS5sZWZ0PVUrXCJweFwiKSxwYXJzZUZsb2F0KHQuc3R5bGUudG9wKT49RyYmKHQuc3R5bGUudG9wPUcrXCJweFwiKX1pZihhLmRyYWcmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyh0LGEuZHJhZywhMSx7bGVmdDp3LHRvcDpDLHJpZ2h0OmosYm90dG9tOlN9KSxhLnNuYXApe3ZhciBlZT1hLnNuYXAuc2Vuc2l0aXZpdHksdGU9Zj09PWRvY3VtZW50LmJvZHk/d2luZG93LmlubmVyV2lkdGgvODpnLndpZHRoLzgsbmU9Zj09PWRvY3VtZW50LmJvZHk/d2luZG93LmlubmVySGVpZ2h0Lzg6Zy5oZWlnaHQvODt0LnNuYXBwYWJsZVRvPSExLGpzUGFuZWwucmVtb3ZlU25hcEFyZWFzKHQpLEI8ZWU/KHQuc25hcHBhYmxlVG89XCJsZWZ0LXRvcFwiLCExIT09YS5zbmFwLnNuYXBMZWZ0VG9wJiZqc1BhbmVsLmNyZWF0ZVNuYXBBcmVhKHQsXCJsdFwiLGVlKSk6SDxlZT8odC5zbmFwcGFibGVUbz1cImxlZnQtYm90dG9tXCIsITEhPT1hLnNuYXAuc25hcExlZnRCb3R0b20mJmpzUGFuZWwuY3JlYXRlU25hcEFyZWEodCxcImxiXCIsZWUpKTpNPGVlPyh0LnNuYXBwYWJsZVRvPVwicmlnaHQtdG9wXCIsITEhPT1hLnNuYXAuc25hcFJpZ2h0VG9wJiZqc1BhbmVsLmNyZWF0ZVNuYXBBcmVhKHQsXCJydFwiLGVlKSk6TzxlZT8odC5zbmFwcGFibGVUbz1cInJpZ2h0LWJvdHRvbVwiLCExIT09YS5zbmFwLnNuYXBSaWdodEJvdHRvbSYmanNQYW5lbC5jcmVhdGVTbmFwQXJlYSh0LFwicmJcIixlZSkpOkM8ZWUmJlg8dGU/KHQuc25hcHBhYmxlVG89XCJjZW50ZXItdG9wXCIsITEhPT1hLnNuYXAuc25hcENlbnRlclRvcCYmanNQYW5lbC5jcmVhdGVTbmFwQXJlYSh0LFwiY3RcIixlZSkpOnc8ZWUmJk48bmU/KHQuc25hcHBhYmxlVG89XCJsZWZ0LWNlbnRlclwiLCExIT09YS5zbmFwLnNuYXBMZWZ0Q2VudGVyJiZqc1BhbmVsLmNyZWF0ZVNuYXBBcmVhKHQsXCJsY1wiLGVlKSk6ajxlZSYmWTxuZT8odC5zbmFwcGFibGVUbz1cInJpZ2h0LWNlbnRlclwiLCExIT09YS5zbmFwLnNuYXBSaWdodENlbnRlciYmanNQYW5lbC5jcmVhdGVTbmFwQXJlYSh0LFwicmNcIixlZSkpOlM8ZWUmJkY8dGUmJih0LnNuYXBwYWJsZVRvPVwiY2VudGVyLWJvdHRvbVwiLCExIT09YS5zbmFwLnNuYXBDZW50ZXJCb3R0b20mJmpzUGFuZWwuY3JlYXRlU25hcEFyZWEodCxcImNiXCIsZWUpKX19LGpzUGFuZWwucG9pbnRlcm1vdmUuZm9yRWFjaChmdW5jdGlvbihlKXtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGUsbyl9KX19KX0pLGpzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24oZSl7ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihlLGZ1bmN0aW9uKCl7anNQYW5lbC5wb2ludGVybW92ZS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2RvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZSxvKX0pLGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3c9XCJpbmhlcml0XCIsanNQYW5lbC5yZW1vdmVTbmFwQXJlYXModCksbiYmKGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZCksdC5zdHlsZS5vcGFjaXR5PTEsbj12b2lkIDAsdC5zYXZlQ3VycmVudFBvc2l0aW9uKCksYS5zbmFwJiYoXCJsZWZ0LXRvcFwiPT09dC5zbmFwcGFibGVUbz9qc1BhbmVsLnNuYXBQYW5lbCh0LGEuc25hcC5zbmFwTGVmdFRvcCk6XCJjZW50ZXItdG9wXCI9PT10LnNuYXBwYWJsZVRvP2pzUGFuZWwuc25hcFBhbmVsKHQsYS5zbmFwLnNuYXBDZW50ZXJUb3ApOlwicmlnaHQtdG9wXCI9PT10LnNuYXBwYWJsZVRvP2pzUGFuZWwuc25hcFBhbmVsKHQsYS5zbmFwLnNuYXBSaWdodFRvcCk6XCJyaWdodC1jZW50ZXJcIj09PXQuc25hcHBhYmxlVG8/anNQYW5lbC5zbmFwUGFuZWwodCxhLnNuYXAuc25hcFJpZ2h0Q2VudGVyKTpcInJpZ2h0LWJvdHRvbVwiPT09dC5zbmFwcGFibGVUbz9qc1BhbmVsLnNuYXBQYW5lbCh0LGEuc25hcC5zbmFwUmlnaHRCb3R0b20pOlwiY2VudGVyLWJvdHRvbVwiPT09dC5zbmFwcGFibGVUbz9qc1BhbmVsLnNuYXBQYW5lbCh0LGEuc25hcC5zbmFwQ2VudGVyQm90dG9tKTpcImxlZnQtYm90dG9tXCI9PT10LnNuYXBwYWJsZVRvP2pzUGFuZWwuc25hcFBhbmVsKHQsYS5zbmFwLnNuYXBMZWZ0Qm90dG9tKTpcImxlZnQtY2VudGVyXCI9PT10LnNuYXBwYWJsZVRvJiZqc1BhbmVsLnNuYXBQYW5lbCh0LGEuc25hcC5zbmFwTGVmdENlbnRlciksYS5zbmFwLmNhbGxiYWNrJiZ0LnNuYXBwYWJsZVRvJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBhLnNuYXAuY2FsbGJhY2smJmEuc25hcC5jYWxsYmFjay5jYWxsKHQsdCksdC5zbmFwcGFibGVUbyYmYS5zbmFwLnJlcG9zaXRpb25PblNuYXAmJnQucmVwb3NpdGlvbk9uU25hcCh0LnNuYXBwYWJsZVRvKSksYS5zdG9wJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3ModCxhLnN0b3AsITEse2xlZnQ6cGFyc2VGbG9hdCh0LnN0eWxlLmxlZnQpLHRvcDpwYXJzZUZsb2F0KHQuc3R5bGUudG9wKX0pKSx0LmNvbnRyb2xiYXIuc3R5bGUucG9pbnRlckV2ZW50cz1cImluaGVyaXRcIixsLmxlbmd0aCYmbC5mb3JFYWNoKGZ1bmN0aW9uKGUpe2Uuc3R5bGUucG9pbnRlckV2ZW50cz1cImluaGVyaXRcIn0pfSl9KSxhLmRpc2FibGUmJihlLnN0eWxlLnBvaW50ZXJFdmVudHM9XCJub25lXCIpfSksdH0sZW1wdHlOb2RlOmZ1bmN0aW9uKGUpe2Zvcig7ZS5maXJzdENoaWxkOyllLnJlbW92ZUNoaWxkKGUuZmlyc3RDaGlsZCk7cmV0dXJuIGV9LGV4dGVuZDpmdW5jdGlvbihlKXtpZihcIltvYmplY3QgT2JqZWN0XVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpKWZvcih2YXIgdCBpbiBlKWUuaGFzT3duUHJvcGVydHkodCkmJih0aGlzLmV4dGVuc2lvbnNbdF09ZVt0XSl9LGZldGNoOmZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQoKXtyZXR1cm4gZS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9cmV0dXJuIHQudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gZS50b1N0cmluZygpfSx0fShmdW5jdGlvbihvYmope3ZhciBjb25mPW9iai5vcHRpb25zLmNvbnRlbnRGZXRjaCxjb25mRGVmYXVsdHM9e2JvZHlNZXRob2Q6XCJ0ZXh0XCIsZXZhbHNjcmlwdHRhZ3M6ITAsYXV0b3Jlc2l6ZTohMCxhdXRvcmVwb3NpdGlvbjohMCxkb25lOmZ1bmN0aW9uKGUsdCl7ZS5jb250ZW50LmlubmVySFRNTD10fX07Y29uZj1cInN0cmluZ1wiPT10eXBlb2YgY29uZj9PYmplY3QuYXNzaWduKHtyZXNvdXJjZTpvYmoub3B0aW9ucy5jb250ZW50RmV0Y2h9LGNvbmZEZWZhdWx0cyk6T2JqZWN0LmFzc2lnbihjb25mRGVmYXVsdHMsY29uZik7dmFyIGZldGNoSW5pdD1jb25mLmZldGNoSW5pdHx8e307Y29uZi5iZWZvcmVTZW5kJiZjb25mLmJlZm9yZVNlbmQuY2FsbChvYmosb2JqKSxmZXRjaChjb25mLnJlc291cmNlLGZldGNoSW5pdCkudGhlbihmdW5jdGlvbihlKXtpZihlLm9rKXJldHVybiBlW2NvbmYuYm9keU1ldGhvZF0oKTt0aHJvdyBuZXcgRXJyb3IoXCJOZXR3b3JrIHJlc3BvbnNlIHdhcyBub3Qgb2suXCIpfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7aWYoY29uZi5kb25lLmNhbGwob2JqLG9iaixyZXNwb25zZSksY29uZi5ldmFsc2NyaXB0dGFncyl7dmFyIHNjcmlwdHRhZ3M9cmVzcG9uc2UubWF0Y2goLzxzY3JpcHRcXGJbXj5dKj4oW1xcc1xcU10qPyk8XFwvc2NyaXB0Pi9naSk7c2NyaXB0dGFncyYmc2NyaXB0dGFncy5mb3JFYWNoKGZ1bmN0aW9uKHRhZyl7dmFyIGpzPXRhZy5yZXBsYWNlKC88c2NyaXB0XFxiW14+XSo+L2ksXCJcIikucmVwbGFjZSgvPFxcL3NjcmlwdD4vaSxcIlwiKS50cmltKCk7ZXZhbChqcyl9KX12YXIgb0NvbnRlbnRTaXplPW9iai5vcHRpb25zLmNvbnRlbnRTaXplO2lmKGNvbmYuYXV0b3Jlc2l6ZXx8Y29uZi5hdXRvcmVwb3NpdGlvbilpZihcInN0cmluZ1wiPT10eXBlb2Ygb0NvbnRlbnRTaXplJiZvQ29udGVudFNpemUubWF0Y2goL2F1dG8vaSkpe3ZhciBwYXJ0cz1vQ29udGVudFNpemUuc3BsaXQoXCIgXCIpLHNpemVzPU9iamVjdC5hc3NpZ24oe30se3dpZHRoOnBhcnRzWzBdLGhlaWdodDpwYXJ0c1sxXX0pO2NvbmYuYXV0b3Jlc2l6ZSYmb2JqLnJlc2l6ZShzaXplcyksIW9iai5jbGFzc0xpc3QuY29udGFpbnMoXCJqc1BhbmVsLWNvbnRleHRtZW51XCIpJiZjb25mLmF1dG9yZXBvc2l0aW9uJiZvYmoucmVwb3NpdGlvbigpfWVsc2UgaWYoXCJvYmplY3RcIj09PShcInVuZGVmaW5lZFwiPT10eXBlb2Ygb0NvbnRlbnRTaXplP1widW5kZWZpbmVkXCI6X3R5cGVvZihvQ29udGVudFNpemUpKSYmKFwiYXV0b1wiPT09b0NvbnRlbnRTaXplLndpZHRofHxcImF1dG9cIj09PW9Db250ZW50U2l6ZS5oZWlnaHQpKXt2YXIgX3NpemVzMj1PYmplY3QuYXNzaWduKHt9LG9Db250ZW50U2l6ZSk7Y29uZi5hdXRvcmVzaXplJiZvYmoucmVzaXplKF9zaXplczIpLCFvYmouY2xhc3NMaXN0LmNvbnRhaW5zKFwianNQYW5lbC1jb250ZXh0bWVudVwiKSYmY29uZi5hdXRvcmVwb3NpdGlvbiYmb2JqLnJlcG9zaXRpb24oKX19KS5jYXRjaChmdW5jdGlvbihlKXtjb25zb2xlLmVycm9yKFwiVGhlcmUgaGFzIGJlZW4gYSBwcm9ibGVtIHdpdGggeW91ciBmZXRjaCBvcGVyYXRpb246IFwiK2UubWVzc2FnZSl9KX0pLGZyb250OmZ1bmN0aW9uKGUpe2lmKFwibWluaW1pemVkXCI9PT1lLnN0YXR1cylcIm1heGltaXplZFwiPT09ZS5zdGF0dXNCZWZvcmU/ZS5tYXhpbWl6ZSgpOmUubm9ybWFsaXplKCk7ZWxzZXt2YXIgdD1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzUGFuZWwtc3RhbmRhcmRcIikpLm1hcChmdW5jdGlvbihlKXtyZXR1cm4gZS5zdHlsZS56SW5kZXh9KTtNYXRoLm1heC5hcHBseShNYXRoLF90b0NvbnN1bWFibGVBcnJheSh0KSk+ZS5zdHlsZS56SW5kZXgmJihlLnN0eWxlLnpJbmRleD1qc1BhbmVsLnppLm5leHQoKSksdGhpcy5yZXNldFppKCl9dGhpcy5nZXRQYW5lbHMoKS5mb3JFYWNoKGZ1bmN0aW9uKGUsdCl7dmFyIG49ZS5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1pZnJhbWUtb3ZlcmxheVwiKTtpZighKDA8dCkpbiYmZS5jb250ZW50LnJlbW92ZUNoaWxkKG4pO2Vsc2UgaWYoZS5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCJpZnJhbWVcIikmJiFuKXt2YXIgYT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2EuY2xhc3NOYW1lPVwianNQYW5lbC1pZnJhbWUtb3ZlcmxheVwiLGUuY29udGVudC5hcHBlbmRDaGlsZChhKX19KX0sZ2V0UGFuZWxzOmZ1bmN0aW9uKCl7dmFyIGU9MDxhcmd1bWVudHMubGVuZ3RoJiZhcmd1bWVudHNbMF0hPT12b2lkIDA/YXJndW1lbnRzWzBdOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKFwianNQYW5lbC1zdGFuZGFyZFwiKX07cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanNQYW5lbFwiKSkuZmlsdGVyKGZ1bmN0aW9uKHQpe3JldHVybiBlLmNhbGwodCx0KX0pLnNvcnQoZnVuY3Rpb24oZSx0KXtyZXR1cm4gdC5zdHlsZS56SW5kZXgtZS5zdHlsZS56SW5kZXh9KX0saHNsVG9SZ2I6ZnVuY3Rpb24oZSx0LG4pe3ZhciBhPU1hdGgucm91bmQsbz12b2lkIDAsaT12b2lkIDAsbD12b2lkIDA7aWYoMD09PXQpbz1pPWw9bjtlbHNle3ZhciBzPWZ1bmN0aW9uKGUsbixhKXtyZXR1cm4gMD5hJiYoYSs9MSksMTxhJiYoYS09MSksYTwxLzY/ZSs2KihuLWUpKmE6YTwxLzI/bjphPDIvMz9lKzYqKChuLWUpKigyLzMtYSkpOmV9LHI9LjU+bj9uKigxK3QpOm4rdC1uKnQsZD0yKm4tcjtvPXMoZCxyLGUrMS8zKSxpPXMoZCxyLGUpLGw9cyhkLHIsZS0xLzMpfXJldHVyblthKDI1NSpvKSxhKDI1NSppKSxhKDI1NSpsKV19LGxpZ2h0ZW46ZnVuY3Rpb24oZSx0KXt2YXIgbj10aGlzLmNvbG9yKGUpLmhzbCxhPXBhcnNlRmxvYXQobi5sKTtyZXR1cm5cImhzbChcIituLmgrXCIsXCIrbi5zK1wiLFwiKyhhKygxMDAtYSkqdCtcIiVcIikrXCIpXCJ9LHBlcmNlaXZlZEJyaWdodG5lc3M6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5jb2xvcihlKS5yZ2I7cmV0dXJuIC4yNjI3Kih0LnIvMjU1KSsuNjc4Kih0LmcvMjU1KSsuMDU5MyoodC5iLzI1NSl9LHBPY29udGFpbmVyOmZ1bmN0aW9uKGUsdCl7aWYoZSl7dmFyIG47aWYoXCJzdHJpbmdcIj09dHlwZW9mIGU/bj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGUpOjE9PT1lLm5vZGVUeXBlP249ZTplLmxlbmd0aCYmKG49ZVswXSksbiYmMT09PW4ubm9kZVR5cGUpcmV0dXJuIG59dmFyIGE9bmV3IGpzUGFuZWxFcnJvcihcIk5PIE5FVyBQQU5FTCBDUkVBVEVEIVxcblRoZSBjb250YWluZXIgdG8gYXBwZW5kIHRoZSBwYW5lbCB0byBkb2VzIG5vdCBleGlzdCBvciBhIGNvbnRhaW5lciB3YXMgbm90IHNwZWNpZmllZCFcIik7dHJ5e3Rocm93IGF9Y2F0Y2gobil7dCYmdC5jYWxsKG4sbil9cmV0dXJuIGF9LHBPY29udGFpbm1lbnQ6ZnVuY3Rpb24oZSl7aWYoXCJudW1iZXJcIj09dHlwZW9mIGUpcmV0dXJuW2UsZSxlLGVdO2lmKEFycmF5LmlzQXJyYXkoZSkpe2lmKDE9PT1lLmxlbmd0aClyZXR1cm5bZVswXSxlWzBdLGVbMF0sZVswXV07aWYoMj09PWUubGVuZ3RoKXJldHVybiBlLmNvbmNhdChlKTszPT09ZS5sZW5ndGgmJihlWzNdPWVbMV0pfXJldHVybiBlfSxwT3NpemU6ZnVuY3Rpb24oZSx0KXt2YXIgbj10fHx0aGlzLmRlZmF1bHRzLmNvbnRlbnRTaXplLGE9ZS5wYXJlbnRFbGVtZW50O2lmKFwic3RyaW5nXCI9PXR5cGVvZiBuKXt2YXIgbz1uLnRyaW0oKS5zcGxpdChcIiBcIik7bj17fSxuLndpZHRoPW9bMF0sbi5oZWlnaHQ9Mj09PW8ubGVuZ3RoP29bMV06b1swXX1lbHNlIG4ud2lkdGgmJiFuLmhlaWdodD9uLmhlaWdodD1uLndpZHRoOm4uaGVpZ2h0JiYhbi53aWR0aCYmKG4ud2lkdGg9bi5oZWlnaHQpO2lmKChuLndpZHRoK1wiXCIpLm1hdGNoKC9eWzAtOS5dKyQvZ2kpKW4ud2lkdGgrPVwicHhcIjtlbHNlIGlmKCEoXCJzdHJpbmdcIj09dHlwZW9mIG4ud2lkdGgmJm4ud2lkdGguZW5kc1dpdGgoXCIlXCIpKSlcImZ1bmN0aW9uXCI9PXR5cGVvZiBuLndpZHRoJiYobi53aWR0aD1uLndpZHRoLmNhbGwoZSxlKSxcIm51bWJlclwiPT10eXBlb2Ygbi53aWR0aD9uLndpZHRoKz1cInB4XCI6XCJzdHJpbmdcIj09dHlwZW9mIG4ud2lkdGgmJm4ud2lkdGgubWF0Y2goL15bMC05Ll0rJC9naSkmJihuLndpZHRoKz1cInB4XCIpKTtlbHNlIGlmKGE9PT1kb2N1bWVudC5ib2R5KW4ud2lkdGg9d2luZG93LmlubmVyV2lkdGgqKHBhcnNlRmxvYXQobi53aWR0aCkvMTAwKStcInB4XCI7ZWxzZXt2YXIgaT13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShhKSxsPXBhcnNlRmxvYXQoaS5ib3JkZXJMZWZ0V2lkdGgpK3BhcnNlRmxvYXQoaS5ib3JkZXJSaWdodFdpZHRoKTtuLndpZHRoPShwYXJzZUZsb2F0KGkud2lkdGgpLWwpKihwYXJzZUZsb2F0KG4ud2lkdGgpLzEwMCkrXCJweFwifWlmKChuLmhlaWdodCtcIlwiKS5tYXRjaCgvXlswLTkuXSskL2dpKSluLmhlaWdodCs9XCJweFwiO2Vsc2UgaWYoIShcInN0cmluZ1wiPT10eXBlb2Ygbi5oZWlnaHQmJm4uaGVpZ2h0LmVuZHNXaXRoKFwiJVwiKSkpXCJmdW5jdGlvblwiPT10eXBlb2Ygbi5oZWlnaHQmJihuLmhlaWdodD1uLmhlaWdodC5jYWxsKGUsZSksXCJudW1iZXJcIj09dHlwZW9mIG4uaGVpZ2h0P24uaGVpZ2h0Kz1cInB4XCI6XCJzdHJpbmdcIj09dHlwZW9mIG4uaGVpZ2h0JiZuLmhlaWdodC5tYXRjaCgvXlswLTkuXSskL2dpKSYmKG4uaGVpZ2h0Kz1cInB4XCIpKTtlbHNlIGlmKGE9PT1kb2N1bWVudC5ib2R5KW4uaGVpZ2h0PXdpbmRvdy5pbm5lckhlaWdodCoocGFyc2VGbG9hdChuLmhlaWdodCkvMTAwKStcInB4XCI7ZWxzZXt2YXIgcz13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShhKSxyPXBhcnNlRmxvYXQocy5ib3JkZXJUb3BXaWR0aCkrcGFyc2VGbG9hdChzLmJvcmRlckJvdHRvbVdpZHRoKTtuLmhlaWdodD0ocGFyc2VGbG9hdChzLmhlaWdodCktcikqKHBhcnNlRmxvYXQobi5oZWlnaHQpLzEwMCkrXCJweFwifXJldHVybiBufSxwT3Bvc2l0aW9uOmZ1bmN0aW9uKGUpe3ZhciB0PWUubWF0Y2goL1xcYlthLXpdezQsNn0tezF9W2Etel17Myw2fVxcYi9pKSxuPWUubWF0Y2goL2Rvd258dXB8cmlnaHQoW14tXXwkKXxsZWZ0KFteLV18JCkvaSksYT1lLm1hdGNoKC9bKy1dP1xcZD9cXC4/XFxkKyhbYS16JV17Miw0fVxcYnwlPykvZ2kpLG89dm9pZCAwO3JldHVybiBvPXQ/e215OnRbMF0udG9Mb3dlckNhc2UoKSxhdDp0WzBdLnRvTG93ZXJDYXNlKCl9OntteTpcImNlbnRlclwiLGF0OlwiY2VudGVyXCJ9LG4mJihvLmF1dG9wb3NpdGlvbj1uWzBdLnRvTG93ZXJDYXNlKCkpLGEmJihhLmZvckVhY2goZnVuY3Rpb24oZSx0KXtlLm1hdGNoKC9eWystXT9bMC05XSokLykmJihhW3RdKz1cInB4XCIpLGFbdF09YVt0XS50b0xvd2VyQ2FzZSgpfSksMT09PWEubGVuZ3RoPyhvLm9mZnNldFg9YVswXSxvLm9mZnNldFk9YVswXSk6KG8ub2Zmc2V0WD1hWzBdLG8ub2Zmc2V0WT1hWzFdKSksb30scG9zaXRpb246ZnVuY3Rpb24oZSx0KXt2YXIgbixhLG8saT17bGVmdDowLHRvcDowfSxsPTAscz0wLHI9MCxkPTAsYz17bXk6XCJjZW50ZXJcIixhdDpcImNlbnRlclwiLG9mOlwid2luZG93XCIsb2Zmc2V0WDpcIjBweFwiLG9mZnNldFk6XCIwcHhcIn0saD17d2lkdGg6ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLGhlaWdodDp3aW5kb3cuaW5uZXJIZWlnaHR9LHA9cGFnZVhPZmZzZXQsbT1wYWdlWU9mZnNldDtpZihuPVwic3RyaW5nXCI9PXR5cGVvZiBlP2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZSk6ZSwhdClyZXR1cm4gbi5zdHlsZS5vcGFjaXR5PTEsbjt2YXIgZj1uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO2E9XCJzdHJpbmdcIj09dHlwZW9mIHQ/T2JqZWN0LmFzc2lnbih7fSxjLGpzUGFuZWwucE9wb3NpdGlvbih0KSk6T2JqZWN0LmFzc2lnbih7fSxjLHQpO3ZhciBnPW4ucGFyZW50RWxlbWVudCx1PXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGcpLGI9Zy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSx5PWcudGFnTmFtZS50b0xvd2VyQ2FzZSgpO2lmKGEub2YmJlwid2luZG93XCIhPT1hLm9mJiYoXCJzdHJpbmdcIj09dHlwZW9mIGEub2Y/bz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGEub2YpOm89YS5vZiksYS5teS5tYXRjaCgvXmNlbnRlci10b3AkfF5jZW50ZXIkfF5jZW50ZXItYm90dG9tJC9pKT9sPWYud2lkdGgvMjphLm15Lm1hdGNoKC9yaWdodC9pKSYmKGw9Zi53aWR0aCksYS5teS5tYXRjaCgvXmxlZnQtY2VudGVyJHxeY2VudGVyJHxecmlnaHQtY2VudGVyJC9pKT9zPWYuaGVpZ2h0LzI6YS5teS5tYXRjaCgvYm90dG9tL2kpJiYocz1mLmhlaWdodCksXCJib2R5XCI9PT15JiZcIndpbmRvd1wiPT09YS5vZilhLmF0Lm1hdGNoKC9eY2VudGVyLXRvcCR8XmNlbnRlciR8XmNlbnRlci1ib3R0b20kL2kpP3I9aC53aWR0aC8yOmEuYXQubWF0Y2goL3JpZ2h0L2kpJiYocj1oLndpZHRoKSxhLmF0Lm1hdGNoKC9ebGVmdC1jZW50ZXIkfF5jZW50ZXIkfF5yaWdodC1jZW50ZXIkL2kpP2Q9aC5oZWlnaHQvMjphLmF0Lm1hdGNoKC9ib3R0b20vaSkmJihkPWguaGVpZ2h0KSxpLmxlZnQ9ci1sLXBhcnNlRmxvYXQodS5ib3JkZXJMZWZ0V2lkdGgpLGkudG9wPWQtcy1wYXJzZUZsb2F0KHUuYm9yZGVyVG9wV2lkdGgpLG4uc3R5bGUucG9zaXRpb249XCJmaXhlZFwiO2Vsc2UgaWYoXCJib2R5XCI9PT15JiZcIndpbmRvd1wiIT09YS5vZil7dmFyIHY9by5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtyPWEuYXQubWF0Y2goL15jZW50ZXItdG9wJHxeY2VudGVyJHxeY2VudGVyLWJvdHRvbSQvaSk/di53aWR0aC8yK3YubGVmdCtwOmEuYXQubWF0Y2goL3JpZ2h0L2kpP3Yud2lkdGgrdi5sZWZ0K3A6di5sZWZ0K3AsZD1hLmF0Lm1hdGNoKC9ebGVmdC1jZW50ZXIkfF5jZW50ZXIkfF5yaWdodC1jZW50ZXIkL2kpP3YuaGVpZ2h0LzIrdi50b3ArbTphLmF0Lm1hdGNoKC9ib3R0b20vaSk/di5oZWlnaHQrdi50b3ArbTp2LnRvcCttLGkubGVmdD1yLWwtcGFyc2VGbG9hdCh1LmJvcmRlckxlZnRXaWR0aCksaS50b3A9ZC1zLXBhcnNlRmxvYXQodS5ib3JkZXJUb3BXaWR0aCl9ZWxzZSBpZihcImJvZHlcIiE9PXkmJihcIndpbmRvd1wiPT09YS5vZnx8IWEub2YpKXt2YXIgej1wYXJzZUZsb2F0KHUuYm9yZGVyTGVmdFdpZHRoKStwYXJzZUZsb2F0KHUuYm9yZGVyUmlnaHRXaWR0aCksdz1wYXJzZUZsb2F0KHUuYm9yZGVyVG9wV2lkdGgpK3BhcnNlRmxvYXQodS5ib3JkZXJCb3R0b21XaWR0aCk7YS5hdC5tYXRjaCgvXmNlbnRlci10b3AkfF5jZW50ZXIkfF5jZW50ZXItYm90dG9tJC9pKT9yPWIud2lkdGgvMi16LzI6YS5hdC5tYXRjaCgvcmlnaHQvaSkmJihyPWIud2lkdGgteiksYS5hdC5tYXRjaCgvXmxlZnQtY2VudGVyJHxeY2VudGVyJHxecmlnaHQtY2VudGVyJC9pKT9kPWIuaGVpZ2h0LzItdy8yOmEuYXQubWF0Y2goL2JvdHRvbS9pKSYmKGQ9Yi5oZWlnaHQtdyksaS5sZWZ0PXItbCxpLnRvcD1kLXN9ZWxzZSBpZihcImJvZHlcIiE9PXkmJmcuY29udGFpbnMobykpe3ZhciB4PW8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7cj1hLmF0Lm1hdGNoKC9eY2VudGVyLXRvcCR8XmNlbnRlciR8XmNlbnRlci1ib3R0b20kL2kpP3gubGVmdC1iLmxlZnQreC53aWR0aC8yOmEuYXQubWF0Y2goL3JpZ2h0L2kpP3gubGVmdC1iLmxlZnQreC53aWR0aDp4LmxlZnQtYi5sZWZ0LGQ9YS5hdC5tYXRjaCgvXmxlZnQtY2VudGVyJHxeY2VudGVyJHxecmlnaHQtY2VudGVyJC9pKT94LnRvcC1iLnRvcCt4LmhlaWdodC8yOmEuYXQubWF0Y2goL2JvdHRvbS9pKT94LnRvcC1iLnRvcCt4LmhlaWdodDp4LnRvcC1iLnRvcCxpLmxlZnQ9ci1sLXBhcnNlRmxvYXQodS5ib3JkZXJMZWZ0V2lkdGgpLGkudG9wPWQtcy1wYXJzZUZsb2F0KHUuYm9yZGVyVG9wV2lkdGgpfWlmKGEuYXV0b3Bvc2l0aW9uJiZhLm15PT09YS5hdCYmMDw9W1wibGVmdC10b3BcIixcImNlbnRlci10b3BcIixcInJpZ2h0LXRvcFwiLFwibGVmdC1ib3R0b21cIixcImNlbnRlci1ib3R0b21cIixcInJpZ2h0LWJvdHRvbVwiXS5pbmRleE9mKGEubXkpKXt2YXIgQz1hLm15K1wiLVwiK2EuYXV0b3Bvc2l0aW9uLnRvTG93ZXJDYXNlKCk7bi5jbGFzc0xpc3QuYWRkKEMpO3ZhciBFPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuXCIrQykpLGo9RS5pbmRleE9mKG4pOzE8RS5sZW5ndGgmJihcImRvd25cIj09PWEuYXV0b3Bvc2l0aW9uP0UuZm9yRWFjaChmdW5jdGlvbihlLHQpezA8dCYmdDw9aiYmKGkudG9wKz1FWy0tdF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0K2pzUGFuZWwuYXV0b3Bvc2l0aW9uU3BhY2luZyl9KTpcInVwXCI9PT1hLmF1dG9wb3NpdGlvbj9FLmZvckVhY2goZnVuY3Rpb24oZSx0KXswPHQmJnQ8PWomJihpLnRvcC09RVstLXRdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCtqc1BhbmVsLmF1dG9wb3NpdGlvblNwYWNpbmcpfSk6XCJyaWdodFwiPT09YS5hdXRvcG9zaXRpb24/RS5mb3JFYWNoKGZ1bmN0aW9uKGUsdCl7MDx0JiZ0PD1qJiYoaS5sZWZ0Kz1FWy0tdF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgranNQYW5lbC5hdXRvcG9zaXRpb25TcGFjaW5nKX0pOlwibGVmdFwiPT09YS5hdXRvcG9zaXRpb24mJkUuZm9yRWFjaChmdW5jdGlvbihlLHQpezA8dCYmdDw9aiYmKGkubGVmdC09RVstLXRdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoK2pzUGFuZWwuYXV0b3Bvc2l0aW9uU3BhY2luZyl9KSl9aWYoaS5sZWZ0Kz1cInB4XCIsaS50b3ArPVwicHhcIixuLnN0eWxlLmxlZnQ9aS5sZWZ0LG4uc3R5bGUudG9wPWkudG9wLGEub2Zmc2V0WCYmKG4uc3R5bGUubGVmdD1cIm51bWJlclwiPT10eXBlb2YgYS5vZmZzZXRYP1wiY2FsYyhcIitpLmxlZnQrXCIgKyBcIithLm9mZnNldFgrXCJweClcIjpcImNhbGMoXCIraS5sZWZ0K1wiICsgXCIrYS5vZmZzZXRYK1wiKVwiLGkubGVmdD13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShuKS5sZWZ0KSxhLm9mZnNldFkmJihuLnN0eWxlLnRvcD1cIm51bWJlclwiPT10eXBlb2YgYS5vZmZzZXRZP1wiY2FsYyhcIitpLnRvcCtcIiArIFwiK2Eub2Zmc2V0WStcInB4KVwiOlwiY2FsYyhcIitpLnRvcCtcIiArIFwiK2Eub2Zmc2V0WStcIilcIixpLnRvcD13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShuKS50b3ApLGEubWluTGVmdCl7dmFyIFA9cGFyc2VGbG9hdChpLmxlZnQpO1wibnVtYmVyXCI9PXR5cGVvZiBhLm1pbkxlZnQmJihhLm1pbkxlZnQrPVwicHhcIiksbi5zdHlsZS5sZWZ0PWEubWluTGVmdDt2YXIgUz1wYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG4pLmxlZnQpO1A+UyYmKG4uc3R5bGUubGVmdD1QK1wicHhcIiksaS5sZWZ0PXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG4pLmxlZnR9aWYoYS5tYXhMZWZ0KXt2YXIgVD1wYXJzZUZsb2F0KGkubGVmdCk7XCJudW1iZXJcIj09dHlwZW9mIGEubWF4TGVmdCYmKGEubWF4TGVmdCs9XCJweFwiKSxuLnN0eWxlLmxlZnQ9YS5tYXhMZWZ0O3ZhciBMPXBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUobikubGVmdCk7VDxMJiYobi5zdHlsZS5sZWZ0PVQrXCJweFwiKSxpLmxlZnQ9d2luZG93LmdldENvbXB1dGVkU3R5bGUobikubGVmdH1pZihhLm1heFRvcCl7dmFyIGs9cGFyc2VGbG9hdChpLnRvcCk7XCJudW1iZXJcIj09dHlwZW9mIGEubWF4VG9wJiYoYS5tYXhUb3ArPVwicHhcIiksbi5zdHlsZS50b3A9YS5tYXhUb3A7dmFyIHE9cGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShuKS50b3ApO2s8cSYmKG4uc3R5bGUudG9wPWsrXCJweFwiKSxpLnRvcD13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShuKS50b3B9aWYoYS5taW5Ub3Ape3ZhciBBPXBhcnNlRmxvYXQoaS50b3ApO1wibnVtYmVyXCI9PXR5cGVvZiBhLm1pblRvcCYmKGEubWluVG9wKz1cInB4XCIpLG4uc3R5bGUudG9wPWEubWluVG9wO3ZhciBXPXBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUobikudG9wKTtBPlcmJihuLnN0eWxlLnRvcD1BK1wicHhcIiksaS50b3A9d2luZG93LmdldENvbXB1dGVkU3R5bGUobikudG9wfWlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGEubW9kaWZ5KXt2YXIgUj1hLm1vZGlmeS5jYWxsKGksaSk7bi5zdHlsZS5sZWZ0PVIubGVmdCxuLnN0eWxlLnRvcD1SLnRvcH1yZXR1cm4gbi5zdHlsZS5vcGFjaXR5PTEsbi5zdHlsZS5sZWZ0PXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG4pLmxlZnQsbi5zdHlsZS50b3A9d2luZG93LmdldENvbXB1dGVkU3R5bGUobikudG9wLG59LHByb2Nlc3NDYWxsYmFja3M6ZnVuY3Rpb24oZSx0KXt2YXIgbj0yPGFyZ3VtZW50cy5sZW5ndGgmJnZvaWQgMCE9PWFyZ3VtZW50c1syXT9hcmd1bWVudHNbMl06XCJzb21lXCIsYT1hcmd1bWVudHNbM107cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgdCYmKHQ9W3RdKSxuP3Rbbl0oZnVuY3Rpb24odCl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgdClyZXR1cm4gdC5jYWxsKGUsZSxhKX0pOnZvaWQgdC5mb3JFYWNoKGZ1bmN0aW9uKHQpe3QuY2FsbChlLGUsYSl9KX0scmdiVG9Ic2w6ZnVuY3Rpb24oZSx0LG4pe2UvPTI1NSx0Lz0yNTUsbi89MjU1O3ZhciBhLG8saT1NYXRoLm1heChlLHQsbikscz1NYXRoLm1pbihlLHQsbikscj0oaStzKS8yO2lmKGk9PT1zKWE9bz0wO2Vsc2V7dmFyIGw9aS1zO289LjU8cj9sLygyLWktcyk6bC8oaStzKSxpPT09ZT9hPSh0LW4pL2wrKHQ8bj82OjApOmk9PT10P2E9KG4tZSkvbCsyOmk9PT1uP2E9KGUtdCkvbCs0OnZvaWQgMCxhLz02fXJldHVybiBhKj0zNjAsbz0xMDAqbytcIiVcIixyPTEwMCpyK1wiJVwiLHtjc3M6XCJoc2woXCIrYStcIixcIitvK1wiLFwiK3IrXCIpXCIsaDphLHM6byxsOnJ9fSxyZ2JUb0hleDpmdW5jdGlvbihlLHQsbil7dmFyIGE9KCtlKS50b1N0cmluZygxNiksbz0oK3QpLnRvU3RyaW5nKDE2KSxpPSgrbikudG9TdHJpbmcoMTYpO3JldHVybiAxPT09YS5sZW5ndGgmJihhPVwiMFwiK2EpLDE9PT1vLmxlbmd0aCYmKG89XCIwXCIrbyksMT09PWkubGVuZ3RoJiYoaT1cIjBcIitpKSxcIiNcIithK28raX0scmVtb3ZlU25hcEFyZWFzOmZ1bmN0aW9uKGUpe2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanNQYW5lbC1zbmFwLWFyZWFcIikuZm9yRWFjaChmdW5jdGlvbih0KXtlLnBhcmVudEVsZW1lbnQmJmUucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0KX0pfSxyZXNldFppOmZ1bmN0aW9uKCl7dGhpcy56aT1mdW5jdGlvbigpe3ZhciBlPTA8YXJndW1lbnRzLmxlbmd0aCYmYXJndW1lbnRzWzBdIT09dm9pZCAwP2FyZ3VtZW50c1swXTpqc1BhbmVsLnppQmFzZSx0PWU7cmV0dXJue25leHQ6ZnVuY3Rpb24oKXtyZXR1cm4gdCsrfX19KCksQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qc1BhbmVsLXN0YW5kYXJkXCIpKS5zb3J0KGZ1bmN0aW9uKGUsdCl7cmV0dXJuIGUuc3R5bGUuekluZGV4LXQuc3R5bGUuekluZGV4fSkuZm9yRWFjaChmdW5jdGlvbihlKXtlLnN0eWxlLnpJbmRleD1qc1BhbmVsLnppLm5leHQoKX0pfSxyZXNpemVpdDpmdW5jdGlvbih0KXt2YXIgZT0xPGFyZ3VtZW50cy5sZW5ndGgmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06e30sbj1PYmplY3QuYXNzaWduKHt9LHRoaXMuZGVmYXVsdHMucmVzaXplaXQsZSksYT10LnBhcmVudEVsZW1lbnQsbz1hLnRhZ05hbWUudG9Mb3dlckNhc2UoKSxpPVwiZnVuY3Rpb25cIj09dHlwZW9mIG4ubWF4V2lkdGg/bi5tYXhXaWR0aCgpOm4ubWF4V2lkdGh8fDFlNCxsPVwiZnVuY3Rpb25cIj09dHlwZW9mIG4ubWF4SGVpZ2h0P24ubWF4SGVpZ2h0KCk6bi5tYXhIZWlnaHR8fDFlNCxzPVwiZnVuY3Rpb25cIj09dHlwZW9mIG4ubWluV2lkdGg/bi5taW5XaWR0aCgpOm4ubWluV2lkdGgscj1cImZ1bmN0aW9uXCI9PXR5cGVvZiBuLm1pbkhlaWdodD9uLm1pbkhlaWdodCgpOm4ubWluSGVpZ2h0LGQ9bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbHJlc2l6ZXN0YXJ0XCIse2RldGFpbDp0LmlkfSksYz1uZXcgQ3VzdG9tRXZlbnQoXCJqc3BhbmVscmVzaXplXCIse2RldGFpbDp0LmlkfSkscD1uZXcgQ3VzdG9tRXZlbnQoXCJqc3BhbmVscmVzaXplc3RvcFwiLHtkZXRhaWw6dC5pZH0pLG09dm9pZCAwLGY9dm9pZCAwLGc9dm9pZCAwLHU9dm9pZCAwLGI9dm9pZCAwLGg9W107cmV0dXJuIG09dGhpcy5wT2NvbnRhaW5tZW50KG4uY29udGFpbm1lbnQpLG4uaGFuZGxlcy5zcGxpdChcIixcIikuZm9yRWFjaChmdW5jdGlvbihlKXt2YXIgbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiRElWXCIpO24uY2xhc3NOYW1lPVwianNQYW5lbC1yZXNpemVpdC1oYW5kbGUganNQYW5lbC1yZXNpemVpdC1cIitlLnRyaW0oKSxuLnN0eWxlLnpJbmRleD05MCx0LmFwcGVuZChuKX0pLHQucXVlcnlTZWxlY3RvckFsbChcIi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZVwiKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2pzUGFuZWwucG9pbnRlcmRvd24uZm9yRWFjaChmdW5jdGlvbihwKXtlLmFkZEV2ZW50TGlzdGVuZXIocCxmdW5jdGlvbihwKXtwLnByZXZlbnREZWZhdWx0KCksaD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaWZyYW1lXCIpLGgubGVuZ3RoJiZoLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5zdHlsZS5wb2ludGVyRXZlbnRzPVwibm9uZVwifSk7dmFyIGU9dC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSx5PWEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksdj13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShhLG51bGwpLHo9cGFyc2VJbnQodi5ib3JkZXJMZWZ0V2lkdGgsMTApLHc9cGFyc2VJbnQodi5ib3JkZXJUb3BXaWR0aCwxMCkseD12LmdldFByb3BlcnR5VmFsdWUoXCJwb3NpdGlvblwiKSxDPXAuY2xpZW50WHx8cC50b3VjaGVzWzBdLmNsaWVudFgsRT1wLmNsaWVudFl8fHAudG91Y2hlc1swXS5jbGllbnRZLGo9ZS53aWR0aCxQPWUuaGVpZ2h0LFM9cC50YXJnZXQuY2xhc3NMaXN0LFQ9ZS5sZWZ0LEw9ZS50b3Asaz0xZTQscT0xZTQsQT0xZTQsVz0xZTQ7dC5jb250ZW50LnN0eWxlLnBvaW50ZXJFdmVudHM9XCJub25lXCIsXCJib2R5XCIhPT1vJiYoVD1lLmxlZnQteS5sZWZ0K2Euc2Nyb2xsTGVmdCxMPWUudG9wLXkudG9wK2Euc2Nyb2xsVG9wKSxcImJvZHlcIj09PW8mJm0/KGs9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLWUubGVmdCxBPWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQtZS50b3AscT1lLndpZHRoK2UubGVmdCxXPWUuaGVpZ2h0K2UudG9wKTptJiYoXCJzdGF0aWNcIj09PXg/KGs9eS53aWR0aC1lLmxlZnQreixBPXkuaGVpZ2h0K3kudG9wLWUudG9wK3cscT1lLndpZHRoKyhlLmxlZnQteS5sZWZ0KS16LFc9ZS5oZWlnaHQrKGUudG9wLXkudG9wKS13KTooaz1hLmNsaWVudFdpZHRoLShlLmxlZnQteS5sZWZ0KSt6LEE9YS5jbGllbnRIZWlnaHQtKGUudG9wLXkudG9wKSt3LHE9ZS53aWR0aCsoZS5sZWZ0LXkubGVmdCkteixXPXQuY2xpZW50SGVpZ2h0KyhlLnRvcC15LnRvcCktdykpLG0mJihxLT1tWzNdLFctPW1bMF0say09bVsxXSxBLT1tWzJdKTt2YXIgUj13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0KSxCPXBhcnNlRmxvYXQoUi53aWR0aCktZS53aWR0aCxIPXBhcnNlRmxvYXQoUi5oZWlnaHQpLWUuaGVpZ2h0LE09cGFyc2VGbG9hdChSLmxlZnQpLWUubGVmdCxPPXBhcnNlRmxvYXQoUi50b3ApLWUudG9wO2EhPT1kb2N1bWVudC5ib2R5JiYoTSs9eS5sZWZ0LE8rPXkudG9wKSxmPWZ1bmN0aW9uKGUpe2d8fChkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGQpLG4uc3RhcnQmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyh0LG4uc3RhcnQsITEse3dpZHRoOmosaGVpZ2h0OlB9KSxqc1BhbmVsLmZyb250KHQpKSxnPTEsZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjKSwoUy5jb250YWlucyhcImpzUGFuZWwtcmVzaXplaXQtZVwiKXx8Uy5jb250YWlucyhcImpzUGFuZWwtcmVzaXplaXQtc2VcIil8fFMuY29udGFpbnMoXCJqc1BhbmVsLXJlc2l6ZWl0LW5lXCIpKSYmKHU9aisoZS5jbGllbnRYfHxlLnRvdWNoZXNbMF0uY2xpZW50WCktQytCLHU+PWsmJih1PWspLHU+PWk/dT1pOnU8PXMmJih1PXMpLHQuc3R5bGUud2lkdGg9dStcInB4XCIpLChTLmNvbnRhaW5zKFwianNQYW5lbC1yZXNpemVpdC1zXCIpfHxTLmNvbnRhaW5zKFwianNQYW5lbC1yZXNpemVpdC1zZVwiKXx8Uy5jb250YWlucyhcImpzUGFuZWwtcmVzaXplaXQtc3dcIikpJiYoYj1QKyhlLmNsaWVudFl8fGUudG91Y2hlc1swXS5jbGllbnRZKS1FK0gsYj49QSYmKGI9QSksYj49bD9iPWw6Yjw9ciYmKGI9ciksdC5zdHlsZS5oZWlnaHQ9YitcInB4XCIpLChTLmNvbnRhaW5zKFwianNQYW5lbC1yZXNpemVpdC13XCIpfHxTLmNvbnRhaW5zKFwianNQYW5lbC1yZXNpemVpdC1ud1wiKXx8Uy5jb250YWlucyhcImpzUGFuZWwtcmVzaXplaXQtc3dcIikpJiYodT1qK0MtKGUuY2xpZW50WHx8ZS50b3VjaGVzWzBdLmNsaWVudFgpK0IsdTw9aSYmdT49cyYmdTw9cSYmKHQuc3R5bGUubGVmdD1UKyhlLmNsaWVudFh8fGUudG91Y2hlc1swXS5jbGllbnRYKS1DK00rXCJweFwiKSx1Pj1xJiYodT1xKSx1Pj1pP3U9aTp1PD1zJiYodT1zKSx0LnN0eWxlLndpZHRoPXUrXCJweFwiKSwoUy5jb250YWlucyhcImpzUGFuZWwtcmVzaXplaXQtblwiKXx8Uy5jb250YWlucyhcImpzUGFuZWwtcmVzaXplaXQtbndcIil8fFMuY29udGFpbnMoXCJqc1BhbmVsLXJlc2l6ZWl0LW5lXCIpKSYmKGI9UCtFLShlLmNsaWVudFl8fGUudG91Y2hlc1swXS5jbGllbnRZKStILGI8PWwmJmI+PXImJmI8PVcmJih0LnN0eWxlLnRvcD1MKyhlLmNsaWVudFl8fGUudG91Y2hlc1swXS5jbGllbnRZKS1FK08rXCJweFwiKSxiPj1XJiYoYj1XKSxiPj1sP2I9bDpiPD1yJiYoYj1yKSx0LnN0eWxlLmhlaWdodD1iK1wicHhcIiksdCYmdC5jb250ZW50UmVzaXplKCksd2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO3ZhciBhPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHQpLG89e2xlZnQ6cGFyc2VGbG9hdChhLmxlZnQpLHRvcDpwYXJzZUZsb2F0KGEudG9wKSxyaWdodDpwYXJzZUZsb2F0KGEucmlnaHQpLGJvdHRvbTpwYXJzZUZsb2F0KGEuYm90dG9tKSx3aWR0aDpwYXJzZUZsb2F0KGEud2lkdGgpLGhlaWdodDpwYXJzZUZsb2F0KGEuaGVpZ2h0KX07bi5yZXNpemUmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyh0LG4ucmVzaXplLCExLG8pfSxqc1BhbmVsLnBvaW50ZXJtb3ZlLmZvckVhY2goZnVuY3Rpb24oZSl7ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihlLGYsITEpfSksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLGZ1bmN0aW9uKHQpe251bGw9PT10LnJlbGF0ZWRUYXJnZXQmJmpzUGFuZWwucG9pbnRlcm1vdmUuZm9yRWFjaChmdW5jdGlvbihlKXtkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGUsZiwhMSl9KX0sITEpfSl9KX0pLGpzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24oZSl7ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihlLGZ1bmN0aW9uKGEpe2lmKGpzUGFuZWwucG9pbnRlcm1vdmUuZm9yRWFjaChmdW5jdGlvbihlKXtkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGUsZiwhMSl9KSxhLnRhcmdldC5jbGFzc0xpc3QmJmEudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImpzUGFuZWwtcmVzaXplaXQtaGFuZGxlXCIpKXt2YXIgZSxvLGk9YS50YXJnZXQuY2xhc3NOYW1lO2lmKGkubWF0Y2goL2pzUGFuZWwtcmVzaXplaXQtbnd8anNQYW5lbC1yZXNpemVpdC13fGpzUGFuZWwtcmVzaXplaXQtc3cvaSkmJihlPSEwKSxpLm1hdGNoKC9qc1BhbmVsLXJlc2l6ZWl0LW53fGpzUGFuZWwtcmVzaXplaXQtbnxqc1BhbmVsLXJlc2l6ZWl0LW5lL2kpJiYobz0hMCksbi5ncmlkJiZBcnJheS5pc0FycmF5KG4uZ3JpZCkpezE9PT1uLmdyaWQubGVuZ3RoJiYobi5ncmlkWzFdPW4uZ3JpZFswXSk7dmFyIGw9cGFyc2VGbG9hdCh0LnN0eWxlLndpZHRoKSxzPXBhcnNlRmxvYXQodC5zdHlsZS5oZWlnaHQpLHI9bCVuLmdyaWRbMF0sZD1zJW4uZ3JpZFsxXSxjPXBhcnNlRmxvYXQodC5zdHlsZS5sZWZ0KSxtPXBhcnNlRmxvYXQodC5zdHlsZS50b3ApLHU9YyVuLmdyaWRbMF0sYj1tJW4uZ3JpZFsxXTt0LnN0eWxlLndpZHRoPXI8bi5ncmlkWzBdLzI/bC1yK1wicHhcIjpsKyhuLmdyaWRbMF0tcikrXCJweFwiLHQuc3R5bGUuaGVpZ2h0PWQ8bi5ncmlkWzFdLzI/cy1kK1wicHhcIjpzKyhuLmdyaWRbMV0tZCkrXCJweFwiLGUmJih1PG4uZ3JpZFswXS8yP3Quc3R5bGUubGVmdD1jLXUrXCJweFwiOnQuc3R5bGUubGVmdD1jKyhuLmdyaWRbMF0tdSkrXCJweFwiKSxvJiYoYjxuLmdyaWRbMV0vMj90LnN0eWxlLnRvcD1tLWIrXCJweFwiOnQuc3R5bGUudG9wPW0rKG4uZ3JpZFsxXS1iKStcInB4XCIpfXQmJnQuY29udGVudFJlc2l6ZSgpfWcmJih0LmNvbnRlbnQuc3R5bGUucG9pbnRlckV2ZW50cz1cImluaGVyaXRcIixkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHApLGc9dm9pZCAwLHQuc2F2ZUN1cnJlbnREaW1lbnNpb25zKCksdC5zYXZlQ3VycmVudFBvc2l0aW9uKCksbi5zdG9wJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3ModCxuLnN0b3AsITEse3dpZHRoOnBhcnNlRmxvYXQodC5zdHlsZS53aWR0aCksaGVpZ2h0OnBhcnNlRmxvYXQodC5zdHlsZS5oZWlnaHQpfSkpLGgubGVuZ3RoJiZoLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5zdHlsZS5wb2ludGVyRXZlbnRzPVwiaW5oZXJpdFwifSl9LCExKX0pLG4uZGlzYWJsZSYmdC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzUGFuZWwtcmVzaXplaXQtaGFuZGxlXCIpLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5zdHlsZS5wb2ludGVyRXZlbnRzPVwibm9uZVwifSksdH0sc2V0Q2xhc3M6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdC5zcGxpdChcIiBcIikuZm9yRWFjaChmdW5jdGlvbih0KXtyZXR1cm4gZS5jbGFzc0xpc3QuYWRkKHQpfSksZX0scmVtQ2xhc3M6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdC5zcGxpdChcIiBcIikuZm9yRWFjaChmdW5jdGlvbih0KXtyZXR1cm4gZS5jbGFzc0xpc3QucmVtb3ZlKHQpfSksZX0sc2V0U3R5bGU6ZnVuY3Rpb24oZSx0KXtmb3IodmFyIG4gaW4gdClpZih0Lmhhc093blByb3BlcnR5KG4pKXt2YXIgYT0obitcIlwiKS5yZXBsYWNlKC8tXFx3L2dpLGZ1bmN0aW9uKGUpe3JldHVybiBlLnN1YnN0cigtMSkudG9VcHBlckNhc2UoKX0pO2Uuc3R5bGVbYV09dFtuXX1yZXR1cm4gZX0sc25hcFBhbmVsOmZ1bmN0aW9uKGUsdCl7aWYoZS5jdXJyZW50RGF0YS5iZWZvcmVTbmFwPXt3aWR0aDplLmN1cnJlbnREYXRhLndpZHRoLGhlaWdodDplLmN1cnJlbnREYXRhLmhlaWdodH0sdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgdCl0LmNhbGwoZSxlLGUuc25hcHBhYmxlVG8pO2Vsc2UgaWYoITEhPT10KXt2YXIgbj1bMCwwXTtpZihlLm9wdGlvbnMuZHJhZ2l0LnNuYXAuY29udGFpbm1lbnQmJmUub3B0aW9ucy5kcmFnaXQuY29udGFpbm1lbnQpe3ZhciBhPXRoaXMucE9jb250YWlubWVudChlLm9wdGlvbnMuZHJhZ2l0LmNvbnRhaW5tZW50KSxvPWUuc25hcHBhYmxlVG87by5zdGFydHNXaXRoKFwibGVmdFwiKT9uWzBdPWFbM106by5zdGFydHNXaXRoKFwicmlnaHRcIikmJihuWzBdPS1hWzFdKSxvLmVuZHNXaXRoKFwidG9wXCIpP25bMV09YVswXTpvLmVuZHNXaXRoKFwiYm90dG9tXCIpJiYoblsxXT0tYVsyXSl9ZS5yZXBvc2l0aW9uKGUuc25hcHBhYmxlVG8rXCIgXCIrblswXStcIiBcIituWzFdKSxlLnNuYXBwZWQ9ZS5zbmFwcGFibGVUb319LGNyZWF0ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMsbj0wPGFyZ3VtZW50cy5sZW5ndGgmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06e30sdD1hcmd1bWVudHNbMV07anNQYW5lbC56aXx8KGpzUGFuZWwuemk9ZnVuY3Rpb24oKXt2YXIgZT0wPGFyZ3VtZW50cy5sZW5ndGgmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06anNQYW5lbC56aUJhc2UsdD1lO3JldHVybntuZXh0OmZ1bmN0aW9uKCl7cmV0dXJuIHQrK319fSgpKTt2YXIgYTtuLmNvbmZpZz8obj1PYmplY3QuYXNzaWduKHt9LHRoaXMuZGVmYXVsdHMsbi5jb25maWcsbiksZGVsZXRlIG4uY29uZmlnKTpuPU9iamVjdC5hc3NpZ24oe30sdGhpcy5kZWZhdWx0cyxuKSxuLmlkP1wiZnVuY3Rpb25cIj09dHlwZW9mIG4uaWQmJihuLmlkPW4uaWQoKSk6bi5pZD1cImpzUGFuZWwtXCIrKGpzUGFuZWwuaWRDb3VudGVyKz0xKTt2YXIgbz1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChuLmlkKTtpZihudWxsIT09byl7by5jbGFzc0xpc3QuY29udGFpbnMoXCJqc1BhbmVsXCIpJiZvLmZyb250KCk7dmFyIGk9bmV3IGpzUGFuZWxFcnJvcihcIk5PIE5FVyBQQU5FTCBDUkVBVEVEIVxcbkFuIGVsZW1lbnQgd2l0aCB0aGUgSUQgPFwiK24uaWQrXCI+IGFscmVhZHkgZXhpc3RzIGluIHRoZSBkb2N1bWVudC5cIik7dHJ5e3Rocm93IGl9Y2F0Y2gobil7dCYmdC5jYWxsKG4sbil9cmV0dXJuIGNvbnNvbGUuZXJyb3IoaS5uYW1lK1wiOlwiLGkubWVzc2FnZSl9dmFyIGw9dGhpcy5wT2NvbnRhaW5lcihuLmNvbnRhaW5lcix0KTtpZihsJiZsLm1lc3NhZ2UpcmV0dXJuIGNvbnNvbGUuZXJyb3IobC5uYW1lK1wiOlwiLGwubWVzc2FnZSk7bi5tYXhpbWl6ZWRNYXJnaW49dGhpcy5wT2NvbnRhaW5tZW50KG4ubWF4aW1pemVkTWFyZ2luKSxuLmRyYWdpdCYmKFtcInN0YXJ0XCIsXCJkcmFnXCIsXCJzdG9wXCJdLmZvckVhY2goZnVuY3Rpb24oZSl7bi5kcmFnaXRbZV0/XCJmdW5jdGlvblwiPT10eXBlb2Ygbi5kcmFnaXRbZV0mJihuLmRyYWdpdFtlXT1bbi5kcmFnaXRbZV1dKTpuLmRyYWdpdFtlXT1bXX0pLG4uZHJhZ2l0LnNuYXAmJihcIm9iamVjdFwiPT09X3R5cGVvZihuLmRyYWdpdC5zbmFwKT9uLmRyYWdpdC5zbmFwPU9iamVjdC5hc3NpZ24oe30sdGhpcy5kZWZhdWx0U25hcENvbmZpZyxuLmRyYWdpdC5zbmFwKTpuLmRyYWdpdC5zbmFwPXRoaXMuZGVmYXVsdFNuYXBDb25maWcpKSxuLnJlc2l6ZWl0JiZbXCJzdGFydFwiLFwicmVzaXplXCIsXCJzdG9wXCJdLmZvckVhY2goZnVuY3Rpb24oZSl7bi5yZXNpemVpdFtlXT9cImZ1bmN0aW9uXCI9PXR5cGVvZiBuLnJlc2l6ZWl0W2VdJiYobi5yZXNpemVpdFtlXT1bbi5yZXNpemVpdFtlXV0pOm4ucmVzaXplaXRbZV09W119KSxbXCJvbmJlZm9yZWNsb3NlXCIsXCJvbmJlZm9yZW1heGltaXplXCIsXCJvbmJlZm9yZW1pbmltaXplXCIsXCJvbmJlZm9yZW5vcm1hbGl6ZVwiLFwib25iZWZvcmVzbWFsbGlmeVwiLFwib25iZWZvcmV1bnNtYWxsaWZ5XCIsXCJvbmNsb3NlZFwiLFwib25mcm9udGVkXCIsXCJvbm1heGltaXplZFwiLFwib25taW5pbWl6ZWRcIixcIm9ubm9ybWFsaXplZFwiLFwib25zbWFsbGlmaWVkXCIsXCJvbnN0YXR1c2NoYW5nZVwiLFwib251bnNtYWxsaWZpZWRcIl0uZm9yRWFjaChmdW5jdGlvbihlKXtuW2VdP1wiZnVuY3Rpb25cIj09dHlwZW9mIG5bZV0mJihuW2VdPVtuW2VdXSk6bltlXT1bXX0pLG4uaGVhZGVyUmVtb3ZlJiYobi5oZWFkZXI9ITEpO3ZhciBzPW4udGVtcGxhdGU/bi50ZW1wbGF0ZTp0aGlzLmNyZWF0ZVBhbmVsVGVtcGxhdGUoKTtzLm9wdGlvbnM9bixzLnN0YXR1cz1cImluaXRpYWxpemVkXCIscy5jdXJyZW50RGF0YT17fSxzLmhlYWRlcj1zLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1oZHJcIikscy5oZWFkZXJiYXI9cy5oZWFkZXIucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWhlYWRlcmJhclwiKSxzLnRpdGxlYmFyPXMuaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC10aXRsZWJhclwiKSxzLmhlYWRlcmxvZ289cy5oZWFkZXJiYXIucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWhlYWRlcmxvZ29cIikscy5oZWFkZXJ0aXRsZT1zLmhlYWRlcmJhci5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtdGl0bGVcIikscy5jb250cm9sYmFyPXMuaGVhZGVyYmFyLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1jb250cm9sYmFyXCIpLHMuaGVhZGVydG9vbGJhcj1zLmhlYWRlci5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtaGRyLXRvb2xiYXJcIikscy5jb250ZW50PXMucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWNvbnRlbnRcIikscy5mb290ZXI9cy5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtZnRyXCIpLHMuc25hcHBhYmxlVG89ITEscy5zbmFwcGVkPSExO3ZhciByPW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxsb2FkZWRcIix7ZGV0YWlsOm4uaWR9KSxkPW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxiZWZvcmVjbG9zZVwiLHtkZXRhaWw6bi5pZH0pLGM9bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbGNsb3NlZFwiLHtkZXRhaWw6bi5pZH0pLGg9bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbHN0YXR1c2NoYW5nZVwiLHtkZXRhaWw6bi5pZH0pLHA9bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbGJlZm9yZW5vcm1hbGl6ZVwiLHtkZXRhaWw6bi5pZH0pLG09bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbG5vcm1hbGl6ZWRcIix7ZGV0YWlsOm4uaWR9KSxmPW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxiZWZvcmVtYXhpbWl6ZVwiLHtkZXRhaWw6bi5pZH0pLGc9bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbG1heGltaXplZFwiLHtkZXRhaWw6bi5pZH0pLHU9bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbGJlZm9yZW1pbmltaXplXCIse2RldGFpbDpuLmlkfSksYj1uZXcgQ3VzdG9tRXZlbnQoXCJqc3BhbmVsbWluaW1pemVkXCIse2RldGFpbDpuLmlkfSkseT1uZXcgQ3VzdG9tRXZlbnQoXCJqc3BhbmVsYmVmb3Jlc21hbGxpZnlcIix7ZGV0YWlsOm4uaWR9KSx2PW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxzbWFsbGlmaWVkXCIse2RldGFpbDpuLmlkfSksej1uZXcgQ3VzdG9tRXZlbnQoXCJqc3BhbmVsc21hbGxpZmllZG1heFwiLHtkZXRhaWw6bi5pZH0pLHc9bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbGJlZm9yZXVuc21hbGxpZnlcIix7ZGV0YWlsOm4uaWR9KSx4PW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxmcm9udGVkXCIse2RldGFpbDpuLmlkfSksQz1zLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1idG4tY2xvc2VcIiksRT1zLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1idG4tbWF4aW1pemVcIiksaj1zLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1idG4tbm9ybWFsaXplXCIpLFA9cy5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtYnRuLXNtYWxsaWZ5XCIpLFM9cy5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtYnRuLXNtYWxsaWZ5cmV2XCIpLFQ9cy5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtYnRuLW1pbmltaXplXCIpO0MmJmpzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24oZSl7Qy5hZGRFdmVudExpc3RlbmVyKGUsZnVuY3Rpb24odCl7dC5wcmV2ZW50RGVmYXVsdCgpLHMuY2xvc2UoKX0pfSksRSYmanNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbihlKXtFLmFkZEV2ZW50TGlzdGVuZXIoZSxmdW5jdGlvbih0KXt0LnByZXZlbnREZWZhdWx0KCkscy5tYXhpbWl6ZSgpfSl9KSxqJiZqc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uKGUpe2ouYWRkRXZlbnRMaXN0ZW5lcihlLGZ1bmN0aW9uKHQpe3QucHJldmVudERlZmF1bHQoKSxzLm5vcm1hbGl6ZSgpfSl9KSxQJiZqc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uKGUpe1AuYWRkRXZlbnRMaXN0ZW5lcihlLGZ1bmN0aW9uKHQpe3QucHJldmVudERlZmF1bHQoKSxzLnNtYWxsaWZ5KCl9KX0pLFMmJmpzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24oZSl7Uy5hZGRFdmVudExpc3RlbmVyKGUsZnVuY3Rpb24odCl7dC5wcmV2ZW50RGVmYXVsdCgpLHMudW5zbWFsbGlmeSgpfSl9KSxUJiZqc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uKGUpe1QuYWRkRXZlbnRMaXN0ZW5lcihlLGZ1bmN0aW9uKHQpe3QucHJldmVudERlZmF1bHQoKSxzLm1pbmltaXplKCl9KX0pO3ZhciBMPWpzUGFuZWwuZXh0ZW5zaW9ucztmb3IodmFyIGsgaW4gTClMLmhhc093blByb3BlcnR5KGspJiYoc1trXT1MW2tdKTtpZihzLmFkZFRvb2xiYXI9ZnVuY3Rpb24oZSx0LG4pe2lmKFwiaGVhZGVyXCI9PT1lP2U9cy5oZWFkZXJ0b29sYmFyOlwiZm9vdGVyXCI9PT1lJiYoZT1zLmZvb3RlciksXCJzdHJpbmdcIj09dHlwZW9mIHQpZS5pbm5lckhUTUw9dDtlbHNlIGlmKEFycmF5LmlzQXJyYXkodCkpdC5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wic3RyaW5nXCI9PXR5cGVvZiB0P2UuaW5uZXJIVE1MKz10OmUuYXBwZW5kKHQpfSk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiB0KXt2YXIgYT10LmNhbGwocyxzKTtcInN0cmluZ1wiPT10eXBlb2YgYT9lLmlubmVySFRNTD1hOmUuYXBwZW5kKGEpfWVsc2UgZS5hcHBlbmQodCk7cmV0dXJuIGUuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKSxlPT09cy5mb290ZXImJnMuY29udGVudC5jbGFzc0xpc3QucmVtb3ZlKFwianNQYW5lbC1jb250ZW50LW5vZm9vdGVyXCIpLHMuY29udGVudFJlc2l6ZSgpLG4mJm4uY2FsbChzLHMpLHN9LHMuYXBwbHlCdWlsdEluVGhlbWU9ZnVuY3Rpb24oZSl7cmV0dXJuIHMuY2xhc3NMaXN0LmFkZChcImpzUGFuZWwtdGhlbWUtXCIrZS5jb2xvcikscy5oZWFkZXIuY2xhc3NMaXN0LmFkZChcImpzUGFuZWwtdGhlbWUtXCIrZS5jb2xvciksZS5maWxsaW5nJiYocy5jb250ZW50LnN0eWxlLmJhY2tncm91bmQ9XCJcIixzLmNvbnRlbnQuY2xhc3NMaXN0LmFkZChcImpzUGFuZWwtY29udGVudC1cIitlLmZpbGxpbmcpKSxuLmhlYWRlclRvb2xiYXJ8fChzLmNvbnRlbnQuc3R5bGUuYmFja2dyb3VuZD1cIlwiLHMuY29udGVudC5zdHlsZS5ib3JkZXJUb3A9XCIxcHggc29saWQgXCIrcy5oZWFkZXJ0aXRsZS5zdHlsZS5jb2xvciksc30scy5hcHBseUFyYml0cmFyeVRoZW1lPWZ1bmN0aW9uKGUpe3JldHVybiBzLmhlYWRlci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I9ZS5jb2xvcnNbMF0sW1wiLmpzUGFuZWwtaGVhZGVybG9nb1wiLFwiLmpzUGFuZWwtdGl0bGVcIixcIi5qc1BhbmVsLWhkci10b29sYmFyXCJdLmZvckVhY2goZnVuY3Rpb24odCl7cy5xdWVyeVNlbGVjdG9yKHQpLnN0eWxlLmNvbG9yPWUuY29sb3JzWzNdfSxzKSxzLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0blwiKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3Quc3R5bGUuY29sb3I9ZS5jb2xvcnNbM119KSxuLmhlYWRlclRvb2xiYXI/anNQYW5lbC5zZXRTdHlsZShzLmhlYWRlcnRvb2xiYXIse2JveFNoYWRvdzpcIjAgMCAxcHggXCIrZS5jb2xvcnNbM10rXCIgaW5zZXRcIix3aWR0aDpcImNhbGMoMTAwJSArIDRweClcIixtYXJnaW5MZWZ0OlwiLTFweFwifSk6cy5jb250ZW50LnN0eWxlLmJvcmRlclRvcD1cIjFweCBzb2xpZCBcIitlLmNvbG9yc1szXSxcImZpbGxlZFwiPT09ZS5maWxsaW5nPyhzLmNvbnRlbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yPWUuY29sb3JzWzBdLHMuY29udGVudC5zdHlsZS5jb2xvcj1lLmNvbG9yc1szXSk6XCJmaWxsZWRsaWdodFwiPT09ZS5maWxsaW5nJiYocy5jb250ZW50LnN0eWxlLmJhY2tncm91bmRDb2xvcj1lLmNvbG9yc1sxXSksc30scy5hcHBseUJvb3RzdHJhcFRoZW1lPWZ1bmN0aW9uKGUpe3ZhciB0PWUuYnN0aGVtZSxuPSQuZm4uYnV0dG9uLkNvbnN0cnVjdG9yLlZFUlNJT05bMF07aWYoXCI0XCI9PT1uP3MuY2xhc3NMaXN0LmFkZChcImJnLVwiK3QpOihbXCJwYW5lbFwiLFwicGFuZWwtXCIrdF0uZm9yRWFjaChmdW5jdGlvbihlKXtzLmNsYXNzTGlzdC5hZGQoZSl9KSxzLmhlYWRlci5jbGFzc0xpc3QuYWRkKFwicGFuZWwtaGVhZGluZ1wiKSksXCJtZGJcIj09PWUuYnMpe3ZhciBhPXQrXCItY29sb3JcIjtlLm1kYlN0eWxlJiYoYSs9XCItZGFya1wiKSxzLmNsYXNzTGlzdC5hZGQoYSl9dmFyIG89XCI0XCI9PT1uP3dpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHMpLmJhY2tncm91bmRDb2xvci5yZXBsYWNlKC9cXHMrL2csXCJcIik6d2luZG93LmdldENvbXB1dGVkU3R5bGUocy5oZWFkZXIpLmJhY2tncm91bmRDb2xvci5yZXBsYWNlKC9cXHMrL2csXCJcIik7dmFyIGk9anNQYW5lbC5jYWxjQ29sb3JzKG8pO3JldHVybiBzLmhlYWRlci5zdHlsZS5jb2xvcj1pWzNdLGUuZmlsbGluZz9zLnNldFRoZW1lKG8rXCIgXCIrZS5maWxsaW5nKTpzLnNldFRoZW1lKG8pLHN9LHMuYXBwbHlUaGVtZUJvcmRlcj1mdW5jdGlvbihlKXt2YXIgdD1uLmJvcmRlci5zcGxpdChcIiBcIik7aWYocy5zdHlsZS5ib3JkZXJXaWR0aD10WzBdLHMuc3R5bGUuYm9yZGVyU3R5bGU9dFsxXSxzLnN0eWxlLmJvcmRlckNvbG9yPXRbMl0sIWUuYnMpLTE9PT1qc1BhbmVsLnRoZW1lcy5pbmRleE9mKGUuY29sb3IpJiYodFsyXT9zLnN0eWxlLmJvcmRlckNvbG9yPXRbMl06cy5zdHlsZS5ib3JkZXJDb2xvcj1lLmNvbG9yc1swXSk7ZWxzZXt2YXIgYTthPVwidHJhbnNwYXJlbnRcIj09PXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHMuaGVhZGVyKS5iYWNrZ3JvdW5kQ29sb3I/d2luZG93LmdldENvbXB1dGVkU3R5bGUocykuYmFja2dyb3VuZENvbG9yLnJlcGxhY2UoL1xccysvZyxcIlwiKTp3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzLmhlYWRlcikuYmFja2dyb3VuZENvbG9yLnJlcGxhY2UoL1xccysvZyxcIlwiKSxzLnN0eWxlLmJvcmRlckNvbG9yPXRbMl0/dFsyXTphfXJldHVybiBzfSxzLmF1dG9wb3NpdGlvblJlbWFpbmluZz1mdW5jdGlvbigpe3ZhciBlO1tcImxlZnQtdG9wLWRvd25cIixcImxlZnQtdG9wLXJpZ2h0XCIsXCJjZW50ZXItdG9wLWRvd25cIixcInJpZ2h0LXRvcC1kb3duXCIsXCJyaWdodC10b3AtbGVmdFwiLFwibGVmdC1ib3R0b20tdXBcIixcImxlZnQtYm90dG9tLXJpZ2h0XCIsXCJjZW50ZXItYm90dG9tLXVwXCIsXCJyaWdodC1ib3R0b20tdXBcIixcInJpZ2h0LWJvdHRvbS1sZWZ0XCJdLmZvckVhY2goZnVuY3Rpb24odCl7cy5jbGFzc0xpc3QuY29udGFpbnModCkmJihlPXQpfSksZSYmbi5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi5cIitlKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UucmVwb3NpdGlvbigpfSl9LHMuY2FsY1NpemVGYWN0b3JzPWZ1bmN0aW9uKCl7dmFyIGU9d2luZG93LmdldENvbXB1dGVkU3R5bGUocyk7aWYobi5jb250YWluZXI9PT1kb2N1bWVudC5ib2R5KXMuaGY9cGFyc2VGbG9hdChzLnN0eWxlLmxlZnQpLyhkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoLXBhcnNlRmxvYXQocy5zdHlsZS53aWR0aCkpLHMudmY9cGFyc2VGbG9hdChzLnN0eWxlLnRvcCkvKHdpbmRvdy5pbm5lckhlaWdodC1wYXJzZUZsb2F0KGUuaGVpZ2h0KSk7ZWxzZXt2YXIgdD13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzLnBhcmVudEVsZW1lbnQpO3MuaGY9cGFyc2VGbG9hdChzLnN0eWxlLmxlZnQpLyhwYXJzZUZsb2F0KHQud2lkdGgpLXBhcnNlRmxvYXQocy5zdHlsZS53aWR0aCkpLHMudmY9cGFyc2VGbG9hdChzLnN0eWxlLnRvcCkvKHBhcnNlRmxvYXQodC5oZWlnaHQpLXBhcnNlRmxvYXQoZS5oZWlnaHQpKX19LHMuY2xlYXJUaGVtZT1mdW5jdGlvbihlKXtyZXR1cm4ganNQYW5lbC50aGVtZXMuY29uY2F0KGpzUGFuZWwubWRidGhlbWVzKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe1tcInBhbmVsXCIsXCJqc1BhbmVsLXRoZW1lLVwiK2UsXCJwYW5lbC1cIitlLGUrXCItY29sb3JcIl0uZm9yRWFjaChmdW5jdGlvbihlKXtzLmNsYXNzTGlzdC5yZW1vdmUoZSl9KSxzLmhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKFwicGFuZWwtaGVhZGluZ1wiLFwianNQYW5lbC10aGVtZS1cIitlKX0scykscy5oZWFkZXJ0aXRsZS5jbGFzc0xpc3QucmVtb3ZlKFwicGFuZWwtdGl0bGVcIikscy5jb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJwYW5lbC1ib2R5XCIsXCJqc1BhbmVsLWNvbnRlbnQtZmlsbGVkXCIsXCJqc1BhbmVsLWNvbnRlbnQtZmlsbGVkbGlnaHRcIikscy5mb290ZXIuY2xhc3NMaXN0LnJlbW92ZShcInBhbmVsLWZvb3RlclwiKSxqc1BhbmVsLnNldFN0eWxlKHMse2JhY2tncm91bmRDb2xvcjpcIlwiLGJvcmRlcldpZHRoOlwiXCIsYm9yZGVyU3R5bGU6XCJcIixib3JkZXJDb2xvcjpcIlwifSksanNQYW5lbC5zZXRTdHlsZShzLmNvbnRlbnQse2JhY2tncm91bmQ6XCJcIixib3JkZXI6XCJcIn0pLGpzUGFuZWwuc2V0U3R5bGUocy5oZWFkZXJ0b29sYmFyLHtib3hTaGFkb3c6XCJcIix3aWR0aDpcIlwiLG1hcmdpbkxlZnQ6XCJcIn0pLHMuaGVhZGVyLnN0eWxlLmJhY2tncm91bmQ9XCJcIixBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChzLmNvbnRyb2xiYXIucXVlcnlTZWxlY3RvckFsbChcIi5qc1BhbmVsLWljb25cIikpLmNvbmNhdChbcy5oZWFkZXJsb2dvLHMuaGVhZGVydGl0bGUscy5oZWFkZXJ0b29sYmFyLHMuY29udGVudF0pLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5zdHlsZS5jb2xvcj1cIlwifSksZSYmZS5jYWxsKHMscyksc30scy5jbG9zZT1mdW5jdGlvbihlKXt2YXIgdD1mdW5jdGlvbigpe3ZhciB0PW4uaWQ7cmV0dXJuIGEmJndpbmRvdy5jbGVhclRpbWVvdXQoYSkscy5jbG9zZUNoaWxkcGFuZWxzKCkscy5wYXJlbnRFbGVtZW50JiZzLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQocyksIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHQpJiZ2b2lkKHMucmVtb3ZlTWluaW1pemVkUmVwbGFjZW1lbnQoKSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGMpLGUmJmUuY2FsbCh0LHQpLG4ub25jbG9zZWQmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhzLG4ub25jbG9zZWQsXCJldmVyeVwiKSxzLmF1dG9wb3NpdGlvblJlbWFpbmluZygpKX07cmV0dXJuIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZCksbi5vbmJlZm9yZWNsb3NlJiYwPG4ub25iZWZvcmVjbG9zZS5sZW5ndGgmJiFqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3MocyxuLm9uYmVmb3JlY2xvc2UpP3M6dm9pZChuLmFuaW1hdGVPdXQ/KG4uYW5pbWF0ZUluJiZqc1BhbmVsLnJlbUNsYXNzKHMsbi5hbmltYXRlSW4pLGpzUGFuZWwuc2V0Q2xhc3MocyxuLmFuaW1hdGVPdXQpLHMuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLGZ1bmN0aW9uKCl7dCgpfSkpOnQoKSl9LHMuY2xvc2VDaGlsZHBhbmVscz1mdW5jdGlvbihlKXtyZXR1cm4gcy5nZXRDaGlsZHBhbmVscygpLmZvckVhY2goZnVuY3Rpb24oZSl7cmV0dXJuIGUuY2xvc2UoKX0pLGUmJmUuY2FsbChzLHMpLHN9LHMuY29udGVudFJlbW92ZT1mdW5jdGlvbihlKXtyZXR1cm4ganNQYW5lbC5lbXB0eU5vZGUocy5jb250ZW50KSxlJiZlLmNhbGwocyxzKSxzfSxzLmNvbnRlbnRSZXNpemU9ZnVuY3Rpb24oZSl7dmFyIHQ9d2luZG93LmdldENvbXB1dGVkU3R5bGUocyksYT13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzLmhlYWRlciksbz13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzLmZvb3RlciksaT1uLmhlYWRlcj9hLmhlaWdodDowLGw9XCJub25lXCI9PT1vLmRpc3BsYXk/MDpvLmhlaWdodCxyPXBhcnNlRmxvYXQodC5oZWlnaHQpLXBhcnNlRmxvYXQoaSktcGFyc2VGbG9hdChsKS1wYXJzZUZsb2F0KHQuYm9yZGVyVG9wV2lkdGgpLXBhcnNlRmxvYXQodC5ib3JkZXJCb3R0b21XaWR0aCk7cmV0dXJuIHMuY29udGVudC5zdHlsZS5oZWlnaHQ9citcInB4XCIsZSYmZS5jYWxsKHMscyksc30scy5jcmVhdGVNaW5pbWl6ZWRSZXBsYWNlbWVudD1mdW5jdGlvbigpe3ZhciBlPWpzUGFuZWwuY3JlYXRlTWluaW1pemVkVGVtcGxhdGUoKSx0PXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHMuaGVhZGVydGl0bGUpLmNvbG9yLGE9bi5pY29uZm9udCxvPWUucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWNvbnRyb2xiYXJcIik7cmV0dXJuIGUuc3R5bGUuYmFja2dyb3VuZENvbG9yPVwidHJhbnNwYXJlbnRcIj09PXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHMuaGVhZGVyKS5iYWNrZ3JvdW5kQ29sb3I/d2luZG93LmdldENvbXB1dGVkU3R5bGUocykuYmFja2dyb3VuZENvbG9yOndpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHMuaGVhZGVyKS5iYWNrZ3JvdW5kQ29sb3IsZS5pZD1zLmlkK1wiLW1pblwiLGUucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWhlYWRlcmJhclwiKS5yZXBsYWNlQ2hpbGQocy5oZWFkZXJsb2dvLmNsb25lTm9kZSghMCksZS5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtaGVhZGVybG9nb1wiKSksZS5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtdGl0bGViYXJcIikucmVwbGFjZUNoaWxkKHMuaGVhZGVydGl0bGUuY2xvbmVOb2RlKCEwKSxlLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC10aXRsZVwiKSksZS5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtdGl0bGVcIikuc3R5bGUuY29sb3I9dCxvLnN0eWxlLmNvbG9yPXQscy5zZXRJY29uZm9udChhLGUpLFwiZW5hYmxlZFwiPT09cy5kYXRhc2V0LmJ0bm5vcm1hbGl6ZT9qc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uKHQpe2UucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWJ0bi1ub3JtYWxpemVcIikuYWRkRXZlbnRMaXN0ZW5lcih0LGZ1bmN0aW9uKCl7cy5ub3JtYWxpemUoKS5yZW1vdmVNaW5pbWl6ZWRSZXBsYWNlbWVudCgpfSl9KTpvLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1idG4tbm9ybWFsaXplXCIpLnN0eWxlLmRpc3BsYXk9XCJub25lXCIsXCJlbmFibGVkXCI9PT1zLmRhdGFzZXQuYnRubWF4aW1pemU/anNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbih0KXtlLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1idG4tbWF4aW1pemVcIikuYWRkRXZlbnRMaXN0ZW5lcih0LGZ1bmN0aW9uKCl7cy5tYXhpbWl6ZSgpLnJlbW92ZU1pbmltaXplZFJlcGxhY2VtZW50KCl9KX0pOm8ucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWJ0bi1tYXhpbWl6ZVwiKS5zdHlsZS5kaXNwbGF5PVwibm9uZVwiLFwiZW5hYmxlZFwiPT09cy5kYXRhc2V0LmJ0bmNsb3NlP2pzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24odCl7ZS5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtYnRuLWNsb3NlXCIpLmFkZEV2ZW50TGlzdGVuZXIodCxmdW5jdGlvbigpe3MucmVtb3ZlTWluaW1pemVkUmVwbGFjZW1lbnQoKS5jbG9zZSgpfSl9KTpvLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1idG4tY2xvc2VcIikuc3R5bGUuZGlzcGxheT1cIm5vbmVcIixlfSxzLmRyYWdpdD1mdW5jdGlvbihlKXt2YXIgdD1PYmplY3QuYXNzaWduKHt9LGpzUGFuZWwuZGVmYXVsdHMuZHJhZ2l0LG4uZHJhZ2l0KSxhPXMucXVlcnlTZWxlY3RvckFsbCh0LmhhbmRsZXMpO3JldHVyblwiZGlzYWJsZVwiPT09ZT9hLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5zdHlsZS5wb2ludGVyRXZlbnRzPVwibm9uZVwifSk6YS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2Uuc3R5bGUucG9pbnRlckV2ZW50cz1cImF1dG9cIn0pLHN9LHMuZnJvbnQ9ZnVuY3Rpb24oZSl7dmFyIHQ9ISgxPGFyZ3VtZW50cy5sZW5ndGgmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXSl8fGFyZ3VtZW50c1sxXTtyZXR1cm4ganNQYW5lbC5mcm9udChzKSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHgpLGUmJmUuY2FsbChzLHMpLG4ub25mcm9udGVkJiZ0JiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3MocyxuLm9uZnJvbnRlZCxcImV2ZXJ5XCIpLHN9LHMuZ2V0Q2hpbGRwYW5lbHM9ZnVuY3Rpb24oKXtyZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwocy5jb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanNQYW5lbFwiKSl9LHMuZ2V0VGhlbWVEZXRhaWxzPWZ1bmN0aW9uKGUpe3ZhciB0PWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8gL2csXCJcIiksbj17Y29sb3I6ITEsY29sb3JzOiExLGZpbGxpbmc6ITEsYnM6ITEsYnN0aGVtZTohMX07aWYoXCJmaWxsZWRcIj09PXQuc3Vic3RyKC02LDYpPyhuLmZpbGxpbmc9XCJmaWxsZWRcIixuLmNvbG9yPXQuc3Vic3RyKDAsdC5sZW5ndGgtNikpOlwiZmlsbGVkbGlnaHRcIj09PXQuc3Vic3RyKC0xMSwxMSk/KG4uZmlsbGluZz1cImZpbGxlZGxpZ2h0XCIsbi5jb2xvcj10LnN1YnN0cigwLHQubGVuZ3RoLTExKSk6KG4uZmlsbGluZz1cIlwiLG4uY29sb3I9dCksbi5jb2xvcnM9anNQYW5lbC5jYWxjQ29sb3JzKG4uY29sb3IpLG4uY29sb3IubWF0Y2goXCItXCIpKXt2YXIgYT1uLmNvbG9yLnNwbGl0KFwiLVwiKTtuLmJzPWFbMF0sbi5ic3RoZW1lPWFbMV0sbi5tZGJTdHlsZT1hWzJdfHx2b2lkIDB9cmV0dXJuIG59LHMuaXNDaGlsZHBhbmVsPWZ1bmN0aW9uKCl7dmFyIGU9cy5jbG9zZXN0KFwiLmpzUGFuZWwtY29udGVudFwiKTtyZXR1cm4hIWUmJmUucGFyZW50RWxlbWVudH0scy5tYXhpbWl6ZT1mdW5jdGlvbihlKXtpZihuLm9uYmVmb3JlbWF4aW1pemUmJjA8bi5vbmJlZm9yZW1heGltaXplLmxlbmd0aCYmIWpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhzLG4ub25iZWZvcmVtYXhpbWl6ZSkpcmV0dXJuIHM7ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChmKTt2YXIgdD1zLnBhcmVudEVsZW1lbnQsYT1uLm1heGltaXplZE1hcmdpbjtyZXR1cm4gdD09PWRvY3VtZW50LmJvZHk/KHMuc3R5bGUud2lkdGg9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLWFbMV0tYVszXStcInB4XCIscy5zdHlsZS5oZWlnaHQ9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodC1hWzBdLWFbMl0rXCJweFwiLHMuc3R5bGUubGVmdD1hWzNdK1wicHhcIixzLnN0eWxlLnRvcD1hWzBdK1wicHhcIiwhbi5wb3NpdGlvbi5maXhlZCYmKHMuc3R5bGUubGVmdD13aW5kb3cucGFnZVhPZmZzZXQrYVszXStcInB4XCIscy5zdHlsZS50b3A9d2luZG93LnBhZ2VZT2Zmc2V0K2FbMF0rXCJweFwiKSk6KHMuc3R5bGUud2lkdGg9dC5jbGllbnRXaWR0aC1hWzFdLWFbM10rXCJweFwiLHMuc3R5bGUuaGVpZ2h0PXQuY2xpZW50SGVpZ2h0LWFbMF0tYVsyXStcInB4XCIscy5zdHlsZS5sZWZ0PWFbM10rXCJweFwiLHMuc3R5bGUudG9wPWFbMF0rXCJweFwiKSxzLmNvbnRlbnRSZXNpemUoKSxzLnJlbW92ZU1pbmltaXplZFJlcGxhY2VtZW50KCkscy5zdGF0dXM9XCJtYXhpbWl6ZWRcIixzLnNldENvbnRyb2xzKFtcIi5qc1BhbmVsLWJ0bi1tYXhpbWl6ZVwiLFwiLmpzUGFuZWwtYnRuLXNtYWxsaWZ5cmV2XCJdKSxqc1BhbmVsLmZyb250KHMpLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZyksZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChoKSxuLm9uc3RhdHVzY2hhbmdlJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3MocyxuLm9uc3RhdHVzY2hhbmdlLFwiZXZlcnlcIiksZSYmZS5jYWxsKHMscyksbi5vbm1heGltaXplZCYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHMsbi5vbm1heGltaXplZCxcImV2ZXJ5XCIpLHN9LHMubWluaW1pemU9ZnVuY3Rpb24oZSl7aWYoXCJtaW5pbWl6ZWRcIj09PXMuc3RhdHVzKXJldHVybiBzO2lmKG4ub25iZWZvcmVtaW5pbWl6ZSYmMDxuLm9uYmVmb3JlbWluaW1pemUubGVuZ3RoJiYhanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHMsbi5vbmJlZm9yZW1pbmltaXplKSlyZXR1cm4gcztpZihkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHUpLCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyXCIpKXt2YXIgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3QuaWQ9XCJqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lclwiLGRvY3VtZW50LmJvZHkuYXBwZW5kKHQpfWlmKHMuc3R5bGUubGVmdD1cIi05OTk5cHhcIixzLnN0YXR1c0JlZm9yZT1zLnN0YXR1cyxzLnN0YXR1cz1cIm1pbmltaXplZFwiLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoYiksZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChoKSxuLm9uc3RhdHVzY2hhbmdlJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3MocyxuLm9uc3RhdHVzY2hhbmdlLFwiZXZlcnlcIiksbi5taW5pbWl6ZVRvKXt2YXIgYT1zLmNyZWF0ZU1pbmltaXplZFJlcGxhY2VtZW50KCksbz12b2lkIDAsaT12b2lkIDAsbD12b2lkIDA7XCJkZWZhdWx0XCI9PT1uLm1pbmltaXplVG8/ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lclwiKS5hcHBlbmQoYSk6XCJwYXJlbnRwYW5lbFwiPT09bi5taW5pbWl6ZVRvPyhpPXMuY2xvc2VzdChcIi5qc1BhbmVsLWNvbnRlbnRcIikucGFyZW50RWxlbWVudCxsPWkucXVlcnlTZWxlY3RvckFsbChcIi5qc1BhbmVsLW1pbmltaXplZC1ib3hcIiksbz1sW2wubGVuZ3RoLTFdLG8uYXBwZW5kKGEpKTpcInBhcmVudFwiPT09bi5taW5pbWl6ZVRvPyhpPXMucGFyZW50RWxlbWVudCxvPWkucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLW1pbmltaXplZC1jb250YWluZXJcIiksIW8mJihvPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksby5jbGFzc05hbWU9XCJqc1BhbmVsLW1pbmltaXplZC1jb250YWluZXJcIixpLmFwcGVuZChvKSksby5hcHBlbmQoYSkpOmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iobi5taW5pbWl6ZVRvKS5hcHBlbmQoYSl9cmV0dXJuIGUmJmUuY2FsbChzLHMpLG4ub25taW5pbWl6ZWQmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhzLG4ub25taW5pbWl6ZWQsXCJldmVyeVwiKSxzfSxzLm5vcm1hbGl6ZT1mdW5jdGlvbihlKXtyZXR1cm5cIm5vcm1hbGl6ZWRcIj09PXMuc3RhdHVzP3M6bi5vbmJlZm9yZW5vcm1hbGl6ZSYmMDxuLm9uYmVmb3Jlbm9ybWFsaXplLmxlbmd0aCYmIWpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhzLG4ub25iZWZvcmVub3JtYWxpemUpP3M6KGRvY3VtZW50LmRpc3BhdGNoRXZlbnQocCkscy5zdHlsZS53aWR0aD1zLmN1cnJlbnREYXRhLndpZHRoLHMuc3R5bGUuaGVpZ2h0PXMuY3VycmVudERhdGEuaGVpZ2h0LHMuY29udGVudFJlc2l6ZSgpLHMuc3R5bGUubGVmdD1zLmN1cnJlbnREYXRhLmxlZnQscy5zdHlsZS50b3A9cy5jdXJyZW50RGF0YS50b3Ascy5yZW1vdmVNaW5pbWl6ZWRSZXBsYWNlbWVudCgpLHMuc3RhdHVzPVwibm9ybWFsaXplZFwiLHMuc2V0Q29udHJvbHMoW1wiLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZVwiLFwiLmpzUGFuZWwtYnRuLXNtYWxsaWZ5cmV2XCJdKSxqc1BhbmVsLmZyb250KHMpLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobSksZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChoKSxuLm9uc3RhdHVzY2hhbmdlJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3MocyxuLm9uc3RhdHVzY2hhbmdlLFwiZXZlcnlcIiksZSYmZS5jYWxsKHMscyksbi5vbm5vcm1hbGl6ZWQmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhzLG4ub25ub3JtYWxpemVkLFwiZXZlcnlcIikscyl9LHMucmVtb3ZlTWluaW1pemVkUmVwbGFjZW1lbnQ9ZnVuY3Rpb24oKXt2YXIgZT1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChzLmlkK1wiLW1pblwiKTtyZXR1cm4gZSYmZS5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGUpLHN9LHMucmVwb3NpdGlvbj1mdW5jdGlvbigpe2Zvcih2YXIgZT1hcmd1bWVudHMubGVuZ3RoLHQ9QXJyYXkoZSksYT0wO2E8ZTthKyspdFthXT1hcmd1bWVudHNbYV07dmFyIG8saT1uLnBvc2l0aW9uLGw9ITA7cmV0dXJuIHQuZm9yRWFjaChmdW5jdGlvbihlKXtcInN0cmluZ1wiPT10eXBlb2YgZXx8XCJvYmplY3RcIj09PShcInVuZGVmaW5lZFwiPT10eXBlb2YgZT9cInVuZGVmaW5lZFwiOl90eXBlb2YoZSkpP2k9ZTpcImJvb2xlYW5cIj09dHlwZW9mIGU/bD1lOlwiZnVuY3Rpb25cIj09dHlwZW9mIGUmJihvPWUpfSksanNQYW5lbC5wb3NpdGlvbihzLGkpLGwmJnMuc2F2ZUN1cnJlbnRQb3NpdGlvbigpLG8mJm8uY2FsbChzLHMpLHN9LHMucmVwb3NpdGlvbk9uU25hcD1mdW5jdGlvbihlKXt2YXIgdD1cIjBcIixhPVwiMFwiLG89anNQYW5lbC5wT2NvbnRhaW5tZW50KG4uZHJhZ2l0LmNvbnRhaW5tZW50KTtuLmRyYWdpdC5zbmFwLmNvbnRhaW5tZW50JiYoXCJsZWZ0LXRvcFwiPT09ZT8odD1vWzNdLGE9b1swXSk6XCJyaWdodC10b3BcIj09PWU/KHQ9LW9bMV0sYT1vWzBdKTpcInJpZ2h0LWJvdHRvbVwiPT09ZT8odD0tb1sxXSxhPS1vWzJdKTpcImxlZnQtYm90dG9tXCI9PT1lPyh0PW9bM10sYT0tb1syXSk6XCJjZW50ZXItdG9wXCI9PT1lPyh0PW9bM10vMi1vWzFdLzIsYT1vWzBdKTpcImNlbnRlci1ib3R0b21cIj09PWU/KHQ9b1szXS8yLW9bMV0vMixhPS1vWzJdKTpcImxlZnQtY2VudGVyXCI9PT1lPyh0PW9bM10sYT1vWzBdLzItb1syXS8yKTpcInJpZ2h0LWNlbnRlclwiPT1lJiYodD0tb1sxXSxhPW9bMF0vMi1vWzJdLzIpKSxqc1BhbmVsLnBvc2l0aW9uKHMsZSksanNQYW5lbC5zZXRTdHlsZShzLHtsZWZ0OlwiY2FsYyhcIitzLnN0eWxlLmxlZnQrXCIgKyBcIit0K1wicHgpXCIsdG9wOlwiY2FsYyhcIitzLnN0eWxlLnRvcCtcIiArIFwiK2ErXCJweClcIn0pfSxzLnJlc2l6ZT1mdW5jdGlvbigpe2Zvcih2YXIgZT1hcmd1bWVudHMubGVuZ3RoLHQ9QXJyYXkoZSksbj0wO248ZTtuKyspdFtuXT1hcmd1bWVudHNbbl07dmFyIGE9d2luZG93LmdldENvbXB1dGVkU3R5bGUocyksbz17d2lkdGg6YS53aWR0aCxoZWlnaHQ6YS5oZWlnaHR9LGk9ITAsbD12b2lkIDA7dC5mb3JFYWNoKGZ1bmN0aW9uKGUpe1wic3RyaW5nXCI9PXR5cGVvZiBlP289ZTpcIm9iamVjdFwiPT09KFwidW5kZWZpbmVkXCI9PXR5cGVvZiBlP1widW5kZWZpbmVkXCI6X3R5cGVvZihlKSk/bz1PYmplY3QuYXNzaWduKG8sZSk6XCJib29sZWFuXCI9PXR5cGVvZiBlP2k9ZTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBlJiYobD1lKX0pO3ZhciByPWpzUGFuZWwucE9zaXplKHMsbyk7cmV0dXJuIHMuc3R5bGUud2lkdGg9ci53aWR0aCxzLnN0eWxlLmhlaWdodD1yLmhlaWdodCxzLmNvbnRlbnRSZXNpemUoKSxpJiZzLnNhdmVDdXJyZW50RGltZW5zaW9ucygpLGwmJmwuY2FsbChzLHMpLHN9LHMucmVzaXplaXQ9ZnVuY3Rpb24oZSl7dmFyIHQ9cy5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzUGFuZWwtcmVzaXplaXQtaGFuZGxlXCIpO3JldHVyblwiZGlzYWJsZVwiPT09ZT90LmZvckVhY2goZnVuY3Rpb24oZSl7ZS5zdHlsZS5wb2ludGVyRXZlbnRzPVwibm9uZVwifSk6dC5mb3JFYWNoKGZ1bmN0aW9uKGUpe2Uuc3R5bGUucG9pbnRlckV2ZW50cz1cImF1dG9cIn0pLHN9LHMuc2F2ZUN1cnJlbnREaW1lbnNpb25zPWZ1bmN0aW9uKCl7dmFyIGU9d2luZG93LmdldENvbXB1dGVkU3R5bGUocyk7cy5jdXJyZW50RGF0YS53aWR0aD1lLndpZHRoLFwibm9ybWFsaXplZFwiPT09cy5zdGF0dXMmJihzLmN1cnJlbnREYXRhLmhlaWdodD1lLmhlaWdodCl9LHMuc2F2ZUN1cnJlbnRQb3NpdGlvbj1mdW5jdGlvbigpe3ZhciBlPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHMpO3MuY3VycmVudERhdGEubGVmdD1lLmxlZnQscy5jdXJyZW50RGF0YS50b3A9ZS50b3B9LHMuc2V0Q29udHJvbHM9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gcy5oZWFkZXIucXVlcnlTZWxlY3RvckFsbChcIi5qc1BhbmVsLWJ0blwiKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2Uuc3R5bGUuZGlzcGxheT1cImJsb2NrXCJ9KSxlLmZvckVhY2goZnVuY3Rpb24oZSl7dmFyIHQ9cy5jb250cm9sYmFyLnF1ZXJ5U2VsZWN0b3IoZSk7dCYmKHQuc3R5bGUuZGlzcGxheT1cIm5vbmVcIil9KSx0JiZ0LmNhbGwocyxzKSxzfSxzLnNldENvbnRyb2xTdGF0dXM9ZnVuY3Rpb24oZSl7dmFyIHQ9MTxhcmd1bWVudHMubGVuZ3RoJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOlwiZW5hYmxlXCIsbj1hcmd1bWVudHNbMl07aWYoXCJkaXNhYmxlXCI9PT10KXtpZihcInJlbW92ZWRcIiE9PXMuZ2V0QXR0cmlidXRlKFwiZGF0YS1idG5cIitlKSl7cy5zZXRBdHRyaWJ1dGUoXCJkYXRhLWJ0blwiK2UsXCJkaXNhYmxlZFwiKTt2YXIgYT1zLmNvbnRyb2xiYXIucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWJ0bi1cIitlKTthLnN0eWxlLnBvaW50ZXJFdmVudHM9XCJub25lXCIsYS5zdHlsZS5vcGFjaXR5PS40LGEuc3R5bGUuY3Vyc29yPVwiZGVmYXVsdFwifX1lbHNlIGlmKFwiZW5hYmxlXCI9PT10KXtpZihcInJlbW92ZWRcIiE9PXMuZ2V0QXR0cmlidXRlKFwiZGF0YS1idG5cIitlKSl7cy5zZXRBdHRyaWJ1dGUoXCJkYXRhLWJ0blwiK2UsXCJlbmFibGVkXCIpO3ZhciBvPXMuY29udHJvbGJhci5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtYnRuLVwiK2UpO28uc3R5bGUucG9pbnRlckV2ZW50cz1cImF1dG9cIixvLnN0eWxlLm9wYWNpdHk9MSxvLnN0eWxlLmN1cnNvcj1cInBvaW50ZXJcIn19ZWxzZSBpZihcInJlbW92ZVwiPT09dCl7dmFyIGk9cy5jb250cm9sYmFyLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1idG4tXCIrZSk7cy5jb250cm9sYmFyLnJlbW92ZUNoaWxkKGkpLHMuc2V0QXR0cmlidXRlKFwiZGF0YS1idG5cIitlLFwicmVtb3ZlZFwiKX1yZXR1cm4gbiYmbi5jYWxsKHMscyksc30scy5zZXRIZWFkZXJDb250cm9scz1mdW5jdGlvbihlKXt2YXIgdD1bXCJjbG9zZVwiLFwibWF4aW1pemVcIixcIm5vcm1hbGl6ZVwiLFwibWluaW1pemVcIixcInNtYWxsaWZ5XCIsXCJzbWFsbGlmeXJldlwiXSxhPW4uaGVhZGVyQ29udHJvbHM7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIGE/XCJub25lXCI9PT1hP3QuZm9yRWFjaChmdW5jdGlvbihlKXtzLnNldENvbnRyb2xTdGF0dXMoZSxcInJlbW92ZVwiKX0pOlwiY2xvc2Vvbmx5XCI9PT1hJiZ0LmZvckVhY2goZnVuY3Rpb24oZSl7XCJjbG9zZVwiIT09ZSYmcy5zZXRDb250cm9sU3RhdHVzKGUsXCJyZW1vdmVcIil9KTp0LmZvckVhY2goZnVuY3Rpb24oZSl7YVtlXSYmcy5zZXRDb250cm9sU3RhdHVzKGUsYVtlXSl9KSxlJiZlLmNhbGwocyxzKSxzfSxzLnNldEhlYWRlckxvZ289ZnVuY3Rpb24oZSx0KXtpZihcInN0cmluZ1wiIT10eXBlb2YgZSlqc1BhbmVsLmVtcHR5Tm9kZShzLmhlYWRlcmxvZ28pLHMuaGVhZGVybG9nby5hcHBlbmQoZSk7ZWxzZSBpZihcIjxcIiE9PWUuc3Vic3RyKDAsMSkpe3ZhciBuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7bi5zdHlsZS5tYXhIZWlnaHQ9Z2V0Q29tcHV0ZWRTdHlsZShzLmhlYWRlcmJhcikuaGVpZ2h0LG4uc3JjPWUsanNQYW5lbC5lbXB0eU5vZGUocy5oZWFkZXJsb2dvKSxzLmhlYWRlcmxvZ28uYXBwZW5kKG4pfWVsc2Ugcy5oZWFkZXJsb2dvLmlubmVySFRNTD1lO3JldHVybiB0JiZ0LmNhbGwocyxzKSxzfSxzLnNldEhlYWRlclJlbW92ZT1mdW5jdGlvbihlKXtyZXR1cm4gcy5yZW1vdmVDaGlsZChzLmhlYWRlcikscy5jb250ZW50LmNsYXNzTGlzdC5hZGQoXCJqc1BhbmVsLWNvbnRlbnQtbm9oZWFkZXJcIiksW1wiY2xvc2VcIixcIm1heGltaXplXCIsXCJub3JtYWxpemVcIixcIm1pbmltaXplXCIsXCJzbWFsbGlmeVwiLFwic21hbGxpZnlyZXZcIl0uZm9yRWFjaChmdW5jdGlvbihlKXtzLnNldEF0dHJpYnV0ZShcImRhdGEtYnRuXCIrZSxcInJlbW92ZWRcIil9KSxlJiZlLmNhbGwocyxzKSxzfSxzLnNldEhlYWRlclRpdGxlPWZ1bmN0aW9uKGUsdCl7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIGU/cy5oZWFkZXJ0aXRsZS5pbm5lckhUTUw9ZTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBlPyhqc1BhbmVsLmVtcHR5Tm9kZShzLmhlYWRlcnRpdGxlKSxzLmhlYWRlcnRpdGxlLmlubmVySFRNTD1lKCkpOihqc1BhbmVsLmVtcHR5Tm9kZShzLmhlYWRlcnRpdGxlKSxzLmhlYWRlcnRpdGxlLmFwcGVuZChlKSksdCYmdC5jYWxsKHMscyksc30scy5zZXRJY29uZm9udD1mdW5jdGlvbigpe3ZhciBlPSEhKDA8YXJndW1lbnRzLmxlbmd0aCYmdm9pZCAwIT09YXJndW1lbnRzWzBdKSYmYXJndW1lbnRzWzBdLHQ9MTxhcmd1bWVudHMubGVuZ3RoJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOnMsbj1hcmd1bWVudHNbMl07aWYoITEhPT1lKXt2YXIgYSxvO2lmKFwiYm9vdHN0cmFwXCI9PT1lfHxcImdseXBoaWNvblwiPT09ZSlhPVtcImdseXBoaWNvbiBnbHlwaGljb24tcmVtb3ZlXCIsXCJnbHlwaGljb24gZ2x5cGhpY29uLWZ1bGxzY3JlZW5cIixcImdseXBoaWNvbiBnbHlwaGljb24tcmVzaXplLWZ1bGxcIixcImdseXBoaWNvbiBnbHlwaGljb24tbWludXNcIixcImdseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi1kb3duXCIsXCJnbHlwaGljb24gZ2x5cGhpY29uLWNoZXZyb24tdXBcIl07ZWxzZSBpZihcImZhXCI9PT1lfHxcImZhclwiPT09ZXx8XCJmYWxcIj09PWV8fFwiZmFzXCI9PT1lKWE9W2UrXCIgZmEtd2luZG93LWNsb3NlXCIsZStcIiBmYS13aW5kb3ctbWF4aW1pemVcIixlK1wiIGZhLXdpbmRvdy1yZXN0b3JlXCIsZStcIiBmYS13aW5kb3ctbWluaW1pemVcIixlK1wiIGZhLWNoZXZyb24tZG93blwiLGUrXCIgZmEtY2hldnJvbi11cFwiXSxzLmNvbnRyb2xiYXIuc3R5bGUucGFkZGluZz1cIjZweCAwIDNweCAwXCI7ZWxzZSBpZihcIm1hdGVyaWFsLWljb25zXCI9PT1lKWE9W2UsZSxlLGUsZSxlXSxvPVtcImNsb3NlXCIsXCJmdWxsc2NyZWVuXCIsXCJmdWxsc2NyZWVuX2V4aXRcIixcImNhbGxfcmVjZWl2ZWRcIixcImV4cGFuZF9tb3JlXCIsXCJleHBhbmRfbGVzc1wiXSxzLmNvbnRyb2xiYXIuc3R5bGUucGFkZGluZz1cIjRweCAwIDVweCAwXCI7ZWxzZSBpZihBcnJheS5pc0FycmF5KGUpKWE9W1wiY3VzdG9tLWNvbnRyb2wtaWNvbiBcIitlWzVdLFwiY3VzdG9tLWNvbnRyb2wtaWNvbiBcIitlWzRdLFwiY3VzdG9tLWNvbnRyb2wtaWNvbiBcIitlWzNdLFwiY3VzdG9tLWNvbnRyb2wtaWNvbiBcIitlWzJdLFwiY3VzdG9tLWNvbnRyb2wtaWNvbiBcIitlWzFdLFwiY3VzdG9tLWNvbnRyb2wtaWNvbiBcIitlWzBdXTtlbHNlIHJldHVybiB0O3QucXVlcnlTZWxlY3RvckFsbChcIi5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuXCIpLmZvckVhY2goZnVuY3Rpb24oZSl7anNQYW5lbC5lbXB0eU5vZGUoZSkuaW5uZXJIVE1MPVwiPHNwYW4+PC9zcGFuPlwifSksQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4gPiBzcGFuXCIpKS5yZXZlcnNlKCkuZm9yRWFjaChmdW5jdGlvbih0LG4pe3QuY2xhc3NOYW1lPWFbbl0sXCJtYXRlcmlhbC1pY29uc1wiPT09ZSYmKHQudGV4dENvbnRlbnQ9b1tuXSl9KX1yZXR1cm4gbiYmbi5jYWxsKHQsdCksdH0scy5zZXRSdGw9ZnVuY3Rpb24oKXtbcy5oZWFkZXIscy5oZWFkZXJiYXIscy50aXRsZWJhcixzLmNvbnRyb2xiYXIscy5oZWFkZXJ0b29sYmFyLHMuZm9vdGVyXS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UuY2xhc3NMaXN0LmFkZChcImpzUGFuZWwtcnRsXCIpfSksW3MuaGVhZGVydGl0bGUscy5oZWFkZXJ0b29sYmFyLHMuY29udGVudCxzLmZvb3Rlcl0uZm9yRWFjaChmdW5jdGlvbihlKXtlLmRpcj1cInJ0bFwiLG4ucnRsLmxhbmcmJihlLmxhbmc9bi5ydGwubGFuZyl9KX0scy5zZXRTaXplPWZ1bmN0aW9uKCl7aWYobi5wYW5lbFNpemUpe3ZhciBlPWpzUGFuZWwucE9zaXplKHMsbi5wYW5lbFNpemUpO3Muc3R5bGUud2lkdGg9ZS53aWR0aCxzLnN0eWxlLmhlaWdodD1lLmhlaWdodCxzLmNvbnRlbnRSZXNpemUoKX1lbHNlIGlmKG4uY29udGVudFNpemUpe3ZhciB0PWpzUGFuZWwucE9zaXplKHMsbi5jb250ZW50U2l6ZSk7cy5jb250ZW50LnN0eWxlLndpZHRoPXQud2lkdGgscy5jb250ZW50LnN0eWxlLmhlaWdodD10LmhlaWdodCxzLnN0eWxlLndpZHRoPXQud2lkdGgscy5jb250ZW50LnN0eWxlLndpZHRoPVwiMTAwJVwifXJldHVybiBzfSxzLnNldFRoZW1lPWZ1bmN0aW9uKCl7dmFyIGU9MDxhcmd1bWVudHMubGVuZ3RoJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOm4udGhlbWUsdD1hcmd1bWVudHNbMV07aWYocy5jbGVhclRoZW1lKCksXCJub25lXCI9PT1lKXJldHVybiBzLnN0eWxlLmJhY2tncm91bmRDb2xvcj1cIiNmZmZcIixzO3ZhciBhPXMuZ2V0VGhlbWVEZXRhaWxzKGUpO3JldHVybiBhLmJzP3MuYXBwbHlCb290c3RyYXBUaGVtZShhKTotMT09PWpzUGFuZWwudGhlbWVzLmluZGV4T2YoYS5jb2xvcik/cy5hcHBseUFyYml0cmFyeVRoZW1lKGEpOnMuYXBwbHlCdWlsdEluVGhlbWUoYSksbi5ib3JkZXI/cy5hcHBseVRoZW1lQm9yZGVyKGEpOihzLnN0eWxlLmJvcmRlcldpZHRoPVwiXCIscy5zdHlsZS5ib3JkZXJTdHlsZT1cIlwiLHMuc3R5bGUuYm9yZGVyQ29sb3I9XCJcIiksdCYmdC5jYWxsKHMscyksc30scy5zbWFsbGlmeT1mdW5jdGlvbihlKXtpZihcInNtYWxsaWZpZWRcIj09PXMuc3RhdHVzfHxcInNtYWxsaWZpZWRtYXhcIj09PXMuc3RhdHVzKXJldHVybiBzO2lmKG4ub25iZWZvcmVzbWFsbGlmeSYmMDxuLm9uYmVmb3Jlc21hbGxpZnkubGVuZ3RoJiYhanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHMsbi5vbmJlZm9yZXNtYWxsaWZ5KSlyZXR1cm4gcztkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHkpLFwibm9ybWFsaXplZFwiPT09cy5zdGF0dXMmJnMuc2F2ZUN1cnJlbnREaW1lbnNpb25zKCkscy5zdHlsZS5vdmVyZmxvdz1cImhpZGRlblwiLHMuc3R5bGUuaGVpZ2h0PXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHMuaGVhZGVyYmFyKS5oZWlnaHQsXCJub3JtYWxpemVkXCI9PT1zLnN0YXR1cz8ocy5zZXRDb250cm9scyhbXCIuanNQYW5lbC1idG4tbm9ybWFsaXplXCIsXCIuanNQYW5lbC1idG4tc21hbGxpZnlcIl0pLHMuc3RhdHVzPVwic21hbGxpZmllZFwiLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQodiksZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChoKSxuLm9uc3RhdHVzY2hhbmdlJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3MocyxuLm9uc3RhdHVzY2hhbmdlLFwiZXZlcnlcIikpOlwibWF4aW1pemVkXCI9PT1zLnN0YXR1cyYmKHMuc2V0Q29udHJvbHMoW1wiLmpzUGFuZWwtYnRuLW1heGltaXplXCIsXCIuanNQYW5lbC1idG4tc21hbGxpZnlcIl0pLHMuc3RhdHVzPVwic21hbGxpZmllZG1heFwiLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoeiksZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChoKSxuLm9uc3RhdHVzY2hhbmdlJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3MocyxuLm9uc3RhdHVzY2hhbmdlLFwiZXZlcnlcIikpO3ZhciB0PXMucXVlcnlTZWxlY3RvckFsbChcIi5qc1BhbmVsLW1pbmltaXplZC1ib3hcIik7cmV0dXJuIHRbdC5sZW5ndGgtMV0uc3R5bGUuZGlzcGxheT1cIm5vbmVcIixlJiZlLmNhbGwocyxzKSxuLm9uc21hbGxpZmllZCYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHMsbi5vbnNtYWxsaWZpZWQsXCJldmVyeVwiKSxzfSxzLnVuc21hbGxpZnk9ZnVuY3Rpb24oZSl7aWYoXCJzbWFsbGlmaWVkXCI9PT1zLnN0YXR1c3x8XCJzbWFsbGlmaWVkbWF4XCI9PT1zLnN0YXR1cyl7aWYobi5vbmJlZm9yZXVuc21hbGxpZnkmJjA8bi5vbmJlZm9yZXVuc21hbGxpZnkubGVuZ3RoJiYhanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHMsbi5vbmJlZm9yZXVuc21hbGxpZnkpKXJldHVybiBzO2RvY3VtZW50LmRpc3BhdGNoRXZlbnQodykscy5zdHlsZS5vdmVyZmxvdz1cInZpc2libGVcIixqc1BhbmVsLmZyb250KHMpLFwic21hbGxpZmllZFwiPT09cy5zdGF0dXM/KHMuc3R5bGUuaGVpZ2h0PXMuY3VycmVudERhdGEuaGVpZ2h0LHMuc2V0Q29udHJvbHMoW1wiLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZVwiLFwiLmpzUGFuZWwtYnRuLXNtYWxsaWZ5cmV2XCJdKSxzLmNvbnRlbnRSZXNpemUoKSxzLnN0YXR1cz1cIm5vcm1hbGl6ZWRcIixkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG0pLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoaCksbi5vbnN0YXR1c2NoYW5nZSYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHMsbi5vbnN0YXR1c2NoYW5nZSxcImV2ZXJ5XCIpKTpcInNtYWxsaWZpZWRtYXhcIj09PXMuc3RhdHVzP3MubWF4aW1pemUoKTpcIm1pbmltaXplZFwiPT09cy5zdGF0dXMmJnMubm9ybWFsaXplKCk7dmFyIHQ9cy5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzUGFuZWwtbWluaW1pemVkLWJveFwiKTt0W3QubGVuZ3RoLTFdLnN0eWxlLmRpc3BsYXk9XCJmbGV4XCIsZSYmZS5jYWxsKHMscyksbi5vbnVuc21hbGxpZmllZCYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHMsbi5vbnVuc21hbGxpZmllZCxcImV2ZXJ5XCIpfXJldHVybiBzfSxzLmlkPW4uaWQscy5jbGFzc0xpc3QuYWRkKFwianNQYW5lbC1cIituLnBhbmVsdHlwZSksXCJzdGFuZGFyZFwiPT09bi5wYW5lbHR5cGUmJihzLnN0eWxlLnpJbmRleD10aGlzLnppLm5leHQoKSksbC5hcHBlbmQocykscy5mcm9udCghMSwhMSkscy5zZXRUaGVtZShuLnRoZW1lKSxuLmJveFNoYWRvdyYmcy5jbGFzc0xpc3QuYWRkKFwianNQYW5lbC1kZXB0aC1cIituLmJveFNoYWRvdyksIW4uaGVhZGVyKXMuc2V0SGVhZGVyUmVtb3ZlKCk7ZWxzZSBpZihuLmhlYWRlckxvZ28mJnMuc2V0SGVhZGVyTG9nbyhuLmhlYWRlckxvZ28pLHMuc2V0SWNvbmZvbnQobi5pY29uZm9udCkscy5zZXRIZWFkZXJUaXRsZShuLmhlYWRlclRpdGxlKSxzLnNldEhlYWRlckNvbnRyb2xzKCksXCJhdXRvLXNob3ctaGlkZVwiPT09bi5oZWFkZXIpe3ZhciBxLEE9bi50aGVtZS5zcGxpdChcIi1cIiksVz1cImpzUGFuZWwtZGVwdGgtXCIrbi5ib3hTaGFkb3csUj1cImJnLVwiO0FbMV0mJihSKz1BWzFdKSxBWzJdJiYocT1BWzFdK1wiLWNvbG9yLVwiK0FbMl0pLHMuaGVhZGVyLnN0eWxlLm9wYWNpdHk9MCwoXCJib290c3RyYXBcIj09PUFbMF18fFwibWRiXCI9PT1BWzBdKSYmKHRoaXMucmVtQ2xhc3MocyxSKSxcIm1kYlwiPT09QVswXSYmdGhpcy5yZW1DbGFzcyhzLHEpKSxzLnN0eWxlLmJhY2tncm91bmRDb2xvcj1cInRyYW5zcGFyZW50XCIsdGhpcy5yZW1DbGFzcyhzLFcpLHRoaXMuc2V0Q2xhc3Mocy5jb250ZW50LFcpLHMuaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsZnVuY3Rpb24oKXtzLmhlYWRlci5zdHlsZS5vcGFjaXR5PTEsKFwiYm9vdHN0cmFwXCI9PT1BWzBdfHxcIm1kYlwiPT09QVswXSkmJihqc1BhbmVsLnNldENsYXNzKHMsUiksXCJtZGJcIj09PUFbMF0mJmpzUGFuZWwuc2V0Q2xhc3MocyxxKSksanNQYW5lbC5zZXRDbGFzcyhzLFcpLGpzUGFuZWwucmVtQ2xhc3Mocy5jb250ZW50LFcpfSkscy5oZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIixmdW5jdGlvbigpe3MuaGVhZGVyLnN0eWxlLm9wYWNpdHk9MCwoXCJib290c3RyYXBcIj09PUFbMF18fFwibWRiXCI9PT1BWzBdKSYmKGpzUGFuZWwucmVtQ2xhc3MocyxSKSxcIm1kYlwiPT09QVswXSYmanNQYW5lbC5yZW1DbGFzcyhzLHEpKSxqc1BhbmVsLnJlbUNsYXNzKHMsVyksanNQYW5lbC5zZXRDbGFzcyhzLmNvbnRlbnQsVyl9KX1pZihuLmhlYWRlclRvb2xiYXImJnMuYWRkVG9vbGJhcihzLmhlYWRlcnRvb2xiYXIsbi5oZWFkZXJUb29sYmFyKSxuLmZvb3RlclRvb2xiYXImJnMuYWRkVG9vbGJhcihzLmZvb3RlcixuLmZvb3RlclRvb2xiYXIpLG4uY29udGVudCYmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG4uY29udGVudD9uLmNvbnRlbnQuY2FsbChzLHMpOlwic3RyaW5nXCI9PXR5cGVvZiBuLmNvbnRlbnQ/cy5jb250ZW50LmlubmVySFRNTD1uLmNvbnRlbnQ6cy5jb250ZW50LmFwcGVuZChuLmNvbnRlbnQpKSxuLmNvbnRlbnRBamF4JiZ0aGlzLmFqYXgocyxuLmNvbnRlbnRBamF4KSxuLmNvbnRlbnRGZXRjaCYmdGhpcy5mZXRjaChzKSxuLmNvbnRlbnRPdmVyZmxvdyl7dmFyIEI9bi5jb250ZW50T3ZlcmZsb3cuc3BsaXQoXCIgXCIpOzE9PT1CLmxlbmd0aD9zLmNvbnRlbnQuc3R5bGUub3ZlcmZsb3c9QlswXToyPT09Qi5sZW5ndGgmJihzLmNvbnRlbnQuc3R5bGUub3ZlcmZsb3dYPUJbMF0scy5jb250ZW50LnN0eWxlLm92ZXJmbG93WT1CWzFdKX1pZihuLnJ0bCYmcy5zZXRSdGwoKSxzLnNldFNpemUoKSxzLnN0YXR1cz1cIm5vcm1hbGl6ZWRcIixuLnBvc2l0aW9ufHxcImN1cnNvclwiIT09bi5wb3NpdGlvbj90aGlzLnBvc2l0aW9uKHMsbi5wb3NpdGlvbik6cy5zdHlsZS5vcGFjaXR5PTEsZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChtKSxzLmNhbGNTaXplRmFjdG9ycygpLG4uYW5pbWF0ZUluJiYocy5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uZW5kXCIsZnVuY3Rpb24oKXtlLnJlbUNsYXNzKHMsbi5hbmltYXRlSW4pfSksdGhpcy5zZXRDbGFzcyhzLG4uYW5pbWF0ZUluKSksbi5zeW5jTWFyZ2lucyl7dmFyIEg9dGhpcy5wT2NvbnRhaW5tZW50KG4ubWF4aW1pemVkTWFyZ2luKTtuLmRyYWdpdCYmKG4uZHJhZ2l0LmNvbnRhaW5tZW50PUgsbi5kcmFnaXQuc25hcCYmKG4uZHJhZ2l0LnNuYXAuY29udGFpbm1lbnQ9ITApKSxuLnJlc2l6ZWl0JiYobi5yZXNpemVpdC5jb250YWlubWVudD1IKX1pZihuLmRyYWdpdD8odGhpcy5kcmFnaXQocyxuLmRyYWdpdCksZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImpzcGFuZWxkcmFnc3RvcFwiLGZ1bmN0aW9uKHQpe3QuZGV0YWlsPT09cy5pZCYmcy5jYWxjU2l6ZUZhY3RvcnMoKX0sITEpKTpzLnRpdGxlYmFyLnN0eWxlLmN1cnNvcj1cImRlZmF1bHRcIixuLnJlc2l6ZWl0KXt0aGlzLnJlc2l6ZWl0KHMsbi5yZXNpemVpdCk7dmFyIE07ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImpzcGFuZWxyZXNpemVzdGFydFwiLGZ1bmN0aW9uKHQpe3QuZGV0YWlsPT09cy5pZCYmKE09cy5zdGF0dXMpfSwhMSksZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImpzcGFuZWxyZXNpemVzdG9wXCIsZnVuY3Rpb24odCl7dC5kZXRhaWw9PT1zLmlkJiYoXCJzbWFsbGlmaWVkXCI9PT1NfHxcInNtYWxsaWZpZWRtYXhcIj09PU18fFwibWF4aW1pemVkXCI9PT1NKSYmcGFyc2VGbG9hdChzLnN0eWxlLmhlaWdodCk+cGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzLmhlYWRlcikuaGVpZ2h0KSYmKHMuc2V0Q29udHJvbHMoW1wiLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZVwiLFwiLmpzUGFuZWwtYnRuLXNtYWxsaWZ5cmV2XCJdKSxzLnN0YXR1cz1cIm5vcm1hbGl6ZWRcIixkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG0pLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoaCksbi5vbnN0YXR1c2NoYW5nZSYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHMsbi5vbnN0YXR1c2NoYW5nZSxcImV2ZXJ5XCIpLHMuY2FsY1NpemVGYWN0b3JzKCkpfSwhMSl9aWYocy5zYXZlQ3VycmVudERpbWVuc2lvbnMoKSxzLnNhdmVDdXJyZW50UG9zaXRpb24oKSxuLnNldFN0YXR1cyl7dmFyIE89bi5zZXRTdGF0dXM7aWYoXCJzbWFsbGlmaWVkbWF4XCI9PT1PKXMubWF4aW1pemUoKS5zbWFsbGlmeSgpO2Vsc2UgaWYoXCJzbWFsbGlmaWVkXCI9PT1PKXMuc21hbGxpZnkoKTtlbHNle3ZhciBEPU8uc3Vic3RyKDAsTy5sZW5ndGgtMSk7c1tEXSgpfX1yZXR1cm4gbi5hdXRvY2xvc2UmJihhPXdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cyYmcy5jbG9zZSgpfSxuLmF1dG9jbG9zZSkpLHRoaXMucG9pbnRlcmRvd24uZm9yRWFjaChmdW5jdGlvbihlKXtzLmFkZEV2ZW50TGlzdGVuZXIoZSxmdW5jdGlvbih0KXt0LnRhcmdldC5jbG9zZXN0KFwiLmpzUGFuZWwtYnRuLWNsb3NlXCIpfHx0LnRhcmdldC5jbG9zZXN0KFwiLmpzUGFuZWwtYnRuLW1pbmltaXplXCIpfHxcInN0YW5kYXJkXCIhPT1uLnBhbmVsdHlwZXx8cy5mcm9udCgpfSwhMSl9KSxuLm9ud2luZG93cmVzaXplJiZ3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLGZ1bmN0aW9uKHQpe2lmKHQudGFyZ2V0PT09d2luZG93KXt2YXIgZT1uLm9ud2luZG93cmVzaXplLGE9cy5zdGF0dXMsbz13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzLnBhcmVudEVsZW1lbnQpO1wibWF4aW1pemVkXCI9PT1hJiYhMD09PWU/cy5tYXhpbWl6ZSgpOihcIm5vcm1hbGl6ZWRcIj09PWF8fFwic21hbGxpZmllZFwiPT09YXx8XCJtYXhpbWl6ZWRcIj09PWEpJiYoXCJmdW5jdGlvblwiPT10eXBlb2YgZT9lLmNhbGwocyx0LHMpOihzLnN0eWxlLmxlZnQ9ZnVuY3Rpb24oKXt2YXIgZTtyZXR1cm4gZT1uLmNvbnRhaW5lcj09PWRvY3VtZW50LmJvZHk/KGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgtcGFyc2VGbG9hdChzLnN0eWxlLndpZHRoKSkqcy5oZjoocGFyc2VGbG9hdChvLndpZHRoKS1wYXJzZUZsb2F0KHMuc3R5bGUud2lkdGgpKSpzLmhmLDA+PWU/MDplK1wicHhcIn0oKSxzLnN0eWxlLnRvcD1mdW5jdGlvbigpe3ZhciBlO3JldHVybiBlPW4uY29udGFpbmVyPT09ZG9jdW1lbnQuYm9keT8od2luZG93LmlubmVySGVpZ2h0LXBhcnNlRmxvYXQocy5jdXJyZW50RGF0YS5oZWlnaHQpKSpzLnZmOihwYXJzZUZsb2F0KG8uaGVpZ2h0KS1wYXJzZUZsb2F0KHMuY3VycmVudERhdGEuaGVpZ2h0KSkqcy52ZiwwPj1lPzA6ZStcInB4XCJ9KCkpKX19LCExKSx0aGlzLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uKGUpe3MuYWRkRXZlbnRMaXN0ZW5lcihlLGZ1bmN0aW9uKCl7cy5jb250ZW50LnN0eWxlLnBvaW50ZXJFdmVudHM9XCJpbmhlcml0XCJ9KX0pLHRoaXMuZ2xvYmFsQ2FsbGJhY2tzJiYoQXJyYXkuaXNBcnJheSh0aGlzLmdsb2JhbENhbGxiYWNrcyk/dGhpcy5nbG9iYWxDYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbihlKXtlLmNhbGwocyxzKX0pOnRoaXMuZ2xvYmFsQ2FsbGJhY2tzLmNhbGwocyxzKSksbi5jYWxsYmFjayYmKEFycmF5LmlzQXJyYXkobi5jYWxsYmFjayk/bi5jYWxsYmFjay5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UuY2FsbChzLHMpfSk6bi5jYWxsYmFjay5jYWxsKHMscykpLHQmJnQuY2FsbChzLHMpLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQociksc319OyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xufTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHBhc3NpbmcgZnVuY3Rpb24gaW4gb3B0aW9ucywgdGhlbiB1c2UgaXQgZm9yIHJlc29sdmUgXCJoZWFkXCIgZWxlbWVudC5cbiAgICAgICAgICAgICAgICAvLyBVc2VmdWwgZm9yIFNoYWRvdyBSb290IHN0eWxlIGkuZVxuICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAvLyAgIGluc2VydEludG86IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9vXCIpLnNoYWRvd1Jvb3QgfVxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHN0eWxlVGFyZ2V0ID0gZ2V0VGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3RhcmdldF1cblx0fTtcbn0pKCk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG4gICAgICAgIGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvICsgXCIgXCIgKyBvcHRpb25zLmluc2VydEF0LmJlZm9yZSk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cbiIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvfFxccyokKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuIiwiaW1wb3J0IHsgQnV0dHBsdWdEZXZpY2UsIFNpbmdsZU1vdG9yVmlicmF0ZUNtZCwgRmxlc2hsaWdodExhdW5jaEZXMTJDbWQgfSBmcm9tIFwiLi4vaW5kZXhcIjtcbmltcG9ydCAqIGFzIE1lc3NhZ2VzIGZyb20gXCIuLi9pbmRleFwiO1xuXG5leHBvcnQgY2xhc3MgVGVzdERldmljZSBleHRlbmRzIEJ1dHRwbHVnRGV2aWNlIHtcblxuICBwcml2YXRlIF9jb25uZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfbGluZWFyU3BlZWQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2xpbmVhclBvc2l0aW9uOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF92aWJyYXRlU3BlZWQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX3JvdGF0ZVNwZWVkOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9yb3RhdGVDbG9ja3dpc2U6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgc2hvdWxkVmlicmF0ZTogYm9vbGVhbiA9IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgc2hvdWxkTGluZWFyOiBib29sZWFuID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICBzaG91bGRSb3RhdGU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHN1cGVyKGBUZXN0IERldmljZSAtICR7bmFtZX1gLCBcIlRlc3REZXZpY2VcIiArIChzaG91bGRWaWJyYXRlID8gXCJWaWJyYXRlXCIgOiBcIlwiKSArIChzaG91bGRMaW5lYXIgPyBcIkxpbmVhclwiIDogXCJcIikpO1xuICAgIHRoaXMuTXNnRnVuY3Muc2V0KE1lc3NhZ2VzLlN0b3BEZXZpY2VDbWQubmFtZSwgdGhpcy5IYW5kbGVTdG9wRGV2aWNlQ21kKTtcbiAgICBpZiAoc2hvdWxkVmlicmF0ZSkge1xuICAgICAgdGhpcy5Nc2dGdW5jcy5zZXQoTWVzc2FnZXMuU2luZ2xlTW90b3JWaWJyYXRlQ21kLm5hbWUsIHRoaXMuSGFuZGxlU2luZ2xlTW90b3JWaWJyYXRlQ21kKTtcbiAgICAgIHRoaXMuTXNnRnVuY3Muc2V0KE1lc3NhZ2VzLlZpYnJhdGVDbWQubmFtZSwgdGhpcy5IYW5kbGVWaWJyYXRlQ21kKTtcbiAgICB9XG4gICAgaWYgKHNob3VsZExpbmVhcikge1xuICAgICAgdGhpcy5Nc2dGdW5jcy5zZXQoTWVzc2FnZXMuRmxlc2hsaWdodExhdW5jaEZXMTJDbWQubmFtZSwgdGhpcy5IYW5kbGVGbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZCk7XG4gICAgICB0aGlzLk1zZ0Z1bmNzLnNldChNZXNzYWdlcy5MaW5lYXJDbWQubmFtZSwgdGhpcy5IYW5kbGVMaW5lYXJDbWQpO1xuICAgIH1cbiAgICBpZiAoc2hvdWxkUm90YXRlKSB7XG4gICAgICB0aGlzLk1zZ0Z1bmNzLnNldChNZXNzYWdlcy5Sb3RhdGVDbWQubmFtZSwgdGhpcy5IYW5kbGVSb3RhdGVDbWQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgQ29ubmVjdGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9jb25uZWN0ZWQ7XG4gIH1cblxuICBwdWJsaWMgc2V0IENvbm5lY3RlZChjb25uZWN0ZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9jb25uZWN0ZWQgPSBjb25uZWN0ZWQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IE1lc3NhZ2VTcGVjaWZpY2F0aW9ucygpOiBvYmplY3Qge1xuICAgIGlmICh0aGlzLk1zZ0Z1bmNzLmhhcyhNZXNzYWdlcy5WaWJyYXRlQ21kLm5hbWUpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBWaWJyYXRlQ21kOiB7IEZlYXR1cmVDb3VudDogMiB9LFxuICAgICAgICBTaW5nbGVNb3RvclZpYnJhdGVDbWQ6IHt9LFxuICAgICAgICBTdG9wRGV2aWNlQ21kOiB7fSxcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0aGlzLk1zZ0Z1bmNzLmhhcyhNZXNzYWdlcy5MaW5lYXJDbWQubmFtZSkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIExpbmVhckNtZDogeyBGZWF0dXJlQ291bnQ6IDEgfSxcbiAgICAgICAgRmxlc2hsaWdodExhdW5jaEZXMTJDbWQ6IHt9LFxuICAgICAgICBTdG9wRGV2aWNlQ21kOiB7fSxcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0aGlzLk1zZ0Z1bmNzLmhhcyhNZXNzYWdlcy5Sb3RhdGVDbWQubmFtZSkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIFJvdGF0ZUNtZDogeyBGZWF0dXJlQ291bnQ6IDEgfSxcbiAgICAgICAgU3RvcERldmljZUNtZDoge30sXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICBwdWJsaWMgRGlzY29ubmVjdCgpIHtcbiAgICB0aGlzLl9jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmVtaXQoXCJkZXZpY2VyZW1vdmVkXCIsIHRoaXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBIYW5kbGVTdG9wRGV2aWNlQ21kID0gYXN5bmMgKGFNc2c6IE1lc3NhZ2VzLlN0b3BEZXZpY2VDbWQpOiBQcm9taXNlPE1lc3NhZ2VzLkJ1dHRwbHVnTWVzc2FnZT4gPT4ge1xuICAgIGlmICh0aGlzLk1zZ0Z1bmNzLmhhcyhNZXNzYWdlcy5WaWJyYXRlQ21kLm5hbWUpKSB7XG4gICAgICB0aGlzLmVtaXQoXCJ2aWJyYXRlXCIsIDApO1xuICAgIH0gZWxzZSBpZiAodGhpcy5Nc2dGdW5jcy5oYXMoTWVzc2FnZXMuTGluZWFyQ21kLm5hbWUpKSB7XG4gICAgICB0aGlzLmVtaXQoXCJsaW5lYXJcIiwgeyBwb3NpdGlvbjogdGhpcy5fbGluZWFyUG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IHRoaXMuX2xpbmVhclNwZWVkfSk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IE1lc3NhZ2VzLk9rKGFNc2cuSWQpKTtcbiAgfVxuXG4gIHByaXZhdGUgSGFuZGxlU2luZ2xlTW90b3JWaWJyYXRlQ21kID1cbiAgICBhc3luYyAoYU1zZzogTWVzc2FnZXMuU2luZ2xlTW90b3JWaWJyYXRlQ21kKTogUHJvbWlzZTxNZXNzYWdlcy5CdXR0cGx1Z01lc3NhZ2U+ID0+IHtcbiAgICAgIHRoaXMuX3ZpYnJhdGVTcGVlZCA9IGFNc2cuU3BlZWQ7XG4gICAgICB0aGlzLmVtaXQoXCJ2aWJyYXRlXCIsIGFNc2cuU3BlZWQpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgTWVzc2FnZXMuT2soYU1zZy5JZCkpO1xuICAgIH1cblxuICBwcml2YXRlIEhhbmRsZVZpYnJhdGVDbWQgPVxuICAgIGFzeW5jIChhTXNnOiBNZXNzYWdlcy5WaWJyYXRlQ21kKTogUHJvbWlzZTxNZXNzYWdlcy5CdXR0cGx1Z01lc3NhZ2U+ID0+IHtcbiAgICAgIHJldHVybiB0aGlzLkhhbmRsZVNpbmdsZU1vdG9yVmlicmF0ZUNtZChuZXcgU2luZ2xlTW90b3JWaWJyYXRlQ21kKGFNc2cuU3BlZWRzWzBdLlNwZWVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYU1zZy5EZXZpY2VJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFNc2cuSWQpKTtcbiAgICB9XG5cbiAgcHJpdmF0ZSBIYW5kbGVSb3RhdGVDbWQgPVxuICAgIGFzeW5jIChhTXNnOiBNZXNzYWdlcy5Sb3RhdGVDbWQpOiBQcm9taXNlPE1lc3NhZ2VzLkJ1dHRwbHVnTWVzc2FnZT4gPT4ge1xuICAgICAgdGhpcy5fcm90YXRlU3BlZWQgPSBhTXNnLlJvdGF0aW9uc1swXS5TcGVlZDtcbiAgICAgIHRoaXMuX3JvdGF0ZUNsb2Nrd2lzZSA9IGFNc2cuUm90YXRpb25zWzBdLkNsb2Nrd2lzZTtcbiAgICAgIHRoaXMuZW1pdChcInZpYnJhdGVcIiwgeyBzcGVlZDogdGhpcy5fcm90YXRlU3BlZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb2Nrd2lzZTogdGhpcy5fcm90YXRlQ2xvY2t3aXNlIH0pO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgTWVzc2FnZXMuT2soYU1zZy5JZCkpO1xuICAgIH1cblxuICBwcml2YXRlIEhhbmRsZUZsZXNobGlnaHRMYXVuY2hGVzEyQ21kID1cbiAgICBhc3luYyAoYU1zZzogTWVzc2FnZXMuRmxlc2hsaWdodExhdW5jaEZXMTJDbWQpOiBQcm9taXNlPE1lc3NhZ2VzLkJ1dHRwbHVnTWVzc2FnZT4gPT4ge1xuICAgICAgdGhpcy5fbGluZWFyUG9zaXRpb24gPSBhTXNnLlBvc2l0aW9uO1xuICAgICAgdGhpcy5fbGluZWFyU3BlZWQgPSBhTXNnLlNwZWVkO1xuICAgICAgdGhpcy5lbWl0KFwibGluZWFyXCIsIHsgcG9zaXRpb246IHRoaXMuX2xpbmVhclBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVkOiB0aGlzLl9saW5lYXJTcGVlZCB9KTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IE1lc3NhZ2VzLk9rKGFNc2cuSWQpKTtcbiAgICB9XG5cbiAgcHJpdmF0ZSBIYW5kbGVMaW5lYXJDbWQgPVxuICAgIGFzeW5jIChhTXNnOiBNZXNzYWdlcy5MaW5lYXJDbWQpOiBQcm9taXNlPE1lc3NhZ2VzLkJ1dHRwbHVnTWVzc2FnZT4gPT4ge1xuICAgICAgaWYgKGFNc2cuVmVjdG9ycy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlcy5FcnJvcihcIkxpbmVhckNtZCByZXF1aXJlcyAxIHZlY3RvciBmb3IgdGhpcyBkZXZpY2UuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWVzc2FnZXMuRXJyb3JDbGFzcy5FUlJPUl9ERVZJQ0UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYU1zZy5JZCk7XG4gICAgICB9XG4gICAgICAvLyBNb3ZlIGJldHdlZW4gNS85NSwgb3RoZXJ3aXNlIHdlJ2xsIGFsbG93IHRoZSBkZXZpY2UgdG8gc21hY2sgaW50byBoYXJkXG4gICAgICAvLyBzdG9wcyBiZWNhdXNlIG9mIGJyYWluZGVhZCBmaXJtd2FyZS5cbiAgICAgIGNvbnN0IHJhbmdlOiBudW1iZXIgPSA5MDtcbiAgICAgIGNvbnN0IHZlY3RvciA9IGFNc2cuVmVjdG9yc1swXTtcbiAgICAgIGNvbnN0IGN1cnJlbnRQb3NpdGlvbiA9IHZlY3Rvci5Qb3NpdGlvbiAqIDEwMDtcbiAgICAgIGNvbnN0IHBvc2l0aW9uRGVsdGE6IG51bWJlciA9IE1hdGguYWJzKGN1cnJlbnRQb3NpdGlvbiAtIHRoaXMuX2xpbmVhclBvc2l0aW9uKTtcbiAgICAgIGxldCBzcGVlZDogbnVtYmVyID0gTWF0aC5mbG9vcigyNTAwMCAqIE1hdGgucG93KCgodmVjdG9yLkR1cmF0aW9uICogOTApIC8gcG9zaXRpb25EZWx0YSksIC0xLjA1KSk7XG5cbiAgICAgIC8vIENsYW1wIHNwZWVkIG9uIDAgPD0geCA8PSA5NSBzbyB3ZSBkb24ndCBicmVhayB0aGUgbGF1bmNoLlxuICAgICAgc3BlZWQgPSBNYXRoLm1pbihNYXRoLm1heChzcGVlZCwgMCksIDk1KTtcblxuICAgICAgY29uc3QgcG9zaXRpb25Hb2FsID0gTWF0aC5mbG9vcigoKGN1cnJlbnRQb3NpdGlvbiAvIDk5KSAqIHJhbmdlKSArICgoOTkgLSByYW5nZSkgLyAyKSk7XG4gICAgICAvLyBXZSdsbCBzZXQgdGhpcy5fbGFzdFBvc2l0aW9uIGluIEZsZXNobGlnaHRMYXVuY2hGVzEyQ21kLCBzaW5jZVxuICAgICAgLy8gZXZlcnl0aGluZyBraW5kYSBmdW5uZWxzIHRvIHRoYXQuXG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5IYW5kbGVGbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZChuZXcgTWVzc2FnZXMuRmxlc2hsaWdodExhdW5jaEZXMTJDbWQoc3BlZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25Hb2FsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFNc2cuRGV2aWNlSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYU1zZy5JZCkpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gXCJldmVudHNcIjtcbmltcG9ydCB7IElEZXZpY2VTdWJ0eXBlTWFuYWdlciB9IGZyb20gXCIuLi9pbmRleFwiO1xuaW1wb3J0IHsgVGVzdERldmljZSB9IGZyb20gXCIuL1Rlc3REZXZpY2VcIjtcbmltcG9ydCB7IEJ1dHRwbHVnTG9nZ2VyIH0gZnJvbSBcIi4uL2luZGV4XCI7XG5cbmV4cG9ydCBjbGFzcyBUZXN0RGV2aWNlTWFuYWdlciBleHRlbmRzIEV2ZW50RW1pdHRlciBpbXBsZW1lbnRzIElEZXZpY2VTdWJ0eXBlTWFuYWdlciB7XG5cbiAgcHJpdmF0ZSBfaXNTY2FubmluZyA9IGZhbHNlO1xuICBwcml2YXRlIF90ZXN0VmlicmF0aW9uRGV2aWNlID0gbmV3IFRlc3REZXZpY2UoXCJUZXN0IFZpYnJhdGlvbiBEZXZpY2VcIiwgdHJ1ZSwgZmFsc2UsIGZhbHNlKTtcbiAgcHJpdmF0ZSBfdGVzdExpbmVhckRldmljZSA9IG5ldyBUZXN0RGV2aWNlKFwiVGVzdCBMaW5lYXIgRGV2aWNlXCIsIGZhbHNlLCB0cnVlLCBmYWxzZSk7XG4gIHByaXZhdGUgX3Rlc3RSb3RhdGlvbkRldmljZSA9IG5ldyBUZXN0RGV2aWNlKFwiVGVzdCBSb3RhdGlvbiBEZXZpY2VcIiwgZmFsc2UsIGZhbHNlLCB0cnVlKTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBDb25uZWN0VmlicmF0aW9uRGV2aWNlKCkge1xuICAgIEJ1dHRwbHVnTG9nZ2VyLkxvZ2dlci5EZWJ1ZyhcIlRlc3REZXZpY2VNYW5hZ2VyOiBDb25uZWN0aW5nIFZpYnJhdGlvbiBEZXZpY2VcIik7XG4gICAgdGhpcy5fdGVzdFZpYnJhdGlvbkRldmljZS5Db25uZWN0ZWQgPSB0cnVlO1xuICAgIHRoaXMuZW1pdChcImRldmljZWFkZGVkXCIsIHRoaXMuX3Rlc3RWaWJyYXRpb25EZXZpY2UpO1xuICB9XG5cbiAgcHVibGljIENvbm5lY3RMaW5lYXJEZXZpY2UoKSB7XG4gICAgQnV0dHBsdWdMb2dnZXIuTG9nZ2VyLkRlYnVnKFwiVGVzdERldmljZU1hbmFnZXI6IENvbm5lY3RpbmcgTGluZWFyIERldmljZVwiKTtcbiAgICB0aGlzLl90ZXN0TGluZWFyRGV2aWNlLkNvbm5lY3RlZCA9IHRydWU7XG4gICAgdGhpcy5lbWl0KFwiZGV2aWNlYWRkZWRcIiwgdGhpcy5fdGVzdExpbmVhckRldmljZSk7XG4gIH1cblxuICBwdWJsaWMgQ29ubmVjdFJvdGF0aW9uRGV2aWNlKCkge1xuICAgIEJ1dHRwbHVnTG9nZ2VyLkxvZ2dlci5EZWJ1ZyhcIlRlc3REZXZpY2VNYW5hZ2VyOiBDb25uZWN0aW5nIFJvdGF0aW9uIERldmljZVwiKTtcbiAgICB0aGlzLl90ZXN0Um90YXRpb25EZXZpY2UuQ29ubmVjdGVkID0gdHJ1ZTtcbiAgICB0aGlzLmVtaXQoXCJkZXZpY2VhZGRlZFwiLCB0aGlzLl90ZXN0Um90YXRpb25EZXZpY2UpO1xuICB9XG5cbiAgcHVibGljIFN0YXJ0U2Nhbm5pbmcoKTogdm9pZCB7XG4gICAgQnV0dHBsdWdMb2dnZXIuTG9nZ2VyLkRlYnVnKFwiVGVzdERldmljZU1hbmFnZXI6IFN0YXJ0aW5nIFNjYW5cIik7XG4gICAgdGhpcy5faXNTY2FubmluZyA9IHRydWU7XG4gICAgLy8gQWx3YXlzIGVtaXQgZGV2aWNlcy4gSWYgdGhleSdyZSBkdXBsaWNhdGVzLCB0aGUgZGV2aWNlIG1hbmFnZXIgd2lsbCB3ZWVkXG4gICAgLy8gdGhlbSBvdXQuXG4gICAgc2V0VGltZW91dCgoKSA9PiAge1xuICAgICAgdGhpcy5Db25uZWN0VmlicmF0aW9uRGV2aWNlKCk7XG4gICAgICB0aGlzLkNvbm5lY3RMaW5lYXJEZXZpY2UoKTtcbiAgICAgIHRoaXMuQ29ubmVjdFJvdGF0aW9uRGV2aWNlKCk7XG4gICAgfSwgNTApO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5TdG9wU2Nhbm5pbmcoKSwgMTAwKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgVmlicmF0aW9uRGV2aWNlKCkge1xuICAgIHJldHVybiB0aGlzLl90ZXN0VmlicmF0aW9uRGV2aWNlO1xuICB9XG5cbiAgcHVibGljIGdldCBMaW5lYXJEZXZpY2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Rlc3RMaW5lYXJEZXZpY2U7XG4gIH1cblxuICBwdWJsaWMgZ2V0IFJvdGF0aW9uRGV2aWNlKCkge1xuICAgIHJldHVybiB0aGlzLl90ZXN0Um90YXRpb25EZXZpY2U7XG4gIH1cblxuICBwdWJsaWMgU3RvcFNjYW5uaW5nKCk6IHZvaWQge1xuICAgIEJ1dHRwbHVnTG9nZ2VyLkxvZ2dlci5EZWJ1ZyhcIlRlc3REZXZpY2VNYW5hZ2VyOiBTdG9wcGluZyBTY2FuXCIpO1xuICAgIHRoaXMuX2lzU2Nhbm5pbmcgPSBmYWxzZTtcbiAgICB0aGlzLmVtaXQoXCJzY2FubmluZ2ZpbmlzaGVkXCIpO1xuICB9XG5cbiAgcHVibGljIGdldCBJc1NjYW5uaW5nKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc1NjYW5uaW5nO1xuICB9XG59XG4iLCJpbXBvcnQgeyBCdXR0cGx1Z0NsaWVudCwgQnV0dHBsdWdFbWJlZGRlZFNlcnZlckNvbm5lY3RvciwgQnV0dHBsdWdTZXJ2ZXIgfSBmcm9tIFwiLi4vaW5kZXhcIjtcbmltcG9ydCB7IFRlc3REZXZpY2VNYW5hZ2VyIH0gZnJvbSBcIi4vVGVzdERldmljZU1hbmFnZXJcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIENyZWF0ZURldlRvb2xzQ2xpZW50KCk6IFByb21pc2U8QnV0dHBsdWdDbGllbnQ+IHtcbiAgY29uc3QgY2xpZW50ID0gbmV3IEJ1dHRwbHVnQ2xpZW50KFwiVGVzdCBDbGllbnRcIik7XG4gIGNvbnN0IHNlcnZlciA9IG5ldyBCdXR0cGx1Z1NlcnZlcihcIlRlc3QgU2VydmVyXCIpO1xuICBzZXJ2ZXIuQ2xlYXJEZXZpY2VNYW5hZ2VycygpO1xuICBzZXJ2ZXIuQWRkRGV2aWNlTWFuYWdlcihuZXcgVGVzdERldmljZU1hbmFnZXIoKSk7XG4gIGNvbnN0IGxvY2FsQ29ubmVjdG9yID0gbmV3IEJ1dHRwbHVnRW1iZWRkZWRTZXJ2ZXJDb25uZWN0b3IoKTtcbiAgbG9jYWxDb25uZWN0b3IuU2VydmVyID0gc2VydmVyO1xuICBhd2FpdCBjbGllbnQuQ29ubmVjdChsb2NhbENvbm5lY3Rvcik7XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoY2xpZW50KTtcbn1cbiIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0xvZ1BhbmVsLmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9Mb2dQYW5lbC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0xvZ1BhbmVsLmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGlkPVxcXCJidXR0cGx1Z2RldnRvb2xzbG9ncGFuZWxcXFwiPlxcbiAgPHRleHRhcmVhIGlkPVxcXCJidXR0cGx1Z2RldnRvb2xzbG9ndGV4dGFyZWFcXFwiIHJlYWRvbmx5PjwvdGV4dGFyZWE+XFxuICA8ZGl2IGlkPVxcXCJidXR0cGx1Z2RldnRvb2xzbG9nbGV2ZWxcXFwiPlxcbiAgICA8bGFiZWw+UGFuZWwgTG9nIExldmVsOjwvbGFiZWw+XFxuICAgIDxzZWxlY3QgaWQ9XFxcImJ1dHRwbHVnZGV2dG9vbHNsb2dsZXZlbHBhbmVsc2VsZWN0XFxcIj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJPZmZcXFwiPk9mZjwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkZhdGFsXFxcIj5GYXRhbDwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkVycm9yXFxcIj5FcnJvcjwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIldhcm5cXFwiPldhcm48L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJJbmZvXFxcIj5JbmZvPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiRGVidWdcXFwiIHNlbGVjdGVkPkRlYnVnPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiVHJhY2VcXFwiPlRyYWNlPC9vcHRpb24+XFxuICAgIDwvc2VsZWN0PlxcbiAgICA8bGFiZWw+Q29uc29sZSBMb2cgTGV2ZWw6PC9sYWJlbD5cXG4gICAgPHNlbGVjdCBpZD1cXFwiYnV0dHBsdWdkZXZ0b29sc2xvZ2xldmVsY29uc29sZXNlbGVjdFxcXCI+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiT2ZmXFxcIiBzZWxlY3RlZD5PZmY8L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJGYXRhbFxcXCI+RmF0YWw8L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJFcnJvclxcXCI+RXJyb3I8L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJXYXJuXFxcIj5XYXJuPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiSW5mb1xcXCI+SW5mbzwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkRlYnVnXFxcIj5EZWJ1Zzwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIlRyYWNlXFxcIj5UcmFjZTwvb3B0aW9uPlxcbiAgICA8L3NlbGVjdD5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcblwiOyIsImltcG9ydCB7IEJ1dHRwbHVnTG9nZ2VyLCBMb2dNZXNzYWdlLCBCdXR0cGx1Z0xvZ0xldmVsIH0gZnJvbSBcIi4uLy4uL2luZGV4XCI7XG5jb25zdCBqc1BhbmVsID0gcmVxdWlyZShcImpzcGFuZWw0XCIpO1xucmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9kaXN0L2pzcGFuZWwuY3NzXCIpO1xuY29uc3QgbG9nUGFuZWxIVE1MID0gcmVxdWlyZShcIi4vTG9nUGFuZWwuaHRtbFwiKS50b1N0cmluZygpO1xucmVxdWlyZShcIi4vTG9nUGFuZWwuY3NzXCIpO1xuXG5leHBvcnQgY2xhc3MgTG9nUGFuZWwge1xuXG4gIHB1YmxpYyBzdGF0aWMgU2hvd0xvZ1BhbmVsKCkge1xuICAgIGpzUGFuZWwuanNQYW5lbC5jcmVhdGUoe1xuICAgICAgaWQ6ICgpID0+IFwiYnV0dHBsdWctbG9nZ2VyLXBhbmVsXCIsXG4gICAgICB0aGVtZTogICAgICAgXCJwcmltYXJ5XCIsXG4gICAgICBoZWFkZXJUaXRsZTogXCJCdXR0cGx1ZyBMb2dcIixcbiAgICAgIHBvc2l0aW9uOiAgICBcImNlbnRlci10b3AgMCA4MFwiLFxuICAgICAgY29udGVudFNpemU6IFwiNjUwIDI1MFwiLFxuICAgICAgY2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5pbm5lckhUTUwgPSBsb2dQYW5lbEhUTUw7XG4gICAgICAgIExvZ1BhbmVsLl9wYW5lbCA9IG5ldyBMb2dQYW5lbCgpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIF9wYW5lbDogTG9nUGFuZWwgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBsb2dUZXh0QXJlYTogSFRNTFRleHRBcmVhRWxlbWVudDtcbiAgcHJpdmF0ZSBwYW5lbExldmVsU2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudDtcbiAgcHJpdmF0ZSBjb25zb2xlTGV2ZWxTZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubG9nVGV4dEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1dHRwbHVnZGV2dG9vbHNsb2d0ZXh0YXJlYVwiKSEgYXMgSFRNTFRleHRBcmVhRWxlbWVudDtcbiAgICB0aGlzLnBhbmVsTGV2ZWxTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1dHRwbHVnZGV2dG9vbHNsb2dsZXZlbHBhbmVsc2VsZWN0XCIpISBhcyBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICB0aGlzLmNvbnNvbGVMZXZlbFNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV0dHBsdWdkZXZ0b29sc2xvZ2xldmVsY29uc29sZXNlbGVjdFwiKSEgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgY29uc3QgbG9nID0gQnV0dHBsdWdMb2dnZXIuTG9nZ2VyO1xuICAgIGxvZy5hZGRMaXN0ZW5lcihcImxvZ1wiLCAobXNnKSA9PiB7XG4gICAgICB0aGlzLmFkZExvZ01lc3NhZ2UobXNnKTtcbiAgICB9KTtcbiAgICB0aGlzLnBhbmVsTGV2ZWxTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICBsb2cuTWF4aW11bUV2ZW50TG9nTGV2ZWwgPSBCdXR0cGx1Z0xvZ0xldmVsW3RoaXMucGFuZWxMZXZlbFNlbGVjdC52YWx1ZV07XG4gICAgfSk7XG4gICAgdGhpcy5jb25zb2xlTGV2ZWxTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICBsb2cuTWF4aW11bUNvbnNvbGVMb2dMZXZlbCA9IEJ1dHRwbHVnTG9nTGV2ZWxbdGhpcy5jb25zb2xlTGV2ZWxTZWxlY3QudmFsdWVdO1xuICAgIH0pO1xuICAgIGxvZy5NYXhpbXVtRXZlbnRMb2dMZXZlbCA9IEJ1dHRwbHVnTG9nTGV2ZWwuRGVidWc7XG4gICAgbG9nLkRlYnVnKFwiTG9nUGFuZWw6IERldlRvb2xzIExvZyBwYW5lbCBlbmFibGVkLlwiKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkTG9nTWVzc2FnZShtc2c6IExvZ01lc3NhZ2UpIHtcbiAgICB0aGlzLmxvZ1RleHRBcmVhLnZhbHVlID0gdGhpcy5sb2dUZXh0QXJlYS52YWx1ZSArIFwiXFxuXCIgKyBtc2cuRm9ybWF0dGVkTWVzc2FnZTtcbiAgfVxuXG59XG4iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vVGVzdERldmljZU1hbmFnZXJQYW5lbC5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPG1haW4+XFxuICA8aW5wdXQgaWQ9XFxcInRhYjFcXFwiIHR5cGU9XFxcInJhZGlvXFxcIiBuYW1lPVxcXCJ0YWJzXFxcIiBjaGVja2VkPlxcbiAgPGxhYmVsIGZvcj1cXFwidGFiMVxcXCI+VGVzdCBEZXZpY2VzPC9sYWJlbD5cXG4gIDxzZWN0aW9uIGlkPVxcXCJjb250ZW50MVxcXCI+XFxuICAgIDxkaXYgaWQ9XFxcInNpbXVsYXRvclxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwidmlicmF0b3Itc2ltdWxhdG9yLWNvbXBvbmVudFxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ2aWJyYXRvclxcXCI+XFxuICAgICAgICAgIDxpbWcgc3JjPVxcXCJcIiArIHJlcXVpcmUoXCIuL2h1c2gucG5nXCIpICsgXCJcXFwiXFxuICAgICAgICAgICAgICAgaWQ9XFxcInZpYnJhdG9yLWltYWdlXFxcIj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBpZD1cXFwidmlicmF0b3ItaW5mb1xcXCI+XFxuICAgICAgICAgIDxiPlZpYnJhdGlvbiBTcGVlZDo8L2I+IDxzcGFuIGlkPVxcXCJ2aWJyYXRpb25zcGVlZFxcXCI+MDwvc3Bhbj48YnIvPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJ2aWJyYXRlZGlzY29ubmVjdFxcXCI+RGlzY29ubmVjdDwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwic2ltdWxhdG9yLWRpdmlkZXJcXFwiPjwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImZsZXNobGlnaHQtc2ltXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImMtZmxlc2hsaWdodFxcXCI+XFxuICAgICAgICAgIDxkaXY+XFxuICAgICAgICAgICAgPGltZyBzcmM9XFxcIlwiICsgcmVxdWlyZShcIi4vcnVsZXIucG5nXCIpICsgXCJcXFwiPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPGRpdj5cXG4gICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCIgKyByZXF1aXJlKFwiLi9mbGVzaGxpZ2h0LnBuZ1wiKSArIFwiXFxcIlxcbiAgICAgICAgICAgICAgICAgY2xhc3M9XFxcIm8tZmxlc2hsaWdodFxcXCJcXG4gICAgICAgICAgICAgICAgIGlkPVxcXCJmbGVzaGxpZ2h0LWltYWdlXFxcIj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXY+XFxuICAgICAgICAgIDxiPlNwZWVkOjwvYj4gPHNwYW4gaWQ9XFxcImxpbmVhcnNwZWVkXFxcIj4wPC9zcGFuPjxici8+XFxuICAgICAgICAgIDxiPlBvc2l0aW9uOjwvYj4gPHNwYW4gaWQ9XFxcImxpbmVhcnBvc2l0aW9uXFxcIj4wPC9zcGFuPjxici8+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImxpbmVhcmRpc2Nvbm5lY3RcXFwiPkRpc2Nvbm5lY3Q8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvc2VjdGlvbj5cXG48L21haW4+XFxuXCI7IiwiaW1wb3J0IHsgQnV0dHBsdWdTZXJ2ZXIsIEJ1dHRwbHVnTG9nZ2VyIH0gZnJvbSBcIi4uLy4uL2luZGV4XCI7XG5pbXBvcnQgeyBUZXN0RGV2aWNlTWFuYWdlciB9IGZyb20gXCIuLi9UZXN0RGV2aWNlTWFuYWdlclwiO1xuaW1wb3J0ICogYXMgVFdFRU4gZnJvbSBcIkB0d2VlbmpzL3R3ZWVuLmpzXCI7XG5cbmNvbnN0IGpzUGFuZWwgPSByZXF1aXJlKFwianNwYW5lbDRcIik7XG5yZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvanNwYW5lbC5jc3NcIik7XG5jb25zdCB0ZXN0UGFuZWxIVE1MID0gcmVxdWlyZShcIi4vVGVzdERldmljZU1hbmFnZXJQYW5lbC5odG1sXCIpLnRvU3RyaW5nKCk7XG5yZXF1aXJlKFwiLi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmNzc1wiKTtcblxuZXhwb3J0IGNsYXNzIFRlc3REZXZpY2VNYW5hZ2VyUGFuZWwge1xuICBwdWJsaWMgc3RhdGljIFNob3dUZXN0RGV2aWNlTWFuYWdlclBhbmVsKGJ1dHRwbHVnU2VydmVyOiBCdXR0cGx1Z1NlcnZlcikge1xuICAgIGxldCB0ZG06IFRlc3REZXZpY2VNYW5hZ2VyIHwgbnVsbCA9IG51bGw7XG4gICAgZm9yIChjb25zdCBtZ3Igb2YgYnV0dHBsdWdTZXJ2ZXIuRGV2aWNlTWFuYWdlcnMpIHtcbiAgICAgIGlmIChtZ3IuY29uc3RydWN0b3IubmFtZSA9PT0gXCJUZXN0RGV2aWNlTWFuYWdlclwiKSB7XG4gICAgICAgIHRkbSA9IChtZ3IgYXMgVGVzdERldmljZU1hbmFnZXIpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRkbSA9PT0gbnVsbCkge1xuICAgICAgQnV0dHBsdWdMb2dnZXIuTG9nZ2VyLkVycm9yKFwiVGVzdERldmljZU1hbmFnZXJQYW5lbDogQ2Fubm90IGdldCB0ZXN0IGRldmljZSBtYW5hZ2VyIGZyb20gc2VydmVyLlwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBnZXQgdGVzdCBkZXZpY2UgbWFuYWdlciBmcm9tIHNlcnZlci5cIik7XG4gICAgfVxuICAgIGpzUGFuZWwuanNQYW5lbC5jcmVhdGUoe1xuICAgICAgaWQ6ICgpID0+IFwiYnV0dHBsdWctdGVzdC1kZXZpY2UtbWFuYWdlci1wYW5lbFwiLFxuICAgICAgdGhlbWU6ICAgICAgIFwicHJpbWFyeVwiLFxuICAgICAgaGVhZGVyVGl0bGU6IFwiVGVzdCBEZXZpY2UgTWFuYWdlclwiLFxuICAgICAgcG9zaXRpb246ICAgIFwiY2VudGVyLXRvcCAwIDgwXCIsXG4gICAgICBjb250ZW50U2l6ZTogXCI0MDAgMjUwXCIsXG4gICAgICBjYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LmlubmVySFRNTCA9IHRlc3RQYW5lbEhUTUw7XG4gICAgICAgIFRlc3REZXZpY2VNYW5hZ2VyUGFuZWwuX3BhbmVsID0gbmV3IFRlc3REZXZpY2VNYW5hZ2VyUGFuZWwodGRtISk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIHN0YXRpYyBfcGFuZWw6IFRlc3REZXZpY2VNYW5hZ2VyUGFuZWw7XG4gIHByaXZhdGUgX3Rlc3RNYW5hZ2VyOiBUZXN0RGV2aWNlTWFuYWdlcjtcbiAgcHJpdmF0ZSBmbGVzaGxpZ2h0RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgdmlicmF0b3JFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBjdXJyZW50TGF1bmNoUG9zaXRpb246IGFueSA9IHsgeDogMCwgeTogMCB9O1xuICBwcml2YXRlIGxhc3RQb3NpdGlvbjogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBtb3ZlUmFkaXVzOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIGN1cnJlbnRWaWJyYXRlUG9zaXRpb246IGFueSA9IHsgeDogMCwgeTogMCB9O1xuXG4gIGNvbnN0cnVjdG9yKHRkbTogVGVzdERldmljZU1hbmFnZXIpIHtcbiAgICB0aGlzLl90ZXN0TWFuYWdlciA9IHRkbTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpYnJhdGVkaXNjb25uZWN0XCIpIS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5fdGVzdE1hbmFnZXIhLlZpYnJhdGlvbkRldmljZS5EaXNjb25uZWN0KCk7XG4gICAgfSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaW5lYXJkaXNjb25uZWN0XCIpIS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5fdGVzdE1hbmFnZXIhLkxpbmVhckRldmljZS5EaXNjb25uZWN0KCk7XG4gICAgfSk7XG4gICAgdGhpcy5fdGVzdE1hbmFnZXIuVmlicmF0aW9uRGV2aWNlLmFkZExpc3RlbmVyKFwidmlicmF0ZVwiLCAoc3BlZWQpID0+IHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlicmF0aW9uc3BlZWRcIikhLmlubmVySFRNTCA9IHNwZWVkO1xuICAgICAgdGhpcy52aWJyYXRlTW92ZShzcGVlZCk7XG4gICAgfSk7XG4gICAgdGhpcy5fdGVzdE1hbmFnZXIuTGluZWFyRGV2aWNlLmFkZExpc3RlbmVyKFwibGluZWFyXCIsIChsaW5lYXJvYmo6IGFueSkgPT4ge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaW5lYXJwb3NpdGlvblwiKSEuaW5uZXJIVE1MID0gbGluZWFyb2JqLnBvc2l0aW9uO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaW5lYXJzcGVlZFwiKSEuaW5uZXJIVE1MID0gbGluZWFyb2JqLnNwZWVkO1xuICAgICAgdGhpcy5sYXVuY2hNb3ZlKGxpbmVhcm9iai5wb3NpdGlvbiwgbGluZWFyb2JqLnNwZWVkKTtcbiAgICB9KTtcbiAgICB0aGlzLmZsZXNobGlnaHRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmbGVzaGxpZ2h0LWltYWdlXCIpITtcbiAgICB0aGlzLnZpYnJhdG9yRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlicmF0b3ItaW1hZ2VcIikhO1xuICB9XG5cbiAgcHJpdmF0ZSBsYXVuY2hNb3ZlID0gKHBvc2l0aW9uLCBzcGVlZCkgPT4ge1xuICAgIGNvbnN0IHAgPSAtKCgxMDAgLSBwb3NpdGlvbikgKiAwLjIyKTtcbiAgICBjb25zdCBkdXJhdGlvbiA9IHRoaXMubW92ZUR1cmF0aW9uKHBvc2l0aW9uLCBzcGVlZCk7XG4gICAgbmV3IFRXRUVOLlR3ZWVuKHRoaXMuY3VycmVudExhdW5jaFBvc2l0aW9uKVxuICAgICAgLnRvKHt4OiAwLCB5OiBwfSwgZHVyYXRpb24pXG4gICAgICAuc3RhcnQoKTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sYXVuY2hBbmltYXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgbGF1bmNoQW5pbWF0ZSA9ICh0aW1lc3RhbXA6IG51bWJlcikgPT4ge1xuICAgIGlmICghVFdFRU4udXBkYXRlKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5mbGVzaGxpZ2h0RWxlbWVudC5zdHlsZS5ib3R0b20gPSBgJHt0aGlzLmN1cnJlbnRMYXVuY2hQb3NpdGlvbi55fSVgO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxhdW5jaEFuaW1hdGUpO1xuICB9XG5cbiAgLy8gbW92ZUR1cmF0aW9uIHJldHVybnMgdGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGl0IHdpbGwgdGFrZSB0byBtb3ZlXG4gIC8vIHRvIHBvc2l0aW9uIGF0IHNwZWVkLlxuICAvL1xuICAvLyBwb3NpdGlvbjogcG9zaXRpb24gaW4gcGVyY2VudCAoMC0xMDApLlxuICAvLyBzcGVlZDogICAgc3BlZWQgaW4gcGVyY2VudCAoMjAtMTAwKS5cbiAgcHJpdmF0ZSBtb3ZlRHVyYXRpb24gPSAocG9zaXRpb246IG51bWJlciwgc3BlZWQ6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5hYnMocG9zaXRpb24gLSB0aGlzLmxhc3RQb3NpdGlvbik7XG4gICAgdGhpcy5sYXN0UG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICByZXR1cm4gdGhpcy5jYWxjRHVyYXRpb24oZGlzdGFuY2UsIHNwZWVkKTtcbiAgfVxuXG4gIC8vIF9jYWxjRHVyYXRpb24gcmV0dXJucyBkdXJhdGlvbiBvZiBhIG1vdmUgaW4gbWlsbGlzZWNvbmRzIGZvciBhIGdpdmVuXG4gIC8vIGRpc3RhbmNlL3NwZWVkLlxuICAvL1xuICAvLyBkaXN0YW5jZTogYW1vdW50IHRvIG1vdmUgcGVyY2VudCAoMC0xMDApLlxuICAvLyBzcGVlZDogc3BlZWQgdG8gbW92ZSBhdCBpbiBwZXJjZW50ICgyMC0xMDApLlxuICBwcml2YXRlIGNhbGNEdXJhdGlvbiA9IChkaXN0YW5jZTogbnVtYmVyLCBzcGVlZDogbnVtYmVyKSA9PiB7XG4gICAgcmV0dXJuIE1hdGgucG93KHNwZWVkIC8gMjUwMDAsIC0wLjk1KSAvICg5MCAvIGRpc3RhbmNlKTtcbiAgfVxuXG4gIHByaXZhdGUgdmlicmF0ZU1vdmUgPSAoc3BlZWQpID0+IHtcbiAgICB0aGlzLm1vdmVSYWRpdXMgPSBzcGVlZDtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy52aWJyYXRlQW5pbWF0ZSk7XG4gIH1cblxuICBwcml2YXRlIHZpYnJhdGVBbmltYXRlID0gKHRpbWVzdGFtcDogbnVtYmVyKSA9PiB7XG4gICAgaWYgKCFUV0VFTi51cGRhdGUoKSkge1xuICAgICAgaWYgKHRoaXMubW92ZVJhZGl1cyAhPT0gMCkge1xuICAgICAgICBuZXcgVFdFRU4uVHdlZW4odGhpcy5jdXJyZW50VmlicmF0ZVBvc2l0aW9uKVxuICAgICAgICAgIC50byh7eDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5tb3ZlUmFkaXVzICogMjApLFxuICAgICAgICAgICAgICAgeTogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5tb3ZlUmFkaXVzICogMjApfVxuICAgICAgICAgICAgICAsIDM0KVxuICAgICAgICAgIC5zdGFydCgpO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy52aWJyYXRlQW5pbWF0ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudmlicmF0b3JFbGVtZW50LnN0eWxlLnRvcCA9IGAke3RoaXMuY3VycmVudFZpYnJhdGVQb3NpdGlvbi54fXB4YDtcbiAgICB0aGlzLnZpYnJhdG9yRWxlbWVudC5zdHlsZS5yaWdodCA9IGAke3RoaXMuY3VycmVudFZpYnJhdGVQb3NpdGlvbi55fXB4YDtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy52aWJyYXRlQW5pbWF0ZSk7XG4gIH1cbn1cblxuLy8gU29tZSBjb2RlIGluIHRoaXMgZmlsZSB0YWtlbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9mdW5qYWNrL2xhdW5jaGNvbnRyb2xcbi8vIE1JVCBMaWNlbnNlOlxuLypcbkxhdWNoY29udHJvbCBVSSBGbGVzaGxpZ2h0XG5cbmh0dHBzOi8vZ2l0aHViLmNvbS9mdW5qYWNrL2xhdW5jaGNvbnRyb2xcblxuQ29weXJpZ2h0IDIwMTcgRnVuamFja1xuXG5SZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbm1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuXG4xLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbmxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuXG4yLiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG50aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uXG5hbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cblxuMy4gTmVpdGhlciB0aGUgbmFtZSBvZiB0aGUgY29weXJpZ2h0IGhvbGRlciBub3IgdGhlIG5hbWVzIG9mIGl0cyBjb250cmlidXRvcnNcbm1heSBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0cyBkZXJpdmVkIGZyb20gdGhpcyBzb2Z0d2FyZSB3aXRob3V0XG5zcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXG5cblRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORFxuQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbldBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkVcbkRJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEVcbkZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMXG5EQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUlxuU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVJcbkNBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksXG5PUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRVxuT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiovXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFEUUFBQUJuQ0FZQUFBQlBZbUd5QUFBQUJtSkxSMFFBL3dEL0FQK2d2YWVUQUFBQUNYQklXWE1BQUFzVEFBQUxFd0VBbXB3WUFBQUFCM1JKVFVVSDRRUWVDeWNUQnFUNHNRQUFBQmwwUlZoMFEyOXRiV1Z1ZEFCRGNtVmhkR1ZrSUhkcGRHZ2dSMGxOVUZlQkRoY0FBQU5KU1VSQlZIamE3WnkvYjV0QUZNZmZJZFNoYVRkTGpwMnRrdG02OEE5MDc1b0Jwa3FaK3dmMGIrZ2YwTmxTSmp4NHpaN1Z3MGxXTnlOMVMxeExXVkRWSmJKNUhleExBUFBqT0xnRHUrODdoUmpmdlEvdkYzZVFNR2dtQkQxaXhyOG9ZSHpmQndDQTFXcVYrbkN6L2wzNjVjdnhLSFU4bVV3QUFDQUlna2EyMmFvd0FxUnRpWEdESUVBVktBdk9UQVRVcklMZ2VRR3huSlJBeE5NRVFrUWpIcktOZVlmcDk0NVJJRm5JcmpveUdrczdVeDdLTnRheU93VkVQUExHY0hTWk9uWWNKM1djdUdPZ1BuU1N1ZEk2a0dwSTZCNWJCUWg5M3dmZjkydFBYT1FweTdKU01HSjhsZUtqdFd3L3JCOXpmMzgxR3FlTzR6anVSOWxPVnJwc2xlT2NIeG1lQkhWZHQ3REtOVmtUS2VkUTJYcW9ERVo0aUhNT3U5MnU5dGpHcXh6bi9PanE1OGwxWFZndWwyRGJOdGgyZTVGdmRRR1RoRm9zRnJUQUl5QnFyQzNETkdtc1p4ZHlLdldTSGZiTVFNZmVYTWJ6L1dpc2JVQlJsU01nNmtQVWg2Z1BVUitpUGtSbG00Q29EMUVmb2o1RWZZaXFIQUVSRURWV2FxelVXS214bm5aanpUNWZyYXZ0ZHR0NGpNWkZJVSt1NndMblhIcWdzaWQrVkJRVWt3NDl6MHU5UUpFWEtzSkxaWS8xaFVlemNod245UjdkYkRhclphZWxJM2RrbjRMcnlFZHRiNUpjamNiU2I1SjAzWWVrcjZTcTRXRVl2cnhwcjdNb29PZDU1cEw3a0tlSE9WRnJEbFY1cCtydkhtVE9VYzJsLzNiNVlEVGNzaEpoRi96ODl1R3NQT1IvL1A3TE9KQk0vcWljU3psRVFBUkVRTjBEcVZTdHRpc2RlWWlBQ01nd1VCaUdyU2QzMFhlTDVpSVBFZEFKQVdIWGk3dnNJcTlxZjZGczF3ZkZyczFoc3crNkFoUHpDM3NlMW8rRi81cUF5UUFKRmUyekpTZFRWWjJ4RCtmV0JoSXVsaksyekNBWjFaeWowRzRwRDRtQmRPNTR5b0JrN0dGMWMram82dlVsNU1wRUlkZjNrS3Zsb2E1RFRzWkRWVG5FY0RwSGRuTmRhYlRPa0l1aUNPSTRCcHpPZ2QxY005WEd1citUR0E0QTcrNEJOazhnd0lUZXZiMW96VU5SRkJWKzl1Zkg3ZjZINFVEYzNjU3FRSzlmSEE0QXAvUENFOTkvL2RJSTZNWG9QTzFCam0xU0FMb29HUmhnOHlSbmtJcXljNzNxRFFBOHF3TDlyVDFwQXJLaDRVVjZidUtoTnErc0VVazlMc2U3ZTRRZWlIMytWR2t2clZqN0x1azNOTG9PTzVsd3F3WFVGWmdzaURLUVNhaTZNTXBBdXNGVVFGb0JhaHVzQ1lqUVB4amlyeUNvcExXYkFBQUFBRWxGVGtTdVFtQ0NcIiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQURJQUFBQkJDQUlBQUFBYzYyQ0pBQUFBQkdkQlRVRUFBTEdQQy94aEJRQUFBQ0JqU0ZKTkFBQjZKZ0FBZ0lRQUFQb0FBQUNBNkFBQWRUQUFBT3BnQUFBNm1BQUFGM0NjdWxFOEFBQUFCbUpMUjBRQS93RC9BUCtndmFlVEFBQUFDWEJJV1hNQUFBc1NBQUFMRWdIUzNYNzhBQUFBQjNSSlRVVUg0UW9PRlNvRFZ5enhIQUFBQ1ZsSlJFRlVhTjdkV2wxc0UxY1dQbmYreHg2UC84WTJLVW5NTGswVUZycFNVV2tMS3RKV1ZaOFd5VEpzSkVRUWtXaEJMUkk4VlNvUEM2anFRNkpLZldDbFZtb1RpVUoydTFXa2h2U2xMV3JMQXhEQzhxT3RoTlFHVkVvU1oybXhqWDlpTzlNWno3MTNIeTRZTnduRlA1aVY5anhZTTNmbW52bnVPZWVldjJ0RUtZWG1pQkFDQU1QRHd3Q3dlL2R1bnVjUlFrM3lCTm9jRVVJd3hzZVBIdytIdzlGb2RHUmtCR05NQ0dtU2JiT3dITWM1ZE9pUVlSaFBQdm5rK3ZYcnU3dTdqeHc1Z2pGdWtpMXFVb21FRUplcUdvWmhoRUk4endQQXRXdlg1dWZuT1k1cmhtMVRreW1sKy9idE00d1FVR0NZQUtDN3UzdmZ2bjFOcnJZcFdOZXZYZnZtcTY4cElacW1WUVlSUXVmUG4vLysrKytiUWRZNExJenhxVk9uOHZrOFFtaVJ5bXpiUG4zNk5Oc1FqeHRXSXBFNGZ1S0VKRW1DSUNpS1V2M0k3WFovL1BISE16TXpEUXVzRVZpVVVveng0TURBZnhKekFBQUlFTCtZVHphYkhSd2NiSGpORFVwcmFtcnFxNisrWnJyeitueExYMUFVWlhKeWNtcHE2ckhDS3BWSzJXeUd3Uko0WVJtK0hGY29GQllXRmhyajM2RGYycmh4WTJKbUZnQjBuMWRWMVdvMEFJQXhadkhIN1hhZk9YUG1jVW1MQWdJRUFFc1hwT3Y2aWhVcm1vK0pqY0FhR2g2NjhjTVB5ejRLaDhPYXBybGNMbmFiVHFjLytPQ0RCaFJTTnl3V2h0bTF3UE9pS0ZZZVZZVGs4WGlxcHpRQXEyN2J1bno1OG90L2V0R3I2d0FnaW1MQUNGYUx5dWZ6QVlCcG1yZHUzY0lZQTBBaWtmajg4OCtmZWVhWjFrb0xvWWV2UkZYVlNDU3lWSW90aERVeE1TRkwwdEp4U1pKa1dhN2NDc0pkcitGMnV5Y25KMXNPNjVOL2Z1S3E4Z2pWRXFyMkZMSXNCd0lCQUFnRUFxT2pveTJIVlNNaGhLcDNRMnRocFZJcHk3SnFmTGxpZ283anBGS3BGc0lhR3h1YlN5UnEzTG91bDRzSkxKdk5uang1c2xXd0tLV0w5dFJ2WjhhU0pGVlMxbnFwUGxpZmZ2cHBOUlROb3oxMENnRElzdnpaWjUrMUNoYkhjZWZPbmZ1VkFHcFRKOC96bHk1ZGFoV3N4MG4vbDdDYUwrcGJBU3VmejFkZnN5cm9mdzlyRVlSTUpsTmRnUldMUmR1MkcrTXNORFp0V1NxWHkzTnpjN3F1cyt0TUp0TXdxMGNHaTFMSzg3eHBtcVpwTnMrdERpVVNRbDU0NFFXVzNGVkdITWRoMXdpaEI5WFFHT01OR3phMENoWkNhTnUyYmRYZnhoai9Vb05zTE11S3hXSXRoTFUwTHkwV2luVjk3OUhEQW9DdFc3ZTJkM1pVdXl1RVVENlhod2VIYlVxcDMrK1B4V0oxRlEzMXdRcUZRdjM5L2FiNXExb1pZd2NvUE1pd2NybmM5dTNiRGNOb29iUUE0S1dYWGdwSEloVkxCd0Ric25QWjdNTENRdlVnSTBLSXJ1c3Z2L3h5dlgzZXVnc3lTdW5VMU5TV1AyOUpKbSt6REFJaDVORTlnaWhxbXJhb295UUl3a2NmZmRUVDAxT3Y5Ni9iYnlHRWVucDY0bHZqL3hqNWV5WEowWFZkZGQrdHBITzVIQk1iUW1qNzl1MXIxcXlwOXhPTlNJc0pMSlZLN2R5NTgrclZxenppTU1HV2JWZlVKTXN5eDNIbGNybXJxMnQwZExTNllLeWRHb3lKaG1IczJyVUxBUEw1dkdtYUFYK2dzN096bzZOanc0WU5yRnJrZVg3UG5qM2hjTGd4L2swMXdEZHQzSmlZVFZCS2k4V2lRekJDcUwyOVhaSWsyN1lOd3poNzltekRuQnVQaVlTUTU1NS8vdHQvZjh2enZNdmxXdDNaQVFDQ0lOeTVjd2RqdkduVHBxVWxTZTNVVkdMVDE5Y25TcUxMNWFJQXM3T3ppVVRDNy9kcm1tWlpWbTl2YnpPY0c1Y1d4M0VJSWN1MkNTRkFZZFh2ZnlmTGNpYVRLWlZLNVhJWkd1cUlQQUpZakNSSlVtVUZBY3pOelltaXVINzlldHUyaThWbUEyV3pzQWdoWmFjTUZJSkcwT3YxM3JoeG8xZ3Nsa3FsWm1HeC9PbktsU3NjeHhtRzBkSFJ3YlJUNDN5TzR3UkJCRXF6MmV6OC9QemF0V3ZUNlhUekdiMEFBSU9EZzBORFEyeDdqNHlNUktQUldtWXl6MEl3THBmTExsWHRlS0lOQU9ibjUwVlJaSzBIOWtKakVMbmg0ZUdqUjQ4R2c4RkFJTEN3c0xCang0NTBPbDNMVEVMSTlQUzBJaXR1bDh2cjlRS0FLSXFLb2lpS0lvcmk5ZXZYYjk2ODJmamhTbVUxd1dCUTEvVmNMamMyTnZiYlIwanNqSWxTK3U2NzcxWmljeVFTV2JseVpXZG5aelFhYlc5dmYvdnR0L2Z2M3o4ek13UDNEbVBxZ3dVQVFNRTBUZGJPNDNuKzh1WExEMjFIalkyTnhXS3g2WnZUbFJGZDE2Vjd6Y3UydHJaUUtDU0tZandlNytycTJyeDU4L0R3OE4zVDN0cm83azZjeitWejJad1JNdHh1OS9qNCtHdXZ2YlkweERJSnZmUE9Pek16TXhNVEUwQ29MRW5NUlFGQW9WQmdwUmdqbDh1VlRDWURnVUEwR3VWNS90aXhZK2wwK3VEQmd6VzJsdmczM25qanl5Kyt3QTZXWkVuVE5OTTB5K1V5QzdwTXYyeVZVMU5UNCtQalc3WnMrZkhISDIvZnZzM3pmS20wd0RxRGlFTnV0OXMwVFhhQ1Z5d1dUZFBNWnJPMmJkdTJYU2dVRUVMaGNEaVJTRXhPVG5vOG5scTJGTUlZUC9mc3N6L2Qra2xXNUtCaCtIeStUQ1pqV2RaYmI3MFZqOGRaV1RFd01EQTZPbXBaRmp1ZXNINnhGb3BGQjJOQ2lLWnBzcXF3dnJJb2loekgyYmE5VkZtQ0lLeGV2YnBRS0JTTHhRTUhEc1RqOFlmQWNoeG5jR0R3YjBlUGlxS29xbXJQSDlha1VpbFdFek5ualJEeSsvMDg0a3FsVXNWeU9ZNlRGTm5qOFR6MHFMdzZZT3U2SG9sRUVvbEVmMzkvTEJZTGhVSVBtbzRJSVlTUVB6NzFWQzZYVXhUMWlaVlBoTVBoVkNwVktwVnl1UngyTUNBQUNzNDlHMkphODNsOWtuSzNDNjhvaXNmalVaZnJpak82YytlTzR6Z0lvWEs1N1BWNm1ha1FRb2FHaGpvN081ZDFiSWlaem9jZmZuajRyNGRFVWRSMFQxdGJtOC9ueStmenRtM1B6U2FXRmc2cVM5Vzkzb3BwdDdlMzEyTEZMQzM3K2VlZkthV1JTRVRUTkVMSWUrKzl0Mno2ZWpjTlRLVlNlL2ZzdlhEaGdzRHptcVpwbW9ZUWNyQ1RTcVlXR1lvb2lUNi8zK1B4R0liQkZGVDVYVjRkOS9ZTjgzQXNSbG1XSlVsU0tCUUtCb09IRHgrT1JxT0x0SG1mWFRLWmZQUE5OMDk5OGVWdm1Jc2tTYjZBbjFrSmh4QkN5RFROWkNxRllJa2lFQUNsOTNwTlZGSFZVQ2dFQUVCQjkrcjVmSjZGcVhBNDdEak8rKysvSDQxR3E3VjVIeFloSkpsTXZ2NzY2Lys2Y0lGRHl5Q2psS3FxcXZ1OHpHdHpnTmk2SGV3czdlMEtnbEQ5R1o3bjJXcEZVZlI0OVVxNGRMdmRQcDh2R0F3T0RnNkd3K0hLbFB1dzJFVTZuZTdyNjd0NDhhTG1jaS9LZXRtdHBNaVdaUlVLQllJSklXVGJYN1p0M3J5NVdsYUUwck5uem95ZFBMbG9iUWdobDBzVlJaSDlzVWRWRlVWUkZWVVJSVkhUdE43ZTNyMTc5eTRENno1ZlFyNzc3cnRYZHI4eU16Mjk2RkYwMVNwQ0NRQWNPM1pzM2JwMUxEZ3VTb1JZTUZqcXpRa2hBd01ENCtQakNHQjJaaFlBS0ZDdnp5Y0l3dE5QUDMzaXhJbHFQZzgwVll3eCswdFdOYjM2NnFzTkgweFU0Mk1oc2pJU2o4Y1hsVzcvQmVkUWI2RE9sYjZIQUFBQUdYUkZXSFJqYjIxdFpXNTBBRU55WldGMFpXUWdkMmwwYUNCSFNVMVE1NjlBeXdBQUFDVjBSVmgwWkdGMFpUcGpjbVZoZEdVQU1qQXhOeTB4TUMweE5GUXlNVG8wTWpvd015MHdOem93TU52aW9xTUFBQUFsZEVWWWRHUmhkR1U2Ylc5a2FXWjVBREl3TVRjdE1UQXRNVFJVTWpFNk5ESTZNRE10TURjNk1EQ3F2eG9mQUFBQUFFbEZUa1N1UW1DQ1wiIiwiZXhwb3J0ICogZnJvbSBcIi4uL1Rlc3REZXZpY2VcIjtcbmV4cG9ydCAqIGZyb20gXCIuLi9UZXN0RGV2aWNlTWFuYWdlclwiO1xuZXhwb3J0ICogZnJvbSBcIi4uL3V0aWxzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Mb2dQYW5lbFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vVGVzdERldmljZU1hbmFnZXJQYW5lbFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vdXRpbHMud2ViXCI7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBVUFBQUNGQ0FZQUFBQ1Qzekk5QUFBQUJtSkxSMFFBL3dEL0FQK2d2YWVUQUFBQUNYQklXWE1BQUFzVEFBQUxFd0VBbXB3WUFBQUFCM1JKVFVVSDRRUWVDaDRBalZ4ZTRnQUFBQmwwUlZoMFEyOXRiV1Z1ZEFCRGNtVmhkR1ZrSUhkcGRHZ2dSMGxOVUZlQkRoY0FBQUErU1VSQlZFakhZMlJnWVBqUGdBVmdDREpoVThXRVMvVUkwTTZJcHBKeE5PaklEVG95YlI4VkhCVWNNb0tqYVg1VWNEVE5qMWFSbzYyTEFXbGRBQUM4RUMydEFFQllYQUFBQUFCSlJVNUVya0pnZ2c9PVwiIiwiaW1wb3J0IHsgVGVzdERldmljZU1hbmFnZXJQYW5lbCB9IGZyb20gXCIuL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWxcIjtcbmltcG9ydCB7IExvZ1BhbmVsIH0gZnJvbSBcIi4vTG9nUGFuZWxcIjtcbmltcG9ydCB7IEJ1dHRwbHVnU2VydmVyIH0gZnJvbSBcIi4uLy4uL2luZGV4XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBDcmVhdGVMb2dnZXJQYW5lbCgpIHtcbiAgTG9nUGFuZWwuU2hvd0xvZ1BhbmVsKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDcmVhdGVEZXZpY2VNYW5hZ2VyUGFuZWwoYnV0dHBsdWdTZXJ2ZXI6IEJ1dHRwbHVnU2VydmVyKSB7XG4gIFRlc3REZXZpY2VNYW5hZ2VyUGFuZWwuU2hvd1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwoYnV0dHBsdWdTZXJ2ZXIpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==