import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteCommentComponent} from './delete-comment.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';

describe('DeleteCommentComponent', () => {
  let component: DeleteCommentComponent;
  let fixture: ComponentFixture<DeleteCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule, HttpClientModule],
      providers: [NgbActiveModal],
      declarations: [DeleteCommentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
