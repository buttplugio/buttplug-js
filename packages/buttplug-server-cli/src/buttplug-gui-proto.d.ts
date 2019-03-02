import * as $protobuf from "protobufjs";
/** Namespace buttplug_gui_protocol. */
export namespace buttplug_gui_protocol {

    /** Properties of a GuiMessage. */
    interface IGuiMessage {

        /** GuiMessage guilog */
        guilog?: (buttplug_gui_protocol.GuiMessage.IGuiLog|null);

        /** GuiMessage processstarted */
        processstarted?: (buttplug_gui_protocol.GuiMessage.IProcessStarted|null);

        /** GuiMessage processended */
        processended?: (buttplug_gui_protocol.GuiMessage.IProcessEnded|null);

        /** GuiMessage bplog */
        bplog?: (buttplug_gui_protocol.GuiMessage.IButtplugLog|null);

        /** GuiMessage clientconnected */
        clientconnected?: (buttplug_gui_protocol.GuiMessage.IClientConnected|null);

        /** GuiMessage clientdisconnected */
        clientdisconnected?: (buttplug_gui_protocol.GuiMessage.IClientDisconnected|null);

        /** GuiMessage deviceconnected */
        deviceconnected?: (buttplug_gui_protocol.GuiMessage.IDeviceConnected|null);

        /** GuiMessage devicedisconnected */
        devicedisconnected?: (buttplug_gui_protocol.GuiMessage.IDeviceDisconnected|null);
    }

    /** Represents a GuiMessage. */
    class GuiMessage implements IGuiMessage {

        /**
         * Constructs a new GuiMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: buttplug_gui_protocol.IGuiMessage);

        /** GuiMessage guilog. */
        public guilog?: (buttplug_gui_protocol.GuiMessage.IGuiLog|null);

        /** GuiMessage processstarted. */
        public processstarted?: (buttplug_gui_protocol.GuiMessage.IProcessStarted|null);

        /** GuiMessage processended. */
        public processended?: (buttplug_gui_protocol.GuiMessage.IProcessEnded|null);

        /** GuiMessage bplog. */
        public bplog?: (buttplug_gui_protocol.GuiMessage.IButtplugLog|null);

        /** GuiMessage clientconnected. */
        public clientconnected?: (buttplug_gui_protocol.GuiMessage.IClientConnected|null);

        /** GuiMessage clientdisconnected. */
        public clientdisconnected?: (buttplug_gui_protocol.GuiMessage.IClientDisconnected|null);

        /** GuiMessage deviceconnected. */
        public deviceconnected?: (buttplug_gui_protocol.GuiMessage.IDeviceConnected|null);

        /** GuiMessage devicedisconnected. */
        public devicedisconnected?: (buttplug_gui_protocol.GuiMessage.IDeviceDisconnected|null);

        /** GuiMessage msg. */
        public msg?: ("guilog"|"processstarted"|"processended"|"bplog"|"clientconnected"|"clientdisconnected"|"deviceconnected"|"devicedisconnected");

        /**
         * Creates a new GuiMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GuiMessage instance
         */
        public static create(properties?: buttplug_gui_protocol.IGuiMessage): buttplug_gui_protocol.GuiMessage;

        /**
         * Encodes the specified GuiMessage message. Does not implicitly {@link buttplug_gui_protocol.GuiMessage.verify|verify} messages.
         * @param message GuiMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: buttplug_gui_protocol.IGuiMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GuiMessage message, length delimited. Does not implicitly {@link buttplug_gui_protocol.GuiMessage.verify|verify} messages.
         * @param message GuiMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: buttplug_gui_protocol.IGuiMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GuiMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GuiMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): buttplug_gui_protocol.GuiMessage;

        /**
         * Decodes a GuiMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GuiMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): buttplug_gui_protocol.GuiMessage;

        /**
         * Verifies a GuiMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GuiMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GuiMessage
         */
        public static fromObject(object: { [k: string]: any }): buttplug_gui_protocol.GuiMessage;

        /**
         * Creates a plain object from a GuiMessage message. Also converts values to other types if specified.
         * @param message GuiMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: buttplug_gui_protocol.GuiMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GuiMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace GuiMessage {

        /** Properties of a GuiLog. */
        interface IGuiLog {

            /** GuiLog message */
            message?: (string|null);
        }

        /** Represents a GuiLog. */
        class GuiLog implements IGuiLog {

            /**
             * Constructs a new GuiLog.
             * @param [properties] Properties to set
             */
            constructor(properties?: buttplug_gui_protocol.GuiMessage.IGuiLog);

            /** GuiLog message. */
            public message: string;

            /**
             * Creates a new GuiLog instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GuiLog instance
             */
            public static create(properties?: buttplug_gui_protocol.GuiMessage.IGuiLog): buttplug_gui_protocol.GuiMessage.GuiLog;

            /**
             * Encodes the specified GuiLog message. Does not implicitly {@link buttplug_gui_protocol.GuiMessage.GuiLog.verify|verify} messages.
             * @param message GuiLog message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: buttplug_gui_protocol.GuiMessage.IGuiLog, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GuiLog message, length delimited. Does not implicitly {@link buttplug_gui_protocol.GuiMessage.GuiLog.verify|verify} messages.
             * @param message GuiLog message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: buttplug_gui_protocol.GuiMessage.IGuiLog, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GuiLog message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GuiLog
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): buttplug_gui_protocol.GuiMessage.GuiLog;

            /**
             * Decodes a GuiLog message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GuiLog
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): buttplug_gui_protocol.GuiMessage.GuiLog;

            /**
             * Verifies a GuiLog message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GuiLog message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GuiLog
             */
            public static fromObject(object: { [k: string]: any }): buttplug_gui_protocol.GuiMessage.GuiLog;

            /**
             * Creates a plain object from a GuiLog message. Also converts values to other types if specified.
             * @param message GuiLog
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: buttplug_gui_protocol.GuiMessage.GuiLog, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GuiLog to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ProcessStarted. */
        interface IProcessStarted {
        }

        /** Represents a ProcessStarted. */
        class ProcessStarted implements IProcessStarted {

            /**
             * Constructs a new ProcessStarted.
             * @param [properties] Properties to set
             */
            constructor(properties?: buttplug_gui_protocol.GuiMessage.IProcessStarted);

            /**
             * Creates a new ProcessStarted instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ProcessStarted instance
             */
            public static create(properties?: buttplug_gui_protocol.GuiMessage.IProcessStarted): buttplug_gui_protocol.GuiMessage.ProcessStarted;

            /**
             * Encodes the specified ProcessStarted message. Does not implicitly {@link buttplug_gui_protocol.GuiMessage.ProcessStarted.verify|verify} messages.
             * @param message ProcessStarted message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: buttplug_gui_protocol.GuiMessage.IProcessStarted, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ProcessStarted message, length delimited. Does not implicitly {@link buttplug_gui_protocol.GuiMessage.ProcessStarted.verify|verify} messages.
             * @param message ProcessStarted message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: buttplug_gui_protocol.GuiMessage.IProcessStarted, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ProcessStarted message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ProcessStarted
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): buttplug_gui_protocol.GuiMessage.ProcessStarted;

            /**
             * Decodes a ProcessStarted message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ProcessStarted
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): buttplug_gui_protocol.GuiMessage.ProcessStarted;

            /**
             * Verifies a ProcessStarted message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ProcessStarted message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ProcessStarted
             */
            public static fromObject(object: { [k: string]: any }): buttplug_gui_protocol.GuiMessage.ProcessStarted;

            /**
             * Creates a plain object from a ProcessStarted message. Also converts values to other types if specified.
             * @param message ProcessStarted
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: buttplug_gui_protocol.GuiMessage.ProcessStarted, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ProcessStarted to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ProcessEnded. */
        interface IProcessEnded {
        }

        /** Represents a ProcessEnded. */
        class ProcessEnded implements IProcessEnded {

            /**
             * Constructs a new ProcessEnded.
             * @param [properties] Properties to set
             */
            constructor(properties?: buttplug_gui_protocol.GuiMessage.IProcessEnded);

            /**
             * Creates a new ProcessEnded instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ProcessEnded instance
             */
            public static create(properties?: buttplug_gui_protocol.GuiMessage.IProcessEnded): buttplug_gui_protocol.GuiMessage.ProcessEnded;

            /**
             * Encodes the specified ProcessEnded message. Does not implicitly {@link buttplug_gui_protocol.GuiMessage.ProcessEnded.verify|verify} messages.
             * @param message ProcessEnded message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: buttplug_gui_protocol.GuiMessage.IProcessEnded, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ProcessEnded message, length delimited. Does not implicitly {@link buttplug_gui_protocol.GuiMessage.ProcessEnded.verify|verify} messages.
             * @param message ProcessEnded message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: buttplug_gui_protocol.GuiMessage.IProcessEnded, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ProcessEnded message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ProcessEnded
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): buttplug_gui_protocol.GuiMessage.ProcessEnded;

            /**
             * Decodes a ProcessEnded message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ProcessEnded
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): buttplug_gui_protocol.GuiMessage.ProcessEnded;

            /**
             * Verifies a ProcessEnded message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ProcessEnded message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ProcessEnded
             */
            public static fromObject(object: { [k: string]: any }): buttplug_gui_protocol.GuiMessage.ProcessEnded;

            /**
             * Creates a plain object from a ProcessEnded message. Also converts values to other types if specified.
             * @param message ProcessEnded
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: buttplug_gui_protocol.GuiMessage.ProcessEnded, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ProcessEnded to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ButtplugLog. */
        interface IButtplugLog {

            /** ButtplugLog message */
            message?: (string|null);
        }

        /** Represents a ButtplugLog. */
        class ButtplugLog implements IButtplugLog {

            /**
             * Constructs a new ButtplugLog.
             * @param [properties] Properties to set
             */
            constructor(properties?: buttplug_gui_protocol.GuiMessage.IButtplugLog);

            /** ButtplugLog message. */
            public message: string;

            /**
             * Creates a new ButtplugLog instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ButtplugLog instance
             */
            public static create(properties?: buttplug_gui_protocol.GuiMessage.IButtplugLog): buttplug_gui_protocol.GuiMessage.ButtplugLog;

            /**
             * Encodes the specified ButtplugLog message. Does not implicitly {@link buttplug_gui_protocol.GuiMessage.ButtplugLog.verify|verify} messages.
             * @param message ButtplugLog message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: buttplug_gui_protocol.GuiMessage.IButtplugLog, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ButtplugLog message, length delimited. Does not implicitly {@link buttplug_gui_protocol.GuiMessage.ButtplugLog.verify|verify} messages.
             * @param message ButtplugLog message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: buttplug_gui_protocol.GuiMessage.IButtplugLog, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ButtplugLog message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ButtplugLog
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): buttplug_gui_protocol.GuiMessage.ButtplugLog;

            /**
             * Decodes a ButtplugLog message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ButtplugLog
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): buttplug_gui_protocol.GuiMessage.ButtplugLog;

            /**
             * Verifies a ButtplugLog message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ButtplugLog message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ButtplugLog
             */
            public static fromObject(object: { [k: string]: any }): buttplug_gui_protocol.GuiMessage.ButtplugLog;

            /**
             * Creates a plain object from a ButtplugLog message. Also converts values to other types if specified.
             * @param message ButtplugLog
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: buttplug_gui_protocol.GuiMessage.ButtplugLog, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ButtplugLog to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ClientConnected. */
        interface IClientConnected {

            /** ClientConnected clientName */
            clientName?: (string|null);
        }

        /** Represents a ClientConnected. */
        class ClientConnected implements IClientConnected {

            /**
             * Constructs a new ClientConnected.
             * @param [properties] Properties to set
             */
            constructor(properties?: buttplug_gui_protocol.GuiMessage.IClientConnected);

            /** ClientConnected clientName. */
            public clientName: string;

            /**
             * Creates a new ClientConnected instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ClientConnected instance
             */
            public static create(properties?: buttplug_gui_protocol.GuiMessage.IClientConnected): buttplug_gui_protocol.GuiMessage.ClientConnected;

            /**
             * Encodes the specified ClientConnected message. Does not implicitly {@link buttplug_gui_protocol.GuiMessage.ClientConnected.verify|verify} messages.
             * @param message ClientConnected message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: buttplug_gui_protocol.GuiMessage.IClientConnected, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ClientConnected message, length delimited. Does not implicitly {@link buttplug_gui_protocol.GuiMessage.ClientConnected.verify|verify} messages.
             * @param message ClientConnected message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: buttplug_gui_protocol.GuiMessage.IClientConnected, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ClientConnected message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ClientConnected
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): buttplug_gui_protocol.GuiMessage.ClientConnected;

            /**
             * Decodes a ClientConnected message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ClientConnected
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): buttplug_gui_protocol.GuiMessage.ClientConnected;

            /**
             * Verifies a ClientConnected message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ClientConnected message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ClientConnected
             */
            public static fromObject(object: { [k: string]: any }): buttplug_gui_protocol.GuiMessage.ClientConnected;

            /**
             * Creates a plain object from a ClientConnected message. Also converts values to other types if specified.
             * @param message ClientConnected
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: buttplug_gui_protocol.GuiMessage.ClientConnected, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ClientConnected to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ClientDisconnected. */
        interface IClientDisconnected {
        }

        /** Represents a ClientDisconnected. */
        class ClientDisconnected implements IClientDisconnected {

            /**
             * Constructs a new ClientDisconnected.
             * @param [properties] Properties to set
             */
            constructor(properties?: buttplug_gui_protocol.GuiMessage.IClientDisconnected);

            /**
             * Creates a new ClientDisconnected instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ClientDisconnected instance
             */
            public static create(properties?: buttplug_gui_protocol.GuiMessage.IClientDisconnected): buttplug_gui_protocol.GuiMessage.ClientDisconnected;

            /**
             * Encodes the specified ClientDisconnected message. Does not implicitly {@link buttplug_gui_protocol.GuiMessage.ClientDisconnected.verify|verify} messages.
             * @param message ClientDisconnected message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: buttplug_gui_protocol.GuiMessage.IClientDisconnected, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ClientDisconnected message, length delimited. Does not implicitly {@link buttplug_gui_protocol.GuiMessage.ClientDisconnected.verify|verify} messages.
             * @param message ClientDisconnected message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: buttplug_gui_protocol.GuiMessage.IClientDisconnected, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ClientDisconnected message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ClientDisconnected
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): buttplug_gui_protocol.GuiMessage.ClientDisconnected;

            /**
             * Decodes a ClientDisconnected message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ClientDisconnected
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): buttplug_gui_protocol.GuiMessage.ClientDisconnected;

            /**
             * Verifies a ClientDisconnected message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ClientDisconnected message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ClientDisconnected
             */
            public static fromObject(object: { [k: string]: any }): buttplug_gui_protocol.GuiMessage.ClientDisconnected;

            /**
             * Creates a plain object from a ClientDisconnected message. Also converts values to other types if specified.
             * @param message ClientDisconnected
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: buttplug_gui_protocol.GuiMessage.ClientDisconnected, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ClientDisconnected to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a DeviceConnected. */
        interface IDeviceConnected {

            /** DeviceConnected deviceName */
            deviceName?: (string|null);

            /** DeviceConnected deviceId */
            deviceId?: (number|null);
        }

        /** Represents a DeviceConnected. */
        class DeviceConnected implements IDeviceConnected {

            /**
             * Constructs a new DeviceConnected.
             * @param [properties] Properties to set
             */
            constructor(properties?: buttplug_gui_protocol.GuiMessage.IDeviceConnected);

            /** DeviceConnected deviceName. */
            public deviceName: string;

            /** DeviceConnected deviceId. */
            public deviceId: number;

            /**
             * Creates a new DeviceConnected instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DeviceConnected instance
             */
            public static create(properties?: buttplug_gui_protocol.GuiMessage.IDeviceConnected): buttplug_gui_protocol.GuiMessage.DeviceConnected;

            /**
             * Encodes the specified DeviceConnected message. Does not implicitly {@link buttplug_gui_protocol.GuiMessage.DeviceConnected.verify|verify} messages.
             * @param message DeviceConnected message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: buttplug_gui_protocol.GuiMessage.IDeviceConnected, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DeviceConnected message, length delimited. Does not implicitly {@link buttplug_gui_protocol.GuiMessage.DeviceConnected.verify|verify} messages.
             * @param message DeviceConnected message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: buttplug_gui_protocol.GuiMessage.IDeviceConnected, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DeviceConnected message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DeviceConnected
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): buttplug_gui_protocol.GuiMessage.DeviceConnected;

            /**
             * Decodes a DeviceConnected message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DeviceConnected
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): buttplug_gui_protocol.GuiMessage.DeviceConnected;

            /**
             * Verifies a DeviceConnected message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DeviceConnected message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DeviceConnected
             */
            public static fromObject(object: { [k: string]: any }): buttplug_gui_protocol.GuiMessage.DeviceConnected;

            /**
             * Creates a plain object from a DeviceConnected message. Also converts values to other types if specified.
             * @param message DeviceConnected
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: buttplug_gui_protocol.GuiMessage.DeviceConnected, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DeviceConnected to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a DeviceDisconnected. */
        interface IDeviceDisconnected {

            /** DeviceDisconnected deviceId */
            deviceId?: (number|null);
        }

        /** Represents a DeviceDisconnected. */
        class DeviceDisconnected implements IDeviceDisconnected {

            /**
             * Constructs a new DeviceDisconnected.
             * @param [properties] Properties to set
             */
            constructor(properties?: buttplug_gui_protocol.GuiMessage.IDeviceDisconnected);

            /** DeviceDisconnected deviceId. */
            public deviceId: number;

            /**
             * Creates a new DeviceDisconnected instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DeviceDisconnected instance
             */
            public static create(properties?: buttplug_gui_protocol.GuiMessage.IDeviceDisconnected): buttplug_gui_protocol.GuiMessage.DeviceDisconnected;

            /**
             * Encodes the specified DeviceDisconnected message. Does not implicitly {@link buttplug_gui_protocol.GuiMessage.DeviceDisconnected.verify|verify} messages.
             * @param message DeviceDisconnected message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: buttplug_gui_protocol.GuiMessage.IDeviceDisconnected, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DeviceDisconnected message, length delimited. Does not implicitly {@link buttplug_gui_protocol.GuiMessage.DeviceDisconnected.verify|verify} messages.
             * @param message DeviceDisconnected message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: buttplug_gui_protocol.GuiMessage.IDeviceDisconnected, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DeviceDisconnected message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DeviceDisconnected
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): buttplug_gui_protocol.GuiMessage.DeviceDisconnected;

            /**
             * Decodes a DeviceDisconnected message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DeviceDisconnected
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): buttplug_gui_protocol.GuiMessage.DeviceDisconnected;

            /**
             * Verifies a DeviceDisconnected message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DeviceDisconnected message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DeviceDisconnected
             */
            public static fromObject(object: { [k: string]: any }): buttplug_gui_protocol.GuiMessage.DeviceDisconnected;

            /**
             * Creates a plain object from a DeviceDisconnected message. Also converts values to other types if specified.
             * @param message DeviceDisconnected
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: buttplug_gui_protocol.GuiMessage.DeviceDisconnected, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DeviceDisconnected to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
