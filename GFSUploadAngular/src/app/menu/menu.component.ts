import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckboxService } from '../services/checkbox.service';
import { AuthService } from '../auth/auth/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  uploadToGfsChecked: boolean;
  bookInFebosChecked: boolean;
  bookInFebosAnduploadToGfsChecked: boolean;
  isAuthenticated = false;

  constructor(
    private router: Router,
    private checkBoxService: CheckboxService,
    private authService: AuthService
  ) {}

  ngOnInit() {

    this.authService.user.pipe(take(1)).subscribe(user => {
      console.log(user)
      this.isAuthenticated = !!user
    })

    this.uploadToGfsChecked = this.checkBoxService.uploadToGfs;
    this.bookInFebosChecked = this.checkBoxService.bookInFebos;
    this.bookInFebosAnduploadToGfsChecked = this.checkBoxService.bookInFebosAndUploadToGfs;
  }

  onChange(e: { target: { name: any; checked: boolean; }; }) {
    switch (e.target.name) {
      case 'upload':
        this.checkBoxService.uploadToGfs = e.target.checked;
        break;
      case 'book':
        this.checkBoxService.bookInFebos = e.target.checked;
        break;
      case 'bookAndUpload':
        this.checkBoxService.bookInFebosAndUploadToGfs = e.target.checked;
    }
  }

  onClickedUpload() {
    this.router.navigate(["tableAccount"], {
      queryParams: {
        utg: this.uploadToGfsChecked,
        bif: this.bookInFebosChecked,
        utgabif: this.bookInFebosAnduploadToGfsChecked
      }
    });
  }

}
