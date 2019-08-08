export class Slave{
    MAC: string;
    connectionId: string; //atualy its type is ObjectID
    slaveStatus: Slave.SlaveStatus;
    slaveType: Slave.SlaveType;
}

export namespace Slave
{
    export enum SlaveType
    {
        Sensor,
        Device
    }
    export enum SlaveStatus
    {
        On,
        Off,
        Error
    }
}