import { Component, OnInit, Inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PackageService, PackageModel } from '@angular-baobab/rx-client-api';
import { Subject, Observable, of, concat } from 'rxjs';
import {
    FacilitySelectedService,
} from "../../../@core/utils";

@Component({
  selector: 'ngx-package-create',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './package-manage.component.html',
  styleUrls: ['./package-manage.component.scss']
})
export class PackageManageComponent implements OnInit {
  @Input() id: number;
  private  facilityId: number;
  private submitPromise: Promise<any>;
  private packageModel: PackageModel = new PackageModel;
  private title = "Create Package";
 
  constructor(public activeModal: NgbActiveModal,
    public packageService: PackageService,
    public  facilitySelectedService: FacilitySelectedService) {
     facilitySelectedService.facilityId.subscribe((facilityId: number) => {
        this.facilityId = facilityId;
        
    });
  }

  ngOnInit() {
   
    if (this.id != null) {
      this.title = "Edit Package";
        this.packageService.packageGet2(this.id).subscribe(res => {
        console.log(res);
        this.packageModel = res;
      });
    }
     this.facilitySelectedService.facilityId.subscribe((facilityId: number) => {
          this.facilityId = facilityId;
         
      });
  }

  
  onSubmit() {
      this.packageModel.facilityId = this.facilityId;
    
    if (this.id == null) {
        this.packageModel.companyId = parseInt(localStorage.getItem('companyId'));
        this.submitPromise =this.packageService.packagePost(this.packageModel).toPromise().then(result => {
          console.log(result);
          this.activeModal.close(1);
      }, error => console.log(error));
    } else {
        this.submitPromise =this.packageService.packagePut(this.packageModel, this.id).toPromise().then(result => {
          console.log(result);
          this.activeModal.close(1);
      }, error => console.log(error));
    }
  }
 
}
