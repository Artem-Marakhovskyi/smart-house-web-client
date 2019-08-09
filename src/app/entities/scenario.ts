import { Sensor } from "./sensor";
import { Condition } from "./condition";

export class Scenario {
    name: string;
    isExecuted: boolean;
    sensorFor: Sensor;
    conditionFrom: Condition;
    conditionTo: Condition;
}
