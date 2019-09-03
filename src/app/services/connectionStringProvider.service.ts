import { Injectable } from "@angular/core";

@Injectable()
export class ConnectionStringProviderService {
  public url: string = "http://localhost:8080/";

  /**
   * Return URL of WEB API
   * @returns string
   */
  getUrl(): string {
    return this.url;
  }
}
