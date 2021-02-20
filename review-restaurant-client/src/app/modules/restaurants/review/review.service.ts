import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {ReviewModel} from '../../../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = `${environment.apiUrl}/review`;

  constructor(private  http: HttpClient) {
  }

  // create request to add a new review
  create(request: ReviewModel): Observable<ReviewModel> {
    return this.http.post<ReviewModel>(this.apiUrl, request);
  }

  // delete request to delete a review
  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  // update request to delete a review
  update(id: number, request: ReviewModel): Observable<ReviewModel> {
    return this.http.put<ReviewModel>(`${this.apiUrl}/${id}`, request);
  }

  fetchOne(id: number): Observable<ReviewModel> {
    return this.http.get<ReviewModel>(`${this.apiUrl}/${id}`);
  }

}
