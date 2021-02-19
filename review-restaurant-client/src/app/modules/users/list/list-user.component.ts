import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../../models/user-model';
import {UserService} from '../user.service';
import {finalize} from 'rxjs/operators';
import {ListUserResponse} from '../../../models/list-user-response';
import {UrlService} from '../../shared/services/url.service';
import {faPencilAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeleteUserComponent} from '../delete/delete-user.component';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  total: number;
  page = 0;
  loading: boolean;
  pageSize = 10;
  error: string;
  users: UserModel [];
  faEdit = faPencilAlt;
  faTrash = faTrashAlt;

  constructor(private userService: UserService,
              private urlService: UrlService,
              private router: Router,
              private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.fetch(1);
  }


  // get the rows of the current page and update total
  fetch(page: number) {
    this.userService.fetchAll(page - 1)
      .pipe(finalize(() => this.loading = false))
      .subscribe((response: ListUserResponse) => {
        this.users = response.rows;
        this.total = response.total;
      }, error => this.error = error);

    this.urlService.updateUrl(page);
  }


  // open delete modal

  delete(user: UserModel) {
    const index = this.users.indexOf(user);
    const modal = this.modalService.open(DeleteUserComponent);
    modal.componentInstance.user = user;
    modal.result.then(res => {
      if (res === 'success') {
        window.alert('Successfully deleted');
      }
      this.users.splice(index, 1);
    });
  }

  update(id: number) {
    this.router.navigate([`${id}/update`]).then();
  }


}
