import { Component} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Device } from './entities/device';
  
@Component({
    selector: 'devices-app',
    template: `<h3>Devices</h3>    
    <p>MAC: {{device?.MAC}}</p>`
})
export class DevicesComponent { 
    device: Device;
}