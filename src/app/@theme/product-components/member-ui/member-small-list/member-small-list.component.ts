import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ClassService, ClassModel, }
  from '@angular-baobab/rx-client-api';
import { MemberManageComponent } from '../member-manage/member-manage.component';

import { MemberService, MemberModel } from '@angular-baobab/rx-client-api';

import CustomStore from "devextreme/data/custom_store";
import swal from 'sweetalert2';
import { DxDataGridComponent } from 'devextreme-angular';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-member-small-list',
  templateUrl: './member-small-list.component.html',
  styleUrls: ['./member-small-list.component.scss']
})
export class MemberSmallListComponent implements OnInit {
  @Input() facilityId: number;

  classListDataSource = [];

  constructor(
    private router: Router,
    public classService: ClassService) {

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
