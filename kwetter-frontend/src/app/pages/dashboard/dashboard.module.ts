import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddkwetterComponent } from './addkwetter/addkwetter.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { TrendsComponent } from './trends/trends.component';
import {TimeAgoPipe} from 'time-ago-pipe';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    AddkwetterComponent,
    TimelineComponent,
    ProfileInfoComponent,
    TrendsComponent,
    TimeAgoPipe
  ]
})
export class DashboardModule { }