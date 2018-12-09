import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserUpdateComponent } from './user-update.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    UserUpdateComponent,
  ]
})
export class UserUpdateModule { }