import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private router: Router, private route: ActivatedRoute, private location: Location) {
  }

  updateUrl(page) {
    // update url for on pagination change
    const url = this.router.createUrlTree([], {relativeTo: this.route, queryParams: {page}}).toString();
    this.location.go(url);
  }
}
