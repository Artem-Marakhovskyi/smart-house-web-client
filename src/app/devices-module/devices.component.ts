import { Component, OnInit } from "@angular/core";
import { Device } from "../entities/device";
import { HttpService } from "../services/http.service";
import { HouseSlaveInvoker } from "../entities/houseSlaveInvoker";

@Component({
  selector: "devices-app",
  templateUrl: "./devices.component.html",
  styleUrls: ["../app.component.css"],
  providers: [HttpService]
})
export class DevicesComponent implements OnInit {
  devices: Array<Device>;
  selectedDevice: Device = new Device();
  error: any;
  selectedFile: File = null;
  form: any = {};
  json: any;

  constructor(private httpService: HttpService) {
    this.form = {
      name: {}
    };
  }

  ngOnInit() {
    this.httpService.getFakeDevicesFromJSON().subscribe(
      //Fake
      (data: Array<Device>) => (this.devices = data),
      error => {
        this.error = error.message;
        console.log(error);
      }
    );
  }
  runMethod(houseSlaveInvoker: HouseSlaveInvoker) {
    this.httpService
      .putRunMethod(houseSlaveInvoker, this.selectedDevice.mac)
      .subscribe((data: HouseSlaveInvoker) => {
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
    const formData = new FormData();
    // const indexOfImageArg = method.args.findIndex(arg => arg.type === 'image');

    // if (indexOfImageArg > -1) {
    method.args.forEach(x => {
      if (x.type == "image") {
        x.value = this.sellersPermitString;
      }
    });
    method.args.forEach(x => {
      if (x.type != "image") {
        x.value = (<HTMLInputElement>document.getElementById(x.name)).value;
      }
    });
    //}

    formData.append("method", JSON.stringify(method));

    // if (str) {
    //     str.forEach(x => {
    //         formData.append('data', x);
    //     })
    // }
    this.json = JSON.stringify(method);

    this.httpService.uploadFormData(this.json).subscribe(
      () => console.log("FormData uploaded"),
      error => {
        this.error = error.message;
        console.log(error);
      }
    );
  }

  selectDevice(device: Device) {
    this.selectedDevice = device;
  }
  //turn image to base64
  sellersPermitFile: any;
  sellersPermitString: string;

  public picked(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.selectedFile = fileList[0];

      this.sellersPermitFile = this.selectedFile;
      this.handleInputChange(this.selectedFile); //turn into base64
    } else {
      alert("No file selected");
    }
  }
  handleInputChange(file: any) {
    var file;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert("invalid format");
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e: any) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(",") + 1);
    //this.imageSrc = base64result;

    this.sellersPermitString = base64result;

    this.log();
  }
  log() {
    // for debug
    console.log(this.sellersPermitString);
  }
}
