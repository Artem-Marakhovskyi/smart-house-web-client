import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHouseSlaveInvoker } from './entities/BaseHouseSlaveInvoker';
import { Device } from './entities/device';
import { Sensor } from './entities/sensor';

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }

    getDevices() {
        return this.http.get('http://localhost:54058/api/devices');
    }
    deleteDevice(device: Device) {
        const body = { mac: device.mac};
        return this.http.delete('http://localhost:54058/api/devices/delete'+ body);
    }    
    getSensors() {
        return this.http.get('http://localhost:54058/api/sensors');
    }
    deleteSensor(sensor: Sensor) {
        const body = { mac: sensor.mac};
        return this.http.delete('http://localhost:54058/api/sensors/delete'+ body);
    }
    postRunMethod(baseHouseSlaveInvoker: BaseHouseSlaveInvoker) {
        const body = { connectionId: baseHouseSlaveInvoker.connectionId, name: baseHouseSlaveInvoker.name, address: baseHouseSlaveInvoker.address};
        return this.http.post('http://localhost:54058/api/devices/run', body);
    }
    
}