import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import swal from 'sweetalert2';

import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnInit, OnDestroy {

  registerUserForm: FormGroup;
  componentDestroyed$: Subject<boolean> = new Subject();
  auth: User;
  loginForm = true;
  registerForm = false;
  loginError = false;
  registerError = false;
  resetPasswordSuccess = false;
  loading = false;
  registerUser = new User();
  @ViewChild('passwordResetErrorTitle') passwordResetErrorTitle: ElementRef;
  @ViewChild('passwordResetErrorMessage') passwordResetErrorMessage: ElementRef;
  @ViewChild('passwordResetSuccessTitle') passwordResetSuccessTitle: ElementRef;
  @ViewChild('passwordResetSuccessMessage') passwordResetSuccessMessage: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.setForm();
    this.auth = new User;
    this.route.params.subscribe(params => {
       if (params['resetFeedback'] === 'password-reset-success') {
         swal(this.passwordResetSuccessTitle.nativeElement.innerHTML, this.passwordResetSuccessMessage.nativeElement.innerHTML, 'success');
       } else if (params['resetFeedback'] === 'password-reset-error') {
         swal(this.passwordResetErrorTitle.nativeElement.innerHTML, this.passwordResetErrorMessage.nativeElement.innerHTML, 'error');
            }
    });
  }

  register() {
    this.loginForm = false;
    this.registerForm = true;
  }

  login() {
    this.loginForm = true;
    this.registerForm = false;
  }

  doLogin(form: any, valid: any): void {
    if (valid) {
      this.loginError = false;
      this.loading = true;
      this.authService.login(this.auth)
      .subscribe(response => {
          this.loading = false;
          this.router.navigate(['/']);
      },
      error => {
        this.loading = false;
        this.loginError = true;
        const response = error.json();
        swal(response.title, response.message, 'error');
      });
    }
  }

  registerNewUser(form: any, valid: any): void {
    if (valid) {
      this.loading = true;
      this.registerError = false;
      this.authService.resetPassword(this.auth)
      .subscribe(response => {
        this.loading = false;
        swal('Gelukt!', 'We hebben een nieuw account voor je aangemaakt!', 'success');
      },
      error => {
        this.registerError = true;
        const response = error.json();
        this.loading = false;
        swal('Oeps!!', 'Er is iets fout gegaan bij het registreren', 'warning');
      });
    }
  }

  ngOnDestroy() {
      this.componentDestroyed$.next(true);
      this.componentDestroyed$.complete();
  }

  setForm() {
    this.registerUserForm = new FormGroup({
      username: new FormControl(this.registerUser.username, [Validators.minLength(4), Validators.required]),
      firstname: new FormControl(this.registerUser.firstname),
      lastname: new FormControl(this.registerUser.lastname),
      password: new FormControl(this.registerUser.password, [Validators.minLength(6)]),
      password_repeat: new FormControl()
    });
  }

  submitForm(registerUserForm) {
    const thiz = this;
    if (this.registerUser.password !== registerUserForm.value.password_repeat) {
      swal('Error', 'De ingevulde wachtwoorden komen niet overeen.', 'error');
    } else {
      if (this.loading === false) {
        this.loading = true;
        this.authService.register(this.registerUser).subscribe(response => {
            swal({ title: 'Succes', text: 'Gebruiker succesvol geregistreerd', type: 'success' }).then(function () {
              localStorage.setItem('token', response.token);
                thiz.router.navigate(['/']);
            });

            this.loading = false;
          },
          error => {
            swal('Error', 'Er is iets fout gegaan', 'error');
            this.loading = false;
          });
      }
    }
  }

}