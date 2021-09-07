import { Component, OnInit, Inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FacilityService, NetCashService, FacilityModel, FacilityPaymentAccountModel, NetCashAccessViewModel, ResponseListModelOfBoolean } from '@angular-baobab/rx-client-api';
import { Subject, Observable, of, concat } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'ngx-netcash-access',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './netcash-access.component.html',
  styleUrls: ['./netcash-access.component.scss']
})
export class NetCashAccessComponent implements OnInit {
  @Input() facilityId: number;
  @Input() facilityPaymentAccountId: number;
  private submitPromise: Promise<any>;
  private facilityPaymentAccountModel: FacilityPaymentAccountModel = new FacilityPaymentAccountModel;
  private netCashAccessViewModel: NetCashAccessViewModel = new NetCashAccessViewModel;
  private loggedIn : boolean = false;     
  private accessUrl : string = ""; 
 
  constructor(
    public facilityService: FacilityService,
    public netCashService: NetCashService) {
  }

  ngOnInit() {
    
    this.loadAccessPayload();
  }

    loadAccessPayload(){
        this.netCashService.netCashGetNetAccessPayload(this.facilityId).subscribe(res => {
            console.log("netCashGetNetAccessPayload",res);
            if (res){
                this.loggedIn = true;
                this.netCashAccessViewModel = res;
                this.accessUrl = "https://app.baobabtech.co.za/RX.pay/NetCash/Access?Username="+this.netCashAccessViewModel.username+"&EncryptedPayload="+this.netCashAccessViewModel.encryptedPayload;
                console.log(this.accessUrl);
            }else{
                this.loggedIn = false;
            }
            
      });
    }

  clearAccessAccount(){
        this.facilityService.facilityDeleteAccount(this.facilityId).subscribe(res => {
            console.log("netCashGetNetAccessPayload",res);
              this.loggedIn = false;
                swal(
                     'NetCash Access Acount Deleted',
                     'Account details deleted, please login again.',
                     'success'
                     );
            
      });
    }
  
   onSubmit() {
        this.facilityPaymentAccountModel.facilityId = this.facilityId;
       this.submitPromise = this.facilityService.facilityPutAccount(this.facilityPaymentAccountModel).toPromise()
            .then(result => {
                 this.loggedIn = true;
                
            }, error => {
                    swal(
                    'Error saving',
                    'NetCash Access detail could be saved.',
                    'error'
                    );

                   
                    
            });
  }
 
}
