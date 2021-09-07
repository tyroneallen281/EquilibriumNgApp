import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import {  MemberService,  MemberModel }
  from '@angular-baobab/rx-client-api';
import { Observable } from 'rxjs';
import CustomStore from "devextreme/data/custom_store";
import "rxjs/add/operator/toPromise";
import DataSource from "devextreme/data/data_source";
import { Router } from '@angular/router';
import {
    FacilitySelectedService,
} from "../../../../@core/utils";

@Component({
  selector: 'ngx-member-select',
    templateUrl: './member-select.component.html',
    styleUrls: ['./member-select.component.scss']
})
export class MemberSelectComponent implements OnInit {
   @Output() memberIdChange = new EventEmitter<number>();
   @Output() memberChange = new EventEmitter<any>();
   @Input() memberId: number;
   facilityId: number;
    dataSource = {};
  constructor(
      public memberService: MemberService,
      public facilitySelectedService: FacilitySelectedService) {
            facilitySelectedService.facilityId.subscribe((facilityId: number) => {
               this.facilityId = facilityId;
            });
    }

  ngOnInit() {
      this.getMemberSource();
  }

  ngOnChanges(changes: SimpleChanges) {
     
  } 

    getDisplayExpr(item) {
        if(!item) {
            return "";
        }
        
        return item.firstName + " " + item.lastName +"("+item.fullContactNumber+")";
   }

    getMemberSource() {
        this.dataSource = {
            store: new CustomStore({
                key: "memberId",
                load: (loadOptions) => {
                    console.log("getMemberSourceStart", loadOptions);
                    return this.memberService.memberGet(loadOptions.searchValue, null, null, 0, 20,this.facilityId)
                        .toPromise()
                        .then(result => {
                            console.log("getMemberSource",result);
                            return {
                                data: result.items || [],
                                totalCount: result.totalCount
                            }
                        });
                }
            }),
            sort: "memberId"
        }
    }

 
  updateMember(e) {
      console.log(e.value);
      this.memberIdChange.emit(e.value.memberId);
      this.memberChange.emit(e.value);
     
  }
  

}
