import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Sensor } from '../entities/sensor';
import { BaseHouseSlaveInvoker } from '../entities/BaseHouseSlaveInvoker';
import { Observable } from 'rxjs';

@Component({
    selector: 'sensors-app',
    templateUrl: './sensors.component.html',
    styleUrls: ['../app.component.css'],
    providers: [HttpService]
})
export class SensorsComponent implements OnInit {
    sensors: Array<Sensor>;
    error: any;
    public selectedSensor: Sensor;

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

    switchState(baseHouseSlaveInvoker: BaseHouseSlaveInvoker) {
        this.httpService.putRunMethod(baseHouseSlaveInvoker).subscribe((data: BaseHouseSlaveInvoker) => {
            this.ngOnInit();
        });
    }

    showStatistics(sensor: Sensor): Observable<Sensor> {
        this.selectedSensor = sensor;
        return sensor;
    }

    delete(sensor: Sensor) {
        this.httpService.deleteSensor(sensor).subscribe((data: Sensor) => {
            this.ngOnInit();
        });
    }
}