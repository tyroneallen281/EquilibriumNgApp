import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MemberService,PackageService,MemberPackagePeriodService,MemberPackageModel,MemberPackagePeriodModel,PackageModel, OrderDirection }
  from '@angular-baobab/rx-client-api';
import { Observable } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DxTreeListModule, DxCheckBoxModule, DxTreeListComponent } from 'devextreme-angular';
import DataSource from "devextreme/data/data_source";
import "rxjs/add/operator/toPromise";
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { Router } from '@angular/router';
import { MemberPackageManageComponent } from '../member-package-manage/member-package-manage.component';
import { MemberPackageUpdateComponent } from '../member-package-update/member-package-update.component';
import { MemberPackagePeriodManageComponent } from '../member-package-period-manage/member-package-period-manage.component';
import swal from 'sweetalert2';
import { PaymentHistoryManageModalComponent } from '../../payment/payment-history-manage-modal/payment-history-manage-modal.component';
@Component({
  selector: 'ngx-member-package-period-list',
  templateUrl: './member-package-period-list.component.html',
  styleUrls: ['./member-package-period-list.component.scss']
})
export class MemberPackagePeriodListComponent implements OnInit {
  @ViewChild(DxDataGridComponent) memberPackagePeriodListDataGrid: DxDataGridComponent;
  @Input() memberPackageId: number;
  
  memberPackageListDataSource = {};

  constructor(
    private modalService: NgbModal,
    private router: Router,
    public memberService: MemberService,
      public memberPackagePeriodService: MemberPackagePeriodService) {

    }
 
    ngOnInit() {
        this.loadData();
    }

    loadData() {
         this.memberPackageListDataSource = {
            store: new CustomStore({
            key: "memberPackagePeriodId",
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
                console.log("memberPacakgeId", this.memberPackageId);
                return this.memberPackagePeriodService.memberPackagePeriodGet(filter, orderColumn, orderDir, skip, take, this.memberPackageId)
                .toPromise()
                .then(result => {
                  return {
                    data: result.items || [],
                    totalCount: result.totalCount
                  }
                });
            }
            }),
             sort: { selector: "startDate", desc: 1 }
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
        this.memberPackagePeriodListDataGrid.instance.refresh();
    }
    
    managePeriod(periodId){
        const modalRef = this.modalService.open(MemberPackagePeriodManageComponent, { size: 'lg', container: 'nb-layout' });
        modalRef.componentInstance.id = periodId;
         modalRef.result.then((result) => {
            if (result) {
               
                this.refreshList();
            } else {
                swal(
                    'Period Edit Failed',
                    '',
                    'error'
                )
            }
        }).catch((error) => {

        });
    }
    managePaymentHistory(paymentHistoryId){
        const modalRef = this.modalService.open(PaymentHistoryManageModalComponent, { size: 'lg', container: 'nb-layout' });
        modalRef.componentInstance.paymentHistoryId = paymentHistoryId;
         modalRef.result.then((result) => {
            if (result) {
               
                this.refreshList();
            } else {
                swal(
                    'Payment Edit Failed',
                    '',
                    'error'
                )
            }
        }).catch((error) => {

        });
    }
}
