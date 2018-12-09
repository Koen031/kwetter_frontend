import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/user.model';
import {TimeAgoPipe} from 'time-ago-pipe';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {

  @Input() user: User;
  constructor(private router: Router) { }

  ngOnInit() {

  }
  navigateToUser(username) {
    this.router.navigate(['/user', username]);
  }
}