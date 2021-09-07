import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ThemeModule } from '../../@theme/theme.module';
import { FacilityRoutingModule, routedComponents } from './facility-routing.module';
import { GenericTableModule } from '@angular-generic-table/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { NgSelectModule } from '@ng-select/ng-select';
import { DxDataGridModule } from 'devextreme-angular';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
    imports: [
        ThemeModule,
        FacilityRoutingModule,
        HttpClientModule,
        FontAwesomeModule,
        NgSelectModule,
        DxDataGridModule,
        ImageCropperModule,
    ],
    declarations: [
        ...routedComponents,
    ],
    providers: [],
})
export class FacilityModule { }