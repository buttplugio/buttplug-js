# Buttplug Node BluetoothLE Device Manager

[![npm](https://img.shields.io/npm/v/buttplug-node-bluetoothle-manager.svg)](https://npmjs.com/package/buttplug-node-bluetoothle-manager)
[![Build Status](https://dev.azure.com/nplabs/buttplug/_apis/build/status/buttplugio.buttplug-js?branchName=master)](https://dev.azure.com/nplabs/buttplug/_build/latest?definitionId=3&branchName=master)
[![codecov](https://codecov.io/gh/buttplugio/buttplug-js/branch/master/graph/badge.svg)](https://codecov.io/gh/buttplugio/buttplug-js) 

[![Patreon donate button](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/qdot)
[![Discourse Forum](https://img.shields.io/badge/discourse-forum-blue.svg)](https://metafetish.club)
[![Discord](https://img.shields.io/discord/353303527587708932.svg?logo=discord)](https://discord.buttplug.io)
[![Twitter](https://img.shields.io/twitter/follow/buttplugio.svg?style=social&logo=twitter)](https://twitter.com/buttplugio)

Module for adding Bluetooth LE device capabilities to native Buttplug
Node Servers (using
[buttplug-js](https://github.com/buttplugio/buttplug-js)). Uses the
[Noble package](https://github.com/sandeepmistry/noble) for accessing
native Bluetooth LE APIs.

## Table Of Contents

- [Support The Project](#support-the-project)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Usage Example](#usage-example)
- [Running without Root or Sudo on Linux](#running-without-root-or-sudo-on-linux)
- [License](#license)

## Support The Project

If you find this project helpful, you can [support us via
Patreon](http://patreon.com/qdot)! Every donation helps us afford more
hardware to reverse, document, and write code for!

## Installation

To install buttplug-js in your node project via npm, a simple add call
should do it.

```
npm add buttplug-node-bluetoothle-manager
```

## Usage Example

This module provides a DeviceManager derived class that can be added
to a Buttplug server. Not that this manager will not work with
browser-based projects, it is only meant for native node projects.
Browser-based projects can use the WebBluetooth manager that comes
as part of buttplug-js.

To add a new BluetoothLE manager:

```javascript
let Buttplug = require('buttplug');
let ButtplugBLEManager = require('buttplug-bluetoothle-manager');
let bs = new Buttplug.ButtplugServer();
bs.AddDeviceManager(new ButtplugBLEManager.ButtplugBluetoothLEDeviceManager());
// ...
```

After the manager has been added, if the server receives a
StartScanning request and has a bluetooth radio that is connected and
on, it will scan for bluetooth devices. The server can find all
devices supported by the version of buttplug-js in your project. See
the [buttplug-js
README](https://github.com/buttplugio/buttplug-js#readme) for a list
of supported devices.

## Running Without Root or Sudo on Linux

To connect to bluetooth without having to use sudo or root on Linux,
run the following command:

```
sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)
```

This grants the `node` binary `cap_net_raw` privileges, so it can
start/stop BLE advertising.

Note: The above command requires setcap to be installed, it can be
installed using the following:

* apt: `sudo apt-get install libcap2-bin`
* yum: `su -c \'yum install libcap2-bin\'`

## License

BSD 3-Clause licensed

    Copyright (c) 2017-2018, Nonpolynomial Labs, LLC
    All rights reserved.
    
    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:
    
    * Redistributions of source code must retain the above copyright notice, this
      list of conditions and the following disclaimer.
    
    * Redistributions in binary form must reproduce the above copyright notice,
      this list of conditions and the following disclaimer in the documentation
      and/or other materials provided with the distribution.
    
    * Neither the name of the project nor the names of its
      contributors may be used to endorse or promote products derived
      from this software without specific prior written permission.
    
    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
    AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
    FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
    DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
    SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
    CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
    OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
    OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
