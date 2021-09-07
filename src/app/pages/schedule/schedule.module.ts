import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ThemeModule } from '../../@theme/theme.module';
import { ScheduleRoutingModule, routedComponents } from './schedule-routing.module';
import { GenericTableModule } from '@angular-generic-table/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { NgSelectModule } from '@ng-select/ng-select';
import { DxDataGridModule } from 'devextreme-angular';

@NgModule({
  imports: [
    ThemeModule,
    ScheduleRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    NgSelectModule,
    DxDataGridModule,
    
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [],
})
export class  ScheduleModule { }
