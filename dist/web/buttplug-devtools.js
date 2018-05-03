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
/*!***************************!*\
  !*** external "Buttplug" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = Buttplug;

/***/ }),

/***/ "./node_modules/@tweenjs/tween.js/src/Tween.js":
/*!*****************************************************!*\
  !*** ./node_modules/@tweenjs/tween.js/src/Tween.js ***!
  \*****************************************************/
/*! no static exports found */
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/jspanel4/dist/jspanel.css":
/*!**************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/jspanel4/dist/jspanel.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* jspanel.sass: 2018-04-18 20:24 */\n/* http://stackoverflow.com/questions/30421570/sass-unicode-escape-is-not-preserved-in-css-file */\n.jsPanel {\n  border: 0;\n  box-sizing: border-box;\n  vertical-align: baseline;\n  font-family: \"Open Sans\",\"Helvetica Neue\",Helvetica,Arial,sans-serif;\n  font-weight: normal;\n  display: flex;\n  flex-direction: column;\n  opacity: 0;\n  overflow: visible;\n  position: absolute;\n  top: 0;\n  z-index: 100; }\n  .jsPanel .jsPanel-hdr {\n    border: 0;\n    box-sizing: border-box;\n    vertical-align: baseline;\n    font-family: \"Open Sans\",\"Helvetica Neue\",Helvetica,Arial,sans-serif;\n    font-weight: normal;\n    font-size: 1rem;\n    display: flex;\n    flex-direction: column;\n    flex-shrink: 0; }\n  .jsPanel .jsPanel-content {\n    border: 0;\n    box-sizing: border-box;\n    vertical-align: baseline;\n    font-family: \"Open Sans\",\"Helvetica Neue\",Helvetica,Arial,sans-serif;\n    font-weight: normal;\n    background: #ffffff;\n    color: #000000;\n    font-size: 1rem;\n    position: relative;\n    overflow-x: hidden;\n    overflow-y: auto; }\n    .jsPanel .jsPanel-content pre {\n      color: inherit; }\n  .jsPanel .jsPanel-ftr {\n    flex-direction: row;\n    justify-content: flex-end;\n    flex-wrap: nowrap;\n    align-items: center;\n    border-top: 1px solid #e0e0e0;\n    display: none;\n    box-sizing: border-box;\n    font-size: 1rem;\n    height: auto;\n    background: #f5f5f5;\n    font-weight: normal;\n    color: black;\n    overflow: hidden; }\n  .jsPanel .jsPanel-ftr.active {\n    display: flex; }\n    .jsPanel .jsPanel-ftr.active > * {\n      margin: 3px 8px; }\n  .jsPanel .jsPanel-ftr.panel-footer {\n    padding: 0; }\n\n.jsPanel-headerbar, .jsPanel-hdr-toolbar {\n  font-size: 1rem; }\n\n.jsPanel-headerbar {\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  align-items: center; }\n  .jsPanel-headerbar img {\n    vertical-align: middle;\n    max-height: 38px; }\n\n.jsPanel-titlebar {\n  display: flex;\n  align-items: center;\n  flex-grow: 1;\n  cursor: move;\n  height: 100%;\n  overflow: hidden; }\n  .jsPanel-titlebar .jsPanel-title {\n    color: #000000;\n    font-family: \"Open Sans\",\"Helvetica Neue\",Helvetica,Arial,sans-serif;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-size: 1rem;\n    font-variant: small-caps;\n    font-weight: normal;\n    margin: 0 5px 0 8px;\n    min-width: 0; }\n    .jsPanel-titlebar .jsPanel-title small {\n      font-size: 75%;\n      color: inherit; }\n\n.jsPanel-titlebar.jsPanel-rtl {\n  flex-direction: row-reverse; }\n\n.jsPanel-controlbar {\n  display: flex;\n  align-items: center;\n  touch-action: none; }\n  .jsPanel-controlbar div span:hover, .jsPanel-controlbar div svg:hover {\n    opacity: .6; }\n  .jsPanel-controlbar .jsPanel-btn {\n    cursor: pointer;\n    touch-action: none; }\n    .jsPanel-controlbar .jsPanel-btn span {\n      vertical-align: middle;\n      padding: 0 4px 0 2px; }\n    .jsPanel-controlbar .jsPanel-btn span.glyphicon {\n      padding: 0 2px; }\n    .jsPanel-controlbar .jsPanel-btn svg {\n      margin: 0 8px 0 3px; }\n    .jsPanel-controlbar .jsPanel-btn .jsPanel-icon {\n      padding-top: 9px;\n      margin: 0 4px 0 0; }\n  .jsPanel-controlbar .jsPanel-btn-normalize, .jsPanel-controlbar .jsPanel-btn-smallifyrev {\n    display: none; }\n\n.jsPanel-hdr-toolbar {\n  display: none;\n  width: auto;\n  height: auto;\n  font-size: 1rem; }\n\n.jsPanel-hdr-toolbar.active {\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  align-items: center; }\n  .jsPanel-hdr-toolbar.active > * {\n    margin: 3px 8px; }\n\n/* styles for panels using option.rtl */\n.jsPanel-headerbar.jsPanel-rtl, .jsPanel-controlbar.jsPanel-rtl, .jsPanel-hdr-toolbar.jsPanel-rtl {\n  flex-direction: row-reverse; }\n\n.jsPanel-hdr-toolbar.active.jsPanel-rtl {\n  padding: 7px 0 10px 0; }\n\n.jsPanel-ftr.jsPanel-rtl {\n  flex-direction: row; }\n\n/* container that takes the minified jsPanels */\n#jsPanel-replacement-container, .jsPanel-minimized-box, .jsPanel-minimized-container {\n  display: flex;\n  flex-flow: row wrap-reverse;\n  background: transparent none repeat scroll 0 0;\n  bottom: 0;\n  height: auto;\n  left: 0;\n  position: fixed;\n  width: auto;\n  z-index: 9998; }\n  #jsPanel-replacement-container .jsPanel-replacement, .jsPanel-minimized-box .jsPanel-replacement, .jsPanel-minimized-container .jsPanel-replacement {\n    display: flex;\n    align-items: center;\n    width: 200px;\n    height: 40px;\n    margin: 1px 1px 0 0;\n    z-index: 9999; }\n    #jsPanel-replacement-container .jsPanel-replacement .jsPanel-hdr, .jsPanel-minimized-box .jsPanel-replacement .jsPanel-hdr, .jsPanel-minimized-container .jsPanel-replacement .jsPanel-hdr {\n      flex-grow: 1;\n      min-width: 0;\n      padding: 0; }\n      #jsPanel-replacement-container .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo, .jsPanel-minimized-box .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo, .jsPanel-minimized-container .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo {\n        max-width: 50%;\n        overflow: hidden; }\n        #jsPanel-replacement-container .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo img, .jsPanel-minimized-box .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo img, .jsPanel-minimized-container .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo img {\n          max-width: 100px;\n          max-height: 38px; }\n    #jsPanel-replacement-container .jsPanel-replacement .jsPanel-titlebar, .jsPanel-minimized-box .jsPanel-replacement .jsPanel-titlebar, .jsPanel-minimized-container .jsPanel-replacement .jsPanel-titlebar {\n      cursor: default;\n      min-width: 0; }\n    #jsPanel-replacement-container .jsPanel-replacement .jsPanel-btn.jsPanel-btn-normalize, .jsPanel-minimized-box .jsPanel-replacement .jsPanel-btn.jsPanel-btn-normalize, .jsPanel-minimized-container .jsPanel-replacement .jsPanel-btn.jsPanel-btn-normalize {\n      display: block; }\n\n.jsPanel-minimized-box, .jsPanel-minimized-container {\n  position: absolute;\n  width: 100%;\n  overflow: hidden; }\n\n/* helper classes to make .jsPanel-content a flex box */\n.flexOne {\n  display: flex;\n  flex-flow: row wrap; }\n\n/* css for resizeit handles ------------------------- */\n.jsPanel-resizeit-handle {\n  display: block;\n  font-size: 0.1px;\n  position: absolute;\n  touch-action: none; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-n {\n  cursor: n-resize;\n  height: 12px;\n  left: 9px;\n  top: -5px;\n  width: calc(100% - 18px); }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-e {\n  cursor: e-resize;\n  height: calc(100% - 18px);\n  right: -9px;\n  top: 9px;\n  width: 12px; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-s {\n  bottom: -9px;\n  cursor: s-resize;\n  height: 12px;\n  left: 9px;\n  width: calc(100% - 18px); }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-w {\n  cursor: w-resize;\n  height: calc(100% - 18px);\n  left: -9px;\n  top: 9px;\n  width: 12px; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-ne {\n  cursor: ne-resize;\n  height: 18px;\n  right: -9px;\n  top: -9px;\n  width: 18px; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-se {\n  bottom: -9px;\n  cursor: se-resize;\n  height: 18px;\n  right: -9px;\n  width: 18px; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-sw {\n  bottom: -9px;\n  cursor: sw-resize;\n  height: 18px;\n  left: -9px;\n  width: 18px; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-nw {\n  cursor: nw-resize;\n  height: 18px;\n  left: -9px;\n  top: -9px;\n  width: 18px; }\n\n.jsPanel-drag-overlay {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0; }\n\n/* box-shadows --------------------------------------------------------------------- */\n.jsPanel-depth-1 {\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); }\n\n.jsPanel-depth-2 {\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23); }\n\n.jsPanel-depth-3 {\n  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22); }\n\n.jsPanel-depth-4 {\n  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22); }\n\n.jsPanel-depth-5 {\n  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.3), 0 20px 14px rgba(0, 0, 0, 0.22); }\n\n/* snap sensitive areas ------------------------------------------------------------------------------ */\n.jsPanel-snap-area {\n  position: fixed;\n  background: black;\n  opacity: .2;\n  border: 1px solid silver;\n  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.5), 0 10px 10px rgba(0, 0, 0, 0.5);\n  z-index: 9999; }\n\n.jsPanel-snap-area-lt, .jsPanel-snap-area-lc, .jsPanel-snap-area-lb {\n  left: 0; }\n\n.jsPanel-snap-area-ct, .jsPanel-snap-area-cb {\n  left: 37.5%; }\n\n.jsPanel-snap-area-rt, .jsPanel-snap-area-rc, .jsPanel-snap-area-rb {\n  right: 0; }\n\n.jsPanel-snap-area-lt, .jsPanel-snap-area-ct, .jsPanel-snap-area-rt {\n  top: 0; }\n\n.jsPanel-snap-area-lc, .jsPanel-snap-area-rc {\n  top: 37.5%; }\n\n.jsPanel-snap-area-lb, .jsPanel-snap-area-cb, .jsPanel-snap-area-rb {\n  bottom: 0; }\n\n.jsPanel-snap-area-ct, .jsPanel-snap-area-cb {\n  width: 25%; }\n\n.jsPanel-snap-area-lc, .jsPanel-snap-area-rc {\n  height: 25%; }\n\n.jsPanel-snap-area-lt {\n  border-bottom-right-radius: 100%; }\n\n.jsPanel-snap-area-rt {\n  border-bottom-left-radius: 100%; }\n\n.jsPanel-snap-area-rb {\n  border-top-left-radius: 100%; }\n\n.jsPanel-snap-area-lb {\n  border-top-right-radius: 100%; }\n\n/* tooltip and tooltip connectors */\n.jsPanel-connector-left-top, .jsPanel-connector-right-top, .jsPanel-connector-left-bottom, .jsPanel-connector-right-bottom {\n  width: 12px;\n  height: 12px;\n  position: absolute;\n  border-radius: 50%; }\n\n.jsPanel-connector-left, .jsPanel-connector-top, .jsPanel-connector-bottom, .jsPanel-connector-right {\n  width: 0;\n  height: 0;\n  position: absolute;\n  border: 12px solid transparent; }\n\n.jsPanel-connector-left-top {\n  left: calc(100% - 6px);\n  top: calc(100% - 6px); }\n\n.jsPanel-connector-right-top {\n  left: -6px;\n  top: calc(100% - 6px); }\n\n.jsPanel-connector-right-bottom {\n  left: -6px;\n  top: -6px; }\n\n.jsPanel-connector-left-bottom {\n  left: calc(100% - 6px);\n  top: -6px; }\n\n.jsPanel-connector-top {\n  left: calc(50% - 12px);\n  top: 100%; }\n\n.jsPanel-connector-right {\n  left: -24px;\n  top: calc(50% - 12px); }\n\n.jsPanel-connector-bottom {\n  left: calc(50% - 12px);\n  top: -24px; }\n\n.jsPanel-connector-left {\n  left: 100%;\n  top: calc(50% - 12px); }\n\n/* IE11 CSS styles go here */\n@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n  #jsPanel-replacement-container .jsPanel-replacement .jsPanel-titlebar {\n    max-width: 105px; } }\n\n/* XXXXXXXXXXXXXXXXXXXXXXX */\n/* bootstrap adjustments */\n.jsPanel.panel-default, .jsPanel.panel-primary, .jsPanel.panel-info, .jsPanel.panel-success, .jsPanel.panel-warning, .jsPanel.panel-danger, .jsPanel.card.card-inverse {\n  box-shadow: 0 0 6px rgba(0, 33, 50, 0.1), 0 7px 25px rgba(17, 38, 60, 0.4); }\n\n.jsPanel.panel {\n  margin: 0; }\n\n.jsPanel-hdr.panel-heading {\n  border-bottom: none;\n  padding: 0; }\n\n.jsPanel-title.panel-title .small, .jsPanel-title.panel-title small {\n  font-size: 75%; }\n\n/* bootstrap 4 adjustments */\n.jsPanel.card.card-inverse {\n  box-shadow: 0 0 6px rgba(0, 33, 50, 0.1), 0 7px 25px rgba(17, 38, 60, 0.4); }\n\n.card-default {\n  background: #f5f5f5; }\n\n.card-primary > .jsPanel-content.jsPanel-content-filled,\n.card-success > .jsPanel-content.jsPanel-content-filled,\n.card-info > .jsPanel-content.jsPanel-content-filled,\n.card-warning > .jsPanel-content.jsPanel-content-filled,\n.card-danger > .jsPanel-content.jsPanel-content-filled {\n  background: transparent;\n  color: #f5f5f5; }\n\n.card-default > .jsPanel-content.jsPanel-content-filled {\n  background: transparent;\n  color: #000000; }\n\n/* css3 animations */\n@keyframes jsPanelFadeIn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.jsPanelFadeIn {\n  opacity: 0;\n  animation: jsPanelFadeIn ease-in 1;\n  animation-fill-mode: forwards;\n  animation-duration: 600ms; }\n\n@keyframes jsPanelFadeOut {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0; } }\n\n.jsPanelFadeOut {\n  animation: jsPanelFadeOut ease-in 1;\n  animation-fill-mode: forwards;\n  animation-duration: 600ms; }\n\n@keyframes modalBackdropFadeIn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 0.65; } }\n\n.jsPanel-modal-backdrop {\n  animation: modalBackdropFadeIn ease-in 1;\n  animation-fill-mode: forwards;\n  animation-duration: 750ms;\n  background: black;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%; }\n\n@keyframes modalBackdropFadeOut {\n  from {\n    opacity: 0.65; }\n  to {\n    opacity: 0; } }\n\n.jsPanel-modal-backdrop-out {\n  animation: modalBackdropFadeOut ease-in 1;\n  animation-fill-mode: forwards;\n  animation-duration: 400ms; }\n\n.jsPanel-modal-backdrop-multi {\n  background: rgba(0, 0, 0, 0.15); }\n\n.jsPanel-content .jsPanel-iframe-overlay {\n  position: absolute;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background: transparent; }\n\n/* _themes_mdl.sass: 2017-07-12 19:16 */\n/* default ---------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-default {\n  background-color: #cfd8dc;\n  border-color: #cfd8dc; }\n\n.jsPanel-theme-default > .jsPanel-hdr * {\n  color: #000000; }\n\n.jsPanel-theme-default > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #90a4ae; }\n\n.jsPanel-theme-default > .jsPanel-content {\n  border-top: 1px solid #90a4ae; }\n\n.jsPanel-theme-default > .jsPanel-content.jsPanel-content-filled {\n  background-color: #cfd8dc;\n  border-top: 1px solid #90a4ae; }\n\n.jsPanel-theme-default > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #eceff1; }\n\n/* primary ---------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-primary {\n  background-color: #2196f3;\n  border-color: #2196f3; }\n\n.jsPanel-theme-primary > .jsPanel-hdr * {\n  color: #ffffff; }\n\n.jsPanel-theme-primary > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #42a5f5; }\n\n.jsPanel-theme-primary > .jsPanel-content {\n  border-top: 1px solid #42a5f5; }\n\n.jsPanel-theme-primary > .jsPanel-content.jsPanel-content-filled {\n  background-color: #2196f3;\n  border-top: 1px solid #42a5f5;\n  color: #ffffff; }\n\n.jsPanel-theme-primary > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #bbdefb;\n  color: #000000; }\n\n/* info ------------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-info {\n  background-color: #29b6f6;\n  border-color: #29b6f6; }\n\n.jsPanel-theme-info > .jsPanel-hdr * {\n  color: #ffffff; }\n\n.jsPanel-theme-info > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #4fc3f7; }\n\n.jsPanel-theme-info > .jsPanel-content {\n  border-top: 1px solid #4fc3f7; }\n\n.jsPanel-theme-info > .jsPanel-content.jsPanel-content-filled {\n  background-color: #29b6f6;\n  border-top: 1px solid #4fc3f7;\n  color: #ffffff; }\n\n.jsPanel-theme-info > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #e1f5fe;\n  color: #000000; }\n\n/* success ---------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-success {\n  background-color: #4caf50;\n  border-color: #4caf50; }\n\n.jsPanel-theme-success > .jsPanel-hdr * {\n  color: #ffffff; }\n\n.jsPanel-theme-success > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #81c784; }\n\n.jsPanel-theme-success > .jsPanel-content.jsPanel-content-filled {\n  background-color: #4caf50;\n  border-top: 1px solid #81c784;\n  color: #ffffff; }\n\n.jsPanel-theme-success > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #e8f5e9;\n  color: #000000; }\n\n/* warning ---------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-warning {\n  background-color: #ffc107;\n  border-color: #ffc107; }\n\n.jsPanel-theme-warning > .jsPanel-hdr * {\n  color: #000000; }\n\n.jsPanel-theme-warning > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #ffd54f; }\n\n.jsPanel-theme-warning > .jsPanel-content.jsPanel-content-filled {\n  background-color: #ffc107;\n  border-top: 1px solid #ffd54f;\n  color: #000000; }\n\n.jsPanel-theme-warning > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #fff3e0;\n  color: #000000; }\n\n/* danger ----------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-danger {\n  background-color: #ff3d00;\n  border-color: #ff3d00; }\n\n.jsPanel-theme-danger > .jsPanel-hdr * {\n  color: #ffffff; }\n\n.jsPanel-theme-danger > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #ff6e40; }\n\n.jsPanel-theme-danger > .jsPanel-content.jsPanel-content-filled {\n  background-color: #ff3d00;\n  border-top: 1px solid #ff6e40;\n  color: #ffffff; }\n\n.jsPanel-theme-danger > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #ff9e80;\n  color: #000000; }\n\n.jsPanel-content.jsPanel-content-noheader {\n  border: none !important; }\n\nbody {\n  -ms-overflow-style: scrollbar; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/devtools/web/LogPanel.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader!./src/devtools/web/LogPanel.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#buttplugdevtoolslogpanel {\n    display:flex;\n    flex-direction:column;\n    width:100%;\n    height:100%;\n    align-items:center;\n    color: #000;\n}\n\n#buttplugdevtoolslogpanel input,select,textarea {\n    color: #000;\n    background: #fff;\n}\n\n#buttplugdevtoolslogpanel #buttplugdevtoolslogtextarea {\n    font-size: 8pt;\n    width:100%;\n    flex:1 1;\n    padding:5px;\n    box-sizing:border-box;\n}\n#buttplugdevtoolslogpanel #buttplugdevtoolsloglevel {\n    width:98%;\n    flex:none;\n    padding:5px;\n    box-sizing:border-box;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/devtools/web/TestDeviceManagerPanel.css":
/*!*******************************************************************************!*\
  !*** ./node_modules/css-loader!./src/devtools/web/TestDeviceManagerPanel.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "main {\n    width:100%;\n    height: 100%;\n}\n\nsection {\n    display: none;\n    padding: 20px;\n    border-top: 1px solid #ddd;\n}\n\ninput {\n    display: none;\n}\n\nlabel {\n    display: inline-block;\n    margin: 0 0 -1px;\n    padding: 5px 10px;\n    font-weight: 600;\n    text-align: center;\n    color: #bbb;\n    border: 1px solid transparent;\n}\n\nlabel:before {\n    font-family: fontawesome;\n    font-weight: normal;\n    margin-right: 10px;\n}\n\nlabel:hover {\n    color: #888;\n    cursor: pointer;\n}\n\ninput:checked + label {\n    color: #555;\n    border: 1px solid #ddd;\n    border-top: 2px solid orange;\n    border-bottom: 1px solid #fff;\n}\n\n#tab1:checked ~ #content1,\n#tab2:checked ~ #content2,\n#tab3:checked ~ #content3,\n#tab4:checked ~ #content4 {\n    display: block;\n}\n\n#content1 {\n    height: 100%;\n}\n\n#content2 {\n    height: 100%;\n}\n\n#simulator {\n    display: flex;\n    width: 100%;\n    height: calc(100% - 60px);\n    flex-direction: row;\n}\n\n.fleshlight-sim {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n    height: 100%;\n    align-items: center;\n    justify-content: center;\n}\n\ndiv.c-fleshlight {\n    display: flex;\n    flex: 1;\n}\n\ndiv.c-fleshlight img {\n    height: 100%;\n    width: auto;\n\t  image-rendering: -moz-crisp-edges;\n\t  image-rendering: -o-crisp-edges;\n\t  image-rendering: -webkit-optimize-contrast;\n\t  image-rendering: pixelated;\n}\n\ndiv.c-fleshlight .o-fleshlight {\n    position: relative;\n    height: 77%;\n}\n\n.vibrator-simulator-component {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n    height: 100%;\n    align-items: center;\n    justify-content: center;\n}\n\ndiv.vibrator {\n    flex: 1 1;\n    align-items: center;\n}\n\ndiv.vibrator-simulator-component img {\n    height: calc(100% - 40px);\n    width: auto;\n    position: relative;\n    image-rendering: -moz-crisp-edges;\n\t  image-rendering: -o-crisp-edges;\n\t  image-rendering: -webkit-optimize-contrast;\n\t  image-rendering: pixelated;\n}\n\ndiv.vibrator-info {\n    flex: 0;\n}\n\n.simulator-divider {\n    border-left: 1px #000 dashed;\n    height: 100%;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
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
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
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
/*!************************************************!*\
  !*** ./node_modules/jspanel4/dist/jspanel.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../css-loader!./jspanel.css */ "./node_modules/css-loader/index.js!./node_modules/jspanel4/dist/jspanel.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/jspanel4/es6module/jspanel.min.js":
/*!********************************************************!*\
  !*** ./node_modules/jspanel4/es6module/jspanel.min.js ***!
  \********************************************************/
/*! exports provided: jsPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsPanel", function() { return jsPanel; });
var _typeof2="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof="function"==typeof Symbol&&"symbol"===_typeof2(Symbol.iterator)?function(e){return"undefined"==typeof e?"undefined":_typeof2(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":"undefined"==typeof e?"undefined":_typeof2(e)};function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var jsPanel={version:"4.0.0-beta.5.1",date:"2018-04-19 23:21",ajaxAlwaysCallbacks:[],autopositionSpacing:4,closeOnEscape:function(){document.addEventListener("keydown",function(t){("Escape"===t.key||"Esc"===t.code||27===t.keyCode)&&jsPanel.getPanels(function(){return this.classList.contains("jsPanel")}).some(function(e){return!!e.options.closeOnEscape&&(e.close(),!0)})},!1)}(),defaults:{boxShadow:3,container:document.body,contentSize:{width:"400px",height:"200px"},dragit:{cursor:"move",handles:".jsPanel-headerlogo, .jsPanel-titlebar, .jsPanel-ftr",opacity:.8,disableOnMaximized:!0},header:!0,headerTitle:"jsPanel",headerControls:"all",iconfont:!1,maximizedMargin:0,minimizeTo:"default",paneltype:"standard",position:"center",resizeit:{handles:"n, e, s, w, ne, se, sw, nw",minWidth:40,minHeight:40},theme:"default"},defaultSnapConfig:{sensitivity:70,trigger:"panel"},error:function(){window.jsPanelError||(window.jsPanelError=function(e){this.name="jsPanelError",this.message=e||"",this.stack=new Error().stack},jsPanelError.prototype=Object.create(Error.prototype),jsPanelError.prototype.constructor=jsPanelError)}(),extensions:{},globalCallbacks:!1,icons:{close:"<svg class=\"jsPanel-icon\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"32\" viewBox=\"0 0 28 32\"><path fill=\"currentColor\" d=\"M17.75 16l9.85-9.85c0.5-0.5 0.5-1.3 0-1.75-0.5-0.5-1.3-0.5-1.75 0l-9.85 9.85-9.85-9.9c-0.5-0.5-1.3-0.5-1.75 0-0.5 0.5-0.5 1.3 0 1.75l9.85 9.9-9.9 9.85c-0.5 0.5-0.5 1.3 0 1.75 0.25 0.25 0.55 0.35 0.9 0.35s0.65-0.1 0.9-0.35l9.85-9.85 9.85 9.85c0.25 0.25 0.55 0.35 0.9 0.35s0.65-0.1 0.9-0.35c0.5-0.5 0.5-1.3 0-1.75l-9.9-9.85z\"></path></svg>",maximize:"<svg class=\"jsPanel-icon\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"32\" viewBox=\"0 0 28 32\"><path fill=\"currentColor\" d=\"M27.55 3.9h-22.6c-0.55 0-1 0.45-1 1v22.3c0 0.55 0.45 1 1 1h22.55c0.55 0 1-0.45 1-1v-22.3c0.050-0.55-0.4-1-0.95-1zM5.95 26.15v-18h20.55v18h-20.55z\"></path></svg>",normalize:"<svg class=\"jsPanel-icon\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"32\" viewBox=\"0 0 28 32\"><path fill=\"currentColor\" d=\"M27.9 3.75h-18.8c-0.4 0-0.75 0.35-0.75 0.75v4.3c0 0.1 0 0.2 0.050 0.3h-4.2c-0.55 0-1 0.45-1 1v17.4c0 0.55 0.45 1 1 1h17.65c0.55 0 1-0.45 1-1v-3.7c0.050 0 0.1 0.050 0.2 0.050h4.9c0.4 0 0.75-0.35 0.75-0.75v-18.6c-0.050-0.4-0.4-0.75-0.8-0.75zM5.2 26.5v-12.95c0.050 0 0.1 0 0.15 0h15.4c0.050 0 0.1 0 0.15 0v12.95h-15.7zM27.15 22.35h-4.15c-0.050 0-0.15 0-0.2 0.050v-12.3c0-0.55-0.45-1-1-1h-12c0.050-0.1 0.050-0.2 0.050-0.3v-3.55h17.3v17.1z\"></path></svg>",minimize:"<svg class=\"jsPanel-icon\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"32\" viewBox=\"0 0 28 32\"><path fill=\"currentColor\" d=\"M27.3 28.5h-22.6c-0.85 0-1.5-0.65-1.5-1.5s0.65-1.5 1.5-1.5h22.55c0.85 0 1.5 0.65 1.5 1.5s-0.65 1.5-1.45 1.5z\"></path></svg>",smallifyrev:"<svg class=\"jsPanel-icon\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"32\" viewBox=\"0 0 28 32\"><path fill=\"currentColor\" d=\"M15.95 23.2c0 0 0 0 0 0-0.35 0-0.65-0.15-0.9-0.35l-11.7-11.9c-0.5-0.5-0.5-1.3 0-1.75 0.5-0.5 1.3-0.5 1.75 0l10.85 10.95 10.9-10.8c0.5-0.5 1.3-0.5 1.75 0s0.5 1.3 0 1.75l-11.75 11.7c-0.25 0.25-0.55 0.4-0.9 0.4z\"></path></svg>",smallify:"<svg class=\"jsPanel-icon\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"32\" viewBox=\"0 0 28 32\"><path fill=\"currentColor\" d=\"M28.65 20.85l-11.8-11.65c-0.5-0.5-1.3-0.5-1.75 0l-11.75 11.85c-0.5 0.5-0.5 1.3 0 1.75 0.25 0.25 0.55 0.35 0.9 0.35 0.3 0 0.65-0.1 0.9-0.35l10.85-10.95 10.9 10.8c0.5 0.5 1.3 0.5 1.75 0 0.5-0.5 0.5-1.3 0-1.8z\"></path></svg>"},idCounter:0,isIE:function(){return navigator.appVersion.match(/Trident/)}(),mdbthemes:["secondary","elegant","stylish","unique","special"],pointerdown:"ontouchend"in window?["touchstart","mousedown"]:["mousedown"],pointermove:"ontouchend"in window?["touchmove","mousemove"]:["mousemove"],pointerup:"ontouchend"in window?["touchend","mouseup"]:["mouseup"],polyfills:function(){var e=String.prototype;(function(e){e.forEach(function(e){e.append=e.append||function(){var e=Array.prototype.slice.call(arguments),t=document.createDocumentFragment();e.forEach(function(e){var n=e instanceof Node;t.appendChild(n?e:document.createTextNode(e+""))}),this.appendChild(t)}})})([Element.prototype,Document.prototype,DocumentFragment.prototype]),window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(e){var t,n=(this.document||this.ownerDocument).querySelectorAll(e),a=this;do for(t=n.length;0<=--t&&n.item(t)!==a;);while(0>t&&(a=a.parentElement));return a}),window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=function(e,t){t=t||window;for(var n=0;n<this.length;n++)e.call(t,this[n],n,this)}),Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:function(e){if(e===void 0||null===e)throw new TypeError("Cannot convert first argument to object");for(var t,n=Object(e),a=1;a<arguments.length;a++)if(t=arguments[a],void 0!==t&&null!==t){t=Object(t);for(var o=Object.keys(Object(t)),i=0,l=o.length;i<l;i++){var s=o[i],r=Object.getOwnPropertyDescriptor(t,s);void 0!==r&&r.enumerable&&(n[s]=t[s])}}return n}}),function(){function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}return"function"!=typeof window.CustomEvent&&void(e.prototype=window.Event.prototype,window.CustomEvent=e)}(),e.endsWith||(e.endsWith=function(e,t){return t<this.length?t|=0:t=this.length,this.substr(t-e.length,e.length)===e}),e.startsWith||(e.startsWith=function(e,t){return this.substr(t||0,e.length)===e})}(),themes:["default","primary","info","success","warning","danger"],ziBase:100,ajax:function(obj,ajaxConfig){var objIsPanel;"object"===("undefined"==typeof obj?"undefined":_typeof(obj))&&obj.classList.contains("jsPanel")?objIsPanel=!0:(objIsPanel=!1,"string"==typeof obj&&(obj=document.querySelector(obj)));var conf=ajaxConfig,configDefaults={method:"GET",async:!0,user:"",pwd:"",done:function(){objIsPanel?obj.content.innerHTML=this.responseText:obj.innerHTML=this.responseText},autoresize:!0,autoreposition:!0},config=void 0;if("string"==typeof conf)config=Object.assign({},configDefaults,{url:encodeURI(conf),evalscripttags:!0});else if("object"===("undefined"==typeof conf?"undefined":_typeof(conf))&&conf.url)config=Object.assign({},configDefaults,conf),config.url=encodeURI(conf.url),!1===config.async&&(config.timeout=0,config.withCredentials&&(config.withCredentials=void 0),config.responseType&&(config.responseType=void 0));else return console.info("XMLHttpRequest seems to miss the request url!"),obj;var xhr=new XMLHttpRequest;return xhr.onreadystatechange=function(){if(4===xhr.readyState){if(200!==xhr.status)config.fail&&config.fail.call(xhr,obj);else if(config.done.call(xhr,obj),config.evalscripttags){var scripttags=xhr.responseText.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi);scripttags&&scripttags.forEach(function(tag){var js=tag.replace(/<script\b[^>]*>/i,"").replace(/<\/script>/i,"").trim();eval(js)})}if(config.always&&config.always.call(xhr,obj),objIsPanel){var oContentSize=obj.options.contentSize;if("string"==typeof oContentSize&&oContentSize.match(/auto/i)){var parts=oContentSize.split(" "),sizes=Object.assign({},{width:parts[0],height:parts[1]});config.autoresize&&obj.resize(sizes),!obj.classList.contains("jsPanel-contextmenu")&&config.autoreposition&&obj.reposition()}else if("object"===("undefined"==typeof oContentSize?"undefined":_typeof(oContentSize))&&("auto"===oContentSize.width||"auto"===oContentSize.height)){var _sizes=Object.assign({},oContentSize);config.autoresize&&obj.resize(_sizes),!obj.classList.contains("jsPanel-contextmenu")&&config.autoreposition&&obj.reposition()}}jsPanel.ajaxAlwaysCallbacks.length&&jsPanel.ajaxAlwaysCallbacks.forEach(function(e){e.call(obj,obj)})}},xhr.open(config.method,config.url,config.async,config.user,config.pwd),xhr.timeout=config.timeout||0,config.withCredentials&&(xhr.withCredentials=config.withCredentials),config.responseType&&(xhr.responseType=config.responseType),config.beforeSend&&config.beforeSend.call(xhr),config.data?xhr.send(config.data):xhr.send(null),obj},calcColors:function(e){var t=this.color(e),n=this.lighten(e,.81),a=this.darken(e,.5),o=.556>=this.perceivedBrightness(e)?"#ffffff":"#000000",i=.556>=this.perceivedBrightness(n)?"#ffffff":"#000000",l=.556>=this.perceivedBrightness(a)?"#000000":"#ffffff";return[t.hsl.css,n,a,o,i,l]},color:function e(t){var n,a,o,i,r,s,l,d,c,e=t.toLowerCase(),h={},p=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/gi,m=/^rgba?\(([0-9]{1,3}),([0-9]{1,3}),([0-9]{1,3}),?(0|1|0\.[0-9]{1,2}|\.[0-9]{1,2})?\)$/gi,f=/^hsla?\(([0-9]{1,3}),([0-9]{1,3}%),([0-9]{1,3}%),?(0|1|0\.[0-9]{1,2}|\.[0-9]{1,2})?\)$/gi,g={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgrey:"a9a9a9",darkgreen:"006400",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",grey:"808080",green:"008000",greenyellow:"adff2f",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgrey:"d3d3d3",lightgreen:"90ee90",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370d8",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"d87093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"639",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"};return g[e]&&(e=g[e]),null===e.match(p)?e.match(m)?(l=m.exec(e),h.rgb={css:e,r:l[1],g:l[2],b:l[3]},h.hex=this.rgbToHex(l[1],l[2],l[3]),c=this.rgbToHsl(l[1],l[2],l[3]),h.hsl=c):e.match(f)?(l=f.exec(e),i=l[1]/360,r=l[2].substr(0,l[2].length-1)/100,s=l[3].substr(0,l[3].length-1)/100,d=this.hslToRgb(i,r,s),h.rgb={css:"rgb("+d[0]+","+d[1]+","+d[2]+")",r:d[0],g:d[1],b:d[2]},h.hex=this.rgbToHex(h.rgb.r,h.rgb.g,h.rgb.b),h.hsl={css:"hsl("+l[1]+","+l[2]+","+l[3]+")",h:l[1],s:l[2],l:l[3]}):(h.hex="#f5f5f5",h.rgb={css:"rgb(245,245,245)",r:245,g:245,b:245},h.hsl={css:"hsl(0,0%,96.08%)",h:0,s:"0%",l:"96.08%"}):(e=e.replace("#",""),1==e.length%2?(n=e.substr(0,1)+""+e.substr(0,1),a=e.substr(1,1)+""+e.substr(1,1),o=e.substr(2,1)+""+e.substr(2,1),h.rgb={r:parseInt(n,16),g:parseInt(a,16),b:parseInt(o,16)},h.hex="#"+n+a+o):(h.rgb={r:parseInt(e.substr(0,2),16),g:parseInt(e.substr(2,2),16),b:parseInt(e.substr(4,2),16)},h.hex="#"+e),c=this.rgbToHsl(h.rgb.r,h.rgb.g,h.rgb.b),h.hsl=c,h.rgb.css="rgb("+h.rgb.r+","+h.rgb.g+","+h.rgb.b+")"),h},createPanelTemplate:function(){var e=!(0<arguments.length&&void 0!==arguments[0])||arguments[0],t=document.createElement("div");return t.className="jsPanel",e&&["close","maximize","normalize","minimize","smallify","smallifyrev"].forEach(function(e){t.setAttribute("data-btn"+e,"enabled")}),t.innerHTML="<div class=\"jsPanel-hdr\">\n                                <div class=\"jsPanel-headerbar\">\n                                    <div class=\"jsPanel-headerlogo\"></div>\n                                    <div class=\"jsPanel-titlebar\">\n                                        <span class=\"jsPanel-title\"></span>\n                                    </div>\n                                    <div class=\"jsPanel-controlbar\">\n                                        <div class=\"jsPanel-btn jsPanel-btn-smallify\">"+this.icons.smallify+"</div>\n                                        <div class=\"jsPanel-btn jsPanel-btn-smallifyrev\">"+this.icons.smallifyrev+"</div>\n                                        <div class=\"jsPanel-btn jsPanel-btn-minimize\">"+this.icons.minimize+"</div>\n                                        <div class=\"jsPanel-btn jsPanel-btn-normalize\">"+this.icons.normalize+"</div>\n                                        <div class=\"jsPanel-btn jsPanel-btn-maximize\">"+this.icons.maximize+"</div>\n                                        <div class=\"jsPanel-btn jsPanel-btn-close\">"+this.icons.close+"</div>\n                                    </div>\n                                </div>\n                                <div class=\"jsPanel-hdr-toolbar\"></div>\n                            </div>\n                            <div class=\"jsPanel-content jsPanel-content-nofooter\"></div>\n                            <div class=\"jsPanel-minimized-box\"></div>\n                            <div class=\"jsPanel-ftr\"></div>",t},createMinimizedTemplate:function(){var e=document.createElement("div");return e.className="jsPanel-replacement",e.innerHTML="<div class=\"jsPanel-hdr\">\n                                <div class=\"jsPanel-headerbar\">\n                                    <div class=\"jsPanel-headerlogo\"></div>\n                                    <div class=\"jsPanel-titlebar\">\n                                        <span class=\"jsPanel-title\"></span>\n                                    </div>\n                                    <div class=\"jsPanel-controlbar\">\n                                        <div class=\"jsPanel-btn jsPanel-btn-normalize\">"+this.icons.normalize+"</div>\n                                        <div class=\"jsPanel-btn jsPanel-btn-maximize\">"+this.icons.maximize+"</div>\n                                        <div class=\"jsPanel-btn jsPanel-btn-close\">"+this.icons.close+"</div>\n                                    </div>\n                                </div>\n                            </div>",e},createSnapArea:function(e,t,n){var a=document.createElement("div"),o=e.parentElement;a.className="jsPanel-snap-area jsPanel-snap-area-"+t,"lt"===t||"rt"===t||"rb"===t||"lb"===t?(a.style.width=n+"px",a.style.height=n+"px"):"ct"===t||"cb"===t?a.style.height=n+"px":("lc"===t||"rc"===t)&&(a.style.width=n+"px"),o!==document.body&&(a.style.position="absolute"),document.querySelector(".jsPanel-snap-area.jsPanel-snap-area-"+t)||e.parentElement.appendChild(a)},darken:function(e,t){var n=this.color(e).hsl,a=parseFloat(n.l);return"hsl("+n.h+","+n.s+","+(a-a*t+"%")+")"},dragit:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n=void 0,a=Object.assign({},this.defaults.dragit,e),o=void 0,i=void 0,l=[],s=new CustomEvent("jspaneldragstart",{detail:t.id}),r=new CustomEvent("jspaneldrag",{detail:t.id}),d=new CustomEvent("jspaneldragstop",{detail:t.id});return a.grid&&Array.isArray(a.grid)&&1===a.grid.length&&(a.grid[1]=a.grid[0]),i=this.pOcontainment(a.containment),t.querySelectorAll(a.handles).forEach(function(e){e.style.touchAction="none",e.style.cursor=a.cursor,jsPanel.pointerdown.forEach(function(d){e.addEventListener(d,function(d){if(d.preventDefault(),!d.target.closest(".jsPanel-ftr-btn")){t.controlbar.style.pointerEvents="none",l=document.querySelectorAll("iframe"),l.length&&l.forEach(function(e){e.style.pointerEvents="none"});var e=window.getComputedStyle(t),c=parseFloat(e.left),h=parseFloat(e.top),p=d.touches?d.touches[0].clientX:d.clientX,m=d.touches?d.touches[0].clientY:d.clientY,f=t.parentElement,g=f.getBoundingClientRect(),u=window.getComputedStyle(f),b=0;o=function(o){var e=Math.abs,l=Math.sqrt,d=Math.pow;if(o.preventDefault(),!n){if(document.dispatchEvent(s),t.style.opacity=a.opacity,t.snapped&&a.snap.resizeToPreSnap&&t.currentData.beforeSnap){t.resize(t.currentData.beforeSnap.width+" "+t.currentData.beforeSnap.height);var y=t.getBoundingClientRect(),v=p-(y.left+y.width),z=y.width/2;v>-z&&(b=v+z)}a.start&&jsPanel.processCallbacks(t,a.start,!1,{left:c,top:h}),jsPanel.front(t),t.snapped=!1}if(n=1,a.disableOnMaximized&&"maximized"===t.status)return!1;var w,x,C,E,j,P,S,T,L,k,q=o.touches?o.touches[0].clientX:o.clientX,A=o.touches?o.touches[0].clientY:o.clientY,W=window.getComputedStyle(t);if(f===document.body){var R=t.getBoundingClientRect();L=window.innerWidth-parseInt(u.borderLeftWidth,10)-parseInt(u.borderRightWidth,10)-(R.left+R.width),k=window.innerHeight-parseInt(u.borderTopWidth,10)-parseInt(u.borderBottomWidth,10)-(R.top+R.height)}else L=parseInt(u.width,10)-parseInt(u.borderLeftWidth,10)-parseInt(u.borderRightWidth,10)-(parseInt(W.left,10)+parseInt(W.width,10)),k=parseInt(u.height,10)-parseInt(u.borderTopWidth,10)-parseInt(u.borderBottomWidth,10)-(parseInt(W.top,10)+parseInt(W.height,10));w=parseFloat(W.left),C=parseFloat(W.top),j=L,S=k,a.snap&&("panel"===a.snap.trigger?x=d(w,2):"pointer"===a.snap.trigger&&(w=q,x=d(q,2),C=A,j=window.innerWidth-q,S=window.innerHeight-A),E=d(C,2),P=d(j,2),T=d(S,2));var B=l(x+E),H=l(x+T),M=l(P+E),O=l(P+T),D=e(w-j)/2,I=e(C-S)/2,N=l(x+d(I,2)),X=l(E+d(D,2)),Y=l(P+d(I,2)),F=l(T+d(D,2));if(window.getSelection().removeAllRanges(),document.dispatchEvent(r),a.axis&&"x"!==a.axis||(t.style.left=c+(q-p)+b+"px"),a.axis&&"y"!==a.axis||(t.style.top=h+(A-m)+"px"),a.grid){var _=parseFloat(W.left),V=parseFloat(W.top),Z=_%a.grid[0],K=V%a.grid[1];t.style.left=Z<a.grid[0]/2?_-Z+"px":_+(a.grid[0]-Z)+"px",t.style.top=K<a.grid[1]/2?V-K+"px":V+(a.grid[1]-K)+"px"}if(a.containment||0===a.containment){var U,G;if(t.options.container===document.body)U=window.innerWidth-parseFloat(W.width)-i[1],G=window.innerHeight-parseFloat(W.height)-i[2];else{var J=parseFloat(u.borderLeftWidth)+parseFloat(u.borderRightWidth),Q=parseFloat(u.borderTopWidth)+parseFloat(u.borderBottomWidth);U=g.width-parseFloat(W.width)-i[1]-J,G=g.height-parseFloat(W.height)-i[2]-Q}parseFloat(t.style.left)<=i[3]&&(t.style.left=i[3]+"px"),parseFloat(t.style.top)<=i[0]&&(t.style.top=i[0]+"px"),parseFloat(t.style.left)>=U&&(t.style.left=U+"px"),parseFloat(t.style.top)>=G&&(t.style.top=G+"px")}if(a.drag&&jsPanel.processCallbacks(t,a.drag,!1,{left:w,top:C,right:j,bottom:S}),a.snap){var ee=a.snap.sensitivity,te=f===document.body?window.innerWidth/8:g.width/8,ne=f===document.body?window.innerHeight/8:g.height/8;t.snappableTo=!1,jsPanel.removeSnapAreas(t),B<ee?(t.snappableTo="left-top",!1!==a.snap.snapLeftTop&&jsPanel.createSnapArea(t,"lt",ee)):H<ee?(t.snappableTo="left-bottom",!1!==a.snap.snapLeftBottom&&jsPanel.createSnapArea(t,"lb",ee)):M<ee?(t.snappableTo="right-top",!1!==a.snap.snapRightTop&&jsPanel.createSnapArea(t,"rt",ee)):O<ee?(t.snappableTo="right-bottom",!1!==a.snap.snapRightBottom&&jsPanel.createSnapArea(t,"rb",ee)):C<ee&&X<te?(t.snappableTo="center-top",!1!==a.snap.snapCenterTop&&jsPanel.createSnapArea(t,"ct",ee)):w<ee&&N<ne?(t.snappableTo="left-center",!1!==a.snap.snapLeftCenter&&jsPanel.createSnapArea(t,"lc",ee)):j<ee&&Y<ne?(t.snappableTo="right-center",!1!==a.snap.snapRightCenter&&jsPanel.createSnapArea(t,"rc",ee)):S<ee&&F<te&&(t.snappableTo="center-bottom",!1!==a.snap.snapCenterBottom&&jsPanel.createSnapArea(t,"cb",ee))}},jsPanel.pointermove.forEach(function(e){document.addEventListener(e,o)})}})}),jsPanel.pointerup.forEach(function(e){document.addEventListener(e,function(){jsPanel.pointermove.forEach(function(e){document.removeEventListener(e,o)}),document.body.style.overflow="inherit",jsPanel.removeSnapAreas(t),n&&(document.dispatchEvent(d),t.style.opacity=1,n=void 0,t.saveCurrentPosition(),a.snap&&("left-top"===t.snappableTo?jsPanel.snapPanel(t,a.snap.snapLeftTop):"center-top"===t.snappableTo?jsPanel.snapPanel(t,a.snap.snapCenterTop):"right-top"===t.snappableTo?jsPanel.snapPanel(t,a.snap.snapRightTop):"right-center"===t.snappableTo?jsPanel.snapPanel(t,a.snap.snapRightCenter):"right-bottom"===t.snappableTo?jsPanel.snapPanel(t,a.snap.snapRightBottom):"center-bottom"===t.snappableTo?jsPanel.snapPanel(t,a.snap.snapCenterBottom):"left-bottom"===t.snappableTo?jsPanel.snapPanel(t,a.snap.snapLeftBottom):"left-center"===t.snappableTo&&jsPanel.snapPanel(t,a.snap.snapLeftCenter),a.snap.callback&&t.snappableTo&&"function"==typeof a.snap.callback&&a.snap.callback.call(t,t),t.snappableTo&&a.snap.repositionOnSnap&&t.repositionOnSnap(t.snappableTo)),a.stop&&jsPanel.processCallbacks(t,a.stop,!1,{left:parseFloat(t.style.left),top:parseFloat(t.style.top)})),t.controlbar.style.pointerEvents="inherit",l.length&&l.forEach(function(e){e.style.pointerEvents="inherit"})})}),a.disable&&(e.style.pointerEvents="none")}),t},emptyNode:function(e){for(;e.firstChild;)e.removeChild(e.firstChild);return e},extend:function(e){if("[object Object]"===Object.prototype.toString.call(e))for(var t in e)e.hasOwnProperty(t)&&(this.extensions[t]=e[t])},fetch:function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(obj){var conf=obj.options.contentFetch,confDefaults={bodyMethod:"text",evalscripttags:!0,autoresize:!0,autoreposition:!0,done:function(e,t){e.content.innerHTML=t}};conf="string"==typeof conf?Object.assign({resource:obj.options.contentFetch},confDefaults):Object.assign(confDefaults,conf);var fetchInit=conf.fetchInit||{};conf.beforeSend&&conf.beforeSend.call(obj,obj),fetch(conf.resource,fetchInit).then(function(e){if(e.ok)return e[conf.bodyMethod]();throw new Error("Network response was not ok.")}).then(function(response){if(conf.done.call(obj,obj,response),conf.evalscripttags){var scripttags=response.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi);scripttags&&scripttags.forEach(function(tag){var js=tag.replace(/<script\b[^>]*>/i,"").replace(/<\/script>/i,"").trim();eval(js)})}var oContentSize=obj.options.contentSize;if(conf.autoresize||conf.autoreposition)if("string"==typeof oContentSize&&oContentSize.match(/auto/i)){var parts=oContentSize.split(" "),sizes=Object.assign({},{width:parts[0],height:parts[1]});conf.autoresize&&obj.resize(sizes),!obj.classList.contains("jsPanel-contextmenu")&&conf.autoreposition&&obj.reposition()}else if("object"===("undefined"==typeof oContentSize?"undefined":_typeof(oContentSize))&&("auto"===oContentSize.width||"auto"===oContentSize.height)){var _sizes2=Object.assign({},oContentSize);conf.autoresize&&obj.resize(_sizes2),!obj.classList.contains("jsPanel-contextmenu")&&conf.autoreposition&&obj.reposition()}}).catch(function(e){console.error("There has been a problem with your fetch operation: "+e.message)})}),front:function(e){if("minimized"===e.status)"maximized"===e.statusBefore?e.maximize():e.normalize();else{var t=Array.prototype.slice.call(document.querySelectorAll(".jsPanel-standard")).map(function(e){return e.style.zIndex});Math.max.apply(Math,_toConsumableArray(t))>e.style.zIndex&&(e.style.zIndex=jsPanel.zi.next()),this.resetZi()}this.getPanels().forEach(function(e,t){var n=e.content.querySelector(".jsPanel-iframe-overlay");if(!(0<t))n&&e.content.removeChild(n);else if(e.content.querySelector("iframe")&&!n){var a=document.createElement("div");a.className="jsPanel-iframe-overlay",e.content.appendChild(a)}})},getPanels:function(){var e=0<arguments.length&&arguments[0]!==void 0?arguments[0]:function(){return this.classList.contains("jsPanel-standard")};return Array.prototype.slice.call(document.querySelectorAll(".jsPanel")).filter(function(t){return e.call(t,t)}).sort(function(e,t){return t.style.zIndex-e.style.zIndex})},hslToRgb:function(e,t,n){var a=Math.round,o=void 0,i=void 0,l=void 0;if(0===t)o=i=l=n;else{var s=function(e,n,a){return 0>a&&(a+=1),1<a&&(a-=1),a<1/6?e+6*(n-e)*a:a<1/2?n:a<2/3?e+6*((n-e)*(2/3-a)):e},r=.5>n?n*(1+t):n+t-n*t,d=2*n-r;o=s(d,r,e+1/3),i=s(d,r,e),l=s(d,r,e-1/3)}return[a(255*o),a(255*i),a(255*l)]},lighten:function(e,t){var n=this.color(e).hsl,a=parseFloat(n.l);return"hsl("+n.h+","+n.s+","+(a+(100-a)*t+"%")+")"},perceivedBrightness:function(e){var t=this.color(e).rgb;return .2627*(t.r/255)+.678*(t.g/255)+.0593*(t.b/255)},pOcontainer:function(e,t){if(e){var n;if("string"==typeof e?n=document.querySelector(e):1===e.nodeType?n=e:e.length&&(n=e[0]),n&&1===n.nodeType)return n}var a=new jsPanelError("NO NEW PANEL CREATED!\nThe container to append the panel to does not exist or a container was not specified!");try{throw a}catch(n){t&&t.call(n,n)}return a},pOcontainment:function(e){if("number"==typeof e)return[e,e,e,e];if(Array.isArray(e)){if(1===e.length)return[e[0],e[0],e[0],e[0]];if(2===e.length)return e.concat(e);3===e.length&&(e[3]=e[1])}return e},pOsize:function(e,t){var n=t||this.defaults.contentSize,a=e.parentElement;if("string"==typeof n){var o=n.trim().split(" ");n={},n.width=o[0],n.height=2===o.length?o[1]:o[0]}else n.width&&!n.height?n.height=n.width:n.height&&!n.width&&(n.width=n.height);if((n.width+"").match(/^[0-9.]+$/gi))n.width+="px";else if(!("string"==typeof n.width&&n.width.endsWith("%")))"function"==typeof n.width&&(n.width=n.width.call(e,e),"number"==typeof n.width?n.width+="px":"string"==typeof n.width&&n.width.match(/^[0-9.]+$/gi)&&(n.width+="px"));else if(a===document.body)n.width=window.innerWidth*(parseFloat(n.width)/100)+"px";else{var i=window.getComputedStyle(a),l=parseFloat(i.borderLeftWidth)+parseFloat(i.borderRightWidth);n.width=(parseFloat(i.width)-l)*(parseFloat(n.width)/100)+"px"}if((n.height+"").match(/^[0-9.]+$/gi))n.height+="px";else if(!("string"==typeof n.height&&n.height.endsWith("%")))"function"==typeof n.height&&(n.height=n.height.call(e,e),"number"==typeof n.height?n.height+="px":"string"==typeof n.height&&n.height.match(/^[0-9.]+$/gi)&&(n.height+="px"));else if(a===document.body)n.height=window.innerHeight*(parseFloat(n.height)/100)+"px";else{var s=window.getComputedStyle(a),r=parseFloat(s.borderTopWidth)+parseFloat(s.borderBottomWidth);n.height=(parseFloat(s.height)-r)*(parseFloat(n.height)/100)+"px"}return n},pOposition:function(e){var t=e.match(/\b[a-z]{4,6}-{1}[a-z]{3,6}\b/i),n=e.match(/down|up|right([^-]|$)|left([^-]|$)/i),a=e.match(/[+-]?\d?\.?\d+([a-z%]{2,4}\b|%?)/gi),o=void 0;return o=t?{my:t[0].toLowerCase(),at:t[0].toLowerCase()}:{my:"center",at:"center"},n&&(o.autoposition=n[0].toLowerCase()),a&&(a.forEach(function(e,t){e.match(/^[+-]?[0-9]*$/)&&(a[t]+="px"),a[t]=a[t].toLowerCase()}),1===a.length?(o.offsetX=a[0],o.offsetY=a[0]):(o.offsetX=a[0],o.offsetY=a[1])),o},position:function(e,t){var n,a,o,i={left:0,top:0},l=0,s=0,r=0,d=0,c={my:"center",at:"center",of:"window",offsetX:"0px",offsetY:"0px"},h={width:document.documentElement.clientWidth,height:window.innerHeight},p=pageXOffset,m=pageYOffset;if(n="string"==typeof e?document.querySelector(e):e,!t)return n.style.opacity=1,n;var f=n.getBoundingClientRect();a="string"==typeof t?Object.assign({},c,jsPanel.pOposition(t)):Object.assign({},c,t);var g=n.parentElement,u=window.getComputedStyle(g),b=g.getBoundingClientRect(),y=g.tagName.toLowerCase();if(a.of&&"window"!==a.of&&("string"==typeof a.of?o=document.querySelector(a.of):o=a.of),a.my.match(/^center-top$|^center$|^center-bottom$/i)?l=f.width/2:a.my.match(/right/i)&&(l=f.width),a.my.match(/^left-center$|^center$|^right-center$/i)?s=f.height/2:a.my.match(/bottom/i)&&(s=f.height),"body"===y&&"window"===a.of)a.at.match(/^center-top$|^center$|^center-bottom$/i)?r=h.width/2:a.at.match(/right/i)&&(r=h.width),a.at.match(/^left-center$|^center$|^right-center$/i)?d=h.height/2:a.at.match(/bottom/i)&&(d=h.height),i.left=r-l-parseFloat(u.borderLeftWidth),i.top=d-s-parseFloat(u.borderTopWidth),n.style.position="fixed";else if("body"===y&&"window"!==a.of){var v=o.getBoundingClientRect();r=a.at.match(/^center-top$|^center$|^center-bottom$/i)?v.width/2+v.left+p:a.at.match(/right/i)?v.width+v.left+p:v.left+p,d=a.at.match(/^left-center$|^center$|^right-center$/i)?v.height/2+v.top+m:a.at.match(/bottom/i)?v.height+v.top+m:v.top+m,i.left=r-l-parseFloat(u.borderLeftWidth),i.top=d-s-parseFloat(u.borderTopWidth)}else if("body"!==y&&("window"===a.of||!a.of)){var z=parseFloat(u.borderLeftWidth)+parseFloat(u.borderRightWidth),w=parseFloat(u.borderTopWidth)+parseFloat(u.borderBottomWidth);a.at.match(/^center-top$|^center$|^center-bottom$/i)?r=b.width/2-z/2:a.at.match(/right/i)&&(r=b.width-z),a.at.match(/^left-center$|^center$|^right-center$/i)?d=b.height/2-w/2:a.at.match(/bottom/i)&&(d=b.height-w),i.left=r-l,i.top=d-s}else if("body"!==y&&g.contains(o)){var x=o.getBoundingClientRect();r=a.at.match(/^center-top$|^center$|^center-bottom$/i)?x.left-b.left+x.width/2:a.at.match(/right/i)?x.left-b.left+x.width:x.left-b.left,d=a.at.match(/^left-center$|^center$|^right-center$/i)?x.top-b.top+x.height/2:a.at.match(/bottom/i)?x.top-b.top+x.height:x.top-b.top,i.left=r-l-parseFloat(u.borderLeftWidth),i.top=d-s-parseFloat(u.borderTopWidth)}if(a.autoposition&&a.my===a.at&&0<=["left-top","center-top","right-top","left-bottom","center-bottom","right-bottom"].indexOf(a.my)){var C=a.my+"-"+a.autoposition.toLowerCase();n.classList.add(C);var E=Array.prototype.slice.call(document.querySelectorAll("."+C)),j=E.indexOf(n);1<E.length&&("down"===a.autoposition?E.forEach(function(e,t){0<t&&t<=j&&(i.top+=E[--t].getBoundingClientRect().height+jsPanel.autopositionSpacing)}):"up"===a.autoposition?E.forEach(function(e,t){0<t&&t<=j&&(i.top-=E[--t].getBoundingClientRect().height+jsPanel.autopositionSpacing)}):"right"===a.autoposition?E.forEach(function(e,t){0<t&&t<=j&&(i.left+=E[--t].getBoundingClientRect().width+jsPanel.autopositionSpacing)}):"left"===a.autoposition&&E.forEach(function(e,t){0<t&&t<=j&&(i.left-=E[--t].getBoundingClientRect().width+jsPanel.autopositionSpacing)}))}if(i.left+="px",i.top+="px",n.style.left=i.left,n.style.top=i.top,a.offsetX&&(n.style.left="number"==typeof a.offsetX?"calc("+i.left+" + "+a.offsetX+"px)":"calc("+i.left+" + "+a.offsetX+")",i.left=window.getComputedStyle(n).left),a.offsetY&&(n.style.top="number"==typeof a.offsetY?"calc("+i.top+" + "+a.offsetY+"px)":"calc("+i.top+" + "+a.offsetY+")",i.top=window.getComputedStyle(n).top),a.minLeft){var P=parseFloat(i.left);"number"==typeof a.minLeft&&(a.minLeft+="px"),n.style.left=a.minLeft;var S=parseFloat(window.getComputedStyle(n).left);P>S&&(n.style.left=P+"px"),i.left=window.getComputedStyle(n).left}if(a.maxLeft){var T=parseFloat(i.left);"number"==typeof a.maxLeft&&(a.maxLeft+="px"),n.style.left=a.maxLeft;var L=parseFloat(window.getComputedStyle(n).left);T<L&&(n.style.left=T+"px"),i.left=window.getComputedStyle(n).left}if(a.maxTop){var k=parseFloat(i.top);"number"==typeof a.maxTop&&(a.maxTop+="px"),n.style.top=a.maxTop;var q=parseFloat(window.getComputedStyle(n).top);k<q&&(n.style.top=k+"px"),i.top=window.getComputedStyle(n).top}if(a.minTop){var A=parseFloat(i.top);"number"==typeof a.minTop&&(a.minTop+="px"),n.style.top=a.minTop;var W=parseFloat(window.getComputedStyle(n).top);A>W&&(n.style.top=A+"px"),i.top=window.getComputedStyle(n).top}if("function"==typeof a.modify){var R=a.modify.call(i,i);n.style.left=R.left,n.style.top=R.top}return n.style.opacity=1,n.style.left=window.getComputedStyle(n).left,n.style.top=window.getComputedStyle(n).top,n},processCallbacks:function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"some",a=arguments[3];return"function"==typeof t&&(t=[t]),n?t[n](function(t){if("function"==typeof t)return t.call(e,e,a)}):void t.forEach(function(t){t.call(e,e,a)})},rgbToHsl:function(e,t,n){e/=255,t/=255,n/=255;var a,o,i=Math.max(e,t,n),s=Math.min(e,t,n),r=(i+s)/2;if(i===s)a=o=0;else{var l=i-s;o=.5<r?l/(2-i-s):l/(i+s),i===e?a=(t-n)/l+(t<n?6:0):i===t?a=(n-e)/l+2:i===n?a=(e-t)/l+4:void 0,a/=6}return a*=360,o=100*o+"%",r=100*r+"%",{css:"hsl("+a+","+o+","+r+")",h:a,s:o,l:r}},rgbToHex:function(e,t,n){var a=(+e).toString(16),o=(+t).toString(16),i=(+n).toString(16);return 1===a.length&&(a="0"+a),1===o.length&&(o="0"+o),1===i.length&&(i="0"+i),"#"+a+o+i},removeSnapAreas:function(e){document.querySelectorAll(".jsPanel-snap-area").forEach(function(t){e.parentElement&&e.parentElement.removeChild(t)})},resetZi:function(){this.zi=function(){var e=0<arguments.length&&arguments[0]!==void 0?arguments[0]:jsPanel.ziBase,t=e;return{next:function(){return t++}}}(),Array.prototype.slice.call(document.querySelectorAll(".jsPanel-standard")).sort(function(e,t){return e.style.zIndex-t.style.zIndex}).forEach(function(e){e.style.zIndex=jsPanel.zi.next()})},resizeit:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n=Object.assign({},this.defaults.resizeit,e),a=t.parentElement,o=a.tagName.toLowerCase(),i="function"==typeof n.maxWidth?n.maxWidth():n.maxWidth||1e4,l="function"==typeof n.maxHeight?n.maxHeight():n.maxHeight||1e4,s="function"==typeof n.minWidth?n.minWidth():n.minWidth,r="function"==typeof n.minHeight?n.minHeight():n.minHeight,d=new CustomEvent("jspanelresizestart",{detail:t.id}),c=new CustomEvent("jspanelresize",{detail:t.id}),p=new CustomEvent("jspanelresizestop",{detail:t.id}),m=void 0,f=void 0,g=void 0,u=void 0,b=void 0,h=[];return m=this.pOcontainment(n.containment),n.handles.split(",").forEach(function(e){var n=document.createElement("DIV");n.className="jsPanel-resizeit-handle jsPanel-resizeit-"+e.trim(),n.style.zIndex=90,t.append(n)}),t.querySelectorAll(".jsPanel-resizeit-handle").forEach(function(e){jsPanel.pointerdown.forEach(function(p){e.addEventListener(p,function(p){p.preventDefault(),h=document.querySelectorAll("iframe"),h.length&&h.forEach(function(e){e.style.pointerEvents="none"});var e=t.getBoundingClientRect(),y=a.getBoundingClientRect(),v=window.getComputedStyle(a,null),z=parseInt(v.borderLeftWidth,10),w=parseInt(v.borderTopWidth,10),x=v.getPropertyValue("position"),C=p.clientX||p.touches[0].clientX,E=p.clientY||p.touches[0].clientY,j=e.width,P=e.height,S=p.target.classList,T=e.left,L=e.top,k=1e4,q=1e4,A=1e4,W=1e4;t.content.style.pointerEvents="none","body"!==o&&(T=e.left-y.left+a.scrollLeft,L=e.top-y.top+a.scrollTop),"body"===o&&m?(k=document.documentElement.clientWidth-e.left,A=document.documentElement.clientHeight-e.top,q=e.width+e.left,W=e.height+e.top):m&&("static"===x?(k=y.width-e.left+z,A=y.height+y.top-e.top+w,q=e.width+(e.left-y.left)-z,W=e.height+(e.top-y.top)-w):(k=a.clientWidth-(e.left-y.left)+z,A=a.clientHeight-(e.top-y.top)+w,q=e.width+(e.left-y.left)-z,W=t.clientHeight+(e.top-y.top)-w)),m&&(q-=m[3],W-=m[0],k-=m[1],A-=m[2]);var R=window.getComputedStyle(t),B=parseFloat(R.width)-e.width,H=parseFloat(R.height)-e.height,M=parseFloat(R.left)-e.left,O=parseFloat(R.top)-e.top;a!==document.body&&(M+=y.left,O+=y.top),f=function(e){g||(document.dispatchEvent(d),n.start&&jsPanel.processCallbacks(t,n.start,!1,{width:j,height:P}),jsPanel.front(t)),g=1,document.dispatchEvent(c),(S.contains("jsPanel-resizeit-e")||S.contains("jsPanel-resizeit-se")||S.contains("jsPanel-resizeit-ne"))&&(u=j+(e.clientX||e.touches[0].clientX)-C+B,u>=k&&(u=k),u>=i?u=i:u<=s&&(u=s),t.style.width=u+"px"),(S.contains("jsPanel-resizeit-s")||S.contains("jsPanel-resizeit-se")||S.contains("jsPanel-resizeit-sw"))&&(b=P+(e.clientY||e.touches[0].clientY)-E+H,b>=A&&(b=A),b>=l?b=l:b<=r&&(b=r),t.style.height=b+"px"),(S.contains("jsPanel-resizeit-w")||S.contains("jsPanel-resizeit-nw")||S.contains("jsPanel-resizeit-sw"))&&(u=j+C-(e.clientX||e.touches[0].clientX)+B,u<=i&&u>=s&&u<=q&&(t.style.left=T+(e.clientX||e.touches[0].clientX)-C+M+"px"),u>=q&&(u=q),u>=i?u=i:u<=s&&(u=s),t.style.width=u+"px"),(S.contains("jsPanel-resizeit-n")||S.contains("jsPanel-resizeit-nw")||S.contains("jsPanel-resizeit-ne"))&&(b=P+E-(e.clientY||e.touches[0].clientY)+H,b<=l&&b>=r&&b<=W&&(t.style.top=L+(e.clientY||e.touches[0].clientY)-E+O+"px"),b>=W&&(b=W),b>=l?b=l:b<=r&&(b=r),t.style.height=b+"px"),t&&t.contentResize(),window.getSelection().removeAllRanges();var a=window.getComputedStyle(t),o={left:parseFloat(a.left),top:parseFloat(a.top),right:parseFloat(a.right),bottom:parseFloat(a.bottom),width:parseFloat(a.width),height:parseFloat(a.height)};n.resize&&jsPanel.processCallbacks(t,n.resize,!1,o)},jsPanel.pointermove.forEach(function(e){document.addEventListener(e,f,!1)}),window.addEventListener("mouseout",function(t){null===t.relatedTarget&&jsPanel.pointermove.forEach(function(e){document.removeEventListener(e,f,!1)})},!1)})})}),jsPanel.pointerup.forEach(function(e){document.addEventListener(e,function(a){if(jsPanel.pointermove.forEach(function(e){document.removeEventListener(e,f,!1)}),a.target.classList&&a.target.classList.contains("jsPanel-resizeit-handle")){var e,o,i=a.target.className;if(i.match(/jsPanel-resizeit-nw|jsPanel-resizeit-w|jsPanel-resizeit-sw/i)&&(e=!0),i.match(/jsPanel-resizeit-nw|jsPanel-resizeit-n|jsPanel-resizeit-ne/i)&&(o=!0),n.grid&&Array.isArray(n.grid)){1===n.grid.length&&(n.grid[1]=n.grid[0]);var l=parseFloat(t.style.width),s=parseFloat(t.style.height),r=l%n.grid[0],d=s%n.grid[1],c=parseFloat(t.style.left),m=parseFloat(t.style.top),u=c%n.grid[0],b=m%n.grid[1];t.style.width=r<n.grid[0]/2?l-r+"px":l+(n.grid[0]-r)+"px",t.style.height=d<n.grid[1]/2?s-d+"px":s+(n.grid[1]-d)+"px",e&&(u<n.grid[0]/2?t.style.left=c-u+"px":t.style.left=c+(n.grid[0]-u)+"px"),o&&(b<n.grid[1]/2?t.style.top=m-b+"px":t.style.top=m+(n.grid[1]-b)+"px")}t&&t.contentResize()}g&&(t.content.style.pointerEvents="inherit",document.dispatchEvent(p),g=void 0,t.saveCurrentDimensions(),t.saveCurrentPosition(),n.stop&&jsPanel.processCallbacks(t,n.stop,!1,{width:parseFloat(t.style.width),height:parseFloat(t.style.height)})),h.length&&h.forEach(function(e){e.style.pointerEvents="inherit"})},!1)}),n.disable&&t.querySelectorAll(".jsPanel-resizeit-handle").forEach(function(e){e.style.pointerEvents="none"}),t},setClass:function(e,t){return t.split(" ").forEach(function(t){return e.classList.add(t)}),e},remClass:function(e,t){return t.split(" ").forEach(function(t){return e.classList.remove(t)}),e},setStyle:function(e,t){for(var n in t)if(t.hasOwnProperty(n)){var a=(n+"").replace(/-\w/gi,function(e){return e.substr(-1).toUpperCase()});e.style[a]=t[n]}return e},snapPanel:function(e,t){if(e.currentData.beforeSnap={width:e.currentData.width,height:e.currentData.height},t&&"function"==typeof t)t.call(e,e,e.snappableTo);else if(!1!==t){var n=[0,0];if(e.options.dragit.snap.containment&&e.options.dragit.containment){var a=this.pOcontainment(e.options.dragit.containment),o=e.snappableTo;o.startsWith("left")?n[0]=a[3]:o.startsWith("right")&&(n[0]=-a[1]),o.endsWith("top")?n[1]=a[0]:o.endsWith("bottom")&&(n[1]=-a[2])}e.reposition(e.snappableTo+" "+n[0]+" "+n[1]),e.snapped=e.snappableTo}},create:function(){var e=this,n=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1];jsPanel.zi||(jsPanel.zi=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:jsPanel.ziBase,t=e;return{next:function(){return t++}}}());var a;n.config?(n=Object.assign({},this.defaults,n.config,n),delete n.config):n=Object.assign({},this.defaults,n),n.id?"function"==typeof n.id&&(n.id=n.id()):n.id="jsPanel-"+(jsPanel.idCounter+=1);var o=document.getElementById(n.id);if(null!==o){o.classList.contains("jsPanel")&&o.front();var i=new jsPanelError("NO NEW PANEL CREATED!\nAn element with the ID <"+n.id+"> already exists in the document.");try{throw i}catch(n){t&&t.call(n,n)}return console.error(i.name+":",i.message)}var l=this.pOcontainer(n.container,t);if(l&&l.message)return console.error(l.name+":",l.message);n.maximizedMargin=this.pOcontainment(n.maximizedMargin),n.dragit&&(["start","drag","stop"].forEach(function(e){n.dragit[e]?"function"==typeof n.dragit[e]&&(n.dragit[e]=[n.dragit[e]]):n.dragit[e]=[]}),n.dragit.snap&&("object"===_typeof(n.dragit.snap)?n.dragit.snap=Object.assign({},this.defaultSnapConfig,n.dragit.snap):n.dragit.snap=this.defaultSnapConfig)),n.resizeit&&["start","resize","stop"].forEach(function(e){n.resizeit[e]?"function"==typeof n.resizeit[e]&&(n.resizeit[e]=[n.resizeit[e]]):n.resizeit[e]=[]}),["onbeforeclose","onbeforemaximize","onbeforeminimize","onbeforenormalize","onbeforesmallify","onbeforeunsmallify","onclosed","onfronted","onmaximized","onminimized","onnormalized","onsmallified","onstatuschange","onunsmallified"].forEach(function(e){n[e]?"function"==typeof n[e]&&(n[e]=[n[e]]):n[e]=[]}),n.headerRemove&&(n.header=!1);var s=n.template?n.template:this.createPanelTemplate();s.options=n,s.status="initialized",s.currentData={},s.header=s.querySelector(".jsPanel-hdr"),s.headerbar=s.header.querySelector(".jsPanel-headerbar"),s.titlebar=s.header.querySelector(".jsPanel-titlebar"),s.headerlogo=s.headerbar.querySelector(".jsPanel-headerlogo"),s.headertitle=s.headerbar.querySelector(".jsPanel-title"),s.controlbar=s.headerbar.querySelector(".jsPanel-controlbar"),s.headertoolbar=s.header.querySelector(".jsPanel-hdr-toolbar"),s.content=s.querySelector(".jsPanel-content"),s.footer=s.querySelector(".jsPanel-ftr"),s.snappableTo=!1,s.snapped=!1;var r=new CustomEvent("jspanelloaded",{detail:n.id}),d=new CustomEvent("jspanelbeforeclose",{detail:n.id}),c=new CustomEvent("jspanelclosed",{detail:n.id}),h=new CustomEvent("jspanelstatuschange",{detail:n.id}),p=new CustomEvent("jspanelbeforenormalize",{detail:n.id}),m=new CustomEvent("jspanelnormalized",{detail:n.id}),f=new CustomEvent("jspanelbeforemaximize",{detail:n.id}),g=new CustomEvent("jspanelmaximized",{detail:n.id}),u=new CustomEvent("jspanelbeforeminimize",{detail:n.id}),b=new CustomEvent("jspanelminimized",{detail:n.id}),y=new CustomEvent("jspanelbeforesmallify",{detail:n.id}),v=new CustomEvent("jspanelsmallified",{detail:n.id}),z=new CustomEvent("jspanelsmallifiedmax",{detail:n.id}),w=new CustomEvent("jspanelbeforeunsmallify",{detail:n.id}),x=new CustomEvent("jspanelfronted",{detail:n.id}),C=s.querySelector(".jsPanel-btn-close"),E=s.querySelector(".jsPanel-btn-maximize"),j=s.querySelector(".jsPanel-btn-normalize"),P=s.querySelector(".jsPanel-btn-smallify"),S=s.querySelector(".jsPanel-btn-smallifyrev"),T=s.querySelector(".jsPanel-btn-minimize");C&&jsPanel.pointerup.forEach(function(e){C.addEventListener(e,function(t){t.preventDefault(),s.close()})}),E&&jsPanel.pointerup.forEach(function(e){E.addEventListener(e,function(t){t.preventDefault(),s.maximize()})}),j&&jsPanel.pointerup.forEach(function(e){j.addEventListener(e,function(t){t.preventDefault(),s.normalize()})}),P&&jsPanel.pointerup.forEach(function(e){P.addEventListener(e,function(t){t.preventDefault(),s.smallify()})}),S&&jsPanel.pointerup.forEach(function(e){S.addEventListener(e,function(t){t.preventDefault(),s.unsmallify()})}),T&&jsPanel.pointerup.forEach(function(e){T.addEventListener(e,function(t){t.preventDefault(),s.minimize()})});var L=jsPanel.extensions;for(var k in L)L.hasOwnProperty(k)&&(s[k]=L[k]);if(s.addToolbar=function(e,t,n){if("header"===e?e=s.headertoolbar:"footer"===e&&(e=s.footer),"string"==typeof t)e.innerHTML=t;else if(Array.isArray(t))t.forEach(function(t){"string"==typeof t?e.innerHTML+=t:e.append(t)});else if("function"==typeof t){var a=t.call(s,s);"string"==typeof a?e.innerHTML=a:e.append(a)}else e.append(t);return e.classList.add("active"),e===s.footer&&s.content.classList.remove("jsPanel-content-nofooter"),s.contentResize(),n&&n.call(s,s),s},s.applyBuiltInTheme=function(e){return s.classList.add("jsPanel-theme-"+e.color),s.header.classList.add("jsPanel-theme-"+e.color),e.filling&&(s.content.style.background="",s.content.classList.add("jsPanel-content-"+e.filling)),n.headerToolbar||(s.content.style.background="",s.content.style.borderTop="1px solid "+s.headertitle.style.color),s},s.applyArbitraryTheme=function(e){return s.header.style.backgroundColor=e.colors[0],[".jsPanel-headerlogo",".jsPanel-title",".jsPanel-hdr-toolbar"].forEach(function(t){s.querySelector(t).style.color=e.colors[3]},s),s.querySelectorAll(".jsPanel-controlbar .jsPanel-btn").forEach(function(t){t.style.color=e.colors[3]}),n.headerToolbar?jsPanel.setStyle(s.headertoolbar,{boxShadow:"0 0 1px "+e.colors[3]+" inset",width:"calc(100% + 4px)",marginLeft:"-1px"}):s.content.style.borderTop="1px solid "+e.colors[3],"filled"===e.filling?(s.content.style.backgroundColor=e.colors[0],s.content.style.color=e.colors[3]):"filledlight"===e.filling&&(s.content.style.backgroundColor=e.colors[1]),s},s.applyBootstrapTheme=function(e){var t=e.bstheme,n=$.fn.button.Constructor.VERSION[0];if("4"===n?s.classList.add("bg-"+t):(["panel","panel-"+t].forEach(function(e){s.classList.add(e)}),s.header.classList.add("panel-heading")),"mdb"===e.bs){var a=t+"-color";e.mdbStyle&&(a+="-dark"),s.classList.add(a)}var o="4"===n?window.getComputedStyle(s).backgroundColor.replace(/\s+/g,""):window.getComputedStyle(s.header).backgroundColor.replace(/\s+/g,"");var i=jsPanel.calcColors(o);return s.header.style.color=i[3],e.filling?s.setTheme(o+" "+e.filling):s.setTheme(o),s},s.applyThemeBorder=function(e){var t=n.border.split(" ");if(s.style.borderWidth=t[0],s.style.borderStyle=t[1],s.style.borderColor=t[2],!e.bs)-1===jsPanel.themes.indexOf(e.color)&&(t[2]?s.style.borderColor=t[2]:s.style.borderColor=e.colors[0]);else{var a;a="transparent"===window.getComputedStyle(s.header).backgroundColor?window.getComputedStyle(s).backgroundColor.replace(/\s+/g,""):window.getComputedStyle(s.header).backgroundColor.replace(/\s+/g,""),s.style.borderColor=t[2]?t[2]:a}return s},s.autopositionRemaining=function(){var e;["left-top-down","left-top-right","center-top-down","right-top-down","right-top-left","left-bottom-up","left-bottom-right","center-bottom-up","right-bottom-up","right-bottom-left"].forEach(function(t){s.classList.contains(t)&&(e=t)}),e&&n.container.querySelectorAll("."+e).forEach(function(e){e.reposition()})},s.calcSizeFactors=function(){var e=window.getComputedStyle(s);if(n.container===document.body)s.hf=parseFloat(s.style.left)/(document.body.clientWidth-parseFloat(s.style.width)),s.vf=parseFloat(s.style.top)/(window.innerHeight-parseFloat(e.height));else{var t=window.getComputedStyle(s.parentElement);s.hf=parseFloat(s.style.left)/(parseFloat(t.width)-parseFloat(s.style.width)),s.vf=parseFloat(s.style.top)/(parseFloat(t.height)-parseFloat(e.height))}},s.clearTheme=function(e){return jsPanel.themes.concat(jsPanel.mdbthemes).forEach(function(e){["panel","jsPanel-theme-"+e,"panel-"+e,e+"-color"].forEach(function(e){s.classList.remove(e)}),s.header.classList.remove("panel-heading","jsPanel-theme-"+e)},s),s.headertitle.classList.remove("panel-title"),s.content.classList.remove("panel-body","jsPanel-content-filled","jsPanel-content-filledlight"),s.footer.classList.remove("panel-footer"),jsPanel.setStyle(s,{backgroundColor:"",borderWidth:"",borderStyle:"",borderColor:""}),jsPanel.setStyle(s.content,{background:"",border:""}),jsPanel.setStyle(s.headertoolbar,{boxShadow:"",width:"",marginLeft:""}),s.header.style.background="",Array.prototype.slice.call(s.controlbar.querySelectorAll(".jsPanel-icon")).concat([s.headerlogo,s.headertitle,s.headertoolbar,s.content]).forEach(function(e){e.style.color=""}),e&&e.call(s,s),s},s.close=function(e){var t=function(){var t=n.id;return a&&window.clearTimeout(a),s.closeChildpanels(),s.parentElement&&s.parentElement.removeChild(s),!document.getElementById(t)&&void(s.removeMinimizedReplacement(),document.dispatchEvent(c),e&&e.call(t,t),n.onclosed&&jsPanel.processCallbacks(s,n.onclosed,"every"),s.autopositionRemaining())};return document.dispatchEvent(d),n.onbeforeclose&&0<n.onbeforeclose.length&&!jsPanel.processCallbacks(s,n.onbeforeclose)?s:void(n.animateOut?(n.animateIn&&jsPanel.remClass(s,n.animateIn),jsPanel.setClass(s,n.animateOut),s.addEventListener("animationend",function(){t()})):t())},s.closeChildpanels=function(e){return s.getChildpanels().forEach(function(e){return e.close()}),e&&e.call(s,s),s},s.contentRemove=function(e){return jsPanel.emptyNode(s.content),e&&e.call(s,s),s},s.contentResize=function(e){var t=window.getComputedStyle(s),a=window.getComputedStyle(s.header),o=window.getComputedStyle(s.footer),i=n.header?a.height:0,l="none"===o.display?0:o.height,r=parseFloat(t.height)-parseFloat(i)-parseFloat(l)-parseFloat(t.borderTopWidth)-parseFloat(t.borderBottomWidth);return s.content.style.height=r+"px",e&&e.call(s,s),s},s.createMinimizedReplacement=function(){var e=jsPanel.createMinimizedTemplate(),t=window.getComputedStyle(s.headertitle).color,a=n.iconfont,o=e.querySelector(".jsPanel-controlbar");return e.style.backgroundColor="transparent"===window.getComputedStyle(s.header).backgroundColor?window.getComputedStyle(s).backgroundColor:window.getComputedStyle(s.header).backgroundColor,e.id=s.id+"-min",e.querySelector(".jsPanel-headerbar").replaceChild(s.headerlogo.cloneNode(!0),e.querySelector(".jsPanel-headerlogo")),e.querySelector(".jsPanel-titlebar").replaceChild(s.headertitle.cloneNode(!0),e.querySelector(".jsPanel-title")),e.querySelector(".jsPanel-title").style.color=t,o.style.color=t,s.setIconfont(a,e),"enabled"===s.dataset.btnnormalize?jsPanel.pointerup.forEach(function(t){e.querySelector(".jsPanel-btn-normalize").addEventListener(t,function(){s.normalize().removeMinimizedReplacement()})}):o.querySelector(".jsPanel-btn-normalize").style.display="none","enabled"===s.dataset.btnmaximize?jsPanel.pointerup.forEach(function(t){e.querySelector(".jsPanel-btn-maximize").addEventListener(t,function(){s.maximize().removeMinimizedReplacement()})}):o.querySelector(".jsPanel-btn-maximize").style.display="none","enabled"===s.dataset.btnclose?jsPanel.pointerup.forEach(function(t){e.querySelector(".jsPanel-btn-close").addEventListener(t,function(){s.removeMinimizedReplacement().close()})}):o.querySelector(".jsPanel-btn-close").style.display="none",e},s.dragit=function(e){var t=Object.assign({},jsPanel.defaults.dragit,n.dragit),a=s.querySelectorAll(t.handles);return"disable"===e?a.forEach(function(e){e.style.pointerEvents="none"}):a.forEach(function(e){e.style.pointerEvents="auto"}),s},s.front=function(e){var t=!(1<arguments.length&&void 0!==arguments[1])||arguments[1];return jsPanel.front(s),document.dispatchEvent(x),e&&e.call(s,s),n.onfronted&&t&&jsPanel.processCallbacks(s,n.onfronted,"every"),s},s.getChildpanels=function(){return Array.prototype.slice.call(s.content.querySelectorAll(".jsPanel"))},s.getThemeDetails=function(e){var t=e.toLowerCase().replace(/ /g,""),n={color:!1,colors:!1,filling:!1,bs:!1,bstheme:!1};if("filled"===t.substr(-6,6)?(n.filling="filled",n.color=t.substr(0,t.length-6)):"filledlight"===t.substr(-11,11)?(n.filling="filledlight",n.color=t.substr(0,t.length-11)):(n.filling="",n.color=t),n.colors=jsPanel.calcColors(n.color),n.color.match("-")){var a=n.color.split("-");n.bs=a[0],n.bstheme=a[1],n.mdbStyle=a[2]||void 0}return n},s.isChildpanel=function(){var e=s.closest(".jsPanel-content");return!!e&&e.parentElement},s.maximize=function(e){if(n.onbeforemaximize&&0<n.onbeforemaximize.length&&!jsPanel.processCallbacks(s,n.onbeforemaximize))return s;document.dispatchEvent(f);var t=s.parentElement,a=n.maximizedMargin;return t===document.body?(s.style.width=document.documentElement.clientWidth-a[1]-a[3]+"px",s.style.height=document.documentElement.clientHeight-a[0]-a[2]+"px",s.style.left=a[3]+"px",s.style.top=a[0]+"px",!n.position.fixed&&(s.style.left=window.pageXOffset+a[3]+"px",s.style.top=window.pageYOffset+a[0]+"px")):(s.style.width=t.clientWidth-a[1]-a[3]+"px",s.style.height=t.clientHeight-a[0]-a[2]+"px",s.style.left=a[3]+"px",s.style.top=a[0]+"px"),s.contentResize(),s.removeMinimizedReplacement(),s.status="maximized",s.setControls([".jsPanel-btn-maximize",".jsPanel-btn-smallifyrev"]),jsPanel.front(s),document.dispatchEvent(g),document.dispatchEvent(h),n.onstatuschange&&jsPanel.processCallbacks(s,n.onstatuschange,"every"),e&&e.call(s,s),n.onmaximized&&jsPanel.processCallbacks(s,n.onmaximized,"every"),s},s.minimize=function(e){if("minimized"===s.status)return s;if(n.onbeforeminimize&&0<n.onbeforeminimize.length&&!jsPanel.processCallbacks(s,n.onbeforeminimize))return s;if(document.dispatchEvent(u),!document.getElementById("jsPanel-replacement-container")){var t=document.createElement("div");t.id="jsPanel-replacement-container",document.body.append(t)}if(s.style.left="-9999px",s.statusBefore=s.status,s.status="minimized",document.dispatchEvent(b),document.dispatchEvent(h),n.onstatuschange&&jsPanel.processCallbacks(s,n.onstatuschange,"every"),n.minimizeTo){var a=s.createMinimizedReplacement(),o=void 0,i=void 0,l=void 0;"default"===n.minimizeTo?document.getElementById("jsPanel-replacement-container").append(a):"parentpanel"===n.minimizeTo?(i=s.closest(".jsPanel-content").parentElement,l=i.querySelectorAll(".jsPanel-minimized-box"),o=l[l.length-1],o.append(a)):"parent"===n.minimizeTo?(i=s.parentElement,o=i.querySelector(".jsPanel-minimized-container"),!o&&(o=document.createElement("div"),o.className="jsPanel-minimized-container",i.append(o)),o.append(a)):document.querySelector(n.minimizeTo).append(a)}return e&&e.call(s,s),n.onminimized&&jsPanel.processCallbacks(s,n.onminimized,"every"),s},s.normalize=function(e){return"normalized"===s.status?s:n.onbeforenormalize&&0<n.onbeforenormalize.length&&!jsPanel.processCallbacks(s,n.onbeforenormalize)?s:(document.dispatchEvent(p),s.style.width=s.currentData.width,s.style.height=s.currentData.height,s.contentResize(),s.style.left=s.currentData.left,s.style.top=s.currentData.top,s.removeMinimizedReplacement(),s.status="normalized",s.setControls([".jsPanel-btn-normalize",".jsPanel-btn-smallifyrev"]),jsPanel.front(s),document.dispatchEvent(m),document.dispatchEvent(h),n.onstatuschange&&jsPanel.processCallbacks(s,n.onstatuschange,"every"),e&&e.call(s,s),n.onnormalized&&jsPanel.processCallbacks(s,n.onnormalized,"every"),s)},s.removeMinimizedReplacement=function(){var e=document.getElementById(s.id+"-min");return e&&e.parentElement.removeChild(e),s},s.reposition=function(){for(var e=arguments.length,t=Array(e),a=0;a<e;a++)t[a]=arguments[a];var o,i=n.position,l=!0;return t.forEach(function(e){"string"==typeof e||"object"===("undefined"==typeof e?"undefined":_typeof(e))?i=e:"boolean"==typeof e?l=e:"function"==typeof e&&(o=e)}),jsPanel.position(s,i),l&&s.saveCurrentPosition(),o&&o.call(s,s),s},s.repositionOnSnap=function(e){var t="0",a="0",o=jsPanel.pOcontainment(n.dragit.containment);n.dragit.snap.containment&&("left-top"===e?(t=o[3],a=o[0]):"right-top"===e?(t=-o[1],a=o[0]):"right-bottom"===e?(t=-o[1],a=-o[2]):"left-bottom"===e?(t=o[3],a=-o[2]):"center-top"===e?(t=o[3]/2-o[1]/2,a=o[0]):"center-bottom"===e?(t=o[3]/2-o[1]/2,a=-o[2]):"left-center"===e?(t=o[3],a=o[0]/2-o[2]/2):"right-center"==e&&(t=-o[1],a=o[0]/2-o[2]/2)),jsPanel.position(s,e),jsPanel.setStyle(s,{left:"calc("+s.style.left+" + "+t+"px)",top:"calc("+s.style.top+" + "+a+"px)"})},s.resize=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];var a=window.getComputedStyle(s),o={width:a.width,height:a.height},i=!0,l=void 0;t.forEach(function(e){"string"==typeof e?o=e:"object"===("undefined"==typeof e?"undefined":_typeof(e))?o=Object.assign(o,e):"boolean"==typeof e?i=e:"function"==typeof e&&(l=e)});var r=jsPanel.pOsize(s,o);return s.style.width=r.width,s.style.height=r.height,s.contentResize(),i&&s.saveCurrentDimensions(),l&&l.call(s,s),s},s.resizeit=function(e){var t=s.querySelectorAll(".jsPanel-resizeit-handle");return"disable"===e?t.forEach(function(e){e.style.pointerEvents="none"}):t.forEach(function(e){e.style.pointerEvents="auto"}),s},s.saveCurrentDimensions=function(){var e=window.getComputedStyle(s);s.currentData.width=e.width,"normalized"===s.status&&(s.currentData.height=e.height)},s.saveCurrentPosition=function(){var e=window.getComputedStyle(s);s.currentData.left=e.left,s.currentData.top=e.top},s.setControls=function(e,t){return s.header.querySelectorAll(".jsPanel-btn").forEach(function(e){e.style.display="block"}),e.forEach(function(e){var t=s.controlbar.querySelector(e);t&&(t.style.display="none")}),t&&t.call(s,s),s},s.setControlStatus=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"enable",n=arguments[2];if("disable"===t){if("removed"!==s.getAttribute("data-btn"+e)){s.setAttribute("data-btn"+e,"disabled");var a=s.controlbar.querySelector(".jsPanel-btn-"+e);a.style.pointerEvents="none",a.style.opacity=.4,a.style.cursor="default"}}else if("enable"===t){if("removed"!==s.getAttribute("data-btn"+e)){s.setAttribute("data-btn"+e,"enabled");var o=s.controlbar.querySelector(".jsPanel-btn-"+e);o.style.pointerEvents="auto",o.style.opacity=1,o.style.cursor="pointer"}}else if("remove"===t){var i=s.controlbar.querySelector(".jsPanel-btn-"+e);s.controlbar.removeChild(i),s.setAttribute("data-btn"+e,"removed")}return n&&n.call(s,s),s},s.setHeaderControls=function(e){var t=["close","maximize","normalize","minimize","smallify","smallifyrev"],a=n.headerControls;return"string"==typeof a?"none"===a?t.forEach(function(e){s.setControlStatus(e,"remove")}):"closeonly"===a&&t.forEach(function(e){"close"!==e&&s.setControlStatus(e,"remove")}):t.forEach(function(e){a[e]&&s.setControlStatus(e,a[e])}),e&&e.call(s,s),s},s.setHeaderLogo=function(e,t){if("string"!=typeof e)jsPanel.emptyNode(s.headerlogo),s.headerlogo.append(e);else if("<"!==e.substr(0,1)){var n=document.createElement("img");n.style.maxHeight=getComputedStyle(s.headerbar).height,n.src=e,jsPanel.emptyNode(s.headerlogo),s.headerlogo.append(n)}else s.headerlogo.innerHTML=e;return t&&t.call(s,s),s},s.setHeaderRemove=function(e){return s.removeChild(s.header),s.content.classList.add("jsPanel-content-noheader"),["close","maximize","normalize","minimize","smallify","smallifyrev"].forEach(function(e){s.setAttribute("data-btn"+e,"removed")}),e&&e.call(s,s),s},s.setHeaderTitle=function(e,t){return"string"==typeof e?s.headertitle.innerHTML=e:"function"==typeof e?(jsPanel.emptyNode(s.headertitle),s.headertitle.innerHTML=e()):(jsPanel.emptyNode(s.headertitle),s.headertitle.append(e)),t&&t.call(s,s),s},s.setIconfont=function(){var e=!!(0<arguments.length&&void 0!==arguments[0])&&arguments[0],t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:s,n=arguments[2];if(!1!==e){var a,o;if("bootstrap"===e||"glyphicon"===e)a=["glyphicon glyphicon-remove","glyphicon glyphicon-fullscreen","glyphicon glyphicon-resize-full","glyphicon glyphicon-minus","glyphicon glyphicon-chevron-down","glyphicon glyphicon-chevron-up"];else if("fa"===e||"far"===e||"fal"===e||"fas"===e)a=[e+" fa-window-close",e+" fa-window-maximize",e+" fa-window-restore",e+" fa-window-minimize",e+" fa-chevron-down",e+" fa-chevron-up"],s.controlbar.style.padding="6px 0 3px 0";else if("material-icons"===e)a=[e,e,e,e,e,e],o=["close","fullscreen","fullscreen_exit","call_received","expand_more","expand_less"],s.controlbar.style.padding="4px 0 5px 0";else if(Array.isArray(e))a=["custom-control-icon "+e[5],"custom-control-icon "+e[4],"custom-control-icon "+e[3],"custom-control-icon "+e[2],"custom-control-icon "+e[1],"custom-control-icon "+e[0]];else return t;t.querySelectorAll(".jsPanel-controlbar .jsPanel-btn").forEach(function(e){jsPanel.emptyNode(e).innerHTML="<span></span>"}),Array.prototype.slice.call(t.querySelectorAll(".jsPanel-controlbar .jsPanel-btn > span")).reverse().forEach(function(t,n){t.className=a[n],"material-icons"===e&&(t.textContent=o[n])})}return n&&n.call(t,t),t},s.setRtl=function(){[s.header,s.headerbar,s.titlebar,s.controlbar,s.headertoolbar,s.footer].forEach(function(e){e.classList.add("jsPanel-rtl")}),[s.headertitle,s.headertoolbar,s.content,s.footer].forEach(function(e){e.dir="rtl",n.rtl.lang&&(e.lang=n.rtl.lang)})},s.setSize=function(){if(n.panelSize){var e=jsPanel.pOsize(s,n.panelSize);s.style.width=e.width,s.style.height=e.height,s.contentResize()}else if(n.contentSize){var t=jsPanel.pOsize(s,n.contentSize);s.content.style.width=t.width,s.content.style.height=t.height,s.style.width=t.width,s.content.style.width="100%"}return s},s.setTheme=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:n.theme,t=arguments[1];if(s.clearTheme(),"none"===e)return s.style.backgroundColor="#fff",s;var a=s.getThemeDetails(e);return a.bs?s.applyBootstrapTheme(a):-1===jsPanel.themes.indexOf(a.color)?s.applyArbitraryTheme(a):s.applyBuiltInTheme(a),n.border?s.applyThemeBorder(a):(s.style.borderWidth="",s.style.borderStyle="",s.style.borderColor=""),t&&t.call(s,s),s},s.smallify=function(e){if("smallified"===s.status||"smallifiedmax"===s.status)return s;if(n.onbeforesmallify&&0<n.onbeforesmallify.length&&!jsPanel.processCallbacks(s,n.onbeforesmallify))return s;document.dispatchEvent(y),"normalized"===s.status&&s.saveCurrentDimensions(),s.style.overflow="hidden",s.style.height=window.getComputedStyle(s.headerbar).height,"normalized"===s.status?(s.setControls([".jsPanel-btn-normalize",".jsPanel-btn-smallify"]),s.status="smallified",document.dispatchEvent(v),document.dispatchEvent(h),n.onstatuschange&&jsPanel.processCallbacks(s,n.onstatuschange,"every")):"maximized"===s.status&&(s.setControls([".jsPanel-btn-maximize",".jsPanel-btn-smallify"]),s.status="smallifiedmax",document.dispatchEvent(z),document.dispatchEvent(h),n.onstatuschange&&jsPanel.processCallbacks(s,n.onstatuschange,"every"));var t=s.querySelectorAll(".jsPanel-minimized-box");return t[t.length-1].style.display="none",e&&e.call(s,s),n.onsmallified&&jsPanel.processCallbacks(s,n.onsmallified,"every"),s},s.unsmallify=function(e){if("smallified"===s.status||"smallifiedmax"===s.status){if(n.onbeforeunsmallify&&0<n.onbeforeunsmallify.length&&!jsPanel.processCallbacks(s,n.onbeforeunsmallify))return s;document.dispatchEvent(w),s.style.overflow="visible",jsPanel.front(s),"smallified"===s.status?(s.style.height=s.currentData.height,s.setControls([".jsPanel-btn-normalize",".jsPanel-btn-smallifyrev"]),s.contentResize(),s.status="normalized",document.dispatchEvent(m),document.dispatchEvent(h),n.onstatuschange&&jsPanel.processCallbacks(s,n.onstatuschange,"every")):"smallifiedmax"===s.status?s.maximize():"minimized"===s.status&&s.normalize();var t=s.querySelectorAll(".jsPanel-minimized-box");t[t.length-1].style.display="flex",e&&e.call(s,s),n.onunsmallified&&jsPanel.processCallbacks(s,n.onunsmallified,"every")}return s},s.id=n.id,s.classList.add("jsPanel-"+n.paneltype),"standard"===n.paneltype&&(s.style.zIndex=this.zi.next()),l.append(s),s.front(!1,!1),s.setTheme(n.theme),n.boxShadow&&s.classList.add("jsPanel-depth-"+n.boxShadow),!n.header)s.setHeaderRemove();else if(n.headerLogo&&s.setHeaderLogo(n.headerLogo),s.setIconfont(n.iconfont),s.setHeaderTitle(n.headerTitle),s.setHeaderControls(),"auto-show-hide"===n.header){var q,A=n.theme.split("-"),W="jsPanel-depth-"+n.boxShadow,R="bg-";A[1]&&(R+=A[1]),A[2]&&(q=A[1]+"-color-"+A[2]),s.header.style.opacity=0,("bootstrap"===A[0]||"mdb"===A[0])&&(this.remClass(s,R),"mdb"===A[0]&&this.remClass(s,q)),s.style.backgroundColor="transparent",this.remClass(s,W),this.setClass(s.content,W),s.header.addEventListener("mouseenter",function(){s.header.style.opacity=1,("bootstrap"===A[0]||"mdb"===A[0])&&(jsPanel.setClass(s,R),"mdb"===A[0]&&jsPanel.setClass(s,q)),jsPanel.setClass(s,W),jsPanel.remClass(s.content,W)}),s.header.addEventListener("mouseleave",function(){s.header.style.opacity=0,("bootstrap"===A[0]||"mdb"===A[0])&&(jsPanel.remClass(s,R),"mdb"===A[0]&&jsPanel.remClass(s,q)),jsPanel.remClass(s,W),jsPanel.setClass(s.content,W)})}if(n.headerToolbar&&s.addToolbar(s.headertoolbar,n.headerToolbar),n.footerToolbar&&s.addToolbar(s.footer,n.footerToolbar),n.content&&("function"==typeof n.content?n.content.call(s,s):"string"==typeof n.content?s.content.innerHTML=n.content:s.content.append(n.content)),n.contentAjax&&this.ajax(s,n.contentAjax),n.contentFetch&&this.fetch(s),n.contentOverflow){var B=n.contentOverflow.split(" ");1===B.length?s.content.style.overflow=B[0]:2===B.length&&(s.content.style.overflowX=B[0],s.content.style.overflowY=B[1])}if(n.rtl&&s.setRtl(),s.setSize(),s.status="normalized",n.position||"cursor"!==n.position?this.position(s,n.position):s.style.opacity=1,document.dispatchEvent(m),s.calcSizeFactors(),n.animateIn&&(s.addEventListener("animationend",function(){e.remClass(s,n.animateIn)}),this.setClass(s,n.animateIn)),n.syncMargins){var H=this.pOcontainment(n.maximizedMargin);n.dragit&&(n.dragit.containment=H,n.dragit.snap&&(n.dragit.snap.containment=!0)),n.resizeit&&(n.resizeit.containment=H)}if(n.dragit?(this.dragit(s,n.dragit),document.addEventListener("jspaneldragstop",function(t){t.detail===s.id&&s.calcSizeFactors()},!1)):s.titlebar.style.cursor="default",n.resizeit){this.resizeit(s,n.resizeit);var M;document.addEventListener("jspanelresizestart",function(t){t.detail===s.id&&(M=s.status)},!1),document.addEventListener("jspanelresizestop",function(t){t.detail===s.id&&("smallified"===M||"smallifiedmax"===M||"maximized"===M)&&parseFloat(s.style.height)>parseFloat(window.getComputedStyle(s.header).height)&&(s.setControls([".jsPanel-btn-normalize",".jsPanel-btn-smallifyrev"]),s.status="normalized",document.dispatchEvent(m),document.dispatchEvent(h),n.onstatuschange&&jsPanel.processCallbacks(s,n.onstatuschange,"every"),s.calcSizeFactors())},!1)}if(s.saveCurrentDimensions(),s.saveCurrentPosition(),n.setStatus){var O=n.setStatus;if("smallifiedmax"===O)s.maximize().smallify();else if("smallified"===O)s.smallify();else{var D=O.substr(0,O.length-1);s[D]()}}return n.autoclose&&(a=window.setTimeout(function(){s&&s.close()},n.autoclose)),this.pointerdown.forEach(function(e){s.addEventListener(e,function(t){t.target.closest(".jsPanel-btn-close")||t.target.closest(".jsPanel-btn-minimize")||"standard"!==n.paneltype||s.front()},!1)}),n.onwindowresize&&window.addEventListener("resize",function(t){if(t.target===window){var e=n.onwindowresize,a=s.status,o=window.getComputedStyle(s.parentElement);"maximized"===a&&!0===e?s.maximize():("normalized"===a||"smallified"===a||"maximized"===a)&&("function"==typeof e?e.call(s,t,s):(s.style.left=function(){var e;return e=n.container===document.body?(document.body.clientWidth-parseFloat(s.style.width))*s.hf:(parseFloat(o.width)-parseFloat(s.style.width))*s.hf,0>=e?0:e+"px"}(),s.style.top=function(){var e;return e=n.container===document.body?(window.innerHeight-parseFloat(s.currentData.height))*s.vf:(parseFloat(o.height)-parseFloat(s.currentData.height))*s.vf,0>=e?0:e+"px"}()))}},!1),this.pointerup.forEach(function(e){s.addEventListener(e,function(){s.content.style.pointerEvents="inherit"})}),this.globalCallbacks&&(Array.isArray(this.globalCallbacks)?this.globalCallbacks.forEach(function(e){e.call(s,s)}):this.globalCallbacks.call(s,s)),n.callback&&(Array.isArray(n.callback)?n.callback.forEach(function(e){e.call(s,s)}):n.callback.call(s,s)),t&&t.call(s,s),document.dispatchEvent(r),s}};

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
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
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
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

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

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
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
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
/*!************************************!*\
  !*** ./src/devtools/TestDevice.ts ***!
  \************************************/
/*! no static exports found */
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
const index_1 = __webpack_require__(/*! ../index */ "../index");
const Messages = __webpack_require__(/*! ../index */ "../index");
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
/*!*******************************************!*\
  !*** ./src/devtools/TestDeviceManager.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
const TestDevice_1 = __webpack_require__(/*! ./TestDevice */ "./src/devtools/TestDevice.ts");
const index_1 = __webpack_require__(/*! ../index */ "../index");
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
/*!*******************************!*\
  !*** ./src/devtools/utils.ts ***!
  \*******************************/
/*! no static exports found */
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
const index_1 = __webpack_require__(/*! ../index */ "../index");
const TestDeviceManager_1 = __webpack_require__(/*! ./TestDeviceManager */ "./src/devtools/TestDeviceManager.ts");
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
/*!***************************************!*\
  !*** ./src/devtools/web/LogPanel.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!./LogPanel.css */ "./node_modules/css-loader/index.js!./src/devtools/web/LogPanel.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/devtools/web/LogPanel.html":
/*!****************************************!*\
  !*** ./src/devtools/web/LogPanel.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"buttplugdevtoolslogpanel\">\n  <textarea id=\"buttplugdevtoolslogtextarea\" readonly></textarea>\n  <div id=\"buttplugdevtoolsloglevel\">\n    <label>Panel Log Level:</label>\n    <select id=\"buttplugdevtoolsloglevelpanelselect\">\n      <option value=\"Off\">Off</option>\n      <option value=\"Fatal\">Fatal</option>\n      <option value=\"Error\">Error</option>\n      <option value=\"Warn\">Warn</option>\n      <option value=\"Info\">Info</option>\n      <option value=\"Debug\" selected>Debug</option>\n      <option value=\"Trace\">Trace</option>\n    </select>\n    <label>Console Log Level:</label>\n    <select id=\"buttplugdevtoolsloglevelconsoleselect\">\n      <option value=\"Off\" selected>Off</option>\n      <option value=\"Fatal\">Fatal</option>\n      <option value=\"Error\">Error</option>\n      <option value=\"Warn\">Warn</option>\n      <option value=\"Info\">Info</option>\n      <option value=\"Debug\">Debug</option>\n      <option value=\"Trace\">Trace</option>\n    </select>\n  </div>\n</div>\n";

/***/ }),

/***/ "./src/devtools/web/LogPanel.ts":
/*!**************************************!*\
  !*** ./src/devtools/web/LogPanel.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __webpack_require__(/*! ../../index */ "../index");
const jsPanel = __webpack_require__(/*! jspanel4 */ "./node_modules/jspanel4/es6module/jspanel.min.js");
__webpack_require__(/*! ../../../node_modules/jspanel4/dist/jspanel.css */ "./node_modules/jspanel4/dist/jspanel.css");
const logPanelHTML = __webpack_require__(/*! ./LogPanel.html */ "./src/devtools/web/LogPanel.html").toString();
__webpack_require__(/*! ./LogPanel.css */ "./src/devtools/web/LogPanel.css");
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
/*!*****************************************************!*\
  !*** ./src/devtools/web/TestDeviceManagerPanel.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!./TestDeviceManagerPanel.css */ "./node_modules/css-loader/index.js!./src/devtools/web/TestDeviceManagerPanel.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/devtools/web/TestDeviceManagerPanel.html":
/*!******************************************************!*\
  !*** ./src/devtools/web/TestDeviceManagerPanel.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<main>\n  <input id=\"tab1\" type=\"radio\" name=\"tabs\" checked>\n  <label for=\"tab1\">Test Devices</label>\n  <section id=\"content1\">\n    <div id=\"simulator\">\n      <div class=\"vibrator-simulator-component\">\n        <div class=\"vibrator\">\n          <img src=\"" + __webpack_require__(/*! ./hush.png */ "./src/devtools/web/hush.png") + "\"\n               id=\"vibrator-image\">\n        </div>\n        <div id=\"vibrator-info\">\n          <b>Vibration Speed:</b> <span id=\"vibrationspeed\">0</span><br/>\n          <button id=\"vibratedisconnect\">Disconnect</button>\n        </div>\n      </div>\n      <div class=\"simulator-divider\"></div>\n      <div class=\"fleshlight-sim\">\n        <div class=\"c-fleshlight\">\n          <div>\n            <img src=\"" + __webpack_require__(/*! ./ruler.png */ "./src/devtools/web/ruler.png") + "\">\n          </div>\n          <div>\n            <img src=\"" + __webpack_require__(/*! ./fleshlight.png */ "./src/devtools/web/fleshlight.png") + "\"\n                 class=\"o-fleshlight\"\n                 id=\"fleshlight-image\">\n          </div>\n        </div>\n        <div>\n          <b>Speed:</b> <span id=\"linearspeed\">0</span><br/>\n          <b>Position:</b> <span id=\"linearposition\">0</span><br/>\n          <button id=\"lineardisconnect\">Disconnect</button>\n        </div>\n      </div>\n    </div>\n  </section>\n</main>\n";

/***/ }),

/***/ "./src/devtools/web/TestDeviceManagerPanel.ts":
/*!****************************************************!*\
  !*** ./src/devtools/web/TestDeviceManagerPanel.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __webpack_require__(/*! ../../index */ "../index");
const TWEEN = __webpack_require__(/*! @tweenjs/tween.js */ "./node_modules/@tweenjs/tween.js/src/Tween.js");
const jsPanel = __webpack_require__(/*! jspanel4 */ "./node_modules/jspanel4/es6module/jspanel.min.js");
__webpack_require__(/*! ../../../node_modules/jspanel4/dist/jspanel.css */ "./node_modules/jspanel4/dist/jspanel.css");
const testPanelHTML = __webpack_require__(/*! ./TestDeviceManagerPanel.html */ "./src/devtools/web/TestDeviceManagerPanel.html").toString();
__webpack_require__(/*! ./TestDeviceManagerPanel.css */ "./src/devtools/web/TestDeviceManagerPanel.css");
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
/*!*****************************************!*\
  !*** ./src/devtools/web/fleshlight.png ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAABnCAYAAABPYmGyAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QQeCycTBqT4sQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAANJSURBVHja7Zy/b5tAFMffIdShaTdLjp2tktm68A9075oBpkqZ+wf0b+gf0NlSJjx4zZ7Vw0lWNyN1S1xLWVDVJbJ5HexLAPPjOLgDu+87hRjfvQ/vF3eQMGgmBD1ixr8oYHzfBwCA1WqV+nCz/l365cvxKHU8mUwAACAIgka22aowAqRtiXGDIEAVKAvOTATUrILgeQGxnJRAxNMEQkQjHrKNeYfp945RIFnIrjoyGks7Ux7KNtayOwVEPPLGcHSZOnYcJ3WcuGOgPnSSudI6kGpI6B5bBQh93wff92tPXOQpy7JSMGJ8leKjtWw/rB9zf381GqeO4zjuR9lOVrpsleOcHxmeBHVdt7DKNVkTKedQ2XqoDEZ4iHMOu92u9tjGqxzn/Ojq58l1XVgul2DbNth2e5FvdQGThFosFrTAIyBqrC3DNGmsZxdyKvWSHfbMQMfeXMbz/WisbUBRlSMg6kPUh6gPUR+iPkRlm4CoD1Efoj5EfYiqHAEREDVWaqzUWKmxnnZjzT5fravtdtt4jMZFIU+u6wLnXHqgsid+VBQUkw49z0u9QJEXKsJLZY/1hUezchwn9R7dbDarZaelI3dkn4LryEdtb5JcjcbSb5J03Yekr6Sq4WEYvrxpr7MooOd55pL7kKeHOVFrDlV5p+rvHmTOUc2l/3b5YDTcshJhF/z89uGsPOR//P7LOJBM/qicSzlEQAREQN0DqVSttisdeYiACMgwUBiGrSd30XeL5iIPEdAJAWHXi7vsIq9qf6Fs1wfFrs1hsw+6AhPzC3se1o+F/5qAyQAJFe2zJSdTVZ2xD+fWBhIuljK2zCAZ1Zyj0G4pD4mBdO54yoBk7GF1c+jo6vUl5MpEIdf3kKvloa5DTsZDVTnEcDpHdnNdabTOkIuiCOI4BpzOgd1cM9XGur+TGA4A7+4BNk8gwITevb1ozUNRFBV+9ufH7f6H4UDc3cSqQK9fHA4Ap/PCE99//dII6MXoPO1Bjm1SALooGRhg8yRnkIqyc73qDQA8qwL9rT1pArKh4UV6buKhNq+sEUk9Lse7e4QeiH3+VGkvrVj7Luk3NLoOO5lwqwXUFZgsiDKQSai6MMpAusFUQFoBahusCYjQPxjiryCopLWbAAAAAElFTkSuQmCC"

/***/ }),

/***/ "./src/devtools/web/hush.png":
/*!***********************************!*\
  !*** ./src/devtools/web/hush.png ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "./src/devtools/web/index.web.ts":
/*!***************************************!*\
  !*** ./src/devtools/web/index.web.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ../TestDevice */ "./src/devtools/TestDevice.ts"));
__export(__webpack_require__(/*! ../TestDeviceManager */ "./src/devtools/TestDeviceManager.ts"));
__export(__webpack_require__(/*! ../utils */ "./src/devtools/utils.ts"));
__export(__webpack_require__(/*! ./LogPanel */ "./src/devtools/web/LogPanel.ts"));
__export(__webpack_require__(/*! ./TestDeviceManagerPanel */ "./src/devtools/web/TestDeviceManagerPanel.ts"));
__export(__webpack_require__(/*! ./utils.web */ "./src/devtools/web/utils.web.ts"));


/***/ }),

/***/ "./src/devtools/web/ruler.png":
/*!************************************!*\
  !*** ./src/devtools/web/ruler.png ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAACFCAYAAACT3zI9AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QQeCh4AjVxe4gAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVEjHY2RgYPjPgAVgCDJhU8WES/UI0M6IppJxNOjIDToybR8VHBUcMoKjaX5UcDTNj1aRo62LAWldAAC8EC2tAEBYXAAAAABJRU5ErkJggg=="

/***/ }),

/***/ "./src/devtools/web/utils.web.ts":
/*!***************************************!*\
  !*** ./src/devtools/web/utils.web.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TestDeviceManagerPanel_1 = __webpack_require__(/*! ./TestDeviceManagerPanel */ "./src/devtools/web/TestDeviceManagerPanel.ts");
const LogPanel_1 = __webpack_require__(/*! ./LogPanel */ "./src/devtools/web/LogPanel.ts");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvZXh0ZXJuYWwgXCJCdXR0cGx1Z1wiIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9ub2RlX21vZHVsZXMvQHR3ZWVuanMvdHdlZW4uanMvc3JjL1R3ZWVuLmpzIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9ub2RlX21vZHVsZXMvanNwYW5lbDQvZGlzdC9qc3BhbmVsLmNzcyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9Mb2dQYW5lbC5jc3MiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC5jc3MiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9kaXN0L2pzcGFuZWwuY3NzPzM2MWEiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9lczZtb2R1bGUvanNwYW5lbC5taW4uanMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qcyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL1Rlc3REZXZpY2UudHMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy9UZXN0RGV2aWNlTWFuYWdlci50cyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3V0aWxzLnRzIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9zcmMvZGV2dG9vbHMvd2ViL0xvZ1BhbmVsLmNzcz9hZmE2Iiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9zcmMvZGV2dG9vbHMvd2ViL0xvZ1BhbmVsLmh0bWwiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvTG9nUGFuZWwudHMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC5jc3M/ZDFmYyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmh0bWwiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC50cyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9mbGVzaGxpZ2h0LnBuZyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9odXNoLnBuZyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9pbmRleC53ZWIudHMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvcnVsZXIucG5nIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9zcmMvZGV2dG9vbHMvd2ViL3V0aWxzLndlYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ25FQSwwQjs7Ozs7Ozs7Ozs7K0NDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSCxFQUFFOztBQUVGOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixxQkFBcUI7O0FBRXZDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUM7QUFDdkM7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQSxnRUFBZ0Usc0JBQXNCO0FBQ3RGO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsSUFBSTs7QUFFSjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQSxJQUFJOztBQUVKOztBQUVBO0FBQ0E7O0FBRUEsa0VBQWtFLHNCQUFzQjtBQUN4RjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUFBOztBQUVILEVBQUUsUUFVRjs7QUFFQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDcDVCRDtBQUNBOzs7QUFHQTtBQUNBLDZLQUE4SyxjQUFjLDJCQUEyQiw2QkFBNkIsNkVBQTZFLHdCQUF3QixrQkFBa0IsMkJBQTJCLGVBQWUsc0JBQXNCLHVCQUF1QixXQUFXLGlCQUFpQixFQUFFLDJCQUEyQixnQkFBZ0IsNkJBQTZCLCtCQUErQiwrRUFBK0UsMEJBQTBCLHNCQUFzQixvQkFBb0IsNkJBQTZCLHFCQUFxQixFQUFFLCtCQUErQixnQkFBZ0IsNkJBQTZCLCtCQUErQiwrRUFBK0UsMEJBQTBCLDBCQUEwQixxQkFBcUIsc0JBQXNCLHlCQUF5Qix5QkFBeUIsdUJBQXVCLEVBQUUscUNBQXFDLHVCQUF1QixFQUFFLDJCQUEyQiwwQkFBMEIsZ0NBQWdDLHdCQUF3QiwwQkFBMEIsb0NBQW9DLG9CQUFvQiw2QkFBNkIsc0JBQXNCLG1CQUFtQiwwQkFBMEIsMEJBQTBCLG1CQUFtQix1QkFBdUIsRUFBRSxrQ0FBa0Msb0JBQW9CLEVBQUUsd0NBQXdDLHdCQUF3QixFQUFFLHdDQUF3QyxpQkFBaUIsRUFBRSw4Q0FBOEMsb0JBQW9CLEVBQUUsd0JBQXdCLDJCQUEyQixrQkFBa0Isd0JBQXdCLHNCQUFzQix3QkFBd0IsRUFBRSw0QkFBNEIsNkJBQTZCLHVCQUF1QixFQUFFLHVCQUF1QixrQkFBa0Isd0JBQXdCLGlCQUFpQixpQkFBaUIsaUJBQWlCLHFCQUFxQixFQUFFLHNDQUFzQyxxQkFBcUIsK0VBQStFLDBCQUEwQix1QkFBdUIsOEJBQThCLHNCQUFzQiwrQkFBK0IsMEJBQTBCLDBCQUEwQixtQkFBbUIsRUFBRSw4Q0FBOEMsdUJBQXVCLHVCQUF1QixFQUFFLG1DQUFtQyxnQ0FBZ0MsRUFBRSx5QkFBeUIsa0JBQWtCLHdCQUF3Qix1QkFBdUIsRUFBRSwyRUFBMkUsa0JBQWtCLEVBQUUsc0NBQXNDLHNCQUFzQix5QkFBeUIsRUFBRSw2Q0FBNkMsK0JBQStCLDZCQUE2QixFQUFFLHVEQUF1RCx1QkFBdUIsRUFBRSw0Q0FBNEMsNEJBQTRCLEVBQUUsc0RBQXNELHlCQUF5QiwwQkFBMEIsRUFBRSw4RkFBOEYsb0JBQW9CLEVBQUUsMEJBQTBCLGtCQUFrQixnQkFBZ0IsaUJBQWlCLG9CQUFvQixFQUFFLGlDQUFpQywyQkFBMkIsa0JBQWtCLHdCQUF3QixzQkFBc0Isd0JBQXdCLEVBQUUscUNBQXFDLHNCQUFzQixFQUFFLGlKQUFpSixnQ0FBZ0MsRUFBRSw2Q0FBNkMsMEJBQTBCLEVBQUUsOEJBQThCLHdCQUF3QixFQUFFLDRJQUE0SSxrQkFBa0IsZ0NBQWdDLG1EQUFtRCxjQUFjLGlCQUFpQixZQUFZLG9CQUFvQixnQkFBZ0Isa0JBQWtCLEVBQUUseUpBQXlKLG9CQUFvQiwwQkFBMEIsbUJBQW1CLG1CQUFtQiwwQkFBMEIsb0JBQW9CLEVBQUUsa01BQWtNLHFCQUFxQixxQkFBcUIsbUJBQW1CLEVBQUUsZ1FBQWdRLHlCQUF5QiwyQkFBMkIsRUFBRSw4UUFBOFEsNkJBQTZCLDZCQUE2QixFQUFFLGlOQUFpTix3QkFBd0IscUJBQXFCLEVBQUUsb1FBQW9RLHVCQUF1QixFQUFFLDBEQUEwRCx1QkFBdUIsZ0JBQWdCLHFCQUFxQixFQUFFLHdFQUF3RSxrQkFBa0Isd0JBQXdCLEVBQUUsd0ZBQXdGLG1CQUFtQixxQkFBcUIsdUJBQXVCLHVCQUF1QixFQUFFLGlEQUFpRCxxQkFBcUIsaUJBQWlCLGNBQWMsY0FBYyw2QkFBNkIsRUFBRSxpREFBaUQscUJBQXFCLDhCQUE4QixnQkFBZ0IsYUFBYSxnQkFBZ0IsRUFBRSxpREFBaUQsaUJBQWlCLHFCQUFxQixpQkFBaUIsY0FBYyw2QkFBNkIsRUFBRSxpREFBaUQscUJBQXFCLDhCQUE4QixlQUFlLGFBQWEsZ0JBQWdCLEVBQUUsa0RBQWtELHNCQUFzQixpQkFBaUIsZ0JBQWdCLGNBQWMsZ0JBQWdCLEVBQUUsa0RBQWtELGlCQUFpQixzQkFBc0IsaUJBQWlCLGdCQUFnQixnQkFBZ0IsRUFBRSxrREFBa0QsaUJBQWlCLHNCQUFzQixpQkFBaUIsZUFBZSxnQkFBZ0IsRUFBRSxrREFBa0Qsc0JBQXNCLGlCQUFpQixlQUFlLGNBQWMsZ0JBQWdCLEVBQUUsMkJBQTJCLGdCQUFnQixpQkFBaUIsdUJBQXVCLFlBQVksV0FBVyxFQUFFLCtHQUErRyw2RUFBNkUsRUFBRSxzQkFBc0IsK0VBQStFLEVBQUUsc0JBQXNCLGlGQUFpRixFQUFFLHNCQUFzQixnRkFBZ0YsRUFBRSxzQkFBc0IsZ0ZBQWdGLEVBQUUsbUlBQW1JLG9CQUFvQixzQkFBc0IsZ0JBQWdCLDZCQUE2QiwrRUFBK0Usa0JBQWtCLEVBQUUseUVBQXlFLFlBQVksRUFBRSxrREFBa0QsZ0JBQWdCLEVBQUUseUVBQXlFLGFBQWEsRUFBRSx5RUFBeUUsV0FBVyxFQUFFLGtEQUFrRCxlQUFlLEVBQUUseUVBQXlFLGNBQWMsRUFBRSxrREFBa0QsZUFBZSxFQUFFLGtEQUFrRCxnQkFBZ0IsRUFBRSwyQkFBMkIscUNBQXFDLEVBQUUsMkJBQTJCLG9DQUFvQyxFQUFFLDJCQUEyQixpQ0FBaUMsRUFBRSwyQkFBMkIsa0NBQWtDLEVBQUUsc0tBQXNLLGdCQUFnQixpQkFBaUIsdUJBQXVCLHVCQUF1QixFQUFFLDBHQUEwRyxhQUFhLGNBQWMsdUJBQXVCLG1DQUFtQyxFQUFFLGlDQUFpQywyQkFBMkIsMEJBQTBCLEVBQUUsa0NBQWtDLGVBQWUsMEJBQTBCLEVBQUUscUNBQXFDLGVBQWUsY0FBYyxFQUFFLG9DQUFvQywyQkFBMkIsY0FBYyxFQUFFLDRCQUE0QiwyQkFBMkIsY0FBYyxFQUFFLDhCQUE4QixnQkFBZ0IsMEJBQTBCLEVBQUUsK0JBQStCLDJCQUEyQixlQUFlLEVBQUUsNkJBQTZCLGVBQWUsMEJBQTBCLEVBQUUsMEdBQTBHLDJFQUEyRSx1QkFBdUIsRUFBRSxFQUFFLHdPQUF3TywrRUFBK0UsRUFBRSxvQkFBb0IsY0FBYyxFQUFFLGdDQUFnQyx3QkFBd0IsZUFBZSxFQUFFLHlFQUF5RSxtQkFBbUIsRUFBRSwrREFBK0QsK0VBQStFLEVBQUUsbUJBQW1CLHdCQUF3QixFQUFFLGlTQUFpUyw0QkFBNEIsbUJBQW1CLEVBQUUsNkRBQTZELDRCQUE0QixtQkFBbUIsRUFBRSxxREFBcUQsVUFBVSxpQkFBaUIsRUFBRSxRQUFRLGlCQUFpQixFQUFFLEVBQUUsb0JBQW9CLGVBQWUsdUNBQXVDLGtDQUFrQyw4QkFBOEIsRUFBRSwrQkFBK0IsVUFBVSxpQkFBaUIsRUFBRSxRQUFRLGlCQUFpQixFQUFFLEVBQUUscUJBQXFCLHdDQUF3QyxrQ0FBa0MsOEJBQThCLEVBQUUsb0NBQW9DLFVBQVUsaUJBQWlCLEVBQUUsUUFBUSxvQkFBb0IsRUFBRSxFQUFFLDZCQUE2Qiw2Q0FBNkMsa0NBQWtDLDhCQUE4QixzQkFBc0Isb0JBQW9CLFdBQVcsWUFBWSxnQkFBZ0IsaUJBQWlCLEVBQUUscUNBQXFDLFVBQVUsb0JBQW9CLEVBQUUsUUFBUSxpQkFBaUIsRUFBRSxFQUFFLGlDQUFpQyw4Q0FBOEMsa0NBQWtDLDhCQUE4QixFQUFFLG1DQUFtQyxvQ0FBb0MsRUFBRSw4Q0FBOEMsdUJBQXVCLFdBQVcsZ0JBQWdCLGlCQUFpQiw0QkFBNEIsRUFBRSxnTUFBZ00sOEJBQThCLDBCQUEwQixFQUFFLDZDQUE2QyxtQkFBbUIsRUFBRSxnRUFBZ0Usa0NBQWtDLEVBQUUsK0NBQStDLGtDQUFrQyxFQUFFLHNFQUFzRSw4QkFBOEIsa0NBQWtDLEVBQUUsMkVBQTJFLDhCQUE4QixFQUFFLHNKQUFzSiw4QkFBOEIsMEJBQTBCLEVBQUUsNkNBQTZDLG1CQUFtQixFQUFFLGdFQUFnRSxrQ0FBa0MsRUFBRSwrQ0FBK0Msa0NBQWtDLEVBQUUsc0VBQXNFLDhCQUE4QixrQ0FBa0MsbUJBQW1CLEVBQUUsMkVBQTJFLDhCQUE4QixtQkFBbUIsRUFBRSxtSkFBbUosOEJBQThCLDBCQUEwQixFQUFFLDBDQUEwQyxtQkFBbUIsRUFBRSw2REFBNkQsa0NBQWtDLEVBQUUsNENBQTRDLGtDQUFrQyxFQUFFLG1FQUFtRSw4QkFBOEIsa0NBQWtDLG1CQUFtQixFQUFFLHdFQUF3RSw4QkFBOEIsbUJBQW1CLEVBQUUsc0pBQXNKLDhCQUE4QiwwQkFBMEIsRUFBRSw2Q0FBNkMsbUJBQW1CLEVBQUUsZ0VBQWdFLGtDQUFrQyxFQUFFLHNFQUFzRSw4QkFBOEIsa0NBQWtDLG1CQUFtQixFQUFFLDJFQUEyRSw4QkFBOEIsbUJBQW1CLEVBQUUsc0pBQXNKLDhCQUE4QiwwQkFBMEIsRUFBRSw2Q0FBNkMsbUJBQW1CLEVBQUUsZ0VBQWdFLGtDQUFrQyxFQUFFLHNFQUFzRSw4QkFBOEIsa0NBQWtDLG1CQUFtQixFQUFFLDJFQUEyRSw4QkFBOEIsbUJBQW1CLEVBQUUscUpBQXFKLDhCQUE4QiwwQkFBMEIsRUFBRSw0Q0FBNEMsbUJBQW1CLEVBQUUsK0RBQStELGtDQUFrQyxFQUFFLHFFQUFxRSw4QkFBOEIsa0NBQWtDLG1CQUFtQixFQUFFLDBFQUEwRSw4QkFBOEIsbUJBQW1CLEVBQUUsK0NBQStDLDRCQUE0QixFQUFFLFVBQVUsa0NBQWtDLEVBQUU7O0FBRWpuaUI7Ozs7Ozs7Ozs7OztBQ1BBO0FBQ0E7OztBQUdBO0FBQ0Esb0RBQXFELG1CQUFtQiw0QkFBNEIsaUJBQWlCLGtCQUFrQix5QkFBeUIsa0JBQWtCLEdBQUcscURBQXFELGtCQUFrQix1QkFBdUIsR0FBRyw0REFBNEQscUJBQXFCLGlCQUFpQixlQUFlLGtCQUFrQiw0QkFBNEIsR0FBRyx1REFBdUQsZ0JBQWdCLGdCQUFnQixrQkFBa0IsNEJBQTRCLEdBQUc7O0FBRWhrQjs7Ozs7Ozs7Ozs7O0FDUEE7QUFDQTs7O0FBR0E7QUFDQSwrQkFBZ0MsaUJBQWlCLG1CQUFtQixHQUFHLGFBQWEsb0JBQW9CLG9CQUFvQixpQ0FBaUMsR0FBRyxXQUFXLG9CQUFvQixHQUFHLFdBQVcsNEJBQTRCLHVCQUF1Qix3QkFBd0IsdUJBQXVCLHlCQUF5QixrQkFBa0Isb0NBQW9DLEdBQUcsa0JBQWtCLCtCQUErQiwwQkFBMEIseUJBQXlCLEdBQUcsaUJBQWlCLGtCQUFrQixzQkFBc0IsR0FBRywyQkFBMkIsa0JBQWtCLDZCQUE2QixtQ0FBbUMsb0NBQW9DLEdBQUcsbUhBQW1ILHFCQUFxQixHQUFHLGVBQWUsbUJBQW1CLEdBQUcsZUFBZSxtQkFBbUIsR0FBRyxnQkFBZ0Isb0JBQW9CLGtCQUFrQixnQ0FBZ0MsMEJBQTBCLEdBQUcscUJBQXFCLGNBQWMsb0JBQW9CLDZCQUE2QixrQkFBa0IsbUJBQW1CLDBCQUEwQiw4QkFBOEIsR0FBRyxzQkFBc0Isb0JBQW9CLGNBQWMsR0FBRywwQkFBMEIsbUJBQW1CLGtCQUFrQix3Q0FBd0Msc0NBQXNDLGlEQUFpRCxpQ0FBaUMsR0FBRyxvQ0FBb0MseUJBQXlCLGtCQUFrQixHQUFHLG1DQUFtQyxjQUFjLG9CQUFvQiw2QkFBNkIsa0JBQWtCLG1CQUFtQiwwQkFBMEIsOEJBQThCLEdBQUcsa0JBQWtCLGdCQUFnQiwwQkFBMEIsR0FBRywwQ0FBMEMsZ0NBQWdDLGtCQUFrQix5QkFBeUIsd0NBQXdDLHNDQUFzQyxpREFBaUQsaUNBQWlDLEdBQUcsdUJBQXVCLGNBQWMsR0FBRyx3QkFBd0IsbUNBQW1DLG1CQUFtQixHQUFHOztBQUVyckU7Ozs7Ozs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsZ0JBQWdCO0FBQ25ELElBQUk7QUFDSjtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxvQkFBb0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELGNBQWM7O0FBRWxFO0FBQ0E7Ozs7Ozs7Ozs7OztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSCxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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RUQsNkVBQTZFO0FBQzdFLGVBQWU7QUFDZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQStCRTs7Ozs7Ozs7Ozs7O0FDOUpGLGlDQUFpQyxvekM7Ozs7Ozs7Ozs7O0FDQWpDLGlDQUFpQyw0aEg7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQWpDLG1GQUE4QjtBQUM5QixpR0FBcUM7QUFDckMseUVBQXlCO0FBQ3pCLGtGQUEyQjtBQUMzQiw4R0FBeUM7QUFDekMsb0ZBQTRCOzs7Ozs7Ozs7Ozs7QUNMNUIsaUNBQWlDLHdTOzs7Ozs7Ozs7Ozs7OztBQ0FqQyxxSUFBa0U7QUFDbEUsMkZBQXNDO0FBR3RDO0lBQ0UsbUJBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUMxQixDQUFDO0FBRkQsOENBRUM7QUFFRCxrQ0FBeUMsY0FBOEI7SUFDckUsK0NBQXNCLENBQUMsMEJBQTBCLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDcEUsQ0FBQztBQUZELDREQUVDIiwiZmlsZSI6ImJ1dHRwbHVnLWRldnRvb2xzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYnV0dHBsdWctZGV2dG9vbHMtY29tbW9uanNcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiQnV0dHBsdWdEZXZUb29sc1wiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2RldnRvb2xzL3dlYi9pbmRleC53ZWIudHNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IEJ1dHRwbHVnOyIsIi8qKlxuICogVHdlZW4uanMgLSBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKlxuICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzL2dyYXBocy9jb250cmlidXRvcnMgZm9yIHRoZSBmdWxsIGxpc3Qgb2YgY29udHJpYnV0b3JzLlxuICogVGhhbmsgeW91IGFsbCwgeW91J3JlIGF3ZXNvbWUhXG4gKi9cblxuXG52YXIgX0dyb3VwID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLl90d2VlbnMgPSB7fTtcblx0dGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGUgPSB7fTtcbn07XG5cbl9Hcm91cC5wcm90b3R5cGUgPSB7XG5cdGdldEFsbDogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVucykubWFwKGZ1bmN0aW9uICh0d2VlbklkKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fdHdlZW5zW3R3ZWVuSWRdO1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cblx0fSxcblxuXHRyZW1vdmVBbGw6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMuX3R3ZWVucyA9IHt9O1xuXG5cdH0sXG5cblx0YWRkOiBmdW5jdGlvbiAodHdlZW4pIHtcblxuXHRcdHRoaXMuX3R3ZWVuc1t0d2Vlbi5nZXRJZCgpXSA9IHR3ZWVuO1xuXHRcdHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlW3R3ZWVuLmdldElkKCldID0gdHdlZW47XG5cblx0fSxcblxuXHRyZW1vdmU6IGZ1bmN0aW9uICh0d2Vlbikge1xuXG5cdFx0ZGVsZXRlIHRoaXMuX3R3ZWVuc1t0d2Vlbi5nZXRJZCgpXTtcblx0XHRkZWxldGUgdGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGVbdHdlZW4uZ2V0SWQoKV07XG5cblx0fSxcblxuXHR1cGRhdGU6IGZ1bmN0aW9uICh0aW1lLCBwcmVzZXJ2ZSkge1xuXG5cdFx0dmFyIHR3ZWVuSWRzID0gT2JqZWN0LmtleXModGhpcy5fdHdlZW5zKTtcblxuXHRcdGlmICh0d2Vlbklkcy5sZW5ndGggPT09IDApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHR0aW1lID0gdGltZSAhPT0gdW5kZWZpbmVkID8gdGltZSA6IFRXRUVOLm5vdygpO1xuXG5cdFx0Ly8gVHdlZW5zIGFyZSB1cGRhdGVkIGluIFwiYmF0Y2hlc1wiLiBJZiB5b3UgYWRkIGEgbmV3IHR3ZWVuIGR1cmluZyBhbiB1cGRhdGUsIHRoZW4gdGhlXG5cdFx0Ly8gbmV3IHR3ZWVuIHdpbGwgYmUgdXBkYXRlZCBpbiB0aGUgbmV4dCBiYXRjaC5cblx0XHQvLyBJZiB5b3UgcmVtb3ZlIGEgdHdlZW4gZHVyaW5nIGFuIHVwZGF0ZSwgaXQgbWF5IG9yIG1heSBub3QgYmUgdXBkYXRlZC4gSG93ZXZlcixcblx0XHQvLyBpZiB0aGUgcmVtb3ZlZCB0d2VlbiB3YXMgYWRkZWQgZHVyaW5nIHRoZSBjdXJyZW50IGJhdGNoLCB0aGVuIGl0IHdpbGwgbm90IGJlIHVwZGF0ZWQuXG5cdFx0d2hpbGUgKHR3ZWVuSWRzLmxlbmd0aCA+IDApIHtcblx0XHRcdHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlID0ge307XG5cblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdHdlZW5JZHMubGVuZ3RoOyBpKyspIHtcblxuXHRcdFx0XHR2YXIgdHdlZW4gPSB0aGlzLl90d2VlbnNbdHdlZW5JZHNbaV1dO1xuXG5cdFx0XHRcdGlmICh0d2VlbiAmJiB0d2Vlbi51cGRhdGUodGltZSkgPT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0dHdlZW4uX2lzUGxheWluZyA9IGZhbHNlO1xuXG5cdFx0XHRcdFx0aWYgKCFwcmVzZXJ2ZSkge1xuXHRcdFx0XHRcdFx0ZGVsZXRlIHRoaXMuX3R3ZWVuc1t0d2Vlbklkc1tpXV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHR3ZWVuSWRzID0gT2JqZWN0LmtleXModGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGUpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXG5cdH1cbn07XG5cbnZhciBUV0VFTiA9IG5ldyBfR3JvdXAoKTtcblxuVFdFRU4uR3JvdXAgPSBfR3JvdXA7XG5UV0VFTi5fbmV4dElkID0gMDtcblRXRUVOLm5leHRJZCA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIFRXRUVOLl9uZXh0SWQrKztcbn07XG5cblxuLy8gSW5jbHVkZSBhIHBlcmZvcm1hbmNlLm5vdyBwb2x5ZmlsbC5cbi8vIEluIG5vZGUuanMsIHVzZSBwcm9jZXNzLmhydGltZS5cbmlmICh0eXBlb2YgKHdpbmRvdykgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiAocHJvY2VzcykgIT09ICd1bmRlZmluZWQnKSB7XG5cdFRXRUVOLm5vdyA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgdGltZSA9IHByb2Nlc3MuaHJ0aW1lKCk7XG5cblx0XHQvLyBDb252ZXJ0IFtzZWNvbmRzLCBuYW5vc2Vjb25kc10gdG8gbWlsbGlzZWNvbmRzLlxuXHRcdHJldHVybiB0aW1lWzBdICogMTAwMCArIHRpbWVbMV0gLyAxMDAwMDAwO1xuXHR9O1xufVxuLy8gSW4gYSBicm93c2VyLCB1c2Ugd2luZG93LnBlcmZvcm1hbmNlLm5vdyBpZiBpdCBpcyBhdmFpbGFibGUuXG5lbHNlIGlmICh0eXBlb2YgKHdpbmRvdykgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICB3aW5kb3cucGVyZm9ybWFuY2UgIT09IHVuZGVmaW5lZCAmJlxuXHRcdCB3aW5kb3cucGVyZm9ybWFuY2Uubm93ICE9PSB1bmRlZmluZWQpIHtcblx0Ly8gVGhpcyBtdXN0IGJlIGJvdW5kLCBiZWNhdXNlIGRpcmVjdGx5IGFzc2lnbmluZyB0aGlzIGZ1bmN0aW9uXG5cdC8vIGxlYWRzIHRvIGFuIGludm9jYXRpb24gZXhjZXB0aW9uIGluIENocm9tZS5cblx0VFdFRU4ubm93ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdy5iaW5kKHdpbmRvdy5wZXJmb3JtYW5jZSk7XG59XG4vLyBVc2UgRGF0ZS5ub3cgaWYgaXQgaXMgYXZhaWxhYmxlLlxuZWxzZSBpZiAoRGF0ZS5ub3cgIT09IHVuZGVmaW5lZCkge1xuXHRUV0VFTi5ub3cgPSBEYXRlLm5vdztcbn1cbi8vIE90aGVyd2lzZSwgdXNlICduZXcgRGF0ZSgpLmdldFRpbWUoKScuXG5lbHNlIHtcblx0VFdFRU4ubm93ID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblx0fTtcbn1cblxuXG5UV0VFTi5Ud2VlbiA9IGZ1bmN0aW9uIChvYmplY3QsIGdyb3VwKSB7XG5cdHRoaXMuX29iamVjdCA9IG9iamVjdDtcblx0dGhpcy5fdmFsdWVzU3RhcnQgPSB7fTtcblx0dGhpcy5fdmFsdWVzRW5kID0ge307XG5cdHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0ID0ge307XG5cdHRoaXMuX2R1cmF0aW9uID0gMTAwMDtcblx0dGhpcy5fcmVwZWF0ID0gMDtcblx0dGhpcy5fcmVwZWF0RGVsYXlUaW1lID0gdW5kZWZpbmVkO1xuXHR0aGlzLl95b3lvID0gZmFsc2U7XG5cdHRoaXMuX2lzUGxheWluZyA9IGZhbHNlO1xuXHR0aGlzLl9yZXZlcnNlZCA9IGZhbHNlO1xuXHR0aGlzLl9kZWxheVRpbWUgPSAwO1xuXHR0aGlzLl9zdGFydFRpbWUgPSBudWxsO1xuXHR0aGlzLl9lYXNpbmdGdW5jdGlvbiA9IFRXRUVOLkVhc2luZy5MaW5lYXIuTm9uZTtcblx0dGhpcy5faW50ZXJwb2xhdGlvbkZ1bmN0aW9uID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5MaW5lYXI7XG5cdHRoaXMuX2NoYWluZWRUd2VlbnMgPSBbXTtcblx0dGhpcy5fb25TdGFydENhbGxiYWNrID0gbnVsbDtcblx0dGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPSBmYWxzZTtcblx0dGhpcy5fb25VcGRhdGVDYWxsYmFjayA9IG51bGw7XG5cdHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayA9IG51bGw7XG5cdHRoaXMuX29uU3RvcENhbGxiYWNrID0gbnVsbDtcblx0dGhpcy5fZ3JvdXAgPSBncm91cCB8fCBUV0VFTjtcblx0dGhpcy5faWQgPSBUV0VFTi5uZXh0SWQoKTtcblxufTtcblxuVFdFRU4uVHdlZW4ucHJvdG90eXBlID0ge1xuXHRnZXRJZDogZnVuY3Rpb24gZ2V0SWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2lkO1xuXHR9LFxuXG5cdGlzUGxheWluZzogZnVuY3Rpb24gaXNQbGF5aW5nKCkge1xuXHRcdHJldHVybiB0aGlzLl9pc1BsYXlpbmc7XG5cdH0sXG5cblx0dG86IGZ1bmN0aW9uIHRvKHByb3BlcnRpZXMsIGR1cmF0aW9uKSB7XG5cblx0XHR0aGlzLl92YWx1ZXNFbmQgPSBwcm9wZXJ0aWVzO1xuXG5cdFx0aWYgKGR1cmF0aW9uICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX2R1cmF0aW9uID0gZHVyYXRpb247XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzdGFydDogZnVuY3Rpb24gc3RhcnQodGltZSkge1xuXG5cdFx0dGhpcy5fZ3JvdXAuYWRkKHRoaXMpO1xuXG5cdFx0dGhpcy5faXNQbGF5aW5nID0gdHJ1ZTtcblxuXHRcdHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gZmFsc2U7XG5cblx0XHR0aGlzLl9zdGFydFRpbWUgPSB0aW1lICE9PSB1bmRlZmluZWQgPyB0eXBlb2YgdGltZSA9PT0gJ3N0cmluZycgPyBUV0VFTi5ub3coKSArIHBhcnNlRmxvYXQodGltZSkgOiB0aW1lIDogVFdFRU4ubm93KCk7XG5cdFx0dGhpcy5fc3RhcnRUaW1lICs9IHRoaXMuX2RlbGF5VGltZTtcblxuXHRcdGZvciAodmFyIHByb3BlcnR5IGluIHRoaXMuX3ZhbHVlc0VuZCkge1xuXG5cdFx0XHQvLyBDaGVjayBpZiBhbiBBcnJheSB3YXMgcHJvdmlkZWQgYXMgcHJvcGVydHkgdmFsdWVcblx0XHRcdGlmICh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldIGluc3RhbmNlb2YgQXJyYXkpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIENyZWF0ZSBhIGxvY2FsIGNvcHkgb2YgdGhlIEFycmF5IHdpdGggdGhlIHN0YXJ0IHZhbHVlIGF0IHRoZSBmcm9udFxuXHRcdFx0XHR0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldID0gW3RoaXMuX29iamVjdFtwcm9wZXJ0eV1dLmNvbmNhdCh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldKTtcblxuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBgdG8oKWAgc3BlY2lmaWVzIGEgcHJvcGVydHkgdGhhdCBkb2Vzbid0IGV4aXN0IGluIHRoZSBzb3VyY2Ugb2JqZWN0LFxuXHRcdFx0Ly8gd2Ugc2hvdWxkIG5vdCBzZXQgdGhhdCBwcm9wZXJ0eSBpbiB0aGUgb2JqZWN0XG5cdFx0XHRpZiAodGhpcy5fb2JqZWN0W3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTYXZlIHRoZSBzdGFydGluZyB2YWx1ZS5cblx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9IHRoaXMuX29iamVjdFtwcm9wZXJ0eV07XG5cblx0XHRcdGlmICgodGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldIGluc3RhbmNlb2YgQXJyYXkpID09PSBmYWxzZSkge1xuXHRcdFx0XHR0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gKj0gMS4wOyAvLyBFbnN1cmVzIHdlJ3JlIHVzaW5nIG51bWJlcnMsIG5vdCBzdHJpbmdzXG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSB8fCAwO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzdG9wOiBmdW5jdGlvbiBzdG9wKCkge1xuXG5cdFx0aWYgKCF0aGlzLl9pc1BsYXlpbmcpIHtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHRoaXMuX2dyb3VwLnJlbW92ZSh0aGlzKTtcblx0XHR0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcblxuXHRcdGlmICh0aGlzLl9vblN0b3BDYWxsYmFjayAhPT0gbnVsbCkge1xuXHRcdFx0dGhpcy5fb25TdG9wQ2FsbGJhY2sodGhpcy5fb2JqZWN0KTtcblx0XHR9XG5cblx0XHR0aGlzLnN0b3BDaGFpbmVkVHdlZW5zKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRlbmQ6IGZ1bmN0aW9uIGVuZCgpIHtcblxuXHRcdHRoaXMudXBkYXRlKHRoaXMuX3N0YXJ0VGltZSArIHRoaXMuX2R1cmF0aW9uKTtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHN0b3BDaGFpbmVkVHdlZW5zOiBmdW5jdGlvbiBzdG9wQ2hhaW5lZFR3ZWVucygpIHtcblxuXHRcdGZvciAodmFyIGkgPSAwLCBudW1DaGFpbmVkVHdlZW5zID0gdGhpcy5fY2hhaW5lZFR3ZWVucy5sZW5ndGg7IGkgPCBudW1DaGFpbmVkVHdlZW5zOyBpKyspIHtcblx0XHRcdHRoaXMuX2NoYWluZWRUd2VlbnNbaV0uc3RvcCgpO1xuXHRcdH1cblxuXHR9LFxuXG5cdGdyb3VwOiBmdW5jdGlvbiBncm91cChncm91cCkge1xuXHRcdHRoaXMuX2dyb3VwID0gZ3JvdXA7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0ZGVsYXk6IGZ1bmN0aW9uIGRlbGF5KGFtb3VudCkge1xuXG5cdFx0dGhpcy5fZGVsYXlUaW1lID0gYW1vdW50O1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0cmVwZWF0OiBmdW5jdGlvbiByZXBlYXQodGltZXMpIHtcblxuXHRcdHRoaXMuX3JlcGVhdCA9IHRpbWVzO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0cmVwZWF0RGVsYXk6IGZ1bmN0aW9uIHJlcGVhdERlbGF5KGFtb3VudCkge1xuXG5cdFx0dGhpcy5fcmVwZWF0RGVsYXlUaW1lID0gYW1vdW50O1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0eW95bzogZnVuY3Rpb24geW95byh5eSkge1xuXG5cdFx0dGhpcy5feW95byA9IHl5O1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZWFzaW5nOiBmdW5jdGlvbiBlYXNpbmcoZWFzKSB7XG5cblx0XHR0aGlzLl9lYXNpbmdGdW5jdGlvbiA9IGVhcztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGludGVycG9sYXRpb246IGZ1bmN0aW9uIGludGVycG9sYXRpb24oaW50ZXIpIHtcblxuXHRcdHRoaXMuX2ludGVycG9sYXRpb25GdW5jdGlvbiA9IGludGVyO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y2hhaW46IGZ1bmN0aW9uIGNoYWluKCkge1xuXG5cdFx0dGhpcy5fY2hhaW5lZFR3ZWVucyA9IGFyZ3VtZW50cztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG9uU3RhcnQ6IGZ1bmN0aW9uIG9uU3RhcnQoY2FsbGJhY2spIHtcblxuXHRcdHRoaXMuX29uU3RhcnRDYWxsYmFjayA9IGNhbGxiYWNrO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0b25VcGRhdGU6IGZ1bmN0aW9uIG9uVXBkYXRlKGNhbGxiYWNrKSB7XG5cblx0XHR0aGlzLl9vblVwZGF0ZUNhbGxiYWNrID0gY2FsbGJhY2s7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRvbkNvbXBsZXRlOiBmdW5jdGlvbiBvbkNvbXBsZXRlKGNhbGxiYWNrKSB7XG5cblx0XHR0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG9uU3RvcDogZnVuY3Rpb24gb25TdG9wKGNhbGxiYWNrKSB7XG5cblx0XHR0aGlzLl9vblN0b3BDYWxsYmFjayA9IGNhbGxiYWNrO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0dXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUodGltZSkge1xuXG5cdFx0dmFyIHByb3BlcnR5O1xuXHRcdHZhciBlbGFwc2VkO1xuXHRcdHZhciB2YWx1ZTtcblxuXHRcdGlmICh0aW1lIDwgdGhpcy5fc3RhcnRUaW1lKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPT09IGZhbHNlKSB7XG5cblx0XHRcdGlmICh0aGlzLl9vblN0YXJ0Q2FsbGJhY2sgIT09IG51bGwpIHtcblx0XHRcdFx0dGhpcy5fb25TdGFydENhbGxiYWNrKHRoaXMuX29iamVjdCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRlbGFwc2VkID0gKHRpbWUgLSB0aGlzLl9zdGFydFRpbWUpIC8gdGhpcy5fZHVyYXRpb247XG5cdFx0ZWxhcHNlZCA9ICh0aGlzLl9kdXJhdGlvbiA9PT0gMCB8fCBlbGFwc2VkID4gMSkgPyAxIDogZWxhcHNlZDtcblxuXHRcdHZhbHVlID0gdGhpcy5fZWFzaW5nRnVuY3Rpb24oZWxhcHNlZCk7XG5cblx0XHRmb3IgKHByb3BlcnR5IGluIHRoaXMuX3ZhbHVlc0VuZCkge1xuXG5cdFx0XHQvLyBEb24ndCB1cGRhdGUgcHJvcGVydGllcyB0aGF0IGRvIG5vdCBleGlzdCBpbiB0aGUgc291cmNlIG9iamVjdFxuXHRcdFx0aWYgKHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgc3RhcnQgPSB0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gfHwgMDtcblx0XHRcdHZhciBlbmQgPSB0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldO1xuXG5cdFx0XHRpZiAoZW5kIGluc3RhbmNlb2YgQXJyYXkpIHtcblxuXHRcdFx0XHR0aGlzLl9vYmplY3RbcHJvcGVydHldID0gdGhpcy5faW50ZXJwb2xhdGlvbkZ1bmN0aW9uKGVuZCwgdmFsdWUpO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdC8vIFBhcnNlcyByZWxhdGl2ZSBlbmQgdmFsdWVzIHdpdGggc3RhcnQgYXMgYmFzZSAoZS5nLjogKzEwLCAtMylcblx0XHRcdFx0aWYgKHR5cGVvZiAoZW5kKSA9PT0gJ3N0cmluZycpIHtcblxuXHRcdFx0XHRcdGlmIChlbmQuY2hhckF0KDApID09PSAnKycgfHwgZW5kLmNoYXJBdCgwKSA9PT0gJy0nKSB7XG5cdFx0XHRcdFx0XHRlbmQgPSBzdGFydCArIHBhcnNlRmxvYXQoZW5kKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZW5kID0gcGFyc2VGbG9hdChlbmQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFByb3RlY3QgYWdhaW5zdCBub24gbnVtZXJpYyBwcm9wZXJ0aWVzLlxuXHRcdFx0XHRpZiAodHlwZW9mIChlbmQpID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRcdHRoaXMuX29iamVjdFtwcm9wZXJ0eV0gPSBzdGFydCArIChlbmQgLSBzdGFydCkgKiB2YWx1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRpZiAodGhpcy5fb25VcGRhdGVDYWxsYmFjayAhPT0gbnVsbCkge1xuXHRcdFx0dGhpcy5fb25VcGRhdGVDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xuXHRcdH1cblxuXHRcdGlmIChlbGFwc2VkID09PSAxKSB7XG5cblx0XHRcdGlmICh0aGlzLl9yZXBlYXQgPiAwKSB7XG5cblx0XHRcdFx0aWYgKGlzRmluaXRlKHRoaXMuX3JlcGVhdCkpIHtcblx0XHRcdFx0XHR0aGlzLl9yZXBlYXQtLTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFJlYXNzaWduIHN0YXJ0aW5nIHZhbHVlcywgcmVzdGFydCBieSBtYWtpbmcgc3RhcnRUaW1lID0gbm93XG5cdFx0XHRcdGZvciAocHJvcGVydHkgaW4gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXQpIHtcblxuXHRcdFx0XHRcdGlmICh0eXBlb2YgKHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0pID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldID0gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldICsgcGFyc2VGbG9hdCh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodGhpcy5feW95bykge1xuXHRcdFx0XHRcdFx0dmFyIHRtcCA9IHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XTtcblxuXHRcdFx0XHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldID0gdGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XTtcblx0XHRcdFx0XHRcdHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0gPSB0bXA7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldID0gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5feW95bykge1xuXHRcdFx0XHRcdHRoaXMuX3JldmVyc2VkID0gIXRoaXMuX3JldmVyc2VkO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuX3JlcGVhdERlbGF5VGltZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0dGhpcy5fc3RhcnRUaW1lID0gdGltZSArIHRoaXMuX3JlcGVhdERlbGF5VGltZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLl9zdGFydFRpbWUgPSB0aW1lICsgdGhpcy5fZGVsYXlUaW1lO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayAhPT0gbnVsbCkge1xuXG5cdFx0XHRcdFx0dGhpcy5fb25Db21wbGV0ZUNhbGxiYWNrKHRoaXMuX29iamVjdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmb3IgKHZhciBpID0gMCwgbnVtQ2hhaW5lZFR3ZWVucyA9IHRoaXMuX2NoYWluZWRUd2VlbnMubGVuZ3RoOyBpIDwgbnVtQ2hhaW5lZFR3ZWVuczsgaSsrKSB7XG5cdFx0XHRcdFx0Ly8gTWFrZSB0aGUgY2hhaW5lZCB0d2VlbnMgc3RhcnQgZXhhY3RseSBhdCB0aGUgdGltZSB0aGV5IHNob3VsZCxcblx0XHRcdFx0XHQvLyBldmVuIGlmIHRoZSBgdXBkYXRlKClgIG1ldGhvZCB3YXMgY2FsbGVkIHdheSBwYXN0IHRoZSBkdXJhdGlvbiBvZiB0aGUgdHdlZW5cblx0XHRcdFx0XHR0aGlzLl9jaGFpbmVkVHdlZW5zW2ldLnN0YXJ0KHRoaXMuX3N0YXJ0VGltZSArIHRoaXMuX2R1cmF0aW9uKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cblx0fVxufTtcblxuXG5UV0VFTi5FYXNpbmcgPSB7XG5cblx0TGluZWFyOiB7XG5cblx0XHROb25lOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gaztcblxuXHRcdH1cblxuXHR9LFxuXG5cdFF1YWRyYXRpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogaztcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogKDIgLSBrKTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGs7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAtIDAuNSAqICgtLWsgKiAoayAtIDIpIC0gMSk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRDdWJpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogayAqIGs7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gLS1rICogayAqIGsgKyAxO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAwLjUgKiBrICogayAqIGs7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwLjUgKiAoKGsgLT0gMikgKiBrICogayArIDIpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0UXVhcnRpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogayAqIGsgKiBrO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDEgLSAoLS1rICogayAqIGsgKiBrKTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGsgKiBrICogaztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIC0gMC41ICogKChrIC09IDIpICogayAqIGsgKiBrIC0gMik7XG5cblx0XHR9XG5cblx0fSxcblxuXHRRdWludGljOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGsgKiBrICogayAqIGsgKiBrO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIC0tayAqIGsgKiBrICogayAqIGsgKyAxO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAwLjUgKiBrICogayAqIGsgKiBrICogaztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDAuNSAqICgoayAtPSAyKSAqIGsgKiBrICogayAqIGsgKyAyKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdFNpbnVzb2lkYWw6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gMSAtIE1hdGguY29zKGsgKiBNYXRoLlBJIC8gMik7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gTWF0aC5zaW4oayAqIE1hdGguUEkgLyAyKTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDAuNSAqICgxIC0gTWF0aC5jb3MoTWF0aC5QSSAqIGspKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdEV4cG9uZW50aWFsOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGsgPT09IDAgPyAwIDogTWF0aC5wb3coMTAyNCwgayAtIDEpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGsgPT09IDEgPyAxIDogMSAtIE1hdGgucG93KDIsIC0gMTAgKiBrKTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKGsgPT09IDApIHtcblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAwLjUgKiBNYXRoLnBvdygxMDI0LCBrIC0gMSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwLjUgKiAoLSBNYXRoLnBvdygyLCAtIDEwICogKGsgLSAxKSkgKyAyKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdENpcmN1bGFyOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDEgLSBNYXRoLnNxcnQoMSAtIGsgKiBrKTtcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBNYXRoLnNxcnQoMSAtICgtLWsgKiBrKSk7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIC0gMC41ICogKE1hdGguc3FydCgxIC0gayAqIGspIC0gMSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwLjUgKiAoTWF0aC5zcXJ0KDEgLSAoayAtPSAyKSAqIGspICsgMSk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRFbGFzdGljOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKGsgPT09IDApIHtcblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gLU1hdGgucG93KDIsIDEwICogKGsgLSAxKSkgKiBNYXRoLnNpbigoayAtIDEuMSkgKiA1ICogTWF0aC5QSSk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA9PT0gMCkge1xuXHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGsgPT09IDEpIHtcblx0XHRcdFx0cmV0dXJuIDE7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBNYXRoLnBvdygyLCAtMTAgKiBrKSAqIE1hdGguc2luKChrIC0gMC4xKSAqIDUgKiBNYXRoLlBJKSArIDE7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrID09PSAwKSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoayA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0ayAqPSAyO1xuXG5cdFx0XHRpZiAoayA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIC0wLjUgKiBNYXRoLnBvdygyLCAxMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogTWF0aC5wb3coMiwgLTEwICogKGsgLSAxKSkgKiBNYXRoLnNpbigoayAtIDEuMSkgKiA1ICogTWF0aC5QSSkgKyAxO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0QmFjazoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHZhciBzID0gMS43MDE1ODtcblxuXHRcdFx0cmV0dXJuIGsgKiBrICogKChzICsgMSkgKiBrIC0gcyk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHR2YXIgcyA9IDEuNzAxNTg7XG5cblx0XHRcdHJldHVybiAtLWsgKiBrICogKChzICsgMSkgKiBrICsgcykgKyAxO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHR2YXIgcyA9IDEuNzAxNTggKiAxLjUyNTtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogKGsgKiBrICogKChzICsgMSkgKiBrIC0gcykpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKChrIC09IDIpICogayAqICgocyArIDEpICogayArIHMpICsgMik7XG5cblx0XHR9XG5cblx0fSxcblxuXHRCb3VuY2U6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gMSAtIFRXRUVOLkVhc2luZy5Cb3VuY2UuT3V0KDEgLSBrKTtcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrIDwgKDEgLyAyLjc1KSkge1xuXHRcdFx0XHRyZXR1cm4gNy41NjI1ICogayAqIGs7XG5cdFx0XHR9IGVsc2UgaWYgKGsgPCAoMiAvIDIuNzUpKSB7XG5cdFx0XHRcdHJldHVybiA3LjU2MjUgKiAoayAtPSAoMS41IC8gMi43NSkpICogayArIDAuNzU7XG5cdFx0XHR9IGVsc2UgaWYgKGsgPCAoMi41IC8gMi43NSkpIHtcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIChrIC09ICgyLjI1IC8gMi43NSkpICogayArIDAuOTM3NTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiA3LjU2MjUgKiAoayAtPSAoMi42MjUgLyAyLjc1KSkgKiBrICsgMC45ODQzNzU7XG5cdFx0XHR9XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrIDwgMC41KSB7XG5cdFx0XHRcdHJldHVybiBUV0VFTi5FYXNpbmcuQm91bmNlLkluKGsgKiAyKSAqIDAuNTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIFRXRUVOLkVhc2luZy5Cb3VuY2UuT3V0KGsgKiAyIC0gMSkgKiAwLjUgKyAwLjU7XG5cblx0XHR9XG5cblx0fVxuXG59O1xuXG5UV0VFTi5JbnRlcnBvbGF0aW9uID0ge1xuXG5cdExpbmVhcjogZnVuY3Rpb24gKHYsIGspIHtcblxuXHRcdHZhciBtID0gdi5sZW5ndGggLSAxO1xuXHRcdHZhciBmID0gbSAqIGs7XG5cdFx0dmFyIGkgPSBNYXRoLmZsb29yKGYpO1xuXHRcdHZhciBmbiA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuTGluZWFyO1xuXG5cdFx0aWYgKGsgPCAwKSB7XG5cdFx0XHRyZXR1cm4gZm4odlswXSwgdlsxXSwgZik7XG5cdFx0fVxuXG5cdFx0aWYgKGsgPiAxKSB7XG5cdFx0XHRyZXR1cm4gZm4odlttXSwgdlttIC0gMV0sIG0gLSBmKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZm4odltpXSwgdltpICsgMSA+IG0gPyBtIDogaSArIDFdLCBmIC0gaSk7XG5cblx0fSxcblxuXHRCZXppZXI6IGZ1bmN0aW9uICh2LCBrKSB7XG5cblx0XHR2YXIgYiA9IDA7XG5cdFx0dmFyIG4gPSB2Lmxlbmd0aCAtIDE7XG5cdFx0dmFyIHB3ID0gTWF0aC5wb3c7XG5cdFx0dmFyIGJuID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5VdGlscy5CZXJuc3RlaW47XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8PSBuOyBpKyspIHtcblx0XHRcdGIgKz0gcHcoMSAtIGssIG4gLSBpKSAqIHB3KGssIGkpICogdltpXSAqIGJuKG4sIGkpO1xuXHRcdH1cblxuXHRcdHJldHVybiBiO1xuXG5cdH0sXG5cblx0Q2F0bXVsbFJvbTogZnVuY3Rpb24gKHYsIGspIHtcblxuXHRcdHZhciBtID0gdi5sZW5ndGggLSAxO1xuXHRcdHZhciBmID0gbSAqIGs7XG5cdFx0dmFyIGkgPSBNYXRoLmZsb29yKGYpO1xuXHRcdHZhciBmbiA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuQ2F0bXVsbFJvbTtcblxuXHRcdGlmICh2WzBdID09PSB2W21dKSB7XG5cblx0XHRcdGlmIChrIDwgMCkge1xuXHRcdFx0XHRpID0gTWF0aC5mbG9vcihmID0gbSAqICgxICsgaykpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZm4odlsoaSAtIDEgKyBtKSAlIG1dLCB2W2ldLCB2WyhpICsgMSkgJSBtXSwgdlsoaSArIDIpICUgbV0sIGYgLSBpKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGlmIChrIDwgMCkge1xuXHRcdFx0XHRyZXR1cm4gdlswXSAtIChmbih2WzBdLCB2WzBdLCB2WzFdLCB2WzFdLCAtZikgLSB2WzBdKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGsgPiAxKSB7XG5cdFx0XHRcdHJldHVybiB2W21dIC0gKGZuKHZbbV0sIHZbbV0sIHZbbSAtIDFdLCB2W20gLSAxXSwgZiAtIG0pIC0gdlttXSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmbih2W2kgPyBpIC0gMSA6IDBdLCB2W2ldLCB2W20gPCBpICsgMSA/IG0gOiBpICsgMV0sIHZbbSA8IGkgKyAyID8gbSA6IGkgKyAyXSwgZiAtIGkpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0VXRpbHM6IHtcblxuXHRcdExpbmVhcjogZnVuY3Rpb24gKHAwLCBwMSwgdCkge1xuXG5cdFx0XHRyZXR1cm4gKHAxIC0gcDApICogdCArIHAwO1xuXG5cdFx0fSxcblxuXHRcdEJlcm5zdGVpbjogZnVuY3Rpb24gKG4sIGkpIHtcblxuXHRcdFx0dmFyIGZjID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5VdGlscy5GYWN0b3JpYWw7XG5cblx0XHRcdHJldHVybiBmYyhuKSAvIGZjKGkpIC8gZmMobiAtIGkpO1xuXG5cdFx0fSxcblxuXHRcdEZhY3RvcmlhbDogKGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0dmFyIGEgPSBbMV07XG5cblx0XHRcdHJldHVybiBmdW5jdGlvbiAobikge1xuXG5cdFx0XHRcdHZhciBzID0gMTtcblxuXHRcdFx0XHRpZiAoYVtuXSkge1xuXHRcdFx0XHRcdHJldHVybiBhW25dO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IG47IGkgPiAxOyBpLS0pIHtcblx0XHRcdFx0XHRzICo9IGk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRhW25dID0gcztcblx0XHRcdFx0cmV0dXJuIHM7XG5cblx0XHRcdH07XG5cblx0XHR9KSgpLFxuXG5cdFx0Q2F0bXVsbFJvbTogZnVuY3Rpb24gKHAwLCBwMSwgcDIsIHAzLCB0KSB7XG5cblx0XHRcdHZhciB2MCA9IChwMiAtIHAwKSAqIDAuNTtcblx0XHRcdHZhciB2MSA9IChwMyAtIHAxKSAqIDAuNTtcblx0XHRcdHZhciB0MiA9IHQgKiB0O1xuXHRcdFx0dmFyIHQzID0gdCAqIHQyO1xuXG5cdFx0XHRyZXR1cm4gKDIgKiBwMSAtIDIgKiBwMiArIHYwICsgdjEpICogdDMgKyAoLSAzICogcDEgKyAzICogcDIgLSAyICogdjAgLSB2MSkgKiB0MiArIHYwICogdCArIHAxO1xuXG5cdFx0fVxuXG5cdH1cblxufTtcblxuLy8gVU1EIChVbml2ZXJzYWwgTW9kdWxlIERlZmluaXRpb24pXG4oZnVuY3Rpb24gKHJvb3QpIHtcblxuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBUV0VFTjtcblx0XHR9KTtcblxuXHR9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuXG5cdFx0Ly8gTm9kZS5qc1xuXHRcdG1vZHVsZS5leHBvcnRzID0gVFdFRU47XG5cblx0fSBlbHNlIGlmIChyb290ICE9PSB1bmRlZmluZWQpIHtcblxuXHRcdC8vIEdsb2JhbCB2YXJpYWJsZVxuXHRcdHJvb3QuVFdFRU4gPSBUV0VFTjtcblxuXHR9XG5cbn0pKHRoaXMpO1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qIGpzcGFuZWwuc2FzczogMjAxOC0wNC0xOCAyMDoyNCAqL1xcbi8qIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzA0MjE1NzAvc2Fzcy11bmljb2RlLWVzY2FwZS1pcy1ub3QtcHJlc2VydmVkLWluLWNzcy1maWxlICovXFxuLmpzUGFuZWwge1xcbiAgYm9yZGVyOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiT3BlbiBTYW5zXFxcIixcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgb3BhY2l0eTogMDtcXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgei1pbmRleDogMTAwOyB9XFxuICAuanNQYW5lbCAuanNQYW5lbC1oZHIge1xcbiAgICBib3JkZXI6IDA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJPcGVuIFNhbnNcXFwiLFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWY7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgZmxleC1zaHJpbms6IDA7IH1cXG4gIC5qc1BhbmVsIC5qc1BhbmVsLWNvbnRlbnQge1xcbiAgICBib3JkZXI6IDA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJPcGVuIFNhbnNcXFwiLFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWY7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIGJhY2tncm91bmQ6ICNmZmZmZmY7XFxuICAgIGNvbG9yOiAjMDAwMDAwO1xcbiAgICBmb250LXNpemU6IDFyZW07XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xcbiAgICBvdmVyZmxvdy15OiBhdXRvOyB9XFxuICAgIC5qc1BhbmVsIC5qc1BhbmVsLWNvbnRlbnQgcHJlIHtcXG4gICAgICBjb2xvcjogaW5oZXJpdDsgfVxcbiAgLmpzUGFuZWwgLmpzUGFuZWwtZnRyIHtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXG4gICAgZmxleC13cmFwOiBub3dyYXA7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZTBlMGUwO1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBmb250LXNpemU6IDFyZW07XFxuICAgIGhlaWdodDogYXV0bztcXG4gICAgYmFja2dyb3VuZDogI2Y1ZjVmNTtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgY29sb3I6IGJsYWNrO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuICAuanNQYW5lbCAuanNQYW5lbC1mdHIuYWN0aXZlIHtcXG4gICAgZGlzcGxheTogZmxleDsgfVxcbiAgICAuanNQYW5lbCAuanNQYW5lbC1mdHIuYWN0aXZlID4gKiB7XFxuICAgICAgbWFyZ2luOiAzcHggOHB4OyB9XFxuICAuanNQYW5lbCAuanNQYW5lbC1mdHIucGFuZWwtZm9vdGVyIHtcXG4gICAgcGFkZGluZzogMDsgfVxcblxcbi5qc1BhbmVsLWhlYWRlcmJhciwgLmpzUGFuZWwtaGRyLXRvb2xiYXIge1xcbiAgZm9udC1zaXplOiAxcmVtOyB9XFxuXFxuLmpzUGFuZWwtaGVhZGVyYmFyIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGZsZXgtd3JhcDogbm93cmFwO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjsgfVxcbiAgLmpzUGFuZWwtaGVhZGVyYmFyIGltZyB7XFxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICAgIG1heC1oZWlnaHQ6IDM4cHg7IH1cXG5cXG4uanNQYW5lbC10aXRsZWJhciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXgtZ3JvdzogMTtcXG4gIGN1cnNvcjogbW92ZTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG92ZXJmbG93OiBoaWRkZW47IH1cXG4gIC5qc1BhbmVsLXRpdGxlYmFyIC5qc1BhbmVsLXRpdGxlIHtcXG4gICAgY29sb3I6ICMwMDAwMDA7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiT3BlbiBTYW5zXFxcIixcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmO1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcbiAgICBmb250LXZhcmlhbnQ6IHNtYWxsLWNhcHM7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIG1hcmdpbjogMCA1cHggMCA4cHg7XFxuICAgIG1pbi13aWR0aDogMDsgfVxcbiAgICAuanNQYW5lbC10aXRsZWJhciAuanNQYW5lbC10aXRsZSBzbWFsbCB7XFxuICAgICAgZm9udC1zaXplOiA3NSU7XFxuICAgICAgY29sb3I6IGluaGVyaXQ7IH1cXG5cXG4uanNQYW5lbC10aXRsZWJhci5qc1BhbmVsLXJ0bCB7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7IH1cXG5cXG4uanNQYW5lbC1jb250cm9sYmFyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgdG91Y2gtYWN0aW9uOiBub25lOyB9XFxuICAuanNQYW5lbC1jb250cm9sYmFyIGRpdiBzcGFuOmhvdmVyLCAuanNQYW5lbC1jb250cm9sYmFyIGRpdiBzdmc6aG92ZXIge1xcbiAgICBvcGFjaXR5OiAuNjsgfVxcbiAgLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4ge1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIHRvdWNoLWFjdGlvbjogbm9uZTsgfVxcbiAgICAuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0biBzcGFuIHtcXG4gICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgICAgIHBhZGRpbmc6IDAgNHB4IDAgMnB4OyB9XFxuICAgIC5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuIHNwYW4uZ2x5cGhpY29uIHtcXG4gICAgICBwYWRkaW5nOiAwIDJweDsgfVxcbiAgICAuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0biBzdmcge1xcbiAgICAgIG1hcmdpbjogMCA4cHggMCAzcHg7IH1cXG4gICAgLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4gLmpzUGFuZWwtaWNvbiB7XFxuICAgICAgcGFkZGluZy10b3A6IDlweDtcXG4gICAgICBtYXJnaW46IDAgNHB4IDAgMDsgfVxcbiAgLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4tbm9ybWFsaXplLCAuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0bi1zbWFsbGlmeXJldiB7XFxuICAgIGRpc3BsYXk6IG5vbmU7IH1cXG5cXG4uanNQYW5lbC1oZHItdG9vbGJhciB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgd2lkdGg6IGF1dG87XFxuICBoZWlnaHQ6IGF1dG87XFxuICBmb250LXNpemU6IDFyZW07IH1cXG5cXG4uanNQYW5lbC1oZHItdG9vbGJhci5hY3RpdmUge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgZmxleC13cmFwOiBub3dyYXA7XFxuICBhbGlnbi1pdGVtczogY2VudGVyOyB9XFxuICAuanNQYW5lbC1oZHItdG9vbGJhci5hY3RpdmUgPiAqIHtcXG4gICAgbWFyZ2luOiAzcHggOHB4OyB9XFxuXFxuLyogc3R5bGVzIGZvciBwYW5lbHMgdXNpbmcgb3B0aW9uLnJ0bCAqL1xcbi5qc1BhbmVsLWhlYWRlcmJhci5qc1BhbmVsLXJ0bCwgLmpzUGFuZWwtY29udHJvbGJhci5qc1BhbmVsLXJ0bCwgLmpzUGFuZWwtaGRyLXRvb2xiYXIuanNQYW5lbC1ydGwge1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlOyB9XFxuXFxuLmpzUGFuZWwtaGRyLXRvb2xiYXIuYWN0aXZlLmpzUGFuZWwtcnRsIHtcXG4gIHBhZGRpbmc6IDdweCAwIDEwcHggMDsgfVxcblxcbi5qc1BhbmVsLWZ0ci5qc1BhbmVsLXJ0bCB7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93OyB9XFxuXFxuLyogY29udGFpbmVyIHRoYXQgdGFrZXMgdGhlIG1pbmlmaWVkIGpzUGFuZWxzICovXFxuI2pzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyLCAuanNQYW5lbC1taW5pbWl6ZWQtYm94LCAuanNQYW5lbC1taW5pbWl6ZWQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWZsb3c6IHJvdyB3cmFwLXJldmVyc2U7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCBub25lIHJlcGVhdCBzY3JvbGwgMCAwO1xcbiAgYm90dG9tOiAwO1xcbiAgaGVpZ2h0OiBhdXRvO1xcbiAgbGVmdDogMDtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHdpZHRoOiBhdXRvO1xcbiAgei1pbmRleDogOTk5ODsgfVxcbiAgI2pzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50LCAuanNQYW5lbC1taW5pbWl6ZWQtYm94IC5qc1BhbmVsLXJlcGxhY2VtZW50LCAuanNQYW5lbC1taW5pbWl6ZWQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgd2lkdGg6IDIwMHB4O1xcbiAgICBoZWlnaHQ6IDQwcHg7XFxuICAgIG1hcmdpbjogMXB4IDFweCAwIDA7XFxuICAgIHotaW5kZXg6IDk5OTk7IH1cXG4gICAgI2pzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWhkciwgLmpzUGFuZWwtbWluaW1pemVkLWJveCAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1oZHIsIC5qc1BhbmVsLW1pbmltaXplZC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtaGRyIHtcXG4gICAgICBmbGV4LWdyb3c6IDE7XFxuICAgICAgbWluLXdpZHRoOiAwO1xcbiAgICAgIHBhZGRpbmc6IDA7IH1cXG4gICAgICAjanNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhlYWRlcmxvZ28sIC5qc1BhbmVsLW1pbmltaXplZC1ib3ggLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhlYWRlcmxvZ28sIC5qc1BhbmVsLW1pbmltaXplZC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhlYWRlcmxvZ28ge1xcbiAgICAgICAgbWF4LXdpZHRoOiA1MCU7XFxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuICAgICAgICAjanNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhlYWRlcmxvZ28gaW1nLCAuanNQYW5lbC1taW5pbWl6ZWQtYm94IC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZWFkZXJsb2dvIGltZywgLmpzUGFuZWwtbWluaW1pemVkLWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGVhZGVybG9nbyBpbWcge1xcbiAgICAgICAgICBtYXgtd2lkdGg6IDEwMHB4O1xcbiAgICAgICAgICBtYXgtaGVpZ2h0OiAzOHB4OyB9XFxuICAgICNqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC10aXRsZWJhciwgLmpzUGFuZWwtbWluaW1pemVkLWJveCAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC10aXRsZWJhciwgLmpzUGFuZWwtbWluaW1pemVkLWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC10aXRsZWJhciB7XFxuICAgICAgY3Vyc29yOiBkZWZhdWx0O1xcbiAgICAgIG1pbi13aWR0aDogMDsgfVxcbiAgICAjanNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtYnRuLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZSwgLmpzUGFuZWwtbWluaW1pemVkLWJveCAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1idG4uanNQYW5lbC1idG4tbm9ybWFsaXplLCAuanNQYW5lbC1taW5pbWl6ZWQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWJ0bi5qc1BhbmVsLWJ0bi1ub3JtYWxpemUge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrOyB9XFxuXFxuLmpzUGFuZWwtbWluaW1pemVkLWJveCwgLmpzUGFuZWwtbWluaW1pemVkLWNvbnRhaW5lciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogMTAwJTtcXG4gIG92ZXJmbG93OiBoaWRkZW47IH1cXG5cXG4vKiBoZWxwZXIgY2xhc3NlcyB0byBtYWtlIC5qc1BhbmVsLWNvbnRlbnQgYSBmbGV4IGJveCAqL1xcbi5mbGV4T25lIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWZsb3c6IHJvdyB3cmFwOyB9XFxuXFxuLyogY3NzIGZvciByZXNpemVpdCBoYW5kbGVzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBmb250LXNpemU6IDAuMXB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG91Y2gtYWN0aW9uOiBub25lOyB9XFxuXFxuLmpzUGFuZWwtcmVzaXplaXQtaGFuZGxlLmpzUGFuZWwtcmVzaXplaXQtbiB7XFxuICBjdXJzb3I6IG4tcmVzaXplO1xcbiAgaGVpZ2h0OiAxMnB4O1xcbiAgbGVmdDogOXB4O1xcbiAgdG9wOiAtNXB4O1xcbiAgd2lkdGg6IGNhbGMoMTAwJSAtIDE4cHgpOyB9XFxuXFxuLmpzUGFuZWwtcmVzaXplaXQtaGFuZGxlLmpzUGFuZWwtcmVzaXplaXQtZSB7XFxuICBjdXJzb3I6IGUtcmVzaXplO1xcbiAgaGVpZ2h0OiBjYWxjKDEwMCUgLSAxOHB4KTtcXG4gIHJpZ2h0OiAtOXB4O1xcbiAgdG9wOiA5cHg7XFxuICB3aWR0aDogMTJweDsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LXMge1xcbiAgYm90dG9tOiAtOXB4O1xcbiAgY3Vyc29yOiBzLXJlc2l6ZTtcXG4gIGhlaWdodDogMTJweDtcXG4gIGxlZnQ6IDlweDtcXG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAxOHB4KTsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LXcge1xcbiAgY3Vyc29yOiB3LXJlc2l6ZTtcXG4gIGhlaWdodDogY2FsYygxMDAlIC0gMThweCk7XFxuICBsZWZ0OiAtOXB4O1xcbiAgdG9wOiA5cHg7XFxuICB3aWR0aDogMTJweDsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LW5lIHtcXG4gIGN1cnNvcjogbmUtcmVzaXplO1xcbiAgaGVpZ2h0OiAxOHB4O1xcbiAgcmlnaHQ6IC05cHg7XFxuICB0b3A6IC05cHg7XFxuICB3aWR0aDogMThweDsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LXNlIHtcXG4gIGJvdHRvbTogLTlweDtcXG4gIGN1cnNvcjogc2UtcmVzaXplO1xcbiAgaGVpZ2h0OiAxOHB4O1xcbiAgcmlnaHQ6IC05cHg7XFxuICB3aWR0aDogMThweDsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LXN3IHtcXG4gIGJvdHRvbTogLTlweDtcXG4gIGN1cnNvcjogc3ctcmVzaXplO1xcbiAgaGVpZ2h0OiAxOHB4O1xcbiAgbGVmdDogLTlweDtcXG4gIHdpZHRoOiAxOHB4OyB9XFxuXFxuLmpzUGFuZWwtcmVzaXplaXQtaGFuZGxlLmpzUGFuZWwtcmVzaXplaXQtbncge1xcbiAgY3Vyc29yOiBudy1yZXNpemU7XFxuICBoZWlnaHQ6IDE4cHg7XFxuICBsZWZ0OiAtOXB4O1xcbiAgdG9wOiAtOXB4O1xcbiAgd2lkdGg6IDE4cHg7IH1cXG5cXG4uanNQYW5lbC1kcmFnLW92ZXJsYXkge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiAwOyB9XFxuXFxuLyogYm94LXNoYWRvd3MgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtZGVwdGgtMSB7XFxuICBib3gtc2hhZG93OiAwIDNweCA2cHggcmdiYSgwLCAwLCAwLCAwLjE2KSwgMCAzcHggNnB4IHJnYmEoMCwgMCwgMCwgMC4yMyk7IH1cXG5cXG4uanNQYW5lbC1kZXB0aC0yIHtcXG4gIGJveC1zaGFkb3c6IDAgMTBweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC4xOSksIDAgNnB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMjMpOyB9XFxuXFxuLmpzUGFuZWwtZGVwdGgtMyB7XFxuICBib3gtc2hhZG93OiAwIDE0cHggMjhweCByZ2JhKDAsIDAsIDAsIDAuMjUpLCAwIDEwcHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMjIpOyB9XFxuXFxuLmpzUGFuZWwtZGVwdGgtNCB7XFxuICBib3gtc2hhZG93OiAwIDE5cHggMzhweCByZ2JhKDAsIDAsIDAsIDAuMyksIDAgMTVweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4yMik7IH1cXG5cXG4uanNQYW5lbC1kZXB0aC01IHtcXG4gIGJveC1zaGFkb3c6IDAgMjRweCA0OHB4IHJnYmEoMCwgMCwgMCwgMC4zKSwgMCAyMHB4IDE0cHggcmdiYSgwLCAwLCAwLCAwLjIyKTsgfVxcblxcbi8qIHNuYXAgc2Vuc2l0aXZlIGFyZWFzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcbi5qc1BhbmVsLXNuYXAtYXJlYSB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBiYWNrZ3JvdW5kOiBibGFjaztcXG4gIG9wYWNpdHk6IC4yO1xcbiAgYm9yZGVyOiAxcHggc29saWQgc2lsdmVyO1xcbiAgYm94LXNoYWRvdzogMCAxNHB4IDI4cHggcmdiYSgwLCAwLCAwLCAwLjUpLCAwIDEwcHggMTBweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICB6LWluZGV4OiA5OTk5OyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWx0LCAuanNQYW5lbC1zbmFwLWFyZWEtbGMsIC5qc1BhbmVsLXNuYXAtYXJlYS1sYiB7XFxuICBsZWZ0OiAwOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWN0LCAuanNQYW5lbC1zbmFwLWFyZWEtY2Ige1xcbiAgbGVmdDogMzcuNSU7IH1cXG5cXG4uanNQYW5lbC1zbmFwLWFyZWEtcnQsIC5qc1BhbmVsLXNuYXAtYXJlYS1yYywgLmpzUGFuZWwtc25hcC1hcmVhLXJiIHtcXG4gIHJpZ2h0OiAwOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWx0LCAuanNQYW5lbC1zbmFwLWFyZWEtY3QsIC5qc1BhbmVsLXNuYXAtYXJlYS1ydCB7XFxuICB0b3A6IDA7IH1cXG5cXG4uanNQYW5lbC1zbmFwLWFyZWEtbGMsIC5qc1BhbmVsLXNuYXAtYXJlYS1yYyB7XFxuICB0b3A6IDM3LjUlOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWxiLCAuanNQYW5lbC1zbmFwLWFyZWEtY2IsIC5qc1BhbmVsLXNuYXAtYXJlYS1yYiB7XFxuICBib3R0b206IDA7IH1cXG5cXG4uanNQYW5lbC1zbmFwLWFyZWEtY3QsIC5qc1BhbmVsLXNuYXAtYXJlYS1jYiB7XFxuICB3aWR0aDogMjUlOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWxjLCAuanNQYW5lbC1zbmFwLWFyZWEtcmMge1xcbiAgaGVpZ2h0OiAyNSU7IH1cXG5cXG4uanNQYW5lbC1zbmFwLWFyZWEtbHQge1xcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwMCU7IH1cXG5cXG4uanNQYW5lbC1zbmFwLWFyZWEtcnQge1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTAwJTsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1yYiB7XFxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAxMDAlOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWxiIHtcXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxMDAlOyB9XFxuXFxuLyogdG9vbHRpcCBhbmQgdG9vbHRpcCBjb25uZWN0b3JzICovXFxuLmpzUGFuZWwtY29ubmVjdG9yLWxlZnQtdG9wLCAuanNQYW5lbC1jb25uZWN0b3ItcmlnaHQtdG9wLCAuanNQYW5lbC1jb25uZWN0b3ItbGVmdC1ib3R0b20sIC5qc1BhbmVsLWNvbm5lY3Rvci1yaWdodC1ib3R0b20ge1xcbiAgd2lkdGg6IDEycHg7XFxuICBoZWlnaHQ6IDEycHg7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7IH1cXG5cXG4uanNQYW5lbC1jb25uZWN0b3ItbGVmdCwgLmpzUGFuZWwtY29ubmVjdG9yLXRvcCwgLmpzUGFuZWwtY29ubmVjdG9yLWJvdHRvbSwgLmpzUGFuZWwtY29ubmVjdG9yLXJpZ2h0IHtcXG4gIHdpZHRoOiAwO1xcbiAgaGVpZ2h0OiAwO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm9yZGVyOiAxMnB4IHNvbGlkIHRyYW5zcGFyZW50OyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLWxlZnQtdG9wIHtcXG4gIGxlZnQ6IGNhbGMoMTAwJSAtIDZweCk7XFxuICB0b3A6IGNhbGMoMTAwJSAtIDZweCk7IH1cXG5cXG4uanNQYW5lbC1jb25uZWN0b3ItcmlnaHQtdG9wIHtcXG4gIGxlZnQ6IC02cHg7XFxuICB0b3A6IGNhbGMoMTAwJSAtIDZweCk7IH1cXG5cXG4uanNQYW5lbC1jb25uZWN0b3ItcmlnaHQtYm90dG9tIHtcXG4gIGxlZnQ6IC02cHg7XFxuICB0b3A6IC02cHg7IH1cXG5cXG4uanNQYW5lbC1jb25uZWN0b3ItbGVmdC1ib3R0b20ge1xcbiAgbGVmdDogY2FsYygxMDAlIC0gNnB4KTtcXG4gIHRvcDogLTZweDsgfVxcblxcbi5qc1BhbmVsLWNvbm5lY3Rvci10b3Age1xcbiAgbGVmdDogY2FsYyg1MCUgLSAxMnB4KTtcXG4gIHRvcDogMTAwJTsgfVxcblxcbi5qc1BhbmVsLWNvbm5lY3Rvci1yaWdodCB7XFxuICBsZWZ0OiAtMjRweDtcXG4gIHRvcDogY2FsYyg1MCUgLSAxMnB4KTsgfVxcblxcbi5qc1BhbmVsLWNvbm5lY3Rvci1ib3R0b20ge1xcbiAgbGVmdDogY2FsYyg1MCUgLSAxMnB4KTtcXG4gIHRvcDogLTI0cHg7IH1cXG5cXG4uanNQYW5lbC1jb25uZWN0b3ItbGVmdCB7XFxuICBsZWZ0OiAxMDAlO1xcbiAgdG9wOiBjYWxjKDUwJSAtIDEycHgpOyB9XFxuXFxuLyogSUUxMSBDU1Mgc3R5bGVzIGdvIGhlcmUgKi9cXG5AbWVkaWEgYWxsIGFuZCAoLW1zLWhpZ2gtY29udHJhc3Q6IG5vbmUpLCAoLW1zLWhpZ2gtY29udHJhc3Q6IGFjdGl2ZSkge1xcbiAgI2pzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLXRpdGxlYmFyIHtcXG4gICAgbWF4LXdpZHRoOiAxMDVweDsgfSB9XFxuXFxuLyogWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFggKi9cXG4vKiBib290c3RyYXAgYWRqdXN0bWVudHMgKi9cXG4uanNQYW5lbC5wYW5lbC1kZWZhdWx0LCAuanNQYW5lbC5wYW5lbC1wcmltYXJ5LCAuanNQYW5lbC5wYW5lbC1pbmZvLCAuanNQYW5lbC5wYW5lbC1zdWNjZXNzLCAuanNQYW5lbC5wYW5lbC13YXJuaW5nLCAuanNQYW5lbC5wYW5lbC1kYW5nZXIsIC5qc1BhbmVsLmNhcmQuY2FyZC1pbnZlcnNlIHtcXG4gIGJveC1zaGFkb3c6IDAgMCA2cHggcmdiYSgwLCAzMywgNTAsIDAuMSksIDAgN3B4IDI1cHggcmdiYSgxNywgMzgsIDYwLCAwLjQpOyB9XFxuXFxuLmpzUGFuZWwucGFuZWwge1xcbiAgbWFyZ2luOiAwOyB9XFxuXFxuLmpzUGFuZWwtaGRyLnBhbmVsLWhlYWRpbmcge1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTtcXG4gIHBhZGRpbmc6IDA7IH1cXG5cXG4uanNQYW5lbC10aXRsZS5wYW5lbC10aXRsZSAuc21hbGwsIC5qc1BhbmVsLXRpdGxlLnBhbmVsLXRpdGxlIHNtYWxsIHtcXG4gIGZvbnQtc2l6ZTogNzUlOyB9XFxuXFxuLyogYm9vdHN0cmFwIDQgYWRqdXN0bWVudHMgKi9cXG4uanNQYW5lbC5jYXJkLmNhcmQtaW52ZXJzZSB7XFxuICBib3gtc2hhZG93OiAwIDAgNnB4IHJnYmEoMCwgMzMsIDUwLCAwLjEpLCAwIDdweCAyNXB4IHJnYmEoMTcsIDM4LCA2MCwgMC40KTsgfVxcblxcbi5jYXJkLWRlZmF1bHQge1xcbiAgYmFja2dyb3VuZDogI2Y1ZjVmNTsgfVxcblxcbi5jYXJkLXByaW1hcnkgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQsXFxuLmNhcmQtc3VjY2VzcyA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCxcXG4uY2FyZC1pbmZvID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkLFxcbi5jYXJkLXdhcm5pbmcgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQsXFxuLmNhcmQtZGFuZ2VyID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkIHtcXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgY29sb3I6ICNmNWY1ZjU7IH1cXG5cXG4uY2FyZC1kZWZhdWx0ID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkIHtcXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4vKiBjc3MzIGFuaW1hdGlvbnMgKi9cXG5Aa2V5ZnJhbWVzIGpzUGFuZWxGYWRlSW4ge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuLmpzUGFuZWxGYWRlSW4ge1xcbiAgb3BhY2l0eTogMDtcXG4gIGFuaW1hdGlvbjoganNQYW5lbEZhZGVJbiBlYXNlLWluIDE7XFxuICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogNjAwbXM7IH1cXG5cXG5Aa2V5ZnJhbWVzIGpzUGFuZWxGYWRlT3V0IHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDA7IH0gfVxcblxcbi5qc1BhbmVsRmFkZU91dCB7XFxuICBhbmltYXRpb246IGpzUGFuZWxGYWRlT3V0IGVhc2UtaW4gMTtcXG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiA2MDBtczsgfVxcblxcbkBrZXlmcmFtZXMgbW9kYWxCYWNrZHJvcEZhZGVJbiB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwLjY1OyB9IH1cXG5cXG4uanNQYW5lbC1tb2RhbC1iYWNrZHJvcCB7XFxuICBhbmltYXRpb246IG1vZGFsQmFja2Ryb3BGYWRlSW4gZWFzZS1pbiAxO1xcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDc1MG1zO1xcbiAgYmFja2dyb3VuZDogYmxhY2s7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7IH1cXG5cXG5Aa2V5ZnJhbWVzIG1vZGFsQmFja2Ryb3BGYWRlT3V0IHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwLjY1OyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDA7IH0gfVxcblxcbi5qc1BhbmVsLW1vZGFsLWJhY2tkcm9wLW91dCB7XFxuICBhbmltYXRpb246IG1vZGFsQmFja2Ryb3BGYWRlT3V0IGVhc2UtaW4gMTtcXG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiA0MDBtczsgfVxcblxcbi5qc1BhbmVsLW1vZGFsLWJhY2tkcm9wLW11bHRpIHtcXG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4xNSk7IH1cXG5cXG4uanNQYW5lbC1jb250ZW50IC5qc1BhbmVsLWlmcmFtZS1vdmVybGF5IHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IH1cXG5cXG4vKiBfdGhlbWVzX21kbC5zYXNzOiAyMDE3LTA3LTEyIDE5OjE2ICovXFxuLyogZGVmYXVsdCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtdGhlbWUtZGVmYXVsdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2ZkOGRjO1xcbiAgYm9yZGVyLWNvbG9yOiAjY2ZkOGRjOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtZGVmYXVsdCA+IC5qc1BhbmVsLWhkciAqIHtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtZGVmYXVsdCA+IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZHItdG9vbGJhciB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzkwYTRhZTsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRlZmF1bHQgPiAuanNQYW5lbC1jb250ZW50IHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjOTBhNGFlOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtZGVmYXVsdCA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2ZkOGRjO1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM5MGE0YWU7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1kZWZhdWx0ID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkbGlnaHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VjZWZmMTsgfVxcblxcbi8qIHByaW1hcnkgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcbi5qc1BhbmVsLXRoZW1lLXByaW1hcnkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIxOTZmMztcXG4gIGJvcmRlci1jb2xvcjogIzIxOTZmMzsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXByaW1hcnkgPiAuanNQYW5lbC1oZHIgKiB7XFxuICBjb2xvcjogI2ZmZmZmZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXByaW1hcnkgPiAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGRyLXRvb2xiYXIge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM0MmE1ZjU7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1wcmltYXJ5ID4gLmpzUGFuZWwtY29udGVudCB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzQyYTVmNTsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXByaW1hcnkgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIxOTZmMztcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNDJhNWY1O1xcbiAgY29sb3I6ICNmZmZmZmY7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1wcmltYXJ5ID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkbGlnaHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2JiZGVmYjtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLyogaW5mbyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtdGhlbWUtaW5mbyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjliNmY2O1xcbiAgYm9yZGVyLWNvbG9yOiAjMjliNmY2OyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtaW5mbyA+IC5qc1BhbmVsLWhkciAqIHtcXG4gIGNvbG9yOiAjZmZmZmZmOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtaW5mbyA+IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZHItdG9vbGJhciB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzRmYzNmNzsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWluZm8gPiAuanNQYW5lbC1jb250ZW50IHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNGZjM2Y3OyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtaW5mbyA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjliNmY2O1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM0ZmMzZjc7XFxuICBjb2xvcjogI2ZmZmZmZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWluZm8gPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWRsaWdodCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTFmNWZlO1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4vKiBzdWNjZXNzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXG4uanNQYW5lbC10aGVtZS1zdWNjZXNzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0Y2FmNTA7XFxuICBib3JkZXItY29sb3I6ICM0Y2FmNTA7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1zdWNjZXNzID4gLmpzUGFuZWwtaGRyICoge1xcbiAgY29sb3I6ICNmZmZmZmY7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1zdWNjZXNzID4gLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhkci10b29sYmFyIHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjODFjNzg0OyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtc3VjY2VzcyA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGNhZjUwO1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM4MWM3ODQ7XFxuICBjb2xvcjogI2ZmZmZmZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXN1Y2Nlc3MgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWRsaWdodCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZThmNWU5O1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4vKiB3YXJuaW5nIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXG4uanNQYW5lbC10aGVtZS13YXJuaW5nIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmMxMDc7XFxuICBib3JkZXItY29sb3I6ICNmZmMxMDc7IH1cXG5cXG4uanNQYW5lbC10aGVtZS13YXJuaW5nID4gLmpzUGFuZWwtaGRyICoge1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4uanNQYW5lbC10aGVtZS13YXJuaW5nID4gLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhkci10b29sYmFyIHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZmZkNTRmOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtd2FybmluZyA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZjMTA3O1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmZmQ1NGY7XFxuICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXdhcm5pbmcgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWRsaWdodCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmM2UwO1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4vKiBkYW5nZXIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXG4uanNQYW5lbC10aGVtZS1kYW5nZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmM2QwMDtcXG4gIGJvcmRlci1jb2xvcjogI2ZmM2QwMDsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRhbmdlciA+IC5qc1BhbmVsLWhkciAqIHtcXG4gIGNvbG9yOiAjZmZmZmZmOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtZGFuZ2VyID4gLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhkci10b29sYmFyIHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZmY2ZTQwOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtZGFuZ2VyID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjNkMDA7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgI2ZmNmU0MDtcXG4gIGNvbG9yOiAjZmZmZmZmOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtZGFuZ2VyID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkbGlnaHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmOWU4MDtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtbm9oZWFkZXIge1xcbiAgYm9yZGVyOiBub25lICFpbXBvcnRhbnQ7IH1cXG5cXG5ib2R5IHtcXG4gIC1tcy1vdmVyZmxvdy1zdHlsZTogc2Nyb2xsYmFyOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIjYnV0dHBsdWdkZXZ0b29sc2xvZ3BhbmVsIHtcXG4gICAgZGlzcGxheTpmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjpjb2x1bW47XFxuICAgIHdpZHRoOjEwMCU7XFxuICAgIGhlaWdodDoxMDAlO1xcbiAgICBhbGlnbi1pdGVtczpjZW50ZXI7XFxuICAgIGNvbG9yOiAjMDAwO1xcbn1cXG5cXG4jYnV0dHBsdWdkZXZ0b29sc2xvZ3BhbmVsIGlucHV0LHNlbGVjdCx0ZXh0YXJlYSB7XFxuICAgIGNvbG9yOiAjMDAwO1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcbn1cXG5cXG4jYnV0dHBsdWdkZXZ0b29sc2xvZ3BhbmVsICNidXR0cGx1Z2RldnRvb2xzbG9ndGV4dGFyZWEge1xcbiAgICBmb250LXNpemU6IDhwdDtcXG4gICAgd2lkdGg6MTAwJTtcXG4gICAgZmxleDoxIDE7XFxuICAgIHBhZGRpbmc6NXB4O1xcbiAgICBib3gtc2l6aW5nOmJvcmRlci1ib3g7XFxufVxcbiNidXR0cGx1Z2RldnRvb2xzbG9ncGFuZWwgI2J1dHRwbHVnZGV2dG9vbHNsb2dsZXZlbCB7XFxuICAgIHdpZHRoOjk4JTtcXG4gICAgZmxleDpub25lO1xcbiAgICBwYWRkaW5nOjVweDtcXG4gICAgYm94LXNpemluZzpib3JkZXItYm94O1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIm1haW4ge1xcbiAgICB3aWR0aDoxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbnNlY3Rpb24ge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBwYWRkaW5nOiAyMHB4O1xcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2RkZDtcXG59XFxuXFxuaW5wdXQge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG5sYWJlbCB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgbWFyZ2luOiAwIDAgLTFweDtcXG4gICAgcGFkZGluZzogNXB4IDEwcHg7XFxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgY29sb3I6ICNiYmI7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbn1cXG5cXG5sYWJlbDpiZWZvcmUge1xcbiAgICBmb250LWZhbWlseTogZm9udGF3ZXNvbWU7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcXG59XFxuXFxubGFiZWw6aG92ZXIge1xcbiAgICBjb2xvcjogIzg4ODtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG5pbnB1dDpjaGVja2VkICsgbGFiZWwge1xcbiAgICBjb2xvcjogIzU1NTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcXG4gICAgYm9yZGVyLXRvcDogMnB4IHNvbGlkIG9yYW5nZTtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmZmY7XFxufVxcblxcbiN0YWIxOmNoZWNrZWQgfiAjY29udGVudDEsXFxuI3RhYjI6Y2hlY2tlZCB+ICNjb250ZW50MixcXG4jdGFiMzpjaGVja2VkIH4gI2NvbnRlbnQzLFxcbiN0YWI0OmNoZWNrZWQgfiAjY29udGVudDQge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuI2NvbnRlbnQxIHtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4jY29udGVudDIge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbiNzaW11bGF0b3Ige1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSA2MHB4KTtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG59XFxuXFxuLmZsZXNobGlnaHQtc2ltIHtcXG4gICAgZmxleDogMTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbmRpdi5jLWZsZXNobGlnaHQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4OiAxO1xcbn1cXG5cXG5kaXYuYy1mbGVzaGxpZ2h0IGltZyB7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgd2lkdGg6IGF1dG87XFxuXFx0ICBpbWFnZS1yZW5kZXJpbmc6IC1tb3otY3Jpc3AtZWRnZXM7XFxuXFx0ICBpbWFnZS1yZW5kZXJpbmc6IC1vLWNyaXNwLWVkZ2VzO1xcblxcdCAgaW1hZ2UtcmVuZGVyaW5nOiAtd2Via2l0LW9wdGltaXplLWNvbnRyYXN0O1xcblxcdCAgaW1hZ2UtcmVuZGVyaW5nOiBwaXhlbGF0ZWQ7XFxufVxcblxcbmRpdi5jLWZsZXNobGlnaHQgLm8tZmxlc2hsaWdodCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgaGVpZ2h0OiA3NyU7XFxufVxcblxcbi52aWJyYXRvci1zaW11bGF0b3ItY29tcG9uZW50IHtcXG4gICAgZmxleDogMTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbmRpdi52aWJyYXRvciB7XFxuICAgIGZsZXg6IDEgMTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuZGl2LnZpYnJhdG9yLXNpbXVsYXRvci1jb21wb25lbnQgaW1nIHtcXG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSA0MHB4KTtcXG4gICAgd2lkdGg6IGF1dG87XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgaW1hZ2UtcmVuZGVyaW5nOiAtbW96LWNyaXNwLWVkZ2VzO1xcblxcdCAgaW1hZ2UtcmVuZGVyaW5nOiAtby1jcmlzcC1lZGdlcztcXG5cXHQgIGltYWdlLXJlbmRlcmluZzogLXdlYmtpdC1vcHRpbWl6ZS1jb250cmFzdDtcXG5cXHQgIGltYWdlLXJlbmRlcmluZzogcGl4ZWxhdGVkO1xcbn1cXG5cXG5kaXYudmlicmF0b3ItaW5mbyB7XFxuICAgIGZsZXg6IDA7XFxufVxcblxcbi5zaW11bGF0b3ItZGl2aWRlciB7XFxuICAgIGJvcmRlci1sZWZ0OiAxcHggIzAwMCBkYXNoZWQ7XFxuICAgIGhlaWdodDogMTAwJTtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4gKCcgKyBlciArICcpJyk7XG4gICAgICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmICh0aGlzLl9ldmVudHMpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoZXZsaXN0ZW5lcilcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuIiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9qc3BhbmVsLmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vanNwYW5lbC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vanNwYW5lbC5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcInVzZSBzdHJpY3RcIjt2YXIgX3R5cGVvZjI9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKGUpe3JldHVybiB0eXBlb2YgZX06ZnVuY3Rpb24oZSl7cmV0dXJuIGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmZS5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmZSE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgZX0sX3R5cGVvZj1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PT1fdHlwZW9mMihTeW1ib2wuaXRlcmF0b3IpP2Z1bmN0aW9uKGUpe3JldHVyblwidW5kZWZpbmVkXCI9PXR5cGVvZiBlP1widW5kZWZpbmVkXCI6X3R5cGVvZjIoZSl9OmZ1bmN0aW9uKGUpe3JldHVybiBlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJmUuY29uc3RydWN0b3I9PT1TeW1ib2wmJmUhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6XCJ1bmRlZmluZWRcIj09dHlwZW9mIGU/XCJ1bmRlZmluZWRcIjpfdHlwZW9mMihlKX07ZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGUpe2lmKEFycmF5LmlzQXJyYXkoZSkpe2Zvcih2YXIgdD0wLG49QXJyYXkoZS5sZW5ndGgpO3Q8ZS5sZW5ndGg7dCsrKW5bdF09ZVt0XTtyZXR1cm4gbn1yZXR1cm4gQXJyYXkuZnJvbShlKX1leHBvcnQgdmFyIGpzUGFuZWw9e3ZlcnNpb246XCI0LjAuMC1iZXRhLjUuMVwiLGRhdGU6XCIyMDE4LTA0LTE5IDIzOjIxXCIsYWpheEFsd2F5c0NhbGxiYWNrczpbXSxhdXRvcG9zaXRpb25TcGFjaW5nOjQsY2xvc2VPbkVzY2FwZTpmdW5jdGlvbigpe2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsZnVuY3Rpb24odCl7KFwiRXNjYXBlXCI9PT10LmtleXx8XCJFc2NcIj09PXQuY29kZXx8Mjc9PT10LmtleUNvZGUpJiZqc1BhbmVsLmdldFBhbmVscyhmdW5jdGlvbigpe3JldHVybiB0aGlzLmNsYXNzTGlzdC5jb250YWlucyhcImpzUGFuZWxcIil9KS5zb21lKGZ1bmN0aW9uKGUpe3JldHVybiEhZS5vcHRpb25zLmNsb3NlT25Fc2NhcGUmJihlLmNsb3NlKCksITApfSl9LCExKX0oKSxkZWZhdWx0czp7Ym94U2hhZG93OjMsY29udGFpbmVyOmRvY3VtZW50LmJvZHksY29udGVudFNpemU6e3dpZHRoOlwiNDAwcHhcIixoZWlnaHQ6XCIyMDBweFwifSxkcmFnaXQ6e2N1cnNvcjpcIm1vdmVcIixoYW5kbGVzOlwiLmpzUGFuZWwtaGVhZGVybG9nbywgLmpzUGFuZWwtdGl0bGViYXIsIC5qc1BhbmVsLWZ0clwiLG9wYWNpdHk6LjgsZGlzYWJsZU9uTWF4aW1pemVkOiEwfSxoZWFkZXI6ITAsaGVhZGVyVGl0bGU6XCJqc1BhbmVsXCIsaGVhZGVyQ29udHJvbHM6XCJhbGxcIixpY29uZm9udDohMSxtYXhpbWl6ZWRNYXJnaW46MCxtaW5pbWl6ZVRvOlwiZGVmYXVsdFwiLHBhbmVsdHlwZTpcInN0YW5kYXJkXCIscG9zaXRpb246XCJjZW50ZXJcIixyZXNpemVpdDp7aGFuZGxlczpcIm4sIGUsIHMsIHcsIG5lLCBzZSwgc3csIG53XCIsbWluV2lkdGg6NDAsbWluSGVpZ2h0OjQwfSx0aGVtZTpcImRlZmF1bHRcIn0sZGVmYXVsdFNuYXBDb25maWc6e3NlbnNpdGl2aXR5OjcwLHRyaWdnZXI6XCJwYW5lbFwifSxlcnJvcjpmdW5jdGlvbigpe3dpbmRvdy5qc1BhbmVsRXJyb3J8fCh3aW5kb3cuanNQYW5lbEVycm9yPWZ1bmN0aW9uKGUpe3RoaXMubmFtZT1cImpzUGFuZWxFcnJvclwiLHRoaXMubWVzc2FnZT1lfHxcIlwiLHRoaXMuc3RhY2s9bmV3IEVycm9yKCkuc3RhY2t9LGpzUGFuZWxFcnJvci5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpLGpzUGFuZWxFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3I9anNQYW5lbEVycm9yKX0oKSxleHRlbnNpb25zOnt9LGdsb2JhbENhbGxiYWNrczohMSxpY29uczp7Y2xvc2U6XCI8c3ZnIGNsYXNzPVxcXCJqc1BhbmVsLWljb25cXFwiIHZlcnNpb249XFxcIjEuMVxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiB3aWR0aD1cXFwiMjhcXFwiIGhlaWdodD1cXFwiMzJcXFwiIHZpZXdCb3g9XFxcIjAgMCAyOCAzMlxcXCI+PHBhdGggZmlsbD1cXFwiY3VycmVudENvbG9yXFxcIiBkPVxcXCJNMTcuNzUgMTZsOS44NS05Ljg1YzAuNS0wLjUgMC41LTEuMyAwLTEuNzUtMC41LTAuNS0xLjMtMC41LTEuNzUgMGwtOS44NSA5Ljg1LTkuODUtOS45Yy0wLjUtMC41LTEuMy0wLjUtMS43NSAwLTAuNSAwLjUtMC41IDEuMyAwIDEuNzVsOS44NSA5LjktOS45IDkuODVjLTAuNSAwLjUtMC41IDEuMyAwIDEuNzUgMC4yNSAwLjI1IDAuNTUgMC4zNSAwLjkgMC4zNXMwLjY1LTAuMSAwLjktMC4zNWw5Ljg1LTkuODUgOS44NSA5Ljg1YzAuMjUgMC4yNSAwLjU1IDAuMzUgMC45IDAuMzVzMC42NS0wLjEgMC45LTAuMzVjMC41LTAuNSAwLjUtMS4zIDAtMS43NWwtOS45LTkuODV6XFxcIj48L3BhdGg+PC9zdmc+XCIsbWF4aW1pemU6XCI8c3ZnIGNsYXNzPVxcXCJqc1BhbmVsLWljb25cXFwiIHZlcnNpb249XFxcIjEuMVxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiB3aWR0aD1cXFwiMjhcXFwiIGhlaWdodD1cXFwiMzJcXFwiIHZpZXdCb3g9XFxcIjAgMCAyOCAzMlxcXCI+PHBhdGggZmlsbD1cXFwiY3VycmVudENvbG9yXFxcIiBkPVxcXCJNMjcuNTUgMy45aC0yMi42Yy0wLjU1IDAtMSAwLjQ1LTEgMXYyMi4zYzAgMC41NSAwLjQ1IDEgMSAxaDIyLjU1YzAuNTUgMCAxLTAuNDUgMS0xdi0yMi4zYzAuMDUwLTAuNTUtMC40LTEtMC45NS0xek01Ljk1IDI2LjE1di0xOGgyMC41NXYxOGgtMjAuNTV6XFxcIj48L3BhdGg+PC9zdmc+XCIsbm9ybWFsaXplOlwiPHN2ZyBjbGFzcz1cXFwianNQYW5lbC1pY29uXFxcIiB2ZXJzaW9uPVxcXCIxLjFcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgd2lkdGg9XFxcIjI4XFxcIiBoZWlnaHQ9XFxcIjMyXFxcIiB2aWV3Qm94PVxcXCIwIDAgMjggMzJcXFwiPjxwYXRoIGZpbGw9XFxcImN1cnJlbnRDb2xvclxcXCIgZD1cXFwiTTI3LjkgMy43NWgtMTguOGMtMC40IDAtMC43NSAwLjM1LTAuNzUgMC43NXY0LjNjMCAwLjEgMCAwLjIgMC4wNTAgMC4zaC00LjJjLTAuNTUgMC0xIDAuNDUtMSAxdjE3LjRjMCAwLjU1IDAuNDUgMSAxIDFoMTcuNjVjMC41NSAwIDEtMC40NSAxLTF2LTMuN2MwLjA1MCAwIDAuMSAwLjA1MCAwLjIgMC4wNTBoNC45YzAuNCAwIDAuNzUtMC4zNSAwLjc1LTAuNzV2LTE4LjZjLTAuMDUwLTAuNC0wLjQtMC43NS0wLjgtMC43NXpNNS4yIDI2LjV2LTEyLjk1YzAuMDUwIDAgMC4xIDAgMC4xNSAwaDE1LjRjMC4wNTAgMCAwLjEgMCAwLjE1IDB2MTIuOTVoLTE1Ljd6TTI3LjE1IDIyLjM1aC00LjE1Yy0wLjA1MCAwLTAuMTUgMC0wLjIgMC4wNTB2LTEyLjNjMC0wLjU1LTAuNDUtMS0xLTFoLTEyYzAuMDUwLTAuMSAwLjA1MC0wLjIgMC4wNTAtMC4zdi0zLjU1aDE3LjN2MTcuMXpcXFwiPjwvcGF0aD48L3N2Zz5cIixtaW5pbWl6ZTpcIjxzdmcgY2xhc3M9XFxcImpzUGFuZWwtaWNvblxcXCIgdmVyc2lvbj1cXFwiMS4xXFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiIHdpZHRoPVxcXCIyOFxcXCIgaGVpZ2h0PVxcXCIzMlxcXCIgdmlld0JveD1cXFwiMCAwIDI4IDMyXFxcIj48cGF0aCBmaWxsPVxcXCJjdXJyZW50Q29sb3JcXFwiIGQ9XFxcIk0yNy4zIDI4LjVoLTIyLjZjLTAuODUgMC0xLjUtMC42NS0xLjUtMS41czAuNjUtMS41IDEuNS0xLjVoMjIuNTVjMC44NSAwIDEuNSAwLjY1IDEuNSAxLjVzLTAuNjUgMS41LTEuNDUgMS41elxcXCI+PC9wYXRoPjwvc3ZnPlwiLHNtYWxsaWZ5cmV2OlwiPHN2ZyBjbGFzcz1cXFwianNQYW5lbC1pY29uXFxcIiB2ZXJzaW9uPVxcXCIxLjFcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgd2lkdGg9XFxcIjI4XFxcIiBoZWlnaHQ9XFxcIjMyXFxcIiB2aWV3Qm94PVxcXCIwIDAgMjggMzJcXFwiPjxwYXRoIGZpbGw9XFxcImN1cnJlbnRDb2xvclxcXCIgZD1cXFwiTTE1Ljk1IDIzLjJjMCAwIDAgMCAwIDAtMC4zNSAwLTAuNjUtMC4xNS0wLjktMC4zNWwtMTEuNy0xMS45Yy0wLjUtMC41LTAuNS0xLjMgMC0xLjc1IDAuNS0wLjUgMS4zLTAuNSAxLjc1IDBsMTAuODUgMTAuOTUgMTAuOS0xMC44YzAuNS0wLjUgMS4zLTAuNSAxLjc1IDBzMC41IDEuMyAwIDEuNzVsLTExLjc1IDExLjdjLTAuMjUgMC4yNS0wLjU1IDAuNC0wLjkgMC40elxcXCI+PC9wYXRoPjwvc3ZnPlwiLHNtYWxsaWZ5OlwiPHN2ZyBjbGFzcz1cXFwianNQYW5lbC1pY29uXFxcIiB2ZXJzaW9uPVxcXCIxLjFcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgd2lkdGg9XFxcIjI4XFxcIiBoZWlnaHQ9XFxcIjMyXFxcIiB2aWV3Qm94PVxcXCIwIDAgMjggMzJcXFwiPjxwYXRoIGZpbGw9XFxcImN1cnJlbnRDb2xvclxcXCIgZD1cXFwiTTI4LjY1IDIwLjg1bC0xMS44LTExLjY1Yy0wLjUtMC41LTEuMy0wLjUtMS43NSAwbC0xMS43NSAxMS44NWMtMC41IDAuNS0wLjUgMS4zIDAgMS43NSAwLjI1IDAuMjUgMC41NSAwLjM1IDAuOSAwLjM1IDAuMyAwIDAuNjUtMC4xIDAuOS0wLjM1bDEwLjg1LTEwLjk1IDEwLjkgMTAuOGMwLjUgMC41IDEuMyAwLjUgMS43NSAwIDAuNS0wLjUgMC41LTEuMyAwLTEuOHpcXFwiPjwvcGF0aD48L3N2Zz5cIn0saWRDb3VudGVyOjAsaXNJRTpmdW5jdGlvbigpe3JldHVybiBuYXZpZ2F0b3IuYXBwVmVyc2lvbi5tYXRjaCgvVHJpZGVudC8pfSgpLG1kYnRoZW1lczpbXCJzZWNvbmRhcnlcIixcImVsZWdhbnRcIixcInN0eWxpc2hcIixcInVuaXF1ZVwiLFwic3BlY2lhbFwiXSxwb2ludGVyZG93bjpcIm9udG91Y2hlbmRcImluIHdpbmRvdz9bXCJ0b3VjaHN0YXJ0XCIsXCJtb3VzZWRvd25cIl06W1wibW91c2Vkb3duXCJdLHBvaW50ZXJtb3ZlOlwib250b3VjaGVuZFwiaW4gd2luZG93P1tcInRvdWNobW92ZVwiLFwibW91c2Vtb3ZlXCJdOltcIm1vdXNlbW92ZVwiXSxwb2ludGVydXA6XCJvbnRvdWNoZW5kXCJpbiB3aW5kb3c/W1widG91Y2hlbmRcIixcIm1vdXNldXBcIl06W1wibW91c2V1cFwiXSxwb2x5ZmlsbHM6ZnVuY3Rpb24oKXt2YXIgZT1TdHJpbmcucHJvdG90eXBlOyhmdW5jdGlvbihlKXtlLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5hcHBlbmQ9ZS5hcHBlbmR8fGZ1bmN0aW9uKCl7dmFyIGU9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSx0PWRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtlLmZvckVhY2goZnVuY3Rpb24oZSl7dmFyIG49ZSBpbnN0YW5jZW9mIE5vZGU7dC5hcHBlbmRDaGlsZChuP2U6ZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZStcIlwiKSl9KSx0aGlzLmFwcGVuZENoaWxkKHQpfX0pfSkoW0VsZW1lbnQucHJvdG90eXBlLERvY3VtZW50LnByb3RvdHlwZSxEb2N1bWVudEZyYWdtZW50LnByb3RvdHlwZV0pLHdpbmRvdy5FbGVtZW50JiYhRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdCYmKEVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3Q9ZnVuY3Rpb24oZSl7dmFyIHQsbj0odGhpcy5kb2N1bWVudHx8dGhpcy5vd25lckRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKGUpLGE9dGhpcztkbyBmb3IodD1uLmxlbmd0aDswPD0tLXQmJm4uaXRlbSh0KSE9PWE7KTt3aGlsZSgwPnQmJihhPWEucGFyZW50RWxlbWVudCkpO3JldHVybiBhfSksd2luZG93Lk5vZGVMaXN0JiYhTm9kZUxpc3QucHJvdG90eXBlLmZvckVhY2gmJihOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaD1mdW5jdGlvbihlLHQpe3Q9dHx8d2luZG93O2Zvcih2YXIgbj0wO248dGhpcy5sZW5ndGg7bisrKWUuY2FsbCh0LHRoaXNbbl0sbix0aGlzKX0pLE9iamVjdC5hc3NpZ258fE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QsXCJhc3NpZ25cIix7ZW51bWVyYWJsZTohMSxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITAsdmFsdWU6ZnVuY3Rpb24oZSl7aWYoZT09PXZvaWQgMHx8bnVsbD09PWUpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjb252ZXJ0IGZpcnN0IGFyZ3VtZW50IHRvIG9iamVjdFwiKTtmb3IodmFyIHQsbj1PYmplY3QoZSksYT0xO2E8YXJndW1lbnRzLmxlbmd0aDthKyspaWYodD1hcmd1bWVudHNbYV0sdm9pZCAwIT09dCYmbnVsbCE9PXQpe3Q9T2JqZWN0KHQpO2Zvcih2YXIgbz1PYmplY3Qua2V5cyhPYmplY3QodCkpLGk9MCxsPW8ubGVuZ3RoO2k8bDtpKyspe3ZhciBzPW9baV0scj1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHQscyk7dm9pZCAwIT09ciYmci5lbnVtZXJhYmxlJiYobltzXT10W3NdKX19cmV0dXJuIG59fSksZnVuY3Rpb24oKXtmdW5jdGlvbiBlKGUsdCl7dD10fHx7YnViYmxlczohMSxjYW5jZWxhYmxlOiExLGRldGFpbDp2b2lkIDB9O3ZhciBuPWRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiQ3VzdG9tRXZlbnRcIik7cmV0dXJuIG4uaW5pdEN1c3RvbUV2ZW50KGUsdC5idWJibGVzLHQuY2FuY2VsYWJsZSx0LmRldGFpbCksbn1yZXR1cm5cImZ1bmN0aW9uXCIhPXR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQmJnZvaWQoZS5wcm90b3R5cGU9d2luZG93LkV2ZW50LnByb3RvdHlwZSx3aW5kb3cuQ3VzdG9tRXZlbnQ9ZSl9KCksZS5lbmRzV2l0aHx8KGUuZW5kc1dpdGg9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdDx0aGlzLmxlbmd0aD90fD0wOnQ9dGhpcy5sZW5ndGgsdGhpcy5zdWJzdHIodC1lLmxlbmd0aCxlLmxlbmd0aCk9PT1lfSksZS5zdGFydHNXaXRofHwoZS5zdGFydHNXaXRoPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHRoaXMuc3Vic3RyKHR8fDAsZS5sZW5ndGgpPT09ZX0pfSgpLHRoZW1lczpbXCJkZWZhdWx0XCIsXCJwcmltYXJ5XCIsXCJpbmZvXCIsXCJzdWNjZXNzXCIsXCJ3YXJuaW5nXCIsXCJkYW5nZXJcIl0semlCYXNlOjEwMCxhamF4OmZ1bmN0aW9uKG9iaixhamF4Q29uZmlnKXt2YXIgb2JqSXNQYW5lbDtcIm9iamVjdFwiPT09KFwidW5kZWZpbmVkXCI9PXR5cGVvZiBvYmo/XCJ1bmRlZmluZWRcIjpfdHlwZW9mKG9iaikpJiZvYmouY2xhc3NMaXN0LmNvbnRhaW5zKFwianNQYW5lbFwiKT9vYmpJc1BhbmVsPSEwOihvYmpJc1BhbmVsPSExLFwic3RyaW5nXCI9PXR5cGVvZiBvYmomJihvYmo9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvYmopKSk7dmFyIGNvbmY9YWpheENvbmZpZyxjb25maWdEZWZhdWx0cz17bWV0aG9kOlwiR0VUXCIsYXN5bmM6ITAsdXNlcjpcIlwiLHB3ZDpcIlwiLGRvbmU6ZnVuY3Rpb24oKXtvYmpJc1BhbmVsP29iai5jb250ZW50LmlubmVySFRNTD10aGlzLnJlc3BvbnNlVGV4dDpvYmouaW5uZXJIVE1MPXRoaXMucmVzcG9uc2VUZXh0fSxhdXRvcmVzaXplOiEwLGF1dG9yZXBvc2l0aW9uOiEwfSxjb25maWc9dm9pZCAwO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBjb25mKWNvbmZpZz1PYmplY3QuYXNzaWduKHt9LGNvbmZpZ0RlZmF1bHRzLHt1cmw6ZW5jb2RlVVJJKGNvbmYpLGV2YWxzY3JpcHR0YWdzOiEwfSk7ZWxzZSBpZihcIm9iamVjdFwiPT09KFwidW5kZWZpbmVkXCI9PXR5cGVvZiBjb25mP1widW5kZWZpbmVkXCI6X3R5cGVvZihjb25mKSkmJmNvbmYudXJsKWNvbmZpZz1PYmplY3QuYXNzaWduKHt9LGNvbmZpZ0RlZmF1bHRzLGNvbmYpLGNvbmZpZy51cmw9ZW5jb2RlVVJJKGNvbmYudXJsKSwhMT09PWNvbmZpZy5hc3luYyYmKGNvbmZpZy50aW1lb3V0PTAsY29uZmlnLndpdGhDcmVkZW50aWFscyYmKGNvbmZpZy53aXRoQ3JlZGVudGlhbHM9dm9pZCAwKSxjb25maWcucmVzcG9uc2VUeXBlJiYoY29uZmlnLnJlc3BvbnNlVHlwZT12b2lkIDApKTtlbHNlIHJldHVybiBjb25zb2xlLmluZm8oXCJYTUxIdHRwUmVxdWVzdCBzZWVtcyB0byBtaXNzIHRoZSByZXF1ZXN0IHVybCFcIiksb2JqO3ZhciB4aHI9bmV3IFhNTEh0dHBSZXF1ZXN0O3JldHVybiB4aHIub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7aWYoND09PXhoci5yZWFkeVN0YXRlKXtpZigyMDAhPT14aHIuc3RhdHVzKWNvbmZpZy5mYWlsJiZjb25maWcuZmFpbC5jYWxsKHhocixvYmopO2Vsc2UgaWYoY29uZmlnLmRvbmUuY2FsbCh4aHIsb2JqKSxjb25maWcuZXZhbHNjcmlwdHRhZ3Mpe3ZhciBzY3JpcHR0YWdzPXhoci5yZXNwb25zZVRleHQubWF0Y2goLzxzY3JpcHRcXGJbXj5dKj4oW1xcc1xcU10qPyk8XFwvc2NyaXB0Pi9naSk7c2NyaXB0dGFncyYmc2NyaXB0dGFncy5mb3JFYWNoKGZ1bmN0aW9uKHRhZyl7dmFyIGpzPXRhZy5yZXBsYWNlKC88c2NyaXB0XFxiW14+XSo+L2ksXCJcIikucmVwbGFjZSgvPFxcL3NjcmlwdD4vaSxcIlwiKS50cmltKCk7ZXZhbChqcyl9KX1pZihjb25maWcuYWx3YXlzJiZjb25maWcuYWx3YXlzLmNhbGwoeGhyLG9iaiksb2JqSXNQYW5lbCl7dmFyIG9Db250ZW50U2l6ZT1vYmoub3B0aW9ucy5jb250ZW50U2l6ZTtpZihcInN0cmluZ1wiPT10eXBlb2Ygb0NvbnRlbnRTaXplJiZvQ29udGVudFNpemUubWF0Y2goL2F1dG8vaSkpe3ZhciBwYXJ0cz1vQ29udGVudFNpemUuc3BsaXQoXCIgXCIpLHNpemVzPU9iamVjdC5hc3NpZ24oe30se3dpZHRoOnBhcnRzWzBdLGhlaWdodDpwYXJ0c1sxXX0pO2NvbmZpZy5hdXRvcmVzaXplJiZvYmoucmVzaXplKHNpemVzKSwhb2JqLmNsYXNzTGlzdC5jb250YWlucyhcImpzUGFuZWwtY29udGV4dG1lbnVcIikmJmNvbmZpZy5hdXRvcmVwb3NpdGlvbiYmb2JqLnJlcG9zaXRpb24oKX1lbHNlIGlmKFwib2JqZWN0XCI9PT0oXCJ1bmRlZmluZWRcIj09dHlwZW9mIG9Db250ZW50U2l6ZT9cInVuZGVmaW5lZFwiOl90eXBlb2Yob0NvbnRlbnRTaXplKSkmJihcImF1dG9cIj09PW9Db250ZW50U2l6ZS53aWR0aHx8XCJhdXRvXCI9PT1vQ29udGVudFNpemUuaGVpZ2h0KSl7dmFyIF9zaXplcz1PYmplY3QuYXNzaWduKHt9LG9Db250ZW50U2l6ZSk7Y29uZmlnLmF1dG9yZXNpemUmJm9iai5yZXNpemUoX3NpemVzKSwhb2JqLmNsYXNzTGlzdC5jb250YWlucyhcImpzUGFuZWwtY29udGV4dG1lbnVcIikmJmNvbmZpZy5hdXRvcmVwb3NpdGlvbiYmb2JqLnJlcG9zaXRpb24oKX19anNQYW5lbC5hamF4QWx3YXlzQ2FsbGJhY2tzLmxlbmd0aCYmanNQYW5lbC5hamF4QWx3YXlzQ2FsbGJhY2tzLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5jYWxsKG9iaixvYmopfSl9fSx4aHIub3Blbihjb25maWcubWV0aG9kLGNvbmZpZy51cmwsY29uZmlnLmFzeW5jLGNvbmZpZy51c2VyLGNvbmZpZy5wd2QpLHhoci50aW1lb3V0PWNvbmZpZy50aW1lb3V0fHwwLGNvbmZpZy53aXRoQ3JlZGVudGlhbHMmJih4aHIud2l0aENyZWRlbnRpYWxzPWNvbmZpZy53aXRoQ3JlZGVudGlhbHMpLGNvbmZpZy5yZXNwb25zZVR5cGUmJih4aHIucmVzcG9uc2VUeXBlPWNvbmZpZy5yZXNwb25zZVR5cGUpLGNvbmZpZy5iZWZvcmVTZW5kJiZjb25maWcuYmVmb3JlU2VuZC5jYWxsKHhociksY29uZmlnLmRhdGE/eGhyLnNlbmQoY29uZmlnLmRhdGEpOnhoci5zZW5kKG51bGwpLG9ian0sY2FsY0NvbG9yczpmdW5jdGlvbihlKXt2YXIgdD10aGlzLmNvbG9yKGUpLG49dGhpcy5saWdodGVuKGUsLjgxKSxhPXRoaXMuZGFya2VuKGUsLjUpLG89LjU1Nj49dGhpcy5wZXJjZWl2ZWRCcmlnaHRuZXNzKGUpP1wiI2ZmZmZmZlwiOlwiIzAwMDAwMFwiLGk9LjU1Nj49dGhpcy5wZXJjZWl2ZWRCcmlnaHRuZXNzKG4pP1wiI2ZmZmZmZlwiOlwiIzAwMDAwMFwiLGw9LjU1Nj49dGhpcy5wZXJjZWl2ZWRCcmlnaHRuZXNzKGEpP1wiIzAwMDAwMFwiOlwiI2ZmZmZmZlwiO3JldHVyblt0LmhzbC5jc3MsbixhLG8saSxsXX0sY29sb3I6ZnVuY3Rpb24gZSh0KXt2YXIgbixhLG8saSxyLHMsbCxkLGMsZT10LnRvTG93ZXJDYXNlKCksaD17fSxwPS9eIz8oWzAtOWEtZl17M318WzAtOWEtZl17Nn0pJC9naSxtPS9ecmdiYT9cXCgoWzAtOV17MSwzfSksKFswLTldezEsM30pLChbMC05XXsxLDN9KSw/KDB8MXwwXFwuWzAtOV17MSwyfXxcXC5bMC05XXsxLDJ9KT9cXCkkL2dpLGY9L15oc2xhP1xcKChbMC05XXsxLDN9KSwoWzAtOV17MSwzfSUpLChbMC05XXsxLDN9JSksPygwfDF8MFxcLlswLTldezEsMn18XFwuWzAtOV17MSwyfSk/XFwpJC9naSxnPXthbGljZWJsdWU6XCJmMGY4ZmZcIixhbnRpcXVld2hpdGU6XCJmYWViZDdcIixhcXVhOlwiMGZmXCIsYXF1YW1hcmluZTpcIjdmZmZkNFwiLGF6dXJlOlwiZjBmZmZmXCIsYmVpZ2U6XCJmNWY1ZGNcIixiaXNxdWU6XCJmZmU0YzRcIixibGFjazpcIjAwMFwiLGJsYW5jaGVkYWxtb25kOlwiZmZlYmNkXCIsYmx1ZTpcIjAwZlwiLGJsdWV2aW9sZXQ6XCI4YTJiZTJcIixicm93bjpcImE1MmEyYVwiLGJ1cmx5d29vZDpcImRlYjg4N1wiLGNhZGV0Ymx1ZTpcIjVmOWVhMFwiLGNoYXJ0cmV1c2U6XCI3ZmZmMDBcIixjaG9jb2xhdGU6XCJkMjY5MWVcIixjb3JhbDpcImZmN2Y1MFwiLGNvcm5mbG93ZXJibHVlOlwiNjQ5NWVkXCIsY29ybnNpbGs6XCJmZmY4ZGNcIixjcmltc29uOlwiZGMxNDNjXCIsY3lhbjpcIjBmZlwiLGRhcmtibHVlOlwiMDAwMDhiXCIsZGFya2N5YW46XCIwMDhiOGJcIixkYXJrZ29sZGVucm9kOlwiYjg4NjBiXCIsZGFya2dyYXk6XCJhOWE5YTlcIixkYXJrZ3JleTpcImE5YTlhOVwiLGRhcmtncmVlbjpcIjAwNjQwMFwiLGRhcmtraGFraTpcImJkYjc2YlwiLGRhcmttYWdlbnRhOlwiOGIwMDhiXCIsZGFya29saXZlZ3JlZW46XCI1NTZiMmZcIixkYXJrb3JhbmdlOlwiZmY4YzAwXCIsZGFya29yY2hpZDpcIjk5MzJjY1wiLGRhcmtyZWQ6XCI4YjAwMDBcIixkYXJrc2FsbW9uOlwiZTk5NjdhXCIsZGFya3NlYWdyZWVuOlwiOGZiYzhmXCIsZGFya3NsYXRlYmx1ZTpcIjQ4M2Q4YlwiLGRhcmtzbGF0ZWdyYXk6XCIyZjRmNGZcIixkYXJrc2xhdGVncmV5OlwiMmY0ZjRmXCIsZGFya3R1cnF1b2lzZTpcIjAwY2VkMVwiLGRhcmt2aW9sZXQ6XCI5NDAwZDNcIixkZWVwcGluazpcImZmMTQ5M1wiLGRlZXBza3libHVlOlwiMDBiZmZmXCIsZGltZ3JheTpcIjY5Njk2OVwiLGRpbWdyZXk6XCI2OTY5NjlcIixkb2RnZXJibHVlOlwiMWU5MGZmXCIsZmlyZWJyaWNrOlwiYjIyMjIyXCIsZmxvcmFsd2hpdGU6XCJmZmZhZjBcIixmb3Jlc3RncmVlbjpcIjIyOGIyMlwiLGZ1Y2hzaWE6XCJmMGZcIixnYWluc2Jvcm86XCJkY2RjZGNcIixnaG9zdHdoaXRlOlwiZjhmOGZmXCIsZ29sZDpcImZmZDcwMFwiLGdvbGRlbnJvZDpcImRhYTUyMFwiLGdyYXk6XCI4MDgwODBcIixncmV5OlwiODA4MDgwXCIsZ3JlZW46XCIwMDgwMDBcIixncmVlbnllbGxvdzpcImFkZmYyZlwiLGhvbmV5ZGV3OlwiZjBmZmYwXCIsaG90cGluazpcImZmNjliNFwiLGluZGlhbnJlZDpcImNkNWM1Y1wiLGluZGlnbzpcIjRiMDA4MlwiLGl2b3J5OlwiZmZmZmYwXCIsa2hha2k6XCJmMGU2OGNcIixsYXZlbmRlcjpcImU2ZTZmYVwiLGxhdmVuZGVyYmx1c2g6XCJmZmYwZjVcIixsYXduZ3JlZW46XCI3Y2ZjMDBcIixsZW1vbmNoaWZmb246XCJmZmZhY2RcIixsaWdodGJsdWU6XCJhZGQ4ZTZcIixsaWdodGNvcmFsOlwiZjA4MDgwXCIsbGlnaHRjeWFuOlwiZTBmZmZmXCIsbGlnaHRnb2xkZW5yb2R5ZWxsb3c6XCJmYWZhZDJcIixsaWdodGdyYXk6XCJkM2QzZDNcIixsaWdodGdyZXk6XCJkM2QzZDNcIixsaWdodGdyZWVuOlwiOTBlZTkwXCIsbGlnaHRwaW5rOlwiZmZiNmMxXCIsbGlnaHRzYWxtb246XCJmZmEwN2FcIixsaWdodHNlYWdyZWVuOlwiMjBiMmFhXCIsbGlnaHRza3libHVlOlwiODdjZWZhXCIsbGlnaHRzbGF0ZWdyYXk6XCI3ODlcIixsaWdodHNsYXRlZ3JleTpcIjc4OVwiLGxpZ2h0c3RlZWxibHVlOlwiYjBjNGRlXCIsbGlnaHR5ZWxsb3c6XCJmZmZmZTBcIixsaW1lOlwiMGYwXCIsbGltZWdyZWVuOlwiMzJjZDMyXCIsbGluZW46XCJmYWYwZTZcIixtYWdlbnRhOlwiZjBmXCIsbWFyb29uOlwiODAwMDAwXCIsbWVkaXVtYXF1YW1hcmluZTpcIjY2Y2RhYVwiLG1lZGl1bWJsdWU6XCIwMDAwY2RcIixtZWRpdW1vcmNoaWQ6XCJiYTU1ZDNcIixtZWRpdW1wdXJwbGU6XCI5MzcwZDhcIixtZWRpdW1zZWFncmVlbjpcIjNjYjM3MVwiLG1lZGl1bXNsYXRlYmx1ZTpcIjdiNjhlZVwiLG1lZGl1bXNwcmluZ2dyZWVuOlwiMDBmYTlhXCIsbWVkaXVtdHVycXVvaXNlOlwiNDhkMWNjXCIsbWVkaXVtdmlvbGV0cmVkOlwiYzcxNTg1XCIsbWlkbmlnaHRibHVlOlwiMTkxOTcwXCIsbWludGNyZWFtOlwiZjVmZmZhXCIsbWlzdHlyb3NlOlwiZmZlNGUxXCIsbW9jY2FzaW46XCJmZmU0YjVcIixuYXZham93aGl0ZTpcImZmZGVhZFwiLG5hdnk6XCIwMDAwODBcIixvbGRsYWNlOlwiZmRmNWU2XCIsb2xpdmU6XCI4MDgwMDBcIixvbGl2ZWRyYWI6XCI2YjhlMjNcIixvcmFuZ2U6XCJmZmE1MDBcIixvcmFuZ2VyZWQ6XCJmZjQ1MDBcIixvcmNoaWQ6XCJkYTcwZDZcIixwYWxlZ29sZGVucm9kOlwiZWVlOGFhXCIscGFsZWdyZWVuOlwiOThmYjk4XCIscGFsZXR1cnF1b2lzZTpcImFmZWVlZVwiLHBhbGV2aW9sZXRyZWQ6XCJkODcwOTNcIixwYXBheWF3aGlwOlwiZmZlZmQ1XCIscGVhY2hwdWZmOlwiZmZkYWI5XCIscGVydTpcImNkODUzZlwiLHBpbms6XCJmZmMwY2JcIixwbHVtOlwiZGRhMGRkXCIscG93ZGVyYmx1ZTpcImIwZTBlNlwiLHB1cnBsZTpcIjgwMDA4MFwiLHJlYmVjY2FwdXJwbGU6XCI2MzlcIixyZWQ6XCJmMDBcIixyb3N5YnJvd246XCJiYzhmOGZcIixyb3lhbGJsdWU6XCI0MTY5ZTFcIixzYWRkbGVicm93bjpcIjhiNDUxM1wiLHNhbG1vbjpcImZhODA3MlwiLHNhbmR5YnJvd246XCJmNGE0NjBcIixzZWFncmVlbjpcIjJlOGI1N1wiLHNlYXNoZWxsOlwiZmZmNWVlXCIsc2llbm5hOlwiYTA1MjJkXCIsc2lsdmVyOlwiYzBjMGMwXCIsc2t5Ymx1ZTpcIjg3Y2VlYlwiLHNsYXRlYmx1ZTpcIjZhNWFjZFwiLHNsYXRlZ3JheTpcIjcwODA5MFwiLHNsYXRlZ3JleTpcIjcwODA5MFwiLHNub3c6XCJmZmZhZmFcIixzcHJpbmdncmVlbjpcIjAwZmY3ZlwiLHN0ZWVsYmx1ZTpcIjQ2ODJiNFwiLHRhbjpcImQyYjQ4Y1wiLHRlYWw6XCIwMDgwODBcIix0aGlzdGxlOlwiZDhiZmQ4XCIsdG9tYXRvOlwiZmY2MzQ3XCIsdHVycXVvaXNlOlwiNDBlMGQwXCIsdmlvbGV0OlwiZWU4MmVlXCIsd2hlYXQ6XCJmNWRlYjNcIix3aGl0ZTpcImZmZlwiLHdoaXRlc21va2U6XCJmNWY1ZjVcIix5ZWxsb3c6XCJmZjBcIix5ZWxsb3dncmVlbjpcIjlhY2QzMlwifTtyZXR1cm4gZ1tlXSYmKGU9Z1tlXSksbnVsbD09PWUubWF0Y2gocCk/ZS5tYXRjaChtKT8obD1tLmV4ZWMoZSksaC5yZ2I9e2NzczplLHI6bFsxXSxnOmxbMl0sYjpsWzNdfSxoLmhleD10aGlzLnJnYlRvSGV4KGxbMV0sbFsyXSxsWzNdKSxjPXRoaXMucmdiVG9Ic2wobFsxXSxsWzJdLGxbM10pLGguaHNsPWMpOmUubWF0Y2goZik/KGw9Zi5leGVjKGUpLGk9bFsxXS8zNjAscj1sWzJdLnN1YnN0cigwLGxbMl0ubGVuZ3RoLTEpLzEwMCxzPWxbM10uc3Vic3RyKDAsbFszXS5sZW5ndGgtMSkvMTAwLGQ9dGhpcy5oc2xUb1JnYihpLHIscyksaC5yZ2I9e2NzczpcInJnYihcIitkWzBdK1wiLFwiK2RbMV0rXCIsXCIrZFsyXStcIilcIixyOmRbMF0sZzpkWzFdLGI6ZFsyXX0saC5oZXg9dGhpcy5yZ2JUb0hleChoLnJnYi5yLGgucmdiLmcsaC5yZ2IuYiksaC5oc2w9e2NzczpcImhzbChcIitsWzFdK1wiLFwiK2xbMl0rXCIsXCIrbFszXStcIilcIixoOmxbMV0sczpsWzJdLGw6bFszXX0pOihoLmhleD1cIiNmNWY1ZjVcIixoLnJnYj17Y3NzOlwicmdiKDI0NSwyNDUsMjQ1KVwiLHI6MjQ1LGc6MjQ1LGI6MjQ1fSxoLmhzbD17Y3NzOlwiaHNsKDAsMCUsOTYuMDglKVwiLGg6MCxzOlwiMCVcIixsOlwiOTYuMDglXCJ9KTooZT1lLnJlcGxhY2UoXCIjXCIsXCJcIiksMT09ZS5sZW5ndGglMj8obj1lLnN1YnN0cigwLDEpK1wiXCIrZS5zdWJzdHIoMCwxKSxhPWUuc3Vic3RyKDEsMSkrXCJcIitlLnN1YnN0cigxLDEpLG89ZS5zdWJzdHIoMiwxKStcIlwiK2Uuc3Vic3RyKDIsMSksaC5yZ2I9e3I6cGFyc2VJbnQobiwxNiksZzpwYXJzZUludChhLDE2KSxiOnBhcnNlSW50KG8sMTYpfSxoLmhleD1cIiNcIituK2Erbyk6KGgucmdiPXtyOnBhcnNlSW50KGUuc3Vic3RyKDAsMiksMTYpLGc6cGFyc2VJbnQoZS5zdWJzdHIoMiwyKSwxNiksYjpwYXJzZUludChlLnN1YnN0cig0LDIpLDE2KX0saC5oZXg9XCIjXCIrZSksYz10aGlzLnJnYlRvSHNsKGgucmdiLnIsaC5yZ2IuZyxoLnJnYi5iKSxoLmhzbD1jLGgucmdiLmNzcz1cInJnYihcIitoLnJnYi5yK1wiLFwiK2gucmdiLmcrXCIsXCIraC5yZ2IuYitcIilcIiksaH0sY3JlYXRlUGFuZWxUZW1wbGF0ZTpmdW5jdGlvbigpe3ZhciBlPSEoMDxhcmd1bWVudHMubGVuZ3RoJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0pfHxhcmd1bWVudHNbMF0sdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3JldHVybiB0LmNsYXNzTmFtZT1cImpzUGFuZWxcIixlJiZbXCJjbG9zZVwiLFwibWF4aW1pemVcIixcIm5vcm1hbGl6ZVwiLFwibWluaW1pemVcIixcInNtYWxsaWZ5XCIsXCJzbWFsbGlmeXJldlwiXS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3Quc2V0QXR0cmlidXRlKFwiZGF0YS1idG5cIitlLFwiZW5hYmxlZFwiKX0pLHQuaW5uZXJIVE1MPVwiPGRpdiBjbGFzcz1cXFwianNQYW5lbC1oZHJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwianNQYW5lbC1oZWFkZXJiYXJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImpzUGFuZWwtaGVhZGVybG9nb1xcXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwianNQYW5lbC10aXRsZWJhclxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJqc1BhbmVsLXRpdGxlXFxcIj48L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwianNQYW5lbC1jb250cm9sYmFyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwianNQYW5lbC1idG4ganNQYW5lbC1idG4tc21hbGxpZnlcXFwiPlwiK3RoaXMuaWNvbnMuc21hbGxpZnkrXCI8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwianNQYW5lbC1idG4ganNQYW5lbC1idG4tc21hbGxpZnlyZXZcXFwiPlwiK3RoaXMuaWNvbnMuc21hbGxpZnlyZXYrXCI8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwianNQYW5lbC1idG4ganNQYW5lbC1idG4tbWluaW1pemVcXFwiPlwiK3RoaXMuaWNvbnMubWluaW1pemUrXCI8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwianNQYW5lbC1idG4ganNQYW5lbC1idG4tbm9ybWFsaXplXFxcIj5cIit0aGlzLmljb25zLm5vcm1hbGl6ZStcIjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJqc1BhbmVsLWJ0biBqc1BhbmVsLWJ0bi1tYXhpbWl6ZVxcXCI+XCIrdGhpcy5pY29ucy5tYXhpbWl6ZStcIjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJqc1BhbmVsLWJ0biBqc1BhbmVsLWJ0bi1jbG9zZVxcXCI+XCIrdGhpcy5pY29ucy5jbG9zZStcIjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJqc1BhbmVsLWhkci10b29sYmFyXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImpzUGFuZWwtY29udGVudCBqc1BhbmVsLWNvbnRlbnQtbm9mb290ZXJcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJqc1BhbmVsLW1pbmltaXplZC1ib3hcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJqc1BhbmVsLWZ0clxcXCI+PC9kaXY+XCIsdH0sY3JlYXRlTWluaW1pemVkVGVtcGxhdGU6ZnVuY3Rpb24oKXt2YXIgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3JldHVybiBlLmNsYXNzTmFtZT1cImpzUGFuZWwtcmVwbGFjZW1lbnRcIixlLmlubmVySFRNTD1cIjxkaXYgY2xhc3M9XFxcImpzUGFuZWwtaGRyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImpzUGFuZWwtaGVhZGVyYmFyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJqc1BhbmVsLWhlYWRlcmxvZ29cXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImpzUGFuZWwtdGl0bGViYXJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwianNQYW5lbC10aXRsZVxcXCI+PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImpzUGFuZWwtY29udHJvbGJhclxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLW5vcm1hbGl6ZVxcXCI+XCIrdGhpcy5pY29ucy5ub3JtYWxpemUrXCI8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwianNQYW5lbC1idG4ganNQYW5lbC1idG4tbWF4aW1pemVcXFwiPlwiK3RoaXMuaWNvbnMubWF4aW1pemUrXCI8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwianNQYW5lbC1idG4ganNQYW5lbC1idG4tY2xvc2VcXFwiPlwiK3RoaXMuaWNvbnMuY2xvc2UrXCI8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cIixlfSxjcmVhdGVTbmFwQXJlYTpmdW5jdGlvbihlLHQsbil7dmFyIGE9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxvPWUucGFyZW50RWxlbWVudDthLmNsYXNzTmFtZT1cImpzUGFuZWwtc25hcC1hcmVhIGpzUGFuZWwtc25hcC1hcmVhLVwiK3QsXCJsdFwiPT09dHx8XCJydFwiPT09dHx8XCJyYlwiPT09dHx8XCJsYlwiPT09dD8oYS5zdHlsZS53aWR0aD1uK1wicHhcIixhLnN0eWxlLmhlaWdodD1uK1wicHhcIik6XCJjdFwiPT09dHx8XCJjYlwiPT09dD9hLnN0eWxlLmhlaWdodD1uK1wicHhcIjooXCJsY1wiPT09dHx8XCJyY1wiPT09dCkmJihhLnN0eWxlLndpZHRoPW4rXCJweFwiKSxvIT09ZG9jdW1lbnQuYm9keSYmKGEuc3R5bGUucG9zaXRpb249XCJhYnNvbHV0ZVwiKSxkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtc25hcC1hcmVhLmpzUGFuZWwtc25hcC1hcmVhLVwiK3QpfHxlLnBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoYSl9LGRhcmtlbjpmdW5jdGlvbihlLHQpe3ZhciBuPXRoaXMuY29sb3IoZSkuaHNsLGE9cGFyc2VGbG9hdChuLmwpO3JldHVyblwiaHNsKFwiK24uaCtcIixcIituLnMrXCIsXCIrKGEtYSp0K1wiJVwiKStcIilcIn0sZHJhZ2l0OmZ1bmN0aW9uKHQpe3ZhciBlPTE8YXJndW1lbnRzLmxlbmd0aCYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTp7fSxuPXZvaWQgMCxhPU9iamVjdC5hc3NpZ24oe30sdGhpcy5kZWZhdWx0cy5kcmFnaXQsZSksbz12b2lkIDAsaT12b2lkIDAsbD1bXSxzPW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxkcmFnc3RhcnRcIix7ZGV0YWlsOnQuaWR9KSxyPW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxkcmFnXCIse2RldGFpbDp0LmlkfSksZD1uZXcgQ3VzdG9tRXZlbnQoXCJqc3BhbmVsZHJhZ3N0b3BcIix7ZGV0YWlsOnQuaWR9KTtyZXR1cm4gYS5ncmlkJiZBcnJheS5pc0FycmF5KGEuZ3JpZCkmJjE9PT1hLmdyaWQubGVuZ3RoJiYoYS5ncmlkWzFdPWEuZ3JpZFswXSksaT10aGlzLnBPY29udGFpbm1lbnQoYS5jb250YWlubWVudCksdC5xdWVyeVNlbGVjdG9yQWxsKGEuaGFuZGxlcykuZm9yRWFjaChmdW5jdGlvbihlKXtlLnN0eWxlLnRvdWNoQWN0aW9uPVwibm9uZVwiLGUuc3R5bGUuY3Vyc29yPWEuY3Vyc29yLGpzUGFuZWwucG9pbnRlcmRvd24uZm9yRWFjaChmdW5jdGlvbihkKXtlLmFkZEV2ZW50TGlzdGVuZXIoZCxmdW5jdGlvbihkKXtpZihkLnByZXZlbnREZWZhdWx0KCksIWQudGFyZ2V0LmNsb3Nlc3QoXCIuanNQYW5lbC1mdHItYnRuXCIpKXt0LmNvbnRyb2xiYXIuc3R5bGUucG9pbnRlckV2ZW50cz1cIm5vbmVcIixsPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpZnJhbWVcIiksbC5sZW5ndGgmJmwuZm9yRWFjaChmdW5jdGlvbihlKXtlLnN0eWxlLnBvaW50ZXJFdmVudHM9XCJub25lXCJ9KTt2YXIgZT13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0KSxjPXBhcnNlRmxvYXQoZS5sZWZ0KSxoPXBhcnNlRmxvYXQoZS50b3ApLHA9ZC50b3VjaGVzP2QudG91Y2hlc1swXS5jbGllbnRYOmQuY2xpZW50WCxtPWQudG91Y2hlcz9kLnRvdWNoZXNbMF0uY2xpZW50WTpkLmNsaWVudFksZj10LnBhcmVudEVsZW1lbnQsZz1mLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLHU9d2luZG93LmdldENvbXB1dGVkU3R5bGUoZiksYj0wO289ZnVuY3Rpb24obyl7dmFyIGU9TWF0aC5hYnMsbD1NYXRoLnNxcnQsZD1NYXRoLnBvdztpZihvLnByZXZlbnREZWZhdWx0KCksIW4pe2lmKGRvY3VtZW50LmRpc3BhdGNoRXZlbnQocyksdC5zdHlsZS5vcGFjaXR5PWEub3BhY2l0eSx0LnNuYXBwZWQmJmEuc25hcC5yZXNpemVUb1ByZVNuYXAmJnQuY3VycmVudERhdGEuYmVmb3JlU25hcCl7dC5yZXNpemUodC5jdXJyZW50RGF0YS5iZWZvcmVTbmFwLndpZHRoK1wiIFwiK3QuY3VycmVudERhdGEuYmVmb3JlU25hcC5oZWlnaHQpO3ZhciB5PXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksdj1wLSh5LmxlZnQreS53aWR0aCksej15LndpZHRoLzI7dj4teiYmKGI9dit6KX1hLnN0YXJ0JiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3ModCxhLnN0YXJ0LCExLHtsZWZ0OmMsdG9wOmh9KSxqc1BhbmVsLmZyb250KHQpLHQuc25hcHBlZD0hMX1pZihuPTEsYS5kaXNhYmxlT25NYXhpbWl6ZWQmJlwibWF4aW1pemVkXCI9PT10LnN0YXR1cylyZXR1cm4hMTt2YXIgdyx4LEMsRSxqLFAsUyxULEwsayxxPW8udG91Y2hlcz9vLnRvdWNoZXNbMF0uY2xpZW50WDpvLmNsaWVudFgsQT1vLnRvdWNoZXM/by50b3VjaGVzWzBdLmNsaWVudFk6by5jbGllbnRZLFc9d2luZG93LmdldENvbXB1dGVkU3R5bGUodCk7aWYoZj09PWRvY3VtZW50LmJvZHkpe3ZhciBSPXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7TD13aW5kb3cuaW5uZXJXaWR0aC1wYXJzZUludCh1LmJvcmRlckxlZnRXaWR0aCwxMCktcGFyc2VJbnQodS5ib3JkZXJSaWdodFdpZHRoLDEwKS0oUi5sZWZ0K1Iud2lkdGgpLGs9d2luZG93LmlubmVySGVpZ2h0LXBhcnNlSW50KHUuYm9yZGVyVG9wV2lkdGgsMTApLXBhcnNlSW50KHUuYm9yZGVyQm90dG9tV2lkdGgsMTApLShSLnRvcCtSLmhlaWdodCl9ZWxzZSBMPXBhcnNlSW50KHUud2lkdGgsMTApLXBhcnNlSW50KHUuYm9yZGVyTGVmdFdpZHRoLDEwKS1wYXJzZUludCh1LmJvcmRlclJpZ2h0V2lkdGgsMTApLShwYXJzZUludChXLmxlZnQsMTApK3BhcnNlSW50KFcud2lkdGgsMTApKSxrPXBhcnNlSW50KHUuaGVpZ2h0LDEwKS1wYXJzZUludCh1LmJvcmRlclRvcFdpZHRoLDEwKS1wYXJzZUludCh1LmJvcmRlckJvdHRvbVdpZHRoLDEwKS0ocGFyc2VJbnQoVy50b3AsMTApK3BhcnNlSW50KFcuaGVpZ2h0LDEwKSk7dz1wYXJzZUZsb2F0KFcubGVmdCksQz1wYXJzZUZsb2F0KFcudG9wKSxqPUwsUz1rLGEuc25hcCYmKFwicGFuZWxcIj09PWEuc25hcC50cmlnZ2VyP3g9ZCh3LDIpOlwicG9pbnRlclwiPT09YS5zbmFwLnRyaWdnZXImJih3PXEseD1kKHEsMiksQz1BLGo9d2luZG93LmlubmVyV2lkdGgtcSxTPXdpbmRvdy5pbm5lckhlaWdodC1BKSxFPWQoQywyKSxQPWQoaiwyKSxUPWQoUywyKSk7dmFyIEI9bCh4K0UpLEg9bCh4K1QpLE09bChQK0UpLE89bChQK1QpLEQ9ZSh3LWopLzIsST1lKEMtUykvMixOPWwoeCtkKEksMikpLFg9bChFK2QoRCwyKSksWT1sKFArZChJLDIpKSxGPWwoVCtkKEQsMikpO2lmKHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHIpLGEuYXhpcyYmXCJ4XCIhPT1hLmF4aXN8fCh0LnN0eWxlLmxlZnQ9YysocS1wKStiK1wicHhcIiksYS5heGlzJiZcInlcIiE9PWEuYXhpc3x8KHQuc3R5bGUudG9wPWgrKEEtbSkrXCJweFwiKSxhLmdyaWQpe3ZhciBfPXBhcnNlRmxvYXQoVy5sZWZ0KSxWPXBhcnNlRmxvYXQoVy50b3ApLFo9XyVhLmdyaWRbMF0sSz1WJWEuZ3JpZFsxXTt0LnN0eWxlLmxlZnQ9WjxhLmdyaWRbMF0vMj9fLVorXCJweFwiOl8rKGEuZ3JpZFswXS1aKStcInB4XCIsdC5zdHlsZS50b3A9SzxhLmdyaWRbMV0vMj9WLUsrXCJweFwiOlYrKGEuZ3JpZFsxXS1LKStcInB4XCJ9aWYoYS5jb250YWlubWVudHx8MD09PWEuY29udGFpbm1lbnQpe3ZhciBVLEc7aWYodC5vcHRpb25zLmNvbnRhaW5lcj09PWRvY3VtZW50LmJvZHkpVT13aW5kb3cuaW5uZXJXaWR0aC1wYXJzZUZsb2F0KFcud2lkdGgpLWlbMV0sRz13aW5kb3cuaW5uZXJIZWlnaHQtcGFyc2VGbG9hdChXLmhlaWdodCktaVsyXTtlbHNle3ZhciBKPXBhcnNlRmxvYXQodS5ib3JkZXJMZWZ0V2lkdGgpK3BhcnNlRmxvYXQodS5ib3JkZXJSaWdodFdpZHRoKSxRPXBhcnNlRmxvYXQodS5ib3JkZXJUb3BXaWR0aCkrcGFyc2VGbG9hdCh1LmJvcmRlckJvdHRvbVdpZHRoKTtVPWcud2lkdGgtcGFyc2VGbG9hdChXLndpZHRoKS1pWzFdLUosRz1nLmhlaWdodC1wYXJzZUZsb2F0KFcuaGVpZ2h0KS1pWzJdLVF9cGFyc2VGbG9hdCh0LnN0eWxlLmxlZnQpPD1pWzNdJiYodC5zdHlsZS5sZWZ0PWlbM10rXCJweFwiKSxwYXJzZUZsb2F0KHQuc3R5bGUudG9wKTw9aVswXSYmKHQuc3R5bGUudG9wPWlbMF0rXCJweFwiKSxwYXJzZUZsb2F0KHQuc3R5bGUubGVmdCk+PVUmJih0LnN0eWxlLmxlZnQ9VStcInB4XCIpLHBhcnNlRmxvYXQodC5zdHlsZS50b3ApPj1HJiYodC5zdHlsZS50b3A9RytcInB4XCIpfWlmKGEuZHJhZyYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHQsYS5kcmFnLCExLHtsZWZ0OncsdG9wOkMscmlnaHQ6aixib3R0b206U30pLGEuc25hcCl7dmFyIGVlPWEuc25hcC5zZW5zaXRpdml0eSx0ZT1mPT09ZG9jdW1lbnQuYm9keT93aW5kb3cuaW5uZXJXaWR0aC84Omcud2lkdGgvOCxuZT1mPT09ZG9jdW1lbnQuYm9keT93aW5kb3cuaW5uZXJIZWlnaHQvODpnLmhlaWdodC84O3Quc25hcHBhYmxlVG89ITEsanNQYW5lbC5yZW1vdmVTbmFwQXJlYXModCksQjxlZT8odC5zbmFwcGFibGVUbz1cImxlZnQtdG9wXCIsITEhPT1hLnNuYXAuc25hcExlZnRUb3AmJmpzUGFuZWwuY3JlYXRlU25hcEFyZWEodCxcImx0XCIsZWUpKTpIPGVlPyh0LnNuYXBwYWJsZVRvPVwibGVmdC1ib3R0b21cIiwhMSE9PWEuc25hcC5zbmFwTGVmdEJvdHRvbSYmanNQYW5lbC5jcmVhdGVTbmFwQXJlYSh0LFwibGJcIixlZSkpOk08ZWU/KHQuc25hcHBhYmxlVG89XCJyaWdodC10b3BcIiwhMSE9PWEuc25hcC5zbmFwUmlnaHRUb3AmJmpzUGFuZWwuY3JlYXRlU25hcEFyZWEodCxcInJ0XCIsZWUpKTpPPGVlPyh0LnNuYXBwYWJsZVRvPVwicmlnaHQtYm90dG9tXCIsITEhPT1hLnNuYXAuc25hcFJpZ2h0Qm90dG9tJiZqc1BhbmVsLmNyZWF0ZVNuYXBBcmVhKHQsXCJyYlwiLGVlKSk6QzxlZSYmWDx0ZT8odC5zbmFwcGFibGVUbz1cImNlbnRlci10b3BcIiwhMSE9PWEuc25hcC5zbmFwQ2VudGVyVG9wJiZqc1BhbmVsLmNyZWF0ZVNuYXBBcmVhKHQsXCJjdFwiLGVlKSk6dzxlZSYmTjxuZT8odC5zbmFwcGFibGVUbz1cImxlZnQtY2VudGVyXCIsITEhPT1hLnNuYXAuc25hcExlZnRDZW50ZXImJmpzUGFuZWwuY3JlYXRlU25hcEFyZWEodCxcImxjXCIsZWUpKTpqPGVlJiZZPG5lPyh0LnNuYXBwYWJsZVRvPVwicmlnaHQtY2VudGVyXCIsITEhPT1hLnNuYXAuc25hcFJpZ2h0Q2VudGVyJiZqc1BhbmVsLmNyZWF0ZVNuYXBBcmVhKHQsXCJyY1wiLGVlKSk6UzxlZSYmRjx0ZSYmKHQuc25hcHBhYmxlVG89XCJjZW50ZXItYm90dG9tXCIsITEhPT1hLnNuYXAuc25hcENlbnRlckJvdHRvbSYmanNQYW5lbC5jcmVhdGVTbmFwQXJlYSh0LFwiY2JcIixlZSkpfX0sanNQYW5lbC5wb2ludGVybW92ZS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZSxvKX0pfX0pfSksanNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbihlKXtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGUsZnVuY3Rpb24oKXtqc1BhbmVsLnBvaW50ZXJtb3ZlLmZvckVhY2goZnVuY3Rpb24oZSl7ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLG8pfSksZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdz1cImluaGVyaXRcIixqc1BhbmVsLnJlbW92ZVNuYXBBcmVhcyh0KSxuJiYoZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChkKSx0LnN0eWxlLm9wYWNpdHk9MSxuPXZvaWQgMCx0LnNhdmVDdXJyZW50UG9zaXRpb24oKSxhLnNuYXAmJihcImxlZnQtdG9wXCI9PT10LnNuYXBwYWJsZVRvP2pzUGFuZWwuc25hcFBhbmVsKHQsYS5zbmFwLnNuYXBMZWZ0VG9wKTpcImNlbnRlci10b3BcIj09PXQuc25hcHBhYmxlVG8/anNQYW5lbC5zbmFwUGFuZWwodCxhLnNuYXAuc25hcENlbnRlclRvcCk6XCJyaWdodC10b3BcIj09PXQuc25hcHBhYmxlVG8/anNQYW5lbC5zbmFwUGFuZWwodCxhLnNuYXAuc25hcFJpZ2h0VG9wKTpcInJpZ2h0LWNlbnRlclwiPT09dC5zbmFwcGFibGVUbz9qc1BhbmVsLnNuYXBQYW5lbCh0LGEuc25hcC5zbmFwUmlnaHRDZW50ZXIpOlwicmlnaHQtYm90dG9tXCI9PT10LnNuYXBwYWJsZVRvP2pzUGFuZWwuc25hcFBhbmVsKHQsYS5zbmFwLnNuYXBSaWdodEJvdHRvbSk6XCJjZW50ZXItYm90dG9tXCI9PT10LnNuYXBwYWJsZVRvP2pzUGFuZWwuc25hcFBhbmVsKHQsYS5zbmFwLnNuYXBDZW50ZXJCb3R0b20pOlwibGVmdC1ib3R0b21cIj09PXQuc25hcHBhYmxlVG8/anNQYW5lbC5zbmFwUGFuZWwodCxhLnNuYXAuc25hcExlZnRCb3R0b20pOlwibGVmdC1jZW50ZXJcIj09PXQuc25hcHBhYmxlVG8mJmpzUGFuZWwuc25hcFBhbmVsKHQsYS5zbmFwLnNuYXBMZWZ0Q2VudGVyKSxhLnNuYXAuY2FsbGJhY2smJnQuc25hcHBhYmxlVG8mJlwiZnVuY3Rpb25cIj09dHlwZW9mIGEuc25hcC5jYWxsYmFjayYmYS5zbmFwLmNhbGxiYWNrLmNhbGwodCx0KSx0LnNuYXBwYWJsZVRvJiZhLnNuYXAucmVwb3NpdGlvbk9uU25hcCYmdC5yZXBvc2l0aW9uT25TbmFwKHQuc25hcHBhYmxlVG8pKSxhLnN0b3AmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyh0LGEuc3RvcCwhMSx7bGVmdDpwYXJzZUZsb2F0KHQuc3R5bGUubGVmdCksdG9wOnBhcnNlRmxvYXQodC5zdHlsZS50b3ApfSkpLHQuY29udHJvbGJhci5zdHlsZS5wb2ludGVyRXZlbnRzPVwiaW5oZXJpdFwiLGwubGVuZ3RoJiZsLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5zdHlsZS5wb2ludGVyRXZlbnRzPVwiaW5oZXJpdFwifSl9KX0pLGEuZGlzYWJsZSYmKGUuc3R5bGUucG9pbnRlckV2ZW50cz1cIm5vbmVcIil9KSx0fSxlbXB0eU5vZGU6ZnVuY3Rpb24oZSl7Zm9yKDtlLmZpcnN0Q2hpbGQ7KWUucmVtb3ZlQ2hpbGQoZS5maXJzdENoaWxkKTtyZXR1cm4gZX0sZXh0ZW5kOmZ1bmN0aW9uKGUpe2lmKFwiW29iamVjdCBPYmplY3RdXCI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSkpZm9yKHZhciB0IGluIGUpZS5oYXNPd25Qcm9wZXJ0eSh0KSYmKHRoaXMuZXh0ZW5zaW9uc1t0XT1lW3RdKX0sZmV0Y2g6ZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdCgpe3JldHVybiBlLmFwcGx5KHRoaXMsYXJndW1lbnRzKX1yZXR1cm4gdC50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiBlLnRvU3RyaW5nKCl9LHR9KGZ1bmN0aW9uKG9iail7dmFyIGNvbmY9b2JqLm9wdGlvbnMuY29udGVudEZldGNoLGNvbmZEZWZhdWx0cz17Ym9keU1ldGhvZDpcInRleHRcIixldmFsc2NyaXB0dGFnczohMCxhdXRvcmVzaXplOiEwLGF1dG9yZXBvc2l0aW9uOiEwLGRvbmU6ZnVuY3Rpb24oZSx0KXtlLmNvbnRlbnQuaW5uZXJIVE1MPXR9fTtjb25mPVwic3RyaW5nXCI9PXR5cGVvZiBjb25mP09iamVjdC5hc3NpZ24oe3Jlc291cmNlOm9iai5vcHRpb25zLmNvbnRlbnRGZXRjaH0sY29uZkRlZmF1bHRzKTpPYmplY3QuYXNzaWduKGNvbmZEZWZhdWx0cyxjb25mKTt2YXIgZmV0Y2hJbml0PWNvbmYuZmV0Y2hJbml0fHx7fTtjb25mLmJlZm9yZVNlbmQmJmNvbmYuYmVmb3JlU2VuZC5jYWxsKG9iaixvYmopLGZldGNoKGNvbmYucmVzb3VyY2UsZmV0Y2hJbml0KS50aGVuKGZ1bmN0aW9uKGUpe2lmKGUub2spcmV0dXJuIGVbY29uZi5ib2R5TWV0aG9kXSgpO3Rocm93IG5ldyBFcnJvcihcIk5ldHdvcmsgcmVzcG9uc2Ugd2FzIG5vdCBvay5cIil9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtpZihjb25mLmRvbmUuY2FsbChvYmosb2JqLHJlc3BvbnNlKSxjb25mLmV2YWxzY3JpcHR0YWdzKXt2YXIgc2NyaXB0dGFncz1yZXNwb25zZS5tYXRjaCgvPHNjcmlwdFxcYltePl0qPihbXFxzXFxTXSo/KTxcXC9zY3JpcHQ+L2dpKTtzY3JpcHR0YWdzJiZzY3JpcHR0YWdzLmZvckVhY2goZnVuY3Rpb24odGFnKXt2YXIganM9dGFnLnJlcGxhY2UoLzxzY3JpcHRcXGJbXj5dKj4vaSxcIlwiKS5yZXBsYWNlKC88XFwvc2NyaXB0Pi9pLFwiXCIpLnRyaW0oKTtldmFsKGpzKX0pfXZhciBvQ29udGVudFNpemU9b2JqLm9wdGlvbnMuY29udGVudFNpemU7aWYoY29uZi5hdXRvcmVzaXplfHxjb25mLmF1dG9yZXBvc2l0aW9uKWlmKFwic3RyaW5nXCI9PXR5cGVvZiBvQ29udGVudFNpemUmJm9Db250ZW50U2l6ZS5tYXRjaCgvYXV0by9pKSl7dmFyIHBhcnRzPW9Db250ZW50U2l6ZS5zcGxpdChcIiBcIiksc2l6ZXM9T2JqZWN0LmFzc2lnbih7fSx7d2lkdGg6cGFydHNbMF0saGVpZ2h0OnBhcnRzWzFdfSk7Y29uZi5hdXRvcmVzaXplJiZvYmoucmVzaXplKHNpemVzKSwhb2JqLmNsYXNzTGlzdC5jb250YWlucyhcImpzUGFuZWwtY29udGV4dG1lbnVcIikmJmNvbmYuYXV0b3JlcG9zaXRpb24mJm9iai5yZXBvc2l0aW9uKCl9ZWxzZSBpZihcIm9iamVjdFwiPT09KFwidW5kZWZpbmVkXCI9PXR5cGVvZiBvQ29udGVudFNpemU/XCJ1bmRlZmluZWRcIjpfdHlwZW9mKG9Db250ZW50U2l6ZSkpJiYoXCJhdXRvXCI9PT1vQ29udGVudFNpemUud2lkdGh8fFwiYXV0b1wiPT09b0NvbnRlbnRTaXplLmhlaWdodCkpe3ZhciBfc2l6ZXMyPU9iamVjdC5hc3NpZ24oe30sb0NvbnRlbnRTaXplKTtjb25mLmF1dG9yZXNpemUmJm9iai5yZXNpemUoX3NpemVzMiksIW9iai5jbGFzc0xpc3QuY29udGFpbnMoXCJqc1BhbmVsLWNvbnRleHRtZW51XCIpJiZjb25mLmF1dG9yZXBvc2l0aW9uJiZvYmoucmVwb3NpdGlvbigpfX0pLmNhdGNoKGZ1bmN0aW9uKGUpe2NvbnNvbGUuZXJyb3IoXCJUaGVyZSBoYXMgYmVlbiBhIHByb2JsZW0gd2l0aCB5b3VyIGZldGNoIG9wZXJhdGlvbjogXCIrZS5tZXNzYWdlKX0pfSksZnJvbnQ6ZnVuY3Rpb24oZSl7aWYoXCJtaW5pbWl6ZWRcIj09PWUuc3RhdHVzKVwibWF4aW1pemVkXCI9PT1lLnN0YXR1c0JlZm9yZT9lLm1heGltaXplKCk6ZS5ub3JtYWxpemUoKTtlbHNle3ZhciB0PUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanNQYW5lbC1zdGFuZGFyZFwiKSkubWFwKGZ1bmN0aW9uKGUpe3JldHVybiBlLnN0eWxlLnpJbmRleH0pO01hdGgubWF4LmFwcGx5KE1hdGgsX3RvQ29uc3VtYWJsZUFycmF5KHQpKT5lLnN0eWxlLnpJbmRleCYmKGUuc3R5bGUuekluZGV4PWpzUGFuZWwuemkubmV4dCgpKSx0aGlzLnJlc2V0WmkoKX10aGlzLmdldFBhbmVscygpLmZvckVhY2goZnVuY3Rpb24oZSx0KXt2YXIgbj1lLmNvbnRlbnQucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWlmcmFtZS1vdmVybGF5XCIpO2lmKCEoMDx0KSluJiZlLmNvbnRlbnQucmVtb3ZlQ2hpbGQobik7ZWxzZSBpZihlLmNvbnRlbnQucXVlcnlTZWxlY3RvcihcImlmcmFtZVwiKSYmIW4pe3ZhciBhPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7YS5jbGFzc05hbWU9XCJqc1BhbmVsLWlmcmFtZS1vdmVybGF5XCIsZS5jb250ZW50LmFwcGVuZENoaWxkKGEpfX0pfSxnZXRQYW5lbHM6ZnVuY3Rpb24oKXt2YXIgZT0wPGFyZ3VtZW50cy5sZW5ndGgmJmFyZ3VtZW50c1swXSE9PXZvaWQgMD9hcmd1bWVudHNbMF06ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoXCJqc1BhbmVsLXN0YW5kYXJkXCIpfTtyZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qc1BhbmVsXCIpKS5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuIGUuY2FsbCh0LHQpfSkuc29ydChmdW5jdGlvbihlLHQpe3JldHVybiB0LnN0eWxlLnpJbmRleC1lLnN0eWxlLnpJbmRleH0pfSxoc2xUb1JnYjpmdW5jdGlvbihlLHQsbil7dmFyIGE9TWF0aC5yb3VuZCxvPXZvaWQgMCxpPXZvaWQgMCxsPXZvaWQgMDtpZigwPT09dClvPWk9bD1uO2Vsc2V7dmFyIHM9ZnVuY3Rpb24oZSxuLGEpe3JldHVybiAwPmEmJihhKz0xKSwxPGEmJihhLT0xKSxhPDEvNj9lKzYqKG4tZSkqYTphPDEvMj9uOmE8Mi8zP2UrNiooKG4tZSkqKDIvMy1hKSk6ZX0scj0uNT5uP24qKDErdCk6bit0LW4qdCxkPTIqbi1yO289cyhkLHIsZSsxLzMpLGk9cyhkLHIsZSksbD1zKGQscixlLTEvMyl9cmV0dXJuW2EoMjU1Km8pLGEoMjU1KmkpLGEoMjU1KmwpXX0sbGlnaHRlbjpmdW5jdGlvbihlLHQpe3ZhciBuPXRoaXMuY29sb3IoZSkuaHNsLGE9cGFyc2VGbG9hdChuLmwpO3JldHVyblwiaHNsKFwiK24uaCtcIixcIituLnMrXCIsXCIrKGErKDEwMC1hKSp0K1wiJVwiKStcIilcIn0scGVyY2VpdmVkQnJpZ2h0bmVzczpmdW5jdGlvbihlKXt2YXIgdD10aGlzLmNvbG9yKGUpLnJnYjtyZXR1cm4gLjI2MjcqKHQuci8yNTUpKy42NzgqKHQuZy8yNTUpKy4wNTkzKih0LmIvMjU1KX0scE9jb250YWluZXI6ZnVuY3Rpb24oZSx0KXtpZihlKXt2YXIgbjtpZihcInN0cmluZ1wiPT10eXBlb2YgZT9uPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZSk6MT09PWUubm9kZVR5cGU/bj1lOmUubGVuZ3RoJiYobj1lWzBdKSxuJiYxPT09bi5ub2RlVHlwZSlyZXR1cm4gbn12YXIgYT1uZXcganNQYW5lbEVycm9yKFwiTk8gTkVXIFBBTkVMIENSRUFURUQhXFxuVGhlIGNvbnRhaW5lciB0byBhcHBlbmQgdGhlIHBhbmVsIHRvIGRvZXMgbm90IGV4aXN0IG9yIGEgY29udGFpbmVyIHdhcyBub3Qgc3BlY2lmaWVkIVwiKTt0cnl7dGhyb3cgYX1jYXRjaChuKXt0JiZ0LmNhbGwobixuKX1yZXR1cm4gYX0scE9jb250YWlubWVudDpmdW5jdGlvbihlKXtpZihcIm51bWJlclwiPT10eXBlb2YgZSlyZXR1cm5bZSxlLGUsZV07aWYoQXJyYXkuaXNBcnJheShlKSl7aWYoMT09PWUubGVuZ3RoKXJldHVybltlWzBdLGVbMF0sZVswXSxlWzBdXTtpZigyPT09ZS5sZW5ndGgpcmV0dXJuIGUuY29uY2F0KGUpOzM9PT1lLmxlbmd0aCYmKGVbM109ZVsxXSl9cmV0dXJuIGV9LHBPc2l6ZTpmdW5jdGlvbihlLHQpe3ZhciBuPXR8fHRoaXMuZGVmYXVsdHMuY29udGVudFNpemUsYT1lLnBhcmVudEVsZW1lbnQ7aWYoXCJzdHJpbmdcIj09dHlwZW9mIG4pe3ZhciBvPW4udHJpbSgpLnNwbGl0KFwiIFwiKTtuPXt9LG4ud2lkdGg9b1swXSxuLmhlaWdodD0yPT09by5sZW5ndGg/b1sxXTpvWzBdfWVsc2Ugbi53aWR0aCYmIW4uaGVpZ2h0P24uaGVpZ2h0PW4ud2lkdGg6bi5oZWlnaHQmJiFuLndpZHRoJiYobi53aWR0aD1uLmhlaWdodCk7aWYoKG4ud2lkdGgrXCJcIikubWF0Y2goL15bMC05Ll0rJC9naSkpbi53aWR0aCs9XCJweFwiO2Vsc2UgaWYoIShcInN0cmluZ1wiPT10eXBlb2Ygbi53aWR0aCYmbi53aWR0aC5lbmRzV2l0aChcIiVcIikpKVwiZnVuY3Rpb25cIj09dHlwZW9mIG4ud2lkdGgmJihuLndpZHRoPW4ud2lkdGguY2FsbChlLGUpLFwibnVtYmVyXCI9PXR5cGVvZiBuLndpZHRoP24ud2lkdGgrPVwicHhcIjpcInN0cmluZ1wiPT10eXBlb2Ygbi53aWR0aCYmbi53aWR0aC5tYXRjaCgvXlswLTkuXSskL2dpKSYmKG4ud2lkdGgrPVwicHhcIikpO2Vsc2UgaWYoYT09PWRvY3VtZW50LmJvZHkpbi53aWR0aD13aW5kb3cuaW5uZXJXaWR0aCoocGFyc2VGbG9hdChuLndpZHRoKS8xMDApK1wicHhcIjtlbHNle3ZhciBpPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGEpLGw9cGFyc2VGbG9hdChpLmJvcmRlckxlZnRXaWR0aCkrcGFyc2VGbG9hdChpLmJvcmRlclJpZ2h0V2lkdGgpO24ud2lkdGg9KHBhcnNlRmxvYXQoaS53aWR0aCktbCkqKHBhcnNlRmxvYXQobi53aWR0aCkvMTAwKStcInB4XCJ9aWYoKG4uaGVpZ2h0K1wiXCIpLm1hdGNoKC9eWzAtOS5dKyQvZ2kpKW4uaGVpZ2h0Kz1cInB4XCI7ZWxzZSBpZighKFwic3RyaW5nXCI9PXR5cGVvZiBuLmhlaWdodCYmbi5oZWlnaHQuZW5kc1dpdGgoXCIlXCIpKSlcImZ1bmN0aW9uXCI9PXR5cGVvZiBuLmhlaWdodCYmKG4uaGVpZ2h0PW4uaGVpZ2h0LmNhbGwoZSxlKSxcIm51bWJlclwiPT10eXBlb2Ygbi5oZWlnaHQ/bi5oZWlnaHQrPVwicHhcIjpcInN0cmluZ1wiPT10eXBlb2Ygbi5oZWlnaHQmJm4uaGVpZ2h0Lm1hdGNoKC9eWzAtOS5dKyQvZ2kpJiYobi5oZWlnaHQrPVwicHhcIikpO2Vsc2UgaWYoYT09PWRvY3VtZW50LmJvZHkpbi5oZWlnaHQ9d2luZG93LmlubmVySGVpZ2h0KihwYXJzZUZsb2F0KG4uaGVpZ2h0KS8xMDApK1wicHhcIjtlbHNle3ZhciBzPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGEpLHI9cGFyc2VGbG9hdChzLmJvcmRlclRvcFdpZHRoKStwYXJzZUZsb2F0KHMuYm9yZGVyQm90dG9tV2lkdGgpO24uaGVpZ2h0PShwYXJzZUZsb2F0KHMuaGVpZ2h0KS1yKSoocGFyc2VGbG9hdChuLmhlaWdodCkvMTAwKStcInB4XCJ9cmV0dXJuIG59LHBPcG9zaXRpb246ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5tYXRjaCgvXFxiW2Etel17NCw2fS17MX1bYS16XXszLDZ9XFxiL2kpLG49ZS5tYXRjaCgvZG93bnx1cHxyaWdodChbXi1dfCQpfGxlZnQoW14tXXwkKS9pKSxhPWUubWF0Y2goL1srLV0/XFxkP1xcLj9cXGQrKFthLXolXXsyLDR9XFxifCU/KS9naSksbz12b2lkIDA7cmV0dXJuIG89dD97bXk6dFswXS50b0xvd2VyQ2FzZSgpLGF0OnRbMF0udG9Mb3dlckNhc2UoKX06e215OlwiY2VudGVyXCIsYXQ6XCJjZW50ZXJcIn0sbiYmKG8uYXV0b3Bvc2l0aW9uPW5bMF0udG9Mb3dlckNhc2UoKSksYSYmKGEuZm9yRWFjaChmdW5jdGlvbihlLHQpe2UubWF0Y2goL15bKy1dP1swLTldKiQvKSYmKGFbdF0rPVwicHhcIiksYVt0XT1hW3RdLnRvTG93ZXJDYXNlKCl9KSwxPT09YS5sZW5ndGg/KG8ub2Zmc2V0WD1hWzBdLG8ub2Zmc2V0WT1hWzBdKTooby5vZmZzZXRYPWFbMF0sby5vZmZzZXRZPWFbMV0pKSxvfSxwb3NpdGlvbjpmdW5jdGlvbihlLHQpe3ZhciBuLGEsbyxpPXtsZWZ0OjAsdG9wOjB9LGw9MCxzPTAscj0wLGQ9MCxjPXtteTpcImNlbnRlclwiLGF0OlwiY2VudGVyXCIsb2Y6XCJ3aW5kb3dcIixvZmZzZXRYOlwiMHB4XCIsb2Zmc2V0WTpcIjBweFwifSxoPXt3aWR0aDpkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsaGVpZ2h0OndpbmRvdy5pbm5lckhlaWdodH0scD1wYWdlWE9mZnNldCxtPXBhZ2VZT2Zmc2V0O2lmKG49XCJzdHJpbmdcIj09dHlwZW9mIGU/ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlKTplLCF0KXJldHVybiBuLnN0eWxlLm9wYWNpdHk9MSxuO3ZhciBmPW4uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7YT1cInN0cmluZ1wiPT10eXBlb2YgdD9PYmplY3QuYXNzaWduKHt9LGMsanNQYW5lbC5wT3Bvc2l0aW9uKHQpKTpPYmplY3QuYXNzaWduKHt9LGMsdCk7dmFyIGc9bi5wYXJlbnRFbGVtZW50LHU9d2luZG93LmdldENvbXB1dGVkU3R5bGUoZyksYj1nLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLHk9Zy50YWdOYW1lLnRvTG93ZXJDYXNlKCk7aWYoYS5vZiYmXCJ3aW5kb3dcIiE9PWEub2YmJihcInN0cmluZ1wiPT10eXBlb2YgYS5vZj9vPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYS5vZik6bz1hLm9mKSxhLm15Lm1hdGNoKC9eY2VudGVyLXRvcCR8XmNlbnRlciR8XmNlbnRlci1ib3R0b20kL2kpP2w9Zi53aWR0aC8yOmEubXkubWF0Y2goL3JpZ2h0L2kpJiYobD1mLndpZHRoKSxhLm15Lm1hdGNoKC9ebGVmdC1jZW50ZXIkfF5jZW50ZXIkfF5yaWdodC1jZW50ZXIkL2kpP3M9Zi5oZWlnaHQvMjphLm15Lm1hdGNoKC9ib3R0b20vaSkmJihzPWYuaGVpZ2h0KSxcImJvZHlcIj09PXkmJlwid2luZG93XCI9PT1hLm9mKWEuYXQubWF0Y2goL15jZW50ZXItdG9wJHxeY2VudGVyJHxeY2VudGVyLWJvdHRvbSQvaSk/cj1oLndpZHRoLzI6YS5hdC5tYXRjaCgvcmlnaHQvaSkmJihyPWgud2lkdGgpLGEuYXQubWF0Y2goL15sZWZ0LWNlbnRlciR8XmNlbnRlciR8XnJpZ2h0LWNlbnRlciQvaSk/ZD1oLmhlaWdodC8yOmEuYXQubWF0Y2goL2JvdHRvbS9pKSYmKGQ9aC5oZWlnaHQpLGkubGVmdD1yLWwtcGFyc2VGbG9hdCh1LmJvcmRlckxlZnRXaWR0aCksaS50b3A9ZC1zLXBhcnNlRmxvYXQodS5ib3JkZXJUb3BXaWR0aCksbi5zdHlsZS5wb3NpdGlvbj1cImZpeGVkXCI7ZWxzZSBpZihcImJvZHlcIj09PXkmJlwid2luZG93XCIhPT1hLm9mKXt2YXIgdj1vLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO3I9YS5hdC5tYXRjaCgvXmNlbnRlci10b3AkfF5jZW50ZXIkfF5jZW50ZXItYm90dG9tJC9pKT92LndpZHRoLzIrdi5sZWZ0K3A6YS5hdC5tYXRjaCgvcmlnaHQvaSk/di53aWR0aCt2LmxlZnQrcDp2LmxlZnQrcCxkPWEuYXQubWF0Y2goL15sZWZ0LWNlbnRlciR8XmNlbnRlciR8XnJpZ2h0LWNlbnRlciQvaSk/di5oZWlnaHQvMit2LnRvcCttOmEuYXQubWF0Y2goL2JvdHRvbS9pKT92LmhlaWdodCt2LnRvcCttOnYudG9wK20saS5sZWZ0PXItbC1wYXJzZUZsb2F0KHUuYm9yZGVyTGVmdFdpZHRoKSxpLnRvcD1kLXMtcGFyc2VGbG9hdCh1LmJvcmRlclRvcFdpZHRoKX1lbHNlIGlmKFwiYm9keVwiIT09eSYmKFwid2luZG93XCI9PT1hLm9mfHwhYS5vZikpe3ZhciB6PXBhcnNlRmxvYXQodS5ib3JkZXJMZWZ0V2lkdGgpK3BhcnNlRmxvYXQodS5ib3JkZXJSaWdodFdpZHRoKSx3PXBhcnNlRmxvYXQodS5ib3JkZXJUb3BXaWR0aCkrcGFyc2VGbG9hdCh1LmJvcmRlckJvdHRvbVdpZHRoKTthLmF0Lm1hdGNoKC9eY2VudGVyLXRvcCR8XmNlbnRlciR8XmNlbnRlci1ib3R0b20kL2kpP3I9Yi53aWR0aC8yLXovMjphLmF0Lm1hdGNoKC9yaWdodC9pKSYmKHI9Yi53aWR0aC16KSxhLmF0Lm1hdGNoKC9ebGVmdC1jZW50ZXIkfF5jZW50ZXIkfF5yaWdodC1jZW50ZXIkL2kpP2Q9Yi5oZWlnaHQvMi13LzI6YS5hdC5tYXRjaCgvYm90dG9tL2kpJiYoZD1iLmhlaWdodC13KSxpLmxlZnQ9ci1sLGkudG9wPWQtc31lbHNlIGlmKFwiYm9keVwiIT09eSYmZy5jb250YWlucyhvKSl7dmFyIHg9by5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtyPWEuYXQubWF0Y2goL15jZW50ZXItdG9wJHxeY2VudGVyJHxeY2VudGVyLWJvdHRvbSQvaSk/eC5sZWZ0LWIubGVmdCt4LndpZHRoLzI6YS5hdC5tYXRjaCgvcmlnaHQvaSk/eC5sZWZ0LWIubGVmdCt4LndpZHRoOngubGVmdC1iLmxlZnQsZD1hLmF0Lm1hdGNoKC9ebGVmdC1jZW50ZXIkfF5jZW50ZXIkfF5yaWdodC1jZW50ZXIkL2kpP3gudG9wLWIudG9wK3guaGVpZ2h0LzI6YS5hdC5tYXRjaCgvYm90dG9tL2kpP3gudG9wLWIudG9wK3guaGVpZ2h0OngudG9wLWIudG9wLGkubGVmdD1yLWwtcGFyc2VGbG9hdCh1LmJvcmRlckxlZnRXaWR0aCksaS50b3A9ZC1zLXBhcnNlRmxvYXQodS5ib3JkZXJUb3BXaWR0aCl9aWYoYS5hdXRvcG9zaXRpb24mJmEubXk9PT1hLmF0JiYwPD1bXCJsZWZ0LXRvcFwiLFwiY2VudGVyLXRvcFwiLFwicmlnaHQtdG9wXCIsXCJsZWZ0LWJvdHRvbVwiLFwiY2VudGVyLWJvdHRvbVwiLFwicmlnaHQtYm90dG9tXCJdLmluZGV4T2YoYS5teSkpe3ZhciBDPWEubXkrXCItXCIrYS5hdXRvcG9zaXRpb24udG9Mb3dlckNhc2UoKTtuLmNsYXNzTGlzdC5hZGQoQyk7dmFyIEU9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5cIitDKSksaj1FLmluZGV4T2Yobik7MTxFLmxlbmd0aCYmKFwiZG93blwiPT09YS5hdXRvcG9zaXRpb24/RS5mb3JFYWNoKGZ1bmN0aW9uKGUsdCl7MDx0JiZ0PD1qJiYoaS50b3ArPUVbLS10XS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQranNQYW5lbC5hdXRvcG9zaXRpb25TcGFjaW5nKX0pOlwidXBcIj09PWEuYXV0b3Bvc2l0aW9uP0UuZm9yRWFjaChmdW5jdGlvbihlLHQpezA8dCYmdDw9aiYmKGkudG9wLT1FWy0tdF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0K2pzUGFuZWwuYXV0b3Bvc2l0aW9uU3BhY2luZyl9KTpcInJpZ2h0XCI9PT1hLmF1dG9wb3NpdGlvbj9FLmZvckVhY2goZnVuY3Rpb24oZSx0KXswPHQmJnQ8PWomJihpLmxlZnQrPUVbLS10XS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCtqc1BhbmVsLmF1dG9wb3NpdGlvblNwYWNpbmcpfSk6XCJsZWZ0XCI9PT1hLmF1dG9wb3NpdGlvbiYmRS5mb3JFYWNoKGZ1bmN0aW9uKGUsdCl7MDx0JiZ0PD1qJiYoaS5sZWZ0LT1FWy0tdF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgranNQYW5lbC5hdXRvcG9zaXRpb25TcGFjaW5nKX0pKX1pZihpLmxlZnQrPVwicHhcIixpLnRvcCs9XCJweFwiLG4uc3R5bGUubGVmdD1pLmxlZnQsbi5zdHlsZS50b3A9aS50b3AsYS5vZmZzZXRYJiYobi5zdHlsZS5sZWZ0PVwibnVtYmVyXCI9PXR5cGVvZiBhLm9mZnNldFg/XCJjYWxjKFwiK2kubGVmdCtcIiArIFwiK2Eub2Zmc2V0WCtcInB4KVwiOlwiY2FsYyhcIitpLmxlZnQrXCIgKyBcIithLm9mZnNldFgrXCIpXCIsaS5sZWZ0PXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG4pLmxlZnQpLGEub2Zmc2V0WSYmKG4uc3R5bGUudG9wPVwibnVtYmVyXCI9PXR5cGVvZiBhLm9mZnNldFk/XCJjYWxjKFwiK2kudG9wK1wiICsgXCIrYS5vZmZzZXRZK1wicHgpXCI6XCJjYWxjKFwiK2kudG9wK1wiICsgXCIrYS5vZmZzZXRZK1wiKVwiLGkudG9wPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG4pLnRvcCksYS5taW5MZWZ0KXt2YXIgUD1wYXJzZUZsb2F0KGkubGVmdCk7XCJudW1iZXJcIj09dHlwZW9mIGEubWluTGVmdCYmKGEubWluTGVmdCs9XCJweFwiKSxuLnN0eWxlLmxlZnQ9YS5taW5MZWZ0O3ZhciBTPXBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUobikubGVmdCk7UD5TJiYobi5zdHlsZS5sZWZ0PVArXCJweFwiKSxpLmxlZnQ9d2luZG93LmdldENvbXB1dGVkU3R5bGUobikubGVmdH1pZihhLm1heExlZnQpe3ZhciBUPXBhcnNlRmxvYXQoaS5sZWZ0KTtcIm51bWJlclwiPT10eXBlb2YgYS5tYXhMZWZ0JiYoYS5tYXhMZWZ0Kz1cInB4XCIpLG4uc3R5bGUubGVmdD1hLm1heExlZnQ7dmFyIEw9cGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShuKS5sZWZ0KTtUPEwmJihuLnN0eWxlLmxlZnQ9VCtcInB4XCIpLGkubGVmdD13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShuKS5sZWZ0fWlmKGEubWF4VG9wKXt2YXIgaz1wYXJzZUZsb2F0KGkudG9wKTtcIm51bWJlclwiPT10eXBlb2YgYS5tYXhUb3AmJihhLm1heFRvcCs9XCJweFwiKSxuLnN0eWxlLnRvcD1hLm1heFRvcDt2YXIgcT1wYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG4pLnRvcCk7azxxJiYobi5zdHlsZS50b3A9aytcInB4XCIpLGkudG9wPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG4pLnRvcH1pZihhLm1pblRvcCl7dmFyIEE9cGFyc2VGbG9hdChpLnRvcCk7XCJudW1iZXJcIj09dHlwZW9mIGEubWluVG9wJiYoYS5taW5Ub3ArPVwicHhcIiksbi5zdHlsZS50b3A9YS5taW5Ub3A7dmFyIFc9cGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShuKS50b3ApO0E+VyYmKG4uc3R5bGUudG9wPUErXCJweFwiKSxpLnRvcD13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShuKS50b3B9aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgYS5tb2RpZnkpe3ZhciBSPWEubW9kaWZ5LmNhbGwoaSxpKTtuLnN0eWxlLmxlZnQ9Ui5sZWZ0LG4uc3R5bGUudG9wPVIudG9wfXJldHVybiBuLnN0eWxlLm9wYWNpdHk9MSxuLnN0eWxlLmxlZnQ9d2luZG93LmdldENvbXB1dGVkU3R5bGUobikubGVmdCxuLnN0eWxlLnRvcD13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShuKS50b3Asbn0scHJvY2Vzc0NhbGxiYWNrczpmdW5jdGlvbihlLHQpe3ZhciBuPTI8YXJndW1lbnRzLmxlbmd0aCYmdm9pZCAwIT09YXJndW1lbnRzWzJdP2FyZ3VtZW50c1syXTpcInNvbWVcIixhPWFyZ3VtZW50c1szXTtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiB0JiYodD1bdF0pLG4/dFtuXShmdW5jdGlvbih0KXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiB0KXJldHVybiB0LmNhbGwoZSxlLGEpfSk6dm9pZCB0LmZvckVhY2goZnVuY3Rpb24odCl7dC5jYWxsKGUsZSxhKX0pfSxyZ2JUb0hzbDpmdW5jdGlvbihlLHQsbil7ZS89MjU1LHQvPTI1NSxuLz0yNTU7dmFyIGEsbyxpPU1hdGgubWF4KGUsdCxuKSxzPU1hdGgubWluKGUsdCxuKSxyPShpK3MpLzI7aWYoaT09PXMpYT1vPTA7ZWxzZXt2YXIgbD1pLXM7bz0uNTxyP2wvKDItaS1zKTpsLyhpK3MpLGk9PT1lP2E9KHQtbikvbCsodDxuPzY6MCk6aT09PXQ/YT0obi1lKS9sKzI6aT09PW4/YT0oZS10KS9sKzQ6dm9pZCAwLGEvPTZ9cmV0dXJuIGEqPTM2MCxvPTEwMCpvK1wiJVwiLHI9MTAwKnIrXCIlXCIse2NzczpcImhzbChcIithK1wiLFwiK28rXCIsXCIrcitcIilcIixoOmEsczpvLGw6cn19LHJnYlRvSGV4OmZ1bmN0aW9uKGUsdCxuKXt2YXIgYT0oK2UpLnRvU3RyaW5nKDE2KSxvPSgrdCkudG9TdHJpbmcoMTYpLGk9KCtuKS50b1N0cmluZygxNik7cmV0dXJuIDE9PT1hLmxlbmd0aCYmKGE9XCIwXCIrYSksMT09PW8ubGVuZ3RoJiYobz1cIjBcIitvKSwxPT09aS5sZW5ndGgmJihpPVwiMFwiK2kpLFwiI1wiK2ErbytpfSxyZW1vdmVTbmFwQXJlYXM6ZnVuY3Rpb24oZSl7ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qc1BhbmVsLXNuYXAtYXJlYVwiKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe2UucGFyZW50RWxlbWVudCYmZS5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHQpfSl9LHJlc2V0Wmk6ZnVuY3Rpb24oKXt0aGlzLnppPWZ1bmN0aW9uKCl7dmFyIGU9MDxhcmd1bWVudHMubGVuZ3RoJiZhcmd1bWVudHNbMF0hPT12b2lkIDA/YXJndW1lbnRzWzBdOmpzUGFuZWwuemlCYXNlLHQ9ZTtyZXR1cm57bmV4dDpmdW5jdGlvbigpe3JldHVybiB0Kyt9fX0oKSxBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzUGFuZWwtc3RhbmRhcmRcIikpLnNvcnQoZnVuY3Rpb24oZSx0KXtyZXR1cm4gZS5zdHlsZS56SW5kZXgtdC5zdHlsZS56SW5kZXh9KS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2Uuc3R5bGUuekluZGV4PWpzUGFuZWwuemkubmV4dCgpfSl9LHJlc2l6ZWl0OmZ1bmN0aW9uKHQpe3ZhciBlPTE8YXJndW1lbnRzLmxlbmd0aCYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTp7fSxuPU9iamVjdC5hc3NpZ24oe30sdGhpcy5kZWZhdWx0cy5yZXNpemVpdCxlKSxhPXQucGFyZW50RWxlbWVudCxvPWEudGFnTmFtZS50b0xvd2VyQ2FzZSgpLGk9XCJmdW5jdGlvblwiPT10eXBlb2Ygbi5tYXhXaWR0aD9uLm1heFdpZHRoKCk6bi5tYXhXaWR0aHx8MWU0LGw9XCJmdW5jdGlvblwiPT10eXBlb2Ygbi5tYXhIZWlnaHQ/bi5tYXhIZWlnaHQoKTpuLm1heEhlaWdodHx8MWU0LHM9XCJmdW5jdGlvblwiPT10eXBlb2Ygbi5taW5XaWR0aD9uLm1pbldpZHRoKCk6bi5taW5XaWR0aCxyPVwiZnVuY3Rpb25cIj09dHlwZW9mIG4ubWluSGVpZ2h0P24ubWluSGVpZ2h0KCk6bi5taW5IZWlnaHQsZD1uZXcgQ3VzdG9tRXZlbnQoXCJqc3BhbmVscmVzaXplc3RhcnRcIix7ZGV0YWlsOnQuaWR9KSxjPW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxyZXNpemVcIix7ZGV0YWlsOnQuaWR9KSxwPW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxyZXNpemVzdG9wXCIse2RldGFpbDp0LmlkfSksbT12b2lkIDAsZj12b2lkIDAsZz12b2lkIDAsdT12b2lkIDAsYj12b2lkIDAsaD1bXTtyZXR1cm4gbT10aGlzLnBPY29udGFpbm1lbnQobi5jb250YWlubWVudCksbi5oYW5kbGVzLnNwbGl0KFwiLFwiKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3ZhciBuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJESVZcIik7bi5jbGFzc05hbWU9XCJqc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZSBqc1BhbmVsLXJlc2l6ZWl0LVwiK2UudHJpbSgpLG4uc3R5bGUuekluZGV4PTkwLHQuYXBwZW5kKG4pfSksdC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzUGFuZWwtcmVzaXplaXQtaGFuZGxlXCIpLmZvckVhY2goZnVuY3Rpb24oZSl7anNQYW5lbC5wb2ludGVyZG93bi5mb3JFYWNoKGZ1bmN0aW9uKHApe2UuYWRkRXZlbnRMaXN0ZW5lcihwLGZ1bmN0aW9uKHApe3AucHJldmVudERlZmF1bHQoKSxoPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpZnJhbWVcIiksaC5sZW5ndGgmJmguZm9yRWFjaChmdW5jdGlvbihlKXtlLnN0eWxlLnBvaW50ZXJFdmVudHM9XCJub25lXCJ9KTt2YXIgZT10LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLHk9YS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSx2PXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGEsbnVsbCksej1wYXJzZUludCh2LmJvcmRlckxlZnRXaWR0aCwxMCksdz1wYXJzZUludCh2LmJvcmRlclRvcFdpZHRoLDEwKSx4PXYuZ2V0UHJvcGVydHlWYWx1ZShcInBvc2l0aW9uXCIpLEM9cC5jbGllbnRYfHxwLnRvdWNoZXNbMF0uY2xpZW50WCxFPXAuY2xpZW50WXx8cC50b3VjaGVzWzBdLmNsaWVudFksaj1lLndpZHRoLFA9ZS5oZWlnaHQsUz1wLnRhcmdldC5jbGFzc0xpc3QsVD1lLmxlZnQsTD1lLnRvcCxrPTFlNCxxPTFlNCxBPTFlNCxXPTFlNDt0LmNvbnRlbnQuc3R5bGUucG9pbnRlckV2ZW50cz1cIm5vbmVcIixcImJvZHlcIiE9PW8mJihUPWUubGVmdC15LmxlZnQrYS5zY3JvbGxMZWZ0LEw9ZS50b3AteS50b3ArYS5zY3JvbGxUb3ApLFwiYm9keVwiPT09byYmbT8oaz1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgtZS5sZWZ0LEE9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodC1lLnRvcCxxPWUud2lkdGgrZS5sZWZ0LFc9ZS5oZWlnaHQrZS50b3ApOm0mJihcInN0YXRpY1wiPT09eD8oaz15LndpZHRoLWUubGVmdCt6LEE9eS5oZWlnaHQreS50b3AtZS50b3ArdyxxPWUud2lkdGgrKGUubGVmdC15LmxlZnQpLXosVz1lLmhlaWdodCsoZS50b3AteS50b3ApLXcpOihrPWEuY2xpZW50V2lkdGgtKGUubGVmdC15LmxlZnQpK3osQT1hLmNsaWVudEhlaWdodC0oZS50b3AteS50b3ApK3cscT1lLndpZHRoKyhlLmxlZnQteS5sZWZ0KS16LFc9dC5jbGllbnRIZWlnaHQrKGUudG9wLXkudG9wKS13KSksbSYmKHEtPW1bM10sVy09bVswXSxrLT1tWzFdLEEtPW1bMl0pO3ZhciBSPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHQpLEI9cGFyc2VGbG9hdChSLndpZHRoKS1lLndpZHRoLEg9cGFyc2VGbG9hdChSLmhlaWdodCktZS5oZWlnaHQsTT1wYXJzZUZsb2F0KFIubGVmdCktZS5sZWZ0LE89cGFyc2VGbG9hdChSLnRvcCktZS50b3A7YSE9PWRvY3VtZW50LmJvZHkmJihNKz15LmxlZnQsTys9eS50b3ApLGY9ZnVuY3Rpb24oZSl7Z3x8KGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZCksbi5zdGFydCYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHQsbi5zdGFydCwhMSx7d2lkdGg6aixoZWlnaHQ6UH0pLGpzUGFuZWwuZnJvbnQodCkpLGc9MSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGMpLChTLmNvbnRhaW5zKFwianNQYW5lbC1yZXNpemVpdC1lXCIpfHxTLmNvbnRhaW5zKFwianNQYW5lbC1yZXNpemVpdC1zZVwiKXx8Uy5jb250YWlucyhcImpzUGFuZWwtcmVzaXplaXQtbmVcIikpJiYodT1qKyhlLmNsaWVudFh8fGUudG91Y2hlc1swXS5jbGllbnRYKS1DK0IsdT49ayYmKHU9ayksdT49aT91PWk6dTw9cyYmKHU9cyksdC5zdHlsZS53aWR0aD11K1wicHhcIiksKFMuY29udGFpbnMoXCJqc1BhbmVsLXJlc2l6ZWl0LXNcIil8fFMuY29udGFpbnMoXCJqc1BhbmVsLXJlc2l6ZWl0LXNlXCIpfHxTLmNvbnRhaW5zKFwianNQYW5lbC1yZXNpemVpdC1zd1wiKSkmJihiPVArKGUuY2xpZW50WXx8ZS50b3VjaGVzWzBdLmNsaWVudFkpLUUrSCxiPj1BJiYoYj1BKSxiPj1sP2I9bDpiPD1yJiYoYj1yKSx0LnN0eWxlLmhlaWdodD1iK1wicHhcIiksKFMuY29udGFpbnMoXCJqc1BhbmVsLXJlc2l6ZWl0LXdcIil8fFMuY29udGFpbnMoXCJqc1BhbmVsLXJlc2l6ZWl0LW53XCIpfHxTLmNvbnRhaW5zKFwianNQYW5lbC1yZXNpemVpdC1zd1wiKSkmJih1PWorQy0oZS5jbGllbnRYfHxlLnRvdWNoZXNbMF0uY2xpZW50WCkrQix1PD1pJiZ1Pj1zJiZ1PD1xJiYodC5zdHlsZS5sZWZ0PVQrKGUuY2xpZW50WHx8ZS50b3VjaGVzWzBdLmNsaWVudFgpLUMrTStcInB4XCIpLHU+PXEmJih1PXEpLHU+PWk/dT1pOnU8PXMmJih1PXMpLHQuc3R5bGUud2lkdGg9dStcInB4XCIpLChTLmNvbnRhaW5zKFwianNQYW5lbC1yZXNpemVpdC1uXCIpfHxTLmNvbnRhaW5zKFwianNQYW5lbC1yZXNpemVpdC1ud1wiKXx8Uy5jb250YWlucyhcImpzUGFuZWwtcmVzaXplaXQtbmVcIikpJiYoYj1QK0UtKGUuY2xpZW50WXx8ZS50b3VjaGVzWzBdLmNsaWVudFkpK0gsYjw9bCYmYj49ciYmYjw9VyYmKHQuc3R5bGUudG9wPUwrKGUuY2xpZW50WXx8ZS50b3VjaGVzWzBdLmNsaWVudFkpLUUrTytcInB4XCIpLGI+PVcmJihiPVcpLGI+PWw/Yj1sOmI8PXImJihiPXIpLHQuc3R5bGUuaGVpZ2h0PWIrXCJweFwiKSx0JiZ0LmNvbnRlbnRSZXNpemUoKSx3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCk7dmFyIGE9d2luZG93LmdldENvbXB1dGVkU3R5bGUodCksbz17bGVmdDpwYXJzZUZsb2F0KGEubGVmdCksdG9wOnBhcnNlRmxvYXQoYS50b3ApLHJpZ2h0OnBhcnNlRmxvYXQoYS5yaWdodCksYm90dG9tOnBhcnNlRmxvYXQoYS5ib3R0b20pLHdpZHRoOnBhcnNlRmxvYXQoYS53aWR0aCksaGVpZ2h0OnBhcnNlRmxvYXQoYS5oZWlnaHQpfTtuLnJlc2l6ZSYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHQsbi5yZXNpemUsITEsbyl9LGpzUGFuZWwucG9pbnRlcm1vdmUuZm9yRWFjaChmdW5jdGlvbihlKXtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGUsZiwhMSl9KSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsZnVuY3Rpb24odCl7bnVsbD09PXQucmVsYXRlZFRhcmdldCYmanNQYW5lbC5wb2ludGVybW92ZS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2RvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZSxmLCExKX0pfSwhMSl9KX0pfSksanNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbihlKXtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGUsZnVuY3Rpb24oYSl7aWYoanNQYW5lbC5wb2ludGVybW92ZS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2RvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZSxmLCExKX0pLGEudGFyZ2V0LmNsYXNzTGlzdCYmYS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwianNQYW5lbC1yZXNpemVpdC1oYW5kbGVcIikpe3ZhciBlLG8saT1hLnRhcmdldC5jbGFzc05hbWU7aWYoaS5tYXRjaCgvanNQYW5lbC1yZXNpemVpdC1ud3xqc1BhbmVsLXJlc2l6ZWl0LXd8anNQYW5lbC1yZXNpemVpdC1zdy9pKSYmKGU9ITApLGkubWF0Y2goL2pzUGFuZWwtcmVzaXplaXQtbnd8anNQYW5lbC1yZXNpemVpdC1ufGpzUGFuZWwtcmVzaXplaXQtbmUvaSkmJihvPSEwKSxuLmdyaWQmJkFycmF5LmlzQXJyYXkobi5ncmlkKSl7MT09PW4uZ3JpZC5sZW5ndGgmJihuLmdyaWRbMV09bi5ncmlkWzBdKTt2YXIgbD1wYXJzZUZsb2F0KHQuc3R5bGUud2lkdGgpLHM9cGFyc2VGbG9hdCh0LnN0eWxlLmhlaWdodCkscj1sJW4uZ3JpZFswXSxkPXMlbi5ncmlkWzFdLGM9cGFyc2VGbG9hdCh0LnN0eWxlLmxlZnQpLG09cGFyc2VGbG9hdCh0LnN0eWxlLnRvcCksdT1jJW4uZ3JpZFswXSxiPW0lbi5ncmlkWzFdO3Quc3R5bGUud2lkdGg9cjxuLmdyaWRbMF0vMj9sLXIrXCJweFwiOmwrKG4uZ3JpZFswXS1yKStcInB4XCIsdC5zdHlsZS5oZWlnaHQ9ZDxuLmdyaWRbMV0vMj9zLWQrXCJweFwiOnMrKG4uZ3JpZFsxXS1kKStcInB4XCIsZSYmKHU8bi5ncmlkWzBdLzI/dC5zdHlsZS5sZWZ0PWMtdStcInB4XCI6dC5zdHlsZS5sZWZ0PWMrKG4uZ3JpZFswXS11KStcInB4XCIpLG8mJihiPG4uZ3JpZFsxXS8yP3Quc3R5bGUudG9wPW0tYitcInB4XCI6dC5zdHlsZS50b3A9bSsobi5ncmlkWzFdLWIpK1wicHhcIil9dCYmdC5jb250ZW50UmVzaXplKCl9ZyYmKHQuY29udGVudC5zdHlsZS5wb2ludGVyRXZlbnRzPVwiaW5oZXJpdFwiLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQocCksZz12b2lkIDAsdC5zYXZlQ3VycmVudERpbWVuc2lvbnMoKSx0LnNhdmVDdXJyZW50UG9zaXRpb24oKSxuLnN0b3AmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyh0LG4uc3RvcCwhMSx7d2lkdGg6cGFyc2VGbG9hdCh0LnN0eWxlLndpZHRoKSxoZWlnaHQ6cGFyc2VGbG9hdCh0LnN0eWxlLmhlaWdodCl9KSksaC5sZW5ndGgmJmguZm9yRWFjaChmdW5jdGlvbihlKXtlLnN0eWxlLnBvaW50ZXJFdmVudHM9XCJpbmhlcml0XCJ9KX0sITEpfSksbi5kaXNhYmxlJiZ0LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanNQYW5lbC1yZXNpemVpdC1oYW5kbGVcIikuZm9yRWFjaChmdW5jdGlvbihlKXtlLnN0eWxlLnBvaW50ZXJFdmVudHM9XCJub25lXCJ9KSx0fSxzZXRDbGFzczpmdW5jdGlvbihlLHQpe3JldHVybiB0LnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3JldHVybiBlLmNsYXNzTGlzdC5hZGQodCl9KSxlfSxyZW1DbGFzczpmdW5jdGlvbihlLHQpe3JldHVybiB0LnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3JldHVybiBlLmNsYXNzTGlzdC5yZW1vdmUodCl9KSxlfSxzZXRTdHlsZTpmdW5jdGlvbihlLHQpe2Zvcih2YXIgbiBpbiB0KWlmKHQuaGFzT3duUHJvcGVydHkobikpe3ZhciBhPShuK1wiXCIpLnJlcGxhY2UoLy1cXHcvZ2ksZnVuY3Rpb24oZSl7cmV0dXJuIGUuc3Vic3RyKC0xKS50b1VwcGVyQ2FzZSgpfSk7ZS5zdHlsZVthXT10W25dfXJldHVybiBlfSxzbmFwUGFuZWw6ZnVuY3Rpb24oZSx0KXtpZihlLmN1cnJlbnREYXRhLmJlZm9yZVNuYXA9e3dpZHRoOmUuY3VycmVudERhdGEud2lkdGgsaGVpZ2h0OmUuY3VycmVudERhdGEuaGVpZ2h0fSx0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiB0KXQuY2FsbChlLGUsZS5zbmFwcGFibGVUbyk7ZWxzZSBpZighMSE9PXQpe3ZhciBuPVswLDBdO2lmKGUub3B0aW9ucy5kcmFnaXQuc25hcC5jb250YWlubWVudCYmZS5vcHRpb25zLmRyYWdpdC5jb250YWlubWVudCl7dmFyIGE9dGhpcy5wT2NvbnRhaW5tZW50KGUub3B0aW9ucy5kcmFnaXQuY29udGFpbm1lbnQpLG89ZS5zbmFwcGFibGVUbztvLnN0YXJ0c1dpdGgoXCJsZWZ0XCIpP25bMF09YVszXTpvLnN0YXJ0c1dpdGgoXCJyaWdodFwiKSYmKG5bMF09LWFbMV0pLG8uZW5kc1dpdGgoXCJ0b3BcIik/blsxXT1hWzBdOm8uZW5kc1dpdGgoXCJib3R0b21cIikmJihuWzFdPS1hWzJdKX1lLnJlcG9zaXRpb24oZS5zbmFwcGFibGVUbytcIiBcIituWzBdK1wiIFwiK25bMV0pLGUuc25hcHBlZD1lLnNuYXBwYWJsZVRvfX0sY3JlYXRlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyxuPTA8YXJndW1lbnRzLmxlbmd0aCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp7fSx0PWFyZ3VtZW50c1sxXTtqc1BhbmVsLnppfHwoanNQYW5lbC56aT1mdW5jdGlvbigpe3ZhciBlPTA8YXJndW1lbnRzLmxlbmd0aCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTpqc1BhbmVsLnppQmFzZSx0PWU7cmV0dXJue25leHQ6ZnVuY3Rpb24oKXtyZXR1cm4gdCsrfX19KCkpO3ZhciBhO24uY29uZmlnPyhuPU9iamVjdC5hc3NpZ24oe30sdGhpcy5kZWZhdWx0cyxuLmNvbmZpZyxuKSxkZWxldGUgbi5jb25maWcpOm49T2JqZWN0LmFzc2lnbih7fSx0aGlzLmRlZmF1bHRzLG4pLG4uaWQ/XCJmdW5jdGlvblwiPT10eXBlb2Ygbi5pZCYmKG4uaWQ9bi5pZCgpKTpuLmlkPVwianNQYW5lbC1cIisoanNQYW5lbC5pZENvdW50ZXIrPTEpO3ZhciBvPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG4uaWQpO2lmKG51bGwhPT1vKXtvLmNsYXNzTGlzdC5jb250YWlucyhcImpzUGFuZWxcIikmJm8uZnJvbnQoKTt2YXIgaT1uZXcganNQYW5lbEVycm9yKFwiTk8gTkVXIFBBTkVMIENSRUFURUQhXFxuQW4gZWxlbWVudCB3aXRoIHRoZSBJRCA8XCIrbi5pZCtcIj4gYWxyZWFkeSBleGlzdHMgaW4gdGhlIGRvY3VtZW50LlwiKTt0cnl7dGhyb3cgaX1jYXRjaChuKXt0JiZ0LmNhbGwobixuKX1yZXR1cm4gY29uc29sZS5lcnJvcihpLm5hbWUrXCI6XCIsaS5tZXNzYWdlKX12YXIgbD10aGlzLnBPY29udGFpbmVyKG4uY29udGFpbmVyLHQpO2lmKGwmJmwubWVzc2FnZSlyZXR1cm4gY29uc29sZS5lcnJvcihsLm5hbWUrXCI6XCIsbC5tZXNzYWdlKTtuLm1heGltaXplZE1hcmdpbj10aGlzLnBPY29udGFpbm1lbnQobi5tYXhpbWl6ZWRNYXJnaW4pLG4uZHJhZ2l0JiYoW1wic3RhcnRcIixcImRyYWdcIixcInN0b3BcIl0uZm9yRWFjaChmdW5jdGlvbihlKXtuLmRyYWdpdFtlXT9cImZ1bmN0aW9uXCI9PXR5cGVvZiBuLmRyYWdpdFtlXSYmKG4uZHJhZ2l0W2VdPVtuLmRyYWdpdFtlXV0pOm4uZHJhZ2l0W2VdPVtdfSksbi5kcmFnaXQuc25hcCYmKFwib2JqZWN0XCI9PT1fdHlwZW9mKG4uZHJhZ2l0LnNuYXApP24uZHJhZ2l0LnNuYXA9T2JqZWN0LmFzc2lnbih7fSx0aGlzLmRlZmF1bHRTbmFwQ29uZmlnLG4uZHJhZ2l0LnNuYXApOm4uZHJhZ2l0LnNuYXA9dGhpcy5kZWZhdWx0U25hcENvbmZpZykpLG4ucmVzaXplaXQmJltcInN0YXJ0XCIsXCJyZXNpemVcIixcInN0b3BcIl0uZm9yRWFjaChmdW5jdGlvbihlKXtuLnJlc2l6ZWl0W2VdP1wiZnVuY3Rpb25cIj09dHlwZW9mIG4ucmVzaXplaXRbZV0mJihuLnJlc2l6ZWl0W2VdPVtuLnJlc2l6ZWl0W2VdXSk6bi5yZXNpemVpdFtlXT1bXX0pLFtcIm9uYmVmb3JlY2xvc2VcIixcIm9uYmVmb3JlbWF4aW1pemVcIixcIm9uYmVmb3JlbWluaW1pemVcIixcIm9uYmVmb3Jlbm9ybWFsaXplXCIsXCJvbmJlZm9yZXNtYWxsaWZ5XCIsXCJvbmJlZm9yZXVuc21hbGxpZnlcIixcIm9uY2xvc2VkXCIsXCJvbmZyb250ZWRcIixcIm9ubWF4aW1pemVkXCIsXCJvbm1pbmltaXplZFwiLFwib25ub3JtYWxpemVkXCIsXCJvbnNtYWxsaWZpZWRcIixcIm9uc3RhdHVzY2hhbmdlXCIsXCJvbnVuc21hbGxpZmllZFwiXS5mb3JFYWNoKGZ1bmN0aW9uKGUpe25bZV0/XCJmdW5jdGlvblwiPT10eXBlb2YgbltlXSYmKG5bZV09W25bZV1dKTpuW2VdPVtdfSksbi5oZWFkZXJSZW1vdmUmJihuLmhlYWRlcj0hMSk7dmFyIHM9bi50ZW1wbGF0ZT9uLnRlbXBsYXRlOnRoaXMuY3JlYXRlUGFuZWxUZW1wbGF0ZSgpO3Mub3B0aW9ucz1uLHMuc3RhdHVzPVwiaW5pdGlhbGl6ZWRcIixzLmN1cnJlbnREYXRhPXt9LHMuaGVhZGVyPXMucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWhkclwiKSxzLmhlYWRlcmJhcj1zLmhlYWRlci5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtaGVhZGVyYmFyXCIpLHMudGl0bGViYXI9cy5oZWFkZXIucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLXRpdGxlYmFyXCIpLHMuaGVhZGVybG9nbz1zLmhlYWRlcmJhci5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtaGVhZGVybG9nb1wiKSxzLmhlYWRlcnRpdGxlPXMuaGVhZGVyYmFyLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC10aXRsZVwiKSxzLmNvbnRyb2xiYXI9cy5oZWFkZXJiYXIucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWNvbnRyb2xiYXJcIikscy5oZWFkZXJ0b29sYmFyPXMuaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1oZHItdG9vbGJhclwiKSxzLmNvbnRlbnQ9cy5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtY29udGVudFwiKSxzLmZvb3Rlcj1zLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1mdHJcIikscy5zbmFwcGFibGVUbz0hMSxzLnNuYXBwZWQ9ITE7dmFyIHI9bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbGxvYWRlZFwiLHtkZXRhaWw6bi5pZH0pLGQ9bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbGJlZm9yZWNsb3NlXCIse2RldGFpbDpuLmlkfSksYz1uZXcgQ3VzdG9tRXZlbnQoXCJqc3BhbmVsY2xvc2VkXCIse2RldGFpbDpuLmlkfSksaD1uZXcgQ3VzdG9tRXZlbnQoXCJqc3BhbmVsc3RhdHVzY2hhbmdlXCIse2RldGFpbDpuLmlkfSkscD1uZXcgQ3VzdG9tRXZlbnQoXCJqc3BhbmVsYmVmb3Jlbm9ybWFsaXplXCIse2RldGFpbDpuLmlkfSksbT1uZXcgQ3VzdG9tRXZlbnQoXCJqc3BhbmVsbm9ybWFsaXplZFwiLHtkZXRhaWw6bi5pZH0pLGY9bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbGJlZm9yZW1heGltaXplXCIse2RldGFpbDpuLmlkfSksZz1uZXcgQ3VzdG9tRXZlbnQoXCJqc3BhbmVsbWF4aW1pemVkXCIse2RldGFpbDpuLmlkfSksdT1uZXcgQ3VzdG9tRXZlbnQoXCJqc3BhbmVsYmVmb3JlbWluaW1pemVcIix7ZGV0YWlsOm4uaWR9KSxiPW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxtaW5pbWl6ZWRcIix7ZGV0YWlsOm4uaWR9KSx5PW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxiZWZvcmVzbWFsbGlmeVwiLHtkZXRhaWw6bi5pZH0pLHY9bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbHNtYWxsaWZpZWRcIix7ZGV0YWlsOm4uaWR9KSx6PW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxzbWFsbGlmaWVkbWF4XCIse2RldGFpbDpuLmlkfSksdz1uZXcgQ3VzdG9tRXZlbnQoXCJqc3BhbmVsYmVmb3JldW5zbWFsbGlmeVwiLHtkZXRhaWw6bi5pZH0pLHg9bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbGZyb250ZWRcIix7ZGV0YWlsOm4uaWR9KSxDPXMucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWJ0bi1jbG9zZVwiKSxFPXMucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWJ0bi1tYXhpbWl6ZVwiKSxqPXMucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWJ0bi1ub3JtYWxpemVcIiksUD1zLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1idG4tc21hbGxpZnlcIiksUz1zLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1idG4tc21hbGxpZnlyZXZcIiksVD1zLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1idG4tbWluaW1pemVcIik7QyYmanNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbihlKXtDLmFkZEV2ZW50TGlzdGVuZXIoZSxmdW5jdGlvbih0KXt0LnByZXZlbnREZWZhdWx0KCkscy5jbG9zZSgpfSl9KSxFJiZqc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uKGUpe0UuYWRkRXZlbnRMaXN0ZW5lcihlLGZ1bmN0aW9uKHQpe3QucHJldmVudERlZmF1bHQoKSxzLm1heGltaXplKCl9KX0pLGomJmpzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24oZSl7ai5hZGRFdmVudExpc3RlbmVyKGUsZnVuY3Rpb24odCl7dC5wcmV2ZW50RGVmYXVsdCgpLHMubm9ybWFsaXplKCl9KX0pLFAmJmpzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24oZSl7UC5hZGRFdmVudExpc3RlbmVyKGUsZnVuY3Rpb24odCl7dC5wcmV2ZW50RGVmYXVsdCgpLHMuc21hbGxpZnkoKX0pfSksUyYmanNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbihlKXtTLmFkZEV2ZW50TGlzdGVuZXIoZSxmdW5jdGlvbih0KXt0LnByZXZlbnREZWZhdWx0KCkscy51bnNtYWxsaWZ5KCl9KX0pLFQmJmpzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24oZSl7VC5hZGRFdmVudExpc3RlbmVyKGUsZnVuY3Rpb24odCl7dC5wcmV2ZW50RGVmYXVsdCgpLHMubWluaW1pemUoKX0pfSk7dmFyIEw9anNQYW5lbC5leHRlbnNpb25zO2Zvcih2YXIgayBpbiBMKUwuaGFzT3duUHJvcGVydHkoaykmJihzW2tdPUxba10pO2lmKHMuYWRkVG9vbGJhcj1mdW5jdGlvbihlLHQsbil7aWYoXCJoZWFkZXJcIj09PWU/ZT1zLmhlYWRlcnRvb2xiYXI6XCJmb290ZXJcIj09PWUmJihlPXMuZm9vdGVyKSxcInN0cmluZ1wiPT10eXBlb2YgdCllLmlubmVySFRNTD10O2Vsc2UgaWYoQXJyYXkuaXNBcnJheSh0KSl0LmZvckVhY2goZnVuY3Rpb24odCl7XCJzdHJpbmdcIj09dHlwZW9mIHQ/ZS5pbm5lckhUTUwrPXQ6ZS5hcHBlbmQodCl9KTtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIHQpe3ZhciBhPXQuY2FsbChzLHMpO1wic3RyaW5nXCI9PXR5cGVvZiBhP2UuaW5uZXJIVE1MPWE6ZS5hcHBlbmQoYSl9ZWxzZSBlLmFwcGVuZCh0KTtyZXR1cm4gZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpLGU9PT1zLmZvb3RlciYmcy5jb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJqc1BhbmVsLWNvbnRlbnQtbm9mb290ZXJcIikscy5jb250ZW50UmVzaXplKCksbiYmbi5jYWxsKHMscyksc30scy5hcHBseUJ1aWx0SW5UaGVtZT1mdW5jdGlvbihlKXtyZXR1cm4gcy5jbGFzc0xpc3QuYWRkKFwianNQYW5lbC10aGVtZS1cIitlLmNvbG9yKSxzLmhlYWRlci5jbGFzc0xpc3QuYWRkKFwianNQYW5lbC10aGVtZS1cIitlLmNvbG9yKSxlLmZpbGxpbmcmJihzLmNvbnRlbnQuc3R5bGUuYmFja2dyb3VuZD1cIlwiLHMuY29udGVudC5jbGFzc0xpc3QuYWRkKFwianNQYW5lbC1jb250ZW50LVwiK2UuZmlsbGluZykpLG4uaGVhZGVyVG9vbGJhcnx8KHMuY29udGVudC5zdHlsZS5iYWNrZ3JvdW5kPVwiXCIscy5jb250ZW50LnN0eWxlLmJvcmRlclRvcD1cIjFweCBzb2xpZCBcIitzLmhlYWRlcnRpdGxlLnN0eWxlLmNvbG9yKSxzfSxzLmFwcGx5QXJiaXRyYXJ5VGhlbWU9ZnVuY3Rpb24oZSl7cmV0dXJuIHMuaGVhZGVyLnN0eWxlLmJhY2tncm91bmRDb2xvcj1lLmNvbG9yc1swXSxbXCIuanNQYW5lbC1oZWFkZXJsb2dvXCIsXCIuanNQYW5lbC10aXRsZVwiLFwiLmpzUGFuZWwtaGRyLXRvb2xiYXJcIl0uZm9yRWFjaChmdW5jdGlvbih0KXtzLnF1ZXJ5U2VsZWN0b3IodCkuc3R5bGUuY29sb3I9ZS5jb2xvcnNbM119LHMpLHMucXVlcnlTZWxlY3RvckFsbChcIi5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuXCIpLmZvckVhY2goZnVuY3Rpb24odCl7dC5zdHlsZS5jb2xvcj1lLmNvbG9yc1szXX0pLG4uaGVhZGVyVG9vbGJhcj9qc1BhbmVsLnNldFN0eWxlKHMuaGVhZGVydG9vbGJhcix7Ym94U2hhZG93OlwiMCAwIDFweCBcIitlLmNvbG9yc1szXStcIiBpbnNldFwiLHdpZHRoOlwiY2FsYygxMDAlICsgNHB4KVwiLG1hcmdpbkxlZnQ6XCItMXB4XCJ9KTpzLmNvbnRlbnQuc3R5bGUuYm9yZGVyVG9wPVwiMXB4IHNvbGlkIFwiK2UuY29sb3JzWzNdLFwiZmlsbGVkXCI9PT1lLmZpbGxpbmc/KHMuY29udGVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I9ZS5jb2xvcnNbMF0scy5jb250ZW50LnN0eWxlLmNvbG9yPWUuY29sb3JzWzNdKTpcImZpbGxlZGxpZ2h0XCI9PT1lLmZpbGxpbmcmJihzLmNvbnRlbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yPWUuY29sb3JzWzFdKSxzfSxzLmFwcGx5Qm9vdHN0cmFwVGhlbWU9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5ic3RoZW1lLG49JC5mbi5idXR0b24uQ29uc3RydWN0b3IuVkVSU0lPTlswXTtpZihcIjRcIj09PW4/cy5jbGFzc0xpc3QuYWRkKFwiYmctXCIrdCk6KFtcInBhbmVsXCIsXCJwYW5lbC1cIit0XS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3MuY2xhc3NMaXN0LmFkZChlKX0pLHMuaGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJwYW5lbC1oZWFkaW5nXCIpKSxcIm1kYlwiPT09ZS5icyl7dmFyIGE9dCtcIi1jb2xvclwiO2UubWRiU3R5bGUmJihhKz1cIi1kYXJrXCIpLHMuY2xhc3NMaXN0LmFkZChhKX12YXIgbz1cIjRcIj09PW4/d2luZG93LmdldENvbXB1dGVkU3R5bGUocykuYmFja2dyb3VuZENvbG9yLnJlcGxhY2UoL1xccysvZyxcIlwiKTp3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzLmhlYWRlcikuYmFja2dyb3VuZENvbG9yLnJlcGxhY2UoL1xccysvZyxcIlwiKTt2YXIgaT1qc1BhbmVsLmNhbGNDb2xvcnMobyk7cmV0dXJuIHMuaGVhZGVyLnN0eWxlLmNvbG9yPWlbM10sZS5maWxsaW5nP3Muc2V0VGhlbWUobytcIiBcIitlLmZpbGxpbmcpOnMuc2V0VGhlbWUobyksc30scy5hcHBseVRoZW1lQm9yZGVyPWZ1bmN0aW9uKGUpe3ZhciB0PW4uYm9yZGVyLnNwbGl0KFwiIFwiKTtpZihzLnN0eWxlLmJvcmRlcldpZHRoPXRbMF0scy5zdHlsZS5ib3JkZXJTdHlsZT10WzFdLHMuc3R5bGUuYm9yZGVyQ29sb3I9dFsyXSwhZS5icyktMT09PWpzUGFuZWwudGhlbWVzLmluZGV4T2YoZS5jb2xvcikmJih0WzJdP3Muc3R5bGUuYm9yZGVyQ29sb3I9dFsyXTpzLnN0eWxlLmJvcmRlckNvbG9yPWUuY29sb3JzWzBdKTtlbHNle3ZhciBhO2E9XCJ0cmFuc3BhcmVudFwiPT09d2luZG93LmdldENvbXB1dGVkU3R5bGUocy5oZWFkZXIpLmJhY2tncm91bmRDb2xvcj93aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzKS5iYWNrZ3JvdW5kQ29sb3IucmVwbGFjZSgvXFxzKy9nLFwiXCIpOndpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHMuaGVhZGVyKS5iYWNrZ3JvdW5kQ29sb3IucmVwbGFjZSgvXFxzKy9nLFwiXCIpLHMuc3R5bGUuYm9yZGVyQ29sb3I9dFsyXT90WzJdOmF9cmV0dXJuIHN9LHMuYXV0b3Bvc2l0aW9uUmVtYWluaW5nPWZ1bmN0aW9uKCl7dmFyIGU7W1wibGVmdC10b3AtZG93blwiLFwibGVmdC10b3AtcmlnaHRcIixcImNlbnRlci10b3AtZG93blwiLFwicmlnaHQtdG9wLWRvd25cIixcInJpZ2h0LXRvcC1sZWZ0XCIsXCJsZWZ0LWJvdHRvbS11cFwiLFwibGVmdC1ib3R0b20tcmlnaHRcIixcImNlbnRlci1ib3R0b20tdXBcIixcInJpZ2h0LWJvdHRvbS11cFwiLFwicmlnaHQtYm90dG9tLWxlZnRcIl0uZm9yRWFjaChmdW5jdGlvbih0KXtzLmNsYXNzTGlzdC5jb250YWlucyh0KSYmKGU9dCl9KSxlJiZuLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLlwiK2UpLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5yZXBvc2l0aW9uKCl9KX0scy5jYWxjU2l6ZUZhY3RvcnM9ZnVuY3Rpb24oKXt2YXIgZT13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzKTtpZihuLmNvbnRhaW5lcj09PWRvY3VtZW50LmJvZHkpcy5oZj1wYXJzZUZsb2F0KHMuc3R5bGUubGVmdCkvKGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgtcGFyc2VGbG9hdChzLnN0eWxlLndpZHRoKSkscy52Zj1wYXJzZUZsb2F0KHMuc3R5bGUudG9wKS8od2luZG93LmlubmVySGVpZ2h0LXBhcnNlRmxvYXQoZS5oZWlnaHQpKTtlbHNle3ZhciB0PXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHMucGFyZW50RWxlbWVudCk7cy5oZj1wYXJzZUZsb2F0KHMuc3R5bGUubGVmdCkvKHBhcnNlRmxvYXQodC53aWR0aCktcGFyc2VGbG9hdChzLnN0eWxlLndpZHRoKSkscy52Zj1wYXJzZUZsb2F0KHMuc3R5bGUudG9wKS8ocGFyc2VGbG9hdCh0LmhlaWdodCktcGFyc2VGbG9hdChlLmhlaWdodCkpfX0scy5jbGVhclRoZW1lPWZ1bmN0aW9uKGUpe3JldHVybiBqc1BhbmVsLnRoZW1lcy5jb25jYXQoanNQYW5lbC5tZGJ0aGVtZXMpLmZvckVhY2goZnVuY3Rpb24oZSl7W1wicGFuZWxcIixcImpzUGFuZWwtdGhlbWUtXCIrZSxcInBhbmVsLVwiK2UsZStcIi1jb2xvclwiXS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3MuY2xhc3NMaXN0LnJlbW92ZShlKX0pLHMuaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJwYW5lbC1oZWFkaW5nXCIsXCJqc1BhbmVsLXRoZW1lLVwiK2UpfSxzKSxzLmhlYWRlcnRpdGxlLmNsYXNzTGlzdC5yZW1vdmUoXCJwYW5lbC10aXRsZVwiKSxzLmNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZShcInBhbmVsLWJvZHlcIixcImpzUGFuZWwtY29udGVudC1maWxsZWRcIixcImpzUGFuZWwtY29udGVudC1maWxsZWRsaWdodFwiKSxzLmZvb3Rlci5jbGFzc0xpc3QucmVtb3ZlKFwicGFuZWwtZm9vdGVyXCIpLGpzUGFuZWwuc2V0U3R5bGUocyx7YmFja2dyb3VuZENvbG9yOlwiXCIsYm9yZGVyV2lkdGg6XCJcIixib3JkZXJTdHlsZTpcIlwiLGJvcmRlckNvbG9yOlwiXCJ9KSxqc1BhbmVsLnNldFN0eWxlKHMuY29udGVudCx7YmFja2dyb3VuZDpcIlwiLGJvcmRlcjpcIlwifSksanNQYW5lbC5zZXRTdHlsZShzLmhlYWRlcnRvb2xiYXIse2JveFNoYWRvdzpcIlwiLHdpZHRoOlwiXCIsbWFyZ2luTGVmdDpcIlwifSkscy5oZWFkZXIuc3R5bGUuYmFja2dyb3VuZD1cIlwiLEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHMuY29udHJvbGJhci5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzUGFuZWwtaWNvblwiKSkuY29uY2F0KFtzLmhlYWRlcmxvZ28scy5oZWFkZXJ0aXRsZSxzLmhlYWRlcnRvb2xiYXIscy5jb250ZW50XSkuZm9yRWFjaChmdW5jdGlvbihlKXtlLnN0eWxlLmNvbG9yPVwiXCJ9KSxlJiZlLmNhbGwocyxzKSxzfSxzLmNsb3NlPWZ1bmN0aW9uKGUpe3ZhciB0PWZ1bmN0aW9uKCl7dmFyIHQ9bi5pZDtyZXR1cm4gYSYmd2luZG93LmNsZWFyVGltZW91dChhKSxzLmNsb3NlQ2hpbGRwYW5lbHMoKSxzLnBhcmVudEVsZW1lbnQmJnMucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChzKSwhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodCkmJnZvaWQocy5yZW1vdmVNaW5pbWl6ZWRSZXBsYWNlbWVudCgpLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoYyksZSYmZS5jYWxsKHQsdCksbi5vbmNsb3NlZCYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHMsbi5vbmNsb3NlZCxcImV2ZXJ5XCIpLHMuYXV0b3Bvc2l0aW9uUmVtYWluaW5nKCkpfTtyZXR1cm4gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChkKSxuLm9uYmVmb3JlY2xvc2UmJjA8bi5vbmJlZm9yZWNsb3NlLmxlbmd0aCYmIWpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhzLG4ub25iZWZvcmVjbG9zZSk/czp2b2lkKG4uYW5pbWF0ZU91dD8obi5hbmltYXRlSW4mJmpzUGFuZWwucmVtQ2xhc3MocyxuLmFuaW1hdGVJbiksanNQYW5lbC5zZXRDbGFzcyhzLG4uYW5pbWF0ZU91dCkscy5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uZW5kXCIsZnVuY3Rpb24oKXt0KCl9KSk6dCgpKX0scy5jbG9zZUNoaWxkcGFuZWxzPWZ1bmN0aW9uKGUpe3JldHVybiBzLmdldENoaWxkcGFuZWxzKCkuZm9yRWFjaChmdW5jdGlvbihlKXtyZXR1cm4gZS5jbG9zZSgpfSksZSYmZS5jYWxsKHMscyksc30scy5jb250ZW50UmVtb3ZlPWZ1bmN0aW9uKGUpe3JldHVybiBqc1BhbmVsLmVtcHR5Tm9kZShzLmNvbnRlbnQpLGUmJmUuY2FsbChzLHMpLHN9LHMuY29udGVudFJlc2l6ZT1mdW5jdGlvbihlKXt2YXIgdD13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzKSxhPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHMuaGVhZGVyKSxvPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHMuZm9vdGVyKSxpPW4uaGVhZGVyP2EuaGVpZ2h0OjAsbD1cIm5vbmVcIj09PW8uZGlzcGxheT8wOm8uaGVpZ2h0LHI9cGFyc2VGbG9hdCh0LmhlaWdodCktcGFyc2VGbG9hdChpKS1wYXJzZUZsb2F0KGwpLXBhcnNlRmxvYXQodC5ib3JkZXJUb3BXaWR0aCktcGFyc2VGbG9hdCh0LmJvcmRlckJvdHRvbVdpZHRoKTtyZXR1cm4gcy5jb250ZW50LnN0eWxlLmhlaWdodD1yK1wicHhcIixlJiZlLmNhbGwocyxzKSxzfSxzLmNyZWF0ZU1pbmltaXplZFJlcGxhY2VtZW50PWZ1bmN0aW9uKCl7dmFyIGU9anNQYW5lbC5jcmVhdGVNaW5pbWl6ZWRUZW1wbGF0ZSgpLHQ9d2luZG93LmdldENvbXB1dGVkU3R5bGUocy5oZWFkZXJ0aXRsZSkuY29sb3IsYT1uLmljb25mb250LG89ZS5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtY29udHJvbGJhclwiKTtyZXR1cm4gZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I9XCJ0cmFuc3BhcmVudFwiPT09d2luZG93LmdldENvbXB1dGVkU3R5bGUocy5oZWFkZXIpLmJhY2tncm91bmRDb2xvcj93aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzKS5iYWNrZ3JvdW5kQ29sb3I6d2luZG93LmdldENvbXB1dGVkU3R5bGUocy5oZWFkZXIpLmJhY2tncm91bmRDb2xvcixlLmlkPXMuaWQrXCItbWluXCIsZS5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtaGVhZGVyYmFyXCIpLnJlcGxhY2VDaGlsZChzLmhlYWRlcmxvZ28uY2xvbmVOb2RlKCEwKSxlLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1oZWFkZXJsb2dvXCIpKSxlLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC10aXRsZWJhclwiKS5yZXBsYWNlQ2hpbGQocy5oZWFkZXJ0aXRsZS5jbG9uZU5vZGUoITApLGUucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLXRpdGxlXCIpKSxlLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC10aXRsZVwiKS5zdHlsZS5jb2xvcj10LG8uc3R5bGUuY29sb3I9dCxzLnNldEljb25mb250KGEsZSksXCJlbmFibGVkXCI9PT1zLmRhdGFzZXQuYnRubm9ybWFsaXplP2pzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24odCl7ZS5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZVwiKS5hZGRFdmVudExpc3RlbmVyKHQsZnVuY3Rpb24oKXtzLm5vcm1hbGl6ZSgpLnJlbW92ZU1pbmltaXplZFJlcGxhY2VtZW50KCl9KX0pOm8ucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWJ0bi1ub3JtYWxpemVcIikuc3R5bGUuZGlzcGxheT1cIm5vbmVcIixcImVuYWJsZWRcIj09PXMuZGF0YXNldC5idG5tYXhpbWl6ZT9qc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uKHQpe2UucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWJ0bi1tYXhpbWl6ZVwiKS5hZGRFdmVudExpc3RlbmVyKHQsZnVuY3Rpb24oKXtzLm1heGltaXplKCkucmVtb3ZlTWluaW1pemVkUmVwbGFjZW1lbnQoKX0pfSk6by5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtYnRuLW1heGltaXplXCIpLnN0eWxlLmRpc3BsYXk9XCJub25lXCIsXCJlbmFibGVkXCI9PT1zLmRhdGFzZXQuYnRuY2xvc2U/anNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbih0KXtlLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1idG4tY2xvc2VcIikuYWRkRXZlbnRMaXN0ZW5lcih0LGZ1bmN0aW9uKCl7cy5yZW1vdmVNaW5pbWl6ZWRSZXBsYWNlbWVudCgpLmNsb3NlKCl9KX0pOm8ucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWJ0bi1jbG9zZVwiKS5zdHlsZS5kaXNwbGF5PVwibm9uZVwiLGV9LHMuZHJhZ2l0PWZ1bmN0aW9uKGUpe3ZhciB0PU9iamVjdC5hc3NpZ24oe30sanNQYW5lbC5kZWZhdWx0cy5kcmFnaXQsbi5kcmFnaXQpLGE9cy5xdWVyeVNlbGVjdG9yQWxsKHQuaGFuZGxlcyk7cmV0dXJuXCJkaXNhYmxlXCI9PT1lP2EuZm9yRWFjaChmdW5jdGlvbihlKXtlLnN0eWxlLnBvaW50ZXJFdmVudHM9XCJub25lXCJ9KTphLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5zdHlsZS5wb2ludGVyRXZlbnRzPVwiYXV0b1wifSksc30scy5mcm9udD1mdW5jdGlvbihlKXt2YXIgdD0hKDE8YXJndW1lbnRzLmxlbmd0aCYmdm9pZCAwIT09YXJndW1lbnRzWzFdKXx8YXJndW1lbnRzWzFdO3JldHVybiBqc1BhbmVsLmZyb250KHMpLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoeCksZSYmZS5jYWxsKHMscyksbi5vbmZyb250ZWQmJnQmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhzLG4ub25mcm9udGVkLFwiZXZlcnlcIiksc30scy5nZXRDaGlsZHBhbmVscz1mdW5jdGlvbigpe3JldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChzLmNvbnRlbnQucXVlcnlTZWxlY3RvckFsbChcIi5qc1BhbmVsXCIpKX0scy5nZXRUaGVtZURldGFpbHM9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyAvZyxcIlwiKSxuPXtjb2xvcjohMSxjb2xvcnM6ITEsZmlsbGluZzohMSxiczohMSxic3RoZW1lOiExfTtpZihcImZpbGxlZFwiPT09dC5zdWJzdHIoLTYsNik/KG4uZmlsbGluZz1cImZpbGxlZFwiLG4uY29sb3I9dC5zdWJzdHIoMCx0Lmxlbmd0aC02KSk6XCJmaWxsZWRsaWdodFwiPT09dC5zdWJzdHIoLTExLDExKT8obi5maWxsaW5nPVwiZmlsbGVkbGlnaHRcIixuLmNvbG9yPXQuc3Vic3RyKDAsdC5sZW5ndGgtMTEpKToobi5maWxsaW5nPVwiXCIsbi5jb2xvcj10KSxuLmNvbG9ycz1qc1BhbmVsLmNhbGNDb2xvcnMobi5jb2xvciksbi5jb2xvci5tYXRjaChcIi1cIikpe3ZhciBhPW4uY29sb3Iuc3BsaXQoXCItXCIpO24uYnM9YVswXSxuLmJzdGhlbWU9YVsxXSxuLm1kYlN0eWxlPWFbMl18fHZvaWQgMH1yZXR1cm4gbn0scy5pc0NoaWxkcGFuZWw9ZnVuY3Rpb24oKXt2YXIgZT1zLmNsb3Nlc3QoXCIuanNQYW5lbC1jb250ZW50XCIpO3JldHVybiEhZSYmZS5wYXJlbnRFbGVtZW50fSxzLm1heGltaXplPWZ1bmN0aW9uKGUpe2lmKG4ub25iZWZvcmVtYXhpbWl6ZSYmMDxuLm9uYmVmb3JlbWF4aW1pemUubGVuZ3RoJiYhanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHMsbi5vbmJlZm9yZW1heGltaXplKSlyZXR1cm4gcztkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGYpO3ZhciB0PXMucGFyZW50RWxlbWVudCxhPW4ubWF4aW1pemVkTWFyZ2luO3JldHVybiB0PT09ZG9jdW1lbnQuYm9keT8ocy5zdHlsZS53aWR0aD1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgtYVsxXS1hWzNdK1wicHhcIixzLnN0eWxlLmhlaWdodD1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LWFbMF0tYVsyXStcInB4XCIscy5zdHlsZS5sZWZ0PWFbM10rXCJweFwiLHMuc3R5bGUudG9wPWFbMF0rXCJweFwiLCFuLnBvc2l0aW9uLmZpeGVkJiYocy5zdHlsZS5sZWZ0PXdpbmRvdy5wYWdlWE9mZnNldCthWzNdK1wicHhcIixzLnN0eWxlLnRvcD13aW5kb3cucGFnZVlPZmZzZXQrYVswXStcInB4XCIpKToocy5zdHlsZS53aWR0aD10LmNsaWVudFdpZHRoLWFbMV0tYVszXStcInB4XCIscy5zdHlsZS5oZWlnaHQ9dC5jbGllbnRIZWlnaHQtYVswXS1hWzJdK1wicHhcIixzLnN0eWxlLmxlZnQ9YVszXStcInB4XCIscy5zdHlsZS50b3A9YVswXStcInB4XCIpLHMuY29udGVudFJlc2l6ZSgpLHMucmVtb3ZlTWluaW1pemVkUmVwbGFjZW1lbnQoKSxzLnN0YXR1cz1cIm1heGltaXplZFwiLHMuc2V0Q29udHJvbHMoW1wiLmpzUGFuZWwtYnRuLW1heGltaXplXCIsXCIuanNQYW5lbC1idG4tc21hbGxpZnlyZXZcIl0pLGpzUGFuZWwuZnJvbnQocyksZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChnKSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGgpLG4ub25zdGF0dXNjaGFuZ2UmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhzLG4ub25zdGF0dXNjaGFuZ2UsXCJldmVyeVwiKSxlJiZlLmNhbGwocyxzKSxuLm9ubWF4aW1pemVkJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3MocyxuLm9ubWF4aW1pemVkLFwiZXZlcnlcIiksc30scy5taW5pbWl6ZT1mdW5jdGlvbihlKXtpZihcIm1pbmltaXplZFwiPT09cy5zdGF0dXMpcmV0dXJuIHM7aWYobi5vbmJlZm9yZW1pbmltaXplJiYwPG4ub25iZWZvcmVtaW5pbWl6ZS5sZW5ndGgmJiFqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3MocyxuLm9uYmVmb3JlbWluaW1pemUpKXJldHVybiBzO2lmKGRvY3VtZW50LmRpc3BhdGNoRXZlbnQodSksIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXJcIikpe3ZhciB0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7dC5pZD1cImpzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyXCIsZG9jdW1lbnQuYm9keS5hcHBlbmQodCl9aWYocy5zdHlsZS5sZWZ0PVwiLTk5OTlweFwiLHMuc3RhdHVzQmVmb3JlPXMuc3RhdHVzLHMuc3RhdHVzPVwibWluaW1pemVkXCIsZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChiKSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGgpLG4ub25zdGF0dXNjaGFuZ2UmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhzLG4ub25zdGF0dXNjaGFuZ2UsXCJldmVyeVwiKSxuLm1pbmltaXplVG8pe3ZhciBhPXMuY3JlYXRlTWluaW1pemVkUmVwbGFjZW1lbnQoKSxvPXZvaWQgMCxpPXZvaWQgMCxsPXZvaWQgMDtcImRlZmF1bHRcIj09PW4ubWluaW1pemVUbz9kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyXCIpLmFwcGVuZChhKTpcInBhcmVudHBhbmVsXCI9PT1uLm1pbmltaXplVG8/KGk9cy5jbG9zZXN0KFwiLmpzUGFuZWwtY29udGVudFwiKS5wYXJlbnRFbGVtZW50LGw9aS5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzUGFuZWwtbWluaW1pemVkLWJveFwiKSxvPWxbbC5sZW5ndGgtMV0sby5hcHBlbmQoYSkpOlwicGFyZW50XCI9PT1uLm1pbmltaXplVG8/KGk9cy5wYXJlbnRFbGVtZW50LG89aS5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtbWluaW1pemVkLWNvbnRhaW5lclwiKSwhbyYmKG89ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxvLmNsYXNzTmFtZT1cImpzUGFuZWwtbWluaW1pemVkLWNvbnRhaW5lclwiLGkuYXBwZW5kKG8pKSxvLmFwcGVuZChhKSk6ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihuLm1pbmltaXplVG8pLmFwcGVuZChhKX1yZXR1cm4gZSYmZS5jYWxsKHMscyksbi5vbm1pbmltaXplZCYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHMsbi5vbm1pbmltaXplZCxcImV2ZXJ5XCIpLHN9LHMubm9ybWFsaXplPWZ1bmN0aW9uKGUpe3JldHVyblwibm9ybWFsaXplZFwiPT09cy5zdGF0dXM/czpuLm9uYmVmb3Jlbm9ybWFsaXplJiYwPG4ub25iZWZvcmVub3JtYWxpemUubGVuZ3RoJiYhanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHMsbi5vbmJlZm9yZW5vcm1hbGl6ZSk/czooZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChwKSxzLnN0eWxlLndpZHRoPXMuY3VycmVudERhdGEud2lkdGgscy5zdHlsZS5oZWlnaHQ9cy5jdXJyZW50RGF0YS5oZWlnaHQscy5jb250ZW50UmVzaXplKCkscy5zdHlsZS5sZWZ0PXMuY3VycmVudERhdGEubGVmdCxzLnN0eWxlLnRvcD1zLmN1cnJlbnREYXRhLnRvcCxzLnJlbW92ZU1pbmltaXplZFJlcGxhY2VtZW50KCkscy5zdGF0dXM9XCJub3JtYWxpemVkXCIscy5zZXRDb250cm9scyhbXCIuanNQYW5lbC1idG4tbm9ybWFsaXplXCIsXCIuanNQYW5lbC1idG4tc21hbGxpZnlyZXZcIl0pLGpzUGFuZWwuZnJvbnQocyksZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChtKSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGgpLG4ub25zdGF0dXNjaGFuZ2UmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhzLG4ub25zdGF0dXNjaGFuZ2UsXCJldmVyeVwiKSxlJiZlLmNhbGwocyxzKSxuLm9ubm9ybWFsaXplZCYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHMsbi5vbm5vcm1hbGl6ZWQsXCJldmVyeVwiKSxzKX0scy5yZW1vdmVNaW5pbWl6ZWRSZXBsYWNlbWVudD1mdW5jdGlvbigpe3ZhciBlPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHMuaWQrXCItbWluXCIpO3JldHVybiBlJiZlLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZSksc30scy5yZXBvc2l0aW9uPWZ1bmN0aW9uKCl7Zm9yKHZhciBlPWFyZ3VtZW50cy5sZW5ndGgsdD1BcnJheShlKSxhPTA7YTxlO2ErKyl0W2FdPWFyZ3VtZW50c1thXTt2YXIgbyxpPW4ucG9zaXRpb24sbD0hMDtyZXR1cm4gdC5mb3JFYWNoKGZ1bmN0aW9uKGUpe1wic3RyaW5nXCI9PXR5cGVvZiBlfHxcIm9iamVjdFwiPT09KFwidW5kZWZpbmVkXCI9PXR5cGVvZiBlP1widW5kZWZpbmVkXCI6X3R5cGVvZihlKSk/aT1lOlwiYm9vbGVhblwiPT10eXBlb2YgZT9sPWU6XCJmdW5jdGlvblwiPT10eXBlb2YgZSYmKG89ZSl9KSxqc1BhbmVsLnBvc2l0aW9uKHMsaSksbCYmcy5zYXZlQ3VycmVudFBvc2l0aW9uKCksbyYmby5jYWxsKHMscyksc30scy5yZXBvc2l0aW9uT25TbmFwPWZ1bmN0aW9uKGUpe3ZhciB0PVwiMFwiLGE9XCIwXCIsbz1qc1BhbmVsLnBPY29udGFpbm1lbnQobi5kcmFnaXQuY29udGFpbm1lbnQpO24uZHJhZ2l0LnNuYXAuY29udGFpbm1lbnQmJihcImxlZnQtdG9wXCI9PT1lPyh0PW9bM10sYT1vWzBdKTpcInJpZ2h0LXRvcFwiPT09ZT8odD0tb1sxXSxhPW9bMF0pOlwicmlnaHQtYm90dG9tXCI9PT1lPyh0PS1vWzFdLGE9LW9bMl0pOlwibGVmdC1ib3R0b21cIj09PWU/KHQ9b1szXSxhPS1vWzJdKTpcImNlbnRlci10b3BcIj09PWU/KHQ9b1szXS8yLW9bMV0vMixhPW9bMF0pOlwiY2VudGVyLWJvdHRvbVwiPT09ZT8odD1vWzNdLzItb1sxXS8yLGE9LW9bMl0pOlwibGVmdC1jZW50ZXJcIj09PWU/KHQ9b1szXSxhPW9bMF0vMi1vWzJdLzIpOlwicmlnaHQtY2VudGVyXCI9PWUmJih0PS1vWzFdLGE9b1swXS8yLW9bMl0vMikpLGpzUGFuZWwucG9zaXRpb24ocyxlKSxqc1BhbmVsLnNldFN0eWxlKHMse2xlZnQ6XCJjYWxjKFwiK3Muc3R5bGUubGVmdCtcIiArIFwiK3QrXCJweClcIix0b3A6XCJjYWxjKFwiK3Muc3R5bGUudG9wK1wiICsgXCIrYStcInB4KVwifSl9LHMucmVzaXplPWZ1bmN0aW9uKCl7Zm9yKHZhciBlPWFyZ3VtZW50cy5sZW5ndGgsdD1BcnJheShlKSxuPTA7bjxlO24rKyl0W25dPWFyZ3VtZW50c1tuXTt2YXIgYT13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzKSxvPXt3aWR0aDphLndpZHRoLGhlaWdodDphLmhlaWdodH0saT0hMCxsPXZvaWQgMDt0LmZvckVhY2goZnVuY3Rpb24oZSl7XCJzdHJpbmdcIj09dHlwZW9mIGU/bz1lOlwib2JqZWN0XCI9PT0oXCJ1bmRlZmluZWRcIj09dHlwZW9mIGU/XCJ1bmRlZmluZWRcIjpfdHlwZW9mKGUpKT9vPU9iamVjdC5hc3NpZ24obyxlKTpcImJvb2xlYW5cIj09dHlwZW9mIGU/aT1lOlwiZnVuY3Rpb25cIj09dHlwZW9mIGUmJihsPWUpfSk7dmFyIHI9anNQYW5lbC5wT3NpemUocyxvKTtyZXR1cm4gcy5zdHlsZS53aWR0aD1yLndpZHRoLHMuc3R5bGUuaGVpZ2h0PXIuaGVpZ2h0LHMuY29udGVudFJlc2l6ZSgpLGkmJnMuc2F2ZUN1cnJlbnREaW1lbnNpb25zKCksbCYmbC5jYWxsKHMscyksc30scy5yZXNpemVpdD1mdW5jdGlvbihlKXt2YXIgdD1zLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanNQYW5lbC1yZXNpemVpdC1oYW5kbGVcIik7cmV0dXJuXCJkaXNhYmxlXCI9PT1lP3QuZm9yRWFjaChmdW5jdGlvbihlKXtlLnN0eWxlLnBvaW50ZXJFdmVudHM9XCJub25lXCJ9KTp0LmZvckVhY2goZnVuY3Rpb24oZSl7ZS5zdHlsZS5wb2ludGVyRXZlbnRzPVwiYXV0b1wifSksc30scy5zYXZlQ3VycmVudERpbWVuc2lvbnM9ZnVuY3Rpb24oKXt2YXIgZT13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzKTtzLmN1cnJlbnREYXRhLndpZHRoPWUud2lkdGgsXCJub3JtYWxpemVkXCI9PT1zLnN0YXR1cyYmKHMuY3VycmVudERhdGEuaGVpZ2h0PWUuaGVpZ2h0KX0scy5zYXZlQ3VycmVudFBvc2l0aW9uPWZ1bmN0aW9uKCl7dmFyIGU9d2luZG93LmdldENvbXB1dGVkU3R5bGUocyk7cy5jdXJyZW50RGF0YS5sZWZ0PWUubGVmdCxzLmN1cnJlbnREYXRhLnRvcD1lLnRvcH0scy5zZXRDb250cm9scz1mdW5jdGlvbihlLHQpe3JldHVybiBzLmhlYWRlci5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzUGFuZWwtYnRuXCIpLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5zdHlsZS5kaXNwbGF5PVwiYmxvY2tcIn0pLGUuZm9yRWFjaChmdW5jdGlvbihlKXt2YXIgdD1zLmNvbnRyb2xiYXIucXVlcnlTZWxlY3RvcihlKTt0JiYodC5zdHlsZS5kaXNwbGF5PVwibm9uZVwiKX0pLHQmJnQuY2FsbChzLHMpLHN9LHMuc2V0Q29udHJvbFN0YXR1cz1mdW5jdGlvbihlKXt2YXIgdD0xPGFyZ3VtZW50cy5sZW5ndGgmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06XCJlbmFibGVcIixuPWFyZ3VtZW50c1syXTtpZihcImRpc2FibGVcIj09PXQpe2lmKFwicmVtb3ZlZFwiIT09cy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWJ0blwiK2UpKXtzLnNldEF0dHJpYnV0ZShcImRhdGEtYnRuXCIrZSxcImRpc2FibGVkXCIpO3ZhciBhPXMuY29udHJvbGJhci5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtYnRuLVwiK2UpO2Euc3R5bGUucG9pbnRlckV2ZW50cz1cIm5vbmVcIixhLnN0eWxlLm9wYWNpdHk9LjQsYS5zdHlsZS5jdXJzb3I9XCJkZWZhdWx0XCJ9fWVsc2UgaWYoXCJlbmFibGVcIj09PXQpe2lmKFwicmVtb3ZlZFwiIT09cy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWJ0blwiK2UpKXtzLnNldEF0dHJpYnV0ZShcImRhdGEtYnRuXCIrZSxcImVuYWJsZWRcIik7dmFyIG89cy5jb250cm9sYmFyLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1idG4tXCIrZSk7by5zdHlsZS5wb2ludGVyRXZlbnRzPVwiYXV0b1wiLG8uc3R5bGUub3BhY2l0eT0xLG8uc3R5bGUuY3Vyc29yPVwicG9pbnRlclwifX1lbHNlIGlmKFwicmVtb3ZlXCI9PT10KXt2YXIgaT1zLmNvbnRyb2xiYXIucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWJ0bi1cIitlKTtzLmNvbnRyb2xiYXIucmVtb3ZlQ2hpbGQoaSkscy5zZXRBdHRyaWJ1dGUoXCJkYXRhLWJ0blwiK2UsXCJyZW1vdmVkXCIpfXJldHVybiBuJiZuLmNhbGwocyxzKSxzfSxzLnNldEhlYWRlckNvbnRyb2xzPWZ1bmN0aW9uKGUpe3ZhciB0PVtcImNsb3NlXCIsXCJtYXhpbWl6ZVwiLFwibm9ybWFsaXplXCIsXCJtaW5pbWl6ZVwiLFwic21hbGxpZnlcIixcInNtYWxsaWZ5cmV2XCJdLGE9bi5oZWFkZXJDb250cm9scztyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgYT9cIm5vbmVcIj09PWE/dC5mb3JFYWNoKGZ1bmN0aW9uKGUpe3Muc2V0Q29udHJvbFN0YXR1cyhlLFwicmVtb3ZlXCIpfSk6XCJjbG9zZW9ubHlcIj09PWEmJnQuZm9yRWFjaChmdW5jdGlvbihlKXtcImNsb3NlXCIhPT1lJiZzLnNldENvbnRyb2xTdGF0dXMoZSxcInJlbW92ZVwiKX0pOnQuZm9yRWFjaChmdW5jdGlvbihlKXthW2VdJiZzLnNldENvbnRyb2xTdGF0dXMoZSxhW2VdKX0pLGUmJmUuY2FsbChzLHMpLHN9LHMuc2V0SGVhZGVyTG9nbz1mdW5jdGlvbihlLHQpe2lmKFwic3RyaW5nXCIhPXR5cGVvZiBlKWpzUGFuZWwuZW1wdHlOb2RlKHMuaGVhZGVybG9nbykscy5oZWFkZXJsb2dvLmFwcGVuZChlKTtlbHNlIGlmKFwiPFwiIT09ZS5zdWJzdHIoMCwxKSl7dmFyIG49ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtuLnN0eWxlLm1heEhlaWdodD1nZXRDb21wdXRlZFN0eWxlKHMuaGVhZGVyYmFyKS5oZWlnaHQsbi5zcmM9ZSxqc1BhbmVsLmVtcHR5Tm9kZShzLmhlYWRlcmxvZ28pLHMuaGVhZGVybG9nby5hcHBlbmQobil9ZWxzZSBzLmhlYWRlcmxvZ28uaW5uZXJIVE1MPWU7cmV0dXJuIHQmJnQuY2FsbChzLHMpLHN9LHMuc2V0SGVhZGVyUmVtb3ZlPWZ1bmN0aW9uKGUpe3JldHVybiBzLnJlbW92ZUNoaWxkKHMuaGVhZGVyKSxzLmNvbnRlbnQuY2xhc3NMaXN0LmFkZChcImpzUGFuZWwtY29udGVudC1ub2hlYWRlclwiKSxbXCJjbG9zZVwiLFwibWF4aW1pemVcIixcIm5vcm1hbGl6ZVwiLFwibWluaW1pemVcIixcInNtYWxsaWZ5XCIsXCJzbWFsbGlmeXJldlwiXS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3Muc2V0QXR0cmlidXRlKFwiZGF0YS1idG5cIitlLFwicmVtb3ZlZFwiKX0pLGUmJmUuY2FsbChzLHMpLHN9LHMuc2V0SGVhZGVyVGl0bGU9ZnVuY3Rpb24oZSx0KXtyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgZT9zLmhlYWRlcnRpdGxlLmlubmVySFRNTD1lOlwiZnVuY3Rpb25cIj09dHlwZW9mIGU/KGpzUGFuZWwuZW1wdHlOb2RlKHMuaGVhZGVydGl0bGUpLHMuaGVhZGVydGl0bGUuaW5uZXJIVE1MPWUoKSk6KGpzUGFuZWwuZW1wdHlOb2RlKHMuaGVhZGVydGl0bGUpLHMuaGVhZGVydGl0bGUuYXBwZW5kKGUpKSx0JiZ0LmNhbGwocyxzKSxzfSxzLnNldEljb25mb250PWZ1bmN0aW9uKCl7dmFyIGU9ISEoMDxhcmd1bWVudHMubGVuZ3RoJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0pJiZhcmd1bWVudHNbMF0sdD0xPGFyZ3VtZW50cy5sZW5ndGgmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06cyxuPWFyZ3VtZW50c1syXTtpZighMSE9PWUpe3ZhciBhLG87aWYoXCJib290c3RyYXBcIj09PWV8fFwiZ2x5cGhpY29uXCI9PT1lKWE9W1wiZ2x5cGhpY29uIGdseXBoaWNvbi1yZW1vdmVcIixcImdseXBoaWNvbiBnbHlwaGljb24tZnVsbHNjcmVlblwiLFwiZ2x5cGhpY29uIGdseXBoaWNvbi1yZXNpemUtZnVsbFwiLFwiZ2x5cGhpY29uIGdseXBoaWNvbi1taW51c1wiLFwiZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLWRvd25cIixcImdseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi11cFwiXTtlbHNlIGlmKFwiZmFcIj09PWV8fFwiZmFyXCI9PT1lfHxcImZhbFwiPT09ZXx8XCJmYXNcIj09PWUpYT1bZStcIiBmYS13aW5kb3ctY2xvc2VcIixlK1wiIGZhLXdpbmRvdy1tYXhpbWl6ZVwiLGUrXCIgZmEtd2luZG93LXJlc3RvcmVcIixlK1wiIGZhLXdpbmRvdy1taW5pbWl6ZVwiLGUrXCIgZmEtY2hldnJvbi1kb3duXCIsZStcIiBmYS1jaGV2cm9uLXVwXCJdLHMuY29udHJvbGJhci5zdHlsZS5wYWRkaW5nPVwiNnB4IDAgM3B4IDBcIjtlbHNlIGlmKFwibWF0ZXJpYWwtaWNvbnNcIj09PWUpYT1bZSxlLGUsZSxlLGVdLG89W1wiY2xvc2VcIixcImZ1bGxzY3JlZW5cIixcImZ1bGxzY3JlZW5fZXhpdFwiLFwiY2FsbF9yZWNlaXZlZFwiLFwiZXhwYW5kX21vcmVcIixcImV4cGFuZF9sZXNzXCJdLHMuY29udHJvbGJhci5zdHlsZS5wYWRkaW5nPVwiNHB4IDAgNXB4IDBcIjtlbHNlIGlmKEFycmF5LmlzQXJyYXkoZSkpYT1bXCJjdXN0b20tY29udHJvbC1pY29uIFwiK2VbNV0sXCJjdXN0b20tY29udHJvbC1pY29uIFwiK2VbNF0sXCJjdXN0b20tY29udHJvbC1pY29uIFwiK2VbM10sXCJjdXN0b20tY29udHJvbC1pY29uIFwiK2VbMl0sXCJjdXN0b20tY29udHJvbC1pY29uIFwiK2VbMV0sXCJjdXN0b20tY29udHJvbC1pY29uIFwiK2VbMF1dO2Vsc2UgcmV0dXJuIHQ7dC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG5cIikuZm9yRWFjaChmdW5jdGlvbihlKXtqc1BhbmVsLmVtcHR5Tm9kZShlKS5pbm5lckhUTUw9XCI8c3Bhbj48L3NwYW4+XCJ9KSxBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0biA+IHNwYW5cIikpLnJldmVyc2UoKS5mb3JFYWNoKGZ1bmN0aW9uKHQsbil7dC5jbGFzc05hbWU9YVtuXSxcIm1hdGVyaWFsLWljb25zXCI9PT1lJiYodC50ZXh0Q29udGVudD1vW25dKX0pfXJldHVybiBuJiZuLmNhbGwodCx0KSx0fSxzLnNldFJ0bD1mdW5jdGlvbigpe1tzLmhlYWRlcixzLmhlYWRlcmJhcixzLnRpdGxlYmFyLHMuY29udHJvbGJhcixzLmhlYWRlcnRvb2xiYXIscy5mb290ZXJdLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5jbGFzc0xpc3QuYWRkKFwianNQYW5lbC1ydGxcIil9KSxbcy5oZWFkZXJ0aXRsZSxzLmhlYWRlcnRvb2xiYXIscy5jb250ZW50LHMuZm9vdGVyXS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UuZGlyPVwicnRsXCIsbi5ydGwubGFuZyYmKGUubGFuZz1uLnJ0bC5sYW5nKX0pfSxzLnNldFNpemU9ZnVuY3Rpb24oKXtpZihuLnBhbmVsU2l6ZSl7dmFyIGU9anNQYW5lbC5wT3NpemUocyxuLnBhbmVsU2l6ZSk7cy5zdHlsZS53aWR0aD1lLndpZHRoLHMuc3R5bGUuaGVpZ2h0PWUuaGVpZ2h0LHMuY29udGVudFJlc2l6ZSgpfWVsc2UgaWYobi5jb250ZW50U2l6ZSl7dmFyIHQ9anNQYW5lbC5wT3NpemUocyxuLmNvbnRlbnRTaXplKTtzLmNvbnRlbnQuc3R5bGUud2lkdGg9dC53aWR0aCxzLmNvbnRlbnQuc3R5bGUuaGVpZ2h0PXQuaGVpZ2h0LHMuc3R5bGUud2lkdGg9dC53aWR0aCxzLmNvbnRlbnQuc3R5bGUud2lkdGg9XCIxMDAlXCJ9cmV0dXJuIHN9LHMuc2V0VGhlbWU9ZnVuY3Rpb24oKXt2YXIgZT0wPGFyZ3VtZW50cy5sZW5ndGgmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06bi50aGVtZSx0PWFyZ3VtZW50c1sxXTtpZihzLmNsZWFyVGhlbWUoKSxcIm5vbmVcIj09PWUpcmV0dXJuIHMuc3R5bGUuYmFja2dyb3VuZENvbG9yPVwiI2ZmZlwiLHM7dmFyIGE9cy5nZXRUaGVtZURldGFpbHMoZSk7cmV0dXJuIGEuYnM/cy5hcHBseUJvb3RzdHJhcFRoZW1lKGEpOi0xPT09anNQYW5lbC50aGVtZXMuaW5kZXhPZihhLmNvbG9yKT9zLmFwcGx5QXJiaXRyYXJ5VGhlbWUoYSk6cy5hcHBseUJ1aWx0SW5UaGVtZShhKSxuLmJvcmRlcj9zLmFwcGx5VGhlbWVCb3JkZXIoYSk6KHMuc3R5bGUuYm9yZGVyV2lkdGg9XCJcIixzLnN0eWxlLmJvcmRlclN0eWxlPVwiXCIscy5zdHlsZS5ib3JkZXJDb2xvcj1cIlwiKSx0JiZ0LmNhbGwocyxzKSxzfSxzLnNtYWxsaWZ5PWZ1bmN0aW9uKGUpe2lmKFwic21hbGxpZmllZFwiPT09cy5zdGF0dXN8fFwic21hbGxpZmllZG1heFwiPT09cy5zdGF0dXMpcmV0dXJuIHM7aWYobi5vbmJlZm9yZXNtYWxsaWZ5JiYwPG4ub25iZWZvcmVzbWFsbGlmeS5sZW5ndGgmJiFqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3MocyxuLm9uYmVmb3Jlc21hbGxpZnkpKXJldHVybiBzO2RvY3VtZW50LmRpc3BhdGNoRXZlbnQoeSksXCJub3JtYWxpemVkXCI9PT1zLnN0YXR1cyYmcy5zYXZlQ3VycmVudERpbWVuc2lvbnMoKSxzLnN0eWxlLm92ZXJmbG93PVwiaGlkZGVuXCIscy5zdHlsZS5oZWlnaHQ9d2luZG93LmdldENvbXB1dGVkU3R5bGUocy5oZWFkZXJiYXIpLmhlaWdodCxcIm5vcm1hbGl6ZWRcIj09PXMuc3RhdHVzPyhzLnNldENvbnRyb2xzKFtcIi5qc1BhbmVsLWJ0bi1ub3JtYWxpemVcIixcIi5qc1BhbmVsLWJ0bi1zbWFsbGlmeVwiXSkscy5zdGF0dXM9XCJzbWFsbGlmaWVkXCIsZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCh2KSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGgpLG4ub25zdGF0dXNjaGFuZ2UmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhzLG4ub25zdGF0dXNjaGFuZ2UsXCJldmVyeVwiKSk6XCJtYXhpbWl6ZWRcIj09PXMuc3RhdHVzJiYocy5zZXRDb250cm9scyhbXCIuanNQYW5lbC1idG4tbWF4aW1pemVcIixcIi5qc1BhbmVsLWJ0bi1zbWFsbGlmeVwiXSkscy5zdGF0dXM9XCJzbWFsbGlmaWVkbWF4XCIsZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCh6KSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGgpLG4ub25zdGF0dXNjaGFuZ2UmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhzLG4ub25zdGF0dXNjaGFuZ2UsXCJldmVyeVwiKSk7dmFyIHQ9cy5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzUGFuZWwtbWluaW1pemVkLWJveFwiKTtyZXR1cm4gdFt0Lmxlbmd0aC0xXS5zdHlsZS5kaXNwbGF5PVwibm9uZVwiLGUmJmUuY2FsbChzLHMpLG4ub25zbWFsbGlmaWVkJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3MocyxuLm9uc21hbGxpZmllZCxcImV2ZXJ5XCIpLHN9LHMudW5zbWFsbGlmeT1mdW5jdGlvbihlKXtpZihcInNtYWxsaWZpZWRcIj09PXMuc3RhdHVzfHxcInNtYWxsaWZpZWRtYXhcIj09PXMuc3RhdHVzKXtpZihuLm9uYmVmb3JldW5zbWFsbGlmeSYmMDxuLm9uYmVmb3JldW5zbWFsbGlmeS5sZW5ndGgmJiFqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3MocyxuLm9uYmVmb3JldW5zbWFsbGlmeSkpcmV0dXJuIHM7ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCh3KSxzLnN0eWxlLm92ZXJmbG93PVwidmlzaWJsZVwiLGpzUGFuZWwuZnJvbnQocyksXCJzbWFsbGlmaWVkXCI9PT1zLnN0YXR1cz8ocy5zdHlsZS5oZWlnaHQ9cy5jdXJyZW50RGF0YS5oZWlnaHQscy5zZXRDb250cm9scyhbXCIuanNQYW5lbC1idG4tbm9ybWFsaXplXCIsXCIuanNQYW5lbC1idG4tc21hbGxpZnlyZXZcIl0pLHMuY29udGVudFJlc2l6ZSgpLHMuc3RhdHVzPVwibm9ybWFsaXplZFwiLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobSksZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChoKSxuLm9uc3RhdHVzY2hhbmdlJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3MocyxuLm9uc3RhdHVzY2hhbmdlLFwiZXZlcnlcIikpOlwic21hbGxpZmllZG1heFwiPT09cy5zdGF0dXM/cy5tYXhpbWl6ZSgpOlwibWluaW1pemVkXCI9PT1zLnN0YXR1cyYmcy5ub3JtYWxpemUoKTt2YXIgdD1zLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanNQYW5lbC1taW5pbWl6ZWQtYm94XCIpO3RbdC5sZW5ndGgtMV0uc3R5bGUuZGlzcGxheT1cImZsZXhcIixlJiZlLmNhbGwocyxzKSxuLm9udW5zbWFsbGlmaWVkJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3MocyxuLm9udW5zbWFsbGlmaWVkLFwiZXZlcnlcIil9cmV0dXJuIHN9LHMuaWQ9bi5pZCxzLmNsYXNzTGlzdC5hZGQoXCJqc1BhbmVsLVwiK24ucGFuZWx0eXBlKSxcInN0YW5kYXJkXCI9PT1uLnBhbmVsdHlwZSYmKHMuc3R5bGUuekluZGV4PXRoaXMuemkubmV4dCgpKSxsLmFwcGVuZChzKSxzLmZyb250KCExLCExKSxzLnNldFRoZW1lKG4udGhlbWUpLG4uYm94U2hhZG93JiZzLmNsYXNzTGlzdC5hZGQoXCJqc1BhbmVsLWRlcHRoLVwiK24uYm94U2hhZG93KSwhbi5oZWFkZXIpcy5zZXRIZWFkZXJSZW1vdmUoKTtlbHNlIGlmKG4uaGVhZGVyTG9nbyYmcy5zZXRIZWFkZXJMb2dvKG4uaGVhZGVyTG9nbykscy5zZXRJY29uZm9udChuLmljb25mb250KSxzLnNldEhlYWRlclRpdGxlKG4uaGVhZGVyVGl0bGUpLHMuc2V0SGVhZGVyQ29udHJvbHMoKSxcImF1dG8tc2hvdy1oaWRlXCI9PT1uLmhlYWRlcil7dmFyIHEsQT1uLnRoZW1lLnNwbGl0KFwiLVwiKSxXPVwianNQYW5lbC1kZXB0aC1cIituLmJveFNoYWRvdyxSPVwiYmctXCI7QVsxXSYmKFIrPUFbMV0pLEFbMl0mJihxPUFbMV0rXCItY29sb3ItXCIrQVsyXSkscy5oZWFkZXIuc3R5bGUub3BhY2l0eT0wLChcImJvb3RzdHJhcFwiPT09QVswXXx8XCJtZGJcIj09PUFbMF0pJiYodGhpcy5yZW1DbGFzcyhzLFIpLFwibWRiXCI9PT1BWzBdJiZ0aGlzLnJlbUNsYXNzKHMscSkpLHMuc3R5bGUuYmFja2dyb3VuZENvbG9yPVwidHJhbnNwYXJlbnRcIix0aGlzLnJlbUNsYXNzKHMsVyksdGhpcy5zZXRDbGFzcyhzLmNvbnRlbnQsVykscy5oZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIixmdW5jdGlvbigpe3MuaGVhZGVyLnN0eWxlLm9wYWNpdHk9MSwoXCJib290c3RyYXBcIj09PUFbMF18fFwibWRiXCI9PT1BWzBdKSYmKGpzUGFuZWwuc2V0Q2xhc3MocyxSKSxcIm1kYlwiPT09QVswXSYmanNQYW5lbC5zZXRDbGFzcyhzLHEpKSxqc1BhbmVsLnNldENsYXNzKHMsVyksanNQYW5lbC5yZW1DbGFzcyhzLmNvbnRlbnQsVyl9KSxzLmhlYWRlci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLGZ1bmN0aW9uKCl7cy5oZWFkZXIuc3R5bGUub3BhY2l0eT0wLChcImJvb3RzdHJhcFwiPT09QVswXXx8XCJtZGJcIj09PUFbMF0pJiYoanNQYW5lbC5yZW1DbGFzcyhzLFIpLFwibWRiXCI9PT1BWzBdJiZqc1BhbmVsLnJlbUNsYXNzKHMscSkpLGpzUGFuZWwucmVtQ2xhc3MocyxXKSxqc1BhbmVsLnNldENsYXNzKHMuY29udGVudCxXKX0pfWlmKG4uaGVhZGVyVG9vbGJhciYmcy5hZGRUb29sYmFyKHMuaGVhZGVydG9vbGJhcixuLmhlYWRlclRvb2xiYXIpLG4uZm9vdGVyVG9vbGJhciYmcy5hZGRUb29sYmFyKHMuZm9vdGVyLG4uZm9vdGVyVG9vbGJhciksbi5jb250ZW50JiYoXCJmdW5jdGlvblwiPT10eXBlb2Ygbi5jb250ZW50P24uY29udGVudC5jYWxsKHMscyk6XCJzdHJpbmdcIj09dHlwZW9mIG4uY29udGVudD9zLmNvbnRlbnQuaW5uZXJIVE1MPW4uY29udGVudDpzLmNvbnRlbnQuYXBwZW5kKG4uY29udGVudCkpLG4uY29udGVudEFqYXgmJnRoaXMuYWpheChzLG4uY29udGVudEFqYXgpLG4uY29udGVudEZldGNoJiZ0aGlzLmZldGNoKHMpLG4uY29udGVudE92ZXJmbG93KXt2YXIgQj1uLmNvbnRlbnRPdmVyZmxvdy5zcGxpdChcIiBcIik7MT09PUIubGVuZ3RoP3MuY29udGVudC5zdHlsZS5vdmVyZmxvdz1CWzBdOjI9PT1CLmxlbmd0aCYmKHMuY29udGVudC5zdHlsZS5vdmVyZmxvd1g9QlswXSxzLmNvbnRlbnQuc3R5bGUub3ZlcmZsb3dZPUJbMV0pfWlmKG4ucnRsJiZzLnNldFJ0bCgpLHMuc2V0U2l6ZSgpLHMuc3RhdHVzPVwibm9ybWFsaXplZFwiLG4ucG9zaXRpb258fFwiY3Vyc29yXCIhPT1uLnBvc2l0aW9uP3RoaXMucG9zaXRpb24ocyxuLnBvc2l0aW9uKTpzLnN0eWxlLm9wYWNpdHk9MSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG0pLHMuY2FsY1NpemVGYWN0b3JzKCksbi5hbmltYXRlSW4mJihzLmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25lbmRcIixmdW5jdGlvbigpe2UucmVtQ2xhc3MocyxuLmFuaW1hdGVJbil9KSx0aGlzLnNldENsYXNzKHMsbi5hbmltYXRlSW4pKSxuLnN5bmNNYXJnaW5zKXt2YXIgSD10aGlzLnBPY29udGFpbm1lbnQobi5tYXhpbWl6ZWRNYXJnaW4pO24uZHJhZ2l0JiYobi5kcmFnaXQuY29udGFpbm1lbnQ9SCxuLmRyYWdpdC5zbmFwJiYobi5kcmFnaXQuc25hcC5jb250YWlubWVudD0hMCkpLG4ucmVzaXplaXQmJihuLnJlc2l6ZWl0LmNvbnRhaW5tZW50PUgpfWlmKG4uZHJhZ2l0Pyh0aGlzLmRyYWdpdChzLG4uZHJhZ2l0KSxkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwianNwYW5lbGRyYWdzdG9wXCIsZnVuY3Rpb24odCl7dC5kZXRhaWw9PT1zLmlkJiZzLmNhbGNTaXplRmFjdG9ycygpfSwhMSkpOnMudGl0bGViYXIuc3R5bGUuY3Vyc29yPVwiZGVmYXVsdFwiLG4ucmVzaXplaXQpe3RoaXMucmVzaXplaXQocyxuLnJlc2l6ZWl0KTt2YXIgTTtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwianNwYW5lbHJlc2l6ZXN0YXJ0XCIsZnVuY3Rpb24odCl7dC5kZXRhaWw9PT1zLmlkJiYoTT1zLnN0YXR1cyl9LCExKSxkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwianNwYW5lbHJlc2l6ZXN0b3BcIixmdW5jdGlvbih0KXt0LmRldGFpbD09PXMuaWQmJihcInNtYWxsaWZpZWRcIj09PU18fFwic21hbGxpZmllZG1heFwiPT09TXx8XCJtYXhpbWl6ZWRcIj09PU0pJiZwYXJzZUZsb2F0KHMuc3R5bGUuaGVpZ2h0KT5wYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHMuaGVhZGVyKS5oZWlnaHQpJiYocy5zZXRDb250cm9scyhbXCIuanNQYW5lbC1idG4tbm9ybWFsaXplXCIsXCIuanNQYW5lbC1idG4tc21hbGxpZnlyZXZcIl0pLHMuc3RhdHVzPVwibm9ybWFsaXplZFwiLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobSksZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChoKSxuLm9uc3RhdHVzY2hhbmdlJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3MocyxuLm9uc3RhdHVzY2hhbmdlLFwiZXZlcnlcIikscy5jYWxjU2l6ZUZhY3RvcnMoKSl9LCExKX1pZihzLnNhdmVDdXJyZW50RGltZW5zaW9ucygpLHMuc2F2ZUN1cnJlbnRQb3NpdGlvbigpLG4uc2V0U3RhdHVzKXt2YXIgTz1uLnNldFN0YXR1cztpZihcInNtYWxsaWZpZWRtYXhcIj09PU8pcy5tYXhpbWl6ZSgpLnNtYWxsaWZ5KCk7ZWxzZSBpZihcInNtYWxsaWZpZWRcIj09PU8pcy5zbWFsbGlmeSgpO2Vsc2V7dmFyIEQ9Ty5zdWJzdHIoMCxPLmxlbmd0aC0xKTtzW0RdKCl9fXJldHVybiBuLmF1dG9jbG9zZSYmKGE9d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXtzJiZzLmNsb3NlKCl9LG4uYXV0b2Nsb3NlKSksdGhpcy5wb2ludGVyZG93bi5mb3JFYWNoKGZ1bmN0aW9uKGUpe3MuYWRkRXZlbnRMaXN0ZW5lcihlLGZ1bmN0aW9uKHQpe3QudGFyZ2V0LmNsb3Nlc3QoXCIuanNQYW5lbC1idG4tY2xvc2VcIil8fHQudGFyZ2V0LmNsb3Nlc3QoXCIuanNQYW5lbC1idG4tbWluaW1pemVcIil8fFwic3RhbmRhcmRcIiE9PW4ucGFuZWx0eXBlfHxzLmZyb250KCl9LCExKX0pLG4ub253aW5kb3dyZXNpemUmJndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsZnVuY3Rpb24odCl7aWYodC50YXJnZXQ9PT13aW5kb3cpe3ZhciBlPW4ub253aW5kb3dyZXNpemUsYT1zLnN0YXR1cyxvPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHMucGFyZW50RWxlbWVudCk7XCJtYXhpbWl6ZWRcIj09PWEmJiEwPT09ZT9zLm1heGltaXplKCk6KFwibm9ybWFsaXplZFwiPT09YXx8XCJzbWFsbGlmaWVkXCI9PT1hfHxcIm1heGltaXplZFwiPT09YSkmJihcImZ1bmN0aW9uXCI9PXR5cGVvZiBlP2UuY2FsbChzLHQscyk6KHMuc3R5bGUubGVmdD1mdW5jdGlvbigpe3ZhciBlO3JldHVybiBlPW4uY29udGFpbmVyPT09ZG9jdW1lbnQuYm9keT8oZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aC1wYXJzZUZsb2F0KHMuc3R5bGUud2lkdGgpKSpzLmhmOihwYXJzZUZsb2F0KG8ud2lkdGgpLXBhcnNlRmxvYXQocy5zdHlsZS53aWR0aCkpKnMuaGYsMD49ZT8wOmUrXCJweFwifSgpLHMuc3R5bGUudG9wPWZ1bmN0aW9uKCl7dmFyIGU7cmV0dXJuIGU9bi5jb250YWluZXI9PT1kb2N1bWVudC5ib2R5Pyh3aW5kb3cuaW5uZXJIZWlnaHQtcGFyc2VGbG9hdChzLmN1cnJlbnREYXRhLmhlaWdodCkpKnMudmY6KHBhcnNlRmxvYXQoby5oZWlnaHQpLXBhcnNlRmxvYXQocy5jdXJyZW50RGF0YS5oZWlnaHQpKSpzLnZmLDA+PWU/MDplK1wicHhcIn0oKSkpfX0sITEpLHRoaXMucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24oZSl7cy5hZGRFdmVudExpc3RlbmVyKGUsZnVuY3Rpb24oKXtzLmNvbnRlbnQuc3R5bGUucG9pbnRlckV2ZW50cz1cImluaGVyaXRcIn0pfSksdGhpcy5nbG9iYWxDYWxsYmFja3MmJihBcnJheS5pc0FycmF5KHRoaXMuZ2xvYmFsQ2FsbGJhY2tzKT90aGlzLmdsb2JhbENhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UuY2FsbChzLHMpfSk6dGhpcy5nbG9iYWxDYWxsYmFja3MuY2FsbChzLHMpKSxuLmNhbGxiYWNrJiYoQXJyYXkuaXNBcnJheShuLmNhbGxiYWNrKT9uLmNhbGxiYWNrLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5jYWxsKHMscyl9KTpuLmNhbGxiYWNrLmNhbGwocyxzKSksdCYmdC5jYWxsKHMscyksZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChyKSxzfX07IiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRUYXJnZXQgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG59O1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgcGFzc2luZyBmdW5jdGlvbiBpbiBvcHRpb25zLCB0aGVuIHVzZSBpdCBmb3IgcmVzb2x2ZSBcImhlYWRcIiBlbGVtZW50LlxuICAgICAgICAgICAgICAgIC8vIFVzZWZ1bCBmb3IgU2hhZG93IFJvb3Qgc3R5bGUgaS5lXG4gICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgIC8vICAgaW5zZXJ0SW50bzogZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb29cIikuc2hhZG93Um9vdCB9XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBnZXRUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xuXHRcdFx0Ly8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblx0XHRcdGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bdGFyZ2V0XVxuXHR9O1xufSkoKTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSBcImJvb2xlYW5cIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcbiAgICAgICAgaWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8gKyBcIiBcIiArIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0aWYob3B0aW9ucy5hdHRycy50eXBlID09PSB1bmRlZmluZWQpIHtcblx0XHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdH1cblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZSwgdXBkYXRlLCByZW1vdmUsIHJlc3VsdDtcblxuXHQvLyBJZiBhIHRyYW5zZm9ybSBmdW5jdGlvbiB3YXMgZGVmaW5lZCwgcnVuIGl0IG9uIHRoZSBjc3Ncblx0aWYgKG9wdGlvbnMudHJhbnNmb3JtICYmIG9iai5jc3MpIHtcblx0ICAgIHJlc3VsdCA9IG9wdGlvbnMudHJhbnNmb3JtKG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC98XFxzKiQpL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG4iLCJpbXBvcnQgeyBCdXR0cGx1Z0RldmljZSwgU2luZ2xlTW90b3JWaWJyYXRlQ21kLCBGbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZCB9IGZyb20gXCIuLi9pbmRleFwiO1xuaW1wb3J0ICogYXMgTWVzc2FnZXMgZnJvbSBcIi4uL2luZGV4XCI7XG5cbmV4cG9ydCBjbGFzcyBUZXN0RGV2aWNlIGV4dGVuZHMgQnV0dHBsdWdEZXZpY2Uge1xuXG4gIHByaXZhdGUgX2Nvbm5lY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9saW5lYXJTcGVlZDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfbGluZWFyUG9zaXRpb246IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX3ZpYnJhdGVTcGVlZDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfcm90YXRlU3BlZWQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX3JvdGF0ZUNsb2Nrd2lzZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICBzaG91bGRWaWJyYXRlOiBib29sZWFuID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICBzaG91bGRMaW5lYXI6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgIHNob3VsZFJvdGF0ZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgc3VwZXIoYFRlc3QgRGV2aWNlIC0gJHtuYW1lfWAsIFwiVGVzdERldmljZVwiICsgKHNob3VsZFZpYnJhdGUgPyBcIlZpYnJhdGVcIiA6IFwiXCIpICsgKHNob3VsZExpbmVhciA/IFwiTGluZWFyXCIgOiBcIlwiKSk7XG4gICAgdGhpcy5Nc2dGdW5jcy5zZXQoTWVzc2FnZXMuU3RvcERldmljZUNtZC5uYW1lLCB0aGlzLkhhbmRsZVN0b3BEZXZpY2VDbWQpO1xuICAgIGlmIChzaG91bGRWaWJyYXRlKSB7XG4gICAgICB0aGlzLk1zZ0Z1bmNzLnNldChNZXNzYWdlcy5TaW5nbGVNb3RvclZpYnJhdGVDbWQubmFtZSwgdGhpcy5IYW5kbGVTaW5nbGVNb3RvclZpYnJhdGVDbWQpO1xuICAgICAgdGhpcy5Nc2dGdW5jcy5zZXQoTWVzc2FnZXMuVmlicmF0ZUNtZC5uYW1lLCB0aGlzLkhhbmRsZVZpYnJhdGVDbWQpO1xuICAgIH1cbiAgICBpZiAoc2hvdWxkTGluZWFyKSB7XG4gICAgICB0aGlzLk1zZ0Z1bmNzLnNldChNZXNzYWdlcy5GbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZC5uYW1lLCB0aGlzLkhhbmRsZUZsZXNobGlnaHRMYXVuY2hGVzEyQ21kKTtcbiAgICAgIHRoaXMuTXNnRnVuY3Muc2V0KE1lc3NhZ2VzLkxpbmVhckNtZC5uYW1lLCB0aGlzLkhhbmRsZUxpbmVhckNtZCk7XG4gICAgfVxuICAgIGlmIChzaG91bGRSb3RhdGUpIHtcbiAgICAgIHRoaXMuTXNnRnVuY3Muc2V0KE1lc3NhZ2VzLlJvdGF0ZUNtZC5uYW1lLCB0aGlzLkhhbmRsZVJvdGF0ZUNtZCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBDb25uZWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Nvbm5lY3RlZDtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgQ29ubmVjdGVkKGNvbm5lY3RlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX2Nvbm5lY3RlZCA9IGNvbm5lY3RlZDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTWVzc2FnZVNwZWNpZmljYXRpb25zKCk6IG9iamVjdCB7XG4gICAgaWYgKHRoaXMuTXNnRnVuY3MuaGFzKE1lc3NhZ2VzLlZpYnJhdGVDbWQubmFtZSkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIFZpYnJhdGVDbWQ6IHsgRmVhdHVyZUNvdW50OiAyIH0sXG4gICAgICAgIFNpbmdsZU1vdG9yVmlicmF0ZUNtZDoge30sXG4gICAgICAgIFN0b3BEZXZpY2VDbWQ6IHt9LFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuTXNnRnVuY3MuaGFzKE1lc3NhZ2VzLkxpbmVhckNtZC5uYW1lKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgTGluZWFyQ21kOiB7IEZlYXR1cmVDb3VudDogMSB9LFxuICAgICAgICBGbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZDoge30sXG4gICAgICAgIFN0b3BEZXZpY2VDbWQ6IHt9LFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuTXNnRnVuY3MuaGFzKE1lc3NhZ2VzLlJvdGF0ZUNtZC5uYW1lKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgUm90YXRlQ21kOiB7IEZlYXR1cmVDb3VudDogMSB9LFxuICAgICAgICBTdG9wRGV2aWNlQ21kOiB7fSxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIHB1YmxpYyBEaXNjb25uZWN0KCkge1xuICAgIHRoaXMuX2Nvbm5lY3RlZCA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdChcImRldmljZXJlbW92ZWRcIiwgdGhpcyk7XG4gIH1cblxuICBwcml2YXRlIEhhbmRsZVN0b3BEZXZpY2VDbWQgPSBhc3luYyAoYU1zZzogTWVzc2FnZXMuU3RvcERldmljZUNtZCk6IFByb21pc2U8TWVzc2FnZXMuQnV0dHBsdWdNZXNzYWdlPiA9PiB7XG4gICAgaWYgKHRoaXMuTXNnRnVuY3MuaGFzKE1lc3NhZ2VzLlZpYnJhdGVDbWQubmFtZSkpIHtcbiAgICAgIHRoaXMuZW1pdChcInZpYnJhdGVcIiwgMCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLk1zZ0Z1bmNzLmhhcyhNZXNzYWdlcy5MaW5lYXJDbWQubmFtZSkpIHtcbiAgICAgIHRoaXMuZW1pdChcImxpbmVhclwiLCB7IHBvc2l0aW9uOiB0aGlzLl9saW5lYXJQb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogdGhpcy5fbGluZWFyU3BlZWR9KTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgTWVzc2FnZXMuT2soYU1zZy5JZCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBIYW5kbGVTaW5nbGVNb3RvclZpYnJhdGVDbWQgPVxuICAgIGFzeW5jIChhTXNnOiBNZXNzYWdlcy5TaW5nbGVNb3RvclZpYnJhdGVDbWQpOiBQcm9taXNlPE1lc3NhZ2VzLkJ1dHRwbHVnTWVzc2FnZT4gPT4ge1xuICAgICAgdGhpcy5fdmlicmF0ZVNwZWVkID0gYU1zZy5TcGVlZDtcbiAgICAgIHRoaXMuZW1pdChcInZpYnJhdGVcIiwgYU1zZy5TcGVlZCk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBNZXNzYWdlcy5PayhhTXNnLklkKSk7XG4gICAgfVxuXG4gIHByaXZhdGUgSGFuZGxlVmlicmF0ZUNtZCA9XG4gICAgYXN5bmMgKGFNc2c6IE1lc3NhZ2VzLlZpYnJhdGVDbWQpOiBQcm9taXNlPE1lc3NhZ2VzLkJ1dHRwbHVnTWVzc2FnZT4gPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuSGFuZGxlU2luZ2xlTW90b3JWaWJyYXRlQ21kKG5ldyBTaW5nbGVNb3RvclZpYnJhdGVDbWQoYU1zZy5TcGVlZHNbMF0uU3BlZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhTXNnLkRldmljZUluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYU1zZy5JZCkpO1xuICAgIH1cblxuICBwcml2YXRlIEhhbmRsZVJvdGF0ZUNtZCA9XG4gICAgYXN5bmMgKGFNc2c6IE1lc3NhZ2VzLlJvdGF0ZUNtZCk6IFByb21pc2U8TWVzc2FnZXMuQnV0dHBsdWdNZXNzYWdlPiA9PiB7XG4gICAgICB0aGlzLl9yb3RhdGVTcGVlZCA9IGFNc2cuUm90YXRpb25zWzBdLlNwZWVkO1xuICAgICAgdGhpcy5fcm90YXRlQ2xvY2t3aXNlID0gYU1zZy5Sb3RhdGlvbnNbMF0uQ2xvY2t3aXNlO1xuICAgICAgdGhpcy5lbWl0KFwidmlicmF0ZVwiLCB7IHNwZWVkOiB0aGlzLl9yb3RhdGVTcGVlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvY2t3aXNlOiB0aGlzLl9yb3RhdGVDbG9ja3dpc2UgfSk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBNZXNzYWdlcy5PayhhTXNnLklkKSk7XG4gICAgfVxuXG4gIHByaXZhdGUgSGFuZGxlRmxlc2hsaWdodExhdW5jaEZXMTJDbWQgPVxuICAgIGFzeW5jIChhTXNnOiBNZXNzYWdlcy5GbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZCk6IFByb21pc2U8TWVzc2FnZXMuQnV0dHBsdWdNZXNzYWdlPiA9PiB7XG4gICAgICB0aGlzLl9saW5lYXJQb3NpdGlvbiA9IGFNc2cuUG9zaXRpb247XG4gICAgICB0aGlzLl9saW5lYXJTcGVlZCA9IGFNc2cuU3BlZWQ7XG4gICAgICB0aGlzLmVtaXQoXCJsaW5lYXJcIiwgeyBwb3NpdGlvbjogdGhpcy5fbGluZWFyUG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IHRoaXMuX2xpbmVhclNwZWVkIH0pO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgTWVzc2FnZXMuT2soYU1zZy5JZCkpO1xuICAgIH1cblxuICBwcml2YXRlIEhhbmRsZUxpbmVhckNtZCA9XG4gICAgYXN5bmMgKGFNc2c6IE1lc3NhZ2VzLkxpbmVhckNtZCk6IFByb21pc2U8TWVzc2FnZXMuQnV0dHBsdWdNZXNzYWdlPiA9PiB7XG4gICAgICBpZiAoYU1zZy5WZWN0b3JzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2VzLkVycm9yKFwiTGluZWFyQ21kIHJlcXVpcmVzIDEgdmVjdG9yIGZvciB0aGlzIGRldmljZS5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNZXNzYWdlcy5FcnJvckNsYXNzLkVSUk9SX0RFVklDRSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhTXNnLklkKTtcbiAgICAgIH1cbiAgICAgIC8vIE1vdmUgYmV0d2VlbiA1Lzk1LCBvdGhlcndpc2Ugd2UnbGwgYWxsb3cgdGhlIGRldmljZSB0byBzbWFjayBpbnRvIGhhcmRcbiAgICAgIC8vIHN0b3BzIGJlY2F1c2Ugb2YgYnJhaW5kZWFkIGZpcm13YXJlLlxuICAgICAgY29uc3QgcmFuZ2U6IG51bWJlciA9IDkwO1xuICAgICAgY29uc3QgdmVjdG9yID0gYU1zZy5WZWN0b3JzWzBdO1xuICAgICAgY29uc3QgY3VycmVudFBvc2l0aW9uID0gdmVjdG9yLlBvc2l0aW9uICogMTAwO1xuICAgICAgY29uc3QgcG9zaXRpb25EZWx0YTogbnVtYmVyID0gTWF0aC5hYnMoY3VycmVudFBvc2l0aW9uIC0gdGhpcy5fbGluZWFyUG9zaXRpb24pO1xuICAgICAgbGV0IHNwZWVkOiBudW1iZXIgPSBNYXRoLmZsb29yKDI1MDAwICogTWF0aC5wb3coKCh2ZWN0b3IuRHVyYXRpb24gKiA5MCkgLyBwb3NpdGlvbkRlbHRhKSwgLTEuMDUpKTtcblxuICAgICAgLy8gQ2xhbXAgc3BlZWQgb24gMCA8PSB4IDw9IDk1IHNvIHdlIGRvbid0IGJyZWFrIHRoZSBsYXVuY2guXG4gICAgICBzcGVlZCA9IE1hdGgubWluKE1hdGgubWF4KHNwZWVkLCAwKSwgOTUpO1xuXG4gICAgICBjb25zdCBwb3NpdGlvbkdvYWwgPSBNYXRoLmZsb29yKCgoY3VycmVudFBvc2l0aW9uIC8gOTkpICogcmFuZ2UpICsgKCg5OSAtIHJhbmdlKSAvIDIpKTtcbiAgICAgIC8vIFdlJ2xsIHNldCB0aGlzLl9sYXN0UG9zaXRpb24gaW4gRmxlc2hsaWdodExhdW5jaEZXMTJDbWQsIHNpbmNlXG4gICAgICAvLyBldmVyeXRoaW5nIGtpbmRhIGZ1bm5lbHMgdG8gdGhhdC5cbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLkhhbmRsZUZsZXNobGlnaHRMYXVuY2hGVzEyQ21kKG5ldyBNZXNzYWdlcy5GbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZChzcGVlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbkdvYWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYU1zZy5EZXZpY2VJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhTXNnLklkKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcImV2ZW50c1wiO1xuaW1wb3J0IHsgSURldmljZVN1YnR5cGVNYW5hZ2VyIH0gZnJvbSBcIi4uL2luZGV4XCI7XG5pbXBvcnQgeyBUZXN0RGV2aWNlIH0gZnJvbSBcIi4vVGVzdERldmljZVwiO1xuaW1wb3J0IHsgQnV0dHBsdWdMb2dnZXIgfSBmcm9tIFwiLi4vaW5kZXhcIjtcblxuZXhwb3J0IGNsYXNzIFRlc3REZXZpY2VNYW5hZ2VyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIGltcGxlbWVudHMgSURldmljZVN1YnR5cGVNYW5hZ2VyIHtcblxuICBwcml2YXRlIF9pc1NjYW5uaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgX3Rlc3RWaWJyYXRpb25EZXZpY2UgPSBuZXcgVGVzdERldmljZShcIlRlc3QgVmlicmF0aW9uIERldmljZVwiLCB0cnVlLCBmYWxzZSwgZmFsc2UpO1xuICBwcml2YXRlIF90ZXN0TGluZWFyRGV2aWNlID0gbmV3IFRlc3REZXZpY2UoXCJUZXN0IExpbmVhciBEZXZpY2VcIiwgZmFsc2UsIHRydWUsIGZhbHNlKTtcbiAgcHJpdmF0ZSBfdGVzdFJvdGF0aW9uRGV2aWNlID0gbmV3IFRlc3REZXZpY2UoXCJUZXN0IFJvdGF0aW9uIERldmljZVwiLCBmYWxzZSwgZmFsc2UsIHRydWUpO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHVibGljIENvbm5lY3RWaWJyYXRpb25EZXZpY2UoKSB7XG4gICAgQnV0dHBsdWdMb2dnZXIuTG9nZ2VyLkRlYnVnKFwiVGVzdERldmljZU1hbmFnZXI6IENvbm5lY3RpbmcgVmlicmF0aW9uIERldmljZVwiKTtcbiAgICB0aGlzLl90ZXN0VmlicmF0aW9uRGV2aWNlLkNvbm5lY3RlZCA9IHRydWU7XG4gICAgdGhpcy5lbWl0KFwiZGV2aWNlYWRkZWRcIiwgdGhpcy5fdGVzdFZpYnJhdGlvbkRldmljZSk7XG4gIH1cblxuICBwdWJsaWMgQ29ubmVjdExpbmVhckRldmljZSgpIHtcbiAgICBCdXR0cGx1Z0xvZ2dlci5Mb2dnZXIuRGVidWcoXCJUZXN0RGV2aWNlTWFuYWdlcjogQ29ubmVjdGluZyBMaW5lYXIgRGV2aWNlXCIpO1xuICAgIHRoaXMuX3Rlc3RMaW5lYXJEZXZpY2UuQ29ubmVjdGVkID0gdHJ1ZTtcbiAgICB0aGlzLmVtaXQoXCJkZXZpY2VhZGRlZFwiLCB0aGlzLl90ZXN0TGluZWFyRGV2aWNlKTtcbiAgfVxuXG4gIHB1YmxpYyBDb25uZWN0Um90YXRpb25EZXZpY2UoKSB7XG4gICAgQnV0dHBsdWdMb2dnZXIuTG9nZ2VyLkRlYnVnKFwiVGVzdERldmljZU1hbmFnZXI6IENvbm5lY3RpbmcgUm90YXRpb24gRGV2aWNlXCIpO1xuICAgIHRoaXMuX3Rlc3RSb3RhdGlvbkRldmljZS5Db25uZWN0ZWQgPSB0cnVlO1xuICAgIHRoaXMuZW1pdChcImRldmljZWFkZGVkXCIsIHRoaXMuX3Rlc3RSb3RhdGlvbkRldmljZSk7XG4gIH1cblxuICBwdWJsaWMgU3RhcnRTY2FubmluZygpOiB2b2lkIHtcbiAgICBCdXR0cGx1Z0xvZ2dlci5Mb2dnZXIuRGVidWcoXCJUZXN0RGV2aWNlTWFuYWdlcjogU3RhcnRpbmcgU2NhblwiKTtcbiAgICB0aGlzLl9pc1NjYW5uaW5nID0gdHJ1ZTtcbiAgICAvLyBBbHdheXMgZW1pdCBkZXZpY2VzLiBJZiB0aGV5J3JlIGR1cGxpY2F0ZXMsIHRoZSBkZXZpY2UgbWFuYWdlciB3aWxsIHdlZWRcbiAgICAvLyB0aGVtIG91dC5cbiAgICBzZXRUaW1lb3V0KCgpID0+ICB7XG4gICAgICB0aGlzLkNvbm5lY3RWaWJyYXRpb25EZXZpY2UoKTtcbiAgICAgIHRoaXMuQ29ubmVjdExpbmVhckRldmljZSgpO1xuICAgICAgdGhpcy5Db25uZWN0Um90YXRpb25EZXZpY2UoKTtcbiAgICB9LCA1MCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLlN0b3BTY2FubmluZygpLCAxMDApO1xuICB9XG5cbiAgcHVibGljIGdldCBWaWJyYXRpb25EZXZpY2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Rlc3RWaWJyYXRpb25EZXZpY2U7XG4gIH1cblxuICBwdWJsaWMgZ2V0IExpbmVhckRldmljZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdGVzdExpbmVhckRldmljZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgUm90YXRpb25EZXZpY2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Rlc3RSb3RhdGlvbkRldmljZTtcbiAgfVxuXG4gIHB1YmxpYyBTdG9wU2Nhbm5pbmcoKTogdm9pZCB7XG4gICAgQnV0dHBsdWdMb2dnZXIuTG9nZ2VyLkRlYnVnKFwiVGVzdERldmljZU1hbmFnZXI6IFN0b3BwaW5nIFNjYW5cIik7XG4gICAgdGhpcy5faXNTY2FubmluZyA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdChcInNjYW5uaW5nZmluaXNoZWRcIik7XG4gIH1cblxuICBwdWJsaWMgZ2V0IElzU2Nhbm5pbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzU2Nhbm5pbmc7XG4gIH1cbn1cbiIsImltcG9ydCB7IEJ1dHRwbHVnQ2xpZW50LCBCdXR0cGx1Z0VtYmVkZGVkU2VydmVyQ29ubmVjdG9yLCBCdXR0cGx1Z1NlcnZlciB9IGZyb20gXCIuLi9pbmRleFwiO1xuaW1wb3J0IHsgVGVzdERldmljZU1hbmFnZXIgfSBmcm9tIFwiLi9UZXN0RGV2aWNlTWFuYWdlclwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gQ3JlYXRlRGV2VG9vbHNDbGllbnQoKTogUHJvbWlzZTxCdXR0cGx1Z0NsaWVudD4ge1xuICBjb25zdCBjbGllbnQgPSBuZXcgQnV0dHBsdWdDbGllbnQoXCJUZXN0IENsaWVudFwiKTtcbiAgY29uc3Qgc2VydmVyID0gbmV3IEJ1dHRwbHVnU2VydmVyKFwiVGVzdCBTZXJ2ZXJcIik7XG4gIHNlcnZlci5DbGVhckRldmljZU1hbmFnZXJzKCk7XG4gIHNlcnZlci5BZGREZXZpY2VNYW5hZ2VyKG5ldyBUZXN0RGV2aWNlTWFuYWdlcigpKTtcbiAgY29uc3QgbG9jYWxDb25uZWN0b3IgPSBuZXcgQnV0dHBsdWdFbWJlZGRlZFNlcnZlckNvbm5lY3RvcigpO1xuICBsb2NhbENvbm5lY3Rvci5TZXJ2ZXIgPSBzZXJ2ZXI7XG4gIGF3YWl0IGNsaWVudC5Db25uZWN0KGxvY2FsQ29ubmVjdG9yKTtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjbGllbnQpO1xufVxuIiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vTG9nUGFuZWwuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0xvZ1BhbmVsLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vTG9nUGFuZWwuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgaWQ9XFxcImJ1dHRwbHVnZGV2dG9vbHNsb2dwYW5lbFxcXCI+XFxuICA8dGV4dGFyZWEgaWQ9XFxcImJ1dHRwbHVnZGV2dG9vbHNsb2d0ZXh0YXJlYVxcXCIgcmVhZG9ubHk+PC90ZXh0YXJlYT5cXG4gIDxkaXYgaWQ9XFxcImJ1dHRwbHVnZGV2dG9vbHNsb2dsZXZlbFxcXCI+XFxuICAgIDxsYWJlbD5QYW5lbCBMb2cgTGV2ZWw6PC9sYWJlbD5cXG4gICAgPHNlbGVjdCBpZD1cXFwiYnV0dHBsdWdkZXZ0b29sc2xvZ2xldmVscGFuZWxzZWxlY3RcXFwiPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIk9mZlxcXCI+T2ZmPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiRmF0YWxcXFwiPkZhdGFsPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiRXJyb3JcXFwiPkVycm9yPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiV2FyblxcXCI+V2Fybjwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkluZm9cXFwiPkluZm88L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJEZWJ1Z1xcXCIgc2VsZWN0ZWQ+RGVidWc8L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJUcmFjZVxcXCI+VHJhY2U8L29wdGlvbj5cXG4gICAgPC9zZWxlY3Q+XFxuICAgIDxsYWJlbD5Db25zb2xlIExvZyBMZXZlbDo8L2xhYmVsPlxcbiAgICA8c2VsZWN0IGlkPVxcXCJidXR0cGx1Z2RldnRvb2xzbG9nbGV2ZWxjb25zb2xlc2VsZWN0XFxcIj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJPZmZcXFwiIHNlbGVjdGVkPk9mZjwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkZhdGFsXFxcIj5GYXRhbDwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkVycm9yXFxcIj5FcnJvcjwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIldhcm5cXFwiPldhcm48L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJJbmZvXFxcIj5JbmZvPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiRGVidWdcXFwiPkRlYnVnPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiVHJhY2VcXFwiPlRyYWNlPC9vcHRpb24+XFxuICAgIDwvc2VsZWN0PlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXCI7IiwiaW1wb3J0IHsgQnV0dHBsdWdMb2dnZXIsIExvZ01lc3NhZ2UsIEJ1dHRwbHVnTG9nTGV2ZWwgfSBmcm9tIFwiLi4vLi4vaW5kZXhcIjtcbmNvbnN0IGpzUGFuZWwgPSByZXF1aXJlKFwianNwYW5lbDRcIik7XG5yZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvanNwYW5lbC5jc3NcIik7XG5jb25zdCBsb2dQYW5lbEhUTUwgPSByZXF1aXJlKFwiLi9Mb2dQYW5lbC5odG1sXCIpLnRvU3RyaW5nKCk7XG5yZXF1aXJlKFwiLi9Mb2dQYW5lbC5jc3NcIik7XG5cbmV4cG9ydCBjbGFzcyBMb2dQYW5lbCB7XG5cbiAgcHVibGljIHN0YXRpYyBTaG93TG9nUGFuZWwoKSB7XG4gICAganNQYW5lbC5qc1BhbmVsLmNyZWF0ZSh7XG4gICAgICBpZDogKCkgPT4gXCJidXR0cGx1Zy1sb2dnZXItcGFuZWxcIixcbiAgICAgIHRoZW1lOiAgICAgICBcInByaW1hcnlcIixcbiAgICAgIGhlYWRlclRpdGxlOiBcIkJ1dHRwbHVnIExvZ1wiLFxuICAgICAgcG9zaXRpb246ICAgIFwiY2VudGVyLXRvcCAwIDgwXCIsXG4gICAgICBjb250ZW50U2l6ZTogXCI2NTAgMjUwXCIsXG4gICAgICBjYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LmlubmVySFRNTCA9IGxvZ1BhbmVsSFRNTDtcbiAgICAgICAgTG9nUGFuZWwuX3BhbmVsID0gbmV3IExvZ1BhbmVsKCk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX3BhbmVsOiBMb2dQYW5lbCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGxvZ1RleHRBcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50O1xuICBwcml2YXRlIHBhbmVsTGV2ZWxTZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50O1xuICBwcml2YXRlIGNvbnNvbGVMZXZlbFNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5sb2dUZXh0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV0dHBsdWdkZXZ0b29sc2xvZ3RleHRhcmVhXCIpISBhcyBIVE1MVGV4dEFyZWFFbGVtZW50O1xuICAgIHRoaXMucGFuZWxMZXZlbFNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV0dHBsdWdkZXZ0b29sc2xvZ2xldmVscGFuZWxzZWxlY3RcIikhIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xuICAgIHRoaXMuY29uc29sZUxldmVsU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0cGx1Z2RldnRvb2xzbG9nbGV2ZWxjb25zb2xlc2VsZWN0XCIpISBhcyBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICBjb25zdCBsb2cgPSBCdXR0cGx1Z0xvZ2dlci5Mb2dnZXI7XG4gICAgbG9nLmFkZExpc3RlbmVyKFwibG9nXCIsIChtc2cpID0+IHtcbiAgICAgIHRoaXMuYWRkTG9nTWVzc2FnZShtc2cpO1xuICAgIH0pO1xuICAgIHRoaXMucGFuZWxMZXZlbFNlbGVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcbiAgICAgIGxvZy5NYXhpbXVtRXZlbnRMb2dMZXZlbCA9IEJ1dHRwbHVnTG9nTGV2ZWxbdGhpcy5wYW5lbExldmVsU2VsZWN0LnZhbHVlXTtcbiAgICB9KTtcbiAgICB0aGlzLmNvbnNvbGVMZXZlbFNlbGVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcbiAgICAgIGxvZy5NYXhpbXVtQ29uc29sZUxvZ0xldmVsID0gQnV0dHBsdWdMb2dMZXZlbFt0aGlzLmNvbnNvbGVMZXZlbFNlbGVjdC52YWx1ZV07XG4gICAgfSk7XG4gICAgbG9nLk1heGltdW1FdmVudExvZ0xldmVsID0gQnV0dHBsdWdMb2dMZXZlbC5EZWJ1ZztcbiAgICBsb2cuRGVidWcoXCJMb2dQYW5lbDogRGV2VG9vbHMgTG9nIHBhbmVsIGVuYWJsZWQuXCIpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRMb2dNZXNzYWdlKG1zZzogTG9nTWVzc2FnZSkge1xuICAgIHRoaXMubG9nVGV4dEFyZWEudmFsdWUgPSB0aGlzLmxvZ1RleHRBcmVhLnZhbHVlICsgXCJcXG5cIiArIG1zZy5Gb3JtYXR0ZWRNZXNzYWdlO1xuICB9XG5cbn1cbiIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsIm1vZHVsZS5leHBvcnRzID0gXCI8bWFpbj5cXG4gIDxpbnB1dCBpZD1cXFwidGFiMVxcXCIgdHlwZT1cXFwicmFkaW9cXFwiIG5hbWU9XFxcInRhYnNcXFwiIGNoZWNrZWQ+XFxuICA8bGFiZWwgZm9yPVxcXCJ0YWIxXFxcIj5UZXN0IERldmljZXM8L2xhYmVsPlxcbiAgPHNlY3Rpb24gaWQ9XFxcImNvbnRlbnQxXFxcIj5cXG4gICAgPGRpdiBpZD1cXFwic2ltdWxhdG9yXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJ2aWJyYXRvci1zaW11bGF0b3ItY29tcG9uZW50XFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInZpYnJhdG9yXFxcIj5cXG4gICAgICAgICAgPGltZyBzcmM9XFxcIlwiICsgcmVxdWlyZShcIi4vaHVzaC5wbmdcIikgKyBcIlxcXCJcXG4gICAgICAgICAgICAgICBpZD1cXFwidmlicmF0b3ItaW1hZ2VcXFwiPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJ2aWJyYXRvci1pbmZvXFxcIj5cXG4gICAgICAgICAgPGI+VmlicmF0aW9uIFNwZWVkOjwvYj4gPHNwYW4gaWQ9XFxcInZpYnJhdGlvbnNwZWVkXFxcIj4wPC9zcGFuPjxici8+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcInZpYnJhdGVkaXNjb25uZWN0XFxcIj5EaXNjb25uZWN0PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJzaW11bGF0b3ItZGl2aWRlclxcXCI+PC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiZmxlc2hsaWdodC1zaW1cXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiYy1mbGVzaGxpZ2h0XFxcIj5cXG4gICAgICAgICAgPGRpdj5cXG4gICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCIgKyByZXF1aXJlKFwiLi9ydWxlci5wbmdcIikgKyBcIlxcXCI+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8ZGl2PlxcbiAgICAgICAgICAgIDxpbWcgc3JjPVxcXCJcIiArIHJlcXVpcmUoXCIuL2ZsZXNobGlnaHQucG5nXCIpICsgXCJcXFwiXFxuICAgICAgICAgICAgICAgICBjbGFzcz1cXFwiby1mbGVzaGxpZ2h0XFxcIlxcbiAgICAgICAgICAgICAgICAgaWQ9XFxcImZsZXNobGlnaHQtaW1hZ2VcXFwiPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdj5cXG4gICAgICAgICAgPGI+U3BlZWQ6PC9iPiA8c3BhbiBpZD1cXFwibGluZWFyc3BlZWRcXFwiPjA8L3NwYW4+PGJyLz5cXG4gICAgICAgICAgPGI+UG9zaXRpb246PC9iPiA8c3BhbiBpZD1cXFwibGluZWFycG9zaXRpb25cXFwiPjA8L3NwYW4+PGJyLz5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwibGluZWFyZGlzY29ubmVjdFxcXCI+RGlzY29ubmVjdDwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9zZWN0aW9uPlxcbjwvbWFpbj5cXG5cIjsiLCJpbXBvcnQgeyBCdXR0cGx1Z1NlcnZlciwgQnV0dHBsdWdMb2dnZXIgfSBmcm9tIFwiLi4vLi4vaW5kZXhcIjtcbmltcG9ydCB7IFRlc3REZXZpY2VNYW5hZ2VyIH0gZnJvbSBcIi4uL1Rlc3REZXZpY2VNYW5hZ2VyXCI7XG5pbXBvcnQgKiBhcyBUV0VFTiBmcm9tIFwiQHR3ZWVuanMvdHdlZW4uanNcIjtcblxuY29uc3QganNQYW5lbCA9IHJlcXVpcmUoXCJqc3BhbmVsNFwiKTtcbnJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvanNwYW5lbDQvZGlzdC9qc3BhbmVsLmNzc1wiKTtcbmNvbnN0IHRlc3RQYW5lbEhUTUwgPSByZXF1aXJlKFwiLi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmh0bWxcIikudG9TdHJpbmcoKTtcbnJlcXVpcmUoXCIuL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwuY3NzXCIpO1xuXG5leHBvcnQgY2xhc3MgVGVzdERldmljZU1hbmFnZXJQYW5lbCB7XG4gIHB1YmxpYyBzdGF0aWMgU2hvd1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwoYnV0dHBsdWdTZXJ2ZXI6IEJ1dHRwbHVnU2VydmVyKSB7XG4gICAgbGV0IHRkbTogVGVzdERldmljZU1hbmFnZXIgfCBudWxsID0gbnVsbDtcbiAgICBmb3IgKGNvbnN0IG1nciBvZiBidXR0cGx1Z1NlcnZlci5EZXZpY2VNYW5hZ2Vycykge1xuICAgICAgaWYgKG1nci5jb25zdHJ1Y3Rvci5uYW1lID09PSBcIlRlc3REZXZpY2VNYW5hZ2VyXCIpIHtcbiAgICAgICAgdGRtID0gKG1nciBhcyBUZXN0RGV2aWNlTWFuYWdlcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGRtID09PSBudWxsKSB7XG4gICAgICBCdXR0cGx1Z0xvZ2dlci5Mb2dnZXIuRXJyb3IoXCJUZXN0RGV2aWNlTWFuYWdlclBhbmVsOiBDYW5ub3QgZ2V0IHRlc3QgZGV2aWNlIG1hbmFnZXIgZnJvbSBzZXJ2ZXIuXCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGdldCB0ZXN0IGRldmljZSBtYW5hZ2VyIGZyb20gc2VydmVyLlwiKTtcbiAgICB9XG4gICAganNQYW5lbC5qc1BhbmVsLmNyZWF0ZSh7XG4gICAgICBpZDogKCkgPT4gXCJidXR0cGx1Zy10ZXN0LWRldmljZS1tYW5hZ2VyLXBhbmVsXCIsXG4gICAgICB0aGVtZTogICAgICAgXCJwcmltYXJ5XCIsXG4gICAgICBoZWFkZXJUaXRsZTogXCJUZXN0IERldmljZSBNYW5hZ2VyXCIsXG4gICAgICBwb3NpdGlvbjogICAgXCJjZW50ZXItdG9wIDAgODBcIixcbiAgICAgIGNvbnRlbnRTaXplOiBcIjQwMCAyNTBcIixcbiAgICAgIGNhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQuaW5uZXJIVE1MID0gdGVzdFBhbmVsSFRNTDtcbiAgICAgICAgVGVzdERldmljZU1hbmFnZXJQYW5lbC5fcGFuZWwgPSBuZXcgVGVzdERldmljZU1hbmFnZXJQYW5lbCh0ZG0hKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3RhdGljIF9wYW5lbDogVGVzdERldmljZU1hbmFnZXJQYW5lbDtcbiAgcHJpdmF0ZSBfdGVzdE1hbmFnZXI6IFRlc3REZXZpY2VNYW5hZ2VyO1xuICBwcml2YXRlIGZsZXNobGlnaHRFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSB2aWJyYXRvckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIGN1cnJlbnRMYXVuY2hQb3NpdGlvbjogYW55ID0geyB4OiAwLCB5OiAwIH07XG4gIHByaXZhdGUgbGFzdFBvc2l0aW9uOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIG1vdmVSYWRpdXM6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgY3VycmVudFZpYnJhdGVQb3NpdGlvbjogYW55ID0geyB4OiAwLCB5OiAwIH07XG5cbiAgY29uc3RydWN0b3IodGRtOiBUZXN0RGV2aWNlTWFuYWdlcikge1xuICAgIHRoaXMuX3Rlc3RNYW5hZ2VyID0gdGRtO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlicmF0ZWRpc2Nvbm5lY3RcIikhLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLl90ZXN0TWFuYWdlciEuVmlicmF0aW9uRGV2aWNlLkRpc2Nvbm5lY3QoKTtcbiAgICB9KTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpbmVhcmRpc2Nvbm5lY3RcIikhLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLl90ZXN0TWFuYWdlciEuTGluZWFyRGV2aWNlLkRpc2Nvbm5lY3QoKTtcbiAgICB9KTtcbiAgICB0aGlzLl90ZXN0TWFuYWdlci5WaWJyYXRpb25EZXZpY2UuYWRkTGlzdGVuZXIoXCJ2aWJyYXRlXCIsIChzcGVlZCkgPT4ge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWJyYXRpb25zcGVlZFwiKSEuaW5uZXJIVE1MID0gc3BlZWQ7XG4gICAgICB0aGlzLnZpYnJhdGVNb3ZlKHNwZWVkKTtcbiAgICB9KTtcbiAgICB0aGlzLl90ZXN0TWFuYWdlci5MaW5lYXJEZXZpY2UuYWRkTGlzdGVuZXIoXCJsaW5lYXJcIiwgKGxpbmVhcm9iajogYW55KSA9PiB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpbmVhcnBvc2l0aW9uXCIpIS5pbm5lckhUTUwgPSBsaW5lYXJvYmoucG9zaXRpb247XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpbmVhcnNwZWVkXCIpIS5pbm5lckhUTUwgPSBsaW5lYXJvYmouc3BlZWQ7XG4gICAgICB0aGlzLmxhdW5jaE1vdmUobGluZWFyb2JqLnBvc2l0aW9uLCBsaW5lYXJvYmouc3BlZWQpO1xuICAgIH0pO1xuICAgIHRoaXMuZmxlc2hsaWdodEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZsZXNobGlnaHQtaW1hZ2VcIikhO1xuICAgIHRoaXMudmlicmF0b3JFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWJyYXRvci1pbWFnZVwiKSE7XG4gIH1cblxuICBwcml2YXRlIGxhdW5jaE1vdmUgPSAocG9zaXRpb24sIHNwZWVkKSA9PiB7XG4gICAgY29uc3QgcCA9IC0oKDEwMCAtIHBvc2l0aW9uKSAqIDAuMjIpO1xuICAgIGNvbnN0IGR1cmF0aW9uID0gdGhpcy5tb3ZlRHVyYXRpb24ocG9zaXRpb24sIHNwZWVkKTtcbiAgICBuZXcgVFdFRU4uVHdlZW4odGhpcy5jdXJyZW50TGF1bmNoUG9zaXRpb24pXG4gICAgICAudG8oe3g6IDAsIHk6IHB9LCBkdXJhdGlvbilcbiAgICAgIC5zdGFydCgpO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxhdW5jaEFuaW1hdGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBsYXVuY2hBbmltYXRlID0gKHRpbWVzdGFtcDogbnVtYmVyKSA9PiB7XG4gICAgaWYgKCFUV0VFTi51cGRhdGUoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmZsZXNobGlnaHRFbGVtZW50LnN0eWxlLmJvdHRvbSA9IGAke3RoaXMuY3VycmVudExhdW5jaFBvc2l0aW9uLnl9JWA7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubGF1bmNoQW5pbWF0ZSk7XG4gIH1cblxuICAvLyBtb3ZlRHVyYXRpb24gcmV0dXJucyB0aGUgdGltZSBpbiBtaWxsaXNlY29uZHMgaXQgd2lsbCB0YWtlIHRvIG1vdmVcbiAgLy8gdG8gcG9zaXRpb24gYXQgc3BlZWQuXG4gIC8vXG4gIC8vIHBvc2l0aW9uOiBwb3NpdGlvbiBpbiBwZXJjZW50ICgwLTEwMCkuXG4gIC8vIHNwZWVkOiAgICBzcGVlZCBpbiBwZXJjZW50ICgyMC0xMDApLlxuICBwcml2YXRlIG1vdmVEdXJhdGlvbiA9IChwb3NpdGlvbjogbnVtYmVyLCBzcGVlZDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLmFicyhwb3NpdGlvbiAtIHRoaXMubGFzdFBvc2l0aW9uKTtcbiAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHJldHVybiB0aGlzLmNhbGNEdXJhdGlvbihkaXN0YW5jZSwgc3BlZWQpO1xuICB9XG5cbiAgLy8gX2NhbGNEdXJhdGlvbiByZXR1cm5zIGR1cmF0aW9uIG9mIGEgbW92ZSBpbiBtaWxsaXNlY29uZHMgZm9yIGEgZ2l2ZW5cbiAgLy8gZGlzdGFuY2Uvc3BlZWQuXG4gIC8vXG4gIC8vIGRpc3RhbmNlOiBhbW91bnQgdG8gbW92ZSBwZXJjZW50ICgwLTEwMCkuXG4gIC8vIHNwZWVkOiBzcGVlZCB0byBtb3ZlIGF0IGluIHBlcmNlbnQgKDIwLTEwMCkuXG4gIHByaXZhdGUgY2FsY0R1cmF0aW9uID0gKGRpc3RhbmNlOiBudW1iZXIsIHNwZWVkOiBudW1iZXIpID0+IHtcbiAgICByZXR1cm4gTWF0aC5wb3coc3BlZWQgLyAyNTAwMCwgLTAuOTUpIC8gKDkwIC8gZGlzdGFuY2UpO1xuICB9XG5cbiAgcHJpdmF0ZSB2aWJyYXRlTW92ZSA9IChzcGVlZCkgPT4ge1xuICAgIHRoaXMubW92ZVJhZGl1cyA9IHNwZWVkO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnZpYnJhdGVBbmltYXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgdmlicmF0ZUFuaW1hdGUgPSAodGltZXN0YW1wOiBudW1iZXIpID0+IHtcbiAgICBpZiAoIVRXRUVOLnVwZGF0ZSgpKSB7XG4gICAgICBpZiAodGhpcy5tb3ZlUmFkaXVzICE9PSAwKSB7XG4gICAgICAgIG5ldyBUV0VFTi5Ud2Vlbih0aGlzLmN1cnJlbnRWaWJyYXRlUG9zaXRpb24pXG4gICAgICAgICAgLnRvKHt4OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLm1vdmVSYWRpdXMgKiAyMCksXG4gICAgICAgICAgICAgICB5OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLm1vdmVSYWRpdXMgKiAyMCl9XG4gICAgICAgICAgICAgICwgMzQpXG4gICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnZpYnJhdGVBbmltYXRlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy52aWJyYXRvckVsZW1lbnQuc3R5bGUudG9wID0gYCR7dGhpcy5jdXJyZW50VmlicmF0ZVBvc2l0aW9uLnh9cHhgO1xuICAgIHRoaXMudmlicmF0b3JFbGVtZW50LnN0eWxlLnJpZ2h0ID0gYCR7dGhpcy5jdXJyZW50VmlicmF0ZVBvc2l0aW9uLnl9cHhgO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnZpYnJhdGVBbmltYXRlKTtcbiAgfVxufVxuXG4vLyBTb21lIGNvZGUgaW4gdGhpcyBmaWxlIHRha2VuIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2Z1bmphY2svbGF1bmNoY29udHJvbFxuLy8gTUlUIExpY2Vuc2U6XG4vKlxuTGF1Y2hjb250cm9sIFVJIEZsZXNobGlnaHRcblxuaHR0cHM6Ly9naXRodWIuY29tL2Z1bmphY2svbGF1bmNoY29udHJvbFxuXG5Db3B5cmlnaHQgMjAxNyBGdW5qYWNrXG5cblJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxubW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cbjEuIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xubGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG5cbjIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbnRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb25cbmFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuXG4zLiBOZWl0aGVyIHRoZSBuYW1lIG9mIHRoZSBjb3B5cmlnaHQgaG9sZGVyIG5vciB0aGUgbmFtZXMgb2YgaXRzIGNvbnRyaWJ1dG9yc1xubWF5IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlIHdpdGhvdXRcbnNwZWNpZmljIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cblxuVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG5BTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRVxuRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRVxuRk9SIEFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUxcbkRBTUFHRVMgKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SXG5TRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUlxuQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSxcbk9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFXG5PRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuKi9cbiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQURRQUFBQm5DQVlBQUFCUFltR3lBQUFBQm1KTFIwUUEvd0QvQVArZ3ZhZVRBQUFBQ1hCSVdYTUFBQXNUQUFBTEV3RUFtcHdZQUFBQUIzUkpUVVVINFFRZUN5Y1RCcVQ0c1FBQUFCbDBSVmgwUTI5dGJXVnVkQUJEY21WaGRHVmtJSGRwZEdnZ1IwbE5VRmVCRGhjQUFBTkpTVVJCVkhqYTdaeS9iNXRBRk1mZklkU2hhVGRManAydGt0bTY4QTkwNzVvQnBrcVord2YwYitnZjBObFNKang0elo3VncwbFdOeU4xUzF4TFdWRFZKYko1SGV4TEFQUGpPTGdEdSs4N2hSamZ2US92RjNlUU1HZ21CRDFpeHI4b1lIemZCd0NBMVdxVituQ3ovbDM2NWN2eEtIVThtVXdBQUNBSWdrYTIyYW93QXFSdGlYR0RJRUFWS0F2T1RBVFVySUxnZVFHeG5KUkF4Tk1FUWtRakhyS05lWWZwOTQ1UklGbklyam95R2tzN1V4N0tOdGF5T3dWRVBQTEdjSFNaT25ZY0ozV2N1R09nUG5TU3VkSTZrR3BJNkI1YkJRaDkzd2ZmOTJ0UFhPUXB5N0pTTUdKOGxlS2p0V3cvckI5emYzODFHcWVPNHpqdVI5bE9WcnBzbGVPY0h4bWVCSFZkdDdES05Wa1RLZWRRMlhxb0RFWjRpSE1PdTkydTl0akdxeHpuL09qcTU4bDFYVmd1bDJEYk50aDJlNUZ2ZFFHVGhGb3NGclRBSXlCcXJDM0ROR21zWnhkeUt2V1NIZmJNUU1mZVhNYnovV2lzYlVCUmxTTWc2a1BVaDZnUFVSK2lQa1JsbTRDb0QxRWZvajVFZllpcUhBRVJFRFZXYXF6VVdLbXhublpqelQ1ZnJhdnRkdHQ0ak1aRklVK3U2d0xuWEhxZ3NpZCtWQlFVa3c0OXowdTlRSkVYS3NKTFpZLzFoVWV6Y2h3bjlSN2RiRGFyWmFlbEkzZGtuNExyeUVkdGI1SmNqY2JTYjVKMDNZZWtyNlNxNFdFWXZyeHByN01vb09kNTVwTDdrS2VIT1ZGckRsVjVwK3J2SG1UT1VjMmwvM2I1WURUY3NoSmhGL3o4OXVHc1BPUi8vUDdMT0pCTS9xaWNTemxFUUFSRVFOMERxVlN0dGlzZGVZaUFDTWd3VUJpR3JTZDMwWGVMNWlJUEVkQUpBV0hYaTd2c0lxOXFmNkZzMXdmRnJzMWhzdys2QWhQekMzc2UxbytGLzVxQXlRQUpGZTJ6SlNkVFZaMnhEK2ZXQmhJdWxqSzJ6Q0FaMVp5ajBHNHBENG1CZE81NHlvQms3R0YxYytqbzZ2VWw1TXBFSWRmM2tLdmxvYTVEVHNaRFZUbkVjRHBIZG5OZGFiVE9rSXVpQ09JNEJwek9nZDFjTTlYR3VyK1RHQTRBNys0Qk5rOGd3SVRldmIxb3pVTlJGQlYrOXVmSDdmNkg0VURjM2NTcVFLOWZIQTRBcC9QQ0U5OS8vZElJNk1Yb1BPMUJqbTFTQUxvb0dSaGc4eVJua0lxeWM3M3FEUUE4cXdMOXJUMXBBcktoNFVWNmJ1S2hOcStzRVVrOUxzZTdlNFFlaUgzK1ZHa3ZyVmo3THVrM05Mb09PNWx3cXdYVUZaZ3NpREtRU2FpNk1NcEF1c0ZVUUZvQmFodXNDWWpRUHhqaXJ5Q29wTFdiQUFBQUFFbEZUa1N1UW1DQ1wiIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRElBQUFCQkNBSUFBQUFjNjJDSkFBQUFCR2RCVFVFQUFMR1BDL3hoQlFBQUFDQmpTRkpOQUFCNkpnQUFnSVFBQVBvQUFBQ0E2QUFBZFRBQUFPcGdBQUE2bUFBQUYzQ2N1bEU4QUFBQUJtSkxSMFFBL3dEL0FQK2d2YWVUQUFBQUNYQklXWE1BQUFzU0FBQUxFZ0hTM1g3OEFBQUFCM1JKVFVVSDRRb09GU29EVnl6eEhBQUFDVmxKUkVGVWFON2RXbDFzRTFjV1BuZit4eDZQLzhZMktVbk1MazBVRnJwU1VXa0xLdEpXVlo4V3lUSnNKRVFRa1doQkxSSThWU29QQzZqcVE2SktmV0NsVm1vVGlVSjJ1MVdraHZTbExXckxBeERDOHFPdGhOUUdWRW9TWjJteGpYOWlPOU1aejcxM0h5NFlOd25GUDVpVjlqeFlNM2ZtbnZudU9lZWV2MnRFS1lYbWlCQUNBTVBEd3dDd2UvZHVudWNSUWszeUJOb2NFVUl3eHNlUEh3K0h3OUZvZEdSa0JHTk1DR21TYmJPd0hNYzVkT2lRWVJoUFB2bmsrdlhydTd1N2p4dzVnakZ1a2kxcVVvbUVFSmVxR29aaGhFSTh6d1BBdFd2WDV1Zm5PWTVyaG0xVGt5bWwrL2J0TTR3UVVHQ1lBS0M3dTN2ZnZuMU5ycllwV05ldlhmdm1xNjhwSVpxbVZRWVJRdWZQbi8vKysrK2JRZFk0TEl6eHFWT244dms4UW1pUnltemJQbjM2Tk5zUWp4dFdJcEU0ZnVLRUpFbUNJQ2lLVXYzSTdYWi8vUEhITXpNekRRdXNFVmlVVW96eDRNREFmeEp6QUFBSUVMK1lUemFiSFJ3Y2JIak5EVXByYW1ycXE2KytacnJ6K254TFgxQVVaWEp5Y21wcTZySENLcFZLMld5R3dSSjRZUm0rSEZjb0ZCWVdGaHJqMzZEZjJyaHhZMkptRmdCMG4xZFYxV28wQUlBeFp2SEg3WGFmT1hQbWNVbUxBZ0lFQUVzWHBPdjZpaFVybW8rSmpjQWFHaDY2OGNNUHl6NEtoOE9hcHJsY0xuYWJUcWMvK09DREJoUlNOeXdXaHRtMXdQT2lLRlllVllUazhYaXFwelFBcTI3YnVuejU4b3QvZXRHcjZ3QWdpbUxBQ0ZhTHl1ZnpBWUJwbXJkdTNjSVlBMEFpa2ZqODg4K2ZlZWFaMWtvTG9ZZXZSRlhWU0NTeVZJb3RoRFV4TVNGTDB0SnhTWkprV2E3Y0NzSmRyK0YydXljbkoxc082NU4vZnVLcThnalZFcXIyRkxJc0J3SUJBQWdFQXFPam95MkhWU01oaEtwM1EydGhwVklweTdKcWZMbGlnbzdqcEZLcEZzSWFHeHViU3lScTNMb3VsNHNKTEp2Tm5qeDVzbFd3S0tXTDl0UnZaOGFTSkZWUzFucXBQbGlmZnZwcE5SVE5vejEwQ2dESXN2elpaNSsxQ2hiSGNlZk9uZnVWQUdwVEo4L3pseTVkYWhXc3gwbi9sN0NhTCtwYkFTdWZ6MWRmc3lyb2Z3OXJFWVJNSmxOZGdSV0xSZHUyRytNc05EWnRXU3FYeTNOemM3cXVzK3RNSnRNd3EwY0dpMUxLODd4cG1xWnBOcyt0RGlVU1FsNTQ0UVdXM0ZWR0hNZGgxd2loQjlYUUdPTU5HemEwQ2haQ2FOdTJiZFhmeGhqL1VvTnNMTXVLeFdJdGhMVTBMeTBXaW5WOTc5SERBb0N0VzdlMmQzWlV1eXVFVUQ2WGh3ZUhiVXFwMysrUHhXSjFGUTMxd1FxRlF2MzkvYWI1cTFvWll3Y29QTWl3Y3JuYzl1M2JEY05vb2JRQTRLV1hYZ3BISWhWTEJ3RGJzblBaN01MQ1F2VWdJMEtJcnVzdnYveHl2WDNldWdzeVN1blUxTlNXUDI5SkptK3pEQUloNU5FOWdpaHFtcmFvb3lRSXdrY2ZmZFRUMDFPdjk2L2JieUdFZW5wNjRsdmoveGo1ZXlYSjBYVmRkZCt0cEhPNUhCTWJRbWo3OXUxcjFxeXA5eE9OU0lzSkxKVks3ZHk1OCtyVnF6emlNTUdXYlZmVUpNc3l4M0hsY3JtcnEydDBkTFM2WUt5ZEdveUpobUhzMnJVTEFQTDV2R21hQVgrZ3M3T3pvNk5qdzRZTnJGcmtlWDdQbmozaGNMZ3gvazAxd0RkdDNKaVlUVkJLaThXaVF6QkNxTDI5WFpJazI3WU53emg3OW16RG5CdVBpWVNRNTU1Ly90dC9mOHZ6dk12bFd0M1pBUUNDSU55NWN3ZGp2R25UcHFVbFNlM1VWR0xUMTljblNxTEw1YUlBczdPemlVVEM3L2RybW1aWlZtOXZiek9jRzVjV3gzRUlJY3UyQ1NGQVlkWHZmeWZMY2lhVEtaVks1WElaR3VxSVBBSllqQ1JKVW1VRkFjek56WW1pdUg3OWV0dTJpOFZtQTJXenNBZ2haYWNNRklKRzBPdjEzcmh4bzFnc2xrcWxabUd4L09uS2xTc2N4eG1HMGRIUndiUlQ0M3lPNHdSQkJFcXoyZXo4L1B6YXRXdlQ2WFR6R2IwQUFJT0RnME5EUTJ4N2o0eU1SS1BSV21ZeXowSXdMcGZMTGxYdGVLSU5BT2JuNTBWUlpLMEg5a0pqRUxuaDRlR2pSNDhHZzhGQUlMQ3dzTEJqeDQ1ME9sM0xURUxJOVBTMElpdHVsOHZyOVFLQUtJcUtvaWlLSW9yaTlldlhiOTY4MmZqaFNtVTF3V0JRMS9WY0xqYzJOdmJiUjBqc2pJbFMrdTY3NzFaaWN5UVNXYmx5Wldkblp6UWFiVzl2Zi92dHQvZnYzejh6TXdQM0RtUHFnd1VBUU1FMFRkYk80M24rOHVYTEQyMUhqWTJOeFdLeDZadlRsUkZkMTZWN3pjdTJ0clpRS0NTS1lqd2U3K3JxMnJ4NTgvRHc4TjNUM3RybzdrNmN6K1Z6Mlp3Uk10eHU5L2o0K0d1dnZiWTB4RElKdmZQT096TXpNeE1URTBDb0xFbk1SUUZBb1ZCZ3BSZ2psOHVWVENZRGdVQTBHdVY1L3RpeFkrbDArdURCZ3pXMmx2ZzMzbmpqeXkrK3dBNldaRW5UTk5NMHkrVXlDN3BNdjJ5VlUxTlQ0K1BqVzdacytmSEhIMi9mdnMzemZLbTB3RHFEaUVOdXQ5czBUWGFDVnl3V1RkUE1ack8yYmR1MlhTZ1VFRUxoY0RpUlNFeE9Ubm84bmxxMkZNSVlQL2Zzc3ovZCtrbFc1S0JoK0h5K1RDWmpXZFpiYjcwVmo4ZFpXVEV3TURBNk9tcFpGanVlc0g2eEZvcEZCMk5DaUtacHNxcXd2cklvaWh6SDJiYTlWRm1DSUt4ZXZicFFLQlNMeFFNSERzVGo4WWZBY2h4bmNHRHdiMGVQaXFLb3FtclBIOWFrVWlsV0V6Tm5qUkR5Ky8wODRrcWxVc1Z5T1k2VEZObmo4VHowcUx3NllPdTZIb2xFRW9sRWYzOS9MQllMaFVJUG1vNElJWVNRUHo3MVZDNlhVeFQxaVpWUGhNUGhWQ3BWS3BWeXVSeDJNQ0FBQ3M0OUcySmE4M2w5a25LM0M2OG9pc2ZqVVpmcmlqTzZjK2VPNHpnSW9YSzU3UFY2bWFrUVFvYUdoam83TzVkMWJJaVp6b2NmZm5qNHI0ZEVVZFIwVDF0Ym04L255K2Z6dG0zUHpTYVdGZzZxUzlXOTNvcHB0N2UzMTJMRkxDMzcrZWVmS2FXUlNFVFRORUxJZSsrOXQyejZlamNOVEtWU2UvZnN2WERoZ3NEem1xWnBtb1lRY3JDVFNxWVdHWW9vaVQ2LzMrUHhHSWJCRkZUNVhWNGQ5L1lOODNBc1JsbVdKVWxTS0JRS0JvT0hEeCtPUnFPTHRIbWZYVEtaZlBQTk4wOTk4ZVZ2bUlza1NiNkFuMWtKaHhCQ3lEVE5aQ3FGWUlraUVBQ2w5M3BOVkZIVlVDZ0VBRUJCOStyNWZKNkZxWEE0N0RqTysrKy9INDFHcTdWNUh4WWhKSmxNdnY3NjYvKzZjSUZEeXlDamxLcXFxdnU4ekd0emdOaTZIZXdzN2UwS2dsRDlHWjduMldwRlVmUjQ5VXE0ZEx2ZFBwOHZHQXdPRGc2R3crSEtsUHV3MkVVNm5lN3I2N3Q0OGFMbWNpL0tldG10cE1pV1pSVUtCWUlKSVdUYlg3WnQzcnk1V2xhRTByTm56b3lkUExsb2JRZ2hsMHNWUlpIOXNVZFZGVVZSRlZVUlJWSFR0TjdlM3IxNzl5NEQ2ejVmUXI3NzdydFhkcjh5TXoyOTZGRjAxU3BDQ1FBY08zWnMzYnAxTERndVNvUllNRmpxelFraEF3TUQ0K1BqQ0dCMlpoWUFLRkN2enljSXd0TlBQMzNpeElscVBnODBWWXd4KzB0V05iMzY2cXNOSDB4VTQyTWhzaklTajhjWGxXNy9CZWRRYjZET2xiNkhBQUFBR1hSRldIUmpiMjF0Wlc1MEFFTnlaV0YwWldRZ2QybDBhQ0JIU1UxUTU2OUF5d0FBQUNWMFJWaDBaR0YwWlRwamNtVmhkR1VBTWpBeE55MHhNQzB4TkZReU1UbzBNam93TXkwd056b3dNTnZpb3FNQUFBQWxkRVZZZEdSaGRHVTZiVzlrYVdaNUFESXdNVGN0TVRBdE1UUlVNakU2TkRJNk1ETXRNRGM2TURDcXZ4b2ZBQUFBQUVsRlRrU3VRbUNDXCIiLCJleHBvcnQgKiBmcm9tIFwiLi4vVGVzdERldmljZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4uL1Rlc3REZXZpY2VNYW5hZ2VyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi4vdXRpbHNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0xvZ1BhbmVsXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsXCI7XG5leHBvcnQgKiBmcm9tIFwiLi91dGlscy53ZWJcIjtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFVQUFBQ0ZDQVlBQUFDVDN6STlBQUFBQm1KTFIwUUEvd0QvQVArZ3ZhZVRBQUFBQ1hCSVdYTUFBQXNUQUFBTEV3RUFtcHdZQUFBQUIzUkpUVVVINFFRZUNoNEFqVnhlNGdBQUFCbDBSVmgwUTI5dGJXVnVkQUJEY21WaGRHVmtJSGRwZEdnZ1IwbE5VRmVCRGhjQUFBQStTVVJCVkVqSFkyUmdZUGpQZ0FWZ0NESmhVOFdFUy9VSTBNNklwcEp4Tk9qSURUb3liUjhWSEJVY01vS2phWDVVY0RUTmoxYVJvNjJMQVdsZEFBQzhFQzJ0QUVCWVhBQUFBQUJKUlU1RXJrSmdnZz09XCIiLCJpbXBvcnQgeyBUZXN0RGV2aWNlTWFuYWdlclBhbmVsIH0gZnJvbSBcIi4vVGVzdERldmljZU1hbmFnZXJQYW5lbFwiO1xuaW1wb3J0IHsgTG9nUGFuZWwgfSBmcm9tIFwiLi9Mb2dQYW5lbFwiO1xuaW1wb3J0IHsgQnV0dHBsdWdTZXJ2ZXIgfSBmcm9tIFwiLi4vLi4vaW5kZXhcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIENyZWF0ZUxvZ2dlclBhbmVsKCkge1xuICBMb2dQYW5lbC5TaG93TG9nUGFuZWwoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENyZWF0ZURldmljZU1hbmFnZXJQYW5lbChidXR0cGx1Z1NlcnZlcjogQnV0dHBsdWdTZXJ2ZXIpIHtcbiAgVGVzdERldmljZU1hbmFnZXJQYW5lbC5TaG93VGVzdERldmljZU1hbmFnZXJQYW5lbChidXR0cGx1Z1NlcnZlcik7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9