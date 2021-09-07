import { Component, OnInit, Inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PackageService, PackageModel } from '@angular-baobab/rx-client-api';
import { RouterModule, Router, Routes, ActivatedRoute } from '@angular/router';
import { PackageManageComponent } from '../package-manage/package-manage.component';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import swal from 'sweetalert2';

@Component({
  selector: 'ngx-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.scss']
})
export class PackageDetailsComponent implements OnInit {
  public id: number;
  public packageModel: PackageModel = new PackageModel;
  public urlSafe: SafeResourceUrl;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private packageService: PackageService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
   this.route
      .queryParams
      .subscribe(params => {
        this.id = params['id'] || "";
        this.refreshPackage();
      });
  }

  refreshPackage () {
      this.packageService.packageGet2(this.id).subscribe(res => {
      console.log(res);
      this.packageModel = res;

    });
  }
  managePackage() {
    const modalRef = this.modalService.open(PackageManageComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.id = this.id;
    modalRef.result.then((result) => {
      if (result) {
        this.refreshPackage();
      } else {
        swal(
          'Package Edit Failed',
          'Please check your internet connection and try again.',
          'error'
        )
      }
    }).catch((error) => {

    });
  }

  
    deletePackage() {
        swal({
            title: "Are you sure?",
            text: "This will remove the ability to buy this package, users with this package will still be able to use them until you terminate them.",
            type: 'warning',
            showConfirmButton: true,
            showCancelButton: true
        })
            .then((willDelete) => {

                if (willDelete.value) {
                    this.packageService.packageDelete(this.id).subscribe(res => {
                        swal(
                            'Package Delete',
                            'The package has been deleted, user with the package will still be allowed to book.',
                            'success'
                        );
                        this.router.navigate(['pages/package/package-table']);

                    });
                }

             
            });
        
    }

}
