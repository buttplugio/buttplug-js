"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const ajv = require("ajv");
const Messages = require("./Messages");
const buttplugSchema = require("../../dependencies/buttplug-schema/schema/buttplug-schema.json");
// Since we're still using the draft 06 schema, we now have to specifically add
// it to ajv, which defaults to 7.
const validator = new ajv();
validator.addMetaSchema(require("ajv/lib/refs/json-schema-draft-06.json"));
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
//# sourceMappingURL=MessageUtils.js.map