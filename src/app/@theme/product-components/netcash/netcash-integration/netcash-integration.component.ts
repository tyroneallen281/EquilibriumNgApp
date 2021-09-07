import { Component, OnInit, Inject, Input, Output, EventEmitter,  ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FacilityService, NetCashService, FacilityModel, FacilityPaymentAccountKeysModel, ResponseListModelOfBoolean } from '@angular-baobab/rx-client-api';
import { Subject, Observable, of, concat } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'ngx-netcash-integration',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './netcash-integration.component.html',
  styleUrls: ['./netcash-integration.component.scss']
})
export class NetCashIntegrationComponent implements OnInit {
  @Input() facilityId: number;
  @Input() facilityPaymentAccountId: number;
  @Output() statusEvent : EventEmitter<boolean> = new EventEmitter();
  private submitPromise: Promise<any>;
  private facilityPaymentAccountKeysModel: FacilityPaymentAccountKeysModel = new FacilityPaymentAccountKeysModel;
  private validationResult : ResponseListModelOfBoolean = new ResponseListModelOfBoolean;
 
  constructor(
    public facilityService: FacilityService,
    public netCashService: NetCashService) {
  }

  ngOnInit() {
      if (this.facilityId != null) {
        this.facilityService.facilityGetAccountKeys(this.facilityId).subscribe(res => {
            console.log(res);
            this.facilityPaymentAccountKeysModel = res;
      });
     this.netCashService.netCashGetAccountKeysStatus(this.facilityId).subscribe(res => {
            this.statusEvent.emit(res.listResult);
            this.validationResult = res;
      });
    }
  }

  
   onSubmit() {
        console.log(this.facilityPaymentAccountKeysModel);
       this.submitPromise = this.facilityService.facilityPutAccountKeys(this.facilityPaymentAccountKeysModel, this.facilityId).toPromise()
            .then(result => {
                console.log("result", result);
                 this.validationResult = result;
                 this.statusEvent.emit(this.validationResult.listResult);
                    
                 if (result.listResult){
                     swal(
                     'Service Key Saved',
                     'Service keys validated and saved.',
                     'success'
                     );
                 }else{
                    
                     swal(
                     'Service Key Error',
                     'Service keys validated failed please correct errors.',
                     'error'
                     );
                 }
               
            }, error => {
                    swal(
                    'Service Key Error',
                    'Service keys validated failed please correct errors.',
                    'error'
                    );
                    this.validationResult  = error.error;
                   
                    console.log("error", this.validationResult);
                   
                    
            });
  }
 
}
