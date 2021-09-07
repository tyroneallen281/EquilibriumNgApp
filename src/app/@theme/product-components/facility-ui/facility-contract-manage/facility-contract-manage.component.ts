import { Component, OnInit, Inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FacilityService, FacilityModel, Facility } from '@angular-baobab/rx-client-api';
import { Subject, Observable, of, concat } from 'rxjs';
import swal from 'sweetalert2';
@Component({
  selector: 'ngx-facility-contract-manage',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './facility-contract-manage.component.html',
  styleUrls: ['./facility-contract-manage.component.scss']
})
export class FacilityContactManageComponent implements OnInit {
  @Input() id: number;
  private submitPromise: Promise<any>;
  private facilityModel: FacilityModel = new FacilityModel;
  private title = "Facility Contract Text";
 
  constructor(public activeModal: NgbActiveModal,
    public facilityService: FacilityService) {
  }

  ngOnInit() {
   
    if (this.id != null) {
        this.facilityService.facilityGet2(this.id).subscribe(res => {
            console.log(res);
            this.facilityModel = res;
      });
    }
   
  }

  
   onSubmit() {
        this.submitPromise = this.facilityService.facilityPutMandateTerms(this.facilityModel).toPromise().then(result => {
            console.log(result);
            if (result.result){
                 this.activeModal.close(1);
                  swal(
                    'Facility Updated',
                    '',
                    'success'
                );

            }else{
                swal(
                    'Error saving',
                    result.resultMessage,
                    'error'
                );

           }
        }, error => console.log(error));
        
  }
 
}
