import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern(/^[a-z0-9]+$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)])
  })

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return
    }
    this.auth.signIn(this.authForm.value).subscribe({
      next: () => { this.router.navigateByUrl('/inbox')},
      error: (err) => {
        if (!err.status) {
          this.authForm.setErrors({ internetError: true })
        } else if (err.error.username || err.error.password) {
          this.authForm.setErrors({ credentials: true })
        } else {
          this.authForm.setErrors({ unknownError: true })
        }
      }

    })
  }

}
