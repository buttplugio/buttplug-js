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

# Version 0.11.4 - 2019/04/20

## Bugfixes

- Make noble bluetooth devices actually disconnect. Disconnect() was a
  no-op before this. Yes, really. :(

# Version 0.11.3 - 2019/04/11

## Bugfixes

- Last release was missing dist directory. Fixed npmignore/gitignore
  so that won't happen.

# Version 0.11.2 - 2019/03/16

- No changes, other library release

# Version 0.11.1 - 2019/03/15

- No changes, other library release

# Version 0.11.0 - 2019/03/09

## Features

- Updated bluetooth LE (noble) manager libraries to work with
  Buttplug.js > 0.10.0 and Node >= 10.0 (using @abandonware/noble and
  noble-mac packages).
- Version now kept in line with buttplug-js API (hence jump from 0.0.4
  to 0.11.0)

## Bugfixes

- Fixed lots of unhandled promises, turning them into exception
  throws. Also now have a linter rule to make sure this doesn't happen
  again.

## Other

- Moved CI to Azure Pipelines
- Moved project to being a monorepo for all buttplug-js core library,
  device subtype manager, connector, and server CLI projects
- Removed Windows 10 support for the time being. C# works well enough
  there, and I'm still working on getting noble-uwp to play nicely
  with the new system. Current library works on MacOS and Linux.

# Version 0.0.4 - 2018/09/29

- Updated to be in line with Buttplug-js 0.8.0 library

# Version 0.0.3 - 2018/04/06

- Switch to using noble-uwp for linux/mac/windows support

# Version 0.0.2 - 2018/02/19

- Updated to be in line with Buttplug-js 0.6.0 API

# Version 0.0.1 - 2018/01/08

- Initial Release
- Basic noble support
