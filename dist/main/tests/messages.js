"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Messages = require("../src/core/Messages");
var MessageUtils_1 = require("../src/core/MessageUtils");
describe("Message", function () {
    it("Converts ok message to json correctly", function () {
        var ok = new Messages.Ok(2);
        expect(ok.toJSON()).toEqual('{"Ok":{"Id":2}}');
    });
    it("Converts ok message from json correctly", function () {
        var jsonStr = '[{"Ok":{"Id":2}}]';
        expect(MessageUtils_1.FromJSON(jsonStr)).toEqual([new Messages.Ok(2)]);
    });
    it("Converts DeviceList message from json correctly", function () {
        // tslint:disable-next-line:max-line-length
        var jsonStr = '[{"DeviceList":{"Id":2,"Devices": [{"DeviceIndex":0,"DeviceName":"Test","DeviceMessages":["Ok","Ping"]},{"DeviceIndex":1,"DeviceName":"Test1","DeviceMessages":["Ok","Ping"]}]}}]';
        // tslint:disable:max-line-length
        expect(MessageUtils_1.FromJSON(jsonStr)).toEqual([new Messages.DeviceList([new Messages.DeviceInfo(0, "Test", ["Ok", "Ping"]), new Messages.DeviceInfo(1, "Test1", ["Ok", "Ping"])], 2)]);
    });
    it("Converts DeviceAdded message from json correctly", function () {
        var jsonStr = '[{"DeviceAdded":{"Id":0,"DeviceIndex":0,"DeviceName":"Test","DeviceMessages":["Ok","Ping"]}}]';
        expect(MessageUtils_1.FromJSON(jsonStr)).toEqual([new Messages.DeviceAdded(0, "Test", ["Ok", "Ping"])]);
    });
    it("Converts Error message from json correctly", function () {
        var jsonStr = '[{"Error":{"Id":2,"ErrorCode":3,"ErrorMessage":"TestError"}}]';
        expect(MessageUtils_1.FromJSON(jsonStr)).toEqual([new Messages.Error("TestError", Messages.ErrorClass.ERROR_MSG, 2)]);
    });
    it("Throws an error when trying to parse a message that breaks schema", function () {
        var jsonStr = '[{"DeviceAdded":{"Id":1,"DeviceIndex":0,"DeviceName":"Test","DeviceMessages":["Ok","Ping"]}}]';
        expect(MessageUtils_1.FromJSON(jsonStr)[0].constructor.name).toEqual("Error");
    });
    it("Handles KiirooCmd messages correctly", function () {
        var jsonStr = '[{"KiirooCmd":{"Id":1,"DeviceIndex":0,"Command":"3"}}]';
        expect(MessageUtils_1.FromJSON(jsonStr)[0].constructor.name).toEqual("KiirooCmd");
        var msg = MessageUtils_1.FromJSON(jsonStr)[0];
        expect(msg.Command).toEqual("3");
        expect(msg.GetPosition()).toEqual(3);
        var msg2 = new Messages.KiirooCmd();
        msg2.Id = 2;
        msg2.DeviceIndex = 3;
        msg2.Command = "foo";
        expect(msg2.Command).toEqual("foo");
        expect(msg2.GetPosition()).toEqual(0);
        msg2.SetPosition(4);
        expect(msg2.Command).toEqual("4");
        expect(msg2.GetPosition()).toEqual(4);
        expect(msg2.toJSON()).toEqual('{"KiirooCmd":{"Id":2,"DeviceIndex":3,"Command":"4"}}');
    });
});
//# sourceMappingURL=messages.js.map