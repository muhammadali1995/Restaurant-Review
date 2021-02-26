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
              private route: ActivatedRoute,
              private urlService: UrlService,
  ) {
  }

  ngOnInit(): void {
    // get the first page on start
    this.route.queryParams.subscribe(params => {
      this.page = params.page ? params.page : 1;
      this.rating = params.rating ? params.rating : 0;
      this.fetch();
    });
  }

  onPageChange(page) {
    this.urlService.updateUrl(page, this.rating);
  }

  // get the rows of the current page and update total
  fetch() {
    this.restaurantService.fetchAll(this.page, this.rating)
      .pipe(finalize(() => this.loading = false))
      .subscribe((response: ListRestaurantResponse) => {
        this.restaurants = response.rows;
        this.total = response.total;
      }, error => this.error = error);
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
      // show the details review aggregations such as number of pending reviews currently
      return restaurant.reviewAggregation[0]?.counted ? restaurant.reviewAggregation[0]?.counted : 0;
    }
    return 0;
  }
}
