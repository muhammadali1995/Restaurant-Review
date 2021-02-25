import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteReviewComponent} from './delete-review.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';

describe('DeleteReviewComponent', () => {
  let component: DeleteReviewComponent;
  let fixture: ComponentFixture<DeleteReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteReviewComponent],
      imports: [HttpClientModule],
      providers: [NgbActiveModal]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
