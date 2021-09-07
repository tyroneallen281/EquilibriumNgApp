import { Component, OnInit, Inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberPackagePeriodService, MemberPackagePeriodModel } from '@angular-baobab/rx-client-api';
import { Subject, Observable, of, concat } from 'rxjs';
@Component({
  selector: 'ngx-member-package-period-manage',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './member-package-period-manage.component.html',
  styleUrls: ['./member-package-period-manage.component.scss']
})
export class MemberPackagePeriodManageComponent implements OnInit {
  @Input() id: number;

  private submitPromise: Promise<any>;
  private memberPackagePeriodModel: MemberPackagePeriodModel = new MemberPackagePeriodModel;
  private title = "Create Package Period";
 
  constructor(public activeModal: NgbActiveModal,
    public packageService: MemberPackagePeriodService) {
  }

  ngOnInit() {
   
    if (this.id != null) {
      this.title = "Edit Package Period";
        this.packageService.memberPackagePeriodGetById(this.id).subscribe(res => {
        console.log(res);
        this.memberPackagePeriodModel = res;
      });
    }
     
  }

  
  onSubmit() {
       this.submitPromise =this.packageService.memberPackagePeriodUpdate(this.memberPackagePeriodModel).toPromise().then(result => {
          console.log(result);
          this.activeModal.close(1);
      }, error => console.log(error));
    
  }
 
}
