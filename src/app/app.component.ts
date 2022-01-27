import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  signedIn$: BehaviorSubject<boolean>
  
  constructor(private auth: AuthService) {
    this.signedIn$ = this.auth.signedIn$
  }

  ngOnInit() {
    this.auth.checkAuth().subscribe(() => {})
  }
  
}
