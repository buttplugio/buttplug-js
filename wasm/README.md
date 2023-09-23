# Buttplug Server - WASM Version

A WASM compilation of the Rust implementation of the Buttplug Server. This projects allows the Buttplug Server (hardware connecting portion of Buttplug) to be run completely in the browser without the need to connect to [Intiface Central](https://intiface.com/central).

This will only work in browser that include WebBluetooth implementations, like Google Chrome, Microsoft Edge, etc...

If you are going to use this project, it is recommended that you provide users with the choice of connecting to Intiface Central *or* using the WASM server, as you will need to update the WASM server every time we release a new version to stay up to date with the latest hardware and protocol changes. Allowing the user to also connect to Intiface Central means that if your WASM server version becomes outdated, the user can still update Intiface Central and connect to it for support wiht newer hardware.

## Examples

Examples of how to use this system are contained in this repo (the `example` directory), as well as in this glitch project:

https://glitch.com/edit/#!/how-to-buttplug-wasm

## Distribution and Size Warnings

As this project only works on the web, it is distributed as an ES Module. In order to accommodate loading from a CDN, the WASM blob is encoded to base64 and loaded within the module. The WASM blob itself is quite large due to bringing in the Rust standard library and requiring a lot of code internally.

**THIS MEANS THE ES MODULE WILL BE ANYWHERE FROM 1.5MB (ZIPPED) TO 5MB (UNZIPPED).**

You will need to take measures to show the user some sort of feedback while loading this module, as on some connections this may be quite slow.

This is a tradeoff you must be willing to make to use this library.

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