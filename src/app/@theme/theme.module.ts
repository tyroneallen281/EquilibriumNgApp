import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { GenericTableModule } from '@angular-generic-table/core';
import { QuillModule } from 'ngx-quill';
import {
  DxTreeListModule,
  DxCheckBoxModule,
  DxDataGridModule,
  DxFileUploaderModule,
  DxSelectBoxModule,
  DxCircularGaugeModule,
  DxChartModule,
  DxListModule,
  DxLookupModule,
  DxTextBoxModule,
  DxTagBoxModule,
  DxTemplateModule,
  DxSparklineModule,
  DxColorBoxModule,
    DxSchedulerModule,
    DxAutocompleteModule,
} from 'devextreme-angular';
import { FullCalendarModule } from 'ng-fullcalendar';
import { Angular2PromiseButtonModule } from 'angular2-promise-buttons/dist';
import { NgPipesModule } from 'ngx-pipes';
import { NgSelectModule } from '@ng-select/ng-select';
import { TimeAgoPipe } from 'time-ago-pipe';
import { ChartModule } from 'angular2-chartjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { ImgFallbackModule } from 'ngx-img-fallback';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {
  NbActionsModule,
  NbCardModule,
  NbLayoutModule,
  NbMenuModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbSearchModule,
  NbSidebarModule,
  NbTabsetModule,
  NbThemeModule,
  NbUserModule,
  NbCheckboxModule,
  NbPopoverModule,
  NbContextMenuModule,
  NbProgressBarModule,
  NbDatepickerModule
} from '@nebular/theme';

import { NbSecurityModule } from '@nebular/security';
import { NbMomentDateModule } from '@nebular/moment';

import {
  FooterComponent,
  HeaderComponent,
  MapComponent,
  HeatMapComponent,
  TimeLineMapComponent,
  MapModalComponent,
  SearchInputComponent,
  ThemeSettingsComponent,
  SwitcherComponent,
  LayoutDirectionSwitcherComponent,
  ThemeSwitcherComponent,
  TinyMCEComponent,
  ThemeSwitcherListComponent,
  ECommerceProgressSectionComponent,
  UIGaugeComponent,
  DrawMapComponent,
  MultipleMapComponent,

} from './components';
import {
  UserRoleSelectComponent,
  UserPasswordResetComponent,
  FacilitySelectComponent,
  FacilitySelectHeaderComponent,
  StaffSelectComponent,
  StaffSingleSelectComponent,
  StaffAgendaComponent,
  ClassSelectComponent,
  ClassListComponent,
  CalendarUIComponent,
  ClassModalComponent,
  ClassManageComponent,
  ClassEventModalComponent,
  ClassEventManageComponent,
  MemberManageComponent,
  MemberListComponent,
  MemberPackageListComponent,
  MemberPackagePeriodListComponent,
  MemberPackageManageComponent,
  MemberPackageUpdateComponent,
  MemberPackagePeriodManageComponent,
  MemberSelectComponent,
  PackageSelectComponent,
  BookingListComponent,
  BookingCreateModalComponent,
  BookingManageModalComponent,
  BookingQuestionnaireModalComponent,
  NetCashIntegrationComponent,
  NetCashAccessComponent,
  PaymentStatusUiComponent,
  PaymentHistoryDetailsComponent,
  PaymentHistoryManageModalComponent,
  PaymentHistoryListComponent,
  NotificationModalComponent,
  MemberImportComponent,
  StaffImportComponent,
  MandateCreateModalComponent,
  MandateListComponent,
  FacilityContactManageComponent,
  FacilityAutoEmailManageComponent,
  FacilityAutoEmailListComponent,
  MandateSelectComponent
} from './product-components';

import {
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
  KeysPipe,
  SafePipe,
  SafeHtmlPipe,
  ConcatPipe
} from './pipes';
import {
  OneColumnLayoutComponent,
  SystemLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
} from './layouts';
import { DEFAULT_THEME } from './styles/theme.default';
import { COSMIC_THEME } from './styles/theme.cosmic';
import { CORPORATE_THEME } from './styles/theme.corporate';

const BASE_MODULES = [CommonModule, RouterModule, FormsModule, ReactiveFormsModule];

const NB_MODULES = [
  NbCardModule,
  NbLayoutModule,
  NbTabsetModule,
  NbStepperModule,
  NbRouteTabsetModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbCheckboxModule,
  NbPopoverModule,
  NbContextMenuModule,
  NbDatepickerModule,
  NgbModule,
  LeafletModule,
  LeafletDrawModule,
  FontAwesomeModule,
  ChartModule,
  NgSelectModule,
  DxChartModule,
  DxAutocompleteModule,
  DxCircularGaugeModule,
  DxTreeListModule,
  DxCheckBoxModule,
  DxSelectBoxModule,
  DxFileUploaderModule,
  DxDataGridModule,
  DxListModule,
  DxTextBoxModule,
  DxTagBoxModule,
  DxColorBoxModule,
  DxTemplateModule,
  DxSparklineModule,
  DxSchedulerModule,
  DxLookupModule,
  QuillModule,
  Angular2PromiseButtonModule,
  NgPipesModule,
  FullCalendarModule,
  NbSecurityModule, // *nbIsGranted directive,
  NbProgressBarModule,
  ImgFallbackModule
];

const COMPONENTS = [
  SwitcherComponent,
  LayoutDirectionSwitcherComponent,
  ThemeSwitcherComponent,
  ThemeSwitcherListComponent,
  HeaderComponent,
  FooterComponent,
  MapComponent,
  MapModalComponent,
  HeatMapComponent,
  DrawMapComponent,
  MultipleMapComponent,
  TimeLineMapComponent,
  UserRoleSelectComponent,
  FacilitySelectComponent,
  FacilitySelectHeaderComponent,
  StaffSelectComponent,
  StaffSingleSelectComponent,
  StaffAgendaComponent,
  ClassSelectComponent,
  ClassListComponent,
  ClassModalComponent,
  ClassManageComponent,
  ClassEventModalComponent,
  ClassEventManageComponent,
  MemberManageComponent,
  MemberListComponent,
  MemberPackageListComponent,
  MemberPackageManageComponent,
  MemberPackagePeriodListComponent,
  MemberSelectComponent,
  PackageSelectComponent,
  BookingListComponent,
  BookingCreateModalComponent,
  BookingManageModalComponent,
  BookingQuestionnaireModalComponent,
  NetCashIntegrationComponent,
  NetCashAccessComponent,
  PaymentStatusUiComponent,
  PaymentHistoryDetailsComponent,
  PaymentHistoryManageModalComponent,
  PaymentHistoryListComponent,
  CalendarUIComponent,
  UIGaugeComponent,
  SearchInputComponent,
  ThemeSettingsComponent,
  TinyMCEComponent,
  OneColumnLayoutComponent,
  SystemLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
  ECommerceProgressSectionComponent,
  UserPasswordResetComponent,
  MemberPackageUpdateComponent,
  MemberPackagePeriodManageComponent,
  NotificationModalComponent,
  MemberImportComponent,
  StaffImportComponent,
  MandateCreateModalComponent,
  MandateListComponent, 
  FacilityContactManageComponent,
  FacilityAutoEmailManageComponent,
  FacilityAutoEmailListComponent,
  MandateSelectComponent
];

const ENTRY_COMPONENTS = [
    ThemeSwitcherListComponent,
    MapModalComponent,
    UserRoleSelectComponent,
    UserPasswordResetComponent,
    ClassModalComponent,
    ClassManageComponent,
    ClassEventModalComponent,
    ClassEventManageComponent,
    StaffImportComponent,
    MemberManageComponent,
    MemberImportComponent,
    MemberPackageManageComponent,
    MemberPackageUpdateComponent,
    MemberPackagePeriodManageComponent,
    BookingCreateModalComponent,
    BookingManageModalComponent,
    BookingQuestionnaireModalComponent,
    PaymentHistoryManageModalComponent,
    NotificationModalComponent,
    MandateCreateModalComponent,
    FacilityContactManageComponent,
    FacilityAutoEmailManageComponent
];

const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  SafePipe,
  SafeHtmlPipe,
  ConcatPipe,
  TimeAgoPipe,
  NumberWithCommasPipe,
];

const NB_THEME_PROVIDERS = [
  ...NbThemeModule.forRoot(
    {
      name: 'default',
    },
    [ DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME ],
  ).providers,
  ...NbSidebarModule.forRoot().providers,
  ...NbMenuModule.forRoot().providers,
];

@NgModule({
  imports: [...BASE_MODULES, ...NB_MODULES],
  exports: [...BASE_MODULES, ...NB_MODULES, ...COMPONENTS, ...PIPES],
  declarations: [...COMPONENTS, ...PIPES],
  entryComponents: [...ENTRY_COMPONENTS],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [...NB_THEME_PROVIDERS],
    };
  }
}
