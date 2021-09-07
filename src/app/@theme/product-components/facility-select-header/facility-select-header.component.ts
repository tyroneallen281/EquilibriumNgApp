import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

import "rxjs/add/operator/toPromise";
import { Router } from '@angular/router';
import {
    FacilitySelectedService,
} from "../../../@core/utils";
@Component({
  selector: 'ngx-facility-select-header',
  templateUrl: './facility-select-header.component.html',
  styleUrls: ['./facility-select-header.component.scss']
})
export class FacilitySelectHeaderComponent implements OnInit {
  @Input() facilityId: number;

 
  constructor(
      private router: Router,
    public  facilitySelectedService: FacilitySelectedService) {

    }
  ngOnInit() {
  
  }

  updateFacility(facilityId) {
      console.log("Header "+facilityId);
      this.facilitySelectedService.changeFacilityId(facilityId);
  }

}
