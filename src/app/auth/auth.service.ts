import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface UsernameAvailable {
  available: true
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http
      .post<UsernameAvailable>('https://api.angular-email.com/auth/username',
        { username }
      )
  }

  signUp(credentials:any) {
    return this.http.post<any>('https://api.angular-email.com/auth/signup', credentials )
  }
}
