import {Component, Input, OnInit} from '@angular/core';
import {ReviewModel} from '../../../../../models/review.model';

@Component({
  selector: 'app-lowest-rated',
  templateUrl: './lowest-rated.component.html',
  styleUrls: ['./lowest-rated.component.scss']
})
export class LowestRatedComponent implements OnInit {

  @Input() review: ReviewModel;

  constructor() {
  }

  ngOnInit(): void {
  }

}
