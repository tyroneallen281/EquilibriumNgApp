import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ThemeModule } from '../../@theme/theme.module';
import { ManageRoutingModule, routedComponents } from './manage-routing.module';
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
    ManageRoutingModule,
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
export class ManageModule { }
