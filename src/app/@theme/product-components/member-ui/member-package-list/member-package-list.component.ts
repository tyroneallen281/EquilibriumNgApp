import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MemberService,PackageService,MemberPackageService,MemberPackageModel,PackageModel }
  from '@angular-baobab/rx-client-api';
import { Observable } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DxTreeListModule, DxCheckBoxModule, DxTreeListComponent } from 'devextreme-angular';
import DataSource from "devextreme/data/data_source";
import "rxjs/add/operator/toPromise";
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { Router } from '@angular/router';
import { MemberPackageManageComponent } from '../member-package-manage/member-package-manage.component';
import swal from 'sweetalert2';
@Component({
  selector: 'ngx-member-package-list',
  templateUrl: './member-package-list.component.html',
  styleUrls: ['./member-package-list.component.scss']
})
export class MemberPackageListComponent implements OnInit {
  @Input() memberId: number;
  @Input() facilityId: number;
 
  memberPackageListDataSource = [];

  constructor(
    private modalService: NgbModal,
    private router: Router,
    public memberService: MemberService,
      public memberPackageService: MemberPackageService) {

    }
 
    ngOnInit() {
        this.refreshData();
    }
    ngOnChanges(changes: SimpleChanges) {
      this.refreshData();
    }
    refreshData() {
        this.memberPackageService.memberPackageGetMemberPackages(this.memberId, null)
          .toPromise()
          .then(result => {
              console.log(result);
              this.memberPackageListDataSource = result;

          });
    }
    manageMemberPackage(memberPackageId : number){
    console.log("mp",memberPackageId);
           const modalRef = this.modalService.open(MemberPackageManageComponent, { size: 'lg', container: 'nb-layout' });
           modalRef.componentInstance.id = memberPackageId;
           modalRef.componentInstance.memberId = this.memberId;
           modalRef.componentInstance.facilityId = this.facilityId;
           modalRef.result.then((result) => {
               if (result) {
                 this.refreshData();
               } else {
                 swal(
                   'Member Package Manage Failed',
                   'Please check your internet connection and try again.',
                   'error'
                 )
               }
             }).catch((error) => {

             });
    }

}
