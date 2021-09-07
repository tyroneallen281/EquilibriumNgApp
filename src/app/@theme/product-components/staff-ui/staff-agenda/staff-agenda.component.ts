import { Component, OnInit, EventEmitter, Input, Output, OnChanges, Renderer, SimpleChanges, ViewChild } from '@angular/core';
import { MomentModule } from 'angular2-moment/moment.module';
import { RouterModule, Router, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarService, ClassEventModel } from '@angular-baobab/rx-client-api';
import * as moment from 'moment';
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";
import { DxSchedulerModule, DxSchedulerComponent} from "devextreme-angular";
import swal from 'sweetalert2';

import { CalendarEvent, CalendarView } from 'angular-calendar';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format,
} from 'date-fns';

@Component({
  selector: 'ngx-staff-agenda-element',
  templateUrl: './staff-agenda.component.html',
  styleUrls: ['./staff-agenda.component.scss']
})
export class StaffAgendaComponent implements OnInit {
    @Input() facilityId: number;
    @Input() staffId: number;
    schedulerDataSource: any = {};
    @ViewChild(DxSchedulerComponent) schedulerComponent: DxSchedulerComponent;
  constructor(http: HttpClient,
    private router: Router,
    renderer: Renderer,
    private modalService: NgbModal,
    public calendarService: CalendarService)
  {

  }

    ngOnInit() {

        this.schedulerDataSource = new DataSource({
                  store: new CustomStore({
                      load: (loadOptions) => {
                            console.log(loadOptions);
                          return this.calendarService
                              .calendarGetStaffAccountAgenda(loadOptions['dxScheduler'].startDate, loadOptions['dxScheduler'].endDate,this.facilityId, this.staffId)
                           .toPromise()
                           .then(result => {
                               console.log("cal",result);
                               return result;
                           });
                         
                      }
                  }),
                  paginate: false
              });
  }

  ngOnChanges(changes: SimpleChanges) {
     this.schedulerDataSource.reload();  
  }
  
  eventClick(model: any) {
  
  }

  addEventClick($event){
        console.log($event);
        $event.cancel = $.Deferred();
        $event.cancel.done(function (response) {
            $event.cancel.resolve(response);
        });

       this.router.navigate(['pages/schedule/class-event-details'], { queryParams: { id: $event.appointmentData.calendarEventId } });
  }

 addCalendarClick($event){
        console.log($event);
        $event.event.stopPropagation();
  }


}
