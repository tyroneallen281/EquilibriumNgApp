import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  PayService, PaymentHistoryModel } from '@angular-baobab/rx-client-api';
import "rxjs/add/operator/toPromise";
import { Subject, Observable, of, concat } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
@Component({
  selector: 'ngx-payment-history-manage-modal',
    templateUrl: './payment-history-manage-modal.component.html',
    styleUrls: ['./payment-history-manage-modal.component.scss']
})
export class PaymentHistoryManageModalComponent implements OnInit {
    @Input() paymentHistoryId: number;
    public paymentHistoryModel: PaymentHistoryModel = new PaymentHistoryModel();
    public categoryList = [];
    submitPromise: Promise<any>;

    constructor(public activeModal: NgbActiveModal,
        public payService: PayService) {

      
    }

    ngOnInit() {
        this.getPaymentHistory();
    }

    ngOnChanges(changes: SimpleChanges) {
     
    }

    getPaymentHistory(){
              console.log("paymentHistoryId",this.paymentHistoryId);
          this.payService.payGet(this.paymentHistoryId).subscribe(res => {
                    console.log(res);
                    this.paymentHistoryModel = res;
                }, error => console.log(error));
    }

    

    onSubmit() {
        var self = this;
        this.submitPromise =  this.payService.payPut(this.paymentHistoryModel)
            .toPromise().then(res => {
                if (res){
                      this.activeModal.close(1);
                    swal(
                          'Payment Edit Saved',
                          '',
                          'success'
                        )
                }else{
                      swal(
                          'Payment Edit Failed',
                          '',
                          'error'
                        )
                }
          }, error => this.activeModal.close(0));
  }

}
