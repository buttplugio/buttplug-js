import { ButtplugClientDevice } from "../client/ButtplugClientDevice";
import { ButtplugDeviceMessage, DeviceAdded, DeviceRemoved, Ok, Error, ButtplugMessage } from "../core/Messages";
import { EventEmitter } from "events";
import { ButtplugDeviceException } from "../core/Exceptions";
import { ButtplugBrowserWebsocketClientConnector } from "./ButtplugBrowserWebsocketClientConnector";
import { getRandomInt } from "../utils/Utils";

export interface ButtplugClientForwarderConnector extends EventEmitter {
    Connect(): Promise<void>;
    Disconnect(): Promise<void>;
    SendMessage(message: DeviceAdded | DeviceRemoved | Ok | Error): Promise<void>;
}

export class ButtplugClientForwarderBrowserWebsocketConnector extends EventEmitter implements ButtplugClientForwarderConnector {
    private _serverAddress: string;
    private _connector: ButtplugBrowserWebsocketClientConnector;

    public constructor(serverAddress: string) {
        super();
        this._connector = new ButtplugBrowserWebsocketClientConnector(serverAddress);
    }

    public Connect = async (): Promise<void> => {
        // Connect to the websocket, hook up events.
        await this._connector.Connect();
        // Just re-emit from the connector.
        this._connector.addListener("message", (msg) => {
            this.emit("message", msg);
        });
    }

    public Disconnect = async (): Promise<void> => {
        // Disconnect from the websocket
        await this._connector.Disconnect();
    }

    public SendMessage = async (message: DeviceAdded | DeviceRemoved | Ok | Error): Promise<void> => {
        // Expect that we'll just get Ok or Error back.
        await this._connector.Send(message);
    }
}

export class ButtplugClientForwarder {
    private _clientName: string;
    private _connector: ButtplugClientForwarderConnector;
    private _devices: Map<number, ButtplugClientDevice> = new Map<number, ButtplugClientDevice>();

    public constructor(clientName: string, connector: ButtplugClientForwarderConnector) {
        // We should prepend the client name to our devices before sending them out.
        this._clientName = clientName;
        this._connector = connector;
    }

    public Connect = async () => {
        await this._connector.Connect();
        this._connector.addListener("message", async (msg: ButtplugDeviceMessage) => {
            await this.ReceiveDeviceCommand(msg);
        });
    }

    public Disconnect = async () => {
        await this._connector.Disconnect();
    }

    public AddDevice = async (device: ButtplugClientDevice) => {
        const msg = this.CreateDeviceAdded(device);
        await this._connector.SendMessage(msg);
        // TODO Need a way to automatically remove the device if it fires
        // deviceremoved, but that's only emitted from the client! WHY IS THAT
        // NOT EMITTED FROM THE DEVICE TOO. WHY. ANSWER ME, 2017 ME.
    }

    public RemoveDevice = async (device: ButtplugClientDevice) => {
        const msg = this.CreateDeviceRemoved(device);
        await this._connector.SendMessage(msg);
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
        await this._connector.SendMessage(new Ok(message.Id));
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
