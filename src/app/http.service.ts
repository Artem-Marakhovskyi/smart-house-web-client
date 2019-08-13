import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHouseSlaveInvoker } from './entities/BaseHouseSlaveInvoker';

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }

    getDevices() {
        return this.http.get('http://localhost:8083/api/values');
    }
    getSensors() {
        return this.http.get('http://localhost:8083/api/values');
    }
    postRunMethod(baseHouseSlaveInvoker: BaseHouseSlaveInvoker) {
        const body = { connectionId: baseHouseSlaveInvoker.connectionId, name: baseHouseSlaveInvoker.name, address: baseHouseSlaveInvoker.address};
        return this.http.post('http://localhost:8083/api/values/run', body);
    }
}