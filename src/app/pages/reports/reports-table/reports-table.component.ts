import { Component,Renderer } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'ngx-reports-table',
  templateUrl: './reports-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class ReportsTableComponent {

  
  constructor(http: HttpClient,
    renderer: Renderer,
    private modalService: NgbModal) {

  }

}
