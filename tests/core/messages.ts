import { expect } from "chai";
import "mocha";
import * as Messages from "../../src/core/messages";

describe("Message", () => {
  it("Converts ok message to json correctly",
     () => {
       const ok = new Messages.Ok(2);
       expect(ok.toJSON()).to.equal('{"Ok":{"Id":2}}');
     });
  it("Converts ok message from json correctly",
     () => {
       const jsonStr = '[{"Ok":{"Id":2}}]';
       expect(Messages.FromJSON(jsonStr)).to.deep.equal([new Messages.Ok(2)]);
     });
  it("Converts DeviceList message from json correctly",
     () => {
       // tslint:disable-next-line:max-line-length
       const jsonStr = '[{"DeviceList":{"Id":2,"Devices": [{"DeviceIndex":0,"DeviceName":"Test","DeviceMessages":["Ok","Ping"]},{"DeviceIndex":1,"DeviceName":"Test1","DeviceMessages":["Ok","Ping"]}]}}]';
       // tslint:disable-next-line:max-line-length
       expect(Messages.FromJSON(jsonStr)).to.deep.equal([new Messages.DeviceList([new Messages.DeviceInfo(0, "Test", ["Ok", "Ping"]),
                                                                                  new Messages.DeviceInfo(1, "Test1", ["Ok", "Ping"])],
                                                                                 2)]);
     });
  it("Converts DeviceAdded message from json correctly",
     () => {
       const jsonStr = '[{"DeviceAdded":{"Id":0,"DeviceIndex":0,"DeviceName":"Test","DeviceMessages":["Ok","Ping"]}}]';
       expect(Messages.FromJSON(jsonStr)).to.deep.equal([new Messages.DeviceAdded(0, "Test", ["Ok", "Ping"])]);
     });
  it("Converts Error message from json correctly",
     () => {
       const jsonStr = '[{"Error":{"Id":2,"ErrorCode":3,"ErrorMessage":"TestError"}}]';
       expect(Messages.FromJSON(jsonStr)).to.deep.equal([new Messages.Error("TestError",
                                                                            Messages.ErrorClass.ERROR_MSG,
                                                                            2)]);
     });
  it("Throws an error when trying to parse a message that breaks schema",
     () => {
       const jsonStr = '[{"DeviceAdded":{"Id":1,"DeviceIndex":0,"DeviceName":"Test","DeviceMessages":["Ok","Ping"]}}]';
       expect(Messages.FromJSON(jsonStr)[0].constructor.name).to.equal("Error");
     });
});
