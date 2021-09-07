import { Component, OnInit ,Inject,Input} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountsService, UpdateUserBindingModel } from '@angular-baobab/authservice-client-api';
import { RouterModule, Router, Routes } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'ngx-systemuser-create',
  templateUrl: './systemuser-manage.component.html',
  styleUrls: ['./systemuser-manage.component.scss']
})
export class SystemUserManageComponent implements OnInit {
  @Input() id: string;
  public title = "Edit System User";
  public userModel: UpdateUserBindingModel = new UpdateUserBindingModel;
  constructor(public activeModal: NgbActiveModal,
    private usersService: AccountsService,
    private router: Router) {
  }

  ngOnInit() {
    if (this.id !== null) {
      this.usersService.accountsGetUser(this.id).subscribe(res => {
        console.log(res);
        this.userModel = res as UpdateUserBindingModel;
      });
    }
  }

  formSubmit() {
    console.log(this.userModel);
    this.usersService.accountsUpdateUser(this.userModel).subscribe(res => {
      this.activeModal.close("Form Close");
    }, error => swal({
      type: 'error',
      title: 'Could Not Update User',
      text: 'Something went wrong!',

    }));
  }
}
