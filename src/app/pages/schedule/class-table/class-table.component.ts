import { Component,Renderer, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router, Routes } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
        ClassManageComponent
    }
    from "../../../@theme/product-components";

import { TrainingSessionManageComponent } from '../pt-session-manage/pt-session-manage.component';
import { ClassService, ClassModel } from '@angular-baobab/rx-client-api';
import CustomStore from "devextreme/data/custom_store";
import swal from 'sweetalert2';
import { DxDataGridComponent } from 'devextreme-angular';
import {
    FacilitySelectedService,
} from "../../../@core/utils";
@Component({
  selector: 'ngx-class-table',
  templateUrl: './class-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class ClassTableComponent {
  @ViewChild(DxDataGridComponent) classDataGrid: DxDataGridComponent;
  facilityId: number;
  scheduleDataSource = {};

  constructor(http: HttpClient,
    renderer: Renderer,
    private router: Router,
    private modalService: NgbModal,
    public scheduleService: ClassService,
    public facilitySelectedService: FacilitySelectedService) {
    console.log("class");
    facilitySelectedService.facilityId.subscribe((facilityId: number) => {
        this.facilityId = facilityId;
        console.log(facilityId);
    });
   
  }
 
 

    public manageClass() {

        const modalRef = this.modalService.open(ClassManageComponent, { size: 'lg', container: 'nb-layout' });
        modalRef.componentInstance.id = null;
        modalRef.result.then((result) => {
          if (result) {
            
          } else {
            swal(
              'Class Manage Failed',
              'Please check your internet connection and try again.',
              'error'
            )
          }
        }).catch((error) => {

        });
    }

}
