/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.addJSON({
  buttplug_gui_protocol: {
    options: {
      csharp_namespace: "Buttplug.Server.CLI"
    },
    nested: {
      GuiMessage: {
        oneofs: {
          msg: {
            oneof: [
              "guilog",
              "processstarted",
              "processended",
              "bplog",
              "clientconnected",
              "clientdisconnected",
              "deviceconnected",
              "devicedisconnected"
            ]
          }
        },
        fields: {
          guilog: {
            type: "GuiLog",
            id: 1
          },
          processstarted: {
            type: "ProcessStarted",
            id: 2
          },
          processended: {
            type: "ProcessEnded",
            id: 3
          },
          bplog: {
            type: "ButtplugLog",
            id: 4
          },
          clientconnected: {
            type: "ClientConnected",
            id: 5
          },
          clientdisconnected: {
            type: "ClientDisconnected",
            id: 6
          },
          deviceconnected: {
            type: "DeviceConnected",
            id: 7
          },
          devicedisconnected: {
            type: "DeviceDisconnected",
            id: 8
          }
        },
        nested: {
          GuiLog: {
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
