import { Directive, ElementRef, Input, OnInit, HostBinding } from '@angular/core';
import { IBookKeeping } from 'src/models/IbookKeeping';

@Directive({
  selector: '[appErrorNotification]'
})
export class ErrorNotificationDirective implements OnInit {
  @Input('appErrorNotification') errorsArray: string[];
  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    console.log(this.errorsArray);
  }

  
}
