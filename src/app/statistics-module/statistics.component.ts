import { Component, OnInit } from "@angular/core";
import { HttpService } from "../services/http.service";
import { Sensor } from "../entities/sensor";
import { ActivatedRoute } from "@angular/router";
import { ChartDataSets } from "chart.js";
import { HouseSlaveInvoker } from "../entities/houseSlaveInvoker";

@Component({
  selector: "statistics-app",
  templateUrl: "./statistics.component.html",
  styleUrls: ["../app.component.css"],
  providers: [HttpService]
})
export class StatisticsComponent implements OnInit {
  public mac: string = "undefined";
  public sensor: Sensor;
  public sensors: Array<Sensor>;
  public error: any;
  public telemetryData: Array<number> = [];
  public selDate = { date: 1, month: 1, year: 1 };

  public barChartLabels: String[] = [];
  public barChartType = "line";
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  constructor(private httpService: HttpService, private route: ActivatedRoute) {
    this.mac = this.route.snapshot.params["mac"];
    this.route.queryParams.subscribe(params => {
      (this.selDate.date = params["date"]),
        (this.selDate.month = params["month"]),
        (this.selDate.year = params["year"]);
    });
  }

  ngOnInit() {
    this.renewState();
  }

  /**
   * Get sensor state and telemetry from WEB API. Make new chart.
   */
  private renewState() {
    this.telemetryData = [];
    this.barChartLabels = [];
    this.barChartData = [];
    this.httpService.getFakeSensorsFromJSON().subscribe(
      (data: Sensor[]) =>
        data.forEach((value: Sensor) => {
          if (value.mac == this.mac) {
            this.sensor = value;
          }
        }),
      error => {
        this.error = error.message;
        console.log(error);
      }
    );
    this.httpService
      .getFakeTelemetryFromJSON(
        this.selDate.date + "." + this.selDate.month + "." + this.selDate.year
      )
      .subscribe(
        data => {
          data.forEach(x => {
            if (x.data.MACSensor == this.mac) {
              this.barChartLabels.push(x.timeRecieve.toString());
              this.telemetryData.push(x.data.value);
            }
          });
          this.barChartData = [
            {
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              borderColor: "rgba(0, 0, 0, 0.7)",
              borderJoinStyle: "round", //Line joint style "bevel" || "round" || "miter"
              borderWidth: 4,
              cubicInterpolationMode: "monotone", //interpolation modes 'default','monotone'
              lineTension: 0, //Bezier curve tension of the line. Set to 0 to draw straightlines.
              pointBackgroundColor: "rgba(220, 0, 0, 1.0)", //The fill color for points.
              pointBorderColor: "rgba(0, 0, 0, 1.0)",
              pointBorderWidth: 0,
              pointHoverBackgroundColor: "rgba(255, 255, 255, 1.0)", //Point background color when hovered.
              pointHoverBorderColor: "rgba(150, 150, 150, 1.0)",
              data: this.telemetryData,
              label: this.sensor.name
            }
          ];
        },
        error => {
          this.error = error.message;
          console.log(error);
        }
      );
  }

  /**
   * Run method ON or OFF which don't have parameters
   * @param {HouseSlaveInvoker} houseSlaveInvoker - Model of method.
   * @param {string} mac - MAC address of sensor
   */
  switchState(HouseSlaveInvoker: HouseSlaveInvoker, mac: string) {
    this.httpService.putRunMethod(HouseSlaveInvoker, mac).subscribe(() => {
      this.renewState();
    });
  }
}
