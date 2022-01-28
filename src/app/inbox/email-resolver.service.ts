import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { EmailService } from './email.service';
import { Email } from './models/email';

@Injectable({
  providedIn: 'root',
})
export class EmailResolverService implements Resolve<Email> {
  constructor(private email: EmailService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Email | Observable<Email> | Promise<Email> {
    const { id } = route.params;

    return this.email.getEmail(id).pipe(
      catchError(() => {
        this.router.navigateByUrl('/inbox/not-found');
        return EMPTY;
      })
    );
  }
}
