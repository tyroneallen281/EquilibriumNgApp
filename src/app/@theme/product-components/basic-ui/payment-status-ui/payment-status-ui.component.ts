import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-payment-status-ui',
  templateUrl: './payment-status-ui.component.html',
  styleUrls: ['./payment-status-ui.component.scss']
})
export class PaymentStatusUiComponent implements OnInit {
  @Input() paymentStatus: number;

  classListDataSource = [];

  constructor() {

}
 
  ngOnInit() {
  
  }


}
