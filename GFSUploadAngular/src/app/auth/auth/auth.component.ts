import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(private http: HttpClient) {}

  isLoginMode = false;

  ngOnInit(): void {}

  onSubmit(form: NgForm){
    console.log(form.value);
    form.reset();

    this.http
    .post('http://localhost:5000/api/Account', form.value)
    .subscribe(reponse => {
      console.log(reponse);
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
