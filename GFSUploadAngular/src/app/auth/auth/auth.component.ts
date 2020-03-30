import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

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

    if(this.isLoginMode) {
      this.auth.login(form.value.email,form.value.password)
    } else {
      this.auth.signup(form);
    }

  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
