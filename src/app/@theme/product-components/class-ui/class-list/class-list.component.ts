import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ClassService, ClassModel, CalendarService, OrderDirection }
  from '@angular-baobab/rx-client-api';
import { Observable } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DxTreeListModule, DxCheckBoxModule, DxTreeListComponent } from 'devextreme-angular';
import DataSource from "devextreme/data/data_source";
import "rxjs/add/operator/toPromise";
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import {
        ClassManageComponent
    }
    from "../class-manage/class-manage.component";
@Component({
  selector: 'ngx-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent implements OnInit {
    @ViewChild(DxDataGridComponent) classDataGrid: DxDataGridComponent;
    @Input() facilityId: number;
    @Input() packageId: number;
    @Input() trainerId: number;
    classListDataSource = {};

  constructor(
    private modalService: NgbModal,
    private router: Router,
    public classService: ClassService,
    public calendarService: CalendarService) {
      this.classListDataSource = {
          store: new CustomStore({
              key: "classId",
              load: (loadOptions) => {
                  let skip = loadOptions.skip;
                  let take = loadOptions.take;
                  let filter = "";
                  let orderColumn = "";
                  let orderDir: OrderDirection = 0;
                  if (loadOptions.sort) {
                      orderColumn = loadOptions.sort[0].selector;
                      if (loadOptions.sort[0].desc) {
                          orderDir = 1;
                      }
                  }
                  if (loadOptions.filter) {
                      filter = loadOptions.filter[0].filterValue;
                  }
                  return this.classService.classGet(filter, orderColumn, orderDir, skip, take, this.facilityId)
                      .toPromise()
                      .then(result => {
                          console.log(result);
                          return {
                              data: result.items || [],
                              totalCount: result.totalCount
                          }
                      });
              }
          }),
          sort: "name"
      }
}
 
  ngOnInit() {
      this.refreshData();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.refreshData();
  }
  refreshData() {
      this.classService.classGetAll(this.facilityId, this.packageId,this.trainerId)
        .toPromise()
        .then(result => {
            console.log(result);
            this.classListDataSource = result;

        });
  }
   public manageClass(classId) {
        console.log("manageClass",classId);
        const modalRef = this.modalService.open(ClassManageComponent, { size: 'lg', container: 'nb-layout' });
        modalRef.componentInstance.id = classId;
        modalRef.result.then((result) => {
          if (result) {
             this.refreshData();
          } else {
            swal(
              'Class Edit Failed',
              'Please check your internet connection and try again.',
              'error'
            )
          }
        }).catch((error) => {

        });
    }

    
    onToolbarPreparing(e) {
        e.toolbarOptions.items.unshift(
            {
                location: 'after',
                widget: 'dxButton',
                options: {
                    icon: 'refresh',
                    onClick: this.refreshList.bind(this)
                }
            });
    }

    refreshList() {
        this.classDataGrid.instance.refresh();
    }

}
