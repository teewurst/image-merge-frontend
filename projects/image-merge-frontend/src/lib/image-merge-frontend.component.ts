import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter, HostBinding,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {LayerImage} from './models/layer-object.interface';
import {Subject, Subscription} from 'rxjs';
import {distinctUntilChanged, throttleTime} from 'rxjs/operators';
import {ConfigService} from './services/config.service';

@Component({
    selector: 'lib-image-merge-frontend',
    templateUrl: './image-merge-frontend.component.html',
    styleUrls: ['./image-merge-frontend.component.less']
})
export class ImageMergeFrontendComponent implements OnInit, AfterViewInit, OnDestroy {

    /** Ratio to multiply image axis with */
    public ratio: number;

    // Inputs Outputs
    /** Input resize event from parent */
    @Input()
    private resizeThrottled$: Subject<any> = new Subject<any>();

    /** Root Layer image to be randered */
    @Input()
    public layerImage: LayerImage;

    /** Maximum height the plain takes */
    @Input()
    public maxHeight: number;

    /** Moves images to left/center/right with flex properties */
    @Input()
    @HostBinding('style.justify-content')
    private moveTo: 'flex-start' | 'flex-end' | 'center' = 'center';

    /** Emits a change event if this.ratio changes */
    @Output()
    private ratioChange: EventEmitter<number> = new EventEmitter<number>();

    /** Emits height the current image takes at max */
    @Output()
    private currentMaxHeightChange: EventEmitter<number> = new EventEmitter<number>();

    // Subscriptions
    /** Local subscripts to be canceled of destroy */
    private subscriptions: Subscription[] = [];

    // Element Refs
    /** Filler element */
    @ViewChild('imageMergeFrontendFiller')
    public fillerElement: ElementRef;

    /** Height of filler element */
    public fillerHeight: number;
    /** Width of filler element */
    public fillerWidth: number;

    constructor(private config: ConfigService, private wrapperElement: ElementRef) {
    }

    public ngOnInit(): void {
        // On Resize trigger this.calcSize
        this.subscriptions.push(
            this.resizeThrottled$
                .pipe(
                    throttleTime(80),
                    distinctUntilChanged()
                )
                .subscribe(this.getCalSizeCallback().bind(this))
        );
    }

    public ngAfterViewInit(): void {
        this.getCalSizeCallback()();
    }

    private getCalSizeCallback(): () => void {
        return () => setTimeout(this.calcSize.bind(this));
    }

    /** Calculates  */
    public calcSize(width: number = 0): void {
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

    public ngOnDestroy(): void {
        // unsubscribe all subscriptions
        this.subscriptions.forEach((subscription: Subscription) => { subscription.unsubscribe(); });
    }

    public getMergeStyle(): object {
        return {
            height: this.fillerHeight + 'px',
            width: this.fillerWidth  + 'px'
        };
    }
}
