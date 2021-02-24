import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {CommentModel} from '../../../models/comment-model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ReplyModel} from '../../../models/reply.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = `${environment.apiUrl}/comment`;

  constructor(private  http: HttpClient) {
  }

  // create request to create a new comment
  create(request: CommentModel): Observable<CommentModel> {
    return this.http.post<CommentModel>(this.apiUrl, request);
  }

  // delete request to delete a review
  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  // update request to delete a review
  update(id: number, request: CommentModel): Observable<CommentModel> {
    return this.http.put<CommentModel>(`${this.apiUrl}/${id}`, request);
  }

  fetchOne(id: number): Observable<CommentModel> {
    return this.http.get<CommentModel>(`${this.apiUrl}/${id}`);
  }

  reply(request: ReplyModel) {
    return this.http.post<CommentModel>(`${this.apiUrl}/reply`, request);
  }
}
