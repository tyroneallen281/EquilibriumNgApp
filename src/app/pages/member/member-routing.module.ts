import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberComponent } from './member.component';
import { MemberTableComponent } from './member-table/member-table.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MemberPackageDetailsComponent } from './member-package-details/member-package-details.component';
const routes: Routes = [{
  path: '',
  component:  MemberComponent,
  children: [{
    path: 'member-table',
    component:  MemberTableComponent,
  }, {
      path: 'member-details',
      component:  MemberDetailsComponent,
    }, {
      path: 'member-package-details',
      component:  MemberPackageDetailsComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberRoutingModule { }

export const routedComponents = [
  MemberComponent,
  MemberTableComponent,
  MemberDetailsComponent,
  MemberPackageDetailsComponent
];
