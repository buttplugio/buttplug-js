# Buttplug Typescript/JS Client Implementation

[![Patreon donate button](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/qdot)
[![Github donate button](https://img.shields.io/badge/github-donate-ff69b4.svg)](https://www.github.com/sponsors/qdot)

[![Discourse Forum](https://img.shields.io/badge/discourse-forum-blue.svg)](https://discuss.buttplug.io)
[![Discord](https://img.shields.io/discord/353303527587708932.svg?logo=discord)](https://discord.buttplug.io)
[![Twitter](https://img.shields.io/twitter/follow/buttplugio.svg?style=social&logo=twitter)](https://twitter.com/buttplugio)

This repo houses are pure .Net version of the Buttplug Typescript/Javascript Client, implementing
the Version 3 Buttplug Spec. It is expected to run from a browser against either [Intiface Central
(GUI)](https://intiface.com/central) or [Initface Engine
(CLI)](https://github.com/intiface/intiface-engine). No Rust FFI bindings are required.


## Using buttplug-js with Node

buttplug-js works with both pure web builds, as well as node applications. To use buttplug-js with node, use the `ButtplugNodeWebsocketClientConnector` class instead of the `ButtplugBrowserWebsocketClientConnector` class. That should be the only change needed, all of the API stays the same. See the Documentation section for more info.

## Documentation

Documentation on how to use Buttplug in general, as well as examples for buttplug-js, can be found in the [Buttplug Developer Guide](https://docs.buttplug.io/docs/dev-guide).

API documentation for buttplug-js can be found at https://buttplugio.github.io/buttplug-js.

## What happened? Why is buttplug-js back?

For those of you that have been around a while, you may remember that this used to be the main
Typescript/Javascript implementation. From 2017 to 2020, it was a reference version of the Buttplug
Intimate Haptics Control Standard. 

Then I rewrote everything in Rust because I like Rust more and it's far easier for me to port across
platforms. This repo was archived ~2 years ago in preference to seating the C# client *and* server
on top of the [Rust implementation of Buttplug](https://github.com/buttplugio/buttplug), as part of
the [Rust FFI Project](https://github.com/buttplugio/buttplug-rs-ffi).

That project ended up being a partial failure.

While the FFI system is handy for languages where it is very difficult to rebuild some parts of the
library (C/C++/Java/etc...), for managed langauges like Javascript and C#, requiring both the client
and server to use the FFI was overkill, and caused many extremely difficult-to-debug issues. With
that in mind, the Typescript implementation in this repo is being turned into a Client only. The
WASM server and Embedded Connector will stay in the FFI repo, but will be another NPM package that
will be optional.

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

Copyright (c) 2016-2023, Nonpolynomial, LLC
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