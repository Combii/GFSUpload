import { Injectable } from '@angular/core';
import { IBookKeeping } from 'src/models/IbookKeeping';
import { IAccountBookKeeping } from 'src/models/IAccountBookKeeping';

@Injectable({
  providedIn: 'root',
})
export class DefaultValueService {
  constructor() {}

  insertDefaultChartValues(bookKeeping: IBookKeeping): IBookKeeping {
    Object.keys(bookKeeping).forEach((key) => {
      // Do not remove + '' after as this is necessary for API compatibility
      bookKeeping[key] = this.defaultValue(bookKeeping[key]) + '';
    });

    this.defaultKngr(bookKeeping);
    this.defaultSkemarakke(bookKeeping);

    return bookKeeping;
  }

  insertDefaultAccountValues(
    bookKeeping: IAccountBookKeeping
  ): IAccountBookKeeping {

    Object.keys(bookKeeping).forEach(key => {
      // Do not remove + '' after as this is necessary for API compatibility
      bookKeeping[key] = this.defaultValue(bookKeeping[key]) + '';
    })

    return bookKeeping;
  }

  defaultSkemarakke(bookKeeping: IBookKeeping): IBookKeeping {
    // hvis tom skal den default til "NOCHARTNAME"
    // hvis tom skal kolonne G default til  "0"

    // G = valutakode
    // K = pdst

    if (!this.isNotEmptyString(bookKeeping.skemarakke)) {
      bookKeeping.skemarakke = 'NOCHARTNAME';
      bookKeeping.valutakod = '0';
    }
    return bookKeeping;
  }

  defaultValue(value: string): string {
    if (!this.isNotEmptyString(value)) {
      return ' ‏‏‎ ';
    }
    return value;
  }

  defaultKngr(bookKeeping: IBookKeeping): IBookKeeping {
    // hvis tom default til 00 (nul nul)
    // hvis 1 karakter lang , konkaterer den med et foranstillet 0 (nul)
    // må ikke være over 2 karakter lang , konflikter med output defination som er 8 lang

    if (!this.isNotEmptyString(bookKeeping.kngr)) {
      bookKeeping.kngr = '00';
    } else if (bookKeeping.kngr.length === 1) {
      bookKeeping.kngr = '0' + bookKeeping.kngr;
    }
    return bookKeeping;
  }

  private isNotEmptyString(dataString: string): boolean {
    if (dataString === undefined) {
      return false;
    } else if (dataString.length <= 0) {
      return false;
    } else if (dataString === ' ') {
      return false;
    } else if (dataString === ' ‏‏‎ ') {
      return false;
    }

    return true;
  }
}
