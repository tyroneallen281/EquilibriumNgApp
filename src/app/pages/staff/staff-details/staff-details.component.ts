import { Component, OnInit, Inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StaffService, StaffModel } from '@angular-baobab/rx-client-api';
import { RouterModule, Router, Routes, ActivatedRoute } from '@angular/router';
import { StaffManageComponent } from '../Staff-manage/staff-manage.component';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import swal from 'sweetalert2';
import {
    FacilitySelectedService,
} from "../../../@core/utils";
@Component({
  selector: 'ngx-Staff-details',
  templateUrl: './Staff-details.component.html',
  styleUrls: ['./Staff-details.component.scss']
})
export class  StaffDetailsComponent implements OnInit {
  public id: number;
  public facilityId: number;
  public staffModel: StaffModel = new StaffModel;
  public urlSafe: SafeResourceUrl;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private staffService: StaffService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
   public facilitySelectedService: FacilitySelectedService) {
     
      facilitySelectedService.facilityId.subscribe((facilityId: number) => {
          this.facilityId = facilityId;
          console.log("Facility Staff  Change");
      });
      }

  ngOnInit() {
   this.route
      .queryParams
      .subscribe(params => {
        this.id = params['id'] || "";
        this.refreshStaff();
      });
  }

  refreshStaff () {
     this.staffService.staffGet2(this.id).subscribe(res => {
      console.log(res);
      this.staffModel = res;

    });
  }
  manageStaff() {
    const modalRef = this.modalService.open(StaffManageComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.id = this.id;
    modalRef.result.then((result) => {
      if (result) {
        this.refreshStaff();
      } else {
        swal(
          'Staff Edit Failed',
          'Please check your internet connection and try again.',
          'error'
        )
      }
    }).catch((error) => {

    });
  }
}
