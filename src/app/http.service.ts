import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HouseSlaveInvoker } from './entities/houseSlaveInvoker';

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }

    getData() {
        return this.http.get('http://localhost:8083/api/values');
    }
    postRunMethod(houseSlaveInvoker: HouseSlaveInvoker) {
        const body = { connectionId: houseSlaveInvoker.connectionId, name: houseSlaveInvoker.name, address: houseSlaveInvoker.address, args: houseSlaveInvoker.args};
        return this.http.post('http://localhost:8083/api/values/run', body);
    }
}