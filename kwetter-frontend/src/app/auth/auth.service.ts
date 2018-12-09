import { JwtHttp } from 'angular2-jwt-refresh';
import { Http, Headers, Response } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelper} from 'angular2-jwt';
import 'rxjs/add/operator/map';

import { User } from '../models/user.model';
import { AppService } from '../app.service';

@Injectable()
export class AuthService extends AppService {

    jwtHelper: JwtHelper = new JwtHelper();
    private user: User;
    constructor(
      @Inject(JwtHttp) jwtHttp: JwtHttp,
      private http: Http
    ) {
      super(jwtHttp);
    }

    login(user: User): Observable<boolean> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        return this.http.put(this.serverUrl + '/authenticate', user, {headers : headers})
            .map((response: Response) => {
                const token = response.json() && response.json().token;
                this.user = new User();
                this.user.username = response.json().username;
                if (token) {
                    localStorage.setItem('token', token);
                    return true;
                } else {
                    return false;
                }
            });
    }


    resetPassword(user: User): Observable<any> {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
        return this.http.post(this.serverUrl + '/auth/recovery', user, {headers : headers})
            .map((response: Response) => {
                return response.json();
            });
    }

    checkLoggedInUser() {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');

      const url = this.serverUrl + '/users/me';
      return this.jwtHttp.get(url, {headers : headers});
    }

    loggedIn() {
      return tokenNotExpired();
    }

    logout(): void {
        localStorage.removeItem('token');
    }

    public getUser(){
      return this.user;
    }

    register(user: User) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      return this.http.post(this.serverUrl + '/authenticate', user, {headers : headers})
        .map((response: Response) => {
          return response.json();
        });
    }

}