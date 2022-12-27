import { ButtplugClientDevice } from "../client/ButtplugClientDevice";
import { ButtplugDeviceMessage, DeviceAdded, DeviceRemoved, Ok, Error, ButtplugMessage } from "../core/Messages";
import { EventEmitter } from "events";
import { ButtplugDeviceException } from "../core/Exceptions";
import { getRandomInt } from "../utils/Utils";
import { ButtplugBrowserWebsocketConnector } from "../utils/ButtplugBrowserWebsocketConnector";

export interface IButtplugClientForwarderConnector extends EventEmitter {
    Connect(): Promise<void>;
    Disconnect(): Promise<void>;
    SendForwardedMessage(message: DeviceAdded | DeviceRemoved | Ok | Error): Promise<void>;
}

export class ButtplugClientForwarderBrowserWebsocketConnector extends ButtplugBrowserWebsocketConnector implements IButtplugClientForwarderConnector {
    public constructor(serverAddress: string) {
        super(serverAddress);
    }

    public async SendForwardedMessage(message: ButtplugMessage): Promise<void> {
        // Expect that we'll just get Ok or Error back.
        this.SendMessage(message);
        return Promise.resolve();
    }
}

export class ButtplugClientForwarder {
    private _clientName: string;
    private _connector: IButtplugClientForwarderConnector;
    private _devices: Map<number, ButtplugClientDevice> = new Map<number, ButtplugClientDevice>();

    public constructor(clientName: string, connector: IButtplugClientForwarderConnector) {
        // We should prepend the client name to our devices before sending them out.
        this._clientName = clientName;
        this._connector = connector;
    }

    public Connect = async () => {
        await this._connector.Connect();
        this._connector.addListener("message", async (msgs: ButtplugDeviceMessage[]) => {
            for (const m of msgs) {
              await this.ReceiveDeviceCommand(m);
            }
        });
    }

    public Disconnect = async () => {
        await this._connector.Disconnect();
    }

    public AddDevice = async (device: ButtplugClientDevice) => {
        const msg = this.CreateDeviceAdded(device);
        device.addListener("deviceremoved", () => this.RemoveDevice(device));
        await this._connector.SendForwardedMessage(msg);
    }

    public RemoveDevice = async (device: ButtplugClientDevice) => {
        const msg = this.CreateDeviceRemoved(device);
        await this._connector.SendForwardedMessage(msg);
    }

    public ReceiveDeviceCommand = async (message: ButtplugDeviceMessage) => {
        // Parse command and forward to actual device.
        const device = this._devices.get(message.DeviceIndex);
        if (device === undefined) {
            return;
        }
        // TODO This could fail if we don't find the device.
        //
        // TODO If this fails on the device (doesn't support message, etc...),
        // it'll throw. It should try, catch the exception, forward it to the
        // server.
        await device?.SendMessageAsync(message);
        // Assume if we made it this far that we're just sending back an Ok with
        // Id match.
        await this._connector.SendForwardedMessage(new Ok(message.Id));
    }

    private CreateDeviceAdded(device: ButtplugClientDevice): DeviceAdded {
        const deviceKeys = [...this._devices.entries()]
            .filter(({ 1: v }) => v.Index === device.Index)
            .map(([k]) => k);
        if (deviceKeys.length > 0) {
            throw new ButtplugDeviceException("Device already shared with server!");
        }
        let localId = getRandomInt(2 ^ 32);
        // Just in case.
        while (this._devices.has(localId)) {
            localId = getRandomInt(2 ^ 32);
        }
        this._devices.set(localId, device);
        return new DeviceAdded(localId, `${this._clientName} - ${device.Name}`, device.AllowedMessagesObject);
    }

    private CreateDeviceRemoved(device: ButtplugClientDevice): DeviceRemoved {
        const deviceKeys = [...this._devices.entries()]
            .filter(({ 1: v }) => v.Index === device.Index)
            .map(([k]) => k);
        if (deviceKeys.length === 1) {
            const key = deviceKeys.pop()!;
            this._devices.delete(key);
            return new DeviceRemoved(key);
        } else if (deviceKeys.length === 0) {
            throw new ButtplugDeviceException("Device not currently shared with server!");
        } else {
            throw new ButtplugDeviceException("Device shared with server multiple times!");
        }
    }
}
