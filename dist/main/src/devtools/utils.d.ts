import { ButtplugLogger } from "../core/Logging";
import { ButtplugClient } from "../client/Client";
export declare function CreateLoggerPanel(logger: ButtplugLogger): void;
export declare function CreateDeviceManagerPanel(): void;
export declare function CreateDevToolsClient(logger: ButtplugLogger): Promise<ButtplugClient>;
