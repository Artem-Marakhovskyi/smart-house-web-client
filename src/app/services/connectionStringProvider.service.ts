import { Injectable } from "@angular/core";

@Injectable()
export class ConnectionStringProviderService {
  public url: string = "http://a93081de.ngrok.io/";

  /**
   * Return URL of WEB API
   * @returns string
   */
  getUrl(): string {
    return this.url;
  }
}
