import { Component, OnInit } from '@angular/core';
import { Device } from '../entities/device';
import { HttpService } from '../services/http.service';
import { HouseSlaveInvoker } from '../entities/houseSlaveInvoker';

@Component({
    selector: 'devices-app',
    templateUrl: './devices.component.html',
    styleUrls: ['../app.component.css'],
    providers: [HttpService]
})
export class DevicesComponent implements OnInit {
    devices: Array<Device>;
    error: any;
    selectedFile: File = null;

    constructor(private httpService: HttpService) { }

    ngOnInit() {
        this.httpService.getFakeDevicesFromJSON().subscribe( //Fake
            (data: Array<Device>) =>
                this.devices = data,
            error => {
                this.error = error.message;
                console.log(error);
            }
        );
    }
    submit(houseSlaveInvoker: HouseSlaveInvoker) {
        this.httpService.putRunMethod(houseSlaveInvoker).subscribe((data: HouseSlaveInvoker) => {
            this.ngOnInit();
        });
    }
    delete(device: Device) {
        this.httpService.deleteDevice(device).subscribe((data: Device) => {
            this.ngOnInit();
        });
    }
    onImageSelected(event: any) {
        this.selectedFile = event.target.files[0];
    }
    onUpload(method: HouseSlaveInvoker) {
        const fd = new FormData();
        fd.append('image', this.selectedFile, this.selectedFile.name);
        this.httpService.uploadImage(fd, method).subscribe( 
            () =>
            console.log("image uploaded"),
            error => {
                this.error = error.message;
                console.log(error);
            }
        );

    }
}