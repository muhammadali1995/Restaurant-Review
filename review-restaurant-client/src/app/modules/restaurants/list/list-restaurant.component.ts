import {Component, OnInit} from '@angular/core';
import {faMapMarkerAlt, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {RestaurantService} from '../restaurant.service';
import {RestaurantModel} from '../../../models/restaurant.model';
import {finalize} from 'rxjs/operators';
import {ListRestaurantResponse} from '../../../models/list-restaurant-response';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {AccountService} from '../../account/account.service';
import {AuthGuard} from '../../account/auth.guard';
import {Action} from '../../../models/action';

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
              private authGuardService: AuthGuard,
              private accountService: AccountService,
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
    this.restaurantService.fetchAll(page)
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
