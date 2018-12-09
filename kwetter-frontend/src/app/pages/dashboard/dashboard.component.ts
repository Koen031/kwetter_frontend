import {Component, OnInit} from '@angular/core';
import { JwtHttp } from 'angular2-jwt-refresh';
import { environment } from '../../../environments/environment';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';
import {DashboardService} from './dashboard.service';
import {Kwetter} from '../../models/kwetter.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

    user: User;
    timeline: Array<Kwetter>;
    filter: string;
    loaded = false;

    constructor(
      jwtHttp: JwtHttp,
      private router: Router,
      private dashboardService: DashboardService,
    ) {
      this.filter = '';
      const thiz = this;
      this.dashboardService.getMe().subscribe(response => {
        this.user = new User(response);
        this.dashboardService.getKwetters(this.user.username).subscribe(kwetters => {
          kwetters.forEach(element => {
            this.user.addKwetter(new Kwetter(element));
          });
          console.log(this.user);
          this.dashboardService.getTimeline().subscribe(timelineKwetters => {
            thiz.timeline = new Array<Kwetter>();
            timelineKwetters.forEach(element => {
              this.timeline.push(new Kwetter(element));
            });
            thiz.loaded = true;
          });
        });

      });
    }


    search() {
     if (this.filter.length === 0) {
       console.log('hi')
     }
    }

  ngOnInit(): void {
      // this.dashboardService.userChanged.subscribe((user: User) => {
      //   console.log(user);
      //   this.user = new User(user);
      // });
  }

  kwetterAdded(event) {
      const thiz = this;
      console.log(event);
    this.dashboardService.getMe().subscribe(response => {
      this.user = new User(response);
      this.dashboardService.getKwetters(this.user.username).subscribe(kwetters => {
        kwetters.forEach(element => {
          this.user.addKwetter(new Kwetter(element));
          thiz.loaded = true;
        });
        console.log(this.user);
      });
    });
  }

}