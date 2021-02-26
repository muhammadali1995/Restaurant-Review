import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RestaurantModel} from '../../../../models/restaurant.model';
import {CommentModel} from '../../../../models/comment-model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeleteCommentComponent} from '../delete/delete-comment.component';
import {faPencilAlt, faReply, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {UpdateCommentComponent} from '../update/update-comment.component';
import {ReplyCommentComponent} from '../reply/reply-comment.component';
import {Action} from '../../../../models/action';
import {AuthGuard} from '../../../account/auth.guard';
import {RestaurantService} from '../../restaurant.service';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.scss']
})
export class ListCommentComponent implements OnInit {

  @Input() restaurant: RestaurantModel;
  faTrash = faTrashAlt;
  faPencil = faPencilAlt;
  faReply = faReply;
  error: string;
  @Output() onUpdate = new EventEmitter();

  constructor(private modalService: NgbModal,
              private restaurantService: RestaurantService,
              private authGuardService: AuthGuard) {
  }

  ngOnInit(): void {
  }

  delete(comment: CommentModel) {
    const modal = this.modalService.open(DeleteCommentComponent);
    modal.componentInstance.comment = comment;
    modal.result.then(res => {
      this.onUpdate.emit();
    }, error => this.error = error.error?.message);
  }

  update(comment: CommentModel) {
    const modal = this.modalService.open(UpdateCommentComponent);
    modal.componentInstance.comment = comment;
    modal.result.then(res => {
      this.onUpdate.emit();
    });
  }

  reply(comment: CommentModel) {
    const modal = this.modalService.open(ReplyCommentComponent);
    modal.componentInstance.comment = comment;
    modal.result.then(res => {
      if (res && res.id) {
        this.onUpdate.emit();
      }
    });
  }

  get canEdit() {
    return this.authGuardService.can(Action.UPDATE_COMMENT);
  }

  get canDelete() {
    return this.authGuardService.can(Action.DELETE_COMMENT);
  }

  get canReply() {
    return this.authGuardService.can(Action.REPLY_COMMENT);
  }


}
