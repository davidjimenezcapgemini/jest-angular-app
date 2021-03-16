import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  spinner: boolean;

  constructor(private loginService: LoginService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.spinner = false;
  }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.loginForm.valid) {
      this.spinner = true;
      const user = this.loginForm.get('username')?.value;
      const pass = this.loginForm.get('password')?.value;
      this.loginService.login(user, pass).subscribe((res: any) => {
        const jwt = res && res.data ? res.data.jwt : null; // Solution: Remove to do exercise
        this.loginService.setLogged(jwt);
        this.spinner = false;
        this.router.navigate(['dashboard']);
      });
    }
  }

}
