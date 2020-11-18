import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input, OnChanges,
    OnDestroy,
    OnInit,
    Output, SimpleChanges,
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
export class ImageMergeFrontendComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

    public ratio: number;

    // Inputs Outputs
    @Input()
    private resizeThrottled$: Subject<any> = new Subject<any>();
    @Input()
    public layerImage: LayerImage;
    @Input()
    public maxHeight: number;
    @Output()
    public ratioChange: EventEmitter<number> = new EventEmitter<number>();
    @Output()
    public currentMaxHeightChange: EventEmitter<number> = new EventEmitter<number>();

    // Subscriptions
    private resizeThrottleSubscription: Subscription;

    // Element Refs
    @ViewChild('imageMergeFrontendFiller')
    public fillerElement: ElementRef;

    public fillerHeight: number;
    public fillerWidth: number;

    constructor(public config: ConfigService, private wrapperElement: ElementRef) {
    }

    public ngOnInit(): void {
        this.subscribeToResizeSubject(this.resizeThrottled$);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.resizeThrottled$ && changes.resizeThrottled$.previousValue !== changes.resizeThrottled$.currentValue) {
            this.resizeThrottleSubscription.unsubscribe();
            this.subscribeToResizeSubject(changes.resizeThrottled$.currentValue);
        }
    }

    public ngAfterViewInit(): void {
        this.calcSize.bind(this);
    }

    public ngOnDestroy(): void {
        this.resizeThrottleSubscription.unsubscribe();
        this.resizeThrottled$.complete();
    }

    public calcSize(): void {
        setTimeout(() => {
            const plainRatio = this.config.getHeightWidthRatio();
            const maxHeight = this.maxHeight || this.config.getPlainSize().y;

            let width = this.wrapperElement.nativeElement.offsetWidth;
            let height = width * plainRatio;

            if (height > maxHeight) {
                height = maxHeight;
                width = height * (1 / plainRatio);
            }

            this.fillerHeight = height;
            this.fillerWidth = width;
            this.ratio = width / this.config.getPlainSize().x;

            this.ratioChange.emit(this.ratio);
            this.currentMaxHeightChange.emit(this.fillerHeight);
        });
    }

    public getMergeStyle(): object {
        return {
            height: this.fillerHeight + 'px',
            width: this.fillerWidth  + 'px'
        };
    }

    private subscribeToResizeSubject(currentValue: Subject<any>): void {
        this.resizeThrottleSubscription =
            currentValue
                .pipe(
                    throttleTime(80),
                    distinctUntilChanged()
                )
                .subscribe(this.calcSize.bind(this));
    }
}
