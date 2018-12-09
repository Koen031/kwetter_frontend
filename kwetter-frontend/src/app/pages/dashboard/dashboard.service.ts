import {Inject, Injectable} from '@angular/core';
import {AppService} from '../../app.service';
import {JwtHttp} from 'angular2-jwt-refresh';
import {Headers} from '@angular/http';
import {User} from '../../models/user.model';
import {Subject} from 'rxjs/Subject';
import {Kwetter} from '../../models/kwetter.model';

@Injectable()
export class DashboardService extends AppService {

  private headers: Headers;
  private user: User;
  userChanged = new Subject<User>();

  constructor(@Inject(JwtHttp) jwtHttp: JwtHttp) {
    super(jwtHttp);
    this.headers =  new Headers();
    this.headers.append('Accept', 'application/json');
  }

  public getMe() {
    const url = this.serverUrl + '/users/me';

    return this.jwtHttp.get(url, {headers : this.headers})
      .map(res => {
        // this.user = new User(res.json());
        this.userChanged.next(new User(res.json()));
        return res.json();
      });
  }
  getKwetters(username) {
    const url = this.serverUrl + '/users/' + username + '/kwetters';

    return this.jwtHttp.get(url, {headers : this.headers})
      .map(res => {
        return res.json();
      });
  }

  addKwetter(user: User, kwetter: Kwetter) {
    const url = this.serverUrl + '/kwetters/' + user.username;

    return this.jwtHttp.post(url, kwetter,{headers : this.headers})
      .map(res => {
        console.log(res);
        // return res.json();
      });
  }

  getTimeline() {
    const url = this.serverUrl + '/users/timeline';

    return this.jwtHttp.get(url, {headers : this.headers})
      .map(res => {
        return res.json();
      });
  }
}