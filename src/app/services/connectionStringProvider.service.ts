import { Injectable } from "@angular/core";

@Injectable()
export class ConnectionStringProviderService {
  public url: string = "http://01f4020c.ngrok.io/";

  /**
   * Return URL of WEB API
   * @returns string
   */
  getUrl(): string {
    return this.url;
  }
}
