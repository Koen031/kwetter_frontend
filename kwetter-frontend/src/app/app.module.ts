import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule, Http, RequestOptions, Response } from '@angular/http';
import { AuthConfig } from 'angular2-jwt';
import { JwtConfigService, JwtHttp } from 'angular2-jwt-refresh';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MomentModule } from 'ngx-moment';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';


import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { AuthLoginComponent } from './auth/auth-login.component';

import { UserService } from './pages/user/index/user.service';


import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { FullLayoutComponent } from './layouts/full/full-layout.component';

import * as $ from 'jquery';
import {DashboardService} from './pages/dashboard/dashboard.service';


export function getJwtHttp(http: Http, options: RequestOptions) {
  const jwtOptions = {
    endPoint: environment.server + '/refresh',
    beforeSeconds: 600,
    tokenName: 'token',
    refreshTokenGetter: (() => localStorage.getItem('token')),
    tokenSetter: ((response: Response): boolean | Promise<void> => {
      const headers = response.headers;
      const res = response.json();
      console.log(headers);
      if (res.status === 'ok' && headers.has('Authorization')) {
        const token = headers.get('Authorization').replace('Bearer ', '' );
        localStorage.setItem('token', token);
        return true;
      }
      localStorage.removeItem('token');
      return false;
    })
  };

  const authConfig = new AuthConfig({
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => localStorage.getItem('token')),
  });

  return new JwtHttp(
    new JwtConfigService(jwtOptions, authConfig),
    http,
    options
  );
}

@NgModule({
    declarations: [
        AppComponent,
        AuthLoginComponent,
        FullLayoutComponent,
        ContentLayoutComponent
    ],
    imports: [
        BrowserModule,
        MomentModule,
        FormsModule,
        ReactiveFormsModule,
        RoutingModule,
        HttpModule,
        Ng2SmartTableModule,
        SharedModule,
        NgbModule.forRoot(),
        NgxPermissionsModule.forRoot()
    ],
    providers: [
      {
        provide: JwtHttp,
        useFactory: getJwtHttp,
        deps: [ Http, RequestOptions ],
      },
      AuthGuard,
      AuthService,
      UserService,
      DashboardService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }