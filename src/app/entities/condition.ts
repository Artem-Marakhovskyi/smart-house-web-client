import { HouseSlaveInvoker } from "./houseSlaveInvoker";
import { CompareCondition } from "./compareCondition";

export class Condition {
    targetValue: string;
    situation: CompareCondition;
    methods: Array<HouseSlaveInvoker>;
    isExecuted: boolean;
}
