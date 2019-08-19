import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { DevicesComponent } from './devices-module/devices.component';
import { SensorsComponent } from './sensors-module/sensors.component';
import { HomeComponent } from './home-module/home.component';
import { NotFoundComponent } from './not-found.component';

// определение маршрутов
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'devices', component: DevicesComponent },
    { path: 'sensors', component: SensorsComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
    declarations: [AppComponent, HomeComponent, DevicesComponent, SensorsComponent, NotFoundComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }