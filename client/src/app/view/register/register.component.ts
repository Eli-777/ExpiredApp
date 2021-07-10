import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AccountService } from './../../_services/account.service';
import { Account } from 'src/app/interfaces/account';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm') registerForm!: NgForm;
  user: Account = new Account();

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.checkPassword(this.user.password, this.user.passwordConfirm!);
    if (this.registerForm.form.valid) {
      this.accountService
        .register(this.user)
        .pipe(take(1))
        .subscribe(
          () => this.router.navigateByUrl('/'),
          (error) => {
            const errorMessage = error.error;
            console.log(errorMessage);
            console.log(errorMessage.message);
            
            if (errorMessage.message === "Account is taken") {
              this.registerForm.form.controls.account.setErrors({
                duplicateEmail: true,
              });
            }
          }
        );
    }
  }

  checkPassword(password: string, passwordConfirm: string) {
    if (password !== passwordConfirm) {
      return this.registerForm.form.controls.passwordConfirm.setErrors({
        passwordCheck: true,
      });
    }
  }
}
