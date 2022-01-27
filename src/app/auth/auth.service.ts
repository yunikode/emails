import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { tap } from 'rxjs/operators'

interface UsernameAvailable {
  available: true
}

interface SignUpCredentials {
  username: string
  password: string
  passwordConfirmation: string
}

interface SignUpResponse {
  username: string
}

interface AuthResponse {
  authenticated: boolean
  username: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rootUrl = 'https://api.angular-email.com'
  signedIn$ = new BehaviorSubject(false)

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailable>(this.rootUrl + '/auth/username', { username })
  }

  signUp(credentials: SignUpCredentials) {
    return this.http.post<SignUpResponse>(this.rootUrl + '/auth/signup', credentials).pipe(tap(() => this.signedIn$.next(true)))
  }

  checkAuth() {
    return this.http.get<AuthResponse>(this.rootUrl + '/auth/signedin').pipe(tap(({ authenticated }) => {
      this.signedIn$.next(authenticated)
    }))
  }

  singOut() {
    return this.http.post(this.rootUrl + '/auth/signout', {}).pipe(tap(() => {this.signedIn$.next(false)}))
  }
}
