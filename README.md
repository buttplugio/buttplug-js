# Buttplug JS Multirepo

[![Patreon donate button](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/qdot)
[![Discourse Forum](https://img.shields.io/badge/discourse-forum-blue.svg)](https://metafetish.club)
[![Discord](https://img.shields.io/discord/353303527587708932.svg?logo=discord)](https://discord.gg/t9g9RuD)
[![Twitter](https://img.shields.io/twitter/follow/buttplugio.svg?style=social&logo=twitter)](https://twitter.com/buttplugio)

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

## Table Of Contents

- [Support The Project](#support-the-project)
- [Projects In This Multirepo](#projects-in-this-multirepo)
- [Applications Using Buttplug-JS](#applications-using-buttplug-js)
- [License](#license)

## Support The Project

If you find this project helpful, you
can
[support Buttplug projects via Patreon](http://patreon.com/qdot)!
Every donation helps us afford more hardware to reverse, document, and
write code for!

## Projects in this Multirepo

- [Buttplug](packages/buttplug) 
  - Main buttplug javascript/typescript library. Core implementation
    in Typescript for the Buttplug Sex Toy Control Protocol and Server
    Architecture. It contains the classes needed to implement both
    Buttplug clients or servers, as well as protocol definitions for
    devices Buttplug can use. Comes "batteries included" for web
    browser use, with device handlers for various web APIs
    (WebBluetooth, WebUSB, WebGamepad, etc...), and websocket client
    handlers for browsers.
- [Buttplug Node BTLE Manager](packages/buttplug-node-bluetoothle-manager)
  - [Noble](https://github.com/noble/noble) based implementation of
    a Buttplug Device Subtype Manager, for use with native versions
    of Buttplug on Window/Mac/Linux.
- [Buttplug Node Websockets](packages/buttplug-node-websockets)
  - [ws](https://github.com/websockets/ws) based Websocket connectors
    for native buttplug clients and servers.
- [Buttplug Server CLI](packages/buttplug-server-cli)
  - Command Line server for running native node servers.
  
## Applications Using Buttplug-js

- [Buttplug Playground](https://github.com/metafetish/buttplug-playground) -
  Simple testing/demo application for buttplug supported toys.
- [Syncydink](https://github.com/metafetish/syncydink) - Video player
  with sex toy synchronization features via Buttplug.
- [buttplug-twine](https://github.com/buttplugio/buttplug-twine) -
  Buttplug bindings for the [Twine Interaction Fiction Game
  Engine](http://twinery.org). Allows developers to easily include
  device control in their games.

## License

All Buttplug JS projects are BSD 3-Clause licensed.

    Copyright (c) 2017-2019, Nonpolynomial Labs LLC
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


