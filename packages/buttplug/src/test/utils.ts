/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import { ButtplugClient, ButtplugEmbeddedServerConnector, ButtplugServer } from "../index";
import { TestDeviceSubtypeManager } from "./TestDeviceSubtypeManager";

export async function CreateDevToolsClient(): Promise<ButtplugClient> {
  const client = new ButtplugClient("Test Client");
  const server = new ButtplugServer("Test Server");
  server.ClearDeviceManagers();
  server.AddDeviceManager(new TestDeviceSubtypeManager());
  const localConnector = new ButtplugEmbeddedServerConnector();
  localConnector.Server = server;
  await client.Connect(localConnector);
  return Promise.resolve(client);
}
