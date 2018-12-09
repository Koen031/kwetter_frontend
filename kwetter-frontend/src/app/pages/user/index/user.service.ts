import { JwtHttp } from 'angular2-jwt-refresh';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import swal from 'sweetalert2';

import { AppService } from '../../../app.service';

@Injectable()
export class UserService extends AppService {

  

  constructor(@Inject(JwtHttp) jwtHttp: JwtHttp) {
    super(jwtHttp);
  }

  createUsers(userContainer)
  {
    let headers = new Headers();
    headers.append('Accept', 'application/json');

    let url = this.serverUrl + '/user/create';

    return this.jwtHttp.post(url, userContainer, {headers : headers})
        .map(res => {
            return res.json();
        });
  }

  updateUser(userContainer,userId)
  {
    let headers = new Headers();
    headers.append('Accept', 'application/json');

    let url = this.serverUrl + '/user/update/' + userId;

    return this.jwtHttp.post(url, userContainer, {headers : headers})
      .map(res => {
          return res.json();
      });
  }
  
  deleteUser(userId)
  {
    let headers = new Headers();
    headers.append('Accept', 'application/json');

    let url = this.serverUrl + '/user/delete';

    return this.jwtHttp.post(url, {user_id : userId}, {headers : headers})
    .map(res => {
        return res.json();
    });
  }

  getById(userId)
  {
    let headers = new Headers();
    headers.append('Accept', 'application/json');

    let url = this.serverUrl + '/user/get/'+userId;

    return this.jwtHttp.get(url, {headers : headers})
    .map(res => {
        return res.json();
    });
  }

}