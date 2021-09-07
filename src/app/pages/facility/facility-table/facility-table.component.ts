import { Component,Renderer, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router, Routes } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FacilityManageComponent } from '../facility-manage/facility-manage.component';

import { FacilityService, FacilityModel, OrderDirection } from '@angular-baobab/rx-client-api';

import CustomStore from "devextreme/data/custom_store";
import swal from 'sweetalert2';
import { DxDataGridComponent } from 'devextreme-angular';
@Component({
  selector: 'ngx-facility-table',
  templateUrl: './facility-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class FacilityTableComponent {
  @ViewChild(DxDataGridComponent) facilityDataGrid: DxDataGridComponent;
  customerId: number;
  groupId: number;
  selectedRows: number[];
  facilityDataSource = {};

  constructor(http: HttpClient,
    renderer: Renderer,
    private router: Router,
    private modalService: NgbModal,
    public facilityService: FacilityService) {
    console.log("Facility");
    this.facilityDataSource = {
      store: new CustomStore({
        key: "facilityId",
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
          return this.facilityService.facilityGet(filter, orderColumn, orderDir, skip, take)
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
          return this.sitesService.apiSitesGet()
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
 
 

  public createFacility() {

    const modalRef = this.modalService.open(FacilityManageComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.id = null;
       modalRef.result.then((result) => {
        if (result) {
          this.facilityDataGrid.instance.refresh();
        } else {
          swal(
            'Facility Create Failed',
            'Please check your internet connection and try again.',
            'error'
          )
        }
      }).catch((error) => {

      });
    
  }
  public openClass() {
      this.router.navigate(['pages/facility/facility-details'], { queryParams: { id: this.selectedRows[0] } });
  }
}
