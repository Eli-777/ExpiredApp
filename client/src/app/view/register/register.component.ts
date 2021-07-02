import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // @ViewChild('registerForm') registerForm!: NgForm
  user: any = {}

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.user);

  }

}
