import { Component,Renderer, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router, Routes } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PackageManageComponent } from '../package-manage/package-manage.component';

import { PackageService, PackageModel, OrderDirection} from '@angular-baobab/rx-client-api';
import {
    FacilitySelectedService,
} from "../../../@core/utils";
import CustomStore from "devextreme/data/custom_store";
import swal from 'sweetalert2';
import { DxDataGridComponent } from 'devextreme-angular';
@Component({
  selector: 'ngx-package-table',
  templateUrl: './package-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class PackageTableComponent {
  @ViewChild(DxDataGridComponent) packageDataGrid: DxDataGridComponent;
  facilityId: number;
  selectedRows: number[];
  packageDataSource = {};

  constructor(http: HttpClient,
    renderer: Renderer,
    private router: Router,
    private modalService: NgbModal,
    public packageService: PackageService,
    public facilitySelectedService: FacilitySelectedService) {
    console.log("package");
    facilitySelectedService.facilityId.subscribe((facilityId: number) => {
        this.facilityId = facilityId;
        if (this.packageDataGrid != null) {
            this.packageDataGrid.instance.refresh();
        }
        
    });
    this.packageDataSource = {
      store: new CustomStore({
        key: "packageId",
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
          return this.packageService.packageGet(filter, orderColumn, orderDir, skip, take, this.facilityId)
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
 
 

  public createPackage() {

    const modalRef = this.modalService.open(PackageManageComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.id = null;
       modalRef.result.then((result) => {
        if (result) {
          this.packageDataGrid.instance.refresh();
        } else {
          swal(
            'Package Create Failed',
            'Please check your internet connection and try again.',
            'error'
          )
        }
      }).catch((error) => {

      });
    
  }
  public rowSelected() {
    if (this.selectedRows) {
      this.router.navigate(['pages/package/package-details'], { queryParams: { id: this.selectedRows[0] } });
    }

  }
}
