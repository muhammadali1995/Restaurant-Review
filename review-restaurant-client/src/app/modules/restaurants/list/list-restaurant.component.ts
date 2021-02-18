import {Component, OnInit} from '@angular/core';
import {faMapMarkerAlt, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {RestaurantService} from '../restaurant.service';
import {RestaurantModel} from '../../../models/restaurant.model';
import {finalize} from 'rxjs/operators';
import {ListRestaurantResponse} from '../../../models/list-restaurant-response';

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
  total = 50;

  constructor(private restaurantService: RestaurantService) {
  }

  ngOnInit(): void {
    this.fetch(0);
  }


  fetch(page) {
    this.page = page;
    this.restaurantService.fetchAll(page)
      .pipe(finalize(() => this.loading = false))
      .subscribe((response: ListRestaurantResponse) => {
        this.restaurants = response.rows;
        this.total = response.total;
      }, error => this.error = error);
  }
}
