import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  StaffComponent } from './staff.component';
import {  StaffTableComponent } from './staff-table/staff-table.component';
import {  StaffManageComponent } from './staff-manage/staff-manage.component';
import {  StaffDetailsComponent } from './staff-details/staff-details.component';
const routes: Routes = [{
  path: '',
  component:   StaffComponent,
  children: [{
    path: 'staff-table',
    component:   StaffTableComponent,
  },
  {
    path: 'staff-manage',
    component: StaffManageComponent,
    },
    {
      path: 'staff-details',
      component:   StaffDetailsComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class  StaffRoutingModule { }

export const routedComponents = [
   StaffComponent,
   StaffTableComponent,
   StaffManageComponent,
   StaffDetailsComponent
];
