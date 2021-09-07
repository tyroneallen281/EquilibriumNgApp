import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild,Renderer } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router, Routes } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StaffService, StaffModel }
  from '@angular-baobab/rx-client-api';
import { Observable } from 'rxjs';
import "rxjs/add/operator/toPromise";
import DataSource from "devextreme/data/data_source";
import { MemberManageComponent } from '../member-manage/member-manage.component';
import { MemberService, MemberModel, OrderDirection } from '@angular-baobab/rx-client-api';
import { NotificationModalComponent } from '../../notification-modal/notification-modal.component';

import CustomStore from "devextreme/data/custom_store";
import swal from 'sweetalert2';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'ngx-member-list',
    templateUrl: './member-list.component.html',
    styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent {
    @ViewChild(DxDataGridComponent) memberDataGrid: DxDataGridComponent;
  @Input() facilityId: number;
  @Input() packageId: number;
  @Input() hasPackage: boolean;
  selectedRows: number[];
  memberDataSource = {};

  constructor(http: HttpClient,
    renderer: Renderer,
    private router: Router,
    private modalService: NgbModal,
    public memberService: MemberService) {
    console.log("member");
   
    this.memberDataSource = {
      store: new CustomStore({
        key: "memberId",
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
            return this.memberService.memberGet(filter, orderColumn, orderDir, skip, take, this.facilityId, this.packageId, this.hasPackage)
            .toPromise()
            .then(result => {
              console.log("members " + result);
              return {
                data: result.items || [],
                totalCount: result.totalCount
              }
            });
        }
      }),
      sort: "firstName"
    }
  }
 
    ngOnChanges(changes: SimpleChanges) {
        this.memberDataGrid.instance.refresh();
    }

  public createMember() {

    const modalRef = this.modalService.open(MemberManageComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.id = null;
       modalRef.result.then((result) => {
        if (result) {
          this.memberDataGrid.instance.refresh();
        } else {
          swal(
            'Member Create Failed',
            'Please check your internet connection and try again.',
            'error'
          )
        }
      }).catch((error) => {

      });
    
  }

 sendNotification() {
        if (this.selectedRows == null || this.selectedRows.length == 0) {
            swal(
                'No Members selected',
                'Please select members to send too.',
                'error'
            );
            return;
         }
         const modalRef = this.modalService.open(NotificationModalComponent, { size: 'lg', container: 'nb-layout' });
         modalRef.componentInstance.memberIds = this.selectedRows;
         
         modalRef.result.then((result) => {
             if (!result)
             {
                 swal(
                     'Sending Notification Failed',
                     'Please check your internet connection and try again.',
                     'error'
                 )
             }
         }).catch((error) => {
         
         });
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
                    icon: 'message',
                    onClick: this.sendNotification.bind(this)
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
        this.memberDataGrid.instance.refresh();
    }
}

