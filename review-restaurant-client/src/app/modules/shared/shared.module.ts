import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {StartFilterComponent} from './start-filter/start-filter/start-filter.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [HeaderComponent,
    StartFilterComponent],
  exports: [
    HeaderComponent,
    StartFilterComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    HttpClientModule,
    NgbAlertModule,
    NgbModule,
    RouterModule,
    FormsModule,
  ]
})
export class SharedModule {
}
