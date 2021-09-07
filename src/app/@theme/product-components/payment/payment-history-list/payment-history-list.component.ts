import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild,Renderer } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router, Routes } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StaffService, StaffModel }
  from '@angular-baobab/rx-client-api';
import { Observable } from 'rxjs';
import "rxjs/add/operator/toPromise";
import DataSource from "devextreme/data/data_source";
import { PaymentHistoryService, PaymentHistoryModel, OrderDirection } from '@angular-baobab/rx-client-api';
import CustomStore from "devextreme/data/custom_store";
import swal from 'sweetalert2';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'ngx-payment-history-list',
    templateUrl: './payment-history-list.component.html',
    styleUrls: ['./payment-history-list.component.scss']
})
export class PaymentHistoryListComponent {
  @ViewChild(DxDataGridComponent) paymentHistoryDataGrid: DxDataGridComponent;
  @Input() facilityId: number;
  @Input() memberId: number;
  selectedRows: number[];
  paymentHistoryDataSource = {};

  constructor(http: HttpClient,
    renderer: Renderer,
    private router: Router,
    private modalService: NgbModal,
    public paymentHistoryService: PaymentHistoryService) {
    console.log("PaymentHistory");
   
    this.paymentHistoryDataSource = {
      store: new CustomStore({
        key: "paymentHistoryId",
        load: (loadOptions) => {
          var skip = loadOptions.skip;
          var take = loadOptions.take;
          var filter = "";
          var orderColumn = "";
            var orderDir: OrderDirection= 0;
          if (loadOptions.sort) {
            orderColumn = loadOptions.sort[0].selector;
            if (loadOptions.sort[0].desc) {
              orderDir= 1;
            }
          }
          if (loadOptions.filter) {
            filter = loadOptions.filter[0].filterValue;
          }
            return this.paymentHistoryService.paymentHistoryGet(filter, orderColumn, orderDir, skip, take, this.facilityId, this.memberId,null,null,null,null)
            .toPromise()
            .then(result => {
              console.log("paymenthistory " + result);
              return {
                data: result.items || [],
                totalCount: result.totalCount
              }
            });
        }
      }),
      sort: "paymentDateTime"
    }
  }
 
    ngOnChanges(changes: SimpleChanges) {
        this.paymentHistoryDataGrid.instance.refresh();
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
            },
            {
                location: 'after',
                widget: 'dxButton',
                options: {
                    icon: 'filter',
                    onClick: this.refreshList.bind(this)
                }
            });
    }

    refreshList() {
        this.paymentHistoryDataGrid.instance.refresh();
    }
}

