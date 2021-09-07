import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FacilityService, FacilityModel }
  from '@angular-baobab/rx-client-api';
import { Observable } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DxTreeListModule, DxCheckBoxModule, DxTreeListComponent } from 'devextreme-angular';
import "rxjs/add/operator/toPromise";
import { Router } from '@angular/router';
import {
    FacilitySelectedService,
} from "../../../@core/utils";
@Component({
  selector: 'ngx-facility-select',
  templateUrl: './facility-select.component.html',
  styleUrls: ['./facility-select.component.scss']
})
export class FacilitySelectComponent implements OnInit {
    @Output() facilityIdChange = new EventEmitter<number>();
    @Input() facilityId: number;
    facilityModels: FacilityModel[];
    
  constructor(
    public  facilityService: FacilityService,
    public  facilitySelectedService: FacilitySelectedService) {
     
      this.facilityService.facilityGetAll()
            .toPromise()
            .then(result => {
                this.facilityModels = result;
                console.log("Load " + this.facilityId);
                if (this.facilityId == null || this.facilityId == 1) {
                    this.facilityId = this.facilityModels[0].facilityId;
                    console.log("first " + this.facilityId);
                   
                }
                this.updateFacility();
            });
    }
  
  ngOnInit() {
       this.facilitySelectedService.facilityId.subscribe((facilityId: number) => {
          this.facilityId = facilityId;
         
      });
  }

  updateFacility() {
      this.facilityIdChange.emit(this.facilityId);
  }
 

}
