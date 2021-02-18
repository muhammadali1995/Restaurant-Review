import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [HeaderComponent],
  exports: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbAlertModule,
    NgbModule,
  ]
})
export class SharedModule {
}
