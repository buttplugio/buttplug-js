/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.addJSON({
  ButtplugGuiProtocol: {
    options: {
      csharp_namespace: "Buttplug.Server.CLI"
    },
    nested: {
      ServerControlMessage: {
        oneofs: {
          msg: {
            oneof: [
              "stop"
            ]
          }
        },
        fields: {
          stop: {
            type: "Stop",
            id: 1
          }
        },
        nested: {
          Stop: {
            fields: {}
          }
        }
      },
      ServerProcessMessage: {
        oneofs: {
          msg: {
            oneof: [
              "processStarted",
              "processError",
              "processEnded",
              "processLog",
              "buttplugLog",
              "clientConnected",
              "clientDisconnected",
              "deviceConnected",
              "deviceDisconnected"
            ]
          }
        },
        fields: {
          processStarted: {
            type: "ProcessStarted",
            id: 1
          },
          processError: {
            type: "ProcessError",
            id: 2
          },
          processEnded: {
            type: "ProcessEnded",
            id: 3
          },
          processLog: {
            type: "ProcessLog",
            id: 4
          },
          buttplugLog: {
            type: "ButtplugLog",
            id: 5
          },
          clientConnected: {
            type: "ClientConnected",
            id: 6
          },
          clientDisconnected: {
            type: "ClientDisconnected",
            id: 7
          },
          deviceConnected: {
            type: "DeviceConnected",
            id: 8
          },
          deviceDisconnected: {
            type: "DeviceDisconnected",
            id: 9
          }
        },
        nested: {
          ProcessLog: {
            fields: {
              message: {
                type: "string",
                id: 1
              }
            }
          },
          ProcessStarted: {
            fields: {}
          },
          ProcessError: {
            fields: {
              message: {
                type: "string",
                id: 1
              }
            }
          },
          ProcessEnded: {
            fields: {}
          },
          ButtplugLog: {
            fields: {
              message: {
                type: "string",
                id: 1
              }
            }
          },
          ClientConnected: {
            fields: {
              clientName: {
                type: "string",
                id: 1
              }
            }
          },
          ClientDisconnected: {
            fields: {}
          },
          DeviceConnected: {
            fields: {
              deviceName: {
                type: "string",
                id: 1
              },
              deviceId: {
                type: "uint32",
                id: 2
              }
            }
          },
          DeviceDisconnected: {
            fields: {
              deviceId: {
                type: "uint32",
                id: 1
              }
            }
          }
        }
      }
    }
  }
});

module.exports = $root;
