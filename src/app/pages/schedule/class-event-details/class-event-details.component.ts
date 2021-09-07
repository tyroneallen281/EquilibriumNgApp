import { Component, OnInit, Inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarService, ClassEventModel } from '@angular-baobab/rx-client-api';
import { RouterModule, Router, Routes, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { MapModalComponent } from '../../../@theme/components';
import swal from 'sweetalert2';
import {
    ClassEventManageComponent
}
    from "../../../@theme/product-components";

@Component({
  selector: 'ngx-class-event-details',
  templateUrl: './class-event-details.component.html',
    styleUrls: ['./class-event-details.component.scss']
})
export class ClassEventDetailsComponent implements OnInit {
  public id: number;
    public classEventModel: ClassEventModel = new ClassEventModel;
  public urlSafe: SafeResourceUrl;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private calendarService: CalendarService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
   this.route
      .queryParams
      .subscribe(params => {
        this.id = params['id'] || "";
          this.refreshClassEvent();
      });
  }

    refreshClassEvent() {
        this.calendarService.calendarGet(this.id).subscribe(res => {
            console.log(res);
            this.classEventModel = res;
        });
    }

  manageClass() {
      const modalRef = this.modalService.open(ClassEventManageComponent, { size: 'lg', container: 'nb-layout' });
      modalRef.componentInstance.id = this.id;
      modalRef.result.then((result) => {
        if (result) {
            this.refreshClassEvent();
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
    
    deleteClass() {
        swal({
            title: "Are you sure?",
            text: "You can undo this, events with bookings can't be cancelled.",
            type: 'warning',
            showConfirmButton: true,
            showCancelButton: true
        })
            .then((willDelete) => {
                 if (willDelete.value) {
                    this.calendarService.calendarPutCancel(this.id).toPromise()
            .       then(result => {
                       
                        swal(
                            'Class Cancelled',
                            'The class has been cancelled.',
                            'success'
                        );
                        this.refreshClassEvent();

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
 
 
    activateClass() {
        swal({
            title: "Are you sure?",
            text: "Users will be able to book class again.",
            type: 'warning',
            showConfirmButton: true,
            showCancelButton: true
        })
            .then((willDelete) => {
                 if (willDelete.value) {
                    this.calendarService.calendarPutUnCancel(this.id).toPromise()
            .       then(result => {
                       
                        swal(
                            'Class Activated',
                            'The class has been cancelled.',
                            'success'
                        );
                         this.refreshClassEvent();

                     }, error => {
                        swal(
                        'Activate Failed Failed',
                        error.resultMessage,
                        'error'
                        );
        
                    });
                }

               
             
            });
        
    }
 
}
