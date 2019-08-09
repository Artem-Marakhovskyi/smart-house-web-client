import { Component, OnInit } from '@angular/core';
import { Device } from './entities/device';
import { HttpService } from './http.service';

@Component({
    selector: 'devices-app',
    templateUrl: './devices.component.html',
    providers: [HttpService]
})
export class DevicesComponent implements OnInit {
    devices: Array<Device>;
    error: any;

    constructor(private httpService: HttpService) { }

    ngOnInit() {
        this.httpService.getData().subscribe(
            (data: Array<Device>) =>
                this.devices = data["deviceList"],
            error => {
                this.error = error.message;
                console.log(error);
            }
        );
    }
}