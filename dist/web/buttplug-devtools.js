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
    constructor(name, shouldVibrate = false, shouldLinear = false) {
        super(`Test Device - ${name}`, "TestDevice" + (shouldVibrate ? "Vibrate" : "") + (shouldLinear ? "Linear" : ""));
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
        this._testVibrationDevice = new TestDevice_1.TestDevice("Test Vibration Device", true, false);
        this._testLinearDevice = new TestDevice_1.TestDevice("Test Linear Device", false, true);
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
    StartScanning() {
        index_1.ButtplugLogger.Logger.Debug("TestDeviceManager: Starting Scan");
        this._isScanning = true;
        // Always emit devices. If they're duplicates, the device manager will weed
        // them out.
        setTimeout(() => {
            this.ConnectVibrationDevice();
            this.ConnectLinearDevice();
        }, 50);
        setTimeout(() => this.StopScanning(), 100);
    }
    get VibrationDevice() {
        return this._testVibrationDevice;
    }
    get LinearDevice() {
        return this._testLinearDevice;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5Mzg2NzAwYWI5Y2ZlYTdkYjFjYyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJCdXR0cGx1Z1wiIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AdHdlZW5qcy90d2Vlbi5qcy9zcmMvVHdlZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvanNwYW5lbC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RldnRvb2xzL3dlYi9Mb2dQYW5lbC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RldnRvb2xzL3dlYi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL3VybC9lc2NhcGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvZm9udHMvanNnbHlwaC5lb3QiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvZm9udHMvanNnbHlwaC5zdmciLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvZm9udHMvanNnbHlwaC50dGYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvZm9udHMvanNnbHlwaC53b2ZmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9kaXN0L2pzcGFuZWwuY3NzPzQzZDIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZGV2dG9vbHMvVGVzdERldmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGV2dG9vbHMvVGVzdERldmljZU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RldnRvb2xzL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9kZXZ0b29scy93ZWIvTG9nUGFuZWwuY3NzP2IxYTUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RldnRvb2xzL3dlYi9Mb2dQYW5lbC5odG1sIiwid2VicGFjazovLy8uL3NyYy9kZXZ0b29scy93ZWIvTG9nUGFuZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RldnRvb2xzL3dlYi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmNzcz9kNjk4Iiwid2VicGFjazovLy8uL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC5odG1sIiwid2VicGFjazovLy8uL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGV2dG9vbHMvd2ViL2ZsZXNobGlnaHQucG5nIiwid2VicGFjazovLy8uL3NyYy9kZXZ0b29scy93ZWIvaHVzaC5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2RldnRvb2xzL3dlYi9pbmRleC53ZWIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RldnRvb2xzL3dlYi9qc3BhbmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9kZXZ0b29scy93ZWIvcnVsZXIucG5nIiwid2VicGFjazovLy8uL3NyYy9kZXZ0b29scy93ZWIvdXRpbHMud2ViLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDN0RBLDBCOzs7Ozs7OytDQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUgsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IscUJBQXFCOztBQUV2Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsdUNBQXVDO0FBQ3ZDOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUEsZ0VBQWdFLHNCQUFzQjtBQUN0RjtBQUNBOztBQUVBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLElBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUEsSUFBSTs7QUFFSjs7QUFFQTtBQUNBOztBQUVBLGtFQUFrRSxzQkFBc0I7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixRQUFRO0FBQ3pCO0FBQ0E7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtB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O0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSCxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUM3U0EscURBQXFELGd6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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0IsaUNBQWlDO0FBQ3ZELEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxrQkFBa0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCLDJFQUEyRTtBQUNuRztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvREFBb0QsSUFBSSxFQUFFLEVBQUUsTUFBTSxJQUFJO0FBQ3RFO0FBQ0EscUVBQXFFLElBQUk7QUFDekU7O0FBRUE7QUFDQSw0QkFBNEI7QUFDNUIsYUFBYTtBQUNiLDRCQUE0QjtBQUM1Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMENBQTBDO0FBQzFDLFNBQVM7QUFDVCwwQ0FBMEM7QUFDMUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Es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QTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0VBQXNFO0FBQ3RFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFD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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJIQUEySCxNQUFNO0FBQ2pJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLENBQUM7Ozs7Ozs7O0FDbnlHRCxpQ0FBaUMsd1M7Ozs7Ozs7Ozs7QUNBakMscUdBQWtFO0FBQ2xFLHlFQUFzQztBQUd0QztJQUNFLG1CQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7QUFDMUIsQ0FBQztBQUZELDhDQUVDO0FBRUQsa0NBQXlDLGNBQThCO0lBQ3JFLCtDQUFzQixDQUFDLDBCQUEwQixDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3BFLENBQUM7QUFGRCw0REFFQyIsImZpbGUiOiJidXR0cGx1Zy1kZXZ0b29scy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImJ1dHRwbHVnLWRldnRvb2xzLWNvbW1vbmpzXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkJ1dHRwbHVnRGV2VG9vbHNcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvZGV2dG9vbHMvd2ViL2luZGV4LndlYi50c1wiKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA5Mzg2NzAwYWI5Y2ZlYTdkYjFjYyIsIm1vZHVsZS5leHBvcnRzID0gQnV0dHBsdWc7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJCdXR0cGx1Z1wiXG4vLyBtb2R1bGUgaWQgPSAuLi9pbmRleFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIFR3ZWVuLmpzIC0gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vdHdlZW5qcy90d2Vlbi5qc1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICpcbiAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdHdlZW5qcy90d2Vlbi5qcy9ncmFwaHMvY29udHJpYnV0b3JzIGZvciB0aGUgZnVsbCBsaXN0IG9mIGNvbnRyaWJ1dG9ycy5cbiAqIFRoYW5rIHlvdSBhbGwsIHlvdSdyZSBhd2Vzb21lIVxuICovXG5cblxudmFyIF9Hcm91cCA9IGZ1bmN0aW9uICgpIHtcblx0dGhpcy5fdHdlZW5zID0ge307XG5cdHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlID0ge307XG59O1xuXG5fR3JvdXAucHJvdG90eXBlID0ge1xuXHRnZXRBbGw6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl90d2VlbnMpLm1hcChmdW5jdGlvbiAodHdlZW5JZCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX3R3ZWVuc1t0d2VlbklkXTtcblx0XHR9LmJpbmQodGhpcykpO1xuXG5cdH0sXG5cblx0cmVtb3ZlQWxsOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLl90d2VlbnMgPSB7fTtcblxuXHR9LFxuXG5cdGFkZDogZnVuY3Rpb24gKHR3ZWVuKSB7XG5cblx0XHR0aGlzLl90d2VlbnNbdHdlZW4uZ2V0SWQoKV0gPSB0d2Vlbjtcblx0XHR0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZVt0d2Vlbi5nZXRJZCgpXSA9IHR3ZWVuO1xuXG5cdH0sXG5cblx0cmVtb3ZlOiBmdW5jdGlvbiAodHdlZW4pIHtcblxuXHRcdGRlbGV0ZSB0aGlzLl90d2VlbnNbdHdlZW4uZ2V0SWQoKV07XG5cdFx0ZGVsZXRlIHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlW3R3ZWVuLmdldElkKCldO1xuXG5cdH0sXG5cblx0dXBkYXRlOiBmdW5jdGlvbiAodGltZSwgcHJlc2VydmUpIHtcblxuXHRcdHZhciB0d2VlbklkcyA9IE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVucyk7XG5cblx0XHRpZiAodHdlZW5JZHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0dGltZSA9IHRpbWUgIT09IHVuZGVmaW5lZCA/IHRpbWUgOiBUV0VFTi5ub3coKTtcblxuXHRcdC8vIFR3ZWVucyBhcmUgdXBkYXRlZCBpbiBcImJhdGNoZXNcIi4gSWYgeW91IGFkZCBhIG5ldyB0d2VlbiBkdXJpbmcgYW4gdXBkYXRlLCB0aGVuIHRoZVxuXHRcdC8vIG5ldyB0d2VlbiB3aWxsIGJlIHVwZGF0ZWQgaW4gdGhlIG5leHQgYmF0Y2guXG5cdFx0Ly8gSWYgeW91IHJlbW92ZSBhIHR3ZWVuIGR1cmluZyBhbiB1cGRhdGUsIGl0IG1heSBvciBtYXkgbm90IGJlIHVwZGF0ZWQuIEhvd2V2ZXIsXG5cdFx0Ly8gaWYgdGhlIHJlbW92ZWQgdHdlZW4gd2FzIGFkZGVkIGR1cmluZyB0aGUgY3VycmVudCBiYXRjaCwgdGhlbiBpdCB3aWxsIG5vdCBiZSB1cGRhdGVkLlxuXHRcdHdoaWxlICh0d2Vlbklkcy5sZW5ndGggPiAwKSB7XG5cdFx0XHR0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZSA9IHt9O1xuXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHR3ZWVuSWRzLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRcdFx0dmFyIHR3ZWVuID0gdGhpcy5fdHdlZW5zW3R3ZWVuSWRzW2ldXTtcblxuXHRcdFx0XHRpZiAodHdlZW4gJiYgdHdlZW4udXBkYXRlKHRpbWUpID09PSBmYWxzZSkge1xuXHRcdFx0XHRcdHR3ZWVuLl9pc1BsYXlpbmcgPSBmYWxzZTtcblxuXHRcdFx0XHRcdGlmICghcHJlc2VydmUpIHtcblx0XHRcdFx0XHRcdGRlbGV0ZSB0aGlzLl90d2VlbnNbdHdlZW5JZHNbaV1dO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR0d2VlbklkcyA9IE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblxuXHR9XG59O1xuXG52YXIgVFdFRU4gPSBuZXcgX0dyb3VwKCk7XG5cblRXRUVOLkdyb3VwID0gX0dyb3VwO1xuVFdFRU4uX25leHRJZCA9IDA7XG5UV0VFTi5uZXh0SWQgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiBUV0VFTi5fbmV4dElkKys7XG59O1xuXG5cbi8vIEluY2x1ZGUgYSBwZXJmb3JtYW5jZS5ub3cgcG9seWZpbGwuXG4vLyBJbiBub2RlLmpzLCB1c2UgcHJvY2Vzcy5ocnRpbWUuXG5pZiAodHlwZW9mICh3aW5kb3cpID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgKHByb2Nlc3MpICE9PSAndW5kZWZpbmVkJykge1xuXHRUV0VFTi5ub3cgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHRpbWUgPSBwcm9jZXNzLmhydGltZSgpO1xuXG5cdFx0Ly8gQ29udmVydCBbc2Vjb25kcywgbmFub3NlY29uZHNdIHRvIG1pbGxpc2Vjb25kcy5cblx0XHRyZXR1cm4gdGltZVswXSAqIDEwMDAgKyB0aW1lWzFdIC8gMTAwMDAwMDtcblx0fTtcbn1cbi8vIEluIGEgYnJvd3NlciwgdXNlIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cgaWYgaXQgaXMgYXZhaWxhYmxlLlxuZWxzZSBpZiAodHlwZW9mICh3aW5kb3cpICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgd2luZG93LnBlcmZvcm1hbmNlICE9PSB1bmRlZmluZWQgJiZcblx0XHQgd2luZG93LnBlcmZvcm1hbmNlLm5vdyAhPT0gdW5kZWZpbmVkKSB7XG5cdC8vIFRoaXMgbXVzdCBiZSBib3VuZCwgYmVjYXVzZSBkaXJlY3RseSBhc3NpZ25pbmcgdGhpcyBmdW5jdGlvblxuXHQvLyBsZWFkcyB0byBhbiBpbnZvY2F0aW9uIGV4Y2VwdGlvbiBpbiBDaHJvbWUuXG5cdFRXRUVOLm5vdyA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cuYmluZCh3aW5kb3cucGVyZm9ybWFuY2UpO1xufVxuLy8gVXNlIERhdGUubm93IGlmIGl0IGlzIGF2YWlsYWJsZS5cbmVsc2UgaWYgKERhdGUubm93ICE9PSB1bmRlZmluZWQpIHtcblx0VFdFRU4ubm93ID0gRGF0ZS5ub3c7XG59XG4vLyBPdGhlcndpc2UsIHVzZSAnbmV3IERhdGUoKS5nZXRUaW1lKCknLlxuZWxzZSB7XG5cdFRXRUVOLm5vdyA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cdH07XG59XG5cblxuVFdFRU4uVHdlZW4gPSBmdW5jdGlvbiAob2JqZWN0LCBncm91cCkge1xuXHR0aGlzLl9vYmplY3QgPSBvYmplY3Q7XG5cdHRoaXMuX3ZhbHVlc1N0YXJ0ID0ge307XG5cdHRoaXMuX3ZhbHVlc0VuZCA9IHt9O1xuXHR0aGlzLl92YWx1ZXNTdGFydFJlcGVhdCA9IHt9O1xuXHR0aGlzLl9kdXJhdGlvbiA9IDEwMDA7XG5cdHRoaXMuX3JlcGVhdCA9IDA7XG5cdHRoaXMuX3JlcGVhdERlbGF5VGltZSA9IHVuZGVmaW5lZDtcblx0dGhpcy5feW95byA9IGZhbHNlO1xuXHR0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcblx0dGhpcy5fcmV2ZXJzZWQgPSBmYWxzZTtcblx0dGhpcy5fZGVsYXlUaW1lID0gMDtcblx0dGhpcy5fc3RhcnRUaW1lID0gbnVsbDtcblx0dGhpcy5fZWFzaW5nRnVuY3Rpb24gPSBUV0VFTi5FYXNpbmcuTGluZWFyLk5vbmU7XG5cdHRoaXMuX2ludGVycG9sYXRpb25GdW5jdGlvbiA9IFRXRUVOLkludGVycG9sYXRpb24uTGluZWFyO1xuXHR0aGlzLl9jaGFpbmVkVHdlZW5zID0gW107XG5cdHRoaXMuX29uU3RhcnRDYWxsYmFjayA9IG51bGw7XG5cdHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gZmFsc2U7XG5cdHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sgPSBudWxsO1xuXHR0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgPSBudWxsO1xuXHR0aGlzLl9vblN0b3BDYWxsYmFjayA9IG51bGw7XG5cdHRoaXMuX2dyb3VwID0gZ3JvdXAgfHwgVFdFRU47XG5cdHRoaXMuX2lkID0gVFdFRU4ubmV4dElkKCk7XG5cbn07XG5cblRXRUVOLlR3ZWVuLnByb3RvdHlwZSA9IHtcblx0Z2V0SWQ6IGZ1bmN0aW9uIGdldElkKCkge1xuXHRcdHJldHVybiB0aGlzLl9pZDtcblx0fSxcblxuXHRpc1BsYXlpbmc6IGZ1bmN0aW9uIGlzUGxheWluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5faXNQbGF5aW5nO1xuXHR9LFxuXG5cdHRvOiBmdW5jdGlvbiB0byhwcm9wZXJ0aWVzLCBkdXJhdGlvbikge1xuXG5cdFx0dGhpcy5fdmFsdWVzRW5kID0gcHJvcGVydGllcztcblxuXHRcdGlmIChkdXJhdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLl9kdXJhdGlvbiA9IGR1cmF0aW9uO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c3RhcnQ6IGZ1bmN0aW9uIHN0YXJ0KHRpbWUpIHtcblxuXHRcdHRoaXMuX2dyb3VwLmFkZCh0aGlzKTtcblxuXHRcdHRoaXMuX2lzUGxheWluZyA9IHRydWU7XG5cblx0XHR0aGlzLl9vblN0YXJ0Q2FsbGJhY2tGaXJlZCA9IGZhbHNlO1xuXG5cdFx0dGhpcy5fc3RhcnRUaW1lID0gdGltZSAhPT0gdW5kZWZpbmVkID8gdHlwZW9mIHRpbWUgPT09ICdzdHJpbmcnID8gVFdFRU4ubm93KCkgKyBwYXJzZUZsb2F0KHRpbWUpIDogdGltZSA6IFRXRUVOLm5vdygpO1xuXHRcdHRoaXMuX3N0YXJ0VGltZSArPSB0aGlzLl9kZWxheVRpbWU7XG5cblx0XHRmb3IgKHZhciBwcm9wZXJ0eSBpbiB0aGlzLl92YWx1ZXNFbmQpIHtcblxuXHRcdFx0Ly8gQ2hlY2sgaWYgYW4gQXJyYXkgd2FzIHByb3ZpZGVkIGFzIHByb3BlcnR5IHZhbHVlXG5cdFx0XHRpZiAodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSBpbnN0YW5jZW9mIEFycmF5KSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0ubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBDcmVhdGUgYSBsb2NhbCBjb3B5IG9mIHRoZSBBcnJheSB3aXRoIHRoZSBzdGFydCB2YWx1ZSBhdCB0aGUgZnJvbnRcblx0XHRcdFx0dGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSA9IFt0aGlzLl9vYmplY3RbcHJvcGVydHldXS5jb25jYXQodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSk7XG5cblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgYHRvKClgIHNwZWNpZmllcyBhIHByb3BlcnR5IHRoYXQgZG9lc24ndCBleGlzdCBpbiB0aGUgc291cmNlIG9iamVjdCxcblx0XHRcdC8vIHdlIHNob3VsZCBub3Qgc2V0IHRoYXQgcHJvcGVydHkgaW4gdGhlIG9iamVjdFxuXHRcdFx0aWYgKHRoaXMuX29iamVjdFtwcm9wZXJ0eV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2F2ZSB0aGUgc3RhcnRpbmcgdmFsdWUuXG5cdFx0XHR0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gPSB0aGlzLl9vYmplY3RbcHJvcGVydHldO1xuXG5cdFx0XHRpZiAoKHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSBpbnN0YW5jZW9mIEFycmF5KSA9PT0gZmFsc2UpIHtcblx0XHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldICo9IDEuMDsgLy8gRW5zdXJlcyB3ZSdyZSB1c2luZyBudW1iZXJzLCBub3Qgc3RyaW5nc1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gPSB0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gfHwgMDtcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c3RvcDogZnVuY3Rpb24gc3RvcCgpIHtcblxuXHRcdGlmICghdGhpcy5faXNQbGF5aW5nKSB7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHR0aGlzLl9ncm91cC5yZW1vdmUodGhpcyk7XG5cdFx0dGhpcy5faXNQbGF5aW5nID0gZmFsc2U7XG5cblx0XHRpZiAodGhpcy5fb25TdG9wQ2FsbGJhY2sgIT09IG51bGwpIHtcblx0XHRcdHRoaXMuX29uU3RvcENhbGxiYWNrKHRoaXMuX29iamVjdCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5zdG9wQ2hhaW5lZFR3ZWVucygpO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZW5kOiBmdW5jdGlvbiBlbmQoKSB7XG5cblx0XHR0aGlzLnVwZGF0ZSh0aGlzLl9zdGFydFRpbWUgKyB0aGlzLl9kdXJhdGlvbik7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzdG9wQ2hhaW5lZFR3ZWVuczogZnVuY3Rpb24gc3RvcENoYWluZWRUd2VlbnMoKSB7XG5cblx0XHRmb3IgKHZhciBpID0gMCwgbnVtQ2hhaW5lZFR3ZWVucyA9IHRoaXMuX2NoYWluZWRUd2VlbnMubGVuZ3RoOyBpIDwgbnVtQ2hhaW5lZFR3ZWVuczsgaSsrKSB7XG5cdFx0XHR0aGlzLl9jaGFpbmVkVHdlZW5zW2ldLnN0b3AoKTtcblx0XHR9XG5cblx0fSxcblxuXHRncm91cDogZnVuY3Rpb24gZ3JvdXAoZ3JvdXApIHtcblx0XHR0aGlzLl9ncm91cCA9IGdyb3VwO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdGRlbGF5OiBmdW5jdGlvbiBkZWxheShhbW91bnQpIHtcblxuXHRcdHRoaXMuX2RlbGF5VGltZSA9IGFtb3VudDtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHJlcGVhdDogZnVuY3Rpb24gcmVwZWF0KHRpbWVzKSB7XG5cblx0XHR0aGlzLl9yZXBlYXQgPSB0aW1lcztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHJlcGVhdERlbGF5OiBmdW5jdGlvbiByZXBlYXREZWxheShhbW91bnQpIHtcblxuXHRcdHRoaXMuX3JlcGVhdERlbGF5VGltZSA9IGFtb3VudDtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHlveW86IGZ1bmN0aW9uIHlveW8oeXkpIHtcblxuXHRcdHRoaXMuX3lveW8gPSB5eTtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGVhc2luZzogZnVuY3Rpb24gZWFzaW5nKGVhcykge1xuXG5cdFx0dGhpcy5fZWFzaW5nRnVuY3Rpb24gPSBlYXM7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRpbnRlcnBvbGF0aW9uOiBmdW5jdGlvbiBpbnRlcnBvbGF0aW9uKGludGVyKSB7XG5cblx0XHR0aGlzLl9pbnRlcnBvbGF0aW9uRnVuY3Rpb24gPSBpbnRlcjtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNoYWluOiBmdW5jdGlvbiBjaGFpbigpIHtcblxuXHRcdHRoaXMuX2NoYWluZWRUd2VlbnMgPSBhcmd1bWVudHM7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRvblN0YXJ0OiBmdW5jdGlvbiBvblN0YXJ0KGNhbGxiYWNrKSB7XG5cblx0XHR0aGlzLl9vblN0YXJ0Q2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG9uVXBkYXRlOiBmdW5jdGlvbiBvblVwZGF0ZShjYWxsYmFjaykge1xuXG5cdFx0dGhpcy5fb25VcGRhdGVDYWxsYmFjayA9IGNhbGxiYWNrO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0b25Db21wbGV0ZTogZnVuY3Rpb24gb25Db21wbGV0ZShjYWxsYmFjaykge1xuXG5cdFx0dGhpcy5fb25Db21wbGV0ZUNhbGxiYWNrID0gY2FsbGJhY2s7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRvblN0b3A6IGZ1bmN0aW9uIG9uU3RvcChjYWxsYmFjaykge1xuXG5cdFx0dGhpcy5fb25TdG9wQ2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKHRpbWUpIHtcblxuXHRcdHZhciBwcm9wZXJ0eTtcblx0XHR2YXIgZWxhcHNlZDtcblx0XHR2YXIgdmFsdWU7XG5cblx0XHRpZiAodGltZSA8IHRoaXMuX3N0YXJ0VGltZSkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID09PSBmYWxzZSkge1xuXG5cdFx0XHRpZiAodGhpcy5fb25TdGFydENhbGxiYWNrICE9PSBudWxsKSB7XG5cdFx0XHRcdHRoaXMuX29uU3RhcnRDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9vblN0YXJ0Q2FsbGJhY2tGaXJlZCA9IHRydWU7XG5cdFx0fVxuXG5cdFx0ZWxhcHNlZCA9ICh0aW1lIC0gdGhpcy5fc3RhcnRUaW1lKSAvIHRoaXMuX2R1cmF0aW9uO1xuXHRcdGVsYXBzZWQgPSAodGhpcy5fZHVyYXRpb24gPT09IDAgfHwgZWxhcHNlZCA+IDEpID8gMSA6IGVsYXBzZWQ7XG5cblx0XHR2YWx1ZSA9IHRoaXMuX2Vhc2luZ0Z1bmN0aW9uKGVsYXBzZWQpO1xuXG5cdFx0Zm9yIChwcm9wZXJ0eSBpbiB0aGlzLl92YWx1ZXNFbmQpIHtcblxuXHRcdFx0Ly8gRG9uJ3QgdXBkYXRlIHByb3BlcnRpZXMgdGhhdCBkbyBub3QgZXhpc3QgaW4gdGhlIHNvdXJjZSBvYmplY3Rcblx0XHRcdGlmICh0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHN0YXJ0ID0gdGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldIHx8IDA7XG5cdFx0XHR2YXIgZW5kID0gdGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XTtcblxuXHRcdFx0aWYgKGVuZCBpbnN0YW5jZW9mIEFycmF5KSB7XG5cblx0XHRcdFx0dGhpcy5fb2JqZWN0W3Byb3BlcnR5XSA9IHRoaXMuX2ludGVycG9sYXRpb25GdW5jdGlvbihlbmQsIHZhbHVlKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHQvLyBQYXJzZXMgcmVsYXRpdmUgZW5kIHZhbHVlcyB3aXRoIHN0YXJ0IGFzIGJhc2UgKGUuZy46ICsxMCwgLTMpXG5cdFx0XHRcdGlmICh0eXBlb2YgKGVuZCkgPT09ICdzdHJpbmcnKSB7XG5cblx0XHRcdFx0XHRpZiAoZW5kLmNoYXJBdCgwKSA9PT0gJysnIHx8IGVuZC5jaGFyQXQoMCkgPT09ICctJykge1xuXHRcdFx0XHRcdFx0ZW5kID0gc3RhcnQgKyBwYXJzZUZsb2F0KGVuZCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGVuZCA9IHBhcnNlRmxvYXQoZW5kKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBQcm90ZWN0IGFnYWluc3Qgbm9uIG51bWVyaWMgcHJvcGVydGllcy5cblx0XHRcdFx0aWYgKHR5cGVvZiAoZW5kKSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0XHR0aGlzLl9vYmplY3RbcHJvcGVydHldID0gc3RhcnQgKyAoZW5kIC0gc3RhcnQpICogdmFsdWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sgIT09IG51bGwpIHtcblx0XHRcdHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sodGhpcy5fb2JqZWN0KTtcblx0XHR9XG5cblx0XHRpZiAoZWxhcHNlZCA9PT0gMSkge1xuXG5cdFx0XHRpZiAodGhpcy5fcmVwZWF0ID4gMCkge1xuXG5cdFx0XHRcdGlmIChpc0Zpbml0ZSh0aGlzLl9yZXBlYXQpKSB7XG5cdFx0XHRcdFx0dGhpcy5fcmVwZWF0LS07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBSZWFzc2lnbiBzdGFydGluZyB2YWx1ZXMsIHJlc3RhcnQgYnkgbWFraW5nIHN0YXJ0VGltZSA9IG5vd1xuXHRcdFx0XHRmb3IgKHByb3BlcnR5IGluIHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0KSB7XG5cblx0XHRcdFx0XHRpZiAodHlwZW9mICh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldKSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSArIHBhcnNlRmxvYXQodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHRoaXMuX3lveW8pIHtcblx0XHRcdFx0XHRcdHZhciB0bXAgPSB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV07XG5cblx0XHRcdFx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV07XG5cdFx0XHRcdFx0XHR0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldID0gdG1wO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuX3lveW8pIHtcblx0XHRcdFx0XHR0aGlzLl9yZXZlcnNlZCA9ICF0aGlzLl9yZXZlcnNlZDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLl9yZXBlYXREZWxheVRpbWUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdHRoaXMuX3N0YXJ0VGltZSA9IHRpbWUgKyB0aGlzLl9yZXBlYXREZWxheVRpbWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fc3RhcnRUaW1lID0gdGltZSArIHRoaXMuX2RlbGF5VGltZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgIT09IG51bGwpIHtcblxuXHRcdFx0XHRcdHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIG51bUNoYWluZWRUd2VlbnMgPSB0aGlzLl9jaGFpbmVkVHdlZW5zLmxlbmd0aDsgaSA8IG51bUNoYWluZWRUd2VlbnM7IGkrKykge1xuXHRcdFx0XHRcdC8vIE1ha2UgdGhlIGNoYWluZWQgdHdlZW5zIHN0YXJ0IGV4YWN0bHkgYXQgdGhlIHRpbWUgdGhleSBzaG91bGQsXG5cdFx0XHRcdFx0Ly8gZXZlbiBpZiB0aGUgYHVwZGF0ZSgpYCBtZXRob2Qgd2FzIGNhbGxlZCB3YXkgcGFzdCB0aGUgZHVyYXRpb24gb2YgdGhlIHR3ZWVuXG5cdFx0XHRcdFx0dGhpcy5fY2hhaW5lZFR3ZWVuc1tpXS5zdGFydCh0aGlzLl9zdGFydFRpbWUgKyB0aGlzLl9kdXJhdGlvbik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXG5cdH1cbn07XG5cblxuVFdFRU4uRWFzaW5nID0ge1xuXG5cdExpbmVhcjoge1xuXG5cdFx0Tm9uZTogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGs7XG5cblx0XHR9XG5cblx0fSxcblxuXHRRdWFkcmF0aWM6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqIGs7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqICgyIC0gayk7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIDAuNSAqIGsgKiBrO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gLSAwLjUgKiAoLS1rICogKGsgLSAyKSAtIDEpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Q3ViaWM6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqIGsgKiBrO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIC0tayAqIGsgKiBrICsgMTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGsgKiBrO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKChrIC09IDIpICogayAqIGsgKyAyKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdFF1YXJ0aWM6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqIGsgKiBrICogaztcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAxIC0gKC0tayAqIGsgKiBrICogayk7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIDAuNSAqIGsgKiBrICogayAqIGs7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAtIDAuNSAqICgoayAtPSAyKSAqIGsgKiBrICogayAtIDIpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0UXVpbnRpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogayAqIGsgKiBrICogaztcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAtLWsgKiBrICogayAqIGsgKiBrICsgMTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGsgKiBrICogayAqIGs7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwLjUgKiAoKGsgLT0gMikgKiBrICogayAqIGsgKiBrICsgMik7XG5cblx0XHR9XG5cblx0fSxcblxuXHRTaW51c29pZGFsOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDEgLSBNYXRoLmNvcyhrICogTWF0aC5QSSAvIDIpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIE1hdGguc2luKGsgKiBNYXRoLlBJIC8gMik7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAwLjUgKiAoMSAtIE1hdGguY29zKE1hdGguUEkgKiBrKSk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRFeHBvbmVudGlhbDoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrID09PSAwID8gMCA6IE1hdGgucG93KDEwMjQsIGsgLSAxKTtcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrID09PSAxID8gMSA6IDEgLSBNYXRoLnBvdygyLCAtIDEwICogayk7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrID09PSAwKSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoayA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogTWF0aC5wb3coMTAyNCwgayAtIDEpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKC0gTWF0aC5wb3coMiwgLSAxMCAqIChrIC0gMSkpICsgMik7XG5cblx0XHR9XG5cblx0fSxcblxuXHRDaXJjdWxhcjoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAxIC0gTWF0aC5zcXJ0KDEgLSBrICogayk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gTWF0aC5zcXJ0KDEgLSAoLS1rICogaykpO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAtIDAuNSAqIChNYXRoLnNxcnQoMSAtIGsgKiBrKSAtIDEpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKE1hdGguc3FydCgxIC0gKGsgLT0gMikgKiBrKSArIDEpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0RWxhc3RpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrID09PSAwKSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoayA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIC1NYXRoLnBvdygyLCAxMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKGsgPT09IDApIHtcblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gTWF0aC5wb3coMiwgLTEwICogaykgKiBNYXRoLnNpbigoayAtIDAuMSkgKiA1ICogTWF0aC5QSSkgKyAxO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA9PT0gMCkge1xuXHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGsgPT09IDEpIHtcblx0XHRcdFx0cmV0dXJuIDE7XG5cdFx0XHR9XG5cblx0XHRcdGsgKj0gMjtcblxuXHRcdFx0aWYgKGsgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAtMC41ICogTWF0aC5wb3coMiwgMTAgKiAoayAtIDEpKSAqIE1hdGguc2luKChrIC0gMS4xKSAqIDUgKiBNYXRoLlBJKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDAuNSAqIE1hdGgucG93KDIsIC0xMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpICsgMTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdEJhY2s6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHR2YXIgcyA9IDEuNzAxNTg7XG5cblx0XHRcdHJldHVybiBrICogayAqICgocyArIDEpICogayAtIHMpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0dmFyIHMgPSAxLjcwMTU4O1xuXG5cdFx0XHRyZXR1cm4gLS1rICogayAqICgocyArIDEpICogayArIHMpICsgMTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0dmFyIHMgPSAxLjcwMTU4ICogMS41MjU7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIDAuNSAqIChrICogayAqICgocyArIDEpICogayAtIHMpKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDAuNSAqICgoayAtPSAyKSAqIGsgKiAoKHMgKyAxKSAqIGsgKyBzKSArIDIpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Qm91bmNlOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDEgLSBUV0VFTi5FYXNpbmcuQm91bmNlLk91dCgxIC0gayk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA8ICgxIC8gMi43NSkpIHtcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIGsgKiBrO1xuXHRcdFx0fSBlbHNlIGlmIChrIDwgKDIgLyAyLjc1KSkge1xuXHRcdFx0XHRyZXR1cm4gNy41NjI1ICogKGsgLT0gKDEuNSAvIDIuNzUpKSAqIGsgKyAwLjc1O1xuXHRcdFx0fSBlbHNlIGlmIChrIDwgKDIuNSAvIDIuNzUpKSB7XG5cdFx0XHRcdHJldHVybiA3LjU2MjUgKiAoayAtPSAoMi4yNSAvIDIuNzUpKSAqIGsgKyAwLjkzNzU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gNy41NjI1ICogKGsgLT0gKDIuNjI1IC8gMi43NSkpICogayArIDAuOTg0Mzc1O1xuXHRcdFx0fVxuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA8IDAuNSkge1xuXHRcdFx0XHRyZXR1cm4gVFdFRU4uRWFzaW5nLkJvdW5jZS5JbihrICogMikgKiAwLjU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBUV0VFTi5FYXNpbmcuQm91bmNlLk91dChrICogMiAtIDEpICogMC41ICsgMC41O1xuXG5cdFx0fVxuXG5cdH1cblxufTtcblxuVFdFRU4uSW50ZXJwb2xhdGlvbiA9IHtcblxuXHRMaW5lYXI6IGZ1bmN0aW9uICh2LCBrKSB7XG5cblx0XHR2YXIgbSA9IHYubGVuZ3RoIC0gMTtcblx0XHR2YXIgZiA9IG0gKiBrO1xuXHRcdHZhciBpID0gTWF0aC5mbG9vcihmKTtcblx0XHR2YXIgZm4gPSBUV0VFTi5JbnRlcnBvbGF0aW9uLlV0aWxzLkxpbmVhcjtcblxuXHRcdGlmIChrIDwgMCkge1xuXHRcdFx0cmV0dXJuIGZuKHZbMF0sIHZbMV0sIGYpO1xuXHRcdH1cblxuXHRcdGlmIChrID4gMSkge1xuXHRcdFx0cmV0dXJuIGZuKHZbbV0sIHZbbSAtIDFdLCBtIC0gZik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZuKHZbaV0sIHZbaSArIDEgPiBtID8gbSA6IGkgKyAxXSwgZiAtIGkpO1xuXG5cdH0sXG5cblx0QmV6aWVyOiBmdW5jdGlvbiAodiwgaykge1xuXG5cdFx0dmFyIGIgPSAwO1xuXHRcdHZhciBuID0gdi5sZW5ndGggLSAxO1xuXHRcdHZhciBwdyA9IE1hdGgucG93O1xuXHRcdHZhciBibiA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuQmVybnN0ZWluO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPD0gbjsgaSsrKSB7XG5cdFx0XHRiICs9IHB3KDEgLSBrLCBuIC0gaSkgKiBwdyhrLCBpKSAqIHZbaV0gKiBibihuLCBpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYjtcblxuXHR9LFxuXG5cdENhdG11bGxSb206IGZ1bmN0aW9uICh2LCBrKSB7XG5cblx0XHR2YXIgbSA9IHYubGVuZ3RoIC0gMTtcblx0XHR2YXIgZiA9IG0gKiBrO1xuXHRcdHZhciBpID0gTWF0aC5mbG9vcihmKTtcblx0XHR2YXIgZm4gPSBUV0VFTi5JbnRlcnBvbGF0aW9uLlV0aWxzLkNhdG11bGxSb207XG5cblx0XHRpZiAodlswXSA9PT0gdlttXSkge1xuXG5cdFx0XHRpZiAoayA8IDApIHtcblx0XHRcdFx0aSA9IE1hdGguZmxvb3IoZiA9IG0gKiAoMSArIGspKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZuKHZbKGkgLSAxICsgbSkgJSBtXSwgdltpXSwgdlsoaSArIDEpICUgbV0sIHZbKGkgKyAyKSAlIG1dLCBmIC0gaSk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRpZiAoayA8IDApIHtcblx0XHRcdFx0cmV0dXJuIHZbMF0gLSAoZm4odlswXSwgdlswXSwgdlsxXSwgdlsxXSwgLWYpIC0gdlswXSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrID4gMSkge1xuXHRcdFx0XHRyZXR1cm4gdlttXSAtIChmbih2W21dLCB2W21dLCB2W20gLSAxXSwgdlttIC0gMV0sIGYgLSBtKSAtIHZbbV0pO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZm4odltpID8gaSAtIDEgOiAwXSwgdltpXSwgdlttIDwgaSArIDEgPyBtIDogaSArIDFdLCB2W20gPCBpICsgMiA/IG0gOiBpICsgMl0sIGYgLSBpKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdFV0aWxzOiB7XG5cblx0XHRMaW5lYXI6IGZ1bmN0aW9uIChwMCwgcDEsIHQpIHtcblxuXHRcdFx0cmV0dXJuIChwMSAtIHAwKSAqIHQgKyBwMDtcblxuXHRcdH0sXG5cblx0XHRCZXJuc3RlaW46IGZ1bmN0aW9uIChuLCBpKSB7XG5cblx0XHRcdHZhciBmYyA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuRmFjdG9yaWFsO1xuXG5cdFx0XHRyZXR1cm4gZmMobikgLyBmYyhpKSAvIGZjKG4gLSBpKTtcblxuXHRcdH0sXG5cblx0XHRGYWN0b3JpYWw6IChmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHZhciBhID0gWzFdO1xuXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKG4pIHtcblxuXHRcdFx0XHR2YXIgcyA9IDE7XG5cblx0XHRcdFx0aWYgKGFbbl0pIHtcblx0XHRcdFx0XHRyZXR1cm4gYVtuXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvciAodmFyIGkgPSBuOyBpID4gMTsgaS0tKSB7XG5cdFx0XHRcdFx0cyAqPSBpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YVtuXSA9IHM7XG5cdFx0XHRcdHJldHVybiBzO1xuXG5cdFx0XHR9O1xuXG5cdFx0fSkoKSxcblxuXHRcdENhdG11bGxSb206IGZ1bmN0aW9uIChwMCwgcDEsIHAyLCBwMywgdCkge1xuXG5cdFx0XHR2YXIgdjAgPSAocDIgLSBwMCkgKiAwLjU7XG5cdFx0XHR2YXIgdjEgPSAocDMgLSBwMSkgKiAwLjU7XG5cdFx0XHR2YXIgdDIgPSB0ICogdDtcblx0XHRcdHZhciB0MyA9IHQgKiB0MjtcblxuXHRcdFx0cmV0dXJuICgyICogcDEgLSAyICogcDIgKyB2MCArIHYxKSAqIHQzICsgKC0gMyAqIHAxICsgMyAqIHAyIC0gMiAqIHYwIC0gdjEpICogdDIgKyB2MCAqIHQgKyBwMTtcblxuXHRcdH1cblxuXHR9XG5cbn07XG5cbi8vIFVNRCAoVW5pdmVyc2FsIE1vZHVsZSBEZWZpbml0aW9uKVxuKGZ1bmN0aW9uIChyb290KSB7XG5cblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gVFdFRU47XG5cdFx0fSk7XG5cblx0fSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcblxuXHRcdC8vIE5vZGUuanNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IFRXRUVOO1xuXG5cdH0gZWxzZSBpZiAocm9vdCAhPT0gdW5kZWZpbmVkKSB7XG5cblx0XHQvLyBHbG9iYWwgdmFyaWFibGVcblx0XHRyb290LlRXRUVOID0gVFdFRU47XG5cblx0fVxuXG59KSh0aGlzKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0B0d2VlbmpzL3R3ZWVuLmpzL3NyYy9Ud2Vlbi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvQHR3ZWVuanMvdHdlZW4uanMvc3JjL1R3ZWVuLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBlc2NhcGUgPSByZXF1aXJlKFwiLi4vLi4vY3NzLWxvYWRlci9saWIvdXJsL2VzY2FwZS5qc1wiKTtcbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKiBqc3BhbmVsLnNhc3M6IDIwMTctMTItMTMgMTU6MzQgKi9cXG4vKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMwNDIxNTcwL3Nhc3MtdW5pY29kZS1lc2NhcGUtaXMtbm90LXByZXNlcnZlZC1pbi1jc3MtZmlsZSAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdqc2dseXBoJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuL2ZvbnRzL2pzZ2x5cGguZW90XCIpKSArIFwiKTtcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuL2ZvbnRzL2pzZ2x5cGguZW90XCIpKSArIFwiPyNpZWZpeCkgZm9ybWF0KFxcXCJlbWJlZGRlZC1vcGVudHlwZVxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4vZm9udHMvanNnbHlwaC50dGZcIikpICsgXCIpIGZvcm1hdChcXFwidHJ1ZXR5cGVcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuL2ZvbnRzL2pzZ2x5cGgud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi9mb250cy9qc2dseXBoLnN2Z1wiKSkgKyBcIiNqc2dseXBoKSBmb3JtYXQoXFxcInN2Z1xcXCIpOyB9XFxuXFxuLmpzZ2x5cGgge1xcbiAgLyogdXNlICFpbXBvcnRhbnQgdG8gcHJldmVudCBpc3N1ZXMgd2l0aCBicm93c2VyIGV4dGVuc2lvbnMgdGhhdCBjaGFuZ2UgZm9udHMgKi9cXG4gIGZvbnQtZmFtaWx5OiAnanNnbHlwaCcgIWltcG9ydGFudDtcXG4gIHNwZWFrOiBub25lO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGZvbnQtdmFyaWFudDogbm9ybWFsO1xcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxuICBsaW5lLWhlaWdodDogMTtcXG4gIC8qIEJldHRlciBGb250IFJlbmRlcmluZyA9PT09PT09PT09PSAqL1xcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlOyB9XFxuXFxuLmpzZ2x5cGgtY2hldnJvbi1kb3duOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFOTAwXFxcIjsgfVxcblxcbi5qc2dseXBoLWNoZXZyb24tdXA6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEU5MDFcXFwiOyB9XFxuXFxuLmpzZ2x5cGgtY2xvc2U6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEU5MDJcXFwiOyB9XFxuXFxuLmpzZ2x5cGgtbWF4aW1pemU6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEU5MDNcXFwiOyB9XFxuXFxuLmpzZ2x5cGgtbWluaW1pemU6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEU5MDRcXFwiOyB9XFxuXFxuLmpzZ2x5cGgtbm9ybWFsaXplOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFOTA1XFxcIjsgfVxcblxcbi5qc1BhbmVsIHtcXG4gIGJvcmRlcjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxuICBmb250LWZhbWlseTogXFxcIk9wZW4gU2Fuc1xcXCIsXFxcIkhlbHZldGljYSBOZXVlXFxcIixIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBvcGFjaXR5OiAwO1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICB6LWluZGV4OiAxMDA7IH1cXG4gIC5qc1BhbmVsIC5qc1BhbmVsLWhkciB7XFxuICAgIGJvcmRlcjogMDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbiAgICBmb250LWZhbWlseTogXFxcIk9wZW4gU2Fuc1xcXCIsXFxcIkhlbHZldGljYSBOZXVlXFxcIixIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogM3B4O1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogM3B4O1xcbiAgICBmb250LXNpemU6IDE4cHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIG92ZXJmbG93OiBoaWRkZW47IH1cXG4gIC5qc1BhbmVsIC5qc1BhbmVsLWNvbnRlbnQge1xcbiAgICBib3JkZXI6IDA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJPcGVuIFNhbnNcXFwiLFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWY7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIGJhY2tncm91bmQ6ICNmZmZmZmY7XFxuICAgIGNvbG9yOiAjMDAwMDAwO1xcbiAgICBmb250LXNpemU6IDEycHg7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgICAuanNQYW5lbCAuanNQYW5lbC1jb250ZW50IHByZSB7XFxuICAgICAgY29sb3I6IGluaGVyaXQ7IH1cXG4gIC5qc1BhbmVsIC5qc1BhbmVsLWZ0ciB7XFxuICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICAtbXMtZmxleC1wYWNrOiBlbmQ7XFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxuICAgIC1tcy1mbGV4LXdyYXA6IG5vd3JhcDtcXG4gICAgZmxleC13cmFwOiBub3dyYXA7XFxuICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDNweDtcXG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDNweDtcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlMGUwZTA7XFxuICAgIGN1cnNvcjogbW92ZTtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICAgIGJhY2tncm91bmQ6ICNmNWY1ZjU7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIGNvbG9yOiBibGFjaztcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgLmpzUGFuZWwgLmpzUGFuZWwtZnRyLmFjdGl2ZSB7XFxuICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgICBkaXNwbGF5OiBmbGV4OyB9XFxuICAgIC5qc1BhbmVsIC5qc1BhbmVsLWZ0ci5hY3RpdmUgPiAqIHtcXG4gICAgICBtYXJnaW46IDhweDsgfVxcbiAgLmpzUGFuZWwgLmpzUGFuZWwtZnRyLnBhbmVsLWZvb3RlciB7XFxuICAgIHBhZGRpbmc6IDA7IH1cXG5cXG4uanNQYW5lbC1oZWFkZXJiYXIsIC5qc1BhbmVsLWhkci10b29sYmFyIHtcXG4gIGZvbnQtc2l6ZTogMThweDsgfVxcblxcbi5qc1BhbmVsLWhlYWRlcmJhciB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgLW1zLWZsZXgtd3JhcDogbm93cmFwO1xcbiAgZmxleC13cmFwOiBub3dyYXA7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1pbi1oZWlnaHQ6IDM4cHg7IH1cXG4gIC5qc1BhbmVsLWhlYWRlcmJhciBpbWcge1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgICBtYXgtaGVpZ2h0OiAzOHB4OyB9XFxuXFxuLmpzUGFuZWwtdGl0bGViYXIge1xcbiAgLW1zLWZsZXg6IDEgMSBhdXRvO1xcbiAgZmxleDogMSAxIGF1dG87XFxuICBjdXJzb3I6IG1vdmU7XFxuICBtaW4taGVpZ2h0OiAzMnB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgLmpzUGFuZWwtdGl0bGViYXIgaDMge1xcbiAgICBjb2xvcjogIzAwMDAwMDtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJPcGVuIFNhbnNcXFwiLFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWY7XFxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgICBmb250LXNpemU6IDE2cHg7XFxuICAgIGZvbnQtdmFyaWFudDogc21hbGwtY2FwcztcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgbWFyZ2luOiAxMHB4IDVweCAxMHB4IDhweDsgfVxcbiAgICAuanNQYW5lbC10aXRsZWJhciBoMyBzbWFsbCB7XFxuICAgICAgZm9udC1zaXplOiA3NSU7XFxuICAgICAgY29sb3I6IGluaGVyaXQ7IH1cXG5cXG4uanNQYW5lbC10aXRsZWJhci5qc1BhbmVsLXJ0bCBoMyB7XFxuICBmbGV4OiAxIDAgYXV0bzsgfVxcblxcbi5qc1BhbmVsLWNvbnRyb2xiYXIge1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHRvdWNoLWFjdGlvbjogbm9uZTsgfVxcbiAgLmpzUGFuZWwtY29udHJvbGJhciBkaXYgc3Bhbjpob3ZlciwgLmpzUGFuZWwtY29udHJvbGJhciBkaXYgc3ZnOmhvdmVyIHtcXG4gICAgb3BhY2l0eTogLjY7IH1cXG4gIC5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuIHtcXG4gICAgcGFkZGluZzogMCAzcHg7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgdG91Y2gtYWN0aW9uOiBub25lOyB9XFxuICAgIC5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuIHNwYW4ge1xcbiAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IH1cXG4gICAgLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4gc3Bhbi5nbHlwaGljb24ge1xcbiAgICAgIHBhZGRpbmc6IDAgMnB4OyB9XFxuICAgIC5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuIHNwYW4uZmEsIC5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuIHNwYW4uZmFyLCAuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0biBzcGFuLmZhbCB7XFxuICAgICAgcGFkZGluZzogMCA0cHggMCAzcHg7IH1cXG4gICAgLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4gc3ZnIHtcXG4gICAgICBtYXJnaW46IDAgNHB4IDAgMnB4OyB9XFxuICAuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0bi1ub3JtYWxpemUge1xcbiAgICBkaXNwbGF5OiBub25lOyB9XFxuICAuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0bi1zbWFsbGlmeXJldiB7XFxuICAgIGRpc3BsYXk6IG5vbmU7IH1cXG5cXG4uanNQYW5lbC1oZHItdG9vbGJhciB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgd2lkdGg6IGF1dG87XFxuICBoZWlnaHQ6IGF1dG87XFxuICBmb250LXNpemU6IDE2cHg7IH1cXG5cXG4uanNQYW5lbC1oZHItdG9vbGJhci5hY3RpdmUge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIC1tcy1mbGV4LXdyYXA6IG5vd3JhcDtcXG4gIGZsZXgtd3JhcDogbm93cmFwO1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cXG4gIC5qc1BhbmVsLWhkci10b29sYmFyLmFjdGl2ZSA+ICoge1xcbiAgICBtYXJnaW46IDZweCA4cHg7IH1cXG5cXG4vKiBzdHlsZXMgZm9yIHBhbmVscyB1c2luZyBvcHRpb24ucnRsICovXFxuLmpzUGFuZWwtaGVhZGVyYmFyLmpzUGFuZWwtcnRsLCAuanNQYW5lbC1jb250cm9sYmFyLmpzUGFuZWwtcnRsLCAuanNQYW5lbC1oZHItdG9vbGJhci5qc1BhbmVsLXJ0bCB7XFxuICAtbXMtZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlO1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlOyB9XFxuXFxuLmpzUGFuZWwtaGRyLXRvb2xiYXIuYWN0aXZlLmpzUGFuZWwtcnRsIHtcXG4gIHBhZGRpbmc6IDdweCAwIDEwcHggMDsgfVxcblxcbi5qc1BhbmVsLWZ0ci5qc1BhbmVsLXJ0bCB7XFxuICAtbXMtZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7IH1cXG5cXG4vKiBjb250YWluZXIgdGhhdCB0YWtlcyB0aGUgbWluaWZpZWQganNQYW5lbHMgKi9cXG4janNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXIsIC5qc1BhbmVsLW1pbmltaXplZC1ib3gge1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtZmxvdzogcm93IHdyYXAtcmV2ZXJzZTtcXG4gIGZsZXgtZmxvdzogcm93IHdyYXAtcmV2ZXJzZTtcXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IG5vbmUgcmVwZWF0IHNjcm9sbCAwIDA7XFxuICBib3R0b206IDA7XFxuICBoZWlnaHQ6IGF1dG87XFxuICBsZWZ0OiAwO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgd2lkdGg6IGF1dG87XFxuICB6LWluZGV4OiA5OTk4OyB9XFxuICAjanNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQsIC5qc1BhbmVsLW1pbmltaXplZC1ib3ggLmpzUGFuZWwtcmVwbGFjZW1lbnQge1xcbiAgICB3aWR0aDogMjAwcHg7XFxuICAgIGhlaWdodDogNDBweDtcXG4gICAgbWFyZ2luOiAxcHggMXB4IDAgMDtcXG4gICAgei1pbmRleDogOTk5OTsgfVxcbiAgICAjanNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtaGRyLCAuanNQYW5lbC1taW5pbWl6ZWQtYm94IC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWhkciB7XFxuICAgICAgcGFkZGluZzogMDsgfVxcbiAgICAgICNqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGVhZGVybG9nbywgLmpzUGFuZWwtbWluaW1pemVkLWJveCAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGVhZGVybG9nbyB7XFxuICAgICAgICBtYXgtd2lkdGg6IDUwJTtcXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47IH1cXG4gICAgICAgICNqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGVhZGVybG9nbyBpbWcsIC5qc1BhbmVsLW1pbmltaXplZC1ib3ggLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhlYWRlcmxvZ28gaW1nIHtcXG4gICAgICAgICAgbWF4LXdpZHRoOiAxMDBweDtcXG4gICAgICAgICAgbWF4LWhlaWdodDogMzhweDsgfVxcbiAgICAjanNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtdGl0bGViYXIsIC5qc1BhbmVsLW1pbmltaXplZC1ib3ggLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtdGl0bGViYXIge1xcbiAgICAgIC1tcy1mbGV4OiAxIDEgNjAlO1xcbiAgICAgIGZsZXg6IDEgMSAwO1xcbiAgICAgIGN1cnNvcjogZGVmYXVsdDsgfVxcbiAgICAjanNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtYnRuLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZSwgLmpzUGFuZWwtbWluaW1pemVkLWJveCAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1idG4uanNQYW5lbC1idG4tbm9ybWFsaXplIHtcXG4gICAgICBkaXNwbGF5OiBibG9jazsgfVxcblxcbi5qc1BhbmVsLW1pbmltaXplZC1ib3gge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IGF1dG87IH1cXG5cXG4vKiBoZWxwZXIgY2xhc3NlcyB0byBtYWtlIC5qc1BhbmVsLWNvbnRlbnQgYSBmbGV4IGJveCAqL1xcbi5mbGV4T25lIHtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LWZsb3c6IHJvdyB3cmFwO1xcbiAgZmxleC1mbG93OiByb3cgd3JhcDsgfVxcblxcbi8qIGNzcyBmb3IgcmVzaXplaXQgaGFuZGxlcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtcmVzaXplaXQtaGFuZGxlIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgZm9udC1zaXplOiAwLjFweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvdWNoLWFjdGlvbjogbm9uZTsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LW4ge1xcbiAgY3Vyc29yOiBuLXJlc2l6ZTtcXG4gIGhlaWdodDogMTJweDtcXG4gIGxlZnQ6IDlweDtcXG4gIHRvcDogLTVweDtcXG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAxOHB4KTsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LWUge1xcbiAgY3Vyc29yOiBlLXJlc2l6ZTtcXG4gIGhlaWdodDogY2FsYygxMDAlIC0gMThweCk7XFxuICByaWdodDogLTlweDtcXG4gIHRvcDogOXB4O1xcbiAgd2lkdGg6IDEycHg7IH1cXG5cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUuanNQYW5lbC1yZXNpemVpdC1zIHtcXG4gIGJvdHRvbTogLTlweDtcXG4gIGN1cnNvcjogcy1yZXNpemU7XFxuICBoZWlnaHQ6IDEycHg7XFxuICBsZWZ0OiA5cHg7XFxuICB3aWR0aDogY2FsYygxMDAlIC0gMThweCk7IH1cXG5cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUuanNQYW5lbC1yZXNpemVpdC13IHtcXG4gIGN1cnNvcjogdy1yZXNpemU7XFxuICBoZWlnaHQ6IGNhbGMoMTAwJSAtIDE4cHgpO1xcbiAgbGVmdDogLTlweDtcXG4gIHRvcDogOXB4O1xcbiAgd2lkdGg6IDEycHg7IH1cXG5cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUuanNQYW5lbC1yZXNpemVpdC1uZSB7XFxuICBjdXJzb3I6IG5lLXJlc2l6ZTtcXG4gIGhlaWdodDogMThweDtcXG4gIHJpZ2h0OiAtOXB4O1xcbiAgdG9wOiAtOXB4O1xcbiAgd2lkdGg6IDE4cHg7IH1cXG5cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUuanNQYW5lbC1yZXNpemVpdC1zZSB7XFxuICBib3R0b206IC05cHg7XFxuICBjdXJzb3I6IHNlLXJlc2l6ZTtcXG4gIGhlaWdodDogMThweDtcXG4gIHJpZ2h0OiAtOXB4O1xcbiAgd2lkdGg6IDE4cHg7IH1cXG5cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUuanNQYW5lbC1yZXNpemVpdC1zdyB7XFxuICBib3R0b206IC05cHg7XFxuICBjdXJzb3I6IHN3LXJlc2l6ZTtcXG4gIGhlaWdodDogMThweDtcXG4gIGxlZnQ6IC05cHg7XFxuICB3aWR0aDogMThweDsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LW53IHtcXG4gIGN1cnNvcjogbnctcmVzaXplO1xcbiAgaGVpZ2h0OiAxOHB4O1xcbiAgbGVmdDogLTlweDtcXG4gIHRvcDogLTlweDtcXG4gIHdpZHRoOiAxOHB4OyB9XFxuXFxuLmpzUGFuZWwtZHJhZy1vdmVybGF5IHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMDsgfVxcblxcbi8qIGJveC1zaGFkb3dzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcbi5qc1BhbmVsLWRlcHRoLTEge1xcbiAgYm94LXNoYWRvdzogMCAzcHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xNiksIDAgM3B4IDZweCByZ2JhKDAsIDAsIDAsIDAuMjMpOyB9XFxuXFxuLmpzUGFuZWwtZGVwdGgtMiB7XFxuICBib3gtc2hhZG93OiAwIDEwcHggMjBweCByZ2JhKDAsIDAsIDAsIDAuMTkpLCAwIDZweCA2cHggcmdiYSgwLCAwLCAwLCAwLjIzKTsgfVxcblxcbi5qc1BhbmVsLWRlcHRoLTMge1xcbiAgYm94LXNoYWRvdzogMCAxNHB4IDI4cHggcmdiYSgwLCAwLCAwLCAwLjI1KSwgMCAxMHB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjIyKTsgfVxcblxcbi5qc1BhbmVsLWRlcHRoLTQge1xcbiAgYm94LXNoYWRvdzogMCAxOXB4IDM4cHggcmdiYSgwLCAwLCAwLCAwLjMpLCAwIDE1cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMjIpOyB9XFxuXFxuLmpzUGFuZWwtZGVwdGgtNSB7XFxuICBib3gtc2hhZG93OiAwIDI0cHggNDhweCByZ2JhKDAsIDAsIDAsIDAuMyksIDAgMjBweCAxNHB4IHJnYmEoMCwgMCwgMCwgMC4yMik7IH1cXG5cXG4vKiBzbmFwIHNlbnNpdGl2ZSBhcmVhcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXG4uanNQYW5lbC1zbmFwLWFyZWEge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgYmFja2dyb3VuZDogYmxhY2s7XFxuICBvcGFjaXR5OiAuMjtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHNpbHZlcjtcXG4gIGJveC1zaGFkb3c6IDAgMTRweCAyOHB4IHJnYmEoMCwgMCwgMCwgMC41KSwgMCAxMHB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgei1pbmRleDogOTk5OTsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1sdCwgLmpzUGFuZWwtc25hcC1hcmVhLWxjLCAuanNQYW5lbC1zbmFwLWFyZWEtbGIge1xcbiAgbGVmdDogMDsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1jdCwgLmpzUGFuZWwtc25hcC1hcmVhLWNiIHtcXG4gIGxlZnQ6IDM3LjUlOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLXJ0LCAuanNQYW5lbC1zbmFwLWFyZWEtcmMsIC5qc1BhbmVsLXNuYXAtYXJlYS1yYiB7XFxuICByaWdodDogMDsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1sdCwgLmpzUGFuZWwtc25hcC1hcmVhLWN0LCAuanNQYW5lbC1zbmFwLWFyZWEtcnQge1xcbiAgdG9wOiAwOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWxjLCAuanNQYW5lbC1zbmFwLWFyZWEtcmMge1xcbiAgdG9wOiAzNy41JTsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1sYiwgLmpzUGFuZWwtc25hcC1hcmVhLWNiLCAuanNQYW5lbC1zbmFwLWFyZWEtcmIge1xcbiAgYm90dG9tOiAwOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWN0LCAuanNQYW5lbC1zbmFwLWFyZWEtY2Ige1xcbiAgd2lkdGg6IDI1JTsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1sYywgLmpzUGFuZWwtc25hcC1hcmVhLXJjIHtcXG4gIGhlaWdodDogMjUlOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWx0IHtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMDAlOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLXJ0IHtcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEwMCU7IH1cXG5cXG4uanNQYW5lbC1zbmFwLWFyZWEtcmIge1xcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTAwJTsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1sYiB7XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTAwJTsgfVxcblxcbi8qIGJvb3RzdHJhcCBhZGp1c3RtZW50cyAqL1xcbi5qc1BhbmVsLnBhbmVsLWRlZmF1bHQsIC5qc1BhbmVsLnBhbmVsLXByaW1hcnksIC5qc1BhbmVsLnBhbmVsLWluZm8sIC5qc1BhbmVsLnBhbmVsLXN1Y2Nlc3MsIC5qc1BhbmVsLnBhbmVsLXdhcm5pbmcsIC5qc1BhbmVsLnBhbmVsLWRhbmdlciwgLmpzUGFuZWwuY2FyZC5jYXJkLWludmVyc2Uge1xcbiAgYm94LXNoYWRvdzogMCAwIDZweCByZ2JhKDAsIDMzLCA1MCwgMC4xKSwgMCA3cHggMjVweCByZ2JhKDE3LCAzOCwgNjAsIDAuNCk7IH1cXG5cXG4uanNQYW5lbC5wYW5lbCB7XFxuICBtYXJnaW46IDA7IH1cXG5cXG4uanNQYW5lbC1oZHIucGFuZWwtaGVhZGluZyB7XFxuICBib3JkZXItYm90dG9tOiBub25lO1xcbiAgcGFkZGluZzogMDsgfVxcblxcbi5qc1BhbmVsLXRpdGxlLnBhbmVsLXRpdGxlIC5zbWFsbCwgLmpzUGFuZWwtdGl0bGUucGFuZWwtdGl0bGUgc21hbGwge1xcbiAgZm9udC1zaXplOiA3NSU7IH1cXG5cXG4vKiBib290c3RyYXAgNCBhZGp1c3RtZW50cyAqL1xcbi5qc1BhbmVsLmNhcmQuY2FyZC1pbnZlcnNlIHtcXG4gIGJveC1zaGFkb3c6IDAgMCA2cHggcmdiYSgwLCAzMywgNTAsIDAuMSksIDAgN3B4IDI1cHggcmdiYSgxNywgMzgsIDYwLCAwLjQpOyB9XFxuXFxuLmNhcmQtZGVmYXVsdCB7XFxuICBiYWNrZ3JvdW5kOiAjZjVmNWY1OyB9XFxuXFxuLmNhcmQtcHJpbWFyeSA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCxcXG4uY2FyZC1zdWNjZXNzID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkLFxcbi5jYXJkLWluZm8gPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQsXFxuLmNhcmQtd2FybmluZyA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCxcXG4uY2FyZC1kYW5nZXIgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQge1xcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICBjb2xvcjogI2Y1ZjVmNTsgfVxcblxcbi5jYXJkLWRlZmF1bHQgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQge1xcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi8qIGNzczMgYW5pbWF0aW9ucyAqL1xcbkBrZXlmcmFtZXMganNQYW5lbEZhZGVJbiB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG4uanNQYW5lbEZhZGVJbiB7XFxuICBvcGFjaXR5OiAwO1xcbiAgYW5pbWF0aW9uOiBqc1BhbmVsRmFkZUluIGVhc2UtaW4gMTtcXG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiA2MDBtczsgfVxcblxcbkBrZXlmcmFtZXMganNQYW5lbEZhZGVPdXQge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMDsgfSB9XFxuXFxuLmpzUGFuZWxGYWRlT3V0IHtcXG4gIGFuaW1hdGlvbjoganNQYW5lbEZhZGVPdXQgZWFzZS1pbiAxO1xcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDYwMG1zOyB9XFxuXFxuQGtleWZyYW1lcyBtb2RhbEJhY2tkcm9wRmFkZUluIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDAuNjU7IH0gfVxcblxcbi5qc1BhbmVsLW1vZGFsLWJhY2tkcm9wIHtcXG4gIGFuaW1hdGlvbjogbW9kYWxCYWNrZHJvcEZhZGVJbiBlYXNlLWluIDE7XFxuICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogNzUwbXM7XFxuICBiYWNrZ3JvdW5kOiBibGFjaztcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTsgfVxcblxcbkBrZXlmcmFtZXMgbW9kYWxCYWNrZHJvcEZhZGVPdXQge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDAuNjU7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMDsgfSB9XFxuXFxuLmpzUGFuZWwtbW9kYWwtYmFja2Ryb3Atb3V0IHtcXG4gIGFuaW1hdGlvbjogbW9kYWxCYWNrZHJvcEZhZGVPdXQgZWFzZS1pbiAxO1xcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDQwMG1zOyB9XFxuXFxuLmpzUGFuZWwtbW9kYWwtYmFja2Ryb3AtbXVsdGkge1xcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjE1KTsgfVxcblxcbi8qIF90aGVtZXNfbWRsLnNhc3M6IDIwMTctMDctMTIgMTk6MTYgKi9cXG4vKiBkZWZhdWx0IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXG4uanNQYW5lbC10aGVtZS1kZWZhdWx0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNjZmQ4ZGM7XFxuICBib3JkZXItY29sb3I6ICNjZmQ4ZGM7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1kZWZhdWx0ID4gLmpzUGFuZWwtaGRyICoge1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1kZWZhdWx0ID4gLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhkci10b29sYmFyIHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjOTBhNGFlOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtZGVmYXVsdCA+IC5qc1BhbmVsLWNvbnRlbnQge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM5MGE0YWU7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1kZWZhdWx0ID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNjZmQ4ZGM7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzkwYTRhZTsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRlZmF1bHQgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWRsaWdodCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWNlZmYxOyB9XFxuXFxuLyogcHJpbWFyeSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtdGhlbWUtcHJpbWFyeSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjE5NmYzO1xcbiAgYm9yZGVyLWNvbG9yOiAjMjE5NmYzOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtcHJpbWFyeSA+IC5qc1BhbmVsLWhkciAqIHtcXG4gIGNvbG9yOiAjZmZmZmZmOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtcHJpbWFyeSA+IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZHItdG9vbGJhciB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzQyYTVmNTsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXByaW1hcnkgPiAuanNQYW5lbC1jb250ZW50IHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNDJhNWY1OyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtcHJpbWFyeSA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjE5NmYzO1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM0MmE1ZjU7XFxuICBjb2xvcjogI2ZmZmZmZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXByaW1hcnkgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWRsaWdodCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYmJkZWZiO1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4vKiBpbmZvIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXG4uanNQYW5lbC10aGVtZS1pbmZvIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyOWI2ZjY7XFxuICBib3JkZXItY29sb3I6ICMyOWI2ZjY7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1pbmZvID4gLmpzUGFuZWwtaGRyICoge1xcbiAgY29sb3I6ICNmZmZmZmY7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1pbmZvID4gLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhkci10b29sYmFyIHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNGZjM2Y3OyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtaW5mbyA+IC5qc1BhbmVsLWNvbnRlbnQge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM0ZmMzZjc7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1pbmZvID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyOWI2ZjY7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzRmYzNmNztcXG4gIGNvbG9yOiAjZmZmZmZmOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtaW5mbyA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZGxpZ2h0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlMWY1ZmU7XFxuICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi8qIHN1Y2Nlc3MgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcbi5qc1BhbmVsLXRoZW1lLXN1Y2Nlc3Mge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRjYWY1MDtcXG4gIGJvcmRlci1jb2xvcjogIzRjYWY1MDsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXN1Y2Nlc3MgPiAuanNQYW5lbC1oZHIgKiB7XFxuICBjb2xvcjogI2ZmZmZmZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXN1Y2Nlc3MgPiAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGRyLXRvb2xiYXIge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM4MWM3ODQ7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1zdWNjZXNzID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0Y2FmNTA7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzgxYzc4NDtcXG4gIGNvbG9yOiAjZmZmZmZmOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtc3VjY2VzcyA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZGxpZ2h0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlOGY1ZTk7XFxuICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi8qIHdhcm5pbmcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcbi5qc1BhbmVsLXRoZW1lLXdhcm5pbmcge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYzEwNztcXG4gIGJvcmRlci1jb2xvcjogI2ZmYzEwNzsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXdhcm5pbmcgPiAuanNQYW5lbC1oZHIgKiB7XFxuICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXdhcm5pbmcgPiAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGRyLXRvb2xiYXIge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmZmQ1NGY7IH1cXG5cXG4uanNQYW5lbC10aGVtZS13YXJuaW5nID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmMxMDc7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgI2ZmZDU0ZjtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtd2FybmluZyA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZGxpZ2h0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmYzZTA7XFxuICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi8qIGRhbmdlciAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcbi5qc1BhbmVsLXRoZW1lLWRhbmdlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYzZDAwO1xcbiAgYm9yZGVyLWNvbG9yOiAjZmYzZDAwOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtZGFuZ2VyID4gLmpzUGFuZWwtaGRyICoge1xcbiAgY29sb3I6ICNmZmZmZmY7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1kYW5nZXIgPiAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGRyLXRvb2xiYXIge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmZjZlNDA7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1kYW5nZXIgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmM2QwMDtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZmY2ZTQwO1xcbiAgY29sb3I6ICNmZmZmZmY7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1kYW5nZXIgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWRsaWdodCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY5ZTgwO1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4uanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1ub2hlYWRlciB7XFxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAzcHg7XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogM3B4O1xcbiAgYm9yZGVyOiBub25lICFpbXBvcnRhbnQ7IH1cXG5cXG4uanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1ub2Zvb3RlciB7XFxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAzcHg7XFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogM3B4OyB9XFxuXFxuYm9keSB7XFxuICAtbXMtb3ZlcmZsb3ctc3R5bGU6IHNjcm9sbGJhcjsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvanNwYW5lbDQvZGlzdC9qc3BhbmVsLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9kaXN0L2pzcGFuZWwuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI2J1dHRwbHVnZGV2dG9vbHNsb2dwYW5lbCB7XFxuICAgIGRpc3BsYXk6ZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246Y29sdW1uO1xcbiAgICB3aWR0aDoxMDAlO1xcbiAgICBoZWlnaHQ6MTAwJTtcXG4gICAgYWxpZ24taXRlbXM6Y2VudGVyO1xcbiAgICBjb2xvcjogIzAwMDtcXG59XFxuXFxuI2J1dHRwbHVnZGV2dG9vbHNsb2dwYW5lbCBpbnB1dCxzZWxlY3QsdGV4dGFyZWEge1xcbiAgICBjb2xvcjogIzAwMDtcXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcXG59XFxuXFxuI2J1dHRwbHVnZGV2dG9vbHNsb2dwYW5lbCAjYnV0dHBsdWdkZXZ0b29sc2xvZ3RleHRhcmVhIHtcXG4gICAgZm9udC1zaXplOiA4cHQ7XFxuICAgIHdpZHRoOjEwMCU7XFxuICAgIGZsZXg6MSAxO1xcbiAgICBwYWRkaW5nOjVweDtcXG4gICAgYm94LXNpemluZzpib3JkZXItYm94O1xcbn1cXG4jYnV0dHBsdWdkZXZ0b29sc2xvZ3BhbmVsICNidXR0cGx1Z2RldnRvb2xzbG9nbGV2ZWwge1xcbiAgICB3aWR0aDo5OCU7XFxuICAgIGZsZXg6bm9uZTtcXG4gICAgcGFkZGluZzo1cHg7XFxuICAgIGJveC1zaXppbmc6Ym9yZGVyLWJveDtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL3NyYy9kZXZ0b29scy93ZWIvTG9nUGFuZWwuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3JjL2RldnRvb2xzL3dlYi9Mb2dQYW5lbC5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJtYWluIHtcXG4gICAgd2lkdGg6MTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG5zZWN0aW9uIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgcGFkZGluZzogMjBweDtcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkZGQ7XFxufVxcblxcbmlucHV0IHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxubGFiZWwge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIG1hcmdpbjogMCAwIC0xcHg7XFxuICAgIHBhZGRpbmc6IDVweCAxMHB4O1xcbiAgICBmb250LXdlaWdodDogNjAwO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGNvbG9yOiAjYmJiO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcXG59XFxuXFxubGFiZWw6YmVmb3JlIHtcXG4gICAgZm9udC1mYW1pbHk6IGZvbnRhd2Vzb21lO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxufVxcblxcbmxhYmVsOmhvdmVyIHtcXG4gICAgY29sb3I6ICM4ODg7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuaW5wdXQ6Y2hlY2tlZCArIGxhYmVsIHtcXG4gICAgY29sb3I6ICM1NTU7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XFxuICAgIGJvcmRlci10b3A6IDJweCBzb2xpZCBvcmFuZ2U7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZmZmO1xcbn1cXG5cXG4jdGFiMTpjaGVja2VkIH4gI2NvbnRlbnQxLFxcbiN0YWIyOmNoZWNrZWQgfiAjY29udGVudDIsXFxuI3RhYjM6Y2hlY2tlZCB+ICNjb250ZW50MyxcXG4jdGFiNDpjaGVja2VkIH4gI2NvbnRlbnQ0IHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbiNjb250ZW50MSB7XFxuICAgIGhlaWdodDogMTAwJTtcXG59XFxuXFxuI2NvbnRlbnQyIHtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4jc2ltdWxhdG9yIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogY2FsYygxMDAlIC0gNjBweCk7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxufVxcblxcbi5mbGVzaGxpZ2h0LXNpbSB7XFxuICAgIGZsZXg6IDE7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG5kaXYuYy1mbGVzaGxpZ2h0IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleDogMTtcXG59XFxuXFxuZGl2LmMtZmxlc2hsaWdodCBpbWcge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHdpZHRoOiBhdXRvO1xcblxcdCAgaW1hZ2UtcmVuZGVyaW5nOiAtbW96LWNyaXNwLWVkZ2VzO1xcblxcdCAgaW1hZ2UtcmVuZGVyaW5nOiAtby1jcmlzcC1lZGdlcztcXG5cXHQgIGltYWdlLXJlbmRlcmluZzogLXdlYmtpdC1vcHRpbWl6ZS1jb250cmFzdDtcXG5cXHQgIGltYWdlLXJlbmRlcmluZzogcGl4ZWxhdGVkO1xcbn1cXG5cXG5kaXYuYy1mbGVzaGxpZ2h0IC5vLWZsZXNobGlnaHQge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGhlaWdodDogNzclO1xcbn1cXG5cXG4udmlicmF0b3Itc2ltdWxhdG9yLWNvbXBvbmVudCB7XFxuICAgIGZsZXg6IDE7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG5kaXYudmlicmF0b3Ige1xcbiAgICBmbGV4OiAxIDE7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmRpdi52aWJyYXRvci1zaW11bGF0b3ItY29tcG9uZW50IGltZyB7XFxuICAgIGhlaWdodDogY2FsYygxMDAlIC0gNDBweCk7XFxuICAgIHdpZHRoOiBhdXRvO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGltYWdlLXJlbmRlcmluZzogLW1vei1jcmlzcC1lZGdlcztcXG5cXHQgIGltYWdlLXJlbmRlcmluZzogLW8tY3Jpc3AtZWRnZXM7XFxuXFx0ICBpbWFnZS1yZW5kZXJpbmc6IC13ZWJraXQtb3B0aW1pemUtY29udHJhc3Q7XFxuXFx0ICBpbWFnZS1yZW5kZXJpbmc6IHBpeGVsYXRlZDtcXG59XFxuXFxuZGl2LnZpYnJhdG9yLWluZm8ge1xcbiAgICBmbGV4OiAwO1xcbn1cXG5cXG4uc2ltdWxhdG9yLWRpdmlkZXIge1xcbiAgICBib3JkZXItbGVmdDogMXB4ICMwMDAgZGFzaGVkO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxufVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9zcmMvZGV2dG9vbHMvd2ViL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3JjL2RldnRvb2xzL3dlYi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlU291cmNlTWFwKSB7XG5cdHZhciBsaXN0ID0gW107XG5cblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmV0dXJuIFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgY29udGVudCArIFwifVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSkuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcblx0dmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuXHR2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cdGlmICghY3NzTWFwcGluZykge1xuXHRcdHJldHVybiBjb250ZW50O1xuXHR9XG5cblx0aWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuXHRcdHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0XHRyZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcblx0fVxuXG5cdHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuXHR2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuXG5cdHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlc2NhcGUodXJsKSB7XG4gICAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB1cmxcbiAgICB9XG4gICAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gICAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gICAgfVxuICAgIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICAgIGlmICgvW1wiJygpIFxcdFxcbl0vLnRlc3QodXJsKSkge1xuICAgICAgICByZXR1cm4gJ1wiJyArIHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csICdcXFxcbicpICsgJ1wiJ1xuICAgIH1cblxuICAgIHJldHVybiB1cmxcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL3VybC9lc2NhcGUuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL3VybC9lc2NhcGUuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4gKCcgKyBlciArICcpJyk7XG4gICAgICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmICh0aGlzLl9ldmVudHMpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoZXZsaXN0ZW5lcilcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTphcHBsaWNhdGlvbi92bmQubXMtZm9udG9iamVjdDtiYXNlNjQsWEFnQUFMZ0hBQUFCQUFJQUFBQUFBQUFBQUFBQUFBQUFBQUFCQUpBQkFBQUFBRXhRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUVBQUFBQUFBQUFQWDZ4TmdBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUE0QWFnQnpBR2NBYkFCNUFIQUFhQUFBQUE0QVVnQmxBR2NBZFFCc0FHRUFjZ0FBQUJZQVZnQmxBSElBY3dCcEFHOEFiZ0FnQURFQUxnQXdBQUFBRGdCcUFITUFad0JzQUhrQWNBQm9BQUFBQUFBQUFRQUFBQXNBZ0FBREFEQlBVeTh5RHhJRzRRQUFBTHdBQUFCZ1kyMWhjQmRXMG93QUFBRWNBQUFBVkdkaGMzQUFBQUFRQUFBQmNBQUFBQWhuYkhsbVdhaGpYQUFBQVhnQUFBTEVhR1ZoWkFpOE13UUFBQVE4QUFBQU5taG9aV0VJVGdUd0FBQUVkQUFBQUNSb2JYUjRKTjRFd0FBQUJKZ0FBQUFvYkc5allRTUtBa2dBQUFUQUFBQUFGbTFoZUhBQURnQTFBQUFFMkFBQUFDQnVZVzFsU3EzS0dRQUFCUGdBQUFLZ2NHOXpkQUFEQUFBQUFBZVlBQUFBSUFBREJMSUJrQUFGQUFBQ21RTE1BQUFBandLWkFzd0FBQUhyQURNQkNRQUFBQUFBQUFBQUFBQUFBQUFBQUFFUUFBQUFBQUFBQUFBQUFBQUFBQUFBQUVBQUFPa0ZBOEQvd0FCQUE4QUFRQUFBQUFFQUFBQUFBQUFBQUFBQUFDQUFBQUFBQUFNQUFBQURBQUFBSEFBQkFBTUFBQUFjQUFNQUFRQUFBQndBQkFBNEFBQUFDZ0FJQUFJQUFnQUJBQ0RwQmYvOS8vOEFBQUFBQUNEcEFQLzkvLzhBQWYvakZ3UUFBd0FCQUFBQUFBQUFBQUFBQUFBQkFBSC8vd0FQQUFFQUFBQUFBQUFBQUFBQ0FBQTNPUUVBQUFBQUFRQUFBQUFBQUFBQUFBSUFBRGM1QVFBQUFBQUJBQUFBQUFBQUFBQUFBZ0FBTnprQkFBQUFBQUVBbVFFSkJJd0NYZ0FlQUFBQkxnRUhEZ01ITGdNbkpnWUhCaFlYSGdNek1qWWxQZ0VuQkl3TExCUkNpWFpiRlJWYWRZZEJGQ3NNQ3d3VW83dGlId1VOaEFGVEZBd0tBa2dVRFFza1NUOHVDZ2d1UDBva0RBMFRGQ3dMWEdNdUNEMjNDeXdVQUFBQUFRQ1pBUkFFakFKbEFCNEFBQUVPQVNjdUF5Y09Bd2NHSmljbU5qYytBek15RmdVZUFRY0VqQXNzRkVLSmRsc1ZGVnAxaDBFVUt3d0xEQlNqdTJJZkJRMkVBVk1VREFvQkpoUU5DeVJKUHk0S0NTMC9TaVVMREJRVUxBdGNZeTRJUHJjTEt4UUFBQUFCQVAwQUt3UVdBMFlBSmdBQUNRRTJOQ2NtSWdjSkFTWWlCd1lVRndrQkJoUVhIZ0V6TWpZM0NRRWVBVE15TmpjMk5DY0JBdEVCUlE4UER5c1AvcnordkE4cUR3OFBBVVQreUE4UENCSUtDaE1IQVRnQk9BY1RDZ29UQnc4UC9zZ0J1Z0ZFRHlvUER3Lyt2QUZFRHc4UEtnLyt2UDdJRHlvUENBY0hDQUUzL3NrSUJ3Y0lEeW9QQVRnQUFBSUEyd0FKQkVrRGR3QVFBQnNBQUFFaElnWVZFUlFXTXlFeU5qVVJOQ1lqRVNFaUpqVVJJUkVVQmlNRDJQMTFMME5ETHdLTEwwSkNMLzExRVJjQzJ4Y1JBM2RCTC8xeUwwRkJMd0tPTDBIODJ4Y1FBbG45cHhBWEFBQUFBUURiQUFrRVNRRGxBQkFBQUNVaElnWWRBUlFXTXlFeU5qMEJOQ1lqQTlMOWdDNUpTUzRDZ0M1SlNTN2xHRWNlUnhnWVJ4NUhHQUFEQU5zQUNRUkpBMEFBRUFBYkFESUFBQUVoSWdZVkVSUVdNeUV5TmpVUk5DWWpFeFFHSXlFaUpqVVJJUkVUSVNJR0hRRXpOU0VSRkFZckFSVXpNalkxRVRRbUl3TlQvZVluTnpjbkFob25QVDBuTFI4Ty9lWU9HUUp1YlAzbUp6MDNBbTBaRFJFUkpqYzNKZ0ozUVIvK1B5QXRMU0FCd1I5Qi9kOExIUjBMQWJQK1RRTHFMUjlaTi81Z0N6QWxRUjhCd2g4dEFBQUFBQUVBQUFBQkFBQTJzWDQ5WHc4ODlRQUxCQUFBQUFBQTBvajNTQUFBQUFEU2lQZElBQUFBQUFTTUEzY0FBQUFJQUFJQUFBQUFBQUFBQVFBQUE4RC93QUFBQlNVQUFBQUFCSXdBQVFBQUFBQUFBQUFBQUFBQUFBQUFBQW9FQUFBQUFBQUFBQUFBQUFBQ0FBQUFCU1VBbVFVbEFKa0ZKUUQ5QlNVQTJ3VWxBTnNGSlFEYkFBQUFBQUFLQUJRQUhnQlNBSVlBekFENkFSWUJZZ0FBQUFFQUFBQUtBRE1BQXdBQUFBQUFBZ0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFXQVE0QUFRQUFBQUFBQUFBVEFKWUFBUUFBQUFBQUFRQUhBQUFBQVFBQUFBQUFBZ0FIQVJvQUFRQUFBQUFBQXdBSEFQQUFBUUFBQUFBQUJBQUhBUzhBQVFBQUFBQUFCUUFMQU04QUFRQUFBQUFBQmdBSEFRVUFBUUFBQUFBQUNRQU9BQlVBQVFBQUFBQUFDZ0FhQVVRQUFRQUFBQUFBREFBYUFEOEFBUUFBQUFBQURRQURBSTBBQXdBQkJBa0FBQUFtQUtrQUF3QUJCQWtBQVFBT0FBY0FBd0FCQkFrQUFnQU9BU0VBQXdBQkJBa0FBd0FPQVBjQUF3QUJCQWtBQkFBT0FUWUFBd0FCQkFrQUJRQVdBTm9BQXdBQkJBa0FCZ0FPQVF3QUF3QUJCQWtBQ1FBY0FDTUFBd0FCQkFrQUNnQTBBVjRBQXdBQkJBa0FEQUEwQUZrQUF3QUJCQWtBRFFBR0FKQnFjMmRzZVhCb0FHb0Fjd0JuQUd3QWVRQndBR2hUZEdWbVlXNGdVM1J5NU45bGNnQlRBSFFBWlFCbUFHRUFiZ0FnQUZNQWRBQnlBT1FBM3dCbEFISm9kSFJ3T2k4dmMzUmxabUZ1YzNSeVlXVnpjMlZ5TG1WMUx3Qm9BSFFBZEFCd0FEb0FMd0F2QUhNQWRBQmxBR1lBWVFCdUFITUFkQUJ5QUdFQVpRQnpBSE1BWlFCeUFDNEFaUUIxQUM5TlNWUUFUUUJKQUZReU1ERTFJRk4wWldaaGJpQlRkSExrMzJWeUFESUFNQUF4QURVQUlBQlRBSFFBWlFCbUFHRUFiZ0FnQUZNQWRBQnlBT1FBM3dCbEFISldaWEp6YVc5dUlERXVNQUJXQUdVQWNnQnpBR2tBYndCdUFDQUFNUUF1QURCcWMyZHNlWEJvQUdvQWN3Qm5BR3dBZVFCd0FHaHFjMmRzZVhCb0FHb0Fjd0JuQUd3QWVRQndBR2hTWldkMWJHRnlBRklBWlFCbkFIVUFiQUJoQUhKcWMyZHNlWEJvQUdvQWN3Qm5BR3dBZVFCd0FHaEdiMjUwSUdkbGJtVnlZWFJsWkNCaWVTQkpZMjlOYjI5dUxnQkdBRzhBYmdCMEFDQUFad0JsQUc0QVpRQnlBR0VBZEFCbEFHUUFJQUJpQUhrQUlBQkpBR01BYndCTkFHOEFid0J1QUM0QUF3QUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQT09XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9kaXN0L2ZvbnRzL2pzZ2x5cGguZW90XG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9kaXN0L2ZvbnRzL2pzZ2x5cGguZW90XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQnpkR0Z1WkdGc2IyNWxQU0p1YnlJL1BnbzhJVVJQUTFSWlVFVWdjM1puSUZCVlFreEpReUFpTFM4dlZ6TkRMeTlFVkVRZ1UxWkhJREV1TVM4dlJVNGlJQ0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTlIY21Gd2FHbGpjeTlUVmtjdk1TNHhMMFJVUkM5emRtY3hNUzVrZEdRaUlENEtQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpUGdvOGJXVjBZV1JoZEdFK0NqeHFjMjl1UGdvOElWdERSRUZVUVZzS2V3b0pJbVp2Ym5SR1lXMXBiSGtpT2lBaWFuTm5iSGx3YUNJc0Nna2liV0ZxYjNKV1pYSnphVzl1SWpvZ01Td0tDU0p0YVc1dmNsWmxjbk5wYjI0aU9pQXdMQW9KSW1SbGMybG5ibVZ5SWpvZ0lsTjBaV1poYmlCVGRITERwTU9mWlhJaUxBb0pJbVJsYzJsbmJtVnlWVkpNSWpvZ0ltaDBkSEE2THk5emRHVm1ZVzV6ZEhKaFpYTnpaWEl1WlhVdklpd0tDU0pzYVdObGJuTmxJam9nSWsxSlZDSXNDZ2tpWTI5d2VYSnBaMmgwSWpvZ0lqSXdNVFVnVTNSbFptRnVJRk4wY3NPa3c1OWxjaUlzQ2draWRtVnljMmx2YmlJNklDSldaWEp6YVc5dUlERXVNQ0lzQ2draVptOXVkRWxrSWpvZ0ltcHpaMng1Y0dnaUxBb0pJbkJ6VG1GdFpTSTZJQ0pxYzJkc2VYQm9JaXdLQ1NKemRXSkdZVzFwYkhraU9pQWlVbVZuZFd4aGNpSXNDZ2tpWm5Wc2JFNWhiV1VpT2lBaWFuTm5iSGx3YUNJc0Nna2laR1Z6WTNKcGNIUnBiMjRpT2lBaVJtOXVkQ0JuWlc1bGNtRjBaV1FnWW5rZ1NXTnZUVzl2Ymk0aUNuMEtYVjArQ2p3dmFuTnZiajRLUEM5dFpYUmhaR0YwWVQ0S1BHUmxabk0rQ2p4bWIyNTBJR2xrUFNKcWMyZHNlWEJvSWlCb2IzSnBlaTFoWkhZdGVEMGlNVEF5TkNJK0NqeG1iMjUwTFdaaFkyVWdkVzVwZEhNdGNHVnlMV1Z0UFNJeE1ESTBJaUJoYzJObGJuUTlJamsyTUNJZ1pHVnpZMlZ1ZEQwaUxUWTBJaUF2UGdvOGJXbHpjMmx1WnkxbmJIbHdhQ0JvYjNKcGVpMWhaSFl0ZUQwaU1UQXlOQ0lnTHo0S1BHZHNlWEJvSUhWdWFXTnZaR1U5SWlZamVESXdPeUlnYUc5eWFYb3RZV1IyTFhnOUlqVXhNaUlnWkQwaUlpQXZQZ284WjJ4NWNHZ2dkVzVwWTI5a1pUMGlKaU40WlRrd01Ec2lJR2RzZVhCb0xXNWhiV1U5SW1Ob1pYWnliMjR0Wkc5M2JpSWdaR0YwWVMxMFlXZHpQU0pqYUdWMmNtOXVMV1J2ZDI0aUlHaHZjbWw2TFdGa2RpMTRQU0l4TXpFM0lpQmtQU0pOTVRFMk15NDJOallnTlRnekxqZzBOV010TVRRdU5ESTNJREkyTGpZME1pMDBOeTQzTWpZZ016WXVOVFV6TFRjMExqTTFJREl5TGpFd055MHhOemN1TkRJMkxUazJMakV4TFRNM055NDNORFl0TWpBeUxqSTNOeTAwTXpNdU5EZ3hMVEl5T0M0d056Z3ROVFl1TWpFZ01qSXVPRGMxTFRJMU15NDFNVE1nTVRJNUxqRTFNaTAwTWpjdU56QXpJREl5Tnk0Mk1ESXRNall1TXpVZ01UUXVPVEF6TFRVNUxqZzBPU0ExTGpZeE5DMDNOQzQzTlRJdE1qQXVOemN6Y3kwMUxqWXhOQzAxT1M0NE16RWdNakF1TnpjekxUYzBMamMxTW1NME16TXVNVE0wTFRJME5DNDRNRGtnTkRZNExqZzRNaTB5TkRRdU9EQTVJRFE0TkM0eE16TXRNalEwTGpnd09TQXhOaTQxTkRrZ01DQXpNaTR5TURFZ01DQTBPRE11TWpjeklESTBOQzR6TXpRZ01qWXVOalF5SURFMExqUXlOeUF6Tmk0MU16VWdORGN1TnpJMklESXlMakV3TnlBM05DNHpOamg2SWlBdlBnbzhaMng1Y0dnZ2RXNXBZMjlrWlQwaUppTjRaVGt3TVRzaUlHZHNlWEJvTFc1aGJXVTlJbU5vWlhaeWIyNHRkWEFpSUdSaGRHRXRkR0ZuY3owaVkyaGxkbkp2YmkxMWNDSWdhRzl5YVhvdFlXUjJMWGc5SWpFek1UY2lJR1E5SWsweE1UWXpMalkyTmlBeU9UTXVPRGRqTFRFMExqUXlOeTB5Tmk0Mk1qUXRORGN1TnpJMkxUTTJMalUxTXkwM05DNHpOUzB5TWk0eE1EY3RNVGMzTGpReU5pQTVOaTR4TVMwek56Y3VOekk0SURJd01pNHlOemN0TkRNekxqUTJNeUF5TWpndU1EYzRMVFUyTGpJeExUSXlMamczTlMweU5UTXVOVEV6TFRFeU9TNHhOVEl0TkRJM0xqY3dNeTB5TWpjdU5UZzBMVEkyTGpNMUxURTBMamt5TVMwMU9TNDRORGt0TlM0Mk1UUXROelF1TnpVeUlESXdMamMxTkMweE5DNDVNRE1nTWpZdU16ZzJMVFV1TmpFMElEVTVMamcwT1NBeU1DNDNOek1nTnpRdU56VXlJRFF6TXk0eE1UVWdNalEwTGpnd09TQTBOamd1T0RZMElESTBOQzQ0TURrZ05EZzBMakV4TkNBeU5EUXVPREE1SURFMkxqVTBPU0F3SURNeUxqSXdNU0F3SURRNE15NHlOVFV0TWpRMExqTXpOQ0F5Tmk0Mk5qRXRNVFF1TkRJM0lETTJMalUxTXkwME55NDNORFFnTWpJdU1USTJMVGMwTGpNMk9Ib2lJQzgrQ2p4bmJIbHdhQ0IxYm1samIyUmxQU0ltSTNobE9UQXlPeUlnWjJ4NWNHZ3RibUZ0WlQwaVkyeHZjMlVpSUdSaGRHRXRkR0ZuY3owaVkyeHZjMlVpSUdodmNtbDZMV0ZrZGkxNFBTSXhNekUzSWlCa1BTSk5Oekl4TGpRNE1TQTBOREV1T0RFNWJETXlOQzR3T1RZZ016STBMakEzT0dNeE9TNDVPRFlnTWpBdU1EQTFJREU1TGprNE5pQTFNaTR6TnlBd0lEY3lMak0xTjNNdE5USXVNelV5SURFNUxqazROaTAzTWk0ek16Z2dNR3d0TXpJMExqQTVOaTB6TWpRdU1EazJMVE15TkM0d09UWWdNekkwTGpBNU5tTXRNVGt1T1RnMklESXdMakF3TlMwMU1pNHpPRGtnTWpBdU1EQTFMVGN5TGpNMU55QXdMVEU1TGprNE5pMHhPUzQ1TmpndE1Ua3VPVGcyTFRVeUxqTTFNaUF3TFRjeUxqTXpPR3d6TWpRdU1EazJMVE15TkM0d09UWXRNekV4TGpjeE55MHpNVEV1TnpNMVl5MHhPUzQ1T0RZdE1Ua3VPVFk0TFRFNUxqazROaTAxTWk0ek9Ea2dNQzAzTWk0ek5UY2dPUzQ1T0RRdE1UQXVNREF5SURJekxqQTNOeTB4TkM0NU56WWdNell1TVRZNUxURTBMamszTmlBeE15NHdOelFnTUNBeU5pNHhPRFVnTkM0NU56UWdNell1TVRZNUlERTBMamszTm13ek1URXVOek0xSURNeE1TNDNOVE1nTXpFeExqY3pOUzB6TVRFdU56VXpZekV3TGpBd01pMHhNQzR3TURJZ01qTXVNRGMzTFRFMExqazNOaUF6Tmk0eE9EY3RNVFF1T1RjMmN6STJMakUyTnlBMExqazNOQ0F6Tmk0eE9EY2dNVFF1T1RjMll6RTVMamsyT0NBeE9TNDVOamdnTVRrdU9UWTRJRFV5TGpNNE9TQXdJRGN5TGpNMU4yd3RNekV4TGpjM01TQXpNVEV1TnpNMWVpSWdMejRLUEdkc2VYQm9JSFZ1YVdOdlpHVTlJaVlqZUdVNU1ETTdJaUJuYkhsd2FDMXVZVzFsUFNKdFlYaHBiV2w2WlNJZ1pHRjBZUzEwWVdkelBTSnRZWGhwYldsNlpTSWdhRzl5YVhvdFlXUjJMWGc5SWpFek1UY2lJR1E5SWswNU9ETXVPVFUwSURnNE5pNDROVGRvTFRZMU1TNHpNemRqTFRZeUxqUXdPU0F3TFRFeE15NHhPRGt0TkRrdU9UYzFMVEV4TXk0eE9Ea3RNVEV4TGpReE5YWXROalUwTGpnNE5XTXdMVFl4TGpRMElEVXdMamMzT1MweE1URXVOREUxSURFeE15NHhPRGt0TVRFeExqUXhOV2cyTlRFdU16TTNZell5TGpRd09TQXdJREV4TXk0eE9Ea2dORGt1T1RjMUlERXhNeTR4T0RrZ01URXhMalF4TlhZMk5UUXVPRGcxWXpBZ05qRXVORFF0TlRBdU56YzVJREV4TVM0ME1UVXRNVEV6TGpFNE9TQXhNVEV1TkRFMWVrMDVPRE11T1RVMElEZ3lMakk0Tm1ndE5qVXhMak16TjJNdE1qSXVNRGc1SURBdE5EQXVNRFEySURFM0xqRTFNaTAwTUM0d05EWWdNemd1TWpjeWRqWXdNUzQzTWpob056TXhMalF5T1hZdE5qQXhMamN5T0dNd0xUSXhMakV5TFRFM0xqazFOeTB6T0M0eU56SXROREF1TURRMkxUTTRMakkzTW5vaUlDOCtDanhuYkhsd2FDQjFibWxqYjJSbFBTSW1JM2hsT1RBME95SWdaMng1Y0dndGJtRnRaVDBpYldsdWFXMXBlbVVpSUdSaGRHRXRkR0ZuY3owaWJXbHVhVzFwZW1VaUlHaHZjbWw2TFdGa2RpMTRQU0l4TXpFM0lpQmtQU0pOT1RjNExqSTBPU0F5TWpndU5UY3hhQzAyTXprdU9UZ3lZeTAyTVM0eE1URWdNQzB4TVRndU9ETTVJREF0TVRFNExqZ3pPUzA1TkM0M05UZDJMVEk1TGprek5HTXdMVGswTGpjek9DQTFOeTQzTWpndE9UUXVOek00SURFeE9DNDRNemt0T1RRdU56TTRhRFl6T1M0NU9ESmpOakV1TVRRM0lEQWdNVEU0TGpnNU5DQXdJREV4T0M0NE9UUWdPVFF1TnpVM2RqSTVMamt6TkdNd0lEazBMamN6T0MwMU55NDNORFlnT1RRdU56TTRMVEV4T0M0NE9UUWdPVFF1TnpNNGVpSWdMejRLUEdkc2VYQm9JSFZ1YVdOdlpHVTlJaVlqZUdVNU1EVTdJaUJuYkhsd2FDMXVZVzFsUFNKdWIzSnRZV3hwZW1VaUlHUmhkR0V0ZEdGbmN6MGlibTl5YldGc2FYcGxJaUJvYjNKcGVpMWhaSFl0ZUQwaU1UTXhOeUlnWkQwaVRUZzFNQzQ1T1RrZ05qTXdMamcxTjJndE5UTTRMakEzTldNdE5URXVOVEk1SURBdE9UTXVORGsxTFRVekxqa3lOUzA1TXk0ME9UVXRPVFl1TURVMWRpMDBORGt1TWpRell6QXROREl1TVRNZ05ERXVPVFkyTFRjMkxqUXhOaUE1TXk0ME9UVXROell1TkRFMmFEVXpPQzR3TnpWak5URXVOVEk1SURBZ09Ua3VPRFU0SURNMExqSTROaUE1T1M0NE5UZ2dOell1TkRFMmRqUTBPUzR5TkROak1DQTBNaTR4TXkwME9DNHpNamtnT1RZdU1EVTFMVGs1TGpnMU9DQTVOaTR3TlRWNlRUZzVOaUE0TlM0MU5UbGpNQzB4TkM0ME9ESXRNall1TnpjdE16a3VPRFExTFRRMUxqQXdNUzB6T1M0NE5EVm9MVFV6T0M0d056VmpMVEU0TGpJek1TQXdMVE00TGpZek9DQXlOUzR6TmpJdE16Z3VOak00SURNNUxqZzBOWFkwTXpVdU5UZzBhRFl5TVM0M01UUjJMVFF6TlM0MU9EUjZUVEV3TURNdU5qUTRJRGd6TW1ndE5UTTRMakEzTldNdE5URXVOVEk1SURBdE9Ua3VPRFU0TFRNMExqSTROaTA1T1M0NE5UZ3ROell1TkRFMmRpMDRPQzR4TlRWb05UUXVPRFUzZGpVMExqZzFOMmcyTWpFdU56RTBkaTAwTVRVdU9UUTFZekF0TVRRdU5EZ3lMVEl3TGpRd055MDFPUzQwT0RNdE16Z3VOak00TFRVNUxqUTRNMmd0TVRZdU1qRTVkaTB6Tmk0MU56Rm9NVFl1TWpFNVl6VXhMalV5T1NBd0lEa3pMalE1TlNBMU15NDVNalVnT1RNdU5EazFJRGsyTGpBMU5YWTBORGt1TWpRell6QWdOREl1TVRNdE5ERXVPVFkySURjMkxqUXhOaTA1TXk0ME9UVWdOell1TkRFMmVpSWdMejRLUEM5bWIyNTBQand2WkdWbWN6NDhMM04yWno0PVwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvanNwYW5lbDQvZGlzdC9mb250cy9qc2dseXBoLnN2Z1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvanNwYW5lbDQvZGlzdC9mb250cy9qc2dseXBoLnN2Z1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTpmb250L3R0ZjtiYXNlNjQsQUFFQUFBQUxBSUFBQXdBd1QxTXZNZzhTQnVFQUFBQzhBQUFBWUdOdFlYQVhWdEtNQUFBQkhBQUFBRlJuWVhOd0FBQUFFQUFBQVhBQUFBQUlaMng1Wmxtb1kxd0FBQUY0QUFBQ3hHaGxZV1FJdkRNRUFBQUVQQUFBQURab2FHVmhDRTRFOEFBQUJIUUFBQUFrYUcxMGVDVGVCTUFBQUFTWUFBQUFLR3h2WTJFRENnSklBQUFFd0FBQUFCWnRZWGh3QUE0QU5RQUFCTmdBQUFBZ2JtRnRaVXF0eWhrQUFBVDRBQUFDb0hCdmMzUUFBd0FBQUFBSG1BQUFBQ0FBQXdTeUFaQUFCUUFBQXBrQ3pBQUFBSThDbVFMTUFBQUI2d0F6QVFrQUFBQUFBQUFBQUFBQUFBQUFBQUFCRUFBQUFBQUFBQUFBQUFBQUFBQUFBQUJBQUFEcEJRUEEvOEFBUUFQQUFFQUFBQUFCQUFBQUFBQUFBQUFBQUFBZ0FBQUFBQUFEQUFBQUF3QUFBQndBQVFBREFBQUFIQUFEQUFFQUFBQWNBQVFBT0FBQUFBb0FDQUFDQUFJQUFRQWc2UVgvL2YvL0FBQUFBQUFnNlFELy9mLy9BQUgvNHhjRUFBTUFBUUFBQUFBQUFBQUFBQUFBQVFBQi8vOEFEd0FCQUFBQUFBQUFBQUFBQWdBQU56a0JBQUFBQUFFQUFBQUFBQUFBQUFBQ0FBQTNPUUVBQUFBQUFRQUFBQUFBQUFBQUFBSUFBRGM1QVFBQUFBQUJBSmtCQ1FTTUFsNEFIZ0FBQVM0QkJ3NERCeTRESnlZR0J3WVdGeDRETXpJMkpUNEJKd1NNQ3l3VVFvbDJXeFVWV25XSFFSUXJEQXNNRktPN1loOEZEWVFCVXhRTUNnSklGQTBMSkVrL0xnb0lMajlLSkF3TkV4UXNDMXhqTGdnOXR3c3NGQUFBQUFFQW1RRVFCSXdDWlFBZUFBQUJEZ0VuTGdNbkRnTUhCaVluSmpZM1BnTXpNaFlGSGdFSEJJd0xMQlJDaVhaYkZSVmFkWWRCRkNzTUN3d1VvN3RpSHdVTmhBRlRGQXdLQVNZVURRc2tTVDh1Q2drdFAwb2xDd3dVRkN3TFhHTXVDRDYzQ3lzVUFBQUFBUUQ5QUNzRUZnTkdBQ1lBQUFrQk5qUW5KaUlIQ1FFbUlnY0dGQmNKQVFZVUZ4NEJNekkyTndrQkhnRXpNalkzTmpRbkFRTFJBVVVQRHc4ckQvNjgvcndQS2c4UER3RkUvc2dQRHdnU0Nnb1RCd0U0QVRnSEV3b0tFd2NQRC83SUFib0JSQThxRHc4UC9yd0JSQThQRHlvUC9yeit5QThxRHdnSEJ3Z0JOLzdKQ0FjSENBOHFEd0U0QUFBQ0FOc0FDUVJKQTNjQUVBQWJBQUFCSVNJR0ZSRVVGak1oTWpZMUVUUW1JeEVoSWlZMUVTRVJGQVlqQTlqOWRTOURReThDaXk5Q1FpLzlkUkVYQXRzWEVRTjNRUy85Y2k5QlFTOENqaTlCL05zWEVBSlovYWNRRndBQUFBRUEyd0FKQkVrQTVRQVFBQUFsSVNJR0hRRVVGak1oTWpZOUFUUW1Jd1BTL1lBdVNVa3VBb0F1U1VrdTVSaEhIa2NZR0VjZVJ4Z0FBd0RiQUFrRVNRTkFBQkFBR3dBeUFBQUJJU0lHRlJFVUZqTWhNalkxRVRRbUl4TVVCaU1oSWlZMUVTRVJFeUVpQmgwQk16VWhFUlFHS3dFVk16STJOUkUwSmlNRFUvM21KemMzSndJYUp6MDlKeTBmRHYzbURoa0NibXo5NWljOU53SnRHUTBSRVNZM055WUNkMEVmL2o4Z0xTMGdBY0VmUWYzZkN4MGRDd0d6L2swQzZpMGZXVGYrWUFzd0pVRWZBY0lmTFFBQUFBQUJBQUFBQVFBQU5yRitQVjhQUFBVQUN3UUFBQUFBQU5LSTkwZ0FBQUFBMG9qM1NBQUFBQUFFakFOM0FBQUFDQUFDQUFBQUFBQUFBQUVBQUFQQS84QUFBQVVsQUFBQUFBU01BQUVBQUFBQUFBQUFBQUFBQUFBQUFBQUtCQUFBQUFBQUFBQUFBQUFBQWdBQUFBVWxBSmtGSlFDWkJTVUEvUVVsQU5zRkpRRGJCU1VBMndBQUFBQUFDZ0FVQUI0QVVnQ0dBTXdBK2dFV0FXSUFBQUFCQUFBQUNnQXpBQU1BQUFBQUFBSUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFGZ0VPQUFFQUFBQUFBQUFBRXdDV0FBRUFBQUFBQUFFQUJ3QUFBQUVBQUFBQUFBSUFCd0VhQUFFQUFBQUFBQU1BQndEd0FBRUFBQUFBQUFRQUJ3RXZBQUVBQUFBQUFBVUFDd0RQQUFFQUFBQUFBQVlBQndFRkFBRUFBQUFBQUFrQURnQVZBQUVBQUFBQUFBb0FHZ0ZFQUFFQUFBQUFBQXdBR2dBL0FBRUFBQUFBQUEwQUF3Q05BQU1BQVFRSkFBQUFKZ0NwQUFNQUFRUUpBQUVBRGdBSEFBTUFBUVFKQUFJQURnRWhBQU1BQVFRSkFBTUFEZ0QzQUFNQUFRUUpBQVFBRGdFMkFBTUFBUVFKQUFVQUZnRGFBQU1BQVFRSkFBWUFEZ0VNQUFNQUFRUUpBQWtBSEFBakFBTUFBUVFKQUFvQU5BRmVBQU1BQVFRSkFBd0FOQUJaQUFNQUFRUUpBQTBBQmdDUWFuTm5iSGx3YUFCcUFITUFad0JzQUhrQWNBQm9VM1JsWm1GdUlGTjBjdVRmWlhJQVV3QjBBR1VBWmdCaEFHNEFJQUJUQUhRQWNnRGtBTjhBWlFCeWFIUjBjRG92TDNOMFpXWmhibk4wY21GbGMzTmxjaTVsZFM4QWFBQjBBSFFBY0FBNkFDOEFMd0J6QUhRQVpRQm1BR0VBYmdCekFIUUFjZ0JoQUdVQWN3QnpBR1VBY2dBdUFHVUFkUUF2VFVsVUFFMEFTUUJVTWpBeE5TQlRkR1ZtWVc0Z1UzUnk1TjlsY2dBeUFEQUFNUUExQUNBQVV3QjBBR1VBWmdCaEFHNEFJQUJUQUhRQWNnRGtBTjhBWlFCeVZtVnljMmx2YmlBeExqQUFWZ0JsQUhJQWN3QnBBRzhBYmdBZ0FERUFMZ0F3YW5ObmJIbHdhQUJxQUhNQVp3QnNBSGtBY0FCb2FuTm5iSGx3YUFCcUFITUFad0JzQUhrQWNBQm9VbVZuZFd4aGNnQlNBR1VBWndCMUFHd0FZUUJ5YW5ObmJIbHdhQUJxQUhNQVp3QnNBSGtBY0FCb1JtOXVkQ0JuWlc1bGNtRjBaV1FnWW5rZ1NXTnZUVzl2Ymk0QVJnQnZBRzRBZEFBZ0FHY0FaUUJ1QUdVQWNnQmhBSFFBWlFCa0FDQUFZZ0I1QUNBQVNRQmpBRzhBVFFCdkFHOEFiZ0F1QUFNQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQT1cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvZm9udHMvanNnbHlwaC50dGZcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvZm9udHMvanNnbHlwaC50dGZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6Zm9udC93b2ZmO2Jhc2U2NCxkMDlHUmdBQkFBQUFBQWdFQUFzQUFBQUFCN2dBQVFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQlBVeTh5QUFBQkNBQUFBR0FBQUFCZ0R4SUc0V050WVhBQUFBRm9BQUFBVkFBQUFGUVhWdEtNWjJGemNBQUFBYndBQUFBSUFBQUFDQUFBQUJCbmJIbG1BQUFCeEFBQUFzUUFBQUxFV2FoalhHaGxZV1FBQUFTSUFBQUFOZ0FBQURZSXZETUVhR2hsWVFBQUJNQUFBQUFrQUFBQUpBaE9CUEJvYlhSNEFBQUU1QUFBQUNnQUFBQW9KTjRFd0d4dlkyRUFBQVVNQUFBQUZnQUFBQllEQ2dKSWJXRjRjQUFBQlNRQUFBQWdBQUFBSUFBT0FEVnVZVzFsQUFBRlJBQUFBcUFBQUFLZ1NxM0tHWEJ2YzNRQUFBZmtBQUFBSUFBQUFDQUFBd0FBQUFNRXNnR1FBQVVBQUFLWkFzd0FBQUNQQXBrQ3pBQUFBZXNBTXdFSkFBQUFBQUFBQUFBQUFBQUFBQUFBQVJBQUFBQUFBQUFBQUFBQUFBQUFBQUFBUUFBQTZRVUR3UC9BQUVBRHdBQkFBQUFBQVFBQUFBQUFBQUFBQUFBQUlBQUFBQUFBQXdBQUFBTUFBQUFjQUFFQUF3QUFBQndBQXdBQkFBQUFIQUFFQURnQUFBQUtBQWdBQWdBQ0FBRUFJT2tGLy8zLy93QUFBQUFBSU9rQS8vMy8vd0FCLytNWEJBQURBQUVBQUFBQUFBQUFBQUFBQUFFQUFmLy9BQThBQVFBQUFBQUFBQUFBQUFJQUFEYzVBUUFBQUFBQkFBQUFBQUFBQUFBQUFnQUFOemtCQUFBQUFBRUFBQUFBQUFBQUFBQUNBQUEzT1FFQUFBQUFBUUNaQVFrRWpBSmVBQjRBQUFFdUFRY09Bd2N1QXljbUJnY0dGaGNlQXpNeU5pVStBU2NFakFzc0ZFS0pkbHNWRlZwMWgwRVVLd3dMREJTanUySWZCUTJFQVZNVURBb0NTQlFOQ3lSSlB5NEtDQzQvU2lRTURSTVVMQXRjWXk0SVBiY0xMQlFBQUFBQkFKa0JFQVNNQW1VQUhnQUFBUTRCSnk0REp3NERCd1ltSnlZMk56NERNeklXQlI0QkJ3U01DeXdVUW9sMld4VVZXbldIUVJRckRBc01GS083WWg4RkRZUUJVeFFNQ2dFbUZBMExKRWsvTGdvSkxUOUtKUXNNRkJRc0MxeGpMZ2crdHdzckZBQUFBQUVBL1FBckJCWURSZ0FtQUFBSkFUWTBKeVlpQndrQkppSUhCaFFYQ1FFR0ZCY2VBVE15TmpjSkFSNEJNekkyTnpZMEp3RUMwUUZGRHc4UEt3Lyt2UDY4RHlvUER3OEJSUDdJRHc4SUVnb0tFd2NCT0FFNEJ4TUtDaE1IRHcvK3lBRzZBVVFQS2c4UEQvNjhBVVFQRHc4cUQvNjgvc2dQS2c4SUJ3Y0lBVGYreVFnSEJ3Z1BLZzhCT0FBQUFnRGJBQWtFU1FOM0FCQUFHd0FBQVNFaUJoVVJGQll6SVRJMk5SRTBKaU1SSVNJbU5SRWhFUlFHSXdQWS9YVXZRME12QW9zdlFrSXYvWFVSRndMYkZ4RURkMEV2L1hJdlFVRXZBbzR2UWZ6YkZ4QUNXZjJuRUJjQUFBQUJBTnNBQ1FSSkFPVUFFQUFBSlNFaUJoMEJGQll6SVRJMlBRRTBKaU1EMHYyQUxrbEpMZ0tBTGtsSkx1VVlSeDVIR0JoSEhrY1lBQU1BMndBSkJFa0RRQUFRQUJzQU1nQUFBU0VpQmhVUkZCWXpJVEkyTlJFMEppTVRGQVlqSVNJbU5SRWhFUk1oSWdZZEFUTTFJUkVVQmlzQkZUTXlOalVSTkNZakExUDk1aWMzTnljQ0dpYzlQU2N0SHc3OTVnNFpBbTVzL2VZblBUY0NiUmtORVJFbU56Y21BbmRCSC80L0lDMHRJQUhCSDBIOTN3c2RIUXNCcy81TkF1b3RIMWszL21BTE1DVkJId0hDSHkwQUFBQUFBUUFBQUFFQUFEYXhmajFmRHp6MUFBc0VBQUFBQUFEU2lQZElBQUFBQU5LSTkwZ0FBQUFBQkl3RGR3QUFBQWdBQWdBQUFBQUFBQUFCQUFBRHdQL0FBQUFGSlFBQUFBQUVqQUFCQUFBQUFBQUFBQUFBQUFBQUFBQUFDZ1FBQUFBQUFBQUFBQUFBQUFJQUFBQUZKUUNaQlNVQW1RVWxBUDBGSlFEYkJTVUEyd1VsQU5zQUFBQUFBQW9BRkFBZUFGSUFoZ0RNQVBvQkZnRmlBQUFBQVFBQUFBb0FNd0FEQUFBQUFBQUNBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQllCRGdBQkFBQUFBQUFBQUJNQWxnQUJBQUFBQUFBQkFBY0FBQUFCQUFBQUFBQUNBQWNCR2dBQkFBQUFBQUFEQUFjQThBQUJBQUFBQUFBRUFBY0JMd0FCQUFBQUFBQUZBQXNBendBQkFBQUFBQUFHQUFjQkJRQUJBQUFBQUFBSkFBNEFGUUFCQUFBQUFBQUtBQm9CUkFBQkFBQUFBQUFNQUJvQVB3QUJBQUFBQUFBTkFBTUFqUUFEQUFFRUNRQUFBQ1lBcVFBREFBRUVDUUFCQUE0QUJ3QURBQUVFQ1FBQ0FBNEJJUUFEQUFFRUNRQURBQTRBOXdBREFBRUVDUUFFQUE0Qk5nQURBQUVFQ1FBRkFCWUEyZ0FEQUFFRUNRQUdBQTRCREFBREFBRUVDUUFKQUJ3QUl3QURBQUVFQ1FBS0FEUUJYZ0FEQUFFRUNRQU1BRFFBV1FBREFBRUVDUUFOQUFZQWtHcHpaMng1Y0dnQWFnQnpBR2NBYkFCNUFIQUFhRk4wWldaaGJpQlRkSExrMzJWeUFGTUFkQUJsQUdZQVlRQnVBQ0FBVXdCMEFISUE1QURmQUdVQWNtaDBkSEE2THk5emRHVm1ZVzV6ZEhKaFpYTnpaWEl1WlhVdkFHZ0FkQUIwQUhBQU9nQXZBQzhBY3dCMEFHVUFaZ0JoQUc0QWN3QjBBSElBWVFCbEFITUFjd0JsQUhJQUxnQmxBSFVBTDAxSlZBQk5BRWtBVkRJd01UVWdVM1JsWm1GdUlGTjBjdVRmWlhJQU1nQXdBREVBTlFBZ0FGTUFkQUJsQUdZQVlRQnVBQ0FBVXdCMEFISUE1QURmQUdVQWNsWmxjbk5wYjI0Z01TNHdBRllBWlFCeUFITUFhUUJ2QUc0QUlBQXhBQzRBTUdweloyeDVjR2dBYWdCekFHY0FiQUI1QUhBQWFHcHpaMng1Y0dnQWFnQnpBR2NBYkFCNUFIQUFhRkpsWjNWc1lYSUFVZ0JsQUdjQWRRQnNBR0VBY21weloyeDVjR2dBYWdCekFHY0FiQUI1QUhBQWFFWnZiblFnWjJWdVpYSmhkR1ZrSUdKNUlFbGpiMDF2YjI0dUFFWUFid0J1QUhRQUlBQm5BR1VBYmdCbEFISUFZUUIwQUdVQVpBQWdBR0lBZVFBZ0FFa0FZd0J2QUUwQWJ3QnZBRzRBTGdBREFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFcIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvZm9udHMvanNnbHlwaC53b2ZmXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9kaXN0L2ZvbnRzL2pzZ2x5cGgud29mZlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL2pzcGFuZWwuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9qc3BhbmVsLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9qc3BhbmVsLmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvanNwYW5lbC5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2pzcGFuZWw0L2Rpc3QvanNwYW5lbC5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRUYXJnZXQgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG59O1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgcGFzc2luZyBmdW5jdGlvbiBpbiBvcHRpb25zLCB0aGVuIHVzZSBpdCBmb3IgcmVzb2x2ZSBcImhlYWRcIiBlbGVtZW50LlxuICAgICAgICAgICAgICAgIC8vIFVzZWZ1bCBmb3IgU2hhZG93IFJvb3Qgc3R5bGUgaS5lXG4gICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgIC8vICAgaW5zZXJ0SW50bzogZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb29cIikuc2hhZG93Um9vdCB9XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBnZXRUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xuXHRcdFx0Ly8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblx0XHRcdGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bdGFyZ2V0XVxuXHR9O1xufSkoKTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSBcImJvb2xlYW5cIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcbiAgICAgICAgaWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8gKyBcIiBcIiArIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcLykvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IEJ1dHRwbHVnRGV2aWNlLCBTaW5nbGVNb3RvclZpYnJhdGVDbWQsIEZsZXNobGlnaHRMYXVuY2hGVzEyQ21kIH0gZnJvbSBcIi4uL2luZGV4XCI7XG5pbXBvcnQgKiBhcyBNZXNzYWdlcyBmcm9tIFwiLi4vaW5kZXhcIjtcblxuZXhwb3J0IGNsYXNzIFRlc3REZXZpY2UgZXh0ZW5kcyBCdXR0cGx1Z0RldmljZSB7XG5cbiAgcHJpdmF0ZSBfY29ubmVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX2xpbmVhclNwZWVkOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9saW5lYXJQb3NpdGlvbjogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfdmlicmF0ZVNwZWVkOiBudW1iZXIgPSAwO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICBzaG91bGRWaWJyYXRlOiBib29sZWFuID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICBzaG91bGRMaW5lYXI6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHN1cGVyKGBUZXN0IERldmljZSAtICR7bmFtZX1gLCBcIlRlc3REZXZpY2VcIiArIChzaG91bGRWaWJyYXRlID8gXCJWaWJyYXRlXCIgOiBcIlwiKSArIChzaG91bGRMaW5lYXIgPyBcIkxpbmVhclwiIDogXCJcIikpO1xuICAgIHRoaXMuTXNnRnVuY3Muc2V0KE1lc3NhZ2VzLlN0b3BEZXZpY2VDbWQubmFtZSwgdGhpcy5IYW5kbGVTdG9wRGV2aWNlQ21kKTtcbiAgICBpZiAoc2hvdWxkVmlicmF0ZSkge1xuICAgICAgdGhpcy5Nc2dGdW5jcy5zZXQoTWVzc2FnZXMuU2luZ2xlTW90b3JWaWJyYXRlQ21kLm5hbWUsIHRoaXMuSGFuZGxlU2luZ2xlTW90b3JWaWJyYXRlQ21kKTtcbiAgICAgIHRoaXMuTXNnRnVuY3Muc2V0KE1lc3NhZ2VzLlZpYnJhdGVDbWQubmFtZSwgdGhpcy5IYW5kbGVWaWJyYXRlQ21kKTtcbiAgICB9XG4gICAgaWYgKHNob3VsZExpbmVhcikge1xuICAgICAgdGhpcy5Nc2dGdW5jcy5zZXQoTWVzc2FnZXMuRmxlc2hsaWdodExhdW5jaEZXMTJDbWQubmFtZSwgdGhpcy5IYW5kbGVGbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZCk7XG4gICAgICB0aGlzLk1zZ0Z1bmNzLnNldChNZXNzYWdlcy5MaW5lYXJDbWQubmFtZSwgdGhpcy5IYW5kbGVMaW5lYXJDbWQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgQ29ubmVjdGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9jb25uZWN0ZWQ7XG4gIH1cblxuICBwdWJsaWMgc2V0IENvbm5lY3RlZChjb25uZWN0ZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9jb25uZWN0ZWQgPSBjb25uZWN0ZWQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IE1lc3NhZ2VTcGVjaWZpY2F0aW9ucygpOiBvYmplY3Qge1xuICAgIGlmICh0aGlzLk1zZ0Z1bmNzLmhhcyhNZXNzYWdlcy5WaWJyYXRlQ21kLm5hbWUpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBWaWJyYXRlQ21kOiB7IEZlYXR1cmVDb3VudDogMSB9LFxuICAgICAgICBTaW5nbGVNb3RvclZpYnJhdGVDbWQ6IHt9LFxuICAgICAgICBTdG9wRGV2aWNlQ21kOiB7fSxcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0aGlzLk1zZ0Z1bmNzLmhhcyhNZXNzYWdlcy5MaW5lYXJDbWQubmFtZSkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIExpbmVhckNtZDogeyBGZWF0dXJlQ291bnQ6IDEgfSxcbiAgICAgICAgRmxlc2hsaWdodExhdW5jaEZXMTJDbWQ6IHt9LFxuICAgICAgICBTdG9wRGV2aWNlQ21kOiB7fSxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIHB1YmxpYyBEaXNjb25uZWN0KCkge1xuICAgIHRoaXMuX2Nvbm5lY3RlZCA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdChcImRldmljZXJlbW92ZWRcIiwgdGhpcyk7XG4gIH1cblxuICBwcml2YXRlIEhhbmRsZVN0b3BEZXZpY2VDbWQgPSBhc3luYyAoYU1zZzogTWVzc2FnZXMuU3RvcERldmljZUNtZCk6IFByb21pc2U8TWVzc2FnZXMuQnV0dHBsdWdNZXNzYWdlPiA9PiB7XG4gICAgaWYgKHRoaXMuTXNnRnVuY3MuaGFzKE1lc3NhZ2VzLlZpYnJhdGVDbWQubmFtZSkpIHtcbiAgICAgIHRoaXMuZW1pdChcInZpYnJhdGVcIiwgMCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLk1zZ0Z1bmNzLmhhcyhNZXNzYWdlcy5MaW5lYXJDbWQubmFtZSkpIHtcbiAgICAgIHRoaXMuZW1pdChcImxpbmVhclwiLCB7IHBvc2l0aW9uOiB0aGlzLl9saW5lYXJQb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogdGhpcy5fbGluZWFyU3BlZWR9KTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgTWVzc2FnZXMuT2soYU1zZy5JZCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBIYW5kbGVTaW5nbGVNb3RvclZpYnJhdGVDbWQgPVxuICAgIGFzeW5jIChhTXNnOiBNZXNzYWdlcy5TaW5nbGVNb3RvclZpYnJhdGVDbWQpOiBQcm9taXNlPE1lc3NhZ2VzLkJ1dHRwbHVnTWVzc2FnZT4gPT4ge1xuICAgICAgdGhpcy5fdmlicmF0ZVNwZWVkID0gYU1zZy5TcGVlZDtcbiAgICAgIHRoaXMuZW1pdChcInZpYnJhdGVcIiwgYU1zZy5TcGVlZCk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBNZXNzYWdlcy5PayhhTXNnLklkKSk7XG4gICAgfVxuXG4gIHByaXZhdGUgSGFuZGxlVmlicmF0ZUNtZCA9XG4gICAgYXN5bmMgKGFNc2c6IE1lc3NhZ2VzLlZpYnJhdGVDbWQpOiBQcm9taXNlPE1lc3NhZ2VzLkJ1dHRwbHVnTWVzc2FnZT4gPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuSGFuZGxlU2luZ2xlTW90b3JWaWJyYXRlQ21kKG5ldyBTaW5nbGVNb3RvclZpYnJhdGVDbWQoYU1zZy5TcGVlZHNbMF0uU3BlZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhTXNnLkRldmljZUluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYU1zZy5JZCkpO1xuICAgIH1cblxuICBwcml2YXRlIEhhbmRsZUZsZXNobGlnaHRMYXVuY2hGVzEyQ21kID1cbiAgICBhc3luYyAoYU1zZzogTWVzc2FnZXMuRmxlc2hsaWdodExhdW5jaEZXMTJDbWQpOiBQcm9taXNlPE1lc3NhZ2VzLkJ1dHRwbHVnTWVzc2FnZT4gPT4ge1xuICAgICAgdGhpcy5fbGluZWFyUG9zaXRpb24gPSBhTXNnLlBvc2l0aW9uO1xuICAgICAgdGhpcy5fbGluZWFyU3BlZWQgPSBhTXNnLlNwZWVkO1xuICAgICAgdGhpcy5lbWl0KFwibGluZWFyXCIsIHsgcG9zaXRpb246IHRoaXMuX2xpbmVhclBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVkOiB0aGlzLl9saW5lYXJTcGVlZCB9KTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IE1lc3NhZ2VzLk9rKGFNc2cuSWQpKTtcbiAgICB9XG5cbiAgcHJpdmF0ZSBIYW5kbGVMaW5lYXJDbWQgPVxuICAgIGFzeW5jIChhTXNnOiBNZXNzYWdlcy5MaW5lYXJDbWQpOiBQcm9taXNlPE1lc3NhZ2VzLkJ1dHRwbHVnTWVzc2FnZT4gPT4ge1xuICAgICAgaWYgKGFNc2cuVmVjdG9ycy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlcy5FcnJvcihcIkxpbmVhckNtZCByZXF1aXJlcyAxIHZlY3RvciBmb3IgdGhpcyBkZXZpY2UuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWVzc2FnZXMuRXJyb3JDbGFzcy5FUlJPUl9ERVZJQ0UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYU1zZy5JZCk7XG4gICAgICB9XG4gICAgICAvLyBNb3ZlIGJldHdlZW4gNS85NSwgb3RoZXJ3aXNlIHdlJ2xsIGFsbG93IHRoZSBkZXZpY2UgdG8gc21hY2sgaW50byBoYXJkXG4gICAgICAvLyBzdG9wcyBiZWNhdXNlIG9mIGJyYWluZGVhZCBmaXJtd2FyZS5cbiAgICAgIGNvbnN0IHJhbmdlOiBudW1iZXIgPSA5MDtcbiAgICAgIGNvbnN0IHZlY3RvciA9IGFNc2cuVmVjdG9yc1swXTtcbiAgICAgIGNvbnN0IGN1cnJlbnRQb3NpdGlvbiA9IHZlY3Rvci5Qb3NpdGlvbiAqIDEwMDtcbiAgICAgIGNvbnN0IHBvc2l0aW9uRGVsdGE6IG51bWJlciA9IE1hdGguYWJzKGN1cnJlbnRQb3NpdGlvbiAtIHRoaXMuX2xpbmVhclBvc2l0aW9uKTtcbiAgICAgIGxldCBzcGVlZDogbnVtYmVyID0gTWF0aC5mbG9vcigyNTAwMCAqIE1hdGgucG93KCgodmVjdG9yLkR1cmF0aW9uICogOTApIC8gcG9zaXRpb25EZWx0YSksIC0xLjA1KSk7XG5cbiAgICAgIC8vIENsYW1wIHNwZWVkIG9uIDAgPD0geCA8PSA5NSBzbyB3ZSBkb24ndCBicmVhayB0aGUgbGF1bmNoLlxuICAgICAgc3BlZWQgPSBNYXRoLm1pbihNYXRoLm1heChzcGVlZCwgMCksIDk1KTtcblxuICAgICAgY29uc3QgcG9zaXRpb25Hb2FsID0gTWF0aC5mbG9vcigoKGN1cnJlbnRQb3NpdGlvbiAvIDk5KSAqIHJhbmdlKSArICgoOTkgLSByYW5nZSkgLyAyKSk7XG4gICAgICAvLyBXZSdsbCBzZXQgdGhpcy5fbGFzdFBvc2l0aW9uIGluIEZsZXNobGlnaHRMYXVuY2hGVzEyQ21kLCBzaW5jZVxuICAgICAgLy8gZXZlcnl0aGluZyBraW5kYSBmdW5uZWxzIHRvIHRoYXQuXG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5IYW5kbGVGbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZChuZXcgTWVzc2FnZXMuRmxlc2hsaWdodExhdW5jaEZXMTJDbWQoc3BlZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25Hb2FsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFNc2cuRGV2aWNlSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYU1zZy5JZCkpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kZXZ0b29scy9UZXN0RGV2aWNlLnRzIiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcImV2ZW50c1wiO1xuaW1wb3J0IHsgSURldmljZVN1YnR5cGVNYW5hZ2VyIH0gZnJvbSBcIi4uL2luZGV4XCI7XG5pbXBvcnQgeyBUZXN0RGV2aWNlIH0gZnJvbSBcIi4vVGVzdERldmljZVwiO1xuaW1wb3J0IHsgQnV0dHBsdWdMb2dnZXIgfSBmcm9tIFwiLi4vaW5kZXhcIjtcblxuZXhwb3J0IGNsYXNzIFRlc3REZXZpY2VNYW5hZ2VyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIGltcGxlbWVudHMgSURldmljZVN1YnR5cGVNYW5hZ2VyIHtcblxuICBwcml2YXRlIF9pc1NjYW5uaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgX3Rlc3RWaWJyYXRpb25EZXZpY2UgPSBuZXcgVGVzdERldmljZShcIlRlc3QgVmlicmF0aW9uIERldmljZVwiLCB0cnVlLCBmYWxzZSk7XG4gIHByaXZhdGUgX3Rlc3RMaW5lYXJEZXZpY2UgPSBuZXcgVGVzdERldmljZShcIlRlc3QgTGluZWFyIERldmljZVwiLCBmYWxzZSwgdHJ1ZSk7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwdWJsaWMgQ29ubmVjdFZpYnJhdGlvbkRldmljZSgpIHtcbiAgICBCdXR0cGx1Z0xvZ2dlci5Mb2dnZXIuRGVidWcoXCJUZXN0RGV2aWNlTWFuYWdlcjogQ29ubmVjdGluZyBWaWJyYXRpb24gRGV2aWNlXCIpO1xuICAgIHRoaXMuX3Rlc3RWaWJyYXRpb25EZXZpY2UuQ29ubmVjdGVkID0gdHJ1ZTtcbiAgICB0aGlzLmVtaXQoXCJkZXZpY2VhZGRlZFwiLCB0aGlzLl90ZXN0VmlicmF0aW9uRGV2aWNlKTtcbiAgfVxuXG4gIHB1YmxpYyBDb25uZWN0TGluZWFyRGV2aWNlKCkge1xuICAgIEJ1dHRwbHVnTG9nZ2VyLkxvZ2dlci5EZWJ1ZyhcIlRlc3REZXZpY2VNYW5hZ2VyOiBDb25uZWN0aW5nIExpbmVhciBEZXZpY2VcIik7XG4gICAgdGhpcy5fdGVzdExpbmVhckRldmljZS5Db25uZWN0ZWQgPSB0cnVlO1xuICAgIHRoaXMuZW1pdChcImRldmljZWFkZGVkXCIsIHRoaXMuX3Rlc3RMaW5lYXJEZXZpY2UpO1xuICB9XG5cbiAgcHVibGljIFN0YXJ0U2Nhbm5pbmcoKTogdm9pZCB7XG4gICAgQnV0dHBsdWdMb2dnZXIuTG9nZ2VyLkRlYnVnKFwiVGVzdERldmljZU1hbmFnZXI6IFN0YXJ0aW5nIFNjYW5cIik7XG4gICAgdGhpcy5faXNTY2FubmluZyA9IHRydWU7XG4gICAgLy8gQWx3YXlzIGVtaXQgZGV2aWNlcy4gSWYgdGhleSdyZSBkdXBsaWNhdGVzLCB0aGUgZGV2aWNlIG1hbmFnZXIgd2lsbCB3ZWVkXG4gICAgLy8gdGhlbSBvdXQuXG4gICAgc2V0VGltZW91dCgoKSA9PiAge1xuICAgICAgdGhpcy5Db25uZWN0VmlicmF0aW9uRGV2aWNlKCk7XG4gICAgICB0aGlzLkNvbm5lY3RMaW5lYXJEZXZpY2UoKTtcbiAgICB9LCA1MCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLlN0b3BTY2FubmluZygpLCAxMDApO1xuICB9XG5cbiAgcHVibGljIGdldCBWaWJyYXRpb25EZXZpY2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Rlc3RWaWJyYXRpb25EZXZpY2U7XG4gIH1cblxuICBwdWJsaWMgZ2V0IExpbmVhckRldmljZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdGVzdExpbmVhckRldmljZTtcbiAgfVxuXG4gIHB1YmxpYyBTdG9wU2Nhbm5pbmcoKTogdm9pZCB7XG4gICAgQnV0dHBsdWdMb2dnZXIuTG9nZ2VyLkRlYnVnKFwiVGVzdERldmljZU1hbmFnZXI6IFN0b3BwaW5nIFNjYW5cIik7XG4gICAgdGhpcy5faXNTY2FubmluZyA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdChcInNjYW5uaW5nZmluaXNoZWRcIik7XG4gIH1cblxuICBwdWJsaWMgZ2V0IElzU2Nhbm5pbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzU2Nhbm5pbmc7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kZXZ0b29scy9UZXN0RGV2aWNlTWFuYWdlci50cyIsImltcG9ydCB7IEJ1dHRwbHVnQ2xpZW50LCBCdXR0cGx1Z0VtYmVkZGVkU2VydmVyQ29ubmVjdG9yLCBCdXR0cGx1Z1NlcnZlciB9IGZyb20gXCIuLi9pbmRleFwiO1xuaW1wb3J0IHsgVGVzdERldmljZU1hbmFnZXIgfSBmcm9tIFwiLi9UZXN0RGV2aWNlTWFuYWdlclwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gQ3JlYXRlRGV2VG9vbHNDbGllbnQoKTogUHJvbWlzZTxCdXR0cGx1Z0NsaWVudD4ge1xuICBjb25zdCBjbGllbnQgPSBuZXcgQnV0dHBsdWdDbGllbnQoXCJUZXN0IENsaWVudFwiKTtcbiAgY29uc3Qgc2VydmVyID0gbmV3IEJ1dHRwbHVnU2VydmVyKFwiVGVzdCBTZXJ2ZXJcIik7XG4gIHNlcnZlci5DbGVhckRldmljZU1hbmFnZXJzKCk7XG4gIHNlcnZlci5BZGREZXZpY2VNYW5hZ2VyKG5ldyBUZXN0RGV2aWNlTWFuYWdlcigpKTtcbiAgY29uc3QgbG9jYWxDb25uZWN0b3IgPSBuZXcgQnV0dHBsdWdFbWJlZGRlZFNlcnZlckNvbm5lY3RvcigpO1xuICBsb2NhbENvbm5lY3Rvci5TZXJ2ZXIgPSBzZXJ2ZXI7XG4gIGF3YWl0IGNsaWVudC5Db25uZWN0KGxvY2FsQ29ubmVjdG9yKTtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjbGllbnQpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2RldnRvb2xzL3V0aWxzLnRzIiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vTG9nUGFuZWwuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0xvZ1BhbmVsLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vTG9nUGFuZWwuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZGV2dG9vbHMvd2ViL0xvZ1BhbmVsLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvZGV2dG9vbHMvd2ViL0xvZ1BhbmVsLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBpZD1cXFwiYnV0dHBsdWdkZXZ0b29sc2xvZ3BhbmVsXFxcIj5cXG4gIDx0ZXh0YXJlYSBpZD1cXFwiYnV0dHBsdWdkZXZ0b29sc2xvZ3RleHRhcmVhXFxcIiByZWFkb25seT48L3RleHRhcmVhPlxcbiAgPGRpdiBpZD1cXFwiYnV0dHBsdWdkZXZ0b29sc2xvZ2xldmVsXFxcIj5cXG4gICAgPGxhYmVsPlBhbmVsIExvZyBMZXZlbDo8L2xhYmVsPlxcbiAgICA8c2VsZWN0IGlkPVxcXCJidXR0cGx1Z2RldnRvb2xzbG9nbGV2ZWxwYW5lbHNlbGVjdFxcXCI+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiT2ZmXFxcIj5PZmY8L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJGYXRhbFxcXCI+RmF0YWw8L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJFcnJvclxcXCI+RXJyb3I8L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJXYXJuXFxcIj5XYXJuPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiSW5mb1xcXCI+SW5mbzwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkRlYnVnXFxcIiBzZWxlY3RlZD5EZWJ1Zzwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIlRyYWNlXFxcIj5UcmFjZTwvb3B0aW9uPlxcbiAgICA8L3NlbGVjdD5cXG4gICAgPGxhYmVsPkNvbnNvbGUgTG9nIExldmVsOjwvbGFiZWw+XFxuICAgIDxzZWxlY3QgaWQ9XFxcImJ1dHRwbHVnZGV2dG9vbHNsb2dsZXZlbGNvbnNvbGVzZWxlY3RcXFwiPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIk9mZlxcXCIgc2VsZWN0ZWQ+T2ZmPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiRmF0YWxcXFwiPkZhdGFsPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiRXJyb3JcXFwiPkVycm9yPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiV2FyblxcXCI+V2Fybjwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkluZm9cXFwiPkluZm88L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJEZWJ1Z1xcXCI+RGVidWc8L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJUcmFjZVxcXCI+VHJhY2U8L29wdGlvbj5cXG4gICAgPC9zZWxlY3Q+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG5cIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9kZXZ0b29scy93ZWIvTG9nUGFuZWwuaHRtbFxuLy8gbW9kdWxlIGlkID0gLi9zcmMvZGV2dG9vbHMvd2ViL0xvZ1BhbmVsLmh0bWxcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgQnV0dHBsdWdMb2dnZXIsIExvZ01lc3NhZ2UsIEJ1dHRwbHVnTG9nTGV2ZWwgfSBmcm9tIFwiLi4vLi4vaW5kZXhcIjtcbmNvbnN0IGpzUGFuZWwgPSByZXF1aXJlKFwiLi9qc3BhbmVsLmpzXCIpO1xucmVxdWlyZShcImpzcGFuZWw0L2Rpc3QvanNwYW5lbC5jc3NcIik7XG5yZXF1aXJlKFwianNwYW5lbDQvZGlzdC9mb250cy9qc2dseXBoLmVvdFwiKTtcbmNvbnN0IGxvZ1BhbmVsSFRNTCA9IHJlcXVpcmUoXCIuL0xvZ1BhbmVsLmh0bWxcIikudG9TdHJpbmcoKTtcbnJlcXVpcmUoXCIuL0xvZ1BhbmVsLmNzc1wiKTtcblxuZXhwb3J0IGNsYXNzIExvZ1BhbmVsIHtcblxuICBwdWJsaWMgc3RhdGljIFNob3dMb2dQYW5lbCgpIHtcbiAgICBqc1BhbmVsLmpzUGFuZWwuY3JlYXRlKHtcbiAgICAgIGlkOiAoKSA9PiBcImJ1dHRwbHVnLWxvZ2dlci1wYW5lbFwiLFxuICAgICAgdGhlbWU6ICAgICAgIFwicHJpbWFyeVwiLFxuICAgICAgaGVhZGVyVGl0bGU6IFwiQnV0dHBsdWcgTG9nXCIsXG4gICAgICBwb3NpdGlvbjogICAgXCJjZW50ZXItdG9wIDAgODBcIixcbiAgICAgIGNvbnRlbnRTaXplOiBcIjY1MCAyNTBcIixcbiAgICAgIGNhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQuaW5uZXJIVE1MID0gbG9nUGFuZWxIVE1MO1xuICAgICAgICBMb2dQYW5lbC5fcGFuZWwgPSBuZXcgTG9nUGFuZWwoKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfcGFuZWw6IExvZ1BhbmVsIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgbG9nVGV4dEFyZWE6IEhUTUxUZXh0QXJlYUVsZW1lbnQ7XG4gIHByaXZhdGUgcGFuZWxMZXZlbFNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQ7XG4gIHByaXZhdGUgY29uc29sZUxldmVsU2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxvZ1RleHRBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0cGx1Z2RldnRvb2xzbG9ndGV4dGFyZWFcIikhIGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQ7XG4gICAgdGhpcy5wYW5lbExldmVsU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0cGx1Z2RldnRvb2xzbG9nbGV2ZWxwYW5lbHNlbGVjdFwiKSEgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgdGhpcy5jb25zb2xlTGV2ZWxTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1dHRwbHVnZGV2dG9vbHNsb2dsZXZlbGNvbnNvbGVzZWxlY3RcIikhIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xuICAgIGNvbnN0IGxvZyA9IEJ1dHRwbHVnTG9nZ2VyLkxvZ2dlcjtcbiAgICBsb2cuYWRkTGlzdGVuZXIoXCJsb2dcIiwgKG1zZykgPT4ge1xuICAgICAgdGhpcy5hZGRMb2dNZXNzYWdlKG1zZyk7XG4gICAgfSk7XG4gICAgdGhpcy5wYW5lbExldmVsU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgbG9nLk1heGltdW1FdmVudExvZ0xldmVsID0gQnV0dHBsdWdMb2dMZXZlbFt0aGlzLnBhbmVsTGV2ZWxTZWxlY3QudmFsdWVdO1xuICAgIH0pO1xuICAgIHRoaXMuY29uc29sZUxldmVsU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgbG9nLk1heGltdW1Db25zb2xlTG9nTGV2ZWwgPSBCdXR0cGx1Z0xvZ0xldmVsW3RoaXMuY29uc29sZUxldmVsU2VsZWN0LnZhbHVlXTtcbiAgICB9KTtcbiAgICBsb2cuTWF4aW11bUV2ZW50TG9nTGV2ZWwgPSBCdXR0cGx1Z0xvZ0xldmVsLkRlYnVnO1xuICAgIGxvZy5EZWJ1ZyhcIkxvZ1BhbmVsOiBEZXZUb29scyBMb2cgcGFuZWwgZW5hYmxlZC5cIik7XG4gIH1cblxuICBwcml2YXRlIGFkZExvZ01lc3NhZ2UobXNnOiBMb2dNZXNzYWdlKSB7XG4gICAgdGhpcy5sb2dUZXh0QXJlYS52YWx1ZSA9IHRoaXMubG9nVGV4dEFyZWEudmFsdWUgKyBcIlxcblwiICsgbXNnLkZvcm1hdHRlZE1lc3NhZ2U7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2RldnRvb2xzL3dlYi9Mb2dQYW5lbC50cyIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2RldnRvb2xzL3dlYi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvZGV2dG9vbHMvd2ViL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCI8bWFpbj5cXG4gIDxpbnB1dCBpZD1cXFwidGFiMVxcXCIgdHlwZT1cXFwicmFkaW9cXFwiIG5hbWU9XFxcInRhYnNcXFwiIGNoZWNrZWQ+XFxuICA8bGFiZWwgZm9yPVxcXCJ0YWIxXFxcIj5UZXN0IERldmljZXM8L2xhYmVsPlxcbiAgPHNlY3Rpb24gaWQ9XFxcImNvbnRlbnQxXFxcIj5cXG4gICAgPGRpdiBpZD1cXFwic2ltdWxhdG9yXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJ2aWJyYXRvci1zaW11bGF0b3ItY29tcG9uZW50XFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInZpYnJhdG9yXFxcIj5cXG4gICAgICAgICAgPGltZyBzcmM9XFxcIlwiICsgcmVxdWlyZShcIi4vaHVzaC5wbmdcIikgKyBcIlxcXCJcXG4gICAgICAgICAgICAgICBpZD1cXFwidmlicmF0b3ItaW1hZ2VcXFwiPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJ2aWJyYXRvci1pbmZvXFxcIj5cXG4gICAgICAgICAgPGI+VmlicmF0aW9uIFNwZWVkOjwvYj4gPHNwYW4gaWQ9XFxcInZpYnJhdGlvbnNwZWVkXFxcIj4wPC9zcGFuPjxici8+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcInZpYnJhdGVkaXNjb25uZWN0XFxcIj5EaXNjb25uZWN0PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJzaW11bGF0b3ItZGl2aWRlclxcXCI+PC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiZmxlc2hsaWdodC1zaW1cXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiYy1mbGVzaGxpZ2h0XFxcIj5cXG4gICAgICAgICAgPGRpdj5cXG4gICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCIgKyByZXF1aXJlKFwiLi9ydWxlci5wbmdcIikgKyBcIlxcXCI+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8ZGl2PlxcbiAgICAgICAgICAgIDxpbWcgc3JjPVxcXCJcIiArIHJlcXVpcmUoXCIuL2ZsZXNobGlnaHQucG5nXCIpICsgXCJcXFwiXFxuICAgICAgICAgICAgICAgICBjbGFzcz1cXFwiby1mbGVzaGxpZ2h0XFxcIlxcbiAgICAgICAgICAgICAgICAgaWQ9XFxcImZsZXNobGlnaHQtaW1hZ2VcXFwiPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdj5cXG4gICAgICAgICAgPGI+U3BlZWQ6PC9iPiA8c3BhbiBpZD1cXFwibGluZWFyc3BlZWRcXFwiPjA8L3NwYW4+PGJyLz5cXG4gICAgICAgICAgPGI+UG9zaXRpb246PC9iPiA8c3BhbiBpZD1cXFwibGluZWFycG9zaXRpb25cXFwiPjA8L3NwYW4+PGJyLz5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwibGluZWFyZGlzY29ubmVjdFxcXCI+RGlzY29ubmVjdDwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9zZWN0aW9uPlxcbjwvbWFpbj5cXG5cIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC5odG1sXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC5odG1sXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IEJ1dHRwbHVnU2VydmVyLCBCdXR0cGx1Z0xvZ2dlciB9IGZyb20gXCIuLi8uLi9pbmRleFwiO1xuaW1wb3J0IHsgVGVzdERldmljZU1hbmFnZXIgfSBmcm9tIFwiLi4vVGVzdERldmljZU1hbmFnZXJcIjtcbmltcG9ydCAqIGFzIFRXRUVOIGZyb20gXCJAdHdlZW5qcy90d2Vlbi5qc1wiO1xuXG5jb25zdCBqc1BhbmVsID0gcmVxdWlyZShcIi4vanNwYW5lbC5qc1wiKTtcbnJlcXVpcmUoXCJqc3BhbmVsNC9kaXN0L2pzcGFuZWwuY3NzXCIpO1xucmVxdWlyZShcImpzcGFuZWw0L2Rpc3QvZm9udHMvanNnbHlwaC5lb3RcIik7XG5jb25zdCB0ZXN0UGFuZWxIVE1MID0gcmVxdWlyZShcIi4vVGVzdERldmljZU1hbmFnZXJQYW5lbC5odG1sXCIpLnRvU3RyaW5nKCk7XG5yZXF1aXJlKFwiLi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmNzc1wiKTtcblxuZXhwb3J0IGNsYXNzIFRlc3REZXZpY2VNYW5hZ2VyUGFuZWwge1xuICBwdWJsaWMgc3RhdGljIFNob3dUZXN0RGV2aWNlTWFuYWdlclBhbmVsKGJ1dHRwbHVnU2VydmVyOiBCdXR0cGx1Z1NlcnZlcikge1xuICAgIGxldCB0ZG06IFRlc3REZXZpY2VNYW5hZ2VyIHwgbnVsbCA9IG51bGw7XG4gICAgZm9yIChjb25zdCBtZ3Igb2YgYnV0dHBsdWdTZXJ2ZXIuRGV2aWNlTWFuYWdlcnMpIHtcbiAgICAgIGlmIChtZ3IuY29uc3RydWN0b3IubmFtZSA9PT0gXCJUZXN0RGV2aWNlTWFuYWdlclwiKSB7XG4gICAgICAgIHRkbSA9IChtZ3IgYXMgVGVzdERldmljZU1hbmFnZXIpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRkbSA9PT0gbnVsbCkge1xuICAgICAgQnV0dHBsdWdMb2dnZXIuTG9nZ2VyLkVycm9yKFwiVGVzdERldmljZU1hbmFnZXJQYW5lbDogQ2Fubm90IGdldCB0ZXN0IGRldmljZSBtYW5hZ2VyIGZyb20gc2VydmVyLlwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBnZXQgdGVzdCBkZXZpY2UgbWFuYWdlciBmcm9tIHNlcnZlci5cIik7XG4gICAgfVxuICAgIGpzUGFuZWwuanNQYW5lbC5jcmVhdGUoe1xuICAgICAgaWQ6ICgpID0+IFwiYnV0dHBsdWctdGVzdC1kZXZpY2UtbWFuYWdlci1wYW5lbFwiLFxuICAgICAgdGhlbWU6ICAgICAgIFwicHJpbWFyeVwiLFxuICAgICAgaGVhZGVyVGl0bGU6IFwiVGVzdCBEZXZpY2UgTWFuYWdlclwiLFxuICAgICAgcG9zaXRpb246ICAgIFwiY2VudGVyLXRvcCAwIDgwXCIsXG4gICAgICBjb250ZW50U2l6ZTogXCI0MDAgMjUwXCIsXG4gICAgICBjYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LmlubmVySFRNTCA9IHRlc3RQYW5lbEhUTUw7XG4gICAgICAgIFRlc3REZXZpY2VNYW5hZ2VyUGFuZWwuX3BhbmVsID0gbmV3IFRlc3REZXZpY2VNYW5hZ2VyUGFuZWwodGRtISk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIHN0YXRpYyBfcGFuZWw6IFRlc3REZXZpY2VNYW5hZ2VyUGFuZWw7XG4gIHByaXZhdGUgX3Rlc3RNYW5hZ2VyOiBUZXN0RGV2aWNlTWFuYWdlcjtcbiAgcHJpdmF0ZSBmbGVzaGxpZ2h0RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgdmlicmF0b3JFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBjdXJyZW50TGF1bmNoUG9zaXRpb246IGFueSA9IHsgeDogMCwgeTogMCB9O1xuICBwcml2YXRlIGxhc3RQb3NpdGlvbjogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBtb3ZlUmFkaXVzOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIGN1cnJlbnRWaWJyYXRlUG9zaXRpb246IGFueSA9IHsgeDogMCwgeTogMCB9O1xuXG4gIGNvbnN0cnVjdG9yKHRkbTogVGVzdERldmljZU1hbmFnZXIpIHtcbiAgICB0aGlzLl90ZXN0TWFuYWdlciA9IHRkbTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpYnJhdGVkaXNjb25uZWN0XCIpIS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5fdGVzdE1hbmFnZXIhLlZpYnJhdGlvbkRldmljZS5EaXNjb25uZWN0KCk7XG4gICAgfSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaW5lYXJkaXNjb25uZWN0XCIpIS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5fdGVzdE1hbmFnZXIhLkxpbmVhckRldmljZS5EaXNjb25uZWN0KCk7XG4gICAgfSk7XG4gICAgdGhpcy5fdGVzdE1hbmFnZXIuVmlicmF0aW9uRGV2aWNlLmFkZExpc3RlbmVyKFwidmlicmF0ZVwiLCAoc3BlZWQpID0+IHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlicmF0aW9uc3BlZWRcIikhLmlubmVySFRNTCA9IHNwZWVkO1xuICAgICAgdGhpcy52aWJyYXRlTW92ZShzcGVlZCk7XG4gICAgfSk7XG4gICAgdGhpcy5fdGVzdE1hbmFnZXIuTGluZWFyRGV2aWNlLmFkZExpc3RlbmVyKFwibGluZWFyXCIsIChsaW5lYXJvYmo6IGFueSkgPT4ge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaW5lYXJwb3NpdGlvblwiKSEuaW5uZXJIVE1MID0gbGluZWFyb2JqLnBvc2l0aW9uO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaW5lYXJzcGVlZFwiKSEuaW5uZXJIVE1MID0gbGluZWFyb2JqLnNwZWVkO1xuICAgICAgdGhpcy5sYXVuY2hNb3ZlKGxpbmVhcm9iai5wb3NpdGlvbiwgbGluZWFyb2JqLnNwZWVkKTtcbiAgICB9KTtcbiAgICB0aGlzLmZsZXNobGlnaHRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmbGVzaGxpZ2h0LWltYWdlXCIpITtcbiAgICB0aGlzLnZpYnJhdG9yRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlicmF0b3ItaW1hZ2VcIikhO1xuICB9XG5cbiAgcHJpdmF0ZSBsYXVuY2hNb3ZlID0gKHBvc2l0aW9uLCBzcGVlZCkgPT4ge1xuICAgIGNvbnN0IHAgPSAtKCgxMDAgLSBwb3NpdGlvbikgKiAwLjIyKTtcbiAgICBjb25zdCBkdXJhdGlvbiA9IHRoaXMubW92ZUR1cmF0aW9uKHBvc2l0aW9uLCBzcGVlZCk7XG4gICAgbmV3IFRXRUVOLlR3ZWVuKHRoaXMuY3VycmVudExhdW5jaFBvc2l0aW9uKVxuICAgICAgLnRvKHt4OiAwLCB5OiBwfSwgZHVyYXRpb24pXG4gICAgICAuc3RhcnQoKTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sYXVuY2hBbmltYXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgbGF1bmNoQW5pbWF0ZSA9ICh0aW1lc3RhbXA6IG51bWJlcikgPT4ge1xuICAgIGlmICghVFdFRU4udXBkYXRlKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5mbGVzaGxpZ2h0RWxlbWVudC5zdHlsZS5ib3R0b20gPSBgJHt0aGlzLmN1cnJlbnRMYXVuY2hQb3NpdGlvbi55fSVgO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxhdW5jaEFuaW1hdGUpO1xuICB9XG5cbiAgLy8gbW92ZUR1cmF0aW9uIHJldHVybnMgdGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGl0IHdpbGwgdGFrZSB0byBtb3ZlXG4gIC8vIHRvIHBvc2l0aW9uIGF0IHNwZWVkLlxuICAvL1xuICAvLyBwb3NpdGlvbjogcG9zaXRpb24gaW4gcGVyY2VudCAoMC0xMDApLlxuICAvLyBzcGVlZDogICAgc3BlZWQgaW4gcGVyY2VudCAoMjAtMTAwKS5cbiAgcHJpdmF0ZSBtb3ZlRHVyYXRpb24gPSAocG9zaXRpb246IG51bWJlciwgc3BlZWQ6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5hYnMocG9zaXRpb24gLSB0aGlzLmxhc3RQb3NpdGlvbik7XG4gICAgdGhpcy5sYXN0UG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICByZXR1cm4gdGhpcy5jYWxjRHVyYXRpb24oZGlzdGFuY2UsIHNwZWVkKTtcbiAgfVxuXG4gIC8vIF9jYWxjRHVyYXRpb24gcmV0dXJucyBkdXJhdGlvbiBvZiBhIG1vdmUgaW4gbWlsbGlzZWNvbmRzIGZvciBhIGdpdmVuXG4gIC8vIGRpc3RhbmNlL3NwZWVkLlxuICAvL1xuICAvLyBkaXN0YW5jZTogYW1vdW50IHRvIG1vdmUgcGVyY2VudCAoMC0xMDApLlxuICAvLyBzcGVlZDogc3BlZWQgdG8gbW92ZSBhdCBpbiBwZXJjZW50ICgyMC0xMDApLlxuICBwcml2YXRlIGNhbGNEdXJhdGlvbiA9IChkaXN0YW5jZTogbnVtYmVyLCBzcGVlZDogbnVtYmVyKSA9PiB7XG4gICAgcmV0dXJuIE1hdGgucG93KHNwZWVkIC8gMjUwMDAsIC0wLjk1KSAvICg5MCAvIGRpc3RhbmNlKTtcbiAgfVxuXG4gIHByaXZhdGUgdmlicmF0ZU1vdmUgPSAoc3BlZWQpID0+IHtcbiAgICB0aGlzLm1vdmVSYWRpdXMgPSBzcGVlZDtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy52aWJyYXRlQW5pbWF0ZSk7XG4gIH1cblxuICBwcml2YXRlIHZpYnJhdGVBbmltYXRlID0gKHRpbWVzdGFtcDogbnVtYmVyKSA9PiB7XG4gICAgaWYgKCFUV0VFTi51cGRhdGUoKSkge1xuICAgICAgaWYgKHRoaXMubW92ZVJhZGl1cyAhPT0gMCkge1xuICAgICAgICBuZXcgVFdFRU4uVHdlZW4odGhpcy5jdXJyZW50VmlicmF0ZVBvc2l0aW9uKVxuICAgICAgICAgIC50byh7eDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5tb3ZlUmFkaXVzICogMjApLFxuICAgICAgICAgICAgICAgeTogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5tb3ZlUmFkaXVzICogMjApfVxuICAgICAgICAgICAgICAsIDM0KVxuICAgICAgICAgIC5zdGFydCgpO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy52aWJyYXRlQW5pbWF0ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudmlicmF0b3JFbGVtZW50LnN0eWxlLnRvcCA9IGAke3RoaXMuY3VycmVudFZpYnJhdGVQb3NpdGlvbi54fXB4YDtcbiAgICB0aGlzLnZpYnJhdG9yRWxlbWVudC5zdHlsZS5yaWdodCA9IGAke3RoaXMuY3VycmVudFZpYnJhdGVQb3NpdGlvbi55fXB4YDtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy52aWJyYXRlQW5pbWF0ZSk7XG4gIH1cbn1cblxuLy8gU29tZSBjb2RlIGluIHRoaXMgZmlsZSB0YWtlbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9mdW5qYWNrL2xhdW5jaGNvbnRyb2xcbi8vIE1JVCBMaWNlbnNlOlxuLypcbkxhdWNoY29udHJvbCBVSSBGbGVzaGxpZ2h0XG5cbmh0dHBzOi8vZ2l0aHViLmNvbS9mdW5qYWNrL2xhdW5jaGNvbnRyb2xcblxuQ29weXJpZ2h0IDIwMTcgRnVuamFja1xuXG5SZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbm1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuXG4xLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbmxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuXG4yLiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG50aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uXG5hbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cblxuMy4gTmVpdGhlciB0aGUgbmFtZSBvZiB0aGUgY29weXJpZ2h0IGhvbGRlciBub3IgdGhlIG5hbWVzIG9mIGl0cyBjb250cmlidXRvcnNcbm1heSBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0cyBkZXJpdmVkIGZyb20gdGhpcyBzb2Z0d2FyZSB3aXRob3V0XG5zcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXG5cblRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORFxuQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbldBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkVcbkRJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEVcbkZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMXG5EQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUlxuU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVJcbkNBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksXG5PUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRVxuT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiovXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZGV2dG9vbHMvd2ViL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwudHMiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFEUUFBQUJuQ0FZQUFBQlBZbUd5QUFBQUJtSkxSMFFBL3dEL0FQK2d2YWVUQUFBQUNYQklXWE1BQUFzVEFBQUxFd0VBbXB3WUFBQUFCM1JKVFVVSDRRUWVDeWNUQnFUNHNRQUFBQmwwUlZoMFEyOXRiV1Z1ZEFCRGNtVmhkR1ZrSUhkcGRHZ2dSMGxOVUZlQkRoY0FBQU5KU1VSQlZIamE3WnkvYjV0QUZNZmZJZFNoYVRkTGpwMnRrdG02OEE5MDc1b0Jwa3FaK3dmMGIrZ2YwTmxTSmp4NHpaN1Z3MGxXTnlOMVMxeExXVkRWSmJKNUhleExBUFBqT0xnRHUrODdoUmpmdlEvdkYzZVFNR2dtQkQxaXhyOG9ZSHpmQndDQTFXcVYrbkN6L2wzNjVjdnhLSFU4bVV3QUFDQUlna2EyMmFvd0FxUnRpWEdESUVBVktBdk9UQVRVcklMZ2VRR3huSlJBeE5NRVFrUWpIcktOZVlmcDk0NVJJRm5JcmpveUdrczdVeDdLTnRheU93VkVQUExHY0hTWk9uWWNKM1djdUdPZ1BuU1N1ZEk2a0dwSTZCNWJCUWg5M3dmZjkydFBYT1FweTdKU01HSjhsZUtqdFd3L3JCOXpmMzgxR3FlTzR6anVSOWxPVnJwc2xlT2NIeG1lQkhWZHQ3REtOVmtUS2VkUTJYcW9ERVo0aUhNT3U5MnU5dGpHcXh6bi9PanE1OGwxWFZndWwyRGJOdGgyZTVGdmRRR1RoRm9zRnJUQUl5QnFyQzNETkdtc1p4ZHlLdldTSGZiTVFNZmVYTWJ6L1dpc2JVQlJsU01nNmtQVWg2Z1BVUitpUGtSbG00Q29EMUVmb2o1RWZZaXFIQUVSRURWV2FxelVXS214bm5aanpUNWZyYXZ0ZHR0NGpNWkZJVSt1NndMblhIcWdzaWQrVkJRVWt3NDl6MHU5UUpFWEtzSkxaWS8xaFVlemNod245UjdkYkRhclphZWxJM2RrbjRMcnlFZHRiNUpjamNiU2I1SjAzWWVrcjZTcTRXRVl2cnhwcjdNb29PZDU1cEw3a0tlSE9WRnJEbFY1cCtydkhtVE9VYzJsLzNiNVlEVGNzaEpoRi96ODl1R3NQT1IvL1A3TE9KQk0vcWljU3psRVFBUkVRTjBEcVZTdHRpc2RlWWlBQ01nd1VCaUdyU2QzMFhlTDVpSVBFZEFKQVdIWGk3dnNJcTlxZjZGczF3ZkZyczFoc3crNkFoUHpDM3NlMW8rRi81cUF5UUFKRmUyekpTZFRWWjJ4RCtmV0JoSXVsaksyekNBWjFaeWowRzRwRDRtQmRPNTR5b0JrN0dGMWMram82dlVsNU1wRUlkZjNrS3Zsb2E1RFRzWkRWVG5FY0RwSGRuTmRhYlRPa0l1aUNPSTRCcHpPZ2QxY005WEd1citUR0E0QTcrNEJOazhnd0lUZXZiMW96VU5SRkJWKzl1Zkg3ZjZINFVEYzNjU3FRSzlmSEE0QXAvUENFOTkvL2RJSTZNWG9QTzFCam0xU0FMb29HUmhnOHlSbmtJcXljNzNxRFFBOHF3TDlyVDFwQXJLaDRVVjZidUtoTnErc0VVazlMc2U3ZTRRZWlIMytWR2t2clZqN0x1azNOTG9PTzVsd3F3WFVGWmdzaURLUVNhaTZNTXBBdXNGVVFGb0JhaHVzQ1lqUVB4amlyeUNvcExXYkFBQUFBRWxGVGtTdVFtQ0NcIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2RldnRvb2xzL3dlYi9mbGVzaGxpZ2h0LnBuZ1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvZGV2dG9vbHMvd2ViL2ZsZXNobGlnaHQucG5nXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQURJQUFBQkJDQUlBQUFBYzYyQ0pBQUFBQkdkQlRVRUFBTEdQQy94aEJRQUFBQ0JqU0ZKTkFBQjZKZ0FBZ0lRQUFQb0FBQUNBNkFBQWRUQUFBT3BnQUFBNm1BQUFGM0NjdWxFOEFBQUFCbUpMUjBRQS93RC9BUCtndmFlVEFBQUFDWEJJV1hNQUFBc1NBQUFMRWdIUzNYNzhBQUFBQjNSSlRVVUg0UW9PRlNvRFZ5enhIQUFBQ1ZsSlJFRlVhTjdkV2wxc0UxY1dQbmYreHg2UC84WTJLVW5NTGswVUZycFNVV2tMS3RKV1ZaOFd5VEpzSkVRUWtXaEJMUkk4VlNvUEM2anFRNkpLZldDbFZtb1RpVUoydTFXa2h2U2xMV3JMQXhEQzhxT3RoTlFHVkVvU1oybXhqWDlpTzlNWno3MTNIeTRZTnduRlA1aVY5anhZTTNmbW52bnVPZWVldjJ0RUtZWG1pQkFDQU1QRHd3Q3dlL2R1bnVjUlFrM3lCTm9jRVVJd3hzZVBIdytIdzlGb2RHUmtCR05NQ0dtU2JiT3dITWM1ZE9pUVlSaFBQdm5rK3ZYcnU3dTdqeHc1Z2pGdWtpMXFVb21FRUplcUdvWmhoRUk4endQQXRXdlg1dWZuT1k1cmhtMVRreW1sKy9idE00d1FVR0NZQUtDN3UzdmZ2bjFOcnJZcFdOZXZYZnZtcTY4cElacW1WUVlSUXVmUG4vLysrKytiUWRZNExJenhxVk9uOHZrOFFtaVJ5bXpiUG4zNk5Oc1FqeHRXSXBFNGZ1S0VKRW1DSUNpS1V2M0k3WFovL1BISE16TXpEUXVzRVZpVVVveng0TURBZnhKekFBQUlFTCtZVHphYkhSd2NiSGpORFVwcmFtcnFxNisrWnJyeitueExYMUFVWlhKeWNtcHE2ckhDS3BWSzJXeUd3Uko0WVJtK0hGY29GQllXRmhyajM2RGYycmh4WTJKbUZnQjBuMWRWMVdvMEFJQXhadkhIN1hhZk9YUG1jVW1MQWdJRUFFc1hwT3Y2aWhVcm1vK0pqY0FhR2g2NjhjTVB5ejRLaDhPYXBybGNMbmFiVHFjLytPQ0RCaFJTTnl3V2h0bTF3UE9pS0ZZZVZZVGs4WGlxcHpRQXEyN2J1bno1OG90L2V0R3I2d0FnaW1MQUNGYUx5dWZ6QVlCcG1yZHUzY0lZQTBBaWtmajg4OCtmZWVhWjFrb0xvWWV2UkZYVlNDU3lWSW90aERVeE1TRkwwdEp4U1pKa1dhN2NDc0pkcitGMnV5Y25KMXNPNjVOL2Z1S3E4Z2pWRXFyMkZMSXNCd0lCQUFnRUFxT2pveTJIVlNNaGhLcDNRMnRocFZJcHk3SnFmTGxpZ283anBGS3BGc0lhR3h1YlN5UnEzTG91bDRzSkxKdk5uang1c2xXd0tLV0w5dFJ2WjhhU0pGVlMxbnFwUGxpZmZ2cHBOUlROb3oxMENnRElzdnpaWjUrMUNoYkhjZWZPbmZ1VkFHcFRKOC96bHk1ZGFoV3N4MG4vbDdDYUwrcGJBU3VmejFkZnN5cm9mdzlyRVlSTUpsTmRnUldMUmR1MkcrTXNORFp0V1NxWHkzTnpjN3F1cyt0TUp0TXdxMGNHaTFMSzg3eHBtcVpwTnMrdERpVVNRbDU0NFFXVzNGVkdITWRoMXdpaEI5WFFHT01OR3phMENoWkNhTnUyYmRYZnhoai9Vb05zTE11S3hXSXRoTFUwTHkwV2luVjk3OUhEQW9DdFc3ZTJkM1pVdXl1RVVENlhod2VIYlVxcDMrK1B4V0oxRlEzMXdRcUZRdjM5L2FiNXExb1pZd2NvUE1pd2NybmM5dTNiRGNOb29iUUE0S1dYWGdwSEloVkxCd0Ric25QWjdNTENRdlVnSTBLSXJ1c3Z2L3h5dlgzZXVnc3lTdW5VMU5TV1AyOUpKbSt6REFJaDVORTlnaWhxbXJhb295UUl3a2NmZmRUVDAxT3Y5Ni9iYnlHRWVucDY0bHZqL3hqNWV5WEowWFZkZGQrdHBITzVIQk1iUW1qNzl1MXIxcXlwOXhPTlNJc0pMSlZLN2R5NTgrclZxenppTU1HV2JWZlVKTXN5eDNIbGNybXJxMnQwZExTNllLeWRHb3lKaG1IczJyVUxBUEw1dkdtYUFYK2dzN096bzZOanc0WU5yRnJrZVg3UG5qM2hjTGd4L2swMXdEZHQzSmlZVFZCS2k4V2lRekJDcUwyOVhaSWsyN1lOd3poNzltekRuQnVQaVlTUTU1NS8vdHQvZjh2enZNdmxXdDNaQVFDQ0lOeTVjd2RqdkduVHBxVWxTZTNVVkdMVDE5Y25TcUxMNWFJQXM3T3ppVVRDNy9kcm1tWlpWbTl2YnpPY0c1Y1d4M0VJSWN1MkNTRkFZZFh2ZnlmTGNpYVRLWlZLNVhJWkd1cUlQQUpZakNSSlVtVUZBY3pOelltaXVINzlldHUyaThWbUEyV3pzQWdoWmFjTUZJSkcwT3YxM3JoeG8xZ3Nsa3FsWm1HeC9PbktsU3NjeHhtRzBkSFJ3YlJUNDN5TzR3UkJCRXF6MmV6OC9QemF0V3ZUNlhUekdiMEFBSU9EZzBORFEyeDdqNHlNUktQUldtWXl6MEl3THBmTExsWHRlS0lOQU9ibjUwVlJaSzBIOWtKakVMbmg0ZUdqUjQ4R2c4RkFJTEN3c0xCang0NTBPbDNMVEVMSTlQUzBJaXR1bDh2cjlRS0FLSXFLb2lpS0lvcmk5ZXZYYjk2ODJmamhTbVUxd1dCUTEvVmNMamMyTnZiYlIwanNqSWxTK3U2NzcxWmljeVFTV2JseVpXZG5aelFhYlc5dmYvdnR0L2Z2M3o4ek13UDNEbVBxZ3dVQVFNRTBUZGJPNDNuKzh1WExEMjFIalkyTnhXS3g2WnZUbFJGZDE2Vjd6Y3UydHJaUUtDU0tZandlNytycTJyeDU4L0R3OE4zVDN0cm83azZjeitWejJad1JNdHh1OS9qNCtHdXZ2YlkweERJSnZmUE9Pek16TXhNVEUwQ29MRW5NUlFGQW9WQmdwUmdqbDh1VlRDWURnVUEwR3VWNS90aXhZK2wwK3VEQmd6VzJsdmczM25qanl5Kyt3QTZXWkVuVE5OTTB5K1V5QzdwTXYyeVZVMU5UNCtQalc3WnMrZkhISDIvZnZzM3pmS20wd0RxRGlFTnV0OXMwVFhhQ1Z5d1dUZFBNWnJPMmJkdTJYU2dVRUVMaGNEaVJTRXhPVG5vOG5scTJGTUlZUC9mc3N6L2Qra2xXNUtCaCtIeStUQ1pqV2RaYmI3MFZqOGRaV1RFd01EQTZPbXBaRmp1ZXNINnhGb3BGQjJOQ2lLWnBzcXF3dnJJb2loekgyYmE5VkZtQ0lLeGV2YnBRS0JTTHhRTUhEc1RqOFlmQWNoeG5jR0R3YjBlUGlxS29xbXJQSDlha1VpbFdFek5ualJEeSsvMDg0a3FsVXNWeU9ZNlRGTm5qOFR6MHFMdzZZT3U2SG9sRUVvbEVmMzkvTEJZTGhVSVBtbzRJSVlTUVB6NzFWQzZYVXhUMWlaVlBoTVBoVkNwVktwVnl1UngyTUNBQUNzNDlHMkphODNsOWtuSzNDNjhvaXNmalVaZnJpak82YytlTzR6Z0lvWEs1N1BWNm1ha1FRb2FHaGpvN081ZDFiSWlaem9jZmZuajRyNGRFVWRSMFQxdGJtOC9ueStmenRtM1B6U2FXRmc2cVM5Vzkzb3BwdDdlMzEyTEZMQzM3K2VlZkthV1JTRVRUTkVMSWUrKzl0Mno2ZWpjTlRLVlNlL2ZzdlhEaGdzRHptcVpwbW9ZUWNyQ1RTcVlXR1lvb2lUNi8zK1B4R0liQkZGVDVYVjRkOS9ZTjgzQXNSbG1XSlVsU0tCUUtCb09IRHgrT1JxT0x0SG1mWFRLWmZQUE5OMDk5OGVWdm1Jc2tTYjZBbjFrSmh4QkN5RFROWkNxRllJa2lFQUNsOTNwTlZGSFZVQ2dFQUVCQjkrcjVmSjZGcVhBNDdEak8rKysvSDQxR3E3VjVIeFloSkpsTXZ2NzY2Lys2Y0lGRHl5Q2psS3FxcXZ1OHpHdHpnTmk2SGV3czdlMEtnbEQ5R1o3bjJXcEZVZlI0OVVxNGRMdmRQcDh2R0F3T0RnNkd3K0hLbFB1dzJFVTZuZTdyNjd0NDhhTG1jaS9LZXRtdHBNaVdaUlVLQllJSklXVGJYN1p0M3J5NVdsYUUwck5uem95ZFBMbG9iUWdobDBzVlJaSDlzVWRWRlVWUkZWVVJSVkhUdE43ZTNyMTc5eTRENno1ZlFyNzc3cnRYZHI4eU16Mjk2RkYwMVNwQ0NRQWNPM1pzM2JwMUxEZ3VTb1JZTUZqcXpRa2hBd01ENCtQakNHQjJaaFlBS0ZDdnp5Y0l3dE5QUDMzaXhJbHFQZzgwVll3eCswdFdOYjM2NnFzTkgweFU0Mk1oc2pJU2o4Y1hsVzcvQmVkUWI2RE9sYjZIQUFBQUdYUkZXSFJqYjIxdFpXNTBBRU55WldGMFpXUWdkMmwwYUNCSFNVMVE1NjlBeXdBQUFDVjBSVmgwWkdGMFpUcGpjbVZoZEdVQU1qQXhOeTB4TUMweE5GUXlNVG8wTWpvd015MHdOem93TU52aW9xTUFBQUFsZEVWWWRHUmhkR1U2Ylc5a2FXWjVBREl3TVRjdE1UQXRNVFJVTWpFNk5ESTZNRE10TURjNk1EQ3F2eG9mQUFBQUFFbEZUa1N1UW1DQ1wiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZGV2dG9vbHMvd2ViL2h1c2gucG5nXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9kZXZ0b29scy93ZWIvaHVzaC5wbmdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0ICogZnJvbSBcIi4uL1Rlc3REZXZpY2VcIjtcbmV4cG9ydCAqIGZyb20gXCIuLi9UZXN0RGV2aWNlTWFuYWdlclwiO1xuZXhwb3J0ICogZnJvbSBcIi4uL3V0aWxzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Mb2dQYW5lbFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vVGVzdERldmljZU1hbmFnZXJQYW5lbFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vdXRpbHMud2ViXCI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZGV2dG9vbHMvd2ViL2luZGV4LndlYi50cyIsIi8vIFdlIGhhdmUgdG8gYnJpbmcgaW4gb3VyIG93biBqc3BhbmVsIGluc3RhbmNlIGJlY2F1c2UgdGhlIG9uZSBpbiB0aGUgbW9kdWxlXG4vLyBkb2Vzbid0IGluY2x1ZGUgYW4gZXhwb3J0IHN0YXRlbWVudC5cblxuLyoganNwYW5lbC5qcyAtIExpY2Vuc2UgTUlULCBjb3B5cmlnaHQgMjAxMyAtIDIwMTggU3RlZmFuIFN0cmFlc3NlciA8aW5mb0Bqc3BhbmVsLmRlPiAoaHR0cDovL2pzcGFuZWwuZGUpICovXG4vKiBnbG9iYWwganNQYW5lbCwgJCAqL1xuJ3VzZSBzdHJpY3QnO1xuLy8gLmFwcGVuZCgpIHBvbHlmaWxsIG5lZWRlZCBmb3IgRURHRSAtIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9QYXJlbnROb2RlL2FwcGVuZFxuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXG4oZnVuY3Rpb24gKGFycikge1xuICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGl0ZW0uYXBwZW5kID0gaXRlbS5hcHBlbmQgfHwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyZ0FyciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyksXG4gICAgICAgICAgICAgICAgZG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgIGFyZ0Fyci5mb3JFYWNoKGZ1bmN0aW9uIChhcmdJdGVtKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlzTm9kZSA9IGFyZ0l0ZW0gaW5zdGFuY2VvZiBOb2RlO1xuICAgICAgICAgICAgICAgIGRvY0ZyYWcuYXBwZW5kQ2hpbGQoaXNOb2RlID8gYXJnSXRlbSA6IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFN0cmluZyhhcmdJdGVtKSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmFwcGVuZENoaWxkKGRvY0ZyYWcpO1xuICAgICAgICB9O1xuICAgIH0pO1xufSkoW0VsZW1lbnQucHJvdG90eXBlLCBEb2N1bWVudC5wcm90b3R5cGUsIERvY3VtZW50RnJhZ21lbnQucHJvdG90eXBlXSk7XG4vLyBFbGVtZW50LmNsb3Nlc3QoKSBwb2x5ZmlsbCBuZWVkZWQgZm9yIEVER0UgLSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9jbG9zZXN0XG5pZiAod2luZG93LkVsZW1lbnQgJiYgIUVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QpIHtcbiAgICBFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0ID0gZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSAodGhpcy5kb2N1bWVudCB8fCB0aGlzLm93bmVyRG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwocyksXG4gICAgICAgICAgICBpID0gdm9pZCAwLFxuICAgICAgICAgICAgZWwgPSB0aGlzO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpID0gbWF0Y2hlcy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoLS1pID49IDAgJiYgbWF0Y2hlcy5pdGVtKGkpICE9PSBlbCkge307XG4gICAgICAgIH0gd2hpbGUgKGkgPCAwICYmIChlbCA9IGVsLnBhcmVudEVsZW1lbnQpKTtcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH07XG59XG4vLyBOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCgpIHBvbHlmaWxsIG5lZWRlZCBmb3IgSUUxMSBhbmQgQW5kcm9pZCBtb2JpbGUgLSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTm9kZUxpc3QvZm9yRWFjaFxuaWYgKHdpbmRvdy5Ob2RlTGlzdCAmJiAhTm9kZUxpc3QucHJvdG90eXBlLmZvckVhY2gpIHtcbiAgICBOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgdGhpc0FyZykge1xuICAgICAgICB0aGlzQXJnID0gdGhpc0FyZyB8fCB3aW5kb3c7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB0aGlzW2ldLCBpLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH07XG59XG4vLyBPYmplY3QuYXNzaWduIFBvbHlmaWxsIG5lZWRlZCBmb3IgbW9iaWxlcyAtIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RlL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9hc3NpZ25cbmlmICghT2JqZWN0LmFzc2lnbikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QsICdhc3NpZ24nLCB7XG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUodGFyZ2V0KSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQgfHwgdGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgZmlyc3QgYXJndW1lbnQgdG8gb2JqZWN0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdG8gPSBPYmplY3QodGFyZ2V0KTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICAgICAgaWYgKG5leHRTb3VyY2UgPT09IHVuZGVmaW5lZCB8fCBuZXh0U291cmNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXh0U291cmNlID0gT2JqZWN0KG5leHRTb3VyY2UpO1xuICAgICAgICAgICAgICAgIHZhciBrZXlzQXJyYXkgPSBPYmplY3Qua2V5cyhPYmplY3QobmV4dFNvdXJjZSkpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIG5leHRJbmRleCA9IDAsIGxlbiA9IGtleXNBcnJheS5sZW5ndGg7IG5leHRJbmRleCA8IGxlbjsgbmV4dEluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRLZXkgPSBrZXlzQXJyYXlbbmV4dEluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG5leHRTb3VyY2UsIG5leHRLZXkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVzYyAhPT0gdW5kZWZpbmVkICYmIGRlc2MuZW51bWVyYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRvO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8vIFBvbHlmaWxscyBmb3IgSUUxMSBvbmx5XG4vLyBDdXN0b21FdmVudCAtIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DdXN0b21FdmVudFxuKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdy5DdXN0b21FdmVudCA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gZmFsc2U7XG4gICAgZnVuY3Rpb24gQ3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcykge1xuICAgICAgICBwYXJhbXMgPSBwYXJhbXMgfHwgeyBidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogZmFsc2UsIGRldGFpbDogdW5kZWZpbmVkIH07XG4gICAgICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICAgICAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKTtcbiAgICAgICAgcmV0dXJuIGV2dDtcbiAgICB9XG4gICAgQ3VzdG9tRXZlbnQucHJvdG90eXBlID0gd2luZG93LkV2ZW50LnByb3RvdHlwZTtcbiAgICB3aW5kb3cuQ3VzdG9tRXZlbnQgPSBDdXN0b21FdmVudDtcbn0pKCk7XG4vLyBTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoKCkgLSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TdHJpbmcvZW5kc1dpdGhcbmlmICghU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aCkge1xuICAgIFN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGggPSBmdW5jdGlvbiAoc2VhcmNoU3RyLCBQb3NpdGlvbikge1xuICAgICAgICAvLyBUaGlzIHdvcmtzIG11Y2ggYmV0dGVyIHRoYW4gPj0gYmVjYXVzZVxuICAgICAgICAvLyBpdCBjb21wZW5zYXRlcyBmb3IgTmFOOlxuICAgICAgICBpZiAoIShQb3NpdGlvbiA8IHRoaXMubGVuZ3RoKSkgUG9zaXRpb24gPSB0aGlzLmxlbmd0aDtlbHNlIFBvc2l0aW9uIHw9IDA7IC8vIHJvdW5kIHBvc2l0aW9uXG4gICAgICAgIHJldHVybiB0aGlzLnN1YnN0cihQb3NpdGlvbiAtIHNlYXJjaFN0ci5sZW5ndGgsIHNlYXJjaFN0ci5sZW5ndGgpID09PSBzZWFyY2hTdHI7XG4gICAgfTtcbn1cbi8vIFN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aCgpIC0gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU3RyaW5nL3N0YXJ0c1dpdGhcbmlmICghU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoKSB7XG4gICAgU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoID0gZnVuY3Rpb24gKHNlYXJjaFN0cmluZywgcG9zaXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3Vic3RyKHBvc2l0aW9uIHx8IDAsIHNlYXJjaFN0cmluZy5sZW5ndGgpID09PSBzZWFyY2hTdHJpbmc7XG4gICAgfTtcbn1cblxuLy8gQ3JlYXRlIGEgbmV3IG9iamVjdCwgdGhhdCBwcm90b3R5cGljYWxseSBpbmhlcml0cyBmcm9tIHRoZSBFcnJvciBjb25zdHJ1Y3RvclxuZnVuY3Rpb24ganNQYW5lbEVycm9yKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm5hbWUgPSAnanNQYW5lbEVycm9yJztcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlIHx8ICcnO1xuICAgIHRoaXMuc3RhY2sgPSBuZXcgRXJyb3IoKS5zdGFjaztcbn1cbmpzUGFuZWxFcnJvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG5qc1BhbmVsRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0ganNQYW5lbEVycm9yO1xuXG5leHBvcnQgdmFyIGpzUGFuZWwgPSB7XG5cbiAgICB2ZXJzaW9uOiAnNC4wLjAtYmV0YS4yJyxcbiAgICBkYXRlOiAnMjAxOC0wMS0wOCAwOTo1NicsXG4gICAgaWRDb3VudGVyOiAwLFxuICAgIHppQmFzZTogMTAwLFxuICAgIHRoZW1lczogWydkZWZhdWx0JywgJ3ByaW1hcnknLCAnaW5mbycsICdzdWNjZXNzJywgJ3dhcm5pbmcnLCAnZGFuZ2VyJ10sXG4gICAgbWRidGhlbWVzOiBbJ3NlY29uZGFyeScsICdlbGVnYW50JywgJ3N0eWxpc2gnLCAndW5pcXVlJywgJ3NwZWNpYWwnXSxcbiAgICBhdXRvcG9zaXRpb25TcGFjaW5nOiA0LFxuICAgIGlzSUU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5hcHBWZXJzaW9uLm1hdGNoKC9UcmlkZW50Lyk7XG4gICAgfSgpLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGJveFNoYWRvdzogMyxcbiAgICAgICAgY29udGFpbmVyOiBkb2N1bWVudC5ib2R5LFxuICAgICAgICBjb250ZW50U2l6ZTogeyB3aWR0aDogJzQwMHB4JywgaGVpZ2h0OiAnMjAwcHgnIH0sIC8vIG11c3QgYmUgb2JqZWN0XG4gICAgICAgIGRyYWdpdDoge1xuICAgICAgICAgICAgY3Vyc29yOiAnbW92ZScsXG4gICAgICAgICAgICBoYW5kbGVzOiAnLmpzUGFuZWwtaGVhZGVybG9nbywgLmpzUGFuZWwtdGl0bGViYXIsIC5qc1BhbmVsLWZ0cicsIC8vIGRvIG5vdCB1c2UgLmpzUGFuZWwtaGVhZGVyYmFyXG4gICAgICAgICAgICBvcGFjaXR5OiAwLjgsXG4gICAgICAgICAgICBkaXNhYmxlT25NYXhpbWl6ZWQ6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgaGVhZGVyVGl0bGU6ICdqc1BhbmVsJyxcbiAgICAgICAgaGVhZGVyQ29udHJvbHM6ICdhbGwnLFxuICAgICAgICBpY29uZm9udDogJ2pzZ2x5cGgnLFxuICAgICAgICBtYXhpbWl6ZWRNYXJnaW46IDAsXG4gICAgICAgIG1pbmltaXplVG86ICdkZWZhdWx0JyxcbiAgICAgICAgcGFuZWx0eXBlOiAnc3RhbmRhcmQnLFxuICAgICAgICBwb3NpdGlvbjogJ2NlbnRlcicsXG4gICAgICAgIHJlc2l6ZWl0OiB7XG4gICAgICAgICAgICBoYW5kbGVzOiAnbiwgZSwgcywgdywgbmUsIHNlLCBzdywgbncnLFxuICAgICAgICAgICAgbWluV2lkdGg6IDQwLFxuICAgICAgICAgICAgbWluSGVpZ2h0OiA0MFxuICAgICAgICB9LFxuICAgICAgICB0aGVtZTogJ2RlZmF1bHQnXG4gICAgfSxcbiAgICBkZWZhdWx0U25hcENvbmZpZzoge1xuICAgICAgICBzZW5zaXRpdml0eTogNzAsXG4gICAgICAgIHRyaWdnZXI6ICdwYW5lbCdcbiAgICB9LFxuICAgIGFqYXhBbHdheXNDYWxsYmFja3M6IFtdLFxuICAgIGV4dGVuc2lvbnM6IHt9LFxuXG4gICAgYWpheDogZnVuY3Rpb24gYWpheChvYmopIHtcbiAgICAgICAgdmFyIGNvbmYgPSBvYmoub3B0aW9ucy5jb250ZW50QWpheCxcbiAgICAgICAgICAgIGNvbmZpZ0RlZmF1bHRzID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgdXNlcjogJycsXG4gICAgICAgICAgICBwd2Q6ICcnLFxuICAgICAgICAgICAgZG9uZTogZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgICAgICAgICAgICBvYmouY29udGVudC5pbm5lckhUTUwgPSB0aGlzLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhdXRvcmVzaXplOiB0cnVlLFxuICAgICAgICAgICAgYXV0b3JlcG9zaXRpb246IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGNvbmZpZyA9IHZvaWQgMDtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbmYgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWdEZWZhdWx0cywgeyB1cmw6IGVuY29kZVVSSShjb25mKSwgZXZhbHNjcmlwdHRhZ3M6IHRydWUgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoKHR5cGVvZiBjb25mID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihjb25mKSkgPT09ICdvYmplY3QnICYmIGNvbmYudXJsKSB7XG4gICAgICAgICAgICBjb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWdEZWZhdWx0cywgY29uZik7XG4gICAgICAgICAgICBjb25maWcudXJsID0gZW5jb2RlVVJJKGNvbmYudXJsKTtcbiAgICAgICAgICAgIC8vIHJlc2V0IHRpbWVvdXQgdG8gMCwgd2l0aENyZWRlbnRpYWxzICYgcmVzcG9uc2VUeXBlIHRvIGZhbHNlIGlmIHJlcXVlc3QgaXMgc3luY2hyb25vdXNcbiAgICAgICAgICAgIGlmIChjb25maWcuYXN5bmMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLnRpbWVvdXQgPSAwO1xuICAgICAgICAgICAgICAgIGlmIChjb25maWcud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5yZXNwb25zZVR5cGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKCdYTUxIdHRwUmVxdWVzdCBzZWVtcyB0byBtaXNzIHRoZSByZXF1ZXN0IHVybCEnKTtcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLmRvbmUuY2FsbCh4aHIsIG9iaik7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZXh0cmFjdCBhbmQgZXZhbCBjb250ZW50IG9mIHNjcmlwdCB0YWdzIGlmIFwiZXZhbHNjcmlwdHRhZ3NcIlxuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZmlnLmV2YWxzY3JpcHR0YWdzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgYWxsIHNjcmlwdCB0YWdzIHdpdGhpbiByZXNwb25zZVRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzY3JpcHR0YWdzID0geGhyLnJlc3BvbnNlVGV4dC5tYXRjaCgvPHNjcmlwdFxcYltePl0qPihbXFxzXFxTXSo/KTxcXC9zY3JpcHQ+L2dpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY3JpcHR0YWdzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NyaXB0dGFncy5mb3JFYWNoKGZ1bmN0aW9uICh0YWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRhZ3MgZnJvbSBzdHJpbmcgYW5kIHRyaW0gaXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGpzID0gdGFnLnJlcGxhY2UoLzxzY3JpcHRcXGJbXj5dKj4vaSwgJycpLnJlcGxhY2UoLzxcXC9zY3JpcHQ+L2ksICcnKS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4ZWN1dGUgamF2YXNjcmlwdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmFsKGpzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25maWcuZmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnLmZhaWwuY2FsbCh4aHIsIG9iaik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnLmFsd2F5cykge1xuICAgICAgICAgICAgICAgICAgICBjb25maWcuYWx3YXlzLmNhbGwoeGhyLCBvYmopO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHJlc2l6ZSBhbmQgcmVwb3NpdGlvbiBwYW5lbCBpZiBlaXRoZXIgd2lkdGggb3IgaGVpZ2h0IGlzIHNldCB0byAnYXV0bydcbiAgICAgICAgICAgICAgICB2YXIgb0NvbnRlbnRTaXplID0gb2JqLm9wdGlvbnMuY29udGVudFNpemU7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvQ29udGVudFNpemUgPT09ICdzdHJpbmcnICYmIG9Db250ZW50U2l6ZS5tYXRjaCgvYXV0by9pKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFydHMgPSBvQ29udGVudFNpemUuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNpemVzID0gT2JqZWN0LmFzc2lnbih7fSwgeyB3aWR0aDogcGFydHNbMF0sIGhlaWdodDogcGFydHNbMV0gfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25maWcuYXV0b3Jlc2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnJlc2l6ZShzaXplcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvYmouY2xhc3NMaXN0LmNvbnRhaW5zKCdqc1BhbmVsLWNvbnRleHRtZW51JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb25maWcuYXV0b3JlcG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoucmVwb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgodHlwZW9mIG9Db250ZW50U2l6ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yob0NvbnRlbnRTaXplKSkgPT09ICdvYmplY3QnICYmIChvQ29udGVudFNpemUud2lkdGggPT09ICdhdXRvJyB8fCBvQ29udGVudFNpemUuaGVpZ2h0ID09PSAnYXV0bycpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfc2l6ZXMgPSBPYmplY3QuYXNzaWduKHt9LCBvQ29udGVudFNpemUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZmlnLmF1dG9yZXNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5yZXNpemUoX3NpemVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9iai5jbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwtY29udGV4dG1lbnUnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5hdXRvcmVwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5yZXBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBhbGxvd3MgcGx1Z2lucyB0byBhZGQgY2FsbGJhY2sgZnVuY3Rpb25zIHRvIHRoZSBhamF4IGFsd2F5cyBjYWxsYmFja1xuICAgICAgICAgICAgICAgIGlmIChqc1BhbmVsLmFqYXhBbHdheXNDYWxsYmFja3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGpzUGFuZWwuYWpheEFsd2F5c0NhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNhbGwob2JqLCBvYmopO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgeGhyLm9wZW4oY29uZmlnLm1ldGhvZCwgY29uZmlnLnVybCwgY29uZmlnLmFzeW5jLCBjb25maWcudXNlciwgY29uZmlnLnB3ZCk7XG4gICAgICAgIHhoci50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQgfHwgMDtcbiAgICAgICAgaWYgKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSBjb25maWcud2l0aENyZWRlbnRpYWxzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb25maWcuYmVmb3JlU2VuZCkge1xuICAgICAgICAgICAgY29uZmlnLmJlZm9yZVNlbmQuY2FsbCh4aHIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25maWcuZGF0YSkge1xuICAgICAgICAgICAgeGhyLnNlbmQoY29uZmlnLmRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgeGhyLnNlbmQobnVsbCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH0sXG4gICAgY2FsY0NvbG9yczogZnVuY3Rpb24gY2FsY0NvbG9ycyhwcmltYXJ5Q29sb3IpIHtcbiAgICAgICAgdmFyIHByaW1lQ29sb3IgPSB0aGlzLmNvbG9yKHByaW1hcnlDb2xvciksXG4gICAgICAgICAgICBzZWNvbmRDb2xvciA9IHRoaXMubGlnaHRlbihwcmltYXJ5Q29sb3IsIDAuODEpLFxuICAgICAgICAgICAgdGhpcmRDb2xvciA9IHRoaXMuZGFya2VuKHByaW1hcnlDb2xvciwgMC41KSxcbiAgICAgICAgICAgIGZvbnRDb2xvckZvclByaW1hcnkgPSB0aGlzLnBlcmNlaXZlZEJyaWdodG5lc3MocHJpbWFyeUNvbG9yKSA8PSAwLjU1NiA/ICcjZmZmZmZmJyA6ICcjMDAwMDAwJyxcbiAgICAgICAgICAgIGZvbnRDb2xvckZvclNlY29uZCA9IHRoaXMucGVyY2VpdmVkQnJpZ2h0bmVzcyhzZWNvbmRDb2xvcikgPD0gMC41NTYgPyAnI2ZmZmZmZicgOiAnIzAwMDAwMCcsXG4gICAgICAgICAgICBmb250Q29sb3JGb3JUaGlyZCA9IHRoaXMucGVyY2VpdmVkQnJpZ2h0bmVzcyh0aGlyZENvbG9yKSA8PSAwLjU1NiA/ICcjMDAwMDAwJyA6ICcjZmZmZmZmJztcbiAgICAgICAgcmV0dXJuIFtwcmltZUNvbG9yLmhzbC5jc3MsIHNlY29uZENvbG9yLCB0aGlyZENvbG9yLCBmb250Q29sb3JGb3JQcmltYXJ5LCBmb250Q29sb3JGb3JTZWNvbmQsIGZvbnRDb2xvckZvclRoaXJkXTtcbiAgICB9LFxuICAgIGNvbG9yOiBmdW5jdGlvbiBjb2xvcih2YWwpIHtcblxuICAgICAgICB2YXIgY29sb3IgPSB2YWwudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgIHIgPSB2b2lkIDAsXG4gICAgICAgICAgICBnID0gdm9pZCAwLFxuICAgICAgICAgICAgYiA9IHZvaWQgMCxcbiAgICAgICAgICAgIGggPSB2b2lkIDAsXG4gICAgICAgICAgICBzID0gdm9pZCAwLFxuICAgICAgICAgICAgbCA9IHZvaWQgMCxcbiAgICAgICAgICAgIG1hdGNoID0gdm9pZCAwLFxuICAgICAgICAgICAgY2hhbm5lbHMgPSB2b2lkIDAsXG4gICAgICAgICAgICBoc2wgPSB2b2lkIDAsXG4gICAgICAgICAgICByZXN1bHQgPSB7fTtcbiAgICAgICAgdmFyIGhleFBhdHRlcm4gPSAvXiM/KFswLTlhLWZdezN9fFswLTlhLWZdezZ9KSQvZ2ksXG4gICAgICAgICAgICAvLyBtYXRjaGVzIFwiIzEyM1wiIG9yIFwiI2YwNWE3OFwiIHdpdGggb3Igd2l0aG91dCBcIiNcIlxuICAgICAgICBSR0JBUGF0dGVybiA9IC9ecmdiYT9cXCgoWzAtOV17MSwzfSksKFswLTldezEsM30pLChbMC05XXsxLDN9KSw/KDB8MXwwXFwuWzAtOV17MSwyfXxcXC5bMC05XXsxLDJ9KT9cXCkkL2dpLFxuICAgICAgICAgICAgLy8gbWF0Y2hlcyByZ2IvcmdiYSBjb2xvciB2YWx1ZXMsIHdoaXRlc3BhY2UgYWxsb3dlZFxuICAgICAgICBIU0xBUGF0dGVybiA9IC9eaHNsYT9cXCgoWzAtOV17MSwzfSksKFswLTldezEsM30lKSwoWzAtOV17MSwzfSUpLD8oMHwxfDBcXC5bMC05XXsxLDJ9fFxcLlswLTldezEsMn0pP1xcKSQvZ2ksXG4gICAgICAgICAgICBuYW1lZENvbG9ycyA9IHtcbiAgICAgICAgICAgIGFsaWNlYmx1ZTogJ2YwZjhmZicsXG4gICAgICAgICAgICBhbnRpcXVld2hpdGU6ICdmYWViZDcnLFxuICAgICAgICAgICAgYXF1YTogJzBmZicsXG4gICAgICAgICAgICBhcXVhbWFyaW5lOiAnN2ZmZmQ0JyxcbiAgICAgICAgICAgIGF6dXJlOiAnZjBmZmZmJyxcbiAgICAgICAgICAgIGJlaWdlOiAnZjVmNWRjJyxcbiAgICAgICAgICAgIGJpc3F1ZTogJ2ZmZTRjNCcsXG4gICAgICAgICAgICBibGFjazogJzAwMCcsXG4gICAgICAgICAgICBibGFuY2hlZGFsbW9uZDogJ2ZmZWJjZCcsXG4gICAgICAgICAgICBibHVlOiAnMDBmJyxcbiAgICAgICAgICAgIGJsdWV2aW9sZXQ6ICc4YTJiZTInLFxuICAgICAgICAgICAgYnJvd246ICdhNTJhMmEnLFxuICAgICAgICAgICAgYnVybHl3b29kOiAnZGViODg3JyxcbiAgICAgICAgICAgIGNhZGV0Ymx1ZTogJzVmOWVhMCcsXG4gICAgICAgICAgICBjaGFydHJldXNlOiAnN2ZmZjAwJyxcbiAgICAgICAgICAgIGNob2NvbGF0ZTogJ2QyNjkxZScsXG4gICAgICAgICAgICBjb3JhbDogJ2ZmN2Y1MCcsXG4gICAgICAgICAgICBjb3JuZmxvd2VyYmx1ZTogJzY0OTVlZCcsXG4gICAgICAgICAgICBjb3Juc2lsazogJ2ZmZjhkYycsXG4gICAgICAgICAgICBjcmltc29uOiAnZGMxNDNjJyxcbiAgICAgICAgICAgIGN5YW46ICcwZmYnLFxuICAgICAgICAgICAgZGFya2JsdWU6ICcwMDAwOGInLFxuICAgICAgICAgICAgZGFya2N5YW46ICcwMDhiOGInLFxuICAgICAgICAgICAgZGFya2dvbGRlbnJvZDogJ2I4ODYwYicsXG4gICAgICAgICAgICBkYXJrZ3JheTogJ2E5YTlhOScsXG4gICAgICAgICAgICBkYXJrZ3JleTogJ2E5YTlhOScsXG4gICAgICAgICAgICBkYXJrZ3JlZW46ICcwMDY0MDAnLFxuICAgICAgICAgICAgZGFya2toYWtpOiAnYmRiNzZiJyxcbiAgICAgICAgICAgIGRhcmttYWdlbnRhOiAnOGIwMDhiJyxcbiAgICAgICAgICAgIGRhcmtvbGl2ZWdyZWVuOiAnNTU2YjJmJyxcbiAgICAgICAgICAgIGRhcmtvcmFuZ2U6ICdmZjhjMDAnLFxuICAgICAgICAgICAgZGFya29yY2hpZDogJzk5MzJjYycsXG4gICAgICAgICAgICBkYXJrcmVkOiAnOGIwMDAwJyxcbiAgICAgICAgICAgIGRhcmtzYWxtb246ICdlOTk2N2EnLFxuICAgICAgICAgICAgZGFya3NlYWdyZWVuOiAnOGZiYzhmJyxcbiAgICAgICAgICAgIGRhcmtzbGF0ZWJsdWU6ICc0ODNkOGInLFxuICAgICAgICAgICAgZGFya3NsYXRlZ3JheTogJzJmNGY0ZicsXG4gICAgICAgICAgICBkYXJrc2xhdGVncmV5OiAnMmY0ZjRmJyxcbiAgICAgICAgICAgIGRhcmt0dXJxdW9pc2U6ICcwMGNlZDEnLFxuICAgICAgICAgICAgZGFya3Zpb2xldDogJzk0MDBkMycsXG4gICAgICAgICAgICBkZWVwcGluazogJ2ZmMTQ5MycsXG4gICAgICAgICAgICBkZWVwc2t5Ymx1ZTogJzAwYmZmZicsXG4gICAgICAgICAgICBkaW1ncmF5OiAnNjk2OTY5JyxcbiAgICAgICAgICAgIGRpbWdyZXk6ICc2OTY5NjknLFxuICAgICAgICAgICAgZG9kZ2VyYmx1ZTogJzFlOTBmZicsXG4gICAgICAgICAgICBmaXJlYnJpY2s6ICdiMjIyMjInLFxuICAgICAgICAgICAgZmxvcmFsd2hpdGU6ICdmZmZhZjAnLFxuICAgICAgICAgICAgZm9yZXN0Z3JlZW46ICcyMjhiMjInLFxuICAgICAgICAgICAgZnVjaHNpYTogJ2YwZicsXG4gICAgICAgICAgICBnYWluc2Jvcm86ICdkY2RjZGMnLFxuICAgICAgICAgICAgZ2hvc3R3aGl0ZTogJ2Y4ZjhmZicsXG4gICAgICAgICAgICBnb2xkOiAnZmZkNzAwJyxcbiAgICAgICAgICAgIGdvbGRlbnJvZDogJ2RhYTUyMCcsXG4gICAgICAgICAgICBncmF5OiAnODA4MDgwJyxcbiAgICAgICAgICAgIGdyZXk6ICc4MDgwODAnLFxuICAgICAgICAgICAgZ3JlZW46ICcwMDgwMDAnLFxuICAgICAgICAgICAgZ3JlZW55ZWxsb3c6ICdhZGZmMmYnLFxuICAgICAgICAgICAgaG9uZXlkZXc6ICdmMGZmZjAnLFxuICAgICAgICAgICAgaG90cGluazogJ2ZmNjliNCcsXG4gICAgICAgICAgICBpbmRpYW5yZWQ6ICdjZDVjNWMnLFxuICAgICAgICAgICAgaW5kaWdvOiAnNGIwMDgyJyxcbiAgICAgICAgICAgIGl2b3J5OiAnZmZmZmYwJyxcbiAgICAgICAgICAgIGtoYWtpOiAnZjBlNjhjJyxcbiAgICAgICAgICAgIGxhdmVuZGVyOiAnZTZlNmZhJyxcbiAgICAgICAgICAgIGxhdmVuZGVyYmx1c2g6ICdmZmYwZjUnLFxuICAgICAgICAgICAgbGF3bmdyZWVuOiAnN2NmYzAwJyxcbiAgICAgICAgICAgIGxlbW9uY2hpZmZvbjogJ2ZmZmFjZCcsXG4gICAgICAgICAgICBsaWdodGJsdWU6ICdhZGQ4ZTYnLFxuICAgICAgICAgICAgbGlnaHRjb3JhbDogJ2YwODA4MCcsXG4gICAgICAgICAgICBsaWdodGN5YW46ICdlMGZmZmYnLFxuICAgICAgICAgICAgbGlnaHRnb2xkZW5yb2R5ZWxsb3c6ICdmYWZhZDInLFxuICAgICAgICAgICAgbGlnaHRncmF5OiAnZDNkM2QzJyxcbiAgICAgICAgICAgIGxpZ2h0Z3JleTogJ2QzZDNkMycsXG4gICAgICAgICAgICBsaWdodGdyZWVuOiAnOTBlZTkwJyxcbiAgICAgICAgICAgIGxpZ2h0cGluazogJ2ZmYjZjMScsXG4gICAgICAgICAgICBsaWdodHNhbG1vbjogJ2ZmYTA3YScsXG4gICAgICAgICAgICBsaWdodHNlYWdyZWVuOiAnMjBiMmFhJyxcbiAgICAgICAgICAgIGxpZ2h0c2t5Ymx1ZTogJzg3Y2VmYScsXG4gICAgICAgICAgICBsaWdodHNsYXRlZ3JheTogJzc4OScsXG4gICAgICAgICAgICBsaWdodHNsYXRlZ3JleTogJzc4OScsXG4gICAgICAgICAgICBsaWdodHN0ZWVsYmx1ZTogJ2IwYzRkZScsXG4gICAgICAgICAgICBsaWdodHllbGxvdzogJ2ZmZmZlMCcsXG4gICAgICAgICAgICBsaW1lOiAnMGYwJyxcbiAgICAgICAgICAgIGxpbWVncmVlbjogJzMyY2QzMicsXG4gICAgICAgICAgICBsaW5lbjogJ2ZhZjBlNicsXG4gICAgICAgICAgICBtYWdlbnRhOiAnZjBmJyxcbiAgICAgICAgICAgIG1hcm9vbjogJzgwMDAwMCcsXG4gICAgICAgICAgICBtZWRpdW1hcXVhbWFyaW5lOiAnNjZjZGFhJyxcbiAgICAgICAgICAgIG1lZGl1bWJsdWU6ICcwMDAwY2QnLFxuICAgICAgICAgICAgbWVkaXVtb3JjaGlkOiAnYmE1NWQzJyxcbiAgICAgICAgICAgIG1lZGl1bXB1cnBsZTogJzkzNzBkOCcsXG4gICAgICAgICAgICBtZWRpdW1zZWFncmVlbjogJzNjYjM3MScsXG4gICAgICAgICAgICBtZWRpdW1zbGF0ZWJsdWU6ICc3YjY4ZWUnLFxuICAgICAgICAgICAgbWVkaXVtc3ByaW5nZ3JlZW46ICcwMGZhOWEnLFxuICAgICAgICAgICAgbWVkaXVtdHVycXVvaXNlOiAnNDhkMWNjJyxcbiAgICAgICAgICAgIG1lZGl1bXZpb2xldHJlZDogJ2M3MTU4NScsXG4gICAgICAgICAgICBtaWRuaWdodGJsdWU6ICcxOTE5NzAnLFxuICAgICAgICAgICAgbWludGNyZWFtOiAnZjVmZmZhJyxcbiAgICAgICAgICAgIG1pc3R5cm9zZTogJ2ZmZTRlMScsXG4gICAgICAgICAgICBtb2NjYXNpbjogJ2ZmZTRiNScsXG4gICAgICAgICAgICBuYXZham93aGl0ZTogJ2ZmZGVhZCcsXG4gICAgICAgICAgICBuYXZ5OiAnMDAwMDgwJyxcbiAgICAgICAgICAgIG9sZGxhY2U6ICdmZGY1ZTYnLFxuICAgICAgICAgICAgb2xpdmU6ICc4MDgwMDAnLFxuICAgICAgICAgICAgb2xpdmVkcmFiOiAnNmI4ZTIzJyxcbiAgICAgICAgICAgIG9yYW5nZTogJ2ZmYTUwMCcsXG4gICAgICAgICAgICBvcmFuZ2VyZWQ6ICdmZjQ1MDAnLFxuICAgICAgICAgICAgb3JjaGlkOiAnZGE3MGQ2JyxcbiAgICAgICAgICAgIHBhbGVnb2xkZW5yb2Q6ICdlZWU4YWEnLFxuICAgICAgICAgICAgcGFsZWdyZWVuOiAnOThmYjk4JyxcbiAgICAgICAgICAgIHBhbGV0dXJxdW9pc2U6ICdhZmVlZWUnLFxuICAgICAgICAgICAgcGFsZXZpb2xldHJlZDogJ2Q4NzA5MycsXG4gICAgICAgICAgICBwYXBheWF3aGlwOiAnZmZlZmQ1JyxcbiAgICAgICAgICAgIHBlYWNocHVmZjogJ2ZmZGFiOScsXG4gICAgICAgICAgICBwZXJ1OiAnY2Q4NTNmJyxcbiAgICAgICAgICAgIHBpbms6ICdmZmMwY2InLFxuICAgICAgICAgICAgcGx1bTogJ2RkYTBkZCcsXG4gICAgICAgICAgICBwb3dkZXJibHVlOiAnYjBlMGU2JyxcbiAgICAgICAgICAgIHB1cnBsZTogJzgwMDA4MCcsXG4gICAgICAgICAgICByZWJlY2NhcHVycGxlOiAnNjM5JyxcbiAgICAgICAgICAgIHJlZDogJ2YwMCcsXG4gICAgICAgICAgICByb3N5YnJvd246ICdiYzhmOGYnLFxuICAgICAgICAgICAgcm95YWxibHVlOiAnNDE2OWUxJyxcbiAgICAgICAgICAgIHNhZGRsZWJyb3duOiAnOGI0NTEzJyxcbiAgICAgICAgICAgIHNhbG1vbjogJ2ZhODA3MicsXG4gICAgICAgICAgICBzYW5keWJyb3duOiAnZjRhNDYwJyxcbiAgICAgICAgICAgIHNlYWdyZWVuOiAnMmU4YjU3JyxcbiAgICAgICAgICAgIHNlYXNoZWxsOiAnZmZmNWVlJyxcbiAgICAgICAgICAgIHNpZW5uYTogJ2EwNTIyZCcsXG4gICAgICAgICAgICBzaWx2ZXI6ICdjMGMwYzAnLFxuICAgICAgICAgICAgc2t5Ymx1ZTogJzg3Y2VlYicsXG4gICAgICAgICAgICBzbGF0ZWJsdWU6ICc2YTVhY2QnLFxuICAgICAgICAgICAgc2xhdGVncmF5OiAnNzA4MDkwJyxcbiAgICAgICAgICAgIHNsYXRlZ3JleTogJzcwODA5MCcsXG4gICAgICAgICAgICBzbm93OiAnZmZmYWZhJyxcbiAgICAgICAgICAgIHNwcmluZ2dyZWVuOiAnMDBmZjdmJyxcbiAgICAgICAgICAgIHN0ZWVsYmx1ZTogJzQ2ODJiNCcsXG4gICAgICAgICAgICB0YW46ICdkMmI0OGMnLFxuICAgICAgICAgICAgdGVhbDogJzAwODA4MCcsXG4gICAgICAgICAgICB0aGlzdGxlOiAnZDhiZmQ4JyxcbiAgICAgICAgICAgIHRvbWF0bzogJ2ZmNjM0NycsXG4gICAgICAgICAgICB0dXJxdW9pc2U6ICc0MGUwZDAnLFxuICAgICAgICAgICAgdmlvbGV0OiAnZWU4MmVlJyxcbiAgICAgICAgICAgIHdoZWF0OiAnZjVkZWIzJyxcbiAgICAgICAgICAgIHdoaXRlOiAnZmZmJyxcbiAgICAgICAgICAgIHdoaXRlc21va2U6ICdmNWY1ZjUnLFxuICAgICAgICAgICAgeWVsbG93OiAnZmYwJyxcbiAgICAgICAgICAgIHllbGxvd2dyZWVuOiAnOWFjZDMyJ1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGNoYW5nZSBuYW1lZCBjb2xvciB0byBjb3JyZXNwb25kaW5nIGhleCB2YWx1ZVxuICAgICAgICBpZiAobmFtZWRDb2xvcnNbY29sb3JdKSB7XG4gICAgICAgICAgICBjb2xvciA9IG5hbWVkQ29sb3JzW2NvbG9yXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIHZhbCBmb3IgaGV4IGNvbG9yXG4gICAgICAgIGlmIChjb2xvci5tYXRjaChoZXhQYXR0ZXJuKSAhPT0gbnVsbCkge1xuXG4gICAgICAgICAgICAvLyAnIycgZW50ZmVybmVuIHdlbm4gdm9yaGFuZGVuXG4gICAgICAgICAgICBjb2xvciA9IGNvbG9yLnJlcGxhY2UoJyMnLCAnJyk7XG5cbiAgICAgICAgICAgIC8vIGNvbG9yIGhhcyBlaXRoZXIgMyBvciA2IGNoYXJhY3RlcnNcbiAgICAgICAgICAgIGlmIChjb2xvci5sZW5ndGggJSAyID09PSAxKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBjb2xvciBoYXMgMyBjaGFyIC0+IGNvbnZlcnQgdG8gNiBjaGFyXG4gICAgICAgICAgICAgICAgLy8gciA9IGNvbG9yLnN1YnN0cigwLDEpLnJlcGVhdCgyKTtcbiAgICAgICAgICAgICAgICAvLyBnID0gY29sb3Iuc3Vic3RyKDEsMSkucmVwZWF0KDIpOyAvLyBTdHJpbmcucHJvdG90eXBlLnJlcGVhdCgpIGRvZXNuJ3Qgd29yayBpbiBJRTExXG4gICAgICAgICAgICAgICAgLy8gYiA9IGNvbG9yLnN1YnN0cigyLDEpLnJlcGVhdCgyKTtcbiAgICAgICAgICAgICAgICByID0gU3RyaW5nKGNvbG9yLnN1YnN0cigwLCAxKSkgKyBjb2xvci5zdWJzdHIoMCwgMSk7XG4gICAgICAgICAgICAgICAgZyA9IFN0cmluZyhjb2xvci5zdWJzdHIoMSwgMSkpICsgY29sb3Iuc3Vic3RyKDEsIDEpO1xuICAgICAgICAgICAgICAgIGIgPSBTdHJpbmcoY29sb3Iuc3Vic3RyKDIsIDEpKSArIGNvbG9yLnN1YnN0cigyLCAxKTtcblxuICAgICAgICAgICAgICAgIHJlc3VsdC5yZ2IgPSB7XG4gICAgICAgICAgICAgICAgICAgIHI6IHBhcnNlSW50KHIsIDE2KSxcbiAgICAgICAgICAgICAgICAgICAgZzogcGFyc2VJbnQoZywgMTYpLFxuICAgICAgICAgICAgICAgICAgICBiOiBwYXJzZUludChiLCAxNilcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcmVzdWx0LmhleCA9ICcjJyArIHIgKyBnICsgYjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAvLyBjb2xvciBoYXMgNiBjaGFyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnJnYiA9IHtcbiAgICAgICAgICAgICAgICAgICAgcjogcGFyc2VJbnQoY29sb3Iuc3Vic3RyKDAsIDIpLCAxNiksXG4gICAgICAgICAgICAgICAgICAgIGc6IHBhcnNlSW50KGNvbG9yLnN1YnN0cigyLCAyKSwgMTYpLFxuICAgICAgICAgICAgICAgICAgICBiOiBwYXJzZUludChjb2xvci5zdWJzdHIoNCwgMiksIDE2KVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICByZXN1bHQuaGV4ID0gJyMnICsgY29sb3I7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGhzbCA9IHRoaXMucmdiVG9Ic2wocmVzdWx0LnJnYi5yLCByZXN1bHQucmdiLmcsIHJlc3VsdC5yZ2IuYik7XG4gICAgICAgICAgICByZXN1bHQuaHNsID0gaHNsO1xuICAgICAgICAgICAgcmVzdWx0LnJnYi5jc3MgPSAncmdiKCcgKyByZXN1bHQucmdiLnIgKyAnLCcgKyByZXN1bHQucmdiLmcgKyAnLCcgKyByZXN1bHQucmdiLmIgKyAnKSc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2hlY2sgdmFsIGZvciByZ2IvcmdiYSBjb2xvclxuICAgICAgICBlbHNlIGlmIChjb2xvci5tYXRjaChSR0JBUGF0dGVybikpIHtcblxuICAgICAgICAgICAgICAgIG1hdGNoID0gUkdCQVBhdHRlcm4uZXhlYyhjb2xvcik7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnJnYiA9IHsgY3NzOiBjb2xvciwgcjogbWF0Y2hbMV0sIGc6IG1hdGNoWzJdLCBiOiBtYXRjaFszXSB9O1xuICAgICAgICAgICAgICAgIHJlc3VsdC5oZXggPSB0aGlzLnJnYlRvSGV4KG1hdGNoWzFdLCBtYXRjaFsyXSwgbWF0Y2hbM10pO1xuICAgICAgICAgICAgICAgIGhzbCA9IHRoaXMucmdiVG9Ic2wobWF0Y2hbMV0sIG1hdGNoWzJdLCBtYXRjaFszXSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmhzbCA9IGhzbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNoZWNrIHZhbCBmb3IgaHNsL2hzbGEgY29sb3JcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbG9yLm1hdGNoKEhTTEFQYXR0ZXJuKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoID0gSFNMQVBhdHRlcm4uZXhlYyhjb2xvcik7XG5cbiAgICAgICAgICAgICAgICAgICAgaCA9IG1hdGNoWzFdIC8gMzYwO1xuICAgICAgICAgICAgICAgICAgICBzID0gbWF0Y2hbMl0uc3Vic3RyKDAsIG1hdGNoWzJdLmxlbmd0aCAtIDEpIC8gMTAwO1xuICAgICAgICAgICAgICAgICAgICBsID0gbWF0Y2hbM10uc3Vic3RyKDAsIG1hdGNoWzNdLmxlbmd0aCAtIDEpIC8gMTAwO1xuXG4gICAgICAgICAgICAgICAgICAgIGNoYW5uZWxzID0gdGhpcy5oc2xUb1JnYihoLCBzLCBsKTtcblxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucmdiID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiAncmdiKCcgKyBjaGFubmVsc1swXSArICcsJyArIGNoYW5uZWxzWzFdICsgJywnICsgY2hhbm5lbHNbMl0gKyAnKScsXG4gICAgICAgICAgICAgICAgICAgICAgICByOiBjaGFubmVsc1swXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGc6IGNoYW5uZWxzWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgYjogY2hhbm5lbHNbMl1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmhleCA9IHRoaXMucmdiVG9IZXgocmVzdWx0LnJnYi5yLCByZXN1bHQucmdiLmcsIHJlc3VsdC5yZ2IuYik7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5oc2wgPSB7IGNzczogJ2hzbCgnICsgbWF0Y2hbMV0gKyAnLCcgKyBtYXRjaFsyXSArICcsJyArIG1hdGNoWzNdICsgJyknLCBoOiBtYXRjaFsxXSwgczogbWF0Y2hbMl0sIGw6IG1hdGNoWzNdIH07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gb3IgcmV0dXJuICNmNWY1ZjVcbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5oZXggPSAnI2Y1ZjVmNSc7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucmdiID0geyBjc3M6ICdyZ2IoMjQ1LDI0NSwyNDUpJywgcjogMjQ1LCBnOiAyNDUsIGI6IDI0NSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmhzbCA9IHsgY3NzOiAnaHNsKDAsMCUsOTYuMDglKScsIGg6IDAsIHM6ICcwJScsIGw6ICc5Ni4wOCUnIH07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG4gICAgY3JlYXRlUGFuZWxUZW1wbGF0ZTogZnVuY3Rpb24gY3JlYXRlUGFuZWxUZW1wbGF0ZSgpIHtcbiAgICAgICAgdmFyIGRhdGFBdHRyID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuXG4gICAgICAgIHZhciBwYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBwYW5lbC5jbGFzc05hbWUgPSAnanNQYW5lbCc7XG4gICAgICAgIGlmIChkYXRhQXR0cikge1xuICAgICAgICAgICAgWydjbG9zZScsICdtYXhpbWl6ZScsICdub3JtYWxpemUnLCAnbWluaW1pemUnLCAnc21hbGxpZnknLCAnc21hbGxpZnlyZXYnXS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgcGFuZWwuc2V0QXR0cmlidXRlKCdkYXRhLWJ0bicgKyBpdGVtLCAnZW5hYmxlZCcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcGFuZWwuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJqc1BhbmVsLWhkclwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtaGVhZGVyYmFyXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtaGVhZGVybG9nb1wiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLXRpdGxlYmFyXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cImpzUGFuZWwtdGl0bGVcIj48L2gzPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLWNvbnRyb2xiYXJcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLXNtYWxsaWZ5XCI+PHNwYW4gY2xhc3M9XCJqc2dseXBoIGpzZ2x5cGgtY2hldnJvbi11cFwiPjwvc3Bhbj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLXNtYWxsaWZ5cmV2XCI+PHNwYW4gY2xhc3M9XCJqc2dseXBoIGpzZ2x5cGgtY2hldnJvbi1kb3duXCI+PC9zcGFuPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1idG4ganNQYW5lbC1idG4tbWluaW1pemVcIj48c3BhbiBjbGFzcz1cImpzZ2x5cGgganNnbHlwaC1taW5pbWl6ZVwiPjwvc3Bhbj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLW5vcm1hbGl6ZVwiPjxzcGFuIGNsYXNzPVwianNnbHlwaCBqc2dseXBoLW5vcm1hbGl6ZVwiPjwvc3Bhbj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLW1heGltaXplXCI+PHNwYW4gY2xhc3M9XCJqc2dseXBoIGpzZ2x5cGgtbWF4aW1pemVcIj48L3NwYW4+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLWJ0biBqc1BhbmVsLWJ0bi1jbG9zZVwiPjxzcGFuIGNsYXNzPVwianNnbHlwaCBqc2dseXBoLWNsb3NlXCI+PC9zcGFuPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1oZHItdG9vbGJhclwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtY29udGVudCBqc1BhbmVsLWNvbnRlbnQtbm9mb290ZXJcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtbWluaW1pemVkLWJveFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1mdHJcIj48L2Rpdj4nO1xuICAgICAgICByZXR1cm4gcGFuZWw7XG4gICAgfSxcbiAgICBjcmVhdGVNaW5pbWl6ZWRUZW1wbGF0ZTogZnVuY3Rpb24gY3JlYXRlTWluaW1pemVkVGVtcGxhdGUoKSB7XG4gICAgICAgIHZhciBwYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBwYW5lbC5jbGFzc05hbWUgPSAnanNQYW5lbC1yZXBsYWNlbWVudCc7XG4gICAgICAgIHBhbmVsLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwianNQYW5lbC1oZHJcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLWhlYWRlcmJhclwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLWhlYWRlcmxvZ29cIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC10aXRsZWJhclwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJqc1BhbmVsLXRpdGxlXCI+PC9oMz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1jb250cm9sYmFyXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLWJ0biBqc1BhbmVsLWJ0bi1ub3JtYWxpemVcIj48c3BhbiBjbGFzcz1cImpzZ2x5cGgganNnbHlwaC1ub3JtYWxpemVcIj48L3NwYW4+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLWJ0biBqc1BhbmVsLWJ0bi1tYXhpbWl6ZVwiPjxzcGFuIGNsYXNzPVwianNnbHlwaCBqc2dseXBoLW1heGltaXplXCI+PC9zcGFuPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1idG4ganNQYW5lbC1idG4tY2xvc2VcIj48c3BhbiBjbGFzcz1cImpzZ2x5cGgganNnbHlwaC1jbG9zZVwiPjwvc3Bhbj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4nO1xuICAgICAgICByZXR1cm4gcGFuZWw7XG4gICAgfSxcbiAgICBjcmVhdGVTbmFwQXJlYTogZnVuY3Rpb24gY3JlYXRlU25hcEFyZWEocGFuZWwsIHBvcywgc25hcHNlbnMpIHtcbiAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgICAgICBwYXJlbnQgPSBwYW5lbC5wYXJlbnROb2RlO1xuICAgICAgICBlbC5jbGFzc05hbWUgPSAnanNQYW5lbC1zbmFwLWFyZWEganNQYW5lbC1zbmFwLWFyZWEtJyArIHBvcztcbiAgICAgICAgaWYgKHBvcyA9PT0gJ2x0JyB8fCBwb3MgPT09ICdydCcgfHwgcG9zID09PSAncmInIHx8IHBvcyA9PT0gJ2xiJykge1xuICAgICAgICAgICAgZWwuc3R5bGUud2lkdGggPSBzbmFwc2VucyArICdweCc7XG4gICAgICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBzbmFwc2VucyArICdweCc7XG4gICAgICAgIH0gZWxzZSBpZiAocG9zID09PSAnY3QnIHx8IHBvcyA9PT0gJ2NiJykge1xuICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gc25hcHNlbnMgKyAncHgnO1xuICAgICAgICB9IGVsc2UgaWYgKHBvcyA9PT0gJ2xjJyB8fCBwb3MgPT09ICdyYycpIHtcbiAgICAgICAgICAgIGVsLnN0eWxlLndpZHRoID0gc25hcHNlbnMgKyAncHgnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJlbnQgIT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgICAgIGVsLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLXNuYXAtYXJlYS5qc1BhbmVsLXNuYXAtYXJlYS0nICsgcG9zKSkge1xuICAgICAgICAgICAgcGFuZWwucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChlbCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGRhcmtlbjogZnVuY3Rpb24gZGFya2VuKHZhbCwgYW1vdW50KSB7XG4gICAgICAgIC8vIGFtb3VudCBpcyB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDFcbiAgICAgICAgdmFyIGhzbCA9IHRoaXMuY29sb3IodmFsKS5oc2wsXG4gICAgICAgICAgICBsID0gcGFyc2VGbG9hdChoc2wubCksXG4gICAgICAgICAgICBsbmV3ID0gbCAtIGwgKiBhbW91bnQgKyAnJSc7XG4gICAgICAgIHJldHVybiAnaHNsKCcgKyBoc2wuaCArICcsJyArIGhzbC5zICsgJywnICsgbG5ldyArICcpJztcbiAgICB9LFxuICAgIGRyYWdpdDogZnVuY3Rpb24gZHJhZ2l0KGVsbXQpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG4gICAgICAgIHZhciBkcmFnc3RhcnRlZCA9IHZvaWQgMCxcbiAgICAgICAgICAgIG9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRzLmRyYWdpdCwgb3B0aW9ucyksXG4gICAgICAgICAgICBkcmFnRWxtdCA9IHZvaWQgMCxcbiAgICAgICAgICAgIGNvbnRhaW5tZW50ID0gdm9pZCAwLFxuICAgICAgICAgICAgZnJhbWVzID0gW107XG4gICAgICAgIHZhciBkcmFnc3RhcnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ2RyYWdzdGFydCcsIHsgZGV0YWlsOiBlbG10LmlkIH0pLFxuICAgICAgICAgICAgZHJhZyA9IG5ldyBDdXN0b21FdmVudCgnZHJhZycsIHsgZGV0YWlsOiBlbG10LmlkIH0pLFxuICAgICAgICAgICAgZHJhZ3N0b3AgPSBuZXcgQ3VzdG9tRXZlbnQoJ2RyYWdzdG9wJywgeyBkZXRhaWw6IGVsbXQuaWQgfSk7XG5cbiAgICAgICAgLy8gbm9ybWFsaXplIGdyaWQgY29uZmlnXG4gICAgICAgIGlmIChvcHRzLmdyaWQgJiYgQXJyYXkuaXNBcnJheShvcHRzLmdyaWQpKSB7XG4gICAgICAgICAgICBpZiAob3B0cy5ncmlkLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIG9wdHMuZ3JpZFsxXSA9IG9wdHMuZ3JpZFswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vcm1hbGl6ZSBjb250YWlubWVudCBjb25maWdcbiAgICAgICAgY29udGFpbm1lbnQgPSB0aGlzLnBPY29udGFpbm1lbnQob3B0cy5jb250YWlubWVudCk7XG5cbiAgICAgICAgLy8gYXR0YWNoIGhhbmRsZXIgdG8gZWFjaCBkcmFnIGhhbmRsZVxuICAgICAgICBlbG10LnF1ZXJ5U2VsZWN0b3JBbGwob3B0cy5oYW5kbGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGUpIHtcblxuICAgICAgICAgICAgaGFuZGxlLnN0eWxlLnRvdWNoQWN0aW9uID0gJ25vbmUnO1xuICAgICAgICAgICAgaGFuZGxlLnN0eWxlLmN1cnNvciA9IG9wdHMuY3Vyc29yO1xuICAgICAgICAgICAgaGFuZGxlLmNsYXNzTGlzdC5hZGQoJ2pzUGFuZWwtZHJhZ2l0LWhhbmRsZScpO1xuXG4gICAgICAgICAgICBqc1BhbmVsLnBvaW50ZXJkb3duLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBoYW5kbGUuYWRkRXZlbnRMaXN0ZW5lcihpdGVtLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBwcmV2ZW50IGJvZHkgc2Nyb2xsIG9uIGRyYWcgaW5pdFxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZm9vdGVyIGVsbXRzIHdpdGggdGhlIGNsYXNzIFwianNQYW5lbC1mdHItYnRuXCIgZG9uJ3QgZHJhZyBhIHBhbmVsXG4gICAgICAgICAgICAgICAgICAgIC8vIGRvIG5vdCBjb21wYXJlIGUudGFyZ2V0IHdpdGggZS5jdXJyZW50VGFyZ2V0IGJlY2F1c2UgdGhlcmUgbWlnaHQgYmUgZm9vdGVyIGVsbXRzIHN1cHBvc2VkIHRvIGRyYWcgdGhlIHBhbmVsXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbG9zZXN0KCcuanNQYW5lbC1mdHItYnRuJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGVsbXQuY29udHJvbGJhci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICBmcmFtZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpZnJhbWUnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZyYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnRTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbG10KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0TGVmdCA9IHBhcnNlRmxvYXQoc3RhcnRTdHlsZXMubGVmdCksXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydFRvcCA9IHBhcnNlRmxvYXQoc3RhcnRTdHlsZXMudG9wKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBzeCA9IGUudG91Y2hlcyA/IGUudG91Y2hlc1swXS5jbGllbnRYIDogZS5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9pbnRlciB4IG9uIG1vdXNlZG93biAoZG9uJ3QgdXNlIHBhZ2VYLCBkb2Vzbid0IHdvcmsgb24gRkYgZm9yIEFuZHJvaWQpXG4gICAgICAgICAgICAgICAgICAgIHBzeSA9IGUudG91Y2hlcyA/IGUudG91Y2hlc1swXS5jbGllbnRZIDogZS5jbGllbnRZLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9pbnRlciB5IG9uIG1vdXNlZG93biAoZG9uJ3QgdXNlIHBhZ2VZLCBkb2Vzbid0IHdvcmsgb24gRkYgZm9yIEFuZHJvaWQpXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudCA9IGVsbXQucGFyZW50Tm9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudFJlY3QgPSBwYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShwYXJlbnQpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnRMZWZ0Q29ycmVjdGlvbiA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gYWN0dWFsbHkgZHJhZ2luZyB0aGUgZWxtdFxuICAgICAgICAgICAgICAgICAgICBkcmFnRWxtdCA9IGZ1bmN0aW9uIGRyYWdFbG10KGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkcmFnc3RhcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZHJhZ3N0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLm9wYWNpdHkgPSBvcHRzLm9wYWNpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgY29uZmlndXJlZCByZXN0b3JlIHBhbmVsIHNpemUgdG8gdmFsdWVzIGJlZm9yZSBzbmFwIGFuZCByZXBvc2l0aW9uIHJlYXNvbmFibGUgYmVmb3JlIGRyYWcgYWN0dWFsbHkgc3RhcnRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsbXQuc25hcHBlZCAmJiBvcHRzLnNuYXAucmVzaXplVG9QcmVTbmFwICYmIGVsbXQuY3VycmVudERhdGEuYmVmb3JlU25hcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnJlc2l6ZShlbG10LmN1cnJlbnREYXRhLmJlZm9yZVNuYXAud2lkdGggKyAnICcgKyBlbG10LmN1cnJlbnREYXRhLmJlZm9yZVNuYXAuaGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW50ZXJtZWRpYXRlU3R5bGVzID0gZWxtdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhID0gcHN4IC0gKGludGVybWVkaWF0ZVN0eWxlcy5sZWZ0ICsgaW50ZXJtZWRpYXRlU3R5bGVzLndpZHRoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdIYWxmID0gaW50ZXJtZWRpYXRlU3R5bGVzLndpZHRoIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlbHRhID4gLXdIYWxmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydExlZnRDb3JyZWN0aW9uID0gZGVsdGEgKyB3SGFsZjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkcmFnc3RhcnQgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdHMuc3RhcnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5zdGFydC5jYWxsKGVsbXQsIGVsbXQsIHsgbGVmdDogc3RhcnRMZWZ0LCB0b3A6IHN0YXJ0VG9wIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc1BhbmVsLmZyb250KGVsbXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc25hcHBlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ3N0YXJ0ZWQgPSAxO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5kaXNhYmxlT25NYXhpbWl6ZWQgJiYgZWxtdC5zdGF0dXMgPT09ICdtYXhpbWl6ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxtdEwgPSB2b2lkIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdEwyID0gdm9pZCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXRUID0gdm9pZCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXRUMiA9IHZvaWQgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10UiA9IHZvaWQgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10UjIgPSB2b2lkIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdEIgPSB2b2lkIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdEIyID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBteCA9IGUudG91Y2hlcyA/IGUudG91Y2hlc1swXS5jbGllbnRYIDogZS5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGN1cnJlbnQgcG9pbnRlciB4IHdoaWxlIHBvaW50ZXIgbW92ZXMgKGRvbid0IHVzZSBwYWdlWCwgZG9lc24ndCB3b3JrIG9uIEZGIGZvciBBbmRyb2lkKVxuICAgICAgICAgICAgICAgICAgICAgICAgcG15ID0gZS50b3VjaGVzID8gZS50b3VjaGVzWzBdLmNsaWVudFkgOiBlLmNsaWVudFksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY3VycmVudCBwb2ludGVyIHkgd2hpbGUgcG9pbnRlciBtb3ZlcyAoZG9uJ3QgdXNlIHBhZ2VZLCBkb2Vzbid0IHdvcmsgb24gRkYgZm9yIEFuZHJvaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICBkcmFnU3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxtdCk7IC8vIGdldCBjdXJyZW50IHN0eWxlcyB3aGlsZSBkcmFnaW5nXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNuYXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5zbmFwLnRyaWdnZXIgPT09ICdwYW5lbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdEwgPSBwYXJzZUZsb2F0KGRyYWdTdHlsZXMubGVmdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXRMMiA9IE1hdGgucG93KGVsbXRMLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdFQgPSBwYXJzZUZsb2F0KGRyYWdTdHlsZXMudG9wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdFQyID0gTWF0aC5wb3coZWxtdFQsIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10UiA9IHBhcnNlRmxvYXQoZHJhZ1N0eWxlcy5yaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXRSMiA9IE1hdGgucG93KGVsbXRSLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdEIgPSBwYXJzZUZsb2F0KGRyYWdTdHlsZXMuYm90dG9tKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdEIyID0gTWF0aC5wb3coZWxtdEIsIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0cy5zbmFwLnRyaWdnZXIgPT09ICdwb2ludGVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10TCA9IHBteDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdEwyID0gTWF0aC5wb3cocG14LCAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdFQgPSBwbXk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXRUMiA9IE1hdGgucG93KGVsbXRULCAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdFIgPSB3aW5kb3cuaW5uZXJXaWR0aCAtIHBteDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdFIyID0gTWF0aC5wb3coZWxtdFIsIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10QiA9IHdpbmRvdy5pbm5lckhlaWdodCAtIHBteTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdEIyID0gTWF0aC5wb3coZWxtdEIsIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxlZnR0b3BWZWN0b3JEcmFnID0gTWF0aC5zcXJ0KGVsbXRMMiArIGVsbXRUMiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdGJvdHRvbVZlY3RvckRyYWcgPSBNYXRoLnNxcnQoZWxtdEwyICsgZWxtdEIyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodHRvcFZlY3RvckRyYWcgPSBNYXRoLnNxcnQoZWxtdFIyICsgZWxtdFQyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodGJvdHRvbVZlY3RvckRyYWcgPSBNYXRoLnNxcnQoZWxtdFIyICsgZWxtdEIyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsRGVsdGFEcmFnID0gTWF0aC5hYnMoZWxtdEwgLSBlbG10UikgLyAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsRGVsdGFEcmFnID0gTWF0aC5hYnMoZWxtdFQgLSBlbG10QikgLyAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRWZWN0b3JEcmFnID0gTWF0aC5zcXJ0KGVsbXRMMiArIE1hdGgucG93KHZlcnRpY2FsRGVsdGFEcmFnLCAyKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wVmVjdG9yRHJhZyA9IE1hdGguc3FydChlbG10VDIgKyBNYXRoLnBvdyhob3Jpem9udGFsRGVsdGFEcmFnLCAyKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRWZWN0b3JEcmFnID0gTWF0aC5zcXJ0KGVsbXRSMiArIE1hdGgucG93KHZlcnRpY2FsRGVsdGFEcmFnLCAyKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tVmVjdG9yRHJhZyA9IE1hdGguc3FydChlbG10QjIgKyBNYXRoLnBvdyhob3Jpem9udGFsRGVsdGFEcmFnLCAyKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByZXZlbnQgc2VsY3Rpb25zIHdoaWxlIGRyYWdpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHJpZ2dlciBkcmFnIHBlcm1hbmVudGx5IHdoaWxlIGRyYWdpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZHJhZyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1vdmUgZWxtdFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRzLmF4aXMgfHwgb3B0cy5heGlzID09PSAneCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLmxlZnQgPSBzdGFydExlZnQgKyAocG14IC0gcHN4KSArIHN0YXJ0TGVmdENvcnJlY3Rpb24gKyAncHgnOyAvLyBzZXQgbmV3IGNzcyBsZWZ0IG9mIGVsbXQgZGVwZW5kaW5nIG9uIG9wdHMuYXhpc1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRzLmF4aXMgfHwgb3B0cy5heGlzID09PSAneScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLnRvcCA9IHN0YXJ0VG9wICsgKHBteSAtIHBzeSkgKyAncHgnOyAvLyBzZXQgbmV3IGNzcyB0b3Agb2YgZWxtdCBkZXBlbmRpbmcgb24gb3B0cy5heGlzXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFwcGx5IGdyaWQgb3B0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5ncmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN4ID0gcGFyc2VGbG9hdChkcmFnU3R5bGVzLmxlZnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjeSA9IHBhcnNlRmxvYXQoZHJhZ1N0eWxlcy50b3ApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RYID0gY3ggJSBvcHRzLmdyaWRbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZFkgPSBjeSAlIG9wdHMuZ3JpZFsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9kWCA8IG9wdHMuZ3JpZFswXSAvIDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zdHlsZS5sZWZ0ID0gY3ggLSBtb2RYICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLmxlZnQgPSBjeCArIChvcHRzLmdyaWRbMF0gLSBtb2RYKSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb2RZIDwgb3B0cy5ncmlkWzFdIC8gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLnRvcCA9IGN5IC0gbW9kWSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zdHlsZS50b3AgPSBjeSArIChvcHRzLmdyaWRbMV0gLSBtb2RZKSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhcHBseSBjb250YWlubWVudCBvcHRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmNvbnRhaW5tZW50IHx8IG9wdHMuY29udGFpbm1lbnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF4TGVmdCA9IHZvaWQgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4VG9wID0gdm9pZCAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FsYyBtYXhMZWZ0IGFuZCBtYXhUb3AgKG1pbkxlZnQgYW5kIE1pblRvcCBpcyBlcXVhbCB0byBjb250YWlubWVudCBzZXR0aW5nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbG10Lm9wdGlvbnMuY29udGFpbmVyID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heExlZnQgPSB3aW5kb3cuaW5uZXJXaWR0aCAtIHBhcnNlRmxvYXQoZHJhZ1N0eWxlcy53aWR0aCkgLSBjb250YWlubWVudFsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4VG9wID0gd2luZG93LmlubmVySGVpZ2h0IC0gcGFyc2VGbG9hdChkcmFnU3R5bGVzLmhlaWdodCkgLSBjb250YWlubWVudFsyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgeENvcnIgPSBwYXJzZUZsb2F0KHBhcmVudFN0eWxlcy5ib3JkZXJMZWZ0V2lkdGgpICsgcGFyc2VGbG9hdChwYXJlbnRTdHlsZXMuYm9yZGVyUmlnaHRXaWR0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB5Q29yciA9IHBhcnNlRmxvYXQocGFyZW50U3R5bGVzLmJvcmRlclRvcFdpZHRoKSArIHBhcnNlRmxvYXQocGFyZW50U3R5bGVzLmJvcmRlckJvdHRvbVdpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4TGVmdCA9IHBhcmVudFJlY3Qud2lkdGggLSBwYXJzZUZsb2F0KGRyYWdTdHlsZXMud2lkdGgpIC0gY29udGFpbm1lbnRbMV0gLSB4Q29ycjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4VG9wID0gcGFyZW50UmVjdC5oZWlnaHQgLSBwYXJzZUZsb2F0KGRyYWdTdHlsZXMuaGVpZ2h0KSAtIGNvbnRhaW5tZW50WzJdIC0geUNvcnI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlRmxvYXQoZWxtdC5zdHlsZS5sZWZ0KSA8PSBjb250YWlubWVudFszXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLmxlZnQgPSBjb250YWlubWVudFszXSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUZsb2F0KGVsbXQuc3R5bGUudG9wKSA8PSBjb250YWlubWVudFswXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLnRvcCA9IGNvbnRhaW5tZW50WzBdICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlRmxvYXQoZWxtdC5zdHlsZS5sZWZ0KSA+PSBtYXhMZWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc3R5bGUubGVmdCA9IG1heExlZnQgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VGbG9hdChlbG10LnN0eWxlLnRvcCkgPj0gbWF4VG9wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc3R5bGUudG9wID0gbWF4VG9wICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrIHdoaWxlIGRyYWdnaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdHMuZHJhZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuZHJhZy5jYWxsKGVsbXQsIGVsbXQsIHsgbGVmdDogZWxtdEwsIHRvcDogZWxtdFQsIHJpZ2h0OiBlbG10UiwgYm90dG9tOiBlbG10QiB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXBwbHkgc25hcCBvcHRpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5zbmFwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNuYXBTZW5zID0gb3B0cy5zbmFwLnNlbnNpdGl2aXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3BTZW5zQXJlYUxlbmd0aCA9IHBhcmVudCA9PT0gZG9jdW1lbnQuYm9keSA/IHdpbmRvdy5pbm5lcldpZHRoIC8gOCA6IHBhcmVudFJlY3Qud2lkdGggLyA4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWRlU2Vuc0FyZWFMZW5ndGggPSBwYXJlbnQgPT09IGRvY3VtZW50LmJvZHkgPyB3aW5kb3cuaW5uZXJIZWlnaHQgLyA4IDogcGFyZW50UmVjdC5oZWlnaHQgLyA4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc25hcHBhYmxlVG8gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc1BhbmVsLnJlbW92ZVNuYXBBcmVhcyhlbG10KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZWZ0dG9wVmVjdG9yRHJhZyA8IHNuYXBTZW5zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc25hcHBhYmxlVG8gPSAnbGVmdC10b3AnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5zbmFwLnNuYXBMZWZ0VG9wICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganNQYW5lbC5jcmVhdGVTbmFwQXJlYShlbG10LCAnbHQnLCBzbmFwU2Vucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxlZnRib3R0b21WZWN0b3JEcmFnIDwgc25hcFNlbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zbmFwcGFibGVUbyA9ICdsZWZ0LWJvdHRvbSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNuYXAuc25hcExlZnRCb3R0b20gIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc1BhbmVsLmNyZWF0ZVNuYXBBcmVhKGVsbXQsICdsYicsIHNuYXBTZW5zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmlnaHR0b3BWZWN0b3JEcmFnIDwgc25hcFNlbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zbmFwcGFibGVUbyA9ICdyaWdodC10b3AnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5zbmFwLnNuYXBSaWdodFRvcCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzUGFuZWwuY3JlYXRlU25hcEFyZWEoZWxtdCwgJ3J0Jywgc25hcFNlbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyaWdodGJvdHRvbVZlY3RvckRyYWcgPCBzbmFwU2Vucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnNuYXBwYWJsZVRvID0gJ3JpZ2h0LWJvdHRvbSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNuYXAuc25hcFJpZ2h0Qm90dG9tICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganNQYW5lbC5jcmVhdGVTbmFwQXJlYShlbG10LCAncmInLCBzbmFwU2Vucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVsbXRUIDwgc25hcFNlbnMgJiYgdG9wVmVjdG9yRHJhZyA8IHRvcFNlbnNBcmVhTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc25hcHBhYmxlVG8gPSAnY2VudGVyLXRvcCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNuYXAuc25hcENlbnRlclRvcCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzUGFuZWwuY3JlYXRlU25hcEFyZWEoZWxtdCwgJ2N0Jywgc25hcFNlbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlbG10TCA8IHNuYXBTZW5zICYmIGxlZnRWZWN0b3JEcmFnIDwgc2lkZVNlbnNBcmVhTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc25hcHBhYmxlVG8gPSAnbGVmdC1jZW50ZXInO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5zbmFwLnNuYXBMZWZ0Q2VudGVyICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganNQYW5lbC5jcmVhdGVTbmFwQXJlYShlbG10LCAnbGMnLCBzbmFwU2Vucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVsbXRSIDwgc25hcFNlbnMgJiYgcmlnaHRWZWN0b3JEcmFnIDwgc2lkZVNlbnNBcmVhTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc25hcHBhYmxlVG8gPSAncmlnaHQtY2VudGVyJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuc25hcC5zbmFwUmlnaHRDZW50ZXIgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc1BhbmVsLmNyZWF0ZVNuYXBBcmVhKGVsbXQsICdyYycsIHNuYXBTZW5zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxtdEIgPCBzbmFwU2VucyAmJiBib3R0b21WZWN0b3JEcmFnIDwgdG9wU2Vuc0FyZWFMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zbmFwcGFibGVUbyA9ICdjZW50ZXItYm90dG9tJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuc25hcC5zbmFwQ2VudGVyQm90dG9tICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganNQYW5lbC5jcmVhdGVTbmFwQXJlYShlbG10LCAnY2InLCBzbmFwU2Vucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAganNQYW5lbC5wb2ludGVybW92ZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGl0ZW0sIGRyYWdFbG10KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAganNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoaXRlbSwgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGpzUGFuZWwucG9pbnRlcm1vdmUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihpdGVtLCBkcmFnRWxtdCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaW5oZXJpdCc7XG4gICAgICAgICAgICAgICAgICAgIGpzUGFuZWwucmVtb3ZlU25hcEFyZWFzKGVsbXQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChkcmFnc3RhcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChkcmFnc3RvcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ3N0YXJ0ZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbG10LnNhdmVDdXJyZW50UG9zaXRpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuc25hcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbG10LnNuYXBwYWJsZVRvID09PSAnbGVmdC10b3AnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzUGFuZWwuc25hcFBhbmVsKGVsbXQsIG9wdHMuc25hcC5zbmFwTGVmdFRvcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlbG10LnNuYXBwYWJsZVRvID09PSAnY2VudGVyLXRvcCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganNQYW5lbC5zbmFwUGFuZWwoZWxtdCwgb3B0cy5zbmFwLnNuYXBDZW50ZXJUb3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxtdC5zbmFwcGFibGVUbyA9PT0gJ3JpZ2h0LXRvcCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganNQYW5lbC5zbmFwUGFuZWwoZWxtdCwgb3B0cy5zbmFwLnNuYXBSaWdodFRvcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlbG10LnNuYXBwYWJsZVRvID09PSAncmlnaHQtY2VudGVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc1BhbmVsLnNuYXBQYW5lbChlbG10LCBvcHRzLnNuYXAuc25hcFJpZ2h0Q2VudGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVsbXQuc25hcHBhYmxlVG8gPT09ICdyaWdodC1ib3R0b20nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzUGFuZWwuc25hcFBhbmVsKGVsbXQsIG9wdHMuc25hcC5zbmFwUmlnaHRCb3R0b20pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxtdC5zbmFwcGFibGVUbyA9PT0gJ2NlbnRlci1ib3R0b20nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzUGFuZWwuc25hcFBhbmVsKGVsbXQsIG9wdHMuc25hcC5zbmFwQ2VudGVyQm90dG9tKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVsbXQuc25hcHBhYmxlVG8gPT09ICdsZWZ0LWJvdHRvbScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganNQYW5lbC5zbmFwUGFuZWwoZWxtdCwgb3B0cy5zbmFwLnNuYXBMZWZ0Qm90dG9tKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVsbXQuc25hcHBhYmxlVG8gPT09ICdsZWZ0LWNlbnRlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganNQYW5lbC5zbmFwUGFuZWwoZWxtdCwgb3B0cy5zbmFwLnNuYXBMZWZ0Q2VudGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5zbmFwLmNhbGxiYWNrICYmIGVsbXQuc25hcHBhYmxlVG8gJiYgdHlwZW9mIG9wdHMuc25hcC5jYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLnNuYXAuY2FsbGJhY2suY2FsbChlbG10LCBlbG10KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxtdC5zbmFwcGFibGVUbyAmJiBvcHRzLnNuYXAucmVwb3NpdGlvbk9uU25hcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnJlcG9zaXRpb25PblNuYXAoZWxtdC5zbmFwcGFibGVUbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdHMuc3RvcCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuc3RvcC5jYWxsKGVsbXQsIGVsbXQsIHsgbGVmdDogcGFyc2VGbG9hdChlbG10LnN0eWxlLmxlZnQpLCB0b3A6IHBhcnNlRmxvYXQoZWxtdC5zdHlsZS50b3ApIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZWxtdC5jb250cm9sYmFyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnaW5oZXJpdCc7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmcmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUucG9pbnRlckV2ZW50cyA9ICdpbmhlcml0JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gZHJhZ2l0IGlzIGluaXRpYWxpemVkIC0gbm93IGRpc2FibGUgaWYgc2V0XG4gICAgICAgICAgICBpZiAob3B0cy5kaXNhYmxlKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBlbG10O1xuICAgIH0sXG4gICAgZW1wdHlOb2RlOiBmdW5jdGlvbiBlbXB0eU5vZGUobm9kZSkge1xuICAgICAgICB3aGlsZSAobm9kZS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfSxcbiAgICBleHRlbmQ6IGZ1bmN0aW9uIGV4dGVuZChvYmopIHtcbiAgICAgICAgLy8gb2JqIG5lZWRzIHRvIGJlIGEgcGxhaW4gb2JqZWN0XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGV4dCBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGV4dCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leHRlbnNpb25zW2V4dF0gPSBvYmpbZXh0XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGZldGNoOiBmdW5jdGlvbiAoX2ZldGNoKSB7XG4gICAgICAgIGZ1bmN0aW9uIGZldGNoKF94Mykge1xuICAgICAgICAgICAgcmV0dXJuIF9mZXRjaC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgZmV0Y2gudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX2ZldGNoLnRvU3RyaW5nKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGZldGNoO1xuICAgIH0oZnVuY3Rpb24gKG9iaikge1xuICAgICAgICB2YXIgY29uZiA9IG9iai5vcHRpb25zLmNvbnRlbnRGZXRjaDtcbiAgICAgICAgdmFyIGNvbmZEZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIGJvZHlNZXRob2Q6ICd0ZXh0JyxcbiAgICAgICAgICAgIGV2YWxzY3JpcHR0YWdzOiB0cnVlLFxuICAgICAgICAgICAgYXV0b3Jlc2l6ZTogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9yZXBvc2l0aW9uOiB0cnVlLFxuICAgICAgICAgICAgZG9uZTogZnVuY3Rpb24gZG9uZShvYmosIHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgb2JqLmNvbnRlbnQuaW5uZXJIVE1MID0gcmVzcG9uc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25mID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29uZiA9IE9iamVjdC5hc3NpZ24oeyByZXNvdXJjZTogb2JqLm9wdGlvbnMuY29udGVudEZldGNoIH0sIGNvbmZEZWZhdWx0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25mID0gT2JqZWN0LmFzc2lnbihjb25mRGVmYXVsdHMsIGNvbmYpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBmZXRjaEluaXQgPSBjb25mLmZldGNoSW5pdCB8fCB7fTtcblxuICAgICAgICBpZiAoY29uZi5iZWZvcmVTZW5kKSB7XG4gICAgICAgICAgICBjb25mLmJlZm9yZVNlbmQuY2FsbChvYmosIG9iaik7XG4gICAgICAgIH1cblxuICAgICAgICBmZXRjaChjb25mLnJlc291cmNlLCBmZXRjaEluaXQpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZVtjb25mLmJvZHlNZXRob2RdKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgcmVzcG9uc2Ugd2FzIG5vdCBvay4nKTtcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuICAgICAgICAgICAgY29uZi5kb25lLmNhbGwob2JqLCBvYmosIHJlc3BvbnNlKTtcblxuICAgICAgICAgICAgLy8gZXh0cmFjdCBhbmQgZXZhbCBjb250ZW50IG9mIHNjcmlwdCB0YWdzIGlmIFwiZXZhbHNjcmlwdHRhZ3NcIlxuICAgICAgICAgICAgaWYgKGNvbmYuZXZhbHNjcmlwdHRhZ3MpIHtcbiAgICAgICAgICAgICAgICAvLyBnZXQgYWxsIHNjcmlwdCB0YWdzIHdpdGhpbiByZXNwb25zZVRleHRcbiAgICAgICAgICAgICAgICB2YXIgc2NyaXB0dGFncyA9IHJlc3BvbnNlLm1hdGNoKC88c2NyaXB0XFxiW14+XSo+KFtcXHNcXFNdKj8pPFxcL3NjcmlwdD4vZ2kpO1xuICAgICAgICAgICAgICAgIGlmIChzY3JpcHR0YWdzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcmlwdHRhZ3MuZm9yRWFjaChmdW5jdGlvbiAodGFnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGFncyBmcm9tIHN0cmluZyBhbmQgdHJpbSBpdFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGpzID0gdGFnLnJlcGxhY2UoLzxzY3JpcHRcXGJbXj5dKj4vaSwgJycpLnJlcGxhY2UoLzxcXC9zY3JpcHQ+L2ksICcnKS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBleGVjdXRlIGphdmFzY3JpcHRcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2YWwoanMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHJlc2l6ZSBhbmQgcmVwb3NpdGlvbiBwYW5lbCBpZiBlaXRoZXIgd2lkdGggb3IgaGVpZ2h0IGlzIHNldCB0byAnYXV0bydcbiAgICAgICAgICAgIHZhciBvQ29udGVudFNpemUgPSBvYmoub3B0aW9ucy5jb250ZW50U2l6ZTtcbiAgICAgICAgICAgIGlmIChjb25mLmF1dG9yZXNpemUgfHwgY29uZi5hdXRvcmVwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb0NvbnRlbnRTaXplID09PSAnc3RyaW5nJyAmJiBvQ29udGVudFNpemUubWF0Y2goL2F1dG8vaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnRzID0gb0NvbnRlbnRTaXplLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzaXplcyA9IE9iamVjdC5hc3NpZ24oe30sIHsgd2lkdGg6IHBhcnRzWzBdLCBoZWlnaHQ6IHBhcnRzWzFdIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZi5hdXRvcmVzaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoucmVzaXplKHNpemVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9iai5jbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwtY29udGV4dG1lbnUnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmYuYXV0b3JlcG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoucmVwb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgodHlwZW9mIG9Db250ZW50U2l6ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yob0NvbnRlbnRTaXplKSkgPT09ICdvYmplY3QnICYmIChvQ29udGVudFNpemUud2lkdGggPT09ICdhdXRvJyB8fCBvQ29udGVudFNpemUuaGVpZ2h0ID09PSAnYXV0bycpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfc2l6ZXMyID0gT2JqZWN0LmFzc2lnbih7fSwgb0NvbnRlbnRTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmYuYXV0b3Jlc2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnJlc2l6ZShfc2l6ZXMyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9iai5jbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwtY29udGV4dG1lbnUnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmYuYXV0b3JlcG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoucmVwb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RoZXJlIGhhcyBiZWVuIGEgcHJvYmxlbSB3aXRoIHlvdXIgZmV0Y2ggb3BlcmF0aW9uOiAnICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH0pO1xuICAgIH0pLFxuICAgIGZyb250OiBmdW5jdGlvbiBmcm9udChvYmopIHtcbiAgICAgICAgaWYgKG9iai5zdGF0dXMgPT09ICdtaW5pbWl6ZWQnKSB7XG4gICAgICAgICAgICBpZiAob2JqLnN0YXR1c0JlZm9yZSA9PT0gJ21heGltaXplZCcpIHtcbiAgICAgICAgICAgICAgICBvYmoubWF4aW1pemUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqLm5vcm1hbGl6ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIG5ld0FyciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qc1BhbmVsLXN0YW5kYXJkJykpLm1hcChmdW5jdGlvbiAocGFuZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFuZWwuc3R5bGUuekluZGV4O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoTWF0aC5tYXguYXBwbHkoTWF0aCwgX3RvQ29uc3VtYWJsZUFycmF5KG5ld0FycikpID4gb2JqLnN0eWxlLnpJbmRleCkge1xuICAgICAgICAgICAgICAgIG9iai5zdHlsZS56SW5kZXggPSBqc1BhbmVsLnppLm5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVzZXRaaSgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRQYW5lbHM6IGZ1bmN0aW9uIGdldFBhbmVscygpIHtcbiAgICAgICAgdmFyIGNvbmRpdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdqc1BhbmVsLXN0YW5kYXJkJyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qc1BhbmVsJykpLmZpbHRlcihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25kaXRpb24uY2FsbCh2YWx1ZSwgdmFsdWUpO1xuICAgICAgICB9KS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYi5zdHlsZS56SW5kZXggLSBhLnN0eWxlLnpJbmRleDtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBoc2xUb1JnYjogZnVuY3Rpb24gaHNsVG9SZ2IoaCwgcywgbCkge1xuICAgICAgICAvLyBoLCBzIGFuZCBsIG11c3QgYmUgdmFsdWVzIGJldHdlZW4gMCBhbmQgMVxuICAgICAgICB2YXIgciA9IHZvaWQgMCxcbiAgICAgICAgICAgIGcgPSB2b2lkIDAsXG4gICAgICAgICAgICBiID0gdm9pZCAwO1xuICAgICAgICBpZiAocyA9PT0gMCkge1xuICAgICAgICAgICAgciA9IGcgPSBiID0gbDsgLy8gYWNocm9tYXRpY1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGh1ZTJyZ2IgPSBmdW5jdGlvbiBodWUycmdiKHAsIHEsIHQpIHtcbiAgICAgICAgICAgICAgICBpZiAodCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdCArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdCAtPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodCA8IDEgLyA2KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwICsgKHEgLSBwKSAqIDYgKiB0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodCA8IDEgLyAyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodCA8IDIgLyAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwICsgKHEgLSBwKSAqICgyIC8gMyAtIHQpICogNjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHEgPSBsIDwgMC41ID8gbCAqICgxICsgcykgOiBsICsgcyAtIGwgKiBzLFxuICAgICAgICAgICAgICAgIHAgPSAyICogbCAtIHE7XG4gICAgICAgICAgICByID0gaHVlMnJnYihwLCBxLCBoICsgMSAvIDMpO1xuICAgICAgICAgICAgZyA9IGh1ZTJyZ2IocCwgcSwgaCk7XG4gICAgICAgICAgICBiID0gaHVlMnJnYihwLCBxLCBoIC0gMSAvIDMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbTWF0aC5yb3VuZChyICogMjU1KSwgTWF0aC5yb3VuZChnICogMjU1KSwgTWF0aC5yb3VuZChiICogMjU1KV07XG4gICAgfSxcbiAgICBsaWdodGVuOiBmdW5jdGlvbiBsaWdodGVuKHZhbCwgYW1vdW50KSB7XG4gICAgICAgIC8vIGFtb3VudCBpcyB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDFcbiAgICAgICAgdmFyIGhzbCA9IHRoaXMuY29sb3IodmFsKS5oc2wsXG4gICAgICAgICAgICBsID0gcGFyc2VGbG9hdChoc2wubCksXG4gICAgICAgICAgICBsbmV3ID0gbCArICgxMDAgLSBsKSAqIGFtb3VudCArICclJztcbiAgICAgICAgcmV0dXJuICdoc2woJyArIGhzbC5oICsgJywnICsgaHNsLnMgKyAnLCcgKyBsbmV3ICsgJyknO1xuICAgIH0sXG4gICAgcGVyY2VpdmVkQnJpZ2h0bmVzczogZnVuY3Rpb24gcGVyY2VpdmVkQnJpZ2h0bmVzcyh2YWwpIHtcbiAgICAgICAgdmFyIHJnYiA9IHRoaXMuY29sb3IodmFsKS5yZ2I7XG4gICAgICAgIC8vIHJldHVybiB2YWx1ZSBpcyBpbiB0aGUgcmFuZ2UgMCAtIDEgYW5kIGlucHV0IHJnYiB2YWx1ZXMgbXVzdCBhbHNvIGJlIGluIHRoZSByYW5nZSAwIC0gMVxuICAgICAgICAvLyBhbGdvcml0aG0gZnJvbTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvUmVjLl8yMDIwXG4gICAgICAgIHJldHVybiByZ2IuciAvIDI1NSAqIDAuMjYyNyArIHJnYi5nIC8gMjU1ICogMC42NzgwICsgcmdiLmIgLyAyNTUgKiAwLjA1OTM7XG4gICAgfSxcbiAgICBwT2NvbnRhaW5lcjogZnVuY3Rpb24gcE9jb250YWluZXIoY29udGFpbmVyLCBjYikge1xuICAgICAgICBpZiAoY29udGFpbmVyKSB7XG4gICAgICAgICAgICB2YXIgYm94ID0gdm9pZCAwO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb250YWluZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjb250YWluZXIubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBib3ggPSBjb250YWluZXI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRhaW5lci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBib3ggPSBjb250YWluZXJbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYm94ICYmIGJveC5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBib3g7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZXJyb3IgPSBuZXcganNQYW5lbEVycm9yKCdcXG5OTyBORVcgUEFORUwgQ1JFQVRFRCFcXG5UaGUgY29udGFpbmVyIHRvIGFwcGVuZCB0aGUgcGFuZWwgdG8gZG9lcyBub3QgZXhpc3Qgb3IgYSBjb250YWluZXIgd2FzIG5vdCBzcGVjaWZpZWQhJyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgY2IuY2FsbChlLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgfSxcblxuXG4gICAgLy8gbm9ybWFsaXplcyB2YWx1ZXMgZm9yIG9wdGlvbi5tYXhpbWl6ZWRNYXJnaW4gYW5kIGNvbnRhaW5tZW50IG9mIGRyYWdpdC9yZXNpemVpdFxuICAgIHBPY29udGFpbm1lbnQ6IGZ1bmN0aW9uIHBPY29udGFpbm1lbnQoYXJnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYXJnID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgLy8gYXJnOiAyMCA9PiBhcmc6IFsyMCwgMjAsIDIwLCAyMF1cbiAgICAgICAgICAgIHJldHVybiBbYXJnLCBhcmcsIGFyZywgYXJnXTtcbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcbiAgICAgICAgICAgIGlmIChhcmcubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgLy8gYXJnOiBbMjBdID0+IGFyZzogWzIwLCAyMCwgMjAsIDIwXVxuICAgICAgICAgICAgICAgIHJldHVybiBbYXJnWzBdLCBhcmdbMF0sIGFyZ1swXSwgYXJnWzBdXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJnLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIC8vIGFyZzogWzIwLCA0MF0gPT4gYXJnOiBbMjAsIDQwLCAyMCwgNDBdXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFyZy5jb25jYXQoYXJnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJnLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgICAgIGFyZ1szXSA9IGFyZ1sxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJnOyAvLyBhc3N1bWVkIHRvIGJlIGFycmF5IHdpdGggNCB2YWx1ZXNcbiAgICB9LFxuICAgIHBPc2l6ZTogZnVuY3Rpb24gcE9zaXplKHBhbmVsLCBzaXplKSB7XG4gICAgICAgIHZhciB2YWx1ZXMgPSBzaXplIHx8IHRoaXMuZGVmYXVsdHMuY29udGVudFNpemUsXG4gICAgICAgICAgICBwYXJlbnQgPSBwYW5lbC5wYXJlbnROb2RlO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHZhciBudW1zID0gdmFsdWVzLnRyaW0oKS5zcGxpdCgnICcpO1xuICAgICAgICAgICAgdmFsdWVzID0ge307XG4gICAgICAgICAgICB2YWx1ZXMud2lkdGggPSBudW1zWzBdO1xuICAgICAgICAgICAgbnVtcy5sZW5ndGggPT09IDIgPyB2YWx1ZXMuaGVpZ2h0ID0gbnVtc1sxXSA6IHZhbHVlcy5oZWlnaHQgPSBudW1zWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHZhbHVlcy53aWR0aCAmJiAhdmFsdWVzLmhlaWdodCkge1xuICAgICAgICAgICAgICAgIHZhbHVlcy5oZWlnaHQgPSB2YWx1ZXMud2lkdGg7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlcy5oZWlnaHQgJiYgIXZhbHVlcy53aWR0aCkge1xuICAgICAgICAgICAgICAgIHZhbHVlcy53aWR0aCA9IHZhbHVlcy5oZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoU3RyaW5nKHZhbHVlcy53aWR0aCkubWF0Y2goL15bMC05XSskL2dpKSkge1xuICAgICAgICAgICAgLy8gaWYgbnVtYmVyIG9ubHlcbiAgICAgICAgICAgIHZhbHVlcy53aWR0aCArPSAncHgnO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZXMud2lkdGggPT09ICdzdHJpbmcnICYmIHZhbHVlcy53aWR0aC5lbmRzV2l0aCgnJScpKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50ID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGggKiAocGFyc2VGbG9hdCh2YWx1ZXMud2lkdGgpIC8gMTAwKSArICdweCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBwcnRTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShwYXJlbnQpLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXIgPSBwYXJzZUZsb2F0KHBydFN0eWxlcy5ib3JkZXJMZWZ0V2lkdGgpICsgcGFyc2VGbG9hdChwcnRTdHlsZXMuYm9yZGVyUmlnaHRXaWR0aCk7XG4gICAgICAgICAgICAgICAgdmFsdWVzLndpZHRoID0gKHBhcnNlRmxvYXQocHJ0U3R5bGVzLndpZHRoKSAtIGJvcmRlcikgKiAocGFyc2VGbG9hdCh2YWx1ZXMud2lkdGgpIC8gMTAwKSArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlcy53aWR0aCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdmFsdWVzLndpZHRoID0gdmFsdWVzLndpZHRoKCk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlcy53aWR0aCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXMud2lkdGggKz0gJ3B4JztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlcy53aWR0aCA9PT0gJ3N0cmluZycgJiYgdmFsdWVzLndpZHRoLm1hdGNoKC9eWzAtOV0rJC9naSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXMud2lkdGggKz0gJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChTdHJpbmcodmFsdWVzLmhlaWdodCkubWF0Y2goL15bMC05XSskL2dpKSkge1xuICAgICAgICAgICAgLy8gaWYgbnVtYmVyIG9ubHlcbiAgICAgICAgICAgIHZhbHVlcy5oZWlnaHQgKz0gJ3B4JztcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWVzLmhlaWdodCA9PT0gJ3N0cmluZycgJiYgdmFsdWVzLmhlaWdodC5lbmRzV2l0aCgnJScpKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50ID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAqIChwYXJzZUZsb2F0KHZhbHVlcy5oZWlnaHQpIC8gMTAwKSArICdweCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBfcHJ0U3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUocGFyZW50KSxcbiAgICAgICAgICAgICAgICAgICAgX2JvcmRlciA9IHBhcnNlRmxvYXQoX3BydFN0eWxlcy5ib3JkZXJUb3BXaWR0aCkgKyBwYXJzZUZsb2F0KF9wcnRTdHlsZXMuYm9yZGVyQm90dG9tV2lkdGgpO1xuICAgICAgICAgICAgICAgIHZhbHVlcy5oZWlnaHQgPSAocGFyc2VGbG9hdChfcHJ0U3R5bGVzLmhlaWdodCkgLSBfYm9yZGVyKSAqIChwYXJzZUZsb2F0KHZhbHVlcy5oZWlnaHQpIC8gMTAwKSArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlcy5oZWlnaHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZhbHVlcy5oZWlnaHQgPSB2YWx1ZXMuaGVpZ2h0KCk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlcy5oZWlnaHQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzLmhlaWdodCArPSAncHgnO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWVzLmhlaWdodCA9PT0gJ3N0cmluZycgJiYgdmFsdWVzLmhlaWdodC5tYXRjaCgvXlswLTldKyQvZ2kpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzLmhlaWdodCArPSAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlczsgLy8gcmV0dXJuIHZhbHVlIG11c3QgYmUgb2JqZWN0IHt3aWR0aDogeHh4LCBoZWlnaHQ6IHh4eH1cbiAgICB9LFxuICAgIHBvc2l0aW9uOiBmdW5jdGlvbiBwb3NpdGlvbihlbG10LCBfcG9zaXRpb24pIHtcbiAgICAgICAgdmFyIGVsbXRUb1Bvc2l0aW9uID0gdm9pZCAwLFxuICAgICAgICAgICAgcG9zU2V0dGluZ3MgPSB2b2lkIDAsXG4gICAgICAgICAgICBlbG10VG9Qb3NpdGlvbkFnYWluc3QgPSB2b2lkIDAsXG4gICAgICAgICAgICBjYWxjdWxhdGVkUG9zaXRpb24gPSB7IGxlZnQ6IDAsIHRvcDogMCB9LFxuICAgICAgICAgICAgbXlYY29ycmVjdGlvbiA9IDAsXG4gICAgICAgICAgICBteVljb3JyZWN0aW9uID0gMCxcbiAgICAgICAgICAgIGF0WGNvcnJlY3Rpb24gPSAwLFxuICAgICAgICAgICAgYXRZY29ycmVjdGlvbiA9IDA7XG5cbiAgICAgICAgdmFyIGRlZmF1bHRzID0geyBteTogJ2NlbnRlcicsIGF0OiAnY2VudGVyJywgb2Y6ICd3aW5kb3cnLCBvZmZzZXRYOiAnMHB4Jywgb2Zmc2V0WTogJzBweCcgfSxcbiAgICAgICAgICAgIHdpbmRvd1JlY3QgPSB7XG4gICAgICAgICAgICB3aWR0aDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgICAgfSxcbiAgICAgICAgICAgIHNjcm9sbFggPSBwYWdlWE9mZnNldCxcbiAgICAgICAgICAgIHNjcm9sbFkgPSBwYWdlWU9mZnNldDtcblxuICAgICAgICBpZiAodHlwZW9mIGVsbXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvLyBhcmcgZWxtdCBpcyBhc3N1bWVkIHRvIGJlIGEgc2VsZWN0b3Igc3RyaW5nXG4gICAgICAgICAgICBlbG10VG9Qb3NpdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxtdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBvdGhlcndpc2UgYXJnIGVsbXQgaXMgYXNzdW1lZCB0byBiZSBhIG5vZGUgb2JqZWN0XG4gICAgICAgICAgICBlbG10VG9Qb3NpdGlvbiA9IGVsbXQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkbyBub3QgcG9zaXRpb24gZWxtdCB3aGVuIHBhcmFtZXRlciBwb3NpdGlvbiBpcyBzZXQgdG8gYm9vbGVhbiBmYWxzZVxuICAgICAgICBpZiAoIV9wb3NpdGlvbikge1xuICAgICAgICAgICAgZWxtdFRvUG9zaXRpb24uc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgICAgICByZXR1cm4gZWxtdFRvUG9zaXRpb247XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZWxtdFRvUG9zaXRpb25SZWN0ID0gZWxtdFRvUG9zaXRpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIC8vIGNvbnRhaW5zIHJlYWQtb25seSBsZWZ0LCB0b3AsIHJpZ2h0LCBib3R0b20sIHgsIHksIHdpZHRoLCBoZWlnaHQgZGVzY3JpYmluZyB0aGUgISEgYm9yZGVyLWJveCAhISBpbiBwaXhlbHNcbiAgICAgICAgLy8gUHJvcGVydGllcyBvdGhlciB0aGFuIHdpZHRoIGFuZCBoZWlnaHQgYXJlIHJlbGF0aXZlIHRvIHRoZSB0b3AtbGVmdCBvZiB0aGUgdmlld3BvcnQhIVxuXG4gICAgICAgIC8vIHRyYW5zbGF0ZSBzaG9ydGhhbmQgc3RyaW5nIHRvIG9iamVjdCAtIFwidG9wLWxlZnQgNTAgNTAgZG93blwiXG4gICAgICAgIGlmICh0eXBlb2YgX3Bvc2l0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdmFyIHBvc1ZhbHVlID0gX3Bvc2l0aW9uLm1hdGNoKC9cXGJbYS16XXs0LDZ9LXsxfVthLXpdezMsNn1cXGIvaSksXG4gICAgICAgICAgICAgICAgYXV0b3Bvc1ZhbHVlID0gX3Bvc2l0aW9uLm1hdGNoKC9kb3dufHVwfHJpZ2h0KFteLV18JCl8bGVmdChbXi1dfCQpL2kpLFxuICAgICAgICAgICAgICAgIG9mZnNldFZhbHVlID0gX3Bvc2l0aW9uLm1hdGNoKC9bKy1dP1xcZD9cXC4/XFxkKyhbYS16JV17Miw0fVxcYnwlPykvZ2kpO1xuICAgICAgICAgICAgdmFyIHNldHRpbmdzID0gdm9pZCAwO1xuXG4gICAgICAgICAgICBpZiAocG9zVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncyA9IHsgbXk6IHBvc1ZhbHVlWzBdLnRvTG93ZXJDYXNlKCksIGF0OiBwb3NWYWx1ZVswXS50b0xvd2VyQ2FzZSgpIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzID0geyBteTogJ2NlbnRlcicsIGF0OiAnY2VudGVyJyB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYXV0b3Bvc1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MuYXV0b3Bvc2l0aW9uID0gYXV0b3Bvc1ZhbHVlWzBdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvZmZzZXRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgc3RyaW5ncyB3aXRoIG9ubHkgbnVtYmVycyB0byBhIG51bWJlciB2YWx1ZVxuICAgICAgICAgICAgICAgIG9mZnNldFZhbHVlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLm1hdGNoKC9eWystXT9bMC05XSokLykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldFZhbHVlW2luZGV4XSArPSAncHgnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFZhbHVlW2luZGV4XSA9IG9mZnNldFZhbHVlW2luZGV4XS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgb25lIHBhc3NlZCBvZmZzZXQgaXMgdXNlZCBmb3IgYm90aCBvZmZzZXRYIGFuZCBvZmZzZXRZXG4gICAgICAgICAgICAgICAgaWYgKG9mZnNldFZhbHVlLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5vZmZzZXRYID0gb2Zmc2V0VmFsdWVbMF07XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLm9mZnNldFkgPSBvZmZzZXRWYWx1ZVswXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5vZmZzZXRYID0gb2Zmc2V0VmFsdWVbMF07XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLm9mZnNldFkgPSBvZmZzZXRWYWx1ZVsxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBvc1NldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIHNldHRpbmdzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBvc1NldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIF9wb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcGFyZW50Q29udGFpbmVyID0gZWxtdFRvUG9zaXRpb24ucGFyZW50RWxlbWVudDtcbiAgICAgICAgdmFyIHBhcmVudENvbnRhaW5lclN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHBhcmVudENvbnRhaW5lcik7XG4gICAgICAgIHZhciBwYXJlbnRDb250YWluZXJSZWN0ID0gcGFyZW50Q29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB2YXIgcGFyZW50Q29udGFpbmVyVGFnTmFtZSA9IHBhcmVudENvbnRhaW5lci50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYgKHBvc1NldHRpbmdzLm9mICYmIHBvc1NldHRpbmdzLm9mICE9PSAnd2luZG93Jykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwb3NTZXR0aW5ncy5vZiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAvLyBwb3NTZXR0aW5ncy5vZiBpcyBhc3N1bWVkIHRvIGJlIGEgc2VsZWN0b3Igc3RyaW5nXG4gICAgICAgICAgICAgICAgZWxtdFRvUG9zaXRpb25BZ2FpbnN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3NTZXR0aW5ncy5vZik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG90aGVyd2lzZSBwb3NTZXR0aW5ncy5vZiBpcyBhc3N1bWVkIHRvIGJlIGEgbm9kZSBvYmplY3RcbiAgICAgICAgICAgICAgICBlbG10VG9Qb3NpdGlvbkFnYWluc3QgPSBwb3NTZXR0aW5ncy5vZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNhbGMgbGVmdCBjb3JyZWN0aW9ucyBkdWUgdG8gcGFuZWwgc2l6ZSwgc2hvdWxkIGJlIHRoZSBzYW1lIGZvciBhbGwgc2NlbmFyaW9zXG4gICAgICAgIGlmIChwb3NTZXR0aW5ncy5teS5tYXRjaCgvXmNlbnRlci10b3AkfF5jZW50ZXIkfF5jZW50ZXItYm90dG9tJC9pKSkge1xuICAgICAgICAgICAgbXlYY29ycmVjdGlvbiA9IGVsbXRUb1Bvc2l0aW9uUmVjdC53aWR0aCAvIDI7XG4gICAgICAgIH0gZWxzZSBpZiAocG9zU2V0dGluZ3MubXkubWF0Y2goL3JpZ2h0L2kpKSB7XG4gICAgICAgICAgICBteVhjb3JyZWN0aW9uID0gZWxtdFRvUG9zaXRpb25SZWN0LndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNhbGMgdG9wIGNvcnJlY3Rpb25zIGR1ZSB0byBwYW5lbCBzaXplXG4gICAgICAgIGlmIChwb3NTZXR0aW5ncy5teS5tYXRjaCgvXmxlZnQtY2VudGVyJHxeY2VudGVyJHxecmlnaHQtY2VudGVyJC9pKSkge1xuICAgICAgICAgICAgbXlZY29ycmVjdGlvbiA9IGVsbXRUb1Bvc2l0aW9uUmVjdC5oZWlnaHQgLyAyO1xuICAgICAgICB9IGVsc2UgaWYgKHBvc1NldHRpbmdzLm15Lm1hdGNoKC9ib3R0b20vaSkpIHtcbiAgICAgICAgICAgIG15WWNvcnJlY3Rpb24gPSBlbG10VG9Qb3NpdGlvblJlY3QuaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU0NFTkFSSU8gMSAtIHBhbmVsIGFwcGVuZGVkIHRvIGJvZHkgYW5kIHBvc2l0aW9uZWQgcmVsYXRpdmUgdG8gd2luZG93IC0+IG1ha2UgZml4ZWRcbiAgICAgICAgaWYgKHBhcmVudENvbnRhaW5lclRhZ05hbWUgPT09ICdib2R5JyAmJiBwb3NTZXR0aW5ncy5vZiA9PT0gJ3dpbmRvdycpIHtcbiAgICAgICAgICAgIC8vIGNhbGMgbGVmdCBjb3JyZWN0aW9ucyBkdWUgdG8gd2luZG93IHNpemVcbiAgICAgICAgICAgIGlmIChwb3NTZXR0aW5ncy5hdC5tYXRjaCgvXmNlbnRlci10b3AkfF5jZW50ZXIkfF5jZW50ZXItYm90dG9tJC9pKSkge1xuICAgICAgICAgICAgICAgIGF0WGNvcnJlY3Rpb24gPSB3aW5kb3dSZWN0LndpZHRoIC8gMjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocG9zU2V0dGluZ3MuYXQubWF0Y2goL3JpZ2h0L2kpKSB7XG4gICAgICAgICAgICAgICAgYXRYY29ycmVjdGlvbiA9IHdpbmRvd1JlY3Qud2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjYWxjIHRvcCBjb3JyZWN0aW9ucyBkdWUgdG8gd2luZG93IHNpemVcbiAgICAgICAgICAgIGlmIChwb3NTZXR0aW5ncy5hdC5tYXRjaCgvXmxlZnQtY2VudGVyJHxeY2VudGVyJHxecmlnaHQtY2VudGVyJC9pKSkge1xuICAgICAgICAgICAgICAgIGF0WWNvcnJlY3Rpb24gPSB3aW5kb3dSZWN0LmhlaWdodCAvIDI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBvc1NldHRpbmdzLmF0Lm1hdGNoKC9ib3R0b20vaSkpIHtcbiAgICAgICAgICAgICAgICBhdFljb3JyZWN0aW9uID0gd2luZG93UmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhbGN1bGF0ZWRQb3NpdGlvbi5sZWZ0ID0gYXRYY29ycmVjdGlvbiAtIG15WGNvcnJlY3Rpb24gLSBwYXJzZUZsb2F0KHBhcmVudENvbnRhaW5lclN0eWxlcy5ib3JkZXJMZWZ0V2lkdGgpO1xuICAgICAgICAgICAgY2FsY3VsYXRlZFBvc2l0aW9uLnRvcCA9IGF0WWNvcnJlY3Rpb24gLSBteVljb3JyZWN0aW9uIC0gcGFyc2VGbG9hdChwYXJlbnRDb250YWluZXJTdHlsZXMuYm9yZGVyVG9wV2lkdGgpO1xuXG4gICAgICAgICAgICAvLyBwYW5lbCBhcHBlbmRlZCB0byBib2R5IGFuZCBwb3NpdGlvbmVkIHJlbGF0aXZlIHRvIHdpbmRvdyBpcyBhbHdheXMgZml4ZWRcbiAgICAgICAgICAgIGVsbXRUb1Bvc2l0aW9uLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNDRU5BUklPIDIgLSBwYW5lbCBhcHBlbmRlZCB0byBib2R5IGFuZCBwb3NpdGlvbmVkIHJlbGF0aXZlIHRvIGFub3RoZXIgZWxlbWVudCBpbiBkb2N1bWVudFxuICAgICAgICBlbHNlIGlmIChwYXJlbnRDb250YWluZXJUYWdOYW1lID09PSAnYm9keScgJiYgcG9zU2V0dGluZ3Mub2YgIT09ICd3aW5kb3cnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsbXRUb1Bvc2l0aW9uQWdhaW5zdFJlY3QgPSBlbG10VG9Qb3NpdGlvbkFnYWluc3QuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBjYWxjIGxlZnQgY29ycmVjdGlvbnMgZHVlIHRvIHBvc2l0aW9uIGFuZCBzaXplIG9mIGVsbXRUb1Bvc2l0aW9uQWdhaW5zdFxuICAgICAgICAgICAgICAgIGlmIChwb3NTZXR0aW5ncy5hdC5tYXRjaCgvXmNlbnRlci10b3AkfF5jZW50ZXIkfF5jZW50ZXItYm90dG9tJC9pKSkge1xuICAgICAgICAgICAgICAgICAgICBhdFhjb3JyZWN0aW9uID0gZWxtdFRvUG9zaXRpb25BZ2FpbnN0UmVjdC53aWR0aCAvIDIgKyBlbG10VG9Qb3NpdGlvbkFnYWluc3RSZWN0LmxlZnQgKyBzY3JvbGxYO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9zU2V0dGluZ3MuYXQubWF0Y2goL3JpZ2h0L2kpKSB7XG4gICAgICAgICAgICAgICAgICAgIGF0WGNvcnJlY3Rpb24gPSBlbG10VG9Qb3NpdGlvbkFnYWluc3RSZWN0LndpZHRoICsgZWxtdFRvUG9zaXRpb25BZ2FpbnN0UmVjdC5sZWZ0ICsgc2Nyb2xsWDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhdFhjb3JyZWN0aW9uID0gZWxtdFRvUG9zaXRpb25BZ2FpbnN0UmVjdC5sZWZ0ICsgc2Nyb2xsWDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gY2FsYyB0b3AgY29ycmVjdGlvbnMgZHVlIHRvIHBvc2l0aW9uIGFuZCBzaXplIG9mIGVsbXRUb1Bvc2l0aW9uQWdhaW5zdFxuICAgICAgICAgICAgICAgIGlmIChwb3NTZXR0aW5ncy5hdC5tYXRjaCgvXmxlZnQtY2VudGVyJHxeY2VudGVyJHxecmlnaHQtY2VudGVyJC9pKSkge1xuICAgICAgICAgICAgICAgICAgICBhdFljb3JyZWN0aW9uID0gZWxtdFRvUG9zaXRpb25BZ2FpbnN0UmVjdC5oZWlnaHQgLyAyICsgZWxtdFRvUG9zaXRpb25BZ2FpbnN0UmVjdC50b3AgKyBzY3JvbGxZO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9zU2V0dGluZ3MuYXQubWF0Y2goL2JvdHRvbS9pKSkge1xuICAgICAgICAgICAgICAgICAgICBhdFljb3JyZWN0aW9uID0gZWxtdFRvUG9zaXRpb25BZ2FpbnN0UmVjdC5oZWlnaHQgKyBlbG10VG9Qb3NpdGlvbkFnYWluc3RSZWN0LnRvcCArIHNjcm9sbFk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXRZY29ycmVjdGlvbiA9IGVsbXRUb1Bvc2l0aW9uQWdhaW5zdFJlY3QudG9wICsgc2Nyb2xsWTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjYWxjdWxhdGVkUG9zaXRpb24ubGVmdCA9IGF0WGNvcnJlY3Rpb24gLSBteVhjb3JyZWN0aW9uIC0gcGFyc2VGbG9hdChwYXJlbnRDb250YWluZXJTdHlsZXMuYm9yZGVyTGVmdFdpZHRoKTtcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGVkUG9zaXRpb24udG9wID0gYXRZY29ycmVjdGlvbiAtIG15WWNvcnJlY3Rpb24gLSBwYXJzZUZsb2F0KHBhcmVudENvbnRhaW5lclN0eWxlcy5ib3JkZXJUb3BXaWR0aCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFNDRU5BUklPIDMgLSAvLyBwYW5lbCBhcHBlbmRlZCB0byBvdGhlciBlbGVtZW50IHRoYW4gYm9keSBhbmQgcG9zaXRpb25lZCByZWxhdGl2ZSB0byBpdHMgY29udGFpbmVyXG4gICAgICAgICAgICBlbHNlIGlmIChwYXJlbnRDb250YWluZXJUYWdOYW1lICE9PSAnYm9keScgJiYgKHBvc1NldHRpbmdzLm9mID09PSAnd2luZG93JyB8fCAhcG9zU2V0dGluZ3Mub2YpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbGMgY29ycmVjdGlvbnMgdG8gcG9zaXRpb24gcGFuZWwgcmVsYXRpdmUgdG8gcGFyZW50Q29udGFpbmVyIGNvbnRlbnQtYm94LCBub3QgYm9yZGVyLWJveFxuICAgICAgICAgICAgICAgICAgICB2YXIgcENvbnRhaW5lckxSQm9yZGVyV2lkdGggPSBwYXJzZUZsb2F0KHBhcmVudENvbnRhaW5lclN0eWxlcy5ib3JkZXJMZWZ0V2lkdGgpICsgcGFyc2VGbG9hdChwYXJlbnRDb250YWluZXJTdHlsZXMuYm9yZGVyUmlnaHRXaWR0aCksXG4gICAgICAgICAgICAgICAgICAgICAgICBwQ29udGFpbmVyVEJCb3JkZXJXaWR0aCA9IHBhcnNlRmxvYXQocGFyZW50Q29udGFpbmVyU3R5bGVzLmJvcmRlclRvcFdpZHRoKSArIHBhcnNlRmxvYXQocGFyZW50Q29udGFpbmVyU3R5bGVzLmJvcmRlckJvdHRvbVdpZHRoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjYWxjIGxlZnQgY29ycmVjdGlvbnMgZHVlIHRvIHBhcmVudCBjb250YWluZXIgd2lkdGhcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc1NldHRpbmdzLmF0Lm1hdGNoKC9eY2VudGVyLXRvcCR8XmNlbnRlciR8XmNlbnRlci1ib3R0b20kL2kpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdFhjb3JyZWN0aW9uID0gcGFyZW50Q29udGFpbmVyUmVjdC53aWR0aCAvIDIgLSBwQ29udGFpbmVyTFJCb3JkZXJXaWR0aCAvIDI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9zU2V0dGluZ3MuYXQubWF0Y2goL3JpZ2h0L2kpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdFhjb3JyZWN0aW9uID0gcGFyZW50Q29udGFpbmVyUmVjdC53aWR0aCAtIHBDb250YWluZXJMUkJvcmRlcldpZHRoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbGMgdG9wIGNvcnJlY3Rpb25zIGR1ZSB0byBwYXJlbnQgY29udGFpbmVyIGhlaWdodFxuICAgICAgICAgICAgICAgICAgICBpZiAocG9zU2V0dGluZ3MuYXQubWF0Y2goL15sZWZ0LWNlbnRlciR8XmNlbnRlciR8XnJpZ2h0LWNlbnRlciQvaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0WWNvcnJlY3Rpb24gPSBwYXJlbnRDb250YWluZXJSZWN0LmhlaWdodCAvIDIgLSBwQ29udGFpbmVyVEJCb3JkZXJXaWR0aCAvIDI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9zU2V0dGluZ3MuYXQubWF0Y2goL2JvdHRvbS9pKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXRZY29ycmVjdGlvbiA9IHBhcmVudENvbnRhaW5lclJlY3QuaGVpZ2h0IC0gcENvbnRhaW5lclRCQm9yZGVyV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVkUG9zaXRpb24ubGVmdCA9IGF0WGNvcnJlY3Rpb24gLSBteVhjb3JyZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVkUG9zaXRpb24udG9wID0gYXRZY29ycmVjdGlvbiAtIG15WWNvcnJlY3Rpb247XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gU0NFTkFSSU8gNCAtIHBhbmVsIGFwcGVuZGVkIHRvIG90aGVyIGVsZW1lbnQgdGhhbiBib2R5IGFuZCBwb3NpdGlvbmVkIHJlbGF0aXZlIHRvIGFuIGVsZW1lbnQgd2l0aGluIGl0cyBjb250YWluZXJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwYXJlbnRDb250YWluZXJUYWdOYW1lICE9PSAnYm9keScgJiYgcGFyZW50Q29udGFpbmVyLmNvbnRhaW5zKGVsbXRUb1Bvc2l0aW9uQWdhaW5zdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZWxtdFRvUG9zaXRpb25BZ2FpbnN0UmVjdCA9IGVsbXRUb1Bvc2l0aW9uQWdhaW5zdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FsYyBsZWZ0IGNvcnJlY3Rpb25zIGR1ZSB0byBwb3NpdGlvbiBhbmQgc2l6ZSBvZiBlbG10VG9Qb3NpdGlvbkFnYWluc3RcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb3NTZXR0aW5ncy5hdC5tYXRjaCgvXmNlbnRlci10b3AkfF5jZW50ZXIkfF5jZW50ZXItYm90dG9tJC9pKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0WGNvcnJlY3Rpb24gPSBfZWxtdFRvUG9zaXRpb25BZ2FpbnN0UmVjdC5sZWZ0IC0gcGFyZW50Q29udGFpbmVyUmVjdC5sZWZ0ICsgX2VsbXRUb1Bvc2l0aW9uQWdhaW5zdFJlY3Qud2lkdGggLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb3NTZXR0aW5ncy5hdC5tYXRjaCgvcmlnaHQvaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdFhjb3JyZWN0aW9uID0gX2VsbXRUb1Bvc2l0aW9uQWdhaW5zdFJlY3QubGVmdCAtIHBhcmVudENvbnRhaW5lclJlY3QubGVmdCArIF9lbG10VG9Qb3NpdGlvbkFnYWluc3RSZWN0LndpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdFhjb3JyZWN0aW9uID0gX2VsbXRUb1Bvc2l0aW9uQWdhaW5zdFJlY3QubGVmdCAtIHBhcmVudENvbnRhaW5lclJlY3QubGVmdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbGMgdG9wIGNvcnJlY3Rpb25zIGR1ZSB0byBwb3NpdGlvbiBhbmQgc2l6ZSBvZiBlbG10VG9Qb3NpdGlvbkFnYWluc3RcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb3NTZXR0aW5ncy5hdC5tYXRjaCgvXmxlZnQtY2VudGVyJHxeY2VudGVyJHxecmlnaHQtY2VudGVyJC9pKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0WWNvcnJlY3Rpb24gPSBfZWxtdFRvUG9zaXRpb25BZ2FpbnN0UmVjdC50b3AgLSBwYXJlbnRDb250YWluZXJSZWN0LnRvcCArIF9lbG10VG9Qb3NpdGlvbkFnYWluc3RSZWN0LmhlaWdodCAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvc1NldHRpbmdzLmF0Lm1hdGNoKC9ib3R0b20vaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdFljb3JyZWN0aW9uID0gX2VsbXRUb1Bvc2l0aW9uQWdhaW5zdFJlY3QudG9wIC0gcGFyZW50Q29udGFpbmVyUmVjdC50b3AgKyBfZWxtdFRvUG9zaXRpb25BZ2FpbnN0UmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0WWNvcnJlY3Rpb24gPSBfZWxtdFRvUG9zaXRpb25BZ2FpbnN0UmVjdC50b3AgLSBwYXJlbnRDb250YWluZXJSZWN0LnRvcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlZFBvc2l0aW9uLmxlZnQgPSBhdFhjb3JyZWN0aW9uIC0gbXlYY29ycmVjdGlvbiAtIHBhcnNlRmxvYXQocGFyZW50Q29udGFpbmVyU3R5bGVzLmJvcmRlckxlZnRXaWR0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVkUG9zaXRpb24udG9wID0gYXRZY29ycmVjdGlvbiAtIG15WWNvcnJlY3Rpb24gLSBwYXJzZUZsb2F0KHBhcmVudENvbnRhaW5lclN0eWxlcy5ib3JkZXJUb3BXaWR0aCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAvLyBhdXRvcG9zaXRpb24gcGFuZWxzIG9ubHkgaWYgLi4uXG4gICAgICAgIGlmIChwb3NTZXR0aW5ncy5hdXRvcG9zaXRpb24gJiYgcG9zU2V0dGluZ3MubXkgPT09IHBvc1NldHRpbmdzLmF0ICYmIFsnbGVmdC10b3AnLCAnY2VudGVyLXRvcCcsICdyaWdodC10b3AnLCAnbGVmdC1ib3R0b20nLCAnY2VudGVyLWJvdHRvbScsICdyaWdodC1ib3R0b20nXS5pbmRleE9mKHBvc1NldHRpbmdzLm15KSA+PSAwKSB7XG4gICAgICAgICAgICAvLyBhZGQgY2xhc3Mgd2l0aCBwb3NpdGlvbiBhbmQgYXV0b3Bvc2l0aW9uIGRpcmVjdGlvblxuICAgICAgICAgICAgdmFyIG5ld0NsYXNzID0gcG9zU2V0dGluZ3MubXkgKyAnLScgKyBwb3NTZXR0aW5ncy5hdXRvcG9zaXRpb24udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGVsbXRUb1Bvc2l0aW9uLmNsYXNzTGlzdC5hZGQobmV3Q2xhc3MpO1xuXG4gICAgICAgICAgICAvLyBnZXQgYWxsIHBhbmVscyB3aXRoIHNhbWUgY2xhc3NcbiAgICAgICAgICAgIHZhciBuZXdDbGFzc0FsbCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgbmV3Q2xhc3MpKSxcbiAgICAgICAgICAgICAgICBvd25JbmRleCA9IG5ld0NsYXNzQWxsLmluZGV4T2YoZWxtdFRvUG9zaXRpb24pO1xuXG4gICAgICAgICAgICAvLyBpZiBtb3JlIHRoYW4gMSBwb3NpdGlvbiBuZXcgcGFuZWxcbiAgICAgICAgICAgIGlmIChuZXdDbGFzc0FsbC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBvc1NldHRpbmdzLmF1dG9wb3NpdGlvbiA9PT0gJ2Rvd24nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbGxlY3QgaGVpZ2h0cyBvZiBhbGwgZWxtdHMgdG8gY2FsYyBuZXcgdG9wIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgIG5ld0NsYXNzQWxsLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAwICYmIGluZGV4IDw9IG93bkluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlZFBvc2l0aW9uLnRvcCArPSBuZXdDbGFzc0FsbFstLWluZGV4XS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgKyBqc1BhbmVsLmF1dG9wb3NpdGlvblNwYWNpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9zU2V0dGluZ3MuYXV0b3Bvc2l0aW9uID09PSAndXAnKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0NsYXNzQWxsLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAwICYmIGluZGV4IDw9IG93bkluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlZFBvc2l0aW9uLnRvcCAtPSBuZXdDbGFzc0FsbFstLWluZGV4XS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgKyBqc1BhbmVsLmF1dG9wb3NpdGlvblNwYWNpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9zU2V0dGluZ3MuYXV0b3Bvc2l0aW9uID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbGxlY3Qgd2lkdGhzIG9mIGFsbCBlbG10cyB0byBjYWxjIG5ldyBsZWZ0IHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgIG5ld0NsYXNzQWxsLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAwICYmIGluZGV4IDw9IG93bkluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlZFBvc2l0aW9uLmxlZnQgKz0gbmV3Q2xhc3NBbGxbLS1pbmRleF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggKyBqc1BhbmVsLmF1dG9wb3NpdGlvblNwYWNpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9zU2V0dGluZ3MuYXV0b3Bvc2l0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3Q2xhc3NBbGwuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDAgJiYgaW5kZXggPD0gb3duSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVkUG9zaXRpb24ubGVmdCAtPSBuZXdDbGFzc0FsbFstLWluZGV4XS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCArIGpzUGFuZWwuYXV0b3Bvc2l0aW9uU3BhY2luZztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gYXBwbHkgbWluTGVmdCwgbWluVG9wLCBtYXhMZWZ0IGFuZCBtYXhUb3AgdmFsdWVzIChuZWVkIHRvIGJlIG51bWJlcnMpXG4gICAgICAgIGlmICgocG9zU2V0dGluZ3MubWluTGVmdCB8fCBwb3NTZXR0aW5ncy5taW5MZWZ0ID09PSAwKSAmJiB0eXBlb2YgcG9zU2V0dGluZ3MubWluTGVmdCA9PT0gJ251bWJlcicgJiYgY2FsY3VsYXRlZFBvc2l0aW9uLmxlZnQgPCBwb3NTZXR0aW5ncy5taW5MZWZ0KSB7XG4gICAgICAgICAgICBjYWxjdWxhdGVkUG9zaXRpb24ubGVmdCA9IHBvc1NldHRpbmdzLm1pbkxlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChwb3NTZXR0aW5ncy5tYXhMZWZ0IHx8IHBvc1NldHRpbmdzLm1heExlZnQgPT09IDApICYmIHR5cGVvZiBwb3NTZXR0aW5ncy5tYXhMZWZ0ID09PSAnbnVtYmVyJyAmJiBjYWxjdWxhdGVkUG9zaXRpb24ubGVmdCA+IHBvc1NldHRpbmdzLm1heExlZnQpIHtcbiAgICAgICAgICAgIGNhbGN1bGF0ZWRQb3NpdGlvbi5sZWZ0ID0gcG9zU2V0dGluZ3MubWF4TGVmdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHBvc1NldHRpbmdzLm1pblRvcCB8fCBwb3NTZXR0aW5ncy5taW5Ub3AgPT09IDApICYmIHR5cGVvZiBwb3NTZXR0aW5ncy5taW5Ub3AgPT09ICdudW1iZXInICYmIGNhbGN1bGF0ZWRQb3NpdGlvbi50b3AgPCBwb3NTZXR0aW5ncy5taW5Ub3ApIHtcbiAgICAgICAgICAgIGNhbGN1bGF0ZWRQb3NpdGlvbi50b3AgPSBwb3NTZXR0aW5ncy5taW5Ub3A7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChwb3NTZXR0aW5ncy5tYXhUb3AgfHwgcG9zU2V0dGluZ3MubWF4VG9wID09PSAwKSAmJiB0eXBlb2YgcG9zU2V0dGluZ3MubWF4VG9wID09PSAnbnVtYmVyJyAmJiBjYWxjdWxhdGVkUG9zaXRpb24udG9wID4gcG9zU2V0dGluZ3MubWF4VG9wKSB7XG4gICAgICAgICAgICBjYWxjdWxhdGVkUG9zaXRpb24udG9wID0gcG9zU2V0dGluZ3MubWF4VG9wO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBwb3NTZXR0aW5ncy5tb2RpZnkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhbGN1bGF0ZWRQb3NpdGlvbiA9IHBvc1NldHRpbmdzLm1vZGlmeS5jYWxsKGNhbGN1bGF0ZWRQb3NpdGlvbiwgY2FsY3VsYXRlZFBvc2l0aW9uKTtcbiAgICAgICAgICAgIC8vIGluc2lkZSB0aGUgZnVuY3Rpb24gJ3RoaXMnIHJlZmVycyB0byB0aGUgb2JqZWN0ICduZXdDb29yZHMnXG4gICAgICAgICAgICAvLyBvcHRpb24ubW9kaWZ5IGlzIG9wdGlvbmFsLiBJZiBwcmVzZW50IGhhcyB0byBiZSBhIGZ1bmN0aW9uIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCB0aGUga2V5cyAnbGVmdCcgYW5kICd0b3AnIGFuZCB2YWx1ZXMgaGF2ZSB0byBiZSBudW1iZXJzXG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaW5hbGx5IGFwcGx5IG9mZnNldHMgYW5kIHBvc2l0aW9uIHBhbmVsXG4gICAgICAgIGlmICh0eXBlb2YgcG9zU2V0dGluZ3Mub2Zmc2V0WCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHBvc1NldHRpbmdzLm9mZnNldFggKz0gJ3B4JztcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHBvc1NldHRpbmdzLm9mZnNldFkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBwb3NTZXR0aW5ncy5vZmZzZXRZICs9ICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxtdFRvUG9zaXRpb24uc3R5bGUubGVmdCA9ICdjYWxjKCcgKyBjYWxjdWxhdGVkUG9zaXRpb24ubGVmdCArICdweCArICcgKyBwb3NTZXR0aW5ncy5vZmZzZXRYICsgJyknO1xuICAgICAgICBlbG10VG9Qb3NpdGlvbi5zdHlsZS50b3AgPSAnY2FsYygnICsgY2FsY3VsYXRlZFBvc2l0aW9uLnRvcCArICdweCArICcgKyBwb3NTZXR0aW5ncy5vZmZzZXRZICsgJyknO1xuICAgICAgICBlbG10VG9Qb3NpdGlvbi5zdHlsZS5vcGFjaXR5ID0gMTtcblxuICAgICAgICAvLyBjb252ZXJ0IGNzcyBjYWxjIHZhbHVlcyB0byBwaXhlbCB2YWx1ZXMgLSB0aGlzIGlzIHJlcXVpcmVkIGJ5IGRyYWdpdCBhbmQgcmVzaXplaXRcbiAgICAgICAgZWxtdFRvUG9zaXRpb24uc3R5bGUubGVmdCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsbXRUb1Bvc2l0aW9uKS5sZWZ0O1xuICAgICAgICBlbG10VG9Qb3NpdGlvbi5zdHlsZS50b3AgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbG10VG9Qb3NpdGlvbikudG9wO1xuXG4gICAgICAgIHJldHVybiBlbG10VG9Qb3NpdGlvbjtcbiAgICB9LFxuICAgIHJnYlRvSHNsOiBmdW5jdGlvbiByZ2JUb0hzbChyLCBnLCBiKSB7XG4gICAgICAgIHIgLz0gMjU1LCBnIC89IDI1NSwgYiAvPSAyNTU7XG4gICAgICAgIHZhciBtYXggPSBNYXRoLm1heChyLCBnLCBiKSxcbiAgICAgICAgICAgIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpLFxuICAgICAgICAgICAgaCA9IHZvaWQgMCxcbiAgICAgICAgICAgIHMgPSB2b2lkIDAsXG4gICAgICAgICAgICBsID0gKG1heCArIG1pbikgLyAyO1xuICAgICAgICBpZiAobWF4ID09PSBtaW4pIHtcbiAgICAgICAgICAgIGggPSBzID0gMDsgLy8gYWNocm9tYXRpY1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGQgPSBtYXggLSBtaW47XG4gICAgICAgICAgICBzID0gbCA+IDAuNSA/IGQgLyAoMiAtIG1heCAtIG1pbikgOiBkIC8gKG1heCArIG1pbik7XG5cbiAgICAgICAgICAgIHN3aXRjaCAobWF4KSB7XG4gICAgICAgICAgICAgICAgY2FzZSByOlxuICAgICAgICAgICAgICAgICAgICBoID0gKGcgLSBiKSAvIGQgKyAoZyA8IGIgPyA2IDogMCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZzpcbiAgICAgICAgICAgICAgICAgICAgaCA9IChiIC0gcikgLyBkICsgMjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBiOlxuICAgICAgICAgICAgICAgICAgICBoID0gKHIgLSBnKSAvIGQgKyA0O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGggLz0gNjtcbiAgICAgICAgfVxuICAgICAgICAvL3JldHVybiBbIGgsIHMsIGwgXTtcbiAgICAgICAgaCA9IGggKiAzNjA7XG4gICAgICAgIHMgPSBzICogMTAwICsgJyUnO1xuICAgICAgICBsID0gbCAqIDEwMCArICclJztcbiAgICAgICAgcmV0dXJuIHsgY3NzOiAnaHNsKCcgKyBoICsgJywnICsgcyArICcsJyArIGwgKyAnKScsIGg6IGgsIHM6IHMsIGw6IGwgfTtcbiAgICB9LFxuICAgIHJnYlRvSGV4OiBmdW5jdGlvbiByZ2JUb0hleChyLCBnLCBiKSB7XG4gICAgICAgIHZhciByZWQgPSBOdW1iZXIocikudG9TdHJpbmcoMTYpLFxuICAgICAgICAgICAgZ3JlZW4gPSBOdW1iZXIoZykudG9TdHJpbmcoMTYpLFxuICAgICAgICAgICAgYmx1ZSA9IE51bWJlcihiKS50b1N0cmluZygxNik7XG4gICAgICAgIGlmIChyZWQubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZWQgPSAnMCcgKyByZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdyZWVuLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgZ3JlZW4gPSAnMCcgKyBncmVlbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYmx1ZS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGJsdWUgPSAnMCcgKyBibHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnIycgKyByZWQgKyBncmVlbiArIGJsdWU7XG4gICAgfSxcbiAgICByZW1vdmVTbmFwQXJlYXM6IGZ1bmN0aW9uIHJlbW92ZVNuYXBBcmVhcyhwYW5lbCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanNQYW5lbC1zbmFwLWFyZWEnKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgaWYgKHBhbmVsLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICBwYW5lbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICByZXNldFppOiBmdW5jdGlvbiByZXNldFppKCkge1xuICAgICAgICB0aGlzLnppID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHN0YXJ0VmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IGpzUGFuZWwuemlCYXNlO1xuXG4gICAgICAgICAgICB2YXIgdmFsID0gc3RhcnRWYWx1ZTtcbiAgICAgICAgICAgIHJldHVybiB7IG5leHQ6IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWwrKztcbiAgICAgICAgICAgICAgICB9IH07XG4gICAgICAgIH0oKTtcbiAgICAgICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzUGFuZWwtc3RhbmRhcmQnKSkuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGEuc3R5bGUuekluZGV4IC0gYi5zdHlsZS56SW5kZXg7XG4gICAgICAgIH0pLmZvckVhY2goZnVuY3Rpb24gKHBhbmVsKSB7XG4gICAgICAgICAgICBwYW5lbC5zdHlsZS56SW5kZXggPSBqc1BhbmVsLnppLm5leHQoKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICByZXNpemVpdDogZnVuY3Rpb24gcmVzaXplaXQoZWxtdCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICAgICAgdmFyIG9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRzLnJlc2l6ZWl0LCBvcHRpb25zKSxcbiAgICAgICAgICAgIGVsbXRQYXJlbnQgPSBlbG10LnBhcmVudEVsZW1lbnQsXG4gICAgICAgICAgICBlbG10UGFyZW50VGFnTmFtZSA9IGVsbXRQYXJlbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgbWF4V2lkdGggPSB0eXBlb2Ygb3B0cy5tYXhXaWR0aCA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMubWF4V2lkdGgoKSA6IG9wdHMubWF4V2lkdGggfHwgMTAwMDAsXG4gICAgICAgICAgICBtYXhIZWlnaHQgPSB0eXBlb2Ygb3B0cy5tYXhIZWlnaHQgPT09ICdmdW5jdGlvbicgPyBvcHRzLm1heEhlaWdodCgpIDogb3B0cy5tYXhIZWlnaHQgfHwgMTAwMDAsXG4gICAgICAgICAgICBtaW5XaWR0aCA9IHR5cGVvZiBvcHRzLm1pbldpZHRoID09PSAnZnVuY3Rpb24nID8gb3B0cy5taW5XaWR0aCgpIDogb3B0cy5taW5XaWR0aCxcbiAgICAgICAgICAgIG1pbkhlaWdodCA9IHR5cGVvZiBvcHRzLm1pbkhlaWdodCA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMubWluSGVpZ2h0KCkgOiBvcHRzLm1pbkhlaWdodCxcbiAgICAgICAgICAgIHJlc2l6ZXN0YXJ0ID0gbmV3IEN1c3RvbUV2ZW50KCdyZXNpemVzdGFydCcsIHsgZGV0YWlsOiBlbG10LmlkIH0pLFxuICAgICAgICAgICAgcmVzaXplID0gbmV3IEN1c3RvbUV2ZW50KCdyZXNpemUnLCB7IGRldGFpbDogZWxtdC5pZCB9KSxcbiAgICAgICAgICAgIHJlc2l6ZXN0b3AgPSBuZXcgQ3VzdG9tRXZlbnQoJ3Jlc2l6ZXN0b3AnLCB7IGRldGFpbDogZWxtdC5pZCB9KTtcbiAgICAgICAgdmFyIGNvbnRhaW5tZW50ID0gdm9pZCAwLFxuICAgICAgICAgICAgcmVzaXplUGFuZWwgPSB2b2lkIDAsXG4gICAgICAgICAgICByZXNpemVzdGFydGVkID0gdm9pZCAwLFxuICAgICAgICAgICAgdyA9IHZvaWQgMCxcbiAgICAgICAgICAgIGggPSB2b2lkIDAsXG4gICAgICAgICAgICBmcmFtZXMgPSBbXTtcblxuICAgICAgICAvLyBub3JtYWxpemUgY29udGFpbm1lbnQgY29uZmlnXG4gICAgICAgIGNvbnRhaW5tZW50ID0gdGhpcy5wT2NvbnRhaW5tZW50KG9wdHMuY29udGFpbm1lbnQpO1xuXG4gICAgICAgIG9wdHMuaGFuZGxlcy5zcGxpdCgnLCcpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgICAgICAgICBub2RlLmNsYXNzTmFtZSA9ICdqc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZSBqc1BhbmVsLXJlc2l6ZWl0LScgKyBpdGVtLnRyaW0oKTtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUuekluZGV4ID0gOTA7XG4gICAgICAgICAgICBlbG10LmFwcGVuZChub2RlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZWxtdC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdqc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZScpKS5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGUpIHtcblxuICAgICAgICAgICAganNQYW5lbC5wb2ludGVyZG93bi5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlLmFkZEV2ZW50TGlzdGVuZXIoaXRlbSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJldmVudCB3aW5kb3cgc2Nyb2xsIHdoaWxlIHJlc2l6aW5nIGVsbXRcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGZyYW1lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lmcmFtZScpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZnJhbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWVzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbG10UmVjdCA9IGVsbXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBuZWVkcyB0byBiZSBjYWxjdWxhdGVkIG9uIHBvaW50ZXJkb3duISEgKi9cbiAgICAgICAgICAgICAgICAgICAgZWxtdFBhcmVudFJlY3QgPSBlbG10UGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgLyogbmVlZHMgdG8gYmUgY2FsY3VsYXRlZCBvbiBwb2ludGVyZG93biEhICovXG4gICAgICAgICAgICAgICAgICAgIGVsbXRQYXJlbnRTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbG10UGFyZW50LCBudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsbXRQYXJlbnRCTFcgPSBwYXJzZUludChlbG10UGFyZW50U3R5bGVzLmJvcmRlckxlZnRXaWR0aCwgMTApLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxtdFBhcmVudEJUVyA9IHBhcnNlSW50KGVsbXRQYXJlbnRTdHlsZXMuYm9yZGVyVG9wV2lkdGgsIDEwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsbXRQYXJlbnRQb3NpdGlvbiA9IGVsbXRQYXJlbnRTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgncG9zaXRpb24nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WCA9IGUuY2xpZW50WCB8fCBlLnRvdWNoZXNbMF0uY2xpZW50WCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WSA9IGUuY2xpZW50WSB8fCBlLnRvdWNoZXNbMF0uY2xpZW50WSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0V2lkdGggPSBlbG10UmVjdC53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0SGVpZ2h0ID0gZWxtdFJlY3QuaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXplSGFuZGxlQ2xhc3NMaXN0ID0gZS50YXJnZXQuY2xhc3NMaXN0O1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnRMZWZ0ID0gZWxtdFJlY3QubGVmdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0VG9wID0gZWxtdFJlY3QudG9wLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGhFYXN0ID0gMTAwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aFdlc3QgPSAxMDAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heEhlaWdodFNvdXRoID0gMTAwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHROb3J0aCA9IDEwMDAwO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGltcG9ydGFudCBpZiBjb250ZW50IGNvbnRhaW5zIGFub3RoZXIgZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAgICAgZWxtdC5jb250ZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsbXRQYXJlbnRUYWdOYW1lICE9PSAnYm9keScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0TGVmdCA9IGVsbXRSZWN0LmxlZnQgLSBlbG10UGFyZW50UmVjdC5sZWZ0ICsgZWxtdFBhcmVudC5zY3JvbGxMZWZ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRUb3AgPSBlbG10UmVjdC50b3AgLSBlbG10UGFyZW50UmVjdC50b3AgKyBlbG10UGFyZW50LnNjcm9sbFRvcDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbGMgbWluL21heCBsZWZ0L3RvcCB2YWx1ZXMgaWYgY29udGFpbm1lbnQgaXMgc2V0IC0gY29kZSBmcm9tIGpzRHJhZ2dhYmxlXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbG10UGFyZW50VGFnTmFtZSA9PT0gJ2JvZHknICYmIGNvbnRhaW5tZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aEVhc3QgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggLSBlbG10UmVjdC5sZWZ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF4SGVpZ2h0U291dGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC0gZWxtdFJlY3QudG9wO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGhXZXN0ID0gZWxtdFJlY3Qud2lkdGggKyBlbG10UmVjdC5sZWZ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF4SGVpZ2h0Tm9ydGggPSBlbG10UmVjdC5oZWlnaHQgKyBlbG10UmVjdC50b3A7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBwYW5lbCBpcyBOT1QgaW4gYm9keVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5tZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsbXRQYXJlbnRQb3NpdGlvbiA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGhFYXN0ID0gZWxtdFBhcmVudFJlY3Qud2lkdGggLSBlbG10UmVjdC5sZWZ0ICsgZWxtdFBhcmVudEJMVztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4SGVpZ2h0U291dGggPSBlbG10UGFyZW50UmVjdC5oZWlnaHQgKyBlbG10UGFyZW50UmVjdC50b3AgLSBlbG10UmVjdC50b3AgKyBlbG10UGFyZW50QlRXO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aFdlc3QgPSBlbG10UmVjdC53aWR0aCArIChlbG10UmVjdC5sZWZ0IC0gZWxtdFBhcmVudFJlY3QubGVmdCkgLSBlbG10UGFyZW50QkxXO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHROb3J0aCA9IGVsbXRSZWN0LmhlaWdodCArIChlbG10UmVjdC50b3AgLSBlbG10UGFyZW50UmVjdC50b3ApIC0gZWxtdFBhcmVudEJUVztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aEVhc3QgPSBlbG10UGFyZW50LmNsaWVudFdpZHRoIC0gKGVsbXRSZWN0LmxlZnQgLSBlbG10UGFyZW50UmVjdC5sZWZ0KSArIGVsbXRQYXJlbnRCTFc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heEhlaWdodFNvdXRoID0gZWxtdFBhcmVudC5jbGllbnRIZWlnaHQgLSAoZWxtdFJlY3QudG9wIC0gZWxtdFBhcmVudFJlY3QudG9wKSArIGVsbXRQYXJlbnRCVFc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoV2VzdCA9IGVsbXRSZWN0LndpZHRoICsgKGVsbXRSZWN0LmxlZnQgLSBlbG10UGFyZW50UmVjdC5sZWZ0KSAtIGVsbXRQYXJlbnRCTFc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heEhlaWdodE5vcnRoID0gZWxtdC5jbGllbnRIZWlnaHQgKyAoZWxtdFJlY3QudG9wIC0gZWxtdFBhcmVudFJlY3QudG9wKSAtIGVsbXRQYXJlbnRCVFc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIG9yaWdpbmFsIG9wdHMuY29udGFpbm1lbnQgaXMgYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5tZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aFdlc3QgLT0gY29udGFpbm1lbnRbM107XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHROb3J0aCAtPSBjb250YWlubWVudFswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoRWFzdCAtPSBjb250YWlubWVudFsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heEhlaWdodFNvdXRoIC09IGNvbnRhaW5tZW50WzJdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsY3VsYXRlIGNvcnJlY3Rpb25zIGZvciByb3RhdGVkIHBhbmVsc1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsbXQpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgd0RpZiA9IHBhcnNlRmxvYXQoY29tcHV0ZWRTdHlsZS53aWR0aCkgLSBlbG10UmVjdC53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhEaWYgPSBwYXJzZUZsb2F0KGNvbXB1dGVkU3R5bGUuaGVpZ2h0KSAtIGVsbXRSZWN0LmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHhEaWYgPSBwYXJzZUZsb2F0KGNvbXB1dGVkU3R5bGUubGVmdCkgLSBlbG10UmVjdC5sZWZ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgeURpZiA9IHBhcnNlRmxvYXQoY29tcHV0ZWRTdHlsZS50b3ApIC0gZWxtdFJlY3QudG9wO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxtdFBhcmVudCAhPT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgeERpZiArPSBlbG10UGFyZW50UmVjdC5sZWZ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgeURpZiArPSBlbG10UGFyZW50UmVjdC50b3A7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXNpemVQYW5lbCA9IGZ1bmN0aW9uIHJlc2l6ZVBhbmVsKGV2dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHJpZ2dlciByZXNpemVzdGFydGVkIG9ubHkgb25jZSBwZXIgcmVzaXplXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc2l6ZXN0YXJ0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHJlc2l6ZXN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdHMuc3RhcnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5zdGFydC5jYWxsKGVsbXQsIGVsbXQsIHsgd2lkdGg6IHN0YXJ0V2lkdGgsIGhlaWdodDogc3RhcnRIZWlnaHQgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzUGFuZWwuZnJvbnQoZWxtdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNpemVzdGFydGVkID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRyaWdnZXIgcmVzaXplIHBlcm1hbmVudGx5IHdoaWxlIHJlc2l6aW5nXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHJlc2l6ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNpemVIYW5kbGVDbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwtcmVzaXplaXQtZScpIHx8IHJlc2l6ZUhhbmRsZUNsYXNzTGlzdC5jb250YWlucygnanNQYW5lbC1yZXNpemVpdC1zZScpIHx8IHJlc2l6ZUhhbmRsZUNsYXNzTGlzdC5jb250YWlucygnanNQYW5lbC1yZXNpemVpdC1uZScpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ID0gc3RhcnRXaWR0aCArIChldnQuY2xpZW50WCB8fCBldnQudG91Y2hlc1swXS5jbGllbnRYKSAtIHN0YXJ0WCArIHdEaWY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHcgPj0gbWF4V2lkdGhFYXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcgPSBtYXhXaWR0aEVhc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3ID49IG1heFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcgPSBtYXhXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHcgPD0gbWluV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdyA9IG1pbldpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLndpZHRoID0gdyArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNpemVIYW5kbGVDbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwtcmVzaXplaXQtcycpIHx8IHJlc2l6ZUhhbmRsZUNsYXNzTGlzdC5jb250YWlucygnanNQYW5lbC1yZXNpemVpdC1zZScpIHx8IHJlc2l6ZUhhbmRsZUNsYXNzTGlzdC5jb250YWlucygnanNQYW5lbC1yZXNpemVpdC1zdycpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoID0gc3RhcnRIZWlnaHQgKyAoZXZ0LmNsaWVudFkgfHwgZXZ0LnRvdWNoZXNbMF0uY2xpZW50WSkgLSBzdGFydFkgKyBoRGlmO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoID49IG1heEhlaWdodFNvdXRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGggPSBtYXhIZWlnaHRTb3V0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGggPj0gbWF4SGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGggPSBtYXhIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChoIDw9IG1pbkhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoID0gbWluSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLmhlaWdodCA9IGggKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzaXplSGFuZGxlQ2xhc3NMaXN0LmNvbnRhaW5zKCdqc1BhbmVsLXJlc2l6ZWl0LXcnKSB8fCByZXNpemVIYW5kbGVDbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwtcmVzaXplaXQtbncnKSB8fCByZXNpemVIYW5kbGVDbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwtcmVzaXplaXQtc3cnKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdyA9IHN0YXJ0V2lkdGggKyBzdGFydFggLSAoZXZ0LmNsaWVudFggfHwgZXZ0LnRvdWNoZXNbMF0uY2xpZW50WCkgKyB3RGlmO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3IDw9IG1heFdpZHRoICYmIHcgPj0gbWluV2lkdGggJiYgdyA8PSBtYXhXaWR0aFdlc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zdHlsZS5sZWZ0ID0gc3RhcnRMZWZ0ICsgKGV2dC5jbGllbnRYIHx8IGV2dC50b3VjaGVzWzBdLmNsaWVudFgpIC0gc3RhcnRYICsgeERpZiArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3ID49IG1heFdpZHRoV2VzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ID0gbWF4V2lkdGhXZXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodyA+PSBtYXhXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ID0gbWF4V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh3IDw9IG1pbldpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcgPSBtaW5XaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zdHlsZS53aWR0aCA9IHcgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzaXplSGFuZGxlQ2xhc3NMaXN0LmNvbnRhaW5zKCdqc1BhbmVsLXJlc2l6ZWl0LW4nKSB8fCByZXNpemVIYW5kbGVDbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwtcmVzaXplaXQtbncnKSB8fCByZXNpemVIYW5kbGVDbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwtcmVzaXplaXQtbmUnKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaCA9IHN0YXJ0SGVpZ2h0ICsgc3RhcnRZIC0gKGV2dC5jbGllbnRZIHx8IGV2dC50b3VjaGVzWzBdLmNsaWVudFkpICsgaERpZjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaCA8PSBtYXhIZWlnaHQgJiYgaCA+PSBtaW5IZWlnaHQgJiYgaCA8PSBtYXhIZWlnaHROb3J0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLnRvcCA9IHN0YXJ0VG9wICsgKGV2dC5jbGllbnRZIHx8IGV2dC50b3VjaGVzWzBdLmNsaWVudFkpIC0gc3RhcnRZICsgeURpZiArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoID49IG1heEhlaWdodE5vcnRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGggPSBtYXhIZWlnaHROb3J0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGggPj0gbWF4SGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGggPSBtYXhIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChoIDw9IG1pbkhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoID0gbWluSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLmhlaWdodCA9IGggKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxtdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuY29udGVudFJlc2l6ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldCBjdXJyZW50IHBvc2l0aW9uIGFuZCBzaXplIHZhbHVlcyB3aGlsZSByZXNpemluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsbXQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBwYXJzZUZsb2F0KHN0eWxlcy5sZWZ0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHBhcnNlRmxvYXQoc3R5bGVzLnRvcCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHBhcnNlRmxvYXQoc3R5bGVzLnJpZ2h0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b206IHBhcnNlRmxvYXQoc3R5bGVzLmJvdHRvbSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHBhcnNlRmxvYXQoc3R5bGVzLndpZHRoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHBhcnNlRmxvYXQoc3R5bGVzLmhlaWdodClcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrIHdoaWxlIHJlc2l6aW5nXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdHMucmVzaXplID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5yZXNpemUuY2FsbChlbG10LCBlbG10LCB2YWx1ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIGpzUGFuZWwucG9pbnRlcm1vdmUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihpdGVtLCByZXNpemVQYW5lbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgcmVzaXplIGhhbmRsZXIgd2hlbiBtb3VzZSBsZWF2ZXMgYnJvd3NlciB3aW5kb3cgKG1vdXNlbGVhdmUgZG9lc24ndCB3b3JrKVxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUucmVsYXRlZFRhcmdldCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzUGFuZWwucG9pbnRlcm1vdmUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGl0ZW0sIHJlc2l6ZVBhbmVsLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBqc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGl0ZW0sIGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgICAgICAgICBqc1BhbmVsLnBvaW50ZXJtb3ZlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihpdGVtLCByZXNpemVQYW5lbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdCAmJiBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwtcmVzaXplaXQtaGFuZGxlJykpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgaXNMZWZ0Q2hhbmdlID0gdm9pZCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNUb3BDaGFuZ2UgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjbCA9IGUudGFyZ2V0LmNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsLm1hdGNoKC9qc1BhbmVsLXJlc2l6ZWl0LW53fGpzUGFuZWwtcmVzaXplaXQtd3xqc1BhbmVsLXJlc2l6ZWl0LXN3L2kpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0xlZnRDaGFuZ2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChjbC5tYXRjaCgvanNQYW5lbC1yZXNpemVpdC1ud3xqc1BhbmVsLXJlc2l6ZWl0LW58anNQYW5lbC1yZXNpemVpdC1uZS9pKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNUb3BDaGFuZ2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gc25hcCBwYW5lbCB0byBncmlkIChkb2Vzbid0IHdvcmsgdGhhdCB3ZWxsIGlmIGluc2lkZSBmdW5jdGlvbiByZXNpemVQYW5lbClcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuZ3JpZCAmJiBBcnJheS5pc0FycmF5KG9wdHMuZ3JpZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmdyaWQubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5ncmlkWzFdID0gb3B0cy5ncmlkWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN3ID0gcGFyc2VGbG9hdChlbG10LnN0eWxlLndpZHRoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaCA9IHBhcnNlRmxvYXQoZWxtdC5zdHlsZS5oZWlnaHQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZFcgPSBjdyAlIG9wdHMuZ3JpZFswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RIID0gY2ggJSBvcHRzLmdyaWRbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3ggPSBwYXJzZUZsb2F0KGVsbXQuc3R5bGUubGVmdCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3kgPSBwYXJzZUZsb2F0KGVsbXQuc3R5bGUudG9wKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RYID0gY3ggJSBvcHRzLmdyaWRbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kWSA9IGN5ICUgb3B0cy5ncmlkWzFdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9kVyA8IG9wdHMuZ3JpZFswXSAvIDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLndpZHRoID0gY3cgLSBtb2RXICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zdHlsZS53aWR0aCA9IGN3ICsgKG9wdHMuZ3JpZFswXSAtIG1vZFcpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb2RIIDwgb3B0cy5ncmlkWzFdIC8gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc3R5bGUuaGVpZ2h0ID0gY2ggLSBtb2RIICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zdHlsZS5oZWlnaHQgPSBjaCArIChvcHRzLmdyaWRbMV0gLSBtb2RIKSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0xlZnRDaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9kWCA8IG9wdHMuZ3JpZFswXSAvIDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5zdHlsZS5sZWZ0ID0gY3ggLSBtb2RYICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLmxlZnQgPSBjeCArIChvcHRzLmdyaWRbMF0gLSBtb2RYKSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzVG9wQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vZFkgPCBvcHRzLmdyaWRbMV0gLyAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXQuc3R5bGUudG9wID0gY3kgLSBtb2RZICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG10LnN0eWxlLnRvcCA9IGN5ICsgKG9wdHMuZ3JpZFsxXSAtIG1vZFkpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxtdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxtdC5jb250ZW50UmVzaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzaXplc3RhcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICBlbG10LmNvbnRlbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdpbmhlcml0JztcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChyZXNpemVzdG9wKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplc3RhcnRlZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgZWxtdC5zYXZlQ3VycmVudERpbWVuc2lvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRzLnN0b3AgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuc3RvcC5jYWxsKGVsbXQsIGVsbXQsIHsgd2lkdGg6IHBhcnNlRmxvYXQoZWxtdC5zdHlsZS53aWR0aCksIGhlaWdodDogcGFyc2VGbG9hdChlbG10LnN0eWxlLmhlaWdodCkgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZnJhbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBmcmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2luaGVyaXQnO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHJlc2l6ZWl0IGlzIGluaXRpYWxpemVkIC0gbm93IGRpc2FibGUgaWYgc2V0XG4gICAgICAgIGlmIChvcHRzLmRpc2FibGUpIHtcbiAgICAgICAgICAgIGVsbXQucXVlcnlTZWxlY3RvckFsbCgnLmpzUGFuZWwtcmVzaXplaXQtaGFuZGxlJykuZm9yRWFjaChmdW5jdGlvbiAoaGFuZGxlKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbG10O1xuICAgIH0sXG4gICAgc2V0Q2xhc3M6IGZ1bmN0aW9uIHNldENsYXNzKGVsbXQsIGNsYXNzbmFtZXMpIHtcbiAgICAgICAgY2xhc3NuYW1lcy5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBlbG10LmNsYXNzTGlzdC5hZGQoaXRlbSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZWxtdDtcbiAgICB9LFxuICAgIHJlbUNsYXNzOiBmdW5jdGlvbiByZW1DbGFzcyhlbG10LCBjbGFzc25hbWVzKSB7XG4gICAgICAgIGNsYXNzbmFtZXMuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxtdC5jbGFzc0xpc3QucmVtb3ZlKGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGVsbXQ7XG4gICAgfSxcbiAgICBzZXRTdHlsZTogZnVuY3Rpb24gc2V0U3R5bGUoZWxtdCwgc3R5bGVzb2JqZWN0KSB7XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gc3R5bGVzb2JqZWN0KSB7XG4gICAgICAgICAgICBpZiAoc3R5bGVzb2JqZWN0Lmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByb3BlcnR5ID0gU3RyaW5nKHByb3ApLnJlcGxhY2UoLy1cXHcvZ2ksIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2guc3Vic3RyKC0xKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGVsbXQuc3R5bGVbcHJvcGVydHldID0gc3R5bGVzb2JqZWN0W3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbG10O1xuICAgIH0sXG4gICAgc25hcFBhbmVsOiBmdW5jdGlvbiBzbmFwUGFuZWwocGFuZWwsIHBvcykge1xuICAgICAgICAvLyBzdG9yZSBwYW5lbCBzaXplIGJlZm9yZSBpdCBzbmFwc1xuICAgICAgICBwYW5lbC5jdXJyZW50RGF0YS5iZWZvcmVTbmFwID0ge1xuICAgICAgICAgICAgd2lkdGg6IHBhbmVsLmN1cnJlbnREYXRhLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBwYW5lbC5jdXJyZW50RGF0YS5oZWlnaHRcbiAgICAgICAgfTtcbiAgICAgICAgLy8gc25hcCBwYW5lbFxuICAgICAgICBpZiAocG9zICYmIHR5cGVvZiBwb3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHBvcy5jYWxsKHBhbmVsLCBwYW5lbCwgcGFuZWwuc25hcHBhYmxlVG8pO1xuICAgICAgICB9IGVsc2UgaWYgKHBvcyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHZhciBvZmZzZXRzID0gWzAsIDBdO1xuICAgICAgICAgICAgaWYgKHBhbmVsLm9wdGlvbnMuZHJhZ2l0LnNuYXAuY29udGFpbm1lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAocGFuZWwub3B0aW9ucy5kcmFnaXQuY29udGFpbm1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5tZW50ID0gdGhpcy5wT2NvbnRhaW5tZW50KHBhbmVsLm9wdGlvbnMuZHJhZ2l0LmNvbnRhaW5tZW50KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gcGFuZWwuc25hcHBhYmxlVG87XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbi5zdGFydHNXaXRoKCdsZWZ0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldHNbMF0gPSBjb250YWlubWVudFszXTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb3NpdGlvbi5zdGFydHNXaXRoKCdyaWdodCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXRzWzBdID0gLWNvbnRhaW5tZW50WzFdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbi5lbmRzV2l0aCgndG9wJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldHNbMV0gPSBjb250YWlubWVudFswXTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb3NpdGlvbi5lbmRzV2l0aCgnYm90dG9tJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldHNbMV0gPSAtY29udGFpbm1lbnRbMl07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYW5lbC5yZXBvc2l0aW9uKHBhbmVsLnNuYXBwYWJsZVRvICsgJyAnICsgb2Zmc2V0c1swXSArICcgJyArIG9mZnNldHNbMV0pO1xuICAgICAgICAgICAgcGFuZWwuc25hcHBlZCA9IHBhbmVsLnNuYXBwYWJsZVRvO1xuICAgICAgICB9XG4gICAgfSxcblxuXG4gICAgLy8gTUVUSE9EIENSRUFUSU5HIFRIRSBQQU5FTCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgICAgIHZhciBjYiA9IGFyZ3VtZW50c1sxXTtcblxuXG4gICAgICAgIHZhciBvcHRzID0gdm9pZCAwLFxuICAgICAgICAgICAgY2xvc2V0aW1lciA9IHZvaWQgMDtcbiAgICAgICAgaWYgKG9wdGlvbnMuY29uZmlnKSB7XG4gICAgICAgICAgICBvcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0cywgb3B0aW9ucy5jb25maWcsIG9wdGlvbnMpO1xuICAgICAgICAgICAgZGVsZXRlIG9wdHMuY29uZmlnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghb3B0cy5pZCkge1xuICAgICAgICAgICAgb3B0cy5pZCA9ICdqc1BhbmVsLScgKyAoanNQYW5lbC5pZENvdW50ZXIgKz0gMSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdHMuaWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIG9wdHMuaWQgPSBvcHRzLmlkKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChvcHRzLmlkKTtcbiAgICAgICAgaWYgKHAgIT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIGlmIGEgcGFuZWwgd2l0aCBwYXNzZWQgaWQgYWxyZWFkeSBleGlzdHMsIGZyb250IGl0IGFuZCByZXR1cm4gZXJyb3Igb2JqZWN0XG4gICAgICAgICAgICBpZiAocC5jbGFzc0xpc3QuY29udGFpbnMoJ2pzUGFuZWwnKSkge1xuICAgICAgICAgICAgICAgIHAuZnJvbnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBqc1BhbmVsRXJyb3IoJ1xcbk5PIE5FVyBQQU5FTCBDUkVBVEVEIVxcbkFuIGVsZW1lbnQgd2l0aCB0aGUgSUQgPCcgKyBvcHRzLmlkICsgJz4gYWxyZWFkeSBleGlzdHMgaW4gdGhlIGRvY3VtZW50LicpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgY2IuY2FsbChlLCBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS5lcnJvcihlcnJvci5uYW1lICsgJzonLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIHdoZXRoZXIgY29udGFpbmVyIGlzIHZhbGlkIC0+IGlmIG5vdCByZXR1cm4gYW5kIGxvZyBlcnJvclxuICAgICAgICB2YXIgcGFuZWxDb250YWluZXIgPSB0aGlzLnBPY29udGFpbmVyKG9wdHMuY29udGFpbmVyLCBjYik7XG4gICAgICAgIGlmIChwYW5lbENvbnRhaW5lciAmJiBwYW5lbENvbnRhaW5lci5tZXNzYWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS5lcnJvcihwYW5lbENvbnRhaW5lci5uYW1lICsgJzonLCBwYW5lbENvbnRhaW5lci5tZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vcm1hbGl6ZSBtYXhpbWl6ZWRNYXJnaW5cbiAgICAgICAgb3B0cy5tYXhpbWl6ZWRNYXJnaW4gPSB0aGlzLnBPY29udGFpbm1lbnQob3B0cy5tYXhpbWl6ZWRNYXJnaW4pO1xuXG4gICAgICAgIC8vIG5vcm1hbGl6ZSBzbmFwIGNvbmZpZ1xuICAgICAgICBpZiAob3B0cy5kcmFnaXQgJiYgb3B0cy5kcmFnaXQuc25hcCkge1xuICAgICAgICAgICAgaWYgKF90eXBlb2Yob3B0cy5kcmFnaXQuc25hcCkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5kcmFnaXQuc25hcCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmYXVsdFNuYXBDb25maWcsIG9wdHMuZHJhZ2l0LnNuYXApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvcHRzLmRyYWdpdC5zbmFwID0gdGhpcy5kZWZhdWx0U25hcENvbmZpZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG9wdHMudGVtcGxhdGUgPSBvcHRzLnRlbXBsYXRlIHx8IGZhbHNlO1xuXG4gICAgICAgIHZhciBzZWxmID0gb3B0cy50ZW1wbGF0ZSA/IG9wdHMudGVtcGxhdGUgOiB0aGlzLmNyZWF0ZVBhbmVsVGVtcGxhdGUoKTtcblxuICAgICAgICAvLyBQcm9wZXJ0aWVzXG4gICAgICAgIHNlbGYub3B0aW9ucyA9IG9wdHM7XG4gICAgICAgIHNlbGYuc3RhdHVzID0gJ2luaXRpYWxpemVkJztcbiAgICAgICAgc2VsZi5jdXJyZW50RGF0YSA9IHt9O1xuICAgICAgICBzZWxmLmhlYWRlciA9IHNlbGYucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtaGRyJyk7IC8vIGNvbXBsZXRlIGhlYWRlciBzZWN0aW9uXG4gICAgICAgIHNlbGYuaGVhZGVyYmFyID0gc2VsZi5oZWFkZXIucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtaGVhZGVyYmFyJyk7IC8vIGxvZywgdGl0bGUgYW5kIGNvbnRyb2xzXG4gICAgICAgIHNlbGYudGl0bGViYXIgPSBzZWxmLmhlYWRlci5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC10aXRsZWJhcicpOyAvLyBkaXYgc3Vycm91bmRpbmcgdGl0bGUgaDNcbiAgICAgICAgc2VsZi5oZWFkZXJsb2dvID0gc2VsZi5oZWFkZXJiYXIucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtaGVhZGVybG9nbycpOyAvLyBsb2dvIG9ubHlcbiAgICAgICAgc2VsZi5oZWFkZXJ0aXRsZSA9IHNlbGYuaGVhZGVyYmFyLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLXRpdGxlJyk7IC8vIHRpdGxlIGgzXG4gICAgICAgIHNlbGYuY29udHJvbGJhciA9IHNlbGYuaGVhZGVyYmFyLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWNvbnRyb2xiYXInKTsgLy8gZGl2IHN1cnJvdW5kaW5nIGFsbCBjb250cm9sc1xuICAgICAgICBzZWxmLmhlYWRlcnRvb2xiYXIgPSBzZWxmLmhlYWRlci5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1oZHItdG9vbGJhcicpO1xuICAgICAgICBzZWxmLmNvbnRlbnQgPSBzZWxmLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWNvbnRlbnQnKTtcbiAgICAgICAgc2VsZi5mb290ZXIgPSBzZWxmLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWZ0cicpO1xuICAgICAgICBzZWxmLnNuYXBwYWJsZVRvID0gZmFsc2U7XG4gICAgICAgIHNlbGYuc25hcHBlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIEV2ZW50c1xuICAgICAgICB2YXIganNwYW5lbGxvYWRlZCA9IG5ldyBDdXN0b21FdmVudCgnanNwYW5lbGxvYWRlZCcsIHsgJ2RldGFpbCc6IG9wdHMuaWQgfSksXG4gICAgICAgICAgICBqc3BhbmVsYmVmb3JlY2xvc2UgPSBuZXcgQ3VzdG9tRXZlbnQoJ2pzcGFuZWxiZWZvcmVjbG9zZScsIHsgJ2RldGFpbCc6IG9wdHMuaWQgfSksXG4gICAgICAgICAgICBqc3BhbmVsY2xvc2VkID0gbmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVsY2xvc2VkJywgeyAnZGV0YWlsJzogb3B0cy5pZCB9KSxcbiAgICAgICAgICAgIGpzcGFuZWxzdGF0dXNjaGFuZ2UgPSBuZXcgQ3VzdG9tRXZlbnQoJ2pzcGFuZWxzdGF0dXNjaGFuZ2UnLCB7ICdkZXRhaWwnOiBvcHRzLmlkIH0pLFxuICAgICAgICAgICAganNwYW5lbGJlZm9yZW5vcm1hbGl6ZSA9IG5ldyBDdXN0b21FdmVudCgnanNwYW5lbGJlZm9yZW5vcm1hbGl6ZScsIHsgJ2RldGFpbCc6IG9wdHMuaWQgfSksXG4gICAgICAgICAgICBqc3BhbmVsbm9ybWFsaXplZCA9IG5ldyBDdXN0b21FdmVudCgnanNwYW5lbG5vcm1hbGl6ZWQnLCB7ICdkZXRhaWwnOiBvcHRzLmlkIH0pLFxuICAgICAgICAgICAganNwYW5lbGJlZm9yZW1heGltaXplID0gbmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVsYmVmb3JlbWF4aW1pemUnLCB7ICdkZXRhaWwnOiBvcHRzLmlkIH0pLFxuICAgICAgICAgICAganNwYW5lbG1heGltaXplZCA9IG5ldyBDdXN0b21FdmVudCgnanNwYW5lbG1heGltaXplZCcsIHsgJ2RldGFpbCc6IG9wdHMuaWQgfSksXG4gICAgICAgICAgICBqc3BhbmVsYmVmb3JlbWluaW1pemUgPSBuZXcgQ3VzdG9tRXZlbnQoJ2pzcGFuZWxiZWZvcmVtaW5pbWl6ZScsIHsgJ2RldGFpbCc6IG9wdHMuaWQgfSksXG4gICAgICAgICAgICBqc3BhbmVsbWluaW1pemVkID0gbmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVsbWluaW1pemVkJywgeyAnZGV0YWlsJzogb3B0cy5pZCB9KSxcbiAgICAgICAgICAgIGpzcGFuZWxiZWZvcmVzbWFsbGlmeSA9IG5ldyBDdXN0b21FdmVudCgnanNwYW5lbGJlZm9yZXNtYWxsaWZ5JywgeyAnZGV0YWlsJzogb3B0cy5pZCB9KSxcbiAgICAgICAgICAgIGpzcGFuZWxzbWFsbGlmaWVkID0gbmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVsc21hbGxpZmllZCcsIHsgJ2RldGFpbCc6IG9wdHMuaWQgfSksXG4gICAgICAgICAgICBqc3BhbmVsc21hbGxpZmllZG1heCA9IG5ldyBDdXN0b21FdmVudCgnanNwYW5lbHNtYWxsaWZpZWRtYXgnLCB7ICdkZXRhaWwnOiBvcHRzLmlkIH0pLFxuICAgICAgICAgICAganNwYW5lbGJlZm9yZXVuc21hbGxpZnkgPSBuZXcgQ3VzdG9tRXZlbnQoJ2pzcGFuZWxiZWZvcmV1bnNtYWxsaWZ5JywgeyAnZGV0YWlsJzogb3B0cy5pZCB9KSxcbiAgICAgICAgICAgIGpzcGFuZWxmcm9udGVkID0gbmV3IEN1c3RvbUV2ZW50KCdqc3BhbmVsZnJvbnRlZCcsIHsgJ2RldGFpbCc6IG9wdHMuaWQgfSk7XG5cbiAgICAgICAgLy8gY29udHJvbHMgaGFuZGxlcnNcbiAgICAgICAgdmFyIGhhc0Nsb3NlQnRuID0gc2VsZi5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1idG4tY2xvc2UnKSxcbiAgICAgICAgICAgIGhhc01heEJ0biA9IHNlbGYucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtYnRuLW1heGltaXplJyksXG4gICAgICAgICAgICBoYXNOb3JtQnRuID0gc2VsZi5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1idG4tbm9ybWFsaXplJyksXG4gICAgICAgICAgICBoYXNTbWFsbEJ0biA9IHNlbGYucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtYnRuLXNtYWxsaWZ5JyksXG4gICAgICAgICAgICBoYXNTbWFsbHJldkJ0biA9IHNlbGYucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtYnRuLXNtYWxsaWZ5cmV2JyksXG4gICAgICAgICAgICBoYXNNaW5CdG4gPSBzZWxmLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWJ0bi1taW5pbWl6ZScpO1xuXG4gICAgICAgIGlmIChoYXNDbG9zZUJ0bikge1xuICAgICAgICAgICAganNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGhhc0Nsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoaXRlbSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzTWF4QnRuKSB7XG4gICAgICAgICAgICBqc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgaGFzTWF4QnRuLmFkZEV2ZW50TGlzdGVuZXIoaXRlbSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm1heGltaXplKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzTm9ybUJ0bikge1xuICAgICAgICAgICAganNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGhhc05vcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcihpdGVtLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubm9ybWFsaXplKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzU21hbGxCdG4pIHtcbiAgICAgICAgICAgIGpzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBoYXNTbWFsbEJ0bi5hZGRFdmVudExpc3RlbmVyKGl0ZW0sIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zbWFsbGlmeSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc1NtYWxscmV2QnRuKSB7XG4gICAgICAgICAgICBqc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgaGFzU21hbGxyZXZCdG4uYWRkRXZlbnRMaXN0ZW5lcihpdGVtLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudW5zbWFsbGlmeSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc01pbkJ0bikge1xuICAgICAgICAgICAganNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGhhc01pbkJ0bi5hZGRFdmVudExpc3RlbmVyKGl0ZW0sIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5taW5pbWl6ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpbXBvcnQgZXh0ZW5zaW9uc1xuICAgICAgICB2YXIgZXh0ZW5zaW9ucyA9IGpzUGFuZWwuZXh0ZW5zaW9ucztcbiAgICAgICAgZm9yICh2YXIgZXh0IGluIGV4dGVuc2lvbnMpIHtcbiAgICAgICAgICAgIGlmIChleHRlbnNpb25zLmhhc093blByb3BlcnR5KGV4dCkpIHtcbiAgICAgICAgICAgICAgICBzZWxmW2V4dF0gPSBleHRlbnNpb25zW2V4dF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBNZXRob2RzXG4gICAgICAgIHNlbGYuYWRkVG9vbGJhciA9IGZ1bmN0aW9uIChwbGFjZSwgdGIsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAocGxhY2UgPT09ICdoZWFkZXInKSB7XG4gICAgICAgICAgICAgICAgcGxhY2UgPSBzZWxmLmhlYWRlcnRvb2xiYXI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBsYWNlID09PSAnZm9vdGVyJykge1xuICAgICAgICAgICAgICAgIHBsYWNlID0gc2VsZi5mb290ZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcGxhY2UuaW5uZXJIVE1MID0gdGI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodGIpKSB7XG4gICAgICAgICAgICAgICAgdGIuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZS5pbm5lckhUTUwgKz0gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlLmFwcGVuZChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG9vbCA9IHRiLmNhbGwoc2VsZiwgc2VsZik7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0b29sID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBwbGFjZS5pbm5lckhUTUwgPSB0b29sO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlLmFwcGVuZCh0b29sKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBsYWNlLmFwcGVuZCh0Yik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBsYWNlLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgaWYgKHBsYWNlID09PSBzZWxmLmZvb3Rlcikge1xuICAgICAgICAgICAgICAgIHNlbGYuY29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdqc1BhbmVsLWNvbnRlbnQtbm9mb290ZXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuY29udGVudFJlc2l6ZSgpO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuYXBwbHlCdWlsdEluVGhlbWUgPSBmdW5jdGlvbiAodGhlbWVEZXRhaWxzKSB7XG4gICAgICAgICAgICBzZWxmLmNsYXNzTGlzdC5hZGQoJ2pzUGFuZWwtdGhlbWUtJyArIHRoZW1lRGV0YWlscy5jb2xvcik7IC8vIGRvIG5vdCByZW1vdmUgdGhlbWUgZnJvbSBqc1BcbiAgICAgICAgICAgIHNlbGYuaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2pzUGFuZWwtdGhlbWUtJyArIHRoZW1lRGV0YWlscy5jb2xvcik7XG5cbiAgICAgICAgICAgIC8vIG9wdGlvbmFsbHkgc2V0IHRoZW1lIGZpbGxpbmdcbiAgICAgICAgICAgIGlmICh0aGVtZURldGFpbHMuZmlsbGluZykge1xuICAgICAgICAgICAgICAgIHNlbGYuY29udGVudC5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgICAgICAgICAgICAgc2VsZi5jb250ZW50LmNsYXNzTGlzdC5hZGQoJ2pzUGFuZWwtY29udGVudC0nICsgdGhlbWVEZXRhaWxzLmZpbGxpbmcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIW9wdHMuaGVhZGVyVG9vbGJhcikge1xuICAgICAgICAgICAgICAgIHNlbGYuY29udGVudC5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgICAgICAgICAgICAgc2VsZi5jb250ZW50LnN0eWxlLmJvcmRlclRvcCA9ICcxcHggc29saWQgJyArIHNlbGYuaGVhZGVydGl0bGUuc3R5bGUuY29sb3I7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuYXBwbHlBcmJpdHJhcnlUaGVtZSA9IGZ1bmN0aW9uICh0aGVtZURldGFpbHMpIHtcbiAgICAgICAgICAgIHNlbGYuaGVhZGVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoZW1lRGV0YWlscy5jb2xvcnNbMF07XG4gICAgICAgICAgICBbJy5qc1BhbmVsLWhlYWRlcmxvZ28nLCAnLmpzUGFuZWwtdGl0bGUnLCAnLmpzUGFuZWwtaGRyLXRvb2xiYXInXS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5xdWVyeVNlbGVjdG9yKGl0ZW0pLnN0eWxlLmNvbG9yID0gdGhlbWVEZXRhaWxzLmNvbG9yc1szXTtcbiAgICAgICAgICAgIH0sIHNlbGYpO1xuICAgICAgICAgICAgc2VsZi5xdWVyeVNlbGVjdG9yQWxsKCcuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0biAuanNnbHlwaCcpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLmNvbG9yID0gdGhlbWVEZXRhaWxzLmNvbG9yc1szXTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAob3B0cy5oZWFkZXJUb29sYmFyKSB7XG4gICAgICAgICAgICAgICAganNQYW5lbC5zZXRTdHlsZShzZWxmLmhlYWRlcnRvb2xiYXIsIHtcbiAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiAnMCAwIDFweCAnICsgdGhlbWVEZXRhaWxzLmNvbG9yc1szXSArICcgaW5zZXQnLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogJ2NhbGMoMTAwJSArIDRweCknLFxuICAgICAgICAgICAgICAgICAgICBtYXJnaW5MZWZ0OiAnLTFweCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jb250ZW50LnN0eWxlLmJvcmRlclRvcCA9ICcxcHggc29saWQgJyArIHRoZW1lRGV0YWlscy5jb2xvcnNbM107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGVtZURldGFpbHMuZmlsbGluZyA9PT0gJ2ZpbGxlZCcpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmNvbnRlbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhlbWVEZXRhaWxzLmNvbG9yc1swXTtcbiAgICAgICAgICAgICAgICBzZWxmLmNvbnRlbnQuc3R5bGUuY29sb3IgPSB0aGVtZURldGFpbHMuY29sb3JzWzNdO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGVtZURldGFpbHMuZmlsbGluZyA9PT0gJ2ZpbGxlZGxpZ2h0Jykge1xuICAgICAgICAgICAgICAgIHNlbGYuY29udGVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGVtZURldGFpbHMuY29sb3JzWzFdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLmFwcGx5Qm9vdHN0cmFwVGhlbWUgPSBmdW5jdGlvbiAodGhlbWVEZXRhaWxzKSB7XG4gICAgICAgICAgICB2YXIgYnNUaGVtZSA9IHRoZW1lRGV0YWlscy5ic3RoZW1lLFxuICAgICAgICAgICAgICAgIGJzVmVyc2lvbiA9ICQuZm4uYnV0dG9uLkNvbnN0cnVjdG9yLlZFUlNJT05bMF07XG5cbiAgICAgICAgICAgIGlmIChic1ZlcnNpb24gPT09ICc0Jykge1xuICAgICAgICAgICAgICAgIHNlbGYuY2xhc3NMaXN0LmFkZCgnYmctJyArIGJzVGhlbWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBbJ3BhbmVsJywgJ3BhbmVsLScgKyBic1RoZW1lXS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2xhc3NMaXN0LmFkZChpdGVtKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWRlci5jbGFzc0xpc3QuYWRkKCdwYW5lbC1oZWFkaW5nJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFkZGVkIHN1cHBvcnQgZm9yIG1hdGVyaWFsLWRlc2lnbi1mb3ItYm9vdHN0cmFwIDQueCBjb2xvcnNcbiAgICAgICAgICAgIGlmICh0aGVtZURldGFpbHMuYnMgPT09ICdtZGInKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1kYkNvbG9yID0gYnNUaGVtZSArICctY29sb3InO1xuICAgICAgICAgICAgICAgIGlmICh0aGVtZURldGFpbHMubWRiU3R5bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbWRiQ29sb3IgPSBtZGJDb2xvciArICctZGFyayc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYuY2xhc3NMaXN0LmFkZChtZGJDb2xvcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGdldCBwcmltYXJ5IHRoZW1lIGNvbG9yXG4gICAgICAgICAgICB2YXIgcENvbG9yID0gdm9pZCAwO1xuICAgICAgICAgICAgaWYgKGJzVmVyc2lvbiA9PT0gJzQnKSB7XG4gICAgICAgICAgICAgICAgcENvbG9yID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoc2VsZikuYmFja2dyb3VuZENvbG9yLnJlcGxhY2UoL1xccysvZywgJycpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwQ29sb3IgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzZWxmLmhlYWRlcikuYmFja2dyb3VuZENvbG9yLnJlcGxhY2UoL1xccysvZywgJycpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhlbWVEZXRhaWxzLmZpbGxpbmcpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNldFRoZW1lKHBDb2xvciArICcgJyArIHRoZW1lRGV0YWlscy5maWxsaW5nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXRUaGVtZShwQ29sb3IpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLmFwcGx5VGhlbWVCb3JkZXIgPSBmdW5jdGlvbiAodGhlbWVEZXRhaWxzKSB7XG4gICAgICAgICAgICB2YXIgYm9yZGVydmFsdWVzID0gb3B0cy5ib3JkZXIuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgIHNlbGYuc3R5bGUuYm9yZGVyV2lkdGggPSBib3JkZXJ2YWx1ZXNbMF07XG4gICAgICAgICAgICBzZWxmLnN0eWxlLmJvcmRlclN0eWxlID0gYm9yZGVydmFsdWVzWzFdO1xuICAgICAgICAgICAgc2VsZi5zdHlsZS5ib3JkZXJDb2xvciA9IGJvcmRlcnZhbHVlc1syXTtcbiAgICAgICAgICAgIHNlbGYuaGVhZGVyLnN0eWxlLmJvcmRlclRvcExlZnRSYWRpdXMgPSAnMXB4JztcbiAgICAgICAgICAgIHNlbGYuaGVhZGVyLnN0eWxlLmJvcmRlclRvcFJpZ2h0UmFkaXVzID0gJzFweCc7XG4gICAgICAgICAgICBpZiAoIXRoZW1lRGV0YWlscy5icykge1xuICAgICAgICAgICAgICAgIGlmIChqc1BhbmVsLnRoZW1lcy5pbmRleE9mKHRoZW1lRGV0YWlscy5jb2xvcikgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGFyYml0cmFyeSB0aGVtZXMgb25seSAoZm9yIGJ1aWx0LWluIHRoZW1lcyBpdCdzIHRha2VuIGZyb20gdGhlIGNzcyBmaWxlKVxuICAgICAgICAgICAgICAgICAgICBib3JkZXJ2YWx1ZXNbMl0gPyBzZWxmLnN0eWxlLmJvcmRlckNvbG9yID0gYm9yZGVydmFsdWVzWzJdIDogc2VsZi5zdHlsZS5ib3JkZXJDb2xvciA9IHRoZW1lRGV0YWlscy5jb2xvcnNbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBib290c3RyYXBcbiAgICAgICAgICAgICAgICB2YXIgcENvbG9yID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzZWxmLmhlYWRlcikuYmFja2dyb3VuZENvbG9yID09PSAndHJhbnNwYXJlbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHBDb2xvciA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNlbGYpLmJhY2tncm91bmRDb2xvci5yZXBsYWNlKC9cXHMrL2csICcnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwQ29sb3IgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzZWxmLmhlYWRlcikuYmFja2dyb3VuZENvbG9yLnJlcGxhY2UoL1xccysvZywgJycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBib3JkZXJ2YWx1ZXNbMl0gPyBzZWxmLnN0eWxlLmJvcmRlckNvbG9yID0gYm9yZGVydmFsdWVzWzJdIDogc2VsZi5zdHlsZS5ib3JkZXJDb2xvciA9IHBDb2xvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuYXV0b3Bvc2l0aW9uUmVtYWluaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGF1dG9Qb3MgPSB2b2lkIDA7XG4gICAgICAgICAgICBbJ2xlZnQtdG9wLWRvd24nLCAnbGVmdC10b3AtcmlnaHQnLCAnY2VudGVyLXRvcC1kb3duJywgJ3JpZ2h0LXRvcC1kb3duJywgJ3JpZ2h0LXRvcC1sZWZ0JywgJ2xlZnQtYm90dG9tLXVwJywgJ2xlZnQtYm90dG9tLXJpZ2h0JywgJ2NlbnRlci1ib3R0b20tdXAnLCAncmlnaHQtYm90dG9tLXVwJywgJ3JpZ2h0LWJvdHRvbS1sZWZ0J10uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLmNsYXNzTGlzdC5jb250YWlucyhpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICBhdXRvUG9zID0gaXRlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChhdXRvUG9zKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLicgKyBhdXRvUG9zKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ucmVwb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuY2FsY1NpemVGYWN0b3JzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNlbGYpO1xuICAgICAgICAgICAgaWYgKG9wdHMuY29udGFpbmVyID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oZiA9IHBhcnNlRmxvYXQoc2VsZi5zdHlsZS5sZWZ0KSAvIChkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoIC0gcGFyc2VGbG9hdChzZWxmLnN0eWxlLndpZHRoKSk7XG4gICAgICAgICAgICAgICAgc2VsZi52ZiA9IHBhcnNlRmxvYXQoc2VsZi5zdHlsZS50b3ApIC8gKHdpbmRvdy5pbm5lckhlaWdodCAtIHBhcnNlRmxvYXQoc3R5bGVzLmhlaWdodCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50U3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoc2VsZi5wYXJlbnRFbGVtZW50KTtcbiAgICAgICAgICAgICAgICBzZWxmLmhmID0gcGFyc2VGbG9hdChzZWxmLnN0eWxlLmxlZnQpIC8gKHBhcnNlRmxvYXQocGFyZW50U3R5bGVzLndpZHRoKSAtIHBhcnNlRmxvYXQoc2VsZi5zdHlsZS53aWR0aCkpO1xuICAgICAgICAgICAgICAgIHNlbGYudmYgPSBwYXJzZUZsb2F0KHNlbGYuc3R5bGUudG9wKSAvIChwYXJzZUZsb2F0KHBhcmVudFN0eWxlcy5oZWlnaHQpIC0gcGFyc2VGbG9hdChzdHlsZXMuaGVpZ2h0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5jbGVhclRoZW1lID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBqc1BhbmVsLnRoZW1lcy5jb25jYXQoanNQYW5lbC5tZGJ0aGVtZXMpLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgWydwYW5lbCcsICdqc1BhbmVsLXRoZW1lLScgKyB2YWx1ZSwgJ3BhbmVsLScgKyB2YWx1ZSwgdmFsdWUgKyAnLWNvbG9yJ10uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNsYXNzTGlzdC5yZW1vdmUoaXRlbSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgncGFuZWwtaGVhZGluZycsICdqc1BhbmVsLXRoZW1lLScgKyB2YWx1ZSk7XG4gICAgICAgICAgICB9LCBzZWxmKTtcbiAgICAgICAgICAgIHNlbGYuaGVhZGVydGl0bGUuY2xhc3NMaXN0LnJlbW92ZSgncGFuZWwtdGl0bGUnKTtcbiAgICAgICAgICAgIHNlbGYuY29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdwYW5lbC1ib2R5JywgJ2pzUGFuZWwtY29udGVudC1maWxsZWQnLCAnanNQYW5lbC1jb250ZW50LWZpbGxlZGxpZ2h0Jyk7XG4gICAgICAgICAgICBzZWxmLmZvb3Rlci5jbGFzc0xpc3QucmVtb3ZlKCdwYW5lbC1mb290ZXInKTtcbiAgICAgICAgICAgIGpzUGFuZWwuc2V0U3R5bGUoc2VsZiwgeyBiYWNrZ3JvdW5kQ29sb3I6ICcnLCBib3JkZXJXaWR0aDogJycsIGJvcmRlclN0eWxlOiAnJywgYm9yZGVyQ29sb3I6ICcnIH0pO1xuICAgICAgICAgICAganNQYW5lbC5zZXRTdHlsZShzZWxmLmNvbnRlbnQsIHsgYmFja2dyb3VuZDogJycsIGJvcmRlcjogJycgfSk7XG4gICAgICAgICAgICBqc1BhbmVsLnNldFN0eWxlKHNlbGYuaGVhZGVydG9vbGJhciwgeyBib3hTaGFkb3c6ICcnLCB3aWR0aDogJycsIG1hcmdpbkxlZnQ6ICcnIH0pO1xuICAgICAgICAgICAgc2VsZi5oZWFkZXIuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoc2VsZi5jb250cm9sYmFyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qc2dseXBoJykpLmNvbmNhdChbc2VsZi5oZWFkZXJsb2dvLCBzZWxmLmhlYWRlcnRpdGxlLCBzZWxmLmhlYWRlcnRvb2xiYXIsIHNlbGYuY29udGVudF0pLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLmNvbG9yID0gJyc7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuY2xvc2UgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblxuICAgICAgICAgICAgdmFyIGRvQ2xvc2UgPSBmdW5jdGlvbiBkb0Nsb3NlKCkge1xuICAgICAgICAgICAgICAgIHZhciBwYW5lbElkID0gb3B0cy5pZDtcblxuICAgICAgICAgICAgICAgIGlmIChjbG9zZXRpbWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoY2xvc2V0aW1lcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2VsZi5jbG9zZUNoaWxkcGFuZWxzKCk7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2VsZik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHJldHVybiBmYWxzZSBpZiBwYW5lbCB3YXMgbm90IHJlbW92ZWQgZnJvbSBkb21cbiAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFuZWxJZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLnJlbW92ZU1pbmltaXplZFJlcGxhY2VtZW50KCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsY2xvc2VkKTtcblxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHBhbmVsSWQsIHBhbmVsSWQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChvcHRzLm9uY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdHMub25jbG9zZWQuY2FsbChwYW5lbElkLCBwYW5lbElkKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBpZiBwYW5lbCBpcyBhdXRvcG9zaXRpb25lZCByZXBvc2l0aW9uIHJlbWFpbmluZyBhdXRvcG9zaXRpb25lZCBwYW5lbHNcbiAgICAgICAgICAgICAgICBzZWxmLmF1dG9wb3NpdGlvblJlbWFpbmluZygpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsYmVmb3JlY2xvc2UpO1xuXG4gICAgICAgICAgICBpZiAob3B0cy5vbmJlZm9yZWNsb3NlICYmIG9wdHMub25iZWZvcmVjbG9zZS5jYWxsKHNlbGYsIHNlbGYpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3B0cy5hbmltYXRlT3V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMuYW5pbWF0ZUluKSB7XG4gICAgICAgICAgICAgICAgICAgIGpzUGFuZWwucmVtQ2xhc3Moc2VsZiwgb3B0cy5hbmltYXRlSW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBqc1BhbmVsLnNldENsYXNzKHNlbGYsIG9wdHMuYW5pbWF0ZU91dCk7XG4gICAgICAgICAgICAgICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9DbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuY2xvc2VDaGlsZHBhbmVscyA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgc2VsZi5nZXRDaGlsZHBhbmVscygpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5jbG9zZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5jb250ZW50UmVtb3ZlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBqc1BhbmVsLmVtcHR5Tm9kZShzZWxmLmNvbnRlbnQpO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuY29udGVudFJlc2l6ZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIHBhbmVsU3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoc2VsZiksXG4gICAgICAgICAgICAgICAgaGRyU3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoc2VsZi5oZWFkZXIpLFxuICAgICAgICAgICAgICAgIGZ0clN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNlbGYuZm9vdGVyKSxcbiAgICAgICAgICAgICAgICBoZHJIZWlnaHQgPSAhb3B0cy5oZWFkZXJSZW1vdmUgPyBoZHJTdHlsZXMuaGVpZ2h0IDogMCxcbiAgICAgICAgICAgICAgICBmdHJIZWlnaHQgPSBmdHJTdHlsZXMuZGlzcGxheSA9PT0gJ25vbmUnID8gMCA6IGZ0clN0eWxlcy5oZWlnaHQ7XG4gICAgICAgICAgICB2YXIgY29udGVudEhlaWdodCA9IHBhcnNlRmxvYXQocGFuZWxTdHlsZXMuaGVpZ2h0KSAtIHBhcnNlRmxvYXQoaGRySGVpZ2h0KSAtIHBhcnNlRmxvYXQoZnRySGVpZ2h0KSAtIHBhcnNlRmxvYXQocGFuZWxTdHlsZXMuYm9yZGVyVG9wV2lkdGgpIC0gcGFyc2VGbG9hdChwYW5lbFN0eWxlcy5ib3JkZXJCb3R0b21XaWR0aCk7XG4gICAgICAgICAgICBzZWxmLmNvbnRlbnQuc3R5bGUuaGVpZ2h0ID0gY29udGVudEhlaWdodCArICdweCc7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5jcmVhdGVNaW5pbWl6ZWRSZXBsYWNlbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB0cGwgPSBqc1BhbmVsLmNyZWF0ZU1pbmltaXplZFRlbXBsYXRlKCksXG4gICAgICAgICAgICAgICAgY29sb3IgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzZWxmLmhlYWRlcnRpdGxlKS5jb2xvcixcbiAgICAgICAgICAgICAgICBmb250ID0gb3B0cy5pY29uZm9udCxcbiAgICAgICAgICAgICAgICBjb250cm9sYmFyID0gdHBsLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWNvbnRyb2xiYXInKTtcblxuICAgICAgICAgICAgdHBsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNlbGYuaGVhZGVyKS5iYWNrZ3JvdW5kQ29sb3IgPT09ICd0cmFuc3BhcmVudCcgPyB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzZWxmKS5iYWNrZ3JvdW5kQ29sb3IgOiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzZWxmLmhlYWRlcikuYmFja2dyb3VuZENvbG9yO1xuICAgICAgICAgICAgdHBsLmlkID0gc2VsZi5pZCArICctbWluJztcbiAgICAgICAgICAgIHRwbC5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1oZWFkZXJiYXInKS5yZXBsYWNlQ2hpbGQoc2VsZi5oZWFkZXJsb2dvLmNsb25lTm9kZSh0cnVlKSwgdHBsLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWhlYWRlcmxvZ28nKSk7XG4gICAgICAgICAgICB0cGwucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtdGl0bGViYXInKS5yZXBsYWNlQ2hpbGQoc2VsZi5oZWFkZXJ0aXRsZS5jbG9uZU5vZGUodHJ1ZSksIHRwbC5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC10aXRsZScpKTtcbiAgICAgICAgICAgIHRwbC5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC10aXRsZScpLnN0eWxlLmNvbG9yID0gY29sb3I7XG4gICAgICAgICAgICBjb250cm9sYmFyLnN0eWxlLmNvbG9yID0gY29sb3I7XG5cbiAgICAgICAgICAgIC8vIHNldCBpY29uZm9udFxuICAgICAgICAgICAgc2VsZi5zZXRJY29uZm9udChmb250LCB0cGwpO1xuXG4gICAgICAgICAgICBpZiAoc2VsZi5kYXRhc2V0LmJ0bm5vcm1hbGl6ZSA9PT0gJ2VuYWJsZWQnKSB7XG4gICAgICAgICAgICAgICAganNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRwbC5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1idG4tbm9ybWFsaXplJykuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubm9ybWFsaXplKCkucmVtb3ZlTWluaW1pemVkUmVwbGFjZW1lbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xiYXIucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2VsZi5kYXRhc2V0LmJ0bm1heGltaXplID09PSAnZW5hYmxlZCcpIHtcbiAgICAgICAgICAgICAgICBqc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdHBsLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWJ0bi1tYXhpbWl6ZScpLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm1heGltaXplKCkucmVtb3ZlTWluaW1pemVkUmVwbGFjZW1lbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xiYXIucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtYnRuLW1heGltaXplJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZWxmLmRhdGFzZXQuYnRuY2xvc2UgPT09ICdlbmFibGVkJykge1xuICAgICAgICAgICAgICAgIGpzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAgICAgICAgICAgICB0cGwucXVlcnlTZWxlY3RvcignLmpzUGFuZWwtYnRuLWNsb3NlJykuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlTWluaW1pemVkUmVwbGFjZW1lbnQoKS5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udHJvbGJhci5xdWVyeVNlbGVjdG9yKCcuanNQYW5lbC1idG4tY2xvc2UnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHBsO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuZnJvbnQgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGpzUGFuZWwuZnJvbnQoc2VsZik7XG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGpzcGFuZWxmcm9udGVkKTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2VsZiwgc2VsZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0cy5vbmZyb250ZWQpIHtcbiAgICAgICAgICAgICAgICBvcHRzLm9uZnJvbnRlZC5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5nZXRDaGlsZHBhbmVscyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChzZWxmLmNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzUGFuZWwnKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5nZXRUaGVtZURldGFpbHMgPSBmdW5jdGlvbiAodGgpIHtcbiAgICAgICAgICAgIHZhciBwYXNzZWRUaGVtZSA9IHRoLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvIC9nLCAnJyksXG4gICAgICAgICAgICAgICAgdGhlbWUgPSB7IGNvbG9yOiBmYWxzZSwgY29sb3JzOiBmYWxzZSwgZmlsbGluZzogZmFsc2UsIGJzOiBmYWxzZSwgYnN0aGVtZTogZmFsc2UgfTtcblxuICAgICAgICAgICAgaWYgKHBhc3NlZFRoZW1lLnN1YnN0cigtNiwgNikgPT09ICdmaWxsZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhlbWUuZmlsbGluZyA9ICdmaWxsZWQnO1xuICAgICAgICAgICAgICAgIHRoZW1lLmNvbG9yID0gcGFzc2VkVGhlbWUuc3Vic3RyKDAsIHBhc3NlZFRoZW1lLmxlbmd0aCAtIDYpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXNzZWRUaGVtZS5zdWJzdHIoLTExLCAxMSkgPT09ICdmaWxsZWRsaWdodCcpIHtcbiAgICAgICAgICAgICAgICB0aGVtZS5maWxsaW5nID0gJ2ZpbGxlZGxpZ2h0JztcbiAgICAgICAgICAgICAgICB0aGVtZS5jb2xvciA9IHBhc3NlZFRoZW1lLnN1YnN0cigwLCBwYXNzZWRUaGVtZS5sZW5ndGggLSAxMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoZW1lLmZpbGxpbmcgPSAnJztcbiAgICAgICAgICAgICAgICB0aGVtZS5jb2xvciA9IHBhc3NlZFRoZW1lOyAvLyB0aGVtZURldGFpbHMuY29sb3IgaXMgdGhlIHByaW1hcnkgY29sb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoZW1lLmNvbG9ycyA9IGpzUGFuZWwuY2FsY0NvbG9ycyh0aGVtZS5jb2xvcik7XG5cbiAgICAgICAgICAgIC8vIGlmIGZpcnN0IHBhcnQgb2YgdGhlbWUgaW5jbHVkZXMgYSBcIi1cIiBpdCdzIGFzc3VtZWQgdG8gYmUgYSBib290c3RyYXAgdGhlbWVcbiAgICAgICAgICAgIGlmICh0aGVtZS5jb2xvci5tYXRjaCgnLScpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJzVmFyaWFudCA9IHRoZW1lLmNvbG9yLnNwbGl0KCctJyk7XG4gICAgICAgICAgICAgICAgdGhlbWUuYnMgPSBic1ZhcmlhbnRbMF07XG4gICAgICAgICAgICAgICAgdGhlbWUuYnN0aGVtZSA9IGJzVmFyaWFudFsxXTtcbiAgICAgICAgICAgICAgICB0aGVtZS5tZGJTdHlsZSA9IGJzVmFyaWFudFsyXSB8fCB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGVtZTtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLmlzQ2hpbGRwYW5lbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIGlmIHBhbmVsIGlzIGNoaWxkcGFuZWwgb2YgYW5vdGhlciBwYW5lbCByZXR1cm5zIHBhcmVudHBhbmVsXG4gICAgICAgICAgICB2YXIgcHAgPSBzZWxmLmNsb3Nlc3QoJy5qc1BhbmVsLWNvbnRlbnQnKTtcbiAgICAgICAgICAgIHJldHVybiBwcCA/IHBwLnBhcmVudE5vZGUgOiBmYWxzZTtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLm1heGltaXplID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAvLyBOb3RlOiBkbyBub3QgZGlzYWJsZSBtYXhpbWl6ZSBtZXRob2QgZm9yIGFscmVhZHkgbWF4aW1pemVkIHBhbmVscyAtPiBvbndpbmRvd3Jlc2l6ZSB3b3VsZG4ndCB3b3JrXG4gICAgICAgICAgICBpZiAob3B0cy5vbmJlZm9yZW1heGltaXplICYmIG9wdHMub25iZWZvcmVtYXhpbWl6ZS5jYWxsKHNlbGYsIHNlbGYpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGpzcGFuZWxiZWZvcmVtYXhpbWl6ZSk7XG5cbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSBzZWxmLnBhcmVudE5vZGUsXG4gICAgICAgICAgICAgICAgbWFyZ2lucyA9IG9wdHMubWF4aW1pemVkTWFyZ2luO1xuXG4gICAgICAgICAgICBpZiAocGFyZW50ID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICAgICAgLy8gbWF4aW1pemUgd2l0aGluIHdpbmRvd1xuICAgICAgICAgICAgICAgIHNlbGYuc3R5bGUud2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggLSBtYXJnaW5zWzFdIC0gbWFyZ2luc1szXSArICdweCc7XG4gICAgICAgICAgICAgICAgc2VsZi5zdHlsZS5oZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC0gbWFyZ2luc1swXSAtIG1hcmdpbnNbMl0gKyAncHgnO1xuICAgICAgICAgICAgICAgIHNlbGYuc3R5bGUubGVmdCA9IG1hcmdpbnNbM10gKyAncHgnO1xuICAgICAgICAgICAgICAgIHNlbGYuc3R5bGUudG9wID0gbWFyZ2luc1swXSArICdweCc7XG5cbiAgICAgICAgICAgICAgICBpZiAoIW9wdHMucG9zaXRpb24uZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zdHlsZS5sZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0ICsgbWFyZ2luc1szXSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3R5bGUudG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0ICsgbWFyZ2luc1swXSArICdweCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBtYXhpbWl6ZSB3aXRoaW4gcGFyZW50Tm9kZVxuICAgICAgICAgICAgICAgIHNlbGYuc3R5bGUud2lkdGggPSBwYXJlbnQuY2xpZW50V2lkdGggLSBtYXJnaW5zWzFdIC0gbWFyZ2luc1szXSArICdweCc7XG4gICAgICAgICAgICAgICAgc2VsZi5zdHlsZS5oZWlnaHQgPSBwYXJlbnQuY2xpZW50SGVpZ2h0IC0gbWFyZ2luc1swXSAtIG1hcmdpbnNbMl0gKyAncHgnO1xuICAgICAgICAgICAgICAgIHNlbGYuc3R5bGUubGVmdCA9IG1hcmdpbnNbM10gKyAncHgnO1xuICAgICAgICAgICAgICAgIHNlbGYuc3R5bGUudG9wID0gbWFyZ2luc1swXSArICdweCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYuY29udGVudFJlc2l6ZSgpO1xuICAgICAgICAgICAgc2VsZi5yZW1vdmVNaW5pbWl6ZWRSZXBsYWNlbWVudCgpO1xuICAgICAgICAgICAgc2VsZi5zdGF0dXMgPSAnbWF4aW1pemVkJztcbiAgICAgICAgICAgIHNlbGYuc2V0Q29udHJvbHMoWycuanNQYW5lbC1idG4tbWF4aW1pemUnLCAnLmpzUGFuZWwtYnRuLXNtYWxsaWZ5cmV2J10pO1xuICAgICAgICAgICAganNQYW5lbC5mcm9udChzZWxmKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoanNwYW5lbG1heGltaXplZCk7XG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGpzcGFuZWxzdGF0dXNjaGFuZ2UpO1xuXG4gICAgICAgICAgICBpZiAob3B0cy5vbnN0YXR1c2NoYW5nZSAmJiBvcHRzLm9uc3RhdHVzY2hhbmdlLmNhbGwoc2VsZiwgc2VsZikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2VsZiwgc2VsZik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcHRzLm9ubWF4aW1pemVkKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5vbm1heGltaXplZC5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLm1pbmltaXplID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5zdGF0dXMgPT09ICdtaW5pbWl6ZWQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcHRzLm9uYmVmb3JlbWluaW1pemUgJiYgb3B0cy5vbmJlZm9yZW1pbmltaXplLmNhbGwoc2VsZiwgc2VsZikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoanNwYW5lbGJlZm9yZW1pbmltaXplKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGNvbnRhaW5lciBmb3IgbWluaW1pemVkIHJlcGxhY2VtZW50cyBpZiBub3QgYWxyZWFkeSB0aGVyZVxuICAgICAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXInKSkge1xuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlbWVudENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHJlcGxhY2VtZW50Q29udGFpbmVyLmlkID0gJ2pzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyJztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZChyZXBsYWNlbWVudENvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYuc3R5bGUubGVmdCA9ICctOTk5OXB4JztcbiAgICAgICAgICAgIHNlbGYuc3RhdHVzQmVmb3JlID0gc2VsZi5zdGF0dXM7XG4gICAgICAgICAgICBzZWxmLnN0YXR1cyA9ICdtaW5pbWl6ZWQnO1xuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsbWluaW1pemVkKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoanNwYW5lbHN0YXR1c2NoYW5nZSk7XG5cbiAgICAgICAgICAgIGlmIChvcHRzLm9uc3RhdHVzY2hhbmdlICYmIG9wdHMub25zdGF0dXNjaGFuZ2UuY2FsbChzZWxmLCBzZWxmKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdHMubWluaW1pemVUbykge1xuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlbWVudCA9IHNlbGYuY3JlYXRlTWluaW1pemVkUmVwbGFjZW1lbnQoKTtcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5taW5pbWl6ZVRvID09PSAnZGVmYXVsdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyJykuYXBwZW5kKHJlcGxhY2VtZW50KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdHMubWluaW1pemVUbyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLm1pbmltaXplVG8gPT09ICdwYXJlbnRwYW5lbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gc2VsZi5jbG9zZXN0KCcuanNQYW5lbC1jb250ZW50JykucGFyZW50Tm9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdCA9IHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanNQYW5lbC1taW5pbWl6ZWQtYm94Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyID0gbGlzdFtsaXN0Lmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdHMubWluaW1pemVUbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIgPSBvcHRzLm1pbmltaXplVG87XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZChyZXBsYWNlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3B0cy5vbm1pbmltaXplZCkge1xuICAgICAgICAgICAgICAgIG9wdHMub25taW5pbWl6ZWQuY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5ub3JtYWxpemUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGlmIChzZWxmLnN0YXR1cyA9PT0gJ25vcm1hbGl6ZWQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcHRzLm9uYmVmb3Jlbm9ybWFsaXplICYmIG9wdHMub25iZWZvcmVub3JtYWxpemUuY2FsbChzZWxmLCBzZWxmKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsYmVmb3Jlbm9ybWFsaXplKTtcbiAgICAgICAgICAgIHNlbGYuc3R5bGUud2lkdGggPSBzZWxmLmN1cnJlbnREYXRhLndpZHRoO1xuICAgICAgICAgICAgc2VsZi5zdHlsZS5oZWlnaHQgPSBzZWxmLmN1cnJlbnREYXRhLmhlaWdodDtcbiAgICAgICAgICAgIHNlbGYuY29udGVudFJlc2l6ZSgpO1xuICAgICAgICAgICAgc2VsZi5zdHlsZS5sZWZ0ID0gc2VsZi5jdXJyZW50RGF0YS5sZWZ0O1xuICAgICAgICAgICAgc2VsZi5zdHlsZS50b3AgPSBzZWxmLmN1cnJlbnREYXRhLnRvcDtcbiAgICAgICAgICAgIHNlbGYucmVtb3ZlTWluaW1pemVkUmVwbGFjZW1lbnQoKTtcbiAgICAgICAgICAgIHNlbGYuc3RhdHVzID0gJ25vcm1hbGl6ZWQnO1xuICAgICAgICAgICAgc2VsZi5zZXRDb250cm9scyhbJy5qc1BhbmVsLWJ0bi1ub3JtYWxpemUnLCAnLmpzUGFuZWwtYnRuLXNtYWxsaWZ5cmV2J10pO1xuICAgICAgICAgICAganNQYW5lbC5mcm9udChzZWxmKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoanNwYW5lbG5vcm1hbGl6ZWQpO1xuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsc3RhdHVzY2hhbmdlKTtcblxuICAgICAgICAgICAgaWYgKG9wdHMub25zdGF0dXNjaGFuZ2UgJiYgb3B0cy5vbnN0YXR1c2NoYW5nZS5jYWxsKHNlbGYsIHNlbGYpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3B0cy5vbm5vcm1hbGl6ZWQpIHtcbiAgICAgICAgICAgICAgICBvcHRzLm9ubm9ybWFsaXplZC5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLnJlbW92ZU1pbmltaXplZFJlcGxhY2VtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGVsbXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxmLmlkICsgJy1taW4nKTtcbiAgICAgICAgICAgIGlmIChlbG10KSB7XG4gICAgICAgICAgICAgICAgZWxtdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsbXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5yZXBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHBhcmFtcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICAgICAgICAgIHBhcmFtc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHBvcyA9IG9wdHMucG9zaXRpb24sXG4gICAgICAgICAgICAgICAgdXBkYXRlQ2FjaGUgPSB0cnVlLFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gdm9pZCAwO1xuICAgICAgICAgICAgcGFyYW1zLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodmFsdWUpKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVDYWNoZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGpzUGFuZWwucG9zaXRpb24oc2VsZiwgcG9zKTtcbiAgICAgICAgICAgIGlmICh1cGRhdGVDYWNoZSkge1xuICAgICAgICAgICAgICAgIHNlbGYuc2F2ZUN1cnJlbnRQb3NpdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYucmVwb3NpdGlvbk9uU25hcCA9IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgICAgICAgIHZhciBvZmZzZXRYID0gJzAnLFxuICAgICAgICAgICAgICAgIG9mZnNldFkgPSAnMCc7XG4gICAgICAgICAgICB2YXIgbWFyZ2lucyA9IGpzUGFuZWwucE9jb250YWlubWVudChvcHRzLmRyYWdpdC5jb250YWlubWVudCk7XG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgb2Zmc2V0c1xuICAgICAgICAgICAgaWYgKG9wdHMuZHJhZ2l0LnNuYXAuY29udGFpbm1lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAocG9zID09PSAnbGVmdC10b3AnKSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFggPSBtYXJnaW5zWzNdO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRZID0gbWFyZ2luc1swXTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvcyA9PT0gJ3JpZ2h0LXRvcCcpIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WCA9IC1tYXJnaW5zWzFdO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRZID0gbWFyZ2luc1swXTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvcyA9PT0gJ3JpZ2h0LWJvdHRvbScpIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WCA9IC1tYXJnaW5zWzFdO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRZID0gLW1hcmdpbnNbMl07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb3MgPT09ICdsZWZ0LWJvdHRvbScpIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WCA9IG1hcmdpbnNbM107XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFkgPSAtbWFyZ2luc1syXTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvcyA9PT0gJ2NlbnRlci10b3AnKSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFggPSBtYXJnaW5zWzNdIC8gMiAtIG1hcmdpbnNbMV0gLyAyO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRZID0gbWFyZ2luc1swXTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvcyA9PT0gJ2NlbnRlci1ib3R0b20nKSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFggPSBtYXJnaW5zWzNdIC8gMiAtIG1hcmdpbnNbMV0gLyAyO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRZID0gLW1hcmdpbnNbMl07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb3MgPT09ICdsZWZ0LWNlbnRlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WCA9IG1hcmdpbnNbM107XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFkgPSBtYXJnaW5zWzBdIC8gMiAtIG1hcmdpbnNbMl0gLyAyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9zID09PSAncmlnaHQtY2VudGVyJykge1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRYID0gLW1hcmdpbnNbMV07XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFkgPSBtYXJnaW5zWzBdIC8gMiAtIG1hcmdpbnNbMl0gLyAyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qIGpzUGFuZWwucG9zaXRpb24oc2VsZiwgYCR7cG9zfSAke29mZnNldFh9ICR7b2Zmc2V0WX1gKTtcclxuICAgICAgICAgICAgICAgRm9yIHNvbWUgcmVhc29uIEkgY291bGQgbm90IGZpbmQgdGhlIGxpbmUgYWJvdmUgZG9lcyBub3Qgd29yayAocG9zIGFuZCBvZmZzZXRzIGluIG9uZSBzdHJpbmcpLCBidXQgb25seSB3aGVuXHJcbiAgICAgICAgICAgICAgIGNlbnRlci1ib3R0b20gaXMgdXNlZCB3aXRoIGRpZmZlcmVudCBzZXR0aW5ncyBmb3IgbGVmdC9yaWdodCBtYXJnaW4uXHJcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICBqc1BhbmVsLnBvc2l0aW9uKHNlbGYsIHBvcyk7XG4gICAgICAgICAgICBqc1BhbmVsLnNldFN0eWxlKHNlbGYsIHtcbiAgICAgICAgICAgICAgICBsZWZ0OiAnY2FsYygnICsgc2VsZi5zdHlsZS5sZWZ0ICsgJyArICcgKyBvZmZzZXRYICsgJ3B4KScsXG4gICAgICAgICAgICAgICAgdG9wOiAnY2FsYygnICsgc2VsZi5zdHlsZS50b3AgKyAnICsgJyArIG9mZnNldFkgKyAncHgpJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5yZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIHBhcmFtcyA9IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkaW1lbnNpb25zID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoc2VsZik7XG4gICAgICAgICAgICB2YXIgc2l6ZSA9IHsgd2lkdGg6IGRpbWVuc2lvbnMud2lkdGgsIGhlaWdodDogZGltZW5zaW9ucy5oZWlnaHQgfSxcbiAgICAgICAgICAgICAgICB1cGRhdGVDYWNoZSA9IHRydWUsXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSB2b2lkIDA7XG4gICAgICAgICAgICBwYXJhbXMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBzaXplID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih2YWx1ZSkpID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBzaXplID0gT2JqZWN0LmFzc2lnbihzaXplLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVDYWNoZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBqc1BhbmVsLnBPc2l6ZShzZWxmLCBzaXplKTtcbiAgICAgICAgICAgIHNlbGYuc3R5bGUud2lkdGggPSB2YWx1ZXMud2lkdGg7XG4gICAgICAgICAgICBzZWxmLnN0eWxlLmhlaWdodCA9IHZhbHVlcy5oZWlnaHQ7XG4gICAgICAgICAgICBzZWxmLmNvbnRlbnRSZXNpemUoKTtcbiAgICAgICAgICAgIGlmICh1cGRhdGVDYWNoZSkge1xuICAgICAgICAgICAgICAgIHNlbGYuc2F2ZUN1cnJlbnREaW1lbnNpb25zKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5zYXZlQ3VycmVudERpbWVuc2lvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbm9ybURhdGEgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzZWxmKTtcbiAgICAgICAgICAgIHNlbGYuY3VycmVudERhdGEud2lkdGggPSBub3JtRGF0YS53aWR0aDtcbiAgICAgICAgICAgIGlmIChzZWxmLnN0YXR1cyA9PT0gJ25vcm1hbGl6ZWQnKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50RGF0YS5oZWlnaHQgPSBub3JtRGF0YS5oZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHNlbGYuc2F2ZUN1cnJlbnRQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBub3JtRGF0YSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNlbGYpO1xuICAgICAgICAgICAgc2VsZi5jdXJyZW50RGF0YS5sZWZ0ID0gbm9ybURhdGEubGVmdDtcbiAgICAgICAgICAgIHNlbGYuY3VycmVudERhdGEudG9wID0gbm9ybURhdGEudG9wO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuc2V0Q29udHJvbHMgPSBmdW5jdGlvbiAoc2VsLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgc2VsZi5oZWFkZXIucXVlcnlTZWxlY3RvckFsbCgnLmpzUGFuZWwtYnRuJykuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlbC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJ0biA9IHNlbGYuY29udHJvbGJhci5xdWVyeVNlbGVjdG9yKGl0ZW0pO1xuICAgICAgICAgICAgICAgIGlmIChidG4pIHtcbiAgICAgICAgICAgICAgICAgICAgYnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5zZXRDb250cm9sU3RhdHVzID0gZnVuY3Rpb24gKGN0cmwpIHtcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6ICdlbmFibGUnO1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gYXJndW1lbnRzWzJdO1xuXG4gICAgICAgICAgICBpZiAoYWN0aW9uID09PSAnZGlzYWJsZScpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnRuJyArIGN0cmwpICE9PSAncmVtb3ZlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYnRuJyArIGN0cmwsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYnRuID0gc2VsZi5jb250cm9sYmFyLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWJ0bi0nICsgY3RybCk7XG4gICAgICAgICAgICAgICAgICAgIGJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICBidG4uc3R5bGUub3BhY2l0eSA9IDAuNDtcbiAgICAgICAgICAgICAgICAgICAgYnRuLnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gJ2VuYWJsZScpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnRuJyArIGN0cmwpICE9PSAncmVtb3ZlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYnRuJyArIGN0cmwsICdlbmFibGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfYnRuID0gc2VsZi5jb250cm9sYmFyLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWJ0bi0nICsgY3RybCk7XG4gICAgICAgICAgICAgICAgICAgIF9idG4uc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcbiAgICAgICAgICAgICAgICAgICAgX2J0bi5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgICAgICAgICAgICAgX2J0bi5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICdyZW1vdmUnKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9idG4yID0gc2VsZi5jb250cm9sYmFyLnF1ZXJ5U2VsZWN0b3IoJy5qc1BhbmVsLWJ0bi0nICsgY3RybCk7XG4gICAgICAgICAgICAgICAgc2VsZi5jb250cm9sYmFyLnJlbW92ZUNoaWxkKF9idG4yKTtcbiAgICAgICAgICAgICAgICBzZWxmLnNldEF0dHJpYnV0ZSgnZGF0YS1idG4nICsgY3RybCwgJ3JlbW92ZWQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuc2V0SGVhZGVyQ29udHJvbHMgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBjb250cm9scyA9IFsnY2xvc2UnLCAnbWF4aW1pemUnLCAnbm9ybWFsaXplJywgJ21pbmltaXplJywgJ3NtYWxsaWZ5JywgJ3NtYWxsaWZ5cmV2J10sXG4gICAgICAgICAgICAgICAgb3B0aW9uID0gb3B0cy5oZWFkZXJDb250cm9scztcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb24gPT09ICdub25lJykge1xuICAgICAgICAgICAgICAgICAgICBjb250cm9scy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldENvbnRyb2xTdGF0dXMoaXRlbSwgJ3JlbW92ZScpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbiA9PT0gJ2Nsb3Nlb25seScpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbHMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0gIT09ICdjbG9zZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldENvbnRyb2xTdGF0dXMoaXRlbSwgJ3JlbW92ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbltpdGVtXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRDb250cm9sU3RhdHVzKGl0ZW0sIG9wdGlvbltpdGVtXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2VsZiwgc2VsZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLnNldEhlYWRlckxvZ28gPSBmdW5jdGlvbiAoaGRyTG9nbywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaGRyTG9nbyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpZiAoaGRyTG9nby5zdWJzdHIoMCwgMSkgIT09ICc8Jykge1xuICAgICAgICAgICAgICAgICAgICAvLyBpcyBhc3N1bWVkIHRvIGJlIGFuIGltZyB1cmxcbiAgICAgICAgICAgICAgICAgICAgdmFyIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICAgICAgICAgICAgICBpbWcuc3R5bGUubWF4SGVpZ2h0ID0gZ2V0Q29tcHV0ZWRTdHlsZShzZWxmLmhlYWRlcmJhcikuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBpbWcuc3JjID0gaGRyTG9nbztcbiAgICAgICAgICAgICAgICAgICAganNQYW5lbC5lbXB0eU5vZGUoc2VsZi5oZWFkZXJsb2dvKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5oZWFkZXJsb2dvLmFwcGVuZChpbWcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaGVhZGVybG9nby5pbm5lckhUTUwgPSBoZHJMb2dvO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gYXNzdW1lZCB0byBiZSBhIG5vZGUgb2JqZWN0XG4gICAgICAgICAgICAgICAganNQYW5lbC5lbXB0eU5vZGUoc2VsZi5oZWFkZXJsb2dvKTtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWRlcmxvZ28uYXBwZW5kKGhkckxvZ28pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuc2V0SGVhZGVyUmVtb3ZlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBzZWxmLnJlbW92ZUNoaWxkKHNlbGYuaGVhZGVyKTtcbiAgICAgICAgICAgIHNlbGYuY29udGVudC5jbGFzc0xpc3QuYWRkKCdqc1BhbmVsLWNvbnRlbnQtbm9oZWFkZXInKTtcbiAgICAgICAgICAgIFsnY2xvc2UnLCAnbWF4aW1pemUnLCAnbm9ybWFsaXplJywgJ21pbmltaXplJywgJ3NtYWxsaWZ5JywgJ3NtYWxsaWZ5cmV2J10uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0QXR0cmlidXRlKCdkYXRhLWJ0bicgKyBpdGVtLCAncmVtb3ZlZCcpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2VsZiwgc2VsZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLnNldEhlYWRlclRpdGxlID0gZnVuY3Rpb24gKGhkclRpdGxlLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBoZHJUaXRsZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWRlcnRpdGxlLmlubmVySFRNTCA9IGhkclRpdGxlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaGRyVGl0bGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBqc1BhbmVsLmVtcHR5Tm9kZShzZWxmLmhlYWRlcnRpdGxlKTtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWRlcnRpdGxlLmlubmVySFRNTCA9IGhkclRpdGxlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGFzc3VtZWQgdG8gYmUgYSBub2RlIG9iamVjdFxuICAgICAgICAgICAgICAgIGpzUGFuZWwuZW1wdHlOb2RlKHNlbGYuaGVhZGVydGl0bGUpO1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhZGVydGl0bGUuYXBwZW5kKGhkclRpdGxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2VsZiwgc2VsZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLnNldEljb25mb250ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGZvbnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6ICdqc2dseXBoJztcbiAgICAgICAgICAgIHZhciBwYW5lbCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogc2VsZjtcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGFyZ3VtZW50c1syXTtcblxuICAgICAgICAgICAgaWYgKGZvbnQgIT09ICdqc2dseXBoJykge1xuICAgICAgICAgICAgICAgIHZhciBjbGFzc0FycmF5ID0gdm9pZCAwLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0QXJyYXkgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgaWYgKGZvbnQgPT09ICdib290c3RyYXAnIHx8IGZvbnQgPT09ICdnbHlwaGljb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzQXJyYXkgPSBbJ2dseXBoaWNvbiBnbHlwaGljb24tcmVtb3ZlJywgJ2dseXBoaWNvbiBnbHlwaGljb24tZnVsbHNjcmVlbicsICdnbHlwaGljb24gZ2x5cGhpY29uLXJlc2l6ZS1mdWxsJywgJ2dseXBoaWNvbiBnbHlwaGljb24tbWludXMnLCAnZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLWRvd24nLCAnZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLXVwJ107XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmb250ID09PSAnZmEnIHx8IGZvbnQgPT09ICdmYXInIHx8IGZvbnQgPT09ICdmYWwnIHx8IGZvbnQgPT09ICdmYXMnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzQXJyYXkgPSBbZm9udCArICcgZmEtd2luZG93LWNsb3NlJywgZm9udCArICcgZmEtd2luZG93LW1heGltaXplJywgZm9udCArICcgZmEtd2luZG93LXJlc3RvcmUnLCBmb250ICsgJyBmYS13aW5kb3ctbWluaW1pemUnLCBmb250ICsgJyBmYS1jaGV2cm9uLWRvd24nLCBmb250ICsgJyBmYS1jaGV2cm9uLXVwJ107XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmb250ID09PSAnbWF0ZXJpYWwtaWNvbnMnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzQXJyYXkgPSBbZm9udCwgZm9udCwgZm9udCwgZm9udCwgZm9udCwgZm9udF07XG4gICAgICAgICAgICAgICAgICAgIHRleHRBcnJheSA9IFsnY2xvc2UnLCAnZnVsbHNjcmVlbicsICdmdWxsc2NyZWVuX2V4aXQnLCAnY2FsbF9yZWNlaXZlZCcsICdleHBhbmRfbW9yZScsICdleHBhbmRfbGVzcyddO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShmb250KSkge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc0FycmF5ID0gWydjdXN0b20tY29udHJvbC1pY29uICcgKyBmb250WzVdLCAnY3VzdG9tLWNvbnRyb2wtaWNvbiAnICsgZm9udFs0XSwgJ2N1c3RvbS1jb250cm9sLWljb24gJyArIGZvbnRbM10sICdjdXN0b20tY29udHJvbC1pY29uICcgKyBmb250WzJdLCAnY3VzdG9tLWNvbnRyb2wtaWNvbiAnICsgZm9udFsxXSwgJ2N1c3RvbS1jb250cm9sLWljb24gJyArIGZvbnRbMF1dO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYW5lbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwocGFuZWwucXVlcnlTZWxlY3RvckFsbCgnLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4gPiBzcGFuJykpLnJldmVyc2UoKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NOYW1lID0gY2xhc3NBcnJheVtpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvbnQgPT09ICdtYXRlcmlhbC1pY29ucycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udGV4dENvbnRlbnQgPSB0ZXh0QXJyYXlbaV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwocGFuZWwsIHBhbmVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwYW5lbDtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLnNldFJ0bCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFtzZWxmLmhlYWRlciwgc2VsZi5oZWFkZXJiYXIsIHNlbGYudGl0bGViYXIsIHNlbGYuY29udHJvbGJhciwgc2VsZi5oZWFkZXJ0b29sYmFyLCBzZWxmLmZvb3Rlcl0uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnanNQYW5lbC1ydGwnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgW3NlbGYuaGVhZGVydGl0bGUsIHNlbGYuaGVhZGVydG9vbGJhciwgc2VsZi5jb250ZW50LCBzZWxmLmZvb3Rlcl0uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uZGlyID0gJ3J0bCc7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMucnRsLmxhbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5sYW5nID0gb3B0cy5ydGwubGFuZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLnNldFNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAob3B0cy5wYW5lbFNpemUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVzID0ganNQYW5lbC5wT3NpemUoc2VsZiwgb3B0cy5wYW5lbFNpemUpO1xuICAgICAgICAgICAgICAgIHNlbGYuc3R5bGUud2lkdGggPSB2YWx1ZXMud2lkdGg7XG4gICAgICAgICAgICAgICAgc2VsZi5zdHlsZS5oZWlnaHQgPSB2YWx1ZXMuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIHNlbGYuY29udGVudFJlc2l6ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRzLmNvbnRlbnRTaXplKSB7XG4gICAgICAgICAgICAgICAgdmFyIF92YWx1ZXMgPSBqc1BhbmVsLnBPc2l6ZShzZWxmLCBvcHRzLmNvbnRlbnRTaXplKTtcbiAgICAgICAgICAgICAgICBzZWxmLmNvbnRlbnQuc3R5bGUud2lkdGggPSBfdmFsdWVzLndpZHRoO1xuICAgICAgICAgICAgICAgIHNlbGYuY29udGVudC5zdHlsZS5oZWlnaHQgPSBfdmFsdWVzLmhlaWdodDtcbiAgICAgICAgICAgICAgICAvLyBleHBsaWNpdGx5IGFzc2lnbiBjdXJyZW50IHdpZHRoL2hlaWdodCB0byBwYW5lbFxuICAgICAgICAgICAgICAgIHNlbGYuc3R5bGUud2lkdGggPSBfdmFsdWVzLndpZHRoO1xuICAgICAgICAgICAgICAgIC8vIHRoZW4gc2V0IGNvbnRlbnQgd2lkdGggdG8gMTAwJVxuICAgICAgICAgICAgICAgIHNlbGYuY29udGVudC5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuc2V0VGhlbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdGhlbWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IG9wdHMudGhlbWU7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBhcmd1bWVudHNbMV07XG5cbiAgICAgICAgICAgIC8vIGZpcnN0IHJlbW92ZSBhbGwgdGhlbWUgcmVsYXRlZCBzeWxlc1xuICAgICAgICAgICAgc2VsZi5jbGVhclRoZW1lKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGVtZSA9PT0gJ25vbmUnKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVzdWx0cyBpbiBhbiBhbGwgd2hpdGUgcGFuZWwgd2l0aG91dCBhbnkgdGhlbWUgcmVsYXRlZCBjbGFzc2VzL3N0eWxlcyBhcHBsaWVkXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZhbCBvZiBmb290ZXIgYmFja2dyb3VuZC9ib3JkZXIgaXMgZG9uZSBpbiBqc1AudG9vbGJhckFkZCgpXG4gICAgICAgICAgICAgICAgc2VsZi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZic7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB0aGVtZURldGFpbHMgPSBzZWxmLmdldFRoZW1lRGV0YWlscyh0aGVtZSk7XG5cbiAgICAgICAgICAgIGlmICghdGhlbWVEZXRhaWxzLmJzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGpzUGFuZWwudGhlbWVzLmluZGV4T2YodGhlbWVEZXRhaWxzLmNvbG9yKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hcHBseUJ1aWx0SW5UaGVtZSh0aGVtZURldGFpbHMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYXBwbHlBcmJpdHJhcnlUaGVtZSh0aGVtZURldGFpbHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5hcHBseUJvb3RzdHJhcFRoZW1lKHRoZW1lRGV0YWlscyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcHRzLmJvcmRlcikge1xuICAgICAgICAgICAgICAgIHNlbGYuYXBwbHlUaGVtZUJvcmRlcih0aGVtZURldGFpbHMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLnN0eWxlLmJvcmRlcldpZHRoID0gJyc7XG4gICAgICAgICAgICAgICAgc2VsZi5zdHlsZS5ib3JkZXJTdHlsZSA9ICcnO1xuICAgICAgICAgICAgICAgIHNlbGYuc3R5bGUuYm9yZGVyQ29sb3IgPSAnJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuc21hbGxpZnkgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGlmIChzZWxmLnN0YXR1cyA9PT0gJ3NtYWxsaWZpZWQnIHx8IHNlbGYuc3RhdHVzID09PSAnc21hbGxpZmllZG1heCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdHMub25iZWZvcmVzbWFsbGlmeSAmJiBvcHRzLm9uYmVmb3Jlc21hbGxpZnkuY2FsbChzZWxmLCBzZWxmKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsYmVmb3Jlc21hbGxpZnkpO1xuXG4gICAgICAgICAgICBpZiAoc2VsZi5zdGF0dXMgPT09ICdub3JtYWxpemVkJykge1xuICAgICAgICAgICAgICAgIHNlbGYuc2F2ZUN1cnJlbnREaW1lbnNpb25zKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAgICAgICAgIHNlbGYuc3R5bGUuaGVpZ2h0ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoc2VsZi5oZWFkZXJiYXIpLmhlaWdodDtcblxuICAgICAgICAgICAgaWYgKHNlbGYuc3RhdHVzID09PSAnbm9ybWFsaXplZCcpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNldENvbnRyb2xzKFsnLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZScsICcuanNQYW5lbC1idG4tc21hbGxpZnknXSk7XG4gICAgICAgICAgICAgICAgc2VsZi5zdGF0dXMgPSAnc21hbGxpZmllZCc7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsc21hbGxpZmllZCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsc3RhdHVzY2hhbmdlKTtcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5vbnN0YXR1c2NoYW5nZSAmJiBvcHRzLm9uc3RhdHVzY2hhbmdlLmNhbGwoc2VsZiwgc2VsZikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZi5zdGF0dXMgPT09ICdtYXhpbWl6ZWQnKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXRDb250cm9scyhbJy5qc1BhbmVsLWJ0bi1tYXhpbWl6ZScsICcuanNQYW5lbC1idG4tc21hbGxpZnknXSk7XG4gICAgICAgICAgICAgICAgc2VsZi5zdGF0dXMgPSAnc21hbGxpZmllZG1heCc7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsc21hbGxpZmllZG1heCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsc3RhdHVzY2hhbmdlKTtcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5vbnN0YXR1c2NoYW5nZSAmJiBvcHRzLm9uc3RhdHVzY2hhbmdlLmNhbGwoc2VsZiwgc2VsZikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdHMub25zbWFsbGlmaWVkKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5vbnNtYWxsaWZpZWQuY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi51bnNtYWxsaWZ5ID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5zdGF0dXMgPT09ICdzbWFsbGlmaWVkJyB8fCBzZWxmLnN0YXR1cyA9PT0gJ3NtYWxsaWZpZWRtYXgnKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMub25iZWZvcmV1bnNtYWxsaWZ5ICYmIG9wdHMub25iZWZvcmV1bnNtYWxsaWZ5LmNhbGwoc2VsZiwgc2VsZikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoanNwYW5lbGJlZm9yZXVuc21hbGxpZnkpO1xuICAgICAgICAgICAgICAgIHNlbGYuc3R5bGUub3ZlcmZsb3cgPSAndmlzaWJsZSc7XG4gICAgICAgICAgICAgICAganNQYW5lbC5mcm9udChzZWxmKTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxmLnN0YXR1cyA9PT0gJ3NtYWxsaWZpZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3R5bGUuaGVpZ2h0ID0gc2VsZi5jdXJyZW50RGF0YS5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0Q29udHJvbHMoWycuanNQYW5lbC1idG4tbm9ybWFsaXplJywgJy5qc1BhbmVsLWJ0bi1zbWFsbGlmeXJldiddKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGF0dXMgPSAnbm9ybWFsaXplZCc7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoanNwYW5lbG5vcm1hbGl6ZWQpO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGpzcGFuZWxzdGF0dXNjaGFuZ2UpO1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5vbnN0YXR1c2NoYW5nZSAmJiBvcHRzLm9uc3RhdHVzY2hhbmdlLmNhbGwoc2VsZiwgc2VsZikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZi5zdGF0dXMgPT09ICdzbWFsbGlmaWVkbWF4Jykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm1heGltaXplKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxmLnN0YXR1cyA9PT0gJ21pbmltaXplZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ub3JtYWxpemUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAob3B0cy5vbnVuc21hbGxpZmllZCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRzLm9udW5zbWFsbGlmaWVkLmNhbGwoc2VsZiwgc2VsZik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLmRyYWdpdCA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgICAgIHZhciBkcmFnaXRPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwganNQYW5lbC5kZWZhdWx0cy5kcmFnaXQsIG9wdHMuZHJhZ2l0KSxcbiAgICAgICAgICAgICAgICBoYW5kbGVzID0gc2VsZi5xdWVyeVNlbGVjdG9yQWxsKGRyYWdpdE9wdGlvbnMuaGFuZGxlcyk7XG4gICAgICAgICAgICBpZiAoc3RyaW5nID09PSAnZGlzYWJsZScpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVzLmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZSkge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGUuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcy5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLnJlc2l6ZWl0ID0gZnVuY3Rpb24gKHN0cmluZykge1xuICAgICAgICAgICAgdmFyIGhhbmRsZXMgPSBzZWxmLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZScpO1xuICAgICAgICAgICAgaWYgKHN0cmluZyA9PT0gJ2Rpc2FibGUnKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcy5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhhbmRsZXMuZm9yRWFjaChmdW5jdGlvbiAoaGFuZGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZS5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gb3B0aW9uLmlkXG4gICAgICAgIHNlbGYuaWQgPSBvcHRzLmlkO1xuXG4gICAgICAgIC8vIG9wdGlvbi5wYW5lbHR5cGUgY2xhc3NuYW1lXG4gICAgICAgIHNlbGYuY2xhc3NMaXN0LmFkZCgnanNQYW5lbC0nICsgb3B0cy5wYW5lbHR5cGUpO1xuXG4gICAgICAgIC8vIHNldCB6LWluZGV4IGFuZCBwYW5lbHR5cGUgY2xhc3NcbiAgICAgICAgaWYgKG9wdHMucGFuZWx0eXBlID09PSAnc3RhbmRhcmQnKSB7XG4gICAgICAgICAgICBzZWxmLnN0eWxlLnpJbmRleCA9IHRoaXMuemkubmV4dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3B0aW9uLmNvbnRhaW5lclxuICAgICAgICBwYW5lbENvbnRhaW5lci5hcHBlbmQoc2VsZik7XG5cbiAgICAgICAgLy8gb3B0aW9uLnRoZW1lXG4gICAgICAgIHNlbGYuc2V0VGhlbWUob3B0cy50aGVtZSk7XG5cbiAgICAgICAgLy8gb3B0aW9uLmJveFNoYWRvd1xuICAgICAgICBpZiAob3B0cy5ib3hTaGFkb3cpIHtcbiAgICAgICAgICAgIHNlbGYuY2xhc3NMaXN0LmFkZCgnanNQYW5lbC1kZXB0aC0nICsgb3B0cy5ib3hTaGFkb3cpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogb3B0aW9uLmhlYWRlclJlbW92ZSxcclxuICAgICAgICAgb3B0aW9uLmljb25mb250LFxyXG4gICAgICAgICBvcHRpb24uaGVhZGVyQ29udHJvbHMsXHJcbiAgICAgICAgIG9wdGlvbi5oZWFkZXJMb2dvLFxyXG4gICAgICAgICBvcHRpb24uaGVhZGVyVGl0bGVcclxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKCFvcHRzLmhlYWRlclJlbW92ZSkge1xuICAgICAgICAgICAgaWYgKG9wdHMuaGVhZGVyTG9nbykge1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0SGVhZGVyTG9nbyhvcHRzLmhlYWRlckxvZ28pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5zZXRJY29uZm9udChvcHRzLmljb25mb250KTtcbiAgICAgICAgICAgIHNlbGYuc2V0SGVhZGVyVGl0bGUob3B0cy5oZWFkZXJUaXRsZSk7XG4gICAgICAgICAgICBzZWxmLnNldEhlYWRlckNvbnRyb2xzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLnNldEhlYWRlclJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3B0aW9uLmhlYWRlclRvb2xiYXJcbiAgICAgICAgaWYgKG9wdHMuaGVhZGVyVG9vbGJhcikge1xuICAgICAgICAgICAgc2VsZi5hZGRUb29sYmFyKHNlbGYuaGVhZGVydG9vbGJhciwgb3B0cy5oZWFkZXJUb29sYmFyKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBvcHRpb24uZm9vdGVyVG9vbGJhclxuICAgICAgICBpZiAob3B0cy5mb290ZXJUb29sYmFyKSB7XG4gICAgICAgICAgICBzZWxmLmFkZFRvb2xiYXIoc2VsZi5mb290ZXIsIG9wdHMuZm9vdGVyVG9vbGJhcik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvcHRpb24uY29udGVudFxuICAgICAgICBpZiAob3B0cy5jb250ZW50KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdHMuY29udGVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIG9wdHMuY29udGVudC5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0cy5jb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHNlbGYuY29udGVudC5pbm5lckhUTUwgPSBvcHRzLmNvbnRlbnQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuY29udGVudC5hcHBlbmQob3B0cy5jb250ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG9wdGlvbi5jb250ZW50QWpheFxuICAgICAgICBpZiAob3B0cy5jb250ZW50QWpheCkge1xuICAgICAgICAgICAgdGhpcy5hamF4KHNlbGYpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3B0aW9uLmNvbnRlbnRGZXRjaFxuICAgICAgICBpZiAob3B0cy5jb250ZW50RmV0Y2gpIHtcbiAgICAgICAgICAgIHRoaXMuZmV0Y2goc2VsZik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvcHRpb24ucnRsXG4gICAgICAgIGlmIChvcHRzLnJ0bCkge1xuICAgICAgICAgICAgc2VsZi5zZXRSdGwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG9wdGlvbi5zaXplIC0tIHNob3VsZCBiZSBhZnRlciBvcHRpb24udGhlbWVcbiAgICAgICAgc2VsZi5zZXRTaXplKCk7XG5cbiAgICAgICAgLy8gb3B0aW9uLnBvc2l0aW9uXG4gICAgICAgIHNlbGYuc3RhdHVzID0gJ25vcm1hbGl6ZWQnO1xuICAgICAgICAvLyBpZiBvcHRpb24ucG9zaXRpb24gZXZhbHVhdGVzIHRvIGZhbHNlIHBhbmVsIHdpbGwgbm90IGJlIHBvc2l0aW9uZWQgYXQgYWxsXG4gICAgICAgIGlmIChvcHRzLnBvc2l0aW9uIHx8IG9wdHMucG9zaXRpb24gIT09ICdjdXJzb3InKSB7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uKHNlbGYsIG9wdHMucG9zaXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGpzcGFuZWxub3JtYWxpemVkKTtcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsc3RhdHVzY2hhbmdlKTtcbiAgICAgICAgaWYgKG9wdHMub25zdGF0dXNjaGFuZ2UgJiYgb3B0cy5vbnN0YXR1c2NoYW5nZS5jYWxsKHNlbGYsIHNlbGYpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5jYWxjU2l6ZUZhY3RvcnMoKTtcblxuICAgICAgICAvLyBvcHRpb24uYW5pbWF0ZUluXG4gICAgICAgIGlmIChvcHRzLmFuaW1hdGVJbikge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIGNsYXNzIGFnYWluIG9uIGFuaW1hdGlvbmVuZCwgb3RoZXJ3aXNlIG9wYWNpdHkgZG9lc24ndCBjaGFuZ2Ugd2hlbiBwYW5lbCBpcyBkcmFnZ2VkXG4gICAgICAgICAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5yZW1DbGFzcyhzZWxmLCBvcHRzLmFuaW1hdGVJbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuc2V0Q2xhc3Moc2VsZiwgb3B0cy5hbmltYXRlSW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3B0aW9uLmRyYWdpdCBBTkQgb3B0aW9uLnJlc2l6ZWl0IEFORCBvcHRpb24uc3luY01hcmdpbnNcbiAgICAgICAgaWYgKG9wdHMuc3luY01hcmdpbnMpIHtcbiAgICAgICAgICAgIHZhciBjb250YWlubWVudCA9IHRoaXMucE9jb250YWlubWVudChvcHRzLm1heGltaXplZE1hcmdpbik7XG4gICAgICAgICAgICBpZiAob3B0cy5kcmFnaXQpIHtcbiAgICAgICAgICAgICAgICBvcHRzLmRyYWdpdC5jb250YWlubWVudCA9IGNvbnRhaW5tZW50O1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLmRyYWdpdC5zbmFwKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdHMuZHJhZ2l0LnNuYXAuY29udGFpbm1lbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRzLnJlc2l6ZWl0KSB7XG4gICAgICAgICAgICAgICAgb3B0cy5yZXNpemVpdC5jb250YWlubWVudCA9IGNvbnRhaW5tZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRzLmRyYWdpdCkge1xuICAgICAgICAgICAgdGhpcy5kcmFnaXQoc2VsZiwgb3B0cy5kcmFnaXQpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0b3AnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGlmIChlLmRldGFpbCA9PT0gc2VsZi5pZCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbGNTaXplRmFjdG9ycygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYudGl0bGViYXIuc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdHMucmVzaXplaXQpIHtcbiAgICAgICAgICAgIHRoaXMucmVzaXplaXQoc2VsZiwgb3B0cy5yZXNpemVpdCk7XG4gICAgICAgICAgICB2YXIgc3RhcnRzdGF0dXMgPSB2b2lkIDA7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdyZXNpemVzdGFydCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUuZGV0YWlsID09PSBzZWxmLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0c3RhdHVzID0gc2VsZi5zdGF0dXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplc3RvcCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUuZGV0YWlsID09PSBzZWxmLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoc3RhcnRzdGF0dXMgPT09ICdzbWFsbGlmaWVkJyB8fCBzdGFydHN0YXR1cyA9PT0gJ3NtYWxsaWZpZWRtYXgnIHx8IHN0YXJ0c3RhdHVzID09PSAnbWF4aW1pemVkJykgJiYgcGFyc2VGbG9hdChzZWxmLnN0eWxlLmhlaWdodCkgPiBwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNlbGYuaGVhZGVyKS5oZWlnaHQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldENvbnRyb2xzKFsnLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZScsICcuanNQYW5lbC1idG4tc21hbGxpZnlyZXYnXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXR1cyA9ICdub3JtYWxpemVkJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoanNwYW5lbG5vcm1hbGl6ZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsc3RhdHVzY2hhbmdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLm9uc3RhdHVzY2hhbmdlICYmIG9wdHMub25zdGF0dXNjaGFuZ2UuY2FsbChzZWxmLCBzZWxmKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2FsY1NpemVGYWN0b3JzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpbml0aWFsaXplIHNlbGYuY3VycmVudERhdGEgLSBtdXN0IGJlIGFmdGVyIG9wdGlvbnMgcG9zaXRpb24gJiBzaXplXG4gICAgICAgIHNlbGYuc2F2ZUN1cnJlbnREaW1lbnNpb25zKCk7XG4gICAgICAgIHNlbGYuc2F2ZUN1cnJlbnRQb3NpdGlvbigpO1xuXG4gICAgICAgIC8vIG9wdGlvbi5zZXRTdGF0dXNcbiAgICAgICAgaWYgKG9wdHMuc2V0U3RhdHVzKSB7XG4gICAgICAgICAgICB2YXIgbmV3U3RhdHVzID0gb3B0cy5zZXRTdGF0dXM7XG4gICAgICAgICAgICBpZiAobmV3U3RhdHVzID09PSAnc21hbGxpZmllZG1heCcpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm1heGltaXplKCkuc21hbGxpZnkoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3U3RhdHVzID09PSAnc21hbGxpZmllZCcpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNtYWxsaWZ5KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBmdW5jID0gbmV3U3RhdHVzLnN1YnN0cigwLCBuZXdTdGF0dXMubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgc2VsZltmdW5jXSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3B0aW9uLmF1dG9jbG9zZVxuICAgICAgICBpZiAob3B0cy5hdXRvY2xvc2UpIHtcbiAgICAgICAgICAgIGNsb3NldGltZXIgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYpIHNlbGYuY2xvc2UoKTtcbiAgICAgICAgICAgIH0sIG9wdHMuYXV0b2Nsb3NlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZyb250IHBhbmVsIG9uIG1vdXNlZG93blxuICAgICAgICB0aGlzLnBvaW50ZXJkb3duLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcihpdGVtLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGlmICghZS50YXJnZXQuY2xvc2VzdCgnLmpzUGFuZWwtYnRuLWNsb3NlJykgJiYgIWUudGFyZ2V0LmNsb3Nlc3QoJy5qc1BhbmVsLWJ0bi1taW5pbWl6ZScpICYmIG9wdHMucGFuZWx0eXBlID09PSAnc3RhbmRhcmQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZnJvbnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIG9wdGlvbi5vbndpbmRvd3Jlc2l6ZVxuICAgICAgICBpZiAob3B0cy5vbndpbmRvd3Jlc2l6ZSkge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSB3aW5kb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2VlIGh0dHBzOi8vYnVncy5qcXVlcnl1aS5jb20vdGlja2V0Lzc1MTRcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmFtID0gb3B0cy5vbndpbmRvd3Jlc2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9IHNlbGYuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50U3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoc2VsZi5wYXJlbnROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ21heGltaXplZCcgJiYgcGFyYW0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubWF4aW1pemUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09ICdub3JtYWxpemVkJyB8fCBzdGF0dXMgPT09ICdzbWFsbGlmaWVkJyB8fCBzdGF0dXMgPT09ICdtYXhpbWl6ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHBhcmFtID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW0uY2FsbChzZWxmLCBlLCBzZWxmKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdHlsZS5sZWZ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbCA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuY29udGFpbmVyID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsID0gKGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggLSBwYXJzZUZsb2F0KHNlbGYuc3R5bGUud2lkdGgpKSAqIHNlbGYuaGY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsID0gKHBhcnNlRmxvYXQocGFyZW50U3R5bGVzLndpZHRoKSAtIHBhcnNlRmxvYXQoc2VsZi5zdHlsZS53aWR0aCkpICogc2VsZi5oZjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbCA8PSAwID8gMCA6IGwgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0eWxlLnRvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmNvbnRhaW5lciA9PT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdCA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLSBwYXJzZUZsb2F0KHNlbGYuY3VycmVudERhdGEuaGVpZ2h0KSkgKiBzZWxmLnZmO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdCA9IChwYXJzZUZsb2F0KHBhcmVudFN0eWxlcy5oZWlnaHQpIC0gcGFyc2VGbG9hdChzZWxmLmN1cnJlbnREYXRhLmhlaWdodCkpICogc2VsZi52ZjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdCA8PSAwID8gMCA6IHQgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdpdGhvdXQgdGhpcyBoYW5kbGVyIGNvbnRlbnQgc2VjdGlvbiB3b3VsZCBoYXZlIHBvaW50ZXJFdmVudHMgPSBub25lIHdoZW4gY2xpY2tpbmcgaGVhZGVyIHNlY3Rpb24gKHNlZSBkcmFnaXQpXG4gICAgICAgIHRoaXMucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcihpdGVtLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jb250ZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnaW5oZXJpdCc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gb3B0aW9uLmNhbGxiYWNrXG4gICAgICAgIGlmIChvcHRzLmNhbGxiYWNrICYmIEFycmF5LmlzQXJyYXkob3B0cy5jYWxsYmFjaykpIHtcbiAgICAgICAgICAgIG9wdHMuY2FsbGJhY2suZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdHMuY2FsbGJhY2spIHtcbiAgICAgICAgICAgIG9wdHMuY2FsbGJhY2suY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnN0cnV0b3IgY2FsbGJhY2tcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICBjYi5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqc3BhbmVsbG9hZGVkKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfVxufTtcblxuLy8gaW5pdGlhbGl6ZSB6LWluZGV4IGdlbmVyYXRvciAobmVlZHMgdG8gYmUgc2VwZXJhdGUgYmVjYXVzZSBqc1BhbmVsIGlzIG5vdCBkZWZpbmVkIHlldCB3aGVuIHB1dHRpbmcgaXQgaW5zaWRlIGpzUGFuZWwgPSB7IC4uLiB9KVxuanNQYW5lbC56aSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3RhcnRWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoganNQYW5lbC56aUJhc2U7XG5cbiAgICB2YXIgdmFsID0gc3RhcnRWYWx1ZTtcbiAgICByZXR1cm4ge1xuICAgICAgICBuZXh0OiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbCsrO1xuICAgICAgICB9XG4gICAgfTtcbn0oKTtcblxuaWYgKHdpbmRvdy5Qb2ludGVyRXZlbnQpIHtcbiAgICBqc1BhbmVsLnBvaW50ZXJkb3duID0gWydwb2ludGVyZG93biddO1xuICAgIGpzUGFuZWwucG9pbnRlcm1vdmUgPSBbJ3BvaW50ZXJtb3ZlJ107XG4gICAganNQYW5lbC5wb2ludGVydXAgPSBbJ3BvaW50ZXJ1cCddO1xufSBlbHNlIHtcbiAgICBpZiAoJ29udG91Y2hlbmQnIGluIHdpbmRvdykge1xuICAgICAgICBqc1BhbmVsLnBvaW50ZXJkb3duID0gWyd0b3VjaHN0YXJ0JywgJ21vdXNlZG93biddO1xuICAgICAgICBqc1BhbmVsLnBvaW50ZXJtb3ZlID0gWyd0b3VjaG1vdmUnLCAnbW91c2Vtb3ZlJ107XG4gICAgICAgIGpzUGFuZWwucG9pbnRlcnVwID0gWyd0b3VjaGVuZCcsICdtb3VzZXVwJ107XG4gICAgfSBlbHNlIHtcbiAgICAgICAganNQYW5lbC5wb2ludGVyZG93biA9IFsnbW91c2Vkb3duJ107XG4gICAgICAgIGpzUGFuZWwucG9pbnRlcm1vdmUgPSBbJ21vdXNlbW92ZSddO1xuICAgICAgICBqc1BhbmVsLnBvaW50ZXJ1cCA9IFsnbW91c2V1cCddO1xuICAgIH1cbn1cblxuLy8gY2xvc2VPbkVzY2FwZVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJyB8fCBlLmNvZGUgPT09ICdFc2MnIHx8IGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAganNQYW5lbC5nZXRQYW5lbHMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdqc1BhbmVsJyk7XG4gICAgICAgIH0pLnNvbWUoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIGlmIChpdGVtLm9wdGlvbnMuY2xvc2VPbkVzY2FwZSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xvc2UoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxufSwgZmFsc2UpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZGV2dG9vbHMvd2ViL2pzcGFuZWwuanNcbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2RldnRvb2xzL3dlYi9qc3BhbmVsLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFVQUFBQ0ZDQVlBQUFDVDN6STlBQUFBQm1KTFIwUUEvd0QvQVArZ3ZhZVRBQUFBQ1hCSVdYTUFBQXNUQUFBTEV3RUFtcHdZQUFBQUIzUkpUVVVINFFRZUNoNEFqVnhlNGdBQUFCbDBSVmgwUTI5dGJXVnVkQUJEY21WaGRHVmtJSGRwZEdnZ1IwbE5VRmVCRGhjQUFBQStTVVJCVkVqSFkyUmdZUGpQZ0FWZ0NESmhVOFdFUy9VSTBNNklwcEp4Tk9qSURUb3liUjhWSEJVY01vS2phWDVVY0RUTmoxYVJvNjJMQVdsZEFBQzhFQzJ0QUVCWVhBQUFBQUJKUlU1RXJrSmdnZz09XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9kZXZ0b29scy93ZWIvcnVsZXIucG5nXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9kZXZ0b29scy93ZWIvcnVsZXIucG5nXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IFRlc3REZXZpY2VNYW5hZ2VyUGFuZWwgfSBmcm9tIFwiLi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsXCI7XG5pbXBvcnQgeyBMb2dQYW5lbCB9IGZyb20gXCIuL0xvZ1BhbmVsXCI7XG5pbXBvcnQgeyBCdXR0cGx1Z1NlcnZlciB9IGZyb20gXCIuLi8uLi9pbmRleFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gQ3JlYXRlTG9nZ2VyUGFuZWwoKSB7XG4gIExvZ1BhbmVsLlNob3dMb2dQYW5lbCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQ3JlYXRlRGV2aWNlTWFuYWdlclBhbmVsKGJ1dHRwbHVnU2VydmVyOiBCdXR0cGx1Z1NlcnZlcikge1xuICBUZXN0RGV2aWNlTWFuYWdlclBhbmVsLlNob3dUZXN0RGV2aWNlTWFuYWdlclBhbmVsKGJ1dHRwbHVnU2VydmVyKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kZXZ0b29scy93ZWIvdXRpbHMud2ViLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==