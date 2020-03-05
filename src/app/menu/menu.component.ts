import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CheckboxService } from "../services/checkbox.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  uploadToGfsChecked: boolean;
  bookInFebosChecked: boolean;
  bookInFebosAnduploadToGfsChecked: boolean;

  constructor(
    private router: Router,
    private checkBoxService: CheckboxService
  ) {}

  ngOnInit() {
    this.uploadToGfsChecked = this.checkBoxService.uploadToGfs;
    this.bookInFebosChecked = this.checkBoxService.bookInFebos;
    this.bookInFebosAnduploadToGfsChecked = this.checkBoxService.bookInFebosAndUploadToGfs;
  }

  onChange(e) {
    switch (e.target.name) {
      case "upload":
        this.checkBoxService.uploadToGfs = e.target.checked;
        break;
      case "book":
        this.checkBoxService.bookInFebos = e.target.checked;
        break;
      case "bookAndUpload":
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
