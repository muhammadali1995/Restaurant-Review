import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RestaurantModel} from '../../../models/restaurant.model';
import {CommentService} from '../services/comment.service';
import {CommentModel} from '../../../models/comment-model';
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-comment-restaurant',
  templateUrl: './comment-restaurant.component.html',
  styleUrls: ['./comment-restaurant.component.scss']
})
export class CommentRestaurantComponent implements OnInit {

  form: FormGroup;
  commenting: boolean;
  error: string;
  @Input() restaurant: RestaurantModel;
  @Output() onComment = new EventEmitter();

  constructor(private fb: FormBuilder, private commentService: CommentService) {
    this.form = this.fb.group({
      restaurant_id: [null, Validators.required],
      comment: [null, [Validators.required, this.noWhitespaceValidator]]
    });
  }

  ngOnInit(): void {
    // set the id of the restaurant being commented
    console.log(this.restaurant);
    this.form.get('restaurant_id').setValue(this.restaurant.id);
  }

  // comment error

  get comment() {
    return this.form.get('comment');
  }

  get getCommentError() {
    if (this.comment.hasError('required')) {
      return this.comment.hasError('required') ? 'Comment is required' : '';
    }

    return this.comment.hasError('whitespace') ? 'Comment can not be whitespaces' : '';
  }


  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : {whitespace: true};
  }

  onCommentSubmitted() {
    this.commenting = true;
    const request = this.form.value;
    this.commentService.create(request).pipe(finalize(() => this.commenting = false)).subscribe((comment: CommentModel) => {
      this.onComment.emit(comment);
    }, er => this.error = er.error.message);
  }


}
