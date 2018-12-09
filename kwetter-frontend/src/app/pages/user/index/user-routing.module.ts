import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {UserComponent} from './user.component';

import {UserCreateComponent} from '../create/user-create.component';
import {UserCreateModule} from '../create/user-create.module'
import {UserUpdateComponent} from '../update/user-update.component'
import {UserUpdateModule} from '../update/user-update.module'

const routes: Routes = [
  {
    path: ':username',
    component: UserComponent,
  },
  {
    path: 'create',
    component: UserCreateComponent
  },
  {
    path: 'update/:id',
    component: UserUpdateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), UserCreateModule, UserUpdateModule],
  exports: [RouterModule],
})
export class UserRoutingModule { }