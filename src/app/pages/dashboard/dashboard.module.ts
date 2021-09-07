import { NgModule } from '@angular/core';
import { PagesRoutingModule } from '../pages-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';

import { NbButtonModule, NbActionsModule, NbTabsetModule} from '@nebular/theme';

@NgModule({
  imports: [
    ThemeModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NgxEchartsModule,
    PagesRoutingModule,
  ],
  declarations: [
    DashboardComponent,
   
  ],
})
export class DashboardModule { }
