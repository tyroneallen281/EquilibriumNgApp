import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService, SendNotificationModel } from '@angular-baobab/rx-client-api';
import "rxjs/add/operator/toPromise";
import { Subject, Observable, of, concat } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import {
    FacilitySelectedService,
} from "../../../@core/utils";

@Component({
  selector: 'ngx-notification-modal',
    templateUrl: './notification-modal.component.html',
    styleUrls: ['./notification-modal.component.scss']
})
export class NotificationModalComponent implements OnInit {
    @Input() accountIds : string[];
    @Input() memberIds : number[];
    @Input() classBookingIds : number[];
    private facilityId : number;
     public sendNotificationModel: SendNotificationModel = new SendNotificationModel();
    submitPromise: Promise<any>;

    constructor(public activeModal: NgbActiveModal,
        public notificationService: NotificationService,
        public facilitySelectedService: FacilitySelectedService) {

       facilitySelectedService.facilityId.subscribe((facilityId: number) => {
           this.facilityId = facilityId;
          
           
       });
    }

    ngOnInit() {
     
    }

    ngOnChanges(changes: SimpleChanges) {
     
    }

    onSubmit() {
        var self = this;
        this.sendNotificationModel.facilityId = this.facilityId;
        this.sendNotificationModel.accountIds = this.accountIds;
        this.sendNotificationModel.memberIds = this.memberIds;
        this.sendNotificationModel.bookingIds = this.classBookingIds;
         console.log(this.sendNotificationModel);
        this.submitPromise = this.notificationService.notificationSendNotifications(this.sendNotificationModel)
            .toPromise().then(res => {
                if (res){
                      this.activeModal.close(1);
                    swal(
                          'Notifications Sent',
                          '',
                          'success'
                        )
                }else{
                      swal(
                          'Notification Failed',
                          '',
                          'error'
                        )
                }
          }, error => this.activeModal.close(0));/**/
  }

}
