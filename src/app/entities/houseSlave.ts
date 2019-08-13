import { BaseHouseSlaveInvoker } from "./BaseHouseSlaveInvoker";

export class HouseSlave {
    mac: string;
    name: string;
    connectionId: string;
    status: HouseSlave.SlaveStatus;
    slaveType: HouseSlave.SlaveType;
    on: BaseHouseSlaveInvoker;
    off: BaseHouseSlaveInvoker;
}

export namespace HouseSlave {
    export enum SlaveType {
        Sensor,
        Device
    }
    export enum SlaveStatus {
        On,
        Off,
        Error
    }
}