import {Component} from '@angular/core';
import {TestService} from '../services/test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'review-restaurant-client';

  constructor(private testService: TestService) {
    this.testService.getUsers().subscribe(res => {
      console.log(res);
    });
  }
}
