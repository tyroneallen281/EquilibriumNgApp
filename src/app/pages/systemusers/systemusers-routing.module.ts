import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemUsersComponent } from './systemusers.component';
import { SystemUsersTableComponent } from './systemuser-table/systemuser-table.component';
import { SystemUsersStatsComponent } from './systemuser-stats/systemuser-stats.component';
import { SystemUserCreateComponent } from './systemuser-create/systemuser-create.component';
import { SystemUserManageComponent } from './systemuser-manage/systemuser-manage.component';
import { SystemUserDetailsComponent } from './systemuser-details/systemuser-details.component';
const routes: Routes = [{
  path: '',
  component: SystemUsersComponent,
  children: [{
    path: 'systemuser-table',
    component: SystemUsersTableComponent,
  },
    {
      path: 'systemuser-stats',
      component: SystemUsersStatsComponent,
    },
    {
      path: 'systemuser-create',
      component: SystemUserCreateComponent,
    },
    {
      path: 'systemuser-manage',
      component: SystemUserManageComponent,
    }, {
      path: 'systemuser-details',
      component: SystemUserDetailsComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemUsersRoutingModule { }

export const routedComponents = [
  SystemUsersComponent,
  SystemUsersTableComponent,
  SystemUsersStatsComponent,
  SystemUserCreateComponent,
  SystemUserManageComponent,
  SystemUserDetailsComponent
];
