import { Slave } from "./slave";
import { HouseSlaveInvoker } from "./houseSlaveInvoker";

export class Device extends Slave{
    methods: Array<HouseSlaveInvoker>;
}
