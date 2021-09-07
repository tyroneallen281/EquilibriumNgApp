import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleComponent } from './schedule.component';
import { ScheduleTableComponent } from './schedule-table/schedule-table.component';
import { ClassTableComponent } from './class-table/class-table.component';
import { ClassDetailsComponent } from './class-details/class-details.component';
import { ClassEventDetailsComponent } from './class-event-details/class-event-details.component';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { TrainingSessionManageComponent } from './pt-session-manage/pt-session-manage.component';
const routes: Routes = [{
  path: '',
  component:  ScheduleComponent,
  children: [{
          path: 'calendar',
          component:  CalendarPageComponent,
      },{
        path: 'schedule-table',
        component:  ScheduleTableComponent,
    },
    {
        path: 'class-table',
        component: ClassTableComponent,
    },
    {
        path: 'class-details',
        component: ClassDetailsComponent,
      },
    {
        path: 'class-event-details',
        component: ClassEventDetailsComponent,
      },
      {
          path: 'pt-session-manage',
          component: TrainingSessionManageComponent,
      }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleRoutingModule { }

export const routedComponents = [
  ScheduleComponent,
    ScheduleTableComponent,
    ClassTableComponent,
    ClassDetailsComponent,
    ClassEventDetailsComponent,
  CalendarPageComponent,
  TrainingSessionManageComponent
];
