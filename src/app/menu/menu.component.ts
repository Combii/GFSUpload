import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckBox } from '../services/CheckBox';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  uploadToGfsChecked: boolean;
  bookInFebosChecked: boolean;
  bookInFebosAnduploadToGfsChecked: boolean;

  constructor(private router: Router) {}

  ngOnInit() {
    this.uploadToGfsChecked = CheckBox.bookInFebosAnduploadToGfsChecked;
    this.bookInFebosChecked = CheckBox.bookInFebosChecked;
    this.bookInFebosChecked = CheckBox.bookInFebosChecked;
  }

  onClickedUpload() {
    this.router.navigate(['tableAccount'], {
      queryParams: {
        utg: this.uploadToGfsChecked,
        bif: this.bookInFebosChecked,
        utgabif: this.bookInFebosAnduploadToGfsChecked
      }
    });
  }
}
