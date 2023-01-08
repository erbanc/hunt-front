import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {LoginResult, LoginService} from './login.service';
import {CookieService} from "ngx-cookie-service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private cookieService: CookieService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    if (!!username || !!password) {
      this.loginService.login(username, password).subscribe((data: LoginResult) => {
        const loginResult = {...data};
        if (loginResult.validated) {
          this.cookieService.set("THE_HUNT_USERNAME", loginResult.username)
          this.toastrService.success("Logged-in as " + username)
          location.reload()
        }
      })
    }
  }
}
