import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onSignUp(email: string, password: string) {
    return this.http.post("https://", {
      email,
      password
    });
  }

  onSignIn(email: string, password: string) {
    /*  this.http.post("https://", {
      email,
      password
    }); */
  }

  onSwitchMode() {}
}
