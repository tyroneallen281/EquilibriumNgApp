import { Component, OnInit, Inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MandateService, MandateCreateModel , NetCashService} from '@angular-baobab/rx-client-api';
import { Subject, Observable, of, concat } from 'rxjs';
import swal from 'sweetalert2';
@Component({
  selector: 'ngx-mandate-create-modal',
  changeDetection: ChangeDetectionStrategy.Default,
    templateUrl: './mandate-create-modal.component.html',
    styleUrls: ['./mandate-create-modal.component.scss']
})
export class MandateCreateModalComponent implements OnInit {
  @Input() memberId: number;
  @Input() facilityId: number;
  submitPromise: Promise<any>;
  private bankList = {};
 
  private mandateModel: MandateCreateModel = new MandateCreateModel;

  constructor(public activeModal: NgbActiveModal,
        public mandateService: MandateService,
        public netCashService: NetCashService) {
  }

  ngOnInit() {
   this.getBankData();
  }

  onUploaded(e,prop) {
    this.mandateModel[prop] = e.request.responseText;
    console.log(this.mandateModel);
  }
  
    onSubmit() {
        this.mandateModel.memberId = this.memberId;
        console.log(JSON.stringify( this.mandateModel));
        if (this.mandateModel.mandateType == 0 && this.mandateModel.fileLink == null){
                swal(
                     'Please upload a mandate',
                     'The document is required for you save. If you do not load it please ensure you have a physical copy to comply.',
                     'warning'
                     );
                
        }
        
       this.submitPromise = this.mandateService.mandateCreateMandate(this.mandateModel).toPromise().then(result => {
            console.log(result);
            if (result.result){
                      swal(
                        'Saved',
                        '',
                        'success'
                    );
                    this.activeModal.close(1);
                }else{
                    swal(
                        'Error saving',
                        result.resultMessage,
                        'error'
                    );

                }
               
            }, error => {
                    swal(
                    'Error saving',
                    'Could not save mandate',
                    'error'
                    );
            });
    }

    getBankData() {
        this.netCashService.netCashGetFacilityBankAndBranchCodes(this.facilityId)
            .toPromise()
            .then(result => {
                console.log(result);
                this.bankList = result;

            });
    }
}
