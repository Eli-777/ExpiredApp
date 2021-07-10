import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Account } from 'src/app/interfaces/account';
import { AccountService } from './../../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm!: NgForm;
  user: Account = new Account();
  isPasswordWrong = false;

  constructor(public accountService: AccountService,private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.form.valid) {
      this.accountService
        .login(this.user)
        .pipe(take(1))
        .subscribe(
          () => {
            this.router.navigate(['/'])
          },
          (error) => {
            const errorMessage = error.error.message;
            if (errorMessage === 'Invalid account') {
              this.loginForm.form.controls.account.setErrors({
                invalidAccount: true,
              });
            } else if (error.error.message === 'Password is wrong') {
              this.loginForm.form.controls.password.setErrors({
                passwordWrong: true,
              });
            }
          }
        );
    }
  }
}
