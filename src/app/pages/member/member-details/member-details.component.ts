import { Component, OnInit, Inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberService, MemberModel, NotificationService, SendNotificationModel } from '@angular-baobab/rx-client-api';
import { RouterModule, Router, Routes, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';
import { MapModalComponent } from '../../../@theme/components';
import swal from 'sweetalert2';
import {
        MemberManageComponent
    }
    from "../../../@theme/product-components/member-ui/member-manage/member-manage.component";

@Component({
  selector: 'ngx-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {
  public id: number;
  public memberModel: MemberModel = new MemberModel;
  public urlSafe: SafeResourceUrl;
  submitPromise: Promise<any>;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private memberService: MemberService,
    private notificationService: NotificationService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
   this.route
      .queryParams
      .subscribe(params => {
        this.id = params['id'] || "";
          this.refreshMember();
      });
  }

    refreshMember() {
        this.memberService.memberGet2(this.id).subscribe(res => {
      console.log(res);
      this.memberModel = res;

    });
  }
  manageMember() {
    const modalRef = this.modalService.open(MemberManageComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.id = this.id;
    modalRef.result.then((result) => {
      if (result) {
          this.refreshMember();
      } else {
        swal(
          'Member Edit Failed',
          'Please check your internet connection and try again.',
          'error'
        )
      }
    }).catch((error) => {

    });
  }
    
  inviteApp(){
        var sendNotificationModel = new SendNotificationModel();
        sendNotificationModel.memberIds = [];
        sendNotificationModel.memberIds.push(this.id);
        sendNotificationModel.notificationType = 1;
        sendNotificationModel.message = "Please join the Equilibrium app, book your classes and manage your account. https://bit.ly/3dBG7ZR";
        this.submitPromise = this.notificationService.notificationSendNotifications(sendNotificationModel)
            .toPromise().then(res => {
                if (res){
                     
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
          }, error => 
            {
                        swal(
                          'Notification Failed',
                          '',
                          'error'
                        )
                });
 }

    deleteMember() {
        swal({
            title: "Are you sure?",
            text: "This will stop the user from access packages or bookings if any are present.",
            type: 'warning',
            showConfirmButton: true,
            showCancelButton: true
        })
            .then((willDelete) => {
                if (willDelete.value) {
                    this.memberService.memberDelete(this.id).toPromise()
                        .then(result => {

                            swal(
                                'Member Deleted.',
                                '',
                                'success'
                            );
                              this.router.navigate(['pages/member/member-table']);

                        }, error => {
                            swal(
                                'Member Delete Failed',
                                '',
                                'error'
                            );

                        });
                }



            });

    }
}
