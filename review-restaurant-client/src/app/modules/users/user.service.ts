import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ListUserResponse} from '../../models/list-user-response';
import {UserModel} from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = `${environment.apiUrl}/user`;

  constructor(private  http: HttpClient) {
  }


  // fetch all user for the current page
  fetchAll(currPage: number): Observable<ListUserResponse> {
    return this.http.get<ListUserResponse>(this.apiUrl, {
      params: {
        page: currPage.toString(),
      },
    });
  }

  // fetch a single user
  fetchOne(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.apiUrl}/${id}`);
  }


  // update a user information
  update(id: number, request: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.apiUrl}/${id}`, request);
  }

  // delete request to remove user
  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
