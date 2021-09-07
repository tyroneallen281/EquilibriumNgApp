import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsComponent } from './reports.component';
import { ReportsTableComponent } from './reports-table/reports-table.component';
const routes: Routes = [{
  path: '',
  component: ReportsComponent,
  children: [{
    path: 'reports-table',
    component: ReportsTableComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule { }

export const routedComponents = [
  ReportsComponent,
  ReportsTableComponent,
];
