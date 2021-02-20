import {Component, Input, OnInit} from '@angular/core';
import {RestaurantModel} from '../../../models/restaurant.model';
import {RestaurantService} from '../services/restaurant.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-delete-restaurant',
  templateUrl: './delete-restaurant.component.html',
  styleUrls: ['./delete-restaurant.component.scss']
})
export class DeleteRestaurantComponent implements OnInit {

  @Input() restaurant: RestaurantModel;
  error: string;
  deleting: boolean;

  constructor(private restaurantService: RestaurantService,
              private activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  delete() {
    this.deleting = true;
    this.restaurantService.delete(this.restaurant.id).pipe(finalize(() => this.deleting = false)).subscribe(res => {
      this.activeModal.close('success');
    }, error => this.error = error);
  }


  onClose() {
    this.activeModal.close('close');
  }
}
