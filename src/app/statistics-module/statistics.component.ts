import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Sensor } from '../entities/sensor';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets } from 'chart.js';

@Component({
    selector: 'statistics-app',
    templateUrl: './statistics.component.html',
    styleUrls: ['../app.component.css'],
    providers: [HttpService]
})

export class StatisticsComponent implements OnInit {

    public mac: string = "null";
    sensor: Sensor;
    sensors: Array<Sensor>;
    error: any;
    telemetryData: Array<number> = [];

    public barChartLabels: String[] = [];
    public barChartType = 'line';
    public barChartLegend = true;
    public barChartData: ChartDataSets[] = [];

    public barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
    };

    constructor(
        private httpService: HttpService,
        private route: ActivatedRoute
    ) {
        this.mac = this.route.snapshot.params['mac'];
    }

    ngOnInit() {
        this.httpService.getFakeSensorsFromJSON().subscribe(
            (data) =>
                this.sensor = data[0],
            error => {
                this.error = error.message;
                console.log(error);
            }
        );
        this.httpService.getFakeTelemetryFromJSON().subscribe(
            (data) => {
                data.forEach(x => this.barChartLabels.push(x.timeRecieve.toString()));
            },
            error => {
                this.error = error.message;
                console.log(error);
            }
        );
        this.httpService.getFakeTelemetryFromJSON().subscribe(
            (data) => {
                data.forEach(x => this.telemetryData.push(x.data.value));
                this.barChartData = [
                    {
                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                        borderColor: 'rgba(0, 0, 0, 0.7)',
                        borderJoinStyle: 'round', //Line joint style "bevel" || "round" || "miter"
                        borderWidth: 4,
                        cubicInterpolationMode: 'monotone', //interpolation modes 'default','monotone'
                        lineTension: 0, //Bezier curve tension of the line. Set to 0 to draw straightlines.
                        pointBackgroundColor: 'rgba(220, 0, 0, 1.0)',//The fill color for points.
                        pointBorderColor: 'rgba(0, 0, 0, 1.0)',
                        pointBorderWidth: 0,
                        pointHoverBackgroundColor: 'rgba(255, 255, 255, 1.0)', //Point background color when hovered.
                        pointHoverBorderColor: 'rgba(150, 150, 150, 1.0)',
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
}