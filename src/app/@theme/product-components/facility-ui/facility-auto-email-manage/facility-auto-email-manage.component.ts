import { Component, OnInit, Inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FacilityAutoEmailService, EmailTemplateService, FacilityAutoEmailModel } from '@angular-baobab/rx-client-api';
import { Subject, Observable, of, concat } from 'rxjs';
import swal from 'sweetalert2';
@Component({
  selector: 'ngx-facility-auto-email-manage',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './facility-auto-email-manage.component.html',
  styleUrls: ['./facility-auto-email-manage.component.scss']
})
export class FacilityAutoEmailManageComponent implements OnInit {
  @Input() id: number;
  @Input() facilityId: number;
  private submitPromise: Promise<any>;
  private facilityAutoEmailModel: FacilityAutoEmailModel = new FacilityAutoEmailModel;
  private  facilityEmailTemplateList = [];
  private title = "Manage Facility Auto Email";
 
  constructor(public activeModal: NgbActiveModal,
    public facilityAutoEmailService: FacilityAutoEmailService,
    public emailTemplateService: EmailTemplateService) {
  }

  ngOnInit() {
   
    if (this.id != null) {
        this.facilityAutoEmailService.facilityAutoEmailGet(this.id).subscribe(res => {
            console.log(res);
            this.facilityAutoEmailModel = res;
      });
    }

    this.facilityEmailTemplate();
  }

    facilityEmailTemplate(){
         this.emailTemplateService.emailTemplateGetAll(this.facilityId).subscribe(res => {
            console.log(res);
            this.facilityEmailTemplateList = res;
      });
    }  

   onSubmit() {
         this.facilityAutoEmailModel.facilityId = this.facilityId;
        this.submitPromise = this.facilityAutoEmailService.facilityAutoEmailPost(this.facilityAutoEmailModel).toPromise().then(result => {
            console.log(result);
            this.activeModal.close(1);
                  swal(
                    'Auto Email Setup Updated',
                    '',
                    'success'
                );
        }, error => console.log(error));
        
  }
 
}
