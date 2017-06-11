"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Messages = require("../../src/core/messages");
var chai_1 = require("chai");
require("mocha");
describe("Message", function () {
    it("Converts ok message to json correctly", function () {
        var ok = new Messages.Ok(2);
        chai_1.expect(ok.toJSON()).to.equal('{"Ok":{"Id":2}}');
    });
    it("Converts ok message from json correctly", function () {
        var json_str = '[{"Ok":{"Id":2}}]';
        chai_1.expect(Messages.FromJSON(json_str)).to.deep.equal([new Messages.Ok(2)]);
    });
    // it ("Converts DeviceList message from json correctly",
    //     () => {
    //       let json_str = '{"DeviceList":{"Id":2,"Devices": [{"DeviceIndex":0,"DeviceName":"Test","DeviceMessages":["Ok","Ping"]},{"DeviceIndex":1,"DeviceName":"Test1","DeviceMessages":["Ok","Ping"]}]}}';
    //       console.log(Messages.FromJSON(json_str));
    //       //expect().to.not.throw();
    //     });
    // it ("Converts DeviceAdded message from json correctly",
    //     () => {
    //       let json_str = '{"DeviceAdded":{"Id":2,"DeviceIndex":0,"DeviceName":"Test","DeviceMessages":["Ok","Ping"]}}';
    //       console.log(Messages.FromJSON(json_str));
    //       //expect().to.not.throw();
    //     });
});
//# sourceMappingURL=messages.js.map