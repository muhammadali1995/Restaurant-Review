import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StartFilterComponent} from './start-filter.component';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('StartFilterComponent', () => {
  let component: StartFilterComponent;
  let fixture: ComponentFixture<StartFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule, RouterTestingModule.withRoutes([])],
      declarations: [StartFilterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
