import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHouseSlaveInvoker } from '../entities/BaseHouseSlaveInvoker';
import { Device } from '../entities/device';
import { Sensor } from '../entities/sensor';
import { Observable } from 'rxjs';
import { TelemetryData } from '../entities/telemetryData';
import { ConnectionStringProviderService } from './connectionStringProvider.service';

@Injectable()

export class HttpService {


    public url: string;

    constructor(
        private http: HttpClient,
        private connectionStringProviderService: ConnectionStringProviderService
    ) {
        this.url = connectionStringProviderService.getUrl();
    }

    getDevices(): Observable<Array<Device>> {
        return this.http.get<Array<Device>>(this.url + 'api/devices');
    }
    deleteDevice(device: Device) {
        return this.http.delete(this.url + 'api/devices/mac?mac=' + device.mac);
    }
    getSensors(): Observable<Array<Sensor>> {
        return this.http.get<Array<Sensor>>(this.url + 'api/sensors');
    }

    getSensor(mac: String): Observable<Sensor> {
        return this.http.get<Sensor>(this.url + 'api/sensors/mac?mac=' + mac);
    }

    deleteSensor(sensor: Sensor) {
        return this.http.delete(this.url + 'api/sensors/mac?mac=' + sensor.mac);
    }

    putRunMethod(baseHouseSlaveInvoker: BaseHouseSlaveInvoker) {
        const body = { connectionId: baseHouseSlaveInvoker.connectionId, name: baseHouseSlaveInvoker.name, address: baseHouseSlaveInvoker.address };// connectionId: baseHouseSlaveInvoker.connectionId, name: baseHouseSlaveInvoker.name, address: baseHouseSlaveInvoker.address
        return this.http.put(this.url + 'api/hub/devices-sensors', body);
    }

    getAllTelemetry(date: String): Observable<Array<TelemetryData>> {
        return this.http.get<Array<TelemetryData>>(this.url + ' api/sensors/getAllTelemetry?date=' + date);
    }
}