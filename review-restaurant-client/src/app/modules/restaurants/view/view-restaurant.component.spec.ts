import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewRestaurantComponent} from './view-restaurant.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';

describe('ViewRestaurantComponent', () => {
  let component: ViewRestaurantComponent;
  let fixture: ComponentFixture<ViewRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), HttpClientModule],
      declarations: [ViewRestaurantComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
