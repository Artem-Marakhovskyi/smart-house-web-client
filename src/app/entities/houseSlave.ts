export class HouseSlave {
    mac: string;
    connectionId: string;
    status: HouseSlave.SlaveStatus;
    slaveType: HouseSlave.SlaveType;
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