import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {CommentModel} from '../../../models/comment-model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = `${environment.apiUrl}/comment`;

  constructor(private  http: HttpClient) {
  }

  create(request: CommentModel): Observable<CommentModel> {
    return this.http.post<CommentModel>(this.apiUrl, request);
  }
}
