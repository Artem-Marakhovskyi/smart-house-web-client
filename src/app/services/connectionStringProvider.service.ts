import { Injectable } from '@angular/core';

export class ConnectionStringProviderService {
    public url: string =  "http://localhost:59997/";
     
    getUrl(): string {
         
        return this.url;
    }
}