import { InjectionToken, Injectable, Inject, EventEmitter, Component, ElementRef, Input, HostBinding, Output, ViewChild, NgModule, Directive, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { throttleTime, distinctUntilChanged } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

const IMAGE_MERGE_FRONTEND_CONFIG_TOKEN = new InjectionToken('IMAGE_MERGE_FRONTEND_CONFIG_TOKEN');
class ConfigService {
    constructor(config = {}) {
        this.config = config;
        this.setConfig(config);
    }
    setConfig(config) {
        this.config = config;
        this.heightWidthRatio = this.getPlainSize().y / this.getPlainSize().x;
    }
    getPlainSize() {
        return this.config.plainSize || { x: 600, y: 800 };
    }
    getHeightWidthRatio() {
        return this.heightWidthRatio || this.getPlainSize().y / this.getPlainSize().x;
    }
}
ConfigService.decorators = [
    { type: Injectable }
];
ConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [IMAGE_MERGE_FRONTEND_CONFIG_TOKEN,] }] }
];

class ImageMergeFrontendComponent {
    constructor(config, wrapperElement) {
        this.config = config;
        this.wrapperElement = wrapperElement;
        // Inputs Outputs
        /** Input resize event from parent */
        this.resizeThrottled$ = new Subject();
        /** Moves images to left/center/right with flex properties */
        this.moveTo = 'center';
        /** Emits a change event if this.ratio changes */
        this.ratioChange = new EventEmitter();
        /** Emits height the current image takes at max */
        this.currentMaxHeightChange = new EventEmitter();
        // Subscriptions
        /** Local subscripts to be canceled of destroy */
        this.subscriptions = [];
    }
    ngOnInit() {
        // On Resize trigger this.calcSize
        this.subscriptions.push(this.resizeThrottled$
            .pipe(throttleTime(80), distinctUntilChanged())
            .subscribe(this.getCalSizeCallback().bind(this)));
    }
    ngAfterViewInit() {
        this.getCalSizeCallback()();
    }
    getCalSizeCallback() {
        return () => setTimeout(this.calcSize.bind(this));
    }
    /** Calculates  */
    calcSize(width = 0) {
        // get ration if images (height / width)
        const plainRatio = this.config.getHeightWidthRatio();
        // define max height of images
        const maxHeight = this.maxHeight || this.config.getPlainSize().y;
        // get with of wrapper
        width = width || this.wrapperElement.nativeElement.offsetWidth;
        // calculate height by plain size
        let height = width * plainRatio;
        // if height exceeds max height shrink width if filler element
        if (height > maxHeight) {
            height = maxHeight;
            width = height * (1 / plainRatio);
        }
        // set filler element size
        this.fillerHeight = height;
        this.fillerWidth = width;
        // calculate new ratio for resizing images, so the fit plain
        this.ratio = width / this.config.getPlainSize().x;
        // emit change of ration
        this.ratioChange.emit(this.ratio);
        // emit change of filler height (so parent my adapt)
        this.currentMaxHeightChange.emit(this.fillerHeight);
    }
    ngOnDestroy() {
        // unsubscribe all subscriptions
        this.subscriptions.forEach((subscription) => { subscription.unsubscribe(); });
    }
    getMergeStyle() {
        return {
            height: this.fillerHeight + 'px',
            width: this.fillerWidth + 'px'
        };
    }
}
ImageMergeFrontendComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-image-merge-frontend',
                template: "<ng-container>\n    <div class=\"image-merge-frontend\" [ngStyle]=\"this.getMergeStyle()\" #imageMergeFrontendFiller>\n        <lib-image-layer [layerImage]=\"layerImage\" [ratio]=\"ratio\"></lib-image-layer>\n    </div>\n</ng-container>\n",
                styles: [":host{display:flex;height:100%;justify-content:center;left:0;width:100%}.image-merge-frontend{position:relative;width:100%}"]
            },] }
];
ImageMergeFrontendComponent.ctorParameters = () => [
    { type: ConfigService },
    { type: ElementRef }
];
ImageMergeFrontendComponent.propDecorators = {
    resizeThrottled$: [{ type: Input }],
    layerImage: [{ type: Input }],
    maxHeight: [{ type: Input }],
    moveTo: [{ type: Input }, { type: HostBinding, args: ['style.justify-content',] }],
    ratioChange: [{ type: Output }],
    currentMaxHeightChange: [{ type: Output }],
    fillerElement: [{ type: ViewChild, args: ['imageMergeFrontendFiller',] }]
};

/** Display ImageLayer and render other ImageLayerComponents */
class ImageLayerComponent {
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

class IconsModule {
    constructor(library) {
        // todo: Refactor to used icons
        library.addIconPacks(fas, far);
    }
}
IconsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                imports: [FontAwesomeModule],
                exports: [FontAwesomeModule]
            },] }
];
IconsModule.ctorParameters = () => [
    { type: FaIconLibrary }
];

class HideImageOnLodeDirective {
    constructor(elRef, renderer) {
        this.elRef = elRef;
        this.renderer = renderer;
    }
    ngOnInit() {
        this.elRef.nativeElement.addEventListener('load', this.showElement.bind(this));
    }
    ngOnDestroy() {
        this.elRef.nativeElement.removeEventListener('load', this.showElement);
    }
    ngOnChanges(changes) {
        if (changes.src && changes.src.currentValue !== changes.src.previousValue) {
            this.renderer.setAttribute(this.elRef.nativeElement, 'src', changes.src.currentValue);
            this.elRef.nativeElement.style.display = 'none';
        }
    }
    showElement() {
        this.elRef.nativeElement.style.display = 'block';
    }
}
HideImageOnLodeDirective.decorators = [
    { type: Directive, args: [{
                selector: '[libHideImageOnLoad]'
            },] }
];
HideImageOnLodeDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
HideImageOnLodeDirective.propDecorators = {
    src: [{ type: Input }]
};

const ɵ0 = {};
class ImageMergeFrontendModule {
    static forRoot(config) {
        return {
            ngModule: ImageMergeFrontendModule,
            providers: [
                { provide: IMAGE_MERGE_FRONTEND_CONFIG_TOKEN, useValue: config }
            ]
        };
    }
}
ImageMergeFrontendModule.decorators = [
    { type: NgModule, args: [{
                declarations: [ImageMergeFrontendComponent, ImageLayerComponent, HideImageOnLodeDirective],
                imports: [
                    CommonModule,
                    IconsModule
                ],
                providers: [
                    ConfigService,
                    { provide: IMAGE_MERGE_FRONTEND_CONFIG_TOKEN, useValue: ɵ0 }
                ],
                exports: [ImageMergeFrontendComponent]
            },] }
];

/*
 * Public API Surface of image-merge-frontend
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ConfigService, IMAGE_MERGE_FRONTEND_CONFIG_TOKEN, ImageMergeFrontendComponent, ImageMergeFrontendModule, ɵ0, ImageLayerComponent as ɵa, HideImageOnLodeDirective as ɵb, IconsModule as ɵc };
//# sourceMappingURL=image-merge-frontend.js.map
