import { Component, Renderer, Input, Output, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router, Routes } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassBookingService, ClassBookingModel, OrderDirection } from '@angular-baobab/rx-client-api';
import CustomStore from "devextreme/data/custom_store";
import swal from 'sweetalert2';
import { DxDataGridComponent } from 'devextreme-angular';
import { NotificationModalComponent } from '../../notification-modal/notification-modal.component';
import { BookingQuestionnaireModalComponent } from '../booking-questionnaire-modal/booking-questionnaire-modal.component';
import { BookingManageModalComponent } from '../booking-manage-modal/booking-manage-modal.component';

@Component({
  selector: 'ngx-booking-list',
  templateUrl: './booking-list.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class BookingListComponent {
  @ViewChild(DxDataGridComponent) bookingDataGrid: DxDataGridComponent;
  @Input() classEventId: number;
  @Input() memberId: number;
  selectedRows: number[];
  dataSource = {};

  constructor(http: HttpClient,
    renderer: Renderer,
    private router: Router,
    private modalService: NgbModal,
    public classBookingService: ClassBookingService) {
   
        this.dataSource = {
          store: new CustomStore({
              key: "classBookingId",
            load: (loadOptions) => {
              let skip = loadOptions.skip;
              let take = loadOptions.take;
              let filter = "";
              let orderColumn = "";
              let orderDir: OrderDirection =  0;
              if (loadOptions.sort) {
                orderColumn = loadOptions.sort[0].selector;
                if (loadOptions.sort[0].desc) {
                  orderDir= 1;
                }
              }
              if (loadOptions.filter) {
                filter = loadOptions.filter[0].filterValue;
              }
                return this.classBookingService.classBookingGetClassBookingsPaging(filter, orderColumn, orderDir, skip, take, this.classEventId, this.memberId)
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
          sort: {selector: "bookingDateTime", desc: 1}
        }
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
            },
            {
                location: 'after',
                widget: 'dxButton',
                options: {
                    icon: 'plus',
                    onClick: this.addBooking.bind(this)
                }
            },
            {
                location: 'after',
                widget: 'dxButton',
                options: {
                    icon: 'message',
                    onClick: this.sendNotification.bind(this)
                }
            });
   
    }

    refreshList() {
        this.bookingDataGrid.instance.refresh();
    }

    sendNotification() {
        if (this.selectedRows == null || this.selectedRows.length == 0) {
            swal(
                'No bookings selected',
                'Please select bookings to send too.',
                'error'
            );
            return;
         }
         const modalRef = this.modalService.open(NotificationModalComponent, { size: 'lg', container: 'nb-layout' });
         modalRef.componentInstance.classBookingIds = this.selectedRows;
         
         modalRef.result.then((result) => {
             if (!result)
             {
                 swal(
                     'Sending Notification Failed',
                     'Please check your internet connection and try again.',
                     'error'
                 )
             }
         }).catch((error) => {
         
         });
    }
    questionnaire(id) {
         const modalRef = this.modalService.open(BookingQuestionnaireModalComponent, { size: 'lg', container: 'nb-layout' });
         modalRef.componentInstance.id = id;
         
         modalRef.result.then((result) => {
            this.refreshList();
         }).catch((error) => {
         
         });
    }
     checkIn(id) {
        this.classBookingService.classBookingPutCheckInClassBooking(id).toPromise().then(result => {
               this.refreshList();
        });
    }

    addBooking()
    {
        if ( this.classEventId == null){
              swal(
                     'Cannot add booking to member.',
                     'Please select the event in the calendar and book the member there.',
                     'error'
                 )
                return;
        }

         const modalRef = this.modalService.open(BookingManageModalComponent, { size: 'lg', container: 'nb-layout' });
         console.log(this.classEventId);
         modalRef.componentInstance.classEventId = this.classEventId;
         
         modalRef.result.then((result) => {
            this.refreshList();
         }).catch((error) => {
         
         });
    }

    cancelBooking(id) {
        swal({
            title: "Are you sure?",
            text: "This will cancel the booking for the user.",
            type: 'warning',
            showConfirmButton: true,
            showCancelButton: true
        })
            .then((willDelete) => {
                if (willDelete.value) {
                    this.classBookingService.classBookingPutCancelClassBooking(id).toPromise()
                        .then(result => {

                            swal(
                                'Booking Cancelled',
                                'The booking has been cancelled.',
                                'success'
                            );
                            this.refreshList();

                        }, error => {
                            swal(
                                'Cancel Failed',
                                error.resultMessage,
                                'error'
                            );

                        });
                }



            });

    }

}
