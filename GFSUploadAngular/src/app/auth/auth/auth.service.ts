import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NgForm } from "@angular/forms";
import { Subject, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "./user.model";

interface AuthResponseData {
  token: string;
  user: {
    id: string;
    username: string;
  };
}

@Injectable({ providedIn: "root" })
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  signup(form: NgForm) {
    this.http
      .post<AuthResponseData>("http://localhost:5000/api/auth/register", {
        Username: form.value.email,
        Password: form.value.password
      })
      .pipe(
        tap(resData => {
          //this.token.next(resData.token)
        })
      )
      .subscribe(reponse => {
        console.log(reponse);
      });
  }

  login(username: string, password: string) {
    return this.http
      .post<AuthResponseData>("http://localhost:5000/api/auth/login", {
        Username: username,
        Password: password
      })
      .pipe(
        tap(resData => {
          const expirationDate = new Date(
            new Date().setDate(new Date().getDate() + 1)
          );
          this.user.next(
            new User(
              resData.user.username,
              resData.user.id,
              resData.token,
              expirationDate
            )
          );
        })
      );
  }
}
