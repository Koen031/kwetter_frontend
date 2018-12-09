import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {JwtDataSource} from '../../../data-source/jwt.data-source';
import {JwtHttp} from 'angular2-jwt-refresh';
import {environment} from '../../../../environments/environment';
import {ViewCell} from 'ng2-smart-table';

import {UserService} from '../index/user.service';


@Component({
  selector: 'create',
  templateUrl: './user-read.component.html',
  styleUrls: ['./user-read.component.scss'],
})
export class UserCreateComponent implements OnInit{
  ngOnInit(): void {

  }
}