import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { StaffService, StaffModel }
  from '@angular-baobab/rx-client-api';
import { Observable } from 'rxjs';

import "rxjs/add/operator/toPromise";
import DataSource from "devextreme/data/data_source";
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-staff-single-select',
    templateUrl: './staff-single-select.component.html',
    styleUrls: ['./staff-single-select.component.scss']
})
export class StaffSingleSelectComponent implements OnInit {
    @Output() staffIdChange = new EventEmitter<any>();
    @Input() facilityId: number;
    staffModels: StaffModel[];
    @Input() staffId: number = null;
    dropdownSettings = {};
    
  constructor(
      public staffService: StaffService) {
     
    }

  ngOnInit() {
      this.getStaff();
  }
  ngOnChanges(changes: SimpleChanges) {
      this.getStaff();
  }
  getStaff() {

      var self = this;
      self.staffService.staffGetAll(this.facilityId).toPromise()
          .then(result => {
              console.log(result);
              this.staffModels =  result;
          });
  }
  updateStaff() {
      this.staffIdChange.emit(this.staffId);
      console.log(this.staffId);
  }
  

}
