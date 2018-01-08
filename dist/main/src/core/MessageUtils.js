"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var class_transformer_1 = require("class-transformer");
var ajv = require("ajv");
var Messages = require("./Messages");
var buttplugSchema = require("../../dependencies/buttplug-schema/schema/buttplug-schema.json");
// Since we're still using the draft 06 schema, we now have to specifically add
// it to ajv, which defaults to 7.
var validator = new ajv();
validator.addMetaSchema(require("ajv/lib/refs/json-schema-draft-06.json"));
var jsonValidator = validator.compile(buttplugSchema);
function CheckMessage(aMsgObj) {
    if (jsonValidator([aMsgObj.toProtocolFormat()])) {
        return;
    }
    // Relay validator errors as an error message locally.
    var errorString = jsonValidator.errors.map(function (error) { return error.message; }).join("; ");
    throw new Error(errorString);
}
exports.CheckMessage = CheckMessage;
function FromJSON(str) {
    var msgarray = JSON.parse(str);
    if (!jsonValidator(msgarray)) {
        // Relay validator errors as an error message locally.
        var errorString = jsonValidator.errors.map(function (error) { return error.message; }).join("; ");
        return [new Messages.Error(errorString, Messages.ErrorClass.ERROR_MSG, 0)];
    }
    var msgs = [];
    for (var _i = 0, _a = Array.from(msgarray); _i < _a.length; _i++) {
        var x = _a[_i];
        // Can't get this to resolve nicely as a type, so just start from any and cast
        // after. Not sure how to resolve plainToClass to a type since this is
        // dynamic.
        var msg = class_transformer_1.plainToClass(Messages[Object.getOwnPropertyNames(x)[0]], x[Object.getOwnPropertyNames(x)[0]]);
        msgs.push(msg);
    }
    return msgs;
}
exports.FromJSON = FromJSON;
//# sourceMappingURL=MessageUtils.js.map