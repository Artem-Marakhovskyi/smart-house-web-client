import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHouseSlaveInvoker } from './entities/BaseHouseSlaveInvoker';
import { Device } from './entities/device';
import { Sensor } from './entities/sensor';

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }

    getDevices() {
        return this.http.get('http://a8909b38.ngrok.io/api/hub/devices');
    }
    deleteDevice(device: Device) {
        return this.http.delete('http://a8909b38.ngrok.io/api/hub/devices' + device.mac);
    }
    getSensors() {
        return this.http.get('http://a8909b38.ngrok.io/api/hub/sensors');
    }
    deleteSensor(sensor: Sensor) {
        return this.http.delete('http://a8909b38.ngrok.io/api/hub/sensors' + sensor.mac);
    }
    putRunMethod(baseHouseSlaveInvoker: BaseHouseSlaveInvoker) {
        const body = { connectionId: baseHouseSlaveInvoker.connectionId, name: baseHouseSlaveInvoker.name, address: baseHouseSlaveInvoker.address };// connectionId: baseHouseSlaveInvoker.connectionId, name: baseHouseSlaveInvoker.name, address: baseHouseSlaveInvoker.address
        return this.http.put('http://a8909b38.ngrok.io/api/hub/devices-sensors', body);
    }

}