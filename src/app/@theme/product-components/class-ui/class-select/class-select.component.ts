import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ClassService, ClassModel }
  from '@angular-baobab/rx-client-api';
import { Observable } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DxTreeListModule, DxCheckBoxModule, DxTreeListComponent } from 'devextreme-angular';
import DataSource from "devextreme/data/data_source";
import "rxjs/add/operator/toPromise";
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-class-select',
  templateUrl: './class-select.component.html',
  styleUrls: ['./class-select.component.scss']
})
export class ClassSelectComponent implements OnInit {
    @Output() classChange = new EventEmitter<any>();
    @Input() facilityId: number;
    classModels: ClassModel[];
    @Input() class = [];
    dropdownSettings = {};

    constructor(
        public classService: ClassService) {

    }

    ngOnInit() {
        this.getClass();
    }
    ngOnChanges(changes: SimpleChanges) {
        this.getClass();
    }
    getClass() {

        console.log("Change Facility =" + this.facilityId);
        var self = this;
        self.classService.classGetAll().toPromise()
            .then(result => {
                console.log(result);
                this.classModels = result;
            });
    }
    updateClass() {
        this.classChange.emit(this.class);
        console.log(this.class);
    }


}
