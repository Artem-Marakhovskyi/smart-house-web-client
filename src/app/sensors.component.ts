import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { Sensor } from './entities/sensor';
import { BaseHouseSlaveInvoker } from './entities/BaseHouseSlaveInvoker';

@Component({
    selector: 'sensors-app',
    templateUrl: './sensors.component.html',
    styleUrls: ['./app.component.css'],
    providers: [HttpService]
})
export class SensorsComponent implements OnInit {
    sensors: Array<Sensor>;
    error: any;

    constructor(private httpService: HttpService) { }

    ngOnInit() {
        this.httpService.getSensors().subscribe(
            (data: Array<Sensor>) =>
                this.sensors = data,
            error => {
                this.error = error.message;
                console.log(error);
            }
        );
    }

    submit(baseHouseSlaveInvoker: BaseHouseSlaveInvoker){
        this.httpService.postRunMethod(baseHouseSlaveInvoker).subscribe((data:BaseHouseSlaveInvoker) => {
            this.ngOnInit();
        });
    }
}