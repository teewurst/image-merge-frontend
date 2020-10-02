import {ModuleWithProviders, NgModule} from '@angular/core';
import {ImageMergeFrontendComponent} from './image-merge-frontend.component';
import {CommonModule} from '@angular/common';
import {ImageLayerComponent} from './component/image-layer/image-layer.component';
import {ImageIconComponent} from './component/image-icon/image-icon.component';
import {BreadcrumbNavigationComponent} from './component/breadcrumb-navigation/breadcrumb-navigation.component';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {
    ConfigService,
    IMAGE_MERGE_FRONTEND_CONFIG_TOKEN,
    ImageMergeFrontendConfigInterface
} from './services/config.service';


@NgModule({
    declarations: [ImageMergeFrontendComponent, ImageLayerComponent, ImageIconComponent, BreadcrumbNavigationComponent],
    imports: [
        CommonModule,
        FontAwesomeModule
    ],
    providers: [
        ConfigService,
        {provide: IMAGE_MERGE_FRONTEND_CONFIG_TOKEN, useValue: {}}
    ],
    exports: [ImageMergeFrontendComponent]
})
export class ImageMergeFrontendModule {
    constructor(library: FaIconLibrary) {
        // todo: Refactor to used icons
        library.addIconPacks(fas, far);
    }

    static forRoot(config: ImageMergeFrontendConfigInterface): ModuleWithProviders<ImageMergeFrontendModule> {
        return {
            ngModule: ImageMergeFrontendModule,
            providers: [
                {provide: IMAGE_MERGE_FRONTEND_CONFIG_TOKEN, useValue: config}
            ]
        };
    }
}
