import {Component, Input, OnInit} from '@angular/core';
import {RestaurantModel} from '../../../../models/restaurant.model';
import {CommentModel} from '../../../../models/comment-model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeleteCommentComponent} from '../delete/delete-comment.component';
import {faPencilAlt, faTrashAlt, faReply} from '@fortawesome/free-solid-svg-icons';
import {UpdateCommentComponent} from '../update/update-comment.component';
import {ReplyCommentComponent} from '../reply/reply-comment.component';

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

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  delete(comment: CommentModel) {
    const index = this.restaurant.comments.indexOf(comment);
    const modal = this.modalService.open(DeleteCommentComponent);
    modal.componentInstance.comment = comment;
    modal.result.then(res => {
      this.restaurant.comments.splice(index, 1);
    });
  }

  update(comment: CommentModel) {
    const index = this.restaurant.comments.indexOf(comment);
    const modal = this.modalService.open(UpdateCommentComponent);
    modal.componentInstance.comment = comment;
    modal.result.then(res => {
      if (res && res.id) {
        this.restaurant.comments[index] = res;
      }
    });
  }

  reply(comment: CommentModel) {
    const index = this.restaurant.comments.indexOf(comment);
    const modal = this.modalService.open(ReplyCommentComponent);
    modal.componentInstance.comment = comment;
    modal.result.then(res => {
      if (res && res.id) {
        this.restaurant.comments[index] = res;
      }
    });
  }

}
