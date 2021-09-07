import { Component, OnInit, Inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassService, ClassModel } from '@angular-baobab/rx-client-api';
import { Subject, Observable, of, concat } from 'rxjs';

@Component({
  selector: 'ngx-booking-create-modal',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './booking-create-modal.component.html',
  styleUrls: ['./booking-create-modal.component.scss']
})
export class BookingCreateModalComponent implements OnInit {
  @Input() id: number;
  submitPromise: Promise<any>;
  private classModel: ClassModel = new ClassModel;
  private title = "Create Class";
 
  constructor(public activeModal: NgbActiveModal,
    public classService: ClassService) {
  }

  ngOnInit() {
   
      if (this.id != null) {
          this.title = "Edit Booking";
          this.classService.classGet2(this.id).subscribe(res => {
              console.log(res);
              this.classModel = res;
          });
      } else {

          this.classModel.classState = 0;

      }
   
  }

  
    onSubmit() {
/*

      console.log(JSON.stringify(this.classModel));
        if (this.id == null) {
            this.submitPromise = this.classService.classPost(this.classModel).toPromise().then(result => {
                console.log(result);
                this.activeModal.close(1);
            }, error => console.log(error));
        } else {
            this.submitPromise = this.classService.classPut(this.id, this.classModel).toPromise().then(result => {
                console.log(result);
                this.activeModal.close(1);
            }, error => console.log(error));
        }*/
  }
 
}
