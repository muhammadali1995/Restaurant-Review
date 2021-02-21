import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LowestRatedComponent } from './lowest-rated.component';

describe('LowestRatedComponent', () => {
  let component: LowestRatedComponent;
  let fixture: ComponentFixture<LowestRatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LowestRatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LowestRatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
