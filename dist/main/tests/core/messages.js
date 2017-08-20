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
    it("Handles KiirooCmd messages correctly", function () {
        var jsonStr = '[{"KiirooCmd":{"Id":1,"DeviceIndex":0,"Command":"3"}}]';
        chai_1.expect(Messages.FromJSON(jsonStr)[0].constructor.name).to.equal("KiirooCmd");
        var msg = Messages.FromJSON(jsonStr)[0];
        chai_1.expect(msg.Command).to.equal("3");
        chai_1.expect(msg.GetPosition()).to.equal(3);
        var msg2 = new Messages.KiirooCmd();
        msg2.Id = 2;
        msg2.DeviceIndex = 3;
        msg2.Command = "foo";
        chai_1.expect(msg2.Command).to.equal("foo");
        chai_1.expect(msg2.GetPosition()).to.equal(0);
        msg2.SetPosition(4);
        chai_1.expect(msg2.Command).to.equal("4");
        chai_1.expect(msg2.GetPosition()).to.equal(4);
        chai_1.expect(msg2.toJSON()).to.equal('{"KiirooCmd":{"Id":2,"DeviceIndex":3,"Command":"4"}}');
    });
});
//# sourceMappingURL=messages.js.map