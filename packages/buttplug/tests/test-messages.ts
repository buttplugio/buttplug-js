import * as Messages from "../src/core/Messages";
import { ButtplugClient } from "../src/client/Client";
import { FromJSON } from "../src/core/MessageUtils";
import { SetupTestSuite, SetupTestServer } from "./utils";
import { SpeedSubcommand, VectorSubcommand, RotateSubcommand } from "../src/core/Messages";

SetupTestSuite();

describe("Message", () => {
  it("Converts ok message to json correctly",
     () => {
       const ok = new Messages.Ok(2);
       expect(ok.toJSON()).toEqual('{"Ok":{"Id":2}}');
     });
  it("Converts ok message from json correctly",
     () => {
       const jsonStr = '[{"Ok":{"Id":2}}]';
       expect(FromJSON(jsonStr)).toEqual([new Messages.Ok(2)]);
     });
  it("Converts DeviceList message from json correctly",
     () => {
       // tslint:disable-next-line:max-line-length
       const jsonStr = '[{"DeviceList":{"Id":2,"Devices": [{"DeviceIndex":0,"DeviceName":"Test","DeviceMessages":{"Ok":{},"Ping":{}}},{"DeviceIndex":1,"DeviceName":"Test1","DeviceMessages":{"Ok":{},"Ping":{}}}]}}]';
       // tslint:disable:max-line-length
       expect(FromJSON(jsonStr)).toEqual([new Messages.DeviceList([new Messages.DeviceInfoWithSpecifications(0, "Test", {Ok: {}, Ping: {}}), new Messages.DeviceInfoWithSpecifications(1, "Test1", {Ok: {}, Ping: {}})], 2)]);
     });
  it("Converts DeviceAdded message from json correctly",
     () => {
       const jsonStr = '[{"DeviceAdded":{"Id":0,"DeviceIndex":0,"DeviceName":"Test","DeviceMessages":{"Ok":{},"Ping":{}}}}]';
       expect(FromJSON(jsonStr)).toEqual([new Messages.DeviceAdded(0, "Test", {Ok: {}, Ping: {}})]);
     });
  it("Converts Error message from json correctly",
     () => {
       const jsonStr = '[{"Error":{"Id":2,"ErrorCode":3,"ErrorMessage":"TestError"}}]';
       expect(FromJSON(jsonStr)).toEqual([new Messages.Error("TestError",
                                                             Messages.ErrorClass.ERROR_MSG,
                                                             2)]);
     });
  it("Throws an error when trying to parse a message that breaks schema",
     () => {
       const jsonStr = '[{"DeviceAdded":{"Id":1,"DeviceIndex":0,"DeviceName":"Test","DeviceMessages":["Ok","Ping"]}}]';
       expect(() => FromJSON(jsonStr)).toThrow();
     });
  it("Handles KiirooCmd messages correctly",
     () => {
       const jsonStr = '[{"KiirooCmd":{"Id":1,"DeviceIndex":0,"Command":"3"}}]';
       expect(FromJSON(jsonStr)[0].constructor.name).toEqual("KiirooCmd");
       const msg = FromJSON(jsonStr)[0];
       expect((msg as Messages.KiirooCmd).Command).toEqual("3");
       expect((msg as Messages.KiirooCmd).Position).toEqual(3);

       const msg2 = new Messages.KiirooCmd();
       msg2.Id = 2;
       msg2.DeviceIndex = 3;

       msg2.Command = "foo";
       expect(msg2.Command).toEqual("foo");
       expect(msg2.Position).toEqual(0);

       msg2.Position = 4;
       expect(msg2.Command).toEqual("4");
       expect(msg2.Position).toEqual(4);

       expect(msg2.toJSON()).toEqual('{"KiirooCmd":{"Id":2,"DeviceIndex":3,"Command":"4"}}');
     });
  it("Handles Device Commands with Subcommand arrays correctly",
     () => {
       const jsonStr = '[{"VibrateCmd":{"Id":2, "DeviceIndex": 3, "Speeds": [{ "Index": 0, "Speed": 1.0}, {"Index": 1, "Speed": 0.5}]}}]';
       expect(FromJSON(jsonStr)).toEqual([new Messages.VibrateCmd([{Index: 0, Speed: 1.0}, {Index: 1, Speed: 0.5}], 3, 2)]);
     });

  it("Handles RequestServerInfo correctly across multiple schema versions",
     () => {
       const jsonV0Str = '[{"RequestServerInfo":{"Id":2,"ClientName":"TestClient"}}]';
       expect(FromJSON(jsonV0Str)).toEqual([new Messages.RequestServerInfo("TestClient", 0, 2)]);
       const jsonV1Str = '[{"RequestServerInfo":{"Id":2,"MessageVersion":1,"ClientName":"TestClient"}}]';
       expect(FromJSON(jsonV1Str)).toEqual([new Messages.RequestServerInfo("TestClient", 1, 2)]);
     });

});
