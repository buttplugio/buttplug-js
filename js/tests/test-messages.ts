import * as Messages from "../src/core/Messages";
import { fromJSON } from "../src/core/MessageUtils";
import { SetupTestSuite } from "./utils";

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
       expect(fromJSON(jsonStr)).toEqual([new Messages.Ok(2)]);
     });
  it("Converts DeviceList message from json correctly",
     () => {
       // tslint:disable-next-line:max-line-length
       const jsonStr = `
       [
        {
          "DeviceList": {
            "Id": 1,
            "Devices": [
              {
                "DeviceIndex": 0,
                "DeviceName": "Test Vibrator",
                "DeviceMessageTimingGap": 75,
                "DeviceFeatures": [
                  {
                    "Description": "Vibrator",
                    "FeatureType": "Vibrate",
                    "Output": {
                      "Vibrate": {
                        "StepCount": 20
                      }
                    }
                  }
                ] 
              },
              {
                "DeviceIndex": 1,
                "DeviceName": "Test Stroker",
                "DeviceDisplayName": "User set name",
                "DeviceMessageTimingGap": 100,
                "DeviceFeatures": [
                  {
                    "Description": "Stroker",
                    "FeatureType": "PositionWithDuration",
                    "Output": {
                      "PositionWithDuration": {
                        "StepCount": 20
                      }
                    }
                  }
                ] 
              }
            ]
          }
        }
      ]       
       `;
       expect(fromJSON(jsonStr))
        .toEqual(
            [
              new Messages.DeviceList(
                [
                  new Messages.DeviceInfo({
                    DeviceIndex: 0,
                    DeviceName: "Test Vibrator", 
                    DeviceMessageTimingGap: 75,
                    DeviceFeatures: [
                      new Messages.DeviceFeature(0, "Vibrator", Messages.FeatureType.Vibrate, new Map([[Messages.OutputType.Vibrate, new Messages.DeviceOutput(20)]]))
                    ]
                  }),
                  new Messages.DeviceInfo({
                    DeviceIndex: 1, 
                    DeviceName: "Test Stroker",
                    DeviceDisplayName: "User set name",
                    DeviceMessageTimingGap: 100,
                    DeviceFeatures: [
                      new Messages.DeviceFeature(0, "Stroker", Messages.FeatureType.PositionWithDuration, new Map([[Messages.OutputType.PositionWithDuration, new Messages.DeviceOutput(20)]]))
                    ]
                  })
                ], 
                1)
            ]);
     });
  it("Converts OutputCmd to json correctly",
     () => {
       // tslint:disable-next-line:max-line-length
       let cmd = new Messages.OutputCommand();
       cmd.Vibrate = new Messages.CommandValue(10);
       const outputCmd = new Messages.OutputCmd(0, 1, cmd, 2);
       const jsonStr = `{"OutputCmd":{"Id":2,"DeviceIndex":0,"FeatureIndex":1,"Command":{"Vibrate":{"Value":10}}}}`;
       expect(outputCmd.toJSON())
        .toEqual(jsonStr);
     });     
  it("Converts Error message from json correctly",
     () => {
       const jsonStr = '[{"Error":{"Id":2,"ErrorCode":3,"ErrorMessage":"TestError"}}]';
       expect(fromJSON(jsonStr)).toEqual([new Messages.Error("TestError",
                                                             Messages.ErrorClass.ERROR_MSG,
                                                             2)]);
     });
     /*
  it("Handles Device Commands with Subcommand arrays correctly",
     () => {
       const jsonStr = '[{"VibrateCmd":{"Id":2, "DeviceIndex": 3, "Speeds": [{ "Index": 0, "Speed": 1.0}, {"Index": 1, "Speed": 0.5}]}}]';
       expect(fromJSON(jsonStr)).toEqual([new Messages.VibrateCmd([{Index: 0, Speed: 1.0}, {Index: 1, Speed: 0.5}], 3, 2)]);
     });
     */
});
