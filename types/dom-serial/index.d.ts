// Type definitions for non-npm package Web Serial API based on spec and Chromium implementation 1.0
// Project: https://wicg.github.io/serial/
// Definitions by: Maciej Mroziński <https://github.com/maciejmrozinski>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

type EventHandler = (event: Event) => void;

interface SerialPortInfoBase {
    serialNumber: string;
    manufacturer: string;
    locationId: string;
    vendorId: string;
    vendor: string;
    productId: string;
    product: string;
}

interface SerialPortFilter {
    usbVendorId: number;
    usbProductId?: number | undefined;
}

interface SerialPortInfo extends SerialPortInfoBase, SerialPortFilter {} // mix spec and Chromium implementation

type ParityType = "none" | "even" | "odd" | "mark" | "space";

type FlowControlType = "none" | "hardware";

interface SerialOptions {
    baudRate: number;
    dataBits?: number | undefined;
    stopBits?: number | undefined;
    parity?: ParityType | undefined;
    bufferSize?: number | undefined;
    flowControl?: FlowControlType | undefined;
}

interface SerialPort extends EventTarget {
    onconnect: EventHandler;
    ondisconnect: EventHandler;
    readonly readable: ReadableStream; // Chromium implementation (spec: in)
    readonly writable: WritableStream; // Chromium implementation (spec: out)
    open(options: SerialOptions): Promise<void>;
    close(): Promise<void>;
    getInfo(): Partial<SerialPortInfo>;
    forget(): Promise<void>;
}

interface SerialPortRequestOptions {
    filters: SerialPortFilter[];
}

interface Serial extends EventTarget {
    onconnect: EventHandler;
    ondisconnect: EventHandler;
    getPorts(): Promise<SerialPort[]>;
    requestPort(options?: SerialPortRequestOptions): Promise<SerialPort>; // Chromium implementation (spec: SerialOptions)
}

interface Navigator {
    readonly serial: Serial;
}
