import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ThemeModule } from '../../@theme/theme.module';
import { ReportsRoutingModule, routedComponents } from './reports-routing.module';
import { environment } from '../../../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NbButtonModule } from '@nebular/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas, far);

@NgModule({
  imports: [
    ThemeModule,
    ReportsRoutingModule,
    HttpClientModule,
    NgbModule,
    NbButtonModule,
    FontAwesomeModule
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [],
})
export class ReportsModule { }
