import { Directive, ElementRef, Input, OnInit, HostBinding } from '@angular/core';

@Directive({
  selector: '[appErrorNotification]'
})
export class ErrorNotificationDirective implements OnInit {
  @Input('appErrorNotification') errorsArray: string[];
  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.checkIfErrorsOrNot();
    this.elRef.nativeElement.style.position = 'relative';
  }

  checkIfErrorsOrNot() {
    if (this.errorsArray.length > 0) {
      this.backgroundColor = 'red';
    }
  }
}
