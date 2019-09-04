import { Injectable } from "@angular/core";

@Injectable()
export class ConnectionStringProviderService {
  public url: string = "http://f9d4ad44.ngrok.io/";

  /**
   * Return URL of WEB API
   * @returns string
   */
  getUrl(): string {
    return this.url;
  }
}
