import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacilityComponent } from './facility.component';
import { StatementTableComponent } from './statement-table/statement-table.component';
import { FacilityTableComponent } from './facility-table/facility-table.component';
import { FacilityManageComponent } from './facility-manage/facility-manage.component';
import { FacilityDetailsComponent } from './facility-details/facility-details.component';
const routes: Routes = [{
    path: '',
    component:  FacilityComponent,
    children: [{
            path: 'facility-table',
            component:  FacilityTableComponent,
        },
        {
            path: 'facility-manage',
            component: FacilityManageComponent,
        },
        {
            path: 'facility-details',
            component:  FacilityDetailsComponent,
        }, {
            path: 'statement-table',
            component:  StatementTableComponent,
        }],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FacilityRoutingModule { }

export const routedComponents = [
    FacilityComponent,
    FacilityTableComponent,
    FacilityManageComponent,
    FacilityDetailsComponent,
    StatementTableComponent
];