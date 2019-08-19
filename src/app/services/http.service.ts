import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHouseSlaveInvoker } from '../entities/BaseHouseSlaveInvoker';
import { Device } from '../entities/device';
import { Sensor } from '../entities/sensor';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }

    getDevices(): Observable<Array<Device>> {
        return this.http.get<Array<Device>>('http://localhost:59997/api/devices');
    }
    deleteDevice(device: Device) {
        return this.http.delete('http://localhost:59997/api/devices' + device.mac);
    }
    getSensors(): Observable<Array<Sensor>> {
        return this.http.get<Array<Sensor>>('http://localhost:59997/api/sensors');
    }

    getSensor(sensor: Sensor): Observable<Sensor> {
        return this.http.get<Sensor>('http://localhost:59997/api/sensors'+ sensor.mac);
    }

    deleteSensor(sensor: Sensor) {
        return this.http.delete('http://localhost:59997/api/sensors' + sensor.mac);
    }
    putRunMethod(baseHouseSlaveInvoker: BaseHouseSlaveInvoker) {
        const body = { connectionId: baseHouseSlaveInvoker.connectionId, name: baseHouseSlaveInvoker.name, address: baseHouseSlaveInvoker.address };// connectionId: baseHouseSlaveInvoker.connectionId, name: baseHouseSlaveInvoker.name, address: baseHouseSlaveInvoker.address
        return this.http.put('http://localhost:59997/api/devices-sensors', body);
    }

}