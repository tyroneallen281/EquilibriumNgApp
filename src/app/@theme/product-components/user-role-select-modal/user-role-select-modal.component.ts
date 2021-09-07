import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountsService, RolesService, CreateRoleBindingModel, ApplicationUserViewModel }
  from '@angular-baobab/authservice-client-api';
import { Observable } from 'rxjs';
import { DxTreeListModule, DxCheckBoxModule, DxTreeListComponent } from 'devextreme-angular';
import DataSource from "devextreme/data/data_source";
import "rxjs/add/operator/toPromise";
@Component({
  selector: 'ngx-user-role-select-modal',
  templateUrl: './user-role-select-modal.component.html',
  styleUrls: ['./user-role-select-modal.component.scss']
})
export class UserRoleSelectComponent implements OnInit {
  @Input() userId: string;
  @ViewChild(DxTreeListComponent) treeList: DxTreeListComponent;
  public selectedRowKeys: any[] = [];
  tasks: DataSource;


constructor(public activeModal: NgbActiveModal,
  public accountsService: AccountsService,
  public rolesService: RolesService) {

}
ngOnInit() {
  var self = this;
  this.tasks = new DataSource({
    load: function () {
      self.rolesService.rolesGetUserRole(self.userId).toPromise().then(result => {
        console.log(result);
        var list = result || [];
        list.forEach(function (item) {
          self.selectedRowKeys.push(item);
        });
      });
      return self.rolesService.rolesGetAllRoles().toPromise().then(result => {
        console.log(result);
        return result as any[];
      });
    }

  });
  
  }
  ngOnChanges(changes: SimpleChanges) {

  }

  formSubmit() {
    
    this.accountsService.accountsAssignRolesToUser(this.userId, this.selectedRowKeys)
      .subscribe(res => {
      this.activeModal.close("Form Close");
    }, error => console.log(error));
  }
}
