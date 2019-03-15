/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import { ButtplugServerCLI } from "./ButtplugServerCLI";

const server = new ButtplugServerCLI();
server.RunServer().catch((err) => console.log(err));
