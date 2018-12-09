import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [ AuthService ]
})
export class AppComponent {

  constructor(
    private authService: AuthService
  ) { }

}