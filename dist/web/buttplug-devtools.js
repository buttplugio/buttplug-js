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

module.exports = "<buttplug-devtools-main>\n  <input id=\"tab1\" type=\"radio\" name=\"tabs\" checked>\n  <label for=\"tab1\">Test Devices</label>\n  <section id=\"content1\">\n    <div id=\"simulator\">\n      <div class=\"vibrator-simulator-component\">\n        <div class=\"vibrator\">\n          <img src=\"" + __webpack_require__("./src/devtools/web/hush.png") + "\"\n               id=\"vibrator-image\">\n        </div>\n        <div id=\"vibrator-info\">\n          <b>Vibration Speed:</b> <span id=\"vibrationspeed\">0</span><br/>\n          <button id=\"vibratedisconnect\">Disconnect</button>\n        </div>\n      </div>\n      <div class=\"simulator-divider\"></div>\n      <div class=\"fleshlight-sim\">\n        <div class=\"c-fleshlight\">\n          <div>\n            <img src=\"" + __webpack_require__("./src/devtools/web/ruler.png") + "\">\n          </div>\n          <div>\n            <img src=\"" + __webpack_require__("./src/devtools/web/fleshlight.png") + "\"\n                 class=\"o-fleshlight\"\n                 id=\"fleshlight-image\">\n          </div>\n        </div>\n        <div>\n          <b>Speed:</b> <span id=\"linearspeed\">0</span><br/>\n          <b>Position:</b> <span id=\"linearposition\">0</span><br/>\n          <button id=\"lineardisconnect\">Disconnect</button>\n        </div>\n      </div>\n    </div>\n  </section>\n</buttplug-devtools-main>\n";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvZXh0ZXJuYWwgXCJCdXR0cGx1Z1wiIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9ub2RlX21vZHVsZXMvQHR3ZWVuanMvdHdlZW4uanMvc3JjL1R3ZWVuLmpzIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9ub2RlX21vZHVsZXMvanNwYW5lbDQvZGlzdC9qc3BhbmVsLmNzcyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9Mb2dQYW5lbC5jc3MiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC5jc3MiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9kaXN0L2pzcGFuZWwuY3NzPzM2MWEiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9lczZtb2R1bGUvanNwYW5lbC5taW4uanMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qcyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL1Rlc3REZXZpY2UudHMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy9UZXN0RGV2aWNlTWFuYWdlci50cyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3V0aWxzLnRzIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9zcmMvZGV2dG9vbHMvd2ViL0xvZ1BhbmVsLmNzcz9hZmE2Iiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9zcmMvZGV2dG9vbHMvd2ViL0xvZ1BhbmVsLmh0bWwiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvTG9nUGFuZWwudHMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC5jc3M/ZDFmYyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmh0bWwiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC50cyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9mbGVzaGxpZ2h0LnBuZyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9odXNoLnBuZyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9pbmRleC53ZWIudHMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvcnVsZXIucG5nIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9zcmMvZGV2dG9vbHMvd2ViL3V0aWxzLndlYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7QUNsRkEsMEI7Ozs7Ozs7K0NDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSCxFQUFFOztBQUVGOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixxQkFBcUI7O0FBRXZDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUM7QUFDdkM7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQSxnRUFBZ0Usc0JBQXNCO0FBQ3RGO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsSUFBSTs7QUFFSjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQSxJQUFJOztBQUVKOztBQUVBO0FBQ0E7O0FBRUEsa0VBQWtFLHNCQUFzQjtBQUN4RjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVI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Q0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNILG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7O0FDdkx0QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsbUJBQW1CO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNB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Ozs7Ozs7Ozs7Ozs7Ozs7RUErQkU7Ozs7Ozs7O0FDOUpGLGlDQUFpQyxvekM7Ozs7Ozs7QUNBakMsaUNBQWlDLDRoSDs7Ozs7Ozs7Ozs7OztBQ0FqQyw4REFBOEI7QUFDOUIscUVBQXFDO0FBQ3JDLHlEQUF5QjtBQUN6QixnRUFBMkI7QUFDM0IsOEVBQXlDO0FBQ3pDLGlFQUE0Qjs7Ozs7Ozs7QUNMNUIsaUNBQWlDLHdTOzs7Ozs7Ozs7O0FDQWpDLHFHQUFrRTtBQUNsRSx5RUFBc0M7QUFHdEM7SUFDRSxtQkFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO0FBQzFCLENBQUM7QUFGRCw4Q0FFQztBQUVELGtDQUF5QyxjQUE4QjtJQUNyRSwrQ0FBc0IsQ0FBQywwQkFBMEIsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNwRSxDQUFDO0FBRkQsNERBRUMiLCJmaWxlIjoiYnV0dHBsdWctZGV2dG9vbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJidXR0cGx1Zy1kZXZ0b29scy1jb21tb25qc1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJCdXR0cGx1Z0RldlRvb2xzXCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9kZXZ0b29scy93ZWIvaW5kZXgud2ViLnRzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBCdXR0cGx1ZzsiLCIvKipcbiAqIFR3ZWVuLmpzIC0gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vdHdlZW5qcy90d2Vlbi5qc1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICpcbiAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdHdlZW5qcy90d2Vlbi5qcy9ncmFwaHMvY29udHJpYnV0b3JzIGZvciB0aGUgZnVsbCBsaXN0IG9mIGNvbnRyaWJ1dG9ycy5cbiAqIFRoYW5rIHlvdSBhbGwsIHlvdSdyZSBhd2Vzb21lIVxuICovXG5cblxudmFyIF9Hcm91cCA9IGZ1bmN0aW9uICgpIHtcblx0dGhpcy5fdHdlZW5zID0ge307XG5cdHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlID0ge307XG59O1xuXG5fR3JvdXAucHJvdG90eXBlID0ge1xuXHRnZXRBbGw6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl90d2VlbnMpLm1hcChmdW5jdGlvbiAodHdlZW5JZCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX3R3ZWVuc1t0d2VlbklkXTtcblx0XHR9LmJpbmQodGhpcykpO1xuXG5cdH0sXG5cblx0cmVtb3ZlQWxsOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLl90d2VlbnMgPSB7fTtcblxuXHR9LFxuXG5cdGFkZDogZnVuY3Rpb24gKHR3ZWVuKSB7XG5cblx0XHR0aGlzLl90d2VlbnNbdHdlZW4uZ2V0SWQoKV0gPSB0d2Vlbjtcblx0XHR0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZVt0d2Vlbi5nZXRJZCgpXSA9IHR3ZWVuO1xuXG5cdH0sXG5cblx0cmVtb3ZlOiBmdW5jdGlvbiAodHdlZW4pIHtcblxuXHRcdGRlbGV0ZSB0aGlzLl90d2VlbnNbdHdlZW4uZ2V0SWQoKV07XG5cdFx0ZGVsZXRlIHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlW3R3ZWVuLmdldElkKCldO1xuXG5cdH0sXG5cblx0dXBkYXRlOiBmdW5jdGlvbiAodGltZSwgcHJlc2VydmUpIHtcblxuXHRcdHZhciB0d2VlbklkcyA9IE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVucyk7XG5cblx0XHRpZiAodHdlZW5JZHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0dGltZSA9IHRpbWUgIT09IHVuZGVmaW5lZCA/IHRpbWUgOiBUV0VFTi5ub3coKTtcblxuXHRcdC8vIFR3ZWVucyBhcmUgdXBkYXRlZCBpbiBcImJhdGNoZXNcIi4gSWYgeW91IGFkZCBhIG5ldyB0d2VlbiBkdXJpbmcgYW4gdXBkYXRlLCB0aGVuIHRoZVxuXHRcdC8vIG5ldyB0d2VlbiB3aWxsIGJlIHVwZGF0ZWQgaW4gdGhlIG5leHQgYmF0Y2guXG5cdFx0Ly8gSWYgeW91IHJlbW92ZSBhIHR3ZWVuIGR1cmluZyBhbiB1cGRhdGUsIGl0IG1heSBvciBtYXkgbm90IGJlIHVwZGF0ZWQuIEhvd2V2ZXIsXG5cdFx0Ly8gaWYgdGhlIHJlbW92ZWQgdHdlZW4gd2FzIGFkZGVkIGR1cmluZyB0aGUgY3VycmVudCBiYXRjaCwgdGhlbiBpdCB3aWxsIG5vdCBiZSB1cGRhdGVkLlxuXHRcdHdoaWxlICh0d2Vlbklkcy5sZW5ndGggPiAwKSB7XG5cdFx0XHR0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZSA9IHt9O1xuXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHR3ZWVuSWRzLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRcdFx0dmFyIHR3ZWVuID0gdGhpcy5fdHdlZW5zW3R3ZWVuSWRzW2ldXTtcblxuXHRcdFx0XHRpZiAodHdlZW4gJiYgdHdlZW4udXBkYXRlKHRpbWUpID09PSBmYWxzZSkge1xuXHRcdFx0XHRcdHR3ZWVuLl9pc1BsYXlpbmcgPSBmYWxzZTtcblxuXHRcdFx0XHRcdGlmICghcHJlc2VydmUpIHtcblx0XHRcdFx0XHRcdGRlbGV0ZSB0aGlzLl90d2VlbnNbdHdlZW5JZHNbaV1dO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR0d2VlbklkcyA9IE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblxuXHR9XG59O1xuXG52YXIgVFdFRU4gPSBuZXcgX0dyb3VwKCk7XG5cblRXRUVOLkdyb3VwID0gX0dyb3VwO1xuVFdFRU4uX25leHRJZCA9IDA7XG5UV0VFTi5uZXh0SWQgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiBUV0VFTi5fbmV4dElkKys7XG59O1xuXG5cbi8vIEluY2x1ZGUgYSBwZXJmb3JtYW5jZS5ub3cgcG9seWZpbGwuXG4vLyBJbiBub2RlLmpzLCB1c2UgcHJvY2Vzcy5ocnRpbWUuXG5pZiAodHlwZW9mICh3aW5kb3cpID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgKHByb2Nlc3MpICE9PSAndW5kZWZpbmVkJykge1xuXHRUV0VFTi5ub3cgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHRpbWUgPSBwcm9jZXNzLmhydGltZSgpO1xuXG5cdFx0Ly8gQ29udmVydCBbc2Vjb25kcywgbmFub3NlY29uZHNdIHRvIG1pbGxpc2Vjb25kcy5cblx0XHRyZXR1cm4gdGltZVswXSAqIDEwMDAgKyB0aW1lWzFdIC8gMTAwMDAwMDtcblx0fTtcbn1cbi8vIEluIGEgYnJvd3NlciwgdXNlIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cgaWYgaXQgaXMgYXZhaWxhYmxlLlxuZWxzZSBpZiAodHlwZW9mICh3aW5kb3cpICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgd2luZG93LnBlcmZvcm1hbmNlICE9PSB1bmRlZmluZWQgJiZcblx0XHQgd2luZG93LnBlcmZvcm1hbmNlLm5vdyAhPT0gdW5kZWZpbmVkKSB7XG5cdC8vIFRoaXMgbXVzdCBiZSBib3VuZCwgYmVjYXVzZSBkaXJlY3RseSBhc3NpZ25pbmcgdGhpcyBmdW5jdGlvblxuXHQvLyBsZWFkcyB0byBhbiBpbnZvY2F0aW9uIGV4Y2VwdGlvbiBpbiBDaHJvbWUuXG5cdFRXRUVOLm5vdyA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cuYmluZCh3aW5kb3cucGVyZm9ybWFuY2UpO1xufVxuLy8gVXNlIERhdGUubm93IGlmIGl0IGlzIGF2YWlsYWJsZS5cbmVsc2UgaWYgKERhdGUubm93ICE9PSB1bmRlZmluZWQpIHtcblx0VFdFRU4ubm93ID0gRGF0ZS5ub3c7XG59XG4vLyBPdGhlcndpc2UsIHVzZSAnbmV3IERhdGUoKS5nZXRUaW1lKCknLlxuZWxzZSB7XG5cdFRXRUVOLm5vdyA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cdH07XG59XG5cblxuVFdFRU4uVHdlZW4gPSBmdW5jdGlvbiAob2JqZWN0LCBncm91cCkge1xuXHR0aGlzLl9vYmplY3QgPSBvYmplY3Q7XG5cdHRoaXMuX3ZhbHVlc1N0YXJ0ID0ge307XG5cdHRoaXMuX3ZhbHVlc0VuZCA9IHt9O1xuXHR0aGlzLl92YWx1ZXNTdGFydFJlcGVhdCA9IHt9O1xuXHR0aGlzLl9kdXJhdGlvbiA9IDEwMDA7XG5cdHRoaXMuX3JlcGVhdCA9IDA7XG5cdHRoaXMuX3JlcGVhdERlbGF5VGltZSA9IHVuZGVmaW5lZDtcblx0dGhpcy5feW95byA9IGZhbHNlO1xuXHR0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcblx0dGhpcy5fcmV2ZXJzZWQgPSBmYWxzZTtcblx0dGhpcy5fZGVsYXlUaW1lID0gMDtcblx0dGhpcy5fc3RhcnRUaW1lID0gbnVsbDtcblx0dGhpcy5fZWFzaW5nRnVuY3Rpb24gPSBUV0VFTi5FYXNpbmcuTGluZWFyLk5vbmU7XG5cdHRoaXMuX2ludGVycG9sYXRpb25GdW5jdGlvbiA9IFRXRUVOLkludGVycG9sYXRpb24uTGluZWFyO1xuXHR0aGlzLl9jaGFpbmVkVHdlZW5zID0gW107XG5cdHRoaXMuX29uU3RhcnRDYWxsYmFjayA9IG51bGw7XG5cdHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gZmFsc2U7XG5cdHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sgPSBudWxsO1xuXHR0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgPSBudWxsO1xuXHR0aGlzLl9vblN0b3BDYWxsYmFjayA9IG51bGw7XG5cdHRoaXMuX2dyb3VwID0gZ3JvdXAgfHwgVFdFRU47XG5cdHRoaXMuX2lkID0gVFdFRU4ubmV4dElkKCk7XG5cbn07XG5cblRXRUVOLlR3ZWVuLnByb3RvdHlwZSA9IHtcblx0Z2V0SWQ6IGZ1bmN0aW9uIGdldElkKCkge1xuXHRcdHJldHVybiB0aGlzLl9pZDtcblx0fSxcblxuXHRpc1BsYXlpbmc6IGZ1bmN0aW9uIGlzUGxheWluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5faXNQbGF5aW5nO1xuXHR9LFxuXG5cdHRvOiBmdW5jdGlvbiB0byhwcm9wZXJ0aWVzLCBkdXJhdGlvbikge1xuXG5cdFx0dGhpcy5fdmFsdWVzRW5kID0gcHJvcGVydGllcztcblxuXHRcdGlmIChkdXJhdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLl9kdXJhdGlvbiA9IGR1cmF0aW9uO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c3RhcnQ6IGZ1bmN0aW9uIHN0YXJ0KHRpbWUpIHtcblxuXHRcdHRoaXMuX2dyb3VwLmFkZCh0aGlzKTtcblxuXHRcdHRoaXMuX2lzUGxheWluZyA9IHRydWU7XG5cblx0XHR0aGlzLl9vblN0YXJ0Q2FsbGJhY2tGaXJlZCA9IGZhbHNlO1xuXG5cdFx0dGhpcy5fc3RhcnRUaW1lID0gdGltZSAhPT0gdW5kZWZpbmVkID8gdHlwZW9mIHRpbWUgPT09ICdzdHJpbmcnID8gVFdFRU4ubm93KCkgKyBwYXJzZUZsb2F0KHRpbWUpIDogdGltZSA6IFRXRUVOLm5vdygpO1xuXHRcdHRoaXMuX3N0YXJ0VGltZSArPSB0aGlzLl9kZWxheVRpbWU7XG5cblx0XHRmb3IgKHZhciBwcm9wZXJ0eSBpbiB0aGlzLl92YWx1ZXNFbmQpIHtcblxuXHRcdFx0Ly8gQ2hlY2sgaWYgYW4gQXJyYXkgd2FzIHByb3ZpZGVkIGFzIHByb3BlcnR5IHZhbHVlXG5cdFx0XHRpZiAodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSBpbnN0YW5jZW9mIEFycmF5KSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0ubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBDcmVhdGUgYSBsb2NhbCBjb3B5IG9mIHRoZSBBcnJheSB3aXRoIHRoZSBzdGFydCB2YWx1ZSBhdCB0aGUgZnJvbnRcblx0XHRcdFx0dGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSA9IFt0aGlzLl9vYmplY3RbcHJvcGVydHldXS5jb25jYXQodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSk7XG5cblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgYHRvKClgIHNwZWNpZmllcyBhIHByb3BlcnR5IHRoYXQgZG9lc24ndCBleGlzdCBpbiB0aGUgc291cmNlIG9iamVjdCxcblx0XHRcdC8vIHdlIHNob3VsZCBub3Qgc2V0IHRoYXQgcHJvcGVydHkgaW4gdGhlIG9iamVjdFxuXHRcdFx0aWYgKHRoaXMuX29iamVjdFtwcm9wZXJ0eV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2F2ZSB0aGUgc3RhcnRpbmcgdmFsdWUuXG5cdFx0XHR0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gPSB0aGlzLl9vYmplY3RbcHJvcGVydHldO1xuXG5cdFx0XHRpZiAoKHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSBpbnN0YW5jZW9mIEFycmF5KSA9PT0gZmFsc2UpIHtcblx0XHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldICo9IDEuMDsgLy8gRW5zdXJlcyB3ZSdyZSB1c2luZyBudW1iZXJzLCBub3Qgc3RyaW5nc1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gPSB0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gfHwgMDtcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c3RvcDogZnVuY3Rpb24gc3RvcCgpIHtcblxuXHRcdGlmICghdGhpcy5faXNQbGF5aW5nKSB7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHR0aGlzLl9ncm91cC5yZW1vdmUodGhpcyk7XG5cdFx0dGhpcy5faXNQbGF5aW5nID0gZmFsc2U7XG5cblx0XHRpZiAodGhpcy5fb25TdG9wQ2FsbGJhY2sgIT09IG51bGwpIHtcblx0XHRcdHRoaXMuX29uU3RvcENhbGxiYWNrKHRoaXMuX29iamVjdCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5zdG9wQ2hhaW5lZFR3ZWVucygpO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZW5kOiBmdW5jdGlvbiBlbmQoKSB7XG5cblx0XHR0aGlzLnVwZGF0ZSh0aGlzLl9zdGFydFRpbWUgKyB0aGlzLl9kdXJhdGlvbik7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzdG9wQ2hhaW5lZFR3ZWVuczogZnVuY3Rpb24gc3RvcENoYWluZWRUd2VlbnMoKSB7XG5cblx0XHRmb3IgKHZhciBpID0gMCwgbnVtQ2hhaW5lZFR3ZWVucyA9IHRoaXMuX2NoYWluZWRUd2VlbnMubGVuZ3RoOyBpIDwgbnVtQ2hhaW5lZFR3ZWVuczsgaSsrKSB7XG5cdFx0XHR0aGlzLl9jaGFpbmVkVHdlZW5zW2ldLnN0b3AoKTtcblx0XHR9XG5cblx0fSxcblxuXHRncm91cDogZnVuY3Rpb24gZ3JvdXAoZ3JvdXApIHtcblx0XHR0aGlzLl9ncm91cCA9IGdyb3VwO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdGRlbGF5OiBmdW5jdGlvbiBkZWxheShhbW91bnQpIHtcblxuXHRcdHRoaXMuX2RlbGF5VGltZSA9IGFtb3VudDtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHJlcGVhdDogZnVuY3Rpb24gcmVwZWF0KHRpbWVzKSB7XG5cblx0XHR0aGlzLl9yZXBlYXQgPSB0aW1lcztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHJlcGVhdERlbGF5OiBmdW5jdGlvbiByZXBlYXREZWxheShhbW91bnQpIHtcblxuXHRcdHRoaXMuX3JlcGVhdERlbGF5VGltZSA9IGFtb3VudDtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHlveW86IGZ1bmN0aW9uIHlveW8oeXkpIHtcblxuXHRcdHRoaXMuX3lveW8gPSB5eTtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGVhc2luZzogZnVuY3Rpb24gZWFzaW5nKGVhcykge1xuXG5cdFx0dGhpcy5fZWFzaW5nRnVuY3Rpb24gPSBlYXM7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRpbnRlcnBvbGF0aW9uOiBmdW5jdGlvbiBpbnRlcnBvbGF0aW9uKGludGVyKSB7XG5cblx0XHR0aGlzLl9pbnRlcnBvbGF0aW9uRnVuY3Rpb24gPSBpbnRlcjtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNoYWluOiBmdW5jdGlvbiBjaGFpbigpIHtcblxuXHRcdHRoaXMuX2NoYWluZWRUd2VlbnMgPSBhcmd1bWVudHM7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRvblN0YXJ0OiBmdW5jdGlvbiBvblN0YXJ0KGNhbGxiYWNrKSB7XG5cblx0XHR0aGlzLl9vblN0YXJ0Q2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG9uVXBkYXRlOiBmdW5jdGlvbiBvblVwZGF0ZShjYWxsYmFjaykge1xuXG5cdFx0dGhpcy5fb25VcGRhdGVDYWxsYmFjayA9IGNhbGxiYWNrO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0b25Db21wbGV0ZTogZnVuY3Rpb24gb25Db21wbGV0ZShjYWxsYmFjaykge1xuXG5cdFx0dGhpcy5fb25Db21wbGV0ZUNhbGxiYWNrID0gY2FsbGJhY2s7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRvblN0b3A6IGZ1bmN0aW9uIG9uU3RvcChjYWxsYmFjaykge1xuXG5cdFx0dGhpcy5fb25TdG9wQ2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKHRpbWUpIHtcblxuXHRcdHZhciBwcm9wZXJ0eTtcblx0XHR2YXIgZWxhcHNlZDtcblx0XHR2YXIgdmFsdWU7XG5cblx0XHRpZiAodGltZSA8IHRoaXMuX3N0YXJ0VGltZSkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID09PSBmYWxzZSkge1xuXG5cdFx0XHRpZiAodGhpcy5fb25TdGFydENhbGxiYWNrICE9PSBudWxsKSB7XG5cdFx0XHRcdHRoaXMuX29uU3RhcnRDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9vblN0YXJ0Q2FsbGJhY2tGaXJlZCA9IHRydWU7XG5cdFx0fVxuXG5cdFx0ZWxhcHNlZCA9ICh0aW1lIC0gdGhpcy5fc3RhcnRUaW1lKSAvIHRoaXMuX2R1cmF0aW9uO1xuXHRcdGVsYXBzZWQgPSAodGhpcy5fZHVyYXRpb24gPT09IDAgfHwgZWxhcHNlZCA+IDEpID8gMSA6IGVsYXBzZWQ7XG5cblx0XHR2YWx1ZSA9IHRoaXMuX2Vhc2luZ0Z1bmN0aW9uKGVsYXBzZWQpO1xuXG5cdFx0Zm9yIChwcm9wZXJ0eSBpbiB0aGlzLl92YWx1ZXNFbmQpIHtcblxuXHRcdFx0Ly8gRG9uJ3QgdXBkYXRlIHByb3BlcnRpZXMgdGhhdCBkbyBub3QgZXhpc3QgaW4gdGhlIHNvdXJjZSBvYmplY3Rcblx0XHRcdGlmICh0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHN0YXJ0ID0gdGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldIHx8IDA7XG5cdFx0XHR2YXIgZW5kID0gdGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XTtcblxuXHRcdFx0aWYgKGVuZCBpbnN0YW5jZW9mIEFycmF5KSB7XG5cblx0XHRcdFx0dGhpcy5fb2JqZWN0W3Byb3BlcnR5XSA9IHRoaXMuX2ludGVycG9sYXRpb25GdW5jdGlvbihlbmQsIHZhbHVlKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHQvLyBQYXJzZXMgcmVsYXRpdmUgZW5kIHZhbHVlcyB3aXRoIHN0YXJ0IGFzIGJhc2UgKGUuZy46ICsxMCwgLTMpXG5cdFx0XHRcdGlmICh0eXBlb2YgKGVuZCkgPT09ICdzdHJpbmcnKSB7XG5cblx0XHRcdFx0XHRpZiAoZW5kLmNoYXJBdCgwKSA9PT0gJysnIHx8IGVuZC5jaGFyQXQoMCkgPT09ICctJykge1xuXHRcdFx0XHRcdFx0ZW5kID0gc3RhcnQgKyBwYXJzZUZsb2F0KGVuZCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGVuZCA9IHBhcnNlRmxvYXQoZW5kKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBQcm90ZWN0IGFnYWluc3Qgbm9uIG51bWVyaWMgcHJvcGVydGllcy5cblx0XHRcdFx0aWYgKHR5cGVvZiAoZW5kKSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0XHR0aGlzLl9vYmplY3RbcHJvcGVydHldID0gc3RhcnQgKyAoZW5kIC0gc3RhcnQpICogdmFsdWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sgIT09IG51bGwpIHtcblx0XHRcdHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sodGhpcy5fb2JqZWN0KTtcblx0XHR9XG5cblx0XHRpZiAoZWxhcHNlZCA9PT0gMSkge1xuXG5cdFx0XHRpZiAodGhpcy5fcmVwZWF0ID4gMCkge1xuXG5cdFx0XHRcdGlmIChpc0Zpbml0ZSh0aGlzLl9yZXBlYXQpKSB7XG5cdFx0XHRcdFx0dGhpcy5fcmVwZWF0LS07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBSZWFzc2lnbiBzdGFydGluZyB2YWx1ZXMsIHJlc3RhcnQgYnkgbWFraW5nIHN0YXJ0VGltZSA9IG5vd1xuXHRcdFx0XHRmb3IgKHByb3BlcnR5IGluIHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0KSB7XG5cblx0XHRcdFx0XHRpZiAodHlwZW9mICh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldKSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSArIHBhcnNlRmxvYXQodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHRoaXMuX3lveW8pIHtcblx0XHRcdFx0XHRcdHZhciB0bXAgPSB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV07XG5cblx0XHRcdFx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV07XG5cdFx0XHRcdFx0XHR0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldID0gdG1wO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuX3lveW8pIHtcblx0XHRcdFx0XHR0aGlzLl9yZXZlcnNlZCA9ICF0aGlzLl9yZXZlcnNlZDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLl9yZXBlYXREZWxheVRpbWUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdHRoaXMuX3N0YXJ0VGltZSA9IHRpbWUgKyB0aGlzLl9yZXBlYXREZWxheVRpbWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fc3RhcnRUaW1lID0gdGltZSArIHRoaXMuX2RlbGF5VGltZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgIT09IG51bGwpIHtcblxuXHRcdFx0XHRcdHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIG51bUNoYWluZWRUd2VlbnMgPSB0aGlzLl9jaGFpbmVkVHdlZW5zLmxlbmd0aDsgaSA8IG51bUNoYWluZWRUd2VlbnM7IGkrKykge1xuXHRcdFx0XHRcdC8vIE1ha2UgdGhlIGNoYWluZWQgdHdlZW5zIHN0YXJ0IGV4YWN0bHkgYXQgdGhlIHRpbWUgdGhleSBzaG91bGQsXG5cdFx0XHRcdFx0Ly8gZXZlbiBpZiB0aGUgYHVwZGF0ZSgpYCBtZXRob2Qgd2FzIGNhbGxlZCB3YXkgcGFzdCB0aGUgZHVyYXRpb24gb2YgdGhlIHR3ZWVuXG5cdFx0XHRcdFx0dGhpcy5fY2hhaW5lZFR3ZWVuc1tpXS5zdGFydCh0aGlzLl9zdGFydFRpbWUgKyB0aGlzLl9kdXJhdGlvbik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXG5cdH1cbn07XG5cblxuVFdFRU4uRWFzaW5nID0ge1xuXG5cdExpbmVhcjoge1xuXG5cdFx0Tm9uZTogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGs7XG5cblx0XHR9XG5cblx0fSxcblxuXHRRdWFkcmF0aWM6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqIGs7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqICgyIC0gayk7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIDAuNSAqIGsgKiBrO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gLSAwLjUgKiAoLS1rICogKGsgLSAyKSAtIDEpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Q3ViaWM6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqIGsgKiBrO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIC0tayAqIGsgKiBrICsgMTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGsgKiBrO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKChrIC09IDIpICogayAqIGsgKyAyKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdFF1YXJ0aWM6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqIGsgKiBrICogaztcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAxIC0gKC0tayAqIGsgKiBrICogayk7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIDAuNSAqIGsgKiBrICogayAqIGs7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAtIDAuNSAqICgoayAtPSAyKSAqIGsgKiBrICogayAtIDIpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0UXVpbnRpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogayAqIGsgKiBrICogaztcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAtLWsgKiBrICogayAqIGsgKiBrICsgMTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGsgKiBrICogayAqIGs7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwLjUgKiAoKGsgLT0gMikgKiBrICogayAqIGsgKiBrICsgMik7XG5cblx0XHR9XG5cblx0fSxcblxuXHRTaW51c29pZGFsOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDEgLSBNYXRoLmNvcyhrICogTWF0aC5QSSAvIDIpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIE1hdGguc2luKGsgKiBNYXRoLlBJIC8gMik7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAwLjUgKiAoMSAtIE1hdGguY29zKE1hdGguUEkgKiBrKSk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRFeHBvbmVudGlhbDoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrID09PSAwID8gMCA6IE1hdGgucG93KDEwMjQsIGsgLSAxKTtcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrID09PSAxID8gMSA6IDEgLSBNYXRoLnBvdygyLCAtIDEwICogayk7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrID09PSAwKSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoayA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogTWF0aC5wb3coMTAyNCwgayAtIDEpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKC0gTWF0aC5wb3coMiwgLSAxMCAqIChrIC0gMSkpICsgMik7XG5cblx0XHR9XG5cblx0fSxcblxuXHRDaXJjdWxhcjoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAxIC0gTWF0aC5zcXJ0KDEgLSBrICogayk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gTWF0aC5zcXJ0KDEgLSAoLS1rICogaykpO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAtIDAuNSAqIChNYXRoLnNxcnQoMSAtIGsgKiBrKSAtIDEpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKE1hdGguc3FydCgxIC0gKGsgLT0gMikgKiBrKSArIDEpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0RWxhc3RpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrID09PSAwKSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoayA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIC1NYXRoLnBvdygyLCAxMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKGsgPT09IDApIHtcblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gTWF0aC5wb3coMiwgLTEwICogaykgKiBNYXRoLnNpbigoayAtIDAuMSkgKiA1ICogTWF0aC5QSSkgKyAxO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA9PT0gMCkge1xuXHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGsgPT09IDEpIHtcblx0XHRcdFx0cmV0dXJuIDE7XG5cdFx0XHR9XG5cblx0XHRcdGsgKj0gMjtcblxuXHRcdFx0aWYgKGsgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAtMC41ICogTWF0aC5wb3coMiwgMTAgKiAoayAtIDEpKSAqIE1hdGguc2luKChrIC0gMS4xKSAqIDUgKiBNYXRoLlBJKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDAuNSAqIE1hdGgucG93KDIsIC0xMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpICsgMTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdEJhY2s6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHR2YXIgcyA9IDEuNzAxNTg7XG5cblx0XHRcdHJldHVybiBrICogayAqICgocyArIDEpICogayAtIHMpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0dmFyIHMgPSAxLjcwMTU4O1xuXG5cdFx0XHRyZXR1cm4gLS1rICogayAqICgocyArIDEpICogayArIHMpICsgMTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0dmFyIHMgPSAxLjcwMTU4ICogMS41MjU7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIDAuNSAqIChrICogayAqICgocyArIDEpICogayAtIHMpKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDAuNSAqICgoayAtPSAyKSAqIGsgKiAoKHMgKyAxKSAqIGsgKyBzKSArIDIpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Qm91bmNlOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDEgLSBUV0VFTi5FYXNpbmcuQm91bmNlLk91dCgxIC0gayk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA8ICgxIC8gMi43NSkpIHtcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIGsgKiBrO1xuXHRcdFx0fSBlbHNlIGlmIChrIDwgKDIgLyAyLjc1KSkge1xuXHRcdFx0XHRyZXR1cm4gNy41NjI1ICogKGsgLT0gKDEuNSAvIDIuNzUpKSAqIGsgKyAwLjc1O1xuXHRcdFx0fSBlbHNlIGlmIChrIDwgKDIuNSAvIDIuNzUpKSB7XG5cdFx0XHRcdHJldHVybiA3LjU2MjUgKiAoayAtPSAoMi4yNSAvIDIuNzUpKSAqIGsgKyAwLjkzNzU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gNy41NjI1ICogKGsgLT0gKDIuNjI1IC8gMi43NSkpICogayArIDAuOTg0Mzc1O1xuXHRcdFx0fVxuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA8IDAuNSkge1xuXHRcdFx0XHRyZXR1cm4gVFdFRU4uRWFzaW5nLkJvdW5jZS5JbihrICogMikgKiAwLjU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBUV0VFTi5FYXNpbmcuQm91bmNlLk91dChrICogMiAtIDEpICogMC41ICsgMC41O1xuXG5cdFx0fVxuXG5cdH1cblxufTtcblxuVFdFRU4uSW50ZXJwb2xhdGlvbiA9IHtcblxuXHRMaW5lYXI6IGZ1bmN0aW9uICh2LCBrKSB7XG5cblx0XHR2YXIgbSA9IHYubGVuZ3RoIC0gMTtcblx0XHR2YXIgZiA9IG0gKiBrO1xuXHRcdHZhciBpID0gTWF0aC5mbG9vcihmKTtcblx0XHR2YXIgZm4gPSBUV0VFTi5JbnRlcnBvbGF0aW9uLlV0aWxzLkxpbmVhcjtcblxuXHRcdGlmIChrIDwgMCkge1xuXHRcdFx0cmV0dXJuIGZuKHZbMF0sIHZbMV0sIGYpO1xuXHRcdH1cblxuXHRcdGlmIChrID4gMSkge1xuXHRcdFx0cmV0dXJuIGZuKHZbbV0sIHZbbSAtIDFdLCBtIC0gZik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZuKHZbaV0sIHZbaSArIDEgPiBtID8gbSA6IGkgKyAxXSwgZiAtIGkpO1xuXG5cdH0sXG5cblx0QmV6aWVyOiBmdW5jdGlvbiAodiwgaykge1xuXG5cdFx0dmFyIGIgPSAwO1xuXHRcdHZhciBuID0gdi5sZW5ndGggLSAxO1xuXHRcdHZhciBwdyA9IE1hdGgucG93O1xuXHRcdHZhciBibiA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuQmVybnN0ZWluO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPD0gbjsgaSsrKSB7XG5cdFx0XHRiICs9IHB3KDEgLSBrLCBuIC0gaSkgKiBwdyhrLCBpKSAqIHZbaV0gKiBibihuLCBpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYjtcblxuXHR9LFxuXG5cdENhdG11bGxSb206IGZ1bmN0aW9uICh2LCBrKSB7XG5cblx0XHR2YXIgbSA9IHYubGVuZ3RoIC0gMTtcblx0XHR2YXIgZiA9IG0gKiBrO1xuXHRcdHZhciBpID0gTWF0aC5mbG9vcihmKTtcblx0XHR2YXIgZm4gPSBUV0VFTi5JbnRlcnBvbGF0aW9uLlV0aWxzLkNhdG11bGxSb207XG5cblx0XHRpZiAodlswXSA9PT0gdlttXSkge1xuXG5cdFx0XHRpZiAoayA8IDApIHtcblx0XHRcdFx0aSA9IE1hdGguZmxvb3IoZiA9IG0gKiAoMSArIGspKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZuKHZbKGkgLSAxICsgbSkgJSBtXSwgdltpXSwgdlsoaSArIDEpICUgbV0sIHZbKGkgKyAyKSAlIG1dLCBmIC0gaSk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRpZiAoayA8IDApIHtcblx0XHRcdFx0cmV0dXJuIHZbMF0gLSAoZm4odlswXSwgdlswXSwgdlsxXSwgdlsxXSwgLWYpIC0gdlswXSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrID4gMSkge1xuXHRcdFx0XHRyZXR1cm4gdlttXSAtIChmbih2W21dLCB2W21dLCB2W20gLSAxXSwgdlttIC0gMV0sIGYgLSBtKSAtIHZbbV0pO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZm4odltpID8gaSAtIDEgOiAwXSwgdltpXSwgdlttIDwgaSArIDEgPyBtIDogaSArIDFdLCB2W20gPCBpICsgMiA/IG0gOiBpICsgMl0sIGYgLSBpKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdFV0aWxzOiB7XG5cblx0XHRMaW5lYXI6IGZ1bmN0aW9uIChwMCwgcDEsIHQpIHtcblxuXHRcdFx0cmV0dXJuIChwMSAtIHAwKSAqIHQgKyBwMDtcblxuXHRcdH0sXG5cblx0XHRCZXJuc3RlaW46IGZ1bmN0aW9uIChuLCBpKSB7XG5cblx0XHRcdHZhciBmYyA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuRmFjdG9yaWFsO1xuXG5cdFx0XHRyZXR1cm4gZmMobikgLyBmYyhpKSAvIGZjKG4gLSBpKTtcblxuXHRcdH0sXG5cblx0XHRGYWN0b3JpYWw6IChmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHZhciBhID0gWzFdO1xuXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKG4pIHtcblxuXHRcdFx0XHR2YXIgcyA9IDE7XG5cblx0XHRcdFx0aWYgKGFbbl0pIHtcblx0XHRcdFx0XHRyZXR1cm4gYVtuXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvciAodmFyIGkgPSBuOyBpID4gMTsgaS0tKSB7XG5cdFx0XHRcdFx0cyAqPSBpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YVtuXSA9IHM7XG5cdFx0XHRcdHJldHVybiBzO1xuXG5cdFx0XHR9O1xuXG5cdFx0fSkoKSxcblxuXHRcdENhdG11bGxSb206IGZ1bmN0aW9uIChwMCwgcDEsIHAyLCBwMywgdCkge1xuXG5cdFx0XHR2YXIgdjAgPSAocDIgLSBwMCkgKiAwLjU7XG5cdFx0XHR2YXIgdjEgPSAocDMgLSBwMSkgKiAwLjU7XG5cdFx0XHR2YXIgdDIgPSB0ICogdDtcblx0XHRcdHZhciB0MyA9IHQgKiB0MjtcblxuXHRcdFx0cmV0dXJuICgyICogcDEgLSAyICogcDIgKyB2MCArIHYxKSAqIHQzICsgKC0gMyAqIHAxICsgMyAqIHAyIC0gMiAqIHYwIC0gdjEpICogdDIgKyB2MCAqIHQgKyBwMTtcblxuXHRcdH1cblxuXHR9XG5cbn07XG5cbi8vIFVNRCAoVW5pdmVyc2FsIE1vZHVsZSBEZWZpbml0aW9uKVxuKGZ1bmN0aW9uIChyb290KSB7XG5cblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gVFdFRU47XG5cdFx0fSk7XG5cblx0fSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcblxuXHRcdC8vIE5vZGUuanNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IFRXRUVOO1xuXG5cdH0gZWxzZSBpZiAocm9vdCAhPT0gdW5kZWZpbmVkKSB7XG5cblx0XHQvLyBHbG9iYWwgdmFyaWFibGVcblx0XHRyb290LlRXRUVOID0gVFdFRU47XG5cblx0fVxuXG59KSh0aGlzKTtcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKiBqc3BhbmVsLnNhc3M6IDIwMTgtMDUtMjAgMTM6MTMgKi9cXG4vKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMwNDIxNTcwL3Nhc3MtdW5pY29kZS1lc2NhcGUtaXMtbm90LXByZXNlcnZlZC1pbi1jc3MtZmlsZSAqL1xcbi5qc1BhbmVsIHtcXG4gIGJvcmRlcjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxuICBmb250LWZhbWlseTogXFxcIk9wZW4gU2Fuc1xcXCIsXFxcIkhlbHZldGljYSBOZXVlXFxcIixIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIG9wYWNpdHk6IDA7XFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIHotaW5kZXg6IDEwMDsgfVxcbiAgLmpzUGFuZWwgLmpzUGFuZWwtaGRyIHtcXG4gICAgYm9yZGVyOiAwO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiT3BlbiBTYW5zXFxcIixcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBmb250LXNpemU6IDFyZW07XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGZsZXgtc2hyaW5rOiAwOyB9XFxuICAuanNQYW5lbCAuanNQYW5lbC1jb250ZW50IHtcXG4gICAgYm9yZGVyOiAwO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiT3BlbiBTYW5zXFxcIixcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xcbiAgICBjb2xvcjogIzAwMDAwMDtcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcXG4gICAgb3ZlcmZsb3cteTogYXV0bztcXG4gICAgZmxleC1ncm93OiAxOyB9XFxuICAgIC5qc1BhbmVsIC5qc1BhbmVsLWNvbnRlbnQgcHJlIHtcXG4gICAgICBjb2xvcjogaW5oZXJpdDsgfVxcbiAgLmpzUGFuZWwgLmpzUGFuZWwtZnRyIHtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXG4gICAgZmxleC13cmFwOiBub3dyYXA7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZTBlMGUwO1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBmb250LXNpemU6IDFyZW07XFxuICAgIGhlaWdodDogYXV0bztcXG4gICAgYmFja2dyb3VuZDogI2Y1ZjVmNTtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgY29sb3I6IGJsYWNrO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuICAuanNQYW5lbCAuanNQYW5lbC1mdHIuYWN0aXZlIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1zaHJpbms6IDA7IH1cXG4gICAgLmpzUGFuZWwgLmpzUGFuZWwtZnRyLmFjdGl2ZSA+ICoge1xcbiAgICAgIG1hcmdpbjogM3B4IDhweDsgfVxcbiAgLmpzUGFuZWwgLmpzUGFuZWwtZnRyLnBhbmVsLWZvb3RlciB7XFxuICAgIHBhZGRpbmc6IDA7IH1cXG5cXG4uanNQYW5lbC1oZWFkZXJiYXIsIC5qc1BhbmVsLWhkci10b29sYmFyIHtcXG4gIGZvbnQtc2l6ZTogMXJlbTsgfVxcblxcbi5qc1BhbmVsLWhlYWRlcmJhciB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBmbGV4LXdyYXA6IG5vd3JhcDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cXG4gIC5qc1BhbmVsLWhlYWRlcmJhciBpbWcge1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgICBtYXgtaGVpZ2h0OiAzOHB4OyB9XFxuXFxuLmpzUGFuZWwtdGl0bGViYXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmbGV4LWdyb3c6IDE7XFxuICBjdXJzb3I6IG1vdmU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuICAuanNQYW5lbC10aXRsZWJhciAuanNQYW5lbC10aXRsZSB7XFxuICAgIGNvbG9yOiAjMDAwMDAwO1xcbiAgICBmb250LWZhbWlseTogXFxcIk9wZW4gU2Fuc1xcXCIsXFxcIkhlbHZldGljYSBOZXVlXFxcIixIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gICAgZm9udC12YXJpYW50OiBzbWFsbC1jYXBzO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBsaW5lLWhlaWdodDogMS41O1xcbiAgICBtYXJnaW46IDAgNXB4IDAgOHB4O1xcbiAgICBtaW4td2lkdGg6IDA7IH1cXG4gICAgLmpzUGFuZWwtdGl0bGViYXIgLmpzUGFuZWwtdGl0bGUgc21hbGwge1xcbiAgICAgIGZvbnQtc2l6ZTogNzAlO1xcbiAgICAgIGNvbG9yOiBpbmhlcml0OyB9XFxuXFxuLmpzUGFuZWwtdGl0bGViYXIuanNQYW5lbC1ydGwge1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlOyB9XFxuXFxuLmpzUGFuZWwtY29udHJvbGJhciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHRvdWNoLWFjdGlvbjogbm9uZTsgfVxcbiAgLmpzUGFuZWwtY29udHJvbGJhciBkaXYgc3Bhbjpob3ZlciwgLmpzUGFuZWwtY29udHJvbGJhciBkaXYgc3ZnOmhvdmVyIHtcXG4gICAgb3BhY2l0eTogLjY7IH1cXG4gIC5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB0b3VjaC1hY3Rpb246IG5vbmU7IH1cXG4gICAgLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4gc3BhbiB7XFxuICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgICBwYWRkaW5nOiAwIDRweCAwIDJweDsgfVxcbiAgICAuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0biBzcGFuLmdseXBoaWNvbiB7XFxuICAgICAgcGFkZGluZzogMCAycHg7IH1cXG4gICAgLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4gc3ZnIHtcXG4gICAgICBtYXJnaW46IDAgOHB4IDAgM3B4OyB9XFxuICAgIC5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuIC5qc1BhbmVsLWljb24ge1xcbiAgICAgIHBhZGRpbmctdG9wOiA5cHg7XFxuICAgICAgbWFyZ2luOiAwIDRweCAwIDA7IH1cXG4gIC5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZSwgLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4tc21hbGxpZnlyZXYge1xcbiAgICBkaXNwbGF5OiBub25lOyB9XFxuXFxuLmpzUGFuZWwtaGRyLXRvb2xiYXIge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHdpZHRoOiBhdXRvO1xcbiAgaGVpZ2h0OiBhdXRvO1xcbiAgZm9udC1zaXplOiAxcmVtOyB9XFxuXFxuLmpzUGFuZWwtaGRyLXRvb2xiYXIuYWN0aXZlIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGZsZXgtd3JhcDogbm93cmFwO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjsgfVxcbiAgLmpzUGFuZWwtaGRyLXRvb2xiYXIuYWN0aXZlID4gKiB7XFxuICAgIG1hcmdpbjogM3B4IDhweDsgfVxcblxcbi8qIHN0eWxlcyBmb3IgcGFuZWxzIHVzaW5nIG9wdGlvbi5ydGwgKi9cXG4uanNQYW5lbC1oZWFkZXJiYXIuanNQYW5lbC1ydGwsIC5qc1BhbmVsLWNvbnRyb2xiYXIuanNQYW5lbC1ydGwsIC5qc1BhbmVsLWhkci10b29sYmFyLmpzUGFuZWwtcnRsIHtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3ctcmV2ZXJzZTsgfVxcblxcbi5qc1BhbmVsLWhkci10b29sYmFyLmFjdGl2ZS5qc1BhbmVsLXJ0bCB7XFxuICBwYWRkaW5nOiA3cHggMCAxMHB4IDA7IH1cXG5cXG4uanNQYW5lbC1mdHIuanNQYW5lbC1ydGwge1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdzsgfVxcblxcbi8qIGNvbnRhaW5lciB0aGF0IHRha2VzIHRoZSBtaW5pZmllZCBqc1BhbmVscyAqL1xcbiNqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lciwgLmpzUGFuZWwtbWluaW1pemVkLWJveCwgLmpzUGFuZWwtbWluaW1pemVkLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1mbG93OiByb3cgd3JhcC1yZXZlcnNlO1xcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgbm9uZSByZXBlYXQgc2Nyb2xsIDAgMDtcXG4gIGJvdHRvbTogMDtcXG4gIGhlaWdodDogYXV0bztcXG4gIGxlZnQ6IDA7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB3aWR0aDogYXV0bztcXG4gIHotaW5kZXg6IDk5OTg7IH1cXG4gICNqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCwgLmpzUGFuZWwtbWluaW1pemVkLWJveCAuanNQYW5lbC1yZXBsYWNlbWVudCwgLmpzUGFuZWwtbWluaW1pemVkLWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHdpZHRoOiAyMDBweDtcXG4gICAgaGVpZ2h0OiA0MHB4O1xcbiAgICBtYXJnaW46IDFweCAxcHggMCAwO1xcbiAgICB6LWluZGV4OiA5OTk5OyB9XFxuICAgICNqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1oZHIsIC5qc1BhbmVsLW1pbmltaXplZC1ib3ggLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtaGRyLCAuanNQYW5lbC1taW5pbWl6ZWQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWhkciB7XFxuICAgICAgZmxleC1ncm93OiAxO1xcbiAgICAgIG1pbi13aWR0aDogMDtcXG4gICAgICBwYWRkaW5nOiAwOyB9XFxuICAgICAgI2pzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZWFkZXJsb2dvLCAuanNQYW5lbC1taW5pbWl6ZWQtYm94IC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZWFkZXJsb2dvLCAuanNQYW5lbC1taW5pbWl6ZWQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZWFkZXJsb2dvIHtcXG4gICAgICAgIG1heC13aWR0aDogNTAlO1xcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgICAgICAgI2pzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZWFkZXJsb2dvIGltZywgLmpzUGFuZWwtbWluaW1pemVkLWJveCAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGVhZGVybG9nbyBpbWcsIC5qc1BhbmVsLW1pbmltaXplZC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhlYWRlcmxvZ28gaW1nIHtcXG4gICAgICAgICAgbWF4LXdpZHRoOiAxMDBweDtcXG4gICAgICAgICAgbWF4LWhlaWdodDogMzhweDsgfVxcbiAgICAjanNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtdGl0bGViYXIsIC5qc1BhbmVsLW1pbmltaXplZC1ib3ggLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtdGl0bGViYXIsIC5qc1BhbmVsLW1pbmltaXplZC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtdGl0bGViYXIge1xcbiAgICAgIGN1cnNvcjogZGVmYXVsdDtcXG4gICAgICBtaW4td2lkdGg6IDA7IH1cXG4gICAgI2pzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWJ0bi5qc1BhbmVsLWJ0bi1ub3JtYWxpemUsIC5qc1BhbmVsLW1pbmltaXplZC1ib3ggLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtYnRuLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZSwgLmpzUGFuZWwtbWluaW1pemVkLWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1idG4uanNQYW5lbC1idG4tbm9ybWFsaXplIHtcXG4gICAgICBkaXNwbGF5OiBibG9jazsgfVxcblxcbi5qc1BhbmVsLW1pbmltaXplZC1ib3gsIC5qc1BhbmVsLW1pbmltaXplZC1jb250YWluZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuXFxuLyogaGVscGVyIGNsYXNzZXMgdG8gbWFrZSAuanNQYW5lbC1jb250ZW50IGEgZmxleCBib3ggKi9cXG4uZmxleE9uZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1mbG93OiByb3cgd3JhcDsgfVxcblxcbi8qIGNzcyBmb3IgcmVzaXplaXQgaGFuZGxlcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtcmVzaXplaXQtaGFuZGxlIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgZm9udC1zaXplOiAwLjFweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvdWNoLWFjdGlvbjogbm9uZTsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LW4ge1xcbiAgY3Vyc29yOiBuLXJlc2l6ZTtcXG4gIGhlaWdodDogMTJweDtcXG4gIGxlZnQ6IDlweDtcXG4gIHRvcDogLTVweDtcXG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAxOHB4KTsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LWUge1xcbiAgY3Vyc29yOiBlLXJlc2l6ZTtcXG4gIGhlaWdodDogY2FsYygxMDAlIC0gMThweCk7XFxuICByaWdodDogLTlweDtcXG4gIHRvcDogOXB4O1xcbiAgd2lkdGg6IDEycHg7IH1cXG5cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUuanNQYW5lbC1yZXNpemVpdC1zIHtcXG4gIGJvdHRvbTogLTlweDtcXG4gIGN1cnNvcjogcy1yZXNpemU7XFxuICBoZWlnaHQ6IDEycHg7XFxuICBsZWZ0OiA5cHg7XFxuICB3aWR0aDogY2FsYygxMDAlIC0gMThweCk7IH1cXG5cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUuanNQYW5lbC1yZXNpemVpdC13IHtcXG4gIGN1cnNvcjogdy1yZXNpemU7XFxuICBoZWlnaHQ6IGNhbGMoMTAwJSAtIDE4cHgpO1xcbiAgbGVmdDogLTlweDtcXG4gIHRvcDogOXB4O1xcbiAgd2lkdGg6IDEycHg7IH1cXG5cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUuanNQYW5lbC1yZXNpemVpdC1uZSB7XFxuICBjdXJzb3I6IG5lLXJlc2l6ZTtcXG4gIGhlaWdodDogMThweDtcXG4gIHJpZ2h0OiAtOXB4O1xcbiAgdG9wOiAtOXB4O1xcbiAgd2lkdGg6IDE4cHg7IH1cXG5cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUuanNQYW5lbC1yZXNpemVpdC1zZSB7XFxuICBib3R0b206IC05cHg7XFxuICBjdXJzb3I6IHNlLXJlc2l6ZTtcXG4gIGhlaWdodDogMThweDtcXG4gIHJpZ2h0OiAtOXB4O1xcbiAgd2lkdGg6IDE4cHg7IH1cXG5cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUuanNQYW5lbC1yZXNpemVpdC1zdyB7XFxuICBib3R0b206IC05cHg7XFxuICBjdXJzb3I6IHN3LXJlc2l6ZTtcXG4gIGhlaWdodDogMThweDtcXG4gIGxlZnQ6IC05cHg7XFxuICB3aWR0aDogMThweDsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LW53IHtcXG4gIGN1cnNvcjogbnctcmVzaXplO1xcbiAgaGVpZ2h0OiAxOHB4O1xcbiAgbGVmdDogLTlweDtcXG4gIHRvcDogLTlweDtcXG4gIHdpZHRoOiAxOHB4OyB9XFxuXFxuLmpzUGFuZWwtZHJhZy1vdmVybGF5IHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMDsgfVxcblxcbi8qIGJveC1zaGFkb3dzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcbi5qc1BhbmVsLWRlcHRoLTEge1xcbiAgYm94LXNoYWRvdzogMCAzcHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xNiksIDAgM3B4IDZweCByZ2JhKDAsIDAsIDAsIDAuMjMpOyB9XFxuXFxuLmpzUGFuZWwtZGVwdGgtMiB7XFxuICBib3gtc2hhZG93OiAwIDEwcHggMjBweCByZ2JhKDAsIDAsIDAsIDAuMTkpLCAwIDZweCA2cHggcmdiYSgwLCAwLCAwLCAwLjIzKTsgfVxcblxcbi5qc1BhbmVsLWRlcHRoLTMge1xcbiAgYm94LXNoYWRvdzogMCAxNHB4IDI4cHggcmdiYSgwLCAwLCAwLCAwLjI1KSwgMCAxMHB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjIyKTsgfVxcblxcbi5qc1BhbmVsLWRlcHRoLTQge1xcbiAgYm94LXNoYWRvdzogMCAxOXB4IDM4cHggcmdiYSgwLCAwLCAwLCAwLjMpLCAwIDE1cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMjIpOyB9XFxuXFxuLmpzUGFuZWwtZGVwdGgtNSB7XFxuICBib3gtc2hhZG93OiAwIDI0cHggNDhweCByZ2JhKDAsIDAsIDAsIDAuMyksIDAgMjBweCAxNHB4IHJnYmEoMCwgMCwgMCwgMC4yMik7IH1cXG5cXG4vKiBzbmFwIHNlbnNpdGl2ZSBhcmVhcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXG4uanNQYW5lbC1zbmFwLWFyZWEge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgYmFja2dyb3VuZDogYmxhY2s7XFxuICBvcGFjaXR5OiAuMjtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHNpbHZlcjtcXG4gIGJveC1zaGFkb3c6IDAgMTRweCAyOHB4IHJnYmEoMCwgMCwgMCwgMC41KSwgMCAxMHB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgei1pbmRleDogOTk5OTsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1sdCwgLmpzUGFuZWwtc25hcC1hcmVhLWxjLCAuanNQYW5lbC1zbmFwLWFyZWEtbGIge1xcbiAgbGVmdDogMDsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1jdCwgLmpzUGFuZWwtc25hcC1hcmVhLWNiIHtcXG4gIGxlZnQ6IDM3LjUlOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLXJ0LCAuanNQYW5lbC1zbmFwLWFyZWEtcmMsIC5qc1BhbmVsLXNuYXAtYXJlYS1yYiB7XFxuICByaWdodDogMDsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1sdCwgLmpzUGFuZWwtc25hcC1hcmVhLWN0LCAuanNQYW5lbC1zbmFwLWFyZWEtcnQge1xcbiAgdG9wOiAwOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWxjLCAuanNQYW5lbC1zbmFwLWFyZWEtcmMge1xcbiAgdG9wOiAzNy41JTsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1sYiwgLmpzUGFuZWwtc25hcC1hcmVhLWNiLCAuanNQYW5lbC1zbmFwLWFyZWEtcmIge1xcbiAgYm90dG9tOiAwOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWN0LCAuanNQYW5lbC1zbmFwLWFyZWEtY2Ige1xcbiAgd2lkdGg6IDI1JTsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1sYywgLmpzUGFuZWwtc25hcC1hcmVhLXJjIHtcXG4gIGhlaWdodDogMjUlOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWx0IHtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMDAlOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLXJ0IHtcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEwMCU7IH1cXG5cXG4uanNQYW5lbC1zbmFwLWFyZWEtcmIge1xcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTAwJTsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1sYiB7XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTAwJTsgfVxcblxcbi8qIHRvb2x0aXAgYW5kIHRvb2x0aXAgY29ubmVjdG9ycyAqL1xcbi5qc1BhbmVsLWNvbm5lY3Rvci1sZWZ0LXRvcCwgLmpzUGFuZWwtY29ubmVjdG9yLXJpZ2h0LXRvcCwgLmpzUGFuZWwtY29ubmVjdG9yLWxlZnQtYm90dG9tLCAuanNQYW5lbC1jb25uZWN0b3ItcmlnaHQtYm90dG9tIHtcXG4gIHdpZHRoOiAxMnB4O1xcbiAgaGVpZ2h0OiAxMnB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlOyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLWxlZnQsIC5qc1BhbmVsLWNvbm5lY3Rvci10b3AsIC5qc1BhbmVsLWNvbm5lY3Rvci1ib3R0b20sIC5qc1BhbmVsLWNvbm5lY3Rvci1yaWdodCB7XFxuICB3aWR0aDogMDtcXG4gIGhlaWdodDogMDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvcmRlcjogMTJweCBzb2xpZCB0cmFuc3BhcmVudDsgfVxcblxcbi5qc1BhbmVsLWNvbm5lY3Rvci1sZWZ0LXRvcCB7XFxuICBsZWZ0OiBjYWxjKDEwMCUgLSA2cHgpO1xcbiAgdG9wOiBjYWxjKDEwMCUgLSA2cHgpOyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLXJpZ2h0LXRvcCB7XFxuICBsZWZ0OiAtNnB4O1xcbiAgdG9wOiBjYWxjKDEwMCUgLSA2cHgpOyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLXJpZ2h0LWJvdHRvbSB7XFxuICBsZWZ0OiAtNnB4O1xcbiAgdG9wOiAtNnB4OyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLWxlZnQtYm90dG9tIHtcXG4gIGxlZnQ6IGNhbGMoMTAwJSAtIDZweCk7XFxuICB0b3A6IC02cHg7IH1cXG5cXG4uanNQYW5lbC1jb25uZWN0b3ItdG9wIHtcXG4gIGxlZnQ6IGNhbGMoNTAlIC0gMTJweCk7XFxuICB0b3A6IDEwMCU7IH1cXG5cXG4uanNQYW5lbC1jb25uZWN0b3ItcmlnaHQge1xcbiAgbGVmdDogLTI0cHg7XFxuICB0b3A6IGNhbGMoNTAlIC0gMTJweCk7IH1cXG5cXG4uanNQYW5lbC1jb25uZWN0b3ItYm90dG9tIHtcXG4gIGxlZnQ6IGNhbGMoNTAlIC0gMTJweCk7XFxuICB0b3A6IC0yNHB4OyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLWxlZnQge1xcbiAgbGVmdDogMTAwJTtcXG4gIHRvcDogY2FsYyg1MCUgLSAxMnB4KTsgfVxcblxcbi8qIElFMTEgQ1NTIHN0eWxlcyBnbyBoZXJlICovXFxuQG1lZGlhIGFsbCBhbmQgKC1tcy1oaWdoLWNvbnRyYXN0OiBub25lKSwgKC1tcy1oaWdoLWNvbnRyYXN0OiBhY3RpdmUpIHtcXG4gICNqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC10aXRsZWJhciB7XFxuICAgIG1heC13aWR0aDogMTA1cHg7IH0gfVxcblxcbi8qIFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYICovXFxuLyogYm9vdHN0cmFwIGFkanVzdG1lbnRzICovXFxuLmpzUGFuZWwucGFuZWwtZGVmYXVsdCwgLmpzUGFuZWwucGFuZWwtcHJpbWFyeSwgLmpzUGFuZWwucGFuZWwtaW5mbywgLmpzUGFuZWwucGFuZWwtc3VjY2VzcywgLmpzUGFuZWwucGFuZWwtd2FybmluZywgLmpzUGFuZWwucGFuZWwtZGFuZ2VyLCAuanNQYW5lbC5jYXJkLmNhcmQtaW52ZXJzZSB7XFxuICBib3gtc2hhZG93OiAwIDAgNnB4IHJnYmEoMCwgMzMsIDUwLCAwLjEpLCAwIDdweCAyNXB4IHJnYmEoMTcsIDM4LCA2MCwgMC40KTsgfVxcblxcbi5qc1BhbmVsLnBhbmVsIHtcXG4gIG1hcmdpbjogMDsgfVxcblxcbi5qc1BhbmVsLWhkci5wYW5lbC1oZWFkaW5nIHtcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7XFxuICBwYWRkaW5nOiAwOyB9XFxuXFxuLmpzUGFuZWwtdGl0bGUucGFuZWwtdGl0bGUgLnNtYWxsLCAuanNQYW5lbC10aXRsZS5wYW5lbC10aXRsZSBzbWFsbCB7XFxuICBmb250LXNpemU6IDc1JTsgfVxcblxcbi8qIGJvb3RzdHJhcCA0IGFkanVzdG1lbnRzICovXFxuLmpzUGFuZWwuY2FyZC5jYXJkLWludmVyc2Uge1xcbiAgYm94LXNoYWRvdzogMCAwIDZweCByZ2JhKDAsIDMzLCA1MCwgMC4xKSwgMCA3cHggMjVweCByZ2JhKDE3LCAzOCwgNjAsIDAuNCk7IH1cXG5cXG4uY2FyZC1kZWZhdWx0IHtcXG4gIGJhY2tncm91bmQ6ICNmNWY1ZjU7IH1cXG5cXG4uY2FyZC1wcmltYXJ5ID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkLFxcbi5jYXJkLXN1Y2Nlc3MgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQsXFxuLmNhcmQtaW5mbyA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCxcXG4uY2FyZC13YXJuaW5nID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkLFxcbi5jYXJkLWRhbmdlciA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCB7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yOiAjZjVmNWY1OyB9XFxuXFxuLmNhcmQtZGVmYXVsdCA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCB7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLyogY3NzMyBhbmltYXRpb25zICovXFxuQGtleWZyYW1lcyBqc1BhbmVsRmFkZUluIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbi5qc1BhbmVsRmFkZUluIHtcXG4gIG9wYWNpdHk6IDA7XFxuICBhbmltYXRpb246IGpzUGFuZWxGYWRlSW4gZWFzZS1pbiAxO1xcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDYwMG1zOyB9XFxuXFxuQGtleWZyYW1lcyBqc1BhbmVsRmFkZU91dCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwOyB9IH1cXG5cXG4uanNQYW5lbEZhZGVPdXQge1xcbiAgYW5pbWF0aW9uOiBqc1BhbmVsRmFkZU91dCBlYXNlLWluIDE7XFxuICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogNjAwbXM7IH1cXG5cXG5Aa2V5ZnJhbWVzIG1vZGFsQmFja2Ryb3BGYWRlSW4ge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMC42NTsgfSB9XFxuXFxuLmpzUGFuZWwtbW9kYWwtYmFja2Ryb3Age1xcbiAgYW5pbWF0aW9uOiBtb2RhbEJhY2tkcm9wRmFkZUluIGVhc2UtaW4gMTtcXG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiA3NTBtcztcXG4gIGJhY2tncm91bmQ6IGJsYWNrO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlOyB9XFxuXFxuQGtleWZyYW1lcyBtb2RhbEJhY2tkcm9wRmFkZU91dCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMC42NTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwOyB9IH1cXG5cXG4uanNQYW5lbC1tb2RhbC1iYWNrZHJvcC1vdXQge1xcbiAgYW5pbWF0aW9uOiBtb2RhbEJhY2tkcm9wRmFkZU91dCBlYXNlLWluIDE7XFxuICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogNDAwbXM7IH1cXG5cXG4uanNQYW5lbC1tb2RhbC1iYWNrZHJvcC1tdWx0aSB7XFxuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMTUpOyB9XFxuXFxuLmpzUGFuZWwtY29udGVudCAuanNQYW5lbC1pZnJhbWUtb3ZlcmxheSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50OyB9XFxuXFxuLyogX3RoZW1lc19tZGwuc2FzczogMjAxNy0wNy0xMiAxOToxNiAqL1xcbi8qIGRlZmF1bHQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcbi5qc1BhbmVsLXRoZW1lLWRlZmF1bHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NmZDhkYztcXG4gIGJvcmRlci1jb2xvcjogI2NmZDhkYzsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRlZmF1bHQgPiAuanNQYW5lbC1oZHIgKiB7XFxuICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRlZmF1bHQgPiAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGRyLXRvb2xiYXIge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM5MGE0YWU7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1kZWZhdWx0ID4gLmpzUGFuZWwtY29udGVudCB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzkwYTRhZTsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRlZmF1bHQgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NmZDhkYztcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjOTBhNGFlOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtZGVmYXVsdCA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZGxpZ2h0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlY2VmZjE7IH1cXG5cXG4vKiBwcmltYXJ5IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXG4uanNQYW5lbC10aGVtZS1wcmltYXJ5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMTk2ZjM7XFxuICBib3JkZXItY29sb3I6ICMyMTk2ZjM7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1wcmltYXJ5ID4gLmpzUGFuZWwtaGRyICoge1xcbiAgY29sb3I6ICNmZmZmZmY7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1wcmltYXJ5ID4gLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhkci10b29sYmFyIHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNDJhNWY1OyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtcHJpbWFyeSA+IC5qc1BhbmVsLWNvbnRlbnQge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM0MmE1ZjU7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1wcmltYXJ5ID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMTk2ZjM7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzQyYTVmNTtcXG4gIGNvbG9yOiAjZmZmZmZmOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtcHJpbWFyeSA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZGxpZ2h0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNiYmRlZmI7XFxuICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi8qIGluZm8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcbi5qc1BhbmVsLXRoZW1lLWluZm8ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI5YjZmNjtcXG4gIGJvcmRlci1jb2xvcjogIzI5YjZmNjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWluZm8gPiAuanNQYW5lbC1oZHIgKiB7XFxuICBjb2xvcjogI2ZmZmZmZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWluZm8gPiAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGRyLXRvb2xiYXIge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM0ZmMzZjc7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1pbmZvID4gLmpzUGFuZWwtY29udGVudCB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzRmYzNmNzsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWluZm8gPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI5YjZmNjtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNGZjM2Y3O1xcbiAgY29sb3I6ICNmZmZmZmY7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1pbmZvID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkbGlnaHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UxZjVmZTtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLyogc3VjY2VzcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtdGhlbWUtc3VjY2VzcyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGNhZjUwO1xcbiAgYm9yZGVyLWNvbG9yOiAjNGNhZjUwOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtc3VjY2VzcyA+IC5qc1BhbmVsLWhkciAqIHtcXG4gIGNvbG9yOiAjZmZmZmZmOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtc3VjY2VzcyA+IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZHItdG9vbGJhciB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzgxYzc4NDsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXN1Y2Nlc3MgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRjYWY1MDtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjODFjNzg0O1xcbiAgY29sb3I6ICNmZmZmZmY7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1zdWNjZXNzID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkbGlnaHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U4ZjVlOTtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLyogd2FybmluZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtdGhlbWUtd2FybmluZyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZjMTA3O1xcbiAgYm9yZGVyLWNvbG9yOiAjZmZjMTA3OyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtd2FybmluZyA+IC5qc1BhbmVsLWhkciAqIHtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtd2FybmluZyA+IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZHItdG9vbGJhciB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgI2ZmZDU0ZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXdhcm5pbmcgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYzEwNztcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZmZkNTRmO1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4uanNQYW5lbC10aGVtZS13YXJuaW5nID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkbGlnaHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjNlMDtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLyogZGFuZ2VyIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtdGhlbWUtZGFuZ2VyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjNkMDA7XFxuICBib3JkZXItY29sb3I6ICNmZjNkMDA7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1kYW5nZXIgPiAuanNQYW5lbC1oZHIgKiB7XFxuICBjb2xvcjogI2ZmZmZmZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRhbmdlciA+IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZHItdG9vbGJhciB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgI2ZmNmU0MDsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRhbmdlciA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYzZDAwO1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmZjZlNDA7XFxuICBjb2xvcjogI2ZmZmZmZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRhbmdlciA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZGxpZ2h0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjllODA7XFxuICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LW5vaGVhZGVyIHtcXG4gIGJvcmRlcjogbm9uZSAhaW1wb3J0YW50OyB9XFxuXFxuYm9keSB7XFxuICAtbXMtb3ZlcmZsb3ctc3R5bGU6IHNjcm9sbGJhcjsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI2J1dHRwbHVnZGV2dG9vbHNsb2dwYW5lbCB7XFxuICAgIGRpc3BsYXk6ZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246Y29sdW1uO1xcbiAgICB3aWR0aDoxMDAlO1xcbiAgICBoZWlnaHQ6MTAwJTtcXG4gICAgYWxpZ24taXRlbXM6Y2VudGVyO1xcbiAgICBjb2xvcjogIzAwMDtcXG59XFxuXFxuI2J1dHRwbHVnZGV2dG9vbHNsb2dwYW5lbCBpbnB1dCxzZWxlY3QsdGV4dGFyZWEge1xcbiAgICBjb2xvcjogIzAwMDtcXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcXG59XFxuXFxuI2J1dHRwbHVnZGV2dG9vbHNsb2dwYW5lbCAjYnV0dHBsdWdkZXZ0b29sc2xvZ3RleHRhcmVhIHtcXG4gICAgZm9udC1zaXplOiA4cHQ7XFxuICAgIHdpZHRoOjEwMCU7XFxuICAgIGZsZXg6MSAxO1xcbiAgICBwYWRkaW5nOjVweDtcXG4gICAgYm94LXNpemluZzpib3JkZXItYm94O1xcbn1cXG4jYnV0dHBsdWdkZXZ0b29sc2xvZ3BhbmVsICNidXR0cGx1Z2RldnRvb2xzbG9nbGV2ZWwge1xcbiAgICB3aWR0aDo5OCU7XFxuICAgIGZsZXg6bm9uZTtcXG4gICAgcGFkZGluZzo1cHg7XFxuICAgIGJveC1zaXppbmc6Ym9yZGVyLWJveDtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJidXR0cGx1Zy1kZXZ0b29scy1tYWluIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG59XFxuXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiBzZWN0aW9uIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgcGFkZGluZzogMjBweDtcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkZGQ7XFxufVxcblxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gaW5wdXQge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG5idXR0cGx1Zy1kZXZ0b29scy1tYWluIGxhYmVsIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBtYXJnaW46IDAgMCAtMXB4O1xcbiAgICBwYWRkaW5nOiA1cHggMTBweDtcXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBjb2xvcjogI2JiYjtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XFxufVxcblxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gbGFiZWw6YmVmb3JlIHtcXG4gICAgZm9udC1mYW1pbHk6IGZvbnRhd2Vzb21lO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxufVxcblxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gbGFiZWw6aG92ZXIge1xcbiAgICBjb2xvcjogIzg4ODtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG5idXR0cGx1Zy1kZXZ0b29scy1tYWluIGlucHV0OmNoZWNrZWQgKyBsYWJlbCB7XFxuICAgIGNvbG9yOiAjNTU1O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xcbiAgICBib3JkZXItdG9wOiAycHggc29saWQgb3JhbmdlO1xcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2ZmZjtcXG59XFxuXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiAjdGFiMTpjaGVja2VkIH4gI2NvbnRlbnQxLFxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gI3RhYjI6Y2hlY2tlZCB+ICNjb250ZW50MixcXG5idXR0cGx1Zy1kZXZ0b29scy1tYWluICN0YWIzOmNoZWNrZWQgfiAjY29udGVudDMsXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiAjdGFiNDpjaGVja2VkIH4gI2NvbnRlbnQ0IHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gI2NvbnRlbnQxIHtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG5idXR0cGx1Zy1kZXZ0b29scy1tYWluICNjb250ZW50MiB7XFxuICAgIGhlaWdodDogMTAwJTtcXG59XFxuXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiAjc2ltdWxhdG9yIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogY2FsYygxMDAlIC0gNjBweCk7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxufVxcblxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gLmZsZXNobGlnaHQtc2ltIHtcXG4gICAgZmxleDogMTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gZGl2LmMtZmxlc2hsaWdodCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXg6IDE7XFxufVxcblxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gZGl2LmMtZmxlc2hsaWdodCBpbWcge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHdpZHRoOiBhdXRvO1xcblxcdCAgaW1hZ2UtcmVuZGVyaW5nOiAtbW96LWNyaXNwLWVkZ2VzO1xcblxcdCAgaW1hZ2UtcmVuZGVyaW5nOiAtby1jcmlzcC1lZGdlcztcXG5cXHQgIGltYWdlLXJlbmRlcmluZzogLXdlYmtpdC1vcHRpbWl6ZS1jb250cmFzdDtcXG5cXHQgIGltYWdlLXJlbmRlcmluZzogcGl4ZWxhdGVkO1xcbn1cXG5cXG5idXR0cGx1Zy1kZXZ0b29scy1tYWluIGRpdi5jLWZsZXNobGlnaHQgLm8tZmxlc2hsaWdodCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgaGVpZ2h0OiA3NyU7XFxufVxcblxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gLnZpYnJhdG9yLXNpbXVsYXRvci1jb21wb25lbnQge1xcbiAgICBmbGV4OiAxO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiBkaXYudmlicmF0b3Ige1xcbiAgICBmbGV4OiAxIDE7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gZGl2LnZpYnJhdG9yLXNpbXVsYXRvci1jb21wb25lbnQgaW1nIHtcXG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSA0MHB4KTtcXG4gICAgd2lkdGg6IGF1dG87XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgaW1hZ2UtcmVuZGVyaW5nOiAtbW96LWNyaXNwLWVkZ2VzO1xcblxcdCAgaW1hZ2UtcmVuZGVyaW5nOiAtby1jcmlzcC1lZGdlcztcXG5cXHQgIGltYWdlLXJlbmRlcmluZzogLXdlYmtpdC1vcHRpbWl6ZS1jb250cmFzdDtcXG5cXHQgIGltYWdlLXJlbmRlcmluZzogcGl4ZWxhdGVkO1xcbn1cXG5cXG5idXR0cGx1Zy1kZXZ0b29scy1tYWluIGRpdi52aWJyYXRvci1pbmZvIHtcXG4gICAgZmxleDogMDtcXG59XFxuXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiAuc2ltdWxhdG9yLWRpdmlkZXIge1xcbiAgICBib3JkZXItbGVmdDogMXB4ICMwMDAgZGFzaGVkO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxufVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24obikge1xuICBpZiAoIWlzTnVtYmVyKG4pIHx8IG4gPCAwIHx8IGlzTmFOKG4pKVxuICAgIHRocm93IFR5cGVFcnJvcignbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cy5lcnJvciB8fFxuICAgICAgICAoaXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSAmJiAhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpIHtcbiAgICAgIGVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuICgnICsgZXIgKyAnKScpO1xuICAgICAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNVbmRlZmluZWQoaGFuZGxlcikpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgICBjYXNlIDE6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBzbG93ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc09iamVjdChoYW5kbGVyKSkge1xuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBtO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gIGlmICh0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgIGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpID9cbiAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gIGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZVxuICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcblxuICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSAmJiAhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xuICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSkge1xuICAgICAgbSA9IHRoaXMuX21heExpc3RlbmVycztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICAgIH1cblxuICAgIGlmIChtICYmIG0gPiAwICYmIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGggPiBtKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnRyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQgaW4gSUUgMTBcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICB2YXIgZmlyZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBnKCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG5cbiAgICBpZiAoIWZpcmVkKSB7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGcubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgdGhpcy5vbih0eXBlLCBnKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZmYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGxpc3QsIHBvc2l0aW9uLCBsZW5ndGgsIGk7XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgbGlzdCA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHBvc2l0aW9uID0gLTE7XG5cbiAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8XG4gICAgICAoaXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QobGlzdCkpIHtcbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgICAobGlzdFtpXS5saXN0ZW5lciAmJiBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBrZXksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICByZXR1cm4gdGhpcztcblxuICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gIGlmICghdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICBlbHNlIGlmICh0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgZm9yIChrZXkgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGxpc3RlbmVycykpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gIH0gZWxzZSBpZiAobGlzdGVuZXJzKSB7XG4gICAgLy8gTElGTyBvcmRlclxuICAgIHdoaWxlIChsaXN0ZW5lcnMubGVuZ3RoKVxuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gW107XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgZWxzZVxuICAgIHJldCA9IHRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO1xuICByZXR1cm4gcmV0O1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24odHlwZSkge1xuICBpZiAodGhpcy5fZXZlbnRzKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgICBpZiAoaXNGdW5jdGlvbihldmxpc3RlbmVyKSlcbiAgICAgIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKGV2bGlzdGVuZXIpXG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIDA7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbn07XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbiIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vanNwYW5lbC5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL2pzcGFuZWwuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL2pzcGFuZWwuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiJ3VzZSBzdHJpY3QnO2V4cG9ydCBjb25zdCBqc1BhbmVsPXt2ZXJzaW9uOic0LjAuMCcsZGF0ZTonMjAxOC0wNS0yMiAwOTowOScsYWpheEFsd2F5c0NhbGxiYWNrczpbXSxhdXRvcG9zaXRpb25TcGFjaW5nOjQsY2xvc2VPbkVzY2FwZTooKCk9Pntkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJyxuPT57KCdFc2NhcGUnPT09bi5rZXl8fCdFc2MnPT09bi5jb2RlfHwyNz09PW4ua2V5Q29kZSkmJmpzUGFuZWwuZ2V0UGFuZWxzKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdqc1BhbmVsJyl9KS5zb21lKG89PntyZXR1cm4hIW8ub3B0aW9ucy5jbG9zZU9uRXNjYXBlJiYoby5jbG9zZSgpLCEwKX0pfSwhMSl9KSgpLGRlZmF1bHRzOntib3hTaGFkb3c6Myxjb250YWluZXI6ZG9jdW1lbnQuYm9keSxjb250ZW50U2l6ZTp7d2lkdGg6JzQwMHB4JyxoZWlnaHQ6JzIwMHB4J30sZHJhZ2l0OntjdXJzb3I6J21vdmUnLGhhbmRsZXM6Jy5qc1BhbmVsLWhlYWRlcmxvZ28sIC5qc1BhbmVsLXRpdGxlYmFyLCAuanNQYW5lbC1mdHInLG9wYWNpdHk6MC44LGRpc2FibGVPbk1heGltaXplZDohMH0saGVhZGVyOiEwLGhlYWRlclRpdGxlOidqc1BhbmVsJyxoZWFkZXJDb250cm9sczonYWxsJyxpY29uZm9udDohMSxtYXhpbWl6ZWRNYXJnaW46MCxtaW5pbWl6ZVRvOidkZWZhdWx0JyxwYW5lbHR5cGU6J3N0YW5kYXJkJyxwb3NpdGlvbjonY2VudGVyJyxyZXNpemVpdDp7aGFuZGxlczonbiwgZSwgcywgdywgbmUsIHNlLCBzdywgbncnLG1pbldpZHRoOjEyOCxtaW5IZWlnaHQ6MTI4fSx0aGVtZTonZGVmYXVsdCd9LGRlZmF1bHRTbmFwQ29uZmlnOntzZW5zaXRpdml0eTo3MCx0cmlnZ2VyOidwYW5lbCd9LGVycm9yOigoKT0+e3dpbmRvdy5qc1BhbmVsRXJyb3J8fCh3aW5kb3cuanNQYW5lbEVycm9yPWZ1bmN0aW9uKG4pe3RoaXMubmFtZT0nanNQYW5lbEVycm9yJyx0aGlzLm1lc3NhZ2U9bnx8JycsdGhpcy5zdGFjaz1uZXcgRXJyb3IoKS5zdGFja30sanNQYW5lbEVycm9yLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSksanNQYW5lbEVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1qc1BhbmVsRXJyb3IpfSkoKSxleHRlbnNpb25zOnt9LGdsb2JhbENhbGxiYWNrczohMSxpY29uczp7Y2xvc2U6YDxzdmcgY2xhc3M9XCJqc1BhbmVsLWljb25cIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMjhcIiBoZWlnaHQ9XCIzMlwiIHZpZXdCb3g9XCIwIDAgMjggMzJcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xNy43NSAxNmw5Ljg1LTkuODVjMC41LTAuNSAwLjUtMS4zIDAtMS43NS0wLjUtMC41LTEuMy0wLjUtMS43NSAwbC05Ljg1IDkuODUtOS44NS05LjljLTAuNS0wLjUtMS4zLTAuNS0xLjc1IDAtMC41IDAuNS0wLjUgMS4zIDAgMS43NWw5Ljg1IDkuOS05LjkgOS44NWMtMC41IDAuNS0wLjUgMS4zIDAgMS43NSAwLjI1IDAuMjUgMC41NSAwLjM1IDAuOSAwLjM1czAuNjUtMC4xIDAuOS0wLjM1bDkuODUtOS44NSA5Ljg1IDkuODVjMC4yNSAwLjI1IDAuNTUgMC4zNSAwLjkgMC4zNXMwLjY1LTAuMSAwLjktMC4zNWMwLjUtMC41IDAuNS0xLjMgMC0xLjc1bC05LjktOS44NXpcIj48L3BhdGg+PC9zdmc+YCxtYXhpbWl6ZTpgPHN2ZyBjbGFzcz1cImpzUGFuZWwtaWNvblwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyOFwiIGhlaWdodD1cIjMyXCIgdmlld0JveD1cIjAgMCAyOCAzMlwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTI3LjU1IDMuOWgtMjIuNmMtMC41NSAwLTEgMC40NS0xIDF2MjIuM2MwIDAuNTUgMC40NSAxIDEgMWgyMi41NWMwLjU1IDAgMS0wLjQ1IDEtMXYtMjIuM2MwLjA1MC0wLjU1LTAuNC0xLTAuOTUtMXpNNS45NSAyNi4xNXYtMThoMjAuNTV2MThoLTIwLjU1elwiPjwvcGF0aD48L3N2Zz5gLG5vcm1hbGl6ZTpgPHN2ZyBjbGFzcz1cImpzUGFuZWwtaWNvblwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyOFwiIGhlaWdodD1cIjMyXCIgdmlld0JveD1cIjAgMCAyOCAzMlwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTI3LjkgMy43NWgtMTguOGMtMC40IDAtMC43NSAwLjM1LTAuNzUgMC43NXY0LjNjMCAwLjEgMCAwLjIgMC4wNTAgMC4zaC00LjJjLTAuNTUgMC0xIDAuNDUtMSAxdjE3LjRjMCAwLjU1IDAuNDUgMSAxIDFoMTcuNjVjMC41NSAwIDEtMC40NSAxLTF2LTMuN2MwLjA1MCAwIDAuMSAwLjA1MCAwLjIgMC4wNTBoNC45YzAuNCAwIDAuNzUtMC4zNSAwLjc1LTAuNzV2LTE4LjZjLTAuMDUwLTAuNC0wLjQtMC43NS0wLjgtMC43NXpNNS4yIDI2LjV2LTEyLjk1YzAuMDUwIDAgMC4xIDAgMC4xNSAwaDE1LjRjMC4wNTAgMCAwLjEgMCAwLjE1IDB2MTIuOTVoLTE1Ljd6TTI3LjE1IDIyLjM1aC00LjE1Yy0wLjA1MCAwLTAuMTUgMC0wLjIgMC4wNTB2LTEyLjNjMC0wLjU1LTAuNDUtMS0xLTFoLTEyYzAuMDUwLTAuMSAwLjA1MC0wLjIgMC4wNTAtMC4zdi0zLjU1aDE3LjN2MTcuMXpcIj48L3BhdGg+PC9zdmc+YCxtaW5pbWl6ZTpgPHN2ZyBjbGFzcz1cImpzUGFuZWwtaWNvblwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyOFwiIGhlaWdodD1cIjMyXCIgdmlld0JveD1cIjAgMCAyOCAzMlwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTI3LjMgMjguNWgtMjIuNmMtMC44NSAwLTEuNS0wLjY1LTEuNS0xLjVzMC42NS0xLjUgMS41LTEuNWgyMi41NWMwLjg1IDAgMS41IDAuNjUgMS41IDEuNXMtMC42NSAxLjUtMS40NSAxLjV6XCI+PC9wYXRoPjwvc3ZnPmAsc21hbGxpZnlyZXY6YDxzdmcgY2xhc3M9XCJqc1BhbmVsLWljb25cIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMjhcIiBoZWlnaHQ9XCIzMlwiIHZpZXdCb3g9XCIwIDAgMjggMzJcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xNS45NSAyMy4yYzAgMCAwIDAgMCAwLTAuMzUgMC0wLjY1LTAuMTUtMC45LTAuMzVsLTExLjctMTEuOWMtMC41LTAuNS0wLjUtMS4zIDAtMS43NSAwLjUtMC41IDEuMy0wLjUgMS43NSAwbDEwLjg1IDEwLjk1IDEwLjktMTAuOGMwLjUtMC41IDEuMy0wLjUgMS43NSAwczAuNSAxLjMgMCAxLjc1bC0xMS43NSAxMS43Yy0wLjI1IDAuMjUtMC41NSAwLjQtMC45IDAuNHpcIj48L3BhdGg+PC9zdmc+YCxzbWFsbGlmeTpgPHN2ZyBjbGFzcz1cImpzUGFuZWwtaWNvblwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyOFwiIGhlaWdodD1cIjMyXCIgdmlld0JveD1cIjAgMCAyOCAzMlwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTI4LjY1IDIwLjg1bC0xMS44LTExLjY1Yy0wLjUtMC41LTEuMy0wLjUtMS43NSAwbC0xMS43NSAxMS44NWMtMC41IDAuNS0wLjUgMS4zIDAgMS43NSAwLjI1IDAuMjUgMC41NSAwLjM1IDAuOSAwLjM1IDAuMyAwIDAuNjUtMC4xIDAuOS0wLjM1bDEwLjg1LTEwLjk1IDEwLjkgMTAuOGMwLjUgMC41IDEuMyAwLjUgMS43NSAwIDAuNS0wLjUgMC41LTEuMyAwLTEuOHpcIj48L3BhdGg+PC9zdmc+YH0saWRDb3VudGVyOjAsaXNJRTooKCk9PntyZXR1cm4gbmF2aWdhdG9yLmFwcFZlcnNpb24ubWF0Y2goL1RyaWRlbnQvKX0pKCksbWRidGhlbWVzOlsnc2Vjb25kYXJ5JywnZWxlZ2FudCcsJ3N0eWxpc2gnLCd1bmlxdWUnLCdzcGVjaWFsJ10scG9pbnRlcmRvd246J29udG91Y2hlbmQnaW4gd2luZG93P1sndG91Y2hzdGFydCcsJ21vdXNlZG93biddOlsnbW91c2Vkb3duJ10scG9pbnRlcm1vdmU6J29udG91Y2hlbmQnaW4gd2luZG93P1sndG91Y2htb3ZlJywnbW91c2Vtb3ZlJ106Wydtb3VzZW1vdmUnXSxwb2ludGVydXA6J29udG91Y2hlbmQnaW4gd2luZG93P1sndG91Y2hlbmQnLCdtb3VzZXVwJ106Wydtb3VzZXVwJ10scG9seWZpbGxzOigoKT0+eyhmdW5jdGlvbihuKXtuLmZvckVhY2goZnVuY3Rpb24obyl7by5hcHBlbmQ9by5hcHBlbmR8fGZ1bmN0aW9uKCl7bGV0IGM9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSxmPWRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtjLmZvckVhY2goZnVuY3Rpb24obSl7bGV0IHU9bSBpbnN0YW5jZW9mIE5vZGU7Zi5hcHBlbmRDaGlsZCh1P206ZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobSsnJykpfSksdGhpcy5hcHBlbmRDaGlsZChmKX19KX0pKFtFbGVtZW50LnByb3RvdHlwZSxEb2N1bWVudC5wcm90b3R5cGUsRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGVdKSx3aW5kb3cuRWxlbWVudCYmIUVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QmJihFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0PWZ1bmN0aW9uKG4pe2xldCBjLG89KHRoaXMuZG9jdW1lbnR8fHRoaXMub3duZXJEb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChuKSxmPXRoaXM7ZG8gZm9yKGM9by5sZW5ndGg7MDw9LS1jJiZvLml0ZW0oYykhPT1mOyk7d2hpbGUoMD5jJiYoZj1mLnBhcmVudEVsZW1lbnQpKTtyZXR1cm4gZn0pLHdpbmRvdy5Ob2RlTGlzdCYmIU5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoJiYoTm9kZUxpc3QucHJvdG90eXBlLmZvckVhY2g9ZnVuY3Rpb24obixvKXtvPW98fHdpbmRvdztmb3IobGV0IGM9MDtjPHRoaXMubGVuZ3RoO2MrKyluLmNhbGwobyx0aGlzW2NdLGMsdGhpcyl9KSxPYmplY3QuYXNzaWdufHxPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LCdhc3NpZ24nLHtlbnVtZXJhYmxlOiExLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMCx2YWx1ZTpmdW5jdGlvbihuKXtpZihuPT09dm9pZCAwfHxudWxsPT09bil0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCBmaXJzdCBhcmd1bWVudCB0byBvYmplY3QnKTtsZXQgbz1PYmplY3Qobik7Zm9yKGxldCBmLGM9MTtjPGFyZ3VtZW50cy5sZW5ndGg7YysrKWlmKGY9YXJndW1lbnRzW2NdLHZvaWQgMCE9PWYmJm51bGwhPT1mKXtmPU9iamVjdChmKTtsZXQgbT1PYmplY3Qua2V5cyhPYmplY3QoZikpO2ZvcihsZXQgdT0wLHk9bS5sZW5ndGg7dTx5O3UrKyl7bGV0IHY9bVt1XSx4PU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZix2KTt2b2lkIDAhPT14JiZ4LmVudW1lcmFibGUmJihvW3ZdPWZbdl0pfX1yZXR1cm4gb319KSxmdW5jdGlvbigpe2Z1bmN0aW9uIG4obyxjKXtjPWN8fHtidWJibGVzOiExLGNhbmNlbGFibGU6ITEsZGV0YWlsOnZvaWQgMH07bGV0IGY9ZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7cmV0dXJuIGYuaW5pdEN1c3RvbUV2ZW50KG8sYy5idWJibGVzLGMuY2FuY2VsYWJsZSxjLmRldGFpbCksZn1yZXR1cm4nZnVuY3Rpb24nIT10eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50JiZ2b2lkKG4ucHJvdG90eXBlPXdpbmRvdy5FdmVudC5wcm90b3R5cGUsd2luZG93LkN1c3RvbUV2ZW50PW4pfSgpLFN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGh8fChTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoPWZ1bmN0aW9uKG4sbyl7cmV0dXJuIG88dGhpcy5sZW5ndGg/b3w9MDpvPXRoaXMubGVuZ3RoLHRoaXMuc3Vic3RyKG8tbi5sZW5ndGgsbi5sZW5ndGgpPT09bn0pLFN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aHx8KFN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aD1mdW5jdGlvbihuLG8pe3JldHVybiB0aGlzLnN1YnN0cihvfHwwLG4ubGVuZ3RoKT09PW59KX0pKCksdGhlbWVzOlsnZGVmYXVsdCcsJ3ByaW1hcnknLCdpbmZvJywnc3VjY2VzcycsJ3dhcm5pbmcnLCdkYW5nZXInXSx6aUJhc2U6MTAwLGFqYXgob2JqLGFqYXhDb25maWcpe2xldCBvYmpJc1BhbmVsOydvYmplY3QnPT10eXBlb2Ygb2JqJiZvYmouY2xhc3NMaXN0LmNvbnRhaW5zKCdqc1BhbmVsJyk/b2JqSXNQYW5lbD0hMDoob2JqSXNQYW5lbD0hMSwnc3RyaW5nJz09dHlwZW9mIG9iaiYmKG9iaj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9iaikpKTtjb25zdCBjb25mPWFqYXhDb25maWcsY29uZmlnRGVmYXVsdHM9e21ldGhvZDonR0VUJyxhc3luYzohMCx1c2VyOicnLHB3ZDonJyxkb25lOmZ1bmN0aW9uKCl7b2JqSXNQYW5lbD9vYmouY29udGVudC5pbm5lckhUTUw9dGhpcy5yZXNwb25zZVRleHQ6b2JqLmlubmVySFRNTD10aGlzLnJlc3BvbnNlVGV4dH0sYXV0b3Jlc2l6ZTohMCxhdXRvcmVwb3NpdGlvbjohMH07bGV0IGNvbmZpZztpZignc3RyaW5nJz09dHlwZW9mIGNvbmYpY29uZmlnPU9iamVjdC5hc3NpZ24oe30sY29uZmlnRGVmYXVsdHMse3VybDplbmNvZGVVUkkoY29uZiksZXZhbHNjcmlwdHRhZ3M6ITB9KTtlbHNlIGlmKCdvYmplY3QnPT10eXBlb2YgY29uZiYmY29uZi51cmwpY29uZmlnPU9iamVjdC5hc3NpZ24oe30sY29uZmlnRGVmYXVsdHMsY29uZiksY29uZmlnLnVybD1lbmNvZGVVUkkoY29uZi51cmwpLCExPT09Y29uZmlnLmFzeW5jJiYoY29uZmlnLnRpbWVvdXQ9MCxjb25maWcud2l0aENyZWRlbnRpYWxzJiYoY29uZmlnLndpdGhDcmVkZW50aWFscz12b2lkIDApLGNvbmZpZy5yZXNwb25zZVR5cGUmJihjb25maWcucmVzcG9uc2VUeXBlPXZvaWQgMCkpO2Vsc2UgcmV0dXJuIGNvbnNvbGUuaW5mbygnWE1MSHR0cFJlcXVlc3Qgc2VlbXMgdG8gbWlzcyB0aGUgcmVxdWVzdCB1cmwhJyksb2JqO2NvbnN0IHhocj1uZXcgWE1MSHR0cFJlcXVlc3Q7cmV0dXJuIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2U9KCk9PntpZig0PT09eGhyLnJlYWR5U3RhdGUpe2lmKDIwMCE9PXhoci5zdGF0dXMpY29uZmlnLmZhaWwmJmNvbmZpZy5mYWlsLmNhbGwoeGhyLG9iaik7ZWxzZSBpZihjb25maWcuZG9uZS5jYWxsKHhocixvYmopLGNvbmZpZy5ldmFsc2NyaXB0dGFncyl7Y29uc3Qgc2NyaXB0dGFncz14aHIucmVzcG9uc2VUZXh0Lm1hdGNoKC88c2NyaXB0XFxiW14+XSo+KFtcXHNcXFNdKj8pPFxcL3NjcmlwdD4vZ2kpO3NjcmlwdHRhZ3MmJnNjcmlwdHRhZ3MuZm9yRWFjaCh0YWc9PntsZXQganM9dGFnLnJlcGxhY2UoLzxzY3JpcHRcXGJbXj5dKj4vaSwnJykucmVwbGFjZSgvPFxcL3NjcmlwdD4vaSwnJykudHJpbSgpO2V2YWwoanMpfSl9aWYoY29uZmlnLmFsd2F5cyYmY29uZmlnLmFsd2F5cy5jYWxsKHhocixvYmopLG9iaklzUGFuZWwpe2NvbnN0IG49b2JqLm9wdGlvbnMuY29udGVudFNpemU7aWYoJ3N0cmluZyc9PXR5cGVvZiBuJiZuLm1hdGNoKC9hdXRvL2kpKXtjb25zdCBvPW4uc3BsaXQoJyAnKSxjPU9iamVjdC5hc3NpZ24oe30se3dpZHRoOm9bMF0saGVpZ2h0Om9bMV19KTtjb25maWcuYXV0b3Jlc2l6ZSYmb2JqLnJlc2l6ZShjKSwhb2JqLmNsYXNzTGlzdC5jb250YWlucygnanNQYW5lbC1jb250ZXh0bWVudScpJiZjb25maWcuYXV0b3JlcG9zaXRpb24mJm9iai5yZXBvc2l0aW9uKCl9ZWxzZSBpZignb2JqZWN0Jz09dHlwZW9mIG4mJignYXV0byc9PT1uLndpZHRofHwnYXV0byc9PT1uLmhlaWdodCkpe2NvbnN0IG89T2JqZWN0LmFzc2lnbih7fSxuKTtjb25maWcuYXV0b3Jlc2l6ZSYmb2JqLnJlc2l6ZShvKSwhb2JqLmNsYXNzTGlzdC5jb250YWlucygnanNQYW5lbC1jb250ZXh0bWVudScpJiZjb25maWcuYXV0b3JlcG9zaXRpb24mJm9iai5yZXBvc2l0aW9uKCl9fWpzUGFuZWwuYWpheEFsd2F5c0NhbGxiYWNrcy5sZW5ndGgmJmpzUGFuZWwuYWpheEFsd2F5c0NhbGxiYWNrcy5mb3JFYWNoKG49PntuLmNhbGwob2JqLG9iail9KX19LHhoci5vcGVuKGNvbmZpZy5tZXRob2QsY29uZmlnLnVybCxjb25maWcuYXN5bmMsY29uZmlnLnVzZXIsY29uZmlnLnB3ZCkseGhyLnRpbWVvdXQ9Y29uZmlnLnRpbWVvdXR8fDAsY29uZmlnLndpdGhDcmVkZW50aWFscyYmKHhoci53aXRoQ3JlZGVudGlhbHM9Y29uZmlnLndpdGhDcmVkZW50aWFscyksY29uZmlnLnJlc3BvbnNlVHlwZSYmKHhoci5yZXNwb25zZVR5cGU9Y29uZmlnLnJlc3BvbnNlVHlwZSksY29uZmlnLmJlZm9yZVNlbmQmJmNvbmZpZy5iZWZvcmVTZW5kLmNhbGwoeGhyKSxjb25maWcuZGF0YT94aHIuc2VuZChjb25maWcuZGF0YSk6eGhyLnNlbmQobnVsbCksb2JqfSxjYWxjQ29sb3JzKG4pe2NvbnN0IG89dGhpcy5jb2xvcihuKSxjPXRoaXMubGlnaHRlbihuLDAuODEpLGY9dGhpcy5kYXJrZW4obiwwLjUpLG09MC41NTY+PXRoaXMucGVyY2VpdmVkQnJpZ2h0bmVzcyhuKT8nI2ZmZmZmZic6JyMwMDAwMDAnLHU9MC41NTY+PXRoaXMucGVyY2VpdmVkQnJpZ2h0bmVzcyhjKT8nI2ZmZmZmZic6JyMwMDAwMDAnLHk9MC41NTY+PXRoaXMucGVyY2VpdmVkQnJpZ2h0bmVzcyhmKT8nIzAwMDAwMCc6JyNmZmZmZmYnO3JldHVybltvLmhzbC5jc3MsYyxmLG0sdSx5XX0sY29sb3Iobil7bGV0IGMsZixtLHUseSx2LHgsRSx6LG89bi50b0xvd2VyQ2FzZSgpLEM9e307Y29uc3QgUz0vXiM/KFswLTlhLWZdezN9fFswLTlhLWZdezZ9KSQvZ2ksaj0vXnJnYmE/XFwoKFswLTldezEsM30pLChbMC05XXsxLDN9KSwoWzAtOV17MSwzfSksPygwfDF8MFxcLlswLTldezEsMn18XFwuWzAtOV17MSwyfSk/XFwpJC9naSxQPS9eaHNsYT9cXCgoWzAtOV17MSwzfSksKFswLTldezEsM30lKSwoWzAtOV17MSwzfSUpLD8oMHwxfDBcXC5bMC05XXsxLDJ9fFxcLlswLTldezEsMn0pP1xcKSQvZ2ksVD17YWxpY2VibHVlOidmMGY4ZmYnLGFudGlxdWV3aGl0ZTonZmFlYmQ3JyxhcXVhOicwZmYnLGFxdWFtYXJpbmU6JzdmZmZkNCcsYXp1cmU6J2YwZmZmZicsYmVpZ2U6J2Y1ZjVkYycsYmlzcXVlOidmZmU0YzQnLGJsYWNrOicwMDAnLGJsYW5jaGVkYWxtb25kOidmZmViY2QnLGJsdWU6JzAwZicsYmx1ZXZpb2xldDonOGEyYmUyJyxicm93bjonYTUyYTJhJyxidXJseXdvb2Q6J2RlYjg4NycsY2FkZXRibHVlOic1ZjllYTAnLGNoYXJ0cmV1c2U6JzdmZmYwMCcsY2hvY29sYXRlOidkMjY5MWUnLGNvcmFsOidmZjdmNTAnLGNvcm5mbG93ZXJibHVlOic2NDk1ZWQnLGNvcm5zaWxrOidmZmY4ZGMnLGNyaW1zb246J2RjMTQzYycsY3lhbjonMGZmJyxkYXJrYmx1ZTonMDAwMDhiJyxkYXJrY3lhbjonMDA4YjhiJyxkYXJrZ29sZGVucm9kOidiODg2MGInLGRhcmtncmF5OidhOWE5YTknLGRhcmtncmV5OidhOWE5YTknLGRhcmtncmVlbjonMDA2NDAwJyxkYXJra2hha2k6J2JkYjc2YicsZGFya21hZ2VudGE6JzhiMDA4YicsZGFya29saXZlZ3JlZW46JzU1NmIyZicsZGFya29yYW5nZTonZmY4YzAwJyxkYXJrb3JjaGlkOic5OTMyY2MnLGRhcmtyZWQ6JzhiMDAwMCcsZGFya3NhbG1vbjonZTk5NjdhJyxkYXJrc2VhZ3JlZW46JzhmYmM4ZicsZGFya3NsYXRlYmx1ZTonNDgzZDhiJyxkYXJrc2xhdGVncmF5OicyZjRmNGYnLGRhcmtzbGF0ZWdyZXk6JzJmNGY0ZicsZGFya3R1cnF1b2lzZTonMDBjZWQxJyxkYXJrdmlvbGV0Oic5NDAwZDMnLGRlZXBwaW5rOidmZjE0OTMnLGRlZXBza3libHVlOicwMGJmZmYnLGRpbWdyYXk6JzY5Njk2OScsZGltZ3JleTonNjk2OTY5Jyxkb2RnZXJibHVlOicxZTkwZmYnLGZpcmVicmljazonYjIyMjIyJyxmbG9yYWx3aGl0ZTonZmZmYWYwJyxmb3Jlc3RncmVlbjonMjI4YjIyJyxmdWNoc2lhOidmMGYnLGdhaW5zYm9ybzonZGNkY2RjJyxnaG9zdHdoaXRlOidmOGY4ZmYnLGdvbGQ6J2ZmZDcwMCcsZ29sZGVucm9kOidkYWE1MjAnLGdyYXk6JzgwODA4MCcsZ3JleTonODA4MDgwJyxncmVlbjonMDA4MDAwJyxncmVlbnllbGxvdzonYWRmZjJmJyxob25leWRldzonZjBmZmYwJyxob3RwaW5rOidmZjY5YjQnLGluZGlhbnJlZDonY2Q1YzVjJyxpbmRpZ286JzRiMDA4MicsaXZvcnk6J2ZmZmZmMCcsa2hha2k6J2YwZTY4YycsbGF2ZW5kZXI6J2U2ZTZmYScsbGF2ZW5kZXJibHVzaDonZmZmMGY1JyxsYXduZ3JlZW46JzdjZmMwMCcsbGVtb25jaGlmZm9uOidmZmZhY2QnLGxpZ2h0Ymx1ZTonYWRkOGU2JyxsaWdodGNvcmFsOidmMDgwODAnLGxpZ2h0Y3lhbjonZTBmZmZmJyxsaWdodGdvbGRlbnJvZHllbGxvdzonZmFmYWQyJyxsaWdodGdyYXk6J2QzZDNkMycsbGlnaHRncmV5OidkM2QzZDMnLGxpZ2h0Z3JlZW46JzkwZWU5MCcsbGlnaHRwaW5rOidmZmI2YzEnLGxpZ2h0c2FsbW9uOidmZmEwN2EnLGxpZ2h0c2VhZ3JlZW46JzIwYjJhYScsbGlnaHRza3libHVlOic4N2NlZmEnLGxpZ2h0c2xhdGVncmF5Oic3ODknLGxpZ2h0c2xhdGVncmV5Oic3ODknLGxpZ2h0c3RlZWxibHVlOidiMGM0ZGUnLGxpZ2h0eWVsbG93OidmZmZmZTAnLGxpbWU6JzBmMCcsbGltZWdyZWVuOiczMmNkMzInLGxpbmVuOidmYWYwZTYnLG1hZ2VudGE6J2YwZicsbWFyb29uOic4MDAwMDAnLG1lZGl1bWFxdWFtYXJpbmU6JzY2Y2RhYScsbWVkaXVtYmx1ZTonMDAwMGNkJyxtZWRpdW1vcmNoaWQ6J2JhNTVkMycsbWVkaXVtcHVycGxlOic5MzcwZDgnLG1lZGl1bXNlYWdyZWVuOiczY2IzNzEnLG1lZGl1bXNsYXRlYmx1ZTonN2I2OGVlJyxtZWRpdW1zcHJpbmdncmVlbjonMDBmYTlhJyxtZWRpdW10dXJxdW9pc2U6JzQ4ZDFjYycsbWVkaXVtdmlvbGV0cmVkOidjNzE1ODUnLG1pZG5pZ2h0Ymx1ZTonMTkxOTcwJyxtaW50Y3JlYW06J2Y1ZmZmYScsbWlzdHlyb3NlOidmZmU0ZTEnLG1vY2Nhc2luOidmZmU0YjUnLG5hdmFqb3doaXRlOidmZmRlYWQnLG5hdnk6JzAwMDA4MCcsb2xkbGFjZTonZmRmNWU2JyxvbGl2ZTonODA4MDAwJyxvbGl2ZWRyYWI6JzZiOGUyMycsb3JhbmdlOidmZmE1MDAnLG9yYW5nZXJlZDonZmY0NTAwJyxvcmNoaWQ6J2RhNzBkNicscGFsZWdvbGRlbnJvZDonZWVlOGFhJyxwYWxlZ3JlZW46Jzk4ZmI5OCcscGFsZXR1cnF1b2lzZTonYWZlZWVlJyxwYWxldmlvbGV0cmVkOidkODcwOTMnLHBhcGF5YXdoaXA6J2ZmZWZkNScscGVhY2hwdWZmOidmZmRhYjknLHBlcnU6J2NkODUzZicscGluazonZmZjMGNiJyxwbHVtOidkZGEwZGQnLHBvd2RlcmJsdWU6J2IwZTBlNicscHVycGxlOic4MDAwODAnLHJlYmVjY2FwdXJwbGU6JzYzOScscmVkOidmMDAnLHJvc3licm93bjonYmM4ZjhmJyxyb3lhbGJsdWU6JzQxNjllMScsc2FkZGxlYnJvd246JzhiNDUxMycsc2FsbW9uOidmYTgwNzInLHNhbmR5YnJvd246J2Y0YTQ2MCcsc2VhZ3JlZW46JzJlOGI1Nycsc2Vhc2hlbGw6J2ZmZjVlZScsc2llbm5hOidhMDUyMmQnLHNpbHZlcjonYzBjMGMwJyxza3libHVlOic4N2NlZWInLHNsYXRlYmx1ZTonNmE1YWNkJyxzbGF0ZWdyYXk6JzcwODA5MCcsc2xhdGVncmV5Oic3MDgwOTAnLHNub3c6J2ZmZmFmYScsc3ByaW5nZ3JlZW46JzAwZmY3Zicsc3RlZWxibHVlOic0NjgyYjQnLHRhbjonZDJiNDhjJyx0ZWFsOicwMDgwODAnLHRoaXN0bGU6J2Q4YmZkOCcsdG9tYXRvOidmZjYzNDcnLHR1cnF1b2lzZTonNDBlMGQwJyx2aW9sZXQ6J2VlODJlZScsd2hlYXQ6J2Y1ZGViMycsd2hpdGU6J2ZmZicsd2hpdGVzbW9rZTonZjVmNWY1Jyx5ZWxsb3c6J2ZmMCcseWVsbG93Z3JlZW46JzlhY2QzMid9O3JldHVybiBUW29dJiYobz1UW29dKSxudWxsPT09by5tYXRjaChTKT9vLm1hdGNoKGopPyh4PWouZXhlYyhvKSxDLnJnYj17Y3NzOm8scjp4WzFdLGc6eFsyXSxiOnhbM119LEMuaGV4PXRoaXMucmdiVG9IZXgoeFsxXSx4WzJdLHhbM10pLHo9dGhpcy5yZ2JUb0hzbCh4WzFdLHhbMl0seFszXSksQy5oc2w9eik6by5tYXRjaChQKT8oeD1QLmV4ZWMobyksdT14WzFdLzM2MCx5PXhbMl0uc3Vic3RyKDAseFsyXS5sZW5ndGgtMSkvMTAwLHY9eFszXS5zdWJzdHIoMCx4WzNdLmxlbmd0aC0xKS8xMDAsRT10aGlzLmhzbFRvUmdiKHUseSx2KSxDLnJnYj17Y3NzOmByZ2IoJHtFWzBdfSwke0VbMV19LCR7RVsyXX0pYCxyOkVbMF0sZzpFWzFdLGI6RVsyXX0sQy5oZXg9dGhpcy5yZ2JUb0hleChDLnJnYi5yLEMucmdiLmcsQy5yZ2IuYiksQy5oc2w9e2NzczpgaHNsKCR7eFsxXX0sJHt4WzJdfSwke3hbM119KWAsaDp4WzFdLHM6eFsyXSxsOnhbM119KTooQy5oZXg9JyNmNWY1ZjUnLEMucmdiPXtjc3M6J3JnYigyNDUsMjQ1LDI0NSknLHI6MjQ1LGc6MjQ1LGI6MjQ1fSxDLmhzbD17Y3NzOidoc2woMCwwJSw5Ni4wOCUpJyxoOjAsczonMCUnLGw6Jzk2LjA4JSd9KToobz1vLnJlcGxhY2UoJyMnLCcnKSwxPT1vLmxlbmd0aCUyPyhjPW8uc3Vic3RyKDAsMSkrJycrby5zdWJzdHIoMCwxKSxmPW8uc3Vic3RyKDEsMSkrJycrby5zdWJzdHIoMSwxKSxtPW8uc3Vic3RyKDIsMSkrJycrby5zdWJzdHIoMiwxKSxDLnJnYj17cjpwYXJzZUludChjLDE2KSxnOnBhcnNlSW50KGYsMTYpLGI6cGFyc2VJbnQobSwxNil9LEMuaGV4PWAjJHtjfSR7Zn0ke219YCk6KEMucmdiPXtyOnBhcnNlSW50KG8uc3Vic3RyKDAsMiksMTYpLGc6cGFyc2VJbnQoby5zdWJzdHIoMiwyKSwxNiksYjpwYXJzZUludChvLnN1YnN0cig0LDIpLDE2KX0sQy5oZXg9YCMke299YCksej10aGlzLnJnYlRvSHNsKEMucmdiLnIsQy5yZ2IuZyxDLnJnYi5iKSxDLmhzbD16LEMucmdiLmNzcz1gcmdiKCR7Qy5yZ2Iucn0sJHtDLnJnYi5nfSwke0MucmdiLmJ9KWApLEN9LGNyZWF0ZVBhbmVsVGVtcGxhdGUobj0hMCl7Y29uc3Qgbz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtyZXR1cm4gby5jbGFzc05hbWU9J2pzUGFuZWwnLG4mJlsnY2xvc2UnLCdtYXhpbWl6ZScsJ25vcm1hbGl6ZScsJ21pbmltaXplJywnc21hbGxpZnknLCdzbWFsbGlmeXJldiddLmZvckVhY2goYz0+e28uc2V0QXR0cmlidXRlKGBkYXRhLWJ0biR7Y31gLCdlbmFibGVkJyl9KSxvLmlubmVySFRNTD1gPGRpdiBjbGFzcz1cImpzUGFuZWwtaGRyXCI+PGRpdiBjbGFzcz1cImpzUGFuZWwtaGVhZGVyYmFyXCI+PGRpdiBjbGFzcz1cImpzUGFuZWwtaGVhZGVybG9nb1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJqc1BhbmVsLXRpdGxlYmFyXCI+PHNwYW4gY2xhc3M9XCJqc1BhbmVsLXRpdGxlXCI+PC9zcGFuPjwvZGl2PjxkaXYgY2xhc3M9XCJqc1BhbmVsLWNvbnRyb2xiYXJcIj48ZGl2IGNsYXNzPVwianNQYW5lbC1idG4ganNQYW5lbC1idG4tc21hbGxpZnlcIj4ke3RoaXMuaWNvbnMuc21hbGxpZnl9PC9kaXY+PGRpdiBjbGFzcz1cImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLXNtYWxsaWZ5cmV2XCI+JHt0aGlzLmljb25zLnNtYWxsaWZ5cmV2fTwvZGl2PjxkaXYgY2xhc3M9XCJqc1BhbmVsLWJ0biBqc1BhbmVsLWJ0bi1taW5pbWl6ZVwiPiR7dGhpcy5pY29ucy5taW5pbWl6ZX08L2Rpdj48ZGl2IGNsYXNzPVwianNQYW5lbC1idG4ganNQYW5lbC1idG4tbm9ybWFsaXplXCI+JHt0aGlzLmljb25zLm5vcm1hbGl6ZX08L2Rpdj48ZGl2IGNsYXNzPVwianNQYW5lbC1idG4ganNQYW5lbC1idG4tbWF4aW1pemVcIj4ke3RoaXMuaWNvbnMubWF4aW1pemV9PC9kaXY+PGRpdiBjbGFzcz1cImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLWNsb3NlXCI+JHt0aGlzLmljb25zLmNsb3NlfTwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJqc1BhbmVsLWhkci10b29sYmFyXCI+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cImpzUGFuZWwtY29udGVudFwiPjwvZGl2PjxkaXYgY2xhc3M9XCJqc1BhbmVsLW1pbmltaXplZC1ib3hcIj48L2Rpdj48ZGl2IGNsYXNzPVwianNQYW5lbC1mdHJcIj48L2Rpdj5gLG99LGNyZWF0ZU1pbmltaXplZFRlbXBsYXRlKCl7Y29uc3Qgbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtyZXR1cm4gbi5jbGFzc05hbWU9J2pzUGFuZWwtcmVwbGFjZW1lbnQnLG4uaW5uZXJIVE1MPWA8ZGl2IGNsYXNzPVwianNQYW5lbC1oZHJcIj48ZGl2IGNsYXNzPVwianNQYW5lbC1oZWFkZXJiYXJcIj48ZGl2IGNsYXNzPVwianNQYW5lbC1oZWFkZXJsb2dvXCI+PC9kaXY+PGRpdiBjbGFzcz1cImpzUGFuZWwtdGl0bGViYXJcIj48c3BhbiBjbGFzcz1cImpzUGFuZWwtdGl0bGVcIj48L3NwYW4+PC9kaXY+PGRpdiBjbGFzcz1cImpzUGFuZWwtY29udHJvbGJhclwiPjxkaXYgY2xhc3M9XCJqc1BhbmVsLWJ0biBqc1BhbmVsLWJ0bi1ub3JtYWxpemVcIj4ke3RoaXMuaWNvbnMubm9ybWFsaXplfTwvZGl2PjxkaXYgY2xhc3M9XCJqc1BhbmVsLWJ0biBqc1BhbmVsLWJ0bi1tYXhpbWl6ZVwiPiR7dGhpcy5pY29ucy5tYXhpbWl6ZX08L2Rpdj48ZGl2IGNsYXNzPVwianNQYW5lbC1idG4ganNQYW5lbC1idG4tY2xvc2VcIj4ke3RoaXMuaWNvbnMuY2xvc2V9PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+YCxufSxjcmVhdGVTbmFwQXJlYShuLG8sYyl7Y29uc3QgZj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxtPW4ucGFyZW50RWxlbWVudDtmLmNsYXNzTmFtZT1ganNQYW5lbC1zbmFwLWFyZWEganNQYW5lbC1zbmFwLWFyZWEtJHtvfWAsJ2x0Jz09PW98fCdydCc9PT1vfHwncmInPT09b3x8J2xiJz09PW8/KGYuc3R5bGUud2lkdGg9YysncHgnLGYuc3R5bGUuaGVpZ2h0PWMrJ3B4Jyk6J2N0Jz09PW98fCdjYic9PT1vP2Yuc3R5bGUuaGVpZ2h0PWMrJ3B4JzooJ2xjJz09b3x8J3JjJz09bykmJihmLnN0eWxlLndpZHRoPWMrJ3B4JyksbSE9PWRvY3VtZW50LmJvZHkmJihmLnN0eWxlLnBvc2l0aW9uPSdhYnNvbHV0ZScpLGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5qc1BhbmVsLXNuYXAtYXJlYS5qc1BhbmVsLXNuYXAtYXJlYS0ke299YCl8fG4ucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChmKX0sZGFya2VuKG4sbyl7Y29uc3QgYz10aGlzLmNvbG9yKG4pLmhzbCxmPXBhcnNlRmxvYXQoYy5sKTtyZXR1cm5gaHNsKCR7Yy5ofSwke2Muc30sJHtmLWYqbysnJSd9KWB9LGRyYWdpdChuLG89e30pe2xldCBjLG0sdSxmPU9iamVjdC5hc3NpZ24oe30sdGhpcy5kZWZhdWx0cy5kcmFnaXQsbykseT1bXTtjb25zdCB2PW5ldyBDdXN0b21FdmVudCgnanNwYW5lbGRyYWdzdGFydCcse2RldGFpbDpuLmlkfSkseD1uZXcgQ3VzdG9tRXZlbnQoJ2pzcGFuZWxkcmFnJyx7ZGV0YWlsOm4uaWR9KSxFPW5ldyBDdXN0b21FdmVudCgnanNwYW5lbGRyYWdzdG9wJyx7ZGV0YWlsOm4uaWR9KTtyZXR1cm4gZi5ncmlkJiZBcnJheS5pc0FycmF5KGYuZ3JpZCkmJjE9PT1mLmdyaWQubGVuZ3RoJiYoZi5ncmlkWzFdPWYuZ3JpZFswXSksdT10aGlzLnBPY29udGFpbm1lbnQoZi5jb250YWlubWVudCksbi5xdWVyeVNlbGVjdG9yQWxsKGYuaGFuZGxlcykuZm9yRWFjaCh6PT57ei5zdHlsZS50b3VjaEFjdGlvbj0nbm9uZScsei5zdHlsZS5jdXJzb3I9Zi5jdXJzb3IsanNQYW5lbC5wb2ludGVyZG93bi5mb3JFYWNoKEM9Pnt6LmFkZEV2ZW50TGlzdGVuZXIoQyxTPT57aWYoUy5wcmV2ZW50RGVmYXVsdCgpLCFTLnRhcmdldC5jbG9zZXN0KCcuanNQYW5lbC1mdHItYnRuJykpe24uY29udHJvbGJhci5zdHlsZS5wb2ludGVyRXZlbnRzPSdub25lJyx5PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lmcmFtZScpLHkubGVuZ3RoJiZ5LmZvckVhY2goQj0+e0Iuc3R5bGUucG9pbnRlckV2ZW50cz0nbm9uZSd9KTtjb25zdCBqPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG4pLFA9cGFyc2VGbG9hdChqLmxlZnQpLFQ9cGFyc2VGbG9hdChqLnRvcCksTD1TLnRvdWNoZXM/Uy50b3VjaGVzWzBdLmNsaWVudFg6Uy5jbGllbnRYLGs9Uy50b3VjaGVzP1MudG91Y2hlc1swXS5jbGllbnRZOlMuY2xpZW50WSxBPW4ucGFyZW50RWxlbWVudCxXPUEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksSD13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShBKTtsZXQgUj0wO209Qj0+e2lmKEIucHJldmVudERlZmF1bHQoKSwhYyl7aWYoZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCh2KSxuLnN0eWxlLm9wYWNpdHk9Zi5vcGFjaXR5LG4uc25hcHBlZCYmZi5zbmFwLnJlc2l6ZVRvUHJlU25hcCYmbi5jdXJyZW50RGF0YS5iZWZvcmVTbmFwKXtuLnJlc2l6ZShuLmN1cnJlbnREYXRhLmJlZm9yZVNuYXAud2lkdGgrJyAnK24uY3VycmVudERhdGEuYmVmb3JlU25hcC5oZWlnaHQpO2xldCBzZT1uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLHJlPUwtKHNlLmxlZnQrc2Uud2lkdGgpLGRlPXNlLndpZHRoLzI7cmU+LWRlJiYoUj1yZStkZSl9Zi5zdGFydCYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKG4sZi5zdGFydCwhMSx7bGVmdDpQLHRvcDpUfSksanNQYW5lbC5mcm9udChuKSxuLnNuYXBwZWQ9ITF9aWYoYz0xLGYuZGlzYWJsZU9uTWF4aW1pemVkJiYnbWF4aW1pemVkJz09PW4uc3RhdHVzKXJldHVybiExO2xldCBELE8sTSxJLE4sWCxZLEYsVixfO2NvbnN0IEs9Qi50b3VjaGVzP0IudG91Y2hlc1swXS5jbGllbnRYOkIuY2xpZW50WCxHPUIudG91Y2hlcz9CLnRvdWNoZXNbMF0uY2xpZW50WTpCLmNsaWVudFksVT13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShuKTtpZihBPT09ZG9jdW1lbnQuYm9keSl7bGV0IHNlPW4uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7Vj13aW5kb3cuaW5uZXJXaWR0aC1wYXJzZUludChILmJvcmRlckxlZnRXaWR0aCwxMCktcGFyc2VJbnQoSC5ib3JkZXJSaWdodFdpZHRoLDEwKS0oc2UubGVmdCtzZS53aWR0aCksXz13aW5kb3cuaW5uZXJIZWlnaHQtcGFyc2VJbnQoSC5ib3JkZXJUb3BXaWR0aCwxMCktcGFyc2VJbnQoSC5ib3JkZXJCb3R0b21XaWR0aCwxMCktKHNlLnRvcCtzZS5oZWlnaHQpfWVsc2UgVj1wYXJzZUludChILndpZHRoLDEwKS1wYXJzZUludChILmJvcmRlckxlZnRXaWR0aCwxMCktcGFyc2VJbnQoSC5ib3JkZXJSaWdodFdpZHRoLDEwKS0ocGFyc2VJbnQoVS5sZWZ0LDEwKStwYXJzZUludChVLndpZHRoLDEwKSksXz1wYXJzZUludChILmhlaWdodCwxMCktcGFyc2VJbnQoSC5ib3JkZXJUb3BXaWR0aCwxMCktcGFyc2VJbnQoSC5ib3JkZXJCb3R0b21XaWR0aCwxMCktKHBhcnNlSW50KFUudG9wLDEwKStwYXJzZUludChVLmhlaWdodCwxMCkpO0Q9cGFyc2VGbG9hdChVLmxlZnQpLE09cGFyc2VGbG9hdChVLnRvcCksTj1WLFk9XyxmLnNuYXAmJigncGFuZWwnPT09Zi5zbmFwLnRyaWdnZXI/Tz1NYXRoLnBvdyhELDIpOidwb2ludGVyJz09PWYuc25hcC50cmlnZ2VyJiYoRD1LLE89TWF0aC5wb3coSywyKSxNPUcsTj13aW5kb3cuaW5uZXJXaWR0aC1LLFk9d2luZG93LmlubmVySGVpZ2h0LUcpLEk9TWF0aC5wb3coTSwyKSxYPU1hdGgucG93KE4sMiksRj1NYXRoLnBvdyhZLDIpKTtjb25zdCBaPU1hdGguc3FydChPK0kpLEo9TWF0aC5zcXJ0KE8rRiksUT1NYXRoLnNxcnQoWCtJKSxlZT1NYXRoLnNxcnQoWCtGKSx0ZT1NYXRoLmFicyhELU4pLzIsbmU9TWF0aC5hYnMoTS1ZKS8yLGFlPU1hdGguc3FydChPK01hdGgucG93KG5lLDIpKSxvZT1NYXRoLnNxcnQoSStNYXRoLnBvdyh0ZSwyKSksaWU9TWF0aC5zcXJ0KFgrTWF0aC5wb3cobmUsMikpLGxlPU1hdGguc3FydChGK01hdGgucG93KHRlLDIpKTtpZih3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCksZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCh4KSxmLmF4aXMmJid4JyE9PWYuYXhpc3x8KG4uc3R5bGUubGVmdD1QKyhLLUwpK1IrJ3B4JyksZi5heGlzJiYneSchPT1mLmF4aXN8fChuLnN0eWxlLnRvcD1UKyhHLWspKydweCcpLGYuZ3JpZCl7Y29uc3Qgc2U9cGFyc2VGbG9hdChVLmxlZnQpLHJlPXBhcnNlRmxvYXQoVS50b3ApLGRlPXNlJWYuZ3JpZFswXSxjZT1yZSVmLmdyaWRbMV07bi5zdHlsZS5sZWZ0PWRlPGYuZ3JpZFswXS8yP3NlLWRlKydweCc6c2UrKGYuZ3JpZFswXS1kZSkrJ3B4JyxuLnN0eWxlLnRvcD1jZTxmLmdyaWRbMV0vMj9yZS1jZSsncHgnOnJlKyhmLmdyaWRbMV0tY2UpKydweCd9aWYoZi5jb250YWlubWVudHx8MD09PWYuY29udGFpbm1lbnQpe2xldCBzZSxyZTtpZihuLm9wdGlvbnMuY29udGFpbmVyPT09ZG9jdW1lbnQuYm9keSlzZT13aW5kb3cuaW5uZXJXaWR0aC1wYXJzZUZsb2F0KFUud2lkdGgpLXVbMV0scmU9d2luZG93LmlubmVySGVpZ2h0LXBhcnNlRmxvYXQoVS5oZWlnaHQpLXVbMl07ZWxzZXtjb25zdCBkZT1wYXJzZUZsb2F0KEguYm9yZGVyTGVmdFdpZHRoKStwYXJzZUZsb2F0KEguYm9yZGVyUmlnaHRXaWR0aCksY2U9cGFyc2VGbG9hdChILmJvcmRlclRvcFdpZHRoKStwYXJzZUZsb2F0KEguYm9yZGVyQm90dG9tV2lkdGgpO3NlPVcud2lkdGgtcGFyc2VGbG9hdChVLndpZHRoKS11WzFdLWRlLHJlPVcuaGVpZ2h0LXBhcnNlRmxvYXQoVS5oZWlnaHQpLXVbMl0tY2V9cGFyc2VGbG9hdChuLnN0eWxlLmxlZnQpPD11WzNdJiYobi5zdHlsZS5sZWZ0PXVbM10rJ3B4JykscGFyc2VGbG9hdChuLnN0eWxlLnRvcCk8PXVbMF0mJihuLnN0eWxlLnRvcD11WzBdKydweCcpLHBhcnNlRmxvYXQobi5zdHlsZS5sZWZ0KT49c2UmJihuLnN0eWxlLmxlZnQ9c2UrJ3B4JykscGFyc2VGbG9hdChuLnN0eWxlLnRvcCk+PXJlJiYobi5zdHlsZS50b3A9cmUrJ3B4Jyl9aWYoZi5kcmFnJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3MobixmLmRyYWcsITEse2xlZnQ6RCx0b3A6TSxyaWdodDpOLGJvdHRvbTpZfSksZi5zbmFwKXtjb25zdCBzZT1mLnNuYXAuc2Vuc2l0aXZpdHkscmU9QT09PWRvY3VtZW50LmJvZHk/d2luZG93LmlubmVyV2lkdGgvODpXLndpZHRoLzgsZGU9QT09PWRvY3VtZW50LmJvZHk/d2luZG93LmlubmVySGVpZ2h0Lzg6Vy5oZWlnaHQvODtuLnNuYXBwYWJsZVRvPSExLGpzUGFuZWwucmVtb3ZlU25hcEFyZWFzKG4pLFo8c2U/KG4uc25hcHBhYmxlVG89J2xlZnQtdG9wJywhMSE9PWYuc25hcC5zbmFwTGVmdFRvcCYmanNQYW5lbC5jcmVhdGVTbmFwQXJlYShuLCdsdCcsc2UpKTpKPHNlPyhuLnNuYXBwYWJsZVRvPSdsZWZ0LWJvdHRvbScsITEhPT1mLnNuYXAuc25hcExlZnRCb3R0b20mJmpzUGFuZWwuY3JlYXRlU25hcEFyZWEobiwnbGInLHNlKSk6UTxzZT8obi5zbmFwcGFibGVUbz0ncmlnaHQtdG9wJywhMSE9PWYuc25hcC5zbmFwUmlnaHRUb3AmJmpzUGFuZWwuY3JlYXRlU25hcEFyZWEobiwncnQnLHNlKSk6ZWU8c2U/KG4uc25hcHBhYmxlVG89J3JpZ2h0LWJvdHRvbScsITEhPT1mLnNuYXAuc25hcFJpZ2h0Qm90dG9tJiZqc1BhbmVsLmNyZWF0ZVNuYXBBcmVhKG4sJ3JiJyxzZSkpOk08c2UmJm9lPHJlPyhuLnNuYXBwYWJsZVRvPSdjZW50ZXItdG9wJywhMSE9PWYuc25hcC5zbmFwQ2VudGVyVG9wJiZqc1BhbmVsLmNyZWF0ZVNuYXBBcmVhKG4sJ2N0JyxzZSkpOkQ8c2UmJmFlPGRlPyhuLnNuYXBwYWJsZVRvPSdsZWZ0LWNlbnRlcicsITEhPT1mLnNuYXAuc25hcExlZnRDZW50ZXImJmpzUGFuZWwuY3JlYXRlU25hcEFyZWEobiwnbGMnLHNlKSk6TjxzZSYmaWU8ZGU/KG4uc25hcHBhYmxlVG89J3JpZ2h0LWNlbnRlcicsITEhPT1mLnNuYXAuc25hcFJpZ2h0Q2VudGVyJiZqc1BhbmVsLmNyZWF0ZVNuYXBBcmVhKG4sJ3JjJyxzZSkpOlk8c2UmJmxlPHJlJiYobi5zbmFwcGFibGVUbz0nY2VudGVyLWJvdHRvbScsITEhPT1mLnNuYXAuc25hcENlbnRlckJvdHRvbSYmanNQYW5lbC5jcmVhdGVTbmFwQXJlYShuLCdjYicsc2UpKX19LGpzUGFuZWwucG9pbnRlcm1vdmUuZm9yRWFjaChmdW5jdGlvbihCKXtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKEIsbSl9KX19KX0pLGpzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24oQyl7ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihDLCgpPT57anNQYW5lbC5wb2ludGVybW92ZS5mb3JFYWNoKGZ1bmN0aW9uKFMpe2RvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoUyxtKX0pLGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3c9J2luaGVyaXQnLGpzUGFuZWwucmVtb3ZlU25hcEFyZWFzKG4pLGMmJihkb2N1bWVudC5kaXNwYXRjaEV2ZW50KEUpLG4uc3R5bGUub3BhY2l0eT0xLGM9dm9pZCAwLG4uc2F2ZUN1cnJlbnRQb3NpdGlvbigpLGYuc25hcCYmKCdsZWZ0LXRvcCc9PT1uLnNuYXBwYWJsZVRvP2pzUGFuZWwuc25hcFBhbmVsKG4sZi5zbmFwLnNuYXBMZWZ0VG9wKTonY2VudGVyLXRvcCc9PT1uLnNuYXBwYWJsZVRvP2pzUGFuZWwuc25hcFBhbmVsKG4sZi5zbmFwLnNuYXBDZW50ZXJUb3ApOidyaWdodC10b3AnPT09bi5zbmFwcGFibGVUbz9qc1BhbmVsLnNuYXBQYW5lbChuLGYuc25hcC5zbmFwUmlnaHRUb3ApOidyaWdodC1jZW50ZXInPT09bi5zbmFwcGFibGVUbz9qc1BhbmVsLnNuYXBQYW5lbChuLGYuc25hcC5zbmFwUmlnaHRDZW50ZXIpOidyaWdodC1ib3R0b20nPT09bi5zbmFwcGFibGVUbz9qc1BhbmVsLnNuYXBQYW5lbChuLGYuc25hcC5zbmFwUmlnaHRCb3R0b20pOidjZW50ZXItYm90dG9tJz09PW4uc25hcHBhYmxlVG8/anNQYW5lbC5zbmFwUGFuZWwobixmLnNuYXAuc25hcENlbnRlckJvdHRvbSk6J2xlZnQtYm90dG9tJz09PW4uc25hcHBhYmxlVG8/anNQYW5lbC5zbmFwUGFuZWwobixmLnNuYXAuc25hcExlZnRCb3R0b20pOidsZWZ0LWNlbnRlcic9PT1uLnNuYXBwYWJsZVRvJiZqc1BhbmVsLnNuYXBQYW5lbChuLGYuc25hcC5zbmFwTGVmdENlbnRlciksZi5zbmFwLmNhbGxiYWNrJiZuLnNuYXBwYWJsZVRvJiYnZnVuY3Rpb24nPT10eXBlb2YgZi5zbmFwLmNhbGxiYWNrJiZmLnNuYXAuY2FsbGJhY2suY2FsbChuLG4pLG4uc25hcHBhYmxlVG8mJmYuc25hcC5yZXBvc2l0aW9uT25TbmFwJiZuLnJlcG9zaXRpb25PblNuYXAobi5zbmFwcGFibGVUbykpLGYuc3RvcCYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKG4sZi5zdG9wLCExLHtsZWZ0OnBhcnNlRmxvYXQobi5zdHlsZS5sZWZ0KSx0b3A6cGFyc2VGbG9hdChuLnN0eWxlLnRvcCl9KSksbi5jb250cm9sYmFyLnN0eWxlLnBvaW50ZXJFdmVudHM9J2luaGVyaXQnLHkubGVuZ3RoJiZ5LmZvckVhY2goZnVuY3Rpb24oUyl7Uy5zdHlsZS5wb2ludGVyRXZlbnRzPSdpbmhlcml0J30pfSl9KSxmLmRpc2FibGUmJih6LnN0eWxlLnBvaW50ZXJFdmVudHM9J25vbmUnKX0pLG59LGVtcHR5Tm9kZShuKXtmb3IoO24uZmlyc3RDaGlsZDspbi5yZW1vdmVDaGlsZChuLmZpcnN0Q2hpbGQpO3JldHVybiBufSxleHRlbmQobil7aWYoJ1tvYmplY3QgT2JqZWN0XSc9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobikpZm9yKGxldCBvIGluIG4pbi5oYXNPd25Qcm9wZXJ0eShvKSYmKHRoaXMuZXh0ZW5zaW9uc1tvXT1uW29dKX0sZmV0Y2gob2JqKXtsZXQgY29uZj1vYmoub3B0aW9ucy5jb250ZW50RmV0Y2gsY29uZkRlZmF1bHRzPXtib2R5TWV0aG9kOid0ZXh0JyxldmFsc2NyaXB0dGFnczohMCxhdXRvcmVzaXplOiEwLGF1dG9yZXBvc2l0aW9uOiEwLGRvbmU6ZnVuY3Rpb24obixvKXtuLmNvbnRlbnQuaW5uZXJIVE1MPW99fTtjb25mPSdzdHJpbmcnPT10eXBlb2YgY29uZj9PYmplY3QuYXNzaWduKHtyZXNvdXJjZTpvYmoub3B0aW9ucy5jb250ZW50RmV0Y2h9LGNvbmZEZWZhdWx0cyk6T2JqZWN0LmFzc2lnbihjb25mRGVmYXVsdHMsY29uZik7bGV0IGZldGNoSW5pdD1jb25mLmZldGNoSW5pdHx8e307Y29uZi5iZWZvcmVTZW5kJiZjb25mLmJlZm9yZVNlbmQuY2FsbChvYmosb2JqKSxmZXRjaChjb25mLnJlc291cmNlLGZldGNoSW5pdCkudGhlbihmdW5jdGlvbihuKXtpZihuLm9rKXJldHVybiBuW2NvbmYuYm9keU1ldGhvZF0oKTt0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgcmVzcG9uc2Ugd2FzIG5vdCBvay4nKX0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe2lmKGNvbmYuZG9uZS5jYWxsKG9iaixvYmoscmVzcG9uc2UpLGNvbmYuZXZhbHNjcmlwdHRhZ3Mpe2NvbnN0IHNjcmlwdHRhZ3M9cmVzcG9uc2UubWF0Y2goLzxzY3JpcHRcXGJbXj5dKj4oW1xcc1xcU10qPyk8XFwvc2NyaXB0Pi9naSk7c2NyaXB0dGFncyYmc2NyaXB0dGFncy5mb3JFYWNoKHRhZz0+e2xldCBqcz10YWcucmVwbGFjZSgvPHNjcmlwdFxcYltePl0qPi9pLCcnKS5yZXBsYWNlKC88XFwvc2NyaXB0Pi9pLCcnKS50cmltKCk7ZXZhbChqcyl9KX1jb25zdCBvQ29udGVudFNpemU9b2JqLm9wdGlvbnMuY29udGVudFNpemU7aWYoY29uZi5hdXRvcmVzaXplfHxjb25mLmF1dG9yZXBvc2l0aW9uKWlmKCdzdHJpbmcnPT10eXBlb2Ygb0NvbnRlbnRTaXplJiZvQ29udGVudFNpemUubWF0Y2goL2F1dG8vaSkpe2NvbnN0IG49b0NvbnRlbnRTaXplLnNwbGl0KCcgJyksbz1PYmplY3QuYXNzaWduKHt9LHt3aWR0aDpuWzBdLGhlaWdodDpuWzFdfSk7Y29uZi5hdXRvcmVzaXplJiZvYmoucmVzaXplKG8pLCFvYmouY2xhc3NMaXN0LmNvbnRhaW5zKCdqc1BhbmVsLWNvbnRleHRtZW51JykmJmNvbmYuYXV0b3JlcG9zaXRpb24mJm9iai5yZXBvc2l0aW9uKCl9ZWxzZSBpZignb2JqZWN0Jz09dHlwZW9mIG9Db250ZW50U2l6ZSYmKCdhdXRvJz09PW9Db250ZW50U2l6ZS53aWR0aHx8J2F1dG8nPT09b0NvbnRlbnRTaXplLmhlaWdodCkpe2NvbnN0IG49T2JqZWN0LmFzc2lnbih7fSxvQ29udGVudFNpemUpO2NvbmYuYXV0b3Jlc2l6ZSYmb2JqLnJlc2l6ZShuKSwhb2JqLmNsYXNzTGlzdC5jb250YWlucygnanNQYW5lbC1jb250ZXh0bWVudScpJiZjb25mLmF1dG9yZXBvc2l0aW9uJiZvYmoucmVwb3NpdGlvbigpfX0pLmNhdGNoKGZ1bmN0aW9uKG4pe2NvbnNvbGUuZXJyb3IoJ1RoZXJlIGhhcyBiZWVuIGEgcHJvYmxlbSB3aXRoIHlvdXIgZmV0Y2ggb3BlcmF0aW9uOiAnK24ubWVzc2FnZSl9KX0sZnJvbnQobil7aWYoJ21pbmltaXplZCc9PT1uLnN0YXR1cyknbWF4aW1pemVkJz09PW4uc3RhdHVzQmVmb3JlP24ubWF4aW1pemUoKTpuLm5vcm1hbGl6ZSgpO2Vsc2V7Y29uc3Qgbz1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanNQYW5lbC1zdGFuZGFyZCcpKS5tYXAoYz0+e3JldHVybiBjLnN0eWxlLnpJbmRleH0pO01hdGgubWF4KC4uLm8pPm4uc3R5bGUuekluZGV4JiYobi5zdHlsZS56SW5kZXg9anNQYW5lbC56aS5uZXh0KCkpLHRoaXMucmVzZXRaaSgpfXRoaXMuZ2V0UGFuZWxzKCkuZm9yRWFjaChmdW5jdGlvbihvLGMpe2xldCBmPW8uY29udGVudC5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1pZnJhbWUtb3ZlcmxheScpO2lmKCEoMDxjKSlmJiZvLmNvbnRlbnQucmVtb3ZlQ2hpbGQoZik7ZWxzZSBpZihvLmNvbnRlbnQucXVlcnlTZWxlY3RvcignaWZyYW1lJykmJiFmKXtsZXQgbT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTttLmNsYXNzTmFtZT0nanNQYW5lbC1pZnJhbWUtb3ZlcmxheScsby5jb250ZW50LmFwcGVuZENoaWxkKG0pfX0pfSxnZXRQYW5lbHMobj1mdW5jdGlvbigpe3JldHVybiB0aGlzLmNsYXNzTGlzdC5jb250YWlucygnanNQYW5lbC1zdGFuZGFyZCcpfSl7cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qc1BhbmVsJykpLmZpbHRlcihvPT57cmV0dXJuIG4uY2FsbChvLG8pfSkuc29ydCgobyxjKT0+e3JldHVybiBjLnN0eWxlLnpJbmRleC1vLnN0eWxlLnpJbmRleH0pfSxoc2xUb1JnYihuLG8sYyl7bGV0IGYsbSx1O2lmKDA9PT1vKWY9bT11PWM7ZWxzZXtsZXQgeT0oRSx6LEMpPT57cmV0dXJuIDA+QyYmKEMrPTEpLDE8QyYmKEMtPTEpLEM8MS82P0UrNiooei1FKSpDOkM8MS8yP3o6QzwyLzM/RSs2Kigoei1FKSooMi8zLUMpKTpFfSx2PTAuNT5jP2MqKDErbyk6YytvLWMqbyx4PTIqYy12O2Y9eSh4LHYsbisxLzMpLG09eSh4LHYsbiksdT15KHgsdixuLTEvMyl9cmV0dXJuW01hdGgucm91bmQoMjU1KmYpLE1hdGgucm91bmQoMjU1Km0pLE1hdGgucm91bmQoMjU1KnUpXX0sbGlnaHRlbihuLG8pe2NvbnN0IGM9dGhpcy5jb2xvcihuKS5oc2wsZj1wYXJzZUZsb2F0KGMubCk7cmV0dXJuYGhzbCgke2MuaH0sJHtjLnN9LCR7ZisoMTAwLWYpKm8rJyUnfSlgfSxwZXJjZWl2ZWRCcmlnaHRuZXNzKG4pe2NvbnN0IG89dGhpcy5jb2xvcihuKS5yZ2I7cmV0dXJuIDAuMjYyNyooby5yLzI1NSkrMC42NzgqKG8uZy8yNTUpKzAuMDU5Myooby5iLzI1NSl9LHBPY29udGFpbmVyKG4sbyl7aWYobil7bGV0IGY7aWYoJ3N0cmluZyc9PXR5cGVvZiBuP2Y9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihuKToxPT09bi5ub2RlVHlwZT9mPW46bi5sZW5ndGgmJihmPW5bMF0pLGYmJjE9PT1mLm5vZGVUeXBlKXJldHVybiBmfWNvbnN0IGM9bmV3IGpzUGFuZWxFcnJvcignTk8gTkVXIFBBTkVMIENSRUFURUQhXFxuVGhlIGNvbnRhaW5lciB0byBhcHBlbmQgdGhlIHBhbmVsIHRvIGRvZXMgbm90IGV4aXN0IG9yIGEgY29udGFpbmVyIHdhcyBub3Qgc3BlY2lmaWVkIScpO3RyeXt0aHJvdyBjfWNhdGNoKGYpe28mJm8uY2FsbChmLGYpfXJldHVybiBjfSxwT2NvbnRhaW5tZW50KG4pe2lmKCdudW1iZXInPT10eXBlb2YgbilyZXR1cm5bbixuLG4sbl07aWYoQXJyYXkuaXNBcnJheShuKSl7aWYoMT09PW4ubGVuZ3RoKXJldHVybltuWzBdLG5bMF0sblswXSxuWzBdXTtpZigyPT09bi5sZW5ndGgpcmV0dXJuIG4uY29uY2F0KG4pOzM9PT1uLmxlbmd0aCYmKG5bM109blsxXSl9cmV0dXJuIG59LHBPc2l6ZShuLG8pe2xldCBjPW98fHRoaXMuZGVmYXVsdHMuY29udGVudFNpemUsZj1uLnBhcmVudEVsZW1lbnQ7aWYoJ3N0cmluZyc9PXR5cGVvZiBjKXtsZXQgbT1jLnRyaW0oKS5zcGxpdCgnICcpO2M9e30sYy53aWR0aD1tWzBdLGMuaGVpZ2h0PTI9PT1tLmxlbmd0aD9tWzFdOm1bMF19ZWxzZSBjLndpZHRoJiYhYy5oZWlnaHQ/Yy5oZWlnaHQ9Yy53aWR0aDpjLmhlaWdodCYmIWMud2lkdGgmJihjLndpZHRoPWMuaGVpZ2h0KTtpZigoYy53aWR0aCsnJykubWF0Y2goL15bMC05Ll0rJC9naSkpYy53aWR0aCs9J3B4JztlbHNlIGlmKCEoJ3N0cmluZyc9PXR5cGVvZiBjLndpZHRoJiZjLndpZHRoLmVuZHNXaXRoKCclJykpKSdmdW5jdGlvbic9PXR5cGVvZiBjLndpZHRoJiYoYy53aWR0aD1jLndpZHRoLmNhbGwobixuKSwnbnVtYmVyJz09dHlwZW9mIGMud2lkdGg/Yy53aWR0aCs9J3B4Jzonc3RyaW5nJz09dHlwZW9mIGMud2lkdGgmJmMud2lkdGgubWF0Y2goL15bMC05Ll0rJC9naSkmJihjLndpZHRoKz0ncHgnKSk7ZWxzZSBpZihmPT09ZG9jdW1lbnQuYm9keSljLndpZHRoPXdpbmRvdy5pbm5lcldpZHRoKihwYXJzZUZsb2F0KGMud2lkdGgpLzEwMCkrJ3B4JztlbHNle2NvbnN0IG09d2luZG93LmdldENvbXB1dGVkU3R5bGUoZiksdT1wYXJzZUZsb2F0KG0uYm9yZGVyTGVmdFdpZHRoKStwYXJzZUZsb2F0KG0uYm9yZGVyUmlnaHRXaWR0aCk7Yy53aWR0aD0ocGFyc2VGbG9hdChtLndpZHRoKS11KSoocGFyc2VGbG9hdChjLndpZHRoKS8xMDApKydweCd9aWYoKGMuaGVpZ2h0KycnKS5tYXRjaCgvXlswLTkuXSskL2dpKSljLmhlaWdodCs9J3B4JztlbHNlIGlmKCEoJ3N0cmluZyc9PXR5cGVvZiBjLmhlaWdodCYmYy5oZWlnaHQuZW5kc1dpdGgoJyUnKSkpJ2Z1bmN0aW9uJz09dHlwZW9mIGMuaGVpZ2h0JiYoYy5oZWlnaHQ9Yy5oZWlnaHQuY2FsbChuLG4pLCdudW1iZXInPT10eXBlb2YgYy5oZWlnaHQ/Yy5oZWlnaHQrPSdweCc6J3N0cmluZyc9PXR5cGVvZiBjLmhlaWdodCYmYy5oZWlnaHQubWF0Y2goL15bMC05Ll0rJC9naSkmJihjLmhlaWdodCs9J3B4JykpO2Vsc2UgaWYoZj09PWRvY3VtZW50LmJvZHkpYy5oZWlnaHQ9d2luZG93LmlubmVySGVpZ2h0KihwYXJzZUZsb2F0KGMuaGVpZ2h0KS8xMDApKydweCc7ZWxzZXtjb25zdCBtPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGYpLHU9cGFyc2VGbG9hdChtLmJvcmRlclRvcFdpZHRoKStwYXJzZUZsb2F0KG0uYm9yZGVyQm90dG9tV2lkdGgpO2MuaGVpZ2h0PShwYXJzZUZsb2F0KG0uaGVpZ2h0KS11KSoocGFyc2VGbG9hdChjLmhlaWdodCkvMTAwKSsncHgnfXJldHVybiBjfSxwT3Bvc2l0aW9uKG4pe2NvbnN0IG89bi5tYXRjaCgvXFxiW2Etel17NCw2fS17MX1bYS16XXszLDZ9XFxiL2kpLGM9bi5tYXRjaCgvZG93bnx1cHxyaWdodChbXi1dfCQpfGxlZnQoW14tXXwkKS9pKSxmPW4ubWF0Y2goL1srLV0/XFxkP1xcLj9cXGQrKFthLXolXXsyLDR9XFxifCU/KS9naSk7bGV0IG07cmV0dXJuIG09bz97bXk6b1swXS50b0xvd2VyQ2FzZSgpLGF0Om9bMF0udG9Mb3dlckNhc2UoKX06e215OidjZW50ZXInLGF0OidjZW50ZXInfSxjJiYobS5hdXRvcG9zaXRpb249Y1swXS50b0xvd2VyQ2FzZSgpKSxmJiYoZi5mb3JFYWNoKCh1LHkpPT57dS5tYXRjaCgvXlsrLV0/WzAtOV0qJC8pJiYoZlt5XSs9J3B4JyksZlt5XT1mW3ldLnRvTG93ZXJDYXNlKCl9KSwxPT09Zi5sZW5ndGg/KG0ub2Zmc2V0WD1mWzBdLG0ub2Zmc2V0WT1mWzBdKToobS5vZmZzZXRYPWZbMF0sbS5vZmZzZXRZPWZbMV0pKSxtfSxwb3NpdGlvbihuLG8pe2xldCBjLGYsbSx1PXtsZWZ0OjAsdG9wOjB9LHk9MCx2PTAseD0wLEU9MDtjb25zdCB6PXtteTonY2VudGVyJyxhdDonY2VudGVyJyxvZjond2luZG93JyxvZmZzZXRYOicwcHgnLG9mZnNldFk6JzBweCd9LEM9e3dpZHRoOmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCxoZWlnaHQ6d2luZG93LmlubmVySGVpZ2h0fSxTPXBhZ2VYT2Zmc2V0LGo9cGFnZVlPZmZzZXQ7aWYoYz0nc3RyaW5nJz09dHlwZW9mIG4/ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihuKTpuLCFvKXJldHVybiBjLnN0eWxlLm9wYWNpdHk9MSxjO2NvbnN0IFA9Yy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtmPSdzdHJpbmcnPT10eXBlb2Ygbz9PYmplY3QuYXNzaWduKHt9LHosanNQYW5lbC5wT3Bvc2l0aW9uKG8pKTpPYmplY3QuYXNzaWduKHt9LHosbyk7Y29uc3QgVD1jLnBhcmVudEVsZW1lbnQsTD13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShUKSxrPVQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksQT1ULnRhZ05hbWUudG9Mb3dlckNhc2UoKTtpZihmLm9mJiYnd2luZG93JyE9PWYub2YmJignc3RyaW5nJz09dHlwZW9mIGYub2Y/bT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGYub2YpOm09Zi5vZiksZi5teS5tYXRjaCgvXmNlbnRlci10b3AkfF5jZW50ZXIkfF5jZW50ZXItYm90dG9tJC9pKT95PVAud2lkdGgvMjpmLm15Lm1hdGNoKC9yaWdodC9pKSYmKHk9UC53aWR0aCksZi5teS5tYXRjaCgvXmxlZnQtY2VudGVyJHxeY2VudGVyJHxecmlnaHQtY2VudGVyJC9pKT92PVAuaGVpZ2h0LzI6Zi5teS5tYXRjaCgvYm90dG9tL2kpJiYodj1QLmhlaWdodCksJ2JvZHknPT09QSYmJ3dpbmRvdyc9PT1mLm9mKWYuYXQubWF0Y2goL15jZW50ZXItdG9wJHxeY2VudGVyJHxeY2VudGVyLWJvdHRvbSQvaSk/eD1DLndpZHRoLzI6Zi5hdC5tYXRjaCgvcmlnaHQvaSkmJih4PUMud2lkdGgpLGYuYXQubWF0Y2goL15sZWZ0LWNlbnRlciR8XmNlbnRlciR8XnJpZ2h0LWNlbnRlciQvaSk/RT1DLmhlaWdodC8yOmYuYXQubWF0Y2goL2JvdHRvbS9pKSYmKEU9Qy5oZWlnaHQpLHUubGVmdD14LXktcGFyc2VGbG9hdChMLmJvcmRlckxlZnRXaWR0aCksdS50b3A9RS12LXBhcnNlRmxvYXQoTC5ib3JkZXJUb3BXaWR0aCksYy5zdHlsZS5wb3NpdGlvbj0nZml4ZWQnO2Vsc2UgaWYoJ2JvZHknPT09QSYmJ3dpbmRvdychPT1mLm9mKXtjb25zdCBXPW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7eD1mLmF0Lm1hdGNoKC9eY2VudGVyLXRvcCR8XmNlbnRlciR8XmNlbnRlci1ib3R0b20kL2kpP1cud2lkdGgvMitXLmxlZnQrUzpmLmF0Lm1hdGNoKC9yaWdodC9pKT9XLndpZHRoK1cubGVmdCtTOlcubGVmdCtTLEU9Zi5hdC5tYXRjaCgvXmxlZnQtY2VudGVyJHxeY2VudGVyJHxecmlnaHQtY2VudGVyJC9pKT9XLmhlaWdodC8yK1cudG9wK2o6Zi5hdC5tYXRjaCgvYm90dG9tL2kpP1cuaGVpZ2h0K1cudG9wK2o6Vy50b3Araix1LmxlZnQ9eC15LXBhcnNlRmxvYXQoTC5ib3JkZXJMZWZ0V2lkdGgpLHUudG9wPUUtdi1wYXJzZUZsb2F0KEwuYm9yZGVyVG9wV2lkdGgpfWVsc2UgaWYoJ2JvZHknIT09QSYmKCd3aW5kb3cnPT09Zi5vZnx8IWYub2YpKXtjb25zdCBXPXBhcnNlRmxvYXQoTC5ib3JkZXJMZWZ0V2lkdGgpK3BhcnNlRmxvYXQoTC5ib3JkZXJSaWdodFdpZHRoKSxIPXBhcnNlRmxvYXQoTC5ib3JkZXJUb3BXaWR0aCkrcGFyc2VGbG9hdChMLmJvcmRlckJvdHRvbVdpZHRoKTtmLmF0Lm1hdGNoKC9eY2VudGVyLXRvcCR8XmNlbnRlciR8XmNlbnRlci1ib3R0b20kL2kpP3g9ay53aWR0aC8yLVcvMjpmLmF0Lm1hdGNoKC9yaWdodC9pKSYmKHg9ay53aWR0aC1XKSxmLmF0Lm1hdGNoKC9ebGVmdC1jZW50ZXIkfF5jZW50ZXIkfF5yaWdodC1jZW50ZXIkL2kpP0U9ay5oZWlnaHQvMi1ILzI6Zi5hdC5tYXRjaCgvYm90dG9tL2kpJiYoRT1rLmhlaWdodC1IKSx1LmxlZnQ9eC15LHUudG9wPUUtdn1lbHNlIGlmKCdib2R5JyE9PUEmJlQuY29udGFpbnMobSkpe2NvbnN0IFc9bS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTt4PWYuYXQubWF0Y2goL15jZW50ZXItdG9wJHxeY2VudGVyJHxeY2VudGVyLWJvdHRvbSQvaSk/Vy5sZWZ0LWsubGVmdCtXLndpZHRoLzI6Zi5hdC5tYXRjaCgvcmlnaHQvaSk/Vy5sZWZ0LWsubGVmdCtXLndpZHRoOlcubGVmdC1rLmxlZnQsRT1mLmF0Lm1hdGNoKC9ebGVmdC1jZW50ZXIkfF5jZW50ZXIkfF5yaWdodC1jZW50ZXIkL2kpP1cudG9wLWsudG9wK1cuaGVpZ2h0LzI6Zi5hdC5tYXRjaCgvYm90dG9tL2kpP1cudG9wLWsudG9wK1cuaGVpZ2h0OlcudG9wLWsudG9wLHUubGVmdD14LXktcGFyc2VGbG9hdChMLmJvcmRlckxlZnRXaWR0aCksdS50b3A9RS12LXBhcnNlRmxvYXQoTC5ib3JkZXJUb3BXaWR0aCl9aWYoZi5hdXRvcG9zaXRpb24mJmYubXk9PT1mLmF0JiYwPD1bJ2xlZnQtdG9wJywnY2VudGVyLXRvcCcsJ3JpZ2h0LXRvcCcsJ2xlZnQtYm90dG9tJywnY2VudGVyLWJvdHRvbScsJ3JpZ2h0LWJvdHRvbSddLmluZGV4T2YoZi5teSkpe2NvbnN0IFc9YCR7Zi5teX0tJHtmLmF1dG9wb3NpdGlvbi50b0xvd2VyQ2FzZSgpfWA7Yy5jbGFzc0xpc3QuYWRkKFcpO2NvbnN0IEg9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7V31gKSksUj1ILmluZGV4T2YoYyk7MTxILmxlbmd0aCYmKCdkb3duJz09PWYuYXV0b3Bvc2l0aW9uP0guZm9yRWFjaCgoQixEKT0+ezA8RCYmRDw9UiYmKHUudG9wKz1IWy0tRF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0K2pzUGFuZWwuYXV0b3Bvc2l0aW9uU3BhY2luZyl9KTondXAnPT09Zi5hdXRvcG9zaXRpb24/SC5mb3JFYWNoKChCLEQpPT57MDxEJiZEPD1SJiYodS50b3AtPUhbLS1EXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQranNQYW5lbC5hdXRvcG9zaXRpb25TcGFjaW5nKX0pOidyaWdodCc9PT1mLmF1dG9wb3NpdGlvbj9ILmZvckVhY2goKEIsRCk9PnswPEQmJkQ8PVImJih1LmxlZnQrPUhbLS1EXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCtqc1BhbmVsLmF1dG9wb3NpdGlvblNwYWNpbmcpfSk6J2xlZnQnPT09Zi5hdXRvcG9zaXRpb24mJkguZm9yRWFjaCgoQixEKT0+ezA8RCYmRDw9UiYmKHUubGVmdC09SFstLURdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoK2pzUGFuZWwuYXV0b3Bvc2l0aW9uU3BhY2luZyl9KSl9aWYodS5sZWZ0Kz0ncHgnLHUudG9wKz0ncHgnLGMuc3R5bGUubGVmdD11LmxlZnQsYy5zdHlsZS50b3A9dS50b3AsZi5vZmZzZXRYJiYoYy5zdHlsZS5sZWZ0PSdudW1iZXInPT10eXBlb2YgZi5vZmZzZXRYP2BjYWxjKCR7dS5sZWZ0fSArICR7Zi5vZmZzZXRYfXB4KWA6YGNhbGMoJHt1LmxlZnR9ICsgJHtmLm9mZnNldFh9KWAsdS5sZWZ0PXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGMpLmxlZnQpLGYub2Zmc2V0WSYmKGMuc3R5bGUudG9wPSdudW1iZXInPT10eXBlb2YgZi5vZmZzZXRZP2BjYWxjKCR7dS50b3B9ICsgJHtmLm9mZnNldFl9cHgpYDpgY2FsYygke3UudG9wfSArICR7Zi5vZmZzZXRZfSlgLHUudG9wPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGMpLnRvcCksZi5taW5MZWZ0KXtsZXQgVz1wYXJzZUZsb2F0KHUubGVmdCk7J251bWJlcic9PXR5cGVvZiBmLm1pbkxlZnQmJihmLm1pbkxlZnQrPSdweCcpLGMuc3R5bGUubGVmdD1mLm1pbkxlZnQ7bGV0IEg9cGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjKS5sZWZ0KTtXPkgmJihjLnN0eWxlLmxlZnQ9VysncHgnKSx1LmxlZnQ9d2luZG93LmdldENvbXB1dGVkU3R5bGUoYykubGVmdH1pZihmLm1heExlZnQpe2xldCBXPXBhcnNlRmxvYXQodS5sZWZ0KTsnbnVtYmVyJz09dHlwZW9mIGYubWF4TGVmdCYmKGYubWF4TGVmdCs9J3B4JyksYy5zdHlsZS5sZWZ0PWYubWF4TGVmdDtsZXQgSD1wYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGMpLmxlZnQpO1c8SCYmKGMuc3R5bGUubGVmdD1XKydweCcpLHUubGVmdD13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjKS5sZWZ0fWlmKGYubWF4VG9wKXtsZXQgVz1wYXJzZUZsb2F0KHUudG9wKTsnbnVtYmVyJz09dHlwZW9mIGYubWF4VG9wJiYoZi5tYXhUb3ArPSdweCcpLGMuc3R5bGUudG9wPWYubWF4VG9wO2xldCBIPXBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUoYykudG9wKTtXPEgmJihjLnN0eWxlLnRvcD1XKydweCcpLHUudG9wPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGMpLnRvcH1pZihmLm1pblRvcCl7bGV0IFc9cGFyc2VGbG9hdCh1LnRvcCk7J251bWJlcic9PXR5cGVvZiBmLm1pblRvcCYmKGYubWluVG9wKz0ncHgnKSxjLnN0eWxlLnRvcD1mLm1pblRvcDtsZXQgSD1wYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGMpLnRvcCk7Vz5IJiYoYy5zdHlsZS50b3A9VysncHgnKSx1LnRvcD13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjKS50b3B9aWYoJ2Z1bmN0aW9uJz09dHlwZW9mIGYubW9kaWZ5KXtsZXQgVz1mLm1vZGlmeS5jYWxsKHUsdSk7Yy5zdHlsZS5sZWZ0PVcubGVmdCxjLnN0eWxlLnRvcD1XLnRvcH1yZXR1cm4gYy5zdHlsZS5vcGFjaXR5PTEsYy5zdHlsZS5sZWZ0PXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGMpLmxlZnQsYy5zdHlsZS50b3A9d2luZG93LmdldENvbXB1dGVkU3R5bGUoYykudG9wLGN9LHByb2Nlc3NDYWxsYmFja3MobixvLGM9J3NvbWUnLGYpe3JldHVybidmdW5jdGlvbic9PXR5cGVvZiBvJiYobz1bb10pLGM/b1tjXShmdW5jdGlvbihtKXtpZignZnVuY3Rpb24nPT10eXBlb2YgbSlyZXR1cm4gbS5jYWxsKG4sbixmKX0pOnZvaWQgby5mb3JFYWNoKGZ1bmN0aW9uKG0pe20uY2FsbChuLG4sZil9KX0scmdiVG9Ic2wobixvLGMpe24vPTI1NSxvLz0yNTUsYy89MjU1O2xldCB1LHksZj1NYXRoLm1heChuLG8sYyksbT1NYXRoLm1pbihuLG8sYyksdj0oZittKS8yO2lmKGY9PT1tKXU9eT0wO2Vsc2V7bGV0IHg9Zi1tO3k9MC41PHY/eC8oMi1mLW0pOngvKGYrbSksZj09PW4/dT0oby1jKS94KyhvPGM/NjowKTpmPT09bz91PShjLW4pL3grMjpmPT09Yz91PShuLW8pL3grNDp2b2lkIDAsdS89Nn1yZXR1cm4gdSo9MzYwLHk9MTAwKnkrJyUnLHY9MTAwKnYrJyUnLHtjc3M6J2hzbCgnK3UrJywnK3krJywnK3YrJyknLGg6dSxzOnksbDp2fX0scmdiVG9IZXgobixvLGMpe2xldCBmPSgrbikudG9TdHJpbmcoMTYpLG09KCtvKS50b1N0cmluZygxNiksdT0oK2MpLnRvU3RyaW5nKDE2KTtyZXR1cm4gMT09PWYubGVuZ3RoJiYoZj1gMCR7Zn1gKSwxPT09bS5sZW5ndGgmJihtPWAwJHttfWApLDE9PT11Lmxlbmd0aCYmKHU9YDAke3V9YCksYCMke2Z9JHttfSR7dX1gfSxyZW1vdmVTbmFwQXJlYXMobil7ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzUGFuZWwtc25hcC1hcmVhJykuZm9yRWFjaChmdW5jdGlvbihvKXtuLnBhcmVudEVsZW1lbnQmJm4ucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChvKX0pfSxyZXNldFppKCl7dGhpcy56aT0oKG49anNQYW5lbC56aUJhc2UpPT57bGV0IG89bjtyZXR1cm57bmV4dDooKT0+e3JldHVybiBvKyt9fX0pKCksQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzUGFuZWwtc3RhbmRhcmQnKSkuc29ydCgobixvKT0+e3JldHVybiBuLnN0eWxlLnpJbmRleC1vLnN0eWxlLnpJbmRleH0pLmZvckVhY2gobj0+e24uc3R5bGUuekluZGV4PWpzUGFuZWwuemkubmV4dCgpfSl9LHJlc2l6ZWl0KG4sbz17fSl7bGV0IEUseixDLFMsaixjPU9iamVjdC5hc3NpZ24oe30sdGhpcy5kZWZhdWx0cy5yZXNpemVpdCxvKSxmPW4ucGFyZW50RWxlbWVudCxtPWYudGFnTmFtZS50b0xvd2VyQ2FzZSgpLHU9J2Z1bmN0aW9uJz09dHlwZW9mIGMubWF4V2lkdGg/Yy5tYXhXaWR0aCgpOmMubWF4V2lkdGh8fDFlNCx5PSdmdW5jdGlvbic9PXR5cGVvZiBjLm1heEhlaWdodD9jLm1heEhlaWdodCgpOmMubWF4SGVpZ2h0fHwxZTQsdj0nZnVuY3Rpb24nPT10eXBlb2YgYy5taW5XaWR0aD9jLm1pbldpZHRoKCk6Yy5taW5XaWR0aCx4PSdmdW5jdGlvbic9PXR5cGVvZiBjLm1pbkhlaWdodD9jLm1pbkhlaWdodCgpOmMubWluSGVpZ2h0LFA9W107Y29uc3QgVD1uZXcgQ3VzdG9tRXZlbnQoJ2pzcGFuZWxyZXNpemVzdGFydCcse2RldGFpbDpuLmlkfSksTD1uZXcgQ3VzdG9tRXZlbnQoJ2pzcGFuZWxyZXNpemUnLHtkZXRhaWw6bi5pZH0pLGs9bmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVscmVzaXplc3RvcCcse2RldGFpbDpuLmlkfSk7cmV0dXJuIEU9dGhpcy5wT2NvbnRhaW5tZW50KGMuY29udGFpbm1lbnQpLGMuaGFuZGxlcy5zcGxpdCgnLCcpLmZvckVhY2goQT0+e2NvbnN0IFc9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7Vy5jbGFzc05hbWU9YGpzUGFuZWwtcmVzaXplaXQtaGFuZGxlIGpzUGFuZWwtcmVzaXplaXQtJHtBLnRyaW0oKX1gLFcuc3R5bGUuekluZGV4PTkwLG4uYXBwZW5kKFcpfSksbi5xdWVyeVNlbGVjdG9yQWxsKCcuanNQYW5lbC1yZXNpemVpdC1oYW5kbGUnKS5mb3JFYWNoKEE9Pntqc1BhbmVsLnBvaW50ZXJkb3duLmZvckVhY2goZnVuY3Rpb24oVyl7QS5hZGRFdmVudExpc3RlbmVyKFcsSD0+e0gucHJldmVudERlZmF1bHQoKSxQPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lmcmFtZScpLFAubGVuZ3RoJiZQLmZvckVhY2goZnVuY3Rpb24ob2Upe29lLnN0eWxlLnBvaW50ZXJFdmVudHM9J25vbmUnfSk7Y29uc3QgUj1uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLEI9Zi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxEPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGYsbnVsbCksTz1wYXJzZUludChELmJvcmRlckxlZnRXaWR0aCwxMCksTT1wYXJzZUludChELmJvcmRlclRvcFdpZHRoLDEwKSxJPUQuZ2V0UHJvcGVydHlWYWx1ZSgncG9zaXRpb24nKSxOPUguY2xpZW50WHx8SC50b3VjaGVzWzBdLmNsaWVudFgsWD1ILmNsaWVudFl8fEgudG91Y2hlc1swXS5jbGllbnRZLFk9Ui53aWR0aCxGPVIuaGVpZ2h0LFY9SC50YXJnZXQuY2xhc3NMaXN0O2xldCBfPVIubGVmdCxLPVIudG9wLEc9MWU0LFU9MWU0LFo9MWU0LEo9MWU0O24uY29udGVudC5zdHlsZS5wb2ludGVyRXZlbnRzPSdub25lJywnYm9keSchPT1tJiYoXz1SLmxlZnQtQi5sZWZ0K2Yuc2Nyb2xsTGVmdCxLPVIudG9wLUIudG9wK2Yuc2Nyb2xsVG9wKSwnYm9keSc9PT1tJiZFPyhHPWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aC1SLmxlZnQsWj1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LVIudG9wLFU9Ui53aWR0aCtSLmxlZnQsSj1SLmhlaWdodCtSLnRvcCk6RSYmKCdzdGF0aWMnPT09ST8oRz1CLndpZHRoLVIubGVmdCtPLFo9Qi5oZWlnaHQrQi50b3AtUi50b3ArTSxVPVIud2lkdGgrKFIubGVmdC1CLmxlZnQpLU8sSj1SLmhlaWdodCsoUi50b3AtQi50b3ApLU0pOihHPWYuY2xpZW50V2lkdGgtKFIubGVmdC1CLmxlZnQpK08sWj1mLmNsaWVudEhlaWdodC0oUi50b3AtQi50b3ApK00sVT1SLndpZHRoKyhSLmxlZnQtQi5sZWZ0KS1PLEo9bi5jbGllbnRIZWlnaHQrKFIudG9wLUIudG9wKS1NKSksRSYmKFUtPUVbM10sSi09RVswXSxHLT1FWzFdLFotPUVbMl0pO2NvbnN0IFE9d2luZG93LmdldENvbXB1dGVkU3R5bGUobik7bGV0IGVlPXBhcnNlRmxvYXQoUS53aWR0aCktUi53aWR0aCx0ZT1wYXJzZUZsb2F0KFEuaGVpZ2h0KS1SLmhlaWdodCxuZT1wYXJzZUZsb2F0KFEubGVmdCktUi5sZWZ0LGFlPXBhcnNlRmxvYXQoUS50b3ApLVIudG9wO2YhPT1kb2N1bWVudC5ib2R5JiYobmUrPUIubGVmdCxhZSs9Qi50b3ApLHo9b2U9PntDfHwoZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChUKSxjLnN0YXJ0JiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3MobixjLnN0YXJ0LCExLHt3aWR0aDpZLGhlaWdodDpGfSksanNQYW5lbC5mcm9udChuKSksQz0xLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoTCksKFYuY29udGFpbnMoJ2pzUGFuZWwtcmVzaXplaXQtZScpfHxWLmNvbnRhaW5zKCdqc1BhbmVsLXJlc2l6ZWl0LXNlJyl8fFYuY29udGFpbnMoJ2pzUGFuZWwtcmVzaXplaXQtbmUnKSkmJihTPVkrKG9lLmNsaWVudFh8fG9lLnRvdWNoZXNbMF0uY2xpZW50WCktTitlZSxTPj1HJiYoUz1HKSxTPj11P1M9dTpTPD12JiYoUz12KSxuLnN0eWxlLndpZHRoPVMrJ3B4JyksKFYuY29udGFpbnMoJ2pzUGFuZWwtcmVzaXplaXQtcycpfHxWLmNvbnRhaW5zKCdqc1BhbmVsLXJlc2l6ZWl0LXNlJyl8fFYuY29udGFpbnMoJ2pzUGFuZWwtcmVzaXplaXQtc3cnKSkmJihqPUYrKG9lLmNsaWVudFl8fG9lLnRvdWNoZXNbMF0uY2xpZW50WSktWCt0ZSxqPj1aJiYoaj1aKSxqPj15P2o9eTpqPD14JiYoaj14KSxuLnN0eWxlLmhlaWdodD1qKydweCcpLChWLmNvbnRhaW5zKCdqc1BhbmVsLXJlc2l6ZWl0LXcnKXx8Vi5jb250YWlucygnanNQYW5lbC1yZXNpemVpdC1udycpfHxWLmNvbnRhaW5zKCdqc1BhbmVsLXJlc2l6ZWl0LXN3JykpJiYoUz1ZK04tKG9lLmNsaWVudFh8fG9lLnRvdWNoZXNbMF0uY2xpZW50WCkrZWUsUzw9dSYmUz49diYmUzw9VSYmKG4uc3R5bGUubGVmdD1fKyhvZS5jbGllbnRYfHxvZS50b3VjaGVzWzBdLmNsaWVudFgpLU4rbmUrJ3B4JyksUz49VSYmKFM9VSksUz49dT9TPXU6Uzw9diYmKFM9diksbi5zdHlsZS53aWR0aD1TKydweCcpLChWLmNvbnRhaW5zKCdqc1BhbmVsLXJlc2l6ZWl0LW4nKXx8Vi5jb250YWlucygnanNQYW5lbC1yZXNpemVpdC1udycpfHxWLmNvbnRhaW5zKCdqc1BhbmVsLXJlc2l6ZWl0LW5lJykpJiYoaj1GK1gtKG9lLmNsaWVudFl8fG9lLnRvdWNoZXNbMF0uY2xpZW50WSkrdGUsajw9eSYmaj49eCYmajw9SiYmKG4uc3R5bGUudG9wPUsrKG9lLmNsaWVudFl8fG9lLnRvdWNoZXNbMF0uY2xpZW50WSktWCthZSsncHgnKSxqPj1KJiYoaj1KKSxqPj15P2o9eTpqPD14JiYoaj14KSxuLnN0eWxlLmhlaWdodD1qKydweCcpLHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtjb25zdCBpZT13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShuKSxsZT17bGVmdDpwYXJzZUZsb2F0KGllLmxlZnQpLHRvcDpwYXJzZUZsb2F0KGllLnRvcCkscmlnaHQ6cGFyc2VGbG9hdChpZS5yaWdodCksYm90dG9tOnBhcnNlRmxvYXQoaWUuYm90dG9tKSx3aWR0aDpwYXJzZUZsb2F0KGllLndpZHRoKSxoZWlnaHQ6cGFyc2VGbG9hdChpZS5oZWlnaHQpfTtjLnJlc2l6ZSYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKG4sYy5yZXNpemUsITEsbGUpfSxqc1BhbmVsLnBvaW50ZXJtb3ZlLmZvckVhY2goZnVuY3Rpb24ob2Upe2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIob2UseiwhMSl9KSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLG9lPT57bnVsbD09PW9lLnJlbGF0ZWRUYXJnZXQmJmpzUGFuZWwucG9pbnRlcm1vdmUuZm9yRWFjaChmdW5jdGlvbihpZSl7ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihpZSx6LCExKX0pfSwhMSl9KX0pfSksanNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbihBKXtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKEEsVz0+e2lmKGpzUGFuZWwucG9pbnRlcm1vdmUuZm9yRWFjaChmdW5jdGlvbihIKXtkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKEgseiwhMSl9KSxXLnRhcmdldC5jbGFzc0xpc3QmJlcudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnanNQYW5lbC1yZXNpemVpdC1oYW5kbGUnKSl7bGV0IEgsUjtjb25zdCBCPVcudGFyZ2V0LmNsYXNzTmFtZTtpZihCLm1hdGNoKC9qc1BhbmVsLXJlc2l6ZWl0LW53fGpzUGFuZWwtcmVzaXplaXQtd3xqc1BhbmVsLXJlc2l6ZWl0LXN3L2kpJiYoSD0hMCksQi5tYXRjaCgvanNQYW5lbC1yZXNpemVpdC1ud3xqc1BhbmVsLXJlc2l6ZWl0LW58anNQYW5lbC1yZXNpemVpdC1uZS9pKSYmKFI9ITApLGMuZ3JpZCYmQXJyYXkuaXNBcnJheShjLmdyaWQpKXsxPT09Yy5ncmlkLmxlbmd0aCYmKGMuZ3JpZFsxXT1jLmdyaWRbMF0pO2NvbnN0IEQ9cGFyc2VGbG9hdChuLnN0eWxlLndpZHRoKSxPPXBhcnNlRmxvYXQobi5zdHlsZS5oZWlnaHQpLE09RCVjLmdyaWRbMF0sST1PJWMuZ3JpZFsxXSxOPXBhcnNlRmxvYXQobi5zdHlsZS5sZWZ0KSxYPXBhcnNlRmxvYXQobi5zdHlsZS50b3ApLFk9TiVjLmdyaWRbMF0sRj1YJWMuZ3JpZFsxXTtuLnN0eWxlLndpZHRoPU08Yy5ncmlkWzBdLzI/RC1NKydweCc6RCsoYy5ncmlkWzBdLU0pKydweCcsbi5zdHlsZS5oZWlnaHQ9STxjLmdyaWRbMV0vMj9PLUkrJ3B4JzpPKyhjLmdyaWRbMV0tSSkrJ3B4JyxIJiYoWTxjLmdyaWRbMF0vMj9uLnN0eWxlLmxlZnQ9Ti1ZKydweCc6bi5zdHlsZS5sZWZ0PU4rKGMuZ3JpZFswXS1ZKSsncHgnKSxSJiYoRjxjLmdyaWRbMV0vMj9uLnN0eWxlLnRvcD1YLUYrJ3B4JzpuLnN0eWxlLnRvcD1YKyhjLmdyaWRbMV0tRikrJ3B4Jyl9fUMmJihuLmNvbnRlbnQuc3R5bGUucG9pbnRlckV2ZW50cz0naW5oZXJpdCcsZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChrKSxDPXZvaWQgMCxuLnNhdmVDdXJyZW50RGltZW5zaW9ucygpLG4uc2F2ZUN1cnJlbnRQb3NpdGlvbigpLGMuc3RvcCYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKG4sYy5zdG9wLCExLHt3aWR0aDpwYXJzZUZsb2F0KG4uc3R5bGUud2lkdGgpLGhlaWdodDpwYXJzZUZsb2F0KG4uc3R5bGUuaGVpZ2h0KX0pKSxQLmxlbmd0aCYmUC5mb3JFYWNoKGZ1bmN0aW9uKEgpe0guc3R5bGUucG9pbnRlckV2ZW50cz0naW5oZXJpdCd9KX0sITEpfSksYy5kaXNhYmxlJiZuLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZScpLmZvckVhY2goQT0+e0Euc3R5bGUucG9pbnRlckV2ZW50cz0nbm9uZSd9KSxufSxzZXRDbGFzcyhuLG8pe3JldHVybiBvLnNwbGl0KCcgJykuZm9yRWFjaChjPT5uLmNsYXNzTGlzdC5hZGQoYykpLG59LHJlbUNsYXNzKG4sbyl7cmV0dXJuIG8uc3BsaXQoJyAnKS5mb3JFYWNoKGM9Pm4uY2xhc3NMaXN0LnJlbW92ZShjKSksbn0sc2V0U3R5bGUobixvKXtmb3IobGV0IGMgaW4gbylpZihvLmhhc093blByb3BlcnR5KGMpKXtsZXQgZj0oYysnJykucmVwbGFjZSgvLVxcdy9naSxtPT57cmV0dXJuIG0uc3Vic3RyKC0xKS50b1VwcGVyQ2FzZSgpfSk7bi5zdHlsZVtmXT1vW2NdfXJldHVybiBufSxzbmFwUGFuZWwobixvKXtpZihuLmN1cnJlbnREYXRhLmJlZm9yZVNuYXA9e3dpZHRoOm4uY3VycmVudERhdGEud2lkdGgsaGVpZ2h0Om4uY3VycmVudERhdGEuaGVpZ2h0fSxvJiYnZnVuY3Rpb24nPT10eXBlb2YgbylvLmNhbGwobixuLG4uc25hcHBhYmxlVG8pO2Vsc2UgaWYoITEhPT1vKXtsZXQgYz1bMCwwXTtpZihuLm9wdGlvbnMuZHJhZ2l0LnNuYXAuY29udGFpbm1lbnQmJm4ub3B0aW9ucy5kcmFnaXQuY29udGFpbm1lbnQpe2NvbnN0IGY9dGhpcy5wT2NvbnRhaW5tZW50KG4ub3B0aW9ucy5kcmFnaXQuY29udGFpbm1lbnQpLG09bi5zbmFwcGFibGVUbzttLnN0YXJ0c1dpdGgoJ2xlZnQnKT9jWzBdPWZbM106bS5zdGFydHNXaXRoKCdyaWdodCcpJiYoY1swXT0tZlsxXSksbS5lbmRzV2l0aCgndG9wJyk/Y1sxXT1mWzBdOm0uZW5kc1dpdGgoJ2JvdHRvbScpJiYoY1sxXT0tZlsyXSl9bi5yZXBvc2l0aW9uKGAke24uc25hcHBhYmxlVG99ICR7Y1swXX0gJHtjWzFdfWApLG4uc25hcHBlZD1uLnNuYXBwYWJsZVRvfX0sY3JlYXRlKG49e30sbyl7anNQYW5lbC56aXx8KGpzUGFuZWwuemk9KChYPWpzUGFuZWwuemlCYXNlKT0+e2xldCBZPVg7cmV0dXJue25leHQ6KCk9PntyZXR1cm4gWSsrfX19KSgpKTtsZXQgYztuLmNvbmZpZz8obj1PYmplY3QuYXNzaWduKHt9LHRoaXMuZGVmYXVsdHMsbi5jb25maWcsbiksZGVsZXRlIG4uY29uZmlnKTpuPU9iamVjdC5hc3NpZ24oe30sdGhpcy5kZWZhdWx0cyxuKSxuLmlkPydmdW5jdGlvbic9PXR5cGVvZiBuLmlkJiYobi5pZD1uLmlkKCkpOm4uaWQ9YGpzUGFuZWwtJHtqc1BhbmVsLmlkQ291bnRlcis9MX1gO2NvbnN0IGY9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobi5pZCk7aWYobnVsbCE9PWYpe2YuY2xhc3NMaXN0LmNvbnRhaW5zKCdqc1BhbmVsJykmJmYuZnJvbnQoKTtjb25zdCBYPW5ldyBqc1BhbmVsRXJyb3IoJ05PIE5FVyBQQU5FTCBDUkVBVEVEIVxcbkFuIGVsZW1lbnQgd2l0aCB0aGUgSUQgPCcrbi5pZCsnPiBhbHJlYWR5IGV4aXN0cyBpbiB0aGUgZG9jdW1lbnQuJyk7dHJ5e3Rocm93IFh9Y2F0Y2goWSl7byYmby5jYWxsKFksWSl9cmV0dXJuIGNvbnNvbGUuZXJyb3IoWC5uYW1lKyc6JyxYLm1lc3NhZ2UpfWNvbnN0IG09dGhpcy5wT2NvbnRhaW5lcihuLmNvbnRhaW5lcixvKTtpZihtJiZtLm1lc3NhZ2UpcmV0dXJuIGNvbnNvbGUuZXJyb3IobS5uYW1lKyc6JyxtLm1lc3NhZ2UpO24ubWF4aW1pemVkTWFyZ2luPXRoaXMucE9jb250YWlubWVudChuLm1heGltaXplZE1hcmdpbiksbi5kcmFnaXQmJihbJ3N0YXJ0JywnZHJhZycsJ3N0b3AnXS5mb3JFYWNoKGZ1bmN0aW9uKFgpe24uZHJhZ2l0W1hdPydmdW5jdGlvbic9PXR5cGVvZiBuLmRyYWdpdFtYXSYmKG4uZHJhZ2l0W1hdPVtuLmRyYWdpdFtYXV0pOm4uZHJhZ2l0W1hdPVtdfSksbi5kcmFnaXQuc25hcCYmKCdvYmplY3QnPT10eXBlb2Ygbi5kcmFnaXQuc25hcD9uLmRyYWdpdC5zbmFwPU9iamVjdC5hc3NpZ24oe30sdGhpcy5kZWZhdWx0U25hcENvbmZpZyxuLmRyYWdpdC5zbmFwKTpuLmRyYWdpdC5zbmFwPXRoaXMuZGVmYXVsdFNuYXBDb25maWcpKSxuLnJlc2l6ZWl0JiZbJ3N0YXJ0JywncmVzaXplJywnc3RvcCddLmZvckVhY2goZnVuY3Rpb24oWCl7bi5yZXNpemVpdFtYXT8nZnVuY3Rpb24nPT10eXBlb2Ygbi5yZXNpemVpdFtYXSYmKG4ucmVzaXplaXRbWF09W24ucmVzaXplaXRbWF1dKTpuLnJlc2l6ZWl0W1hdPVtdfSksWydvbmJlZm9yZWNsb3NlJywnb25iZWZvcmVtYXhpbWl6ZScsJ29uYmVmb3JlbWluaW1pemUnLCdvbmJlZm9yZW5vcm1hbGl6ZScsJ29uYmVmb3Jlc21hbGxpZnknLCdvbmJlZm9yZXVuc21hbGxpZnknLCdvbmNsb3NlZCcsJ29uZnJvbnRlZCcsJ29ubWF4aW1pemVkJywnb25taW5pbWl6ZWQnLCdvbm5vcm1hbGl6ZWQnLCdvbnNtYWxsaWZpZWQnLCdvbnN0YXR1c2NoYW5nZScsJ29udW5zbWFsbGlmaWVkJ10uZm9yRWFjaChmdW5jdGlvbihYKXtuW1hdPydmdW5jdGlvbic9PXR5cGVvZiBuW1hdJiYobltYXT1bbltYXV0pOm5bWF09W119KSxuLmhlYWRlclJlbW92ZSYmKG4uaGVhZGVyPSExKTtsZXQgdT1uLnRlbXBsYXRlP24udGVtcGxhdGU6dGhpcy5jcmVhdGVQYW5lbFRlbXBsYXRlKCk7dS5vcHRpb25zPW4sdS5zdGF0dXM9J2luaXRpYWxpemVkJyx1LmN1cnJlbnREYXRhPXt9LHUuaGVhZGVyPXUucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtaGRyJyksdS5oZWFkZXJiYXI9dS5oZWFkZXIucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtaGVhZGVyYmFyJyksdS50aXRsZWJhcj11LmhlYWRlci5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC10aXRsZWJhcicpLHUuaGVhZGVybG9nbz11LmhlYWRlcmJhci5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1oZWFkZXJsb2dvJyksdS5oZWFkZXJ0aXRsZT11LmhlYWRlcmJhci5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC10aXRsZScpLHUuY29udHJvbGJhcj11LmhlYWRlcmJhci5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1jb250cm9sYmFyJyksdS5oZWFkZXJ0b29sYmFyPXUuaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWhkci10b29sYmFyJyksdS5jb250ZW50PXUucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtY29udGVudCcpLHUuZm9vdGVyPXUucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtZnRyJyksdS5zbmFwcGFibGVUbz0hMSx1LnNuYXBwZWQ9ITE7Y29uc3QgeT1uZXcgQ3VzdG9tRXZlbnQoJ2pzcGFuZWxsb2FkZWQnLHtkZXRhaWw6bi5pZH0pLHY9bmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVsYmVmb3JlY2xvc2UnLHtkZXRhaWw6bi5pZH0pLHg9bmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVsY2xvc2VkJyx7ZGV0YWlsOm4uaWR9KSxFPW5ldyBDdXN0b21FdmVudCgnanNwYW5lbHN0YXR1c2NoYW5nZScse2RldGFpbDpuLmlkfSksej1uZXcgQ3VzdG9tRXZlbnQoJ2pzcGFuZWxiZWZvcmVub3JtYWxpemUnLHtkZXRhaWw6bi5pZH0pLEM9bmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVsbm9ybWFsaXplZCcse2RldGFpbDpuLmlkfSksUz1uZXcgQ3VzdG9tRXZlbnQoJ2pzcGFuZWxiZWZvcmVtYXhpbWl6ZScse2RldGFpbDpuLmlkfSksaj1uZXcgQ3VzdG9tRXZlbnQoJ2pzcGFuZWxtYXhpbWl6ZWQnLHtkZXRhaWw6bi5pZH0pLFA9bmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVsYmVmb3JlbWluaW1pemUnLHtkZXRhaWw6bi5pZH0pLFQ9bmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVsbWluaW1pemVkJyx7ZGV0YWlsOm4uaWR9KSxMPW5ldyBDdXN0b21FdmVudCgnanNwYW5lbGJlZm9yZXNtYWxsaWZ5Jyx7ZGV0YWlsOm4uaWR9KSxrPW5ldyBDdXN0b21FdmVudCgnanNwYW5lbHNtYWxsaWZpZWQnLHtkZXRhaWw6bi5pZH0pLEE9bmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVsc21hbGxpZmllZG1heCcse2RldGFpbDpuLmlkfSksVz1uZXcgQ3VzdG9tRXZlbnQoJ2pzcGFuZWxiZWZvcmV1bnNtYWxsaWZ5Jyx7ZGV0YWlsOm4uaWR9KSxIPW5ldyBDdXN0b21FdmVudCgnanNwYW5lbGZyb250ZWQnLHtkZXRhaWw6bi5pZH0pLFI9dS5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1idG4tY2xvc2UnKSxCPXUucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtYnRuLW1heGltaXplJyksRD11LnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWJ0bi1ub3JtYWxpemUnKSxPPXUucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtYnRuLXNtYWxsaWZ5JyksTT11LnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWJ0bi1zbWFsbGlmeXJldicpLEk9dS5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1idG4tbWluaW1pemUnKTtSJiZqc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKFg9PntSLmFkZEV2ZW50TGlzdGVuZXIoWCxZPT57WS5wcmV2ZW50RGVmYXVsdCgpLHUuY2xvc2UoKX0pfSksQiYmanNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChYPT57Qi5hZGRFdmVudExpc3RlbmVyKFgsWT0+e1kucHJldmVudERlZmF1bHQoKSx1Lm1heGltaXplKCl9KX0pLEQmJmpzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goWD0+e0QuYWRkRXZlbnRMaXN0ZW5lcihYLFk9PntZLnByZXZlbnREZWZhdWx0KCksdS5ub3JtYWxpemUoKX0pfSksTyYmanNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChYPT57Ty5hZGRFdmVudExpc3RlbmVyKFgsWT0+e1kucHJldmVudERlZmF1bHQoKSx1LnNtYWxsaWZ5KCl9KX0pLE0mJmpzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goWD0+e00uYWRkRXZlbnRMaXN0ZW5lcihYLFk9PntZLnByZXZlbnREZWZhdWx0KCksdS51bnNtYWxsaWZ5KCl9KX0pLEkmJmpzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goWD0+e0kuYWRkRXZlbnRMaXN0ZW5lcihYLFk9PntZLnByZXZlbnREZWZhdWx0KCksdS5taW5pbWl6ZSgpfSl9KTtsZXQgTj1qc1BhbmVsLmV4dGVuc2lvbnM7Zm9yKGxldCBYIGluIE4pTi5oYXNPd25Qcm9wZXJ0eShYKSYmKHVbWF09TltYXSk7aWYodS5hZGRUb29sYmFyPShYLFksRik9PntpZignaGVhZGVyJz09PVg/WD11LmhlYWRlcnRvb2xiYXI6J2Zvb3Rlcic9PVgmJihYPXUuZm9vdGVyKSwnc3RyaW5nJz09dHlwZW9mIFkpWC5pbm5lckhUTUw9WTtlbHNlIGlmKEFycmF5LmlzQXJyYXkoWSkpWS5mb3JFYWNoKFY9Pnsnc3RyaW5nJz09dHlwZW9mIFY/WC5pbm5lckhUTUwrPVY6WC5hcHBlbmQoVil9KTtlbHNlIGlmKCdmdW5jdGlvbic9PXR5cGVvZiBZKXtjb25zdCBWPVkuY2FsbCh1LHUpOydzdHJpbmcnPT10eXBlb2YgVj9YLmlubmVySFRNTD1WOlguYXBwZW5kKFYpfWVsc2UgWC5hcHBlbmQoWSk7cmV0dXJuIFguY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyksRiYmRi5jYWxsKHUsdSksdX0sdS5hcHBseUJ1aWx0SW5UaGVtZT1YPT57cmV0dXJuIHUuY2xhc3NMaXN0LmFkZChganNQYW5lbC10aGVtZS0ke1guY29sb3J9YCksdS5oZWFkZXIuY2xhc3NMaXN0LmFkZChganNQYW5lbC10aGVtZS0ke1guY29sb3J9YCksWC5maWxsaW5nJiYodS5jb250ZW50LnN0eWxlLmJhY2tncm91bmQ9JycsdS5jb250ZW50LmNsYXNzTGlzdC5hZGQoYGpzUGFuZWwtY29udGVudC0ke1guZmlsbGluZ31gKSksbi5oZWFkZXJUb29sYmFyfHwodS5jb250ZW50LnN0eWxlLmJhY2tncm91bmQ9JycsdS5jb250ZW50LnN0eWxlLmJvcmRlclRvcD1gMXB4IHNvbGlkICR7dS5oZWFkZXJ0aXRsZS5zdHlsZS5jb2xvcn1gKSx1fSx1LmFwcGx5QXJiaXRyYXJ5VGhlbWU9WD0+e3JldHVybiB1LmhlYWRlci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I9WC5jb2xvcnNbMF0sWycuanNQYW5lbC1oZWFkZXJsb2dvJywnLmpzUGFuZWwtdGl0bGUnLCcuanNQYW5lbC1oZHItdG9vbGJhciddLmZvckVhY2goWT0+e3UucXVlcnlTZWxlY3RvcihZKS5zdHlsZS5jb2xvcj1YLmNvbG9yc1szXX0sdSksdS5xdWVyeVNlbGVjdG9yQWxsKCcuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0bicpLmZvckVhY2goWT0+e1kuc3R5bGUuY29sb3I9WC5jb2xvcnNbM119KSxuLmhlYWRlclRvb2xiYXI/anNQYW5lbC5zZXRTdHlsZSh1LmhlYWRlcnRvb2xiYXIse2JveFNoYWRvdzpgMCAwIDFweCAke1guY29sb3JzWzNdfSBpbnNldGAsd2lkdGg6J2NhbGMoMTAwJSArIDRweCknLG1hcmdpbkxlZnQ6Jy0xcHgnfSk6dS5jb250ZW50LnN0eWxlLmJvcmRlclRvcD1gMXB4IHNvbGlkICR7WC5jb2xvcnNbM119YCwnZmlsbGVkJz09PVguZmlsbGluZz8odS5jb250ZW50LnN0eWxlLmJhY2tncm91bmRDb2xvcj1YLmNvbG9yc1swXSx1LmNvbnRlbnQuc3R5bGUuY29sb3I9WC5jb2xvcnNbM10pOidmaWxsZWRsaWdodCc9PT1YLmZpbGxpbmcmJih1LmNvbnRlbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yPVguY29sb3JzWzFdKSx1fSx1LmFwcGx5Qm9vdHN0cmFwVGhlbWU9WD0+e2NvbnN0IFk9WC5ic3RoZW1lLEY9JC5mbi5idXR0b24uQ29uc3RydWN0b3IuVkVSU0lPTlswXTtpZignNCc9PT1GP3UuY2xhc3NMaXN0LmFkZChgYmctJHtZfWApOihbJ3BhbmVsJyxgcGFuZWwtJHtZfWBdLmZvckVhY2goSz0+e3UuY2xhc3NMaXN0LmFkZChLKX0pLHUuaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3BhbmVsLWhlYWRpbmcnKSksJ21kYic9PT1YLmJzKXtsZXQgSz1gJHtZfS1jb2xvcmA7WC5tZGJTdHlsZSYmKEs9YCR7S30tZGFya2ApLHUuY2xhc3NMaXN0LmFkZChLKX1sZXQgVj0nNCc9PT1GP3dpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHUpLmJhY2tncm91bmRDb2xvci5yZXBsYWNlKC9cXHMrL2csJycpOndpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHUuaGVhZGVyKS5iYWNrZ3JvdW5kQ29sb3IucmVwbGFjZSgvXFxzKy9nLCcnKTtsZXQgXz1qc1BhbmVsLmNhbGNDb2xvcnMoVik7cmV0dXJuIHUuaGVhZGVyLnN0eWxlLmNvbG9yPV9bM10sWC5maWxsaW5nP3Uuc2V0VGhlbWUoYCR7Vn0gJHtYLmZpbGxpbmd9YCk6dS5zZXRUaGVtZShWKSx1fSx1LmFwcGx5VGhlbWVCb3JkZXI9WD0+e2NvbnN0IFk9bi5ib3JkZXIuc3BsaXQoJyAnKTtpZih1LnN0eWxlLmJvcmRlcldpZHRoPVlbMF0sdS5zdHlsZS5ib3JkZXJTdHlsZT1ZWzFdLHUuc3R5bGUuYm9yZGVyQ29sb3I9WVsyXSwhWC5icyktMT09PWpzUGFuZWwudGhlbWVzLmluZGV4T2YoWC5jb2xvcikmJihZWzJdP3Uuc3R5bGUuYm9yZGVyQ29sb3I9WVsyXTp1LnN0eWxlLmJvcmRlckNvbG9yPVguY29sb3JzWzBdKTtlbHNle2xldCBGO0Y9J3RyYW5zcGFyZW50Jz09PXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHUuaGVhZGVyKS5iYWNrZ3JvdW5kQ29sb3I/d2luZG93LmdldENvbXB1dGVkU3R5bGUodSkuYmFja2dyb3VuZENvbG9yLnJlcGxhY2UoL1xccysvZywnJyk6d2luZG93LmdldENvbXB1dGVkU3R5bGUodS5oZWFkZXIpLmJhY2tncm91bmRDb2xvci5yZXBsYWNlKC9cXHMrL2csJycpLHUuc3R5bGUuYm9yZGVyQ29sb3I9WVsyXT9ZWzJdOkZ9cmV0dXJuIHV9LHUuYXV0b3Bvc2l0aW9uUmVtYWluaW5nPSgpPT57bGV0IFg7WydsZWZ0LXRvcC1kb3duJywnbGVmdC10b3AtcmlnaHQnLCdjZW50ZXItdG9wLWRvd24nLCdyaWdodC10b3AtZG93bicsJ3JpZ2h0LXRvcC1sZWZ0JywnbGVmdC1ib3R0b20tdXAnLCdsZWZ0LWJvdHRvbS1yaWdodCcsJ2NlbnRlci1ib3R0b20tdXAnLCdyaWdodC1ib3R0b20tdXAnLCdyaWdodC1ib3R0b20tbGVmdCddLmZvckVhY2goWT0+e3UuY2xhc3NMaXN0LmNvbnRhaW5zKFkpJiYoWD1ZKX0pLFgmJm4uY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke1h9YCkuZm9yRWFjaChZPT57WS5yZXBvc2l0aW9uKCl9KX0sdS5jYWxjU2l6ZUZhY3RvcnM9KCk9Pntjb25zdCBYPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHUpO2lmKG4uY29udGFpbmVyPT09ZG9jdW1lbnQuYm9keSl1LmhmPXBhcnNlRmxvYXQodS5zdHlsZS5sZWZ0KS8oZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aC1wYXJzZUZsb2F0KHUuc3R5bGUud2lkdGgpKSx1LnZmPXBhcnNlRmxvYXQodS5zdHlsZS50b3ApLyh3aW5kb3cuaW5uZXJIZWlnaHQtcGFyc2VGbG9hdChYLmhlaWdodCkpO2Vsc2V7bGV0IFk9d2luZG93LmdldENvbXB1dGVkU3R5bGUodS5wYXJlbnRFbGVtZW50KTt1LmhmPXBhcnNlRmxvYXQodS5zdHlsZS5sZWZ0KS8ocGFyc2VGbG9hdChZLndpZHRoKS1wYXJzZUZsb2F0KHUuc3R5bGUud2lkdGgpKSx1LnZmPXBhcnNlRmxvYXQodS5zdHlsZS50b3ApLyhwYXJzZUZsb2F0KFkuaGVpZ2h0KS1wYXJzZUZsb2F0KFguaGVpZ2h0KSl9fSx1LmNsZWFyVGhlbWU9WD0+e3JldHVybiBqc1BhbmVsLnRoZW1lcy5jb25jYXQoanNQYW5lbC5tZGJ0aGVtZXMpLmZvckVhY2goWT0+e1sncGFuZWwnLGBqc1BhbmVsLXRoZW1lLSR7WX1gLGBwYW5lbC0ke1l9YCxgJHtZfS1jb2xvcmBdLmZvckVhY2goRj0+e3UuY2xhc3NMaXN0LnJlbW92ZShGKX0pLHUuaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3BhbmVsLWhlYWRpbmcnLGBqc1BhbmVsLXRoZW1lLSR7WX1gKX0sdSksdS5oZWFkZXJ0aXRsZS5jbGFzc0xpc3QucmVtb3ZlKCdwYW5lbC10aXRsZScpLHUuY29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdwYW5lbC1ib2R5JywnanNQYW5lbC1jb250ZW50LWZpbGxlZCcsJ2pzUGFuZWwtY29udGVudC1maWxsZWRsaWdodCcpLHUuZm9vdGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3BhbmVsLWZvb3RlcicpLGpzUGFuZWwuc2V0U3R5bGUodSx7YmFja2dyb3VuZENvbG9yOicnLGJvcmRlcldpZHRoOicnLGJvcmRlclN0eWxlOicnLGJvcmRlckNvbG9yOicnfSksanNQYW5lbC5zZXRTdHlsZSh1LmNvbnRlbnQse2JhY2tncm91bmQ6JycsYm9yZGVyOicnfSksanNQYW5lbC5zZXRTdHlsZSh1LmhlYWRlcnRvb2xiYXIse2JveFNoYWRvdzonJyx3aWR0aDonJyxtYXJnaW5MZWZ0OicnfSksdS5oZWFkZXIuc3R5bGUuYmFja2dyb3VuZD0nJyxBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh1LmNvbnRyb2xiYXIucXVlcnlTZWxlY3RvckFsbCgnLmpzUGFuZWwtaWNvbicpKS5jb25jYXQoW3UuaGVhZGVybG9nbyx1LmhlYWRlcnRpdGxlLHUuaGVhZGVydG9vbGJhcix1LmNvbnRlbnRdKS5mb3JFYWNoKFk9PntZLnN0eWxlLmNvbG9yPScnfSksWCYmWC5jYWxsKHUsdSksdX0sdS5jbG9zZT1YPT57Y29uc3QgWT0oKT0+e2NvbnN0IEY9bi5pZDtyZXR1cm4gYyYmd2luZG93LmNsZWFyVGltZW91dChjKSx1LmNsb3NlQ2hpbGRwYW5lbHMoKSx1LnBhcmVudEVsZW1lbnQmJnUucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh1KSwhZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycrRikmJnZvaWQodS5yZW1vdmVNaW5pbWl6ZWRSZXBsYWNlbWVudCgpLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoeCksWCYmWC5jYWxsKEYsRiksbi5vbmNsb3NlZCYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHUsbi5vbmNsb3NlZCwnZXZlcnknKSx1LmF1dG9wb3NpdGlvblJlbWFpbmluZygpKX07cmV0dXJuIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQodiksbi5vbmJlZm9yZWNsb3NlJiYwPG4ub25iZWZvcmVjbG9zZS5sZW5ndGgmJiFqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3ModSxuLm9uYmVmb3JlY2xvc2UpP3U6dm9pZChuLmFuaW1hdGVPdXQ/KG4uYW5pbWF0ZUluJiZqc1BhbmVsLnJlbUNsYXNzKHUsbi5hbmltYXRlSW4pLGpzUGFuZWwuc2V0Q2xhc3ModSxuLmFuaW1hdGVPdXQpLHUuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywoKT0+e1koKX0pKTpZKCkpfSx1LmNsb3NlQ2hpbGRwYW5lbHM9WD0+e3JldHVybiB1LmdldENoaWxkcGFuZWxzKCkuZm9yRWFjaChZPT5ZLmNsb3NlKCkpLFgmJlguY2FsbCh1LHUpLHV9LHUuY29udGVudFJlbW92ZT1YPT57cmV0dXJuIGpzUGFuZWwuZW1wdHlOb2RlKHUuY29udGVudCksWCYmWC5jYWxsKHUsdSksdX0sdS5jcmVhdGVNaW5pbWl6ZWRSZXBsYWNlbWVudD0oKT0+e2NvbnN0IFg9anNQYW5lbC5jcmVhdGVNaW5pbWl6ZWRUZW1wbGF0ZSgpLFk9d2luZG93LmdldENvbXB1dGVkU3R5bGUodS5oZWFkZXJ0aXRsZSkuY29sb3IsRj1uLmljb25mb250LFY9WC5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1jb250cm9sYmFyJyk7cmV0dXJuIFguc3R5bGUuYmFja2dyb3VuZENvbG9yPSd0cmFuc3BhcmVudCc9PT13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh1LmhlYWRlcikuYmFja2dyb3VuZENvbG9yP3dpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHUpLmJhY2tncm91bmRDb2xvcjp3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh1LmhlYWRlcikuYmFja2dyb3VuZENvbG9yLFguaWQ9dS5pZCsnLW1pbicsWC5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1oZWFkZXJiYXInKS5yZXBsYWNlQ2hpbGQodS5oZWFkZXJsb2dvLmNsb25lTm9kZSghMCksWC5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1oZWFkZXJsb2dvJykpLFgucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtdGl0bGViYXInKS5yZXBsYWNlQ2hpbGQodS5oZWFkZXJ0aXRsZS5jbG9uZU5vZGUoITApLFgucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtdGl0bGUnKSksWC5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC10aXRsZScpLnN0eWxlLmNvbG9yPVksVi5zdHlsZS5jb2xvcj1ZLHUuc2V0SWNvbmZvbnQoRixYKSwnZW5hYmxlZCc9PT11LmRhdGFzZXQuYnRubm9ybWFsaXplP2pzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24oXyl7WC5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1idG4tbm9ybWFsaXplJykuYWRkRXZlbnRMaXN0ZW5lcihfLCgpPT57dS5ub3JtYWxpemUoKX0pfSk6Vi5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1idG4tbm9ybWFsaXplJykuc3R5bGUuZGlzcGxheT0nbm9uZScsJ2VuYWJsZWQnPT09dS5kYXRhc2V0LmJ0bm1heGltaXplP2pzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24oXyl7WC5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1idG4tbWF4aW1pemUnKS5hZGRFdmVudExpc3RlbmVyKF8sKCk9Pnt1Lm1heGltaXplKCl9KX0pOlYucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtYnRuLW1heGltaXplJykuc3R5bGUuZGlzcGxheT0nbm9uZScsJ2VuYWJsZWQnPT09dS5kYXRhc2V0LmJ0bmNsb3NlP2pzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24oXyl7WC5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1idG4tY2xvc2UnKS5hZGRFdmVudExpc3RlbmVyKF8sKCk9Pnt1LmNsb3NlKCl9KX0pOlYucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtYnRuLWNsb3NlJykuc3R5bGUuZGlzcGxheT0nbm9uZScsWH0sdS5kcmFnaXQ9WD0+e2NvbnN0IFk9T2JqZWN0LmFzc2lnbih7fSxqc1BhbmVsLmRlZmF1bHRzLmRyYWdpdCxuLmRyYWdpdCksRj11LnF1ZXJ5U2VsZWN0b3JBbGwoWS5oYW5kbGVzKTtyZXR1cm4nZGlzYWJsZSc9PT1YP0YuZm9yRWFjaChWPT57Vi5zdHlsZS5wb2ludGVyRXZlbnRzPSdub25lJ30pOkYuZm9yRWFjaChWPT57Vi5zdHlsZS5wb2ludGVyRXZlbnRzPSdhdXRvJ30pLHV9LHUuZnJvbnQ9KFgsWT0hMCk9PntyZXR1cm4ganNQYW5lbC5mcm9udCh1KSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KEgpLFgmJlguY2FsbCh1LHUpLG4ub25mcm9udGVkJiZZJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3ModSxuLm9uZnJvbnRlZCwnZXZlcnknKSx1fSx1LmdldENoaWxkcGFuZWxzPSgpPT57cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHUuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanNQYW5lbCcpKX0sdS5nZXRUaGVtZURldGFpbHM9WD0+e2NvbnN0IFk9WC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyAvZywnJyksRj17Y29sb3I6ITEsY29sb3JzOiExLGZpbGxpbmc6ITEsYnM6ITEsYnN0aGVtZTohMX07aWYoJ2ZpbGxlZCc9PT1ZLnN1YnN0cigtNiw2KT8oRi5maWxsaW5nPSdmaWxsZWQnLEYuY29sb3I9WS5zdWJzdHIoMCxZLmxlbmd0aC02KSk6J2ZpbGxlZGxpZ2h0Jz09PVkuc3Vic3RyKC0xMSwxMSk/KEYuZmlsbGluZz0nZmlsbGVkbGlnaHQnLEYuY29sb3I9WS5zdWJzdHIoMCxZLmxlbmd0aC0xMSkpOihGLmZpbGxpbmc9JycsRi5jb2xvcj1ZKSxGLmNvbG9ycz1qc1BhbmVsLmNhbGNDb2xvcnMoRi5jb2xvciksRi5jb2xvci5tYXRjaCgnLScpKXtjb25zdCBWPUYuY29sb3Iuc3BsaXQoJy0nKTtGLmJzPVZbMF0sRi5ic3RoZW1lPVZbMV0sRi5tZGJTdHlsZT1WWzJdfHx2b2lkIDB9cmV0dXJuIEZ9LHUuaXNDaGlsZHBhbmVsPSgpPT57Y29uc3QgWD11LmNsb3Nlc3QoJy5qc1BhbmVsLWNvbnRlbnQnKTtyZXR1cm4hIVgmJlgucGFyZW50RWxlbWVudH0sdS5tYXhpbWl6ZT1YPT57aWYobi5vbmJlZm9yZW1heGltaXplJiYwPG4ub25iZWZvcmVtYXhpbWl6ZS5sZW5ndGgmJiFqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3ModSxuLm9uYmVmb3JlbWF4aW1pemUpKXJldHVybiB1O2RvY3VtZW50LmRpc3BhdGNoRXZlbnQoUyk7Y29uc3QgWT11LnBhcmVudEVsZW1lbnQsRj1uLm1heGltaXplZE1hcmdpbjtyZXR1cm4gWT09PWRvY3VtZW50LmJvZHk/KHUuc3R5bGUud2lkdGg9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLUZbMV0tRlszXSsncHgnLHUuc3R5bGUuaGVpZ2h0PWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQtRlswXS1GWzJdKydweCcsdS5zdHlsZS5sZWZ0PUZbM10rJ3B4Jyx1LnN0eWxlLnRvcD1GWzBdKydweCcsIW4ucG9zaXRpb24uZml4ZWQmJih1LnN0eWxlLmxlZnQ9d2luZG93LnBhZ2VYT2Zmc2V0K0ZbM10rJ3B4Jyx1LnN0eWxlLnRvcD13aW5kb3cucGFnZVlPZmZzZXQrRlswXSsncHgnKSk6KHUuc3R5bGUud2lkdGg9WS5jbGllbnRXaWR0aC1GWzFdLUZbM10rJ3B4Jyx1LnN0eWxlLmhlaWdodD1ZLmNsaWVudEhlaWdodC1GWzBdLUZbMl0rJ3B4Jyx1LnN0eWxlLmxlZnQ9RlszXSsncHgnLHUuc3R5bGUudG9wPUZbMF0rJ3B4JyksdS5yZW1vdmVNaW5pbWl6ZWRSZXBsYWNlbWVudCgpLHUuc3RhdHVzPSdtYXhpbWl6ZWQnLHUuc2V0Q29udHJvbHMoWycuanNQYW5lbC1idG4tbWF4aW1pemUnLCcuanNQYW5lbC1idG4tc21hbGxpZnlyZXYnXSksanNQYW5lbC5mcm9udCh1KSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGopLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoRSksbi5vbnN0YXR1c2NoYW5nZSYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHUsbi5vbnN0YXR1c2NoYW5nZSwnZXZlcnknKSxYJiZYLmNhbGwodSx1KSxuLm9ubWF4aW1pemVkJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3ModSxuLm9ubWF4aW1pemVkLCdldmVyeScpLHV9LHUubWluaW1pemU9WD0+e2lmKCdtaW5pbWl6ZWQnPT09dS5zdGF0dXMpcmV0dXJuIHU7aWYobi5vbmJlZm9yZW1pbmltaXplJiYwPG4ub25iZWZvcmVtaW5pbWl6ZS5sZW5ndGgmJiFqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3ModSxuLm9uYmVmb3JlbWluaW1pemUpKXJldHVybiB1O2lmKGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoUCksIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lcicpKXtjb25zdCBZPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1kuaWQ9J2pzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyJyxkb2N1bWVudC5ib2R5LmFwcGVuZChZKX1pZih1LnN0eWxlLmxlZnQ9Jy05OTk5cHgnLHUuc3RhdHVzQmVmb3JlPXUuc3RhdHVzLHUuc3RhdHVzPSdtaW5pbWl6ZWQnLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoVCksZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChFKSxuLm9uc3RhdHVzY2hhbmdlJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3ModSxuLm9uc3RhdHVzY2hhbmdlLCdldmVyeScpLG4ubWluaW1pemVUbyl7Y29uc3QgWT11LmNyZWF0ZU1pbmltaXplZFJlcGxhY2VtZW50KCk7bGV0IEYsVixfOydkZWZhdWx0Jz09PW4ubWluaW1pemVUbz9kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXInKS5hcHBlbmQoWSk6J3BhcmVudHBhbmVsJz09PW4ubWluaW1pemVUbz8oVj11LmNsb3Nlc3QoJy5qc1BhbmVsLWNvbnRlbnQnKS5wYXJlbnRFbGVtZW50LF89Vi5xdWVyeVNlbGVjdG9yQWxsKCcuanNQYW5lbC1taW5pbWl6ZWQtYm94JyksRj1fW18ubGVuZ3RoLTFdLEYuYXBwZW5kKFkpKToncGFyZW50Jz09PW4ubWluaW1pemVUbz8oVj11LnBhcmVudEVsZW1lbnQsRj1WLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLW1pbmltaXplZC1jb250YWluZXInKSwhRiYmKEY9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksRi5jbGFzc05hbWU9J2pzUGFuZWwtbWluaW1pemVkLWNvbnRhaW5lcicsVi5hcHBlbmQoRikpLEYuYXBwZW5kKFkpKTpkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG4ubWluaW1pemVUbykuYXBwZW5kKFkpfXJldHVybiBYJiZYLmNhbGwodSx1KSxuLm9ubWluaW1pemVkJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3ModSxuLm9ubWluaW1pemVkLCdldmVyeScpLHV9LHUubm9ybWFsaXplPVg9PntyZXR1cm4nbm9ybWFsaXplZCc9PT11LnN0YXR1cz91Om4ub25iZWZvcmVub3JtYWxpemUmJjA8bi5vbmJlZm9yZW5vcm1hbGl6ZS5sZW5ndGgmJiFqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3ModSxuLm9uYmVmb3Jlbm9ybWFsaXplKT91Oihkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHopLHUuc3R5bGUud2lkdGg9dS5jdXJyZW50RGF0YS53aWR0aCx1LnN0eWxlLmhlaWdodD11LmN1cnJlbnREYXRhLmhlaWdodCx1LnN0eWxlLmxlZnQ9dS5jdXJyZW50RGF0YS5sZWZ0LHUuc3R5bGUudG9wPXUuY3VycmVudERhdGEudG9wLHUucmVtb3ZlTWluaW1pemVkUmVwbGFjZW1lbnQoKSx1LnN0YXR1cz0nbm9ybWFsaXplZCcsdS5zZXRDb250cm9scyhbJy5qc1BhbmVsLWJ0bi1ub3JtYWxpemUnLCcuanNQYW5lbC1idG4tc21hbGxpZnlyZXYnXSksanNQYW5lbC5mcm9udCh1KSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KEMpLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoRSksbi5vbnN0YXR1c2NoYW5nZSYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHUsbi5vbnN0YXR1c2NoYW5nZSwnZXZlcnknKSxYJiZYLmNhbGwodSx1KSxuLm9ubm9ybWFsaXplZCYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHUsbi5vbm5vcm1hbGl6ZWQsJ2V2ZXJ5JyksdSl9LHUucmVtb3ZlTWluaW1pemVkUmVwbGFjZW1lbnQ9KCk9Pntjb25zdCBYPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHUuaWQrJy1taW4nKTtyZXR1cm4gWCYmWC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKFgpLHV9LHUucmVwb3NpdGlvbj0oLi4uWCk9PntsZXQgVixZPW4ucG9zaXRpb24sRj0hMDtyZXR1cm4gWC5mb3JFYWNoKGZ1bmN0aW9uKF8peydzdHJpbmcnPT10eXBlb2YgX3x8J29iamVjdCc9PXR5cGVvZiBfP1k9XzonYm9vbGVhbic9PXR5cGVvZiBfP0Y9XzonZnVuY3Rpb24nPT10eXBlb2YgXyYmKFY9Xyl9KSxqc1BhbmVsLnBvc2l0aW9uKHUsWSksRiYmdS5zYXZlQ3VycmVudFBvc2l0aW9uKCksViYmVi5jYWxsKHUsdSksdX0sdS5yZXBvc2l0aW9uT25TbmFwPVg9PntsZXQgWT0nMCcsRj0nMCc7Y29uc3QgVj1qc1BhbmVsLnBPY29udGFpbm1lbnQobi5kcmFnaXQuY29udGFpbm1lbnQpO24uZHJhZ2l0LnNuYXAuY29udGFpbm1lbnQmJignbGVmdC10b3AnPT09WD8oWT1WWzNdLEY9VlswXSk6J3JpZ2h0LXRvcCc9PT1YPyhZPS1WWzFdLEY9VlswXSk6J3JpZ2h0LWJvdHRvbSc9PT1YPyhZPS1WWzFdLEY9LVZbMl0pOidsZWZ0LWJvdHRvbSc9PT1YPyhZPVZbM10sRj0tVlsyXSk6J2NlbnRlci10b3AnPT09WD8oWT1WWzNdLzItVlsxXS8yLEY9VlswXSk6J2NlbnRlci1ib3R0b20nPT09WD8oWT1WWzNdLzItVlsxXS8yLEY9LVZbMl0pOidsZWZ0LWNlbnRlcic9PT1YPyhZPVZbM10sRj1WWzBdLzItVlsyXS8yKToncmlnaHQtY2VudGVyJz09WCYmKFk9LVZbMV0sRj1WWzBdLzItVlsyXS8yKSksanNQYW5lbC5wb3NpdGlvbih1LFgpLGpzUGFuZWwuc2V0U3R5bGUodSx7bGVmdDpgY2FsYygke3Uuc3R5bGUubGVmdH0gKyAke1l9cHgpYCx0b3A6YGNhbGMoJHt1LnN0eWxlLnRvcH0gKyAke0Z9cHgpYH0pfSx1LnJlc2l6ZT0oLi4uWCk9Pntjb25zdCBZPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHUpO2xldCBfLEY9e3dpZHRoOlkud2lkdGgsaGVpZ2h0OlkuaGVpZ2h0fSxWPSEwO1guZm9yRWFjaChmdW5jdGlvbihHKXsnc3RyaW5nJz09dHlwZW9mIEc/Rj1HOidvYmplY3QnPT10eXBlb2YgRz9GPU9iamVjdC5hc3NpZ24oRixHKTonYm9vbGVhbic9PXR5cGVvZiBHP1Y9RzonZnVuY3Rpb24nPT10eXBlb2YgRyYmKF89Ryl9KTtjb25zdCBLPWpzUGFuZWwucE9zaXplKHUsRik7cmV0dXJuIHUuc3R5bGUud2lkdGg9Sy53aWR0aCx1LnN0eWxlLmhlaWdodD1LLmhlaWdodCxWJiZ1LnNhdmVDdXJyZW50RGltZW5zaW9ucygpLF8mJl8uY2FsbCh1LHUpLHV9LHUucmVzaXplaXQ9WD0+e2NvbnN0IFk9dS5xdWVyeVNlbGVjdG9yQWxsKCcuanNQYW5lbC1yZXNpemVpdC1oYW5kbGUnKTtyZXR1cm4nZGlzYWJsZSc9PT1YP1kuZm9yRWFjaChGPT57Ri5zdHlsZS5wb2ludGVyRXZlbnRzPSdub25lJ30pOlkuZm9yRWFjaChGPT57Ri5zdHlsZS5wb2ludGVyRXZlbnRzPSdhdXRvJ30pLHV9LHUuc2F2ZUN1cnJlbnREaW1lbnNpb25zPSgpPT57Y29uc3QgWD13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh1KTt1LmN1cnJlbnREYXRhLndpZHRoPVgud2lkdGgsJ25vcm1hbGl6ZWQnPT09dS5zdGF0dXMmJih1LmN1cnJlbnREYXRhLmhlaWdodD1YLmhlaWdodCl9LHUuc2F2ZUN1cnJlbnRQb3NpdGlvbj0oKT0+e2NvbnN0IFg9d2luZG93LmdldENvbXB1dGVkU3R5bGUodSk7dS5jdXJyZW50RGF0YS5sZWZ0PVgubGVmdCx1LmN1cnJlbnREYXRhLnRvcD1YLnRvcH0sdS5zZXRDb250cm9scz0oWCxZKT0+e3JldHVybiB1LmhlYWRlci5xdWVyeVNlbGVjdG9yQWxsKCcuanNQYW5lbC1idG4nKS5mb3JFYWNoKEY9PntGLnN0eWxlLmRpc3BsYXk9J2Jsb2NrJ30pLFguZm9yRWFjaChGPT57Y29uc3QgVj11LmNvbnRyb2xiYXIucXVlcnlTZWxlY3RvcihGKTtWJiYoVi5zdHlsZS5kaXNwbGF5PSdub25lJyl9KSxZJiZZLmNhbGwodSx1KSx1fSx1LnNldENvbnRyb2xTdGF0dXM9KFgsWT0nZW5hYmxlJyxGKT0+e2lmKCdkaXNhYmxlJz09PVkpe2lmKCdyZW1vdmVkJyE9PXUuZ2V0QXR0cmlidXRlKGBkYXRhLWJ0biR7WH1gKSl7dS5zZXRBdHRyaWJ1dGUoYGRhdGEtYnRuJHtYfWAsJ2Rpc2FibGVkJyk7Y29uc3QgVj11LmNvbnRyb2xiYXIucXVlcnlTZWxlY3RvcihgLmpzUGFuZWwtYnRuLSR7WH1gKTtWLnN0eWxlLnBvaW50ZXJFdmVudHM9J25vbmUnLFYuc3R5bGUub3BhY2l0eT0wLjQsVi5zdHlsZS5jdXJzb3I9J2RlZmF1bHQnfX1lbHNlIGlmKCdlbmFibGUnPT09WSl7aWYoJ3JlbW92ZWQnIT09dS5nZXRBdHRyaWJ1dGUoYGRhdGEtYnRuJHtYfWApKXt1LnNldEF0dHJpYnV0ZShgZGF0YS1idG4ke1h9YCwnZW5hYmxlZCcpO2NvbnN0IFY9dS5jb250cm9sYmFyLnF1ZXJ5U2VsZWN0b3IoYC5qc1BhbmVsLWJ0bi0ke1h9YCk7Vi5zdHlsZS5wb2ludGVyRXZlbnRzPSdhdXRvJyxWLnN0eWxlLm9wYWNpdHk9MSxWLnN0eWxlLmN1cnNvcj0ncG9pbnRlcid9fWVsc2UgaWYoJ3JlbW92ZSc9PT1ZKXtjb25zdCBWPXUuY29udHJvbGJhci5xdWVyeVNlbGVjdG9yKGAuanNQYW5lbC1idG4tJHtYfWApO3UuY29udHJvbGJhci5yZW1vdmVDaGlsZChWKSx1LnNldEF0dHJpYnV0ZShgZGF0YS1idG4ke1h9YCwncmVtb3ZlZCcpfXJldHVybiBGJiZGLmNhbGwodSx1KSx1fSx1LnNldEhlYWRlckNvbnRyb2xzPVg9Pntjb25zdCBZPVsnY2xvc2UnLCdtYXhpbWl6ZScsJ25vcm1hbGl6ZScsJ21pbmltaXplJywnc21hbGxpZnknLCdzbWFsbGlmeXJldiddLEY9bi5oZWFkZXJDb250cm9scztyZXR1cm4nc3RyaW5nJz09dHlwZW9mIEY/J25vbmUnPT09Rj9ZLmZvckVhY2goVj0+e3Uuc2V0Q29udHJvbFN0YXR1cyhWLCdyZW1vdmUnKX0pOidjbG9zZW9ubHknPT09RiYmWS5mb3JFYWNoKFY9PnsnY2xvc2UnIT09ViYmdS5zZXRDb250cm9sU3RhdHVzKFYsJ3JlbW92ZScpfSk6WS5mb3JFYWNoKFY9PntGW1ZdJiZ1LnNldENvbnRyb2xTdGF0dXMoVixGW1ZdKX0pLFgmJlguY2FsbCh1LHUpLHV9LHUuc2V0SGVhZGVyTG9nbz0oWCxZKT0+e2lmKCdzdHJpbmcnIT10eXBlb2YgWClqc1BhbmVsLmVtcHR5Tm9kZSh1LmhlYWRlcmxvZ28pLHUuaGVhZGVybG9nby5hcHBlbmQoWCk7ZWxzZSBpZignPCchPT1YLnN1YnN0cigwLDEpKXtjb25zdCBGPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO0Yuc3JjPVgsanNQYW5lbC5lbXB0eU5vZGUodS5oZWFkZXJsb2dvKSx1LmhlYWRlcmxvZ28uYXBwZW5kKEYpfWVsc2UgdS5oZWFkZXJsb2dvLmlubmVySFRNTD1YO3JldHVybiB1LmhlYWRlcmxvZ28ucXVlcnlTZWxlY3RvckFsbCgnaW1nJykuZm9yRWFjaChmdW5jdGlvbihGKXtGLnN0eWxlLm1heEhlaWdodD1nZXRDb21wdXRlZFN0eWxlKHUuaGVhZGVyYmFyKS5oZWlnaHR9KSxZJiZZLmNhbGwodSx1KSx1fSx1LnNldEhlYWRlclJlbW92ZT1YPT57cmV0dXJuIHUucmVtb3ZlQ2hpbGQodS5oZWFkZXIpLHUuY29udGVudC5jbGFzc0xpc3QuYWRkKCdqc1BhbmVsLWNvbnRlbnQtbm9oZWFkZXInKSxbJ2Nsb3NlJywnbWF4aW1pemUnLCdub3JtYWxpemUnLCdtaW5pbWl6ZScsJ3NtYWxsaWZ5Jywnc21hbGxpZnlyZXYnXS5mb3JFYWNoKFk9Pnt1LnNldEF0dHJpYnV0ZShgZGF0YS1idG4ke1l9YCwncmVtb3ZlZCcpfSksWCYmWC5jYWxsKHUsdSksdX0sdS5zZXRIZWFkZXJUaXRsZT0oWCxZKT0+e3JldHVybidzdHJpbmcnPT10eXBlb2YgWD91LmhlYWRlcnRpdGxlLmlubmVySFRNTD1YOidmdW5jdGlvbic9PXR5cGVvZiBYPyhqc1BhbmVsLmVtcHR5Tm9kZSh1LmhlYWRlcnRpdGxlKSx1LmhlYWRlcnRpdGxlLmlubmVySFRNTD1YKCkpOihqc1BhbmVsLmVtcHR5Tm9kZSh1LmhlYWRlcnRpdGxlKSx1LmhlYWRlcnRpdGxlLmFwcGVuZChYKSksWSYmWS5jYWxsKHUsdSksdX0sdS5zZXRJY29uZm9udD0oWD0hMSxZPXUsRik9PntpZighMSE9PVgpe2xldCBWLF87aWYoJ2Jvb3RzdHJhcCc9PT1YfHwnZ2x5cGhpY29uJz09PVgpVj1bJ2dseXBoaWNvbiBnbHlwaGljb24tcmVtb3ZlJywnZ2x5cGhpY29uIGdseXBoaWNvbi1mdWxsc2NyZWVuJywnZ2x5cGhpY29uIGdseXBoaWNvbi1yZXNpemUtZnVsbCcsJ2dseXBoaWNvbiBnbHlwaGljb24tbWludXMnLCdnbHlwaGljb24gZ2x5cGhpY29uLWNoZXZyb24tZG93bicsJ2dseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi11cCddO2Vsc2UgaWYoJ2ZhJz09PVh8fCdmYXInPT09WHx8J2ZhbCc9PT1YfHwnZmFzJz09PVgpVj1bYCR7WH0gZmEtd2luZG93LWNsb3NlYCxgJHtYfSBmYS13aW5kb3ctbWF4aW1pemVgLGAke1h9IGZhLXdpbmRvdy1yZXN0b3JlYCxgJHtYfSBmYS13aW5kb3ctbWluaW1pemVgLGAke1h9IGZhLWNoZXZyb24tZG93bmAsYCR7WH0gZmEtY2hldnJvbi11cGBdLHUuY29udHJvbGJhci5zdHlsZS5wYWRkaW5nPSc2cHggMCAzcHggMCc7ZWxzZSBpZignbWF0ZXJpYWwtaWNvbnMnPT09WClWPVtYLFgsWCxYLFgsWF0sXz1bJ2Nsb3NlJywnZnVsbHNjcmVlbicsJ2Z1bGxzY3JlZW5fZXhpdCcsJ2NhbGxfcmVjZWl2ZWQnLCdleHBhbmRfbW9yZScsJ2V4cGFuZF9sZXNzJ10sdS5jb250cm9sYmFyLnN0eWxlLnBhZGRpbmc9JzRweCAwIDVweCAwJztlbHNlIGlmKEFycmF5LmlzQXJyYXkoWCkpVj1bYGN1c3RvbS1jb250cm9sLWljb24gJHtYWzVdfWAsYGN1c3RvbS1jb250cm9sLWljb24gJHtYWzRdfWAsYGN1c3RvbS1jb250cm9sLWljb24gJHtYWzNdfWAsYGN1c3RvbS1jb250cm9sLWljb24gJHtYWzJdfWAsYGN1c3RvbS1jb250cm9sLWljb24gJHtYWzFdfWAsYGN1c3RvbS1jb250cm9sLWljb24gJHtYWzBdfWBdO2Vsc2UgcmV0dXJuIFk7WS5xdWVyeVNlbGVjdG9yQWxsKCcuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0bicpLmZvckVhY2goSz0+e2pzUGFuZWwuZW1wdHlOb2RlKEspLmlubmVySFRNTD0nPHNwYW4+PC9zcGFuPid9KSxBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChZLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuID4gc3BhbicpKS5yZXZlcnNlKCkuZm9yRWFjaCgoSyxHKT0+e0suY2xhc3NOYW1lPVZbR10sJ21hdGVyaWFsLWljb25zJz09PVgmJihLLnRleHRDb250ZW50PV9bR10pfSl9cmV0dXJuIEYmJkYuY2FsbChZLFkpLFl9LHUuc2V0UnRsPSgpPT57W3UuaGVhZGVyLHUuaGVhZGVyYmFyLHUudGl0bGViYXIsdS5jb250cm9sYmFyLHUuaGVhZGVydG9vbGJhcix1LmZvb3Rlcl0uZm9yRWFjaChYPT57WC5jbGFzc0xpc3QuYWRkKCdqc1BhbmVsLXJ0bCcpfSksW3UuaGVhZGVydGl0bGUsdS5oZWFkZXJ0b29sYmFyLHUuY29udGVudCx1LmZvb3Rlcl0uZm9yRWFjaChYPT57WC5kaXI9J3J0bCcsbi5ydGwubGFuZyYmKFgubGFuZz1uLnJ0bC5sYW5nKX0pfSx1LnNldFNpemU9KCk9PntpZihuLnBhbmVsU2l6ZSl7Y29uc3QgWD1qc1BhbmVsLnBPc2l6ZSh1LG4ucGFuZWxTaXplKTt1LnN0eWxlLndpZHRoPVgud2lkdGgsdS5zdHlsZS5oZWlnaHQ9WC5oZWlnaHR9ZWxzZSBpZihuLmNvbnRlbnRTaXplKXtjb25zdCBYPWpzUGFuZWwucE9zaXplKHUsbi5jb250ZW50U2l6ZSk7dS5jb250ZW50LnN0eWxlLndpZHRoPVgud2lkdGgsdS5jb250ZW50LnN0eWxlLmhlaWdodD1YLmhlaWdodCx1LnN0eWxlLndpZHRoPVgud2lkdGgsdS5jb250ZW50LnN0eWxlLndpZHRoPScxMDAlJ31yZXR1cm4gdX0sdS5zZXRUaGVtZT0oWD1uLnRoZW1lLFkpPT57aWYodS5jbGVhclRoZW1lKCksJ25vbmUnPT09WClyZXR1cm4gdS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I9JyNmZmYnLHU7Y29uc3QgRj11LmdldFRoZW1lRGV0YWlscyhYKTtyZXR1cm4gRi5icz91LmFwcGx5Qm9vdHN0cmFwVGhlbWUoRik6LTE9PT1qc1BhbmVsLnRoZW1lcy5pbmRleE9mKEYuY29sb3IpP3UuYXBwbHlBcmJpdHJhcnlUaGVtZShGKTp1LmFwcGx5QnVpbHRJblRoZW1lKEYpLG4uYm9yZGVyP3UuYXBwbHlUaGVtZUJvcmRlcihGKToodS5zdHlsZS5ib3JkZXJXaWR0aD0nJyx1LnN0eWxlLmJvcmRlclN0eWxlPScnLHUuc3R5bGUuYm9yZGVyQ29sb3I9JycpLFkmJlkuY2FsbCh1LHUpLHV9LHUuc21hbGxpZnk9WD0+e2lmKCdzbWFsbGlmaWVkJz09PXUuc3RhdHVzfHwnc21hbGxpZmllZG1heCc9PT11LnN0YXR1cylyZXR1cm4gdTtpZihuLm9uYmVmb3Jlc21hbGxpZnkmJjA8bi5vbmJlZm9yZXNtYWxsaWZ5Lmxlbmd0aCYmIWpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyh1LG4ub25iZWZvcmVzbWFsbGlmeSkpcmV0dXJuIHU7ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChMKSwnbm9ybWFsaXplZCc9PT11LnN0YXR1cyYmdS5zYXZlQ3VycmVudERpbWVuc2lvbnMoKSx1LnN0eWxlLm92ZXJmbG93PSdoaWRkZW4nLHUuc3R5bGUuaGVpZ2h0PXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHUuaGVhZGVyYmFyKS5oZWlnaHQsJ25vcm1hbGl6ZWQnPT09dS5zdGF0dXM/KHUuc2V0Q29udHJvbHMoWycuanNQYW5lbC1idG4tbm9ybWFsaXplJywnLmpzUGFuZWwtYnRuLXNtYWxsaWZ5J10pLHUuc3RhdHVzPSdzbWFsbGlmaWVkJyxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGspLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoRSksbi5vbnN0YXR1c2NoYW5nZSYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHUsbi5vbnN0YXR1c2NoYW5nZSwnZXZlcnknKSk6J21heGltaXplZCc9PT11LnN0YXR1cyYmKHUuc2V0Q29udHJvbHMoWycuanNQYW5lbC1idG4tbWF4aW1pemUnLCcuanNQYW5lbC1idG4tc21hbGxpZnknXSksdS5zdGF0dXM9J3NtYWxsaWZpZWRtYXgnLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoQSksZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChFKSxuLm9uc3RhdHVzY2hhbmdlJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3ModSxuLm9uc3RhdHVzY2hhbmdlLCdldmVyeScpKTtsZXQgWT11LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qc1BhbmVsLW1pbmltaXplZC1ib3gnKTtyZXR1cm4gWVtZLmxlbmd0aC0xXS5zdHlsZS5kaXNwbGF5PSdub25lJyxYJiZYLmNhbGwodSx1KSxuLm9uc21hbGxpZmllZCYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHUsbi5vbnNtYWxsaWZpZWQsJ2V2ZXJ5JyksdX0sdS51bnNtYWxsaWZ5PVg9PntpZignc21hbGxpZmllZCc9PT11LnN0YXR1c3x8J3NtYWxsaWZpZWRtYXgnPT09dS5zdGF0dXMpe2lmKG4ub25iZWZvcmV1bnNtYWxsaWZ5JiYwPG4ub25iZWZvcmV1bnNtYWxsaWZ5Lmxlbmd0aCYmIWpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyh1LG4ub25iZWZvcmV1bnNtYWxsaWZ5KSlyZXR1cm4gdTtkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFcpLHUuc3R5bGUub3ZlcmZsb3c9J3Zpc2libGUnLGpzUGFuZWwuZnJvbnQodSksJ3NtYWxsaWZpZWQnPT09dS5zdGF0dXM/KHUuc3R5bGUuaGVpZ2h0PXUuY3VycmVudERhdGEuaGVpZ2h0LHUuc2V0Q29udHJvbHMoWycuanNQYW5lbC1idG4tbm9ybWFsaXplJywnLmpzUGFuZWwtYnRuLXNtYWxsaWZ5cmV2J10pLHUuc3RhdHVzPSdub3JtYWxpemVkJyxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KEMpLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoRSksbi5vbnN0YXR1c2NoYW5nZSYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHUsbi5vbnN0YXR1c2NoYW5nZSwnZXZlcnknKSk6J3NtYWxsaWZpZWRtYXgnPT09dS5zdGF0dXM/dS5tYXhpbWl6ZSgpOidtaW5pbWl6ZWQnPT09dS5zdGF0dXMmJnUubm9ybWFsaXplKCk7bGV0IFk9dS5xdWVyeVNlbGVjdG9yQWxsKCcuanNQYW5lbC1taW5pbWl6ZWQtYm94Jyk7WVtZLmxlbmd0aC0xXS5zdHlsZS5kaXNwbGF5PSdmbGV4JyxYJiZYLmNhbGwodSx1KSxuLm9udW5zbWFsbGlmaWVkJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3ModSxuLm9udW5zbWFsbGlmaWVkLCdldmVyeScpfXJldHVybiB1fSx1LmlkPW4uaWQsdS5jbGFzc0xpc3QuYWRkKCdqc1BhbmVsLScrbi5wYW5lbHR5cGUpLCdzdGFuZGFyZCc9PT1uLnBhbmVsdHlwZSYmKHUuc3R5bGUuekluZGV4PXRoaXMuemkubmV4dCgpKSxtLmFwcGVuZCh1KSx1LmZyb250KCExLCExKSx1LnNldFRoZW1lKG4udGhlbWUpLG4uYm94U2hhZG93JiZ1LmNsYXNzTGlzdC5hZGQoYGpzUGFuZWwtZGVwdGgtJHtuLmJveFNoYWRvd31gKSwhbi5oZWFkZXIpdS5zZXRIZWFkZXJSZW1vdmUoKTtlbHNlIGlmKG4uaGVhZGVyTG9nbyYmdS5zZXRIZWFkZXJMb2dvKG4uaGVhZGVyTG9nbyksdS5zZXRJY29uZm9udChuLmljb25mb250KSx1LnNldEhlYWRlclRpdGxlKG4uaGVhZGVyVGl0bGUpLHUuc2V0SGVhZGVyQ29udHJvbHMoKSwnYXV0by1zaG93LWhpZGUnPT09bi5oZWFkZXIpe2xldCBWLFg9bi50aGVtZS5zcGxpdCgnLScpLFk9J2pzUGFuZWwtZGVwdGgtJytuLmJveFNoYWRvdyxGPSdiZy0nO1hbMV0mJihGKz1YWzFdKSxYWzJdJiYoVj1YWzFdKyctY29sb3ItJytYWzJdKSx1LmhlYWRlci5zdHlsZS5vcGFjaXR5PTAsKCdib290c3RyYXAnPT09WFswXXx8J21kYic9PT1YWzBdKSYmKHRoaXMucmVtQ2xhc3ModSxGKSwnbWRiJz09PVhbMF0mJnRoaXMucmVtQ2xhc3ModSxWKSksdS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I9J3RyYW5zcGFyZW50Jyx0aGlzLnJlbUNsYXNzKHUsWSksdGhpcy5zZXRDbGFzcyh1LmNvbnRlbnQsWSksdS5oZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsZnVuY3Rpb24oKXt1LmhlYWRlci5zdHlsZS5vcGFjaXR5PTEsKCdib290c3RyYXAnPT09WFswXXx8J21kYic9PT1YWzBdKSYmKGpzUGFuZWwuc2V0Q2xhc3ModSxGKSwnbWRiJz09PVhbMF0mJmpzUGFuZWwuc2V0Q2xhc3ModSxWKSksanNQYW5lbC5zZXRDbGFzcyh1LFkpLGpzUGFuZWwucmVtQ2xhc3ModS5jb250ZW50LFkpfSksdS5oZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsZnVuY3Rpb24oKXt1LmhlYWRlci5zdHlsZS5vcGFjaXR5PTAsKCdib290c3RyYXAnPT09WFswXXx8J21kYic9PT1YWzBdKSYmKGpzUGFuZWwucmVtQ2xhc3ModSxGKSwnbWRiJz09PVhbMF0mJmpzUGFuZWwucmVtQ2xhc3ModSxWKSksanNQYW5lbC5yZW1DbGFzcyh1LFkpLGpzUGFuZWwuc2V0Q2xhc3ModS5jb250ZW50LFkpfSl9aWYobi5oZWFkZXJUb29sYmFyJiZ1LmFkZFRvb2xiYXIodS5oZWFkZXJ0b29sYmFyLG4uaGVhZGVyVG9vbGJhciksbi5mb290ZXJUb29sYmFyJiZ1LmFkZFRvb2xiYXIodS5mb290ZXIsbi5mb290ZXJUb29sYmFyKSxuLmNvbnRlbnQmJignZnVuY3Rpb24nPT10eXBlb2Ygbi5jb250ZW50P24uY29udGVudC5jYWxsKHUsdSk6J3N0cmluZyc9PXR5cGVvZiBuLmNvbnRlbnQ/dS5jb250ZW50LmlubmVySFRNTD1uLmNvbnRlbnQ6dS5jb250ZW50LmFwcGVuZChuLmNvbnRlbnQpKSxuLmNvbnRlbnRBamF4JiZ0aGlzLmFqYXgodSxuLmNvbnRlbnRBamF4KSxuLmNvbnRlbnRGZXRjaCYmdGhpcy5mZXRjaCh1KSxuLmNvbnRlbnRPdmVyZmxvdyl7bGV0IFg9bi5jb250ZW50T3ZlcmZsb3cuc3BsaXQoJyAnKTsxPT09WC5sZW5ndGg/dS5jb250ZW50LnN0eWxlLm92ZXJmbG93PVhbMF06Mj09PVgubGVuZ3RoJiYodS5jb250ZW50LnN0eWxlLm92ZXJmbG93WD1YWzBdLHUuY29udGVudC5zdHlsZS5vdmVyZmxvd1k9WFsxXSl9aWYobi5ydGwmJnUuc2V0UnRsKCksdS5zZXRTaXplKCksdS5zdGF0dXM9J25vcm1hbGl6ZWQnLG4ucG9zaXRpb258fCdjdXJzb3InIT09bi5wb3NpdGlvbj90aGlzLnBvc2l0aW9uKHUsbi5wb3NpdGlvbik6dS5zdHlsZS5vcGFjaXR5PTEsZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChDKSx1LmNhbGNTaXplRmFjdG9ycygpLG4uYW5pbWF0ZUluJiYodS5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCgpPT57dGhpcy5yZW1DbGFzcyh1LG4uYW5pbWF0ZUluKX0pLHRoaXMuc2V0Q2xhc3ModSxuLmFuaW1hdGVJbikpLG4uc3luY01hcmdpbnMpe2NvbnN0IFg9dGhpcy5wT2NvbnRhaW5tZW50KG4ubWF4aW1pemVkTWFyZ2luKTtuLmRyYWdpdCYmKG4uZHJhZ2l0LmNvbnRhaW5tZW50PVgsbi5kcmFnaXQuc25hcCYmKG4uZHJhZ2l0LnNuYXAuY29udGFpbm1lbnQ9ITApKSxuLnJlc2l6ZWl0JiYobi5yZXNpemVpdC5jb250YWlubWVudD1YKX1pZihuLmRyYWdpdD8odGhpcy5kcmFnaXQodSxuLmRyYWdpdCksZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignanNwYW5lbGRyYWdzdG9wJyxYPT57WC5kZXRhaWw9PT11LmlkJiZ1LmNhbGNTaXplRmFjdG9ycygpfSwhMSkpOnUudGl0bGViYXIuc3R5bGUuY3Vyc29yPSdkZWZhdWx0JyxuLnJlc2l6ZWl0KXt0aGlzLnJlc2l6ZWl0KHUsbi5yZXNpemVpdCk7bGV0IFg7ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignanNwYW5lbHJlc2l6ZXN0YXJ0JyxZPT57WS5kZXRhaWw9PT11LmlkJiYoWD11LnN0YXR1cyl9LCExKSxkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdqc3BhbmVscmVzaXplc3RvcCcsWT0+e1kuZGV0YWlsPT09dS5pZCYmKCdzbWFsbGlmaWVkJz09PVh8fCdzbWFsbGlmaWVkbWF4Jz09PVh8fCdtYXhpbWl6ZWQnPT09WCkmJnBhcnNlRmxvYXQodS5zdHlsZS5oZWlnaHQpPnBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUodS5oZWFkZXIpLmhlaWdodCkmJih1LnNldENvbnRyb2xzKFsnLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZScsJy5qc1BhbmVsLWJ0bi1zbWFsbGlmeXJldiddKSx1LnN0YXR1cz0nbm9ybWFsaXplZCcsZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChDKSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KEUpLG4ub25zdGF0dXNjaGFuZ2UmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyh1LG4ub25zdGF0dXNjaGFuZ2UsJ2V2ZXJ5JyksdS5jYWxjU2l6ZUZhY3RvcnMoKSl9LCExKX1pZih1LnNhdmVDdXJyZW50RGltZW5zaW9ucygpLHUuc2F2ZUN1cnJlbnRQb3NpdGlvbigpLG4uc2V0U3RhdHVzKXtjb25zdCBYPW4uc2V0U3RhdHVzO2lmKCdzbWFsbGlmaWVkbWF4Jz09PVgpdS5tYXhpbWl6ZSgpLnNtYWxsaWZ5KCk7ZWxzZSBpZignc21hbGxpZmllZCc9PT1YKXUuc21hbGxpZnkoKTtlbHNle2NvbnN0IFk9WC5zdWJzdHIoMCxYLmxlbmd0aC0xKTt1W1ldKCl9fXJldHVybiBuLmF1dG9jbG9zZSYmKGM9d2luZG93LnNldFRpbWVvdXQoKCk9Pnt1JiZ1LmNsb3NlKCl9LG4uYXV0b2Nsb3NlKSksdGhpcy5wb2ludGVyZG93bi5mb3JFYWNoKFg9Pnt1LmFkZEV2ZW50TGlzdGVuZXIoWCxZPT57WS50YXJnZXQuY2xvc2VzdCgnLmpzUGFuZWwtYnRuLWNsb3NlJyl8fFkudGFyZ2V0LmNsb3Nlc3QoJy5qc1BhbmVsLWJ0bi1taW5pbWl6ZScpfHwnc3RhbmRhcmQnIT09bi5wYW5lbHR5cGV8fHUuZnJvbnQoKX0sITEpfSksbi5vbndpbmRvd3Jlc2l6ZSYmd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsWD0+e2lmKFgudGFyZ2V0PT09d2luZG93KXtjb25zdCBZPW4ub253aW5kb3dyZXNpemUsRj11LnN0YXR1cyxWPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHUucGFyZW50RWxlbWVudCk7J21heGltaXplZCc9PT1GJiYhMD09PVk/dS5tYXhpbWl6ZSgpOignbm9ybWFsaXplZCc9PT1GfHwnc21hbGxpZmllZCc9PT1GfHwnbWF4aW1pemVkJz09PUYpJiYoJ2Z1bmN0aW9uJz09dHlwZW9mIFk/WS5jYWxsKHUsWCx1KToodS5zdHlsZS5sZWZ0PSgoKT0+e2xldCBfO3JldHVybiBfPW4uY29udGFpbmVyPT09ZG9jdW1lbnQuYm9keT8oZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aC1wYXJzZUZsb2F0KHUuc3R5bGUud2lkdGgpKSp1LmhmOihwYXJzZUZsb2F0KFYud2lkdGgpLXBhcnNlRmxvYXQodS5zdHlsZS53aWR0aCkpKnUuaGYsMD49Xz8wOl8rJ3B4J30pKCksdS5zdHlsZS50b3A9KCgpPT57bGV0IF87cmV0dXJuIF89bi5jb250YWluZXI9PT1kb2N1bWVudC5ib2R5Pyh3aW5kb3cuaW5uZXJIZWlnaHQtcGFyc2VGbG9hdCh1LmN1cnJlbnREYXRhLmhlaWdodCkpKnUudmY6KHBhcnNlRmxvYXQoVi5oZWlnaHQpLXBhcnNlRmxvYXQodS5jdXJyZW50RGF0YS5oZWlnaHQpKSp1LnZmLDA+PV8/MDpfKydweCd9KSgpKSl9fSwhMSksdGhpcy5wb2ludGVydXAuZm9yRWFjaChYPT57dS5hZGRFdmVudExpc3RlbmVyKFgsKCk9Pnt1LmNvbnRlbnQuc3R5bGUucG9pbnRlckV2ZW50cz0naW5oZXJpdCd9KX0pLHRoaXMuZ2xvYmFsQ2FsbGJhY2tzJiYoQXJyYXkuaXNBcnJheSh0aGlzLmdsb2JhbENhbGxiYWNrcyk/dGhpcy5nbG9iYWxDYWxsYmFja3MuZm9yRWFjaChYPT57WC5jYWxsKHUsdSl9KTp0aGlzLmdsb2JhbENhbGxiYWNrcy5jYWxsKHUsdSkpLG4uY2FsbGJhY2smJihBcnJheS5pc0FycmF5KG4uY2FsbGJhY2spP24uY2FsbGJhY2suZm9yRWFjaChYPT57WC5jYWxsKHUsdSl9KTpuLmNhbGxiYWNrLmNhbGwodSx1KSksbyYmby5jYWxsKHUsdSksZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCh5KSx1fX07IiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRUYXJnZXQgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG59O1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgcGFzc2luZyBmdW5jdGlvbiBpbiBvcHRpb25zLCB0aGVuIHVzZSBpdCBmb3IgcmVzb2x2ZSBcImhlYWRcIiBlbGVtZW50LlxuICAgICAgICAgICAgICAgIC8vIFVzZWZ1bCBmb3IgU2hhZG93IFJvb3Qgc3R5bGUgaS5lXG4gICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgIC8vICAgaW5zZXJ0SW50bzogZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb29cIikuc2hhZG93Um9vdCB9XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBnZXRUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xuXHRcdFx0Ly8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblx0XHRcdGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bdGFyZ2V0XVxuXHR9O1xufSkoKTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSBcImJvb2xlYW5cIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcbiAgICAgICAgaWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8gKyBcIiBcIiArIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0aWYob3B0aW9ucy5hdHRycy50eXBlID09PSB1bmRlZmluZWQpIHtcblx0XHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdH1cblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZSwgdXBkYXRlLCByZW1vdmUsIHJlc3VsdDtcblxuXHQvLyBJZiBhIHRyYW5zZm9ybSBmdW5jdGlvbiB3YXMgZGVmaW5lZCwgcnVuIGl0IG9uIHRoZSBjc3Ncblx0aWYgKG9wdGlvbnMudHJhbnNmb3JtICYmIG9iai5jc3MpIHtcblx0ICAgIHJlc3VsdCA9IG9wdGlvbnMudHJhbnNmb3JtKG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC98XFxzKiQpL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG4iLCJpbXBvcnQgeyBCdXR0cGx1Z0RldmljZSwgU2luZ2xlTW90b3JWaWJyYXRlQ21kLCBGbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZCB9IGZyb20gXCIuLi9pbmRleFwiO1xuaW1wb3J0ICogYXMgTWVzc2FnZXMgZnJvbSBcIi4uL2luZGV4XCI7XG5cbmV4cG9ydCBjbGFzcyBUZXN0RGV2aWNlIGV4dGVuZHMgQnV0dHBsdWdEZXZpY2Uge1xuXG4gIHByaXZhdGUgX2Nvbm5lY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9saW5lYXJTcGVlZDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfbGluZWFyUG9zaXRpb246IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX3ZpYnJhdGVTcGVlZDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfcm90YXRlU3BlZWQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX3JvdGF0ZUNsb2Nrd2lzZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICBzaG91bGRWaWJyYXRlOiBib29sZWFuID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICBzaG91bGRMaW5lYXI6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgIHNob3VsZFJvdGF0ZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgc3VwZXIoYFRlc3QgRGV2aWNlIC0gJHtuYW1lfWAsIFwiVGVzdERldmljZVwiICsgKHNob3VsZFZpYnJhdGUgPyBcIlZpYnJhdGVcIiA6IFwiXCIpICsgKHNob3VsZExpbmVhciA/IFwiTGluZWFyXCIgOiBcIlwiKSk7XG4gICAgdGhpcy5Nc2dGdW5jcy5zZXQoTWVzc2FnZXMuU3RvcERldmljZUNtZC5uYW1lLCB0aGlzLkhhbmRsZVN0b3BEZXZpY2VDbWQpO1xuICAgIGlmIChzaG91bGRWaWJyYXRlKSB7XG4gICAgICB0aGlzLk1zZ0Z1bmNzLnNldChNZXNzYWdlcy5TaW5nbGVNb3RvclZpYnJhdGVDbWQubmFtZSwgdGhpcy5IYW5kbGVTaW5nbGVNb3RvclZpYnJhdGVDbWQpO1xuICAgICAgdGhpcy5Nc2dGdW5jcy5zZXQoTWVzc2FnZXMuVmlicmF0ZUNtZC5uYW1lLCB0aGlzLkhhbmRsZVZpYnJhdGVDbWQpO1xuICAgIH1cbiAgICBpZiAoc2hvdWxkTGluZWFyKSB7XG4gICAgICB0aGlzLk1zZ0Z1bmNzLnNldChNZXNzYWdlcy5GbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZC5uYW1lLCB0aGlzLkhhbmRsZUZsZXNobGlnaHRMYXVuY2hGVzEyQ21kKTtcbiAgICAgIHRoaXMuTXNnRnVuY3Muc2V0KE1lc3NhZ2VzLkxpbmVhckNtZC5uYW1lLCB0aGlzLkhhbmRsZUxpbmVhckNtZCk7XG4gICAgfVxuICAgIGlmIChzaG91bGRSb3RhdGUpIHtcbiAgICAgIHRoaXMuTXNnRnVuY3Muc2V0KE1lc3NhZ2VzLlJvdGF0ZUNtZC5uYW1lLCB0aGlzLkhhbmRsZVJvdGF0ZUNtZCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBDb25uZWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Nvbm5lY3RlZDtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgQ29ubmVjdGVkKGNvbm5lY3RlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX2Nvbm5lY3RlZCA9IGNvbm5lY3RlZDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTWVzc2FnZVNwZWNpZmljYXRpb25zKCk6IG9iamVjdCB7XG4gICAgaWYgKHRoaXMuTXNnRnVuY3MuaGFzKE1lc3NhZ2VzLlZpYnJhdGVDbWQubmFtZSkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIFZpYnJhdGVDbWQ6IHsgRmVhdHVyZUNvdW50OiAyIH0sXG4gICAgICAgIFNpbmdsZU1vdG9yVmlicmF0ZUNtZDoge30sXG4gICAgICAgIFN0b3BEZXZpY2VDbWQ6IHt9LFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuTXNnRnVuY3MuaGFzKE1lc3NhZ2VzLkxpbmVhckNtZC5uYW1lKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgTGluZWFyQ21kOiB7IEZlYXR1cmVDb3VudDogMSB9LFxuICAgICAgICBGbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZDoge30sXG4gICAgICAgIFN0b3BEZXZpY2VDbWQ6IHt9LFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuTXNnRnVuY3MuaGFzKE1lc3NhZ2VzLlJvdGF0ZUNtZC5uYW1lKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgUm90YXRlQ21kOiB7IEZlYXR1cmVDb3VudDogMSB9LFxuICAgICAgICBTdG9wRGV2aWNlQ21kOiB7fSxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIHB1YmxpYyBEaXNjb25uZWN0KCkge1xuICAgIHRoaXMuX2Nvbm5lY3RlZCA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdChcImRldmljZXJlbW92ZWRcIiwgdGhpcyk7XG4gIH1cblxuICBwcml2YXRlIEhhbmRsZVN0b3BEZXZpY2VDbWQgPSBhc3luYyAoYU1zZzogTWVzc2FnZXMuU3RvcERldmljZUNtZCk6IFByb21pc2U8TWVzc2FnZXMuQnV0dHBsdWdNZXNzYWdlPiA9PiB7XG4gICAgaWYgKHRoaXMuTXNnRnVuY3MuaGFzKE1lc3NhZ2VzLlZpYnJhdGVDbWQubmFtZSkpIHtcbiAgICAgIHRoaXMuZW1pdChcInZpYnJhdGVcIiwgMCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLk1zZ0Z1bmNzLmhhcyhNZXNzYWdlcy5MaW5lYXJDbWQubmFtZSkpIHtcbiAgICAgIHRoaXMuZW1pdChcImxpbmVhclwiLCB7IHBvc2l0aW9uOiB0aGlzLl9saW5lYXJQb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogdGhpcy5fbGluZWFyU3BlZWR9KTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgTWVzc2FnZXMuT2soYU1zZy5JZCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBIYW5kbGVTaW5nbGVNb3RvclZpYnJhdGVDbWQgPVxuICAgIGFzeW5jIChhTXNnOiBNZXNzYWdlcy5TaW5nbGVNb3RvclZpYnJhdGVDbWQpOiBQcm9taXNlPE1lc3NhZ2VzLkJ1dHRwbHVnTWVzc2FnZT4gPT4ge1xuICAgICAgdGhpcy5fdmlicmF0ZVNwZWVkID0gYU1zZy5TcGVlZDtcbiAgICAgIHRoaXMuZW1pdChcInZpYnJhdGVcIiwgYU1zZy5TcGVlZCk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBNZXNzYWdlcy5PayhhTXNnLklkKSk7XG4gICAgfVxuXG4gIHByaXZhdGUgSGFuZGxlVmlicmF0ZUNtZCA9XG4gICAgYXN5bmMgKGFNc2c6IE1lc3NhZ2VzLlZpYnJhdGVDbWQpOiBQcm9taXNlPE1lc3NhZ2VzLkJ1dHRwbHVnTWVzc2FnZT4gPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuSGFuZGxlU2luZ2xlTW90b3JWaWJyYXRlQ21kKG5ldyBTaW5nbGVNb3RvclZpYnJhdGVDbWQoYU1zZy5TcGVlZHNbMF0uU3BlZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhTXNnLkRldmljZUluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYU1zZy5JZCkpO1xuICAgIH1cblxuICBwcml2YXRlIEhhbmRsZVJvdGF0ZUNtZCA9XG4gICAgYXN5bmMgKGFNc2c6IE1lc3NhZ2VzLlJvdGF0ZUNtZCk6IFByb21pc2U8TWVzc2FnZXMuQnV0dHBsdWdNZXNzYWdlPiA9PiB7XG4gICAgICB0aGlzLl9yb3RhdGVTcGVlZCA9IGFNc2cuUm90YXRpb25zWzBdLlNwZWVkO1xuICAgICAgdGhpcy5fcm90YXRlQ2xvY2t3aXNlID0gYU1zZy5Sb3RhdGlvbnNbMF0uQ2xvY2t3aXNlO1xuICAgICAgdGhpcy5lbWl0KFwidmlicmF0ZVwiLCB7IHNwZWVkOiB0aGlzLl9yb3RhdGVTcGVlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvY2t3aXNlOiB0aGlzLl9yb3RhdGVDbG9ja3dpc2UgfSk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBNZXNzYWdlcy5PayhhTXNnLklkKSk7XG4gICAgfVxuXG4gIHByaXZhdGUgSGFuZGxlRmxlc2hsaWdodExhdW5jaEZXMTJDbWQgPVxuICAgIGFzeW5jIChhTXNnOiBNZXNzYWdlcy5GbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZCk6IFByb21pc2U8TWVzc2FnZXMuQnV0dHBsdWdNZXNzYWdlPiA9PiB7XG4gICAgICB0aGlzLl9saW5lYXJQb3NpdGlvbiA9IGFNc2cuUG9zaXRpb247XG4gICAgICB0aGlzLl9saW5lYXJTcGVlZCA9IGFNc2cuU3BlZWQ7XG4gICAgICB0aGlzLmVtaXQoXCJsaW5lYXJcIiwgeyBwb3NpdGlvbjogdGhpcy5fbGluZWFyUG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IHRoaXMuX2xpbmVhclNwZWVkIH0pO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgTWVzc2FnZXMuT2soYU1zZy5JZCkpO1xuICAgIH1cblxuICBwcml2YXRlIEhhbmRsZUxpbmVhckNtZCA9XG4gICAgYXN5bmMgKGFNc2c6IE1lc3NhZ2VzLkxpbmVhckNtZCk6IFByb21pc2U8TWVzc2FnZXMuQnV0dHBsdWdNZXNzYWdlPiA9PiB7XG4gICAgICBpZiAoYU1zZy5WZWN0b3JzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2VzLkVycm9yKFwiTGluZWFyQ21kIHJlcXVpcmVzIDEgdmVjdG9yIGZvciB0aGlzIGRldmljZS5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNZXNzYWdlcy5FcnJvckNsYXNzLkVSUk9SX0RFVklDRSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhTXNnLklkKTtcbiAgICAgIH1cbiAgICAgIC8vIE1vdmUgYmV0d2VlbiA1Lzk1LCBvdGhlcndpc2Ugd2UnbGwgYWxsb3cgdGhlIGRldmljZSB0byBzbWFjayBpbnRvIGhhcmRcbiAgICAgIC8vIHN0b3BzIGJlY2F1c2Ugb2YgYnJhaW5kZWFkIGZpcm13YXJlLlxuICAgICAgY29uc3QgcmFuZ2U6IG51bWJlciA9IDkwO1xuICAgICAgY29uc3QgdmVjdG9yID0gYU1zZy5WZWN0b3JzWzBdO1xuICAgICAgY29uc3QgY3VycmVudFBvc2l0aW9uID0gdmVjdG9yLlBvc2l0aW9uICogMTAwO1xuICAgICAgY29uc3QgcG9zaXRpb25EZWx0YTogbnVtYmVyID0gTWF0aC5hYnMoY3VycmVudFBvc2l0aW9uIC0gdGhpcy5fbGluZWFyUG9zaXRpb24pO1xuICAgICAgbGV0IHNwZWVkOiBudW1iZXIgPSBNYXRoLmZsb29yKDI1MDAwICogTWF0aC5wb3coKCh2ZWN0b3IuRHVyYXRpb24gKiA5MCkgLyBwb3NpdGlvbkRlbHRhKSwgLTEuMDUpKTtcblxuICAgICAgLy8gQ2xhbXAgc3BlZWQgb24gMCA8PSB4IDw9IDk1IHNvIHdlIGRvbid0IGJyZWFrIHRoZSBsYXVuY2guXG4gICAgICBzcGVlZCA9IE1hdGgubWluKE1hdGgubWF4KHNwZWVkLCAwKSwgOTUpO1xuXG4gICAgICBjb25zdCBwb3NpdGlvbkdvYWwgPSBNYXRoLmZsb29yKCgoY3VycmVudFBvc2l0aW9uIC8gOTkpICogcmFuZ2UpICsgKCg5OSAtIHJhbmdlKSAvIDIpKTtcbiAgICAgIC8vIFdlJ2xsIHNldCB0aGlzLl9sYXN0UG9zaXRpb24gaW4gRmxlc2hsaWdodExhdW5jaEZXMTJDbWQsIHNpbmNlXG4gICAgICAvLyBldmVyeXRoaW5nIGtpbmRhIGZ1bm5lbHMgdG8gdGhhdC5cbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLkhhbmRsZUZsZXNobGlnaHRMYXVuY2hGVzEyQ21kKG5ldyBNZXNzYWdlcy5GbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZChzcGVlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbkdvYWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYU1zZy5EZXZpY2VJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhTXNnLklkKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcImV2ZW50c1wiO1xuaW1wb3J0IHsgSURldmljZVN1YnR5cGVNYW5hZ2VyIH0gZnJvbSBcIi4uL2luZGV4XCI7XG5pbXBvcnQgeyBUZXN0RGV2aWNlIH0gZnJvbSBcIi4vVGVzdERldmljZVwiO1xuaW1wb3J0IHsgQnV0dHBsdWdMb2dnZXIgfSBmcm9tIFwiLi4vaW5kZXhcIjtcblxuZXhwb3J0IGNsYXNzIFRlc3REZXZpY2VNYW5hZ2VyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIGltcGxlbWVudHMgSURldmljZVN1YnR5cGVNYW5hZ2VyIHtcblxuICBwcml2YXRlIF9pc1NjYW5uaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgX3Rlc3RWaWJyYXRpb25EZXZpY2UgPSBuZXcgVGVzdERldmljZShcIlRlc3QgVmlicmF0aW9uIERldmljZVwiLCB0cnVlLCBmYWxzZSwgZmFsc2UpO1xuICBwcml2YXRlIF90ZXN0TGluZWFyRGV2aWNlID0gbmV3IFRlc3REZXZpY2UoXCJUZXN0IExpbmVhciBEZXZpY2VcIiwgZmFsc2UsIHRydWUsIGZhbHNlKTtcbiAgcHJpdmF0ZSBfdGVzdFJvdGF0aW9uRGV2aWNlID0gbmV3IFRlc3REZXZpY2UoXCJUZXN0IFJvdGF0aW9uIERldmljZVwiLCBmYWxzZSwgZmFsc2UsIHRydWUpO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHVibGljIENvbm5lY3RWaWJyYXRpb25EZXZpY2UoKSB7XG4gICAgQnV0dHBsdWdMb2dnZXIuTG9nZ2VyLkRlYnVnKFwiVGVzdERldmljZU1hbmFnZXI6IENvbm5lY3RpbmcgVmlicmF0aW9uIERldmljZVwiKTtcbiAgICB0aGlzLl90ZXN0VmlicmF0aW9uRGV2aWNlLkNvbm5lY3RlZCA9IHRydWU7XG4gICAgdGhpcy5lbWl0KFwiZGV2aWNlYWRkZWRcIiwgdGhpcy5fdGVzdFZpYnJhdGlvbkRldmljZSk7XG4gIH1cblxuICBwdWJsaWMgQ29ubmVjdExpbmVhckRldmljZSgpIHtcbiAgICBCdXR0cGx1Z0xvZ2dlci5Mb2dnZXIuRGVidWcoXCJUZXN0RGV2aWNlTWFuYWdlcjogQ29ubmVjdGluZyBMaW5lYXIgRGV2aWNlXCIpO1xuICAgIHRoaXMuX3Rlc3RMaW5lYXJEZXZpY2UuQ29ubmVjdGVkID0gdHJ1ZTtcbiAgICB0aGlzLmVtaXQoXCJkZXZpY2VhZGRlZFwiLCB0aGlzLl90ZXN0TGluZWFyRGV2aWNlKTtcbiAgfVxuXG4gIHB1YmxpYyBDb25uZWN0Um90YXRpb25EZXZpY2UoKSB7XG4gICAgQnV0dHBsdWdMb2dnZXIuTG9nZ2VyLkRlYnVnKFwiVGVzdERldmljZU1hbmFnZXI6IENvbm5lY3RpbmcgUm90YXRpb24gRGV2aWNlXCIpO1xuICAgIHRoaXMuX3Rlc3RSb3RhdGlvbkRldmljZS5Db25uZWN0ZWQgPSB0cnVlO1xuICAgIHRoaXMuZW1pdChcImRldmljZWFkZGVkXCIsIHRoaXMuX3Rlc3RSb3RhdGlvbkRldmljZSk7XG4gIH1cblxuICBwdWJsaWMgU3RhcnRTY2FubmluZygpOiB2b2lkIHtcbiAgICBCdXR0cGx1Z0xvZ2dlci5Mb2dnZXIuRGVidWcoXCJUZXN0RGV2aWNlTWFuYWdlcjogU3RhcnRpbmcgU2NhblwiKTtcbiAgICB0aGlzLl9pc1NjYW5uaW5nID0gdHJ1ZTtcbiAgICAvLyBBbHdheXMgZW1pdCBkZXZpY2VzLiBJZiB0aGV5J3JlIGR1cGxpY2F0ZXMsIHRoZSBkZXZpY2UgbWFuYWdlciB3aWxsIHdlZWRcbiAgICAvLyB0aGVtIG91dC5cbiAgICBzZXRUaW1lb3V0KCgpID0+ICB7XG4gICAgICB0aGlzLkNvbm5lY3RWaWJyYXRpb25EZXZpY2UoKTtcbiAgICAgIHRoaXMuQ29ubmVjdExpbmVhckRldmljZSgpO1xuICAgICAgdGhpcy5Db25uZWN0Um90YXRpb25EZXZpY2UoKTtcbiAgICB9LCA1MCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLlN0b3BTY2FubmluZygpLCAxMDApO1xuICB9XG5cbiAgcHVibGljIGdldCBWaWJyYXRpb25EZXZpY2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Rlc3RWaWJyYXRpb25EZXZpY2U7XG4gIH1cblxuICBwdWJsaWMgZ2V0IExpbmVhckRldmljZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdGVzdExpbmVhckRldmljZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgUm90YXRpb25EZXZpY2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Rlc3RSb3RhdGlvbkRldmljZTtcbiAgfVxuXG4gIHB1YmxpYyBTdG9wU2Nhbm5pbmcoKTogdm9pZCB7XG4gICAgQnV0dHBsdWdMb2dnZXIuTG9nZ2VyLkRlYnVnKFwiVGVzdERldmljZU1hbmFnZXI6IFN0b3BwaW5nIFNjYW5cIik7XG4gICAgdGhpcy5faXNTY2FubmluZyA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdChcInNjYW5uaW5nZmluaXNoZWRcIik7XG4gIH1cblxuICBwdWJsaWMgZ2V0IElzU2Nhbm5pbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzU2Nhbm5pbmc7XG4gIH1cbn1cbiIsImltcG9ydCB7IEJ1dHRwbHVnQ2xpZW50LCBCdXR0cGx1Z0VtYmVkZGVkU2VydmVyQ29ubmVjdG9yLCBCdXR0cGx1Z1NlcnZlciB9IGZyb20gXCIuLi9pbmRleFwiO1xuaW1wb3J0IHsgVGVzdERldmljZU1hbmFnZXIgfSBmcm9tIFwiLi9UZXN0RGV2aWNlTWFuYWdlclwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gQ3JlYXRlRGV2VG9vbHNDbGllbnQoKTogUHJvbWlzZTxCdXR0cGx1Z0NsaWVudD4ge1xuICBjb25zdCBjbGllbnQgPSBuZXcgQnV0dHBsdWdDbGllbnQoXCJUZXN0IENsaWVudFwiKTtcbiAgY29uc3Qgc2VydmVyID0gbmV3IEJ1dHRwbHVnU2VydmVyKFwiVGVzdCBTZXJ2ZXJcIik7XG4gIHNlcnZlci5DbGVhckRldmljZU1hbmFnZXJzKCk7XG4gIHNlcnZlci5BZGREZXZpY2VNYW5hZ2VyKG5ldyBUZXN0RGV2aWNlTWFuYWdlcigpKTtcbiAgY29uc3QgbG9jYWxDb25uZWN0b3IgPSBuZXcgQnV0dHBsdWdFbWJlZGRlZFNlcnZlckNvbm5lY3RvcigpO1xuICBsb2NhbENvbm5lY3Rvci5TZXJ2ZXIgPSBzZXJ2ZXI7XG4gIGF3YWl0IGNsaWVudC5Db25uZWN0KGxvY2FsQ29ubmVjdG9yKTtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjbGllbnQpO1xufVxuIiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vTG9nUGFuZWwuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0xvZ1BhbmVsLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vTG9nUGFuZWwuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgaWQ9XFxcImJ1dHRwbHVnZGV2dG9vbHNsb2dwYW5lbFxcXCI+XFxuICA8dGV4dGFyZWEgaWQ9XFxcImJ1dHRwbHVnZGV2dG9vbHNsb2d0ZXh0YXJlYVxcXCIgcmVhZG9ubHk+PC90ZXh0YXJlYT5cXG4gIDxkaXYgaWQ9XFxcImJ1dHRwbHVnZGV2dG9vbHNsb2dsZXZlbFxcXCI+XFxuICAgIDxsYWJlbD5QYW5lbCBMb2cgTGV2ZWw6PC9sYWJlbD5cXG4gICAgPHNlbGVjdCBpZD1cXFwiYnV0dHBsdWdkZXZ0b29sc2xvZ2xldmVscGFuZWxzZWxlY3RcXFwiPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIk9mZlxcXCI+T2ZmPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiRmF0YWxcXFwiPkZhdGFsPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiRXJyb3JcXFwiPkVycm9yPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiV2FyblxcXCI+V2Fybjwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkluZm9cXFwiPkluZm88L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJEZWJ1Z1xcXCIgc2VsZWN0ZWQ+RGVidWc8L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJUcmFjZVxcXCI+VHJhY2U8L29wdGlvbj5cXG4gICAgPC9zZWxlY3Q+XFxuICAgIDxsYWJlbD5Db25zb2xlIExvZyBMZXZlbDo8L2xhYmVsPlxcbiAgICA8c2VsZWN0IGlkPVxcXCJidXR0cGx1Z2RldnRvb2xzbG9nbGV2ZWxjb25zb2xlc2VsZWN0XFxcIj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJPZmZcXFwiIHNlbGVjdGVkPk9mZjwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkZhdGFsXFxcIj5GYXRhbDwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkVycm9yXFxcIj5FcnJvcjwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIldhcm5cXFwiPldhcm48L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJJbmZvXFxcIj5JbmZvPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiRGVidWdcXFwiPkRlYnVnPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiVHJhY2VcXFwiPlRyYWNlPC9vcHRpb24+XFxuICAgIDwvc2VsZWN0PlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXCI7IiwiaW1wb3J0IHsgQnV0dHBsdWdMb2dnZXIsIExvZ01lc3NhZ2UsIEJ1dHRwbHVnTG9nTGV2ZWwgfSBmcm9tIFwiLi4vLi4vaW5kZXhcIjtcbmNvbnN0IGpzUGFuZWwgPSByZXF1aXJlKFwianNwYW5lbDRcIik7XG5yZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvanNwYW5lbC5jc3NcIik7XG5jb25zdCBsb2dQYW5lbEhUTUwgPSByZXF1aXJlKFwiLi9Mb2dQYW5lbC5odG1sXCIpLnRvU3RyaW5nKCk7XG5yZXF1aXJlKFwiLi9Mb2dQYW5lbC5jc3NcIik7XG5cbmV4cG9ydCBjbGFzcyBMb2dQYW5lbCB7XG5cbiAgcHVibGljIHN0YXRpYyBTaG93TG9nUGFuZWwoKSB7XG4gICAganNQYW5lbC5qc1BhbmVsLmNyZWF0ZSh7XG4gICAgICBpZDogKCkgPT4gXCJidXR0cGx1Zy1sb2dnZXItcGFuZWxcIixcbiAgICAgIHRoZW1lOiAgICAgICBcInByaW1hcnlcIixcbiAgICAgIGhlYWRlclRpdGxlOiBcIkJ1dHRwbHVnIExvZ1wiLFxuICAgICAgcG9zaXRpb246ICAgIFwiY2VudGVyLXRvcCAwIDgwXCIsXG4gICAgICBjb250ZW50U2l6ZTogXCI2NTAgMjUwXCIsXG4gICAgICBjYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LmlubmVySFRNTCA9IGxvZ1BhbmVsSFRNTDtcbiAgICAgICAgTG9nUGFuZWwuX3BhbmVsID0gbmV3IExvZ1BhbmVsKCk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX3BhbmVsOiBMb2dQYW5lbCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGxvZ1RleHRBcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50O1xuICBwcml2YXRlIHBhbmVsTGV2ZWxTZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50O1xuICBwcml2YXRlIGNvbnNvbGVMZXZlbFNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5sb2dUZXh0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV0dHBsdWdkZXZ0b29sc2xvZ3RleHRhcmVhXCIpISBhcyBIVE1MVGV4dEFyZWFFbGVtZW50O1xuICAgIHRoaXMucGFuZWxMZXZlbFNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV0dHBsdWdkZXZ0b29sc2xvZ2xldmVscGFuZWxzZWxlY3RcIikhIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xuICAgIHRoaXMuY29uc29sZUxldmVsU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0cGx1Z2RldnRvb2xzbG9nbGV2ZWxjb25zb2xlc2VsZWN0XCIpISBhcyBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICBjb25zdCBsb2cgPSBCdXR0cGx1Z0xvZ2dlci5Mb2dnZXI7XG4gICAgbG9nLmFkZExpc3RlbmVyKFwibG9nXCIsIChtc2cpID0+IHtcbiAgICAgIHRoaXMuYWRkTG9nTWVzc2FnZShtc2cpO1xuICAgIH0pO1xuICAgIHRoaXMucGFuZWxMZXZlbFNlbGVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcbiAgICAgIGxvZy5NYXhpbXVtRXZlbnRMb2dMZXZlbCA9IEJ1dHRwbHVnTG9nTGV2ZWxbdGhpcy5wYW5lbExldmVsU2VsZWN0LnZhbHVlXTtcbiAgICB9KTtcbiAgICB0aGlzLmNvbnNvbGVMZXZlbFNlbGVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcbiAgICAgIGxvZy5NYXhpbXVtQ29uc29sZUxvZ0xldmVsID0gQnV0dHBsdWdMb2dMZXZlbFt0aGlzLmNvbnNvbGVMZXZlbFNlbGVjdC52YWx1ZV07XG4gICAgfSk7XG4gICAgbG9nLk1heGltdW1FdmVudExvZ0xldmVsID0gQnV0dHBsdWdMb2dMZXZlbC5EZWJ1ZztcbiAgICBsb2cuRGVidWcoXCJMb2dQYW5lbDogRGV2VG9vbHMgTG9nIHBhbmVsIGVuYWJsZWQuXCIpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRMb2dNZXNzYWdlKG1zZzogTG9nTWVzc2FnZSkge1xuICAgIHRoaXMubG9nVGV4dEFyZWEudmFsdWUgPSB0aGlzLmxvZ1RleHRBcmVhLnZhbHVlICsgXCJcXG5cIiArIG1zZy5Gb3JtYXR0ZWRNZXNzYWdlO1xuICB9XG5cbn1cbiIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsIm1vZHVsZS5leHBvcnRzID0gXCI8YnV0dHBsdWctZGV2dG9vbHMtbWFpbj5cXG4gIDxpbnB1dCBpZD1cXFwidGFiMVxcXCIgdHlwZT1cXFwicmFkaW9cXFwiIG5hbWU9XFxcInRhYnNcXFwiIGNoZWNrZWQ+XFxuICA8bGFiZWwgZm9yPVxcXCJ0YWIxXFxcIj5UZXN0IERldmljZXM8L2xhYmVsPlxcbiAgPHNlY3Rpb24gaWQ9XFxcImNvbnRlbnQxXFxcIj5cXG4gICAgPGRpdiBpZD1cXFwic2ltdWxhdG9yXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJ2aWJyYXRvci1zaW11bGF0b3ItY29tcG9uZW50XFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInZpYnJhdG9yXFxcIj5cXG4gICAgICAgICAgPGltZyBzcmM9XFxcIlwiICsgcmVxdWlyZShcIi4vaHVzaC5wbmdcIikgKyBcIlxcXCJcXG4gICAgICAgICAgICAgICBpZD1cXFwidmlicmF0b3ItaW1hZ2VcXFwiPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJ2aWJyYXRvci1pbmZvXFxcIj5cXG4gICAgICAgICAgPGI+VmlicmF0aW9uIFNwZWVkOjwvYj4gPHNwYW4gaWQ9XFxcInZpYnJhdGlvbnNwZWVkXFxcIj4wPC9zcGFuPjxici8+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcInZpYnJhdGVkaXNjb25uZWN0XFxcIj5EaXNjb25uZWN0PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJzaW11bGF0b3ItZGl2aWRlclxcXCI+PC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiZmxlc2hsaWdodC1zaW1cXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiYy1mbGVzaGxpZ2h0XFxcIj5cXG4gICAgICAgICAgPGRpdj5cXG4gICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCIgKyByZXF1aXJlKFwiLi9ydWxlci5wbmdcIikgKyBcIlxcXCI+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8ZGl2PlxcbiAgICAgICAgICAgIDxpbWcgc3JjPVxcXCJcIiArIHJlcXVpcmUoXCIuL2ZsZXNobGlnaHQucG5nXCIpICsgXCJcXFwiXFxuICAgICAgICAgICAgICAgICBjbGFzcz1cXFwiby1mbGVzaGxpZ2h0XFxcIlxcbiAgICAgICAgICAgICAgICAgaWQ9XFxcImZsZXNobGlnaHQtaW1hZ2VcXFwiPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdj5cXG4gICAgICAgICAgPGI+U3BlZWQ6PC9iPiA8c3BhbiBpZD1cXFwibGluZWFyc3BlZWRcXFwiPjA8L3NwYW4+PGJyLz5cXG4gICAgICAgICAgPGI+UG9zaXRpb246PC9iPiA8c3BhbiBpZD1cXFwibGluZWFycG9zaXRpb25cXFwiPjA8L3NwYW4+PGJyLz5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwibGluZWFyZGlzY29ubmVjdFxcXCI+RGlzY29ubmVjdDwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9zZWN0aW9uPlxcbjwvYnV0dHBsdWctZGV2dG9vbHMtbWFpbj5cXG5cIjsiLCJpbXBvcnQgeyBCdXR0cGx1Z1NlcnZlciwgQnV0dHBsdWdMb2dnZXIgfSBmcm9tIFwiLi4vLi4vaW5kZXhcIjtcbmltcG9ydCB7IFRlc3REZXZpY2VNYW5hZ2VyIH0gZnJvbSBcIi4uL1Rlc3REZXZpY2VNYW5hZ2VyXCI7XG5pbXBvcnQgKiBhcyBUV0VFTiBmcm9tIFwiQHR3ZWVuanMvdHdlZW4uanNcIjtcblxuY29uc3QganNQYW5lbCA9IHJlcXVpcmUoXCJqc3BhbmVsNFwiKTtcbnJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvanNwYW5lbDQvZGlzdC9qc3BhbmVsLmNzc1wiKTtcbmNvbnN0IHRlc3RQYW5lbEhUTUwgPSByZXF1aXJlKFwiLi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmh0bWxcIikudG9TdHJpbmcoKTtcbnJlcXVpcmUoXCIuL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwuY3NzXCIpO1xuXG5leHBvcnQgY2xhc3MgVGVzdERldmljZU1hbmFnZXJQYW5lbCB7XG4gIHB1YmxpYyBzdGF0aWMgU2hvd1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwoYnV0dHBsdWdTZXJ2ZXI6IEJ1dHRwbHVnU2VydmVyKSB7XG4gICAgbGV0IHRkbTogVGVzdERldmljZU1hbmFnZXIgfCBudWxsID0gbnVsbDtcbiAgICBmb3IgKGNvbnN0IG1nciBvZiBidXR0cGx1Z1NlcnZlci5EZXZpY2VNYW5hZ2Vycykge1xuICAgICAgaWYgKG1nci5jb25zdHJ1Y3Rvci5uYW1lID09PSBcIlRlc3REZXZpY2VNYW5hZ2VyXCIpIHtcbiAgICAgICAgdGRtID0gKG1nciBhcyBUZXN0RGV2aWNlTWFuYWdlcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGRtID09PSBudWxsKSB7XG4gICAgICBCdXR0cGx1Z0xvZ2dlci5Mb2dnZXIuRXJyb3IoXCJUZXN0RGV2aWNlTWFuYWdlclBhbmVsOiBDYW5ub3QgZ2V0IHRlc3QgZGV2aWNlIG1hbmFnZXIgZnJvbSBzZXJ2ZXIuXCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGdldCB0ZXN0IGRldmljZSBtYW5hZ2VyIGZyb20gc2VydmVyLlwiKTtcbiAgICB9XG4gICAganNQYW5lbC5qc1BhbmVsLmNyZWF0ZSh7XG4gICAgICBpZDogKCkgPT4gXCJidXR0cGx1Zy10ZXN0LWRldmljZS1tYW5hZ2VyLXBhbmVsXCIsXG4gICAgICB0aGVtZTogICAgICAgXCJwcmltYXJ5XCIsXG4gICAgICBoZWFkZXJUaXRsZTogXCJUZXN0IERldmljZSBNYW5hZ2VyXCIsXG4gICAgICBwb3NpdGlvbjogICAgXCJjZW50ZXItdG9wIDAgODBcIixcbiAgICAgIGNvbnRlbnRTaXplOiBcIjQwMCAyNTBcIixcbiAgICAgIGNhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQuaW5uZXJIVE1MID0gdGVzdFBhbmVsSFRNTDtcbiAgICAgICAgVGVzdERldmljZU1hbmFnZXJQYW5lbC5fcGFuZWwgPSBuZXcgVGVzdERldmljZU1hbmFnZXJQYW5lbCh0ZG0hKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3RhdGljIF9wYW5lbDogVGVzdERldmljZU1hbmFnZXJQYW5lbDtcbiAgcHJpdmF0ZSBfdGVzdE1hbmFnZXI6IFRlc3REZXZpY2VNYW5hZ2VyO1xuICBwcml2YXRlIGZsZXNobGlnaHRFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSB2aWJyYXRvckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIGN1cnJlbnRMYXVuY2hQb3NpdGlvbjogYW55ID0geyB4OiAwLCB5OiAwIH07XG4gIHByaXZhdGUgbGFzdFBvc2l0aW9uOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIG1vdmVSYWRpdXM6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgY3VycmVudFZpYnJhdGVQb3NpdGlvbjogYW55ID0geyB4OiAwLCB5OiAwIH07XG5cbiAgY29uc3RydWN0b3IodGRtOiBUZXN0RGV2aWNlTWFuYWdlcikge1xuICAgIHRoaXMuX3Rlc3RNYW5hZ2VyID0gdGRtO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlicmF0ZWRpc2Nvbm5lY3RcIikhLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLl90ZXN0TWFuYWdlciEuVmlicmF0aW9uRGV2aWNlLkRpc2Nvbm5lY3QoKTtcbiAgICB9KTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpbmVhcmRpc2Nvbm5lY3RcIikhLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLl90ZXN0TWFuYWdlciEuTGluZWFyRGV2aWNlLkRpc2Nvbm5lY3QoKTtcbiAgICB9KTtcbiAgICB0aGlzLl90ZXN0TWFuYWdlci5WaWJyYXRpb25EZXZpY2UuYWRkTGlzdGVuZXIoXCJ2aWJyYXRlXCIsIChzcGVlZCkgPT4ge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWJyYXRpb25zcGVlZFwiKSEuaW5uZXJIVE1MID0gc3BlZWQ7XG4gICAgICB0aGlzLnZpYnJhdGVNb3ZlKHNwZWVkKTtcbiAgICB9KTtcbiAgICB0aGlzLl90ZXN0TWFuYWdlci5MaW5lYXJEZXZpY2UuYWRkTGlzdGVuZXIoXCJsaW5lYXJcIiwgKGxpbmVhcm9iajogYW55KSA9PiB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpbmVhcnBvc2l0aW9uXCIpIS5pbm5lckhUTUwgPSBsaW5lYXJvYmoucG9zaXRpb247XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpbmVhcnNwZWVkXCIpIS5pbm5lckhUTUwgPSBsaW5lYXJvYmouc3BlZWQ7XG4gICAgICB0aGlzLmxhdW5jaE1vdmUobGluZWFyb2JqLnBvc2l0aW9uLCBsaW5lYXJvYmouc3BlZWQpO1xuICAgIH0pO1xuICAgIHRoaXMuZmxlc2hsaWdodEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZsZXNobGlnaHQtaW1hZ2VcIikhO1xuICAgIHRoaXMudmlicmF0b3JFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWJyYXRvci1pbWFnZVwiKSE7XG4gIH1cblxuICBwcml2YXRlIGxhdW5jaE1vdmUgPSAocG9zaXRpb24sIHNwZWVkKSA9PiB7XG4gICAgY29uc3QgcCA9IC0oKDEwMCAtIHBvc2l0aW9uKSAqIDAuMjIpO1xuICAgIGNvbnN0IGR1cmF0aW9uID0gdGhpcy5tb3ZlRHVyYXRpb24ocG9zaXRpb24sIHNwZWVkKTtcbiAgICBuZXcgVFdFRU4uVHdlZW4odGhpcy5jdXJyZW50TGF1bmNoUG9zaXRpb24pXG4gICAgICAudG8oe3g6IDAsIHk6IHB9LCBkdXJhdGlvbilcbiAgICAgIC5zdGFydCgpO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxhdW5jaEFuaW1hdGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBsYXVuY2hBbmltYXRlID0gKHRpbWVzdGFtcDogbnVtYmVyKSA9PiB7XG4gICAgaWYgKCFUV0VFTi51cGRhdGUoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmZsZXNobGlnaHRFbGVtZW50LnN0eWxlLmJvdHRvbSA9IGAke3RoaXMuY3VycmVudExhdW5jaFBvc2l0aW9uLnl9JWA7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubGF1bmNoQW5pbWF0ZSk7XG4gIH1cblxuICAvLyBtb3ZlRHVyYXRpb24gcmV0dXJucyB0aGUgdGltZSBpbiBtaWxsaXNlY29uZHMgaXQgd2lsbCB0YWtlIHRvIG1vdmVcbiAgLy8gdG8gcG9zaXRpb24gYXQgc3BlZWQuXG4gIC8vXG4gIC8vIHBvc2l0aW9uOiBwb3NpdGlvbiBpbiBwZXJjZW50ICgwLTEwMCkuXG4gIC8vIHNwZWVkOiAgICBzcGVlZCBpbiBwZXJjZW50ICgyMC0xMDApLlxuICBwcml2YXRlIG1vdmVEdXJhdGlvbiA9IChwb3NpdGlvbjogbnVtYmVyLCBzcGVlZDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLmFicyhwb3NpdGlvbiAtIHRoaXMubGFzdFBvc2l0aW9uKTtcbiAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHJldHVybiB0aGlzLmNhbGNEdXJhdGlvbihkaXN0YW5jZSwgc3BlZWQpO1xuICB9XG5cbiAgLy8gX2NhbGNEdXJhdGlvbiByZXR1cm5zIGR1cmF0aW9uIG9mIGEgbW92ZSBpbiBtaWxsaXNlY29uZHMgZm9yIGEgZ2l2ZW5cbiAgLy8gZGlzdGFuY2Uvc3BlZWQuXG4gIC8vXG4gIC8vIGRpc3RhbmNlOiBhbW91bnQgdG8gbW92ZSBwZXJjZW50ICgwLTEwMCkuXG4gIC8vIHNwZWVkOiBzcGVlZCB0byBtb3ZlIGF0IGluIHBlcmNlbnQgKDIwLTEwMCkuXG4gIHByaXZhdGUgY2FsY0R1cmF0aW9uID0gKGRpc3RhbmNlOiBudW1iZXIsIHNwZWVkOiBudW1iZXIpID0+IHtcbiAgICByZXR1cm4gTWF0aC5wb3coc3BlZWQgLyAyNTAwMCwgLTAuOTUpIC8gKDkwIC8gZGlzdGFuY2UpO1xuICB9XG5cbiAgcHJpdmF0ZSB2aWJyYXRlTW92ZSA9IChzcGVlZCkgPT4ge1xuICAgIHRoaXMubW92ZVJhZGl1cyA9IHNwZWVkO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnZpYnJhdGVBbmltYXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgdmlicmF0ZUFuaW1hdGUgPSAodGltZXN0YW1wOiBudW1iZXIpID0+IHtcbiAgICBpZiAoIVRXRUVOLnVwZGF0ZSgpKSB7XG4gICAgICBpZiAodGhpcy5tb3ZlUmFkaXVzICE9PSAwKSB7XG4gICAgICAgIG5ldyBUV0VFTi5Ud2Vlbih0aGlzLmN1cnJlbnRWaWJyYXRlUG9zaXRpb24pXG4gICAgICAgICAgLnRvKHt4OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLm1vdmVSYWRpdXMgKiAyMCksXG4gICAgICAgICAgICAgICB5OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLm1vdmVSYWRpdXMgKiAyMCl9XG4gICAgICAgICAgICAgICwgMzQpXG4gICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnZpYnJhdGVBbmltYXRlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy52aWJyYXRvckVsZW1lbnQuc3R5bGUudG9wID0gYCR7dGhpcy5jdXJyZW50VmlicmF0ZVBvc2l0aW9uLnh9cHhgO1xuICAgIHRoaXMudmlicmF0b3JFbGVtZW50LnN0eWxlLnJpZ2h0ID0gYCR7dGhpcy5jdXJyZW50VmlicmF0ZVBvc2l0aW9uLnl9cHhgO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnZpYnJhdGVBbmltYXRlKTtcbiAgfVxufVxuXG4vLyBTb21lIGNvZGUgaW4gdGhpcyBmaWxlIHRha2VuIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2Z1bmphY2svbGF1bmNoY29udHJvbFxuLy8gTUlUIExpY2Vuc2U6XG4vKlxuTGF1Y2hjb250cm9sIFVJIEZsZXNobGlnaHRcblxuaHR0cHM6Ly9naXRodWIuY29tL2Z1bmphY2svbGF1bmNoY29udHJvbFxuXG5Db3B5cmlnaHQgMjAxNyBGdW5qYWNrXG5cblJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxubW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cbjEuIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xubGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG5cbjIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbnRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb25cbmFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuXG4zLiBOZWl0aGVyIHRoZSBuYW1lIG9mIHRoZSBjb3B5cmlnaHQgaG9sZGVyIG5vciB0aGUgbmFtZXMgb2YgaXRzIGNvbnRyaWJ1dG9yc1xubWF5IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlIHdpdGhvdXRcbnNwZWNpZmljIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cblxuVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG5BTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRVxuRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRVxuRk9SIEFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUxcbkRBTUFHRVMgKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SXG5TRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUlxuQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSxcbk9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFXG5PRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuKi9cbiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQURRQUFBQm5DQVlBQUFCUFltR3lBQUFBQm1KTFIwUUEvd0QvQVArZ3ZhZVRBQUFBQ1hCSVdYTUFBQXNUQUFBTEV3RUFtcHdZQUFBQUIzUkpUVVVINFFRZUN5Y1RCcVQ0c1FBQUFCbDBSVmgwUTI5dGJXVnVkQUJEY21WaGRHVmtJSGRwZEdnZ1IwbE5VRmVCRGhjQUFBTkpTVVJCVkhqYTdaeS9iNXRBRk1mZklkU2hhVGRManAydGt0bTY4QTkwNzVvQnBrcVord2YwYitnZjBObFNKang0elo3VncwbFdOeU4xUzF4TFdWRFZKYko1SGV4TEFQUGpPTGdEdSs4N2hSamZ2US92RjNlUU1HZ21CRDFpeHI4b1lIemZCd0NBMVdxVituQ3ovbDM2NWN2eEtIVThtVXdBQUNBSWdrYTIyYW93QXFSdGlYR0RJRUFWS0F2T1RBVFVySUxnZVFHeG5KUkF4Tk1FUWtRakhyS05lWWZwOTQ1UklGbklyam95R2tzN1V4N0tOdGF5T3dWRVBQTEdjSFNaT25ZY0ozV2N1R09nUG5TU3VkSTZrR3BJNkI1YkJRaDkzd2ZmOTJ0UFhPUXB5N0pTTUdKOGxlS2p0V3cvckI5emYzODFHcWVPNHpqdVI5bE9WcnBzbGVPY0h4bWVCSFZkdDdES05Wa1RLZWRRMlhxb0RFWjRpSE1PdTkydTl0akdxeHpuL09qcTU4bDFYVmd1bDJEYk50aDJlNUZ2ZFFHVGhGb3NGclRBSXlCcXJDM0ROR21zWnhkeUt2V1NIZmJNUU1mZVhNYnovV2lzYlVCUmxTTWc2a1BVaDZnUFVSK2lQa1JsbTRDb0QxRWZvajVFZllpcUhBRVJFRFZXYXF6VVdLbXhublpqelQ1ZnJhdnRkdHQ0ak1aRklVK3U2d0xuWEhxZ3NpZCtWQlFVa3c0OXowdTlRSkVYS3NKTFpZLzFoVWV6Y2h3bjlSN2RiRGFyWmFlbEkzZGtuNExyeUVkdGI1SmNqY2JTYjVKMDNZZWtyNlNxNFdFWXZyeHByN01vb09kNTVwTDdrS2VIT1ZGckRsVjVwK3J2SG1UT1VjMmwvM2I1WURUY3NoSmhGL3o4OXVHc1BPUi8vUDdMT0pCTS9xaWNTemxFUUFSRVFOMERxVlN0dGlzZGVZaUFDTWd3VUJpR3JTZDMwWGVMNWlJUEVkQUpBV0hYaTd2c0lxOXFmNkZzMXdmRnJzMWhzdys2QWhQekMzc2UxbytGLzVxQXlRQUpGZTJ6SlNkVFZaMnhEK2ZXQmhJdWxqSzJ6Q0FaMVp5ajBHNHBENG1CZE81NHlvQms3R0YxYytqbzZ2VWw1TXBFSWRmM2tLdmxvYTVEVHNaRFZUbkVjRHBIZG5OZGFiVE9rSXVpQ09JNEJwek9nZDFjTTlYR3VyK1RHQTRBNys0Qk5rOGd3SVRldmIxb3pVTlJGQlYrOXVmSDdmNkg0VURjM2NTcVFLOWZIQTRBcC9QQ0U5OS8vZElJNk1Yb1BPMUJqbTFTQUxvb0dSaGc4eVJua0lxeWM3M3FEUUE4cXdMOXJUMXBBcktoNFVWNmJ1S2hOcStzRVVrOUxzZTdlNFFlaUgzK1ZHa3ZyVmo3THVrM05Mb09PNWx3cXdYVUZaZ3NpREtRU2FpNk1NcEF1c0ZVUUZvQmFodXNDWWpRUHhqaXJ5Q29wTFdiQUFBQUFFbEZUa1N1UW1DQ1wiIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRElBQUFCQkNBSUFBQUFjNjJDSkFBQUFCR2RCVFVFQUFMR1BDL3hoQlFBQUFDQmpTRkpOQUFCNkpnQUFnSVFBQVBvQUFBQ0E2QUFBZFRBQUFPcGdBQUE2bUFBQUYzQ2N1bEU4QUFBQUJtSkxSMFFBL3dEL0FQK2d2YWVUQUFBQUNYQklXWE1BQUFzU0FBQUxFZ0hTM1g3OEFBQUFCM1JKVFVVSDRRb09GU29EVnl6eEhBQUFDVmxKUkVGVWFON2RXbDFzRTFjV1BuZit4eDZQLzhZMktVbk1MazBVRnJwU1VXa0xLdEpXVlo4V3lUSnNKRVFRa1doQkxSSThWU29QQzZqcVE2SktmV0NsVm1vVGlVSjJ1MVdraHZTbExXckxBeERDOHFPdGhOUUdWRW9TWjJteGpYOWlPOU1aejcxM0h5NFlOd25GUDVpVjlqeFlNM2ZtbnZudU9lZWV2MnRFS1lYbWlCQUNBTVBEd3dDd2UvZHVudWNSUWszeUJOb2NFVUl3eHNlUEh3K0h3OUZvZEdSa0JHTk1DR21TYmJPd0hNYzVkT2lRWVJoUFB2bmsrdlhydTd1N2p4dzVnakZ1a2kxcVVvbUVFSmVxR29aaGhFSTh6d1BBdFd2WDV1Zm5PWTVyaG0xVGt5bWwrL2J0TTR3UVVHQ1lBS0M3dTN2ZnZuMU5ycllwV05ldlhmdm1xNjhwSVpxbVZRWVJRdWZQbi8vKysrK2JRZFk0TEl6eHFWT244dms4UW1pUnltemJQbjM2Tk5zUWp4dFdJcEU0ZnVLRUpFbUNJQ2lLVXYzSTdYWi8vUEhITXpNekRRdXNFVmlVVW96eDRNREFmeEp6QUFBSUVMK1lUemFiSFJ3Y2JIak5EVXByYW1ycXE2KytacnJ6K254TFgxQVVaWEp5Y21wcTZySENLcFZLMld5R3dSSjRZUm0rSEZjb0ZCWVdGaHJqMzZEZjJyaHhZMkptRmdCMG4xZFYxV28wQUlBeFp2SEg3WGFmT1hQbWNVbUxBZ0lFQUVzWHBPdjZpaFVybW8rSmpjQWFHaDY2OGNNUHl6NEtoOE9hcHJsY0xuYWJUcWMvK09DREJoUlNOeXdXaHRtMXdQT2lLRlllVllUazhYaXFwelFBcTI3YnVuejU4b3QvZXRHcjZ3QWdpbUxBQ0ZhTHl1ZnpBWUJwbXJkdTNjSVlBMEFpa2ZqODg4K2ZlZWFaMWtvTG9ZZXZSRlhWU0NTeVZJb3RoRFV4TVNGTDB0SnhTWkprV2E3Y0NzSmRyK0YydXljbkoxc082NU4vZnVLcThnalZFcXIyRkxJc0J3SUJBQWdFQXFPam95MkhWU01oaEtwM1EydGhwVklweTdKcWZMbGlnbzdqcEZLcEZzSWFHeHViU3lScTNMb3VsNHNKTEp2Tm5qeDVzbFd3S0tXTDl0UnZaOGFTSkZWUzFucXBQbGlmZnZwcE5SVE5vejEwQ2dESXN2elpaNSsxQ2hiSGNlZk9uZnVWQUdwVEo4L3pseTVkYWhXc3gwbi9sN0NhTCtwYkFTdWZ6MWRmc3lyb2Z3OXJFWVJNSmxOZGdSV0xSZHUyRytNc05EWnRXU3FYeTNOemM3cXVzK3RNSnRNd3EwY0dpMUxLODd4cG1xWnBOcyt0RGlVU1FsNTQ0UVdXM0ZWR0hNZGgxd2loQjlYUUdPTU5HemEwQ2haQ2FOdTJiZFhmeGhqL1VvTnNMTXVLeFdJdGhMVTBMeTBXaW5WOTc5SERBb0N0VzdlMmQzWlV1eXVFVUQ2WGh3ZUhiVXFwMysrUHhXSjFGUTMxd1FxRlF2MzkvYWI1cTFvWll3Y29QTWl3Y3JuYzl1M2JEY05vb2JRQTRLV1hYZ3BISWhWTEJ3RGJzblBaN01MQ1F2VWdJMEtJcnVzdnYveHl2WDNldWdzeVN1blUxTlNXUDI5SkptK3pEQUloNU5FOWdpaHFtcmFvb3lRSXdrY2ZmZFRUMDFPdjk2L2JieUdFZW5wNjRsdmoveGo1ZXlYSjBYVmRkZCt0cEhPNUhCTWJRbWo3OXUxcjFxeXA5eE9OU0lzSkxKVks3ZHk1OCtyVnF6emlNTUdXYlZmVUpNc3l4M0hsY3JtcnEydDBkTFM2WUt5ZEdveUpobUhzMnJVTEFQTDV2R21hQVgrZ3M3T3pvNk5qdzRZTnJGcmtlWDdQbmozaGNMZ3gvazAxd0RkdDNKaVlUVkJLaThXaVF6QkNxTDI5WFpJazI3WU53emg3OW16RG5CdVBpWVNRNTU1Ly90dC9mOHZ6dk12bFd0M1pBUUNDSU55NWN3ZGp2R25UcHFVbFNlM1VWR0xUMTljblNxTEw1YUlBczdPemlVVEM3L2RybW1aWlZtOXZiek9jRzVjV3gzRUlJY3UyQ1NGQVlkWHZmeWZMY2lhVEtaVks1WElaR3VxSVBBSllqQ1JKVW1VRkFjek56WW1pdUg3OWV0dTJpOFZtQTJXenNBZ2haYWNNRklKRzBPdjEzcmh4bzFnc2xrcWxabUd4L09uS2xTc2N4eG1HMGRIUndiUlQ0M3lPNHdSQkJFcXoyZXo4L1B6YXRXdlQ2WFR6R2IwQUFJT0RnME5EUTJ4N2o0eU1SS1BSV21ZeXowSXdMcGZMTGxYdGVLSU5BT2JuNTBWUlpLMEg5a0pqRUxuaDRlR2pSNDhHZzhGQUlMQ3dzTEJqeDQ1ME9sM0xURUxJOVBTMElpdHVsOHZyOVFLQUtJcUtvaWlLSW9yaTlldlhiOTY4MmZqaFNtVTF3V0JRMS9WY0xqYzJOdmJiUjBqc2pJbFMrdTY3NzFaaWN5UVNXYmx5Wldkblp6UWFiVzl2Zi92dHQvZnYzejh6TXdQM0RtUHFnd1VBUU1FMFRkYk80M24rOHVYTEQyMUhqWTJOeFdLeDZadlRsUkZkMTZWN3pjdTJ0clpRS0NTS1lqd2U3K3JxMnJ4NTgvRHc4TjNUM3RybzdrNmN6K1Z6Mlp3Uk10eHU5L2o0K0d1dnZiWTB4RElKdmZQT096TXpNeE1URTBDb0xFbk1SUUZBb1ZCZ3BSZ2psOHVWVENZRGdVQTBHdVY1L3RpeFkrbDArdURCZ3pXMmx2ZzMzbmpqeXkrK3dBNldaRW5UTk5NMHkrVXlDN3BNdjJ5VlUxTlQ0K1BqVzdacytmSEhIMi9mdnMzemZLbTB3RHFEaUVOdXQ5czBUWGFDVnl3V1RkUE1ack8yYmR1MlhTZ1VFRUxoY0RpUlNFeE9Ubm84bmxxMkZNSVlQL2Zzc3ovZCtrbFc1S0JoK0h5K1RDWmpXZFpiYjcwVmo4ZFpXVEV3TURBNk9tcFpGanVlc0g2eEZvcEZCMk5DaUtacHNxcXd2cklvaWh6SDJiYTlWRm1DSUt4ZXZicFFLQlNMeFFNSERzVGo4WWZBY2h4bmNHRHdiMGVQaXFLb3FtclBIOWFrVWlsV0V6Tm5qUkR5Ky8wODRrcWxVc1Z5T1k2VEZObmo4VHowcUx3NllPdTZIb2xFRW9sRWYzOS9MQllMaFVJUG1vNElJWVNRUHo3MVZDNlhVeFQxaVpWUGhNUGhWQ3BWS3BWeXVSeDJNQ0FBQ3M0OUcySmE4M2w5a25LM0M2OG9pc2ZqVVpmcmlqTzZjK2VPNHpnSW9YSzU3UFY2bWFrUVFvYUdoam83TzVkMWJJaVp6b2NmZm5qNHI0ZEVVZFIwVDF0Ym04L255K2Z6dG0zUHpTYVdGZzZxUzlXOTNvcHB0N2UzMTJMRkxDMzcrZWVmS2FXUlNFVFRORUxJZSsrOXQyejZlamNOVEtWU2UvZnN2WERoZ3NEem1xWnBtb1lRY3JDVFNxWVdHWW9vaVQ2LzMrUHhHSWJCRkZUNVhWNGQ5L1lOODNBc1JsbVdKVWxTS0JRS0JvT0hEeCtPUnFPTHRIbWZYVEtaZlBQTk4wOTk4ZVZ2bUlza1NiNkFuMWtKaHhCQ3lEVE5aQ3FGWUlraUVBQ2w5M3BOVkZIVlVDZ0VBRUJCOStyNWZKNkZxWEE0N0RqTysrKy9INDFHcTdWNUh4WWhKSmxNdnY3NjYvKzZjSUZEeXlDamxLcXFxdnU4ekd0emdOaTZIZXdzN2UwS2dsRDlHWjduMldwRlVmUjQ5VXE0ZEx2ZFBwOHZHQXdPRGc2R3crSEtsUHV3MkVVNm5lN3I2N3Q0OGFMbWNpL0tldG10cE1pV1pSVUtCWUlKSVdUYlg3WnQzcnk1V2xhRTByTm56b3lkUExsb2JRZ2hsMHNWUlpIOXNVZFZGVVZSRlZVUlJWSFR0TjdlM3IxNzl5NEQ2ejVmUXI3NzdydFhkcjh5TXoyOTZGRjAxU3BDQ1FBY08zWnMzYnAxTERndVNvUllNRmpxelFraEF3TUQ0K1BqQ0dCMlpoWUFLRkN2enljSXd0TlBQMzNpeElscVBnODBWWXd4KzB0V05iMzY2cXNOSDB4VTQyTWhzaklTajhjWGxXNy9CZWRRYjZET2xiNkhBQUFBR1hSRldIUmpiMjF0Wlc1MEFFTnlaV0YwWldRZ2QybDBhQ0JIU1UxUTU2OUF5d0FBQUNWMFJWaDBaR0YwWlRwamNtVmhkR1VBTWpBeE55MHhNQzB4TkZReU1UbzBNam93TXkwd056b3dNTnZpb3FNQUFBQWxkRVZZZEdSaGRHVTZiVzlrYVdaNUFESXdNVGN0TVRBdE1UUlVNakU2TkRJNk1ETXRNRGM2TURDcXZ4b2ZBQUFBQUVsRlRrU3VRbUNDXCIiLCJleHBvcnQgKiBmcm9tIFwiLi4vVGVzdERldmljZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4uL1Rlc3REZXZpY2VNYW5hZ2VyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi4vdXRpbHNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0xvZ1BhbmVsXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsXCI7XG5leHBvcnQgKiBmcm9tIFwiLi91dGlscy53ZWJcIjtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFVQUFBQ0ZDQVlBQUFDVDN6STlBQUFBQm1KTFIwUUEvd0QvQVArZ3ZhZVRBQUFBQ1hCSVdYTUFBQXNUQUFBTEV3RUFtcHdZQUFBQUIzUkpUVVVINFFRZUNoNEFqVnhlNGdBQUFCbDBSVmgwUTI5dGJXVnVkQUJEY21WaGRHVmtJSGRwZEdnZ1IwbE5VRmVCRGhjQUFBQStTVVJCVkVqSFkyUmdZUGpQZ0FWZ0NESmhVOFdFUy9VSTBNNklwcEp4Tk9qSURUb3liUjhWSEJVY01vS2phWDVVY0RUTmoxYVJvNjJMQVdsZEFBQzhFQzJ0QUVCWVhBQUFBQUJKUlU1RXJrSmdnZz09XCIiLCJpbXBvcnQgeyBUZXN0RGV2aWNlTWFuYWdlclBhbmVsIH0gZnJvbSBcIi4vVGVzdERldmljZU1hbmFnZXJQYW5lbFwiO1xuaW1wb3J0IHsgTG9nUGFuZWwgfSBmcm9tIFwiLi9Mb2dQYW5lbFwiO1xuaW1wb3J0IHsgQnV0dHBsdWdTZXJ2ZXIgfSBmcm9tIFwiLi4vLi4vaW5kZXhcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIENyZWF0ZUxvZ2dlclBhbmVsKCkge1xuICBMb2dQYW5lbC5TaG93TG9nUGFuZWwoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENyZWF0ZURldmljZU1hbmFnZXJQYW5lbChidXR0cGx1Z1NlcnZlcjogQnV0dHBsdWdTZXJ2ZXIpIHtcbiAgVGVzdERldmljZU1hbmFnZXJQYW5lbC5TaG93VGVzdERldmljZU1hbmFnZXJQYW5lbChidXR0cGx1Z1NlcnZlcik7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9