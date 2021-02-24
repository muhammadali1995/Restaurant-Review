import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-star-filter',
  templateUrl: './start-filter.component.html',
  styleUrls: ['./start-filter.component.scss']
})
export class StartFilterComponent implements OnInit {

  @Output() onFilterChange = new EventEmitter();
  rating = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  apply() {
    this.onFilterChange.emit(this.rating);
  }

}
