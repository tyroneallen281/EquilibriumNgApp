import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'ngx-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss']
})
export class MapModalComponent implements OnInit {
  @Input() title: string;
  @Input() markerSelectEnabled: boolean;
  @Input() lat: number;
  @Input() lng: number;
  @Output() mapClickLng = new EventEmitter();
  @Output() mapClickLat = new EventEmitter();

  
 
  constructor(public activeModal: NgbActiveModal) {

  }

  ngOnInit() {
    console.log(this.lat, this.lng);
  }
  ngOnChanges(changes: SimpleChanges) {
   
  }
 
}
