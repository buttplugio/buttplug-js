"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var Messages = require("../../src/core/Messages");
describe("Message", function () {
    it("Converts ok message to json correctly", function () {
        var ok = new Messages.Ok(2);
        chai_1.expect(ok.toJSON()).to.equal('{"Ok":{"Id":2}}');
    });
    it("Converts ok message from json correctly", function () {
        var jsonStr = '[{"Ok":{"Id":2}}]';
        chai_1.expect(Messages.FromJSON(jsonStr)).to.deep.equal([new Messages.Ok(2)]);
    });
    it("Converts DeviceList message from json correctly", function () {
        // tslint:disable-next-line:max-line-length
        var jsonStr = '[{"DeviceList":{"Id":2,"Devices": [{"DeviceIndex":0,"DeviceName":"Test","DeviceMessages":["Ok","Ping"]},{"DeviceIndex":1,"DeviceName":"Test1","DeviceMessages":["Ok","Ping"]}]}}]';
        // tslint:disable-next-line:max-line-length
        chai_1.expect(Messages.FromJSON(jsonStr)).to.deep.equal([new Messages.DeviceList([new Messages.DeviceInfo(0, "Test", ["Ok", "Ping"]),
                new Messages.DeviceInfo(1, "Test1", ["Ok", "Ping"])], 2)]);
    });
    it("Converts DeviceAdded message from json correctly", function () {
        var jsonStr = '[{"DeviceAdded":{"Id":0,"DeviceIndex":0,"DeviceName":"Test","DeviceMessages":["Ok","Ping"]}}]';
        chai_1.expect(Messages.FromJSON(jsonStr)).to.deep.equal([new Messages.DeviceAdded(0, "Test", ["Ok", "Ping"])]);
    });
    it("Converts Error message from json correctly", function () {
        var jsonStr = '[{"Error":{"Id":2,"ErrorCode":3,"ErrorMessage":"TestError"}}]';
        chai_1.expect(Messages.FromJSON(jsonStr)).to.deep.equal([new Messages.Error("TestError", Messages.ErrorClass.ERROR_MSG, 2)]);
    });
    it("Throws an error when trying to parse a message that breaks schema", function () {
        var jsonStr = '[{"DeviceAdded":{"Id":1,"DeviceIndex":0,"DeviceName":"Test","DeviceMessages":["Ok","Ping"]}}]';
        chai_1.expect(Messages.FromJSON(jsonStr)[0].constructor.name).to.equal("Error");
    });
});
//# sourceMappingURL=messages.js.map