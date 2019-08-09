import { HouseSlaveInvoker } from "./houseSlaveInvoker";

export class Condition {
    targetValue: string;
    situation: Condition.CompareCondition;
    methods: Array<HouseSlaveInvoker>;
    isExecuted: boolean;
}

export namespace Condition {
    export enum CompareCondition {
        Sensor,
        Device
    }
}