import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CommentModel} from '../../../../models/comment-model';
import {CommentService} from '../comment.service';

@Component({
  selector: 'app-delete-comment',
  templateUrl: './delete-comment.component.html',
  styleUrls: ['./delete-comment.component.scss']
})
export class DeleteCommentComponent implements OnInit {

  @Input() comment: CommentModel;

  constructor(private activeModal: NgbActiveModal, private commentService: CommentService) {
  }

  ngOnInit(): void {

  }


  onClose() {
    this.activeModal.close('closed');
  }

  delete() {
    this.commentService.delete(this.comment.id).subscribe(res => {
      window.alert('Successfully deleted');
      this.activeModal.close('success');
    });
  }
}
