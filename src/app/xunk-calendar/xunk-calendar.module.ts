import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";

import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

import { XunkCalendarComponent } from "./xunk-calendar.component";

@NgModule({
  declarations: [XunkCalendarComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [XunkCalendarComponent]
})
export class XunkCalendarModule {
  /**
   * Gets today's date
   * @returns any
   */
  public static getToday(): any {
    return XunkCalendarComponent.getToday();
  }

  /**
   * Pad number with zeros
   * @param  {number} num
   * @param  {number} padlen
   * @param  {} padchar="0"
   * @returns string
   */
  public static zeroPad(num: number, padlen: number, padchar = "0"): string {
    return XunkCalendarComponent.zeropad(num, padlen, padchar);
  }
}
