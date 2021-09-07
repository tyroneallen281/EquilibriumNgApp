import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { StaffService, StaffModel }
  from '@angular-baobab/rx-client-api';
import { Observable } from 'rxjs';

import "rxjs/add/operator/toPromise";
import DataSource from "devextreme/data/data_source";
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-staff-select',
    templateUrl: './staff-select.component.html',
    styleUrls: ['./staff-select.component.scss']
})
export class StaffSelectComponent implements OnInit {
    @Output() staffChange = new EventEmitter<any>();
    @Input() facilityId: number;
    @Input() staff = [];
    staffModels: StaffModel[];
    dropdownSettings = {};
    
  constructor(
      public staffService: StaffService) {
     
    }

  ngOnInit() {
     
  }

  ngOnChanges(changes: SimpleChanges) {
      this.getStaff();
  }

  getStaff() {

      console.log("Change Facility staff=" + this.facilityId);
      var self = this;
      self.staffService.staffGetAll(this.facilityId).toPromise()
          .then(result => {
              this.staffModels =  result;
          });
  }

  updateStaff() {
      this.staffChange.emit(this.staff);
  }
  

}
