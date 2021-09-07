import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    }, {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    }, {
        path: 'facility',
        loadChildren: './facility/facility.module#FacilityModule',
    }, {
        path: 'schedule',
        loadChildren: './schedule/schedule.module#ScheduleModule',
    }, {
        path: 'package',
        loadChildren: './package/package.module#PackageModule',
    }, {
        path: 'staff',
        loadChildren: './staff/staff.module#StaffModule',
    }, {
        path: 'member',
        loadChildren: './member/member.module#MemberModule',
    }, {
      path: 'reports',
      loadChildren: './reports/reports.module#ReportsModule',
    }, {
      path: 'email',
      loadChildren: './email/email.module#EmailModule',
    }, {
      path: 'systemusers',
      loadChildren: './systemusers/systemusers.module#SystemUsersModule',
    }, {
          path: 'manage',
          loadChildren: './manage/manage.module#ManageModule',
      }, {
      path: '**',
      component: NotFoundComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
