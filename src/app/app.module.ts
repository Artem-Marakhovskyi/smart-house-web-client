import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 
import {Routes, RouterModule} from '@angular/router';
 
import { AppComponent }   from './app.component';
import { DevicesComponent }   from './devices.component';
import { HomeComponent }   from './home.component';
import { NotFoundComponent }   from './not-found.component';
 
// определение маршрутов
const appRoutes: Routes =[
    { path: '', component: HomeComponent},
    { path: 'devices', component: DevicesComponent},
    { path: '**', component: NotFoundComponent }
];
 
@NgModule({
    imports:      [ BrowserModule, RouterModule.forRoot(appRoutes)],
    declarations: [ AppComponent, HomeComponent, DevicesComponent, NotFoundComponent],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }