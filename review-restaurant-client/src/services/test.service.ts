import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) {

  }

  getUsers() {
    return this.http.get(apiUrl);
  }
}
