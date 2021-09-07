import { Component, OnInit, Inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberPackageService, MemberPackageModel } from '@angular-baobab/rx-client-api';
import { Subject, Observable, of, concat } from 'rxjs';
import swal from 'sweetalert2';
@Component({
  selector: 'ngx-member-package-update',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './member-package-update.component.html',
  styleUrls: ['./member-package-update.component.scss']
})
export class MemberPackageUpdateComponent implements OnInit {
  @Input() id: number;


  private submitPromise: Promise<any>;
  private packageModel: MemberPackageModel = new MemberPackageModel;
  private title = "Create Package";
 
  constructor(public activeModal: NgbActiveModal,
    public packageService: MemberPackageService) {
  }

  ngOnInit() {
   
        if (this.id != null) {
          this.title = "Edit Package";
            this.packageService.memberPackageGet(this.id).subscribe(res => {
                console.log(res);
                this.packageModel = res;
          });
        }
    }


  
  onSubmit() {
      this.submitPromise = this.packageService.memberPackageUpdate(this.packageModel).toPromise().then(result => {
          console.log(result);
          if (result.result) {
              this.activeModal.close(1);
              swal(
                  'Package Updated',
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
