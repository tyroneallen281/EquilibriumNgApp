import { Component,Renderer, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router, Routes } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailTemplateService, EmailTemplateModel, OrderDirection } from '@angular-baobab/rx-client-api';
import CustomStore from "devextreme/data/custom_store";
import swal from 'sweetalert2';
import { DxDataGridComponent } from 'devextreme-angular';
import {
    FacilitySelectedService,
} from "../../../@core/utils";

@Component({
  selector: 'ngx-email-table',
  templateUrl: './email-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class  EmailTableComponent {
  @ViewChild(DxDataGridComponent) emailDataGrid: DxDataGridComponent;
  facilityId: number;
  selectedRows: number[];
  emailDataSource = {};

  constructor(http: HttpClient,
    renderer: Renderer,
    private router: Router,
    private modalService: NgbModal,
    public emailTemplateService: EmailTemplateService,
    public facilitySelectedService: FacilitySelectedService) {
    console.log("email");
    facilitySelectedService.facilityId.subscribe((facilityId: number) => {
        this.facilityId = facilityId;
        if (this.emailDataGrid != null) {
            this.emailDataGrid.instance.refresh();
        }
        
    });
    this.emailDataSource = {
      store: new CustomStore({
        key: "emailTemplateId",
        load: (loadOptions) => {
          let skip = loadOptions.skip;
          let take = loadOptions.take;
          let filter = "";
          let orderColumn = "";
          let orderDir: OrderDirection =  0;
          if (loadOptions.sort) {
            orderColumn = loadOptions.sort[0].selector;
            if (loadOptions.sort[0].desc) {
              orderDir= 1;
            }
          }
          if (loadOptions.filter) {
            filter = loadOptions.filter[0].filterValue;
          }
          console.log("emailTemplateService",this.facilityId);
          return this.emailTemplateService.emailTemplateGet(filter, orderColumn, orderDir, skip, take, this.facilityId)
            .toPromise()
            .then(result => {
              console.log(result);
              return {
                data: result.items || [],
                totalCount: result.totalCount
              }
            });
        }
      }),
      sort: "name"
    }
  }
 
 

    refreshList() {
        this.emailDataGrid.instance.refresh();
    }
}
