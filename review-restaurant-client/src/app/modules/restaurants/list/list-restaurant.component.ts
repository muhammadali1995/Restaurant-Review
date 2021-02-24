import {Component, OnInit} from '@angular/core';
import {faMapMarkerAlt, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {RestaurantService} from '../restaurant.service';
import {RestaurantModel} from '../../../models/restaurant.model';
import {filter, finalize} from 'rxjs/operators';
import {ListRestaurantResponse} from '../../../models/list-restaurant-response';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {AccountService} from '../../account/account.service';
import {AuthGuard} from '../../account/auth.guard';
import {Action} from '../../../models/action';
import {UrlService} from '../../shared/services/url.service';

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
  page = 1;
  total = 0;
  pageSize = 10;
  rating;

  constructor(private restaurantService: RestaurantService,
              private location: Location,
              private authGuardService: AuthGuard,
              private accountService: AccountService,
              private urlService: UrlService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    // get the first page on start
    this.fetch();
  }

  applyFilter($filter) {
    this.rating = $filter;
    this.page = 1;
    this.fetch();
  }

  onPageChange(page) {
    this.page = page;
    this.fetch();
  }

  // get the rows of the current page and update total
  fetch() {
    this.restaurantService.fetchAll(this.page, this.rating)
      .pipe(finalize(() => this.loading = false))
      .subscribe((response: ListRestaurantResponse) => {
        this.restaurants = response.rows;
        this.total = response.total;
      }, error => this.error = error);
    this.urlService.updateUrl(this.page, this.rating);
  }

  get canCreate() {
    // if the user is owner, then can add a new restaurant
    return this.authGuardService.can(Action.CREATE_RESTAURANT);
  }

  get canSeePendingReviews() {
    // if the user is owner, then can see review count
    return this.authGuardService.can(Action.CREATE_RESTAURANT);
  }

  getPendingReviewCount(restaurant: RestaurantModel) {
    if (restaurant.reviewAggregation) {
      return restaurant.reviewAggregation[0]?.counted ? restaurant.reviewAggregation[0]?.counted : 0;
    }
    return 0;
  }
}
