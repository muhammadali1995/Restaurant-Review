import {Component, Input, OnInit} from '@angular/core';
import {RestaurantModel} from '../../../../models/restaurant.model';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.scss']
})
export class ListCommentComponent implements OnInit {

  @Input() restaurant: RestaurantModel;

  constructor() {
  }

  ngOnInit(): void {
  }

}
