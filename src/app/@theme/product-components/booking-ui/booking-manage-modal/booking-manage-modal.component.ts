import { Component, OnInit, Inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassBookingService, ClassBookingRequestModel ,MemberPackagePeriodService } from '@angular-baobab/rx-client-api';
import { Subject, Observable, of, concat } from 'rxjs';
import swal from 'sweetalert2';
@Component({
  selector: 'ngx-booking-manage-modal',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './booking-manage-modal.component.html',
  styleUrls: ['./booking-manage-modal.component.scss']
})
export class BookingManageModalComponent implements OnInit {
  @Input() classEventId: number;
  @Input() id: number;
  submitPromise: Promise<any>;
  private classbookingModel: ClassBookingRequestModel = new ClassBookingRequestModel;
  private title = "Create Booking";
    memberPackages = {}; 
  constructor(public activeModal: NgbActiveModal,
    public classBookingService: ClassBookingService,
     public memberPackagePeriodService: MemberPackagePeriodService) {
  }

  ngOnInit() {
   console.log(this.classEventId);
    this.classbookingModel.memberPackageId = null;
      /*if (this.id != null) {
          this.title = "Edit Booking";
          this.classService.classGet2(this.id).subscribe(res => {
              console.log(res);
              this.classModel = res;
          });
      } else {

      }
   */
  }

    memberChanged(e){
        console.log("memberChanged",e);
        this.getMemberPackages(e.memberId);
    }
    getMemberPackages(memberId){
        this.memberPackages = {};
        this.memberPackagePeriodService.memberPackagePeriodGetActivePaidPackagesForMember(memberId, null).subscribe(res => {
              console.log(res);
              this.memberPackages = res;
          });
    }
  
    onSubmit()
    {
        this.classbookingModel.classEventId = this.classEventId;
        console.log(JSON.stringify(this.classbookingModel));
        if (this.classbookingModel.memberPackageId == null && this.classbookingModel.paymentMethod == null){
              swal(
                     'Please choose a package or payment method.',
                     'A Package or payment method is needed to add a booking.',
                     'error'
                     );
        }

        this.submitPromise = this.classBookingService.classBookingPostClassBackendBooking(this.classbookingModel).toPromise().then(result => {
                if (result.result){
                      swal(
                        'Booked',
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
                this.activeModal.close(1);
            }, error =>{
                    swal(
                    'Error saving',
                    'Could not book member',
                    'error'
                    );

                   
                    
            });
  }
 
}
