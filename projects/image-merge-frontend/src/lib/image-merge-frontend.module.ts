import {NgModule} from '@angular/core';
import {ImageMergeFrontendComponent} from './image-merge-frontend.component';
import {CommonModule} from '@angular/common';
import { ImageLayerComponent } from './component/image-layer/image-layer.component';
import { ImageIconComponent } from './component/image-icon/image-icon.component';
import { BreadcrumbNavigationComponent } from './component/breadcrumb-navigation/breadcrumb-navigation.component';


@NgModule({
    declarations: [ImageMergeFrontendComponent, ImageLayerComponent, ImageIconComponent, BreadcrumbNavigationComponent],
    imports: [
        CommonModule
    ],
    exports: [ImageMergeFrontendComponent]
})
export class ImageMergeFrontendModule {
}
