import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { Sensor } from './entities/sensor';

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
        this.httpService.getData().subscribe(
            (data: Array<Sensor>) =>
                this.sensors = data["sensorList"],
            error => {
                this.error = error.message;
                console.log(error);
            }
        );
    }
}