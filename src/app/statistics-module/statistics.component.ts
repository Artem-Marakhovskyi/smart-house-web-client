import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Sensor } from '../entities/sensor';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'statistics-app',
    templateUrl: './statistics.component.html',
    styleUrls: ['../app.component.css'],
    providers: [HttpService]
})

export class StatisticsComponent implements OnInit {


    public mac: string = "null";
    sensor: Sensor;
    error: any;

    constructor(
        private httpService: HttpService,
        private route: ActivatedRoute
    ) {
        this.mac = this.route.snapshot.params['mac'];
    }

    ngOnInit() {
        this.httpService.getSensor(this.mac).subscribe(
            (data: Sensor) =>
                this.sensor = data,
            error => {
                this.error = error.message;
                console.log(error);
            }
        );
    }

    // getTelemetry(){
    //     this.httpService.getAllTelemetryFromJSON(this.mac).subscribe(
    //         (data: Sensor) =>
    //             this.sensor = data,
    //         error => {
    //             this.error = error.message;
    //             console.log(error);
    //         }
    //     );
    // }

    public barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true

    };
    public barChartLabels = ['10:00', '10:10', '10:20', '10:30', '10:40', '10:50', '11:00'];
    public barChartType = 'line';
    public barChartLegend = true;
    public barChartData = [
        {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            borderColor: 'rgba(0, 0, 0, 0.7)',
            borderJoinStyle: 'round', //Line joint style "bevel" || "round" || "miter"
            borderWidth: 4,
            cubicInterpolationMode: 'monotone', //interpolation modes 'default','monotone'
            lineTension: 0, //Bezier curve tension of the line. Set to 0 to draw straightlines. This option is ignored if monotone cubic interpolation is used.
            pointBackgroundColor: 'rgba(220, 0, 0, 1.0)',//The fill color for points.
            pointBorderColor: 'rgba(0, 0, 0, 1.0)',
            pointBorderWidth: 0,
            pointHitRadius: 1,
            pointHoverBackgroundColor:'rgba(255, 255, 255, 1.0)', //Point background color when hovered.
            pointHoverBorderColor:'rgba(150, 150, 150, 1.0)',
            data: [25, 31, 32, 29, 32, 27, 24],

            label: this.mac
        }
    ];


}