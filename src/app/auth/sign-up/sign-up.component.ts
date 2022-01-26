import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(20),Validators.pattern(/^[a-z0-9]+$/)]),
    password: new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    passwordConfirmation: new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(20)])
  })

  constructor() { }

  ngOnInit(): void {
  }

}
