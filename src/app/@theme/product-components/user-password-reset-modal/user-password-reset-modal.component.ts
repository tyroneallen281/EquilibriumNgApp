import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountsService, RolesService, CreateRoleBindingModel, ApplicationUserViewModel }
  from '@angular-baobab/authservice-client-api';

import "rxjs/add/operator/toPromise";

@Component({
  selector: 'ngx-user-password-reset-modal',
  templateUrl: './user-password-reset-modal.component.html',
  styleUrls: ['./user-password-reset-modal.component.scss']
})
export class UserPasswordResetComponent implements OnInit {
  @Input() userId: string;
  public newPassword = "";
  public newConfirmPassword = "";
constructor(public activeModal: NgbActiveModal,
  public accountsService: AccountsService) {

}
ngOnInit() {
 
  }
  ngOnChanges(changes: SimpleChanges) {

  }

  onSubmit() {
    console.log(this.newPassword);
    this.accountsService.accountsResetPasswordAdmin(this.userId, this.newPassword).subscribe(res => {
      this.activeModal.close("Form Close");
    }, error => console.log(error));
  }
}
