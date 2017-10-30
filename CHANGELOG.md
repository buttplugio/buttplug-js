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
