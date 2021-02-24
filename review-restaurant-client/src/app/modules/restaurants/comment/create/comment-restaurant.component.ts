import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RestaurantModel} from '../../../../models/restaurant.model';
import {CommentService} from '../comment.service';
import {CommentModel} from '../../../../models/comment-model';
import {finalize} from 'rxjs/operators';
import {ValidatorService} from '../../../shared/services/validator.service';
import {RestaurantService} from '../../restaurant.service';

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
  @Output() onUpdate = new EventEmitter();

  constructor(private fb: FormBuilder,
              private validatorService: ValidatorService,
              private restaurantService: RestaurantService,
              private commentService: CommentService) {
    this.setForm();
  }

  ngOnInit(): void {
    this.form.get('restaurant_id').setValue(this.restaurant.id);
  }

  // comment error

  get comment() {
    return this.form.get('comment');
  }

  get getCommentError() {
    if (this.comment.hasError('required')) {
      return 'Comment is required';
    }
    return (this.comment.errors && this.comment.errors.whitespace) ? 'Comment can not be whitespaces' : '';
  }

  onCommentSubmitted() {
    this.commenting = true;
    const request = this.form.value;
    this.commentService.create(request).pipe(finalize(() => this.commenting = false)).subscribe((comment: CommentModel) => {
      this.onUpdate.emit();
      this.setForm();
    }, er => this.error = er.error?.message);
  }

  setForm() {
    this.form = this.fb.group({
      restaurant_id: [this.restaurant?.id, Validators.required],
      comment: [null, [this.validatorService.noWhitespaceValidator]]
    });
  }


}
