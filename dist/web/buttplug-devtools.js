(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["buttplug-devtools-commonjs"] = factory();
	else
		root["ButtplugDevTools"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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

	yoyo: function yoyo(yoyo) {

		this._yoyo = yoyo;
		return this;

	},

	easing: function easing(easing) {

		this._easingFunction = easing;
		return this;

	},

	interpolation: function interpolation(interpolation) {

		this._interpolationFunction = interpolation;
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
		elapsed = elapsed > 1 ? 1 : elapsed;

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

	} else if (typeof module !== 'undefined' && typeof exports === 'object') {

		// Node.js
		module.exports = TWEEN;

	} else if (root !== undefined) {

		// Global variable
		root.TWEEN = TWEEN;

	}

})(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/jspanel4/dist/jspanel.css":
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__("./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* jspanel.sass: 2017-12-13 15:34 */\n/* http://stackoverflow.com/questions/30421570/sass-unicode-escape-is-not-preserved-in-css-file */\n@font-face {\n  font-family: 'jsglyph';\n  src: url(" + escape(__webpack_require__("./node_modules/jspanel4/dist/fonts/jsglyph.eot")) + ");\n  src: url(" + escape(__webpack_require__("./node_modules/jspanel4/dist/fonts/jsglyph.eot")) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__("./node_modules/jspanel4/dist/fonts/jsglyph.ttf")) + ") format(\"truetype\"), url(" + escape(__webpack_require__("./node_modules/jspanel4/dist/fonts/jsglyph.woff")) + ") format(\"woff\"), url(" + escape(__webpack_require__("./node_modules/jspanel4/dist/fonts/jsglyph.svg")) + "#jsglyph) format(\"svg\"); }\n\n.jsglyph {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'jsglyph' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n.jsglyph-chevron-down::before {\n  content: \"\\E900\"; }\n\n.jsglyph-chevron-up::before {\n  content: \"\\E901\"; }\n\n.jsglyph-close::before {\n  content: \"\\E902\"; }\n\n.jsglyph-maximize::before {\n  content: \"\\E903\"; }\n\n.jsglyph-minimize::before {\n  content: \"\\E904\"; }\n\n.jsglyph-normalize::before {\n  content: \"\\E905\"; }\n\n.jsPanel {\n  border: 0;\n  box-sizing: border-box;\n  vertical-align: baseline;\n  font-family: \"Open Sans\",\"Helvetica Neue\",Helvetica,Arial,sans-serif;\n  font-weight: normal;\n  opacity: 0;\n  overflow: visible;\n  position: absolute;\n  top: 0;\n  border-radius: 3px;\n  z-index: 100; }\n  .jsPanel .jsPanel-hdr {\n    border: 0;\n    box-sizing: border-box;\n    vertical-align: baseline;\n    font-family: \"Open Sans\",\"Helvetica Neue\",Helvetica,Arial,sans-serif;\n    font-weight: normal;\n    border-top-left-radius: 3px;\n    border-top-right-radius: 3px;\n    font-size: 18px;\n    display: flex;\n    flex-direction: column;\n    overflow: hidden; }\n  .jsPanel .jsPanel-content {\n    border: 0;\n    box-sizing: border-box;\n    vertical-align: baseline;\n    font-family: \"Open Sans\",\"Helvetica Neue\",Helvetica,Arial,sans-serif;\n    font-weight: normal;\n    background: #ffffff;\n    color: #000000;\n    font-size: 12px;\n    position: relative;\n    overflow: hidden; }\n    .jsPanel .jsPanel-content pre {\n      color: inherit; }\n  .jsPanel .jsPanel-ftr {\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-pack: end;\n    justify-content: flex-end;\n    -ms-flex-wrap: nowrap;\n    flex-wrap: nowrap;\n    -ms-flex-align: center;\n    align-items: center;\n    border-bottom-left-radius: 3px;\n    border-bottom-right-radius: 3px;\n    border-top: 1px solid #e0e0e0;\n    cursor: move;\n    display: none;\n    box-sizing: border-box;\n    font-size: 12px;\n    height: auto;\n    background: #f5f5f5;\n    font-weight: normal;\n    color: black;\n    overflow: hidden; }\n  .jsPanel .jsPanel-ftr.active {\n    display: -ms-flexbox;\n    display: flex; }\n    .jsPanel .jsPanel-ftr.active > * {\n      margin: 8px; }\n  .jsPanel .jsPanel-ftr.panel-footer {\n    padding: 0; }\n\n.jsPanel-headerbar, .jsPanel-hdr-toolbar {\n  font-size: 18px; }\n\n.jsPanel-headerbar {\n  box-sizing: border-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-wrap: nowrap;\n  flex-wrap: nowrap;\n  -ms-flex-align: center;\n  align-items: center;\n  min-height: 38px; }\n  .jsPanel-headerbar img {\n    vertical-align: middle;\n    max-height: 38px; }\n\n.jsPanel-titlebar {\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n  cursor: move;\n  min-height: 32px;\n  overflow: hidden; }\n  .jsPanel-titlebar h3 {\n    color: #000000;\n    font-family: \"Open Sans\",\"Helvetica Neue\",Helvetica,Arial,sans-serif;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-size: 16px;\n    font-variant: small-caps;\n    font-weight: normal;\n    margin: 10px 5px 10px 8px; }\n    .jsPanel-titlebar h3 small {\n      font-size: 75%;\n      color: inherit; }\n\n.jsPanel-titlebar.jsPanel-rtl h3 {\n  flex: 1 0 auto; }\n\n.jsPanel-controlbar {\n  display: -ms-flexbox;\n  display: flex;\n  align-items: center;\n  touch-action: none; }\n  .jsPanel-controlbar div span:hover, .jsPanel-controlbar div svg:hover {\n    opacity: .6; }\n  .jsPanel-controlbar .jsPanel-btn {\n    padding: 0 3px;\n    cursor: pointer;\n    touch-action: none; }\n    .jsPanel-controlbar .jsPanel-btn span {\n      vertical-align: middle; }\n    .jsPanel-controlbar .jsPanel-btn span.glyphicon {\n      padding: 0 2px; }\n    .jsPanel-controlbar .jsPanel-btn span.fa, .jsPanel-controlbar .jsPanel-btn span.far, .jsPanel-controlbar .jsPanel-btn span.fal {\n      padding: 0 4px 0 3px; }\n    .jsPanel-controlbar .jsPanel-btn svg {\n      margin: 0 4px 0 2px; }\n  .jsPanel-controlbar .jsPanel-btn-normalize {\n    display: none; }\n  .jsPanel-controlbar .jsPanel-btn-smallifyrev {\n    display: none; }\n\n.jsPanel-hdr-toolbar {\n  display: none;\n  width: auto;\n  height: auto;\n  font-size: 16px; }\n\n.jsPanel-hdr-toolbar.active {\n  box-sizing: border-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-wrap: nowrap;\n  flex-wrap: nowrap;\n  -ms-flex-align: center;\n  align-items: center; }\n  .jsPanel-hdr-toolbar.active > * {\n    margin: 6px 8px; }\n\n/* styles for panels using option.rtl */\n.jsPanel-headerbar.jsPanel-rtl, .jsPanel-controlbar.jsPanel-rtl, .jsPanel-hdr-toolbar.jsPanel-rtl {\n  -ms-flex-direction: row-reverse;\n  flex-direction: row-reverse; }\n\n.jsPanel-hdr-toolbar.active.jsPanel-rtl {\n  padding: 7px 0 10px 0; }\n\n.jsPanel-ftr.jsPanel-rtl {\n  -ms-flex-direction: row;\n  flex-direction: row; }\n\n/* container that takes the minified jsPanels */\n#jsPanel-replacement-container, .jsPanel-minimized-box {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: row wrap-reverse;\n  flex-flow: row wrap-reverse;\n  background: transparent none repeat scroll 0 0;\n  bottom: 0;\n  height: auto;\n  left: 0;\n  position: fixed;\n  width: auto;\n  z-index: 9998; }\n  #jsPanel-replacement-container .jsPanel-replacement, .jsPanel-minimized-box .jsPanel-replacement {\n    width: 200px;\n    height: 40px;\n    margin: 1px 1px 0 0;\n    z-index: 9999; }\n    #jsPanel-replacement-container .jsPanel-replacement .jsPanel-hdr, .jsPanel-minimized-box .jsPanel-replacement .jsPanel-hdr {\n      padding: 0; }\n      #jsPanel-replacement-container .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo, .jsPanel-minimized-box .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo {\n        max-width: 50%;\n        overflow: hidden; }\n        #jsPanel-replacement-container .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo img, .jsPanel-minimized-box .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo img {\n          max-width: 100px;\n          max-height: 38px; }\n    #jsPanel-replacement-container .jsPanel-replacement .jsPanel-titlebar, .jsPanel-minimized-box .jsPanel-replacement .jsPanel-titlebar {\n      -ms-flex: 1 1 60%;\n      flex: 1 1 0;\n      cursor: default; }\n    #jsPanel-replacement-container .jsPanel-replacement .jsPanel-btn.jsPanel-btn-normalize, .jsPanel-minimized-box .jsPanel-replacement .jsPanel-btn.jsPanel-btn-normalize {\n      display: block; }\n\n.jsPanel-minimized-box {\n  position: absolute;\n  width: auto; }\n\n/* helper classes to make .jsPanel-content a flex box */\n.flexOne {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: row wrap;\n  flex-flow: row wrap; }\n\n/* css for resizeit handles ------------------------- */\n.jsPanel-resizeit-handle {\n  display: block;\n  font-size: 0.1px;\n  position: absolute;\n  touch-action: none; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-n {\n  cursor: n-resize;\n  height: 12px;\n  left: 9px;\n  top: -5px;\n  width: calc(100% - 18px); }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-e {\n  cursor: e-resize;\n  height: calc(100% - 18px);\n  right: -9px;\n  top: 9px;\n  width: 12px; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-s {\n  bottom: -9px;\n  cursor: s-resize;\n  height: 12px;\n  left: 9px;\n  width: calc(100% - 18px); }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-w {\n  cursor: w-resize;\n  height: calc(100% - 18px);\n  left: -9px;\n  top: 9px;\n  width: 12px; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-ne {\n  cursor: ne-resize;\n  height: 18px;\n  right: -9px;\n  top: -9px;\n  width: 18px; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-se {\n  bottom: -9px;\n  cursor: se-resize;\n  height: 18px;\n  right: -9px;\n  width: 18px; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-sw {\n  bottom: -9px;\n  cursor: sw-resize;\n  height: 18px;\n  left: -9px;\n  width: 18px; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-nw {\n  cursor: nw-resize;\n  height: 18px;\n  left: -9px;\n  top: -9px;\n  width: 18px; }\n\n.jsPanel-drag-overlay {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0; }\n\n/* box-shadows --------------------------------------------------------------------- */\n.jsPanel-depth-1 {\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); }\n\n.jsPanel-depth-2 {\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23); }\n\n.jsPanel-depth-3 {\n  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22); }\n\n.jsPanel-depth-4 {\n  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22); }\n\n.jsPanel-depth-5 {\n  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.3), 0 20px 14px rgba(0, 0, 0, 0.22); }\n\n/* snap sensitive areas ------------------------------------------------------------------------------ */\n.jsPanel-snap-area {\n  position: fixed;\n  background: black;\n  opacity: .2;\n  border: 1px solid silver;\n  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.5), 0 10px 10px rgba(0, 0, 0, 0.5);\n  z-index: 9999; }\n\n.jsPanel-snap-area-lt, .jsPanel-snap-area-lc, .jsPanel-snap-area-lb {\n  left: 0; }\n\n.jsPanel-snap-area-ct, .jsPanel-snap-area-cb {\n  left: 37.5%; }\n\n.jsPanel-snap-area-rt, .jsPanel-snap-area-rc, .jsPanel-snap-area-rb {\n  right: 0; }\n\n.jsPanel-snap-area-lt, .jsPanel-snap-area-ct, .jsPanel-snap-area-rt {\n  top: 0; }\n\n.jsPanel-snap-area-lc, .jsPanel-snap-area-rc {\n  top: 37.5%; }\n\n.jsPanel-snap-area-lb, .jsPanel-snap-area-cb, .jsPanel-snap-area-rb {\n  bottom: 0; }\n\n.jsPanel-snap-area-ct, .jsPanel-snap-area-cb {\n  width: 25%; }\n\n.jsPanel-snap-area-lc, .jsPanel-snap-area-rc {\n  height: 25%; }\n\n.jsPanel-snap-area-lt {\n  border-bottom-right-radius: 100%; }\n\n.jsPanel-snap-area-rt {\n  border-bottom-left-radius: 100%; }\n\n.jsPanel-snap-area-rb {\n  border-top-left-radius: 100%; }\n\n.jsPanel-snap-area-lb {\n  border-top-right-radius: 100%; }\n\n/* bootstrap adjustments */\n.jsPanel.panel-default, .jsPanel.panel-primary, .jsPanel.panel-info, .jsPanel.panel-success, .jsPanel.panel-warning, .jsPanel.panel-danger, .jsPanel.card.card-inverse {\n  box-shadow: 0 0 6px rgba(0, 33, 50, 0.1), 0 7px 25px rgba(17, 38, 60, 0.4); }\n\n.jsPanel.panel {\n  margin: 0; }\n\n.jsPanel-hdr.panel-heading {\n  border-bottom: none;\n  padding: 0; }\n\n.jsPanel-title.panel-title .small, .jsPanel-title.panel-title small {\n  font-size: 75%; }\n\n/* bootstrap 4 adjustments */\n.jsPanel.card.card-inverse {\n  box-shadow: 0 0 6px rgba(0, 33, 50, 0.1), 0 7px 25px rgba(17, 38, 60, 0.4); }\n\n.card-default {\n  background: #f5f5f5; }\n\n.card-primary > .jsPanel-content.jsPanel-content-filled,\n.card-success > .jsPanel-content.jsPanel-content-filled,\n.card-info > .jsPanel-content.jsPanel-content-filled,\n.card-warning > .jsPanel-content.jsPanel-content-filled,\n.card-danger > .jsPanel-content.jsPanel-content-filled {\n  background: transparent;\n  color: #f5f5f5; }\n\n.card-default > .jsPanel-content.jsPanel-content-filled {\n  background: transparent;\n  color: #000000; }\n\n/* css3 animations */\n@keyframes jsPanelFadeIn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.jsPanelFadeIn {\n  opacity: 0;\n  animation: jsPanelFadeIn ease-in 1;\n  animation-fill-mode: forwards;\n  animation-duration: 600ms; }\n\n@keyframes jsPanelFadeOut {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0; } }\n\n.jsPanelFadeOut {\n  animation: jsPanelFadeOut ease-in 1;\n  animation-fill-mode: forwards;\n  animation-duration: 600ms; }\n\n@keyframes modalBackdropFadeIn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 0.65; } }\n\n.jsPanel-modal-backdrop {\n  animation: modalBackdropFadeIn ease-in 1;\n  animation-fill-mode: forwards;\n  animation-duration: 750ms;\n  background: black;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%; }\n\n@keyframes modalBackdropFadeOut {\n  from {\n    opacity: 0.65; }\n  to {\n    opacity: 0; } }\n\n.jsPanel-modal-backdrop-out {\n  animation: modalBackdropFadeOut ease-in 1;\n  animation-fill-mode: forwards;\n  animation-duration: 400ms; }\n\n.jsPanel-modal-backdrop-multi {\n  background: rgba(0, 0, 0, 0.15); }\n\n/* _themes_mdl.sass: 2017-07-12 19:16 */\n/* default ---------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-default {\n  background-color: #cfd8dc;\n  border-color: #cfd8dc; }\n\n.jsPanel-theme-default > .jsPanel-hdr * {\n  color: #000000; }\n\n.jsPanel-theme-default > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #90a4ae; }\n\n.jsPanel-theme-default > .jsPanel-content {\n  border-top: 1px solid #90a4ae; }\n\n.jsPanel-theme-default > .jsPanel-content.jsPanel-content-filled {\n  background-color: #cfd8dc;\n  border-top: 1px solid #90a4ae; }\n\n.jsPanel-theme-default > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #eceff1; }\n\n/* primary ---------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-primary {\n  background-color: #2196f3;\n  border-color: #2196f3; }\n\n.jsPanel-theme-primary > .jsPanel-hdr * {\n  color: #ffffff; }\n\n.jsPanel-theme-primary > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #42a5f5; }\n\n.jsPanel-theme-primary > .jsPanel-content {\n  border-top: 1px solid #42a5f5; }\n\n.jsPanel-theme-primary > .jsPanel-content.jsPanel-content-filled {\n  background-color: #2196f3;\n  border-top: 1px solid #42a5f5;\n  color: #ffffff; }\n\n.jsPanel-theme-primary > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #bbdefb;\n  color: #000000; }\n\n/* info ------------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-info {\n  background-color: #29b6f6;\n  border-color: #29b6f6; }\n\n.jsPanel-theme-info > .jsPanel-hdr * {\n  color: #ffffff; }\n\n.jsPanel-theme-info > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #4fc3f7; }\n\n.jsPanel-theme-info > .jsPanel-content {\n  border-top: 1px solid #4fc3f7; }\n\n.jsPanel-theme-info > .jsPanel-content.jsPanel-content-filled {\n  background-color: #29b6f6;\n  border-top: 1px solid #4fc3f7;\n  color: #ffffff; }\n\n.jsPanel-theme-info > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #e1f5fe;\n  color: #000000; }\n\n/* success ---------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-success {\n  background-color: #4caf50;\n  border-color: #4caf50; }\n\n.jsPanel-theme-success > .jsPanel-hdr * {\n  color: #ffffff; }\n\n.jsPanel-theme-success > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #81c784; }\n\n.jsPanel-theme-success > .jsPanel-content.jsPanel-content-filled {\n  background-color: #4caf50;\n  border-top: 1px solid #81c784;\n  color: #ffffff; }\n\n.jsPanel-theme-success > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #e8f5e9;\n  color: #000000; }\n\n/* warning ---------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-warning {\n  background-color: #ffc107;\n  border-color: #ffc107; }\n\n.jsPanel-theme-warning > .jsPanel-hdr * {\n  color: #000000; }\n\n.jsPanel-theme-warning > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #ffd54f; }\n\n.jsPanel-theme-warning > .jsPanel-content.jsPanel-content-filled {\n  background-color: #ffc107;\n  border-top: 1px solid #ffd54f;\n  color: #000000; }\n\n.jsPanel-theme-warning > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #fff3e0;\n  color: #000000; }\n\n/* danger ----------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-danger {\n  background-color: #ff3d00;\n  border-color: #ff3d00; }\n\n.jsPanel-theme-danger > .jsPanel-hdr * {\n  color: #ffffff; }\n\n.jsPanel-theme-danger > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #ff6e40; }\n\n.jsPanel-theme-danger > .jsPanel-content.jsPanel-content-filled {\n  background-color: #ff3d00;\n  border-top: 1px solid #ff6e40;\n  color: #ffffff; }\n\n.jsPanel-theme-danger > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #ff9e80;\n  color: #000000; }\n\n.jsPanel-content.jsPanel-content-noheader {\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n  border: none !important; }\n\n.jsPanel-content.jsPanel-content-nofooter {\n  border-bottom-left-radius: 3px;\n  border-bottom-right-radius: 3px; }\n\nbody {\n  -ms-overflow-style: scrollbar; }\n", ""]);

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

/***/ "./node_modules/css-loader/lib/url/escape.js":
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
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

/***/ "./node_modules/jspanel4/dist/fonts/jsglyph.eot":
/***/ (function(module, exports) {

module.exports = "data:application/vnd.ms-fontobject;base64,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"

/***/ }),

/***/ "./node_modules/jspanel4/dist/fonts/jsglyph.svg":
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiID4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8bWV0YWRhdGE+Cjxqc29uPgo8IVtDREFUQVsKewoJImZvbnRGYW1pbHkiOiAianNnbHlwaCIsCgkibWFqb3JWZXJzaW9uIjogMSwKCSJtaW5vclZlcnNpb24iOiAwLAoJImRlc2lnbmVyIjogIlN0ZWZhbiBTdHLDpMOfZXIiLAoJImRlc2lnbmVyVVJMIjogImh0dHA6Ly9zdGVmYW5zdHJhZXNzZXIuZXUvIiwKCSJsaWNlbnNlIjogIk1JVCIsCgkiY29weXJpZ2h0IjogIjIwMTUgU3RlZmFuIFN0csOkw59lciIsCgkidmVyc2lvbiI6ICJWZXJzaW9uIDEuMCIsCgkiZm9udElkIjogImpzZ2x5cGgiLAoJInBzTmFtZSI6ICJqc2dseXBoIiwKCSJzdWJGYW1pbHkiOiAiUmVndWxhciIsCgkiZnVsbE5hbWUiOiAianNnbHlwaCIsCgkiZGVzY3JpcHRpb24iOiAiRm9udCBnZW5lcmF0ZWQgYnkgSWNvTW9vbi4iCn0KXV0+CjwvanNvbj4KPC9tZXRhZGF0YT4KPGRlZnM+Cjxmb250IGlkPSJqc2dseXBoIiBob3Jpei1hZHYteD0iMTAyNCI+Cjxmb250LWZhY2UgdW5pdHMtcGVyLWVtPSIxMDI0IiBhc2NlbnQ9Ijk2MCIgZGVzY2VudD0iLTY0IiAvPgo8bWlzc2luZy1nbHlwaCBob3Jpei1hZHYteD0iMTAyNCIgLz4KPGdseXBoIHVuaWNvZGU9IiYjeDIwOyIgaG9yaXotYWR2LXg9IjUxMiIgZD0iIiAvPgo8Z2x5cGggdW5pY29kZT0iJiN4ZTkwMDsiIGdseXBoLW5hbWU9ImNoZXZyb24tZG93biIgZGF0YS10YWdzPSJjaGV2cm9uLWRvd24iIGhvcml6LWFkdi14PSIxMzE3IiBkPSJNMTE2My42NjYgNTgzLjg0NWMtMTQuNDI3IDI2LjY0Mi00Ny43MjYgMzYuNTUzLTc0LjM1IDIyLjEwNy0xNzcuNDI2LTk2LjExLTM3Ny43NDYtMjAyLjI3Ny00MzMuNDgxLTIyOC4wNzgtNTYuMjEgMjIuODc1LTI1My41MTMgMTI5LjE1Mi00MjcuNzAzIDIyNy42MDItMjYuMzUgMTQuOTAzLTU5Ljg0OSA1LjYxNC03NC43NTItMjAuNzczcy01LjYxNC01OS44MzEgMjAuNzczLTc0Ljc1MmM0MzMuMTM0LTI0NC44MDkgNDY4Ljg4Mi0yNDQuODA5IDQ4NC4xMzMtMjQ0LjgwOSAxNi41NDkgMCAzMi4yMDEgMCA0ODMuMjczIDI0NC4zMzQgMjYuNjQyIDE0LjQyNyAzNi41MzUgNDcuNzI2IDIyLjEwNyA3NC4zNjh6IiAvPgo8Z2x5cGggdW5pY29kZT0iJiN4ZTkwMTsiIGdseXBoLW5hbWU9ImNoZXZyb24tdXAiIGRhdGEtdGFncz0iY2hldnJvbi11cCIgaG9yaXotYWR2LXg9IjEzMTciIGQ9Ik0xMTYzLjY2NiAyOTMuODdjLTE0LjQyNy0yNi42MjQtNDcuNzI2LTM2LjU1My03NC4zNS0yMi4xMDctMTc3LjQyNiA5Ni4xMS0zNzcuNzI4IDIwMi4yNzctNDMzLjQ2MyAyMjguMDc4LTU2LjIxLTIyLjg3NS0yNTMuNTEzLTEyOS4xNTItNDI3LjcwMy0yMjcuNTg0LTI2LjM1LTE0LjkyMS01OS44NDktNS42MTQtNzQuNzUyIDIwLjc1NC0xNC45MDMgMjYuMzg2LTUuNjE0IDU5Ljg0OSAyMC43NzMgNzQuNzUyIDQzMy4xMTUgMjQ0LjgwOSA0NjguODY0IDI0NC44MDkgNDg0LjExNCAyNDQuODA5IDE2LjU0OSAwIDMyLjIwMSAwIDQ4My4yNTUtMjQ0LjMzNCAyNi42NjEtMTQuNDI3IDM2LjU1My00Ny43NDQgMjIuMTI2LTc0LjM2OHoiIC8+CjxnbHlwaCB1bmljb2RlPSImI3hlOTAyOyIgZ2x5cGgtbmFtZT0iY2xvc2UiIGRhdGEtdGFncz0iY2xvc2UiIGhvcml6LWFkdi14PSIxMzE3IiBkPSJNNzIxLjQ4MSA0NDEuODE5bDMyNC4wOTYgMzI0LjA3OGMxOS45ODYgMjAuMDA1IDE5Ljk4NiA1Mi4zNyAwIDcyLjM1N3MtNTIuMzUyIDE5Ljk4Ni03Mi4zMzggMGwtMzI0LjA5Ni0zMjQuMDk2LTMyNC4wOTYgMzI0LjA5NmMtMTkuOTg2IDIwLjAwNS01Mi4zODkgMjAuMDA1LTcyLjM1NyAwLTE5Ljk4Ni0xOS45NjgtMTkuOTg2LTUyLjM1MiAwLTcyLjMzOGwzMjQuMDk2LTMyNC4wOTYtMzExLjcxNy0zMTEuNzM1Yy0xOS45ODYtMTkuOTY4LTE5Ljk4Ni01Mi4zODkgMC03Mi4zNTcgOS45ODQtMTAuMDAyIDIzLjA3Ny0xNC45NzYgMzYuMTY5LTE0Ljk3NiAxMy4wNzQgMCAyNi4xODUgNC45NzQgMzYuMTY5IDE0Ljk3NmwzMTEuNzM1IDMxMS43NTMgMzExLjczNS0zMTEuNzUzYzEwLjAwMi0xMC4wMDIgMjMuMDc3LTE0Ljk3NiAzNi4xODctMTQuOTc2czI2LjE2NyA0Ljk3NCAzNi4xODcgMTQuOTc2YzE5Ljk2OCAxOS45NjggMTkuOTY4IDUyLjM4OSAwIDcyLjM1N2wtMzExLjc3MSAzMTEuNzM1eiIgLz4KPGdseXBoIHVuaWNvZGU9IiYjeGU5MDM7IiBnbHlwaC1uYW1lPSJtYXhpbWl6ZSIgZGF0YS10YWdzPSJtYXhpbWl6ZSIgaG9yaXotYWR2LXg9IjEzMTciIGQ9Ik05ODMuOTU0IDg4Ni44NTdoLTY1MS4zMzdjLTYyLjQwOSAwLTExMy4xODktNDkuOTc1LTExMy4xODktMTExLjQxNXYtNjU0Ljg4NWMwLTYxLjQ0IDUwLjc3OS0xMTEuNDE1IDExMy4xODktMTExLjQxNWg2NTEuMzM3YzYyLjQwOSAwIDExMy4xODkgNDkuOTc1IDExMy4xODkgMTExLjQxNXY2NTQuODg1YzAgNjEuNDQtNTAuNzc5IDExMS40MTUtMTEzLjE4OSAxMTEuNDE1ek05ODMuOTU0IDgyLjI4NmgtNjUxLjMzN2MtMjIuMDg5IDAtNDAuMDQ2IDE3LjE1Mi00MC4wNDYgMzguMjcydjYwMS43MjhoNzMxLjQyOXYtNjAxLjcyOGMwLTIxLjEyLTE3Ljk1Ny0zOC4yNzItNDAuMDQ2LTM4LjI3MnoiIC8+CjxnbHlwaCB1bmljb2RlPSImI3hlOTA0OyIgZ2x5cGgtbmFtZT0ibWluaW1pemUiIGRhdGEtdGFncz0ibWluaW1pemUiIGhvcml6LWFkdi14PSIxMzE3IiBkPSJNOTc4LjI0OSAyMjguNTcxaC02MzkuOTgyYy02MS4xMTEgMC0xMTguODM5IDAtMTE4LjgzOS05NC43NTd2LTI5LjkzNGMwLTk0LjczOCA1Ny43MjgtOTQuNzM4IDExOC44MzktOTQuNzM4aDYzOS45ODJjNjEuMTQ3IDAgMTE4Ljg5NCAwIDExOC44OTQgOTQuNzU3djI5LjkzNGMwIDk0LjczOC01Ny43NDYgOTQuNzM4LTExOC44OTQgOTQuNzM4eiIgLz4KPGdseXBoIHVuaWNvZGU9IiYjeGU5MDU7IiBnbHlwaC1uYW1lPSJub3JtYWxpemUiIGRhdGEtdGFncz0ibm9ybWFsaXplIiBob3Jpei1hZHYteD0iMTMxNyIgZD0iTTg1MC45OTkgNjMwLjg1N2gtNTM4LjA3NWMtNTEuNTI5IDAtOTMuNDk1LTUzLjkyNS05My40OTUtOTYuMDU1di00NDkuMjQzYzAtNDIuMTMgNDEuOTY2LTc2LjQxNiA5My40OTUtNzYuNDE2aDUzOC4wNzVjNTEuNTI5IDAgOTkuODU4IDM0LjI4NiA5OS44NTggNzYuNDE2djQ0OS4yNDNjMCA0Mi4xMy00OC4zMjkgOTYuMDU1LTk5Ljg1OCA5Ni4wNTV6TTg5NiA4NS41NTljMC0xNC40ODItMjYuNzctMzkuODQ1LTQ1LjAwMS0zOS44NDVoLTUzOC4wNzVjLTE4LjIzMSAwLTM4LjYzOCAyNS4zNjItMzguNjM4IDM5Ljg0NXY0MzUuNTg0aDYyMS43MTR2LTQzNS41ODR6TTEwMDMuNjQ4IDgzMmgtNTM4LjA3NWMtNTEuNTI5IDAtOTkuODU4LTM0LjI4Ni05OS44NTgtNzYuNDE2di04OC4xNTVoNTQuODU3djU0Ljg1N2g2MjEuNzE0di00MTUuOTQ1YzAtMTQuNDgyLTIwLjQwNy01OS40ODMtMzguNjM4LTU5LjQ4M2gtMTYuMjE5di0zNi41NzFoMTYuMjE5YzUxLjUyOSAwIDkzLjQ5NSA1My45MjUgOTMuNDk1IDk2LjA1NXY0NDkuMjQzYzAgNDIuMTMtNDEuOTY2IDc2LjQxNi05My40OTUgNzYuNDE2eiIgLz4KPC9mb250PjwvZGVmcz48L3N2Zz4="

/***/ }),

/***/ "./node_modules/jspanel4/dist/fonts/jsglyph.ttf":
/***/ (function(module, exports) {

module.exports = "data:font/ttf;base64,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"

/***/ }),

/***/ "./node_modules/jspanel4/dist/fonts/jsglyph.woff":
/***/ (function(module, exports) {

module.exports = "data:font/woff;base64,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"

/***/ }),

/***/ "./node_modules/jspanel4/dist/jspanel.css":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/jspanel4/dist/jspanel.css");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../css-loader/index.js!./jspanel.css", function() {
			var newContent = require("!!../../css-loader/index.js!./jspanel.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

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

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

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

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
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
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
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
    constructor(name, shouldVibrate = false, shouldLinear = false) {
        super(`Test Device - ${name}`);
        this._connected = false;
        this._linearSpeed = 0;
        this._linearPosition = 0;
        this._vibrateSpeed = 0;
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
                VibrateCmd: { FeatureCount: 1 },
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
        return {};
    }
    Disconnect() {
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
class TestDeviceManager extends events_1.EventEmitter {
    constructor() {
        super();
        this._isScanning = false;
        this._testVibrationDevice = new TestDevice_1.TestDevice("Test Vibration Device", true, false);
        this._testLinearDevice = new TestDevice_1.TestDevice("Test Linear Device", false, true);
    }
    static Get() {
        if (!TestDeviceManager._testManager) {
            TestDeviceManager._testManager = new TestDeviceManager();
        }
        return TestDeviceManager._testManager;
    }
    ConnectVibrationDevice() {
        this._testVibrationDevice.Connected = true;
        this.emit("deviceadded", this._testVibrationDevice);
    }
    ConnectLinearDevice() {
        this._testLinearDevice.Connected = true;
        this.emit("deviceadded", this._testLinearDevice);
    }
    StartScanning() {
        this._isScanning = true;
        if (!this._testVibrationDevice.Connected) {
            setTimeout(() => this.ConnectVibrationDevice(), 50);
        }
        if (!this._testLinearDevice.Connected) {
            setTimeout(() => this.ConnectLinearDevice(), 50);
        }
        setTimeout(() => this.StopScanning(), 100);
    }
    get VibrationDevice() {
        return this._testVibrationDevice;
    }
    get LinearDevice() {
        return this._testLinearDevice;
    }
    StopScanning() {
        this._isScanning = false;
        this.emit("scanningfinished");
    }
    get IsScanning() {
        return this._isScanning;
    }
}
TestDeviceManager._testManager = null;
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
        server.AddDeviceManager(TestDeviceManager_1.TestDeviceManager.Get());
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

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./src/devtools/web/LogPanel.css");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./LogPanel.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./LogPanel.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

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
const jsPanel = __webpack_require__("./src/devtools/web/jspanel.js");
__webpack_require__("./node_modules/jspanel4/dist/jspanel.css");
__webpack_require__("./node_modules/jspanel4/dist/fonts/jsglyph.eot");
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

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./src/devtools/web/TestDeviceManagerPanel.css");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./TestDeviceManagerPanel.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./TestDeviceManagerPanel.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/devtools/web/TestDeviceManagerPanel.html":
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<main>\n  <input id=\"tab1\" type=\"radio\" name=\"tabs\" checked>\n  <label for=\"tab1\">Test Devices</label>\n  <section id=\"content1\">\n    <div id=\"simulator\">\n      <div class=\"vibrator-simulator-component\">\n        <div class=\"vibrator\">\n          <img src=\"" + __webpack_require__("./src/devtools/web/hush.png") + "\"\n               id=\"vibrator-image\">\n        </div>\n        <div id=\"vibrator-info\">\n          <b>Vibration Speed:</b> <span id=\"vibrationspeed\">0</span><br/>\n          <button id=\"vibratedisconnect\">Disconnect</button>\n        </div>\n      </div>\n      <div class=\"simulator-divider\"></div>\n      <div class=\"fleshlight-sim\">\n        <div class=\"c-fleshlight\">\n          <div>\n            <img src=\"" + __webpack_require__("./src/devtools/web/ruler.png") + "\">\n          </div>\n          <div>\n            <img src=\"" + __webpack_require__("./src/devtools/web/fleshlight.png") + "\"\n                 class=\"o-fleshlight\"\n                 id=\"fleshlight-image\">\n          </div>\n        </div>\n        <div>\n          <b>Speed:</b> <span id=\"linearspeed\">0</span><br/>\n          <b>Position:</b> <span id=\"linearposition\">0</span><br/>\n          <button id=\"lineardisconnect\">Disconnect</button>\n        </div>\n      </div>\n    </div>\n  </section>\n</main>\n";

/***/ }),

/***/ "./src/devtools/web/TestDeviceManagerPanel.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TestDeviceManager_1 = __webpack_require__("./src/devtools/TestDeviceManager.ts");
const TWEEN = __webpack_require__("./node_modules/@tweenjs/tween.js/src/Tween.js");
const jsPanel = __webpack_require__("./src/devtools/web/jspanel.js");
__webpack_require__("./node_modules/jspanel4/dist/jspanel.css");
__webpack_require__("./node_modules/jspanel4/dist/fonts/jsglyph.eot");
const testPanelHTML = __webpack_require__("./src/devtools/web/TestDeviceManagerPanel.html").toString();
__webpack_require__("./src/devtools/web/TestDeviceManagerPanel.css");
class TestDeviceManagerPanel {
    constructor() {
        this._testManager = TestDeviceManager_1.TestDeviceManager.Get();
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
    static ShowTestDeviceManagerPanel() {
        jsPanel.jsPanel.create({
            theme: "primary",
            headerTitle: "Test Device Manager",
            position: "center-top 0 80",
            contentSize: "400 250",
            callback() {
                this.content.innerHTML = testPanelHTML;
                TestDeviceManagerPanel._panel = new TestDeviceManagerPanel();
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

/***/ "./src/devtools/web/jspanel.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsPanel", function() { return jsPanel; });
// We have to bring in our own jspanel instance because the one in the module
// doesn't include an export statement.

/* jspanel.js - License MIT, copyright 2013 - 2018 Stefan Straesser <info@jspanel.de> (http://jspanel.de) */
/* global jsPanel, $ */

// .append() polyfill needed for EDGE - https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function (arr) {
    arr.forEach(function (item) {
        item.append = item.append || function () {
            var argArr = Array.prototype.slice.call(arguments),
                docFrag = document.createDocumentFragment();
            argArr.forEach(function (argItem) {
                var isNode = argItem instanceof Node;
                docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
            });
            this.appendChild(docFrag);
        };
    });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);
// Element.closest() polyfill needed for EDGE - https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i = void 0,
            el = this;
        do {
            i = matches.length;
            while (--i >= 0 && matches.item(i) !== el) {};
        } while (i < 0 && (el = el.parentElement));
        return el;
    };
}
// NodeList.prototype.forEach() polyfill needed for IE11 and Android mobile - https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}
// Object.assign Polyfill needed for mobiles - https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function value(target) {
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert first argument to object');
            }
            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) {
                    continue;
                }
                nextSource = Object(nextSource);
                var keysArray = Object.keys(Object(nextSource));
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
    });
}

// Polyfills for IE11 only
// CustomEvent - https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
(function () {
    if (typeof window.CustomEvent === "function") return false;
    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
})();
// String.prototype.endsWith() - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (searchStr, Position) {
        // This works much better than >= because
        // it compensates for NaN:
        if (!(Position < this.length)) Position = this.length;else Position |= 0; // round position
        return this.substr(Position - searchStr.length, searchStr.length) === searchStr;
    };
}
// String.prototype.startsWith() - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
        return this.substr(position || 0, searchString.length) === searchString;
    };
}

// Create a new object, that prototypically inherits from the Error constructor
function jsPanelError(message) {
    this.name = 'jsPanelError';
    this.message = message || '';
    this.stack = new Error().stack;
}
jsPanelError.prototype = Object.create(Error.prototype);
jsPanelError.prototype.constructor = jsPanelError;

var jsPanel = {

    version: '4.0.0-beta.2',
    date: '2018-01-08 09:56',
    idCounter: 0,
    ziBase: 100,
    themes: ['default', 'primary', 'info', 'success', 'warning', 'danger'],
    mdbthemes: ['secondary', 'elegant', 'stylish', 'unique', 'special'],
    autopositionSpacing: 4,
    isIE: function () {
        return navigator.appVersion.match(/Trident/);
    }(),
    defaults: {
        boxShadow: 3,
        container: document.body,
        contentSize: { width: '400px', height: '200px' }, // must be object
        dragit: {
            cursor: 'move',
            handles: '.jsPanel-headerlogo, .jsPanel-titlebar, .jsPanel-ftr', // do not use .jsPanel-headerbar
            opacity: 0.8,
            disableOnMaximized: true
        },
        headerTitle: 'jsPanel',
        headerControls: 'all',
        iconfont: 'jsglyph',
        maximizedMargin: 0,
        minimizeTo: 'default',
        paneltype: 'standard',
        position: 'center',
        resizeit: {
            handles: 'n, e, s, w, ne, se, sw, nw',
            minWidth: 40,
            minHeight: 40
        },
        theme: 'default'
    },
    defaultSnapConfig: {
        sensitivity: 70,
        trigger: 'panel'
    },
    ajaxAlwaysCallbacks: [],
    extensions: {},

    ajax: function ajax(obj) {
        var conf = obj.options.contentAjax,
            configDefaults = {
            method: 'GET',
            async: true,
            user: '',
            pwd: '',
            done: function done() {
                obj.content.innerHTML = this.responseText;
            },
            autoresize: true,
            autoreposition: true
        };
        var config = void 0;

        if (typeof conf === 'string') {
            config = Object.assign({}, configDefaults, { url: encodeURI(conf), evalscripttags: true });
        } else if ((typeof conf === 'undefined' ? 'undefined' : _typeof(conf)) === 'object' && conf.url) {
            config = Object.assign({}, configDefaults, conf);
            config.url = encodeURI(conf.url);
            // reset timeout to 0, withCredentials & responseType to false if request is synchronous
            if (config.async === false) {
                config.timeout = 0;
                if (config.withCredentials) {
                    config.withCredentials = undefined;
                }
                if (config.responseType) {
                    config.responseType = undefined;
                }
            }
        } else {
            console.info('XMLHttpRequest seems to miss the request url!');
            return obj;
        }

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    config.done.call(xhr, obj);

                    // extract and eval content of script tags if "evalscripttags"
                    if (config.evalscripttags) {
                        // get all script tags within responseText
                        var scripttags = xhr.responseText.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi);
                        if (scripttags) {
                            scripttags.forEach(function (tag) {
                                // remove tags from string and trim it
                                var js = tag.replace(/<script\b[^>]*>/i, '').replace(/<\/script>/i, '').trim();
                                // execute javascript
                                eval(js);
                            });
                        }
                    }
                } else {
                    if (config.fail) {
                        config.fail.call(xhr, obj);
                    }
                }

                if (config.always) {
                    config.always.call(xhr, obj);
                }

                // resize and reposition panel if either width or height is set to 'auto'
                var oContentSize = obj.options.contentSize;
                if (typeof oContentSize === 'string' && oContentSize.match(/auto/i)) {
                    var parts = oContentSize.split(' ');
                    var sizes = Object.assign({}, { width: parts[0], height: parts[1] });
                    if (config.autoresize) {
                        obj.resize(sizes);
                    }
                    if (!obj.classList.contains('jsPanel-contextmenu')) {
                        if (config.autoreposition) {
                            obj.reposition();
                        }
                    }
                } else if ((typeof oContentSize === 'undefined' ? 'undefined' : _typeof(oContentSize)) === 'object' && (oContentSize.width === 'auto' || oContentSize.height === 'auto')) {
                    var _sizes = Object.assign({}, oContentSize);
                    if (config.autoresize) {
                        obj.resize(_sizes);
                    }
                    if (!obj.classList.contains('jsPanel-contextmenu')) {
                        if (config.autoreposition) {
                            obj.reposition();
                        }
                    }
                }

                // allows plugins to add callback functions to the ajax always callback
                if (jsPanel.ajaxAlwaysCallbacks.length) {
                    jsPanel.ajaxAlwaysCallbacks.forEach(function (item) {
                        item.call(obj, obj);
                    });
                }
            }
        };

        xhr.open(config.method, config.url, config.async, config.user, config.pwd);
        xhr.timeout = config.timeout || 0;
        if (config.withCredentials) {
            xhr.withCredentials = config.withCredentials;
        }
        if (config.responseType) {
            xhr.responseType = config.responseType;
        }

        if (config.beforeSend) {
            config.beforeSend.call(xhr);
        }
        if (config.data) {
            xhr.send(config.data);
        } else {
            xhr.send(null);
        }

        return obj;
    },
    calcColors: function calcColors(primaryColor) {
        var primeColor = this.color(primaryColor),
            secondColor = this.lighten(primaryColor, 0.81),
            thirdColor = this.darken(primaryColor, 0.5),
            fontColorForPrimary = this.perceivedBrightness(primaryColor) <= 0.556 ? '#ffffff' : '#000000',
            fontColorForSecond = this.perceivedBrightness(secondColor) <= 0.556 ? '#ffffff' : '#000000',
            fontColorForThird = this.perceivedBrightness(thirdColor) <= 0.556 ? '#000000' : '#ffffff';
        return [primeColor.hsl.css, secondColor, thirdColor, fontColorForPrimary, fontColorForSecond, fontColorForThird];
    },
    color: function color(val) {

        var color = val.toLowerCase(),
            r = void 0,
            g = void 0,
            b = void 0,
            h = void 0,
            s = void 0,
            l = void 0,
            match = void 0,
            channels = void 0,
            hsl = void 0,
            result = {};
        var hexPattern = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/gi,
            // matches "#123" or "#f05a78" with or without "#"
        RGBAPattern = /^rgba?\(([0-9]{1,3}),([0-9]{1,3}),([0-9]{1,3}),?(0|1|0\.[0-9]{1,2}|\.[0-9]{1,2})?\)$/gi,
            // matches rgb/rgba color values, whitespace allowed
        HSLAPattern = /^hsla?\(([0-9]{1,3}),([0-9]{1,3}%),([0-9]{1,3}%),?(0|1|0\.[0-9]{1,2}|\.[0-9]{1,2})?\)$/gi,
            namedColors = {
            aliceblue: 'f0f8ff',
            antiquewhite: 'faebd7',
            aqua: '0ff',
            aquamarine: '7fffd4',
            azure: 'f0ffff',
            beige: 'f5f5dc',
            bisque: 'ffe4c4',
            black: '000',
            blanchedalmond: 'ffebcd',
            blue: '00f',
            blueviolet: '8a2be2',
            brown: 'a52a2a',
            burlywood: 'deb887',
            cadetblue: '5f9ea0',
            chartreuse: '7fff00',
            chocolate: 'd2691e',
            coral: 'ff7f50',
            cornflowerblue: '6495ed',
            cornsilk: 'fff8dc',
            crimson: 'dc143c',
            cyan: '0ff',
            darkblue: '00008b',
            darkcyan: '008b8b',
            darkgoldenrod: 'b8860b',
            darkgray: 'a9a9a9',
            darkgrey: 'a9a9a9',
            darkgreen: '006400',
            darkkhaki: 'bdb76b',
            darkmagenta: '8b008b',
            darkolivegreen: '556b2f',
            darkorange: 'ff8c00',
            darkorchid: '9932cc',
            darkred: '8b0000',
            darksalmon: 'e9967a',
            darkseagreen: '8fbc8f',
            darkslateblue: '483d8b',
            darkslategray: '2f4f4f',
            darkslategrey: '2f4f4f',
            darkturquoise: '00ced1',
            darkviolet: '9400d3',
            deeppink: 'ff1493',
            deepskyblue: '00bfff',
            dimgray: '696969',
            dimgrey: '696969',
            dodgerblue: '1e90ff',
            firebrick: 'b22222',
            floralwhite: 'fffaf0',
            forestgreen: '228b22',
            fuchsia: 'f0f',
            gainsboro: 'dcdcdc',
            ghostwhite: 'f8f8ff',
            gold: 'ffd700',
            goldenrod: 'daa520',
            gray: '808080',
            grey: '808080',
            green: '008000',
            greenyellow: 'adff2f',
            honeydew: 'f0fff0',
            hotpink: 'ff69b4',
            indianred: 'cd5c5c',
            indigo: '4b0082',
            ivory: 'fffff0',
            khaki: 'f0e68c',
            lavender: 'e6e6fa',
            lavenderblush: 'fff0f5',
            lawngreen: '7cfc00',
            lemonchiffon: 'fffacd',
            lightblue: 'add8e6',
            lightcoral: 'f08080',
            lightcyan: 'e0ffff',
            lightgoldenrodyellow: 'fafad2',
            lightgray: 'd3d3d3',
            lightgrey: 'd3d3d3',
            lightgreen: '90ee90',
            lightpink: 'ffb6c1',
            lightsalmon: 'ffa07a',
            lightseagreen: '20b2aa',
            lightskyblue: '87cefa',
            lightslategray: '789',
            lightslategrey: '789',
            lightsteelblue: 'b0c4de',
            lightyellow: 'ffffe0',
            lime: '0f0',
            limegreen: '32cd32',
            linen: 'faf0e6',
            magenta: 'f0f',
            maroon: '800000',
            mediumaquamarine: '66cdaa',
            mediumblue: '0000cd',
            mediumorchid: 'ba55d3',
            mediumpurple: '9370d8',
            mediumseagreen: '3cb371',
            mediumslateblue: '7b68ee',
            mediumspringgreen: '00fa9a',
            mediumturquoise: '48d1cc',
            mediumvioletred: 'c71585',
            midnightblue: '191970',
            mintcream: 'f5fffa',
            mistyrose: 'ffe4e1',
            moccasin: 'ffe4b5',
            navajowhite: 'ffdead',
            navy: '000080',
            oldlace: 'fdf5e6',
            olive: '808000',
            olivedrab: '6b8e23',
            orange: 'ffa500',
            orangered: 'ff4500',
            orchid: 'da70d6',
            palegoldenrod: 'eee8aa',
            palegreen: '98fb98',
            paleturquoise: 'afeeee',
            palevioletred: 'd87093',
            papayawhip: 'ffefd5',
            peachpuff: 'ffdab9',
            peru: 'cd853f',
            pink: 'ffc0cb',
            plum: 'dda0dd',
            powderblue: 'b0e0e6',
            purple: '800080',
            rebeccapurple: '639',
            red: 'f00',
            rosybrown: 'bc8f8f',
            royalblue: '4169e1',
            saddlebrown: '8b4513',
            salmon: 'fa8072',
            sandybrown: 'f4a460',
            seagreen: '2e8b57',
            seashell: 'fff5ee',
            sienna: 'a0522d',
            silver: 'c0c0c0',
            skyblue: '87ceeb',
            slateblue: '6a5acd',
            slategray: '708090',
            slategrey: '708090',
            snow: 'fffafa',
            springgreen: '00ff7f',
            steelblue: '4682b4',
            tan: 'd2b48c',
            teal: '008080',
            thistle: 'd8bfd8',
            tomato: 'ff6347',
            turquoise: '40e0d0',
            violet: 'ee82ee',
            wheat: 'f5deb3',
            white: 'fff',
            whitesmoke: 'f5f5f5',
            yellow: 'ff0',
            yellowgreen: '9acd32'
        };

        // change named color to corresponding hex value
        if (namedColors[color]) {
            color = namedColors[color];
        }

        // check val for hex color
        if (color.match(hexPattern) !== null) {

            // '#' entfernen wenn vorhanden
            color = color.replace('#', '');

            // color has either 3 or 6 characters
            if (color.length % 2 === 1) {

                // color has 3 char -> convert to 6 char
                // r = color.substr(0,1).repeat(2);
                // g = color.substr(1,1).repeat(2); // String.prototype.repeat() doesn't work in IE11
                // b = color.substr(2,1).repeat(2);
                r = String(color.substr(0, 1)) + color.substr(0, 1);
                g = String(color.substr(1, 1)) + color.substr(1, 1);
                b = String(color.substr(2, 1)) + color.substr(2, 1);

                result.rgb = {
                    r: parseInt(r, 16),
                    g: parseInt(g, 16),
                    b: parseInt(b, 16)
                };

                result.hex = '#' + r + g + b;
            } else {

                // color has 6 char
                result.rgb = {
                    r: parseInt(color.substr(0, 2), 16),
                    g: parseInt(color.substr(2, 2), 16),
                    b: parseInt(color.substr(4, 2), 16)
                };

                result.hex = '#' + color;
            }

            hsl = this.rgbToHsl(result.rgb.r, result.rgb.g, result.rgb.b);
            result.hsl = hsl;
            result.rgb.css = 'rgb(' + result.rgb.r + ',' + result.rgb.g + ',' + result.rgb.b + ')';
        }
        // check val for rgb/rgba color
        else if (color.match(RGBAPattern)) {

                match = RGBAPattern.exec(color);
                result.rgb = { css: color, r: match[1], g: match[2], b: match[3] };
                result.hex = this.rgbToHex(match[1], match[2], match[3]);
                hsl = this.rgbToHsl(match[1], match[2], match[3]);
                result.hsl = hsl;
            }
            // check val for hsl/hsla color
            else if (color.match(HSLAPattern)) {

                    match = HSLAPattern.exec(color);

                    h = match[1] / 360;
                    s = match[2].substr(0, match[2].length - 1) / 100;
                    l = match[3].substr(0, match[3].length - 1) / 100;

                    channels = this.hslToRgb(h, s, l);

                    result.rgb = {
                        css: 'rgb(' + channels[0] + ',' + channels[1] + ',' + channels[2] + ')',
                        r: channels[0],
                        g: channels[1],
                        b: channels[2]
                    };
                    result.hex = this.rgbToHex(result.rgb.r, result.rgb.g, result.rgb.b);
                    result.hsl = { css: 'hsl(' + match[1] + ',' + match[2] + ',' + match[3] + ')', h: match[1], s: match[2], l: match[3] };
                }

                // or return #f5f5f5
                else {
                        result.hex = '#f5f5f5';
                        result.rgb = { css: 'rgb(245,245,245)', r: 245, g: 245, b: 245 };
                        result.hsl = { css: 'hsl(0,0%,96.08%)', h: 0, s: '0%', l: '96.08%' };
                    }

        return result;
    },
    createPanelTemplate: function createPanelTemplate() {
        var dataAttr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        var panel = document.createElement('div');
        panel.className = 'jsPanel';
        if (dataAttr) {
            ['close', 'maximize', 'normalize', 'minimize', 'smallify', 'smallifyrev'].forEach(function (item) {
                panel.setAttribute('data-btn' + item, 'enabled');
            });
        }
        panel.innerHTML = '<div class="jsPanel-hdr">\n                                <div class="jsPanel-headerbar">\n                                    <div class="jsPanel-headerlogo"></div>\n                                    <div class="jsPanel-titlebar">\n                                        <h3 class="jsPanel-title"></h3>\n                                    </div>\n                                    <div class="jsPanel-controlbar">\n                                        <div class="jsPanel-btn jsPanel-btn-smallify"><span class="jsglyph jsglyph-chevron-up"></span></div>\n                                        <div class="jsPanel-btn jsPanel-btn-smallifyrev"><span class="jsglyph jsglyph-chevron-down"></span></div>\n                                        <div class="jsPanel-btn jsPanel-btn-minimize"><span class="jsglyph jsglyph-minimize"></span></div>\n                                        <div class="jsPanel-btn jsPanel-btn-normalize"><span class="jsglyph jsglyph-normalize"></span></div>\n                                        <div class="jsPanel-btn jsPanel-btn-maximize"><span class="jsglyph jsglyph-maximize"></span></div>\n                                        <div class="jsPanel-btn jsPanel-btn-close"><span class="jsglyph jsglyph-close"></span></div>\n                                    </div>\n                                </div>\n                                <div class="jsPanel-hdr-toolbar"></div>\n                            </div>\n                            <div class="jsPanel-content jsPanel-content-nofooter"></div>\n                            <div class="jsPanel-minimized-box"></div>\n                            <div class="jsPanel-ftr"></div>';
        return panel;
    },
    createMinimizedTemplate: function createMinimizedTemplate() {
        var panel = document.createElement('div');
        panel.className = 'jsPanel-replacement';
        panel.innerHTML = '<div class="jsPanel-hdr">\n                                <div class="jsPanel-headerbar">\n                                    <div class="jsPanel-headerlogo"></div>\n                                    <div class="jsPanel-titlebar">\n                                        <h3 class="jsPanel-title"></h3>\n                                    </div>\n                                    <div class="jsPanel-controlbar">\n                                        <div class="jsPanel-btn jsPanel-btn-normalize"><span class="jsglyph jsglyph-normalize"></span></div>\n                                        <div class="jsPanel-btn jsPanel-btn-maximize"><span class="jsglyph jsglyph-maximize"></span></div>\n                                        <div class="jsPanel-btn jsPanel-btn-close"><span class="jsglyph jsglyph-close"></span></div>\n                                    </div>\n                                </div>\n                            </div>';
        return panel;
    },
    createSnapArea: function createSnapArea(panel, pos, snapsens) {
        var el = document.createElement('div'),
            parent = panel.parentNode;
        el.className = 'jsPanel-snap-area jsPanel-snap-area-' + pos;
        if (pos === 'lt' || pos === 'rt' || pos === 'rb' || pos === 'lb') {
            el.style.width = snapsens + 'px';
            el.style.height = snapsens + 'px';
        } else if (pos === 'ct' || pos === 'cb') {
            el.style.height = snapsens + 'px';
        } else if (pos === 'lc' || pos === 'rc') {
            el.style.width = snapsens + 'px';
        }
        if (parent !== document.body) {
            el.style.position = 'absolute';
        }
        if (!document.querySelector('.jsPanel-snap-area.jsPanel-snap-area-' + pos)) {
            panel.parentNode.appendChild(el);
        }
    },
    darken: function darken(val, amount) {
        // amount is value between 0 and 1
        var hsl = this.color(val).hsl,
            l = parseFloat(hsl.l),
            lnew = l - l * amount + '%';
        return 'hsl(' + hsl.h + ',' + hsl.s + ',' + lnew + ')';
    },
    dragit: function dragit(elmt) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var dragstarted = void 0,
            opts = Object.assign({}, this.defaults.dragit, options),
            dragElmt = void 0,
            containment = void 0,
            frames = [];
        var dragstart = new CustomEvent('dragstart', { detail: elmt.id }),
            drag = new CustomEvent('drag', { detail: elmt.id }),
            dragstop = new CustomEvent('dragstop', { detail: elmt.id });

        // normalize grid config
        if (opts.grid && Array.isArray(opts.grid)) {
            if (opts.grid.length === 1) {
                opts.grid[1] = opts.grid[0];
            }
        }

        // normalize containment config
        containment = this.pOcontainment(opts.containment);

        // attach handler to each drag handle
        elmt.querySelectorAll(opts.handles).forEach(function (handle) {

            handle.style.touchAction = 'none';
            handle.style.cursor = opts.cursor;
            handle.classList.add('jsPanel-dragit-handle');

            jsPanel.pointerdown.forEach(function (item) {
                handle.addEventListener(item, function (e) {
                    // prevent body scroll on drag init
                    e.preventDefault();

                    // footer elmts with the class "jsPanel-ftr-btn" don't drag a panel
                    // do not compare e.target with e.currentTarget because there might be footer elmts supposed to drag the panel
                    if (e.target.closest('.jsPanel-ftr-btn')) {
                        return;
                    }

                    elmt.controlbar.style.pointerEvents = 'none';
                    frames = document.querySelectorAll('iframe');
                    if (frames.length) {
                        frames.forEach(function (item) {
                            item.style.pointerEvents = 'none';
                        });
                    }

                    var startStyles = window.getComputedStyle(elmt),
                        startLeft = parseFloat(startStyles.left),
                        startTop = parseFloat(startStyles.top),
                        psx = e.touches ? e.touches[0].clientX : e.clientX,
                        // pointer x on mousedown (don't use pageX, doesn't work on FF for Android)
                    psy = e.touches ? e.touches[0].clientY : e.clientY,
                        // pointer y on mousedown (don't use pageY, doesn't work on FF for Android)
                    parent = elmt.parentNode,
                        parentRect = parent.getBoundingClientRect(),
                        parentStyles = window.getComputedStyle(parent);
                    var startLeftCorrection = 0;

                    // function actually draging the elmt
                    dragElmt = function dragElmt(e) {
                        e.preventDefault();

                        if (!dragstarted) {
                            document.dispatchEvent(dragstart);
                            elmt.style.opacity = opts.opacity;
                            // if configured restore panel size to values before snap and reposition reasonable before drag actually starts
                            if (elmt.snapped && opts.snap.resizeToPreSnap && elmt.currentData.beforeSnap) {
                                elmt.resize(elmt.currentData.beforeSnap.width + ' ' + elmt.currentData.beforeSnap.height);

                                var intermediateStyles = elmt.getBoundingClientRect(),
                                    delta = psx - (intermediateStyles.left + intermediateStyles.width),
                                    wHalf = intermediateStyles.width / 2;
                                if (delta > -wHalf) {
                                    startLeftCorrection = delta + wHalf;
                                }
                            }
                            // dragstart callback
                            if (typeof opts.start === 'function') {
                                opts.start.call(elmt, elmt, { left: startLeft, top: startTop });
                            }
                            jsPanel.front(elmt);
                            elmt.snapped = false;
                        }
                        dragstarted = 1;

                        if (opts.disableOnMaximized && elmt.status === 'maximized') {
                            return false;
                        }

                        var elmtL = void 0,
                            elmtL2 = void 0,
                            elmtT = void 0,
                            elmtT2 = void 0,
                            elmtR = void 0,
                            elmtR2 = void 0,
                            elmtB = void 0,
                            elmtB2 = void 0;
                        var pmx = e.touches ? e.touches[0].clientX : e.clientX,
                            // current pointer x while pointer moves (don't use pageX, doesn't work on FF for Android)
                        pmy = e.touches ? e.touches[0].clientY : e.clientY,
                            // current pointer y while pointer moves (don't use pageY, doesn't work on FF for Android)
                        dragStyles = window.getComputedStyle(elmt); // get current styles while draging

                        if (opts.snap) {
                            if (opts.snap.trigger === 'panel') {
                                elmtL = parseFloat(dragStyles.left);
                                elmtL2 = Math.pow(elmtL, 2);
                                elmtT = parseFloat(dragStyles.top);
                                elmtT2 = Math.pow(elmtT, 2);
                                elmtR = parseFloat(dragStyles.right);
                                elmtR2 = Math.pow(elmtR, 2);
                                elmtB = parseFloat(dragStyles.bottom);
                                elmtB2 = Math.pow(elmtB, 2);
                            } else if (opts.snap.trigger === 'pointer') {
                                elmtL = pmx;
                                elmtL2 = Math.pow(pmx, 2);
                                elmtT = pmy;
                                elmtT2 = Math.pow(elmtT, 2);
                                elmtR = window.innerWidth - pmx;
                                elmtR2 = Math.pow(elmtR, 2);
                                elmtB = window.innerHeight - pmy;
                                elmtB2 = Math.pow(elmtB, 2);
                            }
                        }

                        var lefttopVectorDrag = Math.sqrt(elmtL2 + elmtT2),
                            leftbottomVectorDrag = Math.sqrt(elmtL2 + elmtB2),
                            righttopVectorDrag = Math.sqrt(elmtR2 + elmtT2),
                            rightbottomVectorDrag = Math.sqrt(elmtR2 + elmtB2),
                            horizontalDeltaDrag = Math.abs(elmtL - elmtR) / 2,
                            verticalDeltaDrag = Math.abs(elmtT - elmtB) / 2,
                            leftVectorDrag = Math.sqrt(elmtL2 + Math.pow(verticalDeltaDrag, 2)),
                            topVectorDrag = Math.sqrt(elmtT2 + Math.pow(horizontalDeltaDrag, 2)),
                            rightVectorDrag = Math.sqrt(elmtR2 + Math.pow(verticalDeltaDrag, 2)),
                            bottomVectorDrag = Math.sqrt(elmtB2 + Math.pow(horizontalDeltaDrag, 2));

                        // prevent selctions while draging
                        window.getSelection().removeAllRanges();

                        // trigger drag permanently while draging
                        document.dispatchEvent(drag);

                        // move elmt
                        if (!opts.axis || opts.axis === 'x') {
                            elmt.style.left = startLeft + (pmx - psx) + startLeftCorrection + 'px'; // set new css left of elmt depending on opts.axis
                        }
                        if (!opts.axis || opts.axis === 'y') {
                            elmt.style.top = startTop + (pmy - psy) + 'px'; // set new css top of elmt depending on opts.axis
                        }

                        // apply grid option
                        if (opts.grid) {
                            var cx = parseFloat(dragStyles.left),
                                cy = parseFloat(dragStyles.top),
                                modX = cx % opts.grid[0],
                                modY = cy % opts.grid[1];
                            if (modX < opts.grid[0] / 2) {
                                elmt.style.left = cx - modX + 'px';
                            } else {
                                elmt.style.left = cx + (opts.grid[0] - modX) + 'px';
                            }
                            if (modY < opts.grid[1] / 2) {
                                elmt.style.top = cy - modY + 'px';
                            } else {
                                elmt.style.top = cy + (opts.grid[1] - modY) + 'px';
                            }
                        }

                        // apply containment option
                        if (opts.containment || opts.containment === 0) {
                            var maxLeft = void 0,
                                maxTop = void 0;

                            // calc maxLeft and maxTop (minLeft and MinTop is equal to containment setting)
                            if (elmt.options.container === document.body) {
                                maxLeft = window.innerWidth - parseFloat(dragStyles.width) - containment[1];
                                maxTop = window.innerHeight - parseFloat(dragStyles.height) - containment[2];
                            } else {
                                var xCorr = parseFloat(parentStyles.borderLeftWidth) + parseFloat(parentStyles.borderRightWidth);
                                var yCorr = parseFloat(parentStyles.borderTopWidth) + parseFloat(parentStyles.borderBottomWidth);
                                maxLeft = parentRect.width - parseFloat(dragStyles.width) - containment[1] - xCorr;
                                maxTop = parentRect.height - parseFloat(dragStyles.height) - containment[2] - yCorr;
                            }

                            if (parseFloat(elmt.style.left) <= containment[3]) {
                                elmt.style.left = containment[3] + 'px';
                            }
                            if (parseFloat(elmt.style.top) <= containment[0]) {
                                elmt.style.top = containment[0] + 'px';
                            }
                            if (parseFloat(elmt.style.left) >= maxLeft) {
                                elmt.style.left = maxLeft + 'px';
                            }
                            if (parseFloat(elmt.style.top) >= maxTop) {
                                elmt.style.top = maxTop + 'px';
                            }
                        }

                        // callback while dragging
                        if (typeof opts.drag === 'function') {
                            opts.drag.call(elmt, elmt, { left: elmtL, top: elmtT, right: elmtR, bottom: elmtB });
                        }

                        // apply snap options
                        if (opts.snap) {
                            var snapSens = opts.snap.sensitivity,
                                topSensAreaLength = parent === document.body ? window.innerWidth / 8 : parentRect.width / 8,
                                sideSensAreaLength = parent === document.body ? window.innerHeight / 8 : parentRect.height / 8;
                            elmt.snappableTo = false;
                            jsPanel.removeSnapAreas(elmt);

                            if (lefttopVectorDrag < snapSens) {
                                elmt.snappableTo = 'left-top';
                                if (opts.snap.snapLeftTop !== false) {
                                    jsPanel.createSnapArea(elmt, 'lt', snapSens);
                                }
                            } else if (leftbottomVectorDrag < snapSens) {
                                elmt.snappableTo = 'left-bottom';
                                if (opts.snap.snapLeftBottom !== false) {
                                    jsPanel.createSnapArea(elmt, 'lb', snapSens);
                                }
                            } else if (righttopVectorDrag < snapSens) {
                                elmt.snappableTo = 'right-top';
                                if (opts.snap.snapRightTop !== false) {
                                    jsPanel.createSnapArea(elmt, 'rt', snapSens);
                                }
                            } else if (rightbottomVectorDrag < snapSens) {
                                elmt.snappableTo = 'right-bottom';
                                if (opts.snap.snapRightBottom !== false) {
                                    jsPanel.createSnapArea(elmt, 'rb', snapSens);
                                }
                            } else if (elmtT < snapSens && topVectorDrag < topSensAreaLength) {
                                elmt.snappableTo = 'center-top';
                                if (opts.snap.snapCenterTop !== false) {
                                    jsPanel.createSnapArea(elmt, 'ct', snapSens);
                                }
                            } else if (elmtL < snapSens && leftVectorDrag < sideSensAreaLength) {
                                elmt.snappableTo = 'left-center';
                                if (opts.snap.snapLeftCenter !== false) {
                                    jsPanel.createSnapArea(elmt, 'lc', snapSens);
                                }
                            } else if (elmtR < snapSens && rightVectorDrag < sideSensAreaLength) {
                                elmt.snappableTo = 'right-center';
                                if (opts.snap.snapRightCenter !== false) {
                                    jsPanel.createSnapArea(elmt, 'rc', snapSens);
                                }
                            } else if (elmtB < snapSens && bottomVectorDrag < topSensAreaLength) {
                                elmt.snappableTo = 'center-bottom';
                                if (opts.snap.snapCenterBottom !== false) {
                                    jsPanel.createSnapArea(elmt, 'cb', snapSens);
                                }
                            }
                        }
                    };

                    jsPanel.pointermove.forEach(function (item) {
                        document.addEventListener(item, dragElmt);
                    });
                });
            });

            jsPanel.pointerup.forEach(function (item) {
                document.addEventListener(item, function () {

                    jsPanel.pointermove.forEach(function (item) {
                        document.removeEventListener(item, dragElmt);
                    });

                    document.body.style.overflow = 'inherit';
                    jsPanel.removeSnapAreas(elmt);

                    if (dragstarted) {
                        document.dispatchEvent(dragstop);
                        elmt.style.opacity = 1;
                        dragstarted = undefined;
                        elmt.saveCurrentPosition();

                        if (opts.snap) {
                            if (elmt.snappableTo === 'left-top') {
                                jsPanel.snapPanel(elmt, opts.snap.snapLeftTop);
                            } else if (elmt.snappableTo === 'center-top') {
                                jsPanel.snapPanel(elmt, opts.snap.snapCenterTop);
                            } else if (elmt.snappableTo === 'right-top') {
                                jsPanel.snapPanel(elmt, opts.snap.snapRightTop);
                            } else if (elmt.snappableTo === 'right-center') {
                                jsPanel.snapPanel(elmt, opts.snap.snapRightCenter);
                            } else if (elmt.snappableTo === 'right-bottom') {
                                jsPanel.snapPanel(elmt, opts.snap.snapRightBottom);
                            } else if (elmt.snappableTo === 'center-bottom') {
                                jsPanel.snapPanel(elmt, opts.snap.snapCenterBottom);
                            } else if (elmt.snappableTo === 'left-bottom') {
                                jsPanel.snapPanel(elmt, opts.snap.snapLeftBottom);
                            } else if (elmt.snappableTo === 'left-center') {
                                jsPanel.snapPanel(elmt, opts.snap.snapLeftCenter);
                            }

                            if (opts.snap.callback && elmt.snappableTo && typeof opts.snap.callback === 'function') {
                                opts.snap.callback.call(elmt, elmt);
                            }

                            if (elmt.snappableTo && opts.snap.repositionOnSnap) {
                                elmt.repositionOnSnap(elmt.snappableTo);
                            }
                        }

                        if (typeof opts.stop === 'function') {
                            opts.stop.call(elmt, elmt, { left: parseFloat(elmt.style.left), top: parseFloat(elmt.style.top) });
                        }
                    }

                    elmt.controlbar.style.pointerEvents = 'inherit';
                    if (frames.length) {
                        frames.forEach(function (item) {
                            item.style.pointerEvents = 'inherit';
                        });
                    }
                });
            });

            // dragit is initialized - now disable if set
            if (opts.disable) {
                handle.style.pointerEvents = 'none';
            }
        });

        return elmt;
    },
    emptyNode: function emptyNode(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
        return node;
    },
    extend: function extend(obj) {
        // obj needs to be a plain object
        if (Object.prototype.toString.call(obj) === '[object Object]') {
            for (var ext in obj) {
                if (obj.hasOwnProperty(ext)) {
                    this.extensions[ext] = obj[ext];
                }
            }
        }
    },
    fetch: function (_fetch) {
        function fetch(_x3) {
            return _fetch.apply(this, arguments);
        }

        fetch.toString = function () {
            return _fetch.toString();
        };

        return fetch;
    }(function (obj) {
        var conf = obj.options.contentFetch;
        var confDefaults = {
            bodyMethod: 'text',
            evalscripttags: true,
            autoresize: true,
            autoreposition: true,
            done: function done(obj, response) {
                obj.content.innerHTML = response;
            }
        };

        if (typeof conf === 'string') {
            conf = Object.assign({ resource: obj.options.contentFetch }, confDefaults);
        } else {
            conf = Object.assign(confDefaults, conf);
        }
        var fetchInit = conf.fetchInit || {};

        if (conf.beforeSend) {
            conf.beforeSend.call(obj, obj);
        }

        fetch(conf.resource, fetchInit).then(function (response) {

            if (response.ok) {
                return response[conf.bodyMethod]();
            }
            throw new Error('Network response was not ok.');
        }).then(function (response) {

            conf.done.call(obj, obj, response);

            // extract and eval content of script tags if "evalscripttags"
            if (conf.evalscripttags) {
                // get all script tags within responseText
                var scripttags = response.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi);
                if (scripttags) {
                    scripttags.forEach(function (tag) {
                        // remove tags from string and trim it
                        var js = tag.replace(/<script\b[^>]*>/i, '').replace(/<\/script>/i, '').trim();
                        // execute javascript
                        eval(js);
                    });
                }
            }

            // resize and reposition panel if either width or height is set to 'auto'
            var oContentSize = obj.options.contentSize;
            if (conf.autoresize || conf.autoreposition) {
                if (typeof oContentSize === 'string' && oContentSize.match(/auto/i)) {
                    var parts = oContentSize.split(' ');
                    var sizes = Object.assign({}, { width: parts[0], height: parts[1] });
                    if (conf.autoresize) {
                        obj.resize(sizes);
                    }
                    if (!obj.classList.contains('jsPanel-contextmenu')) {
                        if (conf.autoreposition) {
                            obj.reposition();
                        }
                    }
                } else if ((typeof oContentSize === 'undefined' ? 'undefined' : _typeof(oContentSize)) === 'object' && (oContentSize.width === 'auto' || oContentSize.height === 'auto')) {
                    var _sizes2 = Object.assign({}, oContentSize);
                    if (conf.autoresize) {
                        obj.resize(_sizes2);
                    }
                    if (!obj.classList.contains('jsPanel-contextmenu')) {
                        if (conf.autoreposition) {
                            obj.reposition();
                        }
                    }
                }
            }
        }).catch(function (error) {
            console.error('There has been a problem with your fetch operation: ' + error.message);
        });
    }),
    front: function front(obj) {
        if (obj.status === 'minimized') {
            if (obj.statusBefore === 'maximized') {
                obj.maximize();
            } else {
                obj.normalize();
            }
        } else {
            var newArr = Array.prototype.slice.call(document.querySelectorAll('.jsPanel-standard')).map(function (panel) {
                return panel.style.zIndex;
            });
            if (Math.max.apply(Math, _toConsumableArray(newArr)) > obj.style.zIndex) {
                obj.style.zIndex = jsPanel.zi.next();
            }
            this.resetZi();
        }
    },
    getPanels: function getPanels() {
        var condition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
            return this.classList.contains('jsPanel-standard');
        };

        return Array.prototype.slice.call(document.querySelectorAll('.jsPanel')).filter(function (value) {
            return condition.call(value, value);
        }).sort(function (a, b) {
            return b.style.zIndex - a.style.zIndex;
        });
    },
    hslToRgb: function hslToRgb(h, s, l) {
        // h, s and l must be values between 0 and 1
        var r = void 0,
            g = void 0,
            b = void 0;
        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            var hue2rgb = function hue2rgb(p, q, t) {
                if (t < 0) {
                    t += 1;
                }
                if (t > 1) {
                    t -= 1;
                }
                if (t < 1 / 6) {
                    return p + (q - p) * 6 * t;
                }
                if (t < 1 / 2) {
                    return q;
                }
                if (t < 2 / 3) {
                    return p + (q - p) * (2 / 3 - t) * 6;
                }
                return p;
            };
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s,
                p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    },
    lighten: function lighten(val, amount) {
        // amount is value between 0 and 1
        var hsl = this.color(val).hsl,
            l = parseFloat(hsl.l),
            lnew = l + (100 - l) * amount + '%';
        return 'hsl(' + hsl.h + ',' + hsl.s + ',' + lnew + ')';
    },
    perceivedBrightness: function perceivedBrightness(val) {
        var rgb = this.color(val).rgb;
        // return value is in the range 0 - 1 and input rgb values must also be in the range 0 - 1
        // algorithm from: https://en.wikipedia.org/wiki/Rec._2020
        return rgb.r / 255 * 0.2627 + rgb.g / 255 * 0.6780 + rgb.b / 255 * 0.0593;
    },
    pOcontainer: function pOcontainer(container, cb) {
        if (container) {
            var box = void 0;
            if (typeof container === 'string') {
                box = document.querySelector(container);
            } else if (container.nodeType === 1) {
                box = container;
            } else if (container.length) {
                box = container[0];
            }
            if (box && box.nodeType === 1) {
                return box;
            }
        }

        var error = new jsPanelError('\nNO NEW PANEL CREATED!\nThe container to append the panel to does not exist or a container was not specified!');
        try {
            throw error;
        } catch (e) {
            if (cb) {
                cb.call(e, e);
            }
        }
        return error;
    },


    // normalizes values for option.maximizedMargin and containment of dragit/resizeit
    pOcontainment: function pOcontainment(arg) {
        if (typeof arg === 'number') {
            // arg: 20 => arg: [20, 20, 20, 20]
            return [arg, arg, arg, arg];
        } else if (Array.isArray(arg)) {
            if (arg.length === 1) {
                // arg: [20] => arg: [20, 20, 20, 20]
                return [arg[0], arg[0], arg[0], arg[0]];
            } else if (arg.length === 2) {
                // arg: [20, 40] => arg: [20, 40, 20, 40]
                return arg.concat(arg);
            } else if (arg.length === 3) {
                arg[3] = arg[1];
            }
        }
        return arg; // assumed to be array with 4 values
    },
    pOsize: function pOsize(panel, size) {
        var values = size || this.defaults.contentSize,
            parent = panel.parentNode;
        if (typeof values === 'string') {
            var nums = values.trim().split(' ');
            values = {};
            values.width = nums[0];
            nums.length === 2 ? values.height = nums[1] : values.height = nums[0];
        } else {
            if (values.width && !values.height) {
                values.height = values.width;
            } else if (values.height && !values.width) {
                values.width = values.height;
            }
        }

        if (String(values.width).match(/^[0-9]+$/gi)) {
            // if number only
            values.width += 'px';
        } else if (typeof values.width === 'string' && values.width.endsWith('%')) {
            if (parent === document.body) {
                values.width = window.innerWidth * (parseFloat(values.width) / 100) + 'px';
            } else {
                var prtStyles = window.getComputedStyle(parent),
                    border = parseFloat(prtStyles.borderLeftWidth) + parseFloat(prtStyles.borderRightWidth);
                values.width = (parseFloat(prtStyles.width) - border) * (parseFloat(values.width) / 100) + 'px';
            }
        } else if (typeof values.width === 'function') {
            values.width = values.width();
            if (typeof values.width === 'number') {
                values.width += 'px';
            } else if (typeof values.width === 'string' && values.width.match(/^[0-9]+$/gi)) {
                values.width += 'px';
            }
        }

        if (String(values.height).match(/^[0-9]+$/gi)) {
            // if number only
            values.height += 'px';
        } else if (typeof values.height === 'string' && values.height.endsWith('%')) {
            if (parent === document.body) {
                values.height = window.innerHeight * (parseFloat(values.height) / 100) + 'px';
            } else {
                var _prtStyles = window.getComputedStyle(parent),
                    _border = parseFloat(_prtStyles.borderTopWidth) + parseFloat(_prtStyles.borderBottomWidth);
                values.height = (parseFloat(_prtStyles.height) - _border) * (parseFloat(values.height) / 100) + 'px';
            }
        } else if (typeof values.height === 'function') {
            values.height = values.height();
            if (typeof values.height === 'number') {
                values.height += 'px';
            } else if (typeof values.height === 'string' && values.height.match(/^[0-9]+$/gi)) {
                values.height += 'px';
            }
        }

        return values; // return value must be object {width: xxx, height: xxx}
    },
    position: function position(elmt, _position) {
        var elmtToPosition = void 0,
            posSettings = void 0,
            elmtToPositionAgainst = void 0,
            calculatedPosition = { left: 0, top: 0 },
            myXcorrection = 0,
            myYcorrection = 0,
            atXcorrection = 0,
            atYcorrection = 0;

        var defaults = { my: 'center', at: 'center', of: 'window', offsetX: '0px', offsetY: '0px' },
            windowRect = {
            width: document.documentElement.clientWidth,
            height: window.innerHeight
        },
            scrollX = pageXOffset,
            scrollY = pageYOffset;

        if (typeof elmt === 'string') {
            // arg elmt is assumed to be a selector string
            elmtToPosition = document.querySelector(elmt);
        } else {
            // otherwise arg elmt is assumed to be a node object
            elmtToPosition = elmt;
        }

        // do not position elmt when parameter position is set to boolean false
        if (!_position) {
            elmtToPosition.style.opacity = 1;
            return elmtToPosition;
        }

        var elmtToPositionRect = elmtToPosition.getBoundingClientRect();
        // contains read-only left, top, right, bottom, x, y, width, height describing the !! border-box !! in pixels
        // Properties other than width and height are relative to the top-left of the viewport!!

        // translate shorthand string to object - "top-left 50 50 down"
        if (typeof _position === 'string') {
            var posValue = _position.match(/\b[a-z]{4,6}-{1}[a-z]{3,6}\b/i),
                autoposValue = _position.match(/down|up|right([^-]|$)|left([^-]|$)/i),
                offsetValue = _position.match(/[+-]?\d?\.?\d+([a-z%]{2,4}\b|%?)/gi);
            var settings = void 0;

            if (posValue) {
                settings = { my: posValue[0].toLowerCase(), at: posValue[0].toLowerCase() };
            } else {
                settings = { my: 'center', at: 'center' };
            }

            if (autoposValue) {
                settings.autoposition = autoposValue[0].toLowerCase();
            }

            if (offsetValue) {
                // convert strings with only numbers to a number value
                offsetValue.forEach(function (item, index) {
                    if (item.match(/^[+-]?[0-9]*$/)) {
                        offsetValue[index] += 'px';
                    }
                    offsetValue[index] = offsetValue[index].toLowerCase();
                });
                // only one passed offset is used for both offsetX and offsetY
                if (offsetValue.length === 1) {
                    settings.offsetX = offsetValue[0];
                    settings.offsetY = offsetValue[0];
                } else {
                    settings.offsetX = offsetValue[0];
                    settings.offsetY = offsetValue[1];
                }
            }

            posSettings = Object.assign({}, defaults, settings);
        } else {
            posSettings = Object.assign({}, defaults, _position);
        }

        var parentContainer = elmtToPosition.parentElement;
        var parentContainerStyles = window.getComputedStyle(parentContainer);
        var parentContainerRect = parentContainer.getBoundingClientRect();
        var parentContainerTagName = parentContainer.tagName.toLowerCase();

        if (posSettings.of && posSettings.of !== 'window') {
            if (typeof posSettings.of === 'string') {
                // posSettings.of is assumed to be a selector string
                elmtToPositionAgainst = document.querySelector(posSettings.of);
            } else {
                // otherwise posSettings.of is assumed to be a node object
                elmtToPositionAgainst = posSettings.of;
            }
        }

        // calc left corrections due to panel size, should be the same for all scenarios
        if (posSettings.my.match(/^center-top$|^center$|^center-bottom$/i)) {
            myXcorrection = elmtToPositionRect.width / 2;
        } else if (posSettings.my.match(/right/i)) {
            myXcorrection = elmtToPositionRect.width;
        }
        // calc top corrections due to panel size
        if (posSettings.my.match(/^left-center$|^center$|^right-center$/i)) {
            myYcorrection = elmtToPositionRect.height / 2;
        } else if (posSettings.my.match(/bottom/i)) {
            myYcorrection = elmtToPositionRect.height;
        }

        // SCENARIO 1 - panel appended to body and positioned relative to window -> make fixed
        if (parentContainerTagName === 'body' && posSettings.of === 'window') {
            // calc left corrections due to window size
            if (posSettings.at.match(/^center-top$|^center$|^center-bottom$/i)) {
                atXcorrection = windowRect.width / 2;
            } else if (posSettings.at.match(/right/i)) {
                atXcorrection = windowRect.width;
            }
            // calc top corrections due to window size
            if (posSettings.at.match(/^left-center$|^center$|^right-center$/i)) {
                atYcorrection = windowRect.height / 2;
            } else if (posSettings.at.match(/bottom/i)) {
                atYcorrection = windowRect.height;
            }

            calculatedPosition.left = atXcorrection - myXcorrection - parseFloat(parentContainerStyles.borderLeftWidth);
            calculatedPosition.top = atYcorrection - myYcorrection - parseFloat(parentContainerStyles.borderTopWidth);

            // panel appended to body and positioned relative to window is always fixed
            elmtToPosition.style.position = 'fixed';
        }

        // SCENARIO 2 - panel appended to body and positioned relative to another element in document
        else if (parentContainerTagName === 'body' && posSettings.of !== 'window') {
                var elmtToPositionAgainstRect = elmtToPositionAgainst.getBoundingClientRect();

                // calc left corrections due to position and size of elmtToPositionAgainst
                if (posSettings.at.match(/^center-top$|^center$|^center-bottom$/i)) {
                    atXcorrection = elmtToPositionAgainstRect.width / 2 + elmtToPositionAgainstRect.left + scrollX;
                } else if (posSettings.at.match(/right/i)) {
                    atXcorrection = elmtToPositionAgainstRect.width + elmtToPositionAgainstRect.left + scrollX;
                } else {
                    atXcorrection = elmtToPositionAgainstRect.left + scrollX;
                }
                // calc top corrections due to position and size of elmtToPositionAgainst
                if (posSettings.at.match(/^left-center$|^center$|^right-center$/i)) {
                    atYcorrection = elmtToPositionAgainstRect.height / 2 + elmtToPositionAgainstRect.top + scrollY;
                } else if (posSettings.at.match(/bottom/i)) {
                    atYcorrection = elmtToPositionAgainstRect.height + elmtToPositionAgainstRect.top + scrollY;
                } else {
                    atYcorrection = elmtToPositionAgainstRect.top + scrollY;
                }

                calculatedPosition.left = atXcorrection - myXcorrection - parseFloat(parentContainerStyles.borderLeftWidth);
                calculatedPosition.top = atYcorrection - myYcorrection - parseFloat(parentContainerStyles.borderTopWidth);
            }

            // SCENARIO 3 - // panel appended to other element than body and positioned relative to its container
            else if (parentContainerTagName !== 'body' && (posSettings.of === 'window' || !posSettings.of)) {
                    // calc corrections to position panel relative to parentContainer content-box, not border-box
                    var pContainerLRBorderWidth = parseFloat(parentContainerStyles.borderLeftWidth) + parseFloat(parentContainerStyles.borderRightWidth),
                        pContainerTBBorderWidth = parseFloat(parentContainerStyles.borderTopWidth) + parseFloat(parentContainerStyles.borderBottomWidth);

                    // calc left corrections due to parent container width
                    if (posSettings.at.match(/^center-top$|^center$|^center-bottom$/i)) {
                        atXcorrection = parentContainerRect.width / 2 - pContainerLRBorderWidth / 2;
                    } else if (posSettings.at.match(/right/i)) {
                        atXcorrection = parentContainerRect.width - pContainerLRBorderWidth;
                    }
                    // calc top corrections due to parent container height
                    if (posSettings.at.match(/^left-center$|^center$|^right-center$/i)) {
                        atYcorrection = parentContainerRect.height / 2 - pContainerTBBorderWidth / 2;
                    } else if (posSettings.at.match(/bottom/i)) {
                        atYcorrection = parentContainerRect.height - pContainerTBBorderWidth;
                    }

                    calculatedPosition.left = atXcorrection - myXcorrection;
                    calculatedPosition.top = atYcorrection - myYcorrection;
                }

                // SCENARIO 4 - panel appended to other element than body and positioned relative to an element within its container
                else if (parentContainerTagName !== 'body' && parentContainer.contains(elmtToPositionAgainst)) {
                        var _elmtToPositionAgainstRect = elmtToPositionAgainst.getBoundingClientRect();

                        // calc left corrections due to position and size of elmtToPositionAgainst
                        if (posSettings.at.match(/^center-top$|^center$|^center-bottom$/i)) {
                            atXcorrection = _elmtToPositionAgainstRect.left - parentContainerRect.left + _elmtToPositionAgainstRect.width / 2;
                        } else if (posSettings.at.match(/right/i)) {
                            atXcorrection = _elmtToPositionAgainstRect.left - parentContainerRect.left + _elmtToPositionAgainstRect.width;
                        } else {
                            atXcorrection = _elmtToPositionAgainstRect.left - parentContainerRect.left;
                        }
                        // calc top corrections due to position and size of elmtToPositionAgainst
                        if (posSettings.at.match(/^left-center$|^center$|^right-center$/i)) {
                            atYcorrection = _elmtToPositionAgainstRect.top - parentContainerRect.top + _elmtToPositionAgainstRect.height / 2;
                        } else if (posSettings.at.match(/bottom/i)) {
                            atYcorrection = _elmtToPositionAgainstRect.top - parentContainerRect.top + _elmtToPositionAgainstRect.height;
                        } else {
                            atYcorrection = _elmtToPositionAgainstRect.top - parentContainerRect.top;
                        }

                        calculatedPosition.left = atXcorrection - myXcorrection - parseFloat(parentContainerStyles.borderLeftWidth);
                        calculatedPosition.top = atYcorrection - myYcorrection - parseFloat(parentContainerStyles.borderTopWidth);
                    }

        // autoposition panels only if ...
        if (posSettings.autoposition && posSettings.my === posSettings.at && ['left-top', 'center-top', 'right-top', 'left-bottom', 'center-bottom', 'right-bottom'].indexOf(posSettings.my) >= 0) {
            // add class with position and autoposition direction
            var newClass = posSettings.my + '-' + posSettings.autoposition.toLowerCase();
            elmtToPosition.classList.add(newClass);

            // get all panels with same class
            var newClassAll = Array.prototype.slice.call(document.querySelectorAll('.' + newClass)),
                ownIndex = newClassAll.indexOf(elmtToPosition);

            // if more than 1 position new panel
            if (newClassAll.length > 1) {
                if (posSettings.autoposition === 'down') {
                    // collect heights of all elmts to calc new top position
                    newClassAll.forEach(function (item, index) {
                        if (index > 0 && index <= ownIndex) {
                            calculatedPosition.top += newClassAll[--index].getBoundingClientRect().height + jsPanel.autopositionSpacing;
                        }
                    });
                } else if (posSettings.autoposition === 'up') {
                    newClassAll.forEach(function (item, index) {
                        if (index > 0 && index <= ownIndex) {
                            calculatedPosition.top -= newClassAll[--index].getBoundingClientRect().height + jsPanel.autopositionSpacing;
                        }
                    });
                } else if (posSettings.autoposition === 'right') {
                    // collect widths of all elmts to calc new left position
                    newClassAll.forEach(function (item, index) {
                        if (index > 0 && index <= ownIndex) {
                            calculatedPosition.left += newClassAll[--index].getBoundingClientRect().width + jsPanel.autopositionSpacing;
                        }
                    });
                } else if (posSettings.autoposition === 'left') {
                    newClassAll.forEach(function (item, index) {
                        if (index > 0 && index <= ownIndex) {
                            calculatedPosition.left -= newClassAll[--index].getBoundingClientRect().width + jsPanel.autopositionSpacing;
                        }
                    });
                }
            }
        }

        // apply minLeft, minTop, maxLeft and maxTop values (need to be numbers)
        if ((posSettings.minLeft || posSettings.minLeft === 0) && typeof posSettings.minLeft === 'number' && calculatedPosition.left < posSettings.minLeft) {
            calculatedPosition.left = posSettings.minLeft;
        }
        if ((posSettings.maxLeft || posSettings.maxLeft === 0) && typeof posSettings.maxLeft === 'number' && calculatedPosition.left > posSettings.maxLeft) {
            calculatedPosition.left = posSettings.maxLeft;
        }
        if ((posSettings.minTop || posSettings.minTop === 0) && typeof posSettings.minTop === 'number' && calculatedPosition.top < posSettings.minTop) {
            calculatedPosition.top = posSettings.minTop;
        }
        if ((posSettings.maxTop || posSettings.maxTop === 0) && typeof posSettings.maxTop === 'number' && calculatedPosition.top > posSettings.maxTop) {
            calculatedPosition.top = posSettings.maxTop;
        }

        if (typeof posSettings.modify === 'function') {
            calculatedPosition = posSettings.modify.call(calculatedPosition, calculatedPosition);
            // inside the function 'this' refers to the object 'newCoords'
            // option.modify is optional. If present has to be a function returning an object with the keys 'left' and 'top' and values have to be numbers
        }

        // finally apply offsets and position panel
        if (typeof posSettings.offsetX === 'number') {
            posSettings.offsetX += 'px';
        }
        if (typeof posSettings.offsetY === 'number') {
            posSettings.offsetY += 'px';
        }
        elmtToPosition.style.left = 'calc(' + calculatedPosition.left + 'px + ' + posSettings.offsetX + ')';
        elmtToPosition.style.top = 'calc(' + calculatedPosition.top + 'px + ' + posSettings.offsetY + ')';
        elmtToPosition.style.opacity = 1;

        // convert css calc values to pixel values - this is required by dragit and resizeit
        elmtToPosition.style.left = window.getComputedStyle(elmtToPosition).left;
        elmtToPosition.style.top = window.getComputedStyle(elmtToPosition).top;

        return elmtToPosition;
    },
    rgbToHsl: function rgbToHsl(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            h = void 0,
            s = void 0,
            l = (max + min) / 2;
        if (max === min) {
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        //return [ h, s, l ];
        h = h * 360;
        s = s * 100 + '%';
        l = l * 100 + '%';
        return { css: 'hsl(' + h + ',' + s + ',' + l + ')', h: h, s: s, l: l };
    },
    rgbToHex: function rgbToHex(r, g, b) {
        var red = Number(r).toString(16),
            green = Number(g).toString(16),
            blue = Number(b).toString(16);
        if (red.length === 1) {
            red = '0' + red;
        }
        if (green.length === 1) {
            green = '0' + green;
        }
        if (blue.length === 1) {
            blue = '0' + blue;
        }
        return '#' + red + green + blue;
    },
    removeSnapAreas: function removeSnapAreas(panel) {
        document.querySelectorAll('.jsPanel-snap-area').forEach(function (el) {
            if (panel.parentNode) {
                panel.parentNode.removeChild(el);
            }
        });
    },
    resetZi: function resetZi() {
        this.zi = function () {
            var startValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsPanel.ziBase;

            var val = startValue;
            return { next: function next() {
                    return val++;
                } };
        }();
        Array.prototype.slice.call(document.querySelectorAll('.jsPanel-standard')).sort(function (a, b) {
            return a.style.zIndex - b.style.zIndex;
        }).forEach(function (panel) {
            panel.style.zIndex = jsPanel.zi.next();
        });
    },
    resizeit: function resizeit(elmt) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var opts = Object.assign({}, this.defaults.resizeit, options),
            elmtParent = elmt.parentElement,
            elmtParentTagName = elmtParent.tagName.toLowerCase(),
            maxWidth = typeof opts.maxWidth === 'function' ? opts.maxWidth() : opts.maxWidth || 10000,
            maxHeight = typeof opts.maxHeight === 'function' ? opts.maxHeight() : opts.maxHeight || 10000,
            minWidth = typeof opts.minWidth === 'function' ? opts.minWidth() : opts.minWidth,
            minHeight = typeof opts.minHeight === 'function' ? opts.minHeight() : opts.minHeight,
            resizestart = new CustomEvent('resizestart', { detail: elmt.id }),
            resize = new CustomEvent('resize', { detail: elmt.id }),
            resizestop = new CustomEvent('resizestop', { detail: elmt.id });
        var containment = void 0,
            resizePanel = void 0,
            resizestarted = void 0,
            w = void 0,
            h = void 0,
            frames = [];

        // normalize containment config
        containment = this.pOcontainment(opts.containment);

        opts.handles.split(',').forEach(function (item) {
            var node = document.createElement('DIV');
            node.className = 'jsPanel-resizeit-handle jsPanel-resizeit-' + item.trim();
            node.style.zIndex = 90;
            elmt.append(node);
        });

        Array.prototype.slice.call(elmt.getElementsByClassName('jsPanel-resizeit-handle')).forEach(function (handle) {

            jsPanel.pointerdown.forEach(function (item) {
                handle.addEventListener(item, function (e) {
                    // prevent window scroll while resizing elmt
                    e.preventDefault();

                    frames = document.querySelectorAll('iframe');
                    if (frames.length) {
                        frames.forEach(function (item) {
                            item.style.pointerEvents = 'none';
                        });
                    }

                    var elmtRect = elmt.getBoundingClientRect(),
                        /* needs to be calculated on pointerdown!! */
                    elmtParentRect = elmtParent.getBoundingClientRect(),
                        /* needs to be calculated on pointerdown!! */
                    elmtParentStyles = window.getComputedStyle(elmtParent, null),
                        elmtParentBLW = parseInt(elmtParentStyles.borderLeftWidth, 10),
                        elmtParentBTW = parseInt(elmtParentStyles.borderTopWidth, 10),
                        elmtParentPosition = elmtParentStyles.getPropertyValue('position'),
                        startX = e.clientX || e.touches[0].clientX,
                        startY = e.clientY || e.touches[0].clientY,
                        startWidth = elmtRect.width,
                        startHeight = elmtRect.height,
                        resizeHandleClassList = e.target.classList;
                    var startLeft = elmtRect.left,
                        startTop = elmtRect.top,
                        maxWidthEast = 10000,
                        maxWidthWest = 10000,
                        maxHeightSouth = 10000,
                        maxHeightNorth = 10000;

                    // important if content contains another document
                    elmt.content.style.pointerEvents = 'none';

                    if (elmtParentTagName !== 'body') {
                        startLeft = elmtRect.left - elmtParentRect.left + elmtParent.scrollLeft;
                        startTop = elmtRect.top - elmtParentRect.top + elmtParent.scrollTop;
                    }

                    // calc min/max left/top values if containment is set - code from jsDraggable
                    if (elmtParentTagName === 'body' && containment) {
                        maxWidthEast = document.documentElement.clientWidth - elmtRect.left;
                        maxHeightSouth = document.documentElement.clientHeight - elmtRect.top;
                        maxWidthWest = elmtRect.width + elmtRect.left;
                        maxHeightNorth = elmtRect.height + elmtRect.top;
                    } else {
                        // if panel is NOT in body
                        if (containment) {
                            if (elmtParentPosition === 'static') {
                                maxWidthEast = elmtParentRect.width - elmtRect.left + elmtParentBLW;
                                maxHeightSouth = elmtParentRect.height + elmtParentRect.top - elmtRect.top + elmtParentBTW;
                                maxWidthWest = elmtRect.width + (elmtRect.left - elmtParentRect.left) - elmtParentBLW;
                                maxHeightNorth = elmtRect.height + (elmtRect.top - elmtParentRect.top) - elmtParentBTW;
                            } else {
                                maxWidthEast = elmtParent.clientWidth - (elmtRect.left - elmtParentRect.left) + elmtParentBLW;
                                maxHeightSouth = elmtParent.clientHeight - (elmtRect.top - elmtParentRect.top) + elmtParentBTW;
                                maxWidthWest = elmtRect.width + (elmtRect.left - elmtParentRect.left) - elmtParentBLW;
                                maxHeightNorth = elmt.clientHeight + (elmtRect.top - elmtParentRect.top) - elmtParentBTW;
                            }
                        }
                    }
                    // if original opts.containment is array
                    if (containment) {
                        maxWidthWest -= containment[3];
                        maxHeightNorth -= containment[0];
                        maxWidthEast -= containment[1];
                        maxHeightSouth -= containment[2];
                    }

                    // calculate corrections for rotated panels
                    var computedStyle = window.getComputedStyle(elmt);
                    var wDif = parseFloat(computedStyle.width) - elmtRect.width,
                        hDif = parseFloat(computedStyle.height) - elmtRect.height,
                        xDif = parseFloat(computedStyle.left) - elmtRect.left,
                        yDif = parseFloat(computedStyle.top) - elmtRect.top;
                    if (elmtParent !== document.body) {
                        xDif += elmtParentRect.left;
                        yDif += elmtParentRect.top;
                    }

                    resizePanel = function resizePanel(evt) {
                        // trigger resizestarted only once per resize
                        if (!resizestarted) {
                            document.dispatchEvent(resizestart);
                            if (typeof opts.start === 'function') {
                                opts.start.call(elmt, elmt, { width: startWidth, height: startHeight });
                            }
                            jsPanel.front(elmt);
                        }
                        resizestarted = 1;
                        // trigger resize permanently while resizing
                        document.dispatchEvent(resize);

                        if (resizeHandleClassList.contains('jsPanel-resizeit-e') || resizeHandleClassList.contains('jsPanel-resizeit-se') || resizeHandleClassList.contains('jsPanel-resizeit-ne')) {

                            w = startWidth + (evt.clientX || evt.touches[0].clientX) - startX + wDif;
                            if (w >= maxWidthEast) {
                                w = maxWidthEast;
                            }
                            if (w >= maxWidth) {
                                w = maxWidth;
                            } else if (w <= minWidth) {
                                w = minWidth;
                            }
                            elmt.style.width = w + 'px';
                        }

                        if (resizeHandleClassList.contains('jsPanel-resizeit-s') || resizeHandleClassList.contains('jsPanel-resizeit-se') || resizeHandleClassList.contains('jsPanel-resizeit-sw')) {

                            h = startHeight + (evt.clientY || evt.touches[0].clientY) - startY + hDif;
                            if (h >= maxHeightSouth) {
                                h = maxHeightSouth;
                            }
                            if (h >= maxHeight) {
                                h = maxHeight;
                            } else if (h <= minHeight) {
                                h = minHeight;
                            }
                            elmt.style.height = h + 'px';
                        }

                        if (resizeHandleClassList.contains('jsPanel-resizeit-w') || resizeHandleClassList.contains('jsPanel-resizeit-nw') || resizeHandleClassList.contains('jsPanel-resizeit-sw')) {

                            w = startWidth + startX - (evt.clientX || evt.touches[0].clientX) + wDif;
                            if (w <= maxWidth && w >= minWidth && w <= maxWidthWest) {
                                elmt.style.left = startLeft + (evt.clientX || evt.touches[0].clientX) - startX + xDif + 'px';
                            }
                            if (w >= maxWidthWest) {
                                w = maxWidthWest;
                            }
                            if (w >= maxWidth) {
                                w = maxWidth;
                            } else if (w <= minWidth) {
                                w = minWidth;
                            }
                            elmt.style.width = w + 'px';
                        }

                        if (resizeHandleClassList.contains('jsPanel-resizeit-n') || resizeHandleClassList.contains('jsPanel-resizeit-nw') || resizeHandleClassList.contains('jsPanel-resizeit-ne')) {

                            h = startHeight + startY - (evt.clientY || evt.touches[0].clientY) + hDif;
                            if (h <= maxHeight && h >= minHeight && h <= maxHeightNorth) {
                                elmt.style.top = startTop + (evt.clientY || evt.touches[0].clientY) - startY + yDif + 'px';
                            }
                            if (h >= maxHeightNorth) {
                                h = maxHeightNorth;
                            }
                            if (h >= maxHeight) {
                                h = maxHeight;
                            } else if (h <= minHeight) {
                                h = minHeight;
                            }
                            elmt.style.height = h + 'px';
                        }

                        if (elmt) {
                            elmt.contentResize();
                        }

                        window.getSelection().removeAllRanges();

                        // get current position and size values while resizing
                        var styles = window.getComputedStyle(elmt),
                            values = {
                            left: parseFloat(styles.left),
                            top: parseFloat(styles.top),
                            right: parseFloat(styles.right),
                            bottom: parseFloat(styles.bottom),
                            width: parseFloat(styles.width),
                            height: parseFloat(styles.height)
                        };

                        // callback while resizing
                        if (typeof opts.resize === 'function') {
                            opts.resize.call(elmt, elmt, values);
                        }
                    };

                    jsPanel.pointermove.forEach(function (item) {
                        document.addEventListener(item, resizePanel, false);
                    });

                    // remove resize handler when mouse leaves browser window (mouseleave doesn't work)
                    window.addEventListener('mouseout', function (e) {
                        if (e.relatedTarget === null) {
                            jsPanel.pointermove.forEach(function (item) {
                                document.removeEventListener(item, resizePanel, false);
                            });
                        }
                    }, false);
                });
            });
        });

        jsPanel.pointerup.forEach(function (item) {
            document.addEventListener(item, function (e) {

                jsPanel.pointermove.forEach(function (item) {
                    document.removeEventListener(item, resizePanel, false);
                });

                if (e.target.classList && e.target.classList.contains('jsPanel-resizeit-handle')) {

                    var isLeftChange = void 0,
                        isTopChange = void 0;
                    var cl = e.target.className;
                    if (cl.match(/jsPanel-resizeit-nw|jsPanel-resizeit-w|jsPanel-resizeit-sw/i)) {
                        isLeftChange = true;
                    }
                    if (cl.match(/jsPanel-resizeit-nw|jsPanel-resizeit-n|jsPanel-resizeit-ne/i)) {
                        isTopChange = true;
                    }

                    // snap panel to grid (doesn't work that well if inside function resizePanel)
                    if (opts.grid && Array.isArray(opts.grid)) {
                        if (opts.grid.length === 1) {
                            opts.grid[1] = opts.grid[0];
                        }
                        var cw = parseFloat(elmt.style.width),
                            ch = parseFloat(elmt.style.height),
                            modW = cw % opts.grid[0],
                            modH = ch % opts.grid[1],
                            cx = parseFloat(elmt.style.left),
                            cy = parseFloat(elmt.style.top),
                            modX = cx % opts.grid[0],
                            modY = cy % opts.grid[1];

                        if (modW < opts.grid[0] / 2) {
                            elmt.style.width = cw - modW + 'px';
                        } else {
                            elmt.style.width = cw + (opts.grid[0] - modW) + 'px';
                        }
                        if (modH < opts.grid[1] / 2) {
                            elmt.style.height = ch - modH + 'px';
                        } else {
                            elmt.style.height = ch + (opts.grid[1] - modH) + 'px';
                        }

                        if (isLeftChange) {
                            if (modX < opts.grid[0] / 2) {
                                elmt.style.left = cx - modX + 'px';
                            } else {
                                elmt.style.left = cx + (opts.grid[0] - modX) + 'px';
                            }
                        }
                        if (isTopChange) {
                            if (modY < opts.grid[1] / 2) {
                                elmt.style.top = cy - modY + 'px';
                            } else {
                                elmt.style.top = cy + (opts.grid[1] - modY) + 'px';
                            }
                        }
                    }

                    if (elmt) {
                        elmt.contentResize();
                    }
                }

                if (resizestarted) {
                    elmt.content.style.pointerEvents = 'inherit';
                    document.dispatchEvent(resizestop);
                    resizestarted = undefined;
                    elmt.saveCurrentDimensions();
                    if (typeof opts.stop === 'function') {
                        opts.stop.call(elmt, elmt, { width: parseFloat(elmt.style.width), height: parseFloat(elmt.style.height) });
                    }
                }

                if (frames.length) {
                    frames.forEach(function (item) {
                        item.style.pointerEvents = 'inherit';
                    });
                }
            }, false);
        });

        // resizeit is initialized - now disable if set
        if (opts.disable) {
            elmt.querySelectorAll('.jsPanel-resizeit-handle').forEach(function (handle) {
                handle.style.pointerEvents = 'none';
            });
        }

        return elmt;
    },
    setClass: function setClass(elmt, classnames) {
        classnames.split(' ').forEach(function (item) {
            return elmt.classList.add(item);
        });
        return elmt;
    },
    remClass: function remClass(elmt, classnames) {
        classnames.split(' ').forEach(function (item) {
            return elmt.classList.remove(item);
        });
        return elmt;
    },
    setStyle: function setStyle(elmt, stylesobject) {
        for (var prop in stylesobject) {
            if (stylesobject.hasOwnProperty(prop)) {
                var property = String(prop).replace(/-\w/gi, function (match) {
                    return match.substr(-1).toUpperCase();
                });
                elmt.style[property] = stylesobject[prop];
            }
        }
        return elmt;
    },
    snapPanel: function snapPanel(panel, pos) {
        // store panel size before it snaps
        panel.currentData.beforeSnap = {
            width: panel.currentData.width,
            height: panel.currentData.height
        };
        // snap panel
        if (pos && typeof pos === 'function') {
            pos.call(panel, panel, panel.snappableTo);
        } else if (pos !== false) {
            var offsets = [0, 0];
            if (panel.options.dragit.snap.containment) {
                if (panel.options.dragit.containment) {
                    var containment = this.pOcontainment(panel.options.dragit.containment),
                        position = panel.snappableTo;
                    if (position.startsWith('left')) {
                        offsets[0] = containment[3];
                    } else if (position.startsWith('right')) {
                        offsets[0] = -containment[1];
                    }
                    if (position.endsWith('top')) {
                        offsets[1] = containment[0];
                    } else if (position.endsWith('bottom')) {
                        offsets[1] = -containment[2];
                    }
                }
            }
            panel.reposition(panel.snappableTo + ' ' + offsets[0] + ' ' + offsets[1]);
            panel.snapped = panel.snappableTo;
        }
    },


    // METHOD CREATING THE PANEL ---------------------------------------------
    create: function create() {
        var _this = this;

        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var cb = arguments[1];


        var opts = void 0,
            closetimer = void 0;
        if (options.config) {
            opts = Object.assign({}, this.defaults, options.config, options);
            delete opts.config;
        } else {
            opts = Object.assign({}, this.defaults, options);
        }
        if (!opts.id) {
            opts.id = 'jsPanel-' + (jsPanel.idCounter += 1);
        } else if (typeof opts.id === 'function') {
            opts.id = opts.id();
        }
        var p = document.getElementById(opts.id);
        if (p !== null) {
            // if a panel with passed id already exists, front it and return error object
            if (p.classList.contains('jsPanel')) {
                p.front();
            }
            var error = new jsPanelError('\nNO NEW PANEL CREATED!\nAn element with the ID <' + opts.id + '> already exists in the document.');
            try {
                throw error;
            } catch (e) {
                if (cb) {
                    cb.call(e, e);
                }
            }
            return console.error(error.name + ':', error.message);
        }

        // check whether container is valid -> if not return and log error
        var panelContainer = this.pOcontainer(opts.container, cb);
        if (panelContainer && panelContainer.message) {
            return console.error(panelContainer.name + ':', panelContainer.message);
        }

        // normalize maximizedMargin
        opts.maximizedMargin = this.pOcontainment(opts.maximizedMargin);

        // normalize snap config
        if (opts.dragit && opts.dragit.snap) {
            if (_typeof(opts.dragit.snap) === 'object') {
                opts.dragit.snap = Object.assign({}, this.defaultSnapConfig, opts.dragit.snap);
            } else {
                opts.dragit.snap = this.defaultSnapConfig;
            }
        }

        opts.template = opts.template || false;

        var self = opts.template ? opts.template : this.createPanelTemplate();

        // Properties
        self.options = opts;
        self.status = 'initialized';
        self.currentData = {};
        self.header = self.querySelector('.jsPanel-hdr'); // complete header section
        self.headerbar = self.header.querySelector('.jsPanel-headerbar'); // log, title and controls
        self.titlebar = self.header.querySelector('.jsPanel-titlebar'); // div surrounding title h3
        self.headerlogo = self.headerbar.querySelector('.jsPanel-headerlogo'); // logo only
        self.headertitle = self.headerbar.querySelector('.jsPanel-title'); // title h3
        self.controlbar = self.headerbar.querySelector('.jsPanel-controlbar'); // div surrounding all controls
        self.headertoolbar = self.header.querySelector('.jsPanel-hdr-toolbar');
        self.content = self.querySelector('.jsPanel-content');
        self.footer = self.querySelector('.jsPanel-ftr');
        self.snappableTo = false;
        self.snapped = false;

        // Events
        var jspanelloaded = new CustomEvent('jspanelloaded', { 'detail': opts.id }),
            jspanelbeforeclose = new CustomEvent('jspanelbeforeclose', { 'detail': opts.id }),
            jspanelclosed = new CustomEvent('jspanelclosed', { 'detail': opts.id }),
            jspanelstatuschange = new CustomEvent('jspanelstatuschange', { 'detail': opts.id }),
            jspanelbeforenormalize = new CustomEvent('jspanelbeforenormalize', { 'detail': opts.id }),
            jspanelnormalized = new CustomEvent('jspanelnormalized', { 'detail': opts.id }),
            jspanelbeforemaximize = new CustomEvent('jspanelbeforemaximize', { 'detail': opts.id }),
            jspanelmaximized = new CustomEvent('jspanelmaximized', { 'detail': opts.id }),
            jspanelbeforeminimize = new CustomEvent('jspanelbeforeminimize', { 'detail': opts.id }),
            jspanelminimized = new CustomEvent('jspanelminimized', { 'detail': opts.id }),
            jspanelbeforesmallify = new CustomEvent('jspanelbeforesmallify', { 'detail': opts.id }),
            jspanelsmallified = new CustomEvent('jspanelsmallified', { 'detail': opts.id }),
            jspanelsmallifiedmax = new CustomEvent('jspanelsmallifiedmax', { 'detail': opts.id }),
            jspanelbeforeunsmallify = new CustomEvent('jspanelbeforeunsmallify', { 'detail': opts.id }),
            jspanelfronted = new CustomEvent('jspanelfronted', { 'detail': opts.id });

        // controls handlers
        var hasCloseBtn = self.querySelector('.jsPanel-btn-close'),
            hasMaxBtn = self.querySelector('.jsPanel-btn-maximize'),
            hasNormBtn = self.querySelector('.jsPanel-btn-normalize'),
            hasSmallBtn = self.querySelector('.jsPanel-btn-smallify'),
            hasSmallrevBtn = self.querySelector('.jsPanel-btn-smallifyrev'),
            hasMinBtn = self.querySelector('.jsPanel-btn-minimize');

        if (hasCloseBtn) {
            jsPanel.pointerup.forEach(function (item) {
                hasCloseBtn.addEventListener(item, function (e) {
                    e.preventDefault();
                    self.close();
                });
            });
        }
        if (hasMaxBtn) {
            jsPanel.pointerup.forEach(function (item) {
                hasMaxBtn.addEventListener(item, function (e) {
                    e.preventDefault();
                    self.maximize();
                });
            });
        }
        if (hasNormBtn) {
            jsPanel.pointerup.forEach(function (item) {
                hasNormBtn.addEventListener(item, function (e) {
                    e.preventDefault();
                    self.normalize();
                });
            });
        }
        if (hasSmallBtn) {
            jsPanel.pointerup.forEach(function (item) {
                hasSmallBtn.addEventListener(item, function (e) {
                    e.preventDefault();
                    self.smallify();
                });
            });
        }
        if (hasSmallrevBtn) {
            jsPanel.pointerup.forEach(function (item) {
                hasSmallrevBtn.addEventListener(item, function (e) {
                    e.preventDefault();
                    self.unsmallify();
                });
            });
        }
        if (hasMinBtn) {
            jsPanel.pointerup.forEach(function (item) {
                hasMinBtn.addEventListener(item, function (e) {
                    e.preventDefault();
                    self.minimize();
                });
            });
        }

        // import extensions
        var extensions = jsPanel.extensions;
        for (var ext in extensions) {
            if (extensions.hasOwnProperty(ext)) {
                self[ext] = extensions[ext];
            }
        }

        // Methods
        self.addToolbar = function (place, tb, callback) {
            if (place === 'header') {
                place = self.headertoolbar;
            } else if (place === 'footer') {
                place = self.footer;
            }

            if (typeof tb === 'string') {
                place.innerHTML = tb;
            } else if (Array.isArray(tb)) {
                tb.forEach(function (item) {
                    if (typeof item === 'string') {
                        place.innerHTML += item;
                    } else {
                        place.append(item);
                    }
                });
            } else if (typeof tb === 'function') {
                var tool = tb.call(self, self);
                if (typeof tool === 'string') {
                    place.innerHTML = tool;
                } else {
                    place.append(tool);
                }
            } else {
                place.append(tb);
            }

            place.classList.add('active');
            if (place === self.footer) {
                self.content.classList.remove('jsPanel-content-nofooter');
            }
            self.contentResize();
            if (callback) {
                callback.call(self, self);
            }
            return self;
        };

        self.applyBuiltInTheme = function (themeDetails) {
            self.classList.add('jsPanel-theme-' + themeDetails.color); // do not remove theme from jsP
            self.header.classList.add('jsPanel-theme-' + themeDetails.color);

            // optionally set theme filling
            if (themeDetails.filling) {
                self.content.style.background = '';
                self.content.classList.add('jsPanel-content-' + themeDetails.filling);
            }

            if (!opts.headerToolbar) {
                self.content.style.background = '';
                self.content.style.borderTop = '1px solid ' + self.headertitle.style.color;
            }

            return self;
        };

        self.applyArbitraryTheme = function (themeDetails) {
            self.header.style.backgroundColor = themeDetails.colors[0];
            ['.jsPanel-headerlogo', '.jsPanel-title', '.jsPanel-hdr-toolbar'].forEach(function (item) {
                self.querySelector(item).style.color = themeDetails.colors[3];
            }, self);
            self.querySelectorAll('.jsPanel-controlbar .jsPanel-btn .jsglyph').forEach(function (item) {
                item.style.color = themeDetails.colors[3];
            });

            if (opts.headerToolbar) {
                jsPanel.setStyle(self.headertoolbar, {
                    boxShadow: '0 0 1px ' + themeDetails.colors[3] + ' inset',
                    width: 'calc(100% + 4px)',
                    marginLeft: '-1px'
                });
            } else {
                self.content.style.borderTop = '1px solid ' + themeDetails.colors[3];
            }

            if (themeDetails.filling === 'filled') {
                self.content.style.backgroundColor = themeDetails.colors[0];
                self.content.style.color = themeDetails.colors[3];
            } else if (themeDetails.filling === 'filledlight') {
                self.content.style.backgroundColor = themeDetails.colors[1];
            }

            return self;
        };

        self.applyBootstrapTheme = function (themeDetails) {
            var bsTheme = themeDetails.bstheme,
                bsVersion = $.fn.button.Constructor.VERSION[0];

            if (bsVersion === '4') {
                self.classList.add('bg-' + bsTheme);
            } else {
                ['panel', 'panel-' + bsTheme].forEach(function (item) {
                    self.classList.add(item);
                });
                self.header.classList.add('panel-heading');
            }

            // added support for material-design-for-bootstrap 4.x colors
            if (themeDetails.bs === 'mdb') {
                var mdbColor = bsTheme + '-color';
                if (themeDetails.mdbStyle) {
                    mdbColor = mdbColor + '-dark';
                }
                self.classList.add(mdbColor);
            }

            // get primary theme color
            var pColor = void 0;
            if (bsVersion === '4') {
                pColor = window.getComputedStyle(self).backgroundColor.replace(/\s+/g, '');
            } else {
                pColor = window.getComputedStyle(self.header).backgroundColor.replace(/\s+/g, '');
            }

            if (themeDetails.filling) {
                self.setTheme(pColor + ' ' + themeDetails.filling);
            } else {
                self.setTheme(pColor);
            }

            return self;
        };

        self.applyThemeBorder = function (themeDetails) {
            var bordervalues = opts.border.split(' ');
            self.style.borderWidth = bordervalues[0];
            self.style.borderStyle = bordervalues[1];
            self.style.borderColor = bordervalues[2];
            self.header.style.borderTopLeftRadius = '1px';
            self.header.style.borderTopRightRadius = '1px';
            if (!themeDetails.bs) {
                if (jsPanel.themes.indexOf(themeDetails.color) === -1) {
                    // arbitrary themes only (for built-in themes it's taken from the css file)
                    bordervalues[2] ? self.style.borderColor = bordervalues[2] : self.style.borderColor = themeDetails.colors[0];
                }
            } else {
                // bootstrap
                var pColor = void 0;
                if (window.getComputedStyle(self.header).backgroundColor === 'transparent') {
                    pColor = window.getComputedStyle(self).backgroundColor.replace(/\s+/g, '');
                } else {
                    pColor = window.getComputedStyle(self.header).backgroundColor.replace(/\s+/g, '');
                }
                bordervalues[2] ? self.style.borderColor = bordervalues[2] : self.style.borderColor = pColor;
            }
            return self;
        };

        self.autopositionRemaining = function () {
            var autoPos = void 0;
            ['left-top-down', 'left-top-right', 'center-top-down', 'right-top-down', 'right-top-left', 'left-bottom-up', 'left-bottom-right', 'center-bottom-up', 'right-bottom-up', 'right-bottom-left'].forEach(function (item) {
                if (self.classList.contains(item)) {
                    autoPos = item;
                }
            });
            if (autoPos) {
                opts.container.querySelectorAll('.' + autoPos).forEach(function (item) {
                    item.reposition();
                });
            }
        };

        self.calcSizeFactors = function () {
            var styles = window.getComputedStyle(self);
            if (opts.container === document.body) {
                self.hf = parseFloat(self.style.left) / (document.body.clientWidth - parseFloat(self.style.width));
                self.vf = parseFloat(self.style.top) / (window.innerHeight - parseFloat(styles.height));
            } else {
                var parentStyles = window.getComputedStyle(self.parentElement);
                self.hf = parseFloat(self.style.left) / (parseFloat(parentStyles.width) - parseFloat(self.style.width));
                self.vf = parseFloat(self.style.top) / (parseFloat(parentStyles.height) - parseFloat(styles.height));
            }
        };

        self.clearTheme = function (callback) {
            jsPanel.themes.concat(jsPanel.mdbthemes).forEach(function (value) {
                ['panel', 'jsPanel-theme-' + value, 'panel-' + value, value + '-color'].forEach(function (item) {
                    self.classList.remove(item);
                });
                self.header.classList.remove('panel-heading', 'jsPanel-theme-' + value);
            }, self);
            self.headertitle.classList.remove('panel-title');
            self.content.classList.remove('panel-body', 'jsPanel-content-filled', 'jsPanel-content-filledlight');
            self.footer.classList.remove('panel-footer');
            jsPanel.setStyle(self, { backgroundColor: '', borderWidth: '', borderStyle: '', borderColor: '' });
            jsPanel.setStyle(self.content, { background: '', border: '' });
            jsPanel.setStyle(self.headertoolbar, { boxShadow: '', width: '', marginLeft: '' });
            self.header.style.background = '';
            Array.prototype.slice.call(self.controlbar.querySelectorAll('.jsglyph')).concat([self.headerlogo, self.headertitle, self.headertoolbar, self.content]).forEach(function (item) {
                item.style.color = '';
            });

            if (callback) {
                callback.call(self, self);
            }
            return self;
        };

        self.close = function (callback) {

            var doClose = function doClose() {
                var panelId = opts.id;

                if (closetimer) {
                    window.clearTimeout(closetimer);
                }

                self.closeChildpanels();
                if (self.parentNode) {
                    self.parentNode.removeChild(self);
                }
                // return false if panel was not removed from dom
                if (document.getElementById(panelId)) {
                    return false;
                }
                self.removeMinimizedReplacement();
                document.dispatchEvent(jspanelclosed);

                if (callback) {
                    callback.call(panelId, panelId);
                }

                if (opts.onclosed) {
                    opts.onclosed.call(panelId, panelId);
                }

                // if panel is autopositioned reposition remaining autopositioned panels
                self.autopositionRemaining();
            };

            document.dispatchEvent(jspanelbeforeclose);

            if (opts.onbeforeclose && opts.onbeforeclose.call(self, self) === false) {
                return self;
            }

            if (opts.animateOut) {
                if (opts.animateIn) {
                    jsPanel.remClass(self, opts.animateIn);
                }
                jsPanel.setClass(self, opts.animateOut);
                self.addEventListener('animationend', function () {
                    doClose();
                });
            } else {
                doClose();
            }
        };

        self.closeChildpanels = function (callback) {
            self.getChildpanels().forEach(function (item) {
                return item.close();
            });
            if (callback) {
                callback.call(self, self);
            }
            return self;
        };

        self.contentRemove = function (callback) {
            jsPanel.emptyNode(self.content);
            if (callback) {
                callback.call(self, self);
            }
            return self;
        };

        self.contentResize = function (callback) {
            var panelStyles = window.getComputedStyle(self),
                hdrStyles = window.getComputedStyle(self.header),
                ftrStyles = window.getComputedStyle(self.footer),
                hdrHeight = !opts.headerRemove ? hdrStyles.height : 0,
                ftrHeight = ftrStyles.display === 'none' ? 0 : ftrStyles.height;
            var contentHeight = parseFloat(panelStyles.height) - parseFloat(hdrHeight) - parseFloat(ftrHeight) - parseFloat(panelStyles.borderTopWidth) - parseFloat(panelStyles.borderBottomWidth);
            self.content.style.height = contentHeight + 'px';
            if (callback) {
                callback.call(self, self);
            }
            return self;
        };

        self.createMinimizedReplacement = function () {
            var tpl = jsPanel.createMinimizedTemplate(),
                color = window.getComputedStyle(self.headertitle).color,
                font = opts.iconfont,
                controlbar = tpl.querySelector('.jsPanel-controlbar');

            tpl.style.backgroundColor = window.getComputedStyle(self.header).backgroundColor === 'transparent' ? window.getComputedStyle(self).backgroundColor : window.getComputedStyle(self.header).backgroundColor;
            tpl.id = self.id + '-min';
            tpl.querySelector('.jsPanel-headerbar').replaceChild(self.headerlogo.cloneNode(true), tpl.querySelector('.jsPanel-headerlogo'));
            tpl.querySelector('.jsPanel-titlebar').replaceChild(self.headertitle.cloneNode(true), tpl.querySelector('.jsPanel-title'));
            tpl.querySelector('.jsPanel-title').style.color = color;
            controlbar.style.color = color;

            // set iconfont
            self.setIconfont(font, tpl);

            if (self.dataset.btnnormalize === 'enabled') {
                jsPanel.pointerup.forEach(function (evt) {
                    tpl.querySelector('.jsPanel-btn-normalize').addEventListener(evt, function () {
                        self.normalize().removeMinimizedReplacement();
                    });
                });
            } else {
                controlbar.querySelector('.jsPanel-btn-normalize').style.display = 'none';
            }
            if (self.dataset.btnmaximize === 'enabled') {
                jsPanel.pointerup.forEach(function (evt) {
                    tpl.querySelector('.jsPanel-btn-maximize').addEventListener(evt, function () {
                        self.maximize().removeMinimizedReplacement();
                    });
                });
            } else {
                controlbar.querySelector('.jsPanel-btn-maximize').style.display = 'none';
            }
            if (self.dataset.btnclose === 'enabled') {
                jsPanel.pointerup.forEach(function (evt) {
                    tpl.querySelector('.jsPanel-btn-close').addEventListener(evt, function () {
                        self.removeMinimizedReplacement().close();
                    });
                });
            } else {
                controlbar.querySelector('.jsPanel-btn-close').style.display = 'none';
            }

            return tpl;
        };

        self.front = function (callback) {
            jsPanel.front(self);
            document.dispatchEvent(jspanelfronted);
            if (callback) {
                callback.call(self, self);
            }
            if (opts.onfronted) {
                opts.onfronted.call(self, self);
            }
            return self;
        };

        self.getChildpanels = function () {
            return Array.prototype.slice.call(self.content.querySelectorAll('.jsPanel'));
        };

        self.getThemeDetails = function (th) {
            var passedTheme = th.toLowerCase().replace(/ /g, ''),
                theme = { color: false, colors: false, filling: false, bs: false, bstheme: false };

            if (passedTheme.substr(-6, 6) === 'filled') {
                theme.filling = 'filled';
                theme.color = passedTheme.substr(0, passedTheme.length - 6);
            } else if (passedTheme.substr(-11, 11) === 'filledlight') {
                theme.filling = 'filledlight';
                theme.color = passedTheme.substr(0, passedTheme.length - 11);
            } else {
                theme.filling = '';
                theme.color = passedTheme; // themeDetails.color is the primary color
            }
            theme.colors = jsPanel.calcColors(theme.color);

            // if first part of theme includes a "-" it's assumed to be a bootstrap theme
            if (theme.color.match('-')) {
                var bsVariant = theme.color.split('-');
                theme.bs = bsVariant[0];
                theme.bstheme = bsVariant[1];
                theme.mdbStyle = bsVariant[2] || undefined;
            }

            return theme;
        };

        self.isChildpanel = function () {
            // if panel is childpanel of another panel returns parentpanel
            var pp = self.closest('.jsPanel-content');
            return pp ? pp.parentNode : false;
        };

        self.maximize = function (callback) {
            // Note: do not disable maximize method for already maximized panels -> onwindowresize wouldn't work
            if (opts.onbeforemaximize && opts.onbeforemaximize.call(self, self) === false) {
                return self;
            }

            document.dispatchEvent(jspanelbeforemaximize);

            var parent = self.parentNode,
                margins = opts.maximizedMargin;

            if (parent === document.body) {
                // maximize within window
                self.style.width = document.documentElement.clientWidth - margins[1] - margins[3] + 'px';
                self.style.height = document.documentElement.clientHeight - margins[0] - margins[2] + 'px';
                self.style.left = margins[3] + 'px';
                self.style.top = margins[0] + 'px';

                if (!opts.position.fixed) {
                    self.style.left = window.pageXOffset + margins[3] + 'px';
                    self.style.top = window.pageYOffset + margins[0] + 'px';
                }
            } else {
                // maximize within parentNode
                self.style.width = parent.clientWidth - margins[1] - margins[3] + 'px';
                self.style.height = parent.clientHeight - margins[0] - margins[2] + 'px';
                self.style.left = margins[3] + 'px';
                self.style.top = margins[0] + 'px';
            }

            self.contentResize();
            self.removeMinimizedReplacement();
            self.status = 'maximized';
            self.setControls(['.jsPanel-btn-maximize', '.jsPanel-btn-smallifyrev']);
            jsPanel.front(self);
            document.dispatchEvent(jspanelmaximized);
            document.dispatchEvent(jspanelstatuschange);

            if (opts.onstatuschange && opts.onstatuschange.call(self, self) === false) {
                return self;
            }

            if (callback) {
                callback.call(self, self);
            }

            if (opts.onmaximized) {
                opts.onmaximized.call(self, self);
            }

            return self;
        };

        self.minimize = function (callback) {
            if (self.status === 'minimized') {
                return self;
            }

            if (opts.onbeforeminimize && opts.onbeforeminimize.call(self, self) === false) {
                return self;
            }

            document.dispatchEvent(jspanelbeforeminimize);

            // create container for minimized replacements if not already there
            if (!document.getElementById('jsPanel-replacement-container')) {
                var replacementContainer = document.createElement('div');
                replacementContainer.id = 'jsPanel-replacement-container';
                document.body.append(replacementContainer);
            }

            self.style.left = '-9999px';
            self.statusBefore = self.status;
            self.status = 'minimized';
            document.dispatchEvent(jspanelminimized);
            document.dispatchEvent(jspanelstatuschange);

            if (opts.onstatuschange && opts.onstatuschange.call(self, self) === false) {
                return self;
            }

            if (opts.minimizeTo) {
                var replacement = self.createMinimizedReplacement();
                if (opts.minimizeTo === 'default') {
                    document.getElementById('jsPanel-replacement-container').append(replacement);
                } else {
                    var container = void 0;
                    if (typeof opts.minimizeTo === 'string') {
                        if (opts.minimizeTo === 'parentpanel') {
                            var parent = self.closest('.jsPanel-content').parentNode,
                                list = parent.querySelectorAll('.jsPanel-minimized-box');
                            container = list[list.length - 1];
                        } else {
                            container = document.querySelector(opts.minimizeTo);
                        }
                    } else {
                        container = opts.minimizeTo;
                    }
                    container.append(replacement);
                }
            }

            if (callback) {
                callback.call(self, self);
            }

            if (opts.onminimized) {
                opts.onminimized.call(self, self);
            }

            return self;
        };

        self.normalize = function (callback) {
            if (self.status === 'normalized') {
                return self;
            }

            if (opts.onbeforenormalize && opts.onbeforenormalize.call(self, self) === false) {
                return self;
            }

            document.dispatchEvent(jspanelbeforenormalize);
            self.style.width = self.currentData.width;
            self.style.height = self.currentData.height;
            self.contentResize();
            self.style.left = self.currentData.left;
            self.style.top = self.currentData.top;
            self.removeMinimizedReplacement();
            self.status = 'normalized';
            self.setControls(['.jsPanel-btn-normalize', '.jsPanel-btn-smallifyrev']);
            jsPanel.front(self);
            document.dispatchEvent(jspanelnormalized);
            document.dispatchEvent(jspanelstatuschange);

            if (opts.onstatuschange && opts.onstatuschange.call(self, self) === false) {
                return self;
            }

            if (callback) {
                callback.call(self, self);
            }

            if (opts.onnormalized) {
                opts.onnormalized.call(self, self);
            }

            return self;
        };

        self.removeMinimizedReplacement = function () {
            var elmt = document.getElementById(self.id + '-min');
            if (elmt) {
                elmt.parentNode.removeChild(elmt);
            }
            return self;
        };

        self.reposition = function () {
            for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
                params[_key] = arguments[_key];
            }

            var pos = opts.position,
                updateCache = true,
                callback = void 0;
            params.forEach(function (value) {
                if (typeof value === 'string' || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
                    pos = value;
                } else if (typeof value === 'boolean') {
                    updateCache = value;
                } else if (typeof value === 'function') {
                    callback = value;
                }
            });

            jsPanel.position(self, pos);
            if (updateCache) {
                self.saveCurrentPosition();
            }
            if (callback) {
                callback.call(self, self);
            }
            return self;
        };

        self.repositionOnSnap = function (pos) {
            var offsetX = '0',
                offsetY = '0';
            var margins = jsPanel.pOcontainment(opts.dragit.containment);
            // calculate offsets
            if (opts.dragit.snap.containment) {
                if (pos === 'left-top') {
                    offsetX = margins[3];
                    offsetY = margins[0];
                } else if (pos === 'right-top') {
                    offsetX = -margins[1];
                    offsetY = margins[0];
                } else if (pos === 'right-bottom') {
                    offsetX = -margins[1];
                    offsetY = -margins[2];
                } else if (pos === 'left-bottom') {
                    offsetX = margins[3];
                    offsetY = -margins[2];
                } else if (pos === 'center-top') {
                    offsetX = margins[3] / 2 - margins[1] / 2;
                    offsetY = margins[0];
                } else if (pos === 'center-bottom') {
                    offsetX = margins[3] / 2 - margins[1] / 2;
                    offsetY = -margins[2];
                } else if (pos === 'left-center') {
                    offsetX = margins[3];
                    offsetY = margins[0] / 2 - margins[2] / 2;
                } else if (pos === 'right-center') {
                    offsetX = -margins[1];
                    offsetY = margins[0] / 2 - margins[2] / 2;
                }
            }
            /* jsPanel.position(self, `${pos} ${offsetX} ${offsetY}`);
               For some reason I could not find the line above does not work (pos and offsets in one string), but only when
               center-bottom is used with different settings for left/right margin.
            */
            jsPanel.position(self, pos);
            jsPanel.setStyle(self, {
                left: 'calc(' + self.style.left + ' + ' + offsetX + 'px)',
                top: 'calc(' + self.style.top + ' + ' + offsetY + 'px)'
            });
        };

        self.resize = function () {
            for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                params[_key2] = arguments[_key2];
            }

            var dimensions = window.getComputedStyle(self);
            var size = { width: dimensions.width, height: dimensions.height },
                updateCache = true,
                callback = void 0;
            params.forEach(function (value) {
                if (typeof value === 'string') {
                    size = value;
                } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
                    size = Object.assign(size, value);
                } else if (typeof value === 'boolean') {
                    updateCache = value;
                } else if (typeof value === 'function') {
                    callback = value;
                }
            });

            var values = jsPanel.pOsize(self, size);
            self.style.width = values.width;
            self.style.height = values.height;
            self.contentResize();
            if (updateCache) {
                self.saveCurrentDimensions();
            }
            if (callback) {
                callback.call(self, self);
            }
            return self;
        };

        self.saveCurrentDimensions = function () {
            var normData = window.getComputedStyle(self);
            self.currentData.width = normData.width;
            if (self.status === 'normalized') {
                self.currentData.height = normData.height;
            }
        };
        self.saveCurrentPosition = function () {
            var normData = window.getComputedStyle(self);
            self.currentData.left = normData.left;
            self.currentData.top = normData.top;
        };

        self.setControls = function (sel, callback) {
            self.header.querySelectorAll('.jsPanel-btn').forEach(function (item) {
                item.style.display = 'block';
            });
            sel.forEach(function (item) {
                var btn = self.controlbar.querySelector(item);
                if (btn) {
                    btn.style.display = 'none';
                }
            });
            if (callback) {
                callback.call(self, self);
            }
            return self;
        };

        self.setControlStatus = function (ctrl) {
            var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'enable';
            var callback = arguments[2];

            if (action === 'disable') {
                if (self.getAttribute('data-btn' + ctrl) !== 'removed') {
                    self.setAttribute('data-btn' + ctrl, 'disabled');
                    var btn = self.controlbar.querySelector('.jsPanel-btn-' + ctrl);
                    btn.style.pointerEvents = 'none';
                    btn.style.opacity = 0.4;
                    btn.style.cursor = 'default';
                }
            } else if (action === 'enable') {
                if (self.getAttribute('data-btn' + ctrl) !== 'removed') {
                    self.setAttribute('data-btn' + ctrl, 'enabled');
                    var _btn = self.controlbar.querySelector('.jsPanel-btn-' + ctrl);
                    _btn.style.pointerEvents = 'auto';
                    _btn.style.opacity = 1;
                    _btn.style.cursor = 'pointer';
                }
            } else if (action === 'remove') {
                var _btn2 = self.controlbar.querySelector('.jsPanel-btn-' + ctrl);
                self.controlbar.removeChild(_btn2);
                self.setAttribute('data-btn' + ctrl, 'removed');
            }

            if (callback) {
                callback.call(self, self);
            }
            return self;
        };

        self.setHeaderControls = function (callback) {
            var controls = ['close', 'maximize', 'normalize', 'minimize', 'smallify', 'smallifyrev'],
                option = opts.headerControls;
            if (typeof option === 'string') {
                if (option === 'none') {
                    controls.forEach(function (item) {
                        self.setControlStatus(item, 'remove');
                    });
                } else if (option === 'closeonly') {
                    controls.forEach(function (item) {
                        if (item !== 'close') {
                            self.setControlStatus(item, 'remove');
                        }
                    });
                }
            } else {
                controls.forEach(function (item) {
                    if (option[item]) {
                        self.setControlStatus(item, option[item]);
                    }
                });
            }
            if (callback) {
                callback.call(self, self);
            }
            return self;
        };

        self.setHeaderLogo = function (hdrLogo, callback) {
            if (typeof hdrLogo === 'string') {
                if (hdrLogo.substr(0, 1) !== '<') {
                    // is assumed to be an img url
                    var img = document.createElement('img');
                    img.style.maxHeight = getComputedStyle(self.headerbar).height;
                    img.src = hdrLogo;
                    jsPanel.emptyNode(self.headerlogo);
                    self.headerlogo.append(img);
                } else {
                    self.headerlogo.innerHTML = hdrLogo;
                }
            } else {
                // assumed to be a node object
                jsPanel.emptyNode(self.headerlogo);
                self.headerlogo.append(hdrLogo);
            }
            if (callback) {
                callback.call(self, self);
            }
            return self;
        };

        self.setHeaderRemove = function (callback) {
            self.removeChild(self.header);
            self.content.classList.add('jsPanel-content-noheader');
            ['close', 'maximize', 'normalize', 'minimize', 'smallify', 'smallifyrev'].forEach(function (item) {
                self.setAttribute('data-btn' + item, 'removed');
            });

            if (callback) {
                callback.call(self, self);
            }
            return self;
        };

        self.setHeaderTitle = function (hdrTitle, callback) {
            if (typeof hdrTitle === 'string') {
                self.headertitle.innerHTML = hdrTitle;
            } else if (typeof hdrTitle === 'function') {
                jsPanel.emptyNode(self.headertitle);
                self.headertitle.innerHTML = hdrTitle();
            } else {
                // assumed to be a node object
                jsPanel.emptyNode(self.headertitle);
                self.headertitle.append(hdrTitle);
            }
            if (callback) {
                callback.call(self, self);
            }
            return self;
        };

        self.setIconfont = function () {
            var font = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'jsglyph';
            var panel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : self;
            var callback = arguments[2];

            if (font !== 'jsglyph') {
                var classArray = void 0,
                    textArray = void 0;
                if (font === 'bootstrap' || font === 'glyphicon') {
                    classArray = ['glyphicon glyphicon-remove', 'glyphicon glyphicon-fullscreen', 'glyphicon glyphicon-resize-full', 'glyphicon glyphicon-minus', 'glyphicon glyphicon-chevron-down', 'glyphicon glyphicon-chevron-up'];
                } else if (font === 'fa' || font === 'far' || font === 'fal' || font === 'fas') {
                    classArray = [font + ' fa-window-close', font + ' fa-window-maximize', font + ' fa-window-restore', font + ' fa-window-minimize', font + ' fa-chevron-down', font + ' fa-chevron-up'];
                } else if (font === 'material-icons') {
                    classArray = [font, font, font, font, font, font];
                    textArray = ['close', 'fullscreen', 'fullscreen_exit', 'call_received', 'expand_more', 'expand_less'];
                } else if (Array.isArray(font)) {
                    classArray = ['custom-control-icon ' + font[5], 'custom-control-icon ' + font[4], 'custom-control-icon ' + font[3], 'custom-control-icon ' + font[2], 'custom-control-icon ' + font[1], 'custom-control-icon ' + font[0]];
                } else {
                    return panel;
                }
                Array.prototype.slice.call(panel.querySelectorAll('.jsPanel-controlbar .jsPanel-btn > span')).reverse().forEach(function (item, i) {
                    item.className = classArray[i];
                    if (font === 'material-icons') {
                        item.textContent = textArray[i];
                    }
                });
            }
            if (callback) {
                callback.call(panel, panel);
            }
            return panel;
        };

        self.setRtl = function () {
            [self.header, self.headerbar, self.titlebar, self.controlbar, self.headertoolbar, self.footer].forEach(function (item) {
                item.classList.add('jsPanel-rtl');
            });
            [self.headertitle, self.headertoolbar, self.content, self.footer].forEach(function (item) {
                item.dir = 'rtl';
                if (opts.rtl.lang) {
                    item.lang = opts.rtl.lang;
                }
            });
        };

        self.setSize = function () {
            if (opts.panelSize) {
                var values = jsPanel.pOsize(self, opts.panelSize);
                self.style.width = values.width;
                self.style.height = values.height;
                self.contentResize();
            } else if (opts.contentSize) {
                var _values = jsPanel.pOsize(self, opts.contentSize);
                self.content.style.width = _values.width;
                self.content.style.height = _values.height;
                // explicitly assign current width/height to panel
                self.style.width = _values.width;
                // then set content width to 100%
                self.content.style.width = '100%';
            }
            return self;
        };

        self.setTheme = function () {
            var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : opts.theme;
            var callback = arguments[1];

            // first remove all theme related syles
            self.clearTheme();

            if (theme === 'none') {
                // results in an all white panel without any theme related classes/styles applied
                // removal of footer background/border is done in jsP.toolbarAdd()
                self.style.backgroundColor = '#fff';
                return self;
            }

            var themeDetails = self.getThemeDetails(theme);

            if (!themeDetails.bs) {
                if (jsPanel.themes.indexOf(themeDetails.color) !== -1) {
                    self.applyBuiltInTheme(themeDetails);
                } else {
                    self.applyArbitraryTheme(themeDetails);
                }
            } else {
                self.applyBootstrapTheme(themeDetails);
            }

            if (opts.border) {
                self.applyThemeBorder(themeDetails);
            } else {
                self.style.borderWidth = '';
                self.style.borderStyle = '';
                self.style.borderColor = '';
            }

            if (callback) {
                callback.call(self, self);
            }
            return self;
        };

        self.smallify = function (callback) {
            if (self.status === 'smallified' || self.status === 'smallifiedmax') {
                return self;
            }

            if (opts.onbeforesmallify && opts.onbeforesmallify.call(self, self) === false) {
                return self;
            }

            document.dispatchEvent(jspanelbeforesmallify);

            if (self.status === 'normalized') {
                self.saveCurrentDimensions();
            }

            self.style.overflow = 'hidden';
            self.style.height = window.getComputedStyle(self.headerbar).height;

            if (self.status === 'normalized') {
                self.setControls(['.jsPanel-btn-normalize', '.jsPanel-btn-smallify']);
                self.status = 'smallified';
                document.dispatchEvent(jspanelsmallified);
                document.dispatchEvent(jspanelstatuschange);
                if (opts.onstatuschange && opts.onstatuschange.call(self, self) === false) {
                    return self;
                }
            } else if (self.status === 'maximized') {
                self.setControls(['.jsPanel-btn-maximize', '.jsPanel-btn-smallify']);
                self.status = 'smallifiedmax';
                document.dispatchEvent(jspanelsmallifiedmax);
                document.dispatchEvent(jspanelstatuschange);
                if (opts.onstatuschange && opts.onstatuschange.call(self, self) === false) {
                    return self;
                }
            }

            if (callback) {
                callback.call(self, self);
            }

            if (opts.onsmallified) {
                opts.onsmallified.call(self, self);
            }

            return self;
        };

        self.unsmallify = function (callback) {
            if (self.status === 'smallified' || self.status === 'smallifiedmax') {
                if (opts.onbeforeunsmallify && opts.onbeforeunsmallify.call(self, self) === false) {
                    return self;
                }

                document.dispatchEvent(jspanelbeforeunsmallify);
                self.style.overflow = 'visible';
                jsPanel.front(self);

                if (self.status === 'smallified') {
                    self.style.height = self.currentData.height;
                    self.setControls(['.jsPanel-btn-normalize', '.jsPanel-btn-smallifyrev']);
                    self.status = 'normalized';
                    document.dispatchEvent(jspanelnormalized);
                    document.dispatchEvent(jspanelstatuschange);
                    if (opts.onstatuschange && opts.onstatuschange.call(self, self) === false) {
                        return self;
                    }
                } else if (self.status === 'smallifiedmax') {
                    self.maximize();
                } else if (self.status === 'minimized') {
                    self.normalize();
                }

                if (callback) {
                    callback.call(self, self);
                }

                if (opts.onunsmallified) {
                    opts.onunsmallified.call(self, self);
                }
            }

            return self;
        };

        self.dragit = function (string) {
            var dragitOptions = Object.assign({}, jsPanel.defaults.dragit, opts.dragit),
                handles = self.querySelectorAll(dragitOptions.handles);
            if (string === 'disable') {
                handles.forEach(function (handle) {
                    handle.style.pointerEvents = 'none';
                });
            } else {
                handles.forEach(function (handle) {
                    handle.style.pointerEvents = 'auto';
                });
            }
            return self;
        };

        self.resizeit = function (string) {
            var handles = self.querySelectorAll('.jsPanel-resizeit-handle');
            if (string === 'disable') {
                handles.forEach(function (handle) {
                    handle.style.pointerEvents = 'none';
                });
            } else {
                handles.forEach(function (handle) {
                    handle.style.pointerEvents = 'auto';
                });
            }
            return self;
        };

        // option.id
        self.id = opts.id;

        // option.paneltype classname
        self.classList.add('jsPanel-' + opts.paneltype);

        // set z-index and paneltype class
        if (opts.paneltype === 'standard') {
            self.style.zIndex = this.zi.next();
        }

        // option.container
        panelContainer.append(self);

        // option.theme
        self.setTheme(opts.theme);

        // option.boxShadow
        if (opts.boxShadow) {
            self.classList.add('jsPanel-depth-' + opts.boxShadow);
        }

        /* option.headerRemove,
         option.iconfont,
         option.headerControls,
         option.headerLogo,
         option.headerTitle
         */
        if (!opts.headerRemove) {
            if (opts.headerLogo) {
                self.setHeaderLogo(opts.headerLogo);
            }
            self.setIconfont(opts.iconfont);
            self.setHeaderTitle(opts.headerTitle);
            self.setHeaderControls();
        } else {
            self.setHeaderRemove();
        }

        // option.headerToolbar
        if (opts.headerToolbar) {
            self.addToolbar(self.headertoolbar, opts.headerToolbar);
        }
        // option.footerToolbar
        if (opts.footerToolbar) {
            self.addToolbar(self.footer, opts.footerToolbar);
        }

        // option.content
        if (opts.content) {
            if (typeof opts.content === 'function') {
                opts.content.call(self, self);
            } else if (typeof opts.content === 'string') {
                self.content.innerHTML = opts.content;
            } else {
                self.content.append(opts.content);
            }
        }

        // option.contentAjax
        if (opts.contentAjax) {
            this.ajax(self);
        }

        // option.contentFetch
        if (opts.contentFetch) {
            this.fetch(self);
        }

        // option.rtl
        if (opts.rtl) {
            self.setRtl();
        }

        // option.size -- should be after option.theme
        self.setSize();

        // option.position
        self.status = 'normalized';
        // if option.position evaluates to false panel will not be positioned at all
        if (opts.position || opts.position !== 'cursor') {
            this.position(self, opts.position);
        } else {
            self.style.opacity = 1;
        }
        document.dispatchEvent(jspanelnormalized);
        document.dispatchEvent(jspanelstatuschange);
        if (opts.onstatuschange && opts.onstatuschange.call(self, self) === false) {
            return self;
        }
        self.calcSizeFactors();

        // option.animateIn
        if (opts.animateIn) {
            // remove class again on animationend, otherwise opacity doesn't change when panel is dragged
            self.addEventListener('animationend', function () {
                _this.remClass(self, opts.animateIn);
            });
            this.setClass(self, opts.animateIn);
        }

        // option.dragit AND option.resizeit AND option.syncMargins
        if (opts.syncMargins) {
            var containment = this.pOcontainment(opts.maximizedMargin);
            if (opts.dragit) {
                opts.dragit.containment = containment;
                if (opts.dragit.snap) {
                    opts.dragit.snap.containment = true;
                }
            }
            if (opts.resizeit) {
                opts.resizeit.containment = containment;
            }
        }
        if (opts.dragit) {
            this.dragit(self, opts.dragit);
            document.addEventListener('dragstop', function (e) {
                if (e.detail === self.id) {
                    self.calcSizeFactors();
                }
            }, false);
        } else {
            self.titlebar.style.cursor = 'default';
        }

        if (opts.resizeit) {
            this.resizeit(self, opts.resizeit);
            var startstatus = void 0;
            document.addEventListener('resizestart', function (e) {
                if (e.detail === self.id) {
                    startstatus = self.status;
                }
            }, false);
            document.addEventListener('resizestop', function (e) {
                if (e.detail === self.id) {
                    if ((startstatus === 'smallified' || startstatus === 'smallifiedmax' || startstatus === 'maximized') && parseFloat(self.style.height) > parseFloat(window.getComputedStyle(self.header).height)) {
                        self.setControls(['.jsPanel-btn-normalize', '.jsPanel-btn-smallifyrev']);
                        self.status = 'normalized';
                        document.dispatchEvent(jspanelnormalized);
                        document.dispatchEvent(jspanelstatuschange);
                        if (opts.onstatuschange && opts.onstatuschange.call(self, self) === false) {
                            return self;
                        }
                        self.calcSizeFactors();
                    }
                }
            }, false);
        }

        // initialize self.currentData - must be after options position & size
        self.saveCurrentDimensions();
        self.saveCurrentPosition();

        // option.setStatus
        if (opts.setStatus) {
            var newStatus = opts.setStatus;
            if (newStatus === 'smallifiedmax') {
                self.maximize().smallify();
            } else if (newStatus === 'smallified') {
                self.smallify();
            } else {
                var func = newStatus.substr(0, newStatus.length - 1);
                self[func]();
            }
        }

        // option.autoclose
        if (opts.autoclose) {
            closetimer = window.setTimeout(function () {
                if (self) self.close();
            }, opts.autoclose);
        }

        // front panel on mousedown
        this.pointerdown.forEach(function (item) {
            self.addEventListener(item, function (e) {
                if (!e.target.closest('.jsPanel-btn-close') && !e.target.closest('.jsPanel-btn-minimize') && opts.paneltype === 'standard') {
                    self.front();
                }
            }, false);
        });

        // option.onwindowresize
        if (opts.onwindowresize) {
            window.addEventListener('resize', function (e) {
                if (e.target === window) {
                    // see https://bugs.jqueryui.com/ticket/7514
                    var param = opts.onwindowresize,
                        status = self.status,
                        parentStyles = window.getComputedStyle(self.parentNode);
                    if (status === 'maximized' && param === true) {
                        self.maximize();
                    } else if (status === 'normalized' || status === 'smallified' || status === 'maximized') {
                        if (typeof param === 'function') {
                            param.call(self, e, self);
                        } else {
                            self.style.left = function () {
                                var l = void 0;
                                if (opts.container === document.body) {
                                    l = (document.body.clientWidth - parseFloat(self.style.width)) * self.hf;
                                } else {
                                    l = (parseFloat(parentStyles.width) - parseFloat(self.style.width)) * self.hf;
                                }
                                return l <= 0 ? 0 : l + 'px';
                            }();
                            self.style.top = function () {
                                var t = void 0;
                                if (opts.container === document.body) {
                                    t = (window.innerHeight - parseFloat(self.currentData.height)) * self.vf;
                                } else {
                                    t = (parseFloat(parentStyles.height) - parseFloat(self.currentData.height)) * self.vf;
                                }
                                return t <= 0 ? 0 : t + 'px';
                            }();
                        }
                    }
                }
            }, false);
        }

        // without this handler content section would have pointerEvents = none when clicking header section (see dragit)
        this.pointerup.forEach(function (item) {
            self.addEventListener(item, function () {
                self.content.style.pointerEvents = 'inherit';
            });
        });

        // option.callback
        if (opts.callback && Array.isArray(opts.callback)) {
            opts.callback.forEach(function (item) {
                item.call(self, self);
            });
        } else if (opts.callback) {
            opts.callback.call(self, self);
        }

        // construtor callback
        if (cb) {
            cb.call(self, self);
        }

        document.dispatchEvent(jspanelloaded);
        return self;
    }
};

// initialize z-index generator (needs to be seperate because jsPanel is not defined yet when putting it inside jsPanel = { ... })
jsPanel.zi = function () {
    var startValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsPanel.ziBase;

    var val = startValue;
    return {
        next: function next() {
            return val++;
        }
    };
}();

if (window.PointerEvent) {
    jsPanel.pointerdown = ['pointerdown'];
    jsPanel.pointermove = ['pointermove'];
    jsPanel.pointerup = ['pointerup'];
} else {
    if ('ontouchend' in window) {
        jsPanel.pointerdown = ['touchstart', 'mousedown'];
        jsPanel.pointermove = ['touchmove', 'mousemove'];
        jsPanel.pointerup = ['touchend', 'mouseup'];
    } else {
        jsPanel.pointerdown = ['mousedown'];
        jsPanel.pointermove = ['mousemove'];
        jsPanel.pointerup = ['mouseup'];
    }
}

// closeOnEscape
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.code === 'Esc' || e.keyCode === 27) {
        jsPanel.getPanels(function () {
            return this.classList.contains('jsPanel');
        }).some(function (item) {
            if (item.options.closeOnEscape) {
                item.close();
                return true;
            }
            return false;
        });
    }
}, false);


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
function CreateDeviceManagerPanel() {
    TestDeviceManagerPanel_1.TestDeviceManagerPanel.ShowTestDeviceManagerPanel();
}
exports.CreateDeviceManagerPanel = CreateDeviceManagerPanel;


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkNmNjYmVjM2NmZDM4YWZhNmE5ZCIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJCdXR0cGx1Z1wiIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AdHdlZW5qcy90d2Vlbi5qcy9zcmMvVHdlZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvanNwYW5lbC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RldnRvb2xzL3dlYi9Mb2dQYW5lbC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RldnRvb2xzL3dlYi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL3VybC9lc2NhcGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvZm9udHMvanNnbHlwaC5lb3QiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvZm9udHMvanNnbHlwaC5zdmciLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvZm9udHMvanNnbHlwaC50dGYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvZm9udHMvanNnbHlwaC53b2ZmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9kaXN0L2pzcGFuZWwuY3NzPzQzZDIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZGV2dG9vbHMvVGVzdERldmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGV2dG9vbHMvVGVzdERldmljZU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RldnRvb2xzL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9kZXZ0b29scy93ZWIvTG9nUGFuZWwuY3NzP2IxYTUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RldnRvb2xzL3dlYi9Mb2dQYW5lbC5odG1sIiwid2VicGFjazovLy8uL3NyYy9kZXZ0b29scy93ZWIvTG9nUGFuZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RldnRvb2xzL3dlYi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmNzcz9kNjk4Iiwid2VicGFjazovLy8uL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC5odG1sIiwid2VicGFjazovLy8uL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGV2dG9vbHMvd2ViL2ZsZXNobGlnaHQucG5nIiwid2VicGFjazovLy8uL3NyYy9kZXZ0b29scy93ZWIvaHVzaC5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2RldnRvb2xzL3dlYi9pbmRleC53ZWIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RldnRvb2xzL3dlYi9qc3BhbmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9kZXZ0b29scy93ZWIvcnVsZXIucG5nIiwid2VicGFjazovLy8uL3NyYy9kZXZ0b29scy93ZWIvdXRpbHMud2ViLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDN0RBLDBCOzs7Ozs7OytDQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUgsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IscUJBQXFCOztBQUV2Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsdUNBQXVDO0FBQ3ZDOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUEsZ0VBQWdFLHNCQUFzQjtBQUN0RjtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxJQUFJOztBQUVKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBLElBQUk7O0FBRUo7O0FBRUE7QUFDQTs7QUFFQSxrRUFBa0Usc0JBQXNCO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7OztBQUdBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsUUFBUTtBQUN6QjtBQUNBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7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QTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0gsb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDN1NBLHFEQUFxRCxnekY7Ozs7Ozs7QUNBckQscUNBQXFDLGcwSjs7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDLHNDQUFzQztBQUN0Qzs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQSxzREFBc0Qsa0JBQWtCO0FBQ3hFLDRDQUE0QyxrQkFBa0I7QUFDOUQsb0RBQW9ELGtCQUFrQjs7QUFFdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsaUNBQWlDO0FBQzlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1FQUFtRTs7QUFFbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtR0FBbUc7QUFDbkc7QUFDQTtBQUNBLDJFQUEyRTtBQUMzRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3REFBd0QsdURBQXVEO0FBQy9HOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakIsYUFBYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUI7O0FBRXJCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3REFBd0QscUVBQXFFO0FBQzdIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0NBQWtDLHFDQUFxQztBQUN2RSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELEdBQUcsb0NBQW9DO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkIsS0FB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Q2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzRUFBc0U7QUFDdEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFD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QUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkhBQTJILE1BQU07QUFDakk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsQ0FBQzs7Ozs7Ozs7QUNueUdELGlDQUFpQyx3Uzs7Ozs7Ozs7OztBQ0FqQyxxR0FBa0U7QUFDbEUseUVBQXNDO0FBRXRDO0lBQ0UsbUJBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUMxQixDQUFDO0FBRkQsOENBRUM7QUFFRDtJQUNFLCtDQUFzQixDQUFDLDBCQUEwQixFQUFFLENBQUM7QUFDdEQsQ0FBQztBQUZELDREQUVDIiwiZmlsZSI6ImJ1dHRwbHVnLWRldnRvb2xzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYnV0dHBsdWctZGV2dG9vbHMtY29tbW9uanNcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiQnV0dHBsdWdEZXZUb29sc1wiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9kZXZ0b29scy93ZWIvaW5kZXgud2ViLnRzXCIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGQ2Y2NiZWMzY2ZkMzhhZmE2YTlkIiwibW9kdWxlLmV4cG9ydHMgPSBCdXR0cGx1ZztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIkJ1dHRwbHVnXCJcbi8vIG1vZHVsZSBpZCA9IC4uL2luZGV4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogVHdlZW4uanMgLSBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKlxuICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzL2dyYXBocy9jb250cmlidXRvcnMgZm9yIHRoZSBmdWxsIGxpc3Qgb2YgY29udHJpYnV0b3JzLlxuICogVGhhbmsgeW91IGFsbCwgeW91J3JlIGF3ZXNvbWUhXG4gKi9cblxuXG52YXIgX0dyb3VwID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLl90d2VlbnMgPSB7fTtcblx0dGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGUgPSB7fTtcbn07XG5cbl9Hcm91cC5wcm90b3R5cGUgPSB7XG5cdGdldEFsbDogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVucykubWFwKGZ1bmN0aW9uICh0d2VlbklkKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fdHdlZW5zW3R3ZWVuSWRdO1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cblx0fSxcblxuXHRyZW1vdmVBbGw6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMuX3R3ZWVucyA9IHt9O1xuXG5cdH0sXG5cblx0YWRkOiBmdW5jdGlvbiAodHdlZW4pIHtcblxuXHRcdHRoaXMuX3R3ZWVuc1t0d2Vlbi5nZXRJZCgpXSA9IHR3ZWVuO1xuXHRcdHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlW3R3ZWVuLmdldElkKCldID0gdHdlZW47XG5cblx0fSxcblxuXHRyZW1vdmU6IGZ1bmN0aW9uICh0d2Vlbikge1xuXG5cdFx0ZGVsZXRlIHRoaXMuX3R3ZWVuc1t0d2Vlbi5nZXRJZCgpXTtcblx0XHRkZWxldGUgdGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGVbdHdlZW4uZ2V0SWQoKV07XG5cblx0fSxcblxuXHR1cGRhdGU6IGZ1bmN0aW9uICh0aW1lLCBwcmVzZXJ2ZSkge1xuXG5cdFx0dmFyIHR3ZWVuSWRzID0gT2JqZWN0LmtleXModGhpcy5fdHdlZW5zKTtcblxuXHRcdGlmICh0d2Vlbklkcy5sZW5ndGggPT09IDApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHR0aW1lID0gdGltZSAhPT0gdW5kZWZpbmVkID8gdGltZSA6IFRXRUVOLm5vdygpO1xuXG5cdFx0Ly8gVHdlZW5zIGFyZSB1cGRhdGVkIGluIFwiYmF0Y2hlc1wiLiBJZiB5b3UgYWRkIGEgbmV3IHR3ZWVuIGR1cmluZyBhbiB1cGRhdGUsIHRoZW4gdGhlXG5cdFx0Ly8gbmV3IHR3ZWVuIHdpbGwgYmUgdXBkYXRlZCBpbiB0aGUgbmV4dCBiYXRjaC5cblx0XHQvLyBJZiB5b3UgcmVtb3ZlIGEgdHdlZW4gZHVyaW5nIGFuIHVwZGF0ZSwgaXQgbWF5IG9yIG1heSBub3QgYmUgdXBkYXRlZC4gSG93ZXZlcixcblx0XHQvLyBpZiB0aGUgcmVtb3ZlZCB0d2VlbiB3YXMgYWRkZWQgZHVyaW5nIHRoZSBjdXJyZW50IGJhdGNoLCB0aGVuIGl0IHdpbGwgbm90IGJlIHVwZGF0ZWQuXG5cdFx0d2hpbGUgKHR3ZWVuSWRzLmxlbmd0aCA+IDApIHtcblx0XHRcdHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlID0ge307XG5cblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdHdlZW5JZHMubGVuZ3RoOyBpKyspIHtcblxuXHRcdFx0XHR2YXIgdHdlZW4gPSB0aGlzLl90d2VlbnNbdHdlZW5JZHNbaV1dO1xuXG5cdFx0XHRcdGlmICh0d2VlbiAmJiB0d2Vlbi51cGRhdGUodGltZSkgPT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0dHdlZW4uX2lzUGxheWluZyA9IGZhbHNlO1xuXG5cdFx0XHRcdFx0aWYgKCFwcmVzZXJ2ZSkge1xuXHRcdFx0XHRcdFx0ZGVsZXRlIHRoaXMuX3R3ZWVuc1t0d2Vlbklkc1tpXV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHR3ZWVuSWRzID0gT2JqZWN0LmtleXModGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGUpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXG5cdH1cbn07XG5cbnZhciBUV0VFTiA9IG5ldyBfR3JvdXAoKTtcblxuVFdFRU4uR3JvdXAgPSBfR3JvdXA7XG5UV0VFTi5fbmV4dElkID0gMDtcblRXRUVOLm5leHRJZCA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIFRXRUVOLl9uZXh0SWQrKztcbn07XG5cblxuLy8gSW5jbHVkZSBhIHBlcmZvcm1hbmNlLm5vdyBwb2x5ZmlsbC5cbi8vIEluIG5vZGUuanMsIHVzZSBwcm9jZXNzLmhydGltZS5cbmlmICh0eXBlb2YgKHdpbmRvdykgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiAocHJvY2VzcykgIT09ICd1bmRlZmluZWQnKSB7XG5cdFRXRUVOLm5vdyA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgdGltZSA9IHByb2Nlc3MuaHJ0aW1lKCk7XG5cblx0XHQvLyBDb252ZXJ0IFtzZWNvbmRzLCBuYW5vc2Vjb25kc10gdG8gbWlsbGlzZWNvbmRzLlxuXHRcdHJldHVybiB0aW1lWzBdICogMTAwMCArIHRpbWVbMV0gLyAxMDAwMDAwO1xuXHR9O1xufVxuLy8gSW4gYSBicm93c2VyLCB1c2Ugd2luZG93LnBlcmZvcm1hbmNlLm5vdyBpZiBpdCBpcyBhdmFpbGFibGUuXG5lbHNlIGlmICh0eXBlb2YgKHdpbmRvdykgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICB3aW5kb3cucGVyZm9ybWFuY2UgIT09IHVuZGVmaW5lZCAmJlxuXHRcdCB3aW5kb3cucGVyZm9ybWFuY2Uubm93ICE9PSB1bmRlZmluZWQpIHtcblx0Ly8gVGhpcyBtdXN0IGJlIGJvdW5kLCBiZWNhdXNlIGRpcmVjdGx5IGFzc2lnbmluZyB0aGlzIGZ1bmN0aW9uXG5cdC8vIGxlYWRzIHRvIGFuIGludm9jYXRpb24gZXhjZXB0aW9uIGluIENocm9tZS5cblx0VFdFRU4ubm93ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdy5iaW5kKHdpbmRvdy5wZXJmb3JtYW5jZSk7XG59XG4vLyBVc2UgRGF0ZS5ub3cgaWYgaXQgaXMgYXZhaWxhYmxlLlxuZWxzZSBpZiAoRGF0ZS5ub3cgIT09IHVuZGVmaW5lZCkge1xuXHRUV0VFTi5ub3cgPSBEYXRlLm5vdztcbn1cbi8vIE90aGVyd2lzZSwgdXNlICduZXcgRGF0ZSgpLmdldFRpbWUoKScuXG5lbHNlIHtcblx0VFdFRU4ubm93ID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblx0fTtcbn1cblxuXG5UV0VFTi5Ud2VlbiA9IGZ1bmN0aW9uIChvYmplY3QsIGdyb3VwKSB7XG5cdHRoaXMuX29iamVjdCA9IG9iamVjdDtcblx0dGhpcy5fdmFsdWVzU3RhcnQgPSB7fTtcblx0dGhpcy5fdmFsdWVzRW5kID0ge307XG5cdHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0ID0ge307XG5cdHRoaXMuX2R1cmF0aW9uID0gMTAwMDtcblx0dGhpcy5fcmVwZWF0ID0gMDtcblx0dGhpcy5fcmVwZWF0RGVsYXlUaW1lID0gdW5kZWZpbmVkO1xuXHR0aGlzLl95b3lvID0gZmFsc2U7XG5cdHRoaXMuX2lzUGxheWluZyA9IGZhbHNlO1xuXHR0aGlzLl9yZXZlcnNlZCA9IGZhbHNlO1xuXHR0aGlzLl9kZWxheVRpbWUgPSAwO1xuXHR0aGlzLl9zdGFydFRpbWUgPSBudWxsO1xuXHR0aGlzLl9lYXNpbmdGdW5jdGlvbiA9IFRXRUVOLkVhc2luZy5MaW5lYXIuTm9uZTtcblx0dGhpcy5faW50ZXJwb2xhdGlvbkZ1bmN0aW9uID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5MaW5lYXI7XG5cdHRoaXMuX2NoYWluZWRUd2VlbnMgPSBbXTtcblx0dGhpcy5fb25TdGFydENhbGxiYWNrID0gbnVsbDtcblx0dGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPSBmYWxzZTtcblx0dGhpcy5fb25VcGRhdGVDYWxsYmFjayA9IG51bGw7XG5cdHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayA9IG51bGw7XG5cdHRoaXMuX29uU3RvcENhbGxiYWNrID0gbnVsbDtcblx0dGhpcy5fZ3JvdXAgPSBncm91cCB8fCBUV0VFTjtcblx0dGhpcy5faWQgPSBUV0VFTi5uZXh0SWQoKTtcblxufTtcblxuVFdFRU4uVHdlZW4ucHJvdG90eXBlID0ge1xuXHRnZXRJZDogZnVuY3Rpb24gZ2V0SWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2lkO1xuXHR9LFxuXG5cdGlzUGxheWluZzogZnVuY3Rpb24gaXNQbGF5aW5nKCkge1xuXHRcdHJldHVybiB0aGlzLl9pc1BsYXlpbmc7XG5cdH0sXG5cblx0dG86IGZ1bmN0aW9uIHRvKHByb3BlcnRpZXMsIGR1cmF0aW9uKSB7XG5cblx0XHR0aGlzLl92YWx1ZXNFbmQgPSBwcm9wZXJ0aWVzO1xuXG5cdFx0aWYgKGR1cmF0aW9uICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX2R1cmF0aW9uID0gZHVyYXRpb247XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzdGFydDogZnVuY3Rpb24gc3RhcnQodGltZSkge1xuXG5cdFx0dGhpcy5fZ3JvdXAuYWRkKHRoaXMpO1xuXG5cdFx0dGhpcy5faXNQbGF5aW5nID0gdHJ1ZTtcblxuXHRcdHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gZmFsc2U7XG5cblx0XHR0aGlzLl9zdGFydFRpbWUgPSB0aW1lICE9PSB1bmRlZmluZWQgPyB0eXBlb2YgdGltZSA9PT0gJ3N0cmluZycgPyBUV0VFTi5ub3coKSArIHBhcnNlRmxvYXQodGltZSkgOiB0aW1lIDogVFdFRU4ubm93KCk7XG5cdFx0dGhpcy5fc3RhcnRUaW1lICs9IHRoaXMuX2RlbGF5VGltZTtcblxuXHRcdGZvciAodmFyIHByb3BlcnR5IGluIHRoaXMuX3ZhbHVlc0VuZCkge1xuXG5cdFx0XHQvLyBDaGVjayBpZiBhbiBBcnJheSB3YXMgcHJvdmlkZWQgYXMgcHJvcGVydHkgdmFsdWVcblx0XHRcdGlmICh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldIGluc3RhbmNlb2YgQXJyYXkpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIENyZWF0ZSBhIGxvY2FsIGNvcHkgb2YgdGhlIEFycmF5IHdpdGggdGhlIHN0YXJ0IHZhbHVlIGF0IHRoZSBmcm9udFxuXHRcdFx0XHR0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldID0gW3RoaXMuX29iamVjdFtwcm9wZXJ0eV1dLmNvbmNhdCh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldKTtcblxuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBgdG8oKWAgc3BlY2lmaWVzIGEgcHJvcGVydHkgdGhhdCBkb2Vzbid0IGV4aXN0IGluIHRoZSBzb3VyY2Ugb2JqZWN0LFxuXHRcdFx0Ly8gd2Ugc2hvdWxkIG5vdCBzZXQgdGhhdCBwcm9wZXJ0eSBpbiB0aGUgb2JqZWN0XG5cdFx0XHRpZiAodGhpcy5fb2JqZWN0W3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTYXZlIHRoZSBzdGFydGluZyB2YWx1ZS5cblx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9IHRoaXMuX29iamVjdFtwcm9wZXJ0eV07XG5cblx0XHRcdGlmICgodGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldIGluc3RhbmNlb2YgQXJyYXkpID09PSBmYWxzZSkge1xuXHRcdFx0XHR0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gKj0gMS4wOyAvLyBFbnN1cmVzIHdlJ3JlIHVzaW5nIG51bWJlcnMsIG5vdCBzdHJpbmdzXG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSB8fCAwO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzdG9wOiBmdW5jdGlvbiBzdG9wKCkge1xuXG5cdFx0aWYgKCF0aGlzLl9pc1BsYXlpbmcpIHtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHRoaXMuX2dyb3VwLnJlbW92ZSh0aGlzKTtcblx0XHR0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcblxuXHRcdGlmICh0aGlzLl9vblN0b3BDYWxsYmFjayAhPT0gbnVsbCkge1xuXHRcdFx0dGhpcy5fb25TdG9wQ2FsbGJhY2sodGhpcy5fb2JqZWN0KTtcblx0XHR9XG5cblx0XHR0aGlzLnN0b3BDaGFpbmVkVHdlZW5zKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRlbmQ6IGZ1bmN0aW9uIGVuZCgpIHtcblxuXHRcdHRoaXMudXBkYXRlKHRoaXMuX3N0YXJ0VGltZSArIHRoaXMuX2R1cmF0aW9uKTtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHN0b3BDaGFpbmVkVHdlZW5zOiBmdW5jdGlvbiBzdG9wQ2hhaW5lZFR3ZWVucygpIHtcblxuXHRcdGZvciAodmFyIGkgPSAwLCBudW1DaGFpbmVkVHdlZW5zID0gdGhpcy5fY2hhaW5lZFR3ZWVucy5sZW5ndGg7IGkgPCBudW1DaGFpbmVkVHdlZW5zOyBpKyspIHtcblx0XHRcdHRoaXMuX2NoYWluZWRUd2VlbnNbaV0uc3RvcCgpO1xuXHRcdH1cblxuXHR9LFxuXG5cdGRlbGF5OiBmdW5jdGlvbiBkZWxheShhbW91bnQpIHtcblxuXHRcdHRoaXMuX2RlbGF5VGltZSA9IGFtb3VudDtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHJlcGVhdDogZnVuY3Rpb24gcmVwZWF0KHRpbWVzKSB7XG5cblx0XHR0aGlzLl9yZXBlYXQgPSB0aW1lcztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHJlcGVhdERlbGF5OiBmdW5jdGlvbiByZXBlYXREZWxheShhbW91bnQpIHtcblxuXHRcdHRoaXMuX3JlcGVhdERlbGF5VGltZSA9IGFtb3VudDtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHlveW86IGZ1bmN0aW9uIHlveW8oeW95bykge1xuXG5cdFx0dGhpcy5feW95byA9IHlveW87XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRlYXNpbmc6IGZ1bmN0aW9uIGVhc2luZyhlYXNpbmcpIHtcblxuXHRcdHRoaXMuX2Vhc2luZ0Z1bmN0aW9uID0gZWFzaW5nO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0aW50ZXJwb2xhdGlvbjogZnVuY3Rpb24gaW50ZXJwb2xhdGlvbihpbnRlcnBvbGF0aW9uKSB7XG5cblx0XHR0aGlzLl9pbnRlcnBvbGF0aW9uRnVuY3Rpb24gPSBpbnRlcnBvbGF0aW9uO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y2hhaW46IGZ1bmN0aW9uIGNoYWluKCkge1xuXG5cdFx0dGhpcy5fY2hhaW5lZFR3ZWVucyA9IGFyZ3VtZW50cztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG9uU3RhcnQ6IGZ1bmN0aW9uIG9uU3RhcnQoY2FsbGJhY2spIHtcblxuXHRcdHRoaXMuX29uU3RhcnRDYWxsYmFjayA9IGNhbGxiYWNrO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0b25VcGRhdGU6IGZ1bmN0aW9uIG9uVXBkYXRlKGNhbGxiYWNrKSB7XG5cblx0XHR0aGlzLl9vblVwZGF0ZUNhbGxiYWNrID0gY2FsbGJhY2s7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRvbkNvbXBsZXRlOiBmdW5jdGlvbiBvbkNvbXBsZXRlKGNhbGxiYWNrKSB7XG5cblx0XHR0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG9uU3RvcDogZnVuY3Rpb24gb25TdG9wKGNhbGxiYWNrKSB7XG5cblx0XHR0aGlzLl9vblN0b3BDYWxsYmFjayA9IGNhbGxiYWNrO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0dXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUodGltZSkge1xuXG5cdFx0dmFyIHByb3BlcnR5O1xuXHRcdHZhciBlbGFwc2VkO1xuXHRcdHZhciB2YWx1ZTtcblxuXHRcdGlmICh0aW1lIDwgdGhpcy5fc3RhcnRUaW1lKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPT09IGZhbHNlKSB7XG5cblx0XHRcdGlmICh0aGlzLl9vblN0YXJ0Q2FsbGJhY2sgIT09IG51bGwpIHtcblx0XHRcdFx0dGhpcy5fb25TdGFydENhbGxiYWNrKHRoaXMuX29iamVjdCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRlbGFwc2VkID0gKHRpbWUgLSB0aGlzLl9zdGFydFRpbWUpIC8gdGhpcy5fZHVyYXRpb247XG5cdFx0ZWxhcHNlZCA9IGVsYXBzZWQgPiAxID8gMSA6IGVsYXBzZWQ7XG5cblx0XHR2YWx1ZSA9IHRoaXMuX2Vhc2luZ0Z1bmN0aW9uKGVsYXBzZWQpO1xuXG5cdFx0Zm9yIChwcm9wZXJ0eSBpbiB0aGlzLl92YWx1ZXNFbmQpIHtcblxuXHRcdFx0Ly8gRG9uJ3QgdXBkYXRlIHByb3BlcnRpZXMgdGhhdCBkbyBub3QgZXhpc3QgaW4gdGhlIHNvdXJjZSBvYmplY3Rcblx0XHRcdGlmICh0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHN0YXJ0ID0gdGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldIHx8IDA7XG5cdFx0XHR2YXIgZW5kID0gdGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XTtcblxuXHRcdFx0aWYgKGVuZCBpbnN0YW5jZW9mIEFycmF5KSB7XG5cblx0XHRcdFx0dGhpcy5fb2JqZWN0W3Byb3BlcnR5XSA9IHRoaXMuX2ludGVycG9sYXRpb25GdW5jdGlvbihlbmQsIHZhbHVlKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHQvLyBQYXJzZXMgcmVsYXRpdmUgZW5kIHZhbHVlcyB3aXRoIHN0YXJ0IGFzIGJhc2UgKGUuZy46ICsxMCwgLTMpXG5cdFx0XHRcdGlmICh0eXBlb2YgKGVuZCkgPT09ICdzdHJpbmcnKSB7XG5cblx0XHRcdFx0XHRpZiAoZW5kLmNoYXJBdCgwKSA9PT0gJysnIHx8IGVuZC5jaGFyQXQoMCkgPT09ICctJykge1xuXHRcdFx0XHRcdFx0ZW5kID0gc3RhcnQgKyBwYXJzZUZsb2F0KGVuZCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGVuZCA9IHBhcnNlRmxvYXQoZW5kKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBQcm90ZWN0IGFnYWluc3Qgbm9uIG51bWVyaWMgcHJvcGVydGllcy5cblx0XHRcdFx0aWYgKHR5cGVvZiAoZW5kKSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0XHR0aGlzLl9vYmplY3RbcHJvcGVydHldID0gc3RhcnQgKyAoZW5kIC0gc3RhcnQpICogdmFsdWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sgIT09IG51bGwpIHtcblx0XHRcdHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sodGhpcy5fb2JqZWN0KTtcblx0XHR9XG5cblx0XHRpZiAoZWxhcHNlZCA9PT0gMSkge1xuXG5cdFx0XHRpZiAodGhpcy5fcmVwZWF0ID4gMCkge1xuXG5cdFx0XHRcdGlmIChpc0Zpbml0ZSh0aGlzLl9yZXBlYXQpKSB7XG5cdFx0XHRcdFx0dGhpcy5fcmVwZWF0LS07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBSZWFzc2lnbiBzdGFydGluZyB2YWx1ZXMsIHJlc3RhcnQgYnkgbWFraW5nIHN0YXJ0VGltZSA9IG5vd1xuXHRcdFx0XHRmb3IgKHByb3BlcnR5IGluIHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0KSB7XG5cblx0XHRcdFx0XHRpZiAodHlwZW9mICh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldKSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSArIHBhcnNlRmxvYXQodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHRoaXMuX3lveW8pIHtcblx0XHRcdFx0XHRcdHZhciB0bXAgPSB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV07XG5cblx0XHRcdFx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV07XG5cdFx0XHRcdFx0XHR0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldID0gdG1wO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuX3lveW8pIHtcblx0XHRcdFx0XHR0aGlzLl9yZXZlcnNlZCA9ICF0aGlzLl9yZXZlcnNlZDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLl9yZXBlYXREZWxheVRpbWUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdHRoaXMuX3N0YXJ0VGltZSA9IHRpbWUgKyB0aGlzLl9yZXBlYXREZWxheVRpbWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fc3RhcnRUaW1lID0gdGltZSArIHRoaXMuX2RlbGF5VGltZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgIT09IG51bGwpIHtcblxuXHRcdFx0XHRcdHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIG51bUNoYWluZWRUd2VlbnMgPSB0aGlzLl9jaGFpbmVkVHdlZW5zLmxlbmd0aDsgaSA8IG51bUNoYWluZWRUd2VlbnM7IGkrKykge1xuXHRcdFx0XHRcdC8vIE1ha2UgdGhlIGNoYWluZWQgdHdlZW5zIHN0YXJ0IGV4YWN0bHkgYXQgdGhlIHRpbWUgdGhleSBzaG91bGQsXG5cdFx0XHRcdFx0Ly8gZXZlbiBpZiB0aGUgYHVwZGF0ZSgpYCBtZXRob2Qgd2FzIGNhbGxlZCB3YXkgcGFzdCB0aGUgZHVyYXRpb24gb2YgdGhlIHR3ZWVuXG5cdFx0XHRcdFx0dGhpcy5fY2hhaW5lZFR3ZWVuc1tpXS5zdGFydCh0aGlzLl9zdGFydFRpbWUgKyB0aGlzLl9kdXJhdGlvbik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXG5cdH1cbn07XG5cblxuVFdFRU4uRWFzaW5nID0ge1xuXG5cdExpbmVhcjoge1xuXG5cdFx0Tm9uZTogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGs7XG5cblx0XHR9XG5cblx0fSxcblxuXHRRdWFkcmF0aWM6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqIGs7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqICgyIC0gayk7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIDAuNSAqIGsgKiBrO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gLSAwLjUgKiAoLS1rICogKGsgLSAyKSAtIDEpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Q3ViaWM6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqIGsgKiBrO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIC0tayAqIGsgKiBrICsgMTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGsgKiBrO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKChrIC09IDIpICogayAqIGsgKyAyKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdFF1YXJ0aWM6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqIGsgKiBrICogaztcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAxIC0gKC0tayAqIGsgKiBrICogayk7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIDAuNSAqIGsgKiBrICogayAqIGs7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAtIDAuNSAqICgoayAtPSAyKSAqIGsgKiBrICogayAtIDIpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0UXVpbnRpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogayAqIGsgKiBrICogaztcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAtLWsgKiBrICogayAqIGsgKiBrICsgMTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGsgKiBrICogayAqIGs7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwLjUgKiAoKGsgLT0gMikgKiBrICogayAqIGsgKiBrICsgMik7XG5cblx0XHR9XG5cblx0fSxcblxuXHRTaW51c29pZGFsOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDEgLSBNYXRoLmNvcyhrICogTWF0aC5QSSAvIDIpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIE1hdGguc2luKGsgKiBNYXRoLlBJIC8gMik7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAwLjUgKiAoMSAtIE1hdGguY29zKE1hdGguUEkgKiBrKSk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRFeHBvbmVudGlhbDoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrID09PSAwID8gMCA6IE1hdGgucG93KDEwMjQsIGsgLSAxKTtcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrID09PSAxID8gMSA6IDEgLSBNYXRoLnBvdygyLCAtIDEwICogayk7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrID09PSAwKSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoayA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogTWF0aC5wb3coMTAyNCwgayAtIDEpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKC0gTWF0aC5wb3coMiwgLSAxMCAqIChrIC0gMSkpICsgMik7XG5cblx0XHR9XG5cblx0fSxcblxuXHRDaXJjdWxhcjoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAxIC0gTWF0aC5zcXJ0KDEgLSBrICogayk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gTWF0aC5zcXJ0KDEgLSAoLS1rICogaykpO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAtIDAuNSAqIChNYXRoLnNxcnQoMSAtIGsgKiBrKSAtIDEpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKE1hdGguc3FydCgxIC0gKGsgLT0gMikgKiBrKSArIDEpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0RWxhc3RpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrID09PSAwKSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoayA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIC1NYXRoLnBvdygyLCAxMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKGsgPT09IDApIHtcblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gTWF0aC5wb3coMiwgLTEwICogaykgKiBNYXRoLnNpbigoayAtIDAuMSkgKiA1ICogTWF0aC5QSSkgKyAxO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA9PT0gMCkge1xuXHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGsgPT09IDEpIHtcblx0XHRcdFx0cmV0dXJuIDE7XG5cdFx0XHR9XG5cblx0XHRcdGsgKj0gMjtcblxuXHRcdFx0aWYgKGsgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAtMC41ICogTWF0aC5wb3coMiwgMTAgKiAoayAtIDEpKSAqIE1hdGguc2luKChrIC0gMS4xKSAqIDUgKiBNYXRoLlBJKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDAuNSAqIE1hdGgucG93KDIsIC0xMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpICsgMTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdEJhY2s6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHR2YXIgcyA9IDEuNzAxNTg7XG5cblx0XHRcdHJldHVybiBrICogayAqICgocyArIDEpICogayAtIHMpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0dmFyIHMgPSAxLjcwMTU4O1xuXG5cdFx0XHRyZXR1cm4gLS1rICogayAqICgocyArIDEpICogayArIHMpICsgMTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0dmFyIHMgPSAxLjcwMTU4ICogMS41MjU7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIDAuNSAqIChrICogayAqICgocyArIDEpICogayAtIHMpKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDAuNSAqICgoayAtPSAyKSAqIGsgKiAoKHMgKyAxKSAqIGsgKyBzKSArIDIpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Qm91bmNlOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDEgLSBUV0VFTi5FYXNpbmcuQm91bmNlLk91dCgxIC0gayk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA8ICgxIC8gMi43NSkpIHtcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIGsgKiBrO1xuXHRcdFx0fSBlbHNlIGlmIChrIDwgKDIgLyAyLjc1KSkge1xuXHRcdFx0XHRyZXR1cm4gNy41NjI1ICogKGsgLT0gKDEuNSAvIDIuNzUpKSAqIGsgKyAwLjc1O1xuXHRcdFx0fSBlbHNlIGlmIChrIDwgKDIuNSAvIDIuNzUpKSB7XG5cdFx0XHRcdHJldHVybiA3LjU2MjUgKiAoayAtPSAoMi4yNSAvIDIuNzUpKSAqIGsgKyAwLjkzNzU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gNy41NjI1ICogKGsgLT0gKDIuNjI1IC8gMi43NSkpICogayArIDAuOTg0Mzc1O1xuXHRcdFx0fVxuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA8IDAuNSkge1xuXHRcdFx0XHRyZXR1cm4gVFdFRU4uRWFzaW5nLkJvdW5jZS5JbihrICogMikgKiAwLjU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBUV0VFTi5FYXNpbmcuQm91bmNlLk91dChrICogMiAtIDEpICogMC41ICsgMC41O1xuXG5cdFx0fVxuXG5cdH1cblxufTtcblxuVFdFRU4uSW50ZXJwb2xhdGlvbiA9IHtcblxuXHRMaW5lYXI6IGZ1bmN0aW9uICh2LCBrKSB7XG5cblx0XHR2YXIgbSA9IHYubGVuZ3RoIC0gMTtcblx0XHR2YXIgZiA9IG0gKiBrO1xuXHRcdHZhciBpID0gTWF0aC5mbG9vcihmKTtcblx0XHR2YXIgZm4gPSBUV0VFTi5JbnRlcnBvbGF0aW9uLlV0aWxzLkxpbmVhcjtcblxuXHRcdGlmIChrIDwgMCkge1xuXHRcdFx0cmV0dXJuIGZuKHZbMF0sIHZbMV0sIGYpO1xuXHRcdH1cblxuXHRcdGlmIChrID4gMSkge1xuXHRcdFx0cmV0dXJuIGZuKHZbbV0sIHZbbSAtIDFdLCBtIC0gZik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZuKHZbaV0sIHZbaSArIDEgPiBtID8gbSA6IGkgKyAxXSwgZiAtIGkpO1xuXG5cdH0sXG5cblx0QmV6aWVyOiBmdW5jdGlvbiAodiwgaykge1xuXG5cdFx0dmFyIGIgPSAwO1xuXHRcdHZhciBuID0gdi5sZW5ndGggLSAxO1xuXHRcdHZhciBwdyA9IE1hdGgucG93O1xuXHRcdHZhciBibiA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuQmVybnN0ZWluO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPD0gbjsgaSsrKSB7XG5cdFx0XHRiICs9IHB3KDEgLSBrLCBuIC0gaSkgKiBwdyhrLCBpKSAqIHZbaV0gKiBibihuLCBpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYjtcblxuXHR9LFxuXG5cdENhdG11bGxSb206IGZ1bmN0aW9uICh2LCBrKSB7XG5cblx0XHR2YXIgbSA9IHYubGVuZ3RoIC0gMTtcblx0XHR2YXIgZiA9IG0gKiBrO1xuXHRcdHZhciBpID0gTWF0aC5mbG9vcihmKTtcblx0XHR2YXIgZm4gPSBUV0VFTi5JbnRlcnBvbGF0aW9uLlV0aWxzLkNhdG11bGxSb207XG5cblx0XHRpZiAodlswXSA9PT0gdlttXSkge1xuXG5cdFx0XHRpZiAoayA8IDApIHtcblx0XHRcdFx0aSA9IE1hdGguZmxvb3IoZiA9IG0gKiAoMSArIGspKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZuKHZbKGkgLSAxICsgbSkgJSBtXSwgdltpXSwgdlsoaSArIDEpICUgbV0sIHZbKGkgKyAyKSAlIG1dLCBmIC0gaSk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRpZiAoayA8IDApIHtcblx0XHRcdFx0cmV0dXJuIHZbMF0gLSAoZm4odlswXSwgdlswXSwgdlsxXSwgdlsxXSwgLWYpIC0gdlswXSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrID4gMSkge1xuXHRcdFx0XHRyZXR1cm4gdlttXSAtIChmbih2W21dLCB2W21dLCB2W20gLSAxXSwgdlttIC0gMV0sIGYgLSBtKSAtIHZbbV0pO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZm4odltpID8gaSAtIDEgOiAwXSwgdltpXSwgdlttIDwgaSArIDEgPyBtIDogaSArIDFdLCB2W20gPCBpICsgMiA/IG0gOiBpICsgMl0sIGYgLSBpKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdFV0aWxzOiB7XG5cblx0XHRMaW5lYXI6IGZ1bmN0aW9uIChwMCwgcDEsIHQpIHtcblxuXHRcdFx0cmV0dXJuIChwMSAtIHAwKSAqIHQgKyBwMDtcblxuXHRcdH0sXG5cblx0XHRCZXJuc3RlaW46IGZ1bmN0aW9uIChuLCBpKSB7XG5cblx0XHRcdHZhciBmYyA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuRmFjdG9yaWFsO1xuXG5cdFx0XHRyZXR1cm4gZmMobikgLyBmYyhpKSAvIGZjKG4gLSBpKTtcblxuXHRcdH0sXG5cblx0XHRGYWN0b3JpYWw6IChmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHZhciBhID0gWzFdO1xuXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKG4pIHtcblxuXHRcdFx0XHR2YXIgcyA9IDE7XG5cblx0XHRcdFx0aWYgKGFbbl0pIHtcblx0XHRcdFx0XHRyZXR1cm4gYVtuXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvciAodmFyIGkgPSBuOyBpID4gMTsgaS0tKSB7XG5cdFx0XHRcdFx0cyAqPSBpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YVtuXSA9IHM7XG5cdFx0XHRcdHJldHVybiBzO1xuXG5cdFx0XHR9O1xuXG5cdFx0fSkoKSxcblxuXHRcdENhdG11bGxSb206IGZ1bmN0aW9uIChwMCwgcDEsIHAyLCBwMywgdCkge1xuXG5cdFx0XHR2YXIgdjAgPSAocDIgLSBwMCkgKiAwLjU7XG5cdFx0XHR2YXIgdjEgPSAocDMgLSBwMSkgKiAwLjU7XG5cdFx0XHR2YXIgdDIgPSB0ICogdDtcblx0XHRcdHZhciB0MyA9IHQgKiB0MjtcblxuXHRcdFx0cmV0dXJuICgyICogcDEgLSAyICogcDIgKyB2MCArIHYxKSAqIHQzICsgKC0gMyAqIHAxICsgMyAqIHAyIC0gMiAqIHYwIC0gdjEpICogdDIgKyB2MCAqIHQgKyBwMTtcblxuXHRcdH1cblxuXHR9XG5cbn07XG5cbi8vIFVNRCAoVW5pdmVyc2FsIE1vZHVsZSBEZWZpbml0aW9uKVxuKGZ1bmN0aW9uIChyb290KSB7XG5cblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gVFdFRU47XG5cdFx0fSk7XG5cblx0fSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcblxuXHRcdC8vIE5vZGUuanNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IFRXRUVOO1xuXG5cdH0gZWxzZSBpZiAocm9vdCAhPT0gdW5kZWZpbmVkKSB7XG5cblx0XHQvLyBHbG9iYWwgdmFyaWFibGVcblx0XHRyb290LlRXRUVOID0gVFdFRU47XG5cblx0fVxuXG59KSh0aGlzKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0B0d2VlbmpzL3R3ZWVuLmpzL3NyYy9Ud2Vlbi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvQHR3ZWVuanMvdHdlZW4uanMvc3JjL1R3ZWVuLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBlc2NhcGUgPSByZXF1aXJlKFwiLi4vLi4vY3NzLWxvYWRlci9saWIvdXJsL2VzY2FwZS5qc1wiKTtcbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKiBqc3BhbmVsLnNhc3M6IDIwMTctMTItMTMgMTU6MzQgKi9cXG4vKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMwNDIxNTcwL3Nhc3MtdW5pY29kZS1lc2NhcGUtaXMtbm90LXByZXNlcnZlZC1pbi1jc3MtZmlsZSAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdqc2dseXBoJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuL2ZvbnRzL2pzZ2x5cGguZW90XCIpKSArIFwiKTtcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuL2ZvbnRzL2pzZ2x5cGguZW90XCIpKSArIFwiPyNpZWZpeCkgZm9ybWF0KFxcXCJlbWJlZGRlZC1vcGVudHlwZVxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4vZm9udHMvanNnbHlwaC50dGZcIikpICsgXCIpIGZvcm1hdChcXFwidHJ1ZXR5cGVcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuL2ZvbnRzL2pzZ2x5cGgud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi9mb250cy9qc2dseXBoLnN2Z1wiKSkgKyBcIiNqc2dseXBoKSBmb3JtYXQoXFxcInN2Z1xcXCIpOyB9XFxuXFxuLmpzZ2x5cGgge1xcbiAgLyogdXNlICFpbXBvcnRhbnQgdG8gcHJldmVudCBpc3N1ZXMgd2l0aCBicm93c2VyIGV4dGVuc2lvbnMgdGhhdCBjaGFuZ2UgZm9udHMgKi9cXG4gIGZvbnQtZmFtaWx5OiAnanNnbHlwaCcgIWltcG9ydGFudDtcXG4gIHNwZWFrOiBub25lO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGZvbnQtdmFyaWFudDogbm9ybWFsO1xcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxuICBsaW5lLWhlaWdodDogMTtcXG4gIC8qIEJldHRlciBGb250IFJlbmRlcmluZyA9PT09PT09PT09PSAqL1xcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlOyB9XFxuXFxuLmpzZ2x5cGgtY2hldnJvbi1kb3duOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFOTAwXFxcIjsgfVxcblxcbi5qc2dseXBoLWNoZXZyb24tdXA6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEU5MDFcXFwiOyB9XFxuXFxuLmpzZ2x5cGgtY2xvc2U6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEU5MDJcXFwiOyB9XFxuXFxuLmpzZ2x5cGgtbWF4aW1pemU6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEU5MDNcXFwiOyB9XFxuXFxuLmpzZ2x5cGgtbWluaW1pemU6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEU5MDRcXFwiOyB9XFxuXFxuLmpzZ2x5cGgtbm9ybWFsaXplOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFOTA1XFxcIjsgfVxcblxcbi5qc1BhbmVsIHtcXG4gIGJvcmRlcjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxuICBmb250LWZhbWlseTogXFxcIk9wZW4gU2Fuc1xcXCIsXFxcIkhlbHZldGljYSBOZXVlXFxcIixIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBvcGFjaXR5OiAwO1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICB6LWluZGV4OiAxMDA7IH1cXG4gIC5qc1BhbmVsIC5qc1BhbmVsLWhkciB7XFxuICAgIGJvcmRlcjogMDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbiAgICBmb250LWZhbWlseTogXFxcIk9wZW4gU2Fuc1xcXCIsXFxcIkhlbHZldGljYSBOZXVlXFxcIixIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogM3B4O1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogM3B4O1xcbiAgICBmb250LXNpemU6IDE4cHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIG92ZXJmbG93OiBoaWRkZW47IH1cXG4gIC5qc1BhbmVsIC5qc1BhbmVsLWNvbnRlbnQge1xcbiAgICBib3JkZXI6IDA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJPcGVuIFNhbnNcXFwiLFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWY7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIGJhY2tncm91bmQ6ICNmZmZmZmY7XFxuICAgIGNvbG9yOiAjMDAwMDAwO1xcbiAgICBmb250LXNpemU6IDEycHg7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgICAuanNQYW5lbCAuanNQYW5lbC1jb250ZW50IHByZSB7XFxuICAgICAgY29sb3I6IGluaGVyaXQ7IH1cXG4gIC5qc1BhbmVsIC5qc1BhbmVsLWZ0ciB7XFxuICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICAtbXMtZmxleC1wYWNrOiBlbmQ7XFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxuICAgIC1tcy1mbGV4LXdyYXA6IG5vd3JhcDtcXG4gICAgZmxleC13cmFwOiBub3dyYXA7XFxuICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDNweDtcXG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDNweDtcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlMGUwZTA7XFxuICAgIGN1cnNvcjogbW92ZTtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICAgIGJhY2tncm91bmQ6ICNmNWY1ZjU7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIGNvbG9yOiBibGFjaztcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgLmpzUGFuZWwgLmpzUGFuZWwtZnRyLmFjdGl2ZSB7XFxuICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgICBkaXNwbGF5OiBmbGV4OyB9XFxuICAgIC5qc1BhbmVsIC5qc1BhbmVsLWZ0ci5hY3RpdmUgPiAqIHtcXG4gICAgICBtYXJnaW46IDhweDsgfVxcbiAgLmpzUGFuZWwgLmpzUGFuZWwtZnRyLnBhbmVsLWZvb3RlciB7XFxuICAgIHBhZGRpbmc6IDA7IH1cXG5cXG4uanNQYW5lbC1oZWFkZXJiYXIsIC5qc1BhbmVsLWhkci10b29sYmFyIHtcXG4gIGZvbnQtc2l6ZTogMThweDsgfVxcblxcbi5qc1BhbmVsLWhlYWRlcmJhciB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgLW1zLWZsZXgtd3JhcDogbm93cmFwO1xcbiAgZmxleC13cmFwOiBub3dyYXA7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1pbi1oZWlnaHQ6IDM4cHg7IH1cXG4gIC5qc1BhbmVsLWhlYWRlcmJhciBpbWcge1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgICBtYXgtaGVpZ2h0OiAzOHB4OyB9XFxuXFxuLmpzUGFuZWwtdGl0bGViYXIge1xcbiAgLW1zLWZsZXg6IDEgMSBhdXRvO1xcbiAgZmxleDogMSAxIGF1dG87XFxuICBjdXJzb3I6IG1vdmU7XFxuICBtaW4taGVpZ2h0OiAzMnB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgLmpzUGFuZWwtdGl0bGViYXIgaDMge1xcbiAgICBjb2xvcjogIzAwMDAwMDtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJPcGVuIFNhbnNcXFwiLFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWY7XFxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgICBmb250LXNpemU6IDE2cHg7XFxuICAgIGZvbnQtdmFyaWFudDogc21hbGwtY2FwcztcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgbWFyZ2luOiAxMHB4IDVweCAxMHB4IDhweDsgfVxcbiAgICAuanNQYW5lbC10aXRsZWJhciBoMyBzbWFsbCB7XFxuICAgICAgZm9udC1zaXplOiA3NSU7XFxuICAgICAgY29sb3I6IGluaGVyaXQ7IH1cXG5cXG4uanNQYW5lbC10aXRsZWJhci5qc1BhbmVsLXJ0bCBoMyB7XFxuICBmbGV4OiAxIDAgYXV0bzsgfVxcblxcbi5qc1BhbmVsLWNvbnRyb2xiYXIge1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHRvdWNoLWFjdGlvbjogbm9uZTsgfVxcbiAgLmpzUGFuZWwtY29udHJvbGJhciBkaXYgc3Bhbjpob3ZlciwgLmpzUGFuZWwtY29udHJvbGJhciBkaXYgc3ZnOmhvdmVyIHtcXG4gICAgb3BhY2l0eTogLjY7IH1cXG4gIC5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuIHtcXG4gICAgcGFkZGluZzogMCAzcHg7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgdG91Y2gtYWN0aW9uOiBub25lOyB9XFxuICAgIC5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuIHNwYW4ge1xcbiAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IH1cXG4gICAgLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4gc3Bhbi5nbHlwaGljb24ge1xcbiAgICAgIHBhZGRpbmc6IDAgMnB4OyB9XFxuICAgIC5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuIHNwYW4uZmEsIC5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuIHNwYW4uZmFyLCAuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0biBzcGFuLmZhbCB7XFxuICAgICAgcGFkZGluZzogMCA0cHggMCAzcHg7IH1cXG4gICAgLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4gc3ZnIHtcXG4gICAgICBtYXJnaW46IDAgNHB4IDAgMnB4OyB9XFxuICAuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0bi1ub3JtYWxpemUge1xcbiAgICBkaXNwbGF5OiBub25lOyB9XFxuICAuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0bi1zbWFsbGlmeXJldiB7XFxuICAgIGRpc3BsYXk6IG5vbmU7IH1cXG5cXG4uanNQYW5lbC1oZHItdG9vbGJhciB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgd2lkdGg6IGF1dG87XFxuICBoZWlnaHQ6IGF1dG87XFxuICBmb250LXNpemU6IDE2cHg7IH1cXG5cXG4uanNQYW5lbC1oZHItdG9vbGJhci5hY3RpdmUge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIC1tcy1mbGV4LXdyYXA6IG5vd3JhcDtcXG4gIGZsZXgtd3JhcDogbm93cmFwO1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cXG4gIC5qc1BhbmVsLWhkci10b29sYmFyLmFjdGl2ZSA+ICoge1xcbiAgICBtYXJnaW46IDZweCA4cHg7IH1cXG5cXG4vKiBzdHlsZXMgZm9yIHBhbmVscyB1c2luZyBvcHRpb24ucnRsICovXFxuLmpzUGFuZWwtaGVhZGVyYmFyLmpzUGFuZWwtcnRsLCAuanNQYW5lbC1jb250cm9sYmFyLmpzUGFuZWwtcnRsLCAuanNQYW5lbC1oZHItdG9vbGJhci5qc1BhbmVsLXJ0bCB7XFxuICAtbXMtZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlO1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlOyB9XFxuXFxuLmpzUGFuZWwtaGRyLXRvb2xiYXIuYWN0aXZlLmpzUGFuZWwtcnRsIHtcXG4gIHBhZGRpbmc6IDdweCAwIDEwcHggMDsgfVxcblxcbi5qc1BhbmVsLWZ0ci5qc1BhbmVsLXJ0bCB7XFxuICAtbXMtZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7IH1cXG5cXG4vKiBjb250YWluZXIgdGhhdCB0YWtlcyB0aGUgbWluaWZpZWQganNQYW5lbHMgKi9cXG4janNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXIsIC5qc1BhbmVsLW1pbmltaXplZC1ib3gge1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtZmxvdzogcm93IHdyYXAtcmV2ZXJzZTtcXG4gIGZsZXgtZmxvdzogcm93IHdyYXAtcmV2ZXJzZTtcXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IG5vbmUgcmVwZWF0IHNjcm9sbCAwIDA7XFxuICBib3R0b206IDA7XFxuICBoZWlnaHQ6IGF1dG87XFxuICBsZWZ0OiAwO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgd2lkdGg6IGF1dG87XFxuICB6LWluZGV4OiA5OTk4OyB9XFxuICAjanNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQsIC5qc1BhbmVsLW1pbmltaXplZC1ib3ggLmpzUGFuZWwtcmVwbGFjZW1lbnQge1xcbiAgICB3aWR0aDogMjAwcHg7XFxuICAgIGhlaWdodDogNDBweDtcXG4gICAgbWFyZ2luOiAxcHggMXB4IDAgMDtcXG4gICAgei1pbmRleDogOTk5OTsgfVxcbiAgICAjanNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtaGRyLCAuanNQYW5lbC1taW5pbWl6ZWQtYm94IC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWhkciB7XFxuICAgICAgcGFkZGluZzogMDsgfVxcbiAgICAgICNqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGVhZGVybG9nbywgLmpzUGFuZWwtbWluaW1pemVkLWJveCAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGVhZGVybG9nbyB7XFxuICAgICAgICBtYXgtd2lkdGg6IDUwJTtcXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47IH1cXG4gICAgICAgICNqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGVhZGVybG9nbyBpbWcsIC5qc1BhbmVsLW1pbmltaXplZC1ib3ggLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhlYWRlcmxvZ28gaW1nIHtcXG4gICAgICAgICAgbWF4LXdpZHRoOiAxMDBweDtcXG4gICAgICAgICAgbWF4LWhlaWdodDogMzhweDsgfVxcbiAgICAjanNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtdGl0bGViYXIsIC5qc1BhbmVsLW1pbmltaXplZC1ib3ggLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtdGl0bGViYXIge1xcbiAgICAgIC1tcy1mbGV4OiAxIDEgNjAlO1xcbiAgICAgIGZsZXg6IDEgMSAwO1xcbiAgICAgIGN1cnNvcjogZGVmYXVsdDsgfVxcbiAgICAjanNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtYnRuLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZSwgLmpzUGFuZWwtbWluaW1pemVkLWJveCAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1idG4uanNQYW5lbC1idG4tbm9ybWFsaXplIHtcXG4gICAgICBkaXNwbGF5OiBibG9jazsgfVxcblxcbi5qc1BhbmVsLW1pbmltaXplZC1ib3gge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IGF1dG87IH1cXG5cXG4vKiBoZWxwZXIgY2xhc3NlcyB0byBtYWtlIC5qc1BhbmVsLWNvbnRlbnQgYSBmbGV4IGJveCAqL1xcbi5mbGV4T25lIHtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LWZsb3c6IHJvdyB3cmFwO1xcbiAgZmxleC1mbG93OiByb3cgd3JhcDsgfVxcblxcbi8qIGNzcyBmb3IgcmVzaXplaXQgaGFuZGxlcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtcmVzaXplaXQtaGFuZGxlIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgZm9udC1zaXplOiAwLjFweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvdWNoLWFjdGlvbjogbm9uZTsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LW4ge1xcbiAgY3Vyc29yOiBuLXJlc2l6ZTtcXG4gIGhlaWdodDogMTJweDtcXG4gIGxlZnQ6IDlweDtcXG4gIHRvcDogLTVweDtcXG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAxOHB4KTsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LWUge1xcbiAgY3Vyc29yOiBlLXJlc2l6ZTtcXG4gIGhlaWdodDogY2FsYygxMDAlIC0gMThweCk7XFxuICByaWdodDogLTlweDtcXG4gIHRvcDogOXB4O1xcbiAgd2lkdGg6IDEycHg7IH1cXG5cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUuanNQYW5lbC1yZXNpemVpdC1zIHtcXG4gIGJvdHRvbTogLTlweDtcXG4gIGN1cnNvcjogcy1yZXNpemU7XFxuICBoZWlnaHQ6IDEycHg7XFxuICBsZWZ0OiA5cHg7XFxuICB3aWR0aDogY2FsYygxMDAlIC0gMThweCk7IH1cXG5cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUuanNQYW5lbC1yZXNpemVpdC13IHtcXG4gIGN1cnNvcjogdy1yZXNpemU7XFxuICBoZWlnaHQ6IGNhbGMoMTAwJSAtIDE4cHgpO1xcbiAgbGVmdDogLTlweDtcXG4gIHRvcDogOXB4O1xcbiAgd2lkdGg6IDEycHg7IH1cXG5cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUuanNQYW5lbC1yZXNpemVpdC1uZSB7XFxuICBjdXJzb3I6IG5lLXJlc2l6ZTtcXG4gIGhlaWdodDogMThweDtcXG4gIHJpZ2h0OiAtOXB4O1xcbiAgdG9wOiAtOXB4O1xcbiAgd2lkdGg6IDE4cHg7IH1cXG5cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUuanNQYW5lbC1yZXNpemVpdC1zZSB7XFxuICBib3R0b206IC05cHg7XFxuICBjdXJzb3I6IHNlLXJlc2l6ZTtcXG4gIGhlaWdodDogMThweDtcXG4gIHJpZ2h0OiAtOXB4O1xcbiAgd2lkdGg6IDE4cHg7IH1cXG5cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUuanNQYW5lbC1yZXNpemVpdC1zdyB7XFxuICBib3R0b206IC05cHg7XFxuICBjdXJzb3I6IHN3LXJlc2l6ZTtcXG4gIGhlaWdodDogMThweDtcXG4gIGxlZnQ6IC05cHg7XFxuICB3aWR0aDogMThweDsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LW53IHtcXG4gIGN1cnNvcjogbnctcmVzaXplO1xcbiAgaGVpZ2h0OiAxOHB4O1xcbiAgbGVmdDogLTlweDtcXG4gIHRvcDogLTlweDtcXG4gIHdpZHRoOiAxOHB4OyB9XFxuXFxuLmpzUGFuZWwtZHJhZy1vdmVybGF5IHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMDsgfVxcblxcbi8qIGJveC1zaGFkb3dzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcbi5qc1BhbmVsLWRlcHRoLTEge1xcbiAgYm94LXNoYWRvdzogMCAzcHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xNiksIDAgM3B4IDZweCByZ2JhKDAsIDAsIDAsIDAuMjMpOyB9XFxuXFxuLmpzUGFuZWwtZGVwdGgtMiB7XFxuICBib3gtc2hhZG93OiAwIDEwcHggMjBweCByZ2JhKDAsIDAsIDAsIDAuMTkpLCAwIDZweCA2cHggcmdiYSgwLCAwLCAwLCAwLjIzKTsgfVxcblxcbi5qc1BhbmVsLWRlcHRoLTMge1xcbiAgYm94LXNoYWRvdzogMCAxNHB4IDI4cHggcmdiYSgwLCAwLCAwLCAwLjI1KSwgMCAxMHB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjIyKTsgfVxcblxcbi5qc1BhbmVsLWRlcHRoLTQge1xcbiAgYm94LXNoYWRvdzogMCAxOXB4IDM4cHggcmdiYSgwLCAwLCAwLCAwLjMpLCAwIDE1cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMjIpOyB9XFxuXFxuLmpzUGFuZWwtZGVwdGgtNSB7XFxuICBib3gtc2hhZG93OiAwIDI0cHggNDhweCByZ2JhKDAsIDAsIDAsIDAuMyksIDAgMjBweCAxNHB4IHJnYmEoMCwgMCwgMCwgMC4yMik7IH1cXG5cXG4vKiBzbmFwIHNlbnNpdGl2ZSBhcmVhcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXG4uanNQYW5lbC1zbmFwLWFyZWEge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgYmFja2dyb3VuZDogYmxhY2s7XFxuICBvcGFjaXR5OiAuMjtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHNpbHZlcjtcXG4gIGJveC1zaGFkb3c6IDAgMTRweCAyOHB4IHJnYmEoMCwgMCwgMCwgMC41KSwgMCAxMHB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgei1pbmRleDogOTk5OTsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1sdCwgLmpzUGFuZWwtc25hcC1hcmVhLWxjLCAuanNQYW5lbC1zbmFwLWFyZWEtbGIge1xcbiAgbGVmdDogMDsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1jdCwgLmpzUGFuZWwtc25hcC1hcmVhLWNiIHtcXG4gIGxlZnQ6IDM3LjUlOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLXJ0LCAuanNQYW5lbC1zbmFwLWFyZWEtcmMsIC5qc1BhbmVsLXNuYXAtYXJlYS1yYiB7XFxuICByaWdodDogMDsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1sdCwgLmpzUGFuZWwtc25hcC1hcmVhLWN0LCAuanNQYW5lbC1zbmFwLWFyZWEtcnQge1xcbiAgdG9wOiAwOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWxjLCAuanNQYW5lbC1zbmFwLWFyZWEtcmMge1xcbiAgdG9wOiAzNy41JTsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1sYiwgLmpzUGFuZWwtc25hcC1hcmVhLWNiLCAuanNQYW5lbC1zbmFwLWFyZWEtcmIge1xcbiAgYm90dG9tOiAwOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWN0LCAuanNQYW5lbC1zbmFwLWFyZWEtY2Ige1xcbiAgd2lkdGg6IDI1JTsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1sYywgLmpzUGFuZWwtc25hcC1hcmVhLXJjIHtcXG4gIGhlaWdodDogMjUlOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWx0IHtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMDAlOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLXJ0IHtcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEwMCU7IH1cXG5cXG4uanNQYW5lbC1zbmFwLWFyZWEtcmIge1xcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTAwJTsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1sYiB7XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTAwJTsgfVxcblxcbi8qIGJvb3RzdHJhcCBhZGp1c3RtZW50cyAqL1xcbi5qc1BhbmVsLnBhbmVsLWRlZmF1bHQsIC5qc1BhbmVsLnBhbmVsLXByaW1hcnksIC5qc1BhbmVsLnBhbmVsLWluZm8sIC5qc1BhbmVsLnBhbmVsLXN1Y2Nlc3MsIC5qc1BhbmVsLnBhbmVsLXdhcm5pbmcsIC5qc1BhbmVsLnBhbmVsLWRhbmdlciwgLmpzUGFuZWwuY2FyZC5jYXJkLWludmVyc2Uge1xcbiAgYm94LXNoYWRvdzogMCAwIDZweCByZ2JhKDAsIDMzLCA1MCwgMC4xKSwgMCA3cHggMjVweCByZ2JhKDE3LCAzOCwgNjAsIDAuNCk7IH1cXG5cXG4uanNQYW5lbC5wYW5lbCB7XFxuICBtYXJnaW46IDA7IH1cXG5cXG4uanNQYW5lbC1oZHIucGFuZWwtaGVhZGluZyB7XFxuICBib3JkZXItYm90dG9tOiBub25lO1xcbiAgcGFkZGluZzogMDsgfVxcblxcbi5qc1BhbmVsLXRpdGxlLnBhbmVsLXRpdGxlIC5zbWFsbCwgLmpzUGFuZWwtdGl0bGUucGFuZWwtdGl0bGUgc21hbGwge1xcbiAgZm9udC1zaXplOiA3NSU7IH1cXG5cXG4vKiBib290c3RyYXAgNCBhZGp1c3RtZW50cyAqL1xcbi5qc1BhbmVsLmNhcmQuY2FyZC1pbnZlcnNlIHtcXG4gIGJveC1zaGFkb3c6IDAgMCA2cHggcmdiYSgwLCAzMywgNTAsIDAuMSksIDAgN3B4IDI1cHggcmdiYSgxNywgMzgsIDYwLCAwLjQpOyB9XFxuXFxuLmNhcmQtZGVmYXVsdCB7XFxuICBiYWNrZ3JvdW5kOiAjZjVmNWY1OyB9XFxuXFxuLmNhcmQtcHJpbWFyeSA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCxcXG4uY2FyZC1zdWNjZXNzID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkLFxcbi5jYXJkLWluZm8gPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQsXFxuLmNhcmQtd2FybmluZyA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCxcXG4uY2FyZC1kYW5nZXIgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQge1xcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICBjb2xvcjogI2Y1ZjVmNTsgfVxcblxcbi5jYXJkLWRlZmF1bHQgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQge1xcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi8qIGNzczMgYW5pbWF0aW9ucyAqL1xcbkBrZXlmcmFtZXMganNQYW5lbEZhZGVJbiB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG4uanNQYW5lbEZhZGVJbiB7XFxuICBvcGFjaXR5OiAwO1xcbiAgYW5pbWF0aW9uOiBqc1BhbmVsRmFkZUluIGVhc2UtaW4gMTtcXG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiA2MDBtczsgfVxcblxcbkBrZXlmcmFtZXMganNQYW5lbEZhZGVPdXQge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMDsgfSB9XFxuXFxuLmpzUGFuZWxGYWRlT3V0IHtcXG4gIGFuaW1hdGlvbjoganNQYW5lbEZhZGVPdXQgZWFzZS1pbiAxO1xcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDYwMG1zOyB9XFxuXFxuQGtleWZyYW1lcyBtb2RhbEJhY2tkcm9wRmFkZUluIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDAuNjU7IH0gfVxcblxcbi5qc1BhbmVsLW1vZGFsLWJhY2tkcm9wIHtcXG4gIGFuaW1hdGlvbjogbW9kYWxCYWNrZHJvcEZhZGVJbiBlYXNlLWluIDE7XFxuICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogNzUwbXM7XFxuICBiYWNrZ3JvdW5kOiBibGFjaztcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTsgfVxcblxcbkBrZXlmcmFtZXMgbW9kYWxCYWNrZHJvcEZhZGVPdXQge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDAuNjU7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMDsgfSB9XFxuXFxuLmpzUGFuZWwtbW9kYWwtYmFja2Ryb3Atb3V0IHtcXG4gIGFuaW1hdGlvbjogbW9kYWxCYWNrZHJvcEZhZGVPdXQgZWFzZS1pbiAxO1xcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDQwMG1zOyB9XFxuXFxuLmpzUGFuZWwtbW9kYWwtYmFja2Ryb3AtbXVsdGkge1xcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjE1KTsgfVxcblxcbi8qIF90aGVtZXNfbWRsLnNhc3M6IDIwMTctMDctMTIgMTk6MTYgKi9cXG4vKiBkZWZhdWx0IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXG4uanNQYW5lbC10aGVtZS1kZWZhdWx0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNjZmQ4ZGM7XFxuICBib3JkZXItY29sb3I6ICNjZmQ4ZGM7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1kZWZhdWx0ID4gLmpzUGFuZWwtaGRyICoge1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1kZWZhdWx0ID4gLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhkci10b29sYmFyIHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjOTBhNGFlOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtZGVmYXVsdCA+IC5qc1BhbmVsLWNvbnRlbnQge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM5MGE0YWU7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1kZWZhdWx0ID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNjZmQ4ZGM7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzkwYTRhZTsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRlZmF1bHQgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWRsaWdodCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWNlZmYxOyB9XFxuXFxuLyogcHJpbWFyeSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtdGhlbWUtcHJpbWFyeSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjE5NmYzO1xcbiAgYm9yZGVyLWNvbG9yOiAjMjE5NmYzOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtcHJpbWFyeSA+IC5qc1BhbmVsLWhkciAqIHtcXG4gIGNvbG9yOiAjZmZmZmZmOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtcHJpbWFyeSA+IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZHItdG9vbGJhciB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzQyYTVmNTsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXByaW1hcnkgPiAuanNQYW5lbC1jb250ZW50IHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNDJhNWY1OyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtcHJpbWFyeSA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjE5NmYzO1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM0MmE1ZjU7XFxuICBjb2xvcjogI2ZmZmZmZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXByaW1hcnkgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWRsaWdodCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYmJkZWZiO1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4vKiBpbmZvIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXG4uanNQYW5lbC10aGVtZS1pbmZvIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyOWI2ZjY7XFxuICBib3JkZXItY29sb3I6ICMyOWI2ZjY7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1pbmZvID4gLmpzUGFuZWwtaGRyICoge1xcbiAgY29sb3I6ICNmZmZmZmY7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1pbmZvID4gLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhkci10b29sYmFyIHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNGZjM2Y3OyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtaW5mbyA+IC5qc1BhbmVsLWNvbnRlbnQge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM0ZmMzZjc7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1pbmZvID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyOWI2ZjY7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzRmYzNmNztcXG4gIGNvbG9yOiAjZmZmZmZmOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtaW5mbyA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZGxpZ2h0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlMWY1ZmU7XFxuICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi8qIHN1Y2Nlc3MgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcbi5qc1BhbmVsLXRoZW1lLXN1Y2Nlc3Mge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRjYWY1MDtcXG4gIGJvcmRlci1jb2xvcjogIzRjYWY1MDsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXN1Y2Nlc3MgPiAuanNQYW5lbC1oZHIgKiB7XFxuICBjb2xvcjogI2ZmZmZmZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXN1Y2Nlc3MgPiAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGRyLXRvb2xiYXIge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM4MWM3ODQ7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1zdWNjZXNzID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0Y2FmNTA7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzgxYzc4NDtcXG4gIGNvbG9yOiAjZmZmZmZmOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtc3VjY2VzcyA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZGxpZ2h0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlOGY1ZTk7XFxuICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi8qIHdhcm5pbmcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcbi5qc1BhbmVsLXRoZW1lLXdhcm5pbmcge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYzEwNztcXG4gIGJvcmRlci1jb2xvcjogI2ZmYzEwNzsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXdhcm5pbmcgPiAuanNQYW5lbC1oZHIgKiB7XFxuICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXdhcm5pbmcgPiAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGRyLXRvb2xiYXIge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmZmQ1NGY7IH1cXG5cXG4uanNQYW5lbC10aGVtZS13YXJuaW5nID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmMxMDc7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgI2ZmZDU0ZjtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtd2FybmluZyA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZGxpZ2h0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmYzZTA7XFxuICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi8qIGRhbmdlciAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcbi5qc1BhbmVsLXRoZW1lLWRhbmdlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYzZDAwO1xcbiAgYm9yZGVyLWNvbG9yOiAjZmYzZDAwOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtZGFuZ2VyID4gLmpzUGFuZWwtaGRyICoge1xcbiAgY29sb3I6ICNmZmZmZmY7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1kYW5nZXIgPiAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGRyLXRvb2xiYXIge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmZjZlNDA7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1kYW5nZXIgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmM2QwMDtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZmY2ZTQwO1xcbiAgY29sb3I6ICNmZmZmZmY7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1kYW5nZXIgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWRsaWdodCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY5ZTgwO1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4uanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1ub2hlYWRlciB7XFxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAzcHg7XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogM3B4O1xcbiAgYm9yZGVyOiBub25lICFpbXBvcnRhbnQ7IH1cXG5cXG4uanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1ub2Zvb3RlciB7XFxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAzcHg7XFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogM3B4OyB9XFxuXFxuYm9keSB7XFxuICAtbXMtb3ZlcmZsb3ctc3R5bGU6IHNjcm9sbGJhcjsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvanNwYW5lbDQvZGlzdC9qc3BhbmVsLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9kaXN0L2pzcGFuZWwuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI2J1dHRwbHVnZGV2dG9vbHNsb2dwYW5lbCB7XFxuICAgIGRpc3BsYXk6ZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246Y29sdW1uO1xcbiAgICB3aWR0aDoxMDAlO1xcbiAgICBoZWlnaHQ6MTAwJTtcXG4gICAgYWxpZ24taXRlbXM6Y2VudGVyO1xcbiAgICBjb2xvcjogIzAwMDtcXG59XFxuXFxuI2J1dHRwbHVnZGV2dG9vbHNsb2dwYW5lbCBpbnB1dCxzZWxlY3QsdGV4dGFyZWEge1xcbiAgICBjb2xvcjogIzAwMDtcXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcXG59XFxuXFxuI2J1dHRwbHVnZGV2dG9vbHNsb2dwYW5lbCAjYnV0dHBsdWdkZXZ0b29sc2xvZ3RleHRhcmVhIHtcXG4gICAgZm9udC1zaXplOiA4cHQ7XFxuICAgIHdpZHRoOjEwMCU7XFxuICAgIGZsZXg6MSAxO1xcbiAgICBwYWRkaW5nOjVweDtcXG4gICAgYm94LXNpemluZzpib3JkZXItYm94O1xcbn1cXG4jYnV0dHBsdWdkZXZ0b29sc2xvZ3BhbmVsICNidXR0cGx1Z2RldnRvb2xzbG9nbGV2ZWwge1xcbiAgICB3aWR0aDo5OCU7XFxuICAgIGZsZXg6bm9uZTtcXG4gICAgcGFkZGluZzo1cHg7XFxuICAgIGJveC1zaXppbmc6Ym9yZGVyLWJveDtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL3NyYy9kZXZ0b29scy93ZWIvTG9nUGFuZWwuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3JjL2RldnRvb2xzL3dlYi9Mb2dQYW5lbC5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJtYWluIHtcXG4gICAgd2lkdGg6MTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG5zZWN0aW9uIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgcGFkZGluZzogMjBweDtcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkZGQ7XFxufVxcblxcbmlucHV0IHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxubGFiZWwge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIG1hcmdpbjogMCAwIC0xcHg7XFxuICAgIHBhZGRpbmc6IDVweCAxMHB4O1xcbiAgICBmb250LXdlaWdodDogNjAwO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGNvbG9yOiAjYmJiO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcXG59XFxuXFxubGFiZWw6YmVmb3JlIHtcXG4gICAgZm9udC1mYW1pbHk6IGZvbnRhd2Vzb21lO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxufVxcblxcbmxhYmVsOmhvdmVyIHtcXG4gICAgY29sb3I6ICM4ODg7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuaW5wdXQ6Y2hlY2tlZCArIGxhYmVsIHtcXG4gICAgY29sb3I6ICM1NTU7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XFxuICAgIGJvcmRlci10b3A6IDJweCBzb2xpZCBvcmFuZ2U7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZmZmO1xcbn1cXG5cXG4jdGFiMTpjaGVja2VkIH4gI2NvbnRlbnQxLFxcbiN0YWIyOmNoZWNrZWQgfiAjY29udGVudDIsXFxuI3RhYjM6Y2hlY2tlZCB+ICNjb250ZW50MyxcXG4jdGFiNDpjaGVja2VkIH4gI2NvbnRlbnQ0IHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbiNjb250ZW50MSB7XFxuICAgIGhlaWdodDogMTAwJTtcXG59XFxuXFxuI2NvbnRlbnQyIHtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4jc2ltdWxhdG9yIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogY2FsYygxMDAlIC0gNjBweCk7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxufVxcblxcbi5mbGVzaGxpZ2h0LXNpbSB7XFxuICAgIGZsZXg6IDE7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG5kaXYuYy1mbGVzaGxpZ2h0IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleDogMTtcXG59XFxuXFxuZGl2LmMtZmxlc2hsaWdodCBpbWcge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHdpZHRoOiBhdXRvO1xcblxcdCAgaW1hZ2UtcmVuZGVyaW5nOiAtbW96LWNyaXNwLWVkZ2VzO1xcblxcdCAgaW1hZ2UtcmVuZGVyaW5nOiAtby1jcmlzcC1lZGdlcztcXG5cXHQgIGltYWdlLXJlbmRlcmluZzogLXdlYmtpdC1vcHRpbWl6ZS1jb250cmFzdDtcXG5cXHQgIGltYWdlLXJlbmRlcmluZzogcGl4ZWxhdGVkO1xcbn1cXG5cXG5kaXYuYy1mbGVzaGxpZ2h0IC5vLWZsZXNobGlnaHQge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGhlaWdodDogNzclO1xcbn1cXG5cXG4udmlicmF0b3Itc2ltdWxhdG9yLWNvbXBvbmVudCB7XFxuICAgIGZsZXg6IDE7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG5kaXYudmlicmF0b3Ige1xcbiAgICBmbGV4OiAxIDE7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmRpdi52aWJyYXRvci1zaW11bGF0b3ItY29tcG9uZW50IGltZyB7XFxuICAgIGhlaWdodDogY2FsYygxMDAlIC0gNDBweCk7XFxuICAgIHdpZHRoOiBhdXRvO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGltYWdlLXJlbmRlcmluZzogLW1vei1jcmlzcC1lZGdlcztcXG5cXHQgIGltYWdlLXJlbmRlcmluZzogLW8tY3Jpc3AtZWRnZXM7XFxuXFx0ICBpbWFnZS1yZW5kZXJpbmc6IC13ZWJraXQtb3B0aW1pemUtY29udHJhc3Q7XFxuXFx0ICBpbWFnZS1yZW5kZXJpbmc6IHBpeGVsYXRlZDtcXG59XFxuXFxuZGl2LnZpYnJhdG9yLWluZm8ge1xcbiAgICBmbGV4OiAwO1xcbn1cXG5cXG4uc2ltdWxhdG9yLWRpdmlkZXIge1xcbiAgICBib3JkZXItbGVmdDogMXB4ICMwMDAgZGFzaGVkO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxufVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9zcmMvZGV2dG9vbHMvd2ViL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3JjL2RldnRvb2xzL3dlYi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlU291cmNlTWFwKSB7XG5cdHZhciBsaXN0ID0gW107XG5cblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmV0dXJuIFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgY29udGVudCArIFwifVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSkuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcblx0dmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuXHR2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cdGlmICghY3NzTWFwcGluZykge1xuXHRcdHJldHVybiBjb250ZW50O1xuXHR9XG5cblx0aWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuXHRcdHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0XHRyZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcblx0fVxuXG5cdHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuXHR2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuXG5cdHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlc2NhcGUodXJsKSB7XG4gICAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB1cmxcbiAgICB9XG4gICAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gICAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gICAgfVxuICAgIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICAgIGlmICgvW1wiJygpIFxcdFxcbl0vLnRlc3QodXJsKSkge1xuICAgICAgICByZXR1cm4gJ1wiJyArIHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csICdcXFxcbicpICsgJ1wiJ1xuICAgIH1cblxuICAgIHJldHVybiB1cmxcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL3VybC9lc2NhcGUuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL3VybC9lc2NhcGUuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4gKCcgKyBlciArICcpJyk7XG4gICAgICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmICh0aGlzLl9ldmVudHMpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoZXZsaXN0ZW5lcilcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTphcHBsaWNhdGlvbi92bmQubXMtZm9udG9iamVjdDtiYXNlNjQsWEFnQUFMZ0hBQUFCQUFJQUFBQUFBQUFBQUFBQUFBQUFBQUFCQUpBQkFBQUFBRXhRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUVBQUFBQUFBQUFQWDZ4TmdBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUE0QWFnQnpBR2NBYkFCNUFIQUFhQUFBQUE0QVVnQmxBR2NBZFFCc0FHRUFjZ0FBQUJZQVZnQmxBSElBY3dCcEFHOEFiZ0FnQURFQUxnQXdBQUFBRGdCcUFITUFad0JzQUhrQWNBQm9BQUFBQUFBQUFRQUFBQXNBZ0FBREFEQlBVeTh5RHhJRzRRQUFBTHdBQUFCZ1kyMWhjQmRXMG93QUFBRWNBQUFBVkdkaGMzQUFBQUFRQUFBQmNBQUFBQWhuYkhsbVdhaGpYQUFBQVhnQUFBTEVhR1ZoWkFpOE13UUFBQVE4QUFBQU5taG9aV0VJVGdUd0FBQUVkQUFBQUNSb2JYUjRKTjRFd0FBQUJKZ0FBQUFvYkc5allRTUtBa2dBQUFUQUFBQUFGbTFoZUhBQURnQTFBQUFFMkFBQUFDQnVZVzFsU3EzS0dRQUFCUGdBQUFLZ2NHOXpkQUFEQUFBQUFBZVlBQUFBSUFBREJMSUJrQUFGQUFBQ21RTE1BQUFBandLWkFzd0FBQUhyQURNQkNRQUFBQUFBQUFBQUFBQUFBQUFBQUFFUUFBQUFBQUFBQUFBQUFBQUFBQUFBQUVBQUFPa0ZBOEQvd0FCQUE4QUFRQUFBQUFFQUFBQUFBQUFBQUFBQUFDQUFBQUFBQUFNQUFBQURBQUFBSEFBQkFBTUFBQUFjQUFNQUFRQUFBQndBQkFBNEFBQUFDZ0FJQUFJQUFnQUJBQ0RwQmYvOS8vOEFBQUFBQUNEcEFQLzkvLzhBQWYvakZ3UUFBd0FCQUFBQUFBQUFBQUFBQUFBQkFBSC8vd0FQQUFFQUFBQUFBQUFBQUFBQ0FBQTNPUUVBQUFBQUFRQUFBQUFBQUFBQUFBSUFBRGM1QVFBQUFBQUJBQUFBQUFBQUFBQUFBZ0FBTnprQkFBQUFBQUVBbVFFSkJJd0NYZ0FlQUFBQkxnRUhEZ01ITGdNbkpnWUhCaFlYSGdNek1qWWxQZ0VuQkl3TExCUkNpWFpiRlJWYWRZZEJGQ3NNQ3d3VW83dGlId1VOaEFGVEZBd0tBa2dVRFFza1NUOHVDZ2d1UDBva0RBMFRGQ3dMWEdNdUNEMjNDeXdVQUFBQUFRQ1pBUkFFakFKbEFCNEFBQUVPQVNjdUF5Y09Bd2NHSmljbU5qYytBek15RmdVZUFRY0VqQXNzRkVLSmRsc1ZGVnAxaDBFVUt3d0xEQlNqdTJJZkJRMkVBVk1VREFvQkpoUU5DeVJKUHk0S0NTMC9TaVVMREJRVUxBdGNZeTRJUHJjTEt4UUFBQUFCQVAwQUt3UVdBMFlBSmdBQUNRRTJOQ2NtSWdjSkFTWWlCd1lVRndrQkJoUVhIZ0V6TWpZM0NRRWVBVE15TmpjMk5DY0JBdEVCUlE4UER5c1AvcnordkE4cUR3OFBBVVQreUE4UENCSUtDaE1IQVRnQk9BY1RDZ29UQnc4UC9zZ0J1Z0ZFRHlvUER3Lyt2QUZFRHc4UEtnLyt2UDdJRHlvUENBY0hDQUUzL3NrSUJ3Y0lEeW9QQVRnQUFBSUEyd0FKQkVrRGR3QVFBQnNBQUFFaElnWVZFUlFXTXlFeU5qVVJOQ1lqRVNFaUpqVVJJUkVVQmlNRDJQMTFMME5ETHdLTEwwSkNMLzExRVJjQzJ4Y1JBM2RCTC8xeUwwRkJMd0tPTDBIODJ4Y1FBbG45cHhBWEFBQUFBUURiQUFrRVNRRGxBQkFBQUNVaElnWWRBUlFXTXlFeU5qMEJOQ1lqQTlMOWdDNUpTUzRDZ0M1SlNTN2xHRWNlUnhnWVJ4NUhHQUFEQU5zQUNRUkpBMEFBRUFBYkFESUFBQUVoSWdZVkVSUVdNeUV5TmpVUk5DWWpFeFFHSXlFaUpqVVJJUkVUSVNJR0hRRXpOU0VSRkFZckFSVXpNalkxRVRRbUl3TlQvZVluTnpjbkFob25QVDBuTFI4Ty9lWU9HUUp1YlAzbUp6MDNBbTBaRFJFUkpqYzNKZ0ozUVIvK1B5QXRMU0FCd1I5Qi9kOExIUjBMQWJQK1RRTHFMUjlaTi81Z0N6QWxRUjhCd2g4dEFBQUFBQUVBQUFBQkFBQTJzWDQ5WHc4ODlRQUxCQUFBQUFBQTBvajNTQUFBQUFEU2lQZElBQUFBQUFTTUEzY0FBQUFJQUFJQUFBQUFBQUFBQVFBQUE4RC93QUFBQlNVQUFBQUFCSXdBQVFBQUFBQUFBQUFBQUFBQUFBQUFBQW9FQUFBQUFBQUFBQUFBQUFBQ0FBQUFCU1VBbVFVbEFKa0ZKUUQ5QlNVQTJ3VWxBTnNGSlFEYkFBQUFBQUFLQUJRQUhnQlNBSVlBekFENkFSWUJZZ0FBQUFFQUFBQUtBRE1BQXdBQUFBQUFBZ0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFXQVE0QUFRQUFBQUFBQUFBVEFKWUFBUUFBQUFBQUFRQUhBQUFBQVFBQUFBQUFBZ0FIQVJvQUFRQUFBQUFBQXdBSEFQQUFBUUFBQUFBQUJBQUhBUzhBQVFBQUFBQUFCUUFMQU04QUFRQUFBQUFBQmdBSEFRVUFBUUFBQUFBQUNRQU9BQlVBQVFBQUFBQUFDZ0FhQVVRQUFRQUFBQUFBREFBYUFEOEFBUUFBQUFBQURRQURBSTBBQXdBQkJBa0FBQUFtQUtrQUF3QUJCQWtBQVFBT0FBY0FBd0FCQkFrQUFnQU9BU0VBQXdBQkJBa0FBd0FPQVBjQUF3QUJCQWtBQkFBT0FUWUFBd0FCQkFrQUJRQVdBTm9BQXdBQkJBa0FCZ0FPQVF3QUF3QUJCQWtBQ1FBY0FDTUFBd0FCQkFrQUNnQTBBVjRBQXdBQkJBa0FEQUEwQUZrQUF3QUJCQWtBRFFBR0FKQnFjMmRzZVhCb0FHb0Fjd0JuQUd3QWVRQndBR2hUZEdWbVlXNGdVM1J5NU45bGNnQlRBSFFBWlFCbUFHRUFiZ0FnQUZNQWRBQnlBT1FBM3dCbEFISm9kSFJ3T2k4dmMzUmxabUZ1YzNSeVlXVnpjMlZ5TG1WMUx3Qm9BSFFBZEFCd0FEb0FMd0F2QUhNQWRBQmxBR1lBWVFCdUFITUFkQUJ5QUdFQVpRQnpBSE1BWlFCeUFDNEFaUUIxQUM5TlNWUUFUUUJKQUZReU1ERTFJRk4wWldaaGJpQlRkSExrMzJWeUFESUFNQUF4QURVQUlBQlRBSFFBWlFCbUFHRUFiZ0FnQUZNQWRBQnlBT1FBM3dCbEFISldaWEp6YVc5dUlERXVNQUJXQUdVQWNnQnpBR2tBYndCdUFDQUFNUUF1QURCcWMyZHNlWEJvQUdvQWN3Qm5BR3dBZVFCd0FHaHFjMmRzZVhCb0FHb0Fjd0JuQUd3QWVRQndBR2hTWldkMWJHRnlBRklBWlFCbkFIVUFiQUJoQUhKcWMyZHNlWEJvQUdvQWN3Qm5BR3dBZVFCd0FHaEdiMjUwSUdkbGJtVnlZWFJsWkNCaWVTQkpZMjlOYjI5dUxnQkdBRzhBYmdCMEFDQUFad0JsQUc0QVpRQnlBR0VBZEFCbEFHUUFJQUJpQUhrQUlBQkpBR01BYndCTkFHOEFid0J1QUM0QUF3QUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQT09XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9kaXN0L2ZvbnRzL2pzZ2x5cGguZW90XG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9kaXN0L2ZvbnRzL2pzZ2x5cGguZW90XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQnpkR0Z1WkdGc2IyNWxQU0p1YnlJL1BnbzhJVVJQUTFSWlVFVWdjM1puSUZCVlFreEpReUFpTFM4dlZ6TkRMeTlFVkVRZ1UxWkhJREV1TVM4dlJVNGlJQ0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTlIY21Gd2FHbGpjeTlUVmtjdk1TNHhMMFJVUkM5emRtY3hNUzVrZEdRaUlENEtQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpUGdvOGJXVjBZV1JoZEdFK0NqeHFjMjl1UGdvOElWdERSRUZVUVZzS2V3b0pJbVp2Ym5SR1lXMXBiSGtpT2lBaWFuTm5iSGx3YUNJc0Nna2liV0ZxYjNKV1pYSnphVzl1SWpvZ01Td0tDU0p0YVc1dmNsWmxjbk5wYjI0aU9pQXdMQW9KSW1SbGMybG5ibVZ5SWpvZ0lsTjBaV1poYmlCVGRITERwTU9mWlhJaUxBb0pJbVJsYzJsbmJtVnlWVkpNSWpvZ0ltaDBkSEE2THk5emRHVm1ZVzV6ZEhKaFpYTnpaWEl1WlhVdklpd0tDU0pzYVdObGJuTmxJam9nSWsxSlZDSXNDZ2tpWTI5d2VYSnBaMmgwSWpvZ0lqSXdNVFVnVTNSbFptRnVJRk4wY3NPa3c1OWxjaUlzQ2draWRtVnljMmx2YmlJNklDSldaWEp6YVc5dUlERXVNQ0lzQ2draVptOXVkRWxrSWpvZ0ltcHpaMng1Y0dnaUxBb0pJbkJ6VG1GdFpTSTZJQ0pxYzJkc2VYQm9JaXdLQ1NKemRXSkdZVzFwYkhraU9pQWlVbVZuZFd4aGNpSXNDZ2tpWm5Wc2JFNWhiV1VpT2lBaWFuTm5iSGx3YUNJc0Nna2laR1Z6WTNKcGNIUnBiMjRpT2lBaVJtOXVkQ0JuWlc1bGNtRjBaV1FnWW5rZ1NXTnZUVzl2Ymk0aUNuMEtYVjArQ2p3dmFuTnZiajRLUEM5dFpYUmhaR0YwWVQ0S1BHUmxabk0rQ2p4bWIyNTBJR2xrUFNKcWMyZHNlWEJvSWlCb2IzSnBlaTFoWkhZdGVEMGlNVEF5TkNJK0NqeG1iMjUwTFdaaFkyVWdkVzVwZEhNdGNHVnlMV1Z0UFNJeE1ESTBJaUJoYzJObGJuUTlJamsyTUNJZ1pHVnpZMlZ1ZEQwaUxUWTBJaUF2UGdvOGJXbHpjMmx1WnkxbmJIbHdhQ0JvYjNKcGVpMWhaSFl0ZUQwaU1UQXlOQ0lnTHo0S1BHZHNlWEJvSUhWdWFXTnZaR1U5SWlZamVESXdPeUlnYUc5eWFYb3RZV1IyTFhnOUlqVXhNaUlnWkQwaUlpQXZQZ284WjJ4NWNHZ2dkVzVwWTI5a1pUMGlKaU40WlRrd01Ec2lJR2RzZVhCb0xXNWhiV1U5SW1Ob1pYWnliMjR0Wkc5M2JpSWdaR0YwWVMxMFlXZHpQU0pqYUdWMmNtOXVMV1J2ZDI0aUlHaHZjbWw2TFdGa2RpMTRQU0l4TXpFM0lpQmtQU0pOTVRFMk15NDJOallnTlRnekxqZzBOV010TVRRdU5ESTNJREkyTGpZME1pMDBOeTQzTWpZZ016WXVOVFV6TFRjMExqTTFJREl5TGpFd055MHhOemN1TkRJMkxUazJMakV4TFRNM055NDNORFl0TWpBeUxqSTNOeTAwTXpNdU5EZ3hMVEl5T0M0d056Z3ROVFl1TWpFZ01qSXVPRGMxTFRJMU15NDFNVE1nTVRJNUxqRTFNaTAwTWpjdU56QXpJREl5Tnk0Mk1ESXRNall1TXpVZ01UUXVPVEF6TFRVNUxqZzBPU0ExTGpZeE5DMDNOQzQzTlRJdE1qQXVOemN6Y3kwMUxqWXhOQzAxT1M0NE16RWdNakF1TnpjekxUYzBMamMxTW1NME16TXVNVE0wTFRJME5DNDRNRGtnTkRZNExqZzRNaTB5TkRRdU9EQTVJRFE0TkM0eE16TXRNalEwTGpnd09TQXhOaTQxTkRrZ01DQXpNaTR5TURFZ01DQTBPRE11TWpjeklESTBOQzR6TXpRZ01qWXVOalF5SURFMExqUXlOeUF6Tmk0MU16VWdORGN1TnpJMklESXlMakV3TnlBM05DNHpOamg2SWlBdlBnbzhaMng1Y0dnZ2RXNXBZMjlrWlQwaUppTjRaVGt3TVRzaUlHZHNlWEJvTFc1aGJXVTlJbU5vWlhaeWIyNHRkWEFpSUdSaGRHRXRkR0ZuY3owaVkyaGxkbkp2YmkxMWNDSWdhRzl5YVhvdFlXUjJMWGc5SWpFek1UY2lJR1E5SWsweE1UWXpMalkyTmlBeU9UTXVPRGRqTFRFMExqUXlOeTB5Tmk0Mk1qUXRORGN1TnpJMkxUTTJMalUxTXkwM05DNHpOUzB5TWk0eE1EY3RNVGMzTGpReU5pQTVOaTR4TVMwek56Y3VOekk0SURJd01pNHlOemN0TkRNekxqUTJNeUF5TWpndU1EYzRMVFUyTGpJeExUSXlMamczTlMweU5UTXVOVEV6TFRFeU9TNHhOVEl0TkRJM0xqY3dNeTB5TWpjdU5UZzBMVEkyTGpNMUxURTBMamt5TVMwMU9TNDRORGt0TlM0Mk1UUXROelF1TnpVeUlESXdMamMxTkMweE5DNDVNRE1nTWpZdU16ZzJMVFV1TmpFMElEVTVMamcwT1NBeU1DNDNOek1nTnpRdU56VXlJRFF6TXk0eE1UVWdNalEwTGpnd09TQTBOamd1T0RZMElESTBOQzQ0TURrZ05EZzBMakV4TkNBeU5EUXVPREE1SURFMkxqVTBPU0F3SURNeUxqSXdNU0F3SURRNE15NHlOVFV0TWpRMExqTXpOQ0F5Tmk0Mk5qRXRNVFF1TkRJM0lETTJMalUxTXkwME55NDNORFFnTWpJdU1USTJMVGMwTGpNMk9Ib2lJQzgrQ2p4bmJIbHdhQ0IxYm1samIyUmxQU0ltSTNobE9UQXlPeUlnWjJ4NWNHZ3RibUZ0WlQwaVkyeHZjMlVpSUdSaGRHRXRkR0ZuY3owaVkyeHZjMlVpSUdodmNtbDZMV0ZrZGkxNFBTSXhNekUzSWlCa1BTSk5Oekl4TGpRNE1TQTBOREV1T0RFNWJETXlOQzR3T1RZZ016STBMakEzT0dNeE9TNDVPRFlnTWpBdU1EQTFJREU1TGprNE5pQTFNaTR6TnlBd0lEY3lMak0xTjNNdE5USXVNelV5SURFNUxqazROaTAzTWk0ek16Z2dNR3d0TXpJMExqQTVOaTB6TWpRdU1EazJMVE15TkM0d09UWWdNekkwTGpBNU5tTXRNVGt1T1RnMklESXdMakF3TlMwMU1pNHpPRGtnTWpBdU1EQTFMVGN5TGpNMU55QXdMVEU1TGprNE5pMHhPUzQ1TmpndE1Ua3VPVGcyTFRVeUxqTTFNaUF3TFRjeUxqTXpPR3d6TWpRdU1EazJMVE15TkM0d09UWXRNekV4TGpjeE55MHpNVEV1TnpNMVl5MHhPUzQ1T0RZdE1Ua3VPVFk0TFRFNUxqazROaTAxTWk0ek9Ea2dNQzAzTWk0ek5UY2dPUzQ1T0RRdE1UQXVNREF5SURJekxqQTNOeTB4TkM0NU56WWdNell1TVRZNUxURTBMamszTmlBeE15NHdOelFnTUNBeU5pNHhPRFVnTkM0NU56UWdNell1TVRZNUlERTBMamszTm13ek1URXVOek0xSURNeE1TNDNOVE1nTXpFeExqY3pOUzB6TVRFdU56VXpZekV3TGpBd01pMHhNQzR3TURJZ01qTXVNRGMzTFRFMExqazNOaUF6Tmk0eE9EY3RNVFF1T1RjMmN6STJMakUyTnlBMExqazNOQ0F6Tmk0eE9EY2dNVFF1T1RjMll6RTVMamsyT0NBeE9TNDVOamdnTVRrdU9UWTRJRFV5TGpNNE9TQXdJRGN5TGpNMU4yd3RNekV4TGpjM01TQXpNVEV1TnpNMWVpSWdMejRLUEdkc2VYQm9JSFZ1YVdOdlpHVTlJaVlqZUdVNU1ETTdJaUJuYkhsd2FDMXVZVzFsUFNKdFlYaHBiV2w2WlNJZ1pHRjBZUzEwWVdkelBTSnRZWGhwYldsNlpTSWdhRzl5YVhvdFlXUjJMWGc5SWpFek1UY2lJR1E5SWswNU9ETXVPVFUwSURnNE5pNDROVGRvTFRZMU1TNHpNemRqTFRZeUxqUXdPU0F3TFRFeE15NHhPRGt0TkRrdU9UYzFMVEV4TXk0eE9Ea3RNVEV4TGpReE5YWXROalUwTGpnNE5XTXdMVFl4TGpRMElEVXdMamMzT1MweE1URXVOREUxSURFeE15NHhPRGt0TVRFeExqUXhOV2cyTlRFdU16TTNZell5TGpRd09TQXdJREV4TXk0eE9Ea2dORGt1T1RjMUlERXhNeTR4T0RrZ01URXhMalF4TlhZMk5UUXVPRGcxWXpBZ05qRXVORFF0TlRBdU56YzVJREV4TVM0ME1UVXRNVEV6TGpFNE9TQXhNVEV1TkRFMWVrMDVPRE11T1RVMElEZ3lMakk0Tm1ndE5qVXhMak16TjJNdE1qSXVNRGc1SURBdE5EQXVNRFEySURFM0xqRTFNaTAwTUM0d05EWWdNemd1TWpjeWRqWXdNUzQzTWpob056TXhMalF5T1hZdE5qQXhMamN5T0dNd0xUSXhMakV5TFRFM0xqazFOeTB6T0M0eU56SXROREF1TURRMkxUTTRMakkzTW5vaUlDOCtDanhuYkhsd2FDQjFibWxqYjJSbFBTSW1JM2hsT1RBME95SWdaMng1Y0dndGJtRnRaVDBpYldsdWFXMXBlbVVpSUdSaGRHRXRkR0ZuY3owaWJXbHVhVzFwZW1VaUlHaHZjbWw2TFdGa2RpMTRQU0l4TXpFM0lpQmtQU0pOT1RjNExqSTBPU0F5TWpndU5UY3hhQzAyTXprdU9UZ3lZeTAyTVM0eE1URWdNQzB4TVRndU9ETTVJREF0TVRFNExqZ3pPUzA1TkM0M05UZDJMVEk1TGprek5HTXdMVGswTGpjek9DQTFOeTQzTWpndE9UUXVOek00SURFeE9DNDRNemt0T1RRdU56TTRhRFl6T1M0NU9ESmpOakV1TVRRM0lEQWdNVEU0TGpnNU5DQXdJREV4T0M0NE9UUWdPVFF1TnpVM2RqSTVMamt6TkdNd0lEazBMamN6T0MwMU55NDNORFlnT1RRdU56TTRMVEV4T0M0NE9UUWdPVFF1TnpNNGVpSWdMejRLUEdkc2VYQm9JSFZ1YVdOdlpHVTlJaVlqZUdVNU1EVTdJaUJuYkhsd2FDMXVZVzFsUFNKdWIzSnRZV3hwZW1VaUlHUmhkR0V0ZEdGbmN6MGlibTl5YldGc2FYcGxJaUJvYjNKcGVpMWhaSFl0ZUQwaU1UTXhOeUlnWkQwaVRUZzFNQzQ1T1RrZ05qTXdMamcxTjJndE5UTTRMakEzTldNdE5URXVOVEk1SURBdE9UTXVORGsxTFRVekxqa3lOUzA1TXk0ME9UVXRPVFl1TURVMWRpMDBORGt1TWpRell6QXROREl1TVRNZ05ERXVPVFkyTFRjMkxqUXhOaUE1TXk0ME9UVXROell1TkRFMmFEVXpPQzR3TnpWak5URXVOVEk1SURBZ09Ua3VPRFU0SURNMExqSTROaUE1T1M0NE5UZ2dOell1TkRFMmRqUTBPUzR5TkROak1DQTBNaTR4TXkwME9DNHpNamtnT1RZdU1EVTFMVGs1TGpnMU9DQTVOaTR3TlRWNlRUZzVOaUE0TlM0MU5UbGpNQzB4TkM0ME9ESXRNall1TnpjdE16a3VPRFExTFRRMUxqQXdNUzB6T1M0NE5EVm9MVFV6T0M0d056VmpMVEU0TGpJek1TQXdMVE00TGpZek9DQXlOUzR6TmpJdE16Z3VOak00SURNNUxqZzBOWFkwTXpVdU5UZzBhRFl5TVM0M01UUjJMVFF6TlM0MU9EUjZUVEV3TURNdU5qUTRJRGd6TW1ndE5UTTRMakEzTldNdE5URXVOVEk1SURBdE9Ua3VPRFU0TFRNMExqSTROaTA1T1M0NE5UZ3ROell1TkRFMmRpMDRPQzR4TlRWb05UUXVPRFUzZGpVMExqZzFOMmcyTWpFdU56RTBkaTAwTVRVdU9UUTFZekF0TVRRdU5EZ3lMVEl3TGpRd055MDFPUzQwT0RNdE16Z3VOak00TFRVNUxqUTRNMmd0TVRZdU1qRTVkaTB6Tmk0MU56Rm9NVFl1TWpFNVl6VXhMalV5T1NBd0lEa3pMalE1TlNBMU15NDVNalVnT1RNdU5EazFJRGsyTGpBMU5YWTBORGt1TWpRell6QWdOREl1TVRNdE5ERXVPVFkySURjMkxqUXhOaTA1TXk0ME9UVWdOell1TkRFMmVpSWdMejRLUEM5bWIyNTBQand2WkdWbWN6NDhMM04yWno0PVwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvanNwYW5lbDQvZGlzdC9mb250cy9qc2dseXBoLnN2Z1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvanNwYW5lbDQvZGlzdC9mb250cy9qc2dseXBoLnN2Z1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTpmb250L3R0ZjtiYXNlNjQsQUFFQUFBQUxBSUFBQXdBd1QxTXZNZzhTQnVFQUFBQzhBQUFBWUdOdFlYQVhWdEtNQUFBQkhBQUFBRlJuWVhOd0FBQUFFQUFBQVhBQUFBQUlaMng1Wmxtb1kxd0FBQUY0QUFBQ3hHaGxZV1FJdkRNRUFBQUVQQUFBQURab2FHVmhDRTRFOEFBQUJIUUFBQUFrYUcxMGVDVGVCTUFBQUFTWUFBQUFLR3h2WTJFRENnSklBQUFFd0FBQUFCWnRZWGh3QUE0QU5RQUFCTmdBQUFBZ2JtRnRaVXF0eWhrQUFBVDRBQUFDb0hCdmMzUUFBd0FBQUFBSG1BQUFBQ0FBQXdTeUFaQUFCUUFBQXBrQ3pBQUFBSThDbVFMTUFBQUI2d0F6QVFrQUFBQUFBQUFBQUFBQUFBQUFBQUFCRUFBQUFBQUFBQUFBQUFBQUFBQUFBQUJBQUFEcEJRUEEvOEFBUUFQQUFFQUFBQUFCQUFBQUFBQUFBQUFBQUFBZ0FBQUFBQUFEQUFBQUF3QUFBQndBQVFBREFBQUFIQUFEQUFFQUFBQWNBQVFBT0FBQUFBb0FDQUFDQUFJQUFRQWc2UVgvL2YvL0FBQUFBQUFnNlFELy9mLy9BQUgvNHhjRUFBTUFBUUFBQUFBQUFBQUFBQUFBQVFBQi8vOEFEd0FCQUFBQUFBQUFBQUFBQWdBQU56a0JBQUFBQUFFQUFBQUFBQUFBQUFBQ0FBQTNPUUVBQUFBQUFRQUFBQUFBQUFBQUFBSUFBRGM1QVFBQUFBQUJBSmtCQ1FTTUFsNEFIZ0FBQVM0QkJ3NERCeTRESnlZR0J3WVdGeDRETXpJMkpUNEJKd1NNQ3l3VVFvbDJXeFVWV25XSFFSUXJEQXNNRktPN1loOEZEWVFCVXhRTUNnSklGQTBMSkVrL0xnb0lMajlLSkF3TkV4UXNDMXhqTGdnOXR3c3NGQUFBQUFFQW1RRVFCSXdDWlFBZUFBQUJEZ0VuTGdNbkRnTUhCaVluSmpZM1BnTXpNaFlGSGdFSEJJd0xMQlJDaVhaYkZSVmFkWWRCRkNzTUN3d1VvN3RpSHdVTmhBRlRGQXdLQVNZVURRc2tTVDh1Q2drdFAwb2xDd3dVRkN3TFhHTXVDRDYzQ3lzVUFBQUFBUUQ5QUNzRUZnTkdBQ1lBQUFrQk5qUW5KaUlIQ1FFbUlnY0dGQmNKQVFZVUZ4NEJNekkyTndrQkhnRXpNalkzTmpRbkFRTFJBVVVQRHc4ckQvNjgvcndQS2c4UER3RkUvc2dQRHdnU0Nnb1RCd0U0QVRnSEV3b0tFd2NQRC83SUFib0JSQThxRHc4UC9yd0JSQThQRHlvUC9yeit5QThxRHdnSEJ3Z0JOLzdKQ0FjSENBOHFEd0U0QUFBQ0FOc0FDUVJKQTNjQUVBQWJBQUFCSVNJR0ZSRVVGak1oTWpZMUVUUW1JeEVoSWlZMUVTRVJGQVlqQTlqOWRTOURReThDaXk5Q1FpLzlkUkVYQXRzWEVRTjNRUy85Y2k5QlFTOENqaTlCL05zWEVBSlovYWNRRndBQUFBRUEyd0FKQkVrQTVRQVFBQUFsSVNJR0hRRVVGak1oTWpZOUFUUW1Jd1BTL1lBdVNVa3VBb0F1U1VrdTVSaEhIa2NZR0VjZVJ4Z0FBd0RiQUFrRVNRTkFBQkFBR3dBeUFBQUJJU0lHRlJFVUZqTWhNalkxRVRRbUl4TVVCaU1oSWlZMUVTRVJFeUVpQmgwQk16VWhFUlFHS3dFVk16STJOUkUwSmlNRFUvM21KemMzSndJYUp6MDlKeTBmRHYzbURoa0NibXo5NWljOU53SnRHUTBSRVNZM055WUNkMEVmL2o4Z0xTMGdBY0VmUWYzZkN4MGRDd0d6L2swQzZpMGZXVGYrWUFzd0pVRWZBY0lmTFFBQUFBQUJBQUFBQVFBQU5yRitQVjhQUFBVQUN3UUFBQUFBQU5LSTkwZ0FBQUFBMG9qM1NBQUFBQUFFakFOM0FBQUFDQUFDQUFBQUFBQUFBQUVBQUFQQS84QUFBQVVsQUFBQUFBU01BQUVBQUFBQUFBQUFBQUFBQUFBQUFBQUtCQUFBQUFBQUFBQUFBQUFBQWdBQUFBVWxBSmtGSlFDWkJTVUEvUVVsQU5zRkpRRGJCU1VBMndBQUFBQUFDZ0FVQUI0QVVnQ0dBTXdBK2dFV0FXSUFBQUFCQUFBQUNnQXpBQU1BQUFBQUFBSUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFGZ0VPQUFFQUFBQUFBQUFBRXdDV0FBRUFBQUFBQUFFQUJ3QUFBQUVBQUFBQUFBSUFCd0VhQUFFQUFBQUFBQU1BQndEd0FBRUFBQUFBQUFRQUJ3RXZBQUVBQUFBQUFBVUFDd0RQQUFFQUFBQUFBQVlBQndFRkFBRUFBQUFBQUFrQURnQVZBQUVBQUFBQUFBb0FHZ0ZFQUFFQUFBQUFBQXdBR2dBL0FBRUFBQUFBQUEwQUF3Q05BQU1BQVFRSkFBQUFKZ0NwQUFNQUFRUUpBQUVBRGdBSEFBTUFBUVFKQUFJQURnRWhBQU1BQVFRSkFBTUFEZ0QzQUFNQUFRUUpBQVFBRGdFMkFBTUFBUVFKQUFVQUZnRGFBQU1BQVFRSkFBWUFEZ0VNQUFNQUFRUUpBQWtBSEFBakFBTUFBUVFKQUFvQU5BRmVBQU1BQVFRSkFBd0FOQUJaQUFNQUFRUUpBQTBBQmdDUWFuTm5iSGx3YUFCcUFITUFad0JzQUhrQWNBQm9VM1JsWm1GdUlGTjBjdVRmWlhJQVV3QjBBR1VBWmdCaEFHNEFJQUJUQUhRQWNnRGtBTjhBWlFCeWFIUjBjRG92TDNOMFpXWmhibk4wY21GbGMzTmxjaTVsZFM4QWFBQjBBSFFBY0FBNkFDOEFMd0J6QUhRQVpRQm1BR0VBYmdCekFIUUFjZ0JoQUdVQWN3QnpBR1VBY2dBdUFHVUFkUUF2VFVsVUFFMEFTUUJVTWpBeE5TQlRkR1ZtWVc0Z1UzUnk1TjlsY2dBeUFEQUFNUUExQUNBQVV3QjBBR1VBWmdCaEFHNEFJQUJUQUhRQWNnRGtBTjhBWlFCeVZtVnljMmx2YmlBeExqQUFWZ0JsQUhJQWN3QnBBRzhBYmdBZ0FERUFMZ0F3YW5ObmJIbHdhQUJxQUhNQVp3QnNBSGtBY0FCb2FuTm5iSGx3YUFCcUFITUFad0JzQUhrQWNBQm9VbVZuZFd4aGNnQlNBR1VBWndCMUFHd0FZUUJ5YW5ObmJIbHdhQUJxQUhNQVp3QnNBSGtBY0FCb1JtOXVkQ0JuWlc1bGNtRjBaV1FnWW5rZ1NXTnZUVzl2Ymk0QVJnQnZBRzRBZEFBZ0FHY0FaUUJ1QUdVQWNnQmhBSFFBWlFCa0FDQUFZZ0I1QUNBQVNRQmpBRzhBVFFCdkFHOEFiZ0F1QUFNQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQT1cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvZm9udHMvanNnbHlwaC50dGZcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvZm9udHMvanNnbHlwaC50dGZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6Zm9udC93b2ZmO2Jhc2U2NCxkMDlHUmdBQkFBQUFBQWdFQUFzQUFBQUFCN2dBQVFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQlBVeTh5QUFBQkNBQUFBR0FBQUFCZ0R4SUc0V050WVhBQUFBRm9BQUFBVkFBQUFGUVhWdEtNWjJGemNBQUFBYndBQUFBSUFBQUFDQUFBQUJCbmJIbG1BQUFCeEFBQUFzUUFBQUxFV2FoalhHaGxZV1FBQUFTSUFBQUFOZ0FBQURZSXZETUVhR2hsWVFBQUJNQUFBQUFrQUFBQUpBaE9CUEJvYlhSNEFBQUU1QUFBQUNnQUFBQW9KTjRFd0d4dlkyRUFBQVVNQUFBQUZnQUFBQllEQ2dKSWJXRjRjQUFBQlNRQUFBQWdBQUFBSUFBT0FEVnVZVzFsQUFBRlJBQUFBcUFBQUFLZ1NxM0tHWEJ2YzNRQUFBZmtBQUFBSUFBQUFDQUFBd0FBQUFNRXNnR1FBQVVBQUFLWkFzd0FBQUNQQXBrQ3pBQUFBZXNBTXdFSkFBQUFBQUFBQUFBQUFBQUFBQUFBQVJBQUFBQUFBQUFBQUFBQUFBQUFBQUFBUUFBQTZRVUR3UC9BQUVBRHdBQkFBQUFBQVFBQUFBQUFBQUFBQUFBQUlBQUFBQUFBQXdBQUFBTUFBQUFjQUFFQUF3QUFBQndBQXdBQkFBQUFIQUFFQURnQUFBQUtBQWdBQWdBQ0FBRUFJT2tGLy8zLy93QUFBQUFBSU9rQS8vMy8vd0FCLytNWEJBQURBQUVBQUFBQUFBQUFBQUFBQUFFQUFmLy9BQThBQVFBQUFBQUFBQUFBQUFJQUFEYzVBUUFBQUFBQkFBQUFBQUFBQUFBQUFnQUFOemtCQUFBQUFBRUFBQUFBQUFBQUFBQUNBQUEzT1FFQUFBQUFBUUNaQVFrRWpBSmVBQjRBQUFFdUFRY09Bd2N1QXljbUJnY0dGaGNlQXpNeU5pVStBU2NFakFzc0ZFS0pkbHNWRlZwMWgwRVVLd3dMREJTanUySWZCUTJFQVZNVURBb0NTQlFOQ3lSSlB5NEtDQzQvU2lRTURSTVVMQXRjWXk0SVBiY0xMQlFBQUFBQkFKa0JFQVNNQW1VQUhnQUFBUTRCSnk0REp3NERCd1ltSnlZMk56NERNeklXQlI0QkJ3U01DeXdVUW9sMld4VVZXbldIUVJRckRBc01GS083WWg4RkRZUUJVeFFNQ2dFbUZBMExKRWsvTGdvSkxUOUtKUXNNRkJRc0MxeGpMZ2crdHdzckZBQUFBQUVBL1FBckJCWURSZ0FtQUFBSkFUWTBKeVlpQndrQkppSUhCaFFYQ1FFR0ZCY2VBVE15TmpjSkFSNEJNekkyTnpZMEp3RUMwUUZGRHc4UEt3Lyt2UDY4RHlvUER3OEJSUDdJRHc4SUVnb0tFd2NCT0FFNEJ4TUtDaE1IRHcvK3lBRzZBVVFQS2c4UEQvNjhBVVFQRHc4cUQvNjgvc2dQS2c4SUJ3Y0lBVGYreVFnSEJ3Z1BLZzhCT0FBQUFnRGJBQWtFU1FOM0FCQUFHd0FBQVNFaUJoVVJGQll6SVRJMk5SRTBKaU1SSVNJbU5SRWhFUlFHSXdQWS9YVXZRME12QW9zdlFrSXYvWFVSRndMYkZ4RURkMEV2L1hJdlFVRXZBbzR2UWZ6YkZ4QUNXZjJuRUJjQUFBQUJBTnNBQ1FSSkFPVUFFQUFBSlNFaUJoMEJGQll6SVRJMlBRRTBKaU1EMHYyQUxrbEpMZ0tBTGtsSkx1VVlSeDVIR0JoSEhrY1lBQU1BMndBSkJFa0RRQUFRQUJzQU1nQUFBU0VpQmhVUkZCWXpJVEkyTlJFMEppTVRGQVlqSVNJbU5SRWhFUk1oSWdZZEFUTTFJUkVVQmlzQkZUTXlOalVSTkNZakExUDk1aWMzTnljQ0dpYzlQU2N0SHc3OTVnNFpBbTVzL2VZblBUY0NiUmtORVJFbU56Y21BbmRCSC80L0lDMHRJQUhCSDBIOTN3c2RIUXNCcy81TkF1b3RIMWszL21BTE1DVkJId0hDSHkwQUFBQUFBUUFBQUFFQUFEYXhmajFmRHp6MUFBc0VBQUFBQUFEU2lQZElBQUFBQU5LSTkwZ0FBQUFBQkl3RGR3QUFBQWdBQWdBQUFBQUFBQUFCQUFBRHdQL0FBQUFGSlFBQUFBQUVqQUFCQUFBQUFBQUFBQUFBQUFBQUFBQUFDZ1FBQUFBQUFBQUFBQUFBQUFJQUFBQUZKUUNaQlNVQW1RVWxBUDBGSlFEYkJTVUEyd1VsQU5zQUFBQUFBQW9BRkFBZUFGSUFoZ0RNQVBvQkZnRmlBQUFBQVFBQUFBb0FNd0FEQUFBQUFBQUNBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQllCRGdBQkFBQUFBQUFBQUJNQWxnQUJBQUFBQUFBQkFBY0FBQUFCQUFBQUFBQUNBQWNCR2dBQkFBQUFBQUFEQUFjQThBQUJBQUFBQUFBRUFBY0JMd0FCQUFBQUFBQUZBQXNBendBQkFBQUFBQUFHQUFjQkJRQUJBQUFBQUFBSkFBNEFGUUFCQUFBQUFBQUtBQm9CUkFBQkFBQUFBQUFNQUJvQVB3QUJBQUFBQUFBTkFBTUFqUUFEQUFFRUNRQUFBQ1lBcVFBREFBRUVDUUFCQUE0QUJ3QURBQUVFQ1FBQ0FBNEJJUUFEQUFFRUNRQURBQTRBOXdBREFBRUVDUUFFQUE0Qk5nQURBQUVFQ1FBRkFCWUEyZ0FEQUFFRUNRQUdBQTRCREFBREFBRUVDUUFKQUJ3QUl3QURBQUVFQ1FBS0FEUUJYZ0FEQUFFRUNRQU1BRFFBV1FBREFBRUVDUUFOQUFZQWtHcHpaMng1Y0dnQWFnQnpBR2NBYkFCNUFIQUFhRk4wWldaaGJpQlRkSExrMzJWeUFGTUFkQUJsQUdZQVlRQnVBQ0FBVXdCMEFISUE1QURmQUdVQWNtaDBkSEE2THk5emRHVm1ZVzV6ZEhKaFpYTnpaWEl1WlhVdkFHZ0FkQUIwQUhBQU9nQXZBQzhBY3dCMEFHVUFaZ0JoQUc0QWN3QjBBSElBWVFCbEFITUFjd0JsQUhJQUxnQmxBSFVBTDAxSlZBQk5BRWtBVkRJd01UVWdVM1JsWm1GdUlGTjBjdVRmWlhJQU1nQXdBREVBTlFBZ0FGTUFkQUJsQUdZQVlRQnVBQ0FBVXdCMEFISUE1QURmQUdVQWNsWmxjbk5wYjI0Z01TNHdBRllBWlFCeUFITUFhUUJ2QUc0QUlBQXhBQzRBTUdweloyeDVjR2dBYWdCekFHY0FiQUI1QUhBQWFHcHpaMng1Y0dnQWFnQnpBR2NBYkFCNUFIQUFhRkpsWjNWc1lYSUFVZ0JsQUdjQWRRQnNBR0VBY21weloyeDVjR2dBYWdCekFHY0FiQUI1QUhBQWFFWnZiblFnWjJWdVpYSmhkR1ZrSUdKNUlFbGpiMDF2YjI0dUFFWUFid0J1QUhRQUlBQm5BR1VBYmdCbEFISUFZUUIwQUdVQVpBQWdBR0lBZVFBZ0FFa0FZd0J2QUUwQWJ3QnZBRzRBTGdBREFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFcIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvZm9udHMvanNnbHlwaC53b2ZmXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9kaXN0L2ZvbnRzL2pzZ2x5cGgud29mZlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL2pzcGFuZWwuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9qc3BhbmVsLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL2pzcGFuZWwuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9kaXN0L2pzcGFuZWwuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9kaXN0L2pzcGFuZWwuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24oc2VsZWN0b3IpIHtcblx0XHRpZiAodHlwZW9mIG1lbW9bc2VsZWN0b3JdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBmbi5jYWxsKHRoaXMsIHNlbGVjdG9yKTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAoc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3NlbGVjdG9yXSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1tzZWxlY3Rvcl1cblx0fTtcbn0pKGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxufSk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG5cdGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvICsgXCIgXCIgKyBvcHRpb25zLmluc2VydEF0LmJlZm9yZSk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC8pL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBCdXR0cGx1Z0RldmljZSwgU2luZ2xlTW90b3JWaWJyYXRlQ21kLCBGbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZCB9IGZyb20gXCIuLi9pbmRleFwiO1xuaW1wb3J0ICogYXMgTWVzc2FnZXMgZnJvbSBcIi4uL2luZGV4XCI7XG5cbmV4cG9ydCBjbGFzcyBUZXN0RGV2aWNlIGV4dGVuZHMgQnV0dHBsdWdEZXZpY2Uge1xuXG4gIHByaXZhdGUgX2Nvbm5lY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9saW5lYXJTcGVlZDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfbGluZWFyUG9zaXRpb246IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX3ZpYnJhdGVTcGVlZDogbnVtYmVyID0gMDtcblxuICBwdWJsaWMgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgc2hvdWxkVmlicmF0ZTogYm9vbGVhbiA9IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgc2hvdWxkTGluZWFyOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICBzdXBlcihgVGVzdCBEZXZpY2UgLSAke25hbWV9YCk7XG4gICAgdGhpcy5Nc2dGdW5jcy5zZXQoTWVzc2FnZXMuU3RvcERldmljZUNtZC5uYW1lLCB0aGlzLkhhbmRsZVN0b3BEZXZpY2VDbWQpO1xuICAgIGlmIChzaG91bGRWaWJyYXRlKSB7XG4gICAgICB0aGlzLk1zZ0Z1bmNzLnNldChNZXNzYWdlcy5TaW5nbGVNb3RvclZpYnJhdGVDbWQubmFtZSwgdGhpcy5IYW5kbGVTaW5nbGVNb3RvclZpYnJhdGVDbWQpO1xuICAgICAgdGhpcy5Nc2dGdW5jcy5zZXQoTWVzc2FnZXMuVmlicmF0ZUNtZC5uYW1lLCB0aGlzLkhhbmRsZVZpYnJhdGVDbWQpO1xuICAgIH1cbiAgICBpZiAoc2hvdWxkTGluZWFyKSB7XG4gICAgICB0aGlzLk1zZ0Z1bmNzLnNldChNZXNzYWdlcy5GbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZC5uYW1lLCB0aGlzLkhhbmRsZUZsZXNobGlnaHRMYXVuY2hGVzEyQ21kKTtcbiAgICAgIHRoaXMuTXNnRnVuY3Muc2V0KE1lc3NhZ2VzLkxpbmVhckNtZC5uYW1lLCB0aGlzLkhhbmRsZUxpbmVhckNtZCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBDb25uZWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Nvbm5lY3RlZDtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgQ29ubmVjdGVkKGNvbm5lY3RlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX2Nvbm5lY3RlZCA9IGNvbm5lY3RlZDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTWVzc2FnZVNwZWNpZmljYXRpb25zKCk6IG9iamVjdCB7XG4gICAgaWYgKHRoaXMuTXNnRnVuY3MuaGFzKE1lc3NhZ2VzLlZpYnJhdGVDbWQubmFtZSkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIFZpYnJhdGVDbWQ6IHsgRmVhdHVyZUNvdW50OiAxIH0sXG4gICAgICAgIFNpbmdsZU1vdG9yVmlicmF0ZUNtZDoge30sXG4gICAgICAgIFN0b3BEZXZpY2VDbWQ6IHt9LFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuTXNnRnVuY3MuaGFzKE1lc3NhZ2VzLkxpbmVhckNtZC5uYW1lKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgTGluZWFyQ21kOiB7IEZlYXR1cmVDb3VudDogMSB9LFxuICAgICAgICBGbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZDoge30sXG4gICAgICAgIFN0b3BEZXZpY2VDbWQ6IHt9LFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgcHVibGljIERpc2Nvbm5lY3QoKSB7XG4gICAgdGhpcy5lbWl0KFwiZGV2aWNlcmVtb3ZlZFwiLCB0aGlzKTtcbiAgfVxuXG4gIHByaXZhdGUgSGFuZGxlU3RvcERldmljZUNtZCA9IGFzeW5jIChhTXNnOiBNZXNzYWdlcy5TdG9wRGV2aWNlQ21kKTogUHJvbWlzZTxNZXNzYWdlcy5CdXR0cGx1Z01lc3NhZ2U+ID0+IHtcbiAgICBpZiAodGhpcy5Nc2dGdW5jcy5oYXMoTWVzc2FnZXMuVmlicmF0ZUNtZC5uYW1lKSkge1xuICAgICAgdGhpcy5lbWl0KFwidmlicmF0ZVwiLCAwKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuTXNnRnVuY3MuaGFzKE1lc3NhZ2VzLkxpbmVhckNtZC5uYW1lKSkge1xuICAgICAgdGhpcy5lbWl0KFwibGluZWFyXCIsIHsgcG9zaXRpb246IHRoaXMuX2xpbmVhclBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVkOiB0aGlzLl9saW5lYXJTcGVlZH0pO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBNZXNzYWdlcy5PayhhTXNnLklkKSk7XG4gIH1cblxuICBwcml2YXRlIEhhbmRsZVNpbmdsZU1vdG9yVmlicmF0ZUNtZCA9XG4gICAgYXN5bmMgKGFNc2c6IE1lc3NhZ2VzLlNpbmdsZU1vdG9yVmlicmF0ZUNtZCk6IFByb21pc2U8TWVzc2FnZXMuQnV0dHBsdWdNZXNzYWdlPiA9PiB7XG4gICAgICB0aGlzLl92aWJyYXRlU3BlZWQgPSBhTXNnLlNwZWVkO1xuICAgICAgdGhpcy5lbWl0KFwidmlicmF0ZVwiLCBhTXNnLlNwZWVkKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IE1lc3NhZ2VzLk9rKGFNc2cuSWQpKTtcbiAgICB9XG5cbiAgcHJpdmF0ZSBIYW5kbGVWaWJyYXRlQ21kID1cbiAgICBhc3luYyAoYU1zZzogTWVzc2FnZXMuVmlicmF0ZUNtZCk6IFByb21pc2U8TWVzc2FnZXMuQnV0dHBsdWdNZXNzYWdlPiA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5IYW5kbGVTaW5nbGVNb3RvclZpYnJhdGVDbWQobmV3IFNpbmdsZU1vdG9yVmlicmF0ZUNtZChhTXNnLlNwZWVkc1swXS5TcGVlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFNc2cuRGV2aWNlSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhTXNnLklkKSk7XG4gICAgfVxuXG4gIHByaXZhdGUgSGFuZGxlRmxlc2hsaWdodExhdW5jaEZXMTJDbWQgPVxuICAgIGFzeW5jIChhTXNnOiBNZXNzYWdlcy5GbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZCk6IFByb21pc2U8TWVzc2FnZXMuQnV0dHBsdWdNZXNzYWdlPiA9PiB7XG4gICAgICB0aGlzLl9saW5lYXJQb3NpdGlvbiA9IGFNc2cuUG9zaXRpb247XG4gICAgICB0aGlzLl9saW5lYXJTcGVlZCA9IGFNc2cuU3BlZWQ7XG4gICAgICB0aGlzLmVtaXQoXCJsaW5lYXJcIiwgeyBwb3NpdGlvbjogdGhpcy5fbGluZWFyUG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IHRoaXMuX2xpbmVhclNwZWVkIH0pO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgTWVzc2FnZXMuT2soYU1zZy5JZCkpO1xuICAgIH1cblxuICBwcml2YXRlIEhhbmRsZUxpbmVhckNtZCA9XG4gICAgYXN5bmMgKGFNc2c6IE1lc3NhZ2VzLkxpbmVhckNtZCk6IFByb21pc2U8TWVzc2FnZXMuQnV0dHBsdWdNZXNzYWdlPiA9PiB7XG4gICAgICBpZiAoYU1zZy5WZWN0b3JzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2VzLkVycm9yKFwiTGluZWFyQ21kIHJlcXVpcmVzIDEgdmVjdG9yIGZvciB0aGlzIGRldmljZS5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNZXNzYWdlcy5FcnJvckNsYXNzLkVSUk9SX0RFVklDRSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhTXNnLklkKTtcbiAgICAgIH1cbiAgICAgIC8vIE1vdmUgYmV0d2VlbiA1Lzk1LCBvdGhlcndpc2Ugd2UnbGwgYWxsb3cgdGhlIGRldmljZSB0byBzbWFjayBpbnRvIGhhcmRcbiAgICAgIC8vIHN0b3BzIGJlY2F1c2Ugb2YgYnJhaW5kZWFkIGZpcm13YXJlLlxuICAgICAgY29uc3QgcmFuZ2U6IG51bWJlciA9IDkwO1xuICAgICAgY29uc3QgdmVjdG9yID0gYU1zZy5WZWN0b3JzWzBdO1xuICAgICAgY29uc3QgY3VycmVudFBvc2l0aW9uID0gdmVjdG9yLlBvc2l0aW9uICogMTAwO1xuICAgICAgY29uc3QgcG9zaXRpb25EZWx0YTogbnVtYmVyID0gTWF0aC5hYnMoY3VycmVudFBvc2l0aW9uIC0gdGhpcy5fbGluZWFyUG9zaXRpb24pO1xuICAgICAgbGV0IHNwZWVkOiBudW1iZXIgPSBNYXRoLmZsb29yKDI1MDAwICogTWF0aC5wb3coKCh2ZWN0b3IuRHVyYXRpb24gKiA5MCkgLyBwb3NpdGlvbkRlbHRhKSwgLTEuMDUpKTtcblxuICAgICAgLy8gQ2xhbXAgc3BlZWQgb24gMCA8PSB4IDw9IDk1IHNvIHdlIGRvbid0IGJyZWFrIHRoZSBsYXVuY2guXG4gICAgICBzcGVlZCA9IE1hdGgubWluKE1hdGgubWF4KHNwZWVkLCAwKSwgOTUpO1xuXG4gICAgICBjb25zdCBwb3NpdGlvbkdvYWwgPSBNYXRoLmZsb29yKCgoY3VycmVudFBvc2l0aW9uIC8gOTkpICogcmFuZ2UpICsgKCg5OSAtIHJhbmdlKSAvIDIpKTtcbiAgICAgIC8vIFdlJ2xsIHNldCB0aGlzLl9sYXN0UG9zaXRpb24gaW4gRmxlc2hsaWdodExhdW5jaEZXMTJDbWQsIHNpbmNlXG4gICAgICAvLyBldmVyeXRoaW5nIGtpbmRhIGZ1bm5lbHMgdG8gdGhhdC5cbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLkhhbmRsZUZsZXNobGlnaHRMYXVuY2hGVzEyQ21kKG5ldyBNZXNzYWdlcy5GbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZChzcGVlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbkdvYWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYU1zZy5EZXZpY2VJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhTXNnLklkKSk7XG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZGV2dG9vbHMvVGVzdERldmljZS50cyIsImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gXCJldmVudHNcIjtcbmltcG9ydCB7IElEZXZpY2VTdWJ0eXBlTWFuYWdlciB9IGZyb20gXCIuLi9pbmRleFwiO1xuaW1wb3J0IHsgVGVzdERldmljZSB9IGZyb20gXCIuL1Rlc3REZXZpY2VcIjtcblxuZXhwb3J0IGNsYXNzIFRlc3REZXZpY2VNYW5hZ2VyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIGltcGxlbWVudHMgSURldmljZVN1YnR5cGVNYW5hZ2VyIHtcblxuICBwdWJsaWMgc3RhdGljIEdldCgpOiBUZXN0RGV2aWNlTWFuYWdlciB7XG4gICAgaWYgKCFUZXN0RGV2aWNlTWFuYWdlci5fdGVzdE1hbmFnZXIpIHtcbiAgICAgIFRlc3REZXZpY2VNYW5hZ2VyLl90ZXN0TWFuYWdlciA9IG5ldyBUZXN0RGV2aWNlTWFuYWdlcigpO1xuICAgIH1cbiAgICByZXR1cm4gVGVzdERldmljZU1hbmFnZXIuX3Rlc3RNYW5hZ2VyO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX3Rlc3RNYW5hZ2VyOiBUZXN0RGV2aWNlTWFuYWdlciB8IG51bGwgPSBudWxsO1xuXG4gIHByaXZhdGUgX2lzU2Nhbm5pbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfdGVzdFZpYnJhdGlvbkRldmljZSA9IG5ldyBUZXN0RGV2aWNlKFwiVGVzdCBWaWJyYXRpb24gRGV2aWNlXCIsIHRydWUsIGZhbHNlKTtcbiAgcHJpdmF0ZSBfdGVzdExpbmVhckRldmljZSA9IG5ldyBUZXN0RGV2aWNlKFwiVGVzdCBMaW5lYXIgRGV2aWNlXCIsIGZhbHNlLCB0cnVlKTtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBDb25uZWN0VmlicmF0aW9uRGV2aWNlKCkge1xuICAgIHRoaXMuX3Rlc3RWaWJyYXRpb25EZXZpY2UuQ29ubmVjdGVkID0gdHJ1ZTtcbiAgICB0aGlzLmVtaXQoXCJkZXZpY2VhZGRlZFwiLCB0aGlzLl90ZXN0VmlicmF0aW9uRGV2aWNlKTtcbiAgfVxuXG4gIHB1YmxpYyBDb25uZWN0TGluZWFyRGV2aWNlKCkge1xuICAgIHRoaXMuX3Rlc3RMaW5lYXJEZXZpY2UuQ29ubmVjdGVkID0gdHJ1ZTtcbiAgICB0aGlzLmVtaXQoXCJkZXZpY2VhZGRlZFwiLCB0aGlzLl90ZXN0TGluZWFyRGV2aWNlKTtcbiAgfVxuXG4gIHB1YmxpYyBTdGFydFNjYW5uaW5nKCk6IHZvaWQge1xuICAgIHRoaXMuX2lzU2Nhbm5pbmcgPSB0cnVlO1xuICAgIGlmICghdGhpcy5fdGVzdFZpYnJhdGlvbkRldmljZS5Db25uZWN0ZWQpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5Db25uZWN0VmlicmF0aW9uRGV2aWNlKCksIDUwKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLl90ZXN0TGluZWFyRGV2aWNlLkNvbm5lY3RlZCkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLkNvbm5lY3RMaW5lYXJEZXZpY2UoKSwgNTApO1xuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuU3RvcFNjYW5uaW5nKCksIDEwMCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IFZpYnJhdGlvbkRldmljZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdGVzdFZpYnJhdGlvbkRldmljZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTGluZWFyRGV2aWNlKCkge1xuICAgIHJldHVybiB0aGlzLl90ZXN0TGluZWFyRGV2aWNlO1xuICB9XG5cbiAgcHVibGljIFN0b3BTY2FubmluZygpOiB2b2lkIHtcbiAgICB0aGlzLl9pc1NjYW5uaW5nID0gZmFsc2U7XG4gICAgdGhpcy5lbWl0KFwic2Nhbm5pbmdmaW5pc2hlZFwiKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgSXNTY2FubmluZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNTY2FubmluZztcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZGV2dG9vbHMvVGVzdERldmljZU1hbmFnZXIudHMiLCJpbXBvcnQgeyBCdXR0cGx1Z0NsaWVudCwgQnV0dHBsdWdFbWJlZGRlZFNlcnZlckNvbm5lY3RvciwgQnV0dHBsdWdTZXJ2ZXIgfSBmcm9tIFwiLi4vaW5kZXhcIjtcbmltcG9ydCB7IFRlc3REZXZpY2VNYW5hZ2VyIH0gZnJvbSBcIi4vVGVzdERldmljZU1hbmFnZXJcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIENyZWF0ZURldlRvb2xzQ2xpZW50KCk6IFByb21pc2U8QnV0dHBsdWdDbGllbnQ+IHtcbiAgY29uc3QgY2xpZW50ID0gbmV3IEJ1dHRwbHVnQ2xpZW50KFwiVGVzdCBDbGllbnRcIik7XG4gIGNvbnN0IHNlcnZlciA9IG5ldyBCdXR0cGx1Z1NlcnZlcihcIlRlc3QgU2VydmVyXCIpO1xuICBzZXJ2ZXIuQWRkRGV2aWNlTWFuYWdlcihUZXN0RGV2aWNlTWFuYWdlci5HZXQoKSk7XG4gIGNvbnN0IGxvY2FsQ29ubmVjdG9yID0gbmV3IEJ1dHRwbHVnRW1iZWRkZWRTZXJ2ZXJDb25uZWN0b3IoKTtcbiAgbG9jYWxDb25uZWN0b3IuU2VydmVyID0gc2VydmVyO1xuICBhd2FpdCBjbGllbnQuQ29ubmVjdChsb2NhbENvbm5lY3Rvcik7XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoY2xpZW50KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kZXZ0b29scy91dGlscy50cyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0xvZ1BhbmVsLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9Mb2dQYW5lbC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vTG9nUGFuZWwuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9kZXZ0b29scy93ZWIvTG9nUGFuZWwuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9kZXZ0b29scy93ZWIvTG9nUGFuZWwuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGlkPVxcXCJidXR0cGx1Z2RldnRvb2xzbG9ncGFuZWxcXFwiPlxcbiAgPHRleHRhcmVhIGlkPVxcXCJidXR0cGx1Z2RldnRvb2xzbG9ndGV4dGFyZWFcXFwiIHJlYWRvbmx5PjwvdGV4dGFyZWE+XFxuICA8ZGl2IGlkPVxcXCJidXR0cGx1Z2RldnRvb2xzbG9nbGV2ZWxcXFwiPlxcbiAgICA8bGFiZWw+UGFuZWwgTG9nIExldmVsOjwvbGFiZWw+XFxuICAgIDxzZWxlY3QgaWQ9XFxcImJ1dHRwbHVnZGV2dG9vbHNsb2dsZXZlbHBhbmVsc2VsZWN0XFxcIj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJPZmZcXFwiPk9mZjwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkZhdGFsXFxcIj5GYXRhbDwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkVycm9yXFxcIj5FcnJvcjwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIldhcm5cXFwiPldhcm48L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJJbmZvXFxcIj5JbmZvPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiRGVidWdcXFwiIHNlbGVjdGVkPkRlYnVnPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiVHJhY2VcXFwiPlRyYWNlPC9vcHRpb24+XFxuICAgIDwvc2VsZWN0PlxcbiAgICA8bGFiZWw+Q29uc29sZSBMb2cgTGV2ZWw6PC9sYWJlbD5cXG4gICAgPHNlbGVjdCBpZD1cXFwiYnV0dHBsdWdkZXZ0b29sc2xvZ2xldmVsY29uc29sZXNlbGVjdFxcXCI+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiT2ZmXFxcIiBzZWxlY3RlZD5PZmY8L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJGYXRhbFxcXCI+RmF0YWw8L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJFcnJvclxcXCI+RXJyb3I8L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJXYXJuXFxcIj5XYXJuPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiSW5mb1xcXCI+SW5mbzwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkRlYnVnXFxcIj5EZWJ1Zzwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIlRyYWNlXFxcIj5UcmFjZTwvb3B0aW9uPlxcbiAgICA8L3NlbGVjdD5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcblwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2RldnRvb2xzL3dlYi9Mb2dQYW5lbC5odG1sXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9kZXZ0b29scy93ZWIvTG9nUGFuZWwuaHRtbFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBCdXR0cGx1Z0xvZ2dlciwgTG9nTWVzc2FnZSwgQnV0dHBsdWdMb2dMZXZlbCB9IGZyb20gXCIuLi8uLi9pbmRleFwiO1xuY29uc3QganNQYW5lbCA9IHJlcXVpcmUoXCIuL2pzcGFuZWwuanNcIik7XG5yZXF1aXJlKFwianNwYW5lbDQvZGlzdC9qc3BhbmVsLmNzc1wiKTtcbnJlcXVpcmUoXCJqc3BhbmVsNC9kaXN0L2ZvbnRzL2pzZ2x5cGguZW90XCIpO1xuY29uc3QgbG9nUGFuZWxIVE1MID0gcmVxdWlyZShcIi4vTG9nUGFuZWwuaHRtbFwiKS50b1N0cmluZygpO1xucmVxdWlyZShcIi4vTG9nUGFuZWwuY3NzXCIpO1xuXG5leHBvcnQgY2xhc3MgTG9nUGFuZWwge1xuXG4gIHB1YmxpYyBzdGF0aWMgU2hvd0xvZ1BhbmVsKCkge1xuICAgIGpzUGFuZWwuanNQYW5lbC5jcmVhdGUoe1xuICAgICAgdGhlbWU6ICAgICAgIFwicHJpbWFyeVwiLFxuICAgICAgaGVhZGVyVGl0bGU6IFwiQnV0dHBsdWcgTG9nXCIsXG4gICAgICBwb3NpdGlvbjogICAgXCJjZW50ZXItdG9wIDAgODBcIixcbiAgICAgIGNvbnRlbnRTaXplOiBcIjY1MCAyNTBcIixcbiAgICAgIGNhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQuaW5uZXJIVE1MID0gbG9nUGFuZWxIVE1MO1xuICAgICAgICBMb2dQYW5lbC5fcGFuZWwgPSBuZXcgTG9nUGFuZWwoKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfcGFuZWw6IExvZ1BhbmVsIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgbG9nVGV4dEFyZWE6IEhUTUxUZXh0QXJlYUVsZW1lbnQ7XG4gIHByaXZhdGUgcGFuZWxMZXZlbFNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQ7XG4gIHByaXZhdGUgY29uc29sZUxldmVsU2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxvZ1RleHRBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0cGx1Z2RldnRvb2xzbG9ndGV4dGFyZWFcIikhIGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQ7XG4gICAgdGhpcy5wYW5lbExldmVsU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0cGx1Z2RldnRvb2xzbG9nbGV2ZWxwYW5lbHNlbGVjdFwiKSEgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgdGhpcy5jb25zb2xlTGV2ZWxTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1dHRwbHVnZGV2dG9vbHNsb2dsZXZlbGNvbnNvbGVzZWxlY3RcIikhIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xuICAgIGNvbnN0IGxvZyA9IEJ1dHRwbHVnTG9nZ2VyLkxvZ2dlcjtcbiAgICBsb2cuYWRkTGlzdGVuZXIoXCJsb2dcIiwgKG1zZykgPT4ge1xuICAgICAgdGhpcy5hZGRMb2dNZXNzYWdlKG1zZyk7XG4gICAgfSk7XG4gICAgdGhpcy5wYW5lbExldmVsU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgbG9nLk1heGltdW1FdmVudExvZ0xldmVsID0gQnV0dHBsdWdMb2dMZXZlbFt0aGlzLnBhbmVsTGV2ZWxTZWxlY3QudmFsdWVdO1xuICAgIH0pO1xuICAgIHRoaXMuY29uc29sZUxldmVsU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgbG9nLk1heGltdW1Db25zb2xlTG9nTGV2ZWwgPSBCdXR0cGx1Z0xvZ0xldmVsW3RoaXMuY29uc29sZUxldmVsU2VsZWN0LnZhbHVlXTtcbiAgICB9KTtcbiAgICBsb2cuTWF4aW11bUV2ZW50TG9nTGV2ZWwgPSBCdXR0cGx1Z0xvZ0xldmVsLkRlYnVnO1xuICAgIGxvZy5EZWJ1ZyhcIkxvZ1BhbmVsOiBEZXZUb29scyBMb2cgcGFuZWwgZW5hYmxlZC5cIik7XG4gIH1cblxuICBwcml2YXRlIGFkZExvZ01lc3NhZ2UobXNnOiBMb2dNZXNzYWdlKSB7XG4gICAgdGhpcy5sb2dUZXh0QXJlYS52YWx1ZSA9IHRoaXMubG9nVGV4dEFyZWEudmFsdWUgKyBcIlxcblwiICsgbXNnLkZvcm1hdHRlZE1lc3NhZ2U7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2RldnRvb2xzL3dlYi9Mb2dQYW5lbC50cyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2RldnRvb2xzL3dlYi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPG1haW4+XFxuICA8aW5wdXQgaWQ9XFxcInRhYjFcXFwiIHR5cGU9XFxcInJhZGlvXFxcIiBuYW1lPVxcXCJ0YWJzXFxcIiBjaGVja2VkPlxcbiAgPGxhYmVsIGZvcj1cXFwidGFiMVxcXCI+VGVzdCBEZXZpY2VzPC9sYWJlbD5cXG4gIDxzZWN0aW9uIGlkPVxcXCJjb250ZW50MVxcXCI+XFxuICAgIDxkaXYgaWQ9XFxcInNpbXVsYXRvclxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwidmlicmF0b3Itc2ltdWxhdG9yLWNvbXBvbmVudFxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ2aWJyYXRvclxcXCI+XFxuICAgICAgICAgIDxpbWcgc3JjPVxcXCJcIiArIHJlcXVpcmUoXCIuL2h1c2gucG5nXCIpICsgXCJcXFwiXFxuICAgICAgICAgICAgICAgaWQ9XFxcInZpYnJhdG9yLWltYWdlXFxcIj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBpZD1cXFwidmlicmF0b3ItaW5mb1xcXCI+XFxuICAgICAgICAgIDxiPlZpYnJhdGlvbiBTcGVlZDo8L2I+IDxzcGFuIGlkPVxcXCJ2aWJyYXRpb25zcGVlZFxcXCI+MDwvc3Bhbj48YnIvPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJ2aWJyYXRlZGlzY29ubmVjdFxcXCI+RGlzY29ubmVjdDwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwic2ltdWxhdG9yLWRpdmlkZXJcXFwiPjwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImZsZXNobGlnaHQtc2ltXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImMtZmxlc2hsaWdodFxcXCI+XFxuICAgICAgICAgIDxkaXY+XFxuICAgICAgICAgICAgPGltZyBzcmM9XFxcIlwiICsgcmVxdWlyZShcIi4vcnVsZXIucG5nXCIpICsgXCJcXFwiPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPGRpdj5cXG4gICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCIgKyByZXF1aXJlKFwiLi9mbGVzaGxpZ2h0LnBuZ1wiKSArIFwiXFxcIlxcbiAgICAgICAgICAgICAgICAgY2xhc3M9XFxcIm8tZmxlc2hsaWdodFxcXCJcXG4gICAgICAgICAgICAgICAgIGlkPVxcXCJmbGVzaGxpZ2h0LWltYWdlXFxcIj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXY+XFxuICAgICAgICAgIDxiPlNwZWVkOjwvYj4gPHNwYW4gaWQ9XFxcImxpbmVhcnNwZWVkXFxcIj4wPC9zcGFuPjxici8+XFxuICAgICAgICAgIDxiPlBvc2l0aW9uOjwvYj4gPHNwYW4gaWQ9XFxcImxpbmVhcnBvc2l0aW9uXFxcIj4wPC9zcGFuPjxici8+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImxpbmVhcmRpc2Nvbm5lY3RcXFwiPkRpc2Nvbm5lY3Q8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvc2VjdGlvbj5cXG48L21haW4+XFxuXCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZGV2dG9vbHMvd2ViL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwuaHRtbFxuLy8gbW9kdWxlIGlkID0gLi9zcmMvZGV2dG9vbHMvd2ViL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwuaHRtbFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBUZXN0RGV2aWNlTWFuYWdlciB9IGZyb20gXCIuLi9UZXN0RGV2aWNlTWFuYWdlclwiO1xuaW1wb3J0ICogYXMgVFdFRU4gZnJvbSBcIkB0d2VlbmpzL3R3ZWVuLmpzXCI7XG5cbmNvbnN0IGpzUGFuZWwgPSByZXF1aXJlKFwiLi9qc3BhbmVsLmpzXCIpO1xucmVxdWlyZShcImpzcGFuZWw0L2Rpc3QvanNwYW5lbC5jc3NcIik7XG5yZXF1aXJlKFwianNwYW5lbDQvZGlzdC9mb250cy9qc2dseXBoLmVvdFwiKTtcbmNvbnN0IHRlc3RQYW5lbEhUTUwgPSByZXF1aXJlKFwiLi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmh0bWxcIikudG9TdHJpbmcoKTtcbnJlcXVpcmUoXCIuL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwuY3NzXCIpO1xuXG5leHBvcnQgY2xhc3MgVGVzdERldmljZU1hbmFnZXJQYW5lbCB7XG4gIHB1YmxpYyBzdGF0aWMgU2hvd1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwoKSB7XG4gICAganNQYW5lbC5qc1BhbmVsLmNyZWF0ZSh7XG4gICAgICB0aGVtZTogICAgICAgXCJwcmltYXJ5XCIsXG4gICAgICBoZWFkZXJUaXRsZTogXCJUZXN0IERldmljZSBNYW5hZ2VyXCIsXG4gICAgICBwb3NpdGlvbjogICAgXCJjZW50ZXItdG9wIDAgODBcIixcbiAgICAgIGNvbnRlbnRTaXplOiBcIjQwMCAyNTBcIixcbiAgICAgIGNhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQuaW5uZXJIVE1MID0gdGVzdFBhbmVsSFRNTDtcbiAgICAgICAgVGVzdERldmljZU1hbmFnZXJQYW5lbC5fcGFuZWwgPSBuZXcgVGVzdERldmljZU1hbmFnZXJQYW5lbCgpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzdGF0aWMgX3BhbmVsOiBUZXN0RGV2aWNlTWFuYWdlclBhbmVsO1xuICBwcml2YXRlIF90ZXN0TWFuYWdlciA9IFRlc3REZXZpY2VNYW5hZ2VyLkdldCgpO1xuICBwcml2YXRlIGZsZXNobGlnaHRFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSB2aWJyYXRvckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIGN1cnJlbnRMYXVuY2hQb3NpdGlvbjogYW55ID0geyB4OiAwLCB5OiAwIH07XG4gIHByaXZhdGUgbGFzdFBvc2l0aW9uOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIG1vdmVSYWRpdXM6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgY3VycmVudFZpYnJhdGVQb3NpdGlvbjogYW55ID0geyB4OiAwLCB5OiAwIH07XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWJyYXRlZGlzY29ubmVjdFwiKSEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRoaXMuX3Rlc3RNYW5hZ2VyLlZpYnJhdGlvbkRldmljZS5EaXNjb25uZWN0KCk7XG4gICAgfSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaW5lYXJkaXNjb25uZWN0XCIpIS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5fdGVzdE1hbmFnZXIuTGluZWFyRGV2aWNlLkRpc2Nvbm5lY3QoKTtcbiAgICB9KTtcbiAgICB0aGlzLl90ZXN0TWFuYWdlci5WaWJyYXRpb25EZXZpY2UuYWRkTGlzdGVuZXIoXCJ2aWJyYXRlXCIsIChzcGVlZCkgPT4ge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWJyYXRpb25zcGVlZFwiKSEuaW5uZXJIVE1MID0gc3BlZWQ7XG4gICAgICB0aGlzLnZpYnJhdGVNb3ZlKHNwZWVkKTtcbiAgICB9KTtcbiAgICB0aGlzLl90ZXN0TWFuYWdlci5MaW5lYXJEZXZpY2UuYWRkTGlzdGVuZXIoXCJsaW5lYXJcIiwgKGxpbmVhcm9iajogYW55KSA9PiB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpbmVhcnBvc2l0aW9uXCIpIS5pbm5lckhUTUwgPSBsaW5lYXJvYmoucG9zaXRpb247XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpbmVhcnNwZWVkXCIpIS5pbm5lckhUTUwgPSBsaW5lYXJvYmouc3BlZWQ7XG4gICAgICB0aGlzLmxhdW5jaE1vdmUobGluZWFyb2JqLnBvc2l0aW9uLCBsaW5lYXJvYmouc3BlZWQpO1xuICAgIH0pO1xuICAgIHRoaXMuZmxlc2hsaWdodEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZsZXNobGlnaHQtaW1hZ2VcIikhO1xuICAgIHRoaXMudmlicmF0b3JFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWJyYXRvci1pbWFnZVwiKSE7XG4gIH1cblxuICBwcml2YXRlIGxhdW5jaE1vdmUgPSAocG9zaXRpb24sIHNwZWVkKSA9PiB7XG4gICAgY29uc3QgcCA9IC0oKDEwMCAtIHBvc2l0aW9uKSAqIDAuMjIpO1xuICAgIGNvbnN0IGR1cmF0aW9uID0gdGhpcy5tb3ZlRHVyYXRpb24ocG9zaXRpb24sIHNwZWVkKTtcbiAgICBuZXcgVFdFRU4uVHdlZW4odGhpcy5jdXJyZW50TGF1bmNoUG9zaXRpb24pXG4gICAgICAudG8oe3g6IDAsIHk6IHB9LCBkdXJhdGlvbilcbiAgICAgIC5zdGFydCgpO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxhdW5jaEFuaW1hdGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBsYXVuY2hBbmltYXRlID0gKHRpbWVzdGFtcDogbnVtYmVyKSA9PiB7XG4gICAgaWYgKCFUV0VFTi51cGRhdGUoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmZsZXNobGlnaHRFbGVtZW50LnN0eWxlLmJvdHRvbSA9IGAke3RoaXMuY3VycmVudExhdW5jaFBvc2l0aW9uLnl9JWA7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubGF1bmNoQW5pbWF0ZSk7XG4gIH1cblxuICAvLyBtb3ZlRHVyYXRpb24gcmV0dXJucyB0aGUgdGltZSBpbiBtaWxsaXNlY29uZHMgaXQgd2lsbCB0YWtlIHRvIG1vdmVcbiAgLy8gdG8gcG9zaXRpb24gYXQgc3BlZWQuXG4gIC8vXG4gIC8vIHBvc2l0aW9uOiBwb3NpdGlvbiBpbiBwZXJjZW50ICgwLTEwMCkuXG4gIC8vIHNwZWVkOiAgICBzcGVlZCBpbiBwZXJjZW50ICgyMC0xMDApLlxuICBwcml2YXRlIG1vdmVEdXJhdGlvbiA9IChwb3NpdGlvbjogbnVtYmVyLCBzcGVlZDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLmFicyhwb3NpdGlvbiAtIHRoaXMubGFzdFBvc2l0aW9uKTtcbiAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHJldHVybiB0aGlzLmNhbGNEdXJhdGlvbihkaXN0YW5jZSwgc3BlZWQpO1xuICB9XG5cbiAgLy8gX2NhbGNEdXJhdGlvbiByZXR1cm5zIGR1cmF0aW9uIG9mIGEgbW92ZSBpbiBtaWxsaXNlY29uZHMgZm9yIGEgZ2l2ZW5cbiAgLy8gZGlzdGFuY2Uvc3BlZWQuXG4gIC8vXG4gIC8vIGRpc3RhbmNlOiBhbW91bnQgdG8gbW92ZSBwZXJjZW50ICgwLTEwMCkuXG4gIC8vIHNwZWVkOiBzcGVlZCB0byBtb3ZlIGF0IGluIHBlcmNlbnQgKDIwLTEwMCkuXG4gIHByaXZhdGUgY2FsY0R1cmF0aW9uID0gKGRpc3RhbmNlOiBudW1iZXIsIHNwZWVkOiBudW1iZXIpID0+IHtcbiAgICByZXR1cm4gTWF0aC5wb3coc3BlZWQgLyAyNTAwMCwgLTAuOTUpIC8gKDkwIC8gZGlzdGFuY2UpO1xuICB9XG5cbiAgcHJpdmF0ZSB2aWJyYXRlTW92ZSA9IChzcGVlZCkgPT4ge1xuICAgIHRoaXMubW92ZVJhZGl1cyA9IHNwZWVkO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnZpYnJhdGVBbmltYXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgdmlicmF0ZUFuaW1hdGUgPSAodGltZXN0YW1wOiBudW1iZXIpID0+IHtcbiAgICBpZiAoIVRXRUVOLnVwZGF0ZSgpKSB7XG4gICAgICBpZiAodGhpcy5tb3ZlUmFkaXVzICE9PSAwKSB7XG4gICAgICAgIG5ldyBUV0VFTi5Ud2Vlbih0aGlzLmN1cnJlbnRWaWJyYXRlUG9zaXRpb24pXG4gICAgICAgICAgLnRvKHt4OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLm1vdmVSYWRpdXMgKiAyMCksXG4gICAgICAgICAgICAgICB5OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLm1vdmVSYWRpdXMgKiAyMCl9XG4gICAgICAgICAgICAgICwgMzQpXG4gICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnZpYnJhdGVBbmltYXRlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy52aWJyYXRvckVsZW1lbnQuc3R5bGUudG9wID0gYCR7dGhpcy5jdXJyZW50VmlicmF0ZVBvc2l0aW9uLnh9cHhgO1xuICAgIHRoaXMudmlicmF0b3JFbGVtZW50LnN0eWxlLnJpZ2h0ID0gYCR7dGhpcy5jdXJyZW50VmlicmF0ZVBvc2l0aW9uLnl9cHhgO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnZpYnJhdGVBbmltYXRlKTtcbiAgfVxufVxuXG4vLyBTb21lIGNvZGUgaW4gdGhpcyBmaWxlIHRha2VuIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2Z1bmphY2svbGF1bmNoY29udHJvbFxuLy8gTUlUIExpY2Vuc2U6XG4vKlxuTGF1Y2hjb250cm9sIFVJIEZsZXNobGlnaHRcblxuaHR0cHM6Ly9naXRodWIuY29tL2Z1bmphY2svbGF1bmNoY29udHJvbFxuXG5Db3B5cmlnaHQgMjAxNyBGdW5qYWNrXG5cblJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxubW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cbjEuIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xubGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG5cbjIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbnRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb25cbmFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuXG4zLiBOZWl0aGVyIHRoZSBuYW1lIG9mIHRoZSBjb3B5cmlnaHQgaG9sZGVyIG5vciB0aGUgbmFtZXMgb2YgaXRzIGNvbnRyaWJ1dG9yc1xubWF5IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlIHdpdGhvdXRcbnNwZWNpZmljIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cblxuVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG5BTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRVxuRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRVxuRk9SIEFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUxcbkRBTUFHRVMgKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SXG5TRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUlxuQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSxcbk9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFXG5PRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuKi9cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC50cyIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQURRQUFBQm5DQVlBQUFCUFltR3lBQUFBQm1KTFIwUUEvd0QvQVArZ3ZhZVRBQUFBQ1hCSVdYTUFBQXNUQUFBTEV3RUFtcHdZQUFBQUIzUkpUVVVINFFRZUN5Y1RCcVQ0c1FBQUFCbDBSVmgwUTI5dGJXVnVkQUJEY21WaGRHVmtJSGRwZEdnZ1IwbE5VRmVCRGhjQUFBTkpTVVJCVkhqYTdaeS9iNXRBRk1mZklkU2hhVGRManAydGt0bTY4QTkwNzVvQnBrcVord2YwYitnZjBObFNKang0elo3VncwbFdOeU4xUzF4TFdWRFZKYko1SGV4TEFQUGpPTGdEdSs4N2hSamZ2US92RjNlUU1HZ21CRDFpeHI4b1lIemZCd0NBMVdxVituQ3ovbDM2NWN2eEtIVThtVXdBQUNBSWdrYTIyYW93QXFSdGlYR0RJRUFWS0F2T1RBVFVySUxnZVFHeG5KUkF4Tk1FUWtRakhyS05lWWZwOTQ1UklGbklyam95R2tzN1V4N0tOdGF5T3dWRVBQTEdjSFNaT25ZY0ozV2N1R09nUG5TU3VkSTZrR3BJNkI1YkJRaDkzd2ZmOTJ0UFhPUXB5N0pTTUdKOGxlS2p0V3cvckI5emYzODFHcWVPNHpqdVI5bE9WcnBzbGVPY0h4bWVCSFZkdDdES05Wa1RLZWRRMlhxb0RFWjRpSE1PdTkydTl0akdxeHpuL09qcTU4bDFYVmd1bDJEYk50aDJlNUZ2ZFFHVGhGb3NGclRBSXlCcXJDM0ROR21zWnhkeUt2V1NIZmJNUU1mZVhNYnovV2lzYlVCUmxTTWc2a1BVaDZnUFVSK2lQa1JsbTRDb0QxRWZvajVFZllpcUhBRVJFRFZXYXF6VVdLbXhublpqelQ1ZnJhdnRkdHQ0ak1aRklVK3U2d0xuWEhxZ3NpZCtWQlFVa3c0OXowdTlRSkVYS3NKTFpZLzFoVWV6Y2h3bjlSN2RiRGFyWmFlbEkzZGtuNExyeUVkdGI1SmNqY2JTYjVKMDNZZWtyNlNxNFdFWXZyeHByN01vb09kNTVwTDdrS2VIT1ZGckRsVjVwK3J2SG1UT1VjMmwvM2I1WURUY3NoSmhGL3o4OXVHc1BPUi8vUDdMT0pCTS9xaWNTemxFUUFSRVFOMERxVlN0dGlzZGVZaUFDTWd3VUJpR3JTZDMwWGVMNWlJUEVkQUpBV0hYaTd2c0lxOXFmNkZzMXdmRnJzMWhzdys2QWhQekMzc2UxbytGLzVxQXlRQUpGZTJ6SlNkVFZaMnhEK2ZXQmhJdWxqSzJ6Q0FaMVp5ajBHNHBENG1CZE81NHlvQms3R0YxYytqbzZ2VWw1TXBFSWRmM2tLdmxvYTVEVHNaRFZUbkVjRHBIZG5OZGFiVE9rSXVpQ09JNEJwek9nZDFjTTlYR3VyK1RHQTRBNys0Qk5rOGd3SVRldmIxb3pVTlJGQlYrOXVmSDdmNkg0VURjM2NTcVFLOWZIQTRBcC9QQ0U5OS8vZElJNk1Yb1BPMUJqbTFTQUxvb0dSaGc4eVJua0lxeWM3M3FEUUE4cXdMOXJUMXBBcktoNFVWNmJ1S2hOcStzRVVrOUxzZTdlNFFlaUgzK1ZHa3ZyVmo3THVrM05Mb09PNWx3cXdYVUZaZ3NpREtRU2FpNk1NcEF1c0ZVUUZvQmFodXNDWWpRUHhqaXJ5Q29wTFdiQUFBQUFFbEZUa1N1UW1DQ1wiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZGV2dG9vbHMvd2ViL2ZsZXNobGlnaHQucG5nXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9kZXZ0b29scy93ZWIvZmxlc2hsaWdodC5wbmdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRElBQUFCQkNBSUFBQUFjNjJDSkFBQUFCR2RCVFVFQUFMR1BDL3hoQlFBQUFDQmpTRkpOQUFCNkpnQUFnSVFBQVBvQUFBQ0E2QUFBZFRBQUFPcGdBQUE2bUFBQUYzQ2N1bEU4QUFBQUJtSkxSMFFBL3dEL0FQK2d2YWVUQUFBQUNYQklXWE1BQUFzU0FBQUxFZ0hTM1g3OEFBQUFCM1JKVFVVSDRRb09GU29EVnl6eEhBQUFDVmxKUkVGVWFON2RXbDFzRTFjV1BuZit4eDZQLzhZMktVbk1MazBVRnJwU1VXa0xLdEpXVlo4V3lUSnNKRVFRa1doQkxSSThWU29QQzZqcVE2SktmV0NsVm1vVGlVSjJ1MVdraHZTbExXckxBeERDOHFPdGhOUUdWRW9TWjJteGpYOWlPOU1aejcxM0h5NFlOd25GUDVpVjlqeFlNM2ZtbnZudU9lZWV2MnRFS1lYbWlCQUNBTVBEd3dDd2UvZHVudWNSUWszeUJOb2NFVUl3eHNlUEh3K0h3OUZvZEdSa0JHTk1DR21TYmJPd0hNYzVkT2lRWVJoUFB2bmsrdlhydTd1N2p4dzVnakZ1a2kxcVVvbUVFSmVxR29aaGhFSTh6d1BBdFd2WDV1Zm5PWTVyaG0xVGt5bWwrL2J0TTR3UVVHQ1lBS0M3dTN2ZnZuMU5ycllwV05ldlhmdm1xNjhwSVpxbVZRWVJRdWZQbi8vKysrK2JRZFk0TEl6eHFWT244dms4UW1pUnltemJQbjM2Tk5zUWp4dFdJcEU0ZnVLRUpFbUNJQ2lLVXYzSTdYWi8vUEhITXpNekRRdXNFVmlVVW96eDRNREFmeEp6QUFBSUVMK1lUemFiSFJ3Y2JIak5EVXByYW1ycXE2KytacnJ6K254TFgxQVVaWEp5Y21wcTZySENLcFZLMld5R3dSSjRZUm0rSEZjb0ZCWVdGaHJqMzZEZjJyaHhZMkptRmdCMG4xZFYxV28wQUlBeFp2SEg3WGFmT1hQbWNVbUxBZ0lFQUVzWHBPdjZpaFVybW8rSmpjQWFHaDY2OGNNUHl6NEtoOE9hcHJsY0xuYWJUcWMvK09DREJoUlNOeXdXaHRtMXdQT2lLRlllVllUazhYaXFwelFBcTI3YnVuejU4b3QvZXRHcjZ3QWdpbUxBQ0ZhTHl1ZnpBWUJwbXJkdTNjSVlBMEFpa2ZqODg4K2ZlZWFaMWtvTG9ZZXZSRlhWU0NTeVZJb3RoRFV4TVNGTDB0SnhTWkprV2E3Y0NzSmRyK0YydXljbkoxc082NU4vZnVLcThnalZFcXIyRkxJc0J3SUJBQWdFQXFPam95MkhWU01oaEtwM1EydGhwVklweTdKcWZMbGlnbzdqcEZLcEZzSWFHeHViU3lScTNMb3VsNHNKTEp2Tm5qeDVzbFd3S0tXTDl0UnZaOGFTSkZWUzFucXBQbGlmZnZwcE5SVE5vejEwQ2dESXN2elpaNSsxQ2hiSGNlZk9uZnVWQUdwVEo4L3pseTVkYWhXc3gwbi9sN0NhTCtwYkFTdWZ6MWRmc3lyb2Z3OXJFWVJNSmxOZGdSV0xSZHUyRytNc05EWnRXU3FYeTNOemM3cXVzK3RNSnRNd3EwY0dpMUxLODd4cG1xWnBOcyt0RGlVU1FsNTQ0UVdXM0ZWR0hNZGgxd2loQjlYUUdPTU5HemEwQ2haQ2FOdTJiZFhmeGhqL1VvTnNMTXVLeFdJdGhMVTBMeTBXaW5WOTc5SERBb0N0VzdlMmQzWlV1eXVFVUQ2WGh3ZUhiVXFwMysrUHhXSjFGUTMxd1FxRlF2MzkvYWI1cTFvWll3Y29QTWl3Y3JuYzl1M2JEY05vb2JRQTRLV1hYZ3BISWhWTEJ3RGJzblBaN01MQ1F2VWdJMEtJcnVzdnYveHl2WDNldWdzeVN1blUxTlNXUDI5SkptK3pEQUloNU5FOWdpaHFtcmFvb3lRSXdrY2ZmZFRUMDFPdjk2L2JieUdFZW5wNjRsdmoveGo1ZXlYSjBYVmRkZCt0cEhPNUhCTWJRbWo3OXUxcjFxeXA5eE9OU0lzSkxKVks3ZHk1OCtyVnF6emlNTUdXYlZmVUpNc3l4M0hsY3JtcnEydDBkTFM2WUt5ZEdveUpobUhzMnJVTEFQTDV2R21hQVgrZ3M3T3pvNk5qdzRZTnJGcmtlWDdQbmozaGNMZ3gvazAxd0RkdDNKaVlUVkJLaThXaVF6QkNxTDI5WFpJazI3WU53emg3OW16RG5CdVBpWVNRNTU1Ly90dC9mOHZ6dk12bFd0M1pBUUNDSU55NWN3ZGp2R25UcHFVbFNlM1VWR0xUMTljblNxTEw1YUlBczdPemlVVEM3L2RybW1aWlZtOXZiek9jRzVjV3gzRUlJY3UyQ1NGQVlkWHZmeWZMY2lhVEtaVks1WElaR3VxSVBBSllqQ1JKVW1VRkFjek56WW1pdUg3OWV0dTJpOFZtQTJXenNBZ2haYWNNRklKRzBPdjEzcmh4bzFnc2xrcWxabUd4L09uS2xTc2N4eG1HMGRIUndiUlQ0M3lPNHdSQkJFcXoyZXo4L1B6YXRXdlQ2WFR6R2IwQUFJT0RnME5EUTJ4N2o0eU1SS1BSV21ZeXowSXdMcGZMTGxYdGVLSU5BT2JuNTBWUlpLMEg5a0pqRUxuaDRlR2pSNDhHZzhGQUlMQ3dzTEJqeDQ1ME9sM0xURUxJOVBTMElpdHVsOHZyOVFLQUtJcUtvaWlLSW9yaTlldlhiOTY4MmZqaFNtVTF3V0JRMS9WY0xqYzJOdmJiUjBqc2pJbFMrdTY3NzFaaWN5UVNXYmx5Wldkblp6UWFiVzl2Zi92dHQvZnYzejh6TXdQM0RtUHFnd1VBUU1FMFRkYk80M24rOHVYTEQyMUhqWTJOeFdLeDZadlRsUkZkMTZWN3pjdTJ0clpRS0NTS1lqd2U3K3JxMnJ4NTgvRHc4TjNUM3RybzdrNmN6K1Z6Mlp3Uk10eHU5L2o0K0d1dnZiWTB4RElKdmZQT096TXpNeE1URTBDb0xFbk1SUUZBb1ZCZ3BSZ2psOHVWVENZRGdVQTBHdVY1L3RpeFkrbDArdURCZ3pXMmx2ZzMzbmpqeXkrK3dBNldaRW5UTk5NMHkrVXlDN3BNdjJ5VlUxTlQ0K1BqVzdacytmSEhIMi9mdnMzemZLbTB3RHFEaUVOdXQ5czBUWGFDVnl3V1RkUE1ack8yYmR1MlhTZ1VFRUxoY0RpUlNFeE9Ubm84bmxxMkZNSVlQL2Zzc3ovZCtrbFc1S0JoK0h5K1RDWmpXZFpiYjcwVmo4ZFpXVEV3TURBNk9tcFpGanVlc0g2eEZvcEZCMk5DaUtacHNxcXd2cklvaWh6SDJiYTlWRm1DSUt4ZXZicFFLQlNMeFFNSERzVGo4WWZBY2h4bmNHRHdiMGVQaXFLb3FtclBIOWFrVWlsV0V6Tm5qUkR5Ky8wODRrcWxVc1Z5T1k2VEZObmo4VHowcUx3NllPdTZIb2xFRW9sRWYzOS9MQllMaFVJUG1vNElJWVNRUHo3MVZDNlhVeFQxaVpWUGhNUGhWQ3BWS3BWeXVSeDJNQ0FBQ3M0OUcySmE4M2w5a25LM0M2OG9pc2ZqVVpmcmlqTzZjK2VPNHpnSW9YSzU3UFY2bWFrUVFvYUdoam83TzVkMWJJaVp6b2NmZm5qNHI0ZEVVZFIwVDF0Ym04L255K2Z6dG0zUHpTYVdGZzZxUzlXOTNvcHB0N2UzMTJMRkxDMzcrZWVmS2FXUlNFVFRORUxJZSsrOXQyejZlamNOVEtWU2UvZnN2WERoZ3NEem1xWnBtb1lRY3JDVFNxWVdHWW9vaVQ2LzMrUHhHSWJCRkZUNVhWNGQ5L1lOODNBc1JsbVdKVWxTS0JRS0JvT0hEeCtPUnFPTHRIbWZYVEtaZlBQTk4wOTk4ZVZ2bUlza1NiNkFuMWtKaHhCQ3lEVE5aQ3FGWUlraUVBQ2w5M3BOVkZIVlVDZ0VBRUJCOStyNWZKNkZxWEE0N0RqTysrKy9INDFHcTdWNUh4WWhKSmxNdnY3NjYvKzZjSUZEeXlDamxLcXFxdnU4ekd0emdOaTZIZXdzN2UwS2dsRDlHWjduMldwRlVmUjQ5VXE0ZEx2ZFBwOHZHQXdPRGc2R3crSEtsUHV3MkVVNm5lN3I2N3Q0OGFMbWNpL0tldG10cE1pV1pSVUtCWUlKSVdUYlg3WnQzcnk1V2xhRTByTm56b3lkUExsb2JRZ2hsMHNWUlpIOXNVZFZGVVZSRlZVUlJWSFR0TjdlM3IxNzl5NEQ2ejVmUXI3NzdydFhkcjh5TXoyOTZGRjAxU3BDQ1FBY08zWnMzYnAxTERndVNvUllNRmpxelFraEF3TUQ0K1BqQ0dCMlpoWUFLRkN2enljSXd0TlBQMzNpeElscVBnODBWWXd4KzB0V05iMzY2cXNOSDB4VTQyTWhzaklTajhjWGxXNy9CZWRRYjZET2xiNkhBQUFBR1hSRldIUmpiMjF0Wlc1MEFFTnlaV0YwWldRZ2QybDBhQ0JIU1UxUTU2OUF5d0FBQUNWMFJWaDBaR0YwWlRwamNtVmhkR1VBTWpBeE55MHhNQzB4TkZReU1UbzBNam93TXkwd056b3dNTnZpb3FNQUFBQWxkRVZZZEdSaGRHVTZiVzlrYVdaNUFESXdNVGN0TVRBdE1UUlVNakU2TkRJNk1ETXRNRGM2TURDcXZ4b2ZBQUFBQUVsRlRrU3VRbUNDXCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9kZXZ0b29scy93ZWIvaHVzaC5wbmdcbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2RldnRvb2xzL3dlYi9odXNoLnBuZ1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgKiBmcm9tIFwiLi4vVGVzdERldmljZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4uL1Rlc3REZXZpY2VNYW5hZ2VyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi4vdXRpbHNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0xvZ1BhbmVsXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsXCI7XG5leHBvcnQgKiBmcm9tIFwiLi91dGlscy53ZWJcIjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kZXZ0b29scy93ZWIvaW5kZXgud2ViLnRzIiwiLy8gV2UgaGF2ZSB0byBicmluZyBpbiBvdXIgb3duIGpzcGFuZWwgaW5zdGFuY2UgYmVjYXVzZSB0aGUgb25lIGluIHRoZSBtb2R1bGVcbi8vIGRvZXNuJ3QgaW5jbHVkZSBhbiBleHBvcnQgc3RhdGVtZW50LlxuXG4vKiBqc3BhbmVsLmpzIC0gTGljZW5zZSBNSVQsIGNvcHlyaWdodCAyMDEzIC0gMjAxOCBTdGVmYW4gU3RyYWVzc2VyIDxpbmZvQGpzcGFuZWwuZGU+IChodHRwOi8vanNwYW5lbC5kZSkgKi9cbi8qIGdsb2JhbCBqc1BhbmVsLCAkICovXG4ndXNlIHN0cmljdCc7XG4vLyAuYXBwZW5kKCkgcG9seWZpbGwgbmVlZGVkIGZvciBFREdFIC0gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1BhcmVudE5vZGUvYXBwZW5kXG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfSBlbHNlIHsgcmV0dXJuIEFycmF5LmZyb20oYXJyKTsgfSB9XG5cbihmdW5jdGlvbiAoYXJyKSB7XG4gICAgYXJyLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgaXRlbS5hcHBlbmQgPSBpdGVtLmFwcGVuZCB8fCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXJnQXJyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSxcbiAgICAgICAgICAgICAgICBkb2NGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICAgICAgYXJnQXJyLmZvckVhY2goZnVuY3Rpb24gKGFyZ0l0ZW0pIHtcbiAgICAgICAgICAgICAgICB2YXIgaXNOb2RlID0gYXJnSXRlbSBpbnN0YW5jZW9mIE5vZGU7XG4gICAgICAgICAgICAgICAgZG9jRnJhZy5hcHBlbmRDaGlsZChpc05vZGUgPyBhcmdJdGVtIDogZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoU3RyaW5nKGFyZ0l0ZW0pKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQoZG9jRnJhZyk7XG4gICAgICAgIH07XG4gICAgfSk7XG59KShbRWxlbWVudC5wcm90b3R5cGUsIERvY3VtZW50LnByb3RvdHlwZSwgRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGVdKTtcbi8vIEVsZW1lbnQuY2xvc2VzdCgpIHBvbHlmaWxsIG5lZWRlZCBmb3IgRURHRSAtIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50L2Nsb3Nlc3RcbmlmICh3aW5kb3cuRWxlbWVudCAmJiAhRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdCkge1xuICAgIEVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QgPSBmdW5jdGlvbiAocykge1xuICAgICAgICB2YXIgbWF0Y2hlcyA9ICh0aGlzLmRvY3VtZW50IHx8IHRoaXMub3duZXJEb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzKSxcbiAgICAgICAgICAgIGkgPSB2b2lkIDAsXG4gICAgICAgICAgICBlbCA9IHRoaXM7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGkgPSBtYXRjaGVzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICgtLWkgPj0gMCAmJiBtYXRjaGVzLml0ZW0oaSkgIT09IGVsKSB7fTtcbiAgICAgICAgfSB3aGlsZSAoaSA8IDAgJiYgKGVsID0gZWwucGFyZW50RWxlbWVudCkpO1xuICAgICAgICByZXR1cm4gZWw7XG4gICAgfTtcbn1cbi8vIE5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoKCkgcG9seWZpbGwgbmVlZGVkIGZvciBJRTExIGFuZCBBbmRyb2lkIG1vYmlsZSAtIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Ob2RlTGlzdC9mb3JFYWNoXG5pZiAod2luZG93Lk5vZGVMaXN0ICYmICFOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCkge1xuICAgIE5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgICAgIHRoaXNBcmcgPSB0aGlzQXJnIHx8IHdpbmRvdztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXNbaV0sIGksIHRoaXMpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbi8vIE9iamVjdC5hc3NpZ24gUG9seWZpbGwgbmVlZGVkIGZvciBtb2JpbGVzIC0gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZGUvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2Fzc2lnblxuaWYgKCFPYmplY3QuYXNzaWduKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9iamVjdCwgJ2Fzc2lnbicsIHtcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZSh0YXJnZXQpIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCB8fCB0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCBmaXJzdCBhcmd1bWVudCB0byBvYmplY3QnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB0byA9IE9iamVjdCh0YXJnZXQpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dFNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgICAgICBpZiAobmV4dFNvdXJjZSA9PT0gdW5kZWZpbmVkIHx8IG5leHRTb3VyY2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5leHRTb3VyY2UgPSBPYmplY3QobmV4dFNvdXJjZSk7XG4gICAgICAgICAgICAgICAgdmFyIGtleXNBcnJheSA9IE9iamVjdC5rZXlzKE9iamVjdChuZXh0U291cmNlKSk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbmV4dEluZGV4ID0gMCwgbGVuID0ga2V5c0FycmF5Lmxlbmd0aDsgbmV4dEluZGV4IDwgbGVuOyBuZXh0SW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dEtleSA9IGtleXNBcnJheVtuZXh0SW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobmV4dFNvdXJjZSwgbmV4dEtleSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXNjICE9PSB1bmRlZmluZWQgJiYgZGVzYy5lbnVtZXJhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b1tuZXh0S2V5XSA9IG5leHRTb3VyY2VbbmV4dEtleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdG87XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLy8gUG9seWZpbGxzIGZvciBJRTExIG9ubHlcbi8vIEN1c3RvbUV2ZW50IC0gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0N1c3RvbUV2ZW50XG4oZnVuY3Rpb24gKCkge1xuICAgIGlmICh0eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBmYWxzZTtcbiAgICBmdW5jdGlvbiBDdXN0b21FdmVudChldmVudCwgcGFyYW1zKSB7XG4gICAgICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7IGJ1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiBmYWxzZSwgZGV0YWlsOiB1bmRlZmluZWQgfTtcbiAgICAgICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgICAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpO1xuICAgICAgICByZXR1cm4gZXZ0O1xuICAgIH1cbiAgICBDdXN0b21FdmVudC5wcm90b3R5cGUgPSB3aW5kb3cuRXZlbnQucHJvdG90eXBlO1xuICAgIHdpbmRvdy5DdXN0b21FdmVudCA9IEN1c3RvbUV2ZW50O1xufSkoKTtcbi8vIFN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGgoKSAtIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1N0cmluZy9lbmRzV2l0aFxuaWYgKCFTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoKSB7XG4gICAgU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aCA9IGZ1bmN0aW9uIChzZWFyY2hTdHIsIFBvc2l0aW9uKSB7XG4gICAgICAgIC8vIFRoaXMgd29ya3MgbXVjaCBiZXR0ZXIgdGhhbiA+PSBiZWNhdXNlXG4gICAgICAgIC8vIGl0IGNvbXBlbnNhdGVzIGZvciBOYU46XG4gICAgICAgIGlmICghKFBvc2l0aW9uIDwgdGhpcy5sZW5ndGgpKSBQb3NpdGlvbiA9IHRoaXMubGVuZ3RoO2Vsc2UgUG9zaXRpb24gfD0gMDsgLy8gcm91bmQgcG9zaXRpb25cbiAgICAgICAgcmV0dXJuIHRoaXMuc3Vic3RyKFBvc2l0aW9uIC0gc2VhcmNoU3RyLmxlbmd0aCwgc2VhcmNoU3RyLmxlbmd0aCkgPT09IHNlYXJjaFN0cjtcbiAgICB9O1xufVxuLy8gU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoKCkgLSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TdHJpbmcvc3RhcnRzV2l0aFxuaWYgKCFTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGgpIHtcbiAgICBTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGggPSBmdW5jdGlvbiAoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5zdWJzdHIocG9zaXRpb24gfHwgMCwgc2VhcmNoU3RyaW5nLmxlbmd0aCkgPT09IHNlYXJjaFN0cmluZztcbiAgICB9O1xufVxuXG4vLyBDcmVhdGUgYSBuZXcgb2JqZWN0LCB0aGF0IHByb3RvdHlwaWNhbGx5IGluaGVyaXRzIGZyb20gdGhlIEVycm9yIGNvbnN0cnVjdG9yXG5mdW5jdGlvbiBqc1BhbmVsRXJyb3IobWVzc2FnZSkge1xuICAgIHRoaXMubmFtZSA9ICdqc1BhbmVsRXJyb3InO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UgfHwgJyc7XG4gICAgdGhpcy5zdGFjayA9IG5ldyBFcnJvcigpLnN0YWNrO1xufVxuanNQYW5lbEVycm9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXJyb3IucHJvdG90eXBlKTtcbmpzUGFuZWxFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBqc1BhbmVsRXJyb3I7XG5cbmV4cG9ydCB2YXIganNQYW5lbCA9IHtcblxuICAgIHZlcnNpb246ICc0LjAuMC1iZXRhLjInLFxuICAgIGRhdGU6ICcyMDE4LTAxLTA4IDA5OjU2JyxcbiAgICBpZENvdW50ZXI6IDAsXG4gICAgemlCYXNlOiAxMDAsXG4gICAgdGhlbWVzOiBbJ2RlZmF1bHQnLCAncHJpbWFyeScsICdpbmZvJywgJ3N1Y2Nlc3MnLCAnd2FybmluZycsICdkYW5nZXInXSxcbiAgICBtZGJ0aGVtZXM6IFsnc2Vjb25kYXJ5JywgJ2VsZWdhbnQnLCAnc3R5bGlzaCcsICd1bmlxdWUnLCAnc3BlY2lhbCddLFxuICAgIGF1dG9wb3NpdGlvblNwYWNpbmc6IDQsXG4gICAgaXNJRTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLmFwcFZlcnNpb24ubWF0Y2goL1RyaWRlbnQvKTtcbiAgICB9KCksXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgYm94U2hhZG93OiAzLFxuICAgICAgICBjb250YWluZXI6IGRvY3VtZW50LmJvZHksXG4gICAgICAgIGNvbnRlbnRTaXplOiB7IHdpZHRoOiAnNDAwcHgnLCBoZWlnaHQ6ICcyMDBweCcgfSwgLy8gbXVzdCBiZSBvYmplY3RcbiAgICAgICAgZHJhZ2l0OiB7XG4gICAgICAgICAgICBjdXJzb3I6ICdtb3ZlJyxcbiAgICAgICAgICAgIGhhbmRsZXM6ICcuanNQYW5lbC1oZWFkZXJsb2dvLCAuanNQYW5lbC10aXRsZWJhciwgLmpzUGFuZWwtZnRyJywgLy8gZG8gbm90IHVzZSAuanNQYW5lbC1oZWFkZXJiYXJcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuOCxcbiAgICAgICAgICAgIGRpc2FibGVPbk1heGltaXplZDogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBoZWFkZXJUaXRsZTogJ2pzUGFuZWwnLFxuICAgICAgICBoZWFkZXJDb250cm9sczogJ2FsbCcsXG4gICAgICAgIGljb25mb250OiAnanNnbHlwaCcsXG4gICAgICAgIG1heGltaXplZE1hcmdpbjogMCxcbiAgICAgICAgbWluaW1pemVUbzogJ2RlZmF1bHQnLFxuICAgICAgICBwYW5lbHR5cGU6ICdzdGFuZGFyZCcsXG4gICAgICAgIHBvc2l0aW9uOiAnY2VudGVyJyxcbiAgICAgICAgcmVzaXplaXQ6IHtcbiAgICAgICAgICAgIGhhbmRsZXM6ICduLCBlLCBzLCB3LCBuZSwgc2UsIHN3LCBudycsXG4gICAgICAgICAgICBtaW5XaWR0aDogNDAsXG4gICAgICAgICAgICBtaW5IZWlnaHQ6IDQwXG4gICAgICAgIH0sXG4gICAgICAgIHRoZW1lOiAnZGVmYXVsdCdcbiAgICB9LFxuICAgIGRlZmF1bHRTbmFwQ29uZmlnOiB7XG4gICAgICAgIHNlbnNpdGl2aXR5OiA3MCxcbiAgICAgICAgdHJpZ2dlcjogJ3BhbmVsJ1xuICAgIH0sXG4gICAgYWpheEFsd2F5c0NhbGxiYWNrczogW10sXG4gICAgZXh0ZW5zaW9uczoge30sXG5cbiAgICBhamF4OiBmdW5jdGlvbiBhamF4KG9iaikge1xuICAgICAgICB2YXIgY29uZiA9IG9iai5vcHRpb25zLmNvbnRlbnRBamF4LFxuICAgICAgICAgICAgY29uZmlnRGVmYXVsdHMgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICB1c2VyOiAnJyxcbiAgICAgICAgICAgIHB3ZDogJycsXG4gICAgICAgICAgICBkb25lOiBmdW5jdGlvbiBkb25lKCkge1xuICAgICAgICAgICAgICAgIG9iai5jb250ZW50LmlubmVySFRNTCA9IHRoaXMucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGF1dG9yZXNpemU6IHRydWUsXG4gICAgICAgICAgICBhdXRvcmVwb3NpdGlvbjogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICB2YXIgY29uZmlnID0gdm9pZCAwO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZ0RlZmF1bHRzLCB7IHVybDogZW5jb2RlVVJJKGNvbmYpLCBldmFsc2NyaXB0dGFnczogdHJ1ZSB9KTtcbiAgICAgICAgfSBlbHNlIGlmICgodHlwZW9mIGNvbmYgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGNvbmYpKSA9PT0gJ29iamVjdCcgJiYgY29uZi51cmwpIHtcbiAgICAgICAgICAgIGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZ0RlZmF1bHRzLCBjb25mKTtcbiAgICAgICAgICAgIGNvbmZpZy51cmwgPSBlbmNvZGVVUkkoY29uZi51cmwpO1xuICAgICAgICAgICAgLy8gcmVzZXQgdGltZW91dCB0byAwLCB3aXRoQ3JlZGVudGlhbHMgJiByZXNwb25zZVR5cGUgdG8gZmFsc2UgaWYgcmVxdWVzdCBpcyBzeW5jaHJvbm91c1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5hc3luYyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBjb25maWcudGltZW91dCA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLndpdGhDcmVkZW50aWFscyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLnJlc3BvbnNlVHlwZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oJ1hNTEh0dHBSZXF1ZXN0IHNlZW1zIHRvIG1pc3MgdGhlIHJlcXVlc3QgdXJsIScpO1xuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25maWcuZG9uZS5jYWxsKHhociwgb2JqKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBleHRyYWN0IGFuZCBldmFsIGNvbnRlbnQgb2Ygc2NyaXB0IHRhZ3MgaWYgXCJldmFsc2NyaXB0dGFnc1wiXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25maWcuZXZhbHNjcmlwdHRhZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldCBhbGwgc2NyaXB0IHRhZ3Mgd2l0aGluIHJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNjcmlwdHRhZ3MgPSB4aHIucmVzcG9uc2VUZXh0Lm1hdGNoKC88c2NyaXB0XFxiW14+XSo+KFtcXHNcXFNdKj8pPFxcL3NjcmlwdD4vZ2kpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjcmlwdHRhZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JpcHR0YWdzLmZvckVhY2goZnVuY3Rpb24gKHRhZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGFncyBmcm9tIHN0cmluZyBhbmQgdHJpbSBpdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIganMgPSB0YWcucmVwbGFjZSgvPHNjcmlwdFxcYltePl0qPi9pLCAnJykucmVwbGFjZSgvPFxcL3NjcmlwdD4vaSwgJycpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXhlY3V0ZSBqYXZhc2NyaXB0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2YWwoanMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5mYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWcuZmFpbC5jYWxsKHhociwgb2JqKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjb25maWcuYWx3YXlzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5hbHdheXMuY2FsbCh4aHIsIG9iaik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcmVzaXplIGFuZCByZXBvc2l0aW9uIHBhbmVsIGlmIGVpdGhlciB3aWR0aCBvciBoZWlnaHQgaXMgc2V0IHRvICdhdXRvJ1xuICAgICAgICAgICAgICAgIHZhciBvQ29udGVudFNpemUgPSBvYmoub3B0aW9ucy5jb250ZW50U2l6ZTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9Db250ZW50U2l6ZSA9PT0gJ3N0cmluZycgJiYgb0NvbnRlbnRTaXplLm1hdGNoKC9hdXRvL2kpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJ0cyA9IG9Db250ZW50U2l6ZS5zcGxpdCgnICcpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2l6ZXMgPSBPYmplY3QuYXNzaWduKHt9LCB7IHdpZHRoOiBwYXJ0c1swXSwgaGVpZ2h0OiBwYXJ0c1sxXSB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5hdXRvcmVzaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoucmVzaXplKHNpemVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9iai5jbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwtY29udGV4dG1lbnUnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5hdXRvcmVwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5yZXBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCh0eXBlb2Ygb0NvbnRlbnRTaXplID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihvQ29udGVudFNpemUpKSA9PT0gJ29iamVjdCcgJiYgKG9Db250ZW50U2l6ZS53aWR0aCA9PT0gJ2F1dG8nIHx8IG9Db250ZW50U2l6ZS5oZWlnaHQgPT09ICdhdXRvJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9zaXplcyA9IE9iamVjdC5hc3NpZ24oe30sIG9Db250ZW50U2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25maWcuYXV0b3Jlc2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnJlc2l6ZShfc2l6ZXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghb2JqLmNsYXNzTGlzdC5jb250YWlucygnanNQYW5lbC1jb250ZXh0bWVudScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29uZmlnLmF1dG9yZXBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnJlcG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGFsbG93cyBwbHVnaW5zIHRvIGFkZCBjYWxsYmFjayBmdW5jdGlvbnMgdG8gdGhlIGFqYXggYWx3YXlzIGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgaWYgKGpzUGFuZWwuYWpheEFsd2F5c0NhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAganNQYW5lbC5hamF4QWx3YXlzQ2FsbGJhY2tzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2FsbChvYmosIG9iaik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB4aHIub3Blbihjb25maWcubWV0aG9kLCBjb25maWcudXJsLCBjb25maWcuYXN5bmMsIGNvbmZpZy51c2VyLCBjb25maWcucHdkKTtcbiAgICAgICAgeGhyLnRpbWVvdXQgPSBjb25maWcudGltZW91dCB8fCAwO1xuICAgICAgICBpZiAoY29uZmlnLndpdGhDcmVkZW50aWFscykge1xuICAgICAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IGNvbmZpZy53aXRoQ3JlZGVudGlhbHM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZy5iZWZvcmVTZW5kKSB7XG4gICAgICAgICAgICBjb25maWcuYmVmb3JlU2VuZC5jYWxsKHhocik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbmZpZy5kYXRhKSB7XG4gICAgICAgICAgICB4aHIuc2VuZChjb25maWcuZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB4aHIuc2VuZChudWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfSxcbiAgICBjYWxjQ29sb3JzOiBmdW5jdGlvbiBjYWxjQ29sb3JzKHByaW1hcnlDb2xvcikge1xuICAgICAgICB2YXIgcHJpbWVDb2xvciA9IHRoaXMuY29sb3IocHJpbWFyeUNvbG9yKSxcbiAgICAgICAgICAgIHNlY29uZENvbG9yID0gdGhpcy5saWdodGVuKHByaW1hcnlDb2xvciwgMC44MSksXG4gICAgICAgICAgICB0aGlyZENvbG9yID0gdGhpcy5kYXJrZW4ocHJpbWFyeUNvbG9yLCAwLjUpLFxuICAgICAgICAgICAgZm9udENvbG9yRm9yUHJpbWFyeSA9IHRoaXMucGVyY2VpdmVkQnJpZ2h0bmVzcyhwcmltYXJ5Q29sb3IpIDw9IDAuNTU2ID8gJyNmZmZmZmYnIDogJyMwMDAwMDAnLFxuICAgICAgICAgICAgZm9udENvbG9yRm9yU2Vjb25kID0gdGhpcy5wZXJjZWl2ZWRCcmlnaHRuZXNzKHNlY29uZENvbG9yKSA8PSAwLjU1NiA/ICcjZmZmZmZmJyA6ICcjMDAwMDAwJyxcbiAgICAgICAgICAgIGZvbnRDb2xvckZvclRoaXJkID0gdGhpcy5wZXJjZWl2ZWRCcmlnaHRuZXNzKHRoaXJkQ29sb3IpIDw9IDAuNTU2ID8gJyMwMDAwMDAnIDogJyNmZmZmZmYnO1xuICAgICAgICByZXR1cm4gW3ByaW1lQ29sb3IuaHNsLmNzcywgc2Vjb25kQ29sb3IsIHRoaXJkQ29sb3IsIGZvbnRDb2xvckZvclByaW1hcnksIGZvbnRDb2xvckZvclNlY29uZCwgZm9udENvbG9yRm9yVGhpcmRdO1xuICAgIH0sXG4gICAgY29sb3I6IGZ1bmN0aW9uIGNvbG9yKHZhbCkge1xuXG4gICAgICAgIHZhciBjb2xvciA9IHZhbC50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgciA9IHZvaWQgMCxcbiAgICAgICAgICAgIGcgPSB2b2lkIDAsXG4gICAgICAgICAgICBiID0gdm9pZCAwLFxuICAgICAgICAgICAgaCA9IHZvaWQgMCxcbiAgICAgICAgICAgIHMgPSB2b2lkIDAsXG4gICAgICAgICAgICBsID0gdm9pZCAwLFxuICAgICAgICAgICAgbWF0Y2ggPSB2b2lkIDAsXG4gICAgICAgICAgICBjaGFubmVscyA9IHZvaWQgMCxcbiAgICAgICAgICAgIGhzbCA9IHZvaWQgMCxcbiAgICAgICAgICAgIHJlc3VsdCA9IHt9O1xuICAgICAgICB2YXIgaGV4UGF0dGVybiA9IC9eIz8oWzAtOWEtZl17M318WzAtOWEtZl17Nn0pJC9naSxcbiAgICAgICAgICAgIC8vIG1hdGNoZXMgXCIjMTIzXCIgb3IgXCIjZjA1YTc4XCIgd2l0aCBvciB3aXRob3V0IFwiI1wiXG4gICAgICAgIFJHQkFQYXR0ZXJuID0gL15yZ2JhP1xcKChbMC05XXsxLDN9KSwoWzAtOV17MSwzfSksKFswLTldezEsM30pLD8oMHwxfDBcXC5bMC05XXsxLDJ9fFxcLlswLTldezEsMn0pP1xcKSQvZ2ksXG4gICAgICAgICAgICAvLyBtYXRjaGVzIHJnYi9yZ2JhIGNvbG9yIHZhbHVlcywgd2hpdGVzcGFjZSBhbGxvd2VkXG4gICAgICAgIEhTTEFQYXR0ZXJuID0gL15oc2xhP1xcKChbMC05XXsxLDN9KSwoWzAtOV17MSwzfSUpLChbMC05XXsxLDN9JSksPygwfDF8MFxcLlswLTldezEsMn18XFwuWzAtOV17MSwyfSk/XFwpJC9naSxcbiAgICAgICAgICAgIG5hbWVkQ29sb3JzID0ge1xuICAgICAgICAgICAgYWxpY2VibHVlOiAnZjBmOGZmJyxcbiAgICAgICAgICAgIGFudGlxdWV3aGl0ZTogJ2ZhZWJkNycsXG4gICAgICAgICAgICBhcXVhOiAnMGZmJyxcbiAgICAgICAgICAgIGFxdWFtYXJpbmU6ICc3ZmZmZDQnLFxuICAgICAgICAgICAgYXp1cmU6ICdmMGZmZmYnLFxuICAgICAgICAgICAgYmVpZ2U6ICdmNWY1ZGMnLFxuICAgICAgICAgICAgYmlzcXVlOiAnZmZlNGM0JyxcbiAgICAgICAgICAgIGJsYWNrOiAnMDAwJyxcbiAgICAgICAgICAgIGJsYW5jaGVkYWxtb25kOiAnZmZlYmNkJyxcbiAgICAgICAgICAgIGJsdWU6ICcwMGYnLFxuICAgICAgICAgICAgYmx1ZXZpb2xldDogJzhhMmJlMicsXG4gICAgICAgICAgICBicm93bjogJ2E1MmEyYScsXG4gICAgICAgICAgICBidXJseXdvb2Q6ICdkZWI4ODcnLFxuICAgICAgICAgICAgY2FkZXRibHVlOiAnNWY5ZWEwJyxcbiAgICAgICAgICAgIGNoYXJ0cmV1c2U6ICc3ZmZmMDAnLFxuICAgICAgICAgICAgY2hvY29sYXRlOiAnZDI2OTFlJyxcbiAgICAgICAgICAgIGNvcmFsOiAnZmY3ZjUwJyxcbiAgICAgICAgICAgIGNvcm5mbG93ZXJibHVlOiAnNjQ5NWVkJyxcbiAgICAgICAgICAgIGNvcm5zaWxrOiAnZmZmOGRjJyxcbiAgICAgICAgICAgIGNyaW1zb246ICdkYzE0M2MnLFxuICAgICAgICAgICAgY3lhbjogJzBmZicsXG4gICAgICAgICAgICBkYXJrYmx1ZTogJzAwMDA4YicsXG4gICAgICAgICAgICBkYXJrY3lhbjogJzAwOGI4YicsXG4gICAgICAgICAgICBkYXJrZ29sZGVucm9kOiAnYjg4NjBiJyxcbiAgICAgICAgICAgIGRhcmtncmF5OiAnYTlhOWE5JyxcbiAgICAgICAgICAgIGRhcmtncmV5OiAnYTlhOWE5JyxcbiAgICAgICAgICAgIGRhcmtncmVlbjogJzAwNjQwMCcsXG4gICAgICAgICAgICBkYXJra2hha2k6ICdiZGI3NmInLFxuICAgICAgICAgICAgZGFya21hZ2VudGE6ICc4YjAwOGInLFxuICAgICAgICAgICAgZGFya29saXZlZ3JlZW46ICc1NTZiMmYnLFxuICAgICAgICAgICAgZGFya29yYW5nZTogJ2ZmOGMwMCcsXG4gICAgICAgICAgICBkYXJrb3JjaGlkOiAnOTkzMmNjJyxcbiAgICAgICAgICAgIGRhcmtyZWQ6ICc4YjAwMDAnLFxuICAgICAgICAgICAgZGFya3NhbG1vbjogJ2U5OTY3YScsXG4gICAgICAgICAgICBkYXJrc2VhZ3JlZW46ICc4ZmJjOGYnLFxuICAgICAgICAgICAgZGFya3NsYXRlYmx1ZTogJzQ4M2Q4YicsXG4gICAgICAgICAgICBkYXJrc2xhdGVncmF5OiAnMmY0ZjRmJyxcbiAgICAgICAgICAgIGRhcmtzbGF0ZWdyZXk6ICcyZjRmNGYnLFxuICAgICAgICAgICAgZGFya3R1cnF1b2lzZTogJzAwY2VkMScsXG4gICAgICAgICAgICBkYXJrdmlvbGV0OiAnOTQwMGQzJyxcbiAgICAgICAgICAgIGRlZXBwaW5rOiAnZmYxNDkzJyxcbiAgICAgICAgICAgIGRlZXBza3libHVlOiAnMDBiZmZmJyxcbiAgICAgICAgICAgIGRpbWdyYXk6ICc2OTY5NjknLFxuICAgICAgICAgICAgZGltZ3JleTogJzY5Njk2OScsXG4gICAgICAgICAgICBkb2RnZXJibHVlOiAnMWU5MGZmJyxcbiAgICAgICAgICAgIGZpcmVicmljazogJ2IyMjIyMicsXG4gICAgICAgICAgICBmbG9yYWx3aGl0ZTogJ2ZmZmFmMCcsXG4gICAgICAgICAgICBmb3Jlc3RncmVlbjogJzIyOGIyMicsXG4gICAgICAgICAgICBmdWNoc2lhOiAnZjBmJyxcbiAgICAgICAgICAgIGdhaW5zYm9ybzogJ2RjZGNkYycsXG4gICAgICAgICAgICBnaG9zdHdoaXRlOiAnZjhmOGZmJyxcbiAgICAgICAgICAgIGdvbGQ6ICdmZmQ3MDAnLFxuICAgICAgICAgICAgZ29sZGVucm9kOiAnZGFhNTIwJyxcbiAgICAgICAgICAgIGdyYXk6ICc4MDgwODAnLFxuICAgICAgICAgICAgZ3JleTogJzgwODA4MCcsXG4gICAgICAgICAgICBncmVlbjogJzAwODAwMCcsXG4gICAgICAgICAgICBncmVlbnllbGxvdzogJ2FkZmYyZicsXG4gICAgICAgICAgICBob25leWRldzogJ2YwZmZmMCcsXG4gICAgICAgICAgICBob3RwaW5rOiAnZmY2OWI0JyxcbiAgICAgICAgICAgIGluZGlhbnJlZDogJ2NkNWM1YycsXG4gICAgICAgICAgICBpbmRpZ286ICc0YjAwODInLFxuICAgICAgICAgICAgaXZvcnk6ICdmZmZmZjAnLFxuICAgICAgICAgICAga2hha2k6ICdmMGU2OGMnLFxuICAgICAgICAgICAgbGF2ZW5kZXI6ICdlNmU2ZmEnLFxuICAgICAgICAgICAgbGF2ZW5kZXJibHVzaDogJ2ZmZjBmNScsXG4gICAgICAgICAgICBsYXduZ3JlZW46ICc3Y2ZjMDAnLFxuICAgICAgICAgICAgbGVtb25jaGlmZm9uOiAnZmZmYWNkJyxcbiAgICAgICAgICAgIGxpZ2h0Ymx1ZTogJ2FkZDhlNicsXG4gICAgICAgICAgICBsaWdodGNvcmFsOiAnZjA4MDgwJyxcbiAgICAgICAgICAgIGxpZ2h0Y3lhbjogJ2UwZmZmZicsXG4gICAgICAgICAgICBsaWdodGdvbGRlbnJvZHllbGxvdzogJ2ZhZmFkMicsXG4gICAgICAgICAgICBsaWdodGdyYXk6ICdkM2QzZDMnLFxuICAgICAgICAgICAgbGlnaHRncmV5OiAnZDNkM2QzJyxcbiAgICAgICAgICAgIGxpZ2h0Z3JlZW46ICc5MGVlOTAnLFxuICAgICAgICAgICAgbGlnaHRwaW5rOiAnZmZiNmMxJyxcbiAgICAgICAgICAgIGxpZ2h0c2FsbW9uOiAnZmZhMDdhJyxcbiAgICAgICAgICAgIGxpZ2h0c2VhZ3JlZW46ICcyMGIyYWEnLFxuICAgICAgICAgICAgbGlnaHRza3libHVlOiAnODdjZWZhJyxcbiAgICAgICAgICAgIGxpZ2h0c2xhdGVncmF5OiAnNzg5JyxcbiAgICAgICAgICAgIGxpZ2h0c2xhdGVncmV5OiAnNzg5JyxcbiAgICAgICAgICAgIGxpZ2h0c3RlZWxibHVlOiAnYjBjNGRlJyxcbiAgICAgICAgICAgIGxpZ2h0eWVsbG93OiAnZmZmZmUwJyxcbiAgICAgICAgICAgIGxpbWU6ICcwZjAnLFxuICAgICAgICAgICAgbGltZWdyZWVuOiAnMzJjZDMyJyxcbiAgICAgICAgICAgIGxpbmVuOiAnZmFmMGU2JyxcbiAgICAgICAgICAgIG1hZ2VudGE6ICdmMGYnLFxuICAgICAgICAgICAgbWFyb29uOiAnODAwMDAwJyxcbiAgICAgICAgICAgIG1lZGl1bWFxdWFtYXJpbmU6ICc2NmNkYWEnLFxuICAgICAgICAgICAgbWVkaXVtYmx1ZTogJzAwMDBjZCcsXG4gICAgICAgICAgICBtZWRpdW1vcmNoaWQ6ICdiYTU1ZDMnLFxuICAgICAgICAgICAgbWVkaXVtcHVycGxlOiAnOTM3MGQ4JyxcbiAgICAgICAgICAgIG1lZGl1bXNlYWdyZWVuOiAnM2NiMzcxJyxcbiAgICAgICAgICAgIG1lZGl1bXNsYXRlYmx1ZTogJzdiNjhlZScsXG4gICAgICAgICAgICBtZWRpdW1zcHJpbmdncmVlbjogJzAwZmE5YScsXG4gICAgICAgICAgICBtZWRpdW10dXJxdW9pc2U6ICc0OGQxY2MnLFxuICAgICAgICAgICAgbWVkaXVtdmlvbGV0cmVkOiAnYzcxNTg1JyxcbiAgICAgICAgICAgIG1pZG5pZ2h0Ymx1ZTogJzE5MTk3MCcsXG4gICAgICAgICAgICBtaW50Y3JlYW06ICdmNWZmZmEnLFxuICAgICAgICAgICAgbWlzdHlyb3NlOiAnZmZlNGUxJyxcbiAgICAgICAgICAgIG1vY2Nhc2luOiAnZmZlNGI1JyxcbiAgICAgICAgICAgIG5hdmFqb3doaXRlOiAnZmZkZWFkJyxcbiAgICAgICAgICAgIG5hdnk6ICcwMDAwODAnLFxuICAgICAgICAgICAgb2xkbGFjZTogJ2ZkZjVlNicsXG4gICAgICAgICAgICBvbGl2ZTogJzgwODAwMCcsXG4gICAgICAgICAgICBvbGl2ZWRyYWI6ICc2YjhlMjMnLFxuICAgICAgICAgICAgb3JhbmdlOiAnZmZhNTAwJyxcbiAgICAgICAgICAgIG9yYW5nZXJlZDogJ2ZmNDUwMCcsXG4gICAgICAgICAgICBvcmNoaWQ6ICdkYTcwZDYnLFxuICAgICAgICAgICAgcGFsZWdvbGRlbnJvZDogJ2VlZThhYScsXG4gICAgICAgICAgICBwYWxlZ3JlZW46ICc5OGZiOTgnLFxuICAgICAgICAgICAgcGFsZXR1cnF1b2lzZTogJ2FmZWVlZScsXG4gICAgICAgICAgICBwYWxldmlvbGV0cmVkOiAnZDg3MDkzJyxcbiAgICAgICAgICAgIHBhcGF5YXdoaXA6ICdmZmVmZDUnLFxuICAgICAgICAgICAgcGVhY2hwdWZmOiAnZmZkYWI5JyxcbiAgICAgICAgICAgIHBlcnU6ICdjZDg1M2YnLFxuICAgICAgICAgICAgcGluazogJ2ZmYzBjYicsXG4gICAgICAgICAgICBwbHVtOiAnZGRhMGRkJyxcbiAgICAgICAgICAgIHBvd2RlcmJsdWU6ICdiMGUwZTYnLFxuICAgICAgICAgICAgcHVycGxlOiAnODAwMDgwJyxcbiAgICAgICAgICAgIHJlYmVjY2FwdXJwbGU6ICc2MzknLFxuICAgICAgICAgICAgcmVkOiAnZjAwJyxcbiAgICAgICAgICAgIHJvc3licm93bjogJ2JjOGY4ZicsXG4gICAgICAgICAgICByb3lhbGJsdWU6ICc0MTY5ZTEnLFxuICAgICAgICAgICAgc2FkZGxlYnJvd246ICc4YjQ1MTMnLFxuICAgICAgICAgICAgc2FsbW9uOiAnZmE4MDcyJyxcbiAgICAgICAgICAgIHNhbmR5YnJvd246ICdmNGE0NjAnLFxuICAgICAgICAgICAgc2VhZ3JlZW46ICcyZThiNTcnLFxuICAgICAgICAgICAgc2Vhc2hlbGw6ICdmZmY1ZWUnLFxuICAgICAgICAgICAgc2llbm5hOiAnYTA1MjJkJyxcbiAgICAgICAgICAgIHNpbHZlcjogJ2MwYzBjMCcsXG4gICAgICAgICAgICBza3libHVlOiAnODdjZWViJyxcbiAgICAgICAgICAgIHNsYXRlYmx1ZTogJzZhNWFjZCcsXG4gICAgICAgICAgICBzbGF0ZWdyYXk6ICc3MDgwOTAnLFxuICAgICAgICAgICAgc2xhdGVncmV5OiAnNzA4MDkwJyxcbiAgICAgICAgICAgIHNub3c6ICdmZmZhZmEnLFxuICAgICAgICAgICAgc3ByaW5nZ3JlZW46ICcwMGZmN2YnLFxuICAgICAgICAgICAgc3RlZWxibHVlOiAnNDY4MmI0JyxcbiAgICAgICAgICAgIHRhbjogJ2QyYjQ4YycsXG4gICAgICAgICAgICB0ZWFsOiAnMDA4MDgwJyxcbiAgICAgICAgICAgIHRoaXN0bGU6ICdkOGJmZDgnLFxuICAgICAgICAgICAgdG9tYXRvOiAnZmY2MzQ3JyxcbiAgICAgICAgICAgIHR1cnF1b2lzZTogJzQwZTBkMCcsXG4gICAgICAgICAgICB2aW9sZXQ6ICdlZTgyZWUnLFxuICAgICAgICAgICAgd2hlYXQ6ICdmNWRlYjMnLFxuICAgICAgICAgICAgd2hpdGU6ICdmZmYnLFxuICAgICAgICAgICAgd2hpdGVzbW9rZTogJ2Y1ZjVmNScsXG4gICAgICAgICAgICB5ZWxsb3c6ICdmZjAnLFxuICAgICAgICAgICAgeWVsbG93Z3JlZW46ICc5YWNkMzInXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gY2hhbmdlIG5hbWVkIGNvbG9yIHRvIGNvcnJlc3BvbmRpbmcgaGV4IHZhbHVlXG4gICAgICAgIGlmIChuYW1lZENvbG9yc1tjb2xvcl0pIHtcbiAgICAgICAgICAgIGNvbG9yID0gbmFtZWRDb2xvcnNbY29sb3JdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgdmFsIGZvciBoZXggY29sb3JcbiAgICAgICAgaWYgKGNvbG9yLm1hdGNoKGhleFBhdHRlcm4pICE9PSBudWxsKSB7XG5cbiAgICAgICAgICAgIC8vICcjJyBlbnRmZXJuZW4gd2VubiB2b3JoYW5kZW5cbiAgICAgICAgICAgIGNvbG9yID0gY29sb3IucmVwbGFjZSgnIycsICcnKTtcblxuICAgICAgICAgICAgLy8gY29sb3IgaGFzIGVpdGhlciAzIG9yIDYgY2hhcmFjdGVyc1xuICAgICAgICAgICAgaWYgKGNvbG9yLmxlbmd0aCAlIDIgPT09IDEpIHtcblxuICAgICAgICAgICAgICAgIC8vIGNvbG9yIGhhcyAzIGNoYXIgLT4gY29udmVydCB0byA2IGNoYXJcbiAgICAgICAgICAgICAgICAvLyByID0gY29sb3Iuc3Vic3RyKDAsMSkucmVwZWF0KDIpO1xuICAgICAgICAgICAgICAgIC8vIGcgPSBjb2xvci5zdWJzdHIoMSwxKS5yZXBlYXQoMik7IC8vIFN0cmluZy5wcm90b3R5cGUucmVwZWF0KCkgZG9lc24ndCB3b3JrIGluIElFMTFcbiAgICAgICAgICAgICAgICAvLyBiID0gY29sb3Iuc3Vic3RyKDIsMSkucmVwZWF0KDIpO1xuICAgICAgICAgICAgICAgIHIgPSBTdHJpbmcoY29sb3Iuc3Vic3RyKDAsIDEpKSArIGNvbG9yLnN1YnN0cigwLCAxKTtcbiAgICAgICAgICAgICAgICBnID0gU3RyaW5nKGNvbG9yLnN1YnN0cigxLCAxKSkgKyBjb2xvci5zdWJzdHIoMSwgMSk7XG4gICAgICAgICAgICAgICAgYiA9IFN0cmluZyhjb2xvci5zdWJzdHIoMiwgMSkpICsgY29sb3Iuc3Vic3RyKDIsIDEpO1xuXG4gICAgICAgICAgICAgICAgcmVzdWx0LnJnYiA9IHtcbiAgICAgICAgICAgICAgICAgICAgcjogcGFyc2VJbnQociwgMTYpLFxuICAgICAgICAgICAgICAgICAgICBnOiBwYXJzZUludChnLCAxNiksXG4gICAgICAgICAgICAgICAgICAgIGI6IHBhcnNlSW50KGIsIDE2KVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICByZXN1bHQuaGV4ID0gJyMnICsgciArIGcgKyBiO1xuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIC8vIGNvbG9yIGhhcyA2IGNoYXJcbiAgICAgICAgICAgICAgICByZXN1bHQucmdiID0ge1xuICAgICAgICAgICAgICAgICAgICByOiBwYXJzZUludChjb2xvci5zdWJzdHIoMCwgMiksIDE2KSxcbiAgICAgICAgICAgICAgICAgICAgZzogcGFyc2VJbnQoY29sb3Iuc3Vic3RyKDIsIDIpLCAxNiksXG4gICAgICAgICAgICAgICAgICAgIGI6IHBhcnNlSW50KGNvbG9yLnN1YnN0cig0LCAyKSwgMTYpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHJlc3VsdC5oZXggPSAnIycgKyBjb2xvcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaHNsID0gdGhpcy5yZ2JUb0hzbChyZXN1bHQucmdiLnIsIHJlc3VsdC5yZ2IuZywgcmVzdWx0LnJnYi5iKTtcbiAgICAgICAgICAgIHJlc3VsdC5oc2wgPSBoc2w7XG4gICAgICAgICAgICByZXN1bHQucmdiLmNzcyA9ICdyZ2IoJyArIHJlc3VsdC5yZ2IuciArICcsJyArIHJlc3VsdC5yZ2IuZyArICcsJyArIHJlc3VsdC5yZ2IuYiArICcpJztcbiAgICAgICAgfVxuICAgICAgICAvLyBjaGVjayB2YWwgZm9yIHJnYi9yZ2JhIGNvbG9yXG4gICAgICAgIGVsc2UgaWYgKGNvbG9yLm1hdGNoKFJHQkFQYXR0ZXJuKSkge1xuXG4gICAgICAgICAgICAgICAgbWF0Y2ggPSBSR0JBUGF0dGVybi5leGVjKGNvbG9yKTtcbiAgICAgICAgICAgICAgICByZXN1bHQucmdiID0geyBjc3M6IGNvbG9yLCByOiBtYXRjaFsxXSwgZzogbWF0Y2hbMl0sIGI6IG1hdGNoWzNdIH07XG4gICAgICAgICAgICAgICAgcmVzdWx0LmhleCA9IHRoaXMucmdiVG9IZXgobWF0Y2hbMV0sIG1hdGNoWzJdLCBtYXRjaFszXSk7XG4gICAgICAgICAgICAgICAgaHNsID0gdGhpcy5yZ2JUb0hzbChtYXRjaFsxXSwgbWF0Y2hbMl0sIG1hdGNoWzNdKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuaHNsID0gaHNsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY2hlY2sgdmFsIGZvciBoc2wvaHNsYSBjb2xvclxuICAgICAgICAgICAgZWxzZSBpZiAoY29sb3IubWF0Y2goSFNMQVBhdHRlcm4pKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSBIU0xBUGF0dGVybi5leGVjKGNvbG9yKTtcblxuICAgICAgICAgICAgICAgICAgICBoID0gbWF0Y2hbMV0gLyAzNjA7XG4gICAgICAgICAgICAgICAgICAgIHMgPSBtYXRjaFsyXS5zdWJzdHIoMCwgbWF0Y2hbMl0ubGVuZ3RoIC0gMSkgLyAxMDA7XG4gICAgICAgICAgICAgICAgICAgIGwgPSBtYXRjaFszXS5zdWJzdHIoMCwgbWF0Y2hbM10ubGVuZ3RoIC0gMSkgLyAxMDA7XG5cbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbHMgPSB0aGlzLmhzbFRvUmdiKGgsIHMsIGwpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5yZ2IgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6ICdyZ2IoJyArIGNoYW5uZWxzWzBdICsgJywnICsgY2hhbm5lbHNbMV0gKyAnLCcgKyBjaGFubmVsc1syXSArICcpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHI6IGNoYW5uZWxzWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgZzogY2hhbm5lbHNbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBiOiBjaGFubmVsc1syXVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuaGV4ID0gdGhpcy5yZ2JUb0hleChyZXN1bHQucmdiLnIsIHJlc3VsdC5yZ2IuZywgcmVzdWx0LnJnYi5iKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmhzbCA9IHsgY3NzOiAnaHNsKCcgKyBtYXRjaFsxXSArICcsJyArIG1hdGNoWzJdICsgJywnICsgbWF0Y2hbM10gKyAnKScsIGg6IG1hdGNoWzFdLCBzOiBtYXRjaFsyXSwgbDogbWF0Y2hbM10gfTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBvciByZXR1cm4gI2Y1ZjVmNVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmhleCA9ICcjZjVmNWY1JztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5yZ2IgPSB7IGNzczogJ3JnYigyNDUsMjQ1LDI0NSknLCByOiAyNDUsIGc6IDI0NSwgYjogMjQ1IH07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuaHNsID0geyBjc3M6ICdoc2woMCwwJSw5Ni4wOCUpJywgaDogMCwgczogJzAlJywgbDogJzk2LjA4JScgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcbiAgICBjcmVhdGVQYW5lbFRlbXBsYXRlOiBmdW5jdGlvbiBjcmVhdGVQYW5lbFRlbXBsYXRlKCkge1xuICAgICAgICB2YXIgZGF0YUF0dHIgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHRydWU7XG5cbiAgICAgICAgdmFyIHBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHBhbmVsLmNsYXNzTmFtZSA9ICdqc1BhbmVsJztcbiAgICAgICAgaWYgKGRhdGFBdHRyKSB7XG4gICAgICAgICAgICBbJ2Nsb3NlJywgJ21heGltaXplJywgJ25vcm1hbGl6ZScsICdtaW5pbWl6ZScsICdzbWFsbGlmeScsICdzbWFsbGlmeXJldiddLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBwYW5lbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYnRuJyArIGl0ZW0sICdlbmFibGVkJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBwYW5lbC5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImpzUGFuZWwtaGRyXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1oZWFkZXJiYXJcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1oZWFkZXJsb2dvXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtdGl0bGViYXJcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwianNQYW5lbC10aXRsZVwiPjwvaDM+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtY29udHJvbGJhclwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1idG4ganNQYW5lbC1idG4tc21hbGxpZnlcIj48c3BhbiBjbGFzcz1cImpzZ2x5cGgganNnbHlwaC1jaGV2cm9uLXVwXCI+PC9zcGFuPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1idG4ganNQYW5lbC1idG4tc21hbGxpZnlyZXZcIj48c3BhbiBjbGFzcz1cImpzZ2x5cGgganNnbHlwaC1jaGV2cm9uLWRvd25cIj48L3NwYW4+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLWJ0biBqc1BhbmVsLWJ0bi1taW5pbWl6ZVwiPjxzcGFuIGNsYXNzPVwianNnbHlwaCBqc2dseXBoLW1pbmltaXplXCI+PC9zcGFuPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1idG4ganNQYW5lbC1idG4tbm9ybWFsaXplXCI+PHNwYW4gY2xhc3M9XCJqc2dseXBoIGpzZ2x5cGgtbm9ybWFsaXplXCI+PC9zcGFuPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1idG4ganNQYW5lbC1idG4tbWF4aW1pemVcIj48c3BhbiBjbGFzcz1cImpzZ2x5cGgganNnbHlwaC1tYXhpbWl6ZVwiPjwvc3Bhbj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLWNsb3NlXCI+PHNwYW4gY2xhc3M9XCJqc2dseXBoIGpzZ2x5cGgtY2xvc2VcIj48L3NwYW4+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLWhkci10b29sYmFyXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1jb250ZW50IGpzUGFuZWwtY29udGVudC1ub2Zvb3RlclwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1taW5pbWl6ZWQtYm94XCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLWZ0clwiPjwvZGl2Pic7XG4gICAgICAgIHJldHVybiBwYW5lbDtcbiAgICB9LFxuICAgIGNyZWF0ZU1pbmltaXplZFRlbXBsYXRlOiBmdW5jdGlvbiBjcmVhdGVNaW5pbWl6ZWRUZW1wbGF0ZSgpIHtcbiAgICAgICAgdmFyIHBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHBhbmVsLmNsYXNzTmFtZSA9ICdqc1BhbmVsLXJlcGxhY2VtZW50JztcbiAgICAgICAgcGFuZWwuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJqc1BhbmVsLWhkclwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtaGVhZGVyYmFyXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtaGVhZGVybG9nb1wiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLXRpdGxlYmFyXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cImpzUGFuZWwtdGl0bGVcIj48L2gzPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLWNvbnRyb2xiYXJcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLW5vcm1hbGl6ZVwiPjxzcGFuIGNsYXNzPVwianNnbHlwaCBqc2dseXBoLW5vcm1hbGl6ZVwiPjwvc3Bhbj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLW1heGltaXplXCI+PHNwYW4gY2xhc3M9XCJqc2dseXBoIGpzZ2x5cGgtbWF4aW1pemVcIj48L3NwYW4+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLWJ0biBqc1BhbmVsLWJ0bi1jbG9zZVwiPjxzcGFuIGNsYXNzPVwianNnbHlwaCBqc2dseXBoLWNsb3NlXCI+PC9zcGFuPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pic7XG4gICAgICAgIHJldHVybiBwYW5lbDtcbiAgICB9LFxuICAgIGNyZWF0ZVNuYXBBcmVhOiBmdW5jdGlvbiBjcmVhdGVTbmFwQXJlYShwYW5lbCwgcG9zLCBzbmFwc2Vucykge1xuICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgICAgICAgIHBhcmVudCA9IHBhbmVsLnBhcmVudE5vZGU7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9ICdqc1BhbmVsLXNuYXAtYXJlYSBqc1BhbmVsLXNuYXAtYXJlYS0nICsgcG9zO1xuICAgICAgICBpZiAocG9zID09PSAnbHQnIHx8IHBvcyA9PT0gJ3J0JyB8fCBwb3MgPT09ICdyYicgfHwgcG9zID09PSAnbGInKSB7XG4gICAgICAgICAgICBlbC5zdHlsZS53aWR0aCA9IHNuYXBzZW5zICsgJ3B4JztcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IHNuYXBzZW5zICsgJ3B4JztcbiAgICAgICAgfSBlbHNlIGlmIChwb3MgPT09ICdjdCcgfHwgcG9zID09PSAnY2InKSB7XG4gICAgICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBzbmFwc2VucyArICdweCc7XG4gICAgICAgIH0gZWxzZSBpZiAocG9zID09PSAnbGMnIHx8IHBvcyA9PT0gJ3JjJykge1xuICAgICAgICAgICAgZWwuc3R5bGUud2lkdGggPSBzbmFwc2VucyArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmVudCAhPT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgZWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtc25hcC1hcmVhLmpzUGFuZWwtc25hcC1hcmVhLScgKyBwb3MpKSB7XG4gICAgICAgICAgICBwYW5lbC5wYXJlbnROb2RlLmFwcGVuZENoaWxkKGVsKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZGFya2VuOiBmdW5jdGlvbiBkYXJrZW4odmFsLCBhbW91bnQpIHtcbiAgICAgICAgLy8gYW1vdW50IGlzIHZhbHVlIGJldHdlZW4gMCBhbmQgMVxuICAgICAgICB2YXIgaHNsID0gdGhpcy5jb2xvcih2YWwpLmhzbCxcbiAgICAgICAgICAgIGwgPSBwYXJzZUZsb2F0KGhzbC5sKSxcbiAgICAgICAgICAgIGxuZXcgPSBsIC0gbCAqIGFtb3VudCArICclJztcbiAgICAgICAgcmV0dXJuICdoc2woJyArIGhzbC5oICsgJywnICsgaHNsLnMgKyAnLCcgKyBsbmV3ICsgJyknO1xuICAgIH0sXG4gICAgZHJhZ2l0OiBmdW5jdGlvbiBkcmFnaXQoZWxtdCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICAgICAgdmFyIGRyYWdzdGFydGVkID0gdm9pZCAwLFxuICAgICAgICAgICAgb3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmYXVsdHMuZHJhZ2l0LCBvcHRpb25zKSxcbiAgICAgICAgICAgIGRyYWdFbG10ID0gdm9pZCAwLFxuICAgICAgICAgICAgY29udGFpbm1lbnQgPSB2b2lkIDAsXG4gICAgICAgICAgICBmcmFtZXMgPSBbXTtcbiAgICAgICAgdmFyIGRyYWdzdGFydCA9IG5ldyBDdXN0b21FdmVudCgnZHJhZ3N0YXJ0JywgeyBkZXRhaWw6IGVsbXQuaWQgfSksXG4gICAgICAgICAgICBkcmFnID0gbmV3IEN1c3RvbUV2ZW50KCdkcmFnJywgeyBkZXRhaWw6IGVsbXQuaWQgfSksXG4gICAgICAgICAgICBkcmFnc3RvcCA9IG5ldyBDdXN0b21FdmVudCgnZHJhZ3N0b3AnLCB7IGRldGFpbDogZWxtdC5pZCB9KTtcblxuICAgICAgICAvLyBub3JtYWxpemUgZ3JpZCBjb25maWdcbiAgICAgICAgaWYgKG9wdHMuZ3JpZCAmJiBBcnJheS5pc0FycmF5KG9wdHMuZ3JpZCkpIHtcbiAgICAgICAgICAgIGlmIChvcHRzLmdyaWQubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5ncmlkWzFdID0gb3B0cy5ncmlkWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gbm9ybWFsaXplIGNvbnRhaW5tZW50IGNvbmZpZ1xuICAgICAgICBjb250YWlubWVudCA9IHRoaXMucE9jb250YWlubWVudChvcHRzLmNvbnRhaW5tZW50KTtcblxuICAgICAgICAvLyBhdHRhY2ggaGFuZGxlciB0byBlYWNoIGRyYWcgaGFuZGxlXG4gICAgICAgIGVsbXQucXVlcnlTZWxlY3RvckFsbChvcHRzLmhhbmRsZXMpLmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZSkge1xuXG4gICAgICAgICAgICBoYW5kbGUuc3R5bGUudG91Y2hBY3Rpb24gPSAnbm9uZSc7XG4gICAgICAgICAgICBoYW5kbGUuc3R5bGUuY3Vyc29yID0gb3B0cy5jdXJzb3I7XG4gICAgICAgICAgICBoYW5kbGUuY2xhc3NMaXN0LmFkZCgnanNQYW5lbC1kcmFnaXQtaGFuZGxlJyk7XG5cbiAgICAgICAgICAgIGpzUGFuZWwucG9pbnRlcmRvd24uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGhhbmRsZS5hZGRFdmVudExpc3RlbmVyKGl0ZW0sIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHByZXZlbnQgYm9keSBzY3JvbGwgb24gZHJhZyBpbml0XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBmb290ZXIgZWxtdHMgd2l0aCB0aGUgY2xhc3MgXCJqc1BhbmVsLWZ0ci1idG5cIiBkb24ndCBkcmFnIGEgcGFuZWxcbiAgICAgICAgICAgICAgICAgICAgLy8gZG8gbm90IGNvbXBhcmUgZS50YXJnZXQgd2l0aCBlLmN1cnJlbnRUYXJnZXQgYmVjYXVzZSB0aGVyZSBtaWdodCBiZSBmb290ZXIgZWxtdHMgc3VwcG9zZWQgdG8gZHJhZyB0aGUgcGFuZWxcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsb3Nlc3QoJy5qc1BhbmVsLWZ0ci1idG4nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZWxtdC5jb250cm9sYmFyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lmcmFtZScpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZnJhbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWVzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGFydFN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsbXQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRMZWZ0ID0gcGFyc2VGbG9hdChzdGFydFN0eWxlcy5sZWZ0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0VG9wID0gcGFyc2VGbG9hdChzdGFydFN0eWxlcy50b3ApLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHN4ID0gZS50b3VjaGVzID8gZS50b3VjaGVzWzBdLmNsaWVudFggOiBlLmNsaWVudFgsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2ludGVyIHggb24gbW91c2Vkb3duIChkb24ndCB1c2UgcGFnZVgsIGRvZXNuJ3Qgd29yayBvbiBGRiBmb3IgQW5kcm9pZClcbiAgICAgICAgICAgICAgICAgICAgcHN5ID0gZS50b3VjaGVzID8gZS50b3VjaGVzWzBdLmNsaWVudFkgOiBlLmNsaWVudFksXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2ludGVyIHkgb24gbW91c2Vkb3duIChkb24ndCB1c2UgcGFnZVksIGRvZXNuJ3Qgd29yayBvbiBGRiBmb3IgQW5kcm9pZClcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50ID0gZWxtdC5wYXJlbnROb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50UmVjdCA9IHBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudFN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHBhcmVudCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGFydExlZnRDb3JyZWN0aW9uID0gMDtcblxuICAgICAgICAgICAgICAgICAgICAvLyBmdW5jdGlvbiBhY3R1YWxseSBkcmFnaW5nIHRoZSBlbG10XG4gICAgICAgICAgICAgICAgICAgIGRyYWdFbG10ID0gZnVuY3Rpb24gZHJhZ0VsbXQoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRyYWdzdGFydGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChkcmFnc3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc3R5bGUub3BhY2l0eSA9IG9wdHMub3BhY2l0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBjb25maWd1cmVkIHJlc3RvcmUgcGFuZWwgc2l6ZSB0byB2YWx1ZXMgYmVmb3JlIHNuYXAgYW5kIHJlcG9zaXRpb24gcmVhc29uYWJsZSBiZWZvcmUgZHJhZyBhY3R1YWxseSBzdGFydHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxtdC5zbmFwcGVkICYmIG9wdHMuc25hcC5yZXNpemVUb1ByZVNuYXAgJiYgZWxtdC5jdXJyZW50RGF0YS5iZWZvcmVTbmFwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQucmVzaXplKGVsbXQuY3VycmVudERhdGEuYmVmb3JlU25hcC53aWR0aCArICcgJyArIGVsbXQuY3VycmVudERhdGEuYmVmb3JlU25hcC5oZWlnaHQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnRlcm1lZGlhdGVTdHlsZXMgPSBlbG10LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsdGEgPSBwc3ggLSAoaW50ZXJtZWRpYXRlU3R5bGVzLmxlZnQgKyBpbnRlcm1lZGlhdGVTdHlsZXMud2lkdGgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd0hhbGYgPSBpbnRlcm1lZGlhdGVTdHlsZXMud2lkdGggLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVsdGEgPiAtd0hhbGYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0TGVmdENvcnJlY3Rpb24gPSBkZWx0YSArIHdIYWxmO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRyYWdzdGFydCBjYWxsYmFja1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0cy5zdGFydCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLnN0YXJ0LmNhbGwoZWxtdCwgZWxtdCwgeyBsZWZ0OiBzdGFydExlZnQsIHRvcDogc3RhcnRUb3AgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzUGFuZWwuZnJvbnQoZWxtdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zbmFwcGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBkcmFnc3RhcnRlZCA9IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmRpc2FibGVPbk1heGltaXplZCAmJiBlbG10LnN0YXR1cyA9PT0gJ21heGltaXplZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbG10TCA9IHZvaWQgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10TDIgPSB2b2lkIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdFQgPSB2b2lkIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdFQyID0gdm9pZCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXRSID0gdm9pZCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXRSMiA9IHZvaWQgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10QiA9IHZvaWQgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10QjIgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG14ID0gZS50b3VjaGVzID8gZS50b3VjaGVzWzBdLmNsaWVudFggOiBlLmNsaWVudFgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY3VycmVudCBwb2ludGVyIHggd2hpbGUgcG9pbnRlciBtb3ZlcyAoZG9uJ3QgdXNlIHBhZ2VYLCBkb2Vzbid0IHdvcmsgb24gRkYgZm9yIEFuZHJvaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICBwbXkgPSBlLnRvdWNoZXMgPyBlLnRvdWNoZXNbMF0uY2xpZW50WSA6IGUuY2xpZW50WSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjdXJyZW50IHBvaW50ZXIgeSB3aGlsZSBwb2ludGVyIG1vdmVzIChkb24ndCB1c2UgcGFnZVksIGRvZXNuJ3Qgd29yayBvbiBGRiBmb3IgQW5kcm9pZClcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbG10KTsgLy8gZ2V0IGN1cnJlbnQgc3R5bGVzIHdoaWxlIGRyYWdpbmdcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuc25hcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNuYXAudHJpZ2dlciA9PT0gJ3BhbmVsJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10TCA9IHBhcnNlRmxvYXQoZHJhZ1N0eWxlcy5sZWZ0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdEwyID0gTWF0aC5wb3coZWxtdEwsIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10VCA9IHBhcnNlRmxvYXQoZHJhZ1N0eWxlcy50b3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10VDIgPSBNYXRoLnBvdyhlbG10VCwgMik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXRSID0gcGFyc2VGbG9hdChkcmFnU3R5bGVzLnJpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdFIyID0gTWF0aC5wb3coZWxtdFIsIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10QiA9IHBhcnNlRmxvYXQoZHJhZ1N0eWxlcy5ib3R0b20pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10QjIgPSBNYXRoLnBvdyhlbG10QiwgMik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRzLnNuYXAudHJpZ2dlciA9PT0gJ3BvaW50ZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXRMID0gcG14O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10TDIgPSBNYXRoLnBvdyhwbXgsIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10VCA9IHBteTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdFQyID0gTWF0aC5wb3coZWxtdFQsIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10UiA9IHdpbmRvdy5pbm5lcldpZHRoIC0gcG14O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10UjIgPSBNYXRoLnBvdyhlbG10UiwgMik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXRCID0gd2luZG93LmlubmVySGVpZ2h0IC0gcG15O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10QjIgPSBNYXRoLnBvdyhlbG10QiwgMik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGVmdHRvcFZlY3RvckRyYWcgPSBNYXRoLnNxcnQoZWxtdEwyICsgZWxtdFQyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0Ym90dG9tVmVjdG9yRHJhZyA9IE1hdGguc3FydChlbG10TDIgKyBlbG10QjIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0dG9wVmVjdG9yRHJhZyA9IE1hdGguc3FydChlbG10UjIgKyBlbG10VDIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0Ym90dG9tVmVjdG9yRHJhZyA9IE1hdGguc3FydChlbG10UjIgKyBlbG10QjIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvcml6b250YWxEZWx0YURyYWcgPSBNYXRoLmFicyhlbG10TCAtIGVsbXRSKSAvIDIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVydGljYWxEZWx0YURyYWcgPSBNYXRoLmFicyhlbG10VCAtIGVsbXRCKSAvIDIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdFZlY3RvckRyYWcgPSBNYXRoLnNxcnQoZWxtdEwyICsgTWF0aC5wb3codmVydGljYWxEZWx0YURyYWcsIDIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3BWZWN0b3JEcmFnID0gTWF0aC5zcXJ0KGVsbXRUMiArIE1hdGgucG93KGhvcml6b250YWxEZWx0YURyYWcsIDIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodFZlY3RvckRyYWcgPSBNYXRoLnNxcnQoZWxtdFIyICsgTWF0aC5wb3codmVydGljYWxEZWx0YURyYWcsIDIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b21WZWN0b3JEcmFnID0gTWF0aC5zcXJ0KGVsbXRCMiArIE1hdGgucG93KGhvcml6b250YWxEZWx0YURyYWcsIDIpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJldmVudCBzZWxjdGlvbnMgd2hpbGUgZHJhZ2luZ1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0cmlnZ2VyIGRyYWcgcGVybWFuZW50bHkgd2hpbGUgZHJhZ2luZ1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChkcmFnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbW92ZSBlbG10XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdHMuYXhpcyB8fCBvcHRzLmF4aXMgPT09ICd4Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc3R5bGUubGVmdCA9IHN0YXJ0TGVmdCArIChwbXggLSBwc3gpICsgc3RhcnRMZWZ0Q29ycmVjdGlvbiArICdweCc7IC8vIHNldCBuZXcgY3NzIGxlZnQgb2YgZWxtdCBkZXBlbmRpbmcgb24gb3B0cy5heGlzXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdHMuYXhpcyB8fCBvcHRzLmF4aXMgPT09ICd5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc3R5bGUudG9wID0gc3RhcnRUb3AgKyAocG15IC0gcHN5KSArICdweCc7IC8vIHNldCBuZXcgY3NzIHRvcCBvZiBlbG10IGRlcGVuZGluZyBvbiBvcHRzLmF4aXNcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXBwbHkgZ3JpZCBvcHRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmdyaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3ggPSBwYXJzZUZsb2F0KGRyYWdTdHlsZXMubGVmdCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN5ID0gcGFyc2VGbG9hdChkcmFnU3R5bGVzLnRvcCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZFggPSBjeCAlIG9wdHMuZ3JpZFswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kWSA9IGN5ICUgb3B0cy5ncmlkWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb2RYIDwgb3B0cy5ncmlkWzBdIC8gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLmxlZnQgPSBjeCAtIG1vZFggKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc3R5bGUubGVmdCA9IGN4ICsgKG9wdHMuZ3JpZFswXSAtIG1vZFgpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vZFkgPCBvcHRzLmdyaWRbMV0gLyAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc3R5bGUudG9wID0gY3kgLSBtb2RZICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLnRvcCA9IGN5ICsgKG9wdHMuZ3JpZFsxXSAtIG1vZFkpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFwcGx5IGNvbnRhaW5tZW50IG9wdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuY29udGFpbm1lbnQgfHwgb3B0cy5jb250YWlubWVudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXhMZWZ0ID0gdm9pZCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhUb3AgPSB2b2lkIDA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjYWxjIG1heExlZnQgYW5kIG1heFRvcCAobWluTGVmdCBhbmQgTWluVG9wIGlzIGVxdWFsIHRvIGNvbnRhaW5tZW50IHNldHRpbmcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsbXQub3B0aW9ucy5jb250YWluZXIgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4TGVmdCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gcGFyc2VGbG9hdChkcmFnU3R5bGVzLndpZHRoKSAtIGNvbnRhaW5tZW50WzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhUb3AgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSBwYXJzZUZsb2F0KGRyYWdTdHlsZXMuaGVpZ2h0KSAtIGNvbnRhaW5tZW50WzJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB4Q29yciA9IHBhcnNlRmxvYXQocGFyZW50U3R5bGVzLmJvcmRlckxlZnRXaWR0aCkgKyBwYXJzZUZsb2F0KHBhcmVudFN0eWxlcy5ib3JkZXJSaWdodFdpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHlDb3JyID0gcGFyc2VGbG9hdChwYXJlbnRTdHlsZXMuYm9yZGVyVG9wV2lkdGgpICsgcGFyc2VGbG9hdChwYXJlbnRTdHlsZXMuYm9yZGVyQm90dG9tV2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhMZWZ0ID0gcGFyZW50UmVjdC53aWR0aCAtIHBhcnNlRmxvYXQoZHJhZ1N0eWxlcy53aWR0aCkgLSBjb250YWlubWVudFsxXSAtIHhDb3JyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhUb3AgPSBwYXJlbnRSZWN0LmhlaWdodCAtIHBhcnNlRmxvYXQoZHJhZ1N0eWxlcy5oZWlnaHQpIC0gY29udGFpbm1lbnRbMl0gLSB5Q29ycjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VGbG9hdChlbG10LnN0eWxlLmxlZnQpIDw9IGNvbnRhaW5tZW50WzNdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc3R5bGUubGVmdCA9IGNvbnRhaW5tZW50WzNdICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlRmxvYXQoZWxtdC5zdHlsZS50b3ApIDw9IGNvbnRhaW5tZW50WzBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc3R5bGUudG9wID0gY29udGFpbm1lbnRbMF0gKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VGbG9hdChlbG10LnN0eWxlLmxlZnQpID49IG1heExlZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zdHlsZS5sZWZ0ID0gbWF4TGVmdCArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUZsb2F0KGVsbXQuc3R5bGUudG9wKSA+PSBtYXhUb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zdHlsZS50b3AgPSBtYXhUb3AgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FsbGJhY2sgd2hpbGUgZHJhZ2dpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0cy5kcmFnID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5kcmFnLmNhbGwoZWxtdCwgZWxtdCwgeyBsZWZ0OiBlbG10TCwgdG9wOiBlbG10VCwgcmlnaHQ6IGVsbXRSLCBib3R0b206IGVsbXRCIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhcHBseSBzbmFwIG9wdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNuYXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc25hcFNlbnMgPSBvcHRzLnNuYXAuc2Vuc2l0aXZpdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcFNlbnNBcmVhTGVuZ3RoID0gcGFyZW50ID09PSBkb2N1bWVudC5ib2R5ID8gd2luZG93LmlubmVyV2lkdGggLyA4IDogcGFyZW50UmVjdC53aWR0aCAvIDgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZGVTZW5zQXJlYUxlbmd0aCA9IHBhcmVudCA9PT0gZG9jdW1lbnQuYm9keSA/IHdpbmRvdy5pbm5lckhlaWdodCAvIDggOiBwYXJlbnRSZWN0LmhlaWdodCAvIDg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zbmFwcGFibGVUbyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzUGFuZWwucmVtb3ZlU25hcEFyZWFzKGVsbXQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxlZnR0b3BWZWN0b3JEcmFnIDwgc25hcFNlbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zbmFwcGFibGVUbyA9ICdsZWZ0LXRvcCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNuYXAuc25hcExlZnRUb3AgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc1BhbmVsLmNyZWF0ZVNuYXBBcmVhKGVsbXQsICdsdCcsIHNuYXBTZW5zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobGVmdGJvdHRvbVZlY3RvckRyYWcgPCBzbmFwU2Vucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnNuYXBwYWJsZVRvID0gJ2xlZnQtYm90dG9tJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuc25hcC5zbmFwTGVmdEJvdHRvbSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzUGFuZWwuY3JlYXRlU25hcEFyZWEoZWxtdCwgJ2xiJywgc25hcFNlbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyaWdodHRvcFZlY3RvckRyYWcgPCBzbmFwU2Vucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnNuYXBwYWJsZVRvID0gJ3JpZ2h0LXRvcCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNuYXAuc25hcFJpZ2h0VG9wICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganNQYW5lbC5jcmVhdGVTbmFwQXJlYShlbG10LCAncnQnLCBzbmFwU2Vucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJpZ2h0Ym90dG9tVmVjdG9yRHJhZyA8IHNuYXBTZW5zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc25hcHBhYmxlVG8gPSAncmlnaHQtYm90dG9tJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuc25hcC5zbmFwUmlnaHRCb3R0b20gIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc1BhbmVsLmNyZWF0ZVNuYXBBcmVhKGVsbXQsICdyYicsIHNuYXBTZW5zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxtdFQgPCBzbmFwU2VucyAmJiB0b3BWZWN0b3JEcmFnIDwgdG9wU2Vuc0FyZWFMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zbmFwcGFibGVUbyA9ICdjZW50ZXItdG9wJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuc25hcC5zbmFwQ2VudGVyVG9wICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganNQYW5lbC5jcmVhdGVTbmFwQXJlYShlbG10LCAnY3QnLCBzbmFwU2Vucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVsbXRMIDwgc25hcFNlbnMgJiYgbGVmdFZlY3RvckRyYWcgPCBzaWRlU2Vuc0FyZWFMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zbmFwcGFibGVUbyA9ICdsZWZ0LWNlbnRlcic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNuYXAuc25hcExlZnRDZW50ZXIgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc1BhbmVsLmNyZWF0ZVNuYXBBcmVhKGVsbXQsICdsYycsIHNuYXBTZW5zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxtdFIgPCBzbmFwU2VucyAmJiByaWdodFZlY3RvckRyYWcgPCBzaWRlU2Vuc0FyZWFMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zbmFwcGFibGVUbyA9ICdyaWdodC1jZW50ZXInO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5zbmFwLnNuYXBSaWdodENlbnRlciAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzUGFuZWwuY3JlYXRlU25hcEFyZWEoZWxtdCwgJ3JjJywgc25hcFNlbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlbG10QiA8IHNuYXBTZW5zICYmIGJvdHRvbVZlY3RvckRyYWcgPCB0b3BTZW5zQXJlYUxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnNuYXBwYWJsZVRvID0gJ2NlbnRlci1ib3R0b20nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5zbmFwLnNuYXBDZW50ZXJCb3R0b20gIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc1BhbmVsLmNyZWF0ZVNuYXBBcmVhKGVsbXQsICdjYicsIHNuYXBTZW5zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBqc1BhbmVsLnBvaW50ZXJtb3ZlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoaXRlbSwgZHJhZ0VsbXQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBqc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihpdGVtLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAganNQYW5lbC5wb2ludGVybW92ZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGl0ZW0sIGRyYWdFbG10KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdpbmhlcml0JztcbiAgICAgICAgICAgICAgICAgICAganNQYW5lbC5yZW1vdmVTbmFwQXJlYXMoZWxtdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRyYWdzdGFydGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGRyYWdzdG9wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcmFnc3RhcnRlZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc2F2ZUN1cnJlbnRQb3NpdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5zbmFwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsbXQuc25hcHBhYmxlVG8gPT09ICdsZWZ0LXRvcCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganNQYW5lbC5zbmFwUGFuZWwoZWxtdCwgb3B0cy5zbmFwLnNuYXBMZWZ0VG9wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVsbXQuc25hcHBhYmxlVG8gPT09ICdjZW50ZXItdG9wJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc1BhbmVsLnNuYXBQYW5lbChlbG10LCBvcHRzLnNuYXAuc25hcENlbnRlclRvcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlbG10LnNuYXBwYWJsZVRvID09PSAncmlnaHQtdG9wJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc1BhbmVsLnNuYXBQYW5lbChlbG10LCBvcHRzLnNuYXAuc25hcFJpZ2h0VG9wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVsbXQuc25hcHBhYmxlVG8gPT09ICdyaWdodC1jZW50ZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzUGFuZWwuc25hcFBhbmVsKGVsbXQsIG9wdHMuc25hcC5zbmFwUmlnaHRDZW50ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxtdC5zbmFwcGFibGVUbyA9PT0gJ3JpZ2h0LWJvdHRvbScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganNQYW5lbC5zbmFwUGFuZWwoZWxtdCwgb3B0cy5zbmFwLnNuYXBSaWdodEJvdHRvbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlbG10LnNuYXBwYWJsZVRvID09PSAnY2VudGVyLWJvdHRvbScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganNQYW5lbC5zbmFwUGFuZWwoZWxtdCwgb3B0cy5zbmFwLnNuYXBDZW50ZXJCb3R0b20pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxtdC5zbmFwcGFibGVUbyA9PT0gJ2xlZnQtYm90dG9tJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc1BhbmVsLnNuYXBQYW5lbChlbG10LCBvcHRzLnNuYXAuc25hcExlZnRCb3R0b20pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxtdC5zbmFwcGFibGVUbyA9PT0gJ2xlZnQtY2VudGVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc1BhbmVsLnNuYXBQYW5lbChlbG10LCBvcHRzLnNuYXAuc25hcExlZnRDZW50ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNuYXAuY2FsbGJhY2sgJiYgZWxtdC5zbmFwcGFibGVUbyAmJiB0eXBlb2Ygb3B0cy5zbmFwLmNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuc25hcC5jYWxsYmFjay5jYWxsKGVsbXQsIGVsbXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbG10LnNuYXBwYWJsZVRvICYmIG9wdHMuc25hcC5yZXBvc2l0aW9uT25TbmFwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQucmVwb3NpdGlvbk9uU25hcChlbG10LnNuYXBwYWJsZVRvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0cy5zdG9wID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5zdG9wLmNhbGwoZWxtdCwgZWxtdCwgeyBsZWZ0OiBwYXJzZUZsb2F0KGVsbXQuc3R5bGUubGVmdCksIHRvcDogcGFyc2VGbG9hdChlbG10LnN0eWxlLnRvcCkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBlbG10LmNvbnRyb2xiYXIuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdpbmhlcml0JztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZyYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2luaGVyaXQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBkcmFnaXQgaXMgaW5pdGlhbGl6ZWQgLSBub3cgZGlzYWJsZSBpZiBzZXRcbiAgICAgICAgICAgIGlmIChvcHRzLmRpc2FibGUpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGUuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGVsbXQ7XG4gICAgfSxcbiAgICBlbXB0eU5vZGU6IGZ1bmN0aW9uIGVtcHR5Tm9kZShub2RlKSB7XG4gICAgICAgIHdoaWxlIChub2RlLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9LFxuICAgIGV4dGVuZDogZnVuY3Rpb24gZXh0ZW5kKG9iaikge1xuICAgICAgICAvLyBvYmogbmVlZHMgdG8gYmUgYSBwbGFpbiBvYmplY3RcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICAgICAgZm9yICh2YXIgZXh0IGluIG9iaikge1xuICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoZXh0KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4dGVuc2lvbnNbZXh0XSA9IG9ialtleHRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgZmV0Y2g6IGZ1bmN0aW9uIChfZmV0Y2gpIHtcbiAgICAgICAgZnVuY3Rpb24gZmV0Y2goX3gzKSB7XG4gICAgICAgICAgICByZXR1cm4gX2ZldGNoLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cblxuICAgICAgICBmZXRjaC50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfZmV0Y2gudG9TdHJpbmcoKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gZmV0Y2g7XG4gICAgfShmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHZhciBjb25mID0gb2JqLm9wdGlvbnMuY29udGVudEZldGNoO1xuICAgICAgICB2YXIgY29uZkRlZmF1bHRzID0ge1xuICAgICAgICAgICAgYm9keU1ldGhvZDogJ3RleHQnLFxuICAgICAgICAgICAgZXZhbHNjcmlwdHRhZ3M6IHRydWUsXG4gICAgICAgICAgICBhdXRvcmVzaXplOiB0cnVlLFxuICAgICAgICAgICAgYXV0b3JlcG9zaXRpb246IHRydWUsXG4gICAgICAgICAgICBkb25lOiBmdW5jdGlvbiBkb25lKG9iaiwgcmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBvYmouY29udGVudC5pbm5lckhUTUwgPSByZXNwb25zZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbmYgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb25mID0gT2JqZWN0LmFzc2lnbih7IHJlc291cmNlOiBvYmoub3B0aW9ucy5jb250ZW50RmV0Y2ggfSwgY29uZkRlZmF1bHRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbmYgPSBPYmplY3QuYXNzaWduKGNvbmZEZWZhdWx0cywgY29uZik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZldGNoSW5pdCA9IGNvbmYuZmV0Y2hJbml0IHx8IHt9O1xuXG4gICAgICAgIGlmIChjb25mLmJlZm9yZVNlbmQpIHtcbiAgICAgICAgICAgIGNvbmYuYmVmb3JlU2VuZC5jYWxsKG9iaiwgb2JqKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZldGNoKGNvbmYucmVzb3VyY2UsIGZldGNoSW5pdCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlW2NvbmYuYm9keU1ldGhvZF0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayByZXNwb25zZSB3YXMgbm90IG9rLicpO1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgICAgICBjb25mLmRvbmUuY2FsbChvYmosIG9iaiwgcmVzcG9uc2UpO1xuXG4gICAgICAgICAgICAvLyBleHRyYWN0IGFuZCBldmFsIGNvbnRlbnQgb2Ygc2NyaXB0IHRhZ3MgaWYgXCJldmFsc2NyaXB0dGFnc1wiXG4gICAgICAgICAgICBpZiAoY29uZi5ldmFsc2NyaXB0dGFncykge1xuICAgICAgICAgICAgICAgIC8vIGdldCBhbGwgc2NyaXB0IHRhZ3Mgd2l0aGluIHJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgICAgIHZhciBzY3JpcHR0YWdzID0gcmVzcG9uc2UubWF0Y2goLzxzY3JpcHRcXGJbXj5dKj4oW1xcc1xcU10qPyk8XFwvc2NyaXB0Pi9naSk7XG4gICAgICAgICAgICAgICAgaWYgKHNjcmlwdHRhZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NyaXB0dGFncy5mb3JFYWNoKGZ1bmN0aW9uICh0YWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB0YWdzIGZyb20gc3RyaW5nIGFuZCB0cmltIGl0XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIganMgPSB0YWcucmVwbGFjZSgvPHNjcmlwdFxcYltePl0qPi9pLCAnJykucmVwbGFjZSgvPFxcL3NjcmlwdD4vaSwgJycpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4ZWN1dGUgamF2YXNjcmlwdFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZhbChqcyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gcmVzaXplIGFuZCByZXBvc2l0aW9uIHBhbmVsIGlmIGVpdGhlciB3aWR0aCBvciBoZWlnaHQgaXMgc2V0IHRvICdhdXRvJ1xuICAgICAgICAgICAgdmFyIG9Db250ZW50U2l6ZSA9IG9iai5vcHRpb25zLmNvbnRlbnRTaXplO1xuICAgICAgICAgICAgaWYgKGNvbmYuYXV0b3Jlc2l6ZSB8fCBjb25mLmF1dG9yZXBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvQ29udGVudFNpemUgPT09ICdzdHJpbmcnICYmIG9Db250ZW50U2l6ZS5tYXRjaCgvYXV0by9pKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFydHMgPSBvQ29udGVudFNpemUuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNpemVzID0gT2JqZWN0LmFzc2lnbih7fSwgeyB3aWR0aDogcGFydHNbMF0sIGhlaWdodDogcGFydHNbMV0gfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25mLmF1dG9yZXNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5yZXNpemUoc2l6ZXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghb2JqLmNsYXNzTGlzdC5jb250YWlucygnanNQYW5lbC1jb250ZXh0bWVudScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29uZi5hdXRvcmVwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5yZXBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCh0eXBlb2Ygb0NvbnRlbnRTaXplID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihvQ29udGVudFNpemUpKSA9PT0gJ29iamVjdCcgJiYgKG9Db250ZW50U2l6ZS53aWR0aCA9PT0gJ2F1dG8nIHx8IG9Db250ZW50U2l6ZS5oZWlnaHQgPT09ICdhdXRvJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9zaXplczIgPSBPYmplY3QuYXNzaWduKHt9LCBvQ29udGVudFNpemUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZi5hdXRvcmVzaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoucmVzaXplKF9zaXplczIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghb2JqLmNsYXNzTGlzdC5jb250YWlucygnanNQYW5lbC1jb250ZXh0bWVudScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29uZi5hdXRvcmVwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5yZXBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignVGhlcmUgaGFzIGJlZW4gYSBwcm9ibGVtIHdpdGggeW91ciBmZXRjaCBvcGVyYXRpb246ICcgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfSksXG4gICAgZnJvbnQ6IGZ1bmN0aW9uIGZyb250KG9iaikge1xuICAgICAgICBpZiAob2JqLnN0YXR1cyA9PT0gJ21pbmltaXplZCcpIHtcbiAgICAgICAgICAgIGlmIChvYmouc3RhdHVzQmVmb3JlID09PSAnbWF4aW1pemVkJykge1xuICAgICAgICAgICAgICAgIG9iai5tYXhpbWl6ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmoubm9ybWFsaXplKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgbmV3QXJyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzUGFuZWwtc3RhbmRhcmQnKSkubWFwKGZ1bmN0aW9uIChwYW5lbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYW5lbC5zdHlsZS56SW5kZXg7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChNYXRoLm1heC5hcHBseShNYXRoLCBfdG9Db25zdW1hYmxlQXJyYXkobmV3QXJyKSkgPiBvYmouc3R5bGUuekluZGV4KSB7XG4gICAgICAgICAgICAgICAgb2JqLnN0eWxlLnpJbmRleCA9IGpzUGFuZWwuemkubmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yZXNldFppKCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldFBhbmVsczogZnVuY3Rpb24gZ2V0UGFuZWxzKCkge1xuICAgICAgICB2YXIgY29uZGl0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwtc3RhbmRhcmQnKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzUGFuZWwnKSkuZmlsdGVyKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbmRpdGlvbi5jYWxsKHZhbHVlLCB2YWx1ZSk7XG4gICAgICAgIH0pLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBiLnN0eWxlLnpJbmRleCAtIGEuc3R5bGUuekluZGV4O1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGhzbFRvUmdiOiBmdW5jdGlvbiBoc2xUb1JnYihoLCBzLCBsKSB7XG4gICAgICAgIC8vIGgsIHMgYW5kIGwgbXVzdCBiZSB2YWx1ZXMgYmV0d2VlbiAwIGFuZCAxXG4gICAgICAgIHZhciByID0gdm9pZCAwLFxuICAgICAgICAgICAgZyA9IHZvaWQgMCxcbiAgICAgICAgICAgIGIgPSB2b2lkIDA7XG4gICAgICAgIGlmIChzID09PSAwKSB7XG4gICAgICAgICAgICByID0gZyA9IGIgPSBsOyAvLyBhY2hyb21hdGljXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgaHVlMnJnYiA9IGZ1bmN0aW9uIGh1ZTJyZ2IocCwgcSwgdCkge1xuICAgICAgICAgICAgICAgIGlmICh0IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0ICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0ID4gMSkge1xuICAgICAgICAgICAgICAgICAgICB0IC09IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0IDwgMSAvIDYpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHAgKyAocSAtIHApICogNiAqIHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0IDwgMSAvIDIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0IDwgMiAvIDMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHAgKyAocSAtIHApICogKDIgLyAzIC0gdCkgKiA2O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgcSA9IGwgPCAwLjUgPyBsICogKDEgKyBzKSA6IGwgKyBzIC0gbCAqIHMsXG4gICAgICAgICAgICAgICAgcCA9IDIgKiBsIC0gcTtcbiAgICAgICAgICAgIHIgPSBodWUycmdiKHAsIHEsIGggKyAxIC8gMyk7XG4gICAgICAgICAgICBnID0gaHVlMnJnYihwLCBxLCBoKTtcbiAgICAgICAgICAgIGIgPSBodWUycmdiKHAsIHEsIGggLSAxIC8gMyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtNYXRoLnJvdW5kKHIgKiAyNTUpLCBNYXRoLnJvdW5kKGcgKiAyNTUpLCBNYXRoLnJvdW5kKGIgKiAyNTUpXTtcbiAgICB9LFxuICAgIGxpZ2h0ZW46IGZ1bmN0aW9uIGxpZ2h0ZW4odmFsLCBhbW91bnQpIHtcbiAgICAgICAgLy8gYW1vdW50IGlzIHZhbHVlIGJldHdlZW4gMCBhbmQgMVxuICAgICAgICB2YXIgaHNsID0gdGhpcy5jb2xvcih2YWwpLmhzbCxcbiAgICAgICAgICAgIGwgPSBwYXJzZUZsb2F0KGhzbC5sKSxcbiAgICAgICAgICAgIGxuZXcgPSBsICsgKDEwMCAtIGwpICogYW1vdW50ICsgJyUnO1xuICAgICAgICByZXR1cm4gJ2hzbCgnICsgaHNsLmggKyAnLCcgKyBoc2wucyArICcsJyArIGxuZXcgKyAnKSc7XG4gICAgfSxcbiAgICBwZXJjZWl2ZWRCcmlnaHRuZXNzOiBmdW5jdGlvbiBwZXJjZWl2ZWRCcmlnaHRuZXNzKHZhbCkge1xuICAgICAgICB2YXIgcmdiID0gdGhpcy5jb2xvcih2YWwpLnJnYjtcbiAgICAgICAgLy8gcmV0dXJuIHZhbHVlIGlzIGluIHRoZSByYW5nZSAwIC0gMSBhbmQgaW5wdXQgcmdiIHZhbHVlcyBtdXN0IGFsc28gYmUgaW4gdGhlIHJhbmdlIDAgLSAxXG4gICAgICAgIC8vIGFsZ29yaXRobSBmcm9tOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9SZWMuXzIwMjBcbiAgICAgICAgcmV0dXJuIHJnYi5yIC8gMjU1ICogMC4yNjI3ICsgcmdiLmcgLyAyNTUgKiAwLjY3ODAgKyByZ2IuYiAvIDI1NSAqIDAuMDU5MztcbiAgICB9LFxuICAgIHBPY29udGFpbmVyOiBmdW5jdGlvbiBwT2NvbnRhaW5lcihjb250YWluZXIsIGNiKSB7XG4gICAgICAgIGlmIChjb250YWluZXIpIHtcbiAgICAgICAgICAgIHZhciBib3ggPSB2b2lkIDA7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lcik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRhaW5lci5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGJveCA9IGNvbnRhaW5lcjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udGFpbmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGJveCA9IGNvbnRhaW5lclswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChib3ggJiYgYm94Lm5vZGVUeXBlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJveDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlcnJvciA9IG5ldyBqc1BhbmVsRXJyb3IoJ1xcbk5PIE5FVyBQQU5FTCBDUkVBVEVEIVxcblRoZSBjb250YWluZXIgdG8gYXBwZW5kIHRoZSBwYW5lbCB0byBkb2VzIG5vdCBleGlzdCBvciBhIGNvbnRhaW5lciB3YXMgbm90IHNwZWNpZmllZCEnKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICBjYi5jYWxsKGUsIGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlcnJvcjtcbiAgICB9LFxuXG5cbiAgICAvLyBub3JtYWxpemVzIHZhbHVlcyBmb3Igb3B0aW9uLm1heGltaXplZE1hcmdpbiBhbmQgY29udGFpbm1lbnQgb2YgZHJhZ2l0L3Jlc2l6ZWl0XG4gICAgcE9jb250YWlubWVudDogZnVuY3Rpb24gcE9jb250YWlubWVudChhcmcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAvLyBhcmc6IDIwID0+IGFyZzogWzIwLCAyMCwgMjAsIDIwXVxuICAgICAgICAgICAgcmV0dXJuIFthcmcsIGFyZywgYXJnLCBhcmddO1xuICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuICAgICAgICAgICAgaWYgKGFyZy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAvLyBhcmc6IFsyMF0gPT4gYXJnOiBbMjAsIDIwLCAyMCwgMjBdXG4gICAgICAgICAgICAgICAgcmV0dXJuIFthcmdbMF0sIGFyZ1swXSwgYXJnWzBdLCBhcmdbMF1dO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhcmcubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAgICAgLy8gYXJnOiBbMjAsIDQwXSA9PiBhcmc6IFsyMCwgNDAsIDIwLCA0MF1cbiAgICAgICAgICAgICAgICByZXR1cm4gYXJnLmNvbmNhdChhcmcpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhcmcubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICAgICAgYXJnWzNdID0gYXJnWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcmc7IC8vIGFzc3VtZWQgdG8gYmUgYXJyYXkgd2l0aCA0IHZhbHVlc1xuICAgIH0sXG4gICAgcE9zaXplOiBmdW5jdGlvbiBwT3NpemUocGFuZWwsIHNpemUpIHtcbiAgICAgICAgdmFyIHZhbHVlcyA9IHNpemUgfHwgdGhpcy5kZWZhdWx0cy5jb250ZW50U2l6ZSxcbiAgICAgICAgICAgIHBhcmVudCA9IHBhbmVsLnBhcmVudE5vZGU7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWVzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdmFyIG51bXMgPSB2YWx1ZXMudHJpbSgpLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICB2YWx1ZXMgPSB7fTtcbiAgICAgICAgICAgIHZhbHVlcy53aWR0aCA9IG51bXNbMF07XG4gICAgICAgICAgICBudW1zLmxlbmd0aCA9PT0gMiA/IHZhbHVlcy5oZWlnaHQgPSBudW1zWzFdIDogdmFsdWVzLmhlaWdodCA9IG51bXNbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodmFsdWVzLndpZHRoICYmICF2YWx1ZXMuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzLmhlaWdodCA9IHZhbHVlcy53aWR0aDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWVzLmhlaWdodCAmJiAhdmFsdWVzLndpZHRoKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzLndpZHRoID0gdmFsdWVzLmhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChTdHJpbmcodmFsdWVzLndpZHRoKS5tYXRjaCgvXlswLTldKyQvZ2kpKSB7XG4gICAgICAgICAgICAvLyBpZiBudW1iZXIgb25seVxuICAgICAgICAgICAgdmFsdWVzLndpZHRoICs9ICdweCc7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlcy53aWR0aCA9PT0gJ3N0cmluZycgJiYgdmFsdWVzLndpZHRoLmVuZHNXaXRoKCclJykpIHtcbiAgICAgICAgICAgIGlmIChwYXJlbnQgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAqIChwYXJzZUZsb2F0KHZhbHVlcy53aWR0aCkgLyAxMDApICsgJ3B4JztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHBydFN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHBhcmVudCksXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlciA9IHBhcnNlRmxvYXQocHJ0U3R5bGVzLmJvcmRlckxlZnRXaWR0aCkgKyBwYXJzZUZsb2F0KHBydFN0eWxlcy5ib3JkZXJSaWdodFdpZHRoKTtcbiAgICAgICAgICAgICAgICB2YWx1ZXMud2lkdGggPSAocGFyc2VGbG9hdChwcnRTdHlsZXMud2lkdGgpIC0gYm9yZGVyKSAqIChwYXJzZUZsb2F0KHZhbHVlcy53aWR0aCkgLyAxMDApICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWVzLndpZHRoID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB2YWx1ZXMud2lkdGggPSB2YWx1ZXMud2lkdGgoKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWVzLndpZHRoID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHZhbHVlcy53aWR0aCArPSAncHgnO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWVzLndpZHRoID09PSAnc3RyaW5nJyAmJiB2YWx1ZXMud2lkdGgubWF0Y2goL15bMC05XSskL2dpKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlcy53aWR0aCArPSAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFN0cmluZyh2YWx1ZXMuaGVpZ2h0KS5tYXRjaCgvXlswLTldKyQvZ2kpKSB7XG4gICAgICAgICAgICAvLyBpZiBudW1iZXIgb25seVxuICAgICAgICAgICAgdmFsdWVzLmhlaWdodCArPSAncHgnO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZXMuaGVpZ2h0ID09PSAnc3RyaW5nJyAmJiB2YWx1ZXMuaGVpZ2h0LmVuZHNXaXRoKCclJykpIHtcbiAgICAgICAgICAgIGlmIChwYXJlbnQgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICogKHBhcnNlRmxvYXQodmFsdWVzLmhlaWdodCkgLyAxMDApICsgJ3B4JztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIF9wcnRTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShwYXJlbnQpLFxuICAgICAgICAgICAgICAgICAgICBfYm9yZGVyID0gcGFyc2VGbG9hdChfcHJ0U3R5bGVzLmJvcmRlclRvcFdpZHRoKSArIHBhcnNlRmxvYXQoX3BydFN0eWxlcy5ib3JkZXJCb3R0b21XaWR0aCk7XG4gICAgICAgICAgICAgICAgdmFsdWVzLmhlaWdodCA9IChwYXJzZUZsb2F0KF9wcnRTdHlsZXMuaGVpZ2h0KSAtIF9ib3JkZXIpICogKHBhcnNlRmxvYXQodmFsdWVzLmhlaWdodCkgLyAxMDApICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWVzLmhlaWdodCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdmFsdWVzLmhlaWdodCA9IHZhbHVlcy5oZWlnaHQoKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWVzLmhlaWdodCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXMuaGVpZ2h0ICs9ICdweCc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZXMuaGVpZ2h0ID09PSAnc3RyaW5nJyAmJiB2YWx1ZXMuaGVpZ2h0Lm1hdGNoKC9eWzAtOV0rJC9naSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXMuaGVpZ2h0ICs9ICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWVzOyAvLyByZXR1cm4gdmFsdWUgbXVzdCBiZSBvYmplY3Qge3dpZHRoOiB4eHgsIGhlaWdodDogeHh4fVxuICAgIH0sXG4gICAgcG9zaXRpb246IGZ1bmN0aW9uIHBvc2l0aW9uKGVsbXQsIF9wb3NpdGlvbikge1xuICAgICAgICB2YXIgZWxtdFRvUG9zaXRpb24gPSB2b2lkIDAsXG4gICAgICAgICAgICBwb3NTZXR0aW5ncyA9IHZvaWQgMCxcbiAgICAgICAgICAgIGVsbXRUb1Bvc2l0aW9uQWdhaW5zdCA9IHZvaWQgMCxcbiAgICAgICAgICAgIGNhbGN1bGF0ZWRQb3NpdGlvbiA9IHsgbGVmdDogMCwgdG9wOiAwIH0sXG4gICAgICAgICAgICBteVhjb3JyZWN0aW9uID0gMCxcbiAgICAgICAgICAgIG15WWNvcnJlY3Rpb24gPSAwLFxuICAgICAgICAgICAgYXRYY29ycmVjdGlvbiA9IDAsXG4gICAgICAgICAgICBhdFljb3JyZWN0aW9uID0gMDtcblxuICAgICAgICB2YXIgZGVmYXVsdHMgPSB7IG15OiAnY2VudGVyJywgYXQ6ICdjZW50ZXInLCBvZjogJ3dpbmRvdycsIG9mZnNldFg6ICcwcHgnLCBvZmZzZXRZOiAnMHB4JyB9LFxuICAgICAgICAgICAgd2luZG93UmVjdCA9IHtcbiAgICAgICAgICAgIHdpZHRoOiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICB9LFxuICAgICAgICAgICAgc2Nyb2xsWCA9IHBhZ2VYT2Zmc2V0LFxuICAgICAgICAgICAgc2Nyb2xsWSA9IHBhZ2VZT2Zmc2V0O1xuXG4gICAgICAgIGlmICh0eXBlb2YgZWxtdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIC8vIGFyZyBlbG10IGlzIGFzc3VtZWQgdG8gYmUgYSBzZWxlY3RvciBzdHJpbmdcbiAgICAgICAgICAgIGVsbXRUb1Bvc2l0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbG10KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIG90aGVyd2lzZSBhcmcgZWxtdCBpcyBhc3N1bWVkIHRvIGJlIGEgbm9kZSBvYmplY3RcbiAgICAgICAgICAgIGVsbXRUb1Bvc2l0aW9uID0gZWxtdDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRvIG5vdCBwb3NpdGlvbiBlbG10IHdoZW4gcGFyYW1ldGVyIHBvc2l0aW9uIGlzIHNldCB0byBib29sZWFuIGZhbHNlXG4gICAgICAgIGlmICghX3Bvc2l0aW9uKSB7XG4gICAgICAgICAgICBlbG10VG9Qb3NpdGlvbi5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgICAgIHJldHVybiBlbG10VG9Qb3NpdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbG10VG9Qb3NpdGlvblJlY3QgPSBlbG10VG9Qb3NpdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgLy8gY29udGFpbnMgcmVhZC1vbmx5IGxlZnQsIHRvcCwgcmlnaHQsIGJvdHRvbSwgeCwgeSwgd2lkdGgsIGhlaWdodCBkZXNjcmliaW5nIHRoZSAhISBib3JkZXItYm94ICEhIGluIHBpeGVsc1xuICAgICAgICAvLyBQcm9wZXJ0aWVzIG90aGVyIHRoYW4gd2lkdGggYW5kIGhlaWdodCBhcmUgcmVsYXRpdmUgdG8gdGhlIHRvcC1sZWZ0IG9mIHRoZSB2aWV3cG9ydCEhXG5cbiAgICAgICAgLy8gdHJhbnNsYXRlIHNob3J0aGFuZCBzdHJpbmcgdG8gb2JqZWN0IC0gXCJ0b3AtbGVmdCA1MCA1MCBkb3duXCJcbiAgICAgICAgaWYgKHR5cGVvZiBfcG9zaXRpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB2YXIgcG9zVmFsdWUgPSBfcG9zaXRpb24ubWF0Y2goL1xcYlthLXpdezQsNn0tezF9W2Etel17Myw2fVxcYi9pKSxcbiAgICAgICAgICAgICAgICBhdXRvcG9zVmFsdWUgPSBfcG9zaXRpb24ubWF0Y2goL2Rvd258dXB8cmlnaHQoW14tXXwkKXxsZWZ0KFteLV18JCkvaSksXG4gICAgICAgICAgICAgICAgb2Zmc2V0VmFsdWUgPSBfcG9zaXRpb24ubWF0Y2goL1srLV0/XFxkP1xcLj9cXGQrKFthLXolXXsyLDR9XFxifCU/KS9naSk7XG4gICAgICAgICAgICB2YXIgc2V0dGluZ3MgPSB2b2lkIDA7XG5cbiAgICAgICAgICAgIGlmIChwb3NWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzID0geyBteTogcG9zVmFsdWVbMF0udG9Mb3dlckNhc2UoKSwgYXQ6IHBvc1ZhbHVlWzBdLnRvTG93ZXJDYXNlKCkgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MgPSB7IG15OiAnY2VudGVyJywgYXQ6ICdjZW50ZXInIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhdXRvcG9zVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5hdXRvcG9zaXRpb24gPSBhdXRvcG9zVmFsdWVbMF0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9mZnNldFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgLy8gY29udmVydCBzdHJpbmdzIHdpdGggb25seSBudW1iZXJzIHRvIGEgbnVtYmVyIHZhbHVlXG4gICAgICAgICAgICAgICAgb2Zmc2V0VmFsdWUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ubWF0Y2goL15bKy1dP1swLTldKiQvKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0VmFsdWVbaW5kZXhdICs9ICdweCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0VmFsdWVbaW5kZXhdID0gb2Zmc2V0VmFsdWVbaW5kZXhdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gb25seSBvbmUgcGFzc2VkIG9mZnNldCBpcyB1c2VkIGZvciBib3RoIG9mZnNldFggYW5kIG9mZnNldFlcbiAgICAgICAgICAgICAgICBpZiAob2Zmc2V0VmFsdWUubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLm9mZnNldFggPSBvZmZzZXRWYWx1ZVswXTtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3Mub2Zmc2V0WSA9IG9mZnNldFZhbHVlWzBdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLm9mZnNldFggPSBvZmZzZXRWYWx1ZVswXTtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3Mub2Zmc2V0WSA9IG9mZnNldFZhbHVlWzFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcG9zU2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgc2V0dGluZ3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcG9zU2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgX3Bvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwYXJlbnRDb250YWluZXIgPSBlbG10VG9Qb3NpdGlvbi5wYXJlbnRFbGVtZW50O1xuICAgICAgICB2YXIgcGFyZW50Q29udGFpbmVyU3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUocGFyZW50Q29udGFpbmVyKTtcbiAgICAgICAgdmFyIHBhcmVudENvbnRhaW5lclJlY3QgPSBwYXJlbnRDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHZhciBwYXJlbnRDb250YWluZXJUYWdOYW1lID0gcGFyZW50Q29udGFpbmVyLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZiAocG9zU2V0dGluZ3Mub2YgJiYgcG9zU2V0dGluZ3Mub2YgIT09ICd3aW5kb3cnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHBvc1NldHRpbmdzLm9mID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIC8vIHBvc1NldHRpbmdzLm9mIGlzIGFzc3VtZWQgdG8gYmUgYSBzZWxlY3RvciBzdHJpbmdcbiAgICAgICAgICAgICAgICBlbG10VG9Qb3NpdGlvbkFnYWluc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBvc1NldHRpbmdzLm9mKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIHBvc1NldHRpbmdzLm9mIGlzIGFzc3VtZWQgdG8gYmUgYSBub2RlIG9iamVjdFxuICAgICAgICAgICAgICAgIGVsbXRUb1Bvc2l0aW9uQWdhaW5zdCA9IHBvc1NldHRpbmdzLm9mO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2FsYyBsZWZ0IGNvcnJlY3Rpb25zIGR1ZSB0byBwYW5lbCBzaXplLCBzaG91bGQgYmUgdGhlIHNhbWUgZm9yIGFsbCBzY2VuYXJpb3NcbiAgICAgICAgaWYgKHBvc1NldHRpbmdzLm15Lm1hdGNoKC9eY2VudGVyLXRvcCR8XmNlbnRlciR8XmNlbnRlci1ib3R0b20kL2kpKSB7XG4gICAgICAgICAgICBteVhjb3JyZWN0aW9uID0gZWxtdFRvUG9zaXRpb25SZWN0LndpZHRoIC8gMjtcbiAgICAgICAgfSBlbHNlIGlmIChwb3NTZXR0aW5ncy5teS5tYXRjaCgvcmlnaHQvaSkpIHtcbiAgICAgICAgICAgIG15WGNvcnJlY3Rpb24gPSBlbG10VG9Qb3NpdGlvblJlY3Qud2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2FsYyB0b3AgY29ycmVjdGlvbnMgZHVlIHRvIHBhbmVsIHNpemVcbiAgICAgICAgaWYgKHBvc1NldHRpbmdzLm15Lm1hdGNoKC9ebGVmdC1jZW50ZXIkfF5jZW50ZXIkfF5yaWdodC1jZW50ZXIkL2kpKSB7XG4gICAgICAgICAgICBteVljb3JyZWN0aW9uID0gZWxtdFRvUG9zaXRpb25SZWN0LmhlaWdodCAvIDI7XG4gICAgICAgIH0gZWxzZSBpZiAocG9zU2V0dGluZ3MubXkubWF0Y2goL2JvdHRvbS9pKSkge1xuICAgICAgICAgICAgbXlZY29ycmVjdGlvbiA9IGVsbXRUb1Bvc2l0aW9uUmVjdC5oZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTQ0VOQVJJTyAxIC0gcGFuZWwgYXBwZW5kZWQgdG8gYm9keSBhbmQgcG9zaXRpb25lZCByZWxhdGl2ZSB0byB3aW5kb3cgLT4gbWFrZSBmaXhlZFxuICAgICAgICBpZiAocGFyZW50Q29udGFpbmVyVGFnTmFtZSA9PT0gJ2JvZHknICYmIHBvc1NldHRpbmdzLm9mID09PSAnd2luZG93Jykge1xuICAgICAgICAgICAgLy8gY2FsYyBsZWZ0IGNvcnJlY3Rpb25zIGR1ZSB0byB3aW5kb3cgc2l6ZVxuICAgICAgICAgICAgaWYgKHBvc1NldHRpbmdzLmF0Lm1hdGNoKC9eY2VudGVyLXRvcCR8XmNlbnRlciR8XmNlbnRlci1ib3R0b20kL2kpKSB7XG4gICAgICAgICAgICAgICAgYXRYY29ycmVjdGlvbiA9IHdpbmRvd1JlY3Qud2lkdGggLyAyO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwb3NTZXR0aW5ncy5hdC5tYXRjaCgvcmlnaHQvaSkpIHtcbiAgICAgICAgICAgICAgICBhdFhjb3JyZWN0aW9uID0gd2luZG93UmVjdC53aWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNhbGMgdG9wIGNvcnJlY3Rpb25zIGR1ZSB0byB3aW5kb3cgc2l6ZVxuICAgICAgICAgICAgaWYgKHBvc1NldHRpbmdzLmF0Lm1hdGNoKC9ebGVmdC1jZW50ZXIkfF5jZW50ZXIkfF5yaWdodC1jZW50ZXIkL2kpKSB7XG4gICAgICAgICAgICAgICAgYXRZY29ycmVjdGlvbiA9IHdpbmRvd1JlY3QuaGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocG9zU2V0dGluZ3MuYXQubWF0Y2goL2JvdHRvbS9pKSkge1xuICAgICAgICAgICAgICAgIGF0WWNvcnJlY3Rpb24gPSB3aW5kb3dSZWN0LmhlaWdodDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FsY3VsYXRlZFBvc2l0aW9uLmxlZnQgPSBhdFhjb3JyZWN0aW9uIC0gbXlYY29ycmVjdGlvbiAtIHBhcnNlRmxvYXQocGFyZW50Q29udGFpbmVyU3R5bGVzLmJvcmRlckxlZnRXaWR0aCk7XG4gICAgICAgICAgICBjYWxjdWxhdGVkUG9zaXRpb24udG9wID0gYXRZY29ycmVjdGlvbiAtIG15WWNvcnJlY3Rpb24gLSBwYXJzZUZsb2F0KHBhcmVudENvbnRhaW5lclN0eWxlcy5ib3JkZXJUb3BXaWR0aCk7XG5cbiAgICAgICAgICAgIC8vIHBhbmVsIGFwcGVuZGVkIHRvIGJvZHkgYW5kIHBvc2l0aW9uZWQgcmVsYXRpdmUgdG8gd2luZG93IGlzIGFsd2F5cyBmaXhlZFxuICAgICAgICAgICAgZWxtdFRvUG9zaXRpb24uc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU0NFTkFSSU8gMiAtIHBhbmVsIGFwcGVuZGVkIHRvIGJvZHkgYW5kIHBvc2l0aW9uZWQgcmVsYXRpdmUgdG8gYW5vdGhlciBlbGVtZW50IGluIGRvY3VtZW50XG4gICAgICAgIGVsc2UgaWYgKHBhcmVudENvbnRhaW5lclRhZ05hbWUgPT09ICdib2R5JyAmJiBwb3NTZXR0aW5ncy5vZiAhPT0gJ3dpbmRvdycpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxtdFRvUG9zaXRpb25BZ2FpbnN0UmVjdCA9IGVsbXRUb1Bvc2l0aW9uQWdhaW5zdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICAgICAgICAgIC8vIGNhbGMgbGVmdCBjb3JyZWN0aW9ucyBkdWUgdG8gcG9zaXRpb24gYW5kIHNpemUgb2YgZWxtdFRvUG9zaXRpb25BZ2FpbnN0XG4gICAgICAgICAgICAgICAgaWYgKHBvc1NldHRpbmdzLmF0Lm1hdGNoKC9eY2VudGVyLXRvcCR8XmNlbnRlciR8XmNlbnRlci1ib3R0b20kL2kpKSB7XG4gICAgICAgICAgICAgICAgICAgIGF0WGNvcnJlY3Rpb24gPSBlbG10VG9Qb3NpdGlvbkFnYWluc3RSZWN0LndpZHRoIC8gMiArIGVsbXRUb1Bvc2l0aW9uQWdhaW5zdFJlY3QubGVmdCArIHNjcm9sbFg7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb3NTZXR0aW5ncy5hdC5tYXRjaCgvcmlnaHQvaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYXRYY29ycmVjdGlvbiA9IGVsbXRUb1Bvc2l0aW9uQWdhaW5zdFJlY3Qud2lkdGggKyBlbG10VG9Qb3NpdGlvbkFnYWluc3RSZWN0LmxlZnQgKyBzY3JvbGxYO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGF0WGNvcnJlY3Rpb24gPSBlbG10VG9Qb3NpdGlvbkFnYWluc3RSZWN0LmxlZnQgKyBzY3JvbGxYO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBjYWxjIHRvcCBjb3JyZWN0aW9ucyBkdWUgdG8gcG9zaXRpb24gYW5kIHNpemUgb2YgZWxtdFRvUG9zaXRpb25BZ2FpbnN0XG4gICAgICAgICAgICAgICAgaWYgKHBvc1NldHRpbmdzLmF0Lm1hdGNoKC9ebGVmdC1jZW50ZXIkfF5jZW50ZXIkfF5yaWdodC1jZW50ZXIkL2kpKSB7XG4gICAgICAgICAgICAgICAgICAgIGF0WWNvcnJlY3Rpb24gPSBlbG10VG9Qb3NpdGlvbkFnYWluc3RSZWN0LmhlaWdodCAvIDIgKyBlbG10VG9Qb3NpdGlvbkFnYWluc3RSZWN0LnRvcCArIHNjcm9sbFk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb3NTZXR0aW5ncy5hdC5tYXRjaCgvYm90dG9tL2kpKSB7XG4gICAgICAgICAgICAgICAgICAgIGF0WWNvcnJlY3Rpb24gPSBlbG10VG9Qb3NpdGlvbkFnYWluc3RSZWN0LmhlaWdodCArIGVsbXRUb1Bvc2l0aW9uQWdhaW5zdFJlY3QudG9wICsgc2Nyb2xsWTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhdFljb3JyZWN0aW9uID0gZWxtdFRvUG9zaXRpb25BZ2FpbnN0UmVjdC50b3AgKyBzY3JvbGxZO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWRQb3NpdGlvbi5sZWZ0ID0gYXRYY29ycmVjdGlvbiAtIG15WGNvcnJlY3Rpb24gLSBwYXJzZUZsb2F0KHBhcmVudENvbnRhaW5lclN0eWxlcy5ib3JkZXJMZWZ0V2lkdGgpO1xuICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWRQb3NpdGlvbi50b3AgPSBhdFljb3JyZWN0aW9uIC0gbXlZY29ycmVjdGlvbiAtIHBhcnNlRmxvYXQocGFyZW50Q29udGFpbmVyU3R5bGVzLmJvcmRlclRvcFdpZHRoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU0NFTkFSSU8gMyAtIC8vIHBhbmVsIGFwcGVuZGVkIHRvIG90aGVyIGVsZW1lbnQgdGhhbiBib2R5IGFuZCBwb3NpdGlvbmVkIHJlbGF0aXZlIHRvIGl0cyBjb250YWluZXJcbiAgICAgICAgICAgIGVsc2UgaWYgKHBhcmVudENvbnRhaW5lclRhZ05hbWUgIT09ICdib2R5JyAmJiAocG9zU2V0dGluZ3Mub2YgPT09ICd3aW5kb3cnIHx8ICFwb3NTZXR0aW5ncy5vZikpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsYyBjb3JyZWN0aW9ucyB0byBwb3NpdGlvbiBwYW5lbCByZWxhdGl2ZSB0byBwYXJlbnRDb250YWluZXIgY29udGVudC1ib3gsIG5vdCBib3JkZXItYm94XG4gICAgICAgICAgICAgICAgICAgIHZhciBwQ29udGFpbmVyTFJCb3JkZXJXaWR0aCA9IHBhcnNlRmxvYXQocGFyZW50Q29udGFpbmVyU3R5bGVzLmJvcmRlckxlZnRXaWR0aCkgKyBwYXJzZUZsb2F0KHBhcmVudENvbnRhaW5lclN0eWxlcy5ib3JkZXJSaWdodFdpZHRoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBDb250YWluZXJUQkJvcmRlcldpZHRoID0gcGFyc2VGbG9hdChwYXJlbnRDb250YWluZXJTdHlsZXMuYm9yZGVyVG9wV2lkdGgpICsgcGFyc2VGbG9hdChwYXJlbnRDb250YWluZXJTdHlsZXMuYm9yZGVyQm90dG9tV2lkdGgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbGMgbGVmdCBjb3JyZWN0aW9ucyBkdWUgdG8gcGFyZW50IGNvbnRhaW5lciB3aWR0aFxuICAgICAgICAgICAgICAgICAgICBpZiAocG9zU2V0dGluZ3MuYXQubWF0Y2goL15jZW50ZXItdG9wJHxeY2VudGVyJHxeY2VudGVyLWJvdHRvbSQvaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0WGNvcnJlY3Rpb24gPSBwYXJlbnRDb250YWluZXJSZWN0LndpZHRoIC8gMiAtIHBDb250YWluZXJMUkJvcmRlcldpZHRoIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb3NTZXR0aW5ncy5hdC5tYXRjaCgvcmlnaHQvaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0WGNvcnJlY3Rpb24gPSBwYXJlbnRDb250YWluZXJSZWN0LndpZHRoIC0gcENvbnRhaW5lckxSQm9yZGVyV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsYyB0b3AgY29ycmVjdGlvbnMgZHVlIHRvIHBhcmVudCBjb250YWluZXIgaGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NTZXR0aW5ncy5hdC5tYXRjaCgvXmxlZnQtY2VudGVyJHxeY2VudGVyJHxecmlnaHQtY2VudGVyJC9pKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXRZY29ycmVjdGlvbiA9IHBhcmVudENvbnRhaW5lclJlY3QuaGVpZ2h0IC8gMiAtIHBDb250YWluZXJUQkJvcmRlcldpZHRoIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb3NTZXR0aW5ncy5hdC5tYXRjaCgvYm90dG9tL2kpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdFljb3JyZWN0aW9uID0gcGFyZW50Q29udGFpbmVyUmVjdC5oZWlnaHQgLSBwQ29udGFpbmVyVEJCb3JkZXJXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWRQb3NpdGlvbi5sZWZ0ID0gYXRYY29ycmVjdGlvbiAtIG15WGNvcnJlY3Rpb247XG4gICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWRQb3NpdGlvbi50b3AgPSBhdFljb3JyZWN0aW9uIC0gbXlZY29ycmVjdGlvbjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBTQ0VOQVJJTyA0IC0gcGFuZWwgYXBwZW5kZWQgdG8gb3RoZXIgZWxlbWVudCB0aGFuIGJvZHkgYW5kIHBvc2l0aW9uZWQgcmVsYXRpdmUgdG8gYW4gZWxlbWVudCB3aXRoaW4gaXRzIGNvbnRhaW5lclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBhcmVudENvbnRhaW5lclRhZ05hbWUgIT09ICdib2R5JyAmJiBwYXJlbnRDb250YWluZXIuY29udGFpbnMoZWxtdFRvUG9zaXRpb25BZ2FpbnN0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9lbG10VG9Qb3NpdGlvbkFnYWluc3RSZWN0ID0gZWxtdFRvUG9zaXRpb25BZ2FpbnN0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYWxjIGxlZnQgY29ycmVjdGlvbnMgZHVlIHRvIHBvc2l0aW9uIGFuZCBzaXplIG9mIGVsbXRUb1Bvc2l0aW9uQWdhaW5zdFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvc1NldHRpbmdzLmF0Lm1hdGNoKC9eY2VudGVyLXRvcCR8XmNlbnRlciR8XmNlbnRlci1ib3R0b20kL2kpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXRYY29ycmVjdGlvbiA9IF9lbG10VG9Qb3NpdGlvbkFnYWluc3RSZWN0LmxlZnQgLSBwYXJlbnRDb250YWluZXJSZWN0LmxlZnQgKyBfZWxtdFRvUG9zaXRpb25BZ2FpbnN0UmVjdC53aWR0aCAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvc1NldHRpbmdzLmF0Lm1hdGNoKC9yaWdodC9pKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0WGNvcnJlY3Rpb24gPSBfZWxtdFRvUG9zaXRpb25BZ2FpbnN0UmVjdC5sZWZ0IC0gcGFyZW50Q29udGFpbmVyUmVjdC5sZWZ0ICsgX2VsbXRUb1Bvc2l0aW9uQWdhaW5zdFJlY3Qud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0WGNvcnJlY3Rpb24gPSBfZWxtdFRvUG9zaXRpb25BZ2FpbnN0UmVjdC5sZWZ0IC0gcGFyZW50Q29udGFpbmVyUmVjdC5sZWZ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FsYyB0b3AgY29ycmVjdGlvbnMgZHVlIHRvIHBvc2l0aW9uIGFuZCBzaXplIG9mIGVsbXRUb1Bvc2l0aW9uQWdhaW5zdFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvc1NldHRpbmdzLmF0Lm1hdGNoKC9ebGVmdC1jZW50ZXIkfF5jZW50ZXIkfF5yaWdodC1jZW50ZXIkL2kpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXRZY29ycmVjdGlvbiA9IF9lbG10VG9Qb3NpdGlvbkFnYWluc3RSZWN0LnRvcCAtIHBhcmVudENvbnRhaW5lclJlY3QudG9wICsgX2VsbXRUb1Bvc2l0aW9uQWdhaW5zdFJlY3QuaGVpZ2h0IC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9zU2V0dGluZ3MuYXQubWF0Y2goL2JvdHRvbS9pKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0WWNvcnJlY3Rpb24gPSBfZWxtdFRvUG9zaXRpb25BZ2FpbnN0UmVjdC50b3AgLSBwYXJlbnRDb250YWluZXJSZWN0LnRvcCArIF9lbG10VG9Qb3NpdGlvbkFnYWluc3RSZWN0LmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXRZY29ycmVjdGlvbiA9IF9lbG10VG9Qb3NpdGlvbkFnYWluc3RSZWN0LnRvcCAtIHBhcmVudENvbnRhaW5lclJlY3QudG9wO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVkUG9zaXRpb24ubGVmdCA9IGF0WGNvcnJlY3Rpb24gLSBteVhjb3JyZWN0aW9uIC0gcGFyc2VGbG9hdChwYXJlbnRDb250YWluZXJTdHlsZXMuYm9yZGVyTGVmdFdpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWRQb3NpdGlvbi50b3AgPSBhdFljb3JyZWN0aW9uIC0gbXlZY29ycmVjdGlvbiAtIHBhcnNlRmxvYXQocGFyZW50Q29udGFpbmVyU3R5bGVzLmJvcmRlclRvcFdpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgIC8vIGF1dG9wb3NpdGlvbiBwYW5lbHMgb25seSBpZiAuLi5cbiAgICAgICAgaWYgKHBvc1NldHRpbmdzLmF1dG9wb3NpdGlvbiAmJiBwb3NTZXR0aW5ncy5teSA9PT0gcG9zU2V0dGluZ3MuYXQgJiYgWydsZWZ0LXRvcCcsICdjZW50ZXItdG9wJywgJ3JpZ2h0LXRvcCcsICdsZWZ0LWJvdHRvbScsICdjZW50ZXItYm90dG9tJywgJ3JpZ2h0LWJvdHRvbSddLmluZGV4T2YocG9zU2V0dGluZ3MubXkpID49IDApIHtcbiAgICAgICAgICAgIC8vIGFkZCBjbGFzcyB3aXRoIHBvc2l0aW9uIGFuZCBhdXRvcG9zaXRpb24gZGlyZWN0aW9uXG4gICAgICAgICAgICB2YXIgbmV3Q2xhc3MgPSBwb3NTZXR0aW5ncy5teSArICctJyArIHBvc1NldHRpbmdzLmF1dG9wb3NpdGlvbi50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgZWxtdFRvUG9zaXRpb24uY2xhc3NMaXN0LmFkZChuZXdDbGFzcyk7XG5cbiAgICAgICAgICAgIC8vIGdldCBhbGwgcGFuZWxzIHdpdGggc2FtZSBjbGFzc1xuICAgICAgICAgICAgdmFyIG5ld0NsYXNzQWxsID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLicgKyBuZXdDbGFzcykpLFxuICAgICAgICAgICAgICAgIG93bkluZGV4ID0gbmV3Q2xhc3NBbGwuaW5kZXhPZihlbG10VG9Qb3NpdGlvbik7XG5cbiAgICAgICAgICAgIC8vIGlmIG1vcmUgdGhhbiAxIHBvc2l0aW9uIG5ldyBwYW5lbFxuICAgICAgICAgICAgaWYgKG5ld0NsYXNzQWxsLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAocG9zU2V0dGluZ3MuYXV0b3Bvc2l0aW9uID09PSAnZG93bicpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29sbGVjdCBoZWlnaHRzIG9mIGFsbCBlbG10cyB0byBjYWxjIG5ldyB0b3AgcG9zaXRpb25cbiAgICAgICAgICAgICAgICAgICAgbmV3Q2xhc3NBbGwuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDAgJiYgaW5kZXggPD0gb3duSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVkUG9zaXRpb24udG9wICs9IG5ld0NsYXNzQWxsWy0taW5kZXhdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCArIGpzUGFuZWwuYXV0b3Bvc2l0aW9uU3BhY2luZztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb3NTZXR0aW5ncy5hdXRvcG9zaXRpb24gPT09ICd1cCcpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3Q2xhc3NBbGwuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDAgJiYgaW5kZXggPD0gb3duSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVkUG9zaXRpb24udG9wIC09IG5ld0NsYXNzQWxsWy0taW5kZXhdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCArIGpzUGFuZWwuYXV0b3Bvc2l0aW9uU3BhY2luZztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb3NTZXR0aW5ncy5hdXRvcG9zaXRpb24gPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29sbGVjdCB3aWR0aHMgb2YgYWxsIGVsbXRzIHRvIGNhbGMgbmV3IGxlZnQgcG9zaXRpb25cbiAgICAgICAgICAgICAgICAgICAgbmV3Q2xhc3NBbGwuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDAgJiYgaW5kZXggPD0gb3duSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVkUG9zaXRpb24ubGVmdCArPSBuZXdDbGFzc0FsbFstLWluZGV4XS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCArIGpzUGFuZWwuYXV0b3Bvc2l0aW9uU3BhY2luZztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb3NTZXR0aW5ncy5hdXRvcG9zaXRpb24gPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgICAgICAgICBuZXdDbGFzc0FsbC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gMCAmJiBpbmRleCA8PSBvd25JbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWRQb3NpdGlvbi5sZWZ0IC09IG5ld0NsYXNzQWxsWy0taW5kZXhdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoICsganNQYW5lbC5hdXRvcG9zaXRpb25TcGFjaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhcHBseSBtaW5MZWZ0LCBtaW5Ub3AsIG1heExlZnQgYW5kIG1heFRvcCB2YWx1ZXMgKG5lZWQgdG8gYmUgbnVtYmVycylcbiAgICAgICAgaWYgKChwb3NTZXR0aW5ncy5taW5MZWZ0IHx8IHBvc1NldHRpbmdzLm1pbkxlZnQgPT09IDApICYmIHR5cGVvZiBwb3NTZXR0aW5ncy5taW5MZWZ0ID09PSAnbnVtYmVyJyAmJiBjYWxjdWxhdGVkUG9zaXRpb24ubGVmdCA8IHBvc1NldHRpbmdzLm1pbkxlZnQpIHtcbiAgICAgICAgICAgIGNhbGN1bGF0ZWRQb3NpdGlvbi5sZWZ0ID0gcG9zU2V0dGluZ3MubWluTGVmdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHBvc1NldHRpbmdzLm1heExlZnQgfHwgcG9zU2V0dGluZ3MubWF4TGVmdCA9PT0gMCkgJiYgdHlwZW9mIHBvc1NldHRpbmdzLm1heExlZnQgPT09ICdudW1iZXInICYmIGNhbGN1bGF0ZWRQb3NpdGlvbi5sZWZ0ID4gcG9zU2V0dGluZ3MubWF4TGVmdCkge1xuICAgICAgICAgICAgY2FsY3VsYXRlZFBvc2l0aW9uLmxlZnQgPSBwb3NTZXR0aW5ncy5tYXhMZWZ0O1xuICAgICAgICB9XG4gICAgICAgIGlmICgocG9zU2V0dGluZ3MubWluVG9wIHx8IHBvc1NldHRpbmdzLm1pblRvcCA9PT0gMCkgJiYgdHlwZW9mIHBvc1NldHRpbmdzLm1pblRvcCA9PT0gJ251bWJlcicgJiYgY2FsY3VsYXRlZFBvc2l0aW9uLnRvcCA8IHBvc1NldHRpbmdzLm1pblRvcCkge1xuICAgICAgICAgICAgY2FsY3VsYXRlZFBvc2l0aW9uLnRvcCA9IHBvc1NldHRpbmdzLm1pblRvcDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHBvc1NldHRpbmdzLm1heFRvcCB8fCBwb3NTZXR0aW5ncy5tYXhUb3AgPT09IDApICYmIHR5cGVvZiBwb3NTZXR0aW5ncy5tYXhUb3AgPT09ICdudW1iZXInICYmIGNhbGN1bGF0ZWRQb3NpdGlvbi50b3AgPiBwb3NTZXR0aW5ncy5tYXhUb3ApIHtcbiAgICAgICAgICAgIGNhbGN1bGF0ZWRQb3NpdGlvbi50b3AgPSBwb3NTZXR0aW5ncy5tYXhUb3A7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHBvc1NldHRpbmdzLm1vZGlmeSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FsY3VsYXRlZFBvc2l0aW9uID0gcG9zU2V0dGluZ3MubW9kaWZ5LmNhbGwoY2FsY3VsYXRlZFBvc2l0aW9uLCBjYWxjdWxhdGVkUG9zaXRpb24pO1xuICAgICAgICAgICAgLy8gaW5zaWRlIHRoZSBmdW5jdGlvbiAndGhpcycgcmVmZXJzIHRvIHRoZSBvYmplY3QgJ25ld0Nvb3JkcydcbiAgICAgICAgICAgIC8vIG9wdGlvbi5tb2RpZnkgaXMgb3B0aW9uYWwuIElmIHByZXNlbnQgaGFzIHRvIGJlIGEgZnVuY3Rpb24gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIHRoZSBrZXlzICdsZWZ0JyBhbmQgJ3RvcCcgYW5kIHZhbHVlcyBoYXZlIHRvIGJlIG51bWJlcnNcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpbmFsbHkgYXBwbHkgb2Zmc2V0cyBhbmQgcG9zaXRpb24gcGFuZWxcbiAgICAgICAgaWYgKHR5cGVvZiBwb3NTZXR0aW5ncy5vZmZzZXRYID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcG9zU2V0dGluZ3Mub2Zmc2V0WCArPSAncHgnO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcG9zU2V0dGluZ3Mub2Zmc2V0WSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHBvc1NldHRpbmdzLm9mZnNldFkgKz0gJ3B4JztcbiAgICAgICAgfVxuICAgICAgICBlbG10VG9Qb3NpdGlvbi5zdHlsZS5sZWZ0ID0gJ2NhbGMoJyArIGNhbGN1bGF0ZWRQb3NpdGlvbi5sZWZ0ICsgJ3B4ICsgJyArIHBvc1NldHRpbmdzLm9mZnNldFggKyAnKSc7XG4gICAgICAgIGVsbXRUb1Bvc2l0aW9uLnN0eWxlLnRvcCA9ICdjYWxjKCcgKyBjYWxjdWxhdGVkUG9zaXRpb24udG9wICsgJ3B4ICsgJyArIHBvc1NldHRpbmdzLm9mZnNldFkgKyAnKSc7XG4gICAgICAgIGVsbXRUb1Bvc2l0aW9uLnN0eWxlLm9wYWNpdHkgPSAxO1xuXG4gICAgICAgIC8vIGNvbnZlcnQgY3NzIGNhbGMgdmFsdWVzIHRvIHBpeGVsIHZhbHVlcyAtIHRoaXMgaXMgcmVxdWlyZWQgYnkgZHJhZ2l0IGFuZCByZXNpemVpdFxuICAgICAgICBlbG10VG9Qb3NpdGlvbi5zdHlsZS5sZWZ0ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxtdFRvUG9zaXRpb24pLmxlZnQ7XG4gICAgICAgIGVsbXRUb1Bvc2l0aW9uLnN0eWxlLnRvcCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsbXRUb1Bvc2l0aW9uKS50b3A7XG5cbiAgICAgICAgcmV0dXJuIGVsbXRUb1Bvc2l0aW9uO1xuICAgIH0sXG4gICAgcmdiVG9Ic2w6IGZ1bmN0aW9uIHJnYlRvSHNsKHIsIGcsIGIpIHtcbiAgICAgICAgciAvPSAyNTUsIGcgLz0gMjU1LCBiIC89IDI1NTtcbiAgICAgICAgdmFyIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLFxuICAgICAgICAgICAgbWluID0gTWF0aC5taW4ociwgZywgYiksXG4gICAgICAgICAgICBoID0gdm9pZCAwLFxuICAgICAgICAgICAgcyA9IHZvaWQgMCxcbiAgICAgICAgICAgIGwgPSAobWF4ICsgbWluKSAvIDI7XG4gICAgICAgIGlmIChtYXggPT09IG1pbikge1xuICAgICAgICAgICAgaCA9IHMgPSAwOyAvLyBhY2hyb21hdGljXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgZCA9IG1heCAtIG1pbjtcbiAgICAgICAgICAgIHMgPSBsID4gMC41ID8gZCAvICgyIC0gbWF4IC0gbWluKSA6IGQgLyAobWF4ICsgbWluKTtcblxuICAgICAgICAgICAgc3dpdGNoIChtYXgpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHI6XG4gICAgICAgICAgICAgICAgICAgIGggPSAoZyAtIGIpIC8gZCArIChnIDwgYiA/IDYgOiAwKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBnOlxuICAgICAgICAgICAgICAgICAgICBoID0gKGIgLSByKSAvIGQgKyAyO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGI6XG4gICAgICAgICAgICAgICAgICAgIGggPSAociAtIGcpIC8gZCArIDQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaCAvPSA2O1xuICAgICAgICB9XG4gICAgICAgIC8vcmV0dXJuIFsgaCwgcywgbCBdO1xuICAgICAgICBoID0gaCAqIDM2MDtcbiAgICAgICAgcyA9IHMgKiAxMDAgKyAnJSc7XG4gICAgICAgIGwgPSBsICogMTAwICsgJyUnO1xuICAgICAgICByZXR1cm4geyBjc3M6ICdoc2woJyArIGggKyAnLCcgKyBzICsgJywnICsgbCArICcpJywgaDogaCwgczogcywgbDogbCB9O1xuICAgIH0sXG4gICAgcmdiVG9IZXg6IGZ1bmN0aW9uIHJnYlRvSGV4KHIsIGcsIGIpIHtcbiAgICAgICAgdmFyIHJlZCA9IE51bWJlcihyKS50b1N0cmluZygxNiksXG4gICAgICAgICAgICBncmVlbiA9IE51bWJlcihnKS50b1N0cmluZygxNiksXG4gICAgICAgICAgICBibHVlID0gTnVtYmVyKGIpLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgaWYgKHJlZC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHJlZCA9ICcwJyArIHJlZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ3JlZW4ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBncmVlbiA9ICcwJyArIGdyZWVuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChibHVlLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgYmx1ZSA9ICcwJyArIGJsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcjJyArIHJlZCArIGdyZWVuICsgYmx1ZTtcbiAgICB9LFxuICAgIHJlbW92ZVNuYXBBcmVhczogZnVuY3Rpb24gcmVtb3ZlU25hcEFyZWFzKHBhbmVsKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qc1BhbmVsLXNuYXAtYXJlYScpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICBpZiAocGFuZWwucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgIHBhbmVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHJlc2V0Wmk6IGZ1bmN0aW9uIHJlc2V0WmkoKSB7XG4gICAgICAgIHRoaXMuemkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnRWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoganNQYW5lbC56aUJhc2U7XG5cbiAgICAgICAgICAgIHZhciB2YWwgPSBzdGFydFZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIHsgbmV4dDogZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbCsrO1xuICAgICAgICAgICAgICAgIH0gfTtcbiAgICAgICAgfSgpO1xuICAgICAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanNQYW5lbC1zdGFuZGFyZCcpKS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYS5zdHlsZS56SW5kZXggLSBiLnN0eWxlLnpJbmRleDtcbiAgICAgICAgfSkuZm9yRWFjaChmdW5jdGlvbiAocGFuZWwpIHtcbiAgICAgICAgICAgIHBhbmVsLnN0eWxlLnpJbmRleCA9IGpzUGFuZWwuemkubmV4dCgpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHJlc2l6ZWl0OiBmdW5jdGlvbiByZXNpemVpdChlbG10KSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuICAgICAgICB2YXIgb3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmYXVsdHMucmVzaXplaXQsIG9wdGlvbnMpLFxuICAgICAgICAgICAgZWxtdFBhcmVudCA9IGVsbXQucGFyZW50RWxlbWVudCxcbiAgICAgICAgICAgIGVsbXRQYXJlbnRUYWdOYW1lID0gZWxtdFBhcmVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICBtYXhXaWR0aCA9IHR5cGVvZiBvcHRzLm1heFdpZHRoID09PSAnZnVuY3Rpb24nID8gb3B0cy5tYXhXaWR0aCgpIDogb3B0cy5tYXhXaWR0aCB8fCAxMDAwMCxcbiAgICAgICAgICAgIG1heEhlaWdodCA9IHR5cGVvZiBvcHRzLm1heEhlaWdodCA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMubWF4SGVpZ2h0KCkgOiBvcHRzLm1heEhlaWdodCB8fCAxMDAwMCxcbiAgICAgICAgICAgIG1pbldpZHRoID0gdHlwZW9mIG9wdHMubWluV2lkdGggPT09ICdmdW5jdGlvbicgPyBvcHRzLm1pbldpZHRoKCkgOiBvcHRzLm1pbldpZHRoLFxuICAgICAgICAgICAgbWluSGVpZ2h0ID0gdHlwZW9mIG9wdHMubWluSGVpZ2h0ID09PSAnZnVuY3Rpb24nID8gb3B0cy5taW5IZWlnaHQoKSA6IG9wdHMubWluSGVpZ2h0LFxuICAgICAgICAgICAgcmVzaXplc3RhcnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3Jlc2l6ZXN0YXJ0JywgeyBkZXRhaWw6IGVsbXQuaWQgfSksXG4gICAgICAgICAgICByZXNpemUgPSBuZXcgQ3VzdG9tRXZlbnQoJ3Jlc2l6ZScsIHsgZGV0YWlsOiBlbG10LmlkIH0pLFxuICAgICAgICAgICAgcmVzaXplc3RvcCA9IG5ldyBDdXN0b21FdmVudCgncmVzaXplc3RvcCcsIHsgZGV0YWlsOiBlbG10LmlkIH0pO1xuICAgICAgICB2YXIgY29udGFpbm1lbnQgPSB2b2lkIDAsXG4gICAgICAgICAgICByZXNpemVQYW5lbCA9IHZvaWQgMCxcbiAgICAgICAgICAgIHJlc2l6ZXN0YXJ0ZWQgPSB2b2lkIDAsXG4gICAgICAgICAgICB3ID0gdm9pZCAwLFxuICAgICAgICAgICAgaCA9IHZvaWQgMCxcbiAgICAgICAgICAgIGZyYW1lcyA9IFtdO1xuXG4gICAgICAgIC8vIG5vcm1hbGl6ZSBjb250YWlubWVudCBjb25maWdcbiAgICAgICAgY29udGFpbm1lbnQgPSB0aGlzLnBPY29udGFpbm1lbnQob3B0cy5jb250YWlubWVudCk7XG5cbiAgICAgICAgb3B0cy5oYW5kbGVzLnNwbGl0KCcsJykuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICAgICAgICAgIG5vZGUuY2xhc3NOYW1lID0gJ2pzUGFuZWwtcmVzaXplaXQtaGFuZGxlIGpzUGFuZWwtcmVzaXplaXQtJyArIGl0ZW0udHJpbSgpO1xuICAgICAgICAgICAgbm9kZS5zdHlsZS56SW5kZXggPSA5MDtcbiAgICAgICAgICAgIGVsbXQuYXBwZW5kKG5vZGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlbG10LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2pzUGFuZWwtcmVzaXplaXQtaGFuZGxlJykpLmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZSkge1xuXG4gICAgICAgICAgICBqc1BhbmVsLnBvaW50ZXJkb3duLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBoYW5kbGUuYWRkRXZlbnRMaXN0ZW5lcihpdGVtLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBwcmV2ZW50IHdpbmRvdyBzY3JvbGwgd2hpbGUgcmVzaXppbmcgZWxtdFxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgZnJhbWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaWZyYW1lJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmcmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsbXRSZWN0ID0gZWxtdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIG5lZWRzIHRvIGJlIGNhbGN1bGF0ZWQgb24gcG9pbnRlcmRvd24hISAqL1xuICAgICAgICAgICAgICAgICAgICBlbG10UGFyZW50UmVjdCA9IGVsbXRQYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBuZWVkcyB0byBiZSBjYWxjdWxhdGVkIG9uIHBvaW50ZXJkb3duISEgKi9cbiAgICAgICAgICAgICAgICAgICAgZWxtdFBhcmVudFN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsbXRQYXJlbnQsIG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxtdFBhcmVudEJMVyA9IHBhcnNlSW50KGVsbXRQYXJlbnRTdHlsZXMuYm9yZGVyTGVmdFdpZHRoLCAxMCksXG4gICAgICAgICAgICAgICAgICAgICAgICBlbG10UGFyZW50QlRXID0gcGFyc2VJbnQoZWxtdFBhcmVudFN0eWxlcy5ib3JkZXJUb3BXaWR0aCwgMTApLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxtdFBhcmVudFBvc2l0aW9uID0gZWxtdFBhcmVudFN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCdwb3NpdGlvbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRYID0gZS5jbGllbnRYIHx8IGUudG91Y2hlc1swXS5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRZID0gZS5jbGllbnRZIHx8IGUudG91Y2hlc1swXS5jbGllbnRZLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRXaWR0aCA9IGVsbXRSZWN0LndpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRIZWlnaHQgPSBlbG10UmVjdC5oZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNpemVIYW5kbGVDbGFzc0xpc3QgPSBlLnRhcmdldC5jbGFzc0xpc3Q7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGFydExlZnQgPSBlbG10UmVjdC5sZWZ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRUb3AgPSBlbG10UmVjdC50b3AsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aEVhc3QgPSAxMDAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoV2VzdCA9IDEwMDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4SGVpZ2h0U291dGggPSAxMDAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heEhlaWdodE5vcnRoID0gMTAwMDA7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaW1wb3J0YW50IGlmIGNvbnRlbnQgY29udGFpbnMgYW5vdGhlciBkb2N1bWVudFxuICAgICAgICAgICAgICAgICAgICBlbG10LmNvbnRlbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxtdFBhcmVudFRhZ05hbWUgIT09ICdib2R5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRMZWZ0ID0gZWxtdFJlY3QubGVmdCAtIGVsbXRQYXJlbnRSZWN0LmxlZnQgKyBlbG10UGFyZW50LnNjcm9sbExlZnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydFRvcCA9IGVsbXRSZWN0LnRvcCAtIGVsbXRQYXJlbnRSZWN0LnRvcCArIGVsbXRQYXJlbnQuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsYyBtaW4vbWF4IGxlZnQvdG9wIHZhbHVlcyBpZiBjb250YWlubWVudCBpcyBzZXQgLSBjb2RlIGZyb20ganNEcmFnZ2FibGVcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsbXRQYXJlbnRUYWdOYW1lID09PSAnYm9keScgJiYgY29udGFpbm1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoRWFzdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCAtIGVsbXRSZWN0LmxlZnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHRTb3V0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgLSBlbG10UmVjdC50b3A7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aFdlc3QgPSBlbG10UmVjdC53aWR0aCArIGVsbXRSZWN0LmxlZnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHROb3J0aCA9IGVsbXRSZWN0LmhlaWdodCArIGVsbXRSZWN0LnRvcDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHBhbmVsIGlzIE5PVCBpbiBib2R5XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGFpbm1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxtdFBhcmVudFBvc2l0aW9uID09PSAnc3RhdGljJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aEVhc3QgPSBlbG10UGFyZW50UmVjdC53aWR0aCAtIGVsbXRSZWN0LmxlZnQgKyBlbG10UGFyZW50QkxXO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHRTb3V0aCA9IGVsbXRQYXJlbnRSZWN0LmhlaWdodCArIGVsbXRQYXJlbnRSZWN0LnRvcCAtIGVsbXRSZWN0LnRvcCArIGVsbXRQYXJlbnRCVFc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoV2VzdCA9IGVsbXRSZWN0LndpZHRoICsgKGVsbXRSZWN0LmxlZnQgLSBlbG10UGFyZW50UmVjdC5sZWZ0KSAtIGVsbXRQYXJlbnRCTFc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heEhlaWdodE5vcnRoID0gZWxtdFJlY3QuaGVpZ2h0ICsgKGVsbXRSZWN0LnRvcCAtIGVsbXRQYXJlbnRSZWN0LnRvcCkgLSBlbG10UGFyZW50QlRXO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoRWFzdCA9IGVsbXRQYXJlbnQuY2xpZW50V2lkdGggLSAoZWxtdFJlY3QubGVmdCAtIGVsbXRQYXJlbnRSZWN0LmxlZnQpICsgZWxtdFBhcmVudEJMVztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4SGVpZ2h0U291dGggPSBlbG10UGFyZW50LmNsaWVudEhlaWdodCAtIChlbG10UmVjdC50b3AgLSBlbG10UGFyZW50UmVjdC50b3ApICsgZWxtdFBhcmVudEJUVztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGhXZXN0ID0gZWxtdFJlY3Qud2lkdGggKyAoZWxtdFJlY3QubGVmdCAtIGVsbXRQYXJlbnRSZWN0LmxlZnQpIC0gZWxtdFBhcmVudEJMVztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4SGVpZ2h0Tm9ydGggPSBlbG10LmNsaWVudEhlaWdodCArIChlbG10UmVjdC50b3AgLSBlbG10UGFyZW50UmVjdC50b3ApIC0gZWxtdFBhcmVudEJUVztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgb3JpZ2luYWwgb3B0cy5jb250YWlubWVudCBpcyBhcnJheVxuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGFpbm1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoV2VzdCAtPSBjb250YWlubWVudFszXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heEhlaWdodE5vcnRoIC09IGNvbnRhaW5tZW50WzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGhFYXN0IC09IGNvbnRhaW5tZW50WzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF4SGVpZ2h0U291dGggLT0gY29udGFpbm1lbnRbMl07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBjYWxjdWxhdGUgY29ycmVjdGlvbnMgZm9yIHJvdGF0ZWQgcGFuZWxzXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxtdCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB3RGlmID0gcGFyc2VGbG9hdChjb21wdXRlZFN0eWxlLndpZHRoKSAtIGVsbXRSZWN0LndpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgaERpZiA9IHBhcnNlRmxvYXQoY29tcHV0ZWRTdHlsZS5oZWlnaHQpIC0gZWxtdFJlY3QuaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgeERpZiA9IHBhcnNlRmxvYXQoY29tcHV0ZWRTdHlsZS5sZWZ0KSAtIGVsbXRSZWN0LmxlZnQsXG4gICAgICAgICAgICAgICAgICAgICAgICB5RGlmID0gcGFyc2VGbG9hdChjb21wdXRlZFN0eWxlLnRvcCkgLSBlbG10UmVjdC50b3A7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbG10UGFyZW50ICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4RGlmICs9IGVsbXRQYXJlbnRSZWN0LmxlZnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB5RGlmICs9IGVsbXRQYXJlbnRSZWN0LnRvcDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZVBhbmVsID0gZnVuY3Rpb24gcmVzaXplUGFuZWwoZXZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0cmlnZ2VyIHJlc2l6ZXN0YXJ0ZWQgb25seSBvbmNlIHBlciByZXNpemVcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzaXplc3RhcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQocmVzaXplc3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0cy5zdGFydCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLnN0YXJ0LmNhbGwoZWxtdCwgZWxtdCwgeyB3aWR0aDogc3RhcnRXaWR0aCwgaGVpZ2h0OiBzdGFydEhlaWdodCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganNQYW5lbC5mcm9udChlbG10KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6ZXN0YXJ0ZWQgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHJpZ2dlciByZXNpemUgcGVybWFuZW50bHkgd2hpbGUgcmVzaXppbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQocmVzaXplKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc2l6ZUhhbmRsZUNsYXNzTGlzdC5jb250YWlucygnanNQYW5lbC1yZXNpemVpdC1lJykgfHwgcmVzaXplSGFuZGxlQ2xhc3NMaXN0LmNvbnRhaW5zKCdqc1BhbmVsLXJlc2l6ZWl0LXNlJykgfHwgcmVzaXplSGFuZGxlQ2xhc3NMaXN0LmNvbnRhaW5zKCdqc1BhbmVsLXJlc2l6ZWl0LW5lJykpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcgPSBzdGFydFdpZHRoICsgKGV2dC5jbGllbnRYIHx8IGV2dC50b3VjaGVzWzBdLmNsaWVudFgpIC0gc3RhcnRYICsgd0RpZjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodyA+PSBtYXhXaWR0aEVhc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdyA9IG1heFdpZHRoRWFzdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHcgPj0gbWF4V2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdyA9IG1heFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodyA8PSBtaW5XaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ID0gbWluV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc3R5bGUud2lkdGggPSB3ICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc2l6ZUhhbmRsZUNsYXNzTGlzdC5jb250YWlucygnanNQYW5lbC1yZXNpemVpdC1zJykgfHwgcmVzaXplSGFuZGxlQ2xhc3NMaXN0LmNvbnRhaW5zKCdqc1BhbmVsLXJlc2l6ZWl0LXNlJykgfHwgcmVzaXplSGFuZGxlQ2xhc3NMaXN0LmNvbnRhaW5zKCdqc1BhbmVsLXJlc2l6ZWl0LXN3JykpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGggPSBzdGFydEhlaWdodCArIChldnQuY2xpZW50WSB8fCBldnQudG91Y2hlc1swXS5jbGllbnRZKSAtIHN0YXJ0WSArIGhEaWY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGggPj0gbWF4SGVpZ2h0U291dGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaCA9IG1heEhlaWdodFNvdXRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaCA+PSBtYXhIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaCA9IG1heEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGggPD0gbWluSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGggPSBtaW5IZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc3R5bGUuaGVpZ2h0ID0gaCArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNpemVIYW5kbGVDbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwtcmVzaXplaXQtdycpIHx8IHJlc2l6ZUhhbmRsZUNsYXNzTGlzdC5jb250YWlucygnanNQYW5lbC1yZXNpemVpdC1udycpIHx8IHJlc2l6ZUhhbmRsZUNsYXNzTGlzdC5jb250YWlucygnanNQYW5lbC1yZXNpemVpdC1zdycpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ID0gc3RhcnRXaWR0aCArIHN0YXJ0WCAtIChldnQuY2xpZW50WCB8fCBldnQudG91Y2hlc1swXS5jbGllbnRYKSArIHdEaWY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHcgPD0gbWF4V2lkdGggJiYgdyA+PSBtaW5XaWR0aCAmJiB3IDw9IG1heFdpZHRoV2VzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLmxlZnQgPSBzdGFydExlZnQgKyAoZXZ0LmNsaWVudFggfHwgZXZ0LnRvdWNoZXNbMF0uY2xpZW50WCkgLSBzdGFydFggKyB4RGlmICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHcgPj0gbWF4V2lkdGhXZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcgPSBtYXhXaWR0aFdlc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3ID49IG1heFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcgPSBtYXhXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHcgPD0gbWluV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdyA9IG1pbldpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLndpZHRoID0gdyArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNpemVIYW5kbGVDbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwtcmVzaXplaXQtbicpIHx8IHJlc2l6ZUhhbmRsZUNsYXNzTGlzdC5jb250YWlucygnanNQYW5lbC1yZXNpemVpdC1udycpIHx8IHJlc2l6ZUhhbmRsZUNsYXNzTGlzdC5jb250YWlucygnanNQYW5lbC1yZXNpemVpdC1uZScpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoID0gc3RhcnRIZWlnaHQgKyBzdGFydFkgLSAoZXZ0LmNsaWVudFkgfHwgZXZ0LnRvdWNoZXNbMF0uY2xpZW50WSkgKyBoRGlmO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoIDw9IG1heEhlaWdodCAmJiBoID49IG1pbkhlaWdodCAmJiBoIDw9IG1heEhlaWdodE5vcnRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc3R5bGUudG9wID0gc3RhcnRUb3AgKyAoZXZ0LmNsaWVudFkgfHwgZXZ0LnRvdWNoZXNbMF0uY2xpZW50WSkgLSBzdGFydFkgKyB5RGlmICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGggPj0gbWF4SGVpZ2h0Tm9ydGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaCA9IG1heEhlaWdodE5vcnRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaCA+PSBtYXhIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaCA9IG1heEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGggPD0gbWluSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGggPSBtaW5IZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc3R5bGUuaGVpZ2h0ID0gaCArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbG10KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5jb250ZW50UmVzaXplKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IGN1cnJlbnQgcG9zaXRpb24gYW5kIHNpemUgdmFsdWVzIHdoaWxlIHJlc2l6aW5nXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxtdCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHBhcnNlRmxvYXQoc3R5bGVzLmxlZnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogcGFyc2VGbG9hdChzdHlsZXMudG9wKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodDogcGFyc2VGbG9hdChzdHlsZXMucmlnaHQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogcGFyc2VGbG9hdChzdHlsZXMuYm90dG9tKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogcGFyc2VGbG9hdChzdHlsZXMud2lkdGgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogcGFyc2VGbG9hdChzdHlsZXMuaGVpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FsbGJhY2sgd2hpbGUgcmVzaXppbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0cy5yZXNpemUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLnJlc2l6ZS5jYWxsKGVsbXQsIGVsbXQsIHZhbHVlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAganNQYW5lbC5wb2ludGVybW92ZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGl0ZW0sIHJlc2l6ZVBhbmVsLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSByZXNpemUgaGFuZGxlciB3aGVuIG1vdXNlIGxlYXZlcyBicm93c2VyIHdpbmRvdyAobW91c2VsZWF2ZSBkb2Vzbid0IHdvcmspXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5yZWxhdGVkVGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganNQYW5lbC5wb2ludGVybW92ZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoaXRlbSwgcmVzaXplUGFuZWwsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGpzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoaXRlbSwgZnVuY3Rpb24gKGUpIHtcblxuICAgICAgICAgICAgICAgIGpzUGFuZWwucG9pbnRlcm1vdmUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGl0ZW0sIHJlc2l6ZVBhbmVsLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0ICYmIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnanNQYW5lbC1yZXNpemVpdC1oYW5kbGUnKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBpc0xlZnRDaGFuZ2UgPSB2b2lkIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1RvcENoYW5nZSA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNsID0gZS50YXJnZXQuY2xhc3NOYW1lO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2wubWF0Y2goL2pzUGFuZWwtcmVzaXplaXQtbnd8anNQYW5lbC1yZXNpemVpdC13fGpzUGFuZWwtcmVzaXplaXQtc3cvaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTGVmdENoYW5nZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsLm1hdGNoKC9qc1BhbmVsLXJlc2l6ZWl0LW53fGpzUGFuZWwtcmVzaXplaXQtbnxqc1BhbmVsLXJlc2l6ZWl0LW5lL2kpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1RvcENoYW5nZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBzbmFwIHBhbmVsIHRvIGdyaWQgKGRvZXNuJ3Qgd29yayB0aGF0IHdlbGwgaWYgaW5zaWRlIGZ1bmN0aW9uIHJlc2l6ZVBhbmVsKVxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5ncmlkICYmIEFycmF5LmlzQXJyYXkob3B0cy5ncmlkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuZ3JpZC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmdyaWRbMV0gPSBvcHRzLmdyaWRbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3cgPSBwYXJzZUZsb2F0KGVsbXQuc3R5bGUud2lkdGgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoID0gcGFyc2VGbG9hdChlbG10LnN0eWxlLmhlaWdodCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kVyA9IGN3ICUgb3B0cy5ncmlkWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZEggPSBjaCAlIG9wdHMuZ3JpZFsxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjeCA9IHBhcnNlRmxvYXQoZWxtdC5zdHlsZS5sZWZ0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjeSA9IHBhcnNlRmxvYXQoZWxtdC5zdHlsZS50b3ApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZFggPSBjeCAlIG9wdHMuZ3JpZFswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RZID0gY3kgJSBvcHRzLmdyaWRbMV07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb2RXIDwgb3B0cy5ncmlkWzBdIC8gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc3R5bGUud2lkdGggPSBjdyAtIG1vZFcgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLndpZHRoID0gY3cgKyAob3B0cy5ncmlkWzBdIC0gbW9kVykgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vZEggPCBvcHRzLmdyaWRbMV0gLyAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zdHlsZS5oZWlnaHQgPSBjaCAtIG1vZEggKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLmhlaWdodCA9IGNoICsgKG9wdHMuZ3JpZFsxXSAtIG1vZEgpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTGVmdENoYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb2RYIDwgb3B0cy5ncmlkWzBdIC8gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLmxlZnQgPSBjeCAtIG1vZFggKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc3R5bGUubGVmdCA9IGN4ICsgKG9wdHMuZ3JpZFswXSAtIG1vZFgpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNUb3BDaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9kWSA8IG9wdHMuZ3JpZFsxXSAvIDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zdHlsZS50b3AgPSBjeSAtIG1vZFkgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc3R5bGUudG9wID0gY3kgKyAob3B0cy5ncmlkWzFdIC0gbW9kWSkgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbG10KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbG10LmNvbnRlbnRSZXNpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZXNpemVzdGFydGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsbXQuY29udGVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2luaGVyaXQnO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHJlc2l6ZXN0b3ApO1xuICAgICAgICAgICAgICAgICAgICByZXNpemVzdGFydGVkID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICBlbG10LnNhdmVDdXJyZW50RGltZW5zaW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdHMuc3RvcCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5zdG9wLmNhbGwoZWxtdCwgZWxtdCwgeyB3aWR0aDogcGFyc2VGbG9hdChlbG10LnN0eWxlLndpZHRoKSwgaGVpZ2h0OiBwYXJzZUZsb2F0KGVsbXQuc3R5bGUuaGVpZ2h0KSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChmcmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnaW5oZXJpdCc7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gcmVzaXplaXQgaXMgaW5pdGlhbGl6ZWQgLSBub3cgZGlzYWJsZSBpZiBzZXRcbiAgICAgICAgaWYgKG9wdHMuZGlzYWJsZSkge1xuICAgICAgICAgICAgZWxtdC5xdWVyeVNlbGVjdG9yQWxsKCcuanNQYW5lbC1yZXNpemVpdC1oYW5kbGUnKS5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGUuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsbXQ7XG4gICAgfSxcbiAgICBzZXRDbGFzczogZnVuY3Rpb24gc2V0Q2xhc3MoZWxtdCwgY2xhc3NuYW1lcykge1xuICAgICAgICBjbGFzc25hbWVzLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIGVsbXQuY2xhc3NMaXN0LmFkZChpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBlbG10O1xuICAgIH0sXG4gICAgcmVtQ2xhc3M6IGZ1bmN0aW9uIHJlbUNsYXNzKGVsbXQsIGNsYXNzbmFtZXMpIHtcbiAgICAgICAgY2xhc3NuYW1lcy5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBlbG10LmNsYXNzTGlzdC5yZW1vdmUoaXRlbSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZWxtdDtcbiAgICB9LFxuICAgIHNldFN0eWxlOiBmdW5jdGlvbiBzZXRTdHlsZShlbG10LCBzdHlsZXNvYmplY3QpIHtcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBzdHlsZXNvYmplY3QpIHtcbiAgICAgICAgICAgIGlmIChzdHlsZXNvYmplY3QuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHkgPSBTdHJpbmcocHJvcCkucmVwbGFjZSgvLVxcdy9naSwgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaC5zdWJzdHIoLTEpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZWxtdC5zdHlsZVtwcm9wZXJ0eV0gPSBzdHlsZXNvYmplY3RbcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsbXQ7XG4gICAgfSxcbiAgICBzbmFwUGFuZWw6IGZ1bmN0aW9uIHNuYXBQYW5lbChwYW5lbCwgcG9zKSB7XG4gICAgICAgIC8vIHN0b3JlIHBhbmVsIHNpemUgYmVmb3JlIGl0IHNuYXBzXG4gICAgICAgIHBhbmVsLmN1cnJlbnREYXRhLmJlZm9yZVNuYXAgPSB7XG4gICAgICAgICAgICB3aWR0aDogcGFuZWwuY3VycmVudERhdGEud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHBhbmVsLmN1cnJlbnREYXRhLmhlaWdodFxuICAgICAgICB9O1xuICAgICAgICAvLyBzbmFwIHBhbmVsXG4gICAgICAgIGlmIChwb3MgJiYgdHlwZW9mIHBvcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcG9zLmNhbGwocGFuZWwsIHBhbmVsLCBwYW5lbC5zbmFwcGFibGVUbyk7XG4gICAgICAgIH0gZWxzZSBpZiAocG9zICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgdmFyIG9mZnNldHMgPSBbMCwgMF07XG4gICAgICAgICAgICBpZiAocGFuZWwub3B0aW9ucy5kcmFnaXQuc25hcC5jb250YWlubWVudCkge1xuICAgICAgICAgICAgICAgIGlmIChwYW5lbC5vcHRpb25zLmRyYWdpdC5jb250YWlubWVudCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGFpbm1lbnQgPSB0aGlzLnBPY29udGFpbm1lbnQocGFuZWwub3B0aW9ucy5kcmFnaXQuY29udGFpbm1lbnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSBwYW5lbC5zbmFwcGFibGVUbztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uLnN0YXJ0c1dpdGgoJ2xlZnQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0c1swXSA9IGNvbnRhaW5tZW50WzNdO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvc2l0aW9uLnN0YXJ0c1dpdGgoJ3JpZ2h0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldHNbMF0gPSAtY29udGFpbm1lbnRbMV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uLmVuZHNXaXRoKCd0b3AnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0c1sxXSA9IGNvbnRhaW5tZW50WzBdO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvc2l0aW9uLmVuZHNXaXRoKCdib3R0b20nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0c1sxXSA9IC1jb250YWlubWVudFsyXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhbmVsLnJlcG9zaXRpb24ocGFuZWwuc25hcHBhYmxlVG8gKyAnICcgKyBvZmZzZXRzWzBdICsgJyAnICsgb2Zmc2V0c1sxXSk7XG4gICAgICAgICAgICBwYW5lbC5zbmFwcGVkID0gcGFuZWwuc25hcHBhYmxlVG87XG4gICAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvLyBNRVRIT0QgQ1JFQVRJTkcgVEhFIFBBTkVMIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICAgICAgdmFyIGNiID0gYXJndW1lbnRzWzFdO1xuXG5cbiAgICAgICAgdmFyIG9wdHMgPSB2b2lkIDAsXG4gICAgICAgICAgICBjbG9zZXRpbWVyID0gdm9pZCAwO1xuICAgICAgICBpZiAob3B0aW9ucy5jb25maWcpIHtcbiAgICAgICAgICAgIG9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRzLCBvcHRpb25zLmNvbmZpZywgb3B0aW9ucyk7XG4gICAgICAgICAgICBkZWxldGUgb3B0cy5jb25maWc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFvcHRzLmlkKSB7XG4gICAgICAgICAgICBvcHRzLmlkID0gJ2pzUGFuZWwtJyArIChqc1BhbmVsLmlkQ291bnRlciArPSAxKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0cy5pZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgb3B0cy5pZCA9IG9wdHMuaWQoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG9wdHMuaWQpO1xuICAgICAgICBpZiAocCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gaWYgYSBwYW5lbCB3aXRoIHBhc3NlZCBpZCBhbHJlYWR5IGV4aXN0cywgZnJvbnQgaXQgYW5kIHJldHVybiBlcnJvciBvYmplY3RcbiAgICAgICAgICAgIGlmIChwLmNsYXNzTGlzdC5jb250YWlucygnanNQYW5lbCcpKSB7XG4gICAgICAgICAgICAgICAgcC5mcm9udCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IGpzUGFuZWxFcnJvcignXFxuTk8gTkVXIFBBTkVMIENSRUFURUQhXFxuQW4gZWxlbWVudCB3aXRoIHRoZSBJRCA8JyArIG9wdHMuaWQgKyAnPiBhbHJlYWR5IGV4aXN0cyBpbiB0aGUgZG9jdW1lbnQuJyk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgICAgICBjYi5jYWxsKGUsIGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmVycm9yKGVycm9yLm5hbWUgKyAnOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgd2hldGhlciBjb250YWluZXIgaXMgdmFsaWQgLT4gaWYgbm90IHJldHVybiBhbmQgbG9nIGVycm9yXG4gICAgICAgIHZhciBwYW5lbENvbnRhaW5lciA9IHRoaXMucE9jb250YWluZXIob3B0cy5jb250YWluZXIsIGNiKTtcbiAgICAgICAgaWYgKHBhbmVsQ29udGFpbmVyICYmIHBhbmVsQ29udGFpbmVyLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmVycm9yKHBhbmVsQ29udGFpbmVyLm5hbWUgKyAnOicsIHBhbmVsQ29udGFpbmVyLm1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbm9ybWFsaXplIG1heGltaXplZE1hcmdpblxuICAgICAgICBvcHRzLm1heGltaXplZE1hcmdpbiA9IHRoaXMucE9jb250YWlubWVudChvcHRzLm1heGltaXplZE1hcmdpbik7XG5cbiAgICAgICAgLy8gbm9ybWFsaXplIHNuYXAgY29uZmlnXG4gICAgICAgIGlmIChvcHRzLmRyYWdpdCAmJiBvcHRzLmRyYWdpdC5zbmFwKSB7XG4gICAgICAgICAgICBpZiAoX3R5cGVvZihvcHRzLmRyYWdpdC5zbmFwKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBvcHRzLmRyYWdpdC5zbmFwID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0U25hcENvbmZpZywgb3B0cy5kcmFnaXQuc25hcCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9wdHMuZHJhZ2l0LnNuYXAgPSB0aGlzLmRlZmF1bHRTbmFwQ29uZmlnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb3B0cy50ZW1wbGF0ZSA9IG9wdHMudGVtcGxhdGUgfHwgZmFsc2U7XG5cbiAgICAgICAgdmFyIHNlbGYgPSBvcHRzLnRlbXBsYXRlID8gb3B0cy50ZW1wbGF0ZSA6IHRoaXMuY3JlYXRlUGFuZWxUZW1wbGF0ZSgpO1xuXG4gICAgICAgIC8vIFByb3BlcnRpZXNcbiAgICAgICAgc2VsZi5vcHRpb25zID0gb3B0cztcbiAgICAgICAgc2VsZi5zdGF0dXMgPSAnaW5pdGlhbGl6ZWQnO1xuICAgICAgICBzZWxmLmN1cnJlbnREYXRhID0ge307XG4gICAgICAgIHNlbGYuaGVhZGVyID0gc2VsZi5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1oZHInKTsgLy8gY29tcGxldGUgaGVhZGVyIHNlY3Rpb25cbiAgICAgICAgc2VsZi5oZWFkZXJiYXIgPSBzZWxmLmhlYWRlci5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1oZWFkZXJiYXInKTsgLy8gbG9nLCB0aXRsZSBhbmQgY29udHJvbHNcbiAgICAgICAgc2VsZi50aXRsZWJhciA9IHNlbGYuaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLXRpdGxlYmFyJyk7IC8vIGRpdiBzdXJyb3VuZGluZyB0aXRsZSBoM1xuICAgICAgICBzZWxmLmhlYWRlcmxvZ28gPSBzZWxmLmhlYWRlcmJhci5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1oZWFkZXJsb2dvJyk7IC8vIGxvZ28gb25seVxuICAgICAgICBzZWxmLmhlYWRlcnRpdGxlID0gc2VsZi5oZWFkZXJiYXIucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtdGl0bGUnKTsgLy8gdGl0bGUgaDNcbiAgICAgICAgc2VsZi5jb250cm9sYmFyID0gc2VsZi5oZWFkZXJiYXIucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtY29udHJvbGJhcicpOyAvLyBkaXYgc3Vycm91bmRpbmcgYWxsIGNvbnRyb2xzXG4gICAgICAgIHNlbGYuaGVhZGVydG9vbGJhciA9IHNlbGYuaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWhkci10b29sYmFyJyk7XG4gICAgICAgIHNlbGYuY29udGVudCA9IHNlbGYucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtY29udGVudCcpO1xuICAgICAgICBzZWxmLmZvb3RlciA9IHNlbGYucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtZnRyJyk7XG4gICAgICAgIHNlbGYuc25hcHBhYmxlVG8gPSBmYWxzZTtcbiAgICAgICAgc2VsZi5zbmFwcGVkID0gZmFsc2U7XG5cbiAgICAgICAgLy8gRXZlbnRzXG4gICAgICAgIHZhciBqc3BhbmVsbG9hZGVkID0gbmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVsbG9hZGVkJywgeyAnZGV0YWlsJzogb3B0cy5pZCB9KSxcbiAgICAgICAgICAgIGpzcGFuZWxiZWZvcmVjbG9zZSA9IG5ldyBDdXN0b21FdmVudCgnanNwYW5lbGJlZm9yZWNsb3NlJywgeyAnZGV0YWlsJzogb3B0cy5pZCB9KSxcbiAgICAgICAgICAgIGpzcGFuZWxjbG9zZWQgPSBuZXcgQ3VzdG9tRXZlbnQoJ2pzcGFuZWxjbG9zZWQnLCB7ICdkZXRhaWwnOiBvcHRzLmlkIH0pLFxuICAgICAgICAgICAganNwYW5lbHN0YXR1c2NoYW5nZSA9IG5ldyBDdXN0b21FdmVudCgnanNwYW5lbHN0YXR1c2NoYW5nZScsIHsgJ2RldGFpbCc6IG9wdHMuaWQgfSksXG4gICAgICAgICAgICBqc3BhbmVsYmVmb3Jlbm9ybWFsaXplID0gbmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVsYmVmb3Jlbm9ybWFsaXplJywgeyAnZGV0YWlsJzogb3B0cy5pZCB9KSxcbiAgICAgICAgICAgIGpzcGFuZWxub3JtYWxpemVkID0gbmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVsbm9ybWFsaXplZCcsIHsgJ2RldGFpbCc6IG9wdHMuaWQgfSksXG4gICAgICAgICAgICBqc3BhbmVsYmVmb3JlbWF4aW1pemUgPSBuZXcgQ3VzdG9tRXZlbnQoJ2pzcGFuZWxiZWZvcmVtYXhpbWl6ZScsIHsgJ2RldGFpbCc6IG9wdHMuaWQgfSksXG4gICAgICAgICAgICBqc3BhbmVsbWF4aW1pemVkID0gbmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVsbWF4aW1pemVkJywgeyAnZGV0YWlsJzogb3B0cy5pZCB9KSxcbiAgICAgICAgICAgIGpzcGFuZWxiZWZvcmVtaW5pbWl6ZSA9IG5ldyBDdXN0b21FdmVudCgnanNwYW5lbGJlZm9yZW1pbmltaXplJywgeyAnZGV0YWlsJzogb3B0cy5pZCB9KSxcbiAgICAgICAgICAgIGpzcGFuZWxtaW5pbWl6ZWQgPSBuZXcgQ3VzdG9tRXZlbnQoJ2pzcGFuZWxtaW5pbWl6ZWQnLCB7ICdkZXRhaWwnOiBvcHRzLmlkIH0pLFxuICAgICAgICAgICAganNwYW5lbGJlZm9yZXNtYWxsaWZ5ID0gbmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVsYmVmb3Jlc21hbGxpZnknLCB7ICdkZXRhaWwnOiBvcHRzLmlkIH0pLFxuICAgICAgICAgICAganNwYW5lbHNtYWxsaWZpZWQgPSBuZXcgQ3VzdG9tRXZlbnQoJ2pzcGFuZWxzbWFsbGlmaWVkJywgeyAnZGV0YWlsJzogb3B0cy5pZCB9KSxcbiAgICAgICAgICAgIGpzcGFuZWxzbWFsbGlmaWVkbWF4ID0gbmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVsc21hbGxpZmllZG1heCcsIHsgJ2RldGFpbCc6IG9wdHMuaWQgfSksXG4gICAgICAgICAgICBqc3BhbmVsYmVmb3JldW5zbWFsbGlmeSA9IG5ldyBDdXN0b21FdmVudCgnanNwYW5lbGJlZm9yZXVuc21hbGxpZnknLCB7ICdkZXRhaWwnOiBvcHRzLmlkIH0pLFxuICAgICAgICAgICAganNwYW5lbGZyb250ZWQgPSBuZXcgQ3VzdG9tRXZlbnQoJ2pzcGFuZWxmcm9udGVkJywgeyAnZGV0YWlsJzogb3B0cy5pZCB9KTtcblxuICAgICAgICAvLyBjb250cm9scyBoYW5kbGVyc1xuICAgICAgICB2YXIgaGFzQ2xvc2VCdG4gPSBzZWxmLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWJ0bi1jbG9zZScpLFxuICAgICAgICAgICAgaGFzTWF4QnRuID0gc2VsZi5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1idG4tbWF4aW1pemUnKSxcbiAgICAgICAgICAgIGhhc05vcm1CdG4gPSBzZWxmLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWJ0bi1ub3JtYWxpemUnKSxcbiAgICAgICAgICAgIGhhc1NtYWxsQnRuID0gc2VsZi5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1idG4tc21hbGxpZnknKSxcbiAgICAgICAgICAgIGhhc1NtYWxscmV2QnRuID0gc2VsZi5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1idG4tc21hbGxpZnlyZXYnKSxcbiAgICAgICAgICAgIGhhc01pbkJ0biA9IHNlbGYucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtYnRuLW1pbmltaXplJyk7XG5cbiAgICAgICAgaWYgKGhhc0Nsb3NlQnRuKSB7XG4gICAgICAgICAgICBqc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgaGFzQ2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcihpdGVtLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNNYXhCdG4pIHtcbiAgICAgICAgICAgIGpzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBoYXNNYXhCdG4uYWRkRXZlbnRMaXN0ZW5lcihpdGVtLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubWF4aW1pemUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNOb3JtQnRuKSB7XG4gICAgICAgICAgICBqc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgaGFzTm9ybUJ0bi5hZGRFdmVudExpc3RlbmVyKGl0ZW0sIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ub3JtYWxpemUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNTbWFsbEJ0bikge1xuICAgICAgICAgICAganNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGhhc1NtYWxsQnRuLmFkZEV2ZW50TGlzdGVuZXIoaXRlbSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNtYWxsaWZ5KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzU21hbGxyZXZCdG4pIHtcbiAgICAgICAgICAgIGpzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBoYXNTbWFsbHJldkJ0bi5hZGRFdmVudExpc3RlbmVyKGl0ZW0sIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi51bnNtYWxsaWZ5KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzTWluQnRuKSB7XG4gICAgICAgICAgICBqc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgaGFzTWluQnRuLmFkZEV2ZW50TGlzdGVuZXIoaXRlbSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm1pbmltaXplKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGltcG9ydCBleHRlbnNpb25zXG4gICAgICAgIHZhciBleHRlbnNpb25zID0ganNQYW5lbC5leHRlbnNpb25zO1xuICAgICAgICBmb3IgKHZhciBleHQgaW4gZXh0ZW5zaW9ucykge1xuICAgICAgICAgICAgaWYgKGV4dGVuc2lvbnMuaGFzT3duUHJvcGVydHkoZXh0KSkge1xuICAgICAgICAgICAgICAgIHNlbGZbZXh0XSA9IGV4dGVuc2lvbnNbZXh0XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE1ldGhvZHNcbiAgICAgICAgc2VsZi5hZGRUb29sYmFyID0gZnVuY3Rpb24gKHBsYWNlLCB0YiwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGlmIChwbGFjZSA9PT0gJ2hlYWRlcicpIHtcbiAgICAgICAgICAgICAgICBwbGFjZSA9IHNlbGYuaGVhZGVydG9vbGJhcjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPT09ICdmb290ZXInKSB7XG4gICAgICAgICAgICAgICAgcGxhY2UgPSBzZWxmLmZvb3RlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0YiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBwbGFjZS5pbm5lckhUTUwgPSB0YjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0YikpIHtcbiAgICAgICAgICAgICAgICB0Yi5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlLmlubmVySFRNTCArPSBpdGVtO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2UuYXBwZW5kKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0YiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHZhciB0b29sID0gdGIuY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRvb2wgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlLmlubmVySFRNTCA9IHRvb2w7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGxhY2UuYXBwZW5kKHRvb2wpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGxhY2UuYXBwZW5kKHRiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGxhY2UuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICBpZiAocGxhY2UgPT09IHNlbGYuZm9vdGVyKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2pzUGFuZWwtY29udGVudC1ub2Zvb3RlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5jb250ZW50UmVzaXplKCk7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5hcHBseUJ1aWx0SW5UaGVtZSA9IGZ1bmN0aW9uICh0aGVtZURldGFpbHMpIHtcbiAgICAgICAgICAgIHNlbGYuY2xhc3NMaXN0LmFkZCgnanNQYW5lbC10aGVtZS0nICsgdGhlbWVEZXRhaWxzLmNvbG9yKTsgLy8gZG8gbm90IHJlbW92ZSB0aGVtZSBmcm9tIGpzUFxuICAgICAgICAgICAgc2VsZi5oZWFkZXIuY2xhc3NMaXN0LmFkZCgnanNQYW5lbC10aGVtZS0nICsgdGhlbWVEZXRhaWxzLmNvbG9yKTtcblxuICAgICAgICAgICAgLy8gb3B0aW9uYWxseSBzZXQgdGhlbWUgZmlsbGluZ1xuICAgICAgICAgICAgaWYgKHRoZW1lRGV0YWlscy5maWxsaW5nKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jb250ZW50LnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICAgICAgICAgICAgICBzZWxmLmNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnanNQYW5lbC1jb250ZW50LScgKyB0aGVtZURldGFpbHMuZmlsbGluZyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghb3B0cy5oZWFkZXJUb29sYmFyKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jb250ZW50LnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICAgICAgICAgICAgICBzZWxmLmNvbnRlbnQuc3R5bGUuYm9yZGVyVG9wID0gJzFweCBzb2xpZCAnICsgc2VsZi5oZWFkZXJ0aXRsZS5zdHlsZS5jb2xvcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5hcHBseUFyYml0cmFyeVRoZW1lID0gZnVuY3Rpb24gKHRoZW1lRGV0YWlscykge1xuICAgICAgICAgICAgc2VsZi5oZWFkZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhlbWVEZXRhaWxzLmNvbG9yc1swXTtcbiAgICAgICAgICAgIFsnLmpzUGFuZWwtaGVhZGVybG9nbycsICcuanNQYW5lbC10aXRsZScsICcuanNQYW5lbC1oZHItdG9vbGJhciddLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBzZWxmLnF1ZXJ5U2VsZWN0b3IoaXRlbSkuc3R5bGUuY29sb3IgPSB0aGVtZURldGFpbHMuY29sb3JzWzNdO1xuICAgICAgICAgICAgfSwgc2VsZik7XG4gICAgICAgICAgICBzZWxmLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuIC5qc2dseXBoJykuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUuY29sb3IgPSB0aGVtZURldGFpbHMuY29sb3JzWzNdO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChvcHRzLmhlYWRlclRvb2xiYXIpIHtcbiAgICAgICAgICAgICAgICBqc1BhbmVsLnNldFN0eWxlKHNlbGYuaGVhZGVydG9vbGJhciwge1xuICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6ICcwIDAgMXB4ICcgKyB0aGVtZURldGFpbHMuY29sb3JzWzNdICsgJyBpbnNldCcsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnY2FsYygxMDAlICsgNHB4KScsXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQ6ICctMXB4J1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLmNvbnRlbnQuc3R5bGUuYm9yZGVyVG9wID0gJzFweCBzb2xpZCAnICsgdGhlbWVEZXRhaWxzLmNvbG9yc1szXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoZW1lRGV0YWlscy5maWxsaW5nID09PSAnZmlsbGVkJykge1xuICAgICAgICAgICAgICAgIHNlbGYuY29udGVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGVtZURldGFpbHMuY29sb3JzWzBdO1xuICAgICAgICAgICAgICAgIHNlbGYuY29udGVudC5zdHlsZS5jb2xvciA9IHRoZW1lRGV0YWlscy5jb2xvcnNbM107XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoZW1lRGV0YWlscy5maWxsaW5nID09PSAnZmlsbGVkbGlnaHQnKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jb250ZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoZW1lRGV0YWlscy5jb2xvcnNbMV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuYXBwbHlCb290c3RyYXBUaGVtZSA9IGZ1bmN0aW9uICh0aGVtZURldGFpbHMpIHtcbiAgICAgICAgICAgIHZhciBic1RoZW1lID0gdGhlbWVEZXRhaWxzLmJzdGhlbWUsXG4gICAgICAgICAgICAgICAgYnNWZXJzaW9uID0gJC5mbi5idXR0b24uQ29uc3RydWN0b3IuVkVSU0lPTlswXTtcblxuICAgICAgICAgICAgaWYgKGJzVmVyc2lvbiA9PT0gJzQnKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jbGFzc0xpc3QuYWRkKCdiZy0nICsgYnNUaGVtZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFsncGFuZWwnLCAncGFuZWwtJyArIGJzVGhlbWVdLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jbGFzc0xpc3QuYWRkKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3BhbmVsLWhlYWRpbmcnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYWRkZWQgc3VwcG9ydCBmb3IgbWF0ZXJpYWwtZGVzaWduLWZvci1ib290c3RyYXAgNC54IGNvbG9yc1xuICAgICAgICAgICAgaWYgKHRoZW1lRGV0YWlscy5icyA9PT0gJ21kYicpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWRiQ29sb3IgPSBic1RoZW1lICsgJy1jb2xvcic7XG4gICAgICAgICAgICAgICAgaWYgKHRoZW1lRGV0YWlscy5tZGJTdHlsZSkge1xuICAgICAgICAgICAgICAgICAgICBtZGJDb2xvciA9IG1kYkNvbG9yICsgJy1kYXJrJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi5jbGFzc0xpc3QuYWRkKG1kYkNvbG9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZ2V0IHByaW1hcnkgdGhlbWUgY29sb3JcbiAgICAgICAgICAgIHZhciBwQ29sb3IgPSB2b2lkIDA7XG4gICAgICAgICAgICBpZiAoYnNWZXJzaW9uID09PSAnNCcpIHtcbiAgICAgICAgICAgICAgICBwQ29sb3IgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzZWxmKS5iYWNrZ3JvdW5kQ29sb3IucmVwbGFjZSgvXFxzKy9nLCAnJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBDb2xvciA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNlbGYuaGVhZGVyKS5iYWNrZ3JvdW5kQ29sb3IucmVwbGFjZSgvXFxzKy9nLCAnJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGVtZURldGFpbHMuZmlsbGluZykge1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0VGhlbWUocENvbG9yICsgJyAnICsgdGhlbWVEZXRhaWxzLmZpbGxpbmcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNldFRoZW1lKHBDb2xvcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuYXBwbHlUaGVtZUJvcmRlciA9IGZ1bmN0aW9uICh0aGVtZURldGFpbHMpIHtcbiAgICAgICAgICAgIHZhciBib3JkZXJ2YWx1ZXMgPSBvcHRzLmJvcmRlci5zcGxpdCgnICcpO1xuICAgICAgICAgICAgc2VsZi5zdHlsZS5ib3JkZXJXaWR0aCA9IGJvcmRlcnZhbHVlc1swXTtcbiAgICAgICAgICAgIHNlbGYuc3R5bGUuYm9yZGVyU3R5bGUgPSBib3JkZXJ2YWx1ZXNbMV07XG4gICAgICAgICAgICBzZWxmLnN0eWxlLmJvcmRlckNvbG9yID0gYm9yZGVydmFsdWVzWzJdO1xuICAgICAgICAgICAgc2VsZi5oZWFkZXIuc3R5bGUuYm9yZGVyVG9wTGVmdFJhZGl1cyA9ICcxcHgnO1xuICAgICAgICAgICAgc2VsZi5oZWFkZXIuc3R5bGUuYm9yZGVyVG9wUmlnaHRSYWRpdXMgPSAnMXB4JztcbiAgICAgICAgICAgIGlmICghdGhlbWVEZXRhaWxzLmJzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGpzUGFuZWwudGhlbWVzLmluZGV4T2YodGhlbWVEZXRhaWxzLmNvbG9yKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYXJiaXRyYXJ5IHRoZW1lcyBvbmx5IChmb3IgYnVpbHQtaW4gdGhlbWVzIGl0J3MgdGFrZW4gZnJvbSB0aGUgY3NzIGZpbGUpXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcnZhbHVlc1syXSA/IHNlbGYuc3R5bGUuYm9yZGVyQ29sb3IgPSBib3JkZXJ2YWx1ZXNbMl0gOiBzZWxmLnN0eWxlLmJvcmRlckNvbG9yID0gdGhlbWVEZXRhaWxzLmNvbG9yc1swXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGJvb3RzdHJhcFxuICAgICAgICAgICAgICAgIHZhciBwQ29sb3IgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNlbGYuaGVhZGVyKS5iYWNrZ3JvdW5kQ29sb3IgPT09ICd0cmFuc3BhcmVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcENvbG9yID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoc2VsZikuYmFja2dyb3VuZENvbG9yLnJlcGxhY2UoL1xccysvZywgJycpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBDb2xvciA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNlbGYuaGVhZGVyKS5iYWNrZ3JvdW5kQ29sb3IucmVwbGFjZSgvXFxzKy9nLCAnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJvcmRlcnZhbHVlc1syXSA/IHNlbGYuc3R5bGUuYm9yZGVyQ29sb3IgPSBib3JkZXJ2YWx1ZXNbMl0gOiBzZWxmLnN0eWxlLmJvcmRlckNvbG9yID0gcENvbG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5hdXRvcG9zaXRpb25SZW1haW5pbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXV0b1BvcyA9IHZvaWQgMDtcbiAgICAgICAgICAgIFsnbGVmdC10b3AtZG93bicsICdsZWZ0LXRvcC1yaWdodCcsICdjZW50ZXItdG9wLWRvd24nLCAncmlnaHQtdG9wLWRvd24nLCAncmlnaHQtdG9wLWxlZnQnLCAnbGVmdC1ib3R0b20tdXAnLCAnbGVmdC1ib3R0b20tcmlnaHQnLCAnY2VudGVyLWJvdHRvbS11cCcsICdyaWdodC1ib3R0b20tdXAnLCAncmlnaHQtYm90dG9tLWxlZnQnXS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuY2xhc3NMaXN0LmNvbnRhaW5zKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGF1dG9Qb3MgPSBpdGVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGF1dG9Qb3MpIHtcbiAgICAgICAgICAgICAgICBvcHRzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIGF1dG9Qb3MpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5yZXBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5jYWxjU2l6ZUZhY3RvcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoc2VsZik7XG4gICAgICAgICAgICBpZiAob3B0cy5jb250YWluZXIgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhmID0gcGFyc2VGbG9hdChzZWxmLnN0eWxlLmxlZnQpIC8gKGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggLSBwYXJzZUZsb2F0KHNlbGYuc3R5bGUud2lkdGgpKTtcbiAgICAgICAgICAgICAgICBzZWxmLnZmID0gcGFyc2VGbG9hdChzZWxmLnN0eWxlLnRvcCkgLyAod2luZG93LmlubmVySGVpZ2h0IC0gcGFyc2VGbG9hdChzdHlsZXMuaGVpZ2h0KSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBwYXJlbnRTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzZWxmLnBhcmVudEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHNlbGYuaGYgPSBwYXJzZUZsb2F0KHNlbGYuc3R5bGUubGVmdCkgLyAocGFyc2VGbG9hdChwYXJlbnRTdHlsZXMud2lkdGgpIC0gcGFyc2VGbG9hdChzZWxmLnN0eWxlLndpZHRoKSk7XG4gICAgICAgICAgICAgICAgc2VsZi52ZiA9IHBhcnNlRmxvYXQoc2VsZi5zdHlsZS50b3ApIC8gKHBhcnNlRmxvYXQocGFyZW50U3R5bGVzLmhlaWdodCkgLSBwYXJzZUZsb2F0KHN0eWxlcy5oZWlnaHQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLmNsZWFyVGhlbWUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGpzUGFuZWwudGhlbWVzLmNvbmNhdChqc1BhbmVsLm1kYnRoZW1lcykuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBbJ3BhbmVsJywgJ2pzUGFuZWwtdGhlbWUtJyArIHZhbHVlLCAncGFuZWwtJyArIHZhbHVlLCB2YWx1ZSArICctY29sb3InXS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2xhc3NMaXN0LnJlbW92ZShpdGVtKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdwYW5lbC1oZWFkaW5nJywgJ2pzUGFuZWwtdGhlbWUtJyArIHZhbHVlKTtcbiAgICAgICAgICAgIH0sIHNlbGYpO1xuICAgICAgICAgICAgc2VsZi5oZWFkZXJ0aXRsZS5jbGFzc0xpc3QucmVtb3ZlKCdwYW5lbC10aXRsZScpO1xuICAgICAgICAgICAgc2VsZi5jb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3BhbmVsLWJvZHknLCAnanNQYW5lbC1jb250ZW50LWZpbGxlZCcsICdqc1BhbmVsLWNvbnRlbnQtZmlsbGVkbGlnaHQnKTtcbiAgICAgICAgICAgIHNlbGYuZm9vdGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3BhbmVsLWZvb3RlcicpO1xuICAgICAgICAgICAganNQYW5lbC5zZXRTdHlsZShzZWxmLCB7IGJhY2tncm91bmRDb2xvcjogJycsIGJvcmRlcldpZHRoOiAnJywgYm9yZGVyU3R5bGU6ICcnLCBib3JkZXJDb2xvcjogJycgfSk7XG4gICAgICAgICAgICBqc1BhbmVsLnNldFN0eWxlKHNlbGYuY29udGVudCwgeyBiYWNrZ3JvdW5kOiAnJywgYm9yZGVyOiAnJyB9KTtcbiAgICAgICAgICAgIGpzUGFuZWwuc2V0U3R5bGUoc2VsZi5oZWFkZXJ0b29sYmFyLCB7IGJveFNoYWRvdzogJycsIHdpZHRoOiAnJywgbWFyZ2luTGVmdDogJycgfSk7XG4gICAgICAgICAgICBzZWxmLmhlYWRlci5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChzZWxmLmNvbnRyb2xiYXIucXVlcnlTZWxlY3RvckFsbCgnLmpzZ2x5cGgnKSkuY29uY2F0KFtzZWxmLmhlYWRlcmxvZ28sIHNlbGYuaGVhZGVydGl0bGUsIHNlbGYuaGVhZGVydG9vbGJhciwgc2VsZi5jb250ZW50XSkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUuY29sb3IgPSAnJztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5jbG9zZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXG4gICAgICAgICAgICB2YXIgZG9DbG9zZSA9IGZ1bmN0aW9uIGRvQ2xvc2UoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhbmVsSWQgPSBvcHRzLmlkO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNsb3NldGltZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChjbG9zZXRpbWVyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZWxmLmNsb3NlQ2hpbGRwYW5lbHMoKTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzZWxmKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIGZhbHNlIGlmIHBhbmVsIHdhcyBub3QgcmVtb3ZlZCBmcm9tIGRvbVxuICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYW5lbElkKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlTWluaW1pemVkUmVwbGFjZW1lbnQoKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGpzcGFuZWxjbG9zZWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwocGFuZWxJZCwgcGFuZWxJZCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG9wdHMub25jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5vbmNsb3NlZC5jYWxsKHBhbmVsSWQsIHBhbmVsSWQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGlmIHBhbmVsIGlzIGF1dG9wb3NpdGlvbmVkIHJlcG9zaXRpb24gcmVtYWluaW5nIGF1dG9wb3NpdGlvbmVkIHBhbmVsc1xuICAgICAgICAgICAgICAgIHNlbGYuYXV0b3Bvc2l0aW9uUmVtYWluaW5nKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGpzcGFuZWxiZWZvcmVjbG9zZSk7XG5cbiAgICAgICAgICAgIGlmIChvcHRzLm9uYmVmb3JlY2xvc2UgJiYgb3B0cy5vbmJlZm9yZWNsb3NlLmNhbGwoc2VsZiwgc2VsZikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcHRzLmFuaW1hdGVPdXQpIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5hbmltYXRlSW4pIHtcbiAgICAgICAgICAgICAgICAgICAganNQYW5lbC5yZW1DbGFzcyhzZWxmLCBvcHRzLmFuaW1hdGVJbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGpzUGFuZWwuc2V0Q2xhc3Moc2VsZiwgb3B0cy5hbmltYXRlT3V0KTtcbiAgICAgICAgICAgICAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9DbG9zZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb0Nsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5jbG9zZUNoaWxkcGFuZWxzID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBzZWxmLmdldENoaWxkcGFuZWxzKCkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmNsb3NlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2VsZiwgc2VsZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLmNvbnRlbnRSZW1vdmUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGpzUGFuZWwuZW1wdHlOb2RlKHNlbGYuY29udGVudCk7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5jb250ZW50UmVzaXplID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgcGFuZWxTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzZWxmKSxcbiAgICAgICAgICAgICAgICBoZHJTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzZWxmLmhlYWRlciksXG4gICAgICAgICAgICAgICAgZnRyU3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoc2VsZi5mb290ZXIpLFxuICAgICAgICAgICAgICAgIGhkckhlaWdodCA9ICFvcHRzLmhlYWRlclJlbW92ZSA/IGhkclN0eWxlcy5oZWlnaHQgOiAwLFxuICAgICAgICAgICAgICAgIGZ0ckhlaWdodCA9IGZ0clN0eWxlcy5kaXNwbGF5ID09PSAnbm9uZScgPyAwIDogZnRyU3R5bGVzLmhlaWdodDtcbiAgICAgICAgICAgIHZhciBjb250ZW50SGVpZ2h0ID0gcGFyc2VGbG9hdChwYW5lbFN0eWxlcy5oZWlnaHQpIC0gcGFyc2VGbG9hdChoZHJIZWlnaHQpIC0gcGFyc2VGbG9hdChmdHJIZWlnaHQpIC0gcGFyc2VGbG9hdChwYW5lbFN0eWxlcy5ib3JkZXJUb3BXaWR0aCkgLSBwYXJzZUZsb2F0KHBhbmVsU3R5bGVzLmJvcmRlckJvdHRvbVdpZHRoKTtcbiAgICAgICAgICAgIHNlbGYuY29udGVudC5zdHlsZS5oZWlnaHQgPSBjb250ZW50SGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2VsZiwgc2VsZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLmNyZWF0ZU1pbmltaXplZFJlcGxhY2VtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHRwbCA9IGpzUGFuZWwuY3JlYXRlTWluaW1pemVkVGVtcGxhdGUoKSxcbiAgICAgICAgICAgICAgICBjb2xvciA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNlbGYuaGVhZGVydGl0bGUpLmNvbG9yLFxuICAgICAgICAgICAgICAgIGZvbnQgPSBvcHRzLmljb25mb250LFxuICAgICAgICAgICAgICAgIGNvbnRyb2xiYXIgPSB0cGwucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtY29udHJvbGJhcicpO1xuXG4gICAgICAgICAgICB0cGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoc2VsZi5oZWFkZXIpLmJhY2tncm91bmRDb2xvciA9PT0gJ3RyYW5zcGFyZW50JyA/IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNlbGYpLmJhY2tncm91bmRDb2xvciA6IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNlbGYuaGVhZGVyKS5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgICAgICB0cGwuaWQgPSBzZWxmLmlkICsgJy1taW4nO1xuICAgICAgICAgICAgdHBsLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWhlYWRlcmJhcicpLnJlcGxhY2VDaGlsZChzZWxmLmhlYWRlcmxvZ28uY2xvbmVOb2RlKHRydWUpLCB0cGwucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtaGVhZGVybG9nbycpKTtcbiAgICAgICAgICAgIHRwbC5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC10aXRsZWJhcicpLnJlcGxhY2VDaGlsZChzZWxmLmhlYWRlcnRpdGxlLmNsb25lTm9kZSh0cnVlKSwgdHBsLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLXRpdGxlJykpO1xuICAgICAgICAgICAgdHBsLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLXRpdGxlJykuc3R5bGUuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgICAgIGNvbnRyb2xiYXIuc3R5bGUuY29sb3IgPSBjb2xvcjtcblxuICAgICAgICAgICAgLy8gc2V0IGljb25mb250XG4gICAgICAgICAgICBzZWxmLnNldEljb25mb250KGZvbnQsIHRwbCk7XG5cbiAgICAgICAgICAgIGlmIChzZWxmLmRhdGFzZXQuYnRubm9ybWFsaXplID09PSAnZW5hYmxlZCcpIHtcbiAgICAgICAgICAgICAgICBqc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdHBsLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWJ0bi1ub3JtYWxpemUnKS5hZGRFdmVudExpc3RlbmVyKGV2dCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5ub3JtYWxpemUoKS5yZW1vdmVNaW5pbWl6ZWRSZXBsYWNlbWVudCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udHJvbGJhci5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1idG4tbm9ybWFsaXplJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZWxmLmRhdGFzZXQuYnRubWF4aW1pemUgPT09ICdlbmFibGVkJykge1xuICAgICAgICAgICAgICAgIGpzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAgICAgICAgICAgICB0cGwucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtYnRuLW1heGltaXplJykuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubWF4aW1pemUoKS5yZW1vdmVNaW5pbWl6ZWRSZXBsYWNlbWVudCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udHJvbGJhci5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1idG4tbWF4aW1pemUnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YXNldC5idG5jbG9zZSA9PT0gJ2VuYWJsZWQnKSB7XG4gICAgICAgICAgICAgICAganNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRwbC5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1idG4tY2xvc2UnKS5hZGRFdmVudExpc3RlbmVyKGV2dCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZW1vdmVNaW5pbWl6ZWRSZXBsYWNlbWVudCgpLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250cm9sYmFyLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWJ0bi1jbG9zZScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cGw7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5mcm9udCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAganNQYW5lbC5mcm9udChzZWxmKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoanNwYW5lbGZyb250ZWQpO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRzLm9uZnJvbnRlZCkge1xuICAgICAgICAgICAgICAgIG9wdHMub25mcm9udGVkLmNhbGwoc2VsZiwgc2VsZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLmdldENoaWxkcGFuZWxzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHNlbGYuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanNQYW5lbCcpKTtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLmdldFRoZW1lRGV0YWlscyA9IGZ1bmN0aW9uICh0aCkge1xuICAgICAgICAgICAgdmFyIHBhc3NlZFRoZW1lID0gdGgudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8gL2csICcnKSxcbiAgICAgICAgICAgICAgICB0aGVtZSA9IHsgY29sb3I6IGZhbHNlLCBjb2xvcnM6IGZhbHNlLCBmaWxsaW5nOiBmYWxzZSwgYnM6IGZhbHNlLCBic3RoZW1lOiBmYWxzZSB9O1xuXG4gICAgICAgICAgICBpZiAocGFzc2VkVGhlbWUuc3Vic3RyKC02LCA2KSA9PT0gJ2ZpbGxlZCcpIHtcbiAgICAgICAgICAgICAgICB0aGVtZS5maWxsaW5nID0gJ2ZpbGxlZCc7XG4gICAgICAgICAgICAgICAgdGhlbWUuY29sb3IgPSBwYXNzZWRUaGVtZS5zdWJzdHIoMCwgcGFzc2VkVGhlbWUubGVuZ3RoIC0gNik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhc3NlZFRoZW1lLnN1YnN0cigtMTEsIDExKSA9PT0gJ2ZpbGxlZGxpZ2h0Jykge1xuICAgICAgICAgICAgICAgIHRoZW1lLmZpbGxpbmcgPSAnZmlsbGVkbGlnaHQnO1xuICAgICAgICAgICAgICAgIHRoZW1lLmNvbG9yID0gcGFzc2VkVGhlbWUuc3Vic3RyKDAsIHBhc3NlZFRoZW1lLmxlbmd0aCAtIDExKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhlbWUuZmlsbGluZyA9ICcnO1xuICAgICAgICAgICAgICAgIHRoZW1lLmNvbG9yID0gcGFzc2VkVGhlbWU7IC8vIHRoZW1lRGV0YWlscy5jb2xvciBpcyB0aGUgcHJpbWFyeSBjb2xvclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhlbWUuY29sb3JzID0ganNQYW5lbC5jYWxjQ29sb3JzKHRoZW1lLmNvbG9yKTtcblxuICAgICAgICAgICAgLy8gaWYgZmlyc3QgcGFydCBvZiB0aGVtZSBpbmNsdWRlcyBhIFwiLVwiIGl0J3MgYXNzdW1lZCB0byBiZSBhIGJvb3RzdHJhcCB0aGVtZVxuICAgICAgICAgICAgaWYgKHRoZW1lLmNvbG9yLm1hdGNoKCctJykpIHtcbiAgICAgICAgICAgICAgICB2YXIgYnNWYXJpYW50ID0gdGhlbWUuY29sb3Iuc3BsaXQoJy0nKTtcbiAgICAgICAgICAgICAgICB0aGVtZS5icyA9IGJzVmFyaWFudFswXTtcbiAgICAgICAgICAgICAgICB0aGVtZS5ic3RoZW1lID0gYnNWYXJpYW50WzFdO1xuICAgICAgICAgICAgICAgIHRoZW1lLm1kYlN0eWxlID0gYnNWYXJpYW50WzJdIHx8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoZW1lO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuaXNDaGlsZHBhbmVsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gaWYgcGFuZWwgaXMgY2hpbGRwYW5lbCBvZiBhbm90aGVyIHBhbmVsIHJldHVybnMgcGFyZW50cGFuZWxcbiAgICAgICAgICAgIHZhciBwcCA9IHNlbGYuY2xvc2VzdCgnLmpzUGFuZWwtY29udGVudCcpO1xuICAgICAgICAgICAgcmV0dXJuIHBwID8gcHAucGFyZW50Tm9kZSA6IGZhbHNlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYubWF4aW1pemUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIC8vIE5vdGU6IGRvIG5vdCBkaXNhYmxlIG1heGltaXplIG1ldGhvZCBmb3IgYWxyZWFkeSBtYXhpbWl6ZWQgcGFuZWxzIC0+IG9ud2luZG93cmVzaXplIHdvdWxkbid0IHdvcmtcbiAgICAgICAgICAgIGlmIChvcHRzLm9uYmVmb3JlbWF4aW1pemUgJiYgb3B0cy5vbmJlZm9yZW1heGltaXplLmNhbGwoc2VsZiwgc2VsZikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoanNwYW5lbGJlZm9yZW1heGltaXplKTtcblxuICAgICAgICAgICAgdmFyIHBhcmVudCA9IHNlbGYucGFyZW50Tm9kZSxcbiAgICAgICAgICAgICAgICBtYXJnaW5zID0gb3B0cy5tYXhpbWl6ZWRNYXJnaW47XG5cbiAgICAgICAgICAgIGlmIChwYXJlbnQgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgICAgICAgICAvLyBtYXhpbWl6ZSB3aXRoaW4gd2luZG93XG4gICAgICAgICAgICAgICAgc2VsZi5zdHlsZS53aWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCAtIG1hcmdpbnNbMV0gLSBtYXJnaW5zWzNdICsgJ3B4JztcbiAgICAgICAgICAgICAgICBzZWxmLnN0eWxlLmhlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgLSBtYXJnaW5zWzBdIC0gbWFyZ2luc1syXSArICdweCc7XG4gICAgICAgICAgICAgICAgc2VsZi5zdHlsZS5sZWZ0ID0gbWFyZ2luc1szXSArICdweCc7XG4gICAgICAgICAgICAgICAgc2VsZi5zdHlsZS50b3AgPSBtYXJnaW5zWzBdICsgJ3B4JztcblxuICAgICAgICAgICAgICAgIGlmICghb3B0cy5wb3NpdGlvbi5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnN0eWxlLmxlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQgKyBtYXJnaW5zWzNdICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zdHlsZS50b3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgKyBtYXJnaW5zWzBdICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG1heGltaXplIHdpdGhpbiBwYXJlbnROb2RlXG4gICAgICAgICAgICAgICAgc2VsZi5zdHlsZS53aWR0aCA9IHBhcmVudC5jbGllbnRXaWR0aCAtIG1hcmdpbnNbMV0gLSBtYXJnaW5zWzNdICsgJ3B4JztcbiAgICAgICAgICAgICAgICBzZWxmLnN0eWxlLmhlaWdodCA9IHBhcmVudC5jbGllbnRIZWlnaHQgLSBtYXJnaW5zWzBdIC0gbWFyZ2luc1syXSArICdweCc7XG4gICAgICAgICAgICAgICAgc2VsZi5zdHlsZS5sZWZ0ID0gbWFyZ2luc1szXSArICdweCc7XG4gICAgICAgICAgICAgICAgc2VsZi5zdHlsZS50b3AgPSBtYXJnaW5zWzBdICsgJ3B4JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZi5jb250ZW50UmVzaXplKCk7XG4gICAgICAgICAgICBzZWxmLnJlbW92ZU1pbmltaXplZFJlcGxhY2VtZW50KCk7XG4gICAgICAgICAgICBzZWxmLnN0YXR1cyA9ICdtYXhpbWl6ZWQnO1xuICAgICAgICAgICAgc2VsZi5zZXRDb250cm9scyhbJy5qc1BhbmVsLWJ0bi1tYXhpbWl6ZScsICcuanNQYW5lbC1idG4tc21hbGxpZnlyZXYnXSk7XG4gICAgICAgICAgICBqc1BhbmVsLmZyb250KHNlbGYpO1xuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsbWF4aW1pemVkKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoanNwYW5lbHN0YXR1c2NoYW5nZSk7XG5cbiAgICAgICAgICAgIGlmIChvcHRzLm9uc3RhdHVzY2hhbmdlICYmIG9wdHMub25zdGF0dXNjaGFuZ2UuY2FsbChzZWxmLCBzZWxmKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdHMub25tYXhpbWl6ZWQpIHtcbiAgICAgICAgICAgICAgICBvcHRzLm9ubWF4aW1pemVkLmNhbGwoc2VsZiwgc2VsZik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYubWluaW1pemUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGlmIChzZWxmLnN0YXR1cyA9PT0gJ21pbmltaXplZCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdHMub25iZWZvcmVtaW5pbWl6ZSAmJiBvcHRzLm9uYmVmb3JlbWluaW1pemUuY2FsbChzZWxmLCBzZWxmKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsYmVmb3JlbWluaW1pemUpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgY29udGFpbmVyIGZvciBtaW5pbWl6ZWQgcmVwbGFjZW1lbnRzIGlmIG5vdCBhbHJlYWR5IHRoZXJlXG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lcicpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlcGxhY2VtZW50Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgcmVwbGFjZW1lbnRDb250YWluZXIuaWQgPSAnanNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXInO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKHJlcGxhY2VtZW50Q29udGFpbmVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZi5zdHlsZS5sZWZ0ID0gJy05OTk5cHgnO1xuICAgICAgICAgICAgc2VsZi5zdGF0dXNCZWZvcmUgPSBzZWxmLnN0YXR1cztcbiAgICAgICAgICAgIHNlbGYuc3RhdHVzID0gJ21pbmltaXplZCc7XG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGpzcGFuZWxtaW5pbWl6ZWQpO1xuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsc3RhdHVzY2hhbmdlKTtcblxuICAgICAgICAgICAgaWYgKG9wdHMub25zdGF0dXNjaGFuZ2UgJiYgb3B0cy5vbnN0YXR1c2NoYW5nZS5jYWxsKHNlbGYsIHNlbGYpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3B0cy5taW5pbWl6ZVRvKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlcGxhY2VtZW50ID0gc2VsZi5jcmVhdGVNaW5pbWl6ZWRSZXBsYWNlbWVudCgpO1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLm1pbmltaXplVG8gPT09ICdkZWZhdWx0Jykge1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXInKS5hcHBlbmQocmVwbGFjZW1lbnQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250YWluZXIgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0cy5taW5pbWl6ZVRvID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMubWluaW1pemVUbyA9PT0gJ3BhcmVudHBhbmVsJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSBzZWxmLmNsb3Nlc3QoJy5qc1BhbmVsLWNvbnRlbnQnKS5wYXJlbnROb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0ID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qc1BhbmVsLW1pbmltaXplZC1ib3gnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIgPSBsaXN0W2xpc3QubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0cy5taW5pbWl6ZVRvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IG9wdHMubWluaW1pemVUbztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kKHJlcGxhY2VtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2VsZiwgc2VsZik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcHRzLm9ubWluaW1pemVkKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5vbm1pbmltaXplZC5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgaWYgKHNlbGYuc3RhdHVzID09PSAnbm9ybWFsaXplZCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdHMub25iZWZvcmVub3JtYWxpemUgJiYgb3B0cy5vbmJlZm9yZW5vcm1hbGl6ZS5jYWxsKHNlbGYsIHNlbGYpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGpzcGFuZWxiZWZvcmVub3JtYWxpemUpO1xuICAgICAgICAgICAgc2VsZi5zdHlsZS53aWR0aCA9IHNlbGYuY3VycmVudERhdGEud2lkdGg7XG4gICAgICAgICAgICBzZWxmLnN0eWxlLmhlaWdodCA9IHNlbGYuY3VycmVudERhdGEuaGVpZ2h0O1xuICAgICAgICAgICAgc2VsZi5jb250ZW50UmVzaXplKCk7XG4gICAgICAgICAgICBzZWxmLnN0eWxlLmxlZnQgPSBzZWxmLmN1cnJlbnREYXRhLmxlZnQ7XG4gICAgICAgICAgICBzZWxmLnN0eWxlLnRvcCA9IHNlbGYuY3VycmVudERhdGEudG9wO1xuICAgICAgICAgICAgc2VsZi5yZW1vdmVNaW5pbWl6ZWRSZXBsYWNlbWVudCgpO1xuICAgICAgICAgICAgc2VsZi5zdGF0dXMgPSAnbm9ybWFsaXplZCc7XG4gICAgICAgICAgICBzZWxmLnNldENvbnRyb2xzKFsnLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZScsICcuanNQYW5lbC1idG4tc21hbGxpZnlyZXYnXSk7XG4gICAgICAgICAgICBqc1BhbmVsLmZyb250KHNlbGYpO1xuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsbm9ybWFsaXplZCk7XG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGpzcGFuZWxzdGF0dXNjaGFuZ2UpO1xuXG4gICAgICAgICAgICBpZiAob3B0cy5vbnN0YXR1c2NoYW5nZSAmJiBvcHRzLm9uc3RhdHVzY2hhbmdlLmNhbGwoc2VsZiwgc2VsZikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2VsZiwgc2VsZik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcHRzLm9ubm9ybWFsaXplZCkge1xuICAgICAgICAgICAgICAgIG9wdHMub25ub3JtYWxpemVkLmNhbGwoc2VsZiwgc2VsZik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYucmVtb3ZlTWluaW1pemVkUmVwbGFjZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZWxtdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGYuaWQgKyAnLW1pbicpO1xuICAgICAgICAgICAgaWYgKGVsbXQpIHtcbiAgICAgICAgICAgICAgICBlbG10LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxtdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLnJlcG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgcGFyYW1zID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcG9zID0gb3B0cy5wb3NpdGlvbixcbiAgICAgICAgICAgICAgICB1cGRhdGVDYWNoZSA9IHRydWUsXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSB2b2lkIDA7XG4gICAgICAgICAgICBwYXJhbXMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih2YWx1ZSkpID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBwb3MgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUNhY2hlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAganNQYW5lbC5wb3NpdGlvbihzZWxmLCBwb3MpO1xuICAgICAgICAgICAgaWYgKHVwZGF0ZUNhY2hlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zYXZlQ3VycmVudFBvc2l0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5yZXBvc2l0aW9uT25TbmFwID0gZnVuY3Rpb24gKHBvcykge1xuICAgICAgICAgICAgdmFyIG9mZnNldFggPSAnMCcsXG4gICAgICAgICAgICAgICAgb2Zmc2V0WSA9ICcwJztcbiAgICAgICAgICAgIHZhciBtYXJnaW5zID0ganNQYW5lbC5wT2NvbnRhaW5tZW50KG9wdHMuZHJhZ2l0LmNvbnRhaW5tZW50KTtcbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSBvZmZzZXRzXG4gICAgICAgICAgICBpZiAob3B0cy5kcmFnaXQuc25hcC5jb250YWlubWVudCkge1xuICAgICAgICAgICAgICAgIGlmIChwb3MgPT09ICdsZWZ0LXRvcCcpIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WCA9IG1hcmdpbnNbM107XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFkgPSBtYXJnaW5zWzBdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9zID09PSAncmlnaHQtdG9wJykge1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRYID0gLW1hcmdpbnNbMV07XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFkgPSBtYXJnaW5zWzBdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9zID09PSAncmlnaHQtYm90dG9tJykge1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRYID0gLW1hcmdpbnNbMV07XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFkgPSAtbWFyZ2luc1syXTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvcyA9PT0gJ2xlZnQtYm90dG9tJykge1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRYID0gbWFyZ2luc1szXTtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WSA9IC1tYXJnaW5zWzJdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9zID09PSAnY2VudGVyLXRvcCcpIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WCA9IG1hcmdpbnNbM10gLyAyIC0gbWFyZ2luc1sxXSAvIDI7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFkgPSBtYXJnaW5zWzBdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9zID09PSAnY2VudGVyLWJvdHRvbScpIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WCA9IG1hcmdpbnNbM10gLyAyIC0gbWFyZ2luc1sxXSAvIDI7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFkgPSAtbWFyZ2luc1syXTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvcyA9PT0gJ2xlZnQtY2VudGVyJykge1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRYID0gbWFyZ2luc1szXTtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WSA9IG1hcmdpbnNbMF0gLyAyIC0gbWFyZ2luc1syXSAvIDI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb3MgPT09ICdyaWdodC1jZW50ZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFggPSAtbWFyZ2luc1sxXTtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WSA9IG1hcmdpbnNbMF0gLyAyIC0gbWFyZ2luc1syXSAvIDI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyoganNQYW5lbC5wb3NpdGlvbihzZWxmLCBgJHtwb3N9ICR7b2Zmc2V0WH0gJHtvZmZzZXRZfWApO1xyXG4gICAgICAgICAgICAgICBGb3Igc29tZSByZWFzb24gSSBjb3VsZCBub3QgZmluZCB0aGUgbGluZSBhYm92ZSBkb2VzIG5vdCB3b3JrIChwb3MgYW5kIG9mZnNldHMgaW4gb25lIHN0cmluZyksIGJ1dCBvbmx5IHdoZW5cclxuICAgICAgICAgICAgICAgY2VudGVyLWJvdHRvbSBpcyB1c2VkIHdpdGggZGlmZmVyZW50IHNldHRpbmdzIGZvciBsZWZ0L3JpZ2h0IG1hcmdpbi5cclxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGpzUGFuZWwucG9zaXRpb24oc2VsZiwgcG9zKTtcbiAgICAgICAgICAgIGpzUGFuZWwuc2V0U3R5bGUoc2VsZiwge1xuICAgICAgICAgICAgICAgIGxlZnQ6ICdjYWxjKCcgKyBzZWxmLnN0eWxlLmxlZnQgKyAnICsgJyArIG9mZnNldFggKyAncHgpJyxcbiAgICAgICAgICAgICAgICB0b3A6ICdjYWxjKCcgKyBzZWxmLnN0eWxlLnRvcCArICcgKyAnICsgb2Zmc2V0WSArICdweCknXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLnJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgcGFyYW1zID0gQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgICAgICAgICBwYXJhbXNbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGRpbWVuc2lvbnMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzZWxmKTtcbiAgICAgICAgICAgIHZhciBzaXplID0geyB3aWR0aDogZGltZW5zaW9ucy53aWR0aCwgaGVpZ2h0OiBkaW1lbnNpb25zLmhlaWdodCB9LFxuICAgICAgICAgICAgICAgIHVwZGF0ZUNhY2hlID0gdHJ1ZSxcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IHZvaWQgMDtcbiAgICAgICAgICAgIHBhcmFtcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNpemUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHZhbHVlKSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNpemUgPSBPYmplY3QuYXNzaWduKHNpemUsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUNhY2hlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIHZhbHVlcyA9IGpzUGFuZWwucE9zaXplKHNlbGYsIHNpemUpO1xuICAgICAgICAgICAgc2VsZi5zdHlsZS53aWR0aCA9IHZhbHVlcy53aWR0aDtcbiAgICAgICAgICAgIHNlbGYuc3R5bGUuaGVpZ2h0ID0gdmFsdWVzLmhlaWdodDtcbiAgICAgICAgICAgIHNlbGYuY29udGVudFJlc2l6ZSgpO1xuICAgICAgICAgICAgaWYgKHVwZGF0ZUNhY2hlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zYXZlQ3VycmVudERpbWVuc2lvbnMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2VsZiwgc2VsZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLnNhdmVDdXJyZW50RGltZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBub3JtRGF0YSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNlbGYpO1xuICAgICAgICAgICAgc2VsZi5jdXJyZW50RGF0YS53aWR0aCA9IG5vcm1EYXRhLndpZHRoO1xuICAgICAgICAgICAgaWYgKHNlbGYuc3RhdHVzID09PSAnbm9ybWFsaXplZCcpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnREYXRhLmhlaWdodCA9IG5vcm1EYXRhLmhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2VsZi5zYXZlQ3VycmVudFBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG5vcm1EYXRhID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoc2VsZik7XG4gICAgICAgICAgICBzZWxmLmN1cnJlbnREYXRhLmxlZnQgPSBub3JtRGF0YS5sZWZ0O1xuICAgICAgICAgICAgc2VsZi5jdXJyZW50RGF0YS50b3AgPSBub3JtRGF0YS50b3A7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5zZXRDb250cm9scyA9IGZ1bmN0aW9uIChzZWwsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBzZWxmLmhlYWRlci5xdWVyeVNlbGVjdG9yQWxsKCcuanNQYW5lbC1idG4nKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VsLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICB2YXIgYnRuID0gc2VsZi5jb250cm9sYmFyLnF1ZXJ5U2VsZWN0b3IoaXRlbSk7XG4gICAgICAgICAgICAgICAgaWYgKGJ0bikge1xuICAgICAgICAgICAgICAgICAgICBidG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2VsZiwgc2VsZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLnNldENvbnRyb2xTdGF0dXMgPSBmdW5jdGlvbiAoY3RybCkge1xuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJ2VuYWJsZSc7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBhcmd1bWVudHNbMl07XG5cbiAgICAgICAgICAgIGlmIChhY3Rpb24gPT09ICdkaXNhYmxlJykge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLmdldEF0dHJpYnV0ZSgnZGF0YS1idG4nICsgY3RybCkgIT09ICdyZW1vdmVkJykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEF0dHJpYnV0ZSgnZGF0YS1idG4nICsgY3RybCwgJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBidG4gPSBzZWxmLmNvbnRyb2xiYXIucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtYnRuLScgKyBjdHJsKTtcbiAgICAgICAgICAgICAgICAgICAgYnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgIGJ0bi5zdHlsZS5vcGFjaXR5ID0gMC40O1xuICAgICAgICAgICAgICAgICAgICBidG4uc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAnZW5hYmxlJykge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLmdldEF0dHJpYnV0ZSgnZGF0YS1idG4nICsgY3RybCkgIT09ICdyZW1vdmVkJykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEF0dHJpYnV0ZSgnZGF0YS1idG4nICsgY3RybCwgJ2VuYWJsZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9idG4gPSBzZWxmLmNvbnRyb2xiYXIucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtYnRuLScgKyBjdHJsKTtcbiAgICAgICAgICAgICAgICAgICAgX2J0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuICAgICAgICAgICAgICAgICAgICBfYnRuLnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICAgICAgICAgICAgICBfYnRuLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gJ3JlbW92ZScpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2J0bjIgPSBzZWxmLmNvbnRyb2xiYXIucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtYnRuLScgKyBjdHJsKTtcbiAgICAgICAgICAgICAgICBzZWxmLmNvbnRyb2xiYXIucmVtb3ZlQ2hpbGQoX2J0bjIpO1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0QXR0cmlidXRlKCdkYXRhLWJ0bicgKyBjdHJsLCAncmVtb3ZlZCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5zZXRIZWFkZXJDb250cm9scyA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIGNvbnRyb2xzID0gWydjbG9zZScsICdtYXhpbWl6ZScsICdub3JtYWxpemUnLCAnbWluaW1pemUnLCAnc21hbGxpZnknLCAnc21hbGxpZnlyZXYnXSxcbiAgICAgICAgICAgICAgICBvcHRpb24gPSBvcHRzLmhlYWRlckNvbnRyb2xzO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbiA9PT0gJ25vbmUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0Q29udHJvbFN0YXR1cyhpdGVtLCAncmVtb3ZlJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9uID09PSAnY2xvc2Vvbmx5Jykge1xuICAgICAgICAgICAgICAgICAgICBjb250cm9scy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbSAhPT0gJ2Nsb3NlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0Q29udHJvbFN0YXR1cyhpdGVtLCAncmVtb3ZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udHJvbHMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uW2l0ZW1dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldENvbnRyb2xTdGF0dXMoaXRlbSwgb3B0aW9uW2l0ZW1dKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuc2V0SGVhZGVyTG9nbyA9IGZ1bmN0aW9uIChoZHJMb2dvLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBoZHJMb2dvID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlmIChoZHJMb2dvLnN1YnN0cigwLCAxKSAhPT0gJzwnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlzIGFzc3VtZWQgdG8gYmUgYW4gaW1nIHVybFxuICAgICAgICAgICAgICAgICAgICB2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICAgICAgICAgIGltZy5zdHlsZS5tYXhIZWlnaHQgPSBnZXRDb21wdXRlZFN0eWxlKHNlbGYuaGVhZGVyYmFyKS5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGltZy5zcmMgPSBoZHJMb2dvO1xuICAgICAgICAgICAgICAgICAgICBqc1BhbmVsLmVtcHR5Tm9kZShzZWxmLmhlYWRlcmxvZ28pO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmhlYWRlcmxvZ28uYXBwZW5kKGltZyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5oZWFkZXJsb2dvLmlubmVySFRNTCA9IGhkckxvZ287XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBhc3N1bWVkIHRvIGJlIGEgbm9kZSBvYmplY3RcbiAgICAgICAgICAgICAgICBqc1BhbmVsLmVtcHR5Tm9kZShzZWxmLmhlYWRlcmxvZ28pO1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhZGVybG9nby5hcHBlbmQoaGRyTG9nbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5zZXRIZWFkZXJSZW1vdmUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHNlbGYucmVtb3ZlQ2hpbGQoc2VsZi5oZWFkZXIpO1xuICAgICAgICAgICAgc2VsZi5jb250ZW50LmNsYXNzTGlzdC5hZGQoJ2pzUGFuZWwtY29udGVudC1ub2hlYWRlcicpO1xuICAgICAgICAgICAgWydjbG9zZScsICdtYXhpbWl6ZScsICdub3JtYWxpemUnLCAnbWluaW1pemUnLCAnc21hbGxpZnknLCAnc21hbGxpZnlyZXYnXS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYnRuJyArIGl0ZW0sICdyZW1vdmVkJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuc2V0SGVhZGVyVGl0bGUgPSBmdW5jdGlvbiAoaGRyVGl0bGUsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGhkclRpdGxlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhZGVydGl0bGUuaW5uZXJIVE1MID0gaGRyVGl0bGU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBoZHJUaXRsZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGpzUGFuZWwuZW1wdHlOb2RlKHNlbGYuaGVhZGVydGl0bGUpO1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhZGVydGl0bGUuaW5uZXJIVE1MID0gaGRyVGl0bGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gYXNzdW1lZCB0byBiZSBhIG5vZGUgb2JqZWN0XG4gICAgICAgICAgICAgICAganNQYW5lbC5lbXB0eU5vZGUoc2VsZi5oZWFkZXJ0aXRsZSk7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWFkZXJ0aXRsZS5hcHBlbmQoaGRyVGl0bGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuc2V0SWNvbmZvbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZm9udCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogJ2pzZ2x5cGgnO1xuICAgICAgICAgICAgdmFyIHBhbmVsID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBzZWxmO1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gYXJndW1lbnRzWzJdO1xuXG4gICAgICAgICAgICBpZiAoZm9udCAhPT0gJ2pzZ2x5cGgnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNsYXNzQXJyYXkgPSB2b2lkIDAsXG4gICAgICAgICAgICAgICAgICAgIHRleHRBcnJheSA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICBpZiAoZm9udCA9PT0gJ2Jvb3RzdHJhcCcgfHwgZm9udCA9PT0gJ2dseXBoaWNvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NBcnJheSA9IFsnZ2x5cGhpY29uIGdseXBoaWNvbi1yZW1vdmUnLCAnZ2x5cGhpY29uIGdseXBoaWNvbi1mdWxsc2NyZWVuJywgJ2dseXBoaWNvbiBnbHlwaGljb24tcmVzaXplLWZ1bGwnLCAnZ2x5cGhpY29uIGdseXBoaWNvbi1taW51cycsICdnbHlwaGljb24gZ2x5cGhpY29uLWNoZXZyb24tZG93bicsICdnbHlwaGljb24gZ2x5cGhpY29uLWNoZXZyb24tdXAnXTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvbnQgPT09ICdmYScgfHwgZm9udCA9PT0gJ2ZhcicgfHwgZm9udCA9PT0gJ2ZhbCcgfHwgZm9udCA9PT0gJ2ZhcycpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NBcnJheSA9IFtmb250ICsgJyBmYS13aW5kb3ctY2xvc2UnLCBmb250ICsgJyBmYS13aW5kb3ctbWF4aW1pemUnLCBmb250ICsgJyBmYS13aW5kb3ctcmVzdG9yZScsIGZvbnQgKyAnIGZhLXdpbmRvdy1taW5pbWl6ZScsIGZvbnQgKyAnIGZhLWNoZXZyb24tZG93bicsIGZvbnQgKyAnIGZhLWNoZXZyb24tdXAnXTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvbnQgPT09ICdtYXRlcmlhbC1pY29ucycpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NBcnJheSA9IFtmb250LCBmb250LCBmb250LCBmb250LCBmb250LCBmb250XTtcbiAgICAgICAgICAgICAgICAgICAgdGV4dEFycmF5ID0gWydjbG9zZScsICdmdWxsc2NyZWVuJywgJ2Z1bGxzY3JlZW5fZXhpdCcsICdjYWxsX3JlY2VpdmVkJywgJ2V4cGFuZF9tb3JlJywgJ2V4cGFuZF9sZXNzJ107XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGZvbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzQXJyYXkgPSBbJ2N1c3RvbS1jb250cm9sLWljb24gJyArIGZvbnRbNV0sICdjdXN0b20tY29udHJvbC1pY29uICcgKyBmb250WzRdLCAnY3VzdG9tLWNvbnRyb2wtaWNvbiAnICsgZm9udFszXSwgJ2N1c3RvbS1jb250cm9sLWljb24gJyArIGZvbnRbMl0sICdjdXN0b20tY29udHJvbC1pY29uICcgKyBmb250WzFdLCAnY3VzdG9tLWNvbnRyb2wtaWNvbiAnICsgZm9udFswXV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhbmVsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChwYW5lbC5xdWVyeVNlbGVjdG9yQWxsKCcuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0biA+IHNwYW4nKSkucmV2ZXJzZSgpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc05hbWUgPSBjbGFzc0FycmF5W2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm9udCA9PT0gJ21hdGVyaWFsLWljb25zJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS50ZXh0Q29udGVudCA9IHRleHRBcnJheVtpXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChwYW5lbCwgcGFuZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHBhbmVsO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuc2V0UnRsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgW3NlbGYuaGVhZGVyLCBzZWxmLmhlYWRlcmJhciwgc2VsZi50aXRsZWJhciwgc2VsZi5jb250cm9sYmFyLCBzZWxmLmhlYWRlcnRvb2xiYXIsIHNlbGYuZm9vdGVyXS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdqc1BhbmVsLXJ0bCcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBbc2VsZi5oZWFkZXJ0aXRsZSwgc2VsZi5oZWFkZXJ0b29sYmFyLCBzZWxmLmNvbnRlbnQsIHNlbGYuZm9vdGVyXS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5kaXIgPSAncnRsJztcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5ydGwubGFuZykge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmxhbmcgPSBvcHRzLnJ0bC5sYW5nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuc2V0U2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChvcHRzLnBhbmVsU2l6ZSkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBqc1BhbmVsLnBPc2l6ZShzZWxmLCBvcHRzLnBhbmVsU2l6ZSk7XG4gICAgICAgICAgICAgICAgc2VsZi5zdHlsZS53aWR0aCA9IHZhbHVlcy53aWR0aDtcbiAgICAgICAgICAgICAgICBzZWxmLnN0eWxlLmhlaWdodCA9IHZhbHVlcy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgc2VsZi5jb250ZW50UmVzaXplKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wdHMuY29udGVudFNpemUpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3ZhbHVlcyA9IGpzUGFuZWwucE9zaXplKHNlbGYsIG9wdHMuY29udGVudFNpemUpO1xuICAgICAgICAgICAgICAgIHNlbGYuY29udGVudC5zdHlsZS53aWR0aCA9IF92YWx1ZXMud2lkdGg7XG4gICAgICAgICAgICAgICAgc2VsZi5jb250ZW50LnN0eWxlLmhlaWdodCA9IF92YWx1ZXMuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIC8vIGV4cGxpY2l0bHkgYXNzaWduIGN1cnJlbnQgd2lkdGgvaGVpZ2h0IHRvIHBhbmVsXG4gICAgICAgICAgICAgICAgc2VsZi5zdHlsZS53aWR0aCA9IF92YWx1ZXMud2lkdGg7XG4gICAgICAgICAgICAgICAgLy8gdGhlbiBzZXQgY29udGVudCB3aWR0aCB0byAxMDAlXG4gICAgICAgICAgICAgICAgc2VsZi5jb250ZW50LnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5zZXRUaGVtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB0aGVtZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogb3B0cy50aGVtZTtcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICAgICAgLy8gZmlyc3QgcmVtb3ZlIGFsbCB0aGVtZSByZWxhdGVkIHN5bGVzXG4gICAgICAgICAgICBzZWxmLmNsZWFyVGhlbWUoKTtcblxuICAgICAgICAgICAgaWYgKHRoZW1lID09PSAnbm9uZScpIHtcbiAgICAgICAgICAgICAgICAvLyByZXN1bHRzIGluIGFuIGFsbCB3aGl0ZSBwYW5lbCB3aXRob3V0IGFueSB0aGVtZSByZWxhdGVkIGNsYXNzZXMvc3R5bGVzIGFwcGxpZWRcbiAgICAgICAgICAgICAgICAvLyByZW1vdmFsIG9mIGZvb3RlciBiYWNrZ3JvdW5kL2JvcmRlciBpcyBkb25lIGluIGpzUC50b29sYmFyQWRkKClcbiAgICAgICAgICAgICAgICBzZWxmLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZmZmJztcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHRoZW1lRGV0YWlscyA9IHNlbGYuZ2V0VGhlbWVEZXRhaWxzKHRoZW1lKTtcblxuICAgICAgICAgICAgaWYgKCF0aGVtZURldGFpbHMuYnMpIHtcbiAgICAgICAgICAgICAgICBpZiAoanNQYW5lbC50aGVtZXMuaW5kZXhPZih0aGVtZURldGFpbHMuY29sb3IpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmFwcGx5QnVpbHRJblRoZW1lKHRoZW1lRGV0YWlscyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hcHBseUFyYml0cmFyeVRoZW1lKHRoZW1lRGV0YWlscyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLmFwcGx5Qm9vdHN0cmFwVGhlbWUodGhlbWVEZXRhaWxzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdHMuYm9yZGVyKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5hcHBseVRoZW1lQm9yZGVyKHRoZW1lRGV0YWlscyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuc3R5bGUuYm9yZGVyV2lkdGggPSAnJztcbiAgICAgICAgICAgICAgICBzZWxmLnN0eWxlLmJvcmRlclN0eWxlID0gJyc7XG4gICAgICAgICAgICAgICAgc2VsZi5zdHlsZS5ib3JkZXJDb2xvciA9ICcnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5zbWFsbGlmeSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgaWYgKHNlbGYuc3RhdHVzID09PSAnc21hbGxpZmllZCcgfHwgc2VsZi5zdGF0dXMgPT09ICdzbWFsbGlmaWVkbWF4Jykge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3B0cy5vbmJlZm9yZXNtYWxsaWZ5ICYmIG9wdHMub25iZWZvcmVzbWFsbGlmeS5jYWxsKHNlbGYsIHNlbGYpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGpzcGFuZWxiZWZvcmVzbWFsbGlmeSk7XG5cbiAgICAgICAgICAgIGlmIChzZWxmLnN0YXR1cyA9PT0gJ25vcm1hbGl6ZWQnKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zYXZlQ3VycmVudERpbWVuc2lvbnMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZi5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgc2VsZi5zdHlsZS5oZWlnaHQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzZWxmLmhlYWRlcmJhcikuaGVpZ2h0O1xuXG4gICAgICAgICAgICBpZiAoc2VsZi5zdGF0dXMgPT09ICdub3JtYWxpemVkJykge1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0Q29udHJvbHMoWycuanNQYW5lbC1idG4tbm9ybWFsaXplJywgJy5qc1BhbmVsLWJ0bi1zbWFsbGlmeSddKTtcbiAgICAgICAgICAgICAgICBzZWxmLnN0YXR1cyA9ICdzbWFsbGlmaWVkJztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGpzcGFuZWxzbWFsbGlmaWVkKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGpzcGFuZWxzdGF0dXNjaGFuZ2UpO1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLm9uc3RhdHVzY2hhbmdlICYmIG9wdHMub25zdGF0dXNjaGFuZ2UuY2FsbChzZWxmLCBzZWxmKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxmLnN0YXR1cyA9PT0gJ21heGltaXplZCcpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNldENvbnRyb2xzKFsnLmpzUGFuZWwtYnRuLW1heGltaXplJywgJy5qc1BhbmVsLWJ0bi1zbWFsbGlmeSddKTtcbiAgICAgICAgICAgICAgICBzZWxmLnN0YXR1cyA9ICdzbWFsbGlmaWVkbWF4JztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGpzcGFuZWxzbWFsbGlmaWVkbWF4KTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGpzcGFuZWxzdGF0dXNjaGFuZ2UpO1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLm9uc3RhdHVzY2hhbmdlICYmIG9wdHMub25zdGF0dXNjaGFuZ2UuY2FsbChzZWxmLCBzZWxmKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3B0cy5vbnNtYWxsaWZpZWQpIHtcbiAgICAgICAgICAgICAgICBvcHRzLm9uc21hbGxpZmllZC5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLnVuc21hbGxpZnkgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGlmIChzZWxmLnN0YXR1cyA9PT0gJ3NtYWxsaWZpZWQnIHx8IHNlbGYuc3RhdHVzID09PSAnc21hbGxpZmllZG1heCcpIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5vbmJlZm9yZXVuc21hbGxpZnkgJiYgb3B0cy5vbmJlZm9yZXVuc21hbGxpZnkuY2FsbChzZWxmLCBzZWxmKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsYmVmb3JldW5zbWFsbGlmeSk7XG4gICAgICAgICAgICAgICAgc2VsZi5zdHlsZS5vdmVyZmxvdyA9ICd2aXNpYmxlJztcbiAgICAgICAgICAgICAgICBqc1BhbmVsLmZyb250KHNlbGYpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuc3RhdHVzID09PSAnc21hbGxpZmllZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zdHlsZS5oZWlnaHQgPSBzZWxmLmN1cnJlbnREYXRhLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRDb250cm9scyhbJy5qc1BhbmVsLWJ0bi1ub3JtYWxpemUnLCAnLmpzUGFuZWwtYnRuLXNtYWxsaWZ5cmV2J10pO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXR1cyA9ICdub3JtYWxpemVkJztcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsbm9ybWFsaXplZCk7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoanNwYW5lbHN0YXR1c2NoYW5nZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLm9uc3RhdHVzY2hhbmdlICYmIG9wdHMub25zdGF0dXNjaGFuZ2UuY2FsbChzZWxmLCBzZWxmKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxmLnN0YXR1cyA9PT0gJ3NtYWxsaWZpZWRtYXgnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubWF4aW1pemUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGYuc3RhdHVzID09PSAnbWluaW1pemVkJykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm5vcm1hbGl6ZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChvcHRzLm9udW5zbWFsbGlmaWVkKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdHMub251bnNtYWxsaWZpZWQuY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuZHJhZ2l0ID0gZnVuY3Rpb24gKHN0cmluZykge1xuICAgICAgICAgICAgdmFyIGRyYWdpdE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBqc1BhbmVsLmRlZmF1bHRzLmRyYWdpdCwgb3B0cy5kcmFnaXQpLFxuICAgICAgICAgICAgICAgIGhhbmRsZXMgPSBzZWxmLnF1ZXJ5U2VsZWN0b3JBbGwoZHJhZ2l0T3B0aW9ucy5oYW5kbGVzKTtcbiAgICAgICAgICAgIGlmIChzdHJpbmcgPT09ICdkaXNhYmxlJykge1xuICAgICAgICAgICAgICAgIGhhbmRsZXMuZm9yRWFjaChmdW5jdGlvbiAoaGFuZGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZS5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVzLmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZSkge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGUuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYucmVzaXplaXQgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgICAgICAgICB2YXIgaGFuZGxlcyA9IHNlbGYucXVlcnlTZWxlY3RvckFsbCgnLmpzUGFuZWwtcmVzaXplaXQtaGFuZGxlJyk7XG4gICAgICAgICAgICBpZiAoc3RyaW5nID09PSAnZGlzYWJsZScpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVzLmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZSkge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGUuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcy5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBvcHRpb24uaWRcbiAgICAgICAgc2VsZi5pZCA9IG9wdHMuaWQ7XG5cbiAgICAgICAgLy8gb3B0aW9uLnBhbmVsdHlwZSBjbGFzc25hbWVcbiAgICAgICAgc2VsZi5jbGFzc0xpc3QuYWRkKCdqc1BhbmVsLScgKyBvcHRzLnBhbmVsdHlwZSk7XG5cbiAgICAgICAgLy8gc2V0IHotaW5kZXggYW5kIHBhbmVsdHlwZSBjbGFzc1xuICAgICAgICBpZiAob3B0cy5wYW5lbHR5cGUgPT09ICdzdGFuZGFyZCcpIHtcbiAgICAgICAgICAgIHNlbGYuc3R5bGUuekluZGV4ID0gdGhpcy56aS5uZXh0KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvcHRpb24uY29udGFpbmVyXG4gICAgICAgIHBhbmVsQ29udGFpbmVyLmFwcGVuZChzZWxmKTtcblxuICAgICAgICAvLyBvcHRpb24udGhlbWVcbiAgICAgICAgc2VsZi5zZXRUaGVtZShvcHRzLnRoZW1lKTtcblxuICAgICAgICAvLyBvcHRpb24uYm94U2hhZG93XG4gICAgICAgIGlmIChvcHRzLmJveFNoYWRvdykge1xuICAgICAgICAgICAgc2VsZi5jbGFzc0xpc3QuYWRkKCdqc1BhbmVsLWRlcHRoLScgKyBvcHRzLmJveFNoYWRvdyk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBvcHRpb24uaGVhZGVyUmVtb3ZlLFxyXG4gICAgICAgICBvcHRpb24uaWNvbmZvbnQsXHJcbiAgICAgICAgIG9wdGlvbi5oZWFkZXJDb250cm9scyxcclxuICAgICAgICAgb3B0aW9uLmhlYWRlckxvZ28sXHJcbiAgICAgICAgIG9wdGlvbi5oZWFkZXJUaXRsZVxyXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoIW9wdHMuaGVhZGVyUmVtb3ZlKSB7XG4gICAgICAgICAgICBpZiAob3B0cy5oZWFkZXJMb2dvKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXRIZWFkZXJMb2dvKG9wdHMuaGVhZGVyTG9nbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLnNldEljb25mb250KG9wdHMuaWNvbmZvbnQpO1xuICAgICAgICAgICAgc2VsZi5zZXRIZWFkZXJUaXRsZShvcHRzLmhlYWRlclRpdGxlKTtcbiAgICAgICAgICAgIHNlbGYuc2V0SGVhZGVyQ29udHJvbHMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuc2V0SGVhZGVyUmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvcHRpb24uaGVhZGVyVG9vbGJhclxuICAgICAgICBpZiAob3B0cy5oZWFkZXJUb29sYmFyKSB7XG4gICAgICAgICAgICBzZWxmLmFkZFRvb2xiYXIoc2VsZi5oZWFkZXJ0b29sYmFyLCBvcHRzLmhlYWRlclRvb2xiYXIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIG9wdGlvbi5mb290ZXJUb29sYmFyXG4gICAgICAgIGlmIChvcHRzLmZvb3RlclRvb2xiYXIpIHtcbiAgICAgICAgICAgIHNlbGYuYWRkVG9vbGJhcihzZWxmLmZvb3Rlciwgb3B0cy5mb290ZXJUb29sYmFyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG9wdGlvbi5jb250ZW50XG4gICAgICAgIGlmIChvcHRzLmNvbnRlbnQpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0cy5jb250ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5jb250ZW50LmNhbGwoc2VsZiwgc2VsZik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRzLmNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jb250ZW50LmlubmVySFRNTCA9IG9wdHMuY29udGVudDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jb250ZW50LmFwcGVuZChvcHRzLmNvbnRlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3B0aW9uLmNvbnRlbnRBamF4XG4gICAgICAgIGlmIChvcHRzLmNvbnRlbnRBamF4KSB7XG4gICAgICAgICAgICB0aGlzLmFqYXgoc2VsZik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvcHRpb24uY29udGVudEZldGNoXG4gICAgICAgIGlmIChvcHRzLmNvbnRlbnRGZXRjaCkge1xuICAgICAgICAgICAgdGhpcy5mZXRjaChzZWxmKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG9wdGlvbi5ydGxcbiAgICAgICAgaWYgKG9wdHMucnRsKSB7XG4gICAgICAgICAgICBzZWxmLnNldFJ0bCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3B0aW9uLnNpemUgLS0gc2hvdWxkIGJlIGFmdGVyIG9wdGlvbi50aGVtZVxuICAgICAgICBzZWxmLnNldFNpemUoKTtcblxuICAgICAgICAvLyBvcHRpb24ucG9zaXRpb25cbiAgICAgICAgc2VsZi5zdGF0dXMgPSAnbm9ybWFsaXplZCc7XG4gICAgICAgIC8vIGlmIG9wdGlvbi5wb3NpdGlvbiBldmFsdWF0ZXMgdG8gZmFsc2UgcGFuZWwgd2lsbCBub3QgYmUgcG9zaXRpb25lZCBhdCBhbGxcbiAgICAgICAgaWYgKG9wdHMucG9zaXRpb24gfHwgb3B0cy5wb3NpdGlvbiAhPT0gJ2N1cnNvcicpIHtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24oc2VsZiwgb3B0cy5wb3NpdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoanNwYW5lbG5vcm1hbGl6ZWQpO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGpzcGFuZWxzdGF0dXNjaGFuZ2UpO1xuICAgICAgICBpZiAob3B0cy5vbnN0YXR1c2NoYW5nZSAmJiBvcHRzLm9uc3RhdHVzY2hhbmdlLmNhbGwoc2VsZiwgc2VsZikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLmNhbGNTaXplRmFjdG9ycygpO1xuXG4gICAgICAgIC8vIG9wdGlvbi5hbmltYXRlSW5cbiAgICAgICAgaWYgKG9wdHMuYW5pbWF0ZUluKSB7XG4gICAgICAgICAgICAvLyByZW1vdmUgY2xhc3MgYWdhaW4gb24gYW5pbWF0aW9uZW5kLCBvdGhlcndpc2Ugb3BhY2l0eSBkb2Vzbid0IGNoYW5nZSB3aGVuIHBhbmVsIGlzIGRyYWdnZWRcbiAgICAgICAgICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnJlbUNsYXNzKHNlbGYsIG9wdHMuYW5pbWF0ZUluKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zZXRDbGFzcyhzZWxmLCBvcHRzLmFuaW1hdGVJbik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvcHRpb24uZHJhZ2l0IEFORCBvcHRpb24ucmVzaXplaXQgQU5EIG9wdGlvbi5zeW5jTWFyZ2luc1xuICAgICAgICBpZiAob3B0cy5zeW5jTWFyZ2lucykge1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5tZW50ID0gdGhpcy5wT2NvbnRhaW5tZW50KG9wdHMubWF4aW1pemVkTWFyZ2luKTtcbiAgICAgICAgICAgIGlmIChvcHRzLmRyYWdpdCkge1xuICAgICAgICAgICAgICAgIG9wdHMuZHJhZ2l0LmNvbnRhaW5tZW50ID0gY29udGFpbm1lbnQ7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMuZHJhZ2l0LnNuYXApIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5kcmFnaXQuc25hcC5jb250YWlubWVudCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdHMucmVzaXplaXQpIHtcbiAgICAgICAgICAgICAgICBvcHRzLnJlc2l6ZWl0LmNvbnRhaW5tZW50ID0gY29udGFpbm1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdHMuZHJhZ2l0KSB7XG4gICAgICAgICAgICB0aGlzLmRyYWdpdChzZWxmLCBvcHRzLmRyYWdpdCk7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RvcCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUuZGV0YWlsID09PSBzZWxmLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2FsY1NpemVGYWN0b3JzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi50aXRsZWJhci5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0cy5yZXNpemVpdCkge1xuICAgICAgICAgICAgdGhpcy5yZXNpemVpdChzZWxmLCBvcHRzLnJlc2l6ZWl0KTtcbiAgICAgICAgICAgIHZhciBzdGFydHN0YXR1cyA9IHZvaWQgMDtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZXN0YXJ0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS5kZXRhaWwgPT09IHNlbGYuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRzdGF0dXMgPSBzZWxmLnN0YXR1cztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdyZXNpemVzdG9wJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS5kZXRhaWwgPT09IHNlbGYuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChzdGFydHN0YXR1cyA9PT0gJ3NtYWxsaWZpZWQnIHx8IHN0YXJ0c3RhdHVzID09PSAnc21hbGxpZmllZG1heCcgfHwgc3RhcnRzdGF0dXMgPT09ICdtYXhpbWl6ZWQnKSAmJiBwYXJzZUZsb2F0KHNlbGYuc3R5bGUuaGVpZ2h0KSA+IHBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUoc2VsZi5oZWFkZXIpLmhlaWdodCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0Q29udHJvbHMoWycuanNQYW5lbC1idG4tbm9ybWFsaXplJywgJy5qc1BhbmVsLWJ0bi1zbWFsbGlmeXJldiddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhdHVzID0gJ25vcm1hbGl6ZWQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsbm9ybWFsaXplZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGpzcGFuZWxzdGF0dXNjaGFuZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMub25zdGF0dXNjaGFuZ2UgJiYgb3B0cy5vbnN0YXR1c2NoYW5nZS5jYWxsKHNlbGYsIHNlbGYpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jYWxjU2l6ZUZhY3RvcnMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGluaXRpYWxpemUgc2VsZi5jdXJyZW50RGF0YSAtIG11c3QgYmUgYWZ0ZXIgb3B0aW9ucyBwb3NpdGlvbiAmIHNpemVcbiAgICAgICAgc2VsZi5zYXZlQ3VycmVudERpbWVuc2lvbnMoKTtcbiAgICAgICAgc2VsZi5zYXZlQ3VycmVudFBvc2l0aW9uKCk7XG5cbiAgICAgICAgLy8gb3B0aW9uLnNldFN0YXR1c1xuICAgICAgICBpZiAob3B0cy5zZXRTdGF0dXMpIHtcbiAgICAgICAgICAgIHZhciBuZXdTdGF0dXMgPSBvcHRzLnNldFN0YXR1cztcbiAgICAgICAgICAgIGlmIChuZXdTdGF0dXMgPT09ICdzbWFsbGlmaWVkbWF4Jykge1xuICAgICAgICAgICAgICAgIHNlbGYubWF4aW1pemUoKS5zbWFsbGlmeSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXdTdGF0dXMgPT09ICdzbWFsbGlmaWVkJykge1xuICAgICAgICAgICAgICAgIHNlbGYuc21hbGxpZnkoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGZ1bmMgPSBuZXdTdGF0dXMuc3Vic3RyKDAsIG5ld1N0YXR1cy5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICBzZWxmW2Z1bmNdKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvcHRpb24uYXV0b2Nsb3NlXG4gICAgICAgIGlmIChvcHRzLmF1dG9jbG9zZSkge1xuICAgICAgICAgICAgY2xvc2V0aW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZikgc2VsZi5jbG9zZSgpO1xuICAgICAgICAgICAgfSwgb3B0cy5hdXRvY2xvc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZnJvbnQgcGFuZWwgb24gbW91c2Vkb3duXG4gICAgICAgIHRoaXMucG9pbnRlcmRvd24uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKGl0ZW0sIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFlLnRhcmdldC5jbG9zZXN0KCcuanNQYW5lbC1idG4tY2xvc2UnKSAmJiAhZS50YXJnZXQuY2xvc2VzdCgnLmpzUGFuZWwtYnRuLW1pbmltaXplJykgJiYgb3B0cy5wYW5lbHR5cGUgPT09ICdzdGFuZGFyZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5mcm9udCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gb3B0aW9uLm9ud2luZG93cmVzaXplXG4gICAgICAgIGlmIChvcHRzLm9ud2luZG93cmVzaXplKSB7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IHdpbmRvdykge1xuICAgICAgICAgICAgICAgICAgICAvLyBzZWUgaHR0cHM6Ly9idWdzLmpxdWVyeXVpLmNvbS90aWNrZXQvNzUxNFxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyYW0gPSBvcHRzLm9ud2luZG93cmVzaXplLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzID0gc2VsZi5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzZWxmLnBhcmVudE5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnbWF4aW1pemVkJyAmJiBwYXJhbSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5tYXhpbWl6ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ25vcm1hbGl6ZWQnIHx8IHN0YXR1cyA9PT0gJ3NtYWxsaWZpZWQnIHx8IHN0YXR1cyA9PT0gJ21heGltaXplZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcGFyYW0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbS5jYWxsKHNlbGYsIGUsIHNlbGYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0eWxlLmxlZnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5jb250YWluZXIgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGwgPSAoZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCAtIHBhcnNlRmxvYXQoc2VsZi5zdHlsZS53aWR0aCkpICogc2VsZi5oZjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGwgPSAocGFyc2VGbG9hdChwYXJlbnRTdHlsZXMud2lkdGgpIC0gcGFyc2VGbG9hdChzZWxmLnN0eWxlLndpZHRoKSkgKiBzZWxmLmhmO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBsIDw9IDAgPyAwIDogbCArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3R5bGUudG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuY29udGFpbmVyID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ID0gKHdpbmRvdy5pbm5lckhlaWdodCAtIHBhcnNlRmxvYXQoc2VsZi5jdXJyZW50RGF0YS5oZWlnaHQpKSAqIHNlbGYudmY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ID0gKHBhcnNlRmxvYXQocGFyZW50U3R5bGVzLmhlaWdodCkgLSBwYXJzZUZsb2F0KHNlbGYuY3VycmVudERhdGEuaGVpZ2h0KSkgKiBzZWxmLnZmO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0IDw9IDAgPyAwIDogdCArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gd2l0aG91dCB0aGlzIGhhbmRsZXIgY29udGVudCBzZWN0aW9uIHdvdWxkIGhhdmUgcG9pbnRlckV2ZW50cyA9IG5vbmUgd2hlbiBjbGlja2luZyBoZWFkZXIgc2VjdGlvbiAoc2VlIGRyYWdpdClcbiAgICAgICAgdGhpcy5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKGl0ZW0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmNvbnRlbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdpbmhlcml0JztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBvcHRpb24uY2FsbGJhY2tcbiAgICAgICAgaWYgKG9wdHMuY2FsbGJhY2sgJiYgQXJyYXkuaXNBcnJheShvcHRzLmNhbGxiYWNrKSkge1xuICAgICAgICAgICAgb3B0cy5jYWxsYmFjay5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0cy5jYWxsYmFjaykge1xuICAgICAgICAgICAgb3B0cy5jYWxsYmFjay5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uc3RydXRvciBjYWxsYmFja1xuICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgIGNiLmNhbGwoc2VsZiwgc2VsZik7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGpzcGFuZWxsb2FkZWQpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG59O1xuXG4vLyBpbml0aWFsaXplIHotaW5kZXggZ2VuZXJhdG9yIChuZWVkcyB0byBiZSBzZXBlcmF0ZSBiZWNhdXNlIGpzUGFuZWwgaXMgbm90IGRlZmluZWQgeWV0IHdoZW4gcHV0dGluZyBpdCBpbnNpZGUganNQYW5lbCA9IHsgLi4uIH0pXG5qc1BhbmVsLnppID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzdGFydFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBqc1BhbmVsLnppQmFzZTtcblxuICAgIHZhciB2YWwgPSBzdGFydFZhbHVlO1xuICAgIHJldHVybiB7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsKys7XG4gICAgICAgIH1cbiAgICB9O1xufSgpO1xuXG5pZiAod2luZG93LlBvaW50ZXJFdmVudCkge1xuICAgIGpzUGFuZWwucG9pbnRlcmRvd24gPSBbJ3BvaW50ZXJkb3duJ107XG4gICAganNQYW5lbC5wb2ludGVybW92ZSA9IFsncG9pbnRlcm1vdmUnXTtcbiAgICBqc1BhbmVsLnBvaW50ZXJ1cCA9IFsncG9pbnRlcnVwJ107XG59IGVsc2Uge1xuICAgIGlmICgnb250b3VjaGVuZCcgaW4gd2luZG93KSB7XG4gICAgICAgIGpzUGFuZWwucG9pbnRlcmRvd24gPSBbJ3RvdWNoc3RhcnQnLCAnbW91c2Vkb3duJ107XG4gICAgICAgIGpzUGFuZWwucG9pbnRlcm1vdmUgPSBbJ3RvdWNobW92ZScsICdtb3VzZW1vdmUnXTtcbiAgICAgICAganNQYW5lbC5wb2ludGVydXAgPSBbJ3RvdWNoZW5kJywgJ21vdXNldXAnXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBqc1BhbmVsLnBvaW50ZXJkb3duID0gWydtb3VzZWRvd24nXTtcbiAgICAgICAganNQYW5lbC5wb2ludGVybW92ZSA9IFsnbW91c2Vtb3ZlJ107XG4gICAgICAgIGpzUGFuZWwucG9pbnRlcnVwID0gWydtb3VzZXVwJ107XG4gICAgfVxufVxuXG4vLyBjbG9zZU9uRXNjYXBlXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnIHx8IGUuY29kZSA9PT0gJ0VzYycgfHwgZS5rZXlDb2RlID09PSAyNykge1xuICAgICAgICBqc1BhbmVsLmdldFBhbmVscyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwnKTtcbiAgICAgICAgfSkuc29tZShmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgaWYgKGl0ZW0ub3B0aW9ucy5jbG9zZU9uRXNjYXBlKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG59LCBmYWxzZSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9kZXZ0b29scy93ZWIvanNwYW5lbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvZGV2dG9vbHMvd2ViL2pzcGFuZWwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQVVBQUFDRkNBWUFBQUNUM3pJOUFBQUFCbUpMUjBRQS93RC9BUCtndmFlVEFBQUFDWEJJV1hNQUFBc1RBQUFMRXdFQW1wd1lBQUFBQjNSSlRVVUg0UVFlQ2g0QWpWeGU0Z0FBQUJsMFJWaDBRMjl0YldWdWRBQkRjbVZoZEdWa0lIZHBkR2dnUjBsTlVGZUJEaGNBQUFBK1NVUkJWRWpIWTJSZ1lQalBnQVZnQ0RKaFU4V0VTL1VJME02SXBwSnhOT2pJRFRveWJSOFZIQlVjTW9LamFYNVVjRFROajFhUm82MkxBV2xkQUFDOEVDMnRBRUJZWEFBQUFBQkpSVTVFcmtKZ2dnPT1cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2RldnRvb2xzL3dlYi9ydWxlci5wbmdcbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2RldnRvb2xzL3dlYi9ydWxlci5wbmdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgVGVzdERldmljZU1hbmFnZXJQYW5lbCB9IGZyb20gXCIuL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWxcIjtcbmltcG9ydCB7IExvZ1BhbmVsIH0gZnJvbSBcIi4vTG9nUGFuZWxcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIENyZWF0ZUxvZ2dlclBhbmVsKCkge1xuICBMb2dQYW5lbC5TaG93TG9nUGFuZWwoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENyZWF0ZURldmljZU1hbmFnZXJQYW5lbCgpIHtcbiAgVGVzdERldmljZU1hbmFnZXJQYW5lbC5TaG93VGVzdERldmljZU1hbmFnZXJQYW5lbCgpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2RldnRvb2xzL3dlYi91dGlscy53ZWIudHMiXSwic291cmNlUm9vdCI6IiJ9