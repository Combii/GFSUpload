import { Directive, ElementRef, Input, OnInit, HostBinding } from '@angular/core';

@Directive({
  selector: '[appErrorNotification]'
})
export class ErrorNotificationDirective implements OnInit {
  defaultColor = 'transparent';
  @Input('appErrorNotification') errorsArray: string[];
  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.backgroundColor = this.defaultColor;
    this.checkIfErrorsOrNot();
    // console.log(this.errorsArray);
  }

  checkIfErrorsOrNot() {
    if (this.errorsArray.length > 0) {
      this.backgroundColor = 'red';
    }
  }
}
