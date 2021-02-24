import {Component, Input, OnInit} from '@angular/core';
import {CommentModel} from '../../../../models/comment-model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CommentService} from '../comment.service';

@Component({
  selector: 'app-reply-comment',
  templateUrl: './reply-comment.component.html',
  styleUrls: ['./reply-comment.component.scss']
})
export class ReplyCommentComponent implements OnInit {

  @Input() comment: CommentModel;

  error: string;
  form: FormGroup;
  saving: boolean;

  constructor(private activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private commentService: CommentService) {
    this.form = this.fb.group({
      reply: [null, [Validators.required, this.noWhitespaceValidator]]
    });
  }

  ngOnInit(): void {

    this.commentService.fetchOne(this.comment.id)
      .subscribe(
        (comment: CommentModel) => {
          this.comment = comment;
        },

        err => this.error = err.error.message);
  }


  get reply() {
    return this.form.get('reply');
  }

  get getReplyError() {
    if (this.reply.hasError('required')) {
      return 'Comment is required';
    }
    return this.reply.hasError('whitespace') ? 'Reply can not be whitespaces' : '';

  }


  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : {whitespace: true};
  }

  onClose() {
    this.activeModal.close();
  }

  onSubmit() {
    this.saving = true;
    const request = this.form.value;
    // set comment id
    request.id = this.comment.id;
    this.commentService.reply(request)
      .subscribe((updatedComment: CommentModel) => {
        this.activeModal.close(updatedComment);
      }, err => this.error = err.error?.message);
  }


}
