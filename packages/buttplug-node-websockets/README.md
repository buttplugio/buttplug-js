# Buttplug Node Websockets

[![npm](https://img.shields.io/npm/v/buttplug-node-websockets.svg)](https://npmjs.com/package/buttplug-node-websockets) 
[![Build Status](https://dev.azure.com/nplabs/buttplug/_apis/build/status/buttplugio.buttplug-js?branchName=master)](https://dev.azure.com/nplabs/buttplug/_build/latest?definitionId=3&branchName=master)
[![codecov](https://codecov.io/gh/buttplugio/buttplug-node-websockets/branch/master/graph/badge.svg)](https://codecov.io/gh/buttplugio/buttplug-node-websockets) 

[![Patreon donate button](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/qdot)
[![Discourse Forum](https://img.shields.io/badge/discourse-forum-blue.svg)](https://metafetish.club)
[![Discord](https://img.shields.io/discord/353303527587708932.svg?logo=discord)](https://discord.buttplug.io)
[![Twitter](https://img.shields.io/twitter/follow/buttplugio.svg?style=social&logo=twitter)](https://twitter.com/buttplugio)

buttplug-node-websockets provides convenience client/server classes
built on top of [ws](https://github.com/websockets/ws) and
[buttplug-js](https://github.com/buttplugio/buttplug-js). It allows
developers to quickly integrate buttplug clients and servers into
native node applications.

## Table Of Contents

- [Support The Project](#support-the-project)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Usage Example](#usage-example)
- [License](#license)

## Support The Project

If you find this project helpful, you
can
[support Buttplugio projects via Patreon](http://patreon.com/qdot)!
Every donation helps us afford more hardware to reverse, document, and
write code for!

## Installation

To install buttplug-js in your node project via npm, a simple add call
should do it.

```
npm add buttplug-node-websockets
```

buttplug-node-websockets is considered a plugin for buttplug-js, and
has buttplug as a peer dependency. You will need to add buttplug-js >=
0.4.0 to the project that is using buttplug-node-websockets in order
for this to work correctly.

## API Documentation

buttplug-node-websocket API Documentation is available at
[https://buttplug-node-websockets.docs.buttplug.io](https://buttplug-node-websockets.docs.buttplug.io).

The documentation is rebuilt on every commit/merge to master.

## Usage Example

### Server

The client class provided with this library derives from the
ButtplugServer class, and can be used as a standalone server.

```javascript
let Buttplug = require('buttplug');
let ButtplugNodeWebsockets = require('buttplug-node-websockets');

let server = new ButtplugNodeWebsocket.ButtplugNodeWebsocketServer();

// Insecure hosting, on localhost:12345
server.StartInsecureServer()

// Secure hosting, on 192.168.1.2:6969
// Cert and Private should be paths to cert/private files
server.StartSecureServer("./cert.pem", "./private.pem", 6969, "192.168.1.2");

// ...
```

If you need to create a local secure server with self-signed
certificate (for instance, for accessing the server from a web app on
an https server), we recommend using the
[selfsigned](https://www.npmjs.com/package/selfsigned) package.

### Client (Connector)

The client class provided with this library implements the
IButtplugConnector interface, and needs to be passed to a
ButtplugClient class during connection.

```javascript
let Buttplug = require('buttplug');
let ButtplugNodeWebsockets = require('buttplug-node-websockets');

// The connector takes the websocket URL to connect to, and a boolean
// to know whether to reject on cert fail if connecting via secure
// websockets.
//
// If you are connecting to a local server, there is a good chance 
// it will be using a self-signed cert. You will need to pass 'false'
// as the second argument so the cert if not rejected. If you will 
// only be connecting to servers with actual CA verifiable certs,
// pass 'true'.
let connector = 
  new ButtplugNodeWebsocket.ButtplugNodeWebsocketClientConnector("wss://localhost:12345/buttplug", false);

let bpc = new bp.ButtplugClient("test");
bpc.Connect(connector);
// ...
```

## License

buttplug-js is BSD 3-Clause licensed.

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
