import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { NgxPermissionsService } from 'ngx-permissions';

// import { User } from '../user/user.model';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService,
        private permissionsService: NgxPermissionsService
    ) { }

    canActivate() {
        if (this.authService.loggedIn()) {
          return true;
        } else {
          this.router.navigate(['/auth/login']);
          return false;
        }
    }
}