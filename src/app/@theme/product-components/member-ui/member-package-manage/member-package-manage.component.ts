import { Component, OnInit, Inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberService, NetCashService, MemberPackageCreateModel, MemberPackageService,PackageModel } from '@angular-baobab/rx-client-api';
import { Subject, Observable, of, concat } from 'rxjs';
import swal from 'sweetalert2';
@Component({
  selector: 'ngx-member-package-manage',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './member-package-manage.component.html',
  styleUrls: ['./member-package-manage.component.scss']
})
export class MemberPackageManageComponent implements OnInit {
  @Input() id: number;
  @Input() memberId: number;
  @Input() facilityId: number;
  private submitPromise: Promise<any>;
  private memberPackageModel: MemberPackageCreateModel = new MemberPackageCreateModel;
  private packageModel: PackageModel = new PackageModel;
  private title = "Create Member Package";
    private bankList = {};
 
  constructor(public activeModal: NgbActiveModal,
      public memberService: MemberService,
      public memberPackageService: MemberPackageService,
      public netCashService: NetCashService) {
  }

  ngOnInit() {
   
     this.title = "Create Member Package";
     this.memberPackageModel.memberId = this.memberId;
     this.memberPackageModel.startDateSetting = 0;
     this.memberPackageModel.defaultPaymentMethod = 0;
     this.getBankData();
 
  }
  
    getBankData() {
        this.netCashService.netCashGetFacilityBankAndBranchCodes(this.facilityId)
            .toPromise()
            .then(result => {
                console.log(result);
                this.bankList = result;

            });
    }

    packageChanged(e){
         this.memberPackageModel.monthlyRate = e.price;
    }

    onSubmit() {
        console.log(JSON.stringify(this.memberPackageModel));
        this.submitPromise = this.memberPackageService.memberPackageCreate(this.memberPackageModel).toPromise()
            .then(result => {
            console.log(result);
            if (result.result) {
                this.activeModal.close(1);
                swal(
                    'Package Created',
                    '',
                    'success'
                );

            } else {
                swal(
                    'Error saving',
                    result.resultMessage,
                    'error'
                );

            }
        }, error => console.log(error));
  }
}
