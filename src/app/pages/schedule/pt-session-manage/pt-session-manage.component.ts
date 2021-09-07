import { Component, OnInit, Inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassService, ClassModel, ModelClass } from '@angular-baobab/rx-client-api';
import { Subject, Observable, of, concat } from 'rxjs';

@Component({
  selector: 'ngx-pt-session-manage',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './pt-session-manage.component.html',
  styleUrls: ['./pt-session-manage.component.scss']
})
export class TrainingSessionManageComponent implements OnInit {
  @Input() id: number;

    private scheduleModel: ClassModel = new ClassModel;
  private title = "Create Class";
 
  constructor(public activeModal: NgbActiveModal,
      public classService: ClassService) {
  }

  ngOnInit() {
   
    if (this.id != null) {
      this.title = "Edit Class";
      this.classService.classGet2(this.id).subscribe(res => {
        console.log(res);
        this.scheduleModel = res;
      });
    }
   
  }

  
  formSubmit() {
   if (this.id == null) {

        this.classService.classPost(this.scheduleModel).subscribe(res => {
        this.activeModal.close(1);
      }, error => console.log(error));
    } else {
        this.classService.classPut(this.scheduleModel, this.id).subscribe(res => {
        this.activeModal.close(1);
      }, error => console.log(error));
    }
  }
 
}
