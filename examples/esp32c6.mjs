import {enumLookup, humidity, illuminance, onOff, temperature} from "zigbee-herdsman-converters/lib/modernExtend";

/** @type{import('zigbee-herdsman-converters/lib/types').DefinitionWithExtend | import('zigbee-herdsman-converters/lib/types').DefinitionWithExtend[]} */
export default {
    zigbeeModel: ["esp32c6"],
    model: "ESP32-C6 Greenhouse Sensor",
    vendor: "Espressif",
    description: "Greenhouse temperature, humidity, illuminance, and relay device",
    endpoint: () => ({air: 10, soil: 11, light: 12, relay: 20}),
    extend: [
        temperature({endpointNames: ["air", "soil"]}),
        humidity({endpointNames: ["air", "soil"]}),
        illuminance({endpointNames: ["light"]}),
        onOff({endpointNames: ["relay"]}),
        enumLookup({
            name: "mode",
            cluster: "genOnOff",
            attribute: {ID: 0xf000, type: 0x20},
            lookup: {MANUAL: 0, AUTO: 1},
            description: "Relay operating mode",
            endpointName: "relay",
        }),
    ],
};
