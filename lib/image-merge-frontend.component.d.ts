import { AfterViewInit, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { LayerImage } from './models/layer-object.interface';
import { ConfigService } from './services/config.service';
export declare class ImageMergeFrontendComponent implements OnInit, AfterViewInit, OnDestroy {
    private config;
    private wrapperElement;
    /** Ratio to multiply image axis with */
    ratio: number;
    /** Input resize event from parent */
    private resizeThrottled$;
    /** Root Layer image to be randered */
    layerImage: LayerImage;
    /** Maximum height the plain takes */
    maxHeight: number;
    /** Moves images to left/center/right with flex properties */
    private moveTo;
    /** Emits a change event if this.ratio changes */
    private ratioChange;
    /** Emits height the current image takes at max */
    private currentMaxHeightChange;
    /** Local subscripts to be canceled of destroy */
    private subscriptions;
    /** Filler element */
    fillerElement: ElementRef;
    /** Height of filler element */
    fillerHeight: number;
    /** Width of filler element */
    fillerWidth: number;
    constructor(config: ConfigService, wrapperElement: ElementRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    private getCalSizeCallback;
    /** Calculates  */
    calcSize(width?: number): void;
    ngOnDestroy(): void;
    getMergeStyle(): object;
}
