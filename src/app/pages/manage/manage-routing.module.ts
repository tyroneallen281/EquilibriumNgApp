import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageComponent } from './manage.component';
import { HelpComponent } from './help/help.component';
const routes: Routes = [{
  path: '',
  component: ManageComponent,
  children: [{
    path: 'help',
    component: HelpComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageRoutingModule { }

export const routedComponents = [
  ManageComponent,
  HelpComponent,
];
