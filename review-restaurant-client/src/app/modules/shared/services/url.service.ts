import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  constructor(private router: Router) {
  }

  updateUrl(page: number, rating?: number) {
    const params = {
      page: page ? page : 1
    };
    if (rating) {
      params['rating'] = rating;
    }
    this.router.navigate(
      [],
      {
        queryParams: params,
        queryParamsHandling: 'merge'
      }
    );
  }
}
