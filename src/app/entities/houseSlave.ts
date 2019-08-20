import { BaseHouseSlaveInvoker } from "./BaseHouseSlaveInvoker";
import { SlaveStatus } from "./slaveStatus";
import { SlaveType } from "./slaveType";

export class HouseSlave {
    mac: string;
    name: string;
    connectionId: string;
    status: SlaveStatus;
    slaveType: SlaveType;
    on: BaseHouseSlaveInvoker;
    off: BaseHouseSlaveInvoker;
}
