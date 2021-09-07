import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailComponent } from './email.component';
import { EmailTableComponent } from './email-table/email-table.component';
import { EmailDetailsComponent } from './email-details/email-details.component';
import { EmailCreateComponent } from './email-create/email-create.component';
const routes: Routes = [{
  path: '',
  component:  EmailComponent,
  children: [{
      path: 'email-table',
    component:   EmailTableComponent,
  },
    {
        path: 'email-details',
      component:  EmailDetailsComponent,
    },
    {
        path: 'email-create',
      component:  EmailCreateComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class  EmailRoutingModule { }

export const routedComponents = [
   EmailComponent,
   EmailTableComponent,
   EmailDetailsComponent,
   EmailCreateComponent
];
