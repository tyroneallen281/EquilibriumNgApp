import { Component,Renderer, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router, Routes, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberService, MemberModel } from '@angular-baobab/rx-client-api';
import CustomStore from "devextreme/data/custom_store";
import swal from 'sweetalert2';
import { DxDataGridComponent } from 'devextreme-angular';
import {
    FacilitySelectedService,
} from "../../../@core/utils";
import {
        MemberManageComponent
    }
    from "../../../@theme/product-components/member-ui/member-manage/member-manage.component";
import {
        MemberImportComponent
    }
    from "../../../@theme/product-components/member-ui/member-import/member-import.component";


@Component({
  selector: 'ngx-member-table',
  templateUrl: './member-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class MemberTableComponent {
  facilityId: number;
  haspackage: boolean;

  constructor(http: HttpClient,
    renderer: Renderer,
      private router: Router,
      private route: ActivatedRoute,
    private modalService: NgbModal,
    public memberService: MemberService,
    public facilitySelectedService: FacilitySelectedService) {
    console.log("member");
    facilitySelectedService.facilityId.subscribe((facilityId: number) => {
        this.facilityId = facilityId;
       
    });
  
  }
 
    ngOnInit() {
        this.route
            .queryParams
            .subscribe(params => {
                this.haspackage = params['haspackage'] || null;
                console.log("haspackage", this.haspackage);
            });
    }

  public createMember() {

    const modalRef = this.modalService.open(MemberManageComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.id = null;
     modalRef.componentInstance.facilityId = this.facilityId;
       modalRef.result.then((result) => {
        if (result) {

        } else {
          swal(
            'Member Create Failed',
            'Please check your internet connection and try again.',
            'error'
          )
        }
      }).catch((error) => {

      });
    
  }


  public importMember() {

    const modalRef = this.modalService.open(MemberImportComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.facilityId = this.facilityId;
       modalRef.result.then((result) => {
       
      }).catch((error) => {

      });
    
  }

}
