import { Component, Input } from '@angular/core';
import { ConfigService } from '../../services/config.service';
/** Display ImageLayer and render other ImageLayerComponents */
export class ImageLayerComponent {
    constructor(config) {
        this.config = config;
        /** Offset by which the parent moves its children */
        this.parentLayerOffset = { x: 0, y: 0 };
    }
    /** prevent so valueKey pipe to sort any keys */
    doNotSort() {
        return 0;
    }
    /** listen to changes of layer image => it may has an unset currentVariant */
    ngOnChanges(changes) {
        if (changes.layerImage && changes.layerImage.currentValue !== changes.layerImage.previousValue) {
            const a = changes.layerImage.currentValue;
            if (a.variants && typeof a.currentVariant === 'undefined') {
                a.currentVariant = 0;
            }
        }
    }
    /** check if val is a number */
    isNumeric(val) {
        return typeof val === 'number';
    }
}
ImageLayerComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-image-layer',
                template: "<div class=\"layer-image\" *ngIf=\"layerImage\">\n    <lib-image-layer\n            *ngFor=\"let subLayerImage of (layerImage.images | keyvalue : doNotSort)\"\n            [layerImage]=\"subLayerImage.value\"\n            [ratio]=\"ratio\"\n            [parentLayerOffset]=\"layerImage.subLayerOffset || {x: 0, y: 0}\"\n    ></lib-image-layer>\n\n\n    <img class=\"layer-image__image\"\n         libHideImageOnLoad\n         *ngIf=\"layerImage.url || (isNumeric(layerImage.currentVariant) && layerImage.variants && layerImage.variants[layerImage.currentVariant])\"\n         [src]=\"layerImage.url || layerImage.variants[layerImage.currentVariant].url\"\n         alt=\"image\"\n         [ngStyle]=\"{\n                position: 'absolute',\n                top: (layerImage.offset.y * ratio + parentLayerOffset.y * ratio) + 'px',\n                left: (layerImage.offset.x * ratio + parentLayerOffset.x * ratio) + 'px',\n                height: layerImage.size.y * ratio + 'px',\n                width: layerImage.size.x * ratio + 'px'\n              }\"\n    />\n</div>\n",
                styles: [".layer-image{bottom:0;left:0;position:absolute;right:0;top:0}.layer-image,.layer-image__image{pointer-events:none}"]
            },] }
];
ImageLayerComponent.ctorParameters = () => [
    { type: ConfigService }
];
ImageLayerComponent.propDecorators = {
    layerImage: [{ type: Input }],
    parentLayerOffset: [{ type: Input }],
    ratio: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtbGF5ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL2ltYWdlLW1lcmdlLWZyb250ZW5kL2ltYWdlLW1lcmdlLWZyb250ZW5kL3Byb2plY3RzL2ltYWdlLW1lcmdlLWZyb250ZW5kL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvaW1hZ2UtbGF5ZXIvaW1hZ2UtbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQWdCLEtBQUssRUFBMkMsTUFBTSxlQUFlLENBQUM7QUFDdkcsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBUzVELCtEQUErRDtBQUMvRCxNQUFNLE9BQU8sbUJBQW1CO0lBVzVCLFlBQW1CLE1BQXFCO1FBQXJCLFdBQU0sR0FBTixNQUFNLENBQWU7UUFQeEMsb0RBQW9EO1FBRTdDLHNCQUFpQixHQUFxQixFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDO0lBTTFELENBQUM7SUFFRCxnREFBZ0Q7SUFDekMsU0FBUztRQUNaLE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVELDZFQUE2RTtJQUM3RSxXQUFXLENBQUMsT0FBc0I7UUFDOUIsSUFBSSxPQUFPLENBQUMsVUFBVSxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsWUFBWSxLQUFLLE9BQU8sQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFO1lBQzVGLE1BQU0sQ0FBQyxHQUFlLE9BQU8sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDO1lBQ3RELElBQUksQ0FBQyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsQ0FBQyxjQUFjLEtBQUssV0FBVyxFQUFFO2dCQUN2RCxDQUFDLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQzthQUN4QjtTQUNKO0lBQ0wsQ0FBQztJQUVELCtCQUErQjtJQUN4QixTQUFTLENBQUMsR0FBVztRQUN4QixPQUFPLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQztJQUNuQyxDQUFDOzs7WUF0Q0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLCtqQ0FBMkM7O2FBRTlDOzs7WUFSTyxhQUFhOzs7eUJBWWhCLEtBQUs7Z0NBR0wsS0FBSztvQkFHTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb25maWdTZXJ2aWNlfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb25maWcuc2VydmljZSc7XG5pbXBvcnQge0xheWVyQ29vcmRpbmF0ZXMsIExheWVySW1hZ2V9IGZyb20gJy4uLy4uL21vZGVscy9sYXllci1vYmplY3QuaW50ZXJmYWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2xpYi1pbWFnZS1sYXllcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2ltYWdlLWxheWVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9pbWFnZS1sYXllci5jb21wb25lbnQubGVzcyddXG59KVxuLyoqIERpc3BsYXkgSW1hZ2VMYXllciBhbmQgcmVuZGVyIG90aGVyIEltYWdlTGF5ZXJDb21wb25lbnRzICovXG5leHBvcnQgY2xhc3MgSW1hZ2VMYXllckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gICAgLyoqIGN1cnJlbnQgTGF5ZXIgaW1hZ2UgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBsYXllckltYWdlOiBMYXllckltYWdlO1xuICAgIC8qKiBPZmZzZXQgYnkgd2hpY2ggdGhlIHBhcmVudCBtb3ZlcyBpdHMgY2hpbGRyZW4gKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBwYXJlbnRMYXllck9mZnNldDogTGF5ZXJDb29yZGluYXRlcyA9IHt4OiAwLCB5OiAwfTtcbiAgICAvKiogUmF0aW8gYnkgd2hpY2ggdGhlIGltYWdlIGlzIHJlc2l6ZWQgdG8gZml0IGF2YWlsYWJsZSBzcGFjZSAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHJhdGlvOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY29uZmlnOiBDb25maWdTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgLyoqIHByZXZlbnQgc28gdmFsdWVLZXkgcGlwZSB0byBzb3J0IGFueSBrZXlzICovXG4gICAgcHVibGljIGRvTm90U29ydCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICAvKiogbGlzdGVuIHRvIGNoYW5nZXMgb2YgbGF5ZXIgaW1hZ2UgPT4gaXQgbWF5IGhhcyBhbiB1bnNldCBjdXJyZW50VmFyaWFudCAqL1xuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGNoYW5nZXMubGF5ZXJJbWFnZSAmJiBjaGFuZ2VzLmxheWVySW1hZ2UuY3VycmVudFZhbHVlICE9PSBjaGFuZ2VzLmxheWVySW1hZ2UucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgYTogTGF5ZXJJbWFnZSA9IGNoYW5nZXMubGF5ZXJJbWFnZS5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICBpZiAoYS52YXJpYW50cyAmJiB0eXBlb2YgYS5jdXJyZW50VmFyaWFudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBhLmN1cnJlbnRWYXJpYW50ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBjaGVjayBpZiB2YWwgaXMgYSBudW1iZXIgKi9cbiAgICBwdWJsaWMgaXNOdW1lcmljKHZhbDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbiAgICB9XG59XG4iXX0=