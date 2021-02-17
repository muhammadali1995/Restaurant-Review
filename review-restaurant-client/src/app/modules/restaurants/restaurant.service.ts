import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {RestaurantModel} from '../../models/restaurant.model';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private apiUrl = `${environment.apiUrl}/restaurant`;

  constructor(private http: HttpClient) {
  }


  // fetch all restaurants
  fetchAll(currPage: string): Observable<HttpResponse<RestaurantModel[]>> {
    return this.http.get<RestaurantModel[]>(this.apiUrl, {
      params: {
        page: currPage,
      },
      observe: 'response'
    });
  }


  // create request to add a new restaurant
  create(request: RestaurantModel): Observable<RestaurantModel> {
    return this.http.post<RestaurantModel>(this.apiUrl, request);
  }


}
