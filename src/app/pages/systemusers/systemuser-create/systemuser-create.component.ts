import { Component, OnInit , Inject, Input, ViewChild} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountsService, CreateUserBindingModel } from '@angular-baobab/authservice-client-api';
import { FormsModule } from "@angular/forms";
import { ToasterService, ToasterModule } from 'angular2-toaster';
import swal from 'sweetalert2';

@Component({
  selector: 'ngx-systemuser-create',
  templateUrl: './systemuser-create.component.html',
  styleUrls: ['./systemuser-create.component.scss']
})
export class SystemUserCreateComponent implements OnInit {
   public title = "Create System User";
  public userModel: CreateUserBindingModel = new  CreateUserBindingModel;
  @ViewChild('f') form: any;
  constructor(public activeModal: NgbActiveModal,
    private usersService: AccountsService) {
  }

  ngOnInit() {

  }

  formSubmit() {

    console.log(this.userModel);
    if (this.form.valid) {
      this.userModel.username = this.userModel.email;
      this.usersService.accountsCreateUser(this.userModel).subscribe(res => {
        this.activeModal.close("Form Close");
       
      }, error => {
        swal({
          type: 'error',
          title: 'Could Not Create User',
          text: 'Something went wrong!',

        });
      });
    }
  }
}
