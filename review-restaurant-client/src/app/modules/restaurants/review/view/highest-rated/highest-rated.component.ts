import {Component, Input, OnInit} from '@angular/core';
import {ReviewModel} from '../../../../../models/review.model';

@Component({
  selector: 'app-highest-rated',
  templateUrl: './highest-rated.component.html',
  styleUrls: ['./highest-rated.component.scss']
})
export class HighestRatedComponent implements OnInit {

  @Input() review: ReviewModel;

  constructor() {
  }

  ngOnInit(): void {
  }

}
