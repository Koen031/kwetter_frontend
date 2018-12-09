import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreateComponent } from './user-create.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserCreateComponent,
  ]
})
export class UserCreateModule { }