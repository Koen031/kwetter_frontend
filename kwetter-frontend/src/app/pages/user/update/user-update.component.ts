import { Component, OnInit, OnDestroy, Injectable, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { JwtDataSource } from '../../../data-source/jwt.data-source';
import { JwtHttp } from 'angular2-jwt-refresh';
import { environment } from '../../../../environments/environment';
import { ViewCell } from 'ng2-smart-table';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { Location } from '@angular/common';

import { UserService } from '../index/user.service';
import { log } from "util";


@Component({
  selector: 'create',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent {
  userUpdateForm: FormGroup;
  loading: boolean = false;
  activeOptions = [
    { value: 1, display: 'Actief' },
    { value: 0, display: 'Inactief' },
  ];
  changePassword: boolean;


  userId: any;
  user: any;

  constructor(
    jwtHttp: JwtHttp,
    private router: Router,
    private userService: UserService,
    route: ActivatedRoute,
    private _location: Location
  ) {
    this.changePassword = false;
    this.userService.getById(route.snapshot.params.id).subscribe(data => {
      this.user = data.user;
      this.setForm();
      this.userId = route.snapshot.params.id;
    });
  }

  setForm() {
    this.userUpdateForm = new FormGroup({
      username: new FormControl(this.user.username, [Validators.minLength(6), Validators.required]),
      firstname: new FormControl(this.user.firstname),
      middlename: new FormControl(this.user.middlename),
      lastname: new FormControl(this.user.lastname),
      email: new FormControl(this.user.email, [Validators.minLength(6), Validators.email, Validators.required]),
      password: new FormControl([Validators.minLength(6)]),
      password_repeat: new FormControl(),
      active: new FormControl(this.user.active)
    });
  }

  submitForm(userUpdateForm) {
    let thiz = this;
    if (this.changePassword != true) {
      this.user.password = null;
    }

    if (this.user.password != userUpdateForm.value.password_repeat && this.changePassword == true) {
      swal('Error', "De ingevulde wachtwoorden komen niet overeen.", "error");
    } else {
      if (this.loading == false) {
        this.loading = true;
        this.userService.updateUser(this.user, this.userId).subscribe(response => {
          swal({ title: response.title, text: response.message, type: "success" }).then(function () {
            thiz.router.navigate(['/user/']);
          });
          this.loading = false;
        },
          error => {
            swal('Error', "Er is iets fout gegaan", "error");
            this.loading = false;
          });
      }
    }
  }

  toggleCheckbox(event) {
    this.changePassword = !this.changePassword;
  }

  back() {
    this._location.back();
  }
}