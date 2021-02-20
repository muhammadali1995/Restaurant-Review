import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReviewComponent } from './edit-review.component';

describe('EditReviewComponent', () => {
  let component: UpdateReviewComponent;
  let fixture: ComponentFixture<UpdateReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
