import {ModuleWithProviders, NgModule} from '@angular/core';
import {ImageMergeFrontendComponent} from './image-merge-frontend.component';
import {CommonModule} from '@angular/common';
import {ImageLayerComponent} from './component/image-layer/image-layer.component';
import {ImageIconComponent} from './component/image-icon/image-icon.component';
import {BreadcrumbNavigationComponent} from './component/breadcrumb-navigation/breadcrumb-navigation.component';
import {
    ConfigService,
    IMAGE_MERGE_FRONTEND_CONFIG_TOKEN,
    ImageMergeFrontendConfigInterface
} from './services/config.service';
import {IconsModule} from './icons/icons.module';


@NgModule({
    declarations: [ImageMergeFrontendComponent, ImageLayerComponent, ImageIconComponent, BreadcrumbNavigationComponent],
    imports: [
        CommonModule,
        IconsModule
    ],
    providers: [
        ConfigService,
        {provide: IMAGE_MERGE_FRONTEND_CONFIG_TOKEN, useValue: {}}
    ],
    exports: [ImageMergeFrontendComponent]
})
export class ImageMergeFrontendModule {

    static forRoot(config: ImageMergeFrontendConfigInterface): ModuleWithProviders<ImageMergeFrontendModule> {
        return {
            ngModule: ImageMergeFrontendModule,
            providers: [
                {provide: IMAGE_MERGE_FRONTEND_CONFIG_TOKEN, useValue: config}
            ]
        };
    }
}
