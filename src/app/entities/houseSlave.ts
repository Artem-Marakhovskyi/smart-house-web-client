export class HouseSlave {
    MAC: string;
    connectionId: string; //atualy its type is ObjectID
    slaveStatus: HouseSlave.SlaveStatus;
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