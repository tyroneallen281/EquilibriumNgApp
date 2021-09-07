import { Component, OnInit, Inject, Input } from '@angular/core';
import { Location } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberPackageService, MemberPackageModel } from '@angular-baobab/rx-client-api';
import { RouterModule, Router, Routes, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';
import { MapModalComponent } from '../../../@theme/components';
import { MemberPackageUpdateComponent } from  '../../../@theme/product-components';
import swal from 'sweetalert2';

@Component({
  selector: 'ngx-member-package-details',
  templateUrl: './member-package-details.component.html',
  styleUrls: ['./member-package-details.component.scss']
})
export class MemberPackageDetailsComponent implements OnInit {
  public id: number;
  public memberPackageModel: MemberPackageModel = new MemberPackageModel;
  public urlSafe: SafeResourceUrl;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private memberPackageService: MemberPackageService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private location: Location
  ) { }

  ngOnInit() {
   this.route
      .queryParams
      .subscribe(params => {
        this.id = params['id'] || "";
          this.refreshMemberPackage();
      });
  }

  refreshMemberPackage() {
        this.memberPackageService.memberPackageGet(this.id).subscribe(res => {
      console.log(res);
      this.memberPackageModel = res;

    });
  }

  manageMemberPackage() {
        const modalRef = this.modalService.open(MemberPackageUpdateComponent, { size: 'lg', container: 'nb-layout' });
        modalRef.componentInstance.id = this.id;
         modalRef.result.then((result) => {
            if (result) {
               
                this.refreshMemberPackage();
            } else {
                swal(
                    'Package Edit Failed',
                    '',
                    'error'
                )
            }
        }).catch((error) => {

       });
    
  }

  cancelMemberPackage() {
        swal({
            title: "Are you sure?",
            text: "This will stop the member from booking. You can activate it again when needed.",
            type: 'warning',
            showConfirmButton: true,
            showCancelButton: true
        })
            .then((willDelete) => {

                if (willDelete.value) {
                    this.memberPackageService.memberPackageCancel(this.id).subscribe(res => {
                        this.refreshMemberPackage();
                        swal(
                            'Package Deactivated',
                            'Package Deactivated, members can no longer book on this package. Current bookings will be still be honoured.',
                            'success'
                        );
                        
                    });
                }

             
            });
        
    }
activateMemberPackage() {
        swal({
            title: "Are you sure? Will only activate if periods are availible ot use.",
            text: "This will allow a member to book if the Pacakge Period currently activate is paid or awaiting payment.",
            type: 'warning',
            showConfirmButton: true,
            showCancelButton: true
        })
            .then((willDelete) => {

                if (willDelete.value) {
                    this.memberPackageService.memberPackageActivate(this.id).subscribe(result => {
                        this.refreshMemberPackage();
                        if (result.result) {
                            swal(
                                'Package Activated, ',
                                'Member can book if the Pacakge Period currently activate is paid or awaiting payment.',
                                'success'
                            );

                        } else {
                            swal(
                                'Error saving',
                                result.resultMessage,
                                'error'
                            );

                        }
                    });
                }
            });
    }
 
   deleteMemberPackage() {
        swal({
            title: "Are you sure?",
            text: "This will stop the user from using this package and cannot be undone.",
            type: 'warning',
            showConfirmButton: true,
            showCancelButton: true
        })
            .then((willDelete) => {
                if (willDelete.value) {
                    this.memberPackageService.memberPackageDelete(this.id).toPromise()
                        .then(result => {

                            swal(
                                'Member Package Deleted.',
                                '',
                                'success'
                            );
                             this.location.back();

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
