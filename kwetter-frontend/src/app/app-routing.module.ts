import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { NgxPermissionsGuard } from 'ngx-permissions';

import { AuthLoginComponent } from './auth/auth-login.component';
import { FullLayoutComponent } from './layouts/full/full-layout.component';

import { Dashboard_ROUTES } from './shared/routes/dashboard-layout.routes';


import { User_ROUTES } from './shared/routes/user-layout.routes';


const appRoutes: Routes = [
  {
    path: 'auth/login', component: AuthLoginComponent
  },
  {
    path: 'auth/not-allowed', component: AuthLoginComponent
  },
  {
    path: 'auth/login/:resetFeedback', component: AuthLoginComponent
  },
  {
    path: '',
    component: FullLayoutComponent,
    children: Dashboard_ROUTES,
    canActivate: [AuthGuard],
  },
  {
    path: 'user',
    component: FullLayoutComponent,
    children: User_ROUTES,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        preloadingStrategy: PreloadAllModules
      }
    )
  ],
  exports: [
    RouterModule
  ]
})

export class RoutingModule {

}