import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ClassService, ClassModel }
  from '@angular-baobab/rx-client-api';
import { Observable } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DxTreeListModule, DxCheckBoxModule, DxTreeListComponent } from 'devextreme-angular';
import DataSource from "devextreme/data/data_source";
import "rxjs/add/operator/toPromise";
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-class-modal',
  templateUrl: './class-modal.component.html',
  styleUrls: ['./class-modal.component.scss']
})
export class ClassModalComponent implements OnInit {
  @Input() facilityId: number;

  classListDataSource = [];

  constructor(
    private modalService: NgbModal,
    private router: Router,
    public  classService: ClassService) {

}
 
  ngOnInit() {
  
  }
  ngOnChanges(changes: SimpleChanges) {
    this.refreshData();
  }
  refreshData() {
    
     /* this.classListDataSource.apiDevicesManagedAppListByIdGet(this.facilityId)
        .toPromise()
        .then(result => {
          this.classListDataSource = result;

        });
   */
   
  }


}
