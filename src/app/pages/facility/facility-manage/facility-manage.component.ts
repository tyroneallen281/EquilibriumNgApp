import { Component, OnInit, Inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FacilityService, FacilityModel, Facility } from '@angular-baobab/rx-client-api';
import { Subject, Observable, of, concat } from 'rxjs';
import { ImageCroppedEvent } from 'ngx-image-cropper';
@Component({
  selector: 'ngx-facility-create',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './facility-manage.component.html',
  styleUrls: ['./facility-manage.component.scss']
})
export class FacilityManageComponent implements OnInit {
  @Input() id: number;
  submitPromise: Promise<any>;
  private facilityModel: FacilityModel = new FacilityModel;
  private title = "Create Facility";
  imageChangedEvent: any = '';

  constructor(public activeModal: NgbActiveModal,
    public facilityService: FacilityService) {
  }

  ngOnInit() {
   
    if (this.id != null) {
      this.title = "Edit Facility";
      this.facilityService.facilityGet2(this.id).subscribe(result => {
         this.facilityModel = result;
      });
    }
   
  }

  
  onSubmit() {
     console.log(this.facilityModel);
    if (this.id == null) {

       /* this.submitPromise = this.facilityService.facilityPost(this.facilityModel).toPromise().then(result => {
            console.log(result);
            this.activeModal.close(1);
        }, error => console.log(error));*/
    } else {
        this.submitPromise = this.facilityService.facilityPut(this.facilityModel, this.id).toPromise().then(result => {
            console.log(result);
            this.activeModal.close(1);
        }, error => console.log(error));
    } 
  }
 
    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
      this.facilityModel.logoPathB64  = event.base64;
    }
    imageLoaded() {
        // show cropper
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }
}
