import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FacilityAutoEmailService, FacilityAutoEmailModel }
  from '@angular-baobab/rx-client-api';
import { Observable } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DxTreeListModule, DxCheckBoxModule, DxTreeListComponent } from 'devextreme-angular';
import DataSource from "devextreme/data/data_source";
import "rxjs/add/operator/toPromise";
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { Router } from '@angular/router';
import { FacilityAutoEmailManageComponent } from '../facility-auto-email-manage/facility-auto-email-manage.component';
@Component({
  selector: 'ngx-facility-auto-email-list',
  templateUrl: './facility-auto-email-list.component.html',
  styleUrls: ['./facility-auto-email-list.component.scss']
})
export class FacilityAutoEmailListComponent implements OnInit {
  @Input() facilityId: number;
 
  autoEmailDataSource = [];

  constructor(
    private modalService: NgbModal,
    private router: Router,
    public facilityAutoEmailService: FacilityAutoEmailService) {

}
 
  ngOnInit() {
      this.refreshData();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.refreshData();
  }
  refreshData() {
      this.facilityAutoEmailService.facilityAutoEmailGetAll(this.facilityId)
        .toPromise()
        .then(result => {
            console.log("facilityAutoEmailGetAll",result);
            this.autoEmailDataSource = result;

        });
  }

    manageAutoEmailer(emailerId){
        const modalRef = this.modalService.open(FacilityAutoEmailManageComponent, { size: 'lg', container: 'nb-layout' });
        modalRef.componentInstance.id = emailerId;
        modalRef.componentInstance.facilityId = this.facilityId;
         modalRef.result.then((result) => {
            this.refreshData();
        }).catch((error) => {

        });
    }

    deleteAutoEmailer(emailerId){
        console.log("deleteAutoEmailer",emailerId);
         this.facilityAutoEmailService.facilityAutoEmailDelete( emailerId)
        .toPromise()
        .then(result => {
            this.refreshData();
        });
    }
}
