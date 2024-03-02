# v3.2.2 (2024/03/02)

## Bugfixes

- Actually throw exceptions when there are websocket connection issues. (#257)

# v3.2.1 (2023/09/23)

## Bugfixes

- Fix issue with name minifying causing problems with class name reflection (again, see v3.1.0 notes
  for the first round of this)

# v3.2.0 (2023/09/23)

## Features

- Web package building now uses vite instead of webpack
  - Long live vite. May I never have to fucking deal with webpack ever again.

## Bugfixes

- Cleaned up naming conventions
- Changed connector interface (this is technically a breaking change but afaik no one else
  implements their own connector)
- Fix linear attribute enumeration

# v3.1.1 (2023/02/18)

## Bugfixes

- Replace events with eventemitter3
  - API Compatible and easier for building across web/node
- Remove blob reading from websocket connectors
  - We never use binary messages on websockets, and the extra filereader dep for node was
    causing issues with web builds.

# v3.1.0 (2023/02/11)

## Features

- Added support for Node Websockets via new connector class (#244)

## Bugfixes

- Fixed issues with using buttplug-js in minified projects (#246)
  - Changed from type-based class resolution to static naming, class name mangling should no longer
    be an issue.

# v3.0.0 (2022/12/30)

## Features

- Back to pure Typescript. Back to the good shit.
- Removed server
- Brought implementation in line with the FFI Client API, so minimal changes should be needed for
  porting from v1.

# v2.0.0

## Whatever

- There is no buttplug-js v2
- There is no Miss Zarves
- (Version skipped to align JS and C# implementation versions, which will probably fall out of
  alignment again very quickly)

# v1.0.16 (2021/10/16) (FFI Impl)

## Bugfixes

- Revert WASM loading specification to fix webpack/MIME issues

# v1.0.15 (2021/08/29) (FFI Impl)

## Features

- Update to buttplug v5

## Bugfixes

- Allow specification of WASM loading source for buttplug_init()
- ButtplugClientDevice equality testing now works as expected

# v1.0.14 (2021/03/21) (FFI Impl)

## Bugfixes

- Actually fix #60 and #51

# v1.0.13 (2021/03/21) (FFI Impl)

## Features

- Update to buttplug-rs v2.1.7, adds Lovehoney Desire Egg support

## Bugfixes

- #60: Expose Buttplug.Endpoint type publicly so Raw commands are usable
- #59: Client device vibrate() call should take an array of numbers
- #51: Fix ScanningFinished emission for WebBluetooth

# v1.0.12 (2021/02/20) (FFI Impl)

## Bugfixes

- Actually build the project before publishing this time. This is why I have CI. Why am I hand
  publish the project? (Because I am lazy. So lazy.)

# v1.0.11 (2021/02/20)

## Bugfixes

- Remove publicpath setting in CDN bundler.

# v1.0.10 (2021/02/20) (FFI Impl)

## Bugfixes

- Implement characteristic read in WebBluetooth WASM
  - Allows us to use the Handy on the web

# v1.0.9 (2021/02/20) (FFI Impl)

## Bugfixes

- Update to buttplug-rs v2.1.5. The Handy support, client connect race bugfixes, device
  disconnection panic bugfixes.

# v1.0.8 (2021/02/10) (FFI Impl)

## Features

- Update to buttplug-rs v2.1.3, lots more tests/fixes, Lovense Diamo support
- Update to buttplug-rs-ffi core v1.0.12, fixes disconnect issues in WebBluetooth, updates
  connector API for buttplug-rs v2.1.x API

# v1.0.7 (2021/01/24) (FFI Impl)

## Bugfixes

- Update to buttplug-rs v2.0.5, fixes issue with DeviceMessageInfo deserialization

# v1.0.6 (2021/01/24) (FFI Impl)

## Bugfixes

- Print message and bail early if buttplugInit is called again after successful load.
  - This most likely exited quietly without breaking anything before, but now it's at least spewing
    some status too.
- Update to buttplug-rs v2.0.4, fixing issues with native timers being compiled instead of WASM
  timers.

# v1.0.5 (2021/01/22) (FFI Impl)

## Bugfixes

- #49: Fix issue with incorrect type check on linear commands.

# v1.0.4 (2021/01/21) (FFI Impl)

## Features

- Update to Buttplug-rs v2.0.3
  - Fixes issues with Strokers/rotators not showing up due to invalid message attributes.

# v1.0.3 (2021/01/18) (FFI Impl)

## Features

- Update to Buttplug-rs v2.0.0
  - Lovense Ferri support
  - Init/Event API cleanup
- Panic messages/stacks now emitted on WASM panic

# v1.0.2 (2021/01/10) (FFI Impl)

## Features

- Update to Buttplug-rs v1.0.5, with Libo and Prettylove support

# v1.0.1 (2020/12/29) (FFI Impl)

## Bugfixes

- Add protobufjs to dependencies, otherwise typescript compilation files during type resolution.

# v1.0.0 (2020/12/27) (FFI Impl)

## Features

- Update to Buttplug v1, with new device config file format.
- Change package name back to "buttplug"

# v1.0.0 Beta 7 (2020/12/20) (FFI Impl)

## Bugfixes

- Fix browser websockets not throwing errors on invalid URLs or connection errors.

# v1.0.0 Beta 6 (2020/12/20) (FFI Impl)

## Bugfixes

- Fix webpack build/load strategies for static (CDN loadable) web package.

# v1.0.0 Beta 5 (2020/12/19) (FFI Impl)

## Features

- Completely rewrite surface API in Typescript, now uses core protobuf library, same as the other
  FFI layers.
- Added log output capabilities (console only at the moment).

# v1.0.0 Beta 4 (2020/12/05) (FFI Impl)

## Features

- Actually throw error types instead of just casting to strings. Error types are reduces from Rust's
  verbose enums, but this is good enough.
- Add stop() method to devices.

# v1.0.0 Beta 3 (2020/12/04) (FFI Impl)

## API Changes

- Make a single connect method on ButtplugClient
  - Brings API closer to other/old implementations

# Version 0.13.2 - 2020/08/25

## Bugfixes

- Make Android use WebBluetooth's acceptAllDevices so Lovense shows up again
  - namePrefix, which we use to wildcard Lovense devices, broke in Chrome 81.
    Fix is tracked for Chrome 87.
- Fix type mismatch in inherited methods in ForwardedDeviceProtocol.

# Version 0.13.1 - 2020/04/04

## Features

- Added support for Connector Initializer
  - Allows using the Buttplug connector for auth or other communication before
    spinning up the protocol itself.

# Version 0.13.0 - 2020/03/29

## Features

- Added Device Forwarder Support
  - Allows developers to create a device manager that can accept "forwarded"
    devices from another client. Basically turns Buttplug into a full
    teledildonics system, using its own protocol.
- ButtplugClientDevice now emits "deviceremoved" when it is disconnected.
  - This is alongside the client emitting it.

## Bugfixes

- Fixed WeVibe Melt support
- Fixed references to buttplug-server-cli in README
  - This is now at https://github.com/intiface/intiface-node-cli

# Version 0.12.3 - 2020/03/25

## Features

- Added Hardware Support
  - WebGamepad Haptics on Chrome

# Version 0.12.2 - 2019/12/06

## Features

- Added Hardware Support
  - WeVibe Vector
  - Magic Motion Vini, Fugu, Awaken, Equinox, Solstice

# Version 0.12.1 - 2019/10/05

## Features

- Add Motorbunny Support

# Version 0.12.0 - 2019/07/27

## Features

- Allow loading of device configuration file from CDN
  (https://buttplug-device-config.buttplug.io)
- Remove yaml requirement for device config file, just use JSON (Saves
  30% library size)

# Version 0.11.8 - 2019/07/09

## Bugfixes

- Updated built in device config file, including Cyclone SA fixes.

# Version 0.11.7 - 2019/06/22

## Bugfixes

- Dependency security updates

# Version 0.11.6 - 2019/05/27

## Features

- Added hardware support
  - Kiiroo Onyx 2
  - Kiiroo Pearl 2
  - Kiiroo/OhMiBod Fuse
  - Kiiroo Virtual Blowbot
  - Kiiroo Titan
  - Libo PiPiJing Elle/Whale
  - Libo Xiao Lu (Lottie)
  - Libo Lu Xiao Han (Lulu)
  - Libo Suo Yin Qiu (Karen)
  - Libo Bai Hu (LaLa)
  - Libo/Sistalk MonsterPub
  - Youcups Warrior 2
  - Vorze Bach
  - A whole bunch of Magic Motion toys I'm not gonna list here.

# Version 0.11.5 - 2019/05/02

## Features

- Change WebBluetooth calls to work with iOS WebBLE app

# Version 0.11.3 - 2019/04/11

## Features

- Updates dependencies, but otherwise this is a dependent library release.

# Version 0.11.2 - 2019/03/16

## Bugfixes

- Roll back to using webpack for web libraries until Rollup is fixed.

# Version 0.11.1 - 2019/03/15

## Features

- Update CLI to work with Intiface
- That's it. No other changes. Maybe this Monorepo and lockstepped
  versioning thing wasn't such a good idea. :/

# Version 0.11.0 - 2019/03/09

## Features

- ButtplugBrowserWebsocketConnector now exported from library
- Add ability to use Device Configuration files, eliminating need to
  change code to add devices to protocols we already support.
- Add Youou Wand support

## Bugfixes

- Fixed lots of unhandled promises, turning them into exception
  throws. Also now have a linter rule to make sure this doesn't happen
  again.

## Other

- Moved CI to Azure Pipelines
- Moved project to being a monorepo for all buttplug-js core library,
  device subtype manager, connector, and server CLI projects
- Removed Devtools package for time being, needs to be turned into its
  own module.
- Not currently building CLIs for windows, because noble-uwp was
  having some problems compiling.
- Removed ConnectLocal/ConnectWebsocket functions from Client, now
  requires a connector object.

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
