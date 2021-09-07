import { Component, OnInit, Inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarService, ClassEventModel, ModelClass } from '@angular-baobab/rx-client-api';
import { Subject, Observable, of, concat } from 'rxjs';

@Component({
  selector: 'ngx-class-event-manage',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './class-event-manage.component.html',
  styleUrls: ['./class-event-manage.component.scss']
})
export class ClassEventManageComponent implements OnInit {
  @Input() id: number;
  submitPromise: Promise<any>;
  private classModel: ClassEventModel = new ClassEventModel;
  private title = "Create Class";
 
  constructor(public activeModal: NgbActiveModal,
    public calendarService: CalendarService) {
  }

  ngOnInit() {
   
      if (this.id != null) {
          this.title = "Edit Class Event";
          this.calendarService.calendarGet(this.id).subscribe(res => {
              console.log(res);
              this.classModel = res;
          });
      }
   
  }

  
    onSubmit() {
            console.log(JSON.stringify(this.classModel));
          this.submitPromise =this.calendarService.calendarPut(this.classModel, this.id).toPromise().then(result => {
                console.log(result);
                this.activeModal.close(1);
            }, error => console.log(error))
  }
 
}
