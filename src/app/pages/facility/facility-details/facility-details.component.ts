import { Component, OnInit, Inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FacilityService, FacilityModel } from '@angular-baobab/rx-client-api';
import { RouterModule, Router, Routes, ActivatedRoute } from '@angular/router';
import { FacilityManageComponent } from '../facility-manage/facility-manage.component';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';
import { MapModalComponent } from '../../../@theme/components';
import swal from 'sweetalert2';
import {
        FacilityContactManageComponent
    }
    from "../../../@theme/product-components";

@Component({
  selector: 'ngx-facility-details',
  templateUrl: './facility-details.component.html',
  styleUrls: ['./facility-details.component.scss']
})
export class FacilityDetailsComponent implements OnInit {
  public id: number;
  public  facilityModel:  FacilityModel = new  FacilityModel;
  public urlSafe: SafeResourceUrl;
  private netCahsIntegrationStatus = "";
  private netCahsIntegrationText = "";

  constructor(private router: Router,
    private route: ActivatedRoute,
    private facilityService:  FacilityService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
   this.route
       .queryParams
       .subscribe(params => {
         this.id = params['id'] || "";
         this.refreshFacility();
       });
  }

  refreshFacility () {
     this.facilityService.facilityGet2(this.id).subscribe(res => {
      console.log(res);
      this.facilityModel = res;

    });
  }
  manageFacility() {
    const modalRef = this.modalService.open(FacilityManageComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.id = this.id;
    modalRef.result.then((result) => {
      if (result) {
        this.refreshFacility();
      } else {
        swal(
          'Facility Edit Failed',
          'Please check your internet connection and try again.',
          'error'
        )
      }
    }).catch((error) => {

    });
  }

 manageFacilityContractText() {
    const modalRef = this.modalService.open(FacilityContactManageComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.id = this.id;
    modalRef.result.then((result) => {
     
    }).catch((error) => {

    });
  }


  integrationUpdate($event){
    if (!$event){
        this.netCahsIntegrationStatus = "danger";
        this.netCahsIntegrationText = "Error";
    }else{
        this.netCahsIntegrationStatus = "success";
        this.netCahsIntegrationText = "Active";
    }
        console.log("statusEvent", $event);
  }

     publishFacility() {
        swal({
            title: "Are you sure?",
            text: "This will make your facility visible on the App, please ensure you classes are setup and correct.",
            type: 'warning',
            showConfirmButton: true,
            showCancelButton: true
        })
            .then((willDelete) => {
                if (willDelete.value) {
                    this.facilityService.facilityPutPublish(this.id).toPromise()
                        .then(result => {

                            swal(
                                'Facility Published',
                                '',
                                'success'
                            );
                            this.refreshFacility();

                        }, error => {
                            swal(
                                'Publish Failed',
                                error.resultMessage,
                                'error'
                            );

                        });
                }



            });

    }

 unPublishFacility() {
        swal({
            title: "Are you sure?",
            text: "This will remove the facility from the App.",
            type: 'warning',
            showConfirmButton: true,
            showCancelButton: true
        })
            .then((willDelete) => {
                if (willDelete.value) {
                    this.facilityService.facilityPutPublish(this.id).toPromise()
                        .then(result => {

                            swal(
                                'Facility removed from app.',
                                '',
                                'success'
                            );
                            this.refreshFacility();

                        }, error => {
                            swal(
                                'Unpublished Failed',
                                error.resultMessage,
                                'error'
                            );

                        });
                }



            });

    }
}
