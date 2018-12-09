import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent, ActiveComponent} from './user.component';
import { UserRoutingModule} from './user-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    Ng2SmartTableModule,
  ],
  entryComponents: [
    ActiveComponent,
  ],
  declarations: [
    UserComponent,
    ActiveComponent,
  ]
})
export class UserModule { }