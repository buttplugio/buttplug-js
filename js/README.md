# Buttplug Typescript/JS Client Implementation

[![Patreon donate button](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/qdot)
[![Github donate button](https://img.shields.io/badge/github-donate-ff69b4.svg)](https://www.github.com/sponsors/qdot)

[![Discourse Forum](https://img.shields.io/badge/discourse-forum-blue.svg)](https://discuss.buttplug.io)
[![Discord](https://img.shields.io/discord/353303527587708932.svg?logo=discord)](https://discord.buttplug.io)
[![Twitter](https://img.shields.io/twitter/follow/buttplugio.svg?style=social&logo=twitter)](https://twitter.com/buttplugio)

A implementation of the Buttplug Client in Typescript/Javascript, implementing the Version 3
Buttplug Spec. It is expected to run from a browser against either [Intiface Central
(GUI)](https://intiface.com/central), [Initface Engine
(CLI)](https://github.com/intiface/intiface-engine), or [the Buttplug WASM Server](https://github.com/buttplugio/buttplug-js).

## Compilation information

buttplug-js builds to 3 different types of library:

- CommonJS for node
- UMD and ES Modules for the web

For node, simply include the package as you would any other package.

For inclusion in web projects, the UMD project can be found at `dist/web/buttplug.js` (Note that the namespace is `buttplug`, so you'll access types like `buttplug.ButtplugClient`, etc...), and the es6 module at `dist/web/buttplug.mjs`.

## Using buttplug-js with Node

buttplug-js works with both pure web builds, as well as node applications. To use buttplug-js with
node, use the `ButtplugNodeWebsocketClientConnector` class instead of the
`ButtplugBrowserWebsocketClientConnector` class. That should be the only change needed, all of the
API stays the same. See the Documentation section for more info.

(The WASM Server *does not work* with pure node applications. It requires a browser environment in order to run. See the WASM project README for more info.)

## Documentation and Examples

Documentation on how to use Buttplug in general, as well as examples for buttplug-js, can be found in the [Buttplug Developer Guide](https://docs.buttplug.io/docs/dev-guide).

API documentation for buttplug-js can be found at https://buttplugio.github.io/buttplug-js.

If you would like to see a demo of using Buttplug in a pure web context, check out the following glitch project, which shows how to pull the Buttplug libraries from a CDN and use them in a pure HTML/JS context without node:

https://glitch.com/edit/#!/how-to-buttplug

## Contributing

If you have issues or feature requests, [please feel free to file an issue on this repo](issues/).

We are not looking for code contributions or pull requests at this time, and will not accept pull
requests that do not have a matching issue where the matter was previously discussed. Pull requests
should only be submitted after talking to [qdot](https://github.com/qdot) via issues on this repo
(or on [discourse](https://discuss.buttplug.io) or [discord](https://discord.buttplug.io) if you
would like to stay anonymous and out of recorded info on the repo) before submitting PRs. Random PRs
without matching issues and discussion are likely to be closed without merging. and receiving
approval to develop code based on an issue. Any random or non-issue pull requests will most likely
be closed without merging.

If you'd like to contribute in a non-technical way, we need money to keep up with supporting the
latest and greatest hardware. We have multiple ways to donate!

- [Patreon](https://patreon.com/qdot)
- [Github Sponsors](https://github.com/sponsors/qdot)
- [Ko-Fi](https://ko-fi.com/qdot76367)

## License

This project is BSD 3-Clause licensed.

```text

Copyright (c) 2016-2023, Nonpolynomial Labs, LLC
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of buttplug nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

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
```