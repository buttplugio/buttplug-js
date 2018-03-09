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


var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/jspanel4/dist/jspanel.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../css-loader/index.js!./jspanel.css", function() {
		var newContent = require("!!../../css-loader/index.js!./jspanel.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

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

if(false) {
	module.hot.accept("!!../../../node_modules/css-loader/index.js!./LogPanel.css", function() {
		var newContent = require("!!../../../node_modules/css-loader/index.js!./LogPanel.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

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

if(false) {
	module.hot.accept("!!../../../node_modules/css-loader/index.js!./TestDeviceManagerPanel.css", function() {
		var newContent = require("!!../../../node_modules/css-loader/index.js!./TestDeviceManagerPanel.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

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
const index_1 = __webpack_require__("../index");
const TWEEN = __webpack_require__("./node_modules/@tweenjs/tween.js/src/Tween.js");
const jsPanel = __webpack_require__("./src/devtools/web/jspanel.js");
__webpack_require__("./node_modules/jspanel4/dist/jspanel.css");
__webpack_require__("./node_modules/jspanel4/dist/fonts/jsglyph.eot");
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
function CreateDeviceManagerPanel(buttplugServer) {
    TestDeviceManagerPanel_1.TestDeviceManagerPanel.ShowTestDeviceManagerPanel(buttplugServer);
}
exports.CreateDeviceManagerPanel = CreateDeviceManagerPanel;


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmMGZlYWZkNDJmMWI5Y2ZjNzI4ZiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJCdXR0cGx1Z1wiIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AdHdlZW5qcy90d2Vlbi5qcy9zcmMvVHdlZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvanNwYW5lbC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RldnRvb2xzL3dlYi9Mb2dQYW5lbC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RldnRvb2xzL3dlYi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL3VybC9lc2NhcGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvZm9udHMvanNnbHlwaC5lb3QiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvZm9udHMvanNnbHlwaC5zdmciLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvZm9udHMvanNnbHlwaC50dGYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvZm9udHMvanNnbHlwaC53b2ZmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9kaXN0L2pzcGFuZWwuY3NzPzQzZDIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZGV2dG9vbHMvVGVzdERldmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGV2dG9vbHMvVGVzdERldmljZU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RldnRvb2xzL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9kZXZ0b29scy93ZWIvTG9nUGFuZWwuY3NzP2IxYTUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RldnRvb2xzL3dlYi9Mb2dQYW5lbC5odG1sIiwid2VicGFjazovLy8uL3NyYy9kZXZ0b29scy93ZWIvTG9nUGFuZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RldnRvb2xzL3dlYi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmNzcz9kNjk4Iiwid2VicGFjazovLy8uL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC5odG1sIiwid2VicGFjazovLy8uL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGV2dG9vbHMvd2ViL2ZsZXNobGlnaHQucG5nIiwid2VicGFjazovLy8uL3NyYy9kZXZ0b29scy93ZWIvaHVzaC5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2RldnRvb2xzL3dlYi9pbmRleC53ZWIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RldnRvb2xzL3dlYi9qc3BhbmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9kZXZ0b29scy93ZWIvcnVsZXIucG5nIiwid2VicGFjazovLy8uL3NyYy9kZXZ0b29scy93ZWIvdXRpbHMud2ViLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDN0RBLDBCOzs7Ozs7OytDQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUgsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IscUJBQXFCOztBQUV2Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsdUNBQXVDO0FBQ3ZDOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUEsZ0VBQWdFLHNCQUFzQjtBQUN0RjtBQUNBOztBQUVBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLElBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUEsSUFBSTs7QUFFSjs7QUFFQTtBQUNBOztBQUVBLGtFQUFrRSxzQkFBc0I7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixRQUFRO0FBQ3pCO0FBQ0E7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtB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O0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSCxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUM3U0EscURBQXFELGd6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RDtBQUNBLHNDQUFzQyxJQUFJLFNBQVMsSUFBSSxTQUFTLElBQUksaUJBQWlCLElBQUksU0FBUyxJQUFJO0FBQ3RHO0FBQ0Esc0NBQXNDLElBQUksU0FBUyxJQUFJLFVBQVUsSUFBSSxrQkFBa0IsSUFBSSxTQUFTLElBQUk7QUFDeEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztB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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELEdBQUcsb0NBQW9DO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7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Q0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCx5Q0FBeUM7QUFDdEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCOztBQUVyQjtBQUNBO0FBQ0E7QUFD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QTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzRUFBc0U7QUFDdEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBOztBQUVB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkhBQTJILE1BQU07QUFDakk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsQ0FBQzs7Ozs7Ozs7QUNueUdELGlDQUFpQyx3Uzs7Ozs7Ozs7OztBQ0FqQyxxR0FBa0U7QUFDbEUseUVBQXNDO0FBR3RDO0lBQ0UsbUJBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUMxQixDQUFDO0FBRkQsOENBRUM7QUFFRCxrQ0FBeUMsY0FBOEI7SUFDckUsK0NBQXNCLENBQUMsMEJBQTBCLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDcEUsQ0FBQztBQUZELDREQUVDIiwiZmlsZSI6ImJ1dHRwbHVnLWRldnRvb2xzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYnV0dHBsdWctZGV2dG9vbHMtY29tbW9uanNcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiQnV0dHBsdWdEZXZUb29sc1wiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9kZXZ0b29scy93ZWIvaW5kZXgud2ViLnRzXCIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGYwZmVhZmQ0MmYxYjljZmM3MjhmIiwibW9kdWxlLmV4cG9ydHMgPSBCdXR0cGx1ZztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIkJ1dHRwbHVnXCJcbi8vIG1vZHVsZSBpZCA9IC4uL2luZGV4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogVHdlZW4uanMgLSBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKlxuICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzL2dyYXBocy9jb250cmlidXRvcnMgZm9yIHRoZSBmdWxsIGxpc3Qgb2YgY29udHJpYnV0b3JzLlxuICogVGhhbmsgeW91IGFsbCwgeW91J3JlIGF3ZXNvbWUhXG4gKi9cblxuXG52YXIgX0dyb3VwID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLl90d2VlbnMgPSB7fTtcblx0dGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGUgPSB7fTtcbn07XG5cbl9Hcm91cC5wcm90b3R5cGUgPSB7XG5cdGdldEFsbDogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVucykubWFwKGZ1bmN0aW9uICh0d2VlbklkKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fdHdlZW5zW3R3ZWVuSWRdO1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cblx0fSxcblxuXHRyZW1vdmVBbGw6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMuX3R3ZWVucyA9IHt9O1xuXG5cdH0sXG5cblx0YWRkOiBmdW5jdGlvbiAodHdlZW4pIHtcblxuXHRcdHRoaXMuX3R3ZWVuc1t0d2Vlbi5nZXRJZCgpXSA9IHR3ZWVuO1xuXHRcdHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlW3R3ZWVuLmdldElkKCldID0gdHdlZW47XG5cblx0fSxcblxuXHRyZW1vdmU6IGZ1bmN0aW9uICh0d2Vlbikge1xuXG5cdFx0ZGVsZXRlIHRoaXMuX3R3ZWVuc1t0d2Vlbi5nZXRJZCgpXTtcblx0XHRkZWxldGUgdGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGVbdHdlZW4uZ2V0SWQoKV07XG5cblx0fSxcblxuXHR1cGRhdGU6IGZ1bmN0aW9uICh0aW1lLCBwcmVzZXJ2ZSkge1xuXG5cdFx0dmFyIHR3ZWVuSWRzID0gT2JqZWN0LmtleXModGhpcy5fdHdlZW5zKTtcblxuXHRcdGlmICh0d2Vlbklkcy5sZW5ndGggPT09IDApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHR0aW1lID0gdGltZSAhPT0gdW5kZWZpbmVkID8gdGltZSA6IFRXRUVOLm5vdygpO1xuXG5cdFx0Ly8gVHdlZW5zIGFyZSB1cGRhdGVkIGluIFwiYmF0Y2hlc1wiLiBJZiB5b3UgYWRkIGEgbmV3IHR3ZWVuIGR1cmluZyBhbiB1cGRhdGUsIHRoZW4gdGhlXG5cdFx0Ly8gbmV3IHR3ZWVuIHdpbGwgYmUgdXBkYXRlZCBpbiB0aGUgbmV4dCBiYXRjaC5cblx0XHQvLyBJZiB5b3UgcmVtb3ZlIGEgdHdlZW4gZHVyaW5nIGFuIHVwZGF0ZSwgaXQgbWF5IG9yIG1heSBub3QgYmUgdXBkYXRlZC4gSG93ZXZlcixcblx0XHQvLyBpZiB0aGUgcmVtb3ZlZCB0d2VlbiB3YXMgYWRkZWQgZHVyaW5nIHRoZSBjdXJyZW50IGJhdGNoLCB0aGVuIGl0IHdpbGwgbm90IGJlIHVwZGF0ZWQuXG5cdFx0d2hpbGUgKHR3ZWVuSWRzLmxlbmd0aCA+IDApIHtcblx0XHRcdHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlID0ge307XG5cblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdHdlZW5JZHMubGVuZ3RoOyBpKyspIHtcblxuXHRcdFx0XHR2YXIgdHdlZW4gPSB0aGlzLl90d2VlbnNbdHdlZW5JZHNbaV1dO1xuXG5cdFx0XHRcdGlmICh0d2VlbiAmJiB0d2Vlbi51cGRhdGUodGltZSkgPT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0dHdlZW4uX2lzUGxheWluZyA9IGZhbHNlO1xuXG5cdFx0XHRcdFx0aWYgKCFwcmVzZXJ2ZSkge1xuXHRcdFx0XHRcdFx0ZGVsZXRlIHRoaXMuX3R3ZWVuc1t0d2Vlbklkc1tpXV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHR3ZWVuSWRzID0gT2JqZWN0LmtleXModGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGUpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXG5cdH1cbn07XG5cbnZhciBUV0VFTiA9IG5ldyBfR3JvdXAoKTtcblxuVFdFRU4uR3JvdXAgPSBfR3JvdXA7XG5UV0VFTi5fbmV4dElkID0gMDtcblRXRUVOLm5leHRJZCA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIFRXRUVOLl9uZXh0SWQrKztcbn07XG5cblxuLy8gSW5jbHVkZSBhIHBlcmZvcm1hbmNlLm5vdyBwb2x5ZmlsbC5cbi8vIEluIG5vZGUuanMsIHVzZSBwcm9jZXNzLmhydGltZS5cbmlmICh0eXBlb2YgKHdpbmRvdykgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiAocHJvY2VzcykgIT09ICd1bmRlZmluZWQnKSB7XG5cdFRXRUVOLm5vdyA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgdGltZSA9IHByb2Nlc3MuaHJ0aW1lKCk7XG5cblx0XHQvLyBDb252ZXJ0IFtzZWNvbmRzLCBuYW5vc2Vjb25kc10gdG8gbWlsbGlzZWNvbmRzLlxuXHRcdHJldHVybiB0aW1lWzBdICogMTAwMCArIHRpbWVbMV0gLyAxMDAwMDAwO1xuXHR9O1xufVxuLy8gSW4gYSBicm93c2VyLCB1c2Ugd2luZG93LnBlcmZvcm1hbmNlLm5vdyBpZiBpdCBpcyBhdmFpbGFibGUuXG5lbHNlIGlmICh0eXBlb2YgKHdpbmRvdykgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICB3aW5kb3cucGVyZm9ybWFuY2UgIT09IHVuZGVmaW5lZCAmJlxuXHRcdCB3aW5kb3cucGVyZm9ybWFuY2Uubm93ICE9PSB1bmRlZmluZWQpIHtcblx0Ly8gVGhpcyBtdXN0IGJlIGJvdW5kLCBiZWNhdXNlIGRpcmVjdGx5IGFzc2lnbmluZyB0aGlzIGZ1bmN0aW9uXG5cdC8vIGxlYWRzIHRvIGFuIGludm9jYXRpb24gZXhjZXB0aW9uIGluIENocm9tZS5cblx0VFdFRU4ubm93ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdy5iaW5kKHdpbmRvdy5wZXJmb3JtYW5jZSk7XG59XG4vLyBVc2UgRGF0ZS5ub3cgaWYgaXQgaXMgYXZhaWxhYmxlLlxuZWxzZSBpZiAoRGF0ZS5ub3cgIT09IHVuZGVmaW5lZCkge1xuXHRUV0VFTi5ub3cgPSBEYXRlLm5vdztcbn1cbi8vIE90aGVyd2lzZSwgdXNlICduZXcgRGF0ZSgpLmdldFRpbWUoKScuXG5lbHNlIHtcblx0VFdFRU4ubm93ID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblx0fTtcbn1cblxuXG5UV0VFTi5Ud2VlbiA9IGZ1bmN0aW9uIChvYmplY3QsIGdyb3VwKSB7XG5cdHRoaXMuX29iamVjdCA9IG9iamVjdDtcblx0dGhpcy5fdmFsdWVzU3RhcnQgPSB7fTtcblx0dGhpcy5fdmFsdWVzRW5kID0ge307XG5cdHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0ID0ge307XG5cdHRoaXMuX2R1cmF0aW9uID0gMTAwMDtcblx0dGhpcy5fcmVwZWF0ID0gMDtcblx0dGhpcy5fcmVwZWF0RGVsYXlUaW1lID0gdW5kZWZpbmVkO1xuXHR0aGlzLl95b3lvID0gZmFsc2U7XG5cdHRoaXMuX2lzUGxheWluZyA9IGZhbHNlO1xuXHR0aGlzLl9yZXZlcnNlZCA9IGZhbHNlO1xuXHR0aGlzLl9kZWxheVRpbWUgPSAwO1xuXHR0aGlzLl9zdGFydFRpbWUgPSBudWxsO1xuXHR0aGlzLl9lYXNpbmdGdW5jdGlvbiA9IFRXRUVOLkVhc2luZy5MaW5lYXIuTm9uZTtcblx0dGhpcy5faW50ZXJwb2xhdGlvbkZ1bmN0aW9uID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5MaW5lYXI7XG5cdHRoaXMuX2NoYWluZWRUd2VlbnMgPSBbXTtcblx0dGhpcy5fb25TdGFydENhbGxiYWNrID0gbnVsbDtcblx0dGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPSBmYWxzZTtcblx0dGhpcy5fb25VcGRhdGVDYWxsYmFjayA9IG51bGw7XG5cdHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayA9IG51bGw7XG5cdHRoaXMuX29uU3RvcENhbGxiYWNrID0gbnVsbDtcblx0dGhpcy5fZ3JvdXAgPSBncm91cCB8fCBUV0VFTjtcblx0dGhpcy5faWQgPSBUV0VFTi5uZXh0SWQoKTtcblxufTtcblxuVFdFRU4uVHdlZW4ucHJvdG90eXBlID0ge1xuXHRnZXRJZDogZnVuY3Rpb24gZ2V0SWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2lkO1xuXHR9LFxuXG5cdGlzUGxheWluZzogZnVuY3Rpb24gaXNQbGF5aW5nKCkge1xuXHRcdHJldHVybiB0aGlzLl9pc1BsYXlpbmc7XG5cdH0sXG5cblx0dG86IGZ1bmN0aW9uIHRvKHByb3BlcnRpZXMsIGR1cmF0aW9uKSB7XG5cblx0XHR0aGlzLl92YWx1ZXNFbmQgPSBwcm9wZXJ0aWVzO1xuXG5cdFx0aWYgKGR1cmF0aW9uICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX2R1cmF0aW9uID0gZHVyYXRpb247XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzdGFydDogZnVuY3Rpb24gc3RhcnQodGltZSkge1xuXG5cdFx0dGhpcy5fZ3JvdXAuYWRkKHRoaXMpO1xuXG5cdFx0dGhpcy5faXNQbGF5aW5nID0gdHJ1ZTtcblxuXHRcdHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gZmFsc2U7XG5cblx0XHR0aGlzLl9zdGFydFRpbWUgPSB0aW1lICE9PSB1bmRlZmluZWQgPyB0eXBlb2YgdGltZSA9PT0gJ3N0cmluZycgPyBUV0VFTi5ub3coKSArIHBhcnNlRmxvYXQodGltZSkgOiB0aW1lIDogVFdFRU4ubm93KCk7XG5cdFx0dGhpcy5fc3RhcnRUaW1lICs9IHRoaXMuX2RlbGF5VGltZTtcblxuXHRcdGZvciAodmFyIHByb3BlcnR5IGluIHRoaXMuX3ZhbHVlc0VuZCkge1xuXG5cdFx0XHQvLyBDaGVjayBpZiBhbiBBcnJheSB3YXMgcHJvdmlkZWQgYXMgcHJvcGVydHkgdmFsdWVcblx0XHRcdGlmICh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldIGluc3RhbmNlb2YgQXJyYXkpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIENyZWF0ZSBhIGxvY2FsIGNvcHkgb2YgdGhlIEFycmF5IHdpdGggdGhlIHN0YXJ0IHZhbHVlIGF0IHRoZSBmcm9udFxuXHRcdFx0XHR0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldID0gW3RoaXMuX29iamVjdFtwcm9wZXJ0eV1dLmNvbmNhdCh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldKTtcblxuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBgdG8oKWAgc3BlY2lmaWVzIGEgcHJvcGVydHkgdGhhdCBkb2Vzbid0IGV4aXN0IGluIHRoZSBzb3VyY2Ugb2JqZWN0LFxuXHRcdFx0Ly8gd2Ugc2hvdWxkIG5vdCBzZXQgdGhhdCBwcm9wZXJ0eSBpbiB0aGUgb2JqZWN0XG5cdFx0XHRpZiAodGhpcy5fb2JqZWN0W3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTYXZlIHRoZSBzdGFydGluZyB2YWx1ZS5cblx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9IHRoaXMuX29iamVjdFtwcm9wZXJ0eV07XG5cblx0XHRcdGlmICgodGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldIGluc3RhbmNlb2YgQXJyYXkpID09PSBmYWxzZSkge1xuXHRcdFx0XHR0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gKj0gMS4wOyAvLyBFbnN1cmVzIHdlJ3JlIHVzaW5nIG51bWJlcnMsIG5vdCBzdHJpbmdzXG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSB8fCAwO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzdG9wOiBmdW5jdGlvbiBzdG9wKCkge1xuXG5cdFx0aWYgKCF0aGlzLl9pc1BsYXlpbmcpIHtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHRoaXMuX2dyb3VwLnJlbW92ZSh0aGlzKTtcblx0XHR0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcblxuXHRcdGlmICh0aGlzLl9vblN0b3BDYWxsYmFjayAhPT0gbnVsbCkge1xuXHRcdFx0dGhpcy5fb25TdG9wQ2FsbGJhY2sodGhpcy5fb2JqZWN0KTtcblx0XHR9XG5cblx0XHR0aGlzLnN0b3BDaGFpbmVkVHdlZW5zKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRlbmQ6IGZ1bmN0aW9uIGVuZCgpIHtcblxuXHRcdHRoaXMudXBkYXRlKHRoaXMuX3N0YXJ0VGltZSArIHRoaXMuX2R1cmF0aW9uKTtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHN0b3BDaGFpbmVkVHdlZW5zOiBmdW5jdGlvbiBzdG9wQ2hhaW5lZFR3ZWVucygpIHtcblxuXHRcdGZvciAodmFyIGkgPSAwLCBudW1DaGFpbmVkVHdlZW5zID0gdGhpcy5fY2hhaW5lZFR3ZWVucy5sZW5ndGg7IGkgPCBudW1DaGFpbmVkVHdlZW5zOyBpKyspIHtcblx0XHRcdHRoaXMuX2NoYWluZWRUd2VlbnNbaV0uc3RvcCgpO1xuXHRcdH1cblxuXHR9LFxuXG5cdGdyb3VwOiBmdW5jdGlvbiBncm91cChncm91cCkge1xuXHRcdHRoaXMuX2dyb3VwID0gZ3JvdXA7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0ZGVsYXk6IGZ1bmN0aW9uIGRlbGF5KGFtb3VudCkge1xuXG5cdFx0dGhpcy5fZGVsYXlUaW1lID0gYW1vdW50O1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0cmVwZWF0OiBmdW5jdGlvbiByZXBlYXQodGltZXMpIHtcblxuXHRcdHRoaXMuX3JlcGVhdCA9IHRpbWVzO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0cmVwZWF0RGVsYXk6IGZ1bmN0aW9uIHJlcGVhdERlbGF5KGFtb3VudCkge1xuXG5cdFx0dGhpcy5fcmVwZWF0RGVsYXlUaW1lID0gYW1vdW50O1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0eW95bzogZnVuY3Rpb24geW95byh5eSkge1xuXG5cdFx0dGhpcy5feW95byA9IHl5O1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZWFzaW5nOiBmdW5jdGlvbiBlYXNpbmcoZWFzKSB7XG5cblx0XHR0aGlzLl9lYXNpbmdGdW5jdGlvbiA9IGVhcztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGludGVycG9sYXRpb246IGZ1bmN0aW9uIGludGVycG9sYXRpb24oaW50ZXIpIHtcblxuXHRcdHRoaXMuX2ludGVycG9sYXRpb25GdW5jdGlvbiA9IGludGVyO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y2hhaW46IGZ1bmN0aW9uIGNoYWluKCkge1xuXG5cdFx0dGhpcy5fY2hhaW5lZFR3ZWVucyA9IGFyZ3VtZW50cztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG9uU3RhcnQ6IGZ1bmN0aW9uIG9uU3RhcnQoY2FsbGJhY2spIHtcblxuXHRcdHRoaXMuX29uU3RhcnRDYWxsYmFjayA9IGNhbGxiYWNrO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0b25VcGRhdGU6IGZ1bmN0aW9uIG9uVXBkYXRlKGNhbGxiYWNrKSB7XG5cblx0XHR0aGlzLl9vblVwZGF0ZUNhbGxiYWNrID0gY2FsbGJhY2s7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRvbkNvbXBsZXRlOiBmdW5jdGlvbiBvbkNvbXBsZXRlKGNhbGxiYWNrKSB7XG5cblx0XHR0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG9uU3RvcDogZnVuY3Rpb24gb25TdG9wKGNhbGxiYWNrKSB7XG5cblx0XHR0aGlzLl9vblN0b3BDYWxsYmFjayA9IGNhbGxiYWNrO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0dXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUodGltZSkge1xuXG5cdFx0dmFyIHByb3BlcnR5O1xuXHRcdHZhciBlbGFwc2VkO1xuXHRcdHZhciB2YWx1ZTtcblxuXHRcdGlmICh0aW1lIDwgdGhpcy5fc3RhcnRUaW1lKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPT09IGZhbHNlKSB7XG5cblx0XHRcdGlmICh0aGlzLl9vblN0YXJ0Q2FsbGJhY2sgIT09IG51bGwpIHtcblx0XHRcdFx0dGhpcy5fb25TdGFydENhbGxiYWNrKHRoaXMuX29iamVjdCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRlbGFwc2VkID0gKHRpbWUgLSB0aGlzLl9zdGFydFRpbWUpIC8gdGhpcy5fZHVyYXRpb247XG5cdFx0ZWxhcHNlZCA9ICh0aGlzLl9kdXJhdGlvbiA9PT0gMCB8fCBlbGFwc2VkID4gMSkgPyAxIDogZWxhcHNlZDtcblxuXHRcdHZhbHVlID0gdGhpcy5fZWFzaW5nRnVuY3Rpb24oZWxhcHNlZCk7XG5cblx0XHRmb3IgKHByb3BlcnR5IGluIHRoaXMuX3ZhbHVlc0VuZCkge1xuXG5cdFx0XHQvLyBEb24ndCB1cGRhdGUgcHJvcGVydGllcyB0aGF0IGRvIG5vdCBleGlzdCBpbiB0aGUgc291cmNlIG9iamVjdFxuXHRcdFx0aWYgKHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgc3RhcnQgPSB0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gfHwgMDtcblx0XHRcdHZhciBlbmQgPSB0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldO1xuXG5cdFx0XHRpZiAoZW5kIGluc3RhbmNlb2YgQXJyYXkpIHtcblxuXHRcdFx0XHR0aGlzLl9vYmplY3RbcHJvcGVydHldID0gdGhpcy5faW50ZXJwb2xhdGlvbkZ1bmN0aW9uKGVuZCwgdmFsdWUpO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdC8vIFBhcnNlcyByZWxhdGl2ZSBlbmQgdmFsdWVzIHdpdGggc3RhcnQgYXMgYmFzZSAoZS5nLjogKzEwLCAtMylcblx0XHRcdFx0aWYgKHR5cGVvZiAoZW5kKSA9PT0gJ3N0cmluZycpIHtcblxuXHRcdFx0XHRcdGlmIChlbmQuY2hhckF0KDApID09PSAnKycgfHwgZW5kLmNoYXJBdCgwKSA9PT0gJy0nKSB7XG5cdFx0XHRcdFx0XHRlbmQgPSBzdGFydCArIHBhcnNlRmxvYXQoZW5kKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZW5kID0gcGFyc2VGbG9hdChlbmQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFByb3RlY3QgYWdhaW5zdCBub24gbnVtZXJpYyBwcm9wZXJ0aWVzLlxuXHRcdFx0XHRpZiAodHlwZW9mIChlbmQpID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRcdHRoaXMuX29iamVjdFtwcm9wZXJ0eV0gPSBzdGFydCArIChlbmQgLSBzdGFydCkgKiB2YWx1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRpZiAodGhpcy5fb25VcGRhdGVDYWxsYmFjayAhPT0gbnVsbCkge1xuXHRcdFx0dGhpcy5fb25VcGRhdGVDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xuXHRcdH1cblxuXHRcdGlmIChlbGFwc2VkID09PSAxKSB7XG5cblx0XHRcdGlmICh0aGlzLl9yZXBlYXQgPiAwKSB7XG5cblx0XHRcdFx0aWYgKGlzRmluaXRlKHRoaXMuX3JlcGVhdCkpIHtcblx0XHRcdFx0XHR0aGlzLl9yZXBlYXQtLTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFJlYXNzaWduIHN0YXJ0aW5nIHZhbHVlcywgcmVzdGFydCBieSBtYWtpbmcgc3RhcnRUaW1lID0gbm93XG5cdFx0XHRcdGZvciAocHJvcGVydHkgaW4gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXQpIHtcblxuXHRcdFx0XHRcdGlmICh0eXBlb2YgKHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0pID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldID0gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldICsgcGFyc2VGbG9hdCh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodGhpcy5feW95bykge1xuXHRcdFx0XHRcdFx0dmFyIHRtcCA9IHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XTtcblxuXHRcdFx0XHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldID0gdGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XTtcblx0XHRcdFx0XHRcdHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0gPSB0bXA7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldID0gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5feW95bykge1xuXHRcdFx0XHRcdHRoaXMuX3JldmVyc2VkID0gIXRoaXMuX3JldmVyc2VkO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuX3JlcGVhdERlbGF5VGltZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0dGhpcy5fc3RhcnRUaW1lID0gdGltZSArIHRoaXMuX3JlcGVhdERlbGF5VGltZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLl9zdGFydFRpbWUgPSB0aW1lICsgdGhpcy5fZGVsYXlUaW1lO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayAhPT0gbnVsbCkge1xuXG5cdFx0XHRcdFx0dGhpcy5fb25Db21wbGV0ZUNhbGxiYWNrKHRoaXMuX29iamVjdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmb3IgKHZhciBpID0gMCwgbnVtQ2hhaW5lZFR3ZWVucyA9IHRoaXMuX2NoYWluZWRUd2VlbnMubGVuZ3RoOyBpIDwgbnVtQ2hhaW5lZFR3ZWVuczsgaSsrKSB7XG5cdFx0XHRcdFx0Ly8gTWFrZSB0aGUgY2hhaW5lZCB0d2VlbnMgc3RhcnQgZXhhY3RseSBhdCB0aGUgdGltZSB0aGV5IHNob3VsZCxcblx0XHRcdFx0XHQvLyBldmVuIGlmIHRoZSBgdXBkYXRlKClgIG1ldGhvZCB3YXMgY2FsbGVkIHdheSBwYXN0IHRoZSBkdXJhdGlvbiBvZiB0aGUgdHdlZW5cblx0XHRcdFx0XHR0aGlzLl9jaGFpbmVkVHdlZW5zW2ldLnN0YXJ0KHRoaXMuX3N0YXJ0VGltZSArIHRoaXMuX2R1cmF0aW9uKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cblx0fVxufTtcblxuXG5UV0VFTi5FYXNpbmcgPSB7XG5cblx0TGluZWFyOiB7XG5cblx0XHROb25lOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gaztcblxuXHRcdH1cblxuXHR9LFxuXG5cdFF1YWRyYXRpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogaztcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogKDIgLSBrKTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGs7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAtIDAuNSAqICgtLWsgKiAoayAtIDIpIC0gMSk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRDdWJpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogayAqIGs7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gLS1rICogayAqIGsgKyAxO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAwLjUgKiBrICogayAqIGs7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwLjUgKiAoKGsgLT0gMikgKiBrICogayArIDIpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0UXVhcnRpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogayAqIGsgKiBrO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDEgLSAoLS1rICogayAqIGsgKiBrKTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGsgKiBrICogaztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIC0gMC41ICogKChrIC09IDIpICogayAqIGsgKiBrIC0gMik7XG5cblx0XHR9XG5cblx0fSxcblxuXHRRdWludGljOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGsgKiBrICogayAqIGsgKiBrO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIC0tayAqIGsgKiBrICogayAqIGsgKyAxO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAwLjUgKiBrICogayAqIGsgKiBrICogaztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDAuNSAqICgoayAtPSAyKSAqIGsgKiBrICogayAqIGsgKyAyKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdFNpbnVzb2lkYWw6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gMSAtIE1hdGguY29zKGsgKiBNYXRoLlBJIC8gMik7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gTWF0aC5zaW4oayAqIE1hdGguUEkgLyAyKTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDAuNSAqICgxIC0gTWF0aC5jb3MoTWF0aC5QSSAqIGspKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdEV4cG9uZW50aWFsOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGsgPT09IDAgPyAwIDogTWF0aC5wb3coMTAyNCwgayAtIDEpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGsgPT09IDEgPyAxIDogMSAtIE1hdGgucG93KDIsIC0gMTAgKiBrKTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKGsgPT09IDApIHtcblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAwLjUgKiBNYXRoLnBvdygxMDI0LCBrIC0gMSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwLjUgKiAoLSBNYXRoLnBvdygyLCAtIDEwICogKGsgLSAxKSkgKyAyKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdENpcmN1bGFyOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDEgLSBNYXRoLnNxcnQoMSAtIGsgKiBrKTtcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBNYXRoLnNxcnQoMSAtICgtLWsgKiBrKSk7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIC0gMC41ICogKE1hdGguc3FydCgxIC0gayAqIGspIC0gMSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwLjUgKiAoTWF0aC5zcXJ0KDEgLSAoayAtPSAyKSAqIGspICsgMSk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRFbGFzdGljOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKGsgPT09IDApIHtcblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gLU1hdGgucG93KDIsIDEwICogKGsgLSAxKSkgKiBNYXRoLnNpbigoayAtIDEuMSkgKiA1ICogTWF0aC5QSSk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA9PT0gMCkge1xuXHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGsgPT09IDEpIHtcblx0XHRcdFx0cmV0dXJuIDE7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBNYXRoLnBvdygyLCAtMTAgKiBrKSAqIE1hdGguc2luKChrIC0gMC4xKSAqIDUgKiBNYXRoLlBJKSArIDE7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrID09PSAwKSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoayA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0ayAqPSAyO1xuXG5cdFx0XHRpZiAoayA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIC0wLjUgKiBNYXRoLnBvdygyLCAxMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogTWF0aC5wb3coMiwgLTEwICogKGsgLSAxKSkgKiBNYXRoLnNpbigoayAtIDEuMSkgKiA1ICogTWF0aC5QSSkgKyAxO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0QmFjazoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHZhciBzID0gMS43MDE1ODtcblxuXHRcdFx0cmV0dXJuIGsgKiBrICogKChzICsgMSkgKiBrIC0gcyk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHR2YXIgcyA9IDEuNzAxNTg7XG5cblx0XHRcdHJldHVybiAtLWsgKiBrICogKChzICsgMSkgKiBrICsgcykgKyAxO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHR2YXIgcyA9IDEuNzAxNTggKiAxLjUyNTtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogKGsgKiBrICogKChzICsgMSkgKiBrIC0gcykpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKChrIC09IDIpICogayAqICgocyArIDEpICogayArIHMpICsgMik7XG5cblx0XHR9XG5cblx0fSxcblxuXHRCb3VuY2U6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gMSAtIFRXRUVOLkVhc2luZy5Cb3VuY2UuT3V0KDEgLSBrKTtcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrIDwgKDEgLyAyLjc1KSkge1xuXHRcdFx0XHRyZXR1cm4gNy41NjI1ICogayAqIGs7XG5cdFx0XHR9IGVsc2UgaWYgKGsgPCAoMiAvIDIuNzUpKSB7XG5cdFx0XHRcdHJldHVybiA3LjU2MjUgKiAoayAtPSAoMS41IC8gMi43NSkpICogayArIDAuNzU7XG5cdFx0XHR9IGVsc2UgaWYgKGsgPCAoMi41IC8gMi43NSkpIHtcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIChrIC09ICgyLjI1IC8gMi43NSkpICogayArIDAuOTM3NTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiA3LjU2MjUgKiAoayAtPSAoMi42MjUgLyAyLjc1KSkgKiBrICsgMC45ODQzNzU7XG5cdFx0XHR9XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrIDwgMC41KSB7XG5cdFx0XHRcdHJldHVybiBUV0VFTi5FYXNpbmcuQm91bmNlLkluKGsgKiAyKSAqIDAuNTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIFRXRUVOLkVhc2luZy5Cb3VuY2UuT3V0KGsgKiAyIC0gMSkgKiAwLjUgKyAwLjU7XG5cblx0XHR9XG5cblx0fVxuXG59O1xuXG5UV0VFTi5JbnRlcnBvbGF0aW9uID0ge1xuXG5cdExpbmVhcjogZnVuY3Rpb24gKHYsIGspIHtcblxuXHRcdHZhciBtID0gdi5sZW5ndGggLSAxO1xuXHRcdHZhciBmID0gbSAqIGs7XG5cdFx0dmFyIGkgPSBNYXRoLmZsb29yKGYpO1xuXHRcdHZhciBmbiA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuTGluZWFyO1xuXG5cdFx0aWYgKGsgPCAwKSB7XG5cdFx0XHRyZXR1cm4gZm4odlswXSwgdlsxXSwgZik7XG5cdFx0fVxuXG5cdFx0aWYgKGsgPiAxKSB7XG5cdFx0XHRyZXR1cm4gZm4odlttXSwgdlttIC0gMV0sIG0gLSBmKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZm4odltpXSwgdltpICsgMSA+IG0gPyBtIDogaSArIDFdLCBmIC0gaSk7XG5cblx0fSxcblxuXHRCZXppZXI6IGZ1bmN0aW9uICh2LCBrKSB7XG5cblx0XHR2YXIgYiA9IDA7XG5cdFx0dmFyIG4gPSB2Lmxlbmd0aCAtIDE7XG5cdFx0dmFyIHB3ID0gTWF0aC5wb3c7XG5cdFx0dmFyIGJuID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5VdGlscy5CZXJuc3RlaW47XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8PSBuOyBpKyspIHtcblx0XHRcdGIgKz0gcHcoMSAtIGssIG4gLSBpKSAqIHB3KGssIGkpICogdltpXSAqIGJuKG4sIGkpO1xuXHRcdH1cblxuXHRcdHJldHVybiBiO1xuXG5cdH0sXG5cblx0Q2F0bXVsbFJvbTogZnVuY3Rpb24gKHYsIGspIHtcblxuXHRcdHZhciBtID0gdi5sZW5ndGggLSAxO1xuXHRcdHZhciBmID0gbSAqIGs7XG5cdFx0dmFyIGkgPSBNYXRoLmZsb29yKGYpO1xuXHRcdHZhciBmbiA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuQ2F0bXVsbFJvbTtcblxuXHRcdGlmICh2WzBdID09PSB2W21dKSB7XG5cblx0XHRcdGlmIChrIDwgMCkge1xuXHRcdFx0XHRpID0gTWF0aC5mbG9vcihmID0gbSAqICgxICsgaykpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZm4odlsoaSAtIDEgKyBtKSAlIG1dLCB2W2ldLCB2WyhpICsgMSkgJSBtXSwgdlsoaSArIDIpICUgbV0sIGYgLSBpKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGlmIChrIDwgMCkge1xuXHRcdFx0XHRyZXR1cm4gdlswXSAtIChmbih2WzBdLCB2WzBdLCB2WzFdLCB2WzFdLCAtZikgLSB2WzBdKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGsgPiAxKSB7XG5cdFx0XHRcdHJldHVybiB2W21dIC0gKGZuKHZbbV0sIHZbbV0sIHZbbSAtIDFdLCB2W20gLSAxXSwgZiAtIG0pIC0gdlttXSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmbih2W2kgPyBpIC0gMSA6IDBdLCB2W2ldLCB2W20gPCBpICsgMSA/IG0gOiBpICsgMV0sIHZbbSA8IGkgKyAyID8gbSA6IGkgKyAyXSwgZiAtIGkpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0VXRpbHM6IHtcblxuXHRcdExpbmVhcjogZnVuY3Rpb24gKHAwLCBwMSwgdCkge1xuXG5cdFx0XHRyZXR1cm4gKHAxIC0gcDApICogdCArIHAwO1xuXG5cdFx0fSxcblxuXHRcdEJlcm5zdGVpbjogZnVuY3Rpb24gKG4sIGkpIHtcblxuXHRcdFx0dmFyIGZjID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5VdGlscy5GYWN0b3JpYWw7XG5cblx0XHRcdHJldHVybiBmYyhuKSAvIGZjKGkpIC8gZmMobiAtIGkpO1xuXG5cdFx0fSxcblxuXHRcdEZhY3RvcmlhbDogKGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0dmFyIGEgPSBbMV07XG5cblx0XHRcdHJldHVybiBmdW5jdGlvbiAobikge1xuXG5cdFx0XHRcdHZhciBzID0gMTtcblxuXHRcdFx0XHRpZiAoYVtuXSkge1xuXHRcdFx0XHRcdHJldHVybiBhW25dO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IG47IGkgPiAxOyBpLS0pIHtcblx0XHRcdFx0XHRzICo9IGk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRhW25dID0gcztcblx0XHRcdFx0cmV0dXJuIHM7XG5cblx0XHRcdH07XG5cblx0XHR9KSgpLFxuXG5cdFx0Q2F0bXVsbFJvbTogZnVuY3Rpb24gKHAwLCBwMSwgcDIsIHAzLCB0KSB7XG5cblx0XHRcdHZhciB2MCA9IChwMiAtIHAwKSAqIDAuNTtcblx0XHRcdHZhciB2MSA9IChwMyAtIHAxKSAqIDAuNTtcblx0XHRcdHZhciB0MiA9IHQgKiB0O1xuXHRcdFx0dmFyIHQzID0gdCAqIHQyO1xuXG5cdFx0XHRyZXR1cm4gKDIgKiBwMSAtIDIgKiBwMiArIHYwICsgdjEpICogdDMgKyAoLSAzICogcDEgKyAzICogcDIgLSAyICogdjAgLSB2MSkgKiB0MiArIHYwICogdCArIHAxO1xuXG5cdFx0fVxuXG5cdH1cblxufTtcblxuLy8gVU1EIChVbml2ZXJzYWwgTW9kdWxlIERlZmluaXRpb24pXG4oZnVuY3Rpb24gKHJvb3QpIHtcblxuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBUV0VFTjtcblx0XHR9KTtcblxuXHR9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuXG5cdFx0Ly8gTm9kZS5qc1xuXHRcdG1vZHVsZS5leHBvcnRzID0gVFdFRU47XG5cblx0fSBlbHNlIGlmIChyb290ICE9PSB1bmRlZmluZWQpIHtcblxuXHRcdC8vIEdsb2JhbCB2YXJpYWJsZVxuXHRcdHJvb3QuVFdFRU4gPSBUV0VFTjtcblxuXHR9XG5cbn0pKHRoaXMpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQHR3ZWVuanMvdHdlZW4uanMvc3JjL1R3ZWVuLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AdHdlZW5qcy90d2Vlbi5qcy9zcmMvVHdlZW4uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGVzY2FwZSA9IHJlcXVpcmUoXCIuLi8uLi9jc3MtbG9hZGVyL2xpYi91cmwvZXNjYXBlLmpzXCIpO1xuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qIGpzcGFuZWwuc2FzczogMjAxNy0xMi0xMyAxNTozNCAqL1xcbi8qIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzA0MjE1NzAvc2Fzcy11bmljb2RlLWVzY2FwZS1pcy1ub3QtcHJlc2VydmVkLWluLWNzcy1maWxlICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ2pzZ2x5cGgnO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4vZm9udHMvanNnbHlwaC5lb3RcIikpICsgXCIpO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4vZm9udHMvanNnbHlwaC5lb3RcIikpICsgXCI/I2llZml4KSBmb3JtYXQoXFxcImVtYmVkZGVkLW9wZW50eXBlXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi9mb250cy9qc2dseXBoLnR0ZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4vZm9udHMvanNnbHlwaC53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuL2ZvbnRzL2pzZ2x5cGguc3ZnXCIpKSArIFwiI2pzZ2x5cGgpIGZvcm1hdChcXFwic3ZnXFxcIik7IH1cXG5cXG4uanNnbHlwaCB7XFxuICAvKiB1c2UgIWltcG9ydGFudCB0byBwcmV2ZW50IGlzc3VlcyB3aXRoIGJyb3dzZXIgZXh0ZW5zaW9ucyB0aGF0IGNoYW5nZSBmb250cyAqL1xcbiAgZm9udC1mYW1pbHk6ICdqc2dseXBoJyAhaW1wb3J0YW50O1xcbiAgc3BlYWs6IG5vbmU7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgZm9udC12YXJpYW50OiBub3JtYWw7XFxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXG4gIGxpbmUtaGVpZ2h0OiAxO1xcbiAgLyogQmV0dGVyIEZvbnQgUmVuZGVyaW5nID09PT09PT09PT09ICovXFxuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7IH1cXG5cXG4uanNnbHlwaC1jaGV2cm9uLWRvd246OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEU5MDBcXFwiOyB9XFxuXFxuLmpzZ2x5cGgtY2hldnJvbi11cDo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTkwMVxcXCI7IH1cXG5cXG4uanNnbHlwaC1jbG9zZTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTkwMlxcXCI7IH1cXG5cXG4uanNnbHlwaC1tYXhpbWl6ZTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTkwM1xcXCI7IH1cXG5cXG4uanNnbHlwaC1taW5pbWl6ZTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTkwNFxcXCI7IH1cXG5cXG4uanNnbHlwaC1ub3JtYWxpemU6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEU5MDVcXFwiOyB9XFxuXFxuLmpzUGFuZWwge1xcbiAgYm9yZGVyOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiT3BlbiBTYW5zXFxcIixcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIG9wYWNpdHk6IDA7XFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXG4gIHotaW5kZXg6IDEwMDsgfVxcbiAgLmpzUGFuZWwgLmpzUGFuZWwtaGRyIHtcXG4gICAgYm9yZGVyOiAwO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiT3BlbiBTYW5zXFxcIixcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAzcHg7XFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAzcHg7XFxuICAgIGZvbnQtc2l6ZTogMThweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgLmpzUGFuZWwgLmpzUGFuZWwtY29udGVudCB7XFxuICAgIGJvcmRlcjogMDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbiAgICBmb250LWZhbWlseTogXFxcIk9wZW4gU2Fuc1xcXCIsXFxcIkhlbHZldGljYSBOZXVlXFxcIixIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgYmFja2dyb3VuZDogI2ZmZmZmZjtcXG4gICAgY29sb3I6ICMwMDAwMDA7XFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuICAgIC5qc1BhbmVsIC5qc1BhbmVsLWNvbnRlbnQgcHJlIHtcXG4gICAgICBjb2xvcjogaW5oZXJpdDsgfVxcbiAgLmpzUGFuZWwgLmpzUGFuZWwtZnRyIHtcXG4gICAgLW1zLWZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIC1tcy1mbGV4LXBhY2s6IGVuZDtcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXG4gICAgLW1zLWZsZXgtd3JhcDogbm93cmFwO1xcbiAgICBmbGV4LXdyYXA6IG5vd3JhcDtcXG4gICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogM3B4O1xcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogM3B4O1xcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2UwZTBlMDtcXG4gICAgY3Vyc29yOiBtb3ZlO1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBmb250LXNpemU6IDEycHg7XFxuICAgIGhlaWdodDogYXV0bztcXG4gICAgYmFja2dyb3VuZDogI2Y1ZjVmNTtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgY29sb3I6IGJsYWNrO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuICAuanNQYW5lbCAuanNQYW5lbC1mdHIuYWN0aXZlIHtcXG4gICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgIGRpc3BsYXk6IGZsZXg7IH1cXG4gICAgLmpzUGFuZWwgLmpzUGFuZWwtZnRyLmFjdGl2ZSA+ICoge1xcbiAgICAgIG1hcmdpbjogOHB4OyB9XFxuICAuanNQYW5lbCAuanNQYW5lbC1mdHIucGFuZWwtZm9vdGVyIHtcXG4gICAgcGFkZGluZzogMDsgfVxcblxcbi5qc1BhbmVsLWhlYWRlcmJhciwgLmpzUGFuZWwtaGRyLXRvb2xiYXIge1xcbiAgZm9udC1zaXplOiAxOHB4OyB9XFxuXFxuLmpzUGFuZWwtaGVhZGVyYmFyIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAtbXMtZmxleC13cmFwOiBub3dyYXA7XFxuICBmbGV4LXdyYXA6IG5vd3JhcDtcXG4gIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbWluLWhlaWdodDogMzhweDsgfVxcbiAgLmpzUGFuZWwtaGVhZGVyYmFyIGltZyB7XFxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICAgIG1heC1oZWlnaHQ6IDM4cHg7IH1cXG5cXG4uanNQYW5lbC10aXRsZWJhciB7XFxuICAtbXMtZmxleDogMSAxIGF1dG87XFxuICBmbGV4OiAxIDEgYXV0bztcXG4gIGN1cnNvcjogbW92ZTtcXG4gIG1pbi1oZWlnaHQ6IDMycHg7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuICAuanNQYW5lbC10aXRsZWJhciBoMyB7XFxuICAgIGNvbG9yOiAjMDAwMDAwO1xcbiAgICBmb250LWZhbWlseTogXFxcIk9wZW4gU2Fuc1xcXCIsXFxcIkhlbHZldGljYSBOZXVlXFxcIixIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgZm9udC12YXJpYW50OiBzbWFsbC1jYXBzO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBtYXJnaW46IDEwcHggNXB4IDEwcHggOHB4OyB9XFxuICAgIC5qc1BhbmVsLXRpdGxlYmFyIGgzIHNtYWxsIHtcXG4gICAgICBmb250LXNpemU6IDc1JTtcXG4gICAgICBjb2xvcjogaW5oZXJpdDsgfVxcblxcbi5qc1BhbmVsLXRpdGxlYmFyLmpzUGFuZWwtcnRsIGgzIHtcXG4gIGZsZXg6IDEgMCBhdXRvOyB9XFxuXFxuLmpzUGFuZWwtY29udHJvbGJhciB7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgdG91Y2gtYWN0aW9uOiBub25lOyB9XFxuICAuanNQYW5lbC1jb250cm9sYmFyIGRpdiBzcGFuOmhvdmVyLCAuanNQYW5lbC1jb250cm9sYmFyIGRpdiBzdmc6aG92ZXIge1xcbiAgICBvcGFjaXR5OiAuNjsgfVxcbiAgLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4ge1xcbiAgICBwYWRkaW5nOiAwIDNweDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB0b3VjaC1hY3Rpb246IG5vbmU7IH1cXG4gICAgLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4gc3BhbiB7XFxuICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfVxcbiAgICAuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0biBzcGFuLmdseXBoaWNvbiB7XFxuICAgICAgcGFkZGluZzogMCAycHg7IH1cXG4gICAgLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4gc3Bhbi5mYSwgLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4gc3Bhbi5mYXIsIC5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuIHNwYW4uZmFsIHtcXG4gICAgICBwYWRkaW5nOiAwIDRweCAwIDNweDsgfVxcbiAgICAuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0biBzdmcge1xcbiAgICAgIG1hcmdpbjogMCA0cHggMCAycHg7IH1cXG4gIC5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZSB7XFxuICAgIGRpc3BsYXk6IG5vbmU7IH1cXG4gIC5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuLXNtYWxsaWZ5cmV2IHtcXG4gICAgZGlzcGxheTogbm9uZTsgfVxcblxcbi5qc1BhbmVsLWhkci10b29sYmFyIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICB3aWR0aDogYXV0bztcXG4gIGhlaWdodDogYXV0bztcXG4gIGZvbnQtc2l6ZTogMTZweDsgfVxcblxcbi5qc1BhbmVsLWhkci10b29sYmFyLmFjdGl2ZSB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgLW1zLWZsZXgtd3JhcDogbm93cmFwO1xcbiAgZmxleC13cmFwOiBub3dyYXA7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjsgfVxcbiAgLmpzUGFuZWwtaGRyLXRvb2xiYXIuYWN0aXZlID4gKiB7XFxuICAgIG1hcmdpbjogNnB4IDhweDsgfVxcblxcbi8qIHN0eWxlcyBmb3IgcGFuZWxzIHVzaW5nIG9wdGlvbi5ydGwgKi9cXG4uanNQYW5lbC1oZWFkZXJiYXIuanNQYW5lbC1ydGwsIC5qc1BhbmVsLWNvbnRyb2xiYXIuanNQYW5lbC1ydGwsIC5qc1BhbmVsLWhkci10b29sYmFyLmpzUGFuZWwtcnRsIHtcXG4gIC1tcy1mbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7IH1cXG5cXG4uanNQYW5lbC1oZHItdG9vbGJhci5hY3RpdmUuanNQYW5lbC1ydGwge1xcbiAgcGFkZGluZzogN3B4IDAgMTBweCAwOyB9XFxuXFxuLmpzUGFuZWwtZnRyLmpzUGFuZWwtcnRsIHtcXG4gIC1tcy1mbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdzsgfVxcblxcbi8qIGNvbnRhaW5lciB0aGF0IHRha2VzIHRoZSBtaW5pZmllZCBqc1BhbmVscyAqL1xcbiNqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lciwgLmpzUGFuZWwtbWluaW1pemVkLWJveCB7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1mbG93OiByb3cgd3JhcC1yZXZlcnNlO1xcbiAgZmxleC1mbG93OiByb3cgd3JhcC1yZXZlcnNlO1xcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgbm9uZSByZXBlYXQgc2Nyb2xsIDAgMDtcXG4gIGJvdHRvbTogMDtcXG4gIGhlaWdodDogYXV0bztcXG4gIGxlZnQ6IDA7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB3aWR0aDogYXV0bztcXG4gIHotaW5kZXg6IDk5OTg7IH1cXG4gICNqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCwgLmpzUGFuZWwtbWluaW1pemVkLWJveCAuanNQYW5lbC1yZXBsYWNlbWVudCB7XFxuICAgIHdpZHRoOiAyMDBweDtcXG4gICAgaGVpZ2h0OiA0MHB4O1xcbiAgICBtYXJnaW46IDFweCAxcHggMCAwO1xcbiAgICB6LWluZGV4OiA5OTk5OyB9XFxuICAgICNqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1oZHIsIC5qc1BhbmVsLW1pbmltaXplZC1ib3ggLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtaGRyIHtcXG4gICAgICBwYWRkaW5nOiAwOyB9XFxuICAgICAgI2pzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZWFkZXJsb2dvLCAuanNQYW5lbC1taW5pbWl6ZWQtYm94IC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZWFkZXJsb2dvIHtcXG4gICAgICAgIG1heC13aWR0aDogNTAlO1xcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgICAgICAgI2pzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZWFkZXJsb2dvIGltZywgLmpzUGFuZWwtbWluaW1pemVkLWJveCAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGVhZGVybG9nbyBpbWcge1xcbiAgICAgICAgICBtYXgtd2lkdGg6IDEwMHB4O1xcbiAgICAgICAgICBtYXgtaGVpZ2h0OiAzOHB4OyB9XFxuICAgICNqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC10aXRsZWJhciwgLmpzUGFuZWwtbWluaW1pemVkLWJveCAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC10aXRsZWJhciB7XFxuICAgICAgLW1zLWZsZXg6IDEgMSA2MCU7XFxuICAgICAgZmxleDogMSAxIDA7XFxuICAgICAgY3Vyc29yOiBkZWZhdWx0OyB9XFxuICAgICNqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1idG4uanNQYW5lbC1idG4tbm9ybWFsaXplLCAuanNQYW5lbC1taW5pbWl6ZWQtYm94IC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWJ0bi5qc1BhbmVsLWJ0bi1ub3JtYWxpemUge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrOyB9XFxuXFxuLmpzUGFuZWwtbWluaW1pemVkLWJveCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogYXV0bzsgfVxcblxcbi8qIGhlbHBlciBjbGFzc2VzIHRvIG1ha2UgLmpzUGFuZWwtY29udGVudCBhIGZsZXggYm94ICovXFxuLmZsZXhPbmUge1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtZmxvdzogcm93IHdyYXA7XFxuICBmbGV4LWZsb3c6IHJvdyB3cmFwOyB9XFxuXFxuLyogY3NzIGZvciByZXNpemVpdCBoYW5kbGVzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBmb250LXNpemU6IDAuMXB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG91Y2gtYWN0aW9uOiBub25lOyB9XFxuXFxuLmpzUGFuZWwtcmVzaXplaXQtaGFuZGxlLmpzUGFuZWwtcmVzaXplaXQtbiB7XFxuICBjdXJzb3I6IG4tcmVzaXplO1xcbiAgaGVpZ2h0OiAxMnB4O1xcbiAgbGVmdDogOXB4O1xcbiAgdG9wOiAtNXB4O1xcbiAgd2lkdGg6IGNhbGMoMTAwJSAtIDE4cHgpOyB9XFxuXFxuLmpzUGFuZWwtcmVzaXplaXQtaGFuZGxlLmpzUGFuZWwtcmVzaXplaXQtZSB7XFxuICBjdXJzb3I6IGUtcmVzaXplO1xcbiAgaGVpZ2h0OiBjYWxjKDEwMCUgLSAxOHB4KTtcXG4gIHJpZ2h0OiAtOXB4O1xcbiAgdG9wOiA5cHg7XFxuICB3aWR0aDogMTJweDsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LXMge1xcbiAgYm90dG9tOiAtOXB4O1xcbiAgY3Vyc29yOiBzLXJlc2l6ZTtcXG4gIGhlaWdodDogMTJweDtcXG4gIGxlZnQ6IDlweDtcXG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAxOHB4KTsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LXcge1xcbiAgY3Vyc29yOiB3LXJlc2l6ZTtcXG4gIGhlaWdodDogY2FsYygxMDAlIC0gMThweCk7XFxuICBsZWZ0OiAtOXB4O1xcbiAgdG9wOiA5cHg7XFxuICB3aWR0aDogMTJweDsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LW5lIHtcXG4gIGN1cnNvcjogbmUtcmVzaXplO1xcbiAgaGVpZ2h0OiAxOHB4O1xcbiAgcmlnaHQ6IC05cHg7XFxuICB0b3A6IC05cHg7XFxuICB3aWR0aDogMThweDsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LXNlIHtcXG4gIGJvdHRvbTogLTlweDtcXG4gIGN1cnNvcjogc2UtcmVzaXplO1xcbiAgaGVpZ2h0OiAxOHB4O1xcbiAgcmlnaHQ6IC05cHg7XFxuICB3aWR0aDogMThweDsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LXN3IHtcXG4gIGJvdHRvbTogLTlweDtcXG4gIGN1cnNvcjogc3ctcmVzaXplO1xcbiAgaGVpZ2h0OiAxOHB4O1xcbiAgbGVmdDogLTlweDtcXG4gIHdpZHRoOiAxOHB4OyB9XFxuXFxuLmpzUGFuZWwtcmVzaXplaXQtaGFuZGxlLmpzUGFuZWwtcmVzaXplaXQtbncge1xcbiAgY3Vyc29yOiBudy1yZXNpemU7XFxuICBoZWlnaHQ6IDE4cHg7XFxuICBsZWZ0OiAtOXB4O1xcbiAgdG9wOiAtOXB4O1xcbiAgd2lkdGg6IDE4cHg7IH1cXG5cXG4uanNQYW5lbC1kcmFnLW92ZXJsYXkge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiAwOyB9XFxuXFxuLyogYm94LXNoYWRvd3MgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtZGVwdGgtMSB7XFxuICBib3gtc2hhZG93OiAwIDNweCA2cHggcmdiYSgwLCAwLCAwLCAwLjE2KSwgMCAzcHggNnB4IHJnYmEoMCwgMCwgMCwgMC4yMyk7IH1cXG5cXG4uanNQYW5lbC1kZXB0aC0yIHtcXG4gIGJveC1zaGFkb3c6IDAgMTBweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC4xOSksIDAgNnB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMjMpOyB9XFxuXFxuLmpzUGFuZWwtZGVwdGgtMyB7XFxuICBib3gtc2hhZG93OiAwIDE0cHggMjhweCByZ2JhKDAsIDAsIDAsIDAuMjUpLCAwIDEwcHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMjIpOyB9XFxuXFxuLmpzUGFuZWwtZGVwdGgtNCB7XFxuICBib3gtc2hhZG93OiAwIDE5cHggMzhweCByZ2JhKDAsIDAsIDAsIDAuMyksIDAgMTVweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4yMik7IH1cXG5cXG4uanNQYW5lbC1kZXB0aC01IHtcXG4gIGJveC1zaGFkb3c6IDAgMjRweCA0OHB4IHJnYmEoMCwgMCwgMCwgMC4zKSwgMCAyMHB4IDE0cHggcmdiYSgwLCAwLCAwLCAwLjIyKTsgfVxcblxcbi8qIHNuYXAgc2Vuc2l0aXZlIGFyZWFzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcbi5qc1BhbmVsLXNuYXAtYXJlYSB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBiYWNrZ3JvdW5kOiBibGFjaztcXG4gIG9wYWNpdHk6IC4yO1xcbiAgYm9yZGVyOiAxcHggc29saWQgc2lsdmVyO1xcbiAgYm94LXNoYWRvdzogMCAxNHB4IDI4cHggcmdiYSgwLCAwLCAwLCAwLjUpLCAwIDEwcHggMTBweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICB6LWluZGV4OiA5OTk5OyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWx0LCAuanNQYW5lbC1zbmFwLWFyZWEtbGMsIC5qc1BhbmVsLXNuYXAtYXJlYS1sYiB7XFxuICBsZWZ0OiAwOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWN0LCAuanNQYW5lbC1zbmFwLWFyZWEtY2Ige1xcbiAgbGVmdDogMzcuNSU7IH1cXG5cXG4uanNQYW5lbC1zbmFwLWFyZWEtcnQsIC5qc1BhbmVsLXNuYXAtYXJlYS1yYywgLmpzUGFuZWwtc25hcC1hcmVhLXJiIHtcXG4gIHJpZ2h0OiAwOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWx0LCAuanNQYW5lbC1zbmFwLWFyZWEtY3QsIC5qc1BhbmVsLXNuYXAtYXJlYS1ydCB7XFxuICB0b3A6IDA7IH1cXG5cXG4uanNQYW5lbC1zbmFwLWFyZWEtbGMsIC5qc1BhbmVsLXNuYXAtYXJlYS1yYyB7XFxuICB0b3A6IDM3LjUlOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWxiLCAuanNQYW5lbC1zbmFwLWFyZWEtY2IsIC5qc1BhbmVsLXNuYXAtYXJlYS1yYiB7XFxuICBib3R0b206IDA7IH1cXG5cXG4uanNQYW5lbC1zbmFwLWFyZWEtY3QsIC5qc1BhbmVsLXNuYXAtYXJlYS1jYiB7XFxuICB3aWR0aDogMjUlOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWxjLCAuanNQYW5lbC1zbmFwLWFyZWEtcmMge1xcbiAgaGVpZ2h0OiAyNSU7IH1cXG5cXG4uanNQYW5lbC1zbmFwLWFyZWEtbHQge1xcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwMCU7IH1cXG5cXG4uanNQYW5lbC1zbmFwLWFyZWEtcnQge1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTAwJTsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1yYiB7XFxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAxMDAlOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWxiIHtcXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxMDAlOyB9XFxuXFxuLyogYm9vdHN0cmFwIGFkanVzdG1lbnRzICovXFxuLmpzUGFuZWwucGFuZWwtZGVmYXVsdCwgLmpzUGFuZWwucGFuZWwtcHJpbWFyeSwgLmpzUGFuZWwucGFuZWwtaW5mbywgLmpzUGFuZWwucGFuZWwtc3VjY2VzcywgLmpzUGFuZWwucGFuZWwtd2FybmluZywgLmpzUGFuZWwucGFuZWwtZGFuZ2VyLCAuanNQYW5lbC5jYXJkLmNhcmQtaW52ZXJzZSB7XFxuICBib3gtc2hhZG93OiAwIDAgNnB4IHJnYmEoMCwgMzMsIDUwLCAwLjEpLCAwIDdweCAyNXB4IHJnYmEoMTcsIDM4LCA2MCwgMC40KTsgfVxcblxcbi5qc1BhbmVsLnBhbmVsIHtcXG4gIG1hcmdpbjogMDsgfVxcblxcbi5qc1BhbmVsLWhkci5wYW5lbC1oZWFkaW5nIHtcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7XFxuICBwYWRkaW5nOiAwOyB9XFxuXFxuLmpzUGFuZWwtdGl0bGUucGFuZWwtdGl0bGUgLnNtYWxsLCAuanNQYW5lbC10aXRsZS5wYW5lbC10aXRsZSBzbWFsbCB7XFxuICBmb250LXNpemU6IDc1JTsgfVxcblxcbi8qIGJvb3RzdHJhcCA0IGFkanVzdG1lbnRzICovXFxuLmpzUGFuZWwuY2FyZC5jYXJkLWludmVyc2Uge1xcbiAgYm94LXNoYWRvdzogMCAwIDZweCByZ2JhKDAsIDMzLCA1MCwgMC4xKSwgMCA3cHggMjVweCByZ2JhKDE3LCAzOCwgNjAsIDAuNCk7IH1cXG5cXG4uY2FyZC1kZWZhdWx0IHtcXG4gIGJhY2tncm91bmQ6ICNmNWY1ZjU7IH1cXG5cXG4uY2FyZC1wcmltYXJ5ID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkLFxcbi5jYXJkLXN1Y2Nlc3MgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQsXFxuLmNhcmQtaW5mbyA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCxcXG4uY2FyZC13YXJuaW5nID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkLFxcbi5jYXJkLWRhbmdlciA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCB7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yOiAjZjVmNWY1OyB9XFxuXFxuLmNhcmQtZGVmYXVsdCA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCB7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLyogY3NzMyBhbmltYXRpb25zICovXFxuQGtleWZyYW1lcyBqc1BhbmVsRmFkZUluIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbi5qc1BhbmVsRmFkZUluIHtcXG4gIG9wYWNpdHk6IDA7XFxuICBhbmltYXRpb246IGpzUGFuZWxGYWRlSW4gZWFzZS1pbiAxO1xcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDYwMG1zOyB9XFxuXFxuQGtleWZyYW1lcyBqc1BhbmVsRmFkZU91dCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwOyB9IH1cXG5cXG4uanNQYW5lbEZhZGVPdXQge1xcbiAgYW5pbWF0aW9uOiBqc1BhbmVsRmFkZU91dCBlYXNlLWluIDE7XFxuICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogNjAwbXM7IH1cXG5cXG5Aa2V5ZnJhbWVzIG1vZGFsQmFja2Ryb3BGYWRlSW4ge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMC42NTsgfSB9XFxuXFxuLmpzUGFuZWwtbW9kYWwtYmFja2Ryb3Age1xcbiAgYW5pbWF0aW9uOiBtb2RhbEJhY2tkcm9wRmFkZUluIGVhc2UtaW4gMTtcXG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiA3NTBtcztcXG4gIGJhY2tncm91bmQ6IGJsYWNrO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlOyB9XFxuXFxuQGtleWZyYW1lcyBtb2RhbEJhY2tkcm9wRmFkZU91dCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMC42NTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwOyB9IH1cXG5cXG4uanNQYW5lbC1tb2RhbC1iYWNrZHJvcC1vdXQge1xcbiAgYW5pbWF0aW9uOiBtb2RhbEJhY2tkcm9wRmFkZU91dCBlYXNlLWluIDE7XFxuICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogNDAwbXM7IH1cXG5cXG4uanNQYW5lbC1tb2RhbC1iYWNrZHJvcC1tdWx0aSB7XFxuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMTUpOyB9XFxuXFxuLyogX3RoZW1lc19tZGwuc2FzczogMjAxNy0wNy0xMiAxOToxNiAqL1xcbi8qIGRlZmF1bHQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcbi5qc1BhbmVsLXRoZW1lLWRlZmF1bHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NmZDhkYztcXG4gIGJvcmRlci1jb2xvcjogI2NmZDhkYzsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRlZmF1bHQgPiAuanNQYW5lbC1oZHIgKiB7XFxuICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRlZmF1bHQgPiAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGRyLXRvb2xiYXIge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM5MGE0YWU7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1kZWZhdWx0ID4gLmpzUGFuZWwtY29udGVudCB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzkwYTRhZTsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRlZmF1bHQgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NmZDhkYztcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjOTBhNGFlOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtZGVmYXVsdCA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZGxpZ2h0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlY2VmZjE7IH1cXG5cXG4vKiBwcmltYXJ5IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXG4uanNQYW5lbC10aGVtZS1wcmltYXJ5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMTk2ZjM7XFxuICBib3JkZXItY29sb3I6ICMyMTk2ZjM7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1wcmltYXJ5ID4gLmpzUGFuZWwtaGRyICoge1xcbiAgY29sb3I6ICNmZmZmZmY7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1wcmltYXJ5ID4gLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhkci10b29sYmFyIHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNDJhNWY1OyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtcHJpbWFyeSA+IC5qc1BhbmVsLWNvbnRlbnQge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM0MmE1ZjU7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1wcmltYXJ5ID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMTk2ZjM7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzQyYTVmNTtcXG4gIGNvbG9yOiAjZmZmZmZmOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtcHJpbWFyeSA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZGxpZ2h0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNiYmRlZmI7XFxuICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi8qIGluZm8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcbi5qc1BhbmVsLXRoZW1lLWluZm8ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI5YjZmNjtcXG4gIGJvcmRlci1jb2xvcjogIzI5YjZmNjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWluZm8gPiAuanNQYW5lbC1oZHIgKiB7XFxuICBjb2xvcjogI2ZmZmZmZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWluZm8gPiAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGRyLXRvb2xiYXIge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM0ZmMzZjc7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1pbmZvID4gLmpzUGFuZWwtY29udGVudCB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzRmYzNmNzsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWluZm8gPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI5YjZmNjtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNGZjM2Y3O1xcbiAgY29sb3I6ICNmZmZmZmY7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1pbmZvID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkbGlnaHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UxZjVmZTtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLyogc3VjY2VzcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtdGhlbWUtc3VjY2VzcyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGNhZjUwO1xcbiAgYm9yZGVyLWNvbG9yOiAjNGNhZjUwOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtc3VjY2VzcyA+IC5qc1BhbmVsLWhkciAqIHtcXG4gIGNvbG9yOiAjZmZmZmZmOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtc3VjY2VzcyA+IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZHItdG9vbGJhciB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzgxYzc4NDsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXN1Y2Nlc3MgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRjYWY1MDtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjODFjNzg0O1xcbiAgY29sb3I6ICNmZmZmZmY7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1zdWNjZXNzID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkbGlnaHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U4ZjVlOTtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLyogd2FybmluZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtdGhlbWUtd2FybmluZyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZjMTA3O1xcbiAgYm9yZGVyLWNvbG9yOiAjZmZjMTA3OyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtd2FybmluZyA+IC5qc1BhbmVsLWhkciAqIHtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtd2FybmluZyA+IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZHItdG9vbGJhciB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgI2ZmZDU0ZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXdhcm5pbmcgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYzEwNztcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZmZkNTRmO1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4uanNQYW5lbC10aGVtZS13YXJuaW5nID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkbGlnaHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjNlMDtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLyogZGFuZ2VyIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtdGhlbWUtZGFuZ2VyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjNkMDA7XFxuICBib3JkZXItY29sb3I6ICNmZjNkMDA7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1kYW5nZXIgPiAuanNQYW5lbC1oZHIgKiB7XFxuICBjb2xvcjogI2ZmZmZmZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRhbmdlciA+IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZHItdG9vbGJhciB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgI2ZmNmU0MDsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRhbmdlciA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYzZDAwO1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmZjZlNDA7XFxuICBjb2xvcjogI2ZmZmZmZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRhbmdlciA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZGxpZ2h0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjllODA7XFxuICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LW5vaGVhZGVyIHtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDNweDtcXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAzcHg7XFxuICBib3JkZXI6IG5vbmUgIWltcG9ydGFudDsgfVxcblxcbi5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LW5vZm9vdGVyIHtcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDNweDtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAzcHg7IH1cXG5cXG5ib2R5IHtcXG4gIC1tcy1vdmVyZmxvdy1zdHlsZTogc2Nyb2xsYmFyOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9kaXN0L2pzcGFuZWwuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvanNwYW5lbC5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIjYnV0dHBsdWdkZXZ0b29sc2xvZ3BhbmVsIHtcXG4gICAgZGlzcGxheTpmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjpjb2x1bW47XFxuICAgIHdpZHRoOjEwMCU7XFxuICAgIGhlaWdodDoxMDAlO1xcbiAgICBhbGlnbi1pdGVtczpjZW50ZXI7XFxuICAgIGNvbG9yOiAjMDAwO1xcbn1cXG5cXG4jYnV0dHBsdWdkZXZ0b29sc2xvZ3BhbmVsIGlucHV0LHNlbGVjdCx0ZXh0YXJlYSB7XFxuICAgIGNvbG9yOiAjMDAwO1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcbn1cXG5cXG4jYnV0dHBsdWdkZXZ0b29sc2xvZ3BhbmVsICNidXR0cGx1Z2RldnRvb2xzbG9ndGV4dGFyZWEge1xcbiAgICBmb250LXNpemU6IDhwdDtcXG4gICAgd2lkdGg6MTAwJTtcXG4gICAgZmxleDoxIDE7XFxuICAgIHBhZGRpbmc6NXB4O1xcbiAgICBib3gtc2l6aW5nOmJvcmRlci1ib3g7XFxufVxcbiNidXR0cGx1Z2RldnRvb2xzbG9ncGFuZWwgI2J1dHRwbHVnZGV2dG9vbHNsb2dsZXZlbCB7XFxuICAgIHdpZHRoOjk4JTtcXG4gICAgZmxleDpub25lO1xcbiAgICBwYWRkaW5nOjVweDtcXG4gICAgYm94LXNpemluZzpib3JkZXItYm94O1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vc3JjL2RldnRvb2xzL3dlYi9Mb2dQYW5lbC5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zcmMvZGV2dG9vbHMvd2ViL0xvZ1BhbmVsLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIm1haW4ge1xcbiAgICB3aWR0aDoxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbnNlY3Rpb24ge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBwYWRkaW5nOiAyMHB4O1xcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2RkZDtcXG59XFxuXFxuaW5wdXQge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG5sYWJlbCB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgbWFyZ2luOiAwIDAgLTFweDtcXG4gICAgcGFkZGluZzogNXB4IDEwcHg7XFxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgY29sb3I6ICNiYmI7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbn1cXG5cXG5sYWJlbDpiZWZvcmUge1xcbiAgICBmb250LWZhbWlseTogZm9udGF3ZXNvbWU7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcXG59XFxuXFxubGFiZWw6aG92ZXIge1xcbiAgICBjb2xvcjogIzg4ODtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG5pbnB1dDpjaGVja2VkICsgbGFiZWwge1xcbiAgICBjb2xvcjogIzU1NTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcXG4gICAgYm9yZGVyLXRvcDogMnB4IHNvbGlkIG9yYW5nZTtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmZmY7XFxufVxcblxcbiN0YWIxOmNoZWNrZWQgfiAjY29udGVudDEsXFxuI3RhYjI6Y2hlY2tlZCB+ICNjb250ZW50MixcXG4jdGFiMzpjaGVja2VkIH4gI2NvbnRlbnQzLFxcbiN0YWI0OmNoZWNrZWQgfiAjY29udGVudDQge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuI2NvbnRlbnQxIHtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4jY29udGVudDIge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbiNzaW11bGF0b3Ige1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSA2MHB4KTtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG59XFxuXFxuLmZsZXNobGlnaHQtc2ltIHtcXG4gICAgZmxleDogMTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbmRpdi5jLWZsZXNobGlnaHQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4OiAxO1xcbn1cXG5cXG5kaXYuYy1mbGVzaGxpZ2h0IGltZyB7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgd2lkdGg6IGF1dG87XFxuXFx0ICBpbWFnZS1yZW5kZXJpbmc6IC1tb3otY3Jpc3AtZWRnZXM7XFxuXFx0ICBpbWFnZS1yZW5kZXJpbmc6IC1vLWNyaXNwLWVkZ2VzO1xcblxcdCAgaW1hZ2UtcmVuZGVyaW5nOiAtd2Via2l0LW9wdGltaXplLWNvbnRyYXN0O1xcblxcdCAgaW1hZ2UtcmVuZGVyaW5nOiBwaXhlbGF0ZWQ7XFxufVxcblxcbmRpdi5jLWZsZXNobGlnaHQgLm8tZmxlc2hsaWdodCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgaGVpZ2h0OiA3NyU7XFxufVxcblxcbi52aWJyYXRvci1zaW11bGF0b3ItY29tcG9uZW50IHtcXG4gICAgZmxleDogMTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbmRpdi52aWJyYXRvciB7XFxuICAgIGZsZXg6IDEgMTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuZGl2LnZpYnJhdG9yLXNpbXVsYXRvci1jb21wb25lbnQgaW1nIHtcXG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSA0MHB4KTtcXG4gICAgd2lkdGg6IGF1dG87XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgaW1hZ2UtcmVuZGVyaW5nOiAtbW96LWNyaXNwLWVkZ2VzO1xcblxcdCAgaW1hZ2UtcmVuZGVyaW5nOiAtby1jcmlzcC1lZGdlcztcXG5cXHQgIGltYWdlLXJlbmRlcmluZzogLXdlYmtpdC1vcHRpbWl6ZS1jb250cmFzdDtcXG5cXHQgIGltYWdlLXJlbmRlcmluZzogcGl4ZWxhdGVkO1xcbn1cXG5cXG5kaXYudmlicmF0b3ItaW5mbyB7XFxuICAgIGZsZXg6IDA7XFxufVxcblxcbi5zaW11bGF0b3ItZGl2aWRlciB7XFxuICAgIGJvcmRlci1sZWZ0OiAxcHggIzAwMCBkYXNoZWQ7XFxuICAgIGhlaWdodDogMTAwJTtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zcmMvZGV2dG9vbHMvd2ViL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVzY2FwZSh1cmwpIHtcbiAgICBpZiAodHlwZW9mIHVybCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHVybFxuICAgIH1cbiAgICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICAgICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgICB9XG4gICAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAgIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gICAgaWYgKC9bXCInKCkgXFx0XFxuXS8udGVzdCh1cmwpKSB7XG4gICAgICAgIHJldHVybiAnXCInICsgdXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgJ1xcXFxuJykgKyAnXCInXG4gICAgfVxuXG4gICAgcmV0dXJuIHVybFxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvdXJsL2VzY2FwZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvdXJsL2VzY2FwZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbkV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgaWYgKCFpc051bWJlcihuKSB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHMuZXJyb3IgfHxcbiAgICAgICAgKGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikgJiYgIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKSB7XG4gICAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LiAoJyArIGVyICsgJyknKTtcbiAgICAgICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzVW5kZWZpbmVkKGhhbmRsZXIpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZmFzdCBjYXNlc1xuICAgICAgY2FzZSAxOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QoaGFuZGxlcikpIHtcbiAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICBsaXN0ZW5lcnMgPSBoYW5kbGVyLnNsaWNlKCk7XG4gICAgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICBpZiAodGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKVxuICAgIHRoaXMuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICBpc0Z1bmN0aW9uKGxpc3RlbmVyLmxpc3RlbmVyKSA/XG4gICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICBlbHNlIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIGVsc2VcbiAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdLCBsaXN0ZW5lcl07XG5cbiAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkgJiYgIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQpIHtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX21heExpc3RlbmVycykpIHtcbiAgICAgIG0gPSB0aGlzLl9tYXhMaXN0ZW5lcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgICB9XG5cbiAgICBpZiAobSAmJiBtID4gMCAmJiB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoID4gbSkge1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCA9IHRydWU7XG4gICAgICBjb25zb2xlLmVycm9yKCcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2xlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC4nLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoKTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZS50cmFjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBub3Qgc3VwcG9ydGVkIGluIElFIDEwXG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgdmFyIGZpcmVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZygpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGcpO1xuXG4gICAgaWYgKCFmaXJlZCkge1xuICAgICAgZmlyZWQgPSB0cnVlO1xuICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBnLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHRoaXMub24odHlwZSwgZyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBlbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWZmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZFxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBsaXN0LCBwb3NpdGlvbiwgbGVuZ3RoLCBpO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIGxpc3QgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gIGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICBwb3NpdGlvbiA9IC0xO1xuXG4gIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fFxuICAgICAgKGlzRnVuY3Rpb24obGlzdC5saXN0ZW5lcikgJiYgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcblxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGxpc3QpKSB7XG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gPiAwOykge1xuICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgKGxpc3RbaV0ubGlzdGVuZXIgJiYgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIga2V5LCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICBpZiAoIXRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgZWxzZSBpZiAodGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGZvciAoa2V5IGluIHRoaXMuX2V2ZW50cykge1xuICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNGdW5jdGlvbihsaXN0ZW5lcnMpKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICB9IGVsc2UgaWYgKGxpc3RlbmVycykge1xuICAgIC8vIExJRk8gb3JkZXJcbiAgICB3aGlsZSAobGlzdGVuZXJzLmxlbmd0aClcbiAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2xpc3RlbmVycy5sZW5ndGggLSAxXSk7XG4gIH1cbiAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgcmV0O1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldCA9IFtdO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gW3RoaXMuX2V2ZW50c1t0eXBlXV07XG4gIGVsc2VcbiAgICByZXQgPSB0aGlzLl9ldmVudHNbdHlwZV0uc2xpY2UoKTtcbiAgcmV0dXJuIHJldDtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgaWYgKHRoaXMuX2V2ZW50cykge1xuICAgIHZhciBldmxpc3RlbmVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oZXZsaXN0ZW5lcikpXG4gICAgICByZXR1cm4gMTtcbiAgICBlbHNlIGlmIChldmxpc3RlbmVyKVxuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICB9XG4gIHJldHVybiAwO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG59O1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmFwcGxpY2F0aW9uL3ZuZC5tcy1mb250b2JqZWN0O2Jhc2U2NCxYQWdBQUxnSEFBQUJBQUlBQUFBQUFBQUFBQUFBQUFBQUFBQUJBSkFCQUFBQUFFeFFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBRUFBQUFBQUFBQVBYNnhOZ0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQTRBYWdCekFHY0FiQUI1QUhBQWFBQUFBQTRBVWdCbEFHY0FkUUJzQUdFQWNnQUFBQllBVmdCbEFISUFjd0JwQUc4QWJnQWdBREVBTGdBd0FBQUFEZ0JxQUhNQVp3QnNBSGtBY0FCb0FBQUFBQUFBQVFBQUFBc0FnQUFEQURCUFV5OHlEeElHNFFBQUFMd0FBQUJnWTIxaGNCZFcwb3dBQUFFY0FBQUFWR2RoYzNBQUFBQVFBQUFCY0FBQUFBaG5iSGxtV2FoalhBQUFBWGdBQUFMRWFHVmhaQWk4TXdRQUFBUThBQUFBTm1ob1pXRUlUZ1R3QUFBRWRBQUFBQ1JvYlhSNEpONEV3QUFBQkpnQUFBQW9iRzlqWVFNS0FrZ0FBQVRBQUFBQUZtMWhlSEFBRGdBMUFBQUUyQUFBQUNCdVlXMWxTcTNLR1FBQUJQZ0FBQUtnY0c5emRBQURBQUFBQUFlWUFBQUFJQUFEQkxJQmtBQUZBQUFDbVFMTUFBQUFqd0taQXN3QUFBSHJBRE1CQ1FBQUFBQUFBQUFBQUFBQUFBQUFBQUVRQUFBQUFBQUFBQUFBQUFBQUFBQUFBRUFBQU9rRkE4RC93QUJBQThBQVFBQUFBQUVBQUFBQUFBQUFBQUFBQUNBQUFBQUFBQU1BQUFBREFBQUFIQUFCQUFNQUFBQWNBQU1BQVFBQUFCd0FCQUE0QUFBQUNnQUlBQUlBQWdBQkFDRHBCZi85Ly84QUFBQUFBQ0RwQVAvOS8vOEFBZi9qRndRQUF3QUJBQUFBQUFBQUFBQUFBQUFCQUFILy93QVBBQUVBQUFBQUFBQUFBQUFDQUFBM09RRUFBQUFBQVFBQUFBQUFBQUFBQUFJQUFEYzVBUUFBQUFBQkFBQUFBQUFBQUFBQUFnQUFOemtCQUFBQUFBRUFtUUVKQkl3Q1hnQWVBQUFCTGdFSERnTUhMZ01uSmdZSEJoWVhIZ016TWpZbFBnRW5CSXdMTEJSQ2lYWmJGUlZhZFlkQkZDc01Dd3dVbzd0aUh3VU5oQUZURkF3S0FrZ1VEUXNrU1Q4dUNnZ3VQMG9rREEwVEZDd0xYR011Q0QyM0N5d1VBQUFBQVFDWkFSQUVqQUpsQUI0QUFBRU9BU2N1QXljT0F3Y0dKaWNtTmpjK0F6TXlGZ1VlQVFjRWpBc3NGRUtKZGxzVkZWcDFoMEVVS3d3TERCU2p1MklmQlEyRUFWTVVEQW9CSmhRTkN5UkpQeTRLQ1MwL1NpVUxEQlFVTEF0Y1l5NElQcmNMS3hRQUFBQUJBUDBBS3dRV0EwWUFKZ0FBQ1FFMk5DY21JZ2NKQVNZaUJ3WVVGd2tCQmhRWEhnRXpNalkzQ1FFZUFUTXlOamMyTkNjQkF0RUJSUThQRHlzUC9yeit2QThxRHc4UEFVVCt5QThQQ0JJS0NoTUhBVGdCT0FjVENnb1RCdzhQL3NnQnVnRkVEeW9QRHcvK3ZBRkVEdzhQS2cvK3ZQN0lEeW9QQ0FjSENBRTMvc2tJQndjSUR5b1BBVGdBQUFJQTJ3QUpCRWtEZHdBUUFCc0FBQUVoSWdZVkVSUVdNeUV5TmpVUk5DWWpFU0VpSmpVUklSRVVCaU1EMlAxMUwwTkRMd0tMTDBKQ0wvMTFFUmNDMnhjUkEzZEJMLzF5TDBGQkx3S09MMEg4MnhjUUFsbjlweEFYQUFBQUFRRGJBQWtFU1FEbEFCQUFBQ1VoSWdZZEFSUVdNeUV5TmowQk5DWWpBOUw5Z0M1SlNTNENnQzVKU1M3bEdFY2VSeGdZUng1SEdBQURBTnNBQ1FSSkEwQUFFQUFiQURJQUFBRWhJZ1lWRVJRV015RXlOalVSTkNZakV4UUdJeUVpSmpVUklSRVRJU0lHSFFFek5TRVJGQVlyQVJVek1qWTFFVFFtSXdOVC9lWW5OemNuQWhvblBUMG5MUjhPL2VZT0dRSnViUDNtSnowM0FtMFpEUkVSSmpjM0pnSjNRUi8rUHlBdExTQUJ3UjlCL2Q4TEhSMExBYlArVFFMcUxSOVpOLzVnQ3pBbFFSOEJ3aDh0QUFBQUFBRUFBQUFCQUFBMnNYNDlYdzg4OVFBTEJBQUFBQUFBMG9qM1NBQUFBQURTaVBkSUFBQUFBQVNNQTNjQUFBQUlBQUlBQUFBQUFBQUFBUUFBQThEL3dBQUFCU1VBQUFBQUJJd0FBUUFBQUFBQUFBQUFBQUFBQUFBQUFBb0VBQUFBQUFBQUFBQUFBQUFDQUFBQUJTVUFtUVVsQUprRkpRRDlCU1VBMndVbEFOc0ZKUURiQUFBQUFBQUtBQlFBSGdCU0FJWUF6QUQ2QVJZQllnQUFBQUVBQUFBS0FETUFBd0FBQUFBQUFnQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQVdBUTRBQVFBQUFBQUFBQUFUQUpZQUFRQUFBQUFBQVFBSEFBQUFBUUFBQUFBQUFnQUhBUm9BQVFBQUFBQUFBd0FIQVBBQUFRQUFBQUFBQkFBSEFTOEFBUUFBQUFBQUJRQUxBTThBQVFBQUFBQUFCZ0FIQVFVQUFRQUFBQUFBQ1FBT0FCVUFBUUFBQUFBQUNnQWFBVVFBQVFBQUFBQUFEQUFhQUQ4QUFRQUFBQUFBRFFBREFJMEFBd0FCQkFrQUFBQW1BS2tBQXdBQkJBa0FBUUFPQUFjQUF3QUJCQWtBQWdBT0FTRUFBd0FCQkFrQUF3QU9BUGNBQXdBQkJBa0FCQUFPQVRZQUF3QUJCQWtBQlFBV0FOb0FBd0FCQkFrQUJnQU9BUXdBQXdBQkJBa0FDUUFjQUNNQUF3QUJCQWtBQ2dBMEFWNEFBd0FCQkFrQURBQTBBRmtBQXdBQkJBa0FEUUFHQUpCcWMyZHNlWEJvQUdvQWN3Qm5BR3dBZVFCd0FHaFRkR1ZtWVc0Z1UzUnk1TjlsY2dCVEFIUUFaUUJtQUdFQWJnQWdBRk1BZEFCeUFPUUEzd0JsQUhKb2RIUndPaTh2YzNSbFptRnVjM1J5WVdWemMyVnlMbVYxTHdCb0FIUUFkQUJ3QURvQUx3QXZBSE1BZEFCbEFHWUFZUUJ1QUhNQWRBQnlBR0VBWlFCekFITUFaUUJ5QUM0QVpRQjFBQzlOU1ZRQVRRQkpBRlF5TURFMUlGTjBaV1poYmlCVGRITGszMlZ5QURJQU1BQXhBRFVBSUFCVEFIUUFaUUJtQUdFQWJnQWdBRk1BZEFCeUFPUUEzd0JsQUhKV1pYSnphVzl1SURFdU1BQldBR1VBY2dCekFHa0Fid0J1QUNBQU1RQXVBREJxYzJkc2VYQm9BR29BY3dCbkFHd0FlUUJ3QUdocWMyZHNlWEJvQUdvQWN3Qm5BR3dBZVFCd0FHaFNaV2QxYkdGeUFGSUFaUUJuQUhVQWJBQmhBSEpxYzJkc2VYQm9BR29BY3dCbkFHd0FlUUJ3QUdoR2IyNTBJR2RsYm1WeVlYUmxaQ0JpZVNCSlkyOU5iMjl1TGdCR0FHOEFiZ0IwQUNBQVp3QmxBRzRBWlFCeUFHRUFkQUJsQUdRQUlBQmlBSGtBSUFCSkFHTUFid0JOQUc4QWJ3QnVBQzRBQXdBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBPT1cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvZm9udHMvanNnbHlwaC5lb3Rcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvZm9udHMvanNnbHlwaC5lb3Rcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCemRHRnVaR0ZzYjI1bFBTSnVieUkvUGdvOElVUlBRMVJaVUVVZ2MzWm5JRkJWUWt4SlF5QWlMUzh2VnpOREx5OUVWRVFnVTFaSElERXVNUzh2UlU0aUlDSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OUhjbUZ3YUdsamN5OVRWa2N2TVM0eEwwUlVSQzl6ZG1jeE1TNWtkR1FpSUQ0S1BITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lQZ284YldWMFlXUmhkR0UrQ2p4cWMyOXVQZ284SVZ0RFJFRlVRVnNLZXdvSkltWnZiblJHWVcxcGJIa2lPaUFpYW5ObmJIbHdhQ0lzQ2draWJXRnFiM0pXWlhKemFXOXVJam9nTVN3S0NTSnRhVzV2Y2xabGNuTnBiMjRpT2lBd0xBb0pJbVJsYzJsbmJtVnlJam9nSWxOMFpXWmhiaUJUZEhMRHBNT2ZaWElpTEFvSkltUmxjMmxuYm1WeVZWSk1Jam9nSW1oMGRIQTZMeTl6ZEdWbVlXNXpkSEpoWlhOelpYSXVaWFV2SWl3S0NTSnNhV05sYm5ObElqb2dJazFKVkNJc0Nna2lZMjl3ZVhKcFoyaDBJam9nSWpJd01UVWdVM1JsWm1GdUlGTjBjc09rdzU5bGNpSXNDZ2tpZG1WeWMybHZiaUk2SUNKV1pYSnphVzl1SURFdU1DSXNDZ2tpWm05dWRFbGtJam9nSW1weloyeDVjR2dpTEFvSkluQnpUbUZ0WlNJNklDSnFjMmRzZVhCb0lpd0tDU0p6ZFdKR1lXMXBiSGtpT2lBaVVtVm5kV3hoY2lJc0Nna2lablZzYkU1aGJXVWlPaUFpYW5ObmJIbHdhQ0lzQ2draVpHVnpZM0pwY0hScGIyNGlPaUFpUm05dWRDQm5aVzVsY21GMFpXUWdZbmtnU1dOdlRXOXZiaTRpQ24wS1hWMCtDand2YW5OdmJqNEtQQzl0WlhSaFpHRjBZVDRLUEdSbFpuTStDanhtYjI1MElHbGtQU0pxYzJkc2VYQm9JaUJvYjNKcGVpMWhaSFl0ZUQwaU1UQXlOQ0krQ2p4bWIyNTBMV1poWTJVZ2RXNXBkSE10Y0dWeUxXVnRQU0l4TURJMElpQmhjMk5sYm5ROUlqazJNQ0lnWkdWelkyVnVkRDBpTFRZMElpQXZQZ284YldsemMybHVaeTFuYkhsd2FDQm9iM0pwZWkxaFpIWXRlRDBpTVRBeU5DSWdMejRLUEdkc2VYQm9JSFZ1YVdOdlpHVTlJaVlqZURJd095SWdhRzl5YVhvdFlXUjJMWGc5SWpVeE1pSWdaRDBpSWlBdlBnbzhaMng1Y0dnZ2RXNXBZMjlrWlQwaUppTjRaVGt3TURzaUlHZHNlWEJvTFc1aGJXVTlJbU5vWlhaeWIyNHRaRzkzYmlJZ1pHRjBZUzEwWVdkelBTSmphR1YyY205dUxXUnZkMjRpSUdodmNtbDZMV0ZrZGkxNFBTSXhNekUzSWlCa1BTSk5NVEUyTXk0Mk5qWWdOVGd6TGpnME5XTXRNVFF1TkRJM0lESTJMalkwTWkwME55NDNNallnTXpZdU5UVXpMVGMwTGpNMUlESXlMakV3TnkweE56Y3VOREkyTFRrMkxqRXhMVE0zTnk0M05EWXRNakF5TGpJM055MDBNek11TkRneExUSXlPQzR3TnpndE5UWXVNakVnTWpJdU9EYzFMVEkxTXk0MU1UTWdNVEk1TGpFMU1pMDBNamN1TnpBeklESXlOeTQyTURJdE1qWXVNelVnTVRRdU9UQXpMVFU1TGpnME9TQTFMall4TkMwM05DNDNOVEl0TWpBdU56Y3pjeTAxTGpZeE5DMDFPUzQ0TXpFZ01qQXVOemN6TFRjMExqYzFNbU0wTXpNdU1UTTBMVEkwTkM0NE1Ea2dORFk0TGpnNE1pMHlORFF1T0RBNUlEUTROQzR4TXpNdE1qUTBMamd3T1NBeE5pNDFORGtnTUNBek1pNHlNREVnTUNBME9ETXVNamN6SURJME5DNHpNelFnTWpZdU5qUXlJREUwTGpReU55QXpOaTQxTXpVZ05EY3VOekkySURJeUxqRXdOeUEzTkM0ek5qaDZJaUF2UGdvOFoyeDVjR2dnZFc1cFkyOWtaVDBpSmlONFpUa3dNVHNpSUdkc2VYQm9MVzVoYldVOUltTm9aWFp5YjI0dGRYQWlJR1JoZEdFdGRHRm5jejBpWTJobGRuSnZiaTExY0NJZ2FHOXlhWG90WVdSMkxYZzlJakV6TVRjaUlHUTlJazB4TVRZekxqWTJOaUF5T1RNdU9EZGpMVEUwTGpReU55MHlOaTQyTWpRdE5EY3VOekkyTFRNMkxqVTFNeTAzTkM0ek5TMHlNaTR4TURjdE1UYzNMalF5TmlBNU5pNHhNUzB6TnpjdU56STRJREl3TWk0eU56Y3RORE16TGpRMk15QXlNamd1TURjNExUVTJMakl4TFRJeUxqZzNOUzB5TlRNdU5URXpMVEV5T1M0eE5USXROREkzTGpjd015MHlNamN1TlRnMExUSTJMak0xTFRFMExqa3lNUzAxT1M0NE5Ea3ROUzQyTVRRdE56UXVOelV5SURJd0xqYzFOQzB4TkM0NU1ETWdNall1TXpnMkxUVXVOakUwSURVNUxqZzBPU0F5TUM0M056TWdOelF1TnpVeUlEUXpNeTR4TVRVZ01qUTBMamd3T1NBME5qZ3VPRFkwSURJME5DNDRNRGtnTkRnMExqRXhOQ0F5TkRRdU9EQTVJREUyTGpVME9TQXdJRE15TGpJd01TQXdJRFE0TXk0eU5UVXRNalEwTGpNek5DQXlOaTQyTmpFdE1UUXVOREkzSURNMkxqVTFNeTAwTnk0M05EUWdNakl1TVRJMkxUYzBMak0yT0hvaUlDOCtDanhuYkhsd2FDQjFibWxqYjJSbFBTSW1JM2hsT1RBeU95SWdaMng1Y0dndGJtRnRaVDBpWTJ4dmMyVWlJR1JoZEdFdGRHRm5jejBpWTJ4dmMyVWlJR2h2Y21sNkxXRmtkaTE0UFNJeE16RTNJaUJrUFNKTk56SXhMalE0TVNBME5ERXVPREU1YkRNeU5DNHdPVFlnTXpJMExqQTNPR014T1M0NU9EWWdNakF1TURBMUlERTVMams0TmlBMU1pNHpOeUF3SURjeUxqTTFOM010TlRJdU16VXlJREU1TGprNE5pMDNNaTR6TXpnZ01Hd3RNekkwTGpBNU5pMHpNalF1TURrMkxUTXlOQzR3T1RZZ016STBMakE1Tm1NdE1Ua3VPVGcySURJd0xqQXdOUzAxTWk0ek9Ea2dNakF1TURBMUxUY3lMak0xTnlBd0xURTVMams0TmkweE9TNDVOamd0TVRrdU9UZzJMVFV5TGpNMU1pQXdMVGN5TGpNek9Hd3pNalF1TURrMkxUTXlOQzR3T1RZdE16RXhMamN4Tnkwek1URXVOek0xWXkweE9TNDVPRFl0TVRrdU9UWTRMVEU1TGprNE5pMDFNaTR6T0RrZ01DMDNNaTR6TlRjZ09TNDVPRFF0TVRBdU1EQXlJREl6TGpBM055MHhOQzQ1TnpZZ016WXVNVFk1TFRFMExqazNOaUF4TXk0d056UWdNQ0F5Tmk0eE9EVWdOQzQ1TnpRZ016WXVNVFk1SURFMExqazNObXd6TVRFdU56TTFJRE14TVM0M05UTWdNekV4TGpjek5TMHpNVEV1TnpVell6RXdMakF3TWkweE1DNHdNRElnTWpNdU1EYzNMVEUwTGprM05pQXpOaTR4T0RjdE1UUXVPVGMyY3pJMkxqRTJOeUEwTGprM05DQXpOaTR4T0RjZ01UUXVPVGMyWXpFNUxqazJPQ0F4T1M0NU5qZ2dNVGt1T1RZNElEVXlMak00T1NBd0lEY3lMak0xTjJ3dE16RXhMamMzTVNBek1URXVOek0xZWlJZ0x6NEtQR2RzZVhCb0lIVnVhV052WkdVOUlpWWplR1U1TURNN0lpQm5iSGx3YUMxdVlXMWxQU0p0WVhocGJXbDZaU0lnWkdGMFlTMTBZV2R6UFNKdFlYaHBiV2w2WlNJZ2FHOXlhWG90WVdSMkxYZzlJakV6TVRjaUlHUTlJazA1T0RNdU9UVTBJRGc0Tmk0NE5UZG9MVFkxTVM0ek16ZGpMVFl5TGpRd09TQXdMVEV4TXk0eE9Ea3RORGt1T1RjMUxURXhNeTR4T0RrdE1URXhMalF4TlhZdE5qVTBMamc0TldNd0xUWXhMalEwSURVd0xqYzNPUzB4TVRFdU5ERTFJREV4TXk0eE9Ea3RNVEV4TGpReE5XZzJOVEV1TXpNM1l6WXlMalF3T1NBd0lERXhNeTR4T0RrZ05Ea3VPVGMxSURFeE15NHhPRGtnTVRFeExqUXhOWFkyTlRRdU9EZzFZekFnTmpFdU5EUXROVEF1TnpjNUlERXhNUzQwTVRVdE1URXpMakU0T1NBeE1URXVOREUxZWswNU9ETXVPVFUwSURneUxqSTRObWd0TmpVeExqTXpOMk10TWpJdU1EZzVJREF0TkRBdU1EUTJJREUzTGpFMU1pMDBNQzR3TkRZZ016Z3VNamN5ZGpZd01TNDNNamhvTnpNeExqUXlPWFl0TmpBeExqY3lPR013TFRJeExqRXlMVEUzTGprMU55MHpPQzR5TnpJdE5EQXVNRFEyTFRNNExqSTNNbm9pSUM4K0NqeG5iSGx3YUNCMWJtbGpiMlJsUFNJbUkzaGxPVEEwT3lJZ1oyeDVjR2d0Ym1GdFpUMGliV2x1YVcxcGVtVWlJR1JoZEdFdGRHRm5jejBpYldsdWFXMXBlbVVpSUdodmNtbDZMV0ZrZGkxNFBTSXhNekUzSWlCa1BTSk5PVGM0TGpJME9TQXlNamd1TlRjeGFDMDJNemt1T1RneVl5MDJNUzR4TVRFZ01DMHhNVGd1T0RNNUlEQXRNVEU0TGpnek9TMDVOQzQzTlRkMkxUSTVMamt6TkdNd0xUazBMamN6T0NBMU55NDNNamd0T1RRdU56TTRJREV4T0M0NE16a3RPVFF1TnpNNGFEWXpPUzQ1T0RKak5qRXVNVFEzSURBZ01URTRMamc1TkNBd0lERXhPQzQ0T1RRZ09UUXVOelUzZGpJNUxqa3pOR013SURrMExqY3pPQzAxTnk0M05EWWdPVFF1TnpNNExURXhPQzQ0T1RRZ09UUXVOek00ZWlJZ0x6NEtQR2RzZVhCb0lIVnVhV052WkdVOUlpWWplR1U1TURVN0lpQm5iSGx3YUMxdVlXMWxQU0p1YjNKdFlXeHBlbVVpSUdSaGRHRXRkR0ZuY3owaWJtOXliV0ZzYVhwbElpQm9iM0pwZWkxaFpIWXRlRDBpTVRNeE55SWdaRDBpVFRnMU1DNDVPVGtnTmpNd0xqZzFOMmd0TlRNNExqQTNOV010TlRFdU5USTVJREF0T1RNdU5EazFMVFV6TGpreU5TMDVNeTQwT1RVdE9UWXVNRFUxZGkwME5Ea3VNalF6WXpBdE5ESXVNVE1nTkRFdU9UWTJMVGMyTGpReE5pQTVNeTQwT1RVdE56WXVOREUyYURVek9DNHdOelZqTlRFdU5USTVJREFnT1RrdU9EVTRJRE0wTGpJNE5pQTVPUzQ0TlRnZ056WXVOREUyZGpRME9TNHlORE5qTUNBME1pNHhNeTAwT0M0ek1qa2dPVFl1TURVMUxUazVMamcxT0NBNU5pNHdOVFY2VFRnNU5pQTROUzQxTlRsak1DMHhOQzQwT0RJdE1qWXVOemN0TXprdU9EUTFMVFExTGpBd01TMHpPUzQ0TkRWb0xUVXpPQzR3TnpWakxURTRMakl6TVNBd0xUTTRMall6T0NBeU5TNHpOakl0TXpndU5qTTRJRE01TGpnME5YWTBNelV1TlRnMGFEWXlNUzQzTVRSMkxUUXpOUzQxT0RSNlRURXdNRE11TmpRNElEZ3pNbWd0TlRNNExqQTNOV010TlRFdU5USTVJREF0T1RrdU9EVTRMVE0wTGpJNE5pMDVPUzQ0TlRndE56WXVOREUyZGkwNE9DNHhOVFZvTlRRdU9EVTNkalUwTGpnMU4yZzJNakV1TnpFMGRpMDBNVFV1T1RRMVl6QXRNVFF1TkRneUxUSXdMalF3TnkwMU9TNDBPRE10TXpndU5qTTRMVFU1TGpRNE0yZ3RNVFl1TWpFNWRpMHpOaTQxTnpGb01UWXVNakU1WXpVeExqVXlPU0F3SURrekxqUTVOU0ExTXk0NU1qVWdPVE11TkRrMUlEazJMakExTlhZME5Ea3VNalF6WXpBZ05ESXVNVE10TkRFdU9UWTJJRGMyTGpReE5pMDVNeTQwT1RVZ056WXVOREUyZWlJZ0x6NEtQQzltYjI1MFBqd3ZaR1ZtY3o0OEwzTjJaejQ9XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9kaXN0L2ZvbnRzL2pzZ2x5cGguc3ZnXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9kaXN0L2ZvbnRzL2pzZ2x5cGguc3ZnXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmZvbnQvdHRmO2Jhc2U2NCxBQUVBQUFBTEFJQUFBd0F3VDFNdk1nOFNCdUVBQUFDOEFBQUFZR050WVhBWFZ0S01BQUFCSEFBQUFGUm5ZWE53QUFBQUVBQUFBWEFBQUFBSVoyeDVabG1vWTF3QUFBRjRBQUFDeEdobFlXUUl2RE1FQUFBRVBBQUFBRFpvYUdWaENFNEU4QUFBQkhRQUFBQWthRzEwZUNUZUJNQUFBQVNZQUFBQUtHeHZZMkVEQ2dKSUFBQUV3QUFBQUJadFlYaHdBQTRBTlFBQUJOZ0FBQUFnYm1GdFpVcXR5aGtBQUFUNEFBQUNvSEJ2YzNRQUF3QUFBQUFIbUFBQUFDQUFBd1N5QVpBQUJRQUFBcGtDekFBQUFJOENtUUxNQUFBQjZ3QXpBUWtBQUFBQUFBQUFBQUFBQUFBQUFBQUJFQUFBQUFBQUFBQUFBQUFBQUFBQUFBQkFBQURwQlFQQS84QUFRQVBBQUVBQUFBQUJBQUFBQUFBQUFBQUFBQUFnQUFBQUFBQURBQUFBQXdBQUFCd0FBUUFEQUFBQUhBQURBQUVBQUFBY0FBUUFPQUFBQUFvQUNBQUNBQUlBQVFBZzZRWC8vZi8vQUFBQUFBQWc2UUQvL2YvL0FBSC80eGNFQUFNQUFRQUFBQUFBQUFBQUFBQUFBUUFCLy84QUR3QUJBQUFBQUFBQUFBQUFBZ0FBTnprQkFBQUFBQUVBQUFBQUFBQUFBQUFDQUFBM09RRUFBQUFBQVFBQUFBQUFBQUFBQUFJQUFEYzVBUUFBQUFBQkFKa0JDUVNNQWw0QUhnQUFBUzRCQnc0REJ5NERKeVlHQndZV0Z4NERNekkySlQ0Qkp3U01DeXdVUW9sMld4VVZXbldIUVJRckRBc01GS083WWg4RkRZUUJVeFFNQ2dKSUZBMExKRWsvTGdvSUxqOUtKQXdORXhRc0MxeGpMZ2c5dHdzc0ZBQUFBQUVBbVFFUUJJd0NaUUFlQUFBQkRnRW5MZ01uRGdNSEJpWW5KalkzUGdNek1oWUZIZ0VIQkl3TExCUkNpWFpiRlJWYWRZZEJGQ3NNQ3d3VW83dGlId1VOaEFGVEZBd0tBU1lVRFFza1NUOHVDZ2t0UDBvbEN3d1VGQ3dMWEdNdUNENjNDeXNVQUFBQUFRRDlBQ3NFRmdOR0FDWUFBQWtCTmpRbkppSUhDUUVtSWdjR0ZCY0pBUVlVRng0Qk16STJOd2tCSGdFek1qWTNOalFuQVFMUkFVVVBEdzhyRC82OC9yd1BLZzhQRHdGRS9zZ1BEd2dTQ2dvVEJ3RTRBVGdIRXdvS0V3Y1BELzdJQWJvQlJBOHFEdzhQL3J3QlJBOFBEeW9QL3J6K3lBOHFEd2dIQndnQk4vN0pDQWNIQ0E4cUR3RTRBQUFDQU5zQUNRUkpBM2NBRUFBYkFBQUJJU0lHRlJFVUZqTWhNalkxRVRRbUl4RWhJaVkxRVNFUkZBWWpBOWo5ZFM5RFF5OENpeTlDUWkvOWRSRVhBdHNYRVFOM1FTLzljaTlCUVM4Q2ppOUIvTnNYRUFKWi9hY1FGd0FBQUFFQTJ3QUpCRWtBNVFBUUFBQWxJU0lHSFFFVUZqTWhNalk5QVRRbUl3UFMvWUF1U1VrdUFvQXVTVWt1NVJoSEhrY1lHRWNlUnhnQUF3RGJBQWtFU1FOQUFCQUFHd0F5QUFBQklTSUdGUkVVRmpNaE1qWTFFVFFtSXhNVUJpTWhJaVkxRVNFUkV5RWlCaDBCTXpVaEVSUUdLd0VWTXpJMk5SRTBKaU1EVS8zbUp6YzNKd0lhSnowOUp5MGZEdjNtRGhrQ2Jtejk1aWM5TndKdEdRMFJFU1kzTnlZQ2QwRWYvajhnTFMwZ0FjRWZRZjNmQ3gwZEN3R3ovazBDNmkwZldUZitZQXN3SlVFZkFjSWZMUUFBQUFBQkFBQUFBUUFBTnJGK1BWOFBQUFVBQ3dRQUFBQUFBTktJOTBnQUFBQUEwb2ozU0FBQUFBQUVqQU4zQUFBQUNBQUNBQUFBQUFBQUFBRUFBQVBBLzhBQUFBVWxBQUFBQUFTTUFBRUFBQUFBQUFBQUFBQUFBQUFBQUFBS0JBQUFBQUFBQUFBQUFBQUFBZ0FBQUFVbEFKa0ZKUUNaQlNVQS9RVWxBTnNGSlFEYkJTVUEyd0FBQUFBQUNnQVVBQjRBVWdDR0FNd0ErZ0VXQVdJQUFBQUJBQUFBQ2dBekFBTUFBQUFBQUFJQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUZnRU9BQUVBQUFBQUFBQUFFd0NXQUFFQUFBQUFBQUVBQndBQUFBRUFBQUFBQUFJQUJ3RWFBQUVBQUFBQUFBTUFCd0R3QUFFQUFBQUFBQVFBQndFdkFBRUFBQUFBQUFVQUN3RFBBQUVBQUFBQUFBWUFCd0VGQUFFQUFBQUFBQWtBRGdBVkFBRUFBQUFBQUFvQUdnRkVBQUVBQUFBQUFBd0FHZ0EvQUFFQUFBQUFBQTBBQXdDTkFBTUFBUVFKQUFBQUpnQ3BBQU1BQVFRSkFBRUFEZ0FIQUFNQUFRUUpBQUlBRGdFaEFBTUFBUVFKQUFNQURnRDNBQU1BQVFRSkFBUUFEZ0UyQUFNQUFRUUpBQVVBRmdEYUFBTUFBUVFKQUFZQURnRU1BQU1BQVFRSkFBa0FIQUFqQUFNQUFRUUpBQW9BTkFGZUFBTUFBUVFKQUF3QU5BQlpBQU1BQVFRSkFBMEFCZ0NRYW5ObmJIbHdhQUJxQUhNQVp3QnNBSGtBY0FCb1UzUmxabUZ1SUZOMGN1VGZaWElBVXdCMEFHVUFaZ0JoQUc0QUlBQlRBSFFBY2dEa0FOOEFaUUJ5YUhSMGNEb3ZMM04wWldaaGJuTjBjbUZsYzNObGNpNWxkUzhBYUFCMEFIUUFjQUE2QUM4QUx3QnpBSFFBWlFCbUFHRUFiZ0J6QUhRQWNnQmhBR1VBY3dCekFHVUFjZ0F1QUdVQWRRQXZUVWxVQUUwQVNRQlVNakF4TlNCVGRHVm1ZVzRnVTNSeTVOOWxjZ0F5QURBQU1RQTFBQ0FBVXdCMEFHVUFaZ0JoQUc0QUlBQlRBSFFBY2dEa0FOOEFaUUJ5Vm1WeWMybHZiaUF4TGpBQVZnQmxBSElBY3dCcEFHOEFiZ0FnQURFQUxnQXdhbk5uYkhsd2FBQnFBSE1BWndCc0FIa0FjQUJvYW5ObmJIbHdhQUJxQUhNQVp3QnNBSGtBY0FCb1VtVm5kV3hoY2dCU0FHVUFad0IxQUd3QVlRQnlhbk5uYkhsd2FBQnFBSE1BWndCc0FIa0FjQUJvUm05dWRDQm5aVzVsY21GMFpXUWdZbmtnU1dOdlRXOXZiaTRBUmdCdkFHNEFkQUFnQUdjQVpRQnVBR1VBY2dCaEFIUUFaUUJrQUNBQVlnQjVBQ0FBU1FCakFHOEFUUUJ2QUc4QWJnQXVBQU1BQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBPVwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvanNwYW5lbDQvZGlzdC9mb250cy9qc2dseXBoLnR0ZlxuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvanNwYW5lbDQvZGlzdC9mb250cy9qc2dseXBoLnR0ZlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTpmb250L3dvZmY7YmFzZTY0LGQwOUdSZ0FCQUFBQUFBZ0VBQXNBQUFBQUI3Z0FBUUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFCUFV5OHlBQUFCQ0FBQUFHQUFBQUJnRHhJRzRXTnRZWEFBQUFGb0FBQUFWQUFBQUZRWFZ0S01aMkZ6Y0FBQUFid0FBQUFJQUFBQUNBQUFBQkJuYkhsbUFBQUJ4QUFBQXNRQUFBTEVXYWhqWEdobFlXUUFBQVNJQUFBQU5nQUFBRFlJdkRNRWFHaGxZUUFBQk1BQUFBQWtBQUFBSkFoT0JQQm9iWFI0QUFBRTVBQUFBQ2dBQUFBb0pONEV3R3h2WTJFQUFBVU1BQUFBRmdBQUFCWURDZ0pJYldGNGNBQUFCU1FBQUFBZ0FBQUFJQUFPQURWdVlXMWxBQUFGUkFBQUFxQUFBQUtnU3EzS0dYQnZjM1FBQUFma0FBQUFJQUFBQUNBQUF3QUFBQU1Fc2dHUUFBVUFBQUtaQXN3QUFBQ1BBcGtDekFBQUFlc0FNd0VKQUFBQUFBQUFBQUFBQUFBQUFBQUFBUkFBQUFBQUFBQUFBQUFBQUFBQUFBQUFRQUFBNlFVRHdQL0FBRUFEd0FCQUFBQUFBUUFBQUFBQUFBQUFBQUFBSUFBQUFBQUFBd0FBQUFNQUFBQWNBQUVBQXdBQUFCd0FBd0FCQUFBQUhBQUVBRGdBQUFBS0FBZ0FBZ0FDQUFFQUlPa0YvLzMvL3dBQUFBQUFJT2tBLy8zLy93QUIvK01YQkFBREFBRUFBQUFBQUFBQUFBQUFBQUVBQWYvL0FBOEFBUUFBQUFBQUFBQUFBQUlBQURjNUFRQUFBQUFCQUFBQUFBQUFBQUFBQWdBQU56a0JBQUFBQUFFQUFBQUFBQUFBQUFBQ0FBQTNPUUVBQUFBQUFRQ1pBUWtFakFKZUFCNEFBQUV1QVFjT0F3Y3VBeWNtQmdjR0ZoY2VBek15TmlVK0FTY0VqQXNzRkVLSmRsc1ZGVnAxaDBFVUt3d0xEQlNqdTJJZkJRMkVBVk1VREFvQ1NCUU5DeVJKUHk0S0NDNC9TaVFNRFJNVUxBdGNZeTRJUGJjTExCUUFBQUFCQUprQkVBU01BbVVBSGdBQUFRNEJKeTRESnc0REJ3WW1KeVkyTno0RE16SVdCUjRCQndTTUN5d1VRb2wyV3hVVlduV0hRUlFyREFzTUZLTzdZaDhGRFlRQlV4UU1DZ0VtRkEwTEpFay9MZ29KTFQ5S0pRc01GQlFzQzF4akxnZyt0d3NyRkFBQUFBRUEvUUFyQkJZRFJnQW1BQUFKQVRZMEp5WWlCd2tCSmlJSEJoUVhDUUVHRkJjZUFUTXlOamNKQVI0Qk16STJOelkwSndFQzBRRkZEdzhQS3cvK3ZQNjhEeW9QRHc4QlJQN0lEdzhJRWdvS0V3Y0JPQUU0QnhNS0NoTUhEdy8reUFHNkFVUVBLZzhQRC82OEFVUVBEdzhxRC82OC9zZ1BLZzhJQndjSUFUZit5UWdIQndnUEtnOEJPQUFBQWdEYkFBa0VTUU4zQUJBQUd3QUFBU0VpQmhVUkZCWXpJVEkyTlJFMEppTVJJU0ltTlJFaEVSUUdJd1BZL1hVdlEwTXZBb3N2UWtJdi9YVVJGd0xiRnhFRGQwRXYvWEl2UVVFdkFvNHZRZnpiRnhBQ1dmMm5FQmNBQUFBQkFOc0FDUVJKQU9VQUVBQUFKU0VpQmgwQkZCWXpJVEkyUFFFMEppTUQwdjJBTGtsSkxnS0FMa2xKTHVVWVJ4NUhHQmhISGtjWUFBTUEyd0FKQkVrRFFBQVFBQnNBTWdBQUFTRWlCaFVSRkJZeklUSTJOUkUwSmlNVEZBWWpJU0ltTlJFaEVSTWhJZ1lkQVRNMUlSRVVCaXNCRlRNeU5qVVJOQ1lqQTFQOTVpYzNOeWNDR2ljOVBTY3RIdzc5NWc0WkFtNXMvZVluUFRjQ2JSa05FUkVtTnpjbUFuZEJILzQvSUMwdElBSEJIMEg5M3dzZEhRc0JzLzVOQXVvdEgxazMvbUFMTUNWQkh3SENIeTBBQUFBQUFRQUFBQUVBQURheGZqMWZEenoxQUFzRUFBQUFBQURTaVBkSUFBQUFBTktJOTBnQUFBQUFCSXdEZHdBQUFBZ0FBZ0FBQUFBQUFBQUJBQUFEd1AvQUFBQUZKUUFBQUFBRWpBQUJBQUFBQUFBQUFBQUFBQUFBQUFBQUNnUUFBQUFBQUFBQUFBQUFBQUlBQUFBRkpRQ1pCU1VBbVFVbEFQMEZKUURiQlNVQTJ3VWxBTnNBQUFBQUFBb0FGQUFlQUZJQWhnRE1BUG9CRmdGaUFBQUFBUUFBQUFvQU13QURBQUFBQUFBQ0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFCWUJEZ0FCQUFBQUFBQUFBQk1BbGdBQkFBQUFBQUFCQUFjQUFBQUJBQUFBQUFBQ0FBY0JHZ0FCQUFBQUFBQURBQWNBOEFBQkFBQUFBQUFFQUFjQkx3QUJBQUFBQUFBRkFBc0F6d0FCQUFBQUFBQUdBQWNCQlFBQkFBQUFBQUFKQUE0QUZRQUJBQUFBQUFBS0FCb0JSQUFCQUFBQUFBQU1BQm9BUHdBQkFBQUFBQUFOQUFNQWpRQURBQUVFQ1FBQUFDWUFxUUFEQUFFRUNRQUJBQTRBQndBREFBRUVDUUFDQUE0QklRQURBQUVFQ1FBREFBNEE5d0FEQUFFRUNRQUVBQTRCTmdBREFBRUVDUUFGQUJZQTJnQURBQUVFQ1FBR0FBNEJEQUFEQUFFRUNRQUpBQndBSXdBREFBRUVDUUFLQURRQlhnQURBQUVFQ1FBTUFEUUFXUUFEQUFFRUNRQU5BQVlBa0dweloyeDVjR2dBYWdCekFHY0FiQUI1QUhBQWFGTjBaV1poYmlCVGRITGszMlZ5QUZNQWRBQmxBR1lBWVFCdUFDQUFVd0IwQUhJQTVBRGZBR1VBY21oMGRIQTZMeTl6ZEdWbVlXNXpkSEpoWlhOelpYSXVaWFV2QUdnQWRBQjBBSEFBT2dBdkFDOEFjd0IwQUdVQVpnQmhBRzRBY3dCMEFISUFZUUJsQUhNQWN3QmxBSElBTGdCbEFIVUFMMDFKVkFCTkFFa0FWREl3TVRVZ1UzUmxabUZ1SUZOMGN1VGZaWElBTWdBd0FERUFOUUFnQUZNQWRBQmxBR1lBWVFCdUFDQUFVd0IwQUhJQTVBRGZBR1VBY2xabGNuTnBiMjRnTVM0d0FGWUFaUUJ5QUhNQWFRQnZBRzRBSUFBeEFDNEFNR3B6WjJ4NWNHZ0FhZ0J6QUdjQWJBQjVBSEFBYUdweloyeDVjR2dBYWdCekFHY0FiQUI1QUhBQWFGSmxaM1ZzWVhJQVVnQmxBR2NBZFFCc0FHRUFjbXB6WjJ4NWNHZ0FhZ0J6QUdjQWJBQjVBSEFBYUVadmJuUWdaMlZ1WlhKaGRHVmtJR0o1SUVsamIwMXZiMjR1QUVZQWJ3QnVBSFFBSUFCbkFHVUFiZ0JsQUhJQVlRQjBBR1VBWkFBZ0FHSUFlUUFnQUVrQVl3QnZBRTBBYndCdkFHNEFMZ0FEQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQVwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvanNwYW5lbDQvZGlzdC9mb250cy9qc2dseXBoLndvZmZcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvZm9udHMvanNnbHlwaC53b2ZmXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vanNwYW5lbC5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL2pzcGFuZWwuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL2pzcGFuZWwuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvanNwYW5lbDQvZGlzdC9qc3BhbmVsLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvanNwYW5lbDQvZGlzdC9qc3BhbmVsLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcbn07XG5cbnZhciBnZXRFbGVtZW50ID0gKGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbyA9IHt9O1xuXG5cdHJldHVybiBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBwYXNzaW5nIGZ1bmN0aW9uIGluIG9wdGlvbnMsIHRoZW4gdXNlIGl0IGZvciByZXNvbHZlIFwiaGVhZFwiIGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgLy8gVXNlZnVsIGZvciBTaGFkb3cgUm9vdCBzdHlsZSBpLmVcbiAgICAgICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAgICAgLy8gICBpbnNlcnRJbnRvOiBmdW5jdGlvbiAoKSB7IHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvb1wiKS5zaGFkb3dSb290IH1cbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHZhciBzdHlsZVRhcmdldCA9IGdldFRhcmdldC5jYWxsKHRoaXMsIHRhcmdldCk7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG5cdFx0XHRcdFx0Ly8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuXHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1t0YXJnZXRdXG5cdH07XG59KSgpO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09IFwiYm9vbGVhblwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuICAgICAgICBpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpIHtcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50byArIFwiIFwiICsgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpO1xuXHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIG5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJbU3R5bGUgTG9hZGVyXVxcblxcbiBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0JyAoJ29wdGlvbnMuaW5zZXJ0QXQnKSBmb3VuZC5cXG4gTXVzdCBiZSAndG9wJywgJ2JvdHRvbScsIG9yIE9iamVjdC5cXG4gKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyI2luc2VydGF0KVxcblwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZSwgdXBkYXRlLCByZW1vdmUsIHJlc3VsdDtcblxuXHQvLyBJZiBhIHRyYW5zZm9ybSBmdW5jdGlvbiB3YXMgZGVmaW5lZCwgcnVuIGl0IG9uIHRoZSBjc3Ncblx0aWYgKG9wdGlvbnMudHJhbnNmb3JtICYmIG9iai5jc3MpIHtcblx0ICAgIHJlc3VsdCA9IG9wdGlvbnMudHJhbnNmb3JtKG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgQnV0dHBsdWdEZXZpY2UsIFNpbmdsZU1vdG9yVmlicmF0ZUNtZCwgRmxlc2hsaWdodExhdW5jaEZXMTJDbWQgfSBmcm9tIFwiLi4vaW5kZXhcIjtcbmltcG9ydCAqIGFzIE1lc3NhZ2VzIGZyb20gXCIuLi9pbmRleFwiO1xuXG5leHBvcnQgY2xhc3MgVGVzdERldmljZSBleHRlbmRzIEJ1dHRwbHVnRGV2aWNlIHtcblxuICBwcml2YXRlIF9jb25uZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfbGluZWFyU3BlZWQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2xpbmVhclBvc2l0aW9uOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF92aWJyYXRlU3BlZWQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX3JvdGF0ZVNwZWVkOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9yb3RhdGVDbG9ja3dpc2U6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgc2hvdWxkVmlicmF0ZTogYm9vbGVhbiA9IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgc2hvdWxkTGluZWFyOiBib29sZWFuID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICBzaG91bGRSb3RhdGU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHN1cGVyKGBUZXN0IERldmljZSAtICR7bmFtZX1gLCBcIlRlc3REZXZpY2VcIiArIChzaG91bGRWaWJyYXRlID8gXCJWaWJyYXRlXCIgOiBcIlwiKSArIChzaG91bGRMaW5lYXIgPyBcIkxpbmVhclwiIDogXCJcIikpO1xuICAgIHRoaXMuTXNnRnVuY3Muc2V0KE1lc3NhZ2VzLlN0b3BEZXZpY2VDbWQubmFtZSwgdGhpcy5IYW5kbGVTdG9wRGV2aWNlQ21kKTtcbiAgICBpZiAoc2hvdWxkVmlicmF0ZSkge1xuICAgICAgdGhpcy5Nc2dGdW5jcy5zZXQoTWVzc2FnZXMuU2luZ2xlTW90b3JWaWJyYXRlQ21kLm5hbWUsIHRoaXMuSGFuZGxlU2luZ2xlTW90b3JWaWJyYXRlQ21kKTtcbiAgICAgIHRoaXMuTXNnRnVuY3Muc2V0KE1lc3NhZ2VzLlZpYnJhdGVDbWQubmFtZSwgdGhpcy5IYW5kbGVWaWJyYXRlQ21kKTtcbiAgICB9XG4gICAgaWYgKHNob3VsZExpbmVhcikge1xuICAgICAgdGhpcy5Nc2dGdW5jcy5zZXQoTWVzc2FnZXMuRmxlc2hsaWdodExhdW5jaEZXMTJDbWQubmFtZSwgdGhpcy5IYW5kbGVGbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZCk7XG4gICAgICB0aGlzLk1zZ0Z1bmNzLnNldChNZXNzYWdlcy5MaW5lYXJDbWQubmFtZSwgdGhpcy5IYW5kbGVMaW5lYXJDbWQpO1xuICAgIH1cbiAgICBpZiAoc2hvdWxkUm90YXRlKSB7XG4gICAgICB0aGlzLk1zZ0Z1bmNzLnNldChNZXNzYWdlcy5Sb3RhdGVDbWQubmFtZSwgdGhpcy5IYW5kbGVSb3RhdGVDbWQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgQ29ubmVjdGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9jb25uZWN0ZWQ7XG4gIH1cblxuICBwdWJsaWMgc2V0IENvbm5lY3RlZChjb25uZWN0ZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9jb25uZWN0ZWQgPSBjb25uZWN0ZWQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IE1lc3NhZ2VTcGVjaWZpY2F0aW9ucygpOiBvYmplY3Qge1xuICAgIGlmICh0aGlzLk1zZ0Z1bmNzLmhhcyhNZXNzYWdlcy5WaWJyYXRlQ21kLm5hbWUpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBWaWJyYXRlQ21kOiB7IEZlYXR1cmVDb3VudDogMiB9LFxuICAgICAgICBTaW5nbGVNb3RvclZpYnJhdGVDbWQ6IHt9LFxuICAgICAgICBTdG9wRGV2aWNlQ21kOiB7fSxcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0aGlzLk1zZ0Z1bmNzLmhhcyhNZXNzYWdlcy5MaW5lYXJDbWQubmFtZSkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIExpbmVhckNtZDogeyBGZWF0dXJlQ291bnQ6IDEgfSxcbiAgICAgICAgRmxlc2hsaWdodExhdW5jaEZXMTJDbWQ6IHt9LFxuICAgICAgICBTdG9wRGV2aWNlQ21kOiB7fSxcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0aGlzLk1zZ0Z1bmNzLmhhcyhNZXNzYWdlcy5Sb3RhdGVDbWQubmFtZSkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIFJvdGF0ZUNtZDogeyBGZWF0dXJlQ291bnQ6IDEgfSxcbiAgICAgICAgU3RvcERldmljZUNtZDoge30sXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICBwdWJsaWMgRGlzY29ubmVjdCgpIHtcbiAgICB0aGlzLl9jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmVtaXQoXCJkZXZpY2VyZW1vdmVkXCIsIHRoaXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBIYW5kbGVTdG9wRGV2aWNlQ21kID0gYXN5bmMgKGFNc2c6IE1lc3NhZ2VzLlN0b3BEZXZpY2VDbWQpOiBQcm9taXNlPE1lc3NhZ2VzLkJ1dHRwbHVnTWVzc2FnZT4gPT4ge1xuICAgIGlmICh0aGlzLk1zZ0Z1bmNzLmhhcyhNZXNzYWdlcy5WaWJyYXRlQ21kLm5hbWUpKSB7XG4gICAgICB0aGlzLmVtaXQoXCJ2aWJyYXRlXCIsIDApO1xuICAgIH0gZWxzZSBpZiAodGhpcy5Nc2dGdW5jcy5oYXMoTWVzc2FnZXMuTGluZWFyQ21kLm5hbWUpKSB7XG4gICAgICB0aGlzLmVtaXQoXCJsaW5lYXJcIiwgeyBwb3NpdGlvbjogdGhpcy5fbGluZWFyUG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IHRoaXMuX2xpbmVhclNwZWVkfSk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IE1lc3NhZ2VzLk9rKGFNc2cuSWQpKTtcbiAgfVxuXG4gIHByaXZhdGUgSGFuZGxlU2luZ2xlTW90b3JWaWJyYXRlQ21kID1cbiAgICBhc3luYyAoYU1zZzogTWVzc2FnZXMuU2luZ2xlTW90b3JWaWJyYXRlQ21kKTogUHJvbWlzZTxNZXNzYWdlcy5CdXR0cGx1Z01lc3NhZ2U+ID0+IHtcbiAgICAgIHRoaXMuX3ZpYnJhdGVTcGVlZCA9IGFNc2cuU3BlZWQ7XG4gICAgICB0aGlzLmVtaXQoXCJ2aWJyYXRlXCIsIGFNc2cuU3BlZWQpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgTWVzc2FnZXMuT2soYU1zZy5JZCkpO1xuICAgIH1cblxuICBwcml2YXRlIEhhbmRsZVZpYnJhdGVDbWQgPVxuICAgIGFzeW5jIChhTXNnOiBNZXNzYWdlcy5WaWJyYXRlQ21kKTogUHJvbWlzZTxNZXNzYWdlcy5CdXR0cGx1Z01lc3NhZ2U+ID0+IHtcbiAgICAgIHJldHVybiB0aGlzLkhhbmRsZVNpbmdsZU1vdG9yVmlicmF0ZUNtZChuZXcgU2luZ2xlTW90b3JWaWJyYXRlQ21kKGFNc2cuU3BlZWRzWzBdLlNwZWVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYU1zZy5EZXZpY2VJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFNc2cuSWQpKTtcbiAgICB9XG5cbiAgcHJpdmF0ZSBIYW5kbGVSb3RhdGVDbWQgPVxuICAgIGFzeW5jIChhTXNnOiBNZXNzYWdlcy5Sb3RhdGVDbWQpOiBQcm9taXNlPE1lc3NhZ2VzLkJ1dHRwbHVnTWVzc2FnZT4gPT4ge1xuICAgICAgdGhpcy5fcm90YXRlU3BlZWQgPSBhTXNnLlJvdGF0aW9uc1swXS5TcGVlZDtcbiAgICAgIHRoaXMuX3JvdGF0ZUNsb2Nrd2lzZSA9IGFNc2cuUm90YXRpb25zWzBdLkNsb2Nrd2lzZTtcbiAgICAgIHRoaXMuZW1pdChcInZpYnJhdGVcIiwgeyBzcGVlZDogdGhpcy5fcm90YXRlU3BlZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb2Nrd2lzZTogdGhpcy5fcm90YXRlQ2xvY2t3aXNlIH0pO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgTWVzc2FnZXMuT2soYU1zZy5JZCkpO1xuICAgIH1cblxuICBwcml2YXRlIEhhbmRsZUZsZXNobGlnaHRMYXVuY2hGVzEyQ21kID1cbiAgICBhc3luYyAoYU1zZzogTWVzc2FnZXMuRmxlc2hsaWdodExhdW5jaEZXMTJDbWQpOiBQcm9taXNlPE1lc3NhZ2VzLkJ1dHRwbHVnTWVzc2FnZT4gPT4ge1xuICAgICAgdGhpcy5fbGluZWFyUG9zaXRpb24gPSBhTXNnLlBvc2l0aW9uO1xuICAgICAgdGhpcy5fbGluZWFyU3BlZWQgPSBhTXNnLlNwZWVkO1xuICAgICAgdGhpcy5lbWl0KFwibGluZWFyXCIsIHsgcG9zaXRpb246IHRoaXMuX2xpbmVhclBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVkOiB0aGlzLl9saW5lYXJTcGVlZCB9KTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IE1lc3NhZ2VzLk9rKGFNc2cuSWQpKTtcbiAgICB9XG5cbiAgcHJpdmF0ZSBIYW5kbGVMaW5lYXJDbWQgPVxuICAgIGFzeW5jIChhTXNnOiBNZXNzYWdlcy5MaW5lYXJDbWQpOiBQcm9taXNlPE1lc3NhZ2VzLkJ1dHRwbHVnTWVzc2FnZT4gPT4ge1xuICAgICAgaWYgKGFNc2cuVmVjdG9ycy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlcy5FcnJvcihcIkxpbmVhckNtZCByZXF1aXJlcyAxIHZlY3RvciBmb3IgdGhpcyBkZXZpY2UuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWVzc2FnZXMuRXJyb3JDbGFzcy5FUlJPUl9ERVZJQ0UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYU1zZy5JZCk7XG4gICAgICB9XG4gICAgICAvLyBNb3ZlIGJldHdlZW4gNS85NSwgb3RoZXJ3aXNlIHdlJ2xsIGFsbG93IHRoZSBkZXZpY2UgdG8gc21hY2sgaW50byBoYXJkXG4gICAgICAvLyBzdG9wcyBiZWNhdXNlIG9mIGJyYWluZGVhZCBmaXJtd2FyZS5cbiAgICAgIGNvbnN0IHJhbmdlOiBudW1iZXIgPSA5MDtcbiAgICAgIGNvbnN0IHZlY3RvciA9IGFNc2cuVmVjdG9yc1swXTtcbiAgICAgIGNvbnN0IGN1cnJlbnRQb3NpdGlvbiA9IHZlY3Rvci5Qb3NpdGlvbiAqIDEwMDtcbiAgICAgIGNvbnN0IHBvc2l0aW9uRGVsdGE6IG51bWJlciA9IE1hdGguYWJzKGN1cnJlbnRQb3NpdGlvbiAtIHRoaXMuX2xpbmVhclBvc2l0aW9uKTtcbiAgICAgIGxldCBzcGVlZDogbnVtYmVyID0gTWF0aC5mbG9vcigyNTAwMCAqIE1hdGgucG93KCgodmVjdG9yLkR1cmF0aW9uICogOTApIC8gcG9zaXRpb25EZWx0YSksIC0xLjA1KSk7XG5cbiAgICAgIC8vIENsYW1wIHNwZWVkIG9uIDAgPD0geCA8PSA5NSBzbyB3ZSBkb24ndCBicmVhayB0aGUgbGF1bmNoLlxuICAgICAgc3BlZWQgPSBNYXRoLm1pbihNYXRoLm1heChzcGVlZCwgMCksIDk1KTtcblxuICAgICAgY29uc3QgcG9zaXRpb25Hb2FsID0gTWF0aC5mbG9vcigoKGN1cnJlbnRQb3NpdGlvbiAvIDk5KSAqIHJhbmdlKSArICgoOTkgLSByYW5nZSkgLyAyKSk7XG4gICAgICAvLyBXZSdsbCBzZXQgdGhpcy5fbGFzdFBvc2l0aW9uIGluIEZsZXNobGlnaHRMYXVuY2hGVzEyQ21kLCBzaW5jZVxuICAgICAgLy8gZXZlcnl0aGluZyBraW5kYSBmdW5uZWxzIHRvIHRoYXQuXG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5IYW5kbGVGbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZChuZXcgTWVzc2FnZXMuRmxlc2hsaWdodExhdW5jaEZXMTJDbWQoc3BlZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25Hb2FsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFNc2cuRGV2aWNlSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYU1zZy5JZCkpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kZXZ0b29scy9UZXN0RGV2aWNlLnRzIiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcImV2ZW50c1wiO1xuaW1wb3J0IHsgSURldmljZVN1YnR5cGVNYW5hZ2VyIH0gZnJvbSBcIi4uL2luZGV4XCI7XG5pbXBvcnQgeyBUZXN0RGV2aWNlIH0gZnJvbSBcIi4vVGVzdERldmljZVwiO1xuaW1wb3J0IHsgQnV0dHBsdWdMb2dnZXIgfSBmcm9tIFwiLi4vaW5kZXhcIjtcblxuZXhwb3J0IGNsYXNzIFRlc3REZXZpY2VNYW5hZ2VyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIGltcGxlbWVudHMgSURldmljZVN1YnR5cGVNYW5hZ2VyIHtcblxuICBwcml2YXRlIF9pc1NjYW5uaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgX3Rlc3RWaWJyYXRpb25EZXZpY2UgPSBuZXcgVGVzdERldmljZShcIlRlc3QgVmlicmF0aW9uIERldmljZVwiLCB0cnVlLCBmYWxzZSwgZmFsc2UpO1xuICBwcml2YXRlIF90ZXN0TGluZWFyRGV2aWNlID0gbmV3IFRlc3REZXZpY2UoXCJUZXN0IExpbmVhciBEZXZpY2VcIiwgZmFsc2UsIHRydWUsIGZhbHNlKTtcbiAgcHJpdmF0ZSBfdGVzdFJvdGF0aW9uRGV2aWNlID0gbmV3IFRlc3REZXZpY2UoXCJUZXN0IFJvdGF0aW9uIERldmljZVwiLCBmYWxzZSwgZmFsc2UsIHRydWUpO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHVibGljIENvbm5lY3RWaWJyYXRpb25EZXZpY2UoKSB7XG4gICAgQnV0dHBsdWdMb2dnZXIuTG9nZ2VyLkRlYnVnKFwiVGVzdERldmljZU1hbmFnZXI6IENvbm5lY3RpbmcgVmlicmF0aW9uIERldmljZVwiKTtcbiAgICB0aGlzLl90ZXN0VmlicmF0aW9uRGV2aWNlLkNvbm5lY3RlZCA9IHRydWU7XG4gICAgdGhpcy5lbWl0KFwiZGV2aWNlYWRkZWRcIiwgdGhpcy5fdGVzdFZpYnJhdGlvbkRldmljZSk7XG4gIH1cblxuICBwdWJsaWMgQ29ubmVjdExpbmVhckRldmljZSgpIHtcbiAgICBCdXR0cGx1Z0xvZ2dlci5Mb2dnZXIuRGVidWcoXCJUZXN0RGV2aWNlTWFuYWdlcjogQ29ubmVjdGluZyBMaW5lYXIgRGV2aWNlXCIpO1xuICAgIHRoaXMuX3Rlc3RMaW5lYXJEZXZpY2UuQ29ubmVjdGVkID0gdHJ1ZTtcbiAgICB0aGlzLmVtaXQoXCJkZXZpY2VhZGRlZFwiLCB0aGlzLl90ZXN0TGluZWFyRGV2aWNlKTtcbiAgfVxuXG4gIHB1YmxpYyBDb25uZWN0Um90YXRpb25EZXZpY2UoKSB7XG4gICAgQnV0dHBsdWdMb2dnZXIuTG9nZ2VyLkRlYnVnKFwiVGVzdERldmljZU1hbmFnZXI6IENvbm5lY3RpbmcgUm90YXRpb24gRGV2aWNlXCIpO1xuICAgIHRoaXMuX3Rlc3RSb3RhdGlvbkRldmljZS5Db25uZWN0ZWQgPSB0cnVlO1xuICAgIHRoaXMuZW1pdChcImRldmljZWFkZGVkXCIsIHRoaXMuX3Rlc3RSb3RhdGlvbkRldmljZSk7XG4gIH1cblxuICBwdWJsaWMgU3RhcnRTY2FubmluZygpOiB2b2lkIHtcbiAgICBCdXR0cGx1Z0xvZ2dlci5Mb2dnZXIuRGVidWcoXCJUZXN0RGV2aWNlTWFuYWdlcjogU3RhcnRpbmcgU2NhblwiKTtcbiAgICB0aGlzLl9pc1NjYW5uaW5nID0gdHJ1ZTtcbiAgICAvLyBBbHdheXMgZW1pdCBkZXZpY2VzLiBJZiB0aGV5J3JlIGR1cGxpY2F0ZXMsIHRoZSBkZXZpY2UgbWFuYWdlciB3aWxsIHdlZWRcbiAgICAvLyB0aGVtIG91dC5cbiAgICBzZXRUaW1lb3V0KCgpID0+ICB7XG4gICAgICB0aGlzLkNvbm5lY3RWaWJyYXRpb25EZXZpY2UoKTtcbiAgICAgIHRoaXMuQ29ubmVjdExpbmVhckRldmljZSgpO1xuICAgICAgdGhpcy5Db25uZWN0Um90YXRpb25EZXZpY2UoKTtcbiAgICB9LCA1MCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLlN0b3BTY2FubmluZygpLCAxMDApO1xuICB9XG5cbiAgcHVibGljIGdldCBWaWJyYXRpb25EZXZpY2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Rlc3RWaWJyYXRpb25EZXZpY2U7XG4gIH1cblxuICBwdWJsaWMgZ2V0IExpbmVhckRldmljZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdGVzdExpbmVhckRldmljZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgUm90YXRpb25EZXZpY2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Rlc3RSb3RhdGlvbkRldmljZTtcbiAgfVxuXG4gIHB1YmxpYyBTdG9wU2Nhbm5pbmcoKTogdm9pZCB7XG4gICAgQnV0dHBsdWdMb2dnZXIuTG9nZ2VyLkRlYnVnKFwiVGVzdERldmljZU1hbmFnZXI6IFN0b3BwaW5nIFNjYW5cIik7XG4gICAgdGhpcy5faXNTY2FubmluZyA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdChcInNjYW5uaW5nZmluaXNoZWRcIik7XG4gIH1cblxuICBwdWJsaWMgZ2V0IElzU2Nhbm5pbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzU2Nhbm5pbmc7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kZXZ0b29scy9UZXN0RGV2aWNlTWFuYWdlci50cyIsImltcG9ydCB7IEJ1dHRwbHVnQ2xpZW50LCBCdXR0cGx1Z0VtYmVkZGVkU2VydmVyQ29ubmVjdG9yLCBCdXR0cGx1Z1NlcnZlciB9IGZyb20gXCIuLi9pbmRleFwiO1xuaW1wb3J0IHsgVGVzdERldmljZU1hbmFnZXIgfSBmcm9tIFwiLi9UZXN0RGV2aWNlTWFuYWdlclwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gQ3JlYXRlRGV2VG9vbHNDbGllbnQoKTogUHJvbWlzZTxCdXR0cGx1Z0NsaWVudD4ge1xuICBjb25zdCBjbGllbnQgPSBuZXcgQnV0dHBsdWdDbGllbnQoXCJUZXN0IENsaWVudFwiKTtcbiAgY29uc3Qgc2VydmVyID0gbmV3IEJ1dHRwbHVnU2VydmVyKFwiVGVzdCBTZXJ2ZXJcIik7XG4gIHNlcnZlci5DbGVhckRldmljZU1hbmFnZXJzKCk7XG4gIHNlcnZlci5BZGREZXZpY2VNYW5hZ2VyKG5ldyBUZXN0RGV2aWNlTWFuYWdlcigpKTtcbiAgY29uc3QgbG9jYWxDb25uZWN0b3IgPSBuZXcgQnV0dHBsdWdFbWJlZGRlZFNlcnZlckNvbm5lY3RvcigpO1xuICBsb2NhbENvbm5lY3Rvci5TZXJ2ZXIgPSBzZXJ2ZXI7XG4gIGF3YWl0IGNsaWVudC5Db25uZWN0KGxvY2FsQ29ubmVjdG9yKTtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjbGllbnQpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2RldnRvb2xzL3V0aWxzLnRzIiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vTG9nUGFuZWwuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0xvZ1BhbmVsLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vTG9nUGFuZWwuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZGV2dG9vbHMvd2ViL0xvZ1BhbmVsLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvZGV2dG9vbHMvd2ViL0xvZ1BhbmVsLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBpZD1cXFwiYnV0dHBsdWdkZXZ0b29sc2xvZ3BhbmVsXFxcIj5cXG4gIDx0ZXh0YXJlYSBpZD1cXFwiYnV0dHBsdWdkZXZ0b29sc2xvZ3RleHRhcmVhXFxcIiByZWFkb25seT48L3RleHRhcmVhPlxcbiAgPGRpdiBpZD1cXFwiYnV0dHBsdWdkZXZ0b29sc2xvZ2xldmVsXFxcIj5cXG4gICAgPGxhYmVsPlBhbmVsIExvZyBMZXZlbDo8L2xhYmVsPlxcbiAgICA8c2VsZWN0IGlkPVxcXCJidXR0cGx1Z2RldnRvb2xzbG9nbGV2ZWxwYW5lbHNlbGVjdFxcXCI+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiT2ZmXFxcIj5PZmY8L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJGYXRhbFxcXCI+RmF0YWw8L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJFcnJvclxcXCI+RXJyb3I8L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJXYXJuXFxcIj5XYXJuPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiSW5mb1xcXCI+SW5mbzwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkRlYnVnXFxcIiBzZWxlY3RlZD5EZWJ1Zzwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIlRyYWNlXFxcIj5UcmFjZTwvb3B0aW9uPlxcbiAgICA8L3NlbGVjdD5cXG4gICAgPGxhYmVsPkNvbnNvbGUgTG9nIExldmVsOjwvbGFiZWw+XFxuICAgIDxzZWxlY3QgaWQ9XFxcImJ1dHRwbHVnZGV2dG9vbHNsb2dsZXZlbGNvbnNvbGVzZWxlY3RcXFwiPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIk9mZlxcXCIgc2VsZWN0ZWQ+T2ZmPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiRmF0YWxcXFwiPkZhdGFsPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiRXJyb3JcXFwiPkVycm9yPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiV2FyblxcXCI+V2Fybjwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkluZm9cXFwiPkluZm88L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJEZWJ1Z1xcXCI+RGVidWc8L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJUcmFjZVxcXCI+VHJhY2U8L29wdGlvbj5cXG4gICAgPC9zZWxlY3Q+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG5cIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9kZXZ0b29scy93ZWIvTG9nUGFuZWwuaHRtbFxuLy8gbW9kdWxlIGlkID0gLi9zcmMvZGV2dG9vbHMvd2ViL0xvZ1BhbmVsLmh0bWxcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgQnV0dHBsdWdMb2dnZXIsIExvZ01lc3NhZ2UsIEJ1dHRwbHVnTG9nTGV2ZWwgfSBmcm9tIFwiLi4vLi4vaW5kZXhcIjtcbmNvbnN0IGpzUGFuZWwgPSByZXF1aXJlKFwiLi9qc3BhbmVsLmpzXCIpO1xucmVxdWlyZShcImpzcGFuZWw0L2Rpc3QvanNwYW5lbC5jc3NcIik7XG5yZXF1aXJlKFwianNwYW5lbDQvZGlzdC9mb250cy9qc2dseXBoLmVvdFwiKTtcbmNvbnN0IGxvZ1BhbmVsSFRNTCA9IHJlcXVpcmUoXCIuL0xvZ1BhbmVsLmh0bWxcIikudG9TdHJpbmcoKTtcbnJlcXVpcmUoXCIuL0xvZ1BhbmVsLmNzc1wiKTtcblxuZXhwb3J0IGNsYXNzIExvZ1BhbmVsIHtcblxuICBwdWJsaWMgc3RhdGljIFNob3dMb2dQYW5lbCgpIHtcbiAgICBqc1BhbmVsLmpzUGFuZWwuY3JlYXRlKHtcbiAgICAgIGlkOiAoKSA9PiBcImJ1dHRwbHVnLWxvZ2dlci1wYW5lbFwiLFxuICAgICAgdGhlbWU6ICAgICAgIFwicHJpbWFyeVwiLFxuICAgICAgaGVhZGVyVGl0bGU6IFwiQnV0dHBsdWcgTG9nXCIsXG4gICAgICBwb3NpdGlvbjogICAgXCJjZW50ZXItdG9wIDAgODBcIixcbiAgICAgIGNvbnRlbnRTaXplOiBcIjY1MCAyNTBcIixcbiAgICAgIGNhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQuaW5uZXJIVE1MID0gbG9nUGFuZWxIVE1MO1xuICAgICAgICBMb2dQYW5lbC5fcGFuZWwgPSBuZXcgTG9nUGFuZWwoKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfcGFuZWw6IExvZ1BhbmVsIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgbG9nVGV4dEFyZWE6IEhUTUxUZXh0QXJlYUVsZW1lbnQ7XG4gIHByaXZhdGUgcGFuZWxMZXZlbFNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQ7XG4gIHByaXZhdGUgY29uc29sZUxldmVsU2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxvZ1RleHRBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0cGx1Z2RldnRvb2xzbG9ndGV4dGFyZWFcIikhIGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQ7XG4gICAgdGhpcy5wYW5lbExldmVsU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0cGx1Z2RldnRvb2xzbG9nbGV2ZWxwYW5lbHNlbGVjdFwiKSEgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgdGhpcy5jb25zb2xlTGV2ZWxTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1dHRwbHVnZGV2dG9vbHNsb2dsZXZlbGNvbnNvbGVzZWxlY3RcIikhIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xuICAgIGNvbnN0IGxvZyA9IEJ1dHRwbHVnTG9nZ2VyLkxvZ2dlcjtcbiAgICBsb2cuYWRkTGlzdGVuZXIoXCJsb2dcIiwgKG1zZykgPT4ge1xuICAgICAgdGhpcy5hZGRMb2dNZXNzYWdlKG1zZyk7XG4gICAgfSk7XG4gICAgdGhpcy5wYW5lbExldmVsU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgbG9nLk1heGltdW1FdmVudExvZ0xldmVsID0gQnV0dHBsdWdMb2dMZXZlbFt0aGlzLnBhbmVsTGV2ZWxTZWxlY3QudmFsdWVdO1xuICAgIH0pO1xuICAgIHRoaXMuY29uc29sZUxldmVsU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgbG9nLk1heGltdW1Db25zb2xlTG9nTGV2ZWwgPSBCdXR0cGx1Z0xvZ0xldmVsW3RoaXMuY29uc29sZUxldmVsU2VsZWN0LnZhbHVlXTtcbiAgICB9KTtcbiAgICBsb2cuTWF4aW11bUV2ZW50TG9nTGV2ZWwgPSBCdXR0cGx1Z0xvZ0xldmVsLkRlYnVnO1xuICAgIGxvZy5EZWJ1ZyhcIkxvZ1BhbmVsOiBEZXZUb29scyBMb2cgcGFuZWwgZW5hYmxlZC5cIik7XG4gIH1cblxuICBwcml2YXRlIGFkZExvZ01lc3NhZ2UobXNnOiBMb2dNZXNzYWdlKSB7XG4gICAgdGhpcy5sb2dUZXh0QXJlYS52YWx1ZSA9IHRoaXMubG9nVGV4dEFyZWEudmFsdWUgKyBcIlxcblwiICsgbXNnLkZvcm1hdHRlZE1lc3NhZ2U7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2RldnRvb2xzL3dlYi9Mb2dQYW5lbC50cyIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2RldnRvb2xzL3dlYi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvZGV2dG9vbHMvd2ViL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCI8bWFpbj5cXG4gIDxpbnB1dCBpZD1cXFwidGFiMVxcXCIgdHlwZT1cXFwicmFkaW9cXFwiIG5hbWU9XFxcInRhYnNcXFwiIGNoZWNrZWQ+XFxuICA8bGFiZWwgZm9yPVxcXCJ0YWIxXFxcIj5UZXN0IERldmljZXM8L2xhYmVsPlxcbiAgPHNlY3Rpb24gaWQ9XFxcImNvbnRlbnQxXFxcIj5cXG4gICAgPGRpdiBpZD1cXFwic2ltdWxhdG9yXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJ2aWJyYXRvci1zaW11bGF0b3ItY29tcG9uZW50XFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInZpYnJhdG9yXFxcIj5cXG4gICAgICAgICAgPGltZyBzcmM9XFxcIlwiICsgcmVxdWlyZShcIi4vaHVzaC5wbmdcIikgKyBcIlxcXCJcXG4gICAgICAgICAgICAgICBpZD1cXFwidmlicmF0b3ItaW1hZ2VcXFwiPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJ2aWJyYXRvci1pbmZvXFxcIj5cXG4gICAgICAgICAgPGI+VmlicmF0aW9uIFNwZWVkOjwvYj4gPHNwYW4gaWQ9XFxcInZpYnJhdGlvbnNwZWVkXFxcIj4wPC9zcGFuPjxici8+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcInZpYnJhdGVkaXNjb25uZWN0XFxcIj5EaXNjb25uZWN0PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJzaW11bGF0b3ItZGl2aWRlclxcXCI+PC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiZmxlc2hsaWdodC1zaW1cXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiYy1mbGVzaGxpZ2h0XFxcIj5cXG4gICAgICAgICAgPGRpdj5cXG4gICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCIgKyByZXF1aXJlKFwiLi9ydWxlci5wbmdcIikgKyBcIlxcXCI+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8ZGl2PlxcbiAgICAgICAgICAgIDxpbWcgc3JjPVxcXCJcIiArIHJlcXVpcmUoXCIuL2ZsZXNobGlnaHQucG5nXCIpICsgXCJcXFwiXFxuICAgICAgICAgICAgICAgICBjbGFzcz1cXFwiby1mbGVzaGxpZ2h0XFxcIlxcbiAgICAgICAgICAgICAgICAgaWQ9XFxcImZsZXNobGlnaHQtaW1hZ2VcXFwiPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdj5cXG4gICAgICAgICAgPGI+U3BlZWQ6PC9iPiA8c3BhbiBpZD1cXFwibGluZWFyc3BlZWRcXFwiPjA8L3NwYW4+PGJyLz5cXG4gICAgICAgICAgPGI+UG9zaXRpb246PC9iPiA8c3BhbiBpZD1cXFwibGluZWFycG9zaXRpb25cXFwiPjA8L3NwYW4+PGJyLz5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwibGluZWFyZGlzY29ubmVjdFxcXCI+RGlzY29ubmVjdDwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9zZWN0aW9uPlxcbjwvbWFpbj5cXG5cIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC5odG1sXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC5odG1sXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IEJ1dHRwbHVnU2VydmVyLCBCdXR0cGx1Z0xvZ2dlciB9IGZyb20gXCIuLi8uLi9pbmRleFwiO1xuaW1wb3J0IHsgVGVzdERldmljZU1hbmFnZXIgfSBmcm9tIFwiLi4vVGVzdERldmljZU1hbmFnZXJcIjtcbmltcG9ydCAqIGFzIFRXRUVOIGZyb20gXCJAdHdlZW5qcy90d2Vlbi5qc1wiO1xuXG5jb25zdCBqc1BhbmVsID0gcmVxdWlyZShcIi4vanNwYW5lbC5qc1wiKTtcbnJlcXVpcmUoXCJqc3BhbmVsNC9kaXN0L2pzcGFuZWwuY3NzXCIpO1xucmVxdWlyZShcImpzcGFuZWw0L2Rpc3QvZm9udHMvanNnbHlwaC5lb3RcIik7XG5jb25zdCB0ZXN0UGFuZWxIVE1MID0gcmVxdWlyZShcIi4vVGVzdERldmljZU1hbmFnZXJQYW5lbC5odG1sXCIpLnRvU3RyaW5nKCk7XG5yZXF1aXJlKFwiLi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmNzc1wiKTtcblxuZXhwb3J0IGNsYXNzIFRlc3REZXZpY2VNYW5hZ2VyUGFuZWwge1xuICBwdWJsaWMgc3RhdGljIFNob3dUZXN0RGV2aWNlTWFuYWdlclBhbmVsKGJ1dHRwbHVnU2VydmVyOiBCdXR0cGx1Z1NlcnZlcikge1xuICAgIGxldCB0ZG06IFRlc3REZXZpY2VNYW5hZ2VyIHwgbnVsbCA9IG51bGw7XG4gICAgZm9yIChjb25zdCBtZ3Igb2YgYnV0dHBsdWdTZXJ2ZXIuRGV2aWNlTWFuYWdlcnMpIHtcbiAgICAgIGlmIChtZ3IuY29uc3RydWN0b3IubmFtZSA9PT0gXCJUZXN0RGV2aWNlTWFuYWdlclwiKSB7XG4gICAgICAgIHRkbSA9IChtZ3IgYXMgVGVzdERldmljZU1hbmFnZXIpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRkbSA9PT0gbnVsbCkge1xuICAgICAgQnV0dHBsdWdMb2dnZXIuTG9nZ2VyLkVycm9yKFwiVGVzdERldmljZU1hbmFnZXJQYW5lbDogQ2Fubm90IGdldCB0ZXN0IGRldmljZSBtYW5hZ2VyIGZyb20gc2VydmVyLlwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBnZXQgdGVzdCBkZXZpY2UgbWFuYWdlciBmcm9tIHNlcnZlci5cIik7XG4gICAgfVxuICAgIGpzUGFuZWwuanNQYW5lbC5jcmVhdGUoe1xuICAgICAgaWQ6ICgpID0+IFwiYnV0dHBsdWctdGVzdC1kZXZpY2UtbWFuYWdlci1wYW5lbFwiLFxuICAgICAgdGhlbWU6ICAgICAgIFwicHJpbWFyeVwiLFxuICAgICAgaGVhZGVyVGl0bGU6IFwiVGVzdCBEZXZpY2UgTWFuYWdlclwiLFxuICAgICAgcG9zaXRpb246ICAgIFwiY2VudGVyLXRvcCAwIDgwXCIsXG4gICAgICBjb250ZW50U2l6ZTogXCI0MDAgMjUwXCIsXG4gICAgICBjYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LmlubmVySFRNTCA9IHRlc3RQYW5lbEhUTUw7XG4gICAgICAgIFRlc3REZXZpY2VNYW5hZ2VyUGFuZWwuX3BhbmVsID0gbmV3IFRlc3REZXZpY2VNYW5hZ2VyUGFuZWwodGRtISk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIHN0YXRpYyBfcGFuZWw6IFRlc3REZXZpY2VNYW5hZ2VyUGFuZWw7XG4gIHByaXZhdGUgX3Rlc3RNYW5hZ2VyOiBUZXN0RGV2aWNlTWFuYWdlcjtcbiAgcHJpdmF0ZSBmbGVzaGxpZ2h0RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgdmlicmF0b3JFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBjdXJyZW50TGF1bmNoUG9zaXRpb246IGFueSA9IHsgeDogMCwgeTogMCB9O1xuICBwcml2YXRlIGxhc3RQb3NpdGlvbjogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBtb3ZlUmFkaXVzOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIGN1cnJlbnRWaWJyYXRlUG9zaXRpb246IGFueSA9IHsgeDogMCwgeTogMCB9O1xuXG4gIGNvbnN0cnVjdG9yKHRkbTogVGVzdERldmljZU1hbmFnZXIpIHtcbiAgICB0aGlzLl90ZXN0TWFuYWdlciA9IHRkbTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpYnJhdGVkaXNjb25uZWN0XCIpIS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5fdGVzdE1hbmFnZXIhLlZpYnJhdGlvbkRldmljZS5EaXNjb25uZWN0KCk7XG4gICAgfSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaW5lYXJkaXNjb25uZWN0XCIpIS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5fdGVzdE1hbmFnZXIhLkxpbmVhckRldmljZS5EaXNjb25uZWN0KCk7XG4gICAgfSk7XG4gICAgdGhpcy5fdGVzdE1hbmFnZXIuVmlicmF0aW9uRGV2aWNlLmFkZExpc3RlbmVyKFwidmlicmF0ZVwiLCAoc3BlZWQpID0+IHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlicmF0aW9uc3BlZWRcIikhLmlubmVySFRNTCA9IHNwZWVkO1xuICAgICAgdGhpcy52aWJyYXRlTW92ZShzcGVlZCk7XG4gICAgfSk7XG4gICAgdGhpcy5fdGVzdE1hbmFnZXIuTGluZWFyRGV2aWNlLmFkZExpc3RlbmVyKFwibGluZWFyXCIsIChsaW5lYXJvYmo6IGFueSkgPT4ge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaW5lYXJwb3NpdGlvblwiKSEuaW5uZXJIVE1MID0gbGluZWFyb2JqLnBvc2l0aW9uO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaW5lYXJzcGVlZFwiKSEuaW5uZXJIVE1MID0gbGluZWFyb2JqLnNwZWVkO1xuICAgICAgdGhpcy5sYXVuY2hNb3ZlKGxpbmVhcm9iai5wb3NpdGlvbiwgbGluZWFyb2JqLnNwZWVkKTtcbiAgICB9KTtcbiAgICB0aGlzLmZsZXNobGlnaHRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmbGVzaGxpZ2h0LWltYWdlXCIpITtcbiAgICB0aGlzLnZpYnJhdG9yRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlicmF0b3ItaW1hZ2VcIikhO1xuICB9XG5cbiAgcHJpdmF0ZSBsYXVuY2hNb3ZlID0gKHBvc2l0aW9uLCBzcGVlZCkgPT4ge1xuICAgIGNvbnN0IHAgPSAtKCgxMDAgLSBwb3NpdGlvbikgKiAwLjIyKTtcbiAgICBjb25zdCBkdXJhdGlvbiA9IHRoaXMubW92ZUR1cmF0aW9uKHBvc2l0aW9uLCBzcGVlZCk7XG4gICAgbmV3IFRXRUVOLlR3ZWVuKHRoaXMuY3VycmVudExhdW5jaFBvc2l0aW9uKVxuICAgICAgLnRvKHt4OiAwLCB5OiBwfSwgZHVyYXRpb24pXG4gICAgICAuc3RhcnQoKTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sYXVuY2hBbmltYXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgbGF1bmNoQW5pbWF0ZSA9ICh0aW1lc3RhbXA6IG51bWJlcikgPT4ge1xuICAgIGlmICghVFdFRU4udXBkYXRlKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5mbGVzaGxpZ2h0RWxlbWVudC5zdHlsZS5ib3R0b20gPSBgJHt0aGlzLmN1cnJlbnRMYXVuY2hQb3NpdGlvbi55fSVgO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxhdW5jaEFuaW1hdGUpO1xuICB9XG5cbiAgLy8gbW92ZUR1cmF0aW9uIHJldHVybnMgdGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGl0IHdpbGwgdGFrZSB0byBtb3ZlXG4gIC8vIHRvIHBvc2l0aW9uIGF0IHNwZWVkLlxuICAvL1xuICAvLyBwb3NpdGlvbjogcG9zaXRpb24gaW4gcGVyY2VudCAoMC0xMDApLlxuICAvLyBzcGVlZDogICAgc3BlZWQgaW4gcGVyY2VudCAoMjAtMTAwKS5cbiAgcHJpdmF0ZSBtb3ZlRHVyYXRpb24gPSAocG9zaXRpb246IG51bWJlciwgc3BlZWQ6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5hYnMocG9zaXRpb24gLSB0aGlzLmxhc3RQb3NpdGlvbik7XG4gICAgdGhpcy5sYXN0UG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICByZXR1cm4gdGhpcy5jYWxjRHVyYXRpb24oZGlzdGFuY2UsIHNwZWVkKTtcbiAgfVxuXG4gIC8vIF9jYWxjRHVyYXRpb24gcmV0dXJucyBkdXJhdGlvbiBvZiBhIG1vdmUgaW4gbWlsbGlzZWNvbmRzIGZvciBhIGdpdmVuXG4gIC8vIGRpc3RhbmNlL3NwZWVkLlxuICAvL1xuICAvLyBkaXN0YW5jZTogYW1vdW50IHRvIG1vdmUgcGVyY2VudCAoMC0xMDApLlxuICAvLyBzcGVlZDogc3BlZWQgdG8gbW92ZSBhdCBpbiBwZXJjZW50ICgyMC0xMDApLlxuICBwcml2YXRlIGNhbGNEdXJhdGlvbiA9IChkaXN0YW5jZTogbnVtYmVyLCBzcGVlZDogbnVtYmVyKSA9PiB7XG4gICAgcmV0dXJuIE1hdGgucG93KHNwZWVkIC8gMjUwMDAsIC0wLjk1KSAvICg5MCAvIGRpc3RhbmNlKTtcbiAgfVxuXG4gIHByaXZhdGUgdmlicmF0ZU1vdmUgPSAoc3BlZWQpID0+IHtcbiAgICB0aGlzLm1vdmVSYWRpdXMgPSBzcGVlZDtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy52aWJyYXRlQW5pbWF0ZSk7XG4gIH1cblxuICBwcml2YXRlIHZpYnJhdGVBbmltYXRlID0gKHRpbWVzdGFtcDogbnVtYmVyKSA9PiB7XG4gICAgaWYgKCFUV0VFTi51cGRhdGUoKSkge1xuICAgICAgaWYgKHRoaXMubW92ZVJhZGl1cyAhPT0gMCkge1xuICAgICAgICBuZXcgVFdFRU4uVHdlZW4odGhpcy5jdXJyZW50VmlicmF0ZVBvc2l0aW9uKVxuICAgICAgICAgIC50byh7eDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5tb3ZlUmFkaXVzICogMjApLFxuICAgICAgICAgICAgICAgeTogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5tb3ZlUmFkaXVzICogMjApfVxuICAgICAgICAgICAgICAsIDM0KVxuICAgICAgICAgIC5zdGFydCgpO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy52aWJyYXRlQW5pbWF0ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudmlicmF0b3JFbGVtZW50LnN0eWxlLnRvcCA9IGAke3RoaXMuY3VycmVudFZpYnJhdGVQb3NpdGlvbi54fXB4YDtcbiAgICB0aGlzLnZpYnJhdG9yRWxlbWVudC5zdHlsZS5yaWdodCA9IGAke3RoaXMuY3VycmVudFZpYnJhdGVQb3NpdGlvbi55fXB4YDtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy52aWJyYXRlQW5pbWF0ZSk7XG4gIH1cbn1cblxuLy8gU29tZSBjb2RlIGluIHRoaXMgZmlsZSB0YWtlbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9mdW5qYWNrL2xhdW5jaGNvbnRyb2xcbi8vIE1JVCBMaWNlbnNlOlxuLypcbkxhdWNoY29udHJvbCBVSSBGbGVzaGxpZ2h0XG5cbmh0dHBzOi8vZ2l0aHViLmNvbS9mdW5qYWNrL2xhdW5jaGNvbnRyb2xcblxuQ29weXJpZ2h0IDIwMTcgRnVuamFja1xuXG5SZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbm1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuXG4xLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbmxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuXG4yLiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG50aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uXG5hbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cblxuMy4gTmVpdGhlciB0aGUgbmFtZSBvZiB0aGUgY29weXJpZ2h0IGhvbGRlciBub3IgdGhlIG5hbWVzIG9mIGl0cyBjb250cmlidXRvcnNcbm1heSBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0cyBkZXJpdmVkIGZyb20gdGhpcyBzb2Z0d2FyZSB3aXRob3V0XG5zcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXG5cblRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORFxuQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbldBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkVcbkRJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEVcbkZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMXG5EQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUlxuU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVJcbkNBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksXG5PUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRVxuT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiovXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZGV2dG9vbHMvd2ViL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwudHMiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFEUUFBQUJuQ0FZQUFBQlBZbUd5QUFBQUJtSkxSMFFBL3dEL0FQK2d2YWVUQUFBQUNYQklXWE1BQUFzVEFBQUxFd0VBbXB3WUFBQUFCM1JKVFVVSDRRUWVDeWNUQnFUNHNRQUFBQmwwUlZoMFEyOXRiV1Z1ZEFCRGNtVmhkR1ZrSUhkcGRHZ2dSMGxOVUZlQkRoY0FBQU5KU1VSQlZIamE3WnkvYjV0QUZNZmZJZFNoYVRkTGpwMnRrdG02OEE5MDc1b0Jwa3FaK3dmMGIrZ2YwTmxTSmp4NHpaN1Z3MGxXTnlOMVMxeExXVkRWSmJKNUhleExBUFBqT0xnRHUrODdoUmpmdlEvdkYzZVFNR2dtQkQxaXhyOG9ZSHpmQndDQTFXcVYrbkN6L2wzNjVjdnhLSFU4bVV3QUFDQUlna2EyMmFvd0FxUnRpWEdESUVBVktBdk9UQVRVcklMZ2VRR3huSlJBeE5NRVFrUWpIcktOZVlmcDk0NVJJRm5JcmpveUdrczdVeDdLTnRheU93VkVQUExHY0hTWk9uWWNKM1djdUdPZ1BuU1N1ZEk2a0dwSTZCNWJCUWg5M3dmZjkydFBYT1FweTdKU01HSjhsZUtqdFd3L3JCOXpmMzgxR3FlTzR6anVSOWxPVnJwc2xlT2NIeG1lQkhWZHQ3REtOVmtUS2VkUTJYcW9ERVo0aUhNT3U5MnU5dGpHcXh6bi9PanE1OGwxWFZndWwyRGJOdGgyZTVGdmRRR1RoRm9zRnJUQUl5QnFyQzNETkdtc1p4ZHlLdldTSGZiTVFNZmVYTWJ6L1dpc2JVQlJsU01nNmtQVWg2Z1BVUitpUGtSbG00Q29EMUVmb2o1RWZZaXFIQUVSRURWV2FxelVXS214bm5aanpUNWZyYXZ0ZHR0NGpNWkZJVSt1NndMblhIcWdzaWQrVkJRVWt3NDl6MHU5UUpFWEtzSkxaWS8xaFVlemNod245UjdkYkRhclphZWxJM2RrbjRMcnlFZHRiNUpjamNiU2I1SjAzWWVrcjZTcTRXRVl2cnhwcjdNb29PZDU1cEw3a0tlSE9WRnJEbFY1cCtydkhtVE9VYzJsLzNiNVlEVGNzaEpoRi96ODl1R3NQT1IvL1A3TE9KQk0vcWljU3psRVFBUkVRTjBEcVZTdHRpc2RlWWlBQ01nd1VCaUdyU2QzMFhlTDVpSVBFZEFKQVdIWGk3dnNJcTlxZjZGczF3ZkZyczFoc3crNkFoUHpDM3NlMW8rRi81cUF5UUFKRmUyekpTZFRWWjJ4RCtmV0JoSXVsaksyekNBWjFaeWowRzRwRDRtQmRPNTR5b0JrN0dGMWMram82dlVsNU1wRUlkZjNrS3Zsb2E1RFRzWkRWVG5FY0RwSGRuTmRhYlRPa0l1aUNPSTRCcHpPZ2QxY005WEd1citUR0E0QTcrNEJOazhnd0lUZXZiMW96VU5SRkJWKzl1Zkg3ZjZINFVEYzNjU3FRSzlmSEE0QXAvUENFOTkvL2RJSTZNWG9QTzFCam0xU0FMb29HUmhnOHlSbmtJcXljNzNxRFFBOHF3TDlyVDFwQXJLaDRVVjZidUtoTnErc0VVazlMc2U3ZTRRZWlIMytWR2t2clZqN0x1azNOTG9PTzVsd3F3WFVGWmdzaURLUVNhaTZNTXBBdXNGVVFGb0JhaHVzQ1lqUVB4amlyeUNvcExXYkFBQUFBRWxGVGtTdVFtQ0NcIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2RldnRvb2xzL3dlYi9mbGVzaGxpZ2h0LnBuZ1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvZGV2dG9vbHMvd2ViL2ZsZXNobGlnaHQucG5nXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQURJQUFBQkJDQUlBQUFBYzYyQ0pBQUFBQkdkQlRVRUFBTEdQQy94aEJRQUFBQ0JqU0ZKTkFBQjZKZ0FBZ0lRQUFQb0FBQUNBNkFBQWRUQUFBT3BnQUFBNm1BQUFGM0NjdWxFOEFBQUFCbUpMUjBRQS93RC9BUCtndmFlVEFBQUFDWEJJV1hNQUFBc1NBQUFMRWdIUzNYNzhBQUFBQjNSSlRVVUg0UW9PRlNvRFZ5enhIQUFBQ1ZsSlJFRlVhTjdkV2wxc0UxY1dQbmYreHg2UC84WTJLVW5NTGswVUZycFNVV2tMS3RKV1ZaOFd5VEpzSkVRUWtXaEJMUkk4VlNvUEM2anFRNkpLZldDbFZtb1RpVUoydTFXa2h2U2xMV3JMQXhEQzhxT3RoTlFHVkVvU1oybXhqWDlpTzlNWno3MTNIeTRZTnduRlA1aVY5anhZTTNmbW52bnVPZWVldjJ0RUtZWG1pQkFDQU1QRHd3Q3dlL2R1bnVjUlFrM3lCTm9jRVVJd3hzZVBIdytIdzlGb2RHUmtCR05NQ0dtU2JiT3dITWM1ZE9pUVlSaFBQdm5rK3ZYcnU3dTdqeHc1Z2pGdWtpMXFVb21FRUplcUdvWmhoRUk4endQQXRXdlg1dWZuT1k1cmhtMVRreW1sKy9idE00d1FVR0NZQUtDN3UzdmZ2bjFOcnJZcFdOZXZYZnZtcTY4cElacW1WUVlSUXVmUG4vLysrKytiUWRZNExJenhxVk9uOHZrOFFtaVJ5bXpiUG4zNk5Oc1FqeHRXSXBFNGZ1S0VKRW1DSUNpS1V2M0k3WFovL1BISE16TXpEUXVzRVZpVVVveng0TURBZnhKekFBQUlFTCtZVHphYkhSd2NiSGpORFVwcmFtcnFxNisrWnJyeitueExYMUFVWlhKeWNtcHE2ckhDS3BWSzJXeUd3Uko0WVJtK0hGY29GQllXRmhyajM2RGYycmh4WTJKbUZnQjBuMWRWMVdvMEFJQXhadkhIN1hhZk9YUG1jVW1MQWdJRUFFc1hwT3Y2aWhVcm1vK0pqY0FhR2g2NjhjTVB5ejRLaDhPYXBybGNMbmFiVHFjLytPQ0RCaFJTTnl3V2h0bTF3UE9pS0ZZZVZZVGs4WGlxcHpRQXEyN2J1bno1OG90L2V0R3I2d0FnaW1MQUNGYUx5dWZ6QVlCcG1yZHUzY0lZQTBBaWtmajg4OCtmZWVhWjFrb0xvWWV2UkZYVlNDU3lWSW90aERVeE1TRkwwdEp4U1pKa1dhN2NDc0pkcitGMnV5Y25KMXNPNjVOL2Z1S3E4Z2pWRXFyMkZMSXNCd0lCQUFnRUFxT2pveTJIVlNNaGhLcDNRMnRocFZJcHk3SnFmTGxpZ283anBGS3BGc0lhR3h1YlN5UnEzTG91bDRzSkxKdk5uang1c2xXd0tLV0w5dFJ2WjhhU0pGVlMxbnFwUGxpZmZ2cHBOUlROb3oxMENnRElzdnpaWjUrMUNoYkhjZWZPbmZ1VkFHcFRKOC96bHk1ZGFoV3N4MG4vbDdDYUwrcGJBU3VmejFkZnN5cm9mdzlyRVlSTUpsTmRnUldMUmR1MkcrTXNORFp0V1NxWHkzTnpjN3F1cyt0TUp0TXdxMGNHaTFMSzg3eHBtcVpwTnMrdERpVVNRbDU0NFFXVzNGVkdITWRoMXdpaEI5WFFHT01OR3phMENoWkNhTnUyYmRYZnhoai9Vb05zTE11S3hXSXRoTFUwTHkwV2luVjk3OUhEQW9DdFc3ZTJkM1pVdXl1RVVENlhod2VIYlVxcDMrK1B4V0oxRlEzMXdRcUZRdjM5L2FiNXExb1pZd2NvUE1pd2NybmM5dTNiRGNOb29iUUE0S1dYWGdwSEloVkxCd0Ric25QWjdNTENRdlVnSTBLSXJ1c3Z2L3h5dlgzZXVnc3lTdW5VMU5TV1AyOUpKbSt6REFJaDVORTlnaWhxbXJhb295UUl3a2NmZmRUVDAxT3Y5Ni9iYnlHRWVucDY0bHZqL3hqNWV5WEowWFZkZGQrdHBITzVIQk1iUW1qNzl1MXIxcXlwOXhPTlNJc0pMSlZLN2R5NTgrclZxenppTU1HV2JWZlVKTXN5eDNIbGNybXJxMnQwZExTNllLeWRHb3lKaG1IczJyVUxBUEw1dkdtYUFYK2dzN096bzZOanc0WU5yRnJrZVg3UG5qM2hjTGd4L2swMXdEZHQzSmlZVFZCS2k4V2lRekJDcUwyOVhaSWsyN1lOd3poNzltekRuQnVQaVlTUTU1NS8vdHQvZjh2enZNdmxXdDNaQVFDQ0lOeTVjd2RqdkduVHBxVWxTZTNVVkdMVDE5Y25TcUxMNWFJQXM3T3ppVVRDNy9kcm1tWlpWbTl2YnpPY0c1Y1d4M0VJSWN1MkNTRkFZZFh2ZnlmTGNpYVRLWlZLNVhJWkd1cUlQQUpZakNSSlVtVUZBY3pOelltaXVINzlldHUyaThWbUEyV3pzQWdoWmFjTUZJSkcwT3YxM3JoeG8xZ3Nsa3FsWm1HeC9PbktsU3NjeHhtRzBkSFJ3YlJUNDN5TzR3UkJCRXF6MmV6OC9QemF0V3ZUNlhUekdiMEFBSU9EZzBORFEyeDdqNHlNUktQUldtWXl6MEl3THBmTExsWHRlS0lOQU9ibjUwVlJaSzBIOWtKakVMbmg0ZUdqUjQ4R2c4RkFJTEN3c0xCang0NTBPbDNMVEVMSTlQUzBJaXR1bDh2cjlRS0FLSXFLb2lpS0lvcmk5ZXZYYjk2ODJmamhTbVUxd1dCUTEvVmNMamMyTnZiYlIwanNqSWxTK3U2NzcxWmljeVFTV2JseVpXZG5aelFhYlc5dmYvdnR0L2Z2M3o4ek13UDNEbVBxZ3dVQVFNRTBUZGJPNDNuKzh1WExEMjFIalkyTnhXS3g2WnZUbFJGZDE2Vjd6Y3UydHJaUUtDU0tZandlNytycTJyeDU4L0R3OE4zVDN0cm83azZjeitWejJad1JNdHh1OS9qNCtHdXZ2YlkweERJSnZmUE9Pek16TXhNVEUwQ29MRW5NUlFGQW9WQmdwUmdqbDh1VlRDWURnVUEwR3VWNS90aXhZK2wwK3VEQmd6VzJsdmczM25qanl5Kyt3QTZXWkVuVE5OTTB5K1V5QzdwTXYyeVZVMU5UNCtQalc3WnMrZkhISDIvZnZzM3pmS20wd0RxRGlFTnV0OXMwVFhhQ1Z5d1dUZFBNWnJPMmJkdTJYU2dVRUVMaGNEaVJTRXhPVG5vOG5scTJGTUlZUC9mc3N6L2Qra2xXNUtCaCtIeStUQ1pqV2RaYmI3MFZqOGRaV1RFd01EQTZPbXBaRmp1ZXNINnhGb3BGQjJOQ2lLWnBzcXF3dnJJb2loekgyYmE5VkZtQ0lLeGV2YnBRS0JTTHhRTUhEc1RqOFlmQWNoeG5jR0R3YjBlUGlxS29xbXJQSDlha1VpbFdFek5ualJEeSsvMDg0a3FsVXNWeU9ZNlRGTm5qOFR6MHFMdzZZT3U2SG9sRUVvbEVmMzkvTEJZTGhVSVBtbzRJSVlTUVB6NzFWQzZYVXhUMWlaVlBoTVBoVkNwVktwVnl1UngyTUNBQUNzNDlHMkphODNsOWtuSzNDNjhvaXNmalVaZnJpak82YytlTzR6Z0lvWEs1N1BWNm1ha1FRb2FHaGpvN081ZDFiSWlaem9jZmZuajRyNGRFVWRSMFQxdGJtOC9ueStmenRtM1B6U2FXRmc2cVM5Vzkzb3BwdDdlMzEyTEZMQzM3K2VlZkthV1JTRVRUTkVMSWUrKzl0Mno2ZWpjTlRLVlNlL2ZzdlhEaGdzRHptcVpwbW9ZUWNyQ1RTcVlXR1lvb2lUNi8zK1B4R0liQkZGVDVYVjRkOS9ZTjgzQXNSbG1XSlVsU0tCUUtCb09IRHgrT1JxT0x0SG1mWFRLWmZQUE5OMDk5OGVWdm1Jc2tTYjZBbjFrSmh4QkN5RFROWkNxRllJa2lFQUNsOTNwTlZGSFZVQ2dFQUVCQjkrcjVmSjZGcVhBNDdEak8rKysvSDQxR3E3VjVIeFloSkpsTXZ2NzY2Lys2Y0lGRHl5Q2psS3FxcXZ1OHpHdHpnTmk2SGV3czdlMEtnbEQ5R1o3bjJXcEZVZlI0OVVxNGRMdmRQcDh2R0F3T0RnNkd3K0hLbFB1dzJFVTZuZTdyNjd0NDhhTG1jaS9LZXRtdHBNaVdaUlVLQllJSklXVGJYN1p0M3J5NVdsYUUwck5uem95ZFBMbG9iUWdobDBzVlJaSDlzVWRWRlVWUkZWVVJSVkhUdE43ZTNyMTc5eTRENno1ZlFyNzc3cnRYZHI4eU16Mjk2RkYwMVNwQ0NRQWNPM1pzM2JwMUxEZ3VTb1JZTUZqcXpRa2hBd01ENCtQakNHQjJaaFlBS0ZDdnp5Y0l3dE5QUDMzaXhJbHFQZzgwVll3eCswdFdOYjM2NnFzTkgweFU0Mk1oc2pJU2o4Y1hsVzcvQmVkUWI2RE9sYjZIQUFBQUdYUkZXSFJqYjIxdFpXNTBBRU55WldGMFpXUWdkMmwwYUNCSFNVMVE1NjlBeXdBQUFDVjBSVmgwWkdGMFpUcGpjbVZoZEdVQU1qQXhOeTB4TUMweE5GUXlNVG8wTWpvd015MHdOem93TU52aW9xTUFBQUFsZEVWWWRHUmhkR1U2Ylc5a2FXWjVBREl3TVRjdE1UQXRNVFJVTWpFNk5ESTZNRE10TURjNk1EQ3F2eG9mQUFBQUFFbEZUa1N1UW1DQ1wiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZGV2dG9vbHMvd2ViL2h1c2gucG5nXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9kZXZ0b29scy93ZWIvaHVzaC5wbmdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0ICogZnJvbSBcIi4uL1Rlc3REZXZpY2VcIjtcbmV4cG9ydCAqIGZyb20gXCIuLi9UZXN0RGV2aWNlTWFuYWdlclwiO1xuZXhwb3J0ICogZnJvbSBcIi4uL3V0aWxzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Mb2dQYW5lbFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vVGVzdERldmljZU1hbmFnZXJQYW5lbFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vdXRpbHMud2ViXCI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZGV2dG9vbHMvd2ViL2luZGV4LndlYi50cyIsIi8vIFdlIGhhdmUgdG8gYnJpbmcgaW4gb3VyIG93biBqc3BhbmVsIGluc3RhbmNlIGJlY2F1c2UgdGhlIG9uZSBpbiB0aGUgbW9kdWxlXG4vLyBkb2Vzbid0IGluY2x1ZGUgYW4gZXhwb3J0IHN0YXRlbWVudC5cblxuLyoganNwYW5lbC5qcyAtIExpY2Vuc2UgTUlULCBjb3B5cmlnaHQgMjAxMyAtIDIwMTggU3RlZmFuIFN0cmFlc3NlciA8aW5mb0Bqc3BhbmVsLmRlPiAoaHR0cDovL2pzcGFuZWwuZGUpICovXG4vKiBnbG9iYWwganNQYW5lbCwgJCAqL1xuJ3VzZSBzdHJpY3QnO1xuLy8gLmFwcGVuZCgpIHBvbHlmaWxsIG5lZWRlZCBmb3IgRURHRSAtIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9QYXJlbnROb2RlL2FwcGVuZFxuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXG4oZnVuY3Rpb24gKGFycikge1xuICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGl0ZW0uYXBwZW5kID0gaXRlbS5hcHBlbmQgfHwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyZ0FyciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyksXG4gICAgICAgICAgICAgICAgZG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgIGFyZ0Fyci5mb3JFYWNoKGZ1bmN0aW9uIChhcmdJdGVtKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlzTm9kZSA9IGFyZ0l0ZW0gaW5zdGFuY2VvZiBOb2RlO1xuICAgICAgICAgICAgICAgIGRvY0ZyYWcuYXBwZW5kQ2hpbGQoaXNOb2RlID8gYXJnSXRlbSA6IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFN0cmluZyhhcmdJdGVtKSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmFwcGVuZENoaWxkKGRvY0ZyYWcpO1xuICAgICAgICB9O1xuICAgIH0pO1xufSkoW0VsZW1lbnQucHJvdG90eXBlLCBEb2N1bWVudC5wcm90b3R5cGUsIERvY3VtZW50RnJhZ21lbnQucHJvdG90eXBlXSk7XG4vLyBFbGVtZW50LmNsb3Nlc3QoKSBwb2x5ZmlsbCBuZWVkZWQgZm9yIEVER0UgLSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9jbG9zZXN0XG5pZiAod2luZG93LkVsZW1lbnQgJiYgIUVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QpIHtcbiAgICBFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0ID0gZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSAodGhpcy5kb2N1bWVudCB8fCB0aGlzLm93bmVyRG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwocyksXG4gICAgICAgICAgICBpID0gdm9pZCAwLFxuICAgICAgICAgICAgZWwgPSB0aGlzO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpID0gbWF0Y2hlcy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoLS1pID49IDAgJiYgbWF0Y2hlcy5pdGVtKGkpICE9PSBlbCkge307XG4gICAgICAgIH0gd2hpbGUgKGkgPCAwICYmIChlbCA9IGVsLnBhcmVudEVsZW1lbnQpKTtcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH07XG59XG4vLyBOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCgpIHBvbHlmaWxsIG5lZWRlZCBmb3IgSUUxMSBhbmQgQW5kcm9pZCBtb2JpbGUgLSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTm9kZUxpc3QvZm9yRWFjaFxuaWYgKHdpbmRvdy5Ob2RlTGlzdCAmJiAhTm9kZUxpc3QucHJvdG90eXBlLmZvckVhY2gpIHtcbiAgICBOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgdGhpc0FyZykge1xuICAgICAgICB0aGlzQXJnID0gdGhpc0FyZyB8fCB3aW5kb3c7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB0aGlzW2ldLCBpLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH07XG59XG4vLyBPYmplY3QuYXNzaWduIFBvbHlmaWxsIG5lZWRlZCBmb3IgbW9iaWxlcyAtIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RlL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9hc3NpZ25cbmlmICghT2JqZWN0LmFzc2lnbikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QsICdhc3NpZ24nLCB7XG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUodGFyZ2V0KSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQgfHwgdGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgZmlyc3QgYXJndW1lbnQgdG8gb2JqZWN0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdG8gPSBPYmplY3QodGFyZ2V0KTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICAgICAgaWYgKG5leHRTb3VyY2UgPT09IHVuZGVmaW5lZCB8fCBuZXh0U291cmNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXh0U291cmNlID0gT2JqZWN0KG5leHRTb3VyY2UpO1xuICAgICAgICAgICAgICAgIHZhciBrZXlzQXJyYXkgPSBPYmplY3Qua2V5cyhPYmplY3QobmV4dFNvdXJjZSkpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIG5leHRJbmRleCA9IDAsIGxlbiA9IGtleXNBcnJheS5sZW5ndGg7IG5leHRJbmRleCA8IGxlbjsgbmV4dEluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRLZXkgPSBrZXlzQXJyYXlbbmV4dEluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG5leHRTb3VyY2UsIG5leHRLZXkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVzYyAhPT0gdW5kZWZpbmVkICYmIGRlc2MuZW51bWVyYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRvO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8vIFBvbHlmaWxscyBmb3IgSUUxMSBvbmx5XG4vLyBDdXN0b21FdmVudCAtIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DdXN0b21FdmVudFxuKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdy5DdXN0b21FdmVudCA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gZmFsc2U7XG4gICAgZnVuY3Rpb24gQ3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcykge1xuICAgICAgICBwYXJhbXMgPSBwYXJhbXMgfHwgeyBidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogZmFsc2UsIGRldGFpbDogdW5kZWZpbmVkIH07XG4gICAgICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICAgICAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKTtcbiAgICAgICAgcmV0dXJuIGV2dDtcbiAgICB9XG4gICAgQ3VzdG9tRXZlbnQucHJvdG90eXBlID0gd2luZG93LkV2ZW50LnByb3RvdHlwZTtcbiAgICB3aW5kb3cuQ3VzdG9tRXZlbnQgPSBDdXN0b21FdmVudDtcbn0pKCk7XG4vLyBTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoKCkgLSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TdHJpbmcvZW5kc1dpdGhcbmlmICghU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aCkge1xuICAgIFN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGggPSBmdW5jdGlvbiAoc2VhcmNoU3RyLCBQb3NpdGlvbikge1xuICAgICAgICAvLyBUaGlzIHdvcmtzIG11Y2ggYmV0dGVyIHRoYW4gPj0gYmVjYXVzZVxuICAgICAgICAvLyBpdCBjb21wZW5zYXRlcyBmb3IgTmFOOlxuICAgICAgICBpZiAoIShQb3NpdGlvbiA8IHRoaXMubGVuZ3RoKSkgUG9zaXRpb24gPSB0aGlzLmxlbmd0aDtlbHNlIFBvc2l0aW9uIHw9IDA7IC8vIHJvdW5kIHBvc2l0aW9uXG4gICAgICAgIHJldHVybiB0aGlzLnN1YnN0cihQb3NpdGlvbiAtIHNlYXJjaFN0ci5sZW5ndGgsIHNlYXJjaFN0ci5sZW5ndGgpID09PSBzZWFyY2hTdHI7XG4gICAgfTtcbn1cbi8vIFN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aCgpIC0gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU3RyaW5nL3N0YXJ0c1dpdGhcbmlmICghU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoKSB7XG4gICAgU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoID0gZnVuY3Rpb24gKHNlYXJjaFN0cmluZywgcG9zaXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3Vic3RyKHBvc2l0aW9uIHx8IDAsIHNlYXJjaFN0cmluZy5sZW5ndGgpID09PSBzZWFyY2hTdHJpbmc7XG4gICAgfTtcbn1cblxuLy8gQ3JlYXRlIGEgbmV3IG9iamVjdCwgdGhhdCBwcm90b3R5cGljYWxseSBpbmhlcml0cyBmcm9tIHRoZSBFcnJvciBjb25zdHJ1Y3RvclxuZnVuY3Rpb24ganNQYW5lbEVycm9yKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm5hbWUgPSAnanNQYW5lbEVycm9yJztcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlIHx8ICcnO1xuICAgIHRoaXMuc3RhY2sgPSBuZXcgRXJyb3IoKS5zdGFjaztcbn1cbmpzUGFuZWxFcnJvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG5qc1BhbmVsRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0ganNQYW5lbEVycm9yO1xuXG5leHBvcnQgdmFyIGpzUGFuZWwgPSB7XG5cbiAgICB2ZXJzaW9uOiAnNC4wLjAtYmV0YS4yJyxcbiAgICBkYXRlOiAnMjAxOC0wMS0wOCAwOTo1NicsXG4gICAgaWRDb3VudGVyOiAwLFxuICAgIHppQmFzZTogMTAwLFxuICAgIHRoZW1lczogWydkZWZhdWx0JywgJ3ByaW1hcnknLCAnaW5mbycsICdzdWNjZXNzJywgJ3dhcm5pbmcnLCAnZGFuZ2VyJ10sXG4gICAgbWRidGhlbWVzOiBbJ3NlY29uZGFyeScsICdlbGVnYW50JywgJ3N0eWxpc2gnLCAndW5pcXVlJywgJ3NwZWNpYWwnXSxcbiAgICBhdXRvcG9zaXRpb25TcGFjaW5nOiA0LFxuICAgIGlzSUU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5hcHBWZXJzaW9uLm1hdGNoKC9UcmlkZW50Lyk7XG4gICAgfSgpLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGJveFNoYWRvdzogMyxcbiAgICAgICAgY29udGFpbmVyOiBkb2N1bWVudC5ib2R5LFxuICAgICAgICBjb250ZW50U2l6ZTogeyB3aWR0aDogJzQwMHB4JywgaGVpZ2h0OiAnMjAwcHgnIH0sIC8vIG11c3QgYmUgb2JqZWN0XG4gICAgICAgIGRyYWdpdDoge1xuICAgICAgICAgICAgY3Vyc29yOiAnbW92ZScsXG4gICAgICAgICAgICBoYW5kbGVzOiAnLmpzUGFuZWwtaGVhZGVybG9nbywgLmpzUGFuZWwtdGl0bGViYXIsIC5qc1BhbmVsLWZ0cicsIC8vIGRvIG5vdCB1c2UgLmpzUGFuZWwtaGVhZGVyYmFyXG4gICAgICAgICAgICBvcGFjaXR5OiAwLjgsXG4gICAgICAgICAgICBkaXNhYmxlT25NYXhpbWl6ZWQ6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgaGVhZGVyVGl0bGU6ICdqc1BhbmVsJyxcbiAgICAgICAgaGVhZGVyQ29udHJvbHM6ICdhbGwnLFxuICAgICAgICBpY29uZm9udDogJ2pzZ2x5cGgnLFxuICAgICAgICBtYXhpbWl6ZWRNYXJnaW46IDAsXG4gICAgICAgIG1pbmltaXplVG86ICdkZWZhdWx0JyxcbiAgICAgICAgcGFuZWx0eXBlOiAnc3RhbmRhcmQnLFxuICAgICAgICBwb3NpdGlvbjogJ2NlbnRlcicsXG4gICAgICAgIHJlc2l6ZWl0OiB7XG4gICAgICAgICAgICBoYW5kbGVzOiAnbiwgZSwgcywgdywgbmUsIHNlLCBzdywgbncnLFxuICAgICAgICAgICAgbWluV2lkdGg6IDQwLFxuICAgICAgICAgICAgbWluSGVpZ2h0OiA0MFxuICAgICAgICB9LFxuICAgICAgICB0aGVtZTogJ2RlZmF1bHQnXG4gICAgfSxcbiAgICBkZWZhdWx0U25hcENvbmZpZzoge1xuICAgICAgICBzZW5zaXRpdml0eTogNzAsXG4gICAgICAgIHRyaWdnZXI6ICdwYW5lbCdcbiAgICB9LFxuICAgIGFqYXhBbHdheXNDYWxsYmFja3M6IFtdLFxuICAgIGV4dGVuc2lvbnM6IHt9LFxuXG4gICAgYWpheDogZnVuY3Rpb24gYWpheChvYmopIHtcbiAgICAgICAgdmFyIGNvbmYgPSBvYmoub3B0aW9ucy5jb250ZW50QWpheCxcbiAgICAgICAgICAgIGNvbmZpZ0RlZmF1bHRzID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgdXNlcjogJycsXG4gICAgICAgICAgICBwd2Q6ICcnLFxuICAgICAgICAgICAgZG9uZTogZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgICAgICAgICAgICBvYmouY29udGVudC5pbm5lckhUTUwgPSB0aGlzLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhdXRvcmVzaXplOiB0cnVlLFxuICAgICAgICAgICAgYXV0b3JlcG9zaXRpb246IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGNvbmZpZyA9IHZvaWQgMDtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbmYgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWdEZWZhdWx0cywgeyB1cmw6IGVuY29kZVVSSShjb25mKSwgZXZhbHNjcmlwdHRhZ3M6IHRydWUgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoKHR5cGVvZiBjb25mID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihjb25mKSkgPT09ICdvYmplY3QnICYmIGNvbmYudXJsKSB7XG4gICAgICAgICAgICBjb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWdEZWZhdWx0cywgY29uZik7XG4gICAgICAgICAgICBjb25maWcudXJsID0gZW5jb2RlVVJJKGNvbmYudXJsKTtcbiAgICAgICAgICAgIC8vIHJlc2V0IHRpbWVvdXQgdG8gMCwgd2l0aENyZWRlbnRpYWxzICYgcmVzcG9uc2VUeXBlIHRvIGZhbHNlIGlmIHJlcXVlc3QgaXMgc3luY2hyb25vdXNcbiAgICAgICAgICAgIGlmIChjb25maWcuYXN5bmMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLnRpbWVvdXQgPSAwO1xuICAgICAgICAgICAgICAgIGlmIChjb25maWcud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5yZXNwb25zZVR5cGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKCdYTUxIdHRwUmVxdWVzdCBzZWVtcyB0byBtaXNzIHRoZSByZXF1ZXN0IHVybCEnKTtcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLmRvbmUuY2FsbCh4aHIsIG9iaik7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZXh0cmFjdCBhbmQgZXZhbCBjb250ZW50IG9mIHNjcmlwdCB0YWdzIGlmIFwiZXZhbHNjcmlwdHRhZ3NcIlxuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZmlnLmV2YWxzY3JpcHR0YWdzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgYWxsIHNjcmlwdCB0YWdzIHdpdGhpbiByZXNwb25zZVRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzY3JpcHR0YWdzID0geGhyLnJlc3BvbnNlVGV4dC5tYXRjaCgvPHNjcmlwdFxcYltePl0qPihbXFxzXFxTXSo/KTxcXC9zY3JpcHQ+L2dpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY3JpcHR0YWdzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NyaXB0dGFncy5mb3JFYWNoKGZ1bmN0aW9uICh0YWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRhZ3MgZnJvbSBzdHJpbmcgYW5kIHRyaW0gaXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGpzID0gdGFnLnJlcGxhY2UoLzxzY3JpcHRcXGJbXj5dKj4vaSwgJycpLnJlcGxhY2UoLzxcXC9zY3JpcHQ+L2ksICcnKS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4ZWN1dGUgamF2YXNjcmlwdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmFsKGpzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25maWcuZmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnLmZhaWwuY2FsbCh4aHIsIG9iaik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnLmFsd2F5cykge1xuICAgICAgICAgICAgICAgICAgICBjb25maWcuYWx3YXlzLmNhbGwoeGhyLCBvYmopO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHJlc2l6ZSBhbmQgcmVwb3NpdGlvbiBwYW5lbCBpZiBlaXRoZXIgd2lkdGggb3IgaGVpZ2h0IGlzIHNldCB0byAnYXV0bydcbiAgICAgICAgICAgICAgICB2YXIgb0NvbnRlbnRTaXplID0gb2JqLm9wdGlvbnMuY29udGVudFNpemU7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvQ29udGVudFNpemUgPT09ICdzdHJpbmcnICYmIG9Db250ZW50U2l6ZS5tYXRjaCgvYXV0by9pKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFydHMgPSBvQ29udGVudFNpemUuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNpemVzID0gT2JqZWN0LmFzc2lnbih7fSwgeyB3aWR0aDogcGFydHNbMF0sIGhlaWdodDogcGFydHNbMV0gfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25maWcuYXV0b3Jlc2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnJlc2l6ZShzaXplcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvYmouY2xhc3NMaXN0LmNvbnRhaW5zKCdqc1BhbmVsLWNvbnRleHRtZW51JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb25maWcuYXV0b3JlcG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoucmVwb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgodHlwZW9mIG9Db250ZW50U2l6ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yob0NvbnRlbnRTaXplKSkgPT09ICdvYmplY3QnICYmIChvQ29udGVudFNpemUud2lkdGggPT09ICdhdXRvJyB8fCBvQ29udGVudFNpemUuaGVpZ2h0ID09PSAnYXV0bycpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfc2l6ZXMgPSBPYmplY3QuYXNzaWduKHt9LCBvQ29udGVudFNpemUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZmlnLmF1dG9yZXNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5yZXNpemUoX3NpemVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9iai5jbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwtY29udGV4dG1lbnUnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5hdXRvcmVwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5yZXBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBhbGxvd3MgcGx1Z2lucyB0byBhZGQgY2FsbGJhY2sgZnVuY3Rpb25zIHRvIHRoZSBhamF4IGFsd2F5cyBjYWxsYmFja1xuICAgICAgICAgICAgICAgIGlmIChqc1BhbmVsLmFqYXhBbHdheXNDYWxsYmFja3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGpzUGFuZWwuYWpheEFsd2F5c0NhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNhbGwob2JqLCBvYmopO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgeGhyLm9wZW4oY29uZmlnLm1ldGhvZCwgY29uZmlnLnVybCwgY29uZmlnLmFzeW5jLCBjb25maWcudXNlciwgY29uZmlnLnB3ZCk7XG4gICAgICAgIHhoci50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQgfHwgMDtcbiAgICAgICAgaWYgKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSBjb25maWcud2l0aENyZWRlbnRpYWxzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb25maWcuYmVmb3JlU2VuZCkge1xuICAgICAgICAgICAgY29uZmlnLmJlZm9yZVNlbmQuY2FsbCh4aHIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25maWcuZGF0YSkge1xuICAgICAgICAgICAgeGhyLnNlbmQoY29uZmlnLmRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgeGhyLnNlbmQobnVsbCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH0sXG4gICAgY2FsY0NvbG9yczogZnVuY3Rpb24gY2FsY0NvbG9ycyhwcmltYXJ5Q29sb3IpIHtcbiAgICAgICAgdmFyIHByaW1lQ29sb3IgPSB0aGlzLmNvbG9yKHByaW1hcnlDb2xvciksXG4gICAgICAgICAgICBzZWNvbmRDb2xvciA9IHRoaXMubGlnaHRlbihwcmltYXJ5Q29sb3IsIDAuODEpLFxuICAgICAgICAgICAgdGhpcmRDb2xvciA9IHRoaXMuZGFya2VuKHByaW1hcnlDb2xvciwgMC41KSxcbiAgICAgICAgICAgIGZvbnRDb2xvckZvclByaW1hcnkgPSB0aGlzLnBlcmNlaXZlZEJyaWdodG5lc3MocHJpbWFyeUNvbG9yKSA8PSAwLjU1NiA/ICcjZmZmZmZmJyA6ICcjMDAwMDAwJyxcbiAgICAgICAgICAgIGZvbnRDb2xvckZvclNlY29uZCA9IHRoaXMucGVyY2VpdmVkQnJpZ2h0bmVzcyhzZWNvbmRDb2xvcikgPD0gMC41NTYgPyAnI2ZmZmZmZicgOiAnIzAwMDAwMCcsXG4gICAgICAgICAgICBmb250Q29sb3JGb3JUaGlyZCA9IHRoaXMucGVyY2VpdmVkQnJpZ2h0bmVzcyh0aGlyZENvbG9yKSA8PSAwLjU1NiA/ICcjMDAwMDAwJyA6ICcjZmZmZmZmJztcbiAgICAgICAgcmV0dXJuIFtwcmltZUNvbG9yLmhzbC5jc3MsIHNlY29uZENvbG9yLCB0aGlyZENvbG9yLCBmb250Q29sb3JGb3JQcmltYXJ5LCBmb250Q29sb3JGb3JTZWNvbmQsIGZvbnRDb2xvckZvclRoaXJkXTtcbiAgICB9LFxuICAgIGNvbG9yOiBmdW5jdGlvbiBjb2xvcih2YWwpIHtcblxuICAgICAgICB2YXIgY29sb3IgPSB2YWwudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgIHIgPSB2b2lkIDAsXG4gICAgICAgICAgICBnID0gdm9pZCAwLFxuICAgICAgICAgICAgYiA9IHZvaWQgMCxcbiAgICAgICAgICAgIGggPSB2b2lkIDAsXG4gICAgICAgICAgICBzID0gdm9pZCAwLFxuICAgICAgICAgICAgbCA9IHZvaWQgMCxcbiAgICAgICAgICAgIG1hdGNoID0gdm9pZCAwLFxuICAgICAgICAgICAgY2hhbm5lbHMgPSB2b2lkIDAsXG4gICAgICAgICAgICBoc2wgPSB2b2lkIDAsXG4gICAgICAgICAgICByZXN1bHQgPSB7fTtcbiAgICAgICAgdmFyIGhleFBhdHRlcm4gPSAvXiM/KFswLTlhLWZdezN9fFswLTlhLWZdezZ9KSQvZ2ksXG4gICAgICAgICAgICAvLyBtYXRjaGVzIFwiIzEyM1wiIG9yIFwiI2YwNWE3OFwiIHdpdGggb3Igd2l0aG91dCBcIiNcIlxuICAgICAgICBSR0JBUGF0dGVybiA9IC9ecmdiYT9cXCgoWzAtOV17MSwzfSksKFswLTldezEsM30pLChbMC05XXsxLDN9KSw/KDB8MXwwXFwuWzAtOV17MSwyfXxcXC5bMC05XXsxLDJ9KT9cXCkkL2dpLFxuICAgICAgICAgICAgLy8gbWF0Y2hlcyByZ2IvcmdiYSBjb2xvciB2YWx1ZXMsIHdoaXRlc3BhY2UgYWxsb3dlZFxuICAgICAgICBIU0xBUGF0dGVybiA9IC9eaHNsYT9cXCgoWzAtOV17MSwzfSksKFswLTldezEsM30lKSwoWzAtOV17MSwzfSUpLD8oMHwxfDBcXC5bMC05XXsxLDJ9fFxcLlswLTldezEsMn0pP1xcKSQvZ2ksXG4gICAgICAgICAgICBuYW1lZENvbG9ycyA9IHtcbiAgICAgICAgICAgIGFsaWNlYmx1ZTogJ2YwZjhmZicsXG4gICAgICAgICAgICBhbnRpcXVld2hpdGU6ICdmYWViZDcnLFxuICAgICAgICAgICAgYXF1YTogJzBmZicsXG4gICAgICAgICAgICBhcXVhbWFyaW5lOiAnN2ZmZmQ0JyxcbiAgICAgICAgICAgIGF6dXJlOiAnZjBmZmZmJyxcbiAgICAgICAgICAgIGJlaWdlOiAnZjVmNWRjJyxcbiAgICAgICAgICAgIGJpc3F1ZTogJ2ZmZTRjNCcsXG4gICAgICAgICAgICBibGFjazogJzAwMCcsXG4gICAgICAgICAgICBibGFuY2hlZGFsbW9uZDogJ2ZmZWJjZCcsXG4gICAgICAgICAgICBibHVlOiAnMDBmJyxcbiAgICAgICAgICAgIGJsdWV2aW9sZXQ6ICc4YTJiZTInLFxuICAgICAgICAgICAgYnJvd246ICdhNTJhMmEnLFxuICAgICAgICAgICAgYnVybHl3b29kOiAnZGViODg3JyxcbiAgICAgICAgICAgIGNhZGV0Ymx1ZTogJzVmOWVhMCcsXG4gICAgICAgICAgICBjaGFydHJldXNlOiAnN2ZmZjAwJyxcbiAgICAgICAgICAgIGNob2NvbGF0ZTogJ2QyNjkxZScsXG4gICAgICAgICAgICBjb3JhbDogJ2ZmN2Y1MCcsXG4gICAgICAgICAgICBjb3JuZmxvd2VyYmx1ZTogJzY0OTVlZCcsXG4gICAgICAgICAgICBjb3Juc2lsazogJ2ZmZjhkYycsXG4gICAgICAgICAgICBjcmltc29uOiAnZGMxNDNjJyxcbiAgICAgICAgICAgIGN5YW46ICcwZmYnLFxuICAgICAgICAgICAgZGFya2JsdWU6ICcwMDAwOGInLFxuICAgICAgICAgICAgZGFya2N5YW46ICcwMDhiOGInLFxuICAgICAgICAgICAgZGFya2dvbGRlbnJvZDogJ2I4ODYwYicsXG4gICAgICAgICAgICBkYXJrZ3JheTogJ2E5YTlhOScsXG4gICAgICAgICAgICBkYXJrZ3JleTogJ2E5YTlhOScsXG4gICAgICAgICAgICBkYXJrZ3JlZW46ICcwMDY0MDAnLFxuICAgICAgICAgICAgZGFya2toYWtpOiAnYmRiNzZiJyxcbiAgICAgICAgICAgIGRhcmttYWdlbnRhOiAnOGIwMDhiJyxcbiAgICAgICAgICAgIGRhcmtvbGl2ZWdyZWVuOiAnNTU2YjJmJyxcbiAgICAgICAgICAgIGRhcmtvcmFuZ2U6ICdmZjhjMDAnLFxuICAgICAgICAgICAgZGFya29yY2hpZDogJzk5MzJjYycsXG4gICAgICAgICAgICBkYXJrcmVkOiAnOGIwMDAwJyxcbiAgICAgICAgICAgIGRhcmtzYWxtb246ICdlOTk2N2EnLFxuICAgICAgICAgICAgZGFya3NlYWdyZWVuOiAnOGZiYzhmJyxcbiAgICAgICAgICAgIGRhcmtzbGF0ZWJsdWU6ICc0ODNkOGInLFxuICAgICAgICAgICAgZGFya3NsYXRlZ3JheTogJzJmNGY0ZicsXG4gICAgICAgICAgICBkYXJrc2xhdGVncmV5OiAnMmY0ZjRmJyxcbiAgICAgICAgICAgIGRhcmt0dXJxdW9pc2U6ICcwMGNlZDEnLFxuICAgICAgICAgICAgZGFya3Zpb2xldDogJzk0MDBkMycsXG4gICAgICAgICAgICBkZWVwcGluazogJ2ZmMTQ5MycsXG4gICAgICAgICAgICBkZWVwc2t5Ymx1ZTogJzAwYmZmZicsXG4gICAgICAgICAgICBkaW1ncmF5OiAnNjk2OTY5JyxcbiAgICAgICAgICAgIGRpbWdyZXk6ICc2OTY5NjknLFxuICAgICAgICAgICAgZG9kZ2VyYmx1ZTogJzFlOTBmZicsXG4gICAgICAgICAgICBmaXJlYnJpY2s6ICdiMjIyMjInLFxuICAgICAgICAgICAgZmxvcmFsd2hpdGU6ICdmZmZhZjAnLFxuICAgICAgICAgICAgZm9yZXN0Z3JlZW46ICcyMjhiMjInLFxuICAgICAgICAgICAgZnVjaHNpYTogJ2YwZicsXG4gICAgICAgICAgICBnYWluc2Jvcm86ICdkY2RjZGMnLFxuICAgICAgICAgICAgZ2hvc3R3aGl0ZTogJ2Y4ZjhmZicsXG4gICAgICAgICAgICBnb2xkOiAnZmZkNzAwJyxcbiAgICAgICAgICAgIGdvbGRlbnJvZDogJ2RhYTUyMCcsXG4gICAgICAgICAgICBncmF5OiAnODA4MDgwJyxcbiAgICAgICAgICAgIGdyZXk6ICc4MDgwODAnLFxuICAgICAgICAgICAgZ3JlZW46ICcwMDgwMDAnLFxuICAgICAgICAgICAgZ3JlZW55ZWxsb3c6ICdhZGZmMmYnLFxuICAgICAgICAgICAgaG9uZXlkZXc6ICdmMGZmZjAnLFxuICAgICAgICAgICAgaG90cGluazogJ2ZmNjliNCcsXG4gICAgICAgICAgICBpbmRpYW5yZWQ6ICdjZDVjNWMnLFxuICAgICAgICAgICAgaW5kaWdvOiAnNGIwMDgyJyxcbiAgICAgICAgICAgIGl2b3J5OiAnZmZmZmYwJyxcbiAgICAgICAgICAgIGtoYWtpOiAnZjBlNjhjJyxcbiAgICAgICAgICAgIGxhdmVuZGVyOiAnZTZlNmZhJyxcbiAgICAgICAgICAgIGxhdmVuZGVyYmx1c2g6ICdmZmYwZjUnLFxuICAgICAgICAgICAgbGF3bmdyZWVuOiAnN2NmYzAwJyxcbiAgICAgICAgICAgIGxlbW9uY2hpZmZvbjogJ2ZmZmFjZCcsXG4gICAgICAgICAgICBsaWdodGJsdWU6ICdhZGQ4ZTYnLFxuICAgICAgICAgICAgbGlnaHRjb3JhbDogJ2YwODA4MCcsXG4gICAgICAgICAgICBsaWdodGN5YW46ICdlMGZmZmYnLFxuICAgICAgICAgICAgbGlnaHRnb2xkZW5yb2R5ZWxsb3c6ICdmYWZhZDInLFxuICAgICAgICAgICAgbGlnaHRncmF5OiAnZDNkM2QzJyxcbiAgICAgICAgICAgIGxpZ2h0Z3JleTogJ2QzZDNkMycsXG4gICAgICAgICAgICBsaWdodGdyZWVuOiAnOTBlZTkwJyxcbiAgICAgICAgICAgIGxpZ2h0cGluazogJ2ZmYjZjMScsXG4gICAgICAgICAgICBsaWdodHNhbG1vbjogJ2ZmYTA3YScsXG4gICAgICAgICAgICBsaWdodHNlYWdyZWVuOiAnMjBiMmFhJyxcbiAgICAgICAgICAgIGxpZ2h0c2t5Ymx1ZTogJzg3Y2VmYScsXG4gICAgICAgICAgICBsaWdodHNsYXRlZ3JheTogJzc4OScsXG4gICAgICAgICAgICBsaWdodHNsYXRlZ3JleTogJzc4OScsXG4gICAgICAgICAgICBsaWdodHN0ZWVsYmx1ZTogJ2IwYzRkZScsXG4gICAgICAgICAgICBsaWdodHllbGxvdzogJ2ZmZmZlMCcsXG4gICAgICAgICAgICBsaW1lOiAnMGYwJyxcbiAgICAgICAgICAgIGxpbWVncmVlbjogJzMyY2QzMicsXG4gICAgICAgICAgICBsaW5lbjogJ2ZhZjBlNicsXG4gICAgICAgICAgICBtYWdlbnRhOiAnZjBmJyxcbiAgICAgICAgICAgIG1hcm9vbjogJzgwMDAwMCcsXG4gICAgICAgICAgICBtZWRpdW1hcXVhbWFyaW5lOiAnNjZjZGFhJyxcbiAgICAgICAgICAgIG1lZGl1bWJsdWU6ICcwMDAwY2QnLFxuICAgICAgICAgICAgbWVkaXVtb3JjaGlkOiAnYmE1NWQzJyxcbiAgICAgICAgICAgIG1lZGl1bXB1cnBsZTogJzkzNzBkOCcsXG4gICAgICAgICAgICBtZWRpdW1zZWFncmVlbjogJzNjYjM3MScsXG4gICAgICAgICAgICBtZWRpdW1zbGF0ZWJsdWU6ICc3YjY4ZWUnLFxuICAgICAgICAgICAgbWVkaXVtc3ByaW5nZ3JlZW46ICcwMGZhOWEnLFxuICAgICAgICAgICAgbWVkaXVtdHVycXVvaXNlOiAnNDhkMWNjJyxcbiAgICAgICAgICAgIG1lZGl1bXZpb2xldHJlZDogJ2M3MTU4NScsXG4gICAgICAgICAgICBtaWRuaWdodGJsdWU6ICcxOTE5NzAnLFxuICAgICAgICAgICAgbWludGNyZWFtOiAnZjVmZmZhJyxcbiAgICAgICAgICAgIG1pc3R5cm9zZTogJ2ZmZTRlMScsXG4gICAgICAgICAgICBtb2NjYXNpbjogJ2ZmZTRiNScsXG4gICAgICAgICAgICBuYXZham93aGl0ZTogJ2ZmZGVhZCcsXG4gICAgICAgICAgICBuYXZ5OiAnMDAwMDgwJyxcbiAgICAgICAgICAgIG9sZGxhY2U6ICdmZGY1ZTYnLFxuICAgICAgICAgICAgb2xpdmU6ICc4MDgwMDAnLFxuICAgICAgICAgICAgb2xpdmVkcmFiOiAnNmI4ZTIzJyxcbiAgICAgICAgICAgIG9yYW5nZTogJ2ZmYTUwMCcsXG4gICAgICAgICAgICBvcmFuZ2VyZWQ6ICdmZjQ1MDAnLFxuICAgICAgICAgICAgb3JjaGlkOiAnZGE3MGQ2JyxcbiAgICAgICAgICAgIHBhbGVnb2xkZW5yb2Q6ICdlZWU4YWEnLFxuICAgICAgICAgICAgcGFsZWdyZWVuOiAnOThmYjk4JyxcbiAgICAgICAgICAgIHBhbGV0dXJxdW9pc2U6ICdhZmVlZWUnLFxuICAgICAgICAgICAgcGFsZXZpb2xldHJlZDogJ2Q4NzA5MycsXG4gICAgICAgICAgICBwYXBheWF3aGlwOiAnZmZlZmQ1JyxcbiAgICAgICAgICAgIHBlYWNocHVmZjogJ2ZmZGFiOScsXG4gICAgICAgICAgICBwZXJ1OiAnY2Q4NTNmJyxcbiAgICAgICAgICAgIHBpbms6ICdmZmMwY2InLFxuICAgICAgICAgICAgcGx1bTogJ2RkYTBkZCcsXG4gICAgICAgICAgICBwb3dkZXJibHVlOiAnYjBlMGU2JyxcbiAgICAgICAgICAgIHB1cnBsZTogJzgwMDA4MCcsXG4gICAgICAgICAgICByZWJlY2NhcHVycGxlOiAnNjM5JyxcbiAgICAgICAgICAgIHJlZDogJ2YwMCcsXG4gICAgICAgICAgICByb3N5YnJvd246ICdiYzhmOGYnLFxuICAgICAgICAgICAgcm95YWxibHVlOiAnNDE2OWUxJyxcbiAgICAgICAgICAgIHNhZGRsZWJyb3duOiAnOGI0NTEzJyxcbiAgICAgICAgICAgIHNhbG1vbjogJ2ZhODA3MicsXG4gICAgICAgICAgICBzYW5keWJyb3duOiAnZjRhNDYwJyxcbiAgICAgICAgICAgIHNlYWdyZWVuOiAnMmU4YjU3JyxcbiAgICAgICAgICAgIHNlYXNoZWxsOiAnZmZmNWVlJyxcbiAgICAgICAgICAgIHNpZW5uYTogJ2EwNTIyZCcsXG4gICAgICAgICAgICBzaWx2ZXI6ICdjMGMwYzAnLFxuICAgICAgICAgICAgc2t5Ymx1ZTogJzg3Y2VlYicsXG4gICAgICAgICAgICBzbGF0ZWJsdWU6ICc2YTVhY2QnLFxuICAgICAgICAgICAgc2xhdGVncmF5OiAnNzA4MDkwJyxcbiAgICAgICAgICAgIHNsYXRlZ3JleTogJzcwODA5MCcsXG4gICAgICAgICAgICBzbm93OiAnZmZmYWZhJyxcbiAgICAgICAgICAgIHNwcmluZ2dyZWVuOiAnMDBmZjdmJyxcbiAgICAgICAgICAgIHN0ZWVsYmx1ZTogJzQ2ODJiNCcsXG4gICAgICAgICAgICB0YW46ICdkMmI0OGMnLFxuICAgICAgICAgICAgdGVhbDogJzAwODA4MCcsXG4gICAgICAgICAgICB0aGlzdGxlOiAnZDhiZmQ4JyxcbiAgICAgICAgICAgIHRvbWF0bzogJ2ZmNjM0NycsXG4gICAgICAgICAgICB0dXJxdW9pc2U6ICc0MGUwZDAnLFxuICAgICAgICAgICAgdmlvbGV0OiAnZWU4MmVlJyxcbiAgICAgICAgICAgIHdoZWF0OiAnZjVkZWIzJyxcbiAgICAgICAgICAgIHdoaXRlOiAnZmZmJyxcbiAgICAgICAgICAgIHdoaXRlc21va2U6ICdmNWY1ZjUnLFxuICAgICAgICAgICAgeWVsbG93OiAnZmYwJyxcbiAgICAgICAgICAgIHllbGxvd2dyZWVuOiAnOWFjZDMyJ1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGNoYW5nZSBuYW1lZCBjb2xvciB0byBjb3JyZXNwb25kaW5nIGhleCB2YWx1ZVxuICAgICAgICBpZiAobmFtZWRDb2xvcnNbY29sb3JdKSB7XG4gICAgICAgICAgICBjb2xvciA9IG5hbWVkQ29sb3JzW2NvbG9yXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIHZhbCBmb3IgaGV4IGNvbG9yXG4gICAgICAgIGlmIChjb2xvci5tYXRjaChoZXhQYXR0ZXJuKSAhPT0gbnVsbCkge1xuXG4gICAgICAgICAgICAvLyAnIycgZW50ZmVybmVuIHdlbm4gdm9yaGFuZGVuXG4gICAgICAgICAgICBjb2xvciA9IGNvbG9yLnJlcGxhY2UoJyMnLCAnJyk7XG5cbiAgICAgICAgICAgIC8vIGNvbG9yIGhhcyBlaXRoZXIgMyBvciA2IGNoYXJhY3RlcnNcbiAgICAgICAgICAgIGlmIChjb2xvci5sZW5ndGggJSAyID09PSAxKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBjb2xvciBoYXMgMyBjaGFyIC0+IGNvbnZlcnQgdG8gNiBjaGFyXG4gICAgICAgICAgICAgICAgLy8gciA9IGNvbG9yLnN1YnN0cigwLDEpLnJlcGVhdCgyKTtcbiAgICAgICAgICAgICAgICAvLyBnID0gY29sb3Iuc3Vic3RyKDEsMSkucmVwZWF0KDIpOyAvLyBTdHJpbmcucHJvdG90eXBlLnJlcGVhdCgpIGRvZXNuJ3Qgd29yayBpbiBJRTExXG4gICAgICAgICAgICAgICAgLy8gYiA9IGNvbG9yLnN1YnN0cigyLDEpLnJlcGVhdCgyKTtcbiAgICAgICAgICAgICAgICByID0gU3RyaW5nKGNvbG9yLnN1YnN0cigwLCAxKSkgKyBjb2xvci5zdWJzdHIoMCwgMSk7XG4gICAgICAgICAgICAgICAgZyA9IFN0cmluZyhjb2xvci5zdWJzdHIoMSwgMSkpICsgY29sb3Iuc3Vic3RyKDEsIDEpO1xuICAgICAgICAgICAgICAgIGIgPSBTdHJpbmcoY29sb3Iuc3Vic3RyKDIsIDEpKSArIGNvbG9yLnN1YnN0cigyLCAxKTtcblxuICAgICAgICAgICAgICAgIHJlc3VsdC5yZ2IgPSB7XG4gICAgICAgICAgICAgICAgICAgIHI6IHBhcnNlSW50KHIsIDE2KSxcbiAgICAgICAgICAgICAgICAgICAgZzogcGFyc2VJbnQoZywgMTYpLFxuICAgICAgICAgICAgICAgICAgICBiOiBwYXJzZUludChiLCAxNilcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcmVzdWx0LmhleCA9ICcjJyArIHIgKyBnICsgYjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAvLyBjb2xvciBoYXMgNiBjaGFyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnJnYiA9IHtcbiAgICAgICAgICAgICAgICAgICAgcjogcGFyc2VJbnQoY29sb3Iuc3Vic3RyKDAsIDIpLCAxNiksXG4gICAgICAgICAgICAgICAgICAgIGc6IHBhcnNlSW50KGNvbG9yLnN1YnN0cigyLCAyKSwgMTYpLFxuICAgICAgICAgICAgICAgICAgICBiOiBwYXJzZUludChjb2xvci5zdWJzdHIoNCwgMiksIDE2KVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICByZXN1bHQuaGV4ID0gJyMnICsgY29sb3I7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGhzbCA9IHRoaXMucmdiVG9Ic2wocmVzdWx0LnJnYi5yLCByZXN1bHQucmdiLmcsIHJlc3VsdC5yZ2IuYik7XG4gICAgICAgICAgICByZXN1bHQuaHNsID0gaHNsO1xuICAgICAgICAgICAgcmVzdWx0LnJnYi5jc3MgPSAncmdiKCcgKyByZXN1bHQucmdiLnIgKyAnLCcgKyByZXN1bHQucmdiLmcgKyAnLCcgKyByZXN1bHQucmdiLmIgKyAnKSc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2hlY2sgdmFsIGZvciByZ2IvcmdiYSBjb2xvclxuICAgICAgICBlbHNlIGlmIChjb2xvci5tYXRjaChSR0JBUGF0dGVybikpIHtcblxuICAgICAgICAgICAgICAgIG1hdGNoID0gUkdCQVBhdHRlcm4uZXhlYyhjb2xvcik7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnJnYiA9IHsgY3NzOiBjb2xvciwgcjogbWF0Y2hbMV0sIGc6IG1hdGNoWzJdLCBiOiBtYXRjaFszXSB9O1xuICAgICAgICAgICAgICAgIHJlc3VsdC5oZXggPSB0aGlzLnJnYlRvSGV4KG1hdGNoWzFdLCBtYXRjaFsyXSwgbWF0Y2hbM10pO1xuICAgICAgICAgICAgICAgIGhzbCA9IHRoaXMucmdiVG9Ic2wobWF0Y2hbMV0sIG1hdGNoWzJdLCBtYXRjaFszXSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmhzbCA9IGhzbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNoZWNrIHZhbCBmb3IgaHNsL2hzbGEgY29sb3JcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbG9yLm1hdGNoKEhTTEFQYXR0ZXJuKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoID0gSFNMQVBhdHRlcm4uZXhlYyhjb2xvcik7XG5cbiAgICAgICAgICAgICAgICAgICAgaCA9IG1hdGNoWzFdIC8gMzYwO1xuICAgICAgICAgICAgICAgICAgICBzID0gbWF0Y2hbMl0uc3Vic3RyKDAsIG1hdGNoWzJdLmxlbmd0aCAtIDEpIC8gMTAwO1xuICAgICAgICAgICAgICAgICAgICBsID0gbWF0Y2hbM10uc3Vic3RyKDAsIG1hdGNoWzNdLmxlbmd0aCAtIDEpIC8gMTAwO1xuXG4gICAgICAgICAgICAgICAgICAgIGNoYW5uZWxzID0gdGhpcy5oc2xUb1JnYihoLCBzLCBsKTtcblxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucmdiID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiAncmdiKCcgKyBjaGFubmVsc1swXSArICcsJyArIGNoYW5uZWxzWzFdICsgJywnICsgY2hhbm5lbHNbMl0gKyAnKScsXG4gICAgICAgICAgICAgICAgICAgICAgICByOiBjaGFubmVsc1swXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGc6IGNoYW5uZWxzWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgYjogY2hhbm5lbHNbMl1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmhleCA9IHRoaXMucmdiVG9IZXgocmVzdWx0LnJnYi5yLCByZXN1bHQucmdiLmcsIHJlc3VsdC5yZ2IuYik7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5oc2wgPSB7IGNzczogJ2hzbCgnICsgbWF0Y2hbMV0gKyAnLCcgKyBtYXRjaFsyXSArICcsJyArIG1hdGNoWzNdICsgJyknLCBoOiBtYXRjaFsxXSwgczogbWF0Y2hbMl0sIGw6IG1hdGNoWzNdIH07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gb3IgcmV0dXJuICNmNWY1ZjVcbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5oZXggPSAnI2Y1ZjVmNSc7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucmdiID0geyBjc3M6ICdyZ2IoMjQ1LDI0NSwyNDUpJywgcjogMjQ1LCBnOiAyNDUsIGI6IDI0NSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmhzbCA9IHsgY3NzOiAnaHNsKDAsMCUsOTYuMDglKScsIGg6IDAsIHM6ICcwJScsIGw6ICc5Ni4wOCUnIH07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG4gICAgY3JlYXRlUGFuZWxUZW1wbGF0ZTogZnVuY3Rpb24gY3JlYXRlUGFuZWxUZW1wbGF0ZSgpIHtcbiAgICAgICAgdmFyIGRhdGFBdHRyID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuXG4gICAgICAgIHZhciBwYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBwYW5lbC5jbGFzc05hbWUgPSAnanNQYW5lbCc7XG4gICAgICAgIGlmIChkYXRhQXR0cikge1xuICAgICAgICAgICAgWydjbG9zZScsICdtYXhpbWl6ZScsICdub3JtYWxpemUnLCAnbWluaW1pemUnLCAnc21hbGxpZnknLCAnc21hbGxpZnlyZXYnXS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgcGFuZWwuc2V0QXR0cmlidXRlKCdkYXRhLWJ0bicgKyBpdGVtLCAnZW5hYmxlZCcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcGFuZWwuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJqc1BhbmVsLWhkclwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtaGVhZGVyYmFyXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtaGVhZGVybG9nb1wiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLXRpdGxlYmFyXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cImpzUGFuZWwtdGl0bGVcIj48L2gzPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLWNvbnRyb2xiYXJcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLXNtYWxsaWZ5XCI+PHNwYW4gY2xhc3M9XCJqc2dseXBoIGpzZ2x5cGgtY2hldnJvbi11cFwiPjwvc3Bhbj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLXNtYWxsaWZ5cmV2XCI+PHNwYW4gY2xhc3M9XCJqc2dseXBoIGpzZ2x5cGgtY2hldnJvbi1kb3duXCI+PC9zcGFuPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1idG4ganNQYW5lbC1idG4tbWluaW1pemVcIj48c3BhbiBjbGFzcz1cImpzZ2x5cGgganNnbHlwaC1taW5pbWl6ZVwiPjwvc3Bhbj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLW5vcm1hbGl6ZVwiPjxzcGFuIGNsYXNzPVwianNnbHlwaCBqc2dseXBoLW5vcm1hbGl6ZVwiPjwvc3Bhbj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLW1heGltaXplXCI+PHNwYW4gY2xhc3M9XCJqc2dseXBoIGpzZ2x5cGgtbWF4aW1pemVcIj48L3NwYW4+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLWJ0biBqc1BhbmVsLWJ0bi1jbG9zZVwiPjxzcGFuIGNsYXNzPVwianNnbHlwaCBqc2dseXBoLWNsb3NlXCI+PC9zcGFuPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1oZHItdG9vbGJhclwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtY29udGVudCBqc1BhbmVsLWNvbnRlbnQtbm9mb290ZXJcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtbWluaW1pemVkLWJveFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1mdHJcIj48L2Rpdj4nO1xuICAgICAgICByZXR1cm4gcGFuZWw7XG4gICAgfSxcbiAgICBjcmVhdGVNaW5pbWl6ZWRUZW1wbGF0ZTogZnVuY3Rpb24gY3JlYXRlTWluaW1pemVkVGVtcGxhdGUoKSB7XG4gICAgICAgIHZhciBwYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBwYW5lbC5jbGFzc05hbWUgPSAnanNQYW5lbC1yZXBsYWNlbWVudCc7XG4gICAgICAgIHBhbmVsLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwianNQYW5lbC1oZHJcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLWhlYWRlcmJhclwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLWhlYWRlcmxvZ29cIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC10aXRsZWJhclwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJqc1BhbmVsLXRpdGxlXCI+PC9oMz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1jb250cm9sYmFyXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLWJ0biBqc1BhbmVsLWJ0bi1ub3JtYWxpemVcIj48c3BhbiBjbGFzcz1cImpzZ2x5cGgganNnbHlwaC1ub3JtYWxpemVcIj48L3NwYW4+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLWJ0biBqc1BhbmVsLWJ0bi1tYXhpbWl6ZVwiPjxzcGFuIGNsYXNzPVwianNnbHlwaCBqc2dseXBoLW1heGltaXplXCI+PC9zcGFuPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1idG4ganNQYW5lbC1idG4tY2xvc2VcIj48c3BhbiBjbGFzcz1cImpzZ2x5cGgganNnbHlwaC1jbG9zZVwiPjwvc3Bhbj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4nO1xuICAgICAgICByZXR1cm4gcGFuZWw7XG4gICAgfSxcbiAgICBjcmVhdGVTbmFwQXJlYTogZnVuY3Rpb24gY3JlYXRlU25hcEFyZWEocGFuZWwsIHBvcywgc25hcHNlbnMpIHtcbiAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgICAgICBwYXJlbnQgPSBwYW5lbC5wYXJlbnROb2RlO1xuICAgICAgICBlbC5jbGFzc05hbWUgPSAnanNQYW5lbC1zbmFwLWFyZWEganNQYW5lbC1zbmFwLWFyZWEtJyArIHBvcztcbiAgICAgICAgaWYgKHBvcyA9PT0gJ2x0JyB8fCBwb3MgPT09ICdydCcgfHwgcG9zID09PSAncmInIHx8IHBvcyA9PT0gJ2xiJykge1xuICAgICAgICAgICAgZWwuc3R5bGUud2lkdGggPSBzbmFwc2VucyArICdweCc7XG4gICAgICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBzbmFwc2VucyArICdweCc7XG4gICAgICAgIH0gZWxzZSBpZiAocG9zID09PSAnY3QnIHx8IHBvcyA9PT0gJ2NiJykge1xuICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gc25hcHNlbnMgKyAncHgnO1xuICAgICAgICB9IGVsc2UgaWYgKHBvcyA9PT0gJ2xjJyB8fCBwb3MgPT09ICdyYycpIHtcbiAgICAgICAgICAgIGVsLnN0eWxlLndpZHRoID0gc25hcHNlbnMgKyAncHgnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJlbnQgIT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgICAgIGVsLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLXNuYXAtYXJlYS5qc1BhbmVsLXNuYXAtYXJlYS0nICsgcG9zKSkge1xuICAgICAgICAgICAgcGFuZWwucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChlbCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGRhcmtlbjogZnVuY3Rpb24gZGFya2VuKHZhbCwgYW1vdW50KSB7XG4gICAgICAgIC8vIGFtb3VudCBpcyB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDFcbiAgICAgICAgdmFyIGhzbCA9IHRoaXMuY29sb3IodmFsKS5oc2wsXG4gICAgICAgICAgICBsID0gcGFyc2VGbG9hdChoc2wubCksXG4gICAgICAgICAgICBsbmV3ID0gbCAtIGwgKiBhbW91bnQgKyAnJSc7XG4gICAgICAgIHJldHVybiAnaHNsKCcgKyBoc2wuaCArICcsJyArIGhzbC5zICsgJywnICsgbG5ldyArICcpJztcbiAgICB9LFxuICAgIGRyYWdpdDogZnVuY3Rpb24gZHJhZ2l0KGVsbXQpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG4gICAgICAgIHZhciBkcmFnc3RhcnRlZCA9IHZvaWQgMCxcbiAgICAgICAgICAgIG9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRzLmRyYWdpdCwgb3B0aW9ucyksXG4gICAgICAgICAgICBkcmFnRWxtdCA9IHZvaWQgMCxcbiAgICAgICAgICAgIGNvbnRhaW5tZW50ID0gdm9pZCAwLFxuICAgICAgICAgICAgZnJhbWVzID0gW107XG4gICAgICAgIHZhciBkcmFnc3RhcnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ2RyYWdzdGFydCcsIHsgZGV0YWlsOiBlbG10LmlkIH0pLFxuICAgICAgICAgICAgZHJhZyA9IG5ldyBDdXN0b21FdmVudCgnZHJhZycsIHsgZGV0YWlsOiBlbG10LmlkIH0pLFxuICAgICAgICAgICAgZHJhZ3N0b3AgPSBuZXcgQ3VzdG9tRXZlbnQoJ2RyYWdzdG9wJywgeyBkZXRhaWw6IGVsbXQuaWQgfSk7XG5cbiAgICAgICAgLy8gbm9ybWFsaXplIGdyaWQgY29uZmlnXG4gICAgICAgIGlmIChvcHRzLmdyaWQgJiYgQXJyYXkuaXNBcnJheShvcHRzLmdyaWQpKSB7XG4gICAgICAgICAgICBpZiAob3B0cy5ncmlkLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIG9wdHMuZ3JpZFsxXSA9IG9wdHMuZ3JpZFswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vcm1hbGl6ZSBjb250YWlubWVudCBjb25maWdcbiAgICAgICAgY29udGFpbm1lbnQgPSB0aGlzLnBPY29udGFpbm1lbnQob3B0cy5jb250YWlubWVudCk7XG5cbiAgICAgICAgLy8gYXR0YWNoIGhhbmRsZXIgdG8gZWFjaCBkcmFnIGhhbmRsZVxuICAgICAgICBlbG10LnF1ZXJ5U2VsZWN0b3JBbGwob3B0cy5oYW5kbGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGUpIHtcblxuICAgICAgICAgICAgaGFuZGxlLnN0eWxlLnRvdWNoQWN0aW9uID0gJ25vbmUnO1xuICAgICAgICAgICAgaGFuZGxlLnN0eWxlLmN1cnNvciA9IG9wdHMuY3Vyc29yO1xuICAgICAgICAgICAgaGFuZGxlLmNsYXNzTGlzdC5hZGQoJ2pzUGFuZWwtZHJhZ2l0LWhhbmRsZScpO1xuXG4gICAgICAgICAgICBqc1BhbmVsLnBvaW50ZXJkb3duLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBoYW5kbGUuYWRkRXZlbnRMaXN0ZW5lcihpdGVtLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBwcmV2ZW50IGJvZHkgc2Nyb2xsIG9uIGRyYWcgaW5pdFxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZm9vdGVyIGVsbXRzIHdpdGggdGhlIGNsYXNzIFwianNQYW5lbC1mdHItYnRuXCIgZG9uJ3QgZHJhZyBhIHBhbmVsXG4gICAgICAgICAgICAgICAgICAgIC8vIGRvIG5vdCBjb21wYXJlIGUudGFyZ2V0IHdpdGggZS5jdXJyZW50VGFyZ2V0IGJlY2F1c2UgdGhlcmUgbWlnaHQgYmUgZm9vdGVyIGVsbXRzIHN1cHBvc2VkIHRvIGRyYWcgdGhlIHBhbmVsXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbG9zZXN0KCcuanNQYW5lbC1mdHItYnRuJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGVsbXQuY29udHJvbGJhci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICBmcmFtZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpZnJhbWUnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZyYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnRTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbG10KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0TGVmdCA9IHBhcnNlRmxvYXQoc3RhcnRTdHlsZXMubGVmdCksXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydFRvcCA9IHBhcnNlRmxvYXQoc3RhcnRTdHlsZXMudG9wKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBzeCA9IGUudG91Y2hlcyA/IGUudG91Y2hlc1swXS5jbGllbnRYIDogZS5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9pbnRlciB4IG9uIG1vdXNlZG93biAoZG9uJ3QgdXNlIHBhZ2VYLCBkb2Vzbid0IHdvcmsgb24gRkYgZm9yIEFuZHJvaWQpXG4gICAgICAgICAgICAgICAgICAgIHBzeSA9IGUudG91Y2hlcyA/IGUudG91Y2hlc1swXS5jbGllbnRZIDogZS5jbGllbnRZLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9pbnRlciB5IG9uIG1vdXNlZG93biAoZG9uJ3QgdXNlIHBhZ2VZLCBkb2Vzbid0IHdvcmsgb24gRkYgZm9yIEFuZHJvaWQpXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudCA9IGVsbXQucGFyZW50Tm9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudFJlY3QgPSBwYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShwYXJlbnQpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnRMZWZ0Q29ycmVjdGlvbiA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gYWN0dWFsbHkgZHJhZ2luZyB0aGUgZWxtdFxuICAgICAgICAgICAgICAgICAgICBkcmFnRWxtdCA9IGZ1bmN0aW9uIGRyYWdFbG10KGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkcmFnc3RhcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZHJhZ3N0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLm9wYWNpdHkgPSBvcHRzLm9wYWNpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgY29uZmlndXJlZCByZXN0b3JlIHBhbmVsIHNpemUgdG8gdmFsdWVzIGJlZm9yZSBzbmFwIGFuZCByZXBvc2l0aW9uIHJlYXNvbmFibGUgYmVmb3JlIGRyYWcgYWN0dWFsbHkgc3RhcnRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsbXQuc25hcHBlZCAmJiBvcHRzLnNuYXAucmVzaXplVG9QcmVTbmFwICYmIGVsbXQuY3VycmVudERhdGEuYmVmb3JlU25hcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnJlc2l6ZShlbG10LmN1cnJlbnREYXRhLmJlZm9yZVNuYXAud2lkdGggKyAnICcgKyBlbG10LmN1cnJlbnREYXRhLmJlZm9yZVNuYXAuaGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW50ZXJtZWRpYXRlU3R5bGVzID0gZWxtdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhID0gcHN4IC0gKGludGVybWVkaWF0ZVN0eWxlcy5sZWZ0ICsgaW50ZXJtZWRpYXRlU3R5bGVzLndpZHRoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdIYWxmID0gaW50ZXJtZWRpYXRlU3R5bGVzLndpZHRoIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlbHRhID4gLXdIYWxmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydExlZnRDb3JyZWN0aW9uID0gZGVsdGEgKyB3SGFsZjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkcmFnc3RhcnQgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdHMuc3RhcnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5zdGFydC5jYWxsKGVsbXQsIGVsbXQsIHsgbGVmdDogc3RhcnRMZWZ0LCB0b3A6IHN0YXJ0VG9wIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc1BhbmVsLmZyb250KGVsbXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc25hcHBlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ3N0YXJ0ZWQgPSAxO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5kaXNhYmxlT25NYXhpbWl6ZWQgJiYgZWxtdC5zdGF0dXMgPT09ICdtYXhpbWl6ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxtdEwgPSB2b2lkIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdEwyID0gdm9pZCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXRUID0gdm9pZCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXRUMiA9IHZvaWQgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10UiA9IHZvaWQgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10UjIgPSB2b2lkIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdEIgPSB2b2lkIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdEIyID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBteCA9IGUudG91Y2hlcyA/IGUudG91Y2hlc1swXS5jbGllbnRYIDogZS5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGN1cnJlbnQgcG9pbnRlciB4IHdoaWxlIHBvaW50ZXIgbW92ZXMgKGRvbid0IHVzZSBwYWdlWCwgZG9lc24ndCB3b3JrIG9uIEZGIGZvciBBbmRyb2lkKVxuICAgICAgICAgICAgICAgICAgICAgICAgcG15ID0gZS50b3VjaGVzID8gZS50b3VjaGVzWzBdLmNsaWVudFkgOiBlLmNsaWVudFksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY3VycmVudCBwb2ludGVyIHkgd2hpbGUgcG9pbnRlciBtb3ZlcyAoZG9uJ3QgdXNlIHBhZ2VZLCBkb2Vzbid0IHdvcmsgb24gRkYgZm9yIEFuZHJvaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICBkcmFnU3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxtdCk7IC8vIGdldCBjdXJyZW50IHN0eWxlcyB3aGlsZSBkcmFnaW5nXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNuYXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5zbmFwLnRyaWdnZXIgPT09ICdwYW5lbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdEwgPSBwYXJzZUZsb2F0KGRyYWdTdHlsZXMubGVmdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXRMMiA9IE1hdGgucG93KGVsbXRMLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdFQgPSBwYXJzZUZsb2F0KGRyYWdTdHlsZXMudG9wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdFQyID0gTWF0aC5wb3coZWxtdFQsIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10UiA9IHBhcnNlRmxvYXQoZHJhZ1N0eWxlcy5yaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXRSMiA9IE1hdGgucG93KGVsbXRSLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdEIgPSBwYXJzZUZsb2F0KGRyYWdTdHlsZXMuYm90dG9tKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdEIyID0gTWF0aC5wb3coZWxtdEIsIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0cy5zbmFwLnRyaWdnZXIgPT09ICdwb2ludGVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10TCA9IHBteDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdEwyID0gTWF0aC5wb3cocG14LCAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdFQgPSBwbXk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXRUMiA9IE1hdGgucG93KGVsbXRULCAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdFIgPSB3aW5kb3cuaW5uZXJXaWR0aCAtIHBteDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdFIyID0gTWF0aC5wb3coZWxtdFIsIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10QiA9IHdpbmRvdy5pbm5lckhlaWdodCAtIHBteTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdEIyID0gTWF0aC5wb3coZWxtdEIsIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxlZnR0b3BWZWN0b3JEcmFnID0gTWF0aC5zcXJ0KGVsbXRMMiArIGVsbXRUMiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdGJvdHRvbVZlY3RvckRyYWcgPSBNYXRoLnNxcnQoZWxtdEwyICsgZWxtdEIyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodHRvcFZlY3RvckRyYWcgPSBNYXRoLnNxcnQoZWxtdFIyICsgZWxtdFQyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodGJvdHRvbVZlY3RvckRyYWcgPSBNYXRoLnNxcnQoZWxtdFIyICsgZWxtdEIyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsRGVsdGFEcmFnID0gTWF0aC5hYnMoZWxtdEwgLSBlbG10UikgLyAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsRGVsdGFEcmFnID0gTWF0aC5hYnMoZWxtdFQgLSBlbG10QikgLyAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRWZWN0b3JEcmFnID0gTWF0aC5zcXJ0KGVsbXRMMiArIE1hdGgucG93KHZlcnRpY2FsRGVsdGFEcmFnLCAyKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wVmVjdG9yRHJhZyA9IE1hdGguc3FydChlbG10VDIgKyBNYXRoLnBvdyhob3Jpem9udGFsRGVsdGFEcmFnLCAyKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRWZWN0b3JEcmFnID0gTWF0aC5zcXJ0KGVsbXRSMiArIE1hdGgucG93KHZlcnRpY2FsRGVsdGFEcmFnLCAyKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tVmVjdG9yRHJhZyA9IE1hdGguc3FydChlbG10QjIgKyBNYXRoLnBvdyhob3Jpem9udGFsRGVsdGFEcmFnLCAyKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByZXZlbnQgc2VsY3Rpb25zIHdoaWxlIGRyYWdpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHJpZ2dlciBkcmFnIHBlcm1hbmVudGx5IHdoaWxlIGRyYWdpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZHJhZyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1vdmUgZWxtdFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRzLmF4aXMgfHwgb3B0cy5heGlzID09PSAneCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLmxlZnQgPSBzdGFydExlZnQgKyAocG14IC0gcHN4KSArIHN0YXJ0TGVmdENvcnJlY3Rpb24gKyAncHgnOyAvLyBzZXQgbmV3IGNzcyBsZWZ0IG9mIGVsbXQgZGVwZW5kaW5nIG9uIG9wdHMuYXhpc1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRzLmF4aXMgfHwgb3B0cy5heGlzID09PSAneScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLnRvcCA9IHN0YXJ0VG9wICsgKHBteSAtIHBzeSkgKyAncHgnOyAvLyBzZXQgbmV3IGNzcyB0b3Agb2YgZWxtdCBkZXBlbmRpbmcgb24gb3B0cy5heGlzXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFwcGx5IGdyaWQgb3B0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5ncmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN4ID0gcGFyc2VGbG9hdChkcmFnU3R5bGVzLmxlZnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjeSA9IHBhcnNlRmxvYXQoZHJhZ1N0eWxlcy50b3ApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RYID0gY3ggJSBvcHRzLmdyaWRbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZFkgPSBjeSAlIG9wdHMuZ3JpZFsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9kWCA8IG9wdHMuZ3JpZFswXSAvIDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zdHlsZS5sZWZ0ID0gY3ggLSBtb2RYICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLmxlZnQgPSBjeCArIChvcHRzLmdyaWRbMF0gLSBtb2RYKSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb2RZIDwgb3B0cy5ncmlkWzFdIC8gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLnRvcCA9IGN5IC0gbW9kWSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zdHlsZS50b3AgPSBjeSArIChvcHRzLmdyaWRbMV0gLSBtb2RZKSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhcHBseSBjb250YWlubWVudCBvcHRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmNvbnRhaW5tZW50IHx8IG9wdHMuY29udGFpbm1lbnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF4TGVmdCA9IHZvaWQgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4VG9wID0gdm9pZCAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FsYyBtYXhMZWZ0IGFuZCBtYXhUb3AgKG1pbkxlZnQgYW5kIE1pblRvcCBpcyBlcXVhbCB0byBjb250YWlubWVudCBzZXR0aW5nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbG10Lm9wdGlvbnMuY29udGFpbmVyID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heExlZnQgPSB3aW5kb3cuaW5uZXJXaWR0aCAtIHBhcnNlRmxvYXQoZHJhZ1N0eWxlcy53aWR0aCkgLSBjb250YWlubWVudFsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4VG9wID0gd2luZG93LmlubmVySGVpZ2h0IC0gcGFyc2VGbG9hdChkcmFnU3R5bGVzLmhlaWdodCkgLSBjb250YWlubWVudFsyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgeENvcnIgPSBwYXJzZUZsb2F0KHBhcmVudFN0eWxlcy5ib3JkZXJMZWZ0V2lkdGgpICsgcGFyc2VGbG9hdChwYXJlbnRTdHlsZXMuYm9yZGVyUmlnaHRXaWR0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB5Q29yciA9IHBhcnNlRmxvYXQocGFyZW50U3R5bGVzLmJvcmRlclRvcFdpZHRoKSArIHBhcnNlRmxvYXQocGFyZW50U3R5bGVzLmJvcmRlckJvdHRvbVdpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4TGVmdCA9IHBhcmVudFJlY3Qud2lkdGggLSBwYXJzZUZsb2F0KGRyYWdTdHlsZXMud2lkdGgpIC0gY29udGFpbm1lbnRbMV0gLSB4Q29ycjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4VG9wID0gcGFyZW50UmVjdC5oZWlnaHQgLSBwYXJzZUZsb2F0KGRyYWdTdHlsZXMuaGVpZ2h0KSAtIGNvbnRhaW5tZW50WzJdIC0geUNvcnI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlRmxvYXQoZWxtdC5zdHlsZS5sZWZ0KSA8PSBjb250YWlubWVudFszXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLmxlZnQgPSBjb250YWlubWVudFszXSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUZsb2F0KGVsbXQuc3R5bGUudG9wKSA8PSBjb250YWlubWVudFswXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLnRvcCA9IGNvbnRhaW5tZW50WzBdICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlRmxvYXQoZWxtdC5zdHlsZS5sZWZ0KSA+PSBtYXhMZWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc3R5bGUubGVmdCA9IG1heExlZnQgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VGbG9hdChlbG10LnN0eWxlLnRvcCkgPj0gbWF4VG9wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc3R5bGUudG9wID0gbWF4VG9wICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrIHdoaWxlIGRyYWdnaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdHMuZHJhZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuZHJhZy5jYWxsKGVsbXQsIGVsbXQsIHsgbGVmdDogZWxtdEwsIHRvcDogZWxtdFQsIHJpZ2h0OiBlbG10UiwgYm90dG9tOiBlbG10QiB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXBwbHkgc25hcCBvcHRpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5zbmFwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNuYXBTZW5zID0gb3B0cy5zbmFwLnNlbnNpdGl2aXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3BTZW5zQXJlYUxlbmd0aCA9IHBhcmVudCA9PT0gZG9jdW1lbnQuYm9keSA/IHdpbmRvdy5pbm5lcldpZHRoIC8gOCA6IHBhcmVudFJlY3Qud2lkdGggLyA4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWRlU2Vuc0FyZWFMZW5ndGggPSBwYXJlbnQgPT09IGRvY3VtZW50LmJvZHkgPyB3aW5kb3cuaW5uZXJIZWlnaHQgLyA4IDogcGFyZW50UmVjdC5oZWlnaHQgLyA4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc25hcHBhYmxlVG8gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc1BhbmVsLnJlbW92ZVNuYXBBcmVhcyhlbG10KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZWZ0dG9wVmVjdG9yRHJhZyA8IHNuYXBTZW5zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc25hcHBhYmxlVG8gPSAnbGVmdC10b3AnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5zbmFwLnNuYXBMZWZ0VG9wICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganNQYW5lbC5jcmVhdGVTbmFwQXJlYShlbG10LCAnbHQnLCBzbmFwU2Vucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxlZnRib3R0b21WZWN0b3JEcmFnIDwgc25hcFNlbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zbmFwcGFibGVUbyA9ICdsZWZ0LWJvdHRvbSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNuYXAuc25hcExlZnRCb3R0b20gIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc1BhbmVsLmNyZWF0ZVNuYXBBcmVhKGVsbXQsICdsYicsIHNuYXBTZW5zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmlnaHR0b3BWZWN0b3JEcmFnIDwgc25hcFNlbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zbmFwcGFibGVUbyA9ICdyaWdodC10b3AnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5zbmFwLnNuYXBSaWdodFRvcCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzUGFuZWwuY3JlYXRlU25hcEFyZWEoZWxtdCwgJ3J0Jywgc25hcFNlbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyaWdodGJvdHRvbVZlY3RvckRyYWcgPCBzbmFwU2Vucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnNuYXBwYWJsZVRvID0gJ3JpZ2h0LWJvdHRvbSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNuYXAuc25hcFJpZ2h0Qm90dG9tICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganNQYW5lbC5jcmVhdGVTbmFwQXJlYShlbG10LCAncmInLCBzbmFwU2Vucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVsbXRUIDwgc25hcFNlbnMgJiYgdG9wVmVjdG9yRHJhZyA8IHRvcFNlbnNBcmVhTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc25hcHBhYmxlVG8gPSAnY2VudGVyLXRvcCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNuYXAuc25hcENlbnRlclRvcCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzUGFuZWwuY3JlYXRlU25hcEFyZWEoZWxtdCwgJ2N0Jywgc25hcFNlbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlbG10TCA8IHNuYXBTZW5zICYmIGxlZnRWZWN0b3JEcmFnIDwgc2lkZVNlbnNBcmVhTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc25hcHBhYmxlVG8gPSAnbGVmdC1jZW50ZXInO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5zbmFwLnNuYXBMZWZ0Q2VudGVyICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganNQYW5lbC5jcmVhdGVTbmFwQXJlYShlbG10LCAnbGMnLCBzbmFwU2Vucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVsbXRSIDwgc25hcFNlbnMgJiYgcmlnaHRWZWN0b3JEcmFnIDwgc2lkZVNlbnNBcmVhTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc25hcHBhYmxlVG8gPSAncmlnaHQtY2VudGVyJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuc25hcC5zbmFwUmlnaHRDZW50ZXIgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc1BhbmVsLmNyZWF0ZVNuYXBBcmVhKGVsbXQsICdyYycsIHNuYXBTZW5zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxtdEIgPCBzbmFwU2VucyAmJiBib3R0b21WZWN0b3JEcmFnIDwgdG9wU2Vuc0FyZWFMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zbmFwcGFibGVUbyA9ICdjZW50ZXItYm90dG9tJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuc25hcC5zbmFwQ2VudGVyQm90dG9tICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganNQYW5lbC5jcmVhdGVTbmFwQXJlYShlbG10LCAnY2InLCBzbmFwU2Vucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAganNQYW5lbC5wb2ludGVybW92ZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGl0ZW0sIGRyYWdFbG10KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAganNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoaXRlbSwgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGpzUGFuZWwucG9pbnRlcm1vdmUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihpdGVtLCBkcmFnRWxtdCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaW5oZXJpdCc7XG4gICAgICAgICAgICAgICAgICAgIGpzUGFuZWwucmVtb3ZlU25hcEFyZWFzKGVsbXQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChkcmFnc3RhcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChkcmFnc3RvcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ3N0YXJ0ZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbG10LnNhdmVDdXJyZW50UG9zaXRpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuc25hcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbG10LnNuYXBwYWJsZVRvID09PSAnbGVmdC10b3AnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzUGFuZWwuc25hcFBhbmVsKGVsbXQsIG9wdHMuc25hcC5zbmFwTGVmdFRvcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlbG10LnNuYXBwYWJsZVRvID09PSAnY2VudGVyLXRvcCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganNQYW5lbC5zbmFwUGFuZWwoZWxtdCwgb3B0cy5zbmFwLnNuYXBDZW50ZXJUb3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxtdC5zbmFwcGFibGVUbyA9PT0gJ3JpZ2h0LXRvcCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganNQYW5lbC5zbmFwUGFuZWwoZWxtdCwgb3B0cy5zbmFwLnNuYXBSaWdodFRvcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlbG10LnNuYXBwYWJsZVRvID09PSAncmlnaHQtY2VudGVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc1BhbmVsLnNuYXBQYW5lbChlbG10LCBvcHRzLnNuYXAuc25hcFJpZ2h0Q2VudGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVsbXQuc25hcHBhYmxlVG8gPT09ICdyaWdodC1ib3R0b20nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzUGFuZWwuc25hcFBhbmVsKGVsbXQsIG9wdHMuc25hcC5zbmFwUmlnaHRCb3R0b20pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxtdC5zbmFwcGFibGVUbyA9PT0gJ2NlbnRlci1ib3R0b20nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzUGFuZWwuc25hcFBhbmVsKGVsbXQsIG9wdHMuc25hcC5zbmFwQ2VudGVyQm90dG9tKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVsbXQuc25hcHBhYmxlVG8gPT09ICdsZWZ0LWJvdHRvbScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganNQYW5lbC5zbmFwUGFuZWwoZWxtdCwgb3B0cy5zbmFwLnNuYXBMZWZ0Qm90dG9tKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVsbXQuc25hcHBhYmxlVG8gPT09ICdsZWZ0LWNlbnRlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganNQYW5lbC5zbmFwUGFuZWwoZWxtdCwgb3B0cy5zbmFwLnNuYXBMZWZ0Q2VudGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5zbmFwLmNhbGxiYWNrICYmIGVsbXQuc25hcHBhYmxlVG8gJiYgdHlwZW9mIG9wdHMuc25hcC5jYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLnNuYXAuY2FsbGJhY2suY2FsbChlbG10LCBlbG10KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxtdC5zbmFwcGFibGVUbyAmJiBvcHRzLnNuYXAucmVwb3NpdGlvbk9uU25hcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnJlcG9zaXRpb25PblNuYXAoZWxtdC5zbmFwcGFibGVUbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdHMuc3RvcCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuc3RvcC5jYWxsKGVsbXQsIGVsbXQsIHsgbGVmdDogcGFyc2VGbG9hdChlbG10LnN0eWxlLmxlZnQpLCB0b3A6IHBhcnNlRmxvYXQoZWxtdC5zdHlsZS50b3ApIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZWxtdC5jb250cm9sYmFyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnaW5oZXJpdCc7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmcmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUucG9pbnRlckV2ZW50cyA9ICdpbmhlcml0JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gZHJhZ2l0IGlzIGluaXRpYWxpemVkIC0gbm93IGRpc2FibGUgaWYgc2V0XG4gICAgICAgICAgICBpZiAob3B0cy5kaXNhYmxlKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBlbG10O1xuICAgIH0sXG4gICAgZW1wdHlOb2RlOiBmdW5jdGlvbiBlbXB0eU5vZGUobm9kZSkge1xuICAgICAgICB3aGlsZSAobm9kZS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfSxcbiAgICBleHRlbmQ6IGZ1bmN0aW9uIGV4dGVuZChvYmopIHtcbiAgICAgICAgLy8gb2JqIG5lZWRzIHRvIGJlIGEgcGxhaW4gb2JqZWN0XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGV4dCBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGV4dCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leHRlbnNpb25zW2V4dF0gPSBvYmpbZXh0XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGZldGNoOiBmdW5jdGlvbiAoX2ZldGNoKSB7XG4gICAgICAgIGZ1bmN0aW9uIGZldGNoKF94Mykge1xuICAgICAgICAgICAgcmV0dXJuIF9mZXRjaC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgZmV0Y2gudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX2ZldGNoLnRvU3RyaW5nKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGZldGNoO1xuICAgIH0oZnVuY3Rpb24gKG9iaikge1xuICAgICAgICB2YXIgY29uZiA9IG9iai5vcHRpb25zLmNvbnRlbnRGZXRjaDtcbiAgICAgICAgdmFyIGNvbmZEZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIGJvZHlNZXRob2Q6ICd0ZXh0JyxcbiAgICAgICAgICAgIGV2YWxzY3JpcHR0YWdzOiB0cnVlLFxuICAgICAgICAgICAgYXV0b3Jlc2l6ZTogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9yZXBvc2l0aW9uOiB0cnVlLFxuICAgICAgICAgICAgZG9uZTogZnVuY3Rpb24gZG9uZShvYmosIHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgb2JqLmNvbnRlbnQuaW5uZXJIVE1MID0gcmVzcG9uc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25mID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29uZiA9IE9iamVjdC5hc3NpZ24oeyByZXNvdXJjZTogb2JqLm9wdGlvbnMuY29udGVudEZldGNoIH0sIGNvbmZEZWZhdWx0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25mID0gT2JqZWN0LmFzc2lnbihjb25mRGVmYXVsdHMsIGNvbmYpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBmZXRjaEluaXQgPSBjb25mLmZldGNoSW5pdCB8fCB7fTtcblxuICAgICAgICBpZiAoY29uZi5iZWZvcmVTZW5kKSB7XG4gICAgICAgICAgICBjb25mLmJlZm9yZVNlbmQuY2FsbChvYmosIG9iaik7XG4gICAgICAgIH1cblxuICAgICAgICBmZXRjaChjb25mLnJlc291cmNlLCBmZXRjaEluaXQpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZVtjb25mLmJvZHlNZXRob2RdKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgcmVzcG9uc2Ugd2FzIG5vdCBvay4nKTtcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuICAgICAgICAgICAgY29uZi5kb25lLmNhbGwob2JqLCBvYmosIHJlc3BvbnNlKTtcblxuICAgICAgICAgICAgLy8gZXh0cmFjdCBhbmQgZXZhbCBjb250ZW50IG9mIHNjcmlwdCB0YWdzIGlmIFwiZXZhbHNjcmlwdHRhZ3NcIlxuICAgICAgICAgICAgaWYgKGNvbmYuZXZhbHNjcmlwdHRhZ3MpIHtcbiAgICAgICAgICAgICAgICAvLyBnZXQgYWxsIHNjcmlwdCB0YWdzIHdpdGhpbiByZXNwb25zZVRleHRcbiAgICAgICAgICAgICAgICB2YXIgc2NyaXB0dGFncyA9IHJlc3BvbnNlLm1hdGNoKC88c2NyaXB0XFxiW14+XSo+KFtcXHNcXFNdKj8pPFxcL3NjcmlwdD4vZ2kpO1xuICAgICAgICAgICAgICAgIGlmIChzY3JpcHR0YWdzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcmlwdHRhZ3MuZm9yRWFjaChmdW5jdGlvbiAodGFnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGFncyBmcm9tIHN0cmluZyBhbmQgdHJpbSBpdFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGpzID0gdGFnLnJlcGxhY2UoLzxzY3JpcHRcXGJbXj5dKj4vaSwgJycpLnJlcGxhY2UoLzxcXC9zY3JpcHQ+L2ksICcnKS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBleGVjdXRlIGphdmFzY3JpcHRcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2YWwoanMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHJlc2l6ZSBhbmQgcmVwb3NpdGlvbiBwYW5lbCBpZiBlaXRoZXIgd2lkdGggb3IgaGVpZ2h0IGlzIHNldCB0byAnYXV0bydcbiAgICAgICAgICAgIHZhciBvQ29udGVudFNpemUgPSBvYmoub3B0aW9ucy5jb250ZW50U2l6ZTtcbiAgICAgICAgICAgIGlmIChjb25mLmF1dG9yZXNpemUgfHwgY29uZi5hdXRvcmVwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb0NvbnRlbnRTaXplID09PSAnc3RyaW5nJyAmJiBvQ29udGVudFNpemUubWF0Y2goL2F1dG8vaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnRzID0gb0NvbnRlbnRTaXplLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzaXplcyA9IE9iamVjdC5hc3NpZ24oe30sIHsgd2lkdGg6IHBhcnRzWzBdLCBoZWlnaHQ6IHBhcnRzWzFdIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZi5hdXRvcmVzaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoucmVzaXplKHNpemVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9iai5jbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwtY29udGV4dG1lbnUnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmYuYXV0b3JlcG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoucmVwb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgodHlwZW9mIG9Db250ZW50U2l6ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yob0NvbnRlbnRTaXplKSkgPT09ICdvYmplY3QnICYmIChvQ29udGVudFNpemUud2lkdGggPT09ICdhdXRvJyB8fCBvQ29udGVudFNpemUuaGVpZ2h0ID09PSAnYXV0bycpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfc2l6ZXMyID0gT2JqZWN0LmFzc2lnbih7fSwgb0NvbnRlbnRTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmYuYXV0b3Jlc2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnJlc2l6ZShfc2l6ZXMyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9iai5jbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwtY29udGV4dG1lbnUnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmYuYXV0b3JlcG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoucmVwb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RoZXJlIGhhcyBiZWVuIGEgcHJvYmxlbSB3aXRoIHlvdXIgZmV0Y2ggb3BlcmF0aW9uOiAnICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH0pO1xuICAgIH0pLFxuICAgIGZyb250OiBmdW5jdGlvbiBmcm9udChvYmopIHtcbiAgICAgICAgaWYgKG9iai5zdGF0dXMgPT09ICdtaW5pbWl6ZWQnKSB7XG4gICAgICAgICAgICBpZiAob2JqLnN0YXR1c0JlZm9yZSA9PT0gJ21heGltaXplZCcpIHtcbiAgICAgICAgICAgICAgICBvYmoubWF4aW1pemUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqLm5vcm1hbGl6ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIG5ld0FyciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qc1BhbmVsLXN0YW5kYXJkJykpLm1hcChmdW5jdGlvbiAocGFuZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFuZWwuc3R5bGUuekluZGV4O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoTWF0aC5tYXguYXBwbHkoTWF0aCwgX3RvQ29uc3VtYWJsZUFycmF5KG5ld0FycikpID4gb2JqLnN0eWxlLnpJbmRleCkge1xuICAgICAgICAgICAgICAgIG9iai5zdHlsZS56SW5kZXggPSBqc1BhbmVsLnppLm5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVzZXRaaSgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRQYW5lbHM6IGZ1bmN0aW9uIGdldFBhbmVscygpIHtcbiAgICAgICAgdmFyIGNvbmRpdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdqc1BhbmVsLXN0YW5kYXJkJyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qc1BhbmVsJykpLmZpbHRlcihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25kaXRpb24uY2FsbCh2YWx1ZSwgdmFsdWUpO1xuICAgICAgICB9KS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYi5zdHlsZS56SW5kZXggLSBhLnN0eWxlLnpJbmRleDtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBoc2xUb1JnYjogZnVuY3Rpb24gaHNsVG9SZ2IoaCwgcywgbCkge1xuICAgICAgICAvLyBoLCBzIGFuZCBsIG11c3QgYmUgdmFsdWVzIGJldHdlZW4gMCBhbmQgMVxuICAgICAgICB2YXIgciA9IHZvaWQgMCxcbiAgICAgICAgICAgIGcgPSB2b2lkIDAsXG4gICAgICAgICAgICBiID0gdm9pZCAwO1xuICAgICAgICBpZiAocyA9PT0gMCkge1xuICAgICAgICAgICAgciA9IGcgPSBiID0gbDsgLy8gYWNocm9tYXRpY1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGh1ZTJyZ2IgPSBmdW5jdGlvbiBodWUycmdiKHAsIHEsIHQpIHtcbiAgICAgICAgICAgICAgICBpZiAodCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdCArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdCAtPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodCA8IDEgLyA2KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwICsgKHEgLSBwKSAqIDYgKiB0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodCA8IDEgLyAyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodCA8IDIgLyAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwICsgKHEgLSBwKSAqICgyIC8gMyAtIHQpICogNjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHEgPSBsIDwgMC41ID8gbCAqICgxICsgcykgOiBsICsgcyAtIGwgKiBzLFxuICAgICAgICAgICAgICAgIHAgPSAyICogbCAtIHE7XG4gICAgICAgICAgICByID0gaHVlMnJnYihwLCBxLCBoICsgMSAvIDMpO1xuICAgICAgICAgICAgZyA9IGh1ZTJyZ2IocCwgcSwgaCk7XG4gICAgICAgICAgICBiID0gaHVlMnJnYihwLCBxLCBoIC0gMSAvIDMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbTWF0aC5yb3VuZChyICogMjU1KSwgTWF0aC5yb3VuZChnICogMjU1KSwgTWF0aC5yb3VuZChiICogMjU1KV07XG4gICAgfSxcbiAgICBsaWdodGVuOiBmdW5jdGlvbiBsaWdodGVuKHZhbCwgYW1vdW50KSB7XG4gICAgICAgIC8vIGFtb3VudCBpcyB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDFcbiAgICAgICAgdmFyIGhzbCA9IHRoaXMuY29sb3IodmFsKS5oc2wsXG4gICAgICAgICAgICBsID0gcGFyc2VGbG9hdChoc2wubCksXG4gICAgICAgICAgICBsbmV3ID0gbCArICgxMDAgLSBsKSAqIGFtb3VudCArICclJztcbiAgICAgICAgcmV0dXJuICdoc2woJyArIGhzbC5oICsgJywnICsgaHNsLnMgKyAnLCcgKyBsbmV3ICsgJyknO1xuICAgIH0sXG4gICAgcGVyY2VpdmVkQnJpZ2h0bmVzczogZnVuY3Rpb24gcGVyY2VpdmVkQnJpZ2h0bmVzcyh2YWwpIHtcbiAgICAgICAgdmFyIHJnYiA9IHRoaXMuY29sb3IodmFsKS5yZ2I7XG4gICAgICAgIC8vIHJldHVybiB2YWx1ZSBpcyBpbiB0aGUgcmFuZ2UgMCAtIDEgYW5kIGlucHV0IHJnYiB2YWx1ZXMgbXVzdCBhbHNvIGJlIGluIHRoZSByYW5nZSAwIC0gMVxuICAgICAgICAvLyBhbGdvcml0aG0gZnJvbTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvUmVjLl8yMDIwXG4gICAgICAgIHJldHVybiByZ2IuciAvIDI1NSAqIDAuMjYyNyArIHJnYi5nIC8gMjU1ICogMC42NzgwICsgcmdiLmIgLyAyNTUgKiAwLjA1OTM7XG4gICAgfSxcbiAgICBwT2NvbnRhaW5lcjogZnVuY3Rpb24gcE9jb250YWluZXIoY29udGFpbmVyLCBjYikge1xuICAgICAgICBpZiAoY29udGFpbmVyKSB7XG4gICAgICAgICAgICB2YXIgYm94ID0gdm9pZCAwO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb250YWluZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjb250YWluZXIubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBib3ggPSBjb250YWluZXI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRhaW5lci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBib3ggPSBjb250YWluZXJbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYm94ICYmIGJveC5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBib3g7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZXJyb3IgPSBuZXcganNQYW5lbEVycm9yKCdcXG5OTyBORVcgUEFORUwgQ1JFQVRFRCFcXG5UaGUgY29udGFpbmVyIHRvIGFwcGVuZCB0aGUgcGFuZWwgdG8gZG9lcyBub3QgZXhpc3Qgb3IgYSBjb250YWluZXIgd2FzIG5vdCBzcGVjaWZpZWQhJyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgY2IuY2FsbChlLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgfSxcblxuXG4gICAgLy8gbm9ybWFsaXplcyB2YWx1ZXMgZm9yIG9wdGlvbi5tYXhpbWl6ZWRNYXJnaW4gYW5kIGNvbnRhaW5tZW50IG9mIGRyYWdpdC9yZXNpemVpdFxuICAgIHBPY29udGFpbm1lbnQ6IGZ1bmN0aW9uIHBPY29udGFpbm1lbnQoYXJnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYXJnID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgLy8gYXJnOiAyMCA9PiBhcmc6IFsyMCwgMjAsIDIwLCAyMF1cbiAgICAgICAgICAgIHJldHVybiBbYXJnLCBhcmcsIGFyZywgYXJnXTtcbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcbiAgICAgICAgICAgIGlmIChhcmcubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgLy8gYXJnOiBbMjBdID0+IGFyZzogWzIwLCAyMCwgMjAsIDIwXVxuICAgICAgICAgICAgICAgIHJldHVybiBbYXJnWzBdLCBhcmdbMF0sIGFyZ1swXSwgYXJnWzBdXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJnLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIC8vIGFyZzogWzIwLCA0MF0gPT4gYXJnOiBbMjAsIDQwLCAyMCwgNDBdXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFyZy5jb25jYXQoYXJnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJnLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgICAgIGFyZ1szXSA9IGFyZ1sxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJnOyAvLyBhc3N1bWVkIHRvIGJlIGFycmF5IHdpdGggNCB2YWx1ZXNcbiAgICB9LFxuICAgIHBPc2l6ZTogZnVuY3Rpb24gcE9zaXplKHBhbmVsLCBzaXplKSB7XG4gICAgICAgIHZhciB2YWx1ZXMgPSBzaXplIHx8IHRoaXMuZGVmYXVsdHMuY29udGVudFNpemUsXG4gICAgICAgICAgICBwYXJlbnQgPSBwYW5lbC5wYXJlbnROb2RlO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHZhciBudW1zID0gdmFsdWVzLnRyaW0oKS5zcGxpdCgnICcpO1xuICAgICAgICAgICAgdmFsdWVzID0ge307XG4gICAgICAgICAgICB2YWx1ZXMud2lkdGggPSBudW1zWzBdO1xuICAgICAgICAgICAgbnVtcy5sZW5ndGggPT09IDIgPyB2YWx1ZXMuaGVpZ2h0ID0gbnVtc1sxXSA6IHZhbHVlcy5oZWlnaHQgPSBudW1zWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHZhbHVlcy53aWR0aCAmJiAhdmFsdWVzLmhlaWdodCkge1xuICAgICAgICAgICAgICAgIHZhbHVlcy5oZWlnaHQgPSB2YWx1ZXMud2lkdGg7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlcy5oZWlnaHQgJiYgIXZhbHVlcy53aWR0aCkge1xuICAgICAgICAgICAgICAgIHZhbHVlcy53aWR0aCA9IHZhbHVlcy5oZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoU3RyaW5nKHZhbHVlcy53aWR0aCkubWF0Y2goL15bMC05XSskL2dpKSkge1xuICAgICAgICAgICAgLy8gaWYgbnVtYmVyIG9ubHlcbiAgICAgICAgICAgIHZhbHVlcy53aWR0aCArPSAncHgnO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZXMud2lkdGggPT09ICdzdHJpbmcnICYmIHZhbHVlcy53aWR0aC5lbmRzV2l0aCgnJScpKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50ID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGggKiAocGFyc2VGbG9hdCh2YWx1ZXMud2lkdGgpIC8gMTAwKSArICdweCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBwcnRTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShwYXJlbnQpLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXIgPSBwYXJzZUZsb2F0KHBydFN0eWxlcy5ib3JkZXJMZWZ0V2lkdGgpICsgcGFyc2VGbG9hdChwcnRTdHlsZXMuYm9yZGVyUmlnaHRXaWR0aCk7XG4gICAgICAgICAgICAgICAgdmFsdWVzLndpZHRoID0gKHBhcnNlRmxvYXQocHJ0U3R5bGVzLndpZHRoKSAtIGJvcmRlcikgKiAocGFyc2VGbG9hdCh2YWx1ZXMud2lkdGgpIC8gMTAwKSArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlcy53aWR0aCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdmFsdWVzLndpZHRoID0gdmFsdWVzLndpZHRoKCk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlcy53aWR0aCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXMud2lkdGggKz0gJ3B4JztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlcy53aWR0aCA9PT0gJ3N0cmluZycgJiYgdmFsdWVzLndpZHRoLm1hdGNoKC9eWzAtOV0rJC9naSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXMud2lkdGggKz0gJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChTdHJpbmcodmFsdWVzLmhlaWdodCkubWF0Y2goL15bMC05XSskL2dpKSkge1xuICAgICAgICAgICAgLy8gaWYgbnVtYmVyIG9ubHlcbiAgICAgICAgICAgIHZhbHVlcy5oZWlnaHQgKz0gJ3B4JztcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWVzLmhlaWdodCA9PT0gJ3N0cmluZycgJiYgdmFsdWVzLmhlaWdodC5lbmRzV2l0aCgnJScpKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50ID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAqIChwYXJzZUZsb2F0KHZhbHVlcy5oZWlnaHQpIC8gMTAwKSArICdweCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBfcHJ0U3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUocGFyZW50KSxcbiAgICAgICAgICAgICAgICAgICAgX2JvcmRlciA9IHBhcnNlRmxvYXQoX3BydFN0eWxlcy5ib3JkZXJUb3BXaWR0aCkgKyBwYXJzZUZsb2F0KF9wcnRTdHlsZXMuYm9yZGVyQm90dG9tV2lkdGgpO1xuICAgICAgICAgICAgICAgIHZhbHVlcy5oZWlnaHQgPSAocGFyc2VGbG9hdChfcHJ0U3R5bGVzLmhlaWdodCkgLSBfYm9yZGVyKSAqIChwYXJzZUZsb2F0KHZhbHVlcy5oZWlnaHQpIC8gMTAwKSArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlcy5oZWlnaHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZhbHVlcy5oZWlnaHQgPSB2YWx1ZXMuaGVpZ2h0KCk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlcy5oZWlnaHQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzLmhlaWdodCArPSAncHgnO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWVzLmhlaWdodCA9PT0gJ3N0cmluZycgJiYgdmFsdWVzLmhlaWdodC5tYXRjaCgvXlswLTldKyQvZ2kpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzLmhlaWdodCArPSAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlczsgLy8gcmV0dXJuIHZhbHVlIG11c3QgYmUgb2JqZWN0IHt3aWR0aDogeHh4LCBoZWlnaHQ6IHh4eH1cbiAgICB9LFxuICAgIHBvc2l0aW9uOiBmdW5jdGlvbiBwb3NpdGlvbihlbG10LCBfcG9zaXRpb24pIHtcbiAgICAgICAgdmFyIGVsbXRUb1Bvc2l0aW9uID0gdm9pZCAwLFxuICAgICAgICAgICAgcG9zU2V0dGluZ3MgPSB2b2lkIDAsXG4gICAgICAgICAgICBlbG10VG9Qb3NpdGlvbkFnYWluc3QgPSB2b2lkIDAsXG4gICAgICAgICAgICBjYWxjdWxhdGVkUG9zaXRpb24gPSB7IGxlZnQ6IDAsIHRvcDogMCB9LFxuICAgICAgICAgICAgbXlYY29ycmVjdGlvbiA9IDAsXG4gICAgICAgICAgICBteVljb3JyZWN0aW9uID0gMCxcbiAgICAgICAgICAgIGF0WGNvcnJlY3Rpb24gPSAwLFxuICAgICAgICAgICAgYXRZY29ycmVjdGlvbiA9IDA7XG5cbiAgICAgICAgdmFyIGRlZmF1bHRzID0geyBteTogJ2NlbnRlcicsIGF0OiAnY2VudGVyJywgb2Y6ICd3aW5kb3cnLCBvZmZzZXRYOiAnMHB4Jywgb2Zmc2V0WTogJzBweCcgfSxcbiAgICAgICAgICAgIHdpbmRvd1JlY3QgPSB7XG4gICAgICAgICAgICB3aWR0aDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgICAgfSxcbiAgICAgICAgICAgIHNjcm9sbFggPSBwYWdlWE9mZnNldCxcbiAgICAgICAgICAgIHNjcm9sbFkgPSBwYWdlWU9mZnNldDtcblxuICAgICAgICBpZiAodHlwZW9mIGVsbXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvLyBhcmcgZWxtdCBpcyBhc3N1bWVkIHRvIGJlIGEgc2VsZWN0b3Igc3RyaW5nXG4gICAgICAgICAgICBlbG10VG9Qb3NpdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxtdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBvdGhlcndpc2UgYXJnIGVsbXQgaXMgYXNzdW1lZCB0byBiZSBhIG5vZGUgb2JqZWN0XG4gICAgICAgICAgICBlbG10VG9Qb3NpdGlvbiA9IGVsbXQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkbyBub3QgcG9zaXRpb24gZWxtdCB3aGVuIHBhcmFtZXRlciBwb3NpdGlvbiBpcyBzZXQgdG8gYm9vbGVhbiBmYWxzZVxuICAgICAgICBpZiAoIV9wb3NpdGlvbikge1xuICAgICAgICAgICAgZWxtdFRvUG9zaXRpb24uc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgICAgICByZXR1cm4gZWxtdFRvUG9zaXRpb247XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZWxtdFRvUG9zaXRpb25SZWN0ID0gZWxtdFRvUG9zaXRpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIC8vIGNvbnRhaW5zIHJlYWQtb25seSBsZWZ0LCB0b3AsIHJpZ2h0LCBib3R0b20sIHgsIHksIHdpZHRoLCBoZWlnaHQgZGVzY3JpYmluZyB0aGUgISEgYm9yZGVyLWJveCAhISBpbiBwaXhlbHNcbiAgICAgICAgLy8gUHJvcGVydGllcyBvdGhlciB0aGFuIHdpZHRoIGFuZCBoZWlnaHQgYXJlIHJlbGF0aXZlIHRvIHRoZSB0b3AtbGVmdCBvZiB0aGUgdmlld3BvcnQhIVxuXG4gICAgICAgIC8vIHRyYW5zbGF0ZSBzaG9ydGhhbmQgc3RyaW5nIHRvIG9iamVjdCAtIFwidG9wLWxlZnQgNTAgNTAgZG93blwiXG4gICAgICAgIGlmICh0eXBlb2YgX3Bvc2l0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdmFyIHBvc1ZhbHVlID0gX3Bvc2l0aW9uLm1hdGNoKC9cXGJbYS16XXs0LDZ9LXsxfVthLXpdezMsNn1cXGIvaSksXG4gICAgICAgICAgICAgICAgYXV0b3Bvc1ZhbHVlID0gX3Bvc2l0aW9uLm1hdGNoKC9kb3dufHVwfHJpZ2h0KFteLV18JCl8bGVmdChbXi1dfCQpL2kpLFxuICAgICAgICAgICAgICAgIG9mZnNldFZhbHVlID0gX3Bvc2l0aW9uLm1hdGNoKC9bKy1dP1xcZD9cXC4/XFxkKyhbYS16JV17Miw0fVxcYnwlPykvZ2kpO1xuICAgICAgICAgICAgdmFyIHNldHRpbmdzID0gdm9pZCAwO1xuXG4gICAgICAgICAgICBpZiAocG9zVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncyA9IHsgbXk6IHBvc1ZhbHVlWzBdLnRvTG93ZXJDYXNlKCksIGF0OiBwb3NWYWx1ZVswXS50b0xvd2VyQ2FzZSgpIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzID0geyBteTogJ2NlbnRlcicsIGF0OiAnY2VudGVyJyB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYXV0b3Bvc1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MuYXV0b3Bvc2l0aW9uID0gYXV0b3Bvc1ZhbHVlWzBdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvZmZzZXRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgc3RyaW5ncyB3aXRoIG9ubHkgbnVtYmVycyB0byBhIG51bWJlciB2YWx1ZVxuICAgICAgICAgICAgICAgIG9mZnNldFZhbHVlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLm1hdGNoKC9eWystXT9bMC05XSokLykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldFZhbHVlW2luZGV4XSArPSAncHgnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFZhbHVlW2luZGV4XSA9IG9mZnNldFZhbHVlW2luZGV4XS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgb25lIHBhc3NlZCBvZmZzZXQgaXMgdXNlZCBmb3IgYm90aCBvZmZzZXRYIGFuZCBvZmZzZXRZXG4gICAgICAgICAgICAgICAgaWYgKG9mZnNldFZhbHVlLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5vZmZzZXRYID0gb2Zmc2V0VmFsdWVbMF07XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLm9mZnNldFkgPSBvZmZzZXRWYWx1ZVswXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5vZmZzZXRYID0gb2Zmc2V0VmFsdWVbMF07XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLm9mZnNldFkgPSBvZmZzZXRWYWx1ZVsxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBvc1NldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIHNldHRpbmdzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBvc1NldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIF9wb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcGFyZW50Q29udGFpbmVyID0gZWxtdFRvUG9zaXRpb24ucGFyZW50RWxlbWVudDtcbiAgICAgICAgdmFyIHBhcmVudENvbnRhaW5lclN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHBhcmVudENvbnRhaW5lcik7XG4gICAgICAgIHZhciBwYXJlbnRDb250YWluZXJSZWN0ID0gcGFyZW50Q29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB2YXIgcGFyZW50Q29udGFpbmVyVGFnTmFtZSA9IHBhcmVudENvbnRhaW5lci50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYgKHBvc1NldHRpbmdzLm9mICYmIHBvc1NldHRpbmdzLm9mICE9PSAnd2luZG93Jykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwb3NTZXR0aW5ncy5vZiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAvLyBwb3NTZXR0aW5ncy5vZiBpcyBhc3N1bWVkIHRvIGJlIGEgc2VsZWN0b3Igc3RyaW5nXG4gICAgICAgICAgICAgICAgZWxtdFRvUG9zaXRpb25BZ2FpbnN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3NTZXR0aW5ncy5vZik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG90aGVyd2lzZSBwb3NTZXR0aW5ncy5vZiBpcyBhc3N1bWVkIHRvIGJlIGEgbm9kZSBvYmplY3RcbiAgICAgICAgICAgICAgICBlbG10VG9Qb3NpdGlvbkFnYWluc3QgPSBwb3NTZXR0aW5ncy5vZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNhbGMgbGVmdCBjb3JyZWN0aW9ucyBkdWUgdG8gcGFuZWwgc2l6ZSwgc2hvdWxkIGJlIHRoZSBzYW1lIGZvciBhbGwgc2NlbmFyaW9zXG4gICAgICAgIGlmIChwb3NTZXR0aW5ncy5teS5tYXRjaCgvXmNlbnRlci10b3AkfF5jZW50ZXIkfF5jZW50ZXItYm90dG9tJC9pKSkge1xuICAgICAgICAgICAgbXlYY29ycmVjdGlvbiA9IGVsbXRUb1Bvc2l0aW9uUmVjdC53aWR0aCAvIDI7XG4gICAgICAgIH0gZWxzZSBpZiAocG9zU2V0dGluZ3MubXkubWF0Y2goL3JpZ2h0L2kpKSB7XG4gICAgICAgICAgICBteVhjb3JyZWN0aW9uID0gZWxtdFRvUG9zaXRpb25SZWN0LndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNhbGMgdG9wIGNvcnJlY3Rpb25zIGR1ZSB0byBwYW5lbCBzaXplXG4gICAgICAgIGlmIChwb3NTZXR0aW5ncy5teS5tYXRjaCgvXmxlZnQtY2VudGVyJHxeY2VudGVyJHxecmlnaHQtY2VudGVyJC9pKSkge1xuICAgICAgICAgICAgbXlZY29ycmVjdGlvbiA9IGVsbXRUb1Bvc2l0aW9uUmVjdC5oZWlnaHQgLyAyO1xuICAgICAgICB9IGVsc2UgaWYgKHBvc1NldHRpbmdzLm15Lm1hdGNoKC9ib3R0b20vaSkpIHtcbiAgICAgICAgICAgIG15WWNvcnJlY3Rpb24gPSBlbG10VG9Qb3NpdGlvblJlY3QuaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU0NFTkFSSU8gMSAtIHBhbmVsIGFwcGVuZGVkIHRvIGJvZHkgYW5kIHBvc2l0aW9uZWQgcmVsYXRpdmUgdG8gd2luZG93IC0+IG1ha2UgZml4ZWRcbiAgICAgICAgaWYgKHBhcmVudENvbnRhaW5lclRhZ05hbWUgPT09ICdib2R5JyAmJiBwb3NTZXR0aW5ncy5vZiA9PT0gJ3dpbmRvdycpIHtcbiAgICAgICAgICAgIC8vIGNhbGMgbGVmdCBjb3JyZWN0aW9ucyBkdWUgdG8gd2luZG93IHNpemVcbiAgICAgICAgICAgIGlmIChwb3NTZXR0aW5ncy5hdC5tYXRjaCgvXmNlbnRlci10b3AkfF5jZW50ZXIkfF5jZW50ZXItYm90dG9tJC9pKSkge1xuICAgICAgICAgICAgICAgIGF0WGNvcnJlY3Rpb24gPSB3aW5kb3dSZWN0LndpZHRoIC8gMjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocG9zU2V0dGluZ3MuYXQubWF0Y2goL3JpZ2h0L2kpKSB7XG4gICAgICAgICAgICAgICAgYXRYY29ycmVjdGlvbiA9IHdpbmRvd1JlY3Qud2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjYWxjIHRvcCBjb3JyZWN0aW9ucyBkdWUgdG8gd2luZG93IHNpemVcbiAgICAgICAgICAgIGlmIChwb3NTZXR0aW5ncy5hdC5tYXRjaCgvXmxlZnQtY2VudGVyJHxeY2VudGVyJHxecmlnaHQtY2VudGVyJC9pKSkge1xuICAgICAgICAgICAgICAgIGF0WWNvcnJlY3Rpb24gPSB3aW5kb3dSZWN0LmhlaWdodCAvIDI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBvc1NldHRpbmdzLmF0Lm1hdGNoKC9ib3R0b20vaSkpIHtcbiAgICAgICAgICAgICAgICBhdFljb3JyZWN0aW9uID0gd2luZG93UmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhbGN1bGF0ZWRQb3NpdGlvbi5sZWZ0ID0gYXRYY29ycmVjdGlvbiAtIG15WGNvcnJlY3Rpb24gLSBwYXJzZUZsb2F0KHBhcmVudENvbnRhaW5lclN0eWxlcy5ib3JkZXJMZWZ0V2lkdGgpO1xuICAgICAgICAgICAgY2FsY3VsYXRlZFBvc2l0aW9uLnRvcCA9IGF0WWNvcnJlY3Rpb24gLSBteVljb3JyZWN0aW9uIC0gcGFyc2VGbG9hdChwYXJlbnRDb250YWluZXJTdHlsZXMuYm9yZGVyVG9wV2lkdGgpO1xuXG4gICAgICAgICAgICAvLyBwYW5lbCBhcHBlbmRlZCB0byBib2R5IGFuZCBwb3NpdGlvbmVkIHJlbGF0aXZlIHRvIHdpbmRvdyBpcyBhbHdheXMgZml4ZWRcbiAgICAgICAgICAgIGVsbXRUb1Bvc2l0aW9uLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNDRU5BUklPIDIgLSBwYW5lbCBhcHBlbmRlZCB0byBib2R5IGFuZCBwb3NpdGlvbmVkIHJlbGF0aXZlIHRvIGFub3RoZXIgZWxlbWVudCBpbiBkb2N1bWVudFxuICAgICAgICBlbHNlIGlmIChwYXJlbnRDb250YWluZXJUYWdOYW1lID09PSAnYm9keScgJiYgcG9zU2V0dGluZ3Mub2YgIT09ICd3aW5kb3cnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsbXRUb1Bvc2l0aW9uQWdhaW5zdFJlY3QgPSBlbG10VG9Qb3NpdGlvbkFnYWluc3QuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBjYWxjIGxlZnQgY29ycmVjdGlvbnMgZHVlIHRvIHBvc2l0aW9uIGFuZCBzaXplIG9mIGVsbXRUb1Bvc2l0aW9uQWdhaW5zdFxuICAgICAgICAgICAgICAgIGlmIChwb3NTZXR0aW5ncy5hdC5tYXRjaCgvXmNlbnRlci10b3AkfF5jZW50ZXIkfF5jZW50ZXItYm90dG9tJC9pKSkge1xuICAgICAgICAgICAgICAgICAgICBhdFhjb3JyZWN0aW9uID0gZWxtdFRvUG9zaXRpb25BZ2FpbnN0UmVjdC53aWR0aCAvIDIgKyBlbG10VG9Qb3NpdGlvbkFnYWluc3RSZWN0LmxlZnQgKyBzY3JvbGxYO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9zU2V0dGluZ3MuYXQubWF0Y2goL3JpZ2h0L2kpKSB7XG4gICAgICAgICAgICAgICAgICAgIGF0WGNvcnJlY3Rpb24gPSBlbG10VG9Qb3NpdGlvbkFnYWluc3RSZWN0LndpZHRoICsgZWxtdFRvUG9zaXRpb25BZ2FpbnN0UmVjdC5sZWZ0ICsgc2Nyb2xsWDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhdFhjb3JyZWN0aW9uID0gZWxtdFRvUG9zaXRpb25BZ2FpbnN0UmVjdC5sZWZ0ICsgc2Nyb2xsWDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gY2FsYyB0b3AgY29ycmVjdGlvbnMgZHVlIHRvIHBvc2l0aW9uIGFuZCBzaXplIG9mIGVsbXRUb1Bvc2l0aW9uQWdhaW5zdFxuICAgICAgICAgICAgICAgIGlmIChwb3NTZXR0aW5ncy5hdC5tYXRjaCgvXmxlZnQtY2VudGVyJHxeY2VudGVyJHxecmlnaHQtY2VudGVyJC9pKSkge1xuICAgICAgICAgICAgICAgICAgICBhdFljb3JyZWN0aW9uID0gZWxtdFRvUG9zaXRpb25BZ2FpbnN0UmVjdC5oZWlnaHQgLyAyICsgZWxtdFRvUG9zaXRpb25BZ2FpbnN0UmVjdC50b3AgKyBzY3JvbGxZO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9zU2V0dGluZ3MuYXQubWF0Y2goL2JvdHRvbS9pKSkge1xuICAgICAgICAgICAgICAgICAgICBhdFljb3JyZWN0aW9uID0gZWxtdFRvUG9zaXRpb25BZ2FpbnN0UmVjdC5oZWlnaHQgKyBlbG10VG9Qb3NpdGlvbkFnYWluc3RSZWN0LnRvcCArIHNjcm9sbFk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXRZY29ycmVjdGlvbiA9IGVsbXRUb1Bvc2l0aW9uQWdhaW5zdFJlY3QudG9wICsgc2Nyb2xsWTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjYWxjdWxhdGVkUG9zaXRpb24ubGVmdCA9IGF0WGNvcnJlY3Rpb24gLSBteVhjb3JyZWN0aW9uIC0gcGFyc2VGbG9hdChwYXJlbnRDb250YWluZXJTdHlsZXMuYm9yZGVyTGVmdFdpZHRoKTtcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGVkUG9zaXRpb24udG9wID0gYXRZY29ycmVjdGlvbiAtIG15WWNvcnJlY3Rpb24gLSBwYXJzZUZsb2F0KHBhcmVudENvbnRhaW5lclN0eWxlcy5ib3JkZXJUb3BXaWR0aCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFNDRU5BUklPIDMgLSAvLyBwYW5lbCBhcHBlbmRlZCB0byBvdGhlciBlbGVtZW50IHRoYW4gYm9keSBhbmQgcG9zaXRpb25lZCByZWxhdGl2ZSB0byBpdHMgY29udGFpbmVyXG4gICAgICAgICAgICBlbHNlIGlmIChwYXJlbnRDb250YWluZXJUYWdOYW1lICE9PSAnYm9keScgJiYgKHBvc1NldHRpbmdzLm9mID09PSAnd2luZG93JyB8fCAhcG9zU2V0dGluZ3Mub2YpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbGMgY29ycmVjdGlvbnMgdG8gcG9zaXRpb24gcGFuZWwgcmVsYXRpdmUgdG8gcGFyZW50Q29udGFpbmVyIGNvbnRlbnQtYm94LCBub3QgYm9yZGVyLWJveFxuICAgICAgICAgICAgICAgICAgICB2YXIgcENvbnRhaW5lckxSQm9yZGVyV2lkdGggPSBwYXJzZUZsb2F0KHBhcmVudENvbnRhaW5lclN0eWxlcy5ib3JkZXJMZWZ0V2lkdGgpICsgcGFyc2VGbG9hdChwYXJlbnRDb250YWluZXJTdHlsZXMuYm9yZGVyUmlnaHRXaWR0aCksXG4gICAgICAgICAgICAgICAgICAgICAgICBwQ29udGFpbmVyVEJCb3JkZXJXaWR0aCA9IHBhcnNlRmxvYXQocGFyZW50Q29udGFpbmVyU3R5bGVzLmJvcmRlclRvcFdpZHRoKSArIHBhcnNlRmxvYXQocGFyZW50Q29udGFpbmVyU3R5bGVzLmJvcmRlckJvdHRvbVdpZHRoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjYWxjIGxlZnQgY29ycmVjdGlvbnMgZHVlIHRvIHBhcmVudCBjb250YWluZXIgd2lkdGhcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc1NldHRpbmdzLmF0Lm1hdGNoKC9eY2VudGVyLXRvcCR8XmNlbnRlciR8XmNlbnRlci1ib3R0b20kL2kpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdFhjb3JyZWN0aW9uID0gcGFyZW50Q29udGFpbmVyUmVjdC53aWR0aCAvIDIgLSBwQ29udGFpbmVyTFJCb3JkZXJXaWR0aCAvIDI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9zU2V0dGluZ3MuYXQubWF0Y2goL3JpZ2h0L2kpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdFhjb3JyZWN0aW9uID0gcGFyZW50Q29udGFpbmVyUmVjdC53aWR0aCAtIHBDb250YWluZXJMUkJvcmRlcldpZHRoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbGMgdG9wIGNvcnJlY3Rpb25zIGR1ZSB0byBwYXJlbnQgY29udGFpbmVyIGhlaWdodFxuICAgICAgICAgICAgICAgICAgICBpZiAocG9zU2V0dGluZ3MuYXQubWF0Y2goL15sZWZ0LWNlbnRlciR8XmNlbnRlciR8XnJpZ2h0LWNlbnRlciQvaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0WWNvcnJlY3Rpb24gPSBwYXJlbnRDb250YWluZXJSZWN0LmhlaWdodCAvIDIgLSBwQ29udGFpbmVyVEJCb3JkZXJXaWR0aCAvIDI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9zU2V0dGluZ3MuYXQubWF0Y2goL2JvdHRvbS9pKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXRZY29ycmVjdGlvbiA9IHBhcmVudENvbnRhaW5lclJlY3QuaGVpZ2h0IC0gcENvbnRhaW5lclRCQm9yZGVyV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVkUG9zaXRpb24ubGVmdCA9IGF0WGNvcnJlY3Rpb24gLSBteVhjb3JyZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVkUG9zaXRpb24udG9wID0gYXRZY29ycmVjdGlvbiAtIG15WWNvcnJlY3Rpb247XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gU0NFTkFSSU8gNCAtIHBhbmVsIGFwcGVuZGVkIHRvIG90aGVyIGVsZW1lbnQgdGhhbiBib2R5IGFuZCBwb3NpdGlvbmVkIHJlbGF0aXZlIHRvIGFuIGVsZW1lbnQgd2l0aGluIGl0cyBjb250YWluZXJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwYXJlbnRDb250YWluZXJUYWdOYW1lICE9PSAnYm9keScgJiYgcGFyZW50Q29udGFpbmVyLmNvbnRhaW5zKGVsbXRUb1Bvc2l0aW9uQWdhaW5zdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZWxtdFRvUG9zaXRpb25BZ2FpbnN0UmVjdCA9IGVsbXRUb1Bvc2l0aW9uQWdhaW5zdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FsYyBsZWZ0IGNvcnJlY3Rpb25zIGR1ZSB0byBwb3NpdGlvbiBhbmQgc2l6ZSBvZiBlbG10VG9Qb3NpdGlvbkFnYWluc3RcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb3NTZXR0aW5ncy5hdC5tYXRjaCgvXmNlbnRlci10b3AkfF5jZW50ZXIkfF5jZW50ZXItYm90dG9tJC9pKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0WGNvcnJlY3Rpb24gPSBfZWxtdFRvUG9zaXRpb25BZ2FpbnN0UmVjdC5sZWZ0IC0gcGFyZW50Q29udGFpbmVyUmVjdC5sZWZ0ICsgX2VsbXRUb1Bvc2l0aW9uQWdhaW5zdFJlY3Qud2lkdGggLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb3NTZXR0aW5ncy5hdC5tYXRjaCgvcmlnaHQvaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdFhjb3JyZWN0aW9uID0gX2VsbXRUb1Bvc2l0aW9uQWdhaW5zdFJlY3QubGVmdCAtIHBhcmVudENvbnRhaW5lclJlY3QubGVmdCArIF9lbG10VG9Qb3NpdGlvbkFnYWluc3RSZWN0LndpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdFhjb3JyZWN0aW9uID0gX2VsbXRUb1Bvc2l0aW9uQWdhaW5zdFJlY3QubGVmdCAtIHBhcmVudENvbnRhaW5lclJlY3QubGVmdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbGMgdG9wIGNvcnJlY3Rpb25zIGR1ZSB0byBwb3NpdGlvbiBhbmQgc2l6ZSBvZiBlbG10VG9Qb3NpdGlvbkFnYWluc3RcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb3NTZXR0aW5ncy5hdC5tYXRjaCgvXmxlZnQtY2VudGVyJHxeY2VudGVyJHxecmlnaHQtY2VudGVyJC9pKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0WWNvcnJlY3Rpb24gPSBfZWxtdFRvUG9zaXRpb25BZ2FpbnN0UmVjdC50b3AgLSBwYXJlbnRDb250YWluZXJSZWN0LnRvcCArIF9lbG10VG9Qb3NpdGlvbkFnYWluc3RSZWN0LmhlaWdodCAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvc1NldHRpbmdzLmF0Lm1hdGNoKC9ib3R0b20vaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdFljb3JyZWN0aW9uID0gX2VsbXRUb1Bvc2l0aW9uQWdhaW5zdFJlY3QudG9wIC0gcGFyZW50Q29udGFpbmVyUmVjdC50b3AgKyBfZWxtdFRvUG9zaXRpb25BZ2FpbnN0UmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0WWNvcnJlY3Rpb24gPSBfZWxtdFRvUG9zaXRpb25BZ2FpbnN0UmVjdC50b3AgLSBwYXJlbnRDb250YWluZXJSZWN0LnRvcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlZFBvc2l0aW9uLmxlZnQgPSBhdFhjb3JyZWN0aW9uIC0gbXlYY29ycmVjdGlvbiAtIHBhcnNlRmxvYXQocGFyZW50Q29udGFpbmVyU3R5bGVzLmJvcmRlckxlZnRXaWR0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVkUG9zaXRpb24udG9wID0gYXRZY29ycmVjdGlvbiAtIG15WWNvcnJlY3Rpb24gLSBwYXJzZUZsb2F0KHBhcmVudENvbnRhaW5lclN0eWxlcy5ib3JkZXJUb3BXaWR0aCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAvLyBhdXRvcG9zaXRpb24gcGFuZWxzIG9ubHkgaWYgLi4uXG4gICAgICAgIGlmIChwb3NTZXR0aW5ncy5hdXRvcG9zaXRpb24gJiYgcG9zU2V0dGluZ3MubXkgPT09IHBvc1NldHRpbmdzLmF0ICYmIFsnbGVmdC10b3AnLCAnY2VudGVyLXRvcCcsICdyaWdodC10b3AnLCAnbGVmdC1ib3R0b20nLCAnY2VudGVyLWJvdHRvbScsICdyaWdodC1ib3R0b20nXS5pbmRleE9mKHBvc1NldHRpbmdzLm15KSA+PSAwKSB7XG4gICAgICAgICAgICAvLyBhZGQgY2xhc3Mgd2l0aCBwb3NpdGlvbiBhbmQgYXV0b3Bvc2l0aW9uIGRpcmVjdGlvblxuICAgICAgICAgICAgdmFyIG5ld0NsYXNzID0gcG9zU2V0dGluZ3MubXkgKyAnLScgKyBwb3NTZXR0aW5ncy5hdXRvcG9zaXRpb24udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGVsbXRUb1Bvc2l0aW9uLmNsYXNzTGlzdC5hZGQobmV3Q2xhc3MpO1xuXG4gICAgICAgICAgICAvLyBnZXQgYWxsIHBhbmVscyB3aXRoIHNhbWUgY2xhc3NcbiAgICAgICAgICAgIHZhciBuZXdDbGFzc0FsbCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgbmV3Q2xhc3MpKSxcbiAgICAgICAgICAgICAgICBvd25JbmRleCA9IG5ld0NsYXNzQWxsLmluZGV4T2YoZWxtdFRvUG9zaXRpb24pO1xuXG4gICAgICAgICAgICAvLyBpZiBtb3JlIHRoYW4gMSBwb3NpdGlvbiBuZXcgcGFuZWxcbiAgICAgICAgICAgIGlmIChuZXdDbGFzc0FsbC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBvc1NldHRpbmdzLmF1dG9wb3NpdGlvbiA9PT0gJ2Rvd24nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbGxlY3QgaGVpZ2h0cyBvZiBhbGwgZWxtdHMgdG8gY2FsYyBuZXcgdG9wIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgIG5ld0NsYXNzQWxsLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAwICYmIGluZGV4IDw9IG93bkluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlZFBvc2l0aW9uLnRvcCArPSBuZXdDbGFzc0FsbFstLWluZGV4XS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgKyBqc1BhbmVsLmF1dG9wb3NpdGlvblNwYWNpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9zU2V0dGluZ3MuYXV0b3Bvc2l0aW9uID09PSAndXAnKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0NsYXNzQWxsLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAwICYmIGluZGV4IDw9IG93bkluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlZFBvc2l0aW9uLnRvcCAtPSBuZXdDbGFzc0FsbFstLWluZGV4XS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgKyBqc1BhbmVsLmF1dG9wb3NpdGlvblNwYWNpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9zU2V0dGluZ3MuYXV0b3Bvc2l0aW9uID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbGxlY3Qgd2lkdGhzIG9mIGFsbCBlbG10cyB0byBjYWxjIG5ldyBsZWZ0IHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgIG5ld0NsYXNzQWxsLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAwICYmIGluZGV4IDw9IG93bkluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlZFBvc2l0aW9uLmxlZnQgKz0gbmV3Q2xhc3NBbGxbLS1pbmRleF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggKyBqc1BhbmVsLmF1dG9wb3NpdGlvblNwYWNpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9zU2V0dGluZ3MuYXV0b3Bvc2l0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3Q2xhc3NBbGwuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDAgJiYgaW5kZXggPD0gb3duSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVkUG9zaXRpb24ubGVmdCAtPSBuZXdDbGFzc0FsbFstLWluZGV4XS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCArIGpzUGFuZWwuYXV0b3Bvc2l0aW9uU3BhY2luZztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gYXBwbHkgbWluTGVmdCwgbWluVG9wLCBtYXhMZWZ0IGFuZCBtYXhUb3AgdmFsdWVzIChuZWVkIHRvIGJlIG51bWJlcnMpXG4gICAgICAgIGlmICgocG9zU2V0dGluZ3MubWluTGVmdCB8fCBwb3NTZXR0aW5ncy5taW5MZWZ0ID09PSAwKSAmJiB0eXBlb2YgcG9zU2V0dGluZ3MubWluTGVmdCA9PT0gJ251bWJlcicgJiYgY2FsY3VsYXRlZFBvc2l0aW9uLmxlZnQgPCBwb3NTZXR0aW5ncy5taW5MZWZ0KSB7XG4gICAgICAgICAgICBjYWxjdWxhdGVkUG9zaXRpb24ubGVmdCA9IHBvc1NldHRpbmdzLm1pbkxlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChwb3NTZXR0aW5ncy5tYXhMZWZ0IHx8IHBvc1NldHRpbmdzLm1heExlZnQgPT09IDApICYmIHR5cGVvZiBwb3NTZXR0aW5ncy5tYXhMZWZ0ID09PSAnbnVtYmVyJyAmJiBjYWxjdWxhdGVkUG9zaXRpb24ubGVmdCA+IHBvc1NldHRpbmdzLm1heExlZnQpIHtcbiAgICAgICAgICAgIGNhbGN1bGF0ZWRQb3NpdGlvbi5sZWZ0ID0gcG9zU2V0dGluZ3MubWF4TGVmdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHBvc1NldHRpbmdzLm1pblRvcCB8fCBwb3NTZXR0aW5ncy5taW5Ub3AgPT09IDApICYmIHR5cGVvZiBwb3NTZXR0aW5ncy5taW5Ub3AgPT09ICdudW1iZXInICYmIGNhbGN1bGF0ZWRQb3NpdGlvbi50b3AgPCBwb3NTZXR0aW5ncy5taW5Ub3ApIHtcbiAgICAgICAgICAgIGNhbGN1bGF0ZWRQb3NpdGlvbi50b3AgPSBwb3NTZXR0aW5ncy5taW5Ub3A7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChwb3NTZXR0aW5ncy5tYXhUb3AgfHwgcG9zU2V0dGluZ3MubWF4VG9wID09PSAwKSAmJiB0eXBlb2YgcG9zU2V0dGluZ3MubWF4VG9wID09PSAnbnVtYmVyJyAmJiBjYWxjdWxhdGVkUG9zaXRpb24udG9wID4gcG9zU2V0dGluZ3MubWF4VG9wKSB7XG4gICAgICAgICAgICBjYWxjdWxhdGVkUG9zaXRpb24udG9wID0gcG9zU2V0dGluZ3MubWF4VG9wO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBwb3NTZXR0aW5ncy5tb2RpZnkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhbGN1bGF0ZWRQb3NpdGlvbiA9IHBvc1NldHRpbmdzLm1vZGlmeS5jYWxsKGNhbGN1bGF0ZWRQb3NpdGlvbiwgY2FsY3VsYXRlZFBvc2l0aW9uKTtcbiAgICAgICAgICAgIC8vIGluc2lkZSB0aGUgZnVuY3Rpb24gJ3RoaXMnIHJlZmVycyB0byB0aGUgb2JqZWN0ICduZXdDb29yZHMnXG4gICAgICAgICAgICAvLyBvcHRpb24ubW9kaWZ5IGlzIG9wdGlvbmFsLiBJZiBwcmVzZW50IGhhcyB0byBiZSBhIGZ1bmN0aW9uIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCB0aGUga2V5cyAnbGVmdCcgYW5kICd0b3AnIGFuZCB2YWx1ZXMgaGF2ZSB0byBiZSBudW1iZXJzXG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaW5hbGx5IGFwcGx5IG9mZnNldHMgYW5kIHBvc2l0aW9uIHBhbmVsXG4gICAgICAgIGlmICh0eXBlb2YgcG9zU2V0dGluZ3Mub2Zmc2V0WCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHBvc1NldHRpbmdzLm9mZnNldFggKz0gJ3B4JztcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHBvc1NldHRpbmdzLm9mZnNldFkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBwb3NTZXR0aW5ncy5vZmZzZXRZICs9ICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxtdFRvUG9zaXRpb24uc3R5bGUubGVmdCA9ICdjYWxjKCcgKyBjYWxjdWxhdGVkUG9zaXRpb24ubGVmdCArICdweCArICcgKyBwb3NTZXR0aW5ncy5vZmZzZXRYICsgJyknO1xuICAgICAgICBlbG10VG9Qb3NpdGlvbi5zdHlsZS50b3AgPSAnY2FsYygnICsgY2FsY3VsYXRlZFBvc2l0aW9uLnRvcCArICdweCArICcgKyBwb3NTZXR0aW5ncy5vZmZzZXRZICsgJyknO1xuICAgICAgICBlbG10VG9Qb3NpdGlvbi5zdHlsZS5vcGFjaXR5ID0gMTtcblxuICAgICAgICAvLyBjb252ZXJ0IGNzcyBjYWxjIHZhbHVlcyB0byBwaXhlbCB2YWx1ZXMgLSB0aGlzIGlzIHJlcXVpcmVkIGJ5IGRyYWdpdCBhbmQgcmVzaXplaXRcbiAgICAgICAgZWxtdFRvUG9zaXRpb24uc3R5bGUubGVmdCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsbXRUb1Bvc2l0aW9uKS5sZWZ0O1xuICAgICAgICBlbG10VG9Qb3NpdGlvbi5zdHlsZS50b3AgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbG10VG9Qb3NpdGlvbikudG9wO1xuXG4gICAgICAgIHJldHVybiBlbG10VG9Qb3NpdGlvbjtcbiAgICB9LFxuICAgIHJnYlRvSHNsOiBmdW5jdGlvbiByZ2JUb0hzbChyLCBnLCBiKSB7XG4gICAgICAgIHIgLz0gMjU1LCBnIC89IDI1NSwgYiAvPSAyNTU7XG4gICAgICAgIHZhciBtYXggPSBNYXRoLm1heChyLCBnLCBiKSxcbiAgICAgICAgICAgIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpLFxuICAgICAgICAgICAgaCA9IHZvaWQgMCxcbiAgICAgICAgICAgIHMgPSB2b2lkIDAsXG4gICAgICAgICAgICBsID0gKG1heCArIG1pbikgLyAyO1xuICAgICAgICBpZiAobWF4ID09PSBtaW4pIHtcbiAgICAgICAgICAgIGggPSBzID0gMDsgLy8gYWNocm9tYXRpY1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGQgPSBtYXggLSBtaW47XG4gICAgICAgICAgICBzID0gbCA+IDAuNSA/IGQgLyAoMiAtIG1heCAtIG1pbikgOiBkIC8gKG1heCArIG1pbik7XG5cbiAgICAgICAgICAgIHN3aXRjaCAobWF4KSB7XG4gICAgICAgICAgICAgICAgY2FzZSByOlxuICAgICAgICAgICAgICAgICAgICBoID0gKGcgLSBiKSAvIGQgKyAoZyA8IGIgPyA2IDogMCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZzpcbiAgICAgICAgICAgICAgICAgICAgaCA9IChiIC0gcikgLyBkICsgMjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBiOlxuICAgICAgICAgICAgICAgICAgICBoID0gKHIgLSBnKSAvIGQgKyA0O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGggLz0gNjtcbiAgICAgICAgfVxuICAgICAgICAvL3JldHVybiBbIGgsIHMsIGwgXTtcbiAgICAgICAgaCA9IGggKiAzNjA7XG4gICAgICAgIHMgPSBzICogMTAwICsgJyUnO1xuICAgICAgICBsID0gbCAqIDEwMCArICclJztcbiAgICAgICAgcmV0dXJuIHsgY3NzOiAnaHNsKCcgKyBoICsgJywnICsgcyArICcsJyArIGwgKyAnKScsIGg6IGgsIHM6IHMsIGw6IGwgfTtcbiAgICB9LFxuICAgIHJnYlRvSGV4OiBmdW5jdGlvbiByZ2JUb0hleChyLCBnLCBiKSB7XG4gICAgICAgIHZhciByZWQgPSBOdW1iZXIocikudG9TdHJpbmcoMTYpLFxuICAgICAgICAgICAgZ3JlZW4gPSBOdW1iZXIoZykudG9TdHJpbmcoMTYpLFxuICAgICAgICAgICAgYmx1ZSA9IE51bWJlcihiKS50b1N0cmluZygxNik7XG4gICAgICAgIGlmIChyZWQubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZWQgPSAnMCcgKyByZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdyZWVuLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgZ3JlZW4gPSAnMCcgKyBncmVlbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYmx1ZS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGJsdWUgPSAnMCcgKyBibHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnIycgKyByZWQgKyBncmVlbiArIGJsdWU7XG4gICAgfSxcbiAgICByZW1vdmVTbmFwQXJlYXM6IGZ1bmN0aW9uIHJlbW92ZVNuYXBBcmVhcyhwYW5lbCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanNQYW5lbC1zbmFwLWFyZWEnKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgaWYgKHBhbmVsLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICBwYW5lbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICByZXNldFppOiBmdW5jdGlvbiByZXNldFppKCkge1xuICAgICAgICB0aGlzLnppID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHN0YXJ0VmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IGpzUGFuZWwuemlCYXNlO1xuXG4gICAgICAgICAgICB2YXIgdmFsID0gc3RhcnRWYWx1ZTtcbiAgICAgICAgICAgIHJldHVybiB7IG5leHQ6IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWwrKztcbiAgICAgICAgICAgICAgICB9IH07XG4gICAgICAgIH0oKTtcbiAgICAgICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzUGFuZWwtc3RhbmRhcmQnKSkuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGEuc3R5bGUuekluZGV4IC0gYi5zdHlsZS56SW5kZXg7XG4gICAgICAgIH0pLmZvckVhY2goZnVuY3Rpb24gKHBhbmVsKSB7XG4gICAgICAgICAgICBwYW5lbC5zdHlsZS56SW5kZXggPSBqc1BhbmVsLnppLm5leHQoKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICByZXNpemVpdDogZnVuY3Rpb24gcmVzaXplaXQoZWxtdCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICAgICAgdmFyIG9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRzLnJlc2l6ZWl0LCBvcHRpb25zKSxcbiAgICAgICAgICAgIGVsbXRQYXJlbnQgPSBlbG10LnBhcmVudEVsZW1lbnQsXG4gICAgICAgICAgICBlbG10UGFyZW50VGFnTmFtZSA9IGVsbXRQYXJlbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgbWF4V2lkdGggPSB0eXBlb2Ygb3B0cy5tYXhXaWR0aCA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMubWF4V2lkdGgoKSA6IG9wdHMubWF4V2lkdGggfHwgMTAwMDAsXG4gICAgICAgICAgICBtYXhIZWlnaHQgPSB0eXBlb2Ygb3B0cy5tYXhIZWlnaHQgPT09ICdmdW5jdGlvbicgPyBvcHRzLm1heEhlaWdodCgpIDogb3B0cy5tYXhIZWlnaHQgfHwgMTAwMDAsXG4gICAgICAgICAgICBtaW5XaWR0aCA9IHR5cGVvZiBvcHRzLm1pbldpZHRoID09PSAnZnVuY3Rpb24nID8gb3B0cy5taW5XaWR0aCgpIDogb3B0cy5taW5XaWR0aCxcbiAgICAgICAgICAgIG1pbkhlaWdodCA9IHR5cGVvZiBvcHRzLm1pbkhlaWdodCA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMubWluSGVpZ2h0KCkgOiBvcHRzLm1pbkhlaWdodCxcbiAgICAgICAgICAgIHJlc2l6ZXN0YXJ0ID0gbmV3IEN1c3RvbUV2ZW50KCdyZXNpemVzdGFydCcsIHsgZGV0YWlsOiBlbG10LmlkIH0pLFxuICAgICAgICAgICAgcmVzaXplID0gbmV3IEN1c3RvbUV2ZW50KCdyZXNpemUnLCB7IGRldGFpbDogZWxtdC5pZCB9KSxcbiAgICAgICAgICAgIHJlc2l6ZXN0b3AgPSBuZXcgQ3VzdG9tRXZlbnQoJ3Jlc2l6ZXN0b3AnLCB7IGRldGFpbDogZWxtdC5pZCB9KTtcbiAgICAgICAgdmFyIGNvbnRhaW5tZW50ID0gdm9pZCAwLFxuICAgICAgICAgICAgcmVzaXplUGFuZWwgPSB2b2lkIDAsXG4gICAgICAgICAgICByZXNpemVzdGFydGVkID0gdm9pZCAwLFxuICAgICAgICAgICAgdyA9IHZvaWQgMCxcbiAgICAgICAgICAgIGggPSB2b2lkIDAsXG4gICAgICAgICAgICBmcmFtZXMgPSBbXTtcblxuICAgICAgICAvLyBub3JtYWxpemUgY29udGFpbm1lbnQgY29uZmlnXG4gICAgICAgIGNvbnRhaW5tZW50ID0gdGhpcy5wT2NvbnRhaW5tZW50KG9wdHMuY29udGFpbm1lbnQpO1xuXG4gICAgICAgIG9wdHMuaGFuZGxlcy5zcGxpdCgnLCcpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgICAgICAgICBub2RlLmNsYXNzTmFtZSA9ICdqc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZSBqc1BhbmVsLXJlc2l6ZWl0LScgKyBpdGVtLnRyaW0oKTtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUuekluZGV4ID0gOTA7XG4gICAgICAgICAgICBlbG10LmFwcGVuZChub2RlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZWxtdC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdqc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZScpKS5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGUpIHtcblxuICAgICAgICAgICAganNQYW5lbC5wb2ludGVyZG93bi5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlLmFkZEV2ZW50TGlzdGVuZXIoaXRlbSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJldmVudCB3aW5kb3cgc2Nyb2xsIHdoaWxlIHJlc2l6aW5nIGVsbXRcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGZyYW1lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lmcmFtZScpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZnJhbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWVzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbG10UmVjdCA9IGVsbXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBuZWVkcyB0byBiZSBjYWxjdWxhdGVkIG9uIHBvaW50ZXJkb3duISEgKi9cbiAgICAgICAgICAgICAgICAgICAgZWxtdFBhcmVudFJlY3QgPSBlbG10UGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgLyogbmVlZHMgdG8gYmUgY2FsY3VsYXRlZCBvbiBwb2ludGVyZG93biEhICovXG4gICAgICAgICAgICAgICAgICAgIGVsbXRQYXJlbnRTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbG10UGFyZW50LCBudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsbXRQYXJlbnRCTFcgPSBwYXJzZUludChlbG10UGFyZW50U3R5bGVzLmJvcmRlckxlZnRXaWR0aCwgMTApLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxtdFBhcmVudEJUVyA9IHBhcnNlSW50KGVsbXRQYXJlbnRTdHlsZXMuYm9yZGVyVG9wV2lkdGgsIDEwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsbXRQYXJlbnRQb3NpdGlvbiA9IGVsbXRQYXJlbnRTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgncG9zaXRpb24nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WCA9IGUuY2xpZW50WCB8fCBlLnRvdWNoZXNbMF0uY2xpZW50WCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WSA9IGUuY2xpZW50WSB8fCBlLnRvdWNoZXNbMF0uY2xpZW50WSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0V2lkdGggPSBlbG10UmVjdC53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0SGVpZ2h0ID0gZWxtdFJlY3QuaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXplSGFuZGxlQ2xhc3NMaXN0ID0gZS50YXJnZXQuY2xhc3NMaXN0O1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnRMZWZ0ID0gZWxtdFJlY3QubGVmdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0VG9wID0gZWxtdFJlY3QudG9wLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGhFYXN0ID0gMTAwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aFdlc3QgPSAxMDAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heEhlaWdodFNvdXRoID0gMTAwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHROb3J0aCA9IDEwMDAwO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGltcG9ydGFudCBpZiBjb250ZW50IGNvbnRhaW5zIGFub3RoZXIgZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAgICAgZWxtdC5jb250ZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsbXRQYXJlbnRUYWdOYW1lICE9PSAnYm9keScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0TGVmdCA9IGVsbXRSZWN0LmxlZnQgLSBlbG10UGFyZW50UmVjdC5sZWZ0ICsgZWxtdFBhcmVudC5zY3JvbGxMZWZ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRUb3AgPSBlbG10UmVjdC50b3AgLSBlbG10UGFyZW50UmVjdC50b3AgKyBlbG10UGFyZW50LnNjcm9sbFRvcDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbGMgbWluL21heCBsZWZ0L3RvcCB2YWx1ZXMgaWYgY29udGFpbm1lbnQgaXMgc2V0IC0gY29kZSBmcm9tIGpzRHJhZ2dhYmxlXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbG10UGFyZW50VGFnTmFtZSA9PT0gJ2JvZHknICYmIGNvbnRhaW5tZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aEVhc3QgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggLSBlbG10UmVjdC5sZWZ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF4SGVpZ2h0U291dGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC0gZWxtdFJlY3QudG9wO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGhXZXN0ID0gZWxtdFJlY3Qud2lkdGggKyBlbG10UmVjdC5sZWZ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF4SGVpZ2h0Tm9ydGggPSBlbG10UmVjdC5oZWlnaHQgKyBlbG10UmVjdC50b3A7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBwYW5lbCBpcyBOT1QgaW4gYm9keVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5tZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsbXRQYXJlbnRQb3NpdGlvbiA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGhFYXN0ID0gZWxtdFBhcmVudFJlY3Qud2lkdGggLSBlbG10UmVjdC5sZWZ0ICsgZWxtdFBhcmVudEJMVztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4SGVpZ2h0U291dGggPSBlbG10UGFyZW50UmVjdC5oZWlnaHQgKyBlbG10UGFyZW50UmVjdC50b3AgLSBlbG10UmVjdC50b3AgKyBlbG10UGFyZW50QlRXO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aFdlc3QgPSBlbG10UmVjdC53aWR0aCArIChlbG10UmVjdC5sZWZ0IC0gZWxtdFBhcmVudFJlY3QubGVmdCkgLSBlbG10UGFyZW50QkxXO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHROb3J0aCA9IGVsbXRSZWN0LmhlaWdodCArIChlbG10UmVjdC50b3AgLSBlbG10UGFyZW50UmVjdC50b3ApIC0gZWxtdFBhcmVudEJUVztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aEVhc3QgPSBlbG10UGFyZW50LmNsaWVudFdpZHRoIC0gKGVsbXRSZWN0LmxlZnQgLSBlbG10UGFyZW50UmVjdC5sZWZ0KSArIGVsbXRQYXJlbnRCTFc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heEhlaWdodFNvdXRoID0gZWxtdFBhcmVudC5jbGllbnRIZWlnaHQgLSAoZWxtdFJlY3QudG9wIC0gZWxtdFBhcmVudFJlY3QudG9wKSArIGVsbXRQYXJlbnRCVFc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoV2VzdCA9IGVsbXRSZWN0LndpZHRoICsgKGVsbXRSZWN0LmxlZnQgLSBlbG10UGFyZW50UmVjdC5sZWZ0KSAtIGVsbXRQYXJlbnRCTFc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heEhlaWdodE5vcnRoID0gZWxtdC5jbGllbnRIZWlnaHQgKyAoZWxtdFJlY3QudG9wIC0gZWxtdFBhcmVudFJlY3QudG9wKSAtIGVsbXRQYXJlbnRCVFc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIG9yaWdpbmFsIG9wdHMuY29udGFpbm1lbnQgaXMgYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5tZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aFdlc3QgLT0gY29udGFpbm1lbnRbM107XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHROb3J0aCAtPSBjb250YWlubWVudFswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoRWFzdCAtPSBjb250YWlubWVudFsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heEhlaWdodFNvdXRoIC09IGNvbnRhaW5tZW50WzJdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsY3VsYXRlIGNvcnJlY3Rpb25zIGZvciByb3RhdGVkIHBhbmVsc1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsbXQpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgd0RpZiA9IHBhcnNlRmxvYXQoY29tcHV0ZWRTdHlsZS53aWR0aCkgLSBlbG10UmVjdC53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhEaWYgPSBwYXJzZUZsb2F0KGNvbXB1dGVkU3R5bGUuaGVpZ2h0KSAtIGVsbXRSZWN0LmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHhEaWYgPSBwYXJzZUZsb2F0KGNvbXB1dGVkU3R5bGUubGVmdCkgLSBlbG10UmVjdC5sZWZ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgeURpZiA9IHBhcnNlRmxvYXQoY29tcHV0ZWRTdHlsZS50b3ApIC0gZWxtdFJlY3QudG9wO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxtdFBhcmVudCAhPT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgeERpZiArPSBlbG10UGFyZW50UmVjdC5sZWZ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgeURpZiArPSBlbG10UGFyZW50UmVjdC50b3A7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXNpemVQYW5lbCA9IGZ1bmN0aW9uIHJlc2l6ZVBhbmVsKGV2dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHJpZ2dlciByZXNpemVzdGFydGVkIG9ubHkgb25jZSBwZXIgcmVzaXplXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc2l6ZXN0YXJ0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHJlc2l6ZXN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdHMuc3RhcnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5zdGFydC5jYWxsKGVsbXQsIGVsbXQsIHsgd2lkdGg6IHN0YXJ0V2lkdGgsIGhlaWdodDogc3RhcnRIZWlnaHQgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzUGFuZWwuZnJvbnQoZWxtdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNpemVzdGFydGVkID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRyaWdnZXIgcmVzaXplIHBlcm1hbmVudGx5IHdoaWxlIHJlc2l6aW5nXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHJlc2l6ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNpemVIYW5kbGVDbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwtcmVzaXplaXQtZScpIHx8IHJlc2l6ZUhhbmRsZUNsYXNzTGlzdC5jb250YWlucygnanNQYW5lbC1yZXNpemVpdC1zZScpIHx8IHJlc2l6ZUhhbmRsZUNsYXNzTGlzdC5jb250YWlucygnanNQYW5lbC1yZXNpemVpdC1uZScpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ID0gc3RhcnRXaWR0aCArIChldnQuY2xpZW50WCB8fCBldnQudG91Y2hlc1swXS5jbGllbnRYKSAtIHN0YXJ0WCArIHdEaWY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHcgPj0gbWF4V2lkdGhFYXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcgPSBtYXhXaWR0aEVhc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3ID49IG1heFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcgPSBtYXhXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHcgPD0gbWluV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdyA9IG1pbldpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLndpZHRoID0gdyArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNpemVIYW5kbGVDbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwtcmVzaXplaXQtcycpIHx8IHJlc2l6ZUhhbmRsZUNsYXNzTGlzdC5jb250YWlucygnanNQYW5lbC1yZXNpemVpdC1zZScpIHx8IHJlc2l6ZUhhbmRsZUNsYXNzTGlzdC5jb250YWlucygnanNQYW5lbC1yZXNpemVpdC1zdycpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoID0gc3RhcnRIZWlnaHQgKyAoZXZ0LmNsaWVudFkgfHwgZXZ0LnRvdWNoZXNbMF0uY2xpZW50WSkgLSBzdGFydFkgKyBoRGlmO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoID49IG1heEhlaWdodFNvdXRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGggPSBtYXhIZWlnaHRTb3V0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGggPj0gbWF4SGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGggPSBtYXhIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChoIDw9IG1pbkhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoID0gbWluSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLmhlaWdodCA9IGggKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzaXplSGFuZGxlQ2xhc3NMaXN0LmNvbnRhaW5zKCdqc1BhbmVsLXJlc2l6ZWl0LXcnKSB8fCByZXNpemVIYW5kbGVDbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwtcmVzaXplaXQtbncnKSB8fCByZXNpemVIYW5kbGVDbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwtcmVzaXplaXQtc3cnKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdyA9IHN0YXJ0V2lkdGggKyBzdGFydFggLSAoZXZ0LmNsaWVudFggfHwgZXZ0LnRvdWNoZXNbMF0uY2xpZW50WCkgKyB3RGlmO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3IDw9IG1heFdpZHRoICYmIHcgPj0gbWluV2lkdGggJiYgdyA8PSBtYXhXaWR0aFdlc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zdHlsZS5sZWZ0ID0gc3RhcnRMZWZ0ICsgKGV2dC5jbGllbnRYIHx8IGV2dC50b3VjaGVzWzBdLmNsaWVudFgpIC0gc3RhcnRYICsgeERpZiArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3ID49IG1heFdpZHRoV2VzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ID0gbWF4V2lkdGhXZXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodyA+PSBtYXhXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ID0gbWF4V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh3IDw9IG1pbldpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcgPSBtaW5XaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zdHlsZS53aWR0aCA9IHcgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzaXplSGFuZGxlQ2xhc3NMaXN0LmNvbnRhaW5zKCdqc1BhbmVsLXJlc2l6ZWl0LW4nKSB8fCByZXNpemVIYW5kbGVDbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwtcmVzaXplaXQtbncnKSB8fCByZXNpemVIYW5kbGVDbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwtcmVzaXplaXQtbmUnKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaCA9IHN0YXJ0SGVpZ2h0ICsgc3RhcnRZIC0gKGV2dC5jbGllbnRZIHx8IGV2dC50b3VjaGVzWzBdLmNsaWVudFkpICsgaERpZjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaCA8PSBtYXhIZWlnaHQgJiYgaCA+PSBtaW5IZWlnaHQgJiYgaCA8PSBtYXhIZWlnaHROb3J0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLnRvcCA9IHN0YXJ0VG9wICsgKGV2dC5jbGllbnRZIHx8IGV2dC50b3VjaGVzWzBdLmNsaWVudFkpIC0gc3RhcnRZICsgeURpZiArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoID49IG1heEhlaWdodE5vcnRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGggPSBtYXhIZWlnaHROb3J0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGggPj0gbWF4SGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGggPSBtYXhIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChoIDw9IG1pbkhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoID0gbWluSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLmhlaWdodCA9IGggKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxtdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuY29udGVudFJlc2l6ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldCBjdXJyZW50IHBvc2l0aW9uIGFuZCBzaXplIHZhbHVlcyB3aGlsZSByZXNpemluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsbXQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBwYXJzZUZsb2F0KHN0eWxlcy5sZWZ0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHBhcnNlRmxvYXQoc3R5bGVzLnRvcCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHBhcnNlRmxvYXQoc3R5bGVzLnJpZ2h0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b206IHBhcnNlRmxvYXQoc3R5bGVzLmJvdHRvbSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHBhcnNlRmxvYXQoc3R5bGVzLndpZHRoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHBhcnNlRmxvYXQoc3R5bGVzLmhlaWdodClcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrIHdoaWxlIHJlc2l6aW5nXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdHMucmVzaXplID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5yZXNpemUuY2FsbChlbG10LCBlbG10LCB2YWx1ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIGpzUGFuZWwucG9pbnRlcm1vdmUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihpdGVtLCByZXNpemVQYW5lbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgcmVzaXplIGhhbmRsZXIgd2hlbiBtb3VzZSBsZWF2ZXMgYnJvd3NlciB3aW5kb3cgKG1vdXNlbGVhdmUgZG9lc24ndCB3b3JrKVxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUucmVsYXRlZFRhcmdldCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzUGFuZWwucG9pbnRlcm1vdmUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGl0ZW0sIHJlc2l6ZVBhbmVsLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBqc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGl0ZW0sIGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgICAgICAgICBqc1BhbmVsLnBvaW50ZXJtb3ZlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihpdGVtLCByZXNpemVQYW5lbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdCAmJiBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwtcmVzaXplaXQtaGFuZGxlJykpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgaXNMZWZ0Q2hhbmdlID0gdm9pZCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNUb3BDaGFuZ2UgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjbCA9IGUudGFyZ2V0LmNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsLm1hdGNoKC9qc1BhbmVsLXJlc2l6ZWl0LW53fGpzUGFuZWwtcmVzaXplaXQtd3xqc1BhbmVsLXJlc2l6ZWl0LXN3L2kpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0xlZnRDaGFuZ2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChjbC5tYXRjaCgvanNQYW5lbC1yZXNpemVpdC1ud3xqc1BhbmVsLXJlc2l6ZWl0LW58anNQYW5lbC1yZXNpemVpdC1uZS9pKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNUb3BDaGFuZ2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gc25hcCBwYW5lbCB0byBncmlkIChkb2Vzbid0IHdvcmsgdGhhdCB3ZWxsIGlmIGluc2lkZSBmdW5jdGlvbiByZXNpemVQYW5lbClcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuZ3JpZCAmJiBBcnJheS5pc0FycmF5KG9wdHMuZ3JpZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmdyaWQubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5ncmlkWzFdID0gb3B0cy5ncmlkWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN3ID0gcGFyc2VGbG9hdChlbG10LnN0eWxlLndpZHRoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaCA9IHBhcnNlRmxvYXQoZWxtdC5zdHlsZS5oZWlnaHQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZFcgPSBjdyAlIG9wdHMuZ3JpZFswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RIID0gY2ggJSBvcHRzLmdyaWRbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3ggPSBwYXJzZUZsb2F0KGVsbXQuc3R5bGUubGVmdCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3kgPSBwYXJzZUZsb2F0KGVsbXQuc3R5bGUudG9wKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RYID0gY3ggJSBvcHRzLmdyaWRbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kWSA9IGN5ICUgb3B0cy5ncmlkWzFdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9kVyA8IG9wdHMuZ3JpZFswXSAvIDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLndpZHRoID0gY3cgLSBtb2RXICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zdHlsZS53aWR0aCA9IGN3ICsgKG9wdHMuZ3JpZFswXSAtIG1vZFcpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb2RIIDwgb3B0cy5ncmlkWzFdIC8gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc3R5bGUuaGVpZ2h0ID0gY2ggLSBtb2RIICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zdHlsZS5oZWlnaHQgPSBjaCArIChvcHRzLmdyaWRbMV0gLSBtb2RIKSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0xlZnRDaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9kWCA8IG9wdHMuZ3JpZFswXSAvIDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zdHlsZS5sZWZ0ID0gY3ggLSBtb2RYICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLmxlZnQgPSBjeCArIChvcHRzLmdyaWRbMF0gLSBtb2RYKSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzVG9wQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vZFkgPCBvcHRzLmdyaWRbMV0gLyAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc3R5bGUudG9wID0gY3kgLSBtb2RZICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLnRvcCA9IGN5ICsgKG9wdHMuZ3JpZFsxXSAtIG1vZFkpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxtdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5jb250ZW50UmVzaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzaXplc3RhcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICBlbG10LmNvbnRlbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdpbmhlcml0JztcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChyZXNpemVzdG9wKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplc3RhcnRlZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgZWxtdC5zYXZlQ3VycmVudERpbWVuc2lvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRzLnN0b3AgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuc3RvcC5jYWxsKGVsbXQsIGVsbXQsIHsgd2lkdGg6IHBhcnNlRmxvYXQoZWxtdC5zdHlsZS53aWR0aCksIGhlaWdodDogcGFyc2VGbG9hdChlbG10LnN0eWxlLmhlaWdodCkgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZnJhbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBmcmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2luaGVyaXQnO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHJlc2l6ZWl0IGlzIGluaXRpYWxpemVkIC0gbm93IGRpc2FibGUgaWYgc2V0XG4gICAgICAgIGlmIChvcHRzLmRpc2FibGUpIHtcbiAgICAgICAgICAgIGVsbXQucXVlcnlTZWxlY3RvckFsbCgnLmpzUGFuZWwtcmVzaXplaXQtaGFuZGxlJykuZm9yRWFjaChmdW5jdGlvbiAoaGFuZGxlKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbG10O1xuICAgIH0sXG4gICAgc2V0Q2xhc3M6IGZ1bmN0aW9uIHNldENsYXNzKGVsbXQsIGNsYXNzbmFtZXMpIHtcbiAgICAgICAgY2xhc3NuYW1lcy5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBlbG10LmNsYXNzTGlzdC5hZGQoaXRlbSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZWxtdDtcbiAgICB9LFxuICAgIHJlbUNsYXNzOiBmdW5jdGlvbiByZW1DbGFzcyhlbG10LCBjbGFzc25hbWVzKSB7XG4gICAgICAgIGNsYXNzbmFtZXMuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxtdC5jbGFzc0xpc3QucmVtb3ZlKGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGVsbXQ7XG4gICAgfSxcbiAgICBzZXRTdHlsZTogZnVuY3Rpb24gc2V0U3R5bGUoZWxtdCwgc3R5bGVzb2JqZWN0KSB7XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gc3R5bGVzb2JqZWN0KSB7XG4gICAgICAgICAgICBpZiAoc3R5bGVzb2JqZWN0Lmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByb3BlcnR5ID0gU3RyaW5nKHByb3ApLnJlcGxhY2UoLy1cXHcvZ2ksIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2guc3Vic3RyKC0xKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGVsbXQuc3R5bGVbcHJvcGVydHldID0gc3R5bGVzb2JqZWN0W3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbG10O1xuICAgIH0sXG4gICAgc25hcFBhbmVsOiBmdW5jdGlvbiBzbmFwUGFuZWwocGFuZWwsIHBvcykge1xuICAgICAgICAvLyBzdG9yZSBwYW5lbCBzaXplIGJlZm9yZSBpdCBzbmFwc1xuICAgICAgICBwYW5lbC5jdXJyZW50RGF0YS5iZWZvcmVTbmFwID0ge1xuICAgICAgICAgICAgd2lkdGg6IHBhbmVsLmN1cnJlbnREYXRhLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBwYW5lbC5jdXJyZW50RGF0YS5oZWlnaHRcbiAgICAgICAgfTtcbiAgICAgICAgLy8gc25hcCBwYW5lbFxuICAgICAgICBpZiAocG9zICYmIHR5cGVvZiBwb3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHBvcy5jYWxsKHBhbmVsLCBwYW5lbCwgcGFuZWwuc25hcHBhYmxlVG8pO1xuICAgICAgICB9IGVsc2UgaWYgKHBvcyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHZhciBvZmZzZXRzID0gWzAsIDBdO1xuICAgICAgICAgICAgaWYgKHBhbmVsLm9wdGlvbnMuZHJhZ2l0LnNuYXAuY29udGFpbm1lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAocGFuZWwub3B0aW9ucy5kcmFnaXQuY29udGFpbm1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5tZW50ID0gdGhpcy5wT2NvbnRhaW5tZW50KHBhbmVsLm9wdGlvbnMuZHJhZ2l0LmNvbnRhaW5tZW50KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gcGFuZWwuc25hcHBhYmxlVG87XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbi5zdGFydHNXaXRoKCdsZWZ0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldHNbMF0gPSBjb250YWlubWVudFszXTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb3NpdGlvbi5zdGFydHNXaXRoKCdyaWdodCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXRzWzBdID0gLWNvbnRhaW5tZW50WzFdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbi5lbmRzV2l0aCgndG9wJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldHNbMV0gPSBjb250YWlubWVudFswXTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb3NpdGlvbi5lbmRzV2l0aCgnYm90dG9tJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldHNbMV0gPSAtY29udGFpbm1lbnRbMl07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYW5lbC5yZXBvc2l0aW9uKHBhbmVsLnNuYXBwYWJsZVRvICsgJyAnICsgb2Zmc2V0c1swXSArICcgJyArIG9mZnNldHNbMV0pO1xuICAgICAgICAgICAgcGFuZWwuc25hcHBlZCA9IHBhbmVsLnNuYXBwYWJsZVRvO1xuICAgICAgICB9XG4gICAgfSxcblxuXG4gICAgLy8gTUVUSE9EIENSRUFUSU5HIFRIRSBQQU5FTCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgICAgIHZhciBjYiA9IGFyZ3VtZW50c1sxXTtcblxuXG4gICAgICAgIHZhciBvcHRzID0gdm9pZCAwLFxuICAgICAgICAgICAgY2xvc2V0aW1lciA9IHZvaWQgMDtcbiAgICAgICAgaWYgKG9wdGlvbnMuY29uZmlnKSB7XG4gICAgICAgICAgICBvcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0cywgb3B0aW9ucy5jb25maWcsIG9wdGlvbnMpO1xuICAgICAgICAgICAgZGVsZXRlIG9wdHMuY29uZmlnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghb3B0cy5pZCkge1xuICAgICAgICAgICAgb3B0cy5pZCA9ICdqc1BhbmVsLScgKyAoanNQYW5lbC5pZENvdW50ZXIgKz0gMSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdHMuaWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIG9wdHMuaWQgPSBvcHRzLmlkKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChvcHRzLmlkKTtcbiAgICAgICAgaWYgKHAgIT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIGlmIGEgcGFuZWwgd2l0aCBwYXNzZWQgaWQgYWxyZWFkeSBleGlzdHMsIGZyb250IGl0IGFuZCByZXR1cm4gZXJyb3Igb2JqZWN0XG4gICAgICAgICAgICBpZiAocC5jbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwnKSkge1xuICAgICAgICAgICAgICAgIHAuZnJvbnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBqc1BhbmVsRXJyb3IoJ1xcbk5PIE5FVyBQQU5FTCBDUkVBVEVEIVxcbkFuIGVsZW1lbnQgd2l0aCB0aGUgSUQgPCcgKyBvcHRzLmlkICsgJz4gYWxyZWFkeSBleGlzdHMgaW4gdGhlIGRvY3VtZW50LicpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgY2IuY2FsbChlLCBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS5lcnJvcihlcnJvci5uYW1lICsgJzonLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIHdoZXRoZXIgY29udGFpbmVyIGlzIHZhbGlkIC0+IGlmIG5vdCByZXR1cm4gYW5kIGxvZyBlcnJvclxuICAgICAgICB2YXIgcGFuZWxDb250YWluZXIgPSB0aGlzLnBPY29udGFpbmVyKG9wdHMuY29udGFpbmVyLCBjYik7XG4gICAgICAgIGlmIChwYW5lbENvbnRhaW5lciAmJiBwYW5lbENvbnRhaW5lci5tZXNzYWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS5lcnJvcihwYW5lbENvbnRhaW5lci5uYW1lICsgJzonLCBwYW5lbENvbnRhaW5lci5tZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vcm1hbGl6ZSBtYXhpbWl6ZWRNYXJnaW5cbiAgICAgICAgb3B0cy5tYXhpbWl6ZWRNYXJnaW4gPSB0aGlzLnBPY29udGFpbm1lbnQob3B0cy5tYXhpbWl6ZWRNYXJnaW4pO1xuXG4gICAgICAgIC8vIG5vcm1hbGl6ZSBzbmFwIGNvbmZpZ1xuICAgICAgICBpZiAob3B0cy5kcmFnaXQgJiYgb3B0cy5kcmFnaXQuc25hcCkge1xuICAgICAgICAgICAgaWYgKF90eXBlb2Yob3B0cy5kcmFnaXQuc25hcCkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5kcmFnaXQuc25hcCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmYXVsdFNuYXBDb25maWcsIG9wdHMuZHJhZ2l0LnNuYXApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvcHRzLmRyYWdpdC5zbmFwID0gdGhpcy5kZWZhdWx0U25hcENvbmZpZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG9wdHMudGVtcGxhdGUgPSBvcHRzLnRlbXBsYXRlIHx8IGZhbHNlO1xuXG4gICAgICAgIHZhciBzZWxmID0gb3B0cy50ZW1wbGF0ZSA/IG9wdHMudGVtcGxhdGUgOiB0aGlzLmNyZWF0ZVBhbmVsVGVtcGxhdGUoKTtcblxuICAgICAgICAvLyBQcm9wZXJ0aWVzXG4gICAgICAgIHNlbGYub3B0aW9ucyA9IG9wdHM7XG4gICAgICAgIHNlbGYuc3RhdHVzID0gJ2luaXRpYWxpemVkJztcbiAgICAgICAgc2VsZi5jdXJyZW50RGF0YSA9IHt9O1xuICAgICAgICBzZWxmLmhlYWRlciA9IHNlbGYucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtaGRyJyk7IC8vIGNvbXBsZXRlIGhlYWRlciBzZWN0aW9uXG4gICAgICAgIHNlbGYuaGVhZGVyYmFyID0gc2VsZi5oZWFkZXIucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtaGVhZGVyYmFyJyk7IC8vIGxvZywgdGl0bGUgYW5kIGNvbnRyb2xzXG4gICAgICAgIHNlbGYudGl0bGViYXIgPSBzZWxmLmhlYWRlci5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC10aXRsZWJhcicpOyAvLyBkaXYgc3Vycm91bmRpbmcgdGl0bGUgaDNcbiAgICAgICAgc2VsZi5oZWFkZXJsb2dvID0gc2VsZi5oZWFkZXJiYXIucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtaGVhZGVybG9nbycpOyAvLyBsb2dvIG9ubHlcbiAgICAgICAgc2VsZi5oZWFkZXJ0aXRsZSA9IHNlbGYuaGVhZGVyYmFyLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLXRpdGxlJyk7IC8vIHRpdGxlIGgzXG4gICAgICAgIHNlbGYuY29udHJvbGJhciA9IHNlbGYuaGVhZGVyYmFyLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWNvbnRyb2xiYXInKTsgLy8gZGl2IHN1cnJvdW5kaW5nIGFsbCBjb250cm9sc1xuICAgICAgICBzZWxmLmhlYWRlcnRvb2xiYXIgPSBzZWxmLmhlYWRlci5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1oZHItdG9vbGJhcicpO1xuICAgICAgICBzZWxmLmNvbnRlbnQgPSBzZWxmLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWNvbnRlbnQnKTtcbiAgICAgICAgc2VsZi5mb290ZXIgPSBzZWxmLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWZ0cicpO1xuICAgICAgICBzZWxmLnNuYXBwYWJsZVRvID0gZmFsc2U7XG4gICAgICAgIHNlbGYuc25hcHBlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIEV2ZW50c1xuICAgICAgICB2YXIganNwYW5lbGxvYWRlZCA9IG5ldyBDdXN0b21FdmVudCgnanNwYW5lbGxvYWRlZCcsIHsgJ2RldGFpbCc6IG9wdHMuaWQgfSksXG4gICAgICAgICAgICBqc3BhbmVsYmVmb3JlY2xvc2UgPSBuZXcgQ3VzdG9tRXZlbnQoJ2pzcGFuZWxiZWZvcmVjbG9zZScsIHsgJ2RldGFpbCc6IG9wdHMuaWQgfSksXG4gICAgICAgICAgICBqc3BhbmVsY2xvc2VkID0gbmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVsY2xvc2VkJywgeyAnZGV0YWlsJzogb3B0cy5pZCB9KSxcbiAgICAgICAgICAgIGpzcGFuZWxzdGF0dXNjaGFuZ2UgPSBuZXcgQ3VzdG9tRXZlbnQoJ2pzcGFuZWxzdGF0dXNjaGFuZ2UnLCB7ICdkZXRhaWwnOiBvcHRzLmlkIH0pLFxuICAgICAgICAgICAganNwYW5lbGJlZm9yZW5vcm1hbGl6ZSA9IG5ldyBDdXN0b21FdmVudCgnanNwYW5lbGJlZm9yZW5vcm1hbGl6ZScsIHsgJ2RldGFpbCc6IG9wdHMuaWQgfSksXG4gICAgICAgICAgICBqc3BhbmVsbm9ybWFsaXplZCA9IG5ldyBDdXN0b21FdmVudCgnanNwYW5lbG5vcm1hbGl6ZWQnLCB7ICdkZXRhaWwnOiBvcHRzLmlkIH0pLFxuICAgICAgICAgICAganNwYW5lbGJlZm9yZW1heGltaXplID0gbmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVsYmVmb3JlbWF4aW1pemUnLCB7ICdkZXRhaWwnOiBvcHRzLmlkIH0pLFxuICAgICAgICAgICAganNwYW5lbG1heGltaXplZCA9IG5ldyBDdXN0b21FdmVudCgnanNwYW5lbG1heGltaXplZCcsIHsgJ2RldGFpbCc6IG9wdHMuaWQgfSksXG4gICAgICAgICAgICBqc3BhbmVsYmVmb3JlbWluaW1pemUgPSBuZXcgQ3VzdG9tRXZlbnQoJ2pzcGFuZWxiZWZvcmVtaW5pbWl6ZScsIHsgJ2RldGFpbCc6IG9wdHMuaWQgfSksXG4gICAgICAgICAgICBqc3BhbmVsbWluaW1pemVkID0gbmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVsbWluaW1pemVkJywgeyAnZGV0YWlsJzogb3B0cy5pZCB9KSxcbiAgICAgICAgICAgIGpzcGFuZWxiZWZvcmVzbWFsbGlmeSA9IG5ldyBDdXN0b21FdmVudCgnanNwYW5lbGJlZm9yZXNtYWxsaWZ5JywgeyAnZGV0YWlsJzogb3B0cy5pZCB9KSxcbiAgICAgICAgICAgIGpzcGFuZWxzbWFsbGlmaWVkID0gbmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVsc21hbGxpZmllZCcsIHsgJ2RldGFpbCc6IG9wdHMuaWQgfSksXG4gICAgICAgICAgICBqc3BhbmVsc21hbGxpZmllZG1heCA9IG5ldyBDdXN0b21FdmVudCgnanNwYW5lbHNtYWxsaWZpZWRtYXgnLCB7ICdkZXRhaWwnOiBvcHRzLmlkIH0pLFxuICAgICAgICAgICAganNwYW5lbGJlZm9yZXVuc21hbGxpZnkgPSBuZXcgQ3VzdG9tRXZlbnQoJ2pzcGFuZWxiZWZvcmV1bnNtYWxsaWZ5JywgeyAnZGV0YWlsJzogb3B0cy5pZCB9KSxcbiAgICAgICAgICAgIGpzcGFuZWxmcm9udGVkID0gbmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVsZnJvbnRlZCcsIHsgJ2RldGFpbCc6IG9wdHMuaWQgfSk7XG5cbiAgICAgICAgLy8gY29udHJvbHMgaGFuZGxlcnNcbiAgICAgICAgdmFyIGhhc0Nsb3NlQnRuID0gc2VsZi5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1idG4tY2xvc2UnKSxcbiAgICAgICAgICAgIGhhc01heEJ0biA9IHNlbGYucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtYnRuLW1heGltaXplJyksXG4gICAgICAgICAgICBoYXNOb3JtQnRuID0gc2VsZi5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1idG4tbm9ybWFsaXplJyksXG4gICAgICAgICAgICBoYXNTbWFsbEJ0biA9IHNlbGYucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtYnRuLXNtYWxsaWZ5JyksXG4gICAgICAgICAgICBoYXNTbWFsbHJldkJ0biA9IHNlbGYucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtYnRuLXNtYWxsaWZ5cmV2JyksXG4gICAgICAgICAgICBoYXNNaW5CdG4gPSBzZWxmLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWJ0bi1taW5pbWl6ZScpO1xuXG4gICAgICAgIGlmIChoYXNDbG9zZUJ0bikge1xuICAgICAgICAgICAganNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGhhc0Nsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoaXRlbSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzTWF4QnRuKSB7XG4gICAgICAgICAgICBqc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgaGFzTWF4QnRuLmFkZEV2ZW50TGlzdGVuZXIoaXRlbSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm1heGltaXplKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzTm9ybUJ0bikge1xuICAgICAgICAgICAganNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGhhc05vcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcihpdGVtLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubm9ybWFsaXplKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzU21hbGxCdG4pIHtcbiAgICAgICAgICAgIGpzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBoYXNTbWFsbEJ0bi5hZGRFdmVudExpc3RlbmVyKGl0ZW0sIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zbWFsbGlmeSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc1NtYWxscmV2QnRuKSB7XG4gICAgICAgICAgICBqc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgaGFzU21hbGxyZXZCdG4uYWRkRXZlbnRMaXN0ZW5lcihpdGVtLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudW5zbWFsbGlmeSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc01pbkJ0bikge1xuICAgICAgICAgICAganNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGhhc01pbkJ0bi5hZGRFdmVudExpc3RlbmVyKGl0ZW0sIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5taW5pbWl6ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpbXBvcnQgZXh0ZW5zaW9uc1xuICAgICAgICB2YXIgZXh0ZW5zaW9ucyA9IGpzUGFuZWwuZXh0ZW5zaW9ucztcbiAgICAgICAgZm9yICh2YXIgZXh0IGluIGV4dGVuc2lvbnMpIHtcbiAgICAgICAgICAgIGlmIChleHRlbnNpb25zLmhhc093blByb3BlcnR5KGV4dCkpIHtcbiAgICAgICAgICAgICAgICBzZWxmW2V4dF0gPSBleHRlbnNpb25zW2V4dF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBNZXRob2RzXG4gICAgICAgIHNlbGYuYWRkVG9vbGJhciA9IGZ1bmN0aW9uIChwbGFjZSwgdGIsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAocGxhY2UgPT09ICdoZWFkZXInKSB7XG4gICAgICAgICAgICAgICAgcGxhY2UgPSBzZWxmLmhlYWRlcnRvb2xiYXI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBsYWNlID09PSAnZm9vdGVyJykge1xuICAgICAgICAgICAgICAgIHBsYWNlID0gc2VsZi5mb290ZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcGxhY2UuaW5uZXJIVE1MID0gdGI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodGIpKSB7XG4gICAgICAgICAgICAgICAgdGIuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZS5pbm5lckhUTUwgKz0gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlLmFwcGVuZChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG9vbCA9IHRiLmNhbGwoc2VsZiwgc2VsZik7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0b29sID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBwbGFjZS5pbm5lckhUTUwgPSB0b29sO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlLmFwcGVuZCh0b29sKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBsYWNlLmFwcGVuZCh0Yik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBsYWNlLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgaWYgKHBsYWNlID09PSBzZWxmLmZvb3Rlcikge1xuICAgICAgICAgICAgICAgIHNlbGYuY29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdqc1BhbmVsLWNvbnRlbnQtbm9mb290ZXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuY29udGVudFJlc2l6ZSgpO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuYXBwbHlCdWlsdEluVGhlbWUgPSBmdW5jdGlvbiAodGhlbWVEZXRhaWxzKSB7XG4gICAgICAgICAgICBzZWxmLmNsYXNzTGlzdC5hZGQoJ2pzUGFuZWwtdGhlbWUtJyArIHRoZW1lRGV0YWlscy5jb2xvcik7IC8vIGRvIG5vdCByZW1vdmUgdGhlbWUgZnJvbSBqc1BcbiAgICAgICAgICAgIHNlbGYuaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2pzUGFuZWwtdGhlbWUtJyArIHRoZW1lRGV0YWlscy5jb2xvcik7XG5cbiAgICAgICAgICAgIC8vIG9wdGlvbmFsbHkgc2V0IHRoZW1lIGZpbGxpbmdcbiAgICAgICAgICAgIGlmICh0aGVtZURldGFpbHMuZmlsbGluZykge1xuICAgICAgICAgICAgICAgIHNlbGYuY29udGVudC5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgICAgICAgICAgICAgc2VsZi5jb250ZW50LmNsYXNzTGlzdC5hZGQoJ2pzUGFuZWwtY29udGVudC0nICsgdGhlbWVEZXRhaWxzLmZpbGxpbmcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIW9wdHMuaGVhZGVyVG9vbGJhcikge1xuICAgICAgICAgICAgICAgIHNlbGYuY29udGVudC5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgICAgICAgICAgICAgc2VsZi5jb250ZW50LnN0eWxlLmJvcmRlclRvcCA9ICcxcHggc29saWQgJyArIHNlbGYuaGVhZGVydGl0bGUuc3R5bGUuY29sb3I7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuYXBwbHlBcmJpdHJhcnlUaGVtZSA9IGZ1bmN0aW9uICh0aGVtZURldGFpbHMpIHtcbiAgICAgICAgICAgIHNlbGYuaGVhZGVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoZW1lRGV0YWlscy5jb2xvcnNbMF07XG4gICAgICAgICAgICBbJy5qc1BhbmVsLWhlYWRlcmxvZ28nLCAnLmpzUGFuZWwtdGl0bGUnLCAnLmpzUGFuZWwtaGRyLXRvb2xiYXInXS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5xdWVyeVNlbGVjdG9yKGl0ZW0pLnN0eWxlLmNvbG9yID0gdGhlbWVEZXRhaWxzLmNvbG9yc1szXTtcbiAgICAgICAgICAgIH0sIHNlbGYpO1xuICAgICAgICAgICAgc2VsZi5xdWVyeVNlbGVjdG9yQWxsKCcuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0biAuanNnbHlwaCcpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLmNvbG9yID0gdGhlbWVEZXRhaWxzLmNvbG9yc1szXTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAob3B0cy5oZWFkZXJUb29sYmFyKSB7XG4gICAgICAgICAgICAgICAganNQYW5lbC5zZXRTdHlsZShzZWxmLmhlYWRlcnRvb2xiYXIsIHtcbiAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiAnMCAwIDFweCAnICsgdGhlbWVEZXRhaWxzLmNvbG9yc1szXSArICcgaW5zZXQnLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogJ2NhbGMoMTAwJSArIDRweCknLFxuICAgICAgICAgICAgICAgICAgICBtYXJnaW5MZWZ0OiAnLTFweCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jb250ZW50LnN0eWxlLmJvcmRlclRvcCA9ICcxcHggc29saWQgJyArIHRoZW1lRGV0YWlscy5jb2xvcnNbM107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGVtZURldGFpbHMuZmlsbGluZyA9PT0gJ2ZpbGxlZCcpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmNvbnRlbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhlbWVEZXRhaWxzLmNvbG9yc1swXTtcbiAgICAgICAgICAgICAgICBzZWxmLmNvbnRlbnQuc3R5bGUuY29sb3IgPSB0aGVtZURldGFpbHMuY29sb3JzWzNdO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGVtZURldGFpbHMuZmlsbGluZyA9PT0gJ2ZpbGxlZGxpZ2h0Jykge1xuICAgICAgICAgICAgICAgIHNlbGYuY29udGVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGVtZURldGFpbHMuY29sb3JzWzFdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLmFwcGx5Qm9vdHN0cmFwVGhlbWUgPSBmdW5jdGlvbiAodGhlbWVEZXRhaWxzKSB7XG4gICAgICAgICAgICB2YXIgYnNUaGVtZSA9IHRoZW1lRGV0YWlscy5ic3RoZW1lLFxuICAgICAgICAgICAgICAgIGJzVmVyc2lvbiA9ICQuZm4uYnV0dG9uLkNvbnN0cnVjdG9yLlZFUlNJT05bMF07XG5cbiAgICAgICAgICAgIGlmIChic1ZlcnNpb24gPT09ICc0Jykge1xuICAgICAgICAgICAgICAgIHNlbGYuY2xhc3NMaXN0LmFkZCgnYmctJyArIGJzVGhlbWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBbJ3BhbmVsJywgJ3BhbmVsLScgKyBic1RoZW1lXS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2xhc3NMaXN0LmFkZChpdGVtKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWRlci5jbGFzc0xpc3QuYWRkKCdwYW5lbC1oZWFkaW5nJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFkZGVkIHN1cHBvcnQgZm9yIG1hdGVyaWFsLWRlc2lnbi1mb3ItYm9vdHN0cmFwIDQueCBjb2xvcnNcbiAgICAgICAgICAgIGlmICh0aGVtZURldGFpbHMuYnMgPT09ICdtZGInKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1kYkNvbG9yID0gYnNUaGVtZSArICctY29sb3InO1xuICAgICAgICAgICAgICAgIGlmICh0aGVtZURldGFpbHMubWRiU3R5bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbWRiQ29sb3IgPSBtZGJDb2xvciArICctZGFyayc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYuY2xhc3NMaXN0LmFkZChtZGJDb2xvcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGdldCBwcmltYXJ5IHRoZW1lIGNvbG9yXG4gICAgICAgICAgICB2YXIgcENvbG9yID0gdm9pZCAwO1xuICAgICAgICAgICAgaWYgKGJzVmVyc2lvbiA9PT0gJzQnKSB7XG4gICAgICAgICAgICAgICAgcENvbG9yID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoc2VsZikuYmFja2dyb3VuZENvbG9yLnJlcGxhY2UoL1xccysvZywgJycpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwQ29sb3IgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzZWxmLmhlYWRlcikuYmFja2dyb3VuZENvbG9yLnJlcGxhY2UoL1xccysvZywgJycpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhlbWVEZXRhaWxzLmZpbGxpbmcpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNldFRoZW1lKHBDb2xvciArICcgJyArIHRoZW1lRGV0YWlscy5maWxsaW5nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXRUaGVtZShwQ29sb3IpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLmFwcGx5VGhlbWVCb3JkZXIgPSBmdW5jdGlvbiAodGhlbWVEZXRhaWxzKSB7XG4gICAgICAgICAgICB2YXIgYm9yZGVydmFsdWVzID0gb3B0cy5ib3JkZXIuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgIHNlbGYuc3R5bGUuYm9yZGVyV2lkdGggPSBib3JkZXJ2YWx1ZXNbMF07XG4gICAgICAgICAgICBzZWxmLnN0eWxlLmJvcmRlclN0eWxlID0gYm9yZGVydmFsdWVzWzFdO1xuICAgICAgICAgICAgc2VsZi5zdHlsZS5ib3JkZXJDb2xvciA9IGJvcmRlcnZhbHVlc1syXTtcbiAgICAgICAgICAgIHNlbGYuaGVhZGVyLnN0eWxlLmJvcmRlclRvcExlZnRSYWRpdXMgPSAnMXB4JztcbiAgICAgICAgICAgIHNlbGYuaGVhZGVyLnN0eWxlLmJvcmRlclRvcFJpZ2h0UmFkaXVzID0gJzFweCc7XG4gICAgICAgICAgICBpZiAoIXRoZW1lRGV0YWlscy5icykge1xuICAgICAgICAgICAgICAgIGlmIChqc1BhbmVsLnRoZW1lcy5pbmRleE9mKHRoZW1lRGV0YWlscy5jb2xvcikgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGFyYml0cmFyeSB0aGVtZXMgb25seSAoZm9yIGJ1aWx0LWluIHRoZW1lcyBpdCdzIHRha2VuIGZyb20gdGhlIGNzcyBmaWxlKVxuICAgICAgICAgICAgICAgICAgICBib3JkZXJ2YWx1ZXNbMl0gPyBzZWxmLnN0eWxlLmJvcmRlckNvbG9yID0gYm9yZGVydmFsdWVzWzJdIDogc2VsZi5zdHlsZS5ib3JkZXJDb2xvciA9IHRoZW1lRGV0YWlscy5jb2xvcnNbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBib290c3RyYXBcbiAgICAgICAgICAgICAgICB2YXIgcENvbG9yID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzZWxmLmhlYWRlcikuYmFja2dyb3VuZENvbG9yID09PSAndHJhbnNwYXJlbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHBDb2xvciA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNlbGYpLmJhY2tncm91bmRDb2xvci5yZXBsYWNlKC9cXHMrL2csICcnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwQ29sb3IgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzZWxmLmhlYWRlcikuYmFja2dyb3VuZENvbG9yLnJlcGxhY2UoL1xccysvZywgJycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBib3JkZXJ2YWx1ZXNbMl0gPyBzZWxmLnN0eWxlLmJvcmRlckNvbG9yID0gYm9yZGVydmFsdWVzWzJdIDogc2VsZi5zdHlsZS5ib3JkZXJDb2xvciA9IHBDb2xvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuYXV0b3Bvc2l0aW9uUmVtYWluaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGF1dG9Qb3MgPSB2b2lkIDA7XG4gICAgICAgICAgICBbJ2xlZnQtdG9wLWRvd24nLCAnbGVmdC10b3AtcmlnaHQnLCAnY2VudGVyLXRvcC1kb3duJywgJ3JpZ2h0LXRvcC1kb3duJywgJ3JpZ2h0LXRvcC1sZWZ0JywgJ2xlZnQtYm90dG9tLXVwJywgJ2xlZnQtYm90dG9tLXJpZ2h0JywgJ2NlbnRlci1ib3R0b20tdXAnLCAncmlnaHQtYm90dG9tLXVwJywgJ3JpZ2h0LWJvdHRvbS1sZWZ0J10uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLmNsYXNzTGlzdC5jb250YWlucyhpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICBhdXRvUG9zID0gaXRlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChhdXRvUG9zKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLicgKyBhdXRvUG9zKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ucmVwb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuY2FsY1NpemVGYWN0b3JzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNlbGYpO1xuICAgICAgICAgICAgaWYgKG9wdHMuY29udGFpbmVyID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oZiA9IHBhcnNlRmxvYXQoc2VsZi5zdHlsZS5sZWZ0KSAvIChkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoIC0gcGFyc2VGbG9hdChzZWxmLnN0eWxlLndpZHRoKSk7XG4gICAgICAgICAgICAgICAgc2VsZi52ZiA9IHBhcnNlRmxvYXQoc2VsZi5zdHlsZS50b3ApIC8gKHdpbmRvdy5pbm5lckhlaWdodCAtIHBhcnNlRmxvYXQoc3R5bGVzLmhlaWdodCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50U3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoc2VsZi5wYXJlbnRFbGVtZW50KTtcbiAgICAgICAgICAgICAgICBzZWxmLmhmID0gcGFyc2VGbG9hdChzZWxmLnN0eWxlLmxlZnQpIC8gKHBhcnNlRmxvYXQocGFyZW50U3R5bGVzLndpZHRoKSAtIHBhcnNlRmxvYXQoc2VsZi5zdHlsZS53aWR0aCkpO1xuICAgICAgICAgICAgICAgIHNlbGYudmYgPSBwYXJzZUZsb2F0KHNlbGYuc3R5bGUudG9wKSAvIChwYXJzZUZsb2F0KHBhcmVudFN0eWxlcy5oZWlnaHQpIC0gcGFyc2VGbG9hdChzdHlsZXMuaGVpZ2h0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5jbGVhclRoZW1lID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBqc1BhbmVsLnRoZW1lcy5jb25jYXQoanNQYW5lbC5tZGJ0aGVtZXMpLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgWydwYW5lbCcsICdqc1BhbmVsLXRoZW1lLScgKyB2YWx1ZSwgJ3BhbmVsLScgKyB2YWx1ZSwgdmFsdWUgKyAnLWNvbG9yJ10uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNsYXNzTGlzdC5yZW1vdmUoaXRlbSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgncGFuZWwtaGVhZGluZycsICdqc1BhbmVsLXRoZW1lLScgKyB2YWx1ZSk7XG4gICAgICAgICAgICB9LCBzZWxmKTtcbiAgICAgICAgICAgIHNlbGYuaGVhZGVydGl0bGUuY2xhc3NMaXN0LnJlbW92ZSgncGFuZWwtdGl0bGUnKTtcbiAgICAgICAgICAgIHNlbGYuY29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdwYW5lbC1ib2R5JywgJ2pzUGFuZWwtY29udGVudC1maWxsZWQnLCAnanNQYW5lbC1jb250ZW50LWZpbGxlZGxpZ2h0Jyk7XG4gICAgICAgICAgICBzZWxmLmZvb3Rlci5jbGFzc0xpc3QucmVtb3ZlKCdwYW5lbC1mb290ZXInKTtcbiAgICAgICAgICAgIGpzUGFuZWwuc2V0U3R5bGUoc2VsZiwgeyBiYWNrZ3JvdW5kQ29sb3I6ICcnLCBib3JkZXJXaWR0aDogJycsIGJvcmRlclN0eWxlOiAnJywgYm9yZGVyQ29sb3I6ICcnIH0pO1xuICAgICAgICAgICAganNQYW5lbC5zZXRTdHlsZShzZWxmLmNvbnRlbnQsIHsgYmFja2dyb3VuZDogJycsIGJvcmRlcjogJycgfSk7XG4gICAgICAgICAgICBqc1BhbmVsLnNldFN0eWxlKHNlbGYuaGVhZGVydG9vbGJhciwgeyBib3hTaGFkb3c6ICcnLCB3aWR0aDogJycsIG1hcmdpbkxlZnQ6ICcnIH0pO1xuICAgICAgICAgICAgc2VsZi5oZWFkZXIuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoc2VsZi5jb250cm9sYmFyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qc2dseXBoJykpLmNvbmNhdChbc2VsZi5oZWFkZXJsb2dvLCBzZWxmLmhlYWRlcnRpdGxlLCBzZWxmLmhlYWRlcnRvb2xiYXIsIHNlbGYuY29udGVudF0pLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLmNvbG9yID0gJyc7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuY2xvc2UgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblxuICAgICAgICAgICAgdmFyIGRvQ2xvc2UgPSBmdW5jdGlvbiBkb0Nsb3NlKCkge1xuICAgICAgICAgICAgICAgIHZhciBwYW5lbElkID0gb3B0cy5pZDtcblxuICAgICAgICAgICAgICAgIGlmIChjbG9zZXRpbWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoY2xvc2V0aW1lcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2VsZi5jbG9zZUNoaWxkcGFuZWxzKCk7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2VsZik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHJldHVybiBmYWxzZSBpZiBwYW5lbCB3YXMgbm90IHJlbW92ZWQgZnJvbSBkb21cbiAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFuZWxJZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLnJlbW92ZU1pbmltaXplZFJlcGxhY2VtZW50KCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsY2xvc2VkKTtcblxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHBhbmVsSWQsIHBhbmVsSWQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChvcHRzLm9uY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdHMub25jbG9zZWQuY2FsbChwYW5lbElkLCBwYW5lbElkKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBpZiBwYW5lbCBpcyBhdXRvcG9zaXRpb25lZCByZXBvc2l0aW9uIHJlbWFpbmluZyBhdXRvcG9zaXRpb25lZCBwYW5lbHNcbiAgICAgICAgICAgICAgICBzZWxmLmF1dG9wb3NpdGlvblJlbWFpbmluZygpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsYmVmb3JlY2xvc2UpO1xuXG4gICAgICAgICAgICBpZiAob3B0cy5vbmJlZm9yZWNsb3NlICYmIG9wdHMub25iZWZvcmVjbG9zZS5jYWxsKHNlbGYsIHNlbGYpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3B0cy5hbmltYXRlT3V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMuYW5pbWF0ZUluKSB7XG4gICAgICAgICAgICAgICAgICAgIGpzUGFuZWwucmVtQ2xhc3Moc2VsZiwgb3B0cy5hbmltYXRlSW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBqc1BhbmVsLnNldENsYXNzKHNlbGYsIG9wdHMuYW5pbWF0ZU91dCk7XG4gICAgICAgICAgICAgICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9DbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuY2xvc2VDaGlsZHBhbmVscyA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgc2VsZi5nZXRDaGlsZHBhbmVscygpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5jbG9zZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5jb250ZW50UmVtb3ZlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBqc1BhbmVsLmVtcHR5Tm9kZShzZWxmLmNvbnRlbnQpO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuY29udGVudFJlc2l6ZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIHBhbmVsU3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoc2VsZiksXG4gICAgICAgICAgICAgICAgaGRyU3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoc2VsZi5oZWFkZXIpLFxuICAgICAgICAgICAgICAgIGZ0clN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNlbGYuZm9vdGVyKSxcbiAgICAgICAgICAgICAgICBoZHJIZWlnaHQgPSAhb3B0cy5oZWFkZXJSZW1vdmUgPyBoZHJTdHlsZXMuaGVpZ2h0IDogMCxcbiAgICAgICAgICAgICAgICBmdHJIZWlnaHQgPSBmdHJTdHlsZXMuZGlzcGxheSA9PT0gJ25vbmUnID8gMCA6IGZ0clN0eWxlcy5oZWlnaHQ7XG4gICAgICAgICAgICB2YXIgY29udGVudEhlaWdodCA9IHBhcnNlRmxvYXQocGFuZWxTdHlsZXMuaGVpZ2h0KSAtIHBhcnNlRmxvYXQoaGRySGVpZ2h0KSAtIHBhcnNlRmxvYXQoZnRySGVpZ2h0KSAtIHBhcnNlRmxvYXQocGFuZWxTdHlsZXMuYm9yZGVyVG9wV2lkdGgpIC0gcGFyc2VGbG9hdChwYW5lbFN0eWxlcy5ib3JkZXJCb3R0b21XaWR0aCk7XG4gICAgICAgICAgICBzZWxmLmNvbnRlbnQuc3R5bGUuaGVpZ2h0ID0gY29udGVudEhlaWdodCArICdweCc7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5jcmVhdGVNaW5pbWl6ZWRSZXBsYWNlbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB0cGwgPSBqc1BhbmVsLmNyZWF0ZU1pbmltaXplZFRlbXBsYXRlKCksXG4gICAgICAgICAgICAgICAgY29sb3IgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzZWxmLmhlYWRlcnRpdGxlKS5jb2xvcixcbiAgICAgICAgICAgICAgICBmb250ID0gb3B0cy5pY29uZm9udCxcbiAgICAgICAgICAgICAgICBjb250cm9sYmFyID0gdHBsLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWNvbnRyb2xiYXInKTtcblxuICAgICAgICAgICAgdHBsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNlbGYuaGVhZGVyKS5iYWNrZ3JvdW5kQ29sb3IgPT09ICd0cmFuc3BhcmVudCcgPyB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzZWxmKS5iYWNrZ3JvdW5kQ29sb3IgOiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzZWxmLmhlYWRlcikuYmFja2dyb3VuZENvbG9yO1xuICAgICAgICAgICAgdHBsLmlkID0gc2VsZi5pZCArICctbWluJztcbiAgICAgICAgICAgIHRwbC5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1oZWFkZXJiYXInKS5yZXBsYWNlQ2hpbGQoc2VsZi5oZWFkZXJsb2dvLmNsb25lTm9kZSh0cnVlKSwgdHBsLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWhlYWRlcmxvZ28nKSk7XG4gICAgICAgICAgICB0cGwucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtdGl0bGViYXInKS5yZXBsYWNlQ2hpbGQoc2VsZi5oZWFkZXJ0aXRsZS5jbG9uZU5vZGUodHJ1ZSksIHRwbC5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC10aXRsZScpKTtcbiAgICAgICAgICAgIHRwbC5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC10aXRsZScpLnN0eWxlLmNvbG9yID0gY29sb3I7XG4gICAgICAgICAgICBjb250cm9sYmFyLnN0eWxlLmNvbG9yID0gY29sb3I7XG5cbiAgICAgICAgICAgIC8vIHNldCBpY29uZm9udFxuICAgICAgICAgICAgc2VsZi5zZXRJY29uZm9udChmb250LCB0cGwpO1xuXG4gICAgICAgICAgICBpZiAoc2VsZi5kYXRhc2V0LmJ0bm5vcm1hbGl6ZSA9PT0gJ2VuYWJsZWQnKSB7XG4gICAgICAgICAgICAgICAganNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRwbC5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1idG4tbm9ybWFsaXplJykuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubm9ybWFsaXplKCkucmVtb3ZlTWluaW1pemVkUmVwbGFjZW1lbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xiYXIucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2VsZi5kYXRhc2V0LmJ0bm1heGltaXplID09PSAnZW5hYmxlZCcpIHtcbiAgICAgICAgICAgICAgICBqc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdHBsLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWJ0bi1tYXhpbWl6ZScpLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm1heGltaXplKCkucmVtb3ZlTWluaW1pemVkUmVwbGFjZW1lbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xiYXIucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtYnRuLW1heGltaXplJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZWxmLmRhdGFzZXQuYnRuY2xvc2UgPT09ICdlbmFibGVkJykge1xuICAgICAgICAgICAgICAgIGpzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAgICAgICAgICAgICB0cGwucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtYnRuLWNsb3NlJykuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlTWluaW1pemVkUmVwbGFjZW1lbnQoKS5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udHJvbGJhci5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1idG4tY2xvc2UnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHBsO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuZnJvbnQgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGpzUGFuZWwuZnJvbnQoc2VsZik7XG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGpzcGFuZWxmcm9udGVkKTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2VsZiwgc2VsZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0cy5vbmZyb250ZWQpIHtcbiAgICAgICAgICAgICAgICBvcHRzLm9uZnJvbnRlZC5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5nZXRDaGlsZHBhbmVscyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChzZWxmLmNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzUGFuZWwnKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5nZXRUaGVtZURldGFpbHMgPSBmdW5jdGlvbiAodGgpIHtcbiAgICAgICAgICAgIHZhciBwYXNzZWRUaGVtZSA9IHRoLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvIC9nLCAnJyksXG4gICAgICAgICAgICAgICAgdGhlbWUgPSB7IGNvbG9yOiBmYWxzZSwgY29sb3JzOiBmYWxzZSwgZmlsbGluZzogZmFsc2UsIGJzOiBmYWxzZSwgYnN0aGVtZTogZmFsc2UgfTtcblxuICAgICAgICAgICAgaWYgKHBhc3NlZFRoZW1lLnN1YnN0cigtNiwgNikgPT09ICdmaWxsZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhlbWUuZmlsbGluZyA9ICdmaWxsZWQnO1xuICAgICAgICAgICAgICAgIHRoZW1lLmNvbG9yID0gcGFzc2VkVGhlbWUuc3Vic3RyKDAsIHBhc3NlZFRoZW1lLmxlbmd0aCAtIDYpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXNzZWRUaGVtZS5zdWJzdHIoLTExLCAxMSkgPT09ICdmaWxsZWRsaWdodCcpIHtcbiAgICAgICAgICAgICAgICB0aGVtZS5maWxsaW5nID0gJ2ZpbGxlZGxpZ2h0JztcbiAgICAgICAgICAgICAgICB0aGVtZS5jb2xvciA9IHBhc3NlZFRoZW1lLnN1YnN0cigwLCBwYXNzZWRUaGVtZS5sZW5ndGggLSAxMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoZW1lLmZpbGxpbmcgPSAnJztcbiAgICAgICAgICAgICAgICB0aGVtZS5jb2xvciA9IHBhc3NlZFRoZW1lOyAvLyB0aGVtZURldGFpbHMuY29sb3IgaXMgdGhlIHByaW1hcnkgY29sb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoZW1lLmNvbG9ycyA9IGpzUGFuZWwuY2FsY0NvbG9ycyh0aGVtZS5jb2xvcik7XG5cbiAgICAgICAgICAgIC8vIGlmIGZpcnN0IHBhcnQgb2YgdGhlbWUgaW5jbHVkZXMgYSBcIi1cIiBpdCdzIGFzc3VtZWQgdG8gYmUgYSBib290c3RyYXAgdGhlbWVcbiAgICAgICAgICAgIGlmICh0aGVtZS5jb2xvci5tYXRjaCgnLScpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJzVmFyaWFudCA9IHRoZW1lLmNvbG9yLnNwbGl0KCctJyk7XG4gICAgICAgICAgICAgICAgdGhlbWUuYnMgPSBic1ZhcmlhbnRbMF07XG4gICAgICAgICAgICAgICAgdGhlbWUuYnN0aGVtZSA9IGJzVmFyaWFudFsxXTtcbiAgICAgICAgICAgICAgICB0aGVtZS5tZGJTdHlsZSA9IGJzVmFyaWFudFsyXSB8fCB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGVtZTtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLmlzQ2hpbGRwYW5lbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIGlmIHBhbmVsIGlzIGNoaWxkcGFuZWwgb2YgYW5vdGhlciBwYW5lbCByZXR1cm5zIHBhcmVudHBhbmVsXG4gICAgICAgICAgICB2YXIgcHAgPSBzZWxmLmNsb3Nlc3QoJy5qc1BhbmVsLWNvbnRlbnQnKTtcbiAgICAgICAgICAgIHJldHVybiBwcCA/IHBwLnBhcmVudE5vZGUgOiBmYWxzZTtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLm1heGltaXplID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAvLyBOb3RlOiBkbyBub3QgZGlzYWJsZSBtYXhpbWl6ZSBtZXRob2QgZm9yIGFscmVhZHkgbWF4aW1pemVkIHBhbmVscyAtPiBvbndpbmRvd3Jlc2l6ZSB3b3VsZG4ndCB3b3JrXG4gICAgICAgICAgICBpZiAob3B0cy5vbmJlZm9yZW1heGltaXplICYmIG9wdHMub25iZWZvcmVtYXhpbWl6ZS5jYWxsKHNlbGYsIHNlbGYpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGpzcGFuZWxiZWZvcmVtYXhpbWl6ZSk7XG5cbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSBzZWxmLnBhcmVudE5vZGUsXG4gICAgICAgICAgICAgICAgbWFyZ2lucyA9IG9wdHMubWF4aW1pemVkTWFyZ2luO1xuXG4gICAgICAgICAgICBpZiAocGFyZW50ID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICAgICAgLy8gbWF4aW1pemUgd2l0aGluIHdpbmRvd1xuICAgICAgICAgICAgICAgIHNlbGYuc3R5bGUud2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggLSBtYXJnaW5zWzFdIC0gbWFyZ2luc1szXSArICdweCc7XG4gICAgICAgICAgICAgICAgc2VsZi5zdHlsZS5oZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC0gbWFyZ2luc1swXSAtIG1hcmdpbnNbMl0gKyAncHgnO1xuICAgICAgICAgICAgICAgIHNlbGYuc3R5bGUubGVmdCA9IG1hcmdpbnNbM10gKyAncHgnO1xuICAgICAgICAgICAgICAgIHNlbGYuc3R5bGUudG9wID0gbWFyZ2luc1swXSArICdweCc7XG5cbiAgICAgICAgICAgICAgICBpZiAoIW9wdHMucG9zaXRpb24uZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zdHlsZS5sZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0ICsgbWFyZ2luc1szXSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3R5bGUudG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0ICsgbWFyZ2luc1swXSArICdweCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBtYXhpbWl6ZSB3aXRoaW4gcGFyZW50Tm9kZVxuICAgICAgICAgICAgICAgIHNlbGYuc3R5bGUud2lkdGggPSBwYXJlbnQuY2xpZW50V2lkdGggLSBtYXJnaW5zWzFdIC0gbWFyZ2luc1szXSArICdweCc7XG4gICAgICAgICAgICAgICAgc2VsZi5zdHlsZS5oZWlnaHQgPSBwYXJlbnQuY2xpZW50SGVpZ2h0IC0gbWFyZ2luc1swXSAtIG1hcmdpbnNbMl0gKyAncHgnO1xuICAgICAgICAgICAgICAgIHNlbGYuc3R5bGUubGVmdCA9IG1hcmdpbnNbM10gKyAncHgnO1xuICAgICAgICAgICAgICAgIHNlbGYuc3R5bGUudG9wID0gbWFyZ2luc1swXSArICdweCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYuY29udGVudFJlc2l6ZSgpO1xuICAgICAgICAgICAgc2VsZi5yZW1vdmVNaW5pbWl6ZWRSZXBsYWNlbWVudCgpO1xuICAgICAgICAgICAgc2VsZi5zdGF0dXMgPSAnbWF4aW1pemVkJztcbiAgICAgICAgICAgIHNlbGYuc2V0Q29udHJvbHMoWycuanNQYW5lbC1idG4tbWF4aW1pemUnLCAnLmpzUGFuZWwtYnRuLXNtYWxsaWZ5cmV2J10pO1xuICAgICAgICAgICAganNQYW5lbC5mcm9udChzZWxmKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoanNwYW5lbG1heGltaXplZCk7XG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGpzcGFuZWxzdGF0dXNjaGFuZ2UpO1xuXG4gICAgICAgICAgICBpZiAob3B0cy5vbnN0YXR1c2NoYW5nZSAmJiBvcHRzLm9uc3RhdHVzY2hhbmdlLmNhbGwoc2VsZiwgc2VsZikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2VsZiwgc2VsZik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcHRzLm9ubWF4aW1pemVkKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5vbm1heGltaXplZC5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLm1pbmltaXplID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5zdGF0dXMgPT09ICdtaW5pbWl6ZWQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcHRzLm9uYmVmb3JlbWluaW1pemUgJiYgb3B0cy5vbmJlZm9yZW1pbmltaXplLmNhbGwoc2VsZiwgc2VsZikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoanNwYW5lbGJlZm9yZW1pbmltaXplKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGNvbnRhaW5lciBmb3IgbWluaW1pemVkIHJlcGxhY2VtZW50cyBpZiBub3QgYWxyZWFkeSB0aGVyZVxuICAgICAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXInKSkge1xuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlbWVudENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHJlcGxhY2VtZW50Q29udGFpbmVyLmlkID0gJ2pzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyJztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZChyZXBsYWNlbWVudENvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYuc3R5bGUubGVmdCA9ICctOTk5OXB4JztcbiAgICAgICAgICAgIHNlbGYuc3RhdHVzQmVmb3JlID0gc2VsZi5zdGF0dXM7XG4gICAgICAgICAgICBzZWxmLnN0YXR1cyA9ICdtaW5pbWl6ZWQnO1xuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsbWluaW1pemVkKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoanNwYW5lbHN0YXR1c2NoYW5nZSk7XG5cbiAgICAgICAgICAgIGlmIChvcHRzLm9uc3RhdHVzY2hhbmdlICYmIG9wdHMub25zdGF0dXNjaGFuZ2UuY2FsbChzZWxmLCBzZWxmKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdHMubWluaW1pemVUbykge1xuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlbWVudCA9IHNlbGYuY3JlYXRlTWluaW1pemVkUmVwbGFjZW1lbnQoKTtcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5taW5pbWl6ZVRvID09PSAnZGVmYXVsdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyJykuYXBwZW5kKHJlcGxhY2VtZW50KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdHMubWluaW1pemVUbyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLm1pbmltaXplVG8gPT09ICdwYXJlbnRwYW5lbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gc2VsZi5jbG9zZXN0KCcuanNQYW5lbC1jb250ZW50JykucGFyZW50Tm9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdCA9IHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanNQYW5lbC1taW5pbWl6ZWQtYm94Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyID0gbGlzdFtsaXN0Lmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdHMubWluaW1pemVUbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIgPSBvcHRzLm1pbmltaXplVG87XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZChyZXBsYWNlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3B0cy5vbm1pbmltaXplZCkge1xuICAgICAgICAgICAgICAgIG9wdHMub25taW5pbWl6ZWQuY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5ub3JtYWxpemUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGlmIChzZWxmLnN0YXR1cyA9PT0gJ25vcm1hbGl6ZWQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcHRzLm9uYmVmb3Jlbm9ybWFsaXplICYmIG9wdHMub25iZWZvcmVub3JtYWxpemUuY2FsbChzZWxmLCBzZWxmKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsYmVmb3Jlbm9ybWFsaXplKTtcbiAgICAgICAgICAgIHNlbGYuc3R5bGUud2lkdGggPSBzZWxmLmN1cnJlbnREYXRhLndpZHRoO1xuICAgICAgICAgICAgc2VsZi5zdHlsZS5oZWlnaHQgPSBzZWxmLmN1cnJlbnREYXRhLmhlaWdodDtcbiAgICAgICAgICAgIHNlbGYuY29udGVudFJlc2l6ZSgpO1xuICAgICAgICAgICAgc2VsZi5zdHlsZS5sZWZ0ID0gc2VsZi5jdXJyZW50RGF0YS5sZWZ0O1xuICAgICAgICAgICAgc2VsZi5zdHlsZS50b3AgPSBzZWxmLmN1cnJlbnREYXRhLnRvcDtcbiAgICAgICAgICAgIHNlbGYucmVtb3ZlTWluaW1pemVkUmVwbGFjZW1lbnQoKTtcbiAgICAgICAgICAgIHNlbGYuc3RhdHVzID0gJ25vcm1hbGl6ZWQnO1xuICAgICAgICAgICAgc2VsZi5zZXRDb250cm9scyhbJy5qc1BhbmVsLWJ0bi1ub3JtYWxpemUnLCAnLmpzUGFuZWwtYnRuLXNtYWxsaWZ5cmV2J10pO1xuICAgICAgICAgICAganNQYW5lbC5mcm9udChzZWxmKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoanNwYW5lbG5vcm1hbGl6ZWQpO1xuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsc3RhdHVzY2hhbmdlKTtcblxuICAgICAgICAgICAgaWYgKG9wdHMub25zdGF0dXNjaGFuZ2UgJiYgb3B0cy5vbnN0YXR1c2NoYW5nZS5jYWxsKHNlbGYsIHNlbGYpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3B0cy5vbm5vcm1hbGl6ZWQpIHtcbiAgICAgICAgICAgICAgICBvcHRzLm9ubm9ybWFsaXplZC5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLnJlbW92ZU1pbmltaXplZFJlcGxhY2VtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGVsbXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxmLmlkICsgJy1taW4nKTtcbiAgICAgICAgICAgIGlmIChlbG10KSB7XG4gICAgICAgICAgICAgICAgZWxtdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsbXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5yZXBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHBhcmFtcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICAgICAgICAgIHBhcmFtc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHBvcyA9IG9wdHMucG9zaXRpb24sXG4gICAgICAgICAgICAgICAgdXBkYXRlQ2FjaGUgPSB0cnVlLFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gdm9pZCAwO1xuICAgICAgICAgICAgcGFyYW1zLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodmFsdWUpKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVDYWNoZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGpzUGFuZWwucG9zaXRpb24oc2VsZiwgcG9zKTtcbiAgICAgICAgICAgIGlmICh1cGRhdGVDYWNoZSkge1xuICAgICAgICAgICAgICAgIHNlbGYuc2F2ZUN1cnJlbnRQb3NpdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYucmVwb3NpdGlvbk9uU25hcCA9IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgICAgICAgIHZhciBvZmZzZXRYID0gJzAnLFxuICAgICAgICAgICAgICAgIG9mZnNldFkgPSAnMCc7XG4gICAgICAgICAgICB2YXIgbWFyZ2lucyA9IGpzUGFuZWwucE9jb250YWlubWVudChvcHRzLmRyYWdpdC5jb250YWlubWVudCk7XG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgb2Zmc2V0c1xuICAgICAgICAgICAgaWYgKG9wdHMuZHJhZ2l0LnNuYXAuY29udGFpbm1lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAocG9zID09PSAnbGVmdC10b3AnKSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFggPSBtYXJnaW5zWzNdO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRZID0gbWFyZ2luc1swXTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvcyA9PT0gJ3JpZ2h0LXRvcCcpIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WCA9IC1tYXJnaW5zWzFdO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRZID0gbWFyZ2luc1swXTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvcyA9PT0gJ3JpZ2h0LWJvdHRvbScpIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WCA9IC1tYXJnaW5zWzFdO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRZID0gLW1hcmdpbnNbMl07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb3MgPT09ICdsZWZ0LWJvdHRvbScpIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WCA9IG1hcmdpbnNbM107XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFkgPSAtbWFyZ2luc1syXTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvcyA9PT0gJ2NlbnRlci10b3AnKSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFggPSBtYXJnaW5zWzNdIC8gMiAtIG1hcmdpbnNbMV0gLyAyO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRZID0gbWFyZ2luc1swXTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvcyA9PT0gJ2NlbnRlci1ib3R0b20nKSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFggPSBtYXJnaW5zWzNdIC8gMiAtIG1hcmdpbnNbMV0gLyAyO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRZID0gLW1hcmdpbnNbMl07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb3MgPT09ICdsZWZ0LWNlbnRlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WCA9IG1hcmdpbnNbM107XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFkgPSBtYXJnaW5zWzBdIC8gMiAtIG1hcmdpbnNbMl0gLyAyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9zID09PSAncmlnaHQtY2VudGVyJykge1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRYID0gLW1hcmdpbnNbMV07XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFkgPSBtYXJnaW5zWzBdIC8gMiAtIG1hcmdpbnNbMl0gLyAyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qIGpzUGFuZWwucG9zaXRpb24oc2VsZiwgYCR7cG9zfSAke29mZnNldFh9ICR7b2Zmc2V0WX1gKTtcclxuICAgICAgICAgICAgICAgRm9yIHNvbWUgcmVhc29uIEkgY291bGQgbm90IGZpbmQgdGhlIGxpbmUgYWJvdmUgZG9lcyBub3Qgd29yayAocG9zIGFuZCBvZmZzZXRzIGluIG9uZSBzdHJpbmcpLCBidXQgb25seSB3aGVuXHJcbiAgICAgICAgICAgICAgIGNlbnRlci1ib3R0b20gaXMgdXNlZCB3aXRoIGRpZmZlcmVudCBzZXR0aW5ncyBmb3IgbGVmdC9yaWdodCBtYXJnaW4uXHJcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICBqc1BhbmVsLnBvc2l0aW9uKHNlbGYsIHBvcyk7XG4gICAgICAgICAgICBqc1BhbmVsLnNldFN0eWxlKHNlbGYsIHtcbiAgICAgICAgICAgICAgICBsZWZ0OiAnY2FsYygnICsgc2VsZi5zdHlsZS5sZWZ0ICsgJyArICcgKyBvZmZzZXRYICsgJ3B4KScsXG4gICAgICAgICAgICAgICAgdG9wOiAnY2FsYygnICsgc2VsZi5zdHlsZS50b3AgKyAnICsgJyArIG9mZnNldFkgKyAncHgpJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5yZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIHBhcmFtcyA9IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkaW1lbnNpb25zID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoc2VsZik7XG4gICAgICAgICAgICB2YXIgc2l6ZSA9IHsgd2lkdGg6IGRpbWVuc2lvbnMud2lkdGgsIGhlaWdodDogZGltZW5zaW9ucy5oZWlnaHQgfSxcbiAgICAgICAgICAgICAgICB1cGRhdGVDYWNoZSA9IHRydWUsXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSB2b2lkIDA7XG4gICAgICAgICAgICBwYXJhbXMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBzaXplID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih2YWx1ZSkpID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBzaXplID0gT2JqZWN0LmFzc2lnbihzaXplLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVDYWNoZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBqc1BhbmVsLnBPc2l6ZShzZWxmLCBzaXplKTtcbiAgICAgICAgICAgIHNlbGYuc3R5bGUud2lkdGggPSB2YWx1ZXMud2lkdGg7XG4gICAgICAgICAgICBzZWxmLnN0eWxlLmhlaWdodCA9IHZhbHVlcy5oZWlnaHQ7XG4gICAgICAgICAgICBzZWxmLmNvbnRlbnRSZXNpemUoKTtcbiAgICAgICAgICAgIGlmICh1cGRhdGVDYWNoZSkge1xuICAgICAgICAgICAgICAgIHNlbGYuc2F2ZUN1cnJlbnREaW1lbnNpb25zKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5zYXZlQ3VycmVudERpbWVuc2lvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbm9ybURhdGEgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzZWxmKTtcbiAgICAgICAgICAgIHNlbGYuY3VycmVudERhdGEud2lkdGggPSBub3JtRGF0YS53aWR0aDtcbiAgICAgICAgICAgIGlmIChzZWxmLnN0YXR1cyA9PT0gJ25vcm1hbGl6ZWQnKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50RGF0YS5oZWlnaHQgPSBub3JtRGF0YS5oZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHNlbGYuc2F2ZUN1cnJlbnRQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBub3JtRGF0YSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNlbGYpO1xuICAgICAgICAgICAgc2VsZi5jdXJyZW50RGF0YS5sZWZ0ID0gbm9ybURhdGEubGVmdDtcbiAgICAgICAgICAgIHNlbGYuY3VycmVudERhdGEudG9wID0gbm9ybURhdGEudG9wO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuc2V0Q29udHJvbHMgPSBmdW5jdGlvbiAoc2VsLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgc2VsZi5oZWFkZXIucXVlcnlTZWxlY3RvckFsbCgnLmpzUGFuZWwtYnRuJykuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlbC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJ0biA9IHNlbGYuY29udHJvbGJhci5xdWVyeVNlbGVjdG9yKGl0ZW0pO1xuICAgICAgICAgICAgICAgIGlmIChidG4pIHtcbiAgICAgICAgICAgICAgICAgICAgYnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5zZXRDb250cm9sU3RhdHVzID0gZnVuY3Rpb24gKGN0cmwpIHtcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6ICdlbmFibGUnO1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gYXJndW1lbnRzWzJdO1xuXG4gICAgICAgICAgICBpZiAoYWN0aW9uID09PSAnZGlzYWJsZScpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnRuJyArIGN0cmwpICE9PSAncmVtb3ZlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYnRuJyArIGN0cmwsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYnRuID0gc2VsZi5jb250cm9sYmFyLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWJ0bi0nICsgY3RybCk7XG4gICAgICAgICAgICAgICAgICAgIGJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICBidG4uc3R5bGUub3BhY2l0eSA9IDAuNDtcbiAgICAgICAgICAgICAgICAgICAgYnRuLnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gJ2VuYWJsZScpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnRuJyArIGN0cmwpICE9PSAncmVtb3ZlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYnRuJyArIGN0cmwsICdlbmFibGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfYnRuID0gc2VsZi5jb250cm9sYmFyLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWJ0bi0nICsgY3RybCk7XG4gICAgICAgICAgICAgICAgICAgIF9idG4uc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcbiAgICAgICAgICAgICAgICAgICAgX2J0bi5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgICAgICAgICAgICAgX2J0bi5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICdyZW1vdmUnKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9idG4yID0gc2VsZi5jb250cm9sYmFyLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWJ0bi0nICsgY3RybCk7XG4gICAgICAgICAgICAgICAgc2VsZi5jb250cm9sYmFyLnJlbW92ZUNoaWxkKF9idG4yKTtcbiAgICAgICAgICAgICAgICBzZWxmLnNldEF0dHJpYnV0ZSgnZGF0YS1idG4nICsgY3RybCwgJ3JlbW92ZWQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuc2V0SGVhZGVyQ29udHJvbHMgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBjb250cm9scyA9IFsnY2xvc2UnLCAnbWF4aW1pemUnLCAnbm9ybWFsaXplJywgJ21pbmltaXplJywgJ3NtYWxsaWZ5JywgJ3NtYWxsaWZ5cmV2J10sXG4gICAgICAgICAgICAgICAgb3B0aW9uID0gb3B0cy5oZWFkZXJDb250cm9scztcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb24gPT09ICdub25lJykge1xuICAgICAgICAgICAgICAgICAgICBjb250cm9scy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldENvbnRyb2xTdGF0dXMoaXRlbSwgJ3JlbW92ZScpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbiA9PT0gJ2Nsb3Nlb25seScpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbHMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0gIT09ICdjbG9zZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldENvbnRyb2xTdGF0dXMoaXRlbSwgJ3JlbW92ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbltpdGVtXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRDb250cm9sU3RhdHVzKGl0ZW0sIG9wdGlvbltpdGVtXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2VsZiwgc2VsZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLnNldEhlYWRlckxvZ28gPSBmdW5jdGlvbiAoaGRyTG9nbywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaGRyTG9nbyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpZiAoaGRyTG9nby5zdWJzdHIoMCwgMSkgIT09ICc8Jykge1xuICAgICAgICAgICAgICAgICAgICAvLyBpcyBhc3N1bWVkIHRvIGJlIGFuIGltZyB1cmxcbiAgICAgICAgICAgICAgICAgICAgdmFyIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICAgICAgICAgICAgICBpbWcuc3R5bGUubWF4SGVpZ2h0ID0gZ2V0Q29tcHV0ZWRTdHlsZShzZWxmLmhlYWRlcmJhcikuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBpbWcuc3JjID0gaGRyTG9nbztcbiAgICAgICAgICAgICAgICAgICAganNQYW5lbC5lbXB0eU5vZGUoc2VsZi5oZWFkZXJsb2dvKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5oZWFkZXJsb2dvLmFwcGVuZChpbWcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaGVhZGVybG9nby5pbm5lckhUTUwgPSBoZHJMb2dvO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gYXNzdW1lZCB0byBiZSBhIG5vZGUgb2JqZWN0XG4gICAgICAgICAgICAgICAganNQYW5lbC5lbXB0eU5vZGUoc2VsZi5oZWFkZXJsb2dvKTtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWRlcmxvZ28uYXBwZW5kKGhkckxvZ28pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuc2V0SGVhZGVyUmVtb3ZlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBzZWxmLnJlbW92ZUNoaWxkKHNlbGYuaGVhZGVyKTtcbiAgICAgICAgICAgIHNlbGYuY29udGVudC5jbGFzc0xpc3QuYWRkKCdqc1BhbmVsLWNvbnRlbnQtbm9oZWFkZXInKTtcbiAgICAgICAgICAgIFsnY2xvc2UnLCAnbWF4aW1pemUnLCAnbm9ybWFsaXplJywgJ21pbmltaXplJywgJ3NtYWxsaWZ5JywgJ3NtYWxsaWZ5cmV2J10uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0QXR0cmlidXRlKCdkYXRhLWJ0bicgKyBpdGVtLCAncmVtb3ZlZCcpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2VsZiwgc2VsZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLnNldEhlYWRlclRpdGxlID0gZnVuY3Rpb24gKGhkclRpdGxlLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBoZHJUaXRsZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWRlcnRpdGxlLmlubmVySFRNTCA9IGhkclRpdGxlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaGRyVGl0bGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBqc1BhbmVsLmVtcHR5Tm9kZShzZWxmLmhlYWRlcnRpdGxlKTtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWRlcnRpdGxlLmlubmVySFRNTCA9IGhkclRpdGxlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGFzc3VtZWQgdG8gYmUgYSBub2RlIG9iamVjdFxuICAgICAgICAgICAgICAgIGpzUGFuZWwuZW1wdHlOb2RlKHNlbGYuaGVhZGVydGl0bGUpO1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhZGVydGl0bGUuYXBwZW5kKGhkclRpdGxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2VsZiwgc2VsZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLnNldEljb25mb250ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGZvbnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6ICdqc2dseXBoJztcbiAgICAgICAgICAgIHZhciBwYW5lbCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogc2VsZjtcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGFyZ3VtZW50c1syXTtcblxuICAgICAgICAgICAgaWYgKGZvbnQgIT09ICdqc2dseXBoJykge1xuICAgICAgICAgICAgICAgIHZhciBjbGFzc0FycmF5ID0gdm9pZCAwLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0QXJyYXkgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgaWYgKGZvbnQgPT09ICdib290c3RyYXAnIHx8IGZvbnQgPT09ICdnbHlwaGljb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzQXJyYXkgPSBbJ2dseXBoaWNvbiBnbHlwaGljb24tcmVtb3ZlJywgJ2dseXBoaWNvbiBnbHlwaGljb24tZnVsbHNjcmVlbicsICdnbHlwaGljb24gZ2x5cGhpY29uLXJlc2l6ZS1mdWxsJywgJ2dseXBoaWNvbiBnbHlwaGljb24tbWludXMnLCAnZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLWRvd24nLCAnZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLXVwJ107XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmb250ID09PSAnZmEnIHx8IGZvbnQgPT09ICdmYXInIHx8IGZvbnQgPT09ICdmYWwnIHx8IGZvbnQgPT09ICdmYXMnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzQXJyYXkgPSBbZm9udCArICcgZmEtd2luZG93LWNsb3NlJywgZm9udCArICcgZmEtd2luZG93LW1heGltaXplJywgZm9udCArICcgZmEtd2luZG93LXJlc3RvcmUnLCBmb250ICsgJyBmYS13aW5kb3ctbWluaW1pemUnLCBmb250ICsgJyBmYS1jaGV2cm9uLWRvd24nLCBmb250ICsgJyBmYS1jaGV2cm9uLXVwJ107XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmb250ID09PSAnbWF0ZXJpYWwtaWNvbnMnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzQXJyYXkgPSBbZm9udCwgZm9udCwgZm9udCwgZm9udCwgZm9udCwgZm9udF07XG4gICAgICAgICAgICAgICAgICAgIHRleHRBcnJheSA9IFsnY2xvc2UnLCAnZnVsbHNjcmVlbicsICdmdWxsc2NyZWVuX2V4aXQnLCAnY2FsbF9yZWNlaXZlZCcsICdleHBhbmRfbW9yZScsICdleHBhbmRfbGVzcyddO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShmb250KSkge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc0FycmF5ID0gWydjdXN0b20tY29udHJvbC1pY29uICcgKyBmb250WzVdLCAnY3VzdG9tLWNvbnRyb2wtaWNvbiAnICsgZm9udFs0XSwgJ2N1c3RvbS1jb250cm9sLWljb24gJyArIGZvbnRbM10sICdjdXN0b20tY29udHJvbC1pY29uICcgKyBmb250WzJdLCAnY3VzdG9tLWNvbnRyb2wtaWNvbiAnICsgZm9udFsxXSwgJ2N1c3RvbS1jb250cm9sLWljb24gJyArIGZvbnRbMF1dO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYW5lbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwocGFuZWwucXVlcnlTZWxlY3RvckFsbCgnLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4gPiBzcGFuJykpLnJldmVyc2UoKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NOYW1lID0gY2xhc3NBcnJheVtpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvbnQgPT09ICdtYXRlcmlhbC1pY29ucycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udGV4dENvbnRlbnQgPSB0ZXh0QXJyYXlbaV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwocGFuZWwsIHBhbmVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwYW5lbDtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLnNldFJ0bCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFtzZWxmLmhlYWRlciwgc2VsZi5oZWFkZXJiYXIsIHNlbGYudGl0bGViYXIsIHNlbGYuY29udHJvbGJhciwgc2VsZi5oZWFkZXJ0b29sYmFyLCBzZWxmLmZvb3Rlcl0uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnanNQYW5lbC1ydGwnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgW3NlbGYuaGVhZGVydGl0bGUsIHNlbGYuaGVhZGVydG9vbGJhciwgc2VsZi5jb250ZW50LCBzZWxmLmZvb3Rlcl0uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uZGlyID0gJ3J0bCc7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMucnRsLmxhbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5sYW5nID0gb3B0cy5ydGwubGFuZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLnNldFNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAob3B0cy5wYW5lbFNpemUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVzID0ganNQYW5lbC5wT3NpemUoc2VsZiwgb3B0cy5wYW5lbFNpemUpO1xuICAgICAgICAgICAgICAgIHNlbGYuc3R5bGUud2lkdGggPSB2YWx1ZXMud2lkdGg7XG4gICAgICAgICAgICAgICAgc2VsZi5zdHlsZS5oZWlnaHQgPSB2YWx1ZXMuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIHNlbGYuY29udGVudFJlc2l6ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRzLmNvbnRlbnRTaXplKSB7XG4gICAgICAgICAgICAgICAgdmFyIF92YWx1ZXMgPSBqc1BhbmVsLnBPc2l6ZShzZWxmLCBvcHRzLmNvbnRlbnRTaXplKTtcbiAgICAgICAgICAgICAgICBzZWxmLmNvbnRlbnQuc3R5bGUud2lkdGggPSBfdmFsdWVzLndpZHRoO1xuICAgICAgICAgICAgICAgIHNlbGYuY29udGVudC5zdHlsZS5oZWlnaHQgPSBfdmFsdWVzLmhlaWdodDtcbiAgICAgICAgICAgICAgICAvLyBleHBsaWNpdGx5IGFzc2lnbiBjdXJyZW50IHdpZHRoL2hlaWdodCB0byBwYW5lbFxuICAgICAgICAgICAgICAgIHNlbGYuc3R5bGUud2lkdGggPSBfdmFsdWVzLndpZHRoO1xuICAgICAgICAgICAgICAgIC8vIHRoZW4gc2V0IGNvbnRlbnQgd2lkdGggdG8gMTAwJVxuICAgICAgICAgICAgICAgIHNlbGYuY29udGVudC5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuc2V0VGhlbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdGhlbWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IG9wdHMudGhlbWU7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBhcmd1bWVudHNbMV07XG5cbiAgICAgICAgICAgIC8vIGZpcnN0IHJlbW92ZSBhbGwgdGhlbWUgcmVsYXRlZCBzeWxlc1xuICAgICAgICAgICAgc2VsZi5jbGVhclRoZW1lKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGVtZSA9PT0gJ25vbmUnKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVzdWx0cyBpbiBhbiBhbGwgd2hpdGUgcGFuZWwgd2l0aG91dCBhbnkgdGhlbWUgcmVsYXRlZCBjbGFzc2VzL3N0eWxlcyBhcHBsaWVkXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZhbCBvZiBmb290ZXIgYmFja2dyb3VuZC9ib3JkZXIgaXMgZG9uZSBpbiBqc1AudG9vbGJhckFkZCgpXG4gICAgICAgICAgICAgICAgc2VsZi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZic7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB0aGVtZURldGFpbHMgPSBzZWxmLmdldFRoZW1lRGV0YWlscyh0aGVtZSk7XG5cbiAgICAgICAgICAgIGlmICghdGhlbWVEZXRhaWxzLmJzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGpzUGFuZWwudGhlbWVzLmluZGV4T2YodGhlbWVEZXRhaWxzLmNvbG9yKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hcHBseUJ1aWx0SW5UaGVtZSh0aGVtZURldGFpbHMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYXBwbHlBcmJpdHJhcnlUaGVtZSh0aGVtZURldGFpbHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5hcHBseUJvb3RzdHJhcFRoZW1lKHRoZW1lRGV0YWlscyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcHRzLmJvcmRlcikge1xuICAgICAgICAgICAgICAgIHNlbGYuYXBwbHlUaGVtZUJvcmRlcih0aGVtZURldGFpbHMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLnN0eWxlLmJvcmRlcldpZHRoID0gJyc7XG4gICAgICAgICAgICAgICAgc2VsZi5zdHlsZS5ib3JkZXJTdHlsZSA9ICcnO1xuICAgICAgICAgICAgICAgIHNlbGYuc3R5bGUuYm9yZGVyQ29sb3IgPSAnJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuc21hbGxpZnkgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGlmIChzZWxmLnN0YXR1cyA9PT0gJ3NtYWxsaWZpZWQnIHx8IHNlbGYuc3RhdHVzID09PSAnc21hbGxpZmllZG1heCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdHMub25iZWZvcmVzbWFsbGlmeSAmJiBvcHRzLm9uYmVmb3Jlc21hbGxpZnkuY2FsbChzZWxmLCBzZWxmKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsYmVmb3Jlc21hbGxpZnkpO1xuXG4gICAgICAgICAgICBpZiAoc2VsZi5zdGF0dXMgPT09ICdub3JtYWxpemVkJykge1xuICAgICAgICAgICAgICAgIHNlbGYuc2F2ZUN1cnJlbnREaW1lbnNpb25zKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAgICAgICAgIHNlbGYuc3R5bGUuaGVpZ2h0ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoc2VsZi5oZWFkZXJiYXIpLmhlaWdodDtcblxuICAgICAgICAgICAgaWYgKHNlbGYuc3RhdHVzID09PSAnbm9ybWFsaXplZCcpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNldENvbnRyb2xzKFsnLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZScsICcuanNQYW5lbC1idG4tc21hbGxpZnknXSk7XG4gICAgICAgICAgICAgICAgc2VsZi5zdGF0dXMgPSAnc21hbGxpZmllZCc7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsc21hbGxpZmllZCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsc3RhdHVzY2hhbmdlKTtcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5vbnN0YXR1c2NoYW5nZSAmJiBvcHRzLm9uc3RhdHVzY2hhbmdlLmNhbGwoc2VsZiwgc2VsZikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZi5zdGF0dXMgPT09ICdtYXhpbWl6ZWQnKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXRDb250cm9scyhbJy5qc1BhbmVsLWJ0bi1tYXhpbWl6ZScsICcuanNQYW5lbC1idG4tc21hbGxpZnknXSk7XG4gICAgICAgICAgICAgICAgc2VsZi5zdGF0dXMgPSAnc21hbGxpZmllZG1heCc7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsc21hbGxpZmllZG1heCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsc3RhdHVzY2hhbmdlKTtcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5vbnN0YXR1c2NoYW5nZSAmJiBvcHRzLm9uc3RhdHVzY2hhbmdlLmNhbGwoc2VsZiwgc2VsZikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdHMub25zbWFsbGlmaWVkKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5vbnNtYWxsaWZpZWQuY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi51bnNtYWxsaWZ5ID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5zdGF0dXMgPT09ICdzbWFsbGlmaWVkJyB8fCBzZWxmLnN0YXR1cyA9PT0gJ3NtYWxsaWZpZWRtYXgnKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMub25iZWZvcmV1bnNtYWxsaWZ5ICYmIG9wdHMub25iZWZvcmV1bnNtYWxsaWZ5LmNhbGwoc2VsZiwgc2VsZikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoanNwYW5lbGJlZm9yZXVuc21hbGxpZnkpO1xuICAgICAgICAgICAgICAgIHNlbGYuc3R5bGUub3ZlcmZsb3cgPSAndmlzaWJsZSc7XG4gICAgICAgICAgICAgICAganNQYW5lbC5mcm9udChzZWxmKTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxmLnN0YXR1cyA9PT0gJ3NtYWxsaWZpZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3R5bGUuaGVpZ2h0ID0gc2VsZi5jdXJyZW50RGF0YS5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0Q29udHJvbHMoWycuanNQYW5lbC1idG4tbm9ybWFsaXplJywgJy5qc1BhbmVsLWJ0bi1zbWFsbGlmeXJldiddKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGF0dXMgPSAnbm9ybWFsaXplZCc7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoanNwYW5lbG5vcm1hbGl6ZWQpO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGpzcGFuZWxzdGF0dXNjaGFuZ2UpO1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5vbnN0YXR1c2NoYW5nZSAmJiBvcHRzLm9uc3RhdHVzY2hhbmdlLmNhbGwoc2VsZiwgc2VsZikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZi5zdGF0dXMgPT09ICdzbWFsbGlmaWVkbWF4Jykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm1heGltaXplKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxmLnN0YXR1cyA9PT0gJ21pbmltaXplZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ub3JtYWxpemUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAob3B0cy5vbnVuc21hbGxpZmllZCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRzLm9udW5zbWFsbGlmaWVkLmNhbGwoc2VsZiwgc2VsZik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLmRyYWdpdCA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgICAgIHZhciBkcmFnaXRPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwganNQYW5lbC5kZWZhdWx0cy5kcmFnaXQsIG9wdHMuZHJhZ2l0KSxcbiAgICAgICAgICAgICAgICBoYW5kbGVzID0gc2VsZi5xdWVyeVNlbGVjdG9yQWxsKGRyYWdpdE9wdGlvbnMuaGFuZGxlcyk7XG4gICAgICAgICAgICBpZiAoc3RyaW5nID09PSAnZGlzYWJsZScpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVzLmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZSkge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGUuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcy5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLnJlc2l6ZWl0ID0gZnVuY3Rpb24gKHN0cmluZykge1xuICAgICAgICAgICAgdmFyIGhhbmRsZXMgPSBzZWxmLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZScpO1xuICAgICAgICAgICAgaWYgKHN0cmluZyA9PT0gJ2Rpc2FibGUnKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcy5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhhbmRsZXMuZm9yRWFjaChmdW5jdGlvbiAoaGFuZGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZS5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gb3B0aW9uLmlkXG4gICAgICAgIHNlbGYuaWQgPSBvcHRzLmlkO1xuXG4gICAgICAgIC8vIG9wdGlvbi5wYW5lbHR5cGUgY2xhc3NuYW1lXG4gICAgICAgIHNlbGYuY2xhc3NMaXN0LmFkZCgnanNQYW5lbC0nICsgb3B0cy5wYW5lbHR5cGUpO1xuXG4gICAgICAgIC8vIHNldCB6LWluZGV4IGFuZCBwYW5lbHR5cGUgY2xhc3NcbiAgICAgICAgaWYgKG9wdHMucGFuZWx0eXBlID09PSAnc3RhbmRhcmQnKSB7XG4gICAgICAgICAgICBzZWxmLnN0eWxlLnpJbmRleCA9IHRoaXMuemkubmV4dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3B0aW9uLmNvbnRhaW5lclxuICAgICAgICBwYW5lbENvbnRhaW5lci5hcHBlbmQoc2VsZik7XG5cbiAgICAgICAgLy8gb3B0aW9uLnRoZW1lXG4gICAgICAgIHNlbGYuc2V0VGhlbWUob3B0cy50aGVtZSk7XG5cbiAgICAgICAgLy8gb3B0aW9uLmJveFNoYWRvd1xuICAgICAgICBpZiAob3B0cy5ib3hTaGFkb3cpIHtcbiAgICAgICAgICAgIHNlbGYuY2xhc3NMaXN0LmFkZCgnanNQYW5lbC1kZXB0aC0nICsgb3B0cy5ib3hTaGFkb3cpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogb3B0aW9uLmhlYWRlclJlbW92ZSxcclxuICAgICAgICAgb3B0aW9uLmljb25mb250LFxyXG4gICAgICAgICBvcHRpb24uaGVhZGVyQ29udHJvbHMsXHJcbiAgICAgICAgIG9wdGlvbi5oZWFkZXJMb2dvLFxyXG4gICAgICAgICBvcHRpb24uaGVhZGVyVGl0bGVcclxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKCFvcHRzLmhlYWRlclJlbW92ZSkge1xuICAgICAgICAgICAgaWYgKG9wdHMuaGVhZGVyTG9nbykge1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0SGVhZGVyTG9nbyhvcHRzLmhlYWRlckxvZ28pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5zZXRJY29uZm9udChvcHRzLmljb25mb250KTtcbiAgICAgICAgICAgIHNlbGYuc2V0SGVhZGVyVGl0bGUob3B0cy5oZWFkZXJUaXRsZSk7XG4gICAgICAgICAgICBzZWxmLnNldEhlYWRlckNvbnRyb2xzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLnNldEhlYWRlclJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3B0aW9uLmhlYWRlclRvb2xiYXJcbiAgICAgICAgaWYgKG9wdHMuaGVhZGVyVG9vbGJhcikge1xuICAgICAgICAgICAgc2VsZi5hZGRUb29sYmFyKHNlbGYuaGVhZGVydG9vbGJhciwgb3B0cy5oZWFkZXJUb29sYmFyKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBvcHRpb24uZm9vdGVyVG9vbGJhclxuICAgICAgICBpZiAob3B0cy5mb290ZXJUb29sYmFyKSB7XG4gICAgICAgICAgICBzZWxmLmFkZFRvb2xiYXIoc2VsZi5mb290ZXIsIG9wdHMuZm9vdGVyVG9vbGJhcik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvcHRpb24uY29udGVudFxuICAgICAgICBpZiAob3B0cy5jb250ZW50KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdHMuY29udGVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIG9wdHMuY29udGVudC5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0cy5jb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHNlbGYuY29udGVudC5pbm5lckhUTUwgPSBvcHRzLmNvbnRlbnQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuY29udGVudC5hcHBlbmQob3B0cy5jb250ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG9wdGlvbi5jb250ZW50QWpheFxuICAgICAgICBpZiAob3B0cy5jb250ZW50QWpheCkge1xuICAgICAgICAgICAgdGhpcy5hamF4KHNlbGYpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3B0aW9uLmNvbnRlbnRGZXRjaFxuICAgICAgICBpZiAob3B0cy5jb250ZW50RmV0Y2gpIHtcbiAgICAgICAgICAgIHRoaXMuZmV0Y2goc2VsZik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvcHRpb24ucnRsXG4gICAgICAgIGlmIChvcHRzLnJ0bCkge1xuICAgICAgICAgICAgc2VsZi5zZXRSdGwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG9wdGlvbi5zaXplIC0tIHNob3VsZCBiZSBhZnRlciBvcHRpb24udGhlbWVcbiAgICAgICAgc2VsZi5zZXRTaXplKCk7XG5cbiAgICAgICAgLy8gb3B0aW9uLnBvc2l0aW9uXG4gICAgICAgIHNlbGYuc3RhdHVzID0gJ25vcm1hbGl6ZWQnO1xuICAgICAgICAvLyBpZiBvcHRpb24ucG9zaXRpb24gZXZhbHVhdGVzIHRvIGZhbHNlIHBhbmVsIHdpbGwgbm90IGJlIHBvc2l0aW9uZWQgYXQgYWxsXG4gICAgICAgIGlmIChvcHRzLnBvc2l0aW9uIHx8IG9wdHMucG9zaXRpb24gIT09ICdjdXJzb3InKSB7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uKHNlbGYsIG9wdHMucG9zaXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGpzcGFuZWxub3JtYWxpemVkKTtcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsc3RhdHVzY2hhbmdlKTtcbiAgICAgICAgaWYgKG9wdHMub25zdGF0dXNjaGFuZ2UgJiYgb3B0cy5vbnN0YXR1c2NoYW5nZS5jYWxsKHNlbGYsIHNlbGYpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5jYWxjU2l6ZUZhY3RvcnMoKTtcblxuICAgICAgICAvLyBvcHRpb24uYW5pbWF0ZUluXG4gICAgICAgIGlmIChvcHRzLmFuaW1hdGVJbikge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIGNsYXNzIGFnYWluIG9uIGFuaW1hdGlvbmVuZCwgb3RoZXJ3aXNlIG9wYWNpdHkgZG9lc24ndCBjaGFuZ2Ugd2hlbiBwYW5lbCBpcyBkcmFnZ2VkXG4gICAgICAgICAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5yZW1DbGFzcyhzZWxmLCBvcHRzLmFuaW1hdGVJbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuc2V0Q2xhc3Moc2VsZiwgb3B0cy5hbmltYXRlSW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3B0aW9uLmRyYWdpdCBBTkQgb3B0aW9uLnJlc2l6ZWl0IEFORCBvcHRpb24uc3luY01hcmdpbnNcbiAgICAgICAgaWYgKG9wdHMuc3luY01hcmdpbnMpIHtcbiAgICAgICAgICAgIHZhciBjb250YWlubWVudCA9IHRoaXMucE9jb250YWlubWVudChvcHRzLm1heGltaXplZE1hcmdpbik7XG4gICAgICAgICAgICBpZiAob3B0cy5kcmFnaXQpIHtcbiAgICAgICAgICAgICAgICBvcHRzLmRyYWdpdC5jb250YWlubWVudCA9IGNvbnRhaW5tZW50O1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLmRyYWdpdC5zbmFwKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdHMuZHJhZ2l0LnNuYXAuY29udGFpbm1lbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRzLnJlc2l6ZWl0KSB7XG4gICAgICAgICAgICAgICAgb3B0cy5yZXNpemVpdC5jb250YWlubWVudCA9IGNvbnRhaW5tZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRzLmRyYWdpdCkge1xuICAgICAgICAgICAgdGhpcy5kcmFnaXQoc2VsZiwgb3B0cy5kcmFnaXQpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0b3AnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGlmIChlLmRldGFpbCA9PT0gc2VsZi5pZCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbGNTaXplRmFjdG9ycygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYudGl0bGViYXIuc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdHMucmVzaXplaXQpIHtcbiAgICAgICAgICAgIHRoaXMucmVzaXplaXQoc2VsZiwgb3B0cy5yZXNpemVpdCk7XG4gICAgICAgICAgICB2YXIgc3RhcnRzdGF0dXMgPSB2b2lkIDA7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdyZXNpemVzdGFydCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUuZGV0YWlsID09PSBzZWxmLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0c3RhdHVzID0gc2VsZi5zdGF0dXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplc3RvcCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUuZGV0YWlsID09PSBzZWxmLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoc3RhcnRzdGF0dXMgPT09ICdzbWFsbGlmaWVkJyB8fCBzdGFydHN0YXR1cyA9PT0gJ3NtYWxsaWZpZWRtYXgnIHx8IHN0YXJ0c3RhdHVzID09PSAnbWF4aW1pemVkJykgJiYgcGFyc2VGbG9hdChzZWxmLnN0eWxlLmhlaWdodCkgPiBwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNlbGYuaGVhZGVyKS5oZWlnaHQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldENvbnRyb2xzKFsnLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZScsICcuanNQYW5lbC1idG4tc21hbGxpZnlyZXYnXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXR1cyA9ICdub3JtYWxpemVkJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoanNwYW5lbG5vcm1hbGl6ZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsc3RhdHVzY2hhbmdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLm9uc3RhdHVzY2hhbmdlICYmIG9wdHMub25zdGF0dXNjaGFuZ2UuY2FsbChzZWxmLCBzZWxmKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2FsY1NpemVGYWN0b3JzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpbml0aWFsaXplIHNlbGYuY3VycmVudERhdGEgLSBtdXN0IGJlIGFmdGVyIG9wdGlvbnMgcG9zaXRpb24gJiBzaXplXG4gICAgICAgIHNlbGYuc2F2ZUN1cnJlbnREaW1lbnNpb25zKCk7XG4gICAgICAgIHNlbGYuc2F2ZUN1cnJlbnRQb3NpdGlvbigpO1xuXG4gICAgICAgIC8vIG9wdGlvbi5zZXRTdGF0dXNcbiAgICAgICAgaWYgKG9wdHMuc2V0U3RhdHVzKSB7XG4gICAgICAgICAgICB2YXIgbmV3U3RhdHVzID0gb3B0cy5zZXRTdGF0dXM7XG4gICAgICAgICAgICBpZiAobmV3U3RhdHVzID09PSAnc21hbGxpZmllZG1heCcpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm1heGltaXplKCkuc21hbGxpZnkoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3U3RhdHVzID09PSAnc21hbGxpZmllZCcpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNtYWxsaWZ5KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBmdW5jID0gbmV3U3RhdHVzLnN1YnN0cigwLCBuZXdTdGF0dXMubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgc2VsZltmdW5jXSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3B0aW9uLmF1dG9jbG9zZVxuICAgICAgICBpZiAob3B0cy5hdXRvY2xvc2UpIHtcbiAgICAgICAgICAgIGNsb3NldGltZXIgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYpIHNlbGYuY2xvc2UoKTtcbiAgICAgICAgICAgIH0sIG9wdHMuYXV0b2Nsb3NlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZyb250IHBhbmVsIG9uIG1vdXNlZG93blxuICAgICAgICB0aGlzLnBvaW50ZXJkb3duLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcihpdGVtLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGlmICghZS50YXJnZXQuY2xvc2VzdCgnLmpzUGFuZWwtYnRuLWNsb3NlJykgJiYgIWUudGFyZ2V0LmNsb3Nlc3QoJy5qc1BhbmVsLWJ0bi1taW5pbWl6ZScpICYmIG9wdHMucGFuZWx0eXBlID09PSAnc3RhbmRhcmQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZnJvbnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIG9wdGlvbi5vbndpbmRvd3Jlc2l6ZVxuICAgICAgICBpZiAob3B0cy5vbndpbmRvd3Jlc2l6ZSkge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSB3aW5kb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2VlIGh0dHBzOi8vYnVncy5qcXVlcnl1aS5jb20vdGlja2V0Lzc1MTRcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmFtID0gb3B0cy5vbndpbmRvd3Jlc2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9IHNlbGYuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50U3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoc2VsZi5wYXJlbnROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ21heGltaXplZCcgJiYgcGFyYW0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubWF4aW1pemUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09ICdub3JtYWxpemVkJyB8fCBzdGF0dXMgPT09ICdzbWFsbGlmaWVkJyB8fCBzdGF0dXMgPT09ICdtYXhpbWl6ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHBhcmFtID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW0uY2FsbChzZWxmLCBlLCBzZWxmKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdHlsZS5sZWZ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbCA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuY29udGFpbmVyID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsID0gKGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggLSBwYXJzZUZsb2F0KHNlbGYuc3R5bGUud2lkdGgpKSAqIHNlbGYuaGY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsID0gKHBhcnNlRmxvYXQocGFyZW50U3R5bGVzLndpZHRoKSAtIHBhcnNlRmxvYXQoc2VsZi5zdHlsZS53aWR0aCkpICogc2VsZi5oZjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbCA8PSAwID8gMCA6IGwgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0eWxlLnRvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmNvbnRhaW5lciA9PT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdCA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLSBwYXJzZUZsb2F0KHNlbGYuY3VycmVudERhdGEuaGVpZ2h0KSkgKiBzZWxmLnZmO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdCA9IChwYXJzZUZsb2F0KHBhcmVudFN0eWxlcy5oZWlnaHQpIC0gcGFyc2VGbG9hdChzZWxmLmN1cnJlbnREYXRhLmhlaWdodCkpICogc2VsZi52ZjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdCA8PSAwID8gMCA6IHQgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdpdGhvdXQgdGhpcyBoYW5kbGVyIGNvbnRlbnQgc2VjdGlvbiB3b3VsZCBoYXZlIHBvaW50ZXJFdmVudHMgPSBub25lIHdoZW4gY2xpY2tpbmcgaGVhZGVyIHNlY3Rpb24gKHNlZSBkcmFnaXQpXG4gICAgICAgIHRoaXMucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcihpdGVtLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jb250ZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnaW5oZXJpdCc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gb3B0aW9uLmNhbGxiYWNrXG4gICAgICAgIGlmIChvcHRzLmNhbGxiYWNrICYmIEFycmF5LmlzQXJyYXkob3B0cy5jYWxsYmFjaykpIHtcbiAgICAgICAgICAgIG9wdHMuY2FsbGJhY2suZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdHMuY2FsbGJhY2spIHtcbiAgICAgICAgICAgIG9wdHMuY2FsbGJhY2suY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnN0cnV0b3IgY2FsbGJhY2tcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICBjYi5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsbG9hZGVkKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfVxufTtcblxuLy8gaW5pdGlhbGl6ZSB6LWluZGV4IGdlbmVyYXRvciAobmVlZHMgdG8gYmUgc2VwZXJhdGUgYmVjYXVzZSBqc1BhbmVsIGlzIG5vdCBkZWZpbmVkIHlldCB3aGVuIHB1dHRpbmcgaXQgaW5zaWRlIGpzUGFuZWwgPSB7IC4uLiB9KVxuanNQYW5lbC56aSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3RhcnRWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoganNQYW5lbC56aUJhc2U7XG5cbiAgICB2YXIgdmFsID0gc3RhcnRWYWx1ZTtcbiAgICByZXR1cm4ge1xuICAgICAgICBuZXh0OiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbCsrO1xuICAgICAgICB9XG4gICAgfTtcbn0oKTtcblxuaWYgKHdpbmRvdy5Qb2ludGVyRXZlbnQpIHtcbiAgICBqc1BhbmVsLnBvaW50ZXJkb3duID0gWydwb2ludGVyZG93biddO1xuICAgIGpzUGFuZWwucG9pbnRlcm1vdmUgPSBbJ3BvaW50ZXJtb3ZlJ107XG4gICAganNQYW5lbC5wb2ludGVydXAgPSBbJ3BvaW50ZXJ1cCddO1xufSBlbHNlIHtcbiAgICBpZiAoJ29udG91Y2hlbmQnIGluIHdpbmRvdykge1xuICAgICAgICBqc1BhbmVsLnBvaW50ZXJkb3duID0gWyd0b3VjaHN0YXJ0JywgJ21vdXNlZG93biddO1xuICAgICAgICBqc1BhbmVsLnBvaW50ZXJtb3ZlID0gWyd0b3VjaG1vdmUnLCAnbW91c2Vtb3ZlJ107XG4gICAgICAgIGpzUGFuZWwucG9pbnRlcnVwID0gWyd0b3VjaGVuZCcsICdtb3VzZXVwJ107XG4gICAgfSBlbHNlIHtcbiAgICAgICAganNQYW5lbC5wb2ludGVyZG93biA9IFsnbW91c2Vkb3duJ107XG4gICAgICAgIGpzUGFuZWwucG9pbnRlcm1vdmUgPSBbJ21vdXNlbW92ZSddO1xuICAgICAgICBqc1BhbmVsLnBvaW50ZXJ1cCA9IFsnbW91c2V1cCddO1xuICAgIH1cbn1cblxuLy8gY2xvc2VPbkVzY2FwZVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJyB8fCBlLmNvZGUgPT09ICdFc2MnIHx8IGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAganNQYW5lbC5nZXRQYW5lbHMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdqc1BhbmVsJyk7XG4gICAgICAgIH0pLnNvbWUoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIGlmIChpdGVtLm9wdGlvbnMuY2xvc2VPbkVzY2FwZSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xvc2UoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxufSwgZmFsc2UpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZGV2dG9vbHMvd2ViL2pzcGFuZWwuanNcbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2RldnRvb2xzL3dlYi9qc3BhbmVsLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFVQUFBQ0ZDQVlBQUFDVDN6STlBQUFBQm1KTFIwUUEvd0QvQVArZ3ZhZVRBQUFBQ1hCSVdYTUFBQXNUQUFBTEV3RUFtcHdZQUFBQUIzUkpUVVVINFFRZUNoNEFqVnhlNGdBQUFCbDBSVmgwUTI5dGJXVnVkQUJEY21WaGRHVmtJSGRwZEdnZ1IwbE5VRmVCRGhjQUFBQStTVVJCVkVqSFkyUmdZUGpQZ0FWZ0NESmhVOFdFUy9VSTBNNklwcEp4Tk9qSURUb3liUjhWSEJVY01vS2phWDVVY0RUTmoxYVJvNjJMQVdsZEFBQzhFQzJ0QUVCWVhBQUFBQUJKUlU1RXJrSmdnZz09XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9kZXZ0b29scy93ZWIvcnVsZXIucG5nXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9kZXZ0b29scy93ZWIvcnVsZXIucG5nXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IFRlc3REZXZpY2VNYW5hZ2VyUGFuZWwgfSBmcm9tIFwiLi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsXCI7XG5pbXBvcnQgeyBMb2dQYW5lbCB9IGZyb20gXCIuL0xvZ1BhbmVsXCI7XG5pbXBvcnQgeyBCdXR0cGx1Z1NlcnZlciB9IGZyb20gXCIuLi8uLi9pbmRleFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gQ3JlYXRlTG9nZ2VyUGFuZWwoKSB7XG4gIExvZ1BhbmVsLlNob3dMb2dQYW5lbCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQ3JlYXRlRGV2aWNlTWFuYWdlclBhbmVsKGJ1dHRwbHVnU2VydmVyOiBCdXR0cGx1Z1NlcnZlcikge1xuICBUZXN0RGV2aWNlTWFuYWdlclBhbmVsLlNob3dUZXN0RGV2aWNlTWFuYWdlclBhbmVsKGJ1dHRwbHVnU2VydmVyKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kZXZ0b29scy93ZWIvdXRpbHMud2ViLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==