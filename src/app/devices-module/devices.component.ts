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
    selectedDevice: Device = new Device();
    error: any;
    selectedFile: File = null;
    form: any = {};

    constructor(private httpService: HttpService) {
        this.form = {
            name: {}
        };
    }

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
    runMethod(houseSlaveInvoker: HouseSlaveInvoker) {
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
    onUpload(method: HouseSlaveInvoker, str: string = null) {

        const formData = new FormData();
        const indexOfImageArg = method.args.findIndex(arg => arg === 'image');

        if (indexOfImageArg > -1) {
            formData.append('image', this.selectedFile, this.selectedFile.name);
        }

        formData.append('method', JSON.stringify(method));

        if (str) {
            formData.append('data', str);
        }

        this.httpService.uploadImage(formData).subscribe(
            () =>
                console.log("image uploaded"),
            error => {
                this.error = error.message;
                console.log(error);
            }
        );
    }

    selectDevice(device: Device) {
        this.selectedDevice = device;
    }
}