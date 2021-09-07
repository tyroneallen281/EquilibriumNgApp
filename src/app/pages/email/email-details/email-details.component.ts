import { Component, OnInit, Inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailTemplateService, EmailTemplateModel } from '@angular-baobab/rx-client-api';
import { RouterModule, Router, Routes, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import swal from 'sweetalert2';
import {
    FacilitySelectedService,
} from "../../../@core/utils";
@Component({
  selector: 'ngx-email-details',
  templateUrl: './email-details.component.html',
  styleUrls: ['./email-details.component.scss']
})
export class  EmailDetailsComponent implements OnInit {
  public id: number;
  public facilityId: number;
  private submitPromise: Promise<any>;
  public emailModel: EmailTemplateModel = new EmailTemplateModel;
  public urlSafe: SafeResourceUrl;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private emailTemplateService: EmailTemplateService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
   public facilitySelectedService: FacilitySelectedService) {
     
      facilitySelectedService.facilityId.subscribe((facilityId: number) => {
          this.facilityId = facilityId;
          console.log("Facility Staff  Change");
      });
      }

   ngOnInit() {
   this.route
       .queryParams
       .subscribe(params => {
         this.id = params['id'] || "";
         this.refreshEmailTemplate();
       });
  }

  refreshEmailTemplate () {
     this.emailTemplateService.emailTemplateGet2(this.id).subscribe(res => {
      console.log(res);
      this.emailModel = res;

    });
  }

  
  onSubmit() {
      this.emailModel.facilityId = this.facilityId;
    
        this.emailModel.companyId = parseInt(localStorage.getItem('companyId'));
        this.submitPromise =this.emailTemplateService.emailTemplatePut(this.emailModel).toPromise().then(result => {
          console.log(result);
                swal(
                    'Email Temaplate Created',
                    '',
                    'success'
                );
                this.router.navigate(['pages/email/email-table'], { queryParams: { id: result['emailTemplateId'] } });
            }, error => 
            {
                  swal(
                    'Error saving',
                    "Failed to save, please try again.",
                    'error'
                );    
            });
   
  }

    
}
