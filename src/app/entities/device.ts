import { HouseSlave } from "./houseSlave";
import { HouseSlaveInvoker } from "./houseSlaveInvoker";

export class Device extends HouseSlave {
    methods: Array<HouseSlaveInvoker>;
}
