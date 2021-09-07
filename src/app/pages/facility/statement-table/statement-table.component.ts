import { Component,Renderer, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router, Routes } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FacilityManageComponent } from '../facility-manage/facility-manage.component';

import { AccountingService, StatementModel, OrderDirection } from '@angular-baobab/rx-client-api';

import CustomStore from "devextreme/data/custom_store";
import swal from 'sweetalert2';
import { DxDataGridComponent } from 'devextreme-angular';
import {
    FacilitySelectedService,
} from "../../../@core/utils";

@Component({
  selector: 'ngx-statement-table',
  templateUrl: './statement-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class StatementTableComponent {
  @ViewChild(DxDataGridComponent) statementDataGrid: DxDataGridComponent;
  facilityId: number;
  statementDataSource = {};

  constructor(http: HttpClient,
    renderer: Renderer,
    private router: Router,
    private modalService: NgbModal,
    public accountingService: AccountingService,
    public facilitySelectedService: FacilitySelectedService) {
    facilitySelectedService.facilityId.subscribe((facilityId: number) => {
        this.facilityId = facilityId;
        if (this.statementDataGrid != null) {
            this.statementDataGrid.instance.refresh();
        }
        
    });
    console.log("Statement");
    this.statementDataSource = {
      store: new CustomStore({
        key: "statementId",
        load: (loadOptions) => {
          var skip = loadOptions.skip;
          var take = loadOptions.take;
          var filter = "";
          var orderColumn = "";
            var orderDir: OrderDirection = 0;
          if (loadOptions.sort) {
            orderColumn = loadOptions.sort[0].selector;
            if (loadOptions.sort[0].desc) {
              orderDir= 1;
            }
          }
          if (loadOptions.filter) {
            filter = loadOptions.filter[0].filterValue;
          }
          return this.accountingService.accountingGetStatement(filter, orderColumn, orderDir, skip, take, this.facilityId)
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
        sort: { selector: "applicableDateTime", desc: 1 }
    }
  }

    onToolbarPreparing(e) {
        e.toolbarOptions.items.unshift(
            {
                location: 'after',
                widget: 'dxButton',
                options: {
                    icon: 'refresh',
                    onClick: this.refreshList.bind(this)
                }
            });
    }

    refreshList() {
        this.statementDataGrid.instance.refresh();
    }
}
