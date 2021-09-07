
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, enableProdMode } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { NbPasswordAuthStrategy, NbAuthModule } from '@nebular/auth';
import { NbButtonModule, NbStepperModule, NbSelectModule, NbDatepickerModule } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule} from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './auth-guard.service';
import { ApiModule, Configuration, ConfigurationParameters , BASE_PATH } from '@angular-baobab/rx-client-api';
import { AuthApiModule, AUTH_BASE_PATH }  from '@angular-baobab/authservice-client-api';
import { environment } from '../environments/environment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JwtInterceptor } from './@core/interceptor/authInterceptor';
import { TenantInterceptor } from './@core/interceptor/tenantInterceptor';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { ToasterModule } from 'angular2-toaster';
import { DxDataGridModule } from 'devextreme-angular';
import { Angular2PromiseButtonModule } from 'angular2-promise-buttons/dist';
import { NgPipesModule } from 'ngx-pipes';
import { RoleProvider } from '../app/@theme/providers/role.provider';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { QuillModule } from 'ngx-quill';
library.add(fas, far);

const formSetting: any = {
  redirectDelay: 0,
  showMessages: {
    success: true,
  },
};

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}
function apiConfig() {
  return new Configuration({
    username: "",
    password: "",
    basePath: "",
  });
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgPipesModule,
    NbDatepickerModule.forRoot(),
    DxDataGridModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    QuillModule.forRoot(),
    CoreModule.forRoot(),
    Angular2PromiseButtonModule.forRoot(),
    ApiModule.forRoot(apiConfig),
    AuthApiModule.forRoot(apiConfig),
    ToasterModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: environment.AUTH_API_BASE_PATH+'/api/accounts/',
            login: {
              endpoint: 'LoginRX',
              method: 'post',
          },
          logout: {
            endpoint: 'logout',
            method: 'post',
          },
          token: {
            class: NbAuthJWTToken,

               key: 'data.access_token',
          },
        }),
      ],
      forms: {
        login: formSetting,
        register: formSetting,
        requestPassword: formSetting,
        resetPassword: formSetting,
        logout: {
          redirectDelay: 0,
        },
      },
    }),
    NbSecurityModule.forRoot({
      accessControl: {
        Admin: {
          parent: 'Viewer',
          view: [ 'users'],
        },
        Viewer: {
          view: ['dashboard', 'applications','reports'],
        },
        SystemAdmin: {
          parent: 'Admin',
        },
      }
    }),
],
  bootstrap: [AppComponent],
  providers: [
    AuthGuard,
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: BASE_PATH, useValue: environment.API_BASE_PATH },
    { provide: AUTH_BASE_PATH, useValue: environment.AUTH_API_BASE_PATH },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TenantInterceptor, multi: true },
    { provide: NbRoleProvider, useClass: RoleProvider },
  ],
})
export class AppModule {}
