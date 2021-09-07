import { Component, OnInit, Inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountsService, ApplicationUserViewModel } from '@angular-baobab/authservice-client-api';
import { RouterModule, Router, Routes, ActivatedRoute } from '@angular/router';
import { SystemUserManageComponent } from '../systemuser-manage/systemuser-manage.component';
import {  UserRoleSelectComponent } from '../../../@theme/product-components';
import { DashItemModel, DashFormDataModel, DasActionItemModel } from '../../../@core/classes/DashItemModel';
import { UserPasswordResetComponent } from '../../../@theme/product-components/user-password-reset-modal/user-password-reset-modal.component';
@Component({
  selector: 'ngx-systemuser-details',
  templateUrl: './systemuser-details.component.html',
  styleUrls: ['./systemuser-details.component.scss']
})
export class SystemUserDetailsComponent implements OnInit {
  public id: string;
  public userModel: ApplicationUserViewModel = new ApplicationUserViewModel;
  public dashData = [];
  public managerDashData: DashItemModel[];
  constructor(private router: Router,
    private route: ActivatedRoute,
    private accountsService: AccountsService,
    private modalService: NgbModal,
    
  ) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.id = params['id'] || "";
        this.refreshUser();
      });
  }
  manageUser() {
    const modalRef = this.modalService.open(SystemUserManageComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.id = this.id;
    modalRef.result.then((result) => {
      this.refreshUser();
    }).catch((error) => {

    });
  }
  manageResetPassword() {
    const modalRef = this.modalService.open(UserPasswordResetComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.userId = this.id;
    modalRef.result.then((result) => {
      this.refreshUser();

    }).catch((error) => {
      console.log(error);
    });
  }
  deleteUser() {
  
  }
  refreshUser() {
    this.accountsService.accountsGetUser(this.id).subscribe(res => {
      this.userModel = res;
    
    });
  }
 
  manageUserRoles() {
    const modalRef = this.modalService.open(UserRoleSelectComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.userId = this.id;
    modalRef.result.then((result) => {
      this.refreshUser();

    }).catch((error) => {
      console.log(error);
    });
  }
 
}
