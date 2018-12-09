import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Kwetter} from '../../../models/kwetter.model';
import {DashboardService} from '../dashboard.service';
import {User} from '../../../models/user.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-addkwetter',
  templateUrl: './addkwetter.component.html',
  styleUrls: ['./addkwetter.component.scss']
})
export class AddkwetterComponent implements OnInit {
    kwetter: Kwetter;
  @Input() user: User;
  @Output('update')
  change: EventEmitter<string> = new EventEmitter();
  constructor(private dashboardService: DashboardService) {
    this.kwetter = new Kwetter();
  }

  ngOnInit() {
  }

  addKwetter() {
    this.kwetter.owner = this.user.username;
    this.dashboardService.addKwetter(this.user, this.kwetter).subscribe( response => {
      this.change.emit('kwetterAdded');
      this.kwetter = new Kwetter();
    }, error1 => {
      swal('Oeps!!!', 'Er is iets fout gegaan!', 'error');
    });
  }


}