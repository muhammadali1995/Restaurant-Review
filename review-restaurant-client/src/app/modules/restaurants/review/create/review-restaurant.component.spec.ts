import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewRestaurantComponent } from './review-restaurant.component';

describe('ReviewRestaurantComponent', () => {
  let component: ReviewRestaurantComponent;
  let fixture: ComponentFixture<ReviewRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewRestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
