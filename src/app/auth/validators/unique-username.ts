import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { AuthService } from "../auth.service";

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
    constructor(private auth: AuthService) { }

    validate = (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        const { value } = control

        return this.auth.usernameAvailable(value)
            .pipe(
                map(() => { return null }
                ),
                catchError((err) => {
                    if (err.error.username) {
                        return of({ nonUniqueUsername: true })
                    } else {
                        return of({ internetError: true })
                    }
                })
            )
    }
}
