import { Component, OnInit } from '@angular/core';
import { Device } from './entities/device';
import { HttpService } from './http.service';
import { HouseSlaveInvoker } from './entities/houseSlaveInvoker';

@Component({
    selector: 'devices-app',
    templateUrl: './devices.component.html',
    styleUrls: ['./app.component.css'],
    providers: [HttpService]
})
export class DevicesComponent implements OnInit {
    devices: Array<Device>;
    error: any;
    done: boolean = false;

    constructor(private httpService: HttpService) { }

    ngOnInit() {
        this.httpService.getDevices().subscribe(
            (data: Array<Device>) =>
                this.devices = data,
            error => {
                this.error = error.message;
                console.log(error);
            }
        );
    }
    submit(houseSlaveInvoker: HouseSlaveInvoker){
        this.httpService.postRunMethod(houseSlaveInvoker).subscribe((data:HouseSlaveInvoker) => {
            this.ngOnInit();
        });
    }
    delete(device: Device){
        this.httpService.deleteDevice(device).subscribe((data:Device) => {
            this.ngOnInit();
        });
    }
}