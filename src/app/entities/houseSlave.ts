import { SlaveStatus } from "./slaveStatus";
import { HouseSlaveInvoker } from "./houseSlaveInvoker";

export class HouseSlave {
    mac: string;
    name: string;
    status: SlaveStatus;
    on: HouseSlaveInvoker;
    off: HouseSlaveInvoker;
}
