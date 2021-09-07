import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './users.service';
import { StateService } from './state.service';
import { SmartTableService } from './smart-table.service';
import { PeriodsService } from './periods.service';
import { LayoutService } from './layout.service';

const SERVICES = [
  UserService,
  StateService,
  SmartTableService,
  PeriodsService,
  LayoutService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
