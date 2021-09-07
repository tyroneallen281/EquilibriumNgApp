import { Component, OnInit, Inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberService, MemberModel, Member } from '@angular-baobab/rx-client-api';
import { Subject, Observable, of, concat } from 'rxjs';
import swal from 'sweetalert2';
@Component({
  selector: 'ngx-member-create',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './member-manage.component.html',
  styleUrls: ['./member-manage.component.scss']
})
export class MemberManageComponent implements OnInit {
  @Input() id: number;
  @Input() facilityId: number;  
  private submitPromise: Promise<any>;
  private memberModel: MemberModel = new MemberModel;
  private title = "Create Member";
 
  constructor(public activeModal: NgbActiveModal,
    public memberService: MemberService) {
  }

  ngOnInit() {
   
    if (this.id != null) {
      this.title = "Edit Member";
        this.memberService.memberGet2(this.id).subscribe(res => {
        console.log(res);
        this.memberModel = res;
      });
    }
   
  }

  
   onSubmit() {
       this.memberModel.facilityId = this.facilityId;
        if (this.id == null) {

            this.submitPromise = this.memberService.memberPost(this.memberModel).toPromise().then(result => {
                console.log(result);
                if (result.result){
                     this.activeModal.close(1);
                      swal(
                        'Member Created',
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
        } else {
            this.submitPromise = this.memberService.memberPut(this.memberModel, this.id).toPromise().then(result => {
                swal(
                        'Member Saved',
                        '',
                        'success'
                    );

                this.activeModal.close(1);
            }, error => console.log(error));
        }
  }
 
}
