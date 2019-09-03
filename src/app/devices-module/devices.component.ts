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
  public devices: Array<Device>;
  public selectedDevice: Device = new Device();
  public error: any;
  public selectedFile: File = null;
  public form: any = {};
  private json: any;

  /**
   * Initialize form for modal
   * @constructor
   * @param  {HttpService} privatehttpService
   */
  constructor(private httpService: HttpService) {
    this.form = {};
  }

  /**
   * Initialization task. Run method renewState().
   */
  public ngOnInit() {
    this.renewState();
  }

  /**
   * Get list of devices from WEB API.
   */
  private renewState() {
    this.httpService.getFakeDevicesFromJSON().subscribe(
      //Fake
      (data: Array<Device>) => {
        this.devices = data;
      },
      error => {
        this.error = error.message;
        console.log(error);
      }
    );
  }

  /**
   * Run method ON or OFF which don't have parameters
   * @param {HouseSlaveInvoker} houseSlaveInvoker - Model of method.
   */
  public runMethod(houseSlaveInvoker: HouseSlaveInvoker) {
    this.httpService
      .putRunMethod(houseSlaveInvoker, this.selectedDevice.mac)
      .subscribe((data: HouseSlaveInvoker) => {
        this.renewState();
      });
  }

  /**
   * Delete device from DB
   * @param  {Device} device - Model of device.
   */
  public delete(device: Device) {
    this.httpService.deleteDevice(device).subscribe(() => {
      this.renewState();
    });
  }

  /**
   * Set image as selectedFile
   * @param {any} event - Event that fires when we select image
   */
  public onImageSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  /**
   * Run method with parameters. Send FormData to WEB API.
   * @param {HouseSlaveInvoker} houseSlaveInvoker - Model of method.
   */
  public onUpload(method: HouseSlaveInvoker) {
    const formData = new FormData();
    method.args.forEach(x => {
      if (x.type == "image") {
        x.value = "["+this.bace64ToByte(this.sellersPermitString)+"]";
        //x.value = this.sellersPermitString;
      }
    });
    method.args.forEach(x => {
      if (x.type != "image") {
        x.value = (<HTMLInputElement>document.getElementById(x.name)).value;
      }
    });
    formData.append("method", JSON.stringify(method));
    this.json = JSON.stringify(method);
    this.httpService.uploadFormData(this.json).subscribe(
      () => console.log("FormData uploaded"),
      error => {
        this.error = error.message;
        console.log(error);
      }
    );
  }

  /**
   * Set device as selectedFile
   * @param {Device} device - Device which we need to select
   */
  public selectDevice(device: Device) {
    this.selectedDevice = device;
    console.log(this.selectedDevice);
  }

  //-------------------------------Turn image to base64

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
    this.sellersPermitString = base64result;
  }
  //-----------------
  bace64ToByte(base64:string) {
    
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    
    return array.toString();
  }
}
