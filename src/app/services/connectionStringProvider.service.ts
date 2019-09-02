import { Injectable } from "@angular/core";

@Injectable()
export class ConnectionStringProviderService {
  public url: string = "http://localhost:8083/";

  getUrl(): string {
    return this.url;
  }
}
