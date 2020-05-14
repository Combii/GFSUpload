import { Injectable } from '@angular/core';
import { IBookKeeping } from 'src/models/IbookKeeping';

@Injectable({
  providedIn: 'root'
})
export class DefaultValueService {

constructor() { }

insertDefault(bookKeeping : IBookKeeping): IBookKeeping {

  Object.keys(bookKeeping).forEach(key => {
    switch(key) {
      case 'kngr':
        bookKeeping[key] = this.defaultKngr(bookKeeping[key]);
        break;
      default:
        bookKeeping[key] = this.defaultValue(bookKeeping[key]);
    }
  })


  // bookKeeping.kngr = this.defaultKngr(bookKeeping.kngr);

  return bookKeeping
}
  defaultValue(value: string): string {
    if(!this.isNotEmptyString(value)){
    return ' ‏‏‎ ';
    }

    return value;
  }

defaultKngr(kngr: string): string {
  // hvis tom default til 00 (nul nul)
  // hvis 1 karakter lang , konkaterer den med et foranstillet 0 (nul)
  // må ikke være over 2 karakter lang , konflikter med output defination som er 8 lang

  if (!this.isNotEmptyString(kngr)) {
    kngr = '00';
  }
  else if(kngr.length === 1){
    kngr = '0' + kngr;
  }

  return kngr;
}

private isNotEmptyString(dataString: string): boolean {
  if(dataString === undefined){
    return false;
  }
  else if (dataString.length <= 0) {
    return false;
  } else if (dataString === ' ') {
    return false;
  } else if (dataString === ' ‏‏‎ ') {
    return false;
  }

  return true;
}

}
