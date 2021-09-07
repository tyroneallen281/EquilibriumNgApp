import { Component, OnInit, Inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassService, ClassModel, ModelClass } from '@angular-baobab/rx-client-api';
import { Subject, Observable, of, concat } from 'rxjs';

@Component({
  selector: 'ngx-class-manage',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './class-manage.component.html',
  styleUrls: ['./class-manage.component.scss']
})
export class ClassManageComponent implements OnInit {
  @Input() id: number;
  submitPromise: Promise<any>;
  private classModel: ClassModel = new ClassModel;
  private title = "Create Class";
 
  constructor(public activeModal: NgbActiveModal,
    public classService: ClassService) {
  }

  ngOnInit() {
   
      if (this.id != null) {
          this.title = "Edit Class";
          this.classService.classGet2(this.id).subscribe(res => {
              this.classModel = res;
              this.classModel.startDateTime =  new Date(this.classModel.startDateTime);
              this.classModel.endDateTime =  new Date(this.classModel.endDateTime);
          });
      } else {

          this.classModel.classState = 0;
          this.classModel.classGender = 0;

      }
   
  }

  
    onSubmit() {


      console.log(JSON.stringify(this.classModel));
        if (this.id == null) {
            this.submitPromise = this.classService.classPost(this.classModel).toPromise().then(result => {
                console.log(result);
                this.activeModal.close(1);
            }, error => console.log(error))
        } else {
            this.submitPromise =this.classService.classPut(this.classModel, this.id).toPromise().then(result => {
                console.log(result);
                this.activeModal.close(1);
            }, error => console.log(error))
           
        }
  }
 
}
