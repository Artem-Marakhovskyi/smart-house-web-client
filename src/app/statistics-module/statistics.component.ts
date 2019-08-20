import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Sensor } from '../entities/sensor';
import { BaseHouseSlaveInvoker } from '../entities/BaseHouseSlaveInvoker';
import { SensorsComponent } from '../sensors-module/sensors.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'sensors-app',
    //templateUrl: './sensors.component.html',
    template: `
    Bank Name: {{mac}}
  `,
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
        // this.httpService.getSensor(this.sensor).subscribe(
        //     (data: Sensor) =>
        //         this.sensor = data,
        //     error => {
        //         this.error = error.message;
        //         console.log(error);
        //     }
        // );
    }

    // submit(baseHouseSlaveInvoker: BaseHouseSlaveInvoker) {
    //     this.httpService.putRunMethod(baseHouseSlaveInvoker).subscribe((data: BaseHouseSlaveInvoker) => {
    //         this.ngOnInit();
    //     });
    // }
    // delete(sensor: Sensor) {
    //     this.httpService.deleteSensor(sensor).subscribe((data: Sensor) => {
    //         this.ngOnInit();
    //     });
    // }
}