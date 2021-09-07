import { Component, Renderer } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router, Routes } from '@angular/router';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { AccountsService, ApplicationUserViewModel } from '@angular-baobab/authservice-client-api';
import { SystemUserCreateComponent } from '../systemuser-create/systemuser-create.component';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { concat } from 'rxjs';
import * as moment from 'moment';

import CustomStore from "devextreme/data/custom_store";
@Component({
  selector: 'ngx-user-table',
  templateUrl: './systemuser-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SystemUsersTableComponent {
  
  lookupDataSource = {};
  selectedRows: number[];
  constructor(http: HttpClient,
    renderer: Renderer,
    private modalService: NgbModal,
    private router: Router,
    private toasterService: ToasterService,
    private accountsService: AccountsService) {

    this.lookupDataSource = {
      store: new CustomStore({
        key: "id",
        load: (loadOptions) => {
          return this.accountsService.accountsGetUsers()
            .toPromise()
            .then(result => {
              console.log(result);
              return {
                data: result || []
              }
            });
        },
        byKey: function (key) {
          return this.accountsService.accountsGetUsers()
            .toPromise()
            .then(result => {
              console.log(result);
              return {
                data: result || []
              }
            });
        }
      }),
      sort: "email"
    }
  }


  public createUser() {
    const modalRef = this.modalService.open(SystemUserCreateComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.result.then((result) => {
      console.log(result);

    }).catch((error) => {
      console.log(error);
    });
  }
  public rowSelected() {
    if (this.selectedRows) {
      this.router.navigate(['pages/systemusers/systemuser-details'], { queryParams: { id: this.selectedRows[0] } });
    }

  }
}
