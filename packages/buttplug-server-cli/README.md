# Buttplug Node.js Websocket Server

[![npm](https://img.shields.io/npm/v/buttplug.svg)](https://npmjs.com/package/buttplug) 
[![Build Status](https://travis-ci.org/buttplugio/buttplug-js.svg?branch=master)](https://travis-ci.org/buttplugio/buttplug-js) 
[![codecov](https://codecov.io/gh/buttplugio/buttplug-js/branch/master/graph/badge.svg)](https://codecov.io/gh/buttplugio/buttplug-js) 

[![Patreon donate button](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/qdot)
[![Discourse Forum](https://img.shields.io/badge/discourse-forum-blue.svg)](https://metafetish.club)
[![Discord](https://img.shields.io/discord/353303527587708932.svg?logo=discord)](https://discord.gg/t9g9RuD)
[![Twitter](https://img.shields.io/twitter/follow/buttplugio.svg?style=social&logo=twitter)](https://twitter.com/buttplugio)

Native websocket server frontend for Buttplug. 

This frontend is mainly for use on Windows 7 alpha builds of the
Buttplug server. It may also work on linux, macOS, and windows 10.

**Note:** This project is provided as an example and **without support**.
If you want to try it, you are on your own, and it may or may not
work. Dependencies may or may not be up to date with the main library
repos. This message will be removed if/when the project moves to being
supported, but right now the build system and native dependency
requirements are way to flaky to recommend to anyone not familiar
with node and native libraries.

## Table Of Contents

- [Support The Project](#support-the-project)
- [Installation](#installation)

## Support The Project

If you find this project helpful, you can [support us on
Patreon](http://patreon.com/qdot)! Every donation helps us afford more
hardware to reverse, document, and write code for!

## IMPORTANT BUILD NOTE

**USE YARN TO INSTALL THIS**

Installing with npm will break the native dependencies required for
our bluetooth dependencies. Only use yarn to install this.

## Installation

```
yarn build
```

To run the server after it is built, run the following command:

```
yarn start
```

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
