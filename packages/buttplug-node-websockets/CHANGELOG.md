# Version 0.11.8 - 2019/07/09

## Features

- Update dependencies

# Version 0.11.7 - 2019/06/22

## Bugfixes

- Dependency security updates

# Version 0.11.6 - 2019/05/27

## Features

- Update dependencies

# Version 0.11.5 - 2019/05/02

## Features

- Update dependencies

# Version 0.11.4 - 2019/04/11

## Bugfixes

- Fixed closing of HTTP Servers during shutdown, which could throw in
  some situations.

# Version 0.11.3 - 2019/04/11

- No changes, other library release

# Version 0.11.2 - 2019/03/16

- No changes, other library release

# Version 0.11.1 - 2019/03/15

- No changes, other library release

# 0.11.0 - 2019/03/09

## Features

- Updated node-websocket libraries to work with Buttplug.js > 0.10.0
- Add ability to use Device Configuration files, eliminating need to
  change code to add devices to protocols we already support.
- Updated dependencies
- Updated websocket tests to mock-socket 8

## Bugfixes

- Fixed lots of unhandled promises, turning them into exception
  throws. Also now have a linter rule to make sure this doesn't happen
  again.

## Other

- Moved CI to Azure Pipelines
- Moved project to being a monorepo for all buttplug-js core library,
  device subtype manager, connector, and server CLI projects

# 0.0.3 - 2018/02/11

- Migrate to buttplug 0.6.0

# 0.0.2 - 2018/01/24

- Update dependencies
- Add tests

# 0.0.1 - 2017/12/04

- Initial release
- Add Server Implementation and Client Connector
