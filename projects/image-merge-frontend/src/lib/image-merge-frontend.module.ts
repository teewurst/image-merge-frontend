import {NgModule} from '@angular/core';
import {ImageMergeFrontendComponent} from './image-merge-frontend.component';
import {CommonModule} from '@angular/common';


@NgModule({
    declarations: [ImageMergeFrontendComponent],
    imports: [
        CommonModule
    ],
    exports: [ImageMergeFrontendComponent]
})
export class ImageMergeFrontendModule {
}
