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
const Messages = require("../src/core/Messages");
const MessageUtils_1 = require("../src/core/MessageUtils");
const utils_1 = require("./utils");
const Messages_1 = require("../src/core/Messages");
utils_1.SetupTestSuite();
describe("Message", () => {
    it("Converts ok message to json correctly", () => {
        const ok = new Messages.Ok(2);
        expect(ok.toJSON()).toEqual('{"Ok":{"Id":2}}');
    });
    it("Converts ok message from json correctly", () => {
        const jsonStr = '[{"Ok":{"Id":2}}]';
        expect(MessageUtils_1.FromJSON(jsonStr)).toEqual([new Messages.Ok(2)]);
    });
    it("Converts DeviceList message from json correctly", () => {
        // tslint:disable-next-line:max-line-length
        const jsonStr = '[{"DeviceList":{"Id":2,"Devices": [{"DeviceIndex":0,"DeviceName":"Test","DeviceMessages":{"Ok":{},"Ping":{}}},{"DeviceIndex":1,"DeviceName":"Test1","DeviceMessages":{"Ok":{},"Ping":{}}}]}}]';
        // tslint:disable:max-line-length
        expect(MessageUtils_1.FromJSON(jsonStr)).toEqual([new Messages.DeviceList([new Messages.DeviceInfoWithSpecifications(0, "Test", { Ok: {}, Ping: {} }), new Messages.DeviceInfoWithSpecifications(1, "Test1", { Ok: {}, Ping: {} })], 2)]);
    });
    it("Converts DeviceAdded message from json correctly", () => {
        const jsonStr = '[{"DeviceAdded":{"Id":0,"DeviceIndex":0,"DeviceName":"Test","DeviceMessages":{"Ok":{},"Ping":{}}}}]';
        expect(MessageUtils_1.FromJSON(jsonStr)).toEqual([new Messages.DeviceAdded(0, "Test", { Ok: {}, Ping: {} })]);
    });
    it("Converts Error message from json correctly", () => {
        const jsonStr = '[{"Error":{"Id":2,"ErrorCode":3,"ErrorMessage":"TestError"}}]';
        expect(MessageUtils_1.FromJSON(jsonStr)).toEqual([new Messages.Error("TestError", Messages.ErrorClass.ERROR_MSG, 2)]);
    });
    it("Throws an error when trying to parse a message that breaks schema", () => {
        const jsonStr = '[{"DeviceAdded":{"Id":1,"DeviceIndex":0,"DeviceName":"Test","DeviceMessages":["Ok","Ping"]}}]';
        expect(MessageUtils_1.FromJSON(jsonStr)[0].constructor.name).toEqual("Error");
    });
    it("Handles KiirooCmd messages correctly", () => {
        const jsonStr = '[{"KiirooCmd":{"Id":1,"DeviceIndex":0,"Command":"3"}}]';
        expect(MessageUtils_1.FromJSON(jsonStr)[0].constructor.name).toEqual("KiirooCmd");
        const msg = MessageUtils_1.FromJSON(jsonStr)[0];
        expect(msg.Command).toEqual("3");
        expect(msg.GetPosition()).toEqual(3);
        const msg2 = new Messages.KiirooCmd();
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
    it("Handles Device Commands with Subcommand arrays correctly", () => {
        const jsonStr = '[{"VibrateCmd":{"Id":2, "DeviceIndex": 3, "Speeds": [{ "Index": 0, "Speed": 100}, {"Index": 1, "Speed": 50}]}}]';
        expect(MessageUtils_1.FromJSON(jsonStr)).toEqual([new Messages.VibrateCmd([{ Index: 0, Speed: 100 }, { Index: 1, Speed: 50 }], 3, 2)]);
    });
    it("Handles RequestServerInfo correctly across multiple schema versions", () => {
        const jsonV0Str = '[{"RequestServerInfo":{"Id":2,"ClientName":"TestClient"}}]';
        expect(MessageUtils_1.FromJSON(jsonV0Str)).toEqual([new Messages.RequestServerInfo("TestClient", 0, 2)]);
        const jsonV1Str = '[{"RequestServerInfo":{"Id":2,"MessageVersion":1,"ClientName":"TestClient"}}]';
        expect(MessageUtils_1.FromJSON(jsonV1Str)).toEqual([new Messages.RequestServerInfo("TestClient", 1, 2)]);
    });
    it("CreateSimple*Cmd tests", () => __awaiter(this, void 0, void 0, function* () {
        let res;
        let rej;
        const p = new Promise((resolve, reject) => { res = resolve; rej = reject; });
        const connector = yield utils_1.SetupTestServer();
        connector.Client.on("scanningfinished", () => {
            expect(MessageUtils_1.CreateSimpleVibrateCmd(connector.Client.Devices[0], 0.5))
                .toEqual(new Messages.VibrateCmd([new Messages_1.SpeedSubcommand(0, 0.5),
                new Messages_1.SpeedSubcommand(1, 0.5)]));
            expect(() => MessageUtils_1.CreateSimpleVibrateCmd(connector.Client.Devices[1], 0.5)).toThrow();
            expect(MessageUtils_1.CreateSimpleLinearCmd(connector.Client.Devices[1], 0.5, 100))
                .toEqual(new Messages.LinearCmd([new Messages_1.VectorSubcommand(0, 0.5, 100)]));
            expect(() => MessageUtils_1.CreateSimpleLinearCmd(connector.Client.Devices[0], 0.5, 100)).toThrow();
            expect(MessageUtils_1.CreateSimpleRotateCmd(connector.Client.Devices[2], 0.5, true))
                .toEqual(new Messages.RotateCmd([new Messages_1.RotateSubcommand(0, 0.5, true)]));
            expect(() => MessageUtils_1.CreateSimpleRotateCmd(connector.Client.Devices[0], 0.5, true)).toThrow();
            res();
        });
        yield connector.Client.StartScanning();
        return p;
    }));
});
//# sourceMappingURL=test-messages.js.map