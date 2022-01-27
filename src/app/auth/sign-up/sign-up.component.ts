import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern(/^[a-z0-9]+$/)], [this.unique.validate]),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)])
  }, { validators: [this.matchPassword.validate] })

  constructor(private matchPassword: MatchPassword, private unique: UniqueUsername, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return
    }

    this.auth.signUp(this.authForm.value).subscribe({
      next: () => { this.router.navigateByUrl('/inbox')},
      error: (err) => {
        if (!err.status) {
          this.authForm.setErrors({ internetError: true })
        }
        this.authForm.setErrors({ unknownError: true })
      }
    })

  }

}
