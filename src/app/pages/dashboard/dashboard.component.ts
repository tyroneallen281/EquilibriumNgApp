import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile';
import {  DashboardService,  FilterDashboardModel, DashboardModel}
  from '@angular-baobab/rx-client-api';


import {
    FacilitySelectedService,
} from "../../@core/utils";

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  private filterDashboardModel : FilterDashboardModel = new FilterDashboardModel;
  private dashboardModel : DashboardModel = new DashboardModel;
  public dateRange = { };

  constructor(private themeService: NbThemeService,
    private dashboardService: DashboardService,
     public facilitySelectedService: FacilitySelectedService) {
        facilitySelectedService.facilityId.subscribe((facilityId: number) => {
            this.filterDashboardModel.facilityId = facilityId;
            this.refreshDashboard();
        });
  }

  ngOnInit() {
     var self = this;
     let date = new Date();
     this.filterDashboardModel.startDate = new Date(date.getFullYear(), date.getMonth(), 1);
     this.filterDashboardModel.endDate = new Date(date.getFullYear(), date.getMonth(),  date.getDate(),23,59);
     this.dateRange =   { start: this.filterDashboardModel.startDate, end:this.filterDashboardModel.endDate }; 
     console.log("dashboard",this.filterDashboardModel);
     this.refreshDashboard();
    }

  dateRangeChange(val) {

    this.filterDashboardModel.startDate = val.start;
    this.filterDashboardModel.endDate = val.end;
    this.refreshDashboard();
     console.log(this.filterDashboardModel);
  }

    refreshDashboard() {
           console.log(JSON.stringify(this.filterDashboardModel));   
          this.dashboardService.dashboardPostBaseData(this.filterDashboardModel).subscribe(res => {
           console.log(res);
           this.dashboardModel = res;

         });

  }
}
