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

  /**
   * Initialize. Set url from ./connectionStringProvider.service
   * @constructor
   * @param  {HttpClient} privatehttp
   * @param  {ConnectionStringProviderService} privateconnectionStringProviderService
   */
  constructor(
    private http: HttpClient,
    private connectionStringProviderService: ConnectionStringProviderService
  ) {
    this.url = this.connectionStringProviderService.getUrl();
  }

  /**
   * Get list of devices from WEB API
   * @returns Observable
   */
  getDevices(): Observable<Array<Device>> {
    return this.http.get<Array<Device>>(this.url + "api/hub/devices");
  }

  /**
   * Delete device from DB
   * @param  {Device} device - Deleted device
   */
  deleteDevice(device: Device) {
    return this.http.delete(this.url + "api/devices/mac?mac=" + device.mac);
  }

  /**
   * Get list of sensors from WEB API
   * @returns Observable
   */
  getSensors(): Observable<Array<Sensor>> {
    return this.http.get<Array<Sensor>>(this.url + "api/hub/sensors");
  }

  /**
   * Get sensor from WEB API using its MAC
   * @param  {String} mac - MAC address of sensor
   * @returns Observable
   */
  getSensor(mac: String): Observable<Sensor> {
    return this.http.get<Sensor>(this.url + "api/hub/sensors/mac?mac=" + mac);
  }

  /**
   * Delete sensor from DB
   * @param  {Sensor} sensor - Deleted sensor
   */
  deleteSensor(sensor: Sensor) {
    return this.http.delete(this.url + "api/sensors/mac?mac=" + sensor.mac);
  }

  /**
   * Run method ON or OFF which don't have parameters
   * @param {HouseSlaveInvoker} houseSlaveInvoker - Model of method.
   * @param  {String} mac - MAC address of device/sensor
   */
  putRunMethod(houseSlaveInvoker: HouseSlaveInvoker, mac: String) {
    const body = {
      name: houseSlaveInvoker.name,
      address: houseSlaveInvoker.address,
      args: "null"
    };
    return this.http.put(
      this.url + "api/hub/devices-sensors/mac?mac=" + mac,
      body
    );
  }

  /**
   * Get telemetry from seleceted date to today
   * @param  {String} date - Selected date
   * @returns Observable
   */
  getAllTelemetry(date: String): Observable<Array<TelemetryDynamic>> {
    return this.http.get<Array<TelemetryDynamic>>(
      this.url + " api/sensors/getAllTelemetry?date=" + date
    );
  }

  /**
   * Run method with parameters. Send FormData to WEB API.
   * @param  {FormData} fd - FormData which send to WEB API.
   */
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
