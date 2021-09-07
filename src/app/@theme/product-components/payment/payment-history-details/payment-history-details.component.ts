import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PayService, PaymentHistoryModel } from '@angular-baobab/rx-client-api';
import { PaymentHistoryManageModalComponent } from '../payment-history-manage-modal/payment-history-manage-modal.component';
import "rxjs/add/operator/toPromise";
import swal from 'sweetalert2';

@Component({
  selector: 'ngx-payment-history-details',
  templateUrl: './payment-history-details.component.html',
  styleUrls: ['./payment-history-details.component.scss']
})
export class PaymentHistoryDetailsComponent implements OnInit {
  @Input() id: number;
  @Input() paymentHistoryModel : PaymentHistoryModel = new PaymentHistoryModel();
  @Output() refresPaymentHistory : EventEmitter<number> = new EventEmitter<number>();
constructor(
     private modalService: NgbModal,
    public payService: PayService) {

}
ngOnInit() {
  this.refreshData();
 }
  ngOnChanges(changes: SimpleChanges) {

  }


  refreshData(){
        if (this.id != null){
             this.payService.payGet(this.id).subscribe(res => {
                console.log(res);
                this.paymentHistoryModel = res;
                }, error => console.log(error));
        }else if(this.paymentHistoryModel != null){
            this.id =  this.paymentHistoryModel.paymentHistoryId;
        }
        this.refresPaymentHistory.emit(1);
    }

    managePaymentHistory(){
        const modalRef = this.modalService.open(PaymentHistoryManageModalComponent, { size: 'lg', container: 'nb-layout' });
        modalRef.componentInstance.paymentHistoryId = this.paymentHistoryModel.paymentHistoryId;
         modalRef.result.then((result) => {
            if (result) {
               
                this.refreshData();
            } else {
                swal(
                    'Payment Edit Failed',
                    '',
                    'error'
                )
            }
        }).catch((error) => {

        });
    }
}
