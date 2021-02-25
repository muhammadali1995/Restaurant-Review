import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListRestaurantComponent} from './list-restaurant.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";

describe('ListRestaurantComponent', () => {
  let component: ListRestaurantComponent;
  let fixture: ComponentFixture<ListRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, RouterTestingModule.withRoutes([])],
      declarations: [ListRestaurantComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
