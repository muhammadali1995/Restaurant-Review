import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentRestaurantComponent } from './comment-restaurant.component';

describe('CommentRestaurantComponent', () => {
  let component: CommentRestaurantComponent;
  let fixture: ComponentFixture<CommentRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentRestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
