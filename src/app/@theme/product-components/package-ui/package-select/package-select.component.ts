import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import {  PackageService,  PackageModel }
  from '@angular-baobab/rx-client-api';
import { Observable } from 'rxjs';

import "rxjs/add/operator/toPromise";
import DataSource from "devextreme/data/data_source";
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-package-select',
    templateUrl: './package-select.component.html',
    styleUrls: ['./package-select.component.scss']
})
export class PackageSelectComponent implements OnInit {
   @Output() packageIdChange = new EventEmitter<number>();
   @Output() packageChange = new EventEmitter<any>();
   @Input() packageId: number;
   @Input() facilityId: number; 
    packageModels: PackageModel[];
    
  constructor(
      public packageService: PackageService) {
     
    }

  ngOnInit() {
     
  }
  ngOnChanges(changes: SimpleChanges) {
      this.getPackage();
  }
    getPackage() {
        console.log("getPackage", this.facilityId);
        var self = this;
        self.packageService.packageGetAll().toPromise()
          .then(result => {
              console.log("getPackage",result);
              this.packageModels =  result;
              this.updatePackage();
          });
  }

 getSelectedPackage() {
        if (this.packageId == null){
            return;
        }
        this.packageService.packageGet2(this.packageId).toPromise()
          .then(result => {
              console.log(result);
              this.packageChange.emit(result);
          });
  }

  updatePackage() {
      this.packageIdChange.emit(this.packageId);
      this.getSelectedPackage();
      console.log(this.packageId);
  }
  

}
