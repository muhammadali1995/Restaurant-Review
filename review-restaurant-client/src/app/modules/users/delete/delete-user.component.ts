import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {finalize} from 'rxjs/operators';
import {UserModel} from '../../../models/user-model';
import {UserService} from '../user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  @Input() user: UserModel;
  error: string;
  deleting: boolean;

  constructor(private userService: UserService,
              private activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  delete() {
    this.deleting = true;
    this.userService.delete(this.user.id).pipe(finalize(() => this.deleting = false)).subscribe(res => {
      this.activeModal.close('success');
    }, error => this.error = error);
  }


  onClose() {
    this.activeModal.close('close');
  }

}
