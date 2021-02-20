import {Component, OnInit} from '@angular/core';
import {faMapMarkerAlt, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {RestaurantService} from '../services/restaurant.service';
import {RestaurantModel} from '../../../models/restaurant.model';
import {finalize} from 'rxjs/operators';
import {ListRestaurantResponse} from '../../../models/list-restaurant-response';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-list-restaurant',
  templateUrl: './list-restaurant.component.html',
  styleUrls: ['./list-restaurant.component.scss']
})
export class ListRestaurantComponent implements OnInit {

  restaurants: RestaurantModel [];
  loading: boolean;
  error: string;
  faPlus = faPlusCircle;
  faMapMarker = faMapMarkerAlt;
  page = 0;
  total = 0;
  pageSize = 10;

  constructor(private restaurantService: RestaurantService,
              private location: Location,
              private activatedRoute: ActivatedRoute,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    // get the first page on start
    this.fetch(1);
  }


  // get the rows of the current page and update total
  fetch(page: number) {
    this.restaurantService.fetchAll(page - 1)
      .pipe(finalize(() => this.loading = false))
      .subscribe((response: ListRestaurantResponse) => {
        this.restaurants = response.rows;
        this.total = response.total;
      }, error => this.error = error);
    this.updateUrl(page);
  }

  updateUrl(page) {
    // update url for on pagination change
    const url = this.router.createUrlTree([], {relativeTo: this.activatedRoute, queryParams: {page}}).toString();
    this.location.go(url);
  }
}
