import { Component, OnInit, Inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassService, ClassModel } from '@angular-baobab/rx-client-api';
import { RouterModule, Router, Routes, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { MapModalComponent } from '../../../@theme/components';
import swal from 'sweetalert2';
import {
    ClassManageComponent
}
    from "../../../@theme/product-components";

@Component({
  selector: 'ngx-class-details',
  templateUrl: './class-details.component.html',
    styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit {
  public id: number;
    public classModel: ClassModel = new ClassModel;
  public urlSafe: SafeResourceUrl;
  constructor(private router: Router,
    private route: ActivatedRoute,
      private classService: ClassService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
   this.route
      .queryParams
      .subscribe(params => {
        this.id = params['id'] || "";
          this.refreshClass();
      });
  }

    refreshClass() {
        this.classService.classGet2(this.id).subscribe(res => {
            this.classModel = res;
        });
    }

  manageClass() {
      const modalRef = this.modalService.open(ClassManageComponent, { size: 'lg', container: 'nb-layout' });
      modalRef.componentInstance.id = this.id;
      modalRef.result.then((result) => {
        if (result) {
            this.refreshClass();
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
            text: "This will remove scheduled lessons. Lessons with booking will be kept.",
            type: 'warning',
            showConfirmButton: true,
            showCancelButton: true
        })
            .then((willDelete) => {

                if (willDelete.value) {
                    this.classService.classDelete(this.id).subscribe(res => {
                        swal(
                            'Class Delete',
                            'The class has been deleted.',
                            'success'
                        );
                        this.router.navigate(['pages/schedule/class-table']);

                    });
                }

             
            });
        
    }
 

}
