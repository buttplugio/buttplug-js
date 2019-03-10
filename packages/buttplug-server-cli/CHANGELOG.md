# Version 0.11.0 - 2019/03/09

## Features

- Changed name from buttplug-js-websocket-server to
  buttplug-server-gui
- Added buttplug-server-cli project, to provide a native command line
  server. Currently works with websockets, will be adding IPC in the
  next release.
- Add ability to use Device Configuration files, eliminating need to
  change code to add devices to protocols we already support.
- Added freeze targets for mac/linux/rpi.
- Runs on Raspberry Pi Zero, though requires special builds to do so.
- Up'd version to be in line with buttplug-js core library.

## Bugfixes

- Fixed lots of unhandled promises, turning them into exception
  throws. Also now have a linter rule to make sure this doesn't happen
  again.

## Other

- Moved CI to Azure Pipelines
- Moved project to being a monorepo for all buttplug-js core library,
  device subtype manager, connector, and server CLI projects
- Now uses buttplug-node-websockets instead of implementing its own
  connectors.

# Version 0.0.3 - 2018/09/29

- Update deps
- Move to using bluetoothle manager module

# Version 0.0.2 - 2017/11/11

- Add Win7 freezing support

# Version 0.0.1 - 2017/09/10

- Initial build with bluetooth driver and websocket server
