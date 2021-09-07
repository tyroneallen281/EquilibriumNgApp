import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ThemeModule } from '../../@theme/theme.module';
import { EmailRoutingModule, routedComponents } from './email-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { NgSelectModule } from '@ng-select/ng-select';
import { DxDataGridModule } from 'devextreme-angular';

@NgModule({
  imports: [
    ThemeModule,
    EmailRoutingModule,
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
export class   EmailModule { }
