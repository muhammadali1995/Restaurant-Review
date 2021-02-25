import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UrlService} from '../../services/url.service';

@Component({
  selector: 'app-star-filter',
  templateUrl: './start-filter.component.html',
  styleUrls: ['./start-filter.component.scss']
})
export class StartFilterComponent implements OnInit {

  @Output() onFilterChange = new EventEmitter();
  @Input() rating = 0;

  constructor(private activatedRoute: ActivatedRoute, private urlService: UrlService) {
  }

  ngOnInit(): void {
  }

  apply() {
    this.urlService.updateUrl(1, this.rating);
  }
}
