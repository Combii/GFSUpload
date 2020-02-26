import { Directive, ElementRef, Input } from '@angular/core';
import { IBookKeeping } from 'src/models/IbookKeeping';

@Directive({
  selector: '[appErrorNotification]'
})
export class ErrorNotificationDirective {

  @Input('appErrorNotification') errorsArray: string[];
  
  constructor(private el: ElementRef) {
    console.log(this.errorsArray);
   }

}

//AccountingDate IDKT OriginalIDKT Text
