import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {RestaurantModel} from '../../models/restaurant.model';
import {ListRestaurantResponse} from "../../models/list-restaurant-response";


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private apiUrl = `${environment.apiUrl}/restaurant`;

  constructor(private http: HttpClient) {
  }


  // fetch all restaurants
  fetchAll(currPage: string): Observable<ListRestaurantResponse> {
    return this.http.get<ListRestaurantResponse>(this.apiUrl, {
      params: {
        page: currPage,
      },
    });
  }


  // fetch a single restaurant
  fetchOne(id: number): Observable<RestaurantModel> {
    return this.http.get<RestaurantModel>(`${this.apiUrl}/${id}`);
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
