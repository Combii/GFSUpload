import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  uploadToGfsChecked = false;
  bookInFebosChecked = false;
  bookInFebosAnduploadToGfsChecked = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  onClickedUpload() {
    this.router.navigate(["tableEx"], {
      queryParams: {
        utg: this.uploadToGfsChecked,
        bif: this.bookInFebosChecked,
        utgabif: this.bookInFebosAnduploadToGfsChecked
      }
    });
  }
}
