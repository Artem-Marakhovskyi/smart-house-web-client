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

    public barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
      };
      public barChartLabels = ['10:00', '10:10', '10:20', '10:30', '10:40', '10:50', '11:00'];
      public barChartType = 'line';
      public barChartLegend = true;
      public barChartData = [
        {data: [25, 31, 32, 29, 32, 27, 24], label: this.mac}
      ];
      

}