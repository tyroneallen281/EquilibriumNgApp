import { Component, Renderer, Input, Output, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router, Routes } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MandateService, MandateModel, OrderDirection } from '@angular-baobab/rx-client-api';
import CustomStore from "devextreme/data/custom_store";
import swal from 'sweetalert2';
import { DxDataGridComponent } from 'devextreme-angular';
import { MandateCreateModalComponent } from '../mandate-create-modal/mandate-create-modal.component';

@Component({
  selector: 'ngx-mandate-list',
    templateUrl: './mandate-list.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class MandateListComponent {
  @ViewChild(DxDataGridComponent) mandateDataGrid: DxDataGridComponent;
  @Input() memberId: number;
  @Input() facilityId: number;
  dataSource = {};

  constructor(http: HttpClient,
    renderer: Renderer,
    private router: Router,
    private modalService: NgbModal,
    public mandateService: MandateService) {
   
        this.dataSource = {
          store: new CustomStore({
              key: "mandateId",
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
                return this.mandateService.mandateGet(filter, orderColumn, orderDir, skip, take, this.memberId, this.facilityId)
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
          sort: "dateSigned"
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
            },
            {
                location: 'after',
                widget: 'dxButton',
                options: {
                    icon: 'plus',
                    onClick: this.addMandate.bind(this)
                }
            }
           );
   
    }

    refreshList() {
        this.mandateDataGrid.instance.refresh();
    }


    addMandate()
    {
         const modalRef = this.modalService.open(MandateCreateModalComponent, { size: 'lg', container: 'nb-layout' });
         modalRef.componentInstance.memberId = this.memberId;
         modalRef.componentInstance.facilityId = this.facilityId;
        
         modalRef.result.then((result) => {
            this.refreshList();
         }).catch((error) => {
         
         });
    }
    
    resendMandate(mandateId){
            this.mandateService.mandateSendMandate(mandateId).toPromise().then(result => {
                swal(
                        'Sent',
                        '',
                        'success'
                    );
            }, error => {
                    swal(
                    'Error sending',
                    'Could not save mandate',
                    'error'
                    );
            });
    }
   
}
