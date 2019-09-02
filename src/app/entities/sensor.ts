import { HouseSlave } from "./houseSlave";
import { Device } from "./device";
import { TelemetryData } from "./telemetryData";

export class Sensor extends HouseSlave {
  devices: Array<Device>;
  data: TelemetryData;
}
