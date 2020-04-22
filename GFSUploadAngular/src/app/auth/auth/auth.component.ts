import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(private http: HttpClient, private auth: AuthService) {}

  isLoginMode = false;

  ngOnInit(): void {}

  onSubmit(form: NgForm){
    console.log(form.value.email);
    console.log(form.value.password);
    //form.reset();

    let authResponse : Observable<AuthResponseData>;

    if(this.isLoginMode) {
      authResponse = this.auth.login(form.value.email,form.value.password)
    } else {
      authResponse = this.auth.signup(form.value.email,form.value.password);
    }

    authResponse.subscribe(user => {
      
    }, errors => {
      console.log(errors); // TODO Show error message in html
    })



  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
