import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CalendarService, ClassModel , ClassEventModel}
  from '@angular-baobab/rx-client-api';
import { Observable } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DxTreeListModule, DxCheckBoxModule, DxTreeListComponent } from 'devextreme-angular';
import DataSource from "devextreme/data/data_source";
import "rxjs/add/operator/toPromise";
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-class-event-modal',
  templateUrl: './class-event-modal.component.html',
  styleUrls: ['./class-event-modal.component.scss']
})
export class ClassEventModalComponent implements OnInit {
  @Input() id: number;
  private classEventModel: ClassEventModel = new ClassEventModel;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    public  calendarService: CalendarService) {

}
 
  ngOnInit() {
  
      if (this.id != null) {
          this.calendarService.calendarGet(this.id).subscribe(res => {
              console.log(res);
              this.classEventModel = res;
          });
      } else {

      }
  }
  ngOnChanges(changes: SimpleChanges) {
    this.refreshData();
  }
  refreshData() {
    
     /* this.classListDataSource.apiDevicesManagedAppListByIdGet(this.facilityId)
        .toPromise()
        .then(result => {
          this.classListDataSource = result;

        });
   */
   
  }


}
