# buttplug-js

[![npm](https://img.shields.io/npm/v/buttplug.svg)](https://npmjs.com/package/buttplug) [![Build Status](https://travis-ci.org/metafetish/buttplug-js.svg?branch=master)](https://travis-ci.org/metafetish/buttplug-js) [![codecov](https://codecov.io/gh/metafetish/buttplug-js/branch/master/graph/badge.svg)](https://codecov.io/gh/metafetish/buttplug-js) [![Patreon donate button](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/qdot)

buttplug-js is a core implementation in Typescript for the Buttplug
Sex Toy Control Protocol and Server Architecture. It contains the
classes needed to implement either Buttplug clients or servers.

The buttplug-js module is required for both web and node builds, but
only contains websocket connectors and bluetooth device management for
the web. If you want to build a buttplug application in native node,
check out the [Helper Libraries](#helper-libraries) section for more
node modules that will aid development.

**Note:** As long as this library is in the v0.x library phase, expect
API breaking changes at minor version (0.x) changes. Build version
(0.?.x) version changes should just be bug fixes or non API breaking
additions.

## Table Of Contents

- [Support The Project](#support-the-project)
- [Installation](#installation)
  + [Node and NPM](#node-and-npm)
  + [Web CDN](#web-cdn)
- [API Documentation](#api-documentation)
- [Usage Example](#usage-example)
- [Web Application Developer Tools](#web-application-developer-tools)
- [Buttplug and Uglify](@buttplug-and-uglify)
- [Helper Libraries](#helper-libraries)
- [Applications Using Buttplug-JS](#applications-using-buttplug-js)
- [License](#license)

## Support The Project

If you find this project helpful, you
can
[support Metafetish projects via Patreon](http://patreon.com/qdot)!
Every donation helps us afford more hardware to reverse, document, and
write code for!

## Installation

### Node and NPM

To install buttplug-js in your node project via npm, a simple add call
should do it.

```
npm add buttplug
```

### Web CDN

As of version 0.4.0, the buttplug-js repo is also built as a browser
script via webpack, meaning you can just include it off a CDN and
start writing code!

```html
<html>
  <body>
    ...
    <script src='https://cdn.jsdelivr.net/npm/buttplug@[version]/dist/web/buttplug.min.js'></script>
    <script type='text/javascript'>
      // Buttplug library is umd, exposed as:
      // - Global: Buttplug
      // - amd: buttplug-amd
      // - commonjs: buttplug-commonjs

      // Here's hoping we don't see w3c make a Buttplug spec and collide this.
      var bpclient = new Buttplug.Client("My very own buttplug web client");
      // Now go off and do clienty things.
    </script>
  </body>
</html>
```

## API Documentation

buttplug-js API Documentation is available at
[https://metafetish.github.io/buttplug-js](https://metafetish.github.io/buttplug-js).

The documentation is rebuilt on every commit/merge to master.

We highly recommend reading through the Buttplug Protocol Spec to get
an idea of what messages are available. The Protocol Spec is available
at [https://metafetish.github.io/buttplug](https://metafetish.github.io/buttplug).

## Usage Example

An example of how a simple HTML/JS web app can use Buttplug-js is
available in the example directory, though you'll need to build the
project first. 

The example is also available for remix on
[Glitch](https://glitch.com) at
[https://how-to-buttplug.glitch.me/](https://how-to-buttplug.glitch.me/).

## Web Application Developer Tools

buttplug-js includes a set of developer tools for building web
applications, including a log viewer and a device simulator. These can
be accessed by loading the following script:

```html
<script src='https://cdn.jsdelivr.net/npm/buttplug@[version]/dist/web/buttplug-devtools.min.js'></script>
```

For more information on using Buttplug DevTools, see our glitch tutorial at
[https://how-to-buttplug-devtools.glitch.me](https://how-to-buttplug-devtools.glitch.me).

## Buttplug and Uglify

When using Buttplug with an application that will uses Uglify for
compression and minifying, make sure to set the following options:

```javascript
uglifyOptions: {
  mangle: {
    keep_fnames: true,
    keep_classnames: true
  },
  compress: {
    keep_fnames: true,
    keep_classnames: true
  }
}
```

If keep_fnames and keep_classnames are not set, the compressor and
mangler will cause the buttplug message parser to throw errors. If you
get invalid message errors, this may be why.

## Helper Libraries

- [buttplug-noble-device-manager](https://github.com/metafetish/buttplug-noble-device-manager) -
  Noble device manager for native Bluetooth Device management.
- [buttplug-node-websockets](https://github.com/metafetish/buttplug-node-websockets) -
  Websocket client and server for native node applications.
- [vue-buttplug-material-component](https://github.com/metafetish/vue-buttplug-material-component) -
  Vue.js component using [Vuetify](https://vuetifyjs.com). Provides a simple interface for
  Buttplug server connection, device management, etc.

## Applications Using Buttplug-js

- [Buttplug Playground](https://github.com/metafetish/buttplug-playground) -
  Simple testing/demo application for buttplug supported toys.
- [Syncydink](https://github.com/metafetish/syncydink) - Video player
  with sex toy synchronization features via Buttplug.
- [buttplug-twine](https://github.com/metafetish/buttplug-twine) -
  Buttplug bindings for the [Twine Interaction Fiction Game
  Engine](http://twinery.org). Allows developers to easily include
  device control in their games.

## License

buttplug-js is BSD 3-Clause licensed.

    Copyright (c) 2017-2018, Nonpolynomial Labs LLC
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

Some code and images in the buttplug-js devtools library were taken
from Funjack's
[launchcontrol](https://github.com/funjack/launchcontrol) repo. The
license is MIT.

    Lauchcontrol UI Fleshlight
    
    https://github.com/funjack/launchcontrol
    
    Copyright 2017 Funjack
    
    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:
    
    1. Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
    
    2. Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.
    
    3. Neither the name of the copyright holder nor the names of its contributors
    may be used to endorse or promote products derived from this software without
    specific prior written permission.
    
    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
    ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
    WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
    FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
    DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
    SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
    CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
    OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
    OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

