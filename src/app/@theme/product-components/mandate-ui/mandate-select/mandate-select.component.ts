import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import {  MandateService,  MandateModel }
  from '@angular-baobab/rx-client-api';
import { Observable } from 'rxjs';

import "rxjs/add/operator/toPromise";
import DataSource from "devextreme/data/data_source";
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-mandate-select',
    templateUrl: './mandate-select.component.html',
    styleUrls: ['./mandate-select.component.scss']
})
export class MandateSelectComponent implements OnInit {
   @Output() mandateIdChange = new EventEmitter<number>();
   @Output() mandateChange = new EventEmitter<any>();
   mandateModels: MandateModel[];
   @Input() memberId: number;
    @Input() mandateId: number;
  constructor(
      public mandateService: MandateService) {
     
    }

  ngOnInit() {
     
  }
  ngOnChanges(changes: SimpleChanges) {
      this.getPackage();
  }
    getPackage() {
        console.log("getMandate", this.memberId);
        var self = this;
        self.mandateService.mandateGetSigned(this.memberId).toPromise()
          .then(result => {
              console.log("getMandate",result);
              this.mandateModels =  result;
              this.updateMandate();
          });
  }

 getSelectedMandate() {
        /*if (this.packageId == null){
            return;
        }
        this.packageService.packageGet2(this.packageId).toPromise()
          .then(result => {
              console.log(result);
              this.mandateChange.emit(result);
          });*/
  }

  updateMandate() {
      this.mandateIdChange.emit(this.mandateId);
      this.getSelectedMandate();
      console.log(this.mandateId);
  }
  

}
