(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["buttplug-commonjs"] = factory();
	else
		root["Buttplug"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dependencies/buttplug-schema/schema/buttplug-schema.json":
/***/ (function(module) {

module.exports = {"$schema":"http://json-schema.org/draft-06/schema#","title":"Buttplug Message Schema","version":1,"description":"The JSON Protocol format for the Buttplug Protocol.","components":{"Id":{"description":"User-set id for the message. 0 denotes system message and is reserved.","type":"integer","minimum":0,"maximum":4294967295},"SystemId":{"description":"Used for non-direct-reply messages that can only be sent from server to client, using the reserved system message Id of 0.","type":"integer","minimum":0,"maximum":0},"DeviceName":{"description":"Name of the device","type":"string"},"DeviceIndex":{"description":"Index used for referencing the device in device messages.","type":"integer","minimum":0},"IdMessage":{"properties":{"Id":{"$ref":"#/components/Id"}},"additionalProperties":false,"minProperties":1,"maxProperties":1,"required":["Id"]},"DeviceMessages":{"description":"A list of the messages a device will accept on this server implementation.","type":"array","items":{"type":"string","minItems":1}},"DeviceMessagesEx":{"description":"A list of the messages a device will accept on this server implementation.","type":"object","items":{"description":"A list of the messages attributes.","type":"object","properties":{"FeatureCount":{"$ref":"#/components/FeatureCount"}},"additionalProperties":true,"minItems":1}},"SystemIdMessage":{"description":"Message sent by the server that is not in direct reply to a message send from the client, and always uses system Id.","properties":{"Id":{"$ref":"#/components/SystemId"}},"additionalProperties":false,"minProperties":1,"maxProperties":1,"required":["Id"]},"DeviceIndexMessage":{"properties":{"Id":{"$ref":"#/components/Id"},"DeviceIndex":{"$ref":"#/components/DeviceIndex"}},"additionalProperties":false,"minProperties":2,"maxProperties":2,"required":["Id","DeviceIndex"]},"FeatureCount":{"description":"Number of features on device.","type":"integer","minimum":0}},"messages":{"Ok":{"type":"object","description":"Signifies successful processing of the message indicated by the id.","anyOf":[{"$ref":"#/components/IdMessage"}]},"Ping":{"type":"object","description":"Connection keep-alive message.","anyOf":[{"$ref":"#/components/IdMessage"}]},"Error":{"type":"object","description":"Signifies the server encountered an error while processing the message indicated by the id.","properties":{"Id":{"$ref":"#/components/Id"},"ErrorMessage":{"type":"string"},"ErrorCode":{"type":"number","minimum":0,"maximum":4}},"additionalProperties":false,"minProperties":3,"maxProperties":3,"required":["Id","ErrorMessage","ErrorCode"]},"Test":{"type":"object","description":"Used for connection/application testing. Causes server to echo back the string sent. Sending string of 'Error' will result in a server error. ","properties":{"Id":{"$ref":"#/components/Id"},"TestString":{"description":"String to be echo'd back from server. Setting this to 'Error' will cause an error to be thrown.","type":"string"}},"minProperties":2,"maxProperties":2,"additionalProperties":false,"required":["Id","TestString"]},"DeviceList":{"type":"object","description":"List of all available devices known to the system.","properties":{"Id":{"$ref":"#/components/Id"},"Devices":{"description":"Array of device ids and names.","type":"array","items":{"properties":{"DeviceName":{"$ref":"#/components/DeviceName"},"DeviceIndex":{"$ref":"#/components/DeviceIndex"},"DeviceMessages":{"oneOf":[{"$ref":"#/components/DeviceMessages"},{"$ref":"#/components/DeviceMessagesEx"}]}},"minProperties":3,"maxProperties":3,"additionalProperties":false,"required":["DeviceName","DeviceIndex","DeviceMessages"]}}},"minProperties":2,"maxProperties":2,"additionalProperties":false,"required":["Id","Devices"]},"DeviceAdded":{"type":"object","description":"Notifies client that a device of a certain type has been added to the server.","properties":{"Id":{"$ref":"#/components/SystemId"},"DeviceName":{"$ref":"#/components/DeviceName"},"DeviceIndex":{"$ref":"#/components/DeviceIndex"},"DeviceMessages":{"oneOf":[{"$ref":"#/components/DeviceMessages"},{"$ref":"#/components/DeviceMessagesEx"}]}},"minProperties":4,"maxProperties":4,"additionalProperties":false,"required":["Id","DeviceName","DeviceIndex","DeviceMessages"]},"DeviceRemoved":{"type":"object","description":"Notifies client that a device of a certain type has been removed from the server.","anyOf":[{"$ref":"#/components/DeviceIndexMessage"}]},"RequestDeviceList":{"type":"object","description":"Request for the server to send a list of devices to the client.","anyOf":[{"$ref":"#/components/IdMessage"}]},"StartScanning":{"type":"object","description":"Request for the server to start scanning for new devices.","anyOf":[{"$ref":"#/components/IdMessage"}]},"StopScanning":{"type":"object","description":"Request for the server to stop scanning for new devices.","anyOf":[{"$ref":"#/components/IdMessage"}]},"ScanningFinished":{"type":"object","description":"Server notification to client that scanning has ended.","anyOf":[{"$ref":"#/components/SystemIdMessage"}]},"RequestLog":{"type":"object","description":"Request for server to stream log messages of a certain level to client.","properties":{"Id":{"$ref":"#/components/Id"},"LogLevel":{"description":"Maximum level of log message to receive.","enum":["Off","Fatal","Error","Warn","Info","Debug","Trace"]}},"minProperties":2,"maxProperties":2,"additionalProperties":false,"required":["Id","LogLevel"]},"Log":{"type":"object","description":"Log message from the server.","properties":{"Id":{"$ref":"#/components/SystemId"},"LogLevel":{"description":"Log level of message.","enum":["Off","Fatal","Error","Warn","Info","Debug","Trace"]},"LogMessage":{"description":"Log message from server.","type":"string"}},"minProperties":3,"maxProperties":3,"additionalProperties":false,"required":["Id","LogLevel","LogMessage"]},"RequestServerInfo":{"type":"object","description":"Request server version, and relay client name.","properties":{"Id":{"$ref":"#/components/Id"},"ClientName":{"description":"Name of the client software.","type":"string"},"MessageVersion":{"description":"Message template version of the client software.","type":"integer","minimum":0}},"minProperties":2,"maxProperties":3,"additionalProperties":false,"required":["Id","ClientName"]},"ServerInfo":{"type":"object","description":"Server version information, in Major.Minor.Build format.","properties":{"Id":{"$ref":"#/components/Id"},"ServerName":{"description":"Name of the server. Can be 0-length.","type":"string"},"MessageVersion":{"description":"Message template version of the server software.","type":"integer","minimum":0},"MajorVersion":{"description":"Major version of server.","type":"integer","minimum":0},"MinorVersion":{"description":"Minor version of server.","type":"integer","minimum":0},"BuildVersion":{"description":"Build version of server.","type":"integer","minimum":0},"MaxPingTime":{"description":"Maximum time (in milliseconds) the server will wait between ping messages from client before shutting down.","type":"integer","minimum":0}},"minProperties":7,"maxProperties":7,"additionalProperties":false,"required":["Id","MajorVersion","MinorVersion","BuildVersion","MessageVersion","MaxPingTime","ServerName"]},"FleshlightLaunchFW12Cmd":{"type":"object","description":"Sends speed and position command to the Fleshlight Launch Device denoted by the device index.","properties":{"Id":{"$ref":"#/components/Id"},"DeviceIndex":{"$ref":"#/components/DeviceIndex"},"Speed":{"description":"Speed at which to move to designated position.","type":"integer","minimum":0,"maximum":99},"Position":{"description":"Position to which to move Fleshlight.","type":"integer","minimum":0,"maximum":99}},"minProperties":4,"maxProperties":4,"additionalProperties":false,"required":["Id","DeviceIndex","Speed","Position"]},"LovenseCmd":{"type":"object","description":"Sends a command string to a Lovense device. Command string will be verified by sender.","properties":{"Id":{"$ref":"#/components/Id"},"DeviceIndex":{"$ref":"#/components/DeviceIndex"},"Command":{"description":"Command to send to Lovense device.","type":"string"}},"minProperties":3,"maxProperties":3,"additionalProperties":false,"required":["Id","DeviceIndex","Command"]},"SingleMotorVibrateCmd":{"type":"object","description":"Sends a vibrate command to a device that supports vibration.","properties":{"Id":{"$ref":"#/components/Id"},"DeviceIndex":{"$ref":"#/components/DeviceIndex"},"Speed":{"description":"Device vibration speed (floating point, 0 < x < 1), stepping will be device specific.","type":"number","minimum":0,"maximum":1}},"minProperties":3,"maxProperties":3,"additionalProperties":false,"required":["Id","DeviceIndex","Speed"]},"RawCmd":{"type":"object","description":"Sends a raw byte array to a device. Should only be used for testing/development.","properties":{"Id":{"$ref":"#/components/Id"},"DeviceIndex":{"$ref":"#/components/DeviceIndex"},"Command":{"description":"Raw byte string to send to device.","type":"array","items":{"type":"integer","minimum":0,"maximum":255,"minItems":1}}},"minProperties":3,"maxProperties":3,"additionalProperties":false,"required":["Id","DeviceIndex","Command"]},"KiirooCmd":{"type":"object","description":"Sends a raw byte string to a Kiiroo Onyx/Pearl device.","properties":{"Id":{"$ref":"#/components/Id"},"DeviceIndex":{"$ref":"#/components/DeviceIndex"},"Command":{"description":"Command to send to Kiiroo device.","type":"string"}},"minProperties":3,"maxProperties":3,"additionalProperties":false,"required":["Id","DeviceIndex","Command"]},"VorzeA10CycloneCmd":{"type":"object","description":"Sends a raw byte string to a Kiiroo Onyx/Pearl device.","properties":{"Id":{"$ref":"#/components/Id"},"DeviceIndex":{"$ref":"#/components/DeviceIndex"},"Speed":{"description":"Rotation speed command for the Cyclone.","type":"integer","minimum":0,"maximum":100},"Clockwise":{"description":"True for clockwise rotation (in relation to device facing user), false for Counter-clockwise","type":"boolean"}},"minProperties":4,"maxProperties":4,"additionalProperties":false,"required":["Id","DeviceIndex","Speed","Clockwise"]},"StopDeviceCmd":{"type":"object","description":"Stops the all actions currently being taken by a device.","properties":{"Id":{"$ref":"#/components/Id"},"DeviceIndex":{"$ref":"#/components/DeviceIndex"}},"minProperties":2,"maxProperties":2,"additionalProperties":false,"required":["Id","DeviceIndex"]},"StopAllDevices":{"type":"object","description":"Stops all actions currently being taken by all connected devices.","anyOf":[{"$ref":"#/components/IdMessage"}]},"VibrateCmd":{"type":"object","description":"Sends a vibrate command to a device that supports vibration.","properties":{"Id":{"$ref":"#/components/Id"},"DeviceIndex":{"$ref":"#/components/DeviceIndex"},"Speeds":{"description":"Device vibration speeds (floating point, 0 < x < 1) keyed on vibrator number, stepping will be device specific.","type":"array","items":{"Index":{"description":"Vibrator number.","type":"integer","minimum":0},"Speed":{"description":"Vibration speed (floating point, 0 < x < 1), stepping will be device specific.","type":"number","minimum":0,"maximum":1}},"minProperties":2,"maxProperties":2,"additionalProperties":false,"required":["Index","Speed"]}},"minProperties":3,"maxProperties":3,"additionalProperties":false,"required":["Id","DeviceIndex","Speeds"]},"RotateCmd":{"type":"object","description":"Sends a rotate command to a device that supports rotation.","properties":{"Id":{"$ref":"#/components/Id"},"DeviceIndex":{"$ref":"#/components/DeviceIndex"},"Rotations":{"description":"Device rotation speeds (floating point, 0 < x < 1) keyed on rotator number, stepping will be device specific.","type":"array","items":{"Index":{"description":"Rotator number.","type":"integer","minimum":0},"Speed":{"description":"Rotation speed (floating point, 0 < x < 1), stepping will be device specific.","type":"number","minimum":0,"maximum":1},"Clockwise":{"description":"Rotation direction (boolean). Not all devices have a concept of actual clockwise.","type":"boolean"}},"minProperties":3,"maxProperties":3,"additionalProperties":false,"required":["Index","Speed","Clockwise"]}},"minProperties":3,"maxProperties":3,"additionalProperties":false,"required":["Id","DeviceIndex","Rotations"]},"LinearCmd":{"type":"object","description":"Sends a linear movement command to a device that supports linear movements.","properties":{"Id":{"$ref":"#/components/Id"},"DeviceIndex":{"$ref":"#/components/DeviceIndex"},"Vectors":{"description":"Device linear movement times (milliseconds) and positions (floating point, 0 < x < 1) keyed on linear actuator number, stepping will be device specific.","type":"array","items":{"Index":{"description":"Linear actuator number.","type":"integer","minimum":0},"Duration":{"description":"Linear movement time in milliseconds.","type":"number","minimum":0},"Position":{"description":"Linear movement position (floating point, 0 < x < 1), stepping will be device specific.","type":"number","minimum":0,"maximum":1}},"minProperties":3,"maxProperties":3,"additionalProperties":false,"required":["Index","Speed","Position"]}},"minProperties":3,"maxProperties":3,"additionalProperties":false,"required":["Id","DeviceIndex","Vectors"]}},"type":"array","items":{"title":"Messages","description":"One or more messages validated by the Buttplug Message schema list.","properties":{"Ok":{"$ref":"#/messages/Ok"},"Error":{"$ref":"#/messages/Error"},"Ping":{"$ref":"#/messages/Ping"},"Test":{"$ref":"#/messages/Test"},"DeviceList":{"$ref":"#/messages/DeviceList"},"DeviceAdded":{"$ref":"#/messages/DeviceAdded"},"DeviceRemoved":{"$ref":"#/messages/DeviceRemoved"},"RequestDeviceList":{"$ref":"#/messages/RequestDeviceList"},"StopDeviceCmd":{"$ref":"#/messages/StopDeviceCmd"},"StopAllDevices":{"$ref":"#/messages/StopAllDevices"},"StartScanning":{"$ref":"#/messages/StartScanning"},"StopScanning":{"$ref":"#/messages/StopScanning"},"ScanningFinished":{"$ref":"#/messages/ScanningFinished"},"RequestLog":{"$ref":"#/messages/RequestLog"},"Log":{"$ref":"#/messages/Log"},"RequestServerInfo":{"$ref":"#/messages/RequestServerInfo"},"ServerInfo":{"$ref":"#/messages/ServerInfo"},"FleshlightLaunchFW12Cmd":{"$ref":"#/messages/FleshlightLaunchFW12Cmd"},"LovenseCmd":{"$ref":"#/messages/LovenseCmd"},"SingleMotorVibrateCmd":{"$ref":"#/messages/SingleMotorVibrateCmd"},"KiirooCmd":{"$ref":"#/messages/KiirooCmd"},"RawCmd":{"$ref":"#/messages/RawCmd"},"VorzeA10CycloneCmd":{"$ref":"#/messages/VorzeA10CycloneCmd"},"VibrateCmd":{"$ref":"#/messages/VibrateCmd"},"RotateCmd":{"$ref":"#/messages/RotateCmd"},"LinearCmd":{"$ref":"#/messages/LinearCmd"}},"additionalProperties":false,"minProperties":1,"maxProperties":1},"minItems":1,"additionalProperties":false};

/***/ }),

/***/ "./node_modules/ajv/lib/ajv.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var compileSchema = __webpack_require__("./node_modules/ajv/lib/compile/index.js")
  , resolve = __webpack_require__("./node_modules/ajv/lib/compile/resolve.js")
  , Cache = __webpack_require__("./node_modules/ajv/lib/cache.js")
  , SchemaObject = __webpack_require__("./node_modules/ajv/lib/compile/schema_obj.js")
  , stableStringify = __webpack_require__("./node_modules/fast-json-stable-stringify/index.js")
  , formats = __webpack_require__("./node_modules/ajv/lib/compile/formats.js")
  , rules = __webpack_require__("./node_modules/ajv/lib/compile/rules.js")
  , $dataMetaSchema = __webpack_require__("./node_modules/ajv/lib/data.js")
  , util = __webpack_require__("./node_modules/ajv/lib/compile/util.js");

module.exports = Ajv;

Ajv.prototype.validate = validate;
Ajv.prototype.compile = compile;
Ajv.prototype.addSchema = addSchema;
Ajv.prototype.addMetaSchema = addMetaSchema;
Ajv.prototype.validateSchema = validateSchema;
Ajv.prototype.getSchema = getSchema;
Ajv.prototype.removeSchema = removeSchema;
Ajv.prototype.addFormat = addFormat;
Ajv.prototype.errorsText = errorsText;

Ajv.prototype._addSchema = _addSchema;
Ajv.prototype._compile = _compile;

Ajv.prototype.compileAsync = __webpack_require__("./node_modules/ajv/lib/compile/async.js");
var customKeyword = __webpack_require__("./node_modules/ajv/lib/keyword.js");
Ajv.prototype.addKeyword = customKeyword.add;
Ajv.prototype.getKeyword = customKeyword.get;
Ajv.prototype.removeKeyword = customKeyword.remove;

var errorClasses = __webpack_require__("./node_modules/ajv/lib/compile/error_classes.js");
Ajv.ValidationError = errorClasses.Validation;
Ajv.MissingRefError = errorClasses.MissingRef;
Ajv.$dataMetaSchema = $dataMetaSchema;

var META_SCHEMA_ID = 'http://json-schema.org/draft-07/schema';

var META_IGNORE_OPTIONS = [ 'removeAdditional', 'useDefaults', 'coerceTypes' ];
var META_SUPPORT_DATA = ['/properties'];

/**
 * Creates validator instance.
 * Usage: `Ajv(opts)`
 * @param {Object} opts optional options
 * @return {Object} ajv instance
 */
function Ajv(opts) {
  if (!(this instanceof Ajv)) return new Ajv(opts);
  opts = this._opts = util.copy(opts) || {};
  setLogger(this);
  this._schemas = {};
  this._refs = {};
  this._fragments = {};
  this._formats = formats(opts.format);
  var schemaUriFormat = this._schemaUriFormat = this._formats['uri-reference'];
  this._schemaUriFormatFunc = function (str) { return schemaUriFormat.test(str); };

  this._cache = opts.cache || new Cache;
  this._loadingSchemas = {};
  this._compilations = [];
  this.RULES = rules();
  this._getId = chooseGetId(opts);

  opts.loopRequired = opts.loopRequired || Infinity;
  if (opts.errorDataPath == 'property') opts._errorDataPathProperty = true;
  if (opts.serialize === undefined) opts.serialize = stableStringify;
  this._metaOpts = getMetaSchemaOptions(this);

  if (opts.formats) addInitialFormats(this);
  addDraft6MetaSchema(this);
  if (typeof opts.meta == 'object') this.addMetaSchema(opts.meta);
  addInitialSchemas(this);
}



/**
 * Validate data using schema
 * Schema will be compiled and cached (using serialized JSON as key. [fast-json-stable-stringify](https://github.com/epoberezkin/fast-json-stable-stringify) is used to serialize.
 * @this   Ajv
 * @param  {String|Object} schemaKeyRef key, ref or schema object
 * @param  {Any} data to be validated
 * @return {Boolean} validation result. Errors from the last validation will be available in `ajv.errors` (and also in compiled schema: `schema.errors`).
 */
function validate(schemaKeyRef, data) {
  var v;
  if (typeof schemaKeyRef == 'string') {
    v = this.getSchema(schemaKeyRef);
    if (!v) throw new Error('no schema with key or ref "' + schemaKeyRef + '"');
  } else {
    var schemaObj = this._addSchema(schemaKeyRef);
    v = schemaObj.validate || this._compile(schemaObj);
  }

  var valid = v(data);
  if (v.$async !== true) this.errors = v.errors;
  return valid;
}


/**
 * Create validating function for passed schema.
 * @this   Ajv
 * @param  {Object} schema schema object
 * @param  {Boolean} _meta true if schema is a meta-schema. Used internally to compile meta schemas of custom keywords.
 * @return {Function} validating function
 */
function compile(schema, _meta) {
  var schemaObj = this._addSchema(schema, undefined, _meta);
  return schemaObj.validate || this._compile(schemaObj);
}


/**
 * Adds schema to the instance.
 * @this   Ajv
 * @param {Object|Array} schema schema or array of schemas. If array is passed, `key` and other parameters will be ignored.
 * @param {String} key Optional schema key. Can be passed to `validate` method instead of schema object or id/ref. One schema per instance can have empty `id` and `key`.
 * @param {Boolean} _skipValidation true to skip schema validation. Used internally, option validateSchema should be used instead.
 * @param {Boolean} _meta true if schema is a meta-schema. Used internally, addMetaSchema should be used instead.
 * @return {Ajv} this for method chaining
 */
function addSchema(schema, key, _skipValidation, _meta) {
  if (Array.isArray(schema)){
    for (var i=0; i<schema.length; i++) this.addSchema(schema[i], undefined, _skipValidation, _meta);
    return this;
  }
  var id = this._getId(schema);
  if (id !== undefined && typeof id != 'string')
    throw new Error('schema id must be string');
  key = resolve.normalizeId(key || id);
  checkUnique(this, key);
  this._schemas[key] = this._addSchema(schema, _skipValidation, _meta, true);
  return this;
}


/**
 * Add schema that will be used to validate other schemas
 * options in META_IGNORE_OPTIONS are alway set to false
 * @this   Ajv
 * @param {Object} schema schema object
 * @param {String} key optional schema key
 * @param {Boolean} skipValidation true to skip schema validation, can be used to override validateSchema option for meta-schema
 * @return {Ajv} this for method chaining
 */
function addMetaSchema(schema, key, skipValidation) {
  this.addSchema(schema, key, skipValidation, true);
  return this;
}


/**
 * Validate schema
 * @this   Ajv
 * @param {Object} schema schema to validate
 * @param {Boolean} throwOrLogError pass true to throw (or log) an error if invalid
 * @return {Boolean} true if schema is valid
 */
function validateSchema(schema, throwOrLogError) {
  var $schema = schema.$schema;
  if ($schema !== undefined && typeof $schema != 'string')
    throw new Error('$schema must be a string');
  $schema = $schema || this._opts.defaultMeta || defaultMeta(this);
  if (!$schema) {
    this.logger.warn('meta-schema not available');
    this.errors = null;
    return true;
  }
  var currentUriFormat = this._formats.uri;
  this._formats.uri = typeof currentUriFormat == 'function'
                      ? this._schemaUriFormatFunc
                      : this._schemaUriFormat;
  var valid;
  try { valid = this.validate($schema, schema); }
  finally { this._formats.uri = currentUriFormat; }
  if (!valid && throwOrLogError) {
    var message = 'schema is invalid: ' + this.errorsText();
    if (this._opts.validateSchema == 'log') this.logger.error(message);
    else throw new Error(message);
  }
  return valid;
}


function defaultMeta(self) {
  var meta = self._opts.meta;
  self._opts.defaultMeta = typeof meta == 'object'
                            ? self._getId(meta) || meta
                            : self.getSchema(META_SCHEMA_ID)
                              ? META_SCHEMA_ID
                              : undefined;
  return self._opts.defaultMeta;
}


/**
 * Get compiled schema from the instance by `key` or `ref`.
 * @this   Ajv
 * @param  {String} keyRef `key` that was passed to `addSchema` or full schema reference (`schema.id` or resolved id).
 * @return {Function} schema validating function (with property `schema`).
 */
function getSchema(keyRef) {
  var schemaObj = _getSchemaObj(this, keyRef);
  switch (typeof schemaObj) {
    case 'object': return schemaObj.validate || this._compile(schemaObj);
    case 'string': return this.getSchema(schemaObj);
    case 'undefined': return _getSchemaFragment(this, keyRef);
  }
}


function _getSchemaFragment(self, ref) {
  var res = resolve.schema.call(self, { schema: {} }, ref);
  if (res) {
    var schema = res.schema
      , root = res.root
      , baseId = res.baseId;
    var v = compileSchema.call(self, schema, root, undefined, baseId);
    self._fragments[ref] = new SchemaObject({
      ref: ref,
      fragment: true,
      schema: schema,
      root: root,
      baseId: baseId,
      validate: v
    });
    return v;
  }
}


function _getSchemaObj(self, keyRef) {
  keyRef = resolve.normalizeId(keyRef);
  return self._schemas[keyRef] || self._refs[keyRef] || self._fragments[keyRef];
}


/**
 * Remove cached schema(s).
 * If no parameter is passed all schemas but meta-schemas are removed.
 * If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
 * Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
 * @this   Ajv
 * @param  {String|Object|RegExp} schemaKeyRef key, ref, pattern to match key/ref or schema object
 * @return {Ajv} this for method chaining
 */
function removeSchema(schemaKeyRef) {
  if (schemaKeyRef instanceof RegExp) {
    _removeAllSchemas(this, this._schemas, schemaKeyRef);
    _removeAllSchemas(this, this._refs, schemaKeyRef);
    return this;
  }
  switch (typeof schemaKeyRef) {
    case 'undefined':
      _removeAllSchemas(this, this._schemas);
      _removeAllSchemas(this, this._refs);
      this._cache.clear();
      return this;
    case 'string':
      var schemaObj = _getSchemaObj(this, schemaKeyRef);
      if (schemaObj) this._cache.del(schemaObj.cacheKey);
      delete this._schemas[schemaKeyRef];
      delete this._refs[schemaKeyRef];
      return this;
    case 'object':
      var serialize = this._opts.serialize;
      var cacheKey = serialize ? serialize(schemaKeyRef) : schemaKeyRef;
      this._cache.del(cacheKey);
      var id = this._getId(schemaKeyRef);
      if (id) {
        id = resolve.normalizeId(id);
        delete this._schemas[id];
        delete this._refs[id];
      }
  }
  return this;
}


function _removeAllSchemas(self, schemas, regex) {
  for (var keyRef in schemas) {
    var schemaObj = schemas[keyRef];
    if (!schemaObj.meta && (!regex || regex.test(keyRef))) {
      self._cache.del(schemaObj.cacheKey);
      delete schemas[keyRef];
    }
  }
}


/* @this   Ajv */
function _addSchema(schema, skipValidation, meta, shouldAddSchema) {
  if (typeof schema != 'object' && typeof schema != 'boolean')
    throw new Error('schema should be object or boolean');
  var serialize = this._opts.serialize;
  var cacheKey = serialize ? serialize(schema) : schema;
  var cached = this._cache.get(cacheKey);
  if (cached) return cached;

  shouldAddSchema = shouldAddSchema || this._opts.addUsedSchema !== false;

  var id = resolve.normalizeId(this._getId(schema));
  if (id && shouldAddSchema) checkUnique(this, id);

  var willValidate = this._opts.validateSchema !== false && !skipValidation;
  var recursiveMeta;
  if (willValidate && !(recursiveMeta = id && id == resolve.normalizeId(schema.$schema)))
    this.validateSchema(schema, true);

  var localRefs = resolve.ids.call(this, schema);

  var schemaObj = new SchemaObject({
    id: id,
    schema: schema,
    localRefs: localRefs,
    cacheKey: cacheKey,
    meta: meta
  });

  if (id[0] != '#' && shouldAddSchema) this._refs[id] = schemaObj;
  this._cache.put(cacheKey, schemaObj);

  if (willValidate && recursiveMeta) this.validateSchema(schema, true);

  return schemaObj;
}


/* @this   Ajv */
function _compile(schemaObj, root) {
  if (schemaObj.compiling) {
    schemaObj.validate = callValidate;
    callValidate.schema = schemaObj.schema;
    callValidate.errors = null;
    callValidate.root = root ? root : callValidate;
    if (schemaObj.schema.$async === true)
      callValidate.$async = true;
    return callValidate;
  }
  schemaObj.compiling = true;

  var currentOpts;
  if (schemaObj.meta) {
    currentOpts = this._opts;
    this._opts = this._metaOpts;
  }

  var v;
  try { v = compileSchema.call(this, schemaObj.schema, root, schemaObj.localRefs); }
  finally {
    schemaObj.compiling = false;
    if (schemaObj.meta) this._opts = currentOpts;
  }

  schemaObj.validate = v;
  schemaObj.refs = v.refs;
  schemaObj.refVal = v.refVal;
  schemaObj.root = v.root;
  return v;


  function callValidate() {
    var _validate = schemaObj.validate;
    var result = _validate.apply(null, arguments);
    callValidate.errors = _validate.errors;
    return result;
  }
}


function chooseGetId(opts) {
  switch (opts.schemaId) {
    case 'auto': return _get$IdOrId;
    case 'id': return _getId;
    default: return _get$Id;
  }
}

/* @this   Ajv */
function _getId(schema) {
  if (schema.$id) this.logger.warn('schema $id ignored', schema.$id);
  return schema.id;
}

/* @this   Ajv */
function _get$Id(schema) {
  if (schema.id) this.logger.warn('schema id ignored', schema.id);
  return schema.$id;
}


function _get$IdOrId(schema) {
  if (schema.$id && schema.id && schema.$id != schema.id)
    throw new Error('schema $id is different from id');
  return schema.$id || schema.id;
}


/**
 * Convert array of error message objects to string
 * @this   Ajv
 * @param  {Array<Object>} errors optional array of validation errors, if not passed errors from the instance are used.
 * @param  {Object} options optional options with properties `separator` and `dataVar`.
 * @return {String} human readable string with all errors descriptions
 */
function errorsText(errors, options) {
  errors = errors || this.errors;
  if (!errors) return 'No errors';
  options = options || {};
  var separator = options.separator === undefined ? ', ' : options.separator;
  var dataVar = options.dataVar === undefined ? 'data' : options.dataVar;

  var text = '';
  for (var i=0; i<errors.length; i++) {
    var e = errors[i];
    if (e) text += dataVar + e.dataPath + ' ' + e.message + separator;
  }
  return text.slice(0, -separator.length);
}


/**
 * Add custom format
 * @this   Ajv
 * @param {String} name format name
 * @param {String|RegExp|Function} format string is converted to RegExp; function should return boolean (true when valid)
 * @return {Ajv} this for method chaining
 */
function addFormat(name, format) {
  if (typeof format == 'string') format = new RegExp(format);
  this._formats[name] = format;
  return this;
}


function addDraft6MetaSchema(self) {
  var $dataSchema;
  if (self._opts.$data) {
    $dataSchema = __webpack_require__("./node_modules/ajv/lib/refs/data.json");
    self.addMetaSchema($dataSchema, $dataSchema.$id, true);
  }
  if (self._opts.meta === false) return;
  var metaSchema = __webpack_require__("./node_modules/ajv/lib/refs/json-schema-draft-07.json");
  if (self._opts.$data) metaSchema = $dataMetaSchema(metaSchema, META_SUPPORT_DATA);
  self.addMetaSchema(metaSchema, META_SCHEMA_ID, true);
  self._refs['http://json-schema.org/schema'] = META_SCHEMA_ID;
}


function addInitialSchemas(self) {
  var optsSchemas = self._opts.schemas;
  if (!optsSchemas) return;
  if (Array.isArray(optsSchemas)) self.addSchema(optsSchemas);
  else for (var key in optsSchemas) self.addSchema(optsSchemas[key], key);
}


function addInitialFormats(self) {
  for (var name in self._opts.formats) {
    var format = self._opts.formats[name];
    self.addFormat(name, format);
  }
}


function checkUnique(self, id) {
  if (self._schemas[id] || self._refs[id])
    throw new Error('schema with key or id "' + id + '" already exists');
}


function getMetaSchemaOptions(self) {
  var metaOpts = util.copy(self._opts);
  for (var i=0; i<META_IGNORE_OPTIONS.length; i++)
    delete metaOpts[META_IGNORE_OPTIONS[i]];
  return metaOpts;
}


function setLogger(self) {
  var logger = self._opts.logger;
  if (logger === false) {
    self.logger = {log: noop, warn: noop, error: noop};
  } else {
    if (logger === undefined) logger = console;
    if (!(typeof logger == 'object' && logger.log && logger.warn && logger.error))
      throw new Error('logger must implement log, warn and error methods');
    self.logger = logger;
  }
}


function noop() {}


/***/ }),

/***/ "./node_modules/ajv/lib/cache.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var Cache = module.exports = function Cache() {
  this._cache = {};
};


Cache.prototype.put = function Cache_put(key, value) {
  this._cache[key] = value;
};


Cache.prototype.get = function Cache_get(key) {
  return this._cache[key];
};


Cache.prototype.del = function Cache_del(key) {
  delete this._cache[key];
};


Cache.prototype.clear = function Cache_clear() {
  this._cache = {};
};


/***/ }),

/***/ "./node_modules/ajv/lib/compile/async.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MissingRefError = __webpack_require__("./node_modules/ajv/lib/compile/error_classes.js").MissingRef;

module.exports = compileAsync;


/**
 * Creates validating function for passed schema with asynchronous loading of missing schemas.
 * `loadSchema` option should be a function that accepts schema uri and returns promise that resolves with the schema.
 * @this  Ajv
 * @param {Object}   schema schema object
 * @param {Boolean}  meta optional true to compile meta-schema; this parameter can be skipped
 * @param {Function} callback an optional node-style callback, it is called with 2 parameters: error (or null) and validating function.
 * @return {Promise} promise that resolves with a validating function.
 */
function compileAsync(schema, meta, callback) {
  /* eslint no-shadow: 0 */
  /* global Promise */
  /* jshint validthis: true */
  var self = this;
  if (typeof this._opts.loadSchema != 'function')
    throw new Error('options.loadSchema should be a function');

  if (typeof meta == 'function') {
    callback = meta;
    meta = undefined;
  }

  var p = loadMetaSchemaOf(schema).then(function () {
    var schemaObj = self._addSchema(schema, undefined, meta);
    return schemaObj.validate || _compileAsync(schemaObj);
  });

  if (callback) {
    p.then(
      function(v) { callback(null, v); },
      callback
    );
  }

  return p;


  function loadMetaSchemaOf(sch) {
    var $schema = sch.$schema;
    return $schema && !self.getSchema($schema)
            ? compileAsync.call(self, { $ref: $schema }, true)
            : Promise.resolve();
  }


  function _compileAsync(schemaObj) {
    try { return self._compile(schemaObj); }
    catch(e) {
      if (e instanceof MissingRefError) return loadMissingSchema(e);
      throw e;
    }


    function loadMissingSchema(e) {
      var ref = e.missingSchema;
      if (added(ref)) throw new Error('Schema ' + ref + ' is loaded but ' + e.missingRef + ' cannot be resolved');

      var schemaPromise = self._loadingSchemas[ref];
      if (!schemaPromise) {
        schemaPromise = self._loadingSchemas[ref] = self._opts.loadSchema(ref);
        schemaPromise.then(removePromise, removePromise);
      }

      return schemaPromise.then(function (sch) {
        if (!added(ref)) {
          return loadMetaSchemaOf(sch).then(function () {
            if (!added(ref)) self.addSchema(sch, ref, undefined, meta);
          });
        }
      }).then(function() {
        return _compileAsync(schemaObj);
      });

      function removePromise() {
        delete self._loadingSchemas[ref];
      }

      function added(ref) {
        return self._refs[ref] || self._schemas[ref];
      }
    }
  }
}


/***/ }),

/***/ "./node_modules/ajv/lib/compile/error_classes.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var resolve = __webpack_require__("./node_modules/ajv/lib/compile/resolve.js");

module.exports = {
  Validation: errorSubclass(ValidationError),
  MissingRef: errorSubclass(MissingRefError)
};


function ValidationError(errors) {
  this.message = 'validation failed';
  this.errors = errors;
  this.ajv = this.validation = true;
}


MissingRefError.message = function (baseId, ref) {
  return 'can\'t resolve reference ' + ref + ' from id ' + baseId;
};


function MissingRefError(baseId, ref, message) {
  this.message = message || MissingRefError.message(baseId, ref);
  this.missingRef = resolve.url(baseId, ref);
  this.missingSchema = resolve.normalizeId(resolve.fullPath(this.missingRef));
}


function errorSubclass(Subclass) {
  Subclass.prototype = Object.create(Error.prototype);
  Subclass.prototype.constructor = Subclass;
  return Subclass;
}


/***/ }),

/***/ "./node_modules/ajv/lib/compile/formats.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__("./node_modules/ajv/lib/compile/util.js");

var DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
var DAYS = [0,31,28,31,30,31,30,31,31,30,31,30,31];
var TIME = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d:\d\d)?$/i;
var HOSTNAME = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*$/i;
var URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
var URIREF = /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
// uri-template: https://tools.ietf.org/html/rfc6570
var URITEMPLATE = /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i;
// For the source: https://gist.github.com/dperini/729294
// For test cases: https://mathiasbynens.be/demo/url-regex
// @todo Delete current URL in favour of the commented out URL rule when this issue is fixed https://github.com/eslint/eslint/issues/7983.
// var URL = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)(?:\.(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu;
var URL = /^(?:(?:http[s\u017F]?|ftp):\/\/)(?:(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+(?::(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?@)?(?:(?!10(?:\.[0-9]{1,3}){3})(?!127(?:\.[0-9]{1,3}){3})(?!169\.254(?:\.[0-9]{1,3}){2})(?!192\.168(?:\.[0-9]{1,3}){2})(?!172\.(?:1[6-9]|2[0-9]|3[01])(?:\.[0-9]{1,3}){2})(?:[1-9][0-9]?|1[0-9][0-9]|2[01][0-9]|22[0-3])(?:\.(?:1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])){2}(?:\.(?:[1-9][0-9]?|1[0-9][0-9]|2[0-4][0-9]|25[0-4]))|(?:(?:(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-?)*(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)(?:\.(?:(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-?)*(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)*(?:\.(?:(?:[KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){2,})))(?::[0-9]{2,5})?(?:\/(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?$/i;
var UUID = /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
var JSON_POINTER = /^(?:\/(?:[^~/]|~0|~1)*)*$/;
var JSON_POINTER_URI_FRAGMENT = /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i;
var RELATIVE_JSON_POINTER = /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/;


module.exports = formats;

function formats(mode) {
  mode = mode == 'full' ? 'full' : 'fast';
  return util.copy(formats[mode]);
}


formats.fast = {
  // date: http://tools.ietf.org/html/rfc3339#section-5.6
  date: /^\d\d\d\d-[0-1]\d-[0-3]\d$/,
  // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
  time: /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d:\d\d)?$/i,
  'date-time': /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d:\d\d)$/i,
  // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
  uri: /^(?:[a-z][a-z0-9+-.]*:)(?:\/?\/)?[^\s]*$/i,
  'uri-reference': /^(?:(?:[a-z][a-z0-9+-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
  'uri-template': URITEMPLATE,
  url: URL,
  // email (sources from jsen validator):
  // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
  // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'willful violation')
  email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i,
  hostname: HOSTNAME,
  // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
  ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
  // optimized http://stackoverflow.com/questions/53497/regular-expression-that-matches-valid-ipv6-addresses
  ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,
  regex: regex,
  // uuid: http://tools.ietf.org/html/rfc4122
  uuid: UUID,
  // JSON-pointer: https://tools.ietf.org/html/rfc6901
  // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
  'json-pointer': JSON_POINTER,
  'json-pointer-uri-fragment': JSON_POINTER_URI_FRAGMENT,
  // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
  'relative-json-pointer': RELATIVE_JSON_POINTER
};


formats.full = {
  date: date,
  time: time,
  'date-time': date_time,
  uri: uri,
  'uri-reference': URIREF,
  'uri-template': URITEMPLATE,
  url: URL,
  email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
  hostname: hostname,
  ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
  ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,
  regex: regex,
  uuid: UUID,
  'json-pointer': JSON_POINTER,
  'json-pointer-uri-fragment': JSON_POINTER_URI_FRAGMENT,
  'relative-json-pointer': RELATIVE_JSON_POINTER
};


function isLeapYear(year) {
  // https://tools.ietf.org/html/rfc3339#appendix-C
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}


function date(str) {
  // full-date from http://tools.ietf.org/html/rfc3339#section-5.6
  var matches = str.match(DATE);
  if (!matches) return false;

  var year = +matches[1];
  var month = +matches[2];
  var day = +matches[3];

  return month >= 1 && month <= 12 && day >= 1 &&
          day <= (month == 2 && isLeapYear(year) ? 29 : DAYS[month]);
}


function time(str, full) {
  var matches = str.match(TIME);
  if (!matches) return false;

  var hour = matches[1];
  var minute = matches[2];
  var second = matches[3];
  var timeZone = matches[5];
  return ((hour <= 23 && minute <= 59 && second <= 59) ||
          (hour == 23 && minute == 59 && second == 60)) &&
         (!full || timeZone);
}


var DATE_TIME_SEPARATOR = /t|\s/i;
function date_time(str) {
  // http://tools.ietf.org/html/rfc3339#section-5.6
  var dateTime = str.split(DATE_TIME_SEPARATOR);
  return dateTime.length == 2 && date(dateTime[0]) && time(dateTime[1], true);
}


function hostname(str) {
  // https://tools.ietf.org/html/rfc1034#section-3.5
  // https://tools.ietf.org/html/rfc1123#section-2
  return str.length <= 255 && HOSTNAME.test(str);
}


var NOT_URI_FRAGMENT = /\/|:/;
function uri(str) {
  // http://jmrware.com/articles/2009/uri_regexp/URI_regex.html + optional protocol + required "."
  return NOT_URI_FRAGMENT.test(str) && URI.test(str);
}


var Z_ANCHOR = /[^\\]\\Z/;
function regex(str) {
  if (Z_ANCHOR.test(str)) return false;
  try {
    new RegExp(str);
    return true;
  } catch(e) {
    return false;
  }
}


/***/ }),

/***/ "./node_modules/ajv/lib/compile/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var resolve = __webpack_require__("./node_modules/ajv/lib/compile/resolve.js")
  , util = __webpack_require__("./node_modules/ajv/lib/compile/util.js")
  , errorClasses = __webpack_require__("./node_modules/ajv/lib/compile/error_classes.js")
  , stableStringify = __webpack_require__("./node_modules/fast-json-stable-stringify/index.js");

var validateGenerator = __webpack_require__("./node_modules/ajv/lib/dotjs/validate.js");

/**
 * Functions below are used inside compiled validations function
 */

var ucs2length = util.ucs2length;
var equal = __webpack_require__("./node_modules/fast-deep-equal/index.js");

// this error is thrown by async schemas to return validation errors via exception
var ValidationError = errorClasses.Validation;

module.exports = compile;


/**
 * Compiles schema to validation function
 * @this   Ajv
 * @param  {Object} schema schema object
 * @param  {Object} root object with information about the root schema for this schema
 * @param  {Object} localRefs the hash of local references inside the schema (created by resolve.id), used for inline resolution
 * @param  {String} baseId base ID for IDs in the schema
 * @return {Function} validation function
 */
function compile(schema, root, localRefs, baseId) {
  /* jshint validthis: true, evil: true */
  /* eslint no-shadow: 0 */
  var self = this
    , opts = this._opts
    , refVal = [ undefined ]
    , refs = {}
    , patterns = []
    , patternsHash = {}
    , defaults = []
    , defaultsHash = {}
    , customRules = [];

  root = root || { schema: schema, refVal: refVal, refs: refs };

  var c = checkCompiling.call(this, schema, root, baseId);
  var compilation = this._compilations[c.index];
  if (c.compiling) return (compilation.callValidate = callValidate);

  var formats = this._formats;
  var RULES = this.RULES;

  try {
    var v = localCompile(schema, root, localRefs, baseId);
    compilation.validate = v;
    var cv = compilation.callValidate;
    if (cv) {
      cv.schema = v.schema;
      cv.errors = null;
      cv.refs = v.refs;
      cv.refVal = v.refVal;
      cv.root = v.root;
      cv.$async = v.$async;
      if (opts.sourceCode) cv.source = v.source;
    }
    return v;
  } finally {
    endCompiling.call(this, schema, root, baseId);
  }

  function callValidate() {
    var validate = compilation.validate;
    var result = validate.apply(null, arguments);
    callValidate.errors = validate.errors;
    return result;
  }

  function localCompile(_schema, _root, localRefs, baseId) {
    var isRoot = !_root || (_root && _root.schema == _schema);
    if (_root.schema != root.schema)
      return compile.call(self, _schema, _root, localRefs, baseId);

    var $async = _schema.$async === true;

    var sourceCode = validateGenerator({
      isTop: true,
      schema: _schema,
      isRoot: isRoot,
      baseId: baseId,
      root: _root,
      schemaPath: '',
      errSchemaPath: '#',
      errorPath: '""',
      MissingRefError: errorClasses.MissingRef,
      RULES: RULES,
      validate: validateGenerator,
      util: util,
      resolve: resolve,
      resolveRef: resolveRef,
      usePattern: usePattern,
      useDefault: useDefault,
      useCustomRule: useCustomRule,
      opts: opts,
      formats: formats,
      logger: self.logger,
      self: self
    });

    sourceCode = vars(refVal, refValCode) + vars(patterns, patternCode)
                   + vars(defaults, defaultCode) + vars(customRules, customRuleCode)
                   + sourceCode;

    if (opts.processCode) sourceCode = opts.processCode(sourceCode);
    // console.log('\n\n\n *** \n', JSON.stringify(sourceCode));
    var validate;
    try {
      var makeValidate = new Function(
        'self',
        'RULES',
        'formats',
        'root',
        'refVal',
        'defaults',
        'customRules',
        'equal',
        'ucs2length',
        'ValidationError',
        sourceCode
      );

      validate = makeValidate(
        self,
        RULES,
        formats,
        root,
        refVal,
        defaults,
        customRules,
        equal,
        ucs2length,
        ValidationError
      );

      refVal[0] = validate;
    } catch(e) {
      self.logger.error('Error compiling schema, function code:', sourceCode);
      throw e;
    }

    validate.schema = _schema;
    validate.errors = null;
    validate.refs = refs;
    validate.refVal = refVal;
    validate.root = isRoot ? validate : _root;
    if ($async) validate.$async = true;
    if (opts.sourceCode === true) {
      validate.source = {
        code: sourceCode,
        patterns: patterns,
        defaults: defaults
      };
    }

    return validate;
  }

  function resolveRef(baseId, ref, isRoot) {
    ref = resolve.url(baseId, ref);
    var refIndex = refs[ref];
    var _refVal, refCode;
    if (refIndex !== undefined) {
      _refVal = refVal[refIndex];
      refCode = 'refVal[' + refIndex + ']';
      return resolvedRef(_refVal, refCode);
    }
    if (!isRoot && root.refs) {
      var rootRefId = root.refs[ref];
      if (rootRefId !== undefined) {
        _refVal = root.refVal[rootRefId];
        refCode = addLocalRef(ref, _refVal);
        return resolvedRef(_refVal, refCode);
      }
    }

    refCode = addLocalRef(ref);
    var v = resolve.call(self, localCompile, root, ref);
    if (v === undefined) {
      var localSchema = localRefs && localRefs[ref];
      if (localSchema) {
        v = resolve.inlineRef(localSchema, opts.inlineRefs)
            ? localSchema
            : compile.call(self, localSchema, root, localRefs, baseId);
      }
    }

    if (v === undefined) {
      removeLocalRef(ref);
    } else {
      replaceLocalRef(ref, v);
      return resolvedRef(v, refCode);
    }
  }

  function addLocalRef(ref, v) {
    var refId = refVal.length;
    refVal[refId] = v;
    refs[ref] = refId;
    return 'refVal' + refId;
  }

  function removeLocalRef(ref) {
    delete refs[ref];
  }

  function replaceLocalRef(ref, v) {
    var refId = refs[ref];
    refVal[refId] = v;
  }

  function resolvedRef(refVal, code) {
    return typeof refVal == 'object' || typeof refVal == 'boolean'
            ? { code: code, schema: refVal, inline: true }
            : { code: code, $async: refVal && !!refVal.$async };
  }

  function usePattern(regexStr) {
    var index = patternsHash[regexStr];
    if (index === undefined) {
      index = patternsHash[regexStr] = patterns.length;
      patterns[index] = regexStr;
    }
    return 'pattern' + index;
  }

  function useDefault(value) {
    switch (typeof value) {
      case 'boolean':
      case 'number':
        return '' + value;
      case 'string':
        return util.toQuotedString(value);
      case 'object':
        if (value === null) return 'null';
        var valueStr = stableStringify(value);
        var index = defaultsHash[valueStr];
        if (index === undefined) {
          index = defaultsHash[valueStr] = defaults.length;
          defaults[index] = value;
        }
        return 'default' + index;
    }
  }

  function useCustomRule(rule, schema, parentSchema, it) {
    var validateSchema = rule.definition.validateSchema;
    if (validateSchema && self._opts.validateSchema !== false) {
      var valid = validateSchema(schema);
      if (!valid) {
        var message = 'keyword schema is invalid: ' + self.errorsText(validateSchema.errors);
        if (self._opts.validateSchema == 'log') self.logger.error(message);
        else throw new Error(message);
      }
    }

    var compile = rule.definition.compile
      , inline = rule.definition.inline
      , macro = rule.definition.macro;

    var validate;
    if (compile) {
      validate = compile.call(self, schema, parentSchema, it);
    } else if (macro) {
      validate = macro.call(self, schema, parentSchema, it);
      if (opts.validateSchema !== false) self.validateSchema(validate, true);
    } else if (inline) {
      validate = inline.call(self, it, rule.keyword, schema, parentSchema);
    } else {
      validate = rule.definition.validate;
      if (!validate) return;
    }

    if (validate === undefined)
      throw new Error('custom keyword "' + rule.keyword + '"failed to compile');

    var index = customRules.length;
    customRules[index] = validate;

    return {
      code: 'customRule' + index,
      validate: validate
    };
  }
}


/**
 * Checks if the schema is currently compiled
 * @this   Ajv
 * @param  {Object} schema schema to compile
 * @param  {Object} root root object
 * @param  {String} baseId base schema ID
 * @return {Object} object with properties "index" (compilation index) and "compiling" (boolean)
 */
function checkCompiling(schema, root, baseId) {
  /* jshint validthis: true */
  var index = compIndex.call(this, schema, root, baseId);
  if (index >= 0) return { index: index, compiling: true };
  index = this._compilations.length;
  this._compilations[index] = {
    schema: schema,
    root: root,
    baseId: baseId
  };
  return { index: index, compiling: false };
}


/**
 * Removes the schema from the currently compiled list
 * @this   Ajv
 * @param  {Object} schema schema to compile
 * @param  {Object} root root object
 * @param  {String} baseId base schema ID
 */
function endCompiling(schema, root, baseId) {
  /* jshint validthis: true */
  var i = compIndex.call(this, schema, root, baseId);
  if (i >= 0) this._compilations.splice(i, 1);
}


/**
 * Index of schema compilation in the currently compiled list
 * @this   Ajv
 * @param  {Object} schema schema to compile
 * @param  {Object} root root object
 * @param  {String} baseId base schema ID
 * @return {Integer} compilation index
 */
function compIndex(schema, root, baseId) {
  /* jshint validthis: true */
  for (var i=0; i<this._compilations.length; i++) {
    var c = this._compilations[i];
    if (c.schema == schema && c.root == root && c.baseId == baseId) return i;
  }
  return -1;
}


function patternCode(i, patterns) {
  return 'var pattern' + i + ' = new RegExp(' + util.toQuotedString(patterns[i]) + ');';
}


function defaultCode(i) {
  return 'var default' + i + ' = defaults[' + i + '];';
}


function refValCode(i, refVal) {
  return refVal[i] === undefined ? '' : 'var refVal' + i + ' = refVal[' + i + '];';
}


function customRuleCode(i) {
  return 'var customRule' + i + ' = customRules[' + i + '];';
}


function vars(arr, statement) {
  if (!arr.length) return '';
  var code = '';
  for (var i=0; i<arr.length; i++)
    code += statement(i, arr);
  return code;
}


/***/ }),

/***/ "./node_modules/ajv/lib/compile/resolve.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var URI = __webpack_require__("./node_modules/uri-js/dist/esnext/index.js")
  , equal = __webpack_require__("./node_modules/fast-deep-equal/index.js")
  , util = __webpack_require__("./node_modules/ajv/lib/compile/util.js")
  , SchemaObject = __webpack_require__("./node_modules/ajv/lib/compile/schema_obj.js")
  , traverse = __webpack_require__("./node_modules/json-schema-traverse/index.js");

module.exports = resolve;

resolve.normalizeId = normalizeId;
resolve.fullPath = getFullPath;
resolve.url = resolveUrl;
resolve.ids = resolveIds;
resolve.inlineRef = inlineRef;
resolve.schema = resolveSchema;

/**
 * [resolve and compile the references ($ref)]
 * @this   Ajv
 * @param  {Function} compile reference to schema compilation funciton (localCompile)
 * @param  {Object} root object with information about the root schema for the current schema
 * @param  {String} ref reference to resolve
 * @return {Object|Function} schema object (if the schema can be inlined) or validation function
 */
function resolve(compile, root, ref) {
  /* jshint validthis: true */
  var refVal = this._refs[ref];
  if (typeof refVal == 'string') {
    if (this._refs[refVal]) refVal = this._refs[refVal];
    else return resolve.call(this, compile, root, refVal);
  }

  refVal = refVal || this._schemas[ref];
  if (refVal instanceof SchemaObject) {
    return inlineRef(refVal.schema, this._opts.inlineRefs)
            ? refVal.schema
            : refVal.validate || this._compile(refVal);
  }

  var res = resolveSchema.call(this, root, ref);
  var schema, v, baseId;
  if (res) {
    schema = res.schema;
    root = res.root;
    baseId = res.baseId;
  }

  if (schema instanceof SchemaObject) {
    v = schema.validate || compile.call(this, schema.schema, root, undefined, baseId);
  } else if (schema !== undefined) {
    v = inlineRef(schema, this._opts.inlineRefs)
        ? schema
        : compile.call(this, schema, root, undefined, baseId);
  }

  return v;
}


/**
 * Resolve schema, its root and baseId
 * @this Ajv
 * @param  {Object} root root object with properties schema, refVal, refs
 * @param  {String} ref  reference to resolve
 * @return {Object} object with properties schema, root, baseId
 */
function resolveSchema(root, ref) {
  /* jshint validthis: true */
  var p = URI.parse(ref)
    , refPath = _getFullPath(p)
    , baseId = getFullPath(this._getId(root.schema));
  if (refPath !== baseId) {
    var id = normalizeId(refPath);
    var refVal = this._refs[id];
    if (typeof refVal == 'string') {
      return resolveRecursive.call(this, root, refVal, p);
    } else if (refVal instanceof SchemaObject) {
      if (!refVal.validate) this._compile(refVal);
      root = refVal;
    } else {
      refVal = this._schemas[id];
      if (refVal instanceof SchemaObject) {
        if (!refVal.validate) this._compile(refVal);
        if (id == normalizeId(ref))
          return { schema: refVal, root: root, baseId: baseId };
        root = refVal;
      } else {
        return;
      }
    }
    if (!root.schema) return;
    baseId = getFullPath(this._getId(root.schema));
  }
  return getJsonPointer.call(this, p, baseId, root.schema, root);
}


/* @this Ajv */
function resolveRecursive(root, ref, parsedRef) {
  /* jshint validthis: true */
  var res = resolveSchema.call(this, root, ref);
  if (res) {
    var schema = res.schema;
    var baseId = res.baseId;
    root = res.root;
    var id = this._getId(schema);
    if (id) baseId = resolveUrl(baseId, id);
    return getJsonPointer.call(this, parsedRef, baseId, schema, root);
  }
}


var PREVENT_SCOPE_CHANGE = util.toHash(['properties', 'patternProperties', 'enum', 'dependencies', 'definitions']);
/* @this Ajv */
function getJsonPointer(parsedRef, baseId, schema, root) {
  /* jshint validthis: true */
  parsedRef.fragment = parsedRef.fragment || '';
  if (parsedRef.fragment.slice(0,1) != '/') return;
  var parts = parsedRef.fragment.split('/');

  for (var i = 1; i < parts.length; i++) {
    var part = parts[i];
    if (part) {
      part = util.unescapeFragment(part);
      schema = schema[part];
      if (schema === undefined) break;
      var id;
      if (!PREVENT_SCOPE_CHANGE[part]) {
        id = this._getId(schema);
        if (id) baseId = resolveUrl(baseId, id);
        if (schema.$ref) {
          var $ref = resolveUrl(baseId, schema.$ref);
          var res = resolveSchema.call(this, root, $ref);
          if (res) {
            schema = res.schema;
            root = res.root;
            baseId = res.baseId;
          }
        }
      }
    }
  }
  if (schema !== undefined && schema !== root.schema)
    return { schema: schema, root: root, baseId: baseId };
}


var SIMPLE_INLINED = util.toHash([
  'type', 'format', 'pattern',
  'maxLength', 'minLength',
  'maxProperties', 'minProperties',
  'maxItems', 'minItems',
  'maximum', 'minimum',
  'uniqueItems', 'multipleOf',
  'required', 'enum'
]);
function inlineRef(schema, limit) {
  if (limit === false) return false;
  if (limit === undefined || limit === true) return checkNoRef(schema);
  else if (limit) return countKeys(schema) <= limit;
}


function checkNoRef(schema) {
  var item;
  if (Array.isArray(schema)) {
    for (var i=0; i<schema.length; i++) {
      item = schema[i];
      if (typeof item == 'object' && !checkNoRef(item)) return false;
    }
  } else {
    for (var key in schema) {
      if (key == '$ref') return false;
      item = schema[key];
      if (typeof item == 'object' && !checkNoRef(item)) return false;
    }
  }
  return true;
}


function countKeys(schema) {
  var count = 0, item;
  if (Array.isArray(schema)) {
    for (var i=0; i<schema.length; i++) {
      item = schema[i];
      if (typeof item == 'object') count += countKeys(item);
      if (count == Infinity) return Infinity;
    }
  } else {
    for (var key in schema) {
      if (key == '$ref') return Infinity;
      if (SIMPLE_INLINED[key]) {
        count++;
      } else {
        item = schema[key];
        if (typeof item == 'object') count += countKeys(item) + 1;
        if (count == Infinity) return Infinity;
      }
    }
  }
  return count;
}


function getFullPath(id, normalize) {
  if (normalize !== false) id = normalizeId(id);
  var p = URI.parse(id);
  return _getFullPath(p);
}


function _getFullPath(p) {
  return URI.serialize(p).split('#')[0] + '#';
}


var TRAILING_SLASH_HASH = /#\/?$/;
function normalizeId(id) {
  return id ? id.replace(TRAILING_SLASH_HASH, '') : '';
}


function resolveUrl(baseId, id) {
  id = normalizeId(id);
  return URI.resolve(baseId, id);
}


/* @this Ajv */
function resolveIds(schema) {
  var schemaId = normalizeId(this._getId(schema));
  var baseIds = {'': schemaId};
  var fullPaths = {'': getFullPath(schemaId, false)};
  var localRefs = {};
  var self = this;

  traverse(schema, {allKeys: true}, function(sch, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
    if (jsonPtr === '') return;
    var id = self._getId(sch);
    var baseId = baseIds[parentJsonPtr];
    var fullPath = fullPaths[parentJsonPtr] + '/' + parentKeyword;
    if (keyIndex !== undefined)
      fullPath += '/' + (typeof keyIndex == 'number' ? keyIndex : util.escapeFragment(keyIndex));

    if (typeof id == 'string') {
      id = baseId = normalizeId(baseId ? URI.resolve(baseId, id) : id);

      var refVal = self._refs[id];
      if (typeof refVal == 'string') refVal = self._refs[refVal];
      if (refVal && refVal.schema) {
        if (!equal(sch, refVal.schema))
          throw new Error('id "' + id + '" resolves to more than one schema');
      } else if (id != normalizeId(fullPath)) {
        if (id[0] == '#') {
          if (localRefs[id] && !equal(sch, localRefs[id]))
            throw new Error('id "' + id + '" resolves to more than one schema');
          localRefs[id] = sch;
        } else {
          self._refs[id] = fullPath;
        }
      }
    }
    baseIds[jsonPtr] = baseId;
    fullPaths[jsonPtr] = fullPath;
  });

  return localRefs;
}


/***/ }),

/***/ "./node_modules/ajv/lib/compile/rules.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ruleModules = __webpack_require__("./node_modules/ajv/lib/dotjs/index.js")
  , toHash = __webpack_require__("./node_modules/ajv/lib/compile/util.js").toHash;

module.exports = function rules() {
  var RULES = [
    { type: 'number',
      rules: [ { 'maximum': ['exclusiveMaximum'] },
               { 'minimum': ['exclusiveMinimum'] }, 'multipleOf', 'format'] },
    { type: 'string',
      rules: [ 'maxLength', 'minLength', 'pattern', 'format' ] },
    { type: 'array',
      rules: [ 'maxItems', 'minItems', 'items', 'contains', 'uniqueItems' ] },
    { type: 'object',
      rules: [ 'maxProperties', 'minProperties', 'required', 'dependencies', 'propertyNames',
               { 'properties': ['additionalProperties', 'patternProperties'] } ] },
    { rules: [ '$ref', 'const', 'enum', 'not', 'anyOf', 'oneOf', 'allOf', 'if' ] }
  ];

  var ALL = [ 'type', '$comment' ];
  var KEYWORDS = [
    '$schema', '$id', 'id', '$data', 'title',
    'description', 'default', 'definitions',
    'examples', 'readOnly', 'writeOnly',
    'contentMediaType', 'contentEncoding',
    'additionalItems', 'then', 'else'
  ];
  var TYPES = [ 'number', 'integer', 'string', 'array', 'object', 'boolean', 'null' ];
  RULES.all = toHash(ALL);
  RULES.types = toHash(TYPES);

  RULES.forEach(function (group) {
    group.rules = group.rules.map(function (keyword) {
      var implKeywords;
      if (typeof keyword == 'object') {
        var key = Object.keys(keyword)[0];
        implKeywords = keyword[key];
        keyword = key;
        implKeywords.forEach(function (k) {
          ALL.push(k);
          RULES.all[k] = true;
        });
      }
      ALL.push(keyword);
      var rule = RULES.all[keyword] = {
        keyword: keyword,
        code: ruleModules[keyword],
        implements: implKeywords
      };
      return rule;
    });

    RULES.all.$comment = {
      keyword: '$comment',
      code: ruleModules.$comment
    };

    if (group.type) RULES.types[group.type] = group;
  });

  RULES.keywords = toHash(ALL.concat(KEYWORDS));
  RULES.custom = {};

  return RULES;
};


/***/ }),

/***/ "./node_modules/ajv/lib/compile/schema_obj.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__("./node_modules/ajv/lib/compile/util.js");

module.exports = SchemaObject;

function SchemaObject(obj) {
  util.copy(obj, this);
}


/***/ }),

/***/ "./node_modules/ajv/lib/compile/ucs2length.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://mathiasbynens.be/notes/javascript-encoding
// https://github.com/bestiejs/punycode.js - punycode.ucs2.decode
module.exports = function ucs2length(str) {
  var length = 0
    , len = str.length
    , pos = 0
    , value;
  while (pos < len) {
    length++;
    value = str.charCodeAt(pos++);
    if (value >= 0xD800 && value <= 0xDBFF && pos < len) {
      // high surrogate, and there is a next character
      value = str.charCodeAt(pos);
      if ((value & 0xFC00) == 0xDC00) pos++; // low surrogate
    }
  }
  return length;
};


/***/ }),

/***/ "./node_modules/ajv/lib/compile/util.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";



module.exports = {
  copy: copy,
  checkDataType: checkDataType,
  checkDataTypes: checkDataTypes,
  coerceToTypes: coerceToTypes,
  toHash: toHash,
  getProperty: getProperty,
  escapeQuotes: escapeQuotes,
  equal: __webpack_require__("./node_modules/fast-deep-equal/index.js"),
  ucs2length: __webpack_require__("./node_modules/ajv/lib/compile/ucs2length.js"),
  varOccurences: varOccurences,
  varReplace: varReplace,
  cleanUpCode: cleanUpCode,
  finalCleanUpCode: finalCleanUpCode,
  schemaHasRules: schemaHasRules,
  schemaHasRulesExcept: schemaHasRulesExcept,
  toQuotedString: toQuotedString,
  getPathExpr: getPathExpr,
  getPath: getPath,
  getData: getData,
  unescapeFragment: unescapeFragment,
  unescapeJsonPointer: unescapeJsonPointer,
  escapeFragment: escapeFragment,
  escapeJsonPointer: escapeJsonPointer
};


function copy(o, to) {
  to = to || {};
  for (var key in o) to[key] = o[key];
  return to;
}


function checkDataType(dataType, data, negate) {
  var EQUAL = negate ? ' !== ' : ' === '
    , AND = negate ? ' || ' : ' && '
    , OK = negate ? '!' : ''
    , NOT = negate ? '' : '!';
  switch (dataType) {
    case 'null': return data + EQUAL + 'null';
    case 'array': return OK + 'Array.isArray(' + data + ')';
    case 'object': return '(' + OK + data + AND +
                          'typeof ' + data + EQUAL + '"object"' + AND +
                          NOT + 'Array.isArray(' + data + '))';
    case 'integer': return '(typeof ' + data + EQUAL + '"number"' + AND +
                           NOT + '(' + data + ' % 1)' +
                           AND + data + EQUAL + data + ')';
    default: return 'typeof ' + data + EQUAL + '"' + dataType + '"';
  }
}


function checkDataTypes(dataTypes, data) {
  switch (dataTypes.length) {
    case 1: return checkDataType(dataTypes[0], data, true);
    default:
      var code = '';
      var types = toHash(dataTypes);
      if (types.array && types.object) {
        code = types.null ? '(': '(!' + data + ' || ';
        code += 'typeof ' + data + ' !== "object")';
        delete types.null;
        delete types.array;
        delete types.object;
      }
      if (types.number) delete types.integer;
      for (var t in types)
        code += (code ? ' && ' : '' ) + checkDataType(t, data, true);

      return code;
  }
}


var COERCE_TO_TYPES = toHash([ 'string', 'number', 'integer', 'boolean', 'null' ]);
function coerceToTypes(optionCoerceTypes, dataTypes) {
  if (Array.isArray(dataTypes)) {
    var types = [];
    for (var i=0; i<dataTypes.length; i++) {
      var t = dataTypes[i];
      if (COERCE_TO_TYPES[t]) types[types.length] = t;
      else if (optionCoerceTypes === 'array' && t === 'array') types[types.length] = t;
    }
    if (types.length) return types;
  } else if (COERCE_TO_TYPES[dataTypes]) {
    return [dataTypes];
  } else if (optionCoerceTypes === 'array' && dataTypes === 'array') {
    return ['array'];
  }
}


function toHash(arr) {
  var hash = {};
  for (var i=0; i<arr.length; i++) hash[arr[i]] = true;
  return hash;
}


var IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
var SINGLE_QUOTE = /'|\\/g;
function getProperty(key) {
  return typeof key == 'number'
          ? '[' + key + ']'
          : IDENTIFIER.test(key)
            ? '.' + key
            : "['" + escapeQuotes(key) + "']";
}


function escapeQuotes(str) {
  return str.replace(SINGLE_QUOTE, '\\$&')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\f/g, '\\f')
            .replace(/\t/g, '\\t');
}


function varOccurences(str, dataVar) {
  dataVar += '[^0-9]';
  var matches = str.match(new RegExp(dataVar, 'g'));
  return matches ? matches.length : 0;
}


function varReplace(str, dataVar, expr) {
  dataVar += '([^0-9])';
  expr = expr.replace(/\$/g, '$$$$');
  return str.replace(new RegExp(dataVar, 'g'), expr + '$1');
}


var EMPTY_ELSE = /else\s*{\s*}/g
  , EMPTY_IF_NO_ELSE = /if\s*\([^)]+\)\s*\{\s*\}(?!\s*else)/g
  , EMPTY_IF_WITH_ELSE = /if\s*\(([^)]+)\)\s*\{\s*\}\s*else(?!\s*if)/g;
function cleanUpCode(out) {
  return out.replace(EMPTY_ELSE, '')
            .replace(EMPTY_IF_NO_ELSE, '')
            .replace(EMPTY_IF_WITH_ELSE, 'if (!($1))');
}


var ERRORS_REGEXP = /[^v.]errors/g
  , REMOVE_ERRORS = /var errors = 0;|var vErrors = null;|validate.errors = vErrors;/g
  , REMOVE_ERRORS_ASYNC = /var errors = 0;|var vErrors = null;/g
  , RETURN_VALID = 'return errors === 0;'
  , RETURN_TRUE = 'validate.errors = null; return true;'
  , RETURN_ASYNC = /if \(errors === 0\) return data;\s*else throw new ValidationError\(vErrors\);/
  , RETURN_DATA_ASYNC = 'return data;'
  , ROOTDATA_REGEXP = /[^A-Za-z_$]rootData[^A-Za-z0-9_$]/g
  , REMOVE_ROOTDATA = /if \(rootData === undefined\) rootData = data;/;

function finalCleanUpCode(out, async) {
  var matches = out.match(ERRORS_REGEXP);
  if (matches && matches.length == 2) {
    out = async
          ? out.replace(REMOVE_ERRORS_ASYNC, '')
               .replace(RETURN_ASYNC, RETURN_DATA_ASYNC)
          : out.replace(REMOVE_ERRORS, '')
               .replace(RETURN_VALID, RETURN_TRUE);
  }

  matches = out.match(ROOTDATA_REGEXP);
  if (!matches || matches.length !== 3) return out;
  return out.replace(REMOVE_ROOTDATA, '');
}


function schemaHasRules(schema, rules) {
  if (typeof schema == 'boolean') return !schema;
  for (var key in schema) if (rules[key]) return true;
}


function schemaHasRulesExcept(schema, rules, exceptKeyword) {
  if (typeof schema == 'boolean') return !schema && exceptKeyword != 'not';
  for (var key in schema) if (key != exceptKeyword && rules[key]) return true;
}


function toQuotedString(str) {
  return '\'' + escapeQuotes(str) + '\'';
}


function getPathExpr(currentPath, expr, jsonPointers, isNumber) {
  var path = jsonPointers // false by default
              ? '\'/\' + ' + expr + (isNumber ? '' : '.replace(/~/g, \'~0\').replace(/\\//g, \'~1\')')
              : (isNumber ? '\'[\' + ' + expr + ' + \']\'' : '\'[\\\'\' + ' + expr + ' + \'\\\']\'');
  return joinPaths(currentPath, path);
}


function getPath(currentPath, prop, jsonPointers) {
  var path = jsonPointers // false by default
              ? toQuotedString('/' + escapeJsonPointer(prop))
              : toQuotedString(getProperty(prop));
  return joinPaths(currentPath, path);
}


var JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
var RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function getData($data, lvl, paths) {
  var up, jsonPointer, data, matches;
  if ($data === '') return 'rootData';
  if ($data[0] == '/') {
    if (!JSON_POINTER.test($data)) throw new Error('Invalid JSON-pointer: ' + $data);
    jsonPointer = $data;
    data = 'rootData';
  } else {
    matches = $data.match(RELATIVE_JSON_POINTER);
    if (!matches) throw new Error('Invalid JSON-pointer: ' + $data);
    up = +matches[1];
    jsonPointer = matches[2];
    if (jsonPointer == '#') {
      if (up >= lvl) throw new Error('Cannot access property/index ' + up + ' levels up, current level is ' + lvl);
      return paths[lvl - up];
    }

    if (up > lvl) throw new Error('Cannot access data ' + up + ' levels up, current level is ' + lvl);
    data = 'data' + ((lvl - up) || '');
    if (!jsonPointer) return data;
  }

  var expr = data;
  var segments = jsonPointer.split('/');
  for (var i=0; i<segments.length; i++) {
    var segment = segments[i];
    if (segment) {
      data += getProperty(unescapeJsonPointer(segment));
      expr += ' && ' + data;
    }
  }
  return expr;
}


function joinPaths (a, b) {
  if (a == '""') return b;
  return (a + ' + ' + b).replace(/' \+ '/g, '');
}


function unescapeFragment(str) {
  return unescapeJsonPointer(decodeURIComponent(str));
}


function escapeFragment(str) {
  return encodeURIComponent(escapeJsonPointer(str));
}


function escapeJsonPointer(str) {
  return str.replace(/~/g, '~0').replace(/\//g, '~1');
}


function unescapeJsonPointer(str) {
  return str.replace(/~1/g, '/').replace(/~0/g, '~');
}


/***/ }),

/***/ "./node_modules/ajv/lib/data.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var KEYWORDS = [
  'multipleOf',
  'maximum',
  'exclusiveMaximum',
  'minimum',
  'exclusiveMinimum',
  'maxLength',
  'minLength',
  'pattern',
  'additionalItems',
  'maxItems',
  'minItems',
  'uniqueItems',
  'maxProperties',
  'minProperties',
  'required',
  'additionalProperties',
  'enum',
  'format',
  'const'
];

module.exports = function (metaSchema, keywordsJsonPointers) {
  for (var i=0; i<keywordsJsonPointers.length; i++) {
    metaSchema = JSON.parse(JSON.stringify(metaSchema));
    var segments = keywordsJsonPointers[i].split('/');
    var keywords = metaSchema;
    var j;
    for (j=1; j<segments.length; j++)
      keywords = keywords[segments[j]];

    for (j=0; j<KEYWORDS.length; j++) {
      var key = KEYWORDS[j];
      var schema = keywords[key];
      if (schema) {
        keywords[key] = {
          anyOf: [
            schema,
            { $ref: 'https://raw.githubusercontent.com/epoberezkin/ajv/master/lib/refs/data.json#' }
          ]
        };
      }
    }
  }

  return metaSchema;
};


/***/ }),

/***/ "./node_modules/ajv/lib/dotjs/_limit.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function generate__limit(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $errorKeyword;
  var $data = 'data' + ($dataLvl || '');
  var $isData = it.opts.$data && $schema && $schema.$data,
    $schemaValue;
  if ($isData) {
    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  var $isMax = $keyword == 'maximum',
    $exclusiveKeyword = $isMax ? 'exclusiveMaximum' : 'exclusiveMinimum',
    $schemaExcl = it.schema[$exclusiveKeyword],
    $isDataExcl = it.opts.$data && $schemaExcl && $schemaExcl.$data,
    $op = $isMax ? '<' : '>',
    $notOp = $isMax ? '>' : '<',
    $errorKeyword = undefined;
  if ($isDataExcl) {
    var $schemaValueExcl = it.util.getData($schemaExcl.$data, $dataLvl, it.dataPathArr),
      $exclusive = 'exclusive' + $lvl,
      $exclType = 'exclType' + $lvl,
      $exclIsNumber = 'exclIsNumber' + $lvl,
      $opExpr = 'op' + $lvl,
      $opStr = '\' + ' + $opExpr + ' + \'';
    out += ' var schemaExcl' + ($lvl) + ' = ' + ($schemaValueExcl) + '; ';
    $schemaValueExcl = 'schemaExcl' + $lvl;
    out += ' var ' + ($exclusive) + '; var ' + ($exclType) + ' = typeof ' + ($schemaValueExcl) + '; if (' + ($exclType) + ' != \'boolean\' && ' + ($exclType) + ' != \'undefined\' && ' + ($exclType) + ' != \'number\') { ';
    var $errorKeyword = $exclusiveKeyword;
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = ''; /* istanbul ignore else */
    if (it.createErrors !== false) {
      out += ' { keyword: \'' + ($errorKeyword || '_exclusiveLimit') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: {} ';
      if (it.opts.messages !== false) {
        out += ' , message: \'' + ($exclusiveKeyword) + ' should be boolean\' ';
      }
      if (it.opts.verbose) {
        out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
      }
      out += ' } ';
    } else {
      out += ' {} ';
    }
    var __err = out;
    out = $$outStack.pop();
    if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
      if (it.async) {
        out += ' throw new ValidationError([' + (__err) + ']); ';
      } else {
        out += ' validate.errors = [' + (__err) + ']; return false; ';
      }
    } else {
      out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
    }
    out += ' } else if ( ';
    if ($isData) {
      out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'number\') || ';
    }
    out += ' ' + ($exclType) + ' == \'number\' ? ( (' + ($exclusive) + ' = ' + ($schemaValue) + ' === undefined || ' + ($schemaValueExcl) + ' ' + ($op) + '= ' + ($schemaValue) + ') ? ' + ($data) + ' ' + ($notOp) + '= ' + ($schemaValueExcl) + ' : ' + ($data) + ' ' + ($notOp) + ' ' + ($schemaValue) + ' ) : ( (' + ($exclusive) + ' = ' + ($schemaValueExcl) + ' === true) ? ' + ($data) + ' ' + ($notOp) + '= ' + ($schemaValue) + ' : ' + ($data) + ' ' + ($notOp) + ' ' + ($schemaValue) + ' ) || ' + ($data) + ' !== ' + ($data) + ') { var op' + ($lvl) + ' = ' + ($exclusive) + ' ? \'' + ($op) + '\' : \'' + ($op) + '=\'; ';
    if ($schema === undefined) {
      $errorKeyword = $exclusiveKeyword;
      $errSchemaPath = it.errSchemaPath + '/' + $exclusiveKeyword;
      $schemaValue = $schemaValueExcl;
      $isData = $isDataExcl;
    }
  } else {
    var $exclIsNumber = typeof $schemaExcl == 'number',
      $opStr = $op;
    if ($exclIsNumber && $isData) {
      var $opExpr = '\'' + $opStr + '\'';
      out += ' if ( ';
      if ($isData) {
        out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'number\') || ';
      }
      out += ' ( ' + ($schemaValue) + ' === undefined || ' + ($schemaExcl) + ' ' + ($op) + '= ' + ($schemaValue) + ' ? ' + ($data) + ' ' + ($notOp) + '= ' + ($schemaExcl) + ' : ' + ($data) + ' ' + ($notOp) + ' ' + ($schemaValue) + ' ) || ' + ($data) + ' !== ' + ($data) + ') { ';
    } else {
      if ($exclIsNumber && $schema === undefined) {
        $exclusive = true;
        $errorKeyword = $exclusiveKeyword;
        $errSchemaPath = it.errSchemaPath + '/' + $exclusiveKeyword;
        $schemaValue = $schemaExcl;
        $notOp += '=';
      } else {
        if ($exclIsNumber) $schemaValue = Math[$isMax ? 'min' : 'max']($schemaExcl, $schema);
        if ($schemaExcl === ($exclIsNumber ? $schemaValue : true)) {
          $exclusive = true;
          $errorKeyword = $exclusiveKeyword;
          $errSchemaPath = it.errSchemaPath + '/' + $exclusiveKeyword;
          $notOp += '=';
        } else {
          $exclusive = false;
          $opStr += '=';
        }
      }
      var $opExpr = '\'' + $opStr + '\'';
      out += ' if ( ';
      if ($isData) {
        out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'number\') || ';
      }
      out += ' ' + ($data) + ' ' + ($notOp) + ' ' + ($schemaValue) + ' || ' + ($data) + ' !== ' + ($data) + ') { ';
    }
  }
  $errorKeyword = $errorKeyword || $keyword;
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + ($errorKeyword || '_limit') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { comparison: ' + ($opExpr) + ', limit: ' + ($schemaValue) + ', exclusive: ' + ($exclusive) + ' } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should be ' + ($opStr) + ' ';
      if ($isData) {
        out += '\' + ' + ($schemaValue);
      } else {
        out += '' + ($schemaValue) + '\'';
      }
    }
    if (it.opts.verbose) {
      out += ' , schema:  ';
      if ($isData) {
        out += 'validate.schema' + ($schemaPath);
      } else {
        out += '' + ($schema);
      }
      out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + (__err) + ']); ';
    } else {
      out += ' validate.errors = [' + (__err) + ']; return false; ';
    }
  } else {
    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += ' } ';
  if ($breakOnError) {
    out += ' else { ';
  }
  return out;
}


/***/ }),

/***/ "./node_modules/ajv/lib/dotjs/_limitItems.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function generate__limitItems(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $errorKeyword;
  var $data = 'data' + ($dataLvl || '');
  var $isData = it.opts.$data && $schema && $schema.$data,
    $schemaValue;
  if ($isData) {
    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  var $op = $keyword == 'maxItems' ? '>' : '<';
  out += 'if ( ';
  if ($isData) {
    out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'number\') || ';
  }
  out += ' ' + ($data) + '.length ' + ($op) + ' ' + ($schemaValue) + ') { ';
  var $errorKeyword = $keyword;
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + ($errorKeyword || '_limitItems') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { limit: ' + ($schemaValue) + ' } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should NOT have ';
      if ($keyword == 'maxItems') {
        out += 'more';
      } else {
        out += 'less';
      }
      out += ' than ';
      if ($isData) {
        out += '\' + ' + ($schemaValue) + ' + \'';
      } else {
        out += '' + ($schema);
      }
      out += ' items\' ';
    }
    if (it.opts.verbose) {
      out += ' , schema:  ';
      if ($isData) {
        out += 'validate.schema' + ($schemaPath);
      } else {
        out += '' + ($schema);
      }
      out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + (__err) + ']); ';
    } else {
      out += ' validate.errors = [' + (__err) + ']; return false; ';
    }
  } else {
    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += '} ';
  if ($breakOnError) {
    out += ' else { ';
  }
  return out;
}


/***/ }),

/***/ "./node_modules/ajv/lib/dotjs/_limitLength.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function generate__limitLength(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $errorKeyword;
  var $data = 'data' + ($dataLvl || '');
  var $isData = it.opts.$data && $schema && $schema.$data,
    $schemaValue;
  if ($isData) {
    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  var $op = $keyword == 'maxLength' ? '>' : '<';
  out += 'if ( ';
  if ($isData) {
    out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'number\') || ';
  }
  if (it.opts.unicode === false) {
    out += ' ' + ($data) + '.length ';
  } else {
    out += ' ucs2length(' + ($data) + ') ';
  }
  out += ' ' + ($op) + ' ' + ($schemaValue) + ') { ';
  var $errorKeyword = $keyword;
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + ($errorKeyword || '_limitLength') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { limit: ' + ($schemaValue) + ' } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should NOT be ';
      if ($keyword == 'maxLength') {
        out += 'longer';
      } else {
        out += 'shorter';
      }
      out += ' than ';
      if ($isData) {
        out += '\' + ' + ($schemaValue) + ' + \'';
      } else {
        out += '' + ($schema);
      }
      out += ' characters\' ';
    }
    if (it.opts.verbose) {
      out += ' , schema:  ';
      if ($isData) {
        out += 'validate.schema' + ($schemaPath);
      } else {
        out += '' + ($schema);
      }
      out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + (__err) + ']); ';
    } else {
      out += ' validate.errors = [' + (__err) + ']; return false; ';
    }
  } else {
    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += '} ';
  if ($breakOnError) {
    out += ' else { ';
  }
  return out;
}


/***/ }),

/***/ "./node_modules/ajv/lib/dotjs/_limitProperties.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function generate__limitProperties(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $errorKeyword;
  var $data = 'data' + ($dataLvl || '');
  var $isData = it.opts.$data && $schema && $schema.$data,
    $schemaValue;
  if ($isData) {
    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  var $op = $keyword == 'maxProperties' ? '>' : '<';
  out += 'if ( ';
  if ($isData) {
    out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'number\') || ';
  }
  out += ' Object.keys(' + ($data) + ').length ' + ($op) + ' ' + ($schemaValue) + ') { ';
  var $errorKeyword = $keyword;
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + ($errorKeyword || '_limitProperties') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { limit: ' + ($schemaValue) + ' } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should NOT have ';
      if ($keyword == 'maxProperties') {
        out += 'more';
      } else {
        out += 'less';
      }
      out += ' than ';
      if ($isData) {
        out += '\' + ' + ($schemaValue) + ' + \'';
      } else {
        out += '' + ($schema);
      }
      out += ' properties\' ';
    }
    if (it.opts.verbose) {
      out += ' , schema:  ';
      if ($isData) {
        out += 'validate.schema' + ($schemaPath);
      } else {
        out += '' + ($schema);
      }
      out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + (__err) + ']); ';
    } else {
      out += ' validate.errors = [' + (__err) + ']; return false; ';
    }
  } else {
    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += '} ';
  if ($breakOnError) {
    out += ' else { ';
  }
  return out;
}


/***/ }),

/***/ "./node_modules/ajv/lib/dotjs/allOf.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function generate_allOf(it, $keyword, $ruleType) {
  var out = ' ';
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $it = it.util.copy(it);
  var $closingBraces = '';
  $it.level++;
  var $nextValid = 'valid' + $it.level;
  var $currentBaseId = $it.baseId,
    $allSchemasEmpty = true;
  var arr1 = $schema;
  if (arr1) {
    var $sch, $i = -1,
      l1 = arr1.length - 1;
    while ($i < l1) {
      $sch = arr1[$i += 1];
      if (it.util.schemaHasRules($sch, it.RULES.all)) {
        $allSchemasEmpty = false;
        $it.schema = $sch;
        $it.schemaPath = $schemaPath + '[' + $i + ']';
        $it.errSchemaPath = $errSchemaPath + '/' + $i;
        out += '  ' + (it.validate($it)) + ' ';
        $it.baseId = $currentBaseId;
        if ($breakOnError) {
          out += ' if (' + ($nextValid) + ') { ';
          $closingBraces += '}';
        }
      }
    }
  }
  if ($breakOnError) {
    if ($allSchemasEmpty) {
      out += ' if (true) { ';
    } else {
      out += ' ' + ($closingBraces.slice(0, -1)) + ' ';
    }
  }
  out = it.util.cleanUpCode(out);
  return out;
}


/***/ }),

/***/ "./node_modules/ajv/lib/dotjs/anyOf.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function generate_anyOf(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $errs = 'errs__' + $lvl;
  var $it = it.util.copy(it);
  var $closingBraces = '';
  $it.level++;
  var $nextValid = 'valid' + $it.level;
  var $noEmptySchema = $schema.every(function($sch) {
    return it.util.schemaHasRules($sch, it.RULES.all);
  });
  if ($noEmptySchema) {
    var $currentBaseId = $it.baseId;
    out += ' var ' + ($errs) + ' = errors; var ' + ($valid) + ' = false;  ';
    var $wasComposite = it.compositeRule;
    it.compositeRule = $it.compositeRule = true;
    var arr1 = $schema;
    if (arr1) {
      var $sch, $i = -1,
        l1 = arr1.length - 1;
      while ($i < l1) {
        $sch = arr1[$i += 1];
        $it.schema = $sch;
        $it.schemaPath = $schemaPath + '[' + $i + ']';
        $it.errSchemaPath = $errSchemaPath + '/' + $i;
        out += '  ' + (it.validate($it)) + ' ';
        $it.baseId = $currentBaseId;
        out += ' ' + ($valid) + ' = ' + ($valid) + ' || ' + ($nextValid) + '; if (!' + ($valid) + ') { ';
        $closingBraces += '}';
      }
    }
    it.compositeRule = $it.compositeRule = $wasComposite;
    out += ' ' + ($closingBraces) + ' if (!' + ($valid) + ') {   var err =   '; /* istanbul ignore else */
    if (it.createErrors !== false) {
      out += ' { keyword: \'' + ('anyOf') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: {} ';
      if (it.opts.messages !== false) {
        out += ' , message: \'should match some schema in anyOf\' ';
      }
      if (it.opts.verbose) {
        out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
      }
      out += ' } ';
    } else {
      out += ' {} ';
    }
    out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
    if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
      if (it.async) {
        out += ' throw new ValidationError(vErrors); ';
      } else {
        out += ' validate.errors = vErrors; return false; ';
      }
    }
    out += ' } else {  errors = ' + ($errs) + '; if (vErrors !== null) { if (' + ($errs) + ') vErrors.length = ' + ($errs) + '; else vErrors = null; } ';
    if (it.opts.allErrors) {
      out += ' } ';
    }
    out = it.util.cleanUpCode(out);
  } else {
    if ($breakOnError) {
      out += ' if (true) { ';
    }
  }
  return out;
}


/***/ }),

/***/ "./node_modules/ajv/lib/dotjs/comment.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function generate_comment(it, $keyword, $ruleType) {
  var out = ' ';
  var $schema = it.schema[$keyword];
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $comment = it.util.toQuotedString($schema);
  if (it.opts.$comment === true) {
    out += ' console.log(' + ($comment) + ');';
  } else if (typeof it.opts.$comment == 'function') {
    out += ' self._opts.$comment(' + ($comment) + ', ' + (it.util.toQuotedString($errSchemaPath)) + ', validate.root.schema);';
  }
  return out;
}


/***/ }),

/***/ "./node_modules/ajv/lib/dotjs/const.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function generate_const(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $isData = it.opts.$data && $schema && $schema.$data,
    $schemaValue;
  if ($isData) {
    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  if (!$isData) {
    out += ' var schema' + ($lvl) + ' = validate.schema' + ($schemaPath) + ';';
  }
  out += 'var ' + ($valid) + ' = equal(' + ($data) + ', schema' + ($lvl) + '); if (!' + ($valid) + ') {   ';
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + ('const') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { allowedValue: schema' + ($lvl) + ' } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should be equal to constant\' ';
    }
    if (it.opts.verbose) {
      out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + (__err) + ']); ';
    } else {
      out += ' validate.errors = [' + (__err) + ']; return false; ';
    }
  } else {
    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += ' }';
  if ($breakOnError) {
    out += ' else { ';
  }
  return out;
}


/***/ }),

/***/ "./node_modules/ajv/lib/dotjs/contains.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function generate_contains(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $errs = 'errs__' + $lvl;
  var $it = it.util.copy(it);
  var $closingBraces = '';
  $it.level++;
  var $nextValid = 'valid' + $it.level;
  var $idx = 'i' + $lvl,
    $dataNxt = $it.dataLevel = it.dataLevel + 1,
    $nextData = 'data' + $dataNxt,
    $currentBaseId = it.baseId,
    $nonEmptySchema = it.util.schemaHasRules($schema, it.RULES.all);
  out += 'var ' + ($errs) + ' = errors;var ' + ($valid) + ';';
  if ($nonEmptySchema) {
    var $wasComposite = it.compositeRule;
    it.compositeRule = $it.compositeRule = true;
    $it.schema = $schema;
    $it.schemaPath = $schemaPath;
    $it.errSchemaPath = $errSchemaPath;
    out += ' var ' + ($nextValid) + ' = false; for (var ' + ($idx) + ' = 0; ' + ($idx) + ' < ' + ($data) + '.length; ' + ($idx) + '++) { ';
    $it.errorPath = it.util.getPathExpr(it.errorPath, $idx, it.opts.jsonPointers, true);
    var $passData = $data + '[' + $idx + ']';
    $it.dataPathArr[$dataNxt] = $idx;
    var $code = it.validate($it);
    $it.baseId = $currentBaseId;
    if (it.util.varOccurences($code, $nextData) < 2) {
      out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
    } else {
      out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
    }
    out += ' if (' + ($nextValid) + ') break; }  ';
    it.compositeRule = $it.compositeRule = $wasComposite;
    out += ' ' + ($closingBraces) + ' if (!' + ($nextValid) + ') {';
  } else {
    out += ' if (' + ($data) + '.length == 0) {';
  }
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + ('contains') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: {} ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should contain a valid item\' ';
    }
    if (it.opts.verbose) {
      out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + (__err) + ']); ';
    } else {
      out += ' validate.errors = [' + (__err) + ']; return false; ';
    }
  } else {
    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += ' } else { ';
  if ($nonEmptySchema) {
    out += '  errors = ' + ($errs) + '; if (vErrors !== null) { if (' + ($errs) + ') vErrors.length = ' + ($errs) + '; else vErrors = null; } ';
  }
  if (it.opts.allErrors) {
    out += ' } ';
  }
  out = it.util.cleanUpCode(out);
  return out;
}


/***/ }),

/***/ "./node_modules/ajv/lib/dotjs/custom.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function generate_custom(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $errorKeyword;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $errs = 'errs__' + $lvl;
  var $isData = it.opts.$data && $schema && $schema.$data,
    $schemaValue;
  if ($isData) {
    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  var $rule = this,
    $definition = 'definition' + $lvl,
    $rDef = $rule.definition,
    $closingBraces = '';
  var $compile, $inline, $macro, $ruleValidate, $validateCode;
  if ($isData && $rDef.$data) {
    $validateCode = 'keywordValidate' + $lvl;
    var $validateSchema = $rDef.validateSchema;
    out += ' var ' + ($definition) + ' = RULES.custom[\'' + ($keyword) + '\'].definition; var ' + ($validateCode) + ' = ' + ($definition) + '.validate;';
  } else {
    $ruleValidate = it.useCustomRule($rule, $schema, it.schema, it);
    if (!$ruleValidate) return;
    $schemaValue = 'validate.schema' + $schemaPath;
    $validateCode = $ruleValidate.code;
    $compile = $rDef.compile;
    $inline = $rDef.inline;
    $macro = $rDef.macro;
  }
  var $ruleErrs = $validateCode + '.errors',
    $i = 'i' + $lvl,
    $ruleErr = 'ruleErr' + $lvl,
    $asyncKeyword = $rDef.async;
  if ($asyncKeyword && !it.async) throw new Error('async keyword in sync schema');
  if (!($inline || $macro)) {
    out += '' + ($ruleErrs) + ' = null;';
  }
  out += 'var ' + ($errs) + ' = errors;var ' + ($valid) + ';';
  if ($isData && $rDef.$data) {
    $closingBraces += '}';
    out += ' if (' + ($schemaValue) + ' === undefined) { ' + ($valid) + ' = true; } else { ';
    if ($validateSchema) {
      $closingBraces += '}';
      out += ' ' + ($valid) + ' = ' + ($definition) + '.validateSchema(' + ($schemaValue) + '); if (' + ($valid) + ') { ';
    }
  }
  if ($inline) {
    if ($rDef.statements) {
      out += ' ' + ($ruleValidate.validate) + ' ';
    } else {
      out += ' ' + ($valid) + ' = ' + ($ruleValidate.validate) + '; ';
    }
  } else if ($macro) {
    var $it = it.util.copy(it);
    var $closingBraces = '';
    $it.level++;
    var $nextValid = 'valid' + $it.level;
    $it.schema = $ruleValidate.validate;
    $it.schemaPath = '';
    var $wasComposite = it.compositeRule;
    it.compositeRule = $it.compositeRule = true;
    var $code = it.validate($it).replace(/validate\.schema/g, $validateCode);
    it.compositeRule = $it.compositeRule = $wasComposite;
    out += ' ' + ($code);
  } else {
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = '';
    out += '  ' + ($validateCode) + '.call( ';
    if (it.opts.passContext) {
      out += 'this';
    } else {
      out += 'self';
    }
    if ($compile || $rDef.schema === false) {
      out += ' , ' + ($data) + ' ';
    } else {
      out += ' , ' + ($schemaValue) + ' , ' + ($data) + ' , validate.schema' + (it.schemaPath) + ' ';
    }
    out += ' , (dataPath || \'\')';
    if (it.errorPath != '""') {
      out += ' + ' + (it.errorPath);
    }
    var $parentData = $dataLvl ? 'data' + (($dataLvl - 1) || '') : 'parentData',
      $parentDataProperty = $dataLvl ? it.dataPathArr[$dataLvl] : 'parentDataProperty';
    out += ' , ' + ($parentData) + ' , ' + ($parentDataProperty) + ' , rootData )  ';
    var def_callRuleValidate = out;
    out = $$outStack.pop();
    if ($rDef.errors === false) {
      out += ' ' + ($valid) + ' = ';
      if ($asyncKeyword) {
        out += 'await ';
      }
      out += '' + (def_callRuleValidate) + '; ';
    } else {
      if ($asyncKeyword) {
        $ruleErrs = 'customErrors' + $lvl;
        out += ' var ' + ($ruleErrs) + ' = null; try { ' + ($valid) + ' = await ' + (def_callRuleValidate) + '; } catch (e) { ' + ($valid) + ' = false; if (e instanceof ValidationError) ' + ($ruleErrs) + ' = e.errors; else throw e; } ';
      } else {
        out += ' ' + ($ruleErrs) + ' = null; ' + ($valid) + ' = ' + (def_callRuleValidate) + '; ';
      }
    }
  }
  if ($rDef.modifying) {
    out += ' if (' + ($parentData) + ') ' + ($data) + ' = ' + ($parentData) + '[' + ($parentDataProperty) + '];';
  }
  out += '' + ($closingBraces);
  if ($rDef.valid) {
    if ($breakOnError) {
      out += ' if (true) { ';
    }
  } else {
    out += ' if ( ';
    if ($rDef.valid === undefined) {
      out += ' !';
      if ($macro) {
        out += '' + ($nextValid);
      } else {
        out += '' + ($valid);
      }
    } else {
      out += ' ' + (!$rDef.valid) + ' ';
    }
    out += ') { ';
    $errorKeyword = $rule.keyword;
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = '';
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = ''; /* istanbul ignore else */
    if (it.createErrors !== false) {
      out += ' { keyword: \'' + ($errorKeyword || 'custom') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { keyword: \'' + ($rule.keyword) + '\' } ';
      if (it.opts.messages !== false) {
        out += ' , message: \'should pass "' + ($rule.keyword) + '" keyword validation\' ';
      }
      if (it.opts.verbose) {
        out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
      }
      out += ' } ';
    } else {
      out += ' {} ';
    }
    var __err = out;
    out = $$outStack.pop();
    if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
      if (it.async) {
        out += ' throw new ValidationError([' + (__err) + ']); ';
      } else {
        out += ' validate.errors = [' + (__err) + ']; return false; ';
      }
    } else {
      out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
    }
    var def_customError = out;
    out = $$outStack.pop();
    if ($inline) {
      if ($rDef.errors) {
        if ($rDef.errors != 'full') {
          out += '  for (var ' + ($i) + '=' + ($errs) + '; ' + ($i) + '<errors; ' + ($i) + '++) { var ' + ($ruleErr) + ' = vErrors[' + ($i) + ']; if (' + ($ruleErr) + '.dataPath === undefined) ' + ($ruleErr) + '.dataPath = (dataPath || \'\') + ' + (it.errorPath) + '; if (' + ($ruleErr) + '.schemaPath === undefined) { ' + ($ruleErr) + '.schemaPath = "' + ($errSchemaPath) + '"; } ';
          if (it.opts.verbose) {
            out += ' ' + ($ruleErr) + '.schema = ' + ($schemaValue) + '; ' + ($ruleErr) + '.data = ' + ($data) + '; ';
          }
          out += ' } ';
        }
      } else {
        if ($rDef.errors === false) {
          out += ' ' + (def_customError) + ' ';
        } else {
          out += ' if (' + ($errs) + ' == errors) { ' + (def_customError) + ' } else {  for (var ' + ($i) + '=' + ($errs) + '; ' + ($i) + '<errors; ' + ($i) + '++) { var ' + ($ruleErr) + ' = vErrors[' + ($i) + ']; if (' + ($ruleErr) + '.dataPath === undefined) ' + ($ruleErr) + '.dataPath = (dataPath || \'\') + ' + (it.errorPath) + '; if (' + ($ruleErr) + '.schemaPath === undefined) { ' + ($ruleErr) + '.schemaPath = "' + ($errSchemaPath) + '"; } ';
          if (it.opts.verbose) {
            out += ' ' + ($ruleErr) + '.schema = ' + ($schemaValue) + '; ' + ($ruleErr) + '.data = ' + ($data) + '; ';
          }
          out += ' } } ';
        }
      }
    } else if ($macro) {
      out += '   var err =   '; /* istanbul ignore else */
      if (it.createErrors !== false) {
        out += ' { keyword: \'' + ($errorKeyword || 'custom') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { keyword: \'' + ($rule.keyword) + '\' } ';
        if (it.opts.messages !== false) {
          out += ' , message: \'should pass "' + ($rule.keyword) + '" keyword validation\' ';
        }
        if (it.opts.verbose) {
          out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
        }
        out += ' } ';
      } else {
        out += ' {} ';
      }
      out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
      if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
        if (it.async) {
          out += ' throw new ValidationError(vErrors); ';
        } else {
          out += ' validate.errors = vErrors; return false; ';
        }
      }
    } else {
      if ($rDef.errors === false) {
        out += ' ' + (def_customError) + ' ';
      } else {
        out += ' if (Array.isArray(' + ($ruleErrs) + ')) { if (vErrors === null) vErrors = ' + ($ruleErrs) + '; else vErrors = vErrors.concat(' + ($ruleErrs) + '); errors = vErrors.length;  for (var ' + ($i) + '=' + ($errs) + '; ' + ($i) + '<errors; ' + ($i) + '++) { var ' + ($ruleErr) + ' = vErrors[' + ($i) + ']; if (' + ($ruleErr) + '.dataPath === undefined) ' + ($ruleErr) + '.dataPath = (dataPath || \'\') + ' + (it.errorPath) + ';  ' + ($ruleErr) + '.schemaPath = "' + ($errSchemaPath) + '";  ';
        if (it.opts.verbose) {
          out += ' ' + ($ruleErr) + '.schema = ' + ($schemaValue) + '; ' + ($ruleErr) + '.data = ' + ($data) + '; ';
        }
        out += ' } } else { ' + (def_customError) + ' } ';
      }
    }
    out += ' } ';
    if ($breakOnError) {
      out += ' else { ';
    }
  }
  return out;
}


/***/ }),

/***/ "./node_modules/ajv/lib/dotjs/dependencies.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function generate_dependencies(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $errs = 'errs__' + $lvl;
  var $it = it.util.copy(it);
  var $closingBraces = '';
  $it.level++;
  var $nextValid = 'valid' + $it.level;
  var $schemaDeps = {},
    $propertyDeps = {},
    $ownProperties = it.opts.ownProperties;
  for ($property in $schema) {
    var $sch = $schema[$property];
    var $deps = Array.isArray($sch) ? $propertyDeps : $schemaDeps;
    $deps[$property] = $sch;
  }
  out += 'var ' + ($errs) + ' = errors;';
  var $currentErrorPath = it.errorPath;
  out += 'var missing' + ($lvl) + ';';
  for (var $property in $propertyDeps) {
    $deps = $propertyDeps[$property];
    if ($deps.length) {
      out += ' if ( ' + ($data) + (it.util.getProperty($property)) + ' !== undefined ';
      if ($ownProperties) {
        out += ' && Object.prototype.hasOwnProperty.call(' + ($data) + ', \'' + (it.util.escapeQuotes($property)) + '\') ';
      }
      if ($breakOnError) {
        out += ' && ( ';
        var arr1 = $deps;
        if (arr1) {
          var $propertyKey, $i = -1,
            l1 = arr1.length - 1;
          while ($i < l1) {
            $propertyKey = arr1[$i += 1];
            if ($i) {
              out += ' || ';
            }
            var $prop = it.util.getProperty($propertyKey),
              $useData = $data + $prop;
            out += ' ( ( ' + ($useData) + ' === undefined ';
            if ($ownProperties) {
              out += ' || ! Object.prototype.hasOwnProperty.call(' + ($data) + ', \'' + (it.util.escapeQuotes($propertyKey)) + '\') ';
            }
            out += ') && (missing' + ($lvl) + ' = ' + (it.util.toQuotedString(it.opts.jsonPointers ? $propertyKey : $prop)) + ') ) ';
          }
        }
        out += ')) {  ';
        var $propertyPath = 'missing' + $lvl,
          $missingProperty = '\' + ' + $propertyPath + ' + \'';
        if (it.opts._errorDataPathProperty) {
          it.errorPath = it.opts.jsonPointers ? it.util.getPathExpr($currentErrorPath, $propertyPath, true) : $currentErrorPath + ' + ' + $propertyPath;
        }
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = ''; /* istanbul ignore else */
        if (it.createErrors !== false) {
          out += ' { keyword: \'' + ('dependencies') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { property: \'' + (it.util.escapeQuotes($property)) + '\', missingProperty: \'' + ($missingProperty) + '\', depsCount: ' + ($deps.length) + ', deps: \'' + (it.util.escapeQuotes($deps.length == 1 ? $deps[0] : $deps.join(", "))) + '\' } ';
          if (it.opts.messages !== false) {
            out += ' , message: \'should have ';
            if ($deps.length == 1) {
              out += 'property ' + (it.util.escapeQuotes($deps[0]));
            } else {
              out += 'properties ' + (it.util.escapeQuotes($deps.join(", ")));
            }
            out += ' when property ' + (it.util.escapeQuotes($property)) + ' is present\' ';
          }
          if (it.opts.verbose) {
            out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
          }
          out += ' } ';
        } else {
          out += ' {} ';
        }
        var __err = out;
        out = $$outStack.pop();
        if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
          if (it.async) {
            out += ' throw new ValidationError([' + (__err) + ']); ';
          } else {
            out += ' validate.errors = [' + (__err) + ']; return false; ';
          }
        } else {
          out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
        }
      } else {
        out += ' ) { ';
        var arr2 = $deps;
        if (arr2) {
          var $propertyKey, i2 = -1,
            l2 = arr2.length - 1;
          while (i2 < l2) {
            $propertyKey = arr2[i2 += 1];
            var $prop = it.util.getProperty($propertyKey),
              $missingProperty = it.util.escapeQuotes($propertyKey),
              $useData = $data + $prop;
            if (it.opts._errorDataPathProperty) {
              it.errorPath = it.util.getPath($currentErrorPath, $propertyKey, it.opts.jsonPointers);
            }
            out += ' if ( ' + ($useData) + ' === undefined ';
            if ($ownProperties) {
              out += ' || ! Object.prototype.hasOwnProperty.call(' + ($data) + ', \'' + (it.util.escapeQuotes($propertyKey)) + '\') ';
            }
            out += ') {  var err =   '; /* istanbul ignore else */
            if (it.createErrors !== false) {
              out += ' { keyword: \'' + ('dependencies') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { property: \'' + (it.util.escapeQuotes($property)) + '\', missingProperty: \'' + ($missingProperty) + '\', depsCount: ' + ($deps.length) + ', deps: \'' + (it.util.escapeQuotes($deps.length == 1 ? $deps[0] : $deps.join(", "))) + '\' } ';
              if (it.opts.messages !== false) {
                out += ' , message: \'should have ';
                if ($deps.length == 1) {
                  out += 'property ' + (it.util.escapeQuotes($deps[0]));
                } else {
                  out += 'properties ' + (it.util.escapeQuotes($deps.join(", ")));
                }
                out += ' when property ' + (it.util.escapeQuotes($property)) + ' is present\' ';
              }
              if (it.opts.verbose) {
                out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
              }
              out += ' } ';
            } else {
              out += ' {} ';
            }
            out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } ';
          }
        }
      }
      out += ' }   ';
      if ($breakOnError) {
        $closingBraces += '}';
        out += ' else { ';
      }
    }
  }
  it.errorPath = $currentErrorPath;
  var $currentBaseId = $it.baseId;
  for (var $property in $schemaDeps) {
    var $sch = $schemaDeps[$property];
    if (it.util.schemaHasRules($sch, it.RULES.all)) {
      out += ' ' + ($nextValid) + ' = true; if ( ' + ($data) + (it.util.getProperty($property)) + ' !== undefined ';
      if ($ownProperties) {
        out += ' && Object.prototype.hasOwnProperty.call(' + ($data) + ', \'' + (it.util.escapeQuotes($property)) + '\') ';
      }
      out += ') { ';
      $it.schema = $sch;
      $it.schemaPath = $schemaPath + it.util.getProperty($property);
      $it.errSchemaPath = $errSchemaPath + '/' + it.util.escapeFragment($property);
      out += '  ' + (it.validate($it)) + ' ';
      $it.baseId = $currentBaseId;
      out += ' }  ';
      if ($breakOnError) {
        out += ' if (' + ($nextValid) + ') { ';
        $closingBraces += '}';
      }
    }
  }
  if ($breakOnError) {
    out += '   ' + ($closingBraces) + ' if (' + ($errs) + ' == errors) {';
  }
  out = it.util.cleanUpCode(out);
  return out;
}


/***/ }),

/***/ "./node_modules/ajv/lib/dotjs/enum.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function generate_enum(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $isData = it.opts.$data && $schema && $schema.$data,
    $schemaValue;
  if ($isData) {
    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  var $i = 'i' + $lvl,
    $vSchema = 'schema' + $lvl;
  if (!$isData) {
    out += ' var ' + ($vSchema) + ' = validate.schema' + ($schemaPath) + ';';
  }
  out += 'var ' + ($valid) + ';';
  if ($isData) {
    out += ' if (schema' + ($lvl) + ' === undefined) ' + ($valid) + ' = true; else if (!Array.isArray(schema' + ($lvl) + ')) ' + ($valid) + ' = false; else {';
  }
  out += '' + ($valid) + ' = false;for (var ' + ($i) + '=0; ' + ($i) + '<' + ($vSchema) + '.length; ' + ($i) + '++) if (equal(' + ($data) + ', ' + ($vSchema) + '[' + ($i) + '])) { ' + ($valid) + ' = true; break; }';
  if ($isData) {
    out += '  }  ';
  }
  out += ' if (!' + ($valid) + ') {   ';
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + ('enum') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { allowedValues: schema' + ($lvl) + ' } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should be equal to one of the allowed values\' ';
    }
    if (it.opts.verbose) {
      out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + (__err) + ']); ';
    } else {
      out += ' validate.errors = [' + (__err) + ']; return false; ';
    }
  } else {
    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += ' }';
  if ($breakOnError) {
    out += ' else { ';
  }
  return out;
}


/***/ }),

/***/ "./node_modules/ajv/lib/dotjs/format.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function generate_format(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  if (it.opts.format === false) {
    if ($breakOnError) {
      out += ' if (true) { ';
    }
    return out;
  }
  var $isData = it.opts.$data && $schema && $schema.$data,
    $schemaValue;
  if ($isData) {
    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  var $unknownFormats = it.opts.unknownFormats,
    $allowUnknown = Array.isArray($unknownFormats);
  if ($isData) {
    var $format = 'format' + $lvl,
      $isObject = 'isObject' + $lvl,
      $formatType = 'formatType' + $lvl;
    out += ' var ' + ($format) + ' = formats[' + ($schemaValue) + ']; var ' + ($isObject) + ' = typeof ' + ($format) + ' == \'object\' && !(' + ($format) + ' instanceof RegExp) && ' + ($format) + '.validate; var ' + ($formatType) + ' = ' + ($isObject) + ' && ' + ($format) + '.type || \'string\'; if (' + ($isObject) + ') { ';
    if (it.async) {
      out += ' var async' + ($lvl) + ' = ' + ($format) + '.async; ';
    }
    out += ' ' + ($format) + ' = ' + ($format) + '.validate; } if (  ';
    if ($isData) {
      out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'string\') || ';
    }
    out += ' (';
    if ($unknownFormats != 'ignore') {
      out += ' (' + ($schemaValue) + ' && !' + ($format) + ' ';
      if ($allowUnknown) {
        out += ' && self._opts.unknownFormats.indexOf(' + ($schemaValue) + ') == -1 ';
      }
      out += ') || ';
    }
    out += ' (' + ($format) + ' && ' + ($formatType) + ' == \'' + ($ruleType) + '\' && !(typeof ' + ($format) + ' == \'function\' ? ';
    if (it.async) {
      out += ' (async' + ($lvl) + ' ? await ' + ($format) + '(' + ($data) + ') : ' + ($format) + '(' + ($data) + ')) ';
    } else {
      out += ' ' + ($format) + '(' + ($data) + ') ';
    }
    out += ' : ' + ($format) + '.test(' + ($data) + '))))) {';
  } else {
    var $format = it.formats[$schema];
    if (!$format) {
      if ($unknownFormats == 'ignore') {
        it.logger.warn('unknown format "' + $schema + '" ignored in schema at path "' + it.errSchemaPath + '"');
        if ($breakOnError) {
          out += ' if (true) { ';
        }
        return out;
      } else if ($allowUnknown && $unknownFormats.indexOf($schema) >= 0) {
        if ($breakOnError) {
          out += ' if (true) { ';
        }
        return out;
      } else {
        throw new Error('unknown format "' + $schema + '" is used in schema at path "' + it.errSchemaPath + '"');
      }
    }
    var $isObject = typeof $format == 'object' && !($format instanceof RegExp) && $format.validate;
    var $formatType = $isObject && $format.type || 'string';
    if ($isObject) {
      var $async = $format.async === true;
      $format = $format.validate;
    }
    if ($formatType != $ruleType) {
      if ($breakOnError) {
        out += ' if (true) { ';
      }
      return out;
    }
    if ($async) {
      if (!it.async) throw new Error('async format in sync schema');
      var $formatRef = 'formats' + it.util.getProperty($schema) + '.validate';
      out += ' if (!(await ' + ($formatRef) + '(' + ($data) + '))) { ';
    } else {
      out += ' if (! ';
      var $formatRef = 'formats' + it.util.getProperty($schema);
      if ($isObject) $formatRef += '.validate';
      if (typeof $format == 'function') {
        out += ' ' + ($formatRef) + '(' + ($data) + ') ';
      } else {
        out += ' ' + ($formatRef) + '.test(' + ($data) + ') ';
      }
      out += ') { ';
    }
  }
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + ('format') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { format:  ';
    if ($isData) {
      out += '' + ($schemaValue);
    } else {
      out += '' + (it.util.toQuotedString($schema));
    }
    out += '  } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should match format "';
      if ($isData) {
        out += '\' + ' + ($schemaValue) + ' + \'';
      } else {
        out += '' + (it.util.escapeQuotes($schema));
      }
      out += '"\' ';
    }
    if (it.opts.verbose) {
      out += ' , schema:  ';
      if ($isData) {
        out += 'validate.schema' + ($schemaPath);
      } else {
        out += '' + (it.util.toQuotedString($schema));
      }
      out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + (__err) + ']); ';
    } else {
      out += ' validate.errors = [' + (__err) + ']; return false; ';
    }
  } else {
    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += ' } ';
  if ($breakOnError) {
    out += ' else { ';
  }
  return out;
}


/***/ }),

/***/ "./node_modules/ajv/lib/dotjs/if.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function generate_if(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $errs = 'errs__' + $lvl;
  var $it = it.util.copy(it);
  $it.level++;
  var $nextValid = 'valid' + $it.level;
  var $thenSch = it.schema['then'],
    $elseSch = it.schema['else'],
    $thenPresent = $thenSch !== undefined && it.util.schemaHasRules($thenSch, it.RULES.all),
    $elsePresent = $elseSch !== undefined && it.util.schemaHasRules($elseSch, it.RULES.all),
    $currentBaseId = $it.baseId;
  if ($thenPresent || $elsePresent) {
    var $ifClause;
    $it.createErrors = false;
    $it.schema = $schema;
    $it.schemaPath = $schemaPath;
    $it.errSchemaPath = $errSchemaPath;
    out += ' var ' + ($errs) + ' = errors; var ' + ($valid) + ' = true;  ';
    var $wasComposite = it.compositeRule;
    it.compositeRule = $it.compositeRule = true;
    out += '  ' + (it.validate($it)) + ' ';
    $it.baseId = $currentBaseId;
    $it.createErrors = true;
    out += '  errors = ' + ($errs) + '; if (vErrors !== null) { if (' + ($errs) + ') vErrors.length = ' + ($errs) + '; else vErrors = null; }  ';
    it.compositeRule = $it.compositeRule = $wasComposite;
    if ($thenPresent) {
      out += ' if (' + ($nextValid) + ') {  ';
      $it.schema = it.schema['then'];
      $it.schemaPath = it.schemaPath + '.then';
      $it.errSchemaPath = it.errSchemaPath + '/then';
      out += '  ' + (it.validate($it)) + ' ';
      $it.baseId = $currentBaseId;
      out += ' ' + ($valid) + ' = ' + ($nextValid) + '; ';
      if ($thenPresent && $elsePresent) {
        $ifClause = 'ifClause' + $lvl;
        out += ' var ' + ($ifClause) + ' = \'then\'; ';
      } else {
        $ifClause = '\'then\'';
      }
      out += ' } ';
      if ($elsePresent) {
        out += ' else { ';
      }
    } else {
      out += ' if (!' + ($nextValid) + ') { ';
    }
    if ($elsePresent) {
      $it.schema = it.schema['else'];
      $it.schemaPath = it.schemaPath + '.else';
      $it.errSchemaPath = it.errSchemaPath + '/else';
      out += '  ' + (it.validate($it)) + ' ';
      $it.baseId = $currentBaseId;
      out += ' ' + ($valid) + ' = ' + ($nextValid) + '; ';
      if ($thenPresent && $elsePresent) {
        $ifClause = 'ifClause' + $lvl;
        out += ' var ' + ($ifClause) + ' = \'else\'; ';
      } else {
        $ifClause = '\'else\'';
      }
      out += ' } ';
    }
    out += ' if (!' + ($valid) + ') {   var err =   '; /* istanbul ignore else */
    if (it.createErrors !== false) {
      out += ' { keyword: \'' + ('if') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { failingKeyword: ' + ($ifClause) + ' } ';
      if (it.opts.messages !== false) {
        out += ' , message: \'should match "\' + ' + ($ifClause) + ' + \'" schema\' ';
      }
      if (it.opts.verbose) {
        out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
      }
      out += ' } ';
    } else {
      out += ' {} ';
    }
    out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
    if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
      if (it.async) {
        out += ' throw new ValidationError(vErrors); ';
      } else {
        out += ' validate.errors = vErrors; return false; ';
      }
    }
    out += ' }   ';
    if ($breakOnError) {
      out += ' else { ';
    }
    out = it.util.cleanUpCode(out);
  } else {
    if ($breakOnError) {
      out += ' if (true) { ';
    }
  }
  return out;
}


/***/ }),

/***/ "./node_modules/ajv/lib/dotjs/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//all requires must be explicit because browserify won't work with dynamic requires
module.exports = {
  '$ref': __webpack_require__("./node_modules/ajv/lib/dotjs/ref.js"),
  allOf: __webpack_require__("./node_modules/ajv/lib/dotjs/allOf.js"),
  anyOf: __webpack_require__("./node_modules/ajv/lib/dotjs/anyOf.js"),
  '$comment': __webpack_require__("./node_modules/ajv/lib/dotjs/comment.js"),
  const: __webpack_require__("./node_modules/ajv/lib/dotjs/const.js"),
  contains: __webpack_require__("./node_modules/ajv/lib/dotjs/contains.js"),
  dependencies: __webpack_require__("./node_modules/ajv/lib/dotjs/dependencies.js"),
  'enum': __webpack_require__("./node_modules/ajv/lib/dotjs/enum.js"),
  format: __webpack_require__("./node_modules/ajv/lib/dotjs/format.js"),
  'if': __webpack_require__("./node_modules/ajv/lib/dotjs/if.js"),
  items: __webpack_require__("./node_modules/ajv/lib/dotjs/items.js"),
  maximum: __webpack_require__("./node_modules/ajv/lib/dotjs/_limit.js"),
  minimum: __webpack_require__("./node_modules/ajv/lib/dotjs/_limit.js"),
  maxItems: __webpack_require__("./node_modules/ajv/lib/dotjs/_limitItems.js"),
  minItems: __webpack_require__("./node_modules/ajv/lib/dotjs/_limitItems.js"),
  maxLength: __webpack_require__("./node_modules/ajv/lib/dotjs/_limitLength.js"),
  minLength: __webpack_require__("./node_modules/ajv/lib/dotjs/_limitLength.js"),
  maxProperties: __webpack_require__("./node_modules/ajv/lib/dotjs/_limitProperties.js"),
  minProperties: __webpack_require__("./node_modules/ajv/lib/dotjs/_limitProperties.js"),
  multipleOf: __webpack_require__("./node_modules/ajv/lib/dotjs/multipleOf.js"),
  not: __webpack_require__("./node_modules/ajv/lib/dotjs/not.js"),
  oneOf: __webpack_require__("./node_modules/ajv/lib/dotjs/oneOf.js"),
  pattern: __webpack_require__("./node_modules/ajv/lib/dotjs/pattern.js"),
  properties: __webpack_require__("./node_modules/ajv/lib/dotjs/properties.js"),
  propertyNames: __webpack_require__("./node_modules/ajv/lib/dotjs/propertyNames.js"),
  required: __webpack_require__("./node_modules/ajv/lib/dotjs/required.js"),
  uniqueItems: __webpack_require__("./node_modules/ajv/lib/dotjs/uniqueItems.js"),
  validate: __webpack_require__("./node_modules/ajv/lib/dotjs/validate.js")
};


/***/ }),

/***/ "./node_modules/ajv/lib/dotjs/items.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function generate_items(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $errs = 'errs__' + $lvl;
  var $it = it.util.copy(it);
  var $closingBraces = '';
  $it.level++;
  var $nextValid = 'valid' + $it.level;
  var $idx = 'i' + $lvl,
    $dataNxt = $it.dataLevel = it.dataLevel + 1,
    $nextData = 'data' + $dataNxt,
    $currentBaseId = it.baseId;
  out += 'var ' + ($errs) + ' = errors;var ' + ($valid) + ';';
  if (Array.isArray($schema)) {
    var $additionalItems = it.schema.additionalItems;
    if ($additionalItems === false) {
      out += ' ' + ($valid) + ' = ' + ($data) + '.length <= ' + ($schema.length) + '; ';
      var $currErrSchemaPath = $errSchemaPath;
      $errSchemaPath = it.errSchemaPath + '/additionalItems';
      out += '  if (!' + ($valid) + ') {   ';
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = ''; /* istanbul ignore else */
      if (it.createErrors !== false) {
        out += ' { keyword: \'' + ('additionalItems') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { limit: ' + ($schema.length) + ' } ';
        if (it.opts.messages !== false) {
          out += ' , message: \'should NOT have more than ' + ($schema.length) + ' items\' ';
        }
        if (it.opts.verbose) {
          out += ' , schema: false , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
        }
        out += ' } ';
      } else {
        out += ' {} ';
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
        if (it.async) {
          out += ' throw new ValidationError([' + (__err) + ']); ';
        } else {
          out += ' validate.errors = [' + (__err) + ']; return false; ';
        }
      } else {
        out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
      }
      out += ' } ';
      $errSchemaPath = $currErrSchemaPath;
      if ($breakOnError) {
        $closingBraces += '}';
        out += ' else { ';
      }
    }
    var arr1 = $schema;
    if (arr1) {
      var $sch, $i = -1,
        l1 = arr1.length - 1;
      while ($i < l1) {
        $sch = arr1[$i += 1];
        if (it.util.schemaHasRules($sch, it.RULES.all)) {
          out += ' ' + ($nextValid) + ' = true; if (' + ($data) + '.length > ' + ($i) + ') { ';
          var $passData = $data + '[' + $i + ']';
          $it.schema = $sch;
          $it.schemaPath = $schemaPath + '[' + $i + ']';
          $it.errSchemaPath = $errSchemaPath + '/' + $i;
          $it.errorPath = it.util.getPathExpr(it.errorPath, $i, it.opts.jsonPointers, true);
          $it.dataPathArr[$dataNxt] = $i;
          var $code = it.validate($it);
          $it.baseId = $currentBaseId;
          if (it.util.varOccurences($code, $nextData) < 2) {
            out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
          } else {
            out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
          }
          out += ' }  ';
          if ($breakOnError) {
            out += ' if (' + ($nextValid) + ') { ';
            $closingBraces += '}';
          }
        }
      }
    }
    if (typeof $additionalItems == 'object' && it.util.schemaHasRules($additionalItems, it.RULES.all)) {
      $it.schema = $additionalItems;
      $it.schemaPath = it.schemaPath + '.additionalItems';
      $it.errSchemaPath = it.errSchemaPath + '/additionalItems';
      out += ' ' + ($nextValid) + ' = true; if (' + ($data) + '.length > ' + ($schema.length) + ') {  for (var ' + ($idx) + ' = ' + ($schema.length) + '; ' + ($idx) + ' < ' + ($data) + '.length; ' + ($idx) + '++) { ';
      $it.errorPath = it.util.getPathExpr(it.errorPath, $idx, it.opts.jsonPointers, true);
      var $passData = $data + '[' + $idx + ']';
      $it.dataPathArr[$dataNxt] = $idx;
      var $code = it.validate($it);
      $it.baseId = $currentBaseId;
      if (it.util.varOccurences($code, $nextData) < 2) {
        out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
      } else {
        out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
      }
      if ($breakOnError) {
        out += ' if (!' + ($nextValid) + ') break; ';
      }
      out += ' } }  ';
      if ($breakOnError) {
        out += ' if (' + ($nextValid) + ') { ';
        $closingBraces += '}';
      }
    }
  } else if (it.util.schemaHasRules($schema, it.RULES.all)) {
    $it.schema = $schema;
    $it.schemaPath = $schemaPath;
    $it.errSchemaPath = $errSchemaPath;
    out += '  for (var ' + ($idx) + ' = ' + (0) + '; ' + ($idx) + ' < ' + ($data) + '.length; ' + ($idx) + '++) { ';
    $it.errorPath = it.util.getPathExpr(it.errorPath, $idx, it.opts.jsonPointers, true);
    var $passData = $data + '[' + $idx + ']';
    $it.dataPathArr[$dataNxt] = $idx;
    var $code = it.validate($it);
    $it.baseId = $currentBaseId;
    if (it.util.varOccurences($code, $nextData) < 2) {
      out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
    } else {
      out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
    }
    if ($breakOnError) {
      out += ' if (!' + ($nextValid) + ') break; ';
    }
    out += ' }';
  }
  if ($breakOnError) {
    out += ' ' + ($closingBraces) + ' if (' + ($errs) + ' == errors) {';
  }
  out = it.util.cleanUpCode(out);
  return out;
}


/***/ }),

/***/ "./node_modules/ajv/lib/dotjs/multipleOf.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function generate_multipleOf(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $isData = it.opts.$data && $schema && $schema.$data,
    $schemaValue;
  if ($isData) {
    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  out += 'var division' + ($lvl) + ';if (';
  if ($isData) {
    out += ' ' + ($schemaValue) + ' !== undefined && ( typeof ' + ($schemaValue) + ' != \'number\' || ';
  }
  out += ' (division' + ($lvl) + ' = ' + ($data) + ' / ' + ($schemaValue) + ', ';
  if (it.opts.multipleOfPrecision) {
    out += ' Math.abs(Math.round(division' + ($lvl) + ') - division' + ($lvl) + ') > 1e-' + (it.opts.multipleOfPrecision) + ' ';
  } else {
    out += ' division' + ($lvl) + ' !== parseInt(division' + ($lvl) + ') ';
  }
  out += ' ) ';
  if ($isData) {
    out += '  )  ';
  }
  out += ' ) {   ';
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + ('multipleOf') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { multipleOf: ' + ($schemaValue) + ' } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should be multiple of ';
      if ($isData) {
        out += '\' + ' + ($schemaValue);
      } else {
        out += '' + ($schemaValue) + '\'';
      }
    }
    if (it.opts.verbose) {
      out += ' , schema:  ';
      if ($isData) {
        out += 'validate.schema' + ($schemaPath);
      } else {
        out += '' + ($schema);
      }
      out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + (__err) + ']); ';
    } else {
      out += ' validate.errors = [' + (__err) + ']; return false; ';
    }
  } else {
    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += '} ';
  if ($breakOnError) {
    out += ' else { ';
  }
  return out;
}


/***/ }),

/***/ "./node_modules/ajv/lib/dotjs/not.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function generate_not(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $errs = 'errs__' + $lvl;
  var $it = it.util.copy(it);
  $it.level++;
  var $nextValid = 'valid' + $it.level;
  if (it.util.schemaHasRules($schema, it.RULES.all)) {
    $it.schema = $schema;
    $it.schemaPath = $schemaPath;
    $it.errSchemaPath = $errSchemaPath;
    out += ' var ' + ($errs) + ' = errors;  ';
    var $wasComposite = it.compositeRule;
    it.compositeRule = $it.compositeRule = true;
    $it.createErrors = false;
    var $allErrorsOption;
    if ($it.opts.allErrors) {
      $allErrorsOption = $it.opts.allErrors;
      $it.opts.allErrors = false;
    }
    out += ' ' + (it.validate($it)) + ' ';
    $it.createErrors = true;
    if ($allErrorsOption) $it.opts.allErrors = $allErrorsOption;
    it.compositeRule = $it.compositeRule = $wasComposite;
    out += ' if (' + ($nextValid) + ') {   ';
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = ''; /* istanbul ignore else */
    if (it.createErrors !== false) {
      out += ' { keyword: \'' + ('not') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: {} ';
      if (it.opts.messages !== false) {
        out += ' , message: \'should NOT be valid\' ';
      }
      if (it.opts.verbose) {
        out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
      }
      out += ' } ';
    } else {
      out += ' {} ';
    }
    var __err = out;
    out = $$outStack.pop();
    if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
      if (it.async) {
        out += ' throw new ValidationError([' + (__err) + ']); ';
      } else {
        out += ' validate.errors = [' + (__err) + ']; return false; ';
      }
    } else {
      out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
    }
    out += ' } else {  errors = ' + ($errs) + '; if (vErrors !== null) { if (' + ($errs) + ') vErrors.length = ' + ($errs) + '; else vErrors = null; } ';
    if (it.opts.allErrors) {
      out += ' } ';
    }
  } else {
    out += '  var err =   '; /* istanbul ignore else */
    if (it.createErrors !== false) {
      out += ' { keyword: \'' + ('not') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: {} ';
      if (it.opts.messages !== false) {
        out += ' , message: \'should NOT be valid\' ';
      }
      if (it.opts.verbose) {
        out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
      }
      out += ' } ';
    } else {
      out += ' {} ';
    }
    out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
    if ($breakOnError) {
      out += ' if (false) { ';
    }
  }
  return out;
}


/***/ }),

/***/ "./node_modules/ajv/lib/dotjs/oneOf.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function generate_oneOf(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $errs = 'errs__' + $lvl;
  var $it = it.util.copy(it);
  var $closingBraces = '';
  $it.level++;
  var $nextValid = 'valid' + $it.level;
  var $currentBaseId = $it.baseId,
    $prevValid = 'prevValid' + $lvl,
    $passingSchemas = 'passingSchemas' + $lvl;
  out += 'var ' + ($errs) + ' = errors , ' + ($prevValid) + ' = false , ' + ($valid) + ' = false , ' + ($passingSchemas) + ' = null; ';
  var $wasComposite = it.compositeRule;
  it.compositeRule = $it.compositeRule = true;
  var arr1 = $schema;
  if (arr1) {
    var $sch, $i = -1,
      l1 = arr1.length - 1;
    while ($i < l1) {
      $sch = arr1[$i += 1];
      if (it.util.schemaHasRules($sch, it.RULES.all)) {
        $it.schema = $sch;
        $it.schemaPath = $schemaPath + '[' + $i + ']';
        $it.errSchemaPath = $errSchemaPath + '/' + $i;
        out += '  ' + (it.validate($it)) + ' ';
        $it.baseId = $currentBaseId;
      } else {
        out += ' var ' + ($nextValid) + ' = true; ';
      }
      if ($i) {
        out += ' if (' + ($nextValid) + ' && ' + ($prevValid) + ') { ' + ($valid) + ' = false; ' + ($passingSchemas) + ' = [' + ($passingSchemas) + ', ' + ($i) + ']; } else { ';
        $closingBraces += '}';
      }
      out += ' if (' + ($nextValid) + ') { ' + ($valid) + ' = ' + ($prevValid) + ' = true; ' + ($passingSchemas) + ' = ' + ($i) + '; }';
    }
  }
  it.compositeRule = $it.compositeRule = $wasComposite;
  out += '' + ($closingBraces) + 'if (!' + ($valid) + ') {   var err =   '; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + ('oneOf') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { passingSchemas: ' + ($passingSchemas) + ' } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should match exactly one schema in oneOf\' ';
    }
    if (it.opts.verbose) {
      out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError(vErrors); ';
    } else {
      out += ' validate.errors = vErrors; return false; ';
    }
  }
  out += '} else {  errors = ' + ($errs) + '; if (vErrors !== null) { if (' + ($errs) + ') vErrors.length = ' + ($errs) + '; else vErrors = null; }';
  if (it.opts.allErrors) {
    out += ' } ';
  }
  return out;
}


/***/ }),

/***/ "./node_modules/ajv/lib/dotjs/pattern.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function generate_pattern(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $isData = it.opts.$data && $schema && $schema.$data,
    $schemaValue;
  if ($isData) {
    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  var $regexp = $isData ? '(new RegExp(' + $schemaValue + '))' : it.usePattern($schema);
  out += 'if ( ';
  if ($isData) {
    out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'string\') || ';
  }
  out += ' !' + ($regexp) + '.test(' + ($data) + ') ) {   ';
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + ('pattern') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { pattern:  ';
    if ($isData) {
      out += '' + ($schemaValue);
    } else {
      out += '' + (it.util.toQuotedString($schema));
    }
    out += '  } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should match pattern "';
      if ($isData) {
        out += '\' + ' + ($schemaValue) + ' + \'';
      } else {
        out += '' + (it.util.escapeQuotes($schema));
      }
      out += '"\' ';
    }
    if (it.opts.verbose) {
      out += ' , schema:  ';
      if ($isData) {
        out += 'validate.schema' + ($schemaPath);
      } else {
        out += '' + (it.util.toQuotedString($schema));
      }
      out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + (__err) + ']); ';
    } else {
      out += ' validate.errors = [' + (__err) + ']; return false; ';
    }
  } else {
    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += '} ';
  if ($breakOnError) {
    out += ' else { ';
  }
  return out;
}


/***/ }),

/***/ "./node_modules/ajv/lib/dotjs/properties.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function generate_properties(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $errs = 'errs__' + $lvl;
  var $it = it.util.copy(it);
  var $closingBraces = '';
  $it.level++;
  var $nextValid = 'valid' + $it.level;
  var $key = 'key' + $lvl,
    $idx = 'idx' + $lvl,
    $dataNxt = $it.dataLevel = it.dataLevel + 1,
    $nextData = 'data' + $dataNxt,
    $dataProperties = 'dataProperties' + $lvl;
  var $schemaKeys = Object.keys($schema || {}),
    $pProperties = it.schema.patternProperties || {},
    $pPropertyKeys = Object.keys($pProperties),
    $aProperties = it.schema.additionalProperties,
    $someProperties = $schemaKeys.length || $pPropertyKeys.length,
    $noAdditional = $aProperties === false,
    $additionalIsSchema = typeof $aProperties == 'object' && Object.keys($aProperties).length,
    $removeAdditional = it.opts.removeAdditional,
    $checkAdditional = $noAdditional || $additionalIsSchema || $removeAdditional,
    $ownProperties = it.opts.ownProperties,
    $currentBaseId = it.baseId;
  var $required = it.schema.required;
  if ($required && !(it.opts.$data && $required.$data) && $required.length < it.opts.loopRequired) var $requiredHash = it.util.toHash($required);
  out += 'var ' + ($errs) + ' = errors;var ' + ($nextValid) + ' = true;';
  if ($ownProperties) {
    out += ' var ' + ($dataProperties) + ' = undefined;';
  }
  if ($checkAdditional) {
    if ($ownProperties) {
      out += ' ' + ($dataProperties) + ' = ' + ($dataProperties) + ' || Object.keys(' + ($data) + '); for (var ' + ($idx) + '=0; ' + ($idx) + '<' + ($dataProperties) + '.length; ' + ($idx) + '++) { var ' + ($key) + ' = ' + ($dataProperties) + '[' + ($idx) + ']; ';
    } else {
      out += ' for (var ' + ($key) + ' in ' + ($data) + ') { ';
    }
    if ($someProperties) {
      out += ' var isAdditional' + ($lvl) + ' = !(false ';
      if ($schemaKeys.length) {
        if ($schemaKeys.length > 8) {
          out += ' || validate.schema' + ($schemaPath) + '.hasOwnProperty(' + ($key) + ') ';
        } else {
          var arr1 = $schemaKeys;
          if (arr1) {
            var $propertyKey, i1 = -1,
              l1 = arr1.length - 1;
            while (i1 < l1) {
              $propertyKey = arr1[i1 += 1];
              out += ' || ' + ($key) + ' == ' + (it.util.toQuotedString($propertyKey)) + ' ';
            }
          }
        }
      }
      if ($pPropertyKeys.length) {
        var arr2 = $pPropertyKeys;
        if (arr2) {
          var $pProperty, $i = -1,
            l2 = arr2.length - 1;
          while ($i < l2) {
            $pProperty = arr2[$i += 1];
            out += ' || ' + (it.usePattern($pProperty)) + '.test(' + ($key) + ') ';
          }
        }
      }
      out += ' ); if (isAdditional' + ($lvl) + ') { ';
    }
    if ($removeAdditional == 'all') {
      out += ' delete ' + ($data) + '[' + ($key) + ']; ';
    } else {
      var $currentErrorPath = it.errorPath;
      var $additionalProperty = '\' + ' + $key + ' + \'';
      if (it.opts._errorDataPathProperty) {
        it.errorPath = it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
      }
      if ($noAdditional) {
        if ($removeAdditional) {
          out += ' delete ' + ($data) + '[' + ($key) + ']; ';
        } else {
          out += ' ' + ($nextValid) + ' = false; ';
          var $currErrSchemaPath = $errSchemaPath;
          $errSchemaPath = it.errSchemaPath + '/additionalProperties';
          var $$outStack = $$outStack || [];
          $$outStack.push(out);
          out = ''; /* istanbul ignore else */
          if (it.createErrors !== false) {
            out += ' { keyword: \'' + ('additionalProperties') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { additionalProperty: \'' + ($additionalProperty) + '\' } ';
            if (it.opts.messages !== false) {
              out += ' , message: \'';
              if (it.opts._errorDataPathProperty) {
                out += 'is an invalid additional property';
              } else {
                out += 'should NOT have additional properties';
              }
              out += '\' ';
            }
            if (it.opts.verbose) {
              out += ' , schema: false , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
            }
            out += ' } ';
          } else {
            out += ' {} ';
          }
          var __err = out;
          out = $$outStack.pop();
          if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
            if (it.async) {
              out += ' throw new ValidationError([' + (__err) + ']); ';
            } else {
              out += ' validate.errors = [' + (__err) + ']; return false; ';
            }
          } else {
            out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
          }
          $errSchemaPath = $currErrSchemaPath;
          if ($breakOnError) {
            out += ' break; ';
          }
        }
      } else if ($additionalIsSchema) {
        if ($removeAdditional == 'failing') {
          out += ' var ' + ($errs) + ' = errors;  ';
          var $wasComposite = it.compositeRule;
          it.compositeRule = $it.compositeRule = true;
          $it.schema = $aProperties;
          $it.schemaPath = it.schemaPath + '.additionalProperties';
          $it.errSchemaPath = it.errSchemaPath + '/additionalProperties';
          $it.errorPath = it.opts._errorDataPathProperty ? it.errorPath : it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
          var $passData = $data + '[' + $key + ']';
          $it.dataPathArr[$dataNxt] = $key;
          var $code = it.validate($it);
          $it.baseId = $currentBaseId;
          if (it.util.varOccurences($code, $nextData) < 2) {
            out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
          } else {
            out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
          }
          out += ' if (!' + ($nextValid) + ') { errors = ' + ($errs) + '; if (validate.errors !== null) { if (errors) validate.errors.length = errors; else validate.errors = null; } delete ' + ($data) + '[' + ($key) + ']; }  ';
          it.compositeRule = $it.compositeRule = $wasComposite;
        } else {
          $it.schema = $aProperties;
          $it.schemaPath = it.schemaPath + '.additionalProperties';
          $it.errSchemaPath = it.errSchemaPath + '/additionalProperties';
          $it.errorPath = it.opts._errorDataPathProperty ? it.errorPath : it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
          var $passData = $data + '[' + $key + ']';
          $it.dataPathArr[$dataNxt] = $key;
          var $code = it.validate($it);
          $it.baseId = $currentBaseId;
          if (it.util.varOccurences($code, $nextData) < 2) {
            out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
          } else {
            out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
          }
          if ($breakOnError) {
            out += ' if (!' + ($nextValid) + ') break; ';
          }
        }
      }
      it.errorPath = $currentErrorPath;
    }
    if ($someProperties) {
      out += ' } ';
    }
    out += ' }  ';
    if ($breakOnError) {
      out += ' if (' + ($nextValid) + ') { ';
      $closingBraces += '}';
    }
  }
  var $useDefaults = it.opts.useDefaults && !it.compositeRule;
  if ($schemaKeys.length) {
    var arr3 = $schemaKeys;
    if (arr3) {
      var $propertyKey, i3 = -1,
        l3 = arr3.length - 1;
      while (i3 < l3) {
        $propertyKey = arr3[i3 += 1];
        var $sch = $schema[$propertyKey];
        if (it.util.schemaHasRules($sch, it.RULES.all)) {
          var $prop = it.util.getProperty($propertyKey),
            $passData = $data + $prop,
            $hasDefault = $useDefaults && $sch.default !== undefined;
          $it.schema = $sch;
          $it.schemaPath = $schemaPath + $prop;
          $it.errSchemaPath = $errSchemaPath + '/' + it.util.escapeFragment($propertyKey);
          $it.errorPath = it.util.getPath(it.errorPath, $propertyKey, it.opts.jsonPointers);
          $it.dataPathArr[$dataNxt] = it.util.toQuotedString($propertyKey);
          var $code = it.validate($it);
          $it.baseId = $currentBaseId;
          if (it.util.varOccurences($code, $nextData) < 2) {
            $code = it.util.varReplace($code, $nextData, $passData);
            var $useData = $passData;
          } else {
            var $useData = $nextData;
            out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ';
          }
          if ($hasDefault) {
            out += ' ' + ($code) + ' ';
          } else {
            if ($requiredHash && $requiredHash[$propertyKey]) {
              out += ' if ( ' + ($useData) + ' === undefined ';
              if ($ownProperties) {
                out += ' || ! Object.prototype.hasOwnProperty.call(' + ($data) + ', \'' + (it.util.escapeQuotes($propertyKey)) + '\') ';
              }
              out += ') { ' + ($nextValid) + ' = false; ';
              var $currentErrorPath = it.errorPath,
                $currErrSchemaPath = $errSchemaPath,
                $missingProperty = it.util.escapeQuotes($propertyKey);
              if (it.opts._errorDataPathProperty) {
                it.errorPath = it.util.getPath($currentErrorPath, $propertyKey, it.opts.jsonPointers);
              }
              $errSchemaPath = it.errSchemaPath + '/required';
              var $$outStack = $$outStack || [];
              $$outStack.push(out);
              out = ''; /* istanbul ignore else */
              if (it.createErrors !== false) {
                out += ' { keyword: \'' + ('required') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { missingProperty: \'' + ($missingProperty) + '\' } ';
                if (it.opts.messages !== false) {
                  out += ' , message: \'';
                  if (it.opts._errorDataPathProperty) {
                    out += 'is a required property';
                  } else {
                    out += 'should have required property \\\'' + ($missingProperty) + '\\\'';
                  }
                  out += '\' ';
                }
                if (it.opts.verbose) {
                  out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
                }
                out += ' } ';
              } else {
                out += ' {} ';
              }
              var __err = out;
              out = $$outStack.pop();
              if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
                if (it.async) {
                  out += ' throw new ValidationError([' + (__err) + ']); ';
                } else {
                  out += ' validate.errors = [' + (__err) + ']; return false; ';
                }
              } else {
                out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
              }
              $errSchemaPath = $currErrSchemaPath;
              it.errorPath = $currentErrorPath;
              out += ' } else { ';
            } else {
              if ($breakOnError) {
                out += ' if ( ' + ($useData) + ' === undefined ';
                if ($ownProperties) {
                  out += ' || ! Object.prototype.hasOwnProperty.call(' + ($data) + ', \'' + (it.util.escapeQuotes($propertyKey)) + '\') ';
                }
                out += ') { ' + ($nextValid) + ' = true; } else { ';
              } else {
                out += ' if (' + ($useData) + ' !== undefined ';
                if ($ownProperties) {
                  out += ' &&   Object.prototype.hasOwnProperty.call(' + ($data) + ', \'' + (it.util.escapeQuotes($propertyKey)) + '\') ';
                }
                out += ' ) { ';
              }
            }
            out += ' ' + ($code) + ' } ';
          }
        }
        if ($breakOnError) {
          out += ' if (' + ($nextValid) + ') { ';
          $closingBraces += '}';
        }
      }
    }
  }
  if ($pPropertyKeys.length) {
    var arr4 = $pPropertyKeys;
    if (arr4) {
      var $pProperty, i4 = -1,
        l4 = arr4.length - 1;
      while (i4 < l4) {
        $pProperty = arr4[i4 += 1];
        var $sch = $pProperties[$pProperty];
        if (it.util.schemaHasRules($sch, it.RULES.all)) {
          $it.schema = $sch;
          $it.schemaPath = it.schemaPath + '.patternProperties' + it.util.getProperty($pProperty);
          $it.errSchemaPath = it.errSchemaPath + '/patternProperties/' + it.util.escapeFragment($pProperty);
          if ($ownProperties) {
            out += ' ' + ($dataProperties) + ' = ' + ($dataProperties) + ' || Object.keys(' + ($data) + '); for (var ' + ($idx) + '=0; ' + ($idx) + '<' + ($dataProperties) + '.length; ' + ($idx) + '++) { var ' + ($key) + ' = ' + ($dataProperties) + '[' + ($idx) + ']; ';
          } else {
            out += ' for (var ' + ($key) + ' in ' + ($data) + ') { ';
          }
          out += ' if (' + (it.usePattern($pProperty)) + '.test(' + ($key) + ')) { ';
          $it.errorPath = it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
          var $passData = $data + '[' + $key + ']';
          $it.dataPathArr[$dataNxt] = $key;
          var $code = it.validate($it);
          $it.baseId = $currentBaseId;
          if (it.util.varOccurences($code, $nextData) < 2) {
            out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
          } else {
            out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
          }
          if ($breakOnError) {
            out += ' if (!' + ($nextValid) + ') break; ';
          }
          out += ' } ';
          if ($breakOnError) {
            out += ' else ' + ($nextValid) + ' = true; ';
          }
          out += ' }  ';
          if ($breakOnError) {
            out += ' if (' + ($nextValid) + ') { ';
            $closingBraces += '}';
          }
        }
      }
    }
  }
  if ($breakOnError) {
    out += ' ' + ($closingBraces) + ' if (' + ($errs) + ' == errors) {';
  }
  out = it.util.cleanUpCode(out);
  return out;
}


/***/ }),

/***/ "./node_modules/ajv/lib/dotjs/propertyNames.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function generate_propertyNames(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $errs = 'errs__' + $lvl;
  var $it = it.util.copy(it);
  var $closingBraces = '';
  $it.level++;
  var $nextValid = 'valid' + $it.level;
  if (it.util.schemaHasRules($schema, it.RULES.all)) {
    $it.schema = $schema;
    $it.schemaPath = $schemaPath;
    $it.errSchemaPath = $errSchemaPath;
    var $key = 'key' + $lvl,
      $idx = 'idx' + $lvl,
      $i = 'i' + $lvl,
      $invalidName = '\' + ' + $key + ' + \'',
      $dataNxt = $it.dataLevel = it.dataLevel + 1,
      $nextData = 'data' + $dataNxt,
      $dataProperties = 'dataProperties' + $lvl,
      $ownProperties = it.opts.ownProperties,
      $currentBaseId = it.baseId;
    out += ' var ' + ($errs) + ' = errors; ';
    if ($ownProperties) {
      out += ' var ' + ($dataProperties) + ' = undefined; ';
    }
    if ($ownProperties) {
      out += ' ' + ($dataProperties) + ' = ' + ($dataProperties) + ' || Object.keys(' + ($data) + '); for (var ' + ($idx) + '=0; ' + ($idx) + '<' + ($dataProperties) + '.length; ' + ($idx) + '++) { var ' + ($key) + ' = ' + ($dataProperties) + '[' + ($idx) + ']; ';
    } else {
      out += ' for (var ' + ($key) + ' in ' + ($data) + ') { ';
    }
    out += ' var startErrs' + ($lvl) + ' = errors; ';
    var $passData = $key;
    var $wasComposite = it.compositeRule;
    it.compositeRule = $it.compositeRule = true;
    var $code = it.validate($it);
    $it.baseId = $currentBaseId;
    if (it.util.varOccurences($code, $nextData) < 2) {
      out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
    } else {
      out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
    }
    it.compositeRule = $it.compositeRule = $wasComposite;
    out += ' if (!' + ($nextValid) + ') { for (var ' + ($i) + '=startErrs' + ($lvl) + '; ' + ($i) + '<errors; ' + ($i) + '++) { vErrors[' + ($i) + '].propertyName = ' + ($key) + '; }   var err =   '; /* istanbul ignore else */
    if (it.createErrors !== false) {
      out += ' { keyword: \'' + ('propertyNames') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { propertyName: \'' + ($invalidName) + '\' } ';
      if (it.opts.messages !== false) {
        out += ' , message: \'property name \\\'' + ($invalidName) + '\\\' is invalid\' ';
      }
      if (it.opts.verbose) {
        out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
      }
      out += ' } ';
    } else {
      out += ' {} ';
    }
    out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
    if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
      if (it.async) {
        out += ' throw new ValidationError(vErrors); ';
      } else {
        out += ' validate.errors = vErrors; return false; ';
      }
    }
    if ($breakOnError) {
      out += ' break; ';
    }
    out += ' } }';
  }
  if ($breakOnError) {
    out += ' ' + ($closingBraces) + ' if (' + ($errs) + ' == errors) {';
  }
  out = it.util.cleanUpCode(out);
  return out;
}


/***/ }),

/***/ "./node_modules/ajv/lib/dotjs/ref.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function generate_ref(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $async, $refCode;
  if ($schema == '#' || $schema == '#/') {
    if (it.isRoot) {
      $async = it.async;
      $refCode = 'validate';
    } else {
      $async = it.root.schema.$async === true;
      $refCode = 'root.refVal[0]';
    }
  } else {
    var $refVal = it.resolveRef(it.baseId, $schema, it.isRoot);
    if ($refVal === undefined) {
      var $message = it.MissingRefError.message(it.baseId, $schema);
      if (it.opts.missingRefs == 'fail') {
        it.logger.error($message);
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = ''; /* istanbul ignore else */
        if (it.createErrors !== false) {
          out += ' { keyword: \'' + ('$ref') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { ref: \'' + (it.util.escapeQuotes($schema)) + '\' } ';
          if (it.opts.messages !== false) {
            out += ' , message: \'can\\\'t resolve reference ' + (it.util.escapeQuotes($schema)) + '\' ';
          }
          if (it.opts.verbose) {
            out += ' , schema: ' + (it.util.toQuotedString($schema)) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
          }
          out += ' } ';
        } else {
          out += ' {} ';
        }
        var __err = out;
        out = $$outStack.pop();
        if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
          if (it.async) {
            out += ' throw new ValidationError([' + (__err) + ']); ';
          } else {
            out += ' validate.errors = [' + (__err) + ']; return false; ';
          }
        } else {
          out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
        }
        if ($breakOnError) {
          out += ' if (false) { ';
        }
      } else if (it.opts.missingRefs == 'ignore') {
        it.logger.warn($message);
        if ($breakOnError) {
          out += ' if (true) { ';
        }
      } else {
        throw new it.MissingRefError(it.baseId, $schema, $message);
      }
    } else if ($refVal.inline) {
      var $it = it.util.copy(it);
      $it.level++;
      var $nextValid = 'valid' + $it.level;
      $it.schema = $refVal.schema;
      $it.schemaPath = '';
      $it.errSchemaPath = $schema;
      var $code = it.validate($it).replace(/validate\.schema/g, $refVal.code);
      out += ' ' + ($code) + ' ';
      if ($breakOnError) {
        out += ' if (' + ($nextValid) + ') { ';
      }
    } else {
      $async = $refVal.$async === true || (it.async && $refVal.$async !== false);
      $refCode = $refVal.code;
    }
  }
  if ($refCode) {
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = '';
    if (it.opts.passContext) {
      out += ' ' + ($refCode) + '.call(this, ';
    } else {
      out += ' ' + ($refCode) + '( ';
    }
    out += ' ' + ($data) + ', (dataPath || \'\')';
    if (it.errorPath != '""') {
      out += ' + ' + (it.errorPath);
    }
    var $parentData = $dataLvl ? 'data' + (($dataLvl - 1) || '') : 'parentData',
      $parentDataProperty = $dataLvl ? it.dataPathArr[$dataLvl] : 'parentDataProperty';
    out += ' , ' + ($parentData) + ' , ' + ($parentDataProperty) + ', rootData)  ';
    var __callValidate = out;
    out = $$outStack.pop();
    if ($async) {
      if (!it.async) throw new Error('async schema referenced by sync schema');
      if ($breakOnError) {
        out += ' var ' + ($valid) + '; ';
      }
      out += ' try { await ' + (__callValidate) + '; ';
      if ($breakOnError) {
        out += ' ' + ($valid) + ' = true; ';
      }
      out += ' } catch (e) { if (!(e instanceof ValidationError)) throw e; if (vErrors === null) vErrors = e.errors; else vErrors = vErrors.concat(e.errors); errors = vErrors.length; ';
      if ($breakOnError) {
        out += ' ' + ($valid) + ' = false; ';
      }
      out += ' } ';
      if ($breakOnError) {
        out += ' if (' + ($valid) + ') { ';
      }
    } else {
      out += ' if (!' + (__callValidate) + ') { if (vErrors === null) vErrors = ' + ($refCode) + '.errors; else vErrors = vErrors.concat(' + ($refCode) + '.errors); errors = vErrors.length; } ';
      if ($breakOnError) {
        out += ' else { ';
      }
    }
  }
  return out;
}


/***/ }),

/***/ "./node_modules/ajv/lib/dotjs/required.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function generate_required(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $isData = it.opts.$data && $schema && $schema.$data,
    $schemaValue;
  if ($isData) {
    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  var $vSchema = 'schema' + $lvl;
  if (!$isData) {
    if ($schema.length < it.opts.loopRequired && it.schema.properties && Object.keys(it.schema.properties).length) {
      var $required = [];
      var arr1 = $schema;
      if (arr1) {
        var $property, i1 = -1,
          l1 = arr1.length - 1;
        while (i1 < l1) {
          $property = arr1[i1 += 1];
          var $propertySch = it.schema.properties[$property];
          if (!($propertySch && it.util.schemaHasRules($propertySch, it.RULES.all))) {
            $required[$required.length] = $property;
          }
        }
      }
    } else {
      var $required = $schema;
    }
  }
  if ($isData || $required.length) {
    var $currentErrorPath = it.errorPath,
      $loopRequired = $isData || $required.length >= it.opts.loopRequired,
      $ownProperties = it.opts.ownProperties;
    if ($breakOnError) {
      out += ' var missing' + ($lvl) + '; ';
      if ($loopRequired) {
        if (!$isData) {
          out += ' var ' + ($vSchema) + ' = validate.schema' + ($schemaPath) + '; ';
        }
        var $i = 'i' + $lvl,
          $propertyPath = 'schema' + $lvl + '[' + $i + ']',
          $missingProperty = '\' + ' + $propertyPath + ' + \'';
        if (it.opts._errorDataPathProperty) {
          it.errorPath = it.util.getPathExpr($currentErrorPath, $propertyPath, it.opts.jsonPointers);
        }
        out += ' var ' + ($valid) + ' = true; ';
        if ($isData) {
          out += ' if (schema' + ($lvl) + ' === undefined) ' + ($valid) + ' = true; else if (!Array.isArray(schema' + ($lvl) + ')) ' + ($valid) + ' = false; else {';
        }
        out += ' for (var ' + ($i) + ' = 0; ' + ($i) + ' < ' + ($vSchema) + '.length; ' + ($i) + '++) { ' + ($valid) + ' = ' + ($data) + '[' + ($vSchema) + '[' + ($i) + ']] !== undefined ';
        if ($ownProperties) {
          out += ' &&   Object.prototype.hasOwnProperty.call(' + ($data) + ', ' + ($vSchema) + '[' + ($i) + ']) ';
        }
        out += '; if (!' + ($valid) + ') break; } ';
        if ($isData) {
          out += '  }  ';
        }
        out += '  if (!' + ($valid) + ') {   ';
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = ''; /* istanbul ignore else */
        if (it.createErrors !== false) {
          out += ' { keyword: \'' + ('required') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { missingProperty: \'' + ($missingProperty) + '\' } ';
          if (it.opts.messages !== false) {
            out += ' , message: \'';
            if (it.opts._errorDataPathProperty) {
              out += 'is a required property';
            } else {
              out += 'should have required property \\\'' + ($missingProperty) + '\\\'';
            }
            out += '\' ';
          }
          if (it.opts.verbose) {
            out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
          }
          out += ' } ';
        } else {
          out += ' {} ';
        }
        var __err = out;
        out = $$outStack.pop();
        if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
          if (it.async) {
            out += ' throw new ValidationError([' + (__err) + ']); ';
          } else {
            out += ' validate.errors = [' + (__err) + ']; return false; ';
          }
        } else {
          out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
        }
        out += ' } else { ';
      } else {
        out += ' if ( ';
        var arr2 = $required;
        if (arr2) {
          var $propertyKey, $i = -1,
            l2 = arr2.length - 1;
          while ($i < l2) {
            $propertyKey = arr2[$i += 1];
            if ($i) {
              out += ' || ';
            }
            var $prop = it.util.getProperty($propertyKey),
              $useData = $data + $prop;
            out += ' ( ( ' + ($useData) + ' === undefined ';
            if ($ownProperties) {
              out += ' || ! Object.prototype.hasOwnProperty.call(' + ($data) + ', \'' + (it.util.escapeQuotes($propertyKey)) + '\') ';
            }
            out += ') && (missing' + ($lvl) + ' = ' + (it.util.toQuotedString(it.opts.jsonPointers ? $propertyKey : $prop)) + ') ) ';
          }
        }
        out += ') {  ';
        var $propertyPath = 'missing' + $lvl,
          $missingProperty = '\' + ' + $propertyPath + ' + \'';
        if (it.opts._errorDataPathProperty) {
          it.errorPath = it.opts.jsonPointers ? it.util.getPathExpr($currentErrorPath, $propertyPath, true) : $currentErrorPath + ' + ' + $propertyPath;
        }
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = ''; /* istanbul ignore else */
        if (it.createErrors !== false) {
          out += ' { keyword: \'' + ('required') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { missingProperty: \'' + ($missingProperty) + '\' } ';
          if (it.opts.messages !== false) {
            out += ' , message: \'';
            if (it.opts._errorDataPathProperty) {
              out += 'is a required property';
            } else {
              out += 'should have required property \\\'' + ($missingProperty) + '\\\'';
            }
            out += '\' ';
          }
          if (it.opts.verbose) {
            out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
          }
          out += ' } ';
        } else {
          out += ' {} ';
        }
        var __err = out;
        out = $$outStack.pop();
        if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
          if (it.async) {
            out += ' throw new ValidationError([' + (__err) + ']); ';
          } else {
            out += ' validate.errors = [' + (__err) + ']; return false; ';
          }
        } else {
          out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
        }
        out += ' } else { ';
      }
    } else {
      if ($loopRequired) {
        if (!$isData) {
          out += ' var ' + ($vSchema) + ' = validate.schema' + ($schemaPath) + '; ';
        }
        var $i = 'i' + $lvl,
          $propertyPath = 'schema' + $lvl + '[' + $i + ']',
          $missingProperty = '\' + ' + $propertyPath + ' + \'';
        if (it.opts._errorDataPathProperty) {
          it.errorPath = it.util.getPathExpr($currentErrorPath, $propertyPath, it.opts.jsonPointers);
        }
        if ($isData) {
          out += ' if (' + ($vSchema) + ' && !Array.isArray(' + ($vSchema) + ')) {  var err =   '; /* istanbul ignore else */
          if (it.createErrors !== false) {
            out += ' { keyword: \'' + ('required') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { missingProperty: \'' + ($missingProperty) + '\' } ';
            if (it.opts.messages !== false) {
              out += ' , message: \'';
              if (it.opts._errorDataPathProperty) {
                out += 'is a required property';
              } else {
                out += 'should have required property \\\'' + ($missingProperty) + '\\\'';
              }
              out += '\' ';
            }
            if (it.opts.verbose) {
              out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
            }
            out += ' } ';
          } else {
            out += ' {} ';
          }
          out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } else if (' + ($vSchema) + ' !== undefined) { ';
        }
        out += ' for (var ' + ($i) + ' = 0; ' + ($i) + ' < ' + ($vSchema) + '.length; ' + ($i) + '++) { if (' + ($data) + '[' + ($vSchema) + '[' + ($i) + ']] === undefined ';
        if ($ownProperties) {
          out += ' || ! Object.prototype.hasOwnProperty.call(' + ($data) + ', ' + ($vSchema) + '[' + ($i) + ']) ';
        }
        out += ') {  var err =   '; /* istanbul ignore else */
        if (it.createErrors !== false) {
          out += ' { keyword: \'' + ('required') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { missingProperty: \'' + ($missingProperty) + '\' } ';
          if (it.opts.messages !== false) {
            out += ' , message: \'';
            if (it.opts._errorDataPathProperty) {
              out += 'is a required property';
            } else {
              out += 'should have required property \\\'' + ($missingProperty) + '\\\'';
            }
            out += '\' ';
          }
          if (it.opts.verbose) {
            out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
          }
          out += ' } ';
        } else {
          out += ' {} ';
        }
        out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } } ';
        if ($isData) {
          out += '  }  ';
        }
      } else {
        var arr3 = $required;
        if (arr3) {
          var $propertyKey, i3 = -1,
            l3 = arr3.length - 1;
          while (i3 < l3) {
            $propertyKey = arr3[i3 += 1];
            var $prop = it.util.getProperty($propertyKey),
              $missingProperty = it.util.escapeQuotes($propertyKey),
              $useData = $data + $prop;
            if (it.opts._errorDataPathProperty) {
              it.errorPath = it.util.getPath($currentErrorPath, $propertyKey, it.opts.jsonPointers);
            }
            out += ' if ( ' + ($useData) + ' === undefined ';
            if ($ownProperties) {
              out += ' || ! Object.prototype.hasOwnProperty.call(' + ($data) + ', \'' + (it.util.escapeQuotes($propertyKey)) + '\') ';
            }
            out += ') {  var err =   '; /* istanbul ignore else */
            if (it.createErrors !== false) {
              out += ' { keyword: \'' + ('required') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { missingProperty: \'' + ($missingProperty) + '\' } ';
              if (it.opts.messages !== false) {
                out += ' , message: \'';
                if (it.opts._errorDataPathProperty) {
                  out += 'is a required property';
                } else {
                  out += 'should have required property \\\'' + ($missingProperty) + '\\\'';
                }
                out += '\' ';
              }
              if (it.opts.verbose) {
                out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
              }
              out += ' } ';
            } else {
              out += ' {} ';
            }
            out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } ';
          }
        }
      }
    }
    it.errorPath = $currentErrorPath;
  } else if ($breakOnError) {
    out += ' if (true) {';
  }
  return out;
}


/***/ }),

/***/ "./node_modules/ajv/lib/dotjs/uniqueItems.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function generate_uniqueItems(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $isData = it.opts.$data && $schema && $schema.$data,
    $schemaValue;
  if ($isData) {
    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  if (($schema || $isData) && it.opts.uniqueItems !== false) {
    if ($isData) {
      out += ' var ' + ($valid) + '; if (' + ($schemaValue) + ' === false || ' + ($schemaValue) + ' === undefined) ' + ($valid) + ' = true; else if (typeof ' + ($schemaValue) + ' != \'boolean\') ' + ($valid) + ' = false; else { ';
    }
    out += ' var i = ' + ($data) + '.length , ' + ($valid) + ' = true , j; if (i > 1) { ';
    var $itemType = it.schema.items && it.schema.items.type,
      $typeIsArray = Array.isArray($itemType);
    if (!$itemType || $itemType == 'object' || $itemType == 'array' || ($typeIsArray && ($itemType.indexOf('object') >= 0 || $itemType.indexOf('array') >= 0))) {
      out += ' outer: for (;i--;) { for (j = i; j--;) { if (equal(' + ($data) + '[i], ' + ($data) + '[j])) { ' + ($valid) + ' = false; break outer; } } } ';
    } else {
      out += ' var itemIndices = {}, item; for (;i--;) { var item = ' + ($data) + '[i]; ';
      var $method = 'checkDataType' + ($typeIsArray ? 's' : '');
      out += ' if (' + (it.util[$method]($itemType, 'item', true)) + ') continue; ';
      if ($typeIsArray) {
        out += ' if (typeof item == \'string\') item = \'"\' + item; ';
      }
      out += ' if (typeof itemIndices[item] == \'number\') { ' + ($valid) + ' = false; j = itemIndices[item]; break; } itemIndices[item] = i; } ';
    }
    out += ' } ';
    if ($isData) {
      out += '  }  ';
    }
    out += ' if (!' + ($valid) + ') {   ';
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = ''; /* istanbul ignore else */
    if (it.createErrors !== false) {
      out += ' { keyword: \'' + ('uniqueItems') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { i: i, j: j } ';
      if (it.opts.messages !== false) {
        out += ' , message: \'should NOT have duplicate items (items ## \' + j + \' and \' + i + \' are identical)\' ';
      }
      if (it.opts.verbose) {
        out += ' , schema:  ';
        if ($isData) {
          out += 'validate.schema' + ($schemaPath);
        } else {
          out += '' + ($schema);
        }
        out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
      }
      out += ' } ';
    } else {
      out += ' {} ';
    }
    var __err = out;
    out = $$outStack.pop();
    if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
      if (it.async) {
        out += ' throw new ValidationError([' + (__err) + ']); ';
      } else {
        out += ' validate.errors = [' + (__err) + ']; return false; ';
      }
    } else {
      out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
    }
    out += ' } ';
    if ($breakOnError) {
      out += ' else { ';
    }
  } else {
    if ($breakOnError) {
      out += ' if (true) { ';
    }
  }
  return out;
}


/***/ }),

/***/ "./node_modules/ajv/lib/dotjs/validate.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function generate_validate(it, $keyword, $ruleType) {
  var out = '';
  var $async = it.schema.$async === true,
    $refKeywords = it.util.schemaHasRulesExcept(it.schema, it.RULES.all, '$ref'),
    $id = it.self._getId(it.schema);
  if (it.isTop) {
    out += ' var validate = ';
    if ($async) {
      it.async = true;
      out += 'async ';
    }
    out += 'function(data, dataPath, parentData, parentDataProperty, rootData) { \'use strict\'; ';
    if ($id && (it.opts.sourceCode || it.opts.processCode)) {
      out += ' ' + ('/\*# sourceURL=' + $id + ' */') + ' ';
    }
  }
  if (typeof it.schema == 'boolean' || !($refKeywords || it.schema.$ref)) {
    var $keyword = 'false schema';
    var $lvl = it.level;
    var $dataLvl = it.dataLevel;
    var $schema = it.schema[$keyword];
    var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
    var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
    var $breakOnError = !it.opts.allErrors;
    var $errorKeyword;
    var $data = 'data' + ($dataLvl || '');
    var $valid = 'valid' + $lvl;
    if (it.schema === false) {
      if (it.isTop) {
        $breakOnError = true;
      } else {
        out += ' var ' + ($valid) + ' = false; ';
      }
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = ''; /* istanbul ignore else */
      if (it.createErrors !== false) {
        out += ' { keyword: \'' + ($errorKeyword || 'false schema') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: {} ';
        if (it.opts.messages !== false) {
          out += ' , message: \'boolean schema is false\' ';
        }
        if (it.opts.verbose) {
          out += ' , schema: false , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
        }
        out += ' } ';
      } else {
        out += ' {} ';
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
        if (it.async) {
          out += ' throw new ValidationError([' + (__err) + ']); ';
        } else {
          out += ' validate.errors = [' + (__err) + ']; return false; ';
        }
      } else {
        out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
      }
    } else {
      if (it.isTop) {
        if ($async) {
          out += ' return data; ';
        } else {
          out += ' validate.errors = null; return true; ';
        }
      } else {
        out += ' var ' + ($valid) + ' = true; ';
      }
    }
    if (it.isTop) {
      out += ' }; return validate; ';
    }
    return out;
  }
  if (it.isTop) {
    var $top = it.isTop,
      $lvl = it.level = 0,
      $dataLvl = it.dataLevel = 0,
      $data = 'data';
    it.rootId = it.resolve.fullPath(it.self._getId(it.root.schema));
    it.baseId = it.baseId || it.rootId;
    delete it.isTop;
    it.dataPathArr = [undefined];
    out += ' var vErrors = null; ';
    out += ' var errors = 0;     ';
    out += ' if (rootData === undefined) rootData = data; ';
  } else {
    var $lvl = it.level,
      $dataLvl = it.dataLevel,
      $data = 'data' + ($dataLvl || '');
    if ($id) it.baseId = it.resolve.url(it.baseId, $id);
    if ($async && !it.async) throw new Error('async schema in sync schema');
    out += ' var errs_' + ($lvl) + ' = errors;';
  }
  var $valid = 'valid' + $lvl,
    $breakOnError = !it.opts.allErrors,
    $closingBraces1 = '',
    $closingBraces2 = '';
  var $errorKeyword;
  var $typeSchema = it.schema.type,
    $typeIsArray = Array.isArray($typeSchema);
  if ($typeIsArray && $typeSchema.length == 1) {
    $typeSchema = $typeSchema[0];
    $typeIsArray = false;
  }
  if (it.schema.$ref && $refKeywords) {
    if (it.opts.extendRefs == 'fail') {
      throw new Error('$ref: validation keywords used in schema at path "' + it.errSchemaPath + '" (see option extendRefs)');
    } else if (it.opts.extendRefs !== true) {
      $refKeywords = false;
      it.logger.warn('$ref: keywords ignored in schema at path "' + it.errSchemaPath + '"');
    }
  }
  if (it.schema.$comment && it.opts.$comment) {
    out += ' ' + (it.RULES.all.$comment.code(it, '$comment'));
  }
  if ($typeSchema) {
    if (it.opts.coerceTypes) {
      var $coerceToTypes = it.util.coerceToTypes(it.opts.coerceTypes, $typeSchema);
    }
    var $rulesGroup = it.RULES.types[$typeSchema];
    if ($coerceToTypes || $typeIsArray || $rulesGroup === true || ($rulesGroup && !$shouldUseGroup($rulesGroup))) {
      var $schemaPath = it.schemaPath + '.type',
        $errSchemaPath = it.errSchemaPath + '/type';
      var $schemaPath = it.schemaPath + '.type',
        $errSchemaPath = it.errSchemaPath + '/type',
        $method = $typeIsArray ? 'checkDataTypes' : 'checkDataType';
      out += ' if (' + (it.util[$method]($typeSchema, $data, true)) + ') { ';
      if ($coerceToTypes) {
        var $dataType = 'dataType' + $lvl,
          $coerced = 'coerced' + $lvl;
        out += ' var ' + ($dataType) + ' = typeof ' + ($data) + '; ';
        if (it.opts.coerceTypes == 'array') {
          out += ' if (' + ($dataType) + ' == \'object\' && Array.isArray(' + ($data) + ')) ' + ($dataType) + ' = \'array\'; ';
        }
        out += ' var ' + ($coerced) + ' = undefined; ';
        var $bracesCoercion = '';
        var arr1 = $coerceToTypes;
        if (arr1) {
          var $type, $i = -1,
            l1 = arr1.length - 1;
          while ($i < l1) {
            $type = arr1[$i += 1];
            if ($i) {
              out += ' if (' + ($coerced) + ' === undefined) { ';
              $bracesCoercion += '}';
            }
            if (it.opts.coerceTypes == 'array' && $type != 'array') {
              out += ' if (' + ($dataType) + ' == \'array\' && ' + ($data) + '.length == 1) { ' + ($coerced) + ' = ' + ($data) + ' = ' + ($data) + '[0]; ' + ($dataType) + ' = typeof ' + ($data) + ';  } ';
            }
            if ($type == 'string') {
              out += ' if (' + ($dataType) + ' == \'number\' || ' + ($dataType) + ' == \'boolean\') ' + ($coerced) + ' = \'\' + ' + ($data) + '; else if (' + ($data) + ' === null) ' + ($coerced) + ' = \'\'; ';
            } else if ($type == 'number' || $type == 'integer') {
              out += ' if (' + ($dataType) + ' == \'boolean\' || ' + ($data) + ' === null || (' + ($dataType) + ' == \'string\' && ' + ($data) + ' && ' + ($data) + ' == +' + ($data) + ' ';
              if ($type == 'integer') {
                out += ' && !(' + ($data) + ' % 1)';
              }
              out += ')) ' + ($coerced) + ' = +' + ($data) + '; ';
            } else if ($type == 'boolean') {
              out += ' if (' + ($data) + ' === \'false\' || ' + ($data) + ' === 0 || ' + ($data) + ' === null) ' + ($coerced) + ' = false; else if (' + ($data) + ' === \'true\' || ' + ($data) + ' === 1) ' + ($coerced) + ' = true; ';
            } else if ($type == 'null') {
              out += ' if (' + ($data) + ' === \'\' || ' + ($data) + ' === 0 || ' + ($data) + ' === false) ' + ($coerced) + ' = null; ';
            } else if (it.opts.coerceTypes == 'array' && $type == 'array') {
              out += ' if (' + ($dataType) + ' == \'string\' || ' + ($dataType) + ' == \'number\' || ' + ($dataType) + ' == \'boolean\' || ' + ($data) + ' == null) ' + ($coerced) + ' = [' + ($data) + ']; ';
            }
          }
        }
        out += ' ' + ($bracesCoercion) + ' if (' + ($coerced) + ' === undefined) {   ';
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = ''; /* istanbul ignore else */
        if (it.createErrors !== false) {
          out += ' { keyword: \'' + ($errorKeyword || 'type') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { type: \'';
          if ($typeIsArray) {
            out += '' + ($typeSchema.join(","));
          } else {
            out += '' + ($typeSchema);
          }
          out += '\' } ';
          if (it.opts.messages !== false) {
            out += ' , message: \'should be ';
            if ($typeIsArray) {
              out += '' + ($typeSchema.join(","));
            } else {
              out += '' + ($typeSchema);
            }
            out += '\' ';
          }
          if (it.opts.verbose) {
            out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
          }
          out += ' } ';
        } else {
          out += ' {} ';
        }
        var __err = out;
        out = $$outStack.pop();
        if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
          if (it.async) {
            out += ' throw new ValidationError([' + (__err) + ']); ';
          } else {
            out += ' validate.errors = [' + (__err) + ']; return false; ';
          }
        } else {
          out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
        }
        out += ' } else {  ';
        var $parentData = $dataLvl ? 'data' + (($dataLvl - 1) || '') : 'parentData',
          $parentDataProperty = $dataLvl ? it.dataPathArr[$dataLvl] : 'parentDataProperty';
        out += ' ' + ($data) + ' = ' + ($coerced) + '; ';
        if (!$dataLvl) {
          out += 'if (' + ($parentData) + ' !== undefined)';
        }
        out += ' ' + ($parentData) + '[' + ($parentDataProperty) + '] = ' + ($coerced) + '; } ';
      } else {
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = ''; /* istanbul ignore else */
        if (it.createErrors !== false) {
          out += ' { keyword: \'' + ($errorKeyword || 'type') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { type: \'';
          if ($typeIsArray) {
            out += '' + ($typeSchema.join(","));
          } else {
            out += '' + ($typeSchema);
          }
          out += '\' } ';
          if (it.opts.messages !== false) {
            out += ' , message: \'should be ';
            if ($typeIsArray) {
              out += '' + ($typeSchema.join(","));
            } else {
              out += '' + ($typeSchema);
            }
            out += '\' ';
          }
          if (it.opts.verbose) {
            out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
          }
          out += ' } ';
        } else {
          out += ' {} ';
        }
        var __err = out;
        out = $$outStack.pop();
        if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
          if (it.async) {
            out += ' throw new ValidationError([' + (__err) + ']); ';
          } else {
            out += ' validate.errors = [' + (__err) + ']; return false; ';
          }
        } else {
          out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
        }
      }
      out += ' } ';
    }
  }
  if (it.schema.$ref && !$refKeywords) {
    out += ' ' + (it.RULES.all.$ref.code(it, '$ref')) + ' ';
    if ($breakOnError) {
      out += ' } if (errors === ';
      if ($top) {
        out += '0';
      } else {
        out += 'errs_' + ($lvl);
      }
      out += ') { ';
      $closingBraces2 += '}';
    }
  } else {
    var arr2 = it.RULES;
    if (arr2) {
      var $rulesGroup, i2 = -1,
        l2 = arr2.length - 1;
      while (i2 < l2) {
        $rulesGroup = arr2[i2 += 1];
        if ($shouldUseGroup($rulesGroup)) {
          if ($rulesGroup.type) {
            out += ' if (' + (it.util.checkDataType($rulesGroup.type, $data)) + ') { ';
          }
          if (it.opts.useDefaults && !it.compositeRule) {
            if ($rulesGroup.type == 'object' && it.schema.properties) {
              var $schema = it.schema.properties,
                $schemaKeys = Object.keys($schema);
              var arr3 = $schemaKeys;
              if (arr3) {
                var $propertyKey, i3 = -1,
                  l3 = arr3.length - 1;
                while (i3 < l3) {
                  $propertyKey = arr3[i3 += 1];
                  var $sch = $schema[$propertyKey];
                  if ($sch.default !== undefined) {
                    var $passData = $data + it.util.getProperty($propertyKey);
                    out += '  if (' + ($passData) + ' === undefined) ' + ($passData) + ' = ';
                    if (it.opts.useDefaults == 'shared') {
                      out += ' ' + (it.useDefault($sch.default)) + ' ';
                    } else {
                      out += ' ' + (JSON.stringify($sch.default)) + ' ';
                    }
                    out += '; ';
                  }
                }
              }
            } else if ($rulesGroup.type == 'array' && Array.isArray(it.schema.items)) {
              var arr4 = it.schema.items;
              if (arr4) {
                var $sch, $i = -1,
                  l4 = arr4.length - 1;
                while ($i < l4) {
                  $sch = arr4[$i += 1];
                  if ($sch.default !== undefined) {
                    var $passData = $data + '[' + $i + ']';
                    out += '  if (' + ($passData) + ' === undefined) ' + ($passData) + ' = ';
                    if (it.opts.useDefaults == 'shared') {
                      out += ' ' + (it.useDefault($sch.default)) + ' ';
                    } else {
                      out += ' ' + (JSON.stringify($sch.default)) + ' ';
                    }
                    out += '; ';
                  }
                }
              }
            }
          }
          var arr5 = $rulesGroup.rules;
          if (arr5) {
            var $rule, i5 = -1,
              l5 = arr5.length - 1;
            while (i5 < l5) {
              $rule = arr5[i5 += 1];
              if ($shouldUseRule($rule)) {
                var $code = $rule.code(it, $rule.keyword, $rulesGroup.type);
                if ($code) {
                  out += ' ' + ($code) + ' ';
                  if ($breakOnError) {
                    $closingBraces1 += '}';
                  }
                }
              }
            }
          }
          if ($breakOnError) {
            out += ' ' + ($closingBraces1) + ' ';
            $closingBraces1 = '';
          }
          if ($rulesGroup.type) {
            out += ' } ';
            if ($typeSchema && $typeSchema === $rulesGroup.type && !$coerceToTypes) {
              out += ' else { ';
              var $schemaPath = it.schemaPath + '.type',
                $errSchemaPath = it.errSchemaPath + '/type';
              var $$outStack = $$outStack || [];
              $$outStack.push(out);
              out = ''; /* istanbul ignore else */
              if (it.createErrors !== false) {
                out += ' { keyword: \'' + ($errorKeyword || 'type') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { type: \'';
                if ($typeIsArray) {
                  out += '' + ($typeSchema.join(","));
                } else {
                  out += '' + ($typeSchema);
                }
                out += '\' } ';
                if (it.opts.messages !== false) {
                  out += ' , message: \'should be ';
                  if ($typeIsArray) {
                    out += '' + ($typeSchema.join(","));
                  } else {
                    out += '' + ($typeSchema);
                  }
                  out += '\' ';
                }
                if (it.opts.verbose) {
                  out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
                }
                out += ' } ';
              } else {
                out += ' {} ';
              }
              var __err = out;
              out = $$outStack.pop();
              if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
                if (it.async) {
                  out += ' throw new ValidationError([' + (__err) + ']); ';
                } else {
                  out += ' validate.errors = [' + (__err) + ']; return false; ';
                }
              } else {
                out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
              }
              out += ' } ';
            }
          }
          if ($breakOnError) {
            out += ' if (errors === ';
            if ($top) {
              out += '0';
            } else {
              out += 'errs_' + ($lvl);
            }
            out += ') { ';
            $closingBraces2 += '}';
          }
        }
      }
    }
  }
  if ($breakOnError) {
    out += ' ' + ($closingBraces2) + ' ';
  }
  if ($top) {
    if ($async) {
      out += ' if (errors === 0) return data;           ';
      out += ' else throw new ValidationError(vErrors); ';
    } else {
      out += ' validate.errors = vErrors; ';
      out += ' return errors === 0;       ';
    }
    out += ' }; return validate;';
  } else {
    out += ' var ' + ($valid) + ' = errors === errs_' + ($lvl) + ';';
  }
  out = it.util.cleanUpCode(out);
  if ($top) {
    out = it.util.finalCleanUpCode(out, $async);
  }

  function $shouldUseGroup($rulesGroup) {
    var rules = $rulesGroup.rules;
    for (var i = 0; i < rules.length; i++)
      if ($shouldUseRule(rules[i])) return true;
  }

  function $shouldUseRule($rule) {
    return it.schema[$rule.keyword] !== undefined || ($rule.implements && $ruleImplementsSomeKeyword($rule));
  }

  function $ruleImplementsSomeKeyword($rule) {
    var impl = $rule.implements;
    for (var i = 0; i < impl.length; i++)
      if (it.schema[impl[i]] !== undefined) return true;
  }
  return out;
}


/***/ }),

/***/ "./node_modules/ajv/lib/keyword.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var IDENTIFIER = /^[a-z_$][a-z0-9_$-]*$/i;
var customRuleCode = __webpack_require__("./node_modules/ajv/lib/dotjs/custom.js");

module.exports = {
  add: addKeyword,
  get: getKeyword,
  remove: removeKeyword
};

/**
 * Define custom keyword
 * @this  Ajv
 * @param {String} keyword custom keyword, should be unique (including different from all standard, custom and macro keywords).
 * @param {Object} definition keyword definition object with properties `type` (type(s) which the keyword applies to), `validate` or `compile`.
 * @return {Ajv} this for method chaining
 */
function addKeyword(keyword, definition) {
  /* jshint validthis: true */
  /* eslint no-shadow: 0 */
  var RULES = this.RULES;

  if (RULES.keywords[keyword])
    throw new Error('Keyword ' + keyword + ' is already defined');

  if (!IDENTIFIER.test(keyword))
    throw new Error('Keyword ' + keyword + ' is not a valid identifier');

  if (definition) {
    if (definition.macro && definition.valid !== undefined)
      throw new Error('"valid" option cannot be used with macro keywords');

    var dataType = definition.type;
    if (Array.isArray(dataType)) {
      var i, len = dataType.length;
      for (i=0; i<len; i++) checkDataType(dataType[i]);
      for (i=0; i<len; i++) _addRule(keyword, dataType[i], definition);
    } else {
      if (dataType) checkDataType(dataType);
      _addRule(keyword, dataType, definition);
    }

    var $data = definition.$data === true && this._opts.$data;
    if ($data && !definition.validate)
      throw new Error('$data support: "validate" function is not defined');

    var metaSchema = definition.metaSchema;
    if (metaSchema) {
      if ($data) {
        metaSchema = {
          anyOf: [
            metaSchema,
            { '$ref': 'https://raw.githubusercontent.com/epoberezkin/ajv/master/lib/refs/data.json#' }
          ]
        };
      }
      definition.validateSchema = this.compile(metaSchema, true);
    }
  }

  RULES.keywords[keyword] = RULES.all[keyword] = true;


  function _addRule(keyword, dataType, definition) {
    var ruleGroup;
    for (var i=0; i<RULES.length; i++) {
      var rg = RULES[i];
      if (rg.type == dataType) {
        ruleGroup = rg;
        break;
      }
    }

    if (!ruleGroup) {
      ruleGroup = { type: dataType, rules: [] };
      RULES.push(ruleGroup);
    }

    var rule = {
      keyword: keyword,
      definition: definition,
      custom: true,
      code: customRuleCode,
      implements: definition.implements
    };
    ruleGroup.rules.push(rule);
    RULES.custom[keyword] = rule;
  }


  function checkDataType(dataType) {
    if (!RULES.types[dataType]) throw new Error('Unknown type ' + dataType);
  }

  return this;
}


/**
 * Get keyword
 * @this  Ajv
 * @param {String} keyword pre-defined or custom keyword.
 * @return {Object|Boolean} custom keyword definition, `true` if it is a predefined keyword, `false` otherwise.
 */
function getKeyword(keyword) {
  /* jshint validthis: true */
  var rule = this.RULES.custom[keyword];
  return rule ? rule.definition : this.RULES.keywords[keyword] || false;
}


/**
 * Remove keyword
 * @this  Ajv
 * @param {String} keyword pre-defined or custom keyword.
 * @return {Ajv} this for method chaining
 */
function removeKeyword(keyword) {
  /* jshint validthis: true */
  var RULES = this.RULES;
  delete RULES.keywords[keyword];
  delete RULES.all[keyword];
  delete RULES.custom[keyword];
  for (var i=0; i<RULES.length; i++) {
    var rules = RULES[i].rules;
    for (var j=0; j<rules.length; j++) {
      if (rules[j].keyword == keyword) {
        rules.splice(j, 1);
        break;
      }
    }
  }
  return this;
}


/***/ }),

/***/ "./node_modules/ajv/lib/refs/data.json":
/***/ (function(module) {

module.exports = {"$schema":"http://json-schema.org/draft-07/schema#","$id":"https://raw.githubusercontent.com/epoberezkin/ajv/master/lib/refs/data.json#","description":"Meta-schema for $data reference (JSON Schema extension proposal)","type":"object","required":["$data"],"properties":{"$data":{"type":"string","anyOf":[{"format":"relative-json-pointer"},{"format":"json-pointer"}]}},"additionalProperties":false};

/***/ }),

/***/ "./node_modules/ajv/lib/refs/json-schema-draft-06.json":
/***/ (function(module) {

module.exports = {"$schema":"http://json-schema.org/draft-06/schema#","$id":"http://json-schema.org/draft-06/schema#","title":"Core schema meta-schema","definitions":{"schemaArray":{"type":"array","minItems":1,"items":{"$ref":"#"}},"nonNegativeInteger":{"type":"integer","minimum":0},"nonNegativeIntegerDefault0":{"allOf":[{"$ref":"#/definitions/nonNegativeInteger"},{"default":0}]},"simpleTypes":{"enum":["array","boolean","integer","null","number","object","string"]},"stringArray":{"type":"array","items":{"type":"string"},"uniqueItems":true,"default":[]}},"type":["object","boolean"],"properties":{"$id":{"type":"string","format":"uri-reference"},"$schema":{"type":"string","format":"uri"},"$ref":{"type":"string","format":"uri-reference"},"title":{"type":"string"},"description":{"type":"string"},"default":{},"examples":{"type":"array","items":{}},"multipleOf":{"type":"number","exclusiveMinimum":0},"maximum":{"type":"number"},"exclusiveMaximum":{"type":"number"},"minimum":{"type":"number"},"exclusiveMinimum":{"type":"number"},"maxLength":{"$ref":"#/definitions/nonNegativeInteger"},"minLength":{"$ref":"#/definitions/nonNegativeIntegerDefault0"},"pattern":{"type":"string","format":"regex"},"additionalItems":{"$ref":"#"},"items":{"anyOf":[{"$ref":"#"},{"$ref":"#/definitions/schemaArray"}],"default":{}},"maxItems":{"$ref":"#/definitions/nonNegativeInteger"},"minItems":{"$ref":"#/definitions/nonNegativeIntegerDefault0"},"uniqueItems":{"type":"boolean","default":false},"contains":{"$ref":"#"},"maxProperties":{"$ref":"#/definitions/nonNegativeInteger"},"minProperties":{"$ref":"#/definitions/nonNegativeIntegerDefault0"},"required":{"$ref":"#/definitions/stringArray"},"additionalProperties":{"$ref":"#"},"definitions":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"properties":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"patternProperties":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"dependencies":{"type":"object","additionalProperties":{"anyOf":[{"$ref":"#"},{"$ref":"#/definitions/stringArray"}]}},"propertyNames":{"$ref":"#"},"const":{},"enum":{"type":"array","minItems":1,"uniqueItems":true},"type":{"anyOf":[{"$ref":"#/definitions/simpleTypes"},{"type":"array","items":{"$ref":"#/definitions/simpleTypes"},"minItems":1,"uniqueItems":true}]},"format":{"type":"string"},"allOf":{"$ref":"#/definitions/schemaArray"},"anyOf":{"$ref":"#/definitions/schemaArray"},"oneOf":{"$ref":"#/definitions/schemaArray"},"not":{"$ref":"#"}},"default":{}};

/***/ }),

/***/ "./node_modules/ajv/lib/refs/json-schema-draft-07.json":
/***/ (function(module) {

module.exports = {"$schema":"http://json-schema.org/draft-07/schema#","$id":"http://json-schema.org/draft-07/schema#","title":"Core schema meta-schema","definitions":{"schemaArray":{"type":"array","minItems":1,"items":{"$ref":"#"}},"nonNegativeInteger":{"type":"integer","minimum":0},"nonNegativeIntegerDefault0":{"allOf":[{"$ref":"#/definitions/nonNegativeInteger"},{"default":0}]},"simpleTypes":{"enum":["array","boolean","integer","null","number","object","string"]},"stringArray":{"type":"array","items":{"type":"string"},"uniqueItems":true,"default":[]}},"type":["object","boolean"],"properties":{"$id":{"type":"string","format":"uri-reference"},"$schema":{"type":"string","format":"uri"},"$ref":{"type":"string","format":"uri-reference"},"$comment":{"type":"string"},"title":{"type":"string"},"description":{"type":"string"},"default":true,"readOnly":{"type":"boolean","default":false},"examples":{"type":"array","items":true},"multipleOf":{"type":"number","exclusiveMinimum":0},"maximum":{"type":"number"},"exclusiveMaximum":{"type":"number"},"minimum":{"type":"number"},"exclusiveMinimum":{"type":"number"},"maxLength":{"$ref":"#/definitions/nonNegativeInteger"},"minLength":{"$ref":"#/definitions/nonNegativeIntegerDefault0"},"pattern":{"type":"string","format":"regex"},"additionalItems":{"$ref":"#"},"items":{"anyOf":[{"$ref":"#"},{"$ref":"#/definitions/schemaArray"}],"default":true},"maxItems":{"$ref":"#/definitions/nonNegativeInteger"},"minItems":{"$ref":"#/definitions/nonNegativeIntegerDefault0"},"uniqueItems":{"type":"boolean","default":false},"contains":{"$ref":"#"},"maxProperties":{"$ref":"#/definitions/nonNegativeInteger"},"minProperties":{"$ref":"#/definitions/nonNegativeIntegerDefault0"},"required":{"$ref":"#/definitions/stringArray"},"additionalProperties":{"$ref":"#"},"definitions":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"properties":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"patternProperties":{"type":"object","additionalProperties":{"$ref":"#"},"propertyNames":{"format":"regex"},"default":{}},"dependencies":{"type":"object","additionalProperties":{"anyOf":[{"$ref":"#"},{"$ref":"#/definitions/stringArray"}]}},"propertyNames":{"$ref":"#"},"const":true,"enum":{"type":"array","items":true,"minItems":1,"uniqueItems":true},"type":{"anyOf":[{"$ref":"#/definitions/simpleTypes"},{"type":"array","items":{"$ref":"#/definitions/simpleTypes"},"minItems":1,"uniqueItems":true}]},"format":{"type":"string"},"contentMediaType":{"type":"string"},"contentEncoding":{"type":"string"},"if":{"$ref":"#"},"then":{"$ref":"#"},"else":{"$ref":"#"},"allOf":{"$ref":"#/definitions/schemaArray"},"anyOf":{"$ref":"#/definitions/schemaArray"},"oneOf":{"$ref":"#/definitions/schemaArray"},"not":{"$ref":"#"}},"default":true};

/***/ }),

/***/ "./node_modules/base64-js/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__("./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__("./node_modules/ieee754/index.js")
var isArray = __webpack_require__("./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/class-transformer/ClassTransformer.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TransformOperationExecutor_1 = __webpack_require__("./node_modules/class-transformer/TransformOperationExecutor.js");
var ClassTransformer = /** @class */ (function () {
    function ClassTransformer() {
    }
    ClassTransformer.prototype.classToPlain = function (object, options) {
        var executor = new TransformOperationExecutor_1.TransformOperationExecutor(TransformOperationExecutor_1.TransformationType.CLASS_TO_PLAIN, options || {});
        return executor.transform(undefined, object, undefined, undefined, undefined, undefined);
    };
    ClassTransformer.prototype.classToPlainFromExist = function (object, plainObject, options) {
        var executor = new TransformOperationExecutor_1.TransformOperationExecutor(TransformOperationExecutor_1.TransformationType.CLASS_TO_PLAIN, options || {});
        return executor.transform(plainObject, object, undefined, undefined, undefined, undefined);
    };
    ClassTransformer.prototype.plainToClass = function (cls, plain, options) {
        var executor = new TransformOperationExecutor_1.TransformOperationExecutor(TransformOperationExecutor_1.TransformationType.PLAIN_TO_CLASS, options || {});
        return executor.transform(undefined, plain, cls, undefined, undefined, undefined);
    };
    ClassTransformer.prototype.plainToClassFromExist = function (clsObject, plain, options) {
        var executor = new TransformOperationExecutor_1.TransformOperationExecutor(TransformOperationExecutor_1.TransformationType.PLAIN_TO_CLASS, options || {});
        return executor.transform(clsObject, plain, undefined, undefined, undefined, undefined);
    };
    ClassTransformer.prototype.classToClass = function (object, options) {
        var executor = new TransformOperationExecutor_1.TransformOperationExecutor(TransformOperationExecutor_1.TransformationType.CLASS_TO_CLASS, options || {});
        return executor.transform(undefined, object, undefined, undefined, undefined, undefined);
    };
    ClassTransformer.prototype.classToClassFromExist = function (object, fromObject, options) {
        var executor = new TransformOperationExecutor_1.TransformOperationExecutor(TransformOperationExecutor_1.TransformationType.CLASS_TO_CLASS, options || {});
        return executor.transform(fromObject, object, undefined, undefined, undefined, undefined);
    };
    ClassTransformer.prototype.serialize = function (object, options) {
        return JSON.stringify(this.classToPlain(object, options));
    };
    /**
     * Deserializes given JSON string to a object of the given class.
     */
    ClassTransformer.prototype.deserialize = function (cls, json, options) {
        var jsonObject = JSON.parse(json);
        return this.plainToClass(cls, jsonObject, options);
    };
    /**
     * Deserializes given JSON string to an array of objects of the given class.
     */
    ClassTransformer.prototype.deserializeArray = function (cls, json, options) {
        var jsonObject = JSON.parse(json);
        return this.plainToClass(cls, jsonObject, options);
    };
    return ClassTransformer;
}());
exports.ClassTransformer = ClassTransformer;

//# sourceMappingURL=ClassTransformer.js.map


/***/ }),

/***/ "./node_modules/class-transformer/TransformOperationExecutor.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var storage_1 = __webpack_require__("./node_modules/class-transformer/storage.js");
var TransformationType;
(function (TransformationType) {
    TransformationType[TransformationType["PLAIN_TO_CLASS"] = 0] = "PLAIN_TO_CLASS";
    TransformationType[TransformationType["CLASS_TO_PLAIN"] = 1] = "CLASS_TO_PLAIN";
    TransformationType[TransformationType["CLASS_TO_CLASS"] = 2] = "CLASS_TO_CLASS";
})(TransformationType = exports.TransformationType || (exports.TransformationType = {}));
var TransformOperationExecutor = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function TransformOperationExecutor(transformationType, options) {
        this.transformationType = transformationType;
        this.options = options;
        // -------------------------------------------------------------------------
        // Private Properties
        // -------------------------------------------------------------------------
        this.transformedTypesMap = new Map();
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    TransformOperationExecutor.prototype.transform = function (source, value, targetType, arrayType, isMap, level) {
        var _this = this;
        if (level === void 0) { level = 0; }
        if (value instanceof Array || value instanceof Set) {
            var newValue_1 = arrayType && this.transformationType === TransformationType.PLAIN_TO_CLASS ? new arrayType() : [];
            value.forEach(function (subValue, index) {
                var subSource = source ? source[index] : undefined;
                if (!_this.options.enableCircularCheck || !_this.isCircular(subValue, level)) {
                    var value_1 = _this.transform(subSource, subValue, targetType, undefined, subValue instanceof Map, level + 1);
                    if (newValue_1 instanceof Set) {
                        newValue_1.add(value_1);
                    }
                    else {
                        newValue_1.push(value_1);
                    }
                }
                else if (_this.transformationType === TransformationType.CLASS_TO_CLASS) {
                    if (newValue_1 instanceof Set) {
                        newValue_1.add(subValue);
                    }
                    else {
                        newValue_1.push(subValue);
                    }
                }
            });
            return newValue_1;
        }
        else if (targetType === String && !isMap) {
            return String(value);
        }
        else if (targetType === Number && !isMap) {
            return Number(value);
        }
        else if (targetType === Boolean && !isMap) {
            return Boolean(value);
        }
        else if ((targetType === Date || value instanceof Date) && !isMap) {
            if (value instanceof Date) {
                return new Date(value.valueOf());
            }
            if (value === null || value === undefined)
                return value;
            return new Date(value);
        }
        else if (typeof value === "object" && value !== null) {
            // try to guess the type
            if (!targetType && value.constructor !== Object /* && TransformationType === TransformationType.CLASS_TO_PLAIN*/)
                targetType = value.constructor;
            if (!targetType && source)
                targetType = source.constructor;
            if (this.options.enableCircularCheck) {
                // add transformed type to prevent circular references
                this.transformedTypesMap.set(value, { level: level, object: value });
            }
            var keys = this.getKeys(targetType, value);
            var newValue = source ? source : {};
            if (!source && (this.transformationType === TransformationType.PLAIN_TO_CLASS || this.transformationType === TransformationType.CLASS_TO_CLASS)) {
                if (isMap) {
                    newValue = new Map();
                }
                else if (targetType) {
                    newValue = new targetType();
                }
                else {
                    newValue = {};
                }
            }
            var _loop_1 = function (key) {
                var valueKey = key, newValueKey = key, propertyName = key;
                if (!this_1.options.ignoreDecorators && targetType) {
                    if (this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
                        var exposeMetadata = storage_1.defaultMetadataStorage.findExposeMetadataByCustomName(targetType, key);
                        if (exposeMetadata) {
                            propertyName = exposeMetadata.propertyName;
                            newValueKey = exposeMetadata.propertyName;
                        }
                    }
                    else if (this_1.transformationType === TransformationType.CLASS_TO_PLAIN || this_1.transformationType === TransformationType.CLASS_TO_CLASS) {
                        var exposeMetadata = storage_1.defaultMetadataStorage.findExposeMetadata(targetType, key);
                        if (exposeMetadata && exposeMetadata.options && exposeMetadata.options.name)
                            newValueKey = exposeMetadata.options.name;
                    }
                }
                // get a subvalue
                var subValue = undefined;
                if (value instanceof Map) {
                    subValue = value.get(valueKey);
                }
                else if (value[valueKey] instanceof Function) {
                    subValue = value[valueKey]();
                }
                else {
                    subValue = value[valueKey];
                }
                // determine a type
                var type = undefined, isSubValueMap = subValue instanceof Map;
                if (targetType && isMap) {
                    type = targetType;
                }
                else if (targetType) {
                    var metadata = storage_1.defaultMetadataStorage.findTypeMetadata(targetType, propertyName);
                    if (metadata) {
                        var options = { newObject: newValue, object: value, property: propertyName };
                        type = metadata.typeFunction(options);
                        isSubValueMap = isSubValueMap || metadata.reflectedType === Map;
                    }
                    else if (this_1.options.targetMaps) {
                        this_1.options.targetMaps
                            .filter(function (map) { return map.target === targetType && !!map.properties[propertyName]; })
                            .forEach(function (map) { return type = map.properties[propertyName]; });
                    }
                }
                // if value is an array try to get its custom array type
                var arrayType_1 = value[valueKey] instanceof Array ? this_1.getReflectedType(targetType, propertyName) : undefined;
                // const subValueKey = TransformationType === TransformationType.PLAIN_TO_CLASS && newKeyName ? newKeyName : key;
                var subSource = source ? source[valueKey] : undefined;
                // if its deserialization then type if required
                // if we uncomment this types like string[] will not work
                // if (this.transformationType === TransformationType.PLAIN_TO_CLASS && !type && subValue instanceof Object && !(subValue instanceof Date))
                //     throw new Error(`Cannot determine type for ${(targetType as any).name }.${propertyName}, did you forget to specify a @Type?`);
                // if newValue is a source object that has method that match newKeyName then skip it
                if (newValue.constructor.prototype) {
                    var descriptor = Object.getOwnPropertyDescriptor(newValue.constructor.prototype, newValueKey);
                    if ((this_1.transformationType === TransformationType.PLAIN_TO_CLASS || this_1.transformationType === TransformationType.CLASS_TO_CLASS)
                        && (newValue[newValueKey] instanceof Function || (descriptor && !descriptor.set)))
                        return "continue";
                }
                if (!this_1.options.enableCircularCheck || !this_1.isCircular(subValue, level)) {
                    var transformKey = this_1.transformationType === TransformationType.PLAIN_TO_CLASS ? newValueKey : key;
                    var finalValue = this_1.transform(subSource, subValue, type, arrayType_1, isSubValueMap, level + 1);
                    finalValue = this_1.applyCustomTransformations(finalValue, targetType, transformKey, value, this_1.transformationType);
                    if (newValue instanceof Map) {
                        newValue.set(newValueKey, finalValue);
                    }
                    else {
                        newValue[newValueKey] = finalValue;
                    }
                }
                else if (this_1.transformationType === TransformationType.CLASS_TO_CLASS) {
                    var finalValue = subValue;
                    finalValue = this_1.applyCustomTransformations(finalValue, targetType, key, value, this_1.transformationType);
                    if (newValue instanceof Map) {
                        newValue.set(newValueKey, finalValue);
                    }
                    else {
                        newValue[newValueKey] = finalValue;
                    }
                }
            };
            var this_1 = this;
            // traverse over keys
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                _loop_1(key);
            }
            return newValue;
        }
        else {
            return value;
        }
    };
    TransformOperationExecutor.prototype.applyCustomTransformations = function (value, target, key, obj, transformationType) {
        var _this = this;
        var metadatas = storage_1.defaultMetadataStorage.findTransformMetadatas(target, key, this.transformationType);
        // apply versioning options
        if (this.options.version !== undefined) {
            metadatas = metadatas.filter(function (metadata) {
                if (!metadata.options)
                    return true;
                return _this.checkVersion(metadata.options.since, metadata.options.until);
            });
        }
        // apply grouping options
        if (this.options.groups && this.options.groups.length) {
            metadatas = metadatas.filter(function (metadata) {
                if (!metadata.options)
                    return true;
                return _this.checkGroups(metadata.options.groups);
            });
        }
        else {
            metadatas = metadatas.filter(function (metadata) {
                return !metadata.options || !metadata.options.groups || !metadata.options.groups.length;
            });
        }
        metadatas.forEach(function (metadata) {
            value = metadata.transformFn(value, obj, transformationType);
        });
        return value;
    };
    // preventing circular references
    TransformOperationExecutor.prototype.isCircular = function (object, level) {
        var transformed = this.transformedTypesMap.get(object);
        return transformed !== undefined && transformed.level < level;
    };
    TransformOperationExecutor.prototype.getReflectedType = function (target, propertyName) {
        if (!target)
            return undefined;
        var meta = storage_1.defaultMetadataStorage.findTypeMetadata(target, propertyName);
        return meta ? meta.reflectedType : undefined;
    };
    TransformOperationExecutor.prototype.getKeys = function (target, object) {
        var _this = this;
        // determine exclusion strategy
        var strategy = storage_1.defaultMetadataStorage.getStrategy(target);
        if (strategy === "none")
            strategy = this.options.strategy || "exposeAll"; // exposeAll is default strategy
        // get all keys that need to expose
        var keys = [];
        if (strategy === "exposeAll") {
            if (object instanceof Map) {
                keys = Array.from(object.keys());
            }
            else {
                keys = Object.keys(object);
            }
        }
        if (!this.options.ignoreDecorators && target) {
            // add all exposed to list of keys
            var exposedProperties = storage_1.defaultMetadataStorage.getExposedProperties(target, this.transformationType);
            if (this.transformationType === TransformationType.PLAIN_TO_CLASS) {
                exposedProperties = exposedProperties.map(function (key) {
                    var exposeMetadata = storage_1.defaultMetadataStorage.findExposeMetadata(target, key);
                    if (exposeMetadata && exposeMetadata.options && exposeMetadata.options.name) {
                        return exposeMetadata.options.name;
                    }
                    return key;
                });
            }
            keys = keys.concat(exposedProperties);
            // exclude excluded properties
            var excludedProperties_1 = storage_1.defaultMetadataStorage.getExcludedProperties(target, this.transformationType);
            if (excludedProperties_1.length > 0) {
                keys = keys.filter(function (key) {
                    return excludedProperties_1.indexOf(key) === -1;
                });
            }
            // apply versioning options
            if (this.options.version !== undefined) {
                keys = keys.filter(function (key) {
                    var exposeMetadata = storage_1.defaultMetadataStorage.findExposeMetadata(target, key);
                    if (!exposeMetadata || !exposeMetadata.options)
                        return true;
                    return _this.checkVersion(exposeMetadata.options.since, exposeMetadata.options.until);
                });
            }
            // apply grouping options
            if (this.options.groups && this.options.groups.length) {
                keys = keys.filter(function (key) {
                    var exposeMetadata = storage_1.defaultMetadataStorage.findExposeMetadata(target, key);
                    if (!exposeMetadata || !exposeMetadata.options)
                        return true;
                    return _this.checkGroups(exposeMetadata.options.groups);
                });
            }
            else {
                keys = keys.filter(function (key) {
                    var exposeMetadata = storage_1.defaultMetadataStorage.findExposeMetadata(target, key);
                    return !exposeMetadata || !exposeMetadata.options || !exposeMetadata.options.groups || !exposeMetadata.options.groups.length;
                });
            }
        }
        // exclude prefixed properties
        if (this.options.excludePrefixes && this.options.excludePrefixes.length) {
            keys = keys.filter(function (key) { return _this.options.excludePrefixes.every(function (prefix) {
                return key.substr(0, prefix.length) !== prefix;
            }); });
        }
        // make sure we have unique keys
        keys = keys.filter(function (key, index, self) {
            return self.indexOf(key) === index;
        });
        return keys;
    };
    TransformOperationExecutor.prototype.checkVersion = function (since, until) {
        var decision = true;
        if (decision && since)
            decision = this.options.version >= since;
        if (decision && until)
            decision = this.options.version < until;
        return decision;
    };
    TransformOperationExecutor.prototype.checkGroups = function (groups) {
        if (!groups)
            return true;
        return this.options.groups.some(function (optionGroup) { return groups.indexOf(optionGroup) !== -1; });
    };
    return TransformOperationExecutor;
}());
exports.TransformOperationExecutor = TransformOperationExecutor;

//# sourceMappingURL=TransformOperationExecutor.js.map


/***/ }),

/***/ "./node_modules/class-transformer/decorators.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ClassTransformer_1 = __webpack_require__("./node_modules/class-transformer/ClassTransformer.js");
var storage_1 = __webpack_require__("./node_modules/class-transformer/storage.js");
var TypeMetadata_1 = __webpack_require__("./node_modules/class-transformer/metadata/TypeMetadata.js");
var ExposeMetadata_1 = __webpack_require__("./node_modules/class-transformer/metadata/ExposeMetadata.js");
var ExcludeMetadata_1 = __webpack_require__("./node_modules/class-transformer/metadata/ExcludeMetadata.js");
var TransformMetadata_1 = __webpack_require__("./node_modules/class-transformer/metadata/TransformMetadata.js");
/**
 * Defines a custom logic for value transformation.
 */
function Transform(transformFn, options) {
    return function (target, key) {
        var metadata = new TransformMetadata_1.TransformMetadata(target.constructor, key, transformFn, options);
        storage_1.defaultMetadataStorage.addTransformMetadata(metadata);
    };
}
exports.Transform = Transform;
/**
 * Specifies a type of the property.
 */
function Type(typeFunction) {
    return function (target, key) {
        var type = Reflect.getMetadata("design:type", target, key);
        var metadata = new TypeMetadata_1.TypeMetadata(target.constructor, key, type, typeFunction);
        storage_1.defaultMetadataStorage.addTypeMetadata(metadata);
    };
}
exports.Type = Type;
/**
 * Marks property as included in the process of transformation. By default it includes the property for both
 * constructorToPlain and plainToConstructor transformations, however you can specify on which of transformation types
 * you want to skip this property.
 */
function Expose(options) {
    return function (object, propertyName) {
        var metadata = new ExposeMetadata_1.ExposeMetadata(object instanceof Function ? object : object.constructor, propertyName, options || {});
        storage_1.defaultMetadataStorage.addExposeMetadata(metadata);
    };
}
exports.Expose = Expose;
/**
 * Marks property as excluded from the process of transformation. By default it excludes the property for both
 * constructorToPlain and plainToConstructor transformations, however you can specify on which of transformation types
 * you want to skip this property.
 */
function Exclude(options) {
    return function (object, propertyName) {
        var metadata = new ExcludeMetadata_1.ExcludeMetadata(object instanceof Function ? object : object.constructor, propertyName, options || {});
        storage_1.defaultMetadataStorage.addExcludeMetadata(metadata);
    };
}
exports.Exclude = Exclude;
/**
 * Transform the object from class to plain object and return only with the exposed properties.
 */
function TransformClassToPlain(params) {
    return function (target, propertyKey, descriptor) {
        var classTransformer = new ClassTransformer_1.ClassTransformer();
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var result = originalMethod.apply(this, args);
            var isPromise = !!result && (typeof result === "object" || typeof result === "function") && typeof result.then === "function";
            return isPromise ? result.then(function (data) { return classTransformer.classToPlain(data, params); }) : classTransformer.classToPlain(result, params);
        };
    };
}
exports.TransformClassToPlain = TransformClassToPlain;
/**
 * Return the class instance only with the exposed properties.
 */
function TransformClassToClass(params) {
    return function (target, propertyKey, descriptor) {
        var classTransformer = new ClassTransformer_1.ClassTransformer();
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var result = originalMethod.apply(this, args);
            var isPromise = !!result && (typeof result === "object" || typeof result === "function") && typeof result.then === "function";
            return isPromise ? result.then(function (data) { return classTransformer.classToClass(data, params); }) : classTransformer.classToClass(result, params);
        };
    };
}
exports.TransformClassToClass = TransformClassToClass;

//# sourceMappingURL=decorators.js.map


/***/ }),

/***/ "./node_modules/class-transformer/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var ClassTransformer_1 = __webpack_require__("./node_modules/class-transformer/ClassTransformer.js");
var ClassTransformer_2 = __webpack_require__("./node_modules/class-transformer/ClassTransformer.js");
exports.ClassTransformer = ClassTransformer_2.ClassTransformer;
__export(__webpack_require__("./node_modules/class-transformer/decorators.js"));
var classTransformer = new ClassTransformer_1.ClassTransformer();
function classToPlain(object, options) {
    return classTransformer.classToPlain(object, options);
}
exports.classToPlain = classToPlain;
function classToPlainFromExist(object, plainObject, options) {
    return classTransformer.classToPlainFromExist(object, plainObject, options);
}
exports.classToPlainFromExist = classToPlainFromExist;
function plainToClass(cls, plain, options) {
    return classTransformer.plainToClass(cls, plain, options);
}
exports.plainToClass = plainToClass;
function plainToClassFromExist(clsObject, plain, options) {
    return classTransformer.plainToClassFromExist(clsObject, plain, options);
}
exports.plainToClassFromExist = plainToClassFromExist;
function classToClass(object, options) {
    return classTransformer.classToClass(object, options);
}
exports.classToClass = classToClass;
function classToClassFromExist(object, fromObject, options) {
    return classTransformer.classToClassFromExist(object, fromObject, options);
}
exports.classToClassFromExist = classToClassFromExist;
function serialize(object, options) {
    return classTransformer.serialize(object, options);
}
exports.serialize = serialize;
/**
 * Deserializes given JSON string to a object of the given class.
 */
function deserialize(cls, json, options) {
    return classTransformer.deserialize(cls, json, options);
}
exports.deserialize = deserialize;
/**
 * Deserializes given JSON string to an array of objects of the given class.
 */
function deserializeArray(cls, json, options) {
    return classTransformer.deserializeArray(cls, json, options);
}
exports.deserializeArray = deserializeArray;
/**
 * Enum representing the different transformation types.
 */
var TransformationType;
(function (TransformationType) {
    TransformationType[TransformationType["PLAIN_TO_CLASS"] = 0] = "PLAIN_TO_CLASS";
    TransformationType[TransformationType["CLASS_TO_PLAIN"] = 1] = "CLASS_TO_PLAIN";
    TransformationType[TransformationType["CLASS_TO_CLASS"] = 2] = "CLASS_TO_CLASS";
})(TransformationType = exports.TransformationType || (exports.TransformationType = {}));

//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/class-transformer/metadata/ExcludeMetadata.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ExcludeMetadata = /** @class */ (function () {
    function ExcludeMetadata(target, propertyName, options) {
        this.target = target;
        this.propertyName = propertyName;
        this.options = options;
    }
    return ExcludeMetadata;
}());
exports.ExcludeMetadata = ExcludeMetadata;

//# sourceMappingURL=ExcludeMetadata.js.map


/***/ }),

/***/ "./node_modules/class-transformer/metadata/ExposeMetadata.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ExposeMetadata = /** @class */ (function () {
    function ExposeMetadata(target, propertyName, options) {
        this.target = target;
        this.propertyName = propertyName;
        this.options = options;
    }
    return ExposeMetadata;
}());
exports.ExposeMetadata = ExposeMetadata;

//# sourceMappingURL=ExposeMetadata.js.map


/***/ }),

/***/ "./node_modules/class-transformer/metadata/MetadataStorage.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TransformOperationExecutor_1 = __webpack_require__("./node_modules/class-transformer/TransformOperationExecutor.js");
/**
 * Storage all library metadata.
 */
var MetadataStorage = /** @class */ (function () {
    function MetadataStorage() {
        // -------------------------------------------------------------------------
        // Properties
        // -------------------------------------------------------------------------
        this._typeMetadatas = [];
        this._transformMetadatas = [];
        this._exposeMetadatas = [];
        this._excludeMetadatas = [];
    }
    // -------------------------------------------------------------------------
    // Adder Methods
    // -------------------------------------------------------------------------
    MetadataStorage.prototype.addTypeMetadata = function (metadata) {
        this._typeMetadatas.push(metadata);
    };
    MetadataStorage.prototype.addTransformMetadata = function (metadata) {
        this._transformMetadatas.push(metadata);
    };
    MetadataStorage.prototype.addExposeMetadata = function (metadata) {
        this._exposeMetadatas.push(metadata);
    };
    MetadataStorage.prototype.addExcludeMetadata = function (metadata) {
        this._excludeMetadatas.push(metadata);
    };
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    MetadataStorage.prototype.findTransformMetadatas = function (target, propertyName, transformationType) {
        return this.findMetadatas(this._transformMetadatas, target, propertyName)
            .filter(function (metadata) {
            if (!metadata.options)
                return true;
            if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
                return true;
            if (metadata.options.toClassOnly === true) {
                return transformationType === TransformOperationExecutor_1.TransformationType.CLASS_TO_CLASS || transformationType === TransformOperationExecutor_1.TransformationType.PLAIN_TO_CLASS;
            }
            if (metadata.options.toPlainOnly === true) {
                return transformationType === TransformOperationExecutor_1.TransformationType.CLASS_TO_PLAIN;
            }
            return true;
        });
    };
    MetadataStorage.prototype.findExcludeMetadata = function (target, propertyName) {
        return this.findMetadata(this._excludeMetadatas, target, propertyName);
    };
    MetadataStorage.prototype.findExposeMetadata = function (target, propertyName) {
        return this.findMetadata(this._exposeMetadatas, target, propertyName);
    };
    MetadataStorage.prototype.findExposeMetadataByCustomName = function (target, name) {
        return this.getExposedMetadatas(target).find(function (metadata) {
            return metadata.options && metadata.options.name === name;
        });
    };
    MetadataStorage.prototype.findTypeMetadata = function (target, propertyName) {
        return this.findMetadata(this._typeMetadatas, target, propertyName);
    };
    MetadataStorage.prototype.getStrategy = function (target) {
        var exclude = this._excludeMetadatas.find(function (metadata) { return metadata.target === target && metadata.propertyName === undefined; });
        var expose = this._exposeMetadatas.find(function (metadata) { return metadata.target === target && metadata.propertyName === undefined; });
        if ((exclude && expose) || (!exclude && !expose))
            return "none";
        return exclude ? "excludeAll" : "exposeAll";
    };
    MetadataStorage.prototype.getExposedMetadatas = function (target) {
        return this.getMetadata(this._exposeMetadatas, target);
    };
    MetadataStorage.prototype.getExcludedMetadatas = function (target) {
        return this.getMetadata(this._excludeMetadatas, target);
    };
    MetadataStorage.prototype.getExposedProperties = function (target, transformationType) {
        return this.getExposedMetadatas(target)
            .filter(function (metadata) {
            if (!metadata.options)
                return true;
            if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
                return true;
            if (metadata.options.toClassOnly === true) {
                return transformationType === TransformOperationExecutor_1.TransformationType.CLASS_TO_CLASS || transformationType === TransformOperationExecutor_1.TransformationType.PLAIN_TO_CLASS;
            }
            if (metadata.options.toPlainOnly === true) {
                return transformationType === TransformOperationExecutor_1.TransformationType.CLASS_TO_PLAIN;
            }
            return true;
        })
            .map(function (metadata) { return metadata.propertyName; });
    };
    MetadataStorage.prototype.getExcludedProperties = function (target, transformationType) {
        return this.getExcludedMetadatas(target)
            .filter(function (metadata) {
            if (!metadata.options)
                return true;
            if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
                return true;
            if (metadata.options.toClassOnly === true) {
                return transformationType === TransformOperationExecutor_1.TransformationType.CLASS_TO_CLASS || transformationType === TransformOperationExecutor_1.TransformationType.PLAIN_TO_CLASS;
            }
            if (metadata.options.toPlainOnly === true) {
                return transformationType === TransformOperationExecutor_1.TransformationType.CLASS_TO_PLAIN;
            }
            return true;
        })
            .map(function (metadata) { return metadata.propertyName; });
    };
    MetadataStorage.prototype.clear = function () {
        this._typeMetadatas = [];
        this._exposeMetadatas = [];
        this._excludeMetadatas = [];
    };
    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------
    MetadataStorage.prototype.getMetadata = function (metadatas, target) {
        var metadataFromTarget = metadatas.filter(function (meta) { return meta.target === target && meta.propertyName !== undefined; });
        var metadataFromChildren = metadatas.filter(function (meta) { return target && target.prototype instanceof meta.target && meta.propertyName !== undefined; });
        return metadataFromChildren.concat(metadataFromTarget);
    };
    MetadataStorage.prototype.findMetadata = function (metadatas, target, propertyName) {
        var metadataFromTarget = metadatas.find(function (meta) { return meta.target === target && meta.propertyName === propertyName; });
        var metadataFromChildren = metadatas.find(function (meta) { return target && target.prototype instanceof meta.target && meta.propertyName === propertyName; });
        return metadataFromTarget || metadataFromChildren;
    };
    MetadataStorage.prototype.findMetadatas = function (metadatas, target, propertyName) {
        var metadataFromTarget = metadatas.filter(function (meta) { return meta.target === target && meta.propertyName === propertyName; });
        var metadataFromChildren = metadatas.filter(function (meta) { return target && target.prototype instanceof meta.target && meta.propertyName === propertyName; });
        return metadataFromChildren.reverse().concat(metadataFromTarget.reverse());
    };
    return MetadataStorage;
}());
exports.MetadataStorage = MetadataStorage;

//# sourceMappingURL=MetadataStorage.js.map


/***/ }),

/***/ "./node_modules/class-transformer/metadata/TransformMetadata.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TransformMetadata = /** @class */ (function () {
    function TransformMetadata(target, propertyName, transformFn, options) {
        this.target = target;
        this.propertyName = propertyName;
        this.transformFn = transformFn;
        this.options = options;
    }
    return TransformMetadata;
}());
exports.TransformMetadata = TransformMetadata;

//# sourceMappingURL=TransformMetadata.js.map


/***/ }),

/***/ "./node_modules/class-transformer/metadata/TypeMetadata.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TypeMetadata = /** @class */ (function () {
    function TypeMetadata(target, propertyName, reflectedType, typeFunction) {
        this.target = target;
        this.propertyName = propertyName;
        this.reflectedType = reflectedType;
        this.typeFunction = typeFunction;
    }
    return TypeMetadata;
}());
exports.TypeMetadata = TypeMetadata;

//# sourceMappingURL=TypeMetadata.js.map


/***/ }),

/***/ "./node_modules/class-transformer/storage.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MetadataStorage_1 = __webpack_require__("./node_modules/class-transformer/metadata/MetadataStorage.js");
/**
 * Default metadata storage is used as singleton and can be used to storage all metadatas.
 */
exports.defaultMetadataStorage = new MetadataStorage_1.MetadataStorage();

//# sourceMappingURL=storage.js.map


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

/***/ "./node_modules/fast-deep-equal/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function equal(a, b) {
  if (a === b) return true;

  var arrA = Array.isArray(a)
    , arrB = Array.isArray(b)
    , i;

  if (arrA && arrB) {
    if (a.length != b.length) return false;
    for (i = 0; i < a.length; i++)
      if (!equal(a[i], b[i])) return false;
    return true;
  }

  if (arrA != arrB) return false;

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    var keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length) return false;

    var dateA = a instanceof Date
      , dateB = b instanceof Date;
    if (dateA && dateB) return a.getTime() == b.getTime();
    if (dateA != dateB) return false;

    var regexpA = a instanceof RegExp
      , regexpB = b instanceof RegExp;
    if (regexpA && regexpB) return a.toString() == b.toString();
    if (regexpA != regexpB) return false;

    for (i = 0; i < keys.length; i++)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = 0; i < keys.length; i++)
      if(!equal(a[keys[i]], b[keys[i]])) return false;

    return true;
  }

  return false;
};


/***/ }),

/***/ "./node_modules/fast-json-stable-stringify/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (data, opts) {
    if (!opts) opts = {};
    if (typeof opts === 'function') opts = { cmp: opts };
    var cycles = (typeof opts.cycles === 'boolean') ? opts.cycles : false;

    var cmp = opts.cmp && (function (f) {
        return function (node) {
            return function (a, b) {
                var aobj = { key: a, value: node[a] };
                var bobj = { key: b, value: node[b] };
                return f(aobj, bobj);
            };
        };
    })(opts.cmp);

    var seen = [];
    return (function stringify (node) {
        if (node && node.toJSON && typeof node.toJSON === 'function') {
            node = node.toJSON();
        }

        if (node === undefined) return;
        if (typeof node == 'number') return isFinite(node) ? '' + node : 'null';
        if (typeof node !== 'object') return JSON.stringify(node);

        var i, out;
        if (Array.isArray(node)) {
            out = '[';
            for (i = 0; i < node.length; i++) {
                if (i) out += ',';
                out += stringify(node[i]) || 'null';
            }
            return out + ']';
        }

        if (node === null) return 'null';

        if (seen.indexOf(node) !== -1) {
            if (cycles) return JSON.stringify('__cycle__');
            throw new TypeError('Converting circular structure to JSON');
        }

        var seenIndex = seen.push(node) - 1;
        var keys = Object.keys(node).sort(cmp && cmp(node));
        out = '';
        for (i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = stringify(node[key]);

            if (!value) continue;
            if (out) out += ',';
            out += JSON.stringify(key) + ':' + value;
        }
        seen.splice(seenIndex, 1);
        return '{' + out + '}';
    })(data);
};


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/json-schema-traverse/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var traverse = module.exports = function (schema, opts, cb) {
  if (typeof opts == 'function') {
    cb = opts;
    opts = {};
  }
  _traverse(opts, cb, schema, '', schema);
};


traverse.keywords = {
  additionalItems: true,
  items: true,
  contains: true,
  additionalProperties: true,
  propertyNames: true,
  not: true
};

traverse.arrayKeywords = {
  items: true,
  allOf: true,
  anyOf: true,
  oneOf: true
};

traverse.propsKeywords = {
  definitions: true,
  properties: true,
  patternProperties: true,
  dependencies: true
};

traverse.skipKeywords = {
  enum: true,
  const: true,
  required: true,
  maximum: true,
  minimum: true,
  exclusiveMaximum: true,
  exclusiveMinimum: true,
  multipleOf: true,
  maxLength: true,
  minLength: true,
  pattern: true,
  format: true,
  maxItems: true,
  minItems: true,
  uniqueItems: true,
  maxProperties: true,
  minProperties: true
};


function _traverse(opts, cb, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
  if (schema && typeof schema == 'object' && !Array.isArray(schema)) {
    cb(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
    for (var key in schema) {
      var sch = schema[key];
      if (Array.isArray(sch)) {
        if (key in traverse.arrayKeywords) {
          for (var i=0; i<sch.length; i++)
            _traverse(opts, cb, sch[i], jsonPtr + '/' + key + '/' + i, rootSchema, jsonPtr, key, schema, i);
        }
      } else if (key in traverse.propsKeywords) {
        if (sch && typeof sch == 'object') {
          for (var prop in sch)
            _traverse(opts, cb, sch[prop], jsonPtr + '/' + key + '/' + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
        }
      } else if (key in traverse.keywords || (opts.allKeys && !(key in traverse.skipKeywords))) {
        _traverse(opts, cb, sch, jsonPtr + '/' + key, rootSchema, jsonPtr, key, schema);
      }
    }
  }
}


function escapeJsonPtr(str) {
  return str.replace(/~/g, '~0').replace(/\//g, '~1');
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

/***/ "./node_modules/punycode/punycode.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("./node_modules/webpack/buildin/module.js")(module), __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/reflect-metadata/Reflect.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Reflect;
(function (Reflect) {
    // Metadata Proposal
    // https://rbuckton.github.io/reflect-metadata/
    (function (factory) {
        var root = typeof global === "object" ? global :
            typeof self === "object" ? self :
                typeof this === "object" ? this :
                    Function("return this;")();
        var exporter = makeExporter(Reflect);
        if (typeof root.Reflect === "undefined") {
            root.Reflect = Reflect;
        }
        else {
            exporter = makeExporter(root.Reflect, exporter);
        }
        factory(exporter);
        function makeExporter(target, previous) {
            return function (key, value) {
                if (typeof target[key] !== "function") {
                    Object.defineProperty(target, key, { configurable: true, writable: true, value: value });
                }
                if (previous)
                    previous(key, value);
            };
        }
    })(function (exporter) {
        var hasOwn = Object.prototype.hasOwnProperty;
        // feature test for Symbol support
        var supportsSymbol = typeof Symbol === "function";
        var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
        var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
        var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
        var supportsProto = { __proto__: [] } instanceof Array; // feature test for __proto__ support
        var downLevel = !supportsCreate && !supportsProto;
        var HashMap = {
            // create an object in dictionary mode (a.k.a. "slow" mode in v8)
            create: supportsCreate
                ? function () { return MakeDictionary(Object.create(null)); }
                : supportsProto
                    ? function () { return MakeDictionary({ __proto__: null }); }
                    : function () { return MakeDictionary({}); },
            has: downLevel
                ? function (map, key) { return hasOwn.call(map, key); }
                : function (map, key) { return key in map; },
            get: downLevel
                ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
                : function (map, key) { return map[key]; },
        };
        // Load global or shim versions of Map, Set, and WeakMap
        var functionPrototype = Object.getPrototypeOf(Function);
        var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
        var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
        var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
        var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
        // [[Metadata]] internal slot
        // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
        var Metadata = new _WeakMap();
        /**
         * Applies a set of decorators to a property of a target object.
         * @param decorators An array of decorators.
         * @param target The target object.
         * @param propertyKey (Optional) The property key to decorate.
         * @param attributes (Optional) The property descriptor for the target key.
         * @remarks Decorators are applied in reverse order.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Example = Reflect.decorate(decoratorsArray, Example);
         *
         *     // property (on constructor)
         *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Object.defineProperty(Example, "staticMethod",
         *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
         *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
         *
         *     // method (on prototype)
         *     Object.defineProperty(Example.prototype, "method",
         *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
         *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
         *
         */
        function decorate(decorators, target, propertyKey, attributes) {
            if (!IsUndefined(propertyKey)) {
                if (!IsArray(decorators))
                    throw new TypeError();
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
                    throw new TypeError();
                if (IsNull(attributes))
                    attributes = undefined;
                propertyKey = ToPropertyKey(propertyKey);
                return DecorateProperty(decorators, target, propertyKey, attributes);
            }
            else {
                if (!IsArray(decorators))
                    throw new TypeError();
                if (!IsConstructor(target))
                    throw new TypeError();
                return DecorateConstructor(decorators, target);
            }
        }
        exporter("decorate", decorate);
        // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
        // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
        /**
         * A default metadata decorator factory that can be used on a class, class member, or parameter.
         * @param metadataKey The key for the metadata entry.
         * @param metadataValue The value for the metadata entry.
         * @returns A decorator function.
         * @remarks
         * If `metadataKey` is already defined for the target and target key, the
         * metadataValue for that key will be overwritten.
         * @example
         *
         *     // constructor
         *     @Reflect.metadata(key, value)
         *     class Example {
         *     }
         *
         *     // property (on constructor, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticProperty;
         *     }
         *
         *     // property (on prototype, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         property;
         *     }
         *
         *     // method (on constructor)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticMethod() { }
         *     }
         *
         *     // method (on prototype)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         method() { }
         *     }
         *
         */
        function metadata(metadataKey, metadataValue) {
            function decorator(target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
                    throw new TypeError();
                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
            }
            return decorator;
        }
        exporter("metadata", metadata);
        /**
         * Define a unique metadata entry on the target.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param metadataValue A value that contains attached metadata.
         * @param target The target object on which to define metadata.
         * @param propertyKey (Optional) The property key for the target.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Reflect.defineMetadata("custom:annotation", options, Example);
         *
         *     // property (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
         *
         *     // method (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
         *
         *     // decorator factory as metadata-producing annotation.
         *     function MyAnnotation(options): Decorator {
         *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
         *     }
         *
         */
        function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        exporter("defineMetadata", defineMetadata);
        /**
         * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function hasMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasMetadata", hasMetadata);
        /**
         * Gets a value indicating whether the target object has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function hasOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasOwnMetadata", hasOwnMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function getMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetMetadata(metadataKey, target, propertyKey);
        }
        exporter("getMetadata", getMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function getOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("getOwnMetadata", getOwnMetadata);
        /**
         * Gets the metadata keys defined on the target object or its prototype chain.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "method");
         *
         */
        function getMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryMetadataKeys(target, propertyKey);
        }
        exporter("getMetadataKeys", getMetadataKeys);
        /**
         * Gets the unique metadata keys defined on the target object.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
         *
         */
        function getOwnMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryOwnMetadataKeys(target, propertyKey);
        }
        exporter("getOwnMetadataKeys", getOwnMetadataKeys);
        /**
         * Deletes the metadata entry from the target object with the provided key.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata entry was found and deleted; otherwise, false.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.deleteMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function deleteMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            var metadataMap = GetOrCreateMetadataMap(target, propertyKey, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return false;
            if (!metadataMap.delete(metadataKey))
                return false;
            if (metadataMap.size > 0)
                return true;
            var targetMetadata = Metadata.get(target);
            targetMetadata.delete(propertyKey);
            if (targetMetadata.size > 0)
                return true;
            Metadata.delete(target);
            return true;
        }
        exporter("deleteMetadata", deleteMetadata);
        function DecorateConstructor(decorators, target) {
            for (var i = decorators.length - 1; i >= 0; --i) {
                var decorator = decorators[i];
                var decorated = decorator(target);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsConstructor(decorated))
                        throw new TypeError();
                    target = decorated;
                }
            }
            return target;
        }
        function DecorateProperty(decorators, target, propertyKey, descriptor) {
            for (var i = decorators.length - 1; i >= 0; --i) {
                var decorator = decorators[i];
                var decorated = decorator(target, propertyKey, descriptor);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsObject(decorated))
                        throw new TypeError();
                    descriptor = decorated;
                }
            }
            return descriptor;
        }
        function GetOrCreateMetadataMap(O, P, Create) {
            var targetMetadata = Metadata.get(O);
            if (IsUndefined(targetMetadata)) {
                if (!Create)
                    return undefined;
                targetMetadata = new _Map();
                Metadata.set(O, targetMetadata);
            }
            var metadataMap = targetMetadata.get(P);
            if (IsUndefined(metadataMap)) {
                if (!Create)
                    return undefined;
                metadataMap = new _Map();
                targetMetadata.set(P, metadataMap);
            }
            return metadataMap;
        }
        // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
        function OrdinaryHasMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                return true;
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                return OrdinaryHasMetadata(MetadataKey, parent, P);
            return false;
        }
        // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
        function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return false;
            return ToBoolean(metadataMap.has(MetadataKey));
        }
        // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
        function OrdinaryGetMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                return OrdinaryGetOwnMetadata(MetadataKey, O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                return OrdinaryGetMetadata(MetadataKey, parent, P);
            return undefined;
        }
        // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
        function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return undefined;
            return metadataMap.get(MetadataKey);
        }
        // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
        function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
            metadataMap.set(MetadataKey, MetadataValue);
        }
        // 3.1.6.1 OrdinaryMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
        function OrdinaryMetadataKeys(O, P) {
            var ownKeys = OrdinaryOwnMetadataKeys(O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (parent === null)
                return ownKeys;
            var parentKeys = OrdinaryMetadataKeys(parent, P);
            if (parentKeys.length <= 0)
                return ownKeys;
            if (ownKeys.length <= 0)
                return parentKeys;
            var set = new _Set();
            var keys = [];
            for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
                var key = ownKeys_1[_i];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
                var key = parentKeys_1[_a];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            return keys;
        }
        // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
        function OrdinaryOwnMetadataKeys(O, P) {
            var keys = [];
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return keys;
            var keysObj = metadataMap.keys();
            var iterator = GetIterator(keysObj);
            var k = 0;
            while (true) {
                var next = IteratorStep(iterator);
                if (!next) {
                    keys.length = k;
                    return keys;
                }
                var nextValue = IteratorValue(next);
                try {
                    keys[k] = nextValue;
                }
                catch (e) {
                    try {
                        IteratorClose(iterator);
                    }
                    finally {
                        throw e;
                    }
                }
                k++;
            }
        }
        // 6 ECMAScript Data Typ0es and Values
        // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
        function Type(x) {
            if (x === null)
                return 1 /* Null */;
            switch (typeof x) {
                case "undefined": return 0 /* Undefined */;
                case "boolean": return 2 /* Boolean */;
                case "string": return 3 /* String */;
                case "symbol": return 4 /* Symbol */;
                case "number": return 5 /* Number */;
                case "object": return x === null ? 1 /* Null */ : 6 /* Object */;
                default: return 6 /* Object */;
            }
        }
        // 6.1.1 The Undefined Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
        function IsUndefined(x) {
            return x === undefined;
        }
        // 6.1.2 The Null Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
        function IsNull(x) {
            return x === null;
        }
        // 6.1.5 The Symbol Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
        function IsSymbol(x) {
            return typeof x === "symbol";
        }
        // 6.1.7 The Object Type
        // https://tc39.github.io/ecma262/#sec-object-type
        function IsObject(x) {
            return typeof x === "object" ? x !== null : typeof x === "function";
        }
        // 7.1 Type Conversion
        // https://tc39.github.io/ecma262/#sec-type-conversion
        // 7.1.1 ToPrimitive(input [, PreferredType])
        // https://tc39.github.io/ecma262/#sec-toprimitive
        function ToPrimitive(input, PreferredType) {
            switch (Type(input)) {
                case 0 /* Undefined */: return input;
                case 1 /* Null */: return input;
                case 2 /* Boolean */: return input;
                case 3 /* String */: return input;
                case 4 /* Symbol */: return input;
                case 5 /* Number */: return input;
            }
            var hint = PreferredType === 3 /* String */ ? "string" : PreferredType === 5 /* Number */ ? "number" : "default";
            var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
            if (exoticToPrim !== undefined) {
                var result = exoticToPrim.call(input, hint);
                if (IsObject(result))
                    throw new TypeError();
                return result;
            }
            return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
        }
        // 7.1.1.1 OrdinaryToPrimitive(O, hint)
        // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
        function OrdinaryToPrimitive(O, hint) {
            if (hint === "string") {
                var toString_1 = O.toString;
                if (IsCallable(toString_1)) {
                    var result = toString_1.call(O);
                    if (!IsObject(result))
                        return result;
                }
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result))
                        return result;
                }
            }
            else {
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result))
                        return result;
                }
                var toString_2 = O.toString;
                if (IsCallable(toString_2)) {
                    var result = toString_2.call(O);
                    if (!IsObject(result))
                        return result;
                }
            }
            throw new TypeError();
        }
        // 7.1.2 ToBoolean(argument)
        // https://tc39.github.io/ecma262/2016/#sec-toboolean
        function ToBoolean(argument) {
            return !!argument;
        }
        // 7.1.12 ToString(argument)
        // https://tc39.github.io/ecma262/#sec-tostring
        function ToString(argument) {
            return "" + argument;
        }
        // 7.1.14 ToPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-topropertykey
        function ToPropertyKey(argument) {
            var key = ToPrimitive(argument, 3 /* String */);
            if (IsSymbol(key))
                return key;
            return ToString(key);
        }
        // 7.2 Testing and Comparison Operations
        // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
        // 7.2.2 IsArray(argument)
        // https://tc39.github.io/ecma262/#sec-isarray
        function IsArray(argument) {
            return Array.isArray
                ? Array.isArray(argument)
                : argument instanceof Object
                    ? argument instanceof Array
                    : Object.prototype.toString.call(argument) === "[object Array]";
        }
        // 7.2.3 IsCallable(argument)
        // https://tc39.github.io/ecma262/#sec-iscallable
        function IsCallable(argument) {
            // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
            return typeof argument === "function";
        }
        // 7.2.4 IsConstructor(argument)
        // https://tc39.github.io/ecma262/#sec-isconstructor
        function IsConstructor(argument) {
            // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
            return typeof argument === "function";
        }
        // 7.2.7 IsPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-ispropertykey
        function IsPropertyKey(argument) {
            switch (Type(argument)) {
                case 3 /* String */: return true;
                case 4 /* Symbol */: return true;
                default: return false;
            }
        }
        // 7.3 Operations on Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-objects
        // 7.3.9 GetMethod(V, P)
        // https://tc39.github.io/ecma262/#sec-getmethod
        function GetMethod(V, P) {
            var func = V[P];
            if (func === undefined || func === null)
                return undefined;
            if (!IsCallable(func))
                throw new TypeError();
            return func;
        }
        // 7.4 Operations on Iterator Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
        function GetIterator(obj) {
            var method = GetMethod(obj, iteratorSymbol);
            if (!IsCallable(method))
                throw new TypeError(); // from Call
            var iterator = method.call(obj);
            if (!IsObject(iterator))
                throw new TypeError();
            return iterator;
        }
        // 7.4.4 IteratorValue(iterResult)
        // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
        function IteratorValue(iterResult) {
            return iterResult.value;
        }
        // 7.4.5 IteratorStep(iterator)
        // https://tc39.github.io/ecma262/#sec-iteratorstep
        function IteratorStep(iterator) {
            var result = iterator.next();
            return result.done ? false : result;
        }
        // 7.4.6 IteratorClose(iterator, completion)
        // https://tc39.github.io/ecma262/#sec-iteratorclose
        function IteratorClose(iterator) {
            var f = iterator["return"];
            if (f)
                f.call(iterator);
        }
        // 9.1 Ordinary Object Internal Methods and Internal Slots
        // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
        // 9.1.1.1 OrdinaryGetPrototypeOf(O)
        // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
        function OrdinaryGetPrototypeOf(O) {
            var proto = Object.getPrototypeOf(O);
            if (typeof O !== "function" || O === functionPrototype)
                return proto;
            // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
            // Try to determine the superclass constructor. Compatible implementations
            // must either set __proto__ on a subclass constructor to the superclass constructor,
            // or ensure each class has a valid `constructor` property on its prototype that
            // points back to the constructor.
            // If this is not the same as Function.[[Prototype]], then this is definately inherited.
            // This is the case when in ES6 or when using __proto__ in a compatible browser.
            if (proto !== functionPrototype)
                return proto;
            // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
            var prototype = O.prototype;
            var prototypeProto = prototype && Object.getPrototypeOf(prototype);
            if (prototypeProto == null || prototypeProto === Object.prototype)
                return proto;
            // If the constructor was not a function, then we cannot determine the heritage.
            var constructor = prototypeProto.constructor;
            if (typeof constructor !== "function")
                return proto;
            // If we have some kind of self-reference, then we cannot determine the heritage.
            if (constructor === O)
                return proto;
            // we have a pretty good guess at the heritage.
            return constructor;
        }
        // naive Map shim
        function CreateMapPolyfill() {
            var cacheSentinel = {};
            var arraySentinel = [];
            var MapIterator = (function () {
                function MapIterator(keys, values, selector) {
                    this._index = 0;
                    this._keys = keys;
                    this._values = values;
                    this._selector = selector;
                }
                MapIterator.prototype["@@iterator"] = function () { return this; };
                MapIterator.prototype[iteratorSymbol] = function () { return this; };
                MapIterator.prototype.next = function () {
                    var index = this._index;
                    if (index >= 0 && index < this._keys.length) {
                        var result = this._selector(this._keys[index], this._values[index]);
                        if (index + 1 >= this._keys.length) {
                            this._index = -1;
                            this._keys = arraySentinel;
                            this._values = arraySentinel;
                        }
                        else {
                            this._index++;
                        }
                        return { value: result, done: false };
                    }
                    return { value: undefined, done: true };
                };
                MapIterator.prototype.throw = function (error) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    throw error;
                };
                MapIterator.prototype.return = function (value) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    return { value: value, done: true };
                };
                return MapIterator;
            }());
            return (function () {
                function Map() {
                    this._keys = [];
                    this._values = [];
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                }
                Object.defineProperty(Map.prototype, "size", {
                    get: function () { return this._keys.length; },
                    enumerable: true,
                    configurable: true
                });
                Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
                Map.prototype.get = function (key) {
                    var index = this._find(key, /*insert*/ false);
                    return index >= 0 ? this._values[index] : undefined;
                };
                Map.prototype.set = function (key, value) {
                    var index = this._find(key, /*insert*/ true);
                    this._values[index] = value;
                    return this;
                };
                Map.prototype.delete = function (key) {
                    var index = this._find(key, /*insert*/ false);
                    if (index >= 0) {
                        var size = this._keys.length;
                        for (var i = index + 1; i < size; i++) {
                            this._keys[i - 1] = this._keys[i];
                            this._values[i - 1] = this._values[i];
                        }
                        this._keys.length--;
                        this._values.length--;
                        if (key === this._cacheKey) {
                            this._cacheKey = cacheSentinel;
                            this._cacheIndex = -2;
                        }
                        return true;
                    }
                    return false;
                };
                Map.prototype.clear = function () {
                    this._keys.length = 0;
                    this._values.length = 0;
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                };
                Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
                Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
                Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
                Map.prototype["@@iterator"] = function () { return this.entries(); };
                Map.prototype[iteratorSymbol] = function () { return this.entries(); };
                Map.prototype._find = function (key, insert) {
                    if (this._cacheKey !== key) {
                        this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
                    }
                    if (this._cacheIndex < 0 && insert) {
                        this._cacheIndex = this._keys.length;
                        this._keys.push(key);
                        this._values.push(undefined);
                    }
                    return this._cacheIndex;
                };
                return Map;
            }());
            function getKey(key, _) {
                return key;
            }
            function getValue(_, value) {
                return value;
            }
            function getEntry(key, value) {
                return [key, value];
            }
        }
        // naive Set shim
        function CreateSetPolyfill() {
            return (function () {
                function Set() {
                    this._map = new _Map();
                }
                Object.defineProperty(Set.prototype, "size", {
                    get: function () { return this._map.size; },
                    enumerable: true,
                    configurable: true
                });
                Set.prototype.has = function (value) { return this._map.has(value); };
                Set.prototype.add = function (value) { return this._map.set(value, value), this; };
                Set.prototype.delete = function (value) { return this._map.delete(value); };
                Set.prototype.clear = function () { this._map.clear(); };
                Set.prototype.keys = function () { return this._map.keys(); };
                Set.prototype.values = function () { return this._map.values(); };
                Set.prototype.entries = function () { return this._map.entries(); };
                Set.prototype["@@iterator"] = function () { return this.keys(); };
                Set.prototype[iteratorSymbol] = function () { return this.keys(); };
                return Set;
            }());
        }
        // naive WeakMap shim
        function CreateWeakMapPolyfill() {
            var UUID_SIZE = 16;
            var keys = HashMap.create();
            var rootKey = CreateUniqueKey();
            return (function () {
                function WeakMap() {
                    this._key = CreateUniqueKey();
                }
                WeakMap.prototype.has = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.has(table, this._key) : false;
                };
                WeakMap.prototype.get = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.get(table, this._key) : undefined;
                };
                WeakMap.prototype.set = function (target, value) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ true);
                    table[this._key] = value;
                    return this;
                };
                WeakMap.prototype.delete = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? delete table[this._key] : false;
                };
                WeakMap.prototype.clear = function () {
                    // NOTE: not a real clear, just makes the previous data unreachable
                    this._key = CreateUniqueKey();
                };
                return WeakMap;
            }());
            function CreateUniqueKey() {
                var key;
                do
                    key = "@@WeakMap@@" + CreateUUID();
                while (HashMap.has(keys, key));
                keys[key] = true;
                return key;
            }
            function GetOrCreateWeakMapTable(target, create) {
                if (!hasOwn.call(target, rootKey)) {
                    if (!create)
                        return undefined;
                    Object.defineProperty(target, rootKey, { value: HashMap.create() });
                }
                return target[rootKey];
            }
            function FillRandomBytes(buffer, size) {
                for (var i = 0; i < size; ++i)
                    buffer[i] = Math.random() * 0xff | 0;
                return buffer;
            }
            function GenRandomBytes(size) {
                if (typeof Uint8Array === "function") {
                    if (typeof crypto !== "undefined")
                        return crypto.getRandomValues(new Uint8Array(size));
                    if (typeof msCrypto !== "undefined")
                        return msCrypto.getRandomValues(new Uint8Array(size));
                    return FillRandomBytes(new Uint8Array(size), size);
                }
                return FillRandomBytes(new Array(size), size);
            }
            function CreateUUID() {
                var data = GenRandomBytes(UUID_SIZE);
                // mark as random - RFC 4122 § 4.4
                data[6] = data[6] & 0x4f | 0x40;
                data[8] = data[8] & 0xbf | 0x80;
                var result = "";
                for (var offset = 0; offset < UUID_SIZE; ++offset) {
                    var byte = data[offset];
                    if (offset === 4 || offset === 6 || offset === 8)
                        result += "-";
                    if (byte < 16)
                        result += "0";
                    result += byte.toString(16).toLowerCase();
                }
                return result;
            }
        }
        // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
        function MakeDictionary(obj) {
            obj.__ = undefined;
            delete obj.__;
            return obj;
        }
    });
})(Reflect || (Reflect = {}));
//# sourceMappingURL=Reflect.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("./node_modules/process/browser.js"), __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/uri-js/dist/esnext/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uri__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/uri-js/dist/esnext/uri.js");
/* harmony import */ var _schemes_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/uri-js/dist/esnext/schemes/http.js");
/* harmony import */ var _schemes_https__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/uri-js/dist/esnext/schemes/https.js");
/* harmony import */ var _schemes_mailto__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/uri-js/dist/esnext/schemes/mailto.js");
/* harmony import */ var _schemes_urn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/uri-js/dist/esnext/schemes/urn.js");
/* harmony import */ var _schemes_urn_uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/uri-js/dist/esnext/schemes/urn-uuid.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SCHEMES", function() { return _uri__WEBPACK_IMPORTED_MODULE_0__["SCHEMES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pctEncChar", function() { return _uri__WEBPACK_IMPORTED_MODULE_0__["pctEncChar"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pctDecChars", function() { return _uri__WEBPACK_IMPORTED_MODULE_0__["pctDecChars"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return _uri__WEBPACK_IMPORTED_MODULE_0__["parse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeDotSegments", function() { return _uri__WEBPACK_IMPORTED_MODULE_0__["removeDotSegments"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "serialize", function() { return _uri__WEBPACK_IMPORTED_MODULE_0__["serialize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resolveComponents", function() { return _uri__WEBPACK_IMPORTED_MODULE_0__["resolveComponents"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resolve", function() { return _uri__WEBPACK_IMPORTED_MODULE_0__["resolve"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return _uri__WEBPACK_IMPORTED_MODULE_0__["normalize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "equal", function() { return _uri__WEBPACK_IMPORTED_MODULE_0__["equal"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "escapeComponent", function() { return _uri__WEBPACK_IMPORTED_MODULE_0__["escapeComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unescapeComponent", function() { return _uri__WEBPACK_IMPORTED_MODULE_0__["unescapeComponent"]; });



_uri__WEBPACK_IMPORTED_MODULE_0__["SCHEMES"]["http"] = _schemes_http__WEBPACK_IMPORTED_MODULE_1__["default"];

_uri__WEBPACK_IMPORTED_MODULE_0__["SCHEMES"]["https"] = _schemes_https__WEBPACK_IMPORTED_MODULE_2__["default"];

_uri__WEBPACK_IMPORTED_MODULE_0__["SCHEMES"]["mailto"] = _schemes_mailto__WEBPACK_IMPORTED_MODULE_3__["default"];

_uri__WEBPACK_IMPORTED_MODULE_0__["SCHEMES"]["urn"] = _schemes_urn__WEBPACK_IMPORTED_MODULE_4__["default"];

_uri__WEBPACK_IMPORTED_MODULE_0__["SCHEMES"]["urn:uuid"] = _schemes_urn_uuid__WEBPACK_IMPORTED_MODULE_5__["default"];

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/uri-js/dist/esnext/regexps-iri.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _regexps_uri__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/uri-js/dist/esnext/regexps-uri.js");

/* harmony default export */ __webpack_exports__["default"] = (Object(_regexps_uri__WEBPACK_IMPORTED_MODULE_0__["buildExps"])(true));
//# sourceMappingURL=regexps-iri.js.map

/***/ }),

/***/ "./node_modules/uri-js/dist/esnext/regexps-uri.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildExps", function() { return buildExps; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/uri-js/dist/esnext/util.js");

function buildExps(isIRI) {
    const ALPHA$$ = "[A-Za-z]", CR$ = "[\\x0D]", DIGIT$$ = "[0-9]", DQUOTE$$ = "[\\x22]", HEXDIG$$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["merge"])(DIGIT$$, "[A-Fa-f]"), //case-insensitive
    LF$$ = "[\\x0A]", SP$$ = "[\\x20]", PCT_ENCODED$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("%" + HEXDIG$$ + HEXDIG$$)), //expanded
    GEN_DELIMS$$ = "[\\:\\/\\?\\#\\[\\]\\@]", SUB_DELIMS$$ = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]", RESERVED$$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["merge"])(GEN_DELIMS$$, SUB_DELIMS$$), UCSCHAR$$ = isIRI ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]", //subset, excludes bidi control characters
    IPRIVATE$$ = isIRI ? "[\\uE000-\\uF8FF]" : "[]", //subset
    UNRESERVED$$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["merge"])(ALPHA$$, DIGIT$$, "[\\-\\.\\_\\~]", UCSCHAR$$), SCHEME$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(ALPHA$$ + Object(_util__WEBPACK_IMPORTED_MODULE_0__["merge"])(ALPHA$$, DIGIT$$, "[\\+\\-\\.]") + "*"), USERINFO$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(PCT_ENCODED$ + "|" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["merge"])(UNRESERVED$$, SUB_DELIMS$$, "[\\:]")) + "*"), DEC_OCTET$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("25[0-5]") + "|" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("2[0-4]" + DIGIT$$) + "|" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("1" + DIGIT$$ + DIGIT$$) + "|" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("[1-9]" + DIGIT$$) + "|" + DIGIT$$), IPV4ADDRESS$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(DEC_OCTET$ + "\\." + DEC_OCTET$ + "\\." + DEC_OCTET$ + "\\." + DEC_OCTET$), H16$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(HEXDIG$$ + "{1,4}"), LS32$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(H16$ + "\\:" + H16$) + "|" + IPV4ADDRESS$), IPV6ADDRESS1$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(H16$ + "\\:") + "{6}" + LS32$), //                           6( h16 ":" ) ls32
    IPV6ADDRESS2$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("\\:\\:" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(H16$ + "\\:") + "{5}" + LS32$), //                      "::" 5( h16 ":" ) ls32
    IPV6ADDRESS3$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(H16$) + "?\\:\\:" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(H16$ + "\\:") + "{4}" + LS32$), //[               h16 ] "::" 4( h16 ":" ) ls32
    IPV6ADDRESS4$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(H16$ + "\\:") + "{0,1}" + H16$) + "?\\:\\:" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(H16$ + "\\:") + "{3}" + LS32$), //[ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
    IPV6ADDRESS5$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(H16$ + "\\:") + "{0,2}" + H16$) + "?\\:\\:" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(H16$ + "\\:") + "{2}" + LS32$), //[ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
    IPV6ADDRESS6$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(H16$ + "\\:") + "{0,3}" + H16$) + "?\\:\\:" + H16$ + "\\:" + LS32$), //[ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
    IPV6ADDRESS7$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(H16$ + "\\:") + "{0,4}" + H16$) + "?\\:\\:" + LS32$), //[ *4( h16 ":" ) h16 ] "::"              ls32
    IPV6ADDRESS8$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(H16$ + "\\:") + "{0,5}" + H16$) + "?\\:\\:" + H16$), //[ *5( h16 ":" ) h16 ] "::"              h16
    IPV6ADDRESS9$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(H16$ + "\\:") + "{0,6}" + H16$) + "?\\:\\:"), //[ *6( h16 ":" ) h16 ] "::"
    IPV6ADDRESS$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])([IPV6ADDRESS1$, IPV6ADDRESS2$, IPV6ADDRESS3$, IPV6ADDRESS4$, IPV6ADDRESS5$, IPV6ADDRESS6$, IPV6ADDRESS7$, IPV6ADDRESS8$, IPV6ADDRESS9$].join("|")), IPVFUTURE$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("[vV]" + HEXDIG$$ + "+\\." + Object(_util__WEBPACK_IMPORTED_MODULE_0__["merge"])(UNRESERVED$$, SUB_DELIMS$$, "[\\:]") + "+"), IP_LITERAL$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("\\[" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(IPV6ADDRESS$ + "|" + IPVFUTURE$) + "\\]"), REG_NAME$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(PCT_ENCODED$ + "|" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["merge"])(UNRESERVED$$, SUB_DELIMS$$)) + "*"), HOST$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(IP_LITERAL$ + "|" + IPV4ADDRESS$ + "(?!" + REG_NAME$ + ")" + "|" + REG_NAME$), PORT$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(DIGIT$$ + "*"), AUTHORITY$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(USERINFO$ + "@") + "?" + HOST$ + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("\\:" + PORT$) + "?"), PCHAR$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(PCT_ENCODED$ + "|" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["merge"])(UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@]")), SEGMENT$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(PCHAR$ + "*"), SEGMENT_NZ$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(PCHAR$ + "+"), SEGMENT_NZ_NC$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(PCT_ENCODED$ + "|" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["merge"])(UNRESERVED$$, SUB_DELIMS$$, "[\\@]")) + "+"), PATH_ABEMPTY$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("\\/" + SEGMENT$) + "*"), PATH_ABSOLUTE$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("\\/" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(SEGMENT_NZ$ + PATH_ABEMPTY$) + "?"), //simplified
    PATH_NOSCHEME$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(SEGMENT_NZ_NC$ + PATH_ABEMPTY$), //simplified
    PATH_ROOTLESS$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(SEGMENT_NZ$ + PATH_ABEMPTY$), //simplified
    PATH_EMPTY$ = "(?!" + PCHAR$ + ")", PATH$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$), QUERY$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(PCHAR$ + "|" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["merge"])("[\\/\\?]", IPRIVATE$$)) + "*"), FRAGMENT$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(PCHAR$ + "|[\\/\\?]") + "*"), HIER_PART$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$), URI$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(SCHEME$ + "\\:" + HIER_PART$ + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("\\?" + QUERY$) + "?" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("\\#" + FRAGMENT$) + "?"), RELATIVE_PART$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$), RELATIVE$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(RELATIVE_PART$ + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("\\?" + QUERY$) + "?" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("\\#" + FRAGMENT$) + "?"), URI_REFERENCE$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(URI$ + "|" + RELATIVE$), ABSOLUTE_URI$ = Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(SCHEME$ + "\\:" + HIER_PART$ + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("\\?" + QUERY$) + "?"), GENERIC_REF$ = "^(" + SCHEME$ + ")\\:" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("\\/\\/(" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("\\?(" + QUERY$ + ")") + "?" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("\\#(" + FRAGMENT$ + ")") + "?$", RELATIVE_REF$ = "^(){0}" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("\\/\\/(" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$ + ")") + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("\\?(" + QUERY$ + ")") + "?" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("\\#(" + FRAGMENT$ + ")") + "?$", ABSOLUTE_REF$ = "^(" + SCHEME$ + ")\\:" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("\\/\\/(" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("\\?(" + QUERY$ + ")") + "?$", SAMEDOC_REF$ = "^" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("\\#(" + FRAGMENT$ + ")") + "?$", AUTHORITY_REF$ = "^" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + Object(_util__WEBPACK_IMPORTED_MODULE_0__["subexp"])("\\:(" + PORT$ + ")") + "?$";
    return {
        NOT_SCHEME: new RegExp(Object(_util__WEBPACK_IMPORTED_MODULE_0__["merge"])("[^]", ALPHA$$, DIGIT$$, "[\\+\\-\\.]"), "g"),
        NOT_USERINFO: new RegExp(Object(_util__WEBPACK_IMPORTED_MODULE_0__["merge"])("[^\\%\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_HOST: new RegExp(Object(_util__WEBPACK_IMPORTED_MODULE_0__["merge"])("[^\\%\\[\\]\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_PATH: new RegExp(Object(_util__WEBPACK_IMPORTED_MODULE_0__["merge"])("[^\\%\\/\\:\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_PATH_NOSCHEME: new RegExp(Object(_util__WEBPACK_IMPORTED_MODULE_0__["merge"])("[^\\%\\/\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_QUERY: new RegExp(Object(_util__WEBPACK_IMPORTED_MODULE_0__["merge"])("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]", IPRIVATE$$), "g"),
        NOT_FRAGMENT: new RegExp(Object(_util__WEBPACK_IMPORTED_MODULE_0__["merge"])("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]"), "g"),
        ESCAPE: new RegExp(Object(_util__WEBPACK_IMPORTED_MODULE_0__["merge"])("[^]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        UNRESERVED: new RegExp(UNRESERVED$$, "g"),
        OTHER_CHARS: new RegExp(Object(_util__WEBPACK_IMPORTED_MODULE_0__["merge"])("[^\\%]", UNRESERVED$$, RESERVED$$), "g"),
        PCT_ENCODED: new RegExp(PCT_ENCODED$, "g"),
        IPV6ADDRESS: new RegExp("\\[?(" + IPV6ADDRESS$ + ")\\]?", "g")
    };
}
/* harmony default export */ __webpack_exports__["default"] = (buildExps(false));
//# sourceMappingURL=regexps-uri.js.map

/***/ }),

/***/ "./node_modules/uri-js/dist/esnext/schemes/http.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    scheme: "http",
    domainHost: true,
    parse: function (components, options) {
        //report missing host
        if (!components.host) {
            components.error = components.error || "HTTP URIs must have a host.";
        }
        return components;
    },
    serialize: function (components, options) {
        //normalize the default port
        if (components.port === (String(components.scheme).toLowerCase() !== "https" ? 80 : 443) || components.port === "") {
            components.port = undefined;
        }
        //normalize the empty path
        if (!components.path) {
            components.path = "/";
        }
        //NOTE: We do not parse query strings for HTTP URIs
        //as WWW Form Url Encoded query strings are part of the HTML4+ spec,
        //and not the HTTP spec.
        return components;
    }
});
//# sourceMappingURL=http.js.map

/***/ }),

/***/ "./node_modules/uri-js/dist/esnext/schemes/https.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/uri-js/dist/esnext/schemes/http.js");

/* harmony default export */ __webpack_exports__["default"] = ({
    scheme: "https",
    domainHost: _http__WEBPACK_IMPORTED_MODULE_0__["default"].domainHost,
    parse: _http__WEBPACK_IMPORTED_MODULE_0__["default"].parse,
    serialize: _http__WEBPACK_IMPORTED_MODULE_0__["default"].serialize
});
//# sourceMappingURL=https.js.map

/***/ }),

/***/ "./node_modules/uri-js/dist/esnext/schemes/mailto.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uri__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/uri-js/dist/esnext/uri.js");
/* harmony import */ var punycode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/punycode/punycode.js");
/* harmony import */ var punycode__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(punycode__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/uri-js/dist/esnext/util.js");



const O = {};
const isIRI = true;
//RFC 3986
const UNRESERVED$$ = "[A-Za-z0-9\\-\\.\\_\\~" + (isIRI ? "\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF" : "") + "]";
const HEXDIG$$ = "[0-9A-Fa-f]"; //case-insensitive
const PCT_ENCODED$ = Object(_util__WEBPACK_IMPORTED_MODULE_2__["subexp"])(Object(_util__WEBPACK_IMPORTED_MODULE_2__["subexp"])("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + Object(_util__WEBPACK_IMPORTED_MODULE_2__["subexp"])("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + Object(_util__WEBPACK_IMPORTED_MODULE_2__["subexp"])("%" + HEXDIG$$ + HEXDIG$$)); //expanded
//RFC 5322, except these symbols as per RFC 6068: @ : / ? # [ ] & ; =
//const ATEXT$$ = "[A-Za-z0-9\\!\\#\\$\\%\\&\\'\\*\\+\\-\\/\\=\\?\\^\\_\\`\\{\\|\\}\\~]";
//const WSP$$ = "[\\x20\\x09]";
//const OBS_QTEXT$$ = "[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]";  //(%d1-8 / %d11-12 / %d14-31 / %d127)
//const QTEXT$$ = merge("[\\x21\\x23-\\x5B\\x5D-\\x7E]", OBS_QTEXT$$);  //%d33 / %d35-91 / %d93-126 / obs-qtext
//const VCHAR$$ = "[\\x21-\\x7E]";
//const WSP$$ = "[\\x20\\x09]";
//const OBS_QP$ = subexp("\\\\" + merge("[\\x00\\x0D\\x0A]", OBS_QTEXT$$));  //%d0 / CR / LF / obs-qtext
//const FWS$ = subexp(subexp(WSP$$ + "*" + "\\x0D\\x0A") + "?" + WSP$$ + "+");
//const QUOTED_PAIR$ = subexp(subexp("\\\\" + subexp(VCHAR$$ + "|" + WSP$$)) + "|" + OBS_QP$);
//const QUOTED_STRING$ = subexp('\\"' + subexp(FWS$ + "?" + QCONTENT$) + "*" + FWS$ + "?" + '\\"');
const ATEXT$$ = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]";
const QTEXT$$ = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]";
const VCHAR$$ = Object(_util__WEBPACK_IMPORTED_MODULE_2__["merge"])(QTEXT$$, "[\\\"\\\\]");
const DOT_ATOM_TEXT$ = Object(_util__WEBPACK_IMPORTED_MODULE_2__["subexp"])(ATEXT$$ + "+" + Object(_util__WEBPACK_IMPORTED_MODULE_2__["subexp"])("\\." + ATEXT$$ + "+") + "*");
const QUOTED_PAIR$ = Object(_util__WEBPACK_IMPORTED_MODULE_2__["subexp"])("\\\\" + VCHAR$$);
const QCONTENT$ = Object(_util__WEBPACK_IMPORTED_MODULE_2__["subexp"])(QTEXT$$ + "|" + QUOTED_PAIR$);
const QUOTED_STRING$ = Object(_util__WEBPACK_IMPORTED_MODULE_2__["subexp"])('\\"' + QCONTENT$ + "*" + '\\"');
//RFC 6068
const DTEXT_NO_OBS$$ = "[\\x21-\\x5A\\x5E-\\x7E]"; //%d33-90 / %d94-126
const SOME_DELIMS$$ = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]";
const QCHAR$ = Object(_util__WEBPACK_IMPORTED_MODULE_2__["subexp"])(UNRESERVED$$ + "|" + PCT_ENCODED$ + "|" + SOME_DELIMS$$);
const DOMAIN$ = Object(_util__WEBPACK_IMPORTED_MODULE_2__["subexp"])(DOT_ATOM_TEXT$ + "|" + "\\[" + DTEXT_NO_OBS$$ + "*" + "\\]");
const LOCAL_PART$ = Object(_util__WEBPACK_IMPORTED_MODULE_2__["subexp"])(DOT_ATOM_TEXT$ + "|" + QUOTED_STRING$);
const ADDR_SPEC$ = Object(_util__WEBPACK_IMPORTED_MODULE_2__["subexp"])(LOCAL_PART$ + "\\@" + DOMAIN$);
const TO$ = Object(_util__WEBPACK_IMPORTED_MODULE_2__["subexp"])(ADDR_SPEC$ + Object(_util__WEBPACK_IMPORTED_MODULE_2__["subexp"])("\\," + ADDR_SPEC$) + "*");
const HFNAME$ = Object(_util__WEBPACK_IMPORTED_MODULE_2__["subexp"])(QCHAR$ + "*");
const HFVALUE$ = HFNAME$;
const HFIELD$ = Object(_util__WEBPACK_IMPORTED_MODULE_2__["subexp"])(HFNAME$ + "\\=" + HFVALUE$);
const HFIELDS2$ = Object(_util__WEBPACK_IMPORTED_MODULE_2__["subexp"])(HFIELD$ + Object(_util__WEBPACK_IMPORTED_MODULE_2__["subexp"])("\\&" + HFIELD$) + "*");
const HFIELDS$ = Object(_util__WEBPACK_IMPORTED_MODULE_2__["subexp"])("\\?" + HFIELDS2$);
const MAILTO_URI = new RegExp("^mailto\\:" + TO$ + "?" + HFIELDS$ + "?$");
const UNRESERVED = new RegExp(UNRESERVED$$, "g");
const PCT_ENCODED = new RegExp(PCT_ENCODED$, "g");
const NOT_LOCAL_PART = new RegExp(Object(_util__WEBPACK_IMPORTED_MODULE_2__["merge"])("[^]", ATEXT$$, "[\\.]", '[\\"]', VCHAR$$), "g");
const NOT_DOMAIN = new RegExp(Object(_util__WEBPACK_IMPORTED_MODULE_2__["merge"])("[^]", ATEXT$$, "[\\.]", "[\\[]", DTEXT_NO_OBS$$, "[\\]]"), "g");
const NOT_HFNAME = new RegExp(Object(_util__WEBPACK_IMPORTED_MODULE_2__["merge"])("[^]", UNRESERVED$$, SOME_DELIMS$$), "g");
const NOT_HFVALUE = NOT_HFNAME;
const TO = new RegExp("^" + TO$ + "$");
const HFIELDS = new RegExp("^" + HFIELDS2$ + "$");
function decodeUnreserved(str) {
    const decStr = Object(_uri__WEBPACK_IMPORTED_MODULE_0__["pctDecChars"])(str);
    return (!decStr.match(UNRESERVED) ? str : decStr);
}
/* harmony default export */ __webpack_exports__["default"] = ({
    scheme: "mailto",
    parse: function (components, options) {
        const to = components.to = (components.path ? components.path.split(",") : []);
        components.path = undefined;
        if (components.query) {
            let unknownHeaders = false;
            const headers = {};
            const hfields = components.query.split("&");
            for (let x = 0, xl = hfields.length; x < xl; ++x) {
                const hfield = hfields[x].split("=");
                switch (hfield[0]) {
                    case "to":
                        const toAddrs = hfield[1].split(",");
                        for (let x = 0, xl = toAddrs.length; x < xl; ++x) {
                            to.push(toAddrs[x]);
                        }
                        break;
                    case "subject":
                        components.subject = Object(_uri__WEBPACK_IMPORTED_MODULE_0__["unescapeComponent"])(hfield[1], options);
                        break;
                    case "body":
                        components.body = Object(_uri__WEBPACK_IMPORTED_MODULE_0__["unescapeComponent"])(hfield[1], options);
                        break;
                    default:
                        unknownHeaders = true;
                        headers[Object(_uri__WEBPACK_IMPORTED_MODULE_0__["unescapeComponent"])(hfield[0], options)] = Object(_uri__WEBPACK_IMPORTED_MODULE_0__["unescapeComponent"])(hfield[1], options);
                        break;
                }
            }
            if (unknownHeaders)
                components.headers = headers;
        }
        components.query = undefined;
        for (let x = 0, xl = to.length; x < xl; ++x) {
            const addr = to[x].split("@");
            addr[0] = Object(_uri__WEBPACK_IMPORTED_MODULE_0__["unescapeComponent"])(addr[0]);
            if (!options.unicodeSupport) {
                //convert Unicode IDN -> ASCII IDN
                try {
                    addr[1] = punycode__WEBPACK_IMPORTED_MODULE_1___default.a.toASCII(Object(_uri__WEBPACK_IMPORTED_MODULE_0__["unescapeComponent"])(addr[1], options).toLowerCase());
                }
                catch (e) {
                    components.error = components.error || "Email address's domain name can not be converted to ASCII via punycode: " + e;
                }
            }
            else {
                addr[1] = Object(_uri__WEBPACK_IMPORTED_MODULE_0__["unescapeComponent"])(addr[1], options).toLowerCase();
            }
            to[x] = addr.join("@");
        }
        return components;
    },
    serialize: function (components, options) {
        const to = Object(_util__WEBPACK_IMPORTED_MODULE_2__["toArray"])(components.to);
        if (to) {
            for (let x = 0, xl = to.length; x < xl; ++x) {
                const toAddr = String(to[x]);
                const atIdx = toAddr.lastIndexOf("@");
                const localPart = (toAddr.slice(0, atIdx)).replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, _util__WEBPACK_IMPORTED_MODULE_2__["toUpperCase"]).replace(NOT_LOCAL_PART, _uri__WEBPACK_IMPORTED_MODULE_0__["pctEncChar"]);
                let domain = toAddr.slice(atIdx + 1);
                //convert IDN via punycode
                try {
                    domain = (!options.iri ? punycode__WEBPACK_IMPORTED_MODULE_1___default.a.toASCII(Object(_uri__WEBPACK_IMPORTED_MODULE_0__["unescapeComponent"])(domain, options).toLowerCase()) : punycode__WEBPACK_IMPORTED_MODULE_1___default.a.toUnicode(domain));
                }
                catch (e) {
                    components.error = components.error || "Email address's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
                }
                to[x] = localPart + "@" + domain;
            }
            components.path = to.join(",");
        }
        const headers = components.headers = components.headers || {};
        if (components.subject)
            headers["subject"] = components.subject;
        if (components.body)
            headers["body"] = components.body;
        const fields = [];
        for (const name in headers) {
            if (headers[name] !== O[name]) {
                fields.push(name.replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, _util__WEBPACK_IMPORTED_MODULE_2__["toUpperCase"]).replace(NOT_HFNAME, _uri__WEBPACK_IMPORTED_MODULE_0__["pctEncChar"]) +
                    "=" +
                    headers[name].replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, _util__WEBPACK_IMPORTED_MODULE_2__["toUpperCase"]).replace(NOT_HFVALUE, _uri__WEBPACK_IMPORTED_MODULE_0__["pctEncChar"]));
            }
        }
        if (fields.length) {
            components.query = fields.join("&");
        }
        return components;
    }
});
//# sourceMappingURL=mailto.js.map

/***/ }),

/***/ "./node_modules/uri-js/dist/esnext/schemes/urn-uuid.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uri__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/uri-js/dist/esnext/uri.js");

const UUID = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;
//RFC 4122
/* harmony default export */ __webpack_exports__["default"] = ({
    scheme: "urn:uuid",
    parse: function (components, options) {
        if (!options.tolerant && (!components.path || !components.path.match(UUID))) {
            components.error = components.error || "UUID is not valid.";
        }
        return components;
    },
    serialize: function (components, options) {
        //ensure UUID is valid
        if (!options.tolerant && (!components.path || !components.path.match(UUID))) {
            //invalid UUIDs can not have this scheme
            components.scheme = undefined;
        }
        else {
            //normalize UUID
            components.path = (components.path || "").toLowerCase();
        }
        return _uri__WEBPACK_IMPORTED_MODULE_0__["SCHEMES"]["urn"].serialize(components, options);
    }
});
//# sourceMappingURL=urn-uuid.js.map

/***/ }),

/***/ "./node_modules/uri-js/dist/esnext/schemes/urn.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uri__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/uri-js/dist/esnext/uri.js");

const NID$ = "(?:[0-9A-Za-z][0-9A-Za-z\\-]{1,31})";
const PCT_ENCODED$ = "(?:\\%[0-9A-Fa-f]{2})";
const TRANS$$ = "[0-9A-Za-z\\(\\)\\+\\,\\-\\.\\:\\=\\@\\;\\$\\_\\!\\*\\'\\/\\?\\#]";
const NSS$ = "(?:(?:" + PCT_ENCODED$ + "|" + TRANS$$ + ")+)";
const URN_SCHEME = new RegExp("^urn\\:(" + NID$ + ")$");
const URN_PATH = new RegExp("^(" + NID$ + ")\\:(" + NSS$ + ")$");
const URN_PARSE = /^([^\:]+)\:(.*)/;
const URN_EXCLUDED = /[\x00-\x20\\\"\&\<\>\[\]\^\`\{\|\}\~\x7F-\xFF]/g;
//RFC 2141
/* harmony default export */ __webpack_exports__["default"] = ({
    scheme: "urn",
    parse: function (components, options) {
        const matches = components.path && components.path.match(URN_PARSE);
        if (matches) {
            const scheme = "urn:" + matches[1].toLowerCase();
            let schemeHandler = _uri__WEBPACK_IMPORTED_MODULE_0__["SCHEMES"][scheme];
            //in order to serialize properly,
            //every URN must have a serializer that calls the URN serializer
            if (!schemeHandler) {
                //create fake scheme handler
                schemeHandler = _uri__WEBPACK_IMPORTED_MODULE_0__["SCHEMES"][scheme] = {
                    scheme: scheme,
                    parse: function (components, options) {
                        return components;
                    },
                    serialize: _uri__WEBPACK_IMPORTED_MODULE_0__["SCHEMES"]["urn"].serialize
                };
            }
            components.scheme = scheme;
            components.path = matches[2];
            components = schemeHandler.parse(components, options);
        }
        else {
            components.error = components.error || "URN can not be parsed.";
        }
        return components;
    },
    serialize: function (components, options) {
        const scheme = components.scheme || options.scheme;
        if (scheme && scheme !== "urn") {
            const matches = scheme.match(URN_SCHEME) || ["urn:" + scheme, scheme];
            components.scheme = "urn";
            components.path = matches[1] + ":" + (components.path ? components.path.replace(URN_EXCLUDED, _uri__WEBPACK_IMPORTED_MODULE_0__["pctEncChar"]) : "");
        }
        return components;
    }
});
//# sourceMappingURL=urn.js.map

/***/ }),

/***/ "./node_modules/uri-js/dist/esnext/uri.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCHEMES", function() { return SCHEMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pctEncChar", function() { return pctEncChar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pctDecChars", function() { return pctDecChars; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeDotSegments", function() { return removeDotSegments; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serialize", function() { return serialize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveComponents", function() { return resolveComponents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolve", function() { return resolve; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equal", function() { return equal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escapeComponent", function() { return escapeComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unescapeComponent", function() { return unescapeComponent; });
/* harmony import */ var _regexps_uri__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/uri-js/dist/esnext/regexps-uri.js");
/* harmony import */ var _regexps_iri__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/uri-js/dist/esnext/regexps-iri.js");
/* harmony import */ var punycode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/punycode/punycode.js");
/* harmony import */ var punycode__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(punycode__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/uri-js/dist/esnext/util.js");
/**
 * URI.js
 *
 * @fileoverview An RFC 3986 compliant, scheme extendable URI parsing/validating/resolving library for JavaScript.
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/uri-js
 */
/**
 * Copyright 2011 Gary Court. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 *
 *    1. Redistributions of source code must retain the above copyright notice, this list of
 *       conditions and the following disclaimer.
 *
 *    2. Redistributions in binary form must reproduce the above copyright notice, this list
 *       of conditions and the following disclaimer in the documentation and/or other materials
 *       provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY GARY COURT ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GARY COURT OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of Gary Court.
 */




const SCHEMES = {};
function pctEncChar(chr) {
    const c = chr.charCodeAt(0);
    let e;
    if (c < 16)
        e = "%0" + c.toString(16).toUpperCase();
    else if (c < 128)
        e = "%" + c.toString(16).toUpperCase();
    else if (c < 2048)
        e = "%" + ((c >> 6) | 192).toString(16).toUpperCase() + "%" + ((c & 63) | 128).toString(16).toUpperCase();
    else
        e = "%" + ((c >> 12) | 224).toString(16).toUpperCase() + "%" + (((c >> 6) & 63) | 128).toString(16).toUpperCase() + "%" + ((c & 63) | 128).toString(16).toUpperCase();
    return e;
}
function pctDecChars(str) {
    let newStr = "";
    let i = 0;
    const il = str.length;
    while (i < il) {
        const c = parseInt(str.substr(i + 1, 2), 16);
        if (c < 128) {
            newStr += String.fromCharCode(c);
            i += 3;
        }
        else if (c >= 194 && c < 224) {
            if ((il - i) >= 6) {
                const c2 = parseInt(str.substr(i + 4, 2), 16);
                newStr += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            }
            else {
                newStr += str.substr(i, 6);
            }
            i += 6;
        }
        else if (c >= 224) {
            if ((il - i) >= 9) {
                const c2 = parseInt(str.substr(i + 4, 2), 16);
                const c3 = parseInt(str.substr(i + 7, 2), 16);
                newStr += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            }
            else {
                newStr += str.substr(i, 9);
            }
            i += 9;
        }
        else {
            newStr += str.substr(i, 3);
            i += 3;
        }
    }
    return newStr;
}
function _normalizeComponentEncoding(components, protocol) {
    function decodeUnreserved(str) {
        const decStr = pctDecChars(str);
        return (!decStr.match(protocol.UNRESERVED) ? str : decStr);
    }
    if (components.scheme)
        components.scheme = String(components.scheme).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_SCHEME, "");
    if (components.userinfo !== undefined)
        components.userinfo = String(components.userinfo).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_USERINFO, pctEncChar).replace(protocol.PCT_ENCODED, _util__WEBPACK_IMPORTED_MODULE_3__["toUpperCase"]);
    if (components.host !== undefined)
        components.host = String(components.host).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_HOST, pctEncChar).replace(protocol.PCT_ENCODED, _util__WEBPACK_IMPORTED_MODULE_3__["toUpperCase"]);
    if (components.path !== undefined)
        components.path = String(components.path).replace(protocol.PCT_ENCODED, decodeUnreserved).replace((components.scheme ? protocol.NOT_PATH : protocol.NOT_PATH_NOSCHEME), pctEncChar).replace(protocol.PCT_ENCODED, _util__WEBPACK_IMPORTED_MODULE_3__["toUpperCase"]);
    if (components.query !== undefined)
        components.query = String(components.query).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_QUERY, pctEncChar).replace(protocol.PCT_ENCODED, _util__WEBPACK_IMPORTED_MODULE_3__["toUpperCase"]);
    if (components.fragment !== undefined)
        components.fragment = String(components.fragment).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_FRAGMENT, pctEncChar).replace(protocol.PCT_ENCODED, _util__WEBPACK_IMPORTED_MODULE_3__["toUpperCase"]);
    return components;
}
;
const URI_PARSE = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[\dA-F:.]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
const NO_MATCH_IS_UNDEFINED = ("").match(/(){0}/)[1] === undefined;
function parse(uriString, options = {}) {
    const components = {};
    const protocol = (options.iri !== false ? _regexps_iri__WEBPACK_IMPORTED_MODULE_1__["default"] : _regexps_uri__WEBPACK_IMPORTED_MODULE_0__["default"]);
    if (options.reference === "suffix")
        uriString = (options.scheme ? options.scheme + ":" : "") + "//" + uriString;
    const matches = uriString.match(URI_PARSE);
    if (matches) {
        if (NO_MATCH_IS_UNDEFINED) {
            //store each component
            components.scheme = matches[1];
            components.userinfo = matches[3];
            components.host = matches[4];
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = matches[7];
            components.fragment = matches[8];
            //fix port number
            if (isNaN(components.port)) {
                components.port = matches[5];
            }
        }
        else {
            //store each component
            components.scheme = matches[1] || undefined;
            components.userinfo = (uriString.indexOf("@") !== -1 ? matches[3] : undefined);
            components.host = (uriString.indexOf("//") !== -1 ? matches[4] : undefined);
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = (uriString.indexOf("?") !== -1 ? matches[7] : undefined);
            components.fragment = (uriString.indexOf("#") !== -1 ? matches[8] : undefined);
            //fix port number
            if (isNaN(components.port)) {
                components.port = (uriString.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? matches[4] : undefined);
            }
        }
        //strip brackets from IPv6 hosts
        if (components.host) {
            components.host = components.host.replace(protocol.IPV6ADDRESS, "$1");
        }
        //determine reference type
        if (components.scheme === undefined && components.userinfo === undefined && components.host === undefined && components.port === undefined && !components.path && components.query === undefined) {
            components.reference = "same-document";
        }
        else if (components.scheme === undefined) {
            components.reference = "relative";
        }
        else if (components.fragment === undefined) {
            components.reference = "absolute";
        }
        else {
            components.reference = "uri";
        }
        //check for reference errors
        if (options.reference && options.reference !== "suffix" && options.reference !== components.reference) {
            components.error = components.error || "URI is not a " + options.reference + " reference.";
        }
        //find scheme handler
        const schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
        //check if scheme can't handle IRIs
        if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
            //if host component is a domain name
            if (components.host && (options.domainHost || (schemeHandler && schemeHandler.domainHost))) {
                //convert Unicode IDN -> ASCII IDN
                try {
                    components.host = punycode__WEBPACK_IMPORTED_MODULE_2___default.a.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase());
                }
                catch (e) {
                    components.error = components.error || "Host's domain name can not be converted to ASCII via punycode: " + e;
                }
            }
            //convert IRI -> URI
            _normalizeComponentEncoding(components, _regexps_uri__WEBPACK_IMPORTED_MODULE_0__["default"]);
        }
        else {
            //normalize encodings
            _normalizeComponentEncoding(components, protocol);
        }
        //perform scheme specific parsing
        if (schemeHandler && schemeHandler.parse) {
            schemeHandler.parse(components, options);
        }
    }
    else {
        components.error = components.error || "URI can not be parsed.";
    }
    return components;
}
;
function _recomposeAuthority(components, options) {
    const protocol = (options.iri !== false ? _regexps_iri__WEBPACK_IMPORTED_MODULE_1__["default"] : _regexps_uri__WEBPACK_IMPORTED_MODULE_0__["default"]);
    const uriTokens = [];
    if (components.userinfo !== undefined) {
        uriTokens.push(components.userinfo);
        uriTokens.push("@");
    }
    if (components.host !== undefined) {
        //ensure IPv6 addresses are bracketed
        uriTokens.push(String(components.host).replace(protocol.IPV6ADDRESS, "[$1]"));
    }
    if (typeof components.port === "number") {
        uriTokens.push(":");
        uriTokens.push(components.port.toString(10));
    }
    return uriTokens.length ? uriTokens.join("") : undefined;
}
;
const RDS1 = /^\.\.?\//;
const RDS2 = /^\/\.(\/|$)/;
const RDS3 = /^\/\.\.(\/|$)/;
const RDS4 = /^\.\.?$/;
const RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/;
function removeDotSegments(input) {
    const output = [];
    while (input.length) {
        if (input.match(RDS1)) {
            input = input.replace(RDS1, "");
        }
        else if (input.match(RDS2)) {
            input = input.replace(RDS2, "/");
        }
        else if (input.match(RDS3)) {
            input = input.replace(RDS3, "/");
            output.pop();
        }
        else if (input === "." || input === "..") {
            input = "";
        }
        else {
            const im = input.match(RDS5);
            if (im) {
                const s = im[0];
                input = input.slice(s.length);
                output.push(s);
            }
            else {
                throw new Error("Unexpected dot segment condition");
            }
        }
    }
    return output.join("");
}
;
function serialize(components, options = {}) {
    const protocol = (options.iri ? _regexps_iri__WEBPACK_IMPORTED_MODULE_1__["default"] : _regexps_uri__WEBPACK_IMPORTED_MODULE_0__["default"]);
    const uriTokens = [];
    //find scheme handler
    const schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
    //perform scheme specific serialization
    if (schemeHandler && schemeHandler.serialize)
        schemeHandler.serialize(components, options);
    if (components.host) {
        //if host component is an IPv6 address
        if (protocol.IPV6ADDRESS.test(components.host)) {
            //TODO: normalize IPv6 address as per RFC 5952
        }
        else if (options.domainHost || (schemeHandler && schemeHandler.domainHost)) {
            //convert IDN via punycode
            try {
                components.host = (!options.iri ? punycode__WEBPACK_IMPORTED_MODULE_2___default.a.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase()) : punycode__WEBPACK_IMPORTED_MODULE_2___default.a.toUnicode(components.host));
            }
            catch (e) {
                components.error = components.error || "Host's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
            }
        }
    }
    //normalize encoding
    _normalizeComponentEncoding(components, protocol);
    if (options.reference !== "suffix" && components.scheme) {
        uriTokens.push(components.scheme);
        uriTokens.push(":");
    }
    const authority = _recomposeAuthority(components, options);
    if (authority !== undefined) {
        if (options.reference !== "suffix") {
            uriTokens.push("//");
        }
        uriTokens.push(authority);
        if (components.path && components.path.charAt(0) !== "/") {
            uriTokens.push("/");
        }
    }
    if (components.path !== undefined) {
        let s = components.path;
        if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
            s = removeDotSegments(s);
        }
        if (authority === undefined) {
            s = s.replace(/^\/\//, "/%2F"); //don't allow the path to start with "//"
        }
        uriTokens.push(s);
    }
    if (components.query !== undefined) {
        uriTokens.push("?");
        uriTokens.push(components.query);
    }
    if (components.fragment !== undefined) {
        uriTokens.push("#");
        uriTokens.push(components.fragment);
    }
    return uriTokens.join(""); //merge tokens into a string
}
;
function resolveComponents(base, relative, options = {}, skipNormalization) {
    const target = {};
    if (!skipNormalization) {
        base = parse(serialize(base, options), options); //normalize base components
        relative = parse(serialize(relative, options), options); //normalize relative components
    }
    options = options || {};
    if (!options.tolerant && relative.scheme) {
        target.scheme = relative.scheme;
        //target.authority = relative.authority;
        target.userinfo = relative.userinfo;
        target.host = relative.host;
        target.port = relative.port;
        target.path = removeDotSegments(relative.path || "");
        target.query = relative.query;
    }
    else {
        if (relative.userinfo !== undefined || relative.host !== undefined || relative.port !== undefined) {
            //target.authority = relative.authority;
            target.userinfo = relative.userinfo;
            target.host = relative.host;
            target.port = relative.port;
            target.path = removeDotSegments(relative.path || "");
            target.query = relative.query;
        }
        else {
            if (!relative.path) {
                target.path = base.path;
                if (relative.query !== undefined) {
                    target.query = relative.query;
                }
                else {
                    target.query = base.query;
                }
            }
            else {
                if (relative.path.charAt(0) === "/") {
                    target.path = removeDotSegments(relative.path);
                }
                else {
                    if ((base.userinfo !== undefined || base.host !== undefined || base.port !== undefined) && !base.path) {
                        target.path = "/" + relative.path;
                    }
                    else if (!base.path) {
                        target.path = relative.path;
                    }
                    else {
                        target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative.path;
                    }
                    target.path = removeDotSegments(target.path);
                }
                target.query = relative.query;
            }
            //target.authority = base.authority;
            target.userinfo = base.userinfo;
            target.host = base.host;
            target.port = base.port;
        }
        target.scheme = base.scheme;
    }
    target.fragment = relative.fragment;
    return target;
}
;
function resolve(baseURI, relativeURI, options) {
    return serialize(resolveComponents(parse(baseURI, options), parse(relativeURI, options), options, true), options);
}
;
function normalize(uri, options) {
    if (typeof uri === "string") {
        uri = serialize(parse(uri, options), options);
    }
    else if (Object(_util__WEBPACK_IMPORTED_MODULE_3__["typeOf"])(uri) === "object") {
        uri = parse(serialize(uri, options), options);
    }
    return uri;
}
;
function equal(uriA, uriB, options) {
    if (typeof uriA === "string") {
        uriA = serialize(parse(uriA, options), options);
    }
    else if (Object(_util__WEBPACK_IMPORTED_MODULE_3__["typeOf"])(uriA) === "object") {
        uriA = serialize(uriA, options);
    }
    if (typeof uriB === "string") {
        uriB = serialize(parse(uriB, options), options);
    }
    else if (Object(_util__WEBPACK_IMPORTED_MODULE_3__["typeOf"])(uriB) === "object") {
        uriB = serialize(uriB, options);
    }
    return uriA === uriB;
}
;
function escapeComponent(str, options) {
    return str && str.toString().replace((!options || !options.iri ? _regexps_uri__WEBPACK_IMPORTED_MODULE_0__["default"].ESCAPE : _regexps_iri__WEBPACK_IMPORTED_MODULE_1__["default"].ESCAPE), pctEncChar);
}
;
function unescapeComponent(str, options) {
    return str && str.toString().replace((!options || !options.iri ? _regexps_uri__WEBPACK_IMPORTED_MODULE_0__["default"].PCT_ENCODED : _regexps_iri__WEBPACK_IMPORTED_MODULE_1__["default"].PCT_ENCODED), pctDecChars);
}
;
//# sourceMappingURL=uri.js.map

/***/ }),

/***/ "./node_modules/uri-js/dist/esnext/util.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return merge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subexp", function() { return subexp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "typeOf", function() { return typeOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toUpperCase", function() { return toUpperCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toArray", function() { return toArray; });
function merge(...sets) {
    if (sets.length > 1) {
        sets[0] = sets[0].slice(0, -1);
        const xl = sets.length - 1;
        for (let x = 1; x < xl; ++x) {
            sets[x] = sets[x].slice(1, -1);
        }
        sets[xl] = sets[xl].slice(1);
        return sets.join('');
    }
    else {
        return sets[0];
    }
}
function subexp(str) {
    return "(?:" + str + ")";
}
function typeOf(o) {
    return o === undefined ? "undefined" : (o === null ? "null" : Object.prototype.toString.call(o).split(" ").pop().split("]").shift().toLowerCase());
}
function toUpperCase(str) {
    return str.toUpperCase();
}
function toArray(obj) {
    return obj !== undefined && obj !== null ? (obj instanceof Array ? obj : (typeof obj.length !== "number" || obj.split || obj.setInterval || obj.call ? [obj] : Array.prototype.slice.call(obj))) : [];
}
//# sourceMappingURL=util.js.map

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/client/ButtplugBrowserWebsocketConnector.ts":
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
const events_1 = __webpack_require__("./node_modules/events/events.js");
const MessageUtils_1 = __webpack_require__("./src/core/MessageUtils.ts");
class ButtplugBrowserWebsocketConnector extends events_1.EventEmitter {
    constructor(_url) {
        super();
        this._url = _url;
        this.Connect = () => __awaiter(this, void 0, void 0, function* () {
            const ws = new WebSocket(this._url);
            let res;
            let rej;
            const p = new Promise((resolve, reject) => { res = resolve; rej = reject; });
            // In websockets, our error rarely tells us much, as for security reasons
            // browsers usually only throw Error Code 1006. It's up to those using this
            // library to state what the problem might be.
            const conErrorCallback = (ev) => rej();
            ws.addEventListener("open", (ev) => __awaiter(this, void 0, void 0, function* () {
                this._ws = ws;
                this._ws.addEventListener("message", (aMsg) => { this.ParseIncomingMessage(aMsg); });
                this._ws.removeEventListener("close", conErrorCallback);
                this._ws.addEventListener("close", this.Disconnect);
                res();
            }));
            ws.addEventListener("close", conErrorCallback);
            return p;
        });
        this.Disconnect = () => {
            if (!this.Connected) {
                return;
            }
            this._ws.close();
            this._ws = undefined;
            this.emit("disconnect");
        };
        this.Send = (aMsg) => {
            if (!this.Connected) {
                throw new Error("ButtplugClient not connected");
            }
            this._ws.send("[" + aMsg.toJSON() + "]");
        };
        this.ParseIncomingMessage = (aEvent) => {
            if (typeof (aEvent.data) === "string") {
                const msgs = MessageUtils_1.FromJSON(aEvent.data);
                this.emit("message", msgs);
            }
            else if (aEvent.data instanceof Blob) {
                const reader = new FileReader();
                reader.addEventListener("load", (ev) => { this.OnReaderLoad(ev); });
                reader.readAsText(aEvent.data);
            }
        };
    }
    get Connected() {
        return this._ws !== undefined;
    }
    OnReaderLoad(aEvent) {
        const msgs = MessageUtils_1.FromJSON(aEvent.target.result);
        this.emit("message", msgs);
    }
}
exports.ButtplugBrowserWebsocketConnector = ButtplugBrowserWebsocketConnector;


/***/ }),

/***/ "./src/client/ButtplugEmbeddedServerConnector.ts":
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
const events_1 = __webpack_require__("./node_modules/events/events.js");
const ButtplugServer_1 = __webpack_require__("./src/server/ButtplugServer.ts");
class ButtplugEmbeddedServerConnector extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this._connected = false;
        this._server = null;
        this.Connect = () => __awaiter(this, void 0, void 0, function* () {
            this._connected = true;
            if (this._server === null) {
                this._server = new ButtplugServer_1.ButtplugServer();
            }
            this._server.addListener("message", this.OnMessageReceived);
            return Promise.resolve();
        });
        this.Disconnect = () => {
            if (!this._connected) {
                return;
            }
            this._server.Shutdown();
            this._connected = false;
            this._server = null;
            this.emit("disconnect");
        };
        this.Send = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            if (!this._connected) {
                throw new Error("ButtplugClient not connected");
            }
            const returnMsg = yield this._server.SendMessage(aMsg);
            this.emit("message", [returnMsg]);
        });
        this.OnMessageReceived = (aMsg) => {
            this.emit("message", [aMsg]);
        };
    }
    set Server(server) {
        this._server = server;
    }
    get Server() {
        return this._server;
    }
    get Connected() {
        return this._connected;
    }
}
exports.ButtplugEmbeddedServerConnector = ButtplugEmbeddedServerConnector;


/***/ }),

/***/ "./src/client/Client.ts":
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
const Logging_1 = __webpack_require__("./src/core/Logging.ts");
const events_1 = __webpack_require__("./node_modules/events/events.js");
const Device_1 = __webpack_require__("./src/core/Device.ts");
const ButtplugBrowserWebsocketConnector_1 = __webpack_require__("./src/client/ButtplugBrowserWebsocketConnector.ts");
const ButtplugEmbeddedServerConnector_1 = __webpack_require__("./src/client/ButtplugEmbeddedServerConnector.ts");
const Messages = __webpack_require__("./src/core/Messages.ts");
const MessageUtils_1 = __webpack_require__("./src/core/MessageUtils.ts");
class ButtplugClient extends events_1.EventEmitter {
    constructor(aClientName = "Generic Buttplug Client") {
        super();
        this._pingTimer = null;
        this._connector = null;
        this._devices = new Map();
        this._counter = 1;
        this._waitingMsgs = new Map();
        this._logger = Logging_1.ButtplugLogger.Logger;
        // TODO This should be set on schema load
        this._messageVersion = 1;
        this.ConnectWebsocket = (aAddress) => __awaiter(this, void 0, void 0, function* () {
            this._logger.Info(`ButtplugClient: Connecting to ${aAddress}`);
            yield this.Connect(new ButtplugBrowserWebsocketConnector_1.ButtplugBrowserWebsocketConnector(aAddress));
        });
        this.ConnectLocal = () => __awaiter(this, void 0, void 0, function* () {
            this._logger.Info(`ButtplugClient: Connecting to In-Browser Server`);
            yield this.Connect(new ButtplugEmbeddedServerConnector_1.ButtplugEmbeddedServerConnector());
        });
        this.Connect = (aConnector) => __awaiter(this, void 0, void 0, function* () {
            this._logger.Info(`ButtplugClient: Connecting using ${aConnector.constructor.name}`);
            yield aConnector.Connect();
            this._connector = aConnector;
            this._connector.addListener("message", this.ParseMessages);
            this._connector.addListener("disconnect", this.DisconnectHandler);
            yield this.InitializeConnection();
        });
        this.Disconnect = () => __awaiter(this, void 0, void 0, function* () {
            this._logger.Debug(`ButtplugClient: Disconnect called`);
            this.CheckConnector();
            yield this.ShutdownConnection();
            this._connector.Disconnect();
        });
        this.StartScanning = () => __awaiter(this, void 0, void 0, function* () {
            this._logger.Debug(`ButtplugClient: StartScanning called`);
            return yield this.SendMsgExpectOk(new Messages.StartScanning());
        });
        this.StopScanning = () => __awaiter(this, void 0, void 0, function* () {
            this._logger.Debug(`ButtplugClient: StopScanning called`);
            return yield this.SendMsgExpectOk(new Messages.StopScanning());
        });
        this.RequestLog = (aLogLevel) => __awaiter(this, void 0, void 0, function* () {
            this._logger.Debug(`ButtplugClient: RequestLog called with level ${aLogLevel}`);
            return yield this.SendMsgExpectOk(new Messages.RequestLog(aLogLevel));
        });
        this.StopAllDevices = () => __awaiter(this, void 0, void 0, function* () {
            this._logger.Debug(`ButtplugClient: StopAllDevices`);
            return yield this.SendMsgExpectOk(new Messages.StopAllDevices());
        });
        this.ParseMessages = (aMsgs) => {
            this.ParseMessagesInternal(aMsgs);
        };
        this.DisconnectHandler = () => {
            this._logger.Info(`ButtplugClient: Disconnect event receieved.`);
            this.emit("disconnect");
        };
        this.InitializeConnection = () => __awaiter(this, void 0, void 0, function* () {
            this.CheckConnector();
            const msg = yield this.SendMessage(new Messages.RequestServerInfo(this._clientName, 1));
            switch (msg.Type) {
                case "ServerInfo": {
                    const serverinfo = msg;
                    this._logger.Info(`ButtplugClient: Connected to Server ${serverinfo.ServerName}`);
                    // TODO: maybe store server name, do something with message template version?
                    const ping = serverinfo.MaxPingTime;
                    if (serverinfo.MessageVersion < this._messageVersion) {
                        // Disconnect and throw an exception explaining the version mismatch problem.
                        this._connector.Disconnect();
                        throw new Error("Server protocol version is older than client protocol version. Please update server.");
                    }
                    if (ping > 0) {
                        this._pingTimer = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                            // If we've disconnected, stop trying to ping the server.
                            if (!this.Connected) {
                                yield this.ShutdownConnection();
                                return;
                            }
                            this.SendMessage(new Messages.Ping(this._counter));
                        }), Math.round(ping / 2));
                    }
                    yield this.RequestDeviceList();
                    return true;
                }
                case "Error": {
                    const err = msg;
                    this._logger.Error(`ButtplugClient: Cannot connect to server. ${err.ErrorMessage}`);
                    // Disconnect and throw an exception with the error message we got back.
                    // This will usually only error out if we have a version mismatch that the
                    // server has detected.
                    this._connector.Disconnect();
                    throw new Error(msg.ErrorMessage);
                }
            }
            return false;
        });
        this.RequestDeviceList = () => __awaiter(this, void 0, void 0, function* () {
            this.CheckConnector();
            this._logger.Debug(`ButtplugClient: ReceiveDeviceList called`);
            const deviceList = (yield this.SendMessage(new Messages.RequestDeviceList()));
            deviceList.Devices.forEach((d) => {
                if (!this._devices.has(d.DeviceIndex)) {
                    const device = Device_1.Device.fromMsg(d);
                    this._logger.Debug(`ButtplugClient: Adding Device: ${device}`);
                    this._devices.set(d.DeviceIndex, device);
                    this.emit("deviceadded", device);
                }
                else {
                    this._logger.Debug(`ButtplugClient: Device already added: ${d}`);
                }
            });
        });
        this.ShutdownConnection = () => __awaiter(this, void 0, void 0, function* () {
            yield this.StopAllDevices();
            if (this._pingTimer !== null) {
                clearInterval(this._pingTimer);
                this._pingTimer = null;
            }
        });
        this.SendMsgExpectOk = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            let res;
            let rej;
            const msg = yield this.SendMessage(aMsg);
            const p = new Promise((resolve, reject) => { res = resolve; rej = reject; });
            switch (msg.Type) {
                case "Ok":
                    res();
                    break;
                default:
                    rej(msg);
                    break;
            }
            return p;
        });
        this._clientName = aClientName;
        this._logger.Debug(`ButtplugClient: Client ${aClientName} created.`);
    }
    get Connector() {
        return this._connector;
    }
    get Connected() {
        return this._connector !== null && this._connector.Connected;
    }
    get Devices() {
        // While this function doesn't actually send a message, if we don't have a
        // connector, we shouldn't have devices.
        this.CheckConnector();
        const devices = [];
        this._devices.forEach((d, i) => {
            devices.push(d);
        });
        return devices;
    }
    SendDeviceMessage(aDevice, aDeviceMsg) {
        return __awaiter(this, void 0, void 0, function* () {
            this.CheckConnector();
            const dev = this._devices.get(aDevice.Index);
            if (dev === undefined) {
                this._logger.Error(`Device ${aDevice.Index} not available.`);
                return Promise.reject(new Error("Device not available."));
            }
            if (dev.AllowedMessages.indexOf(aDeviceMsg.Type) === -1) {
                this._logger.Error(`Device ${aDevice.Name} does not accept message type ${aDeviceMsg.Type}.`);
                return Promise.reject(new Error(`Device ${aDevice.Name} does not accept message type ${aDeviceMsg.Type}.`));
            }
            aDeviceMsg.DeviceIndex = aDevice.Index;
            return yield this.SendMsgExpectOk(aDeviceMsg);
        });
    }
    ParseMessagesInternal(aMsgs) {
        for (const x of aMsgs) {
            if (x.Id > 0 && this._waitingMsgs.has(x.Id)) {
                const res = this._waitingMsgs.get(x.Id);
                res(x);
                return;
            }
            switch (x.Type) {
                case "Log":
                    this.emit("log", x);
                    break;
                case "DeviceAdded":
                    const addedMsg = x;
                    const addedDevice = Device_1.Device.fromMsg(addedMsg);
                    this._devices.set(addedMsg.DeviceIndex, addedDevice);
                    this.emit("deviceadded", addedDevice);
                    break;
                case "DeviceRemoved":
                    const removedMsg = x;
                    if (this._devices.has(removedMsg.DeviceIndex)) {
                        const removedDevice = this._devices.get(removedMsg.DeviceIndex);
                        this._devices.delete(removedMsg.DeviceIndex);
                        this.emit("deviceremoved", removedDevice);
                    }
                    break;
                case "ScanningFinished":
                    this.emit("scanningfinished", x);
                    break;
            }
        }
    }
    SendMessage(aMsg) {
        return __awaiter(this, void 0, void 0, function* () {
            this.CheckConnector();
            // This will throw if our message is invalid
            MessageUtils_1.CheckMessage(aMsg);
            let res;
            aMsg.Id = this._counter;
            const msgPromise = new Promise((resolve) => { res = resolve; });
            this._waitingMsgs.set(this._counter, res);
            this._counter += 1;
            this._connector.Send(aMsg);
            return yield msgPromise;
        });
    }
    CheckConnector() {
        if (!this.Connected) {
            throw new Error("ButtplugClient not connected");
        }
    }
}
exports.ButtplugClient = ButtplugClient;


/***/ }),

/***/ "./src/client/IButtplugConnector.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/core/Device.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents an abstract device, capable of taking certain kinds of messages.
 */
class Device {
    /**
     * @param _index Index of the device, as created by the device manager.
     * @param _name Name of the device.
     * @param _allowedMsgs Buttplug messages the device can receive.
     */
    constructor(index, name, allowedMsgsObj) {
        this.index = index;
        this.name = name;
        // Map of messages and their attributes (feature count, etc...)
        this.allowedMsgs = new Map();
        for (const k of Object.keys(allowedMsgsObj)) {
            this.allowedMsgs.set(k, allowedMsgsObj[k]);
        }
    }
    static fromMsg(aMsg) {
        return new Device(aMsg.DeviceIndex, aMsg.DeviceName, aMsg.DeviceMessages);
    }
    /**
     * Return the name of the device.
     */
    get Name() {
        return this.name;
    }
    /**
     * Return the index of the device.
     */
    get Index() {
        return this.index;
    }
    /**
     * Return a list of message types the device accepts.
     */
    get AllowedMessages() {
        return Array.from(this.allowedMsgs.keys());
    }
    /**
     * Return the message attributes related to the given message
     */
    MessageAttributes(messageName) {
        if (this.AllowedMessages.indexOf(messageName) === -1) {
            throw new Error(`Message ${messageName} does not exist on device ${this.name}`);
        }
        return this.allowedMsgs.get(messageName);
    }
}
exports.Device = Device;


/***/ }),

/***/ "./src/core/Logging.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __webpack_require__("./node_modules/events/events.js");
const Messages = __webpack_require__("./src/core/Messages.ts");
/**
 * Enumeration of log levels for LogMessage message types. Log levels must match
 * order and name specified in LogMessage portion of the Buttplug protocol spec.
 */
var ButtplugLogLevel;
(function (ButtplugLogLevel) {
    ButtplugLogLevel[ButtplugLogLevel["Off"] = 0] = "Off";
    ButtplugLogLevel[ButtplugLogLevel["Fatal"] = 1] = "Fatal";
    ButtplugLogLevel[ButtplugLogLevel["Error"] = 2] = "Error";
    ButtplugLogLevel[ButtplugLogLevel["Warn"] = 3] = "Warn";
    ButtplugLogLevel[ButtplugLogLevel["Info"] = 4] = "Info";
    ButtplugLogLevel[ButtplugLogLevel["Debug"] = 5] = "Debug";
    ButtplugLogLevel[ButtplugLogLevel["Trace"] = 6] = "Trace";
})(ButtplugLogLevel = exports.ButtplugLogLevel || (exports.ButtplugLogLevel = {}));
/**
 * Representation of log messages for the internal logging utility.
 */
class LogMessage {
    /**
     * @param logMessage Log message.
     * @param logLevel: Log severity level.
     */
    constructor(logMessage, logLevel) {
        const a = new Date();
        const hour = a.getHours();
        const min = a.getMinutes();
        const sec = a.getSeconds();
        this.timestamp = `${hour}:${min}:${sec}`;
        this.logMessage = logMessage;
        this.logLevel = logLevel;
    }
    /**
     * Returns the log message.
     */
    get Message() {
        return this.logMessage;
    }
    /**
     * Returns the log message level.
     */
    get LogLevel() {
        return this.logLevel;
    }
    /**
     * Returns the log message timestamp.
     */
    get Timestamp() {
        return this.timestamp;
    }
    /**
     * Returns a formatted string with timestamp, level, and message.
     */
    get FormattedMessage() {
        return `${ButtplugLogLevel[this.logLevel]} : ${this.timestamp} : ${this.logMessage}`;
    }
}
exports.LogMessage = LogMessage;
/**
 * Simple, global logging utility for the Buttplug client and server. Keeps an
 * internal static reference to an instance of itself (singleton pattern,
 * basically), and allows message logging throughout the module.
 */
class ButtplugLogger extends events_1.EventEmitter {
    /**
     * Constructor. Can only be called internally since we regulate ButtplugLogger
     * ownership.
     */
    constructor() {
        super();
        /** Sets maximum log level to log to console */
        this.maximumConsoleLogLevel = ButtplugLogLevel.Off;
        /** Sets maximum log level for all log messages */
        this.maximumEventLogLevel = ButtplugLogLevel.Off;
    }
    /**
     * Returns the stored static instance of the logger, creating one if it
     * doesn't currently exist.
     */
    static get Logger() {
        if (ButtplugLogger.sLogger === undefined) {
            ButtplugLogger.sLogger = new ButtplugLogger();
        }
        return this.sLogger;
    }
    /**
     * Set the maximum log level to output to console.
     */
    get MaximumConsoleLogLevel() {
        return this.maximumConsoleLogLevel;
    }
    /**
     * Get the maximum log level to output to console.
     */
    set MaximumConsoleLogLevel(aButtplugLogLevel) {
        this.maximumConsoleLogLevel = aButtplugLogLevel;
    }
    /**
     * Set the global maximum log level
     */
    get MaximumEventLogLevel() {
        return this.maximumEventLogLevel;
    }
    /**
     * Get the global maximum log level
     */
    set MaximumEventLogLevel(aLogLevel) {
        this.maximumEventLogLevel = aLogLevel;
    }
    /**
     * Log a message, then create a Error buttplug message with the log message.
     * Used when an operation has errored out and status needs to be both logged
     * and returned to the client as an Error Message type.
     */
    LogAndError(aMsg, aErrorClass, aMsgId) {
        this.Error(aMsg);
        return new Messages.Error(aMsg, aErrorClass, aMsgId);
    }
    /**
     * Log new message at Fatal level.
     */
    Fatal(aMsg) {
        this.AddLogMessage(aMsg, ButtplugLogLevel.Fatal);
    }
    /**
     * Log new message at Error level.
     */
    Error(aMsg) {
        this.AddLogMessage(aMsg, ButtplugLogLevel.Error);
    }
    /**
     * Log new message at Warn level.
     */
    Warn(aMsg) {
        this.AddLogMessage(aMsg, ButtplugLogLevel.Warn);
    }
    /**
     * Log new message at Info level.
     */
    Info(aMsg) {
        this.AddLogMessage(aMsg, ButtplugLogLevel.Info);
    }
    /**
     * Log new message at Debug level.
     */
    Debug(aMsg) {
        this.AddLogMessage(aMsg, ButtplugLogLevel.Debug);
    }
    /**
     * Log new message at Trace level.
     */
    Trace(aMsg) {
        this.AddLogMessage(aMsg, ButtplugLogLevel.Trace);
    }
    /**
     * Checks to see if message should be logged, and if so, adds message to the
     * log buffer. May also print message and emit event.
     */
    AddLogMessage(aMsg, aLevel) {
        // If nothing wants the log message we have, ignore it.
        if (aLevel > this.maximumEventLogLevel && aLevel > this.maximumConsoleLogLevel) {
            return;
        }
        const msg = new LogMessage(aMsg, aLevel);
        // Clients and console logging may have different needs. For instance, it
        // could be that the client requests trace level, while all we want in the
        // console is info level. This makes sure the client can't also spam the
        // console.
        if (aLevel <= this.maximumConsoleLogLevel) {
            console.log(msg.FormattedMessage);
        }
        if (aLevel <= this.maximumEventLogLevel) {
            this.emit("log", msg);
        }
    }
}
/** Singleton instance for the logger */
ButtplugLogger.sLogger = undefined;
exports.ButtplugLogger = ButtplugLogger;


/***/ }),

/***/ "./src/core/MessageUtils.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = __webpack_require__("./node_modules/class-transformer/index.js");
const ajv = __webpack_require__("./node_modules/ajv/lib/ajv.js");
const Messages = __webpack_require__("./src/core/Messages.ts");
const buttplugSchema = __webpack_require__("./dependencies/buttplug-schema/schema/buttplug-schema.json");
// Since we're still using the draft 06 schema, we now have to specifically add
// it to ajv, which defaults to 7.
const validator = new ajv();
validator.addMetaSchema(__webpack_require__("./node_modules/ajv/lib/refs/json-schema-draft-06.json"));
const jsonValidator = validator.compile(buttplugSchema);
function CheckMessage(aMsgObj) {
    if (jsonValidator([aMsgObj.toProtocolFormat()])) {
        return;
    }
    // Relay validator errors as an error message locally.
    const errorString = jsonValidator.errors.map((error) => error.message).join("; ");
    throw new Error(errorString);
}
exports.CheckMessage = CheckMessage;
function FromJSON(str) {
    const msgarray = JSON.parse(str);
    if (!jsonValidator(msgarray)) {
        // Relay validator errors as an error message locally.
        const errorString = jsonValidator.errors.map((error) => error.message).join("; ");
        return [new Messages.Error(errorString, Messages.ErrorClass.ERROR_MSG, 0)];
    }
    const msgs = [];
    for (const x of Array.from(msgarray)) {
        // Can't get this to resolve nicely as a type, so just start from any and cast
        // after. Not sure how to resolve plainToClass to a type since this is
        // dynamic.
        const msg = class_transformer_1.plainToClass(Messages[Object.getOwnPropertyNames(x)[0]], x[Object.getOwnPropertyNames(x)[0]]);
        msgs.push(msg);
    }
    return msgs;
}
exports.FromJSON = FromJSON;
function GetSchemaVersion() {
    return parseInt(buttplugSchema.version, 10);
}
exports.GetSchemaVersion = GetSchemaVersion;
function CreateSimpleVibrateCmd(device, speed) {
    if (device.AllowedMessages.indexOf("VibrateCmd") === -1) {
        throw new Error("Device does not handle VibrateCmd!");
    }
    const commands = [];
    for (let i = 0; i < device.MessageAttributes("VibrateCmd").FeatureCount; ++i) {
        commands.push(new Messages.SpeedSubcommand(i, speed));
    }
    return new Messages.VibrateCmd(commands);
}
exports.CreateSimpleVibrateCmd = CreateSimpleVibrateCmd;
function CreateSimpleLinearCmd(device, position, duration) {
    if (device.AllowedMessages.indexOf("LinearCmd") === -1) {
        throw new Error("Device does not handle LinearCmd!");
    }
    const commands = [];
    for (let i = 0; i < device.MessageAttributes("LinearCmd").FeatureCount; ++i) {
        commands.push(new Messages.VectorSubcommand(i, position, duration));
    }
    return new Messages.LinearCmd(commands);
}
exports.CreateSimpleLinearCmd = CreateSimpleLinearCmd;
function CreateSimpleRotateCmd(device, speed, clockwise) {
    if (device.AllowedMessages.indexOf("RotateCmd") === -1) {
        throw new Error("Device does not handle RotateCmd!");
    }
    const commands = [];
    for (let i = 0; i < device.MessageAttributes("RotateCmd").FeatureCount; ++i) {
        commands.push(new Messages.RotateSubcommand(i, speed, clockwise));
    }
    return new Messages.RotateCmd(commands);
}
exports.CreateSimpleRotateCmd = CreateSimpleRotateCmd;


/***/ }),

/***/ "./src/core/Messages.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// tslint:disable:max-classes-per-file

Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = __webpack_require__("./node_modules/class-transformer/index.js");
__webpack_require__("./node_modules/reflect-metadata/Reflect.js");
class ButtplugMessage {
    constructor(Id) {
        this.Id = Id;
    }
    DowngradeMessage() {
        return new Error("Message version downgrade required, but not defined for this message type.", ErrorClass.ERROR_MSG, this.Id);
    }
    /***
     * Returns the message type name
     *
     * Usually, the message type name will be the same as the message class
     * constructor, so the constructor name is used by default. However, in
     * instances where a message has different versions (i.e. DeviceAddedVersion0
     * and DeviceAddedVersion1), we will need to override this to set the message
     * name.
     */
    get Type() {
        return this.constructor.name;
    }
    /***
     * [DEPRECATED] Function version of the this.Type getter
     *
     */
    getType() {
        return this.Type;
    }
    toJSON() {
        return JSON.stringify(this.toProtocolFormat());
    }
    toProtocolFormat() {
        const jsonObj = {};
        jsonObj[this.Type] = class_transformer_1.classToPlain(this);
        return jsonObj;
    }
}
exports.ButtplugMessage = ButtplugMessage;
class ButtplugDeviceMessage extends ButtplugMessage {
    constructor(DeviceIndex, Id) {
        super(Id);
        this.DeviceIndex = DeviceIndex;
        this.Id = Id;
    }
}
exports.ButtplugDeviceMessage = ButtplugDeviceMessage;
class ButtplugSystemMessage extends ButtplugMessage {
    constructor(Id = 0) {
        super(Id);
        this.Id = Id;
    }
}
exports.ButtplugSystemMessage = ButtplugSystemMessage;
class Ok extends ButtplugSystemMessage {
    constructor(Id) {
        super(Id);
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.Ok = Ok;
class Ping extends ButtplugMessage {
    constructor(Id) {
        super(Id);
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.Ping = Ping;
class Test extends ButtplugMessage {
    constructor(TestString, Id = 1) {
        super(Id);
        this.TestString = TestString;
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.Test = Test;
var ErrorClass;
(function (ErrorClass) {
    ErrorClass[ErrorClass["ERROR_UNKNOWN"] = 0] = "ERROR_UNKNOWN";
    ErrorClass[ErrorClass["ERROR_INIT"] = 1] = "ERROR_INIT";
    ErrorClass[ErrorClass["ERROR_PING"] = 2] = "ERROR_PING";
    ErrorClass[ErrorClass["ERROR_MSG"] = 3] = "ERROR_MSG";
    ErrorClass[ErrorClass["ERROR_DEVICE"] = 4] = "ERROR_DEVICE";
})(ErrorClass = exports.ErrorClass || (exports.ErrorClass = {}));
class Error extends ButtplugSystemMessage {
    constructor(ErrorMessage, ErrorCode = ErrorClass.ERROR_UNKNOWN, Id = 1) {
        super(Id);
        this.ErrorMessage = ErrorMessage;
        this.ErrorCode = ErrorCode;
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.Error = Error;
/***
 * DeviceInfo Message class from v0 spec
 *
 * Uses a string array for messages, instead of a specifications object.
 */
class DeviceInfo {
    constructor(DeviceIndex, DeviceName, DeviceMessages) {
        this.DeviceIndex = DeviceIndex;
        this.DeviceName = DeviceName;
        this.DeviceMessages = DeviceMessages;
    }
}
exports.DeviceInfo = DeviceInfo;
class DeviceListVersion0 extends ButtplugSystemMessage {
    constructor(Devices, Id) {
        super();
        this.Devices = Devices;
        this.Id = Id;
    }
    get Type() {
        return "DeviceList";
    }
    get SchemaVersion() { return 0; }
}
exports.DeviceListVersion0 = DeviceListVersion0;
class DeviceInfoWithSpecifications {
    constructor(DeviceIndex, DeviceName, DeviceMessages) {
        this.DeviceIndex = DeviceIndex;
        this.DeviceName = DeviceName;
        this.DeviceMessages = DeviceMessages;
    }
}
exports.DeviceInfoWithSpecifications = DeviceInfoWithSpecifications;
class DeviceListVersion1 extends ButtplugSystemMessage {
    constructor(Devices, Id) {
        super();
        this.Devices = Devices;
        this.Id = Id;
    }
    get Type() {
        return "DeviceList";
    }
    DowngradeMessage() {
        // This is going to look mostly the same, we just need to reduce our devices
        // down to use string message lists instead of specification lists.
        const oldDevices = [];
        for (const newDevice of this.Devices) {
            oldDevices.push(new DeviceInfo(newDevice.DeviceIndex, newDevice.DeviceName, Object.keys(newDevice.DeviceMessages)));
        }
        return new DeviceListVersion0(oldDevices, this.Id);
    }
    get SchemaVersion() { return 1; }
}
exports.DeviceListVersion1 = DeviceListVersion1;
exports.DeviceList = DeviceListVersion1;
class DeviceAddedVersion0 extends ButtplugSystemMessage {
    constructor(DeviceIndex, DeviceName, DeviceMessages) {
        super();
        this.DeviceIndex = DeviceIndex;
        this.DeviceName = DeviceName;
        this.DeviceMessages = DeviceMessages;
    }
    get Type() {
        return "DeviceAdded";
    }
    get SchemaVersion() { return 0; }
}
exports.DeviceAddedVersion0 = DeviceAddedVersion0;
class DeviceAddedVersion1 extends ButtplugSystemMessage {
    constructor(DeviceIndex, DeviceName, DeviceMessages) {
        super();
        this.DeviceIndex = DeviceIndex;
        this.DeviceName = DeviceName;
        this.DeviceMessages = DeviceMessages;
    }
    get Type() {
        return "DeviceAdded";
    }
    get SchemaVersion() { return 1; }
    DowngradeMessage() {
        // This is going to look mostly the same, we just need to reduce our devices
        // down to use string message lists instead of specification lists.
        return new DeviceAddedVersion0(this.DeviceIndex, this.DeviceName, Object.keys(this.DeviceMessages));
    }
}
exports.DeviceAddedVersion1 = DeviceAddedVersion1;
exports.DeviceAdded = DeviceAddedVersion1;
class DeviceRemoved extends ButtplugSystemMessage {
    constructor(DeviceIndex) {
        super();
        this.DeviceIndex = DeviceIndex;
    }
    get SchemaVersion() { return 0; }
}
exports.DeviceRemoved = DeviceRemoved;
class RequestDeviceList extends ButtplugMessage {
    constructor(Id = 1) {
        super(Id);
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.RequestDeviceList = RequestDeviceList;
class StartScanning extends ButtplugMessage {
    constructor(Id = 1) {
        super(Id);
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.StartScanning = StartScanning;
class StopScanning extends ButtplugMessage {
    constructor(Id = 1) {
        super(Id);
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.StopScanning = StopScanning;
class ScanningFinished extends ButtplugSystemMessage {
    constructor() {
        super();
    }
    get SchemaVersion() { return 0; }
}
exports.ScanningFinished = ScanningFinished;
class RequestLog extends ButtplugMessage {
    constructor(LogLevel, Id = 1) {
        super(Id);
        this.LogLevel = LogLevel;
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.RequestLog = RequestLog;
class Log extends ButtplugSystemMessage {
    constructor(LogLevel, LogMessage) {
        super();
        this.LogLevel = LogLevel;
        this.LogMessage = LogMessage;
    }
    get SchemaVersion() { return 0; }
}
exports.Log = Log;
class RequestServerInfo extends ButtplugMessage {
    constructor(ClientName, MessageVersion = 0, Id = 1) {
        super(Id);
        this.ClientName = ClientName;
        this.MessageVersion = MessageVersion;
        this.Id = Id;
    }
    get SchemaVersion() { return 1; }
}
exports.RequestServerInfo = RequestServerInfo;
class ServerInfo extends ButtplugSystemMessage {
    constructor(MajorVersion, MinorVersion, BuildVersion, MessageVersion, MaxPingTime, ServerName, Id = 1) {
        super();
        this.MajorVersion = MajorVersion;
        this.MinorVersion = MinorVersion;
        this.BuildVersion = BuildVersion;
        this.MessageVersion = MessageVersion;
        this.MaxPingTime = MaxPingTime;
        this.ServerName = ServerName;
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.ServerInfo = ServerInfo;
class FleshlightLaunchFW12Cmd extends ButtplugDeviceMessage {
    constructor(Speed, Position, DeviceIndex = -1, Id = 1) {
        super(DeviceIndex, Id);
        this.Speed = Speed;
        this.Position = Position;
        this.DeviceIndex = DeviceIndex;
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.FleshlightLaunchFW12Cmd = FleshlightLaunchFW12Cmd;
class KiirooCmd extends ButtplugDeviceMessage {
    constructor(Command = "0", DeviceIndex = -1, Id = 1) {
        super(DeviceIndex, Id);
        this.Command = Command;
        this.DeviceIndex = DeviceIndex;
        this.Id = Id;
    }
    SetPosition(aPos) {
        if (aPos >= 0 && aPos <= 4) {
            this.Command = String(Math.round(aPos));
        }
        else {
            this.Command = "0";
        }
    }
    GetPosition() {
        const pos = Number(this.Command) ? Number(this.Command) : 0;
        if (pos < 0 || pos > 4) {
            return 0;
        }
        else {
            return Math.round(pos);
        }
    }
    get SchemaVersion() { return 0; }
}
exports.KiirooCmd = KiirooCmd;
class SingleMotorVibrateCmd extends ButtplugDeviceMessage {
    constructor(Speed, DeviceIndex = -1, Id = 1) {
        super(DeviceIndex, Id);
        this.Speed = Speed;
        this.DeviceIndex = DeviceIndex;
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.SingleMotorVibrateCmd = SingleMotorVibrateCmd;
class StopDeviceCmd extends ButtplugDeviceMessage {
    constructor(DeviceIndex = -1, Id = 1) {
        super(DeviceIndex, Id);
        this.DeviceIndex = DeviceIndex;
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.StopDeviceCmd = StopDeviceCmd;
class StopAllDevices extends ButtplugMessage {
    constructor(Id = 1) {
        super(Id);
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.StopAllDevices = StopAllDevices;
class LovenseCmd extends ButtplugDeviceMessage {
    constructor(Command, DeviceIndex = -1, Id = 1) {
        super(DeviceIndex, Id);
        this.Command = Command;
        this.DeviceIndex = DeviceIndex;
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.LovenseCmd = LovenseCmd;
class VorzeA10CycloneCmd extends ButtplugDeviceMessage {
    constructor(Speed, Clockwise, DeviceIndex = -1, Id = 1) {
        super(DeviceIndex, Id);
        this.Speed = Speed;
        this.Clockwise = Clockwise;
        this.DeviceIndex = DeviceIndex;
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.VorzeA10CycloneCmd = VorzeA10CycloneCmd;
class SpeedSubcommand {
    constructor(Index, Speed) {
        this.Index = Index;
        this.Speed = Speed;
    }
}
exports.SpeedSubcommand = SpeedSubcommand;
class VibrateCmd extends ButtplugDeviceMessage {
    constructor(Speeds, DeviceIndex = -1, Id = 1) {
        super(DeviceIndex, Id);
        this.Speeds = Speeds;
        this.DeviceIndex = DeviceIndex;
        this.Id = Id;
    }
    get SchemaVersion() { return 1; }
}
exports.VibrateCmd = VibrateCmd;
class RotateSubcommand {
    constructor(Index, Speed, Clockwise) {
        this.Index = Index;
        this.Speed = Speed;
        this.Clockwise = Clockwise;
    }
}
exports.RotateSubcommand = RotateSubcommand;
class RotateCmd extends ButtplugDeviceMessage {
    constructor(Rotations, DeviceIndex = -1, Id = 1) {
        super(DeviceIndex, Id);
        this.Rotations = Rotations;
        this.DeviceIndex = DeviceIndex;
        this.Id = Id;
    }
    get SchemaVersion() { return 1; }
}
exports.RotateCmd = RotateCmd;
class VectorSubcommand {
    constructor(Index, Position, Duration) {
        this.Index = Index;
        this.Position = Position;
        this.Duration = Duration;
    }
}
exports.VectorSubcommand = VectorSubcommand;
class LinearCmd extends ButtplugDeviceMessage {
    constructor(Vectors, DeviceIndex = -1, Id = 1) {
        super(DeviceIndex, Id);
        this.Vectors = Vectors;
        this.DeviceIndex = DeviceIndex;
        this.Id = Id;
    }
    get SchemaVersion() { return 1; }
}
exports.LinearCmd = LinearCmd;
class MessageAttributes {
    constructor(FeatureCount) {
        this.FeatureCount = FeatureCount;
    }
}
exports.MessageAttributes = MessageAttributes;


/***/ }),

/***/ "./src/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./src/client/Client.ts"));
__export(__webpack_require__("./src/client/IButtplugConnector.ts"));
__export(__webpack_require__("./src/client/ButtplugEmbeddedServerConnector.ts"));
__export(__webpack_require__("./src/core/Messages.ts"));
__export(__webpack_require__("./src/core/MessageUtils.ts"));
__export(__webpack_require__("./src/core/Device.ts"));
__export(__webpack_require__("./src/core/Logging.ts"));
__export(__webpack_require__("./src/server/ButtplugServer.ts"));
__export(__webpack_require__("./src/server/ButtplugDevice.ts"));
__export(__webpack_require__("./src/server/IDeviceSubtypeManager.ts"));
__export(__webpack_require__("./src/server/bluetooth/ButtplugBluetoothDevice.ts"));
__export(__webpack_require__("./src/server/bluetooth/BluetoothDeviceInfo.ts"));
__export(__webpack_require__("./src/server/bluetooth/BluetoothDevices.ts"));
__export(__webpack_require__("./src/server/bluetooth/IBluetoothDeviceImpl.ts"));


/***/ }),

/***/ "./src/server/ButtplugDevice.ts":
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
const Messages = __webpack_require__("./src/core/Messages.ts");
const events_1 = __webpack_require__("./node_modules/events/events.js");
class ButtplugDevice extends events_1.EventEmitter {
    constructor(_name, _id) {
        super();
        this._name = _name;
        this._id = _id;
        this.MsgFuncs = new Map();
        this.ParseMessage = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            if (!this.MsgFuncs.has(aMsg.Type)) {
                return new Messages.Error(`${this._name} cannot handle message of type ${aMsg.Type}`, Messages.ErrorClass.ERROR_MSG, aMsg.Id);
            }
            // Non-null assurance in the middle of functions looks weird.
            return this.MsgFuncs.get(aMsg.Type)(aMsg);
        });
    }
    get Name() {
        return this._name;
    }
    get Id() {
        return this._id;
    }
    get AllowedMessageTypes() {
        return Object.keys(this.MessageSpecifications);
    }
}
exports.ButtplugDevice = ButtplugDevice;


/***/ }),

/***/ "./src/server/ButtplugServer.ts":
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
const Messages = __webpack_require__("./src/core/Messages.ts");
const MessageUtils_1 = __webpack_require__("./src/core/MessageUtils.ts");
const DeviceManager_1 = __webpack_require__("./src/server/DeviceManager.ts");
const events_1 = __webpack_require__("./node_modules/events/events.js");
const ServerMessageHub_1 = __webpack_require__("./src/server/ServerMessageHub.ts");
const Logging_1 = __webpack_require__("./src/core/Logging.ts");
class ButtplugServer extends events_1.EventEmitter {
    constructor(_serverName = "Buttplug JS Internal Server", _maxPingTime = 0) {
        super();
        this._serverName = _serverName;
        this._maxPingTime = _maxPingTime;
        // Member: PingTimer?
        this._clientSchemaVersion = -1;
        this._pingTimedOut = false;
        this._receivedRequestServerInfo = false;
        this._logger = Logging_1.ButtplugLogger.Logger;
        this._outgoingLogLevel = Logging_1.ButtplugLogLevel.Off;
        this.AddDeviceManager = (aManager) => {
            this._deviceManager.AddDeviceManager(aManager);
        };
        this.ClearDeviceManagers = () => {
            this._deviceManager.ClearDeviceManagers();
        };
        this.SendMessage = (aMessage) => __awaiter(this, void 0, void 0, function* () {
            const id = aMessage.Id;
            this._logger.Trace(`Server: Got Message: ${aMessage}`);
            if (id === 0) {
                return this._logger.LogAndError("Message Id 0 is reserved for outgoing system messages. Please use another Id.", Messages.ErrorClass.ERROR_MSG, id);
            }
            if (this._pingTimedOut) {
                return this._logger.LogAndError("Ping timed out.", Messages.ErrorClass.ERROR_MSG, id);
            }
            if (!this._receivedRequestServerInfo && aMessage.Type !== "RequestServerInfo") {
                return this._logger.LogAndError("RequestServerInfo must be first message received by server.", Messages.ErrorClass.ERROR_INIT, id);
            }
            switch (aMessage.Type) {
                case "RequestLog":
                    const logmsg = aMessage;
                    this._logger.Debug(`Server: RequestLog received for level ${logmsg.LogLevel}`);
                    if (logmsg.LogLevel === Logging_1.ButtplugLogLevel[Logging_1.ButtplugLogLevel.Off]) {
                        this._logger.removeListener("log", this.OnLogMessage);
                    }
                    else if (this._outgoingLogLevel === Logging_1.ButtplugLogLevel.Off) {
                        this._logger.addListener("log", this.OnLogMessage);
                    }
                    this._logger.MaximumEventLogLevel = Logging_1.ButtplugLogLevel[logmsg.LogLevel];
                    this._outgoingLogLevel = Logging_1.ButtplugLogLevel[logmsg.LogLevel];
                    return new Messages.Ok(logmsg.Id);
                case "Ping":
                    // TODO: Implement Ping
                    return new Messages.Ok(aMessage.Id);
                case "RequestServerInfo":
                    this._logger.Debug(`Server: RequestServerInfo received.`);
                    const msg = aMessage;
                    if (this._clientSchemaVersion > 1) {
                        // Client automatically disconnects on error message.
                        return new Messages.Error(`Client schema (${this._clientSchemaVersion}) newer than server schema (1). ` +
                            "Please upgrade server.", Messages.ErrorClass.ERROR_INIT, id);
                    }
                    this._receivedRequestServerInfo = true;
                    this._clientSchemaVersion = msg.MessageVersion;
                    this._clientName = msg.ClientName;
                    // TODO: Figure out how to encode this from the package version?
                    // TODO: Figure out how to pull message schema version.
                    return new Messages.ServerInfo(0, 0, 0, MessageUtils_1.GetSchemaVersion(), this._maxPingTime, this._serverName, id);
                case "Test":
                    this._logger.Debug(`Server: Test received.`);
                    const testmsg = aMessage;
                    return new Messages.Test(testmsg.TestString, aMessage.Id);
            }
            return this._deviceManager.SendMessage(aMessage);
        });
        this.Shutdown = () => __awaiter(this, void 0, void 0, function* () {
            ServerMessageHub_1.ServerMessageHub.Instance.removeListener("message", this.OnOutgoingMessage);
            yield this._deviceManager.Shutdown();
        });
        this.OnLogMessage = (aMsg) => {
            if (aMsg.LogLevel > this._outgoingLogLevel) {
                return;
            }
            this.OnOutgoingMessage(new Messages.Log(Logging_1.ButtplugLogLevel[aMsg.LogLevel], aMsg.Message));
        };
        this.OnOutgoingMessage = (msg) => {
            if (msg.constructor.name === "Error") {
                return msg;
            }
            if (this._clientSchemaVersion === -1) {
                return new Messages.Error("Cannot discern client schema version. Was RequestServerInfo message sent?");
            }
            while (msg.SchemaVersion !== this._clientSchemaVersion && msg.SchemaVersion > 0) {
                msg = msg.DowngradeMessage();
            }
            // If there was a conversion problem, log as well as returning an error message.
            if (msg.constructor.name === "Error") {
                this._logger.Error(msg.ErrorMessage);
            }
            this.emit("message", msg);
        };
        this._logger.Info(`Server: Starting Buttplug Server: ${this._serverName}`);
        this._deviceManager = new DeviceManager_1.DeviceManager();
        ServerMessageHub_1.ServerMessageHub.Instance.addListener("message", this.OnOutgoingMessage);
    }
    get DeviceManagers() {
        return this._deviceManager.DeviceManagers;
    }
}
exports.ButtplugServer = ButtplugServer;


/***/ }),

/***/ "./src/server/DeviceManager.ts":
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
const Messages = __webpack_require__("./src/core/Messages.ts");
const WebBluetoothDeviceManager_1 = __webpack_require__("./src/server/bluetooth/WebBluetoothDeviceManager.ts");
const events_1 = __webpack_require__("./node_modules/events/events.js");
const ServerMessageHub_1 = __webpack_require__("./src/server/ServerMessageHub.ts");
const Logging_1 = __webpack_require__("./src/core/Logging.ts");
class DeviceManager extends events_1.EventEmitter {
    constructor() {
        super();
        this._subtypeManagers = [];
        this._devices = new Map();
        this._deviceCounter = 0;
        this._logger = Logging_1.ButtplugLogger.Logger;
        this.Shutdown = () => __awaiter(this, void 0, void 0, function* () {
            for (const d of this._devices.values()) {
                yield d.Disconnect();
            }
        });
        this.ClearDeviceManagers = () => {
            this._logger.Info("DeviceManager: Clearing device subtype managers");
            this._subtypeManagers = [];
        };
        this.AddDeviceManager = (aManager) => {
            this._logger.Info(`DeviceManager: Adding Device Manager ${aManager.constructor.name}`);
            this._subtypeManagers.push(aManager);
            aManager.addListener("deviceadded", this.OnDeviceAdded);
            aManager.addListener("deviceremoved", this.OnDeviceRemoved);
            aManager.addListener("scanningfinished", this.OnScanningFinished);
        };
        this.SendMessage = (aMessage) => __awaiter(this, void 0, void 0, function* () {
            const id = aMessage.Id;
            switch (aMessage.Type) {
                case "StartScanning":
                    this._logger.Debug(`DeviceManager: Starting scan`);
                    if (this._subtypeManagers.length === 0) {
                        // If we have no managers by this point, return an error, because we'll
                        // have nothing to scan with.
                        return this._logger.LogAndError("No device managers available, cannot scan.", Messages.ErrorClass.ERROR_DEVICE, id);
                    }
                    for (const manager of this._subtypeManagers) {
                        if (!manager.IsScanning) {
                            try {
                                yield manager.StartScanning();
                            }
                            catch (e) {
                                return this._logger.LogAndError(e.message, Messages.ErrorClass.ERROR_DEVICE, id);
                            }
                        }
                    }
                    return new Messages.Ok(id);
                case "StopScanning":
                    this._logger.Debug(`DeviceManager: Stopping scan`);
                    for (const manager of this._subtypeManagers) {
                        if (manager.IsScanning) {
                            manager.StopScanning();
                        }
                    }
                    return new Messages.Ok(id);
                case "StopAllDevices":
                    this._logger.Debug(`DeviceManager: Stopping all devices`);
                    this._devices.forEach((deviceObj, index) => {
                        deviceObj.ParseMessage(new Messages.StopDeviceCmd());
                    });
                    return new Messages.Ok(id);
                case "RequestDeviceList":
                    this._logger.Debug(`DeviceManager: Sending device list`);
                    const devices = [];
                    this._devices.forEach((v, k) => {
                        devices.push(new Messages.DeviceInfo(k, v.Name, v.AllowedMessageTypes));
                    });
                    return new Messages.DeviceList(devices, id);
            }
            const deviceMsg = aMessage;
            if (deviceMsg.DeviceIndex === undefined) {
                return this._logger.LogAndError(`Message Type ${aMessage.Type} unhandled by this server.`, Messages.ErrorClass.ERROR_MSG, id);
            }
            if (!this._devices.has(deviceMsg.DeviceIndex)) {
                return this._logger.LogAndError(`Device Index ${deviceMsg.DeviceIndex} does not exist`, Messages.ErrorClass.ERROR_DEVICE, id);
            }
            const device = this._devices.get(deviceMsg.DeviceIndex);
            if (device.AllowedMessageTypes.indexOf(aMessage.Type) < 0) {
                return this._logger.LogAndError(`Device ${device.Name} does not take message type ${aMessage.Type}`, Messages.ErrorClass.ERROR_DEVICE, id);
            }
            this._logger.Trace(`DeviceManager: Sending ${deviceMsg.Type} to ${device.Name} (${deviceMsg.Id})`);
            return yield device.ParseMessage(deviceMsg);
        });
        this.OnDeviceAdded = (device) => {
            for (const dev of this._devices.values()) {
                if (dev.Id === device.Id) {
                    this._logger.Info(`DeviceManager: Device ${device.Name} (id: ${device.Id}) already added, ignoring.`);
                    return;
                }
            }
            const deviceIndex = this._deviceCounter;
            this._deviceCounter += 1;
            this._devices.set(deviceIndex, device);
            this._logger.Info(`DeviceManager: Device Added: ${device.Name} (${deviceIndex})`);
            device.addListener("deviceremoved", this.OnDeviceRemoved);
            ServerMessageHub_1.ServerMessageHub.Instance.emitMessage(new Messages.DeviceAdded(deviceIndex, device.Name, device.MessageSpecifications));
        };
        this.OnDeviceRemoved = (device) => {
            let deviceIndex = null;
            for (const entry of Array.from(this._devices.entries())) {
                if (entry[1] === device) {
                    deviceIndex = entry[0];
                    break;
                }
            }
            if (deviceIndex === null) {
                return;
            }
            device.removeAllListeners("deviceremoved");
            this._devices.delete(deviceIndex);
            this._logger.Info(`DeviceManager: Device Removed: ${device.Name} (${deviceIndex})`);
            ServerMessageHub_1.ServerMessageHub.Instance.emitMessage(new Messages.DeviceRemoved(deviceIndex));
        };
        this.OnScanningFinished = () => {
            this._logger.Debug(`DeviceManager: Scanning Finished.`);
            for (const manager of this._subtypeManagers) {
                if (manager.IsScanning) {
                    return;
                }
            }
            ServerMessageHub_1.ServerMessageHub.Instance.emitMessage(new Messages.ScanningFinished());
        };
        this._logger.Debug("DeviceManager: Starting Device Manager");
        // If we have a bluetooth object on navigator, load the device manager
        if (typeof (window) !== "undefined" &&
            typeof (window.navigator) !== "undefined" &&
            navigator.bluetooth) {
            this.AddDeviceManager(new WebBluetoothDeviceManager_1.WebBluetoothDeviceManager());
        }
        else {
            this._logger.Info("DeviceManager: Not adding WebBluetooth Manager, no capabilities found.");
        }
    }
    get DeviceManagers() {
        return this._subtypeManagers;
    }
}
exports.DeviceManager = DeviceManager;


/***/ }),

/***/ "./src/server/IDeviceSubtypeManager.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/server/ServerMessageHub.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __webpack_require__("./node_modules/events/events.js");
class ServerMessageHub extends events_1.EventEmitter {
    static get Instance() {
        return ServerMessageHub.sInstance;
    }
    emitMessage(aMsg) {
        this.emit("message", aMsg);
    }
}
ServerMessageHub.sInstance = new ServerMessageHub();
exports.ServerMessageHub = ServerMessageHub;


/***/ }),

/***/ "./src/server/bluetooth/BluetoothDeviceInfo.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class BluetoothDeviceInfo {
    constructor(_names, _services, _characteristics, _createFunc) {
        this._names = _names;
        this._services = _services;
        this._characteristics = _characteristics;
        this._createFunc = _createFunc;
    }
    get Names() {
        return this._names;
    }
    get Services() {
        return this._services;
    }
    get Characteristics() {
        return this._characteristics;
    }
    get Create() {
        return this._createFunc;
    }
}
exports.BluetoothDeviceInfo = BluetoothDeviceInfo;


/***/ }),

/***/ "./src/server/bluetooth/BluetoothDevices.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FleshlightLaunch_1 = __webpack_require__("./src/server/bluetooth/devices/FleshlightLaunch.ts");
const Lovense_1 = __webpack_require__("./src/server/bluetooth/devices/Lovense.ts");
const VorzeA10Cyclone_1 = __webpack_require__("./src/server/bluetooth/devices/VorzeA10Cyclone.ts");
const WeVibe_1 = __webpack_require__("./src/server/bluetooth/devices/WeVibe.ts");
const Maxpro_1 = __webpack_require__("./src/server/bluetooth/devices/Maxpro.ts");
class BluetoothDevices {
    static GetDeviceInfo() {
        return [FleshlightLaunch_1.FleshlightLaunch.DeviceInfo,
            Lovense_1.LovenseRev1.DeviceInfo,
            Lovense_1.LovenseRev2.DeviceInfo,
            Lovense_1.LovenseRev3.DeviceInfo,
            Lovense_1.LovenseRev4.DeviceInfo,
            Lovense_1.LovenseRev5.DeviceInfo,
            Lovense_1.LovenseRev6.DeviceInfo,
            Lovense_1.LovenseRev7.DeviceInfo,
            Lovense_1.LovenseRev8.DeviceInfo,
            Maxpro_1.Maxpro.DeviceInfo,
            VorzeA10Cyclone_1.VorzeA10Cyclone.DeviceInfo,
            WeVibe_1.WeVibe.DeviceInfo];
    }
}
exports.BluetoothDevices = BluetoothDevices;


/***/ }),

/***/ "./src/server/bluetooth/ButtplugBluetoothDevice.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ButtplugDevice_1 = __webpack_require__("./src/server/ButtplugDevice.ts");
class ButtplugBluetoothDevice extends ButtplugDevice_1.ButtplugDevice {
    constructor(aName, _deviceImpl) {
        super(aName, _deviceImpl.Id);
        this._deviceImpl = _deviceImpl;
    }
    Disconnect() {
        this._deviceImpl.Disconnect();
    }
    OnDisconnect() {
        this.emit("deviceremoved", this);
    }
}
exports.ButtplugBluetoothDevice = ButtplugBluetoothDevice;


/***/ }),

/***/ "./src/server/bluetooth/IBluetoothDeviceImpl.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/server/bluetooth/WebBluetoothDevice.ts":
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
const Logging_1 = __webpack_require__("./src/core/Logging.ts");
const events_1 = __webpack_require__("./node_modules/events/events.js");
class WebBluetoothDevice extends events_1.EventEmitter {
    constructor(_deviceInfo, _device) {
        super();
        this._deviceInfo = _deviceInfo;
        this._device = _device;
        this._logger = Logging_1.ButtplugLogger.Logger;
        this._characteristics = new Map();
        this.Connect = () => __awaiter(this, void 0, void 0, function* () {
            this._logger.Debug(`WebBluetoothDevice: ${this.constructor.name} connecting`);
            this._device.addEventListener("gattserverdisconnected", this.OnDisconnect);
            this._server = yield this._device.gatt.connect();
            this._service = yield this._server.getPrimaryService(this._deviceInfo.Services[0]);
            for (const name of Object.getOwnPropertyNames(this._deviceInfo.Characteristics)) {
                this._characteristics.set(name, yield this._service.getCharacteristic(this._deviceInfo.Characteristics[name]));
            }
        });
        this.Disconnect = () => __awaiter(this, void 0, void 0, function* () {
            this._server.disconnect();
        });
        this.OnDisconnect = () => {
            this._logger.Debug(`WebBluetoothDevice: ${this.constructor.name} disconnecting`);
            this._device.removeEventListener("gattserverdisconnected", this.OnDisconnect);
            this.emit("deviceremoved");
        };
        this.WriteValue = (aCharacteristic, aValue) => __awaiter(this, void 0, void 0, function* () {
            if (!this._characteristics.has(aCharacteristic)) {
                return;
            }
            const chr = this._characteristics.get(aCharacteristic);
            this._logger.Trace(`WebBluetoothDevice: ${this.constructor.name} writing ${aValue} to ${chr.uuid}`);
            yield chr.writeValue(aValue);
        });
        this.ReadValue = (aCharacteristic) => __awaiter(this, void 0, void 0, function* () {
            if (!this._characteristics.has(aCharacteristic)) {
                throw new Error("Tried to access wrong characteristic!");
            }
            const chr = this._characteristics.get(aCharacteristic);
            this._logger.Trace(`WebBluetoothDevice: ${this.constructor.name} reading from ${chr.uuid}`);
            return yield chr.readValue();
        });
    }
    static CreateDevice(aDeviceInfo, aDevice) {
        return __awaiter(this, void 0, void 0, function* () {
            const deviceImpl = new WebBluetoothDevice(aDeviceInfo, aDevice);
            yield deviceImpl.Connect();
            const device = yield aDeviceInfo.Create(deviceImpl);
            // Use a fat arrow closure here, as we need to close over this definition of device.
            deviceImpl.addListener("deviceremoved", () => {
                device.OnDisconnect();
            });
            Logging_1.ButtplugLogger.Logger.Debug(`WebBluetoothDevice: Creating ${device.constructor.name}`);
            return device;
        });
    }
    get Name() {
        return this._device.name;
    }
    get Id() {
        return this._device.id;
    }
}
exports.WebBluetoothDevice = WebBluetoothDevice;


/***/ }),

/***/ "./src/server/bluetooth/WebBluetoothDeviceManager.ts":
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
const BluetoothDevices_1 = __webpack_require__("./src/server/bluetooth/BluetoothDevices.ts");
const events_1 = __webpack_require__("./node_modules/events/events.js");
const WebBluetoothDevice_1 = __webpack_require__("./src/server/bluetooth/WebBluetoothDevice.ts");
class WebBluetoothDeviceManager extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.OpenDevice = (aDevice) => __awaiter(this, void 0, void 0, function* () {
            if (aDevice === undefined) {
                // TODO Throw here?
                return;
            }
            // Find the related info for the device
            const info = BluetoothDevices_1.BluetoothDevices.GetDeviceInfo();
            let deviceInfo = null;
            for (const di of info) {
                if (di.Names.indexOf(aDevice.name) >= 0) {
                    deviceInfo = di;
                    break;
                }
            }
            if (deviceInfo === null) {
                // TODO Throw here?
                // We somehow got a device we don't know what to do with?
                return;
            }
            const device = yield WebBluetoothDevice_1.WebBluetoothDevice.CreateDevice(deviceInfo, aDevice);
            this.emit("deviceadded", device);
        });
    }
    StartScanning() {
        return __awaiter(this, void 0, void 0, function* () {
            // Form scanning filters
            const info = BluetoothDevices_1.BluetoothDevices.GetDeviceInfo();
            const filters = {
                filters: new Array(),
                optionalServices: new Array(),
            };
            for (const deviceInfo of info) {
                for (const deviceName of deviceInfo.Names) {
                    filters.filters.push({ name: deviceName });
                }
                filters.optionalServices = [...filters.optionalServices, ...deviceInfo.Services];
            }
            // At some point, we should use navigator.bluetooth.getAvailability() to
            // check whether we have a radio to use. However, no browser currently
            // implements this. Instead, see if requestDevice throws;
            let device;
            try {
                device = yield (navigator.bluetooth).requestDevice(filters);
            }
            catch (e) {
                this.emit("scanningfinished");
                // This is the only way we have to check whether the user cancelled out of
                // the dialog versus bluetooth radio not being available, as both errors
                // are thrown as DOMExcpetion. Kill me.
                if (e.message.indexOf("User cancelled") !== -1) {
                    return;
                }
                throw new Error("Bluetooth scanning interrupted. " +
                    "Either user cancelled out of dialog, or bluetooth radio is not available. Exception: " + e);
            }
            try {
                yield this.OpenDevice(device);
            }
            catch (e) {
                this.emit("scanningfinished");
                throw new Error(`Cannot open device ${device.name}: ${e}`);
            }
            this.emit("scanningfinished");
        });
    }
    StopScanning() {
        // noop. We can only scan via the browser dialog, and we can't cancel that from outside.
    }
    get IsScanning() {
        // noop.
        return false;
    }
}
exports.WebBluetoothDeviceManager = WebBluetoothDeviceManager;


/***/ }),

/***/ "./src/server/bluetooth/devices/FleshlightLaunch.ts":
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
const BluetoothDeviceInfo_1 = __webpack_require__("./src/server/bluetooth/BluetoothDeviceInfo.ts");
const ButtplugBluetoothDevice_1 = __webpack_require__("./src/server/bluetooth/ButtplugBluetoothDevice.ts");
const Messages = __webpack_require__("./src/core/Messages.ts");
class FleshlightLaunch extends ButtplugBluetoothDevice_1.ButtplugBluetoothDevice {
    constructor(aDeviceImpl) {
        super("Fleshlight Launch", aDeviceImpl);
        this._lastPosition = 0;
        this.HandleStopDeviceCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            return yield this.HandleFleshlightLaunchFW12Cmd(new Messages.FleshlightLaunchFW12Cmd(0, 0, aMsg.DeviceIndex, aMsg.Id));
        });
        this.HandleFleshlightLaunchFW12Cmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            this._lastPosition = aMsg.Position;
            yield this._deviceImpl.WriteValue("tx", new Uint8Array([aMsg.Position, aMsg.Speed]));
            return new Messages.Ok(aMsg.Id);
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
            const positionDelta = Math.abs(currentPosition - this._lastPosition);
            let speed = Math.floor(25000 * Math.pow(((vector.Duration * 90) / positionDelta), -1.05));
            // Clamp speed on 0 <= x <= 95 so we don't break the launch.
            speed = Math.min(Math.max(speed, 0), 95);
            const positionGoal = Math.floor(((currentPosition / 99) * range) + ((99 - range) / 2));
            // We'll set this._lastPosition in FleshlightLaunchFW12Cmd, since
            // everything kinda funnels to that.
            return yield this.HandleFleshlightLaunchFW12Cmd(new Messages.FleshlightLaunchFW12Cmd(speed, positionGoal, aMsg.DeviceIndex, aMsg.Id));
        });
        this.MsgFuncs.set(Messages.StopDeviceCmd.name, this.HandleStopDeviceCmd);
        this.MsgFuncs.set(Messages.FleshlightLaunchFW12Cmd.name, this.HandleFleshlightLaunchFW12Cmd);
        this.MsgFuncs.set(Messages.LinearCmd.name, this.HandleLinearCmd);
    }
    static CreateInstance(aDeviceImpl) {
        return __awaiter(this, void 0, void 0, function* () {
            // Send initializer byte
            yield aDeviceImpl.WriteValue("cmd", new Uint8Array([0x00]));
            return new FleshlightLaunch(aDeviceImpl);
        });
    }
    get MessageSpecifications() {
        return {
            FleshlightLaunchFW12Cmd: {},
            StopDeviceCmd: {},
            LinearCmd: { FeatureCount: 1 },
        };
    }
}
FleshlightLaunch.DeviceInfo = new BluetoothDeviceInfo_1.BluetoothDeviceInfo(["Launch"], ["88f80580-0000-01e6-aace-0002a5d5c51b"], { cmd: "88f80583-0000-01e6-aace-0002a5d5c51b",
    // rx: "88f80582-0000-01e6-aace-0002a5d5c51b",
    tx: "88f80581-0000-01e6-aace-0002a5d5c51b" }, FleshlightLaunch.CreateInstance);
exports.FleshlightLaunch = FleshlightLaunch;


/***/ }),

/***/ "./src/server/bluetooth/devices/Lovense.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BluetoothDeviceInfo_1 = __webpack_require__("./src/server/bluetooth/BluetoothDeviceInfo.ts");
const ButtplugBluetoothDevice_1 = __webpack_require__("./src/server/bluetooth/ButtplugBluetoothDevice.ts");
const Messages = __webpack_require__("./src/core/Messages.ts");
class Lovense extends ButtplugBluetoothDevice_1.ButtplugBluetoothDevice {
    constructor(aDeviceImpl) {
        super(`Lovense ${aDeviceImpl.Name}`, aDeviceImpl);
        this.HandleVibrateCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            if (aMsg.Speeds.length !== 1) {
                return new Messages.Error(`Lovense devices require VibrateCmd to have 1 speed command, ` +
                    `${aMsg.Speeds.length} sent.`, Messages.ErrorClass.ERROR_DEVICE, aMsg.Id);
            }
            return yield this.HandleSingleMotorVibrateCmd(new Messages.SingleMotorVibrateCmd(aMsg.Speeds[0].Speed, aMsg.DeviceIndex, aMsg.Id));
        });
        this.HandleStopDeviceCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            return yield this.HandleSingleMotorVibrateCmd(new Messages.SingleMotorVibrateCmd(0, aMsg.DeviceIndex, aMsg.Id));
        });
        this.HandleSingleMotorVibrateCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            const speed = Math.floor(20 * aMsg.Speed);
            yield this._deviceImpl.WriteValue("tx", Buffer.from("Vibrate:" + speed + ";"));
            return new Messages.Ok(aMsg.Id);
        });
        this.MsgFuncs.set(Messages.StopDeviceCmd.name, this.HandleStopDeviceCmd);
        this.MsgFuncs.set(Messages.VibrateCmd.name, this.HandleVibrateCmd);
        this.MsgFuncs.set(Messages.SingleMotorVibrateCmd.name, this.HandleSingleMotorVibrateCmd);
    }
    static CreateInstance(aDeviceImpl) {
        return Promise.resolve(new Lovense(aDeviceImpl));
    }
    get MessageSpecifications() {
        return {
            VibrateCmd: { FeatureCount: 1 },
            SingleMotorVibrateCmd: {},
            StopDeviceCmd: {},
        };
    }
}
Lovense._deviceNames = { "LVS-A011": "Nora",
    "LVS-C011": "Nora",
    "LVS-B011": "Max",
    "LVS-L009": "Ambi",
    "LVS-S001": "Lush",
    "LVS-S35": "Lush",
    "LVS-Z36": "Hush",
    "LVS-Z001": "Hush",
    "LVS_Z001": "Hush",
    "LVS-Hush41": "Hush",
    "LVS-Domi37": "Domi",
    "LVS-Domi38": "Domi",
    "LVS-Domi39": "Domi",
    "LVS-Domi40": "Domi",
    "LVS-P36": "Edge",
    "LVS-Edge37": "Edge",
    "LVS-Edge38": "Edge",
    "LVS-Edge39": "Edge",
    "LVS-Edge40": "Edge",
    "LVS-Lush41": "Lush" };
exports.Lovense = Lovense;
class LovenseRev1 {
}
LovenseRev1.DeviceInfo = new BluetoothDeviceInfo_1.BluetoothDeviceInfo(["LVS-A011", "LVS-C011", "LVS-B011", "LVS-L009"], ["0000fff0-0000-1000-8000-00805f9b34fb"], { tx: "0000fff2-0000-1000-8000-00805f9b34fb",
}, Lovense.CreateInstance);
exports.LovenseRev1 = LovenseRev1;
class LovenseRev2 {
}
LovenseRev2.DeviceInfo = new BluetoothDeviceInfo_1.BluetoothDeviceInfo(["LVS-S001", "LVS-Z001", "LVS_Z001"], ["6e400001-b5a3-f393-e0a9-e50e24dcca9e"], { tx: "6e400002-b5a3-f393-e0a9-e50e24dcca9e",
}, Lovense.CreateInstance);
exports.LovenseRev2 = LovenseRev2;
class LovenseRev3 {
}
LovenseRev3.DeviceInfo = new BluetoothDeviceInfo_1.BluetoothDeviceInfo(["LVS-P36"], ["50300001-0024-4bd4-bbd5-a6920e4c5653"], { tx: "50300002-0024-4bd4-bbd5-a6920e4c5653",
}, Lovense.CreateInstance);
exports.LovenseRev3 = LovenseRev3;
class LovenseRev4 {
}
LovenseRev4.DeviceInfo = new BluetoothDeviceInfo_1.BluetoothDeviceInfo(["LVS-Domi37", "LVS-Domi38", "LVS-Domi39", "LVS-Domi40"], ["57300001-0023-4bd4-bbd5-a6920e4c5653"], { tx: "57300002-0023-4bd4-bbd5-a6920e4c5653",
}, Lovense.CreateInstance);
exports.LovenseRev4 = LovenseRev4;
class LovenseRev5 {
}
LovenseRev5.DeviceInfo = new BluetoothDeviceInfo_1.BluetoothDeviceInfo(["LVS-Z36"], ["5a300001-0024-4bd4-bbd5-a6920e4c5653"], { tx: "5a300002-0024-4bd4-bbd5-a6920e4c5653",
}, Lovense.CreateInstance);
exports.LovenseRev5 = LovenseRev5;
class LovenseRev6 {
}
LovenseRev6.DeviceInfo = new BluetoothDeviceInfo_1.BluetoothDeviceInfo(["LVS-Edge37", "LVS-Edge38", "LVS-Edge39", "LVS-Edge40"], ["50300001-0023-4bd4-bbd5-a6920e4c5653"], { tx: "50300002-0023-4bd4-bbd5-a6920e4c5653",
}, Lovense.CreateInstance);
exports.LovenseRev6 = LovenseRev6;
class LovenseRev7 {
}
LovenseRev7.DeviceInfo = new BluetoothDeviceInfo_1.BluetoothDeviceInfo(["LVS-S35"], ["53300001-0023-4bd4-bbd5-a6920e4c5653"], { tx: "53300002-0023-4bd4-bbd5-a6920e4c5653",
}, Lovense.CreateInstance);
exports.LovenseRev7 = LovenseRev7;
class LovenseRev8 {
}
LovenseRev8.DeviceInfo = new BluetoothDeviceInfo_1.BluetoothDeviceInfo(["LVS-Hush41"], ["5a300001-0023-4bd4-bbd5-a6920e4c5653"], { tx: "5a300002-0023-4bd4-bbd5-a6920e4c5653",
}, Lovense.CreateInstance);
exports.LovenseRev8 = LovenseRev8;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./src/server/bluetooth/devices/Maxpro.ts":
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
const BluetoothDeviceInfo_1 = __webpack_require__("./src/server/bluetooth/BluetoothDeviceInfo.ts");
const ButtplugBluetoothDevice_1 = __webpack_require__("./src/server/bluetooth/ButtplugBluetoothDevice.ts");
const Messages = __webpack_require__("./src/core/Messages.ts");
class Maxpro extends ButtplugBluetoothDevice_1.ButtplugBluetoothDevice {
    constructor(aDeviceImpl) {
        super(`Maxpro ${aDeviceImpl.Name}`, aDeviceImpl);
        this.HandleVibrateCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            if (aMsg.Speeds.length !== 1) {
                return new Messages.Error(`Maxpro devices require VibrateCmd to have 1 speed command, ` +
                    `${aMsg.Speeds.length} sent.`, Messages.ErrorClass.ERROR_DEVICE, aMsg.Id);
            }
            return yield this.HandleSingleMotorVibrateCmd(new Messages.SingleMotorVibrateCmd(aMsg.Speeds[0].Speed, aMsg.DeviceIndex, aMsg.Id));
        });
        this.HandleStopDeviceCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            return yield this.HandleSingleMotorVibrateCmd(new Messages.SingleMotorVibrateCmd(0, aMsg.DeviceIndex, aMsg.Id));
        });
        this.HandleSingleMotorVibrateCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            // Speed range for Maxpro toys are 10-100 for some reason.
            const speed = Math.floor(aMsg.Speed * 100);
            const data = new Uint8Array([0x55, 0x04, 0x07, 0xff, 0xff, 0x3f, speed, 0x5f, speed, 0x00]);
            const checksum = data.reduce((prev, cur) => prev + cur) & 0xFF;
            data[9] = checksum;
            yield this._deviceImpl.WriteValue("tx", data);
            return new Messages.Ok(aMsg.Id);
        });
        this.MsgFuncs.set(Messages.StopDeviceCmd.name, this.HandleStopDeviceCmd);
        this.MsgFuncs.set(Messages.SingleMotorVibrateCmd.name, this.HandleSingleMotorVibrateCmd);
        this.MsgFuncs.set(Messages.VibrateCmd.name, this.HandleVibrateCmd);
    }
    static CreateInstance(aDeviceImpl) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Maxpro(aDeviceImpl);
        });
    }
    get MessageSpecifications() {
        return {
            VibrateCmd: { FeatureCount: 1 },
            SingleMotorVibrateCmd: {},
            StopDeviceCmd: {},
        };
    }
}
Maxpro.DeviceInfo = new BluetoothDeviceInfo_1.BluetoothDeviceInfo(["M2"], ["6e400001-b5a3-f393-e0a9-e50e24dcca9e"], { tx: "6e400002-b5a3-f393-e0a9-e50e24dcca9e",
    rx: "6e400003-b5a3-f393-e0a9-e50e24dcca9e" }, Maxpro.CreateInstance);
exports.Maxpro = Maxpro;


/***/ }),

/***/ "./src/server/bluetooth/devices/VorzeA10Cyclone.ts":
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
const BluetoothDeviceInfo_1 = __webpack_require__("./src/server/bluetooth/BluetoothDeviceInfo.ts");
const ButtplugBluetoothDevice_1 = __webpack_require__("./src/server/bluetooth/ButtplugBluetoothDevice.ts");
const Messages = __webpack_require__("./src/core/Messages.ts");
class VorzeA10Cyclone extends ButtplugBluetoothDevice_1.ButtplugBluetoothDevice {
    constructor(aDeviceImpl) {
        super("Vorze A10 Cyclone", aDeviceImpl);
        this.HandleRotateCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            if (aMsg.Rotations.length !== 1) {
                return new Messages.Error(`Vorze A10 Cyclone devices require RotateCmd to have 1 rotation command,` +
                    ` ${aMsg.Rotations.length} sent.`, Messages.ErrorClass.ERROR_DEVICE, aMsg.Id);
            }
            return yield this.HandleVorzeA10CycloneCmd(new Messages.VorzeA10CycloneCmd(aMsg.Rotations[0].Speed * 100, aMsg.Rotations[0].Clockwise, aMsg.DeviceIndex, aMsg.Id));
        });
        this.HandleStopDeviceCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            return yield this.HandleVorzeA10CycloneCmd(new Messages.VorzeA10CycloneCmd(0, false, aMsg.DeviceIndex, aMsg.Id));
        });
        this.HandleVorzeA10CycloneCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            const rawSpeed = (((aMsg.Clockwise ? 1 : 0) << 7) | aMsg.Speed) & 0xff;
            yield this._deviceImpl.WriteValue("tx", new Uint8Array([0x01, 0x01, rawSpeed]));
            return new Messages.Ok(aMsg.Id);
        });
        this.MsgFuncs.set(Messages.StopDeviceCmd.name, this.HandleStopDeviceCmd);
        this.MsgFuncs.set(Messages.VorzeA10CycloneCmd.name, this.HandleVorzeA10CycloneCmd);
        this.MsgFuncs.set(Messages.RotateCmd.name, this.HandleRotateCmd);
    }
    static CreateInstance(aDeviceImpl) {
        return __awaiter(this, void 0, void 0, function* () {
            // Send initializer byte
            aDeviceImpl.WriteValue("cmd", new Uint8Array([0x00]));
            return new VorzeA10Cyclone(aDeviceImpl);
        });
    }
    get MessageSpecifications() {
        return {
            RotateCmd: { FeatureCount: 1 },
            VorzeA10CycloneCmd: {},
            StopDeviceCmd: {},
        };
    }
}
VorzeA10Cyclone.DeviceInfo = new BluetoothDeviceInfo_1.BluetoothDeviceInfo(["CycSA"], ["40ee1111-63ec-4b7f-8ce7-712efd55b90e"], { tx: "40ee2222-63ec-4b7f-8ce7-712efd55b90e" }, VorzeA10Cyclone.CreateInstance);
exports.VorzeA10Cyclone = VorzeA10Cyclone;


/***/ }),

/***/ "./src/server/bluetooth/devices/WeVibe.ts":
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
const BluetoothDeviceInfo_1 = __webpack_require__("./src/server/bluetooth/BluetoothDeviceInfo.ts");
const ButtplugBluetoothDevice_1 = __webpack_require__("./src/server/bluetooth/ButtplugBluetoothDevice.ts");
const Messages = __webpack_require__("./src/core/Messages.ts");
class WeVibe extends ButtplugBluetoothDevice_1.ButtplugBluetoothDevice {
    constructor(aDeviceImpl) {
        super(`WeVibe ${aDeviceImpl.Name}`, aDeviceImpl);
        this.HandleVibrateCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            if (aMsg.Speeds.length !== 1) {
                return new Messages.Error(`WeVibe devices require VibrateCmd to have 1 speed command, ` +
                    `${aMsg.Speeds.length} sent.`, Messages.ErrorClass.ERROR_DEVICE, aMsg.Id);
            }
            return yield this.HandleSingleMotorVibrateCmd(new Messages.SingleMotorVibrateCmd(aMsg.Speeds[0].Speed, aMsg.DeviceIndex, aMsg.Id));
        });
        this.HandleStopDeviceCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            return yield this.HandleSingleMotorVibrateCmd(new Messages.SingleMotorVibrateCmd(0, aMsg.DeviceIndex, aMsg.Id));
        });
        this.HandleSingleMotorVibrateCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            const speed = Math.floor(aMsg.Speed * 15);
            const data = new Uint8Array([0x0f, 0x03, 0x00, (speed << 4) | (speed), 0x00, 0x03, 0x00, 0x00]);
            yield this._deviceImpl.WriteValue("tx", data);
            return new Messages.Ok(aMsg.Id);
        });
        this.MsgFuncs.set(Messages.StopDeviceCmd.name, this.HandleStopDeviceCmd);
        this.MsgFuncs.set(Messages.SingleMotorVibrateCmd.name, this.HandleSingleMotorVibrateCmd);
        this.MsgFuncs.set(Messages.VibrateCmd.name, this.HandleVibrateCmd);
    }
    static CreateInstance(aDeviceImpl) {
        return __awaiter(this, void 0, void 0, function* () {
            return new WeVibe(aDeviceImpl);
        });
    }
    get MessageSpecifications() {
        return {
            VibrateCmd: { FeatureCount: 1 },
            SingleMotorVibrateCmd: {},
            StopDeviceCmd: {},
        };
    }
}
WeVibe.DeviceInfo = new BluetoothDeviceInfo_1.BluetoothDeviceInfo(["4 Plus", "Ditto", "Nova", "Wish",
    "Pivot", "Verge", "Cougar", "Sync"], ["f000bb03-0451-4000-b000-000000000000"], { tx: "f000c000-0451-4000-b000-000000000000",
    rx: "f000b000-0451-4000-b000-000000000000" }, WeVibe.CreateInstance);
exports.WeVibe = WeVibe;


/***/ })

/******/ });
});