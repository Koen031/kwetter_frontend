import { JwtHttp } from 'angular2-jwt-refresh';
import { Http, Headers, Response } from '@angular/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';

@Injectable()
export class AppService {
    serverUrl: string;
    jwtHttp: JwtHttp;

    private locale = new Subject<string>();
    locale$ = this.locale.asObservable();

    constructor(@Inject(JwtHttp) jwtHttp: JwtHttp) {
        this.jwtHttp   = jwtHttp;
        this.serverUrl = environment.server;
    }
}