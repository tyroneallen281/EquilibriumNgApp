import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PackageComponent } from './package.component';
import { PackageTableComponent } from './package-table/package-table.component';
import { PackageManageComponent } from './package-manage/package-manage.component';
import { PackageDetailsComponent } from './package-details/package-details.component';
const routes: Routes = [{
  path: '',
  component:  PackageComponent,
  children: [{
    path: 'package-table',
    component:  PackageTableComponent,
  },
  {
    path: 'package-manage',
    component: PackageManageComponent,
    },
    {
      path: 'package-details',
      component:  PackageDetailsComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackageRoutingModule { }

export const routedComponents = [
    PackageComponent,
  PackageTableComponent,
  PackageManageComponent,
  PackageDetailsComponent
];
