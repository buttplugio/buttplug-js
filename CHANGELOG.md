# Version 0.10.0 - 2018/12/03

- Add way to pass loggers into DeviceSubtypeManagers (to bridge module scope issues)
- Fix type error for Device Manager message callbacks

# Version 0.9.0 - 2018/12/02

- Move core/Device to client/ButtplugClientDevice, since only client uses it.
- Create convenience Device command functions on ButtplugClientDevice.
- Add specific Buttplug exception types.
- Fix up error handling to always throw exceptions.
- Add connection semantics to server.
- Update dependencies.

# Version 0.8.3 - 2018/11/24

- Added Lovense Osci support
- Updated schema with bugfixes to generic commands

# Version 0.8.2 - 2018/07/12

- Add Vorze UFO SA support

# Version 0.8.1 - 2018/07/02

- Make DevTools/Simulator loadable as a module
- Fix bug in characteristic map calculation (caused Fleshlight Launch to stop working on 0.8.0)
- Fix output of speed/position values in Simulator
- Fix bug in DeviceList message construction in Server
- Various other Simulator fixes.

# Version 0.8.0 - 2018/06/27

- Add BLE GATT Characteristic reading functions
- Add ability to derive Lovense hardware info from device queries (no more name/UUID chasing)
- Namespace devtools CSS rules to fix issue with CSS conflicts in devtools
- Change Signature of CreateSimple*Message functions (breaking change)
- Add IsScanning boolean getter to Client

# Version 0.7.1 - 2018/05/02

- Extra build config changes to fix webpack issues

# Version 0.7.0 - 2018/05/02

- Rolling version number due to device API change (added "Disconnect" method)
- Update to Webpack 4
- Fix server cleanup on shutdown (remove listeners, disconnect devices)
- Add more Lovense device names/info

# Version 0.6.1 - 2018/03/08

- Expose feature counts of device command messages
- Add CreateSimple*Cmd functions
- Add new Lovense and WeVibe device names
- Device counts now start at 0 instead of 1

# Version 0.6.0 - 2018/02/05

- Rolling version number due to devtools API change
- TestDeviceManager no longer a singleton. That was a bad idea in the first place.
- TestDeviceManagerPanel now requires a ButtplugServer as a parameter
- Added Connector getter in ButtplugClient, as sometimes it's handy to pull an embedded connector
  and get the Server from it (For things like the TestDeviceManagerPanel).
- Devices now have internal IDs, so deviceadded isn't fired multiple times for the same device
- Added basic MaxPro Smart Vibrator support

# Version 0.5.3 - 2018/01/29

- Fix bug in devtools web exports
- Add more styles to log panel so outside styles don't affect it.

# Version 0.5.2 - 2018/01/26

- Fix webpack settings so mangling doesn't destroy parser
- Add new IDs for Lovense Domi and Lush

# Version 0.5.1 - 2018/01/23

- Remove node websocket connector and server, since it doesn't build/include nicely as a submodule. (#87)

# Version 0.5.0 - 2018/01/22

- Added Buttplug Spec v1 implementation
  - More generic message types (VibrateCmd, RotateCmd, LinearCmd)
  - Message attributes (device feature counts)
  - Message downgrading capabilities
- Added tests. So many tests.
- Divided devtools into core and web directories
- Updated devtools to depend on buttplug as an external library (makes file sizes smaller)
- Library now uses es6 by default
- Lots of bug fixes due to aforementioned tests (Wevibe control issues, missing error message, etc...)

# Version 0.4.3 - 2018/01/16

- Fix many logging bugs
- Add more log messages to library
- Add devtools module, with log viewer, test device manager, and device visualizer
- Add Node websocket connector and server, for native server capabilities

# Version 0.4.2 - 2018/01/08

- Added support for new Lovense devices (Domi with new firmware)

# Version 0.4.1 - 2018/01/07

- Message types can now be accessed via getter ([Message].Type)
- Client now emits "disconnect" event on disconnection (either user or server triggered)
- Fixed bug where ping timer wouldn't stop on disconnect
- Moved test system to jest
- Removed dependency on text-encoding package
- Added support for new Lovense devices (Hush with new firmware)

# Version 0.4.0 - 2017/12/03

- Add webpack config to build library for web on release
- Expose IButtplugConnector for building external connector interfaces
- Actually write usage information in the README

# Version 0.3.2 - 2017/12/02

- Remove dist from .gitignore in release branch. Again. Ugh.

# Version 0.3.1 - 2017/12/02

- Create generic connect function to allow users to define their own connectors
- Documentation updates
- Added more WeVibe names

# Version 0.3.0 - 2017/10/29

- Remove all default exports, require verbose include
- Prepare library for use with node servers as well as web browser servers

# Version 0.2.2 - 2017/10/28

- Fix emission of "scanningfinished" event and message in client/server

# Version 0.2.1 - 2017/10/11

- Added WebBluetooth support for the Vorze A10 Cyclone 
- Fixed types in VorzeA10CycloneCmd message

# Version 0.2.0 - 2017/10/08

- Simplified Client types. Now one client type with Websocket and Local connection functions.
- Fixed bug where outbound messages were not checked against the message schema.

# Version 0.1.1 - 2017/10/06

- Add Lovense Domi, WeVibe toy support to server
- Add ability to query for browser Bluetooth Support in server

# Version 0.1.0 - 2017/08/20

- Added Server functionality, with WebBluetooth device manager
- Added logging system
- Fixed KiirooCmd format

# Version 0.0.9 - 2017/07/22

- Start cleaning up library to prepare for Server implementation
- Add VorzeA10CycloneCmd message

# Version 0.0.8 - 2017/07/21

- Add JSON schema validation

# Version 0.0.7 - 2017/07/19

- Add StopAllDevices function to client

# Version 0.0.6 - 2017/07/16

- Update of v0.0.5 with built files included

# Version 0.0.5 - 2017/07/16

- Add client disconnect functionality
- Test updates

# Version 0.0.4 - 2017/07/13

- Add ErrorCode support to error messages
- tslint addition and cleanup

# Version 0.0.3 - 2017/06/13

- Repo cleanup, typescript library additions

# Version 0.0.2 - 2017/06/11

- First released version of library
- Core device/message implementation
- Simple webclient with ability to connect over websockets, get device lists, send device messages

# Version 0.0.1 - 2016/07/08

- Project Repo Started
