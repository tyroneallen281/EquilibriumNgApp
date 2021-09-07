import { Component,Renderer, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router, Routes } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StaffManageComponent } from '../staff-manage/staff-manage.component';
import { StaffService, StaffModel, OrderDirection } from '@angular-baobab/rx-client-api';
import CustomStore from "devextreme/data/custom_store";
import swal from 'sweetalert2';
import { DxDataGridComponent } from 'devextreme-angular';
import {
    FacilitySelectedService,
} from "../../../@core/utils";
import {
        StaffImportComponent
    }
    from "../../../@theme/product-components/staff-ui/staff-import/staff-import.component";

@Component({
  selector: 'ngx-staff-table',
  templateUrl: './staff-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class StaffTableComponent {
  @ViewChild(DxDataGridComponent) staffDataGrid: DxDataGridComponent;
  facilityId: number;
  selectedRows: number[];
  staffDataSource = {};

  constructor(http: HttpClient,
    renderer: Renderer,
    private router: Router,
    private modalService: NgbModal,
    public staffService: StaffService,
    public facilitySelectedService: FacilitySelectedService) {
    console.log("member");
    facilitySelectedService.facilityId.subscribe((facilityId: number) => {
        this.facilityId = facilityId;
        if (this.staffDataGrid != null) {
            this.staffDataGrid.instance.refresh();
        }
        
    });
    this.staffDataSource = {
      store: new CustomStore({
        key: "staffId",
        load: (loadOptions) => {
          var skip = loadOptions.skip;
          var take = loadOptions.take;
          var filter = "";
          var orderColumn = "";
            var orderDir: OrderDirection =  0;
          if (loadOptions.sort) {
            orderColumn = loadOptions.sort[0].selector;
            if (loadOptions.sort[0].desc) {
              orderDir= 1;
            }
          }
          if (loadOptions.filter) {
            filter = loadOptions.filter[0].filterValue;
          }
          return this.staffService.staffGet(filter, orderColumn, orderDir, skip, take,this.facilityId)
            .toPromise()
            .then(result => {
              console.log(result);
              return {
                data: result.items || [],
                totalCount: result.totalCount
              }
            });
        },
        byKey: function (key) {
          return this.staffService.staffGet()
            .toPromise()
            .then(result => {
              return {
                data: result.items,
                totalCount: result.totalCount
              }

            });
        }
      }),
      sort: "name"
    }
  }
 
 

  public createStaff() {

    const modalRef = this.modalService.open(StaffManageComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.id = null;
       modalRef.result.then((result) => {
        if (result) {
          this.staffDataGrid.instance.refresh();
        } else {
          swal(
            'Staff Create Failed',
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
                    icon: 'filter',
                    onClick: this.refreshList.bind(this)
                }
            });
    }


    refreshList() {
        this.staffDataGrid.instance.refresh();
    }

   public importMember() {

    const modalRef = this.modalService.open(StaffImportComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.facilityId = this.facilityId;
       modalRef.result.then((result) => {
        this.refreshList();
      }).catch((error) => {

      });
    
  }

}
