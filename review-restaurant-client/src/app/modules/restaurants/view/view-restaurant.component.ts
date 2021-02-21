import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RestaurantModel} from '../../../models/restaurant.model';
import {RestaurantService} from '../restaurant.service';
import {finalize} from 'rxjs/operators';
import {faMapMarkerAlt, faPencilAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeleteRestaurantComponent} from '../delete/delete-restaurant.component';
import {Location} from '@angular/common';
import {CommentService} from '../comment/comment.service';
import {AuthGuard} from '../../account/auth.guard';
import {Action} from '../../../models/action';

@Component({
  selector: 'app-view-restaurant',
  templateUrl: './view-restaurant.component.html',
  styleUrls: ['./view-restaurant.component.scss']
})
export class ViewRestaurantComponent implements OnInit {

  loading: boolean;
  error: string;
  restaurant: RestaurantModel;

  faTrash = faTrashAlt;
  faEdit = faPencilAlt;
  faMapMarker = faMapMarkerAlt;

  constructor(private route: ActivatedRoute,
              private modalService: NgbModal,
              private commentService: CommentService,
              private location: Location,
              private authGuardService: AuthGuard,
              private restaurantService: RestaurantService
  ) {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.restaurantService.fetchOne(params.id)
        .pipe(finalize(() => this.loading = false))
        .subscribe((restaurant: RestaurantModel) => {
          this.restaurant = restaurant;
        }, error => {
          this.error = error;
        });
    });
  }

  ngOnInit(): void {
  }

  delete() {
    const modal = this.modalService.open(DeleteRestaurantComponent);
    modal.componentInstance.restaurant = this.restaurant;
    modal.result.then(result => {
      if (result === 'success') {
        window.alert('Successfully deleted');
        this.location.back();
      }
    });
  }

  get canEdit() {
    return this.authGuardService.can(Action.UPDATE_RESTAURANT);
  }

  get canDelete() {
    return this.authGuardService.can(Action.DELETE_RESTAURANT);
  }

  get canReview() {
    return this.authGuardService.can(Action.CREATE_REVIEW);
  }

  get canComment() {
    return this.authGuardService.can(Action.CREATE_COMMENT);
  }
}
