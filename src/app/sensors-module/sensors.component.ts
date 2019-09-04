import { Component, OnInit } from "@angular/core";
import { HttpService } from "../services/http.service";
import { Sensor } from "../entities/sensor";
import { HouseSlaveInvoker } from "../entities/HouseSlaveInvoker";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { XunkCalendarModule } from "xunk-calendar";

@Component({
  selector: "sensors-app",
  templateUrl: "./sensors.component.html",
  styleUrls: ["../app.component.css"],
  providers: [HttpService]
})
export class SensorsComponent implements OnInit {
  public sensors: Array<Sensor>;
  public error: any;
  public myVar: any;
  public selectedSensor: Sensor;
  public selDate = { date: 1, month: 1, year: 1 };

  /**
   * Initialize httpService and router
   * @constructor
   * @param  {HttpService} privatereadonlyhttpService
   * @param  {Router} privatereadonlyrouter
   */
  constructor(
    private readonly httpService: HttpService,
    private readonly router: Router
  ) {}

  /**
   * Initialization task. Run method renewState().
   */
  ngOnInit() {
    this.renewState();

    this.myVar = setInterval(() => this.renewState.apply(this), 20000);
  }

  ngOnDestroy() {
    clearInterval(this.myVar);
  }

  /**
   * Get list of sensors from WEB API and set today date
   */
  private renewState() {
    this.selDate = XunkCalendarModule.getToday();
    this.httpService.getSensors().subscribe(
      data => (this.sensors = data),
      error => {
        this.error = error.message;
        console.log(error);
      }
    );
  }

  /**
   * Run method ON or OFF which don't have parameters
   * @param {HouseSlaveInvoker} houseSlaveInvoker - Model of method.
   */
  public runMethod(HouseSlaveInvoker: HouseSlaveInvoker, mac: string) {
    this.httpService.putRunMethod(HouseSlaveInvoker, mac).subscribe(() => {
      this.renewState();
    });
  }

  /**
   * Routes to statistics module
   * @returns void
   */
  public showStatistics(): void {
    this.router.navigate(["statistics", this.selectedSensor.mac], {
      queryParams: {
        date: this.selDate.date,
        month: this.selDate.month + 1,
        year: this.selDate.year
      }
    });
  }

  /**
   * Delete sensor from DB
   * @param  {Sensor} sensor - Model of sensor
   */
  public delete(sensor: Sensor) {
    this.httpService.deleteSensor(sensor).subscribe(() => {
      this.renewState();
    });
  }

  /**
   * Set sensor as selectedSensor
   * @param  {Sensor} sensor
   */
  public selectSensor(sensor: Sensor) {
    this.selectedSensor = sensor;
  }
}
