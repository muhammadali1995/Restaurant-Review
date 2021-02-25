import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {RestaurantModel} from '../../models/restaurant.model';
import {ListRestaurantResponse} from '../../models/list-restaurant-response';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  public apiUrl = `${environment.apiUrl}/restaurant`;

  constructor(private http: HttpClient) {
  }


  // fetch all restaurants
  fetchAll(currPage: number, rating?: number): Observable<ListRestaurantResponse> {


    // set params conditionally
    const params = {};
    if (currPage) {
      params['page'] = currPage;
    }

    if (rating !== 0) {
      params['rating'] = rating;
    }
    return this.http.get<ListRestaurantResponse>(this.apiUrl, {
      params: {...params}
    });
  }


  // fetch a single restaurant
  fetchOne(id: number): Observable<RestaurantModel> {
    return this.http.get<RestaurantModel>(`${this.apiUrl}/${id}`, {
      params: {
        expand: 'reviews.user,comments.user,user,reviewAggregation'
      }
    });
  }

  // create request to add a new restaurant
  create(request: RestaurantModel): Observable<RestaurantModel> {
    return this.http.post<RestaurantModel>(this.apiUrl, request);
  }


  // update restaurant request
  update(id: number, request: RestaurantModel): Observable<RestaurantModel> {
    return this.http.put<RestaurantModel>(`${this.apiUrl}/${id}`, request);
  }


  // delete request to remove restaurant from database
  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }


}
