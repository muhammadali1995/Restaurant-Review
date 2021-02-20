import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyReviewComponent } from './reply-review.component';

describe('ReplyReviewComponent', () => {
  let component: ReplyReviewComponent;
  let fixture: ComponentFixture<ReplyReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplyReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
