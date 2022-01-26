import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rootUrl = 'https://api.angular-email.com'

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailable>(this.rootUrl + '/auth/username', { username })
  }

  signUp(credentials: SignUpCredentials) {
    return this.http.post<SignUpResponse>(this.rootUrl + '/auth/signup', credentials)
  }
}
