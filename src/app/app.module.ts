import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DevicesComponent } from './devices-module/devices.component';
import { SensorsComponent } from './sensors-module/sensors.component';
import { StatisticsComponent } from './statistics-module/statistics.component';
import { HomeComponent } from './home-module/home.component';
import { NotFoundComponent } from './not-found.component';
import { ConnectionStringProviderService } from './services/connectionStringProvider.service';
import { ChartsModule } from 'ng2-charts';

// определение маршрутов
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'devices', component: DevicesComponent },
    { path: 'sensors', component: SensorsComponent },
    { path: 'statistics/:mac', component: StatisticsComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(appRoutes), FormsModule, ChartsModule],
    declarations: [AppComponent, HomeComponent, DevicesComponent, SensorsComponent, StatisticsComponent, NotFoundComponent],
    bootstrap: [AppComponent],
    providers: [ConnectionStringProviderService]
})
export class AppModule { }