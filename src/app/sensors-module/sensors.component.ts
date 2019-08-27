import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Sensor } from '../entities/sensor';
import { HouseSlaveInvoker } from '../entities/HouseSlaveInvoker';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { XunkCalendarModule } from 'xunk-calendar';

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
    public selDate = { date: 1, month: 1, year: 1 };

    constructor(
        private readonly httpService: HttpService,
        private readonly router: Router) { }

    ngOnInit() {
        this.selDate = XunkCalendarModule.getToday();
        this.httpService.getFakeSensorsFromJSON().subscribe( //Fake
            (data) =>
                this.sensors = data,
            error => {
                this.error = error.message;
                console.log(error);
            }
        );
    }

    switchState(HouseSlaveInvoker: HouseSlaveInvoker) {
        this.httpService.putRunMethod(HouseSlaveInvoker).subscribe(
            () => {
                this.ngOnInit();
            });
    }

    showStatistics(sensor: Sensor): void {
        this.router.navigate(['statistics', sensor.mac], { queryParams: { date: this.selDate.date, month: this.selDate.month, year:this.selDate.year} });
        
    }

    delete(sensor: Sensor) {
        this.httpService.deleteSensor(sensor).subscribe(
            () => {
                this.ngOnInit();
            });
    }
}