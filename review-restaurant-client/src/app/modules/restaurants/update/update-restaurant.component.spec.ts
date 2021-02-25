import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UpdateRestaurantComponent} from './update-restaurant.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('UpdateRestaurantComponent', () => {
  let component: UpdateRestaurantComponent;
  let fixture: ComponentFixture<UpdateRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule, RouterTestingModule.withRoutes([])],
      declarations: [UpdateRestaurantComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
