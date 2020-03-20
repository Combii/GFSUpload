import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(form: NgForm) {
    this.http
      .post('http://localhost:5000/api/auth/register', {
          Username: form.value.email,
          Password: form.value.password
      })
      .subscribe(reponse => {
        console.log(reponse);
      });
  }
}
