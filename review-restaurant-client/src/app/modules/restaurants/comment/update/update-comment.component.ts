import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CommentService} from '../comment.service';
import {CommentModel} from '../../../../models/comment-model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-comment',
  templateUrl: './update-comment.component.html',
  styleUrls: ['./update-comment.component.scss']
})
export class UpdateCommentComponent implements OnInit {


  @Input() comment: CommentModel;

  error: string;
  form: FormGroup;
  saving: boolean;

  constructor(private activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private commentService: CommentService) {
    this.form = this.fb.group({
      comment: [null, [Validators.required, this.noWhitespaceValidator]]
    });
  }

  ngOnInit(): void {

    this.commentService.fetchOne(this.comment.id)
      .subscribe(
        (comment: CommentModel) => {
          this.comment = comment;
          this.form.patchValue({
            comment: comment.comment
          });
        },

        err => this.error = err.error.message);
  }


  get commentControl() {
    return this.form.get('comment');
  }

  get getCommentError() {
    if (this.commentControl.hasError('required')) {
      return 'Comment is required';
    }

    return this.commentControl.hasError('whitespace') ? 'Comment can not be whitespaces' : '';
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
    this.commentService.update(this.comment.id, request)
      .subscribe((updatedComment: CommentModel) => {
        this.activeModal.close(updatedComment);
      }, err => this.error = err.error.message);
  }

}
