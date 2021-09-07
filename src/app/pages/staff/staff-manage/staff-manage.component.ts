import { Component, OnInit, Inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StaffService, StaffModel, Staff } from '@angular-baobab/rx-client-api';
import { Subject, Observable, of, concat } from 'rxjs';

@Component({
  selector: 'ngx-staff-manage',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './staff-manage.component.html',
  styleUrls: ['./staff-manage.component.scss']
})
export class  StaffManageComponent implements OnInit {
  @Input() id: number;

  private staffModel: StaffModel = new StaffModel;
  private title = "Create Staff";
 
  constructor(public activeModal: NgbActiveModal,
    public staffService: StaffService) {
  }

  ngOnInit() {
   
    if (this.id != null) {
      this.title = "Edit Staff";
      this.staffService.staffGet2(this.id).subscribe(res => {
        console.log(res);
        this.staffModel = res;
      });
    }
  }

  onSubmit() {
    if (this.id == null) {

      this.staffService.staffPost(this.staffModel).subscribe(res => {
          console.log(res);
          this.activeModal.close(1);
      }, error => console.log(error));
    }
    else
    {
      this.staffService.staffPut(this.staffModel ,this.id).subscribe(res => {
          console.log(res);
          this.activeModal.close(1);
      }, error => console.log(error));
    }
  }
 
}
