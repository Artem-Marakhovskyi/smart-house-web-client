import { Injectable } from '@angular/core';

export class ConnectionStringProviderService {
    public url: string =  "http://f129dcd1.ngrok.io";
     
    getUrl(): string {
         
        return this.url;
    }
}