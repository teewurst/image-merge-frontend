(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/common'), require('@fortawesome/free-regular-svg-icons'), require('@fortawesome/angular-fontawesome'), require('@fortawesome/free-solid-svg-icons')) :
    typeof define === 'function' && define.amd ? define('image-merge-frontend', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/common', '@fortawesome/free-regular-svg-icons', '@fortawesome/angular-fontawesome', '@fortawesome/free-solid-svg-icons'], factory) :
    (global = global || self, factory(global['image-merge-frontend'] = {}, global.ng.core, global.rxjs, global.rxjs.operators, global.ng.common, global.freeRegularSvgIcons, global.angularFontawesome, global.freeSolidSvgIcons));
}(this, (function (exports, core, rxjs, operators, common, freeRegularSvgIcons, angularFontawesome, freeSolidSvgIcons) { 'use strict';

    var IMAGE_MERGE_FRONTEND_CONFIG_TOKEN = new core.InjectionToken('IMAGE_MERGE_FRONTEND_CONFIG_TOKEN');
    var ConfigService = /** @class */ (function () {
        function ConfigService(config) {
            if (config === void 0) { config = {}; }
            this.config = config;
            this.setConfig(config);
        }
        ConfigService.prototype.setConfig = function (config) {
            this.config = config;
            this.heightWidthRatio = this.getPlainSize().y / this.getPlainSize().x;
        };
        ConfigService.prototype.getPlainSize = function () {
            return this.config.plainSize || { x: 600, y: 800 };
        };
        ConfigService.prototype.getHeightWidthRatio = function () {
            return this.heightWidthRatio || this.getPlainSize().y / this.getPlainSize().x;
        };
        return ConfigService;
    }());
    ConfigService.decorators = [
        { type: core.Injectable }
    ];
    ConfigService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Inject, args: [IMAGE_MERGE_FRONTEND_CONFIG_TOKEN,] }] }
    ]; };

    var ImageMergeFrontendComponent = /** @class */ (function () {
        function ImageMergeFrontendComponent(config, wrapperElement) {
            this.config = config;
            this.wrapperElement = wrapperElement;
            // Inputs Outputs
            /** Input resize event from parent */
            this.resizeThrottled$ = new rxjs.Subject();
            /** Moves images to left/center/right with flex properties */
            this.moveTo = 'center';
            /** Emits a change event if this.ratio changes */
            this.ratioChange = new core.EventEmitter();
            /** Emits height the current image takes at max */
            this.currentMaxHeightChange = new core.EventEmitter();
            // Subscriptions
            /** Local subscripts to be canceled of destroy */
            this.subscriptions = [];
        }
        ImageMergeFrontendComponent.prototype.ngOnInit = function () {
            // On Resize trigger this.calcSize
            this.subscriptions.push(this.resizeThrottled$
                .pipe(operators.throttleTime(80), operators.distinctUntilChanged())
                .subscribe(this.getCalSizeCallback().bind(this)));
        };
        ImageMergeFrontendComponent.prototype.ngAfterViewInit = function () {
            this.getCalSizeCallback()();
        };
        ImageMergeFrontendComponent.prototype.getCalSizeCallback = function () {
            var _this = this;
            return function () { return setTimeout(_this.calcSize.bind(_this)); };
        };
        /** Calculates  */
        ImageMergeFrontendComponent.prototype.calcSize = function (width) {
            if (width === void 0) { width = 0; }
            // get ration if images (height / width)
            var plainRatio = this.config.getHeightWidthRatio();
            // define max height of images
            var maxHeight = this.maxHeight || this.config.getPlainSize().y;
            // get with of wrapper
            width = width || this.wrapperElement.nativeElement.offsetWidth;
            // calculate height by plain size
            var height = width * plainRatio;
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
        };
        ImageMergeFrontendComponent.prototype.ngOnDestroy = function () {
            // unsubscribe all subscriptions
            this.subscriptions.forEach(function (subscription) { subscription.unsubscribe(); });
        };
        ImageMergeFrontendComponent.prototype.getMergeStyle = function () {
            return {
                height: this.fillerHeight + 'px',
                width: this.fillerWidth + 'px'
            };
        };
        return ImageMergeFrontendComponent;
    }());
    ImageMergeFrontendComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'lib-image-merge-frontend',
                    template: "<ng-container>\n    <div class=\"image-merge-frontend\" [ngStyle]=\"this.getMergeStyle()\" #imageMergeFrontendFiller>\n        <lib-image-layer [layerImage]=\"layerImage\" [ratio]=\"ratio\"></lib-image-layer>\n    </div>\n</ng-container>\n",
                    styles: [":host{display:flex;height:100%;justify-content:center;left:0;width:100%}.image-merge-frontend{position:relative;width:100%}"]
                },] }
    ];
    ImageMergeFrontendComponent.ctorParameters = function () { return [
        { type: ConfigService },
        { type: core.ElementRef }
    ]; };
    ImageMergeFrontendComponent.propDecorators = {
        resizeThrottled$: [{ type: core.Input }],
        layerImage: [{ type: core.Input }],
        maxHeight: [{ type: core.Input }],
        moveTo: [{ type: core.Input }, { type: core.HostBinding, args: ['style.justify-content',] }],
        ratioChange: [{ type: core.Output }],
        currentMaxHeightChange: [{ type: core.Output }],
        fillerElement: [{ type: core.ViewChild, args: ['imageMergeFrontendFiller',] }]
    };

    /** Display ImageLayer and render other ImageLayerComponents */
    var ImageLayerComponent = /** @class */ (function () {
        function ImageLayerComponent(config) {
            this.config = config;
            /** Offset by which the parent moves its children */
            this.parentLayerOffset = { x: 0, y: 0 };
        }
        /** prevent so valueKey pipe to sort any keys */
        ImageLayerComponent.prototype.doNotSort = function () {
            return 0;
        };
        /** listen to changes of layer image => it may has an unset currentVariant */
        ImageLayerComponent.prototype.ngOnChanges = function (changes) {
            if (changes.layerImage && changes.layerImage.currentValue !== changes.layerImage.previousValue) {
                var a = changes.layerImage.currentValue;
                if (a.variants && typeof a.currentVariant === 'undefined') {
                    a.currentVariant = 0;
                }
            }
        };
        /** check if val is a number */
        ImageLayerComponent.prototype.isNumeric = function (val) {
            return typeof val === 'number';
        };
        return ImageLayerComponent;
    }());
    ImageLayerComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'lib-image-layer',
                    template: "<div class=\"layer-image\" *ngIf=\"layerImage\">\n    <lib-image-layer\n            *ngFor=\"let subLayerImage of (layerImage.images | keyvalue : doNotSort)\"\n            [layerImage]=\"subLayerImage.value\"\n            [ratio]=\"ratio\"\n            [parentLayerOffset]=\"layerImage.subLayerOffset || {x: 0, y: 0}\"\n    ></lib-image-layer>\n\n\n    <img class=\"layer-image__image\"\n         libHideImageOnLoad\n         *ngIf=\"layerImage.url || (isNumeric(layerImage.currentVariant) && layerImage.variants && layerImage.variants[layerImage.currentVariant])\"\n         [src]=\"layerImage.url || layerImage.variants[layerImage.currentVariant].url\"\n         alt=\"image\"\n         [ngStyle]=\"{\n                position: 'absolute',\n                top: (layerImage.offset.y * ratio + parentLayerOffset.y * ratio) + 'px',\n                left: (layerImage.offset.x * ratio + parentLayerOffset.x * ratio) + 'px',\n                height: layerImage.size.y * ratio + 'px',\n                width: layerImage.size.x * ratio + 'px'\n              }\"\n    />\n</div>\n",
                    styles: [".layer-image{bottom:0;left:0;position:absolute;right:0;top:0}.layer-image,.layer-image__image{pointer-events:none}"]
                },] }
    ];
    ImageLayerComponent.ctorParameters = function () { return [
        { type: ConfigService }
    ]; };
    ImageLayerComponent.propDecorators = {
        layerImage: [{ type: core.Input }],
        parentLayerOffset: [{ type: core.Input }],
        ratio: [{ type: core.Input }]
    };

    var IconsModule = /** @class */ (function () {
        function IconsModule(library) {
            // todo: Refactor to used icons
            library.addIconPacks(freeSolidSvgIcons.fas, freeRegularSvgIcons.far);
        }
        return IconsModule;
    }());
    IconsModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [],
                    imports: [angularFontawesome.FontAwesomeModule],
                    exports: [angularFontawesome.FontAwesomeModule]
                },] }
    ];
    IconsModule.ctorParameters = function () { return [
        { type: angularFontawesome.FaIconLibrary }
    ]; };

    var HideImageOnLodeDirective = /** @class */ (function () {
        function HideImageOnLodeDirective(elRef, renderer) {
            this.elRef = elRef;
            this.renderer = renderer;
        }
        HideImageOnLodeDirective.prototype.ngOnInit = function () {
            this.elRef.nativeElement.addEventListener('load', this.showElement.bind(this));
        };
        HideImageOnLodeDirective.prototype.ngOnDestroy = function () {
            this.elRef.nativeElement.removeEventListener('load', this.showElement);
        };
        HideImageOnLodeDirective.prototype.ngOnChanges = function (changes) {
            if (changes.src && changes.src.currentValue !== changes.src.previousValue) {
                this.renderer.setAttribute(this.elRef.nativeElement, 'src', changes.src.currentValue);
                this.elRef.nativeElement.style.display = 'none';
            }
        };
        HideImageOnLodeDirective.prototype.showElement = function () {
            this.elRef.nativeElement.style.display = 'block';
        };
        return HideImageOnLodeDirective;
    }());
    HideImageOnLodeDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[libHideImageOnLoad]'
                },] }
    ];
    HideImageOnLodeDirective.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.Renderer2 }
    ]; };
    HideImageOnLodeDirective.propDecorators = {
        src: [{ type: core.Input }]
    };

    var ɵ0 = {};
    var ImageMergeFrontendModule = /** @class */ (function () {
        function ImageMergeFrontendModule() {
        }
        ImageMergeFrontendModule.forRoot = function (config) {
            return {
                ngModule: ImageMergeFrontendModule,
                providers: [
                    { provide: IMAGE_MERGE_FRONTEND_CONFIG_TOKEN, useValue: config }
                ]
            };
        };
        return ImageMergeFrontendModule;
    }());
    ImageMergeFrontendModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [ImageMergeFrontendComponent, ImageLayerComponent, HideImageOnLodeDirective],
                    imports: [
                        common.CommonModule,
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

    exports.ConfigService = ConfigService;
    exports.IMAGE_MERGE_FRONTEND_CONFIG_TOKEN = IMAGE_MERGE_FRONTEND_CONFIG_TOKEN;
    exports.ImageMergeFrontendComponent = ImageMergeFrontendComponent;
    exports.ImageMergeFrontendModule = ImageMergeFrontendModule;
    exports.ɵ0 = ɵ0;
    exports.ɵa = ImageLayerComponent;
    exports.ɵb = HideImageOnLodeDirective;
    exports.ɵc = IconsModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=image-merge-frontend.umd.js.map
