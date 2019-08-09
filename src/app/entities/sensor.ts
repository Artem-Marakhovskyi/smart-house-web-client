import { Slave } from "./slave";
import { Device } from "./device";
import { TelemetryData } from "./telemetryData";

export class Sensor extends Slave {
    devices: Array<Device>;
    data: TelemetryData;
}
