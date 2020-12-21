import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {
  viewLogin = true;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
  }
  changeView(): void{
    this.viewLogin = !this.viewLogin;
  }
  onSuccessLogin($event) {
    this.router.navigate(['']);
  }

}
