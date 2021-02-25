import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  constructor(private router: Router) {
  }

  updateUrl(page: number, rating?: number) {
    const queryParams = {
      page: page ? page : 1
    };
    if (rating) {
      queryParams['rating'] = rating;
    }
    this.router.navigate(
      [],
      {
        queryParams: queryParams,
        queryParamsHandling: 'merge'
      }
    );
  }
}
