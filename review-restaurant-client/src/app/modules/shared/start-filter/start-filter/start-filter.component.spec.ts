import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartFilterComponent } from './start-filter.component';

describe('StartFilterComponent', () => {
  let component: StartFilterComponent;
  let fixture: ComponentFixture<StartFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartFilterComponent ]
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
