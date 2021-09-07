import { NgModule } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
import { ThemeModule } from '../../@theme/theme.module';
import { SystemUsersRoutingModule, routedComponents } from './systemusers-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToasterModule } from 'angular2-toaster';
@NgModule({
  imports: [
    ThemeModule,
    SystemUsersRoutingModule,
    DxDataGridModule,
    NgbModule,
    ToasterModule,
    FontAwesomeModule
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
  ],
})
export class SystemUsersModule { }
