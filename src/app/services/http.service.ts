import { Injectable, Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HouseSlaveInvoker } from "../entities/HouseSlaveInvoker";
import { Device } from "../entities/device";
import { Sensor } from "../entities/sensor";
import { Observable } from "rxjs";
import { ConnectionStringProviderService } from "./connectionStringProvider.service";
import { TelemetryDynamic } from "../entities/telemetryDynamic";

@Injectable()
export class HttpService {
  public url: string;

  constructor(
    private http: HttpClient,
    private connectionStringProviderService: ConnectionStringProviderService
  ) {
    this.url = this.connectionStringProviderService.getUrl();
  }

  getDevices(): Observable<Array<Device>> {
    return this.http.get<Array<Device>>(this.url + "api/hub/devices");
  }
  deleteDevice(device: Device) {
    return this.http.delete(this.url + "api/devices/mac?mac=" + device.mac);
  }
  getSensors(): Observable<Array<Sensor>> {
    return this.http.get<Array<Sensor>>(this.url + "api/hub/sensors");
  }

  getSensor(mac: String): Observable<Sensor> {
    return this.http.get<Sensor>(this.url + "api/hub/sensors/mac?mac=" + mac);
  }

  deleteSensor(sensor: Sensor) {
    return this.http.delete(this.url + "api/sensors/mac?mac=" + sensor.mac);
  }

  putRunMethod(HouseSlaveInvoker: HouseSlaveInvoker, mac: String) {
    const body = {
      name: HouseSlaveInvoker.name,
      address: HouseSlaveInvoker.address,
      args: "null"
    };
    return this.http.put(
      this.url + "api/hub/devices-sensors/mac?mac=" + mac,
      body
    );
  }

  getAllTelemetry(date: String): Observable<Array<TelemetryDynamic>> {
    return this.http.get<Array<TelemetryDynamic>>(
      this.url + " api/sensors/getAllTelemetry?date=" + date
    );
  }

  uploadFormData(fd: FormData) {
    return this.http.put(this.url + "api/hub/devices-sensors", fd);
  }

  //-----------Fake
  getFakeTelemetryFromJSON(): Observable<Array<TelemetryDynamic>> {
    return this.http.get<Array<TelemetryDynamic>>("telemetry.json");
  }

  getFakeDevicesFromJSON(): Observable<Array<Device>> {
    return this.http.get<Array<Device>>("devices.json");
  }

  getFakeSensorsFromJSON(): Observable<Array<Sensor>> {
    return this.http.get<Array<Sensor>>("devices.json");
  }
}
