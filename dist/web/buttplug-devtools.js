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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
exports.push([module.i, "/* jspanel.sass: 2018-05-20 13:13 */\n/* http://stackoverflow.com/questions/30421570/sass-unicode-escape-is-not-preserved-in-css-file */\n.jsPanel {\n  border: 0;\n  box-sizing: border-box;\n  vertical-align: baseline;\n  font-family: \"Open Sans\",\"Helvetica Neue\",Helvetica,Arial,sans-serif;\n  font-weight: normal;\n  display: flex;\n  flex-direction: column;\n  opacity: 0;\n  overflow: visible;\n  position: absolute;\n  top: 0;\n  z-index: 100; }\n  .jsPanel .jsPanel-hdr {\n    border: 0;\n    box-sizing: border-box;\n    vertical-align: baseline;\n    font-family: \"Open Sans\",\"Helvetica Neue\",Helvetica,Arial,sans-serif;\n    font-weight: normal;\n    font-size: 1rem;\n    display: flex;\n    flex-direction: column;\n    flex-shrink: 0; }\n  .jsPanel .jsPanel-content {\n    border: 0;\n    box-sizing: border-box;\n    vertical-align: baseline;\n    font-family: \"Open Sans\",\"Helvetica Neue\",Helvetica,Arial,sans-serif;\n    font-weight: normal;\n    background: #ffffff;\n    color: #000000;\n    font-size: 1rem;\n    position: relative;\n    overflow-x: hidden;\n    overflow-y: auto;\n    flex-grow: 1; }\n    .jsPanel .jsPanel-content pre {\n      color: inherit; }\n  .jsPanel .jsPanel-ftr {\n    flex-direction: row;\n    justify-content: flex-end;\n    flex-wrap: nowrap;\n    align-items: center;\n    border-top: 1px solid #e0e0e0;\n    display: none;\n    box-sizing: border-box;\n    font-size: 1rem;\n    height: auto;\n    background: #f5f5f5;\n    font-weight: normal;\n    color: black;\n    overflow: hidden; }\n  .jsPanel .jsPanel-ftr.active {\n    display: flex;\n    flex-shrink: 0; }\n    .jsPanel .jsPanel-ftr.active > * {\n      margin: 3px 8px; }\n  .jsPanel .jsPanel-ftr.panel-footer {\n    padding: 0; }\n\n.jsPanel-headerbar, .jsPanel-hdr-toolbar {\n  font-size: 1rem; }\n\n.jsPanel-headerbar {\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  align-items: center; }\n  .jsPanel-headerbar img {\n    vertical-align: middle;\n    max-height: 38px; }\n\n.jsPanel-titlebar {\n  display: flex;\n  align-items: center;\n  flex-grow: 1;\n  cursor: move;\n  height: 100%;\n  overflow: hidden; }\n  .jsPanel-titlebar .jsPanel-title {\n    color: #000000;\n    font-family: \"Open Sans\",\"Helvetica Neue\",Helvetica,Arial,sans-serif;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-size: 1rem;\n    font-variant: small-caps;\n    font-weight: normal;\n    line-height: 1.5;\n    margin: 0 5px 0 8px;\n    min-width: 0; }\n    .jsPanel-titlebar .jsPanel-title small {\n      font-size: 70%;\n      color: inherit; }\n\n.jsPanel-titlebar.jsPanel-rtl {\n  flex-direction: row-reverse; }\n\n.jsPanel-controlbar {\n  display: flex;\n  align-items: center;\n  touch-action: none; }\n  .jsPanel-controlbar div span:hover, .jsPanel-controlbar div svg:hover {\n    opacity: .6; }\n  .jsPanel-controlbar .jsPanel-btn {\n    cursor: pointer;\n    touch-action: none; }\n    .jsPanel-controlbar .jsPanel-btn span {\n      vertical-align: middle;\n      padding: 0 4px 0 2px; }\n    .jsPanel-controlbar .jsPanel-btn span.glyphicon {\n      padding: 0 2px; }\n    .jsPanel-controlbar .jsPanel-btn svg {\n      margin: 0 8px 0 3px; }\n    .jsPanel-controlbar .jsPanel-btn .jsPanel-icon {\n      padding-top: 9px;\n      margin: 0 4px 0 0; }\n  .jsPanel-controlbar .jsPanel-btn-normalize, .jsPanel-controlbar .jsPanel-btn-smallifyrev {\n    display: none; }\n\n.jsPanel-hdr-toolbar {\n  display: none;\n  width: auto;\n  height: auto;\n  font-size: 1rem; }\n\n.jsPanel-hdr-toolbar.active {\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  align-items: center; }\n  .jsPanel-hdr-toolbar.active > * {\n    margin: 3px 8px; }\n\n/* styles for panels using option.rtl */\n.jsPanel-headerbar.jsPanel-rtl, .jsPanel-controlbar.jsPanel-rtl, .jsPanel-hdr-toolbar.jsPanel-rtl {\n  flex-direction: row-reverse; }\n\n.jsPanel-hdr-toolbar.active.jsPanel-rtl {\n  padding: 7px 0 10px 0; }\n\n.jsPanel-ftr.jsPanel-rtl {\n  flex-direction: row; }\n\n/* container that takes the minified jsPanels */\n#jsPanel-replacement-container, .jsPanel-minimized-box, .jsPanel-minimized-container {\n  display: flex;\n  flex-flow: row wrap-reverse;\n  background: transparent none repeat scroll 0 0;\n  bottom: 0;\n  height: auto;\n  left: 0;\n  position: fixed;\n  width: auto;\n  z-index: 9998; }\n  #jsPanel-replacement-container .jsPanel-replacement, .jsPanel-minimized-box .jsPanel-replacement, .jsPanel-minimized-container .jsPanel-replacement {\n    display: flex;\n    align-items: center;\n    width: 200px;\n    height: 40px;\n    margin: 1px 1px 0 0;\n    z-index: 9999; }\n    #jsPanel-replacement-container .jsPanel-replacement .jsPanel-hdr, .jsPanel-minimized-box .jsPanel-replacement .jsPanel-hdr, .jsPanel-minimized-container .jsPanel-replacement .jsPanel-hdr {\n      flex-grow: 1;\n      min-width: 0;\n      padding: 0; }\n      #jsPanel-replacement-container .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo, .jsPanel-minimized-box .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo, .jsPanel-minimized-container .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo {\n        max-width: 50%;\n        overflow: hidden; }\n        #jsPanel-replacement-container .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo img, .jsPanel-minimized-box .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo img, .jsPanel-minimized-container .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo img {\n          max-width: 100px;\n          max-height: 38px; }\n    #jsPanel-replacement-container .jsPanel-replacement .jsPanel-titlebar, .jsPanel-minimized-box .jsPanel-replacement .jsPanel-titlebar, .jsPanel-minimized-container .jsPanel-replacement .jsPanel-titlebar {\n      cursor: default;\n      min-width: 0; }\n    #jsPanel-replacement-container .jsPanel-replacement .jsPanel-btn.jsPanel-btn-normalize, .jsPanel-minimized-box .jsPanel-replacement .jsPanel-btn.jsPanel-btn-normalize, .jsPanel-minimized-container .jsPanel-replacement .jsPanel-btn.jsPanel-btn-normalize {\n      display: block; }\n\n.jsPanel-minimized-box, .jsPanel-minimized-container {\n  position: absolute;\n  width: 100%;\n  overflow: hidden; }\n\n/* helper classes to make .jsPanel-content a flex box */\n.flexOne {\n  display: flex;\n  flex-flow: row wrap; }\n\n/* css for resizeit handles ------------------------- */\n.jsPanel-resizeit-handle {\n  display: block;\n  font-size: 0.1px;\n  position: absolute;\n  touch-action: none; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-n {\n  cursor: n-resize;\n  height: 12px;\n  left: 9px;\n  top: -5px;\n  width: calc(100% - 18px); }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-e {\n  cursor: e-resize;\n  height: calc(100% - 18px);\n  right: -9px;\n  top: 9px;\n  width: 12px; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-s {\n  bottom: -9px;\n  cursor: s-resize;\n  height: 12px;\n  left: 9px;\n  width: calc(100% - 18px); }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-w {\n  cursor: w-resize;\n  height: calc(100% - 18px);\n  left: -9px;\n  top: 9px;\n  width: 12px; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-ne {\n  cursor: ne-resize;\n  height: 18px;\n  right: -9px;\n  top: -9px;\n  width: 18px; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-se {\n  bottom: -9px;\n  cursor: se-resize;\n  height: 18px;\n  right: -9px;\n  width: 18px; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-sw {\n  bottom: -9px;\n  cursor: sw-resize;\n  height: 18px;\n  left: -9px;\n  width: 18px; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-nw {\n  cursor: nw-resize;\n  height: 18px;\n  left: -9px;\n  top: -9px;\n  width: 18px; }\n\n.jsPanel-drag-overlay {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0; }\n\n/* box-shadows --------------------------------------------------------------------- */\n.jsPanel-depth-1 {\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); }\n\n.jsPanel-depth-2 {\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23); }\n\n.jsPanel-depth-3 {\n  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22); }\n\n.jsPanel-depth-4 {\n  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22); }\n\n.jsPanel-depth-5 {\n  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.3), 0 20px 14px rgba(0, 0, 0, 0.22); }\n\n/* snap sensitive areas ------------------------------------------------------------------------------ */\n.jsPanel-snap-area {\n  position: fixed;\n  background: black;\n  opacity: .2;\n  border: 1px solid silver;\n  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.5), 0 10px 10px rgba(0, 0, 0, 0.5);\n  z-index: 9999; }\n\n.jsPanel-snap-area-lt, .jsPanel-snap-area-lc, .jsPanel-snap-area-lb {\n  left: 0; }\n\n.jsPanel-snap-area-ct, .jsPanel-snap-area-cb {\n  left: 37.5%; }\n\n.jsPanel-snap-area-rt, .jsPanel-snap-area-rc, .jsPanel-snap-area-rb {\n  right: 0; }\n\n.jsPanel-snap-area-lt, .jsPanel-snap-area-ct, .jsPanel-snap-area-rt {\n  top: 0; }\n\n.jsPanel-snap-area-lc, .jsPanel-snap-area-rc {\n  top: 37.5%; }\n\n.jsPanel-snap-area-lb, .jsPanel-snap-area-cb, .jsPanel-snap-area-rb {\n  bottom: 0; }\n\n.jsPanel-snap-area-ct, .jsPanel-snap-area-cb {\n  width: 25%; }\n\n.jsPanel-snap-area-lc, .jsPanel-snap-area-rc {\n  height: 25%; }\n\n.jsPanel-snap-area-lt {\n  border-bottom-right-radius: 100%; }\n\n.jsPanel-snap-area-rt {\n  border-bottom-left-radius: 100%; }\n\n.jsPanel-snap-area-rb {\n  border-top-left-radius: 100%; }\n\n.jsPanel-snap-area-lb {\n  border-top-right-radius: 100%; }\n\n/* tooltip and tooltip connectors */\n.jsPanel-connector-left-top, .jsPanel-connector-right-top, .jsPanel-connector-left-bottom, .jsPanel-connector-right-bottom {\n  width: 12px;\n  height: 12px;\n  position: absolute;\n  border-radius: 50%; }\n\n.jsPanel-connector-left, .jsPanel-connector-top, .jsPanel-connector-bottom, .jsPanel-connector-right {\n  width: 0;\n  height: 0;\n  position: absolute;\n  border: 12px solid transparent; }\n\n.jsPanel-connector-left-top {\n  left: calc(100% - 6px);\n  top: calc(100% - 6px); }\n\n.jsPanel-connector-right-top {\n  left: -6px;\n  top: calc(100% - 6px); }\n\n.jsPanel-connector-right-bottom {\n  left: -6px;\n  top: -6px; }\n\n.jsPanel-connector-left-bottom {\n  left: calc(100% - 6px);\n  top: -6px; }\n\n.jsPanel-connector-top {\n  left: calc(50% - 12px);\n  top: 100%; }\n\n.jsPanel-connector-right {\n  left: -24px;\n  top: calc(50% - 12px); }\n\n.jsPanel-connector-bottom {\n  left: calc(50% - 12px);\n  top: -24px; }\n\n.jsPanel-connector-left {\n  left: 100%;\n  top: calc(50% - 12px); }\n\n/* IE11 CSS styles go here */\n@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n  #jsPanel-replacement-container .jsPanel-replacement .jsPanel-titlebar {\n    max-width: 105px; } }\n\n/* XXXXXXXXXXXXXXXXXXXXXXX */\n/* bootstrap adjustments */\n.jsPanel.panel-default, .jsPanel.panel-primary, .jsPanel.panel-info, .jsPanel.panel-success, .jsPanel.panel-warning, .jsPanel.panel-danger, .jsPanel.card.card-inverse {\n  box-shadow: 0 0 6px rgba(0, 33, 50, 0.1), 0 7px 25px rgba(17, 38, 60, 0.4); }\n\n.jsPanel.panel {\n  margin: 0; }\n\n.jsPanel-hdr.panel-heading {\n  border-bottom: none;\n  padding: 0; }\n\n.jsPanel-title.panel-title .small, .jsPanel-title.panel-title small {\n  font-size: 75%; }\n\n/* bootstrap 4 adjustments */\n.jsPanel.card.card-inverse {\n  box-shadow: 0 0 6px rgba(0, 33, 50, 0.1), 0 7px 25px rgba(17, 38, 60, 0.4); }\n\n.card-default {\n  background: #f5f5f5; }\n\n.card-primary > .jsPanel-content.jsPanel-content-filled,\n.card-success > .jsPanel-content.jsPanel-content-filled,\n.card-info > .jsPanel-content.jsPanel-content-filled,\n.card-warning > .jsPanel-content.jsPanel-content-filled,\n.card-danger > .jsPanel-content.jsPanel-content-filled {\n  background: transparent;\n  color: #f5f5f5; }\n\n.card-default > .jsPanel-content.jsPanel-content-filled {\n  background: transparent;\n  color: #000000; }\n\n/* css3 animations */\n@keyframes jsPanelFadeIn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.jsPanelFadeIn {\n  opacity: 0;\n  animation: jsPanelFadeIn ease-in 1;\n  animation-fill-mode: forwards;\n  animation-duration: 600ms; }\n\n@keyframes jsPanelFadeOut {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0; } }\n\n.jsPanelFadeOut {\n  animation: jsPanelFadeOut ease-in 1;\n  animation-fill-mode: forwards;\n  animation-duration: 600ms; }\n\n@keyframes modalBackdropFadeIn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 0.65; } }\n\n.jsPanel-modal-backdrop {\n  animation: modalBackdropFadeIn ease-in 1;\n  animation-fill-mode: forwards;\n  animation-duration: 750ms;\n  background: black;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%; }\n\n@keyframes modalBackdropFadeOut {\n  from {\n    opacity: 0.65; }\n  to {\n    opacity: 0; } }\n\n.jsPanel-modal-backdrop-out {\n  animation: modalBackdropFadeOut ease-in 1;\n  animation-fill-mode: forwards;\n  animation-duration: 400ms; }\n\n.jsPanel-modal-backdrop-multi {\n  background: rgba(0, 0, 0, 0.15); }\n\n.jsPanel-content .jsPanel-iframe-overlay {\n  position: absolute;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background: transparent; }\n\n/* _themes_mdl.sass: 2017-07-12 19:16 */\n/* default ---------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-default {\n  background-color: #cfd8dc;\n  border-color: #cfd8dc; }\n\n.jsPanel-theme-default > .jsPanel-hdr * {\n  color: #000000; }\n\n.jsPanel-theme-default > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #90a4ae; }\n\n.jsPanel-theme-default > .jsPanel-content {\n  border-top: 1px solid #90a4ae; }\n\n.jsPanel-theme-default > .jsPanel-content.jsPanel-content-filled {\n  background-color: #cfd8dc;\n  border-top: 1px solid #90a4ae; }\n\n.jsPanel-theme-default > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #eceff1; }\n\n/* primary ---------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-primary {\n  background-color: #2196f3;\n  border-color: #2196f3; }\n\n.jsPanel-theme-primary > .jsPanel-hdr * {\n  color: #ffffff; }\n\n.jsPanel-theme-primary > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #42a5f5; }\n\n.jsPanel-theme-primary > .jsPanel-content {\n  border-top: 1px solid #42a5f5; }\n\n.jsPanel-theme-primary > .jsPanel-content.jsPanel-content-filled {\n  background-color: #2196f3;\n  border-top: 1px solid #42a5f5;\n  color: #ffffff; }\n\n.jsPanel-theme-primary > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #bbdefb;\n  color: #000000; }\n\n/* info ------------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-info {\n  background-color: #29b6f6;\n  border-color: #29b6f6; }\n\n.jsPanel-theme-info > .jsPanel-hdr * {\n  color: #ffffff; }\n\n.jsPanel-theme-info > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #4fc3f7; }\n\n.jsPanel-theme-info > .jsPanel-content {\n  border-top: 1px solid #4fc3f7; }\n\n.jsPanel-theme-info > .jsPanel-content.jsPanel-content-filled {\n  background-color: #29b6f6;\n  border-top: 1px solid #4fc3f7;\n  color: #ffffff; }\n\n.jsPanel-theme-info > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #e1f5fe;\n  color: #000000; }\n\n/* success ---------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-success {\n  background-color: #4caf50;\n  border-color: #4caf50; }\n\n.jsPanel-theme-success > .jsPanel-hdr * {\n  color: #ffffff; }\n\n.jsPanel-theme-success > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #81c784; }\n\n.jsPanel-theme-success > .jsPanel-content.jsPanel-content-filled {\n  background-color: #4caf50;\n  border-top: 1px solid #81c784;\n  color: #ffffff; }\n\n.jsPanel-theme-success > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #e8f5e9;\n  color: #000000; }\n\n/* warning ---------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-warning {\n  background-color: #ffc107;\n  border-color: #ffc107; }\n\n.jsPanel-theme-warning > .jsPanel-hdr * {\n  color: #000000; }\n\n.jsPanel-theme-warning > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #ffd54f; }\n\n.jsPanel-theme-warning > .jsPanel-content.jsPanel-content-filled {\n  background-color: #ffc107;\n  border-top: 1px solid #ffd54f;\n  color: #000000; }\n\n.jsPanel-theme-warning > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #fff3e0;\n  color: #000000; }\n\n/* danger ----------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-danger {\n  background-color: #ff3d00;\n  border-color: #ff3d00; }\n\n.jsPanel-theme-danger > .jsPanel-hdr * {\n  color: #ffffff; }\n\n.jsPanel-theme-danger > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #ff6e40; }\n\n.jsPanel-theme-danger > .jsPanel-content.jsPanel-content-filled {\n  background-color: #ff3d00;\n  border-top: 1px solid #ff6e40;\n  color: #ffffff; }\n\n.jsPanel-theme-danger > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #ff9e80;\n  color: #000000; }\n\n.jsPanel-content.jsPanel-content-noheader {\n  border: none !important; }\n\nbody {\n  -ms-overflow-style: scrollbar; }\n", ""]);

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
exports.push([module.i, "buttplug-devtools-main {\n    width: 100%;\n    height: 100%;\n}\n\nbuttplug-devtools-main section {\n    display: none;\n    padding: 20px;\n    border-top: 1px solid #ddd;\n}\n\nbuttplug-devtools-main input {\n    display: none;\n}\n\nbuttplug-devtools-main label {\n    display: inline-block;\n    margin: 0 0 -1px;\n    padding: 5px 10px;\n    font-weight: 600;\n    text-align: center;\n    color: #bbb;\n    border: 1px solid transparent;\n}\n\nbuttplug-devtools-main label:before {\n    font-family: fontawesome;\n    font-weight: normal;\n    margin-right: 10px;\n}\n\nbuttplug-devtools-main label:hover {\n    color: #888;\n    cursor: pointer;\n}\n\nbuttplug-devtools-main input:checked + label {\n    color: #555;\n    border: 1px solid #ddd;\n    border-top: 2px solid orange;\n    border-bottom: 1px solid #fff;\n}\n\nbuttplug-devtools-main #tab1:checked ~ #content1,\nbuttplug-devtools-main #tab2:checked ~ #content2,\nbuttplug-devtools-main #tab3:checked ~ #content3,\nbuttplug-devtools-main #tab4:checked ~ #content4 {\n    display: block;\n}\n\nbuttplug-devtools-main #content1 {\n    height: 100%;\n}\n\nbuttplug-devtools-main #content2 {\n    height: 100%;\n}\n\nbuttplug-devtools-main #simulator {\n    display: flex;\n    width: 100%;\n    height: calc(100% - 60px);\n    flex-direction: row;\n}\n\nbuttplug-devtools-main .fleshlight-sim {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n    height: 100%;\n    align-items: center;\n    justify-content: center;\n}\n\nbuttplug-devtools-main div.c-fleshlight {\n    display: flex;\n    flex: 1;\n}\n\nbuttplug-devtools-main div.c-fleshlight img {\n    height: 100%;\n    width: auto;\n\t  image-rendering: -moz-crisp-edges;\n\t  image-rendering: -o-crisp-edges;\n\t  image-rendering: -webkit-optimize-contrast;\n\t  image-rendering: pixelated;\n}\n\nbuttplug-devtools-main div.c-fleshlight .o-fleshlight {\n    position: relative;\n    height: 77%;\n}\n\nbuttplug-devtools-main .vibrator-simulator-component {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n    height: 100%;\n    align-items: center;\n    justify-content: center;\n}\n\nbuttplug-devtools-main div.vibrator {\n    flex: 1 1;\n    align-items: center;\n}\n\nbuttplug-devtools-main div.vibrator-simulator-component img {\n    height: calc(100% - 40px);\n    width: auto;\n    position: relative;\n    image-rendering: -moz-crisp-edges;\n\t  image-rendering: -o-crisp-edges;\n\t  image-rendering: -webkit-optimize-contrast;\n\t  image-rendering: pixelated;\n}\n\nbuttplug-devtools-main div.vibrator-info {\n    flex: 0;\n}\n\nbuttplug-devtools-main .simulator-divider {\n    border-left: 1px #000 dashed;\n    height: 100%;\n}\n", ""]);

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
const jsPanel={version:'4.0.0',date:'2018-05-22 09:09',ajaxAlwaysCallbacks:[],autopositionSpacing:4,closeOnEscape:(()=>{document.addEventListener('keydown',n=>{('Escape'===n.key||'Esc'===n.code||27===n.keyCode)&&jsPanel.getPanels(function(){return this.classList.contains('jsPanel')}).some(o=>{return!!o.options.closeOnEscape&&(o.close(),!0)})},!1)})(),defaults:{boxShadow:3,container:document.body,contentSize:{width:'400px',height:'200px'},dragit:{cursor:'move',handles:'.jsPanel-headerlogo, .jsPanel-titlebar, .jsPanel-ftr',opacity:0.8,disableOnMaximized:!0},header:!0,headerTitle:'jsPanel',headerControls:'all',iconfont:!1,maximizedMargin:0,minimizeTo:'default',paneltype:'standard',position:'center',resizeit:{handles:'n, e, s, w, ne, se, sw, nw',minWidth:128,minHeight:128},theme:'default'},defaultSnapConfig:{sensitivity:70,trigger:'panel'},error:(()=>{window.jsPanelError||(window.jsPanelError=function(n){this.name='jsPanelError',this.message=n||'',this.stack=new Error().stack},jsPanelError.prototype=Object.create(Error.prototype),jsPanelError.prototype.constructor=jsPanelError)})(),extensions:{},globalCallbacks:!1,icons:{close:`<svg class="jsPanel-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 28 32"><path fill="currentColor" d="M17.75 16l9.85-9.85c0.5-0.5 0.5-1.3 0-1.75-0.5-0.5-1.3-0.5-1.75 0l-9.85 9.85-9.85-9.9c-0.5-0.5-1.3-0.5-1.75 0-0.5 0.5-0.5 1.3 0 1.75l9.85 9.9-9.9 9.85c-0.5 0.5-0.5 1.3 0 1.75 0.25 0.25 0.55 0.35 0.9 0.35s0.65-0.1 0.9-0.35l9.85-9.85 9.85 9.85c0.25 0.25 0.55 0.35 0.9 0.35s0.65-0.1 0.9-0.35c0.5-0.5 0.5-1.3 0-1.75l-9.9-9.85z"></path></svg>`,maximize:`<svg class="jsPanel-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 28 32"><path fill="currentColor" d="M27.55 3.9h-22.6c-0.55 0-1 0.45-1 1v22.3c0 0.55 0.45 1 1 1h22.55c0.55 0 1-0.45 1-1v-22.3c0.050-0.55-0.4-1-0.95-1zM5.95 26.15v-18h20.55v18h-20.55z"></path></svg>`,normalize:`<svg class="jsPanel-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 28 32"><path fill="currentColor" d="M27.9 3.75h-18.8c-0.4 0-0.75 0.35-0.75 0.75v4.3c0 0.1 0 0.2 0.050 0.3h-4.2c-0.55 0-1 0.45-1 1v17.4c0 0.55 0.45 1 1 1h17.65c0.55 0 1-0.45 1-1v-3.7c0.050 0 0.1 0.050 0.2 0.050h4.9c0.4 0 0.75-0.35 0.75-0.75v-18.6c-0.050-0.4-0.4-0.75-0.8-0.75zM5.2 26.5v-12.95c0.050 0 0.1 0 0.15 0h15.4c0.050 0 0.1 0 0.15 0v12.95h-15.7zM27.15 22.35h-4.15c-0.050 0-0.15 0-0.2 0.050v-12.3c0-0.55-0.45-1-1-1h-12c0.050-0.1 0.050-0.2 0.050-0.3v-3.55h17.3v17.1z"></path></svg>`,minimize:`<svg class="jsPanel-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 28 32"><path fill="currentColor" d="M27.3 28.5h-22.6c-0.85 0-1.5-0.65-1.5-1.5s0.65-1.5 1.5-1.5h22.55c0.85 0 1.5 0.65 1.5 1.5s-0.65 1.5-1.45 1.5z"></path></svg>`,smallifyrev:`<svg class="jsPanel-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 28 32"><path fill="currentColor" d="M15.95 23.2c0 0 0 0 0 0-0.35 0-0.65-0.15-0.9-0.35l-11.7-11.9c-0.5-0.5-0.5-1.3 0-1.75 0.5-0.5 1.3-0.5 1.75 0l10.85 10.95 10.9-10.8c0.5-0.5 1.3-0.5 1.75 0s0.5 1.3 0 1.75l-11.75 11.7c-0.25 0.25-0.55 0.4-0.9 0.4z"></path></svg>`,smallify:`<svg class="jsPanel-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 28 32"><path fill="currentColor" d="M28.65 20.85l-11.8-11.65c-0.5-0.5-1.3-0.5-1.75 0l-11.75 11.85c-0.5 0.5-0.5 1.3 0 1.75 0.25 0.25 0.55 0.35 0.9 0.35 0.3 0 0.65-0.1 0.9-0.35l10.85-10.95 10.9 10.8c0.5 0.5 1.3 0.5 1.75 0 0.5-0.5 0.5-1.3 0-1.8z"></path></svg>`},idCounter:0,isIE:(()=>{return navigator.appVersion.match(/Trident/)})(),mdbthemes:['secondary','elegant','stylish','unique','special'],pointerdown:'ontouchend'in window?['touchstart','mousedown']:['mousedown'],pointermove:'ontouchend'in window?['touchmove','mousemove']:['mousemove'],pointerup:'ontouchend'in window?['touchend','mouseup']:['mouseup'],polyfills:(()=>{(function(n){n.forEach(function(o){o.append=o.append||function(){let c=Array.prototype.slice.call(arguments),f=document.createDocumentFragment();c.forEach(function(m){let u=m instanceof Node;f.appendChild(u?m:document.createTextNode(m+''))}),this.appendChild(f)}})})([Element.prototype,Document.prototype,DocumentFragment.prototype]),window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(n){let c,o=(this.document||this.ownerDocument).querySelectorAll(n),f=this;do for(c=o.length;0<=--c&&o.item(c)!==f;);while(0>c&&(f=f.parentElement));return f}),window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=function(n,o){o=o||window;for(let c=0;c<this.length;c++)n.call(o,this[c],c,this)}),Object.assign||Object.defineProperty(Object,'assign',{enumerable:!1,configurable:!0,writable:!0,value:function(n){if(n===void 0||null===n)throw new TypeError('Cannot convert first argument to object');let o=Object(n);for(let f,c=1;c<arguments.length;c++)if(f=arguments[c],void 0!==f&&null!==f){f=Object(f);let m=Object.keys(Object(f));for(let u=0,y=m.length;u<y;u++){let v=m[u],x=Object.getOwnPropertyDescriptor(f,v);void 0!==x&&x.enumerable&&(o[v]=f[v])}}return o}}),function(){function n(o,c){c=c||{bubbles:!1,cancelable:!1,detail:void 0};let f=document.createEvent('CustomEvent');return f.initCustomEvent(o,c.bubbles,c.cancelable,c.detail),f}return'function'!=typeof window.CustomEvent&&void(n.prototype=window.Event.prototype,window.CustomEvent=n)}(),String.prototype.endsWith||(String.prototype.endsWith=function(n,o){return o<this.length?o|=0:o=this.length,this.substr(o-n.length,n.length)===n}),String.prototype.startsWith||(String.prototype.startsWith=function(n,o){return this.substr(o||0,n.length)===n})})(),themes:['default','primary','info','success','warning','danger'],ziBase:100,ajax(obj,ajaxConfig){let objIsPanel;'object'==typeof obj&&obj.classList.contains('jsPanel')?objIsPanel=!0:(objIsPanel=!1,'string'==typeof obj&&(obj=document.querySelector(obj)));const conf=ajaxConfig,configDefaults={method:'GET',async:!0,user:'',pwd:'',done:function(){objIsPanel?obj.content.innerHTML=this.responseText:obj.innerHTML=this.responseText},autoresize:!0,autoreposition:!0};let config;if('string'==typeof conf)config=Object.assign({},configDefaults,{url:encodeURI(conf),evalscripttags:!0});else if('object'==typeof conf&&conf.url)config=Object.assign({},configDefaults,conf),config.url=encodeURI(conf.url),!1===config.async&&(config.timeout=0,config.withCredentials&&(config.withCredentials=void 0),config.responseType&&(config.responseType=void 0));else return console.info('XMLHttpRequest seems to miss the request url!'),obj;const xhr=new XMLHttpRequest;return xhr.onreadystatechange=()=>{if(4===xhr.readyState){if(200!==xhr.status)config.fail&&config.fail.call(xhr,obj);else if(config.done.call(xhr,obj),config.evalscripttags){const scripttags=xhr.responseText.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi);scripttags&&scripttags.forEach(tag=>{let js=tag.replace(/<script\b[^>]*>/i,'').replace(/<\/script>/i,'').trim();eval(js)})}if(config.always&&config.always.call(xhr,obj),objIsPanel){const n=obj.options.contentSize;if('string'==typeof n&&n.match(/auto/i)){const o=n.split(' '),c=Object.assign({},{width:o[0],height:o[1]});config.autoresize&&obj.resize(c),!obj.classList.contains('jsPanel-contextmenu')&&config.autoreposition&&obj.reposition()}else if('object'==typeof n&&('auto'===n.width||'auto'===n.height)){const o=Object.assign({},n);config.autoresize&&obj.resize(o),!obj.classList.contains('jsPanel-contextmenu')&&config.autoreposition&&obj.reposition()}}jsPanel.ajaxAlwaysCallbacks.length&&jsPanel.ajaxAlwaysCallbacks.forEach(n=>{n.call(obj,obj)})}},xhr.open(config.method,config.url,config.async,config.user,config.pwd),xhr.timeout=config.timeout||0,config.withCredentials&&(xhr.withCredentials=config.withCredentials),config.responseType&&(xhr.responseType=config.responseType),config.beforeSend&&config.beforeSend.call(xhr),config.data?xhr.send(config.data):xhr.send(null),obj},calcColors(n){const o=this.color(n),c=this.lighten(n,0.81),f=this.darken(n,0.5),m=0.556>=this.perceivedBrightness(n)?'#ffffff':'#000000',u=0.556>=this.perceivedBrightness(c)?'#ffffff':'#000000',y=0.556>=this.perceivedBrightness(f)?'#000000':'#ffffff';return[o.hsl.css,c,f,m,u,y]},color(n){let c,f,m,u,y,v,x,E,z,o=n.toLowerCase(),C={};const S=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/gi,j=/^rgba?\(([0-9]{1,3}),([0-9]{1,3}),([0-9]{1,3}),?(0|1|0\.[0-9]{1,2}|\.[0-9]{1,2})?\)$/gi,P=/^hsla?\(([0-9]{1,3}),([0-9]{1,3}%),([0-9]{1,3}%),?(0|1|0\.[0-9]{1,2}|\.[0-9]{1,2})?\)$/gi,T={aliceblue:'f0f8ff',antiquewhite:'faebd7',aqua:'0ff',aquamarine:'7fffd4',azure:'f0ffff',beige:'f5f5dc',bisque:'ffe4c4',black:'000',blanchedalmond:'ffebcd',blue:'00f',blueviolet:'8a2be2',brown:'a52a2a',burlywood:'deb887',cadetblue:'5f9ea0',chartreuse:'7fff00',chocolate:'d2691e',coral:'ff7f50',cornflowerblue:'6495ed',cornsilk:'fff8dc',crimson:'dc143c',cyan:'0ff',darkblue:'00008b',darkcyan:'008b8b',darkgoldenrod:'b8860b',darkgray:'a9a9a9',darkgrey:'a9a9a9',darkgreen:'006400',darkkhaki:'bdb76b',darkmagenta:'8b008b',darkolivegreen:'556b2f',darkorange:'ff8c00',darkorchid:'9932cc',darkred:'8b0000',darksalmon:'e9967a',darkseagreen:'8fbc8f',darkslateblue:'483d8b',darkslategray:'2f4f4f',darkslategrey:'2f4f4f',darkturquoise:'00ced1',darkviolet:'9400d3',deeppink:'ff1493',deepskyblue:'00bfff',dimgray:'696969',dimgrey:'696969',dodgerblue:'1e90ff',firebrick:'b22222',floralwhite:'fffaf0',forestgreen:'228b22',fuchsia:'f0f',gainsboro:'dcdcdc',ghostwhite:'f8f8ff',gold:'ffd700',goldenrod:'daa520',gray:'808080',grey:'808080',green:'008000',greenyellow:'adff2f',honeydew:'f0fff0',hotpink:'ff69b4',indianred:'cd5c5c',indigo:'4b0082',ivory:'fffff0',khaki:'f0e68c',lavender:'e6e6fa',lavenderblush:'fff0f5',lawngreen:'7cfc00',lemonchiffon:'fffacd',lightblue:'add8e6',lightcoral:'f08080',lightcyan:'e0ffff',lightgoldenrodyellow:'fafad2',lightgray:'d3d3d3',lightgrey:'d3d3d3',lightgreen:'90ee90',lightpink:'ffb6c1',lightsalmon:'ffa07a',lightseagreen:'20b2aa',lightskyblue:'87cefa',lightslategray:'789',lightslategrey:'789',lightsteelblue:'b0c4de',lightyellow:'ffffe0',lime:'0f0',limegreen:'32cd32',linen:'faf0e6',magenta:'f0f',maroon:'800000',mediumaquamarine:'66cdaa',mediumblue:'0000cd',mediumorchid:'ba55d3',mediumpurple:'9370d8',mediumseagreen:'3cb371',mediumslateblue:'7b68ee',mediumspringgreen:'00fa9a',mediumturquoise:'48d1cc',mediumvioletred:'c71585',midnightblue:'191970',mintcream:'f5fffa',mistyrose:'ffe4e1',moccasin:'ffe4b5',navajowhite:'ffdead',navy:'000080',oldlace:'fdf5e6',olive:'808000',olivedrab:'6b8e23',orange:'ffa500',orangered:'ff4500',orchid:'da70d6',palegoldenrod:'eee8aa',palegreen:'98fb98',paleturquoise:'afeeee',palevioletred:'d87093',papayawhip:'ffefd5',peachpuff:'ffdab9',peru:'cd853f',pink:'ffc0cb',plum:'dda0dd',powderblue:'b0e0e6',purple:'800080',rebeccapurple:'639',red:'f00',rosybrown:'bc8f8f',royalblue:'4169e1',saddlebrown:'8b4513',salmon:'fa8072',sandybrown:'f4a460',seagreen:'2e8b57',seashell:'fff5ee',sienna:'a0522d',silver:'c0c0c0',skyblue:'87ceeb',slateblue:'6a5acd',slategray:'708090',slategrey:'708090',snow:'fffafa',springgreen:'00ff7f',steelblue:'4682b4',tan:'d2b48c',teal:'008080',thistle:'d8bfd8',tomato:'ff6347',turquoise:'40e0d0',violet:'ee82ee',wheat:'f5deb3',white:'fff',whitesmoke:'f5f5f5',yellow:'ff0',yellowgreen:'9acd32'};return T[o]&&(o=T[o]),null===o.match(S)?o.match(j)?(x=j.exec(o),C.rgb={css:o,r:x[1],g:x[2],b:x[3]},C.hex=this.rgbToHex(x[1],x[2],x[3]),z=this.rgbToHsl(x[1],x[2],x[3]),C.hsl=z):o.match(P)?(x=P.exec(o),u=x[1]/360,y=x[2].substr(0,x[2].length-1)/100,v=x[3].substr(0,x[3].length-1)/100,E=this.hslToRgb(u,y,v),C.rgb={css:`rgb(${E[0]},${E[1]},${E[2]})`,r:E[0],g:E[1],b:E[2]},C.hex=this.rgbToHex(C.rgb.r,C.rgb.g,C.rgb.b),C.hsl={css:`hsl(${x[1]},${x[2]},${x[3]})`,h:x[1],s:x[2],l:x[3]}):(C.hex='#f5f5f5',C.rgb={css:'rgb(245,245,245)',r:245,g:245,b:245},C.hsl={css:'hsl(0,0%,96.08%)',h:0,s:'0%',l:'96.08%'}):(o=o.replace('#',''),1==o.length%2?(c=o.substr(0,1)+''+o.substr(0,1),f=o.substr(1,1)+''+o.substr(1,1),m=o.substr(2,1)+''+o.substr(2,1),C.rgb={r:parseInt(c,16),g:parseInt(f,16),b:parseInt(m,16)},C.hex=`#${c}${f}${m}`):(C.rgb={r:parseInt(o.substr(0,2),16),g:parseInt(o.substr(2,2),16),b:parseInt(o.substr(4,2),16)},C.hex=`#${o}`),z=this.rgbToHsl(C.rgb.r,C.rgb.g,C.rgb.b),C.hsl=z,C.rgb.css=`rgb(${C.rgb.r},${C.rgb.g},${C.rgb.b})`),C},createPanelTemplate(n=!0){const o=document.createElement('div');return o.className='jsPanel',n&&['close','maximize','normalize','minimize','smallify','smallifyrev'].forEach(c=>{o.setAttribute(`data-btn${c}`,'enabled')}),o.innerHTML=`<div class="jsPanel-hdr"><div class="jsPanel-headerbar"><div class="jsPanel-headerlogo"></div><div class="jsPanel-titlebar"><span class="jsPanel-title"></span></div><div class="jsPanel-controlbar"><div class="jsPanel-btn jsPanel-btn-smallify">${this.icons.smallify}</div><div class="jsPanel-btn jsPanel-btn-smallifyrev">${this.icons.smallifyrev}</div><div class="jsPanel-btn jsPanel-btn-minimize">${this.icons.minimize}</div><div class="jsPanel-btn jsPanel-btn-normalize">${this.icons.normalize}</div><div class="jsPanel-btn jsPanel-btn-maximize">${this.icons.maximize}</div><div class="jsPanel-btn jsPanel-btn-close">${this.icons.close}</div></div></div><div class="jsPanel-hdr-toolbar"></div></div><div class="jsPanel-content"></div><div class="jsPanel-minimized-box"></div><div class="jsPanel-ftr"></div>`,o},createMinimizedTemplate(){const n=document.createElement('div');return n.className='jsPanel-replacement',n.innerHTML=`<div class="jsPanel-hdr"><div class="jsPanel-headerbar"><div class="jsPanel-headerlogo"></div><div class="jsPanel-titlebar"><span class="jsPanel-title"></span></div><div class="jsPanel-controlbar"><div class="jsPanel-btn jsPanel-btn-normalize">${this.icons.normalize}</div><div class="jsPanel-btn jsPanel-btn-maximize">${this.icons.maximize}</div><div class="jsPanel-btn jsPanel-btn-close">${this.icons.close}</div></div></div></div>`,n},createSnapArea(n,o,c){const f=document.createElement('div'),m=n.parentElement;f.className=`jsPanel-snap-area jsPanel-snap-area-${o}`,'lt'===o||'rt'===o||'rb'===o||'lb'===o?(f.style.width=c+'px',f.style.height=c+'px'):'ct'===o||'cb'===o?f.style.height=c+'px':('lc'==o||'rc'==o)&&(f.style.width=c+'px'),m!==document.body&&(f.style.position='absolute'),document.querySelector(`.jsPanel-snap-area.jsPanel-snap-area-${o}`)||n.parentElement.appendChild(f)},darken(n,o){const c=this.color(n).hsl,f=parseFloat(c.l);return`hsl(${c.h},${c.s},${f-f*o+'%'})`},dragit(n,o={}){let c,m,u,f=Object.assign({},this.defaults.dragit,o),y=[];const v=new CustomEvent('jspaneldragstart',{detail:n.id}),x=new CustomEvent('jspaneldrag',{detail:n.id}),E=new CustomEvent('jspaneldragstop',{detail:n.id});return f.grid&&Array.isArray(f.grid)&&1===f.grid.length&&(f.grid[1]=f.grid[0]),u=this.pOcontainment(f.containment),n.querySelectorAll(f.handles).forEach(z=>{z.style.touchAction='none',z.style.cursor=f.cursor,jsPanel.pointerdown.forEach(C=>{z.addEventListener(C,S=>{if(S.preventDefault(),!S.target.closest('.jsPanel-ftr-btn')){n.controlbar.style.pointerEvents='none',y=document.querySelectorAll('iframe'),y.length&&y.forEach(B=>{B.style.pointerEvents='none'});const j=window.getComputedStyle(n),P=parseFloat(j.left),T=parseFloat(j.top),L=S.touches?S.touches[0].clientX:S.clientX,k=S.touches?S.touches[0].clientY:S.clientY,A=n.parentElement,W=A.getBoundingClientRect(),H=window.getComputedStyle(A);let R=0;m=B=>{if(B.preventDefault(),!c){if(document.dispatchEvent(v),n.style.opacity=f.opacity,n.snapped&&f.snap.resizeToPreSnap&&n.currentData.beforeSnap){n.resize(n.currentData.beforeSnap.width+' '+n.currentData.beforeSnap.height);let se=n.getBoundingClientRect(),re=L-(se.left+se.width),de=se.width/2;re>-de&&(R=re+de)}f.start&&jsPanel.processCallbacks(n,f.start,!1,{left:P,top:T}),jsPanel.front(n),n.snapped=!1}if(c=1,f.disableOnMaximized&&'maximized'===n.status)return!1;let D,O,M,I,N,X,Y,F,V,_;const K=B.touches?B.touches[0].clientX:B.clientX,G=B.touches?B.touches[0].clientY:B.clientY,U=window.getComputedStyle(n);if(A===document.body){let se=n.getBoundingClientRect();V=window.innerWidth-parseInt(H.borderLeftWidth,10)-parseInt(H.borderRightWidth,10)-(se.left+se.width),_=window.innerHeight-parseInt(H.borderTopWidth,10)-parseInt(H.borderBottomWidth,10)-(se.top+se.height)}else V=parseInt(H.width,10)-parseInt(H.borderLeftWidth,10)-parseInt(H.borderRightWidth,10)-(parseInt(U.left,10)+parseInt(U.width,10)),_=parseInt(H.height,10)-parseInt(H.borderTopWidth,10)-parseInt(H.borderBottomWidth,10)-(parseInt(U.top,10)+parseInt(U.height,10));D=parseFloat(U.left),M=parseFloat(U.top),N=V,Y=_,f.snap&&('panel'===f.snap.trigger?O=Math.pow(D,2):'pointer'===f.snap.trigger&&(D=K,O=Math.pow(K,2),M=G,N=window.innerWidth-K,Y=window.innerHeight-G),I=Math.pow(M,2),X=Math.pow(N,2),F=Math.pow(Y,2));const Z=Math.sqrt(O+I),J=Math.sqrt(O+F),Q=Math.sqrt(X+I),ee=Math.sqrt(X+F),te=Math.abs(D-N)/2,ne=Math.abs(M-Y)/2,ae=Math.sqrt(O+Math.pow(ne,2)),oe=Math.sqrt(I+Math.pow(te,2)),ie=Math.sqrt(X+Math.pow(ne,2)),le=Math.sqrt(F+Math.pow(te,2));if(window.getSelection().removeAllRanges(),document.dispatchEvent(x),f.axis&&'x'!==f.axis||(n.style.left=P+(K-L)+R+'px'),f.axis&&'y'!==f.axis||(n.style.top=T+(G-k)+'px'),f.grid){const se=parseFloat(U.left),re=parseFloat(U.top),de=se%f.grid[0],ce=re%f.grid[1];n.style.left=de<f.grid[0]/2?se-de+'px':se+(f.grid[0]-de)+'px',n.style.top=ce<f.grid[1]/2?re-ce+'px':re+(f.grid[1]-ce)+'px'}if(f.containment||0===f.containment){let se,re;if(n.options.container===document.body)se=window.innerWidth-parseFloat(U.width)-u[1],re=window.innerHeight-parseFloat(U.height)-u[2];else{const de=parseFloat(H.borderLeftWidth)+parseFloat(H.borderRightWidth),ce=parseFloat(H.borderTopWidth)+parseFloat(H.borderBottomWidth);se=W.width-parseFloat(U.width)-u[1]-de,re=W.height-parseFloat(U.height)-u[2]-ce}parseFloat(n.style.left)<=u[3]&&(n.style.left=u[3]+'px'),parseFloat(n.style.top)<=u[0]&&(n.style.top=u[0]+'px'),parseFloat(n.style.left)>=se&&(n.style.left=se+'px'),parseFloat(n.style.top)>=re&&(n.style.top=re+'px')}if(f.drag&&jsPanel.processCallbacks(n,f.drag,!1,{left:D,top:M,right:N,bottom:Y}),f.snap){const se=f.snap.sensitivity,re=A===document.body?window.innerWidth/8:W.width/8,de=A===document.body?window.innerHeight/8:W.height/8;n.snappableTo=!1,jsPanel.removeSnapAreas(n),Z<se?(n.snappableTo='left-top',!1!==f.snap.snapLeftTop&&jsPanel.createSnapArea(n,'lt',se)):J<se?(n.snappableTo='left-bottom',!1!==f.snap.snapLeftBottom&&jsPanel.createSnapArea(n,'lb',se)):Q<se?(n.snappableTo='right-top',!1!==f.snap.snapRightTop&&jsPanel.createSnapArea(n,'rt',se)):ee<se?(n.snappableTo='right-bottom',!1!==f.snap.snapRightBottom&&jsPanel.createSnapArea(n,'rb',se)):M<se&&oe<re?(n.snappableTo='center-top',!1!==f.snap.snapCenterTop&&jsPanel.createSnapArea(n,'ct',se)):D<se&&ae<de?(n.snappableTo='left-center',!1!==f.snap.snapLeftCenter&&jsPanel.createSnapArea(n,'lc',se)):N<se&&ie<de?(n.snappableTo='right-center',!1!==f.snap.snapRightCenter&&jsPanel.createSnapArea(n,'rc',se)):Y<se&&le<re&&(n.snappableTo='center-bottom',!1!==f.snap.snapCenterBottom&&jsPanel.createSnapArea(n,'cb',se))}},jsPanel.pointermove.forEach(function(B){document.addEventListener(B,m)})}})}),jsPanel.pointerup.forEach(function(C){document.addEventListener(C,()=>{jsPanel.pointermove.forEach(function(S){document.removeEventListener(S,m)}),document.body.style.overflow='inherit',jsPanel.removeSnapAreas(n),c&&(document.dispatchEvent(E),n.style.opacity=1,c=void 0,n.saveCurrentPosition(),f.snap&&('left-top'===n.snappableTo?jsPanel.snapPanel(n,f.snap.snapLeftTop):'center-top'===n.snappableTo?jsPanel.snapPanel(n,f.snap.snapCenterTop):'right-top'===n.snappableTo?jsPanel.snapPanel(n,f.snap.snapRightTop):'right-center'===n.snappableTo?jsPanel.snapPanel(n,f.snap.snapRightCenter):'right-bottom'===n.snappableTo?jsPanel.snapPanel(n,f.snap.snapRightBottom):'center-bottom'===n.snappableTo?jsPanel.snapPanel(n,f.snap.snapCenterBottom):'left-bottom'===n.snappableTo?jsPanel.snapPanel(n,f.snap.snapLeftBottom):'left-center'===n.snappableTo&&jsPanel.snapPanel(n,f.snap.snapLeftCenter),f.snap.callback&&n.snappableTo&&'function'==typeof f.snap.callback&&f.snap.callback.call(n,n),n.snappableTo&&f.snap.repositionOnSnap&&n.repositionOnSnap(n.snappableTo)),f.stop&&jsPanel.processCallbacks(n,f.stop,!1,{left:parseFloat(n.style.left),top:parseFloat(n.style.top)})),n.controlbar.style.pointerEvents='inherit',y.length&&y.forEach(function(S){S.style.pointerEvents='inherit'})})}),f.disable&&(z.style.pointerEvents='none')}),n},emptyNode(n){for(;n.firstChild;)n.removeChild(n.firstChild);return n},extend(n){if('[object Object]'===Object.prototype.toString.call(n))for(let o in n)n.hasOwnProperty(o)&&(this.extensions[o]=n[o])},fetch(obj){let conf=obj.options.contentFetch,confDefaults={bodyMethod:'text',evalscripttags:!0,autoresize:!0,autoreposition:!0,done:function(n,o){n.content.innerHTML=o}};conf='string'==typeof conf?Object.assign({resource:obj.options.contentFetch},confDefaults):Object.assign(confDefaults,conf);let fetchInit=conf.fetchInit||{};conf.beforeSend&&conf.beforeSend.call(obj,obj),fetch(conf.resource,fetchInit).then(function(n){if(n.ok)return n[conf.bodyMethod]();throw new Error('Network response was not ok.')}).then(function(response){if(conf.done.call(obj,obj,response),conf.evalscripttags){const scripttags=response.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi);scripttags&&scripttags.forEach(tag=>{let js=tag.replace(/<script\b[^>]*>/i,'').replace(/<\/script>/i,'').trim();eval(js)})}const oContentSize=obj.options.contentSize;if(conf.autoresize||conf.autoreposition)if('string'==typeof oContentSize&&oContentSize.match(/auto/i)){const n=oContentSize.split(' '),o=Object.assign({},{width:n[0],height:n[1]});conf.autoresize&&obj.resize(o),!obj.classList.contains('jsPanel-contextmenu')&&conf.autoreposition&&obj.reposition()}else if('object'==typeof oContentSize&&('auto'===oContentSize.width||'auto'===oContentSize.height)){const n=Object.assign({},oContentSize);conf.autoresize&&obj.resize(n),!obj.classList.contains('jsPanel-contextmenu')&&conf.autoreposition&&obj.reposition()}}).catch(function(n){console.error('There has been a problem with your fetch operation: '+n.message)})},front(n){if('minimized'===n.status)'maximized'===n.statusBefore?n.maximize():n.normalize();else{const o=Array.prototype.slice.call(document.querySelectorAll('.jsPanel-standard')).map(c=>{return c.style.zIndex});Math.max(...o)>n.style.zIndex&&(n.style.zIndex=jsPanel.zi.next()),this.resetZi()}this.getPanels().forEach(function(o,c){let f=o.content.querySelector('.jsPanel-iframe-overlay');if(!(0<c))f&&o.content.removeChild(f);else if(o.content.querySelector('iframe')&&!f){let m=document.createElement('div');m.className='jsPanel-iframe-overlay',o.content.appendChild(m)}})},getPanels(n=function(){return this.classList.contains('jsPanel-standard')}){return Array.prototype.slice.call(document.querySelectorAll('.jsPanel')).filter(o=>{return n.call(o,o)}).sort((o,c)=>{return c.style.zIndex-o.style.zIndex})},hslToRgb(n,o,c){let f,m,u;if(0===o)f=m=u=c;else{let y=(E,z,C)=>{return 0>C&&(C+=1),1<C&&(C-=1),C<1/6?E+6*(z-E)*C:C<1/2?z:C<2/3?E+6*((z-E)*(2/3-C)):E},v=0.5>c?c*(1+o):c+o-c*o,x=2*c-v;f=y(x,v,n+1/3),m=y(x,v,n),u=y(x,v,n-1/3)}return[Math.round(255*f),Math.round(255*m),Math.round(255*u)]},lighten(n,o){const c=this.color(n).hsl,f=parseFloat(c.l);return`hsl(${c.h},${c.s},${f+(100-f)*o+'%'})`},perceivedBrightness(n){const o=this.color(n).rgb;return 0.2627*(o.r/255)+0.678*(o.g/255)+0.0593*(o.b/255)},pOcontainer(n,o){if(n){let f;if('string'==typeof n?f=document.querySelector(n):1===n.nodeType?f=n:n.length&&(f=n[0]),f&&1===f.nodeType)return f}const c=new jsPanelError('NO NEW PANEL CREATED!\nThe container to append the panel to does not exist or a container was not specified!');try{throw c}catch(f){o&&o.call(f,f)}return c},pOcontainment(n){if('number'==typeof n)return[n,n,n,n];if(Array.isArray(n)){if(1===n.length)return[n[0],n[0],n[0],n[0]];if(2===n.length)return n.concat(n);3===n.length&&(n[3]=n[1])}return n},pOsize(n,o){let c=o||this.defaults.contentSize,f=n.parentElement;if('string'==typeof c){let m=c.trim().split(' ');c={},c.width=m[0],c.height=2===m.length?m[1]:m[0]}else c.width&&!c.height?c.height=c.width:c.height&&!c.width&&(c.width=c.height);if((c.width+'').match(/^[0-9.]+$/gi))c.width+='px';else if(!('string'==typeof c.width&&c.width.endsWith('%')))'function'==typeof c.width&&(c.width=c.width.call(n,n),'number'==typeof c.width?c.width+='px':'string'==typeof c.width&&c.width.match(/^[0-9.]+$/gi)&&(c.width+='px'));else if(f===document.body)c.width=window.innerWidth*(parseFloat(c.width)/100)+'px';else{const m=window.getComputedStyle(f),u=parseFloat(m.borderLeftWidth)+parseFloat(m.borderRightWidth);c.width=(parseFloat(m.width)-u)*(parseFloat(c.width)/100)+'px'}if((c.height+'').match(/^[0-9.]+$/gi))c.height+='px';else if(!('string'==typeof c.height&&c.height.endsWith('%')))'function'==typeof c.height&&(c.height=c.height.call(n,n),'number'==typeof c.height?c.height+='px':'string'==typeof c.height&&c.height.match(/^[0-9.]+$/gi)&&(c.height+='px'));else if(f===document.body)c.height=window.innerHeight*(parseFloat(c.height)/100)+'px';else{const m=window.getComputedStyle(f),u=parseFloat(m.borderTopWidth)+parseFloat(m.borderBottomWidth);c.height=(parseFloat(m.height)-u)*(parseFloat(c.height)/100)+'px'}return c},pOposition(n){const o=n.match(/\b[a-z]{4,6}-{1}[a-z]{3,6}\b/i),c=n.match(/down|up|right([^-]|$)|left([^-]|$)/i),f=n.match(/[+-]?\d?\.?\d+([a-z%]{2,4}\b|%?)/gi);let m;return m=o?{my:o[0].toLowerCase(),at:o[0].toLowerCase()}:{my:'center',at:'center'},c&&(m.autoposition=c[0].toLowerCase()),f&&(f.forEach((u,y)=>{u.match(/^[+-]?[0-9]*$/)&&(f[y]+='px'),f[y]=f[y].toLowerCase()}),1===f.length?(m.offsetX=f[0],m.offsetY=f[0]):(m.offsetX=f[0],m.offsetY=f[1])),m},position(n,o){let c,f,m,u={left:0,top:0},y=0,v=0,x=0,E=0;const z={my:'center',at:'center',of:'window',offsetX:'0px',offsetY:'0px'},C={width:document.documentElement.clientWidth,height:window.innerHeight},S=pageXOffset,j=pageYOffset;if(c='string'==typeof n?document.querySelector(n):n,!o)return c.style.opacity=1,c;const P=c.getBoundingClientRect();f='string'==typeof o?Object.assign({},z,jsPanel.pOposition(o)):Object.assign({},z,o);const T=c.parentElement,L=window.getComputedStyle(T),k=T.getBoundingClientRect(),A=T.tagName.toLowerCase();if(f.of&&'window'!==f.of&&('string'==typeof f.of?m=document.querySelector(f.of):m=f.of),f.my.match(/^center-top$|^center$|^center-bottom$/i)?y=P.width/2:f.my.match(/right/i)&&(y=P.width),f.my.match(/^left-center$|^center$|^right-center$/i)?v=P.height/2:f.my.match(/bottom/i)&&(v=P.height),'body'===A&&'window'===f.of)f.at.match(/^center-top$|^center$|^center-bottom$/i)?x=C.width/2:f.at.match(/right/i)&&(x=C.width),f.at.match(/^left-center$|^center$|^right-center$/i)?E=C.height/2:f.at.match(/bottom/i)&&(E=C.height),u.left=x-y-parseFloat(L.borderLeftWidth),u.top=E-v-parseFloat(L.borderTopWidth),c.style.position='fixed';else if('body'===A&&'window'!==f.of){const W=m.getBoundingClientRect();x=f.at.match(/^center-top$|^center$|^center-bottom$/i)?W.width/2+W.left+S:f.at.match(/right/i)?W.width+W.left+S:W.left+S,E=f.at.match(/^left-center$|^center$|^right-center$/i)?W.height/2+W.top+j:f.at.match(/bottom/i)?W.height+W.top+j:W.top+j,u.left=x-y-parseFloat(L.borderLeftWidth),u.top=E-v-parseFloat(L.borderTopWidth)}else if('body'!==A&&('window'===f.of||!f.of)){const W=parseFloat(L.borderLeftWidth)+parseFloat(L.borderRightWidth),H=parseFloat(L.borderTopWidth)+parseFloat(L.borderBottomWidth);f.at.match(/^center-top$|^center$|^center-bottom$/i)?x=k.width/2-W/2:f.at.match(/right/i)&&(x=k.width-W),f.at.match(/^left-center$|^center$|^right-center$/i)?E=k.height/2-H/2:f.at.match(/bottom/i)&&(E=k.height-H),u.left=x-y,u.top=E-v}else if('body'!==A&&T.contains(m)){const W=m.getBoundingClientRect();x=f.at.match(/^center-top$|^center$|^center-bottom$/i)?W.left-k.left+W.width/2:f.at.match(/right/i)?W.left-k.left+W.width:W.left-k.left,E=f.at.match(/^left-center$|^center$|^right-center$/i)?W.top-k.top+W.height/2:f.at.match(/bottom/i)?W.top-k.top+W.height:W.top-k.top,u.left=x-y-parseFloat(L.borderLeftWidth),u.top=E-v-parseFloat(L.borderTopWidth)}if(f.autoposition&&f.my===f.at&&0<=['left-top','center-top','right-top','left-bottom','center-bottom','right-bottom'].indexOf(f.my)){const W=`${f.my}-${f.autoposition.toLowerCase()}`;c.classList.add(W);const H=Array.prototype.slice.call(document.querySelectorAll(`.${W}`)),R=H.indexOf(c);1<H.length&&('down'===f.autoposition?H.forEach((B,D)=>{0<D&&D<=R&&(u.top+=H[--D].getBoundingClientRect().height+jsPanel.autopositionSpacing)}):'up'===f.autoposition?H.forEach((B,D)=>{0<D&&D<=R&&(u.top-=H[--D].getBoundingClientRect().height+jsPanel.autopositionSpacing)}):'right'===f.autoposition?H.forEach((B,D)=>{0<D&&D<=R&&(u.left+=H[--D].getBoundingClientRect().width+jsPanel.autopositionSpacing)}):'left'===f.autoposition&&H.forEach((B,D)=>{0<D&&D<=R&&(u.left-=H[--D].getBoundingClientRect().width+jsPanel.autopositionSpacing)}))}if(u.left+='px',u.top+='px',c.style.left=u.left,c.style.top=u.top,f.offsetX&&(c.style.left='number'==typeof f.offsetX?`calc(${u.left} + ${f.offsetX}px)`:`calc(${u.left} + ${f.offsetX})`,u.left=window.getComputedStyle(c).left),f.offsetY&&(c.style.top='number'==typeof f.offsetY?`calc(${u.top} + ${f.offsetY}px)`:`calc(${u.top} + ${f.offsetY})`,u.top=window.getComputedStyle(c).top),f.minLeft){let W=parseFloat(u.left);'number'==typeof f.minLeft&&(f.minLeft+='px'),c.style.left=f.minLeft;let H=parseFloat(window.getComputedStyle(c).left);W>H&&(c.style.left=W+'px'),u.left=window.getComputedStyle(c).left}if(f.maxLeft){let W=parseFloat(u.left);'number'==typeof f.maxLeft&&(f.maxLeft+='px'),c.style.left=f.maxLeft;let H=parseFloat(window.getComputedStyle(c).left);W<H&&(c.style.left=W+'px'),u.left=window.getComputedStyle(c).left}if(f.maxTop){let W=parseFloat(u.top);'number'==typeof f.maxTop&&(f.maxTop+='px'),c.style.top=f.maxTop;let H=parseFloat(window.getComputedStyle(c).top);W<H&&(c.style.top=W+'px'),u.top=window.getComputedStyle(c).top}if(f.minTop){let W=parseFloat(u.top);'number'==typeof f.minTop&&(f.minTop+='px'),c.style.top=f.minTop;let H=parseFloat(window.getComputedStyle(c).top);W>H&&(c.style.top=W+'px'),u.top=window.getComputedStyle(c).top}if('function'==typeof f.modify){let W=f.modify.call(u,u);c.style.left=W.left,c.style.top=W.top}return c.style.opacity=1,c.style.left=window.getComputedStyle(c).left,c.style.top=window.getComputedStyle(c).top,c},processCallbacks(n,o,c='some',f){return'function'==typeof o&&(o=[o]),c?o[c](function(m){if('function'==typeof m)return m.call(n,n,f)}):void o.forEach(function(m){m.call(n,n,f)})},rgbToHsl(n,o,c){n/=255,o/=255,c/=255;let u,y,f=Math.max(n,o,c),m=Math.min(n,o,c),v=(f+m)/2;if(f===m)u=y=0;else{let x=f-m;y=0.5<v?x/(2-f-m):x/(f+m),f===n?u=(o-c)/x+(o<c?6:0):f===o?u=(c-n)/x+2:f===c?u=(n-o)/x+4:void 0,u/=6}return u*=360,y=100*y+'%',v=100*v+'%',{css:'hsl('+u+','+y+','+v+')',h:u,s:y,l:v}},rgbToHex(n,o,c){let f=(+n).toString(16),m=(+o).toString(16),u=(+c).toString(16);return 1===f.length&&(f=`0${f}`),1===m.length&&(m=`0${m}`),1===u.length&&(u=`0${u}`),`#${f}${m}${u}`},removeSnapAreas(n){document.querySelectorAll('.jsPanel-snap-area').forEach(function(o){n.parentElement&&n.parentElement.removeChild(o)})},resetZi(){this.zi=((n=jsPanel.ziBase)=>{let o=n;return{next:()=>{return o++}}})(),Array.prototype.slice.call(document.querySelectorAll('.jsPanel-standard')).sort((n,o)=>{return n.style.zIndex-o.style.zIndex}).forEach(n=>{n.style.zIndex=jsPanel.zi.next()})},resizeit(n,o={}){let E,z,C,S,j,c=Object.assign({},this.defaults.resizeit,o),f=n.parentElement,m=f.tagName.toLowerCase(),u='function'==typeof c.maxWidth?c.maxWidth():c.maxWidth||1e4,y='function'==typeof c.maxHeight?c.maxHeight():c.maxHeight||1e4,v='function'==typeof c.minWidth?c.minWidth():c.minWidth,x='function'==typeof c.minHeight?c.minHeight():c.minHeight,P=[];const T=new CustomEvent('jspanelresizestart',{detail:n.id}),L=new CustomEvent('jspanelresize',{detail:n.id}),k=new CustomEvent('jspanelresizestop',{detail:n.id});return E=this.pOcontainment(c.containment),c.handles.split(',').forEach(A=>{const W=document.createElement('DIV');W.className=`jsPanel-resizeit-handle jsPanel-resizeit-${A.trim()}`,W.style.zIndex=90,n.append(W)}),n.querySelectorAll('.jsPanel-resizeit-handle').forEach(A=>{jsPanel.pointerdown.forEach(function(W){A.addEventListener(W,H=>{H.preventDefault(),P=document.querySelectorAll('iframe'),P.length&&P.forEach(function(oe){oe.style.pointerEvents='none'});const R=n.getBoundingClientRect(),B=f.getBoundingClientRect(),D=window.getComputedStyle(f,null),O=parseInt(D.borderLeftWidth,10),M=parseInt(D.borderTopWidth,10),I=D.getPropertyValue('position'),N=H.clientX||H.touches[0].clientX,X=H.clientY||H.touches[0].clientY,Y=R.width,F=R.height,V=H.target.classList;let _=R.left,K=R.top,G=1e4,U=1e4,Z=1e4,J=1e4;n.content.style.pointerEvents='none','body'!==m&&(_=R.left-B.left+f.scrollLeft,K=R.top-B.top+f.scrollTop),'body'===m&&E?(G=document.documentElement.clientWidth-R.left,Z=document.documentElement.clientHeight-R.top,U=R.width+R.left,J=R.height+R.top):E&&('static'===I?(G=B.width-R.left+O,Z=B.height+B.top-R.top+M,U=R.width+(R.left-B.left)-O,J=R.height+(R.top-B.top)-M):(G=f.clientWidth-(R.left-B.left)+O,Z=f.clientHeight-(R.top-B.top)+M,U=R.width+(R.left-B.left)-O,J=n.clientHeight+(R.top-B.top)-M)),E&&(U-=E[3],J-=E[0],G-=E[1],Z-=E[2]);const Q=window.getComputedStyle(n);let ee=parseFloat(Q.width)-R.width,te=parseFloat(Q.height)-R.height,ne=parseFloat(Q.left)-R.left,ae=parseFloat(Q.top)-R.top;f!==document.body&&(ne+=B.left,ae+=B.top),z=oe=>{C||(document.dispatchEvent(T),c.start&&jsPanel.processCallbacks(n,c.start,!1,{width:Y,height:F}),jsPanel.front(n)),C=1,document.dispatchEvent(L),(V.contains('jsPanel-resizeit-e')||V.contains('jsPanel-resizeit-se')||V.contains('jsPanel-resizeit-ne'))&&(S=Y+(oe.clientX||oe.touches[0].clientX)-N+ee,S>=G&&(S=G),S>=u?S=u:S<=v&&(S=v),n.style.width=S+'px'),(V.contains('jsPanel-resizeit-s')||V.contains('jsPanel-resizeit-se')||V.contains('jsPanel-resizeit-sw'))&&(j=F+(oe.clientY||oe.touches[0].clientY)-X+te,j>=Z&&(j=Z),j>=y?j=y:j<=x&&(j=x),n.style.height=j+'px'),(V.contains('jsPanel-resizeit-w')||V.contains('jsPanel-resizeit-nw')||V.contains('jsPanel-resizeit-sw'))&&(S=Y+N-(oe.clientX||oe.touches[0].clientX)+ee,S<=u&&S>=v&&S<=U&&(n.style.left=_+(oe.clientX||oe.touches[0].clientX)-N+ne+'px'),S>=U&&(S=U),S>=u?S=u:S<=v&&(S=v),n.style.width=S+'px'),(V.contains('jsPanel-resizeit-n')||V.contains('jsPanel-resizeit-nw')||V.contains('jsPanel-resizeit-ne'))&&(j=F+X-(oe.clientY||oe.touches[0].clientY)+te,j<=y&&j>=x&&j<=J&&(n.style.top=K+(oe.clientY||oe.touches[0].clientY)-X+ae+'px'),j>=J&&(j=J),j>=y?j=y:j<=x&&(j=x),n.style.height=j+'px'),window.getSelection().removeAllRanges();const ie=window.getComputedStyle(n),le={left:parseFloat(ie.left),top:parseFloat(ie.top),right:parseFloat(ie.right),bottom:parseFloat(ie.bottom),width:parseFloat(ie.width),height:parseFloat(ie.height)};c.resize&&jsPanel.processCallbacks(n,c.resize,!1,le)},jsPanel.pointermove.forEach(function(oe){document.addEventListener(oe,z,!1)}),window.addEventListener('mouseout',oe=>{null===oe.relatedTarget&&jsPanel.pointermove.forEach(function(ie){document.removeEventListener(ie,z,!1)})},!1)})})}),jsPanel.pointerup.forEach(function(A){document.addEventListener(A,W=>{if(jsPanel.pointermove.forEach(function(H){document.removeEventListener(H,z,!1)}),W.target.classList&&W.target.classList.contains('jsPanel-resizeit-handle')){let H,R;const B=W.target.className;if(B.match(/jsPanel-resizeit-nw|jsPanel-resizeit-w|jsPanel-resizeit-sw/i)&&(H=!0),B.match(/jsPanel-resizeit-nw|jsPanel-resizeit-n|jsPanel-resizeit-ne/i)&&(R=!0),c.grid&&Array.isArray(c.grid)){1===c.grid.length&&(c.grid[1]=c.grid[0]);const D=parseFloat(n.style.width),O=parseFloat(n.style.height),M=D%c.grid[0],I=O%c.grid[1],N=parseFloat(n.style.left),X=parseFloat(n.style.top),Y=N%c.grid[0],F=X%c.grid[1];n.style.width=M<c.grid[0]/2?D-M+'px':D+(c.grid[0]-M)+'px',n.style.height=I<c.grid[1]/2?O-I+'px':O+(c.grid[1]-I)+'px',H&&(Y<c.grid[0]/2?n.style.left=N-Y+'px':n.style.left=N+(c.grid[0]-Y)+'px'),R&&(F<c.grid[1]/2?n.style.top=X-F+'px':n.style.top=X+(c.grid[1]-F)+'px')}}C&&(n.content.style.pointerEvents='inherit',document.dispatchEvent(k),C=void 0,n.saveCurrentDimensions(),n.saveCurrentPosition(),c.stop&&jsPanel.processCallbacks(n,c.stop,!1,{width:parseFloat(n.style.width),height:parseFloat(n.style.height)})),P.length&&P.forEach(function(H){H.style.pointerEvents='inherit'})},!1)}),c.disable&&n.querySelectorAll('.jsPanel-resizeit-handle').forEach(A=>{A.style.pointerEvents='none'}),n},setClass(n,o){return o.split(' ').forEach(c=>n.classList.add(c)),n},remClass(n,o){return o.split(' ').forEach(c=>n.classList.remove(c)),n},setStyle(n,o){for(let c in o)if(o.hasOwnProperty(c)){let f=(c+'').replace(/-\w/gi,m=>{return m.substr(-1).toUpperCase()});n.style[f]=o[c]}return n},snapPanel(n,o){if(n.currentData.beforeSnap={width:n.currentData.width,height:n.currentData.height},o&&'function'==typeof o)o.call(n,n,n.snappableTo);else if(!1!==o){let c=[0,0];if(n.options.dragit.snap.containment&&n.options.dragit.containment){const f=this.pOcontainment(n.options.dragit.containment),m=n.snappableTo;m.startsWith('left')?c[0]=f[3]:m.startsWith('right')&&(c[0]=-f[1]),m.endsWith('top')?c[1]=f[0]:m.endsWith('bottom')&&(c[1]=-f[2])}n.reposition(`${n.snappableTo} ${c[0]} ${c[1]}`),n.snapped=n.snappableTo}},create(n={},o){jsPanel.zi||(jsPanel.zi=((X=jsPanel.ziBase)=>{let Y=X;return{next:()=>{return Y++}}})());let c;n.config?(n=Object.assign({},this.defaults,n.config,n),delete n.config):n=Object.assign({},this.defaults,n),n.id?'function'==typeof n.id&&(n.id=n.id()):n.id=`jsPanel-${jsPanel.idCounter+=1}`;const f=document.getElementById(n.id);if(null!==f){f.classList.contains('jsPanel')&&f.front();const X=new jsPanelError('NO NEW PANEL CREATED!\nAn element with the ID <'+n.id+'> already exists in the document.');try{throw X}catch(Y){o&&o.call(Y,Y)}return console.error(X.name+':',X.message)}const m=this.pOcontainer(n.container,o);if(m&&m.message)return console.error(m.name+':',m.message);n.maximizedMargin=this.pOcontainment(n.maximizedMargin),n.dragit&&(['start','drag','stop'].forEach(function(X){n.dragit[X]?'function'==typeof n.dragit[X]&&(n.dragit[X]=[n.dragit[X]]):n.dragit[X]=[]}),n.dragit.snap&&('object'==typeof n.dragit.snap?n.dragit.snap=Object.assign({},this.defaultSnapConfig,n.dragit.snap):n.dragit.snap=this.defaultSnapConfig)),n.resizeit&&['start','resize','stop'].forEach(function(X){n.resizeit[X]?'function'==typeof n.resizeit[X]&&(n.resizeit[X]=[n.resizeit[X]]):n.resizeit[X]=[]}),['onbeforeclose','onbeforemaximize','onbeforeminimize','onbeforenormalize','onbeforesmallify','onbeforeunsmallify','onclosed','onfronted','onmaximized','onminimized','onnormalized','onsmallified','onstatuschange','onunsmallified'].forEach(function(X){n[X]?'function'==typeof n[X]&&(n[X]=[n[X]]):n[X]=[]}),n.headerRemove&&(n.header=!1);let u=n.template?n.template:this.createPanelTemplate();u.options=n,u.status='initialized',u.currentData={},u.header=u.querySelector('.jsPanel-hdr'),u.headerbar=u.header.querySelector('.jsPanel-headerbar'),u.titlebar=u.header.querySelector('.jsPanel-titlebar'),u.headerlogo=u.headerbar.querySelector('.jsPanel-headerlogo'),u.headertitle=u.headerbar.querySelector('.jsPanel-title'),u.controlbar=u.headerbar.querySelector('.jsPanel-controlbar'),u.headertoolbar=u.header.querySelector('.jsPanel-hdr-toolbar'),u.content=u.querySelector('.jsPanel-content'),u.footer=u.querySelector('.jsPanel-ftr'),u.snappableTo=!1,u.snapped=!1;const y=new CustomEvent('jspanelloaded',{detail:n.id}),v=new CustomEvent('jspanelbeforeclose',{detail:n.id}),x=new CustomEvent('jspanelclosed',{detail:n.id}),E=new CustomEvent('jspanelstatuschange',{detail:n.id}),z=new CustomEvent('jspanelbeforenormalize',{detail:n.id}),C=new CustomEvent('jspanelnormalized',{detail:n.id}),S=new CustomEvent('jspanelbeforemaximize',{detail:n.id}),j=new CustomEvent('jspanelmaximized',{detail:n.id}),P=new CustomEvent('jspanelbeforeminimize',{detail:n.id}),T=new CustomEvent('jspanelminimized',{detail:n.id}),L=new CustomEvent('jspanelbeforesmallify',{detail:n.id}),k=new CustomEvent('jspanelsmallified',{detail:n.id}),A=new CustomEvent('jspanelsmallifiedmax',{detail:n.id}),W=new CustomEvent('jspanelbeforeunsmallify',{detail:n.id}),H=new CustomEvent('jspanelfronted',{detail:n.id}),R=u.querySelector('.jsPanel-btn-close'),B=u.querySelector('.jsPanel-btn-maximize'),D=u.querySelector('.jsPanel-btn-normalize'),O=u.querySelector('.jsPanel-btn-smallify'),M=u.querySelector('.jsPanel-btn-smallifyrev'),I=u.querySelector('.jsPanel-btn-minimize');R&&jsPanel.pointerup.forEach(X=>{R.addEventListener(X,Y=>{Y.preventDefault(),u.close()})}),B&&jsPanel.pointerup.forEach(X=>{B.addEventListener(X,Y=>{Y.preventDefault(),u.maximize()})}),D&&jsPanel.pointerup.forEach(X=>{D.addEventListener(X,Y=>{Y.preventDefault(),u.normalize()})}),O&&jsPanel.pointerup.forEach(X=>{O.addEventListener(X,Y=>{Y.preventDefault(),u.smallify()})}),M&&jsPanel.pointerup.forEach(X=>{M.addEventListener(X,Y=>{Y.preventDefault(),u.unsmallify()})}),I&&jsPanel.pointerup.forEach(X=>{I.addEventListener(X,Y=>{Y.preventDefault(),u.minimize()})});let N=jsPanel.extensions;for(let X in N)N.hasOwnProperty(X)&&(u[X]=N[X]);if(u.addToolbar=(X,Y,F)=>{if('header'===X?X=u.headertoolbar:'footer'==X&&(X=u.footer),'string'==typeof Y)X.innerHTML=Y;else if(Array.isArray(Y))Y.forEach(V=>{'string'==typeof V?X.innerHTML+=V:X.append(V)});else if('function'==typeof Y){const V=Y.call(u,u);'string'==typeof V?X.innerHTML=V:X.append(V)}else X.append(Y);return X.classList.add('active'),F&&F.call(u,u),u},u.applyBuiltInTheme=X=>{return u.classList.add(`jsPanel-theme-${X.color}`),u.header.classList.add(`jsPanel-theme-${X.color}`),X.filling&&(u.content.style.background='',u.content.classList.add(`jsPanel-content-${X.filling}`)),n.headerToolbar||(u.content.style.background='',u.content.style.borderTop=`1px solid ${u.headertitle.style.color}`),u},u.applyArbitraryTheme=X=>{return u.header.style.backgroundColor=X.colors[0],['.jsPanel-headerlogo','.jsPanel-title','.jsPanel-hdr-toolbar'].forEach(Y=>{u.querySelector(Y).style.color=X.colors[3]},u),u.querySelectorAll('.jsPanel-controlbar .jsPanel-btn').forEach(Y=>{Y.style.color=X.colors[3]}),n.headerToolbar?jsPanel.setStyle(u.headertoolbar,{boxShadow:`0 0 1px ${X.colors[3]} inset`,width:'calc(100% + 4px)',marginLeft:'-1px'}):u.content.style.borderTop=`1px solid ${X.colors[3]}`,'filled'===X.filling?(u.content.style.backgroundColor=X.colors[0],u.content.style.color=X.colors[3]):'filledlight'===X.filling&&(u.content.style.backgroundColor=X.colors[1]),u},u.applyBootstrapTheme=X=>{const Y=X.bstheme,F=$.fn.button.Constructor.VERSION[0];if('4'===F?u.classList.add(`bg-${Y}`):(['panel',`panel-${Y}`].forEach(K=>{u.classList.add(K)}),u.header.classList.add('panel-heading')),'mdb'===X.bs){let K=`${Y}-color`;X.mdbStyle&&(K=`${K}-dark`),u.classList.add(K)}let V='4'===F?window.getComputedStyle(u).backgroundColor.replace(/\s+/g,''):window.getComputedStyle(u.header).backgroundColor.replace(/\s+/g,'');let _=jsPanel.calcColors(V);return u.header.style.color=_[3],X.filling?u.setTheme(`${V} ${X.filling}`):u.setTheme(V),u},u.applyThemeBorder=X=>{const Y=n.border.split(' ');if(u.style.borderWidth=Y[0],u.style.borderStyle=Y[1],u.style.borderColor=Y[2],!X.bs)-1===jsPanel.themes.indexOf(X.color)&&(Y[2]?u.style.borderColor=Y[2]:u.style.borderColor=X.colors[0]);else{let F;F='transparent'===window.getComputedStyle(u.header).backgroundColor?window.getComputedStyle(u).backgroundColor.replace(/\s+/g,''):window.getComputedStyle(u.header).backgroundColor.replace(/\s+/g,''),u.style.borderColor=Y[2]?Y[2]:F}return u},u.autopositionRemaining=()=>{let X;['left-top-down','left-top-right','center-top-down','right-top-down','right-top-left','left-bottom-up','left-bottom-right','center-bottom-up','right-bottom-up','right-bottom-left'].forEach(Y=>{u.classList.contains(Y)&&(X=Y)}),X&&n.container.querySelectorAll(`.${X}`).forEach(Y=>{Y.reposition()})},u.calcSizeFactors=()=>{const X=window.getComputedStyle(u);if(n.container===document.body)u.hf=parseFloat(u.style.left)/(document.body.clientWidth-parseFloat(u.style.width)),u.vf=parseFloat(u.style.top)/(window.innerHeight-parseFloat(X.height));else{let Y=window.getComputedStyle(u.parentElement);u.hf=parseFloat(u.style.left)/(parseFloat(Y.width)-parseFloat(u.style.width)),u.vf=parseFloat(u.style.top)/(parseFloat(Y.height)-parseFloat(X.height))}},u.clearTheme=X=>{return jsPanel.themes.concat(jsPanel.mdbthemes).forEach(Y=>{['panel',`jsPanel-theme-${Y}`,`panel-${Y}`,`${Y}-color`].forEach(F=>{u.classList.remove(F)}),u.header.classList.remove('panel-heading',`jsPanel-theme-${Y}`)},u),u.headertitle.classList.remove('panel-title'),u.content.classList.remove('panel-body','jsPanel-content-filled','jsPanel-content-filledlight'),u.footer.classList.remove('panel-footer'),jsPanel.setStyle(u,{backgroundColor:'',borderWidth:'',borderStyle:'',borderColor:''}),jsPanel.setStyle(u.content,{background:'',border:''}),jsPanel.setStyle(u.headertoolbar,{boxShadow:'',width:'',marginLeft:''}),u.header.style.background='',Array.prototype.slice.call(u.controlbar.querySelectorAll('.jsPanel-icon')).concat([u.headerlogo,u.headertitle,u.headertoolbar,u.content]).forEach(Y=>{Y.style.color=''}),X&&X.call(u,u),u},u.close=X=>{const Y=()=>{const F=n.id;return c&&window.clearTimeout(c),u.closeChildpanels(),u.parentElement&&u.parentElement.removeChild(u),!document.querySelector('#'+F)&&void(u.removeMinimizedReplacement(),document.dispatchEvent(x),X&&X.call(F,F),n.onclosed&&jsPanel.processCallbacks(u,n.onclosed,'every'),u.autopositionRemaining())};return document.dispatchEvent(v),n.onbeforeclose&&0<n.onbeforeclose.length&&!jsPanel.processCallbacks(u,n.onbeforeclose)?u:void(n.animateOut?(n.animateIn&&jsPanel.remClass(u,n.animateIn),jsPanel.setClass(u,n.animateOut),u.addEventListener('animationend',()=>{Y()})):Y())},u.closeChildpanels=X=>{return u.getChildpanels().forEach(Y=>Y.close()),X&&X.call(u,u),u},u.contentRemove=X=>{return jsPanel.emptyNode(u.content),X&&X.call(u,u),u},u.createMinimizedReplacement=()=>{const X=jsPanel.createMinimizedTemplate(),Y=window.getComputedStyle(u.headertitle).color,F=n.iconfont,V=X.querySelector('.jsPanel-controlbar');return X.style.backgroundColor='transparent'===window.getComputedStyle(u.header).backgroundColor?window.getComputedStyle(u).backgroundColor:window.getComputedStyle(u.header).backgroundColor,X.id=u.id+'-min',X.querySelector('.jsPanel-headerbar').replaceChild(u.headerlogo.cloneNode(!0),X.querySelector('.jsPanel-headerlogo')),X.querySelector('.jsPanel-titlebar').replaceChild(u.headertitle.cloneNode(!0),X.querySelector('.jsPanel-title')),X.querySelector('.jsPanel-title').style.color=Y,V.style.color=Y,u.setIconfont(F,X),'enabled'===u.dataset.btnnormalize?jsPanel.pointerup.forEach(function(_){X.querySelector('.jsPanel-btn-normalize').addEventListener(_,()=>{u.normalize()})}):V.querySelector('.jsPanel-btn-normalize').style.display='none','enabled'===u.dataset.btnmaximize?jsPanel.pointerup.forEach(function(_){X.querySelector('.jsPanel-btn-maximize').addEventListener(_,()=>{u.maximize()})}):V.querySelector('.jsPanel-btn-maximize').style.display='none','enabled'===u.dataset.btnclose?jsPanel.pointerup.forEach(function(_){X.querySelector('.jsPanel-btn-close').addEventListener(_,()=>{u.close()})}):V.querySelector('.jsPanel-btn-close').style.display='none',X},u.dragit=X=>{const Y=Object.assign({},jsPanel.defaults.dragit,n.dragit),F=u.querySelectorAll(Y.handles);return'disable'===X?F.forEach(V=>{V.style.pointerEvents='none'}):F.forEach(V=>{V.style.pointerEvents='auto'}),u},u.front=(X,Y=!0)=>{return jsPanel.front(u),document.dispatchEvent(H),X&&X.call(u,u),n.onfronted&&Y&&jsPanel.processCallbacks(u,n.onfronted,'every'),u},u.getChildpanels=()=>{return Array.prototype.slice.call(u.content.querySelectorAll('.jsPanel'))},u.getThemeDetails=X=>{const Y=X.toLowerCase().replace(/ /g,''),F={color:!1,colors:!1,filling:!1,bs:!1,bstheme:!1};if('filled'===Y.substr(-6,6)?(F.filling='filled',F.color=Y.substr(0,Y.length-6)):'filledlight'===Y.substr(-11,11)?(F.filling='filledlight',F.color=Y.substr(0,Y.length-11)):(F.filling='',F.color=Y),F.colors=jsPanel.calcColors(F.color),F.color.match('-')){const V=F.color.split('-');F.bs=V[0],F.bstheme=V[1],F.mdbStyle=V[2]||void 0}return F},u.isChildpanel=()=>{const X=u.closest('.jsPanel-content');return!!X&&X.parentElement},u.maximize=X=>{if(n.onbeforemaximize&&0<n.onbeforemaximize.length&&!jsPanel.processCallbacks(u,n.onbeforemaximize))return u;document.dispatchEvent(S);const Y=u.parentElement,F=n.maximizedMargin;return Y===document.body?(u.style.width=document.documentElement.clientWidth-F[1]-F[3]+'px',u.style.height=document.documentElement.clientHeight-F[0]-F[2]+'px',u.style.left=F[3]+'px',u.style.top=F[0]+'px',!n.position.fixed&&(u.style.left=window.pageXOffset+F[3]+'px',u.style.top=window.pageYOffset+F[0]+'px')):(u.style.width=Y.clientWidth-F[1]-F[3]+'px',u.style.height=Y.clientHeight-F[0]-F[2]+'px',u.style.left=F[3]+'px',u.style.top=F[0]+'px'),u.removeMinimizedReplacement(),u.status='maximized',u.setControls(['.jsPanel-btn-maximize','.jsPanel-btn-smallifyrev']),jsPanel.front(u),document.dispatchEvent(j),document.dispatchEvent(E),n.onstatuschange&&jsPanel.processCallbacks(u,n.onstatuschange,'every'),X&&X.call(u,u),n.onmaximized&&jsPanel.processCallbacks(u,n.onmaximized,'every'),u},u.minimize=X=>{if('minimized'===u.status)return u;if(n.onbeforeminimize&&0<n.onbeforeminimize.length&&!jsPanel.processCallbacks(u,n.onbeforeminimize))return u;if(document.dispatchEvent(P),!document.getElementById('jsPanel-replacement-container')){const Y=document.createElement('div');Y.id='jsPanel-replacement-container',document.body.append(Y)}if(u.style.left='-9999px',u.statusBefore=u.status,u.status='minimized',document.dispatchEvent(T),document.dispatchEvent(E),n.onstatuschange&&jsPanel.processCallbacks(u,n.onstatuschange,'every'),n.minimizeTo){const Y=u.createMinimizedReplacement();let F,V,_;'default'===n.minimizeTo?document.getElementById('jsPanel-replacement-container').append(Y):'parentpanel'===n.minimizeTo?(V=u.closest('.jsPanel-content').parentElement,_=V.querySelectorAll('.jsPanel-minimized-box'),F=_[_.length-1],F.append(Y)):'parent'===n.minimizeTo?(V=u.parentElement,F=V.querySelector('.jsPanel-minimized-container'),!F&&(F=document.createElement('div'),F.className='jsPanel-minimized-container',V.append(F)),F.append(Y)):document.querySelector(n.minimizeTo).append(Y)}return X&&X.call(u,u),n.onminimized&&jsPanel.processCallbacks(u,n.onminimized,'every'),u},u.normalize=X=>{return'normalized'===u.status?u:n.onbeforenormalize&&0<n.onbeforenormalize.length&&!jsPanel.processCallbacks(u,n.onbeforenormalize)?u:(document.dispatchEvent(z),u.style.width=u.currentData.width,u.style.height=u.currentData.height,u.style.left=u.currentData.left,u.style.top=u.currentData.top,u.removeMinimizedReplacement(),u.status='normalized',u.setControls(['.jsPanel-btn-normalize','.jsPanel-btn-smallifyrev']),jsPanel.front(u),document.dispatchEvent(C),document.dispatchEvent(E),n.onstatuschange&&jsPanel.processCallbacks(u,n.onstatuschange,'every'),X&&X.call(u,u),n.onnormalized&&jsPanel.processCallbacks(u,n.onnormalized,'every'),u)},u.removeMinimizedReplacement=()=>{const X=document.getElementById(u.id+'-min');return X&&X.parentElement.removeChild(X),u},u.reposition=(...X)=>{let V,Y=n.position,F=!0;return X.forEach(function(_){'string'==typeof _||'object'==typeof _?Y=_:'boolean'==typeof _?F=_:'function'==typeof _&&(V=_)}),jsPanel.position(u,Y),F&&u.saveCurrentPosition(),V&&V.call(u,u),u},u.repositionOnSnap=X=>{let Y='0',F='0';const V=jsPanel.pOcontainment(n.dragit.containment);n.dragit.snap.containment&&('left-top'===X?(Y=V[3],F=V[0]):'right-top'===X?(Y=-V[1],F=V[0]):'right-bottom'===X?(Y=-V[1],F=-V[2]):'left-bottom'===X?(Y=V[3],F=-V[2]):'center-top'===X?(Y=V[3]/2-V[1]/2,F=V[0]):'center-bottom'===X?(Y=V[3]/2-V[1]/2,F=-V[2]):'left-center'===X?(Y=V[3],F=V[0]/2-V[2]/2):'right-center'==X&&(Y=-V[1],F=V[0]/2-V[2]/2)),jsPanel.position(u,X),jsPanel.setStyle(u,{left:`calc(${u.style.left} + ${Y}px)`,top:`calc(${u.style.top} + ${F}px)`})},u.resize=(...X)=>{const Y=window.getComputedStyle(u);let _,F={width:Y.width,height:Y.height},V=!0;X.forEach(function(G){'string'==typeof G?F=G:'object'==typeof G?F=Object.assign(F,G):'boolean'==typeof G?V=G:'function'==typeof G&&(_=G)});const K=jsPanel.pOsize(u,F);return u.style.width=K.width,u.style.height=K.height,V&&u.saveCurrentDimensions(),_&&_.call(u,u),u},u.resizeit=X=>{const Y=u.querySelectorAll('.jsPanel-resizeit-handle');return'disable'===X?Y.forEach(F=>{F.style.pointerEvents='none'}):Y.forEach(F=>{F.style.pointerEvents='auto'}),u},u.saveCurrentDimensions=()=>{const X=window.getComputedStyle(u);u.currentData.width=X.width,'normalized'===u.status&&(u.currentData.height=X.height)},u.saveCurrentPosition=()=>{const X=window.getComputedStyle(u);u.currentData.left=X.left,u.currentData.top=X.top},u.setControls=(X,Y)=>{return u.header.querySelectorAll('.jsPanel-btn').forEach(F=>{F.style.display='block'}),X.forEach(F=>{const V=u.controlbar.querySelector(F);V&&(V.style.display='none')}),Y&&Y.call(u,u),u},u.setControlStatus=(X,Y='enable',F)=>{if('disable'===Y){if('removed'!==u.getAttribute(`data-btn${X}`)){u.setAttribute(`data-btn${X}`,'disabled');const V=u.controlbar.querySelector(`.jsPanel-btn-${X}`);V.style.pointerEvents='none',V.style.opacity=0.4,V.style.cursor='default'}}else if('enable'===Y){if('removed'!==u.getAttribute(`data-btn${X}`)){u.setAttribute(`data-btn${X}`,'enabled');const V=u.controlbar.querySelector(`.jsPanel-btn-${X}`);V.style.pointerEvents='auto',V.style.opacity=1,V.style.cursor='pointer'}}else if('remove'===Y){const V=u.controlbar.querySelector(`.jsPanel-btn-${X}`);u.controlbar.removeChild(V),u.setAttribute(`data-btn${X}`,'removed')}return F&&F.call(u,u),u},u.setHeaderControls=X=>{const Y=['close','maximize','normalize','minimize','smallify','smallifyrev'],F=n.headerControls;return'string'==typeof F?'none'===F?Y.forEach(V=>{u.setControlStatus(V,'remove')}):'closeonly'===F&&Y.forEach(V=>{'close'!==V&&u.setControlStatus(V,'remove')}):Y.forEach(V=>{F[V]&&u.setControlStatus(V,F[V])}),X&&X.call(u,u),u},u.setHeaderLogo=(X,Y)=>{if('string'!=typeof X)jsPanel.emptyNode(u.headerlogo),u.headerlogo.append(X);else if('<'!==X.substr(0,1)){const F=document.createElement('img');F.src=X,jsPanel.emptyNode(u.headerlogo),u.headerlogo.append(F)}else u.headerlogo.innerHTML=X;return u.headerlogo.querySelectorAll('img').forEach(function(F){F.style.maxHeight=getComputedStyle(u.headerbar).height}),Y&&Y.call(u,u),u},u.setHeaderRemove=X=>{return u.removeChild(u.header),u.content.classList.add('jsPanel-content-noheader'),['close','maximize','normalize','minimize','smallify','smallifyrev'].forEach(Y=>{u.setAttribute(`data-btn${Y}`,'removed')}),X&&X.call(u,u),u},u.setHeaderTitle=(X,Y)=>{return'string'==typeof X?u.headertitle.innerHTML=X:'function'==typeof X?(jsPanel.emptyNode(u.headertitle),u.headertitle.innerHTML=X()):(jsPanel.emptyNode(u.headertitle),u.headertitle.append(X)),Y&&Y.call(u,u),u},u.setIconfont=(X=!1,Y=u,F)=>{if(!1!==X){let V,_;if('bootstrap'===X||'glyphicon'===X)V=['glyphicon glyphicon-remove','glyphicon glyphicon-fullscreen','glyphicon glyphicon-resize-full','glyphicon glyphicon-minus','glyphicon glyphicon-chevron-down','glyphicon glyphicon-chevron-up'];else if('fa'===X||'far'===X||'fal'===X||'fas'===X)V=[`${X} fa-window-close`,`${X} fa-window-maximize`,`${X} fa-window-restore`,`${X} fa-window-minimize`,`${X} fa-chevron-down`,`${X} fa-chevron-up`],u.controlbar.style.padding='6px 0 3px 0';else if('material-icons'===X)V=[X,X,X,X,X,X],_=['close','fullscreen','fullscreen_exit','call_received','expand_more','expand_less'],u.controlbar.style.padding='4px 0 5px 0';else if(Array.isArray(X))V=[`custom-control-icon ${X[5]}`,`custom-control-icon ${X[4]}`,`custom-control-icon ${X[3]}`,`custom-control-icon ${X[2]}`,`custom-control-icon ${X[1]}`,`custom-control-icon ${X[0]}`];else return Y;Y.querySelectorAll('.jsPanel-controlbar .jsPanel-btn').forEach(K=>{jsPanel.emptyNode(K).innerHTML='<span></span>'}),Array.prototype.slice.call(Y.querySelectorAll('.jsPanel-controlbar .jsPanel-btn > span')).reverse().forEach((K,G)=>{K.className=V[G],'material-icons'===X&&(K.textContent=_[G])})}return F&&F.call(Y,Y),Y},u.setRtl=()=>{[u.header,u.headerbar,u.titlebar,u.controlbar,u.headertoolbar,u.footer].forEach(X=>{X.classList.add('jsPanel-rtl')}),[u.headertitle,u.headertoolbar,u.content,u.footer].forEach(X=>{X.dir='rtl',n.rtl.lang&&(X.lang=n.rtl.lang)})},u.setSize=()=>{if(n.panelSize){const X=jsPanel.pOsize(u,n.panelSize);u.style.width=X.width,u.style.height=X.height}else if(n.contentSize){const X=jsPanel.pOsize(u,n.contentSize);u.content.style.width=X.width,u.content.style.height=X.height,u.style.width=X.width,u.content.style.width='100%'}return u},u.setTheme=(X=n.theme,Y)=>{if(u.clearTheme(),'none'===X)return u.style.backgroundColor='#fff',u;const F=u.getThemeDetails(X);return F.bs?u.applyBootstrapTheme(F):-1===jsPanel.themes.indexOf(F.color)?u.applyArbitraryTheme(F):u.applyBuiltInTheme(F),n.border?u.applyThemeBorder(F):(u.style.borderWidth='',u.style.borderStyle='',u.style.borderColor=''),Y&&Y.call(u,u),u},u.smallify=X=>{if('smallified'===u.status||'smallifiedmax'===u.status)return u;if(n.onbeforesmallify&&0<n.onbeforesmallify.length&&!jsPanel.processCallbacks(u,n.onbeforesmallify))return u;document.dispatchEvent(L),'normalized'===u.status&&u.saveCurrentDimensions(),u.style.overflow='hidden',u.style.height=window.getComputedStyle(u.headerbar).height,'normalized'===u.status?(u.setControls(['.jsPanel-btn-normalize','.jsPanel-btn-smallify']),u.status='smallified',document.dispatchEvent(k),document.dispatchEvent(E),n.onstatuschange&&jsPanel.processCallbacks(u,n.onstatuschange,'every')):'maximized'===u.status&&(u.setControls(['.jsPanel-btn-maximize','.jsPanel-btn-smallify']),u.status='smallifiedmax',document.dispatchEvent(A),document.dispatchEvent(E),n.onstatuschange&&jsPanel.processCallbacks(u,n.onstatuschange,'every'));let Y=u.querySelectorAll('.jsPanel-minimized-box');return Y[Y.length-1].style.display='none',X&&X.call(u,u),n.onsmallified&&jsPanel.processCallbacks(u,n.onsmallified,'every'),u},u.unsmallify=X=>{if('smallified'===u.status||'smallifiedmax'===u.status){if(n.onbeforeunsmallify&&0<n.onbeforeunsmallify.length&&!jsPanel.processCallbacks(u,n.onbeforeunsmallify))return u;document.dispatchEvent(W),u.style.overflow='visible',jsPanel.front(u),'smallified'===u.status?(u.style.height=u.currentData.height,u.setControls(['.jsPanel-btn-normalize','.jsPanel-btn-smallifyrev']),u.status='normalized',document.dispatchEvent(C),document.dispatchEvent(E),n.onstatuschange&&jsPanel.processCallbacks(u,n.onstatuschange,'every')):'smallifiedmax'===u.status?u.maximize():'minimized'===u.status&&u.normalize();let Y=u.querySelectorAll('.jsPanel-minimized-box');Y[Y.length-1].style.display='flex',X&&X.call(u,u),n.onunsmallified&&jsPanel.processCallbacks(u,n.onunsmallified,'every')}return u},u.id=n.id,u.classList.add('jsPanel-'+n.paneltype),'standard'===n.paneltype&&(u.style.zIndex=this.zi.next()),m.append(u),u.front(!1,!1),u.setTheme(n.theme),n.boxShadow&&u.classList.add(`jsPanel-depth-${n.boxShadow}`),!n.header)u.setHeaderRemove();else if(n.headerLogo&&u.setHeaderLogo(n.headerLogo),u.setIconfont(n.iconfont),u.setHeaderTitle(n.headerTitle),u.setHeaderControls(),'auto-show-hide'===n.header){let V,X=n.theme.split('-'),Y='jsPanel-depth-'+n.boxShadow,F='bg-';X[1]&&(F+=X[1]),X[2]&&(V=X[1]+'-color-'+X[2]),u.header.style.opacity=0,('bootstrap'===X[0]||'mdb'===X[0])&&(this.remClass(u,F),'mdb'===X[0]&&this.remClass(u,V)),u.style.backgroundColor='transparent',this.remClass(u,Y),this.setClass(u.content,Y),u.header.addEventListener('mouseenter',function(){u.header.style.opacity=1,('bootstrap'===X[0]||'mdb'===X[0])&&(jsPanel.setClass(u,F),'mdb'===X[0]&&jsPanel.setClass(u,V)),jsPanel.setClass(u,Y),jsPanel.remClass(u.content,Y)}),u.header.addEventListener('mouseleave',function(){u.header.style.opacity=0,('bootstrap'===X[0]||'mdb'===X[0])&&(jsPanel.remClass(u,F),'mdb'===X[0]&&jsPanel.remClass(u,V)),jsPanel.remClass(u,Y),jsPanel.setClass(u.content,Y)})}if(n.headerToolbar&&u.addToolbar(u.headertoolbar,n.headerToolbar),n.footerToolbar&&u.addToolbar(u.footer,n.footerToolbar),n.content&&('function'==typeof n.content?n.content.call(u,u):'string'==typeof n.content?u.content.innerHTML=n.content:u.content.append(n.content)),n.contentAjax&&this.ajax(u,n.contentAjax),n.contentFetch&&this.fetch(u),n.contentOverflow){let X=n.contentOverflow.split(' ');1===X.length?u.content.style.overflow=X[0]:2===X.length&&(u.content.style.overflowX=X[0],u.content.style.overflowY=X[1])}if(n.rtl&&u.setRtl(),u.setSize(),u.status='normalized',n.position||'cursor'!==n.position?this.position(u,n.position):u.style.opacity=1,document.dispatchEvent(C),u.calcSizeFactors(),n.animateIn&&(u.addEventListener('animationend',()=>{this.remClass(u,n.animateIn)}),this.setClass(u,n.animateIn)),n.syncMargins){const X=this.pOcontainment(n.maximizedMargin);n.dragit&&(n.dragit.containment=X,n.dragit.snap&&(n.dragit.snap.containment=!0)),n.resizeit&&(n.resizeit.containment=X)}if(n.dragit?(this.dragit(u,n.dragit),document.addEventListener('jspaneldragstop',X=>{X.detail===u.id&&u.calcSizeFactors()},!1)):u.titlebar.style.cursor='default',n.resizeit){this.resizeit(u,n.resizeit);let X;document.addEventListener('jspanelresizestart',Y=>{Y.detail===u.id&&(X=u.status)},!1),document.addEventListener('jspanelresizestop',Y=>{Y.detail===u.id&&('smallified'===X||'smallifiedmax'===X||'maximized'===X)&&parseFloat(u.style.height)>parseFloat(window.getComputedStyle(u.header).height)&&(u.setControls(['.jsPanel-btn-normalize','.jsPanel-btn-smallifyrev']),u.status='normalized',document.dispatchEvent(C),document.dispatchEvent(E),n.onstatuschange&&jsPanel.processCallbacks(u,n.onstatuschange,'every'),u.calcSizeFactors())},!1)}if(u.saveCurrentDimensions(),u.saveCurrentPosition(),n.setStatus){const X=n.setStatus;if('smallifiedmax'===X)u.maximize().smallify();else if('smallified'===X)u.smallify();else{const Y=X.substr(0,X.length-1);u[Y]()}}return n.autoclose&&(c=window.setTimeout(()=>{u&&u.close()},n.autoclose)),this.pointerdown.forEach(X=>{u.addEventListener(X,Y=>{Y.target.closest('.jsPanel-btn-close')||Y.target.closest('.jsPanel-btn-minimize')||'standard'!==n.paneltype||u.front()},!1)}),n.onwindowresize&&window.addEventListener('resize',X=>{if(X.target===window){const Y=n.onwindowresize,F=u.status,V=window.getComputedStyle(u.parentElement);'maximized'===F&&!0===Y?u.maximize():('normalized'===F||'smallified'===F||'maximized'===F)&&('function'==typeof Y?Y.call(u,X,u):(u.style.left=(()=>{let _;return _=n.container===document.body?(document.body.clientWidth-parseFloat(u.style.width))*u.hf:(parseFloat(V.width)-parseFloat(u.style.width))*u.hf,0>=_?0:_+'px'})(),u.style.top=(()=>{let _;return _=n.container===document.body?(window.innerHeight-parseFloat(u.currentData.height))*u.vf:(parseFloat(V.height)-parseFloat(u.currentData.height))*u.vf,0>=_?0:_+'px'})()))}},!1),this.pointerup.forEach(X=>{u.addEventListener(X,()=>{u.content.style.pointerEvents='inherit'})}),this.globalCallbacks&&(Array.isArray(this.globalCallbacks)?this.globalCallbacks.forEach(X=>{X.call(u,u)}):this.globalCallbacks.call(u,u)),n.callback&&(Array.isArray(n.callback)?n.callback.forEach(X=>{X.call(u,u)}):n.callback.call(u,u)),o&&o.call(u,u),document.dispatchEvent(y),u}};

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

module.exports = "<buttplug-devtools-main>\n  <input id=\"tab1\" type=\"radio\" name=\"tabs\" checked>\n  <label for=\"tab1\">Test Devices</label>\n  <section id=\"content1\">\n    <div id=\"simulator\">\n      <div class=\"vibrator-simulator-component\">\n        <div class=\"vibrator\">\n          <img src=\"" + __webpack_require__("./src/devtools/web/hush.png") + "\"\n               id=\"vibrator-image\">\n        </div>\n        <div id=\"vibrator-info\">\n          <b>Speed:</b> <span id=\"vibrationspeed\">0</span><br/>\n          <button id=\"vibratedisconnect\">Disconnect</button>\n        </div>\n      </div>\n      <div class=\"simulator-divider\"></div>\n      <div class=\"fleshlight-sim\">\n        <div class=\"c-fleshlight\">\n          <div>\n            <img src=\"" + __webpack_require__("./src/devtools/web/ruler.png") + "\">\n          </div>\n          <div>\n            <img src=\"" + __webpack_require__("./src/devtools/web/fleshlight.png") + "\"\n                 class=\"o-fleshlight\"\n                 id=\"fleshlight-image\">\n          </div>\n        </div>\n        <div>\n          <b>Speed:</b> <span id=\"linearspeed\">0</span><br/>\n          <b>Position:</b> <span id=\"linearposition\">0</span><br/>\n          <button id=\"lineardisconnect\">Disconnect</button>\n        </div>\n      </div>\n    </div>\n  </section>\n</buttplug-devtools-main>\n";

/***/ }),

/***/ "./src/devtools/web/TestDeviceManagerPanel.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __webpack_require__("../index");
const TWEEN = __webpack_require__("./node_modules/@tweenjs/tween.js/src/Tween.js");
const jsPanel = __webpack_require__("./node_modules/jspanel4/es6module/jspanel.min.js");
__webpack_require__("./node_modules/jspanel4/dist/jspanel.css");
const testPanelHTML = __webpack_require__("./src/devtools/web/TestDeviceManagerPanel.html").toString();
__webpack_require__("./src/devtools/web/TestDeviceManagerPanel.css");
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("./node_modules/process/browser.js")))

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
function RemoveDeviceManagerPanel() {
    const el = document.getElementById("buttplug-test-device-manager-panel");
    if (!el || !el.parentNode) {
        return;
    }
    el.parentNode.removeChild(el);
}
exports.RemoveDeviceManagerPanel = RemoveDeviceManagerPanel;


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvZXh0ZXJuYWwgXCJCdXR0cGx1Z1wiIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9ub2RlX21vZHVsZXMvQHR3ZWVuanMvdHdlZW4uanMvc3JjL1R3ZWVuLmpzIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9ub2RlX21vZHVsZXMvanNwYW5lbDQvZGlzdC9qc3BhbmVsLmNzcyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9Mb2dQYW5lbC5jc3MiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC5jc3MiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9kaXN0L2pzcGFuZWwuY3NzPzM2MWEiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9lczZtb2R1bGUvanNwYW5lbC5taW4uanMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qcyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL1Rlc3REZXZpY2UudHMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy9UZXN0RGV2aWNlTWFuYWdlci50cyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3V0aWxzLnRzIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9zcmMvZGV2dG9vbHMvd2ViL0xvZ1BhbmVsLmNzcz9hZmE2Iiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9zcmMvZGV2dG9vbHMvd2ViL0xvZ1BhbmVsLmh0bWwiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvTG9nUGFuZWwudHMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC5jc3M/ZDFmYyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmh0bWwiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC50cyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9mbGVzaGxpZ2h0LnBuZyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9odXNoLnBuZyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9pbmRleC53ZWIudHMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvcnVsZXIucG5nIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9zcmMvZGV2dG9vbHMvd2ViL3V0aWxzLndlYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7QUNsRkEsMEI7Ozs7Ozs7K0NDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSCxFQUFFOztBQUVGOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixxQkFBcUI7O0FBRXZDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUM7QUFDdkM7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQSxnRUFBZ0Usc0JBQXNCO0FBQ3RGO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsSUFBSTs7QUFFSjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQSxJQUFJOztBQUVKOztBQUVBO0FBQ0E7O0FBRUEsa0VBQWtFLHNCQUFzQjtBQUN4RjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVI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Q0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNILG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7O0FDdkx0QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsbUJBQW1CO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNB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QVE7Z0JBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO2dCQUN2QyxzQkFBc0IsQ0FBQyxNQUFNLEdBQUcsSUFBSSxzQkFBc0IsQ0FBQyxHQUFJLENBQUMsQ0FBQztZQUNuRSxDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQTJIRjtBQW5KRCx3REFtSkM7QUFFRCw2RUFBNkU7QUFDN0UsZUFBZTtBQUNmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBK0JFOzs7Ozs7Ozs7QUMvTEYsaUNBQWlDLG96Qzs7Ozs7OztBQ0FqQyxpQ0FBaUMsNGhIOzs7Ozs7Ozs7Ozs7O0FDQWpDLDhEQUE4QjtBQUM5QixxRUFBcUM7QUFDckMseURBQXlCO0FBQ3pCLGdFQUEyQjtBQUMzQiw4RUFBeUM7QUFDekMsaUVBQTRCOzs7Ozs7OztBQ0w1QixpQ0FBaUMsd1M7Ozs7Ozs7Ozs7QUNBakMscUdBQWtFO0FBQ2xFLHlFQUFzQztBQUd0QztJQUNFLG1CQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7QUFDMUIsQ0FBQztBQUZELDhDQUVDO0FBRUQsa0NBQXlDLGNBQThCO0lBQ3JFLCtDQUFzQixDQUFDLDBCQUEwQixDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3BFLENBQUM7QUFGRCw0REFFQztBQUVEO0lBQ0UsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0lBQ3pFLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFO1FBQ3pCLE9BQU87S0FDUjtJQUNELEVBQUUsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUFORCw0REFNQyIsImZpbGUiOiJidXR0cGx1Zy1kZXZ0b29scy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImJ1dHRwbHVnLWRldnRvb2xzLWNvbW1vbmpzXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkJ1dHRwbHVnRGV2VG9vbHNcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2RldnRvb2xzL3dlYi9pbmRleC53ZWIudHNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IEJ1dHRwbHVnOyIsIi8qKlxuICogVHdlZW4uanMgLSBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKlxuICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzL2dyYXBocy9jb250cmlidXRvcnMgZm9yIHRoZSBmdWxsIGxpc3Qgb2YgY29udHJpYnV0b3JzLlxuICogVGhhbmsgeW91IGFsbCwgeW91J3JlIGF3ZXNvbWUhXG4gKi9cblxuXG52YXIgX0dyb3VwID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLl90d2VlbnMgPSB7fTtcblx0dGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGUgPSB7fTtcbn07XG5cbl9Hcm91cC5wcm90b3R5cGUgPSB7XG5cdGdldEFsbDogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVucykubWFwKGZ1bmN0aW9uICh0d2VlbklkKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fdHdlZW5zW3R3ZWVuSWRdO1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cblx0fSxcblxuXHRyZW1vdmVBbGw6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMuX3R3ZWVucyA9IHt9O1xuXG5cdH0sXG5cblx0YWRkOiBmdW5jdGlvbiAodHdlZW4pIHtcblxuXHRcdHRoaXMuX3R3ZWVuc1t0d2Vlbi5nZXRJZCgpXSA9IHR3ZWVuO1xuXHRcdHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlW3R3ZWVuLmdldElkKCldID0gdHdlZW47XG5cblx0fSxcblxuXHRyZW1vdmU6IGZ1bmN0aW9uICh0d2Vlbikge1xuXG5cdFx0ZGVsZXRlIHRoaXMuX3R3ZWVuc1t0d2Vlbi5nZXRJZCgpXTtcblx0XHRkZWxldGUgdGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGVbdHdlZW4uZ2V0SWQoKV07XG5cblx0fSxcblxuXHR1cGRhdGU6IGZ1bmN0aW9uICh0aW1lLCBwcmVzZXJ2ZSkge1xuXG5cdFx0dmFyIHR3ZWVuSWRzID0gT2JqZWN0LmtleXModGhpcy5fdHdlZW5zKTtcblxuXHRcdGlmICh0d2Vlbklkcy5sZW5ndGggPT09IDApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHR0aW1lID0gdGltZSAhPT0gdW5kZWZpbmVkID8gdGltZSA6IFRXRUVOLm5vdygpO1xuXG5cdFx0Ly8gVHdlZW5zIGFyZSB1cGRhdGVkIGluIFwiYmF0Y2hlc1wiLiBJZiB5b3UgYWRkIGEgbmV3IHR3ZWVuIGR1cmluZyBhbiB1cGRhdGUsIHRoZW4gdGhlXG5cdFx0Ly8gbmV3IHR3ZWVuIHdpbGwgYmUgdXBkYXRlZCBpbiB0aGUgbmV4dCBiYXRjaC5cblx0XHQvLyBJZiB5b3UgcmVtb3ZlIGEgdHdlZW4gZHVyaW5nIGFuIHVwZGF0ZSwgaXQgbWF5IG9yIG1heSBub3QgYmUgdXBkYXRlZC4gSG93ZXZlcixcblx0XHQvLyBpZiB0aGUgcmVtb3ZlZCB0d2VlbiB3YXMgYWRkZWQgZHVyaW5nIHRoZSBjdXJyZW50IGJhdGNoLCB0aGVuIGl0IHdpbGwgbm90IGJlIHVwZGF0ZWQuXG5cdFx0d2hpbGUgKHR3ZWVuSWRzLmxlbmd0aCA+IDApIHtcblx0XHRcdHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlID0ge307XG5cblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdHdlZW5JZHMubGVuZ3RoOyBpKyspIHtcblxuXHRcdFx0XHR2YXIgdHdlZW4gPSB0aGlzLl90d2VlbnNbdHdlZW5JZHNbaV1dO1xuXG5cdFx0XHRcdGlmICh0d2VlbiAmJiB0d2Vlbi51cGRhdGUodGltZSkgPT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0dHdlZW4uX2lzUGxheWluZyA9IGZhbHNlO1xuXG5cdFx0XHRcdFx0aWYgKCFwcmVzZXJ2ZSkge1xuXHRcdFx0XHRcdFx0ZGVsZXRlIHRoaXMuX3R3ZWVuc1t0d2Vlbklkc1tpXV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHR3ZWVuSWRzID0gT2JqZWN0LmtleXModGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGUpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXG5cdH1cbn07XG5cbnZhciBUV0VFTiA9IG5ldyBfR3JvdXAoKTtcblxuVFdFRU4uR3JvdXAgPSBfR3JvdXA7XG5UV0VFTi5fbmV4dElkID0gMDtcblRXRUVOLm5leHRJZCA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIFRXRUVOLl9uZXh0SWQrKztcbn07XG5cblxuLy8gSW5jbHVkZSBhIHBlcmZvcm1hbmNlLm5vdyBwb2x5ZmlsbC5cbi8vIEluIG5vZGUuanMsIHVzZSBwcm9jZXNzLmhydGltZS5cbmlmICh0eXBlb2YgKHdpbmRvdykgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiAocHJvY2VzcykgIT09ICd1bmRlZmluZWQnKSB7XG5cdFRXRUVOLm5vdyA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgdGltZSA9IHByb2Nlc3MuaHJ0aW1lKCk7XG5cblx0XHQvLyBDb252ZXJ0IFtzZWNvbmRzLCBuYW5vc2Vjb25kc10gdG8gbWlsbGlzZWNvbmRzLlxuXHRcdHJldHVybiB0aW1lWzBdICogMTAwMCArIHRpbWVbMV0gLyAxMDAwMDAwO1xuXHR9O1xufVxuLy8gSW4gYSBicm93c2VyLCB1c2Ugd2luZG93LnBlcmZvcm1hbmNlLm5vdyBpZiBpdCBpcyBhdmFpbGFibGUuXG5lbHNlIGlmICh0eXBlb2YgKHdpbmRvdykgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICB3aW5kb3cucGVyZm9ybWFuY2UgIT09IHVuZGVmaW5lZCAmJlxuXHRcdCB3aW5kb3cucGVyZm9ybWFuY2Uubm93ICE9PSB1bmRlZmluZWQpIHtcblx0Ly8gVGhpcyBtdXN0IGJlIGJvdW5kLCBiZWNhdXNlIGRpcmVjdGx5IGFzc2lnbmluZyB0aGlzIGZ1bmN0aW9uXG5cdC8vIGxlYWRzIHRvIGFuIGludm9jYXRpb24gZXhjZXB0aW9uIGluIENocm9tZS5cblx0VFdFRU4ubm93ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdy5iaW5kKHdpbmRvdy5wZXJmb3JtYW5jZSk7XG59XG4vLyBVc2UgRGF0ZS5ub3cgaWYgaXQgaXMgYXZhaWxhYmxlLlxuZWxzZSBpZiAoRGF0ZS5ub3cgIT09IHVuZGVmaW5lZCkge1xuXHRUV0VFTi5ub3cgPSBEYXRlLm5vdztcbn1cbi8vIE90aGVyd2lzZSwgdXNlICduZXcgRGF0ZSgpLmdldFRpbWUoKScuXG5lbHNlIHtcblx0VFdFRU4ubm93ID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblx0fTtcbn1cblxuXG5UV0VFTi5Ud2VlbiA9IGZ1bmN0aW9uIChvYmplY3QsIGdyb3VwKSB7XG5cdHRoaXMuX29iamVjdCA9IG9iamVjdDtcblx0dGhpcy5fdmFsdWVzU3RhcnQgPSB7fTtcblx0dGhpcy5fdmFsdWVzRW5kID0ge307XG5cdHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0ID0ge307XG5cdHRoaXMuX2R1cmF0aW9uID0gMTAwMDtcblx0dGhpcy5fcmVwZWF0ID0gMDtcblx0dGhpcy5fcmVwZWF0RGVsYXlUaW1lID0gdW5kZWZpbmVkO1xuXHR0aGlzLl95b3lvID0gZmFsc2U7XG5cdHRoaXMuX2lzUGxheWluZyA9IGZhbHNlO1xuXHR0aGlzLl9yZXZlcnNlZCA9IGZhbHNlO1xuXHR0aGlzLl9kZWxheVRpbWUgPSAwO1xuXHR0aGlzLl9zdGFydFRpbWUgPSBudWxsO1xuXHR0aGlzLl9lYXNpbmdGdW5jdGlvbiA9IFRXRUVOLkVhc2luZy5MaW5lYXIuTm9uZTtcblx0dGhpcy5faW50ZXJwb2xhdGlvbkZ1bmN0aW9uID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5MaW5lYXI7XG5cdHRoaXMuX2NoYWluZWRUd2VlbnMgPSBbXTtcblx0dGhpcy5fb25TdGFydENhbGxiYWNrID0gbnVsbDtcblx0dGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPSBmYWxzZTtcblx0dGhpcy5fb25VcGRhdGVDYWxsYmFjayA9IG51bGw7XG5cdHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayA9IG51bGw7XG5cdHRoaXMuX29uU3RvcENhbGxiYWNrID0gbnVsbDtcblx0dGhpcy5fZ3JvdXAgPSBncm91cCB8fCBUV0VFTjtcblx0dGhpcy5faWQgPSBUV0VFTi5uZXh0SWQoKTtcblxufTtcblxuVFdFRU4uVHdlZW4ucHJvdG90eXBlID0ge1xuXHRnZXRJZDogZnVuY3Rpb24gZ2V0SWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2lkO1xuXHR9LFxuXG5cdGlzUGxheWluZzogZnVuY3Rpb24gaXNQbGF5aW5nKCkge1xuXHRcdHJldHVybiB0aGlzLl9pc1BsYXlpbmc7XG5cdH0sXG5cblx0dG86IGZ1bmN0aW9uIHRvKHByb3BlcnRpZXMsIGR1cmF0aW9uKSB7XG5cblx0XHR0aGlzLl92YWx1ZXNFbmQgPSBwcm9wZXJ0aWVzO1xuXG5cdFx0aWYgKGR1cmF0aW9uICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX2R1cmF0aW9uID0gZHVyYXRpb247XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzdGFydDogZnVuY3Rpb24gc3RhcnQodGltZSkge1xuXG5cdFx0dGhpcy5fZ3JvdXAuYWRkKHRoaXMpO1xuXG5cdFx0dGhpcy5faXNQbGF5aW5nID0gdHJ1ZTtcblxuXHRcdHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gZmFsc2U7XG5cblx0XHR0aGlzLl9zdGFydFRpbWUgPSB0aW1lICE9PSB1bmRlZmluZWQgPyB0eXBlb2YgdGltZSA9PT0gJ3N0cmluZycgPyBUV0VFTi5ub3coKSArIHBhcnNlRmxvYXQodGltZSkgOiB0aW1lIDogVFdFRU4ubm93KCk7XG5cdFx0dGhpcy5fc3RhcnRUaW1lICs9IHRoaXMuX2RlbGF5VGltZTtcblxuXHRcdGZvciAodmFyIHByb3BlcnR5IGluIHRoaXMuX3ZhbHVlc0VuZCkge1xuXG5cdFx0XHQvLyBDaGVjayBpZiBhbiBBcnJheSB3YXMgcHJvdmlkZWQgYXMgcHJvcGVydHkgdmFsdWVcblx0XHRcdGlmICh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldIGluc3RhbmNlb2YgQXJyYXkpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIENyZWF0ZSBhIGxvY2FsIGNvcHkgb2YgdGhlIEFycmF5IHdpdGggdGhlIHN0YXJ0IHZhbHVlIGF0IHRoZSBmcm9udFxuXHRcdFx0XHR0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldID0gW3RoaXMuX29iamVjdFtwcm9wZXJ0eV1dLmNvbmNhdCh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldKTtcblxuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBgdG8oKWAgc3BlY2lmaWVzIGEgcHJvcGVydHkgdGhhdCBkb2Vzbid0IGV4aXN0IGluIHRoZSBzb3VyY2Ugb2JqZWN0LFxuXHRcdFx0Ly8gd2Ugc2hvdWxkIG5vdCBzZXQgdGhhdCBwcm9wZXJ0eSBpbiB0aGUgb2JqZWN0XG5cdFx0XHRpZiAodGhpcy5fb2JqZWN0W3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTYXZlIHRoZSBzdGFydGluZyB2YWx1ZS5cblx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9IHRoaXMuX29iamVjdFtwcm9wZXJ0eV07XG5cblx0XHRcdGlmICgodGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldIGluc3RhbmNlb2YgQXJyYXkpID09PSBmYWxzZSkge1xuXHRcdFx0XHR0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gKj0gMS4wOyAvLyBFbnN1cmVzIHdlJ3JlIHVzaW5nIG51bWJlcnMsIG5vdCBzdHJpbmdzXG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSB8fCAwO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzdG9wOiBmdW5jdGlvbiBzdG9wKCkge1xuXG5cdFx0aWYgKCF0aGlzLl9pc1BsYXlpbmcpIHtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHRoaXMuX2dyb3VwLnJlbW92ZSh0aGlzKTtcblx0XHR0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcblxuXHRcdGlmICh0aGlzLl9vblN0b3BDYWxsYmFjayAhPT0gbnVsbCkge1xuXHRcdFx0dGhpcy5fb25TdG9wQ2FsbGJhY2sodGhpcy5fb2JqZWN0KTtcblx0XHR9XG5cblx0XHR0aGlzLnN0b3BDaGFpbmVkVHdlZW5zKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRlbmQ6IGZ1bmN0aW9uIGVuZCgpIHtcblxuXHRcdHRoaXMudXBkYXRlKHRoaXMuX3N0YXJ0VGltZSArIHRoaXMuX2R1cmF0aW9uKTtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHN0b3BDaGFpbmVkVHdlZW5zOiBmdW5jdGlvbiBzdG9wQ2hhaW5lZFR3ZWVucygpIHtcblxuXHRcdGZvciAodmFyIGkgPSAwLCBudW1DaGFpbmVkVHdlZW5zID0gdGhpcy5fY2hhaW5lZFR3ZWVucy5sZW5ndGg7IGkgPCBudW1DaGFpbmVkVHdlZW5zOyBpKyspIHtcblx0XHRcdHRoaXMuX2NoYWluZWRUd2VlbnNbaV0uc3RvcCgpO1xuXHRcdH1cblxuXHR9LFxuXG5cdGdyb3VwOiBmdW5jdGlvbiBncm91cChncm91cCkge1xuXHRcdHRoaXMuX2dyb3VwID0gZ3JvdXA7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0ZGVsYXk6IGZ1bmN0aW9uIGRlbGF5KGFtb3VudCkge1xuXG5cdFx0dGhpcy5fZGVsYXlUaW1lID0gYW1vdW50O1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0cmVwZWF0OiBmdW5jdGlvbiByZXBlYXQodGltZXMpIHtcblxuXHRcdHRoaXMuX3JlcGVhdCA9IHRpbWVzO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0cmVwZWF0RGVsYXk6IGZ1bmN0aW9uIHJlcGVhdERlbGF5KGFtb3VudCkge1xuXG5cdFx0dGhpcy5fcmVwZWF0RGVsYXlUaW1lID0gYW1vdW50O1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0eW95bzogZnVuY3Rpb24geW95byh5eSkge1xuXG5cdFx0dGhpcy5feW95byA9IHl5O1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZWFzaW5nOiBmdW5jdGlvbiBlYXNpbmcoZWFzKSB7XG5cblx0XHR0aGlzLl9lYXNpbmdGdW5jdGlvbiA9IGVhcztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGludGVycG9sYXRpb246IGZ1bmN0aW9uIGludGVycG9sYXRpb24oaW50ZXIpIHtcblxuXHRcdHRoaXMuX2ludGVycG9sYXRpb25GdW5jdGlvbiA9IGludGVyO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y2hhaW46IGZ1bmN0aW9uIGNoYWluKCkge1xuXG5cdFx0dGhpcy5fY2hhaW5lZFR3ZWVucyA9IGFyZ3VtZW50cztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG9uU3RhcnQ6IGZ1bmN0aW9uIG9uU3RhcnQoY2FsbGJhY2spIHtcblxuXHRcdHRoaXMuX29uU3RhcnRDYWxsYmFjayA9IGNhbGxiYWNrO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0b25VcGRhdGU6IGZ1bmN0aW9uIG9uVXBkYXRlKGNhbGxiYWNrKSB7XG5cblx0XHR0aGlzLl9vblVwZGF0ZUNhbGxiYWNrID0gY2FsbGJhY2s7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRvbkNvbXBsZXRlOiBmdW5jdGlvbiBvbkNvbXBsZXRlKGNhbGxiYWNrKSB7XG5cblx0XHR0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG9uU3RvcDogZnVuY3Rpb24gb25TdG9wKGNhbGxiYWNrKSB7XG5cblx0XHR0aGlzLl9vblN0b3BDYWxsYmFjayA9IGNhbGxiYWNrO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0dXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUodGltZSkge1xuXG5cdFx0dmFyIHByb3BlcnR5O1xuXHRcdHZhciBlbGFwc2VkO1xuXHRcdHZhciB2YWx1ZTtcblxuXHRcdGlmICh0aW1lIDwgdGhpcy5fc3RhcnRUaW1lKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPT09IGZhbHNlKSB7XG5cblx0XHRcdGlmICh0aGlzLl9vblN0YXJ0Q2FsbGJhY2sgIT09IG51bGwpIHtcblx0XHRcdFx0dGhpcy5fb25TdGFydENhbGxiYWNrKHRoaXMuX29iamVjdCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRlbGFwc2VkID0gKHRpbWUgLSB0aGlzLl9zdGFydFRpbWUpIC8gdGhpcy5fZHVyYXRpb247XG5cdFx0ZWxhcHNlZCA9ICh0aGlzLl9kdXJhdGlvbiA9PT0gMCB8fCBlbGFwc2VkID4gMSkgPyAxIDogZWxhcHNlZDtcblxuXHRcdHZhbHVlID0gdGhpcy5fZWFzaW5nRnVuY3Rpb24oZWxhcHNlZCk7XG5cblx0XHRmb3IgKHByb3BlcnR5IGluIHRoaXMuX3ZhbHVlc0VuZCkge1xuXG5cdFx0XHQvLyBEb24ndCB1cGRhdGUgcHJvcGVydGllcyB0aGF0IGRvIG5vdCBleGlzdCBpbiB0aGUgc291cmNlIG9iamVjdFxuXHRcdFx0aWYgKHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgc3RhcnQgPSB0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gfHwgMDtcblx0XHRcdHZhciBlbmQgPSB0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldO1xuXG5cdFx0XHRpZiAoZW5kIGluc3RhbmNlb2YgQXJyYXkpIHtcblxuXHRcdFx0XHR0aGlzLl9vYmplY3RbcHJvcGVydHldID0gdGhpcy5faW50ZXJwb2xhdGlvbkZ1bmN0aW9uKGVuZCwgdmFsdWUpO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdC8vIFBhcnNlcyByZWxhdGl2ZSBlbmQgdmFsdWVzIHdpdGggc3RhcnQgYXMgYmFzZSAoZS5nLjogKzEwLCAtMylcblx0XHRcdFx0aWYgKHR5cGVvZiAoZW5kKSA9PT0gJ3N0cmluZycpIHtcblxuXHRcdFx0XHRcdGlmIChlbmQuY2hhckF0KDApID09PSAnKycgfHwgZW5kLmNoYXJBdCgwKSA9PT0gJy0nKSB7XG5cdFx0XHRcdFx0XHRlbmQgPSBzdGFydCArIHBhcnNlRmxvYXQoZW5kKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZW5kID0gcGFyc2VGbG9hdChlbmQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFByb3RlY3QgYWdhaW5zdCBub24gbnVtZXJpYyBwcm9wZXJ0aWVzLlxuXHRcdFx0XHRpZiAodHlwZW9mIChlbmQpID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRcdHRoaXMuX29iamVjdFtwcm9wZXJ0eV0gPSBzdGFydCArIChlbmQgLSBzdGFydCkgKiB2YWx1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRpZiAodGhpcy5fb25VcGRhdGVDYWxsYmFjayAhPT0gbnVsbCkge1xuXHRcdFx0dGhpcy5fb25VcGRhdGVDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xuXHRcdH1cblxuXHRcdGlmIChlbGFwc2VkID09PSAxKSB7XG5cblx0XHRcdGlmICh0aGlzLl9yZXBlYXQgPiAwKSB7XG5cblx0XHRcdFx0aWYgKGlzRmluaXRlKHRoaXMuX3JlcGVhdCkpIHtcblx0XHRcdFx0XHR0aGlzLl9yZXBlYXQtLTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFJlYXNzaWduIHN0YXJ0aW5nIHZhbHVlcywgcmVzdGFydCBieSBtYWtpbmcgc3RhcnRUaW1lID0gbm93XG5cdFx0XHRcdGZvciAocHJvcGVydHkgaW4gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXQpIHtcblxuXHRcdFx0XHRcdGlmICh0eXBlb2YgKHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0pID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldID0gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldICsgcGFyc2VGbG9hdCh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodGhpcy5feW95bykge1xuXHRcdFx0XHRcdFx0dmFyIHRtcCA9IHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XTtcblxuXHRcdFx0XHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldID0gdGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XTtcblx0XHRcdFx0XHRcdHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0gPSB0bXA7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldID0gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5feW95bykge1xuXHRcdFx0XHRcdHRoaXMuX3JldmVyc2VkID0gIXRoaXMuX3JldmVyc2VkO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuX3JlcGVhdERlbGF5VGltZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0dGhpcy5fc3RhcnRUaW1lID0gdGltZSArIHRoaXMuX3JlcGVhdERlbGF5VGltZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLl9zdGFydFRpbWUgPSB0aW1lICsgdGhpcy5fZGVsYXlUaW1lO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayAhPT0gbnVsbCkge1xuXG5cdFx0XHRcdFx0dGhpcy5fb25Db21wbGV0ZUNhbGxiYWNrKHRoaXMuX29iamVjdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmb3IgKHZhciBpID0gMCwgbnVtQ2hhaW5lZFR3ZWVucyA9IHRoaXMuX2NoYWluZWRUd2VlbnMubGVuZ3RoOyBpIDwgbnVtQ2hhaW5lZFR3ZWVuczsgaSsrKSB7XG5cdFx0XHRcdFx0Ly8gTWFrZSB0aGUgY2hhaW5lZCB0d2VlbnMgc3RhcnQgZXhhY3RseSBhdCB0aGUgdGltZSB0aGV5IHNob3VsZCxcblx0XHRcdFx0XHQvLyBldmVuIGlmIHRoZSBgdXBkYXRlKClgIG1ldGhvZCB3YXMgY2FsbGVkIHdheSBwYXN0IHRoZSBkdXJhdGlvbiBvZiB0aGUgdHdlZW5cblx0XHRcdFx0XHR0aGlzLl9jaGFpbmVkVHdlZW5zW2ldLnN0YXJ0KHRoaXMuX3N0YXJ0VGltZSArIHRoaXMuX2R1cmF0aW9uKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cblx0fVxufTtcblxuXG5UV0VFTi5FYXNpbmcgPSB7XG5cblx0TGluZWFyOiB7XG5cblx0XHROb25lOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gaztcblxuXHRcdH1cblxuXHR9LFxuXG5cdFF1YWRyYXRpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogaztcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogKDIgLSBrKTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGs7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAtIDAuNSAqICgtLWsgKiAoayAtIDIpIC0gMSk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRDdWJpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogayAqIGs7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gLS1rICogayAqIGsgKyAxO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAwLjUgKiBrICogayAqIGs7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwLjUgKiAoKGsgLT0gMikgKiBrICogayArIDIpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0UXVhcnRpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogayAqIGsgKiBrO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDEgLSAoLS1rICogayAqIGsgKiBrKTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGsgKiBrICogaztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIC0gMC41ICogKChrIC09IDIpICogayAqIGsgKiBrIC0gMik7XG5cblx0XHR9XG5cblx0fSxcblxuXHRRdWludGljOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGsgKiBrICogayAqIGsgKiBrO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIC0tayAqIGsgKiBrICogayAqIGsgKyAxO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAwLjUgKiBrICogayAqIGsgKiBrICogaztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDAuNSAqICgoayAtPSAyKSAqIGsgKiBrICogayAqIGsgKyAyKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdFNpbnVzb2lkYWw6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gMSAtIE1hdGguY29zKGsgKiBNYXRoLlBJIC8gMik7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gTWF0aC5zaW4oayAqIE1hdGguUEkgLyAyKTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDAuNSAqICgxIC0gTWF0aC5jb3MoTWF0aC5QSSAqIGspKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdEV4cG9uZW50aWFsOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGsgPT09IDAgPyAwIDogTWF0aC5wb3coMTAyNCwgayAtIDEpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGsgPT09IDEgPyAxIDogMSAtIE1hdGgucG93KDIsIC0gMTAgKiBrKTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKGsgPT09IDApIHtcblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAwLjUgKiBNYXRoLnBvdygxMDI0LCBrIC0gMSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwLjUgKiAoLSBNYXRoLnBvdygyLCAtIDEwICogKGsgLSAxKSkgKyAyKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdENpcmN1bGFyOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDEgLSBNYXRoLnNxcnQoMSAtIGsgKiBrKTtcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBNYXRoLnNxcnQoMSAtICgtLWsgKiBrKSk7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIC0gMC41ICogKE1hdGguc3FydCgxIC0gayAqIGspIC0gMSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwLjUgKiAoTWF0aC5zcXJ0KDEgLSAoayAtPSAyKSAqIGspICsgMSk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRFbGFzdGljOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKGsgPT09IDApIHtcblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gLU1hdGgucG93KDIsIDEwICogKGsgLSAxKSkgKiBNYXRoLnNpbigoayAtIDEuMSkgKiA1ICogTWF0aC5QSSk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA9PT0gMCkge1xuXHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGsgPT09IDEpIHtcblx0XHRcdFx0cmV0dXJuIDE7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBNYXRoLnBvdygyLCAtMTAgKiBrKSAqIE1hdGguc2luKChrIC0gMC4xKSAqIDUgKiBNYXRoLlBJKSArIDE7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrID09PSAwKSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoayA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0ayAqPSAyO1xuXG5cdFx0XHRpZiAoayA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIC0wLjUgKiBNYXRoLnBvdygyLCAxMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogTWF0aC5wb3coMiwgLTEwICogKGsgLSAxKSkgKiBNYXRoLnNpbigoayAtIDEuMSkgKiA1ICogTWF0aC5QSSkgKyAxO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0QmFjazoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHZhciBzID0gMS43MDE1ODtcblxuXHRcdFx0cmV0dXJuIGsgKiBrICogKChzICsgMSkgKiBrIC0gcyk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHR2YXIgcyA9IDEuNzAxNTg7XG5cblx0XHRcdHJldHVybiAtLWsgKiBrICogKChzICsgMSkgKiBrICsgcykgKyAxO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHR2YXIgcyA9IDEuNzAxNTggKiAxLjUyNTtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogKGsgKiBrICogKChzICsgMSkgKiBrIC0gcykpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKChrIC09IDIpICogayAqICgocyArIDEpICogayArIHMpICsgMik7XG5cblx0XHR9XG5cblx0fSxcblxuXHRCb3VuY2U6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gMSAtIFRXRUVOLkVhc2luZy5Cb3VuY2UuT3V0KDEgLSBrKTtcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrIDwgKDEgLyAyLjc1KSkge1xuXHRcdFx0XHRyZXR1cm4gNy41NjI1ICogayAqIGs7XG5cdFx0XHR9IGVsc2UgaWYgKGsgPCAoMiAvIDIuNzUpKSB7XG5cdFx0XHRcdHJldHVybiA3LjU2MjUgKiAoayAtPSAoMS41IC8gMi43NSkpICogayArIDAuNzU7XG5cdFx0XHR9IGVsc2UgaWYgKGsgPCAoMi41IC8gMi43NSkpIHtcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIChrIC09ICgyLjI1IC8gMi43NSkpICogayArIDAuOTM3NTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiA3LjU2MjUgKiAoayAtPSAoMi42MjUgLyAyLjc1KSkgKiBrICsgMC45ODQzNzU7XG5cdFx0XHR9XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrIDwgMC41KSB7XG5cdFx0XHRcdHJldHVybiBUV0VFTi5FYXNpbmcuQm91bmNlLkluKGsgKiAyKSAqIDAuNTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIFRXRUVOLkVhc2luZy5Cb3VuY2UuT3V0KGsgKiAyIC0gMSkgKiAwLjUgKyAwLjU7XG5cblx0XHR9XG5cblx0fVxuXG59O1xuXG5UV0VFTi5JbnRlcnBvbGF0aW9uID0ge1xuXG5cdExpbmVhcjogZnVuY3Rpb24gKHYsIGspIHtcblxuXHRcdHZhciBtID0gdi5sZW5ndGggLSAxO1xuXHRcdHZhciBmID0gbSAqIGs7XG5cdFx0dmFyIGkgPSBNYXRoLmZsb29yKGYpO1xuXHRcdHZhciBmbiA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuTGluZWFyO1xuXG5cdFx0aWYgKGsgPCAwKSB7XG5cdFx0XHRyZXR1cm4gZm4odlswXSwgdlsxXSwgZik7XG5cdFx0fVxuXG5cdFx0aWYgKGsgPiAxKSB7XG5cdFx0XHRyZXR1cm4gZm4odlttXSwgdlttIC0gMV0sIG0gLSBmKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZm4odltpXSwgdltpICsgMSA+IG0gPyBtIDogaSArIDFdLCBmIC0gaSk7XG5cblx0fSxcblxuXHRCZXppZXI6IGZ1bmN0aW9uICh2LCBrKSB7XG5cblx0XHR2YXIgYiA9IDA7XG5cdFx0dmFyIG4gPSB2Lmxlbmd0aCAtIDE7XG5cdFx0dmFyIHB3ID0gTWF0aC5wb3c7XG5cdFx0dmFyIGJuID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5VdGlscy5CZXJuc3RlaW47XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8PSBuOyBpKyspIHtcblx0XHRcdGIgKz0gcHcoMSAtIGssIG4gLSBpKSAqIHB3KGssIGkpICogdltpXSAqIGJuKG4sIGkpO1xuXHRcdH1cblxuXHRcdHJldHVybiBiO1xuXG5cdH0sXG5cblx0Q2F0bXVsbFJvbTogZnVuY3Rpb24gKHYsIGspIHtcblxuXHRcdHZhciBtID0gdi5sZW5ndGggLSAxO1xuXHRcdHZhciBmID0gbSAqIGs7XG5cdFx0dmFyIGkgPSBNYXRoLmZsb29yKGYpO1xuXHRcdHZhciBmbiA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuQ2F0bXVsbFJvbTtcblxuXHRcdGlmICh2WzBdID09PSB2W21dKSB7XG5cblx0XHRcdGlmIChrIDwgMCkge1xuXHRcdFx0XHRpID0gTWF0aC5mbG9vcihmID0gbSAqICgxICsgaykpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZm4odlsoaSAtIDEgKyBtKSAlIG1dLCB2W2ldLCB2WyhpICsgMSkgJSBtXSwgdlsoaSArIDIpICUgbV0sIGYgLSBpKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGlmIChrIDwgMCkge1xuXHRcdFx0XHRyZXR1cm4gdlswXSAtIChmbih2WzBdLCB2WzBdLCB2WzFdLCB2WzFdLCAtZikgLSB2WzBdKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGsgPiAxKSB7XG5cdFx0XHRcdHJldHVybiB2W21dIC0gKGZuKHZbbV0sIHZbbV0sIHZbbSAtIDFdLCB2W20gLSAxXSwgZiAtIG0pIC0gdlttXSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmbih2W2kgPyBpIC0gMSA6IDBdLCB2W2ldLCB2W20gPCBpICsgMSA/IG0gOiBpICsgMV0sIHZbbSA8IGkgKyAyID8gbSA6IGkgKyAyXSwgZiAtIGkpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0VXRpbHM6IHtcblxuXHRcdExpbmVhcjogZnVuY3Rpb24gKHAwLCBwMSwgdCkge1xuXG5cdFx0XHRyZXR1cm4gKHAxIC0gcDApICogdCArIHAwO1xuXG5cdFx0fSxcblxuXHRcdEJlcm5zdGVpbjogZnVuY3Rpb24gKG4sIGkpIHtcblxuXHRcdFx0dmFyIGZjID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5VdGlscy5GYWN0b3JpYWw7XG5cblx0XHRcdHJldHVybiBmYyhuKSAvIGZjKGkpIC8gZmMobiAtIGkpO1xuXG5cdFx0fSxcblxuXHRcdEZhY3RvcmlhbDogKGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0dmFyIGEgPSBbMV07XG5cblx0XHRcdHJldHVybiBmdW5jdGlvbiAobikge1xuXG5cdFx0XHRcdHZhciBzID0gMTtcblxuXHRcdFx0XHRpZiAoYVtuXSkge1xuXHRcdFx0XHRcdHJldHVybiBhW25dO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IG47IGkgPiAxOyBpLS0pIHtcblx0XHRcdFx0XHRzICo9IGk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRhW25dID0gcztcblx0XHRcdFx0cmV0dXJuIHM7XG5cblx0XHRcdH07XG5cblx0XHR9KSgpLFxuXG5cdFx0Q2F0bXVsbFJvbTogZnVuY3Rpb24gKHAwLCBwMSwgcDIsIHAzLCB0KSB7XG5cblx0XHRcdHZhciB2MCA9IChwMiAtIHAwKSAqIDAuNTtcblx0XHRcdHZhciB2MSA9IChwMyAtIHAxKSAqIDAuNTtcblx0XHRcdHZhciB0MiA9IHQgKiB0O1xuXHRcdFx0dmFyIHQzID0gdCAqIHQyO1xuXG5cdFx0XHRyZXR1cm4gKDIgKiBwMSAtIDIgKiBwMiArIHYwICsgdjEpICogdDMgKyAoLSAzICogcDEgKyAzICogcDIgLSAyICogdjAgLSB2MSkgKiB0MiArIHYwICogdCArIHAxO1xuXG5cdFx0fVxuXG5cdH1cblxufTtcblxuLy8gVU1EIChVbml2ZXJzYWwgTW9kdWxlIERlZmluaXRpb24pXG4oZnVuY3Rpb24gKHJvb3QpIHtcblxuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBUV0VFTjtcblx0XHR9KTtcblxuXHR9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuXG5cdFx0Ly8gTm9kZS5qc1xuXHRcdG1vZHVsZS5leHBvcnRzID0gVFdFRU47XG5cblx0fSBlbHNlIGlmIChyb290ICE9PSB1bmRlZmluZWQpIHtcblxuXHRcdC8vIEdsb2JhbCB2YXJpYWJsZVxuXHRcdHJvb3QuVFdFRU4gPSBUV0VFTjtcblxuXHR9XG5cbn0pKHRoaXMpO1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qIGpzcGFuZWwuc2FzczogMjAxOC0wNS0yMCAxMzoxMyAqL1xcbi8qIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzA0MjE1NzAvc2Fzcy11bmljb2RlLWVzY2FwZS1pcy1ub3QtcHJlc2VydmVkLWluLWNzcy1maWxlICovXFxuLmpzUGFuZWwge1xcbiAgYm9yZGVyOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiT3BlbiBTYW5zXFxcIixcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgb3BhY2l0eTogMDtcXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgei1pbmRleDogMTAwOyB9XFxuICAuanNQYW5lbCAuanNQYW5lbC1oZHIge1xcbiAgICBib3JkZXI6IDA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJPcGVuIFNhbnNcXFwiLFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWY7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgZmxleC1zaHJpbms6IDA7IH1cXG4gIC5qc1BhbmVsIC5qc1BhbmVsLWNvbnRlbnQge1xcbiAgICBib3JkZXI6IDA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJPcGVuIFNhbnNcXFwiLFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWY7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIGJhY2tncm91bmQ6ICNmZmZmZmY7XFxuICAgIGNvbG9yOiAjMDAwMDAwO1xcbiAgICBmb250LXNpemU6IDFyZW07XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xcbiAgICBmbGV4LWdyb3c6IDE7IH1cXG4gICAgLmpzUGFuZWwgLmpzUGFuZWwtY29udGVudCBwcmUge1xcbiAgICAgIGNvbG9yOiBpbmhlcml0OyB9XFxuICAuanNQYW5lbCAuanNQYW5lbC1mdHIge1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xcbiAgICBmbGV4LXdyYXA6IG5vd3JhcDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlMGUwZTA7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgICBiYWNrZ3JvdW5kOiAjZjVmNWY1O1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBjb2xvcjogYmxhY2s7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47IH1cXG4gIC5qc1BhbmVsIC5qc1BhbmVsLWZ0ci5hY3RpdmUge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LXNocmluazogMDsgfVxcbiAgICAuanNQYW5lbCAuanNQYW5lbC1mdHIuYWN0aXZlID4gKiB7XFxuICAgICAgbWFyZ2luOiAzcHggOHB4OyB9XFxuICAuanNQYW5lbCAuanNQYW5lbC1mdHIucGFuZWwtZm9vdGVyIHtcXG4gICAgcGFkZGluZzogMDsgfVxcblxcbi5qc1BhbmVsLWhlYWRlcmJhciwgLmpzUGFuZWwtaGRyLXRvb2xiYXIge1xcbiAgZm9udC1zaXplOiAxcmVtOyB9XFxuXFxuLmpzUGFuZWwtaGVhZGVyYmFyIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGZsZXgtd3JhcDogbm93cmFwO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjsgfVxcbiAgLmpzUGFuZWwtaGVhZGVyYmFyIGltZyB7XFxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICAgIG1heC1oZWlnaHQ6IDM4cHg7IH1cXG5cXG4uanNQYW5lbC10aXRsZWJhciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXgtZ3JvdzogMTtcXG4gIGN1cnNvcjogbW92ZTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG92ZXJmbG93OiBoaWRkZW47IH1cXG4gIC5qc1BhbmVsLXRpdGxlYmFyIC5qc1BhbmVsLXRpdGxlIHtcXG4gICAgY29sb3I6ICMwMDAwMDA7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiT3BlbiBTYW5zXFxcIixcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmO1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcbiAgICBmb250LXZhcmlhbnQ6IHNtYWxsLWNhcHM7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjU7XFxuICAgIG1hcmdpbjogMCA1cHggMCA4cHg7XFxuICAgIG1pbi13aWR0aDogMDsgfVxcbiAgICAuanNQYW5lbC10aXRsZWJhciAuanNQYW5lbC10aXRsZSBzbWFsbCB7XFxuICAgICAgZm9udC1zaXplOiA3MCU7XFxuICAgICAgY29sb3I6IGluaGVyaXQ7IH1cXG5cXG4uanNQYW5lbC10aXRsZWJhci5qc1BhbmVsLXJ0bCB7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7IH1cXG5cXG4uanNQYW5lbC1jb250cm9sYmFyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgdG91Y2gtYWN0aW9uOiBub25lOyB9XFxuICAuanNQYW5lbC1jb250cm9sYmFyIGRpdiBzcGFuOmhvdmVyLCAuanNQYW5lbC1jb250cm9sYmFyIGRpdiBzdmc6aG92ZXIge1xcbiAgICBvcGFjaXR5OiAuNjsgfVxcbiAgLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4ge1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIHRvdWNoLWFjdGlvbjogbm9uZTsgfVxcbiAgICAuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0biBzcGFuIHtcXG4gICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgICAgIHBhZGRpbmc6IDAgNHB4IDAgMnB4OyB9XFxuICAgIC5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuIHNwYW4uZ2x5cGhpY29uIHtcXG4gICAgICBwYWRkaW5nOiAwIDJweDsgfVxcbiAgICAuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0biBzdmcge1xcbiAgICAgIG1hcmdpbjogMCA4cHggMCAzcHg7IH1cXG4gICAgLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4gLmpzUGFuZWwtaWNvbiB7XFxuICAgICAgcGFkZGluZy10b3A6IDlweDtcXG4gICAgICBtYXJnaW46IDAgNHB4IDAgMDsgfVxcbiAgLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4tbm9ybWFsaXplLCAuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0bi1zbWFsbGlmeXJldiB7XFxuICAgIGRpc3BsYXk6IG5vbmU7IH1cXG5cXG4uanNQYW5lbC1oZHItdG9vbGJhciB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgd2lkdGg6IGF1dG87XFxuICBoZWlnaHQ6IGF1dG87XFxuICBmb250LXNpemU6IDFyZW07IH1cXG5cXG4uanNQYW5lbC1oZHItdG9vbGJhci5hY3RpdmUge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgZmxleC13cmFwOiBub3dyYXA7XFxuICBhbGlnbi1pdGVtczogY2VudGVyOyB9XFxuICAuanNQYW5lbC1oZHItdG9vbGJhci5hY3RpdmUgPiAqIHtcXG4gICAgbWFyZ2luOiAzcHggOHB4OyB9XFxuXFxuLyogc3R5bGVzIGZvciBwYW5lbHMgdXNpbmcgb3B0aW9uLnJ0bCAqL1xcbi5qc1BhbmVsLWhlYWRlcmJhci5qc1BhbmVsLXJ0bCwgLmpzUGFuZWwtY29udHJvbGJhci5qc1BhbmVsLXJ0bCwgLmpzUGFuZWwtaGRyLXRvb2xiYXIuanNQYW5lbC1ydGwge1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlOyB9XFxuXFxuLmpzUGFuZWwtaGRyLXRvb2xiYXIuYWN0aXZlLmpzUGFuZWwtcnRsIHtcXG4gIHBhZGRpbmc6IDdweCAwIDEwcHggMDsgfVxcblxcbi5qc1BhbmVsLWZ0ci5qc1BhbmVsLXJ0bCB7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93OyB9XFxuXFxuLyogY29udGFpbmVyIHRoYXQgdGFrZXMgdGhlIG1pbmlmaWVkIGpzUGFuZWxzICovXFxuI2pzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyLCAuanNQYW5lbC1taW5pbWl6ZWQtYm94LCAuanNQYW5lbC1taW5pbWl6ZWQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWZsb3c6IHJvdyB3cmFwLXJldmVyc2U7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCBub25lIHJlcGVhdCBzY3JvbGwgMCAwO1xcbiAgYm90dG9tOiAwO1xcbiAgaGVpZ2h0OiBhdXRvO1xcbiAgbGVmdDogMDtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHdpZHRoOiBhdXRvO1xcbiAgei1pbmRleDogOTk5ODsgfVxcbiAgI2pzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50LCAuanNQYW5lbC1taW5pbWl6ZWQtYm94IC5qc1BhbmVsLXJlcGxhY2VtZW50LCAuanNQYW5lbC1taW5pbWl6ZWQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgd2lkdGg6IDIwMHB4O1xcbiAgICBoZWlnaHQ6IDQwcHg7XFxuICAgIG1hcmdpbjogMXB4IDFweCAwIDA7XFxuICAgIHotaW5kZXg6IDk5OTk7IH1cXG4gICAgI2pzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWhkciwgLmpzUGFuZWwtbWluaW1pemVkLWJveCAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1oZHIsIC5qc1BhbmVsLW1pbmltaXplZC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtaGRyIHtcXG4gICAgICBmbGV4LWdyb3c6IDE7XFxuICAgICAgbWluLXdpZHRoOiAwO1xcbiAgICAgIHBhZGRpbmc6IDA7IH1cXG4gICAgICAjanNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhlYWRlcmxvZ28sIC5qc1BhbmVsLW1pbmltaXplZC1ib3ggLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhlYWRlcmxvZ28sIC5qc1BhbmVsLW1pbmltaXplZC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhlYWRlcmxvZ28ge1xcbiAgICAgICAgbWF4LXdpZHRoOiA1MCU7XFxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuICAgICAgICAjanNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhlYWRlcmxvZ28gaW1nLCAuanNQYW5lbC1taW5pbWl6ZWQtYm94IC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZWFkZXJsb2dvIGltZywgLmpzUGFuZWwtbWluaW1pemVkLWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGVhZGVybG9nbyBpbWcge1xcbiAgICAgICAgICBtYXgtd2lkdGg6IDEwMHB4O1xcbiAgICAgICAgICBtYXgtaGVpZ2h0OiAzOHB4OyB9XFxuICAgICNqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC10aXRsZWJhciwgLmpzUGFuZWwtbWluaW1pemVkLWJveCAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC10aXRsZWJhciwgLmpzUGFuZWwtbWluaW1pemVkLWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC10aXRsZWJhciB7XFxuICAgICAgY3Vyc29yOiBkZWZhdWx0O1xcbiAgICAgIG1pbi13aWR0aDogMDsgfVxcbiAgICAjanNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtYnRuLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZSwgLmpzUGFuZWwtbWluaW1pemVkLWJveCAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1idG4uanNQYW5lbC1idG4tbm9ybWFsaXplLCAuanNQYW5lbC1taW5pbWl6ZWQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWJ0bi5qc1BhbmVsLWJ0bi1ub3JtYWxpemUge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrOyB9XFxuXFxuLmpzUGFuZWwtbWluaW1pemVkLWJveCwgLmpzUGFuZWwtbWluaW1pemVkLWNvbnRhaW5lciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogMTAwJTtcXG4gIG92ZXJmbG93OiBoaWRkZW47IH1cXG5cXG4vKiBoZWxwZXIgY2xhc3NlcyB0byBtYWtlIC5qc1BhbmVsLWNvbnRlbnQgYSBmbGV4IGJveCAqL1xcbi5mbGV4T25lIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWZsb3c6IHJvdyB3cmFwOyB9XFxuXFxuLyogY3NzIGZvciByZXNpemVpdCBoYW5kbGVzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBmb250LXNpemU6IDAuMXB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG91Y2gtYWN0aW9uOiBub25lOyB9XFxuXFxuLmpzUGFuZWwtcmVzaXplaXQtaGFuZGxlLmpzUGFuZWwtcmVzaXplaXQtbiB7XFxuICBjdXJzb3I6IG4tcmVzaXplO1xcbiAgaGVpZ2h0OiAxMnB4O1xcbiAgbGVmdDogOXB4O1xcbiAgdG9wOiAtNXB4O1xcbiAgd2lkdGg6IGNhbGMoMTAwJSAtIDE4cHgpOyB9XFxuXFxuLmpzUGFuZWwtcmVzaXplaXQtaGFuZGxlLmpzUGFuZWwtcmVzaXplaXQtZSB7XFxuICBjdXJzb3I6IGUtcmVzaXplO1xcbiAgaGVpZ2h0OiBjYWxjKDEwMCUgLSAxOHB4KTtcXG4gIHJpZ2h0OiAtOXB4O1xcbiAgdG9wOiA5cHg7XFxuICB3aWR0aDogMTJweDsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LXMge1xcbiAgYm90dG9tOiAtOXB4O1xcbiAgY3Vyc29yOiBzLXJlc2l6ZTtcXG4gIGhlaWdodDogMTJweDtcXG4gIGxlZnQ6IDlweDtcXG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAxOHB4KTsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LXcge1xcbiAgY3Vyc29yOiB3LXJlc2l6ZTtcXG4gIGhlaWdodDogY2FsYygxMDAlIC0gMThweCk7XFxuICBsZWZ0OiAtOXB4O1xcbiAgdG9wOiA5cHg7XFxuICB3aWR0aDogMTJweDsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LW5lIHtcXG4gIGN1cnNvcjogbmUtcmVzaXplO1xcbiAgaGVpZ2h0OiAxOHB4O1xcbiAgcmlnaHQ6IC05cHg7XFxuICB0b3A6IC05cHg7XFxuICB3aWR0aDogMThweDsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LXNlIHtcXG4gIGJvdHRvbTogLTlweDtcXG4gIGN1cnNvcjogc2UtcmVzaXplO1xcbiAgaGVpZ2h0OiAxOHB4O1xcbiAgcmlnaHQ6IC05cHg7XFxuICB3aWR0aDogMThweDsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LXN3IHtcXG4gIGJvdHRvbTogLTlweDtcXG4gIGN1cnNvcjogc3ctcmVzaXplO1xcbiAgaGVpZ2h0OiAxOHB4O1xcbiAgbGVmdDogLTlweDtcXG4gIHdpZHRoOiAxOHB4OyB9XFxuXFxuLmpzUGFuZWwtcmVzaXplaXQtaGFuZGxlLmpzUGFuZWwtcmVzaXplaXQtbncge1xcbiAgY3Vyc29yOiBudy1yZXNpemU7XFxuICBoZWlnaHQ6IDE4cHg7XFxuICBsZWZ0OiAtOXB4O1xcbiAgdG9wOiAtOXB4O1xcbiAgd2lkdGg6IDE4cHg7IH1cXG5cXG4uanNQYW5lbC1kcmFnLW92ZXJsYXkge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiAwOyB9XFxuXFxuLyogYm94LXNoYWRvd3MgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtZGVwdGgtMSB7XFxuICBib3gtc2hhZG93OiAwIDNweCA2cHggcmdiYSgwLCAwLCAwLCAwLjE2KSwgMCAzcHggNnB4IHJnYmEoMCwgMCwgMCwgMC4yMyk7IH1cXG5cXG4uanNQYW5lbC1kZXB0aC0yIHtcXG4gIGJveC1zaGFkb3c6IDAgMTBweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC4xOSksIDAgNnB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMjMpOyB9XFxuXFxuLmpzUGFuZWwtZGVwdGgtMyB7XFxuICBib3gtc2hhZG93OiAwIDE0cHggMjhweCByZ2JhKDAsIDAsIDAsIDAuMjUpLCAwIDEwcHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMjIpOyB9XFxuXFxuLmpzUGFuZWwtZGVwdGgtNCB7XFxuICBib3gtc2hhZG93OiAwIDE5cHggMzhweCByZ2JhKDAsIDAsIDAsIDAuMyksIDAgMTVweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4yMik7IH1cXG5cXG4uanNQYW5lbC1kZXB0aC01IHtcXG4gIGJveC1zaGFkb3c6IDAgMjRweCA0OHB4IHJnYmEoMCwgMCwgMCwgMC4zKSwgMCAyMHB4IDE0cHggcmdiYSgwLCAwLCAwLCAwLjIyKTsgfVxcblxcbi8qIHNuYXAgc2Vuc2l0aXZlIGFyZWFzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcbi5qc1BhbmVsLXNuYXAtYXJlYSB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBiYWNrZ3JvdW5kOiBibGFjaztcXG4gIG9wYWNpdHk6IC4yO1xcbiAgYm9yZGVyOiAxcHggc29saWQgc2lsdmVyO1xcbiAgYm94LXNoYWRvdzogMCAxNHB4IDI4cHggcmdiYSgwLCAwLCAwLCAwLjUpLCAwIDEwcHggMTBweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICB6LWluZGV4OiA5OTk5OyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWx0LCAuanNQYW5lbC1zbmFwLWFyZWEtbGMsIC5qc1BhbmVsLXNuYXAtYXJlYS1sYiB7XFxuICBsZWZ0OiAwOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWN0LCAuanNQYW5lbC1zbmFwLWFyZWEtY2Ige1xcbiAgbGVmdDogMzcuNSU7IH1cXG5cXG4uanNQYW5lbC1zbmFwLWFyZWEtcnQsIC5qc1BhbmVsLXNuYXAtYXJlYS1yYywgLmpzUGFuZWwtc25hcC1hcmVhLXJiIHtcXG4gIHJpZ2h0OiAwOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWx0LCAuanNQYW5lbC1zbmFwLWFyZWEtY3QsIC5qc1BhbmVsLXNuYXAtYXJlYS1ydCB7XFxuICB0b3A6IDA7IH1cXG5cXG4uanNQYW5lbC1zbmFwLWFyZWEtbGMsIC5qc1BhbmVsLXNuYXAtYXJlYS1yYyB7XFxuICB0b3A6IDM3LjUlOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWxiLCAuanNQYW5lbC1zbmFwLWFyZWEtY2IsIC5qc1BhbmVsLXNuYXAtYXJlYS1yYiB7XFxuICBib3R0b206IDA7IH1cXG5cXG4uanNQYW5lbC1zbmFwLWFyZWEtY3QsIC5qc1BhbmVsLXNuYXAtYXJlYS1jYiB7XFxuICB3aWR0aDogMjUlOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWxjLCAuanNQYW5lbC1zbmFwLWFyZWEtcmMge1xcbiAgaGVpZ2h0OiAyNSU7IH1cXG5cXG4uanNQYW5lbC1zbmFwLWFyZWEtbHQge1xcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwMCU7IH1cXG5cXG4uanNQYW5lbC1zbmFwLWFyZWEtcnQge1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTAwJTsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1yYiB7XFxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAxMDAlOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWxiIHtcXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxMDAlOyB9XFxuXFxuLyogdG9vbHRpcCBhbmQgdG9vbHRpcCBjb25uZWN0b3JzICovXFxuLmpzUGFuZWwtY29ubmVjdG9yLWxlZnQtdG9wLCAuanNQYW5lbC1jb25uZWN0b3ItcmlnaHQtdG9wLCAuanNQYW5lbC1jb25uZWN0b3ItbGVmdC1ib3R0b20sIC5qc1BhbmVsLWNvbm5lY3Rvci1yaWdodC1ib3R0b20ge1xcbiAgd2lkdGg6IDEycHg7XFxuICBoZWlnaHQ6IDEycHg7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7IH1cXG5cXG4uanNQYW5lbC1jb25uZWN0b3ItbGVmdCwgLmpzUGFuZWwtY29ubmVjdG9yLXRvcCwgLmpzUGFuZWwtY29ubmVjdG9yLWJvdHRvbSwgLmpzUGFuZWwtY29ubmVjdG9yLXJpZ2h0IHtcXG4gIHdpZHRoOiAwO1xcbiAgaGVpZ2h0OiAwO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm9yZGVyOiAxMnB4IHNvbGlkIHRyYW5zcGFyZW50OyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLWxlZnQtdG9wIHtcXG4gIGxlZnQ6IGNhbGMoMTAwJSAtIDZweCk7XFxuICB0b3A6IGNhbGMoMTAwJSAtIDZweCk7IH1cXG5cXG4uanNQYW5lbC1jb25uZWN0b3ItcmlnaHQtdG9wIHtcXG4gIGxlZnQ6IC02cHg7XFxuICB0b3A6IGNhbGMoMTAwJSAtIDZweCk7IH1cXG5cXG4uanNQYW5lbC1jb25uZWN0b3ItcmlnaHQtYm90dG9tIHtcXG4gIGxlZnQ6IC02cHg7XFxuICB0b3A6IC02cHg7IH1cXG5cXG4uanNQYW5lbC1jb25uZWN0b3ItbGVmdC1ib3R0b20ge1xcbiAgbGVmdDogY2FsYygxMDAlIC0gNnB4KTtcXG4gIHRvcDogLTZweDsgfVxcblxcbi5qc1BhbmVsLWNvbm5lY3Rvci10b3Age1xcbiAgbGVmdDogY2FsYyg1MCUgLSAxMnB4KTtcXG4gIHRvcDogMTAwJTsgfVxcblxcbi5qc1BhbmVsLWNvbm5lY3Rvci1yaWdodCB7XFxuICBsZWZ0OiAtMjRweDtcXG4gIHRvcDogY2FsYyg1MCUgLSAxMnB4KTsgfVxcblxcbi5qc1BhbmVsLWNvbm5lY3Rvci1ib3R0b20ge1xcbiAgbGVmdDogY2FsYyg1MCUgLSAxMnB4KTtcXG4gIHRvcDogLTI0cHg7IH1cXG5cXG4uanNQYW5lbC1jb25uZWN0b3ItbGVmdCB7XFxuICBsZWZ0OiAxMDAlO1xcbiAgdG9wOiBjYWxjKDUwJSAtIDEycHgpOyB9XFxuXFxuLyogSUUxMSBDU1Mgc3R5bGVzIGdvIGhlcmUgKi9cXG5AbWVkaWEgYWxsIGFuZCAoLW1zLWhpZ2gtY29udHJhc3Q6IG5vbmUpLCAoLW1zLWhpZ2gtY29udHJhc3Q6IGFjdGl2ZSkge1xcbiAgI2pzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLXRpdGxlYmFyIHtcXG4gICAgbWF4LXdpZHRoOiAxMDVweDsgfSB9XFxuXFxuLyogWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFggKi9cXG4vKiBib290c3RyYXAgYWRqdXN0bWVudHMgKi9cXG4uanNQYW5lbC5wYW5lbC1kZWZhdWx0LCAuanNQYW5lbC5wYW5lbC1wcmltYXJ5LCAuanNQYW5lbC5wYW5lbC1pbmZvLCAuanNQYW5lbC5wYW5lbC1zdWNjZXNzLCAuanNQYW5lbC5wYW5lbC13YXJuaW5nLCAuanNQYW5lbC5wYW5lbC1kYW5nZXIsIC5qc1BhbmVsLmNhcmQuY2FyZC1pbnZlcnNlIHtcXG4gIGJveC1zaGFkb3c6IDAgMCA2cHggcmdiYSgwLCAzMywgNTAsIDAuMSksIDAgN3B4IDI1cHggcmdiYSgxNywgMzgsIDYwLCAwLjQpOyB9XFxuXFxuLmpzUGFuZWwucGFuZWwge1xcbiAgbWFyZ2luOiAwOyB9XFxuXFxuLmpzUGFuZWwtaGRyLnBhbmVsLWhlYWRpbmcge1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTtcXG4gIHBhZGRpbmc6IDA7IH1cXG5cXG4uanNQYW5lbC10aXRsZS5wYW5lbC10aXRsZSAuc21hbGwsIC5qc1BhbmVsLXRpdGxlLnBhbmVsLXRpdGxlIHNtYWxsIHtcXG4gIGZvbnQtc2l6ZTogNzUlOyB9XFxuXFxuLyogYm9vdHN0cmFwIDQgYWRqdXN0bWVudHMgKi9cXG4uanNQYW5lbC5jYXJkLmNhcmQtaW52ZXJzZSB7XFxuICBib3gtc2hhZG93OiAwIDAgNnB4IHJnYmEoMCwgMzMsIDUwLCAwLjEpLCAwIDdweCAyNXB4IHJnYmEoMTcsIDM4LCA2MCwgMC40KTsgfVxcblxcbi5jYXJkLWRlZmF1bHQge1xcbiAgYmFja2dyb3VuZDogI2Y1ZjVmNTsgfVxcblxcbi5jYXJkLXByaW1hcnkgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQsXFxuLmNhcmQtc3VjY2VzcyA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCxcXG4uY2FyZC1pbmZvID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkLFxcbi5jYXJkLXdhcm5pbmcgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQsXFxuLmNhcmQtZGFuZ2VyID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkIHtcXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgY29sb3I6ICNmNWY1ZjU7IH1cXG5cXG4uY2FyZC1kZWZhdWx0ID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkIHtcXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4vKiBjc3MzIGFuaW1hdGlvbnMgKi9cXG5Aa2V5ZnJhbWVzIGpzUGFuZWxGYWRlSW4ge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuLmpzUGFuZWxGYWRlSW4ge1xcbiAgb3BhY2l0eTogMDtcXG4gIGFuaW1hdGlvbjoganNQYW5lbEZhZGVJbiBlYXNlLWluIDE7XFxuICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogNjAwbXM7IH1cXG5cXG5Aa2V5ZnJhbWVzIGpzUGFuZWxGYWRlT3V0IHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDA7IH0gfVxcblxcbi5qc1BhbmVsRmFkZU91dCB7XFxuICBhbmltYXRpb246IGpzUGFuZWxGYWRlT3V0IGVhc2UtaW4gMTtcXG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiA2MDBtczsgfVxcblxcbkBrZXlmcmFtZXMgbW9kYWxCYWNrZHJvcEZhZGVJbiB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwLjY1OyB9IH1cXG5cXG4uanNQYW5lbC1tb2RhbC1iYWNrZHJvcCB7XFxuICBhbmltYXRpb246IG1vZGFsQmFja2Ryb3BGYWRlSW4gZWFzZS1pbiAxO1xcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDc1MG1zO1xcbiAgYmFja2dyb3VuZDogYmxhY2s7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7IH1cXG5cXG5Aa2V5ZnJhbWVzIG1vZGFsQmFja2Ryb3BGYWRlT3V0IHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwLjY1OyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDA7IH0gfVxcblxcbi5qc1BhbmVsLW1vZGFsLWJhY2tkcm9wLW91dCB7XFxuICBhbmltYXRpb246IG1vZGFsQmFja2Ryb3BGYWRlT3V0IGVhc2UtaW4gMTtcXG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiA0MDBtczsgfVxcblxcbi5qc1BhbmVsLW1vZGFsLWJhY2tkcm9wLW11bHRpIHtcXG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4xNSk7IH1cXG5cXG4uanNQYW5lbC1jb250ZW50IC5qc1BhbmVsLWlmcmFtZS1vdmVybGF5IHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IH1cXG5cXG4vKiBfdGhlbWVzX21kbC5zYXNzOiAyMDE3LTA3LTEyIDE5OjE2ICovXFxuLyogZGVmYXVsdCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtdGhlbWUtZGVmYXVsdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2ZkOGRjO1xcbiAgYm9yZGVyLWNvbG9yOiAjY2ZkOGRjOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtZGVmYXVsdCA+IC5qc1BhbmVsLWhkciAqIHtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtZGVmYXVsdCA+IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZHItdG9vbGJhciB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzkwYTRhZTsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRlZmF1bHQgPiAuanNQYW5lbC1jb250ZW50IHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjOTBhNGFlOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtZGVmYXVsdCA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2ZkOGRjO1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM5MGE0YWU7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1kZWZhdWx0ID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkbGlnaHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VjZWZmMTsgfVxcblxcbi8qIHByaW1hcnkgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcbi5qc1BhbmVsLXRoZW1lLXByaW1hcnkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIxOTZmMztcXG4gIGJvcmRlci1jb2xvcjogIzIxOTZmMzsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXByaW1hcnkgPiAuanNQYW5lbC1oZHIgKiB7XFxuICBjb2xvcjogI2ZmZmZmZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXByaW1hcnkgPiAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGRyLXRvb2xiYXIge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM0MmE1ZjU7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1wcmltYXJ5ID4gLmpzUGFuZWwtY29udGVudCB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzQyYTVmNTsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXByaW1hcnkgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIxOTZmMztcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNDJhNWY1O1xcbiAgY29sb3I6ICNmZmZmZmY7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1wcmltYXJ5ID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkbGlnaHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2JiZGVmYjtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLyogaW5mbyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtdGhlbWUtaW5mbyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjliNmY2O1xcbiAgYm9yZGVyLWNvbG9yOiAjMjliNmY2OyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtaW5mbyA+IC5qc1BhbmVsLWhkciAqIHtcXG4gIGNvbG9yOiAjZmZmZmZmOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtaW5mbyA+IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZHItdG9vbGJhciB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzRmYzNmNzsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWluZm8gPiAuanNQYW5lbC1jb250ZW50IHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNGZjM2Y3OyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtaW5mbyA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjliNmY2O1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM0ZmMzZjc7XFxuICBjb2xvcjogI2ZmZmZmZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWluZm8gPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWRsaWdodCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTFmNWZlO1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4vKiBzdWNjZXNzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXG4uanNQYW5lbC10aGVtZS1zdWNjZXNzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0Y2FmNTA7XFxuICBib3JkZXItY29sb3I6ICM0Y2FmNTA7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1zdWNjZXNzID4gLmpzUGFuZWwtaGRyICoge1xcbiAgY29sb3I6ICNmZmZmZmY7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1zdWNjZXNzID4gLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhkci10b29sYmFyIHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjODFjNzg0OyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtc3VjY2VzcyA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGNhZjUwO1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM4MWM3ODQ7XFxuICBjb2xvcjogI2ZmZmZmZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXN1Y2Nlc3MgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWRsaWdodCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZThmNWU5O1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4vKiB3YXJuaW5nIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXG4uanNQYW5lbC10aGVtZS13YXJuaW5nIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmMxMDc7XFxuICBib3JkZXItY29sb3I6ICNmZmMxMDc7IH1cXG5cXG4uanNQYW5lbC10aGVtZS13YXJuaW5nID4gLmpzUGFuZWwtaGRyICoge1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4uanNQYW5lbC10aGVtZS13YXJuaW5nID4gLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhkci10b29sYmFyIHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZmZkNTRmOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtd2FybmluZyA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZjMTA3O1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmZmQ1NGY7XFxuICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXdhcm5pbmcgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWRsaWdodCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmM2UwO1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4vKiBkYW5nZXIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXG4uanNQYW5lbC10aGVtZS1kYW5nZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmM2QwMDtcXG4gIGJvcmRlci1jb2xvcjogI2ZmM2QwMDsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRhbmdlciA+IC5qc1BhbmVsLWhkciAqIHtcXG4gIGNvbG9yOiAjZmZmZmZmOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtZGFuZ2VyID4gLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhkci10b29sYmFyIHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZmY2ZTQwOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtZGFuZ2VyID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjNkMDA7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgI2ZmNmU0MDtcXG4gIGNvbG9yOiAjZmZmZmZmOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtZGFuZ2VyID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkbGlnaHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmOWU4MDtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtbm9oZWFkZXIge1xcbiAgYm9yZGVyOiBub25lICFpbXBvcnRhbnQ7IH1cXG5cXG5ib2R5IHtcXG4gIC1tcy1vdmVyZmxvdy1zdHlsZTogc2Nyb2xsYmFyOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIjYnV0dHBsdWdkZXZ0b29sc2xvZ3BhbmVsIHtcXG4gICAgZGlzcGxheTpmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjpjb2x1bW47XFxuICAgIHdpZHRoOjEwMCU7XFxuICAgIGhlaWdodDoxMDAlO1xcbiAgICBhbGlnbi1pdGVtczpjZW50ZXI7XFxuICAgIGNvbG9yOiAjMDAwO1xcbn1cXG5cXG4jYnV0dHBsdWdkZXZ0b29sc2xvZ3BhbmVsIGlucHV0LHNlbGVjdCx0ZXh0YXJlYSB7XFxuICAgIGNvbG9yOiAjMDAwO1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcbn1cXG5cXG4jYnV0dHBsdWdkZXZ0b29sc2xvZ3BhbmVsICNidXR0cGx1Z2RldnRvb2xzbG9ndGV4dGFyZWEge1xcbiAgICBmb250LXNpemU6IDhwdDtcXG4gICAgd2lkdGg6MTAwJTtcXG4gICAgZmxleDoxIDE7XFxuICAgIHBhZGRpbmc6NXB4O1xcbiAgICBib3gtc2l6aW5nOmJvcmRlci1ib3g7XFxufVxcbiNidXR0cGx1Z2RldnRvb2xzbG9ncGFuZWwgI2J1dHRwbHVnZGV2dG9vbHNsb2dsZXZlbCB7XFxuICAgIHdpZHRoOjk4JTtcXG4gICAgZmxleDpub25lO1xcbiAgICBwYWRkaW5nOjVweDtcXG4gICAgYm94LXNpemluZzpib3JkZXItYm94O1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImJ1dHRwbHVnLWRldnRvb2xzLW1haW4ge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG5idXR0cGx1Zy1kZXZ0b29scy1tYWluIHNlY3Rpb24ge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBwYWRkaW5nOiAyMHB4O1xcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2RkZDtcXG59XFxuXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiBpbnB1dCB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gbGFiZWwge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIG1hcmdpbjogMCAwIC0xcHg7XFxuICAgIHBhZGRpbmc6IDVweCAxMHB4O1xcbiAgICBmb250LXdlaWdodDogNjAwO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGNvbG9yOiAjYmJiO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcXG59XFxuXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiBsYWJlbDpiZWZvcmUge1xcbiAgICBmb250LWZhbWlseTogZm9udGF3ZXNvbWU7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcXG59XFxuXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiBsYWJlbDpob3ZlciB7XFxuICAgIGNvbG9yOiAjODg4O1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gaW5wdXQ6Y2hlY2tlZCArIGxhYmVsIHtcXG4gICAgY29sb3I6ICM1NTU7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XFxuICAgIGJvcmRlci10b3A6IDJweCBzb2xpZCBvcmFuZ2U7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZmZmO1xcbn1cXG5cXG5idXR0cGx1Zy1kZXZ0b29scy1tYWluICN0YWIxOmNoZWNrZWQgfiAjY29udGVudDEsXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiAjdGFiMjpjaGVja2VkIH4gI2NvbnRlbnQyLFxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gI3RhYjM6Y2hlY2tlZCB+ICNjb250ZW50MyxcXG5idXR0cGx1Zy1kZXZ0b29scy1tYWluICN0YWI0OmNoZWNrZWQgfiAjY29udGVudDQge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiAjY29udGVudDEge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gI2NvbnRlbnQyIHtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG5idXR0cGx1Zy1kZXZ0b29scy1tYWluICNzaW11bGF0b3Ige1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSA2MHB4KTtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG59XFxuXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiAuZmxlc2hsaWdodC1zaW0ge1xcbiAgICBmbGV4OiAxO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiBkaXYuYy1mbGVzaGxpZ2h0IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleDogMTtcXG59XFxuXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiBkaXYuYy1mbGVzaGxpZ2h0IGltZyB7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgd2lkdGg6IGF1dG87XFxuXFx0ICBpbWFnZS1yZW5kZXJpbmc6IC1tb3otY3Jpc3AtZWRnZXM7XFxuXFx0ICBpbWFnZS1yZW5kZXJpbmc6IC1vLWNyaXNwLWVkZ2VzO1xcblxcdCAgaW1hZ2UtcmVuZGVyaW5nOiAtd2Via2l0LW9wdGltaXplLWNvbnRyYXN0O1xcblxcdCAgaW1hZ2UtcmVuZGVyaW5nOiBwaXhlbGF0ZWQ7XFxufVxcblxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gZGl2LmMtZmxlc2hsaWdodCAuby1mbGVzaGxpZ2h0IHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBoZWlnaHQ6IDc3JTtcXG59XFxuXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiAudmlicmF0b3Itc2ltdWxhdG9yLWNvbXBvbmVudCB7XFxuICAgIGZsZXg6IDE7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG5idXR0cGx1Zy1kZXZ0b29scy1tYWluIGRpdi52aWJyYXRvciB7XFxuICAgIGZsZXg6IDEgMTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiBkaXYudmlicmF0b3Itc2ltdWxhdG9yLWNvbXBvbmVudCBpbWcge1xcbiAgICBoZWlnaHQ6IGNhbGMoMTAwJSAtIDQwcHgpO1xcbiAgICB3aWR0aDogYXV0bztcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBpbWFnZS1yZW5kZXJpbmc6IC1tb3otY3Jpc3AtZWRnZXM7XFxuXFx0ICBpbWFnZS1yZW5kZXJpbmc6IC1vLWNyaXNwLWVkZ2VzO1xcblxcdCAgaW1hZ2UtcmVuZGVyaW5nOiAtd2Via2l0LW9wdGltaXplLWNvbnRyYXN0O1xcblxcdCAgaW1hZ2UtcmVuZGVyaW5nOiBwaXhlbGF0ZWQ7XFxufVxcblxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gZGl2LnZpYnJhdG9yLWluZm8ge1xcbiAgICBmbGV4OiAwO1xcbn1cXG5cXG5idXR0cGx1Zy1kZXZ0b29scy1tYWluIC5zaW11bGF0b3ItZGl2aWRlciB7XFxuICAgIGJvcmRlci1sZWZ0OiAxcHggIzAwMCBkYXNoZWQ7XFxuICAgIGhlaWdodDogMTAwJTtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4gKCcgKyBlciArICcpJyk7XG4gICAgICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmICh0aGlzLl9ldmVudHMpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoZXZsaXN0ZW5lcilcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuIiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9qc3BhbmVsLmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vanNwYW5lbC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vanNwYW5lbC5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCIndXNlIHN0cmljdCc7ZXhwb3J0IGNvbnN0IGpzUGFuZWw9e3ZlcnNpb246JzQuMC4wJyxkYXRlOicyMDE4LTA1LTIyIDA5OjA5JyxhamF4QWx3YXlzQ2FsbGJhY2tzOltdLGF1dG9wb3NpdGlvblNwYWNpbmc6NCxjbG9zZU9uRXNjYXBlOigoKT0+e2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLG49PnsoJ0VzY2FwZSc9PT1uLmtleXx8J0VzYyc9PT1uLmNvZGV8fDI3PT09bi5rZXlDb2RlKSYmanNQYW5lbC5nZXRQYW5lbHMoZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwnKX0pLnNvbWUobz0+e3JldHVybiEhby5vcHRpb25zLmNsb3NlT25Fc2NhcGUmJihvLmNsb3NlKCksITApfSl9LCExKX0pKCksZGVmYXVsdHM6e2JveFNoYWRvdzozLGNvbnRhaW5lcjpkb2N1bWVudC5ib2R5LGNvbnRlbnRTaXplOnt3aWR0aDonNDAwcHgnLGhlaWdodDonMjAwcHgnfSxkcmFnaXQ6e2N1cnNvcjonbW92ZScsaGFuZGxlczonLmpzUGFuZWwtaGVhZGVybG9nbywgLmpzUGFuZWwtdGl0bGViYXIsIC5qc1BhbmVsLWZ0cicsb3BhY2l0eTowLjgsZGlzYWJsZU9uTWF4aW1pemVkOiEwfSxoZWFkZXI6ITAsaGVhZGVyVGl0bGU6J2pzUGFuZWwnLGhlYWRlckNvbnRyb2xzOidhbGwnLGljb25mb250OiExLG1heGltaXplZE1hcmdpbjowLG1pbmltaXplVG86J2RlZmF1bHQnLHBhbmVsdHlwZTonc3RhbmRhcmQnLHBvc2l0aW9uOidjZW50ZXInLHJlc2l6ZWl0OntoYW5kbGVzOiduLCBlLCBzLCB3LCBuZSwgc2UsIHN3LCBudycsbWluV2lkdGg6MTI4LG1pbkhlaWdodDoxMjh9LHRoZW1lOidkZWZhdWx0J30sZGVmYXVsdFNuYXBDb25maWc6e3NlbnNpdGl2aXR5OjcwLHRyaWdnZXI6J3BhbmVsJ30sZXJyb3I6KCgpPT57d2luZG93LmpzUGFuZWxFcnJvcnx8KHdpbmRvdy5qc1BhbmVsRXJyb3I9ZnVuY3Rpb24obil7dGhpcy5uYW1lPSdqc1BhbmVsRXJyb3InLHRoaXMubWVzc2FnZT1ufHwnJyx0aGlzLnN0YWNrPW5ldyBFcnJvcigpLnN0YWNrfSxqc1BhbmVsRXJyb3IucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoRXJyb3IucHJvdG90eXBlKSxqc1BhbmVsRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yPWpzUGFuZWxFcnJvcil9KSgpLGV4dGVuc2lvbnM6e30sZ2xvYmFsQ2FsbGJhY2tzOiExLGljb25zOntjbG9zZTpgPHN2ZyBjbGFzcz1cImpzUGFuZWwtaWNvblwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyOFwiIGhlaWdodD1cIjMyXCIgdmlld0JveD1cIjAgMCAyOCAzMlwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTE3Ljc1IDE2bDkuODUtOS44NWMwLjUtMC41IDAuNS0xLjMgMC0xLjc1LTAuNS0wLjUtMS4zLTAuNS0xLjc1IDBsLTkuODUgOS44NS05Ljg1LTkuOWMtMC41LTAuNS0xLjMtMC41LTEuNzUgMC0wLjUgMC41LTAuNSAxLjMgMCAxLjc1bDkuODUgOS45LTkuOSA5Ljg1Yy0wLjUgMC41LTAuNSAxLjMgMCAxLjc1IDAuMjUgMC4yNSAwLjU1IDAuMzUgMC45IDAuMzVzMC42NS0wLjEgMC45LTAuMzVsOS44NS05Ljg1IDkuODUgOS44NWMwLjI1IDAuMjUgMC41NSAwLjM1IDAuOSAwLjM1czAuNjUtMC4xIDAuOS0wLjM1YzAuNS0wLjUgMC41LTEuMyAwLTEuNzVsLTkuOS05Ljg1elwiPjwvcGF0aD48L3N2Zz5gLG1heGltaXplOmA8c3ZnIGNsYXNzPVwianNQYW5lbC1pY29uXCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjI4XCIgaGVpZ2h0PVwiMzJcIiB2aWV3Qm94PVwiMCAwIDI4IDMyXCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMjcuNTUgMy45aC0yMi42Yy0wLjU1IDAtMSAwLjQ1LTEgMXYyMi4zYzAgMC41NSAwLjQ1IDEgMSAxaDIyLjU1YzAuNTUgMCAxLTAuNDUgMS0xdi0yMi4zYzAuMDUwLTAuNTUtMC40LTEtMC45NS0xek01Ljk1IDI2LjE1di0xOGgyMC41NXYxOGgtMjAuNTV6XCI+PC9wYXRoPjwvc3ZnPmAsbm9ybWFsaXplOmA8c3ZnIGNsYXNzPVwianNQYW5lbC1pY29uXCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjI4XCIgaGVpZ2h0PVwiMzJcIiB2aWV3Qm94PVwiMCAwIDI4IDMyXCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMjcuOSAzLjc1aC0xOC44Yy0wLjQgMC0wLjc1IDAuMzUtMC43NSAwLjc1djQuM2MwIDAuMSAwIDAuMiAwLjA1MCAwLjNoLTQuMmMtMC41NSAwLTEgMC40NS0xIDF2MTcuNGMwIDAuNTUgMC40NSAxIDEgMWgxNy42NWMwLjU1IDAgMS0wLjQ1IDEtMXYtMy43YzAuMDUwIDAgMC4xIDAuMDUwIDAuMiAwLjA1MGg0LjljMC40IDAgMC43NS0wLjM1IDAuNzUtMC43NXYtMTguNmMtMC4wNTAtMC40LTAuNC0wLjc1LTAuOC0wLjc1ek01LjIgMjYuNXYtMTIuOTVjMC4wNTAgMCAwLjEgMCAwLjE1IDBoMTUuNGMwLjA1MCAwIDAuMSAwIDAuMTUgMHYxMi45NWgtMTUuN3pNMjcuMTUgMjIuMzVoLTQuMTVjLTAuMDUwIDAtMC4xNSAwLTAuMiAwLjA1MHYtMTIuM2MwLTAuNTUtMC40NS0xLTEtMWgtMTJjMC4wNTAtMC4xIDAuMDUwLTAuMiAwLjA1MC0wLjN2LTMuNTVoMTcuM3YxNy4xelwiPjwvcGF0aD48L3N2Zz5gLG1pbmltaXplOmA8c3ZnIGNsYXNzPVwianNQYW5lbC1pY29uXCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjI4XCIgaGVpZ2h0PVwiMzJcIiB2aWV3Qm94PVwiMCAwIDI4IDMyXCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMjcuMyAyOC41aC0yMi42Yy0wLjg1IDAtMS41LTAuNjUtMS41LTEuNXMwLjY1LTEuNSAxLjUtMS41aDIyLjU1YzAuODUgMCAxLjUgMC42NSAxLjUgMS41cy0wLjY1IDEuNS0xLjQ1IDEuNXpcIj48L3BhdGg+PC9zdmc+YCxzbWFsbGlmeXJldjpgPHN2ZyBjbGFzcz1cImpzUGFuZWwtaWNvblwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyOFwiIGhlaWdodD1cIjMyXCIgdmlld0JveD1cIjAgMCAyOCAzMlwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTE1Ljk1IDIzLjJjMCAwIDAgMCAwIDAtMC4zNSAwLTAuNjUtMC4xNS0wLjktMC4zNWwtMTEuNy0xMS45Yy0wLjUtMC41LTAuNS0xLjMgMC0xLjc1IDAuNS0wLjUgMS4zLTAuNSAxLjc1IDBsMTAuODUgMTAuOTUgMTAuOS0xMC44YzAuNS0wLjUgMS4zLTAuNSAxLjc1IDBzMC41IDEuMyAwIDEuNzVsLTExLjc1IDExLjdjLTAuMjUgMC4yNS0wLjU1IDAuNC0wLjkgMC40elwiPjwvcGF0aD48L3N2Zz5gLHNtYWxsaWZ5OmA8c3ZnIGNsYXNzPVwianNQYW5lbC1pY29uXCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjI4XCIgaGVpZ2h0PVwiMzJcIiB2aWV3Qm94PVwiMCAwIDI4IDMyXCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMjguNjUgMjAuODVsLTExLjgtMTEuNjVjLTAuNS0wLjUtMS4zLTAuNS0xLjc1IDBsLTExLjc1IDExLjg1Yy0wLjUgMC41LTAuNSAxLjMgMCAxLjc1IDAuMjUgMC4yNSAwLjU1IDAuMzUgMC45IDAuMzUgMC4zIDAgMC42NS0wLjEgMC45LTAuMzVsMTAuODUtMTAuOTUgMTAuOSAxMC44YzAuNSAwLjUgMS4zIDAuNSAxLjc1IDAgMC41LTAuNSAwLjUtMS4zIDAtMS44elwiPjwvcGF0aD48L3N2Zz5gfSxpZENvdW50ZXI6MCxpc0lFOigoKT0+e3JldHVybiBuYXZpZ2F0b3IuYXBwVmVyc2lvbi5tYXRjaCgvVHJpZGVudC8pfSkoKSxtZGJ0aGVtZXM6WydzZWNvbmRhcnknLCdlbGVnYW50Jywnc3R5bGlzaCcsJ3VuaXF1ZScsJ3NwZWNpYWwnXSxwb2ludGVyZG93bjonb250b3VjaGVuZCdpbiB3aW5kb3c/Wyd0b3VjaHN0YXJ0JywnbW91c2Vkb3duJ106Wydtb3VzZWRvd24nXSxwb2ludGVybW92ZTonb250b3VjaGVuZCdpbiB3aW5kb3c/Wyd0b3VjaG1vdmUnLCdtb3VzZW1vdmUnXTpbJ21vdXNlbW92ZSddLHBvaW50ZXJ1cDonb250b3VjaGVuZCdpbiB3aW5kb3c/Wyd0b3VjaGVuZCcsJ21vdXNldXAnXTpbJ21vdXNldXAnXSxwb2x5ZmlsbHM6KCgpPT57KGZ1bmN0aW9uKG4pe24uZm9yRWFjaChmdW5jdGlvbihvKXtvLmFwcGVuZD1vLmFwcGVuZHx8ZnVuY3Rpb24oKXtsZXQgYz1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpLGY9ZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO2MuZm9yRWFjaChmdW5jdGlvbihtKXtsZXQgdT1tIGluc3RhbmNlb2YgTm9kZTtmLmFwcGVuZENoaWxkKHU/bTpkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtKycnKSl9KSx0aGlzLmFwcGVuZENoaWxkKGYpfX0pfSkoW0VsZW1lbnQucHJvdG90eXBlLERvY3VtZW50LnByb3RvdHlwZSxEb2N1bWVudEZyYWdtZW50LnByb3RvdHlwZV0pLHdpbmRvdy5FbGVtZW50JiYhRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdCYmKEVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3Q9ZnVuY3Rpb24obil7bGV0IGMsbz0odGhpcy5kb2N1bWVudHx8dGhpcy5vd25lckRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKG4pLGY9dGhpcztkbyBmb3IoYz1vLmxlbmd0aDswPD0tLWMmJm8uaXRlbShjKSE9PWY7KTt3aGlsZSgwPmMmJihmPWYucGFyZW50RWxlbWVudCkpO3JldHVybiBmfSksd2luZG93Lk5vZGVMaXN0JiYhTm9kZUxpc3QucHJvdG90eXBlLmZvckVhY2gmJihOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaD1mdW5jdGlvbihuLG8pe289b3x8d2luZG93O2ZvcihsZXQgYz0wO2M8dGhpcy5sZW5ndGg7YysrKW4uY2FsbChvLHRoaXNbY10sYyx0aGlzKX0pLE9iamVjdC5hc3NpZ258fE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QsJ2Fzc2lnbicse2VudW1lcmFibGU6ITEsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOmZ1bmN0aW9uKG4pe2lmKG49PT12b2lkIDB8fG51bGw9PT1uKXRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IGZpcnN0IGFyZ3VtZW50IHRvIG9iamVjdCcpO2xldCBvPU9iamVjdChuKTtmb3IobGV0IGYsYz0xO2M8YXJndW1lbnRzLmxlbmd0aDtjKyspaWYoZj1hcmd1bWVudHNbY10sdm9pZCAwIT09ZiYmbnVsbCE9PWYpe2Y9T2JqZWN0KGYpO2xldCBtPU9iamVjdC5rZXlzKE9iamVjdChmKSk7Zm9yKGxldCB1PTAseT1tLmxlbmd0aDt1PHk7dSsrKXtsZXQgdj1tW3VdLHg9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihmLHYpO3ZvaWQgMCE9PXgmJnguZW51bWVyYWJsZSYmKG9bdl09Zlt2XSl9fXJldHVybiBvfX0pLGZ1bmN0aW9uKCl7ZnVuY3Rpb24gbihvLGMpe2M9Y3x8e2J1YmJsZXM6ITEsY2FuY2VsYWJsZTohMSxkZXRhaWw6dm9pZCAwfTtsZXQgZj1kb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtyZXR1cm4gZi5pbml0Q3VzdG9tRXZlbnQobyxjLmJ1YmJsZXMsYy5jYW5jZWxhYmxlLGMuZGV0YWlsKSxmfXJldHVybidmdW5jdGlvbichPXR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQmJnZvaWQobi5wcm90b3R5cGU9d2luZG93LkV2ZW50LnByb3RvdHlwZSx3aW5kb3cuQ3VzdG9tRXZlbnQ9bil9KCksU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aHx8KFN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGg9ZnVuY3Rpb24obixvKXtyZXR1cm4gbzx0aGlzLmxlbmd0aD9vfD0wOm89dGhpcy5sZW5ndGgsdGhpcy5zdWJzdHIoby1uLmxlbmd0aCxuLmxlbmd0aCk9PT1ufSksU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRofHwoU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoPWZ1bmN0aW9uKG4sbyl7cmV0dXJuIHRoaXMuc3Vic3RyKG98fDAsbi5sZW5ndGgpPT09bn0pfSkoKSx0aGVtZXM6WydkZWZhdWx0JywncHJpbWFyeScsJ2luZm8nLCdzdWNjZXNzJywnd2FybmluZycsJ2RhbmdlciddLHppQmFzZToxMDAsYWpheChvYmosYWpheENvbmZpZyl7bGV0IG9iaklzUGFuZWw7J29iamVjdCc9PXR5cGVvZiBvYmomJm9iai5jbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwnKT9vYmpJc1BhbmVsPSEwOihvYmpJc1BhbmVsPSExLCdzdHJpbmcnPT10eXBlb2Ygb2JqJiYob2JqPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob2JqKSkpO2NvbnN0IGNvbmY9YWpheENvbmZpZyxjb25maWdEZWZhdWx0cz17bWV0aG9kOidHRVQnLGFzeW5jOiEwLHVzZXI6JycscHdkOicnLGRvbmU6ZnVuY3Rpb24oKXtvYmpJc1BhbmVsP29iai5jb250ZW50LmlubmVySFRNTD10aGlzLnJlc3BvbnNlVGV4dDpvYmouaW5uZXJIVE1MPXRoaXMucmVzcG9uc2VUZXh0fSxhdXRvcmVzaXplOiEwLGF1dG9yZXBvc2l0aW9uOiEwfTtsZXQgY29uZmlnO2lmKCdzdHJpbmcnPT10eXBlb2YgY29uZiljb25maWc9T2JqZWN0LmFzc2lnbih7fSxjb25maWdEZWZhdWx0cyx7dXJsOmVuY29kZVVSSShjb25mKSxldmFsc2NyaXB0dGFnczohMH0pO2Vsc2UgaWYoJ29iamVjdCc9PXR5cGVvZiBjb25mJiZjb25mLnVybCljb25maWc9T2JqZWN0LmFzc2lnbih7fSxjb25maWdEZWZhdWx0cyxjb25mKSxjb25maWcudXJsPWVuY29kZVVSSShjb25mLnVybCksITE9PT1jb25maWcuYXN5bmMmJihjb25maWcudGltZW91dD0wLGNvbmZpZy53aXRoQ3JlZGVudGlhbHMmJihjb25maWcud2l0aENyZWRlbnRpYWxzPXZvaWQgMCksY29uZmlnLnJlc3BvbnNlVHlwZSYmKGNvbmZpZy5yZXNwb25zZVR5cGU9dm9pZCAwKSk7ZWxzZSByZXR1cm4gY29uc29sZS5pbmZvKCdYTUxIdHRwUmVxdWVzdCBzZWVtcyB0byBtaXNzIHRoZSByZXF1ZXN0IHVybCEnKSxvYmo7Y29uc3QgeGhyPW5ldyBYTUxIdHRwUmVxdWVzdDtyZXR1cm4geGhyLm9ucmVhZHlzdGF0ZWNoYW5nZT0oKT0+e2lmKDQ9PT14aHIucmVhZHlTdGF0ZSl7aWYoMjAwIT09eGhyLnN0YXR1cyljb25maWcuZmFpbCYmY29uZmlnLmZhaWwuY2FsbCh4aHIsb2JqKTtlbHNlIGlmKGNvbmZpZy5kb25lLmNhbGwoeGhyLG9iaiksY29uZmlnLmV2YWxzY3JpcHR0YWdzKXtjb25zdCBzY3JpcHR0YWdzPXhoci5yZXNwb25zZVRleHQubWF0Y2goLzxzY3JpcHRcXGJbXj5dKj4oW1xcc1xcU10qPyk8XFwvc2NyaXB0Pi9naSk7c2NyaXB0dGFncyYmc2NyaXB0dGFncy5mb3JFYWNoKHRhZz0+e2xldCBqcz10YWcucmVwbGFjZSgvPHNjcmlwdFxcYltePl0qPi9pLCcnKS5yZXBsYWNlKC88XFwvc2NyaXB0Pi9pLCcnKS50cmltKCk7ZXZhbChqcyl9KX1pZihjb25maWcuYWx3YXlzJiZjb25maWcuYWx3YXlzLmNhbGwoeGhyLG9iaiksb2JqSXNQYW5lbCl7Y29uc3Qgbj1vYmoub3B0aW9ucy5jb250ZW50U2l6ZTtpZignc3RyaW5nJz09dHlwZW9mIG4mJm4ubWF0Y2goL2F1dG8vaSkpe2NvbnN0IG89bi5zcGxpdCgnICcpLGM9T2JqZWN0LmFzc2lnbih7fSx7d2lkdGg6b1swXSxoZWlnaHQ6b1sxXX0pO2NvbmZpZy5hdXRvcmVzaXplJiZvYmoucmVzaXplKGMpLCFvYmouY2xhc3NMaXN0LmNvbnRhaW5zKCdqc1BhbmVsLWNvbnRleHRtZW51JykmJmNvbmZpZy5hdXRvcmVwb3NpdGlvbiYmb2JqLnJlcG9zaXRpb24oKX1lbHNlIGlmKCdvYmplY3QnPT10eXBlb2YgbiYmKCdhdXRvJz09PW4ud2lkdGh8fCdhdXRvJz09PW4uaGVpZ2h0KSl7Y29uc3Qgbz1PYmplY3QuYXNzaWduKHt9LG4pO2NvbmZpZy5hdXRvcmVzaXplJiZvYmoucmVzaXplKG8pLCFvYmouY2xhc3NMaXN0LmNvbnRhaW5zKCdqc1BhbmVsLWNvbnRleHRtZW51JykmJmNvbmZpZy5hdXRvcmVwb3NpdGlvbiYmb2JqLnJlcG9zaXRpb24oKX19anNQYW5lbC5hamF4QWx3YXlzQ2FsbGJhY2tzLmxlbmd0aCYmanNQYW5lbC5hamF4QWx3YXlzQ2FsbGJhY2tzLmZvckVhY2gobj0+e24uY2FsbChvYmosb2JqKX0pfX0seGhyLm9wZW4oY29uZmlnLm1ldGhvZCxjb25maWcudXJsLGNvbmZpZy5hc3luYyxjb25maWcudXNlcixjb25maWcucHdkKSx4aHIudGltZW91dD1jb25maWcudGltZW91dHx8MCxjb25maWcud2l0aENyZWRlbnRpYWxzJiYoeGhyLndpdGhDcmVkZW50aWFscz1jb25maWcud2l0aENyZWRlbnRpYWxzKSxjb25maWcucmVzcG9uc2VUeXBlJiYoeGhyLnJlc3BvbnNlVHlwZT1jb25maWcucmVzcG9uc2VUeXBlKSxjb25maWcuYmVmb3JlU2VuZCYmY29uZmlnLmJlZm9yZVNlbmQuY2FsbCh4aHIpLGNvbmZpZy5kYXRhP3hoci5zZW5kKGNvbmZpZy5kYXRhKTp4aHIuc2VuZChudWxsKSxvYmp9LGNhbGNDb2xvcnMobil7Y29uc3Qgbz10aGlzLmNvbG9yKG4pLGM9dGhpcy5saWdodGVuKG4sMC44MSksZj10aGlzLmRhcmtlbihuLDAuNSksbT0wLjU1Nj49dGhpcy5wZXJjZWl2ZWRCcmlnaHRuZXNzKG4pPycjZmZmZmZmJzonIzAwMDAwMCcsdT0wLjU1Nj49dGhpcy5wZXJjZWl2ZWRCcmlnaHRuZXNzKGMpPycjZmZmZmZmJzonIzAwMDAwMCcseT0wLjU1Nj49dGhpcy5wZXJjZWl2ZWRCcmlnaHRuZXNzKGYpPycjMDAwMDAwJzonI2ZmZmZmZic7cmV0dXJuW28uaHNsLmNzcyxjLGYsbSx1LHldfSxjb2xvcihuKXtsZXQgYyxmLG0sdSx5LHYseCxFLHosbz1uLnRvTG93ZXJDYXNlKCksQz17fTtjb25zdCBTPS9eIz8oWzAtOWEtZl17M318WzAtOWEtZl17Nn0pJC9naSxqPS9ecmdiYT9cXCgoWzAtOV17MSwzfSksKFswLTldezEsM30pLChbMC05XXsxLDN9KSw/KDB8MXwwXFwuWzAtOV17MSwyfXxcXC5bMC05XXsxLDJ9KT9cXCkkL2dpLFA9L15oc2xhP1xcKChbMC05XXsxLDN9KSwoWzAtOV17MSwzfSUpLChbMC05XXsxLDN9JSksPygwfDF8MFxcLlswLTldezEsMn18XFwuWzAtOV17MSwyfSk/XFwpJC9naSxUPXthbGljZWJsdWU6J2YwZjhmZicsYW50aXF1ZXdoaXRlOidmYWViZDcnLGFxdWE6JzBmZicsYXF1YW1hcmluZTonN2ZmZmQ0JyxhenVyZTonZjBmZmZmJyxiZWlnZTonZjVmNWRjJyxiaXNxdWU6J2ZmZTRjNCcsYmxhY2s6JzAwMCcsYmxhbmNoZWRhbG1vbmQ6J2ZmZWJjZCcsYmx1ZTonMDBmJyxibHVldmlvbGV0Oic4YTJiZTInLGJyb3duOidhNTJhMmEnLGJ1cmx5d29vZDonZGViODg3JyxjYWRldGJsdWU6JzVmOWVhMCcsY2hhcnRyZXVzZTonN2ZmZjAwJyxjaG9jb2xhdGU6J2QyNjkxZScsY29yYWw6J2ZmN2Y1MCcsY29ybmZsb3dlcmJsdWU6JzY0OTVlZCcsY29ybnNpbGs6J2ZmZjhkYycsY3JpbXNvbjonZGMxNDNjJyxjeWFuOicwZmYnLGRhcmtibHVlOicwMDAwOGInLGRhcmtjeWFuOicwMDhiOGInLGRhcmtnb2xkZW5yb2Q6J2I4ODYwYicsZGFya2dyYXk6J2E5YTlhOScsZGFya2dyZXk6J2E5YTlhOScsZGFya2dyZWVuOicwMDY0MDAnLGRhcmtraGFraTonYmRiNzZiJyxkYXJrbWFnZW50YTonOGIwMDhiJyxkYXJrb2xpdmVncmVlbjonNTU2YjJmJyxkYXJrb3JhbmdlOidmZjhjMDAnLGRhcmtvcmNoaWQ6Jzk5MzJjYycsZGFya3JlZDonOGIwMDAwJyxkYXJrc2FsbW9uOidlOTk2N2EnLGRhcmtzZWFncmVlbjonOGZiYzhmJyxkYXJrc2xhdGVibHVlOic0ODNkOGInLGRhcmtzbGF0ZWdyYXk6JzJmNGY0ZicsZGFya3NsYXRlZ3JleTonMmY0ZjRmJyxkYXJrdHVycXVvaXNlOicwMGNlZDEnLGRhcmt2aW9sZXQ6Jzk0MDBkMycsZGVlcHBpbms6J2ZmMTQ5MycsZGVlcHNreWJsdWU6JzAwYmZmZicsZGltZ3JheTonNjk2OTY5JyxkaW1ncmV5Oic2OTY5NjknLGRvZGdlcmJsdWU6JzFlOTBmZicsZmlyZWJyaWNrOidiMjIyMjInLGZsb3JhbHdoaXRlOidmZmZhZjAnLGZvcmVzdGdyZWVuOicyMjhiMjInLGZ1Y2hzaWE6J2YwZicsZ2FpbnNib3JvOidkY2RjZGMnLGdob3N0d2hpdGU6J2Y4ZjhmZicsZ29sZDonZmZkNzAwJyxnb2xkZW5yb2Q6J2RhYTUyMCcsZ3JheTonODA4MDgwJyxncmV5Oic4MDgwODAnLGdyZWVuOicwMDgwMDAnLGdyZWVueWVsbG93OidhZGZmMmYnLGhvbmV5ZGV3OidmMGZmZjAnLGhvdHBpbms6J2ZmNjliNCcsaW5kaWFucmVkOidjZDVjNWMnLGluZGlnbzonNGIwMDgyJyxpdm9yeTonZmZmZmYwJyxraGFraTonZjBlNjhjJyxsYXZlbmRlcjonZTZlNmZhJyxsYXZlbmRlcmJsdXNoOidmZmYwZjUnLGxhd25ncmVlbjonN2NmYzAwJyxsZW1vbmNoaWZmb246J2ZmZmFjZCcsbGlnaHRibHVlOidhZGQ4ZTYnLGxpZ2h0Y29yYWw6J2YwODA4MCcsbGlnaHRjeWFuOidlMGZmZmYnLGxpZ2h0Z29sZGVucm9keWVsbG93OidmYWZhZDInLGxpZ2h0Z3JheTonZDNkM2QzJyxsaWdodGdyZXk6J2QzZDNkMycsbGlnaHRncmVlbjonOTBlZTkwJyxsaWdodHBpbms6J2ZmYjZjMScsbGlnaHRzYWxtb246J2ZmYTA3YScsbGlnaHRzZWFncmVlbjonMjBiMmFhJyxsaWdodHNreWJsdWU6Jzg3Y2VmYScsbGlnaHRzbGF0ZWdyYXk6Jzc4OScsbGlnaHRzbGF0ZWdyZXk6Jzc4OScsbGlnaHRzdGVlbGJsdWU6J2IwYzRkZScsbGlnaHR5ZWxsb3c6J2ZmZmZlMCcsbGltZTonMGYwJyxsaW1lZ3JlZW46JzMyY2QzMicsbGluZW46J2ZhZjBlNicsbWFnZW50YTonZjBmJyxtYXJvb246JzgwMDAwMCcsbWVkaXVtYXF1YW1hcmluZTonNjZjZGFhJyxtZWRpdW1ibHVlOicwMDAwY2QnLG1lZGl1bW9yY2hpZDonYmE1NWQzJyxtZWRpdW1wdXJwbGU6JzkzNzBkOCcsbWVkaXVtc2VhZ3JlZW46JzNjYjM3MScsbWVkaXVtc2xhdGVibHVlOic3YjY4ZWUnLG1lZGl1bXNwcmluZ2dyZWVuOicwMGZhOWEnLG1lZGl1bXR1cnF1b2lzZTonNDhkMWNjJyxtZWRpdW12aW9sZXRyZWQ6J2M3MTU4NScsbWlkbmlnaHRibHVlOicxOTE5NzAnLG1pbnRjcmVhbTonZjVmZmZhJyxtaXN0eXJvc2U6J2ZmZTRlMScsbW9jY2FzaW46J2ZmZTRiNScsbmF2YWpvd2hpdGU6J2ZmZGVhZCcsbmF2eTonMDAwMDgwJyxvbGRsYWNlOidmZGY1ZTYnLG9saXZlOic4MDgwMDAnLG9saXZlZHJhYjonNmI4ZTIzJyxvcmFuZ2U6J2ZmYTUwMCcsb3JhbmdlcmVkOidmZjQ1MDAnLG9yY2hpZDonZGE3MGQ2JyxwYWxlZ29sZGVucm9kOidlZWU4YWEnLHBhbGVncmVlbjonOThmYjk4JyxwYWxldHVycXVvaXNlOidhZmVlZWUnLHBhbGV2aW9sZXRyZWQ6J2Q4NzA5MycscGFwYXlhd2hpcDonZmZlZmQ1JyxwZWFjaHB1ZmY6J2ZmZGFiOScscGVydTonY2Q4NTNmJyxwaW5rOidmZmMwY2InLHBsdW06J2RkYTBkZCcscG93ZGVyYmx1ZTonYjBlMGU2JyxwdXJwbGU6JzgwMDA4MCcscmViZWNjYXB1cnBsZTonNjM5JyxyZWQ6J2YwMCcscm9zeWJyb3duOidiYzhmOGYnLHJveWFsYmx1ZTonNDE2OWUxJyxzYWRkbGVicm93bjonOGI0NTEzJyxzYWxtb246J2ZhODA3Micsc2FuZHlicm93bjonZjRhNDYwJyxzZWFncmVlbjonMmU4YjU3JyxzZWFzaGVsbDonZmZmNWVlJyxzaWVubmE6J2EwNTIyZCcsc2lsdmVyOidjMGMwYzAnLHNreWJsdWU6Jzg3Y2VlYicsc2xhdGVibHVlOic2YTVhY2QnLHNsYXRlZ3JheTonNzA4MDkwJyxzbGF0ZWdyZXk6JzcwODA5MCcsc25vdzonZmZmYWZhJyxzcHJpbmdncmVlbjonMDBmZjdmJyxzdGVlbGJsdWU6JzQ2ODJiNCcsdGFuOidkMmI0OGMnLHRlYWw6JzAwODA4MCcsdGhpc3RsZTonZDhiZmQ4Jyx0b21hdG86J2ZmNjM0NycsdHVycXVvaXNlOic0MGUwZDAnLHZpb2xldDonZWU4MmVlJyx3aGVhdDonZjVkZWIzJyx3aGl0ZTonZmZmJyx3aGl0ZXNtb2tlOidmNWY1ZjUnLHllbGxvdzonZmYwJyx5ZWxsb3dncmVlbjonOWFjZDMyJ307cmV0dXJuIFRbb10mJihvPVRbb10pLG51bGw9PT1vLm1hdGNoKFMpP28ubWF0Y2goaik/KHg9ai5leGVjKG8pLEMucmdiPXtjc3M6byxyOnhbMV0sZzp4WzJdLGI6eFszXX0sQy5oZXg9dGhpcy5yZ2JUb0hleCh4WzFdLHhbMl0seFszXSksej10aGlzLnJnYlRvSHNsKHhbMV0seFsyXSx4WzNdKSxDLmhzbD16KTpvLm1hdGNoKFApPyh4PVAuZXhlYyhvKSx1PXhbMV0vMzYwLHk9eFsyXS5zdWJzdHIoMCx4WzJdLmxlbmd0aC0xKS8xMDAsdj14WzNdLnN1YnN0cigwLHhbM10ubGVuZ3RoLTEpLzEwMCxFPXRoaXMuaHNsVG9SZ2IodSx5LHYpLEMucmdiPXtjc3M6YHJnYigke0VbMF19LCR7RVsxXX0sJHtFWzJdfSlgLHI6RVswXSxnOkVbMV0sYjpFWzJdfSxDLmhleD10aGlzLnJnYlRvSGV4KEMucmdiLnIsQy5yZ2IuZyxDLnJnYi5iKSxDLmhzbD17Y3NzOmBoc2woJHt4WzFdfSwke3hbMl19LCR7eFszXX0pYCxoOnhbMV0sczp4WzJdLGw6eFszXX0pOihDLmhleD0nI2Y1ZjVmNScsQy5yZ2I9e2NzczoncmdiKDI0NSwyNDUsMjQ1KScscjoyNDUsZzoyNDUsYjoyNDV9LEMuaHNsPXtjc3M6J2hzbCgwLDAlLDk2LjA4JSknLGg6MCxzOicwJScsbDonOTYuMDglJ30pOihvPW8ucmVwbGFjZSgnIycsJycpLDE9PW8ubGVuZ3RoJTI/KGM9by5zdWJzdHIoMCwxKSsnJytvLnN1YnN0cigwLDEpLGY9by5zdWJzdHIoMSwxKSsnJytvLnN1YnN0cigxLDEpLG09by5zdWJzdHIoMiwxKSsnJytvLnN1YnN0cigyLDEpLEMucmdiPXtyOnBhcnNlSW50KGMsMTYpLGc6cGFyc2VJbnQoZiwxNiksYjpwYXJzZUludChtLDE2KX0sQy5oZXg9YCMke2N9JHtmfSR7bX1gKTooQy5yZ2I9e3I6cGFyc2VJbnQoby5zdWJzdHIoMCwyKSwxNiksZzpwYXJzZUludChvLnN1YnN0cigyLDIpLDE2KSxiOnBhcnNlSW50KG8uc3Vic3RyKDQsMiksMTYpfSxDLmhleD1gIyR7b31gKSx6PXRoaXMucmdiVG9Ic2woQy5yZ2IucixDLnJnYi5nLEMucmdiLmIpLEMuaHNsPXosQy5yZ2IuY3NzPWByZ2IoJHtDLnJnYi5yfSwke0MucmdiLmd9LCR7Qy5yZ2IuYn0pYCksQ30sY3JlYXRlUGFuZWxUZW1wbGF0ZShuPSEwKXtjb25zdCBvPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO3JldHVybiBvLmNsYXNzTmFtZT0nanNQYW5lbCcsbiYmWydjbG9zZScsJ21heGltaXplJywnbm9ybWFsaXplJywnbWluaW1pemUnLCdzbWFsbGlmeScsJ3NtYWxsaWZ5cmV2J10uZm9yRWFjaChjPT57by5zZXRBdHRyaWJ1dGUoYGRhdGEtYnRuJHtjfWAsJ2VuYWJsZWQnKX0pLG8uaW5uZXJIVE1MPWA8ZGl2IGNsYXNzPVwianNQYW5lbC1oZHJcIj48ZGl2IGNsYXNzPVwianNQYW5lbC1oZWFkZXJiYXJcIj48ZGl2IGNsYXNzPVwianNQYW5lbC1oZWFkZXJsb2dvXCI+PC9kaXY+PGRpdiBjbGFzcz1cImpzUGFuZWwtdGl0bGViYXJcIj48c3BhbiBjbGFzcz1cImpzUGFuZWwtdGl0bGVcIj48L3NwYW4+PC9kaXY+PGRpdiBjbGFzcz1cImpzUGFuZWwtY29udHJvbGJhclwiPjxkaXYgY2xhc3M9XCJqc1BhbmVsLWJ0biBqc1BhbmVsLWJ0bi1zbWFsbGlmeVwiPiR7dGhpcy5pY29ucy5zbWFsbGlmeX08L2Rpdj48ZGl2IGNsYXNzPVwianNQYW5lbC1idG4ganNQYW5lbC1idG4tc21hbGxpZnlyZXZcIj4ke3RoaXMuaWNvbnMuc21hbGxpZnlyZXZ9PC9kaXY+PGRpdiBjbGFzcz1cImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLW1pbmltaXplXCI+JHt0aGlzLmljb25zLm1pbmltaXplfTwvZGl2PjxkaXYgY2xhc3M9XCJqc1BhbmVsLWJ0biBqc1BhbmVsLWJ0bi1ub3JtYWxpemVcIj4ke3RoaXMuaWNvbnMubm9ybWFsaXplfTwvZGl2PjxkaXYgY2xhc3M9XCJqc1BhbmVsLWJ0biBqc1BhbmVsLWJ0bi1tYXhpbWl6ZVwiPiR7dGhpcy5pY29ucy5tYXhpbWl6ZX08L2Rpdj48ZGl2IGNsYXNzPVwianNQYW5lbC1idG4ganNQYW5lbC1idG4tY2xvc2VcIj4ke3RoaXMuaWNvbnMuY2xvc2V9PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cImpzUGFuZWwtaGRyLXRvb2xiYXJcIj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwianNQYW5lbC1jb250ZW50XCI+PC9kaXY+PGRpdiBjbGFzcz1cImpzUGFuZWwtbWluaW1pemVkLWJveFwiPjwvZGl2PjxkaXYgY2xhc3M9XCJqc1BhbmVsLWZ0clwiPjwvZGl2PmAsb30sY3JlYXRlTWluaW1pemVkVGVtcGxhdGUoKXtjb25zdCBuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO3JldHVybiBuLmNsYXNzTmFtZT0nanNQYW5lbC1yZXBsYWNlbWVudCcsbi5pbm5lckhUTUw9YDxkaXYgY2xhc3M9XCJqc1BhbmVsLWhkclwiPjxkaXYgY2xhc3M9XCJqc1BhbmVsLWhlYWRlcmJhclwiPjxkaXYgY2xhc3M9XCJqc1BhbmVsLWhlYWRlcmxvZ29cIj48L2Rpdj48ZGl2IGNsYXNzPVwianNQYW5lbC10aXRsZWJhclwiPjxzcGFuIGNsYXNzPVwianNQYW5lbC10aXRsZVwiPjwvc3Bhbj48L2Rpdj48ZGl2IGNsYXNzPVwianNQYW5lbC1jb250cm9sYmFyXCI+PGRpdiBjbGFzcz1cImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLW5vcm1hbGl6ZVwiPiR7dGhpcy5pY29ucy5ub3JtYWxpemV9PC9kaXY+PGRpdiBjbGFzcz1cImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLW1heGltaXplXCI+JHt0aGlzLmljb25zLm1heGltaXplfTwvZGl2PjxkaXYgY2xhc3M9XCJqc1BhbmVsLWJ0biBqc1BhbmVsLWJ0bi1jbG9zZVwiPiR7dGhpcy5pY29ucy5jbG9zZX08L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj5gLG59LGNyZWF0ZVNuYXBBcmVhKG4sbyxjKXtjb25zdCBmPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLG09bi5wYXJlbnRFbGVtZW50O2YuY2xhc3NOYW1lPWBqc1BhbmVsLXNuYXAtYXJlYSBqc1BhbmVsLXNuYXAtYXJlYS0ke299YCwnbHQnPT09b3x8J3J0Jz09PW98fCdyYic9PT1vfHwnbGInPT09bz8oZi5zdHlsZS53aWR0aD1jKydweCcsZi5zdHlsZS5oZWlnaHQ9YysncHgnKTonY3QnPT09b3x8J2NiJz09PW8/Zi5zdHlsZS5oZWlnaHQ9YysncHgnOignbGMnPT1vfHwncmMnPT1vKSYmKGYuc3R5bGUud2lkdGg9YysncHgnKSxtIT09ZG9jdW1lbnQuYm9keSYmKGYuc3R5bGUucG9zaXRpb249J2Fic29sdXRlJyksZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmpzUGFuZWwtc25hcC1hcmVhLmpzUGFuZWwtc25hcC1hcmVhLSR7b31gKXx8bi5wYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKGYpfSxkYXJrZW4obixvKXtjb25zdCBjPXRoaXMuY29sb3IobikuaHNsLGY9cGFyc2VGbG9hdChjLmwpO3JldHVybmBoc2woJHtjLmh9LCR7Yy5zfSwke2YtZipvKyclJ30pYH0sZHJhZ2l0KG4sbz17fSl7bGV0IGMsbSx1LGY9T2JqZWN0LmFzc2lnbih7fSx0aGlzLmRlZmF1bHRzLmRyYWdpdCxvKSx5PVtdO2NvbnN0IHY9bmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVsZHJhZ3N0YXJ0Jyx7ZGV0YWlsOm4uaWR9KSx4PW5ldyBDdXN0b21FdmVudCgnanNwYW5lbGRyYWcnLHtkZXRhaWw6bi5pZH0pLEU9bmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVsZHJhZ3N0b3AnLHtkZXRhaWw6bi5pZH0pO3JldHVybiBmLmdyaWQmJkFycmF5LmlzQXJyYXkoZi5ncmlkKSYmMT09PWYuZ3JpZC5sZW5ndGgmJihmLmdyaWRbMV09Zi5ncmlkWzBdKSx1PXRoaXMucE9jb250YWlubWVudChmLmNvbnRhaW5tZW50KSxuLnF1ZXJ5U2VsZWN0b3JBbGwoZi5oYW5kbGVzKS5mb3JFYWNoKHo9Pnt6LnN0eWxlLnRvdWNoQWN0aW9uPSdub25lJyx6LnN0eWxlLmN1cnNvcj1mLmN1cnNvcixqc1BhbmVsLnBvaW50ZXJkb3duLmZvckVhY2goQz0+e3ouYWRkRXZlbnRMaXN0ZW5lcihDLFM9PntpZihTLnByZXZlbnREZWZhdWx0KCksIVMudGFyZ2V0LmNsb3Nlc3QoJy5qc1BhbmVsLWZ0ci1idG4nKSl7bi5jb250cm9sYmFyLnN0eWxlLnBvaW50ZXJFdmVudHM9J25vbmUnLHk9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaWZyYW1lJykseS5sZW5ndGgmJnkuZm9yRWFjaChCPT57Qi5zdHlsZS5wb2ludGVyRXZlbnRzPSdub25lJ30pO2NvbnN0IGo9d2luZG93LmdldENvbXB1dGVkU3R5bGUobiksUD1wYXJzZUZsb2F0KGoubGVmdCksVD1wYXJzZUZsb2F0KGoudG9wKSxMPVMudG91Y2hlcz9TLnRvdWNoZXNbMF0uY2xpZW50WDpTLmNsaWVudFgsaz1TLnRvdWNoZXM/Uy50b3VjaGVzWzBdLmNsaWVudFk6Uy5jbGllbnRZLEE9bi5wYXJlbnRFbGVtZW50LFc9QS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxIPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKEEpO2xldCBSPTA7bT1CPT57aWYoQi5wcmV2ZW50RGVmYXVsdCgpLCFjKXtpZihkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHYpLG4uc3R5bGUub3BhY2l0eT1mLm9wYWNpdHksbi5zbmFwcGVkJiZmLnNuYXAucmVzaXplVG9QcmVTbmFwJiZuLmN1cnJlbnREYXRhLmJlZm9yZVNuYXApe24ucmVzaXplKG4uY3VycmVudERhdGEuYmVmb3JlU25hcC53aWR0aCsnICcrbi5jdXJyZW50RGF0YS5iZWZvcmVTbmFwLmhlaWdodCk7bGV0IHNlPW4uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkscmU9TC0oc2UubGVmdCtzZS53aWR0aCksZGU9c2Uud2lkdGgvMjtyZT4tZGUmJihSPXJlK2RlKX1mLnN0YXJ0JiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3MobixmLnN0YXJ0LCExLHtsZWZ0OlAsdG9wOlR9KSxqc1BhbmVsLmZyb250KG4pLG4uc25hcHBlZD0hMX1pZihjPTEsZi5kaXNhYmxlT25NYXhpbWl6ZWQmJidtYXhpbWl6ZWQnPT09bi5zdGF0dXMpcmV0dXJuITE7bGV0IEQsTyxNLEksTixYLFksRixWLF87Y29uc3QgSz1CLnRvdWNoZXM/Qi50b3VjaGVzWzBdLmNsaWVudFg6Qi5jbGllbnRYLEc9Qi50b3VjaGVzP0IudG91Y2hlc1swXS5jbGllbnRZOkIuY2xpZW50WSxVPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG4pO2lmKEE9PT1kb2N1bWVudC5ib2R5KXtsZXQgc2U9bi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtWPXdpbmRvdy5pbm5lcldpZHRoLXBhcnNlSW50KEguYm9yZGVyTGVmdFdpZHRoLDEwKS1wYXJzZUludChILmJvcmRlclJpZ2h0V2lkdGgsMTApLShzZS5sZWZ0K3NlLndpZHRoKSxfPXdpbmRvdy5pbm5lckhlaWdodC1wYXJzZUludChILmJvcmRlclRvcFdpZHRoLDEwKS1wYXJzZUludChILmJvcmRlckJvdHRvbVdpZHRoLDEwKS0oc2UudG9wK3NlLmhlaWdodCl9ZWxzZSBWPXBhcnNlSW50KEgud2lkdGgsMTApLXBhcnNlSW50KEguYm9yZGVyTGVmdFdpZHRoLDEwKS1wYXJzZUludChILmJvcmRlclJpZ2h0V2lkdGgsMTApLShwYXJzZUludChVLmxlZnQsMTApK3BhcnNlSW50KFUud2lkdGgsMTApKSxfPXBhcnNlSW50KEguaGVpZ2h0LDEwKS1wYXJzZUludChILmJvcmRlclRvcFdpZHRoLDEwKS1wYXJzZUludChILmJvcmRlckJvdHRvbVdpZHRoLDEwKS0ocGFyc2VJbnQoVS50b3AsMTApK3BhcnNlSW50KFUuaGVpZ2h0LDEwKSk7RD1wYXJzZUZsb2F0KFUubGVmdCksTT1wYXJzZUZsb2F0KFUudG9wKSxOPVYsWT1fLGYuc25hcCYmKCdwYW5lbCc9PT1mLnNuYXAudHJpZ2dlcj9PPU1hdGgucG93KEQsMik6J3BvaW50ZXInPT09Zi5zbmFwLnRyaWdnZXImJihEPUssTz1NYXRoLnBvdyhLLDIpLE09RyxOPXdpbmRvdy5pbm5lcldpZHRoLUssWT13aW5kb3cuaW5uZXJIZWlnaHQtRyksST1NYXRoLnBvdyhNLDIpLFg9TWF0aC5wb3coTiwyKSxGPU1hdGgucG93KFksMikpO2NvbnN0IFo9TWF0aC5zcXJ0KE8rSSksSj1NYXRoLnNxcnQoTytGKSxRPU1hdGguc3FydChYK0kpLGVlPU1hdGguc3FydChYK0YpLHRlPU1hdGguYWJzKEQtTikvMixuZT1NYXRoLmFicyhNLVkpLzIsYWU9TWF0aC5zcXJ0KE8rTWF0aC5wb3cobmUsMikpLG9lPU1hdGguc3FydChJK01hdGgucG93KHRlLDIpKSxpZT1NYXRoLnNxcnQoWCtNYXRoLnBvdyhuZSwyKSksbGU9TWF0aC5zcXJ0KEYrTWF0aC5wb3codGUsMikpO2lmKHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHgpLGYuYXhpcyYmJ3gnIT09Zi5heGlzfHwobi5zdHlsZS5sZWZ0PVArKEstTCkrUisncHgnKSxmLmF4aXMmJid5JyE9PWYuYXhpc3x8KG4uc3R5bGUudG9wPVQrKEctaykrJ3B4JyksZi5ncmlkKXtjb25zdCBzZT1wYXJzZUZsb2F0KFUubGVmdCkscmU9cGFyc2VGbG9hdChVLnRvcCksZGU9c2UlZi5ncmlkWzBdLGNlPXJlJWYuZ3JpZFsxXTtuLnN0eWxlLmxlZnQ9ZGU8Zi5ncmlkWzBdLzI/c2UtZGUrJ3B4JzpzZSsoZi5ncmlkWzBdLWRlKSsncHgnLG4uc3R5bGUudG9wPWNlPGYuZ3JpZFsxXS8yP3JlLWNlKydweCc6cmUrKGYuZ3JpZFsxXS1jZSkrJ3B4J31pZihmLmNvbnRhaW5tZW50fHwwPT09Zi5jb250YWlubWVudCl7bGV0IHNlLHJlO2lmKG4ub3B0aW9ucy5jb250YWluZXI9PT1kb2N1bWVudC5ib2R5KXNlPXdpbmRvdy5pbm5lcldpZHRoLXBhcnNlRmxvYXQoVS53aWR0aCktdVsxXSxyZT13aW5kb3cuaW5uZXJIZWlnaHQtcGFyc2VGbG9hdChVLmhlaWdodCktdVsyXTtlbHNle2NvbnN0IGRlPXBhcnNlRmxvYXQoSC5ib3JkZXJMZWZ0V2lkdGgpK3BhcnNlRmxvYXQoSC5ib3JkZXJSaWdodFdpZHRoKSxjZT1wYXJzZUZsb2F0KEguYm9yZGVyVG9wV2lkdGgpK3BhcnNlRmxvYXQoSC5ib3JkZXJCb3R0b21XaWR0aCk7c2U9Vy53aWR0aC1wYXJzZUZsb2F0KFUud2lkdGgpLXVbMV0tZGUscmU9Vy5oZWlnaHQtcGFyc2VGbG9hdChVLmhlaWdodCktdVsyXS1jZX1wYXJzZUZsb2F0KG4uc3R5bGUubGVmdCk8PXVbM10mJihuLnN0eWxlLmxlZnQ9dVszXSsncHgnKSxwYXJzZUZsb2F0KG4uc3R5bGUudG9wKTw9dVswXSYmKG4uc3R5bGUudG9wPXVbMF0rJ3B4JykscGFyc2VGbG9hdChuLnN0eWxlLmxlZnQpPj1zZSYmKG4uc3R5bGUubGVmdD1zZSsncHgnKSxwYXJzZUZsb2F0KG4uc3R5bGUudG9wKT49cmUmJihuLnN0eWxlLnRvcD1yZSsncHgnKX1pZihmLmRyYWcmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhuLGYuZHJhZywhMSx7bGVmdDpELHRvcDpNLHJpZ2h0Ok4sYm90dG9tOll9KSxmLnNuYXApe2NvbnN0IHNlPWYuc25hcC5zZW5zaXRpdml0eSxyZT1BPT09ZG9jdW1lbnQuYm9keT93aW5kb3cuaW5uZXJXaWR0aC84Olcud2lkdGgvOCxkZT1BPT09ZG9jdW1lbnQuYm9keT93aW5kb3cuaW5uZXJIZWlnaHQvODpXLmhlaWdodC84O24uc25hcHBhYmxlVG89ITEsanNQYW5lbC5yZW1vdmVTbmFwQXJlYXMobiksWjxzZT8obi5zbmFwcGFibGVUbz0nbGVmdC10b3AnLCExIT09Zi5zbmFwLnNuYXBMZWZ0VG9wJiZqc1BhbmVsLmNyZWF0ZVNuYXBBcmVhKG4sJ2x0JyxzZSkpOko8c2U/KG4uc25hcHBhYmxlVG89J2xlZnQtYm90dG9tJywhMSE9PWYuc25hcC5zbmFwTGVmdEJvdHRvbSYmanNQYW5lbC5jcmVhdGVTbmFwQXJlYShuLCdsYicsc2UpKTpRPHNlPyhuLnNuYXBwYWJsZVRvPSdyaWdodC10b3AnLCExIT09Zi5zbmFwLnNuYXBSaWdodFRvcCYmanNQYW5lbC5jcmVhdGVTbmFwQXJlYShuLCdydCcsc2UpKTplZTxzZT8obi5zbmFwcGFibGVUbz0ncmlnaHQtYm90dG9tJywhMSE9PWYuc25hcC5zbmFwUmlnaHRCb3R0b20mJmpzUGFuZWwuY3JlYXRlU25hcEFyZWEobiwncmInLHNlKSk6TTxzZSYmb2U8cmU/KG4uc25hcHBhYmxlVG89J2NlbnRlci10b3AnLCExIT09Zi5zbmFwLnNuYXBDZW50ZXJUb3AmJmpzUGFuZWwuY3JlYXRlU25hcEFyZWEobiwnY3QnLHNlKSk6RDxzZSYmYWU8ZGU/KG4uc25hcHBhYmxlVG89J2xlZnQtY2VudGVyJywhMSE9PWYuc25hcC5zbmFwTGVmdENlbnRlciYmanNQYW5lbC5jcmVhdGVTbmFwQXJlYShuLCdsYycsc2UpKTpOPHNlJiZpZTxkZT8obi5zbmFwcGFibGVUbz0ncmlnaHQtY2VudGVyJywhMSE9PWYuc25hcC5zbmFwUmlnaHRDZW50ZXImJmpzUGFuZWwuY3JlYXRlU25hcEFyZWEobiwncmMnLHNlKSk6WTxzZSYmbGU8cmUmJihuLnNuYXBwYWJsZVRvPSdjZW50ZXItYm90dG9tJywhMSE9PWYuc25hcC5zbmFwQ2VudGVyQm90dG9tJiZqc1BhbmVsLmNyZWF0ZVNuYXBBcmVhKG4sJ2NiJyxzZSkpfX0sanNQYW5lbC5wb2ludGVybW92ZS5mb3JFYWNoKGZ1bmN0aW9uKEIpe2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoQixtKX0pfX0pfSksanNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbihDKXtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKEMsKCk9Pntqc1BhbmVsLnBvaW50ZXJtb3ZlLmZvckVhY2goZnVuY3Rpb24oUyl7ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihTLG0pfSksZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdz0naW5oZXJpdCcsanNQYW5lbC5yZW1vdmVTbmFwQXJlYXMobiksYyYmKGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoRSksbi5zdHlsZS5vcGFjaXR5PTEsYz12b2lkIDAsbi5zYXZlQ3VycmVudFBvc2l0aW9uKCksZi5zbmFwJiYoJ2xlZnQtdG9wJz09PW4uc25hcHBhYmxlVG8/anNQYW5lbC5zbmFwUGFuZWwobixmLnNuYXAuc25hcExlZnRUb3ApOidjZW50ZXItdG9wJz09PW4uc25hcHBhYmxlVG8/anNQYW5lbC5zbmFwUGFuZWwobixmLnNuYXAuc25hcENlbnRlclRvcCk6J3JpZ2h0LXRvcCc9PT1uLnNuYXBwYWJsZVRvP2pzUGFuZWwuc25hcFBhbmVsKG4sZi5zbmFwLnNuYXBSaWdodFRvcCk6J3JpZ2h0LWNlbnRlcic9PT1uLnNuYXBwYWJsZVRvP2pzUGFuZWwuc25hcFBhbmVsKG4sZi5zbmFwLnNuYXBSaWdodENlbnRlcik6J3JpZ2h0LWJvdHRvbSc9PT1uLnNuYXBwYWJsZVRvP2pzUGFuZWwuc25hcFBhbmVsKG4sZi5zbmFwLnNuYXBSaWdodEJvdHRvbSk6J2NlbnRlci1ib3R0b20nPT09bi5zbmFwcGFibGVUbz9qc1BhbmVsLnNuYXBQYW5lbChuLGYuc25hcC5zbmFwQ2VudGVyQm90dG9tKTonbGVmdC1ib3R0b20nPT09bi5zbmFwcGFibGVUbz9qc1BhbmVsLnNuYXBQYW5lbChuLGYuc25hcC5zbmFwTGVmdEJvdHRvbSk6J2xlZnQtY2VudGVyJz09PW4uc25hcHBhYmxlVG8mJmpzUGFuZWwuc25hcFBhbmVsKG4sZi5zbmFwLnNuYXBMZWZ0Q2VudGVyKSxmLnNuYXAuY2FsbGJhY2smJm4uc25hcHBhYmxlVG8mJidmdW5jdGlvbic9PXR5cGVvZiBmLnNuYXAuY2FsbGJhY2smJmYuc25hcC5jYWxsYmFjay5jYWxsKG4sbiksbi5zbmFwcGFibGVUbyYmZi5zbmFwLnJlcG9zaXRpb25PblNuYXAmJm4ucmVwb3NpdGlvbk9uU25hcChuLnNuYXBwYWJsZVRvKSksZi5zdG9wJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3MobixmLnN0b3AsITEse2xlZnQ6cGFyc2VGbG9hdChuLnN0eWxlLmxlZnQpLHRvcDpwYXJzZUZsb2F0KG4uc3R5bGUudG9wKX0pKSxuLmNvbnRyb2xiYXIuc3R5bGUucG9pbnRlckV2ZW50cz0naW5oZXJpdCcseS5sZW5ndGgmJnkuZm9yRWFjaChmdW5jdGlvbihTKXtTLnN0eWxlLnBvaW50ZXJFdmVudHM9J2luaGVyaXQnfSl9KX0pLGYuZGlzYWJsZSYmKHouc3R5bGUucG9pbnRlckV2ZW50cz0nbm9uZScpfSksbn0sZW1wdHlOb2RlKG4pe2Zvcig7bi5maXJzdENoaWxkOyluLnJlbW92ZUNoaWxkKG4uZmlyc3RDaGlsZCk7cmV0dXJuIG59LGV4dGVuZChuKXtpZignW29iamVjdCBPYmplY3RdJz09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChuKSlmb3IobGV0IG8gaW4gbiluLmhhc093blByb3BlcnR5KG8pJiYodGhpcy5leHRlbnNpb25zW29dPW5bb10pfSxmZXRjaChvYmope2xldCBjb25mPW9iai5vcHRpb25zLmNvbnRlbnRGZXRjaCxjb25mRGVmYXVsdHM9e2JvZHlNZXRob2Q6J3RleHQnLGV2YWxzY3JpcHR0YWdzOiEwLGF1dG9yZXNpemU6ITAsYXV0b3JlcG9zaXRpb246ITAsZG9uZTpmdW5jdGlvbihuLG8pe24uY29udGVudC5pbm5lckhUTUw9b319O2NvbmY9J3N0cmluZyc9PXR5cGVvZiBjb25mP09iamVjdC5hc3NpZ24oe3Jlc291cmNlOm9iai5vcHRpb25zLmNvbnRlbnRGZXRjaH0sY29uZkRlZmF1bHRzKTpPYmplY3QuYXNzaWduKGNvbmZEZWZhdWx0cyxjb25mKTtsZXQgZmV0Y2hJbml0PWNvbmYuZmV0Y2hJbml0fHx7fTtjb25mLmJlZm9yZVNlbmQmJmNvbmYuYmVmb3JlU2VuZC5jYWxsKG9iaixvYmopLGZldGNoKGNvbmYucmVzb3VyY2UsZmV0Y2hJbml0KS50aGVuKGZ1bmN0aW9uKG4pe2lmKG4ub2spcmV0dXJuIG5bY29uZi5ib2R5TWV0aG9kXSgpO3Rocm93IG5ldyBFcnJvcignTmV0d29yayByZXNwb25zZSB3YXMgbm90IG9rLicpfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7aWYoY29uZi5kb25lLmNhbGwob2JqLG9iaixyZXNwb25zZSksY29uZi5ldmFsc2NyaXB0dGFncyl7Y29uc3Qgc2NyaXB0dGFncz1yZXNwb25zZS5tYXRjaCgvPHNjcmlwdFxcYltePl0qPihbXFxzXFxTXSo/KTxcXC9zY3JpcHQ+L2dpKTtzY3JpcHR0YWdzJiZzY3JpcHR0YWdzLmZvckVhY2godGFnPT57bGV0IGpzPXRhZy5yZXBsYWNlKC88c2NyaXB0XFxiW14+XSo+L2ksJycpLnJlcGxhY2UoLzxcXC9zY3JpcHQ+L2ksJycpLnRyaW0oKTtldmFsKGpzKX0pfWNvbnN0IG9Db250ZW50U2l6ZT1vYmoub3B0aW9ucy5jb250ZW50U2l6ZTtpZihjb25mLmF1dG9yZXNpemV8fGNvbmYuYXV0b3JlcG9zaXRpb24paWYoJ3N0cmluZyc9PXR5cGVvZiBvQ29udGVudFNpemUmJm9Db250ZW50U2l6ZS5tYXRjaCgvYXV0by9pKSl7Y29uc3Qgbj1vQ29udGVudFNpemUuc3BsaXQoJyAnKSxvPU9iamVjdC5hc3NpZ24oe30se3dpZHRoOm5bMF0saGVpZ2h0Om5bMV19KTtjb25mLmF1dG9yZXNpemUmJm9iai5yZXNpemUobyksIW9iai5jbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwtY29udGV4dG1lbnUnKSYmY29uZi5hdXRvcmVwb3NpdGlvbiYmb2JqLnJlcG9zaXRpb24oKX1lbHNlIGlmKCdvYmplY3QnPT10eXBlb2Ygb0NvbnRlbnRTaXplJiYoJ2F1dG8nPT09b0NvbnRlbnRTaXplLndpZHRofHwnYXV0byc9PT1vQ29udGVudFNpemUuaGVpZ2h0KSl7Y29uc3Qgbj1PYmplY3QuYXNzaWduKHt9LG9Db250ZW50U2l6ZSk7Y29uZi5hdXRvcmVzaXplJiZvYmoucmVzaXplKG4pLCFvYmouY2xhc3NMaXN0LmNvbnRhaW5zKCdqc1BhbmVsLWNvbnRleHRtZW51JykmJmNvbmYuYXV0b3JlcG9zaXRpb24mJm9iai5yZXBvc2l0aW9uKCl9fSkuY2F0Y2goZnVuY3Rpb24obil7Y29uc29sZS5lcnJvcignVGhlcmUgaGFzIGJlZW4gYSBwcm9ibGVtIHdpdGggeW91ciBmZXRjaCBvcGVyYXRpb246ICcrbi5tZXNzYWdlKX0pfSxmcm9udChuKXtpZignbWluaW1pemVkJz09PW4uc3RhdHVzKSdtYXhpbWl6ZWQnPT09bi5zdGF0dXNCZWZvcmU/bi5tYXhpbWl6ZSgpOm4ubm9ybWFsaXplKCk7ZWxzZXtjb25zdCBvPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qc1BhbmVsLXN0YW5kYXJkJykpLm1hcChjPT57cmV0dXJuIGMuc3R5bGUuekluZGV4fSk7TWF0aC5tYXgoLi4ubyk+bi5zdHlsZS56SW5kZXgmJihuLnN0eWxlLnpJbmRleD1qc1BhbmVsLnppLm5leHQoKSksdGhpcy5yZXNldFppKCl9dGhpcy5nZXRQYW5lbHMoKS5mb3JFYWNoKGZ1bmN0aW9uKG8sYyl7bGV0IGY9by5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWlmcmFtZS1vdmVybGF5Jyk7aWYoISgwPGMpKWYmJm8uY29udGVudC5yZW1vdmVDaGlsZChmKTtlbHNlIGlmKG8uY29udGVudC5xdWVyeVNlbGVjdG9yKCdpZnJhbWUnKSYmIWYpe2xldCBtPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO20uY2xhc3NOYW1lPSdqc1BhbmVsLWlmcmFtZS1vdmVybGF5JyxvLmNvbnRlbnQuYXBwZW5kQ2hpbGQobSl9fSl9LGdldFBhbmVscyhuPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdqc1BhbmVsLXN0YW5kYXJkJyl9KXtyZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzUGFuZWwnKSkuZmlsdGVyKG89PntyZXR1cm4gbi5jYWxsKG8sbyl9KS5zb3J0KChvLGMpPT57cmV0dXJuIGMuc3R5bGUuekluZGV4LW8uc3R5bGUuekluZGV4fSl9LGhzbFRvUmdiKG4sbyxjKXtsZXQgZixtLHU7aWYoMD09PW8pZj1tPXU9YztlbHNle2xldCB5PShFLHosQyk9PntyZXR1cm4gMD5DJiYoQys9MSksMTxDJiYoQy09MSksQzwxLzY/RSs2Kih6LUUpKkM6QzwxLzI/ejpDPDIvMz9FKzYqKCh6LUUpKigyLzMtQykpOkV9LHY9MC41PmM/YyooMStvKTpjK28tYypvLHg9MipjLXY7Zj15KHgsdixuKzEvMyksbT15KHgsdixuKSx1PXkoeCx2LG4tMS8zKX1yZXR1cm5bTWF0aC5yb3VuZCgyNTUqZiksTWF0aC5yb3VuZCgyNTUqbSksTWF0aC5yb3VuZCgyNTUqdSldfSxsaWdodGVuKG4sbyl7Y29uc3QgYz10aGlzLmNvbG9yKG4pLmhzbCxmPXBhcnNlRmxvYXQoYy5sKTtyZXR1cm5gaHNsKCR7Yy5ofSwke2Muc30sJHtmKygxMDAtZikqbysnJSd9KWB9LHBlcmNlaXZlZEJyaWdodG5lc3Mobil7Y29uc3Qgbz10aGlzLmNvbG9yKG4pLnJnYjtyZXR1cm4gMC4yNjI3KihvLnIvMjU1KSswLjY3OCooby5nLzI1NSkrMC4wNTkzKihvLmIvMjU1KX0scE9jb250YWluZXIobixvKXtpZihuKXtsZXQgZjtpZignc3RyaW5nJz09dHlwZW9mIG4/Zj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG4pOjE9PT1uLm5vZGVUeXBlP2Y9bjpuLmxlbmd0aCYmKGY9blswXSksZiYmMT09PWYubm9kZVR5cGUpcmV0dXJuIGZ9Y29uc3QgYz1uZXcganNQYW5lbEVycm9yKCdOTyBORVcgUEFORUwgQ1JFQVRFRCFcXG5UaGUgY29udGFpbmVyIHRvIGFwcGVuZCB0aGUgcGFuZWwgdG8gZG9lcyBub3QgZXhpc3Qgb3IgYSBjb250YWluZXIgd2FzIG5vdCBzcGVjaWZpZWQhJyk7dHJ5e3Rocm93IGN9Y2F0Y2goZil7byYmby5jYWxsKGYsZil9cmV0dXJuIGN9LHBPY29udGFpbm1lbnQobil7aWYoJ251bWJlcic9PXR5cGVvZiBuKXJldHVybltuLG4sbixuXTtpZihBcnJheS5pc0FycmF5KG4pKXtpZigxPT09bi5sZW5ndGgpcmV0dXJuW25bMF0sblswXSxuWzBdLG5bMF1dO2lmKDI9PT1uLmxlbmd0aClyZXR1cm4gbi5jb25jYXQobik7Mz09PW4ubGVuZ3RoJiYoblszXT1uWzFdKX1yZXR1cm4gbn0scE9zaXplKG4sbyl7bGV0IGM9b3x8dGhpcy5kZWZhdWx0cy5jb250ZW50U2l6ZSxmPW4ucGFyZW50RWxlbWVudDtpZignc3RyaW5nJz09dHlwZW9mIGMpe2xldCBtPWMudHJpbSgpLnNwbGl0KCcgJyk7Yz17fSxjLndpZHRoPW1bMF0sYy5oZWlnaHQ9Mj09PW0ubGVuZ3RoP21bMV06bVswXX1lbHNlIGMud2lkdGgmJiFjLmhlaWdodD9jLmhlaWdodD1jLndpZHRoOmMuaGVpZ2h0JiYhYy53aWR0aCYmKGMud2lkdGg9Yy5oZWlnaHQpO2lmKChjLndpZHRoKycnKS5tYXRjaCgvXlswLTkuXSskL2dpKSljLndpZHRoKz0ncHgnO2Vsc2UgaWYoISgnc3RyaW5nJz09dHlwZW9mIGMud2lkdGgmJmMud2lkdGguZW5kc1dpdGgoJyUnKSkpJ2Z1bmN0aW9uJz09dHlwZW9mIGMud2lkdGgmJihjLndpZHRoPWMud2lkdGguY2FsbChuLG4pLCdudW1iZXInPT10eXBlb2YgYy53aWR0aD9jLndpZHRoKz0ncHgnOidzdHJpbmcnPT10eXBlb2YgYy53aWR0aCYmYy53aWR0aC5tYXRjaCgvXlswLTkuXSskL2dpKSYmKGMud2lkdGgrPSdweCcpKTtlbHNlIGlmKGY9PT1kb2N1bWVudC5ib2R5KWMud2lkdGg9d2luZG93LmlubmVyV2lkdGgqKHBhcnNlRmxvYXQoYy53aWR0aCkvMTAwKSsncHgnO2Vsc2V7Y29uc3QgbT13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShmKSx1PXBhcnNlRmxvYXQobS5ib3JkZXJMZWZ0V2lkdGgpK3BhcnNlRmxvYXQobS5ib3JkZXJSaWdodFdpZHRoKTtjLndpZHRoPShwYXJzZUZsb2F0KG0ud2lkdGgpLXUpKihwYXJzZUZsb2F0KGMud2lkdGgpLzEwMCkrJ3B4J31pZigoYy5oZWlnaHQrJycpLm1hdGNoKC9eWzAtOS5dKyQvZ2kpKWMuaGVpZ2h0Kz0ncHgnO2Vsc2UgaWYoISgnc3RyaW5nJz09dHlwZW9mIGMuaGVpZ2h0JiZjLmhlaWdodC5lbmRzV2l0aCgnJScpKSknZnVuY3Rpb24nPT10eXBlb2YgYy5oZWlnaHQmJihjLmhlaWdodD1jLmhlaWdodC5jYWxsKG4sbiksJ251bWJlcic9PXR5cGVvZiBjLmhlaWdodD9jLmhlaWdodCs9J3B4Jzonc3RyaW5nJz09dHlwZW9mIGMuaGVpZ2h0JiZjLmhlaWdodC5tYXRjaCgvXlswLTkuXSskL2dpKSYmKGMuaGVpZ2h0Kz0ncHgnKSk7ZWxzZSBpZihmPT09ZG9jdW1lbnQuYm9keSljLmhlaWdodD13aW5kb3cuaW5uZXJIZWlnaHQqKHBhcnNlRmxvYXQoYy5oZWlnaHQpLzEwMCkrJ3B4JztlbHNle2NvbnN0IG09d2luZG93LmdldENvbXB1dGVkU3R5bGUoZiksdT1wYXJzZUZsb2F0KG0uYm9yZGVyVG9wV2lkdGgpK3BhcnNlRmxvYXQobS5ib3JkZXJCb3R0b21XaWR0aCk7Yy5oZWlnaHQ9KHBhcnNlRmxvYXQobS5oZWlnaHQpLXUpKihwYXJzZUZsb2F0KGMuaGVpZ2h0KS8xMDApKydweCd9cmV0dXJuIGN9LHBPcG9zaXRpb24obil7Y29uc3Qgbz1uLm1hdGNoKC9cXGJbYS16XXs0LDZ9LXsxfVthLXpdezMsNn1cXGIvaSksYz1uLm1hdGNoKC9kb3dufHVwfHJpZ2h0KFteLV18JCl8bGVmdChbXi1dfCQpL2kpLGY9bi5tYXRjaCgvWystXT9cXGQ/XFwuP1xcZCsoW2EteiVdezIsNH1cXGJ8JT8pL2dpKTtsZXQgbTtyZXR1cm4gbT1vP3tteTpvWzBdLnRvTG93ZXJDYXNlKCksYXQ6b1swXS50b0xvd2VyQ2FzZSgpfTp7bXk6J2NlbnRlcicsYXQ6J2NlbnRlcid9LGMmJihtLmF1dG9wb3NpdGlvbj1jWzBdLnRvTG93ZXJDYXNlKCkpLGYmJihmLmZvckVhY2goKHUseSk9Pnt1Lm1hdGNoKC9eWystXT9bMC05XSokLykmJihmW3ldKz0ncHgnKSxmW3ldPWZbeV0udG9Mb3dlckNhc2UoKX0pLDE9PT1mLmxlbmd0aD8obS5vZmZzZXRYPWZbMF0sbS5vZmZzZXRZPWZbMF0pOihtLm9mZnNldFg9ZlswXSxtLm9mZnNldFk9ZlsxXSkpLG19LHBvc2l0aW9uKG4sbyl7bGV0IGMsZixtLHU9e2xlZnQ6MCx0b3A6MH0seT0wLHY9MCx4PTAsRT0wO2NvbnN0IHo9e215OidjZW50ZXInLGF0OidjZW50ZXInLG9mOid3aW5kb3cnLG9mZnNldFg6JzBweCcsb2Zmc2V0WTonMHB4J30sQz17d2lkdGg6ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLGhlaWdodDp3aW5kb3cuaW5uZXJIZWlnaHR9LFM9cGFnZVhPZmZzZXQsaj1wYWdlWU9mZnNldDtpZihjPSdzdHJpbmcnPT10eXBlb2Ygbj9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG4pOm4sIW8pcmV0dXJuIGMuc3R5bGUub3BhY2l0eT0xLGM7Y29uc3QgUD1jLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO2Y9J3N0cmluZyc9PXR5cGVvZiBvP09iamVjdC5hc3NpZ24oe30seixqc1BhbmVsLnBPcG9zaXRpb24obykpOk9iamVjdC5hc3NpZ24oe30seixvKTtjb25zdCBUPWMucGFyZW50RWxlbWVudCxMPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKFQpLGs9VC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxBPVQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO2lmKGYub2YmJid3aW5kb3cnIT09Zi5vZiYmKCdzdHJpbmcnPT10eXBlb2YgZi5vZj9tPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZi5vZik6bT1mLm9mKSxmLm15Lm1hdGNoKC9eY2VudGVyLXRvcCR8XmNlbnRlciR8XmNlbnRlci1ib3R0b20kL2kpP3k9UC53aWR0aC8yOmYubXkubWF0Y2goL3JpZ2h0L2kpJiYoeT1QLndpZHRoKSxmLm15Lm1hdGNoKC9ebGVmdC1jZW50ZXIkfF5jZW50ZXIkfF5yaWdodC1jZW50ZXIkL2kpP3Y9UC5oZWlnaHQvMjpmLm15Lm1hdGNoKC9ib3R0b20vaSkmJih2PVAuaGVpZ2h0KSwnYm9keSc9PT1BJiYnd2luZG93Jz09PWYub2YpZi5hdC5tYXRjaCgvXmNlbnRlci10b3AkfF5jZW50ZXIkfF5jZW50ZXItYm90dG9tJC9pKT94PUMud2lkdGgvMjpmLmF0Lm1hdGNoKC9yaWdodC9pKSYmKHg9Qy53aWR0aCksZi5hdC5tYXRjaCgvXmxlZnQtY2VudGVyJHxeY2VudGVyJHxecmlnaHQtY2VudGVyJC9pKT9FPUMuaGVpZ2h0LzI6Zi5hdC5tYXRjaCgvYm90dG9tL2kpJiYoRT1DLmhlaWdodCksdS5sZWZ0PXgteS1wYXJzZUZsb2F0KEwuYm9yZGVyTGVmdFdpZHRoKSx1LnRvcD1FLXYtcGFyc2VGbG9hdChMLmJvcmRlclRvcFdpZHRoKSxjLnN0eWxlLnBvc2l0aW9uPSdmaXhlZCc7ZWxzZSBpZignYm9keSc9PT1BJiYnd2luZG93JyE9PWYub2Ype2NvbnN0IFc9bS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTt4PWYuYXQubWF0Y2goL15jZW50ZXItdG9wJHxeY2VudGVyJHxeY2VudGVyLWJvdHRvbSQvaSk/Vy53aWR0aC8yK1cubGVmdCtTOmYuYXQubWF0Y2goL3JpZ2h0L2kpP1cud2lkdGgrVy5sZWZ0K1M6Vy5sZWZ0K1MsRT1mLmF0Lm1hdGNoKC9ebGVmdC1jZW50ZXIkfF5jZW50ZXIkfF5yaWdodC1jZW50ZXIkL2kpP1cuaGVpZ2h0LzIrVy50b3ArajpmLmF0Lm1hdGNoKC9ib3R0b20vaSk/Vy5oZWlnaHQrVy50b3ArajpXLnRvcCtqLHUubGVmdD14LXktcGFyc2VGbG9hdChMLmJvcmRlckxlZnRXaWR0aCksdS50b3A9RS12LXBhcnNlRmxvYXQoTC5ib3JkZXJUb3BXaWR0aCl9ZWxzZSBpZignYm9keSchPT1BJiYoJ3dpbmRvdyc9PT1mLm9mfHwhZi5vZikpe2NvbnN0IFc9cGFyc2VGbG9hdChMLmJvcmRlckxlZnRXaWR0aCkrcGFyc2VGbG9hdChMLmJvcmRlclJpZ2h0V2lkdGgpLEg9cGFyc2VGbG9hdChMLmJvcmRlclRvcFdpZHRoKStwYXJzZUZsb2F0KEwuYm9yZGVyQm90dG9tV2lkdGgpO2YuYXQubWF0Y2goL15jZW50ZXItdG9wJHxeY2VudGVyJHxeY2VudGVyLWJvdHRvbSQvaSk/eD1rLndpZHRoLzItVy8yOmYuYXQubWF0Y2goL3JpZ2h0L2kpJiYoeD1rLndpZHRoLVcpLGYuYXQubWF0Y2goL15sZWZ0LWNlbnRlciR8XmNlbnRlciR8XnJpZ2h0LWNlbnRlciQvaSk/RT1rLmhlaWdodC8yLUgvMjpmLmF0Lm1hdGNoKC9ib3R0b20vaSkmJihFPWsuaGVpZ2h0LUgpLHUubGVmdD14LXksdS50b3A9RS12fWVsc2UgaWYoJ2JvZHknIT09QSYmVC5jb250YWlucyhtKSl7Y29uc3QgVz1tLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO3g9Zi5hdC5tYXRjaCgvXmNlbnRlci10b3AkfF5jZW50ZXIkfF5jZW50ZXItYm90dG9tJC9pKT9XLmxlZnQtay5sZWZ0K1cud2lkdGgvMjpmLmF0Lm1hdGNoKC9yaWdodC9pKT9XLmxlZnQtay5sZWZ0K1cud2lkdGg6Vy5sZWZ0LWsubGVmdCxFPWYuYXQubWF0Y2goL15sZWZ0LWNlbnRlciR8XmNlbnRlciR8XnJpZ2h0LWNlbnRlciQvaSk/Vy50b3Atay50b3ArVy5oZWlnaHQvMjpmLmF0Lm1hdGNoKC9ib3R0b20vaSk/Vy50b3Atay50b3ArVy5oZWlnaHQ6Vy50b3Atay50b3AsdS5sZWZ0PXgteS1wYXJzZUZsb2F0KEwuYm9yZGVyTGVmdFdpZHRoKSx1LnRvcD1FLXYtcGFyc2VGbG9hdChMLmJvcmRlclRvcFdpZHRoKX1pZihmLmF1dG9wb3NpdGlvbiYmZi5teT09PWYuYXQmJjA8PVsnbGVmdC10b3AnLCdjZW50ZXItdG9wJywncmlnaHQtdG9wJywnbGVmdC1ib3R0b20nLCdjZW50ZXItYm90dG9tJywncmlnaHQtYm90dG9tJ10uaW5kZXhPZihmLm15KSl7Y29uc3QgVz1gJHtmLm15fS0ke2YuYXV0b3Bvc2l0aW9uLnRvTG93ZXJDYXNlKCl9YDtjLmNsYXNzTGlzdC5hZGQoVyk7Y29uc3QgSD1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtXfWApKSxSPUguaW5kZXhPZihjKTsxPEgubGVuZ3RoJiYoJ2Rvd24nPT09Zi5hdXRvcG9zaXRpb24/SC5mb3JFYWNoKChCLEQpPT57MDxEJiZEPD1SJiYodS50b3ArPUhbLS1EXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQranNQYW5lbC5hdXRvcG9zaXRpb25TcGFjaW5nKX0pOid1cCc9PT1mLmF1dG9wb3NpdGlvbj9ILmZvckVhY2goKEIsRCk9PnswPEQmJkQ8PVImJih1LnRvcC09SFstLURdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCtqc1BhbmVsLmF1dG9wb3NpdGlvblNwYWNpbmcpfSk6J3JpZ2h0Jz09PWYuYXV0b3Bvc2l0aW9uP0guZm9yRWFjaCgoQixEKT0+ezA8RCYmRDw9UiYmKHUubGVmdCs9SFstLURdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoK2pzUGFuZWwuYXV0b3Bvc2l0aW9uU3BhY2luZyl9KTonbGVmdCc9PT1mLmF1dG9wb3NpdGlvbiYmSC5mb3JFYWNoKChCLEQpPT57MDxEJiZEPD1SJiYodS5sZWZ0LT1IWy0tRF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgranNQYW5lbC5hdXRvcG9zaXRpb25TcGFjaW5nKX0pKX1pZih1LmxlZnQrPSdweCcsdS50b3ArPSdweCcsYy5zdHlsZS5sZWZ0PXUubGVmdCxjLnN0eWxlLnRvcD11LnRvcCxmLm9mZnNldFgmJihjLnN0eWxlLmxlZnQ9J251bWJlcic9PXR5cGVvZiBmLm9mZnNldFg/YGNhbGMoJHt1LmxlZnR9ICsgJHtmLm9mZnNldFh9cHgpYDpgY2FsYygke3UubGVmdH0gKyAke2Yub2Zmc2V0WH0pYCx1LmxlZnQ9d2luZG93LmdldENvbXB1dGVkU3R5bGUoYykubGVmdCksZi5vZmZzZXRZJiYoYy5zdHlsZS50b3A9J251bWJlcic9PXR5cGVvZiBmLm9mZnNldFk/YGNhbGMoJHt1LnRvcH0gKyAke2Yub2Zmc2V0WX1weClgOmBjYWxjKCR7dS50b3B9ICsgJHtmLm9mZnNldFl9KWAsdS50b3A9d2luZG93LmdldENvbXB1dGVkU3R5bGUoYykudG9wKSxmLm1pbkxlZnQpe2xldCBXPXBhcnNlRmxvYXQodS5sZWZ0KTsnbnVtYmVyJz09dHlwZW9mIGYubWluTGVmdCYmKGYubWluTGVmdCs9J3B4JyksYy5zdHlsZS5sZWZ0PWYubWluTGVmdDtsZXQgSD1wYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGMpLmxlZnQpO1c+SCYmKGMuc3R5bGUubGVmdD1XKydweCcpLHUubGVmdD13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjKS5sZWZ0fWlmKGYubWF4TGVmdCl7bGV0IFc9cGFyc2VGbG9hdCh1LmxlZnQpOydudW1iZXInPT10eXBlb2YgZi5tYXhMZWZ0JiYoZi5tYXhMZWZ0Kz0ncHgnKSxjLnN0eWxlLmxlZnQ9Zi5tYXhMZWZ0O2xldCBIPXBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUoYykubGVmdCk7VzxIJiYoYy5zdHlsZS5sZWZ0PVcrJ3B4JyksdS5sZWZ0PXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGMpLmxlZnR9aWYoZi5tYXhUb3Ape2xldCBXPXBhcnNlRmxvYXQodS50b3ApOydudW1iZXInPT10eXBlb2YgZi5tYXhUb3AmJihmLm1heFRvcCs9J3B4JyksYy5zdHlsZS50b3A9Zi5tYXhUb3A7bGV0IEg9cGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjKS50b3ApO1c8SCYmKGMuc3R5bGUudG9wPVcrJ3B4JyksdS50b3A9d2luZG93LmdldENvbXB1dGVkU3R5bGUoYykudG9wfWlmKGYubWluVG9wKXtsZXQgVz1wYXJzZUZsb2F0KHUudG9wKTsnbnVtYmVyJz09dHlwZW9mIGYubWluVG9wJiYoZi5taW5Ub3ArPSdweCcpLGMuc3R5bGUudG9wPWYubWluVG9wO2xldCBIPXBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUoYykudG9wKTtXPkgmJihjLnN0eWxlLnRvcD1XKydweCcpLHUudG9wPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGMpLnRvcH1pZignZnVuY3Rpb24nPT10eXBlb2YgZi5tb2RpZnkpe2xldCBXPWYubW9kaWZ5LmNhbGwodSx1KTtjLnN0eWxlLmxlZnQ9Vy5sZWZ0LGMuc3R5bGUudG9wPVcudG9wfXJldHVybiBjLnN0eWxlLm9wYWNpdHk9MSxjLnN0eWxlLmxlZnQ9d2luZG93LmdldENvbXB1dGVkU3R5bGUoYykubGVmdCxjLnN0eWxlLnRvcD13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjKS50b3AsY30scHJvY2Vzc0NhbGxiYWNrcyhuLG8sYz0nc29tZScsZil7cmV0dXJuJ2Z1bmN0aW9uJz09dHlwZW9mIG8mJihvPVtvXSksYz9vW2NdKGZ1bmN0aW9uKG0pe2lmKCdmdW5jdGlvbic9PXR5cGVvZiBtKXJldHVybiBtLmNhbGwobixuLGYpfSk6dm9pZCBvLmZvckVhY2goZnVuY3Rpb24obSl7bS5jYWxsKG4sbixmKX0pfSxyZ2JUb0hzbChuLG8sYyl7bi89MjU1LG8vPTI1NSxjLz0yNTU7bGV0IHUseSxmPU1hdGgubWF4KG4sbyxjKSxtPU1hdGgubWluKG4sbyxjKSx2PShmK20pLzI7aWYoZj09PW0pdT15PTA7ZWxzZXtsZXQgeD1mLW07eT0wLjU8dj94LygyLWYtbSk6eC8oZittKSxmPT09bj91PShvLWMpL3grKG88Yz82OjApOmY9PT1vP3U9KGMtbikveCsyOmY9PT1jP3U9KG4tbykveCs0OnZvaWQgMCx1Lz02fXJldHVybiB1Kj0zNjAseT0xMDAqeSsnJScsdj0xMDAqdisnJScse2NzczonaHNsKCcrdSsnLCcreSsnLCcrdisnKScsaDp1LHM6eSxsOnZ9fSxyZ2JUb0hleChuLG8sYyl7bGV0IGY9KCtuKS50b1N0cmluZygxNiksbT0oK28pLnRvU3RyaW5nKDE2KSx1PSgrYykudG9TdHJpbmcoMTYpO3JldHVybiAxPT09Zi5sZW5ndGgmJihmPWAwJHtmfWApLDE9PT1tLmxlbmd0aCYmKG09YDAke219YCksMT09PXUubGVuZ3RoJiYodT1gMCR7dX1gKSxgIyR7Zn0ke219JHt1fWB9LHJlbW92ZVNuYXBBcmVhcyhuKXtkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanNQYW5lbC1zbmFwLWFyZWEnKS5mb3JFYWNoKGZ1bmN0aW9uKG8pe24ucGFyZW50RWxlbWVudCYmbi5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKG8pfSl9LHJlc2V0WmkoKXt0aGlzLnppPSgobj1qc1BhbmVsLnppQmFzZSk9PntsZXQgbz1uO3JldHVybntuZXh0OigpPT57cmV0dXJuIG8rK319fSkoKSxBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanNQYW5lbC1zdGFuZGFyZCcpKS5zb3J0KChuLG8pPT57cmV0dXJuIG4uc3R5bGUuekluZGV4LW8uc3R5bGUuekluZGV4fSkuZm9yRWFjaChuPT57bi5zdHlsZS56SW5kZXg9anNQYW5lbC56aS5uZXh0KCl9KX0scmVzaXplaXQobixvPXt9KXtsZXQgRSx6LEMsUyxqLGM9T2JqZWN0LmFzc2lnbih7fSx0aGlzLmRlZmF1bHRzLnJlc2l6ZWl0LG8pLGY9bi5wYXJlbnRFbGVtZW50LG09Zi50YWdOYW1lLnRvTG93ZXJDYXNlKCksdT0nZnVuY3Rpb24nPT10eXBlb2YgYy5tYXhXaWR0aD9jLm1heFdpZHRoKCk6Yy5tYXhXaWR0aHx8MWU0LHk9J2Z1bmN0aW9uJz09dHlwZW9mIGMubWF4SGVpZ2h0P2MubWF4SGVpZ2h0KCk6Yy5tYXhIZWlnaHR8fDFlNCx2PSdmdW5jdGlvbic9PXR5cGVvZiBjLm1pbldpZHRoP2MubWluV2lkdGgoKTpjLm1pbldpZHRoLHg9J2Z1bmN0aW9uJz09dHlwZW9mIGMubWluSGVpZ2h0P2MubWluSGVpZ2h0KCk6Yy5taW5IZWlnaHQsUD1bXTtjb25zdCBUPW5ldyBDdXN0b21FdmVudCgnanNwYW5lbHJlc2l6ZXN0YXJ0Jyx7ZGV0YWlsOm4uaWR9KSxMPW5ldyBDdXN0b21FdmVudCgnanNwYW5lbHJlc2l6ZScse2RldGFpbDpuLmlkfSksaz1uZXcgQ3VzdG9tRXZlbnQoJ2pzcGFuZWxyZXNpemVzdG9wJyx7ZGV0YWlsOm4uaWR9KTtyZXR1cm4gRT10aGlzLnBPY29udGFpbm1lbnQoYy5jb250YWlubWVudCksYy5oYW5kbGVzLnNwbGl0KCcsJykuZm9yRWFjaChBPT57Y29uc3QgVz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtXLmNsYXNzTmFtZT1ganNQYW5lbC1yZXNpemVpdC1oYW5kbGUganNQYW5lbC1yZXNpemVpdC0ke0EudHJpbSgpfWAsVy5zdHlsZS56SW5kZXg9OTAsbi5hcHBlbmQoVyl9KSxuLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZScpLmZvckVhY2goQT0+e2pzUGFuZWwucG9pbnRlcmRvd24uZm9yRWFjaChmdW5jdGlvbihXKXtBLmFkZEV2ZW50TGlzdGVuZXIoVyxIPT57SC5wcmV2ZW50RGVmYXVsdCgpLFA9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaWZyYW1lJyksUC5sZW5ndGgmJlAuZm9yRWFjaChmdW5jdGlvbihvZSl7b2Uuc3R5bGUucG9pbnRlckV2ZW50cz0nbm9uZSd9KTtjb25zdCBSPW4uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksQj1mLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLEQ9d2luZG93LmdldENvbXB1dGVkU3R5bGUoZixudWxsKSxPPXBhcnNlSW50KEQuYm9yZGVyTGVmdFdpZHRoLDEwKSxNPXBhcnNlSW50KEQuYm9yZGVyVG9wV2lkdGgsMTApLEk9RC5nZXRQcm9wZXJ0eVZhbHVlKCdwb3NpdGlvbicpLE49SC5jbGllbnRYfHxILnRvdWNoZXNbMF0uY2xpZW50WCxYPUguY2xpZW50WXx8SC50b3VjaGVzWzBdLmNsaWVudFksWT1SLndpZHRoLEY9Ui5oZWlnaHQsVj1ILnRhcmdldC5jbGFzc0xpc3Q7bGV0IF89Ui5sZWZ0LEs9Ui50b3AsRz0xZTQsVT0xZTQsWj0xZTQsSj0xZTQ7bi5jb250ZW50LnN0eWxlLnBvaW50ZXJFdmVudHM9J25vbmUnLCdib2R5JyE9PW0mJihfPVIubGVmdC1CLmxlZnQrZi5zY3JvbGxMZWZ0LEs9Ui50b3AtQi50b3ArZi5zY3JvbGxUb3ApLCdib2R5Jz09PW0mJkU/KEc9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLVIubGVmdCxaPWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQtUi50b3AsVT1SLndpZHRoK1IubGVmdCxKPVIuaGVpZ2h0K1IudG9wKTpFJiYoJ3N0YXRpYyc9PT1JPyhHPUIud2lkdGgtUi5sZWZ0K08sWj1CLmhlaWdodCtCLnRvcC1SLnRvcCtNLFU9Ui53aWR0aCsoUi5sZWZ0LUIubGVmdCktTyxKPVIuaGVpZ2h0KyhSLnRvcC1CLnRvcCktTSk6KEc9Zi5jbGllbnRXaWR0aC0oUi5sZWZ0LUIubGVmdCkrTyxaPWYuY2xpZW50SGVpZ2h0LShSLnRvcC1CLnRvcCkrTSxVPVIud2lkdGgrKFIubGVmdC1CLmxlZnQpLU8sSj1uLmNsaWVudEhlaWdodCsoUi50b3AtQi50b3ApLU0pKSxFJiYoVS09RVszXSxKLT1FWzBdLEctPUVbMV0sWi09RVsyXSk7Y29uc3QgUT13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShuKTtsZXQgZWU9cGFyc2VGbG9hdChRLndpZHRoKS1SLndpZHRoLHRlPXBhcnNlRmxvYXQoUS5oZWlnaHQpLVIuaGVpZ2h0LG5lPXBhcnNlRmxvYXQoUS5sZWZ0KS1SLmxlZnQsYWU9cGFyc2VGbG9hdChRLnRvcCktUi50b3A7ZiE9PWRvY3VtZW50LmJvZHkmJihuZSs9Qi5sZWZ0LGFlKz1CLnRvcCksej1vZT0+e0N8fChkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFQpLGMuc3RhcnQmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhuLGMuc3RhcnQsITEse3dpZHRoOlksaGVpZ2h0OkZ9KSxqc1BhbmVsLmZyb250KG4pKSxDPTEsZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChMKSwoVi5jb250YWlucygnanNQYW5lbC1yZXNpemVpdC1lJyl8fFYuY29udGFpbnMoJ2pzUGFuZWwtcmVzaXplaXQtc2UnKXx8Vi5jb250YWlucygnanNQYW5lbC1yZXNpemVpdC1uZScpKSYmKFM9WSsob2UuY2xpZW50WHx8b2UudG91Y2hlc1swXS5jbGllbnRYKS1OK2VlLFM+PUcmJihTPUcpLFM+PXU/Uz11OlM8PXYmJihTPXYpLG4uc3R5bGUud2lkdGg9UysncHgnKSwoVi5jb250YWlucygnanNQYW5lbC1yZXNpemVpdC1zJyl8fFYuY29udGFpbnMoJ2pzUGFuZWwtcmVzaXplaXQtc2UnKXx8Vi5jb250YWlucygnanNQYW5lbC1yZXNpemVpdC1zdycpKSYmKGo9Risob2UuY2xpZW50WXx8b2UudG91Y2hlc1swXS5jbGllbnRZKS1YK3RlLGo+PVomJihqPVopLGo+PXk/aj15Omo8PXgmJihqPXgpLG4uc3R5bGUuaGVpZ2h0PWorJ3B4JyksKFYuY29udGFpbnMoJ2pzUGFuZWwtcmVzaXplaXQtdycpfHxWLmNvbnRhaW5zKCdqc1BhbmVsLXJlc2l6ZWl0LW53Jyl8fFYuY29udGFpbnMoJ2pzUGFuZWwtcmVzaXplaXQtc3cnKSkmJihTPVkrTi0ob2UuY2xpZW50WHx8b2UudG91Y2hlc1swXS5jbGllbnRYKStlZSxTPD11JiZTPj12JiZTPD1VJiYobi5zdHlsZS5sZWZ0PV8rKG9lLmNsaWVudFh8fG9lLnRvdWNoZXNbMF0uY2xpZW50WCktTituZSsncHgnKSxTPj1VJiYoUz1VKSxTPj11P1M9dTpTPD12JiYoUz12KSxuLnN0eWxlLndpZHRoPVMrJ3B4JyksKFYuY29udGFpbnMoJ2pzUGFuZWwtcmVzaXplaXQtbicpfHxWLmNvbnRhaW5zKCdqc1BhbmVsLXJlc2l6ZWl0LW53Jyl8fFYuY29udGFpbnMoJ2pzUGFuZWwtcmVzaXplaXQtbmUnKSkmJihqPUYrWC0ob2UuY2xpZW50WXx8b2UudG91Y2hlc1swXS5jbGllbnRZKSt0ZSxqPD15JiZqPj14JiZqPD1KJiYobi5zdHlsZS50b3A9Sysob2UuY2xpZW50WXx8b2UudG91Y2hlc1swXS5jbGllbnRZKS1YK2FlKydweCcpLGo+PUomJihqPUopLGo+PXk/aj15Omo8PXgmJihqPXgpLG4uc3R5bGUuaGVpZ2h0PWorJ3B4Jyksd2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO2NvbnN0IGllPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG4pLGxlPXtsZWZ0OnBhcnNlRmxvYXQoaWUubGVmdCksdG9wOnBhcnNlRmxvYXQoaWUudG9wKSxyaWdodDpwYXJzZUZsb2F0KGllLnJpZ2h0KSxib3R0b206cGFyc2VGbG9hdChpZS5ib3R0b20pLHdpZHRoOnBhcnNlRmxvYXQoaWUud2lkdGgpLGhlaWdodDpwYXJzZUZsb2F0KGllLmhlaWdodCl9O2MucmVzaXplJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3MobixjLnJlc2l6ZSwhMSxsZSl9LGpzUGFuZWwucG9pbnRlcm1vdmUuZm9yRWFjaChmdW5jdGlvbihvZSl7ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihvZSx6LCExKX0pLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsb2U9PntudWxsPT09b2UucmVsYXRlZFRhcmdldCYmanNQYW5lbC5wb2ludGVybW92ZS5mb3JFYWNoKGZ1bmN0aW9uKGllKXtkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGllLHosITEpfSl9LCExKX0pfSl9KSxqc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uKEEpe2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoQSxXPT57aWYoanNQYW5lbC5wb2ludGVybW92ZS5mb3JFYWNoKGZ1bmN0aW9uKEgpe2RvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoSCx6LCExKX0pLFcudGFyZ2V0LmNsYXNzTGlzdCYmVy50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdqc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZScpKXtsZXQgSCxSO2NvbnN0IEI9Vy50YXJnZXQuY2xhc3NOYW1lO2lmKEIubWF0Y2goL2pzUGFuZWwtcmVzaXplaXQtbnd8anNQYW5lbC1yZXNpemVpdC13fGpzUGFuZWwtcmVzaXplaXQtc3cvaSkmJihIPSEwKSxCLm1hdGNoKC9qc1BhbmVsLXJlc2l6ZWl0LW53fGpzUGFuZWwtcmVzaXplaXQtbnxqc1BhbmVsLXJlc2l6ZWl0LW5lL2kpJiYoUj0hMCksYy5ncmlkJiZBcnJheS5pc0FycmF5KGMuZ3JpZCkpezE9PT1jLmdyaWQubGVuZ3RoJiYoYy5ncmlkWzFdPWMuZ3JpZFswXSk7Y29uc3QgRD1wYXJzZUZsb2F0KG4uc3R5bGUud2lkdGgpLE89cGFyc2VGbG9hdChuLnN0eWxlLmhlaWdodCksTT1EJWMuZ3JpZFswXSxJPU8lYy5ncmlkWzFdLE49cGFyc2VGbG9hdChuLnN0eWxlLmxlZnQpLFg9cGFyc2VGbG9hdChuLnN0eWxlLnRvcCksWT1OJWMuZ3JpZFswXSxGPVglYy5ncmlkWzFdO24uc3R5bGUud2lkdGg9TTxjLmdyaWRbMF0vMj9ELU0rJ3B4JzpEKyhjLmdyaWRbMF0tTSkrJ3B4JyxuLnN0eWxlLmhlaWdodD1JPGMuZ3JpZFsxXS8yP08tSSsncHgnOk8rKGMuZ3JpZFsxXS1JKSsncHgnLEgmJihZPGMuZ3JpZFswXS8yP24uc3R5bGUubGVmdD1OLVkrJ3B4JzpuLnN0eWxlLmxlZnQ9TisoYy5ncmlkWzBdLVkpKydweCcpLFImJihGPGMuZ3JpZFsxXS8yP24uc3R5bGUudG9wPVgtRisncHgnOm4uc3R5bGUudG9wPVgrKGMuZ3JpZFsxXS1GKSsncHgnKX19QyYmKG4uY29udGVudC5zdHlsZS5wb2ludGVyRXZlbnRzPSdpbmhlcml0Jyxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGspLEM9dm9pZCAwLG4uc2F2ZUN1cnJlbnREaW1lbnNpb25zKCksbi5zYXZlQ3VycmVudFBvc2l0aW9uKCksYy5zdG9wJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3MobixjLnN0b3AsITEse3dpZHRoOnBhcnNlRmxvYXQobi5zdHlsZS53aWR0aCksaGVpZ2h0OnBhcnNlRmxvYXQobi5zdHlsZS5oZWlnaHQpfSkpLFAubGVuZ3RoJiZQLmZvckVhY2goZnVuY3Rpb24oSCl7SC5zdHlsZS5wb2ludGVyRXZlbnRzPSdpbmhlcml0J30pfSwhMSl9KSxjLmRpc2FibGUmJm4ucXVlcnlTZWxlY3RvckFsbCgnLmpzUGFuZWwtcmVzaXplaXQtaGFuZGxlJykuZm9yRWFjaChBPT57QS5zdHlsZS5wb2ludGVyRXZlbnRzPSdub25lJ30pLG59LHNldENsYXNzKG4sbyl7cmV0dXJuIG8uc3BsaXQoJyAnKS5mb3JFYWNoKGM9Pm4uY2xhc3NMaXN0LmFkZChjKSksbn0scmVtQ2xhc3MobixvKXtyZXR1cm4gby5zcGxpdCgnICcpLmZvckVhY2goYz0+bi5jbGFzc0xpc3QucmVtb3ZlKGMpKSxufSxzZXRTdHlsZShuLG8pe2ZvcihsZXQgYyBpbiBvKWlmKG8uaGFzT3duUHJvcGVydHkoYykpe2xldCBmPShjKycnKS5yZXBsYWNlKC8tXFx3L2dpLG09PntyZXR1cm4gbS5zdWJzdHIoLTEpLnRvVXBwZXJDYXNlKCl9KTtuLnN0eWxlW2ZdPW9bY119cmV0dXJuIG59LHNuYXBQYW5lbChuLG8pe2lmKG4uY3VycmVudERhdGEuYmVmb3JlU25hcD17d2lkdGg6bi5jdXJyZW50RGF0YS53aWR0aCxoZWlnaHQ6bi5jdXJyZW50RGF0YS5oZWlnaHR9LG8mJidmdW5jdGlvbic9PXR5cGVvZiBvKW8uY2FsbChuLG4sbi5zbmFwcGFibGVUbyk7ZWxzZSBpZighMSE9PW8pe2xldCBjPVswLDBdO2lmKG4ub3B0aW9ucy5kcmFnaXQuc25hcC5jb250YWlubWVudCYmbi5vcHRpb25zLmRyYWdpdC5jb250YWlubWVudCl7Y29uc3QgZj10aGlzLnBPY29udGFpbm1lbnQobi5vcHRpb25zLmRyYWdpdC5jb250YWlubWVudCksbT1uLnNuYXBwYWJsZVRvO20uc3RhcnRzV2l0aCgnbGVmdCcpP2NbMF09ZlszXTptLnN0YXJ0c1dpdGgoJ3JpZ2h0JykmJihjWzBdPS1mWzFdKSxtLmVuZHNXaXRoKCd0b3AnKT9jWzFdPWZbMF06bS5lbmRzV2l0aCgnYm90dG9tJykmJihjWzFdPS1mWzJdKX1uLnJlcG9zaXRpb24oYCR7bi5zbmFwcGFibGVUb30gJHtjWzBdfSAke2NbMV19YCksbi5zbmFwcGVkPW4uc25hcHBhYmxlVG99fSxjcmVhdGUobj17fSxvKXtqc1BhbmVsLnppfHwoanNQYW5lbC56aT0oKFg9anNQYW5lbC56aUJhc2UpPT57bGV0IFk9WDtyZXR1cm57bmV4dDooKT0+e3JldHVybiBZKyt9fX0pKCkpO2xldCBjO24uY29uZmlnPyhuPU9iamVjdC5hc3NpZ24oe30sdGhpcy5kZWZhdWx0cyxuLmNvbmZpZyxuKSxkZWxldGUgbi5jb25maWcpOm49T2JqZWN0LmFzc2lnbih7fSx0aGlzLmRlZmF1bHRzLG4pLG4uaWQ/J2Z1bmN0aW9uJz09dHlwZW9mIG4uaWQmJihuLmlkPW4uaWQoKSk6bi5pZD1ganNQYW5lbC0ke2pzUGFuZWwuaWRDb3VudGVyKz0xfWA7Y29uc3QgZj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChuLmlkKTtpZihudWxsIT09Zil7Zi5jbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwnKSYmZi5mcm9udCgpO2NvbnN0IFg9bmV3IGpzUGFuZWxFcnJvcignTk8gTkVXIFBBTkVMIENSRUFURUQhXFxuQW4gZWxlbWVudCB3aXRoIHRoZSBJRCA8JytuLmlkKyc+IGFscmVhZHkgZXhpc3RzIGluIHRoZSBkb2N1bWVudC4nKTt0cnl7dGhyb3cgWH1jYXRjaChZKXtvJiZvLmNhbGwoWSxZKX1yZXR1cm4gY29uc29sZS5lcnJvcihYLm5hbWUrJzonLFgubWVzc2FnZSl9Y29uc3QgbT10aGlzLnBPY29udGFpbmVyKG4uY29udGFpbmVyLG8pO2lmKG0mJm0ubWVzc2FnZSlyZXR1cm4gY29uc29sZS5lcnJvcihtLm5hbWUrJzonLG0ubWVzc2FnZSk7bi5tYXhpbWl6ZWRNYXJnaW49dGhpcy5wT2NvbnRhaW5tZW50KG4ubWF4aW1pemVkTWFyZ2luKSxuLmRyYWdpdCYmKFsnc3RhcnQnLCdkcmFnJywnc3RvcCddLmZvckVhY2goZnVuY3Rpb24oWCl7bi5kcmFnaXRbWF0/J2Z1bmN0aW9uJz09dHlwZW9mIG4uZHJhZ2l0W1hdJiYobi5kcmFnaXRbWF09W24uZHJhZ2l0W1hdXSk6bi5kcmFnaXRbWF09W119KSxuLmRyYWdpdC5zbmFwJiYoJ29iamVjdCc9PXR5cGVvZiBuLmRyYWdpdC5zbmFwP24uZHJhZ2l0LnNuYXA9T2JqZWN0LmFzc2lnbih7fSx0aGlzLmRlZmF1bHRTbmFwQ29uZmlnLG4uZHJhZ2l0LnNuYXApOm4uZHJhZ2l0LnNuYXA9dGhpcy5kZWZhdWx0U25hcENvbmZpZykpLG4ucmVzaXplaXQmJlsnc3RhcnQnLCdyZXNpemUnLCdzdG9wJ10uZm9yRWFjaChmdW5jdGlvbihYKXtuLnJlc2l6ZWl0W1hdPydmdW5jdGlvbic9PXR5cGVvZiBuLnJlc2l6ZWl0W1hdJiYobi5yZXNpemVpdFtYXT1bbi5yZXNpemVpdFtYXV0pOm4ucmVzaXplaXRbWF09W119KSxbJ29uYmVmb3JlY2xvc2UnLCdvbmJlZm9yZW1heGltaXplJywnb25iZWZvcmVtaW5pbWl6ZScsJ29uYmVmb3Jlbm9ybWFsaXplJywnb25iZWZvcmVzbWFsbGlmeScsJ29uYmVmb3JldW5zbWFsbGlmeScsJ29uY2xvc2VkJywnb25mcm9udGVkJywnb25tYXhpbWl6ZWQnLCdvbm1pbmltaXplZCcsJ29ubm9ybWFsaXplZCcsJ29uc21hbGxpZmllZCcsJ29uc3RhdHVzY2hhbmdlJywnb251bnNtYWxsaWZpZWQnXS5mb3JFYWNoKGZ1bmN0aW9uKFgpe25bWF0/J2Z1bmN0aW9uJz09dHlwZW9mIG5bWF0mJihuW1hdPVtuW1hdXSk6bltYXT1bXX0pLG4uaGVhZGVyUmVtb3ZlJiYobi5oZWFkZXI9ITEpO2xldCB1PW4udGVtcGxhdGU/bi50ZW1wbGF0ZTp0aGlzLmNyZWF0ZVBhbmVsVGVtcGxhdGUoKTt1Lm9wdGlvbnM9bix1LnN0YXR1cz0naW5pdGlhbGl6ZWQnLHUuY3VycmVudERhdGE9e30sdS5oZWFkZXI9dS5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1oZHInKSx1LmhlYWRlcmJhcj11LmhlYWRlci5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1oZWFkZXJiYXInKSx1LnRpdGxlYmFyPXUuaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLXRpdGxlYmFyJyksdS5oZWFkZXJsb2dvPXUuaGVhZGVyYmFyLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWhlYWRlcmxvZ28nKSx1LmhlYWRlcnRpdGxlPXUuaGVhZGVyYmFyLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLXRpdGxlJyksdS5jb250cm9sYmFyPXUuaGVhZGVyYmFyLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWNvbnRyb2xiYXInKSx1LmhlYWRlcnRvb2xiYXI9dS5oZWFkZXIucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtaGRyLXRvb2xiYXInKSx1LmNvbnRlbnQ9dS5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1jb250ZW50JyksdS5mb290ZXI9dS5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1mdHInKSx1LnNuYXBwYWJsZVRvPSExLHUuc25hcHBlZD0hMTtjb25zdCB5PW5ldyBDdXN0b21FdmVudCgnanNwYW5lbGxvYWRlZCcse2RldGFpbDpuLmlkfSksdj1uZXcgQ3VzdG9tRXZlbnQoJ2pzcGFuZWxiZWZvcmVjbG9zZScse2RldGFpbDpuLmlkfSkseD1uZXcgQ3VzdG9tRXZlbnQoJ2pzcGFuZWxjbG9zZWQnLHtkZXRhaWw6bi5pZH0pLEU9bmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVsc3RhdHVzY2hhbmdlJyx7ZGV0YWlsOm4uaWR9KSx6PW5ldyBDdXN0b21FdmVudCgnanNwYW5lbGJlZm9yZW5vcm1hbGl6ZScse2RldGFpbDpuLmlkfSksQz1uZXcgQ3VzdG9tRXZlbnQoJ2pzcGFuZWxub3JtYWxpemVkJyx7ZGV0YWlsOm4uaWR9KSxTPW5ldyBDdXN0b21FdmVudCgnanNwYW5lbGJlZm9yZW1heGltaXplJyx7ZGV0YWlsOm4uaWR9KSxqPW5ldyBDdXN0b21FdmVudCgnanNwYW5lbG1heGltaXplZCcse2RldGFpbDpuLmlkfSksUD1uZXcgQ3VzdG9tRXZlbnQoJ2pzcGFuZWxiZWZvcmVtaW5pbWl6ZScse2RldGFpbDpuLmlkfSksVD1uZXcgQ3VzdG9tRXZlbnQoJ2pzcGFuZWxtaW5pbWl6ZWQnLHtkZXRhaWw6bi5pZH0pLEw9bmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVsYmVmb3Jlc21hbGxpZnknLHtkZXRhaWw6bi5pZH0pLGs9bmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVsc21hbGxpZmllZCcse2RldGFpbDpuLmlkfSksQT1uZXcgQ3VzdG9tRXZlbnQoJ2pzcGFuZWxzbWFsbGlmaWVkbWF4Jyx7ZGV0YWlsOm4uaWR9KSxXPW5ldyBDdXN0b21FdmVudCgnanNwYW5lbGJlZm9yZXVuc21hbGxpZnknLHtkZXRhaWw6bi5pZH0pLEg9bmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVsZnJvbnRlZCcse2RldGFpbDpuLmlkfSksUj11LnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWJ0bi1jbG9zZScpLEI9dS5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1idG4tbWF4aW1pemUnKSxEPXUucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZScpLE89dS5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1idG4tc21hbGxpZnknKSxNPXUucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtYnRuLXNtYWxsaWZ5cmV2JyksST11LnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWJ0bi1taW5pbWl6ZScpO1ImJmpzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goWD0+e1IuYWRkRXZlbnRMaXN0ZW5lcihYLFk9PntZLnByZXZlbnREZWZhdWx0KCksdS5jbG9zZSgpfSl9KSxCJiZqc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKFg9PntCLmFkZEV2ZW50TGlzdGVuZXIoWCxZPT57WS5wcmV2ZW50RGVmYXVsdCgpLHUubWF4aW1pemUoKX0pfSksRCYmanNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChYPT57RC5hZGRFdmVudExpc3RlbmVyKFgsWT0+e1kucHJldmVudERlZmF1bHQoKSx1Lm5vcm1hbGl6ZSgpfSl9KSxPJiZqc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKFg9PntPLmFkZEV2ZW50TGlzdGVuZXIoWCxZPT57WS5wcmV2ZW50RGVmYXVsdCgpLHUuc21hbGxpZnkoKX0pfSksTSYmanNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChYPT57TS5hZGRFdmVudExpc3RlbmVyKFgsWT0+e1kucHJldmVudERlZmF1bHQoKSx1LnVuc21hbGxpZnkoKX0pfSksSSYmanNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChYPT57SS5hZGRFdmVudExpc3RlbmVyKFgsWT0+e1kucHJldmVudERlZmF1bHQoKSx1Lm1pbmltaXplKCl9KX0pO2xldCBOPWpzUGFuZWwuZXh0ZW5zaW9ucztmb3IobGV0IFggaW4gTilOLmhhc093blByb3BlcnR5KFgpJiYodVtYXT1OW1hdKTtpZih1LmFkZFRvb2xiYXI9KFgsWSxGKT0+e2lmKCdoZWFkZXInPT09WD9YPXUuaGVhZGVydG9vbGJhcjonZm9vdGVyJz09WCYmKFg9dS5mb290ZXIpLCdzdHJpbmcnPT10eXBlb2YgWSlYLmlubmVySFRNTD1ZO2Vsc2UgaWYoQXJyYXkuaXNBcnJheShZKSlZLmZvckVhY2goVj0+eydzdHJpbmcnPT10eXBlb2YgVj9YLmlubmVySFRNTCs9VjpYLmFwcGVuZChWKX0pO2Vsc2UgaWYoJ2Z1bmN0aW9uJz09dHlwZW9mIFkpe2NvbnN0IFY9WS5jYWxsKHUsdSk7J3N0cmluZyc9PXR5cGVvZiBWP1guaW5uZXJIVE1MPVY6WC5hcHBlbmQoVil9ZWxzZSBYLmFwcGVuZChZKTtyZXR1cm4gWC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKSxGJiZGLmNhbGwodSx1KSx1fSx1LmFwcGx5QnVpbHRJblRoZW1lPVg9PntyZXR1cm4gdS5jbGFzc0xpc3QuYWRkKGBqc1BhbmVsLXRoZW1lLSR7WC5jb2xvcn1gKSx1LmhlYWRlci5jbGFzc0xpc3QuYWRkKGBqc1BhbmVsLXRoZW1lLSR7WC5jb2xvcn1gKSxYLmZpbGxpbmcmJih1LmNvbnRlbnQuc3R5bGUuYmFja2dyb3VuZD0nJyx1LmNvbnRlbnQuY2xhc3NMaXN0LmFkZChganNQYW5lbC1jb250ZW50LSR7WC5maWxsaW5nfWApKSxuLmhlYWRlclRvb2xiYXJ8fCh1LmNvbnRlbnQuc3R5bGUuYmFja2dyb3VuZD0nJyx1LmNvbnRlbnQuc3R5bGUuYm9yZGVyVG9wPWAxcHggc29saWQgJHt1LmhlYWRlcnRpdGxlLnN0eWxlLmNvbG9yfWApLHV9LHUuYXBwbHlBcmJpdHJhcnlUaGVtZT1YPT57cmV0dXJuIHUuaGVhZGVyLnN0eWxlLmJhY2tncm91bmRDb2xvcj1YLmNvbG9yc1swXSxbJy5qc1BhbmVsLWhlYWRlcmxvZ28nLCcuanNQYW5lbC10aXRsZScsJy5qc1BhbmVsLWhkci10b29sYmFyJ10uZm9yRWFjaChZPT57dS5xdWVyeVNlbGVjdG9yKFkpLnN0eWxlLmNvbG9yPVguY29sb3JzWzNdfSx1KSx1LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuJykuZm9yRWFjaChZPT57WS5zdHlsZS5jb2xvcj1YLmNvbG9yc1szXX0pLG4uaGVhZGVyVG9vbGJhcj9qc1BhbmVsLnNldFN0eWxlKHUuaGVhZGVydG9vbGJhcix7Ym94U2hhZG93OmAwIDAgMXB4ICR7WC5jb2xvcnNbM119IGluc2V0YCx3aWR0aDonY2FsYygxMDAlICsgNHB4KScsbWFyZ2luTGVmdDonLTFweCd9KTp1LmNvbnRlbnQuc3R5bGUuYm9yZGVyVG9wPWAxcHggc29saWQgJHtYLmNvbG9yc1szXX1gLCdmaWxsZWQnPT09WC5maWxsaW5nPyh1LmNvbnRlbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yPVguY29sb3JzWzBdLHUuY29udGVudC5zdHlsZS5jb2xvcj1YLmNvbG9yc1szXSk6J2ZpbGxlZGxpZ2h0Jz09PVguZmlsbGluZyYmKHUuY29udGVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I9WC5jb2xvcnNbMV0pLHV9LHUuYXBwbHlCb290c3RyYXBUaGVtZT1YPT57Y29uc3QgWT1YLmJzdGhlbWUsRj0kLmZuLmJ1dHRvbi5Db25zdHJ1Y3Rvci5WRVJTSU9OWzBdO2lmKCc0Jz09PUY/dS5jbGFzc0xpc3QuYWRkKGBiZy0ke1l9YCk6KFsncGFuZWwnLGBwYW5lbC0ke1l9YF0uZm9yRWFjaChLPT57dS5jbGFzc0xpc3QuYWRkKEspfSksdS5oZWFkZXIuY2xhc3NMaXN0LmFkZCgncGFuZWwtaGVhZGluZycpKSwnbWRiJz09PVguYnMpe2xldCBLPWAke1l9LWNvbG9yYDtYLm1kYlN0eWxlJiYoSz1gJHtLfS1kYXJrYCksdS5jbGFzc0xpc3QuYWRkKEspfWxldCBWPSc0Jz09PUY/d2luZG93LmdldENvbXB1dGVkU3R5bGUodSkuYmFja2dyb3VuZENvbG9yLnJlcGxhY2UoL1xccysvZywnJyk6d2luZG93LmdldENvbXB1dGVkU3R5bGUodS5oZWFkZXIpLmJhY2tncm91bmRDb2xvci5yZXBsYWNlKC9cXHMrL2csJycpO2xldCBfPWpzUGFuZWwuY2FsY0NvbG9ycyhWKTtyZXR1cm4gdS5oZWFkZXIuc3R5bGUuY29sb3I9X1szXSxYLmZpbGxpbmc/dS5zZXRUaGVtZShgJHtWfSAke1guZmlsbGluZ31gKTp1LnNldFRoZW1lKFYpLHV9LHUuYXBwbHlUaGVtZUJvcmRlcj1YPT57Y29uc3QgWT1uLmJvcmRlci5zcGxpdCgnICcpO2lmKHUuc3R5bGUuYm9yZGVyV2lkdGg9WVswXSx1LnN0eWxlLmJvcmRlclN0eWxlPVlbMV0sdS5zdHlsZS5ib3JkZXJDb2xvcj1ZWzJdLCFYLmJzKS0xPT09anNQYW5lbC50aGVtZXMuaW5kZXhPZihYLmNvbG9yKSYmKFlbMl0/dS5zdHlsZS5ib3JkZXJDb2xvcj1ZWzJdOnUuc3R5bGUuYm9yZGVyQ29sb3I9WC5jb2xvcnNbMF0pO2Vsc2V7bGV0IEY7Rj0ndHJhbnNwYXJlbnQnPT09d2luZG93LmdldENvbXB1dGVkU3R5bGUodS5oZWFkZXIpLmJhY2tncm91bmRDb2xvcj93aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh1KS5iYWNrZ3JvdW5kQ29sb3IucmVwbGFjZSgvXFxzKy9nLCcnKTp3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh1LmhlYWRlcikuYmFja2dyb3VuZENvbG9yLnJlcGxhY2UoL1xccysvZywnJyksdS5zdHlsZS5ib3JkZXJDb2xvcj1ZWzJdP1lbMl06Rn1yZXR1cm4gdX0sdS5hdXRvcG9zaXRpb25SZW1haW5pbmc9KCk9PntsZXQgWDtbJ2xlZnQtdG9wLWRvd24nLCdsZWZ0LXRvcC1yaWdodCcsJ2NlbnRlci10b3AtZG93bicsJ3JpZ2h0LXRvcC1kb3duJywncmlnaHQtdG9wLWxlZnQnLCdsZWZ0LWJvdHRvbS11cCcsJ2xlZnQtYm90dG9tLXJpZ2h0JywnY2VudGVyLWJvdHRvbS11cCcsJ3JpZ2h0LWJvdHRvbS11cCcsJ3JpZ2h0LWJvdHRvbS1sZWZ0J10uZm9yRWFjaChZPT57dS5jbGFzc0xpc3QuY29udGFpbnMoWSkmJihYPVkpfSksWCYmbi5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChgLiR7WH1gKS5mb3JFYWNoKFk9PntZLnJlcG9zaXRpb24oKX0pfSx1LmNhbGNTaXplRmFjdG9ycz0oKT0+e2NvbnN0IFg9d2luZG93LmdldENvbXB1dGVkU3R5bGUodSk7aWYobi5jb250YWluZXI9PT1kb2N1bWVudC5ib2R5KXUuaGY9cGFyc2VGbG9hdCh1LnN0eWxlLmxlZnQpLyhkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoLXBhcnNlRmxvYXQodS5zdHlsZS53aWR0aCkpLHUudmY9cGFyc2VGbG9hdCh1LnN0eWxlLnRvcCkvKHdpbmRvdy5pbm5lckhlaWdodC1wYXJzZUZsb2F0KFguaGVpZ2h0KSk7ZWxzZXtsZXQgWT13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh1LnBhcmVudEVsZW1lbnQpO3UuaGY9cGFyc2VGbG9hdCh1LnN0eWxlLmxlZnQpLyhwYXJzZUZsb2F0KFkud2lkdGgpLXBhcnNlRmxvYXQodS5zdHlsZS53aWR0aCkpLHUudmY9cGFyc2VGbG9hdCh1LnN0eWxlLnRvcCkvKHBhcnNlRmxvYXQoWS5oZWlnaHQpLXBhcnNlRmxvYXQoWC5oZWlnaHQpKX19LHUuY2xlYXJUaGVtZT1YPT57cmV0dXJuIGpzUGFuZWwudGhlbWVzLmNvbmNhdChqc1BhbmVsLm1kYnRoZW1lcykuZm9yRWFjaChZPT57WydwYW5lbCcsYGpzUGFuZWwtdGhlbWUtJHtZfWAsYHBhbmVsLSR7WX1gLGAke1l9LWNvbG9yYF0uZm9yRWFjaChGPT57dS5jbGFzc0xpc3QucmVtb3ZlKEYpfSksdS5oZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgncGFuZWwtaGVhZGluZycsYGpzUGFuZWwtdGhlbWUtJHtZfWApfSx1KSx1LmhlYWRlcnRpdGxlLmNsYXNzTGlzdC5yZW1vdmUoJ3BhbmVsLXRpdGxlJyksdS5jb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3BhbmVsLWJvZHknLCdqc1BhbmVsLWNvbnRlbnQtZmlsbGVkJywnanNQYW5lbC1jb250ZW50LWZpbGxlZGxpZ2h0JyksdS5mb290ZXIuY2xhc3NMaXN0LnJlbW92ZSgncGFuZWwtZm9vdGVyJyksanNQYW5lbC5zZXRTdHlsZSh1LHtiYWNrZ3JvdW5kQ29sb3I6JycsYm9yZGVyV2lkdGg6JycsYm9yZGVyU3R5bGU6JycsYm9yZGVyQ29sb3I6Jyd9KSxqc1BhbmVsLnNldFN0eWxlKHUuY29udGVudCx7YmFja2dyb3VuZDonJyxib3JkZXI6Jyd9KSxqc1BhbmVsLnNldFN0eWxlKHUuaGVhZGVydG9vbGJhcix7Ym94U2hhZG93OicnLHdpZHRoOicnLG1hcmdpbkxlZnQ6Jyd9KSx1LmhlYWRlci5zdHlsZS5iYWNrZ3JvdW5kPScnLEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHUuY29udHJvbGJhci5xdWVyeVNlbGVjdG9yQWxsKCcuanNQYW5lbC1pY29uJykpLmNvbmNhdChbdS5oZWFkZXJsb2dvLHUuaGVhZGVydGl0bGUsdS5oZWFkZXJ0b29sYmFyLHUuY29udGVudF0pLmZvckVhY2goWT0+e1kuc3R5bGUuY29sb3I9Jyd9KSxYJiZYLmNhbGwodSx1KSx1fSx1LmNsb3NlPVg9Pntjb25zdCBZPSgpPT57Y29uc3QgRj1uLmlkO3JldHVybiBjJiZ3aW5kb3cuY2xlYXJUaW1lb3V0KGMpLHUuY2xvc2VDaGlsZHBhbmVscygpLHUucGFyZW50RWxlbWVudCYmdS5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHUpLCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJytGKSYmdm9pZCh1LnJlbW92ZU1pbmltaXplZFJlcGxhY2VtZW50KCksZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCh4KSxYJiZYLmNhbGwoRixGKSxuLm9uY2xvc2VkJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3ModSxuLm9uY2xvc2VkLCdldmVyeScpLHUuYXV0b3Bvc2l0aW9uUmVtYWluaW5nKCkpfTtyZXR1cm4gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCh2KSxuLm9uYmVmb3JlY2xvc2UmJjA8bi5vbmJlZm9yZWNsb3NlLmxlbmd0aCYmIWpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyh1LG4ub25iZWZvcmVjbG9zZSk/dTp2b2lkKG4uYW5pbWF0ZU91dD8obi5hbmltYXRlSW4mJmpzUGFuZWwucmVtQ2xhc3ModSxuLmFuaW1hdGVJbiksanNQYW5lbC5zZXRDbGFzcyh1LG4uYW5pbWF0ZU91dCksdS5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCgpPT57WSgpfSkpOlkoKSl9LHUuY2xvc2VDaGlsZHBhbmVscz1YPT57cmV0dXJuIHUuZ2V0Q2hpbGRwYW5lbHMoKS5mb3JFYWNoKFk9PlkuY2xvc2UoKSksWCYmWC5jYWxsKHUsdSksdX0sdS5jb250ZW50UmVtb3ZlPVg9PntyZXR1cm4ganNQYW5lbC5lbXB0eU5vZGUodS5jb250ZW50KSxYJiZYLmNhbGwodSx1KSx1fSx1LmNyZWF0ZU1pbmltaXplZFJlcGxhY2VtZW50PSgpPT57Y29uc3QgWD1qc1BhbmVsLmNyZWF0ZU1pbmltaXplZFRlbXBsYXRlKCksWT13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh1LmhlYWRlcnRpdGxlKS5jb2xvcixGPW4uaWNvbmZvbnQsVj1YLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWNvbnRyb2xiYXInKTtyZXR1cm4gWC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I9J3RyYW5zcGFyZW50Jz09PXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHUuaGVhZGVyKS5iYWNrZ3JvdW5kQ29sb3I/d2luZG93LmdldENvbXB1dGVkU3R5bGUodSkuYmFja2dyb3VuZENvbG9yOndpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHUuaGVhZGVyKS5iYWNrZ3JvdW5kQ29sb3IsWC5pZD11LmlkKyctbWluJyxYLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWhlYWRlcmJhcicpLnJlcGxhY2VDaGlsZCh1LmhlYWRlcmxvZ28uY2xvbmVOb2RlKCEwKSxYLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWhlYWRlcmxvZ28nKSksWC5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC10aXRsZWJhcicpLnJlcGxhY2VDaGlsZCh1LmhlYWRlcnRpdGxlLmNsb25lTm9kZSghMCksWC5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC10aXRsZScpKSxYLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLXRpdGxlJykuc3R5bGUuY29sb3I9WSxWLnN0eWxlLmNvbG9yPVksdS5zZXRJY29uZm9udChGLFgpLCdlbmFibGVkJz09PXUuZGF0YXNldC5idG5ub3JtYWxpemU/anNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbihfKXtYLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWJ0bi1ub3JtYWxpemUnKS5hZGRFdmVudExpc3RlbmVyKF8sKCk9Pnt1Lm5vcm1hbGl6ZSgpfSl9KTpWLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWJ0bi1ub3JtYWxpemUnKS5zdHlsZS5kaXNwbGF5PSdub25lJywnZW5hYmxlZCc9PT11LmRhdGFzZXQuYnRubWF4aW1pemU/anNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbihfKXtYLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWJ0bi1tYXhpbWl6ZScpLmFkZEV2ZW50TGlzdGVuZXIoXywoKT0+e3UubWF4aW1pemUoKX0pfSk6Vi5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1idG4tbWF4aW1pemUnKS5zdHlsZS5kaXNwbGF5PSdub25lJywnZW5hYmxlZCc9PT11LmRhdGFzZXQuYnRuY2xvc2U/anNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbihfKXtYLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWJ0bi1jbG9zZScpLmFkZEV2ZW50TGlzdGVuZXIoXywoKT0+e3UuY2xvc2UoKX0pfSk6Vi5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1idG4tY2xvc2UnKS5zdHlsZS5kaXNwbGF5PSdub25lJyxYfSx1LmRyYWdpdD1YPT57Y29uc3QgWT1PYmplY3QuYXNzaWduKHt9LGpzUGFuZWwuZGVmYXVsdHMuZHJhZ2l0LG4uZHJhZ2l0KSxGPXUucXVlcnlTZWxlY3RvckFsbChZLmhhbmRsZXMpO3JldHVybidkaXNhYmxlJz09PVg/Ri5mb3JFYWNoKFY9PntWLnN0eWxlLnBvaW50ZXJFdmVudHM9J25vbmUnfSk6Ri5mb3JFYWNoKFY9PntWLnN0eWxlLnBvaW50ZXJFdmVudHM9J2F1dG8nfSksdX0sdS5mcm9udD0oWCxZPSEwKT0+e3JldHVybiBqc1BhbmVsLmZyb250KHUpLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoSCksWCYmWC5jYWxsKHUsdSksbi5vbmZyb250ZWQmJlkmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyh1LG4ub25mcm9udGVkLCdldmVyeScpLHV9LHUuZ2V0Q2hpbGRwYW5lbHM9KCk9PntyZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodS5jb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qc1BhbmVsJykpfSx1LmdldFRoZW1lRGV0YWlscz1YPT57Y29uc3QgWT1YLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvIC9nLCcnKSxGPXtjb2xvcjohMSxjb2xvcnM6ITEsZmlsbGluZzohMSxiczohMSxic3RoZW1lOiExfTtpZignZmlsbGVkJz09PVkuc3Vic3RyKC02LDYpPyhGLmZpbGxpbmc9J2ZpbGxlZCcsRi5jb2xvcj1ZLnN1YnN0cigwLFkubGVuZ3RoLTYpKTonZmlsbGVkbGlnaHQnPT09WS5zdWJzdHIoLTExLDExKT8oRi5maWxsaW5nPSdmaWxsZWRsaWdodCcsRi5jb2xvcj1ZLnN1YnN0cigwLFkubGVuZ3RoLTExKSk6KEYuZmlsbGluZz0nJyxGLmNvbG9yPVkpLEYuY29sb3JzPWpzUGFuZWwuY2FsY0NvbG9ycyhGLmNvbG9yKSxGLmNvbG9yLm1hdGNoKCctJykpe2NvbnN0IFY9Ri5jb2xvci5zcGxpdCgnLScpO0YuYnM9VlswXSxGLmJzdGhlbWU9VlsxXSxGLm1kYlN0eWxlPVZbMl18fHZvaWQgMH1yZXR1cm4gRn0sdS5pc0NoaWxkcGFuZWw9KCk9Pntjb25zdCBYPXUuY2xvc2VzdCgnLmpzUGFuZWwtY29udGVudCcpO3JldHVybiEhWCYmWC5wYXJlbnRFbGVtZW50fSx1Lm1heGltaXplPVg9PntpZihuLm9uYmVmb3JlbWF4aW1pemUmJjA8bi5vbmJlZm9yZW1heGltaXplLmxlbmd0aCYmIWpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyh1LG4ub25iZWZvcmVtYXhpbWl6ZSkpcmV0dXJuIHU7ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChTKTtjb25zdCBZPXUucGFyZW50RWxlbWVudCxGPW4ubWF4aW1pemVkTWFyZ2luO3JldHVybiBZPT09ZG9jdW1lbnQuYm9keT8odS5zdHlsZS53aWR0aD1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgtRlsxXS1GWzNdKydweCcsdS5zdHlsZS5oZWlnaHQ9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodC1GWzBdLUZbMl0rJ3B4Jyx1LnN0eWxlLmxlZnQ9RlszXSsncHgnLHUuc3R5bGUudG9wPUZbMF0rJ3B4Jywhbi5wb3NpdGlvbi5maXhlZCYmKHUuc3R5bGUubGVmdD13aW5kb3cucGFnZVhPZmZzZXQrRlszXSsncHgnLHUuc3R5bGUudG9wPXdpbmRvdy5wYWdlWU9mZnNldCtGWzBdKydweCcpKToodS5zdHlsZS53aWR0aD1ZLmNsaWVudFdpZHRoLUZbMV0tRlszXSsncHgnLHUuc3R5bGUuaGVpZ2h0PVkuY2xpZW50SGVpZ2h0LUZbMF0tRlsyXSsncHgnLHUuc3R5bGUubGVmdD1GWzNdKydweCcsdS5zdHlsZS50b3A9RlswXSsncHgnKSx1LnJlbW92ZU1pbmltaXplZFJlcGxhY2VtZW50KCksdS5zdGF0dXM9J21heGltaXplZCcsdS5zZXRDb250cm9scyhbJy5qc1BhbmVsLWJ0bi1tYXhpbWl6ZScsJy5qc1BhbmVsLWJ0bi1zbWFsbGlmeXJldiddKSxqc1BhbmVsLmZyb250KHUpLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoaiksZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChFKSxuLm9uc3RhdHVzY2hhbmdlJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3ModSxuLm9uc3RhdHVzY2hhbmdlLCdldmVyeScpLFgmJlguY2FsbCh1LHUpLG4ub25tYXhpbWl6ZWQmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyh1LG4ub25tYXhpbWl6ZWQsJ2V2ZXJ5JyksdX0sdS5taW5pbWl6ZT1YPT57aWYoJ21pbmltaXplZCc9PT11LnN0YXR1cylyZXR1cm4gdTtpZihuLm9uYmVmb3JlbWluaW1pemUmJjA8bi5vbmJlZm9yZW1pbmltaXplLmxlbmd0aCYmIWpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyh1LG4ub25iZWZvcmVtaW5pbWl6ZSkpcmV0dXJuIHU7aWYoZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChQKSwhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyJykpe2NvbnN0IFk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7WS5pZD0nanNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXInLGRvY3VtZW50LmJvZHkuYXBwZW5kKFkpfWlmKHUuc3R5bGUubGVmdD0nLTk5OTlweCcsdS5zdGF0dXNCZWZvcmU9dS5zdGF0dXMsdS5zdGF0dXM9J21pbmltaXplZCcsZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChUKSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KEUpLG4ub25zdGF0dXNjaGFuZ2UmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyh1LG4ub25zdGF0dXNjaGFuZ2UsJ2V2ZXJ5Jyksbi5taW5pbWl6ZVRvKXtjb25zdCBZPXUuY3JlYXRlTWluaW1pemVkUmVwbGFjZW1lbnQoKTtsZXQgRixWLF87J2RlZmF1bHQnPT09bi5taW5pbWl6ZVRvP2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lcicpLmFwcGVuZChZKToncGFyZW50cGFuZWwnPT09bi5taW5pbWl6ZVRvPyhWPXUuY2xvc2VzdCgnLmpzUGFuZWwtY29udGVudCcpLnBhcmVudEVsZW1lbnQsXz1WLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qc1BhbmVsLW1pbmltaXplZC1ib3gnKSxGPV9bXy5sZW5ndGgtMV0sRi5hcHBlbmQoWSkpOidwYXJlbnQnPT09bi5taW5pbWl6ZVRvPyhWPXUucGFyZW50RWxlbWVudCxGPVYucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtbWluaW1pemVkLWNvbnRhaW5lcicpLCFGJiYoRj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxGLmNsYXNzTmFtZT0nanNQYW5lbC1taW5pbWl6ZWQtY29udGFpbmVyJyxWLmFwcGVuZChGKSksRi5hcHBlbmQoWSkpOmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iobi5taW5pbWl6ZVRvKS5hcHBlbmQoWSl9cmV0dXJuIFgmJlguY2FsbCh1LHUpLG4ub25taW5pbWl6ZWQmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyh1LG4ub25taW5pbWl6ZWQsJ2V2ZXJ5JyksdX0sdS5ub3JtYWxpemU9WD0+e3JldHVybidub3JtYWxpemVkJz09PXUuc3RhdHVzP3U6bi5vbmJlZm9yZW5vcm1hbGl6ZSYmMDxuLm9uYmVmb3Jlbm9ybWFsaXplLmxlbmd0aCYmIWpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyh1LG4ub25iZWZvcmVub3JtYWxpemUpP3U6KGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoeiksdS5zdHlsZS53aWR0aD11LmN1cnJlbnREYXRhLndpZHRoLHUuc3R5bGUuaGVpZ2h0PXUuY3VycmVudERhdGEuaGVpZ2h0LHUuc3R5bGUubGVmdD11LmN1cnJlbnREYXRhLmxlZnQsdS5zdHlsZS50b3A9dS5jdXJyZW50RGF0YS50b3AsdS5yZW1vdmVNaW5pbWl6ZWRSZXBsYWNlbWVudCgpLHUuc3RhdHVzPSdub3JtYWxpemVkJyx1LnNldENvbnRyb2xzKFsnLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZScsJy5qc1BhbmVsLWJ0bi1zbWFsbGlmeXJldiddKSxqc1BhbmVsLmZyb250KHUpLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoQyksZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChFKSxuLm9uc3RhdHVzY2hhbmdlJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3ModSxuLm9uc3RhdHVzY2hhbmdlLCdldmVyeScpLFgmJlguY2FsbCh1LHUpLG4ub25ub3JtYWxpemVkJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3ModSxuLm9ubm9ybWFsaXplZCwnZXZlcnknKSx1KX0sdS5yZW1vdmVNaW5pbWl6ZWRSZXBsYWNlbWVudD0oKT0+e2NvbnN0IFg9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodS5pZCsnLW1pbicpO3JldHVybiBYJiZYLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoWCksdX0sdS5yZXBvc2l0aW9uPSguLi5YKT0+e2xldCBWLFk9bi5wb3NpdGlvbixGPSEwO3JldHVybiBYLmZvckVhY2goZnVuY3Rpb24oXyl7J3N0cmluZyc9PXR5cGVvZiBffHwnb2JqZWN0Jz09dHlwZW9mIF8/WT1fOidib29sZWFuJz09dHlwZW9mIF8/Rj1fOidmdW5jdGlvbic9PXR5cGVvZiBfJiYoVj1fKX0pLGpzUGFuZWwucG9zaXRpb24odSxZKSxGJiZ1LnNhdmVDdXJyZW50UG9zaXRpb24oKSxWJiZWLmNhbGwodSx1KSx1fSx1LnJlcG9zaXRpb25PblNuYXA9WD0+e2xldCBZPScwJyxGPScwJztjb25zdCBWPWpzUGFuZWwucE9jb250YWlubWVudChuLmRyYWdpdC5jb250YWlubWVudCk7bi5kcmFnaXQuc25hcC5jb250YWlubWVudCYmKCdsZWZ0LXRvcCc9PT1YPyhZPVZbM10sRj1WWzBdKToncmlnaHQtdG9wJz09PVg/KFk9LVZbMV0sRj1WWzBdKToncmlnaHQtYm90dG9tJz09PVg/KFk9LVZbMV0sRj0tVlsyXSk6J2xlZnQtYm90dG9tJz09PVg/KFk9VlszXSxGPS1WWzJdKTonY2VudGVyLXRvcCc9PT1YPyhZPVZbM10vMi1WWzFdLzIsRj1WWzBdKTonY2VudGVyLWJvdHRvbSc9PT1YPyhZPVZbM10vMi1WWzFdLzIsRj0tVlsyXSk6J2xlZnQtY2VudGVyJz09PVg/KFk9VlszXSxGPVZbMF0vMi1WWzJdLzIpOidyaWdodC1jZW50ZXInPT1YJiYoWT0tVlsxXSxGPVZbMF0vMi1WWzJdLzIpKSxqc1BhbmVsLnBvc2l0aW9uKHUsWCksanNQYW5lbC5zZXRTdHlsZSh1LHtsZWZ0OmBjYWxjKCR7dS5zdHlsZS5sZWZ0fSArICR7WX1weClgLHRvcDpgY2FsYygke3Uuc3R5bGUudG9wfSArICR7Rn1weClgfSl9LHUucmVzaXplPSguLi5YKT0+e2NvbnN0IFk9d2luZG93LmdldENvbXB1dGVkU3R5bGUodSk7bGV0IF8sRj17d2lkdGg6WS53aWR0aCxoZWlnaHQ6WS5oZWlnaHR9LFY9ITA7WC5mb3JFYWNoKGZ1bmN0aW9uKEcpeydzdHJpbmcnPT10eXBlb2YgRz9GPUc6J29iamVjdCc9PXR5cGVvZiBHP0Y9T2JqZWN0LmFzc2lnbihGLEcpOidib29sZWFuJz09dHlwZW9mIEc/Vj1HOidmdW5jdGlvbic9PXR5cGVvZiBHJiYoXz1HKX0pO2NvbnN0IEs9anNQYW5lbC5wT3NpemUodSxGKTtyZXR1cm4gdS5zdHlsZS53aWR0aD1LLndpZHRoLHUuc3R5bGUuaGVpZ2h0PUsuaGVpZ2h0LFYmJnUuc2F2ZUN1cnJlbnREaW1lbnNpb25zKCksXyYmXy5jYWxsKHUsdSksdX0sdS5yZXNpemVpdD1YPT57Y29uc3QgWT11LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZScpO3JldHVybidkaXNhYmxlJz09PVg/WS5mb3JFYWNoKEY9PntGLnN0eWxlLnBvaW50ZXJFdmVudHM9J25vbmUnfSk6WS5mb3JFYWNoKEY9PntGLnN0eWxlLnBvaW50ZXJFdmVudHM9J2F1dG8nfSksdX0sdS5zYXZlQ3VycmVudERpbWVuc2lvbnM9KCk9Pntjb25zdCBYPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHUpO3UuY3VycmVudERhdGEud2lkdGg9WC53aWR0aCwnbm9ybWFsaXplZCc9PT11LnN0YXR1cyYmKHUuY3VycmVudERhdGEuaGVpZ2h0PVguaGVpZ2h0KX0sdS5zYXZlQ3VycmVudFBvc2l0aW9uPSgpPT57Y29uc3QgWD13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh1KTt1LmN1cnJlbnREYXRhLmxlZnQ9WC5sZWZ0LHUuY3VycmVudERhdGEudG9wPVgudG9wfSx1LnNldENvbnRyb2xzPShYLFkpPT57cmV0dXJuIHUuaGVhZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qc1BhbmVsLWJ0bicpLmZvckVhY2goRj0+e0Yuc3R5bGUuZGlzcGxheT0nYmxvY2snfSksWC5mb3JFYWNoKEY9Pntjb25zdCBWPXUuY29udHJvbGJhci5xdWVyeVNlbGVjdG9yKEYpO1YmJihWLnN0eWxlLmRpc3BsYXk9J25vbmUnKX0pLFkmJlkuY2FsbCh1LHUpLHV9LHUuc2V0Q29udHJvbFN0YXR1cz0oWCxZPSdlbmFibGUnLEYpPT57aWYoJ2Rpc2FibGUnPT09WSl7aWYoJ3JlbW92ZWQnIT09dS5nZXRBdHRyaWJ1dGUoYGRhdGEtYnRuJHtYfWApKXt1LnNldEF0dHJpYnV0ZShgZGF0YS1idG4ke1h9YCwnZGlzYWJsZWQnKTtjb25zdCBWPXUuY29udHJvbGJhci5xdWVyeVNlbGVjdG9yKGAuanNQYW5lbC1idG4tJHtYfWApO1Yuc3R5bGUucG9pbnRlckV2ZW50cz0nbm9uZScsVi5zdHlsZS5vcGFjaXR5PTAuNCxWLnN0eWxlLmN1cnNvcj0nZGVmYXVsdCd9fWVsc2UgaWYoJ2VuYWJsZSc9PT1ZKXtpZigncmVtb3ZlZCchPT11LmdldEF0dHJpYnV0ZShgZGF0YS1idG4ke1h9YCkpe3Uuc2V0QXR0cmlidXRlKGBkYXRhLWJ0biR7WH1gLCdlbmFibGVkJyk7Y29uc3QgVj11LmNvbnRyb2xiYXIucXVlcnlTZWxlY3RvcihgLmpzUGFuZWwtYnRuLSR7WH1gKTtWLnN0eWxlLnBvaW50ZXJFdmVudHM9J2F1dG8nLFYuc3R5bGUub3BhY2l0eT0xLFYuc3R5bGUuY3Vyc29yPSdwb2ludGVyJ319ZWxzZSBpZigncmVtb3ZlJz09PVkpe2NvbnN0IFY9dS5jb250cm9sYmFyLnF1ZXJ5U2VsZWN0b3IoYC5qc1BhbmVsLWJ0bi0ke1h9YCk7dS5jb250cm9sYmFyLnJlbW92ZUNoaWxkKFYpLHUuc2V0QXR0cmlidXRlKGBkYXRhLWJ0biR7WH1gLCdyZW1vdmVkJyl9cmV0dXJuIEYmJkYuY2FsbCh1LHUpLHV9LHUuc2V0SGVhZGVyQ29udHJvbHM9WD0+e2NvbnN0IFk9WydjbG9zZScsJ21heGltaXplJywnbm9ybWFsaXplJywnbWluaW1pemUnLCdzbWFsbGlmeScsJ3NtYWxsaWZ5cmV2J10sRj1uLmhlYWRlckNvbnRyb2xzO3JldHVybidzdHJpbmcnPT10eXBlb2YgRj8nbm9uZSc9PT1GP1kuZm9yRWFjaChWPT57dS5zZXRDb250cm9sU3RhdHVzKFYsJ3JlbW92ZScpfSk6J2Nsb3Nlb25seSc9PT1GJiZZLmZvckVhY2goVj0+eydjbG9zZSchPT1WJiZ1LnNldENvbnRyb2xTdGF0dXMoViwncmVtb3ZlJyl9KTpZLmZvckVhY2goVj0+e0ZbVl0mJnUuc2V0Q29udHJvbFN0YXR1cyhWLEZbVl0pfSksWCYmWC5jYWxsKHUsdSksdX0sdS5zZXRIZWFkZXJMb2dvPShYLFkpPT57aWYoJ3N0cmluZychPXR5cGVvZiBYKWpzUGFuZWwuZW1wdHlOb2RlKHUuaGVhZGVybG9nbyksdS5oZWFkZXJsb2dvLmFwcGVuZChYKTtlbHNlIGlmKCc8JyE9PVguc3Vic3RyKDAsMSkpe2NvbnN0IEY9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7Ri5zcmM9WCxqc1BhbmVsLmVtcHR5Tm9kZSh1LmhlYWRlcmxvZ28pLHUuaGVhZGVybG9nby5hcHBlbmQoRil9ZWxzZSB1LmhlYWRlcmxvZ28uaW5uZXJIVE1MPVg7cmV0dXJuIHUuaGVhZGVybG9nby5xdWVyeVNlbGVjdG9yQWxsKCdpbWcnKS5mb3JFYWNoKGZ1bmN0aW9uKEYpe0Yuc3R5bGUubWF4SGVpZ2h0PWdldENvbXB1dGVkU3R5bGUodS5oZWFkZXJiYXIpLmhlaWdodH0pLFkmJlkuY2FsbCh1LHUpLHV9LHUuc2V0SGVhZGVyUmVtb3ZlPVg9PntyZXR1cm4gdS5yZW1vdmVDaGlsZCh1LmhlYWRlciksdS5jb250ZW50LmNsYXNzTGlzdC5hZGQoJ2pzUGFuZWwtY29udGVudC1ub2hlYWRlcicpLFsnY2xvc2UnLCdtYXhpbWl6ZScsJ25vcm1hbGl6ZScsJ21pbmltaXplJywnc21hbGxpZnknLCdzbWFsbGlmeXJldiddLmZvckVhY2goWT0+e3Uuc2V0QXR0cmlidXRlKGBkYXRhLWJ0biR7WX1gLCdyZW1vdmVkJyl9KSxYJiZYLmNhbGwodSx1KSx1fSx1LnNldEhlYWRlclRpdGxlPShYLFkpPT57cmV0dXJuJ3N0cmluZyc9PXR5cGVvZiBYP3UuaGVhZGVydGl0bGUuaW5uZXJIVE1MPVg6J2Z1bmN0aW9uJz09dHlwZW9mIFg/KGpzUGFuZWwuZW1wdHlOb2RlKHUuaGVhZGVydGl0bGUpLHUuaGVhZGVydGl0bGUuaW5uZXJIVE1MPVgoKSk6KGpzUGFuZWwuZW1wdHlOb2RlKHUuaGVhZGVydGl0bGUpLHUuaGVhZGVydGl0bGUuYXBwZW5kKFgpKSxZJiZZLmNhbGwodSx1KSx1fSx1LnNldEljb25mb250PShYPSExLFk9dSxGKT0+e2lmKCExIT09WCl7bGV0IFYsXztpZignYm9vdHN0cmFwJz09PVh8fCdnbHlwaGljb24nPT09WClWPVsnZ2x5cGhpY29uIGdseXBoaWNvbi1yZW1vdmUnLCdnbHlwaGljb24gZ2x5cGhpY29uLWZ1bGxzY3JlZW4nLCdnbHlwaGljb24gZ2x5cGhpY29uLXJlc2l6ZS1mdWxsJywnZ2x5cGhpY29uIGdseXBoaWNvbi1taW51cycsJ2dseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi1kb3duJywnZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLXVwJ107ZWxzZSBpZignZmEnPT09WHx8J2Zhcic9PT1YfHwnZmFsJz09PVh8fCdmYXMnPT09WClWPVtgJHtYfSBmYS13aW5kb3ctY2xvc2VgLGAke1h9IGZhLXdpbmRvdy1tYXhpbWl6ZWAsYCR7WH0gZmEtd2luZG93LXJlc3RvcmVgLGAke1h9IGZhLXdpbmRvdy1taW5pbWl6ZWAsYCR7WH0gZmEtY2hldnJvbi1kb3duYCxgJHtYfSBmYS1jaGV2cm9uLXVwYF0sdS5jb250cm9sYmFyLnN0eWxlLnBhZGRpbmc9JzZweCAwIDNweCAwJztlbHNlIGlmKCdtYXRlcmlhbC1pY29ucyc9PT1YKVY9W1gsWCxYLFgsWCxYXSxfPVsnY2xvc2UnLCdmdWxsc2NyZWVuJywnZnVsbHNjcmVlbl9leGl0JywnY2FsbF9yZWNlaXZlZCcsJ2V4cGFuZF9tb3JlJywnZXhwYW5kX2xlc3MnXSx1LmNvbnRyb2xiYXIuc3R5bGUucGFkZGluZz0nNHB4IDAgNXB4IDAnO2Vsc2UgaWYoQXJyYXkuaXNBcnJheShYKSlWPVtgY3VzdG9tLWNvbnRyb2wtaWNvbiAke1hbNV19YCxgY3VzdG9tLWNvbnRyb2wtaWNvbiAke1hbNF19YCxgY3VzdG9tLWNvbnRyb2wtaWNvbiAke1hbM119YCxgY3VzdG9tLWNvbnRyb2wtaWNvbiAke1hbMl19YCxgY3VzdG9tLWNvbnRyb2wtaWNvbiAke1hbMV19YCxgY3VzdG9tLWNvbnRyb2wtaWNvbiAke1hbMF19YF07ZWxzZSByZXR1cm4gWTtZLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuJykuZm9yRWFjaChLPT57anNQYW5lbC5lbXB0eU5vZGUoSykuaW5uZXJIVE1MPSc8c3Bhbj48L3NwYW4+J30pLEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKFkucXVlcnlTZWxlY3RvckFsbCgnLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4gPiBzcGFuJykpLnJldmVyc2UoKS5mb3JFYWNoKChLLEcpPT57Sy5jbGFzc05hbWU9VltHXSwnbWF0ZXJpYWwtaWNvbnMnPT09WCYmKEsudGV4dENvbnRlbnQ9X1tHXSl9KX1yZXR1cm4gRiYmRi5jYWxsKFksWSksWX0sdS5zZXRSdGw9KCk9PntbdS5oZWFkZXIsdS5oZWFkZXJiYXIsdS50aXRsZWJhcix1LmNvbnRyb2xiYXIsdS5oZWFkZXJ0b29sYmFyLHUuZm9vdGVyXS5mb3JFYWNoKFg9PntYLmNsYXNzTGlzdC5hZGQoJ2pzUGFuZWwtcnRsJyl9KSxbdS5oZWFkZXJ0aXRsZSx1LmhlYWRlcnRvb2xiYXIsdS5jb250ZW50LHUuZm9vdGVyXS5mb3JFYWNoKFg9PntYLmRpcj0ncnRsJyxuLnJ0bC5sYW5nJiYoWC5sYW5nPW4ucnRsLmxhbmcpfSl9LHUuc2V0U2l6ZT0oKT0+e2lmKG4ucGFuZWxTaXplKXtjb25zdCBYPWpzUGFuZWwucE9zaXplKHUsbi5wYW5lbFNpemUpO3Uuc3R5bGUud2lkdGg9WC53aWR0aCx1LnN0eWxlLmhlaWdodD1YLmhlaWdodH1lbHNlIGlmKG4uY29udGVudFNpemUpe2NvbnN0IFg9anNQYW5lbC5wT3NpemUodSxuLmNvbnRlbnRTaXplKTt1LmNvbnRlbnQuc3R5bGUud2lkdGg9WC53aWR0aCx1LmNvbnRlbnQuc3R5bGUuaGVpZ2h0PVguaGVpZ2h0LHUuc3R5bGUud2lkdGg9WC53aWR0aCx1LmNvbnRlbnQuc3R5bGUud2lkdGg9JzEwMCUnfXJldHVybiB1fSx1LnNldFRoZW1lPShYPW4udGhlbWUsWSk9PntpZih1LmNsZWFyVGhlbWUoKSwnbm9uZSc9PT1YKXJldHVybiB1LnN0eWxlLmJhY2tncm91bmRDb2xvcj0nI2ZmZicsdTtjb25zdCBGPXUuZ2V0VGhlbWVEZXRhaWxzKFgpO3JldHVybiBGLmJzP3UuYXBwbHlCb290c3RyYXBUaGVtZShGKTotMT09PWpzUGFuZWwudGhlbWVzLmluZGV4T2YoRi5jb2xvcik/dS5hcHBseUFyYml0cmFyeVRoZW1lKEYpOnUuYXBwbHlCdWlsdEluVGhlbWUoRiksbi5ib3JkZXI/dS5hcHBseVRoZW1lQm9yZGVyKEYpOih1LnN0eWxlLmJvcmRlcldpZHRoPScnLHUuc3R5bGUuYm9yZGVyU3R5bGU9JycsdS5zdHlsZS5ib3JkZXJDb2xvcj0nJyksWSYmWS5jYWxsKHUsdSksdX0sdS5zbWFsbGlmeT1YPT57aWYoJ3NtYWxsaWZpZWQnPT09dS5zdGF0dXN8fCdzbWFsbGlmaWVkbWF4Jz09PXUuc3RhdHVzKXJldHVybiB1O2lmKG4ub25iZWZvcmVzbWFsbGlmeSYmMDxuLm9uYmVmb3Jlc21hbGxpZnkubGVuZ3RoJiYhanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHUsbi5vbmJlZm9yZXNtYWxsaWZ5KSlyZXR1cm4gdTtkb2N1bWVudC5kaXNwYXRjaEV2ZW50KEwpLCdub3JtYWxpemVkJz09PXUuc3RhdHVzJiZ1LnNhdmVDdXJyZW50RGltZW5zaW9ucygpLHUuc3R5bGUub3ZlcmZsb3c9J2hpZGRlbicsdS5zdHlsZS5oZWlnaHQ9d2luZG93LmdldENvbXB1dGVkU3R5bGUodS5oZWFkZXJiYXIpLmhlaWdodCwnbm9ybWFsaXplZCc9PT11LnN0YXR1cz8odS5zZXRDb250cm9scyhbJy5qc1BhbmVsLWJ0bi1ub3JtYWxpemUnLCcuanNQYW5lbC1idG4tc21hbGxpZnknXSksdS5zdGF0dXM9J3NtYWxsaWZpZWQnLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoayksZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChFKSxuLm9uc3RhdHVzY2hhbmdlJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3ModSxuLm9uc3RhdHVzY2hhbmdlLCdldmVyeScpKTonbWF4aW1pemVkJz09PXUuc3RhdHVzJiYodS5zZXRDb250cm9scyhbJy5qc1BhbmVsLWJ0bi1tYXhpbWl6ZScsJy5qc1BhbmVsLWJ0bi1zbWFsbGlmeSddKSx1LnN0YXR1cz0nc21hbGxpZmllZG1heCcsZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChBKSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KEUpLG4ub25zdGF0dXNjaGFuZ2UmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyh1LG4ub25zdGF0dXNjaGFuZ2UsJ2V2ZXJ5JykpO2xldCBZPXUucXVlcnlTZWxlY3RvckFsbCgnLmpzUGFuZWwtbWluaW1pemVkLWJveCcpO3JldHVybiBZW1kubGVuZ3RoLTFdLnN0eWxlLmRpc3BsYXk9J25vbmUnLFgmJlguY2FsbCh1LHUpLG4ub25zbWFsbGlmaWVkJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3ModSxuLm9uc21hbGxpZmllZCwnZXZlcnknKSx1fSx1LnVuc21hbGxpZnk9WD0+e2lmKCdzbWFsbGlmaWVkJz09PXUuc3RhdHVzfHwnc21hbGxpZmllZG1heCc9PT11LnN0YXR1cyl7aWYobi5vbmJlZm9yZXVuc21hbGxpZnkmJjA8bi5vbmJlZm9yZXVuc21hbGxpZnkubGVuZ3RoJiYhanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHUsbi5vbmJlZm9yZXVuc21hbGxpZnkpKXJldHVybiB1O2RvY3VtZW50LmRpc3BhdGNoRXZlbnQoVyksdS5zdHlsZS5vdmVyZmxvdz0ndmlzaWJsZScsanNQYW5lbC5mcm9udCh1KSwnc21hbGxpZmllZCc9PT11LnN0YXR1cz8odS5zdHlsZS5oZWlnaHQ9dS5jdXJyZW50RGF0YS5oZWlnaHQsdS5zZXRDb250cm9scyhbJy5qc1BhbmVsLWJ0bi1ub3JtYWxpemUnLCcuanNQYW5lbC1idG4tc21hbGxpZnlyZXYnXSksdS5zdGF0dXM9J25vcm1hbGl6ZWQnLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoQyksZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChFKSxuLm9uc3RhdHVzY2hhbmdlJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3ModSxuLm9uc3RhdHVzY2hhbmdlLCdldmVyeScpKTonc21hbGxpZmllZG1heCc9PT11LnN0YXR1cz91Lm1heGltaXplKCk6J21pbmltaXplZCc9PT11LnN0YXR1cyYmdS5ub3JtYWxpemUoKTtsZXQgWT11LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qc1BhbmVsLW1pbmltaXplZC1ib3gnKTtZW1kubGVuZ3RoLTFdLnN0eWxlLmRpc3BsYXk9J2ZsZXgnLFgmJlguY2FsbCh1LHUpLG4ub251bnNtYWxsaWZpZWQmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyh1LG4ub251bnNtYWxsaWZpZWQsJ2V2ZXJ5Jyl9cmV0dXJuIHV9LHUuaWQ9bi5pZCx1LmNsYXNzTGlzdC5hZGQoJ2pzUGFuZWwtJytuLnBhbmVsdHlwZSksJ3N0YW5kYXJkJz09PW4ucGFuZWx0eXBlJiYodS5zdHlsZS56SW5kZXg9dGhpcy56aS5uZXh0KCkpLG0uYXBwZW5kKHUpLHUuZnJvbnQoITEsITEpLHUuc2V0VGhlbWUobi50aGVtZSksbi5ib3hTaGFkb3cmJnUuY2xhc3NMaXN0LmFkZChganNQYW5lbC1kZXB0aC0ke24uYm94U2hhZG93fWApLCFuLmhlYWRlcil1LnNldEhlYWRlclJlbW92ZSgpO2Vsc2UgaWYobi5oZWFkZXJMb2dvJiZ1LnNldEhlYWRlckxvZ28obi5oZWFkZXJMb2dvKSx1LnNldEljb25mb250KG4uaWNvbmZvbnQpLHUuc2V0SGVhZGVyVGl0bGUobi5oZWFkZXJUaXRsZSksdS5zZXRIZWFkZXJDb250cm9scygpLCdhdXRvLXNob3ctaGlkZSc9PT1uLmhlYWRlcil7bGV0IFYsWD1uLnRoZW1lLnNwbGl0KCctJyksWT0nanNQYW5lbC1kZXB0aC0nK24uYm94U2hhZG93LEY9J2JnLSc7WFsxXSYmKEYrPVhbMV0pLFhbMl0mJihWPVhbMV0rJy1jb2xvci0nK1hbMl0pLHUuaGVhZGVyLnN0eWxlLm9wYWNpdHk9MCwoJ2Jvb3RzdHJhcCc9PT1YWzBdfHwnbWRiJz09PVhbMF0pJiYodGhpcy5yZW1DbGFzcyh1LEYpLCdtZGInPT09WFswXSYmdGhpcy5yZW1DbGFzcyh1LFYpKSx1LnN0eWxlLmJhY2tncm91bmRDb2xvcj0ndHJhbnNwYXJlbnQnLHRoaXMucmVtQ2xhc3ModSxZKSx0aGlzLnNldENsYXNzKHUuY29udGVudCxZKSx1LmhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJyxmdW5jdGlvbigpe3UuaGVhZGVyLnN0eWxlLm9wYWNpdHk9MSwoJ2Jvb3RzdHJhcCc9PT1YWzBdfHwnbWRiJz09PVhbMF0pJiYoanNQYW5lbC5zZXRDbGFzcyh1LEYpLCdtZGInPT09WFswXSYmanNQYW5lbC5zZXRDbGFzcyh1LFYpKSxqc1BhbmVsLnNldENsYXNzKHUsWSksanNQYW5lbC5yZW1DbGFzcyh1LmNvbnRlbnQsWSl9KSx1LmhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJyxmdW5jdGlvbigpe3UuaGVhZGVyLnN0eWxlLm9wYWNpdHk9MCwoJ2Jvb3RzdHJhcCc9PT1YWzBdfHwnbWRiJz09PVhbMF0pJiYoanNQYW5lbC5yZW1DbGFzcyh1LEYpLCdtZGInPT09WFswXSYmanNQYW5lbC5yZW1DbGFzcyh1LFYpKSxqc1BhbmVsLnJlbUNsYXNzKHUsWSksanNQYW5lbC5zZXRDbGFzcyh1LmNvbnRlbnQsWSl9KX1pZihuLmhlYWRlclRvb2xiYXImJnUuYWRkVG9vbGJhcih1LmhlYWRlcnRvb2xiYXIsbi5oZWFkZXJUb29sYmFyKSxuLmZvb3RlclRvb2xiYXImJnUuYWRkVG9vbGJhcih1LmZvb3RlcixuLmZvb3RlclRvb2xiYXIpLG4uY29udGVudCYmKCdmdW5jdGlvbic9PXR5cGVvZiBuLmNvbnRlbnQ/bi5jb250ZW50LmNhbGwodSx1KTonc3RyaW5nJz09dHlwZW9mIG4uY29udGVudD91LmNvbnRlbnQuaW5uZXJIVE1MPW4uY29udGVudDp1LmNvbnRlbnQuYXBwZW5kKG4uY29udGVudCkpLG4uY29udGVudEFqYXgmJnRoaXMuYWpheCh1LG4uY29udGVudEFqYXgpLG4uY29udGVudEZldGNoJiZ0aGlzLmZldGNoKHUpLG4uY29udGVudE92ZXJmbG93KXtsZXQgWD1uLmNvbnRlbnRPdmVyZmxvdy5zcGxpdCgnICcpOzE9PT1YLmxlbmd0aD91LmNvbnRlbnQuc3R5bGUub3ZlcmZsb3c9WFswXToyPT09WC5sZW5ndGgmJih1LmNvbnRlbnQuc3R5bGUub3ZlcmZsb3dYPVhbMF0sdS5jb250ZW50LnN0eWxlLm92ZXJmbG93WT1YWzFdKX1pZihuLnJ0bCYmdS5zZXRSdGwoKSx1LnNldFNpemUoKSx1LnN0YXR1cz0nbm9ybWFsaXplZCcsbi5wb3NpdGlvbnx8J2N1cnNvcichPT1uLnBvc2l0aW9uP3RoaXMucG9zaXRpb24odSxuLnBvc2l0aW9uKTp1LnN0eWxlLm9wYWNpdHk9MSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KEMpLHUuY2FsY1NpemVGYWN0b3JzKCksbi5hbmltYXRlSW4mJih1LmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsKCk9Pnt0aGlzLnJlbUNsYXNzKHUsbi5hbmltYXRlSW4pfSksdGhpcy5zZXRDbGFzcyh1LG4uYW5pbWF0ZUluKSksbi5zeW5jTWFyZ2lucyl7Y29uc3QgWD10aGlzLnBPY29udGFpbm1lbnQobi5tYXhpbWl6ZWRNYXJnaW4pO24uZHJhZ2l0JiYobi5kcmFnaXQuY29udGFpbm1lbnQ9WCxuLmRyYWdpdC5zbmFwJiYobi5kcmFnaXQuc25hcC5jb250YWlubWVudD0hMCkpLG4ucmVzaXplaXQmJihuLnJlc2l6ZWl0LmNvbnRhaW5tZW50PVgpfWlmKG4uZHJhZ2l0Pyh0aGlzLmRyYWdpdCh1LG4uZHJhZ2l0KSxkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdqc3BhbmVsZHJhZ3N0b3AnLFg9PntYLmRldGFpbD09PXUuaWQmJnUuY2FsY1NpemVGYWN0b3JzKCl9LCExKSk6dS50aXRsZWJhci5zdHlsZS5jdXJzb3I9J2RlZmF1bHQnLG4ucmVzaXplaXQpe3RoaXMucmVzaXplaXQodSxuLnJlc2l6ZWl0KTtsZXQgWDtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdqc3BhbmVscmVzaXplc3RhcnQnLFk9PntZLmRldGFpbD09PXUuaWQmJihYPXUuc3RhdHVzKX0sITEpLGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2pzcGFuZWxyZXNpemVzdG9wJyxZPT57WS5kZXRhaWw9PT11LmlkJiYoJ3NtYWxsaWZpZWQnPT09WHx8J3NtYWxsaWZpZWRtYXgnPT09WHx8J21heGltaXplZCc9PT1YKSYmcGFyc2VGbG9hdCh1LnN0eWxlLmhlaWdodCk+cGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh1LmhlYWRlcikuaGVpZ2h0KSYmKHUuc2V0Q29udHJvbHMoWycuanNQYW5lbC1idG4tbm9ybWFsaXplJywnLmpzUGFuZWwtYnRuLXNtYWxsaWZ5cmV2J10pLHUuc3RhdHVzPSdub3JtYWxpemVkJyxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KEMpLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoRSksbi5vbnN0YXR1c2NoYW5nZSYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHUsbi5vbnN0YXR1c2NoYW5nZSwnZXZlcnknKSx1LmNhbGNTaXplRmFjdG9ycygpKX0sITEpfWlmKHUuc2F2ZUN1cnJlbnREaW1lbnNpb25zKCksdS5zYXZlQ3VycmVudFBvc2l0aW9uKCksbi5zZXRTdGF0dXMpe2NvbnN0IFg9bi5zZXRTdGF0dXM7aWYoJ3NtYWxsaWZpZWRtYXgnPT09WCl1Lm1heGltaXplKCkuc21hbGxpZnkoKTtlbHNlIGlmKCdzbWFsbGlmaWVkJz09PVgpdS5zbWFsbGlmeSgpO2Vsc2V7Y29uc3QgWT1YLnN1YnN0cigwLFgubGVuZ3RoLTEpO3VbWV0oKX19cmV0dXJuIG4uYXV0b2Nsb3NlJiYoYz13aW5kb3cuc2V0VGltZW91dCgoKT0+e3UmJnUuY2xvc2UoKX0sbi5hdXRvY2xvc2UpKSx0aGlzLnBvaW50ZXJkb3duLmZvckVhY2goWD0+e3UuYWRkRXZlbnRMaXN0ZW5lcihYLFk9PntZLnRhcmdldC5jbG9zZXN0KCcuanNQYW5lbC1idG4tY2xvc2UnKXx8WS50YXJnZXQuY2xvc2VzdCgnLmpzUGFuZWwtYnRuLW1pbmltaXplJyl8fCdzdGFuZGFyZCchPT1uLnBhbmVsdHlwZXx8dS5mcm9udCgpfSwhMSl9KSxuLm9ud2luZG93cmVzaXplJiZ3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJyxYPT57aWYoWC50YXJnZXQ9PT13aW5kb3cpe2NvbnN0IFk9bi5vbndpbmRvd3Jlc2l6ZSxGPXUuc3RhdHVzLFY9d2luZG93LmdldENvbXB1dGVkU3R5bGUodS5wYXJlbnRFbGVtZW50KTsnbWF4aW1pemVkJz09PUYmJiEwPT09WT91Lm1heGltaXplKCk6KCdub3JtYWxpemVkJz09PUZ8fCdzbWFsbGlmaWVkJz09PUZ8fCdtYXhpbWl6ZWQnPT09RikmJignZnVuY3Rpb24nPT10eXBlb2YgWT9ZLmNhbGwodSxYLHUpOih1LnN0eWxlLmxlZnQ9KCgpPT57bGV0IF87cmV0dXJuIF89bi5jb250YWluZXI9PT1kb2N1bWVudC5ib2R5Pyhkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoLXBhcnNlRmxvYXQodS5zdHlsZS53aWR0aCkpKnUuaGY6KHBhcnNlRmxvYXQoVi53aWR0aCktcGFyc2VGbG9hdCh1LnN0eWxlLndpZHRoKSkqdS5oZiwwPj1fPzA6XysncHgnfSkoKSx1LnN0eWxlLnRvcD0oKCk9PntsZXQgXztyZXR1cm4gXz1uLmNvbnRhaW5lcj09PWRvY3VtZW50LmJvZHk/KHdpbmRvdy5pbm5lckhlaWdodC1wYXJzZUZsb2F0KHUuY3VycmVudERhdGEuaGVpZ2h0KSkqdS52ZjoocGFyc2VGbG9hdChWLmhlaWdodCktcGFyc2VGbG9hdCh1LmN1cnJlbnREYXRhLmhlaWdodCkpKnUudmYsMD49Xz8wOl8rJ3B4J30pKCkpKX19LCExKSx0aGlzLnBvaW50ZXJ1cC5mb3JFYWNoKFg9Pnt1LmFkZEV2ZW50TGlzdGVuZXIoWCwoKT0+e3UuY29udGVudC5zdHlsZS5wb2ludGVyRXZlbnRzPSdpbmhlcml0J30pfSksdGhpcy5nbG9iYWxDYWxsYmFja3MmJihBcnJheS5pc0FycmF5KHRoaXMuZ2xvYmFsQ2FsbGJhY2tzKT90aGlzLmdsb2JhbENhbGxiYWNrcy5mb3JFYWNoKFg9PntYLmNhbGwodSx1KX0pOnRoaXMuZ2xvYmFsQ2FsbGJhY2tzLmNhbGwodSx1KSksbi5jYWxsYmFjayYmKEFycmF5LmlzQXJyYXkobi5jYWxsYmFjayk/bi5jYWxsYmFjay5mb3JFYWNoKFg9PntYLmNhbGwodSx1KX0pOm4uY2FsbGJhY2suY2FsbCh1LHUpKSxvJiZvLmNhbGwodSx1KSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHkpLHV9fTsiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcbn07XG5cbnZhciBnZXRFbGVtZW50ID0gKGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbyA9IHt9O1xuXG5cdHJldHVybiBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBwYXNzaW5nIGZ1bmN0aW9uIGluIG9wdGlvbnMsIHRoZW4gdXNlIGl0IGZvciByZXNvbHZlIFwiaGVhZFwiIGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgLy8gVXNlZnVsIGZvciBTaGFkb3cgUm9vdCBzdHlsZSBpLmVcbiAgICAgICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAgICAgLy8gICBpbnNlcnRJbnRvOiBmdW5jdGlvbiAoKSB7IHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvb1wiKS5zaGFkb3dSb290IH1cbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHZhciBzdHlsZVRhcmdldCA9IGdldFRhcmdldC5jYWxsKHRoaXMsIHRhcmdldCk7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG5cdFx0XHRcdFx0Ly8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuXHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1t0YXJnZXRdXG5cdH07XG59KSgpO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09IFwiYm9vbGVhblwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuICAgICAgICBpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpIHtcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50byArIFwiIFwiICsgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpO1xuXHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIG5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJbU3R5bGUgTG9hZGVyXVxcblxcbiBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0JyAoJ29wdGlvbnMuaW5zZXJ0QXQnKSBmb3VuZC5cXG4gTXVzdCBiZSAndG9wJywgJ2JvdHRvbScsIG9yIE9iamVjdC5cXG4gKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyI2luc2VydGF0KVxcblwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0aWYob3B0aW9ucy5hdHRycy50eXBlID09PSB1bmRlZmluZWQpIHtcblx0XHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdH1cblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG4iLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcL3xcXHMqJCkvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcbiIsImltcG9ydCB7IEJ1dHRwbHVnRGV2aWNlLCBTaW5nbGVNb3RvclZpYnJhdGVDbWQsIEZsZXNobGlnaHRMYXVuY2hGVzEyQ21kIH0gZnJvbSBcIi4uL2luZGV4XCI7XG5pbXBvcnQgKiBhcyBNZXNzYWdlcyBmcm9tIFwiLi4vaW5kZXhcIjtcblxuZXhwb3J0IGNsYXNzIFRlc3REZXZpY2UgZXh0ZW5kcyBCdXR0cGx1Z0RldmljZSB7XG5cbiAgcHJpdmF0ZSBfY29ubmVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX2xpbmVhclNwZWVkOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9saW5lYXJQb3NpdGlvbjogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfdmlicmF0ZVNwZWVkOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9yb3RhdGVTcGVlZDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfcm90YXRlQ2xvY2t3aXNlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgIHNob3VsZFZpYnJhdGU6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgIHNob3VsZExpbmVhcjogYm9vbGVhbiA9IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgc2hvdWxkUm90YXRlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICBzdXBlcihgVGVzdCBEZXZpY2UgLSAke25hbWV9YCwgXCJUZXN0RGV2aWNlXCIgKyAoc2hvdWxkVmlicmF0ZSA/IFwiVmlicmF0ZVwiIDogXCJcIikgKyAoc2hvdWxkTGluZWFyID8gXCJMaW5lYXJcIiA6IFwiXCIpKTtcbiAgICB0aGlzLk1zZ0Z1bmNzLnNldChNZXNzYWdlcy5TdG9wRGV2aWNlQ21kLm5hbWUsIHRoaXMuSGFuZGxlU3RvcERldmljZUNtZCk7XG4gICAgaWYgKHNob3VsZFZpYnJhdGUpIHtcbiAgICAgIHRoaXMuTXNnRnVuY3Muc2V0KE1lc3NhZ2VzLlNpbmdsZU1vdG9yVmlicmF0ZUNtZC5uYW1lLCB0aGlzLkhhbmRsZVNpbmdsZU1vdG9yVmlicmF0ZUNtZCk7XG4gICAgICB0aGlzLk1zZ0Z1bmNzLnNldChNZXNzYWdlcy5WaWJyYXRlQ21kLm5hbWUsIHRoaXMuSGFuZGxlVmlicmF0ZUNtZCk7XG4gICAgfVxuICAgIGlmIChzaG91bGRMaW5lYXIpIHtcbiAgICAgIHRoaXMuTXNnRnVuY3Muc2V0KE1lc3NhZ2VzLkZsZXNobGlnaHRMYXVuY2hGVzEyQ21kLm5hbWUsIHRoaXMuSGFuZGxlRmxlc2hsaWdodExhdW5jaEZXMTJDbWQpO1xuICAgICAgdGhpcy5Nc2dGdW5jcy5zZXQoTWVzc2FnZXMuTGluZWFyQ21kLm5hbWUsIHRoaXMuSGFuZGxlTGluZWFyQ21kKTtcbiAgICB9XG4gICAgaWYgKHNob3VsZFJvdGF0ZSkge1xuICAgICAgdGhpcy5Nc2dGdW5jcy5zZXQoTWVzc2FnZXMuUm90YXRlQ21kLm5hbWUsIHRoaXMuSGFuZGxlUm90YXRlQ21kKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IENvbm5lY3RlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29ubmVjdGVkO1xuICB9XG5cbiAgcHVibGljIHNldCBDb25uZWN0ZWQoY29ubmVjdGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fY29ubmVjdGVkID0gY29ubmVjdGVkO1xuICB9XG5cbiAgcHVibGljIGdldCBNZXNzYWdlU3BlY2lmaWNhdGlvbnMoKTogb2JqZWN0IHtcbiAgICBpZiAodGhpcy5Nc2dGdW5jcy5oYXMoTWVzc2FnZXMuVmlicmF0ZUNtZC5uYW1lKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgVmlicmF0ZUNtZDogeyBGZWF0dXJlQ291bnQ6IDIgfSxcbiAgICAgICAgU2luZ2xlTW90b3JWaWJyYXRlQ21kOiB7fSxcbiAgICAgICAgU3RvcERldmljZUNtZDoge30sXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodGhpcy5Nc2dGdW5jcy5oYXMoTWVzc2FnZXMuTGluZWFyQ21kLm5hbWUpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBMaW5lYXJDbWQ6IHsgRmVhdHVyZUNvdW50OiAxIH0sXG4gICAgICAgIEZsZXNobGlnaHRMYXVuY2hGVzEyQ21kOiB7fSxcbiAgICAgICAgU3RvcERldmljZUNtZDoge30sXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodGhpcy5Nc2dGdW5jcy5oYXMoTWVzc2FnZXMuUm90YXRlQ21kLm5hbWUpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBSb3RhdGVDbWQ6IHsgRmVhdHVyZUNvdW50OiAxIH0sXG4gICAgICAgIFN0b3BEZXZpY2VDbWQ6IHt9LFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgcHVibGljIERpc2Nvbm5lY3QoKSB7XG4gICAgdGhpcy5fY29ubmVjdGVkID0gZmFsc2U7XG4gICAgdGhpcy5lbWl0KFwiZGV2aWNlcmVtb3ZlZFwiLCB0aGlzKTtcbiAgfVxuXG4gIHByaXZhdGUgSGFuZGxlU3RvcERldmljZUNtZCA9IGFzeW5jIChhTXNnOiBNZXNzYWdlcy5TdG9wRGV2aWNlQ21kKTogUHJvbWlzZTxNZXNzYWdlcy5CdXR0cGx1Z01lc3NhZ2U+ID0+IHtcbiAgICBpZiAodGhpcy5Nc2dGdW5jcy5oYXMoTWVzc2FnZXMuVmlicmF0ZUNtZC5uYW1lKSkge1xuICAgICAgdGhpcy5lbWl0KFwidmlicmF0ZVwiLCAwKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuTXNnRnVuY3MuaGFzKE1lc3NhZ2VzLkxpbmVhckNtZC5uYW1lKSkge1xuICAgICAgdGhpcy5lbWl0KFwibGluZWFyXCIsIHsgcG9zaXRpb246IHRoaXMuX2xpbmVhclBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVkOiB0aGlzLl9saW5lYXJTcGVlZH0pO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBNZXNzYWdlcy5PayhhTXNnLklkKSk7XG4gIH1cblxuICBwcml2YXRlIEhhbmRsZVNpbmdsZU1vdG9yVmlicmF0ZUNtZCA9XG4gICAgYXN5bmMgKGFNc2c6IE1lc3NhZ2VzLlNpbmdsZU1vdG9yVmlicmF0ZUNtZCk6IFByb21pc2U8TWVzc2FnZXMuQnV0dHBsdWdNZXNzYWdlPiA9PiB7XG4gICAgICB0aGlzLl92aWJyYXRlU3BlZWQgPSBhTXNnLlNwZWVkO1xuICAgICAgdGhpcy5lbWl0KFwidmlicmF0ZVwiLCBhTXNnLlNwZWVkKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IE1lc3NhZ2VzLk9rKGFNc2cuSWQpKTtcbiAgICB9XG5cbiAgcHJpdmF0ZSBIYW5kbGVWaWJyYXRlQ21kID1cbiAgICBhc3luYyAoYU1zZzogTWVzc2FnZXMuVmlicmF0ZUNtZCk6IFByb21pc2U8TWVzc2FnZXMuQnV0dHBsdWdNZXNzYWdlPiA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5IYW5kbGVTaW5nbGVNb3RvclZpYnJhdGVDbWQobmV3IFNpbmdsZU1vdG9yVmlicmF0ZUNtZChhTXNnLlNwZWVkc1swXS5TcGVlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFNc2cuRGV2aWNlSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhTXNnLklkKSk7XG4gICAgfVxuXG4gIHByaXZhdGUgSGFuZGxlUm90YXRlQ21kID1cbiAgICBhc3luYyAoYU1zZzogTWVzc2FnZXMuUm90YXRlQ21kKTogUHJvbWlzZTxNZXNzYWdlcy5CdXR0cGx1Z01lc3NhZ2U+ID0+IHtcbiAgICAgIHRoaXMuX3JvdGF0ZVNwZWVkID0gYU1zZy5Sb3RhdGlvbnNbMF0uU3BlZWQ7XG4gICAgICB0aGlzLl9yb3RhdGVDbG9ja3dpc2UgPSBhTXNnLlJvdGF0aW9uc1swXS5DbG9ja3dpc2U7XG4gICAgICB0aGlzLmVtaXQoXCJ2aWJyYXRlXCIsIHsgc3BlZWQ6IHRoaXMuX3JvdGF0ZVNwZWVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9ja3dpc2U6IHRoaXMuX3JvdGF0ZUNsb2Nrd2lzZSB9KTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IE1lc3NhZ2VzLk9rKGFNc2cuSWQpKTtcbiAgICB9XG5cbiAgcHJpdmF0ZSBIYW5kbGVGbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZCA9XG4gICAgYXN5bmMgKGFNc2c6IE1lc3NhZ2VzLkZsZXNobGlnaHRMYXVuY2hGVzEyQ21kKTogUHJvbWlzZTxNZXNzYWdlcy5CdXR0cGx1Z01lc3NhZ2U+ID0+IHtcbiAgICAgIHRoaXMuX2xpbmVhclBvc2l0aW9uID0gYU1zZy5Qb3NpdGlvbjtcbiAgICAgIHRoaXMuX2xpbmVhclNwZWVkID0gYU1zZy5TcGVlZDtcbiAgICAgIHRoaXMuZW1pdChcImxpbmVhclwiLCB7IHBvc2l0aW9uOiB0aGlzLl9saW5lYXJQb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogdGhpcy5fbGluZWFyU3BlZWQgfSk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBNZXNzYWdlcy5PayhhTXNnLklkKSk7XG4gICAgfVxuXG4gIHByaXZhdGUgSGFuZGxlTGluZWFyQ21kID1cbiAgICBhc3luYyAoYU1zZzogTWVzc2FnZXMuTGluZWFyQ21kKTogUHJvbWlzZTxNZXNzYWdlcy5CdXR0cGx1Z01lc3NhZ2U+ID0+IHtcbiAgICAgIGlmIChhTXNnLlZlY3RvcnMubGVuZ3RoICE9PSAxKSB7XG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZXMuRXJyb3IoXCJMaW5lYXJDbWQgcmVxdWlyZXMgMSB2ZWN0b3IgZm9yIHRoaXMgZGV2aWNlLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1lc3NhZ2VzLkVycm9yQ2xhc3MuRVJST1JfREVWSUNFLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFNc2cuSWQpO1xuICAgICAgfVxuICAgICAgLy8gTW92ZSBiZXR3ZWVuIDUvOTUsIG90aGVyd2lzZSB3ZSdsbCBhbGxvdyB0aGUgZGV2aWNlIHRvIHNtYWNrIGludG8gaGFyZFxuICAgICAgLy8gc3RvcHMgYmVjYXVzZSBvZiBicmFpbmRlYWQgZmlybXdhcmUuXG4gICAgICBjb25zdCByYW5nZTogbnVtYmVyID0gOTA7XG4gICAgICBjb25zdCB2ZWN0b3IgPSBhTXNnLlZlY3RvcnNbMF07XG4gICAgICBjb25zdCBjdXJyZW50UG9zaXRpb24gPSB2ZWN0b3IuUG9zaXRpb24gKiAxMDA7XG4gICAgICBjb25zdCBwb3NpdGlvbkRlbHRhOiBudW1iZXIgPSBNYXRoLmFicyhjdXJyZW50UG9zaXRpb24gLSB0aGlzLl9saW5lYXJQb3NpdGlvbik7XG4gICAgICBsZXQgc3BlZWQ6IG51bWJlciA9IE1hdGguZmxvb3IoMjUwMDAgKiBNYXRoLnBvdygoKHZlY3Rvci5EdXJhdGlvbiAqIDkwKSAvIHBvc2l0aW9uRGVsdGEpLCAtMS4wNSkpO1xuXG4gICAgICAvLyBDbGFtcCBzcGVlZCBvbiAwIDw9IHggPD0gOTUgc28gd2UgZG9uJ3QgYnJlYWsgdGhlIGxhdW5jaC5cbiAgICAgIHNwZWVkID0gTWF0aC5taW4oTWF0aC5tYXgoc3BlZWQsIDApLCA5NSk7XG5cbiAgICAgIGNvbnN0IHBvc2l0aW9uR29hbCA9IE1hdGguZmxvb3IoKChjdXJyZW50UG9zaXRpb24gLyA5OSkgKiByYW5nZSkgKyAoKDk5IC0gcmFuZ2UpIC8gMikpO1xuICAgICAgLy8gV2UnbGwgc2V0IHRoaXMuX2xhc3RQb3NpdGlvbiBpbiBGbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZCwgc2luY2VcbiAgICAgIC8vIGV2ZXJ5dGhpbmcga2luZGEgZnVubmVscyB0byB0aGF0LlxuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuSGFuZGxlRmxlc2hsaWdodExhdW5jaEZXMTJDbWQobmV3IE1lc3NhZ2VzLkZsZXNobGlnaHRMYXVuY2hGVzEyQ21kKHNwZWVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uR29hbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhTXNnLkRldmljZUluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFNc2cuSWQpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiZXZlbnRzXCI7XG5pbXBvcnQgeyBJRGV2aWNlU3VidHlwZU1hbmFnZXIgfSBmcm9tIFwiLi4vaW5kZXhcIjtcbmltcG9ydCB7IFRlc3REZXZpY2UgfSBmcm9tIFwiLi9UZXN0RGV2aWNlXCI7XG5pbXBvcnQgeyBCdXR0cGx1Z0xvZ2dlciB9IGZyb20gXCIuLi9pbmRleFwiO1xuXG5leHBvcnQgY2xhc3MgVGVzdERldmljZU1hbmFnZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIgaW1wbGVtZW50cyBJRGV2aWNlU3VidHlwZU1hbmFnZXIge1xuXG4gIHByaXZhdGUgX2lzU2Nhbm5pbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfdGVzdFZpYnJhdGlvbkRldmljZSA9IG5ldyBUZXN0RGV2aWNlKFwiVGVzdCBWaWJyYXRpb24gRGV2aWNlXCIsIHRydWUsIGZhbHNlLCBmYWxzZSk7XG4gIHByaXZhdGUgX3Rlc3RMaW5lYXJEZXZpY2UgPSBuZXcgVGVzdERldmljZShcIlRlc3QgTGluZWFyIERldmljZVwiLCBmYWxzZSwgdHJ1ZSwgZmFsc2UpO1xuICBwcml2YXRlIF90ZXN0Um90YXRpb25EZXZpY2UgPSBuZXcgVGVzdERldmljZShcIlRlc3QgUm90YXRpb24gRGV2aWNlXCIsIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwdWJsaWMgQ29ubmVjdFZpYnJhdGlvbkRldmljZSgpIHtcbiAgICBCdXR0cGx1Z0xvZ2dlci5Mb2dnZXIuRGVidWcoXCJUZXN0RGV2aWNlTWFuYWdlcjogQ29ubmVjdGluZyBWaWJyYXRpb24gRGV2aWNlXCIpO1xuICAgIHRoaXMuX3Rlc3RWaWJyYXRpb25EZXZpY2UuQ29ubmVjdGVkID0gdHJ1ZTtcbiAgICB0aGlzLmVtaXQoXCJkZXZpY2VhZGRlZFwiLCB0aGlzLl90ZXN0VmlicmF0aW9uRGV2aWNlKTtcbiAgfVxuXG4gIHB1YmxpYyBDb25uZWN0TGluZWFyRGV2aWNlKCkge1xuICAgIEJ1dHRwbHVnTG9nZ2VyLkxvZ2dlci5EZWJ1ZyhcIlRlc3REZXZpY2VNYW5hZ2VyOiBDb25uZWN0aW5nIExpbmVhciBEZXZpY2VcIik7XG4gICAgdGhpcy5fdGVzdExpbmVhckRldmljZS5Db25uZWN0ZWQgPSB0cnVlO1xuICAgIHRoaXMuZW1pdChcImRldmljZWFkZGVkXCIsIHRoaXMuX3Rlc3RMaW5lYXJEZXZpY2UpO1xuICB9XG5cbiAgcHVibGljIENvbm5lY3RSb3RhdGlvbkRldmljZSgpIHtcbiAgICBCdXR0cGx1Z0xvZ2dlci5Mb2dnZXIuRGVidWcoXCJUZXN0RGV2aWNlTWFuYWdlcjogQ29ubmVjdGluZyBSb3RhdGlvbiBEZXZpY2VcIik7XG4gICAgdGhpcy5fdGVzdFJvdGF0aW9uRGV2aWNlLkNvbm5lY3RlZCA9IHRydWU7XG4gICAgdGhpcy5lbWl0KFwiZGV2aWNlYWRkZWRcIiwgdGhpcy5fdGVzdFJvdGF0aW9uRGV2aWNlKTtcbiAgfVxuXG4gIHB1YmxpYyBTdGFydFNjYW5uaW5nKCk6IHZvaWQge1xuICAgIEJ1dHRwbHVnTG9nZ2VyLkxvZ2dlci5EZWJ1ZyhcIlRlc3REZXZpY2VNYW5hZ2VyOiBTdGFydGluZyBTY2FuXCIpO1xuICAgIHRoaXMuX2lzU2Nhbm5pbmcgPSB0cnVlO1xuICAgIC8vIEFsd2F5cyBlbWl0IGRldmljZXMuIElmIHRoZXkncmUgZHVwbGljYXRlcywgdGhlIGRldmljZSBtYW5hZ2VyIHdpbGwgd2VlZFxuICAgIC8vIHRoZW0gb3V0LlxuICAgIHNldFRpbWVvdXQoKCkgPT4gIHtcbiAgICAgIHRoaXMuQ29ubmVjdFZpYnJhdGlvbkRldmljZSgpO1xuICAgICAgdGhpcy5Db25uZWN0TGluZWFyRGV2aWNlKCk7XG4gICAgICB0aGlzLkNvbm5lY3RSb3RhdGlvbkRldmljZSgpO1xuICAgIH0sIDUwKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuU3RvcFNjYW5uaW5nKCksIDEwMCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IFZpYnJhdGlvbkRldmljZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdGVzdFZpYnJhdGlvbkRldmljZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTGluZWFyRGV2aWNlKCkge1xuICAgIHJldHVybiB0aGlzLl90ZXN0TGluZWFyRGV2aWNlO1xuICB9XG5cbiAgcHVibGljIGdldCBSb3RhdGlvbkRldmljZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdGVzdFJvdGF0aW9uRGV2aWNlO1xuICB9XG5cbiAgcHVibGljIFN0b3BTY2FubmluZygpOiB2b2lkIHtcbiAgICBCdXR0cGx1Z0xvZ2dlci5Mb2dnZXIuRGVidWcoXCJUZXN0RGV2aWNlTWFuYWdlcjogU3RvcHBpbmcgU2NhblwiKTtcbiAgICB0aGlzLl9pc1NjYW5uaW5nID0gZmFsc2U7XG4gICAgdGhpcy5lbWl0KFwic2Nhbm5pbmdmaW5pc2hlZFwiKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgSXNTY2FubmluZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNTY2FubmluZztcbiAgfVxufVxuIiwiaW1wb3J0IHsgQnV0dHBsdWdDbGllbnQsIEJ1dHRwbHVnRW1iZWRkZWRTZXJ2ZXJDb25uZWN0b3IsIEJ1dHRwbHVnU2VydmVyIH0gZnJvbSBcIi4uL2luZGV4XCI7XG5pbXBvcnQgeyBUZXN0RGV2aWNlTWFuYWdlciB9IGZyb20gXCIuL1Rlc3REZXZpY2VNYW5hZ2VyXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBDcmVhdGVEZXZUb29sc0NsaWVudCgpOiBQcm9taXNlPEJ1dHRwbHVnQ2xpZW50PiB7XG4gIGNvbnN0IGNsaWVudCA9IG5ldyBCdXR0cGx1Z0NsaWVudChcIlRlc3QgQ2xpZW50XCIpO1xuICBjb25zdCBzZXJ2ZXIgPSBuZXcgQnV0dHBsdWdTZXJ2ZXIoXCJUZXN0IFNlcnZlclwiKTtcbiAgc2VydmVyLkNsZWFyRGV2aWNlTWFuYWdlcnMoKTtcbiAgc2VydmVyLkFkZERldmljZU1hbmFnZXIobmV3IFRlc3REZXZpY2VNYW5hZ2VyKCkpO1xuICBjb25zdCBsb2NhbENvbm5lY3RvciA9IG5ldyBCdXR0cGx1Z0VtYmVkZGVkU2VydmVyQ29ubmVjdG9yKCk7XG4gIGxvY2FsQ29ubmVjdG9yLlNlcnZlciA9IHNlcnZlcjtcbiAgYXdhaXQgY2xpZW50LkNvbm5lY3QobG9jYWxDb25uZWN0b3IpO1xuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNsaWVudCk7XG59XG4iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9Mb2dQYW5lbC5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vTG9nUGFuZWwuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9Mb2dQYW5lbC5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBpZD1cXFwiYnV0dHBsdWdkZXZ0b29sc2xvZ3BhbmVsXFxcIj5cXG4gIDx0ZXh0YXJlYSBpZD1cXFwiYnV0dHBsdWdkZXZ0b29sc2xvZ3RleHRhcmVhXFxcIiByZWFkb25seT48L3RleHRhcmVhPlxcbiAgPGRpdiBpZD1cXFwiYnV0dHBsdWdkZXZ0b29sc2xvZ2xldmVsXFxcIj5cXG4gICAgPGxhYmVsPlBhbmVsIExvZyBMZXZlbDo8L2xhYmVsPlxcbiAgICA8c2VsZWN0IGlkPVxcXCJidXR0cGx1Z2RldnRvb2xzbG9nbGV2ZWxwYW5lbHNlbGVjdFxcXCI+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiT2ZmXFxcIj5PZmY8L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJGYXRhbFxcXCI+RmF0YWw8L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJFcnJvclxcXCI+RXJyb3I8L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJXYXJuXFxcIj5XYXJuPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiSW5mb1xcXCI+SW5mbzwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkRlYnVnXFxcIiBzZWxlY3RlZD5EZWJ1Zzwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIlRyYWNlXFxcIj5UcmFjZTwvb3B0aW9uPlxcbiAgICA8L3NlbGVjdD5cXG4gICAgPGxhYmVsPkNvbnNvbGUgTG9nIExldmVsOjwvbGFiZWw+XFxuICAgIDxzZWxlY3QgaWQ9XFxcImJ1dHRwbHVnZGV2dG9vbHNsb2dsZXZlbGNvbnNvbGVzZWxlY3RcXFwiPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIk9mZlxcXCIgc2VsZWN0ZWQ+T2ZmPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiRmF0YWxcXFwiPkZhdGFsPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiRXJyb3JcXFwiPkVycm9yPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiV2FyblxcXCI+V2Fybjwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkluZm9cXFwiPkluZm88L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJEZWJ1Z1xcXCI+RGVidWc8L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJUcmFjZVxcXCI+VHJhY2U8L29wdGlvbj5cXG4gICAgPC9zZWxlY3Q+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG5cIjsiLCJpbXBvcnQgeyBCdXR0cGx1Z0xvZ2dlciwgTG9nTWVzc2FnZSwgQnV0dHBsdWdMb2dMZXZlbCB9IGZyb20gXCIuLi8uLi9pbmRleFwiO1xuY29uc3QganNQYW5lbCA9IHJlcXVpcmUoXCJqc3BhbmVsNFwiKTtcbnJlcXVpcmUoXCJqc3BhbmVsNC9kaXN0L2pzcGFuZWwuY3NzXCIpO1xuY29uc3QgbG9nUGFuZWxIVE1MID0gcmVxdWlyZShcIi4vTG9nUGFuZWwuaHRtbFwiKS50b1N0cmluZygpO1xucmVxdWlyZShcIi4vTG9nUGFuZWwuY3NzXCIpO1xuXG5leHBvcnQgY2xhc3MgTG9nUGFuZWwge1xuXG4gIHB1YmxpYyBzdGF0aWMgU2hvd0xvZ1BhbmVsKCkge1xuICAgIGpzUGFuZWwuanNQYW5lbC5jcmVhdGUoe1xuICAgICAgaWQ6ICgpID0+IFwiYnV0dHBsdWctbG9nZ2VyLXBhbmVsXCIsXG4gICAgICB0aGVtZTogICAgICAgXCJwcmltYXJ5XCIsXG4gICAgICBoZWFkZXJUaXRsZTogXCJCdXR0cGx1ZyBMb2dcIixcbiAgICAgIHBvc2l0aW9uOiAgICBcImNlbnRlci10b3AgMCA4MFwiLFxuICAgICAgY29udGVudFNpemU6IFwiNjUwIDI1MFwiLFxuICAgICAgY2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5pbm5lckhUTUwgPSBsb2dQYW5lbEhUTUw7XG4gICAgICAgIExvZ1BhbmVsLl9wYW5lbCA9IG5ldyBMb2dQYW5lbCgpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIF9wYW5lbDogTG9nUGFuZWwgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBsb2dUZXh0QXJlYTogSFRNTFRleHRBcmVhRWxlbWVudDtcbiAgcHJpdmF0ZSBwYW5lbExldmVsU2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudDtcbiAgcHJpdmF0ZSBjb25zb2xlTGV2ZWxTZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubG9nVGV4dEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1dHRwbHVnZGV2dG9vbHNsb2d0ZXh0YXJlYVwiKSEgYXMgSFRNTFRleHRBcmVhRWxlbWVudDtcbiAgICB0aGlzLnBhbmVsTGV2ZWxTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1dHRwbHVnZGV2dG9vbHNsb2dsZXZlbHBhbmVsc2VsZWN0XCIpISBhcyBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICB0aGlzLmNvbnNvbGVMZXZlbFNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV0dHBsdWdkZXZ0b29sc2xvZ2xldmVsY29uc29sZXNlbGVjdFwiKSEgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgY29uc3QgbG9nID0gQnV0dHBsdWdMb2dnZXIuTG9nZ2VyO1xuICAgIGxvZy5hZGRMaXN0ZW5lcihcImxvZ1wiLCAobXNnKSA9PiB7XG4gICAgICB0aGlzLmFkZExvZ01lc3NhZ2UobXNnKTtcbiAgICB9KTtcbiAgICB0aGlzLnBhbmVsTGV2ZWxTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICBsb2cuTWF4aW11bUV2ZW50TG9nTGV2ZWwgPSBCdXR0cGx1Z0xvZ0xldmVsW3RoaXMucGFuZWxMZXZlbFNlbGVjdC52YWx1ZV07XG4gICAgfSk7XG4gICAgdGhpcy5jb25zb2xlTGV2ZWxTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICBsb2cuTWF4aW11bUNvbnNvbGVMb2dMZXZlbCA9IEJ1dHRwbHVnTG9nTGV2ZWxbdGhpcy5jb25zb2xlTGV2ZWxTZWxlY3QudmFsdWVdO1xuICAgIH0pO1xuICAgIGxvZy5NYXhpbXVtRXZlbnRMb2dMZXZlbCA9IEJ1dHRwbHVnTG9nTGV2ZWwuRGVidWc7XG4gICAgbG9nLkRlYnVnKFwiTG9nUGFuZWw6IERldlRvb2xzIExvZyBwYW5lbCBlbmFibGVkLlwiKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkTG9nTWVzc2FnZShtc2c6IExvZ01lc3NhZ2UpIHtcbiAgICB0aGlzLmxvZ1RleHRBcmVhLnZhbHVlID0gdGhpcy5sb2dUZXh0QXJlYS52YWx1ZSArIFwiXFxuXCIgKyBtc2cuRm9ybWF0dGVkTWVzc2FnZTtcbiAgfVxuXG59XG4iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vVGVzdERldmljZU1hbmFnZXJQYW5lbC5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGJ1dHRwbHVnLWRldnRvb2xzLW1haW4+XFxuICA8aW5wdXQgaWQ9XFxcInRhYjFcXFwiIHR5cGU9XFxcInJhZGlvXFxcIiBuYW1lPVxcXCJ0YWJzXFxcIiBjaGVja2VkPlxcbiAgPGxhYmVsIGZvcj1cXFwidGFiMVxcXCI+VGVzdCBEZXZpY2VzPC9sYWJlbD5cXG4gIDxzZWN0aW9uIGlkPVxcXCJjb250ZW50MVxcXCI+XFxuICAgIDxkaXYgaWQ9XFxcInNpbXVsYXRvclxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwidmlicmF0b3Itc2ltdWxhdG9yLWNvbXBvbmVudFxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ2aWJyYXRvclxcXCI+XFxuICAgICAgICAgIDxpbWcgc3JjPVxcXCJcIiArIHJlcXVpcmUoXCIuL2h1c2gucG5nXCIpICsgXCJcXFwiXFxuICAgICAgICAgICAgICAgaWQ9XFxcInZpYnJhdG9yLWltYWdlXFxcIj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBpZD1cXFwidmlicmF0b3ItaW5mb1xcXCI+XFxuICAgICAgICAgIDxiPlNwZWVkOjwvYj4gPHNwYW4gaWQ9XFxcInZpYnJhdGlvbnNwZWVkXFxcIj4wPC9zcGFuPjxici8+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcInZpYnJhdGVkaXNjb25uZWN0XFxcIj5EaXNjb25uZWN0PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJzaW11bGF0b3ItZGl2aWRlclxcXCI+PC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiZmxlc2hsaWdodC1zaW1cXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiYy1mbGVzaGxpZ2h0XFxcIj5cXG4gICAgICAgICAgPGRpdj5cXG4gICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCIgKyByZXF1aXJlKFwiLi9ydWxlci5wbmdcIikgKyBcIlxcXCI+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8ZGl2PlxcbiAgICAgICAgICAgIDxpbWcgc3JjPVxcXCJcIiArIHJlcXVpcmUoXCIuL2ZsZXNobGlnaHQucG5nXCIpICsgXCJcXFwiXFxuICAgICAgICAgICAgICAgICBjbGFzcz1cXFwiby1mbGVzaGxpZ2h0XFxcIlxcbiAgICAgICAgICAgICAgICAgaWQ9XFxcImZsZXNobGlnaHQtaW1hZ2VcXFwiPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdj5cXG4gICAgICAgICAgPGI+U3BlZWQ6PC9iPiA8c3BhbiBpZD1cXFwibGluZWFyc3BlZWRcXFwiPjA8L3NwYW4+PGJyLz5cXG4gICAgICAgICAgPGI+UG9zaXRpb246PC9iPiA8c3BhbiBpZD1cXFwibGluZWFycG9zaXRpb25cXFwiPjA8L3NwYW4+PGJyLz5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwibGluZWFyZGlzY29ubmVjdFxcXCI+RGlzY29ubmVjdDwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9zZWN0aW9uPlxcbjwvYnV0dHBsdWctZGV2dG9vbHMtbWFpbj5cXG5cIjsiLCJpbXBvcnQgeyBCdXR0cGx1Z1NlcnZlciwgQnV0dHBsdWdMb2dnZXIgfSBmcm9tIFwiLi4vLi4vaW5kZXhcIjtcbmltcG9ydCB7IFRlc3REZXZpY2VNYW5hZ2VyIH0gZnJvbSBcIi4uL1Rlc3REZXZpY2VNYW5hZ2VyXCI7XG5pbXBvcnQgKiBhcyBUV0VFTiBmcm9tIFwiQHR3ZWVuanMvdHdlZW4uanNcIjtcblxuY29uc3QganNQYW5lbCA9IHJlcXVpcmUoXCJqc3BhbmVsNFwiKTtcbnJlcXVpcmUoXCJqc3BhbmVsNC9kaXN0L2pzcGFuZWwuY3NzXCIpO1xuY29uc3QgdGVzdFBhbmVsSFRNTCA9IHJlcXVpcmUoXCIuL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwuaHRtbFwiKS50b1N0cmluZygpO1xucmVxdWlyZShcIi4vVGVzdERldmljZU1hbmFnZXJQYW5lbC5jc3NcIik7XG5cbmV4cG9ydCBjbGFzcyBUZXN0RGV2aWNlTWFuYWdlclBhbmVsIHtcbiAgcHVibGljIHN0YXRpYyBTaG93VGVzdERldmljZU1hbmFnZXJQYW5lbChidXR0cGx1Z1NlcnZlcjogQnV0dHBsdWdTZXJ2ZXIpIHtcbiAgICBsZXQgdGRtOiBUZXN0RGV2aWNlTWFuYWdlciB8IG51bGwgPSBudWxsO1xuICAgIGZvciAoY29uc3QgbWdyIG9mIGJ1dHRwbHVnU2VydmVyLkRldmljZU1hbmFnZXJzKSB7XG4gICAgICBpZiAobWdyLmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiVGVzdERldmljZU1hbmFnZXJcIikge1xuICAgICAgICB0ZG0gPSAobWdyIGFzIFRlc3REZXZpY2VNYW5hZ2VyKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0ZG0gPT09IG51bGwpIHtcbiAgICAgIEJ1dHRwbHVnTG9nZ2VyLkxvZ2dlci5FcnJvcihcIlRlc3REZXZpY2VNYW5hZ2VyUGFuZWw6IENhbm5vdCBnZXQgdGVzdCBkZXZpY2UgbWFuYWdlciBmcm9tIHNlcnZlci5cIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZ2V0IHRlc3QgZGV2aWNlIG1hbmFnZXIgZnJvbSBzZXJ2ZXIuXCIpO1xuICAgIH1cbiAgICBqc1BhbmVsLmpzUGFuZWwuY3JlYXRlKHtcbiAgICAgIGlkOiAoKSA9PiBcImJ1dHRwbHVnLXRlc3QtZGV2aWNlLW1hbmFnZXItcGFuZWxcIixcbiAgICAgIHRoZW1lOiAgICAgICBcInByaW1hcnlcIixcbiAgICAgIGhlYWRlclRpdGxlOiBcIlRlc3QgRGV2aWNlIE1hbmFnZXJcIixcbiAgICAgIHBvc2l0aW9uOiAgICBcImNlbnRlci10b3AgMCA4MFwiLFxuICAgICAgY29udGVudFNpemU6IFwiNDAwIDI1MFwiLFxuICAgICAgY2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5pbm5lckhUTUwgPSB0ZXN0UGFuZWxIVE1MO1xuICAgICAgICBUZXN0RGV2aWNlTWFuYWdlclBhbmVsLl9wYW5lbCA9IG5ldyBUZXN0RGV2aWNlTWFuYWdlclBhbmVsKHRkbSEpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzdGF0aWMgX3BhbmVsOiBUZXN0RGV2aWNlTWFuYWdlclBhbmVsO1xuICBwcml2YXRlIHZpYnJhdG9yVHdlZW46IFRXRUVOLlR3ZWVuIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgbGF1bmNoVHdlZW46IFRXRUVOLlR3ZWVuIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX3Rlc3RNYW5hZ2VyOiBUZXN0RGV2aWNlTWFuYWdlcjtcbiAgcHJpdmF0ZSBmbGVzaGxpZ2h0RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgdmlicmF0b3JFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBjdXJyZW50TGF1bmNoUG9zaXRpb246IGFueSA9IHsgeDogMCwgeTogMCB9O1xuICBwcml2YXRlIGxhc3RQb3NpdGlvbjogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBtb3ZlUmFkaXVzOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIGN1cnJlbnRWaWJyYXRlUG9zaXRpb246IGFueSA9IHsgeDogMCwgeTogMCB9O1xuICBwcml2YXRlIGVsZW1lbnRPYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlciB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGhhc1JBRkJlZW5DYWxsZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcih0ZG06IFRlc3REZXZpY2VNYW5hZ2VyKSB7XG4gICAgdGhpcy5fdGVzdE1hbmFnZXIgPSB0ZG07XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWJyYXRlZGlzY29ubmVjdFwiKSEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRoaXMuX3Rlc3RNYW5hZ2VyIS5WaWJyYXRpb25EZXZpY2UuRGlzY29ubmVjdCgpO1xuICAgIH0pO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGluZWFyZGlzY29ubmVjdFwiKSEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRoaXMuX3Rlc3RNYW5hZ2VyIS5MaW5lYXJEZXZpY2UuRGlzY29ubmVjdCgpO1xuICAgIH0pO1xuICAgIGNvbnN0IHNwZWVkSGFuZGxlciA9IChzcGVlZCkgPT4ge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWJyYXRpb25zcGVlZFwiKSEuaW5uZXJIVE1MID0gKHNwZWVkICogMTAwKS50b0ZpeGVkKDEpO1xuICAgICAgdGhpcy52aWJyYXRlTW92ZShzcGVlZCk7XG4gICAgfTtcbiAgICB0aGlzLl90ZXN0TWFuYWdlci5WaWJyYXRpb25EZXZpY2UuYWRkTGlzdGVuZXIoXCJ2aWJyYXRlXCIsIHNwZWVkSGFuZGxlcik7XG5cbiAgICBjb25zdCBwb3NpdGlvbkhhbmRsZXIgPSAobGluZWFyb2JqOiBhbnkpID0+IHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGluZWFycG9zaXRpb25cIikhLmlubmVySFRNTCA9IChsaW5lYXJvYmoucG9zaXRpb24pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaW5lYXJzcGVlZFwiKSEuaW5uZXJIVE1MID0gKGxpbmVhcm9iai5zcGVlZCk7XG4gICAgICB0aGlzLmxhdW5jaE1vdmUobGluZWFyb2JqLnBvc2l0aW9uLCBsaW5lYXJvYmouc3BlZWQpO1xuICAgIH07XG5cbiAgICB0aGlzLl90ZXN0TWFuYWdlci5MaW5lYXJEZXZpY2UuYWRkTGlzdGVuZXIoXCJsaW5lYXJcIiwgcG9zaXRpb25IYW5kbGVyKTtcbiAgICB0aGlzLmZsZXNobGlnaHRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmbGVzaGxpZ2h0LWltYWdlXCIpITtcbiAgICB0aGlzLnZpYnJhdG9yRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlicmF0b3ItaW1hZ2VcIikhO1xuXG4gICAgLy8gQWZ0ZXIgdGhlIG5vZGUgaGFzIGJlZW4gY3JlYXRlZCwgYXR0YWNoIGEgbXV0YXRpb24gb2JzZXJ2ZXIgdG8gZGlzY29ubmVjdFxuICAgIC8vIGV2ZW50cyB3aGVuIHRoZSBwYW5lbCBpcyBjbG9zZWQsIG90aGVyd2lzZSB3ZSdsbCBnZXQgZXZlbnRzIGdvaW5nIHRvXG4gICAgLy8gZWxlbWVudHMgdGhhdCBubyBsb25nZXIgZXhpc3QuXG4gICAgcHJvY2Vzcy5uZXh0VGljaygoKSA9PiB7XG4gICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV0dHBsdWctdGVzdC1kZXZpY2UtbWFuYWdlci1wYW5lbFwiKTtcbiAgICAgIGlmICghZWwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zKSA9PiB7XG4gICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0cGx1Zy10ZXN0LWRldmljZS1tYW5hZ2VyLXBhbmVsXCIpKSB7XG4gICAgICAgICAgdGhpcy5fdGVzdE1hbmFnZXIuVmlicmF0aW9uRGV2aWNlLnJlbW92ZUxpc3RlbmVyKFwidmlicmF0ZVwiLCBzcGVlZEhhbmRsZXIpO1xuICAgICAgICAgIHRoaXMuX3Rlc3RNYW5hZ2VyLkxpbmVhckRldmljZS5yZW1vdmVMaXN0ZW5lcihcImxpbmVhclwiLCBwb3NpdGlvbkhhbmRsZXIpO1xuICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvYnNlcnZlci5vYnNlcnZlKGVsIS5wYXJlbnROb2RlISwgeyBjaGlsZExpc3Q6IHRydWUgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlcXVlc3RBbmltYXRlID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmhhc1JBRkJlZW5DYWxsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5oYXNSQUZCZWVuQ2FsbGVkID0gdHJ1ZTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgYW5pbWF0ZSA9IChjdXJyZW50VGltZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5oYXNSQUZCZWVuQ2FsbGVkID0gZmFsc2U7XG4gICAgaWYgKHRoaXMudmlicmF0b3JUd2VlbiAmJiAhdGhpcy52aWJyYXRvclR3ZWVuLnVwZGF0ZShjdXJyZW50VGltZSkpIHtcbiAgICAgIGlmICh0aGlzLm1vdmVSYWRpdXMgIT09IDApIHtcbiAgICAgICAgdGhpcy52aWJyYXRlTW92ZSh0aGlzLm1vdmVSYWRpdXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy52aWJyYXRvclR3ZWVuID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMubGF1bmNoVHdlZW4gJiYgIXRoaXMubGF1bmNoVHdlZW4udXBkYXRlKGN1cnJlbnRUaW1lKSkge1xuICAgICAgdGhpcy5sYXVuY2hUd2VlbiA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVxdWVzdEFuaW1hdGUoKTtcbiAgICB9XG4gICAgdGhpcy52aWJyYXRvckVsZW1lbnQuc3R5bGUudG9wID0gYCR7dGhpcy5jdXJyZW50VmlicmF0ZVBvc2l0aW9uLnh9cHhgO1xuICAgIHRoaXMudmlicmF0b3JFbGVtZW50LnN0eWxlLnJpZ2h0ID0gYCR7dGhpcy5jdXJyZW50VmlicmF0ZVBvc2l0aW9uLnl9cHhgO1xuICAgIHRoaXMuZmxlc2hsaWdodEVsZW1lbnQuc3R5bGUuYm90dG9tID0gYCR7dGhpcy5jdXJyZW50TGF1bmNoUG9zaXRpb24ueX0lYDtcbiAgfVxuXG4gIHByaXZhdGUgbGF1bmNoTW92ZSA9IChwb3NpdGlvbiwgc3BlZWQpID0+IHtcbiAgICBjb25zdCBwID0gLSgoMTAwIC0gcG9zaXRpb24pICogMC4yMik7XG4gICAgY29uc3QgZHVyYXRpb24gPSB0aGlzLm1vdmVEdXJhdGlvbihwb3NpdGlvbiwgc3BlZWQpO1xuICAgIHRoaXMubGF1bmNoVHdlZW4gPSBuZXcgVFdFRU4uVHdlZW4odGhpcy5jdXJyZW50TGF1bmNoUG9zaXRpb24pXG4gICAgICAudG8oe3g6IDAsIHk6IHB9LCBkdXJhdGlvbilcbiAgICAgIC5zdGFydCgpO1xuICAgIHRoaXMucmVxdWVzdEFuaW1hdGUoKTtcbiAgfVxuXG4gIC8vIG1vdmVEdXJhdGlvbiByZXR1cm5zIHRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBpdCB3aWxsIHRha2UgdG8gbW92ZVxuICAvLyB0byBwb3NpdGlvbiBhdCBzcGVlZC5cbiAgLy9cbiAgLy8gcG9zaXRpb246IHBvc2l0aW9uIGluIHBlcmNlbnQgKDAtMTAwKS5cbiAgLy8gc3BlZWQ6ICAgIHNwZWVkIGluIHBlcmNlbnQgKDIwLTEwMCkuXG4gIHByaXZhdGUgbW92ZUR1cmF0aW9uID0gKHBvc2l0aW9uOiBudW1iZXIsIHNwZWVkOiBudW1iZXIpID0+IHtcbiAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGguYWJzKHBvc2l0aW9uIC0gdGhpcy5sYXN0UG9zaXRpb24pO1xuICAgIHRoaXMubGFzdFBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgcmV0dXJuIHRoaXMuY2FsY0R1cmF0aW9uKGRpc3RhbmNlLCBzcGVlZCk7XG4gIH1cblxuICAvLyBfY2FsY0R1cmF0aW9uIHJldHVybnMgZHVyYXRpb24gb2YgYSBtb3ZlIGluIG1pbGxpc2Vjb25kcyBmb3IgYSBnaXZlblxuICAvLyBkaXN0YW5jZS9zcGVlZC5cbiAgLy9cbiAgLy8gZGlzdGFuY2U6IGFtb3VudCB0byBtb3ZlIHBlcmNlbnQgKDAtMTAwKS5cbiAgLy8gc3BlZWQ6IHNwZWVkIHRvIG1vdmUgYXQgaW4gcGVyY2VudCAoMjAtMTAwKS5cbiAgcHJpdmF0ZSBjYWxjRHVyYXRpb24gPSAoZGlzdGFuY2U6IG51bWJlciwgc3BlZWQ6IG51bWJlcikgPT4ge1xuICAgIHJldHVybiBNYXRoLnBvdyhzcGVlZCAvIDI1MDAwLCAtMC45NSkgLyAoOTAgLyBkaXN0YW5jZSk7XG4gIH1cblxuICBwcml2YXRlIHZpYnJhdGVNb3ZlID0gKHNwZWVkKSA9PiB7XG4gICAgdGhpcy5tb3ZlUmFkaXVzID0gc3BlZWQ7XG4gICAgdGhpcy52aWJyYXRvclR3ZWVuID0gbmV3IFRXRUVOLlR3ZWVuKHRoaXMuY3VycmVudFZpYnJhdGVQb3NpdGlvbilcbiAgICAgIC50byh7eDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5tb3ZlUmFkaXVzICogMjApLFxuICAgICAgICAgICB5OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLm1vdmVSYWRpdXMgKiAyMCl9XG4gICAgICAgICAgLCAzNClcbiAgICAgIC5zdGFydCgpO1xuICAgIHRoaXMucmVxdWVzdEFuaW1hdGUoKTtcbiAgfVxufVxuXG4vLyBTb21lIGNvZGUgaW4gdGhpcyBmaWxlIHRha2VuIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2Z1bmphY2svbGF1bmNoY29udHJvbFxuLy8gTUlUIExpY2Vuc2U6XG4vKlxuICBMYXVjaGNvbnRyb2wgVUkgRmxlc2hsaWdodFxuXG4gIGh0dHBzOi8vZ2l0aHViLmNvbS9mdW5qYWNrL2xhdW5jaGNvbnRyb2xcblxuICBDb3B5cmlnaHQgMjAxNyBGdW5qYWNrXG5cbiAgUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG4gIG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuXG4gIDEuIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xuICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cblxuICAyLiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb25cbiAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG5cbiAgMy4gTmVpdGhlciB0aGUgbmFtZSBvZiB0aGUgY29weXJpZ2h0IGhvbGRlciBub3IgdGhlIG5hbWVzIG9mIGl0cyBjb250cmlidXRvcnNcbiAgbWF5IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlIHdpdGhvdXRcbiAgc3BlY2lmaWMgcHJpb3Igd3JpdHRlbiBwZXJtaXNzaW9uLlxuXG4gIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORFxuICBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuICBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFXG4gIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEVcbiAgRk9SIEFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUxcbiAgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1JcbiAgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVJcbiAgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSxcbiAgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0VcbiAgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiovXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFEUUFBQUJuQ0FZQUFBQlBZbUd5QUFBQUJtSkxSMFFBL3dEL0FQK2d2YWVUQUFBQUNYQklXWE1BQUFzVEFBQUxFd0VBbXB3WUFBQUFCM1JKVFVVSDRRUWVDeWNUQnFUNHNRQUFBQmwwUlZoMFEyOXRiV1Z1ZEFCRGNtVmhkR1ZrSUhkcGRHZ2dSMGxOVUZlQkRoY0FBQU5KU1VSQlZIamE3WnkvYjV0QUZNZmZJZFNoYVRkTGpwMnRrdG02OEE5MDc1b0Jwa3FaK3dmMGIrZ2YwTmxTSmp4NHpaN1Z3MGxXTnlOMVMxeExXVkRWSmJKNUhleExBUFBqT0xnRHUrODdoUmpmdlEvdkYzZVFNR2dtQkQxaXhyOG9ZSHpmQndDQTFXcVYrbkN6L2wzNjVjdnhLSFU4bVV3QUFDQUlna2EyMmFvd0FxUnRpWEdESUVBVktBdk9UQVRVcklMZ2VRR3huSlJBeE5NRVFrUWpIcktOZVlmcDk0NVJJRm5JcmpveUdrczdVeDdLTnRheU93VkVQUExHY0hTWk9uWWNKM1djdUdPZ1BuU1N1ZEk2a0dwSTZCNWJCUWg5M3dmZjkydFBYT1FweTdKU01HSjhsZUtqdFd3L3JCOXpmMzgxR3FlTzR6anVSOWxPVnJwc2xlT2NIeG1lQkhWZHQ3REtOVmtUS2VkUTJYcW9ERVo0aUhNT3U5MnU5dGpHcXh6bi9PanE1OGwxWFZndWwyRGJOdGgyZTVGdmRRR1RoRm9zRnJUQUl5QnFyQzNETkdtc1p4ZHlLdldTSGZiTVFNZmVYTWJ6L1dpc2JVQlJsU01nNmtQVWg2Z1BVUitpUGtSbG00Q29EMUVmb2o1RWZZaXFIQUVSRURWV2FxelVXS214bm5aanpUNWZyYXZ0ZHR0NGpNWkZJVSt1NndMblhIcWdzaWQrVkJRVWt3NDl6MHU5UUpFWEtzSkxaWS8xaFVlemNod245UjdkYkRhclphZWxJM2RrbjRMcnlFZHRiNUpjamNiU2I1SjAzWWVrcjZTcTRXRVl2cnhwcjdNb29PZDU1cEw3a0tlSE9WRnJEbFY1cCtydkhtVE9VYzJsLzNiNVlEVGNzaEpoRi96ODl1R3NQT1IvL1A3TE9KQk0vcWljU3psRVFBUkVRTjBEcVZTdHRpc2RlWWlBQ01nd1VCaUdyU2QzMFhlTDVpSVBFZEFKQVdIWGk3dnNJcTlxZjZGczF3ZkZyczFoc3crNkFoUHpDM3NlMW8rRi81cUF5UUFKRmUyekpTZFRWWjJ4RCtmV0JoSXVsaksyekNBWjFaeWowRzRwRDRtQmRPNTR5b0JrN0dGMWMram82dlVsNU1wRUlkZjNrS3Zsb2E1RFRzWkRWVG5FY0RwSGRuTmRhYlRPa0l1aUNPSTRCcHpPZ2QxY005WEd1citUR0E0QTcrNEJOazhnd0lUZXZiMW96VU5SRkJWKzl1Zkg3ZjZINFVEYzNjU3FRSzlmSEE0QXAvUENFOTkvL2RJSTZNWG9QTzFCam0xU0FMb29HUmhnOHlSbmtJcXljNzNxRFFBOHF3TDlyVDFwQXJLaDRVVjZidUtoTnErc0VVazlMc2U3ZTRRZWlIMytWR2t2clZqN0x1azNOTG9PTzVsd3F3WFVGWmdzaURLUVNhaTZNTXBBdXNGVVFGb0JhaHVzQ1lqUVB4amlyeUNvcExXYkFBQUFBRWxGVGtTdVFtQ0NcIiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQURJQUFBQkJDQUlBQUFBYzYyQ0pBQUFBQkdkQlRVRUFBTEdQQy94aEJRQUFBQ0JqU0ZKTkFBQjZKZ0FBZ0lRQUFQb0FBQUNBNkFBQWRUQUFBT3BnQUFBNm1BQUFGM0NjdWxFOEFBQUFCbUpMUjBRQS93RC9BUCtndmFlVEFBQUFDWEJJV1hNQUFBc1NBQUFMRWdIUzNYNzhBQUFBQjNSSlRVVUg0UW9PRlNvRFZ5enhIQUFBQ1ZsSlJFRlVhTjdkV2wxc0UxY1dQbmYreHg2UC84WTJLVW5NTGswVUZycFNVV2tMS3RKV1ZaOFd5VEpzSkVRUWtXaEJMUkk4VlNvUEM2anFRNkpLZldDbFZtb1RpVUoydTFXa2h2U2xMV3JMQXhEQzhxT3RoTlFHVkVvU1oybXhqWDlpTzlNWno3MTNIeTRZTnduRlA1aVY5anhZTTNmbW52bnVPZWVldjJ0RUtZWG1pQkFDQU1QRHd3Q3dlL2R1bnVjUlFrM3lCTm9jRVVJd3hzZVBIdytIdzlGb2RHUmtCR05NQ0dtU2JiT3dITWM1ZE9pUVlSaFBQdm5rK3ZYcnU3dTdqeHc1Z2pGdWtpMXFVb21FRUplcUdvWmhoRUk4endQQXRXdlg1dWZuT1k1cmhtMVRreW1sKy9idE00d1FVR0NZQUtDN3UzdmZ2bjFOcnJZcFdOZXZYZnZtcTY4cElacW1WUVlSUXVmUG4vLysrKytiUWRZNExJenhxVk9uOHZrOFFtaVJ5bXpiUG4zNk5Oc1FqeHRXSXBFNGZ1S0VKRW1DSUNpS1V2M0k3WFovL1BISE16TXpEUXVzRVZpVVVveng0TURBZnhKekFBQUlFTCtZVHphYkhSd2NiSGpORFVwcmFtcnFxNisrWnJyeitueExYMUFVWlhKeWNtcHE2ckhDS3BWSzJXeUd3Uko0WVJtK0hGY29GQllXRmhyajM2RGYycmh4WTJKbUZnQjBuMWRWMVdvMEFJQXhadkhIN1hhZk9YUG1jVW1MQWdJRUFFc1hwT3Y2aWhVcm1vK0pqY0FhR2g2NjhjTVB5ejRLaDhPYXBybGNMbmFiVHFjLytPQ0RCaFJTTnl3V2h0bTF3UE9pS0ZZZVZZVGs4WGlxcHpRQXEyN2J1bno1OG90L2V0R3I2d0FnaW1MQUNGYUx5dWZ6QVlCcG1yZHUzY0lZQTBBaWtmajg4OCtmZWVhWjFrb0xvWWV2UkZYVlNDU3lWSW90aERVeE1TRkwwdEp4U1pKa1dhN2NDc0pkcitGMnV5Y25KMXNPNjVOL2Z1S3E4Z2pWRXFyMkZMSXNCd0lCQUFnRUFxT2pveTJIVlNNaGhLcDNRMnRocFZJcHk3SnFmTGxpZ283anBGS3BGc0lhR3h1YlN5UnEzTG91bDRzSkxKdk5uang1c2xXd0tLV0w5dFJ2WjhhU0pGVlMxbnFwUGxpZmZ2cHBOUlROb3oxMENnRElzdnpaWjUrMUNoYkhjZWZPbmZ1VkFHcFRKOC96bHk1ZGFoV3N4MG4vbDdDYUwrcGJBU3VmejFkZnN5cm9mdzlyRVlSTUpsTmRnUldMUmR1MkcrTXNORFp0V1NxWHkzTnpjN3F1cyt0TUp0TXdxMGNHaTFMSzg3eHBtcVpwTnMrdERpVVNRbDU0NFFXVzNGVkdITWRoMXdpaEI5WFFHT01OR3phMENoWkNhTnUyYmRYZnhoai9Vb05zTE11S3hXSXRoTFUwTHkwV2luVjk3OUhEQW9DdFc3ZTJkM1pVdXl1RVVENlhod2VIYlVxcDMrK1B4V0oxRlEzMXdRcUZRdjM5L2FiNXExb1pZd2NvUE1pd2NybmM5dTNiRGNOb29iUUE0S1dYWGdwSEloVkxCd0Ric25QWjdNTENRdlVnSTBLSXJ1c3Z2L3h5dlgzZXVnc3lTdW5VMU5TV1AyOUpKbSt6REFJaDVORTlnaWhxbXJhb295UUl3a2NmZmRUVDAxT3Y5Ni9iYnlHRWVucDY0bHZqL3hqNWV5WEowWFZkZGQrdHBITzVIQk1iUW1qNzl1MXIxcXlwOXhPTlNJc0pMSlZLN2R5NTgrclZxenppTU1HV2JWZlVKTXN5eDNIbGNybXJxMnQwZExTNllLeWRHb3lKaG1IczJyVUxBUEw1dkdtYUFYK2dzN096bzZOanc0WU5yRnJrZVg3UG5qM2hjTGd4L2swMXdEZHQzSmlZVFZCS2k4V2lRekJDcUwyOVhaSWsyN1lOd3poNzltekRuQnVQaVlTUTU1NS8vdHQvZjh2enZNdmxXdDNaQVFDQ0lOeTVjd2RqdkduVHBxVWxTZTNVVkdMVDE5Y25TcUxMNWFJQXM3T3ppVVRDNy9kcm1tWlpWbTl2YnpPY0c1Y1d4M0VJSWN1MkNTRkFZZFh2ZnlmTGNpYVRLWlZLNVhJWkd1cUlQQUpZakNSSlVtVUZBY3pOelltaXVINzlldHUyaThWbUEyV3pzQWdoWmFjTUZJSkcwT3YxM3JoeG8xZ3Nsa3FsWm1HeC9PbktsU3NjeHhtRzBkSFJ3YlJUNDN5TzR3UkJCRXF6MmV6OC9QemF0V3ZUNlhUekdiMEFBSU9EZzBORFEyeDdqNHlNUktQUldtWXl6MEl3THBmTExsWHRlS0lOQU9ibjUwVlJaSzBIOWtKakVMbmg0ZUdqUjQ4R2c4RkFJTEN3c0xCang0NTBPbDNMVEVMSTlQUzBJaXR1bDh2cjlRS0FLSXFLb2lpS0lvcmk5ZXZYYjk2ODJmamhTbVUxd1dCUTEvVmNMamMyTnZiYlIwanNqSWxTK3U2NzcxWmljeVFTV2JseVpXZG5aelFhYlc5dmYvdnR0L2Z2M3o4ek13UDNEbVBxZ3dVQVFNRTBUZGJPNDNuKzh1WExEMjFIalkyTnhXS3g2WnZUbFJGZDE2Vjd6Y3UydHJaUUtDU0tZandlNytycTJyeDU4L0R3OE4zVDN0cm83azZjeitWejJad1JNdHh1OS9qNCtHdXZ2YlkweERJSnZmUE9Pek16TXhNVEUwQ29MRW5NUlFGQW9WQmdwUmdqbDh1VlRDWURnVUEwR3VWNS90aXhZK2wwK3VEQmd6VzJsdmczM25qanl5Kyt3QTZXWkVuVE5OTTB5K1V5QzdwTXYyeVZVMU5UNCtQalc3WnMrZkhISDIvZnZzM3pmS20wd0RxRGlFTnV0OXMwVFhhQ1Z5d1dUZFBNWnJPMmJkdTJYU2dVRUVMaGNEaVJTRXhPVG5vOG5scTJGTUlZUC9mc3N6L2Qra2xXNUtCaCtIeStUQ1pqV2RaYmI3MFZqOGRaV1RFd01EQTZPbXBaRmp1ZXNINnhGb3BGQjJOQ2lLWnBzcXF3dnJJb2loekgyYmE5VkZtQ0lLeGV2YnBRS0JTTHhRTUhEc1RqOFlmQWNoeG5jR0R3YjBlUGlxS29xbXJQSDlha1VpbFdFek5ualJEeSsvMDg0a3FsVXNWeU9ZNlRGTm5qOFR6MHFMdzZZT3U2SG9sRUVvbEVmMzkvTEJZTGhVSVBtbzRJSVlTUVB6NzFWQzZYVXhUMWlaVlBoTVBoVkNwVktwVnl1UngyTUNBQUNzNDlHMkphODNsOWtuSzNDNjhvaXNmalVaZnJpak82YytlTzR6Z0lvWEs1N1BWNm1ha1FRb2FHaGpvN081ZDFiSWlaem9jZmZuajRyNGRFVWRSMFQxdGJtOC9ueStmenRtM1B6U2FXRmc2cVM5Vzkzb3BwdDdlMzEyTEZMQzM3K2VlZkthV1JTRVRUTkVMSWUrKzl0Mno2ZWpjTlRLVlNlL2ZzdlhEaGdzRHptcVpwbW9ZUWNyQ1RTcVlXR1lvb2lUNi8zK1B4R0liQkZGVDVYVjRkOS9ZTjgzQXNSbG1XSlVsU0tCUUtCb09IRHgrT1JxT0x0SG1mWFRLWmZQUE5OMDk5OGVWdm1Jc2tTYjZBbjFrSmh4QkN5RFROWkNxRllJa2lFQUNsOTNwTlZGSFZVQ2dFQUVCQjkrcjVmSjZGcVhBNDdEak8rKysvSDQxR3E3VjVIeFloSkpsTXZ2NzY2Lys2Y0lGRHl5Q2psS3FxcXZ1OHpHdHpnTmk2SGV3czdlMEtnbEQ5R1o3bjJXcEZVZlI0OVVxNGRMdmRQcDh2R0F3T0RnNkd3K0hLbFB1dzJFVTZuZTdyNjd0NDhhTG1jaS9LZXRtdHBNaVdaUlVLQllJSklXVGJYN1p0M3J5NVdsYUUwck5uem95ZFBMbG9iUWdobDBzVlJaSDlzVWRWRlVWUkZWVVJSVkhUdE43ZTNyMTc5eTRENno1ZlFyNzc3cnRYZHI4eU16Mjk2RkYwMVNwQ0NRQWNPM1pzM2JwMUxEZ3VTb1JZTUZqcXpRa2hBd01ENCtQakNHQjJaaFlBS0ZDdnp5Y0l3dE5QUDMzaXhJbHFQZzgwVll3eCswdFdOYjM2NnFzTkgweFU0Mk1oc2pJU2o4Y1hsVzcvQmVkUWI2RE9sYjZIQUFBQUdYUkZXSFJqYjIxdFpXNTBBRU55WldGMFpXUWdkMmwwYUNCSFNVMVE1NjlBeXdBQUFDVjBSVmgwWkdGMFpUcGpjbVZoZEdVQU1qQXhOeTB4TUMweE5GUXlNVG8wTWpvd015MHdOem93TU52aW9xTUFBQUFsZEVWWWRHUmhkR1U2Ylc5a2FXWjVBREl3TVRjdE1UQXRNVFJVTWpFNk5ESTZNRE10TURjNk1EQ3F2eG9mQUFBQUFFbEZUa1N1UW1DQ1wiIiwiZXhwb3J0ICogZnJvbSBcIi4uL1Rlc3REZXZpY2VcIjtcbmV4cG9ydCAqIGZyb20gXCIuLi9UZXN0RGV2aWNlTWFuYWdlclwiO1xuZXhwb3J0ICogZnJvbSBcIi4uL3V0aWxzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Mb2dQYW5lbFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vVGVzdERldmljZU1hbmFnZXJQYW5lbFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vdXRpbHMud2ViXCI7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBVUFBQUNGQ0FZQUFBQ1Qzekk5QUFBQUJtSkxSMFFBL3dEL0FQK2d2YWVUQUFBQUNYQklXWE1BQUFzVEFBQUxFd0VBbXB3WUFBQUFCM1JKVFVVSDRRUWVDaDRBalZ4ZTRnQUFBQmwwUlZoMFEyOXRiV1Z1ZEFCRGNtVmhkR1ZrSUhkcGRHZ2dSMGxOVUZlQkRoY0FBQUErU1VSQlZFakhZMlJnWVBqUGdBVmdDREpoVThXRVMvVUkwTTZJcHBKeE5PaklEVG95YlI4VkhCVWNNb0tqYVg1VWNEVE5qMWFSbzYyTEFXbGRBQUM4RUMydEFFQllYQUFBQUFCSlJVNUVya0pnZ2c9PVwiIiwiaW1wb3J0IHsgVGVzdERldmljZU1hbmFnZXJQYW5lbCB9IGZyb20gXCIuL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWxcIjtcbmltcG9ydCB7IExvZ1BhbmVsIH0gZnJvbSBcIi4vTG9nUGFuZWxcIjtcbmltcG9ydCB7IEJ1dHRwbHVnU2VydmVyIH0gZnJvbSBcIi4uLy4uL2luZGV4XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBDcmVhdGVMb2dnZXJQYW5lbCgpIHtcbiAgTG9nUGFuZWwuU2hvd0xvZ1BhbmVsKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDcmVhdGVEZXZpY2VNYW5hZ2VyUGFuZWwoYnV0dHBsdWdTZXJ2ZXI6IEJ1dHRwbHVnU2VydmVyKSB7XG4gIFRlc3REZXZpY2VNYW5hZ2VyUGFuZWwuU2hvd1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwoYnV0dHBsdWdTZXJ2ZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVtb3ZlRGV2aWNlTWFuYWdlclBhbmVsKCkge1xuICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV0dHBsdWctdGVzdC1kZXZpY2UtbWFuYWdlci1wYW5lbFwiKTtcbiAgaWYgKCFlbCB8fCAhZWwucGFyZW50Tm9kZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=