import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/user.model';
import {Kwetter} from '../../../models/kwetter.model';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @Input() timeline: Kwetter[];
  constructor() { }

  ngOnInit() {
  }

}