import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtDataSource } from '../../../data-source/jwt.data-source';
import { JwtHttp } from 'angular2-jwt-refresh';
import { environment } from '../../../../environments/environment';
import { ViewCell } from 'ng2-smart-table';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { Location } from '@angular/common';

import { UserService } from '../index/user.service';


@Component({
  selector: 'create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  userForm: FormGroup;
  loading = false;
  activeOptions = [
    { value: 1, display: 'Actief' },
    { value: 0, display: 'Inactief' },
  ];

  constructor(
    private userService: UserService,
    private _location: Location,
    private router: Router,
  ) {

  };


  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl(),
      firstname: new FormControl(),
      middlename: new FormControl(),
      lastname: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      active: new FormControl()
    });
  }

  submitForm(userForm) {
    let thiz = this;
    const user = { username: userForm.value.username, firstname: userForm.value.firstname, middlename: userForm.value.middlename, lastname: userForm.value.lastname, email: userForm.value.email, password: userForm.value.password, active: userForm.value.active };
    if (this.loading == false) {
      this.loading = true;
      this.userService.createUsers(user).subscribe(response => {
        swal({ title: response.title, text: response.message, type: "success" }).then(function () {
          thiz.router.navigate(['/user/']);
        });
        this.loading = false;
      },
        error => {
          this.loading = false;
        });
    }
  }

  back() {
    this._location.back();
  }
}